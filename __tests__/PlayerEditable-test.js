/** @jsx React.DOM */

jest.dontMock('../app/PlayerEditable.jsx');

describe('PlayerEditable', function() {
    it('renders the initial state correctly', function() {
        var React = require('react/addons');
        var Player = require('../app/PlayerEditable.jsx');
        var Firebase = require('firebase');
        var TestUtils = React.addons.TestUtils;

        var NAME = 'Jester McTesterson';
        var COUNT = 123456;
        var COLOR = '#123456';

        // Render a player in the document
        var initialState = {
            color: COLOR,
            count: COUNT,
            name: NAME
        };
        var firebase = new Firebase('scoreboards/test/players/test');
        var player = TestUtils.renderIntoDocument(
            <Player initialState={initialState} firebase={firebase} />
        );
        expect(TestUtils.findRenderedDOMComponentWithClass(player, 'name').getDOMNode().textContent).toEqual(NAME);
        expect(TestUtils.findRenderedDOMComponentWithClass(player, 'count').getDOMNode().textContent).toEqual('' + COUNT);
    });
});