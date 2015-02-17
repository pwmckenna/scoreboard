(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./specs/App-spec.js":[function(require,module,exports){
var App = require('./../app/App.jsx');
var TestUtils = require('react-addons').TestUtils;

describe("App", function() {

  it("should render text: Hello world!", function() {
    var app = TestUtils.renderIntoDocument(App());
    expect(app.getDOMNode().textContent).toEqual('Hello world!');
  });

});
},{"./../app/App.jsx":"/Users/pwmckenna/git/tally-master/app/App.jsx","react-addons":"react-addons"}],"/Users/pwmckenna/git/tally-master/app/App.jsx":[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');

var App = React.createClass({displayName: "App",
    render: function () {
        return (
            React.createElement(ReactRouter.RouteHandler, React.__spread({},  this.props))
        )
    }
});
	
module.exports = App;

},{"react":"react","react-router":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/index.js"}],"/Users/pwmckenna/git/tally-master/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Cancellation.js":[function(require,module,exports){
/**
 * Represents a cancellation caused by navigating away
 * before the previous transition has fully resolved.
 */
function Cancellation() {}

module.exports = Cancellation;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Configuration.js":[function(require,module,exports){
var warning = require('react/lib/warning');
var invariant = require('react/lib/invariant');

function checkPropTypes(componentName, propTypes, props) {
  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error = propTypes[propName](props, propName, componentName);

      if (error instanceof Error)
        warning(false, error.message);
    }
  }
}

var Configuration = {

  statics: {

    validateProps: function (props) {
      checkPropTypes(this.displayName, this.propTypes, props);
    }

  },

  render: function () {
    invariant(
      false,
      '%s elements are for router configuration only and should not be rendered',
      this.constructor.displayName
    );
  }

};

