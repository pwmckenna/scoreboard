/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _ = require('lodash');

var Player = React.createClass({
    getInitialState: function () {
        return this.props.initialState;
    },
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
                            title={'Just ' + this.state.count + '? Perhaps the poor deserve their fate.'}
                            style={{
                                color: this.state.color,
                                fontWeight: 'bold'
                            }}>{this.state.count}</span>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: '1em',
                    fontWeight: 'bold'
                }}>
                    <div>{this.state.name}</div>
                </ReactBootstrap.Row>
            </div>
        );
    }
});

module.exports = Player;