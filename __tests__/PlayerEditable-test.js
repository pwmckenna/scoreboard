/** @jsx React.DOM */

jest.dontMock('../app/PlayerEditable.jsx');
jest.dontMock('../app/ContentEditable.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Player = require('../app/PlayerEditable.jsx');
var Firebase = require('mockfirebase').MockFirebase;

describe('PlayerEditable', function() {
    it('renders the initial state correctly', function() {

        var NAME = 'Jester McTesterson';
        var COUNT = 123456;
        var COLOR = '#123456';

        // Render a player in the document
        var initialState = {
            color: COLOR,
            count: COUNT,
            name: NAME
        };
        var firebase = new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/test/players/test');
        var player = TestUtils.renderIntoDocument(
            <Player initialState={initialState} firebase={firebase} />
        );
        var nameNode = TestUtils.findRenderedDOMComponentWithClass(player, 'name').getDOMNode();
        var countNode = TestUtils.findRenderedDOMComponentWithClass(player, 'count').getDOMNode();
        var decrementNode = TestUtils.findRenderedDOMComponentWithClass(player, 'decrement').getDOMNode();
        var incrementNode = TestUtils.findRenderedDOMComponentWithClass(player, 'increment').getDOMNode();

        expect(nameNode.textContent).toEqual(NAME);
        expect(countNode.textContent).toEqual(COUNT + '');

        React.addons.TestUtils.Simulate.click(decrementNode);
        firebase.flush();
        expect(countNode.textContent).toEqual(COUNT - 1 + '');

        React.addons.TestUtils.Simulate.click(incrementNode);
        firebase.flush();
        expect(countNode.textContent).toEqual(COUNT + '');

        React.addons.TestUtils.Simulate.click(incrementNode);
        firebase.flush();
        expect(countNode.textContent).toEqual(COUNT + 1 + '');
    });
});