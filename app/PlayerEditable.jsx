/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var ContentEditable = require('./ContentEditable.jsx');

var PlayerEditable = React.createClass({
    propTypes: {
        initialState: React.PropTypes.shape({
            color: React.PropTypes.string,
            count: React.PropTypes.number,
            name: React.PropTypes.string
        }).isRequired,
        firebase: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return this.props.initialState;
    },
    onIncrement: function () {
        this.props.firebase.child('count').set(this.state.count + 1);
    },
    onDecrement: function () {
        this.props.firebase.child('count').set(this.state.count - 1);
    },
    onRefresh: function () {
        if (window.confirm('I shall strip ' + this.state.name + ' of everything for you. Points, honor, dignity...')) {
            this.props.firebase.child('count').set(0);
        }
    },
    onRemove: function () {
        if (window.confirm('I shall smote ' + this.state.name + ' on your command.')) {
            this.props.firebase.remove();
        }
    },
    onChangeName: function (e) {
        this.props.firebase.child('name').set(e.target.value);
    },
    componentDidMount: function () {
        this.props.firebase.on('value', function (snapshot) {
            this.setState(snapshot.val() || {});
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.props.firebase.off();
    },
    render: function () {
        return <div>
            <ReactBootstrap.Row style={{
                textAlign: 'center',
                verticalAlign: 'center',
                fontSize: '10em'
            }}>
                <ReactBootstrap.Col md={6} mdOffset={3}>
                    <ReactBootstrap.Glyphicon
                        glyph='chevron-left'
                        title='They must be punished for their misdeeds.'
                        onClick={this.onDecrement}/>
                    <span className='count'
                        title={'Just ' + this.state.count + '? Perhaps the poor deserve their fate.'}
                        style={{
                            color: this.state.color,
                            fontWeight: 'bold'
                        }}>{this.state.count}</span>
                    <ReactBootstrap.Glyphicon
                        glyph='chevron-right'
                        title='Valor must be rewarded...I suppose.'
                        onClick={this.onIncrement} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row style={{
                textAlign: 'center',
                verticalAlign: 'center',
                fontSize: '1em',
                fontWeight: 'bold'
            }}>
                <ContentEditable
                    className='name'
                    html={this.state.name}
                    onChange={this.onChangeName} />
            </ReactBootstrap.Row>
            <ReactBootstrap.Row style={{
                textAlign: 'center',
                verticalAlign: 'center',
                fontSize: '2em'
            }}>
                <ReactBootstrap.Col md={6} mdOffset={3}>
                    <ReactBootstrap.Glyphicon
                        glyph='refresh'
                        title='Take from them everything. It will feel amazing...'
                        onClick={this.onRefresh} />
                    <ReactBootstrap.Glyphicon
                        glyph='remove'
                        title='Destroy them! They deserve it...'
                        onClick={this.onRemove} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </div>
    }
});

module.exports = PlayerEditable;