window.App = React.createClass({
    render: function () {
        return (
            <ReactRouter.RouteHandler {...this.props} />
        )
    }
});