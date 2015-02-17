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
    getFirebase: function () {
        return new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + this.getParams().id);
    },
    getInitialState: function () {
        return this.props.initialState;
    },
    componentDidMount: function () {
        this.props.firebase.on('value', function (snapshot) {
            this.setState(snapshot.val() || {});
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.props.firebase.off();
    },
    onAdd: function () {
        this.props.firebase.child('players').push({
            name: 'editable player name',
            color: _.sample(COLORS),
            count: 0
        });
    },
    onChangeName: function (e) {
        this.props.firebase.child('name').set(e.target.value);
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
                    <ContentEditable html={this.state.name} onChange={this.onChangeName} />
                </ReactBootstrap.Row>
                {Object.keys(this.state.players).map(function (key) {
                    return <PlayerEditable
                        key={key}
                        firebase={this.props.firebase.child('players').child(key)}
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