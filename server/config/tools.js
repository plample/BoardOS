/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';
var _ = require('lodash');
var Hierarchies = require('../api/hierarchy/hierarchy.model');
var events = require('events');
var hierarchyEmitter = new events.EventEmitter();

function groupByMulti (obj, values, context) {
    if (!values.length)
        return obj;
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
};

 module.exports = {
    giveMeMyColor: function (value) {
        return giveMeMyColor(value);
    },
    buildChart: function (mKPI, KPIType) {
        switch  (KPIType) {
            case 'hBullet' :
            var myChart=
                {
                  "graphset":
                    [
                        {
                        "type":"hbullet",
                        "title":
                            {
                              "text":"KPI This " + mKPI.groupTimeBy+ " (Base 100)",
                              "text-align":"left",
                              "font-size":"13px",
                              "font-color":"#000000",
                              "font-family":"Arial",
                              "background-color":"none"
                            },
                          "plotarea":
                            {
                              "background-color":"none",
                              "margin":"35px 20px 20px 20px"
                            },    
                          "plot":
                            {
                             "goal":
                                {
                                    "background-color":"#169ef4", // blue if goal
                                    "border-width":0
                                }
                            },
                            "series":
                            [
                                {
                                    "values":[mKPI.percentObjectif],
                                    "background-color":"#859900",
                                    "alpha":"0.6",
                                    "goals":[100]
                                }
                            ]
                        }
                    ]
                };
              break;
              case 'Bar' :
                var mySeries = [];
                _.forEach(mKPI.metricsGroupBy, function(item, key) {
                    mySeries.push( {
                        "text":key,
                        "values":_.pluck(item,'count'),
                        "background-color":_.compact(_.uniq(_.pluck(item,'color'))),
                        "alpha":"0.7",
                        "description":"<= Scheduled deadline"
                    })
                });


              var myChart={
                "graphset":[
                {
                    "type":"bar",
                    "height":"100%",
                    "width":"100%",
                    "background-color":"#ffffff",
                    "border-radius":4,
                    "title":{
                        "text":"Metrics History",
                        "text-align":"left",
                        "font-size":"13px",
                        "font-color":"#000000",
                        "font-family":"Arial",
                        "background-color":"none"        
                    },
                    "legend":{
                        "toggle-action":"remove",
                        "layout":"x3",
                        "x":"52.5%",
                        "shadow":false,
                        "border-color":"none",
                        "background-color":"none",
                        "item":{
                            "font-color":"#000000"
                        },
                        "marker":{
                            "type":"circle",
                            "alpha":"0.6",
                            "border-width":0
                        },
                        "tooltip":{
                            "text":"%plot-description",
                            "visible":true
                        }
                    },
                    "crosshair-x":{},
                    "tooltip":{
                        "visible":true
                    },
                    "plot":{
                        "stacked":true,
                        "background-color":"#000000",
                        "animation":{
                            "effect":"4"
                        }
                    },
                    "plotarea":{

                    },
                    "scale-x":{
                        "values":["-11","-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","Now"],
                        "line-color":"#adadad",
                        "line-width":"1px",
                        "item":{
                            "font-size":"10px",
                            "font-family":"arial",
                            "offset-y":"-2%"
                        },
                        "guide":{
                            "visible":true
                        },
                        "tick":{
                            "visible":false
                        }
                    },
                    "scale-y":{
                        "line-color":"none",
                        "item":{
                            "font-size":"10px",
                            "font-family":"arial",
                            "offset-x":"2%"
                        },
                        "guide":{
                            "line-style":"solid",
                            "line-color":"#adadad"
                        },
                        "tick":{
                            "visible":false
                        }
                    },
                    "series": mySeries

                }
                ]
            };
            break;
            case 'Bubble' :
            var mySeries = [];
                var metricsByTask = _.chain(mKPI.metricsGroupByTask).pairs().sortBy(function(item) { return item[0]; }).last().value(); // on prend les taches du dernier mois
                _.forEach(metricsByTask[1], function(item, key) { // pour chaque tache
                    var lastMetric = _.chain(item).sortBy('date').last().value(); // on prend la dernière mesure
                    mySeries.push( {
                         "values":[
                                      [lastMetric.value, lastMetric.daysToDeadline, lastMetric.load]
                          ],
                        "text":lastMetric.taskname || 'No task',
                        "marker":{
                            "background-color":lastMetric.color,
                            "alpha":"0.6"
                        }
                    } );
                });

            var myChart=
                {
                "graphset":[
                    {
                        "type":"bubble",
                        "plotarea":{
                            "background-color":"none",
                            "margin":"0px 0px 50px 50px"
                        },
                        "scale-y":{
                            "label":{
                                "text":"Delivery Deadline (days)"
                            }
                        },
                        "scale-x":{
                            "labels":["Late","At Risk","On Time"],
                            "label":{
                                "text":"Vs scheduled"
                            },
                            "values":"1:3:1"
                        },
                        "plot":{
                            "size-factor":3,
                            "value-box":{
                                "type":"all",
                                "text":"%t",
                                "placement":"bottom"
                            }
                        },
                        "series":mySeries
                    }
                ]
                };
    } // fin switch
    return myChart;

    },
    buildHierarchy: function (arry, type) {

        var roots = [], children = {}, list = [];

        // find the top level nodes and hash the children based on parent
        for (var i = 0, len = arry.length; i < len; ++i) {
            var item = arry[i];
            var p = item.parent;
            var target = (p == '#') ? roots : (children[p] || (children[p] = []));
            item.longname = item.text;
            target.push({ value: item });
        }

        // function to recursively build the tree
        var findChildren = function(parent,longname) {
            if (children[parent.value.id]) {
                parent.children = children[parent.value.id];
                for (var i = 0, len = parent.children.length; i < len; ++i) {
                    parent.children[i].value.longname = parent.value.longname+'.'+parent.children[i].value.text;
                    list.push({text:parent.children[i].value.text, longName:parent.children[i].value.longname,id:parent.children[i].value.id});
                    findChildren(parent.children[i],parent.value.longname);
                }
            }
        };

        // enumerate through to handle the case where there are multiple roots
        for (var i = 0, len = roots.length; i < len; ++i) {
            list.push({text:roots[i].value.longname,id:roots[i].value.id});
            findChildren(roots[i]);
        }
        if (type='list') {return list};
        if (type='Treeview') {return roots};        
    },
    groupByMonth: function(metrics, fieldDate, field) {


        var dateResult = [];
        var i;
        var yourDate = new Date();
        for (i=0;i<12;i++){
            dateResult.push(new Date(yourDate.getFullYear(), yourDate.getMonth() - i, 1));
        }

        var map_result = _.map(dateResult, function (item) {
          var d = new Date(new Number(new Date(item)));
          var month = d.getFullYear()   + "." + ("0" + d.getMonth()).slice(-2);
          return {
              "label": month,
              "count": null
              //,
              //"sum": null,
              //"mean":null
            };
        });

        map_result.reverse() // par ordre croissant
        var myGroup = {};

        _.forEach(metrics, function (metric) {
            var d = new Date(new Number(new Date(metric[fieldDate])));
            var month = d.getFullYear()  + "." + ("0" + d.getMonth()).slice(-2) ;

            if (typeof myGroup[metric[field]] === 'undefined') {
                myGroup[metric[field]] = _.clone(map_result,true);           
            }

            _.forEach(myGroup[metric[field]], function (itemMap) {
                if (itemMap.label === month) {
                    itemMap.count += 1;

                    itemMap.color = metric.color;
                    itemMap.value = metric.value;
                    itemMap.description = metric.description;

                }
            });
        });

        return myGroup;
    },
    groupByTask: function(metrics, tasks, field) {

        var myGroup = {};

        // on trie
        var sortMetrics = _.sortBy(metrics, 'date');

        // on groupe
        var groupMetrics = groupByMulti(sortMetrics,['month','taskname'])

        return groupMetrics;
    }
};

