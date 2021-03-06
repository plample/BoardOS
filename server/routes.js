/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/dashboardCompletes', require('./api/dashboardComplete'));
  app.use('/api/taskCompletes', require('./api/taskComplete'));
  app.use('/api/taskFulls', require('./api/taskFull'));
  app.use('/api/anomalies', require('./api/anomalie'));
  app.use('/api/whatsnews', require('./api/whatsnew'));
  app.use('/api/mails', require('./api/mail'));
  app.use('/api/dqms', require('./api/dqm'));
  app.use('/api/helps', require('./api/help'));
  app.use('/api/logs', require('./api/log'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/dashboards', require('./api/dashboard'));
  app.use('/api/KPIs', require('./api/KPI'));
  app.use('/api/hierarchies', require('./api/hierarchy'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/metrics', require('./api/metric'));
  app.use('/api/logs', require('./api/log'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
