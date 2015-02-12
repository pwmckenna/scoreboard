/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var q = require('q');
var _ = require('lodash');

var App = require('./App.js');
var ScoreboardEditable = require('./ScoreboardEditable.js');
var Scoreboard = require('./Scoreboard.js');
var NotFound = require('./NotFound.js');

var routes = (
    <ReactRouter.Route handler={App}>
        <ReactRouter.Route name='edit' path='/' handler={ScoreboardEditable} />
        <ReactRouter.Route name='scoreboard' path='/scoreboard/:id' handler={Scoreboard} />
        <ReactRouter.NotFoundRoute handler={NotFound} />
    </ReactRouter.Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler, state) {
    console.log(state.routes);
    q.all(state.routes.map(function (route) {
        return route.handler.fetchData ? route.handler.fetchData() : {};
    })).then(function (res) {
        var props = _.extend.apply(void 0, [{}].concat(res));
        React.render(<Handler {...props} />, document.getElementById('container'));
    });
});
