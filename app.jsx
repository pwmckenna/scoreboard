/** @jsx React.DOM */
var React = require('react');

var _ = require('lodash');
var q = require('q');
var express = require('express');
var app = express();

var Router = require('react-router');
var routes = require('./app/routes.jsx');

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(process.cwd() + '/build'));

app.use(function (req, res, next) {
    q.resolve().then(function () {
        var defer = q.defer();
        Router.run(routes, req.path, function () {
            defer.resolve(arguments);
        });
        return defer.promise;
    }).spread(function (Handler, state) {
        return q.all(state.routes.map(function (route) {
            return route.handler.fetchData ? route.handler.fetchData() : {};
        })).then(function (data) {
            var props = _.extend.apply(void 0, [{}].concat(data));
            return React.renderToString(<Handler {...props} />);
        });
    }).fail(function () {
        return '';
    }).then(function (content) {
        console.log('content', content);
        res.render('index', {
            content: content
        });
    });
});

module.exports = app;