/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');

var App = React.createClass({
    render: function () {
        return (
            <ReactRouter.RouteHandler {...this.props} />
        )
    }
});
	
module.exports = App;
