/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var Firebase = require('firebase');
var q = require('q');
var _ = require('lodash');

var COLORS = require('./colors');

var ContentEditable = require('./ContentEditable.jsx');
var FacebookShare = require('./FacebookShare.jsx');
var PlayerEditable = require('./PlayerEditable.jsx');

var ScoreboardEditable = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],
    getFirebase: function () {
        return new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + this.getParams().id);
    },
    getInitialState: function () {
        return {
            players: {},
            name: ''
        };
    },
    componentDidMount: function () {
        this.getFirebase().on('value', function (snapshot) {
            this.setState(snapshot.val() || {});
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.getFirebase().off();
    },
    onAdd: function () {
        this.getFirebase().child('players').push({
            name: 'editable player name',
            color: _.sample(COLORS),
            score: 0
        });
    },
    onChangeName: function (e) {
        this.getFirebase().child('name').set(e.target.value);
    },
    render: function () {
        console.log('render');
        return (
            <div>
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '6em'                
                }}>
                    <ContentEditable html={this.state.name} onChange={this.onChangeName} />
                </ReactBootstrap.Row>
                {Object.keys(this.state.players).map(function (key) {
                    var player = this.state.players[key];
                    var onIncrement = function () {
                        this.getFirebase().child('players').child(key).child('count').set(this.state.players[key].count + 1);
                    }.bind(this);
                    var onDecrement = function () {
                        this.getFirebase().child('players').child(key).child('count').set(this.state.players[key].count - 1);
                    }.bind(this);
                    var onRefresh = function () {
                        if (window.confirm('I shall strip ' + this.state.name + ' of everything for you. Points, honor, dignity...')) {
                            this.getFirebase().child('players').child(key).child('count').set(0);
                        }
                    }.bind(this);
                    var onRemove = function () {
                        if (window.confirm('I shall smote ' + this.state.name + ' on your command.')) {
                            this.getFirebase().child('players').child(key).remove();
                        }
                    }.bind(this);
                    var onChangeName = function (e) {
                        this.getFirebase().child('players').child(key).child('name').set(e.target.value);
                    }.bind(this);

                    return <PlayerEditable
                        key={key}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onRefresh={onRefresh}
                        onRemove={onRemove}
                        onChangeName={onChangeName}
                        initialState={this.state.players[key]}/>
                }.bind(this))}
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: '10em'
                }}>
                    <ReactBootstrap.Glyphicon
                        glyph='plus'
                        title='Another brave soul?'
                        onClick={this.onAdd} />
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

module.exports = ScoreboardEditable;