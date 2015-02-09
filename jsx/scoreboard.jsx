/** @jsx React.DOM */

window.Scoreboard = React.createClass({
    mixins: [ReactRouter.Navigation, ReactRouter.State],
    statics: {
        fetchData: function (params) {
            return new Promise(function (resolve, reject) {
                resolve({
                    firebaseRef: new Firebase('https://shareable-scoreboard.firebaseio.com/scoreboards/' + params.id)
                });
            });
        }
    },
    getInitialState: function () {
        return {
            players: {},
            name: ''
        };
    },
    componentWillMount: function () {
        this.props.firebaseRef.child('name').on('value', function (snapshot) {
            this.setState({
                name: snapshot.val()
            });
        }.bind(this));
        this.props.firebaseRef.child('players').on('child_added', function (snapshot) {
            var playerState = this.state.players;
            playerState[snapshot.key()] = snapshot.ref();
            this.setState({
                players: playerState
            });
        }.bind(this));
        this.props.firebaseRef.child('players').on('child_removed', function (snapshot) {
            var playerState = this.state.players;
            delete playerState[snapshot.key()];
            this.setState({
                players: playerState
            });
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.props.firebaseRef.off();
    },
    onShare: function () {
        FB.ui({
            method: 'share',
            href: window.location.origin + this.makeHref('scoreboard', {
                id: this.props.firebaseRef.key()
            })
        }, function (response) {
            console.log(response);
        });
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
                    var firebaseRef = this.state.players[key];
                    return <Player key={key} firebaseRef={firebaseRef} />
                }.bind(this))}
                <ReactBootstrap.Row style={{
                    textAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: '10em'
                }}>
                    <ReactBootstrap.Glyphicon
                        glyph='share'
                        title='Spread word of your impending victory throughout the land!'
                        onClick={this.onShare} />
                </ReactBootstrap.Row>
            </div>
        );
    }
});