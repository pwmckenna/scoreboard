/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var q = require('q');
var _ = require('lodash');
var Firebase = require('firebase');
var RouteNotFound = require('./RouteNotFound.jsx');
var RouteError = require('./RouteError.jsx');

var routes = require('./routes.jsx');

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    q.all(state.routes.map(function (route) {
        return route.handler.fetchData ? route.handler.fetchData(state.params) : {};
    })).then(function (res) {
        var props = _.extend.apply(void 0, [{}].concat(res));
        React.render(<Handler {...props} />, document.getElementById('container'));
    }).fail(function (err) {
    	React.render(<RouteError err={err} />, document.getElementById('container'));
    });
});
