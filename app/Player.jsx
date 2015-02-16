/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _ = require('lodash');

var Player = React.createClass({
    render: function () {
        return (
            <div>
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: '10em'
                }}>
                    <ReactBootstrap.Col md={6} mdOffset={3}>
                        <span
                            title={'Just ' + this.props.initialState.count + '? Perhaps the poor deserve their fate.'}
                            style={{
                                color: this.props.initialState.color,
                                fontWeight: 'bold'
                            }}>{this.props.initialState.count}</span>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: '1em',
                    fontWeight: 'bold'
                }}>
                    <div>{this.props.initialState.name}</div>
                </ReactBootstrap.Row>
            </div>
        );
    }
});

module.exports = Player;