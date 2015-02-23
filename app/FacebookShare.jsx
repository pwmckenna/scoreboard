/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var FacebookShare = React.createClass({
    onShare: function () {
        FB.ui({
            method: 'share',
            href: location.origin + this.props.href
        });
    },

    render: function () {
        return (
            <ReactBootstrap.Glyphicon
                glyph='share'
                title={this.props.title}
                onClick={this.onShare} />
        )
    }
});

module.exports = FacebookShare;