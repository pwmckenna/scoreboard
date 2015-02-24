/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');

var App = require('./App.jsx');
var ScoreboardEditable = require('./ScoreboardEditable.jsx');
var Scoreboard = require('./Scoreboard.jsx');
var RouteNotFound = require('./RouteNotFound.jsx');
var EditRedirect = require('./EditRedirect.jsx');

module.exports = (
    <ReactRouter.Route handler={App}>
        <ReactRouter.Route path='/' handler={EditRedirect} />
        <ReactRouter.Route name='scoreboard' path='/scoreboards/:id' handler={Scoreboard} />
        <ReactRouter.Route name='edit' path='/scoreboards/:id/edit' handler={ScoreboardEditable} />
        <ReactRouter.NotFoundRoute handler={RouteNotFound} />
    </ReactRouter.Route>
);