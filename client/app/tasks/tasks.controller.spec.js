'use strict';

describe('Controller: TasksCtrl', function() {
    var httpBackend, $rootScope, createController, httpResponse, httpResponseHierarchy;
    var HierarchyOnStart, hierarchiesCtrl, scope;

    // load the controller's module
    beforeEach(module('boardOsApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        // Set up the mock http service responses
        httpBackend = $httpBackend;
        // backend definition common for all tests
        /*jshint quotmark: double */
        httpResponse = {
            "context": "",
            "activity": "",
            "tasks": [{
                "_id": "54786dbf1ff267c8166aeddb",
                "name": "Define needs",
                "context": "Projet.DECID.PERIMETER1.DEFINE NEEDS",
                "activity": "DCLIC.CBI.BICS",
                "date": "2014-12-29T09:18:04.654Z",
                "__v": 0,
                "actor": "Will",
                "timetowait": 30,
                "timewaited": 22,
                "timebetween": 8,
                "lastmetric": {
                    "_id": "54c3a8eb7a1edf0c1d60ddb1",
                    "date": "2015-01-24T14:14:46.000Z",
                    "activity": "DCLIC.CBI.BICS",
                    "context": "Projet.DECID.PERIMETER1.DEFINE NEEDS",
                    "startDate": "2014-11-16T23:00:00.000Z",
                    "endDate": "2015-01-28T23:00:00.000Z",
                    "load": "45",
                    "progress": "100",
                    "status": "Finished",
                    "progressStatus": "On Time",
                    "trust": "100",
                    "actor": "Will",
                    "__v": 0,
                    "timeSpent": "40",
                    "deliverableStatus": "50",
                    "userSatisfaction": "50",
                    "actorSatisfaction": "50",
                    "fromNow": "22 days ago"
                }
            }, {
                "_id": "548bfbbb2bf5dde01d7a6176",
                "name": "Define cartography",
                "context": "Projet.DECID.PERIMETER1.CARTOGRAPHY",
                "activity": "DCLIC.CBI.BICS",
                "date": "2014-12-29T09:17:55.835Z",
                "__v": 0,
                "actor": "Will",
                "timetowait": 30,
                "timewaited": 22,
                "timebetween": 8,
                "lastmetric": {
                    "_id": "54c3c0cffad2eb882336f1fc",
                    "activity": "DCLIC.CBI.BICS",
                    "context": "Projet.DECID.PERIMETER1.CARTOGRAPHY",
                    "startDate": "2014-09-30T22:00:00.000Z",
                    "endDate": "2014-11-13T23:00:00.000Z",
                    "load": "20",
                    "progress": "100",
                    "date": "2015-01-24T15:56:17.000Z",
                    "status": "Finished",
                    "progressStatus": "On Time",
                    "trust": "100",
                    "__v": 0,
                    "actor": "Will",
                    "color": "#859900",
                    "value": 3,
                    "description": "<= scheduled deadline",
                    "month": "2014.09",
                    "taskname": "Define cartography",
                    "daysToDeadline": -50,
                    "comments": "Correction d'une ereur de calcul",
                    "timeSpent": "21",
                    "deliverableStatus": "60",
                    "userSatisfaction": "60",
                    "actorSatisfaction": "60",
                    "reworkReason": "Internal",
                    "fromNow": "22 days ago"
                }
            }, {
                "_id": "548d5c59eb285a7417068157",
                "name": "SDTM Shift",
                "context": "Production.S016257.CL316257063",
                "activity": "DCLIC.CBI.TREND.STAND",
                "date": "2015-01-24T10:47:36.878Z",
                "__v": 0,
                "tags": "CDISC",
                "actor": "549800f633fca76c16fca2af",
                "impact": "50",
                "load": "50",
                "timetowait": 30,
                "timewaited": 54,
                "timebetween": -24,
                "lastmetric": {
                    "_id": "549af5fe7dc1cdcc0c589b27",
                    "activity": "DCLIC.CBI.TREND.STAND",
                    "context": "Production.S016257.CL316257063",
                    "startDate": "2014-12-11T23:00:00.000Z",
                    "endDate": "2015-02-16T23:00:00.000Z",
                    "load": "17",
                    "progress": "100",
                    "status": "Finished",
                    "comments": "c fini",
                    "__v": 0,
                    "date": "2014-12-23T23:00:00.000Z",
                    "trust": "100",
                    "progressStatus": "On Time",
                    "actor": "Will",
                    "actorSatisfaction": "80",
                    "deliverableStatus": "80",
                    "userSatisfaction": "80",
                    "timeSpent": "17",
                    "fromNow": "2 months ago"
                }
            }, {
                "_id": "228d5c59eb285a7417068157",
                "name": "ADAM Shift",
                "context": "Production.S016257.CL316257063",
                "activity": "DCLIC.CBI.TREND.AD",
                "date": "2015-02-06T16:12:50.892Z",
                "__v": 0,
                "actor": "549800f633fca76c16fca2af",
                "load": "15",
                "timetowait": 30,
                "timewaited": 13,
                "timebetween": 17,
                "lastmetric": {
                    "_id": "54cfd508cffd6b2c2f03e5bc",
                    "activity": "DCLIC.CBI.TREND.AD",
                    "context": "Production.S016257.CL316257063",
                    "startDate": "2014-09-30T22:00:00.000Z",
                    "endDate": "2015-02-26T23:00:00.000Z",
                    "load": "15",
                    "status": "In Progress",
                    "progress": "70",
                    "progressStatus": "Late",
                    "date": "2015-02-02T19:50:17.000Z",
                    "trust": "10",
                    "comments": "C'est vachement compliqué en fait :'(",
                    "__v": 0,
                    "actor": "Will",
                    "timeSpent": "20",
                    "fromNow": "13 days ago"
                }
            }, {
                "_id": "54a96a2acd959aec19ea984e",
                "name": "MUSICALL",
                "context": "Projet.HIP.CDW.V.MUSICALL",
                "activity": "DCLIC.CBI.DRIVE.BORD",
                "actor": "549800f633fca76c16fca2af",
                "date": "2015-02-06T15:55:40.992Z",
                "__v": 0,
                "load": "80",
                "timetowait": 30,
                "timewaited": 10,
                "timebetween": 20,
                "lastmetric": {
                    "_id": "54d3b978723b251024c85b90",
                    "date": "2015-02-05T18:41:57.000Z",
                    "activity": "DCLIC.CBI.DRIVE.BORD",
                    "context": "Projet.HIP.CDW.V.MUSICALL",
                    "startDate": "2014-02-02T23:00:00.000Z",
                    "endDate": "2015-03-29T22:00:00.000Z",
                    "load": "80",
                    "progress": "86",
                    "status": "In Progress",
                    "progressStatus": "Late",
                    "trust": "85",
                    "__v": 0,
                    "actor": "Will",
                    "timeSpent": "75",
                    "fromNow": "10 days ago"
                }
            }, {
                "_id": "54b4390f9b13b2400d5e5d9d",
                "context": "Quality.MOP.DCLIC-CBI-MOP-001",
                "name": "Update OPM CBI 001",
                "activity": "DCLIC.CBI",
                "actor": "Will",
                "date": "2015-01-12T21:13:51.623Z",
                "__v": 0,
                "timetowait": 30,
                "timewaited": 31,
                "timebetween": -1,
                "lastmetric": {
                    "_id": "54b439579b13b2400d5e5d9f",
                    "date": "2015-01-15T23:00:00.000Z",
                    "activity": "DCLIC.CBI",
                    "context": "Quality.MOP.DCLIC-CBI-MOP-001",
                    "startDate": "2012-01-03T23:00:00.000Z",
                    "endDate": "2012-01-15T23:00:00.000Z",
                    "load": "2",
                    "progress": "100",
                    "status": "Finished",
                    "progressStatus": "On Time",
                    "trust": "100",
                    "__v": 0,
                    "actor": "Will",
                    "timeSpent": "2",
                    "fromNow": "a month ago"
                }
            }, {
                "_id": "54a85df7eedad9f40b99f5d4",
                "name": "Portail BIRD",
                "context": "Projet.DECID.PMO",
                "activity": "DCLIC.CBI.BICS",
                "actor": "549800f633fca76c16fca2af",
                "date": "2015-01-19T22:40:10.946Z",
                "__v": 0,
                "budget": "",
                "deliverables": "",
                "endDate": "",
                "load": "20",
                "risks": "",
                "startDate": "",
                "timetowait": 30,
                "timewaited": 9,
                "timebetween": 21,
                "lastmetric": {
                    "_id": "54d4ab1f2429b628206b5e26",
                    "date": "2015-02-06T11:52:56.000Z",
                    "activity": "DCLIC.CBI.BICS",
                    "context": "Projet.DECID.PMO",
                    "startDate": "2014-09-30T22:00:00.000Z",
                    "endDate": "2015-02-01T23:00:00.000Z",
                    "load": "16",
                    "progress": "95",
                    "status": "In Progress",
                    "progressStatus": "On Time",
                    "trust": "100",
                    "actor": "Will",
                    "__v": 0,
                    "timeSpent": "18",
                    "fromNow": "9 days ago"
                }
            }, {
                "_id": "54c3d84e50f5ca780709308e",
                "name": "Update OPM CBI 002",
                "context": "Quality.MOP.DCLIC-CBI-MOP-002",
                "activity": "DCLIC.CBI",
                "actor": {
                    "_id": "549800f633fca76c16fca2af",
                    "provider": "local",
                    "name": "Will",
                    "email": "willy.stophe.pro@gmail.com",
                    "__v": 0,
                    "role": "admin"
                },
                "date": "2015-01-24T17:37:59.844Z",
                "__v": 0,
                "load": "2",
                "timetowait": 30,
                "timewaited": 10,
                "timebetween": 20,
                "lastmetric": {
                    "_id": "54d3ba2f9b9cf50c256df8a5",
                    "date": "2015-02-05T18:44:55.000Z",
                    "activity": "DCLIC.CBI",
                    "context": "Quality.MOP.DCLIC-CBI-MOP-002",
                    "startDate": "2015-01-23T23:00:00.000Z",
                    "endDate": "2015-01-26T23:00:00.000Z",
                    "load": "2",
                    "timeSpent": "1",
                    "progress": "61",
                    "progressStatus": "Late",
                    "trust": "100",
                    "status": "In Progress",
                    "actor": "Will",
                    "__v": 0,
                    "fromNow": "10 days ago"
                }
            }, {
                "_id": "54c4ba9804b934a4041efcbe",
                "name": "MapBase v1.5",
                "context": "Projet.HIP.CDW.MAPBASE.15",
                "activity": "DCLIC.CBI.DRIVE.SASDEV.CBI",
                "load": "10",
                "budget": "5000",
                "startDate": "",
                "actor": {
                    "_id": "549800f633fca76c16fca2af",
                    "provider": "local",
                    "name": "Will",
                    "email": "willy.stophe.pro@gmail.com",
                    "__v": 0,
                    "role": "admin"
                },
                "date": "2015-01-25T09:42:48.282Z",
                "__v": 0,
                "timetowait": 30,
                "timewaited": 10,
                "timebetween": 20,
                "lastmetric": {
                    "_id": "54d3b9e39b9cf50c256df8a3",
                    "date": "2015-02-05T18:43:42.000Z",
                    "activity": "DCLIC.CBI.DRIVE.SASDEV.CBI",
                    "context": "Projet.HIP.CDW.MAPBASE.15",
                    "startDate": "2015-01-24T23:00:00.000Z",
                    "endDate": "2015-02-01T23:00:00.000Z",
                    "load": "10",
                    "timeSpent": "16",
                    "progress": "100",
                    "progressStatus": "On Time",
                    "trust": "100",
                    "status": "Finished",
                    "comments": "y'a un bug",
                    "actor": "Will",
                    "__v": 0,
                    "deliverableStatus": "100",
                    "userSatisfaction": "80",
                    "actorSatisfaction": "80",
                    "reworkReason": "Internal",
                    "fromNow": "10 days ago"
                }
            }, {
                "_id": "54d4cb002429b628206b5e28",
                "activity": "DCLIC.CBI.BICS.STRAT.Modelisation",
                "name": "Modélisation du pool SDTM1.5",
                "context": "Tools.Pool SDTM+.1.5",
                "actor": {
                    "_id": "549800f633fca76c16fca2af",
                    "provider": "local",
                    "name": "Will",
                    "email": "willy.stophe.pro@gmail.com",
                    "__v": 0,
                    "role": "admin"
                },
                "date": "2015-02-06T14:09:04.319Z",
                "__v": 0,
                "timetowait": 30,
                "timewaited": 0,
                "timebetween": 30,
                "lastmetric": {
                    "_id": "54e09aa513f23fdc07749ca4",
                    "date": "2015-02-15T13:09:34.000Z",
                    "activity": "DCLIC.CBI.BICS.STRAT.Modelisation",
                    "context": "Tools.Pool SDTM+.1.5",
                    "actor": {
                        "_id": "549800f633fca76c16fca2af",
                        "provider": "local",
                        "name": "Will",
                        "email": "willy.stophe.pro@gmail.com",
                        "__v": 0,
                        "role": "admin"
                    },
                    "status": "Not Started",
                    "timeSpent": "0",
                    "progress": "0",
                    "progressStatus": "On Time",
                    "trust": "100",
                    "startDate": "2015-02-01T23:00:00.000Z",
                    "endDate": "2015-02-26T23:00:00.000Z",
                    "load": "20",
                    "__v": 0,
                    "fromNow": "33 minutes ago"
                }
            }, {
                "_id": "54d4f7fbf5b3d8f01e2ddaa3",
                "name": "SDTM Signify",
                "context": "S016257.Production.CL316257083",
                "activity": "DCLIC.CBI.TREND.STAND",
                "load": "20",
                "actor": {
                    "_id": "549800f633fca76c16fca2af",
                    "provider": "local",
                    "name": "Will",
                    "email": "willy.stophe.pro@gmail.com",
                    "__v": 0,
                    "role": "admin"
                },
                "date": "2015-02-06T17:20:59.234Z",
                "__v": 0,
                "timetowait": 30,
                "timewaited": 9,
                "timebetween": 21,
                "lastmetric": {
                    "_id": "54d4f826f5b3d8f01e2ddaa5",
                    "date": "2015-02-06T17:21:02.000Z",
                    "activity": "DCLIC.CBI.TREND.STAND",
                    "context": "S016257.Production.CL316257083",
                    "startDate": "2015-02-03T23:00:00.000Z",
                    "endDate": "2015-02-25T23:00:00.000Z",
                    "load": "20",
                    "timeSpent": "10",
                    "progress": "30",
                    "progressStatus": "On Time",
                    "trust": "60",
                    "status": "In Progress",
                    "actor": "Will",
                    "__v": 0,
                    "fromNow": "9 days ago"
                }
            }],
            "dashboards": [],
            "kpis": [{
                "_id": "54b43f5a9b13b2400d5e5da4",
                "name": "Documents uptodate",
                "context": "Quality",
                "category": "Alert",
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "action": "count",
                "activity": "",
                "metricTaskField": "timeToEnd",
                "refMetricTaskField": "Constant",
                "refMetricTaskValues": "-500",
                "refresh": 30,
                "constraint": "Quality",
                "refListValues": "ValuesLessThan",
                "listValues": "LastValue",
                "groupBy": "Task",
                "date": "2015-02-06T14:59:21.807Z"
            }, {
                "_id": "5471fa36f54c90d408453560",
                "name": "Deliver On Time",
                "__v": 0,
                "activity": "",
                "axe": "",
                "context": "",
                "tags": "",
                "action": "Count",
                "refresh": 30,
                "metricTaskField": "progressStatus",
                "refMetricTaskField": "progressStatus",
                "refMetricTaskValues": "On Time + Late + At Risk",
                "groupBy": "Task",
                "categories": {
                    "0": true
                },
                "metricTaskValues": "On Time",
                "category": "Goal",
                "actor": "549800f633fca76c16fca2af",
                "groupTimeBy": "Month",
                "constraint": "Time",
                "listValues": "LastValue",
                "refListValues": "LastValue",
                "date": "2015-01-24T13:23:52.381Z"
            }, {
                "_id": "54c39de0e39744701ae1d709",
                "name": "Customer Satisfaction",
                "category": "Goal",
                "constraint": "Quality",
                "action": "Mean",
                "listValues": "AllValues",
                "metricTaskField": "userSatisfaction",
                "refListValues": "AllValues",
                "refMetricTaskField": "Constant",
                "refMetricTaskValues": "100",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "whereField": "status",
                "whereOperator": "IsEqual",
                "whereValues": "Finished",
                "date": "2015-01-24T13:58:12.798Z"
            }, {
                "_id": "25c68de0e39744701ae1d721",
                "name": "Actor Satisfaction",
                "category": "Goal",
                "constraint": "Quality",
                "action": "Mean",
                "listValues": "AllValues",
                "metricTaskField": "actorSatisfaction",
                "refListValues": "AllValues",
                "refMetricTaskField": "Constant",
                "refMetricTaskValues": "100",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "whereField": "status",
                "whereOperator": "IsEqual",
                "whereValues": "Finished",
                "date": "2015-01-24T13:58:12.798Z"
            }, {
                "_id": "54c3aaa37a1edf0c1d60ddb2",
                "name": "Internal Defect Prevention",
                "category": "Goal",
                "constraint": "Quality",
                "action": "Count",
                "listValues": "AllValues",
                "metricTaskField": "reworkReason",
                "whereField": "status",
                "whereOperator": "IsEqual",
                "whereValues": "Finished",
                "metricTaskValues": "External",
                "refListValues": "AllValues",
                "refMetricTaskField": "status",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "refMetricTaskValues": "Finished",
                "date": "2015-01-24T14:36:49.396Z"
            }, {
                "_id": "26c3aaa21a1edf0c1d54ddb9",
                "name": "External Defect Prevention",
                "category": "Goal",
                "constraint": "Quality",
                "action": "Count",
                "listValues": "AllValues",
                "metricTaskField": "reworkReason",
                "whereField": "status",
                "whereOperator": "IsEqual",
                "whereValues": "Finished",
                "metricTaskValues": "Internal",
                "refListValues": "AllValues",
                "refMetricTaskField": "status",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "refMetricTaskValues": "Finished",
                "date": "2015-01-24T14:36:49.396Z"
            }, {
                "_id": "54c3cad886548f700ba51199",
                "name": "Service Cycle Time",
                "category": "Goal",
                "constraint": "Time",
                "action": "Mean",
                "listValues": "LastValue",
                "metricTaskField": "timeSpent",
                "refListValues": "LastValue",
                "refMetricTaskField": "duration",
                "whereField": "",
                "whereOperator": "",
                "whereValues": "",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "date": "2015-02-06T17:16:52.824Z"
            }, {
                "_id": "54bd884f65068d8c1d0f24f2",
                "name": "Deliver On Budget",
                "category": "Goal",
                "constraint": "Cost",
                "action": "Mean",
                "metricTaskField": "load",
                "refMetricTaskField": "timeSpent",
                "refMetricTaskValues": "",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "listValues": "LastValue",
                "refListValues": "LastValue",
                "whereField": "status",
                "whereOperator": "isEqual",
                "whereValues": "Finished",
                "date": "2015-02-08T16:38:39.879Z"
            }, {
                "_id": "54c3d210fb9b4ec40ba9422f",
                "name": "Predicted OverCharge",
                "category": "Alert",
                "constraint": "Cost",
                "action": "Mean",
                "listValues": "LastValue",
                "metricTaskField": "projectedWorkload",
                "refListValues": "FirstValue",
                "refMetricTaskField": "load",
                "groupBy": "Task",
                "groupTimeBy": "Month",
                "refresh": 30,
                "actor": "549800f633fca76c16fca2af",
                "__v": 0,
                "activity": "",
                "context": "",
                "whereField": "status",
                "whereOperator": "IsEqual",
                "whereValues": "In Progress",
                "date": "2015-02-06T20:21:19.732Z"
            }],
            "actors": [{
                "name": "Will",
                "count": 47
            }]
        };
        /*jshint quotmark: single */
        httpBackend.when('GET', '/api/tasks').respond(httpResponse);

        httpResponseHierarchy = {
            list: ['hierarchyX']
        };
        httpBackend.when('GET', '/api/hierarchies/list/Context').respond(httpResponseHierarchy);
        httpBackend.when('GET', '/api/hierarchies/list/Activity').respond(httpResponseHierarchy);
        httpBackend.when('GET', '/api/hierarchies/list/Axis').respond(httpResponseHierarchy);
        // Get hold of a scope (i.e. the root scope)
        scope = $rootScope.$new();
        createController = function() {
            return $controller('TasksCtrl', {
                '$scope': scope
            });
        };
    }));

    afterEach(inject(function($httpBackend, $rootScope) {
        // Force all of the http requests to respond.
        try {
            httpBackend.flush();
        } catch (err) {}
        // Force all of the promises to resolve.
        // VERY IMPORTANT: If we do not resolve promises, none of the dependent
        // expectations will be called, and the spec may pass inadvertantly.
        try {
            $rootScope.$digest();
        } catch (err) {}
        // Check that we don't have anything else hanging.
        try {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.resetExpectations();
        } catch (err) {}
    }));

    describe('Filters', function() {

        it('should return all tasks not Finished at start', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            expect(scope.tasks.length).toBe(6);
        });

        it('should return one task when searchText is a name', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.searchText = 'MUSICALL';
            scope.$digest();
            expect(scope.tasks.length).toBe(1);
        });

        it('should return one task when searchText is a context', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.searchText = 'Quality';
            scope.$digest();
            expect(scope.tasks.length).toBe(1);
        });

        it('should return two tasks when searchText is an activity', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.searchText = 'BICS';
            scope.$digest();
            expect(scope.tasks.length).toBe(2);
        });

        it('should return filtered tasks when filterStatus is changed', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.filterStatus = 'In Progress';
            scope.$digest();
            expect(scope.tasks.length).toBe(5);
        });

        it('should return filtered tasks when filterProgressStatus is changed', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.filterProgressStatus = 'Late';
            scope.$digest();
            expect(scope.tasks.length).toBe(3);
        });

        it('should combine filters when filterProgressStatus + filterStatus are changed', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.filterStatus = 'In Progress';
            scope.filterProgressStatus = 'On Time';
            scope.$digest();
            expect(scope.tasks.length).toBe(2);
        });

        it('should combine filters when filterProgressStatus + filterStatus + searchText are changed', function() {
            var controller = createController();
            scope.Load();
            httpBackend.flush();
            scope.searchText = 'BICS';
            scope.filterStatus = 'Finished';
            scope.filterProgressStatus = 'On Time';
            scope.$digest();
            expect(scope.tasks.length).toBe(2);
        });

    });

});