module.exports = Configuration;

},{"react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js","react/lib/warning":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/warning.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/History.js":[function(require,module,exports){
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

var History = {

  /**
   * The current number of entries in the history.
   *
   * Note: This property is read-only.
   */
  length: 1,

  /**
   * Sends the browser back one entry in the history.
   */
  back: function () {
    invariant(
      canUseDOM,
      'Cannot use History.back without a DOM'
    );

    // Do this first so that History.length will
    // be accurate in location change listeners.
    History.length -= 1;

    window.history.back();
  }

};

module.exports = History;

},{"react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Navigation.js":[function(require,module,exports){
var PropTypes = require('./PropTypes');

/**
 * A mixin for components that modify the URL.
 *
 * Example:
 *
 *   var MyLink = React.createClass({
 *     mixins: [ Router.Navigation ],
 *     handleClick: function (event) {
 *       event.preventDefault();
 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
 *     },
 *     render: function () {
 *       return (
 *         <a onClick={this.handleClick}>Click me!</a>
 *       );
 *     }
 *   });
 */
var Navigation = {

  contextTypes: {
    makePath: PropTypes.func.isRequired,
    makeHref: PropTypes.func.isRequired,
    transitionTo: PropTypes.func.isRequired,
    replaceWith: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  },

  /**
   * Returns an absolute URL path created from the given route
   * name, URL parameters, and query values.
   */
  makePath: function (to, params, query) {
    return this.context.makePath(to, params, query);
  },

  /**
   * Returns a string that may safely be used as the href of a
   * link to the route with the given name.
   */
  makeHref: function (to, params, query) {
    return this.context.makeHref(to, params, query);
  },

  /**
   * Transitions to the URL specified in the arguments by pushing
   * a new URL onto the history stack.
   */
  transitionTo: function (to, params, query) {
    this.context.transitionTo(to, params, query);
  },

  /**
   * Transitions to the URL specified in the arguments by replacing
   * the current URL in the history stack.
   */
  replaceWith: function (to, params, query) {
    this.context.replaceWith(to, params, query);
  },

  /**
   * Transitions to the previous URL.
   */
  goBack: function () {
    this.context.goBack();
  }

};

module.exports = Navigation;

},{"./PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/NavigationContext.js":[function(require,module,exports){
var PropTypes = require('./PropTypes');

/**
 * Provides the router with context for Router.Navigation.
 */
var NavigationContext = {

  childContextTypes: {
    makePath: PropTypes.func.isRequired,
    makeHref: PropTypes.func.isRequired,
    transitionTo: PropTypes.func.isRequired,
    replaceWith: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  },

  getChildContext: function () {
    return {
      makePath: this.constructor.makePath.bind(this.constructor),
      makeHref: this.constructor.makeHref.bind(this.constructor),
      transitionTo: this.constructor.transitionTo.bind(this.constructor),
      replaceWith: this.constructor.replaceWith.bind(this.constructor),
      goBack: this.constructor.goBack.bind(this.constructor)
    };
  }

};

module.exports = NavigationContext;

},{"./PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js":[function(require,module,exports){
var assign = require('react/lib/Object.assign');
var ReactPropTypes = require('react').PropTypes;

var PropTypes = assign({

  /**
   * Requires that the value of a prop be falsy.
   */
  falsy: function (props, propName, componentName) {
    if (props[propName])
      return new Error('<' + componentName + '> may not have a "' + propName + '" prop');
  }

}, ReactPropTypes);

module.exports = PropTypes;

},{"react":"react","react/lib/Object.assign":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Redirect.js":[function(require,module,exports){
/**
 * Encapsulates a redirect to the given route.
 */
function Redirect(to, params, query) {
  this.to = to;
  this.params = params;
  this.query = query;
}

module.exports = Redirect;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/RouteHandlerMixin.js":[function(require,module,exports){
var React = require('react');
var assign = require('react/lib/Object.assign');
var PropTypes = require('./PropTypes');

var REF_NAME = '__routeHandler__';

var RouteHandlerMixin = {

  contextTypes: {
    getRouteAtDepth: PropTypes.func.isRequired,
    setRouteComponentAtDepth: PropTypes.func.isRequired,
    routeHandlers: PropTypes.array.isRequired
  },

  childContextTypes: {
    routeHandlers: PropTypes.array.isRequired
  },

  getChildContext: function () {
    return {
      routeHandlers: this.context.routeHandlers.concat([ this ])
    };
  },

  componentDidMount: function () {
    this._updateRouteComponent();
  },

  componentDidUpdate: function () {
    this._updateRouteComponent();
  },

  componentWillUnmount: function () {
    this.context.setRouteComponentAtDepth(this.getRouteDepth(), null);
  },

  _updateRouteComponent: function () {
    this.context.setRouteComponentAtDepth(this.getRouteDepth(), this.refs[REF_NAME]);
  },

  getRouteDepth: function () {
    return this.context.routeHandlers.length;
  },

  createChildRouteHandler: function (props) {
    var route = this.context.getRouteAtDepth(this.getRouteDepth());
    return route ? React.createElement(route.handler, assign({}, props || this.props, { ref: REF_NAME })) : null;
  }

};

module.exports = RouteHandlerMixin;

},{"./PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","react":"react","react/lib/Object.assign":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Routing.js":[function(require,module,exports){
/* jshint -W084 */
var React = require('react');
var invariant = require('react/lib/invariant');
var DefaultRoute = require('./components/DefaultRoute');
var NotFoundRoute = require('./components/NotFoundRoute');
var Redirect = require('./components/Redirect');
var Path = require('./utils/Path');

function createTransitionToHook(to, _params, _query) {
  return function (transition, params, query) {
    transition.redirect(to, _params || params, _query || query);
  };
}

function createRoute(element, parentRoute, namedRoutes) {
  var type = element.type;
  var props = element.props;

  if (type.validateProps)
    type.validateProps(props);

  var options = {
    name: props.name,
    ignoreScrollBehavior: !!props.ignoreScrollBehavior
  };

  if (type === Redirect.type) {
    options.willTransitionTo = createTransitionToHook(props.to, props.params, props.query);
    props.path = props.path || props.from || '*';
  } else {
    options.handler = props.handler;
    options.willTransitionTo = props.handler && props.handler.willTransitionTo;
    options.willTransitionFrom = props.handler && props.handler.willTransitionFrom;
  }

  var parentPath = (parentRoute && parentRoute.path) || '/';

  if ((props.path || props.name) && type !== DefaultRoute.type && type !== NotFoundRoute.type) {
    var path = props.path || props.name;

    // Relative paths extend their parent.
    if (!Path.isAbsolute(path))
      path = Path.join(parentPath, path);

    options.path = Path.normalize(path);
  } else {
    options.path = parentPath;

    if (type === NotFoundRoute.type)
      options.path += '*';
  }

  options.paramNames = Path.extractParamNames(options.path);

  // Make sure the route's path has all params its parent needs.
  if (parentRoute && Array.isArray(parentRoute.paramNames)) {
    parentRoute.paramNames.forEach(function (paramName) {
      invariant(
        options.paramNames.indexOf(paramName) !== -1,
        'The nested route path "%s" is missing the "%s" parameter of its parent path "%s"',
        options.path, paramName, parentRoute.path
      );
    });
  }

  var route = new Route(options);

  // Make sure the route can be looked up by <Link>s.
  if (props.name) {
    invariant(
      namedRoutes[props.name] == null,
      'You cannot use the name "%s" for more than one route',
      props.name
    );

    namedRoutes[props.name] = route;
  }

  // Handle <NotFoundRoute>.
  if (type === NotFoundRoute.type) {
    invariant(
      parentRoute,
      '<NotFoundRoute> must have a parent <Route>'
    );

    invariant(
      parentRoute.notFoundRoute == null,
      'You may not have more than one <NotFoundRoute> per <Route>'
    );

    invariant(
      props.children == null,
      '<NotFoundRoute> must not have children'
    );

    parentRoute.notFoundRoute = route;

    return null;
  }

  // Handle <DefaultRoute>.
  if (type === DefaultRoute.type) {
    invariant(
      parentRoute,
      '<DefaultRoute> must have a parent <Route>'
    );

    invariant(
      parentRoute.defaultRoute == null,
      'You may not have more than one <DefaultRoute> per <Route>'
    );

    invariant(
      props.children == null,
      '<DefaultRoute> must not have children'
    );

    parentRoute.defaultRoute = route;

    return null;
  }

  route.routes = createRoutesFromReactChildren(props.children, route, namedRoutes);

  return route;
}

/**
 * Creates and returns an array of route objects from the given ReactChildren.
 */
function createRoutesFromReactChildren(children, parentRoute, namedRoutes) {
  var routes = [];

  React.Children.forEach(children, function (child) {
    // Exclude null values, <DefaultRoute>s and <NotFoundRoute>s.
    if (React.isValidElement(child) && (child = createRoute(child, parentRoute, namedRoutes)))
      routes.push(child);
  });

  return routes;
}

function Route(options) {
  options = options || {};

  this.name = options.name;
  this.path = options.path || '/';
  this.paramNames = options.paramNames || Path.extractParamNames(this.path);
  this.ignoreScrollBehavior = !!options.ignoreScrollBehavior;
  this.willTransitionTo = options.willTransitionTo;
  this.willTransitionFrom = options.willTransitionFrom;
  this.handler = options.handler;
}

module.exports = {
  createRoutesFromReactChildren: createRoutesFromReactChildren,
  Route: Route
};

},{"./components/DefaultRoute":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/DefaultRoute.js","./components/NotFoundRoute":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/NotFoundRoute.js","./components/Redirect":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Redirect.js","./utils/Path":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/Path.js","react":"react","react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Scrolling.js":[function(require,module,exports){
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var getWindowScrollPosition = require('./utils/getWindowScrollPosition');

function shouldUpdateScroll(state, prevState) {
  if (!prevState)
    return true;

  // Don't update scroll position when only the query has changed.
  if (state.pathname === prevState.pathname)
    return false;

  var routes = state.routes;
  var prevRoutes = prevState.routes;

  var sharedAncestorRoutes = routes.filter(function (route) {
    return prevRoutes.indexOf(route) !== -1;
  });

  return !sharedAncestorRoutes.some(function (route) {
    return route.ignoreScrollBehavior;
  });
}

/**
 * Provides the router with the ability to manage window scroll position
 * according to its scroll behavior.
 */
var Scrolling = {

  statics: {
    /**
     * Records curent scroll position as the last known position for the given URL path.
     */
    recordScrollPosition: function (path) {
      if (!this.scrollHistory)
        this.scrollHistory = {};

      this.scrollHistory[path] = getWindowScrollPosition();
    },

    /**
     * Returns the last known scroll position for the given URL path.
     */
    getScrollPosition: function (path) {
      if (!this.scrollHistory)
        this.scrollHistory = {};

      return this.scrollHistory[path] || null;
    }
  },

  componentWillMount: function () {
    invariant(
      this.getScrollBehavior() == null || canUseDOM,
      'Cannot use scroll behavior without a DOM'
    );
  },

  componentDidMount: function () {
    this._updateScroll();
  },

  componentDidUpdate: function (prevProps, prevState) {
    this._updateScroll(prevState);
  },

  _updateScroll: function (prevState) {
    if (!shouldUpdateScroll(this.state, prevState))
      return;

    var scrollBehavior = this.getScrollBehavior();

    if (scrollBehavior)
      scrollBehavior.updateScrollPosition(
        this.constructor.getScrollPosition(this.state.path),
        this.state.action
      );
  }

};

module.exports = Scrolling;

},{"./utils/getWindowScrollPosition":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/getWindowScrollPosition.js","react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/State.js":[function(require,module,exports){
var PropTypes = require('./PropTypes');

/**
 * A mixin for components that need to know the path, routes, URL
 * params and query that are currently active.
 *
 * Example:
 *
 *   var AboutLink = React.createClass({
 *     mixins: [ Router.State ],
 *     render: function () {
 *       var className = this.props.className;
 *   
 *       if (this.isActive('about'))
 *         className += ' is-active';
 *   
 *       return React.DOM.a({ className: className }, this.props.children);
 *     }
 *   });
 */
var State = {

  contextTypes: {
    getCurrentPath: PropTypes.func.isRequired,
    getCurrentRoutes: PropTypes.func.isRequired,
    getCurrentPathname: PropTypes.func.isRequired,
    getCurrentParams: PropTypes.func.isRequired,
    getCurrentQuery: PropTypes.func.isRequired,
    isActive: PropTypes.func.isRequired
  },

  /**
   * Returns the current URL path.
   */
  getPath: function () {
    return this.context.getCurrentPath();
  },

  /**
   * Returns an array of the routes that are currently active.
   */
  getRoutes: function () {
    return this.context.getCurrentRoutes();
  },

  /**
   * Returns the current URL path without the query string.
   */
  getPathname: function () {
    return this.context.getCurrentPathname();
  },

  /**
   * Returns an object of the URL params that are currently active.
   */
  getParams: function () {
    return this.context.getCurrentParams();
  },

  /**
   * Returns an object of the query params that are currently active.
   */
  getQuery: function () {
    return this.context.getCurrentQuery();
  },

  /**
   * A helper method to determine if a given route, params, and query
   * are active.
   */
  isActive: function (to, params, query) {
    return this.context.isActive(to, params, query);
  }

};

module.exports = State;

},{"./PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/StateContext.js":[function(require,module,exports){
var assign = require('react/lib/Object.assign');
var PropTypes = require('./PropTypes');
var Path = require('./utils/Path');

function routeIsActive(activeRoutes, routeName) {
  return activeRoutes.some(function (route) {
    return route.name === routeName;
  });
}

function paramsAreActive(activeParams, params) {
  for (var property in params)
    if (String(activeParams[property]) !== String(params[property]))
      return false;

  return true;
}

function queryIsActive(activeQuery, query) {
  for (var property in query)
    if (String(activeQuery[property]) !== String(query[property]))
      return false;

  return true;
}

/**
 * Provides the router with context for Router.State.
 */
var StateContext = {

  /**
   * Returns the current URL path + query string.
   */
  getCurrentPath: function () {
    return this.state.path;
  },

  /**
   * Returns a read-only array of the currently active routes.
   */
  getCurrentRoutes: function () {
    return this.state.routes.slice(0);
  },

  /**
   * Returns the current URL path without the query string.
   */
  getCurrentPathname: function () {
    return this.state.pathname;
  },

  /**
   * Returns a read-only object of the currently active URL parameters.
   */
  getCurrentParams: function () {
    return assign({}, this.state.params);
  },

  /**
   * Returns a read-only object of the currently active query parameters.
   */
  getCurrentQuery: function () {
    return assign({}, this.state.query);
  },

  /**
   * Returns true if the given route, params, and query are active.
   */
  isActive: function (to, params, query) {
    if (Path.isAbsolute(to))
      return to === this.state.path;

    return routeIsActive(this.state.routes, to) &&
      paramsAreActive(this.state.params, params) &&
      (query == null || queryIsActive(this.state.query, query));
  },

  childContextTypes: {
    getCurrentPath: PropTypes.func.isRequired,
    getCurrentRoutes: PropTypes.func.isRequired,
    getCurrentPathname: PropTypes.func.isRequired,
    getCurrentParams: PropTypes.func.isRequired,
    getCurrentQuery: PropTypes.func.isRequired,
    isActive: PropTypes.func.isRequired
  },

  getChildContext: function () {
    return {
      getCurrentPath: this.getCurrentPath,
      getCurrentRoutes: this.getCurrentRoutes,
      getCurrentPathname: this.getCurrentPathname,
      getCurrentParams: this.getCurrentParams,
      getCurrentQuery: this.getCurrentQuery,
      isActive: this.isActive
    };
  }

};

module.exports = StateContext;

},{"./PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","./utils/Path":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/Path.js","react/lib/Object.assign":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Transition.js":[function(require,module,exports){
/* jshint -W058 */
var assign = require('react/lib/Object.assign');
var Redirect = require('./Redirect');

/**
 * Encapsulates a transition to a given path.
 *
 * The willTransitionTo and willTransitionFrom handlers receive
 * an instance of this class as their first argument.
 */
function Transition(path, retry) {
  this.path = path;
  this.abortReason = null;
  this.retry = retry.bind(this);
}

assign(Transition.prototype, {

  abort: function (reason) {
    if (this.abortReason == null)
      this.abortReason = reason || 'ABORT';
  },

  redirect: function (to, params, query) {
    this.abort(new Redirect(to, params, query));
  },

  from: function (routes, components, callback) {
    var self = this;

    var runHooks = routes.reduce(function (callback, route, index) {
      return function (error) {
        if (error || self.abortReason) {
          callback(error);
        } else if (route.willTransitionFrom) {
          try {
            route.willTransitionFrom(self, components[index], callback);

            // If there is no callback in the argument list, call it automatically.
            if (route.willTransitionFrom.length < 3)
              callback();
          } catch (e) {
            callback(e);
          }
        } else {
          callback();
        }
      };
    }, callback);

    runHooks();
  },

  to: function (routes, params, query, callback) {
    var self = this;

    var runHooks = routes.reduceRight(function (callback, route) {
      return function (error) {
        if (error || self.abortReason) {
          callback(error);
        } else if (route.willTransitionTo) {
          try {
            route.willTransitionTo(self, params, query, callback);

            // If there is no callback in the argument list, call it automatically.
            if (route.willTransitionTo.length < 4)
              callback();
          } catch (e) {
            callback(e);
          }
        } else {
          callback();
        }
      };
    }, callback);

    runHooks();
  }

});

module.exports = Transition;

},{"./Redirect":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Redirect.js","react/lib/Object.assign":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/actions/LocationActions.js":[function(require,module,exports){
/**
 * Actions that modify the URL.
 */
var LocationActions = {

  /**
   * Indicates a new location is being pushed to the history stack.
   */
  PUSH: 'push',

  /**
   * Indicates the current location should be replaced.
   */
  REPLACE: 'replace',

  /**
   * Indicates the most recent entry should be removed from the history stack.
   */
  POP: 'pop'

};

module.exports = LocationActions;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/behaviors/ImitateBrowserBehavior.js":[function(require,module,exports){
var LocationActions = require('../actions/LocationActions');

/**
 * A scroll behavior that attempts to imitate the default behavior
 * of modern browsers.
 */
var ImitateBrowserBehavior = {

  updateScrollPosition: function (position, actionType) {
    switch (actionType) {
      case LocationActions.PUSH:
      case LocationActions.REPLACE:
        window.scrollTo(0, 0);
        break;
      case LocationActions.POP:
        if (position) {
          window.scrollTo(position.x, position.y);
        } else {
          window.scrollTo(0, 0);
        }
        break;
    }
  }

};

module.exports = ImitateBrowserBehavior;

},{"../actions/LocationActions":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/actions/LocationActions.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/behaviors/ScrollToTopBehavior.js":[function(require,module,exports){
/**
 * A scroll behavior that always scrolls to the top of the page
 * after a transition.
 */
var ScrollToTopBehavior = {

  updateScrollPosition: function () {
    window.scrollTo(0, 0);
  }

};

module.exports = ScrollToTopBehavior;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/DefaultRoute.js":[function(require,module,exports){
var React = require('react');
var Configuration = require('../Configuration');
var PropTypes = require('../PropTypes');

/**
 * A <DefaultRoute> component is a special kind of <Route> that
 * renders when its parent matches but none of its siblings do.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */
var DefaultRoute = React.createClass({

  displayName: 'DefaultRoute',

  mixins: [ Configuration ],

  propTypes: {
    name: PropTypes.string,
    path: PropTypes.falsy,
    children: PropTypes.falsy,
    handler: PropTypes.func.isRequired
  }

});

module.exports = DefaultRoute;

},{"../Configuration":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","react":"react"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Link.js":[function(require,module,exports){
var React = require('react');
var classSet = require('react/lib/cx');
var assign = require('react/lib/Object.assign');
var Navigation = require('../Navigation');
var State = require('../State');
var PropTypes = require('../PropTypes');

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <Link> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <Link to="showPost" params={{ postID: "123" }} />
 *
 * In addition to params, links may pass along query string parameters
 * using the `query` prop.
 *
 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
 */
var Link = React.createClass({

  displayName: 'Link',

  mixins: [ Navigation, State ],

  propTypes: {
    activeClassName: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    params: PropTypes.object,
    query: PropTypes.object,
    onClick: PropTypes.func
  },

  getDefaultProps: function () {
    return {
      activeClassName: 'active'
    };
  },

  handleClick: function (event) {
    var allowTransition = true;
    var clickResult;

    if (this.props.onClick)
      clickResult = this.props.onClick(event);

    if (isModifiedEvent(event) || !isLeftClickEvent(event))
      return;

    if (clickResult === false || event.defaultPrevented === true)
      allowTransition = false;

    event.preventDefault();

    if (allowTransition)
      this.transitionTo(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "href" attribute to use on the DOM element.
   */
  getHref: function () {
    return this.makeHref(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "class" attribute to use on the DOM element, which contains
   * the value of the activeClassName property when this <Link> is active.
   */
  getClassName: function () {
    var classNames = {};

    if (this.props.className)
      classNames[this.props.className] = true;

    if (this.isActive(this.props.to, this.props.params, this.props.query))
      classNames[this.props.activeClassName] = true;

    return classSet(classNames);
  },

  render: function () {
    var props = assign({}, this.props, {
      href: this.getHref(),
      className: this.getClassName(),
      onClick: this.handleClick
    });

    return React.DOM.a(props, this.props.children);
  }

});

module.exports = Link;

},{"../Navigation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Navigation.js","../PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","../State":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/State.js","react":"react","react/lib/Object.assign":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/Object.assign.js","react/lib/cx":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/cx.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/NotFoundRoute.js":[function(require,module,exports){
var React = require('react');
var Configuration = require('../Configuration');
var PropTypes = require('../PropTypes');

/**
 * A <NotFoundRoute> is a special kind of <Route> that
 * renders when the beginning of its parent's path matches
 * but none of its siblings do, including any <DefaultRoute>.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */
var NotFoundRoute = React.createClass({

  displayName: 'NotFoundRoute',

  mixins: [ Configuration ],

  propTypes: {
    name: PropTypes.string,
    path: PropTypes.falsy,
    children: PropTypes.falsy,
    handler: PropTypes.func.isRequired
  }

});

module.exports = NotFoundRoute;

},{"../Configuration":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","react":"react"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Redirect.js":[function(require,module,exports){
var React = require('react');
var Configuration = require('../Configuration');
var PropTypes = require('../PropTypes');

/**
 * A <Redirect> component is a special kind of <Route> that always
 * redirects to another route when it matches.
 */
var Redirect = React.createClass({

  displayName: 'Redirect',

  mixins: [ Configuration ],

  propTypes: {
    path: PropTypes.string,
    from: PropTypes.string, // Alias for path.
    to: PropTypes.string,
    handler: PropTypes.falsy
  }

});

module.exports = Redirect;

},{"../Configuration":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","react":"react"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Route.js":[function(require,module,exports){
var React = require('react');
var Configuration = require('../Configuration');
var PropTypes = require('../PropTypes');
var RouteHandler = require('./RouteHandler');
/**
 * <Route> components specify components that are rendered to the page when the
 * URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is requested,
 * the tree is searched depth-first to find a route whose path matches the URL.
 * When one is found, all routes in the tree that lead to it are considered
 * "active" and their components are rendered into the DOM, nested in the same
 * order as they are in the tree.
 *
 * The preferred way to configure a router is using JSX. The XML-like syntax is
 * a great way to visualize how routes are laid out in an application.
 *
 *   var routes = [
 *     <Route handler={App}>
 *       <Route name="login" handler={Login}/>
 *       <Route name="logout" handler={Logout}/>
 *       <Route name="about" handler={About}/>
 *     </Route>
 *   ];
 *   
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 *
 * Handlers for Route components that contain children can render their active
 * child route using a <RouteHandler> element.
 *
 *   var App = React.createClass({
 *     render: function () {
 *       return (
 *         <div class="application">
 *           <RouteHandler/>
 *         </div>
 *       );
 *     }
 *   });
 *
 * If no handler is provided for the route, it will render a matched child route.
 */
var Route = React.createClass({

  displayName: 'Route',

  mixins: [ Configuration ],

  propTypes: {
    name: PropTypes.string,
    path: PropTypes.string,
    handler: PropTypes.func,
    ignoreScrollBehavior: PropTypes.bool
  },

  getDefaultProps: function(){
    return {
      handler: RouteHandler
    };
  }

});

module.exports = Route;

},{"../Configuration":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","./RouteHandler":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/RouteHandler.js","react":"react"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/RouteHandler.js":[function(require,module,exports){
var React = require('react');
var RouteHandlerMixin = require('../RouteHandlerMixin');

/**
 * A <RouteHandler> component renders the active child route handler
 * when routes are nested.
 */
var RouteHandler = React.createClass({

  displayName: 'RouteHandler',

  mixins: [ RouteHandlerMixin ],

  render: function () {
    return this.createChildRouteHandler();
  }

});

module.exports = RouteHandler;

},{"../RouteHandlerMixin":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/RouteHandlerMixin.js","react":"react"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/createRouter.js":[function(require,module,exports){
(function (process){
/* jshint -W058 */
var React = require('react');
var warning = require('react/lib/warning');
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var LocationActions = require('./actions/LocationActions');
var ImitateBrowserBehavior = require('./behaviors/ImitateBrowserBehavior');
var HashLocation = require('./locations/HashLocation');
var HistoryLocation = require('./locations/HistoryLocation');
var RefreshLocation = require('./locations/RefreshLocation');
var NavigationContext = require('./NavigationContext');
var StateContext = require('./StateContext');
var Scrolling = require('./Scrolling');
var createRoutesFromReactChildren = require('./Routing').createRoutesFromReactChildren;
var isReactChildren = require('./isReactChildren');
var Transition = require('./Transition');
var PropTypes = require('./PropTypes');
var Redirect = require('./Redirect');
var History = require('./History');
var Cancellation = require('./Cancellation');
var supportsHistory = require('./utils/supportsHistory');
var Path = require('./utils/Path');

/**
 * The default location for new routers.
 */
var DEFAULT_LOCATION = canUseDOM ? HashLocation : '/';

/**
 * The default scroll behavior for new routers.
 */
var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;

function createMatch(route, params, pathname, query) {
  return {
    routes: [ route ],
    params: params,
    pathname: pathname,
    query: query
  };
}

function findMatch(routes, defaultRoute, notFoundRoute, pathname, query) {
  var route, match, params;

  for (var i = 0, len = routes.length; i < len; ++i) {
    route = routes[i];

    // Check the subtree first to find the most deeply-nested match.
    match = findMatch(route.routes, route.defaultRoute, route.notFoundRoute, pathname, query);

    if (match != null) {
      match.routes.unshift(route);
      return match;
    }

    // No routes in the subtree matched, so check this route.
    params = Path.extractParams(route.path, pathname);

    if (params)
      return createMatch(route, params, pathname, query);
  }

  // No routes matched, so try the default route if there is one.
  if (defaultRoute && (params = Path.extractParams(defaultRoute.path, pathname)))
    return createMatch(defaultRoute, params, pathname, query);

  // Last attempt: does the "not found" route match?
  if (notFoundRoute && (params = Path.extractParams(notFoundRoute.path, pathname)))
    return createMatch(notFoundRoute, params, pathname, query);

  return null;
}

function hasProperties(object, properties) {
  for (var propertyName in properties)
    if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName])
      return false;

  return true;
}

function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
  return routes.some(function (r) {
    if (r !== route)
      return false;

    var paramNames = route.paramNames;
    var paramName;

    // Ensure that all params the route cares about did not change.
    for (var i = 0, len = paramNames.length; i < len; ++i) {
      paramName = paramNames[i];

      if (nextParams[paramName] !== prevParams[paramName])
        return false;
    }

    // Ensure the query hasn't changed.
    return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
  });
}

/**
 * Creates and returns a new router using the given options. A router
 * is a ReactComponent class that knows how to react to changes in the
 * URL and keep the contents of the page in sync.
 *
 * Options may be any of the following:
 *
 * - routes           (required) The route config
 * - location         The location to use. Defaults to HashLocation when
 *                    the DOM is available, "/" otherwise
 * - scrollBehavior   The scroll behavior to use. Defaults to ImitateBrowserBehavior
 *                    when the DOM is available, null otherwise
 * - onError          A function that is used to handle errors
 * - onAbort          A function that is used to handle aborted transitions
 *
 * When rendering in a server-side environment, the location should simply
 * be the URL path that was used in the request, including the query string.
 */
function createRouter(options) {
  options = options || {};

  if (isReactChildren(options))
    options = { routes: options };

  var mountedComponents = [];
  var location = options.location || DEFAULT_LOCATION;
  var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
  var state = {};
  var nextState = {};
  var pendingTransition = null;
  var dispatchHandler = null;

  if (typeof location === 'string') {
    warning(
      !canUseDOM || process.env.NODE_ENV === 'test',
      'You should not use a static location in a DOM environment because ' +
      'the router will not be kept in sync with the current URL'
    );
  } else {
    invariant(
      canUseDOM || location.needsDOM === false,
      'You cannot use %s without a DOM',
      location
    );
  }

  // Automatically fall back to full page refreshes in
  // browsers that don't support the HTML history API.
  if (location === HistoryLocation && !supportsHistory())
    location = RefreshLocation;

  var Router = React.createClass({

    displayName: 'Router',

    statics: {

      isRunning: false,

      cancelPendingTransition: function () {
        if (pendingTransition) {
          pendingTransition.abort(new Cancellation);
          pendingTransition = null;
        }
      },

      clearAllRoutes: function () {
        this.cancelPendingTransition();
        this.defaultRoute = null;
        this.notFoundRoute = null;
        this.namedRoutes = {};
        this.routes = [];
      },

      /**
       * Adds routes to this router from the given children object (see ReactChildren).
       */
      addRoutes: function (routes) {
        if (isReactChildren(routes))
          routes = createRoutesFromReactChildren(routes, this, this.namedRoutes);

        this.routes.push.apply(this.routes, routes);
      },

      /**
       * Replaces routes of this router from the given children object (see ReactChildren).
       */
      replaceRoutes: function (routes) {
        this.clearAllRoutes();
        this.addRoutes(routes);
        this.refresh();
      },

      /**
       * Performs a match of the given path against this router and returns an object
       * with the { routes, params, pathname, query } that match. Returns null if no
       * match can be made.
       */
      match: function (path) {
        return findMatch(this.routes, this.defaultRoute, this.notFoundRoute, Path.withoutQuery(path), Path.extractQuery(path));
      },

      /**
       * Returns an absolute URL path created from the given route
       * name, URL parameters, and query.
       */
      makePath: function (to, params, query) {
        var path;
        if (Path.isAbsolute(to)) {
          path = Path.normalize(to);
        } else {
          var route = this.namedRoutes[to];

          invariant(
            route,
            'Unable to find <Route name="%s">',
            to
          );

          path = route.path;
        }

        return Path.withQuery(Path.injectParams(path, params), query);
      },

      /**
       * Returns a string that may safely be used as the href of a link
       * to the route with the given name, URL parameters, and query.
       */
      makeHref: function (to, params, query) {
        var path = this.makePath(to, params, query);
        return (location === HashLocation) ? '#' + path : path;
      },

      /**
       * Transitions to the URL specified in the arguments by pushing
       * a new URL onto the history stack.
       */
      transitionTo: function (to, params, query) {
        invariant(
          typeof location !== 'string',
          'You cannot use transitionTo with a static location'
        );

        var path = this.makePath(to, params, query);

        if (pendingTransition) {
          // Replace so pending location does not stay in history.
          location.replace(path);
        } else {
          location.push(path);
        }
      },

      /**
       * Transitions to the URL specified in the arguments by replacing
       * the current URL in the history stack.
       */
      replaceWith: function (to, params, query) {
        invariant(
          typeof location !== 'string',
          'You cannot use replaceWith with a static location'
        );

        location.replace(this.makePath(to, params, query));
      },

      /**
       * Transitions to the previous URL if one is available. Returns true if the
       * router was able to go back, false otherwise.
       *
       * Note: The router only tracks history entries in your application, not the
       * current browser session, so you can safely call this function without guarding
       * against sending the user back to some other site. However, when using
       * RefreshLocation (which is the fallback for HistoryLocation in browsers that
       * don't support HTML5 history) this method will *always* send the client back
       * because we cannot reliably track history length.
       */
      goBack: function () {
        invariant(
          typeof location !== 'string',
          'You cannot use goBack with a static location'
        );

        if (History.length > 1 || location === RefreshLocation) {
          location.pop();
          return true;
        }

        warning(false, 'goBack() was ignored because there is no router history');

        return false;
      },

      handleAbort: options.onAbort || function (abortReason) {
        if (typeof location === 'string')
          throw new Error('Unhandled aborted transition! Reason: ' + abortReason);

        if (abortReason instanceof Cancellation) {
          return;
        } else if (abortReason instanceof Redirect) {
          location.replace(this.makePath(abortReason.to, abortReason.params, abortReason.query));
        } else {
          location.pop();
        }
      },

      handleError: options.onError || function (error) {
        // Throw so we don't silently swallow async errors.
        throw error; // This error probably originated in a transition hook.
      },

      handleLocationChange: function (change) {
        this.dispatch(change.path, change.type);
      },

      /**
       * Performs a transition to the given path and calls callback(error, abortReason)
       * when the transition is finished. If both arguments are null the router's state
       * was updated. Otherwise the transition did not complete.
       *
       * In a transition, a router first determines which routes are involved by beginning
       * with the current route, up the route tree to the first parent route that is shared
       * with the destination route, and back down the tree to the destination route. The
       * willTransitionFrom hook is invoked on all route handlers we're transitioning away
       * from, in reverse nesting order. Likewise, the willTransitionTo hook is invoked on
       * all route handlers we're transitioning to.
       *
       * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the
       * transition. To resolve asynchronously, they may use the callback argument. If no
       * hooks wait, the transition is fully synchronous.
       */
      dispatch: function (path, action) {
        this.cancelPendingTransition();

        var prevPath = state.path;
        var isRefreshing = action == null;

        if (prevPath === path && !isRefreshing)
          return; // Nothing to do!

        // Record the scroll position as early as possible to
        // get it before browsers try update it automatically.
        if (prevPath && action === LocationActions.PUSH)
          this.recordScrollPosition(prevPath);

        var match = this.match(path);

        warning(
          match != null,
          'No route matches path "%s". Make sure you have <Route path="%s"> somewhere in your routes',
          path, path
        );

        if (match == null)
          match = {};

        var prevRoutes = state.routes || [];
        var prevParams = state.params || {};
        var prevQuery = state.query || {};

        var nextRoutes = match.routes || [];
        var nextParams = match.params || {};
        var nextQuery = match.query || {};

        var fromRoutes, toRoutes;
        if (prevRoutes.length) {
          fromRoutes = prevRoutes.filter(function (route) {
            return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });

          toRoutes = nextRoutes.filter(function (route) {
            return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });
        } else {
          fromRoutes = [];
          toRoutes = nextRoutes;
        }

        var transition = new Transition(path, this.replaceWith.bind(this, path));
        pendingTransition = transition;

        var fromComponents = mountedComponents.slice(prevRoutes.length - fromRoutes.length);

        transition.from(fromRoutes, fromComponents, function (error) {
          if (error || transition.abortReason)
            return dispatchHandler.call(Router, error, transition); // No need to continue.

          transition.to(toRoutes, nextParams, nextQuery, function (error) {
            dispatchHandler.call(Router, error, transition, {
              path: path,
              action: action,
              pathname: match.pathname,
              routes: nextRoutes,
              params: nextParams,
              query: nextQuery
            });
          });
        });
      },

      /**
       * Starts this router and calls callback(router, state) when the route changes.
       *
       * If the router's location is static (i.e. a URL path in a server environment)
       * the callback is called only once. Otherwise, the location should be one of the
       * Router.*Location objects (e.g. Router.HashLocation or Router.HistoryLocation).
       */
      run: function (callback) {
        invariant(
          !this.isRunning,
          'Router is already running'
        );

        dispatchHandler = function (error, transition, newState) {
          if (error)
            Router.handleError(error);

          if (pendingTransition !== transition)
            return;

          pendingTransition = null;

          if (transition.abortReason) {
            Router.handleAbort(transition.abortReason);
          } else {
            callback.call(this, this, nextState = newState);
          }
        };

        if (typeof location === 'string') {
          Router.dispatch(location, null);
        } else {
          if (location.addChangeListener)
            location.addChangeListener(Router.handleLocationChange);

          this.isRunning = true;

          // Bootstrap using the current path.
          this.refresh();
        }
      },

      refresh: function () {
        Router.dispatch(location.getCurrentPath(), null);
      },

      stop: function () {
        this.cancelPendingTransition();

        if (location.removeChangeListener)
          location.removeChangeListener(Router.handleLocationChange);

        this.isRunning = false;
      }

    },

    mixins: [ NavigationContext, StateContext, Scrolling ],

    propTypes: {
      children: PropTypes.falsy
    },

    childContextTypes: {
      getRouteAtDepth: React.PropTypes.func.isRequired,
      setRouteComponentAtDepth: React.PropTypes.func.isRequired,
      routeHandlers: React.PropTypes.array.isRequired
    },

    getChildContext: function () {
      return {
        getRouteAtDepth: this.getRouteAtDepth,
        setRouteComponentAtDepth: this.setRouteComponentAtDepth,
        routeHandlers: [ this ]
      };
    },

    getInitialState: function () {
      return (state = nextState);
    },

    componentWillReceiveProps: function () {
      this.setState(state = nextState);
    },

    componentWillUnmount: function () {
      Router.stop();
    },

    getLocation: function () {
      return location;
    },

    getScrollBehavior: function () {
      return scrollBehavior;
    },

    getRouteAtDepth: function (depth) {
      var routes = this.state.routes;
      return routes && routes[depth];
    },

    setRouteComponentAtDepth: function (depth, component) {
      mountedComponents[depth] = component;
    },

    render: function () {
      var route = this.getRouteAtDepth(0);
      return route ? React.createElement(route.handler, this.props) : null;
    }

  });

  Router.clearAllRoutes();

  if (options.routes)
    Router.addRoutes(options.routes);

  return Router;
}

module.exports = createRouter;

}).call(this,require('_process'))

},{"./Cancellation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Cancellation.js","./History":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/History.js","./NavigationContext":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/NavigationContext.js","./PropTypes":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/PropTypes.js","./Redirect":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Redirect.js","./Routing":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Routing.js","./Scrolling":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Scrolling.js","./StateContext":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/StateContext.js","./Transition":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Transition.js","./actions/LocationActions":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/actions/LocationActions.js","./behaviors/ImitateBrowserBehavior":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/behaviors/ImitateBrowserBehavior.js","./isReactChildren":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/isReactChildren.js","./locations/HashLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HashLocation.js","./locations/HistoryLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HistoryLocation.js","./locations/RefreshLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/RefreshLocation.js","./utils/Path":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/Path.js","./utils/supportsHistory":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/supportsHistory.js","_process":"/Users/pwmckenna/git/tally-master/node_modules/browserify/node_modules/process/browser.js","react":"react","react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js","react/lib/warning":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/warning.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/index.js":[function(require,module,exports){
exports.DefaultRoute = require('./components/DefaultRoute');
exports.Link = require('./components/Link');
exports.NotFoundRoute = require('./components/NotFoundRoute');
exports.Redirect = require('./components/Redirect');
exports.Route = require('./components/Route');
exports.RouteHandler = require('./components/RouteHandler');

exports.HashLocation = require('./locations/HashLocation');
exports.HistoryLocation = require('./locations/HistoryLocation');
exports.RefreshLocation = require('./locations/RefreshLocation');

exports.ImitateBrowserBehavior = require('./behaviors/ImitateBrowserBehavior');
exports.ScrollToTopBehavior = require('./behaviors/ScrollToTopBehavior');

exports.History = require('./History');
exports.Navigation = require('./Navigation');
exports.RouteHandlerMixin = require('./RouteHandlerMixin');
exports.State = require('./State');

exports.create = require('./createRouter');
exports.run = require('./runRouter');


},{"./History":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/History.js","./Navigation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/Navigation.js","./RouteHandlerMixin":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/RouteHandlerMixin.js","./State":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/State.js","./behaviors/ImitateBrowserBehavior":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/behaviors/ImitateBrowserBehavior.js","./behaviors/ScrollToTopBehavior":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/behaviors/ScrollToTopBehavior.js","./components/DefaultRoute":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/DefaultRoute.js","./components/Link":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Link.js","./components/NotFoundRoute":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/NotFoundRoute.js","./components/Redirect":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Redirect.js","./components/Route":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/Route.js","./components/RouteHandler":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/components/RouteHandler.js","./createRouter":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/createRouter.js","./locations/HashLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HashLocation.js","./locations/HistoryLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HistoryLocation.js","./locations/RefreshLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/RefreshLocation.js","./runRouter":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/runRouter.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/isReactChildren.js":[function(require,module,exports){
var React = require('react');

function isValidChild(object) {
  return object == null || React.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || (Array.isArray(object) && object.every(isValidChild));
}

module.exports = isReactChildren;

},{"react":"react"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HashLocation.js":[function(require,module,exports){
var LocationActions = require('../actions/LocationActions');
var History = require('../History');

/**
 * Returns the current URL path from the `hash` portion of the URL, including
 * query string.
 */
function getHashPath() {
  return decodeURI(
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    window.location.href.split('#')[1] || ''
  );
}

var _actionType;

function ensureSlash() {
  var path = getHashPath();

  if (path.charAt(0) === '/')
    return true;

  HashLocation.replace('/' + path);

  return false;
}

var _changeListeners = [];

function notifyChange(type) {
  if (type === LocationActions.PUSH)
    History.length += 1;

  var change = {
    path: getHashPath(),
    type: type
  };

  _changeListeners.forEach(function (listener) {
    listener(change);
  });
}

var _isListening = false;

function onHashChange() {
  if (ensureSlash()) {
    // If we don't have an _actionType then all we know is the hash
    // changed. It was probably caused by the user clicking the Back
    // button, but may have also been the Forward button or manual
    // manipulation. So just guess 'pop'.
    notifyChange(_actionType || LocationActions.POP);
    _actionType = null;
  }
}

/**
 * A Location that uses `window.location.hash`.
 */
var HashLocation = {

  addChangeListener: function (listener) {
    _changeListeners.push(listener);

    // Do this BEFORE listening for hashchange.
    ensureSlash();

    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener('hashchange', onHashChange, false);
      } else {
        window.attachEvent('onhashchange', onHashChange);
      }

      _isListening = true;
    }
  },

  removeChangeListener: function(listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return l !== listener;
    });

    if (_changeListeners.length === 0) {
      if (window.removeEventListener) {
        window.removeEventListener('hashchange', onHashChange, false);
      } else {
        window.removeEvent('onhashchange', onHashChange);
      }

      _isListening = false;
    }
  },

  push: function (path) {
    _actionType = LocationActions.PUSH;
    window.location.hash = encodeURI(path);
  },

  replace: function (path) {
    _actionType = LocationActions.REPLACE;
    window.location.replace(
      window.location.pathname + window.location.search + '#' + encodeURI(path)
    );
  },

  pop: function () {
    _actionType = LocationActions.POP;
    History.back();
  },

  getCurrentPath: getHashPath,

  toString: function () {
    return '<HashLocation>';
  }

};

module.exports = HashLocation;

},{"../History":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/History.js","../actions/LocationActions":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/actions/LocationActions.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HistoryLocation.js":[function(require,module,exports){
var LocationActions = require('../actions/LocationActions');
var History = require('../History');

/**
 * Returns the current URL path from `window.location`, including query string.
 */
function getWindowPath() {
  return decodeURI(
    window.location.pathname + window.location.search
  );
}

var _changeListeners = [];

function notifyChange(type) {
  var change = {
    path: getWindowPath(),
    type: type
  };

  _changeListeners.forEach(function (listener) {
    listener(change);
  });
}

var _isListening = false;

function onPopState() {
  notifyChange(LocationActions.POP);
}

/**
 * A Location that uses HTML5 history.
 */
var HistoryLocation = {

  addChangeListener: function (listener) {
    _changeListeners.push(listener);

    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener('popstate', onPopState, false);
      } else {
        window.attachEvent('popstate', onPopState);
      }

      _isListening = true;
    }
  },

  removeChangeListener: function(listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return l !== listener;
    });

    if (_changeListeners.length === 0) {
      if (window.addEventListener) {
        window.removeEventListener('popstate', onPopState);
      } else {
        window.removeEvent('popstate', onPopState);
      }

      _isListening = false;
    }
  },

  push: function (path) {
    window.history.pushState({ path: path }, '', encodeURI(path));
    History.length += 1;
    notifyChange(LocationActions.PUSH);
  },

  replace: function (path) {
    window.history.replaceState({ path: path }, '', encodeURI(path));
    notifyChange(LocationActions.REPLACE);
  },

  pop: History.back,

  getCurrentPath: getWindowPath,

  toString: function () {
    return '<HistoryLocation>';
  }

};

module.exports = HistoryLocation;

},{"../History":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/History.js","../actions/LocationActions":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/actions/LocationActions.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/RefreshLocation.js":[function(require,module,exports){
var HistoryLocation = require('./HistoryLocation');
var History = require('../History');

/**
 * A Location that uses full page refreshes. This is used as
 * the fallback for HistoryLocation in browsers that do not
 * support the HTML5 history API.
 */
var RefreshLocation = {

  push: function (path) {
    window.location = encodeURI(path);
  },

  replace: function (path) {
    window.location.replace(encodeURI(path));
  },

  pop: History.back,

  getCurrentPath: HistoryLocation.getCurrentPath,

  toString: function () {
    return '<RefreshLocation>';
  }

};

module.exports = RefreshLocation;

},{"../History":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/History.js","./HistoryLocation":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/locations/HistoryLocation.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/runRouter.js":[function(require,module,exports){
var createRouter = require('./createRouter');

/**
 * A high-level convenience method that creates, configures, and
 * runs a router in one shot. The method signature is:
 *
 *   Router.run(routes[, location ], callback);
 *
 * Using `window.location.hash` to manage the URL, you could do:
 *
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 * 
 * Using HTML5 history and a custom "cursor" prop:
 * 
 *   Router.run(routes, Router.HistoryLocation, function (Handler) {
 *     React.render(<Handler cursor={cursor}/>, document.body);
 *   });
 *
 * Returns the newly created router.
 *
 * Note: If you need to specify further options for your router such
 * as error/abort handling or custom scroll behavior, use Router.create
 * instead.
 *
 *   var router = Router.create(options);
 *   router.run(function (Handler) {
 *     // ...
 *   });
 */
function runRouter(routes, location, callback) {
  if (typeof location === 'function') {
    callback = location;
    location = null;
  }

  var router = createRouter({
    routes: routes,
    location: location
  });

  router.run(callback);

  return router;
}

module.exports = runRouter;

},{"./createRouter":"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/createRouter.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/Path.js":[function(require,module,exports){
var invariant = require('react/lib/invariant');
var merge = require('qs/lib/utils').merge;
var qs = require('qs');

var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?\/|\/\?/g;
var queryMatcher = /\?(.+)/;

var _compiledPatterns = {};

function compilePattern(pattern) {
  if (!(pattern in _compiledPatterns)) {
    var paramNames = [];
    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
      if (paramName) {
        paramNames.push(paramName);
        return '([^/?#]+)';
      } else if (match === '*') {
        paramNames.push('splat');
        return '(.*?)';
      } else {
        return '\\' + match;
      }
    });

    _compiledPatterns[pattern] = {
      matcher: new RegExp('^' + source + '$', 'i'),
      paramNames: paramNames
    };
  }

  return _compiledPatterns[pattern];
}

var Path = {

  /**
   * Returns an array of the names of all parameters in the given pattern.
   */
  extractParamNames: function (pattern) {
    return compilePattern(pattern).paramNames;
  },

  /**
   * Extracts the portions of the given URL path that match the given pattern
   * and returns an object of param name => value pairs. Returns null if the
   * pattern does not match the given path.
   */
  extractParams: function (pattern, path) {
    var object = compilePattern(pattern);
    var match = path.match(object.matcher);

    if (!match)
      return null;

    var params = {};

    object.paramNames.forEach(function (paramName, index) {
      params[paramName] = match[index + 1];
    });

    return params;
  },

  /**
   * Returns a version of the given route path with params interpolated. Throws
   * if there is a dynamic segment of the route path for which there is no param.
   */
  injectParams: function (pattern, params) {
    params = params || {};

    var splatIndex = 0;

    return pattern.replace(paramInjectMatcher, function (match, paramName) {
      paramName = paramName || 'splat';

      // If param is optional don't check for existence
      if (paramName.slice(-1) !== '?') {
        invariant(
          params[paramName] != null,
          'Missing "' + paramName + '" parameter for path "' + pattern + '"'
        );
      } else {
        paramName = paramName.slice(0, -1);

        if (params[paramName] == null)
          return '';
      }

      var segment;
      if (paramName === 'splat' && Array.isArray(params[paramName])) {
        segment = params[paramName][splatIndex++];

        invariant(
          segment != null,
          'Missing splat # ' + splatIndex + ' for path "' + pattern + '"'
        );
      } else {
        segment = params[paramName];
      }

      return segment;
    }).replace(paramInjectTrailingSlashMatcher, '/');
  },

  /**
   * Returns an object that is the result of parsing any query string contained
   * in the given path, null if the path contains no query string.
   */
  extractQuery: function (path) {
    var match = path.match(queryMatcher);
    return match && qs.parse(match[1]);
  },

  /**
   * Returns a version of the given path without the query string.
   */
  withoutQuery: function (path) {
    return path.replace(queryMatcher, '');
  },

  /**
   * Returns a version of the given path with the parameters in the given
   * query merged into the query string.
   */
  withQuery: function (path, query) {
    var existingQuery = Path.extractQuery(path);

    if (existingQuery)
      query = query ? merge(existingQuery, query) : existingQuery;

    var queryString = qs.stringify(query, { indices: false });

    if (queryString)
      return Path.withoutQuery(path) + '?' + decodeURIComponent(queryString);

    return path;
  },

  /**
   * Returns true if the given path is absolute.
   */
  isAbsolute: function (path) {
    return path.charAt(0) === '/';
  },

  /**
   * Returns a normalized version of the given path.
   */
  normalize: function (path, parentRoute) {
    return path.replace(/^\/*/, '/');
  },

  /**
   * Joins two URL paths together.
   */
  join: function (a, b) {
    return a.replace(/\/*$/, '/') + b;
  }

};

module.exports = Path;

},{"qs":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/index.js","qs/lib/utils":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/utils.js","react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/getWindowScrollPosition.js":[function(require,module,exports){
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

/**
 * Returns the current scroll position of the window as { x, y }.
 */
function getWindowScrollPosition() {
  invariant(
    canUseDOM,
    'Cannot get current scroll position without a DOM'
  );

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

module.exports = getWindowScrollPosition;

},{"react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/modules/utils/supportsHistory.js":[function(require,module,exports){
function supportsHistory() {
  /*! taken from modernizr
   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
   * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
   */
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 ||
      (ua.indexOf('Android 4.0') !== -1)) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return (window.history && 'pushState' in window.history);
}

module.exports = supportsHistory;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/index.js":[function(require,module,exports){
module.exports = require('./lib/');

},{"./lib/":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/index.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/index.js":[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/parse.js","./stringify":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/stringify.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/parse.js":[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
};


internals.parseValues = function (str, options) {

    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (!obj.hasOwnProperty(key)) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val, options) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        var indexString = '' + index;
        if (!isNaN(index) &&
            root !== cleanRoot &&
            indexString === cleanRoot &&
            index >= 0 &&
            index <= options.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val, options);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, options) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val, options);
};


module.exports = function (str, options) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj);
    }

    return Utils.compact(obj);
};

},{"./utils":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/utils.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/stringify.js":[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    indices: true
};


internals.stringify = function (obj, prefix, options) {

    if (Utils.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        if (!options.indices &&
            Array.isArray(obj)) {

            values = values.concat(internals.stringify(obj[key], prefix, options));
        }
        else {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', options));
        }
    }

    return values;
};


module.exports = function (obj, options) {

    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
    options.indices = typeof options.indices === 'boolean' ? options.indices : internals.indices;

    var keys = [];

    if (typeof obj !== 'object' ||
        obj === null) {

        return '';
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        keys = keys.concat(internals.stringify(obj[key], key, options));
    }

    return keys.join(delimiter);
};

},{"./utils":"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/utils.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react-router/node_modules/qs/lib/utils.js":[function(require,module,exports){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        }
        else {
            target[source] = true;
        }

        return target;
    }

    if (typeof target !== 'object') {
        target = [target].concat(source);
        return target;
    }

    if (Array.isArray(target) &&
        !Array.isArray(source)) {

        target = exports.arrayToObject(target);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (!target[key]) {
            target[key] = value;
        }
        else {
            target[key] = exports.merge(target[key], value);
        }
    }

    return target;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj, refs) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0, il = obj.length; i < il; ++i) {
            if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};


exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};


exports.isBuffer = function (obj) {

    if (obj === null ||
        typeof obj === 'undefined') {

        return false;
    }

    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/ExecutionEnvironment.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

"use strict";

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/Object.assign.js":[function(require,module,exports){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};

module.exports = assign;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/cx.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cx
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

module.exports = cx;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/emptyFunction.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"/Users/pwmckenna/git/tally-master/node_modules/browserify/node_modules/process/browser.js"}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/warning.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warning
 */

"use strict";

var emptyFunction = require("./emptyFunction");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== process.env.NODE_ENV) {
  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (!condition) {
      var argIndex = 0;
      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"./emptyFunction":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/emptyFunction.js","_process":"/Users/pwmckenna/git/tally-master/node_modules/browserify/node_modules/process/browser.js"}]},{},["./specs/App-spec.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcGVjcy9BcHAtc3BlYy5qcyIsImFwcC9BcHAuanN4Iiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9DYW5jZWxsYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvQ29uZmlndXJhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9IaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL05hdmlnYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvTmF2aWdhdGlvbkNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvUHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JlZGlyZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlSGFuZGxlck1peGluLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRpbmcuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvU2Nyb2xsaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1N0YXRlQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9UcmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2JlaGF2aW9ycy9JbWl0YXRlQnJvd3NlckJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2JlaGF2aW9ycy9TY3JvbGxUb1RvcEJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvTGluay5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jb21wb25lbnRzL05vdEZvdW5kUm91dGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvY29tcG9uZW50cy9SZWRpcmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jb21wb25lbnRzL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvUm91dGVIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NyZWF0ZVJvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pc1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvbG9jYXRpb25zL0hhc2hMb2NhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9sb2NhdGlvbnMvSGlzdG9yeUxvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvcnVuUm91dGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL3V0aWxzL1BhdGguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXRpbHMvZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXRpbHMvc3VwcG9ydHNIaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvcGFyc2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY3guanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvd2FybmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEFwcCA9IHJlcXVpcmUoJy4vLi4vYXBwL0FwcC5qc3gnKTtcbnZhciBUZXN0VXRpbHMgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMnKS5UZXN0VXRpbHM7XG5cbmRlc2NyaWJlKFwiQXBwXCIsIGZ1bmN0aW9uKCkge1xuXG4gIGl0KFwic2hvdWxkIHJlbmRlciB0ZXh0OiBIZWxsbyB3b3JsZCFcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwcCA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoQXBwKCkpO1xuICAgIGV4cGVjdChhcHAuZ2V0RE9NTm9kZSgpLnRleHRDb250ZW50KS50b0VxdWFsKCdIZWxsbyB3b3JsZCEnKTtcbiAgfSk7XG5cbn0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFwcFwiLFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdFJvdXRlci5Sb3V0ZUhhbmRsZXIsIFJlYWN0Ll9fc3ByZWFkKHt9LCAgdGhpcy5wcm9wcykpXG4gICAgICAgIClcbiAgICB9XG59KTtcblx0XG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudFF1ZXVlO1xuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG59XG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHF1ZXVlLnB1c2goZnVuKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBjYW5jZWxsYXRpb24gY2F1c2VkIGJ5IG5hdmlnYXRpbmcgYXdheVxuICogYmVmb3JlIHRoZSBwcmV2aW91cyB0cmFuc2l0aW9uIGhhcyBmdWxseSByZXNvbHZlZC5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsbGF0aW9uKCkge31cblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxsYXRpb247XG4iLCJ2YXIgd2FybmluZyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi93YXJuaW5nJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xuXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyhjb21wb25lbnROYW1lLCBwcm9wVHlwZXMsIHByb3BzKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9wVHlwZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICB2YXIgZXJyb3IgPSBwcm9wVHlwZXNbcHJvcE5hbWVdKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSk7XG5cbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKVxuICAgICAgICB3YXJuaW5nKGZhbHNlLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIENvbmZpZ3VyYXRpb24gPSB7XG5cbiAgc3RhdGljczoge1xuXG4gICAgdmFsaWRhdGVQcm9wczogZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICBjaGVja1Byb3BUeXBlcyh0aGlzLmRpc3BsYXlOYW1lLCB0aGlzLnByb3BUeXBlcywgcHJvcHMpO1xuICAgIH1cblxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJyVzIGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCcsXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lXG4gICAgKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbmZpZ3VyYXRpb247XG4iLCJ2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpLmNhblVzZURPTTtcblxudmFyIEhpc3RvcnkgPSB7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG51bWJlciBvZiBlbnRyaWVzIGluIHRoZSBoaXN0b3J5LlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIHByb3BlcnR5IGlzIHJlYWQtb25seS5cbiAgICovXG4gIGxlbmd0aDogMSxcblxuICAvKipcbiAgICogU2VuZHMgdGhlIGJyb3dzZXIgYmFjayBvbmUgZW50cnkgaW4gdGhlIGhpc3RvcnkuXG4gICAqL1xuICBiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgY2FuVXNlRE9NLFxuICAgICAgJ0Nhbm5vdCB1c2UgSGlzdG9yeS5iYWNrIHdpdGhvdXQgYSBET00nXG4gICAgKTtcblxuICAgIC8vIERvIHRoaXMgZmlyc3Qgc28gdGhhdCBIaXN0b3J5Lmxlbmd0aCB3aWxsXG4gICAgLy8gYmUgYWNjdXJhdGUgaW4gbG9jYXRpb24gY2hhbmdlIGxpc3RlbmVycy5cbiAgICBIaXN0b3J5Lmxlbmd0aCAtPSAxO1xuXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGlzdG9yeTtcbiIsInZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1Byb3BUeXBlcycpO1xuXG4vKipcbiAqIEEgbWl4aW4gZm9yIGNvbXBvbmVudHMgdGhhdCBtb2RpZnkgdGhlIFVSTC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBtaXhpbnM6IFsgUm91dGVyLk5hdmlnYXRpb24gXSxcbiAqICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gKiAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICogICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJ2FSb3V0ZScsIHsgdGhlOiAncGFyYW1zJyB9LCB7IHRoZTogJ3F1ZXJ5JyB9KTtcbiAqICAgICB9LFxuICogICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICogICAgICAgcmV0dXJuIChcbiAqICAgICAgICAgPGEgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+Q2xpY2sgbWUhPC9hPlxuICogICAgICAgKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICovXG52YXIgTmF2aWdhdGlvbiA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICBtYWtlUGF0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtYWtlSHJlZjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2l0aW9uVG86IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmVwbGFjZVdpdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ29CYWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYWJzb2x1dGUgVVJMIHBhdGggY3JlYXRlZCBmcm9tIHRoZSBnaXZlbiByb3V0ZVxuICAgKiBuYW1lLCBVUkwgcGFyYW1ldGVycywgYW5kIHF1ZXJ5IHZhbHVlcy5cbiAgICovXG4gIG1ha2VQYXRoOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0Lm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyB0aGF0IG1heSBzYWZlbHkgYmUgdXNlZCBhcyB0aGUgaHJlZiBvZiBhXG4gICAqIGxpbmsgdG8gdGhlIHJvdXRlIHdpdGggdGhlIGdpdmVuIG5hbWUuXG4gICAqL1xuICBtYWtlSHJlZjogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5tYWtlSHJlZih0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRyYW5zaXRpb25zIHRvIHRoZSBVUkwgc3BlY2lmaWVkIGluIHRoZSBhcmd1bWVudHMgYnkgcHVzaGluZ1xuICAgKiBhIG5ldyBVUkwgb250byB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIHRyYW5zaXRpb25UbzogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5jb250ZXh0LnRyYW5zaXRpb25Ubyh0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRyYW5zaXRpb25zIHRvIHRoZSBVUkwgc3BlY2lmaWVkIGluIHRoZSBhcmd1bWVudHMgYnkgcmVwbGFjaW5nXG4gICAqIHRoZSBjdXJyZW50IFVSTCBpbiB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIHJlcGxhY2VXaXRoOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICB0aGlzLmNvbnRleHQucmVwbGFjZVdpdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgcHJldmlvdXMgVVJMLlxuICAgKi9cbiAgZ29CYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmdvQmFjaygpO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbjtcbiIsInZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1Byb3BUeXBlcycpO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSByb3V0ZXIgd2l0aCBjb250ZXh0IGZvciBSb3V0ZXIuTmF2aWdhdGlvbi5cbiAqL1xudmFyIE5hdmlnYXRpb25Db250ZXh0ID0ge1xuXG4gIGNoaWxkQ29udGV4dFR5cGVzOiB7XG4gICAgbWFrZVBhdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbWFrZUhyZWY6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdHJhbnNpdGlvblRvOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHJlcGxhY2VXaXRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdvQmFjazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYWtlUGF0aDogdGhpcy5jb25zdHJ1Y3Rvci5tYWtlUGF0aC5iaW5kKHRoaXMuY29uc3RydWN0b3IpLFxuICAgICAgbWFrZUhyZWY6IHRoaXMuY29uc3RydWN0b3IubWFrZUhyZWYuYmluZCh0aGlzLmNvbnN0cnVjdG9yKSxcbiAgICAgIHRyYW5zaXRpb25UbzogdGhpcy5jb25zdHJ1Y3Rvci50cmFuc2l0aW9uVG8uYmluZCh0aGlzLmNvbnN0cnVjdG9yKSxcbiAgICAgIHJlcGxhY2VXaXRoOiB0aGlzLmNvbnN0cnVjdG9yLnJlcGxhY2VXaXRoLmJpbmQodGhpcy5jb25zdHJ1Y3RvciksXG4gICAgICBnb0JhY2s6IHRoaXMuY29uc3RydWN0b3IuZ29CYWNrLmJpbmQodGhpcy5jb25zdHJ1Y3RvcilcbiAgICB9O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbkNvbnRleHQ7XG4iLCJ2YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IHJlcXVpcmUoJ3JlYWN0JykuUHJvcFR5cGVzO1xuXG52YXIgUHJvcFR5cGVzID0gYXNzaWduKHtcblxuICAvKipcbiAgICogUmVxdWlyZXMgdGhhdCB0aGUgdmFsdWUgb2YgYSBwcm9wIGJlIGZhbHN5LlxuICAgKi9cbiAgZmFsc3k6IGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICBpZiAocHJvcHNbcHJvcE5hbWVdKVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignPCcgKyBjb21wb25lbnROYW1lICsgJz4gbWF5IG5vdCBoYXZlIGEgXCInICsgcHJvcE5hbWUgKyAnXCIgcHJvcCcpO1xuICB9XG5cbn0sIFJlYWN0UHJvcFR5cGVzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9wVHlwZXM7XG4iLCIvKipcbiAqIEVuY2Fwc3VsYXRlcyBhIHJlZGlyZWN0IHRvIHRoZSBnaXZlbiByb3V0ZS5cbiAqL1xuZnVuY3Rpb24gUmVkaXJlY3QodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgdGhpcy50byA9IHRvO1xuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZGlyZWN0O1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbnZhciBSRUZfTkFNRSA9ICdfX3JvdXRlSGFuZGxlcl9fJztcblxudmFyIFJvdXRlSGFuZGxlck1peGluID0ge1xuXG4gIGNvbnRleHRUeXBlczoge1xuICAgIGdldFJvdXRlQXREZXB0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcm91dGVIYW5kbGVyczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcblxuICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgIHJvdXRlSGFuZGxlcnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgZ2V0Q2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdXRlSGFuZGxlcnM6IHRoaXMuY29udGV4dC5yb3V0ZUhhbmRsZXJzLmNvbmNhdChbIHRoaXMgXSlcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdXBkYXRlUm91dGVDb21wb25lbnQoKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl91cGRhdGVSb3V0ZUNvbXBvbmVudCgpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LnNldFJvdXRlQ29tcG9uZW50QXREZXB0aCh0aGlzLmdldFJvdXRlRGVwdGgoKSwgbnVsbCk7XG4gIH0sXG5cbiAgX3VwZGF0ZVJvdXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LnNldFJvdXRlQ29tcG9uZW50QXREZXB0aCh0aGlzLmdldFJvdXRlRGVwdGgoKSwgdGhpcy5yZWZzW1JFRl9OQU1FXSk7XG4gIH0sXG5cbiAgZ2V0Um91dGVEZXB0aDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQucm91dGVIYW5kbGVycy5sZW5ndGg7XG4gIH0sXG5cbiAgY3JlYXRlQ2hpbGRSb3V0ZUhhbmRsZXI6IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHZhciByb3V0ZSA9IHRoaXMuY29udGV4dC5nZXRSb3V0ZUF0RGVwdGgodGhpcy5nZXRSb3V0ZURlcHRoKCkpO1xuICAgIHJldHVybiByb3V0ZSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQocm91dGUuaGFuZGxlciwgYXNzaWduKHt9LCBwcm9wcyB8fCB0aGlzLnByb3BzLCB7IHJlZjogUkVGX05BTUUgfSkpIDogbnVsbDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlSGFuZGxlck1peGluO1xuIiwiLyoganNoaW50IC1XMDg0ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcbnZhciBEZWZhdWx0Um91dGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlJyk7XG52YXIgTm90Rm91bmRSb3V0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Ob3RGb3VuZFJvdXRlJyk7XG52YXIgUmVkaXJlY3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUmVkaXJlY3QnKTtcbnZhciBQYXRoID0gcmVxdWlyZSgnLi91dGlscy9QYXRoJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zaXRpb25Ub0hvb2sodG8sIF9wYXJhbXMsIF9xdWVyeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHRyYW5zaXRpb24sIHBhcmFtcywgcXVlcnkpIHtcbiAgICB0cmFuc2l0aW9uLnJlZGlyZWN0KHRvLCBfcGFyYW1zIHx8IHBhcmFtcywgX3F1ZXJ5IHx8IHF1ZXJ5KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUm91dGUoZWxlbWVudCwgcGFyZW50Um91dGUsIG5hbWVkUm91dGVzKSB7XG4gIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICB2YXIgcHJvcHMgPSBlbGVtZW50LnByb3BzO1xuXG4gIGlmICh0eXBlLnZhbGlkYXRlUHJvcHMpXG4gICAgdHlwZS52YWxpZGF0ZVByb3BzKHByb3BzKTtcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgIGlnbm9yZVNjcm9sbEJlaGF2aW9yOiAhIXByb3BzLmlnbm9yZVNjcm9sbEJlaGF2aW9yXG4gIH07XG5cbiAgaWYgKHR5cGUgPT09IFJlZGlyZWN0LnR5cGUpIHtcbiAgICBvcHRpb25zLndpbGxUcmFuc2l0aW9uVG8gPSBjcmVhdGVUcmFuc2l0aW9uVG9Ib29rKHByb3BzLnRvLCBwcm9wcy5wYXJhbXMsIHByb3BzLnF1ZXJ5KTtcbiAgICBwcm9wcy5wYXRoID0gcHJvcHMucGF0aCB8fCBwcm9wcy5mcm9tIHx8ICcqJztcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zLmhhbmRsZXIgPSBwcm9wcy5oYW5kbGVyO1xuICAgIG9wdGlvbnMud2lsbFRyYW5zaXRpb25UbyA9IHByb3BzLmhhbmRsZXIgJiYgcHJvcHMuaGFuZGxlci53aWxsVHJhbnNpdGlvblRvO1xuICAgIG9wdGlvbnMud2lsbFRyYW5zaXRpb25Gcm9tID0gcHJvcHMuaGFuZGxlciAmJiBwcm9wcy5oYW5kbGVyLndpbGxUcmFuc2l0aW9uRnJvbTtcbiAgfVxuXG4gIHZhciBwYXJlbnRQYXRoID0gKHBhcmVudFJvdXRlICYmIHBhcmVudFJvdXRlLnBhdGgpIHx8ICcvJztcblxuICBpZiAoKHByb3BzLnBhdGggfHwgcHJvcHMubmFtZSkgJiYgdHlwZSAhPT0gRGVmYXVsdFJvdXRlLnR5cGUgJiYgdHlwZSAhPT0gTm90Rm91bmRSb3V0ZS50eXBlKSB7XG4gICAgdmFyIHBhdGggPSBwcm9wcy5wYXRoIHx8IHByb3BzLm5hbWU7XG5cbiAgICAvLyBSZWxhdGl2ZSBwYXRocyBleHRlbmQgdGhlaXIgcGFyZW50LlxuICAgIGlmICghUGF0aC5pc0Fic29sdXRlKHBhdGgpKVxuICAgICAgcGF0aCA9IFBhdGguam9pbihwYXJlbnRQYXRoLCBwYXRoKTtcblxuICAgIG9wdGlvbnMucGF0aCA9IFBhdGgubm9ybWFsaXplKHBhdGgpO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMucGF0aCA9IHBhcmVudFBhdGg7XG5cbiAgICBpZiAodHlwZSA9PT0gTm90Rm91bmRSb3V0ZS50eXBlKVxuICAgICAgb3B0aW9ucy5wYXRoICs9ICcqJztcbiAgfVxuXG4gIG9wdGlvbnMucGFyYW1OYW1lcyA9IFBhdGguZXh0cmFjdFBhcmFtTmFtZXMob3B0aW9ucy5wYXRoKTtcblxuICAvLyBNYWtlIHN1cmUgdGhlIHJvdXRlJ3MgcGF0aCBoYXMgYWxsIHBhcmFtcyBpdHMgcGFyZW50IG5lZWRzLlxuICBpZiAocGFyZW50Um91dGUgJiYgQXJyYXkuaXNBcnJheShwYXJlbnRSb3V0ZS5wYXJhbU5hbWVzKSkge1xuICAgIHBhcmVudFJvdXRlLnBhcmFtTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW1OYW1lKSB7XG4gICAgICBpbnZhcmlhbnQoXG4gICAgICAgIG9wdGlvbnMucGFyYW1OYW1lcy5pbmRleE9mKHBhcmFtTmFtZSkgIT09IC0xLFxuICAgICAgICAnVGhlIG5lc3RlZCByb3V0ZSBwYXRoIFwiJXNcIiBpcyBtaXNzaW5nIHRoZSBcIiVzXCIgcGFyYW1ldGVyIG9mIGl0cyBwYXJlbnQgcGF0aCBcIiVzXCInLFxuICAgICAgICBvcHRpb25zLnBhdGgsIHBhcmFtTmFtZSwgcGFyZW50Um91dGUucGF0aFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciByb3V0ZSA9IG5ldyBSb3V0ZShvcHRpb25zKTtcblxuICAvLyBNYWtlIHN1cmUgdGhlIHJvdXRlIGNhbiBiZSBsb29rZWQgdXAgYnkgPExpbms+cy5cbiAgaWYgKHByb3BzLm5hbWUpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBuYW1lZFJvdXRlc1twcm9wcy5uYW1lXSA9PSBudWxsLFxuICAgICAgJ1lvdSBjYW5ub3QgdXNlIHRoZSBuYW1lIFwiJXNcIiBmb3IgbW9yZSB0aGFuIG9uZSByb3V0ZScsXG4gICAgICBwcm9wcy5uYW1lXG4gICAgKTtcblxuICAgIG5hbWVkUm91dGVzW3Byb3BzLm5hbWVdID0gcm91dGU7XG4gIH1cblxuICAvLyBIYW5kbGUgPE5vdEZvdW5kUm91dGU+LlxuICBpZiAodHlwZSA9PT0gTm90Rm91bmRSb3V0ZS50eXBlKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgcGFyZW50Um91dGUsXG4gICAgICAnPE5vdEZvdW5kUm91dGU+IG11c3QgaGF2ZSBhIHBhcmVudCA8Um91dGU+J1xuICAgICk7XG5cbiAgICBpbnZhcmlhbnQoXG4gICAgICBwYXJlbnRSb3V0ZS5ub3RGb3VuZFJvdXRlID09IG51bGwsXG4gICAgICAnWW91IG1heSBub3QgaGF2ZSBtb3JlIHRoYW4gb25lIDxOb3RGb3VuZFJvdXRlPiBwZXIgPFJvdXRlPidcbiAgICApO1xuXG4gICAgaW52YXJpYW50KFxuICAgICAgcHJvcHMuY2hpbGRyZW4gPT0gbnVsbCxcbiAgICAgICc8Tm90Rm91bmRSb3V0ZT4gbXVzdCBub3QgaGF2ZSBjaGlsZHJlbidcbiAgICApO1xuXG4gICAgcGFyZW50Um91dGUubm90Rm91bmRSb3V0ZSA9IHJvdXRlO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBIYW5kbGUgPERlZmF1bHRSb3V0ZT4uXG4gIGlmICh0eXBlID09PSBEZWZhdWx0Um91dGUudHlwZSkge1xuICAgIGludmFyaWFudChcbiAgICAgIHBhcmVudFJvdXRlLFxuICAgICAgJzxEZWZhdWx0Um91dGU+IG11c3QgaGF2ZSBhIHBhcmVudCA8Um91dGU+J1xuICAgICk7XG5cbiAgICBpbnZhcmlhbnQoXG4gICAgICBwYXJlbnRSb3V0ZS5kZWZhdWx0Um91dGUgPT0gbnVsbCxcbiAgICAgICdZb3UgbWF5IG5vdCBoYXZlIG1vcmUgdGhhbiBvbmUgPERlZmF1bHRSb3V0ZT4gcGVyIDxSb3V0ZT4nXG4gICAgKTtcblxuICAgIGludmFyaWFudChcbiAgICAgIHByb3BzLmNoaWxkcmVuID09IG51bGwsXG4gICAgICAnPERlZmF1bHRSb3V0ZT4gbXVzdCBub3QgaGF2ZSBjaGlsZHJlbidcbiAgICApO1xuXG4gICAgcGFyZW50Um91dGUuZGVmYXVsdFJvdXRlID0gcm91dGU7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJvdXRlLnJvdXRlcyA9IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKHByb3BzLmNoaWxkcmVuLCByb3V0ZSwgbmFtZWRSb3V0ZXMpO1xuXG4gIHJldHVybiByb3V0ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHJvdXRlIG9iamVjdHMgZnJvbSB0aGUgZ2l2ZW4gUmVhY3RDaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4oY2hpbGRyZW4sIHBhcmVudFJvdXRlLCBuYW1lZFJvdXRlcykge1xuICB2YXIgcm91dGVzID0gW107XG5cbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgLy8gRXhjbHVkZSBudWxsIHZhbHVlcywgPERlZmF1bHRSb3V0ZT5zIGFuZCA8Tm90Rm91bmRSb3V0ZT5zLlxuICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgKGNoaWxkID0gY3JlYXRlUm91dGUoY2hpbGQsIHBhcmVudFJvdXRlLCBuYW1lZFJvdXRlcykpKVxuICAgICAgcm91dGVzLnB1c2goY2hpbGQpO1xuICB9KTtcblxuICByZXR1cm4gcm91dGVzO1xufVxuXG5mdW5jdGlvbiBSb3V0ZShvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgdGhpcy5wYXRoID0gb3B0aW9ucy5wYXRoIHx8ICcvJztcbiAgdGhpcy5wYXJhbU5hbWVzID0gb3B0aW9ucy5wYXJhbU5hbWVzIHx8IFBhdGguZXh0cmFjdFBhcmFtTmFtZXModGhpcy5wYXRoKTtcbiAgdGhpcy5pZ25vcmVTY3JvbGxCZWhhdmlvciA9ICEhb3B0aW9ucy5pZ25vcmVTY3JvbGxCZWhhdmlvcjtcbiAgdGhpcy53aWxsVHJhbnNpdGlvblRvID0gb3B0aW9ucy53aWxsVHJhbnNpdGlvblRvO1xuICB0aGlzLndpbGxUcmFuc2l0aW9uRnJvbSA9IG9wdGlvbnMud2lsbFRyYW5zaXRpb25Gcm9tO1xuICB0aGlzLmhhbmRsZXIgPSBvcHRpb25zLmhhbmRsZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbjogY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4sXG4gIFJvdXRlOiBSb3V0ZVxufTtcbiIsInZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZSgncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JykuY2FuVXNlRE9NO1xudmFyIGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uID0gcmVxdWlyZSgnLi91dGlscy9nZXRXaW5kb3dTY3JvbGxQb3NpdGlvbicpO1xuXG5mdW5jdGlvbiBzaG91bGRVcGRhdGVTY3JvbGwoc3RhdGUsIHByZXZTdGF0ZSkge1xuICBpZiAoIXByZXZTdGF0ZSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICAvLyBEb24ndCB1cGRhdGUgc2Nyb2xsIHBvc2l0aW9uIHdoZW4gb25seSB0aGUgcXVlcnkgaGFzIGNoYW5nZWQuXG4gIGlmIChzdGF0ZS5wYXRobmFtZSA9PT0gcHJldlN0YXRlLnBhdGhuYW1lKVxuICAgIHJldHVybiBmYWxzZTtcblxuICB2YXIgcm91dGVzID0gc3RhdGUucm91dGVzO1xuICB2YXIgcHJldlJvdXRlcyA9IHByZXZTdGF0ZS5yb3V0ZXM7XG5cbiAgdmFyIHNoYXJlZEFuY2VzdG9yUm91dGVzID0gcm91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcbiAgICByZXR1cm4gcHJldlJvdXRlcy5pbmRleE9mKHJvdXRlKSAhPT0gLTE7XG4gIH0pO1xuXG4gIHJldHVybiAhc2hhcmVkQW5jZXN0b3JSb3V0ZXMuc29tZShmdW5jdGlvbiAocm91dGUpIHtcbiAgICByZXR1cm4gcm91dGUuaWdub3JlU2Nyb2xsQmVoYXZpb3I7XG4gIH0pO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSByb3V0ZXIgd2l0aCB0aGUgYWJpbGl0eSB0byBtYW5hZ2Ugd2luZG93IHNjcm9sbCBwb3NpdGlvblxuICogYWNjb3JkaW5nIHRvIGl0cyBzY3JvbGwgYmVoYXZpb3IuXG4gKi9cbnZhciBTY3JvbGxpbmcgPSB7XG5cbiAgc3RhdGljczoge1xuICAgIC8qKlxuICAgICAqIFJlY29yZHMgY3VyZW50IHNjcm9sbCBwb3NpdGlvbiBhcyB0aGUgbGFzdCBrbm93biBwb3NpdGlvbiBmb3IgdGhlIGdpdmVuIFVSTCBwYXRoLlxuICAgICAqL1xuICAgIHJlY29yZFNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgaWYgKCF0aGlzLnNjcm9sbEhpc3RvcnkpXG4gICAgICAgIHRoaXMuc2Nyb2xsSGlzdG9yeSA9IHt9O1xuXG4gICAgICB0aGlzLnNjcm9sbEhpc3RvcnlbcGF0aF0gPSBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbigpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IGtub3duIHNjcm9sbCBwb3NpdGlvbiBmb3IgdGhlIGdpdmVuIFVSTCBwYXRoLlxuICAgICAqL1xuICAgIGdldFNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgaWYgKCF0aGlzLnNjcm9sbEhpc3RvcnkpXG4gICAgICAgIHRoaXMuc2Nyb2xsSGlzdG9yeSA9IHt9O1xuXG4gICAgICByZXR1cm4gdGhpcy5zY3JvbGxIaXN0b3J5W3BhdGhdIHx8IG51bGw7XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIGludmFyaWFudChcbiAgICAgIHRoaXMuZ2V0U2Nyb2xsQmVoYXZpb3IoKSA9PSBudWxsIHx8IGNhblVzZURPTSxcbiAgICAgICdDYW5ub3QgdXNlIHNjcm9sbCBiZWhhdmlvciB3aXRob3V0IGEgRE9NJ1xuICAgICk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl91cGRhdGVTY3JvbGwoKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbChwcmV2U3RhdGUpO1xuICB9LFxuXG4gIF91cGRhdGVTY3JvbGw6IGZ1bmN0aW9uIChwcmV2U3RhdGUpIHtcbiAgICBpZiAoIXNob3VsZFVwZGF0ZVNjcm9sbCh0aGlzLnN0YXRlLCBwcmV2U3RhdGUpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHNjcm9sbEJlaGF2aW9yID0gdGhpcy5nZXRTY3JvbGxCZWhhdmlvcigpO1xuXG4gICAgaWYgKHNjcm9sbEJlaGF2aW9yKVxuICAgICAgc2Nyb2xsQmVoYXZpb3IudXBkYXRlU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuZ2V0U2Nyb2xsUG9zaXRpb24odGhpcy5zdGF0ZS5wYXRoKSxcbiAgICAgICAgdGhpcy5zdGF0ZS5hY3Rpb25cbiAgICAgICk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxpbmc7XG4iLCJ2YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9Qcm9wVHlwZXMnKTtcblxuLyoqXG4gKiBBIG1peGluIGZvciBjb21wb25lbnRzIHRoYXQgbmVlZCB0byBrbm93IHRoZSBwYXRoLCByb3V0ZXMsIFVSTFxuICogcGFyYW1zIGFuZCBxdWVyeSB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICB2YXIgQWJvdXRMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIG1peGluczogWyBSb3V0ZXIuU3RhdGUgXSxcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcbiAqICAgXG4gKiAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSgnYWJvdXQnKSlcbiAqICAgICAgICAgY2xhc3NOYW1lICs9ICcgaXMtYWN0aXZlJztcbiAqICAgXG4gKiAgICAgICByZXR1cm4gUmVhY3QuRE9NLmEoeyBjbGFzc05hbWU6IGNsYXNzTmFtZSB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICovXG52YXIgU3RhdGUgPSB7XG5cbiAgY29udGV4dFR5cGVzOiB7XG4gICAgZ2V0Q3VycmVudFBhdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFJvdXRlczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50UGF0aG5hbWU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFBhcmFtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50UXVlcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNBY3RpdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aC5cbiAgICovXG4gIGdldFBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnRQYXRoKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHJvdXRlcyB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICAgKi9cbiAgZ2V0Um91dGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRDdXJyZW50Um91dGVzKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGggd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnRQYXRobmFtZSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUgVVJMIHBhcmFtcyB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICAgKi9cbiAgZ2V0UGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRDdXJyZW50UGFyYW1zKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBxdWVyeSBwYXJhbXMgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIGdldFF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRDdXJyZW50UXVlcnkoKTtcbiAgfSxcblxuICAvKipcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGRldGVybWluZSBpZiBhIGdpdmVuIHJvdXRlLCBwYXJhbXMsIGFuZCBxdWVyeVxuICAgKiBhcmUgYWN0aXZlLlxuICAgKi9cbiAgaXNBY3RpdmU6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuaXNBY3RpdmUodG8sIHBhcmFtcywgcXVlcnkpO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGU7XG4iLCJ2YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1Byb3BUeXBlcycpO1xudmFyIFBhdGggPSByZXF1aXJlKCcuL3V0aWxzL1BhdGgnKTtcblxuZnVuY3Rpb24gcm91dGVJc0FjdGl2ZShhY3RpdmVSb3V0ZXMsIHJvdXRlTmFtZSkge1xuICByZXR1cm4gYWN0aXZlUm91dGVzLnNvbWUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgcmV0dXJuIHJvdXRlLm5hbWUgPT09IHJvdXRlTmFtZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcmFtc0FyZUFjdGl2ZShhY3RpdmVQYXJhbXMsIHBhcmFtcykge1xuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwYXJhbXMpXG4gICAgaWYgKFN0cmluZyhhY3RpdmVQYXJhbXNbcHJvcGVydHldKSAhPT0gU3RyaW5nKHBhcmFtc1twcm9wZXJ0eV0pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBxdWVyeUlzQWN0aXZlKGFjdGl2ZVF1ZXJ5LCBxdWVyeSkge1xuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBxdWVyeSlcbiAgICBpZiAoU3RyaW5nKGFjdGl2ZVF1ZXJ5W3Byb3BlcnR5XSkgIT09IFN0cmluZyhxdWVyeVtwcm9wZXJ0eV0pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSByb3V0ZXIgd2l0aCBjb250ZXh0IGZvciBSb3V0ZXIuU3RhdGUuXG4gKi9cbnZhciBTdGF0ZUNvbnRleHQgPSB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGggKyBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICBnZXRDdXJyZW50UGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnBhdGg7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByZWFkLW9ubHkgYXJyYXkgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgcm91dGVzLlxuICAgKi9cbiAgZ2V0Q3VycmVudFJvdXRlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnJvdXRlcy5zbGljZSgwKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICBnZXRDdXJyZW50UGF0aG5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wYXRobmFtZTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHJlYWQtb25seSBvYmplY3Qgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgVVJMIHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRDdXJyZW50UGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFzc2lnbih7fSwgdGhpcy5zdGF0ZS5wYXJhbXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmVhZC1vbmx5IG9iamVjdCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgZ2V0Q3VycmVudFF1ZXJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFzc2lnbih7fSwgdGhpcy5zdGF0ZS5xdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gcm91dGUsIHBhcmFtcywgYW5kIHF1ZXJ5IGFyZSBhY3RpdmUuXG4gICAqL1xuICBpc0FjdGl2ZTogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgaWYgKFBhdGguaXNBYnNvbHV0ZSh0bykpXG4gICAgICByZXR1cm4gdG8gPT09IHRoaXMuc3RhdGUucGF0aDtcblxuICAgIHJldHVybiByb3V0ZUlzQWN0aXZlKHRoaXMuc3RhdGUucm91dGVzLCB0bykgJiZcbiAgICAgIHBhcmFtc0FyZUFjdGl2ZSh0aGlzLnN0YXRlLnBhcmFtcywgcGFyYW1zKSAmJlxuICAgICAgKHF1ZXJ5ID09IG51bGwgfHwgcXVlcnlJc0FjdGl2ZSh0aGlzLnN0YXRlLnF1ZXJ5LCBxdWVyeSkpO1xuICB9LFxuXG4gIGNoaWxkQ29udGV4dFR5cGVzOiB7XG4gICAgZ2V0Q3VycmVudFBhdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFJvdXRlczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50UGF0aG5hbWU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFBhcmFtczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50UXVlcnk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXNBY3RpdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0Q3VycmVudFBhdGg6IHRoaXMuZ2V0Q3VycmVudFBhdGgsXG4gICAgICBnZXRDdXJyZW50Um91dGVzOiB0aGlzLmdldEN1cnJlbnRSb3V0ZXMsXG4gICAgICBnZXRDdXJyZW50UGF0aG5hbWU6IHRoaXMuZ2V0Q3VycmVudFBhdGhuYW1lLFxuICAgICAgZ2V0Q3VycmVudFBhcmFtczogdGhpcy5nZXRDdXJyZW50UGFyYW1zLFxuICAgICAgZ2V0Q3VycmVudFF1ZXJ5OiB0aGlzLmdldEN1cnJlbnRRdWVyeSxcbiAgICAgIGlzQWN0aXZlOiB0aGlzLmlzQWN0aXZlXG4gICAgfTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlQ29udGV4dDtcbiIsIi8qIGpzaGludCAtVzA1OCAqL1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG52YXIgUmVkaXJlY3QgPSByZXF1aXJlKCcuL1JlZGlyZWN0Jyk7XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGEgdHJhbnNpdGlvbiB0byBhIGdpdmVuIHBhdGguXG4gKlxuICogVGhlIHdpbGxUcmFuc2l0aW9uVG8gYW5kIHdpbGxUcmFuc2l0aW9uRnJvbSBoYW5kbGVycyByZWNlaXZlXG4gKiBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGFzIHRoZWlyIGZpcnN0IGFyZ3VtZW50LlxuICovXG5mdW5jdGlvbiBUcmFuc2l0aW9uKHBhdGgsIHJldHJ5KSB7XG4gIHRoaXMucGF0aCA9IHBhdGg7XG4gIHRoaXMuYWJvcnRSZWFzb24gPSBudWxsO1xuICB0aGlzLnJldHJ5ID0gcmV0cnkuYmluZCh0aGlzKTtcbn1cblxuYXNzaWduKFRyYW5zaXRpb24ucHJvdG90eXBlLCB7XG5cbiAgYWJvcnQ6IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICBpZiAodGhpcy5hYm9ydFJlYXNvbiA9PSBudWxsKVxuICAgICAgdGhpcy5hYm9ydFJlYXNvbiA9IHJlYXNvbiB8fCAnQUJPUlQnO1xuICB9LFxuXG4gIHJlZGlyZWN0OiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICB0aGlzLmFib3J0KG5ldyBSZWRpcmVjdCh0bywgcGFyYW1zLCBxdWVyeSkpO1xuICB9LFxuXG4gIGZyb206IGZ1bmN0aW9uIChyb3V0ZXMsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHJ1bkhvb2tzID0gcm91dGVzLnJlZHVjZShmdW5jdGlvbiAoY2FsbGJhY2ssIHJvdXRlLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgfHwgc2VsZi5hYm9ydFJlYXNvbikge1xuICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3V0ZS53aWxsVHJhbnNpdGlvbkZyb20pIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcm91dGUud2lsbFRyYW5zaXRpb25Gcm9tKHNlbGYsIGNvbXBvbmVudHNbaW5kZXhdLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhbGxiYWNrIGluIHRoZSBhcmd1bWVudCBsaXN0LCBjYWxsIGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICAgICAgICBpZiAocm91dGUud2lsbFRyYW5zaXRpb25Gcm9tLmxlbmd0aCA8IDMpXG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgY2FsbGJhY2spO1xuXG4gICAgcnVuSG9va3MoKTtcbiAgfSxcblxuICB0bzogZnVuY3Rpb24gKHJvdXRlcywgcGFyYW1zLCBxdWVyeSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcnVuSG9va3MgPSByb3V0ZXMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNhbGxiYWNrLCByb3V0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgfHwgc2VsZi5hYm9ydFJlYXNvbikge1xuICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3V0ZS53aWxsVHJhbnNpdGlvblRvKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJvdXRlLndpbGxUcmFuc2l0aW9uVG8oc2VsZiwgcGFyYW1zLCBxdWVyeSwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBjYWxsYmFjayBpbiB0aGUgYXJndW1lbnQgbGlzdCwgY2FsbCBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgICAgaWYgKHJvdXRlLndpbGxUcmFuc2l0aW9uVG8ubGVuZ3RoIDwgNClcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCBjYWxsYmFjayk7XG5cbiAgICBydW5Ib29rcygpO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zaXRpb247XG4iLCIvKipcbiAqIEFjdGlvbnMgdGhhdCBtb2RpZnkgdGhlIFVSTC5cbiAqL1xudmFyIExvY2F0aW9uQWN0aW9ucyA9IHtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGEgbmV3IGxvY2F0aW9uIGlzIGJlaW5nIHB1c2hlZCB0byB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIFBVU0g6ICdwdXNoJyxcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSBjdXJyZW50IGxvY2F0aW9uIHNob3VsZCBiZSByZXBsYWNlZC5cbiAgICovXG4gIFJFUExBQ0U6ICdyZXBsYWNlJyxcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSBtb3N0IHJlY2VudCBlbnRyeSBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgUE9QOiAncG9wJ1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2F0aW9uQWN0aW9ucztcbiIsInZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9ucycpO1xuXG4vKipcbiAqIEEgc2Nyb2xsIGJlaGF2aW9yIHRoYXQgYXR0ZW1wdHMgdG8gaW1pdGF0ZSB0aGUgZGVmYXVsdCBiZWhhdmlvclxuICogb2YgbW9kZXJuIGJyb3dzZXJzLlxuICovXG52YXIgSW1pdGF0ZUJyb3dzZXJCZWhhdmlvciA9IHtcblxuICB1cGRhdGVTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKHBvc2l0aW9uLCBhY3Rpb25UeXBlKSB7XG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XG4gICAgICBjYXNlIExvY2F0aW9uQWN0aW9ucy5QVVNIOlxuICAgICAgY2FzZSBMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRTpcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9jYXRpb25BY3Rpb25zLlBPUDpcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbWl0YXRlQnJvd3NlckJlaGF2aW9yO1xuIiwiLyoqXG4gKiBBIHNjcm9sbCBiZWhhdmlvciB0aGF0IGFsd2F5cyBzY3JvbGxzIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2VcbiAqIGFmdGVyIGEgdHJhbnNpdGlvbi5cbiAqL1xudmFyIFNjcm9sbFRvVG9wQmVoYXZpb3IgPSB7XG5cbiAgdXBkYXRlU2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxUb1RvcEJlaGF2aW9yO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb25maWd1cmF0aW9uID0gcmVxdWlyZSgnLi4vQ29uZmlndXJhdGlvbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4uL1Byb3BUeXBlcycpO1xuXG4vKipcbiAqIEEgPERlZmF1bHRSb3V0ZT4gY29tcG9uZW50IGlzIGEgc3BlY2lhbCBraW5kIG9mIDxSb3V0ZT4gdGhhdFxuICogcmVuZGVycyB3aGVuIGl0cyBwYXJlbnQgbWF0Y2hlcyBidXQgbm9uZSBvZiBpdHMgc2libGluZ3MgZG8uXG4gKiBPbmx5IG9uZSBzdWNoIHJvdXRlIG1heSBiZSB1c2VkIGF0IGFueSBnaXZlbiBsZXZlbCBpbiB0aGVcbiAqIHJvdXRlIGhpZXJhcmNoeS5cbiAqL1xudmFyIERlZmF1bHRSb3V0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBkaXNwbGF5TmFtZTogJ0RlZmF1bHRSb3V0ZScsXG5cbiAgbWl4aW5zOiBbIENvbmZpZ3VyYXRpb24gXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBhdGg6IFByb3BUeXBlcy5mYWxzeSxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmZhbHN5LFxuICAgIGhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZWZhdWx0Um91dGU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGNsYXNzU2V0ID0gcmVxdWlyZSgncmVhY3QvbGliL2N4Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbnZhciBOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi4vTmF2aWdhdGlvbicpO1xudmFyIFN0YXRlID0gcmVxdWlyZSgnLi4vU3RhdGUnKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuLi9Qcm9wVHlwZXMnKTtcblxuZnVuY3Rpb24gaXNMZWZ0Q2xpY2tFdmVudChldmVudCkge1xuICByZXR1cm4gZXZlbnQuYnV0dG9uID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuICEhKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpO1xufVxuXG4vKipcbiAqIDxMaW5rPiBjb21wb25lbnRzIGFyZSB1c2VkIHRvIGNyZWF0ZSBhbiA8YT4gZWxlbWVudCB0aGF0IGxpbmtzIHRvIGEgcm91dGUuXG4gKiBXaGVuIHRoYXQgcm91dGUgaXMgYWN0aXZlLCB0aGUgbGluayBnZXRzIGFuIFwiYWN0aXZlXCIgY2xhc3MgbmFtZSAob3IgdGhlXG4gKiB2YWx1ZSBvZiBpdHMgYGFjdGl2ZUNsYXNzTmFtZWAgcHJvcCkuXG4gKlxuICogRm9yIGV4YW1wbGUsIGFzc3VtaW5nIHlvdSBoYXZlIHRoZSBmb2xsb3dpbmcgcm91dGU6XG4gKlxuICogICA8Um91dGUgbmFtZT1cInNob3dQb3N0XCIgcGF0aD1cIi9wb3N0cy86cG9zdElEXCIgaGFuZGxlcj17UG9zdH0vPlxuICpcbiAqIFlvdSBjb3VsZCB1c2UgdGhlIGZvbGxvd2luZyBjb21wb25lbnQgdG8gbGluayB0byB0aGF0IHJvdXRlOlxuICpcbiAqICAgPExpbmsgdG89XCJzaG93UG9zdFwiIHBhcmFtcz17eyBwb3N0SUQ6IFwiMTIzXCIgfX0gLz5cbiAqXG4gKiBJbiBhZGRpdGlvbiB0byBwYXJhbXMsIGxpbmtzIG1heSBwYXNzIGFsb25nIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzXG4gKiB1c2luZyB0aGUgYHF1ZXJ5YCBwcm9wLlxuICpcbiAqICAgPExpbmsgdG89XCJzaG93UG9zdFwiIHBhcmFtcz17eyBwb3N0SUQ6IFwiMTIzXCIgfX0gcXVlcnk9e3sgc2hvdzp0cnVlIH19Lz5cbiAqL1xudmFyIExpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZGlzcGxheU5hbWU6ICdMaW5rJyxcblxuICBtaXhpbnM6IFsgTmF2aWdhdGlvbiwgU3RhdGUgXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBhY3RpdmVDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB0bzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBxdWVyeTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuY1xuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmVDbGFzc05hbWU6ICdhY3RpdmUnXG4gICAgfTtcbiAgfSxcblxuICBoYW5kbGVDbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGFsbG93VHJhbnNpdGlvbiA9IHRydWU7XG4gICAgdmFyIGNsaWNrUmVzdWx0O1xuXG4gICAgaWYgKHRoaXMucHJvcHMub25DbGljaylcbiAgICAgIGNsaWNrUmVzdWx0ID0gdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcblxuICAgIGlmIChpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHx8ICFpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmIChjbGlja1Jlc3VsdCA9PT0gZmFsc2UgfHwgZXZlbnQuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSlcbiAgICAgIGFsbG93VHJhbnNpdGlvbiA9IGZhbHNlO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChhbGxvd1RyYW5zaXRpb24pXG4gICAgICB0aGlzLnRyYW5zaXRpb25Ubyh0aGlzLnByb3BzLnRvLCB0aGlzLnByb3BzLnBhcmFtcywgdGhpcy5wcm9wcy5xdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBcImhyZWZcIiBhdHRyaWJ1dGUgdG8gdXNlIG9uIHRoZSBET00gZWxlbWVudC5cbiAgICovXG4gIGdldEhyZWY6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tYWtlSHJlZih0aGlzLnByb3BzLnRvLCB0aGlzLnByb3BzLnBhcmFtcywgdGhpcy5wcm9wcy5xdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBcImNsYXNzXCIgYXR0cmlidXRlIHRvIHVzZSBvbiB0aGUgRE9NIGVsZW1lbnQsIHdoaWNoIGNvbnRhaW5zXG4gICAqIHRoZSB2YWx1ZSBvZiB0aGUgYWN0aXZlQ2xhc3NOYW1lIHByb3BlcnR5IHdoZW4gdGhpcyA8TGluaz4gaXMgYWN0aXZlLlxuICAgKi9cbiAgZ2V0Q2xhc3NOYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNsYXNzTmFtZXMgPSB7fTtcblxuICAgIGlmICh0aGlzLnByb3BzLmNsYXNzTmFtZSlcbiAgICAgIGNsYXNzTmFtZXNbdGhpcy5wcm9wcy5jbGFzc05hbWVdID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmlzQWN0aXZlKHRoaXMucHJvcHMudG8sIHRoaXMucHJvcHMucGFyYW1zLCB0aGlzLnByb3BzLnF1ZXJ5KSlcbiAgICAgIGNsYXNzTmFtZXNbdGhpcy5wcm9wcy5hY3RpdmVDbGFzc05hbWVdID0gdHJ1ZTtcblxuICAgIHJldHVybiBjbGFzc1NldChjbGFzc05hbWVzKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvcHMgPSBhc3NpZ24oe30sIHRoaXMucHJvcHMsIHtcbiAgICAgIGhyZWY6IHRoaXMuZ2V0SHJlZigpLFxuICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzTmFtZSgpLFxuICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJlYWN0LkRPTS5hKHByb3BzLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5rO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb25maWd1cmF0aW9uID0gcmVxdWlyZSgnLi4vQ29uZmlndXJhdGlvbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4uL1Byb3BUeXBlcycpO1xuXG4vKipcbiAqIEEgPE5vdEZvdW5kUm91dGU+IGlzIGEgc3BlY2lhbCBraW5kIG9mIDxSb3V0ZT4gdGhhdFxuICogcmVuZGVycyB3aGVuIHRoZSBiZWdpbm5pbmcgb2YgaXRzIHBhcmVudCdzIHBhdGggbWF0Y2hlc1xuICogYnV0IG5vbmUgb2YgaXRzIHNpYmxpbmdzIGRvLCBpbmNsdWRpbmcgYW55IDxEZWZhdWx0Um91dGU+LlxuICogT25seSBvbmUgc3VjaCByb3V0ZSBtYXkgYmUgdXNlZCBhdCBhbnkgZ2l2ZW4gbGV2ZWwgaW4gdGhlXG4gKiByb3V0ZSBoaWVyYXJjaHkuXG4gKi9cbnZhciBOb3RGb3VuZFJvdXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGRpc3BsYXlOYW1lOiAnTm90Rm91bmRSb3V0ZScsXG5cbiAgbWl4aW5zOiBbIENvbmZpZ3VyYXRpb24gXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBhdGg6IFByb3BUeXBlcy5mYWxzeSxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmZhbHN5LFxuICAgIGhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb3RGb3VuZFJvdXRlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb25maWd1cmF0aW9uID0gcmVxdWlyZSgnLi4vQ29uZmlndXJhdGlvbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4uL1Byb3BUeXBlcycpO1xuXG4vKipcbiAqIEEgPFJlZGlyZWN0PiBjb21wb25lbnQgaXMgYSBzcGVjaWFsIGtpbmQgb2YgPFJvdXRlPiB0aGF0IGFsd2F5c1xuICogcmVkaXJlY3RzIHRvIGFub3RoZXIgcm91dGUgd2hlbiBpdCBtYXRjaGVzLlxuICovXG52YXIgUmVkaXJlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZGlzcGxheU5hbWU6ICdSZWRpcmVjdCcsXG5cbiAgbWl4aW5zOiBbIENvbmZpZ3VyYXRpb24gXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZyb206IFByb3BUeXBlcy5zdHJpbmcsIC8vIEFsaWFzIGZvciBwYXRoLlxuICAgIHRvOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhhbmRsZXI6IFByb3BUeXBlcy5mYWxzeVxuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZGlyZWN0O1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDb25maWd1cmF0aW9uID0gcmVxdWlyZSgnLi4vQ29uZmlndXJhdGlvbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4uL1Byb3BUeXBlcycpO1xudmFyIFJvdXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vUm91dGVIYW5kbGVyJyk7XG4vKipcbiAqIDxSb3V0ZT4gY29tcG9uZW50cyBzcGVjaWZ5IGNvbXBvbmVudHMgdGhhdCBhcmUgcmVuZGVyZWQgdG8gdGhlIHBhZ2Ugd2hlbiB0aGVcbiAqIFVSTCBtYXRjaGVzIGEgZ2l2ZW4gcGF0dGVybi5cbiAqXG4gKiBSb3V0ZXMgYXJlIGFycmFuZ2VkIGluIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlLiBXaGVuIGEgbmV3IFVSTCBpcyByZXF1ZXN0ZWQsXG4gKiB0aGUgdHJlZSBpcyBzZWFyY2hlZCBkZXB0aC1maXJzdCB0byBmaW5kIGEgcm91dGUgd2hvc2UgcGF0aCBtYXRjaGVzIHRoZSBVUkwuXG4gKiBXaGVuIG9uZSBpcyBmb3VuZCwgYWxsIHJvdXRlcyBpbiB0aGUgdHJlZSB0aGF0IGxlYWQgdG8gaXQgYXJlIGNvbnNpZGVyZWRcbiAqIFwiYWN0aXZlXCIgYW5kIHRoZWlyIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIGludG8gdGhlIERPTSwgbmVzdGVkIGluIHRoZSBzYW1lXG4gKiBvcmRlciBhcyB0aGV5IGFyZSBpbiB0aGUgdHJlZS5cbiAqXG4gKiBUaGUgcHJlZmVycmVkIHdheSB0byBjb25maWd1cmUgYSByb3V0ZXIgaXMgdXNpbmcgSlNYLiBUaGUgWE1MLWxpa2Ugc3ludGF4IGlzXG4gKiBhIGdyZWF0IHdheSB0byB2aXN1YWxpemUgaG93IHJvdXRlcyBhcmUgbGFpZCBvdXQgaW4gYW4gYXBwbGljYXRpb24uXG4gKlxuICogICB2YXIgcm91dGVzID0gW1xuICogICAgIDxSb3V0ZSBoYW5kbGVyPXtBcHB9PlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJsb2dpblwiIGhhbmRsZXI9e0xvZ2lufS8+XG4gKiAgICAgICA8Um91dGUgbmFtZT1cImxvZ291dFwiIGhhbmRsZXI9e0xvZ291dH0vPlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJhYm91dFwiIGhhbmRsZXI9e0Fib3V0fS8+XG4gKiAgICAgPC9Sb3V0ZT5cbiAqICAgXTtcbiAqICAgXG4gKiAgIFJvdXRlci5ydW4ocm91dGVzLCBmdW5jdGlvbiAoSGFuZGxlcikge1xuICogICAgIFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5ib2R5KTtcbiAqICAgfSk7XG4gKlxuICogSGFuZGxlcnMgZm9yIFJvdXRlIGNvbXBvbmVudHMgdGhhdCBjb250YWluIGNoaWxkcmVuIGNhbiByZW5kZXIgdGhlaXIgYWN0aXZlXG4gKiBjaGlsZCByb3V0ZSB1c2luZyBhIDxSb3V0ZUhhbmRsZXI+IGVsZW1lbnQuXG4gKlxuICogICB2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICogICAgICAgcmV0dXJuIChcbiAqICAgICAgICAgPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uXCI+XG4gKiAgICAgICAgICAgPFJvdXRlSGFuZGxlci8+XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIElmIG5vIGhhbmRsZXIgaXMgcHJvdmlkZWQgZm9yIHRoZSByb3V0ZSwgaXQgd2lsbCByZW5kZXIgYSBtYXRjaGVkIGNoaWxkIHJvdXRlLlxuICovXG52YXIgUm91dGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZGlzcGxheU5hbWU6ICdSb3V0ZScsXG5cbiAgbWl4aW5zOiBbIENvbmZpZ3VyYXRpb24gXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWdub3JlU2Nyb2xsQmVoYXZpb3I6IFByb3BUeXBlcy5ib29sXG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICBoYW5kbGVyOiBSb3V0ZUhhbmRsZXJcbiAgICB9O1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZUhhbmRsZXJNaXhpbiA9IHJlcXVpcmUoJy4uL1JvdXRlSGFuZGxlck1peGluJyk7XG5cbi8qKlxuICogQSA8Um91dGVIYW5kbGVyPiBjb21wb25lbnQgcmVuZGVycyB0aGUgYWN0aXZlIGNoaWxkIHJvdXRlIGhhbmRsZXJcbiAqIHdoZW4gcm91dGVzIGFyZSBuZXN0ZWQuXG4gKi9cbnZhciBSb3V0ZUhhbmRsZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZGlzcGxheU5hbWU6ICdSb3V0ZUhhbmRsZXInLFxuXG4gIG1peGluczogWyBSb3V0ZUhhbmRsZXJNaXhpbiBdLFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNoaWxkUm91dGVIYW5kbGVyKCk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVIYW5kbGVyO1xuIiwiLyoganNoaW50IC1XMDU4ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdyZWFjdC9saWIvd2FybmluZycpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKS5jYW5Vc2VET007XG52YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9ucycpO1xudmFyIEltaXRhdGVCcm93c2VyQmVoYXZpb3IgPSByZXF1aXJlKCcuL2JlaGF2aW9ycy9JbWl0YXRlQnJvd3NlckJlaGF2aW9yJyk7XG52YXIgSGFzaExvY2F0aW9uID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvSGFzaExvY2F0aW9uJyk7XG52YXIgSGlzdG9yeUxvY2F0aW9uID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvSGlzdG9yeUxvY2F0aW9uJyk7XG52YXIgUmVmcmVzaExvY2F0aW9uID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvUmVmcmVzaExvY2F0aW9uJyk7XG52YXIgTmF2aWdhdGlvbkNvbnRleHQgPSByZXF1aXJlKCcuL05hdmlnYXRpb25Db250ZXh0Jyk7XG52YXIgU3RhdGVDb250ZXh0ID0gcmVxdWlyZSgnLi9TdGF0ZUNvbnRleHQnKTtcbnZhciBTY3JvbGxpbmcgPSByZXF1aXJlKCcuL1Njcm9sbGluZycpO1xudmFyIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuID0gcmVxdWlyZSgnLi9Sb3V0aW5nJykuY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW47XG52YXIgaXNSZWFjdENoaWxkcmVuID0gcmVxdWlyZSgnLi9pc1JlYWN0Q2hpbGRyZW4nKTtcbnZhciBUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9UcmFuc2l0aW9uJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9Qcm9wVHlwZXMnKTtcbnZhciBSZWRpcmVjdCA9IHJlcXVpcmUoJy4vUmVkaXJlY3QnKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZSgnLi9IaXN0b3J5Jyk7XG52YXIgQ2FuY2VsbGF0aW9uID0gcmVxdWlyZSgnLi9DYW5jZWxsYXRpb24nKTtcbnZhciBzdXBwb3J0c0hpc3RvcnkgPSByZXF1aXJlKCcuL3V0aWxzL3N1cHBvcnRzSGlzdG9yeScpO1xudmFyIFBhdGggPSByZXF1aXJlKCcuL3V0aWxzL1BhdGgnKTtcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBsb2NhdGlvbiBmb3IgbmV3IHJvdXRlcnMuXG4gKi9cbnZhciBERUZBVUxUX0xPQ0FUSU9OID0gY2FuVXNlRE9NID8gSGFzaExvY2F0aW9uIDogJy8nO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHNjcm9sbCBiZWhhdmlvciBmb3IgbmV3IHJvdXRlcnMuXG4gKi9cbnZhciBERUZBVUxUX1NDUk9MTF9CRUhBVklPUiA9IGNhblVzZURPTSA/IEltaXRhdGVCcm93c2VyQmVoYXZpb3IgOiBudWxsO1xuXG5mdW5jdGlvbiBjcmVhdGVNYXRjaChyb3V0ZSwgcGFyYW1zLCBwYXRobmFtZSwgcXVlcnkpIHtcbiAgcmV0dXJuIHtcbiAgICByb3V0ZXM6IFsgcm91dGUgXSxcbiAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgcXVlcnk6IHF1ZXJ5XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRNYXRjaChyb3V0ZXMsIGRlZmF1bHRSb3V0ZSwgbm90Rm91bmRSb3V0ZSwgcGF0aG5hbWUsIHF1ZXJ5KSB7XG4gIHZhciByb3V0ZSwgbWF0Y2gsIHBhcmFtcztcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcm91dGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcm91dGUgPSByb3V0ZXNbaV07XG5cbiAgICAvLyBDaGVjayB0aGUgc3VidHJlZSBmaXJzdCB0byBmaW5kIHRoZSBtb3N0IGRlZXBseS1uZXN0ZWQgbWF0Y2guXG4gICAgbWF0Y2ggPSBmaW5kTWF0Y2gocm91dGUucm91dGVzLCByb3V0ZS5kZWZhdWx0Um91dGUsIHJvdXRlLm5vdEZvdW5kUm91dGUsIHBhdGhuYW1lLCBxdWVyeSk7XG5cbiAgICBpZiAobWF0Y2ggIT0gbnVsbCkge1xuICAgICAgbWF0Y2gucm91dGVzLnVuc2hpZnQocm91dGUpO1xuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cblxuICAgIC8vIE5vIHJvdXRlcyBpbiB0aGUgc3VidHJlZSBtYXRjaGVkLCBzbyBjaGVjayB0aGlzIHJvdXRlLlxuICAgIHBhcmFtcyA9IFBhdGguZXh0cmFjdFBhcmFtcyhyb3V0ZS5wYXRoLCBwYXRobmFtZSk7XG5cbiAgICBpZiAocGFyYW1zKVxuICAgICAgcmV0dXJuIGNyZWF0ZU1hdGNoKHJvdXRlLCBwYXJhbXMsIHBhdGhuYW1lLCBxdWVyeSk7XG4gIH1cblxuICAvLyBObyByb3V0ZXMgbWF0Y2hlZCwgc28gdHJ5IHRoZSBkZWZhdWx0IHJvdXRlIGlmIHRoZXJlIGlzIG9uZS5cbiAgaWYgKGRlZmF1bHRSb3V0ZSAmJiAocGFyYW1zID0gUGF0aC5leHRyYWN0UGFyYW1zKGRlZmF1bHRSb3V0ZS5wYXRoLCBwYXRobmFtZSkpKVxuICAgIHJldHVybiBjcmVhdGVNYXRjaChkZWZhdWx0Um91dGUsIHBhcmFtcywgcGF0aG5hbWUsIHF1ZXJ5KTtcblxuICAvLyBMYXN0IGF0dGVtcHQ6IGRvZXMgdGhlIFwibm90IGZvdW5kXCIgcm91dGUgbWF0Y2g/XG4gIGlmIChub3RGb3VuZFJvdXRlICYmIChwYXJhbXMgPSBQYXRoLmV4dHJhY3RQYXJhbXMobm90Rm91bmRSb3V0ZS5wYXRoLCBwYXRobmFtZSkpKVxuICAgIHJldHVybiBjcmVhdGVNYXRjaChub3RGb3VuZFJvdXRlLCBwYXJhbXMsIHBhdGhuYW1lLCBxdWVyeSk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGhhc1Byb3BlcnRpZXMob2JqZWN0LCBwcm9wZXJ0aWVzKSB7XG4gIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKVxuICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiYgb2JqZWN0W3Byb3BlcnR5TmFtZV0gIT09IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGFzTWF0Y2gocm91dGVzLCByb3V0ZSwgcHJldlBhcmFtcywgbmV4dFBhcmFtcywgcHJldlF1ZXJ5LCBuZXh0UXVlcnkpIHtcbiAgcmV0dXJuIHJvdXRlcy5zb21lKGZ1bmN0aW9uIChyKSB7XG4gICAgaWYgKHIgIT09IHJvdXRlKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHBhcmFtTmFtZXMgPSByb3V0ZS5wYXJhbU5hbWVzO1xuICAgIHZhciBwYXJhbU5hbWU7XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBhbGwgcGFyYW1zIHRoZSByb3V0ZSBjYXJlcyBhYm91dCBkaWQgbm90IGNoYW5nZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFyYW1OYW1lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgcGFyYW1OYW1lID0gcGFyYW1OYW1lc1tpXTtcblxuICAgICAgaWYgKG5leHRQYXJhbXNbcGFyYW1OYW1lXSAhPT0gcHJldlBhcmFtc1twYXJhbU5hbWVdKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoZSBxdWVyeSBoYXNuJ3QgY2hhbmdlZC5cbiAgICByZXR1cm4gaGFzUHJvcGVydGllcyhwcmV2UXVlcnksIG5leHRRdWVyeSkgJiYgaGFzUHJvcGVydGllcyhuZXh0UXVlcnksIHByZXZRdWVyeSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgcm91dGVyIHVzaW5nIHRoZSBnaXZlbiBvcHRpb25zLiBBIHJvdXRlclxuICogaXMgYSBSZWFjdENvbXBvbmVudCBjbGFzcyB0aGF0IGtub3dzIGhvdyB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZVxuICogVVJMIGFuZCBrZWVwIHRoZSBjb250ZW50cyBvZiB0aGUgcGFnZSBpbiBzeW5jLlxuICpcbiAqIE9wdGlvbnMgbWF5IGJlIGFueSBvZiB0aGUgZm9sbG93aW5nOlxuICpcbiAqIC0gcm91dGVzICAgICAgICAgICAocmVxdWlyZWQpIFRoZSByb3V0ZSBjb25maWdcbiAqIC0gbG9jYXRpb24gICAgICAgICBUaGUgbG9jYXRpb24gdG8gdXNlLiBEZWZhdWx0cyB0byBIYXNoTG9jYXRpb24gd2hlblxuICogICAgICAgICAgICAgICAgICAgIHRoZSBET00gaXMgYXZhaWxhYmxlLCBcIi9cIiBvdGhlcndpc2VcbiAqIC0gc2Nyb2xsQmVoYXZpb3IgICBUaGUgc2Nyb2xsIGJlaGF2aW9yIHRvIHVzZS4gRGVmYXVsdHMgdG8gSW1pdGF0ZUJyb3dzZXJCZWhhdmlvclxuICogICAgICAgICAgICAgICAgICAgIHdoZW4gdGhlIERPTSBpcyBhdmFpbGFibGUsIG51bGwgb3RoZXJ3aXNlXG4gKiAtIG9uRXJyb3IgICAgICAgICAgQSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gaGFuZGxlIGVycm9yc1xuICogLSBvbkFib3J0ICAgICAgICAgIEEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGhhbmRsZSBhYm9ydGVkIHRyYW5zaXRpb25zXG4gKlxuICogV2hlbiByZW5kZXJpbmcgaW4gYSBzZXJ2ZXItc2lkZSBlbnZpcm9ubWVudCwgdGhlIGxvY2F0aW9uIHNob3VsZCBzaW1wbHlcbiAqIGJlIHRoZSBVUkwgcGF0aCB0aGF0IHdhcyB1c2VkIGluIHRoZSByZXF1ZXN0LCBpbmNsdWRpbmcgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUm91dGVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGlzUmVhY3RDaGlsZHJlbihvcHRpb25zKSlcbiAgICBvcHRpb25zID0geyByb3V0ZXM6IG9wdGlvbnMgfTtcblxuICB2YXIgbW91bnRlZENvbXBvbmVudHMgPSBbXTtcbiAgdmFyIGxvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiB8fCBERUZBVUxUX0xPQ0FUSU9OO1xuICB2YXIgc2Nyb2xsQmVoYXZpb3IgPSBvcHRpb25zLnNjcm9sbEJlaGF2aW9yIHx8IERFRkFVTFRfU0NST0xMX0JFSEFWSU9SO1xuICB2YXIgc3RhdGUgPSB7fTtcbiAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuICB2YXIgcGVuZGluZ1RyYW5zaXRpb24gPSBudWxsO1xuICB2YXIgZGlzcGF0Y2hIYW5kbGVyID0gbnVsbDtcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykge1xuICAgIHdhcm5pbmcoXG4gICAgICAhY2FuVXNlRE9NIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcsXG4gICAgICAnWW91IHNob3VsZCBub3QgdXNlIGEgc3RhdGljIGxvY2F0aW9uIGluIGEgRE9NIGVudmlyb25tZW50IGJlY2F1c2UgJyArXG4gICAgICAndGhlIHJvdXRlciB3aWxsIG5vdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgY3VycmVudCBVUkwnXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBjYW5Vc2VET00gfHwgbG9jYXRpb24ubmVlZHNET00gPT09IGZhbHNlLFxuICAgICAgJ1lvdSBjYW5ub3QgdXNlICVzIHdpdGhvdXQgYSBET00nLFxuICAgICAgbG9jYXRpb25cbiAgICApO1xuICB9XG5cbiAgLy8gQXV0b21hdGljYWxseSBmYWxsIGJhY2sgdG8gZnVsbCBwYWdlIHJlZnJlc2hlcyBpblxuICAvLyBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgdGhlIEhUTUwgaGlzdG9yeSBBUEkuXG4gIGlmIChsb2NhdGlvbiA9PT0gSGlzdG9yeUxvY2F0aW9uICYmICFzdXBwb3J0c0hpc3RvcnkoKSlcbiAgICBsb2NhdGlvbiA9IFJlZnJlc2hMb2NhdGlvbjtcblxuICB2YXIgUm91dGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgZGlzcGxheU5hbWU6ICdSb3V0ZXInLFxuXG4gICAgc3RhdGljczoge1xuXG4gICAgICBpc1J1bm5pbmc6IGZhbHNlLFxuXG4gICAgICBjYW5jZWxQZW5kaW5nVHJhbnNpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocGVuZGluZ1RyYW5zaXRpb24pIHtcbiAgICAgICAgICBwZW5kaW5nVHJhbnNpdGlvbi5hYm9ydChuZXcgQ2FuY2VsbGF0aW9uKTtcbiAgICAgICAgICBwZW5kaW5nVHJhbnNpdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGNsZWFyQWxsUm91dGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsUGVuZGluZ1RyYW5zaXRpb24oKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0Um91dGUgPSBudWxsO1xuICAgICAgICB0aGlzLm5vdEZvdW5kUm91dGUgPSBudWxsO1xuICAgICAgICB0aGlzLm5hbWVkUm91dGVzID0ge307XG4gICAgICAgIHRoaXMucm91dGVzID0gW107XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEFkZHMgcm91dGVzIHRvIHRoaXMgcm91dGVyIGZyb20gdGhlIGdpdmVuIGNoaWxkcmVuIG9iamVjdCAoc2VlIFJlYWN0Q2hpbGRyZW4pLlxuICAgICAgICovXG4gICAgICBhZGRSb3V0ZXM6IGZ1bmN0aW9uIChyb3V0ZXMpIHtcbiAgICAgICAgaWYgKGlzUmVhY3RDaGlsZHJlbihyb3V0ZXMpKVxuICAgICAgICAgIHJvdXRlcyA9IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKHJvdXRlcywgdGhpcywgdGhpcy5uYW1lZFJvdXRlcyk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXMucHVzaC5hcHBseSh0aGlzLnJvdXRlcywgcm91dGVzKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmVwbGFjZXMgcm91dGVzIG9mIHRoaXMgcm91dGVyIGZyb20gdGhlIGdpdmVuIGNoaWxkcmVuIG9iamVjdCAoc2VlIFJlYWN0Q2hpbGRyZW4pLlxuICAgICAgICovXG4gICAgICByZXBsYWNlUm91dGVzOiBmdW5jdGlvbiAocm91dGVzKSB7XG4gICAgICAgIHRoaXMuY2xlYXJBbGxSb3V0ZXMoKTtcbiAgICAgICAgdGhpcy5hZGRSb3V0ZXMocm91dGVzKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFBlcmZvcm1zIGEgbWF0Y2ggb2YgdGhlIGdpdmVuIHBhdGggYWdhaW5zdCB0aGlzIHJvdXRlciBhbmQgcmV0dXJucyBhbiBvYmplY3RcbiAgICAgICAqIHdpdGggdGhlIHsgcm91dGVzLCBwYXJhbXMsIHBhdGhuYW1lLCBxdWVyeSB9IHRoYXQgbWF0Y2guIFJldHVybnMgbnVsbCBpZiBub1xuICAgICAgICogbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAgICAgKi9cbiAgICAgIG1hdGNoOiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gZmluZE1hdGNoKHRoaXMucm91dGVzLCB0aGlzLmRlZmF1bHRSb3V0ZSwgdGhpcy5ub3RGb3VuZFJvdXRlLCBQYXRoLndpdGhvdXRRdWVyeShwYXRoKSwgUGF0aC5leHRyYWN0UXVlcnkocGF0aCkpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGFuIGFic29sdXRlIFVSTCBwYXRoIGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW4gcm91dGVcbiAgICAgICAqIG5hbWUsIFVSTCBwYXJhbWV0ZXJzLCBhbmQgcXVlcnkuXG4gICAgICAgKi9cbiAgICAgIG1ha2VQYXRoOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgdmFyIHBhdGg7XG4gICAgICAgIGlmIChQYXRoLmlzQWJzb2x1dGUodG8pKSB7XG4gICAgICAgICAgcGF0aCA9IFBhdGgubm9ybWFsaXplKHRvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcm91dGUgPSB0aGlzLm5hbWVkUm91dGVzW3RvXTtcblxuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHJvdXRlLFxuICAgICAgICAgICAgJ1VuYWJsZSB0byBmaW5kIDxSb3V0ZSBuYW1lPVwiJXNcIj4nLFxuICAgICAgICAgICAgdG9cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcGF0aCA9IHJvdXRlLnBhdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUGF0aC53aXRoUXVlcnkoUGF0aC5pbmplY3RQYXJhbXMocGF0aCwgcGFyYW1zKSwgcXVlcnkpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgbWF5IHNhZmVseSBiZSB1c2VkIGFzIHRoZSBocmVmIG9mIGEgbGlua1xuICAgICAgICogdG8gdGhlIHJvdXRlIHdpdGggdGhlIGdpdmVuIG5hbWUsIFVSTCBwYXJhbWV0ZXJzLCBhbmQgcXVlcnkuXG4gICAgICAgKi9cbiAgICAgIG1ha2VIcmVmOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgdmFyIHBhdGggPSB0aGlzLm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIChsb2NhdGlvbiA9PT0gSGFzaExvY2F0aW9uKSA/ICcjJyArIHBhdGggOiBwYXRoO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHB1c2hpbmdcbiAgICAgICAqIGEgbmV3IFVSTCBvbnRvIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgICAgICovXG4gICAgICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgdHlwZW9mIGxvY2F0aW9uICE9PSAnc3RyaW5nJyxcbiAgICAgICAgICAnWW91IGNhbm5vdCB1c2UgdHJhbnNpdGlvblRvIHdpdGggYSBzdGF0aWMgbG9jYXRpb24nXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHBhdGggPSB0aGlzLm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcblxuICAgICAgICBpZiAocGVuZGluZ1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAvLyBSZXBsYWNlIHNvIHBlbmRpbmcgbG9jYXRpb24gZG9lcyBub3Qgc3RheSBpbiBoaXN0b3J5LlxuICAgICAgICAgIGxvY2F0aW9uLnJlcGxhY2UocGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYXRpb24ucHVzaChwYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHJlcGxhY2luZ1xuICAgICAgICogdGhlIGN1cnJlbnQgVVJMIGluIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgICAgICovXG4gICAgICByZXBsYWNlV2l0aDogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICB0eXBlb2YgbG9jYXRpb24gIT09ICdzdHJpbmcnLFxuICAgICAgICAgICdZb3UgY2Fubm90IHVzZSByZXBsYWNlV2l0aCB3aXRoIGEgc3RhdGljIGxvY2F0aW9uJ1xuICAgICAgICApO1xuXG4gICAgICAgIGxvY2F0aW9uLnJlcGxhY2UodGhpcy5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSkpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgcHJldmlvdXMgVVJMIGlmIG9uZSBpcyBhdmFpbGFibGUuIFJldHVybnMgdHJ1ZSBpZiB0aGVcbiAgICAgICAqIHJvdXRlciB3YXMgYWJsZSB0byBnbyBiYWNrLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogTm90ZTogVGhlIHJvdXRlciBvbmx5IHRyYWNrcyBoaXN0b3J5IGVudHJpZXMgaW4geW91ciBhcHBsaWNhdGlvbiwgbm90IHRoZVxuICAgICAgICogY3VycmVudCBicm93c2VyIHNlc3Npb24sIHNvIHlvdSBjYW4gc2FmZWx5IGNhbGwgdGhpcyBmdW5jdGlvbiB3aXRob3V0IGd1YXJkaW5nXG4gICAgICAgKiBhZ2FpbnN0IHNlbmRpbmcgdGhlIHVzZXIgYmFjayB0byBzb21lIG90aGVyIHNpdGUuIEhvd2V2ZXIsIHdoZW4gdXNpbmdcbiAgICAgICAqIFJlZnJlc2hMb2NhdGlvbiAod2hpY2ggaXMgdGhlIGZhbGxiYWNrIGZvciBIaXN0b3J5TG9jYXRpb24gaW4gYnJvd3NlcnMgdGhhdFxuICAgICAgICogZG9uJ3Qgc3VwcG9ydCBIVE1MNSBoaXN0b3J5KSB0aGlzIG1ldGhvZCB3aWxsICphbHdheXMqIHNlbmQgdGhlIGNsaWVudCBiYWNrXG4gICAgICAgKiBiZWNhdXNlIHdlIGNhbm5vdCByZWxpYWJseSB0cmFjayBoaXN0b3J5IGxlbmd0aC5cbiAgICAgICAqL1xuICAgICAgZ29CYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICB0eXBlb2YgbG9jYXRpb24gIT09ICdzdHJpbmcnLFxuICAgICAgICAgICdZb3UgY2Fubm90IHVzZSBnb0JhY2sgd2l0aCBhIHN0YXRpYyBsb2NhdGlvbidcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoSGlzdG9yeS5sZW5ndGggPiAxIHx8IGxvY2F0aW9uID09PSBSZWZyZXNoTG9jYXRpb24pIHtcbiAgICAgICAgICBsb2NhdGlvbi5wb3AoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdnb0JhY2soKSB3YXMgaWdub3JlZCBiZWNhdXNlIHRoZXJlIGlzIG5vIHJvdXRlciBoaXN0b3J5Jyk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcblxuICAgICAgaGFuZGxlQWJvcnQ6IG9wdGlvbnMub25BYm9ydCB8fCBmdW5jdGlvbiAoYWJvcnRSZWFzb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmhhbmRsZWQgYWJvcnRlZCB0cmFuc2l0aW9uISBSZWFzb246ICcgKyBhYm9ydFJlYXNvbik7XG5cbiAgICAgICAgaWYgKGFib3J0UmVhc29uIGluc3RhbmNlb2YgQ2FuY2VsbGF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGFib3J0UmVhc29uIGluc3RhbmNlb2YgUmVkaXJlY3QpIHtcbiAgICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKHRoaXMubWFrZVBhdGgoYWJvcnRSZWFzb24udG8sIGFib3J0UmVhc29uLnBhcmFtcywgYWJvcnRSZWFzb24ucXVlcnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbi5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgaGFuZGxlRXJyb3I6IG9wdGlvbnMub25FcnJvciB8fCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgLy8gVGhyb3cgc28gd2UgZG9uJ3Qgc2lsZW50bHkgc3dhbGxvdyBhc3luYyBlcnJvcnMuXG4gICAgICAgIHRocm93IGVycm9yOyAvLyBUaGlzIGVycm9yIHByb2JhYmx5IG9yaWdpbmF0ZWQgaW4gYSB0cmFuc2l0aW9uIGhvb2suXG4gICAgICB9LFxuXG4gICAgICBoYW5kbGVMb2NhdGlvbkNoYW5nZTogZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKGNoYW5nZS5wYXRoLCBjaGFuZ2UudHlwZSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFBlcmZvcm1zIGEgdHJhbnNpdGlvbiB0byB0aGUgZ2l2ZW4gcGF0aCBhbmQgY2FsbHMgY2FsbGJhY2soZXJyb3IsIGFib3J0UmVhc29uKVxuICAgICAgICogd2hlbiB0aGUgdHJhbnNpdGlvbiBpcyBmaW5pc2hlZC4gSWYgYm90aCBhcmd1bWVudHMgYXJlIG51bGwgdGhlIHJvdXRlcidzIHN0YXRlXG4gICAgICAgKiB3YXMgdXBkYXRlZC4gT3RoZXJ3aXNlIHRoZSB0cmFuc2l0aW9uIGRpZCBub3QgY29tcGxldGUuXG4gICAgICAgKlxuICAgICAgICogSW4gYSB0cmFuc2l0aW9uLCBhIHJvdXRlciBmaXJzdCBkZXRlcm1pbmVzIHdoaWNoIHJvdXRlcyBhcmUgaW52b2x2ZWQgYnkgYmVnaW5uaW5nXG4gICAgICAgKiB3aXRoIHRoZSBjdXJyZW50IHJvdXRlLCB1cCB0aGUgcm91dGUgdHJlZSB0byB0aGUgZmlyc3QgcGFyZW50IHJvdXRlIHRoYXQgaXMgc2hhcmVkXG4gICAgICAgKiB3aXRoIHRoZSBkZXN0aW5hdGlvbiByb3V0ZSwgYW5kIGJhY2sgZG93biB0aGUgdHJlZSB0byB0aGUgZGVzdGluYXRpb24gcm91dGUuIFRoZVxuICAgICAgICogd2lsbFRyYW5zaXRpb25Gcm9tIGhvb2sgaXMgaW52b2tlZCBvbiBhbGwgcm91dGUgaGFuZGxlcnMgd2UncmUgdHJhbnNpdGlvbmluZyBhd2F5XG4gICAgICAgKiBmcm9tLCBpbiByZXZlcnNlIG5lc3Rpbmcgb3JkZXIuIExpa2V3aXNlLCB0aGUgd2lsbFRyYW5zaXRpb25UbyBob29rIGlzIGludm9rZWQgb25cbiAgICAgICAqIGFsbCByb3V0ZSBoYW5kbGVycyB3ZSdyZSB0cmFuc2l0aW9uaW5nIHRvLlxuICAgICAgICpcbiAgICAgICAqIEJvdGggd2lsbFRyYW5zaXRpb25Gcm9tIGFuZCB3aWxsVHJhbnNpdGlvblRvIGhvb2tzIG1heSBlaXRoZXIgYWJvcnQgb3IgcmVkaXJlY3QgdGhlXG4gICAgICAgKiB0cmFuc2l0aW9uLiBUbyByZXNvbHZlIGFzeW5jaHJvbm91c2x5LCB0aGV5IG1heSB1c2UgdGhlIGNhbGxiYWNrIGFyZ3VtZW50LiBJZiBub1xuICAgICAgICogaG9va3Mgd2FpdCwgdGhlIHRyYW5zaXRpb24gaXMgZnVsbHkgc3luY2hyb25vdXMuXG4gICAgICAgKi9cbiAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAocGF0aCwgYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsUGVuZGluZ1RyYW5zaXRpb24oKTtcblxuICAgICAgICB2YXIgcHJldlBhdGggPSBzdGF0ZS5wYXRoO1xuICAgICAgICB2YXIgaXNSZWZyZXNoaW5nID0gYWN0aW9uID09IG51bGw7XG5cbiAgICAgICAgaWYgKHByZXZQYXRoID09PSBwYXRoICYmICFpc1JlZnJlc2hpbmcpXG4gICAgICAgICAgcmV0dXJuOyAvLyBOb3RoaW5nIHRvIGRvIVxuXG4gICAgICAgIC8vIFJlY29yZCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFzIGVhcmx5IGFzIHBvc3NpYmxlIHRvXG4gICAgICAgIC8vIGdldCBpdCBiZWZvcmUgYnJvd3NlcnMgdHJ5IHVwZGF0ZSBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICBpZiAocHJldlBhdGggJiYgYWN0aW9uID09PSBMb2NhdGlvbkFjdGlvbnMuUFVTSClcbiAgICAgICAgICB0aGlzLnJlY29yZFNjcm9sbFBvc2l0aW9uKHByZXZQYXRoKTtcblxuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLm1hdGNoKHBhdGgpO1xuXG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgbWF0Y2ggIT0gbnVsbCxcbiAgICAgICAgICAnTm8gcm91dGUgbWF0Y2hlcyBwYXRoIFwiJXNcIi4gTWFrZSBzdXJlIHlvdSBoYXZlIDxSb3V0ZSBwYXRoPVwiJXNcIj4gc29tZXdoZXJlIGluIHlvdXIgcm91dGVzJyxcbiAgICAgICAgICBwYXRoLCBwYXRoXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKG1hdGNoID09IG51bGwpXG4gICAgICAgICAgbWF0Y2ggPSB7fTtcblxuICAgICAgICB2YXIgcHJldlJvdXRlcyA9IHN0YXRlLnJvdXRlcyB8fCBbXTtcbiAgICAgICAgdmFyIHByZXZQYXJhbXMgPSBzdGF0ZS5wYXJhbXMgfHwge307XG4gICAgICAgIHZhciBwcmV2UXVlcnkgPSBzdGF0ZS5xdWVyeSB8fCB7fTtcblxuICAgICAgICB2YXIgbmV4dFJvdXRlcyA9IG1hdGNoLnJvdXRlcyB8fCBbXTtcbiAgICAgICAgdmFyIG5leHRQYXJhbXMgPSBtYXRjaC5wYXJhbXMgfHwge307XG4gICAgICAgIHZhciBuZXh0UXVlcnkgPSBtYXRjaC5xdWVyeSB8fCB7fTtcblxuICAgICAgICB2YXIgZnJvbVJvdXRlcywgdG9Sb3V0ZXM7XG4gICAgICAgIGlmIChwcmV2Um91dGVzLmxlbmd0aCkge1xuICAgICAgICAgIGZyb21Sb3V0ZXMgPSBwcmV2Um91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgIHJldHVybiAhaGFzTWF0Y2gobmV4dFJvdXRlcywgcm91dGUsIHByZXZQYXJhbXMsIG5leHRQYXJhbXMsIHByZXZRdWVyeSwgbmV4dFF1ZXJ5KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRvUm91dGVzID0gbmV4dFJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gIWhhc01hdGNoKHByZXZSb3V0ZXMsIHJvdXRlLCBwcmV2UGFyYW1zLCBuZXh0UGFyYW1zLCBwcmV2UXVlcnksIG5leHRRdWVyeSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJvbVJvdXRlcyA9IFtdO1xuICAgICAgICAgIHRvUm91dGVzID0gbmV4dFJvdXRlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0gbmV3IFRyYW5zaXRpb24ocGF0aCwgdGhpcy5yZXBsYWNlV2l0aC5iaW5kKHRoaXMsIHBhdGgpKTtcbiAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuXG4gICAgICAgIHZhciBmcm9tQ29tcG9uZW50cyA9IG1vdW50ZWRDb21wb25lbnRzLnNsaWNlKHByZXZSb3V0ZXMubGVuZ3RoIC0gZnJvbVJvdXRlcy5sZW5ndGgpO1xuXG4gICAgICAgIHRyYW5zaXRpb24uZnJvbShmcm9tUm91dGVzLCBmcm9tQ29tcG9uZW50cywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIHx8IHRyYW5zaXRpb24uYWJvcnRSZWFzb24pXG4gICAgICAgICAgICByZXR1cm4gZGlzcGF0Y2hIYW5kbGVyLmNhbGwoUm91dGVyLCBlcnJvciwgdHJhbnNpdGlvbik7IC8vIE5vIG5lZWQgdG8gY29udGludWUuXG5cbiAgICAgICAgICB0cmFuc2l0aW9uLnRvKHRvUm91dGVzLCBuZXh0UGFyYW1zLCBuZXh0UXVlcnksIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgZGlzcGF0Y2hIYW5kbGVyLmNhbGwoUm91dGVyLCBlcnJvciwgdHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgICAgcGF0aG5hbWU6IG1hdGNoLnBhdGhuYW1lLFxuICAgICAgICAgICAgICByb3V0ZXM6IG5leHRSb3V0ZXMsXG4gICAgICAgICAgICAgIHBhcmFtczogbmV4dFBhcmFtcyxcbiAgICAgICAgICAgICAgcXVlcnk6IG5leHRRdWVyeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBTdGFydHMgdGhpcyByb3V0ZXIgYW5kIGNhbGxzIGNhbGxiYWNrKHJvdXRlciwgc3RhdGUpIHdoZW4gdGhlIHJvdXRlIGNoYW5nZXMuXG4gICAgICAgKlxuICAgICAgICogSWYgdGhlIHJvdXRlcidzIGxvY2F0aW9uIGlzIHN0YXRpYyAoaS5lLiBhIFVSTCBwYXRoIGluIGEgc2VydmVyIGVudmlyb25tZW50KVxuICAgICAgICogdGhlIGNhbGxiYWNrIGlzIGNhbGxlZCBvbmx5IG9uY2UuIE90aGVyd2lzZSwgdGhlIGxvY2F0aW9uIHNob3VsZCBiZSBvbmUgb2YgdGhlXG4gICAgICAgKiBSb3V0ZXIuKkxvY2F0aW9uIG9iamVjdHMgKGUuZy4gUm91dGVyLkhhc2hMb2NhdGlvbiBvciBSb3V0ZXIuSGlzdG9yeUxvY2F0aW9uKS5cbiAgICAgICAqL1xuICAgICAgcnVuOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICF0aGlzLmlzUnVubmluZyxcbiAgICAgICAgICAnUm91dGVyIGlzIGFscmVhZHkgcnVubmluZydcbiAgICAgICAgKTtcblxuICAgICAgICBkaXNwYXRjaEhhbmRsZXIgPSBmdW5jdGlvbiAoZXJyb3IsIHRyYW5zaXRpb24sIG5ld1N0YXRlKSB7XG4gICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgUm91dGVyLmhhbmRsZUVycm9yKGVycm9yKTtcblxuICAgICAgICAgIGlmIChwZW5kaW5nVHJhbnNpdGlvbiAhPT0gdHJhbnNpdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uID0gbnVsbDtcblxuICAgICAgICAgIGlmICh0cmFuc2l0aW9uLmFib3J0UmVhc29uKSB7XG4gICAgICAgICAgICBSb3V0ZXIuaGFuZGxlQWJvcnQodHJhbnNpdGlvbi5hYm9ydFJlYXNvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdGhpcywgbmV4dFN0YXRlID0gbmV3U3RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIFJvdXRlci5kaXNwYXRjaChsb2NhdGlvbiwgbnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGxvY2F0aW9uLmFkZENoYW5nZUxpc3RlbmVyKVxuICAgICAgICAgICAgbG9jYXRpb24uYWRkQ2hhbmdlTGlzdGVuZXIoUm91dGVyLmhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcblxuICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIEJvb3RzdHJhcCB1c2luZyB0aGUgY3VycmVudCBwYXRoLlxuICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFJvdXRlci5kaXNwYXRjaChsb2NhdGlvbi5nZXRDdXJyZW50UGF0aCgpLCBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpO1xuXG4gICAgICAgIGlmIChsb2NhdGlvbi5yZW1vdmVDaGFuZ2VMaXN0ZW5lcilcbiAgICAgICAgICBsb2NhdGlvbi5yZW1vdmVDaGFuZ2VMaXN0ZW5lcihSb3V0ZXIuaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWl4aW5zOiBbIE5hdmlnYXRpb25Db250ZXh0LCBTdGF0ZUNvbnRleHQsIFNjcm9sbGluZyBdLFxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmZhbHN5XG4gICAgfSxcblxuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB7XG4gICAgICBnZXRSb3V0ZUF0RGVwdGg6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBzZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGg6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICByb3V0ZUhhbmRsZXJzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICAgIH0sXG5cbiAgICBnZXRDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldFJvdXRlQXREZXB0aDogdGhpcy5nZXRSb3V0ZUF0RGVwdGgsXG4gICAgICAgIHNldFJvdXRlQ29tcG9uZW50QXREZXB0aDogdGhpcy5zZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGgsXG4gICAgICAgIHJvdXRlSGFuZGxlcnM6IFsgdGhpcyBdXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAoc3RhdGUgPSBuZXh0U3RhdGUpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0gbmV4dFN0YXRlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIFJvdXRlci5zdG9wKCk7XG4gICAgfSxcblxuICAgIGdldExvY2F0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfSxcblxuICAgIGdldFNjcm9sbEJlaGF2aW9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc2Nyb2xsQmVoYXZpb3I7XG4gICAgfSxcblxuICAgIGdldFJvdXRlQXREZXB0aDogZnVuY3Rpb24gKGRlcHRoKSB7XG4gICAgICB2YXIgcm91dGVzID0gdGhpcy5zdGF0ZS5yb3V0ZXM7XG4gICAgICByZXR1cm4gcm91dGVzICYmIHJvdXRlc1tkZXB0aF07XG4gICAgfSxcblxuICAgIHNldFJvdXRlQ29tcG9uZW50QXREZXB0aDogZnVuY3Rpb24gKGRlcHRoLCBjb21wb25lbnQpIHtcbiAgICAgIG1vdW50ZWRDb21wb25lbnRzW2RlcHRoXSA9IGNvbXBvbmVudDtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcm91dGUgPSB0aGlzLmdldFJvdXRlQXREZXB0aCgwKTtcbiAgICAgIHJldHVybiByb3V0ZSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQocm91dGUuaGFuZGxlciwgdGhpcy5wcm9wcykgOiBudWxsO1xuICAgIH1cblxuICB9KTtcblxuICBSb3V0ZXIuY2xlYXJBbGxSb3V0ZXMoKTtcblxuICBpZiAob3B0aW9ucy5yb3V0ZXMpXG4gICAgUm91dGVyLmFkZFJvdXRlcyhvcHRpb25zLnJvdXRlcyk7XG5cbiAgcmV0dXJuIFJvdXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSb3V0ZXI7XG4iLCJleHBvcnRzLkRlZmF1bHRSb3V0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9EZWZhdWx0Um91dGUnKTtcbmV4cG9ydHMuTGluayA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9MaW5rJyk7XG5leHBvcnRzLk5vdEZvdW5kUm91dGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTm90Rm91bmRSb3V0ZScpO1xuZXhwb3J0cy5SZWRpcmVjdCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9SZWRpcmVjdCcpO1xuZXhwb3J0cy5Sb3V0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Sb3V0ZScpO1xuZXhwb3J0cy5Sb3V0ZUhhbmRsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUm91dGVIYW5kbGVyJyk7XG5cbmV4cG9ydHMuSGFzaExvY2F0aW9uID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvSGFzaExvY2F0aW9uJyk7XG5leHBvcnRzLkhpc3RvcnlMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL0hpc3RvcnlMb2NhdGlvbicpO1xuZXhwb3J0cy5SZWZyZXNoTG9jYXRpb24gPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24nKTtcblxuZXhwb3J0cy5JbWl0YXRlQnJvd3NlckJlaGF2aW9yID0gcmVxdWlyZSgnLi9iZWhhdmlvcnMvSW1pdGF0ZUJyb3dzZXJCZWhhdmlvcicpO1xuZXhwb3J0cy5TY3JvbGxUb1RvcEJlaGF2aW9yID0gcmVxdWlyZSgnLi9iZWhhdmlvcnMvU2Nyb2xsVG9Ub3BCZWhhdmlvcicpO1xuXG5leHBvcnRzLkhpc3RvcnkgPSByZXF1aXJlKCcuL0hpc3RvcnknKTtcbmV4cG9ydHMuTmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vTmF2aWdhdGlvbicpO1xuZXhwb3J0cy5Sb3V0ZUhhbmRsZXJNaXhpbiA9IHJlcXVpcmUoJy4vUm91dGVIYW5kbGVyTWl4aW4nKTtcbmV4cG9ydHMuU3RhdGUgPSByZXF1aXJlKCcuL1N0YXRlJyk7XG5cbmV4cG9ydHMuY3JlYXRlID0gcmVxdWlyZSgnLi9jcmVhdGVSb3V0ZXInKTtcbmV4cG9ydHMucnVuID0gcmVxdWlyZSgnLi9ydW5Sb3V0ZXInKTtcblxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuZnVuY3Rpb24gaXNWYWxpZENoaWxkKG9iamVjdCkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgfHwgUmVhY3QuaXNWYWxpZEVsZW1lbnQob2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gaXNSZWFjdENoaWxkcmVuKG9iamVjdCkge1xuICByZXR1cm4gaXNWYWxpZENoaWxkKG9iamVjdCkgfHwgKEFycmF5LmlzQXJyYXkob2JqZWN0KSAmJiBvYmplY3QuZXZlcnkoaXNWYWxpZENoaWxkKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNSZWFjdENoaWxkcmVuO1xuIiwidmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zJyk7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoJy4uL0hpc3RvcnknKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoIGZyb20gdGhlIGBoYXNoYCBwb3J0aW9uIG9mIHRoZSBVUkwsIGluY2x1ZGluZ1xuICogcXVlcnkgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBnZXRIYXNoUGF0aCgpIHtcbiAgcmV0dXJuIGRlY29kZVVSSShcbiAgICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gICAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8ICcnXG4gICk7XG59XG5cbnZhciBfYWN0aW9uVHlwZTtcblxuZnVuY3Rpb24gZW5zdXJlU2xhc2goKSB7XG4gIHZhciBwYXRoID0gZ2V0SGFzaFBhdGgoKTtcblxuICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcvJylcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBIYXNoTG9jYXRpb24ucmVwbGFjZSgnLycgKyBwYXRoKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBfY2hhbmdlTGlzdGVuZXJzID0gW107XG5cbmZ1bmN0aW9uIG5vdGlmeUNoYW5nZSh0eXBlKSB7XG4gIGlmICh0eXBlID09PSBMb2NhdGlvbkFjdGlvbnMuUFVTSClcbiAgICBIaXN0b3J5Lmxlbmd0aCArPSAxO1xuXG4gIHZhciBjaGFuZ2UgPSB7XG4gICAgcGF0aDogZ2V0SGFzaFBhdGgoKSxcbiAgICB0eXBlOiB0eXBlXG4gIH07XG5cbiAgX2NoYW5nZUxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIGxpc3RlbmVyKGNoYW5nZSk7XG4gIH0pO1xufVxuXG52YXIgX2lzTGlzdGVuaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG9uSGFzaENoYW5nZSgpIHtcbiAgaWYgKGVuc3VyZVNsYXNoKCkpIHtcbiAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGFuIF9hY3Rpb25UeXBlIHRoZW4gYWxsIHdlIGtub3cgaXMgdGhlIGhhc2hcbiAgICAvLyBjaGFuZ2VkLiBJdCB3YXMgcHJvYmFibHkgY2F1c2VkIGJ5IHRoZSB1c2VyIGNsaWNraW5nIHRoZSBCYWNrXG4gICAgLy8gYnV0dG9uLCBidXQgbWF5IGhhdmUgYWxzbyBiZWVuIHRoZSBGb3J3YXJkIGJ1dHRvbiBvciBtYW51YWxcbiAgICAvLyBtYW5pcHVsYXRpb24uIFNvIGp1c3QgZ3Vlc3MgJ3BvcCcuXG4gICAgbm90aWZ5Q2hhbmdlKF9hY3Rpb25UeXBlIHx8IExvY2F0aW9uQWN0aW9ucy5QT1ApO1xuICAgIF9hY3Rpb25UeXBlID0gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEEgTG9jYXRpb24gdGhhdCB1c2VzIGB3aW5kb3cubG9jYXRpb24uaGFzaGAuXG4gKi9cbnZhciBIYXNoTG9jYXRpb24gPSB7XG5cbiAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIF9jaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAvLyBEbyB0aGlzIEJFRk9SRSBsaXN0ZW5pbmcgZm9yIGhhc2hjaGFuZ2UuXG4gICAgZW5zdXJlU2xhc2goKTtcblxuICAgIGlmICghX2lzTGlzdGVuaW5nKSB7XG4gICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb25oYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICAgIH1cblxuICAgICAgX2lzTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycyA9IF9jaGFuZ2VMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gbCAhPT0gbGlzdGVuZXI7XG4gICAgfSk7XG5cbiAgICBpZiAoX2NoYW5nZUxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50KCdvbmhhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgcHVzaDogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICBfYWN0aW9uVHlwZSA9IExvY2F0aW9uQWN0aW9ucy5QVVNIO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gZW5jb2RlVVJJKHBhdGgpO1xuICB9LFxuXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgX2FjdGlvblR5cGUgPSBMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyAnIycgKyBlbmNvZGVVUkkocGF0aClcbiAgICApO1xuICB9LFxuXG4gIHBvcDogZnVuY3Rpb24gKCkge1xuICAgIF9hY3Rpb25UeXBlID0gTG9jYXRpb25BY3Rpb25zLlBPUDtcbiAgICBIaXN0b3J5LmJhY2soKTtcbiAgfSxcblxuICBnZXRDdXJyZW50UGF0aDogZ2V0SGFzaFBhdGgsXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJzxIYXNoTG9jYXRpb24+JztcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2hMb2NhdGlvbjtcbiIsInZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9ucycpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKCcuLi9IaXN0b3J5Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCBmcm9tIGB3aW5kb3cubG9jYXRpb25gLCBpbmNsdWRpbmcgcXVlcnkgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dQYXRoKCkge1xuICByZXR1cm4gZGVjb2RlVVJJKFxuICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2hcbiAgKTtcbn1cblxudmFyIF9jaGFuZ2VMaXN0ZW5lcnMgPSBbXTtcblxuZnVuY3Rpb24gbm90aWZ5Q2hhbmdlKHR5cGUpIHtcbiAgdmFyIGNoYW5nZSA9IHtcbiAgICBwYXRoOiBnZXRXaW5kb3dQYXRoKCksXG4gICAgdHlwZTogdHlwZVxuICB9O1xuXG4gIF9jaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICBsaXN0ZW5lcihjaGFuZ2UpO1xuICB9KTtcbn1cblxudmFyIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBvblBvcFN0YXRlKCkge1xuICBub3RpZnlDaGFuZ2UoTG9jYXRpb25BY3Rpb25zLlBPUCk7XG59XG5cbi8qKlxuICogQSBMb2NhdGlvbiB0aGF0IHVzZXMgSFRNTDUgaGlzdG9yeS5cbiAqL1xudmFyIEhpc3RvcnlMb2NhdGlvbiA9IHtcblxuICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIGlmICghX2lzTGlzdGVuaW5nKSB7XG4gICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgb25Qb3BTdGF0ZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdwb3BzdGF0ZScsIG9uUG9wU3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICBfY2hhbmdlTGlzdGVuZXJzID0gX2NoYW5nZUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcbiAgICAgIHJldHVybiBsICE9PSBsaXN0ZW5lcjtcbiAgICB9KTtcblxuICAgIGlmIChfY2hhbmdlTGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIG9uUG9wU3RhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50KCdwb3BzdGF0ZScsIG9uUG9wU3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgcHVzaDogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBwYXRoOiBwYXRoIH0sICcnLCBlbmNvZGVVUkkocGF0aCkpO1xuICAgIEhpc3RvcnkubGVuZ3RoICs9IDE7XG4gICAgbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5QVVNIKTtcbiAgfSxcblxuICByZXBsYWNlOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IHBhdGg6IHBhdGggfSwgJycsIGVuY29kZVVSSShwYXRoKSk7XG4gICAgbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5SRVBMQUNFKTtcbiAgfSxcblxuICBwb3A6IEhpc3RvcnkuYmFjayxcblxuICBnZXRDdXJyZW50UGF0aDogZ2V0V2luZG93UGF0aCxcblxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnPEhpc3RvcnlMb2NhdGlvbj4nO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGlzdG9yeUxvY2F0aW9uO1xuIiwidmFyIEhpc3RvcnlMb2NhdGlvbiA9IHJlcXVpcmUoJy4vSGlzdG9yeUxvY2F0aW9uJyk7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoJy4uL0hpc3RvcnknKTtcblxuLyoqXG4gKiBBIExvY2F0aW9uIHRoYXQgdXNlcyBmdWxsIHBhZ2UgcmVmcmVzaGVzLiBUaGlzIGlzIHVzZWQgYXNcbiAqIHRoZSBmYWxsYmFjayBmb3IgSGlzdG9yeUxvY2F0aW9uIGluIGJyb3dzZXJzIHRoYXQgZG8gbm90XG4gKiBzdXBwb3J0IHRoZSBIVE1MNSBoaXN0b3J5IEFQSS5cbiAqL1xudmFyIFJlZnJlc2hMb2NhdGlvbiA9IHtcblxuICBwdXNoOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbiA9IGVuY29kZVVSSShwYXRoKTtcbiAgfSxcblxuICByZXBsYWNlOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGVuY29kZVVSSShwYXRoKSk7XG4gIH0sXG5cbiAgcG9wOiBIaXN0b3J5LmJhY2ssXG5cbiAgZ2V0Q3VycmVudFBhdGg6IEhpc3RvcnlMb2NhdGlvbi5nZXRDdXJyZW50UGF0aCxcblxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnPFJlZnJlc2hMb2NhdGlvbj4nO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVmcmVzaExvY2F0aW9uO1xuIiwidmFyIGNyZWF0ZVJvdXRlciA9IHJlcXVpcmUoJy4vY3JlYXRlUm91dGVyJyk7XG5cbi8qKlxuICogQSBoaWdoLWxldmVsIGNvbnZlbmllbmNlIG1ldGhvZCB0aGF0IGNyZWF0ZXMsIGNvbmZpZ3VyZXMsIGFuZFxuICogcnVucyBhIHJvdXRlciBpbiBvbmUgc2hvdC4gVGhlIG1ldGhvZCBzaWduYXR1cmUgaXM6XG4gKlxuICogICBSb3V0ZXIucnVuKHJvdXRlc1ssIGxvY2F0aW9uIF0sIGNhbGxiYWNrKTtcbiAqXG4gKiBVc2luZyBgd2luZG93LmxvY2F0aW9uLmhhc2hgIHRvIG1hbmFnZSB0aGUgVVJMLCB5b3UgY291bGQgZG86XG4gKlxuICogICBSb3V0ZXIucnVuKHJvdXRlcywgZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIvPiwgZG9jdW1lbnQuYm9keSk7XG4gKiAgIH0pO1xuICogXG4gKiBVc2luZyBIVE1MNSBoaXN0b3J5IGFuZCBhIGN1c3RvbSBcImN1cnNvclwiIHByb3A6XG4gKiBcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXMsIFJvdXRlci5IaXN0b3J5TG9jYXRpb24sIGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgUmVhY3QucmVuZGVyKDxIYW5kbGVyIGN1cnNvcj17Y3Vyc29yfS8+LCBkb2N1bWVudC5ib2R5KTtcbiAqICAgfSk7XG4gKlxuICogUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCByb3V0ZXIuXG4gKlxuICogTm90ZTogSWYgeW91IG5lZWQgdG8gc3BlY2lmeSBmdXJ0aGVyIG9wdGlvbnMgZm9yIHlvdXIgcm91dGVyIHN1Y2hcbiAqIGFzIGVycm9yL2Fib3J0IGhhbmRsaW5nIG9yIGN1c3RvbSBzY3JvbGwgYmVoYXZpb3IsIHVzZSBSb3V0ZXIuY3JlYXRlXG4gKiBpbnN0ZWFkLlxuICpcbiAqICAgdmFyIHJvdXRlciA9IFJvdXRlci5jcmVhdGUob3B0aW9ucyk7XG4gKiAgIHJvdXRlci5ydW4oZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICAvLyAuLi5cbiAqICAgfSk7XG4gKi9cbmZ1bmN0aW9uIHJ1blJvdXRlcihyb3V0ZXMsIGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBsb2NhdGlvbjtcbiAgICBsb2NhdGlvbiA9IG51bGw7XG4gIH1cblxuICB2YXIgcm91dGVyID0gY3JlYXRlUm91dGVyKHtcbiAgICByb3V0ZXM6IHJvdXRlcyxcbiAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgfSk7XG5cbiAgcm91dGVyLnJ1bihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHJvdXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBydW5Sb3V0ZXI7XG4iLCJ2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xudmFyIG1lcmdlID0gcmVxdWlyZSgncXMvbGliL3V0aWxzJykubWVyZ2U7XG52YXIgcXMgPSByZXF1aXJlKCdxcycpO1xuXG52YXIgcGFyYW1Db21waWxlTWF0Y2hlciA9IC86KFthLXpBLVpfJF1bYS16QS1aMC05XyRdKil8WyouKClcXFtcXF1cXFxcK3x7fV4kXS9nO1xudmFyIHBhcmFtSW5qZWN0TWF0Y2hlciA9IC86KFthLXpBLVpfJF1bYS16QS1aMC05XyQ/XSpbP10/KXxbKl0vZztcbnZhciBwYXJhbUluamVjdFRyYWlsaW5nU2xhc2hNYXRjaGVyID0gL1xcL1xcL1xcP3xcXC9cXD9cXC98XFwvXFw/L2c7XG52YXIgcXVlcnlNYXRjaGVyID0gL1xcPyguKykvO1xuXG52YXIgX2NvbXBpbGVkUGF0dGVybnMgPSB7fTtcblxuZnVuY3Rpb24gY29tcGlsZVBhdHRlcm4ocGF0dGVybikge1xuICBpZiAoIShwYXR0ZXJuIGluIF9jb21waWxlZFBhdHRlcm5zKSkge1xuICAgIHZhciBwYXJhbU5hbWVzID0gW107XG4gICAgdmFyIHNvdXJjZSA9IHBhdHRlcm4ucmVwbGFjZShwYXJhbUNvbXBpbGVNYXRjaGVyLCBmdW5jdGlvbiAobWF0Y2gsIHBhcmFtTmFtZSkge1xuICAgICAgaWYgKHBhcmFtTmFtZSkge1xuICAgICAgICBwYXJhbU5hbWVzLnB1c2gocGFyYW1OYW1lKTtcbiAgICAgICAgcmV0dXJuICcoW14vPyNdKyknO1xuICAgICAgfSBlbHNlIGlmIChtYXRjaCA9PT0gJyonKSB7XG4gICAgICAgIHBhcmFtTmFtZXMucHVzaCgnc3BsYXQnKTtcbiAgICAgICAgcmV0dXJuICcoLio/KSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ1xcXFwnICsgbWF0Y2g7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBfY29tcGlsZWRQYXR0ZXJuc1twYXR0ZXJuXSA9IHtcbiAgICAgIG1hdGNoZXI6IG5ldyBSZWdFeHAoJ14nICsgc291cmNlICsgJyQnLCAnaScpLFxuICAgICAgcGFyYW1OYW1lczogcGFyYW1OYW1lc1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2NvbXBpbGVkUGF0dGVybnNbcGF0dGVybl07XG59XG5cbnZhciBQYXRoID0ge1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSBuYW1lcyBvZiBhbGwgcGFyYW1ldGVycyBpbiB0aGUgZ2l2ZW4gcGF0dGVybi5cbiAgICovXG4gIGV4dHJhY3RQYXJhbU5hbWVzOiBmdW5jdGlvbiAocGF0dGVybikge1xuICAgIHJldHVybiBjb21waWxlUGF0dGVybihwYXR0ZXJuKS5wYXJhbU5hbWVzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFeHRyYWN0cyB0aGUgcG9ydGlvbnMgb2YgdGhlIGdpdmVuIFVSTCBwYXRoIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIHBhdHRlcm5cbiAgICogYW5kIHJldHVybnMgYW4gb2JqZWN0IG9mIHBhcmFtIG5hbWUgPT4gdmFsdWUgcGFpcnMuIFJldHVybnMgbnVsbCBpZiB0aGVcbiAgICogcGF0dGVybiBkb2VzIG5vdCBtYXRjaCB0aGUgZ2l2ZW4gcGF0aC5cbiAgICovXG4gIGV4dHJhY3RQYXJhbXM6IGZ1bmN0aW9uIChwYXR0ZXJuLCBwYXRoKSB7XG4gICAgdmFyIG9iamVjdCA9IGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pO1xuICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2gob2JqZWN0Lm1hdGNoZXIpO1xuXG4gICAgaWYgKCFtYXRjaClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuXG4gICAgb2JqZWN0LnBhcmFtTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW1OYW1lLCBpbmRleCkge1xuICAgICAgcGFyYW1zW3BhcmFtTmFtZV0gPSBtYXRjaFtpbmRleCArIDFdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHJvdXRlIHBhdGggd2l0aCBwYXJhbXMgaW50ZXJwb2xhdGVkLiBUaHJvd3NcbiAgICogaWYgdGhlcmUgaXMgYSBkeW5hbWljIHNlZ21lbnQgb2YgdGhlIHJvdXRlIHBhdGggZm9yIHdoaWNoIHRoZXJlIGlzIG5vIHBhcmFtLlxuICAgKi9cbiAgaW5qZWN0UGFyYW1zOiBmdW5jdGlvbiAocGF0dGVybiwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXG4gICAgdmFyIHNwbGF0SW5kZXggPSAwO1xuXG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZShwYXJhbUluamVjdE1hdGNoZXIsIGZ1bmN0aW9uIChtYXRjaCwgcGFyYW1OYW1lKSB7XG4gICAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWUgfHwgJ3NwbGF0JztcblxuICAgICAgLy8gSWYgcGFyYW0gaXMgb3B0aW9uYWwgZG9uJ3QgY2hlY2sgZm9yIGV4aXN0ZW5jZVxuICAgICAgaWYgKHBhcmFtTmFtZS5zbGljZSgtMSkgIT09ICc/Jykge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgcGFyYW1zW3BhcmFtTmFtZV0gIT0gbnVsbCxcbiAgICAgICAgICAnTWlzc2luZyBcIicgKyBwYXJhbU5hbWUgKyAnXCIgcGFyYW1ldGVyIGZvciBwYXRoIFwiJyArIHBhdHRlcm4gKyAnXCInXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWUuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAgIGlmIChwYXJhbXNbcGFyYW1OYW1lXSA9PSBudWxsKVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgdmFyIHNlZ21lbnQ7XG4gICAgICBpZiAocGFyYW1OYW1lID09PSAnc3BsYXQnICYmIEFycmF5LmlzQXJyYXkocGFyYW1zW3BhcmFtTmFtZV0pKSB7XG4gICAgICAgIHNlZ21lbnQgPSBwYXJhbXNbcGFyYW1OYW1lXVtzcGxhdEluZGV4KytdO1xuXG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICBzZWdtZW50ICE9IG51bGwsXG4gICAgICAgICAgJ01pc3Npbmcgc3BsYXQgIyAnICsgc3BsYXRJbmRleCArICcgZm9yIHBhdGggXCInICsgcGF0dGVybiArICdcIidcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlZ21lbnQgPSBwYXJhbXNbcGFyYW1OYW1lXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlZ21lbnQ7XG4gICAgfSkucmVwbGFjZShwYXJhbUluamVjdFRyYWlsaW5nU2xhc2hNYXRjaGVyLCAnLycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGlzIHRoZSByZXN1bHQgb2YgcGFyc2luZyBhbnkgcXVlcnkgc3RyaW5nIGNvbnRhaW5lZFxuICAgKiBpbiB0aGUgZ2l2ZW4gcGF0aCwgbnVsbCBpZiB0aGUgcGF0aCBjb250YWlucyBubyBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICBleHRyYWN0UXVlcnk6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChxdWVyeU1hdGNoZXIpO1xuICAgIHJldHVybiBtYXRjaCAmJiBxcy5wYXJzZShtYXRjaFsxXSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBwYXRoIHdpdGhvdXQgdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIHdpdGhvdXRRdWVyeTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKHF1ZXJ5TWF0Y2hlciwgJycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSBnaXZlblxuICAgKiBxdWVyeSBtZXJnZWQgaW50byB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgd2l0aFF1ZXJ5OiBmdW5jdGlvbiAocGF0aCwgcXVlcnkpIHtcbiAgICB2YXIgZXhpc3RpbmdRdWVyeSA9IFBhdGguZXh0cmFjdFF1ZXJ5KHBhdGgpO1xuXG4gICAgaWYgKGV4aXN0aW5nUXVlcnkpXG4gICAgICBxdWVyeSA9IHF1ZXJ5ID8gbWVyZ2UoZXhpc3RpbmdRdWVyeSwgcXVlcnkpIDogZXhpc3RpbmdRdWVyeTtcblxuICAgIHZhciBxdWVyeVN0cmluZyA9IHFzLnN0cmluZ2lmeShxdWVyeSwgeyBpbmRpY2VzOiBmYWxzZSB9KTtcblxuICAgIGlmIChxdWVyeVN0cmluZylcbiAgICAgIHJldHVybiBQYXRoLndpdGhvdXRRdWVyeShwYXRoKSArICc/JyArIGRlY29kZVVSSUNvbXBvbmVudChxdWVyeVN0cmluZyk7XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBwYXRoIGlzIGFic29sdXRlLlxuICAgKi9cbiAgaXNBYnNvbHV0ZTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIG5vcm1hbGl6ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcGF0aC5cbiAgICovXG4gIG5vcm1hbGl6ZTogZnVuY3Rpb24gKHBhdGgsIHBhcmVudFJvdXRlKSB7XG4gICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcLyovLCAnLycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBKb2lucyB0d28gVVJMIHBhdGhzIHRvZ2V0aGVyLlxuICAgKi9cbiAgam9pbjogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYS5yZXBsYWNlKC9cXC8qJC8sICcvJykgKyBiO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGF0aDtcbiIsInZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZSgncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JykuY2FuVXNlRE9NO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3cgYXMgeyB4LCB5IH0uXG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uKCkge1xuICBpbnZhcmlhbnQoXG4gICAgY2FuVXNlRE9NLFxuICAgICdDYW5ub3QgZ2V0IGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIHdpdGhvdXQgYSBET00nXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbjtcbiIsImZ1bmN0aW9uIHN1cHBvcnRzSGlzdG9yeSgpIHtcbiAgLyohIHRha2VuIGZyb20gbW9kZXJuaXpyXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAgICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmFja3QvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAgICovXG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fFxuICAgICAgKHVhLmluZGV4T2YoJ0FuZHJvaWQgNC4wJykgIT09IC0xKSkgJiZcbiAgICAgIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiZcbiAgICAgIHVhLmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSAmJlxuICAgICAgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0hpc3Rvcnk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliLycpO1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cbnZhciBTdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIFBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7fTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHJpbmdpZnk6IFN0cmluZ2lmeSxcbiAgICBwYXJzZTogUGFyc2Vcbn07XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDBcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlVmFsdWVzID0gZnVuY3Rpb24gKHN0ciwgb3B0aW9ucykge1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0KTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgICAgdmFyIHBvcyA9IHBhcnQuaW5kZXhPZignXT0nKSA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IHBhcnQuaW5kZXhPZignXT0nKSArIDE7XG5cbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIG9ialtVdGlscy5kZWNvZGUocGFydCldID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gVXRpbHMuZGVjb2RlKHBhcnQuc2xpY2UoMCwgcG9zKSk7XG4gICAgICAgICAgICB2YXIgdmFsID0gVXRpbHMuZGVjb2RlKHBhcnQuc2xpY2UocG9zICsgMSkpO1xuXG4gICAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IFtdLmNvbmNhdChvYmpba2V5XSkuY29uY2F0KHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5pbnRlcm5hbHMucGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucykge1xuXG4gICAgaWYgKCFjaGFpbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICB2YXIgcm9vdCA9IGNoYWluLnNoaWZ0KCk7XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgaWYgKHJvb3QgPT09ICdbXScpIHtcbiAgICAgICAgb2JqID0gW107XG4gICAgICAgIG9iaiA9IG9iai5jb25jYXQoaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGNoYWluLCB2YWwsIG9wdGlvbnMpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBjbGVhblJvb3QgPSByb290WzBdID09PSAnWycgJiYgcm9vdFtyb290Lmxlbmd0aCAtIDFdID09PSAnXScgPyByb290LnNsaWNlKDEsIHJvb3QubGVuZ3RoIC0gMSkgOiByb290O1xuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChjbGVhblJvb3QsIDEwKTtcbiAgICAgICAgdmFyIGluZGV4U3RyaW5nID0gJycgKyBpbmRleDtcbiAgICAgICAgaWYgKCFpc05hTihpbmRleCkgJiZcbiAgICAgICAgICAgIHJvb3QgIT09IGNsZWFuUm9vdCAmJlxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPT09IGNsZWFuUm9vdCAmJlxuICAgICAgICAgICAgaW5kZXggPj0gMCAmJlxuICAgICAgICAgICAgaW5kZXggPD0gb3B0aW9ucy5hcnJheUxpbWl0KSB7XG5cbiAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgb2JqW2luZGV4XSA9IGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGNoYWluLCB2YWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlS2V5cyA9IGZ1bmN0aW9uIChrZXksIHZhbCwgb3B0aW9ucykge1xuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoZSByZWdleCBjaHVua3NcblxuICAgIHZhciBwYXJlbnQgPSAvXihbXlxcW1xcXV0qKS87XG4gICAgdmFyIGNoaWxkID0gLyhcXFtbXlxcW1xcXV0qXFxdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gcGFyZW50LmV4ZWMoa2V5KTtcblxuICAgIC8vIERvbid0IGFsbG93IHRoZW0gdG8gb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoc2VnbWVudFsxXSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChzZWdtZW50WzFdKSB7XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggY2hpbGRyZW4gYXBwZW5kaW5nIHRvIHRoZSBhcnJheSB1bnRpbCB3ZSBoaXQgZGVwdGhcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoKHNlZ21lbnQgPSBjaGlsZC5leGVjKGtleSkpICE9PSBudWxsICYmIGkgPCBvcHRpb25zLmRlcHRoKSB7XG5cbiAgICAgICAgKytpO1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoc2VnbWVudFsxXS5yZXBsYWNlKC9cXFt8XFxdL2csICcnKSkpIHtcbiAgICAgICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgIGtleXMucHVzaCgnWycgKyBrZXkuc2xpY2Uoc2VnbWVudC5pbmRleCkgKyAnXScpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcm5hbHMucGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fFxuICAgICAgICBzdHIgPT09IG51bGwgfHxcbiAgICAgICAgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5kZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IFV0aWxzLmlzUmVnRXhwKG9wdGlvbnMuZGVsaW1pdGVyKSA/IG9wdGlvbnMuZGVsaW1pdGVyIDogaW50ZXJuYWxzLmRlbGltaXRlcjtcbiAgICBvcHRpb25zLmRlcHRoID0gdHlwZW9mIG9wdGlvbnMuZGVwdGggPT09ICdudW1iZXInID8gb3B0aW9ucy5kZXB0aCA6IGludGVybmFscy5kZXB0aDtcbiAgICBvcHRpb25zLmFycmF5TGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuYXJyYXlMaW1pdCA6IGludGVybmFscy5hcnJheUxpbWl0O1xuICAgIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLnBhcmFtZXRlckxpbWl0IDogaW50ZXJuYWxzLnBhcmFtZXRlckxpbWl0O1xuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IGludGVybmFscy5wYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0ga2V5cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gaW50ZXJuYWxzLnBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IFV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBpbmRpY2VzOiB0cnVlXG59O1xuXG5cbmludGVybmFscy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAob2JqLCBwcmVmaXgsIG9wdGlvbnMpIHtcblxuICAgIGlmIChVdGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIG9iaiA9IG9iai50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IG9iai50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xuXG4gICAgICAgIHJldHVybiBbZW5jb2RlVVJJQ29tcG9uZW50KHByZWZpeCkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9iaktleXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluZGljZXMgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkob2JqKSkge1xuXG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGludGVybmFscy5zdHJpbmdpZnkob2JqW2tleV0sIHByZWZpeCwgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChpbnRlcm5hbHMuc3RyaW5naWZ5KG9ialtrZXldLCBwcmVmaXggKyAnWycgKyBrZXkgKyAnXScsIG9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgb3B0aW9ucykge1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBpbnRlcm5hbHMuZGVsaW1pdGVyIDogb3B0aW9ucy5kZWxpbWl0ZXI7XG4gICAgb3B0aW9ucy5pbmRpY2VzID0gdHlwZW9mIG9wdGlvbnMuaW5kaWNlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5pbmRpY2VzIDogaW50ZXJuYWxzLmluZGljZXM7XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8XG4gICAgICAgIG9iaiA9PT0gbnVsbCkge1xuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb2JqS2V5cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwga2V5LCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleXMuam9pbihkZWxpbWl0ZXIpO1xufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7fTtcblxuXG5leHBvcnRzLmFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiAoc291cmNlKSB7XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc291cmNlLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblxuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0YXJnZXQgPSBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmXG4gICAgICAgICFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcblxuICAgICAgICB0YXJnZXQgPSBleHBvcnRzLmFycmF5VG9PYmplY3QodGFyZ2V0KTtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgayA9IDAsIGtsID0ga2V5cy5sZW5ndGg7IGsgPCBrbDsgKytrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2tdO1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoIXRhcmdldFtrZXldKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBleHBvcnRzLm1lcmdlKHRhcmdldFtrZXldLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxuXG5leHBvcnRzLmNvbXBhY3QgPSBmdW5jdGlvbiAob2JqLCByZWZzKSB7XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgb2JqID09PSBudWxsKSB7XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZWZzID0gcmVmcyB8fCBbXTtcbiAgICB2YXIgbG9va3VwID0gcmVmcy5pbmRleE9mKG9iaik7XG4gICAgaWYgKGxvb2t1cCAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHJlZnNbbG9va3VwXTtcbiAgICB9XG5cbiAgICByZWZzLnB1c2gob2JqKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9iai5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBhY3RlZDtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yIChpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIG9ialtrZXldID0gZXhwb3J0cy5jb21wYWN0KG9ialtrZXldLCByZWZzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5leHBvcnRzLmlzUmVnRXhwID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG5cbmV4cG9ydHMuaXNCdWZmZXIgPSBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICBpZiAob2JqID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiZcbiAgICAgICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmXG4gICAgICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXhlY3V0aW9uRW52aXJvbm1lbnRcbiAqL1xuXG4vKmpzbGludCBldmlsOiB0cnVlICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOlxuICAgIGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG4gIGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuLFxuXG4gIGlzSW5Xb3JrZXI6ICFjYW5Vc2VET00gLy8gRm9yIG5vdywgdGhpcyBpcyB0cnVlIC0gbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGN4XG4gKi9cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gbWFyayBzdHJpbmcgbGl0ZXJhbHMgcmVwcmVzZW50aW5nIENTUyBjbGFzcyBuYW1lc1xuICogc28gdGhhdCB0aGV5IGNhbiBiZSB0cmFuc2Zvcm1lZCBzdGF0aWNhbGx5LiBUaGlzIGFsbG93cyBmb3IgbW9kdWxhcml6YXRpb25cbiAqIGFuZCBtaW5pZmljYXRpb24gb2YgQ1NTIGNsYXNzIG5hbWVzLlxuICpcbiAqIEluIHN0YXRpY191cHN0cmVhbSwgdGhpcyBmdW5jdGlvbiBpcyBhY3R1YWxseSBpbXBsZW1lbnRlZCwgYnV0IGl0IHNob3VsZFxuICogZXZlbnR1YWxseSBiZSByZXBsYWNlZCB3aXRoIHNvbWV0aGluZyBtb3JlIGRlc2NyaXB0aXZlLCBhbmQgdGhlIHRyYW5zZm9ybVxuICogdGhhdCBpcyB1c2VkIGluIHRoZSBtYWluIHN0YWNrIHNob3VsZCBiZSBwb3J0ZWQgZm9yIHVzZSBlbHNld2hlcmUuXG4gKlxuICogQHBhcmFtIHN0cmluZ3xvYmplY3QgY2xhc3NOYW1lIHRvIG1vZHVsYXJpemUsIG9yIGFuIG9iamVjdCBvZiBrZXkvdmFsdWVzLlxuICogICAgICAgICAgICAgICAgICAgICAgSW4gdGhlIG9iamVjdCBjYXNlLCB0aGUgdmFsdWVzIGFyZSBjb25kaXRpb25zIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgIGRldGVybWluZSBpZiB0aGUgY2xhc3NOYW1lIGtleXMgc2hvdWxkIGJlIGluY2x1ZGVkLlxuICogQHBhcmFtIFtzdHJpbmcgLi4uXSAgVmFyaWFibGUgbGlzdCBvZiBjbGFzc05hbWVzIGluIHRoZSBzdHJpbmcgY2FzZS5cbiAqIEByZXR1cm4gc3RyaW5nICAgICAgIFJlbmRlcmFibGUgc3BhY2Utc2VwYXJhdGVkIENTUyBjbGFzc05hbWUuXG4gKi9cbmZ1bmN0aW9uIGN4KGNsYXNzTmFtZXMpIHtcbiAgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNsYXNzTmFtZXMpLmZpbHRlcihmdW5jdGlvbihjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiBjbGFzc05hbWVzW2NsYXNzTmFtZV07XG4gICAgfSkuam9pbignICcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuam9pbi5jYWxsKGFyZ3VtZW50cywgJyAnKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGN4O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGVtcHR5RnVuY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge31cblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSB3YXJuaW5nXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZShcIi4vZW1wdHlGdW5jdGlvblwiKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCApIHtmb3IgKHZhciBhcmdzPVtdLCRfXzA9MiwkX18xPWFyZ3VtZW50cy5sZW5ndGg7JF9fMDwkX18xOyRfXzArKykgYXJncy5wdXNoKGFyZ3VtZW50c1skX18wXSk7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgIHtyZXR1cm4gYXJnc1thcmdJbmRleCsrXTt9KSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iXX0=
