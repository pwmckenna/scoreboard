/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var q = require('q');
var _ = require('lodash');
var Firebase = require('firebase');

var routes = require('./routes.jsx');

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    q.all(state.routes.map(function (route) {
        return route.handler.fetchData ? route.handler.fetchData(state.params) : {};
    })).then(function (res) {
        var props = _.extend.apply(void 0, [{}].concat(res));
        React.render(<Handler {...props} />, document.getElementById('container'));
    });
});
