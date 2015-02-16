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
    mixins: [ReactRouter.Navigation],
    statics: {
        fetchData: function (params) {
            var scoreboardsFirebaseRef = new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards');
            var authData = scoreboardsFirebaseRef.getAuth();
            if (authData) {
                return q.resolve({
                    uid: authData.uid
                });
            } else {
                var defer = q.defer();
                scoreboardsFirebaseRef.authAnonymously(defer.makeNodeResolver());
                return defer.promise.then(function (authData) {
                    var firebaseRef = scoreboardsFirebaseRef.child(authData.uid);
                    firebaseRef.child('players').push({
                        name: 'editable player name',
                        color: _.sample(COLORS),
                        score: 0
                    });
                    firebaseRef.child('players').push({
                        name: 'editable player name',
                        color: _.sample(COLORS),
                        score: 0
                    });
                    firebaseRef.child('name').set('editable game name');

                    return q.resolve({
                        uid: authData.uid
                    });
                });
            }
        }
    },
    render: function () {
        this.transitionTo(this.makeHref('edit', {
            id: this.props.uid
        }));
    }
});

module.exports = ScoreboardEditable;