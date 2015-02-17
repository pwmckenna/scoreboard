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
  if ("production" !== "production") {
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

},{}],"/Users/pwmckenna/git/tally-master/node_modules/react/lib/warning.js":[function(require,module,exports){
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

if ("production" !== "production") {
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

},{"./emptyFunction":"/Users/pwmckenna/git/tally-master/node_modules/react/lib/emptyFunction.js"}]},{},["./specs/App-spec.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcGVjcy9BcHAtc3BlYy5qcyIsImFwcC9BcHAuanN4Iiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9DYW5jZWxsYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvQ29uZmlndXJhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9IaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL05hdmlnYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvTmF2aWdhdGlvbkNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvUHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JlZGlyZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlSGFuZGxlck1peGluLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRpbmcuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvU2Nyb2xsaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1N0YXRlQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9UcmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2JlaGF2aW9ycy9JbWl0YXRlQnJvd3NlckJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2JlaGF2aW9ycy9TY3JvbGxUb1RvcEJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvTGluay5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jb21wb25lbnRzL05vdEZvdW5kUm91dGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvY29tcG9uZW50cy9SZWRpcmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jb21wb25lbnRzL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvUm91dGVIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NyZWF0ZVJvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pc1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvbG9jYXRpb25zL0hhc2hMb2NhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9sb2NhdGlvbnMvSGlzdG9yeUxvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvcnVuUm91dGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL3V0aWxzL1BhdGguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXRpbHMvZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXRpbHMvc3VwcG9ydHNIaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvcGFyc2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY3guanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvd2FybmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi8uLi9hcHAvQXBwLmpzeCcpO1xudmFyIFRlc3RVdGlscyA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucycpLlRlc3RVdGlscztcblxuZGVzY3JpYmUoXCJBcHBcIiwgZnVuY3Rpb24oKSB7XG5cbiAgaXQoXCJzaG91bGQgcmVuZGVyIHRleHQ6IEhlbGxvIHdvcmxkIVwiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXBwID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudChBcHAoKSk7XG4gICAgZXhwZWN0KGFwcC5nZXRET01Ob2RlKCkudGV4dENvbnRlbnQpLnRvRXF1YWwoJ0hlbGxvIHdvcmxkIScpO1xuICB9KTtcblxufSk7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0Um91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiQXBwXCIsXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Um91dGVyLlJvdXRlSGFuZGxlciwgUmVhY3QuX19zcHJlYWQoe30sICB0aGlzLnByb3BzKSlcbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXHRcbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50UXVldWU7XG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHZhciBpID0gLTE7XG4gICAgICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtpXSgpO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbn1cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgcXVldWUucHVzaChmdW4pO1xuICAgIGlmICghZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIGNhbmNlbGxhdGlvbiBjYXVzZWQgYnkgbmF2aWdhdGluZyBhd2F5XG4gKiBiZWZvcmUgdGhlIHByZXZpb3VzIHRyYW5zaXRpb24gaGFzIGZ1bGx5IHJlc29sdmVkLlxuICovXG5mdW5jdGlvbiBDYW5jZWxsYXRpb24oKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGxhdGlvbjtcbiIsInZhciB3YXJuaW5nID0gcmVxdWlyZSgncmVhY3QvbGliL3dhcm5pbmcnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKGNvbXBvbmVudE5hbWUsIHByb3BUeXBlcywgcHJvcHMpIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvciA9IHByb3BUeXBlc1twcm9wTmFtZV0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKTtcblxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpXG4gICAgICAgIHdhcm5pbmcoZmFsc2UsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgQ29uZmlndXJhdGlvbiA9IHtcblxuICBzdGF0aWNzOiB7XG5cbiAgICB2YWxpZGF0ZVByb3BzOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgIGNoZWNrUHJvcFR5cGVzKHRoaXMuZGlzcGxheU5hbWUsIHRoaXMucHJvcFR5cGVzLCBwcm9wcyk7XG4gICAgfVxuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgZmFsc2UsXG4gICAgICAnJXMgZWxlbWVudHMgYXJlIGZvciByb3V0ZXIgY29uZmlndXJhdGlvbiBvbmx5IGFuZCBzaG91bGQgbm90IGJlIHJlbmRlcmVkJyxcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZGlzcGxheU5hbWVcbiAgICApO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uZmlndXJhdGlvbjtcbiIsInZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZSgncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JykuY2FuVXNlRE9NO1xuXG52YXIgSGlzdG9yeSA9IHtcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhlIGhpc3RvcnkuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgcHJvcGVydHkgaXMgcmVhZC1vbmx5LlxuICAgKi9cbiAgbGVuZ3RoOiAxLFxuXG4gIC8qKlxuICAgKiBTZW5kcyB0aGUgYnJvd3NlciBiYWNrIG9uZSBlbnRyeSBpbiB0aGUgaGlzdG9yeS5cbiAgICovXG4gIGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBjYW5Vc2VET00sXG4gICAgICAnQ2Fubm90IHVzZSBIaXN0b3J5LmJhY2sgd2l0aG91dCBhIERPTSdcbiAgICApO1xuXG4gICAgLy8gRG8gdGhpcyBmaXJzdCBzbyB0aGF0IEhpc3RvcnkubGVuZ3RoIHdpbGxcbiAgICAvLyBiZSBhY2N1cmF0ZSBpbiBsb2NhdGlvbiBjaGFuZ2UgbGlzdGVuZXJzLlxuICAgIEhpc3RvcnkubGVuZ3RoIC09IDE7XG5cbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIaXN0b3J5O1xuIiwidmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbi8qKlxuICogQSBtaXhpbiBmb3IgY29tcG9uZW50cyB0aGF0IG1vZGlmeSB0aGUgVVJMLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIG1peGluczogWyBSb3V0ZXIuTmF2aWdhdGlvbiBdLFxuICogICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAqICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gKiAgICAgICB0aGlzLnRyYW5zaXRpb25UbygnYVJvdXRlJywgeyB0aGU6ICdwYXJhbXMnIH0sIHsgdGhlOiAncXVlcnknIH0pO1xuICogICAgIH0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICByZXR1cm4gKFxuICogICAgICAgICA8YSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5DbGljayBtZSE8L2E+XG4gKiAgICAgICApO1xuICogICAgIH1cbiAqICAgfSk7XG4gKi9cbnZhciBOYXZpZ2F0aW9uID0ge1xuXG4gIGNvbnRleHRUeXBlczoge1xuICAgIG1ha2VQYXRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1ha2VIcmVmOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHRyYW5zaXRpb25UbzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByZXBsYWNlV2l0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnb0JhY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhYnNvbHV0ZSBVUkwgcGF0aCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHJvdXRlXG4gICAqIG5hbWUsIFVSTCBwYXJhbWV0ZXJzLCBhbmQgcXVlcnkgdmFsdWVzLlxuICAgKi9cbiAgbWFrZVBhdGg6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQubWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgbWF5IHNhZmVseSBiZSB1c2VkIGFzIHRoZSBocmVmIG9mIGFcbiAgICogbGluayB0byB0aGUgcm91dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIG1ha2VIcmVmOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0Lm1ha2VIcmVmKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSBwdXNoaW5nXG4gICAqIGEgbmV3IFVSTCBvbnRvIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgdHJhbnNpdGlvblRvOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICB0aGlzLmNvbnRleHQudHJhbnNpdGlvblRvKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSByZXBsYWNpbmdcbiAgICogdGhlIGN1cnJlbnQgVVJMIGluIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHRoaXMuY29udGV4dC5yZXBsYWNlV2l0aCh0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRyYW5zaXRpb25zIHRvIHRoZSBwcmV2aW91cyBVUkwuXG4gICAqL1xuICBnb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbnRleHQuZ29CYWNrKCk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZpZ2F0aW9uO1xuIiwidmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHJvdXRlciB3aXRoIGNvbnRleHQgZm9yIFJvdXRlci5OYXZpZ2F0aW9uLlxuICovXG52YXIgTmF2aWdhdGlvbkNvbnRleHQgPSB7XG5cbiAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICBtYWtlUGF0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtYWtlSHJlZjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0cmFuc2l0aW9uVG86IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmVwbGFjZVdpdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ29CYWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgZ2V0Q2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1ha2VQYXRoOiB0aGlzLmNvbnN0cnVjdG9yLm1ha2VQYXRoLmJpbmQodGhpcy5jb25zdHJ1Y3RvciksXG4gICAgICBtYWtlSHJlZjogdGhpcy5jb25zdHJ1Y3Rvci5tYWtlSHJlZi5iaW5kKHRoaXMuY29uc3RydWN0b3IpLFxuICAgICAgdHJhbnNpdGlvblRvOiB0aGlzLmNvbnN0cnVjdG9yLnRyYW5zaXRpb25Uby5iaW5kKHRoaXMuY29uc3RydWN0b3IpLFxuICAgICAgcmVwbGFjZVdpdGg6IHRoaXMuY29uc3RydWN0b3IucmVwbGFjZVdpdGguYmluZCh0aGlzLmNvbnN0cnVjdG9yKSxcbiAgICAgIGdvQmFjazogdGhpcy5jb25zdHJ1Y3Rvci5nb0JhY2suYmluZCh0aGlzLmNvbnN0cnVjdG9yKVxuICAgIH07XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZpZ2F0aW9uQ29udGV4dDtcbiIsInZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbicpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XG5cbnZhciBQcm9wVHlwZXMgPSBhc3NpZ24oe1xuXG4gIC8qKlxuICAgKiBSZXF1aXJlcyB0aGF0IHRoZSB2YWx1ZSBvZiBhIHByb3AgYmUgZmFsc3kuXG4gICAqL1xuICBmYWxzeTogZnVuY3Rpb24gKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgIGlmIChwcm9wc1twcm9wTmFtZV0pXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCc8JyArIGNvbXBvbmVudE5hbWUgKyAnPiBtYXkgbm90IGhhdmUgYSBcIicgKyBwcm9wTmFtZSArICdcIiBwcm9wJyk7XG4gIH1cblxufSwgUmVhY3RQcm9wVHlwZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb3BUeXBlcztcbiIsIi8qKlxuICogRW5jYXBzdWxhdGVzIGEgcmVkaXJlY3QgdG8gdGhlIGdpdmVuIHJvdXRlLlxuICovXG5mdW5jdGlvbiBSZWRpcmVjdCh0bywgcGFyYW1zLCBxdWVyeSkge1xuICB0aGlzLnRvID0gdG87XG4gIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVkaXJlY3Q7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9Qcm9wVHlwZXMnKTtcblxudmFyIFJFRl9OQU1FID0gJ19fcm91dGVIYW5kbGVyX18nO1xuXG52YXIgUm91dGVIYW5kbGVyTWl4aW4gPSB7XG5cbiAgY29udGV4dFR5cGVzOiB7XG4gICAgZ2V0Um91dGVBdERlcHRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNldFJvdXRlQ29tcG9uZW50QXREZXB0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByb3V0ZUhhbmRsZXJzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGNoaWxkQ29udGV4dFR5cGVzOiB7XG4gICAgcm91dGVIYW5kbGVyczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm91dGVIYW5kbGVyczogdGhpcy5jb250ZXh0LnJvdXRlSGFuZGxlcnMuY29uY2F0KFsgdGhpcyBdKVxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl91cGRhdGVSb3V0ZUNvbXBvbmVudCgpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3VwZGF0ZVJvdXRlQ29tcG9uZW50KCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbnRleHQuc2V0Um91dGVDb21wb25lbnRBdERlcHRoKHRoaXMuZ2V0Um91dGVEZXB0aCgpLCBudWxsKTtcbiAgfSxcblxuICBfdXBkYXRlUm91dGVDb21wb25lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbnRleHQuc2V0Um91dGVDb21wb25lbnRBdERlcHRoKHRoaXMuZ2V0Um91dGVEZXB0aCgpLCB0aGlzLnJlZnNbUkVGX05BTUVdKTtcbiAgfSxcblxuICBnZXRSb3V0ZURlcHRoOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yb3V0ZUhhbmRsZXJzLmxlbmd0aDtcbiAgfSxcblxuICBjcmVhdGVDaGlsZFJvdXRlSGFuZGxlcjogZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgdmFyIHJvdXRlID0gdGhpcy5jb250ZXh0LmdldFJvdXRlQXREZXB0aCh0aGlzLmdldFJvdXRlRGVwdGgoKSk7XG4gICAgcmV0dXJuIHJvdXRlID8gUmVhY3QuY3JlYXRlRWxlbWVudChyb3V0ZS5oYW5kbGVyLCBhc3NpZ24oe30sIHByb3BzIHx8IHRoaXMucHJvcHMsIHsgcmVmOiBSRUZfTkFNRSB9KSkgOiBudWxsO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVIYW5kbGVyTWl4aW47XG4iLCIvKiBqc2hpbnQgLVcwODQgKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xudmFyIERlZmF1bHRSb3V0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9EZWZhdWx0Um91dGUnKTtcbnZhciBOb3RGb3VuZFJvdXRlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL05vdEZvdW5kUm91dGUnKTtcbnZhciBSZWRpcmVjdCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9SZWRpcmVjdCcpO1xudmFyIFBhdGggPSByZXF1aXJlKCcuL3V0aWxzL1BhdGgnKTtcblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvblRvSG9vayh0bywgX3BhcmFtcywgX3F1ZXJ5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAodHJhbnNpdGlvbiwgcGFyYW1zLCBxdWVyeSkge1xuICAgIHRyYW5zaXRpb24ucmVkaXJlY3QodG8sIF9wYXJhbXMgfHwgcGFyYW1zLCBfcXVlcnkgfHwgcXVlcnkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZShlbGVtZW50LCBwYXJlbnRSb3V0ZSwgbmFtZWRSb3V0ZXMpIHtcbiAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gIHZhciBwcm9wcyA9IGVsZW1lbnQucHJvcHM7XG5cbiAgaWYgKHR5cGUudmFsaWRhdGVQcm9wcylcbiAgICB0eXBlLnZhbGlkYXRlUHJvcHMocHJvcHMpO1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgaWdub3JlU2Nyb2xsQmVoYXZpb3I6ICEhcHJvcHMuaWdub3JlU2Nyb2xsQmVoYXZpb3JcbiAgfTtcblxuICBpZiAodHlwZSA9PT0gUmVkaXJlY3QudHlwZSkge1xuICAgIG9wdGlvbnMud2lsbFRyYW5zaXRpb25UbyA9IGNyZWF0ZVRyYW5zaXRpb25Ub0hvb2socHJvcHMudG8sIHByb3BzLnBhcmFtcywgcHJvcHMucXVlcnkpO1xuICAgIHByb3BzLnBhdGggPSBwcm9wcy5wYXRoIHx8IHByb3BzLmZyb20gfHwgJyonO1xuICB9IGVsc2Uge1xuICAgIG9wdGlvbnMuaGFuZGxlciA9IHByb3BzLmhhbmRsZXI7XG4gICAgb3B0aW9ucy53aWxsVHJhbnNpdGlvblRvID0gcHJvcHMuaGFuZGxlciAmJiBwcm9wcy5oYW5kbGVyLndpbGxUcmFuc2l0aW9uVG87XG4gICAgb3B0aW9ucy53aWxsVHJhbnNpdGlvbkZyb20gPSBwcm9wcy5oYW5kbGVyICYmIHByb3BzLmhhbmRsZXIud2lsbFRyYW5zaXRpb25Gcm9tO1xuICB9XG5cbiAgdmFyIHBhcmVudFBhdGggPSAocGFyZW50Um91dGUgJiYgcGFyZW50Um91dGUucGF0aCkgfHwgJy8nO1xuXG4gIGlmICgocHJvcHMucGF0aCB8fCBwcm9wcy5uYW1lKSAmJiB0eXBlICE9PSBEZWZhdWx0Um91dGUudHlwZSAmJiB0eXBlICE9PSBOb3RGb3VuZFJvdXRlLnR5cGUpIHtcbiAgICB2YXIgcGF0aCA9IHByb3BzLnBhdGggfHwgcHJvcHMubmFtZTtcblxuICAgIC8vIFJlbGF0aXZlIHBhdGhzIGV4dGVuZCB0aGVpciBwYXJlbnQuXG4gICAgaWYgKCFQYXRoLmlzQWJzb2x1dGUocGF0aCkpXG4gICAgICBwYXRoID0gUGF0aC5qb2luKHBhcmVudFBhdGgsIHBhdGgpO1xuXG4gICAgb3B0aW9ucy5wYXRoID0gUGF0aC5ub3JtYWxpemUocGF0aCk7XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucy5wYXRoID0gcGFyZW50UGF0aDtcblxuICAgIGlmICh0eXBlID09PSBOb3RGb3VuZFJvdXRlLnR5cGUpXG4gICAgICBvcHRpb25zLnBhdGggKz0gJyonO1xuICB9XG5cbiAgb3B0aW9ucy5wYXJhbU5hbWVzID0gUGF0aC5leHRyYWN0UGFyYW1OYW1lcyhvcHRpb25zLnBhdGgpO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGUgcm91dGUncyBwYXRoIGhhcyBhbGwgcGFyYW1zIGl0cyBwYXJlbnQgbmVlZHMuXG4gIGlmIChwYXJlbnRSb3V0ZSAmJiBBcnJheS5pc0FycmF5KHBhcmVudFJvdXRlLnBhcmFtTmFtZXMpKSB7XG4gICAgcGFyZW50Um91dGUucGFyYW1OYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbU5hbWUpIHtcbiAgICAgIGludmFyaWFudChcbiAgICAgICAgb3B0aW9ucy5wYXJhbU5hbWVzLmluZGV4T2YocGFyYW1OYW1lKSAhPT0gLTEsXG4gICAgICAgICdUaGUgbmVzdGVkIHJvdXRlIHBhdGggXCIlc1wiIGlzIG1pc3NpbmcgdGhlIFwiJXNcIiBwYXJhbWV0ZXIgb2YgaXRzIHBhcmVudCBwYXRoIFwiJXNcIicsXG4gICAgICAgIG9wdGlvbnMucGF0aCwgcGFyYW1OYW1lLCBwYXJlbnRSb3V0ZS5wYXRoXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHJvdXRlID0gbmV3IFJvdXRlKG9wdGlvbnMpO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGUgcm91dGUgY2FuIGJlIGxvb2tlZCB1cCBieSA8TGluaz5zLlxuICBpZiAocHJvcHMubmFtZSkge1xuICAgIGludmFyaWFudChcbiAgICAgIG5hbWVkUm91dGVzW3Byb3BzLm5hbWVdID09IG51bGwsXG4gICAgICAnWW91IGNhbm5vdCB1c2UgdGhlIG5hbWUgXCIlc1wiIGZvciBtb3JlIHRoYW4gb25lIHJvdXRlJyxcbiAgICAgIHByb3BzLm5hbWVcbiAgICApO1xuXG4gICAgbmFtZWRSb3V0ZXNbcHJvcHMubmFtZV0gPSByb3V0ZTtcbiAgfVxuXG4gIC8vIEhhbmRsZSA8Tm90Rm91bmRSb3V0ZT4uXG4gIGlmICh0eXBlID09PSBOb3RGb3VuZFJvdXRlLnR5cGUpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBwYXJlbnRSb3V0ZSxcbiAgICAgICc8Tm90Rm91bmRSb3V0ZT4gbXVzdCBoYXZlIGEgcGFyZW50IDxSb3V0ZT4nXG4gICAgKTtcblxuICAgIGludmFyaWFudChcbiAgICAgIHBhcmVudFJvdXRlLm5vdEZvdW5kUm91dGUgPT0gbnVsbCxcbiAgICAgICdZb3UgbWF5IG5vdCBoYXZlIG1vcmUgdGhhbiBvbmUgPE5vdEZvdW5kUm91dGU+IHBlciA8Um91dGU+J1xuICAgICk7XG5cbiAgICBpbnZhcmlhbnQoXG4gICAgICBwcm9wcy5jaGlsZHJlbiA9PSBudWxsLFxuICAgICAgJzxOb3RGb3VuZFJvdXRlPiBtdXN0IG5vdCBoYXZlIGNoaWxkcmVuJ1xuICAgICk7XG5cbiAgICBwYXJlbnRSb3V0ZS5ub3RGb3VuZFJvdXRlID0gcm91dGU7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhhbmRsZSA8RGVmYXVsdFJvdXRlPi5cbiAgaWYgKHR5cGUgPT09IERlZmF1bHRSb3V0ZS50eXBlKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgcGFyZW50Um91dGUsXG4gICAgICAnPERlZmF1bHRSb3V0ZT4gbXVzdCBoYXZlIGEgcGFyZW50IDxSb3V0ZT4nXG4gICAgKTtcblxuICAgIGludmFyaWFudChcbiAgICAgIHBhcmVudFJvdXRlLmRlZmF1bHRSb3V0ZSA9PSBudWxsLFxuICAgICAgJ1lvdSBtYXkgbm90IGhhdmUgbW9yZSB0aGFuIG9uZSA8RGVmYXVsdFJvdXRlPiBwZXIgPFJvdXRlPidcbiAgICApO1xuXG4gICAgaW52YXJpYW50KFxuICAgICAgcHJvcHMuY2hpbGRyZW4gPT0gbnVsbCxcbiAgICAgICc8RGVmYXVsdFJvdXRlPiBtdXN0IG5vdCBoYXZlIGNoaWxkcmVuJ1xuICAgICk7XG5cbiAgICBwYXJlbnRSb3V0ZS5kZWZhdWx0Um91dGUgPSByb3V0ZTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcm91dGUucm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4sIHJvdXRlLCBuYW1lZFJvdXRlcyk7XG5cbiAgcmV0dXJuIHJvdXRlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygcm91dGUgb2JqZWN0cyBmcm9tIHRoZSBnaXZlbiBSZWFjdENoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihjaGlsZHJlbiwgcGFyZW50Um91dGUsIG5hbWVkUm91dGVzKSB7XG4gIHZhciByb3V0ZXMgPSBbXTtcblxuICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAvLyBFeGNsdWRlIG51bGwgdmFsdWVzLCA8RGVmYXVsdFJvdXRlPnMgYW5kIDxOb3RGb3VuZFJvdXRlPnMuXG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiAoY2hpbGQgPSBjcmVhdGVSb3V0ZShjaGlsZCwgcGFyZW50Um91dGUsIG5hbWVkUm91dGVzKSkpXG4gICAgICByb3V0ZXMucHVzaChjaGlsZCk7XG4gIH0pO1xuXG4gIHJldHVybiByb3V0ZXM7XG59XG5cbmZ1bmN0aW9uIFJvdXRlKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICB0aGlzLnBhdGggPSBvcHRpb25zLnBhdGggfHwgJy8nO1xuICB0aGlzLnBhcmFtTmFtZXMgPSBvcHRpb25zLnBhcmFtTmFtZXMgfHwgUGF0aC5leHRyYWN0UGFyYW1OYW1lcyh0aGlzLnBhdGgpO1xuICB0aGlzLmlnbm9yZVNjcm9sbEJlaGF2aW9yID0gISFvcHRpb25zLmlnbm9yZVNjcm9sbEJlaGF2aW9yO1xuICB0aGlzLndpbGxUcmFuc2l0aW9uVG8gPSBvcHRpb25zLndpbGxUcmFuc2l0aW9uVG87XG4gIHRoaXMud2lsbFRyYW5zaXRpb25Gcm9tID0gb3B0aW9ucy53aWxsVHJhbnNpdGlvbkZyb207XG4gIHRoaXMuaGFuZGxlciA9IG9wdGlvbnMuaGFuZGxlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuOiBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbixcbiAgUm91dGU6IFJvdXRlXG59O1xuIiwidmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKS5jYW5Vc2VET007XG52YXIgZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24gPSByZXF1aXJlKCcuL3V0aWxzL2dldFdpbmRvd1Njcm9sbFBvc2l0aW9uJyk7XG5cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVNjcm9sbChzdGF0ZSwgcHJldlN0YXRlKSB7XG4gIGlmICghcHJldlN0YXRlKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIC8vIERvbid0IHVwZGF0ZSBzY3JvbGwgcG9zaXRpb24gd2hlbiBvbmx5IHRoZSBxdWVyeSBoYXMgY2hhbmdlZC5cbiAgaWYgKHN0YXRlLnBhdGhuYW1lID09PSBwcmV2U3RhdGUucGF0aG5hbWUpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciByb3V0ZXMgPSBzdGF0ZS5yb3V0ZXM7XG4gIHZhciBwcmV2Um91dGVzID0gcHJldlN0YXRlLnJvdXRlcztcblxuICB2YXIgc2hhcmVkQW5jZXN0b3JSb3V0ZXMgPSByb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHJldHVybiBwcmV2Um91dGVzLmluZGV4T2Yocm91dGUpICE9PSAtMTtcbiAgfSk7XG5cbiAgcmV0dXJuICFzaGFyZWRBbmNlc3RvclJvdXRlcy5zb21lKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHJldHVybiByb3V0ZS5pZ25vcmVTY3JvbGxCZWhhdmlvcjtcbiAgfSk7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHJvdXRlciB3aXRoIHRoZSBhYmlsaXR5IHRvIG1hbmFnZSB3aW5kb3cgc2Nyb2xsIHBvc2l0aW9uXG4gKiBhY2NvcmRpbmcgdG8gaXRzIHNjcm9sbCBiZWhhdmlvci5cbiAqL1xudmFyIFNjcm9sbGluZyA9IHtcblxuICBzdGF0aWNzOiB7XG4gICAgLyoqXG4gICAgICogUmVjb3JkcyBjdXJlbnQgc2Nyb2xsIHBvc2l0aW9uIGFzIHRoZSBsYXN0IGtub3duIHBvc2l0aW9uIGZvciB0aGUgZ2l2ZW4gVVJMIHBhdGguXG4gICAgICovXG4gICAgcmVjb3JkU2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICBpZiAoIXRoaXMuc2Nyb2xsSGlzdG9yeSlcbiAgICAgICAgdGhpcy5zY3JvbGxIaXN0b3J5ID0ge307XG5cbiAgICAgIHRoaXMuc2Nyb2xsSGlzdG9yeVtwYXRoXSA9IGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3Qga25vd24gc2Nyb2xsIHBvc2l0aW9uIGZvciB0aGUgZ2l2ZW4gVVJMIHBhdGguXG4gICAgICovXG4gICAgZ2V0U2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICBpZiAoIXRoaXMuc2Nyb2xsSGlzdG9yeSlcbiAgICAgICAgdGhpcy5zY3JvbGxIaXN0b3J5ID0ge307XG5cbiAgICAgIHJldHVybiB0aGlzLnNjcm9sbEhpc3RvcnlbcGF0aF0gfHwgbnVsbDtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgdGhpcy5nZXRTY3JvbGxCZWhhdmlvcigpID09IG51bGwgfHwgY2FuVXNlRE9NLFxuICAgICAgJ0Nhbm5vdCB1c2Ugc2Nyb2xsIGJlaGF2aW9yIHdpdGhvdXQgYSBET00nXG4gICAgKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbCgpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgdGhpcy5fdXBkYXRlU2Nyb2xsKHByZXZTdGF0ZSk7XG4gIH0sXG5cbiAgX3VwZGF0ZVNjcm9sbDogZnVuY3Rpb24gKHByZXZTdGF0ZSkge1xuICAgIGlmICghc2hvdWxkVXBkYXRlU2Nyb2xsKHRoaXMuc3RhdGUsIHByZXZTdGF0ZSkpXG4gICAgICByZXR1cm47XG5cbiAgICB2YXIgc2Nyb2xsQmVoYXZpb3IgPSB0aGlzLmdldFNjcm9sbEJlaGF2aW9yKCk7XG5cbiAgICBpZiAoc2Nyb2xsQmVoYXZpb3IpXG4gICAgICBzY3JvbGxCZWhhdmlvci51cGRhdGVTY3JvbGxQb3NpdGlvbihcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5nZXRTY3JvbGxQb3NpdGlvbih0aGlzLnN0YXRlLnBhdGgpLFxuICAgICAgICB0aGlzLnN0YXRlLmFjdGlvblxuICAgICAgKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbGluZztcbiIsInZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1Byb3BUeXBlcycpO1xuXG4vKipcbiAqIEEgbWl4aW4gZm9yIGNvbXBvbmVudHMgdGhhdCBuZWVkIHRvIGtub3cgdGhlIHBhdGgsIHJvdXRlcywgVVJMXG4gKiBwYXJhbXMgYW5kIHF1ZXJ5IHRoYXQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIHZhciBBYm91dExpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgbWl4aW5zOiBbIFJvdXRlci5TdGF0ZSBdLFxuICogICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICogICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICogICBcbiAqICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCdhYm91dCcpKVxuICogICAgICAgICBjbGFzc05hbWUgKz0gJyBpcy1hY3RpdmUnO1xuICogICBcbiAqICAgICAgIHJldHVybiBSZWFjdC5ET00uYSh7IGNsYXNzTmFtZTogY2xhc3NOYW1lIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICogICAgIH1cbiAqICAgfSk7XG4gKi9cbnZhciBTdGF0ZSA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICBnZXRDdXJyZW50UGF0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50Um91dGVzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRQYXRobmFtZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50UGFyYW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRRdWVyeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0FjdGl2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoLlxuICAgKi9cbiAgZ2V0UGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFBhdGgoKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgcm91dGVzIHRoYXQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXG4gICAqL1xuICBnZXRSb3V0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnRSb3V0ZXMoKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICBnZXRQYXRobmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFBhdGhuYW1lKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBVUkwgcGFyYW1zIHRoYXQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXG4gICAqL1xuICBnZXRQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnRQYXJhbXMoKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIHF1ZXJ5IHBhcmFtcyB0aGF0IGFyZSBjdXJyZW50bHkgYWN0aXZlLlxuICAgKi9cbiAgZ2V0UXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnRRdWVyeSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBIGhlbHBlciBtZXRob2QgdG8gZGV0ZXJtaW5lIGlmIGEgZ2l2ZW4gcm91dGUsIHBhcmFtcywgYW5kIHF1ZXJ5XG4gICAqIGFyZSBhY3RpdmUuXG4gICAqL1xuICBpc0FjdGl2ZTogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5pc0FjdGl2ZSh0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZTtcbiIsInZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG52YXIgUGF0aCA9IHJlcXVpcmUoJy4vdXRpbHMvUGF0aCcpO1xuXG5mdW5jdGlvbiByb3V0ZUlzQWN0aXZlKGFjdGl2ZVJvdXRlcywgcm91dGVOYW1lKSB7XG4gIHJldHVybiBhY3RpdmVSb3V0ZXMuc29tZShmdW5jdGlvbiAocm91dGUpIHtcbiAgICByZXR1cm4gcm91dGUubmFtZSA9PT0gcm91dGVOYW1lO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyYW1zQXJlQWN0aXZlKGFjdGl2ZVBhcmFtcywgcGFyYW1zKSB7XG4gIGZvciAodmFyIHByb3BlcnR5IGluIHBhcmFtcylcbiAgICBpZiAoU3RyaW5nKGFjdGl2ZVBhcmFtc1twcm9wZXJ0eV0pICE9PSBTdHJpbmcocGFyYW1zW3Byb3BlcnR5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5SXNBY3RpdmUoYWN0aXZlUXVlcnksIHF1ZXJ5KSB7XG4gIGZvciAodmFyIHByb3BlcnR5IGluIHF1ZXJ5KVxuICAgIGlmIChTdHJpbmcoYWN0aXZlUXVlcnlbcHJvcGVydHldKSAhPT0gU3RyaW5nKHF1ZXJ5W3Byb3BlcnR5XSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHJvdXRlciB3aXRoIGNvbnRleHQgZm9yIFJvdXRlci5TdGF0ZS5cbiAqL1xudmFyIFN0YXRlQ29udGV4dCA9IHtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCArIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIGdldEN1cnJlbnRQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucGF0aDtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHJlYWQtb25seSBhcnJheSBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSByb3V0ZXMuXG4gICAqL1xuICBnZXRDdXJyZW50Um91dGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucm91dGVzLnNsaWNlKDApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoIHdpdGhvdXQgdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIGdldEN1cnJlbnRQYXRobmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnBhdGhuYW1lO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmVhZC1vbmx5IG9iamVjdCBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBVUkwgcGFyYW1ldGVycy5cbiAgICovXG4gIGdldEN1cnJlbnRQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXNzaWduKHt9LCB0aGlzLnN0YXRlLnBhcmFtcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByZWFkLW9ubHkgb2JqZWN0IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRDdXJyZW50UXVlcnk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXNzaWduKHt9LCB0aGlzLnN0YXRlLnF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiByb3V0ZSwgcGFyYW1zLCBhbmQgcXVlcnkgYXJlIGFjdGl2ZS5cbiAgICovXG4gIGlzQWN0aXZlOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICBpZiAoUGF0aC5pc0Fic29sdXRlKHRvKSlcbiAgICAgIHJldHVybiB0byA9PT0gdGhpcy5zdGF0ZS5wYXRoO1xuXG4gICAgcmV0dXJuIHJvdXRlSXNBY3RpdmUodGhpcy5zdGF0ZS5yb3V0ZXMsIHRvKSAmJlxuICAgICAgcGFyYW1zQXJlQWN0aXZlKHRoaXMuc3RhdGUucGFyYW1zLCBwYXJhbXMpICYmXG4gICAgICAocXVlcnkgPT0gbnVsbCB8fCBxdWVyeUlzQWN0aXZlKHRoaXMuc3RhdGUucXVlcnksIHF1ZXJ5KSk7XG4gIH0sXG5cbiAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICBnZXRDdXJyZW50UGF0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50Um91dGVzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRQYXRobmFtZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRDdXJyZW50UGFyYW1zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRRdWVyeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0FjdGl2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRDdXJyZW50UGF0aDogdGhpcy5nZXRDdXJyZW50UGF0aCxcbiAgICAgIGdldEN1cnJlbnRSb3V0ZXM6IHRoaXMuZ2V0Q3VycmVudFJvdXRlcyxcbiAgICAgIGdldEN1cnJlbnRQYXRobmFtZTogdGhpcy5nZXRDdXJyZW50UGF0aG5hbWUsXG4gICAgICBnZXRDdXJyZW50UGFyYW1zOiB0aGlzLmdldEN1cnJlbnRQYXJhbXMsXG4gICAgICBnZXRDdXJyZW50UXVlcnk6IHRoaXMuZ2V0Q3VycmVudFF1ZXJ5LFxuICAgICAgaXNBY3RpdmU6IHRoaXMuaXNBY3RpdmVcbiAgICB9O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVDb250ZXh0O1xuIiwiLyoganNoaW50IC1XMDU4ICovXG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbnZhciBSZWRpcmVjdCA9IHJlcXVpcmUoJy4vUmVkaXJlY3QnKTtcblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYSB0cmFuc2l0aW9uIHRvIGEgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBUaGUgd2lsbFRyYW5zaXRpb25UbyBhbmQgd2lsbFRyYW5zaXRpb25Gcm9tIGhhbmRsZXJzIHJlY2VpdmVcbiAqIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgYXMgdGhlaXIgZmlyc3QgYXJndW1lbnQuXG4gKi9cbmZ1bmN0aW9uIFRyYW5zaXRpb24ocGF0aCwgcmV0cnkpIHtcbiAgdGhpcy5wYXRoID0gcGF0aDtcbiAgdGhpcy5hYm9ydFJlYXNvbiA9IG51bGw7XG4gIHRoaXMucmV0cnkgPSByZXRyeS5iaW5kKHRoaXMpO1xufVxuXG5hc3NpZ24oVHJhbnNpdGlvbi5wcm90b3R5cGUsIHtcblxuICBhYm9ydDogZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIGlmICh0aGlzLmFib3J0UmVhc29uID09IG51bGwpXG4gICAgICB0aGlzLmFib3J0UmVhc29uID0gcmVhc29uIHx8ICdBQk9SVCc7XG4gIH0sXG5cbiAgcmVkaXJlY3Q6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHRoaXMuYWJvcnQobmV3IFJlZGlyZWN0KHRvLCBwYXJhbXMsIHF1ZXJ5KSk7XG4gIH0sXG5cbiAgZnJvbTogZnVuY3Rpb24gKHJvdXRlcywgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcnVuSG9va3MgPSByb3V0ZXMucmVkdWNlKGZ1bmN0aW9uIChjYWxsYmFjaywgcm91dGUsIGluZGV4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciB8fCBzZWxmLmFib3J0UmVhc29uKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLndpbGxUcmFuc2l0aW9uRnJvbSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByb3V0ZS53aWxsVHJhbnNpdGlvbkZyb20oc2VsZiwgY29tcG9uZW50c1tpbmRleF0sIGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY2FsbGJhY2sgaW4gdGhlIGFyZ3VtZW50IGxpc3QsIGNhbGwgaXQgYXV0b21hdGljYWxseS5cbiAgICAgICAgICAgIGlmIChyb3V0ZS53aWxsVHJhbnNpdGlvbkZyb20ubGVuZ3RoIDwgMylcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCBjYWxsYmFjayk7XG5cbiAgICBydW5Ib29rcygpO1xuICB9LFxuXG4gIHRvOiBmdW5jdGlvbiAocm91dGVzLCBwYXJhbXMsIHF1ZXJ5LCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBydW5Ib29rcyA9IHJvdXRlcy5yZWR1Y2VSaWdodChmdW5jdGlvbiAoY2FsbGJhY2ssIHJvdXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciB8fCBzZWxmLmFib3J0UmVhc29uKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLndpbGxUcmFuc2l0aW9uVG8pIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcm91dGUud2lsbFRyYW5zaXRpb25UbyhzZWxmLCBwYXJhbXMsIHF1ZXJ5LCBjYWxsYmFjayk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGNhbGxiYWNrIGluIHRoZSBhcmd1bWVudCBsaXN0LCBjYWxsIGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICAgICAgICBpZiAocm91dGUud2lsbFRyYW5zaXRpb25Uby5sZW5ndGggPCA0KVxuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sIGNhbGxiYWNrKTtcblxuICAgIHJ1bkhvb2tzKCk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbjtcbiIsIi8qKlxuICogQWN0aW9ucyB0aGF0IG1vZGlmeSB0aGUgVVJMLlxuICovXG52YXIgTG9jYXRpb25BY3Rpb25zID0ge1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgYSBuZXcgbG9jYXRpb24gaXMgYmVpbmcgcHVzaGVkIHRvIHRoZSBoaXN0b3J5IHN0YWNrLlxuICAgKi9cbiAgUFVTSDogJ3B1c2gnLFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIGN1cnJlbnQgbG9jYXRpb24gc2hvdWxkIGJlIHJlcGxhY2VkLlxuICAgKi9cbiAgUkVQTEFDRTogJ3JlcGxhY2UnLFxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIG1vc3QgcmVjZW50IGVudHJ5IHNob3VsZCBiZSByZW1vdmVkIGZyb20gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAqL1xuICBQT1A6ICdwb3AnXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTG9jYXRpb25BY3Rpb25zO1xuIiwidmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zJyk7XG5cbi8qKlxuICogQSBzY3JvbGwgYmVoYXZpb3IgdGhhdCBhdHRlbXB0cyB0byBpbWl0YXRlIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG4gKiBvZiBtb2Rlcm4gYnJvd3NlcnMuXG4gKi9cbnZhciBJbWl0YXRlQnJvd3NlckJlaGF2aW9yID0ge1xuXG4gIHVwZGF0ZVNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbiAocG9zaXRpb24sIGFjdGlvblR5cGUpIHtcbiAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgTG9jYXRpb25BY3Rpb25zLlBVU0g6XG4gICAgICBjYXNlIExvY2F0aW9uQWN0aW9ucy5SRVBMQUNFOlxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2NhdGlvbkFjdGlvbnMuUE9QOlxuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltaXRhdGVCcm93c2VyQmVoYXZpb3I7XG4iLCIvKipcbiAqIEEgc2Nyb2xsIGJlaGF2aW9yIHRoYXQgYWx3YXlzIHNjcm9sbHMgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZVxuICogYWZ0ZXIgYSB0cmFuc2l0aW9uLlxuICovXG52YXIgU2Nyb2xsVG9Ub3BCZWhhdmlvciA9IHtcblxuICB1cGRhdGVTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbFRvVG9wQmVoYXZpb3I7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIENvbmZpZ3VyYXRpb24gPSByZXF1aXJlKCcuLi9Db25maWd1cmF0aW9uJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi4vUHJvcFR5cGVzJyk7XG5cbi8qKlxuICogQSA8RGVmYXVsdFJvdXRlPiBjb21wb25lbnQgaXMgYSBzcGVjaWFsIGtpbmQgb2YgPFJvdXRlPiB0aGF0XG4gKiByZW5kZXJzIHdoZW4gaXRzIHBhcmVudCBtYXRjaGVzIGJ1dCBub25lIG9mIGl0cyBzaWJsaW5ncyBkby5cbiAqIE9ubHkgb25lIHN1Y2ggcm91dGUgbWF5IGJlIHVzZWQgYXQgYW55IGdpdmVuIGxldmVsIGluIHRoZVxuICogcm91dGUgaGllcmFyY2h5LlxuICovXG52YXIgRGVmYXVsdFJvdXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGRpc3BsYXlOYW1lOiAnRGVmYXVsdFJvdXRlJyxcblxuICBtaXhpbnM6IFsgQ29uZmlndXJhdGlvbiBdLFxuXG4gIHByb3BUeXBlczoge1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGF0aDogUHJvcFR5cGVzLmZhbHN5LFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZmFsc3ksXG4gICAgaGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlZmF1bHRSb3V0ZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgY2xhc3NTZXQgPSByZXF1aXJlKCdyZWFjdC9saWIvY3gnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbicpO1xudmFyIE5hdmlnYXRpb24gPSByZXF1aXJlKCcuLi9OYXZpZ2F0aW9uJyk7XG52YXIgU3RhdGUgPSByZXF1aXJlKCcuLi9TdGF0ZScpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4uL1Byb3BUeXBlcycpO1xuXG5mdW5jdGlvbiBpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5idXR0b24gPT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59XG5cbi8qKlxuICogPExpbms+IGNvbXBvbmVudHMgYXJlIHVzZWQgdG8gY3JlYXRlIGFuIDxhPiBlbGVtZW50IHRoYXQgbGlua3MgdG8gYSByb3V0ZS5cbiAqIFdoZW4gdGhhdCByb3V0ZSBpcyBhY3RpdmUsIHRoZSBsaW5rIGdldHMgYW4gXCJhY3RpdmVcIiBjbGFzcyBuYW1lIChvciB0aGVcbiAqIHZhbHVlIG9mIGl0cyBgYWN0aXZlQ2xhc3NOYW1lYCBwcm9wKS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgYXNzdW1pbmcgeW91IGhhdmUgdGhlIGZvbGxvd2luZyByb3V0ZTpcbiAqXG4gKiAgIDxSb3V0ZSBuYW1lPVwic2hvd1Bvc3RcIiBwYXRoPVwiL3Bvc3RzLzpwb3N0SURcIiBoYW5kbGVyPXtQb3N0fS8+XG4gKlxuICogWW91IGNvdWxkIHVzZSB0aGUgZm9sbG93aW5nIGNvbXBvbmVudCB0byBsaW5rIHRvIHRoYXQgcm91dGU6XG4gKlxuICogICA8TGluayB0bz1cInNob3dQb3N0XCIgcGFyYW1zPXt7IHBvc3RJRDogXCIxMjNcIiB9fSAvPlxuICpcbiAqIEluIGFkZGl0aW9uIHRvIHBhcmFtcywgbGlua3MgbWF5IHBhc3MgYWxvbmcgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAqIHVzaW5nIHRoZSBgcXVlcnlgIHByb3AuXG4gKlxuICogICA8TGluayB0bz1cInNob3dQb3N0XCIgcGFyYW1zPXt7IHBvc3RJRDogXCIxMjNcIiB9fSBxdWVyeT17eyBzaG93OnRydWUgfX0vPlxuICovXG52YXIgTGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBkaXNwbGF5TmFtZTogJ0xpbmsnLFxuXG4gIG1peGluczogWyBOYXZpZ2F0aW9uLCBTdGF0ZSBdLFxuXG4gIHByb3BUeXBlczoge1xuICAgIGFjdGl2ZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRvOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcGFyYW1zOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHF1ZXJ5OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jXG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGl2ZUNsYXNzTmFtZTogJ2FjdGl2ZSdcbiAgICB9O1xuICB9LFxuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgYWxsb3dUcmFuc2l0aW9uID0gdHJ1ZTtcbiAgICB2YXIgY2xpY2tSZXN1bHQ7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKVxuICAgICAgY2xpY2tSZXN1bHQgPSB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpO1xuXG4gICAgaWYgKGlzTW9kaWZpZWRFdmVudChldmVudCkgfHwgIWlzTGVmdENsaWNrRXZlbnQoZXZlbnQpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKGNsaWNrUmVzdWx0ID09PSBmYWxzZSB8fCBldmVudC5kZWZhdWx0UHJldmVudGVkID09PSB0cnVlKVxuICAgICAgYWxsb3dUcmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKGFsbG93VHJhbnNpdGlvbilcbiAgICAgIHRoaXMudHJhbnNpdGlvblRvKHRoaXMucHJvcHMudG8sIHRoaXMucHJvcHMucGFyYW1zLCB0aGlzLnByb3BzLnF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIFwiaHJlZlwiIGF0dHJpYnV0ZSB0byB1c2Ugb24gdGhlIERPTSBlbGVtZW50LlxuICAgKi9cbiAgZ2V0SHJlZjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1ha2VIcmVmKHRoaXMucHJvcHMudG8sIHRoaXMucHJvcHMucGFyYW1zLCB0aGlzLnByb3BzLnF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIFwiY2xhc3NcIiBhdHRyaWJ1dGUgdG8gdXNlIG9uIHRoZSBET00gZWxlbWVudCwgd2hpY2ggY29udGFpbnNcbiAgICogdGhlIHZhbHVlIG9mIHRoZSBhY3RpdmVDbGFzc05hbWUgcHJvcGVydHkgd2hlbiB0aGlzIDxMaW5rPiBpcyBhY3RpdmUuXG4gICAqL1xuICBnZXRDbGFzc05hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2xhc3NOYW1lcyA9IHt9O1xuXG4gICAgaWYgKHRoaXMucHJvcHMuY2xhc3NOYW1lKVxuICAgICAgY2xhc3NOYW1lc1t0aGlzLnByb3BzLmNsYXNzTmFtZV0gPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUodGhpcy5wcm9wcy50bywgdGhpcy5wcm9wcy5wYXJhbXMsIHRoaXMucHJvcHMucXVlcnkpKVxuICAgICAgY2xhc3NOYW1lc1t0aGlzLnByb3BzLmFjdGl2ZUNsYXNzTmFtZV0gPSB0cnVlO1xuXG4gICAgcmV0dXJuIGNsYXNzU2V0KGNsYXNzTmFtZXMpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9wcyA9IGFzc2lnbih7fSwgdGhpcy5wcm9wcywge1xuICAgICAgaHJlZjogdGhpcy5nZXRIcmVmKCksXG4gICAgICBjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3NOYW1lKCksXG4gICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrXG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmVhY3QuRE9NLmEocHJvcHMsIHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbms7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIENvbmZpZ3VyYXRpb24gPSByZXF1aXJlKCcuLi9Db25maWd1cmF0aW9uJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi4vUHJvcFR5cGVzJyk7XG5cbi8qKlxuICogQSA8Tm90Rm91bmRSb3V0ZT4gaXMgYSBzcGVjaWFsIGtpbmQgb2YgPFJvdXRlPiB0aGF0XG4gKiByZW5kZXJzIHdoZW4gdGhlIGJlZ2lubmluZyBvZiBpdHMgcGFyZW50J3MgcGF0aCBtYXRjaGVzXG4gKiBidXQgbm9uZSBvZiBpdHMgc2libGluZ3MgZG8sIGluY2x1ZGluZyBhbnkgPERlZmF1bHRSb3V0ZT4uXG4gKiBPbmx5IG9uZSBzdWNoIHJvdXRlIG1heSBiZSB1c2VkIGF0IGFueSBnaXZlbiBsZXZlbCBpbiB0aGVcbiAqIHJvdXRlIGhpZXJhcmNoeS5cbiAqL1xudmFyIE5vdEZvdW5kUm91dGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZGlzcGxheU5hbWU6ICdOb3RGb3VuZFJvdXRlJyxcblxuICBtaXhpbnM6IFsgQ29uZmlndXJhdGlvbiBdLFxuXG4gIHByb3BUeXBlczoge1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGF0aDogUHJvcFR5cGVzLmZhbHN5LFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZmFsc3ksXG4gICAgaGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdEZvdW5kUm91dGU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIENvbmZpZ3VyYXRpb24gPSByZXF1aXJlKCcuLi9Db25maWd1cmF0aW9uJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi4vUHJvcFR5cGVzJyk7XG5cbi8qKlxuICogQSA8UmVkaXJlY3Q+IGNvbXBvbmVudCBpcyBhIHNwZWNpYWwga2luZCBvZiA8Um91dGU+IHRoYXQgYWx3YXlzXG4gKiByZWRpcmVjdHMgdG8gYW5vdGhlciByb3V0ZSB3aGVuIGl0IG1hdGNoZXMuXG4gKi9cbnZhciBSZWRpcmVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBkaXNwbGF5TmFtZTogJ1JlZGlyZWN0JyxcblxuICBtaXhpbnM6IFsgQ29uZmlndXJhdGlvbiBdLFxuXG4gIHByb3BUeXBlczoge1xuICAgIHBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZnJvbTogUHJvcFR5cGVzLnN0cmluZywgLy8gQWxpYXMgZm9yIHBhdGguXG4gICAgdG86IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGFuZGxlcjogUHJvcFR5cGVzLmZhbHN5XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVkaXJlY3Q7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIENvbmZpZ3VyYXRpb24gPSByZXF1aXJlKCcuLi9Db25maWd1cmF0aW9uJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi4vUHJvcFR5cGVzJyk7XG52YXIgUm91dGVIYW5kbGVyID0gcmVxdWlyZSgnLi9Sb3V0ZUhhbmRsZXInKTtcbi8qKlxuICogPFJvdXRlPiBjb21wb25lbnRzIHNwZWNpZnkgY29tcG9uZW50cyB0aGF0IGFyZSByZW5kZXJlZCB0byB0aGUgcGFnZSB3aGVuIHRoZVxuICogVVJMIG1hdGNoZXMgYSBnaXZlbiBwYXR0ZXJuLlxuICpcbiAqIFJvdXRlcyBhcmUgYXJyYW5nZWQgaW4gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUuIFdoZW4gYSBuZXcgVVJMIGlzIHJlcXVlc3RlZCxcbiAqIHRoZSB0cmVlIGlzIHNlYXJjaGVkIGRlcHRoLWZpcnN0IHRvIGZpbmQgYSByb3V0ZSB3aG9zZSBwYXRoIG1hdGNoZXMgdGhlIFVSTC5cbiAqIFdoZW4gb25lIGlzIGZvdW5kLCBhbGwgcm91dGVzIGluIHRoZSB0cmVlIHRoYXQgbGVhZCB0byBpdCBhcmUgY29uc2lkZXJlZFxuICogXCJhY3RpdmVcIiBhbmQgdGhlaXIgY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgaW50byB0aGUgRE9NLCBuZXN0ZWQgaW4gdGhlIHNhbWVcbiAqIG9yZGVyIGFzIHRoZXkgYXJlIGluIHRoZSB0cmVlLlxuICpcbiAqIFRoZSBwcmVmZXJyZWQgd2F5IHRvIGNvbmZpZ3VyZSBhIHJvdXRlciBpcyB1c2luZyBKU1guIFRoZSBYTUwtbGlrZSBzeW50YXggaXNcbiAqIGEgZ3JlYXQgd2F5IHRvIHZpc3VhbGl6ZSBob3cgcm91dGVzIGFyZSBsYWlkIG91dCBpbiBhbiBhcHBsaWNhdGlvbi5cbiAqXG4gKiAgIHZhciByb3V0ZXMgPSBbXG4gKiAgICAgPFJvdXRlIGhhbmRsZXI9e0FwcH0+XG4gKiAgICAgICA8Um91dGUgbmFtZT1cImxvZ2luXCIgaGFuZGxlcj17TG9naW59Lz5cbiAqICAgICAgIDxSb3V0ZSBuYW1lPVwibG9nb3V0XCIgaGFuZGxlcj17TG9nb3V0fS8+XG4gKiAgICAgICA8Um91dGUgbmFtZT1cImFib3V0XCIgaGFuZGxlcj17QWJvdXR9Lz5cbiAqICAgICA8L1JvdXRlPlxuICogICBdO1xuICogICBcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXMsIGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgUmVhY3QucmVuZGVyKDxIYW5kbGVyLz4sIGRvY3VtZW50LmJvZHkpO1xuICogICB9KTtcbiAqXG4gKiBIYW5kbGVycyBmb3IgUm91dGUgY29tcG9uZW50cyB0aGF0IGNvbnRhaW4gY2hpbGRyZW4gY2FuIHJlbmRlciB0aGVpciBhY3RpdmVcbiAqIGNoaWxkIHJvdXRlIHVzaW5nIGEgPFJvdXRlSGFuZGxlcj4gZWxlbWVudC5cbiAqXG4gKiAgIHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICByZXR1cm4gKFxuICogICAgICAgICA8ZGl2IGNsYXNzPVwiYXBwbGljYXRpb25cIj5cbiAqICAgICAgICAgICA8Um91dGVIYW5kbGVyLz5cbiAqICAgICAgICAgPC9kaXY+XG4gKiAgICAgICApO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogSWYgbm8gaGFuZGxlciBpcyBwcm92aWRlZCBmb3IgdGhlIHJvdXRlLCBpdCB3aWxsIHJlbmRlciBhIG1hdGNoZWQgY2hpbGQgcm91dGUuXG4gKi9cbnZhciBSb3V0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBkaXNwbGF5TmFtZTogJ1JvdXRlJyxcblxuICBtaXhpbnM6IFsgQ29uZmlndXJhdGlvbiBdLFxuXG4gIHByb3BUeXBlczoge1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGF0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoYW5kbGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpZ25vcmVTY3JvbGxCZWhhdmlvcjogUHJvcFR5cGVzLmJvb2xcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhbmRsZXI6IFJvdXRlSGFuZGxlclxuICAgIH07XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJvdXRlSGFuZGxlck1peGluID0gcmVxdWlyZSgnLi4vUm91dGVIYW5kbGVyTWl4aW4nKTtcblxuLyoqXG4gKiBBIDxSb3V0ZUhhbmRsZXI+IGNvbXBvbmVudCByZW5kZXJzIHRoZSBhY3RpdmUgY2hpbGQgcm91dGUgaGFuZGxlclxuICogd2hlbiByb3V0ZXMgYXJlIG5lc3RlZC5cbiAqL1xudmFyIFJvdXRlSGFuZGxlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBkaXNwbGF5TmFtZTogJ1JvdXRlSGFuZGxlcicsXG5cbiAgbWl4aW5zOiBbIFJvdXRlSGFuZGxlck1peGluIF0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGRSb3V0ZUhhbmRsZXIoKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZUhhbmRsZXI7XG4iLCIvKiBqc2hpbnQgLVcwNTggKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi93YXJuaW5nJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpLmNhblVzZURPTTtcbnZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zJyk7XG52YXIgSW1pdGF0ZUJyb3dzZXJCZWhhdmlvciA9IHJlcXVpcmUoJy4vYmVoYXZpb3JzL0ltaXRhdGVCcm93c2VyQmVoYXZpb3InKTtcbnZhciBIYXNoTG9jYXRpb24gPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9IYXNoTG9jYXRpb24nKTtcbnZhciBIaXN0b3J5TG9jYXRpb24gPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9IaXN0b3J5TG9jYXRpb24nKTtcbnZhciBSZWZyZXNoTG9jYXRpb24gPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24nKTtcbnZhciBOYXZpZ2F0aW9uQ29udGV4dCA9IHJlcXVpcmUoJy4vTmF2aWdhdGlvbkNvbnRleHQnKTtcbnZhciBTdGF0ZUNvbnRleHQgPSByZXF1aXJlKCcuL1N0YXRlQ29udGV4dCcpO1xudmFyIFNjcm9sbGluZyA9IHJlcXVpcmUoJy4vU2Nyb2xsaW5nJyk7XG52YXIgY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JvdXRpbmcnKS5jcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbjtcbnZhciBpc1JlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL2lzUmVhY3RDaGlsZHJlbicpO1xudmFyIFRyYW5zaXRpb24gPSByZXF1aXJlKCcuL1RyYW5zaXRpb24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1Byb3BUeXBlcycpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZSgnLi9SZWRpcmVjdCcpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKCcuL0hpc3RvcnknKTtcbnZhciBDYW5jZWxsYXRpb24gPSByZXF1aXJlKCcuL0NhbmNlbGxhdGlvbicpO1xudmFyIHN1cHBvcnRzSGlzdG9yeSA9IHJlcXVpcmUoJy4vdXRpbHMvc3VwcG9ydHNIaXN0b3J5Jyk7XG52YXIgUGF0aCA9IHJlcXVpcmUoJy4vdXRpbHMvUGF0aCcpO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGxvY2F0aW9uIGZvciBuZXcgcm91dGVycy5cbiAqL1xudmFyIERFRkFVTFRfTE9DQVRJT04gPSBjYW5Vc2VET00gPyBIYXNoTG9jYXRpb24gOiAnLyc7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgc2Nyb2xsIGJlaGF2aW9yIGZvciBuZXcgcm91dGVycy5cbiAqL1xudmFyIERFRkFVTFRfU0NST0xMX0JFSEFWSU9SID0gY2FuVXNlRE9NID8gSW1pdGF0ZUJyb3dzZXJCZWhhdmlvciA6IG51bGw7XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hdGNoKHJvdXRlLCBwYXJhbXMsIHBhdGhuYW1lLCBxdWVyeSkge1xuICByZXR1cm4ge1xuICAgIHJvdXRlczogWyByb3V0ZSBdLFxuICAgIHBhcmFtczogcGFyYW1zLFxuICAgIHBhdGhuYW1lOiBwYXRobmFtZSxcbiAgICBxdWVyeTogcXVlcnlcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoKHJvdXRlcywgZGVmYXVsdFJvdXRlLCBub3RGb3VuZFJvdXRlLCBwYXRobmFtZSwgcXVlcnkpIHtcbiAgdmFyIHJvdXRlLCBtYXRjaCwgcGFyYW1zO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSByb3V0ZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICByb3V0ZSA9IHJvdXRlc1tpXTtcblxuICAgIC8vIENoZWNrIHRoZSBzdWJ0cmVlIGZpcnN0IHRvIGZpbmQgdGhlIG1vc3QgZGVlcGx5LW5lc3RlZCBtYXRjaC5cbiAgICBtYXRjaCA9IGZpbmRNYXRjaChyb3V0ZS5yb3V0ZXMsIHJvdXRlLmRlZmF1bHRSb3V0ZSwgcm91dGUubm90Rm91bmRSb3V0ZSwgcGF0aG5hbWUsIHF1ZXJ5KTtcblxuICAgIGlmIChtYXRjaCAhPSBudWxsKSB7XG4gICAgICBtYXRjaC5yb3V0ZXMudW5zaGlmdChyb3V0ZSk7XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfVxuXG4gICAgLy8gTm8gcm91dGVzIGluIHRoZSBzdWJ0cmVlIG1hdGNoZWQsIHNvIGNoZWNrIHRoaXMgcm91dGUuXG4gICAgcGFyYW1zID0gUGF0aC5leHRyYWN0UGFyYW1zKHJvdXRlLnBhdGgsIHBhdGhuYW1lKTtcblxuICAgIGlmIChwYXJhbXMpXG4gICAgICByZXR1cm4gY3JlYXRlTWF0Y2gocm91dGUsIHBhcmFtcywgcGF0aG5hbWUsIHF1ZXJ5KTtcbiAgfVxuXG4gIC8vIE5vIHJvdXRlcyBtYXRjaGVkLCBzbyB0cnkgdGhlIGRlZmF1bHQgcm91dGUgaWYgdGhlcmUgaXMgb25lLlxuICBpZiAoZGVmYXVsdFJvdXRlICYmIChwYXJhbXMgPSBQYXRoLmV4dHJhY3RQYXJhbXMoZGVmYXVsdFJvdXRlLnBhdGgsIHBhdGhuYW1lKSkpXG4gICAgcmV0dXJuIGNyZWF0ZU1hdGNoKGRlZmF1bHRSb3V0ZSwgcGFyYW1zLCBwYXRobmFtZSwgcXVlcnkpO1xuXG4gIC8vIExhc3QgYXR0ZW1wdDogZG9lcyB0aGUgXCJub3QgZm91bmRcIiByb3V0ZSBtYXRjaD9cbiAgaWYgKG5vdEZvdW5kUm91dGUgJiYgKHBhcmFtcyA9IFBhdGguZXh0cmFjdFBhcmFtcyhub3RGb3VuZFJvdXRlLnBhdGgsIHBhdGhuYW1lKSkpXG4gICAgcmV0dXJuIGNyZWF0ZU1hdGNoKG5vdEZvdW5kUm91dGUsIHBhcmFtcywgcGF0aG5hbWUsIHF1ZXJ5KTtcblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFzUHJvcGVydGllcyhvYmplY3QsIHByb3BlcnRpZXMpIHtcbiAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpXG4gICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiBvYmplY3RbcHJvcGVydHlOYW1lXSAhPT0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBoYXNNYXRjaChyb3V0ZXMsIHJvdXRlLCBwcmV2UGFyYW1zLCBuZXh0UGFyYW1zLCBwcmV2UXVlcnksIG5leHRRdWVyeSkge1xuICByZXR1cm4gcm91dGVzLnNvbWUoZnVuY3Rpb24gKHIpIHtcbiAgICBpZiAociAhPT0gcm91dGUpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgcGFyYW1OYW1lcyA9IHJvdXRlLnBhcmFtTmFtZXM7XG4gICAgdmFyIHBhcmFtTmFtZTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IGFsbCBwYXJhbXMgdGhlIHJvdXRlIGNhcmVzIGFib3V0IGRpZCBub3QgY2hhbmdlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXJhbU5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWVzW2ldO1xuXG4gICAgICBpZiAobmV4dFBhcmFtc1twYXJhbU5hbWVdICE9PSBwcmV2UGFyYW1zW3BhcmFtTmFtZV0pXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhlIHF1ZXJ5IGhhc24ndCBjaGFuZ2VkLlxuICAgIHJldHVybiBoYXNQcm9wZXJ0aWVzKHByZXZRdWVyeSwgbmV4dFF1ZXJ5KSAmJiBoYXNQcm9wZXJ0aWVzKG5leHRRdWVyeSwgcHJldlF1ZXJ5KTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyByb3V0ZXIgdXNpbmcgdGhlIGdpdmVuIG9wdGlvbnMuIEEgcm91dGVyXG4gKiBpcyBhIFJlYWN0Q29tcG9uZW50IGNsYXNzIHRoYXQga25vd3MgaG93IHRvIHJlYWN0IHRvIGNoYW5nZXMgaW4gdGhlXG4gKiBVUkwgYW5kIGtlZXAgdGhlIGNvbnRlbnRzIG9mIHRoZSBwYWdlIGluIHN5bmMuXG4gKlxuICogT3B0aW9ucyBtYXkgYmUgYW55IG9mIHRoZSBmb2xsb3dpbmc6XG4gKlxuICogLSByb3V0ZXMgICAgICAgICAgIChyZXF1aXJlZCkgVGhlIHJvdXRlIGNvbmZpZ1xuICogLSBsb2NhdGlvbiAgICAgICAgIFRoZSBsb2NhdGlvbiB0byB1c2UuIERlZmF1bHRzIHRvIEhhc2hMb2NhdGlvbiB3aGVuXG4gKiAgICAgICAgICAgICAgICAgICAgdGhlIERPTSBpcyBhdmFpbGFibGUsIFwiL1wiIG90aGVyd2lzZVxuICogLSBzY3JvbGxCZWhhdmlvciAgIFRoZSBzY3JvbGwgYmVoYXZpb3IgdG8gdXNlLiBEZWZhdWx0cyB0byBJbWl0YXRlQnJvd3NlckJlaGF2aW9yXG4gKiAgICAgICAgICAgICAgICAgICAgd2hlbiB0aGUgRE9NIGlzIGF2YWlsYWJsZSwgbnVsbCBvdGhlcndpc2VcbiAqIC0gb25FcnJvciAgICAgICAgICBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBoYW5kbGUgZXJyb3JzXG4gKiAtIG9uQWJvcnQgICAgICAgICAgQSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gaGFuZGxlIGFib3J0ZWQgdHJhbnNpdGlvbnNcbiAqXG4gKiBXaGVuIHJlbmRlcmluZyBpbiBhIHNlcnZlci1zaWRlIGVudmlyb25tZW50LCB0aGUgbG9jYXRpb24gc2hvdWxkIHNpbXBseVxuICogYmUgdGhlIFVSTCBwYXRoIHRoYXQgd2FzIHVzZWQgaW4gdGhlIHJlcXVlc3QsIGluY2x1ZGluZyB0aGUgcXVlcnkgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXIob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoaXNSZWFjdENoaWxkcmVuKG9wdGlvbnMpKVxuICAgIG9wdGlvbnMgPSB7IHJvdXRlczogb3B0aW9ucyB9O1xuXG4gIHZhciBtb3VudGVkQ29tcG9uZW50cyA9IFtdO1xuICB2YXIgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IERFRkFVTFRfTE9DQVRJT047XG4gIHZhciBzY3JvbGxCZWhhdmlvciA9IG9wdGlvbnMuc2Nyb2xsQmVoYXZpb3IgfHwgREVGQVVMVF9TQ1JPTExfQkVIQVZJT1I7XG4gIHZhciBzdGF0ZSA9IHt9O1xuICB2YXIgbmV4dFN0YXRlID0ge307XG4gIHZhciBwZW5kaW5nVHJhbnNpdGlvbiA9IG51bGw7XG4gIHZhciBkaXNwYXRjaEhhbmRsZXIgPSBudWxsO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgd2FybmluZyhcbiAgICAgICFjYW5Vc2VET00gfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyxcbiAgICAgICdZb3Ugc2hvdWxkIG5vdCB1c2UgYSBzdGF0aWMgbG9jYXRpb24gaW4gYSBET00gZW52aXJvbm1lbnQgYmVjYXVzZSAnICtcbiAgICAgICd0aGUgcm91dGVyIHdpbGwgbm90IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSBjdXJyZW50IFVSTCdcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGludmFyaWFudChcbiAgICAgIGNhblVzZURPTSB8fCBsb2NhdGlvbi5uZWVkc0RPTSA9PT0gZmFsc2UsXG4gICAgICAnWW91IGNhbm5vdCB1c2UgJXMgd2l0aG91dCBhIERPTScsXG4gICAgICBsb2NhdGlvblxuICAgICk7XG4gIH1cblxuICAvLyBBdXRvbWF0aWNhbGx5IGZhbGwgYmFjayB0byBmdWxsIHBhZ2UgcmVmcmVzaGVzIGluXG4gIC8vIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgSFRNTCBoaXN0b3J5IEFQSS5cbiAgaWYgKGxvY2F0aW9uID09PSBIaXN0b3J5TG9jYXRpb24gJiYgIXN1cHBvcnRzSGlzdG9yeSgpKVxuICAgIGxvY2F0aW9uID0gUmVmcmVzaExvY2F0aW9uO1xuXG4gIHZhciBSb3V0ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICBkaXNwbGF5TmFtZTogJ1JvdXRlcicsXG5cbiAgICBzdGF0aWNzOiB7XG5cbiAgICAgIGlzUnVubmluZzogZmFsc2UsXG5cbiAgICAgIGNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwZW5kaW5nVHJhbnNpdGlvbikge1xuICAgICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uLmFib3J0KG5ldyBDYW5jZWxsYXRpb24pO1xuICAgICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgY2xlYXJBbGxSb3V0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmRlZmF1bHRSb3V0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMubm90Rm91bmRSb3V0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMubmFtZWRSb3V0ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkcyByb3V0ZXMgdG8gdGhpcyByb3V0ZXIgZnJvbSB0aGUgZ2l2ZW4gY2hpbGRyZW4gb2JqZWN0IChzZWUgUmVhY3RDaGlsZHJlbikuXG4gICAgICAgKi9cbiAgICAgIGFkZFJvdXRlczogZnVuY3Rpb24gKHJvdXRlcykge1xuICAgICAgICBpZiAoaXNSZWFjdENoaWxkcmVuKHJvdXRlcykpXG4gICAgICAgICAgcm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4ocm91dGVzLCB0aGlzLCB0aGlzLm5hbWVkUm91dGVzKTtcblxuICAgICAgICB0aGlzLnJvdXRlcy5wdXNoLmFwcGx5KHRoaXMucm91dGVzLCByb3V0ZXMpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXBsYWNlcyByb3V0ZXMgb2YgdGhpcyByb3V0ZXIgZnJvbSB0aGUgZ2l2ZW4gY2hpbGRyZW4gb2JqZWN0IChzZWUgUmVhY3RDaGlsZHJlbikuXG4gICAgICAgKi9cbiAgICAgIHJlcGxhY2VSb3V0ZXM6IGZ1bmN0aW9uIChyb3V0ZXMpIHtcbiAgICAgICAgdGhpcy5jbGVhckFsbFJvdXRlcygpO1xuICAgICAgICB0aGlzLmFkZFJvdXRlcyhyb3V0ZXMpO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUGVyZm9ybXMgYSBtYXRjaCBvZiB0aGUgZ2l2ZW4gcGF0aCBhZ2FpbnN0IHRoaXMgcm91dGVyIGFuZCByZXR1cm5zIGFuIG9iamVjdFxuICAgICAgICogd2l0aCB0aGUgeyByb3V0ZXMsIHBhcmFtcywgcGF0aG5hbWUsIHF1ZXJ5IH0gdGhhdCBtYXRjaC4gUmV0dXJucyBudWxsIGlmIG5vXG4gICAgICAgKiBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICAgICAqL1xuICAgICAgbWF0Y2g6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiBmaW5kTWF0Y2godGhpcy5yb3V0ZXMsIHRoaXMuZGVmYXVsdFJvdXRlLCB0aGlzLm5vdEZvdW5kUm91dGUsIFBhdGgud2l0aG91dFF1ZXJ5KHBhdGgpLCBQYXRoLmV4dHJhY3RRdWVyeShwYXRoKSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgYW4gYWJzb2x1dGUgVVJMIHBhdGggY3JlYXRlZCBmcm9tIHRoZSBnaXZlbiByb3V0ZVxuICAgICAgICogbmFtZSwgVVJMIHBhcmFtZXRlcnMsIGFuZCBxdWVyeS5cbiAgICAgICAqL1xuICAgICAgbWFrZVBhdGg6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICB2YXIgcGF0aDtcbiAgICAgICAgaWYgKFBhdGguaXNBYnNvbHV0ZSh0bykpIHtcbiAgICAgICAgICBwYXRoID0gUGF0aC5ub3JtYWxpemUodG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciByb3V0ZSA9IHRoaXMubmFtZWRSb3V0ZXNbdG9dO1xuXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgcm91dGUsXG4gICAgICAgICAgICAnVW5hYmxlIHRvIGZpbmQgPFJvdXRlIG5hbWU9XCIlc1wiPicsXG4gICAgICAgICAgICB0b1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBwYXRoID0gcm91dGUucGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQYXRoLndpdGhRdWVyeShQYXRoLmluamVjdFBhcmFtcyhwYXRoLCBwYXJhbXMpLCBxdWVyeSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCBtYXkgc2FmZWx5IGJlIHVzZWQgYXMgdGhlIGhyZWYgb2YgYSBsaW5rXG4gICAgICAgKiB0byB0aGUgcm91dGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgVVJMIHBhcmFtZXRlcnMsIGFuZCBxdWVyeS5cbiAgICAgICAqL1xuICAgICAgbWFrZUhyZWY6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICB2YXIgcGF0aCA9IHRoaXMubWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuICAgICAgICByZXR1cm4gKGxvY2F0aW9uID09PSBIYXNoTG9jYXRpb24pID8gJyMnICsgcGF0aCA6IHBhdGg7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRyYW5zaXRpb25zIHRvIHRoZSBVUkwgc3BlY2lmaWVkIGluIHRoZSBhcmd1bWVudHMgYnkgcHVzaGluZ1xuICAgICAgICogYSBuZXcgVVJMIG9udG8gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAgICAgKi9cbiAgICAgIHRyYW5zaXRpb25UbzogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICB0eXBlb2YgbG9jYXRpb24gIT09ICdzdHJpbmcnLFxuICAgICAgICAgICdZb3UgY2Fubm90IHVzZSB0cmFuc2l0aW9uVG8gd2l0aCBhIHN0YXRpYyBsb2NhdGlvbidcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgcGF0aCA9IHRoaXMubWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpO1xuXG4gICAgICAgIGlmIChwZW5kaW5nVHJhbnNpdGlvbikge1xuICAgICAgICAgIC8vIFJlcGxhY2Ugc28gcGVuZGluZyBsb2NhdGlvbiBkb2VzIG5vdCBzdGF5IGluIGhpc3RvcnkuXG4gICAgICAgICAgbG9jYXRpb24ucmVwbGFjZShwYXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbi5wdXNoKHBhdGgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRyYW5zaXRpb25zIHRvIHRoZSBVUkwgc3BlY2lmaWVkIGluIHRoZSBhcmd1bWVudHMgYnkgcmVwbGFjaW5nXG4gICAgICAgKiB0aGUgY3VycmVudCBVUkwgaW4gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAgICAgKi9cbiAgICAgIHJlcGxhY2VXaXRoOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3N0cmluZycsXG4gICAgICAgICAgJ1lvdSBjYW5ub3QgdXNlIHJlcGxhY2VXaXRoIHdpdGggYSBzdGF0aWMgbG9jYXRpb24nXG4gICAgICAgICk7XG5cbiAgICAgICAgbG9jYXRpb24ucmVwbGFjZSh0aGlzLm1ha2VQYXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRyYW5zaXRpb25zIHRvIHRoZSBwcmV2aW91cyBVUkwgaWYgb25lIGlzIGF2YWlsYWJsZS4gUmV0dXJucyB0cnVlIGlmIHRoZVxuICAgICAgICogcm91dGVyIHdhcyBhYmxlIHRvIGdvIGJhY2ssIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAqXG4gICAgICAgKiBOb3RlOiBUaGUgcm91dGVyIG9ubHkgdHJhY2tzIGhpc3RvcnkgZW50cmllcyBpbiB5b3VyIGFwcGxpY2F0aW9uLCBub3QgdGhlXG4gICAgICAgKiBjdXJyZW50IGJyb3dzZXIgc2Vzc2lvbiwgc28geW91IGNhbiBzYWZlbHkgY2FsbCB0aGlzIGZ1bmN0aW9uIHdpdGhvdXQgZ3VhcmRpbmdcbiAgICAgICAqIGFnYWluc3Qgc2VuZGluZyB0aGUgdXNlciBiYWNrIHRvIHNvbWUgb3RoZXIgc2l0ZS4gSG93ZXZlciwgd2hlbiB1c2luZ1xuICAgICAgICogUmVmcmVzaExvY2F0aW9uICh3aGljaCBpcyB0aGUgZmFsbGJhY2sgZm9yIEhpc3RvcnlMb2NhdGlvbiBpbiBicm93c2VycyB0aGF0XG4gICAgICAgKiBkb24ndCBzdXBwb3J0IEhUTUw1IGhpc3RvcnkpIHRoaXMgbWV0aG9kIHdpbGwgKmFsd2F5cyogc2VuZCB0aGUgY2xpZW50IGJhY2tcbiAgICAgICAqIGJlY2F1c2Ugd2UgY2Fubm90IHJlbGlhYmx5IHRyYWNrIGhpc3RvcnkgbGVuZ3RoLlxuICAgICAgICovXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3N0cmluZycsXG4gICAgICAgICAgJ1lvdSBjYW5ub3QgdXNlIGdvQmFjayB3aXRoIGEgc3RhdGljIGxvY2F0aW9uJ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmIChIaXN0b3J5Lmxlbmd0aCA+IDEgfHwgbG9jYXRpb24gPT09IFJlZnJlc2hMb2NhdGlvbikge1xuICAgICAgICAgIGxvY2F0aW9uLnBvcCgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgd2FybmluZyhmYWxzZSwgJ2dvQmFjaygpIHdhcyBpZ25vcmVkIGJlY2F1c2UgdGhlcmUgaXMgbm8gcm91dGVyIGhpc3RvcnknKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuXG4gICAgICBoYW5kbGVBYm9ydDogb3B0aW9ucy5vbkFib3J0IHx8IGZ1bmN0aW9uIChhYm9ydFJlYXNvbikge1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBhYm9ydGVkIHRyYW5zaXRpb24hIFJlYXNvbjogJyArIGFib3J0UmVhc29uKTtcblxuICAgICAgICBpZiAoYWJvcnRSZWFzb24gaW5zdGFuY2VvZiBDYW5jZWxsYXRpb24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoYWJvcnRSZWFzb24gaW5zdGFuY2VvZiBSZWRpcmVjdCkge1xuICAgICAgICAgIGxvY2F0aW9uLnJlcGxhY2UodGhpcy5tYWtlUGF0aChhYm9ydFJlYXNvbi50bywgYWJvcnRSZWFzb24ucGFyYW1zLCBhYm9ydFJlYXNvbi5xdWVyeSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBoYW5kbGVFcnJvcjogb3B0aW9ucy5vbkVycm9yIHx8IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAvLyBUaHJvdyBzbyB3ZSBkb24ndCBzaWxlbnRseSBzd2FsbG93IGFzeW5jIGVycm9ycy5cbiAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFRoaXMgZXJyb3IgcHJvYmFibHkgb3JpZ2luYXRlZCBpbiBhIHRyYW5zaXRpb24gaG9vay5cbiAgICAgIH0sXG5cbiAgICAgIGhhbmRsZUxvY2F0aW9uQ2hhbmdlOiBmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goY2hhbmdlLnBhdGgsIGNoYW5nZS50eXBlKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUGVyZm9ybXMgYSB0cmFuc2l0aW9uIHRvIHRoZSBnaXZlbiBwYXRoIGFuZCBjYWxscyBjYWxsYmFjayhlcnJvciwgYWJvcnRSZWFzb24pXG4gICAgICAgKiB3aGVuIHRoZSB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkLiBJZiBib3RoIGFyZ3VtZW50cyBhcmUgbnVsbCB0aGUgcm91dGVyJ3Mgc3RhdGVcbiAgICAgICAqIHdhcyB1cGRhdGVkLiBPdGhlcndpc2UgdGhlIHRyYW5zaXRpb24gZGlkIG5vdCBjb21wbGV0ZS5cbiAgICAgICAqXG4gICAgICAgKiBJbiBhIHRyYW5zaXRpb24sIGEgcm91dGVyIGZpcnN0IGRldGVybWluZXMgd2hpY2ggcm91dGVzIGFyZSBpbnZvbHZlZCBieSBiZWdpbm5pbmdcbiAgICAgICAqIHdpdGggdGhlIGN1cnJlbnQgcm91dGUsIHVwIHRoZSByb3V0ZSB0cmVlIHRvIHRoZSBmaXJzdCBwYXJlbnQgcm91dGUgdGhhdCBpcyBzaGFyZWRcbiAgICAgICAqIHdpdGggdGhlIGRlc3RpbmF0aW9uIHJvdXRlLCBhbmQgYmFjayBkb3duIHRoZSB0cmVlIHRvIHRoZSBkZXN0aW5hdGlvbiByb3V0ZS4gVGhlXG4gICAgICAgKiB3aWxsVHJhbnNpdGlvbkZyb20gaG9vayBpcyBpbnZva2VkIG9uIGFsbCByb3V0ZSBoYW5kbGVycyB3ZSdyZSB0cmFuc2l0aW9uaW5nIGF3YXlcbiAgICAgICAqIGZyb20sIGluIHJldmVyc2UgbmVzdGluZyBvcmRlci4gTGlrZXdpc2UsIHRoZSB3aWxsVHJhbnNpdGlvblRvIGhvb2sgaXMgaW52b2tlZCBvblxuICAgICAgICogYWxsIHJvdXRlIGhhbmRsZXJzIHdlJ3JlIHRyYW5zaXRpb25pbmcgdG8uXG4gICAgICAgKlxuICAgICAgICogQm90aCB3aWxsVHJhbnNpdGlvbkZyb20gYW5kIHdpbGxUcmFuc2l0aW9uVG8gaG9va3MgbWF5IGVpdGhlciBhYm9ydCBvciByZWRpcmVjdCB0aGVcbiAgICAgICAqIHRyYW5zaXRpb24uIFRvIHJlc29sdmUgYXN5bmNocm9ub3VzbHksIHRoZXkgbWF5IHVzZSB0aGUgY2FsbGJhY2sgYXJndW1lbnQuIElmIG5vXG4gICAgICAgKiBob29rcyB3YWl0LCB0aGUgdHJhbnNpdGlvbiBpcyBmdWxseSBzeW5jaHJvbm91cy5cbiAgICAgICAqL1xuICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIChwYXRoLCBhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jYW5jZWxQZW5kaW5nVHJhbnNpdGlvbigpO1xuXG4gICAgICAgIHZhciBwcmV2UGF0aCA9IHN0YXRlLnBhdGg7XG4gICAgICAgIHZhciBpc1JlZnJlc2hpbmcgPSBhY3Rpb24gPT0gbnVsbDtcblxuICAgICAgICBpZiAocHJldlBhdGggPT09IHBhdGggJiYgIWlzUmVmcmVzaGluZylcbiAgICAgICAgICByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8hXG5cbiAgICAgICAgLy8gUmVjb3JkIHRoZSBzY3JvbGwgcG9zaXRpb24gYXMgZWFybHkgYXMgcG9zc2libGUgdG9cbiAgICAgICAgLy8gZ2V0IGl0IGJlZm9yZSBicm93c2VycyB0cnkgdXBkYXRlIGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICAgIGlmIChwcmV2UGF0aCAmJiBhY3Rpb24gPT09IExvY2F0aW9uQWN0aW9ucy5QVVNIKVxuICAgICAgICAgIHRoaXMucmVjb3JkU2Nyb2xsUG9zaXRpb24ocHJldlBhdGgpO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IHRoaXMubWF0Y2gocGF0aCk7XG5cbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBtYXRjaCAhPSBudWxsLFxuICAgICAgICAgICdObyByb3V0ZSBtYXRjaGVzIHBhdGggXCIlc1wiLiBNYWtlIHN1cmUgeW91IGhhdmUgPFJvdXRlIHBhdGg9XCIlc1wiPiBzb21ld2hlcmUgaW4geW91ciByb3V0ZXMnLFxuICAgICAgICAgIHBhdGgsIHBhdGhcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAobWF0Y2ggPT0gbnVsbClcbiAgICAgICAgICBtYXRjaCA9IHt9O1xuXG4gICAgICAgIHZhciBwcmV2Um91dGVzID0gc3RhdGUucm91dGVzIHx8IFtdO1xuICAgICAgICB2YXIgcHJldlBhcmFtcyA9IHN0YXRlLnBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIHByZXZRdWVyeSA9IHN0YXRlLnF1ZXJ5IHx8IHt9O1xuXG4gICAgICAgIHZhciBuZXh0Um91dGVzID0gbWF0Y2gucm91dGVzIHx8IFtdO1xuICAgICAgICB2YXIgbmV4dFBhcmFtcyA9IG1hdGNoLnBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIG5leHRRdWVyeSA9IG1hdGNoLnF1ZXJ5IHx8IHt9O1xuXG4gICAgICAgIHZhciBmcm9tUm91dGVzLCB0b1JvdXRlcztcbiAgICAgICAgaWYgKHByZXZSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZnJvbVJvdXRlcyA9IHByZXZSb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICFoYXNNYXRjaChuZXh0Um91dGVzLCByb3V0ZSwgcHJldlBhcmFtcywgbmV4dFBhcmFtcywgcHJldlF1ZXJ5LCBuZXh0UXVlcnkpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdG9Sb3V0ZXMgPSBuZXh0Um91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgIHJldHVybiAhaGFzTWF0Y2gocHJldlJvdXRlcywgcm91dGUsIHByZXZQYXJhbXMsIG5leHRQYXJhbXMsIHByZXZRdWVyeSwgbmV4dFF1ZXJ5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9tUm91dGVzID0gW107XG4gICAgICAgICAgdG9Sb3V0ZXMgPSBuZXh0Um91dGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBuZXcgVHJhbnNpdGlvbihwYXRoLCB0aGlzLnJlcGxhY2VXaXRoLmJpbmQodGhpcywgcGF0aCkpO1xuICAgICAgICBwZW5kaW5nVHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG5cbiAgICAgICAgdmFyIGZyb21Db21wb25lbnRzID0gbW91bnRlZENvbXBvbmVudHMuc2xpY2UocHJldlJvdXRlcy5sZW5ndGggLSBmcm9tUm91dGVzLmxlbmd0aCk7XG5cbiAgICAgICAgdHJhbnNpdGlvbi5mcm9tKGZyb21Sb3V0ZXMsIGZyb21Db21wb25lbnRzLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgfHwgdHJhbnNpdGlvbi5hYm9ydFJlYXNvbilcbiAgICAgICAgICAgIHJldHVybiBkaXNwYXRjaEhhbmRsZXIuY2FsbChSb3V0ZXIsIGVycm9yLCB0cmFuc2l0aW9uKTsgLy8gTm8gbmVlZCB0byBjb250aW51ZS5cblxuICAgICAgICAgIHRyYW5zaXRpb24udG8odG9Sb3V0ZXMsIG5leHRQYXJhbXMsIG5leHRRdWVyeSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBkaXNwYXRjaEhhbmRsZXIuY2FsbChSb3V0ZXIsIGVycm9yLCB0cmFuc2l0aW9uLCB7XG4gICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgICBwYXRobmFtZTogbWF0Y2gucGF0aG5hbWUsXG4gICAgICAgICAgICAgIHJvdXRlczogbmV4dFJvdXRlcyxcbiAgICAgICAgICAgICAgcGFyYW1zOiBuZXh0UGFyYW1zLFxuICAgICAgICAgICAgICBxdWVyeTogbmV4dFF1ZXJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFN0YXJ0cyB0aGlzIHJvdXRlciBhbmQgY2FsbHMgY2FsbGJhY2socm91dGVyLCBzdGF0ZSkgd2hlbiB0aGUgcm91dGUgY2hhbmdlcy5cbiAgICAgICAqXG4gICAgICAgKiBJZiB0aGUgcm91dGVyJ3MgbG9jYXRpb24gaXMgc3RhdGljIChpLmUuIGEgVVJMIHBhdGggaW4gYSBzZXJ2ZXIgZW52aXJvbm1lbnQpXG4gICAgICAgKiB0aGUgY2FsbGJhY2sgaXMgY2FsbGVkIG9ubHkgb25jZS4gT3RoZXJ3aXNlLCB0aGUgbG9jYXRpb24gc2hvdWxkIGJlIG9uZSBvZiB0aGVcbiAgICAgICAqIFJvdXRlci4qTG9jYXRpb24gb2JqZWN0cyAoZS5nLiBSb3V0ZXIuSGFzaExvY2F0aW9uIG9yIFJvdXRlci5IaXN0b3J5TG9jYXRpb24pLlxuICAgICAgICovXG4gICAgICBydW46IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgIXRoaXMuaXNSdW5uaW5nLFxuICAgICAgICAgICdSb3V0ZXIgaXMgYWxyZWFkeSBydW5uaW5nJ1xuICAgICAgICApO1xuXG4gICAgICAgIGRpc3BhdGNoSGFuZGxlciA9IGZ1bmN0aW9uIChlcnJvciwgdHJhbnNpdGlvbiwgbmV3U3RhdGUpIHtcbiAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICBSb3V0ZXIuaGFuZGxlRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2l0aW9uICE9PSB0cmFuc2l0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24gPSBudWxsO1xuXG4gICAgICAgICAgaWYgKHRyYW5zaXRpb24uYWJvcnRSZWFzb24pIHtcbiAgICAgICAgICAgIFJvdXRlci5oYW5kbGVBYm9ydCh0cmFuc2l0aW9uLmFib3J0UmVhc29uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLCBuZXh0U3RhdGUgPSBuZXdTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgUm91dGVyLmRpc3BhdGNoKGxvY2F0aW9uLCBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobG9jYXRpb24uYWRkQ2hhbmdlTGlzdGVuZXIpXG4gICAgICAgICAgICBsb2NhdGlvbi5hZGRDaGFuZ2VMaXN0ZW5lcihSb3V0ZXIuaGFuZGxlTG9jYXRpb25DaGFuZ2UpO1xuXG4gICAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuXG4gICAgICAgICAgLy8gQm9vdHN0cmFwIHVzaW5nIHRoZSBjdXJyZW50IHBhdGguXG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUm91dGVyLmRpc3BhdGNoKGxvY2F0aW9uLmdldEN1cnJlbnRQYXRoKCksIG51bGwpO1xuICAgICAgfSxcblxuICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKGxvY2F0aW9uLnJlbW92ZUNoYW5nZUxpc3RlbmVyKVxuICAgICAgICAgIGxvY2F0aW9uLnJlbW92ZUNoYW5nZUxpc3RlbmVyKFJvdXRlci5oYW5kbGVMb2NhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtaXhpbnM6IFsgTmF2aWdhdGlvbkNvbnRleHQsIFN0YXRlQ29udGV4dCwgU2Nyb2xsaW5nIF0sXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZmFsc3lcbiAgICB9LFxuXG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICAgIGdldFJvdXRlQXREZXB0aDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNldFJvdXRlQ29tcG9uZW50QXREZXB0aDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJvdXRlSGFuZGxlcnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0Um91dGVBdERlcHRoOiB0aGlzLmdldFJvdXRlQXREZXB0aCxcbiAgICAgICAgc2V0Um91dGVDb21wb25lbnRBdERlcHRoOiB0aGlzLnNldFJvdXRlQ29tcG9uZW50QXREZXB0aCxcbiAgICAgICAgcm91dGVIYW5kbGVyczogWyB0aGlzIF1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChzdGF0ZSA9IG5leHRTdGF0ZSk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPSBuZXh0U3RhdGUpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgUm91dGVyLnN0b3AoKTtcbiAgICB9LFxuXG4gICAgZ2V0TG9jYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9LFxuXG4gICAgZ2V0U2Nyb2xsQmVoYXZpb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzY3JvbGxCZWhhdmlvcjtcbiAgICB9LFxuXG4gICAgZ2V0Um91dGVBdERlcHRoOiBmdW5jdGlvbiAoZGVwdGgpIHtcbiAgICAgIHZhciByb3V0ZXMgPSB0aGlzLnN0YXRlLnJvdXRlcztcbiAgICAgIHJldHVybiByb3V0ZXMgJiYgcm91dGVzW2RlcHRoXTtcbiAgICB9LFxuXG4gICAgc2V0Um91dGVDb21wb25lbnRBdERlcHRoOiBmdW5jdGlvbiAoZGVwdGgsIGNvbXBvbmVudCkge1xuICAgICAgbW91bnRlZENvbXBvbmVudHNbZGVwdGhdID0gY29tcG9uZW50O1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByb3V0ZSA9IHRoaXMuZ2V0Um91dGVBdERlcHRoKDApO1xuICAgICAgcmV0dXJuIHJvdXRlID8gUmVhY3QuY3JlYXRlRWxlbWVudChyb3V0ZS5oYW5kbGVyLCB0aGlzLnByb3BzKSA6IG51bGw7XG4gICAgfVxuXG4gIH0pO1xuXG4gIFJvdXRlci5jbGVhckFsbFJvdXRlcygpO1xuXG4gIGlmIChvcHRpb25zLnJvdXRlcylcbiAgICBSb3V0ZXIuYWRkUm91dGVzKG9wdGlvbnMucm91dGVzKTtcblxuICByZXR1cm4gUm91dGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVJvdXRlcjtcbiIsImV4cG9ydHMuRGVmYXVsdFJvdXRlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0RlZmF1bHRSb3V0ZScpO1xuZXhwb3J0cy5MaW5rID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0xpbmsnKTtcbmV4cG9ydHMuTm90Rm91bmRSb3V0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Ob3RGb3VuZFJvdXRlJyk7XG5leHBvcnRzLlJlZGlyZWN0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1JlZGlyZWN0Jyk7XG5leHBvcnRzLlJvdXRlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1JvdXRlJyk7XG5leHBvcnRzLlJvdXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Sb3V0ZUhhbmRsZXInKTtcblxuZXhwb3J0cy5IYXNoTG9jYXRpb24gPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9IYXNoTG9jYXRpb24nKTtcbmV4cG9ydHMuSGlzdG9yeUxvY2F0aW9uID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvSGlzdG9yeUxvY2F0aW9uJyk7XG5leHBvcnRzLlJlZnJlc2hMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL1JlZnJlc2hMb2NhdGlvbicpO1xuXG5leHBvcnRzLkltaXRhdGVCcm93c2VyQmVoYXZpb3IgPSByZXF1aXJlKCcuL2JlaGF2aW9ycy9JbWl0YXRlQnJvd3NlckJlaGF2aW9yJyk7XG5leHBvcnRzLlNjcm9sbFRvVG9wQmVoYXZpb3IgPSByZXF1aXJlKCcuL2JlaGF2aW9ycy9TY3JvbGxUb1RvcEJlaGF2aW9yJyk7XG5cbmV4cG9ydHMuSGlzdG9yeSA9IHJlcXVpcmUoJy4vSGlzdG9yeScpO1xuZXhwb3J0cy5OYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9OYXZpZ2F0aW9uJyk7XG5leHBvcnRzLlJvdXRlSGFuZGxlck1peGluID0gcmVxdWlyZSgnLi9Sb3V0ZUhhbmRsZXJNaXhpbicpO1xuZXhwb3J0cy5TdGF0ZSA9IHJlcXVpcmUoJy4vU3RhdGUnKTtcblxuZXhwb3J0cy5jcmVhdGUgPSByZXF1aXJlKCcuL2NyZWF0ZVJvdXRlcicpO1xuZXhwb3J0cy5ydW4gPSByZXF1aXJlKCcuL3J1blJvdXRlcicpO1xuXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2hpbGQob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCB8fCBSZWFjdC5pc1ZhbGlkRWxlbWVudChvYmplY3QpO1xufVxuXG5mdW5jdGlvbiBpc1JlYWN0Q2hpbGRyZW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc1ZhbGlkQ2hpbGQob2JqZWN0KSB8fCAoQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5ldmVyeShpc1ZhbGlkQ2hpbGQpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1JlYWN0Q2hpbGRyZW47XG4iLCJ2YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9Mb2NhdGlvbkFjdGlvbnMnKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZSgnLi4vSGlzdG9yeScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGggZnJvbSB0aGUgYGhhc2hgIHBvcnRpb24gb2YgdGhlIFVSTCwgaW5jbHVkaW5nXG4gKiBxdWVyeSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICByZXR1cm4gZGVjb2RlVVJJKFxuICAgIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgICAvLyBjb25zaXN0ZW50IGFjcm9zcyBicm93c2VycyAtIEZpcmVmb3ggd2lsbCBwcmUtZGVjb2RlIGl0IVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMV0gfHwgJydcbiAgKTtcbn1cblxudmFyIF9hY3Rpb25UeXBlO1xuXG5mdW5jdGlvbiBlbnN1cmVTbGFzaCgpIHtcbiAgdmFyIHBhdGggPSBnZXRIYXNoUGF0aCgpO1xuXG4gIGlmIChwYXRoLmNoYXJBdCgwKSA9PT0gJy8nKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIEhhc2hMb2NhdGlvbi5yZXBsYWNlKCcvJyArIHBhdGgpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxudmFyIF9jaGFuZ2VMaXN0ZW5lcnMgPSBbXTtcblxuZnVuY3Rpb24gbm90aWZ5Q2hhbmdlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09IExvY2F0aW9uQWN0aW9ucy5QVVNIKVxuICAgIEhpc3RvcnkubGVuZ3RoICs9IDE7XG5cbiAgdmFyIGNoYW5nZSA9IHtcbiAgICBwYXRoOiBnZXRIYXNoUGF0aCgpLFxuICAgIHR5cGU6IHR5cGVcbiAgfTtcblxuICBfY2hhbmdlTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgbGlzdGVuZXIoY2hhbmdlKTtcbiAgfSk7XG59XG5cbnZhciBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gb25IYXNoQ2hhbmdlKCkge1xuICBpZiAoZW5zdXJlU2xhc2goKSkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYW4gX2FjdGlvblR5cGUgdGhlbiBhbGwgd2Uga25vdyBpcyB0aGUgaGFzaFxuICAgIC8vIGNoYW5nZWQuIEl0IHdhcyBwcm9iYWJseSBjYXVzZWQgYnkgdGhlIHVzZXIgY2xpY2tpbmcgdGhlIEJhY2tcbiAgICAvLyBidXR0b24sIGJ1dCBtYXkgaGF2ZSBhbHNvIGJlZW4gdGhlIEZvcndhcmQgYnV0dG9uIG9yIG1hbnVhbFxuICAgIC8vIG1hbmlwdWxhdGlvbi4gU28ganVzdCBndWVzcyAncG9wJy5cbiAgICBub3RpZnlDaGFuZ2UoX2FjdGlvblR5cGUgfHwgTG9jYXRpb25BY3Rpb25zLlBPUCk7XG4gICAgX2FjdGlvblR5cGUgPSBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQSBMb2NhdGlvbiB0aGF0IHVzZXMgYHdpbmRvdy5sb2NhdGlvbi5oYXNoYC5cbiAqL1xudmFyIEhhc2hMb2NhdGlvbiA9IHtcblxuICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIC8vIERvIHRoaXMgQkVGT1JFIGxpc3RlbmluZyBmb3IgaGFzaGNoYW5nZS5cbiAgICBlbnN1cmVTbGFzaCgpO1xuXG4gICAgaWYgKCFfaXNMaXN0ZW5pbmcpIHtcbiAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbmhhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UpO1xuICAgICAgfVxuXG4gICAgICBfaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICBfY2hhbmdlTGlzdGVuZXJzID0gX2NoYW5nZUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcbiAgICAgIHJldHVybiBsICE9PSBsaXN0ZW5lcjtcbiAgICB9KTtcblxuICAgIGlmIChfY2hhbmdlTGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnQoJ29uaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBwdXNoOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIF9hY3Rpb25UeXBlID0gTG9jYXRpb25BY3Rpb25zLlBVU0g7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBlbmNvZGVVUkkocGF0aCk7XG4gIH0sXG5cbiAgcmVwbGFjZTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICBfYWN0aW9uVHlwZSA9IExvY2F0aW9uQWN0aW9ucy5SRVBMQUNFO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFxuICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArICcjJyArIGVuY29kZVVSSShwYXRoKVxuICAgICk7XG4gIH0sXG5cbiAgcG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgX2FjdGlvblR5cGUgPSBMb2NhdGlvbkFjdGlvbnMuUE9QO1xuICAgIEhpc3RvcnkuYmFjaygpO1xuICB9LFxuXG4gIGdldEN1cnJlbnRQYXRoOiBnZXRIYXNoUGF0aCxcblxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnPEhhc2hMb2NhdGlvbj4nO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGFzaExvY2F0aW9uO1xuIiwidmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zJyk7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoJy4uL0hpc3RvcnknKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoIGZyb20gYHdpbmRvdy5sb2NhdGlvbmAsIGluY2x1ZGluZyBxdWVyeSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd1BhdGgoKSB7XG4gIHJldHVybiBkZWNvZGVVUkkoXG4gICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaFxuICApO1xufVxuXG52YXIgX2NoYW5nZUxpc3RlbmVycyA9IFtdO1xuXG5mdW5jdGlvbiBub3RpZnlDaGFuZ2UodHlwZSkge1xuICB2YXIgY2hhbmdlID0ge1xuICAgIHBhdGg6IGdldFdpbmRvd1BhdGgoKSxcbiAgICB0eXBlOiB0eXBlXG4gIH07XG5cbiAgX2NoYW5nZUxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIGxpc3RlbmVyKGNoYW5nZSk7XG4gIH0pO1xufVxuXG52YXIgX2lzTGlzdGVuaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG9uUG9wU3RhdGUoKSB7XG4gIG5vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUE9QKTtcbn1cblxuLyoqXG4gKiBBIExvY2F0aW9uIHRoYXQgdXNlcyBIVE1MNSBoaXN0b3J5LlxuICovXG52YXIgSGlzdG9yeUxvY2F0aW9uID0ge1xuXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICBfY2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgaWYgKCFfaXNMaXN0ZW5pbmcpIHtcbiAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBvblBvcFN0YXRlLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ3BvcHN0YXRlJywgb25Qb3BTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgIF9jaGFuZ2VMaXN0ZW5lcnMgPSBfY2hhbmdlTGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGwgIT09IGxpc3RlbmVyO1xuICAgIH0pO1xuXG4gICAgaWYgKF9jaGFuZ2VMaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgb25Qb3BTdGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnQoJ3BvcHN0YXRlJywgb25Qb3BTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBwdXNoOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IHBhdGg6IHBhdGggfSwgJycsIGVuY29kZVVSSShwYXRoKSk7XG4gICAgSGlzdG9yeS5sZW5ndGggKz0gMTtcbiAgICBub3RpZnlDaGFuZ2UoTG9jYXRpb25BY3Rpb25zLlBVU0gpO1xuICB9LFxuXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHsgcGF0aDogcGF0aCB9LCAnJywgZW5jb2RlVVJJKHBhdGgpKTtcbiAgICBub3RpZnlDaGFuZ2UoTG9jYXRpb25BY3Rpb25zLlJFUExBQ0UpO1xuICB9LFxuXG4gIHBvcDogSGlzdG9yeS5iYWNrLFxuXG4gIGdldEN1cnJlbnRQYXRoOiBnZXRXaW5kb3dQYXRoLFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICc8SGlzdG9yeUxvY2F0aW9uPic7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIaXN0b3J5TG9jYXRpb247XG4iLCJ2YXIgSGlzdG9yeUxvY2F0aW9uID0gcmVxdWlyZSgnLi9IaXN0b3J5TG9jYXRpb24nKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZSgnLi4vSGlzdG9yeScpO1xuXG4vKipcbiAqIEEgTG9jYXRpb24gdGhhdCB1c2VzIGZ1bGwgcGFnZSByZWZyZXNoZXMuIFRoaXMgaXMgdXNlZCBhc1xuICogdGhlIGZhbGxiYWNrIGZvciBIaXN0b3J5TG9jYXRpb24gaW4gYnJvd3NlcnMgdGhhdCBkbyBub3RcbiAqIHN1cHBvcnQgdGhlIEhUTUw1IGhpc3RvcnkgQVBJLlxuICovXG52YXIgUmVmcmVzaExvY2F0aW9uID0ge1xuXG4gIHB1c2g6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uID0gZW5jb2RlVVJJKHBhdGgpO1xuICB9LFxuXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZW5jb2RlVVJJKHBhdGgpKTtcbiAgfSxcblxuICBwb3A6IEhpc3RvcnkuYmFjayxcblxuICBnZXRDdXJyZW50UGF0aDogSGlzdG9yeUxvY2F0aW9uLmdldEN1cnJlbnRQYXRoLFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICc8UmVmcmVzaExvY2F0aW9uPic7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWZyZXNoTG9jYXRpb247XG4iLCJ2YXIgY3JlYXRlUm91dGVyID0gcmVxdWlyZSgnLi9jcmVhdGVSb3V0ZXInKTtcblxuLyoqXG4gKiBBIGhpZ2gtbGV2ZWwgY29udmVuaWVuY2UgbWV0aG9kIHRoYXQgY3JlYXRlcywgY29uZmlndXJlcywgYW5kXG4gKiBydW5zIGEgcm91dGVyIGluIG9uZSBzaG90LiBUaGUgbWV0aG9kIHNpZ25hdHVyZSBpczpcbiAqXG4gKiAgIFJvdXRlci5ydW4ocm91dGVzWywgbG9jYXRpb24gXSwgY2FsbGJhY2spO1xuICpcbiAqIFVzaW5nIGB3aW5kb3cubG9jYXRpb24uaGFzaGAgdG8gbWFuYWdlIHRoZSBVUkwsIHlvdSBjb3VsZCBkbzpcbiAqXG4gKiAgIFJvdXRlci5ydW4ocm91dGVzLCBmdW5jdGlvbiAoSGFuZGxlcikge1xuICogICAgIFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5ib2R5KTtcbiAqICAgfSk7XG4gKiBcbiAqIFVzaW5nIEhUTUw1IGhpc3RvcnkgYW5kIGEgY3VzdG9tIFwiY3Vyc29yXCIgcHJvcDpcbiAqIFxuICogICBSb3V0ZXIucnVuKHJvdXRlcywgUm91dGVyLkhpc3RvcnlMb2NhdGlvbiwgZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIgY3Vyc29yPXtjdXJzb3J9Lz4sIGRvY3VtZW50LmJvZHkpO1xuICogICB9KTtcbiAqXG4gKiBSZXR1cm5zIHRoZSBuZXdseSBjcmVhdGVkIHJvdXRlci5cbiAqXG4gKiBOb3RlOiBJZiB5b3UgbmVlZCB0byBzcGVjaWZ5IGZ1cnRoZXIgb3B0aW9ucyBmb3IgeW91ciByb3V0ZXIgc3VjaFxuICogYXMgZXJyb3IvYWJvcnQgaGFuZGxpbmcgb3IgY3VzdG9tIHNjcm9sbCBiZWhhdmlvciwgdXNlIFJvdXRlci5jcmVhdGVcbiAqIGluc3RlYWQuXG4gKlxuICogICB2YXIgcm91dGVyID0gUm91dGVyLmNyZWF0ZShvcHRpb25zKTtcbiAqICAgcm91dGVyLnJ1bihmdW5jdGlvbiAoSGFuZGxlcikge1xuICogICAgIC8vIC4uLlxuICogICB9KTtcbiAqL1xuZnVuY3Rpb24gcnVuUm91dGVyKHJvdXRlcywgbG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIHZhciByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoe1xuICAgIHJvdXRlczogcm91dGVzLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICB9KTtcblxuICByb3V0ZXIucnVuKGNhbGxiYWNrKTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1blJvdXRlcjtcbiIsInZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG52YXIgbWVyZ2UgPSByZXF1aXJlKCdxcy9saWIvdXRpbHMnKS5tZXJnZTtcbnZhciBxcyA9IHJlcXVpcmUoJ3FzJyk7XG5cbnZhciBwYXJhbUNvbXBpbGVNYXRjaGVyID0gLzooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKXxbKi4oKVxcW1xcXVxcXFwrfHt9XiRdL2c7XG52YXIgcGFyYW1JbmplY3RNYXRjaGVyID0gLzooW2EtekEtWl8kXVthLXpBLVowLTlfJD9dKls/XT8pfFsqXS9nO1xudmFyIHBhcmFtSW5qZWN0VHJhaWxpbmdTbGFzaE1hdGNoZXIgPSAvXFwvXFwvXFw/fFxcL1xcP1xcL3xcXC9cXD8vZztcbnZhciBxdWVyeU1hdGNoZXIgPSAvXFw/KC4rKS87XG5cbnZhciBfY29tcGlsZWRQYXR0ZXJucyA9IHt9O1xuXG5mdW5jdGlvbiBjb21waWxlUGF0dGVybihwYXR0ZXJuKSB7XG4gIGlmICghKHBhdHRlcm4gaW4gX2NvbXBpbGVkUGF0dGVybnMpKSB7XG4gICAgdmFyIHBhcmFtTmFtZXMgPSBbXTtcbiAgICB2YXIgc291cmNlID0gcGF0dGVybi5yZXBsYWNlKHBhcmFtQ29tcGlsZU1hdGNoZXIsIGZ1bmN0aW9uIChtYXRjaCwgcGFyYW1OYW1lKSB7XG4gICAgICBpZiAocGFyYW1OYW1lKSB7XG4gICAgICAgIHBhcmFtTmFtZXMucHVzaChwYXJhbU5hbWUpO1xuICAgICAgICByZXR1cm4gJyhbXi8/I10rKSc7XG4gICAgICB9IGVsc2UgaWYgKG1hdGNoID09PSAnKicpIHtcbiAgICAgICAgcGFyYW1OYW1lcy5wdXNoKCdzcGxhdCcpO1xuICAgICAgICByZXR1cm4gJyguKj8pJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnXFxcXCcgKyBtYXRjaDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF9jb21waWxlZFBhdHRlcm5zW3BhdHRlcm5dID0ge1xuICAgICAgbWF0Y2hlcjogbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2UgKyAnJCcsICdpJyksXG4gICAgICBwYXJhbU5hbWVzOiBwYXJhbU5hbWVzXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29tcGlsZWRQYXR0ZXJuc1twYXR0ZXJuXTtcbn1cblxudmFyIFBhdGggPSB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIG5hbWVzIG9mIGFsbCBwYXJhbWV0ZXJzIGluIHRoZSBnaXZlbiBwYXR0ZXJuLlxuICAgKi9cbiAgZXh0cmFjdFBhcmFtTmFtZXM6IGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pLnBhcmFtTmFtZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIHRoZSBwb3J0aW9ucyBvZiB0aGUgZ2l2ZW4gVVJMIHBhdGggdGhhdCBtYXRjaCB0aGUgZ2l2ZW4gcGF0dGVyblxuICAgKiBhbmQgcmV0dXJucyBhbiBvYmplY3Qgb2YgcGFyYW0gbmFtZSA9PiB2YWx1ZSBwYWlycy4gUmV0dXJucyBudWxsIGlmIHRoZVxuICAgKiBwYXR0ZXJuIGRvZXMgbm90IG1hdGNoIHRoZSBnaXZlbiBwYXRoLlxuICAgKi9cbiAgZXh0cmFjdFBhcmFtczogZnVuY3Rpb24gKHBhdHRlcm4sIHBhdGgpIHtcbiAgICB2YXIgb2JqZWN0ID0gY29tcGlsZVBhdHRlcm4ocGF0dGVybik7XG4gICAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChvYmplY3QubWF0Y2hlcik7XG5cbiAgICBpZiAoIW1hdGNoKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgcGFyYW1zID0ge307XG5cbiAgICBvYmplY3QucGFyYW1OYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbU5hbWUsIGluZGV4KSB7XG4gICAgICBwYXJhbXNbcGFyYW1OYW1lXSA9IG1hdGNoW2luZGV4ICsgMV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcm91dGUgcGF0aCB3aXRoIHBhcmFtcyBpbnRlcnBvbGF0ZWQuIFRocm93c1xuICAgKiBpZiB0aGVyZSBpcyBhIGR5bmFtaWMgc2VnbWVudCBvZiB0aGUgcm91dGUgcGF0aCBmb3Igd2hpY2ggdGhlcmUgaXMgbm8gcGFyYW0uXG4gICAqL1xuICBpbmplY3RQYXJhbXM6IGZ1bmN0aW9uIChwYXR0ZXJuLCBwYXJhbXMpIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICB2YXIgc3BsYXRJbmRleCA9IDA7XG5cbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKHBhcmFtSW5qZWN0TWF0Y2hlciwgZnVuY3Rpb24gKG1hdGNoLCBwYXJhbU5hbWUpIHtcbiAgICAgIHBhcmFtTmFtZSA9IHBhcmFtTmFtZSB8fCAnc3BsYXQnO1xuXG4gICAgICAvLyBJZiBwYXJhbSBpcyBvcHRpb25hbCBkb24ndCBjaGVjayBmb3IgZXhpc3RlbmNlXG4gICAgICBpZiAocGFyYW1OYW1lLnNsaWNlKC0xKSAhPT0gJz8nKSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICBwYXJhbXNbcGFyYW1OYW1lXSAhPSBudWxsLFxuICAgICAgICAgICdNaXNzaW5nIFwiJyArIHBhcmFtTmFtZSArICdcIiBwYXJhbWV0ZXIgZm9yIHBhdGggXCInICsgcGF0dGVybiArICdcIidcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtTmFtZSA9IHBhcmFtTmFtZS5zbGljZSgwLCAtMSk7XG5cbiAgICAgICAgaWYgKHBhcmFtc1twYXJhbU5hbWVdID09IG51bGwpXG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VnbWVudDtcbiAgICAgIGlmIChwYXJhbU5hbWUgPT09ICdzcGxhdCcgJiYgQXJyYXkuaXNBcnJheShwYXJhbXNbcGFyYW1OYW1lXSkpIHtcbiAgICAgICAgc2VnbWVudCA9IHBhcmFtc1twYXJhbU5hbWVdW3NwbGF0SW5kZXgrK107XG5cbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHNlZ21lbnQgIT0gbnVsbCxcbiAgICAgICAgICAnTWlzc2luZyBzcGxhdCAjICcgKyBzcGxhdEluZGV4ICsgJyBmb3IgcGF0aCBcIicgKyBwYXR0ZXJuICsgJ1wiJ1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VnbWVudCA9IHBhcmFtc1twYXJhbU5hbWVdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VnbWVudDtcbiAgICB9KS5yZXBsYWNlKHBhcmFtSW5qZWN0VHJhaWxpbmdTbGFzaE1hdGNoZXIsICcvJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgaXMgdGhlIHJlc3VsdCBvZiBwYXJzaW5nIGFueSBxdWVyeSBzdHJpbmcgY29udGFpbmVkXG4gICAqIGluIHRoZSBnaXZlbiBwYXRoLCBudWxsIGlmIHRoZSBwYXRoIGNvbnRhaW5zIG5vIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIGV4dHJhY3RRdWVyeTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKHF1ZXJ5TWF0Y2hlcik7XG4gICAgcmV0dXJuIG1hdGNoICYmIHFzLnBhcnNlKG1hdGNoWzFdKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHBhdGggd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgd2l0aG91dFF1ZXJ5OiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UocXVlcnlNYXRjaGVyLCAnJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBwYXRoIHdpdGggdGhlIHBhcmFtZXRlcnMgaW4gdGhlIGdpdmVuXG4gICAqIHF1ZXJ5IG1lcmdlZCBpbnRvIHRoZSBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICB3aXRoUXVlcnk6IGZ1bmN0aW9uIChwYXRoLCBxdWVyeSkge1xuICAgIHZhciBleGlzdGluZ1F1ZXJ5ID0gUGF0aC5leHRyYWN0UXVlcnkocGF0aCk7XG5cbiAgICBpZiAoZXhpc3RpbmdRdWVyeSlcbiAgICAgIHF1ZXJ5ID0gcXVlcnkgPyBtZXJnZShleGlzdGluZ1F1ZXJ5LCBxdWVyeSkgOiBleGlzdGluZ1F1ZXJ5O1xuXG4gICAgdmFyIHF1ZXJ5U3RyaW5nID0gcXMuc3RyaW5naWZ5KHF1ZXJ5LCB7IGluZGljZXM6IGZhbHNlIH0pO1xuXG4gICAgaWYgKHF1ZXJ5U3RyaW5nKVxuICAgICAgcmV0dXJuIFBhdGgud2l0aG91dFF1ZXJ5KHBhdGgpICsgJz8nICsgZGVjb2RlVVJJQ29tcG9uZW50KHF1ZXJ5U3RyaW5nKTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHBhdGggaXMgYWJzb2x1dGUuXG4gICAqL1xuICBpc0Fic29sdXRlOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBwYXRoLlxuICAgKi9cbiAgbm9ybWFsaXplOiBmdW5jdGlvbiAocGF0aCwgcGFyZW50Um91dGUpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9eXFwvKi8sICcvJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEpvaW5zIHR3byBVUkwgcGF0aHMgdG9nZXRoZXIuXG4gICAqL1xuICBqb2luOiBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhLnJlcGxhY2UoL1xcLyokLywgJy8nKSArIGI7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXRoO1xuIiwidmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKS5jYW5Vc2VET007XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIHdpbmRvdyBhcyB7IHgsIHkgfS5cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24oKSB7XG4gIGludmFyaWFudChcbiAgICBjYW5Vc2VET00sXG4gICAgJ0Nhbm5vdCBnZXQgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gd2l0aG91dCBhIERPTSdcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFdpbmRvd1Njcm9sbFBvc2l0aW9uO1xuIiwiZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICAvKiEgdGFrZW4gZnJvbSBtb2Rlcm5penJcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICAgKiBjaGFuZ2VkIHRvIGF2b2lkIGZhbHNlIG5lZ2F0aXZlcyBmb3IgV2luZG93cyBQaG9uZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9yYWNrdC9yZWFjdC1yb3V0ZXIvaXNzdWVzLzU4NlxuICAgKi9cbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgaWYgKCh1YS5pbmRleE9mKCdBbmRyb2lkIDIuJykgIT09IC0xIHx8XG4gICAgICAodWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpKSAmJlxuICAgICAgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJlxuICAgICAgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmXG4gICAgICB1YS5pbmRleE9mKCdXaW5kb3dzIFBob25lJykgPT09IC0xKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAod2luZG93Lmhpc3RvcnkgJiYgJ3B1c2hTdGF0ZScgaW4gd2luZG93Lmhpc3RvcnkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzSGlzdG9yeTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvJyk7XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgUGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHt9O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0cmluZ2lmeTogU3RyaW5naWZ5LFxuICAgIHBhcnNlOiBQYXJzZVxufTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMFxufTtcblxuXG5pbnRlcm5hbHMucGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiAoc3RyLCBvcHRpb25zKSB7XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gcGFydHMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuICAgICAgICB2YXIgcG9zID0gcGFydC5pbmRleE9mKCddPScpID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogcGFydC5pbmRleE9mKCddPScpICsgMTtcblxuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgb2JqW1V0aWxzLmRlY29kZShwYXJ0KV0gPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBVdGlscy5kZWNvZGUocGFydC5zbGljZSgwLCBwb3MpKTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBVdGlscy5kZWNvZGUocGFydC5zbGljZShwb3MgKyAxKSk7XG5cbiAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gW10uY29uY2F0KG9ialtrZXldKS5jb25jYXQodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmludGVybmFscy5wYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoIWNoYWluLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIHZhciByb290ID0gY2hhaW4uc2hpZnQoKTtcblxuICAgIHZhciBvYmogPSB7fTtcbiAgICBpZiAocm9vdCA9PT0gJ1tdJykge1xuICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgb2JqID0gb2JqLmNvbmNhdChpbnRlcm5hbHMucGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3RbMF0gPT09ICdbJyAmJiByb290W3Jvb3QubGVuZ3RoIC0gMV0gPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgcm9vdC5sZW5ndGggLSAxKSA6IHJvb3Q7XG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICB2YXIgaW5kZXhTdHJpbmcgPSAnJyArIGluZGV4O1xuICAgICAgICBpZiAoIWlzTmFOKGluZGV4KSAmJlxuICAgICAgICAgICAgcm9vdCAhPT0gY2xlYW5Sb290ICYmXG4gICAgICAgICAgICBpbmRleFN0cmluZyA9PT0gY2xlYW5Sb290ICYmXG4gICAgICAgICAgICBpbmRleCA+PSAwICYmXG4gICAgICAgICAgICBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpIHtcblxuICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICBvYmpbaW5kZXhdID0gaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGNoYWluLCB2YWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBpbnRlcm5hbHMucGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5pbnRlcm5hbHMucGFyc2VLZXlzID0gZnVuY3Rpb24gKGtleSwgdmFsLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIHBhcmVudCA9IC9eKFteXFxbXFxdXSopLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teXFxbXFxdXSpcXF0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBwYXJlbnQuZXhlYyhrZXkpO1xuXG4gICAgLy8gRG9uJ3QgYWxsb3cgdGhlbSB0byBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShzZWdtZW50WzFdKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHNlZ21lbnRbMV0pIHtcbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcblxuICAgICAgICArK2k7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShzZWdtZW50WzFdLnJlcGxhY2UoL1xcW3xcXF0vZywgJycpKSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVybmFscy5wYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8XG4gICAgICAgIHN0ciA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgVXRpbHMuaXNSZWdFeHAob3B0aW9ucy5kZWxpbWl0ZXIpID8gb3B0aW9ucy5kZWxpbWl0ZXIgOiBpbnRlcm5hbHMuZGVsaW1pdGVyO1xuICAgIG9wdGlvbnMuZGVwdGggPSB0eXBlb2Ygb3B0aW9ucy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmRlcHRoIDogaW50ZXJuYWxzLmRlcHRoO1xuICAgIG9wdGlvbnMuYXJyYXlMaW1pdCA9IHR5cGVvZiBvcHRpb25zLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5hcnJheUxpbWl0IDogaW50ZXJuYWxzLmFycmF5TGltaXQ7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9IHR5cGVvZiBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgOiBpbnRlcm5hbHMucGFyYW1ldGVyTGltaXQ7XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gaW50ZXJuYWxzLnBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBpbnRlcm5hbHMucGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gVXRpbHMubWVyZ2Uob2JqLCBuZXdPYmopO1xuICAgIH1cblxuICAgIHJldHVybiBVdGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuXG4vLyBEZWNsYXJlIGludGVybmFsc1xuXG52YXIgaW50ZXJuYWxzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGluZGljZXM6IHRydWVcbn07XG5cblxuaW50ZXJuYWxzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIHByZWZpeCwgb3B0aW9ucykge1xuXG4gICAgaWYgKFV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgb2JqID0gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG5cbiAgICAgICAgcmV0dXJuIFtlbmNvZGVVUklDb21wb25lbnQocHJlZml4KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmopXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb2JqS2V5cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5kaWNlcyAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvYmopKSB7XG5cbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwgcHJlZml4LCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KGludGVybmFscy5zdHJpbmdpZnkob2JqW2tleV0sIHByZWZpeCArICdbJyArIGtleSArICddJywgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBvcHRpb25zKSB7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGludGVybmFscy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcbiAgICBvcHRpb25zLmluZGljZXMgPSB0eXBlb2Ygb3B0aW9ucy5pbmRpY2VzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmluZGljZXMgOiBpbnRlcm5hbHMuaW5kaWNlcztcblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgb2JqID09PSBudWxsKSB7XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvYmpLZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChpbnRlcm5hbHMuc3RyaW5naWZ5KG9ialtrZXldLCBrZXksIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cy5qb2luKGRlbGltaXRlcik7XG59O1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cblxuLy8gRGVjbGFyZSBpbnRlcm5hbHNcblxudmFyIGludGVybmFscyA9IHt9O1xuXG5cbmV4cG9ydHMuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcblxuICAgIHZhciBvYmogPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzb3VyY2UubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRhcmdldCA9IFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiZcbiAgICAgICAgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXG4gICAgICAgIHRhcmdldCA9IGV4cG9ydHMuYXJyYXlUb09iamVjdCh0YXJnZXQpO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICBmb3IgKHZhciBrID0gMCwga2wgPSBrZXlzLmxlbmd0aDsgayA8IGtsOyArK2spIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNba107XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmICghdGFyZ2V0W2tleV0pIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IGV4cG9ydHMubWVyZ2UodGFyZ2V0W2tleV0sIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG5cbmV4cG9ydHMuY29tcGFjdCA9IGZ1bmN0aW9uIChvYmosIHJlZnMpIHtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBvYmogPT09IG51bGwpIHtcblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJlZnMgPSByZWZzIHx8IFtdO1xuICAgIHZhciBsb29rdXAgPSByZWZzLmluZGV4T2Yob2JqKTtcbiAgICBpZiAobG9va3VwICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gcmVmc1tsb29rdXBdO1xuICAgIH1cblxuICAgIHJlZnMucHVzaChvYmopO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb2JqLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcGFjdGVkO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgb2JqW2tleV0gPSBleHBvcnRzLmNvbXBhY3Qob2JqW2tleV0sIHJlZnMpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmV4cG9ydHMuaXNSZWdFeHAgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cblxuZXhwb3J0cy5pc0J1ZmZlciA9IGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGlmIChvYmogPT09IG51bGwgfHxcbiAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJlxuICAgICAgICBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiZcbiAgICAgICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFeGVjdXRpb25FbnZpcm9ubWVudFxuICovXG5cbi8qanNsaW50IGV2aWw6IHRydWUgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYW5Vc2VET00gPSAhIShcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgd2luZG93LmRvY3VtZW50ICYmXG4gIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XG4pO1xuXG4vKipcbiAqIFNpbXBsZSwgbGlnaHR3ZWlnaHQgbW9kdWxlIGFzc2lzdGluZyB3aXRoIHRoZSBkZXRlY3Rpb24gYW5kIGNvbnRleHQgb2ZcbiAqIFdvcmtlci4gSGVscHMgYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFuZCBhbGxvd3MgY29kZSB0byByZWFzb24gYWJvdXRcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGluIGEgV29ya2VyLCBldmVuIGlmIHRoZXkgbmV2ZXIgaW5jbHVkZSB0aGUgbWFpblxuICogYFJlYWN0V29ya2VyYCBkZXBlbmRlbmN5LlxuICovXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cbiAgY2FuVXNlRE9NOiBjYW5Vc2VET00sXG5cbiAgY2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cbiAgY2FuVXNlRXZlbnRMaXN0ZW5lcnM6XG4gICAgY2FuVXNlRE9NICYmICEhKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8IHdpbmRvdy5hdHRhY2hFdmVudCksXG5cbiAgY2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW4sXG5cbiAgaXNJbldvcmtlcjogIWNhblVzZURPTSAvLyBGb3Igbm93LCB0aGlzIGlzIHRydWUgLSBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGVjdXRpb25FbnZpcm9ubWVudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgT2JqZWN0LmFzc2lnblxuICovXG5cbi8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QuYXNzaWduXG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY3hcbiAqL1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBtYXJrIHN0cmluZyBsaXRlcmFscyByZXByZXNlbnRpbmcgQ1NTIGNsYXNzIG5hbWVzXG4gKiBzbyB0aGF0IHRoZXkgY2FuIGJlIHRyYW5zZm9ybWVkIHN0YXRpY2FsbHkuIFRoaXMgYWxsb3dzIGZvciBtb2R1bGFyaXphdGlvblxuICogYW5kIG1pbmlmaWNhdGlvbiBvZiBDU1MgY2xhc3MgbmFtZXMuXG4gKlxuICogSW4gc3RhdGljX3Vwc3RyZWFtLCB0aGlzIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGltcGxlbWVudGVkLCBidXQgaXQgc2hvdWxkXG4gKiBldmVudHVhbGx5IGJlIHJlcGxhY2VkIHdpdGggc29tZXRoaW5nIG1vcmUgZGVzY3JpcHRpdmUsIGFuZCB0aGUgdHJhbnNmb3JtXG4gKiB0aGF0IGlzIHVzZWQgaW4gdGhlIG1haW4gc3RhY2sgc2hvdWxkIGJlIHBvcnRlZCBmb3IgdXNlIGVsc2V3aGVyZS5cbiAqXG4gKiBAcGFyYW0gc3RyaW5nfG9iamVjdCBjbGFzc05hbWUgdG8gbW9kdWxhcml6ZSwgb3IgYW4gb2JqZWN0IG9mIGtleS92YWx1ZXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICBJbiB0aGUgb2JqZWN0IGNhc2UsIHRoZSB2YWx1ZXMgYXJlIGNvbmRpdGlvbnMgdGhhdFxuICogICAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lIGlmIHRoZSBjbGFzc05hbWUga2V5cyBzaG91bGQgYmUgaW5jbHVkZWQuXG4gKiBAcGFyYW0gW3N0cmluZyAuLi5dICBWYXJpYWJsZSBsaXN0IG9mIGNsYXNzTmFtZXMgaW4gdGhlIHN0cmluZyBjYXNlLlxuICogQHJldHVybiBzdHJpbmcgICAgICAgUmVuZGVyYWJsZSBzcGFjZS1zZXBhcmF0ZWQgQ1NTIGNsYXNzTmFtZS5cbiAqL1xuZnVuY3Rpb24gY3goY2xhc3NOYW1lcykge1xuICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2xhc3NOYW1lcykuZmlsdGVyKGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZXNbY2xhc3NOYW1lXTtcbiAgICB9KS5qb2luKCcgJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5qb2luLmNhbGwoYXJndW1lbnRzLCAnICcpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3g7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZW1wdHlGdW5jdGlvblxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24oYXJnKSB7IHJldHVybiBhcmc7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHdhcm5pbmdcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKFwiLi9lbXB0eUZ1bmN0aW9uXCIpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChcInByb2R1Y3Rpb25cIiAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0ICkge2ZvciAodmFyIGFyZ3M9W10sJF9fMD0yLCRfXzE9YXJndW1lbnRzLmxlbmd0aDskX18wPCRfXzE7JF9fMCsrKSBhcmdzLnB1c2goYXJndW1lbnRzWyRfXzBdKTtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSAge3JldHVybiBhcmdzW2FyZ0luZGV4KytdO30pKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiJdfQ==
