/** @jsx React.DOM */
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var ContentEditable = require('./ContentEditable.jsx');

var PlayerEditable = React.createClass({
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
                        onClick={this.props.onDecrement}/>
                    <span
                        title={'Just ' + this.props.initialState.count + '? Perhaps the poor deserve their fate.'}
                        style={{
                            color: this.props.initialState.color,
                            fontWeight: 'bold'
                        }}>{this.props.initialState.count}</span>
                    <ReactBootstrap.Glyphicon
                        glyph='chevron-right'
                        title='Valor must be rewarded...I suppose.'
                        onClick={this.props.onIncrement} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row style={{
                textAlign: 'center',
                verticalAlign: 'center',
                fontSize: '1em',
                fontWeight: 'bold'
            }}>
                <ContentEditable html={this.props.initialState.name} onChange={this.props.onChangeName} />
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
                        onClick={this.props.onRefresh} />
                    <ReactBootstrap.Glyphicon
                        glyph='remove'
                        title='Destroy them! They deserve it...'
                        onClick={this.props.onRemove} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </div>
    }
});

module.exports = PlayerEditable;