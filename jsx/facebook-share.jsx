window.FacebookShare = React.createClass({
    onShare: function () {
        FB.ui({
            method: 'share',
            href: this.props.href
        });
    },

    render: function () {
        return (
            <ReactBootstrap.Glyphicon
                glyph='share'
                title={this.props.title}
                onClick={this.onShare} />
        )
    }
});