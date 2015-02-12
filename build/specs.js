(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./specs/App-spec.js":[function(require,module,exports){
var App = require('./../app/App.jsx');
var TestUtils = require('react-addons').TestUtils;

describe("App", function() {

  it("should render text: Hello world!", function() {
    var app = TestUtils.renderIntoDocument(App());
    expect(app.getDOMNode().textContent).toEqual('Hello world!');
  });

});
},{"./../app/App.jsx":"/Users/pwmckenna/git/scoreboard/app/App.jsx","react-addons":"react-addons"}],"/Users/pwmckenna/git/scoreboard/app/App.jsx":[function(require,module,exports){
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

},{"react":"react","react-router":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/index.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Cancellation.js":[function(require,module,exports){
/**
 * Represents a cancellation caused by navigating away
 * before the previous transition has fully resolved.
 */
function Cancellation() {}

module.exports = Cancellation;

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Configuration.js":[function(require,module,exports){
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

},{"react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js","react/lib/warning":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/warning.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/History.js":[function(require,module,exports){
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

},{"react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Navigation.js":[function(require,module,exports){
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

},{"./PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/NavigationContext.js":[function(require,module,exports){
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

},{"./PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js":[function(require,module,exports){
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

},{"react":"react","react/lib/Object.assign":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Redirect.js":[function(require,module,exports){
/**
 * Encapsulates a redirect to the given route.
 */
function Redirect(to, params, query) {
  this.to = to;
  this.params = params;
  this.query = query;
}

module.exports = Redirect;

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/RouteHandlerMixin.js":[function(require,module,exports){
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

},{"./PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","react":"react","react/lib/Object.assign":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Routing.js":[function(require,module,exports){
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

},{"./components/DefaultRoute":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/DefaultRoute.js","./components/NotFoundRoute":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/NotFoundRoute.js","./components/Redirect":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Redirect.js","./utils/Path":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/Path.js","react":"react","react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Scrolling.js":[function(require,module,exports){
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

},{"./utils/getWindowScrollPosition":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/getWindowScrollPosition.js","react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/State.js":[function(require,module,exports){
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

},{"./PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/StateContext.js":[function(require,module,exports){
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

},{"./PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","./utils/Path":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/Path.js","react/lib/Object.assign":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Transition.js":[function(require,module,exports){
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

},{"./Redirect":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Redirect.js","react/lib/Object.assign":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/Object.assign.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/actions/LocationActions.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/behaviors/ImitateBrowserBehavior.js":[function(require,module,exports){
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

},{"../actions/LocationActions":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/actions/LocationActions.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/behaviors/ScrollToTopBehavior.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/DefaultRoute.js":[function(require,module,exports){
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

},{"../Configuration":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","react":"react"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Link.js":[function(require,module,exports){
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

},{"../Navigation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Navigation.js","../PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","../State":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/State.js","react":"react","react/lib/Object.assign":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/Object.assign.js","react/lib/cx":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/cx.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/NotFoundRoute.js":[function(require,module,exports){
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

},{"../Configuration":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","react":"react"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Redirect.js":[function(require,module,exports){
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

},{"../Configuration":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","react":"react"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Route.js":[function(require,module,exports){
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

},{"../Configuration":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Configuration.js","../PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","./RouteHandler":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/RouteHandler.js","react":"react"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/RouteHandler.js":[function(require,module,exports){
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

},{"../RouteHandlerMixin":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/RouteHandlerMixin.js","react":"react"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/createRouter.js":[function(require,module,exports){
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

},{"./Cancellation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Cancellation.js","./History":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/History.js","./NavigationContext":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/NavigationContext.js","./PropTypes":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/PropTypes.js","./Redirect":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Redirect.js","./Routing":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Routing.js","./Scrolling":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Scrolling.js","./StateContext":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/StateContext.js","./Transition":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Transition.js","./actions/LocationActions":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/actions/LocationActions.js","./behaviors/ImitateBrowserBehavior":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/behaviors/ImitateBrowserBehavior.js","./isReactChildren":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/isReactChildren.js","./locations/HashLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HashLocation.js","./locations/HistoryLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HistoryLocation.js","./locations/RefreshLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/RefreshLocation.js","./utils/Path":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/Path.js","./utils/supportsHistory":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/supportsHistory.js","_process":"/Users/pwmckenna/git/scoreboard/node_modules/browserify/node_modules/process/browser.js","react":"react","react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js","react/lib/warning":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/warning.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/index.js":[function(require,module,exports){
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


},{"./History":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/History.js","./Navigation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/Navigation.js","./RouteHandlerMixin":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/RouteHandlerMixin.js","./State":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/State.js","./behaviors/ImitateBrowserBehavior":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/behaviors/ImitateBrowserBehavior.js","./behaviors/ScrollToTopBehavior":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/behaviors/ScrollToTopBehavior.js","./components/DefaultRoute":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/DefaultRoute.js","./components/Link":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Link.js","./components/NotFoundRoute":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/NotFoundRoute.js","./components/Redirect":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Redirect.js","./components/Route":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/Route.js","./components/RouteHandler":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/components/RouteHandler.js","./createRouter":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/createRouter.js","./locations/HashLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HashLocation.js","./locations/HistoryLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HistoryLocation.js","./locations/RefreshLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/RefreshLocation.js","./runRouter":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/runRouter.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/isReactChildren.js":[function(require,module,exports){
var React = require('react');

function isValidChild(object) {
  return object == null || React.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || (Array.isArray(object) && object.every(isValidChild));
}

module.exports = isReactChildren;

},{"react":"react"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HashLocation.js":[function(require,module,exports){
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

},{"../History":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/History.js","../actions/LocationActions":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/actions/LocationActions.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HistoryLocation.js":[function(require,module,exports){
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

},{"../History":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/History.js","../actions/LocationActions":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/actions/LocationActions.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/RefreshLocation.js":[function(require,module,exports){
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

},{"../History":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/History.js","./HistoryLocation":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/locations/HistoryLocation.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/runRouter.js":[function(require,module,exports){
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

},{"./createRouter":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/createRouter.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/Path.js":[function(require,module,exports){
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

},{"qs":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/index.js","qs/lib/utils":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/utils.js","react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/getWindowScrollPosition.js":[function(require,module,exports){
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

},{"react/lib/ExecutionEnvironment":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/ExecutionEnvironment.js","react/lib/invariant":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/modules/utils/supportsHistory.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/index.js":[function(require,module,exports){
module.exports = require('./lib/');

},{"./lib/":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/index.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/index.js":[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/parse.js","./stringify":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/stringify.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/parse.js":[function(require,module,exports){
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

},{"./utils":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/utils.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/stringify.js":[function(require,module,exports){
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

},{"./utils":"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/utils.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react-router/node_modules/qs/lib/utils.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/ExecutionEnvironment.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/Object.assign.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/cx.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/emptyFunction.js":[function(require,module,exports){
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

},{}],"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/invariant.js":[function(require,module,exports){
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

},{"_process":"/Users/pwmckenna/git/scoreboard/node_modules/browserify/node_modules/process/browser.js"}],"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/warning.js":[function(require,module,exports){
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

},{"./emptyFunction":"/Users/pwmckenna/git/scoreboard/node_modules/react/lib/emptyFunction.js","_process":"/Users/pwmckenna/git/scoreboard/node_modules/browserify/node_modules/process/browser.js"}]},{},["./specs/App-spec.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcGVjcy9BcHAtc3BlYy5qcyIsImFwcC9BcHAuanN4Iiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9DYW5jZWxsYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvQ29uZmlndXJhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9IaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL05hdmlnYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvTmF2aWdhdGlvbkNvbnRleHQuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvUHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JlZGlyZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlSGFuZGxlck1peGluLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRpbmcuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvU2Nyb2xsaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL1N0YXRlQ29udGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9UcmFuc2l0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2FjdGlvbnMvTG9jYXRpb25BY3Rpb25zLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2JlaGF2aW9ycy9JbWl0YXRlQnJvd3NlckJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2JlaGF2aW9ycy9TY3JvbGxUb1RvcEJlaGF2aW9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvTGluay5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jb21wb25lbnRzL05vdEZvdW5kUm91dGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvY29tcG9uZW50cy9SZWRpcmVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jb21wb25lbnRzL1JvdXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXBvbmVudHMvUm91dGVIYW5kbGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NyZWF0ZVJvdXRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pc1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvbG9jYXRpb25zL0hhc2hMb2NhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9sb2NhdGlvbnMvSGlzdG9yeUxvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL2xvY2F0aW9ucy9SZWZyZXNoTG9jYXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvcnVuUm91dGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9tb2R1bGVzL3V0aWxzL1BhdGguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXRpbHMvZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXRpbHMvc3VwcG9ydHNIaXN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvcGFyc2UuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY3guanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvd2FybmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHAgPSByZXF1aXJlKCcuLy4uL2FwcC9BcHAuanN4Jyk7XG52YXIgVGVzdFV0aWxzID0gcmVxdWlyZSgncmVhY3QtYWRkb25zJykuVGVzdFV0aWxzO1xuXG5kZXNjcmliZShcIkFwcFwiLCBmdW5jdGlvbigpIHtcblxuICBpdChcInNob3VsZCByZW5kZXIgdGV4dDogSGVsbG8gd29ybGQhXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHAgPSBUZXN0VXRpbHMucmVuZGVySW50b0RvY3VtZW50KEFwcCgpKTtcbiAgICBleHBlY3QoYXBwLmdldERPTU5vZGUoKS50ZXh0Q29udGVudCkudG9FcXVhbCgnSGVsbG8gd29ybGQhJyk7XG4gIH0pO1xuXG59KTsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcHBcIixcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RSb3V0ZXIuUm91dGVIYW5kbGVyLCBSZWFjdC5fX3NwcmVhZCh7fSwgIHRoaXMucHJvcHMpKVxuICAgICAgICApXG4gICAgfVxufSk7XG5cdFxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5NdXRhdGlvbk9ic2VydmVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbXTtcblxuICAgIGlmIChjYW5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHZhciBoaWRkZW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVldWVMaXN0ID0gcXVldWUuc2xpY2UoKTtcbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBxdWV1ZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGlkZGVuRGl2LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhpZGRlbkRpdi5zZXRBdHRyaWJ1dGUoJ3llcycsICdubycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGEgY2FuY2VsbGF0aW9uIGNhdXNlZCBieSBuYXZpZ2F0aW5nIGF3YXlcbiAqIGJlZm9yZSB0aGUgcHJldmlvdXMgdHJhbnNpdGlvbiBoYXMgZnVsbHkgcmVzb2x2ZWQuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGxhdGlvbigpIHt9XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsbGF0aW9uO1xuIiwidmFyIHdhcm5pbmcgPSByZXF1aXJlKCdyZWFjdC9saWIvd2FybmluZycpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcblxuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXMoY29tcG9uZW50TmFtZSwgcHJvcFR5cGVzLCBwcm9wcykge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvcFR5cGVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgdmFyIGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcilcbiAgICAgICAgd2FybmluZyhmYWxzZSwgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG5cbnZhciBDb25maWd1cmF0aW9uID0ge1xuXG4gIHN0YXRpY3M6IHtcblxuICAgIHZhbGlkYXRlUHJvcHM6IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgY2hlY2tQcm9wVHlwZXModGhpcy5kaXNwbGF5TmFtZSwgdGhpcy5wcm9wVHlwZXMsIHByb3BzKTtcbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBmYWxzZSxcbiAgICAgICclcyBlbGVtZW50cyBhcmUgZm9yIHJvdXRlciBjb25maWd1cmF0aW9uIG9ubHkgYW5kIHNob3VsZCBub3QgYmUgcmVuZGVyZWQnLFxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZVxuICAgICk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb25maWd1cmF0aW9uO1xuIiwidmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKS5jYW5Vc2VET007XG5cbnZhciBIaXN0b3J5ID0ge1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBudW1iZXIgb2YgZW50cmllcyBpbiB0aGUgaGlzdG9yeS5cbiAgICpcbiAgICogTm90ZTogVGhpcyBwcm9wZXJ0eSBpcyByZWFkLW9ubHkuXG4gICAqL1xuICBsZW5ndGg6IDEsXG5cbiAgLyoqXG4gICAqIFNlbmRzIHRoZSBicm93c2VyIGJhY2sgb25lIGVudHJ5IGluIHRoZSBoaXN0b3J5LlxuICAgKi9cbiAgYmFjazogZnVuY3Rpb24gKCkge1xuICAgIGludmFyaWFudChcbiAgICAgIGNhblVzZURPTSxcbiAgICAgICdDYW5ub3QgdXNlIEhpc3RvcnkuYmFjayB3aXRob3V0IGEgRE9NJ1xuICAgICk7XG5cbiAgICAvLyBEbyB0aGlzIGZpcnN0IHNvIHRoYXQgSGlzdG9yeS5sZW5ndGggd2lsbFxuICAgIC8vIGJlIGFjY3VyYXRlIGluIGxvY2F0aW9uIGNoYW5nZSBsaXN0ZW5lcnMuXG4gICAgSGlzdG9yeS5sZW5ndGggLT0gMTtcblxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpc3Rvcnk7XG4iLCJ2YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9Qcm9wVHlwZXMnKTtcblxuLyoqXG4gKiBBIG1peGluIGZvciBjb21wb25lbnRzIHRoYXQgbW9kaWZ5IHRoZSBVUkwuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgbWl4aW5zOiBbIFJvdXRlci5OYXZpZ2F0aW9uIF0sXG4gKiAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICogICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAqICAgICAgIHRoaXMudHJhbnNpdGlvblRvKCdhUm91dGUnLCB7IHRoZTogJ3BhcmFtcycgfSwgeyB0aGU6ICdxdWVyeScgfSk7XG4gKiAgICAgfSxcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHJldHVybiAoXG4gKiAgICAgICAgIDxhIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkNsaWNrIG1lITwvYT5cbiAqICAgICAgICk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqL1xudmFyIE5hdmlnYXRpb24gPSB7XG5cbiAgY29udGV4dFR5cGVzOiB7XG4gICAgbWFrZVBhdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbWFrZUhyZWY6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdHJhbnNpdGlvblRvOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHJlcGxhY2VXaXRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdvQmFjazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFic29sdXRlIFVSTCBwYXRoIGNyZWF0ZWQgZnJvbSB0aGUgZ2l2ZW4gcm91dGVcbiAgICogbmFtZSwgVVJMIHBhcmFtZXRlcnMsIGFuZCBxdWVyeSB2YWx1ZXMuXG4gICAqL1xuICBtYWtlUGF0aDogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCBtYXkgc2FmZWx5IGJlIHVzZWQgYXMgdGhlIGhyZWYgb2YgYVxuICAgKiBsaW5rIHRvIHRoZSByb3V0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgbWFrZUhyZWY6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQubWFrZUhyZWYodG8sIHBhcmFtcywgcXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHB1c2hpbmdcbiAgICogYSBuZXcgVVJMIG9udG8gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAqL1xuICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIHRoaXMuY29udGV4dC50cmFuc2l0aW9uVG8odG8sIHBhcmFtcywgcXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgVVJMIHNwZWNpZmllZCBpbiB0aGUgYXJndW1lbnRzIGJ5IHJlcGxhY2luZ1xuICAgKiB0aGUgY3VycmVudCBVUkwgaW4gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAqL1xuICByZXBsYWNlV2l0aDogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5jb250ZXh0LnJlcGxhY2VXaXRoKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfSxcblxuICAvKipcbiAgICogVHJhbnNpdGlvbnMgdG8gdGhlIHByZXZpb3VzIFVSTC5cbiAgICovXG4gIGdvQmFjazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY29udGV4dC5nb0JhY2soKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb247XG4iLCJ2YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9Qcm9wVHlwZXMnKTtcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgcm91dGVyIHdpdGggY29udGV4dCBmb3IgUm91dGVyLk5hdmlnYXRpb24uXG4gKi9cbnZhciBOYXZpZ2F0aW9uQ29udGV4dCA9IHtcblxuICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgIG1ha2VQYXRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1ha2VIcmVmOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHRyYW5zaXRpb25UbzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByZXBsYWNlV2l0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnb0JhY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWFrZVBhdGg6IHRoaXMuY29uc3RydWN0b3IubWFrZVBhdGguYmluZCh0aGlzLmNvbnN0cnVjdG9yKSxcbiAgICAgIG1ha2VIcmVmOiB0aGlzLmNvbnN0cnVjdG9yLm1ha2VIcmVmLmJpbmQodGhpcy5jb25zdHJ1Y3RvciksXG4gICAgICB0cmFuc2l0aW9uVG86IHRoaXMuY29uc3RydWN0b3IudHJhbnNpdGlvblRvLmJpbmQodGhpcy5jb25zdHJ1Y3RvciksXG4gICAgICByZXBsYWNlV2l0aDogdGhpcy5jb25zdHJ1Y3Rvci5yZXBsYWNlV2l0aC5iaW5kKHRoaXMuY29uc3RydWN0b3IpLFxuICAgICAgZ29CYWNrOiB0aGlzLmNvbnN0cnVjdG9yLmdvQmFjay5iaW5kKHRoaXMuY29uc3RydWN0b3IpXG4gICAgfTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb25Db250ZXh0O1xuIiwidmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcblxudmFyIFByb3BUeXBlcyA9IGFzc2lnbih7XG5cbiAgLyoqXG4gICAqIFJlcXVpcmVzIHRoYXQgdGhlIHZhbHVlIG9mIGEgcHJvcCBiZSBmYWxzeS5cbiAgICovXG4gIGZhbHN5OiBmdW5jdGlvbiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSlcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJzwnICsgY29tcG9uZW50TmFtZSArICc+IG1heSBub3QgaGF2ZSBhIFwiJyArIHByb3BOYW1lICsgJ1wiIHByb3AnKTtcbiAgfVxuXG59LCBSZWFjdFByb3BUeXBlcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYSByZWRpcmVjdCB0byB0aGUgZ2l2ZW4gcm91dGUuXG4gKi9cbmZ1bmN0aW9uIFJlZGlyZWN0KHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gIHRoaXMudG8gPSB0bztcbiAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gIHRoaXMucXVlcnkgPSBxdWVyeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWRpcmVjdDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgncmVhY3QvbGliL09iamVjdC5hc3NpZ24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1Byb3BUeXBlcycpO1xuXG52YXIgUkVGX05BTUUgPSAnX19yb3V0ZUhhbmRsZXJfXyc7XG5cbnZhciBSb3V0ZUhhbmRsZXJNaXhpbiA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICBnZXRSb3V0ZUF0RGVwdGg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2V0Um91dGVDb21wb25lbnRBdERlcHRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHJvdXRlSGFuZGxlcnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICByb3V0ZUhhbmRsZXJzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByb3V0ZUhhbmRsZXJzOiB0aGlzLmNvbnRleHQucm91dGVIYW5kbGVycy5jb25jYXQoWyB0aGlzIF0pXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3VwZGF0ZVJvdXRlQ29tcG9uZW50KCk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdXBkYXRlUm91dGVDb21wb25lbnQoKTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY29udGV4dC5zZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGgodGhpcy5nZXRSb3V0ZURlcHRoKCksIG51bGwpO1xuICB9LFxuXG4gIF91cGRhdGVSb3V0ZUNvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY29udGV4dC5zZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGgodGhpcy5nZXRSb3V0ZURlcHRoKCksIHRoaXMucmVmc1tSRUZfTkFNRV0pO1xuICB9LFxuXG4gIGdldFJvdXRlRGVwdGg6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LnJvdXRlSGFuZGxlcnMubGVuZ3RoO1xuICB9LFxuXG4gIGNyZWF0ZUNoaWxkUm91dGVIYW5kbGVyOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICB2YXIgcm91dGUgPSB0aGlzLmNvbnRleHQuZ2V0Um91dGVBdERlcHRoKHRoaXMuZ2V0Um91dGVEZXB0aCgpKTtcbiAgICByZXR1cm4gcm91dGUgPyBSZWFjdC5jcmVhdGVFbGVtZW50KHJvdXRlLmhhbmRsZXIsIGFzc2lnbih7fSwgcHJvcHMgfHwgdGhpcy5wcm9wcywgeyByZWY6IFJFRl9OQU1FIH0pKSA6IG51bGw7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZUhhbmRsZXJNaXhpbjtcbiIsIi8qIGpzaGludCAtVzA4NCAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG52YXIgRGVmYXVsdFJvdXRlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0RlZmF1bHRSb3V0ZScpO1xudmFyIE5vdEZvdW5kUm91dGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTm90Rm91bmRSb3V0ZScpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1JlZGlyZWN0Jyk7XG52YXIgUGF0aCA9IHJlcXVpcmUoJy4vdXRpbHMvUGF0aCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2l0aW9uVG9Ib29rKHRvLCBfcGFyYW1zLCBfcXVlcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0cmFuc2l0aW9uLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgdHJhbnNpdGlvbi5yZWRpcmVjdCh0bywgX3BhcmFtcyB8fCBwYXJhbXMsIF9xdWVyeSB8fCBxdWVyeSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlKGVsZW1lbnQsIHBhcmVudFJvdXRlLCBuYW1lZFJvdXRlcykge1xuICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIHByb3BzID0gZWxlbWVudC5wcm9wcztcblxuICBpZiAodHlwZS52YWxpZGF0ZVByb3BzKVxuICAgIHR5cGUudmFsaWRhdGVQcm9wcyhwcm9wcyk7XG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICBpZ25vcmVTY3JvbGxCZWhhdmlvcjogISFwcm9wcy5pZ25vcmVTY3JvbGxCZWhhdmlvclxuICB9O1xuXG4gIGlmICh0eXBlID09PSBSZWRpcmVjdC50eXBlKSB7XG4gICAgb3B0aW9ucy53aWxsVHJhbnNpdGlvblRvID0gY3JlYXRlVHJhbnNpdGlvblRvSG9vayhwcm9wcy50bywgcHJvcHMucGFyYW1zLCBwcm9wcy5xdWVyeSk7XG4gICAgcHJvcHMucGF0aCA9IHByb3BzLnBhdGggfHwgcHJvcHMuZnJvbSB8fCAnKic7XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucy5oYW5kbGVyID0gcHJvcHMuaGFuZGxlcjtcbiAgICBvcHRpb25zLndpbGxUcmFuc2l0aW9uVG8gPSBwcm9wcy5oYW5kbGVyICYmIHByb3BzLmhhbmRsZXIud2lsbFRyYW5zaXRpb25UbztcbiAgICBvcHRpb25zLndpbGxUcmFuc2l0aW9uRnJvbSA9IHByb3BzLmhhbmRsZXIgJiYgcHJvcHMuaGFuZGxlci53aWxsVHJhbnNpdGlvbkZyb207XG4gIH1cblxuICB2YXIgcGFyZW50UGF0aCA9IChwYXJlbnRSb3V0ZSAmJiBwYXJlbnRSb3V0ZS5wYXRoKSB8fCAnLyc7XG5cbiAgaWYgKChwcm9wcy5wYXRoIHx8IHByb3BzLm5hbWUpICYmIHR5cGUgIT09IERlZmF1bHRSb3V0ZS50eXBlICYmIHR5cGUgIT09IE5vdEZvdW5kUm91dGUudHlwZSkge1xuICAgIHZhciBwYXRoID0gcHJvcHMucGF0aCB8fCBwcm9wcy5uYW1lO1xuXG4gICAgLy8gUmVsYXRpdmUgcGF0aHMgZXh0ZW5kIHRoZWlyIHBhcmVudC5cbiAgICBpZiAoIVBhdGguaXNBYnNvbHV0ZShwYXRoKSlcbiAgICAgIHBhdGggPSBQYXRoLmpvaW4ocGFyZW50UGF0aCwgcGF0aCk7XG5cbiAgICBvcHRpb25zLnBhdGggPSBQYXRoLm5vcm1hbGl6ZShwYXRoKTtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zLnBhdGggPSBwYXJlbnRQYXRoO1xuXG4gICAgaWYgKHR5cGUgPT09IE5vdEZvdW5kUm91dGUudHlwZSlcbiAgICAgIG9wdGlvbnMucGF0aCArPSAnKic7XG4gIH1cblxuICBvcHRpb25zLnBhcmFtTmFtZXMgPSBQYXRoLmV4dHJhY3RQYXJhbU5hbWVzKG9wdGlvbnMucGF0aCk7XG5cbiAgLy8gTWFrZSBzdXJlIHRoZSByb3V0ZSdzIHBhdGggaGFzIGFsbCBwYXJhbXMgaXRzIHBhcmVudCBuZWVkcy5cbiAgaWYgKHBhcmVudFJvdXRlICYmIEFycmF5LmlzQXJyYXkocGFyZW50Um91dGUucGFyYW1OYW1lcykpIHtcbiAgICBwYXJlbnRSb3V0ZS5wYXJhbU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtTmFtZSkge1xuICAgICAgaW52YXJpYW50KFxuICAgICAgICBvcHRpb25zLnBhcmFtTmFtZXMuaW5kZXhPZihwYXJhbU5hbWUpICE9PSAtMSxcbiAgICAgICAgJ1RoZSBuZXN0ZWQgcm91dGUgcGF0aCBcIiVzXCIgaXMgbWlzc2luZyB0aGUgXCIlc1wiIHBhcmFtZXRlciBvZiBpdHMgcGFyZW50IHBhdGggXCIlc1wiJyxcbiAgICAgICAgb3B0aW9ucy5wYXRoLCBwYXJhbU5hbWUsIHBhcmVudFJvdXRlLnBhdGhcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgcm91dGUgPSBuZXcgUm91dGUob3B0aW9ucyk7XG5cbiAgLy8gTWFrZSBzdXJlIHRoZSByb3V0ZSBjYW4gYmUgbG9va2VkIHVwIGJ5IDxMaW5rPnMuXG4gIGlmIChwcm9wcy5uYW1lKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgbmFtZWRSb3V0ZXNbcHJvcHMubmFtZV0gPT0gbnVsbCxcbiAgICAgICdZb3UgY2Fubm90IHVzZSB0aGUgbmFtZSBcIiVzXCIgZm9yIG1vcmUgdGhhbiBvbmUgcm91dGUnLFxuICAgICAgcHJvcHMubmFtZVxuICAgICk7XG5cbiAgICBuYW1lZFJvdXRlc1twcm9wcy5uYW1lXSA9IHJvdXRlO1xuICB9XG5cbiAgLy8gSGFuZGxlIDxOb3RGb3VuZFJvdXRlPi5cbiAgaWYgKHR5cGUgPT09IE5vdEZvdW5kUm91dGUudHlwZSkge1xuICAgIGludmFyaWFudChcbiAgICAgIHBhcmVudFJvdXRlLFxuICAgICAgJzxOb3RGb3VuZFJvdXRlPiBtdXN0IGhhdmUgYSBwYXJlbnQgPFJvdXRlPidcbiAgICApO1xuXG4gICAgaW52YXJpYW50KFxuICAgICAgcGFyZW50Um91dGUubm90Rm91bmRSb3V0ZSA9PSBudWxsLFxuICAgICAgJ1lvdSBtYXkgbm90IGhhdmUgbW9yZSB0aGFuIG9uZSA8Tm90Rm91bmRSb3V0ZT4gcGVyIDxSb3V0ZT4nXG4gICAgKTtcblxuICAgIGludmFyaWFudChcbiAgICAgIHByb3BzLmNoaWxkcmVuID09IG51bGwsXG4gICAgICAnPE5vdEZvdW5kUm91dGU+IG11c3Qgbm90IGhhdmUgY2hpbGRyZW4nXG4gICAgKTtcblxuICAgIHBhcmVudFJvdXRlLm5vdEZvdW5kUm91dGUgPSByb3V0ZTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gSGFuZGxlIDxEZWZhdWx0Um91dGU+LlxuICBpZiAodHlwZSA9PT0gRGVmYXVsdFJvdXRlLnR5cGUpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBwYXJlbnRSb3V0ZSxcbiAgICAgICc8RGVmYXVsdFJvdXRlPiBtdXN0IGhhdmUgYSBwYXJlbnQgPFJvdXRlPidcbiAgICApO1xuXG4gICAgaW52YXJpYW50KFxuICAgICAgcGFyZW50Um91dGUuZGVmYXVsdFJvdXRlID09IG51bGwsXG4gICAgICAnWW91IG1heSBub3QgaGF2ZSBtb3JlIHRoYW4gb25lIDxEZWZhdWx0Um91dGU+IHBlciA8Um91dGU+J1xuICAgICk7XG5cbiAgICBpbnZhcmlhbnQoXG4gICAgICBwcm9wcy5jaGlsZHJlbiA9PSBudWxsLFxuICAgICAgJzxEZWZhdWx0Um91dGU+IG11c3Qgbm90IGhhdmUgY2hpbGRyZW4nXG4gICAgKTtcblxuICAgIHBhcmVudFJvdXRlLmRlZmF1bHRSb3V0ZSA9IHJvdXRlO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByb3V0ZS5yb3V0ZXMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihwcm9wcy5jaGlsZHJlbiwgcm91dGUsIG5hbWVkUm91dGVzKTtcblxuICByZXR1cm4gcm91dGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiByb3V0ZSBvYmplY3RzIGZyb20gdGhlIGdpdmVuIFJlYWN0Q2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKGNoaWxkcmVuLCBwYXJlbnRSb3V0ZSwgbmFtZWRSb3V0ZXMpIHtcbiAgdmFyIHJvdXRlcyA9IFtdO1xuXG4gIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIC8vIEV4Y2x1ZGUgbnVsbCB2YWx1ZXMsIDxEZWZhdWx0Um91dGU+cyBhbmQgPE5vdEZvdW5kUm91dGU+cy5cbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIChjaGlsZCA9IGNyZWF0ZVJvdXRlKGNoaWxkLCBwYXJlbnRSb3V0ZSwgbmFtZWRSb3V0ZXMpKSlcbiAgICAgIHJvdXRlcy5wdXNoKGNoaWxkKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlcztcbn1cblxuZnVuY3Rpb24gUm91dGUob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gIHRoaXMucGF0aCA9IG9wdGlvbnMucGF0aCB8fCAnLyc7XG4gIHRoaXMucGFyYW1OYW1lcyA9IG9wdGlvbnMucGFyYW1OYW1lcyB8fCBQYXRoLmV4dHJhY3RQYXJhbU5hbWVzKHRoaXMucGF0aCk7XG4gIHRoaXMuaWdub3JlU2Nyb2xsQmVoYXZpb3IgPSAhIW9wdGlvbnMuaWdub3JlU2Nyb2xsQmVoYXZpb3I7XG4gIHRoaXMud2lsbFRyYW5zaXRpb25UbyA9IG9wdGlvbnMud2lsbFRyYW5zaXRpb25UbztcbiAgdGhpcy53aWxsVHJhbnNpdGlvbkZyb20gPSBvcHRpb25zLndpbGxUcmFuc2l0aW9uRnJvbTtcbiAgdGhpcy5oYW5kbGVyID0gb3B0aW9ucy5oYW5kbGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW46IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuLFxuICBSb3V0ZTogUm91dGVcbn07XG4iLCJ2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpLmNhblVzZURPTTtcbnZhciBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbiA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24nKTtcblxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlU2Nyb2xsKHN0YXRlLCBwcmV2U3RhdGUpIHtcbiAgaWYgKCFwcmV2U3RhdGUpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgLy8gRG9uJ3QgdXBkYXRlIHNjcm9sbCBwb3NpdGlvbiB3aGVuIG9ubHkgdGhlIHF1ZXJ5IGhhcyBjaGFuZ2VkLlxuICBpZiAoc3RhdGUucGF0aG5hbWUgPT09IHByZXZTdGF0ZS5wYXRobmFtZSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHJvdXRlcyA9IHN0YXRlLnJvdXRlcztcbiAgdmFyIHByZXZSb3V0ZXMgPSBwcmV2U3RhdGUucm91dGVzO1xuXG4gIHZhciBzaGFyZWRBbmNlc3RvclJvdXRlcyA9IHJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgcmV0dXJuIHByZXZSb3V0ZXMuaW5kZXhPZihyb3V0ZSkgIT09IC0xO1xuICB9KTtcblxuICByZXR1cm4gIXNoYXJlZEFuY2VzdG9yUm91dGVzLnNvbWUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgcmV0dXJuIHJvdXRlLmlnbm9yZVNjcm9sbEJlaGF2aW9yO1xuICB9KTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgcm91dGVyIHdpdGggdGhlIGFiaWxpdHkgdG8gbWFuYWdlIHdpbmRvdyBzY3JvbGwgcG9zaXRpb25cbiAqIGFjY29yZGluZyB0byBpdHMgc2Nyb2xsIGJlaGF2aW9yLlxuICovXG52YXIgU2Nyb2xsaW5nID0ge1xuXG4gIHN0YXRpY3M6IHtcbiAgICAvKipcbiAgICAgKiBSZWNvcmRzIGN1cmVudCBzY3JvbGwgcG9zaXRpb24gYXMgdGhlIGxhc3Qga25vd24gcG9zaXRpb24gZm9yIHRoZSBnaXZlbiBVUkwgcGF0aC5cbiAgICAgKi9cbiAgICByZWNvcmRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIGlmICghdGhpcy5zY3JvbGxIaXN0b3J5KVxuICAgICAgICB0aGlzLnNjcm9sbEhpc3RvcnkgPSB7fTtcblxuICAgICAgdGhpcy5zY3JvbGxIaXN0b3J5W3BhdGhdID0gZ2V0V2luZG93U2Nyb2xsUG9zaXRpb24oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFzdCBrbm93biBzY3JvbGwgcG9zaXRpb24gZm9yIHRoZSBnaXZlbiBVUkwgcGF0aC5cbiAgICAgKi9cbiAgICBnZXRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIGlmICghdGhpcy5zY3JvbGxIaXN0b3J5KVxuICAgICAgICB0aGlzLnNjcm9sbEhpc3RvcnkgPSB7fTtcblxuICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsSGlzdG9yeVtwYXRoXSB8fCBudWxsO1xuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICB0aGlzLmdldFNjcm9sbEJlaGF2aW9yKCkgPT0gbnVsbCB8fCBjYW5Vc2VET00sXG4gICAgICAnQ2Fubm90IHVzZSBzY3JvbGwgYmVoYXZpb3Igd2l0aG91dCBhIERPTSdcbiAgICApO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdXBkYXRlU2Nyb2xsKCk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiAocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICB0aGlzLl91cGRhdGVTY3JvbGwocHJldlN0YXRlKTtcbiAgfSxcblxuICBfdXBkYXRlU2Nyb2xsOiBmdW5jdGlvbiAocHJldlN0YXRlKSB7XG4gICAgaWYgKCFzaG91bGRVcGRhdGVTY3JvbGwodGhpcy5zdGF0ZSwgcHJldlN0YXRlKSlcbiAgICAgIHJldHVybjtcblxuICAgIHZhciBzY3JvbGxCZWhhdmlvciA9IHRoaXMuZ2V0U2Nyb2xsQmVoYXZpb3IoKTtcblxuICAgIGlmIChzY3JvbGxCZWhhdmlvcilcbiAgICAgIHNjcm9sbEJlaGF2aW9yLnVwZGF0ZVNjcm9sbFBvc2l0aW9uKFxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmdldFNjcm9sbFBvc2l0aW9uKHRoaXMuc3RhdGUucGF0aCksXG4gICAgICAgIHRoaXMuc3RhdGUuYWN0aW9uXG4gICAgICApO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsaW5nO1xuIiwidmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbi8qKlxuICogQSBtaXhpbiBmb3IgY29tcG9uZW50cyB0aGF0IG5lZWQgdG8ga25vdyB0aGUgcGF0aCwgcm91dGVzLCBVUkxcbiAqIHBhcmFtcyBhbmQgcXVlcnkgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgdmFyIEFib3V0TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBtaXhpbnM6IFsgUm91dGVyLlN0YXRlIF0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWU7XG4gKiAgIFxuICogICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoJ2Fib3V0JykpXG4gKiAgICAgICAgIGNsYXNzTmFtZSArPSAnIGlzLWFjdGl2ZSc7XG4gKiAgIFxuICogICAgICAgcmV0dXJuIFJlYWN0LkRPTS5hKHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgfSwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gKiAgICAgfVxuICogICB9KTtcbiAqL1xudmFyIFN0YXRlID0ge1xuXG4gIGNvbnRleHRUeXBlczoge1xuICAgIGdldEN1cnJlbnRQYXRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRSb3V0ZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFBhdGhuYW1lOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRQYXJhbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFF1ZXJ5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQWN0aXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGguXG4gICAqL1xuICBnZXRQYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRDdXJyZW50UGF0aCgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSByb3V0ZXMgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIGdldFJvdXRlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFJvdXRlcygpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoIHdpdGhvdXQgdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIGdldFBhdGhuYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRDdXJyZW50UGF0aG5hbWUoKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3Qgb2YgdGhlIFVSTCBwYXJhbXMgdGhhdCBhcmUgY3VycmVudGx5IGFjdGl2ZS5cbiAgICovXG4gIGdldFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFBhcmFtcygpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUgcXVlcnkgcGFyYW1zIHRoYXQgYXJlIGN1cnJlbnRseSBhY3RpdmUuXG4gICAqL1xuICBnZXRRdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0Q3VycmVudFF1ZXJ5KCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEEgaGVscGVyIG1ldGhvZCB0byBkZXRlcm1pbmUgaWYgYSBnaXZlbiByb3V0ZSwgcGFyYW1zLCBhbmQgcXVlcnlcbiAgICogYXJlIGFjdGl2ZS5cbiAgICovXG4gIGlzQWN0aXZlOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmlzQWN0aXZlKHRvLCBwYXJhbXMsIHF1ZXJ5KTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlO1xuIiwidmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9Qcm9wVHlwZXMnKTtcbnZhciBQYXRoID0gcmVxdWlyZSgnLi91dGlscy9QYXRoJyk7XG5cbmZ1bmN0aW9uIHJvdXRlSXNBY3RpdmUoYWN0aXZlUm91dGVzLCByb3V0ZU5hbWUpIHtcbiAgcmV0dXJuIGFjdGl2ZVJvdXRlcy5zb21lKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHJldHVybiByb3V0ZS5uYW1lID09PSByb3V0ZU5hbWU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJhbXNBcmVBY3RpdmUoYWN0aXZlUGFyYW1zLCBwYXJhbXMpIHtcbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gcGFyYW1zKVxuICAgIGlmIChTdHJpbmcoYWN0aXZlUGFyYW1zW3Byb3BlcnR5XSkgIT09IFN0cmluZyhwYXJhbXNbcHJvcGVydHldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcXVlcnlJc0FjdGl2ZShhY3RpdmVRdWVyeSwgcXVlcnkpIHtcbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gcXVlcnkpXG4gICAgaWYgKFN0cmluZyhhY3RpdmVRdWVyeVtwcm9wZXJ0eV0pICE9PSBTdHJpbmcocXVlcnlbcHJvcGVydHldKSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgcm91dGVyIHdpdGggY29udGV4dCBmb3IgUm91dGVyLlN0YXRlLlxuICovXG52YXIgU3RhdGVDb250ZXh0ID0ge1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVSTCBwYXRoICsgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgZ2V0Q3VycmVudFBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wYXRoO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmVhZC1vbmx5IGFycmF5IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHJvdXRlcy5cbiAgICovXG4gIGdldEN1cnJlbnRSb3V0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5yb3V0ZXMuc2xpY2UoMCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGggd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgZ2V0Q3VycmVudFBhdGhuYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucGF0aG5hbWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByZWFkLW9ubHkgb2JqZWN0IG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIFVSTCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgZ2V0Q3VycmVudFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhc3NpZ24oe30sIHRoaXMuc3RhdGUucGFyYW1zKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHJlYWQtb25seSBvYmplY3Qgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgcXVlcnkgcGFyYW1ldGVycy5cbiAgICovXG4gIGdldEN1cnJlbnRRdWVyeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhc3NpZ24oe30sIHRoaXMuc3RhdGUucXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHJvdXRlLCBwYXJhbXMsIGFuZCBxdWVyeSBhcmUgYWN0aXZlLlxuICAgKi9cbiAgaXNBY3RpdmU6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgIGlmIChQYXRoLmlzQWJzb2x1dGUodG8pKVxuICAgICAgcmV0dXJuIHRvID09PSB0aGlzLnN0YXRlLnBhdGg7XG5cbiAgICByZXR1cm4gcm91dGVJc0FjdGl2ZSh0aGlzLnN0YXRlLnJvdXRlcywgdG8pICYmXG4gICAgICBwYXJhbXNBcmVBY3RpdmUodGhpcy5zdGF0ZS5wYXJhbXMsIHBhcmFtcykgJiZcbiAgICAgIChxdWVyeSA9PSBudWxsIHx8IHF1ZXJ5SXNBY3RpdmUodGhpcy5zdGF0ZS5xdWVyeSwgcXVlcnkpKTtcbiAgfSxcblxuICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgIGdldEN1cnJlbnRQYXRoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRSb3V0ZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFBhdGhuYW1lOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEN1cnJlbnRQYXJhbXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0Q3VycmVudFF1ZXJ5OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlzQWN0aXZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH0sXG5cbiAgZ2V0Q2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEN1cnJlbnRQYXRoOiB0aGlzLmdldEN1cnJlbnRQYXRoLFxuICAgICAgZ2V0Q3VycmVudFJvdXRlczogdGhpcy5nZXRDdXJyZW50Um91dGVzLFxuICAgICAgZ2V0Q3VycmVudFBhdGhuYW1lOiB0aGlzLmdldEN1cnJlbnRQYXRobmFtZSxcbiAgICAgIGdldEN1cnJlbnRQYXJhbXM6IHRoaXMuZ2V0Q3VycmVudFBhcmFtcyxcbiAgICAgIGdldEN1cnJlbnRRdWVyeTogdGhpcy5nZXRDdXJyZW50UXVlcnksXG4gICAgICBpc0FjdGl2ZTogdGhpcy5pc0FjdGl2ZVxuICAgIH07XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZUNvbnRleHQ7XG4iLCIvKiBqc2hpbnQgLVcwNTggKi9cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdyZWFjdC9saWIvT2JqZWN0LmFzc2lnbicpO1xudmFyIFJlZGlyZWN0ID0gcmVxdWlyZSgnLi9SZWRpcmVjdCcpO1xuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhIHRyYW5zaXRpb24gdG8gYSBnaXZlbiBwYXRoLlxuICpcbiAqIFRoZSB3aWxsVHJhbnNpdGlvblRvIGFuZCB3aWxsVHJhbnNpdGlvbkZyb20gaGFuZGxlcnMgcmVjZWl2ZVxuICogYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzcyBhcyB0aGVpciBmaXJzdCBhcmd1bWVudC5cbiAqL1xuZnVuY3Rpb24gVHJhbnNpdGlvbihwYXRoLCByZXRyeSkge1xuICB0aGlzLnBhdGggPSBwYXRoO1xuICB0aGlzLmFib3J0UmVhc29uID0gbnVsbDtcbiAgdGhpcy5yZXRyeSA9IHJldHJ5LmJpbmQodGhpcyk7XG59XG5cbmFzc2lnbihUcmFuc2l0aW9uLnByb3RvdHlwZSwge1xuXG4gIGFib3J0OiBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgaWYgKHRoaXMuYWJvcnRSZWFzb24gPT0gbnVsbClcbiAgICAgIHRoaXMuYWJvcnRSZWFzb24gPSByZWFzb24gfHwgJ0FCT1JUJztcbiAgfSxcblxuICByZWRpcmVjdDogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgdGhpcy5hYm9ydChuZXcgUmVkaXJlY3QodG8sIHBhcmFtcywgcXVlcnkpKTtcbiAgfSxcblxuICBmcm9tOiBmdW5jdGlvbiAocm91dGVzLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBydW5Ib29rcyA9IHJvdXRlcy5yZWR1Y2UoZnVuY3Rpb24gKGNhbGxiYWNrLCByb3V0ZSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIHx8IHNlbGYuYWJvcnRSZWFzb24pIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAocm91dGUud2lsbFRyYW5zaXRpb25Gcm9tKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJvdXRlLndpbGxUcmFuc2l0aW9uRnJvbShzZWxmLCBjb21wb25lbnRzW2luZGV4XSwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBjYWxsYmFjayBpbiB0aGUgYXJndW1lbnQgbGlzdCwgY2FsbCBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgICAgaWYgKHJvdXRlLndpbGxUcmFuc2l0aW9uRnJvbS5sZW5ndGggPCAzKVxuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sIGNhbGxiYWNrKTtcblxuICAgIHJ1bkhvb2tzKCk7XG4gIH0sXG5cbiAgdG86IGZ1bmN0aW9uIChyb3V0ZXMsIHBhcmFtcywgcXVlcnksIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHJ1bkhvb2tzID0gcm91dGVzLnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChjYWxsYmFjaywgcm91dGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIHx8IHNlbGYuYWJvcnRSZWFzb24pIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAocm91dGUud2lsbFRyYW5zaXRpb25Ubykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByb3V0ZS53aWxsVHJhbnNpdGlvblRvKHNlbGYsIHBhcmFtcywgcXVlcnksIGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY2FsbGJhY2sgaW4gdGhlIGFyZ3VtZW50IGxpc3QsIGNhbGwgaXQgYXV0b21hdGljYWxseS5cbiAgICAgICAgICAgIGlmIChyb3V0ZS53aWxsVHJhbnNpdGlvblRvLmxlbmd0aCA8IDQpXG4gICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgY2FsbGJhY2spO1xuXG4gICAgcnVuSG9va3MoKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uO1xuIiwiLyoqXG4gKiBBY3Rpb25zIHRoYXQgbW9kaWZ5IHRoZSBVUkwuXG4gKi9cbnZhciBMb2NhdGlvbkFjdGlvbnMgPSB7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBhIG5ldyBsb2NhdGlvbiBpcyBiZWluZyBwdXNoZWQgdG8gdGhlIGhpc3Rvcnkgc3RhY2suXG4gICAqL1xuICBQVVNIOiAncHVzaCcsXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGUgY3VycmVudCBsb2NhdGlvbiBzaG91bGQgYmUgcmVwbGFjZWQuXG4gICAqL1xuICBSRVBMQUNFOiAncmVwbGFjZScsXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGUgbW9zdCByZWNlbnQgZW50cnkgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICovXG4gIFBPUDogJ3BvcCdcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2NhdGlvbkFjdGlvbnM7XG4iLCJ2YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9Mb2NhdGlvbkFjdGlvbnMnKTtcblxuLyoqXG4gKiBBIHNjcm9sbCBiZWhhdmlvciB0aGF0IGF0dGVtcHRzIHRvIGltaXRhdGUgdGhlIGRlZmF1bHQgYmVoYXZpb3JcbiAqIG9mIG1vZGVybiBicm93c2Vycy5cbiAqL1xudmFyIEltaXRhdGVCcm93c2VyQmVoYXZpb3IgPSB7XG5cbiAgdXBkYXRlU2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uIChwb3NpdGlvbiwgYWN0aW9uVHlwZSkge1xuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBMb2NhdGlvbkFjdGlvbnMuUFVTSDpcbiAgICAgIGNhc2UgTG9jYXRpb25BY3Rpb25zLlJFUExBQ0U6XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvY2F0aW9uQWN0aW9ucy5QT1A6XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW1pdGF0ZUJyb3dzZXJCZWhhdmlvcjtcbiIsIi8qKlxuICogQSBzY3JvbGwgYmVoYXZpb3IgdGhhdCBhbHdheXMgc2Nyb2xscyB0byB0aGUgdG9wIG9mIHRoZSBwYWdlXG4gKiBhZnRlciBhIHRyYW5zaXRpb24uXG4gKi9cbnZhciBTY3JvbGxUb1RvcEJlaGF2aW9yID0ge1xuXG4gIHVwZGF0ZVNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsVG9Ub3BCZWhhdmlvcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQ29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4uL0NvbmZpZ3VyYXRpb24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuLi9Qcm9wVHlwZXMnKTtcblxuLyoqXG4gKiBBIDxEZWZhdWx0Um91dGU+IGNvbXBvbmVudCBpcyBhIHNwZWNpYWwga2luZCBvZiA8Um91dGU+IHRoYXRcbiAqIHJlbmRlcnMgd2hlbiBpdHMgcGFyZW50IG1hdGNoZXMgYnV0IG5vbmUgb2YgaXRzIHNpYmxpbmdzIGRvLlxuICogT25seSBvbmUgc3VjaCByb3V0ZSBtYXkgYmUgdXNlZCBhdCBhbnkgZ2l2ZW4gbGV2ZWwgaW4gdGhlXG4gKiByb3V0ZSBoaWVyYXJjaHkuXG4gKi9cbnZhciBEZWZhdWx0Um91dGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZGlzcGxheU5hbWU6ICdEZWZhdWx0Um91dGUnLFxuXG4gIG1peGluczogWyBDb25maWd1cmF0aW9uIF0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwYXRoOiBQcm9wVHlwZXMuZmFsc3ksXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5mYWxzeSxcbiAgICBoYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGVmYXVsdFJvdXRlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBjbGFzc1NldCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9jeCcpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG52YXIgTmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4uL05hdmlnYXRpb24nKTtcbnZhciBTdGF0ZSA9IHJlcXVpcmUoJy4uL1N0YXRlJyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgnLi4vUHJvcFR5cGVzJyk7XG5cbmZ1bmN0aW9uIGlzTGVmdENsaWNrRXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAhIShldmVudC5tZXRhS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KTtcbn1cblxuLyoqXG4gKiA8TGluaz4gY29tcG9uZW50cyBhcmUgdXNlZCB0byBjcmVhdGUgYW4gPGE+IGVsZW1lbnQgdGhhdCBsaW5rcyB0byBhIHJvdXRlLlxuICogV2hlbiB0aGF0IHJvdXRlIGlzIGFjdGl2ZSwgdGhlIGxpbmsgZ2V0cyBhbiBcImFjdGl2ZVwiIGNsYXNzIG5hbWUgKG9yIHRoZVxuICogdmFsdWUgb2YgaXRzIGBhY3RpdmVDbGFzc05hbWVgIHByb3ApLlxuICpcbiAqIEZvciBleGFtcGxlLCBhc3N1bWluZyB5b3UgaGF2ZSB0aGUgZm9sbG93aW5nIHJvdXRlOlxuICpcbiAqICAgPFJvdXRlIG5hbWU9XCJzaG93UG9zdFwiIHBhdGg9XCIvcG9zdHMvOnBvc3RJRFwiIGhhbmRsZXI9e1Bvc3R9Lz5cbiAqXG4gKiBZb3UgY291bGQgdXNlIHRoZSBmb2xsb3dpbmcgY29tcG9uZW50IHRvIGxpbmsgdG8gdGhhdCByb3V0ZTpcbiAqXG4gKiAgIDxMaW5rIHRvPVwic2hvd1Bvc3RcIiBwYXJhbXM9e3sgcG9zdElEOiBcIjEyM1wiIH19IC8+XG4gKlxuICogSW4gYWRkaXRpb24gdG8gcGFyYW1zLCBsaW5rcyBtYXkgcGFzcyBhbG9uZyBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyc1xuICogdXNpbmcgdGhlIGBxdWVyeWAgcHJvcC5cbiAqXG4gKiAgIDxMaW5rIHRvPVwic2hvd1Bvc3RcIiBwYXJhbXM9e3sgcG9zdElEOiBcIjEyM1wiIH19IHF1ZXJ5PXt7IHNob3c6dHJ1ZSB9fS8+XG4gKi9cbnZhciBMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGRpc3BsYXlOYW1lOiAnTGluaycsXG5cbiAgbWl4aW5zOiBbIE5hdmlnYXRpb24sIFN0YXRlIF0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgYWN0aXZlQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdG86IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBwYXJhbXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcXVlcnk6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmNcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZlQ2xhc3NOYW1lOiAnYWN0aXZlJ1xuICAgIH07XG4gIH0sXG5cbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBhbGxvd1RyYW5zaXRpb24gPSB0cnVlO1xuICAgIHZhciBjbGlja1Jlc3VsdDtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spXG4gICAgICBjbGlja1Jlc3VsdCA9IHRoaXMucHJvcHMub25DbGljayhldmVudCk7XG5cbiAgICBpZiAoaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB8fCAhaXNMZWZ0Q2xpY2tFdmVudChldmVudCkpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAoY2xpY2tSZXN1bHQgPT09IGZhbHNlIHx8IGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpXG4gICAgICBhbGxvd1RyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoYWxsb3dUcmFuc2l0aW9uKVxuICAgICAgdGhpcy50cmFuc2l0aW9uVG8odGhpcy5wcm9wcy50bywgdGhpcy5wcm9wcy5wYXJhbXMsIHRoaXMucHJvcHMucXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgXCJocmVmXCIgYXR0cmlidXRlIHRvIHVzZSBvbiB0aGUgRE9NIGVsZW1lbnQuXG4gICAqL1xuICBnZXRIcmVmOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFrZUhyZWYodGhpcy5wcm9wcy50bywgdGhpcy5wcm9wcy5wYXJhbXMsIHRoaXMucHJvcHMucXVlcnkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgXCJjbGFzc1wiIGF0dHJpYnV0ZSB0byB1c2Ugb24gdGhlIERPTSBlbGVtZW50LCB3aGljaCBjb250YWluc1xuICAgKiB0aGUgdmFsdWUgb2YgdGhlIGFjdGl2ZUNsYXNzTmFtZSBwcm9wZXJ0eSB3aGVuIHRoaXMgPExpbms+IGlzIGFjdGl2ZS5cbiAgICovXG4gIGdldENsYXNzTmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjbGFzc05hbWVzID0ge307XG5cbiAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpXG4gICAgICBjbGFzc05hbWVzW3RoaXMucHJvcHMuY2xhc3NOYW1lXSA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5pc0FjdGl2ZSh0aGlzLnByb3BzLnRvLCB0aGlzLnByb3BzLnBhcmFtcywgdGhpcy5wcm9wcy5xdWVyeSkpXG4gICAgICBjbGFzc05hbWVzW3RoaXMucHJvcHMuYWN0aXZlQ2xhc3NOYW1lXSA9IHRydWU7XG5cbiAgICByZXR1cm4gY2xhc3NTZXQoY2xhc3NOYW1lcyk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb3BzID0gYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICBocmVmOiB0aGlzLmdldEhyZWYoKSxcbiAgICAgIGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc05hbWUoKSxcbiAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2tcbiAgICB9KTtcblxuICAgIHJldHVybiBSZWFjdC5ET00uYShwcm9wcywgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQ29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4uL0NvbmZpZ3VyYXRpb24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuLi9Qcm9wVHlwZXMnKTtcblxuLyoqXG4gKiBBIDxOb3RGb3VuZFJvdXRlPiBpcyBhIHNwZWNpYWwga2luZCBvZiA8Um91dGU+IHRoYXRcbiAqIHJlbmRlcnMgd2hlbiB0aGUgYmVnaW5uaW5nIG9mIGl0cyBwYXJlbnQncyBwYXRoIG1hdGNoZXNcbiAqIGJ1dCBub25lIG9mIGl0cyBzaWJsaW5ncyBkbywgaW5jbHVkaW5nIGFueSA8RGVmYXVsdFJvdXRlPi5cbiAqIE9ubHkgb25lIHN1Y2ggcm91dGUgbWF5IGJlIHVzZWQgYXQgYW55IGdpdmVuIGxldmVsIGluIHRoZVxuICogcm91dGUgaGllcmFyY2h5LlxuICovXG52YXIgTm90Rm91bmRSb3V0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBkaXNwbGF5TmFtZTogJ05vdEZvdW5kUm91dGUnLFxuXG4gIG1peGluczogWyBDb25maWd1cmF0aW9uIF0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwYXRoOiBQcm9wVHlwZXMuZmFsc3ksXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5mYWxzeSxcbiAgICBoYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm90Rm91bmRSb3V0ZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQ29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4uL0NvbmZpZ3VyYXRpb24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuLi9Qcm9wVHlwZXMnKTtcblxuLyoqXG4gKiBBIDxSZWRpcmVjdD4gY29tcG9uZW50IGlzIGEgc3BlY2lhbCBraW5kIG9mIDxSb3V0ZT4gdGhhdCBhbHdheXNcbiAqIHJlZGlyZWN0cyB0byBhbm90aGVyIHJvdXRlIHdoZW4gaXQgbWF0Y2hlcy5cbiAqL1xudmFyIFJlZGlyZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGRpc3BsYXlOYW1lOiAnUmVkaXJlY3QnLFxuXG4gIG1peGluczogWyBDb25maWd1cmF0aW9uIF0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgcGF0aDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmcm9tOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBBbGlhcyBmb3IgcGF0aC5cbiAgICB0bzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBoYW5kbGVyOiBQcm9wVHlwZXMuZmFsc3lcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWRpcmVjdDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQ29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4uL0NvbmZpZ3VyYXRpb24nKTtcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCcuLi9Qcm9wVHlwZXMnKTtcbnZhciBSb3V0ZUhhbmRsZXIgPSByZXF1aXJlKCcuL1JvdXRlSGFuZGxlcicpO1xuLyoqXG4gKiA8Um91dGU+IGNvbXBvbmVudHMgc3BlY2lmeSBjb21wb25lbnRzIHRoYXQgYXJlIHJlbmRlcmVkIHRvIHRoZSBwYWdlIHdoZW4gdGhlXG4gKiBVUkwgbWF0Y2hlcyBhIGdpdmVuIHBhdHRlcm4uXG4gKlxuICogUm91dGVzIGFyZSBhcnJhbmdlZCBpbiBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZS4gV2hlbiBhIG5ldyBVUkwgaXMgcmVxdWVzdGVkLFxuICogdGhlIHRyZWUgaXMgc2VhcmNoZWQgZGVwdGgtZmlyc3QgdG8gZmluZCBhIHJvdXRlIHdob3NlIHBhdGggbWF0Y2hlcyB0aGUgVVJMLlxuICogV2hlbiBvbmUgaXMgZm91bmQsIGFsbCByb3V0ZXMgaW4gdGhlIHRyZWUgdGhhdCBsZWFkIHRvIGl0IGFyZSBjb25zaWRlcmVkXG4gKiBcImFjdGl2ZVwiIGFuZCB0aGVpciBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBpbnRvIHRoZSBET00sIG5lc3RlZCBpbiB0aGUgc2FtZVxuICogb3JkZXIgYXMgdGhleSBhcmUgaW4gdGhlIHRyZWUuXG4gKlxuICogVGhlIHByZWZlcnJlZCB3YXkgdG8gY29uZmlndXJlIGEgcm91dGVyIGlzIHVzaW5nIEpTWC4gVGhlIFhNTC1saWtlIHN5bnRheCBpc1xuICogYSBncmVhdCB3YXkgdG8gdmlzdWFsaXplIGhvdyByb3V0ZXMgYXJlIGxhaWQgb3V0IGluIGFuIGFwcGxpY2F0aW9uLlxuICpcbiAqICAgdmFyIHJvdXRlcyA9IFtcbiAqICAgICA8Um91dGUgaGFuZGxlcj17QXBwfT5cbiAqICAgICAgIDxSb3V0ZSBuYW1lPVwibG9naW5cIiBoYW5kbGVyPXtMb2dpbn0vPlxuICogICAgICAgPFJvdXRlIG5hbWU9XCJsb2dvdXRcIiBoYW5kbGVyPXtMb2dvdXR9Lz5cbiAqICAgICAgIDxSb3V0ZSBuYW1lPVwiYWJvdXRcIiBoYW5kbGVyPXtBYm91dH0vPlxuICogICAgIDwvUm91dGU+XG4gKiAgIF07XG4gKiAgIFxuICogICBSb3V0ZXIucnVuKHJvdXRlcywgZnVuY3Rpb24gKEhhbmRsZXIpIHtcbiAqICAgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIvPiwgZG9jdW1lbnQuYm9keSk7XG4gKiAgIH0pO1xuICpcbiAqIEhhbmRsZXJzIGZvciBSb3V0ZSBjb21wb25lbnRzIHRoYXQgY29udGFpbiBjaGlsZHJlbiBjYW4gcmVuZGVyIHRoZWlyIGFjdGl2ZVxuICogY2hpbGQgcm91dGUgdXNpbmcgYSA8Um91dGVIYW5kbGVyPiBlbGVtZW50LlxuICpcbiAqICAgdmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHJldHVybiAoXG4gKiAgICAgICAgIDxkaXYgY2xhc3M9XCJhcHBsaWNhdGlvblwiPlxuICogICAgICAgICAgIDxSb3V0ZUhhbmRsZXIvPlxuICogICAgICAgICA8L2Rpdj5cbiAqICAgICAgICk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBJZiBubyBoYW5kbGVyIGlzIHByb3ZpZGVkIGZvciB0aGUgcm91dGUsIGl0IHdpbGwgcmVuZGVyIGEgbWF0Y2hlZCBjaGlsZCByb3V0ZS5cbiAqL1xudmFyIFJvdXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGRpc3BsYXlOYW1lOiAnUm91dGUnLFxuXG4gIG1peGluczogWyBDb25maWd1cmF0aW9uIF0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwYXRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlnbm9yZVNjcm9sbEJlaGF2aW9yOiBQcm9wVHlwZXMuYm9vbFxuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4ge1xuICAgICAgaGFuZGxlcjogUm91dGVIYW5kbGVyXG4gICAgfTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUm91dGVIYW5kbGVyTWl4aW4gPSByZXF1aXJlKCcuLi9Sb3V0ZUhhbmRsZXJNaXhpbicpO1xuXG4vKipcbiAqIEEgPFJvdXRlSGFuZGxlcj4gY29tcG9uZW50IHJlbmRlcnMgdGhlIGFjdGl2ZSBjaGlsZCByb3V0ZSBoYW5kbGVyXG4gKiB3aGVuIHJvdXRlcyBhcmUgbmVzdGVkLlxuICovXG52YXIgUm91dGVIYW5kbGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGRpc3BsYXlOYW1lOiAnUm91dGVIYW5kbGVyJyxcblxuICBtaXhpbnM6IFsgUm91dGVIYW5kbGVyTWl4aW4gXSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDaGlsZFJvdXRlSGFuZGxlcigpO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlSGFuZGxlcjtcbiIsIi8qIGpzaGludCAtVzA1OCAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgncmVhY3QvbGliL3dhcm5pbmcnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50Jyk7XG52YXIgY2FuVXNlRE9NID0gcmVxdWlyZSgncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JykuY2FuVXNlRE9NO1xudmFyIExvY2F0aW9uQWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy9Mb2NhdGlvbkFjdGlvbnMnKTtcbnZhciBJbWl0YXRlQnJvd3NlckJlaGF2aW9yID0gcmVxdWlyZSgnLi9iZWhhdmlvcnMvSW1pdGF0ZUJyb3dzZXJCZWhhdmlvcicpO1xudmFyIEhhc2hMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL0hhc2hMb2NhdGlvbicpO1xudmFyIEhpc3RvcnlMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL0hpc3RvcnlMb2NhdGlvbicpO1xudmFyIFJlZnJlc2hMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL1JlZnJlc2hMb2NhdGlvbicpO1xudmFyIE5hdmlnYXRpb25Db250ZXh0ID0gcmVxdWlyZSgnLi9OYXZpZ2F0aW9uQ29udGV4dCcpO1xudmFyIFN0YXRlQ29udGV4dCA9IHJlcXVpcmUoJy4vU3RhdGVDb250ZXh0Jyk7XG52YXIgU2Nyb2xsaW5nID0gcmVxdWlyZSgnLi9TY3JvbGxpbmcnKTtcbnZhciBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUm91dGluZycpLmNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuO1xudmFyIGlzUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vaXNSZWFjdENoaWxkcmVuJyk7XG52YXIgVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vVHJhbnNpdGlvbicpO1xudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG52YXIgUmVkaXJlY3QgPSByZXF1aXJlKCcuL1JlZGlyZWN0Jyk7XG52YXIgSGlzdG9yeSA9IHJlcXVpcmUoJy4vSGlzdG9yeScpO1xudmFyIENhbmNlbGxhdGlvbiA9IHJlcXVpcmUoJy4vQ2FuY2VsbGF0aW9uJyk7XG52YXIgc3VwcG9ydHNIaXN0b3J5ID0gcmVxdWlyZSgnLi91dGlscy9zdXBwb3J0c0hpc3RvcnknKTtcbnZhciBQYXRoID0gcmVxdWlyZSgnLi91dGlscy9QYXRoJyk7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgbG9jYXRpb24gZm9yIG5ldyByb3V0ZXJzLlxuICovXG52YXIgREVGQVVMVF9MT0NBVElPTiA9IGNhblVzZURPTSA/IEhhc2hMb2NhdGlvbiA6ICcvJztcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBzY3JvbGwgYmVoYXZpb3IgZm9yIG5ldyByb3V0ZXJzLlxuICovXG52YXIgREVGQVVMVF9TQ1JPTExfQkVIQVZJT1IgPSBjYW5Vc2VET00gPyBJbWl0YXRlQnJvd3NlckJlaGF2aW9yIDogbnVsbDtcblxuZnVuY3Rpb24gY3JlYXRlTWF0Y2gocm91dGUsIHBhcmFtcywgcGF0aG5hbWUsIHF1ZXJ5KSB7XG4gIHJldHVybiB7XG4gICAgcm91dGVzOiBbIHJvdXRlIF0sXG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHF1ZXJ5OiBxdWVyeVxuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kTWF0Y2gocm91dGVzLCBkZWZhdWx0Um91dGUsIG5vdEZvdW5kUm91dGUsIHBhdGhuYW1lLCBxdWVyeSkge1xuICB2YXIgcm91dGUsIG1hdGNoLCBwYXJhbXM7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJvdXRlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHJvdXRlID0gcm91dGVzW2ldO1xuXG4gICAgLy8gQ2hlY2sgdGhlIHN1YnRyZWUgZmlyc3QgdG8gZmluZCB0aGUgbW9zdCBkZWVwbHktbmVzdGVkIG1hdGNoLlxuICAgIG1hdGNoID0gZmluZE1hdGNoKHJvdXRlLnJvdXRlcywgcm91dGUuZGVmYXVsdFJvdXRlLCByb3V0ZS5ub3RGb3VuZFJvdXRlLCBwYXRobmFtZSwgcXVlcnkpO1xuXG4gICAgaWYgKG1hdGNoICE9IG51bGwpIHtcbiAgICAgIG1hdGNoLnJvdXRlcy51bnNoaWZ0KHJvdXRlKTtcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG5cbiAgICAvLyBObyByb3V0ZXMgaW4gdGhlIHN1YnRyZWUgbWF0Y2hlZCwgc28gY2hlY2sgdGhpcyByb3V0ZS5cbiAgICBwYXJhbXMgPSBQYXRoLmV4dHJhY3RQYXJhbXMocm91dGUucGF0aCwgcGF0aG5hbWUpO1xuXG4gICAgaWYgKHBhcmFtcylcbiAgICAgIHJldHVybiBjcmVhdGVNYXRjaChyb3V0ZSwgcGFyYW1zLCBwYXRobmFtZSwgcXVlcnkpO1xuICB9XG5cbiAgLy8gTm8gcm91dGVzIG1hdGNoZWQsIHNvIHRyeSB0aGUgZGVmYXVsdCByb3V0ZSBpZiB0aGVyZSBpcyBvbmUuXG4gIGlmIChkZWZhdWx0Um91dGUgJiYgKHBhcmFtcyA9IFBhdGguZXh0cmFjdFBhcmFtcyhkZWZhdWx0Um91dGUucGF0aCwgcGF0aG5hbWUpKSlcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2goZGVmYXVsdFJvdXRlLCBwYXJhbXMsIHBhdGhuYW1lLCBxdWVyeSk7XG5cbiAgLy8gTGFzdCBhdHRlbXB0OiBkb2VzIHRoZSBcIm5vdCBmb3VuZFwiIHJvdXRlIG1hdGNoP1xuICBpZiAobm90Rm91bmRSb3V0ZSAmJiAocGFyYW1zID0gUGF0aC5leHRyYWN0UGFyYW1zKG5vdEZvdW5kUm91dGUucGF0aCwgcGF0aG5hbWUpKSlcbiAgICByZXR1cm4gY3JlYXRlTWF0Y2gobm90Rm91bmRSb3V0ZSwgcGFyYW1zLCBwYXRobmFtZSwgcXVlcnkpO1xuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBoYXNQcm9wZXJ0aWVzKG9iamVjdCwgcHJvcGVydGllcykge1xuICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcylcbiAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpICYmIG9iamVjdFtwcm9wZXJ0eU5hbWVdICE9PSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGhhc01hdGNoKHJvdXRlcywgcm91dGUsIHByZXZQYXJhbXMsIG5leHRQYXJhbXMsIHByZXZRdWVyeSwgbmV4dFF1ZXJ5KSB7XG4gIHJldHVybiByb3V0ZXMuc29tZShmdW5jdGlvbiAocikge1xuICAgIGlmIChyICE9PSByb3V0ZSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBwYXJhbU5hbWVzID0gcm91dGUucGFyYW1OYW1lcztcbiAgICB2YXIgcGFyYW1OYW1lO1xuXG4gICAgLy8gRW5zdXJlIHRoYXQgYWxsIHBhcmFtcyB0aGUgcm91dGUgY2FyZXMgYWJvdXQgZGlkIG5vdCBjaGFuZ2UuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhcmFtTmFtZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHBhcmFtTmFtZSA9IHBhcmFtTmFtZXNbaV07XG5cbiAgICAgIGlmIChuZXh0UGFyYW1zW3BhcmFtTmFtZV0gIT09IHByZXZQYXJhbXNbcGFyYW1OYW1lXSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGUgcXVlcnkgaGFzbid0IGNoYW5nZWQuXG4gICAgcmV0dXJuIGhhc1Byb3BlcnRpZXMocHJldlF1ZXJ5LCBuZXh0UXVlcnkpICYmIGhhc1Byb3BlcnRpZXMobmV4dFF1ZXJ5LCBwcmV2UXVlcnkpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IHJvdXRlciB1c2luZyB0aGUgZ2l2ZW4gb3B0aW9ucy4gQSByb3V0ZXJcbiAqIGlzIGEgUmVhY3RDb21wb25lbnQgY2xhc3MgdGhhdCBrbm93cyBob3cgdG8gcmVhY3QgdG8gY2hhbmdlcyBpbiB0aGVcbiAqIFVSTCBhbmQga2VlcCB0aGUgY29udGVudHMgb2YgdGhlIHBhZ2UgaW4gc3luYy5cbiAqXG4gKiBPcHRpb25zIG1heSBiZSBhbnkgb2YgdGhlIGZvbGxvd2luZzpcbiAqXG4gKiAtIHJvdXRlcyAgICAgICAgICAgKHJlcXVpcmVkKSBUaGUgcm91dGUgY29uZmlnXG4gKiAtIGxvY2F0aW9uICAgICAgICAgVGhlIGxvY2F0aW9uIHRvIHVzZS4gRGVmYXVsdHMgdG8gSGFzaExvY2F0aW9uIHdoZW5cbiAqICAgICAgICAgICAgICAgICAgICB0aGUgRE9NIGlzIGF2YWlsYWJsZSwgXCIvXCIgb3RoZXJ3aXNlXG4gKiAtIHNjcm9sbEJlaGF2aW9yICAgVGhlIHNjcm9sbCBiZWhhdmlvciB0byB1c2UuIERlZmF1bHRzIHRvIEltaXRhdGVCcm93c2VyQmVoYXZpb3JcbiAqICAgICAgICAgICAgICAgICAgICB3aGVuIHRoZSBET00gaXMgYXZhaWxhYmxlLCBudWxsIG90aGVyd2lzZVxuICogLSBvbkVycm9yICAgICAgICAgIEEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGhhbmRsZSBlcnJvcnNcbiAqIC0gb25BYm9ydCAgICAgICAgICBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBoYW5kbGUgYWJvcnRlZCB0cmFuc2l0aW9uc1xuICpcbiAqIFdoZW4gcmVuZGVyaW5nIGluIGEgc2VydmVyLXNpZGUgZW52aXJvbm1lbnQsIHRoZSBsb2NhdGlvbiBzaG91bGQgc2ltcGx5XG4gKiBiZSB0aGUgVVJMIHBhdGggdGhhdCB3YXMgdXNlZCBpbiB0aGUgcmVxdWVzdCwgaW5jbHVkaW5nIHRoZSBxdWVyeSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmIChpc1JlYWN0Q2hpbGRyZW4ob3B0aW9ucykpXG4gICAgb3B0aW9ucyA9IHsgcm91dGVzOiBvcHRpb25zIH07XG5cbiAgdmFyIG1vdW50ZWRDb21wb25lbnRzID0gW107XG4gIHZhciBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gfHwgREVGQVVMVF9MT0NBVElPTjtcbiAgdmFyIHNjcm9sbEJlaGF2aW9yID0gb3B0aW9ucy5zY3JvbGxCZWhhdmlvciB8fCBERUZBVUxUX1NDUk9MTF9CRUhBVklPUjtcbiAgdmFyIHN0YXRlID0ge307XG4gIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgdmFyIHBlbmRpbmdUcmFuc2l0aW9uID0gbnVsbDtcbiAgdmFyIGRpc3BhdGNoSGFuZGxlciA9IG51bGw7XG5cbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICB3YXJuaW5nKFxuICAgICAgIWNhblVzZURPTSB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnLFxuICAgICAgJ1lvdSBzaG91bGQgbm90IHVzZSBhIHN0YXRpYyBsb2NhdGlvbiBpbiBhIERPTSBlbnZpcm9ubWVudCBiZWNhdXNlICcgK1xuICAgICAgJ3RoZSByb3V0ZXIgd2lsbCBub3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIGN1cnJlbnQgVVJMJ1xuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgY2FuVXNlRE9NIHx8IGxvY2F0aW9uLm5lZWRzRE9NID09PSBmYWxzZSxcbiAgICAgICdZb3UgY2Fubm90IHVzZSAlcyB3aXRob3V0IGEgRE9NJyxcbiAgICAgIGxvY2F0aW9uXG4gICAgKTtcbiAgfVxuXG4gIC8vIEF1dG9tYXRpY2FsbHkgZmFsbCBiYWNrIHRvIGZ1bGwgcGFnZSByZWZyZXNoZXMgaW5cbiAgLy8gYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBIVE1MIGhpc3RvcnkgQVBJLlxuICBpZiAobG9jYXRpb24gPT09IEhpc3RvcnlMb2NhdGlvbiAmJiAhc3VwcG9ydHNIaXN0b3J5KCkpXG4gICAgbG9jYXRpb24gPSBSZWZyZXNoTG9jYXRpb247XG5cbiAgdmFyIFJvdXRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIGRpc3BsYXlOYW1lOiAnUm91dGVyJyxcblxuICAgIHN0YXRpY3M6IHtcblxuICAgICAgaXNSdW5uaW5nOiBmYWxzZSxcblxuICAgICAgY2FuY2VsUGVuZGluZ1RyYW5zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24uYWJvcnQobmV3IENhbmNlbGxhdGlvbik7XG4gICAgICAgICAgcGVuZGluZ1RyYW5zaXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBjbGVhckFsbFJvdXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFJvdXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub3RGb3VuZFJvdXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5uYW1lZFJvdXRlcyA9IHt9O1xuICAgICAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBBZGRzIHJvdXRlcyB0byB0aGlzIHJvdXRlciBmcm9tIHRoZSBnaXZlbiBjaGlsZHJlbiBvYmplY3QgKHNlZSBSZWFjdENoaWxkcmVuKS5cbiAgICAgICAqL1xuICAgICAgYWRkUm91dGVzOiBmdW5jdGlvbiAocm91dGVzKSB7XG4gICAgICAgIGlmIChpc1JlYWN0Q2hpbGRyZW4ocm91dGVzKSlcbiAgICAgICAgICByb3V0ZXMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihyb3V0ZXMsIHRoaXMsIHRoaXMubmFtZWRSb3V0ZXMpO1xuXG4gICAgICAgIHRoaXMucm91dGVzLnB1c2guYXBwbHkodGhpcy5yb3V0ZXMsIHJvdXRlcyk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJlcGxhY2VzIHJvdXRlcyBvZiB0aGlzIHJvdXRlciBmcm9tIHRoZSBnaXZlbiBjaGlsZHJlbiBvYmplY3QgKHNlZSBSZWFjdENoaWxkcmVuKS5cbiAgICAgICAqL1xuICAgICAgcmVwbGFjZVJvdXRlczogZnVuY3Rpb24gKHJvdXRlcykge1xuICAgICAgICB0aGlzLmNsZWFyQWxsUm91dGVzKCk7XG4gICAgICAgIHRoaXMuYWRkUm91dGVzKHJvdXRlcyk7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQZXJmb3JtcyBhIG1hdGNoIG9mIHRoZSBnaXZlbiBwYXRoIGFnYWluc3QgdGhpcyByb3V0ZXIgYW5kIHJldHVybnMgYW4gb2JqZWN0XG4gICAgICAgKiB3aXRoIHRoZSB7IHJvdXRlcywgcGFyYW1zLCBwYXRobmFtZSwgcXVlcnkgfSB0aGF0IG1hdGNoLiBSZXR1cm5zIG51bGwgaWYgbm9cbiAgICAgICAqIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgICAgICovXG4gICAgICBtYXRjaDogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRNYXRjaCh0aGlzLnJvdXRlcywgdGhpcy5kZWZhdWx0Um91dGUsIHRoaXMubm90Rm91bmRSb3V0ZSwgUGF0aC53aXRob3V0UXVlcnkocGF0aCksIFBhdGguZXh0cmFjdFF1ZXJ5KHBhdGgpKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyBhbiBhYnNvbHV0ZSBVUkwgcGF0aCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHJvdXRlXG4gICAgICAgKiBuYW1lLCBVUkwgcGFyYW1ldGVycywgYW5kIHF1ZXJ5LlxuICAgICAgICovXG4gICAgICBtYWtlUGF0aDogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBwYXRoO1xuICAgICAgICBpZiAoUGF0aC5pc0Fic29sdXRlKHRvKSkge1xuICAgICAgICAgIHBhdGggPSBQYXRoLm5vcm1hbGl6ZSh0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJvdXRlID0gdGhpcy5uYW1lZFJvdXRlc1t0b107XG5cbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICByb3V0ZSxcbiAgICAgICAgICAgICdVbmFibGUgdG8gZmluZCA8Um91dGUgbmFtZT1cIiVzXCI+JyxcbiAgICAgICAgICAgIHRvXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHBhdGggPSByb3V0ZS5wYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBhdGgud2l0aFF1ZXJ5KFBhdGguaW5qZWN0UGFyYW1zKHBhdGgsIHBhcmFtcyksIHF1ZXJ5KTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyBhIHN0cmluZyB0aGF0IG1heSBzYWZlbHkgYmUgdXNlZCBhcyB0aGUgaHJlZiBvZiBhIGxpbmtcbiAgICAgICAqIHRvIHRoZSByb3V0ZSB3aXRoIHRoZSBnaXZlbiBuYW1lLCBVUkwgcGFyYW1ldGVycywgYW5kIHF1ZXJ5LlxuICAgICAgICovXG4gICAgICBtYWtlSHJlZjogZnVuY3Rpb24gKHRvLCBwYXJhbXMsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiAobG9jYXRpb24gPT09IEhhc2hMb2NhdGlvbikgPyAnIycgKyBwYXRoIDogcGF0aDtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSBwdXNoaW5nXG4gICAgICAgKiBhIG5ldyBVUkwgb250byB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICAgICAqL1xuICAgICAgdHJhbnNpdGlvblRvOiBmdW5jdGlvbiAodG8sIHBhcmFtcywgcXVlcnkpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3N0cmluZycsXG4gICAgICAgICAgJ1lvdSBjYW5ub3QgdXNlIHRyYW5zaXRpb25UbyB3aXRoIGEgc3RhdGljIGxvY2F0aW9uJ1xuICAgICAgICApO1xuXG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5tYWtlUGF0aCh0bywgcGFyYW1zLCBxdWVyeSk7XG5cbiAgICAgICAgaWYgKHBlbmRpbmdUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgLy8gUmVwbGFjZSBzbyBwZW5kaW5nIGxvY2F0aW9uIGRvZXMgbm90IHN0YXkgaW4gaGlzdG9yeS5cbiAgICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKHBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLnB1c2gocGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIFVSTCBzcGVjaWZpZWQgaW4gdGhlIGFyZ3VtZW50cyBieSByZXBsYWNpbmdcbiAgICAgICAqIHRoZSBjdXJyZW50IFVSTCBpbiB0aGUgaGlzdG9yeSBzdGFjay5cbiAgICAgICAqL1xuICAgICAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uICh0bywgcGFyYW1zLCBxdWVyeSkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgdHlwZW9mIGxvY2F0aW9uICE9PSAnc3RyaW5nJyxcbiAgICAgICAgICAnWW91IGNhbm5vdCB1c2UgcmVwbGFjZVdpdGggd2l0aCBhIHN0YXRpYyBsb2NhdGlvbidcbiAgICAgICAgKTtcblxuICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKHRoaXMubWFrZVBhdGgodG8sIHBhcmFtcywgcXVlcnkpKTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIHByZXZpb3VzIFVSTCBpZiBvbmUgaXMgYXZhaWxhYmxlLiBSZXR1cm5zIHRydWUgaWYgdGhlXG4gICAgICAgKiByb3V0ZXIgd2FzIGFibGUgdG8gZ28gYmFjaywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICpcbiAgICAgICAqIE5vdGU6IFRoZSByb3V0ZXIgb25seSB0cmFja3MgaGlzdG9yeSBlbnRyaWVzIGluIHlvdXIgYXBwbGljYXRpb24sIG5vdCB0aGVcbiAgICAgICAqIGN1cnJlbnQgYnJvd3NlciBzZXNzaW9uLCBzbyB5b3UgY2FuIHNhZmVseSBjYWxsIHRoaXMgZnVuY3Rpb24gd2l0aG91dCBndWFyZGluZ1xuICAgICAgICogYWdhaW5zdCBzZW5kaW5nIHRoZSB1c2VyIGJhY2sgdG8gc29tZSBvdGhlciBzaXRlLiBIb3dldmVyLCB3aGVuIHVzaW5nXG4gICAgICAgKiBSZWZyZXNoTG9jYXRpb24gKHdoaWNoIGlzIHRoZSBmYWxsYmFjayBmb3IgSGlzdG9yeUxvY2F0aW9uIGluIGJyb3dzZXJzIHRoYXRcbiAgICAgICAqIGRvbid0IHN1cHBvcnQgSFRNTDUgaGlzdG9yeSkgdGhpcyBtZXRob2Qgd2lsbCAqYWx3YXlzKiBzZW5kIHRoZSBjbGllbnQgYmFja1xuICAgICAgICogYmVjYXVzZSB3ZSBjYW5ub3QgcmVsaWFibHkgdHJhY2sgaGlzdG9yeSBsZW5ndGguXG4gICAgICAgKi9cbiAgICAgIGdvQmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgdHlwZW9mIGxvY2F0aW9uICE9PSAnc3RyaW5nJyxcbiAgICAgICAgICAnWW91IGNhbm5vdCB1c2UgZ29CYWNrIHdpdGggYSBzdGF0aWMgbG9jYXRpb24nXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKEhpc3RvcnkubGVuZ3RoID4gMSB8fCBsb2NhdGlvbiA9PT0gUmVmcmVzaExvY2F0aW9uKSB7XG4gICAgICAgICAgbG9jYXRpb24ucG9wKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB3YXJuaW5nKGZhbHNlLCAnZ29CYWNrKCkgd2FzIGlnbm9yZWQgYmVjYXVzZSB0aGVyZSBpcyBubyByb3V0ZXIgaGlzdG9yeScpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG5cbiAgICAgIGhhbmRsZUFib3J0OiBvcHRpb25zLm9uQWJvcnQgfHwgZnVuY3Rpb24gKGFib3J0UmVhc29uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5oYW5kbGVkIGFib3J0ZWQgdHJhbnNpdGlvbiEgUmVhc29uOiAnICsgYWJvcnRSZWFzb24pO1xuXG4gICAgICAgIGlmIChhYm9ydFJlYXNvbiBpbnN0YW5jZW9mIENhbmNlbGxhdGlvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChhYm9ydFJlYXNvbiBpbnN0YW5jZW9mIFJlZGlyZWN0KSB7XG4gICAgICAgICAgbG9jYXRpb24ucmVwbGFjZSh0aGlzLm1ha2VQYXRoKGFib3J0UmVhc29uLnRvLCBhYm9ydFJlYXNvbi5wYXJhbXMsIGFib3J0UmVhc29uLnF1ZXJ5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYXRpb24ucG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGhhbmRsZUVycm9yOiBvcHRpb25zLm9uRXJyb3IgfHwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIC8vIFRocm93IHNvIHdlIGRvbid0IHNpbGVudGx5IHN3YWxsb3cgYXN5bmMgZXJyb3JzLlxuICAgICAgICB0aHJvdyBlcnJvcjsgLy8gVGhpcyBlcnJvciBwcm9iYWJseSBvcmlnaW5hdGVkIGluIGEgdHJhbnNpdGlvbiBob29rLlxuICAgICAgfSxcblxuICAgICAgaGFuZGxlTG9jYXRpb25DaGFuZ2U6IGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChjaGFuZ2UucGF0aCwgY2hhbmdlLnR5cGUpO1xuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQZXJmb3JtcyBhIHRyYW5zaXRpb24gdG8gdGhlIGdpdmVuIHBhdGggYW5kIGNhbGxzIGNhbGxiYWNrKGVycm9yLCBhYm9ydFJlYXNvbilcbiAgICAgICAqIHdoZW4gdGhlIHRyYW5zaXRpb24gaXMgZmluaXNoZWQuIElmIGJvdGggYXJndW1lbnRzIGFyZSBudWxsIHRoZSByb3V0ZXIncyBzdGF0ZVxuICAgICAgICogd2FzIHVwZGF0ZWQuIE90aGVyd2lzZSB0aGUgdHJhbnNpdGlvbiBkaWQgbm90IGNvbXBsZXRlLlxuICAgICAgICpcbiAgICAgICAqIEluIGEgdHJhbnNpdGlvbiwgYSByb3V0ZXIgZmlyc3QgZGV0ZXJtaW5lcyB3aGljaCByb3V0ZXMgYXJlIGludm9sdmVkIGJ5IGJlZ2lubmluZ1xuICAgICAgICogd2l0aCB0aGUgY3VycmVudCByb3V0ZSwgdXAgdGhlIHJvdXRlIHRyZWUgdG8gdGhlIGZpcnN0IHBhcmVudCByb3V0ZSB0aGF0IGlzIHNoYXJlZFxuICAgICAgICogd2l0aCB0aGUgZGVzdGluYXRpb24gcm91dGUsIGFuZCBiYWNrIGRvd24gdGhlIHRyZWUgdG8gdGhlIGRlc3RpbmF0aW9uIHJvdXRlLiBUaGVcbiAgICAgICAqIHdpbGxUcmFuc2l0aW9uRnJvbSBob29rIGlzIGludm9rZWQgb24gYWxsIHJvdXRlIGhhbmRsZXJzIHdlJ3JlIHRyYW5zaXRpb25pbmcgYXdheVxuICAgICAgICogZnJvbSwgaW4gcmV2ZXJzZSBuZXN0aW5nIG9yZGVyLiBMaWtld2lzZSwgdGhlIHdpbGxUcmFuc2l0aW9uVG8gaG9vayBpcyBpbnZva2VkIG9uXG4gICAgICAgKiBhbGwgcm91dGUgaGFuZGxlcnMgd2UncmUgdHJhbnNpdGlvbmluZyB0by5cbiAgICAgICAqXG4gICAgICAgKiBCb3RoIHdpbGxUcmFuc2l0aW9uRnJvbSBhbmQgd2lsbFRyYW5zaXRpb25UbyBob29rcyBtYXkgZWl0aGVyIGFib3J0IG9yIHJlZGlyZWN0IHRoZVxuICAgICAgICogdHJhbnNpdGlvbi4gVG8gcmVzb2x2ZSBhc3luY2hyb25vdXNseSwgdGhleSBtYXkgdXNlIHRoZSBjYWxsYmFjayBhcmd1bWVudC4gSWYgbm9cbiAgICAgICAqIGhvb2tzIHdhaXQsIHRoZSB0cmFuc2l0aW9uIGlzIGZ1bGx5IHN5bmNocm9ub3VzLlxuICAgICAgICovXG4gICAgICBkaXNwYXRjaDogZnVuY3Rpb24gKHBhdGgsIGFjdGlvbikge1xuICAgICAgICB0aGlzLmNhbmNlbFBlbmRpbmdUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgdmFyIHByZXZQYXRoID0gc3RhdGUucGF0aDtcbiAgICAgICAgdmFyIGlzUmVmcmVzaGluZyA9IGFjdGlvbiA9PSBudWxsO1xuXG4gICAgICAgIGlmIChwcmV2UGF0aCA9PT0gcGF0aCAmJiAhaXNSZWZyZXNoaW5nKVxuICAgICAgICAgIHJldHVybjsgLy8gTm90aGluZyB0byBkbyFcblxuICAgICAgICAvLyBSZWNvcmQgdGhlIHNjcm9sbCBwb3NpdGlvbiBhcyBlYXJseSBhcyBwb3NzaWJsZSB0b1xuICAgICAgICAvLyBnZXQgaXQgYmVmb3JlIGJyb3dzZXJzIHRyeSB1cGRhdGUgaXQgYXV0b21hdGljYWxseS5cbiAgICAgICAgaWYgKHByZXZQYXRoICYmIGFjdGlvbiA9PT0gTG9jYXRpb25BY3Rpb25zLlBVU0gpXG4gICAgICAgICAgdGhpcy5yZWNvcmRTY3JvbGxQb3NpdGlvbihwcmV2UGF0aCk7XG5cbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5tYXRjaChwYXRoKTtcblxuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgIG1hdGNoICE9IG51bGwsXG4gICAgICAgICAgJ05vIHJvdXRlIG1hdGNoZXMgcGF0aCBcIiVzXCIuIE1ha2Ugc3VyZSB5b3UgaGF2ZSA8Um91dGUgcGF0aD1cIiVzXCI+IHNvbWV3aGVyZSBpbiB5b3VyIHJvdXRlcycsXG4gICAgICAgICAgcGF0aCwgcGF0aFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChtYXRjaCA9PSBudWxsKVxuICAgICAgICAgIG1hdGNoID0ge307XG5cbiAgICAgICAgdmFyIHByZXZSb3V0ZXMgPSBzdGF0ZS5yb3V0ZXMgfHwgW107XG4gICAgICAgIHZhciBwcmV2UGFyYW1zID0gc3RhdGUucGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgcHJldlF1ZXJ5ID0gc3RhdGUucXVlcnkgfHwge307XG5cbiAgICAgICAgdmFyIG5leHRSb3V0ZXMgPSBtYXRjaC5yb3V0ZXMgfHwgW107XG4gICAgICAgIHZhciBuZXh0UGFyYW1zID0gbWF0Y2gucGFyYW1zIHx8IHt9O1xuICAgICAgICB2YXIgbmV4dFF1ZXJ5ID0gbWF0Y2gucXVlcnkgfHwge307XG5cbiAgICAgICAgdmFyIGZyb21Sb3V0ZXMsIHRvUm91dGVzO1xuICAgICAgICBpZiAocHJldlJvdXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICBmcm9tUm91dGVzID0gcHJldlJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gIWhhc01hdGNoKG5leHRSb3V0ZXMsIHJvdXRlLCBwcmV2UGFyYW1zLCBuZXh0UGFyYW1zLCBwcmV2UXVlcnksIG5leHRRdWVyeSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0b1JvdXRlcyA9IG5leHRSb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICFoYXNNYXRjaChwcmV2Um91dGVzLCByb3V0ZSwgcHJldlBhcmFtcywgbmV4dFBhcmFtcywgcHJldlF1ZXJ5LCBuZXh0UXVlcnkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZyb21Sb3V0ZXMgPSBbXTtcbiAgICAgICAgICB0b1JvdXRlcyA9IG5leHRSb3V0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IG5ldyBUcmFuc2l0aW9uKHBhdGgsIHRoaXMucmVwbGFjZVdpdGguYmluZCh0aGlzLCBwYXRoKSk7XG4gICAgICAgIHBlbmRpbmdUcmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcblxuICAgICAgICB2YXIgZnJvbUNvbXBvbmVudHMgPSBtb3VudGVkQ29tcG9uZW50cy5zbGljZShwcmV2Um91dGVzLmxlbmd0aCAtIGZyb21Sb3V0ZXMubGVuZ3RoKTtcblxuICAgICAgICB0cmFuc2l0aW9uLmZyb20oZnJvbVJvdXRlcywgZnJvbUNvbXBvbmVudHMsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvciB8fCB0cmFuc2l0aW9uLmFib3J0UmVhc29uKVxuICAgICAgICAgICAgcmV0dXJuIGRpc3BhdGNoSGFuZGxlci5jYWxsKFJvdXRlciwgZXJyb3IsIHRyYW5zaXRpb24pOyAvLyBObyBuZWVkIHRvIGNvbnRpbnVlLlxuXG4gICAgICAgICAgdHJhbnNpdGlvbi50byh0b1JvdXRlcywgbmV4dFBhcmFtcywgbmV4dFF1ZXJ5LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoSGFuZGxlci5jYWxsKFJvdXRlciwgZXJyb3IsIHRyYW5zaXRpb24sIHtcbiAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICAgIHBhdGhuYW1lOiBtYXRjaC5wYXRobmFtZSxcbiAgICAgICAgICAgICAgcm91dGVzOiBuZXh0Um91dGVzLFxuICAgICAgICAgICAgICBwYXJhbXM6IG5leHRQYXJhbXMsXG4gICAgICAgICAgICAgIHF1ZXJ5OiBuZXh0UXVlcnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogU3RhcnRzIHRoaXMgcm91dGVyIGFuZCBjYWxscyBjYWxsYmFjayhyb3V0ZXIsIHN0YXRlKSB3aGVuIHRoZSByb3V0ZSBjaGFuZ2VzLlxuICAgICAgICpcbiAgICAgICAqIElmIHRoZSByb3V0ZXIncyBsb2NhdGlvbiBpcyBzdGF0aWMgKGkuZS4gYSBVUkwgcGF0aCBpbiBhIHNlcnZlciBlbnZpcm9ubWVudClcbiAgICAgICAqIHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgb25seSBvbmNlLiBPdGhlcndpc2UsIHRoZSBsb2NhdGlvbiBzaG91bGQgYmUgb25lIG9mIHRoZVxuICAgICAgICogUm91dGVyLipMb2NhdGlvbiBvYmplY3RzIChlLmcuIFJvdXRlci5IYXNoTG9jYXRpb24gb3IgUm91dGVyLkhpc3RvcnlMb2NhdGlvbikuXG4gICAgICAgKi9cbiAgICAgIHJ1bjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAhdGhpcy5pc1J1bm5pbmcsXG4gICAgICAgICAgJ1JvdXRlciBpcyBhbHJlYWR5IHJ1bm5pbmcnXG4gICAgICAgICk7XG5cbiAgICAgICAgZGlzcGF0Y2hIYW5kbGVyID0gZnVuY3Rpb24gKGVycm9yLCB0cmFuc2l0aW9uLCBuZXdTdGF0ZSkge1xuICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgIFJvdXRlci5oYW5kbGVFcnJvcihlcnJvcik7XG5cbiAgICAgICAgICBpZiAocGVuZGluZ1RyYW5zaXRpb24gIT09IHRyYW5zaXRpb24pXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICBwZW5kaW5nVHJhbnNpdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbi5hYm9ydFJlYXNvbikge1xuICAgICAgICAgICAgUm91dGVyLmhhbmRsZUFib3J0KHRyYW5zaXRpb24uYWJvcnRSZWFzb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMsIG5leHRTdGF0ZSA9IG5ld1N0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBSb3V0ZXIuZGlzcGF0Y2gobG9jYXRpb24sIG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChsb2NhdGlvbi5hZGRDaGFuZ2VMaXN0ZW5lcilcbiAgICAgICAgICAgIGxvY2F0aW9uLmFkZENoYW5nZUxpc3RlbmVyKFJvdXRlci5oYW5kbGVMb2NhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG5cbiAgICAgICAgICAvLyBCb290c3RyYXAgdXNpbmcgdGhlIGN1cnJlbnQgcGF0aC5cbiAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBSb3V0ZXIuZGlzcGF0Y2gobG9jYXRpb24uZ2V0Q3VycmVudFBhdGgoKSwgbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsUGVuZGluZ1RyYW5zaXRpb24oKTtcblxuICAgICAgICBpZiAobG9jYXRpb24ucmVtb3ZlQ2hhbmdlTGlzdGVuZXIpXG4gICAgICAgICAgbG9jYXRpb24ucmVtb3ZlQ2hhbmdlTGlzdGVuZXIoUm91dGVyLmhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcblxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1peGluczogWyBOYXZpZ2F0aW9uQ29udGV4dCwgU3RhdGVDb250ZXh0LCBTY3JvbGxpbmcgXSxcblxuICAgIHByb3BUeXBlczoge1xuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5mYWxzeVxuICAgIH0sXG5cbiAgICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgICAgZ2V0Um91dGVBdERlcHRoOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc2V0Um91dGVDb21wb25lbnRBdERlcHRoOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcm91dGVIYW5kbGVyczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRSb3V0ZUF0RGVwdGg6IHRoaXMuZ2V0Um91dGVBdERlcHRoLFxuICAgICAgICBzZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGg6IHRoaXMuc2V0Um91dGVDb21wb25lbnRBdERlcHRoLFxuICAgICAgICByb3V0ZUhhbmRsZXJzOiBbIHRoaXMgXVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKHN0YXRlID0gbmV4dFN0YXRlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9IG5leHRTdGF0ZSk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICBSb3V0ZXIuc3RvcCgpO1xuICAgIH0sXG5cbiAgICBnZXRMb2NhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH0sXG5cbiAgICBnZXRTY3JvbGxCZWhhdmlvcjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNjcm9sbEJlaGF2aW9yO1xuICAgIH0sXG5cbiAgICBnZXRSb3V0ZUF0RGVwdGg6IGZ1bmN0aW9uIChkZXB0aCkge1xuICAgICAgdmFyIHJvdXRlcyA9IHRoaXMuc3RhdGUucm91dGVzO1xuICAgICAgcmV0dXJuIHJvdXRlcyAmJiByb3V0ZXNbZGVwdGhdO1xuICAgIH0sXG5cbiAgICBzZXRSb3V0ZUNvbXBvbmVudEF0RGVwdGg6IGZ1bmN0aW9uIChkZXB0aCwgY29tcG9uZW50KSB7XG4gICAgICBtb3VudGVkQ29tcG9uZW50c1tkZXB0aF0gPSBjb21wb25lbnQ7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJvdXRlID0gdGhpcy5nZXRSb3V0ZUF0RGVwdGgoMCk7XG4gICAgICByZXR1cm4gcm91dGUgPyBSZWFjdC5jcmVhdGVFbGVtZW50KHJvdXRlLmhhbmRsZXIsIHRoaXMucHJvcHMpIDogbnVsbDtcbiAgICB9XG5cbiAgfSk7XG5cbiAgUm91dGVyLmNsZWFyQWxsUm91dGVzKCk7XG5cbiAgaWYgKG9wdGlvbnMucm91dGVzKVxuICAgIFJvdXRlci5hZGRSb3V0ZXMob3B0aW9ucy5yb3V0ZXMpO1xuXG4gIHJldHVybiBSb3V0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUm91dGVyO1xuIiwiZXhwb3J0cy5EZWZhdWx0Um91dGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvRGVmYXVsdFJvdXRlJyk7XG5leHBvcnRzLkxpbmsgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTGluaycpO1xuZXhwb3J0cy5Ob3RGb3VuZFJvdXRlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL05vdEZvdW5kUm91dGUnKTtcbmV4cG9ydHMuUmVkaXJlY3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUmVkaXJlY3QnKTtcbmV4cG9ydHMuUm91dGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUm91dGUnKTtcbmV4cG9ydHMuUm91dGVIYW5kbGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1JvdXRlSGFuZGxlcicpO1xuXG5leHBvcnRzLkhhc2hMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbG9jYXRpb25zL0hhc2hMb2NhdGlvbicpO1xuZXhwb3J0cy5IaXN0b3J5TG9jYXRpb24gPSByZXF1aXJlKCcuL2xvY2F0aW9ucy9IaXN0b3J5TG9jYXRpb24nKTtcbmV4cG9ydHMuUmVmcmVzaExvY2F0aW9uID0gcmVxdWlyZSgnLi9sb2NhdGlvbnMvUmVmcmVzaExvY2F0aW9uJyk7XG5cbmV4cG9ydHMuSW1pdGF0ZUJyb3dzZXJCZWhhdmlvciA9IHJlcXVpcmUoJy4vYmVoYXZpb3JzL0ltaXRhdGVCcm93c2VyQmVoYXZpb3InKTtcbmV4cG9ydHMuU2Nyb2xsVG9Ub3BCZWhhdmlvciA9IHJlcXVpcmUoJy4vYmVoYXZpb3JzL1Njcm9sbFRvVG9wQmVoYXZpb3InKTtcblxuZXhwb3J0cy5IaXN0b3J5ID0gcmVxdWlyZSgnLi9IaXN0b3J5Jyk7XG5leHBvcnRzLk5hdmlnYXRpb24gPSByZXF1aXJlKCcuL05hdmlnYXRpb24nKTtcbmV4cG9ydHMuUm91dGVIYW5kbGVyTWl4aW4gPSByZXF1aXJlKCcuL1JvdXRlSGFuZGxlck1peGluJyk7XG5leHBvcnRzLlN0YXRlID0gcmVxdWlyZSgnLi9TdGF0ZScpO1xuXG5leHBvcnRzLmNyZWF0ZSA9IHJlcXVpcmUoJy4vY3JlYXRlUm91dGVyJyk7XG5leHBvcnRzLnJ1biA9IHJlcXVpcmUoJy4vcnVuUm91dGVyJyk7XG5cbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmZ1bmN0aW9uIGlzVmFsaWRDaGlsZChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsIHx8IFJlYWN0LmlzVmFsaWRFbGVtZW50KG9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGlzUmVhY3RDaGlsZHJlbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzVmFsaWRDaGlsZChvYmplY3QpIHx8IChBcnJheS5pc0FycmF5KG9iamVjdCkgJiYgb2JqZWN0LmV2ZXJ5KGlzVmFsaWRDaGlsZCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUmVhY3RDaGlsZHJlbjtcbiIsInZhciBMb2NhdGlvbkFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0xvY2F0aW9uQWN0aW9ucycpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKCcuLi9IaXN0b3J5Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBVUkwgcGF0aCBmcm9tIHRoZSBgaGFzaGAgcG9ydGlvbiBvZiB0aGUgVVJMLCBpbmNsdWRpbmdcbiAqIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIHJldHVybiBkZWNvZGVVUkkoXG4gICAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAgIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVsxXSB8fCAnJ1xuICApO1xufVxuXG52YXIgX2FjdGlvblR5cGU7XG5cbmZ1bmN0aW9uIGVuc3VyZVNsYXNoKCkge1xuICB2YXIgcGF0aCA9IGdldEhhc2hQYXRoKCk7XG5cbiAgaWYgKHBhdGguY2hhckF0KDApID09PSAnLycpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgSGFzaExvY2F0aW9uLnJlcGxhY2UoJy8nICsgcGF0aCk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgX2NoYW5nZUxpc3RlbmVycyA9IFtdO1xuXG5mdW5jdGlvbiBub3RpZnlDaGFuZ2UodHlwZSkge1xuICBpZiAodHlwZSA9PT0gTG9jYXRpb25BY3Rpb25zLlBVU0gpXG4gICAgSGlzdG9yeS5sZW5ndGggKz0gMTtcblxuICB2YXIgY2hhbmdlID0ge1xuICAgIHBhdGg6IGdldEhhc2hQYXRoKCksXG4gICAgdHlwZTogdHlwZVxuICB9O1xuXG4gIF9jaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICBsaXN0ZW5lcihjaGFuZ2UpO1xuICB9KTtcbn1cblxudmFyIF9pc0xpc3RlbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBvbkhhc2hDaGFuZ2UoKSB7XG4gIGlmIChlbnN1cmVTbGFzaCgpKSB7XG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhbiBfYWN0aW9uVHlwZSB0aGVuIGFsbCB3ZSBrbm93IGlzIHRoZSBoYXNoXG4gICAgLy8gY2hhbmdlZC4gSXQgd2FzIHByb2JhYmx5IGNhdXNlZCBieSB0aGUgdXNlciBjbGlja2luZyB0aGUgQmFja1xuICAgIC8vIGJ1dHRvbiwgYnV0IG1heSBoYXZlIGFsc28gYmVlbiB0aGUgRm9yd2FyZCBidXR0b24gb3IgbWFudWFsXG4gICAgLy8gbWFuaXB1bGF0aW9uLiBTbyBqdXN0IGd1ZXNzICdwb3AnLlxuICAgIG5vdGlmeUNoYW5nZShfYWN0aW9uVHlwZSB8fCBMb2NhdGlvbkFjdGlvbnMuUE9QKTtcbiAgICBfYWN0aW9uVHlwZSA9IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBBIExvY2F0aW9uIHRoYXQgdXNlcyBgd2luZG93LmxvY2F0aW9uLmhhc2hgLlxuICovXG52YXIgSGFzaExvY2F0aW9uID0ge1xuXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICBfY2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgLy8gRG8gdGhpcyBCRUZPUkUgbGlzdGVuaW5nIGZvciBoYXNoY2hhbmdlLlxuICAgIGVuc3VyZVNsYXNoKCk7XG5cbiAgICBpZiAoIV9pc0xpc3RlbmluZykge1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29uaGFzaGNoYW5nZScsIG9uSGFzaENoYW5nZSk7XG4gICAgICB9XG5cbiAgICAgIF9pc0xpc3RlbmluZyA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgIF9jaGFuZ2VMaXN0ZW5lcnMgPSBfY2hhbmdlTGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGwgIT09IGxpc3RlbmVyO1xuICAgIH0pO1xuXG4gICAgaWYgKF9jaGFuZ2VMaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBvbkhhc2hDaGFuZ2UsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudCgnb25oYXNoY2hhbmdlJywgb25IYXNoQ2hhbmdlKTtcbiAgICAgIH1cblxuICAgICAgX2lzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHB1c2g6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgX2FjdGlvblR5cGUgPSBMb2NhdGlvbkFjdGlvbnMuUFVTSDtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGVuY29kZVVSSShwYXRoKTtcbiAgfSxcblxuICByZXBsYWNlOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIF9hY3Rpb25UeXBlID0gTG9jYXRpb25BY3Rpb25zLlJFUExBQ0U7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXG4gICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgJyMnICsgZW5jb2RlVVJJKHBhdGgpXG4gICAgKTtcbiAgfSxcblxuICBwb3A6IGZ1bmN0aW9uICgpIHtcbiAgICBfYWN0aW9uVHlwZSA9IExvY2F0aW9uQWN0aW9ucy5QT1A7XG4gICAgSGlzdG9yeS5iYWNrKCk7XG4gIH0sXG5cbiAgZ2V0Q3VycmVudFBhdGg6IGdldEhhc2hQYXRoLFxuXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICc8SGFzaExvY2F0aW9uPic7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoTG9jYXRpb247XG4iLCJ2YXIgTG9jYXRpb25BY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9Mb2NhdGlvbkFjdGlvbnMnKTtcbnZhciBIaXN0b3J5ID0gcmVxdWlyZSgnLi4vSGlzdG9yeScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgVVJMIHBhdGggZnJvbSBgd2luZG93LmxvY2F0aW9uYCwgaW5jbHVkaW5nIHF1ZXJ5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93UGF0aCgpIHtcbiAgcmV0dXJuIGRlY29kZVVSSShcbiAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoXG4gICk7XG59XG5cbnZhciBfY2hhbmdlTGlzdGVuZXJzID0gW107XG5cbmZ1bmN0aW9uIG5vdGlmeUNoYW5nZSh0eXBlKSB7XG4gIHZhciBjaGFuZ2UgPSB7XG4gICAgcGF0aDogZ2V0V2luZG93UGF0aCgpLFxuICAgIHR5cGU6IHR5cGVcbiAgfTtcblxuICBfY2hhbmdlTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgbGlzdGVuZXIoY2hhbmdlKTtcbiAgfSk7XG59XG5cbnZhciBfaXNMaXN0ZW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gb25Qb3BTdGF0ZSgpIHtcbiAgbm90aWZ5Q2hhbmdlKExvY2F0aW9uQWN0aW9ucy5QT1ApO1xufVxuXG4vKipcbiAqIEEgTG9jYXRpb24gdGhhdCB1c2VzIEhUTUw1IGhpc3RvcnkuXG4gKi9cbnZhciBIaXN0b3J5TG9jYXRpb24gPSB7XG5cbiAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgIF9jaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICBpZiAoIV9pc0xpc3RlbmluZykge1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIG9uUG9wU3RhdGUsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCgncG9wc3RhdGUnLCBvblBvcFN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgX2lzTGlzdGVuaW5nID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgX2NoYW5nZUxpc3RlbmVycyA9IF9jaGFuZ2VMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gbCAhPT0gbGlzdGVuZXI7XG4gICAgfSk7XG5cbiAgICBpZiAoX2NoYW5nZUxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBvblBvcFN0YXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudCgncG9wc3RhdGUnLCBvblBvcFN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgX2lzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIHB1c2g6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgcGF0aDogcGF0aCB9LCAnJywgZW5jb2RlVVJJKHBhdGgpKTtcbiAgICBIaXN0b3J5Lmxlbmd0aCArPSAxO1xuICAgIG5vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUFVTSCk7XG4gIH0sXG5cbiAgcmVwbGFjZTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBwYXRoOiBwYXRoIH0sICcnLCBlbmNvZGVVUkkocGF0aCkpO1xuICAgIG5vdGlmeUNoYW5nZShMb2NhdGlvbkFjdGlvbnMuUkVQTEFDRSk7XG4gIH0sXG5cbiAgcG9wOiBIaXN0b3J5LmJhY2ssXG5cbiAgZ2V0Q3VycmVudFBhdGg6IGdldFdpbmRvd1BhdGgsXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJzxIaXN0b3J5TG9jYXRpb24+JztcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpc3RvcnlMb2NhdGlvbjtcbiIsInZhciBIaXN0b3J5TG9jYXRpb24gPSByZXF1aXJlKCcuL0hpc3RvcnlMb2NhdGlvbicpO1xudmFyIEhpc3RvcnkgPSByZXF1aXJlKCcuLi9IaXN0b3J5Jyk7XG5cbi8qKlxuICogQSBMb2NhdGlvbiB0aGF0IHVzZXMgZnVsbCBwYWdlIHJlZnJlc2hlcy4gVGhpcyBpcyB1c2VkIGFzXG4gKiB0aGUgZmFsbGJhY2sgZm9yIEhpc3RvcnlMb2NhdGlvbiBpbiBicm93c2VycyB0aGF0IGRvIG5vdFxuICogc3VwcG9ydCB0aGUgSFRNTDUgaGlzdG9yeSBBUEkuXG4gKi9cbnZhciBSZWZyZXNoTG9jYXRpb24gPSB7XG5cbiAgcHVzaDogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24gPSBlbmNvZGVVUkkocGF0aCk7XG4gIH0sXG5cbiAgcmVwbGFjZTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShlbmNvZGVVUkkocGF0aCkpO1xuICB9LFxuXG4gIHBvcDogSGlzdG9yeS5iYWNrLFxuXG4gIGdldEN1cnJlbnRQYXRoOiBIaXN0b3J5TG9jYXRpb24uZ2V0Q3VycmVudFBhdGgsXG5cbiAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJzxSZWZyZXNoTG9jYXRpb24+JztcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZnJlc2hMb2NhdGlvbjtcbiIsInZhciBjcmVhdGVSb3V0ZXIgPSByZXF1aXJlKCcuL2NyZWF0ZVJvdXRlcicpO1xuXG4vKipcbiAqIEEgaGlnaC1sZXZlbCBjb252ZW5pZW5jZSBtZXRob2QgdGhhdCBjcmVhdGVzLCBjb25maWd1cmVzLCBhbmRcbiAqIHJ1bnMgYSByb3V0ZXIgaW4gb25lIHNob3QuIFRoZSBtZXRob2Qgc2lnbmF0dXJlIGlzOlxuICpcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXNbLCBsb2NhdGlvbiBdLCBjYWxsYmFjayk7XG4gKlxuICogVXNpbmcgYHdpbmRvdy5sb2NhdGlvbi5oYXNoYCB0byBtYW5hZ2UgdGhlIFVSTCwgeW91IGNvdWxkIGRvOlxuICpcbiAqICAgUm91dGVyLnJ1bihyb3V0ZXMsIGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgUmVhY3QucmVuZGVyKDxIYW5kbGVyLz4sIGRvY3VtZW50LmJvZHkpO1xuICogICB9KTtcbiAqIFxuICogVXNpbmcgSFRNTDUgaGlzdG9yeSBhbmQgYSBjdXN0b20gXCJjdXJzb3JcIiBwcm9wOlxuICogXG4gKiAgIFJvdXRlci5ydW4ocm91dGVzLCBSb3V0ZXIuSGlzdG9yeUxvY2F0aW9uLCBmdW5jdGlvbiAoSGFuZGxlcikge1xuICogICAgIFJlYWN0LnJlbmRlcig8SGFuZGxlciBjdXJzb3I9e2N1cnNvcn0vPiwgZG9jdW1lbnQuYm9keSk7XG4gKiAgIH0pO1xuICpcbiAqIFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgcm91dGVyLlxuICpcbiAqIE5vdGU6IElmIHlvdSBuZWVkIHRvIHNwZWNpZnkgZnVydGhlciBvcHRpb25zIGZvciB5b3VyIHJvdXRlciBzdWNoXG4gKiBhcyBlcnJvci9hYm9ydCBoYW5kbGluZyBvciBjdXN0b20gc2Nyb2xsIGJlaGF2aW9yLCB1c2UgUm91dGVyLmNyZWF0ZVxuICogaW5zdGVhZC5cbiAqXG4gKiAgIHZhciByb3V0ZXIgPSBSb3V0ZXIuY3JlYXRlKG9wdGlvbnMpO1xuICogICByb3V0ZXIucnVuKGZ1bmN0aW9uIChIYW5kbGVyKSB7XG4gKiAgICAgLy8gLi4uXG4gKiAgIH0pO1xuICovXG5mdW5jdGlvbiBydW5Sb3V0ZXIocm91dGVzLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gbG9jYXRpb247XG4gICAgbG9jYXRpb24gPSBudWxsO1xuICB9XG5cbiAgdmFyIHJvdXRlciA9IGNyZWF0ZVJvdXRlcih7XG4gICAgcm91dGVzOiByb3V0ZXMsXG4gICAgbG9jYXRpb246IGxvY2F0aW9uXG4gIH0pO1xuXG4gIHJvdXRlci5ydW4oY2FsbGJhY2spO1xuXG4gIHJldHVybiByb3V0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcnVuUm91dGVyO1xuIiwidmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnZhcmlhbnQnKTtcbnZhciBtZXJnZSA9IHJlcXVpcmUoJ3FzL2xpYi91dGlscycpLm1lcmdlO1xudmFyIHFzID0gcmVxdWlyZSgncXMnKTtcblxudmFyIHBhcmFtQ29tcGlsZU1hdGNoZXIgPSAvOihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopfFsqLigpXFxbXFxdXFxcXCt8e31eJF0vZztcbnZhciBwYXJhbUluamVjdE1hdGNoZXIgPSAvOihbYS16QS1aXyRdW2EtekEtWjAtOV8kP10qWz9dPyl8WypdL2c7XG52YXIgcGFyYW1JbmplY3RUcmFpbGluZ1NsYXNoTWF0Y2hlciA9IC9cXC9cXC9cXD98XFwvXFw/XFwvfFxcL1xcPy9nO1xudmFyIHF1ZXJ5TWF0Y2hlciA9IC9cXD8oLispLztcblxudmFyIF9jb21waWxlZFBhdHRlcm5zID0ge307XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgaWYgKCEocGF0dGVybiBpbiBfY29tcGlsZWRQYXR0ZXJucykpIHtcbiAgICB2YXIgcGFyYW1OYW1lcyA9IFtdO1xuICAgIHZhciBzb3VyY2UgPSBwYXR0ZXJuLnJlcGxhY2UocGFyYW1Db21waWxlTWF0Y2hlciwgZnVuY3Rpb24gKG1hdGNoLCBwYXJhbU5hbWUpIHtcbiAgICAgIGlmIChwYXJhbU5hbWUpIHtcbiAgICAgICAgcGFyYW1OYW1lcy5wdXNoKHBhcmFtTmFtZSk7XG4gICAgICAgIHJldHVybiAnKFteLz8jXSspJztcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2ggPT09ICcqJykge1xuICAgICAgICBwYXJhbU5hbWVzLnB1c2goJ3NwbGF0Jyk7XG4gICAgICAgIHJldHVybiAnKC4qPyknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdcXFxcJyArIG1hdGNoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgX2NvbXBpbGVkUGF0dGVybnNbcGF0dGVybl0gPSB7XG4gICAgICBtYXRjaGVyOiBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckJywgJ2knKSxcbiAgICAgIHBhcmFtTmFtZXM6IHBhcmFtTmFtZXNcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9jb21waWxlZFBhdHRlcm5zW3BhdHRlcm5dO1xufVxuXG52YXIgUGF0aCA9IHtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgbmFtZXMgb2YgYWxsIHBhcmFtZXRlcnMgaW4gdGhlIGdpdmVuIHBhdHRlcm4uXG4gICAqL1xuICBleHRyYWN0UGFyYW1OYW1lczogZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gY29tcGlsZVBhdHRlcm4ocGF0dGVybikucGFyYW1OYW1lcztcbiAgfSxcblxuICAvKipcbiAgICogRXh0cmFjdHMgdGhlIHBvcnRpb25zIG9mIHRoZSBnaXZlbiBVUkwgcGF0aCB0aGF0IG1hdGNoIHRoZSBnaXZlbiBwYXR0ZXJuXG4gICAqIGFuZCByZXR1cm5zIGFuIG9iamVjdCBvZiBwYXJhbSBuYW1lID0+IHZhbHVlIHBhaXJzLiBSZXR1cm5zIG51bGwgaWYgdGhlXG4gICAqIHBhdHRlcm4gZG9lcyBub3QgbWF0Y2ggdGhlIGdpdmVuIHBhdGguXG4gICAqL1xuICBleHRyYWN0UGFyYW1zOiBmdW5jdGlvbiAocGF0dGVybiwgcGF0aCkge1xuICAgIHZhciBvYmplY3QgPSBjb21waWxlUGF0dGVybihwYXR0ZXJuKTtcbiAgICB2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKG9iamVjdC5tYXRjaGVyKTtcblxuICAgIGlmICghbWF0Y2gpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIHZhciBwYXJhbXMgPSB7fTtcblxuICAgIG9iamVjdC5wYXJhbU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtTmFtZSwgaW5kZXgpIHtcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdID0gbWF0Y2hbaW5kZXggKyAxXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB2ZXJzaW9uIG9mIHRoZSBnaXZlbiByb3V0ZSBwYXRoIHdpdGggcGFyYW1zIGludGVycG9sYXRlZC4gVGhyb3dzXG4gICAqIGlmIHRoZXJlIGlzIGEgZHluYW1pYyBzZWdtZW50IG9mIHRoZSByb3V0ZSBwYXRoIGZvciB3aGljaCB0aGVyZSBpcyBubyBwYXJhbS5cbiAgICovXG4gIGluamVjdFBhcmFtczogZnVuY3Rpb24gKHBhdHRlcm4sIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIHZhciBzcGxhdEluZGV4ID0gMDtcblxuICAgIHJldHVybiBwYXR0ZXJuLnJlcGxhY2UocGFyYW1JbmplY3RNYXRjaGVyLCBmdW5jdGlvbiAobWF0Y2gsIHBhcmFtTmFtZSkge1xuICAgICAgcGFyYW1OYW1lID0gcGFyYW1OYW1lIHx8ICdzcGxhdCc7XG5cbiAgICAgIC8vIElmIHBhcmFtIGlzIG9wdGlvbmFsIGRvbid0IGNoZWNrIGZvciBleGlzdGVuY2VcbiAgICAgIGlmIChwYXJhbU5hbWUuc2xpY2UoLTEpICE9PSAnPycpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgIHBhcmFtc1twYXJhbU5hbWVdICE9IG51bGwsXG4gICAgICAgICAgJ01pc3NpbmcgXCInICsgcGFyYW1OYW1lICsgJ1wiIHBhcmFtZXRlciBmb3IgcGF0aCBcIicgKyBwYXR0ZXJuICsgJ1wiJ1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1OYW1lID0gcGFyYW1OYW1lLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICBpZiAocGFyYW1zW3BhcmFtTmFtZV0gPT0gbnVsbClcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHZhciBzZWdtZW50O1xuICAgICAgaWYgKHBhcmFtTmFtZSA9PT0gJ3NwbGF0JyAmJiBBcnJheS5pc0FycmF5KHBhcmFtc1twYXJhbU5hbWVdKSkge1xuICAgICAgICBzZWdtZW50ID0gcGFyYW1zW3BhcmFtTmFtZV1bc3BsYXRJbmRleCsrXTtcblxuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgc2VnbWVudCAhPSBudWxsLFxuICAgICAgICAgICdNaXNzaW5nIHNwbGF0ICMgJyArIHNwbGF0SW5kZXggKyAnIGZvciBwYXRoIFwiJyArIHBhdHRlcm4gKyAnXCInXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWdtZW50ID0gcGFyYW1zW3BhcmFtTmFtZV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWdtZW50O1xuICAgIH0pLnJlcGxhY2UocGFyYW1JbmplY3RUcmFpbGluZ1NsYXNoTWF0Y2hlciwgJy8nKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBpcyB0aGUgcmVzdWx0IG9mIHBhcnNpbmcgYW55IHF1ZXJ5IHN0cmluZyBjb250YWluZWRcbiAgICogaW4gdGhlIGdpdmVuIHBhdGgsIG51bGwgaWYgdGhlIHBhdGggY29udGFpbnMgbm8gcXVlcnkgc3RyaW5nLlxuICAgKi9cbiAgZXh0cmFjdFF1ZXJ5OiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2gocXVlcnlNYXRjaGVyKTtcbiAgICByZXR1cm4gbWF0Y2ggJiYgcXMucGFyc2UobWF0Y2hbMV0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gcGF0aCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmcuXG4gICAqL1xuICB3aXRob3V0UXVlcnk6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGgucmVwbGFjZShxdWVyeU1hdGNoZXIsICcnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZlcnNpb24gb2YgdGhlIGdpdmVuIHBhdGggd2l0aCB0aGUgcGFyYW1ldGVycyBpbiB0aGUgZ2l2ZW5cbiAgICogcXVlcnkgbWVyZ2VkIGludG8gdGhlIHF1ZXJ5IHN0cmluZy5cbiAgICovXG4gIHdpdGhRdWVyeTogZnVuY3Rpb24gKHBhdGgsIHF1ZXJ5KSB7XG4gICAgdmFyIGV4aXN0aW5nUXVlcnkgPSBQYXRoLmV4dHJhY3RRdWVyeShwYXRoKTtcblxuICAgIGlmIChleGlzdGluZ1F1ZXJ5KVxuICAgICAgcXVlcnkgPSBxdWVyeSA/IG1lcmdlKGV4aXN0aW5nUXVlcnksIHF1ZXJ5KSA6IGV4aXN0aW5nUXVlcnk7XG5cbiAgICB2YXIgcXVlcnlTdHJpbmcgPSBxcy5zdHJpbmdpZnkocXVlcnksIHsgaW5kaWNlczogZmFsc2UgfSk7XG5cbiAgICBpZiAocXVlcnlTdHJpbmcpXG4gICAgICByZXR1cm4gUGF0aC53aXRob3V0UXVlcnkocGF0aCkgKyAnPycgKyBkZWNvZGVVUklDb21wb25lbnQocXVlcnlTdHJpbmcpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gcGF0aCBpcyBhYnNvbHV0ZS5cbiAgICovXG4gIGlzQWJzb2x1dGU6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBub3JtYWxpemVkIHZlcnNpb24gb2YgdGhlIGdpdmVuIHBhdGguXG4gICAqL1xuICBub3JtYWxpemU6IGZ1bmN0aW9uIChwYXRoLCBwYXJlbnRSb3V0ZSkge1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC8qLywgJy8nKTtcbiAgfSxcblxuICAvKipcbiAgICogSm9pbnMgdHdvIFVSTCBwYXRocyB0b2dldGhlci5cbiAgICovXG4gIGpvaW46IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEucmVwbGFjZSgvXFwvKiQvLCAnLycpICsgYjtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhdGg7XG4iLCJ2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2ludmFyaWFudCcpO1xudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpLmNhblVzZURPTTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgd2luZG93IGFzIHsgeCwgeSB9LlxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxQb3NpdGlvbigpIHtcbiAgaW52YXJpYW50KFxuICAgIGNhblVzZURPTSxcbiAgICAnQ2Fubm90IGdldCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiB3aXRob3V0IGEgRE9NJ1xuICApO1xuXG4gIHJldHVybiB7XG4gICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0V2luZG93U2Nyb2xsUG9zaXRpb247XG4iLCJmdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIC8qISB0YWtlbiBmcm9tIG1vZGVybml6clxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9oaXN0b3J5LmpzXG4gICAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JhY2t0L3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gICAqL1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHxcbiAgICAgICh1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkpICYmXG4gICAgICB1YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgIT09IC0xICYmXG4gICAgICB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiZcbiAgICAgIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuICh3aW5kb3cuaGlzdG9yeSAmJiAncHVzaFN0YXRlJyBpbiB3aW5kb3cuaGlzdG9yeSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VwcG9ydHNIaXN0b3J5O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi8nKTtcbiIsIi8vIExvYWQgbW9kdWxlc1xuXG52YXIgU3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKTtcbnZhciBQYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcblxuXG4vLyBEZWNsYXJlIGludGVybmFsc1xuXG52YXIgaW50ZXJuYWxzID0ge307XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RyaW5naWZ5OiBTdHJpbmdpZnksXG4gICAgcGFyc2U6IFBhcnNlXG59O1xuIiwiLy8gTG9hZCBtb2R1bGVzXG5cbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuXG4vLyBEZWNsYXJlIGludGVybmFsc1xuXG52YXIgaW50ZXJuYWxzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGRlcHRoOiA1LFxuICAgIGFycmF5TGltaXQ6IDIwLFxuICAgIHBhcmFtZXRlckxpbWl0OiAxMDAwXG59O1xuXG5cbmludGVybmFscy5wYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcblxuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBwYXJ0cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgIHZhciBwb3MgPSBwYXJ0LmluZGV4T2YoJ109JykgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBwYXJ0LmluZGV4T2YoJ109JykgKyAxO1xuXG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBvYmpbVXRpbHMuZGVjb2RlKHBhcnQpXSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGtleSA9IFV0aWxzLmRlY29kZShwYXJ0LnNsaWNlKDAsIHBvcykpO1xuICAgICAgICAgICAgdmFyIHZhbCA9IFV0aWxzLmRlY29kZShwYXJ0LnNsaWNlKHBvcyArIDEpKTtcblxuICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBbXS5jb25jYXQob2JqW2tleV0pLmNvbmNhdCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuaW50ZXJuYWxzLnBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcblxuICAgIGlmICghY2hhaW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSBjaGFpbi5zaGlmdCgpO1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgIG9iaiA9IFtdO1xuICAgICAgICBvYmogPSBvYmouY29uY2F0KGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsLCBvcHRpb25zKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgY2xlYW5Sb290ID0gcm9vdFswXSA9PT0gJ1snICYmIHJvb3Rbcm9vdC5sZW5ndGggLSAxXSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCByb290Lmxlbmd0aCAtIDEpIDogcm9vdDtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgIHZhciBpbmRleFN0cmluZyA9ICcnICsgaW5kZXg7XG4gICAgICAgIGlmICghaXNOYU4oaW5kZXgpICYmXG4gICAgICAgICAgICByb290ICE9PSBjbGVhblJvb3QgJiZcbiAgICAgICAgICAgIGluZGV4U3RyaW5nID09PSBjbGVhblJvb3QgJiZcbiAgICAgICAgICAgIGluZGV4ID49IDAgJiZcbiAgICAgICAgICAgIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdCkge1xuXG4gICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgIG9ialtpbmRleF0gPSBpbnRlcm5hbHMucGFyc2VPYmplY3QoY2hhaW4sIHZhbCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGludGVybmFscy5wYXJzZU9iamVjdChjaGFpbiwgdmFsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5cbmludGVybmFscy5wYXJzZUtleXMgPSBmdW5jdGlvbiAoa2V5LCB2YWwsIG9wdGlvbnMpIHtcblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgcGFyZW50ID0gL14oW15cXFtcXF1dKikvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15cXFtcXF1dKlxcXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IHBhcmVudC5leGVjKGtleSk7XG5cbiAgICAvLyBEb24ndCBhbGxvdyB0aGVtIHRvIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KHNlZ21lbnRbMV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAoc2VnbWVudFsxXSkge1xuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuXG4gICAgICAgICsraTtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KHNlZ21lbnRbMV0ucmVwbGFjZSgvXFxbfFxcXS9nLCAnJykpKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJuYWxzLnBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0aW9ucykge1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHxcbiAgICAgICAgc3RyID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCBVdGlscy5pc1JlZ0V4cChvcHRpb25zLmRlbGltaXRlcikgPyBvcHRpb25zLmRlbGltaXRlciA6IGludGVybmFscy5kZWxpbWl0ZXI7XG4gICAgb3B0aW9ucy5kZXB0aCA9IHR5cGVvZiBvcHRpb25zLmRlcHRoID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuZGVwdGggOiBpbnRlcm5hbHMuZGVwdGg7XG4gICAgb3B0aW9ucy5hcnJheUxpbWl0ID0gdHlwZW9mIG9wdGlvbnMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmFycmF5TGltaXQgOiBpbnRlcm5hbHMuYXJyYXlMaW1pdDtcbiAgICBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID0gdHlwZW9mIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA6IGludGVybmFscy5wYXJhbWV0ZXJMaW1pdDtcblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBpbnRlcm5hbHMucGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0ge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IGludGVybmFscy5wYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMpO1xuICAgICAgICBvYmogPSBVdGlscy5tZXJnZShvYmosIG5ld09iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5cbi8vIERlY2xhcmUgaW50ZXJuYWxzXG5cbnZhciBpbnRlcm5hbHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgaW5kaWNlczogdHJ1ZVxufTtcblxuXG5pbnRlcm5hbHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaiwgcHJlZml4LCBvcHRpb25zKSB7XG5cbiAgICBpZiAoVXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBvYmogPSBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBvYmoudG9JU09TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fFxuICAgICAgICB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicpIHtcblxuICAgICAgICByZXR1cm4gW2VuY29kZVVSSUNvbXBvbmVudChwcmVmaXgpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iaildO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvYmpLZXlzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG4gICAgICAgIGlmICghb3B0aW9ucy5pbmRpY2VzICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KG9iaikpIHtcblxuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChpbnRlcm5hbHMuc3RyaW5naWZ5KG9ialtrZXldLCBwcmVmaXgsIG9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoaW50ZXJuYWxzLnN0cmluZ2lmeShvYmpba2V5XSwgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMpIHtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gaW50ZXJuYWxzLmRlbGltaXRlciA6IG9wdGlvbnMuZGVsaW1pdGVyO1xuICAgIG9wdGlvbnMuaW5kaWNlcyA9IHR5cGVvZiBvcHRpb25zLmluZGljZXMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuaW5kaWNlcyA6IGludGVybmFscy5pbmRpY2VzO1xuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICBvYmogPT09IG51bGwpIHtcblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9iaktleXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGludGVybmFscy5zdHJpbmdpZnkob2JqW2tleV0sIGtleSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbn07XG4iLCIvLyBMb2FkIG1vZHVsZXNcblxuXG4vLyBEZWNsYXJlIGludGVybmFsc1xuXG52YXIgaW50ZXJuYWxzID0ge307XG5cblxuZXhwb3J0cy5hcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNvdXJjZS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGFyZ2V0ID0gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJlxuICAgICAgICAhQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG5cbiAgICAgICAgdGFyZ2V0ID0gZXhwb3J0cy5hcnJheVRvT2JqZWN0KHRhcmdldCk7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGtleXMubGVuZ3RoOyBrIDwga2w7ICsraykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1trXTtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKCF0YXJnZXRba2V5XSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gZXhwb3J0cy5tZXJnZSh0YXJnZXRba2V5XSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG5cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn07XG5cblxuZXhwb3J0cy5jb21wYWN0ID0gZnVuY3Rpb24gKG9iaiwgcmVmcykge1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8XG4gICAgICAgIG9iaiA9PT0gbnVsbCkge1xuXG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmVmcyA9IHJlZnMgfHwgW107XG4gICAgdmFyIGxvb2t1cCA9IHJlZnMuaW5kZXhPZihvYmopO1xuICAgIGlmIChsb29rdXAgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiByZWZzW2xvb2t1cF07XG4gICAgfVxuXG4gICAgcmVmcy5wdXNoKG9iaik7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvYmoubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wYWN0ZWQ7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGZvciAoaSA9IDAsIGlsID0ga2V5cy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBvYmpba2V5XSA9IGV4cG9ydHMuY29tcGFjdChvYmpba2V5XSwgcmVmcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cblxuZXhwb3J0cy5pc1JlZ0V4cCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxuXG5leHBvcnRzLmlzQnVmZmVyID0gZnVuY3Rpb24gKG9iaikge1xuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmXG4gICAgICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJlxuICAgICAgICBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV4ZWN1dGlvbkVudmlyb25tZW50XG4gKi9cblxuLypqc2xpbnQgZXZpbDogdHJ1ZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhblVzZURPTSA9ICEhKFxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB3aW5kb3cuZG9jdW1lbnQgJiZcbiAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczpcbiAgICBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjeFxuICovXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIG1hcmsgc3RyaW5nIGxpdGVyYWxzIHJlcHJlc2VudGluZyBDU1MgY2xhc3MgbmFtZXNcbiAqIHNvIHRoYXQgdGhleSBjYW4gYmUgdHJhbnNmb3JtZWQgc3RhdGljYWxseS4gVGhpcyBhbGxvd3MgZm9yIG1vZHVsYXJpemF0aW9uXG4gKiBhbmQgbWluaWZpY2F0aW9uIG9mIENTUyBjbGFzcyBuYW1lcy5cbiAqXG4gKiBJbiBzdGF0aWNfdXBzdHJlYW0sIHRoaXMgZnVuY3Rpb24gaXMgYWN0dWFsbHkgaW1wbGVtZW50ZWQsIGJ1dCBpdCBzaG91bGRcbiAqIGV2ZW50dWFsbHkgYmUgcmVwbGFjZWQgd2l0aCBzb21ldGhpbmcgbW9yZSBkZXNjcmlwdGl2ZSwgYW5kIHRoZSB0cmFuc2Zvcm1cbiAqIHRoYXQgaXMgdXNlZCBpbiB0aGUgbWFpbiBzdGFjayBzaG91bGQgYmUgcG9ydGVkIGZvciB1c2UgZWxzZXdoZXJlLlxuICpcbiAqIEBwYXJhbSBzdHJpbmd8b2JqZWN0IGNsYXNzTmFtZSB0byBtb2R1bGFyaXplLCBvciBhbiBvYmplY3Qgb2Yga2V5L3ZhbHVlcy5cbiAqICAgICAgICAgICAgICAgICAgICAgIEluIHRoZSBvYmplY3QgY2FzZSwgdGhlIHZhbHVlcyBhcmUgY29uZGl0aW9ucyB0aGF0XG4gKiAgICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmUgaWYgdGhlIGNsYXNzTmFtZSBrZXlzIHNob3VsZCBiZSBpbmNsdWRlZC5cbiAqIEBwYXJhbSBbc3RyaW5nIC4uLl0gIFZhcmlhYmxlIGxpc3Qgb2YgY2xhc3NOYW1lcyBpbiB0aGUgc3RyaW5nIGNhc2UuXG4gKiBAcmV0dXJuIHN0cmluZyAgICAgICBSZW5kZXJhYmxlIHNwYWNlLXNlcGFyYXRlZCBDU1MgY2xhc3NOYW1lLlxuICovXG5mdW5jdGlvbiBjeChjbGFzc05hbWVzKSB7XG4gIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjbGFzc05hbWVzKS5maWx0ZXIoZnVuY3Rpb24oY2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gY2xhc3NOYW1lc1tjbGFzc05hbWVdO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcmd1bWVudHMsICcgJyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjeDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBlbXB0eUZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbihhcmcpIHsgcmV0dXJuIGFyZzsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgd2FybmluZ1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoXCIuL2VtcHR5RnVuY3Rpb25cIik7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQgKSB7Zm9yICh2YXIgYXJncz1bXSwkX18wPTIsJF9fMT1hcmd1bWVudHMubGVuZ3RoOyRfXzA8JF9fMTskX18wKyspIGFyZ3MucHVzaChhcmd1bWVudHNbJF9fMF0pO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpICB7cmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107fSkpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIl19
