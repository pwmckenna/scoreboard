/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var FacebookShare = React.createClass({
    onShare: function () {
        var href = location.origin + this.props.href;
        console.log('onShare', href);
        FB.ui({
            method: 'share',
            href: href
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