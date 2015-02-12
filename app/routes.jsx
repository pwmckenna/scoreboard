/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');

var App = require('./App.jsx');
var ScoreboardEditable = require('./ScoreboardEditable.jsx');
var Scoreboard = require('./Scoreboard.jsx');
var NotFound = require('./NotFound.jsx');

module.exports = (
    <ReactRouter.Route handler={App}>
        <ReactRouter.Route name='edit' path='/' handler={ScoreboardEditable} />
        <ReactRouter.Route name='scoreboard' path='/scoreboard/:id' handler={Scoreboard} />
        <ReactRouter.NotFoundRoute handler={NotFound} />
    </ReactRouter.Route>
);