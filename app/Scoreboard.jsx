/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var Firebase = require('firebase');
var q = require('q');

var FacebookShare = require('./FacebookShare.jsx');
var Player = require('./Player.jsx');

var Scoreboard = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],
    getInitialState: function () {
        return {
            players: {},
            name: ''
        };
    },
    componentDidMount: function () {
        var firebaseRef = new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + this.getParams().id);
        firebaseRef.on('value', function (snapshot) {
            console.log('state', snapshot.val());
            this.setState(snapshot.val() || {});
        }.bind(this));
    },
    componentWillUnmount: function () {
        var firebaseRef = new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + this.getParams().id);
        firebaseRef.off();
    },
    render: function () {
        return (
            <div>
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '6em'                
                }}>
                    <div>{this.state.name}</div>
                </ReactBootstrap.Row>
                {Object.keys(this.state.players).map(function (key) {
                    return <Player
                        key={key}
                        initialState={this.state.players[key]} />
                }.bind(this))}
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: '10em'
                }}>
                    <FacebookShare
                        href={this.makeHref('scoreboard', {
                            id: this.getParams().id
                        })}
                        title='Spread word of your impending victory throughout the land!' />
                </ReactBootstrap.Row>
            </div>
        );
    }
});

module.exports = Scoreboard;