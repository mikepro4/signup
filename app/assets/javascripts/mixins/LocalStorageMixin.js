define([

  'react'

], function (

  React

) { 

  var ls = global.localStorage;

  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
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
  }

  var Mixin = {
    /**
     * Error checking. On update, ensure that the last state stored in localStorage is equal
     * to the state on the component. We skip the check the first time around as state is left
     * alone until mount to keep server rendering working.
     *
     * If it is not consistent, we know that someone else is modifying localStorage out from under us, so we throw
     * an error.
     *
     * There are a lot of ways this can happen, so it is worth throwing the error.
     */
    componentDidUpdate: function(prevProps, prevState) {
      if (!ls || !this.__stateLoadedFromLS) return;
      var key = getLocalStorageKey(this);
      var prevStoredState = ls.getItem(key);
      if (prevStoredState) {
        invariant(
          prevStoredState === JSON.stringify(prevState),
          'While component ' + getDisplayName(this) + ' was saving state to localStorage, ' +
          'the localStorage entry was modified by another actor. This can happen when multiple ' +
          'components are using the same localStorage key. Set the property `localStorageKey` ' +
          'on ' + getDisplayName(this) + '.'
        );
      }
      ls.setItem(key, JSON.stringify(this.state));
    },

    /**
     * Load data.
     * This seems odd to do this on componentDidMount, but it prevents server checksum errors.
     * This is because the server has no way to know what is in your localStorage. So instead
     * of breaking the checksum and causing a full rerender, we instead change the component after mount
     * for an efficient diff.
     */
    componentDidMount: function () {
      var me = this;
      loadStateFromLocalStorage(this, function() {
        // After setting state, mirror back to localstorage.
        // This prevents invariants if the developer has changed the initial state of the component.
        ls.setItem(getLocalStorageKey(me), JSON.stringify(me.state));
      });
    }
  };

  function loadStateFromLocalStorage(component, cb) {
    if (!ls) return;
    var key = getLocalStorageKey(component);
    var settingState = false;
    try {
      var storedState = JSON.parse(ls.getItem(key));
      if (storedState) {
        settingState = true;
        component.setState(storedState, done);
      }
    } catch(e) {
      if (console) console.warn("Unable to load state for", getDisplayName(component), "from localStorage.");
    }
    // If we didn't set state, run the callback right away.
    if (!settingState) done();

    function done() {
      // Flag this component as loaded.
      component.__stateLoadedFromLS = true;
      cb();
    }
  }

  function getDisplayName(component) {
    // at least, we cannot get displayname 
    // via this.displayname in react 0.12
    return component.displayName || component.constructor.displayName;
  }

  function getLocalStorageKey(component) {
    if (component.getLocalStorageKey) {
      return component.getLocalStorageKey();
    }
    return component.props.localStorageKey || getDisplayName(component) || 'react-localstorage';
  }

  return Mixin

});