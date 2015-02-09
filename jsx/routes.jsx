/** @jsx React.DOM */

var routes = (
    <ReactRouter.Route handler={App}>
        <ReactRouter.Route name='edit' path='/' handler={ScoreboardEditable} />
        <ReactRouter.Route name='scoreboard' path='/scoreboard/:id' handler={Scoreboard} />
        <ReactRouter.NotFoundRoute handler={NotFound} />
    </ReactRouter.Route>
);

ReactRouter.run(routes, function (Handler, state) {
    console.log(state.routes);
    state.routes.filter(function (route) {
        // gather up the handlers that have a static `fetchData` method
        return route.handler.fetchData;
    }).reduce(function (promise, route) {
        return promise.then(function (res) {
            return route.handler.fetchData(state.params).then(function (partial) {
                return _.extend(res, partial);
            });
        });
    }, Q.resolve({})).then(function (res) {
        console.log('res', res);
        // wait until we have data to render, the old screen stays up until we render
        React.render(<Handler {...res} />, document.getElementById('container'));
    });
});
