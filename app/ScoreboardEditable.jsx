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
    getInitialState: function () {
        this.props.firebaseRef = new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + this.getParams().id);
        return {
            players: {},
            name: ''
        };
    },
    componentDidMount: function () {
        this.props.firebaseRef.child('name').on('value', function (snapshot) {
            try {
                this.setState({
                    name: snapshot.val()
                });
            } catch (err) {
                console.warn('name .on(\'value\')', err);
            }
        }.bind(this));
        this.props.firebaseRef.child('players').on('child_added', function (snapshot) {
            try {
                var playerState = this.state.players;
                playerState[snapshot.key()] = snapshot.ref();
                this.setState({
                    players: playerState
                });
            } catch (err) {
                console.warn('players .on(\'child_added\')', err);
            }
        }.bind(this));
        this.props.firebaseRef.child('players').on('child_removed', function (snapshot) {
            try {
                var playerState = this.state.players;
                delete playerState[snapshot.key()];
                this.setState({
                    players: playerState
                });
            } catch (err) {
                console.warn('players .on(\'child_removed\')', err);
            }
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.props.firebaseRef.off();
    },
    onAdd: function () {
        this.props.firebaseRef.child('players').push({
            name: 'editable player name',
            color: _.sample(COLORS),
            score: 0
        });
    },
    onChangeName: function (e) {
        this.props.firebaseRef.child('name').set(e.target.value);
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
                    var firebaseRef = this.state.players[key];
                    return <PlayerEditable key={key} firebaseRef={firebaseRef} />
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
                            id: this.props.firebaseRef.key()
                        })}
                        title='Spread word of your impending victory throughout the land!' />
                </ReactBootstrap.Row>
            </div>
        );
    }
});

module.exports = ScoreboardEditable;