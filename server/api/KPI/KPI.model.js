'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KPISchema = new Schema({
  name: String,
  activity: String,
  context: String,
  axe: String,
  tags:String,
  category: String,
  constraint:String,
  refresh:Number,
  action:String,
  metricTaskField:String,
  metricTaskValues:String,
  refMetricTaskField:String,
  refMetricTaskValues:String,
  groupBy:String,
  groupTimeBy:String,
  actor:String,
  date:{ type: Date, default: Date.now }
}, { strict: false });

module.exports = mongoose.model('KPI', KPISchema);