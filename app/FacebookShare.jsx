/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var FacebookShare = React.createClass({
    onShare: function () {
        console.log(this.props.href);
        FB.ui({
            method: 'share',
            href: this.props.href
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