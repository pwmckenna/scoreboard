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
    statics: {
        fetchData: function (params) {
            var firebase = new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + params.id);

            var defer = q.defer();
            firebase.on('value', function (snapshot) {
                defer.resolve(snapshot.val());
            });
            return defer.promise.then(function (initialState) {
                return {
                    firebase: firebase,
                    initialState: initialState
                };
            });
        }
    },
    getInitialState: function () {
        return _.defaults(this.props.initialState, {
            players: []
        });
    },
    componentDidMount: function () {
        this.props.firebase.on('value', function (snapshot) {
            console.log('state', snapshot.val());
            this.setState(snapshot.val() || {});
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.props.firebase.off();
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