(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * DrawSVGPlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function (e) {
    "use strict";

    function i() {
        return "undefined" != typeof window
    }

    function j() {
        return t || i() && (t = window.gsap) && t.registerPlugin && t
    }

    function m(e) {
        return Math.round(1e4 * e) / 1e4
    }

    function n(e) {
        return parseFloat(e || 0)
    }

    function o(e, t) {
        return n(e.getAttribute(t))
    }

    function q(e, t, s, r, i, o) {
        return P(Math.pow((n(s) - n(e)) * i, 2) + Math.pow((n(r) - n(t)) * o, 2))
    }

    function r(e) {
        return console.warn(e)
    }

    function s(e) {
        return "non-scaling-stroke" === e.getAttribute("vector-effect")
    }

    function v(e) {
        if (!(e = k(e)[0])) return 0;
        var t, n, i, a, f, h, d, l = e.tagName.toLowerCase(), u = e.style, c = 1, g = 1;
        s(e) && (g = e.getScreenCTM(), c = P(g.a * g.a + g.b * g.b), g = P(g.d * g.d + g.c * g.c));
        try {
            n = e.getBBox()
        } catch (e) {
            r("Some browsers won't measure invisible elements (like display:none or masks inside defs).")
        }
        var _ = n || {x: 0, y: 0, width: 0, height: 0}, p = _.x, x = _.y, y = _.width, m = _.height;
        if (n && (y || m) || !M[l] || (y = o(e, M[l][0]), m = o(e, M[l][1]), "rect" !== l && "line" !== l && (y *= 2, m *= 2), "line" === l && (p = o(e, "x1"), x = o(e, "y1"), y = Math.abs(y - p), m = Math.abs(m - x))), "path" === l) a = u.strokeDasharray, u.strokeDasharray = "none", t = e.getTotalLength() || 0, c !== g && r("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), t *= (c + g) / 2, u.strokeDasharray = a; else if ("rect" === l) t = 2 * y * c + 2 * m * g; else if ("line" === l) t = q(p, x, p + y, x + m, c, g); else if ("polyline" === l || "polygon" === l) for (i = e.getAttribute("points").match(b) || [], "polygon" === l && i.push(i[0], i[1]), t = 0, f = 2; f < i.length; f += 2) t += q(i[f - 2], i[f - 1], i[f], i[f + 1], c, g) || 0; else "circle" !== l && "ellipse" !== l || (h = y / 2 * c, d = m / 2 * g, t = Math.PI * (3 * (h + d) - P((3 * h + d) * (h + 3 * d))));
        return t || 0
    }

    function w(e, t) {
        if (!(e = k(e)[0])) return [0, 0];
        t = t || v(e) + 1;
        var s = h.getComputedStyle(e), r = s.strokeDasharray || "", i = n(s.strokeDashoffset), o = r.indexOf(",");
        return o < 0 && (o = r.indexOf(" ")), t < (r = o < 0 ? t : n(r.substr(0, o)) || 1e-5) && (r = t), [Math.max(0, -i), Math.max(0, r - i)]
    }

    function x() {
        i() && (h = window, l = t = j(), k = t.utils.toArray, d = -1 !== ((h.navigator || {}).userAgent || "").indexOf("Edge"))
    }

    var t, k, h, d, l, b = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        M = {rect: ["width", "height"], circle: ["r", "r"], ellipse: ["rx", "ry"], line: ["x2", "y2"]}, P = Math.sqrt,
        a = {
            version: "3.5.1", name: "drawSVG", register: function register(e) {
                t = e, x()
            }, init: function init(e, t) {
                if (!e.getBBox) return !1;
                l || x();
                var r, i, o, a, f = v(e) + 1;
                return this._style = e.style, this._target = e, t + "" == "true" ? t = "0 100%" : t ? -1 === (t + "").indexOf(" ") && (t = "0 " + t) : t = "0 0", i = function _parse(e, t, s) {
                    var r, i, o = e.indexOf(" ");
                    return i = o < 0 ? (r = void 0 !== s ? s + "" : e, e) : (r = e.substr(0, o), e.substr(o + 1)), r = ~r.indexOf("%") ? n(r) / 100 * t : n(r), (i = ~i.indexOf("%") ? n(i) / 100 * t : n(i)) < r ? [i, r] : [r, i]
                }(t, f, (r = w(e, f))[0]), this._length = m(f + 10), 0 === r[0] && 0 === i[0] ? (o = Math.max(1e-5, i[1] - f), this._dash = m(f + o), this._offset = m(f - r[1] + o), this._offsetPT = this.add(this, "_offset", this._offset, m(f - i[1] + o))) : (this._dash = m(r[1] - r[0]) || 1e-6, this._offset = m(-r[0]), this._dashPT = this.add(this, "_dash", this._dash, m(i[1] - i[0]) || 1e-5), this._offsetPT = this.add(this, "_offset", this._offset, m(-i[0]))), d && (a = h.getComputedStyle(e)).strokeLinecap !== a.strokeLinejoin && (i = n(a.strokeMiterlimit), this.add(e.style, "strokeMiterlimit", i, i + .01)), this._live = s(e) || ~(t + "").indexOf("live"), this._props.push("drawSVG"), 1
            }, render: function render(e, t) {
                var n, s, r, i, o = t._pt, a = t._style;
                if (o) {
                    for (t._live && (n = v(t._target) + 11) !== t._length && (s = n / t._length, t._length = n, t._offsetPT.s *= s, t._offsetPT.c *= s, t._dashPT ? (t._dashPT.s *= s, t._dashPT.c *= s) : t._dash *= s); o;) o.r(e, o.d), o = o._next;
                    r = t._dash, i = t._offset, n = t._length, a.strokeDashoffset = t._offset, 1 !== e && e ? a.strokeDasharray = r + "px," + n + "px" : (r - i < .001 && n - r <= 10 && (a.strokeDashoffset = i + 1), a.strokeDasharray = i < .001 && n - r <= 10 ? "none" : i === r ? "0px, 999999px" : r + "px," + n + "px")
                }
            }, getLength: v, getPosition: w
        };
    j() && t.registerPlugin(a), e.DrawSVGPlugin = a, e.default = a;
    if (typeof (window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {value: !0})
    } else {
        delete e.default
    }
});
},{}],2:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /*!
   * GSAP 3.6.1
   * https://greensock.com
   *
   * @license Copyright 2008-2021, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
      _defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
  },
      _suppressOverwrites,
      _bigNum = 1e8,
      _tinyNum = 1 / _bigNum,
      _2PI = Math.PI * 2,
      _HALF_PI = _2PI / 4,
      _gsID = 0,
      _sqrt = Math.sqrt,
      _cos = Math.cos,
      _sin = Math.sin,
      _isString = function _isString(value) {
    return typeof value === "string";
  },
      _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
      _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
      _isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
      _isObject = function _isObject(value) {
    return typeof value === "object";
  },
      _isNotFalse = function _isNotFalse(value) {
    return value !== false;
  },
      _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
      _isFuncOrString = function _isFuncOrString(value) {
    return _isFunction(value) || _isString(value);
  },
      _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
      _isArray = Array.isArray,
      _strictNumExp = /(?:-?\.?\d|\.)+/gi,
      _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      _relExp = /[+-]=-?[.\d]+/,
      _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
      _unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i,
      _globalTimeline,
      _win,
      _coreInitted,
      _doc,
      _globals = {},
      _installScope = {},
      _coreReady,
      _install = function _install(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  },
      _missingPlugin = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  },
      _warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
  },
      _addGlobal = function _addGlobal(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  },
      _emptyFunc = function _emptyFunc() {
    return 0;
  },
      _reservedProps = {},
      _lazyTweens = [],
      _lazyLookup = {},
      _lastRenderedFrame,
      _plugins = {},
      _effects = {},
      _nextGCFrame = 30,
      _harnessPlugins = [],
      _callbackNames = "",
      _harness = function _harness(targets) {
    var target = targets[0],
        harnessPlugin,
        i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);

    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;

      while (i-- && !_harnessPlugins[i].targetTest(target)) {}

      harnessPlugin = _harnessPlugins[i];
    }

    i = targets.length;

    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }

    return targets;
  },
      _getCache = function _getCache(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  },
      _getProperty = function _getProperty(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  },
      _forEachName = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  },
      _round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
      _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    var l = toFind.length,
        i = 0;

    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

    return i < l;
  },
      _parseVars = function _parseVars(params, type, parent) {
    var isLegacy = _isNumber(params[1]),
        varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
        vars = params[varsIndex],
        irVars;

    isLegacy && (vars.duration = params[1]);
    vars.parent = parent;

    if (type) {
      irVars = vars;

      while (parent && !("immediateRender" in irVars)) {
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }

      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
    }

    return vars;
  },
      _lazyRender = function _lazyRender() {
    var l = _lazyTweens.length,
        a = _lazyTweens.slice(0),
        i,
        tween;

    _lazyLookup = {};
    _lazyTweens.length = 0;

    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  },
      _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    _lazyTweens.length && _lazyRender();
    animation.render(time, suppressEvents, force);
    _lazyTweens.length && _lazyRender();
  },
      _numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  },
      _passThrough = function _passThrough(p) {
    return p;
  },
      _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }

    return obj;
  },
      _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
    }
  },
      _merge = function _merge(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }

    return base;
  },
      _mergeDeep = function _mergeDeep(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }

    return base;
  },
      _copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {},
        p;

    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }

    return copy;
  },
      _inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || _globalTimeline,
        func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }

    return vars;
  },
      _arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length,
        match = i === a2.length;

    while (match && i-- && a1[i] === a2[i]) {}

    return i < 0;
  },
      _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = parent[lastProp],
        t;

    if (sortBy) {
      t = child[sortBy];

      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }

    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }

    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  },
      _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = child._prev,
        next = child._next;

    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }

    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }

    child._next = child._prev = child.parent = null;
  },
      _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
  },
      _uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      var a = animation;

      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }

    return animation;
  },
      _recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;

    while (parent && parent.parent) {
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }

    return animation;
  },
      _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
  },
      _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  },
      _animationCycle = function _animationCycle(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  },
      _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  },
      _setEnd = function _setEnd(animation) {
    return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  },
      _alignPlayhead = function _alignPlayhead(animation, totalTime) {
    var parent = animation._dp;

    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _round(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

      _setEnd(animation);

      parent._dirty || _uncache(parent, animation);
    }

    return animation;
  },
      _postAddChecks = function _postAddChecks(timeline, child) {
    var t;

    if (child._time || child._initted && !child._dur) {
      t = _parentToChildTotalTime(timeline.rawTime(), child);

      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    }

    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
      if (timeline._dur < timeline.duration()) {
        t = timeline;

        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime);
          t = t._dp;
        }
      }

      timeline._zTime = -_tinyNum;
    }
  },
      _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _round(position + child._delay);
    child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

    timeline._recent = child;
    skipChecks || _postAddChecks(timeline, child);
    return timeline;
  },
      _scrollTrigger = function _scrollTrigger(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  },
      _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
    _initTween(tween, totalTime);

    if (!tween._initted) {
      return 1;
    }

    if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);

      tween._lazy = [totalTime, suppressEvents];
      return 1;
    }
  },
      _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
  },
      _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio,
        ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) || (tween._ts < 0 || tween._dp._ts < 0) && tween.data !== "isFromStart" && tween.data !== "isStart") ? 0 : 1,
        repeatDelay = tween._rDelay,
        tTime = 0,
        pt,
        iteration,
        prevIteration;

    if (repeatDelay && tween._repeat) {
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      prevIteration = _animationCycle(tween._tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

      if (iteration !== prevIteration) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }

    if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
        return;
      }

      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
      suppressEvents || (suppressEvents = totalTime && !prevIteration);
      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);

        if (!suppressEvents) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  },
      _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;

    if (time > prevTime) {
      child = animation._first;

      while (child && child._start <= time) {
        if (!child._dur && child.data === "isPause" && child._start > prevTime) {
          return child;
        }

        child = child._next;
      }
    } else {
      child = animation._last;

      while (child && child._start >= time) {
        if (!child._dur && child.data === "isPause" && child._start < prevTime) {
          return child;
        }

        child = child._prev;
      }
    }
  },
      _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat,
        dur = _round(duration) || 0,
        totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  },
      _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  },
      _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc
  },
      _parsePosition = function _parsePosition(animation, position) {
    var labels = animation.labels,
        recent = animation._recent || _zeroPosition,
        clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
        i,
        offset;

    if (_isString(position) && (isNaN(position) || position in labels)) {
      i = position.charAt(0);

      if (i === "<" || i === ">") {
        return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
      }

      i = position.indexOf("=");

      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }

      offset = +(position.charAt(i - 1) + position.substr(i + 1));
      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
    }

    return position == null ? clippedDuration : +position;
  },
      _conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
  },
      _clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
  },
      getUnit = function getUnit(value) {
    if (typeof value !== "string") {
      return "";
    }

    var v = _unitExp.exec(value);

    return v ? value.substr(v.index + v[0].length) : "";
  },
      clamp = function clamp(min, max, value) {
    return _conditionalReturn(value, function (v) {
      return _clamp(min, max, v);
    });
  },
      _slice = [].slice,
      _isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  },
      _flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }

    return ar.forEach(function (value) {
      var _accumulator;

      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  },
      toArray = function toArray(value, leaveStrings) {
    return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  },
      shuffle = function shuffle(a) {
    return a.sort(function () {
      return .5 - Math.random();
    });
  },
      distribute = function distribute(v) {
    if (_isFunction(v)) {
      return v;
    }

    var vars = _isObject(v) ? v : {
      each: v
    },
        ease = _parseEase(vars.ease),
        from = vars.from || 0,
        base = parseFloat(vars.base) || 0,
        cache = {},
        isDecimal = from > 0 && from < 1,
        ratios = isNaN(from) || isDecimal,
        axis = vars.axis,
        ratioX = from,
        ratioY = from;

    if (_isString(from)) {
      ratioX = ratioY = {
        center: .5,
        edges: .5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }

    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrapAt;

      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

        if (!wrapAt) {
          max = -_bigNum;

          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

          wrapAt--;
        }

        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
        originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;

        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }

        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0;
        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }

      l = (distances[i] - distances.min) / distances.max || 0;
      return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
    };
  },
      _roundModifier = function _roundModifier(v) {
    var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1;
    return function (raw) {
      var n = Math.round(parseFloat(raw) / v) * v * p;
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  },
      snap = function snap(snapTo, value) {
    var isArray = _isArray(snapTo),
        radius,
        is2D;

    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;

      if (snapTo.values) {
        snapTo = toArray(snapTo.values);

        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius;
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }

    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function (raw) {
      var x = parseFloat(is2D ? raw.x : raw),
          y = parseFloat(is2D ? raw.y : 0),
          min = _bigNum,
          closest = 0,
          i = snapTo.length,
          dx,
          dy;

      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }

        if (dx < min) {
          min = dx;
          closest = i;
        }
      }

      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  },
      random = function random(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  },
      pipe = function pipe() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }

    return function (value) {
      return functions.reduce(function (v, f) {
        return f(v);
      }, value);
    };
  },
      unitize = function unitize(func, unit) {
    return function (value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  },
      normalize = function normalize(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  },
      _wrapArray = function _wrapArray(a, wrapper, value) {
    return _conditionalReturn(value, function (index) {
      return a[~~wrapper(index)];
    });
  },
      wrap = function wrap(min, max, value) {
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
      return (range + (value - min) % range) % range + min;
    });
  },
      wrapYoyo = function wrapYoyo(min, max, value) {
    var range = max - min,
        total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
      value = (total + (value - min) % total) % total || 0;
      return min + (value > range ? total - value : value);
    });
  },
      _replaceRandom = function _replaceRandom(value) {
    var prev = 0,
        s = "",
        i,
        nums,
        end,
        isArray;

    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }

    return s + value.substr(prev, value.length - prev);
  },
      mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin,
        outRange = outMax - outMin;
    return _conditionalReturn(value, function (value) {
      return outMin + ((value - inMin) / inRange * outRange || 0);
    });
  },
      interpolate = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function (p) {
      return (1 - p) * start + p * end;
    };

    if (!func) {
      var isString = _isString(start),
          master = {},
          p,
          i,
          interpolators,
          l,
          il;

      progress === true && (mutate = 1) && (progress = null);

      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;

        for (i = 1; i < l; i++) {
          interpolators.push(interpolate(start[i - 1], start[i]));
        }

        l--;

        func = function func(p) {
          p *= l;
          var i = Math.min(il, ~~p);
          return interpolators[i](p - i);
        };

        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }

      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }

        func = function func(p) {
          return _renderPropTweens(p, master) || (isString ? start.p : start);
        };
      }
    }

    return _conditionalReturn(progress, func);
  },
      _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    var labels = timeline.labels,
        min = _bigNum,
        p,
        distance,
        label;

    for (p in labels) {
      distance = labels[p] - fromTime;

      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }

    return label;
  },
      _callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars,
        callback = v[type],
        params,
        scope;

    if (!callback) {
      return;
    }

    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender();
    return params ? callback.apply(scope, params) : callback.call(scope);
  },
      _interrupt = function _interrupt(animation) {
    _removeFromParent(animation);

    animation.scrollTrigger && animation.scrollTrigger.kill(false);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  },
      _quickTween,
      _createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config;

    var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
      this._props = [];
    } : config,
        instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    },
        statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };

    _wake();

    if (config !== Plugin) {
      if (_plugins[name]) {
        return;
      }

      _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics));

      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics)));

      _plugins[Plugin.prop = name] = Plugin;

      if (config.targetTest) {
        _harnessPlugins.push(Plugin);

        _reservedProps[name] = 1;
      }

      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }

    _addGlobal(name, Plugin);

    config.register && config.register(gsap, Plugin, PropTween);
  },
      _255 = 255,
      _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  },
      _hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
  },
      splitColor = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
        r,
        g,
        b,
        h,
        s,
        l,
        max,
        min,
        d,
        wasHSL;

    if (!a) {
      if (v.substr(-1) === ",") {
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }

        if (v.length === 9) {
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);

        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= .5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1);
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }

      a = a.map(Number);
    }

    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = ~~(h + .5);
      a[1] = ~~(s * 100 + .5);
      a[2] = ~~(l * 100 + .5);
    }

    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  },
      _colorOrderData = function _colorOrderData(v) {
    var values = [],
        c = [],
        i = -1;
    v.split(_colorExp).forEach(function (v) {
      var a = v.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  },
      _formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "",
        colors = (s + result).match(_colorExp),
        type = toHSL ? "hsla(" : "rgba(",
        i = 0,
        c,
        shell,
        d,
        l;

    if (!colors) {
      return s;
    }

    colors = colors.map(function (color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });

    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;

      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;

        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }

    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }

    return result + shell[l];
  },
      _colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        p;

    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }

    return new RegExp(s + ")", "gi");
  }(),
      _hslExp = /hsl[a]?\(/,
      _colorStringFilter = function _colorStringFilter(a) {
    var combined = a.join(" "),
        toHSL;
    _colorExp.lastIndex = 0;

    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
      return true;
    }
  },
      _tickerActive,
      _ticker = function () {
    var _getTime = Date.now,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _startTime = _getTime(),
        _lastUpdate = _startTime,
        _gap = 1000 / 240,
        _nextTime = _gap,
        _listeners = [],
        _id,
        _req,
        _raf,
        _self,
        _delta,
        _i,
        _tick = function _tick(v) {
      var elapsed = _getTime() - _lastUpdate,
          manual = v === true,
          overlap,
          dispatch,
          time,
          frame;

      elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;

      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1000;
        _self.time = time = time / 1000;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }

      manual || (_id = _req(_tick));

      if (dispatch) {
        for (_i = 0; _i < _listeners.length; _i++) {
          _listeners[_i](time, _delta, frame, v);
        }
      }
    };

    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1000 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

            _raf = _win.requestAnimationFrame;
          }

          _id && _self.sleep();

          _req = _raf || function (f) {
            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
          };

          _tickerActive = 1;

          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || 1 / _tinyNum;
        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
      },
      fps: function fps(_fps) {
        _gap = 1000 / (_fps || 240);
        _nextTime = _self.time * 1000 + _gap;
      },
      add: function add(callback) {
        _listeners.indexOf(callback) < 0 && _listeners.push(callback);

        _wake();
      },
      remove: function remove(callback) {
        var i;
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners
    };
    return _self;
  }(),
      _wake = function _wake() {
    return !_tickerActive && _ticker.wake();
  },
      _easeMap = {},
      _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
      _quotesExp = /["']/g,
      _parseObjectInString = function _parseObjectInString(value) {
    var obj = {},
        split = value.substr(1, value.length - 3).split(":"),
        key = split[0],
        i = 1,
        l = split.length,
        index,
        val,
        parsedVal;

    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }

    return obj;
  },
      _valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1,
        close = value.indexOf(")"),
        nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  },
      _configEaseFromString = function _configEaseFromString(name) {
    var split = (name + "").split("("),
        ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  },
      _invertEase = function _invertEase(ease) {
    return function (p) {
      return 1 - ease(1 - p);
    };
  },
      _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first,
        ease;

    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }

      child = child._next;
    }
  },
      _parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  },
      _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
      };
    }

    if (easeInOut === void 0) {
      easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }

    var ease = {
      easeIn: easeIn,
      easeOut: easeOut,
      easeInOut: easeInOut
    },
        lowercaseName;

    _forEachName(names, function (name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });

    return ease;
  },
      _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function (p) {
      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
  },
      _configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1,
        p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
        p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
        easeOut = function easeOut(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    p2 = _2PI / p2;

    ease.config = function (amplitude, period) {
      return _configElastic(type, amplitude, period);
    };

    return ease;
  },
      _configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }

    var easeOut = function easeOut(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    ease.config = function (overshoot) {
      return _configBack(type, overshoot);
    };

    return ease;
  };

  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
    var power = i < 5 ? i + 1 : i;

    _insertEase(name + ",Power" + (power - 1), i ? function (p) {
      return Math.pow(p, power);
    } : function (p) {
      return p;
    }, function (p) {
      return 1 - Math.pow(1 - p, power);
    }, function (p) {
      return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });

  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

  (function (n, c) {
    var n1 = 1 / c,
        n2 = 2 * n1,
        n3 = 2.5 * n1,
        easeOut = function easeOut(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };

    _insertEase("Bounce", function (p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);

  _insertEase("Expo", function (p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });

  _insertEase("Circ", function (p) {
    return -(_sqrt(1 - p * p) - 1);
  });

  _insertEase("Sine", function (p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });

  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }

      var p1 = 1 / steps,
          p2 = steps + (immediateStart ? 0 : 1),
          p3 = immediateStart ? 1 : 0,
          max = 1 - _tinyNum;
      return function (p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];

  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
    return _callbackNames += name + "," + name + "Params,";
  });

  var GSCache = function GSCache(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = function () {
    function Animation(vars, time) {
      var parent = vars.parent || _globalTimeline;
      this.vars = vars;
      this._delay = +vars.delay || 0;

      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }

      this._ts = 1;

      _setDuration(this, +vars.duration, 1, 1);

      this.data = vars.data;
      _tickerActive || _ticker.wake();
      parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
      vars.reversed && this.reverse();
      vars.paused && this.paused(true);
    }

    var _proto = Animation.prototype;

    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }

      return this._delay;
    };

    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };

    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }

      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };

    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();

      if (!arguments.length) {
        return this._tTime;
      }

      var parent = this._dp;

      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);

        !parent._dp || parent.parent || _postAddChecks(parent, this);

        while (parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }

          parent = parent.parent;
        }

        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }

      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);

        _lazySafeRender(this, _totalTime, suppressEvents);
      }

      return this;
    };

    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time;
    };

    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };

    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };

    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;

      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };

    _proto.timeScale = function timeScale(value) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }

      if (this._rts === value) {
        return this;
      }

      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      return _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
    };

    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }

      if (this._ps !== value) {
        this._ps = value;

        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();

          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum);
        }
      }

      return this;
    };

    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }

      return this._start;
    };

    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
    };

    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };

    _proto.globalTime = function globalTime(rawTime) {
      var animation = this,
          time = arguments.length ? rawTime : animation.rawTime();

      while (animation) {
        time = animation._start + time / (animation._ts || 1);
        animation = animation._dp;
      }

      return time;
    };

    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }

      return this._repeat === -2 ? Infinity : this._repeat;
    };

    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        this._rDelay = value;
        return _onUpdateTotalDuration(this);
      }

      return this._rDelay;
    };

    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }

      return this._yoyo;
    };

    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };

    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };

    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };

    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };

    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };

    _proto.resume = function resume() {
      return this.paused(false);
    };

    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }

      return this._rts < 0;
    };

    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };

    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp,
          start = this._start,
          rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };

    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;

      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }

        return this;
      }

      return vars[type];
    };

    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function (resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
            _resolve = function _resolve() {
          var _then = self.then;
          self.then = null;
          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };

        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };

    _proto.kill = function kill() {
      _interrupt(this);
    };

    return Animation;
  }();

  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });

  var Timeline = function (_Animation) {
    _inheritsLoose(Timeline, _Animation);

    function Timeline(vars, time) {
      var _this;

      if (vars === void 0) {
        vars = {};
      }

      _this = _Animation.call(this, vars, time) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }

    var _proto2 = Timeline.prototype;

    _proto2.to = function to(targets, vars, position) {
      new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
      return this;
    };

    _proto2.from = function from(targets, vars, position) {
      new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
      return this;
    };

    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
      return this;
    };

    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };

    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
    };

    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };

    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._dirty ? this.totalDuration() : this._tDur,
          dur = this._dur,
          tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
          time,
          child,
          next,
          iteration,
          cycleDuration,
          prevPaused,
          pauseTween,
          timeScale,
          prevStart,
          prevIteration,
          yoyo,
          isYoyo;

      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }

        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;

        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }

        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;

          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }

          time = _round(tTime % cycleDuration);

          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration);

          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }

          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1,
                doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : dur;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }

            dur = this._dur;
            tDur = this._tDur;

            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -0.0001;
              this.render(prevTime, true);
            }

            this._lock = 0;

            if (!this._ts && !prevPaused) {
              return this;
            }

            _propagateYoyoEase(this, isYoyo);
          }
        }

        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }

        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;

        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }

        !prevTime && time && !suppressEvents && _callback(this, "onStart");

        if (time >= prevTime && totalTime >= 0) {
          child = this._first;

          while (child) {
            next = child._next;

            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }

            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;

          while (child) {
            next = child._prev;

            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }

            child = next;
          }
        }

        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

          if (this._ts) {
            this._start = prevStart;

            _setEnd(this);

            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
          (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto2.add = function add(child, position) {
      var _this2 = this;

      _isNumber(position) || (position = _parsePosition(this, position));

      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function (obj) {
            return _this2.add(obj, position);
          });
          return this;
        }

        if (_isString(child)) {
          return this.addLabel(child, position);
        }

        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }

      return this !== child ? _addToTimeline(this, child, position) : this;
    };

    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }

      if (tweens === void 0) {
        tweens = true;
      }

      if (timelines === void 0) {
        timelines = true;
      }

      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }

      var a = [],
          child = this._first;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }

        child = child._next;
      }

      return a;
    };

    _proto2.getById = function getById(id) {
      var animations = this.getChildren(1, 1, 1),
          i = animations.length;

      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };

    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }

      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }

      _removeLinkedListItem(this, child);

      if (child === this._recent) {
        this._recent = this._last;
      }

      return _uncache(this);
    };

    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }

      this._forcing = 1;

      if (!this._dp && this._ts) {
        this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }

      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

      this._forcing = 0;
      return this;
    };

    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };

    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };

    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };

    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);

      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }

        child = child._next;
      }
    };

    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive),
          i = tweens.length;

      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }

      return this;
    };

    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
      var a = [],
          parsedTargets = toArray(targets),
          child = this._first,
          isGlobalTime = _isNumber(onlyActive),
          children;

      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }

        child = child._next;
      }

      return a;
    };

    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};

      var tl = this,
          endTime = _parsePosition(tl, position),
          _vars = vars,
          startAt = _vars.startAt,
          _onStart = _vars.onStart,
          onStartParams = _vars.onStartParams,
          immediateRender = _vars.immediateRender,
          tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          _onStart && _onStart.apply(tween, onStartParams || []);
        }
      }, vars));

      return immediateRender ? tween.render(0) : tween;
    };

    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };

    _proto2.recent = function recent() {
      return this._recent;
    };

    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };

    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };

    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };

    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }

      var child = this._first,
          labels = this.labels,
          p;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }

        child = child._next;
      }

      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }

      return _uncache(this);
    };

    _proto2.invalidate = function invalidate() {
      var child = this._first;
      this._lock = 0;

      while (child) {
        child.invalidate();
        child = child._next;
      }

      return _Animation.prototype.invalidate.call(this);
    };

    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }

      var child = this._first,
          next;

      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }

      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };

    _proto2.totalDuration = function totalDuration(value) {
      var max = 0,
          self = this,
          child = self._last,
          prevStart = _bigNum,
          prev,
          start,
          parent;

      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }

      if (self._dirty) {
        parent = self.parent;

        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;

          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }

          if (start < 0 && child._ts) {
            max -= start;

            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }

            self.shiftChildren(-start, false, -1e999);
            prevStart = 0;
          }

          child._end > max && child._ts && (max = child._end);
          child = prev;
        }

        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

        self._dirty = 0;
      }

      return self._tDur;
    };

    Timeline.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

        _lastRenderedFrame = _ticker.frame;
      }

      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }

          child || _ticker.sleep();
        }
      }
    };

    return Timeline;
  }(Animation);

  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });

  var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
        index = 0,
        matchIndex = 0,
        result,
        startNums,
        color,
        endNum,
        chunk,
        startNum,
        hasRandom,
        a;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";

    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop);
      start = a[0];
      end = a[1];
    }

    startNums = start.match(_complexStringNumExp) || [];

    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }

      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0;
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          s: startNum,
          c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : "";
    pt.fp = funcParam;

    if (_relExp.test(end) || hasRandom) {
      pt.e = 0;
    }

    this._pt = pt;
    return pt;
  },
      _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop],
        parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
        setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
        pt;

    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }

      if (end.charAt(1) === "=") {
        end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
      }
    }

    if (parsedStart !== end) {
      if (!isNaN(parsedStart * end)) {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }

      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  },
      _processVars = function _processVars(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }

    var copy = {},
        p;

    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }

    return copy;
  },
      _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;

    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
        i = plugin._props.length;

        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }

    return plugin;
  },
      _overwritingTween,
      _initTween = function _initTween(tween, time) {
    var vars = tween.vars,
        ease = vars.ease,
        startAt = vars.startAt,
        immediateRender = vars.immediateRender,
        lazy = vars.lazy,
        onUpdate = vars.onUpdate,
        onUpdateParams = vars.onUpdateParams,
        callbackScope = vars.callbackScope,
        runBackwards = vars.runBackwards,
        yoyoEase = vars.yoyoEase,
        keyframes = vars.keyframes,
        autoRevert = vars.autoRevert,
        dur = tween._dur,
        prevStartAt = tween._startAt,
        targets = tween._targets,
        parent = tween.parent,
        fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
        autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
        tl = tween.timeline,
        cleanVars,
        i,
        p,
        pt,
        target,
        hasPriority,
        gsData,
        harness,
        plugin,
        ptLookup,
        index,
        harnessVars,
        overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

    if (yoyoEase && tween._yoyo && !tween._repeat) {
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }

    if (!tl) {
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop];
      cleanVars = _copyExcluding(vars, _reservedProps);
      prevStartAt && prevStartAt.render(-1, true).kill();

      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent: parent,
          immediateRender: true,
          lazy: _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate,
          onUpdateParams: onUpdateParams,
          callbackScope: callbackScope,
          stagger: 0
        }, startAt)));

        if (immediateRender) {
          if (time > 0) {
            autoRevert || (tween._startAt = 0);
          } else if (dur && !(time < 0 && prevStartAt)) {
            time && (tween._zTime = time);
            return;
          }
        } else if (autoRevert === false) {
          tween._startAt = 0;
        }
      } else if (runBackwards && dur) {
        if (prevStartAt) {
          !autoRevert && (tween._startAt = 0);
        } else {
          time && (immediateRender = false);
          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            lazy: immediateRender && _isNotFalse(lazy),
            immediateRender: immediateRender,
            stagger: 0,
            parent: parent
          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars);

          _removeFromParent(tween._startAt = Tween.set(targets, p));

          if (!immediateRender) {
            _initTween(tween._startAt, _tinyNum);
          } else if (!time) {
            return;
          }
        }
      }

      tween._pt = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;

      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
        index = fullTargets === targets ? i : fullTargets.indexOf(target);

        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

          plugin._props.forEach(function (name) {
            ptLookup[name] = pt;
          });

          plugin.priority && (hasPriority = 1);
        }

        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }

        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;

          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(0));

          overwritten = !tween.parent;
          _overwritingTween = 0;
        }

        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }

      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween);
    }

    tween._from = !tl && !!vars.runBackwards;
    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten;
  },
      _addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
        propertyAliases = harness && harness.aliases,
        copy,
        p,
        i,
        aliases;

    if (!propertyAliases) {
      return vars;
    }

    copy = _merge({}, vars);

    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;

        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }

    return copy;
  },
      _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  },
      _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
      _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");

  var Tween = function (_Animation2) {
    _inheritsLoose(Tween, _Animation2);

    function Tween(targets, vars, time, skipInherit) {
      var _this3;

      if (typeof vars === "number") {
        time.duration = vars;
        vars = time;
        time = null;
      }

      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
      var _this3$vars = _this3.vars,
          duration = _this3$vars.duration,
          delay = _this3$vars.delay,
          immediateRender = _this3$vars.immediateRender,
          stagger = _this3$vars.stagger,
          overwrite = _this3$vars.overwrite,
          keyframes = _this3$vars.keyframes,
          defaults = _this3$vars.defaults,
          scrollTrigger = _this3$vars.scrollTrigger,
          yoyoEase = _this3$vars.yoyoEase,
          parent = _this3.parent,
          parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
          tl,
          i,
          copy,
          l,
          p,
          curTarget,
          staggerFunc,
          staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;

      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults || {}
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;

        if (keyframes) {
          _setDefaults(tl.vars.defaults, {
            ease: "none"
          });

          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
        } else {
          l = parsedTargets.length;
          staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }

          for (i = 0; i < l; i++) {
            copy = {};

            for (p in vars) {
              if (_staggerPropsToSkip.indexOf(p) < 0) {
                copy[p] = vars[p];
              }
            }

            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }

            tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
          }

          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        }

        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }

      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);

        _globalTimeline.killTweensOf(parsedTargets);

        _overwritingTween = 0;
      }

      parent && _postAddChecks(parent, _assertThisInitialized(_this3));

      if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;

        _this3.render(Math.max(0, -delay));
      }

      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }

    var _proto3 = Tween.prototype;

    _proto3.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._tDur,
          dur = this._dur,
          tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          time,
          pt,
          iteration,
          cycleDuration,
          prevIteration,
          isYoyo,
          ratio,
          timeline,
          yoyoEase;

      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
        time = tTime;
        timeline = this.timeline;

        if (this._repeat) {
          cycleDuration = dur + this._rDelay;

          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }

          time = _round(tTime % cycleDuration);

          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          isYoyo = this._yoyo && iteration & 1;

          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);

          if (time === prevTime && !force && this._initted) {
            return this;
          }

          if (iteration !== prevIteration) {
            timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);

            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
              this._lock = force = 1;
              this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }

        if (!this._initted) {
          if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
            this._tTime = 0;
            return this;
          }

          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._tTime = tTime;
        this._time = time;

        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }

        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }

        time && !prevTime && !suppressEvents && _callback(this, "onStart");
        pt = this._pt;

        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }

        timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

        if (this._onUpdate && !suppressEvents) {
          totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force);

          _callback(this, "onUpdate");
        }

        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto3.targets = function targets() {
      return this._targets;
    };

    _proto3.invalidate = function invalidate() {
      this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate();
      return _Animation2.prototype.invalidate.call(this);
    };

    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }

      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        return this.parent ? _interrupt(this) : this;
      }

      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }

      var parsedTargets = this._targets,
          killingTargets = targets ? toArray(targets) : parsedTargets,
          propTweenLookup = this._ptLookup,
          firstPT = this._pt,
          overwrittenProps,
          curLookup,
          curOverwriteProps,
          props,
          p,
          pt,
          i;

      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }

      overwrittenProps = this._op = this._op || [];

      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};

          _forEachName(vars, function (name) {
            return p[name] = 1;
          });

          vars = p;
        }

        vars = _addAliasesToVars(parsedTargets, vars);
      }

      i = parsedTargets.length;

      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];

          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }

          for (p in props) {
            pt = curLookup && curLookup[p];

            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }

              delete curLookup[p];
            }

            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }

      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };

    Tween.to = function to(targets, vars) {
      return new Tween(targets, vars, arguments[2]);
    };

    Tween.from = function from(targets, vars) {
      return new Tween(targets, _parseVars(arguments, 1));
    };

    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay: delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };

    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
      return new Tween(targets, _parseVars(arguments, 2));
    };

    Tween.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween(targets, vars);
    };

    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };

    return Tween;
  }(Animation);

  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });

  _forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
    Tween[name] = function () {
      var tl = new Timeline(),
          params = _slice.call(arguments, 0);

      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });

  var _setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
  },
      _setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
  },
      _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
  },
      _setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
  },
      _getSetter = function _getSetter(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  },
      _renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
  },
      _renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  },
      _renderComplexString = function _renderComplexString(ratio, data) {
    var pt = data._pt,
        s = "";

    if (!ratio && data.b) {
      s = data.b;
    } else if (ratio === 1 && data.e) {
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s;
        pt = pt._next;
      }

      s += data.c;
    }

    data.set(data.t, data.p, s, data);
  },
      _renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  },
      _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt,
        next;

    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  },
      _killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt,
        hasNonDependentRemaining,
        next;

    while (pt) {
      next = pt._next;

      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }

      pt = next;
    }

    return !hasNonDependentRemaining;
  },
      _setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  },
      _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt,
        next,
        pt2,
        first,
        last;

    while (pt) {
      next = pt._next;
      pt2 = first;

      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }

      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }

      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }

      pt = next;
    }

    parent._pt = first;
  };

  var PropTween = function () {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;

      if (next) {
        next._prev = this;
      }
    }

    var _proto4 = PropTween.prototype;

    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };

    return PropTween;
  }();

  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
    return _reservedProps[name] = 1;
  });

  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(function (config) {
        return _createPlugin(config);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);

      var getter = _getCache(target || {}).get,
          format = unit ? _passThrough : _numericIfPossible;

      unit === "native" && (unit = "");
      return !target ? target : !property ? function (property, unit, uncache) {
        return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);

      if (target.length > 1) {
        var setters = target.map(function (t) {
          return gsap.quickSetter(t, property, unit);
        }),
            l = setters.length;
        return function (value) {
          var i = l;

          while (i--) {
            setters[i](value);
          }
        };
      }

      target = target[0] || {};

      var Plugin = _plugins[property],
          cache = _getCache(target),
          p = cache.harness && (cache.harness.aliases || {})[property] || property,
          setter = Plugin ? function (value) {
        var p = new Plugin();
        _quickTween._pt = 0;
        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p.render(1, p);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);

      return Plugin ? setter : function (value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref2) {
      var name = _ref2.name,
          effect = _ref2.effect,
          plugins = _ref2.plugins,
          defaults = _ref2.defaults,
          extendTimeline = _ref2.extendTimeline;
      (plugins || "").split(",").forEach(function (pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });

      _effects[name] = function (targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
      };

      if (extendTimeline) {
        Timeline.prototype[name] = function (targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }

      var tl = new Timeline(vars),
          child,
          next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

      _globalTimeline.remove(tl);

      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;

      while (child) {
        next = child._next;

        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }

        child = next;
      }

      _addToTimeline(_globalTimeline, tl, 0);

      return tl;
    },
    utils: {
      wrap: wrap,
      wrapYoyo: wrapYoyo,
      distribute: distribute,
      random: random,
      snap: snap,
      normalize: normalize,
      getUnit: getUnit,
      clamp: clamp,
      splitColor: splitColor,
      toArray: toArray,
      mapRange: mapRange,
      pipe: pipe,
      unitize: unitize,
      interpolate: interpolate,
      shuffle: shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween: PropTween,
      globals: _addGlobal,
      Tween: Tween,
      Timeline: Timeline,
      Animation: Animation,
      getCache: _getCache,
      _removeLinkedListItem: _removeLinkedListItem,
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };

  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
    return _gsap[name] = Tween[name];
  });

  _ticker.add(Timeline.updateRoot);

  _quickTween = _gsap.to({}, {
    duration: 0
  });

  var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;

    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }

    return pt;
  },
      _addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets,
        p,
        i,
        pt;

    for (p in modifiers) {
      i = targets.length;

      while (i--) {
        pt = tween._ptLookup[i][p];

        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            pt = _getPluginPropTween(pt, p);
          }

          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  },
      _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
      name: name,
      rawVars: 1,
      init: function init(target, vars, tween) {
        tween._onInit = function (tween) {
          var temp, p;

          if (_isString(vars)) {
            temp = {};

            _forEachName(vars, function (name) {
              return temp[name] = 1;
            });

            vars = temp;
          }

          if (modifier) {
            temp = {};

            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }

            vars = temp;
          }

          _addModifiers(tween, vars);
        };
      }
    };
  };

  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt;

      for (p in vars) {
        pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
        pt && (pt.op = p);

        this._props.push(p);
      }
    }
  }, {
    name: "endArray",
    init: function init(target, value) {
      var i = value.length;

      while (i--) {
        this.add(target, i, target[i] || 0, value[i]);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.6.1";
  _coreReady = 1;

  if (_windowExists()) {
    _wake();
  }

  var Power0 = _easeMap.Power0,
      Power1 = _easeMap.Power1,
      Power2 = _easeMap.Power2,
      Power3 = _easeMap.Power3,
      Power4 = _easeMap.Power4,
      Linear = _easeMap.Linear,
      Quad = _easeMap.Quad,
      Cubic = _easeMap.Cubic,
      Quart = _easeMap.Quart,
      Quint = _easeMap.Quint,
      Strong = _easeMap.Strong,
      Elastic = _easeMap.Elastic,
      Back = _easeMap.Back,
      SteppedEase = _easeMap.SteppedEase,
      Bounce = _easeMap.Bounce,
      Sine = _easeMap.Sine,
      Expo = _easeMap.Expo,
      Circ = _easeMap.Circ;

  var _win$1,
      _doc$1,
      _docElement,
      _pluginInitted,
      _tempDiv,
      _tempDivStyler,
      _recentSetterPlugin,
      _windowExists$1 = function _windowExists() {
    return typeof window !== "undefined";
  },
      _transformProps = {},
      _RAD2DEG = 180 / Math.PI,
      _DEG2RAD = Math.PI / 180,
      _atan2 = Math.atan2,
      _bigNum$1 = 1e8,
      _capsExp = /([A-Z])/g,
      _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
      _complexExp = /[\s,\(]\S/,
      _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
      _renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
  },
      _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
  },
      _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  },
      _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  },
      _setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
  },
      _setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
  },
      _setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
  },
      _setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  },
      _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  },
      _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  },
      _transformProp = "transform",
      _transformOriginProp = _transformProp + "Origin",
      _supports3D,
      _createElement = function _createElement(type, ns) {
    var e = _doc$1.createElementNS ? _doc$1.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$1.createElement(type);
    return e.style ? e : _doc$1.createElement(type);
  },
      _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || "";
  },
      _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
      _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || _tempDiv,
        s = e.style,
        i = 5;

    if (property in s && !preferPrefix) {
      return property;
    }

    property = property.charAt(0).toUpperCase() + property.substr(1);

    while (i-- && !(_prefixes[i] + property in s)) {}

    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  },
      _initCore = function _initCore() {
    if (_windowExists$1() && window.document) {
      _win$1 = window;
      _doc$1 = _win$1.document;
      _docElement = _doc$1.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
      _supports3D = !!_checkPropPrefix("perspective");
      _pluginInitted = 1;
    }
  },
      _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox;
        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }

    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;

    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  },
      _getBBox = function _getBBox(target) {
    var bounds;

    try {
      bounds = target.getBBox();
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }

    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  },
      _isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      _removeProperty = function _removeProperty(target, property) {
    if (property) {
      var style = target.style;

      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }

      if (style.removeProperty) {
        if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
          property = "-" + property;
        }

        style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        style.removeAttribute(property);
      }
    }
  },
      _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;

    plugin._props.push(property);

    return pt;
  },
      _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  },
      _convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0,
        curUnit = (value + "").trim().substr((curValue + "").length) || "px",
        style = _tempDiv.style,
        horizontal = _horizontalExp.test(property),
        isRootSVG = target.tagName.toLowerCase() === "svg",
        measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
        amount = 100,
        toPixels = unit === "px",
        toPercent = unit === "%",
        px,
        parent,
        cache,
        isSVG;

    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }

    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);

    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }

    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }

    if (!parent || parent === _doc$1 || !parent.appendChild) {
      parent = _doc$1.body;
    }

    cache = parent._gsap;

    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
      return _round(curValue / cache.width * amount);
    } else {
      (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";

      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }

    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  },
      _get = function _get(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();

    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];

      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }

    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];

      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
      }
    }

    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  },
      _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    if (!start || start === "none") {
      var p = _checkPropPrefix(prop, target, 1),
          s = p && _getComputedProperty(target, p, 1);

      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor");
      }
    }

    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
        index = 0,
        matchIndex = 0,
        a,
        result,
        startValues,
        startNum,
        color,
        startValue,
        endValue,
        endNum,
        chunk,
        endUnit,
        startUnit,
        relative,
        endValues;
    pt.b = start;
    pt.e = end;
    start += "";
    end += "";

    if (end === "auto") {
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      target.style[prop] = start;
    }

    a = [start, end];

    _colorStringFilter(a);

    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];

    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);

        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }

        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

          if (relative) {
            endValue = endValue.substr(2);
          }

          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;

          if (!endUnit) {
            endUnit = endUnit || _config.units[prop] || startUnit;

            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }

          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          }

          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            s: startNum,
            c: relative ? relative * endNum : endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }

      pt.c = index < end.length ? end.substring(index, end.length) : "";
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }

    _relExp.test(end) && (pt.e = 0);
    this._pt = pt;
    return pt;
  },
      _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
      _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "),
        x = split[0],
        y = split[1] || "50%";

    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      value = x;
      x = y;
      y = value;
    }

    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  },
      _renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t,
          style = target.style,
          props = data.u,
          cache = target._gsap,
          prop,
          clearTransforms,
          i;

      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;

        while (--i > -1) {
          prop = props[i];

          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }

          _removeProperty(target, prop);
        }
      }

      if (clearTransforms) {
        _removeProperty(target, _transformProp);

        if (cache) {
          cache.svg && target.removeAttribute("transform");

          _parseTransform(target, 1);

          cache.uncache = 1;
        }
      }
    }
  },
      _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;

        plugin._props.push(property);

        return 1;
      }
    }
  },
      _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _rotationalProperties = {},
      _isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  },
      _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = _getComputedProperty(target, _transformProp);

    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  },
      _getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || _getCache(target),
        style = target.style,
        matrix = _getComputedTransformMatrixAsArray(target),
        parent,
        nextSibling,
        temp,
        addedToDOM;

    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix;
      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;

      if (!parent || !target.offsetParent) {
        addedToDOM = 1;
        nextSibling = target.nextSibling;

        _docElement.appendChild(target);
      }

      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");

      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }

    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  },
      _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap,
        matrix = matrixArray || _getMatrix(target, true),
        xOriginOld = cache.xOrigin || 0,
        yOriginOld = cache.yOrigin || 0,
        xOffsetOld = cache.xOffset || 0,
        yOffsetOld = cache.yOffset || 0,
        a = matrix[0],
        b = matrix[1],
        c = matrix[2],
        d = matrix[3],
        tx = matrix[4],
        ty = matrix[5],
        originSplit = origin.split(" "),
        xOrigin = parseFloat(originSplit[0]) || 0,
        yOrigin = parseFloat(originSplit[1]) || 0,
        bounds,
        determinant,
        x,
        y;

    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }

    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }

    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px";

    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }

    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  },
      _parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new GSCache(target);

    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }

    var style = target.style,
        invertedScaleX = cache.scaleX < 0,
        px = "px",
        deg = "deg",
        origin = _getComputedProperty(target, _transformOriginProp) || "0",
        x,
        y,
        z,
        scaleX,
        scaleY,
        rotation,
        rotationX,
        rotationY,
        skewX,
        skewY,
        perspective,
        xOrigin,
        yOrigin,
        matrix,
        angle,
        cos,
        sin,
        a,
        b,
        c,
        d,
        a12,
        a22,
        t1,
        t2,
        t3,
        a13,
        a23,
        a33,
        a42,
        a43,
        a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    matrix = _getMatrix(target, cache.svg);

    if (cache.svg) {
      t1 = !cache.uncache && !uncache && target.getAttribute("data-svg-origin");

      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }

    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;

    if (matrix !== _identity2DMatrix) {
      a = matrix[0];
      b = matrix[1];
      c = matrix[2];
      d = matrix[3];
      x = a12 = matrix[4];
      y = a22 = matrix[5];

      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        }
      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        }

        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        }

        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }

        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }

        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }

      if (cache.svg) {
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }

    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }

    cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;

    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }

    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  },
      _firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  },
      _addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  },
      _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;

    _renderCSSTransforms(ratio, cache);
  },
      _zeroDeg = "0deg",
      _zeroPx = "0px",
      _endParenthesis = ") ",
      _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this,
        xPercent = _ref.xPercent,
        yPercent = _ref.yPercent,
        x = _ref.x,
        y = _ref.y,
        z = _ref.z,
        rotation = _ref.rotation,
        rotationY = _ref.rotationY,
        rotationX = _ref.rotationX,
        skewX = _ref.skewX,
        skewY = _ref.skewY,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        transformPerspective = _ref.transformPerspective,
        force3D = _ref.force3D,
        target = _ref.target,
        zOrigin = _ref.zOrigin,
        transforms = "",
        use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;

    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD,
          a13 = Math.sin(angle),
          a33 = Math.cos(angle),
          cos;

      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }

    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }

    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }

    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }

    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }

    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }

    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }

    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }

    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }

    target.style[_transformProp] = transforms || "translate(0, 0)";
  },
      _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this,
        xPercent = _ref2.xPercent,
        yPercent = _ref2.yPercent,
        x = _ref2.x,
        y = _ref2.y,
        rotation = _ref2.rotation,
        skewX = _ref2.skewX,
        skewY = _ref2.skewY,
        scaleX = _ref2.scaleX,
        scaleY = _ref2.scaleY,
        target = _ref2.target,
        xOrigin = _ref2.xOrigin,
        yOrigin = _ref2.yOrigin,
        xOffset = _ref2.xOffset,
        yOffset = _ref2.yOffset,
        forceCSS = _ref2.forceCSS,
        tx = parseFloat(x),
        ty = parseFloat(y),
        a11,
        a21,
        a12,
        a22,
        temp;

    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);

    if (skewY) {
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }

    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;

      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;

        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }

      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }

    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }

    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }

    if (xPercent || yPercent) {
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }

    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp);
  },
      _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
    var cap = 360,
        isString = _isString(endValue),
        endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
        change = relative ? endNum * relative : endNum - startNum,
        finalValue = startNum + change + "deg",
        direction,
        pt;

    if (isString) {
      direction = endValue.split("_")[1];

      if (direction === "short") {
        change %= cap;

        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }

      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum$1) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum$1) % cap - ~~(change / cap) * cap;
      }
    }

    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";

    plugin._props.push(property);

    return pt;
  },
      _assign = function _assign(target, source) {
    for (var p in source) {
      target[p] = source[p];
    }

    return target;
  },
      _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    var startCache = _assign({}, target._gsap),
        exclude = "perspective,force3D,transformOrigin,svgOrigin",
        style = target.style,
        endCache,
        p,
        startValue,
        endValue,
        startNum,
        endNum,
        startUnit,
        endUnit;

    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);

      _removeProperty(target, _transformProp);

      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }

    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];

      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;

        plugin._props.push(p);
      }
    }

    _assign(endCache, startCache);
  };

  _forEachName("padding,margin,Width,Radius", function (name, index) {
    var t = "Top",
        r = "Right",
        b = "Bottom",
        l = "Left",
        props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
      return index < 2 ? name + side : "border" + side + name;
    });

    _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
      var a, vars;

      if (arguments.length < 4) {
        a = props.map(function (prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }

      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function (prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });

  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
      var props = this._props,
          style = target.style,
          startAt = tween.vars.startAt,
          startValue,
          endValue,
          endNum,
          startNum,
          type,
          specialProp,
          p,
          startUnit,
          endUnit,
          relative,
          isTransformRelated,
          transformPropTween,
          cache,
          smooth,
          hasPriority;
      _pluginInitted || _initCore();

      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }

        endValue = vars[p];

        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }

        type = typeof endValue;
        specialProp = _specialProps[p];

        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }

        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }

        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;

          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }

          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            p in _config.units && !getUnit(startValue) && (startValue += _config.units[p]);
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }

          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);

          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }

              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }

            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }

          isTransformRelated = p in _transformProps;

          if (isTransformRelated) {
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }

            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              endValue = _convertKeywordsToPercentages(endValue);

              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }

              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);

              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);

              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }

          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;

            if (startUnit !== endUnit) {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, target[p], endValue, index, targets);
            } else {
              _missingPlugin(p, endValue);

              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, endValue);
          }

          props.push(p);
        }
      }

      hasPriority && _sortPropTweensByPriority(this);
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty: _removeProperty,
      _getMatrix: _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;

  (function (positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
      _transformProps[name] = 1;
    });

    _forEachName(rotation, function (name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });

    _propertyAliases[all[13]] = positionAndScale + "," + rotation;

    _forEachName(aliases, function (name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
    _config.units[name] = "px";
  });

  gsap.registerPlugin(CSSPlugin);

  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
      TweenMaxWithCSS = gsapWithCSS.core.Tween;

  exports.Back = Back;
  exports.Bounce = Bounce;
  exports.CSSPlugin = CSSPlugin;
  exports.Circ = Circ;
  exports.Cubic = Cubic;
  exports.Elastic = Elastic;
  exports.Expo = Expo;
  exports.Linear = Linear;
  exports.Power0 = Power0;
  exports.Power1 = Power1;
  exports.Power2 = Power2;
  exports.Power3 = Power3;
  exports.Power4 = Power4;
  exports.Quad = Quad;
  exports.Quart = Quart;
  exports.Quint = Quint;
  exports.Sine = Sine;
  exports.SteppedEase = SteppedEase;
  exports.Strong = Strong;
  exports.TimelineLite = Timeline;
  exports.TimelineMax = Timeline;
  exports.TweenLite = Tween;
  exports.TweenMax = TweenMaxWithCSS;
  exports.default = gsapWithCSS;
  exports.gsap = gsapWithCSS;

  if (typeof(window) === 'undefined' || window !== exports) {Object.defineProperty(exports, '__esModule', { value: true });} else {delete window.default;}

})));

},{}],3:[function(require,module,exports){
(function (global){(function (){
/*! p5.js v1.3.1 March 28, 2021 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).p5=e()}}(function(){return function i(a,s,l){function u(t,e){if(!s[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=s[t]={exports:{}};a[t][0].call(o.exports,function(e){return u(a[t][1][e]||e)},o,o.exports,i,a,s,l)}return s[t].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,t,r){"use strict";r.byteLength=function(e){var t=d(e),r=t[0],n=t[1];return 3*(r+n)/4-n},r.toByteArray=function(e){var t,r,n=d(e),o=n[0],i=n[1],a=new c(function(e,t){return 3*(e+t)/4-t}(o,i)),s=0,l=0<i?o-4:o;for(r=0;r<l;r+=4)t=u[e.charCodeAt(r)]<<18|u[e.charCodeAt(r+1)]<<12|u[e.charCodeAt(r+2)]<<6|u[e.charCodeAt(r+3)],a[s++]=t>>16&255,a[s++]=t>>8&255,a[s++]=255&t;2===i&&(t=u[e.charCodeAt(r)]<<2|u[e.charCodeAt(r+1)]>>4,a[s++]=255&t);1===i&&(t=u[e.charCodeAt(r)]<<10|u[e.charCodeAt(r+1)]<<4|u[e.charCodeAt(r+2)]>>2,a[s++]=t>>8&255,a[s++]=255&t);return a},r.fromByteArray=function(e){for(var t,r=e.length,n=r%3,o=[],i=0,a=r-n;i<a;i+=16383)o.push(l(e,i,a<i+16383?a:i+16383));1==n?(t=e[r-1],o.push(s[t>>2]+s[t<<4&63]+"==")):2==n&&(t=(e[r-2]<<8)+e[r-1],o.push(s[t>>10]+s[t>>4&63]+s[t<<2&63]+"="));return o.join("")};for(var s=[],u=[],c="undefined"!=typeof Uint8Array?Uint8Array:Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,i=n.length;o<i;++o)s[o]=n[o],u[n.charCodeAt(o)]=o;function d(e){var t=e.length;if(0<t%4)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}function l(e,t,r){for(var n,o,i=[],a=t;a<r;a+=3)n=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),i.push(s[(o=n)>>18&63]+s[o>>12&63]+s[o>>6&63]+s[63&o]);return i.join("")}u["-".charCodeAt(0)]=62,u["_".charCodeAt(0)]=63},{}],2:[function(e,t,r){},{}],3:[function(e,t,r){arguments[4][2][0].apply(r,arguments)},{dup:2}],4:[function(U,e,N){(function(d){"use strict";var n=U("base64-js"),i=U("ieee754"),e="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;N.Buffer=d,N.SlowBuffer=function(e){+e!=e&&(e=0);return d.alloc(+e)},N.INSPECT_MAX_BYTES=50;var r=2147483647;function a(e){if(r<e)throw new RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return Object.setPrototypeOf(t,d.prototype),t}function d(e,t,r){if("number"!=typeof e)return o(e,t,r);if("string"==typeof t)throw new TypeError('The "string" argument must be of type string. Received type number');return l(e)}function o(e,t,r){if("string"==typeof e)return function(e,t){"string"==typeof t&&""!==t||(t="utf8");if(!d.isEncoding(t))throw new TypeError("Unknown encoding: "+t);var r=0|f(e,t),n=a(r),o=n.write(e,t);o!==r&&(n=n.slice(0,o));return n}(e,t);if(ArrayBuffer.isView(e))return u(e);if(null==e)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(R(e,ArrayBuffer)||e&&R(e.buffer,ArrayBuffer))return function(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');var n;n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r);return Object.setPrototypeOf(n,d.prototype),n}(e,t,r);if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return d.from(n,t,r);var o=function(e){if(d.isBuffer(e)){var t=0|c(e.length),r=a(t);return 0===r.length||e.copy(r,0,0,t),r}if(void 0!==e.length)return"number"!=typeof e.length||D(e.length)?a(0):u(e);if("Buffer"===e.type&&Array.isArray(e.data))return u(e.data)}(e);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return d.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function s(e){if("number"!=typeof e)throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function l(e){return s(e),a(e<0?0:0|c(e))}function u(e){for(var t=e.length<0?0:0|c(e.length),r=a(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function c(e){if(r<=e)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+r.toString(16)+" bytes");return 0|e}function f(e,t){if(d.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||R(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=2<arguments.length&&!0===arguments[2];if(!n&&0===r)return 0;for(var o=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return P(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return k(e).length;default:if(o)return n?-1:P(e).length;t=(""+t).toLowerCase(),o=!0}}function h(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function p(e,t,r,n,o){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):2147483647<r?r=2147483647:r<-2147483648&&(r=-2147483648),D(r=+r)&&(r=o?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(o)return-1;r=e.length-1}else if(r<0){if(!o)return-1;r=0}if("string"==typeof t&&(t=d.from(t,n)),d.isBuffer(t))return 0===t.length?-1:y(e,t,r,n,o);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):y(e,[t],r,n,o);throw new TypeError("val must be string, number or Buffer")}function y(e,t,r,n,o){var i,a=1,s=e.length,l=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;s/=a=2,l/=2,r/=2}function u(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}if(o){var c=-1;for(i=r;i<s;i++)if(u(e,i)===u(t,-1===c?0:i-c)){if(-1===c&&(c=i),i-c+1===l)return c*a}else-1!==c&&(i-=i-c),c=-1}else for(s<r+l&&(r=s-l),i=r;0<=i;i--){for(var d=!0,f=0;f<l;f++)if(u(e,i+f)!==u(t,f)){d=!1;break}if(d)return i}return-1}function m(e,t,r,n){r=Number(r)||0;var o=e.length-r;n?o<(n=Number(n))&&(n=o):n=o;var i=t.length;i/2<n&&(n=i/2);for(var a=0;a<n;++a){var s=parseInt(t.substr(2*a,2),16);if(D(s))return a;e[r+a]=s}return a}function g(e,t,r,n){return A(function(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function v(e,t,r,n){return A(function(e,t){for(var r,n,o,i=[],a=0;a<e.length&&!((t-=2)<0);++a)r=e.charCodeAt(a),n=r>>8,o=r%256,i.push(o),i.push(n);return i}(t,e.length-r),e,r,n)}function b(e,t,r){return 0===t&&r===e.length?n.fromByteArray(e):n.fromByteArray(e.slice(t,r))}function _(e,t,r){r=Math.min(e.length,r);for(var n=[],o=t;o<r;){var i,a,s,l,u=e[o],c=null,d=239<u?4:223<u?3:191<u?2:1;if(o+d<=r)switch(d){case 1:u<128&&(c=u);break;case 2:128==(192&(i=e[o+1]))&&127<(l=(31&u)<<6|63&i)&&(c=l);break;case 3:i=e[o+1],a=e[o+2],128==(192&i)&&128==(192&a)&&2047<(l=(15&u)<<12|(63&i)<<6|63&a)&&(l<55296||57343<l)&&(c=l);break;case 4:i=e[o+1],a=e[o+2],s=e[o+3],128==(192&i)&&128==(192&a)&&128==(192&s)&&65535<(l=(15&u)<<18|(63&i)<<12|(63&a)<<6|63&s)&&l<1114112&&(c=l)}null===c?(c=65533,d=1):65535<c&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|1023&c),n.push(c),o+=d}return function(e){var t=e.length;if(t<=x)return String.fromCharCode.apply(String,e);var r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=x));return r}(n)}N.kMaxLength=r,(d.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}())||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(d.prototype,"parent",{enumerable:!0,get:function(){if(d.isBuffer(this))return this.buffer}}),Object.defineProperty(d.prototype,"offset",{enumerable:!0,get:function(){if(d.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&d[Symbol.species]===d&&Object.defineProperty(d,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),d.poolSize=8192,d.from=function(e,t,r){return o(e,t,r)},Object.setPrototypeOf(d.prototype,Uint8Array.prototype),Object.setPrototypeOf(d,Uint8Array),d.alloc=function(e,t,r){return o=t,i=r,s(n=e),n<=0?a(n):void 0!==o?"string"==typeof i?a(n).fill(o,i):a(n).fill(o):a(n);var n,o,i},d.allocUnsafe=function(e){return l(e)},d.allocUnsafeSlow=function(e){return l(e)},d.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==d.prototype},d.compare=function(e,t){if(R(e,Uint8Array)&&(e=d.from(e,e.offset,e.byteLength)),R(t,Uint8Array)&&(t=d.from(t,t.offset,t.byteLength)),!d.isBuffer(e)||!d.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,o=0,i=Math.min(r,n);o<i;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0},d.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},d.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return d.alloc(0);var r;if(void 0===t)for(r=t=0;r<e.length;++r)t+=e[r].length;var n=d.allocUnsafe(t),o=0;for(r=0;r<e.length;++r){var i=e[r];if(R(i,Uint8Array)&&(i=d.from(i)),!d.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,o),o+=i.length}return n},d.byteLength=f,d.prototype._isBuffer=!0,d.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)h(this,t,t+1);return this},d.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)h(this,t,t+3),h(this,t+1,t+2);return this},d.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)h(this,t,t+7),h(this,t+1,t+6),h(this,t+2,t+5),h(this,t+3,t+4);return this},d.prototype.toLocaleString=d.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?_(this,0,e):function(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e=e||"utf8";;)switch(e){case"hex":return j(this,t,r);case"utf8":case"utf-8":return _(this,t,r);case"ascii":return w(this,t,r);case"latin1":case"binary":return S(this,t,r);case"base64":return b(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return M(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}.apply(this,arguments)},d.prototype.equals=function(e){if(!d.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===d.compare(this,e)},d.prototype.inspect=function(){var e="",t=N.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},e&&(d.prototype[e]=d.prototype.inspect),d.prototype.compare=function(e,t,r,n,o){if(R(e,Uint8Array)&&(e=d.from(e,e.offset,e.byteLength)),!d.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),t<0||r>e.length||n<0||o>this.length)throw new RangeError("out of range index");if(o<=n&&r<=t)return 0;if(o<=n)return-1;if(r<=t)return 1;if(this===e)return 0;for(var i=(o>>>=0)-(n>>>=0),a=(r>>>=0)-(t>>>=0),s=Math.min(i,a),l=this.slice(n,o),u=e.slice(t,r),c=0;c<s;++c)if(l[c]!==u[c]){i=l[c],a=u[c];break}return i<a?-1:a<i?1:0},d.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},d.prototype.indexOf=function(e,t,r){return p(this,e,t,r,!0)},d.prototype.lastIndexOf=function(e,t,r){return p(this,e,t,r,!1)},d.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var o=this.length-t;if((void 0===r||o<r)&&(r=o),0<e.length&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n=n||"utf8";for(var i,a,s,l,u,c,d=!1;;)switch(n){case"hex":return m(this,e,t,r);case"utf8":case"utf-8":return u=t,c=r,A(P(e,(l=this).length-u),l,u,c);case"ascii":return g(this,e,t,r);case"latin1":case"binary":return g(this,e,t,r);case"base64":return i=this,a=t,s=r,A(k(e),i,a,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,e,t,r);default:if(d)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),d=!0}},d.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var x=4096;function w(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(127&e[o]);return n}function S(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(e[o]);return n}function j(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||n<r)&&(r=n);for(var o="",i=t;i<r;++i)o+=I[e[i]];return o}function M(e,t,r){for(var n=e.slice(t,r),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function E(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(r<e+t)throw new RangeError("Trying to access beyond buffer length")}function T(e,t,r,n,o,i){if(!d.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(o<t||t<i)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function O(e,t,r,n){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function C(e,t,r,n,o){return t=+t,r>>>=0,o||O(e,0,r,4),i.write(e,t,r,n,23,4),r+4}function L(e,t,r,n,o){return t=+t,r>>>=0,o||O(e,0,r,8),i.write(e,t,r,n,52,8),r+8}d.prototype.slice=function(e,t){var r=this.length;(e=~~e)<0?(e+=r)<0&&(e=0):r<e&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):r<t&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return Object.setPrototypeOf(n,d.prototype),n},d.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n},d.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var n=this[e+--t],o=1;0<t&&(o*=256);)n+=this[e+--t]*o;return n},d.prototype.readUInt8=function(e,t){return e>>>=0,t||E(e,1,this.length),this[e]},d.prototype.readUInt16LE=function(e,t){return e>>>=0,t||E(e,2,this.length),this[e]|this[e+1]<<8},d.prototype.readUInt16BE=function(e,t){return e>>>=0,t||E(e,2,this.length),this[e]<<8|this[e+1]},d.prototype.readUInt32LE=function(e,t){return e>>>=0,t||E(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},d.prototype.readUInt32BE=function(e,t){return e>>>=0,t||E(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},d.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return(o*=128)<=n&&(n-=Math.pow(2,8*t)),n},d.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||E(e,t,this.length);for(var n=t,o=1,i=this[e+--n];0<n&&(o*=256);)i+=this[e+--n]*o;return(o*=128)<=i&&(i-=Math.pow(2,8*t)),i},d.prototype.readInt8=function(e,t){return e>>>=0,t||E(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},d.prototype.readInt16LE=function(e,t){e>>>=0,t||E(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},d.prototype.readInt16BE=function(e,t){e>>>=0,t||E(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},d.prototype.readInt32LE=function(e,t){return e>>>=0,t||E(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},d.prototype.readInt32BE=function(e,t){return e>>>=0,t||E(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},d.prototype.readFloatLE=function(e,t){return e>>>=0,t||E(e,4,this.length),i.read(this,e,!0,23,4)},d.prototype.readFloatBE=function(e,t){return e>>>=0,t||E(e,4,this.length),i.read(this,e,!1,23,4)},d.prototype.readDoubleLE=function(e,t){return e>>>=0,t||E(e,8,this.length),i.read(this,e,!0,52,8)},d.prototype.readDoubleBE=function(e,t){return e>>>=0,t||E(e,8,this.length),i.read(this,e,!1,52,8)},d.prototype.writeUIntLE=function(e,t,r,n){e=+e,t>>>=0,r>>>=0,n||T(this,e,t,r,Math.pow(2,8*r)-1,0);var o=1,i=0;for(this[t]=255&e;++i<r&&(o*=256);)this[t+i]=e/o&255;return t+r},d.prototype.writeUIntBE=function(e,t,r,n){e=+e,t>>>=0,r>>>=0,n||T(this,e,t,r,Math.pow(2,8*r)-1,0);var o=r-1,i=1;for(this[t+o]=255&e;0<=--o&&(i*=256);)this[t+o]=e/i&255;return t+r},d.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,1,255,0),this[t]=255&e,t+1},d.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},d.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},d.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},d.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},d.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var o=Math.pow(2,8*r-1);T(this,e,t,r,o-1,-o)}var i=0,a=1,s=0;for(this[t]=255&e;++i<r&&(a*=256);)e<0&&0===s&&0!==this[t+i-1]&&(s=1),this[t+i]=(e/a>>0)-s&255;return t+r},d.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var o=Math.pow(2,8*r-1);T(this,e,t,r,o-1,-o)}var i=r-1,a=1,s=0;for(this[t+i]=255&e;0<=--i&&(a*=256);)e<0&&0===s&&0!==this[t+i+1]&&(s=1),this[t+i]=(e/a>>0)-s&255;return t+r},d.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},d.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},d.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},d.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},d.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||T(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},d.prototype.writeFloatLE=function(e,t,r){return C(this,e,t,!0,r)},d.prototype.writeFloatBE=function(e,t,r){return C(this,e,t,!1,r)},d.prototype.writeDoubleLE=function(e,t,r){return L(this,e,t,!0,r)},d.prototype.writeDoubleBE=function(e,t,r){return L(this,e,t,!1,r)},d.prototype.copy=function(e,t,r,n){if(!d.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r=r||0,n||0===n||(n=this.length),t>=e.length&&(t=e.length),t=t||0,0<n&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var o=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var i=o-1;0<=i;--i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return o},d.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!d.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===e.length){var o=e.charCodeAt(0);("utf8"===n&&o<128||"latin1"===n)&&(e=o)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var i;if(t>>>=0,r=void 0===r?this.length:r>>>0,"number"==typeof(e=e||0))for(i=t;i<r;++i)this[i]=e;else{var a=d.isBuffer(e)?e:d.from(e,n),s=a.length;if(0===s)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=a[i%s]}return this};var t=/[^+/0-9A-Za-z-_]/g;function P(e,t){var r;t=t||1/0;for(var n=e.length,o=null,i=[],a=0;a<n;++a){if(55295<(r=e.charCodeAt(a))&&r<57344){if(!o){if(56319<r){-1<(t-=3)&&i.push(239,191,189);continue}if(a+1===n){-1<(t-=3)&&i.push(239,191,189);continue}o=r;continue}if(r<56320){-1<(t-=3)&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&-1<(t-=3)&&i.push(239,191,189);if(o=null,r<128){if(--t<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function k(e){return n.toByteArray(function(e){if((e=(e=e.split("=")[0]).trim().replace(t,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function A(e,t,r,n){for(var o=0;o<n&&!(o+r>=t.length||o>=e.length);++o)t[o+r]=e[o];return o}function R(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function D(e){return e!=e}var I=function(){for(var e="0123456789abcdef",t=new Array(256),r=0;r<16;++r)for(var n=16*r,o=0;o<16;++o)t[n+o]=e[r]+e[o];return t}()}).call(this,U("buffer").Buffer)},{"base64-js":1,buffer:4,ieee754:233}],5:[function(e,t,r){t.exports=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e}},{}],6:[function(e,t,r){var n=e("../internals/is-object");t.exports=function(e){if(!n(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype");return e}},{"../internals/is-object":73}],7:[function(e,t,r){var n=e("../internals/well-known-symbol"),o=e("../internals/object-create"),i=e("../internals/object-define-property"),a=n("unscopables"),s=Array.prototype;null==s[a]&&i.f(s,a,{configurable:!0,value:o(null)}),t.exports=function(e){s[a][e]=!0}},{"../internals/object-create":89,"../internals/object-define-property":91,"../internals/well-known-symbol":145}],8:[function(e,t,r){"use strict";var n=e("../internals/string-multibyte").charAt;t.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},{"../internals/string-multibyte":122}],9:[function(e,t,r){t.exports=function(e,t,r){if(!(e instanceof t))throw TypeError("Incorrect "+(r?r+" ":"")+"invocation");return e}},{}],10:[function(e,t,r){var n=e("../internals/is-object");t.exports=function(e){if(!n(e))throw TypeError(String(e)+" is not an object");return e}},{"../internals/is-object":73}],11:[function(e,t,r){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},{}],12:[function(e,t,r){"use strict";function n(e){return l(e)&&u(L,c(e))}var o,i=e("../internals/array-buffer-native"),a=e("../internals/descriptors"),s=e("../internals/global"),l=e("../internals/is-object"),u=e("../internals/has"),c=e("../internals/classof"),d=e("../internals/create-non-enumerable-property"),f=e("../internals/redefine"),h=e("../internals/object-define-property").f,p=e("../internals/object-get-prototype-of"),y=e("../internals/object-set-prototype-of"),m=e("../internals/well-known-symbol"),g=e("../internals/uid"),v=s.Int8Array,b=v&&v.prototype,_=s.Uint8ClampedArray,x=_&&_.prototype,w=v&&p(v),S=b&&p(b),j=Object.prototype,M=j.isPrototypeOf,E=m("toStringTag"),T=g("TYPED_ARRAY_TAG"),O=i&&!!y&&"Opera"!==c(s.opera),C=!1,L={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8};for(o in L)s[o]||(O=!1);if((!O||"function"!=typeof w||w===Function.prototype)&&(w=function(){throw TypeError("Incorrect invocation")},O))for(o in L)s[o]&&y(s[o],w);if((!O||!S||S===j)&&(S=w.prototype,O))for(o in L)s[o]&&y(s[o].prototype,S);if(O&&p(x)!==S&&y(x,S),a&&!u(S,E))for(o in C=!0,h(S,E,{get:function(){return l(this)?this[T]:void 0}}),L)s[o]&&d(s[o],T,o);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:O,TYPED_ARRAY_TAG:C&&T,aTypedArray:function(e){if(n(e))return e;throw TypeError("Target is not a typed array")},aTypedArrayConstructor:function(e){if(y){if(M.call(w,e))return e}else for(var t in L)if(u(L,o)){var r=s[t];if(r&&(e===r||M.call(r,e)))return e}throw TypeError("Target is not a typed array constructor")},exportTypedArrayMethod:function(e,t,r){if(a){if(r)for(var n in L){var o=s[n];o&&u(o.prototype,e)&&delete o.prototype[e]}S[e]&&!r||f(S,e,r?t:O&&b[e]||t)}},exportTypedArrayStaticMethod:function(e,t,r){var n,o;if(a){if(y){if(r)for(n in L)(o=s[n])&&u(o,e)&&delete o[e];if(w[e]&&!r)return;try{return f(w,e,r?t:O&&v[e]||t)}catch(e){}}for(n in L)!(o=s[n])||o[e]&&!r||f(o,e,t)}},isView:function(e){var t=c(e);return"DataView"===t||u(L,t)},isTypedArray:n,TypedArray:w,TypedArrayPrototype:S}},{"../internals/array-buffer-native":11,"../internals/classof":29,"../internals/create-non-enumerable-property":37,"../internals/descriptors":42,"../internals/global":58,"../internals/has":59,"../internals/is-object":73,"../internals/object-define-property":91,"../internals/object-get-prototype-of":96,"../internals/object-set-prototype-of":100,"../internals/redefine":107,"../internals/uid":142,"../internals/well-known-symbol":145}],13:[function(e,t,r){"use strict";function n(e){return[255&e]}function o(e){return[255&e,e>>8&255]}function i(e){return[255&e,e>>8&255,e>>16&255,e>>24&255]}function a(e){return e[3]<<24|e[2]<<16|e[1]<<8|e[0]}function s(e){return V(e,23,4)}function l(e){return V(e,52,8)}function u(e,t){E(e[R],t,{get:function(){return L(this)[t]}})}function c(e,t,r,n){var o=x(r),i=L(e);if(o+t>i.byteLength)throw G(D);var a=L(i.buffer).bytes,s=o+i.byteOffset,l=a.slice(s,s+t);return n?l:l.reverse()}function d(e,t,r,n,o,i){var a=x(r),s=L(e);if(a+t>s.byteLength)throw G(D);for(var l=L(s.buffer).bytes,u=a+s.byteOffset,c=n(+o),d=0;d<t;d++)l[u+d]=c[i?d:t-d-1]}var f=e("../internals/global"),h=e("../internals/descriptors"),p=e("../internals/array-buffer-native"),y=e("../internals/create-non-enumerable-property"),m=e("../internals/redefine-all"),g=e("../internals/fails"),v=e("../internals/an-instance"),b=e("../internals/to-integer"),_=e("../internals/to-length"),x=e("../internals/to-index"),w=e("../internals/ieee754"),S=e("../internals/object-get-prototype-of"),j=e("../internals/object-set-prototype-of"),M=e("../internals/object-get-own-property-names").f,E=e("../internals/object-define-property").f,T=e("../internals/array-fill"),O=e("../internals/set-to-string-tag"),C=e("../internals/internal-state"),L=C.get,P=C.set,k="ArrayBuffer",A="DataView",R="prototype",D="Wrong index",I=f[k],U=I,N=f[A],F=N&&N[R],B=Object.prototype,G=f.RangeError,V=w.pack,z=w.unpack;if(p){if(!g(function(){I(1)})||!g(function(){new I(-1)})||g(function(){return new I,new I(1.5),new I(NaN),I.name!=k})){for(var H,q=(U=function(e){return v(this,U),new I(x(e))})[R]=I[R],W=M(I),X=0;W.length>X;)(H=W[X++])in U||y(U,H,I[H]);q.constructor=U}j&&S(F)!==B&&j(F,B);var Y=new N(new U(2)),Z=F.setInt8;Y.setInt8(0,2147483648),Y.setInt8(1,2147483649),!Y.getInt8(0)&&Y.getInt8(1)||m(F,{setInt8:function(e,t){Z.call(this,e,t<<24>>24)},setUint8:function(e,t){Z.call(this,e,t<<24>>24)}},{unsafe:!0})}else U=function(e){v(this,U,k);var t=x(e);P(this,{bytes:T.call(new Array(t),0),byteLength:t}),h||(this.byteLength=t)},N=function(e,t,r){v(this,N,A),v(e,U,A);var n=L(e).byteLength,o=b(t);if(o<0||n<o)throw G("Wrong offset");if(n<o+(r=void 0===r?n-o:_(r)))throw G("Wrong length");P(this,{buffer:e,byteLength:r,byteOffset:o}),h||(this.buffer=e,this.byteLength=r,this.byteOffset=o)},h&&(u(U,"byteLength"),u(N,"buffer"),u(N,"byteLength"),u(N,"byteOffset")),m(N[R],{getInt8:function(e){return c(this,1,e)[0]<<24>>24},getUint8:function(e){return c(this,1,e)[0]},getInt16:function(e,t){var r=c(this,2,e,1<arguments.length?t:void 0);return(r[1]<<8|r[0])<<16>>16},getUint16:function(e,t){var r=c(this,2,e,1<arguments.length?t:void 0);return r[1]<<8|r[0]},getInt32:function(e,t){return a(c(this,4,e,1<arguments.length?t:void 0))},getUint32:function(e,t){return a(c(this,4,e,1<arguments.length?t:void 0))>>>0},getFloat32:function(e,t){return z(c(this,4,e,1<arguments.length?t:void 0),23)},getFloat64:function(e,t){return z(c(this,8,e,1<arguments.length?t:void 0),52)},setInt8:function(e,t){d(this,1,e,n,t)},setUint8:function(e,t){d(this,1,e,n,t)},setInt16:function(e,t,r){d(this,2,e,o,t,2<arguments.length?r:void 0)},setUint16:function(e,t,r){d(this,2,e,o,t,2<arguments.length?r:void 0)},setInt32:function(e,t,r){d(this,4,e,i,t,2<arguments.length?r:void 0)},setUint32:function(e,t,r){d(this,4,e,i,t,2<arguments.length?r:void 0)},setFloat32:function(e,t,r){d(this,4,e,s,t,2<arguments.length?r:void 0)},setFloat64:function(e,t,r){d(this,8,e,l,t,2<arguments.length?r:void 0)}});O(U,k),O(N,A),t.exports={ArrayBuffer:U,DataView:N}},{"../internals/an-instance":9,"../internals/array-buffer-native":11,"../internals/array-fill":15,"../internals/create-non-enumerable-property":37,"../internals/descriptors":42,"../internals/fails":50,"../internals/global":58,"../internals/ieee754":64,"../internals/internal-state":69,"../internals/object-define-property":91,"../internals/object-get-own-property-names":94,"../internals/object-get-prototype-of":96,"../internals/object-set-prototype-of":100,"../internals/redefine-all":106,"../internals/set-to-string-tag":116,"../internals/to-index":130,"../internals/to-integer":132,"../internals/to-length":133}],14:[function(e,t,r){"use strict";var c=e("../internals/to-object"),d=e("../internals/to-absolute-index"),f=e("../internals/to-length"),h=Math.min;t.exports=[].copyWithin||function(e,t,r){var n=c(this),o=f(n.length),i=d(e,o),a=d(t,o),s=2<arguments.length?r:void 0,l=h((void 0===s?o:d(s,o))-a,o-i),u=1;for(a<i&&i<a+l&&(u=-1,a+=l-1,i+=l-1);0<l--;)a in n?n[i]=n[a]:delete n[i],i+=u,a+=u;return n}},{"../internals/to-absolute-index":129,"../internals/to-length":133,"../internals/to-object":134}],15:[function(e,t,r){"use strict";var u=e("../internals/to-object"),c=e("../internals/to-absolute-index"),d=e("../internals/to-length");t.exports=function(e,t,r){for(var n=u(this),o=d(n.length),i=arguments.length,a=c(1<i?t:void 0,o),s=2<i?r:void 0,l=void 0===s?o:c(s,o);a<l;)n[a++]=e;return n}},{"../internals/to-absolute-index":129,"../internals/to-length":133,"../internals/to-object":134}],16:[function(e,t,r){"use strict";var n=e("../internals/array-iteration").forEach,o=e("../internals/array-method-is-strict"),i=e("../internals/array-method-uses-to-length"),a=o("forEach"),s=i("forEach");t.exports=a&&s?[].forEach:function(e,t){return n(this,e,1<arguments.length?t:void 0)}},{"../internals/array-iteration":19,"../internals/array-method-is-strict":22,"../internals/array-method-uses-to-length":23}],17:[function(e,t,r){"use strict";var m=e("../internals/function-bind-context"),g=e("../internals/to-object"),v=e("../internals/call-with-safe-iteration-closing"),b=e("../internals/is-array-iterator-method"),_=e("../internals/to-length"),x=e("../internals/create-property"),w=e("../internals/get-iterator-method");t.exports=function(e,t,r){var n,o,i,a,s,l,u=g(e),c="function"==typeof this?this:Array,d=arguments.length,f=1<d?t:void 0,h=void 0!==f,p=w(u),y=0;if(h&&(f=m(f,2<d?r:void 0,2)),null==p||c==Array&&b(p))for(o=new c(n=_(u.length));y<n;y++)l=h?f(u[y],y):u[y],x(o,y,l);else for(s=(a=p.call(u)).next,o=new c;!(i=s.call(a)).done;y++)l=h?v(a,f,[i.value,y],!0):i.value,x(o,y,l);return o.length=y,o}},{"../internals/call-with-safe-iteration-closing":26,"../internals/create-property":39,"../internals/function-bind-context":53,"../internals/get-iterator-method":56,"../internals/is-array-iterator-method":70,"../internals/to-length":133,"../internals/to-object":134}],18:[function(e,t,r){function n(s){return function(e,t,r){var n,o=l(e),i=u(o.length),a=c(r,i);if(s&&t!=t){for(;a<i;)if((n=o[a++])!=n)return!0}else for(;a<i;a++)if((s||a in o)&&o[a]===t)return s||a||0;return!s&&-1}}var l=e("../internals/to-indexed-object"),u=e("../internals/to-length"),c=e("../internals/to-absolute-index");t.exports={includes:n(!0),indexOf:n(!1)}},{"../internals/to-absolute-index":129,"../internals/to-indexed-object":131,"../internals/to-length":133}],19:[function(e,t,r){function n(h){var p=1==h,y=2==h,m=3==h,g=4==h,v=6==h,b=5==h||v;return function(e,t,r,n){for(var o,i,a=w(e),s=x(a),l=_(t,r,3),u=S(s.length),c=0,d=n||j,f=p?d(e,u):y?d(e,0):void 0;c<u;c++)if((b||c in s)&&(i=l(o=s[c],c,a),h))if(p)f[c]=i;else if(i)switch(h){case 3:return!0;case 5:return o;case 6:return c;case 2:M.call(f,o)}else if(g)return!1;return v?-1:m||g?g:f}}var _=e("../internals/function-bind-context"),x=e("../internals/indexed-object"),w=e("../internals/to-object"),S=e("../internals/to-length"),j=e("../internals/array-species-create"),M=[].push;t.exports={forEach:n(0),map:n(1),filter:n(2),some:n(3),every:n(4),find:n(5),findIndex:n(6)}},{"../internals/array-species-create":25,"../internals/function-bind-context":53,"../internals/indexed-object":65,"../internals/to-length":133,"../internals/to-object":134}],20:[function(e,t,r){"use strict";var i=e("../internals/to-indexed-object"),a=e("../internals/to-integer"),s=e("../internals/to-length"),n=e("../internals/array-method-is-strict"),o=e("../internals/array-method-uses-to-length"),l=Math.min,u=[].lastIndexOf,c=!!u&&1/[1].lastIndexOf(1,-0)<0,d=n("lastIndexOf"),f=o("indexOf",{ACCESSORS:!0,1:0}),h=c||!d||!f;t.exports=h?function(e,t){if(c)return u.apply(this,arguments)||0;var r=i(this),n=s(r.length),o=n-1;for(1<arguments.length&&(o=l(o,a(t))),o<0&&(o=n+o);0<=o;o--)if(o in r&&r[o]===e)return o||0;return-1}:u},{"../internals/array-method-is-strict":22,"../internals/array-method-uses-to-length":23,"../internals/to-indexed-object":131,"../internals/to-integer":132,"../internals/to-length":133}],21:[function(e,t,r){var n=e("../internals/fails"),o=e("../internals/well-known-symbol"),i=e("../internals/engine-v8-version"),a=o("species");t.exports=function(t){return 51<=i||!n(function(){var e=[];return(e.constructor={})[a]=function(){return{foo:1}},1!==e[t](Boolean).foo})}},{"../internals/engine-v8-version":47,"../internals/fails":50,"../internals/well-known-symbol":145}],22:[function(e,t,r){"use strict";var n=e("../internals/fails");t.exports=function(e,t){var r=[][e];return!!r&&n(function(){r.call(null,t||function(){throw 1},1)})}},{"../internals/fails":50}],23:[function(e,t,r){function a(e){throw e}var s=e("../internals/descriptors"),l=e("../internals/fails"),u=e("../internals/has"),c=Object.defineProperty,d={};t.exports=function(e,t){if(u(d,e))return d[e];var r=[][e],n=!!u(t=t||{},"ACCESSORS")&&t.ACCESSORS,o=u(t,0)?t[0]:a,i=u(t,1)?t[1]:void 0;return d[e]=!!r&&!l(function(){if(n&&!s)return!0;var e={length:-1};n?c(e,1,{enumerable:!0,get:a}):e[1]=1,r.call(e,o,i)})}},{"../internals/descriptors":42,"../internals/fails":50,"../internals/has":59}],24:[function(e,t,r){function n(u){return function(e,t,r,n){c(t);var o=d(e),i=f(o),a=h(o.length),s=u?a-1:0,l=u?-1:1;if(r<2)for(;;){if(s in i){n=i[s],s+=l;break}if(s+=l,u?s<0:a<=s)throw TypeError("Reduce of empty array with no initial value")}for(;u?0<=s:s<a;s+=l)s in i&&(n=t(n,i[s],s,o));return n}}var c=e("../internals/a-function"),d=e("../internals/to-object"),f=e("../internals/indexed-object"),h=e("../internals/to-length");t.exports={left:n(!1),right:n(!0)}},{"../internals/a-function":5,"../internals/indexed-object":65,"../internals/to-length":133,"../internals/to-object":134}],25:[function(e,t,r){var n=e("../internals/is-object"),o=e("../internals/is-array"),i=e("../internals/well-known-symbol")("species");t.exports=function(e,t){var r;return o(e)&&("function"!=typeof(r=e.constructor)||r!==Array&&!o(r.prototype)?n(r)&&null===(r=r[i])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===t?0:t)}},{"../internals/is-array":71,"../internals/is-object":73,"../internals/well-known-symbol":145}],26:[function(e,t,r){var i=e("../internals/an-object");t.exports=function(t,e,r,n){try{return n?e(i(r)[0],r[1]):e(r)}catch(e){var o=t.return;throw void 0!==o&&i(o.call(t)),e}}},{"../internals/an-object":10}],27:[function(e,t,r){var o=e("../internals/well-known-symbol")("iterator"),i=!1;try{var n=0,a={next:function(){return{done:!!n++}},return:function(){i=!0}};a[o]=function(){return this},Array.from(a,function(){throw 2})}catch(e){}t.exports=function(e,t){if(!t&&!i)return!1;var r=!1;try{var n={};n[o]=function(){return{next:function(){return{done:r=!0}}}},e(n)}catch(e){}return r}},{"../internals/well-known-symbol":145}],28:[function(e,t,r){var n={}.toString;t.exports=function(e){return n.call(e).slice(8,-1)}},{}],29:[function(e,t,r){var n=e("../internals/to-string-tag-support"),o=e("../internals/classof-raw"),i=e("../internals/well-known-symbol")("toStringTag"),a="Arguments"==o(function(){return arguments}());t.exports=n?o:function(e){var t,r,n;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),i))?r:a?o(t):"Object"==(n=o(t))&&"function"==typeof t.callee?"Arguments":n}},{"../internals/classof-raw":28,"../internals/to-string-tag-support":138,"../internals/well-known-symbol":145}],30:[function(e,t,r){"use strict";var u=e("../internals/object-define-property").f,c=e("../internals/object-create"),d=e("../internals/redefine-all"),f=e("../internals/function-bind-context"),h=e("../internals/an-instance"),p=e("../internals/iterate"),a=e("../internals/define-iterator"),s=e("../internals/set-species"),y=e("../internals/descriptors"),m=e("../internals/internal-metadata").fastKey,n=e("../internals/internal-state"),g=n.set,v=n.getterFor;t.exports={getConstructor:function(e,r,n,o){function i(e,t,r){var n,o,i=s(e),a=l(e,t);return a?a.value=r:(i.last=a={index:o=m(t,!0),key:t,value:r,previous:n=i.last,next:void 0,removed:!1},i.first||(i.first=a),n&&(n.next=a),y?i.size++:e.size++,"F"!==o&&(i.index[o]=a)),e}var a=e(function(e,t){h(e,a,r),g(e,{type:r,index:c(null),first:void 0,last:void 0,size:0}),y||(e.size=0),null!=t&&p(t,e[o],e,n)}),s=v(r),l=function(e,t){var r,n=s(e),o=m(t);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==t)return r};return d(a.prototype,{clear:function(){for(var e=s(this),t=e.index,r=e.first;r;)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete t[r.index],r=r.next;e.first=e.last=void 0,y?e.size=0:this.size=0},delete:function(e){var t=s(this),r=l(this,e);if(r){var n=r.next,o=r.previous;delete t.index[r.index],r.removed=!0,o&&(o.next=n),n&&(n.previous=o),t.first==r&&(t.first=n),t.last==r&&(t.last=o),y?t.size--:this.size--}return!!r},forEach:function(e,t){for(var r,n=s(this),o=f(e,1<arguments.length?t:void 0,3);r=r?r.next:n.first;)for(o(r.value,r.key,this);r&&r.removed;)r=r.previous},has:function(e){return!!l(this,e)}}),d(a.prototype,n?{get:function(e){var t=l(this,e);return t&&t.value},set:function(e,t){return i(this,0===e?0:e,t)}}:{add:function(e){return i(this,e=0===e?0:e,e)}}),y&&u(a.prototype,"size",{get:function(){return s(this).size}}),a},setStrong:function(e,t,r){var n=t+" Iterator",o=v(t),i=v(n);a(e,t,function(e,t){g(this,{type:n,target:e,state:o(e),kind:t,last:void 0})},function(){for(var e=i(this),t=e.kind,r=e.last;r&&r.removed;)r=r.previous;return e.target&&(e.last=r=r?r.next:e.state.first)?"keys"==t?{value:r.key,done:!1}:"values"==t?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:{value:e.target=void 0,done:!0}},r?"entries":"values",!r,!0),s(t)}}},{"../internals/an-instance":9,"../internals/define-iterator":40,"../internals/descriptors":42,"../internals/function-bind-context":53,"../internals/internal-metadata":68,"../internals/internal-state":69,"../internals/iterate":76,"../internals/object-create":89,"../internals/object-define-property":91,"../internals/redefine-all":106,"../internals/set-species":115}],31:[function(e,t,r){"use strict";var m=e("../internals/export"),g=e("../internals/global"),v=e("../internals/is-forced"),b=e("../internals/redefine"),_=e("../internals/internal-metadata"),x=e("../internals/iterate"),w=e("../internals/an-instance"),S=e("../internals/is-object"),j=e("../internals/fails"),M=e("../internals/check-correctness-of-iteration"),E=e("../internals/set-to-string-tag"),T=e("../internals/inherit-if-required");t.exports=function(n,e,t){function r(e){var r=l[e];b(l,e,"add"==e?function(e){return r.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(i&&!S(e))&&r.call(this,0===e?0:e)}:"get"==e?function(e){return i&&!S(e)?void 0:r.call(this,0===e?0:e)}:"has"==e?function(e){return!(i&&!S(e))&&r.call(this,0===e?0:e)}:function(e,t){return r.call(this,0===e?0:e,t),this})}var o=-1!==n.indexOf("Map"),i=-1!==n.indexOf("Weak"),a=o?"set":"add",s=g[n],l=s&&s.prototype,u=s,c={};if(v(n,"function"!=typeof s||!(i||l.forEach&&!j(function(){(new s).entries().next()}))))u=t.getConstructor(e,n,o,a),_.REQUIRED=!0;else if(v(n,!0)){var d=new u,f=d[a](i?{}:-0,1)!=d,h=j(function(){d.has(1)}),p=M(function(e){new s(e)}),y=!i&&j(function(){for(var e=new s,t=5;t--;)e[a](t,t);return!e.has(-0)});p||(((u=e(function(e,t){w(e,u,n);var r=T(new s,e,u);return null!=t&&x(t,r[a],r,o),r})).prototype=l).constructor=u),(h||y)&&(r("delete"),r("has"),o&&r("get")),(y||f)&&r(a),i&&l.clear&&delete l.clear}return c[n]=u,m({global:!0,forced:u!=s},c),E(u,n),i||t.setStrong(u,n,o),u}},{"../internals/an-instance":9,"../internals/check-correctness-of-iteration":27,"../internals/export":49,"../internals/fails":50,"../internals/global":58,"../internals/inherit-if-required":66,"../internals/internal-metadata":68,"../internals/is-forced":72,"../internals/is-object":73,"../internals/iterate":76,"../internals/redefine":107,"../internals/set-to-string-tag":116}],32:[function(e,t,r){var s=e("../internals/has"),l=e("../internals/own-keys"),u=e("../internals/object-get-own-property-descriptor"),c=e("../internals/object-define-property");t.exports=function(e,t){for(var r=l(t),n=c.f,o=u.f,i=0;i<r.length;i++){var a=r[i];s(e,a)||n(e,a,o(t,a))}}},{"../internals/has":59,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/own-keys":102}],33:[function(e,t,r){var n=e("../internals/well-known-symbol")("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[n]=!1,"/./"[t](r)}catch(e){}}return!1}},{"../internals/well-known-symbol":145}],34:[function(e,t,r){var n=e("../internals/fails");t.exports=!n(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})},{"../internals/fails":50}],35:[function(e,t,r){var a=e("../internals/require-object-coercible"),s=/"/g;t.exports=function(e,t,r,n){var o=String(a(e)),i="<"+t;return""!==r&&(i+=" "+r+'="'+String(n).replace(s,"&quot;")+'"'),i+">"+o+"</"+t+">"}},{"../internals/require-object-coercible":112}],36:[function(e,t,r){"use strict";function o(){return this}var i=e("../internals/iterators-core").IteratorPrototype,a=e("../internals/object-create"),s=e("../internals/create-property-descriptor"),l=e("../internals/set-to-string-tag"),u=e("../internals/iterators");t.exports=function(e,t,r){var n=t+" Iterator";return e.prototype=a(i,{next:s(1,r)}),l(e,n,!1,!0),u[n]=o,e}},{"../internals/create-property-descriptor":38,"../internals/iterators":78,"../internals/iterators-core":77,"../internals/object-create":89,"../internals/set-to-string-tag":116}],37:[function(e,t,r){var n=e("../internals/descriptors"),o=e("../internals/object-define-property"),i=e("../internals/create-property-descriptor");t.exports=n?function(e,t,r){return o.f(e,t,i(1,r))}:function(e,t,r){return e[t]=r,e}},{"../internals/create-property-descriptor":38,"../internals/descriptors":42,"../internals/object-define-property":91}],38:[function(e,t,r){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],39:[function(e,t,r){"use strict";var o=e("../internals/to-primitive"),i=e("../internals/object-define-property"),a=e("../internals/create-property-descriptor");t.exports=function(e,t,r){var n=o(t);n in e?i.f(e,n,a(0,r)):e[n]=r}},{"../internals/create-property-descriptor":38,"../internals/object-define-property":91,"../internals/to-primitive":137}],40:[function(e,t,r){"use strict";function g(){return this}var v=e("../internals/export"),b=e("../internals/create-iterator-constructor"),_=e("../internals/object-get-prototype-of"),x=e("../internals/object-set-prototype-of"),w=e("../internals/set-to-string-tag"),S=e("../internals/create-non-enumerable-property"),j=e("../internals/redefine"),n=e("../internals/well-known-symbol"),M=e("../internals/is-pure"),E=e("../internals/iterators"),o=e("../internals/iterators-core"),T=o.IteratorPrototype,O=o.BUGGY_SAFARI_ITERATORS,C=n("iterator"),L="values",P="entries";t.exports=function(e,t,r,n,o,i,a){b(r,t,n);function s(e){if(e===o&&y)return y;if(!O&&e in h)return h[e];switch(e){case"keys":case L:case P:return function(){return new r(this,e)}}return function(){return new r(this)}}var l,u,c,d=t+" Iterator",f=!1,h=e.prototype,p=h[C]||h["@@iterator"]||o&&h[o],y=!O&&p||s(o),m="Array"==t&&h.entries||p;if(m&&(l=_(m.call(new e)),T!==Object.prototype&&l.next&&(M||_(l)===T||(x?x(l,T):"function"!=typeof l[C]&&S(l,C,g)),w(l,d,!0,!0),M&&(E[d]=g))),o==L&&p&&p.name!==L&&(f=!0,y=function(){return p.call(this)}),M&&!a||h[C]===y||S(h,C,y),E[t]=y,o)if(u={values:s(L),keys:i?y:s("keys"),entries:s(P)},a)for(c in u)!O&&!f&&c in h||j(h,c,u[c]);else v({target:t,proto:!0,forced:O||f},u);return u}},{"../internals/create-iterator-constructor":36,"../internals/create-non-enumerable-property":37,"../internals/export":49,"../internals/is-pure":74,"../internals/iterators":78,"../internals/iterators-core":77,"../internals/object-get-prototype-of":96,"../internals/object-set-prototype-of":100,"../internals/redefine":107,"../internals/set-to-string-tag":116,"../internals/well-known-symbol":145}],41:[function(e,t,r){var n=e("../internals/path"),o=e("../internals/has"),i=e("../internals/well-known-symbol-wrapped"),a=e("../internals/object-define-property").f;t.exports=function(e){var t=n.Symbol||(n.Symbol={});o(t,e)||a(t,e,{value:i.f(e)})}},{"../internals/has":59,"../internals/object-define-property":91,"../internals/path":103,"../internals/well-known-symbol-wrapped":144}],42:[function(e,t,r){var n=e("../internals/fails");t.exports=!n(function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})},{"../internals/fails":50}],43:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/is-object"),i=n.document,a=o(i)&&o(i.createElement);t.exports=function(e){return a?i.createElement(e):{}}},{"../internals/global":58,"../internals/is-object":73}],44:[function(e,t,r){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},{}],45:[function(e,t,r){var n=e("../internals/engine-user-agent");t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(n)},{"../internals/engine-user-agent":46}],46:[function(e,t,r){var n=e("../internals/get-built-in");t.exports=n("navigator","userAgent")||""},{"../internals/get-built-in":55}],47:[function(e,t,r){var n,o,i=e("../internals/global"),a=e("../internals/engine-user-agent"),s=i.process,l=s&&s.versions,u=l&&l.v8;u?o=(n=u.split("."))[0]+n[1]:a&&(!(n=a.match(/Edge\/(\d+)/))||74<=n[1])&&(n=a.match(/Chrome\/(\d+)/))&&(o=n[1]),t.exports=o&&+o},{"../internals/engine-user-agent":46,"../internals/global":58}],48:[function(e,t,r){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},{}],49:[function(e,t,r){var c=e("../internals/global"),d=e("../internals/object-get-own-property-descriptor").f,f=e("../internals/create-non-enumerable-property"),h=e("../internals/redefine"),p=e("../internals/set-global"),y=e("../internals/copy-constructor-properties"),m=e("../internals/is-forced");t.exports=function(e,t){var r,n,o,i,a,s=e.target,l=e.global,u=e.stat;if(r=l?c:u?c[s]||p(s,{}):(c[s]||{}).prototype)for(n in t){if(i=t[n],o=e.noTargetGet?(a=d(r,n))&&a.value:r[n],!m(l?n:s+(u?".":"#")+n,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;y(i,o)}(e.sham||o&&o.sham)&&f(i,"sham",!0),h(r,n,i,e)}}},{"../internals/copy-constructor-properties":32,"../internals/create-non-enumerable-property":37,"../internals/global":58,"../internals/is-forced":72,"../internals/object-get-own-property-descriptor":92,"../internals/redefine":107,"../internals/set-global":114}],50:[function(e,t,r){t.exports=function(e){try{return!!e()}catch(e){return!0}}},{}],51:[function(e,t,r){"use strict";e("../modules/es.regexp.exec");var d=e("../internals/redefine"),f=e("../internals/fails"),h=e("../internals/well-known-symbol"),p=e("../internals/regexp-exec"),y=e("../internals/create-non-enumerable-property"),m=h("species"),g=!f(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),v="$0"==="a".replace(/./,"$0"),n=h("replace"),b=!!/./[n]&&""===/./[n]("a","$0"),_=!f(function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]});t.exports=function(r,e,t,n){var o=h(r),i=!f(function(){var e={};return e[o]=function(){return 7},7!=""[r](e)}),a=i&&!f(function(){var e=!1,t=/a/;return"split"===r&&((t={constructor:{}}).constructor[m]=function(){return t},t.flags="",t[o]=/./[o]),t.exec=function(){return e=!0,null},t[o](""),!e});if(!i||!a||"replace"===r&&(!g||!v||b)||"split"===r&&!_){var s=/./[o],l=t(o,""[r],function(e,t,r,n,o){return t.exec===p?i&&!o?{done:!0,value:s.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}},{REPLACE_KEEPS_$0:v,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:b}),u=l[0],c=l[1];d(String.prototype,r,u),d(RegExp.prototype,o,2==e?function(e,t){return c.call(e,this,t)}:function(e){return c.call(e,this)})}n&&y(RegExp.prototype[o],"sham",!0)}},{"../internals/create-non-enumerable-property":37,"../internals/fails":50,"../internals/redefine":107,"../internals/regexp-exec":109,"../internals/well-known-symbol":145,"../modules/es.regexp.exec":178}],52:[function(e,t,r){var n=e("../internals/fails");t.exports=!n(function(){return Object.isExtensible(Object.preventExtensions({}))})},{"../internals/fails":50}],53:[function(e,t,r){var i=e("../internals/a-function");t.exports=function(n,o,e){if(i(n),void 0===o)return n;switch(e){case 0:return function(){return n.call(o)};case 1:return function(e){return n.call(o,e)};case 2:return function(e,t){return n.call(o,e,t)};case 3:return function(e,t,r){return n.call(o,e,t,r)}}return function(){return n.apply(o,arguments)}}},{"../internals/a-function":5}],54:[function(e,t,r){"use strict";var i=e("../internals/a-function"),a=e("../internals/is-object"),s=[].slice,l={};t.exports=Function.bind||function(t){var r=i(this),n=s.call(arguments,1),o=function(){var e=n.concat(s.call(arguments));return this instanceof o?function(e,t,r){if(!(t in l)){for(var n=[],o=0;o<t;o++)n[o]="a["+o+"]";l[t]=Function("C,a","return new C("+n.join(",")+")")}return l[t](e,r)}(r,e.length,e):r.apply(t,e)};return a(r.prototype)&&(o.prototype=r.prototype),o}},{"../internals/a-function":5,"../internals/is-object":73}],55:[function(e,t,r){function n(e){return"function"==typeof e?e:void 0}var o=e("../internals/path"),i=e("../internals/global");t.exports=function(e,t){return arguments.length<2?n(o[e])||n(i[e]):o[e]&&o[e][t]||i[e]&&i[e][t]}},{"../internals/global":58,"../internals/path":103}],56:[function(e,t,r){var n=e("../internals/classof"),o=e("../internals/iterators"),i=e("../internals/well-known-symbol")("iterator");t.exports=function(e){if(null!=e)return e[i]||e["@@iterator"]||o[n(e)]}},{"../internals/classof":29,"../internals/iterators":78,"../internals/well-known-symbol":145}],57:[function(e,t,r){var n=e("../internals/an-object"),o=e("../internals/get-iterator-method");t.exports=function(e){var t=o(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return n(t.call(e))}},{"../internals/an-object":10,"../internals/get-iterator-method":56}],58:[function(e,r,t){(function(e){function t(e){return e&&e.Math==Math&&e}r.exports=t("object"==typeof globalThis&&globalThis)||t("object"==typeof window&&window)||t("object"==typeof self&&self)||t("object"==typeof e&&e)||Function("return this")()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],59:[function(e,t,r){var n={}.hasOwnProperty;t.exports=function(e,t){return n.call(e,t)}},{}],60:[function(e,t,r){t.exports={}},{}],61:[function(e,t,r){var n=e("../internals/global");t.exports=function(e,t){var r=n.console;r&&r.error&&(1===arguments.length?r.error(e):r.error(e,t))}},{"../internals/global":58}],62:[function(e,t,r){var n=e("../internals/get-built-in");t.exports=n("document","documentElement")},{"../internals/get-built-in":55}],63:[function(e,t,r){var n=e("../internals/descriptors"),o=e("../internals/fails"),i=e("../internals/document-create-element");t.exports=!n&&!o(function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a})},{"../internals/descriptors":42,"../internals/document-create-element":43,"../internals/fails":50}],64:[function(e,t,r){var h=Math.abs,p=Math.pow,y=Math.floor,m=Math.log,g=Math.LN2;t.exports={pack:function(e,t,r){var n,o,i,a=new Array(r),s=8*r-t-1,l=(1<<s)-1,u=l>>1,c=23===t?p(2,-24)-p(2,-77):0,d=e<0||0===e&&1/e<0?1:0,f=0;for((e=h(e))!=e||e===1/0?(o=e!=e?1:0,n=l):(n=y(m(e)/g),e*(i=p(2,-n))<1&&(n--,i*=2),2<=(e+=1<=n+u?c/i:c*p(2,1-u))*i&&(n++,i/=2),l<=n+u?(o=0,n=l):1<=n+u?(o=(e*i-1)*p(2,t),n+=u):(o=e*p(2,u-1)*p(2,t),n=0));8<=t;a[f++]=255&o,o/=256,t-=8);for(n=n<<t|o,s+=t;0<s;a[f++]=255&n,n/=256,s-=8);return a[--f]|=128*d,a},unpack:function(e,t){var r,n=e.length,o=8*n-t-1,i=(1<<o)-1,a=i>>1,s=o-7,l=n-1,u=e[l--],c=127&u;for(u>>=7;0<s;c=256*c+e[l],l--,s-=8);for(r=c&(1<<-s)-1,c>>=-s,s+=t;0<s;r=256*r+e[l],l--,s-=8);if(0===c)c=1-a;else{if(c===i)return r?NaN:u?-1/0:1/0;r+=p(2,t),c-=a}return(u?-1:1)*r*p(2,c-t)}}},{}],65:[function(e,t,r){var n=e("../internals/fails"),o=e("../internals/classof-raw"),i="".split;t.exports=n(function(){return!Object("z").propertyIsEnumerable(0)})?function(e){return"String"==o(e)?i.call(e,""):Object(e)}:Object},{"../internals/classof-raw":28,"../internals/fails":50}],66:[function(e,t,r){var i=e("../internals/is-object"),a=e("../internals/object-set-prototype-of");t.exports=function(e,t,r){var n,o;return a&&"function"==typeof(n=t.constructor)&&n!==r&&i(o=n.prototype)&&o!==r.prototype&&a(e,o),e}},{"../internals/is-object":73,"../internals/object-set-prototype-of":100}],67:[function(e,t,r){var n=e("../internals/shared-store"),o=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(e){return o.call(e)}),t.exports=n.inspectSource},{"../internals/shared-store":118}],68:[function(e,t,r){function n(e){s(e,c,{value:{objectID:"O"+ ++d,weakData:{}}})}var o=e("../internals/hidden-keys"),i=e("../internals/is-object"),a=e("../internals/has"),s=e("../internals/object-define-property").f,l=e("../internals/uid"),u=e("../internals/freezing"),c=l("meta"),d=0,f=Object.isExtensible||function(){return!0},h=t.exports={REQUIRED:!1,fastKey:function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,c)){if(!f(e))return"F";if(!t)return"E";n(e)}return e[c].objectID},getWeakData:function(e,t){if(!a(e,c)){if(!f(e))return!0;if(!t)return!1;n(e)}return e[c].weakData},onFreeze:function(e){return u&&h.REQUIRED&&f(e)&&!a(e,c)&&n(e),e}};o[c]=!0},{"../internals/freezing":52,"../internals/has":59,"../internals/hidden-keys":60,"../internals/is-object":73,"../internals/object-define-property":91,"../internals/uid":142}],69:[function(e,t,r){var n,o,i,a=e("../internals/native-weak-map"),s=e("../internals/global"),l=e("../internals/is-object"),u=e("../internals/create-non-enumerable-property"),c=e("../internals/has"),d=e("../internals/shared-key"),f=e("../internals/hidden-keys"),h=s.WeakMap;if(a){var p=new h,y=p.get,m=p.has,g=p.set;n=function(e,t){return g.call(p,e,t),t},o=function(e){return y.call(p,e)||{}},i=function(e){return m.call(p,e)}}else{var v=d("state");f[v]=!0,n=function(e,t){return u(e,v,t),t},o=function(e){return c(e,v)?e[v]:{}},i=function(e){return c(e,v)}}t.exports={set:n,get:o,has:i,enforce:function(e){return i(e)?o(e):n(e,{})},getterFor:function(r){return function(e){var t;if(!l(e)||(t=o(e)).type!==r)throw TypeError("Incompatible receiver, "+r+" required");return t}}}},{"../internals/create-non-enumerable-property":37,"../internals/global":58,"../internals/has":59,"../internals/hidden-keys":60,"../internals/is-object":73,"../internals/native-weak-map":84,"../internals/shared-key":117}],70:[function(e,t,r){var n=e("../internals/well-known-symbol"),o=e("../internals/iterators"),i=n("iterator"),a=Array.prototype;t.exports=function(e){return void 0!==e&&(o.Array===e||a[i]===e)}},{"../internals/iterators":78,"../internals/well-known-symbol":145}],71:[function(e,t,r){var n=e("../internals/classof-raw");t.exports=Array.isArray||function(e){return"Array"==n(e)}},{"../internals/classof-raw":28}],72:[function(e,t,r){function n(e,t){var r=s[a(e)];return r==u||r!=l&&("function"==typeof t?o(t):!!t)}var o=e("../internals/fails"),i=/#|\.prototype\./,a=n.normalize=function(e){return String(e).replace(i,".").toLowerCase()},s=n.data={},l=n.NATIVE="N",u=n.POLYFILL="P";t.exports=n},{"../internals/fails":50}],73:[function(e,t,r){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],74:[function(e,t,r){t.exports=!1},{}],75:[function(e,t,r){var n=e("../internals/is-object"),o=e("../internals/classof-raw"),i=e("../internals/well-known-symbol")("match");t.exports=function(e){var t;return n(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==o(e))}},{"../internals/classof-raw":28,"../internals/is-object":73,"../internals/well-known-symbol":145}],76:[function(e,t,r){function h(e,t){this.stopped=e,this.result=t}var p=e("../internals/an-object"),y=e("../internals/is-array-iterator-method"),m=e("../internals/to-length"),g=e("../internals/function-bind-context"),v=e("../internals/get-iterator-method"),b=e("../internals/call-with-safe-iteration-closing");(t.exports=function(e,t,r,n,o){var i,a,s,l,u,c,d,f=g(t,r,n?2:1);if(o)i=e;else{if("function"!=typeof(a=v(e)))throw TypeError("Target is not iterable");if(y(a)){for(s=0,l=m(e.length);s<l;s++)if((u=n?f(p(d=e[s])[0],d[1]):f(e[s]))&&u instanceof h)return u;return new h(!1)}i=a.call(e)}for(c=i.next;!(d=c.call(i)).done;)if("object"==typeof(u=b(i,f,d.value,n))&&u&&u instanceof h)return u;return new h(!1)}).stop=function(e){return new h(!0,e)}},{"../internals/an-object":10,"../internals/call-with-safe-iteration-closing":26,"../internals/function-bind-context":53,"../internals/get-iterator-method":56,"../internals/is-array-iterator-method":70,"../internals/to-length":133}],77:[function(e,t,r){"use strict";var n,o,i,a=e("../internals/object-get-prototype-of"),s=e("../internals/create-non-enumerable-property"),l=e("../internals/has"),u=e("../internals/well-known-symbol"),c=e("../internals/is-pure"),d=u("iterator"),f=!1;[].keys&&("next"in(i=[].keys())?(o=a(a(i)))!==Object.prototype&&(n=o):f=!0),null==n&&(n={}),c||l(n,d)||s(n,d,function(){return this}),t.exports={IteratorPrototype:n,BUGGY_SAFARI_ITERATORS:f}},{"../internals/create-non-enumerable-property":37,"../internals/has":59,"../internals/is-pure":74,"../internals/object-get-prototype-of":96,"../internals/well-known-symbol":145}],78:[function(e,t,r){arguments[4][60][0].apply(r,arguments)},{dup:60}],79:[function(e,t,r){t.exports=Math.sign||function(e){return 0==(e=+e)||e!=e?e:e<0?-1:1}},{}],80:[function(e,t,r){var n,o,i,a,s,l,u,c,d=e("../internals/global"),f=e("../internals/object-get-own-property-descriptor").f,h=e("../internals/classof-raw"),p=e("../internals/task").set,y=e("../internals/engine-is-ios"),m=d.MutationObserver||d.WebKitMutationObserver,g=d.process,v=d.Promise,b="process"==h(g),_=f(d,"queueMicrotask"),x=_&&_.value;x||(n=function(){var e,t;for(b&&(e=g.domain)&&e.exit();o;){t=o.fn,o=o.next;try{t()}catch(e){throw o?a():i=void 0,e}}i=void 0,e&&e.enter()},a=b?function(){g.nextTick(n)}:m&&!y?(s=!0,l=document.createTextNode(""),new m(n).observe(l,{characterData:!0}),function(){l.data=s=!s}):v&&v.resolve?(u=v.resolve(void 0),c=u.then,function(){c.call(u,n)}):function(){p.call(d,n)}),t.exports=x||function(e){var t={fn:e,next:void 0};i&&(i.next=t),o||(o=t,a()),i=t}},{"../internals/classof-raw":28,"../internals/engine-is-ios":45,"../internals/global":58,"../internals/object-get-own-property-descriptor":92,"../internals/task":127}],81:[function(e,t,r){var n=e("../internals/global");t.exports=n.Promise},{"../internals/global":58}],82:[function(e,t,r){var n=e("../internals/fails");t.exports=!!Object.getOwnPropertySymbols&&!n(function(){return!String(Symbol())})},{"../internals/fails":50}],83:[function(e,t,r){var n=e("../internals/fails"),o=e("../internals/well-known-symbol"),i=e("../internals/is-pure"),a=o("iterator");t.exports=!n(function(){var e=new URL("b?a=1&b=2&c=3","http://a"),r=e.searchParams,n="";return e.pathname="c%20d",r.forEach(function(e,t){r.delete("b"),n+=t+e}),i&&!e.toJSON||!r.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==r.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!r[a]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host})},{"../internals/fails":50,"../internals/is-pure":74,"../internals/well-known-symbol":145}],84:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/inspect-source"),i=n.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},{"../internals/global":58,"../internals/inspect-source":67}],85:[function(e,t,r){"use strict";function n(e){var r,n;this.promise=new e(function(e,t){if(void 0!==r||void 0!==n)throw TypeError("Bad Promise constructor");r=e,n=t}),this.resolve=o(r),this.reject=o(n)}var o=e("../internals/a-function");t.exports.f=function(e){return new n(e)}},{"../internals/a-function":5}],86:[function(e,t,r){var n=e("../internals/is-regexp");t.exports=function(e){if(n(e))throw TypeError("The method doesn't accept regular expressions");return e}},{"../internals/is-regexp":75}],87:[function(e,t,r){var n=e("../internals/global").isFinite;t.exports=Number.isFinite||function(e){return"number"==typeof e&&n(e)}},{"../internals/global":58}],88:[function(e,t,r){"use strict";var f=e("../internals/descriptors"),n=e("../internals/fails"),h=e("../internals/object-keys"),p=e("../internals/object-get-own-property-symbols"),y=e("../internals/object-property-is-enumerable"),m=e("../internals/to-object"),g=e("../internals/indexed-object"),o=Object.assign,i=Object.defineProperty;t.exports=!o||n(function(){if(f&&1!==o({b:1},o(i({},"a",{enumerable:!0,get:function(){i(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},r=Symbol(),n="abcdefghijklmnopqrst";return e[r]=7,n.split("").forEach(function(e){t[e]=e}),7!=o({},e)[r]||h(o({},t)).join("")!=n})?function(e,t){for(var r=m(e),n=arguments.length,o=1,i=p.f,a=y.f;o<n;)for(var s,l=g(arguments[o++]),u=i?h(l).concat(i(l)):h(l),c=u.length,d=0;d<c;)s=u[d++],f&&!a.call(l,s)||(r[s]=l[s]);return r}:o},{"../internals/descriptors":42,"../internals/fails":50,"../internals/indexed-object":65,"../internals/object-get-own-property-symbols":95,"../internals/object-keys":98,"../internals/object-property-is-enumerable":99,"../internals/to-object":134}],89:[function(e,t,r){function n(){}function o(e){return"<script>"+e+"</"+p+">"}var i,a=e("../internals/an-object"),s=e("../internals/object-define-properties"),l=e("../internals/enum-bug-keys"),u=e("../internals/hidden-keys"),c=e("../internals/html"),d=e("../internals/document-create-element"),f=e("../internals/shared-key"),h="prototype",p="script",y=f("IE_PROTO"),m=function(){try{i=document.domain&&new ActiveXObject("htmlfile")}catch(e){}var e,t;m=i?function(e){e.write(o("")),e.close();var t=e.parentWindow.Object;return e=null,t}(i):((t=d("iframe")).style.display="none",c.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(o("document.F=Object")),e.close(),e.F);for(var r=l.length;r--;)delete m[h][l[r]];return m()};u[y]=!0,t.exports=Object.create||function(e,t){var r;return null!==e?(n[h]=a(e),r=new n,n[h]=null,r[y]=e):r=m(),void 0===t?r:s(r,t)}},{"../internals/an-object":10,"../internals/document-create-element":43,"../internals/enum-bug-keys":48,"../internals/hidden-keys":60,"../internals/html":62,"../internals/object-define-properties":90,"../internals/shared-key":117}],90:[function(e,t,r){var n=e("../internals/descriptors"),a=e("../internals/object-define-property"),s=e("../internals/an-object"),l=e("../internals/object-keys");t.exports=n?Object.defineProperties:function(e,t){s(e);for(var r,n=l(t),o=n.length,i=0;i<o;)a.f(e,r=n[i++],t[r]);return e}},{"../internals/an-object":10,"../internals/descriptors":42,"../internals/object-define-property":91,"../internals/object-keys":98}],91:[function(e,t,r){var n=e("../internals/descriptors"),o=e("../internals/ie8-dom-define"),i=e("../internals/an-object"),a=e("../internals/to-primitive"),s=Object.defineProperty;r.f=n?s:function(e,t,r){if(i(e),t=a(t,!0),i(r),o)try{return s(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(e[t]=r.value),e}},{"../internals/an-object":10,"../internals/descriptors":42,"../internals/ie8-dom-define":63,"../internals/to-primitive":137}],92:[function(e,t,r){var n=e("../internals/descriptors"),o=e("../internals/object-property-is-enumerable"),i=e("../internals/create-property-descriptor"),a=e("../internals/to-indexed-object"),s=e("../internals/to-primitive"),l=e("../internals/has"),u=e("../internals/ie8-dom-define"),c=Object.getOwnPropertyDescriptor;r.f=n?c:function(e,t){if(e=a(e),t=s(t,!0),u)try{return c(e,t)}catch(e){}if(l(e,t))return i(!o.f.call(e,t),e[t])}},{"../internals/create-property-descriptor":38,"../internals/descriptors":42,"../internals/has":59,"../internals/ie8-dom-define":63,"../internals/object-property-is-enumerable":99,"../internals/to-indexed-object":131,"../internals/to-primitive":137}],93:[function(e,t,r){var n=e("../internals/to-indexed-object"),o=e("../internals/object-get-own-property-names").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(e){return a&&"[object Window]"==i.call(e)?function(e){try{return o(e)}catch(e){return a.slice()}}(e):o(n(e))}},{"../internals/object-get-own-property-names":94,"../internals/to-indexed-object":131}],94:[function(e,t,r){var n=e("../internals/object-keys-internal"),o=e("../internals/enum-bug-keys").concat("length","prototype");r.f=Object.getOwnPropertyNames||function(e){return n(e,o)}},{"../internals/enum-bug-keys":48,"../internals/object-keys-internal":97}],95:[function(e,t,r){r.f=Object.getOwnPropertySymbols},{}],96:[function(e,t,r){var n=e("../internals/has"),o=e("../internals/to-object"),i=e("../internals/shared-key"),a=e("../internals/correct-prototype-getter"),s=i("IE_PROTO"),l=Object.prototype;t.exports=a?Object.getPrototypeOf:function(e){return e=o(e),n(e,s)?e[s]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?l:null}},{"../internals/correct-prototype-getter":34,"../internals/has":59,"../internals/shared-key":117,"../internals/to-object":134}],97:[function(e,t,r){var a=e("../internals/has"),s=e("../internals/to-indexed-object"),l=e("../internals/array-includes").indexOf,u=e("../internals/hidden-keys");t.exports=function(e,t){var r,n=s(e),o=0,i=[];for(r in n)!a(u,r)&&a(n,r)&&i.push(r);for(;t.length>o;)a(n,r=t[o++])&&(~l(i,r)||i.push(r));return i}},{"../internals/array-includes":18,"../internals/has":59,"../internals/hidden-keys":60,"../internals/to-indexed-object":131}],98:[function(e,t,r){var n=e("../internals/object-keys-internal"),o=e("../internals/enum-bug-keys");t.exports=Object.keys||function(e){return n(e,o)}},{"../internals/enum-bug-keys":48,"../internals/object-keys-internal":97}],99:[function(e,t,r){"use strict";var n={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!n.call({1:2},1);r.f=i?function(e){var t=o(this,e);return!!t&&t.enumerable}:n},{}],100:[function(e,t,r){var o=e("../internals/an-object"),i=e("../internals/a-possible-prototype");t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var r,n=!1,e={};try{(r=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(e,[]),n=e instanceof Array}catch(e){}return function(e,t){return o(e),i(t),n?r.call(e,t):e.__proto__=t,e}}():void 0)},{"../internals/a-possible-prototype":6,"../internals/an-object":10}],101:[function(e,t,r){"use strict";var n=e("../internals/to-string-tag-support"),o=e("../internals/classof");t.exports=n?{}.toString:function(){return"[object "+o(this)+"]"}},{"../internals/classof":29,"../internals/to-string-tag-support":138}],102:[function(e,t,r){var n=e("../internals/get-built-in"),o=e("../internals/object-get-own-property-names"),i=e("../internals/object-get-own-property-symbols"),a=e("../internals/an-object");t.exports=n("Reflect","ownKeys")||function(e){var t=o.f(a(e)),r=i.f;return r?t.concat(r(e)):t}},{"../internals/an-object":10,"../internals/get-built-in":55,"../internals/object-get-own-property-names":94,"../internals/object-get-own-property-symbols":95}],103:[function(e,t,r){var n=e("../internals/global");t.exports=n},{"../internals/global":58}],104:[function(e,t,r){t.exports=function(e){try{return{error:!1,value:e()}}catch(e){return{error:!0,value:e}}}},{}],105:[function(e,t,r){var n=e("../internals/an-object"),o=e("../internals/is-object"),i=e("../internals/new-promise-capability");t.exports=function(e,t){if(n(e),o(t)&&t.constructor===e)return t;var r=i.f(e);return(0,r.resolve)(t),r.promise}},{"../internals/an-object":10,"../internals/is-object":73,"../internals/new-promise-capability":85}],106:[function(e,t,r){var o=e("../internals/redefine");t.exports=function(e,t,r){for(var n in t)o(e,n,t[n],r);return e}},{"../internals/redefine":107}],107:[function(e,t,r){var s=e("../internals/global"),l=e("../internals/create-non-enumerable-property"),u=e("../internals/has"),c=e("../internals/set-global"),n=e("../internals/inspect-source"),o=e("../internals/internal-state"),i=o.get,d=o.enforce,f=String(String).split("String");(t.exports=function(e,t,r,n){var o=!!n&&!!n.unsafe,i=!!n&&!!n.enumerable,a=!!n&&!!n.noTargetGet;"function"==typeof r&&("string"!=typeof t||u(r,"name")||l(r,"name",t),d(r).source=f.join("string"==typeof t?t:"")),e!==s?(o?!a&&e[t]&&(i=!0):delete e[t],i?e[t]=r:l(e,t,r)):i?e[t]=r:c(t,r)})(Function.prototype,"toString",function(){return"function"==typeof this&&i(this).source||n(this)})},{"../internals/create-non-enumerable-property":37,"../internals/global":58,"../internals/has":59,"../internals/inspect-source":67,"../internals/internal-state":69,"../internals/set-global":114}],108:[function(e,t,r){var o=e("./classof-raw"),i=e("./regexp-exec");t.exports=function(e,t){var r=e.exec;if("function"==typeof r){var n=r.call(e,t);if("object"!=typeof n)throw TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==o(e))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},{"./classof-raw":28,"./regexp-exec":109}],109:[function(e,t,r){"use strict";var n,o,d=e("./regexp-flags"),i=e("./regexp-sticky-helpers"),f=RegExp.prototype.exec,h=String.prototype.replace,a=f,p=(n=/a/,o=/b*/g,f.call(n,"a"),f.call(o,"a"),0!==n.lastIndex||0!==o.lastIndex),y=i.UNSUPPORTED_Y||i.BROKEN_CARET,m=void 0!==/()??/.exec("")[1];(p||m||y)&&(a=function(e){var t,r,n,o,i=this,a=y&&i.sticky,s=d.call(i),l=i.source,u=0,c=e;return a&&(-1===(s=s.replace("y","")).indexOf("g")&&(s+="g"),c=String(e).slice(i.lastIndex),0<i.lastIndex&&(!i.multiline||i.multiline&&"\n"!==e[i.lastIndex-1])&&(l="(?: "+l+")",c=" "+c,u++),r=new RegExp("^(?:"+l+")",s)),m&&(r=new RegExp("^"+l+"$(?!\\s)",s)),p&&(t=i.lastIndex),n=f.call(a?r:i,c),a?n?(n.input=n.input.slice(u),n[0]=n[0].slice(u),n.index=i.lastIndex,i.lastIndex+=n[0].length):i.lastIndex=0:p&&n&&(i.lastIndex=i.global?n.index+n[0].length:t),m&&n&&1<n.length&&h.call(n[0],r,function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(n[o]=void 0)}),n}),t.exports=a},{"./regexp-flags":110,"./regexp-sticky-helpers":111}],110:[function(e,t,r){"use strict";var n=e("../internals/an-object");t.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},{"../internals/an-object":10}],111:[function(e,t,r){"use strict";var n=e("./fails");function o(e,t){return RegExp(e,t)}r.UNSUPPORTED_Y=n(function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")}),r.BROKEN_CARET=n(function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")})},{"./fails":50}],112:[function(e,t,r){t.exports=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e}},{}],113:[function(e,t,r){t.exports=Object.is||function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}},{}],114:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/create-non-enumerable-property");t.exports=function(t,r){try{o(n,t,r)}catch(e){n[t]=r}return r}},{"../internals/create-non-enumerable-property":37,"../internals/global":58}],115:[function(e,t,r){"use strict";var n=e("../internals/get-built-in"),o=e("../internals/object-define-property"),i=e("../internals/well-known-symbol"),a=e("../internals/descriptors"),s=i("species");t.exports=function(e){var t=n(e),r=o.f;a&&t&&!t[s]&&r(t,s,{configurable:!0,get:function(){return this}})}},{"../internals/descriptors":42,"../internals/get-built-in":55,"../internals/object-define-property":91,"../internals/well-known-symbol":145}],116:[function(e,t,r){var n=e("../internals/object-define-property").f,o=e("../internals/has"),i=e("../internals/well-known-symbol")("toStringTag");t.exports=function(e,t,r){e&&!o(e=r?e:e.prototype,i)&&n(e,i,{configurable:!0,value:t})}},{"../internals/has":59,"../internals/object-define-property":91,"../internals/well-known-symbol":145}],117:[function(e,t,r){var n=e("../internals/shared"),o=e("../internals/uid"),i=n("keys");t.exports=function(e){return i[e]||(i[e]=o(e))}},{"../internals/shared":119,"../internals/uid":142}],118:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/set-global"),i="__core-js_shared__",a=n[i]||o(i,{});t.exports=a},{"../internals/global":58,"../internals/set-global":114}],119:[function(e,t,r){var n=e("../internals/is-pure"),o=e("../internals/shared-store");(t.exports=function(e,t){return o[e]||(o[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.6.5",mode:n?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},{"../internals/is-pure":74,"../internals/shared-store":118}],120:[function(e,t,r){var o=e("../internals/an-object"),i=e("../internals/a-function"),a=e("../internals/well-known-symbol")("species");t.exports=function(e,t){var r,n=o(e).constructor;return void 0===n||null==(r=o(n)[a])?t:i(r)}},{"../internals/a-function":5,"../internals/an-object":10,"../internals/well-known-symbol":145}],121:[function(e,t,r){var n=e("../internals/fails");t.exports=function(t){return n(function(){var e=""[t]('"');return e!==e.toLowerCase()||3<e.split('"').length})}},{"../internals/fails":50}],122:[function(e,t,r){function n(s){return function(e,t){var r,n,o=String(u(e)),i=l(t),a=o.length;return i<0||a<=i?s?"":void 0:(r=o.charCodeAt(i))<55296||56319<r||i+1===a||(n=o.charCodeAt(i+1))<56320||57343<n?s?o.charAt(i):r:s?o.slice(i,i+2):n-56320+(r-55296<<10)+65536}}var l=e("../internals/to-integer"),u=e("../internals/require-object-coercible");t.exports={codeAt:n(!1),charAt:n(!0)}},{"../internals/require-object-coercible":112,"../internals/to-integer":132}],123:[function(e,t,r){"use strict";function g(e){return e+22+75*(e<26)}function v(e,t,r){var n=0;for(e=r?x(e/700):e>>1,e+=x(e/t);455<e;n+=36)e=x(e/35);return x(n+36*e/(e+38))}function i(e){var t,r,n=[],o=(e=function(e){for(var t=[],r=0,n=e.length;r<n;){var o=e.charCodeAt(r++);if(55296<=o&&o<=56319&&r<n){var i=e.charCodeAt(r++);56320==(64512&i)?t.push(((1023&o)<<10)+(1023&i)+65536):(t.push(o),r--)}else t.push(o)}return t}(e)).length,i=128,a=0,s=72;for(t=0;t<e.length;t++)(r=e[t])<128&&n.push(w(r));var l=n.length,u=l;for(l&&n.push("-");u<o;){var c=b;for(t=0;t<e.length;t++)i<=(r=e[t])&&r<c&&(c=r);var d=u+1;if(c-i>x((b-a)/d))throw RangeError(_);for(a+=(c-i)*d,i=c,t=0;t<e.length;t++){if((r=e[t])<i&&++a>b)throw RangeError(_);if(r==i){for(var f=a,h=36;;h+=36){var p=h<=s?1:s+26<=h?26:h-s;if(f<p)break;var y=f-p,m=36-p;n.push(w(g(p+y%m))),f=x(y/m)}n.push(w(g(f))),s=v(a,d,u==l),a=0,++u}}++a,++i}return n.join("")}var b=2147483647,a=/[^\0-\u007E]/,s=/[.\u3002\uFF0E\uFF61]/g,_="Overflow: input needs wider integers to process",x=Math.floor,w=String.fromCharCode;t.exports=function(e){var t,r,n=[],o=e.toLowerCase().replace(s,".").split(".");for(t=0;t<o.length;t++)r=o[t],n.push(a.test(r)?"xn--"+i(r):r);return n.join(".")}},{}],124:[function(e,t,r){"use strict";var o=e("../internals/to-integer"),i=e("../internals/require-object-coercible");t.exports="".repeat||function(e){var t=String(i(this)),r="",n=o(e);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;0<n;(n>>>=1)&&(t+=t))1&n&&(r+=t);return r}},{"../internals/require-object-coercible":112,"../internals/to-integer":132}],125:[function(e,t,r){var n=e("../internals/fails"),o=e("../internals/whitespaces");t.exports=function(e){return n(function(){return!!o[e]()||"​᠎"!="​᠎"[e]()||o[e].name!==e})}},{"../internals/fails":50,"../internals/whitespaces":146}],126:[function(e,t,r){function n(r){return function(e){var t=String(o(e));return 1&r&&(t=t.replace(a,"")),2&r&&(t=t.replace(s,"")),t}}var o=e("../internals/require-object-coercible"),i="["+e("../internals/whitespaces")+"]",a=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$");t.exports={start:n(1),end:n(2),trim:n(3)}},{"../internals/require-object-coercible":112,"../internals/whitespaces":146}],127:[function(e,t,r){function n(e){if(j.hasOwnProperty(e)){var t=j[e];delete j[e],t()}}function o(e){return function(){n(e)}}function i(e){n(e.data)}function a(e){c.postMessage(e+"",g.protocol+"//"+g.host)}var s,l,u,c=e("../internals/global"),d=e("../internals/fails"),f=e("../internals/classof-raw"),h=e("../internals/function-bind-context"),p=e("../internals/html"),y=e("../internals/document-create-element"),m=e("../internals/engine-is-ios"),g=c.location,v=c.setImmediate,b=c.clearImmediate,_=c.process,x=c.MessageChannel,w=c.Dispatch,S=0,j={},M="onreadystatechange";v&&b||(v=function(e){for(var t=[],r=1;r<arguments.length;)t.push(arguments[r++]);return j[++S]=function(){("function"==typeof e?e:Function(e)).apply(void 0,t)},s(S),S},b=function(e){delete j[e]},"process"==f(_)?s=function(e){_.nextTick(o(e))}:w&&w.now?s=function(e){w.now(o(e))}:x&&!m?(u=(l=new x).port2,l.port1.onmessage=i,s=h(u.postMessage,u,1)):!c.addEventListener||"function"!=typeof postMessage||c.importScripts||d(a)||"file:"===g.protocol?s=M in y("script")?function(e){p.appendChild(y("script"))[M]=function(){p.removeChild(this),n(e)}}:function(e){setTimeout(o(e),0)}:(s=a,c.addEventListener("message",i,!1))),t.exports={set:v,clear:b}},{"../internals/classof-raw":28,"../internals/document-create-element":43,"../internals/engine-is-ios":45,"../internals/fails":50,"../internals/function-bind-context":53,"../internals/global":58,"../internals/html":62}],128:[function(e,t,r){var n=e("../internals/classof-raw");t.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},{"../internals/classof-raw":28}],129:[function(e,t,r){var n=e("../internals/to-integer"),o=Math.max,i=Math.min;t.exports=function(e,t){var r=n(e);return r<0?o(r+t,0):i(r,t)}},{"../internals/to-integer":132}],130:[function(e,t,r){var n=e("../internals/to-integer"),o=e("../internals/to-length");t.exports=function(e){if(void 0===e)return 0;var t=n(e),r=o(t);if(t!==r)throw RangeError("Wrong length or index");return r}},{"../internals/to-integer":132,"../internals/to-length":133}],131:[function(e,t,r){var n=e("../internals/indexed-object"),o=e("../internals/require-object-coercible");t.exports=function(e){return n(o(e))}},{"../internals/indexed-object":65,"../internals/require-object-coercible":112}],132:[function(e,t,r){var n=Math.ceil,o=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(0<e?o:n)(e)}},{}],133:[function(e,t,r){var n=e("../internals/to-integer"),o=Math.min;t.exports=function(e){return 0<e?o(n(e),9007199254740991):0}},{"../internals/to-integer":132}],134:[function(e,t,r){var n=e("../internals/require-object-coercible");t.exports=function(e){return Object(n(e))}},{"../internals/require-object-coercible":112}],135:[function(e,t,r){var n=e("../internals/to-positive-integer");t.exports=function(e,t){var r=n(e);if(r%t)throw RangeError("Wrong offset");return r}},{"../internals/to-positive-integer":136}],136:[function(e,t,r){var n=e("../internals/to-integer");t.exports=function(e){var t=n(e);if(t<0)throw RangeError("The argument can't be less than 0");return t}},{"../internals/to-integer":132}],137:[function(e,t,r){var o=e("../internals/is-object");t.exports=function(e,t){if(!o(e))return e;var r,n;if(t&&"function"==typeof(r=e.toString)&&!o(n=r.call(e)))return n;if("function"==typeof(r=e.valueOf)&&!o(n=r.call(e)))return n;if(!t&&"function"==typeof(r=e.toString)&&!o(n=r.call(e)))return n;throw TypeError("Can't convert object to primitive value")}},{"../internals/is-object":73}],138:[function(e,t,r){var n={};n[e("../internals/well-known-symbol")("toStringTag")]="z",t.exports="[object z]"===String(n)},{"../internals/well-known-symbol":145}],139:[function(e,t,r){"use strict";function p(e,t){for(var r=0,n=t.length,o=new(X(e))(n);r<n;)o[r]=t[r++];return o}function n(e,t){U(e,t,{get:function(){return D(this)[t]}})}function y(e){var t;return e instanceof G||"ArrayBuffer"==(t=S(e))||"SharedArrayBuffer"==t}function o(e,t){return Y(e)&&"symbol"!=typeof t&&t in e&&String(+t)==String(t)}function i(e,t){return o(e,t=h(t,!0))?f(2,e[t]):N(e,t)}function a(e,t,r){return!(o(e,t=h(t,!0))&&j(r)&&w(r,"value"))||w(r,"get")||w(r,"set")||r.configurable||w(r,"writable")&&!r.writable||w(r,"enumerable")&&!r.enumerable?U(e,t,r):(e[t]=r.value,e)}var l=e("../internals/export"),u=e("../internals/global"),s=e("../internals/descriptors"),m=e("../internals/typed-array-constructors-require-wrappers"),c=e("../internals/array-buffer-view-core"),d=e("../internals/array-buffer"),g=e("../internals/an-instance"),f=e("../internals/create-property-descriptor"),v=e("../internals/create-non-enumerable-property"),b=e("../internals/to-length"),_=e("../internals/to-index"),x=e("../internals/to-offset"),h=e("../internals/to-primitive"),w=e("../internals/has"),S=e("../internals/classof"),j=e("../internals/is-object"),M=e("../internals/object-create"),E=e("../internals/object-set-prototype-of"),T=e("../internals/object-get-own-property-names").f,O=e("../internals/typed-array-from"),C=e("../internals/array-iteration").forEach,L=e("../internals/set-species"),P=e("../internals/object-define-property"),k=e("../internals/object-get-own-property-descriptor"),A=e("../internals/internal-state"),R=e("../internals/inherit-if-required"),D=A.get,I=A.set,U=P.f,N=k.f,F=Math.round,B=u.RangeError,G=d.ArrayBuffer,V=d.DataView,z=c.NATIVE_ARRAY_BUFFER_VIEWS,H=c.TYPED_ARRAY_TAG,q=c.TypedArray,W=c.TypedArrayPrototype,X=c.aTypedArrayConstructor,Y=c.isTypedArray,Z="BYTES_PER_ELEMENT",Q="Wrong length";s?(z||(k.f=i,P.f=a,n(W,"buffer"),n(W,"byteOffset"),n(W,"byteLength"),n(W,"length")),l({target:"Object",stat:!0,forced:!z},{getOwnPropertyDescriptor:i,defineProperty:a}),t.exports=function(e,t,i){function c(e,o){U(e,o,{get:function(){return e=o,(t=D(this)).view[r](e*d+t.byteOffset,!0);var e,t},set:function(e){return t=o,r=e,n=D(this),i&&(r=(r=F(r))<0?0:255<r?255:255&r),void n.view[a](t*d+n.byteOffset,r,!0);var t,r,n},enumerable:!0})}var d=e.match(/\d+$/)[0]/8,f=e+(i?"Clamped":"")+"Array",r="get"+e,a="set"+e,o=u[f],h=o,n=h&&h.prototype,s={};z?m&&(h=t(function(e,t,r,n){return g(e,h,f),R(j(t)?y(t)?void 0!==n?new o(t,x(r,d),n):void 0!==r?new o(t,x(r,d)):new o(t):Y(t)?p(h,t):O.call(h,t):new o(_(t)),e,h)}),E&&E(h,q),C(T(o),function(e){e in h||v(h,e,o[e])}),h.prototype=n):(h=t(function(e,t,r,n){g(e,h,f);var o,i,a,s=0,l=0;if(j(t)){if(!y(t))return Y(t)?p(h,t):O.call(h,t);o=t,l=x(r,d);var u=t.byteLength;if(void 0===n){if(u%d)throw B(Q);if((i=u-l)<0)throw B(Q)}else if(u<(i=b(n)*d)+l)throw B(Q);a=i/d}else a=_(t),o=new G(i=a*d);for(I(e,{buffer:o,byteOffset:l,byteLength:i,length:a,view:new V(o)});s<a;)c(e,s++)}),E&&E(h,q),n=h.prototype=M(W)),n.constructor!==h&&v(n,"constructor",h),H&&v(n,H,f),s[f]=h,l({global:!0,forced:h!=o,sham:!z},s),Z in h||v(h,Z,d),Z in n||v(n,Z,d),L(f)}):t.exports=function(){}},{"../internals/an-instance":9,"../internals/array-buffer":13,"../internals/array-buffer-view-core":12,"../internals/array-iteration":19,"../internals/classof":29,"../internals/create-non-enumerable-property":37,"../internals/create-property-descriptor":38,"../internals/descriptors":42,"../internals/export":49,"../internals/global":58,"../internals/has":59,"../internals/inherit-if-required":66,"../internals/internal-state":69,"../internals/is-object":73,"../internals/object-create":89,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/object-get-own-property-names":94,"../internals/object-set-prototype-of":100,"../internals/set-species":115,"../internals/to-index":130,"../internals/to-length":133,"../internals/to-offset":135,"../internals/to-primitive":137,"../internals/typed-array-constructors-require-wrappers":140,"../internals/typed-array-from":141}],140:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/fails"),i=e("../internals/check-correctness-of-iteration"),a=e("../internals/array-buffer-view-core").NATIVE_ARRAY_BUFFER_VIEWS,s=n.ArrayBuffer,l=n.Int8Array;t.exports=!a||!o(function(){l(1)})||!o(function(){new l(-1)})||!i(function(e){new l,new l(null),new l(1.5),new l(e)},!0)||o(function(){return 1!==new l(new s(2),1,void 0).length})},{"../internals/array-buffer-view-core":12,"../internals/check-correctness-of-iteration":27,"../internals/fails":50,"../internals/global":58}],141:[function(e,t,r){var p=e("../internals/to-object"),y=e("../internals/to-length"),m=e("../internals/get-iterator-method"),g=e("../internals/is-array-iterator-method"),v=e("../internals/function-bind-context"),b=e("../internals/array-buffer-view-core").aTypedArrayConstructor;t.exports=function(e,t,r){var n,o,i,a,s,l,u=p(e),c=arguments.length,d=1<c?t:void 0,f=void 0!==d,h=m(u);if(null!=h&&!g(h))for(l=(s=h.call(u)).next,u=[];!(a=l.call(s)).done;)u.push(a.value);for(f&&2<c&&(d=v(d,r,2)),o=y(u.length),i=new(b(this))(o),n=0;n<o;n++)i[n]=f?d(u[n],n):u[n];return i}},{"../internals/array-buffer-view-core":12,"../internals/function-bind-context":53,"../internals/get-iterator-method":56,"../internals/is-array-iterator-method":70,"../internals/to-length":133,"../internals/to-object":134}],142:[function(e,t,r){var n=0,o=Math.random();t.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++n+o).toString(36)}},{}],143:[function(e,t,r){var n=e("../internals/native-symbol");t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},{"../internals/native-symbol":82}],144:[function(e,t,r){var n=e("../internals/well-known-symbol");r.f=n},{"../internals/well-known-symbol":145}],145:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/shared"),i=e("../internals/has"),a=e("../internals/uid"),s=e("../internals/native-symbol"),l=e("../internals/use-symbol-as-uid"),u=o("wks"),c=n.Symbol,d=l?c:c&&c.withoutSetter||a;t.exports=function(e){return i(u,e)||(s&&i(c,e)?u[e]=c[e]:u[e]=d("Symbol."+e)),u[e]}},{"../internals/global":58,"../internals/has":59,"../internals/native-symbol":82,"../internals/shared":119,"../internals/uid":142,"../internals/use-symbol-as-uid":143}],146:[function(e,t,r){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},{}],147:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/global"),i=e("../internals/array-buffer"),a=e("../internals/set-species"),s="ArrayBuffer",l=i[s];n({global:!0,forced:o[s]!==l},{ArrayBuffer:l}),a(s)},{"../internals/array-buffer":13,"../internals/export":49,"../internals/global":58,"../internals/set-species":115}],148:[function(e,t,r){"use strict";function u(e){if(!a(e))return!1;var t=e[y];return void 0!==t?!!t:i(e)}var n=e("../internals/export"),o=e("../internals/fails"),i=e("../internals/is-array"),a=e("../internals/is-object"),c=e("../internals/to-object"),d=e("../internals/to-length"),f=e("../internals/create-property"),h=e("../internals/array-species-create"),s=e("../internals/array-method-has-species-support"),l=e("../internals/well-known-symbol"),p=e("../internals/engine-v8-version"),y=l("isConcatSpreadable"),m=9007199254740991,g="Maximum allowed index exceeded",v=51<=p||!o(function(){var e=[];return e[y]=!1,e.concat()[0]!==e}),b=s("concat");n({target:"Array",proto:!0,forced:!v||!b},{concat:function(e){var t,r,n,o,i,a=c(this),s=h(a,0),l=0;for(t=-1,n=arguments.length;t<n;t++)if(u(i=-1===t?a:arguments[t])){if(o=d(i.length),m<l+o)throw TypeError(g);for(r=0;r<o;r++,l++)r in i&&f(s,l,i[r])}else{if(m<=l)throw TypeError(g);f(s,l++,i)}return s.length=l,s}})},{"../internals/array-method-has-species-support":21,"../internals/array-species-create":25,"../internals/create-property":39,"../internals/engine-v8-version":47,"../internals/export":49,"../internals/fails":50,"../internals/is-array":71,"../internals/is-object":73,"../internals/to-length":133,"../internals/to-object":134,"../internals/well-known-symbol":145}],149:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-iteration").every,i=e("../internals/array-method-is-strict"),a=e("../internals/array-method-uses-to-length"),s=i("every"),l=a("every");n({target:"Array",proto:!0,forced:!s||!l},{every:function(e,t){return o(this,e,1<arguments.length?t:void 0)}})},{"../internals/array-iteration":19,"../internals/array-method-is-strict":22,"../internals/array-method-uses-to-length":23,"../internals/export":49}],150:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/array-fill"),i=e("../internals/add-to-unscopables");n({target:"Array",proto:!0},{fill:o}),i("fill")},{"../internals/add-to-unscopables":7,"../internals/array-fill":15,"../internals/export":49}],151:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-iteration").filter,i=e("../internals/array-method-has-species-support"),a=e("../internals/array-method-uses-to-length"),s=i("filter"),l=a("filter");n({target:"Array",proto:!0,forced:!s||!l},{filter:function(e,t){return o(this,e,1<arguments.length?t:void 0)}})},{"../internals/array-iteration":19,"../internals/array-method-has-species-support":21,"../internals/array-method-uses-to-length":23,"../internals/export":49}],152:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-for-each");n({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},{"../internals/array-for-each":16,"../internals/export":49}],153:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/array-from");n({target:"Array",stat:!0,forced:!e("../internals/check-correctness-of-iteration")(function(e){Array.from(e)})},{from:o})},{"../internals/array-from":17,"../internals/check-correctness-of-iteration":27,"../internals/export":49}],154:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-includes").includes,i=e("../internals/add-to-unscopables");n({target:"Array",proto:!0,forced:!e("../internals/array-method-uses-to-length")("indexOf",{ACCESSORS:!0,1:0})},{includes:function(e,t){return o(this,e,1<arguments.length?t:void 0)}}),i("includes")},{"../internals/add-to-unscopables":7,"../internals/array-includes":18,"../internals/array-method-uses-to-length":23,"../internals/export":49}],155:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-includes").indexOf,i=e("../internals/array-method-is-strict"),a=e("../internals/array-method-uses-to-length"),s=[].indexOf,l=!!s&&1/[1].indexOf(1,-0)<0,u=i("indexOf"),c=a("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:l||!u||!c},{indexOf:function(e,t){return l?s.apply(this,arguments)||0:o(this,e,1<arguments.length?t:void 0)}})},{"../internals/array-includes":18,"../internals/array-method-is-strict":22,"../internals/array-method-uses-to-length":23,"../internals/export":49}],156:[function(e,t,r){"use strict";var n=e("../internals/to-indexed-object"),o=e("../internals/add-to-unscopables"),i=e("../internals/iterators"),a=e("../internals/internal-state"),s=e("../internals/define-iterator"),l="Array Iterator",u=a.set,c=a.getterFor(l);t.exports=s(Array,"Array",function(e,t){u(this,{type:l,target:n(e),index:0,kind:t})},function(){var e=c(this),t=e.target,r=e.kind,n=e.index++;return!t||n>=t.length?{value:e.target=void 0,done:!0}:"keys"==r?{value:n,done:!1}:"values"==r?{value:t[n],done:!1}:{value:[n,t[n]],done:!1}},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},{"../internals/add-to-unscopables":7,"../internals/define-iterator":40,"../internals/internal-state":69,"../internals/iterators":78,"../internals/to-indexed-object":131}],157:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/indexed-object"),i=e("../internals/to-indexed-object"),a=e("../internals/array-method-is-strict"),s=[].join,l=o!=Object,u=a("join",",");n({target:"Array",proto:!0,forced:l||!u},{join:function(e){return s.call(i(this),void 0===e?",":e)}})},{"../internals/array-method-is-strict":22,"../internals/export":49,"../internals/indexed-object":65,"../internals/to-indexed-object":131}],158:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/array-last-index-of");n({target:"Array",proto:!0,forced:o!==[].lastIndexOf},{lastIndexOf:o})},{"../internals/array-last-index-of":20,"../internals/export":49}],159:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-iteration").map,i=e("../internals/array-method-has-species-support"),a=e("../internals/array-method-uses-to-length"),s=i("map"),l=a("map");n({target:"Array",proto:!0,forced:!s||!l},{map:function(e,t){return o(this,e,1<arguments.length?t:void 0)}})},{"../internals/array-iteration":19,"../internals/array-method-has-species-support":21,"../internals/array-method-uses-to-length":23,"../internals/export":49}],160:[function(e,t,r){"use strict";var n=e("../internals/export"),u=e("../internals/is-object"),c=e("../internals/is-array"),d=e("../internals/to-absolute-index"),f=e("../internals/to-length"),h=e("../internals/to-indexed-object"),p=e("../internals/create-property"),o=e("../internals/well-known-symbol"),i=e("../internals/array-method-has-species-support"),a=e("../internals/array-method-uses-to-length"),s=i("slice"),l=a("slice",{ACCESSORS:!0,0:0,1:2}),y=o("species"),m=[].slice,g=Math.max;n({target:"Array",proto:!0,forced:!s||!l},{slice:function(e,t){var r,n,o,i=h(this),a=f(i.length),s=d(e,a),l=d(void 0===t?a:t,a);if(c(i)&&("function"!=typeof(r=i.constructor)||r!==Array&&!c(r.prototype)?u(r)&&null===(r=r[y])&&(r=void 0):r=void 0,r===Array||void 0===r))return m.call(i,s,l);for(n=new(void 0===r?Array:r)(g(l-s,0)),o=0;s<l;s++,o++)s in i&&p(n,o,i[s]);return n.length=o,n}})},{"../internals/array-method-has-species-support":21,"../internals/array-method-uses-to-length":23,"../internals/create-property":39,"../internals/export":49,"../internals/is-array":71,"../internals/is-object":73,"../internals/to-absolute-index":129,"../internals/to-indexed-object":131,"../internals/to-length":133,"../internals/well-known-symbol":145}],161:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/array-iteration").some,i=e("../internals/array-method-is-strict"),a=e("../internals/array-method-uses-to-length"),s=i("some"),l=a("some");n({target:"Array",proto:!0,forced:!s||!l},{some:function(e,t){return o(this,e,1<arguments.length?t:void 0)}})},{"../internals/array-iteration":19,"../internals/array-method-is-strict":22,"../internals/array-method-uses-to-length":23,"../internals/export":49}],162:[function(e,t,r){"use strict";var n=e("../internals/export"),f=e("../internals/to-absolute-index"),h=e("../internals/to-integer"),p=e("../internals/to-length"),y=e("../internals/to-object"),m=e("../internals/array-species-create"),g=e("../internals/create-property"),o=e("../internals/array-method-has-species-support"),i=e("../internals/array-method-uses-to-length"),a=o("splice"),s=i("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,b=Math.min;n({target:"Array",proto:!0,forced:!a||!s},{splice:function(e,t){var r,n,o,i,a,s,l=y(this),u=p(l.length),c=f(e,u),d=arguments.length;if(0===d?r=n=0:n=1===d?(r=0,u-c):(r=d-2,b(v(h(t),0),u-c)),9007199254740991<u+r-n)throw TypeError("Maximum allowed length exceeded");for(o=m(l,n),i=0;i<n;i++)(a=c+i)in l&&g(o,i,l[a]);if(r<(o.length=n)){for(i=c;i<u-n;i++)s=i+r,(a=i+n)in l?l[s]=l[a]:delete l[s];for(i=u;u-n+r<i;i--)delete l[i-1]}else if(n<r)for(i=u-n;c<i;i--)s=i+r-1,(a=i+n-1)in l?l[s]=l[a]:delete l[s];for(i=0;i<r;i++)l[i+c]=arguments[i+2];return l.length=u-n+r,o}})},{"../internals/array-method-has-species-support":21,"../internals/array-method-uses-to-length":23,"../internals/array-species-create":25,"../internals/create-property":39,"../internals/export":49,"../internals/to-absolute-index":129,"../internals/to-integer":132,"../internals/to-length":133,"../internals/to-object":134}],163:[function(e,t,r){var n=e("../internals/descriptors"),o=e("../internals/object-define-property").f,i=Function.prototype,a=i.toString,s=/^\s*function ([^ (]*)/;!n||"name"in i||o(i,"name",{configurable:!0,get:function(){try{return a.call(this).match(s)[1]}catch(e){return""}}})},{"../internals/descriptors":42,"../internals/object-define-property":91}],164:[function(e,t,r){"use strict";var n=e("../internals/collection"),o=e("../internals/collection-strong");t.exports=n("Map",function(t){return function(e){return t(this,arguments.length?e:void 0)}},o)},{"../internals/collection":31,"../internals/collection-strong":30}],165:[function(e,t,r){var n=e("../internals/export"),o=Math.hypot,l=Math.abs,u=Math.sqrt;n({target:"Math",stat:!0,forced:!!o&&o(1/0,NaN)!==1/0},{hypot:function(e,t){for(var r,n,o=0,i=0,a=arguments.length,s=0;i<a;)s<(r=l(arguments[i++]))?(o=o*(n=s/r)*n+1,s=r):o+=0<r?(n=r/s)*n:r;return s===1/0?1/0:s*u(o)}})},{"../internals/export":49}],166:[function(e,t,r){e("../internals/export")({target:"Math",stat:!0},{sign:e("../internals/math-sign")})},{"../internals/export":49,"../internals/math-sign":79}],167:[function(e,t,r){"use strict";function n(e){var t,r,n,o,i,a,s,l,u=d(e,!1);if("string"==typeof u&&2<u.length)if(43===(t=(u=g(u)).charCodeAt(0))||45===t){if(88===(r=u.charCodeAt(2))||120===r)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+u}for(a=(i=u.slice(2)).length,s=0;s<a;s++)if((l=i.charCodeAt(s))<48||o<l)return NaN;return parseInt(i,n)}return+u}var o=e("../internals/descriptors"),i=e("../internals/global"),a=e("../internals/is-forced"),s=e("../internals/redefine"),l=e("../internals/has"),u=e("../internals/classof-raw"),c=e("../internals/inherit-if-required"),d=e("../internals/to-primitive"),f=e("../internals/fails"),h=e("../internals/object-create"),p=e("../internals/object-get-own-property-names").f,y=e("../internals/object-get-own-property-descriptor").f,m=e("../internals/object-define-property").f,g=e("../internals/string-trim").trim,v="Number",b=i[v],_=b.prototype,x=u(h(_))==v;if(a(v,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var w,S=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof S&&(x?f(function(){_.valueOf.call(r)}):u(r)!=v)?c(new b(n(t)),r,S):n(t)},j=o?p(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),M=0;j.length>M;M++)l(b,w=j[M])&&!l(S,w)&&m(S,w,y(b,w));(S.prototype=_).constructor=S,s(i,v,S)}},{"../internals/classof-raw":28,"../internals/descriptors":42,"../internals/fails":50,"../internals/global":58,"../internals/has":59,"../internals/inherit-if-required":66,"../internals/is-forced":72,"../internals/object-create":89,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/object-get-own-property-names":94,"../internals/redefine":107,"../internals/string-trim":126,"../internals/to-primitive":137}],168:[function(e,t,r){e("../internals/export")({target:"Number",stat:!0},{isFinite:e("../internals/number-is-finite")})},{"../internals/export":49,"../internals/number-is-finite":87}],169:[function(e,t,r){"use strict";var n=e("../internals/export"),h=e("../internals/to-integer"),p=e("../internals/this-number-value"),y=e("../internals/string-repeat"),o=e("../internals/fails"),i=1..toFixed,m=Math.floor,g=function(e,t,r){return 0===t?r:t%2==1?g(e,t-1,r*e):g(e*e,t/2,r)};n({target:"Number",proto:!0,forced:i&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o(function(){i.call({})})},{toFixed:function(e){function t(e,t){for(var r=-1,n=t;++r<6;)n+=e*c[r],c[r]=n%1e7,n=m(n/1e7)}function r(e){for(var t=6,r=0;0<=--t;)r+=c[t],c[t]=m(r/e),r=r%e*1e7}function n(){for(var e=6,t="";0<=--e;)if(""!==t||0===e||0!==c[e]){var r=String(c[e]);t=""===t?r:t+y.call("0",7-r.length)+r}return t}var o,i,a,s,l=p(this),u=h(e),c=[0,0,0,0,0,0],d="",f="0";if(u<0||20<u)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||1e21<=l)return String(l);if(l<0&&(d="-",l=-l),1e-21<l)if(i=(o=function(e){for(var t=0,r=e;4096<=r;)t+=12,r/=4096;for(;2<=r;)t+=1,r/=2;return t}(l*g(2,69,1))-69)<0?l*g(2,-o,1):l/g(2,o,1),i*=4503599627370496,0<(o=52-o)){for(t(0,i),a=u;7<=a;)t(1e7,0),a-=7;for(t(g(10,a,1),0),a=o-1;23<=a;)r(1<<23),a-=23;r(1<<a),t(1,1),r(2),f=n()}else t(0,i),t(1<<-o,0),f=n()+y.call("0",u);return f=0<u?d+((s=f.length)<=u?"0."+y.call("0",u-s)+f:f.slice(0,s-u)+"."+f.slice(s-u)):d+f}})},{"../internals/export":49,"../internals/fails":50,"../internals/string-repeat":124,"../internals/this-number-value":128,"../internals/to-integer":132}],170:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/object-assign");n({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},{"../internals/export":49,"../internals/object-assign":88}],171:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/fails"),i=e("../internals/object-get-own-property-names-external").f;n({target:"Object",stat:!0,forced:o(function(){return!Object.getOwnPropertyNames(1)})},{getOwnPropertyNames:i})},{"../internals/export":49,"../internals/fails":50,"../internals/object-get-own-property-names-external":93}],172:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/fails"),i=e("../internals/to-object"),a=e("../internals/object-get-prototype-of"),s=e("../internals/correct-prototype-getter");n({target:"Object",stat:!0,forced:o(function(){a(1)}),sham:!s},{getPrototypeOf:function(e){return a(i(e))}})},{"../internals/correct-prototype-getter":34,"../internals/export":49,"../internals/fails":50,"../internals/object-get-prototype-of":96,"../internals/to-object":134}],173:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/to-object"),i=e("../internals/object-keys");n({target:"Object",stat:!0,forced:e("../internals/fails")(function(){i(1)})},{keys:function(e){return i(o(e))}})},{"../internals/export":49,"../internals/fails":50,"../internals/object-keys":98,"../internals/to-object":134}],174:[function(e,t,r){var n=e("../internals/to-string-tag-support"),o=e("../internals/redefine"),i=e("../internals/object-to-string");n||o(Object.prototype,"toString",i,{unsafe:!0})},{"../internals/object-to-string":101,"../internals/redefine":107,"../internals/to-string-tag-support":138}],175:[function(e,t,r){"use strict";function y(e){var t;return!(!x(e)||"function"!=typeof(t=e.then))&&t}function i(d,f,h){if(!f.notified){f.notified=!0;var p=f.reactions;L(function(){for(var e=f.value,t=1==f.state,r=0;p.length>r;){var n,o,i,a=p[r++],s=t?a.ok:a.fail,l=a.resolve,u=a.reject,c=a.domain;try{s?(t||(2===f.rejection&&oe(d,f),f.rejection=1),!0===s?n=e:(c&&c.enter(),n=s(e),c&&(c.exit(),i=!0)),n===a.promise?u(q("Promise-chain cycle")):(o=y(n))?o.call(n,l,u):l(n)):u(e)}catch(e){c&&!i&&c.exit(),u(e)}}f.reactions=[],f.notified=!1,h&&!f.rejection&&re(d,f)})}}function o(e,t,r){var n,o;J?((n=W.createEvent("Event")).promise=t,n.reason=r,n.initEvent(e,!1,!0),h.dispatchEvent(n)):n={promise:t,reason:r},(o=h["on"+e])?o(n):e===$&&k("Unhandled promise rejection",r)}function a(t,r,n,o){return function(e){t(r,n,e,o)}}function s(e,t,r,n){t.done||(t.done=!0,n&&(t=n),t.value=r,t.state=2,i(e,t,!0))}var n,l,u,c,d=e("../internals/export"),f=e("../internals/is-pure"),h=e("../internals/global"),p=e("../internals/get-built-in"),m=e("../internals/native-promise-constructor"),g=e("../internals/redefine"),v=e("../internals/redefine-all"),b=e("../internals/set-to-string-tag"),_=e("../internals/set-species"),x=e("../internals/is-object"),w=e("../internals/a-function"),S=e("../internals/an-instance"),j=e("../internals/classof-raw"),M=e("../internals/inspect-source"),E=e("../internals/iterate"),T=e("../internals/check-correctness-of-iteration"),O=e("../internals/species-constructor"),C=e("../internals/task").set,L=e("../internals/microtask"),P=e("../internals/promise-resolve"),k=e("../internals/host-report-errors"),A=e("../internals/new-promise-capability"),R=e("../internals/perform"),D=e("../internals/internal-state"),I=e("../internals/is-forced"),U=e("../internals/well-known-symbol"),N=e("../internals/engine-v8-version"),F=U("species"),B="Promise",G=D.get,V=D.set,z=D.getterFor(B),H=m,q=h.TypeError,W=h.document,X=h.process,Y=p("fetch"),Z=A.f,Q=Z,K="process"==j(X),J=!!(W&&W.createEvent&&h.dispatchEvent),$="unhandledrejection",ee=I(B,function(){if(!(M(H)!==String(H))){if(66===N)return!0;if(!K&&"function"!=typeof PromiseRejectionEvent)return!0}if(f&&!H.prototype.finally)return!0;if(51<=N&&/native code/.test(H))return!1;function e(e){e(function(){},function(){})}var t=H.resolve(1);return(t.constructor={})[F]=e,!(t.then(function(){})instanceof e)}),te=ee||!T(function(e){H.all(e).catch(function(){})}),re=function(r,n){C.call(h,function(){var e,t=n.value;if(ne(n)&&(e=R(function(){K?X.emit("unhandledRejection",t,r):o($,r,t)}),n.rejection=K||ne(n)?2:1,e.error))throw e.value})},ne=function(e){return 1!==e.rejection&&!e.parent},oe=function(e,t){C.call(h,function(){K?X.emit("rejectionHandled",e):o("rejectionhandled",e,t.value)})},ie=function(r,n,e,t){if(!n.done){n.done=!0,t&&(n=t);try{if(r===e)throw q("Promise can't be resolved itself");var o=y(e);o?L(function(){var t={done:!1};try{o.call(e,a(ie,r,t,n),a(s,r,t,n))}catch(e){s(r,t,e,n)}}):(n.value=e,n.state=1,i(r,n,!1))}catch(e){s(r,{done:!1},e,n)}}};ee&&(H=function(e){S(this,H,B),w(e),n.call(this);var t=G(this);try{e(a(ie,this,t),a(s,this,t))}catch(e){s(this,t,e)}},(n=function(){V(this,{type:B,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=v(H.prototype,{then:function(e,t){var r=z(this),n=Z(O(this,H));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=K?X.domain:void 0,r.parent=!0,r.reactions.push(n),0!=r.state&&i(this,r,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),l=function(){var e=new n,t=G(e);this.promise=e,this.resolve=a(ie,e,t),this.reject=a(s,e,t)},A.f=Z=function(e){return e===H||e===u?new l(e):Q(e)},f||"function"!=typeof m||(c=m.prototype.then,g(m.prototype,"then",function(e,t){var r=this;return new H(function(e,t){c.call(r,e,t)}).then(e,t)},{unsafe:!0}),"function"==typeof Y&&d({global:!0,enumerable:!0,forced:!0},{fetch:function(e){return P(H,Y.apply(h,arguments))}}))),d({global:!0,wrap:!0,forced:ee},{Promise:H}),b(H,B,!1,!0),_(B),u=p(B),d({target:B,stat:!0,forced:ee},{reject:function(e){var t=Z(this);return t.reject.call(void 0,e),t.promise}}),d({target:B,stat:!0,forced:f||ee},{resolve:function(e){return P(f&&this===u?H:this,e)}}),d({target:B,stat:!0,forced:te},{all:function(e){var s=this,t=Z(s),l=t.resolve,u=t.reject,r=R(function(){var n=w(s.resolve),o=[],i=0,a=1;E(e,function(e){var t=i++,r=!1;o.push(void 0),a++,n.call(s,e).then(function(e){r||(r=!0,o[t]=e,--a||l(o))},u)}),--a||l(o)});return r.error&&u(r.value),t.promise},race:function(e){var r=this,n=Z(r),o=n.reject,t=R(function(){var t=w(r.resolve);E(e,function(e){t.call(r,e).then(n.resolve,o)})});return t.error&&o(t.value),n.promise}})},{"../internals/a-function":5,"../internals/an-instance":9,"../internals/check-correctness-of-iteration":27,"../internals/classof-raw":28,"../internals/engine-v8-version":47,"../internals/export":49,"../internals/get-built-in":55,"../internals/global":58,"../internals/host-report-errors":61,"../internals/inspect-source":67,"../internals/internal-state":69,"../internals/is-forced":72,"../internals/is-object":73,"../internals/is-pure":74,"../internals/iterate":76,"../internals/microtask":80,"../internals/native-promise-constructor":81,"../internals/new-promise-capability":85,"../internals/perform":104,"../internals/promise-resolve":105,"../internals/redefine":107,"../internals/redefine-all":106,"../internals/set-species":115,"../internals/set-to-string-tag":116,"../internals/species-constructor":120,"../internals/task":127,"../internals/well-known-symbol":145}],176:[function(e,t,r){var n=e("../internals/export"),o=e("../internals/get-built-in"),l=e("../internals/a-function"),u=e("../internals/an-object"),c=e("../internals/is-object"),d=e("../internals/object-create"),f=e("../internals/function-bind"),i=e("../internals/fails"),h=o("Reflect","construct"),p=i(function(){function e(){}return!(h(function(){},[],e)instanceof e)}),y=!i(function(){h(function(){})}),a=p||y;n({target:"Reflect",stat:!0,forced:a,sham:a},{construct:function(e,t,r){l(e),u(t);var n=arguments.length<3?e:l(r);if(y&&!p)return h(e,t,n);if(e==n){switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3])}var o=[null];return o.push.apply(o,t),new(f.apply(e,o))}var i=n.prototype,a=d(c(i)?i:Object.prototype),s=Function.apply.call(e,a,t);return c(s)?s:a}})},{"../internals/a-function":5,"../internals/an-object":10,"../internals/export":49,"../internals/fails":50,"../internals/function-bind":54,"../internals/get-built-in":55,"../internals/is-object":73,"../internals/object-create":89}],177:[function(e,t,r){var n=e("../internals/descriptors"),o=e("../internals/global"),i=e("../internals/is-forced"),s=e("../internals/inherit-if-required"),a=e("../internals/object-define-property").f,l=e("../internals/object-get-own-property-names").f,u=e("../internals/is-regexp"),c=e("../internals/regexp-flags"),d=e("../internals/regexp-sticky-helpers"),f=e("../internals/redefine"),h=e("../internals/fails"),p=e("../internals/internal-state").set,y=e("../internals/set-species"),m=e("../internals/well-known-symbol")("match"),g=o.RegExp,v=g.prototype,b=/a/g,_=/a/g,x=new g(b)!==b,w=d.UNSUPPORTED_Y;if(n&&i("RegExp",!x||w||h(function(){return _[m]=!1,g(b)!=b||g(_)==_||"/a/i"!=g(b,"i")}))){function S(t){t in j||a(j,t,{configurable:!0,get:function(){return g[t]},set:function(e){g[t]=e}})}for(var j=function(e,t){var r,n=this instanceof j,o=u(e),i=void 0===t;if(!n&&o&&e.constructor===j&&i)return e;x?o&&!i&&(e=e.source):e instanceof j&&(i&&(t=c.call(e)),e=e.source),w&&(r=!!t&&-1<t.indexOf("y"))&&(t=t.replace(/y/g,""));var a=s(x?new g(e,t):g(e,t),n?this:v,j);return w&&r&&p(a,{sticky:r}),a},M=l(g),E=0;M.length>E;)S(M[E++]);(v.constructor=j).prototype=v,f(o,"RegExp",j)}y("RegExp")},{"../internals/descriptors":42,"../internals/fails":50,"../internals/global":58,"../internals/inherit-if-required":66,"../internals/internal-state":69,"../internals/is-forced":72,"../internals/is-regexp":75,"../internals/object-define-property":91,"../internals/object-get-own-property-names":94,"../internals/redefine":107,"../internals/regexp-flags":110,"../internals/regexp-sticky-helpers":111,"../internals/set-species":115,"../internals/well-known-symbol":145}],178:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/regexp-exec");n({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},{"../internals/export":49,"../internals/regexp-exec":109}],179:[function(e,t,r){"use strict";var n=e("../internals/redefine"),o=e("../internals/an-object"),i=e("../internals/fails"),a=e("../internals/regexp-flags"),s="toString",l=RegExp.prototype,u=l[s],c=i(function(){return"/a/b"!=u.call({source:"a",flags:"b"})}),d=u.name!=s;(c||d)&&n(RegExp.prototype,s,function(){var e=o(this),t=String(e.source),r=e.flags;return"/"+t+"/"+String(void 0===r&&e instanceof RegExp&&!("flags"in l)?a.call(e):r)},{unsafe:!0})},{"../internals/an-object":10,"../internals/fails":50,"../internals/redefine":107,"../internals/regexp-flags":110}],180:[function(e,t,r){"use strict";var n=e("../internals/collection"),o=e("../internals/collection-strong");t.exports=n("Set",function(t){return function(e){return t(this,arguments.length?e:void 0)}},o)},{"../internals/collection":31,"../internals/collection-strong":30}],181:[function(e,t,r){"use strict";var n,o=e("../internals/export"),i=e("../internals/object-get-own-property-descriptor").f,s=e("../internals/to-length"),l=e("../internals/not-a-regexp"),u=e("../internals/require-object-coercible"),a=e("../internals/correct-is-regexp-logic"),c=e("../internals/is-pure"),d="".endsWith,f=Math.min,h=a("endsWith");o({target:"String",proto:!0,forced:!!(c||h||(!(n=i(String.prototype,"endsWith"))||n.writable))&&!h},{endsWith:function(e,t){var r=String(u(this));l(e);var n=1<arguments.length?t:void 0,o=s(r.length),i=void 0===n?o:f(s(n),o),a=String(e);return d?d.call(r,a,i):r.slice(i-a.length,i)===a}})},{"../internals/correct-is-regexp-logic":33,"../internals/export":49,"../internals/is-pure":74,"../internals/not-a-regexp":86,"../internals/object-get-own-property-descriptor":92,"../internals/require-object-coercible":112,"../internals/to-length":133}],182:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/not-a-regexp"),i=e("../internals/require-object-coercible");n({target:"String",proto:!0,forced:!e("../internals/correct-is-regexp-logic")("includes")},{includes:function(e,t){return!!~String(i(this)).indexOf(o(e),1<arguments.length?t:void 0)}})},{"../internals/correct-is-regexp-logic":33,"../internals/export":49,"../internals/not-a-regexp":86,"../internals/require-object-coercible":112}],183:[function(e,t,r){"use strict";var o=e("../internals/string-multibyte").charAt,n=e("../internals/internal-state"),i=e("../internals/define-iterator"),a="String Iterator",s=n.set,l=n.getterFor(a);i(String,"String",function(e){s(this,{type:a,string:String(e),index:0})},function(){var e,t=l(this),r=t.string,n=t.index;return n>=r.length?{value:void 0,done:!0}:(e=o(r,n),t.index+=e.length,{value:e,done:!1})})},{"../internals/define-iterator":40,"../internals/internal-state":69,"../internals/string-multibyte":122}],184:[function(e,t,r){"use strict";var n=e("../internals/fix-regexp-well-known-symbol-logic"),d=e("../internals/an-object"),f=e("../internals/to-length"),o=e("../internals/require-object-coercible"),h=e("../internals/advance-string-index"),p=e("../internals/regexp-exec-abstract");n("match",1,function(n,u,c){return[function(e){var t=o(this),r=null==e?void 0:e[n];return void 0!==r?r.call(e,t):new RegExp(e)[n](String(t))},function(e){var t=c(u,e,this);if(t.done)return t.value;var r=d(e),n=String(this);if(!r.global)return p(r,n);for(var o,i=r.unicode,a=[],s=r.lastIndex=0;null!==(o=p(r,n));){var l=String(o[0]);""===(a[s]=l)&&(r.lastIndex=h(n,f(r.lastIndex),i)),s++}return 0===s?null:a}]})},{"../internals/advance-string-index":8,"../internals/an-object":10,"../internals/fix-regexp-well-known-symbol-logic":51,"../internals/regexp-exec-abstract":108,"../internals/require-object-coercible":112,"../internals/to-length":133}],185:[function(e,t,r){e("../internals/export")({target:"String",proto:!0},{repeat:e("../internals/string-repeat")})},{"../internals/export":49,"../internals/string-repeat":124}],186:[function(e,t,r){"use strict";var n=e("../internals/fix-regexp-well-known-symbol-logic"),T=e("../internals/an-object"),f=e("../internals/to-object"),O=e("../internals/to-length"),C=e("../internals/to-integer"),i=e("../internals/require-object-coercible"),L=e("../internals/advance-string-index"),P=e("../internals/regexp-exec-abstract"),k=Math.max,A=Math.min,h=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,y=/\$([$&'`]|\d\d?)/g;n("replace",2,function(o,x,w,e){var S=e.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,j=e.REPLACE_KEEPS_$0,M=S?"$":"$0";return[function(e,t){var r=i(this),n=null==e?void 0:e[o];return void 0!==n?n.call(e,r,t):x.call(String(r),e,t)},function(e,t){if(!S&&j||"string"==typeof t&&-1===t.indexOf(M)){var r=w(x,e,this,t);if(r.done)return r.value}var n=T(e),o=String(this),i="function"==typeof t;i||(t=String(t));var a=n.global;if(a){var s=n.unicode;n.lastIndex=0}for(var l=[];;){var u=P(n,o);if(null===u)break;if(l.push(u),!a)break;""===String(u[0])&&(n.lastIndex=L(o,O(n.lastIndex),s))}for(var c,d="",f=0,h=0;h<l.length;h++){u=l[h];for(var p=String(u[0]),y=k(A(C(u.index),o.length),0),m=[],g=1;g<u.length;g++)m.push(void 0===(c=u[g])?c:String(c));var v=u.groups;if(i){var b=[p].concat(m,y,o);void 0!==v&&b.push(v);var _=String(t.apply(void 0,b))}else _=E(p,o,y,m,v,t);f<=y&&(d+=o.slice(f,y)+_,f=y+p.length)}return d+o.slice(f)}];function E(i,a,s,l,u,e){var c=s+i.length,d=l.length,t=y;return void 0!==u&&(u=f(u),t=p),x.call(e,t,function(e,t){var r;switch(t.charAt(0)){case"$":return"$";case"&":return i;case"`":return a.slice(0,s);case"'":return a.slice(c);case"<":r=u[t.slice(1,-1)];break;default:var n=+t;if(0==n)return e;if(d<n){var o=h(n/10);return 0===o?e:o<=d?void 0===l[o-1]?t.charAt(1):l[o-1]+t.charAt(1):e}r=l[n-1]}return void 0===r?"":r})}})},{"../internals/advance-string-index":8,"../internals/an-object":10,"../internals/fix-regexp-well-known-symbol-logic":51,"../internals/regexp-exec-abstract":108,"../internals/require-object-coercible":112,"../internals/to-integer":132,"../internals/to-length":133,"../internals/to-object":134}],187:[function(e,t,r){"use strict";var n=e("../internals/fix-regexp-well-known-symbol-logic"),l=e("../internals/an-object"),o=e("../internals/require-object-coercible"),u=e("../internals/same-value"),c=e("../internals/regexp-exec-abstract");n("search",1,function(n,a,s){return[function(e){var t=o(this),r=null==e?void 0:e[n];return void 0!==r?r.call(e,t):new RegExp(e)[n](String(t))},function(e){var t=s(a,e,this);if(t.done)return t.value;var r=l(e),n=String(this),o=r.lastIndex;u(o,0)||(r.lastIndex=0);var i=c(r,n);return u(r.lastIndex,o)||(r.lastIndex=o),null===i?-1:i.index}]})},{"../internals/an-object":10,"../internals/fix-regexp-well-known-symbol-logic":51,"../internals/regexp-exec-abstract":108,"../internals/require-object-coercible":112,"../internals/same-value":113}],188:[function(e,t,r){"use strict";var n=e("../internals/fix-regexp-well-known-symbol-logic"),d=e("../internals/is-regexp"),b=e("../internals/an-object"),f=e("../internals/require-object-coercible"),_=e("../internals/species-constructor"),x=e("../internals/advance-string-index"),w=e("../internals/to-length"),S=e("../internals/regexp-exec-abstract"),h=e("../internals/regexp-exec"),o=e("../internals/fails"),p=[].push,j=Math.min,M=4294967295,E=!o(function(){return!RegExp(M,"y")});n("split",2,function(o,m,g){var v;return v="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||1<".".split(/()()/).length||"".split(/.?/).length?function(e,t){var r=String(f(this)),n=void 0===t?M:t>>>0;if(0==n)return[];if(void 0===e)return[r];if(!d(e))return m.call(r,e,n);for(var o,i,a,s=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),u=0,c=new RegExp(e.source,l+"g");(o=h.call(c,r))&&!(u<(i=c.lastIndex)&&(s.push(r.slice(u,o.index)),1<o.length&&o.index<r.length&&p.apply(s,o.slice(1)),a=o[0].length,u=i,s.length>=n));)c.lastIndex===o.index&&c.lastIndex++;return u===r.length?!a&&c.test("")||s.push(""):s.push(r.slice(u)),s.length>n?s.slice(0,n):s}:"0".split(void 0,0).length?function(e,t){return void 0===e&&0===t?[]:m.call(this,e,t)}:m,[function(e,t){var r=f(this),n=null==e?void 0:e[o];return void 0!==n?n.call(e,r,t):v.call(String(r),e,t)},function(e,t){var r=g(v,e,this,t,v!==m);if(r.done)return r.value;var n=b(e),o=String(this),i=_(n,RegExp),a=n.unicode,s=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.unicode?"u":"")+(E?"y":"g"),l=new i(E?n:"^(?:"+n.source+")",s),u=void 0===t?M:t>>>0;if(0==u)return[];if(0===o.length)return null===S(l,o)?[o]:[];for(var c=0,d=0,f=[];d<o.length;){l.lastIndex=E?d:0;var h,p=S(l,E?o:o.slice(d));if(null===p||(h=j(w(l.lastIndex+(E?0:d)),o.length))===c)d=x(o,d,a);else{if(f.push(o.slice(c,d)),f.length===u)return f;for(var y=1;y<=p.length-1;y++)if(f.push(p[y]),f.length===u)return f;d=c=h}}return f.push(o.slice(c)),f}]},!E)},{"../internals/advance-string-index":8,"../internals/an-object":10,"../internals/fails":50,"../internals/fix-regexp-well-known-symbol-logic":51,"../internals/is-regexp":75,"../internals/regexp-exec":109,"../internals/regexp-exec-abstract":108,"../internals/require-object-coercible":112,"../internals/species-constructor":120,"../internals/to-length":133}],189:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/create-html");n({target:"String",proto:!0,forced:e("../internals/string-html-forced")("sub")},{sub:function(){return o(this,"sub","","")}})},{"../internals/create-html":35,"../internals/export":49,"../internals/string-html-forced":121}],190:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/string-trim").trim;n({target:"String",proto:!0,forced:e("../internals/string-trim-forced")("trim")},{trim:function(){return o(this)}})},{"../internals/export":49,"../internals/string-trim":126,"../internals/string-trim-forced":125}],191:[function(e,t,r){"use strict";var n=e("../internals/export"),o=e("../internals/descriptors"),i=e("../internals/global"),a=e("../internals/has"),s=e("../internals/is-object"),l=e("../internals/object-define-property").f,u=e("../internals/copy-constructor-properties"),c=i.Symbol;if(o&&"function"==typeof c&&(!("description"in c.prototype)||void 0!==c().description)){var d={},f=function(e){var t=arguments.length<1||void 0===e?void 0:String(e),r=this instanceof f?new c(t):void 0===t?c():c(t);return""===t&&(d[r]=!0),r};u(f,c);var h=f.prototype=c.prototype;h.constructor=f;var p=h.toString,y="Symbol(test)"==String(c("test")),m=/^Symbol\((.*)\)[^)]+$/;l(h,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=p.call(e);if(a(d,e))return"";var r=y?t.slice(7,-1):t.replace(m,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:f})}},{"../internals/copy-constructor-properties":32,"../internals/descriptors":42,"../internals/export":49,"../internals/global":58,"../internals/has":59,"../internals/is-object":73,"../internals/object-define-property":91}],192:[function(e,t,r){e("../internals/define-well-known-symbol")("iterator")},{"../internals/define-well-known-symbol":41}],193:[function(e,t,r){"use strict";function o(e,t){var r=re[e]=S(Q[q]);return X(r,{type:H,tag:e,description:t}),d||(r.description=t),r}function n(t,e){v(t);var r=_(e),n=j(r).concat(he(r));return V(n,function(e){d&&!fe.call(r,e)||de(t,e,r[e])}),t}function i(e,t){var r=_(e),n=x(t,!0);if(r!==Z||!y(re,n)||y(ne,n)){var o=J(r,n);return!o||!y(re,n)||y(r,z)&&r[z][n]||(o.enumerable=!0),o}}function a(e){var t=ee(_(e)),r=[];return V(t,function(e){y(re,e)||y(D,e)||r.push(e)}),r}var s=e("../internals/export"),l=e("../internals/global"),u=e("../internals/get-built-in"),c=e("../internals/is-pure"),d=e("../internals/descriptors"),f=e("../internals/native-symbol"),h=e("../internals/use-symbol-as-uid"),p=e("../internals/fails"),y=e("../internals/has"),m=e("../internals/is-array"),g=e("../internals/is-object"),v=e("../internals/an-object"),b=e("../internals/to-object"),_=e("../internals/to-indexed-object"),x=e("../internals/to-primitive"),w=e("../internals/create-property-descriptor"),S=e("../internals/object-create"),j=e("../internals/object-keys"),M=e("../internals/object-get-own-property-names"),E=e("../internals/object-get-own-property-names-external"),T=e("../internals/object-get-own-property-symbols"),O=e("../internals/object-get-own-property-descriptor"),C=e("../internals/object-define-property"),L=e("../internals/object-property-is-enumerable"),P=e("../internals/create-non-enumerable-property"),k=e("../internals/redefine"),A=e("../internals/shared"),R=e("../internals/shared-key"),D=e("../internals/hidden-keys"),I=e("../internals/uid"),U=e("../internals/well-known-symbol"),N=e("../internals/well-known-symbol-wrapped"),F=e("../internals/define-well-known-symbol"),B=e("../internals/set-to-string-tag"),G=e("../internals/internal-state"),V=e("../internals/array-iteration").forEach,z=R("hidden"),H="Symbol",q="prototype",W=U("toPrimitive"),X=G.set,Y=G.getterFor(H),Z=Object[q],Q=l.Symbol,K=u("JSON","stringify"),J=O.f,$=C.f,ee=E.f,te=L.f,re=A("symbols"),ne=A("op-symbols"),oe=A("string-to-symbol-registry"),ie=A("symbol-to-string-registry"),ae=A("wks"),se=l.QObject,le=!se||!se[q]||!se[q].findChild,ue=d&&p(function(){return 7!=S($({},"a",{get:function(){return $(this,"a",{value:7}).a}})).a})?function(e,t,r){var n=J(Z,t);n&&delete Z[t],$(e,t,r),n&&e!==Z&&$(Z,t,n)}:$,ce=h?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof Q},de=function(e,t,r){e===Z&&de(ne,t,r),v(e);var n=x(t,!0);return v(r),y(re,n)?(r.enumerable?(y(e,z)&&e[z][n]&&(e[z][n]=!1),r=S(r,{enumerable:w(0,!1)})):(y(e,z)||$(e,z,w(1,{})),e[z][n]=!0),ue(e,n,r)):$(e,n,r)},fe=function(e){var t=x(e,!0),r=te.call(this,t);return!(this===Z&&y(re,t)&&!y(ne,t))&&(!(r||!y(this,t)||!y(re,t)||y(this,z)&&this[z][t])||r)},he=function(e){var t=e===Z,r=ee(t?ne:_(e)),n=[];return V(r,function(e){!y(re,e)||t&&!y(Z,e)||n.push(re[e])}),n};f||(k((Q=function(e){if(this instanceof Q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==e?String(e):void 0,r=I(t),n=function(e){this===Z&&n.call(ne,e),y(this,z)&&y(this[z],r)&&(this[z][r]=!1),ue(this,r,w(1,e))};return d&&le&&ue(Z,r,{configurable:!0,set:n}),o(r,t)})[q],"toString",function(){return Y(this).tag}),k(Q,"withoutSetter",function(e){return o(I(e),e)}),L.f=fe,C.f=de,O.f=i,M.f=E.f=a,T.f=he,N.f=function(e){return o(U(e),e)},d&&($(Q[q],"description",{configurable:!0,get:function(){return Y(this).description}}),c||k(Z,"propertyIsEnumerable",fe,{unsafe:!0}))),s({global:!0,wrap:!0,forced:!f,sham:!f},{Symbol:Q}),V(j(ae),function(e){F(e)}),s({target:H,stat:!0,forced:!f},{for:function(e){var t=String(e);if(y(oe,t))return oe[t];var r=Q(t);return oe[t]=r,ie[r]=t,r},keyFor:function(e){if(!ce(e))throw TypeError(e+" is not a symbol");if(y(ie,e))return ie[e]},useSetter:function(){le=!0},useSimple:function(){le=!1}}),s({target:"Object",stat:!0,forced:!f,sham:!d},{create:function(e,t){return void 0===t?S(e):n(S(e),t)},defineProperty:de,defineProperties:n,getOwnPropertyDescriptor:i}),s({target:"Object",stat:!0,forced:!f},{getOwnPropertyNames:a,getOwnPropertySymbols:he}),s({target:"Object",stat:!0,forced:p(function(){T.f(1)})},{getOwnPropertySymbols:function(e){return T.f(b(e))}}),K&&s({target:"JSON",stat:!0,forced:!f||p(function(){var e=Q();return"[null]"!=K([e])||"{}"!=K({a:e})||"{}"!=K(Object(e))})},{stringify:function(e,t,r){for(var n,o=[e],i=1;i<arguments.length;)o.push(arguments[i++]);if((g(n=t)||void 0!==e)&&!ce(e))return m(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!ce(t))return t}),o[1]=t,K.apply(null,o)}});Q[q][W]||P(Q[q],W,Q[q].valueOf),B(Q,H),D[z]=!0},{"../internals/an-object":10,"../internals/array-iteration":19,"../internals/create-non-enumerable-property":37,"../internals/create-property-descriptor":38,"../internals/define-well-known-symbol":41,"../internals/descriptors":42,"../internals/export":49,"../internals/fails":50,"../internals/get-built-in":55,"../internals/global":58,"../internals/has":59,"../internals/hidden-keys":60,"../internals/internal-state":69,"../internals/is-array":71,"../internals/is-object":73,"../internals/is-pure":74,"../internals/native-symbol":82,"../internals/object-create":89,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/object-get-own-property-names":94,"../internals/object-get-own-property-names-external":93,"../internals/object-get-own-property-symbols":95,"../internals/object-keys":98,"../internals/object-property-is-enumerable":99,"../internals/redefine":107,"../internals/set-to-string-tag":116,"../internals/shared":119,"../internals/shared-key":117,"../internals/to-indexed-object":131,"../internals/to-object":134,"../internals/to-primitive":137,"../internals/uid":142,"../internals/use-symbol-as-uid":143,"../internals/well-known-symbol":145,"../internals/well-known-symbol-wrapped":144}],194:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-copy-within"),i=n.aTypedArray;(0,n.exportTypedArrayMethod)("copyWithin",function(e,t,r){return o.call(i(this),e,t,2<arguments.length?r:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-copy-within":14}],195:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-iteration").every,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("every",function(e,t){return o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19}],196:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-fill"),i=n.aTypedArray;(0,n.exportTypedArrayMethod)("fill",function(e){return o.apply(i(this),arguments)})},{"../internals/array-buffer-view-core":12,"../internals/array-fill":15}],197:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),s=e("../internals/array-iteration").filter,l=e("../internals/species-constructor"),u=n.aTypedArray,c=n.aTypedArrayConstructor;(0,n.exportTypedArrayMethod)("filter",function(e,t){for(var r=s(u(this),e,1<arguments.length?t:void 0),n=l(this,this.constructor),o=0,i=r.length,a=new(c(n))(i);o<i;)a[o]=r[o++];return a})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19,"../internals/species-constructor":120}],198:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-iteration").findIndex,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("findIndex",function(e,t){return o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19}],199:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-iteration").find,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("find",function(e,t){return o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19}],200:[function(e,t,r){e("../internals/typed-array-constructor")("Float32",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],201:[function(e,t,r){e("../internals/typed-array-constructor")("Float64",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],202:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-iteration").forEach,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("forEach",function(e,t){o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19}],203:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-includes").includes,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("includes",function(e,t){return o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-includes":18}],204:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-includes").indexOf,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("indexOf",function(e,t){return o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-includes":18}],205:[function(e,t,r){e("../internals/typed-array-constructor")("Int16",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],206:[function(e,t,r){e("../internals/typed-array-constructor")("Int32",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],207:[function(e,t,r){"use strict";function n(){return u.call(f(this))}var o=e("../internals/global"),i=e("../internals/array-buffer-view-core"),a=e("../modules/es.array.iterator"),s=e("../internals/well-known-symbol")("iterator"),l=o.Uint8Array,u=a.values,c=a.keys,d=a.entries,f=i.aTypedArray,h=i.exportTypedArrayMethod,p=l&&l.prototype[s],y=!!p&&("values"==p.name||null==p.name);h("entries",function(){return d.call(f(this))}),h("keys",function(){return c.call(f(this))}),h("values",n,!y),h(s,n,!y)},{"../internals/array-buffer-view-core":12,"../internals/global":58,"../internals/well-known-symbol":145,"../modules/es.array.iterator":156}],208:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=n.aTypedArray,i=n.exportTypedArrayMethod,a=[].join;i("join",function(e){return a.apply(o(this),arguments)})},{"../internals/array-buffer-view-core":12}],209:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-last-index-of"),i=n.aTypedArray;(0,n.exportTypedArrayMethod)("lastIndexOf",function(e){return o.apply(i(this),arguments)})},{"../internals/array-buffer-view-core":12,"../internals/array-last-index-of":20}],210:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-iteration").map,i=e("../internals/species-constructor"),a=n.aTypedArray,s=n.aTypedArrayConstructor;(0,n.exportTypedArrayMethod)("map",function(e,t){return o(a(this),e,1<arguments.length?t:void 0,function(e,t){return new(s(i(e,e.constructor)))(t)})})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19,"../internals/species-constructor":120}],211:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-reduce").right,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("reduceRight",function(e,t){return o(i(this),e,arguments.length,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-reduce":24}],212:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-reduce").left,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("reduce",function(e,t){return o(i(this),e,arguments.length,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-reduce":24}],213:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=n.aTypedArray,i=n.exportTypedArrayMethod,a=Math.floor;i("reverse",function(){for(var e,t=o(this).length,r=a(t/2),n=0;n<r;)e=this[n],this[n++]=this[--t],this[t]=e;return this})},{"../internals/array-buffer-view-core":12}],214:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),s=e("../internals/to-length"),l=e("../internals/to-offset"),u=e("../internals/to-object"),o=e("../internals/fails"),c=n.aTypedArray;(0,n.exportTypedArrayMethod)("set",function(e,t){c(this);var r=l(1<arguments.length?t:void 0,1),n=this.length,o=u(e),i=s(o.length),a=0;if(n<i+r)throw RangeError("Wrong length");for(;a<i;)this[r+a]=o[a++]},o(function(){new Int8Array(1).set({})}))},{"../internals/array-buffer-view-core":12,"../internals/fails":50,"../internals/to-length":133,"../internals/to-object":134,"../internals/to-offset":135}],215:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),s=e("../internals/species-constructor"),o=e("../internals/fails"),l=n.aTypedArray,u=n.aTypedArrayConstructor,i=n.exportTypedArrayMethod,c=[].slice;i("slice",function(e,t){for(var r=c.call(l(this),e,t),n=s(this,this.constructor),o=0,i=r.length,a=new(u(n))(i);o<i;)a[o]=r[o++];return a},o(function(){new Int8Array(1).slice()}))},{"../internals/array-buffer-view-core":12,"../internals/fails":50,"../internals/species-constructor":120}],216:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=e("../internals/array-iteration").some,i=n.aTypedArray;(0,n.exportTypedArrayMethod)("some",function(e,t){return o(i(this),e,1<arguments.length?t:void 0)})},{"../internals/array-buffer-view-core":12,"../internals/array-iteration":19}],217:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),o=n.aTypedArray,i=n.exportTypedArrayMethod,a=[].sort;i("sort",function(e){return a.call(o(this),e)})},{"../internals/array-buffer-view-core":12}],218:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core"),i=e("../internals/to-length"),a=e("../internals/to-absolute-index"),s=e("../internals/species-constructor"),l=n.aTypedArray;(0,n.exportTypedArrayMethod)("subarray",function(e,t){var r=l(this),n=r.length,o=a(e,n);return new(s(r,r.constructor))(r.buffer,r.byteOffset+o*r.BYTES_PER_ELEMENT,i((void 0===t?n:a(t,n))-o))})},{"../internals/array-buffer-view-core":12,"../internals/species-constructor":120,"../internals/to-absolute-index":129,"../internals/to-length":133}],219:[function(e,t,r){"use strict";var n=e("../internals/global"),o=e("../internals/array-buffer-view-core"),i=e("../internals/fails"),a=n.Int8Array,s=o.aTypedArray,l=o.exportTypedArrayMethod,u=[].toLocaleString,c=[].slice,d=!!a&&i(function(){u.call(new a(1))});l("toLocaleString",function(){return u.apply(d?c.call(s(this)):s(this),arguments)},i(function(){return[1,2].toLocaleString()!=new a([1,2]).toLocaleString()})||!i(function(){a.prototype.toLocaleString.call([1,2])}))},{"../internals/array-buffer-view-core":12,"../internals/fails":50,"../internals/global":58}],220:[function(e,t,r){"use strict";var n=e("../internals/array-buffer-view-core").exportTypedArrayMethod,o=e("../internals/fails"),i=e("../internals/global").Uint8Array,a=i&&i.prototype||{},s=[].toString,l=[].join;o(function(){s.call({})})&&(s=function(){return l.call(this)}),n("toString",s,a.toString!=s)},{"../internals/array-buffer-view-core":12,"../internals/fails":50,"../internals/global":58}],221:[function(e,t,r){e("../internals/typed-array-constructor")("Uint16",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],222:[function(e,t,r){e("../internals/typed-array-constructor")("Uint32",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],223:[function(e,t,r){e("../internals/typed-array-constructor")("Uint8",function(n){return function(e,t,r){return n(this,e,t,r)}})},{"../internals/typed-array-constructor":139}],224:[function(e,t,r){e("../internals/typed-array-constructor")("Uint8",function(n){return function(e,t,r){return n(this,e,t,r)}},!0)},{"../internals/typed-array-constructor":139}],225:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/dom-iterables"),i=e("../internals/array-for-each"),a=e("../internals/create-non-enumerable-property");for(var s in o){var l=n[s],u=l&&l.prototype;if(u&&u.forEach!==i)try{a(u,"forEach",i)}catch(e){u.forEach=i}}},{"../internals/array-for-each":16,"../internals/create-non-enumerable-property":37,"../internals/dom-iterables":44,"../internals/global":58}],226:[function(e,t,r){var n=e("../internals/global"),o=e("../internals/dom-iterables"),i=e("../modules/es.array.iterator"),a=e("../internals/create-non-enumerable-property"),s=e("../internals/well-known-symbol"),l=s("iterator"),u=s("toStringTag"),c=i.values;for(var d in o){var f=n[d],h=f&&f.prototype;if(h){if(h[l]!==c)try{a(h,l,c)}catch(e){h[l]=c}if(h[u]||a(h,u,d),o[d])for(var p in i)if(h[p]!==i[p])try{a(h,p,i[p])}catch(e){h[p]=i[p]}}}},{"../internals/create-non-enumerable-property":37,"../internals/dom-iterables":44,"../internals/global":58,"../internals/well-known-symbol":145,"../modules/es.array.iterator":156}],227:[function(e,t,r){"use strict";e("../modules/es.array.iterator");function o(t){try{return decodeURIComponent(t)}catch(e){return t}}function a(e){var t,r=e.replace(U," "),n=4;try{return decodeURIComponent(r)}catch(e){for(;n;)r=r.replace((t=n--,N[t-1]||(N[t-1]=RegExp("((?:%[\\da-f]{2}){"+t+"})","gi"))),o);return r}}function n(e){return B[e]}function i(e){return encodeURIComponent(e).replace(F,n)}function f(e,t){if(t)for(var r,n,o=t.split("&"),i=0;i<o.length;)(r=o[i++]).length&&(n=r.split("="),e.push({key:a(n.shift()),value:a(n.join("="))}))}function h(e){this.entries.length=0,f(this.entries,e)}function u(e,t){if(e<t)throw TypeError("Not enough arguments")}var s=e("../internals/export"),l=e("../internals/get-built-in"),c=e("../internals/native-url"),d=e("../internals/redefine"),p=e("../internals/redefine-all"),y=e("../internals/set-to-string-tag"),m=e("../internals/create-iterator-constructor"),g=e("../internals/internal-state"),v=e("../internals/an-instance"),b=e("../internals/has"),_=e("../internals/function-bind-context"),x=e("../internals/classof"),w=e("../internals/an-object"),S=e("../internals/is-object"),j=e("../internals/object-create"),M=e("../internals/create-property-descriptor"),E=e("../internals/get-iterator"),T=e("../internals/get-iterator-method"),O=e("../internals/well-known-symbol"),C=l("fetch"),L=l("Headers"),P=O("iterator"),k="URLSearchParams",A=k+"Iterator",R=g.set,D=g.getterFor(k),I=g.getterFor(A),U=/\+/g,N=Array(4),F=/[!'()~]|%20/g,B={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},G=m(function(e,t){R(this,{type:A,iterator:E(D(e).entries),kind:t})},"Iterator",function(){var e=I(this),t=e.kind,r=e.iterator.next(),n=r.value;return r.done||(r.value="keys"===t?n.key:"values"===t?n.value:[n.key,n.value]),r}),V=function(e){v(this,V,k);var t,r,n,o,i,a,s,l,u,c=0<arguments.length?e:void 0,d=[];if(R(this,{type:k,entries:d,updateURL:function(){},updateSearchParams:h}),void 0!==c)if(S(c))if("function"==typeof(t=T(c)))for(n=(r=t.call(c)).next;!(o=n.call(r)).done;){if((s=(a=(i=E(w(o.value))).next).call(i)).done||(l=a.call(i)).done||!a.call(i).done)throw TypeError("Expected sequence with length 2");d.push({key:s.value+"",value:l.value+""})}else for(u in c)b(c,u)&&d.push({key:u,value:c[u]+""});else f(d,"string"==typeof c?"?"===c.charAt(0)?c.slice(1):c:c+"")},z=V.prototype;p(z,{append:function(e,t){u(arguments.length,2);var r=D(this);r.entries.push({key:e+"",value:t+""}),r.updateURL()},delete:function(e){u(arguments.length,1);for(var t=D(this),r=t.entries,n=e+"",o=0;o<r.length;)r[o].key===n?r.splice(o,1):o++;t.updateURL()},get:function(e){u(arguments.length,1);for(var t=D(this).entries,r=e+"",n=0;n<t.length;n++)if(t[n].key===r)return t[n].value;return null},getAll:function(e){u(arguments.length,1);for(var t=D(this).entries,r=e+"",n=[],o=0;o<t.length;o++)t[o].key===r&&n.push(t[o].value);return n},has:function(e){u(arguments.length,1);for(var t=D(this).entries,r=e+"",n=0;n<t.length;)if(t[n++].key===r)return!0;return!1},set:function(e,t){u(arguments.length,1);for(var r,n=D(this),o=n.entries,i=!1,a=e+"",s=t+"",l=0;l<o.length;l++)(r=o[l]).key===a&&(i?o.splice(l--,1):(i=!0,r.value=s));i||o.push({key:a,value:s}),n.updateURL()},sort:function(){var e,t,r,n=D(this),o=n.entries,i=o.slice();for(r=o.length=0;r<i.length;r++){for(e=i[r],t=0;t<r;t++)if(o[t].key>e.key){o.splice(t,0,e);break}t===r&&o.push(e)}n.updateURL()},forEach:function(e,t){for(var r,n=D(this).entries,o=_(e,1<arguments.length?t:void 0,3),i=0;i<n.length;)o((r=n[i++]).value,r.key,this)},keys:function(){return new G(this,"keys")},values:function(){return new G(this,"values")},entries:function(){return new G(this,"entries")}},{enumerable:!0}),d(z,P,z.entries),d(z,"toString",function(){for(var e,t=D(this).entries,r=[],n=0;n<t.length;)e=t[n++],r.push(i(e.key)+"="+i(e.value));return r.join("&")},{enumerable:!0}),y(V,k),s({global:!0,forced:!c},{URLSearchParams:V}),c||"function"!=typeof C||"function"!=typeof L||s({global:!0,enumerable:!0,forced:!0},{fetch:function(e,t){var r,n,o,i=[e];return 1<arguments.length&&(S(r=t)&&(n=r.body,x(n)===k&&((o=r.headers?new L(r.headers):new L).has("content-type")||o.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),r=j(r,{body:M(0,String(n)),headers:M(0,o)}))),i.push(r)),C.apply(this,i)}}),t.exports={URLSearchParams:V,getState:D}},{"../internals/an-instance":9,"../internals/an-object":10,"../internals/classof":29,"../internals/create-iterator-constructor":36,"../internals/create-property-descriptor":38,"../internals/export":49,"../internals/function-bind-context":53,"../internals/get-built-in":55,"../internals/get-iterator":57,"../internals/get-iterator-method":56,"../internals/has":59,"../internals/internal-state":69,"../internals/is-object":73,"../internals/native-url":83,"../internals/object-create":89,"../internals/redefine":107,"../internals/redefine-all":106,"../internals/set-to-string-tag":116,"../internals/well-known-symbol":145,"../modules/es.array.iterator":156}],228:[function(e,t,r){"use strict";e("../modules/es.string.iterator");function _(e,t){var r,n,o;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return I;if(!(r=Q(t.slice(1,-1))))return I;e.host=r}else if(ne(e)){if(t=m(t),q.test(t))return I;if(null===(r=Z(t)))return I;e.host=r}else{if(W.test(t))return I;for(r="",n=T(t),o=0;o<n.length;o++)r+=te(n[o],K);e.host=r}}function c(e){var t,r,n,o;if("number"==typeof e){for(t=[],r=0;r<4;r++)t.unshift(e%256),e=A(e/256);return t.join(".")}if("object"!=typeof e)return e;for(t="",n=function(e){for(var t=null,r=1,n=null,o=0,i=0;i<8;i++)0!==e[i]?(r<o&&(t=n,r=o),n=null,o=0):(null===n&&(n=i),++o);return r<o&&(t=n,r=o),t}(e),r=0;r<8;r++)o&&0===e[r]||(o=o&&!1,n===r?(t+=r?":":"::",o=!0):(t+=e[r].toString(16),r<7&&(t+=":")));return"["+t+"]"}function x(e){return""!=e.username||""!=e.password}function o(e){return!e.host||e.cannotBeABaseURL||"file"==e.scheme}function w(e,t){var r;return 2==e.length&&N.test(e.charAt(0))&&(":"==(r=e.charAt(1))||!t&&"|"==r)}function S(e){var t;return 1<e.length&&w(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)}function j(e){var t=e.path,r=t.length;!r||"file"==e.scheme&&1==r&&w(t[0],!0)||t.pop()}function d(e,t,r,n){var o,i,a,s,l,u,c=r||oe,d=0,f="",h=!1,p=!1,y=!1;for(r||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(X,"")),t=t.replace(Y,""),o=T(t);d<=o.length;){switch(i=o[d],c){case oe:if(!i||!N.test(i)){if(r)return D;c=ae;continue}f+=i.toLowerCase(),c=ie;break;case ie:if(i&&(F.test(i)||"+"==i||"-"==i||"."==i))f+=i.toLowerCase();else{if(":"!=i){if(r)return D;f="",c=ae,d=0;continue}if(r&&(ne(e)!=E(re,f)||"file"==f&&(x(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=f,r)return void(ne(e)&&re[e.scheme]==e.port&&(e.port=null));f="","file"==e.scheme?c=ge:ne(e)&&n&&n.scheme==e.scheme?c=se:ne(e)?c=de:"/"==o[d+1]?(c=le,d++):(e.cannotBeABaseURL=!0,e.path.push(""),c=we)}break;case ae:if(!n||n.cannotBeABaseURL&&"#"!=i)return D;if(n.cannotBeABaseURL&&"#"==i){e.scheme=n.scheme,e.path=n.path.slice(),e.query=n.query,e.fragment="",e.cannotBeABaseURL=!0,c=je;break}c="file"==n.scheme?ge:ue;continue;case se:if("/"!=i||"/"!=o[d+1]){c=ue;continue}c=fe,d++;break;case le:if("/"==i){c=he;break}c=xe;continue;case ue:if(e.scheme=n.scheme,i==M)e.username=n.username,e.password=n.password,e.host=n.host,e.port=n.port,e.path=n.path.slice(),e.query=n.query;else if("/"==i||"\\"==i&&ne(e))c=ce;else if("?"==i)e.username=n.username,e.password=n.password,e.host=n.host,e.port=n.port,e.path=n.path.slice(),e.query="",c=Se;else{if("#"!=i){e.username=n.username,e.password=n.password,e.host=n.host,e.port=n.port,e.path=n.path.slice(),e.path.pop(),c=xe;continue}e.username=n.username,e.password=n.password,e.host=n.host,e.port=n.port,e.path=n.path.slice(),e.query=n.query,e.fragment="",c=je}break;case ce:if(!ne(e)||"/"!=i&&"\\"!=i){if("/"!=i){e.username=n.username,e.password=n.password,e.host=n.host,e.port=n.port,c=xe;continue}c=he}else c=fe;break;case de:if(c=fe,"/"!=i||"/"!=f.charAt(d+1))continue;d++;break;case fe:if("/"==i||"\\"==i)break;c=he;continue;case he:if("@"==i){h&&(f="%40"+f),h=!0,a=T(f);for(var m=0;m<a.length;m++){var g=a[m];if(":"!=g||y){var v=te(g,ee);y?e.password+=v:e.username+=v}else y=!0}f=""}else if(i==M||"/"==i||"?"==i||"#"==i||"\\"==i&&ne(e)){if(h&&""==f)return"Invalid authority";d-=T(f).length+1,f="",c=pe}else f+=i;break;case pe:case ye:if(r&&"file"==e.scheme){c=be;continue}if(":"!=i||p){if(i==M||"/"==i||"?"==i||"#"==i||"\\"==i&&ne(e)){if(ne(e)&&""==f)return I;if(r&&""==f&&(x(e)||null!==e.port))return;if(s=_(e,f))return s;if(f="",c=_e,r)return;continue}"["==i?p=!0:"]"==i&&(p=!1),f+=i}else{if(""==f)return I;if(s=_(e,f))return s;if(f="",c=me,r==ye)return}break;case me:if(!B.test(i)){if(i==M||"/"==i||"?"==i||"#"==i||"\\"==i&&ne(e)||r){if(""!=f){var b=parseInt(f,10);if(65535<b)return U;e.port=ne(e)&&b===re[e.scheme]?null:b,f=""}if(r)return;c=_e;continue}return U}f+=i;break;case ge:if(e.scheme="file","/"==i||"\\"==i)c=ve;else{if(!n||"file"!=n.scheme){c=xe;continue}if(i==M)e.host=n.host,e.path=n.path.slice(),e.query=n.query;else if("?"==i)e.host=n.host,e.path=n.path.slice(),e.query="",c=Se;else{if("#"!=i){S(o.slice(d).join(""))||(e.host=n.host,e.path=n.path.slice(),j(e)),c=xe;continue}e.host=n.host,e.path=n.path.slice(),e.query=n.query,e.fragment="",c=je}}break;case ve:if("/"==i||"\\"==i){c=be;break}n&&"file"==n.scheme&&!S(o.slice(d).join(""))&&(w(n.path[0],!0)?e.path.push(n.path[0]):e.host=n.host),c=xe;continue;case be:if(i==M||"/"==i||"\\"==i||"?"==i||"#"==i){if(!r&&w(f))c=xe;else if(""==f){if(e.host="",r)return;c=_e}else{if(s=_(e,f))return s;if("localhost"==e.host&&(e.host=""),r)return;f="",c=_e}continue}f+=i;break;case _e:if(ne(e)){if(c=xe,"/"!=i&&"\\"!=i)continue}else if(r||"?"!=i)if(r||"#"!=i){if(i!=M&&(c=xe,"/"!=i))continue}else e.fragment="",c=je;else e.query="",c=Se;break;case xe:if(i==M||"/"==i||"\\"==i&&ne(e)||!r&&("?"==i||"#"==i)){if(".."===(u=(u=f).toLowerCase())||"%2e."===u||".%2e"===u||"%2e%2e"===u?(j(e),"/"==i||"\\"==i&&ne(e)||e.path.push("")):"."===(l=f)||"%2e"===l.toLowerCase()?"/"==i||"\\"==i&&ne(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&w(f)&&(e.host&&(e.host=""),f=f.charAt(0)+":"),e.path.push(f)),f="","file"==e.scheme&&(i==M||"?"==i||"#"==i))for(;1<e.path.length&&""===e.path[0];)e.path.shift();"?"==i?(e.query="",c=Se):"#"==i&&(e.fragment="",c=je)}else f+=te(i,$);break;case we:"?"==i?(e.query="",c=Se):"#"==i?(e.fragment="",c=je):i!=M&&(e.path[0]+=te(i,K));break;case Se:r||"#"!=i?i!=M&&("'"==i&&ne(e)?e.query+="%27":e.query+="#"==i?"%23":te(i,K)):(e.fragment="",c=je);break;case je:i!=M&&(e.fragment+=te(i,J))}d++}}function n(e,t){return{get:e,set:t,configurable:!0,enumerable:!0}}var M,i=e("../internals/export"),f=e("../internals/descriptors"),a=e("../internals/native-url"),s=e("../internals/global"),l=e("../internals/object-define-properties"),u=e("../internals/redefine"),h=e("../internals/an-instance"),E=e("../internals/has"),p=e("../internals/object-assign"),T=e("../internals/array-from"),y=e("../internals/string-multibyte").codeAt,m=e("../internals/string-punycode-to-ascii"),g=e("../internals/set-to-string-tag"),v=e("../modules/web.url-search-params"),b=e("../internals/internal-state"),O=s.URL,C=v.URLSearchParams,L=v.getState,P=b.set,k=b.getterFor("URL"),A=Math.floor,R=Math.pow,D="Invalid scheme",I="Invalid host",U="Invalid port",N=/[A-Za-z]/,F=/[\d+-.A-Za-z]/,B=/\d/,G=/^(0x|0X)/,V=/^[0-7]+$/,z=/^\d+$/,H=/^[\dA-Fa-f]+$/,q=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,W=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,X=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,Y=/[\u0009\u000A\u000D]/g,Z=function(e){var t,r,n,o,i,a,s,l=e.split(".");if(l.length&&""==l[l.length-1]&&l.pop(),4<(t=l.length))return e;for(r=[],n=0;n<t;n++){if(""==(o=l[n]))return e;if(i=10,1<o.length&&"0"==o.charAt(0)&&(i=G.test(o)?16:8,o=o.slice(8==i?1:2)),""===o)a=0;else{if(!(10==i?z:8==i?V:H).test(o))return e;a=parseInt(o,i)}r.push(a)}for(n=0;n<t;n++)if(a=r[n],n==t-1){if(a>=R(256,5-t))return null}else if(255<a)return null;for(s=r.pop(),n=0;n<r.length;n++)s+=r[n]*R(256,3-n);return s},Q=function(e){function t(){return e.charAt(f)}var r,n,o,i,a,s,l,u=[0,0,0,0,0,0,0,0],c=0,d=null,f=0;if(":"==t()){if(":"!=e.charAt(1))return;f+=2,d=++c}for(;t();){if(8==c)return;if(":"!=t()){for(r=n=0;n<4&&H.test(t());)r=16*r+parseInt(t(),16),f++,n++;if("."==t()){if(0==n)return;if(f-=n,6<c)return;for(o=0;t();){if(i=null,0<o){if(!("."==t()&&o<4))return;f++}if(!B.test(t()))return;for(;B.test(t());){if(a=parseInt(t(),10),null===i)i=a;else{if(0==i)return;i=10*i+a}if(255<i)return;f++}u[c]=256*u[c]+i,2!=++o&&4!=o||c++}if(4!=o)return;break}if(":"==t()){if(f++,!t())return}else if(t())return;u[c++]=r}else{if(null!==d)return;f++,d=++c}}if(null!==d)for(s=c-d,c=7;0!=c&&0<s;)l=u[c],u[c--]=u[d+s-1],u[d+--s]=l;else if(8!=c)return;return u},K={},J=p({},K,{" ":1,'"':1,"<":1,">":1,"`":1}),$=p({},J,{"#":1,"?":1,"{":1,"}":1}),ee=p({},$,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),te=function(e,t){var r=y(e,0);return 32<r&&r<127&&!E(t,e)?e:encodeURIComponent(e)},re={ftp:21,file:null,http:80,https:443,ws:80,wss:443},ne=function(e){return E(re,e.scheme)},oe={},ie={},ae={},se={},le={},ue={},ce={},de={},fe={},he={},pe={},ye={},me={},ge={},ve={},be={},_e={},xe={},we={},Se={},je={},Me=function(e,t){var r,n,o=h(this,Me,"URL"),i=1<arguments.length?t:void 0,a=String(e),s=P(o,{type:"URL"});if(void 0!==i)if(i instanceof Me)r=k(i);else if(n=d(r={},String(i)))throw TypeError(n);if(n=d(s,a,null,r))throw TypeError(n);var l=s.searchParams=new C,u=L(l);u.updateSearchParams(s.query),u.updateURL=function(){s.query=String(l)||null},f||(o.href=Te.call(o),o.origin=Oe.call(o),o.protocol=Ce.call(o),o.username=Le.call(o),o.password=Pe.call(o),o.host=ke.call(o),o.hostname=Ae.call(o),o.port=Re.call(o),o.pathname=De.call(o),o.search=Ie.call(o),o.searchParams=Ue.call(o),o.hash=Ne.call(o))},Ee=Me.prototype,Te=function(){var e=k(this),t=e.scheme,r=e.username,n=e.password,o=e.host,i=e.port,a=e.path,s=e.query,l=e.fragment,u=t+":";return null!==o?(u+="//",x(e)&&(u+=r+(n?":"+n:"")+"@"),u+=c(o),null!==i&&(u+=":"+i)):"file"==t&&(u+="//"),u+=e.cannotBeABaseURL?a[0]:a.length?"/"+a.join("/"):"",null!==s&&(u+="?"+s),null!==l&&(u+="#"+l),u},Oe=function(){var e=k(this),t=e.scheme,r=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(e){return"null"}return"file"!=t&&ne(e)?t+"://"+c(e.host)+(null!==r?":"+r:""):"null"},Ce=function(){return k(this).scheme+":"},Le=function(){return k(this).username},Pe=function(){return k(this).password},ke=function(){var e=k(this),t=e.host,r=e.port;return null===t?"":null===r?c(t):c(t)+":"+r},Ae=function(){var e=k(this).host;return null===e?"":c(e)},Re=function(){var e=k(this).port;return null===e?"":String(e)},De=function(){var e=k(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},Ie=function(){var e=k(this).query;return e?"?"+e:""},Ue=function(){return k(this).searchParams},Ne=function(){var e=k(this).fragment;return e?"#"+e:""};if(f&&l(Ee,{href:n(Te,function(e){var t=k(this),r=String(e),n=d(t,r);if(n)throw TypeError(n);L(t.searchParams).updateSearchParams(t.query)}),origin:n(Oe),protocol:n(Ce,function(e){var t=k(this);d(t,String(e)+":",oe)}),username:n(Le,function(e){var t=k(this),r=T(String(e));if(!o(t)){t.username="";for(var n=0;n<r.length;n++)t.username+=te(r[n],ee)}}),password:n(Pe,function(e){var t=k(this),r=T(String(e));if(!o(t)){t.password="";for(var n=0;n<r.length;n++)t.password+=te(r[n],ee)}}),host:n(ke,function(e){var t=k(this);t.cannotBeABaseURL||d(t,String(e),pe)}),hostname:n(Ae,function(e){var t=k(this);t.cannotBeABaseURL||d(t,String(e),ye)}),port:n(Re,function(e){var t=k(this);o(t)||(""==(e=String(e))?t.port=null:d(t,e,me))}),pathname:n(De,function(e){var t=k(this);t.cannotBeABaseURL||(t.path=[],d(t,e+"",_e))}),search:n(Ie,function(e){var t=k(this);""==(e=String(e))?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",d(t,e,Se)),L(t.searchParams).updateSearchParams(t.query)}),searchParams:n(Ue),hash:n(Ne,function(e){var t=k(this);""!=(e=String(e))?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",d(t,e,je)):t.fragment=null})}),u(Ee,"toJSON",function(){return Te.call(this)},{enumerable:!0}),u(Ee,"toString",function(){return Te.call(this)},{enumerable:!0}),O){var Fe=O.createObjectURL,Be=O.revokeObjectURL;Fe&&u(Me,"createObjectURL",function(e){return Fe.apply(O,arguments)}),Be&&u(Me,"revokeObjectURL",function(e){return Be.apply(O,arguments)})}g(Me,"URL"),i({global:!0,forced:!a,sham:!f},{URL:Me})},{"../internals/an-instance":9,"../internals/array-from":17,"../internals/descriptors":42,"../internals/export":49,"../internals/global":58,"../internals/has":59,"../internals/internal-state":69,"../internals/native-url":83,"../internals/object-assign":88,"../internals/object-define-properties":90,"../internals/redefine":107,"../internals/set-to-string-tag":116,"../internals/string-multibyte":122,"../internals/string-punycode-to-ascii":123,"../modules/es.string.iterator":183,"../modules/web.url-search-params":227}],229:[function(e,t,r){"use strict";t.exports=e("./").polyfill()},{"./":230}],230:[function(z,r,n){(function(G,V){var e,t;e=this,t=function(){"use strict";function l(e){return"function"==typeof e}var r=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},n=0,t=void 0,o=void 0,a=function(e,t){f[n]=e,f[n+1]=t,2===(n+=2)&&(o?o(h):v())};var e="undefined"!=typeof window?window:void 0,i=e||{},s=i.MutationObserver||i.WebKitMutationObserver,u="undefined"==typeof self&&void 0!==G&&"[object process]"==={}.toString.call(G),c="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function d(){var e=setTimeout;return function(){return e(h,1)}}var f=new Array(1e3);function h(){for(var e=0;e<n;e+=2){(0,f[e])(f[e+1]),f[e]=void 0,f[e+1]=void 0}n=0}var p,y,m,g,v=void 0;function b(e,t){var r=this,n=new this.constructor(w);void 0===n[x]&&I(n);var o=r._state;if(o){var i=arguments[o-1];a(function(){return R(o,n,i,r._result)})}else k(r,n,e,t);return n}function _(e){if(e&&"object"==typeof e&&e.constructor===this)return e;var t=new this(w);return O(t,e),t}v=u?function(){return G.nextTick(h)}:s?(y=0,m=new s(h),g=document.createTextNode(""),m.observe(g,{characterData:!0}),function(){g.data=y=++y%2}):c?((p=new MessageChannel).port1.onmessage=h,function(){return p.port2.postMessage(0)}):void 0===e&&"function"==typeof z?function(){try{var e=Function("return this")().require("vertx");return void 0!==(t=e.runOnLoop||e.runOnContext)?function(){t(h)}:d()}catch(e){return d()}}():d();var x=Math.random().toString(36).substring(2);function w(){}var S=void 0,j=1,M=2;function E(e,n,o){a(function(t){var r=!1,e=function(e,t,r,n){try{e.call(t,r,n)}catch(e){return e}}(o,n,function(e){r||(r=!0,n!==e?O(t,e):L(t,e))},function(e){r||(r=!0,P(t,e))},t._label);!r&&e&&(r=!0,P(t,e))},e)}function T(e,t,r){var n,o;t.constructor===e.constructor&&r===b&&t.constructor.resolve===_?(n=e,(o=t)._state===j?L(n,o._result):o._state===M?P(n,o._result):k(o,void 0,function(e){return O(n,e)},function(e){return P(n,e)})):void 0===r?L(e,t):l(r)?E(e,t,r):L(e,t)}function O(t,e){if(t===e)P(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(n=e),null===n||"object"!=o&&"function"!=o)L(t,e);else{var r=void 0;try{r=e.then}catch(e){return void P(t,e)}T(t,e,r)}var n,o}function C(e){e._onerror&&e._onerror(e._result),A(e)}function L(e,t){e._state===S&&(e._result=t,e._state=j,0!==e._subscribers.length&&a(A,e))}function P(e,t){e._state===S&&(e._state=M,e._result=t,a(C,e))}function k(e,t,r,n){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+j]=r,o[i+M]=n,0===i&&e._state&&a(A,e)}function A(e){var t=e._subscribers,r=e._state;if(0!==t.length){for(var n=void 0,o=void 0,i=e._result,a=0;a<t.length;a+=3)n=t[a],o=t[a+r],n?R(r,n,o,i):o(i);e._subscribers.length=0}}function R(e,t,r,n){var o=l(r),i=void 0,a=void 0,s=!0;if(o){try{i=r(n)}catch(e){s=!1,a=e}if(t===i)return void P(t,new TypeError("A promises callback cannot return that same promise."))}else i=n;t._state!==S||(o&&s?O(t,i):!1===s?P(t,a):e===j?L(t,i):e===M&&P(t,i))}var D=0;function I(e){e[x]=D++,e._state=void 0,e._result=void 0,e._subscribers=[]}var U=(N.prototype._enumerate=function(e){for(var t=0;this._state===S&&t<e.length;t++)this._eachEntry(e[t],t)},N.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===_){var o=void 0,i=void 0,a=!1;try{o=t.then}catch(e){a=!0,i=e}if(o===b&&t._state!==S)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===F){var s=new r(w);a?P(s,i):T(s,t,o),this._willSettleAt(s,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},N.prototype._settledAt=function(e,t,r){var n=this.promise;n._state===S&&(this._remaining--,e===M?P(n,r):this._result[t]=r),0===this._remaining&&L(n,this._result)},N.prototype._willSettleAt=function(e,t){var r=this;k(e,void 0,function(e){return r._settledAt(j,t,e)},function(e){return r._settledAt(M,t,e)})},N);function N(e,t){this._instanceConstructor=e,this.promise=new e(w),this.promise[x]||I(this.promise),r(t)?(this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?L(this.promise,this._result):(this.length=this.length||0,this._enumerate(t),0===this._remaining&&L(this.promise,this._result))):P(this.promise,new Error("Array Methods must be provided an Array"))}var F=(B.prototype.catch=function(e){return this.then(null,e)},B.prototype.finally=function(t){var r=this.constructor;return l(t)?this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):this.then(t,t)},B);function B(e){this[x]=D++,this._result=this._state=void 0,this._subscribers=[],w!==e&&("function"!=typeof e&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof B?function(t,e){try{e(function(e){O(t,e)},function(e){P(t,e)})}catch(e){P(t,e)}}(this,e):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return F.prototype.then=b,F.all=function(e){return new U(this,e).promise},F.race=function(o){var i=this;return r(o)?new i(function(e,t){for(var r=o.length,n=0;n<r;n++)i.resolve(o[n]).then(e,t)}):new i(function(e,t){return t(new TypeError("You must pass an array to race."))})},F.resolve=_,F.reject=function(e){var t=new this(w);return P(t,e),t},F._setScheduler=function(e){o=e},F._setAsap=function(e){a=e},F._asap=a,F.polyfill=function(){var e=void 0;if(void 0!==V)e=V;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;if(t){var r=null;try{r=Object.prototype.toString.call(t.resolve())}catch(e){}if("[object Promise]"===r&&!t.cast)return}e.Promise=F},F.Promise=F},"object"==typeof n&&void 0!==r?r.exports=t():e.ES6Promise=t()}).call(this,z("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:238}],231:[function(e,n,o){!function(e,t){if(0,void 0!==o&&void 0!==n)t(o,n);else{var r={exports:{}};t(r.exports,r),e.fetchJsonp=r.exports}}(this,function(e,t){"use strict";var r=5e3,n="callback";function d(t){try{delete window[t]}catch(e){window[t]=void 0}}function f(e){var t=document.getElementById(e);t&&document.getElementsByTagName("head")[0].removeChild(t)}t.exports=function(i){var a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=i,l=a.timeout||r,u=a.jsonpCallback||n,c=void 0;return new Promise(function(t,e){var r=a.jsonpCallbackFunction||"jsonp_"+Date.now()+"_"+Math.ceil(1e5*Math.random()),n=u+"_"+r;window[r]=function(e){t({ok:!0,json:function(){return Promise.resolve(e)}}),c&&clearTimeout(c),f(n),d(r)},s+=-1===s.indexOf("?")?"?":"&";var o=document.createElement("script");o.setAttribute("src",""+s+u+"="+r),a.charset&&o.setAttribute("charset",a.charset),o.id=n,document.getElementsByTagName("head")[0].appendChild(o),c=setTimeout(function(){e(new Error("JSONP request to "+i+" timed out")),d(r),f(n),window[r]=function(){d(r)}},l),o.onerror=function(){e(new Error("JSONP request to "+i+" failed")),d(r),f(n),c&&clearTimeout(c)}})}})},{}],232:[function(e,t,r){var n=n||function(s){"use strict";if(!(void 0===s||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=s.document,l=function(){return s.URL||s.webkitURL||s},u=e.createElementNS("http://www.w3.org/1999/xhtml","a"),c="download"in u,d=/constructor/i.test(s.HTMLElement)||s.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),h=function(e){(s.setImmediate||s.setTimeout)(function(){throw e},0)},p=function(e){setTimeout(function(){"string"==typeof e?l().revokeObjectURL(e):e.remove()},4e4)},y=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},n=function(e,r,t){t||(e=y(e));function n(){!function(e,t,r){for(var n=(t=[].concat(t)).length;n--;){var o=e["on"+t[n]];if("function"==typeof o)try{o.call(e,r||e)}catch(e){h(e)}}}(i,"writestart progress write writeend".split(" "))}var o,i=this,a="application/octet-stream"===e.type;if(i.readyState=i.INIT,c)return o=l().createObjectURL(e),void setTimeout(function(){var e,t;u.href=o,u.download=r,e=u,t=new MouseEvent("click"),e.dispatchEvent(t),n(),p(o),i.readyState=i.DONE});!function(){if((f||a&&d)&&s.FileReader){var t=new FileReader;return t.onloadend=function(){var e=f?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");s.open(e,"_blank")||(s.location.href=e),e=void 0,i.readyState=i.DONE,n()},t.readAsDataURL(e),i.readyState=i.INIT}(o=o||l().createObjectURL(e),a)?s.location.href=o:s.open(o,"_blank")||(s.location.href=o);i.readyState=i.DONE,n(),p(o)}()},t=n.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,r){return t=t||e.name||"download",r||(e=y(e)),navigator.msSaveOrOpenBlob(e,t)}:(t.abort=function(){},t.readyState=t.INIT=0,t.WRITING=1,t.DONE=2,t.error=t.onwritestart=t.onprogress=t.onwrite=t.onabort=t.onerror=t.onwriteend=null,function(e,t,r){return new n(e,t||e.name||"download",r)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==t&&t.exports&&(t.exports.saveAs=n)},{}],233:[function(e,t,r){r.read=function(e,t,r,n,o){var i,a,s=8*o-n-1,l=(1<<s)-1,u=l>>1,c=-7,d=r?o-1:0,f=r?-1:1,h=e[t+d];for(d+=f,i=h&(1<<-c)-1,h>>=-c,c+=s;0<c;i=256*i+e[t+d],d+=f,c-=8);for(a=i&(1<<-c)-1,i>>=-c,c+=n;0<c;a=256*a+e[t+d],d+=f,c-=8);if(0===i)i=1-u;else{if(i===l)return a?NaN:1/0*(h?-1:1);a+=Math.pow(2,n),i-=u}return(h?-1:1)*a*Math.pow(2,i-n)},r.write=function(e,t,r,n,o,i){var a,s,l,u=8*i-o-1,c=(1<<u)-1,d=c>>1,f=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=n?0:i-1,p=n?1:-1,y=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(s=isNaN(t)?1:0,a=c):(a=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-a))<1&&(a--,l*=2),2<=(t+=1<=a+d?f/l:f*Math.pow(2,1-d))*l&&(a++,l/=2),c<=a+d?(s=0,a=c):1<=a+d?(s=(t*l-1)*Math.pow(2,o),a+=d):(s=t*Math.pow(2,d-1)*Math.pow(2,o),a=0));8<=o;e[r+h]=255&s,h+=p,s/=256,o-=8);for(a=a<<o|s,u+=o;0<u;e[r+h]=255&a,h+=p,a/=256,u-=8);e[r+h-p]|=128*y}},{}],234:[function(e,t,r){"use strict";var n;function m(e,t){return e.b===t.b&&e.a===t.a}function g(e,t){return e.b<t.b||e.b===t.b&&e.a<=t.a}function v(e,t,r){var n=t.b-e.b,o=r.b-t.b;return 0<n+o?n<o?t.a-e.a+n/(n+o)*(e.a-r.a):t.a-r.a+o/(n+o)*(r.a-e.a):0}function b(e,t,r){var n=t.b-e.b,o=r.b-t.b;return 0<n+o?(t.a-r.a)*n+(t.a-e.a)*o:0}function _(e,t){return e.a<t.a||e.a===t.a&&e.b<=t.b}function x(e,t,r){var n=t.a-e.a,o=r.a-t.a;return 0<n+o?n<o?t.b-e.b+n/(n+o)*(e.b-r.b):t.b-r.b+o/(n+o)*(r.b-e.b):0}function w(e,t,r){var n=t.a-e.a,o=r.a-t.a;return 0<n+o?(t.b-r.b)*n+(t.b-e.b)*o:0}function S(e,t,r,n){return(e=e<0?0:e)<=(r=r<0?0:r)?0===r?(t+n)/2:t+e/(e+r)*(n-t):n+r/(e+r)*(t-n)}function a(e){var t=i(e.b);return o(t,e.c),o(t.b,e.c),s(t,e.a),t}function j(e,t){var r=!1,n=!1;e!==t&&(t.a!==e.a&&(n=!0,y(t.a,e.a)),t.d!==e.d&&(r=!0,l(t.d,e.d)),h(t,e),n||(o(t,e.a),e.a.c=e),r||(s(t,e.d),e.d.a=e))}function d(e){var t=e.b,r=!1;e.d!==e.b.d&&(r=!0,l(e.d,e.b.d)),e.c===e?y(e.a,null):(e.b.d.a=K(e),e.a.c=e.c,h(e,K(e)),r||s(e,e.d)),t.c===t?(y(t.a,null),l(t.d,null)):(e.d.a=K(t),t.a.c=t.c,h(t,K(t))),p(e)}function M(e){var t=i(e),r=t.b;return h(t,e.e),t.a=e.b.a,o(r,t.a),t.d=r.d=e.d,t=t.b,h(e.b,K(e.b)),h(e.b,t),e.b.a=t.a,t.b.a.c=t.b,t.b.d=e.b.d,t.f=e.f,t.b.f=e.b.f,t}function f(e,t){var r=!1,n=i(e),o=n.b;return t.d!==e.d&&(r=!0,l(t.d,e.d)),h(n,e.e),h(o,t),n.a=e.b.a,o.a=t.a,n.d=o.d=e.d,e.d.a=o,r||s(n,e.d),n}function i(e){var t=new Q,r=new Q,n=e.b.h;return(((r.h=n).b.h=t).h=e).b.h=r,t.b=r,((t.c=t).e=r).b=t,(r.c=r).e=t}function h(e,t){var r=e.c,n=t.c;r.b.e=t,(n.b.e=e).c=n,t.c=r}function o(e,t){var r=t.f,n=new $(t,r);for(r.e=n,r=(t.f=n).c=e;r.a=n,(r=r.c)!==e;);}function s(e,t){var r=t.d,n=new Z(t,r);for(r.b=n,(t.d=n).a=e,n.c=t.c,r=e;r.d=n,(r=r.e)!==e;);}function p(e){var t=e.h;e=e.b.h,(t.b.h=e).b.h=t}function y(e,t){for(var r=e.c,n=r;n.a=t,(n=n.c)!==r;);r=e.f,((n=e.e).f=r).e=n}function l(e,t){for(var r=e.a,n=r;n.d=t,(n=n.e)!==r;);r=e.d,((n=e.b).d=r).b=n}function E(e){var t=0;return Math.abs(e[1])>Math.abs(e[0])&&(t=1),Math.abs(e[2])>Math.abs(e[t])&&(t=2),t}function T(e,t){e.f+=t.f,e.b.f+=t.b.f}function u(e,t,r){return e=e.a,t=t.a,r=r.a,t.b.a===e?r.b.a===e?g(t.a,r.a)?b(r.b.a,t.a,r.a)<=0:0<=b(t.b.a,r.a,t.a):b(r.b.a,e,r.a)<=0:r.b.a===e?0<=b(t.b.a,e,t.a):(t=v(t.b.a,e,t.a),(e=v(r.b.a,e,r.a))<=t)}function O(e){e.a.i=null;var t=e.e;t.a.c=t.c,t.c.a=t.a,e.e=null}function c(e,t){d(e.a),e.c=!1,(e.a=t).i=e}function C(e){for(var t=e.a.a;(e=de(e)).a.a===t;);return e.c&&(c(e,t=f(ce(e).a.b,e.a.e)),e=de(e)),e}function L(e,t,r){var n=new ue;return n.a=r,n.e=H(e.f,t.e,n),r.i=n}function P(e,t){switch(e.s){case 100130:return 0!=(1&t);case 100131:return 0!==t;case 100132:return 0<t;case 100133:return t<0;case 100134:return 2<=t||t<=-2}return!1}function k(e){var t=e.a,r=t.d;r.c=e.d,r.a=t,O(e)}function A(e,t,r){for(t=(e=t).a;e!==r;){e.c=!1;var n=ce(e),o=n.a;if(o.a!==t.a){if(!n.c){k(e);break}c(n,o=f(t.c.b,o.b))}t.c!==o&&(j(K(o),o),j(t,o)),k(e),t=n.a,e=n}return t}function R(e,t,r,n,o,i){for(var a=!0;L(e,t,r.b),(r=r.c)!==n;);for(null===o&&(o=ce(t).a.b.c);(r=(n=ce(t)).a.b).a===o.a;)r.c!==o&&(j(K(r),r),j(K(o),r)),n.f=t.f-r.f,n.d=P(e,n.f),t.b=!0,!a&&N(e,t)&&(T(r,o),O(t),d(o)),a=!1,t=n,o=r;t.b=!0,i&&B(e,t)}function D(e,t,r,n,o){var i=[t.g[0],t.g[1],t.g[2]];t.d=null,t.d=e.o&&e.o(i,r,n,e.c)||null,null===t.d&&(o?e.n||(Y(e,100156),e.n=!0):t.d=r[0])}function I(e,t,r){var n=[null,null,null,null];n[0]=t.a.d,n[1]=r.a.d,D(e,t.a,n,[.5,.5,0,0],!1),j(t,r)}function U(e,t,r,n,o){var i=Math.abs(t.b-e.b)+Math.abs(t.a-e.a),a=Math.abs(r.b-e.b)+Math.abs(r.a-e.a),s=o+1;n[o]=.5*a/(i+a),n[s]=.5*i/(i+a),e.g[0]+=n[o]*t.g[0]+n[s]*r.g[0],e.g[1]+=n[o]*t.g[1]+n[s]*r.g[1],e.g[2]+=n[o]*t.g[2]+n[s]*r.g[2]}function N(e,t){var r=ce(t),n=t.a,o=r.a;if(g(n.a,o.a)){if(0<b(o.b.a,n.a,o.a))return!1;if(m(n.a,o.a)){if(n.a!==o.a){r=e.e;var i=n.a.h;if(0<=i){var a=(r=r.b).d,s=r.e,l=r.c,u=l[i];a[u]=a[r.a],(l[a[u]]=u)<=--r.a&&(u<=1?se(r,u):g(s[a[u>>1]],s[a[u]])?se(r,u):le(r,u)),s[i]=null,l[i]=r.b,r.b=i}else for(r.c[-(i+1)]=null;0<r.a&&null===r.c[r.d[r.a-1]];)--r.a;I(e,K(o),n)}}else M(o.b),j(n,K(o)),t.b=r.b=!0}else{if(b(n.b.a,o.a,n.a)<0)return!1;de(t).b=t.b=!0,M(n.b),j(K(o),n)}return!0}function F(e,t){var r=ce(t),n=t.a,o=r.a,i=n.a,a=o.a,s=n.b.a,l=o.b.a,u=new $;if(b(s,e.a,i),b(l,e.a,a),i===a||Math.min(i.a,s.a)>Math.max(a.a,l.a))return!1;if(g(i,a)){if(0<b(l,i,a))return!1}else if(b(s,a,i)<0)return!1;var c,d,f=s,h=i,p=l,y=a;if(g(f,h)||(c=f,f=h,h=c),g(p,y)||(c=p,p=y,y=c),g(f,p)||(c=f,f=p,p=c,c=h,h=y,y=c),g(p,h)?g(h,y)?((c=v(f,p,h))+(d=v(p,h,y))<0&&(c=-c,d=-d),u.b=S(c,p.b,d,h.b)):((c=b(f,p,h))+(d=-b(f,y,h))<0&&(c=-c,d=-d),u.b=S(c,p.b,d,y.b)):u.b=(p.b+h.b)/2,_(f,h)||(c=f,f=h,h=c),_(p,y)||(c=p,p=y,y=c),_(f,p)||(c=f,f=p,p=c,c=h,h=y,y=c),_(p,h)?_(h,y)?((c=x(f,p,h))+(d=x(p,h,y))<0&&(c=-c,d=-d),u.a=S(c,p.a,d,h.a)):((c=w(f,p,h))+(d=-w(f,y,h))<0&&(c=-c,d=-d),u.a=S(c,p.a,d,y.a)):u.a=(p.a+h.a)/2,g(u,e.a)&&(u.b=e.a.b,u.a=e.a.a),f=g(i,a)?i:a,g(f,u)&&(u.b=f.b,u.a=f.a),m(u,i)||m(u,a))return N(e,t),!1;if(!m(s,e.a)&&0<=b(s,e.a,u)||!m(l,e.a)&&b(l,e.a,u)<=0){if(l===e.a)return M(n.b),j(o.b,n),n=ce(t=C(t)).a,A(e,ce(t),r),R(e,t,K(n),n,n,!0),!0;if(s!==e.a)return 0<=b(s,e.a,u)&&(de(t).b=t.b=!0,M(n.b),n.a.b=e.a.b,n.a.a=e.a.a),b(l,e.a,u)<=0&&(t.b=r.b=!0,M(o.b),o.a.b=e.a.b,o.a.a=e.a.a),!1;for(M(o.b),j(n.e,K(o)),a=(i=r=t).a.b.a;(i=de(i)).a.b.a===a;);return i=ce(t=i).a.b.c,r.a=K(o),R(e,t,(o=A(e,r,null)).c,n.b.c,i,!0),!0}return M(n.b),M(o.b),j(K(o),n),n.a.b=u.b,n.a.a=u.a,n.a.h=te(e.e,n.a),n=n.a,o=[0,0,0,0],u=[i.d,s.d,a.d,l.d],n.g[0]=n.g[1]=n.g[2]=0,U(n,i,s,o,0),U(n,a,l,o,2),D(e,n,u,o,!0),de(t).b=t.b=r.b=!0,!1}function B(e,t){for(var r=ce(t);;){for(;r.b;)r=ce(t=r);if(!t.b&&(null===(t=de(r=t))||!t.b))break;t.b=!1;var n,o=t.a,i=r.a;if(n=o.b.a!==i.b.a)e:{var a=ce(n=t),s=n.a,l=a.a,u=void 0;if(g(s.b.a,l.b.a)){if(b(s.b.a,l.b.a,s.a)<0){n=!1;break e}de(n).b=n.b=!0,u=M(s),j(l.b,u),u.d.c=n.d}else{if(0<b(l.b.a,s.b.a,l.a)){n=!1;break e}n.b=a.b=!0,u=M(l),j(s.e,l.b),u.b.d.c=n.d}n=!0}if(n&&(r.c?(O(r),d(i),i=(r=ce(t)).a):t.c&&(O(t),d(o),o=(t=de(r)).a)),o.a!==i.a)if(o.b.a===i.b.a||t.c||r.c||o.b.a!==e.a&&i.b.a!==e.a)N(e,t);else if(F(e,t))break;o.a===i.a&&o.b.a===i.b.a&&(T(i,o),O(t),d(o),t=de(r))}}function G(e,t){for(var r=(e.a=t).c;null===r.i;)if((r=r.c)===t.c){r=e;var n=t;(a=new ue).a=n.c.b;for(var o=(l=r.f).a;null!==(o=o.a).b&&!l.c(l.b,a,o.b););var i=ce(l=o.b),a=l.a;o=i.a;if(0===b(a.b.a,n,a.a))m((a=l.a).a,n)||m(a.b.a,n)||(M(a.b),l.c&&(d(a.c),l.c=!1),j(n.c,a),G(r,n));else{var s=g(o.b.a,a.b.a)?l:i;i=void 0;l.d||s.c?(i=s===l?f(n.c.b,a.e):f(o.b.c.b,n.c).b,s.c?c(s,i):((l=L(a=r,l,i)).f=de(l).f+l.a.f,l.d=P(a,l.f)),G(r,n)):R(r,l,n.c,n.c,null,!0)}return}if(l=(a=ce(r=C(r.i))).a,(a=A(e,a,null)).c===l){a=(l=a).c,o=ce(r),i=r.a,s=o.a;var l,u=!1;i.b.a!==s.b.a&&F(e,r),m(i.a,e.a)&&(j(K(a),i),a=ce(r=C(r)).a,A(e,ce(r),o),u=!0),m(s.a,e.a)&&(j(l,K(s)),l=A(e,o,null),u=!0),u?R(e,r,l.c,a,a,!0):(n=g(s.a,i.a)?K(s):i,R(e,r,n=f(l.c.b,n),n.c,n.c,!1),n.b.i.c=!0,B(e,r))}else R(e,r,a.c,l,l,!0)}function V(e,t){var r=new ue,n=a(e.b);n.a.b=4e150,n.a.a=t,n.b.a.b=-4e150,n.b.a.a=t,e.a=n.b.a,r.a=n,r.f=0,r.d=!1,r.c=!1,r.h=!0,r.b=!1,n=H(n=e.f,n.a,r),r.e=n}function z(e){this.a=new q,this.b=e,this.c=u}function H(e,t,r){for(;null!==(t=t.c).b&&!e.c(e.b,t.b,r););return e=new q(r,t.a,t),t.a.c=e,t.a=e}function q(e,t,r){this.b=e||null,this.a=t||this,this.c=r||this}function W(){this.d=0,this.p=this.b=this.q=null,this.j=[0,0,0],this.s=100130,this.n=!1,this.o=this.a=this.e=this.f=null,this.m=!1,this.c=this.r=this.i=this.k=this.l=this.h=null}function X(e,t){if(e.d!==t)for(;e.d!==t;)if(e.d<t)switch(e.d){case 0:Y(e,100151),e.u(null);break;case 1:Y(e,100152),e.t()}else switch(e.d){case 2:Y(e,100154),e.v();break;case 1:Y(e,100153),e.w()}}function Y(e,t){e.p&&e.p(t,e.c)}function Z(e,t){this.b=e||this,this.d=t||this,this.a=null,this.c=!1}function Q(){(this.h=this).i=this.d=this.a=this.e=this.c=this.b=null,this.f=0}function K(e){return e.b.e}function J(){this.c=new $,this.a=new Z,this.b=new Q,this.d=new Q,this.b.b=this.d,this.d.b=this.b}function $(e,t){this.e=e||this,this.f=t||this,this.d=this.c=null,this.g=[0,0,0],this.h=this.a=this.b=0}function ee(){this.c=[],this.d=null,this.a=0,this.e=!1,this.b=new ne}function te(e,t){if(e.e){var r,n=e.b,o=++n.a;return 2*o>n.f&&(n.f*=2,n.c=oe(n.c,n.f+1)),0===n.b?r=o:(r=n.b,n.b=n.c[n.b]),n.e[r]=t,n.c[r]=o,n.d[o]=r,n.h&&le(n,o),r}return n=e.a++,e.c[n]=t,-(n+1)}function re(e){if(0===e.a)return ae(e.b);var t=e.c[e.d[e.a-1]];if(0!==e.b.a&&g(ie(e.b),t))return ae(e.b);for(;--e.a,0<e.a&&null===e.c[e.d[e.a-1]];);return t}function ne(){this.d=oe([0],33),this.e=[null,null],this.c=[0,0],this.a=0,this.f=32,this.b=0,this.h=!1,this.d[1]=1}function oe(e,t){for(var r=Array(t),n=0;n<e.length;n++)r[n]=e[n];for(;n<t;n++)r[n]=0;return r}function ie(e){return e.e[e.d[1]]}function ae(e){var t=e.d,r=e.e,n=e.c,o=t[1],i=r[o];return 0<e.a&&(t[1]=t[e.a],n[t[1]]=1,r[o]=null,n[o]=e.b,e.b=o,0<--e.a&&se(e,1)),i}function se(e,t){for(var r=e.d,n=e.e,o=e.c,i=t,a=r[i];;){var s=i<<1;s<e.a&&g(n[r[s+1]],n[r[s]])&&(s+=1);var l=r[s];if(s>e.a||g(n[a],n[l])){o[r[i]=a]=i;break}o[r[i]=l]=i,i=s}}function le(e,t){for(var r=e.d,n=e.e,o=e.c,i=t,a=r[i];;){var s=i>>1,l=r[s];if(0==s||g(n[l],n[a])){o[r[i]=a]=i;break}o[r[i]=l]=i,i=s}}function ue(){this.e=this.a=null,this.f=0,this.c=this.b=this.h=this.d=!1}function ce(e){return e.e.c.b}function de(e){return e.e.a.b}(n=W.prototype).x=function(){X(this,0)},n.B=function(e,t){switch(e){case 100142:return;case 100140:switch(t){case 100130:case 100131:case 100132:case 100133:case 100134:return void(this.s=t)}break;case 100141:return void(this.m=!!t);default:return void Y(this,100900)}Y(this,100901)},n.y=function(e){switch(e){case 100142:return 0;case 100140:return this.s;case 100141:return this.m;default:Y(this,100900)}return!1},n.A=function(e,t,r){this.j[0]=e,this.j[1]=t,this.j[2]=r},n.z=function(e,t){var r=t||null;switch(e){case 100100:case 100106:this.h=r;break;case 100104:case 100110:this.l=r;break;case 100101:case 100107:this.k=r;break;case 100102:case 100108:this.i=r;break;case 100103:case 100109:this.p=r;break;case 100105:case 100111:this.o=r;break;case 100112:this.r=r;break;default:Y(this,100900)}},n.C=function(e,t){var r=!1,n=[0,0,0];X(this,2);for(var o=0;o<3;++o){var i=e[o];i<-1e150&&(i=-1e150,r=!0),1e150<i&&(i=1e150,r=!0),n[o]=i}r&&Y(this,100155),null===(r=this.q)?j(r=a(this.b),r.b):(M(r),r=r.e),r.a.d=t,r.a.g[0]=n[0],r.a.g[1]=n[1],r.a.g[2]=n[2],r.f=1,r.b.f=-1,this.q=r},n.u=function(e){X(this,0),this.d=1,this.b=new J,this.c=e},n.t=function(){X(this,1),this.d=2,this.q=null},n.v=function(){X(this,2),this.d=1},n.w=function(){X(this,1),this.d=0;var e,t,r=!1,n=[l=this.j[0],o=this.j[1],a=this.j[2]];if(0===l&&0===o&&0===a){for(var o=[-2e150,-2e150,-2e150],i=[2e150,2e150,2e150],a=[],s=[],l=(r=this.b.c).e;l!==r;l=l.e)for(var u=0;u<3;++u){var c=l.g[u];c<i[u]&&(i[u]=c,s[u]=l),c>o[u]&&(o[u]=c,a[u]=l)}if(l=0,o[1]-i[1]>o[0]-i[0]&&(l=1),o[2]-i[2]>o[l]-i[l]&&(l=2),i[l]>=o[l])n[0]=0,n[1]=0,n[2]=1;else{for(o=0,i=s[l],a=a[l],s=[0,0,0],i=[i.g[0]-a.g[0],i.g[1]-a.g[1],i.g[2]-a.g[2]],u=[0,0,0],l=r.e;l!==r;l=l.e)u[0]=l.g[0]-a.g[0],u[1]=l.g[1]-a.g[1],u[2]=l.g[2]-a.g[2],s[0]=i[1]*u[2]-i[2]*u[1],s[1]=i[2]*u[0]-i[0]*u[2],s[2]=i[0]*u[1]-i[1]*u[0],o<(c=s[0]*s[0]+s[1]*s[1]+s[2]*s[2])&&(o=c,n[0]=s[0],n[1]=s[1],n[2]=s[2]);o<=0&&(n[0]=n[1]=n[2]=0,n[E(i)]=1)}r=!0}for(s=E(n),l=this.b.c,o=(s+1)%3,a=(s+2)%3,s=0<n[s]?1:-1,n=l.e;n!==l;n=n.e)n.b=n.g[o],n.a=s*n.g[a];if(r){for(n=0,l=(r=this.b.a).b;l!==r;l=l.b)if(!((o=l.a).f<=0))for(;n+=(o.a.b-o.b.a.b)*(o.a.a+o.b.a.a),(o=o.e)!==l.a;);if(n<0)for(r=(n=this.b.c).e;r!==n;r=r.e)r.a=-r.a}for(this.n=!1,l=(n=this.b.b).h;l!==n;l=r)r=l.h,o=l.e,m(l.a,l.b.a)&&l.e.e!==l&&(I(this,o,l),d(l),o=(l=o).e),o.e===l&&(o!==l&&(o!==r&&o!==r.b||(r=r.h),d(o)),l!==r&&l!==r.b||(r=r.h),d(l));for(this.e=n=new ee,l=(r=this.b.c).e;l!==r;l=l.e)l.h=te(n,l);for(!function(e){e.d=[];for(var t=0;t<e.a;t++)e.d[t]=t;e.d.sort(function(r){return function(e,t){return g(r[e],r[t])?1:-1}}(e.c)),e.e=!0,function(e){for(var t=e.a;1<=t;--t)se(e,t);e.h=!0}(e.b)}(n),this.f=new z(this),V(this,-4e150),V(this,4e150);null!==(n=re(this.e));){for(;;){e:if(l=this.e,0===l.a)r=ie(l.b);else if(r=l.c[l.d[l.a-1]],0!==l.b.a&&(l=ie(l.b),g(l,r))){r=l;break e}if(null===r||!m(r,n))break;r=re(this.e),I(this,n.c,r.c)}G(this,n)}for(this.a=this.f.a.a.b.a.a,n=0;null!==(r=this.f.a.a.b);)r.h||++n,O(r);for(this.f=null,(n=this.e).b=null,n.d=null,this.e=n.c=null,l=(n=this.b).a.b;l!==n.a;l=r)r=l.b,(l=l.a).e.e===l&&(T(l.c,l),d(l));if(!this.n){if(n=this.b,this.m)for(l=n.b.h;l!==n.b;l=r)r=l.h,l.b.d.c!==l.d.c?l.f=l.d.c?1:-1:d(l);else for(l=n.a.b;l!==n.a;l=r)if(r=l.b,l.c){for(l=l.a;g(l.b.a,l.a);l=l.c.b);for(;g(l.a,l.b.a);l=l.e);for(o=l.c.b,a=void 0;l.e!==o;)if(g(l.b.a,o.a)){for(;o.e!==l&&(g((t=o.e).b.a,t.a)||b(o.a,o.b.a,o.e.b.a)<=0);)o=(a=f(o.e,o)).b;o=o.c.b}else{for(;o.e!==l&&(g((e=l.c.b).a,e.b.a)||0<=b(l.b.a,l.a,l.c.b.a));)l=(a=f(l,l.c.b)).b;l=l.e}for(;o.e.e!==l;)o=(a=f(o.e,o)).b}if(this.h||this.i||this.k||this.l)if(this.m){for(r=(n=this.b).a.b;r!==n.a;r=r.b)if(r.c){for(this.h&&this.h(2,this.c),l=r.a;this.k&&this.k(l.a.d,this.c),(l=l.e)!==r.a;);this.i&&this.i(this.c)}}else{for(n=this.b,r=!!this.l,l=!1,o=-1,a=n.a.d;a!==n.a;a=a.d)if(a.c)for(l||(this.h&&this.h(4,this.c),l=!0),s=a.a;r&&(o!==(i=s.b.d.c?0:1)&&(o=i,this.l&&this.l(!!o,this.c))),this.k&&this.k(s.a.d,this.c),(s=s.e)!==a.a;);l&&this.i&&this.i(this.c)}if(this.r){for(l=(n=this.b).a.b;l!==n.a;l=r)if(r=l.b,!l.c){for(a=(o=l.a).e,s=void 0;a=(s=a).e,(s.d=null)===s.b.d&&(s.c===s?y(s.a,null):(s.a.c=s.c,h(s,K(s))),(i=s.b).c===i?y(i.a,null):(i.a.c=i.c,h(i,K(i))),p(s)),s!==o;);o=l.d,((l=l.b).d=o).b=l}return this.r(this.b),void(this.c=this.b=null)}}this.b=this.c=null},this.libtess={GluTesselator:W,windingRule:{GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},primitiveType:{GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},errorType:{GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},gluEnum:{GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901,GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111}},W.prototype.gluDeleteTess=W.prototype.x,W.prototype.gluTessProperty=W.prototype.B,W.prototype.gluGetTessProperty=W.prototype.y,W.prototype.gluTessNormal=W.prototype.A,W.prototype.gluTessCallback=W.prototype.z,W.prototype.gluTessVertex=W.prototype.C,W.prototype.gluTessBeginPolygon=W.prototype.u,W.prototype.gluTessBeginContour=W.prototype.t,W.prototype.gluTessEndContour=W.prototype.v,W.prototype.gluTessEndPolygon=W.prototype.w,void 0!==t&&(t.exports=this.libtess)},{}],235:[function(e,t,r){"use strict";function O(e,t,r,n){for(var o=e[t++],i=1<<o,a=1+i,s=1+a,l=o+1,u=(1<<l)-1,c=0,d=0,f=0,h=e[t++],p=new Int32Array(4096),y=null;;){for(;c<16&&0!==h;)d|=e[t++]<<c,c+=8,1===h?h=e[t++]:--h;if(c<l)break;var m=d&u;if(d>>=l,c-=l,m!=i){if(m==a)break;for(var g=m<s?m:y,v=0,b=g;i<b;)b=p[b]>>8,++v;var _=b;if(n<f+v+(g!==m?1:0))return void console.log("Warning, gif stream longer than expected.");r[f++]=_;var x=f+=v;for(g!==m&&(r[f++]=_),b=g;v--;)b=p[b],r[--x]=255&b,b>>=8;null!==y&&s<4096&&(p[s++]=y<<8|_,u+1<=s&&l<12&&(++l,u=u<<1|1)),y=m}else s=1+a,u=(1<<(l=o+1))-1,y=null}return f!==n&&console.log("Warning, gif stream shorter than expected."),r}try{r.GifWriter=function(g,e,t,r){var v=0,n=void 0===(r=void 0===r?{}:r).loop?null:r.loop,b=void 0===r.palette?null:r.palette;if(e<=0||t<=0||65535<e||65535<t)throw new Error("Width/Height invalid.");function _(e){var t=e.length;if(t<2||256<t||t&t-1)throw new Error("Invalid code/color length, must be power of 2 and 2 .. 256.");return t}g[v++]=71,g[v++]=73,g[v++]=70,g[v++]=56,g[v++]=57,g[v++]=97;var o=0,i=0;if(null!==b){for(var a=_(b);a>>=1;)++o;if(a=1<<o,--o,void 0!==r.background){if(a<=(i=r.background))throw new Error("Background index out of range.");if(0===i)throw new Error("Background index explicitly passed as 0.")}}if(g[v++]=255&e,g[v++]=e>>8&255,g[v++]=255&t,g[v++]=t>>8&255,g[v++]=(null!==b?128:0)|o,g[v++]=i,g[v++]=0,null!==b)for(var s=0,l=b.length;s<l;++s){var u=b[s];g[v++]=u>>16&255,g[v++]=u>>8&255,g[v++]=255&u}if(null!==n){if(n<0||65535<n)throw new Error("Loop count invalid.");g[v++]=33,g[v++]=255,g[v++]=11,g[v++]=78,g[v++]=69,g[v++]=84,g[v++]=83,g[v++]=67,g[v++]=65,g[v++]=80,g[v++]=69,g[v++]=50,g[v++]=46,g[v++]=48,g[v++]=3,g[v++]=1,g[v++]=255&n,g[v++]=n>>8&255,g[v++]=0}var x=!1;this.addFrame=function(e,t,r,n,o,i){if(!0===x&&(--v,x=!1),i=void 0===i?{}:i,e<0||t<0||65535<e||65535<t)throw new Error("x/y invalid.");if(r<=0||n<=0||65535<r||65535<n)throw new Error("Width/Height invalid.");if(o.length<r*n)throw new Error("Not enough pixels for the frame size.");var a=!0,s=i.palette;if(null==s&&(a=!1,s=b),null==s)throw new Error("Must supply either a local or global palette.");for(var l=_(s),u=0;l>>=1;)++u;l=1<<u;var c=void 0===i.delay?0:i.delay,d=void 0===i.disposal?0:i.disposal;if(d<0||3<d)throw new Error("Disposal out of range.");var f=!1,h=0;if(void 0!==i.transparent&&null!==i.transparent&&(f=!0,(h=i.transparent)<0||l<=h))throw new Error("Transparent color index.");if(0===d&&!f&&0===c||(g[v++]=33,g[v++]=249,g[v++]=4,g[v++]=d<<2|(!0===f?1:0),g[v++]=255&c,g[v++]=c>>8&255,g[v++]=h,g[v++]=0),g[v++]=44,g[v++]=255&e,g[v++]=e>>8&255,g[v++]=255&t,g[v++]=t>>8&255,g[v++]=255&r,g[v++]=r>>8&255,g[v++]=255&n,g[v++]=n>>8&255,g[v++]=!0===a?128|u-1:0,!0===a)for(var p=0,y=s.length;p<y;++p){var m=s[p];g[v++]=m>>16&255,g[v++]=m>>8&255,g[v++]=255&m}return v=function(t,r,e,n){t[r++]=e;var o=r++,i=1<<e,a=i-1,s=1+i,l=1+s,u=e+1,c=0,d=0;function f(e){for(;e<=c;)t[r++]=255&d,d>>=8,c-=8,r===o+256&&(t[o]=255,o=r++)}function h(e){d|=e<<c,c+=u,f(8)}var p=n[0]&a,y={};h(i);for(var m=1,g=n.length;m<g;++m){var v=n[m]&a,b=p<<8|v,_=y[b];if(void 0===_){for(d|=p<<c,c+=u;8<=c;)t[r++]=255&d,d>>=8,c-=8,r===o+256&&(t[o]=255,o=r++);4096===l?(h(i),l=1+s,u=e+1,y={}):(1<<u<=l&&++u,y[b]=l++),p=v}else p=_}h(p),h(s),f(1),o+1===r?t[o]=0:(t[o]=r-o-1,t[r++]=0);return r}(g,v,u<2?2:u,o)},this.end=function(){return!1===x&&(g[v++]=59,x=!0),v},this.getOutputBuffer=function(){return g},this.setOutputBuffer=function(e){g=e},this.getOutputBufferPosition=function(){return v},this.setOutputBufferPosition=function(e){v=e}},r.GifReader=function(x){var e=0;if(71!==x[e++]||73!==x[e++]||70!==x[e++]||56!==x[e++]||56!=(x[e++]+1&253)||97!==x[e++])throw new Error("Invalid GIF 87a/89a header.");var w=x[e++]|x[e++]<<8,t=x[e++]|x[e++]<<8,r=x[e++],n=r>>7,o=1<<1+(7&r);x[e++],x[e++];var i=null,a=null;n&&(i=e,e+=3*(a=o));var s=!0,l=[],u=0,c=null,d=0,f=null;for(this.width=w,this.height=t;s&&e<x.length;)switch(x[e++]){case 33:switch(x[e++]){case 255:if(11!==x[e]||78==x[e+1]&&69==x[e+2]&&84==x[e+3]&&83==x[e+4]&&67==x[e+5]&&65==x[e+6]&&80==x[e+7]&&69==x[e+8]&&50==x[e+9]&&46==x[e+10]&&48==x[e+11]&&3==x[e+12]&&1==x[e+13]&&0==x[e+16])e+=14,f=x[e++]|x[e++]<<8,e++;else for(e+=12;;){if(!(0<=(T=x[e++])))throw Error("Invalid block size");if(0===T)break;e+=T}break;case 249:if(4!==x[e++]||0!==x[e+4])throw new Error("Invalid graphics extension block.");var h=x[e++];u=x[e++]|x[e++]<<8,c=x[e++],0==(1&h)&&(c=null),d=h>>2&7,e++;break;case 254:for(;;){if(!(0<=(T=x[e++])))throw Error("Invalid block size");if(0===T)break;e+=T}break;default:throw new Error("Unknown graphic control label: 0x"+x[e-1].toString(16))}break;case 44:var p=x[e++]|x[e++]<<8,y=x[e++]|x[e++]<<8,m=x[e++]|x[e++]<<8,g=x[e++]|x[e++]<<8,v=x[e++],b=v>>6&1,_=1<<1+(7&v),S=i,j=a,M=!1;if(v>>7){M=!0;S=e,e+=3*(j=_)}var E=e;for(e++;;){var T;if(!(0<=(T=x[e++])))throw Error("Invalid block size");if(0===T)break;e+=T}l.push({x:p,y:y,width:m,height:g,has_local_palette:M,palette_offset:S,palette_size:j,data_offset:E,data_length:e-E,transparent_index:c,interlaced:!!b,delay:u,disposal:d});break;case 59:s=!1;break;default:throw new Error("Unknown gif block: 0x"+x[e-1].toString(16))}this.numFrames=function(){return l.length},this.loopCount=function(){return f},this.frameInfo=function(e){if(e<0||e>=l.length)throw new Error("Frame index out of range.");return l[e]},this.decodeAndBlitFrameBGRA=function(e,t){var r=this.frameInfo(e),n=r.width*r.height,o=new Uint8Array(n);O(x,r.data_offset,o,n);var i=r.palette_offset,a=r.transparent_index;null===a&&(a=256);var s=r.width,l=w-s,u=s,c=4*(r.y*w+r.x),d=4*((r.y+r.height)*w+r.x),f=c,h=4*l;!0===r.interlaced&&(h+=4*w*7);for(var p=8,y=0,m=o.length;y<m;++y){var g=o[y];if(0===u&&(u=s,d<=(f+=h)&&(h=4*l+4*w*(p-1),f=c+(s+l)*(p<<1),p>>=1)),g===a)f+=4;else{var v=x[i+3*g],b=x[i+3*g+1],_=x[i+3*g+2];t[f++]=_,t[f++]=b,t[f++]=v,t[f++]=255}--u}},this.decodeAndBlitFrameRGBA=function(e,t){var r=this.frameInfo(e),n=r.width*r.height,o=new Uint8Array(n);O(x,r.data_offset,o,n);var i=r.palette_offset,a=r.transparent_index;null===a&&(a=256);var s=r.width,l=w-s,u=s,c=4*(r.y*w+r.x),d=4*((r.y+r.height)*w+r.x),f=c,h=4*l;!0===r.interlaced&&(h+=4*w*7);for(var p=8,y=0,m=o.length;y<m;++y){var g=o[y];if(0===u&&(u=s,d<=(f+=h)&&(h=4*l+4*w*(p-1),f=c+(s+l)*(p<<1),p>>=1)),g===a)f+=4;else{var v=x[i+3*g],b=x[i+3*g+1],_=x[i+3*g+2];t[f++]=v,t[f++]=b,t[f++]=_,t[f++]=255}--u}}}}catch(e){}},{}],236:[function(Br,t,r){(function(Fr){var e;e=this,function(M){"use strict";function e(e){if(null==this)throw TypeError();var t=String(this),r=t.length,n=e?Number(e):0;if(n!=n&&(n=0),!(n<0||r<=n)){var o,i=t.charCodeAt(n);return 55296<=i&&i<=56319&&n+1<r&&56320<=(o=t.charCodeAt(n+1))&&o<=57343?1024*(i-55296)+o-56320+65536:i}}var t;String.prototype.codePointAt||((t=function(){try{var e={},t=Object.defineProperty,r=t(e,e,e)&&t}catch(e){}return r}())?t(String.prototype,"codePointAt",{value:e,configurable:!0,writable:!0}):String.prototype.codePointAt=e);var l=0,i=-3;function r(){this.table=new Uint16Array(16),this.trans=new Uint16Array(288)}function a(e,t){this.source=e,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=t,this.destLen=0,this.ltree=new r,this.dtree=new r}var s=new r,u=new r,c=new Uint8Array(30),d=new Uint16Array(30),f=new Uint8Array(30),h=new Uint16Array(30),p=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),y=new r,m=new Uint8Array(320);function n(e,t,r,n){var o,i;for(o=0;o<r;++o)e[o]=0;for(o=0;o<30-r;++o)e[o+r]=o/r|0;for(i=n,o=0;o<30;++o)t[o]=i,i+=1<<e[o]}var g=new Uint16Array(16);function v(e,t,r,n){var o,i;for(o=0;o<16;++o)e.table[o]=0;for(o=0;o<n;++o)e.table[t[r+o]]++;for(o=i=e.table[0]=0;o<16;++o)g[o]=i,i+=e.table[o];for(o=0;o<n;++o)t[r+o]&&(e.trans[g[t[r+o]]++]=o)}function b(e){e.bitcount--||(e.tag=e.source[e.sourceIndex++],e.bitcount=7);var t=1&e.tag;return e.tag>>>=1,t}function _(e,t,r){if(!t)return r;for(;e.bitcount<24;)e.tag|=e.source[e.sourceIndex++]<<e.bitcount,e.bitcount+=8;var n=e.tag&65535>>>16-t;return e.tag>>>=t,e.bitcount-=t,n+r}function x(e,t){for(;e.bitcount<24;)e.tag|=e.source[e.sourceIndex++]<<e.bitcount,e.bitcount+=8;for(var r=0,n=0,o=0,i=e.tag;n=2*n+(1&i),i>>>=1,++o,r+=t.table[o],0<=(n-=t.table[o]););return e.tag=i,e.bitcount-=o,t.trans[r+n]}function w(e,t,r){var n,o,i,a,s,l;for(n=_(e,5,257),o=_(e,5,1),i=_(e,4,4),a=0;a<19;++a)m[a]=0;for(a=0;a<i;++a){var u=_(e,3,0);m[p[a]]=u}for(v(y,m,0,19),s=0;s<n+o;){var c=x(e,y);switch(c){case 16:var d=m[s-1];for(l=_(e,2,3);l;--l)m[s++]=d;break;case 17:for(l=_(e,3,3);l;--l)m[s++]=0;break;case 18:for(l=_(e,7,11);l;--l)m[s++]=0;break;default:m[s++]=c}}v(t,m,0,n),v(r,m,n,o)}function S(e,t,r){for(;;){var n,o,i,a,s=x(e,t);if(256===s)return l;if(s<256)e.dest[e.destLen++]=s;else for(n=_(e,c[s-=257],d[s]),o=x(e,r),a=i=e.destLen-_(e,f[o],h[o]);a<i+n;++a)e.dest[e.destLen++]=e.dest[a]}}function j(e){for(var t,r;8<e.bitcount;)e.sourceIndex--,e.bitcount-=8;if((t=256*(t=e.source[e.sourceIndex+1])+e.source[e.sourceIndex])!==(65535&~(256*e.source[e.sourceIndex+3]+e.source[e.sourceIndex+2])))return i;for(e.sourceIndex+=4,r=t;r;--r)e.dest[e.destLen++]=e.source[e.sourceIndex++];return e.bitcount=0,l}!function(e,t){var r;for(r=0;r<7;++r)e.table[r]=0;for(e.table[7]=24,e.table[8]=152,e.table[9]=112,r=0;r<24;++r)e.trans[r]=256+r;for(r=0;r<144;++r)e.trans[24+r]=r;for(r=0;r<8;++r)e.trans[168+r]=280+r;for(r=0;r<112;++r)e.trans[176+r]=144+r;for(r=0;r<5;++r)t.table[r]=0;for(t.table[5]=32,r=0;r<32;++r)t.trans[r]=r}(s,u),n(c,d,4,3),n(f,h,2,1),c[28]=0,d[28]=258;var o=function(e,t){var r,n,o=new a(e,t);do{switch(r=b(o),_(o,2,0)){case 0:n=j(o);break;case 1:n=S(o,s,u);break;case 2:w(o,o.ltree,o.dtree),n=S(o,o.ltree,o.dtree);break;default:n=i}if(n!==l)throw new Error("Data error")}while(!r);return o.destLen<o.dest.length?"function"==typeof o.dest.slice?o.dest.slice(0,o.destLen):o.dest.subarray(0,o.destLen):o.dest};function E(e,t,r,n,o){return Math.pow(1-o,3)*e+3*Math.pow(1-o,2)*o*t+3*(1-o)*Math.pow(o,2)*r+Math.pow(o,3)*n}function T(){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN}function D(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}function O(e){throw new Error(e)}function C(e,t){e||O(t)}T.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2)},T.prototype.addPoint=function(e,t){"number"==typeof e&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=e,this.x2=e),e<this.x1&&(this.x1=e),e>this.x2&&(this.x2=e)),"number"==typeof t&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=t,this.y2=t),t<this.y1&&(this.y1=t),t>this.y2&&(this.y2=t))},T.prototype.addX=function(e){this.addPoint(e,null)},T.prototype.addY=function(e){this.addPoint(null,e)},T.prototype.addBezier=function(e,t,r,n,o,i,a,s){var l=[e,t],u=[r,n],c=[o,i],d=[a,s];this.addPoint(e,t),this.addPoint(a,s);for(var f=0;f<=1;f++){var h=6*l[f]-12*u[f]+6*c[f],p=-3*l[f]+9*u[f]-9*c[f]+3*d[f],y=3*u[f]-3*l[f];if(0!=p){var m=Math.pow(h,2)-4*y*p;if(!(m<0)){var g=(-h+Math.sqrt(m))/(2*p);0<g&&g<1&&(0===f&&this.addX(E(l[f],u[f],c[f],d[f],g)),1===f&&this.addY(E(l[f],u[f],c[f],d[f],g)));var v=(-h-Math.sqrt(m))/(2*p);0<v&&v<1&&(0===f&&this.addX(E(l[f],u[f],c[f],d[f],v)),1===f&&this.addY(E(l[f],u[f],c[f],d[f],v)))}}else{if(0==h)continue;var b=-y/h;0<b&&b<1&&(0===f&&this.addX(E(l[f],u[f],c[f],d[f],b)),1===f&&this.addY(E(l[f],u[f],c[f],d[f],b)))}}},T.prototype.addQuad=function(e,t,r,n,o,i){var a=e+2/3*(r-e),s=t+2/3*(n-t),l=a+1/3*(o-e),u=s+1/3*(i-t);this.addBezier(e,t,a,s,l,u,o,i)},D.prototype.moveTo=function(e,t){this.commands.push({type:"M",x:e,y:t})},D.prototype.lineTo=function(e,t){this.commands.push({type:"L",x:e,y:t})},D.prototype.curveTo=D.prototype.bezierCurveTo=function(e,t,r,n,o,i){this.commands.push({type:"C",x1:e,y1:t,x2:r,y2:n,x:o,y:i})},D.prototype.quadTo=D.prototype.quadraticCurveTo=function(e,t,r,n){this.commands.push({type:"Q",x1:e,y1:t,x:r,y:n})},D.prototype.close=D.prototype.closePath=function(){this.commands.push({type:"Z"})},D.prototype.extend=function(e){if(e.commands)e=e.commands;else if(e instanceof T){var t=e;return this.moveTo(t.x1,t.y1),this.lineTo(t.x2,t.y1),this.lineTo(t.x2,t.y2),this.lineTo(t.x1,t.y2),void this.close()}Array.prototype.push.apply(this.commands,e)},D.prototype.getBoundingBox=function(){for(var e=new T,t=0,r=0,n=0,o=0,i=0;i<this.commands.length;i++){var a=this.commands[i];switch(a.type){case"M":e.addPoint(a.x,a.y),t=n=a.x,r=o=a.y;break;case"L":e.addPoint(a.x,a.y),n=a.x,o=a.y;break;case"Q":e.addQuad(n,o,a.x1,a.y1,a.x,a.y),n=a.x,o=a.y;break;case"C":e.addBezier(n,o,a.x1,a.y1,a.x2,a.y2,a.x,a.y),n=a.x,o=a.y;break;case"Z":n=t,o=r;break;default:throw new Error("Unexpected path command "+a.type)}}return e.isEmpty()&&e.addPoint(0,0),e},D.prototype.draw=function(e){e.beginPath();for(var t=0;t<this.commands.length;t+=1){var r=this.commands[t];"M"===r.type?e.moveTo(r.x,r.y):"L"===r.type?e.lineTo(r.x,r.y):"C"===r.type?e.bezierCurveTo(r.x1,r.y1,r.x2,r.y2,r.x,r.y):"Q"===r.type?e.quadraticCurveTo(r.x1,r.y1,r.x,r.y):"Z"===r.type&&e.closePath()}this.fill&&(e.fillStyle=this.fill,e.fill()),this.stroke&&(e.strokeStyle=this.stroke,e.lineWidth=this.strokeWidth,e.stroke())},D.prototype.toPathData=function(i){function e(){for(var e,t=arguments,r="",n=0;n<arguments.length;n+=1){var o=t[n];0<=o&&0<n&&(r+=" "),r+=(e=o,Math.round(e)===e?""+Math.round(e):e.toFixed(i))}return r}i=void 0!==i?i:2;for(var t="",r=0;r<this.commands.length;r+=1){var n=this.commands[r];"M"===n.type?t+="M"+e(n.x,n.y):"L"===n.type?t+="L"+e(n.x,n.y):"C"===n.type?t+="C"+e(n.x1,n.y1,n.x2,n.y2,n.x,n.y):"Q"===n.type?t+="Q"+e(n.x1,n.y1,n.x,n.y):"Z"===n.type&&(t+="Z")}return t},D.prototype.toSVG=function(e){var t='<path d="';return t+=this.toPathData(e),t+='"',this.fill&&"black"!==this.fill&&(null===this.fill?t+=' fill="none"':t+=' fill="'+this.fill+'"'),this.stroke&&(t+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),t+="/>"},D.prototype.toDOMElement=function(e){var t=this.toPathData(e),r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",t),r};var L={fail:O,argument:C,assert:C},P={},k={},A={};function R(e){return function(){return e}}k.BYTE=function(e){return L.argument(0<=e&&e<=255,"Byte value should be between 0 and 255."),[e]},A.BYTE=R(1),k.CHAR=function(e){return[e.charCodeAt(0)]},A.CHAR=R(1),k.CHARARRAY=function(e){for(var t=[],r=0;r<e.length;r+=1)t[r]=e.charCodeAt(r);return t},A.CHARARRAY=function(e){return e.length},k.USHORT=function(e){return[e>>8&255,255&e]},A.USHORT=R(2),k.SHORT=function(e){return 32768<=e&&(e=-(65536-e)),[e>>8&255,255&e]},A.SHORT=R(2),k.UINT24=function(e){return[e>>16&255,e>>8&255,255&e]},A.UINT24=R(3),k.ULONG=function(e){return[e>>24&255,e>>16&255,e>>8&255,255&e]},A.ULONG=R(4),k.LONG=function(e){return 2147483648<=e&&(e=-(4294967296-e)),[e>>24&255,e>>16&255,e>>8&255,255&e]},A.LONG=R(4),k.FIXED=k.ULONG,A.FIXED=A.ULONG,k.FWORD=k.SHORT,A.FWORD=A.SHORT,k.UFWORD=k.USHORT,A.UFWORD=A.USHORT,k.LONGDATETIME=function(e){return[0,0,0,0,e>>24&255,e>>16&255,e>>8&255,255&e]},A.LONGDATETIME=R(8),k.TAG=function(e){return L.argument(4===e.length,"Tag should be exactly 4 ASCII characters."),[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]},A.TAG=R(4),k.Card8=k.BYTE,A.Card8=A.BYTE,k.Card16=k.USHORT,A.Card16=A.USHORT,k.OffSize=k.BYTE,A.OffSize=A.BYTE,k.SID=k.USHORT,A.SID=A.USHORT,k.NUMBER=function(e){return-107<=e&&e<=107?[e+139]:108<=e&&e<=1131?[247+((e-=108)>>8),255&e]:-1131<=e&&e<=-108?[251+((e=-e-108)>>8),255&e]:-32768<=e&&e<=32767?k.NUMBER16(e):k.NUMBER32(e)},A.NUMBER=function(e){return k.NUMBER(e).length},k.NUMBER16=function(e){return[28,e>>8&255,255&e]},A.NUMBER16=R(3),k.NUMBER32=function(e){return[29,e>>24&255,e>>16&255,e>>8&255,255&e]},A.NUMBER32=R(5),k.REAL=function(e){var t=e.toString(),r=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t);if(r){var n=parseFloat("1e"+((r[2]?+r[2]:0)+r[1].length));t=(Math.round(e*n)/n).toString()}for(var o="",i=0,a=t.length;i<a;i+=1){var s=t[i];o+="e"===s?"-"===t[++i]?"c":"b":"."===s?"a":"-"===s?"e":s}for(var l=[30],u=0,c=(o+=1&o.length?"f":"ff").length;u<c;u+=2)l.push(parseInt(o.substr(u,2),16));return l},A.REAL=function(e){return k.REAL(e).length},k.NAME=k.CHARARRAY,A.NAME=A.CHARARRAY,k.STRING=k.CHARARRAY,A.STRING=A.CHARARRAY,P.UTF8=function(e,t,r){for(var n=[],o=r,i=0;i<o;i++,t+=1)n[i]=e.getUint8(t);return String.fromCharCode.apply(null,n)},P.UTF16=function(e,t,r){for(var n=[],o=r/2,i=0;i<o;i++,t+=2)n[i]=e.getUint16(t);return String.fromCharCode.apply(null,n)},k.UTF16=function(e){for(var t=[],r=0;r<e.length;r+=1){var n=e.charCodeAt(r);t[t.length]=n>>8&255,t[t.length]=255&n}return t},A.UTF16=function(e){return 2*e.length};var I={"x-mac-croatian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ","x-mac-cyrillic":"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю","x-mac-gaelic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ","x-mac-greek":"Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­","x-mac-icelandic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-inuit":"ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł","x-mac-ce":"ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",macintosh:"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-romanian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-turkish":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"};P.MACSTRING=function(e,t,r,n){var o=I[n];if(void 0!==o){for(var i="",a=0;a<r;a++){var s=e.getUint8(t+a);i+=s<=127?String.fromCharCode(s):o[127&s]}return i}};var U,N="function"==typeof WeakMap&&new WeakMap;function F(e){return-128<=e&&e<=127}function B(e,t,r){for(var n=0,o=e.length;t<o&&n<64&&0===e[t];)++t,++n;return r.push(128|n-1),t}function G(e,t,r){for(var n=0,o=e.length,i=t;i<o&&n<64;){var a=e[i];if(!F(a))break;if(0===a&&i+1<o&&0===e[i+1])break;++i,++n}r.push(n-1);for(var s=t;s<i;++s)r.push(e[s]+256&255);return i}function V(e,t,r){for(var n=0,o=e.length,i=t;i<o&&n<64;){var a=e[i];if(0===a)break;if(F(a)&&i+1<o&&F(e[i+1]))break;++i,++n}r.push(64|n-1);for(var s=t;s<i;++s){var l=e[s];r.push(l+65536>>8&255,l+256&255)}return i}k.MACSTRING=function(e,t){var r=function(e){if(!U)for(var t in U={},I)U[t]=new String(t);var r=U[e];if(void 0!==r){if(N){var n=N.get(r);if(void 0!==n)return n}var o=I[e];if(void 0!==o){for(var i={},a=0;a<o.length;a++)i[o.charCodeAt(a)]=a+128;return N&&N.set(r,i),i}}}(t);if(void 0!==r){for(var n=[],o=0;o<e.length;o++){var i=e.charCodeAt(o);if(128<=i&&void 0===(i=r[i]))return;n[o]=i}return n}},A.MACSTRING=function(e,t){var r=k.MACSTRING(e,t);return void 0!==r?r.length:0},k.VARDELTAS=function(e){for(var t=0,r=[];t<e.length;){var n=e[t];t=0===n?B(e,t,r):-128<=n&&n<=127?G(e,t,r):V(e,t,r)}return r},k.INDEX=function(e){for(var t=1,r=[t],n=[],o=0;o<e.length;o+=1){var i=k.OBJECT(e[o]);Array.prototype.push.apply(n,i),t+=i.length,r.push(t)}if(0===n.length)return[0,0];for(var a=[],s=1+Math.floor(Math.log(t)/Math.log(2))/8|0,l=[void 0,k.BYTE,k.USHORT,k.UINT24,k.ULONG][s],u=0;u<r.length;u+=1){var c=l(r[u]);Array.prototype.push.apply(a,c)}return Array.prototype.concat(k.Card16(e.length),k.OffSize(s),a,n)},A.INDEX=function(e){return k.INDEX(e).length},k.DICT=function(e){for(var t=[],r=Object.keys(e),n=r.length,o=0;o<n;o+=1){var i=parseInt(r[o],0),a=e[i];t=(t=t.concat(k.OPERAND(a.value,a.type))).concat(k.OPERATOR(i))}return t},A.DICT=function(e){return k.DICT(e).length},k.OPERATOR=function(e){return e<1200?[e]:[12,e-1200]},k.OPERAND=function(e,t){var r=[];if(Array.isArray(t))for(var n=0;n<t.length;n+=1)L.argument(e.length===t.length,"Not enough arguments given for type"+t),r=r.concat(k.OPERAND(e[n],t[n]));else if("SID"===t)r=r.concat(k.NUMBER(e));else if("offset"===t)r=r.concat(k.NUMBER32(e));else if("number"===t)r=r.concat(k.NUMBER(e));else{if("real"!==t)throw new Error("Unknown operand type "+t);r=r.concat(k.REAL(e))}return r},k.OP=k.BYTE,A.OP=A.BYTE;var z="function"==typeof WeakMap&&new WeakMap;function H(e,t,r){for(var n=0;n<t.length;n+=1){var o=t[n];this[o.name]=o.value}if(this.tableName=e,this.fields=t,r)for(var i=Object.keys(r),a=0;a<i.length;a+=1){var s=i[a],l=r[s];void 0!==this[s]&&(this[s]=l)}}function q(e,t,r){void 0===r&&(r=t.length);var n=new Array(t.length+1);n[0]={name:e+"Count",type:"USHORT",value:r};for(var o=0;o<t.length;o++)n[o+1]={name:e+o,type:"USHORT",value:t[o]};return n}function W(e,t,r){var n=t.length,o=new Array(n+1);o[0]={name:e+"Count",type:"USHORT",value:n};for(var i=0;i<n;i++)o[i+1]={name:e+i,type:"TABLE",value:r(t[i],i)};return o}function X(e,t,r){var n=t.length,o=[];o[0]={name:e+"Count",type:"USHORT",value:n};for(var i=0;i<n;i++)o=o.concat(r(t[i],i));return o}function Y(e){1===e.format?H.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:1}].concat(q("glyph",e.glyphs))):L.assert(!1,"Can't create coverage table format 2 yet.")}function Z(e){H.call(this,"scriptListTable",X("scriptRecord",e,function(e,t){var r=e.script,n=r.defaultLangSys;return L.assert(!!n,"Unable to write GSUB: script "+e.tag+" has no default language system."),[{name:"scriptTag"+t,type:"TAG",value:e.tag},{name:"script"+t,type:"TABLE",value:new H("scriptTable",[{name:"defaultLangSys",type:"TABLE",value:new H("defaultLangSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:n.reqFeatureIndex}].concat(q("featureIndex",n.featureIndexes)))}].concat(X("langSys",r.langSysRecords,function(e,t){var r=e.langSys;return[{name:"langSysTag"+t,type:"TAG",value:e.tag},{name:"langSys"+t,type:"TABLE",value:new H("langSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:r.reqFeatureIndex}].concat(q("featureIndex",r.featureIndexes)))}]})))}]}))}function Q(e){H.call(this,"featureListTable",X("featureRecord",e,function(e,t){var r=e.feature;return[{name:"featureTag"+t,type:"TAG",value:e.tag},{name:"feature"+t,type:"TABLE",value:new H("featureTable",[{name:"featureParams",type:"USHORT",value:r.featureParams}].concat(q("lookupListIndex",r.lookupListIndexes)))}]}))}function K(e,r){H.call(this,"lookupListTable",W("lookup",e,function(e){var t=r[e.lookupType];return L.assert(!!t,"Unable to write GSUB lookup type "+e.lookupType+" tables."),new H("lookupTable",[{name:"lookupType",type:"USHORT",value:e.lookupType},{name:"lookupFlag",type:"USHORT",value:e.lookupFlag}].concat(W("subtable",e.subtables,t)))}))}k.CHARSTRING=function(e){if(z){var t=z.get(e);if(void 0!==t)return t}for(var r=[],n=e.length,o=0;o<n;o+=1){var i=e[o];r=r.concat(k[i.type](i.value))}return z&&z.set(e,r),r},A.CHARSTRING=function(e){return k.CHARSTRING(e).length},k.OBJECT=function(e){var t=k[e.type];return L.argument(void 0!==t,"No encoding function for type "+e.type),t(e.value)},A.OBJECT=function(e){var t=A[e.type];return L.argument(void 0!==t,"No sizeOf function for type "+e.type),t(e.value)},k.TABLE=function(e){for(var t=[],r=e.fields.length,n=[],o=[],i=0;i<r;i+=1){var a=e.fields[i],s=k[a.type];L.argument(void 0!==s,"No encoding function for field type "+a.type+" ("+a.name+")");var l=e[a.name];void 0===l&&(l=a.value);var u=s(l);"TABLE"===a.type?(o.push(t.length),t=t.concat([0,0]),n.push(u)):t=t.concat(u)}for(var c=0;c<n.length;c+=1){var d=o[c],f=t.length;L.argument(f<65536,"Table "+e.tableName+" too big."),t[d]=f>>8,t[d+1]=255&f,t=t.concat(n[c])}return t},A.TABLE=function(e){for(var t=0,r=e.fields.length,n=0;n<r;n+=1){var o=e.fields[n],i=A[o.type];L.argument(void 0!==i,"No sizeOf function for field type "+o.type+" ("+o.name+")");var a=e[o.name];void 0===a&&(a=o.value),t+=i(a),"TABLE"===o.type&&(t+=2)}return t},k.RECORD=k.TABLE,A.RECORD=A.TABLE,k.LITERAL=function(e){return e},A.LITERAL=function(e){return e.length},H.prototype.encode=function(){return k.TABLE(this)},H.prototype.sizeOf=function(){return A.TABLE(this)};var J={Table:H,Record:H,Coverage:(Y.prototype=Object.create(H.prototype)).constructor=Y,ScriptList:(Z.prototype=Object.create(H.prototype)).constructor=Z,FeatureList:(Q.prototype=Object.create(H.prototype)).constructor=Q,LookupList:(K.prototype=Object.create(H.prototype)).constructor=K,ushortList:q,tableList:W,recordList:X};function $(e,t){return e.getUint8(t)}function ee(e,t){return e.getUint16(t,!1)}function te(e,t){return e.getUint32(t,!1)}function re(e,t){return e.getInt16(t,!1)+e.getUint16(t+2,!1)/65535}var ne={byte:1,uShort:2,short:2,uLong:4,fixed:4,longDateTime:8,tag:4};function oe(e,t){this.data=e,this.offset=t,this.relativeOffset=0}oe.prototype.parseByte=function(){var e=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,e},oe.prototype.parseChar=function(){var e=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,e},oe.prototype.parseCard8=oe.prototype.parseByte,oe.prototype.parseCard16=oe.prototype.parseUShort=function(){var e=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,e},oe.prototype.parseSID=oe.prototype.parseUShort,oe.prototype.parseOffset16=oe.prototype.parseUShort,oe.prototype.parseShort=function(){var e=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,e},oe.prototype.parseF2Dot14=function(){var e=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,e},oe.prototype.parseOffset32=oe.prototype.parseULong=function(){var e=te(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,e},oe.prototype.parseFixed=function(){var e=re(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,e},oe.prototype.parseString=function(e){var t=this.data,r=this.offset+this.relativeOffset,n="";this.relativeOffset+=e;for(var o=0;o<e;o++)n+=String.fromCharCode(t.getUint8(r+o));return n},oe.prototype.parseTag=function(){return this.parseString(4)},oe.prototype.parseLongDateTime=function(){var e=te(this.data,this.offset+this.relativeOffset+4);return e-=2082844800,this.relativeOffset+=8,e},oe.prototype.parseVersion=function(e){var t=ee(this.data,this.offset+this.relativeOffset),r=ee(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,void 0===e&&(e=4096),t+r/e/10},oe.prototype.skip=function(e,t){void 0===t&&(t=1),this.relativeOffset+=ne[e]*t},oe.prototype.parseULongList=function(e){void 0===e&&(e=this.parseULong());for(var t=new Array(e),r=this.data,n=this.offset+this.relativeOffset,o=0;o<e;o++)t[o]=r.getUint32(n),n+=4;return this.relativeOffset+=4*e,t},oe.prototype.parseOffset16List=oe.prototype.parseUShortList=function(e){void 0===e&&(e=this.parseUShort());for(var t=new Array(e),r=this.data,n=this.offset+this.relativeOffset,o=0;o<e;o++)t[o]=r.getUint16(n),n+=2;return this.relativeOffset+=2*e,t},oe.prototype.parseShortList=function(e){for(var t=new Array(e),r=this.data,n=this.offset+this.relativeOffset,o=0;o<e;o++)t[o]=r.getInt16(n),n+=2;return this.relativeOffset+=2*e,t},oe.prototype.parseByteList=function(e){for(var t=new Array(e),r=this.data,n=this.offset+this.relativeOffset,o=0;o<e;o++)t[o]=r.getUint8(n++);return this.relativeOffset+=e,t},oe.prototype.parseList=function(e,t){t||(t=e,e=this.parseUShort());for(var r=new Array(e),n=0;n<e;n++)r[n]=t.call(this);return r},oe.prototype.parseList32=function(e,t){t||(t=e,e=this.parseULong());for(var r=new Array(e),n=0;n<e;n++)r[n]=t.call(this);return r},oe.prototype.parseRecordList=function(e,t){t||(t=e,e=this.parseUShort());for(var r=new Array(e),n=Object.keys(t),o=0;o<e;o++){for(var i={},a=0;a<n.length;a++){var s=n[a],l=t[s];i[s]=l.call(this)}r[o]=i}return r},oe.prototype.parseRecordList32=function(e,t){t||(t=e,e=this.parseULong());for(var r=new Array(e),n=Object.keys(t),o=0;o<e;o++){for(var i={},a=0;a<n.length;a++){var s=n[a],l=t[s];i[s]=l.call(this)}r[o]=i}return r},oe.prototype.parseStruct=function(e){if("function"==typeof e)return e.call(this);for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n],i=e[o];r[o]=i.call(this)}return r},oe.prototype.parseValueRecord=function(e){if(void 0===e&&(e=this.parseUShort()),0!==e){var t={};return 1&e&&(t.xPlacement=this.parseShort()),2&e&&(t.yPlacement=this.parseShort()),4&e&&(t.xAdvance=this.parseShort()),8&e&&(t.yAdvance=this.parseShort()),16&e&&(t.xPlaDevice=void 0,this.parseShort()),32&e&&(t.yPlaDevice=void 0,this.parseShort()),64&e&&(t.xAdvDevice=void 0,this.parseShort()),128&e&&(t.yAdvDevice=void 0,this.parseShort()),t}},oe.prototype.parseValueRecordList=function(){for(var e=this.parseUShort(),t=this.parseUShort(),r=new Array(t),n=0;n<t;n++)r[n]=this.parseValueRecord(e);return r},oe.prototype.parsePointer=function(e){var t=this.parseOffset16();if(0<t)return new oe(this.data,this.offset+t).parseStruct(e)},oe.prototype.parsePointer32=function(e){var t=this.parseOffset32();if(0<t)return new oe(this.data,this.offset+t).parseStruct(e)},oe.prototype.parseListOfLists=function(e){for(var t=this.parseOffset16List(),r=t.length,n=this.relativeOffset,o=new Array(r),i=0;i<r;i++){var a=t[i];if(0!==a)if(this.relativeOffset=a,e){for(var s=this.parseOffset16List(),l=new Array(s.length),u=0;u<s.length;u++)this.relativeOffset=a+s[u],l[u]=e.call(this);o[i]=l}else o[i]=this.parseUShortList();else o[i]=void 0}return this.relativeOffset=n,o},oe.prototype.parseCoverage=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort(),r=this.parseUShort();if(1===t)return{format:1,glyphs:this.parseUShortList(r)};if(2!==t)throw new Error("0x"+e.toString(16)+": Coverage format must be 1 or 2.");for(var n=new Array(r),o=0;o<r;o++)n[o]={start:this.parseUShort(),end:this.parseUShort(),index:this.parseUShort()};return{format:2,ranges:n}},oe.prototype.parseClassDef=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(1===t)return{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()};if(2===t)return{format:2,ranges:this.parseRecordList({start:oe.uShort,end:oe.uShort,classId:oe.uShort})};throw new Error("0x"+e.toString(16)+": ClassDef format must be 1 or 2.")},oe.list=function(e,t){return function(){return this.parseList(e,t)}},oe.list32=function(e,t){return function(){return this.parseList32(e,t)}},oe.recordList=function(e,t){return function(){return this.parseRecordList(e,t)}},oe.recordList32=function(e,t){return function(){return this.parseRecordList32(e,t)}},oe.pointer=function(e){return function(){return this.parsePointer(e)}},oe.pointer32=function(e){return function(){return this.parsePointer32(e)}},oe.tag=oe.prototype.parseTag,oe.byte=oe.prototype.parseByte,oe.uShort=oe.offset16=oe.prototype.parseUShort,oe.uShortList=oe.prototype.parseUShortList,oe.uLong=oe.offset32=oe.prototype.parseULong,oe.uLongList=oe.prototype.parseULongList,oe.struct=oe.prototype.parseStruct,oe.coverage=oe.prototype.parseCoverage,oe.classDef=oe.prototype.parseClassDef;var ie={reserved:oe.uShort,reqFeatureIndex:oe.uShort,featureIndexes:oe.uShortList};oe.prototype.parseScriptList=function(){return this.parsePointer(oe.recordList({tag:oe.tag,script:oe.pointer({defaultLangSys:oe.pointer(ie),langSysRecords:oe.recordList({tag:oe.tag,langSys:oe.pointer(ie)})})}))||[]},oe.prototype.parseFeatureList=function(){return this.parsePointer(oe.recordList({tag:oe.tag,feature:oe.pointer({featureParams:oe.offset16,lookupListIndexes:oe.uShortList})}))||[]},oe.prototype.parseLookupList=function(n){return this.parsePointer(oe.list(oe.pointer(function(){var e=this.parseUShort();L.argument(1<=e&&e<=9,"GPOS/GSUB lookup type "+e+" unknown.");var t=this.parseUShort(),r=16&t;return{lookupType:e,lookupFlag:t,subtables:this.parseList(oe.pointer(n[e])),markFilteringSet:r?this.parseUShort():void 0}})))||[]},oe.prototype.parseFeatureVariationsList=function(){return this.parsePointer32(function(){var e=this.parseUShort(),t=this.parseUShort();return L.argument(1===e&&t<1,"GPOS/GSUB feature variations table unknown."),this.parseRecordList32({conditionSetOffset:oe.offset32,featureTableSubstitutionOffset:oe.offset32})})||[]};var ae={getByte:$,getCard8:$,getUShort:ee,getCard16:ee,getShort:function(e,t){return e.getInt16(t,!1)},getULong:te,getFixed:re,getTag:function(e,t){for(var r="",n=t;n<t+4;n+=1)r+=String.fromCharCode(e.getInt8(n));return r},getOffset:function(e,t,r){for(var n=0,o=0;o<r;o+=1)n<<=8,n+=e.getUint8(t+o);return n},getBytes:function(e,t,r){for(var n=[],o=t;o<r;o+=1)n.push(e.getUint8(o));return n},bytesToString:function(e){for(var t="",r=0;r<e.length;r+=1)t+=String.fromCharCode(e[r]);return t},Parser:oe};var se={parse:function(e,t){var r={};r.version=ae.getUShort(e,t),L.argument(0===r.version,"cmap table version should be 0."),r.numTables=ae.getUShort(e,t+2);for(var n=-1,o=r.numTables-1;0<=o;--o){var i=ae.getUShort(e,t+4+8*o),a=ae.getUShort(e,t+4+8*o+2);if(3===i&&(0===a||1===a||10===a)||0===i&&(0===a||1===a||2===a||3===a||4===a)){n=ae.getULong(e,t+4+8*o+4);break}}if(-1===n)throw new Error("No valid cmap sub-tables found.");var s=new ae.Parser(e,t+n);if(r.format=s.parseUShort(),12===r.format)!function(e,t){var r;t.parseUShort(),e.length=t.parseULong(),e.language=t.parseULong(),e.groupCount=r=t.parseULong(),e.glyphIndexMap={};for(var n=0;n<r;n+=1)for(var o=t.parseULong(),i=t.parseULong(),a=t.parseULong(),s=o;s<=i;s+=1)e.glyphIndexMap[s]=a,a++}(r,s);else{if(4!==r.format)throw new Error("Only format 4 and 12 cmap tables are supported (found format "+r.format+").");!function(e,t,r,n,o){var i;e.length=t.parseUShort(),e.language=t.parseUShort(),e.segCount=i=t.parseUShort()>>1,t.skip("uShort",3),e.glyphIndexMap={};for(var a=new ae.Parser(r,n+o+14),s=new ae.Parser(r,n+o+16+2*i),l=new ae.Parser(r,n+o+16+4*i),u=new ae.Parser(r,n+o+16+6*i),c=n+o+16+8*i,d=0;d<i-1;d+=1)for(var f=void 0,h=a.parseUShort(),p=s.parseUShort(),y=l.parseShort(),m=u.parseUShort(),g=p;g<=h;g+=1)0!==m?(c=u.offset+u.relativeOffset-2,c+=m,c+=2*(g-p),0!==(f=ae.getUShort(r,c))&&(f=f+y&65535)):f=g+y&65535,e.glyphIndexMap[g]=f}(r,s,e,t,n)}return r},make:function(e){var t,r=!0;for(t=e.length-1;0<t;--t){if(65535<e.get(t).unicode){console.log("Adding CMAP format 12 (needed!)"),r=!1;break}}var n=[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:r?1:2},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:r?12:20}];r||(n=n.concat([{name:"cmap12PlatformID",type:"USHORT",value:3},{name:"cmap12EncodingID",type:"USHORT",value:10},{name:"cmap12Offset",type:"ULONG",value:0}])),n=n.concat([{name:"format",type:"USHORT",value:4},{name:"cmap4Length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);var o,i,a,s=new J.Table("cmap",n);for(s.segments=[],t=0;t<e.length;t+=1){for(var l=e.get(t),u=0;u<l.unicodes.length;u+=1)o=s,i=l.unicodes[u],a=t,o.segments.push({end:i,start:i,delta:-(i-a),offset:0,glyphIndex:a});s.segments=s.segments.sort(function(e,t){return e.start-t.start})}s.segments.push({end:65535,start:65535,delta:1,offset:0});var c=s.segments.length,d=0,f=[],h=[],p=[],y=[],m=[],g=[];for(t=0;t<c;t+=1){var v=s.segments[t];v.end<=65535&&v.start<=65535?(f=f.concat({name:"end_"+t,type:"USHORT",value:v.end}),h=h.concat({name:"start_"+t,type:"USHORT",value:v.start}),p=p.concat({name:"idDelta_"+t,type:"SHORT",value:v.delta}),y=y.concat({name:"idRangeOffset_"+t,type:"USHORT",value:v.offset}),void 0!==v.glyphId&&(m=m.concat({name:"glyph_"+t,type:"USHORT",value:v.glyphId}))):d+=1,r||void 0===v.glyphIndex||(g=(g=(g=g.concat({name:"cmap12Start_"+t,type:"ULONG",value:v.start})).concat({name:"cmap12End_"+t,type:"ULONG",value:v.end})).concat({name:"cmap12Glyph_"+t,type:"ULONG",value:v.glyphIndex}))}if(s.segCountX2=2*(c-d),s.searchRange=2*Math.pow(2,Math.floor(Math.log(c-d)/Math.log(2))),s.entrySelector=Math.log(s.searchRange/2)/Math.log(2),s.rangeShift=s.segCountX2-s.searchRange,s.fields=s.fields.concat(f),s.fields.push({name:"reservedPad",type:"USHORT",value:0}),s.fields=s.fields.concat(h),s.fields=s.fields.concat(p),s.fields=s.fields.concat(y),s.fields=s.fields.concat(m),s.cmap4Length=14+2*f.length+2+2*h.length+2*p.length+2*y.length+2*m.length,!r){var b=16+4*g.length;s.cmap12Offset=20+s.cmap4Length,s.fields=s.fields.concat([{name:"cmap12Format",type:"USHORT",value:12},{name:"cmap12Reserved",type:"USHORT",value:0},{name:"cmap12Length",type:"ULONG",value:b},{name:"cmap12Language",type:"ULONG",value:0},{name:"cmap12nGroups",type:"ULONG",value:g.length/3}]),s.fields=s.fields.concat(g)}return s}},le=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],ue=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],ce=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],de=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];function fe(e){this.font=e}function he(e){this.cmap=e}function pe(e,t){this.encoding=e,this.charset=t}function ye(e){switch(e.version){case 1:this.names=de.slice();break;case 2:this.names=new Array(e.numberOfGlyphs);for(var t=0;t<e.numberOfGlyphs;t++)e.glyphNameIndex[t]<de.length?this.names[t]=de[e.glyphNameIndex[t]]:this.names[t]=e.names[e.glyphNameIndex[t]-de.length];break;case 2.5:this.names=new Array(e.numberOfGlyphs);for(var r=0;r<e.numberOfGlyphs;r++)this.names[r]=de[r+e.glyphNameIndex[r]];break;case 3:default:this.names=[]}}fe.prototype.charToGlyphIndex=function(e){var t=e.codePointAt(0),r=this.font.glyphs;if(r)for(var n=0;n<r.length;n+=1)for(var o=r.get(n),i=0;i<o.unicodes.length;i+=1)if(o.unicodes[i]===t)return n;return null},he.prototype.charToGlyphIndex=function(e){return this.cmap.glyphIndexMap[e.codePointAt(0)]||0},pe.prototype.charToGlyphIndex=function(e){var t=e.codePointAt(0),r=this.encoding[t];return this.charset.indexOf(r)},ye.prototype.nameToGlyphIndex=function(e){return this.names.indexOf(e)},ye.prototype.glyphIndexToName=function(e){return this.names[e]};var me={line:function(e,t,r,n,o){e.beginPath(),e.moveTo(t,r),e.lineTo(n,o),e.stroke()}};function ge(e){this.bindConstructorValues(e)}function ve(t,e,r){Object.defineProperty(t,e,{get:function(){return t.path,t[r]},set:function(e){t[r]=e},enumerable:!0,configurable:!0})}function be(e,t){if(this.font=e,this.glyphs={},Array.isArray(t))for(var r=0;r<t.length;r++)this.glyphs[r]=t[r];this.length=t&&t.length||0}ge.prototype.bindConstructorValues=function(e){var t,r;this.index=e.index||0,this.name=e.name||null,this.unicode=e.unicode||void 0,this.unicodes=e.unicodes||void 0!==e.unicode?[e.unicode]:[],e.xMin&&(this.xMin=e.xMin),e.yMin&&(this.yMin=e.yMin),e.xMax&&(this.xMax=e.xMax),e.yMax&&(this.yMax=e.yMax),e.advanceWidth&&(this.advanceWidth=e.advanceWidth),Object.defineProperty(this,"path",(t=e.path,r=t||new D,{configurable:!0,get:function(){return"function"==typeof r&&(r=r()),r},set:function(e){r=e}}))},ge.prototype.addUnicode=function(e){0===this.unicodes.length&&(this.unicode=e),this.unicodes.push(e)},ge.prototype.getBoundingBox=function(){return this.path.getBoundingBox()},ge.prototype.getPath=function(e,t,r,n,o){var i,a;e=void 0!==e?e:0,t=void 0!==t?t:0,r=void 0!==r?r:72;var s=(n=n||{}).xScale,l=n.yScale;if(n.hinting&&o&&o.hinting&&(a=this.path&&o.hinting.exec(this,r)),a)i=o.hinting.getCommands(a),e=Math.round(e),t=Math.round(t),s=l=1;else{i=this.path.commands;var u=1/this.path.unitsPerEm*r;void 0===s&&(s=u),void 0===l&&(l=u)}for(var c=new D,d=0;d<i.length;d+=1){var f=i[d];"M"===f.type?c.moveTo(e+f.x*s,t+-f.y*l):"L"===f.type?c.lineTo(e+f.x*s,t+-f.y*l):"Q"===f.type?c.quadraticCurveTo(e+f.x1*s,t+-f.y1*l,e+f.x*s,t+-f.y*l):"C"===f.type?c.curveTo(e+f.x1*s,t+-f.y1*l,e+f.x2*s,t+-f.y2*l,e+f.x*s,t+-f.y*l):"Z"===f.type&&c.closePath()}return c},ge.prototype.getContours=function(){if(void 0===this.points)return[];for(var e=[],t=[],r=0;r<this.points.length;r+=1){var n=this.points[r];t.push(n),n.lastPointOfContour&&(e.push(t),t=[])}return L.argument(0===t.length,"There are still points left in the current contour."),e},ge.prototype.getMetrics=function(){for(var e=this.path.commands,t=[],r=[],n=0;n<e.length;n+=1){var o=e[n];"Z"!==o.type&&(t.push(o.x),r.push(o.y)),"Q"!==o.type&&"C"!==o.type||(t.push(o.x1),r.push(o.y1)),"C"===o.type&&(t.push(o.x2),r.push(o.y2))}var i={xMin:Math.min.apply(null,t),yMin:Math.min.apply(null,r),xMax:Math.max.apply(null,t),yMax:Math.max.apply(null,r),leftSideBearing:this.leftSideBearing};return isFinite(i.xMin)||(i.xMin=0),isFinite(i.xMax)||(i.xMax=this.advanceWidth),isFinite(i.yMin)||(i.yMin=0),isFinite(i.yMax)||(i.yMax=0),i.rightSideBearing=this.advanceWidth-i.leftSideBearing-(i.xMax-i.xMin),i},ge.prototype.draw=function(e,t,r,n,o){this.getPath(t,r,n,o).draw(e)},ge.prototype.drawPoints=function(a,e,t,r){function n(e,t,r,n){var o=2*Math.PI;a.beginPath();for(var i=0;i<e.length;i+=1)a.moveTo(t+e[i].x*n,r+e[i].y*n),a.arc(t+e[i].x*n,r+e[i].y*n,2,0,o,!1);a.closePath(),a.fill()}e=void 0!==e?e:0,t=void 0!==t?t:0,r=void 0!==r?r:24;for(var o=1/this.path.unitsPerEm*r,i=[],s=[],l=this.path,u=0;u<l.commands.length;u+=1){var c=l.commands[u];void 0!==c.x&&i.push({x:c.x,y:-c.y}),void 0!==c.x1&&s.push({x:c.x1,y:-c.y1}),void 0!==c.x2&&s.push({x:c.x2,y:-c.y2})}a.fillStyle="blue",n(i,e,t,o),a.fillStyle="red",n(s,e,t,o)},ge.prototype.drawMetrics=function(e,t,r,n){var o;t=void 0!==t?t:0,r=void 0!==r?r:0,n=void 0!==n?n:24,o=1/this.path.unitsPerEm*n,e.lineWidth=1,e.strokeStyle="black",me.line(e,t,-1e4,t,1e4),me.line(e,-1e4,r,1e4,r);var i=this.xMin||0,a=this.yMin||0,s=this.xMax||0,l=this.yMax||0,u=this.advanceWidth||0;e.strokeStyle="blue",me.line(e,t+i*o,-1e4,t+i*o,1e4),me.line(e,t+s*o,-1e4,t+s*o,1e4),me.line(e,-1e4,r+-a*o,1e4,r+-a*o),me.line(e,-1e4,r+-l*o,1e4,r+-l*o),e.strokeStyle="green",me.line(e,t+u*o,-1e4,t+u*o,1e4)},be.prototype.get=function(e){return"function"==typeof this.glyphs[e]&&(this.glyphs[e]=this.glyphs[e]()),this.glyphs[e]},be.prototype.push=function(e,t){this.glyphs[e]=t,this.length++};var _e={GlyphSet:be,glyphLoader:function(e,t){return new ge({index:t,font:e})},ttfGlyphLoader:function(r,e,n,o,i,a){return function(){var t=new ge({index:e,font:r});return t.path=function(){n(t,o,i);var e=a(r.glyphs,t);return e.unitsPerEm=r.unitsPerEm,e},ve(t,"xMin","_xMin"),ve(t,"xMax","_xMax"),ve(t,"yMin","_yMin"),ve(t,"yMax","_yMax"),t}},cffGlyphLoader:function(r,e,n,o){return function(){var t=new ge({index:e,font:r});return t.path=function(){var e=n(r,t,o);return e.unitsPerEm=r.unitsPerEm,e},t}}};function xe(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r+=1)if(!xe(e[r],t[r]))return!1;return!0}return!1}function we(e){return e.length<1240?107:e.length<33900?1131:32768}function Se(e,t,r){var n,o,i=[],a=[],s=ae.getCard16(e,t);if(0!==s){var l=ae.getByte(e,t+2);n=t+(s+1)*l+2;for(var u=t+3,c=0;c<s+1;c+=1)i.push(ae.getOffset(e,u,l)),u+=l;o=n+i[s]}else o=t+2;for(var d=0;d<i.length-1;d+=1){var f=ae.getBytes(e,n+i[d],n+i[d+1]);r&&(f=r(f)),a.push(f)}return{objects:a,startOffset:t,endOffset:o}}function je(e,t){if(28===t)return e.parseByte()<<8|e.parseByte();if(29===t)return e.parseByte()<<24|e.parseByte()<<16|e.parseByte()<<8|e.parseByte();if(30===t)return function(e){for(var t="",r=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];;){var n=e.parseByte(),o=n>>4,i=15&n;if(15==o)break;if(t+=r[o],15==i)break;t+=r[i]}return parseFloat(t)}(e);if(32<=t&&t<=246)return t-139;if(247<=t&&t<=250)return 256*(t-247)+e.parseByte()+108;if(251<=t&&t<=254)return 256*-(t-251)-e.parseByte()-108;throw new Error("Invalid b0 "+t)}function Me(e,t,r){t=void 0!==t?t:0;var n=new ae.Parser(e,t),o=[],i=[];for(r=void 0!==r?r:e.length;n.relativeOffset<r;){var a=n.parseByte();a<=21?(12===a&&(a=1200+n.parseByte()),o.push([a,i]),i=[]):i.push(je(n,a))}return function(e){for(var t={},r=0;r<e.length;r+=1){var n=e[r][0],o=e[r][1],i=void 0;if(i=1===o.length?o[0]:o,t.hasOwnProperty(n)&&!isNaN(t[n]))throw new Error("Object "+t+" already has key "+n);t[n]=i}return t}(o)}function Ee(e,t){return t=t<=390?le[t]:e[t-391]}function Te(e,t,r){for(var n,o={},i=0;i<t.length;i+=1){var a=t[i];if(Array.isArray(a.type)){var s=[];s.length=a.type.length;for(var l=0;l<a.type.length;l++)void 0===(n=void 0!==e[a.op]?e[a.op][l]:void 0)&&(n=void 0!==a.value&&void 0!==a.value[l]?a.value[l]:null),"SID"===a.type[l]&&(n=Ee(r,n)),s[l]=n;o[a.name]=s}else void 0===(n=e[a.op])&&(n=void 0!==a.value?a.value:null),"SID"===a.type&&(n=Ee(r,n)),o[a.name]=n}return o}var Oe=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]},{name:"ros",op:1230,type:["SID","SID","number"]},{name:"cidFontVersion",op:1231,type:"number",value:0},{name:"cidFontRevision",op:1232,type:"number",value:0},{name:"cidFontType",op:1233,type:"number",value:0},{name:"cidCount",op:1234,type:"number",value:8720},{name:"uidBase",op:1235,type:"number"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"fontName",op:1238,type:"SID"}],Ce=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}];function Le(e,t,r,n){return Te(Me(e,t,r),Ce,n)}function Pe(e,t,r,n){for(var o,i,a=[],s=0;s<r.length;s+=1){var l=new DataView(new Uint8Array(r[s]).buffer),u=(i=n,Te(Me(o=l,0,o.byteLength),Oe,i));u._subrs=[],u._subrsBias=0;var c=u.private[0],d=u.private[1];if(0!==c&&0!==d){var f=Le(e,d+t,c,n);if(u._defaultWidthX=f.defaultWidthX,u._nominalWidthX=f.nominalWidthX,0!==f.subrs){var h=Se(e,d+f.subrs+t);u._subrs=h.objects,u._subrsBias=we(u._subrs)}u._privateDict=f}a.push(u)}return a}function ke(m,g,e){var v,b,_,x,w,S,t,j,M=new D,E=[],T=0,O=!1,C=!1,L=0,P=0;if(m.isCIDFont){var r=m.tables.cff.topDict._fdSelect[g.index],n=m.tables.cff.topDict._fdArray[r];w=n._subrs,S=n._subrsBias,t=n._defaultWidthX,j=n._nominalWidthX}else w=m.tables.cff.topDict._subrs,S=m.tables.cff.topDict._subrsBias,t=m.tables.cff.topDict._defaultWidthX,j=m.tables.cff.topDict._nominalWidthX;var k=t;function A(e,t){C&&M.closePath(),M.moveTo(e,t),C=!0}function R(){E.length%2==0||O||(k=E.shift()+j),T+=E.length>>1,E.length=0,O=!0}return function e(t){for(var r,n,o,i,a,s,l,u,c,d,f,h,p=0;p<t.length;){var y=t[p];switch(p+=1,y){case 1:case 3:R();break;case 4:1<E.length&&!O&&(k=E.shift()+j,O=!0),P+=E.pop(),A(L,P);break;case 5:for(;0<E.length;)L+=E.shift(),P+=E.shift(),M.lineTo(L,P);break;case 6:for(;0<E.length&&(L+=E.shift(),M.lineTo(L,P),0!==E.length);)P+=E.shift(),M.lineTo(L,P);break;case 7:for(;0<E.length&&(P+=E.shift(),M.lineTo(L,P),0!==E.length);)L+=E.shift(),M.lineTo(L,P);break;case 8:for(;0<E.length;)v=L+E.shift(),b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),L=_+E.shift(),P=x+E.shift(),M.curveTo(v,b,_,x,L,P);break;case 10:a=E.pop()+S,(s=w[a])&&e(s);break;case 11:return;case 12:switch(y=t[p],p+=1,y){case 35:v=L+E.shift(),b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),l=_+E.shift(),u=x+E.shift(),c=l+E.shift(),d=u+E.shift(),f=c+E.shift(),h=d+E.shift(),L=f+E.shift(),P=h+E.shift(),E.shift(),M.curveTo(v,b,_,x,l,u),M.curveTo(c,d,f,h,L,P);break;case 34:v=L+E.shift(),b=P,_=v+E.shift(),x=b+E.shift(),l=_+E.shift(),u=x,c=l+E.shift(),d=x,f=c+E.shift(),h=P,L=f+E.shift(),M.curveTo(v,b,_,x,l,u),M.curveTo(c,d,f,h,L,P);break;case 36:v=L+E.shift(),b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),l=_+E.shift(),u=x,c=l+E.shift(),d=x,f=c+E.shift(),h=d+E.shift(),L=f+E.shift(),M.curveTo(v,b,_,x,l,u),M.curveTo(c,d,f,h,L,P);break;case 37:v=L+E.shift(),b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),l=_+E.shift(),u=x+E.shift(),c=l+E.shift(),d=u+E.shift(),f=c+E.shift(),h=d+E.shift(),Math.abs(f-L)>Math.abs(h-P)?L=f+E.shift():P=h+E.shift(),M.curveTo(v,b,_,x,l,u),M.curveTo(c,d,f,h,L,P);break;default:console.log("Glyph "+g.index+": unknown operator 1200"+y),E.length=0}break;case 14:0<E.length&&!O&&(k=E.shift()+j,O=!0),C&&(M.closePath(),C=!1);break;case 18:R();break;case 19:case 20:R(),p+=T+7>>3;break;case 21:2<E.length&&!O&&(k=E.shift()+j,O=!0),P+=E.pop(),A(L+=E.pop(),P);break;case 22:1<E.length&&!O&&(k=E.shift()+j,O=!0),A(L+=E.pop(),P);break;case 23:R();break;case 24:for(;2<E.length;)v=L+E.shift(),b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),L=_+E.shift(),P=x+E.shift(),M.curveTo(v,b,_,x,L,P);L+=E.shift(),P+=E.shift(),M.lineTo(L,P);break;case 25:for(;6<E.length;)L+=E.shift(),P+=E.shift(),M.lineTo(L,P);v=L+E.shift(),b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),L=_+E.shift(),P=x+E.shift(),M.curveTo(v,b,_,x,L,P);break;case 26:for(E.length%2&&(L+=E.shift());0<E.length;)v=L,b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),L=_,P=x+E.shift(),M.curveTo(v,b,_,x,L,P);break;case 27:for(E.length%2&&(P+=E.shift());0<E.length;)v=L+E.shift(),b=P,_=v+E.shift(),x=b+E.shift(),L=_+E.shift(),P=x,M.curveTo(v,b,_,x,L,P);break;case 28:r=t[p],n=t[p+1],E.push((r<<24|n<<16)>>16),p+=2;break;case 29:a=E.pop()+m.gsubrsBias,(s=m.gsubrs[a])&&e(s);break;case 30:for(;0<E.length&&(v=L,b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),L=_+E.shift(),P=x+(1===E.length?E.shift():0),M.curveTo(v,b,_,x,L,P),0!==E.length);)v=L+E.shift(),b=P,_=v+E.shift(),x=b+E.shift(),P=x+E.shift(),L=_+(1===E.length?E.shift():0),M.curveTo(v,b,_,x,L,P);break;case 31:for(;0<E.length&&(v=L+E.shift(),b=P,_=v+E.shift(),x=b+E.shift(),P=x+E.shift(),L=_+(1===E.length?E.shift():0),M.curveTo(v,b,_,x,L,P),0!==E.length);)v=L,b=P+E.shift(),_=v+E.shift(),x=b+E.shift(),L=_+E.shift(),P=x+(1===E.length?E.shift():0),M.curveTo(v,b,_,x,L,P);break;default:y<32?console.log("Glyph "+g.index+": unknown operator "+y):y<247?E.push(y-139):y<251?(r=t[p],p+=1,E.push(256*(y-247)+r+108)):y<255?(r=t[p],p+=1,E.push(256*-(y-251)-r-108)):(r=t[p],n=t[p+1],o=t[p+2],i=t[p+3],p+=4,E.push((r<<24|n<<16|o<<8|i)/65536))}}}(e),g.advanceWidth=k,M}function Ae(e,t){var r,n=le.indexOf(e);return 0<=n&&(r=n),0<=(n=t.indexOf(e))?r=n+le.length:(r=le.length+t.length,t.push(e)),r}function Re(e,t,r){for(var n={},o=0;o<e.length;o+=1){var i=e[o],a=t[i.name];void 0===a||xe(a,i.value)||("SID"===i.type&&(a=Ae(a,r)),n[i.op]={name:i.name,type:i.type,value:a})}return n}function De(e,t){var r=new J.Record("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return r.dict=Re(Oe,e,t),r}function Ie(e){var t=new J.Record("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return t.topDicts=[{name:"topDict_0",type:"TABLE",value:e}],t}function Ue(e){var t=[],r=e.path;t.push({name:"width",type:"NUMBER",value:e.advanceWidth});for(var n=0,o=0,i=0;i<r.commands.length;i+=1){var a=void 0,s=void 0,l=r.commands[i];if("Q"===l.type){l={type:"C",x:l.x,y:l.y,x1:1/3*n+2/3*l.x1,y1:1/3*o+2/3*l.y1,x2:1/3*l.x+2/3*l.x1,y2:1/3*l.y+2/3*l.y1}}if("M"===l.type)a=Math.round(l.x-n),s=Math.round(l.y-o),t.push({name:"dx",type:"NUMBER",value:a}),t.push({name:"dy",type:"NUMBER",value:s}),t.push({name:"rmoveto",type:"OP",value:21}),n=Math.round(l.x),o=Math.round(l.y);else if("L"===l.type)a=Math.round(l.x-n),s=Math.round(l.y-o),t.push({name:"dx",type:"NUMBER",value:a}),t.push({name:"dy",type:"NUMBER",value:s}),t.push({name:"rlineto",type:"OP",value:5}),n=Math.round(l.x),o=Math.round(l.y);else if("C"===l.type){var u=Math.round(l.x1-n),c=Math.round(l.y1-o),d=Math.round(l.x2-l.x1),f=Math.round(l.y2-l.y1);a=Math.round(l.x-l.x2),s=Math.round(l.y-l.y2),t.push({name:"dx1",type:"NUMBER",value:u}),t.push({name:"dy1",type:"NUMBER",value:c}),t.push({name:"dx2",type:"NUMBER",value:d}),t.push({name:"dy2",type:"NUMBER",value:f}),t.push({name:"dx",type:"NUMBER",value:a}),t.push({name:"dy",type:"NUMBER",value:s}),t.push({name:"rrcurveto",type:"OP",value:8}),n=Math.round(l.x),o=Math.round(l.y)}}return t.push({name:"endchar",type:"OP",value:14}),t}var Ne={parse:function(e,t,r){r.tables.cff={};var n,o,i,a=Se(e,(n=e,o=t,(i={}).formatMajor=ae.getCard8(n,o),i.formatMinor=ae.getCard8(n,o+1),i.size=ae.getCard8(n,o+2),i.offsetSize=ae.getCard8(n,o+3),i.startOffset=o,i.endOffset=o+4,i).endOffset,ae.bytesToString),s=Se(e,a.endOffset),l=Se(e,s.endOffset,ae.bytesToString),u=Se(e,l.endOffset);r.gsubrs=u.objects,r.gsubrsBias=we(r.gsubrs);var c=Pe(e,t,s.objects,l.objects);if(1!==c.length)throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = "+c.length);var d=c[0];if((r.tables.cff.topDict=d)._privateDict&&(r.defaultWidthX=d._privateDict.defaultWidthX,r.nominalWidthX=d._privateDict.nominalWidthX),void 0!==d.ros[0]&&void 0!==d.ros[1]&&(r.isCIDFont=!0),r.isCIDFont){var f=d.fdArray,h=d.fdSelect;if(0===f||0===h)throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");var p=Pe(e,t,Se(e,f+=t).objects,l.objects);d._fdArray=p,h+=t,d._fdSelect=function(e,t,r,n){var o,i=[],a=new ae.Parser(e,t),s=a.parseCard8();if(0===s)for(var l=0;l<r;l++){if(n<=(o=a.parseCard8()))throw new Error("CFF table CID Font FDSelect has bad FD index value "+o+" (FD count "+n+")");i.push(o)}else{if(3!==s)throw new Error("CFF Table CID Font FDSelect table has unsupported format "+s);var u,c=a.parseCard16(),d=a.parseCard16();if(0!==d)throw new Error("CFF Table CID Font FDSelect format 3 range has bad initial GID "+d);for(var f=0;f<c;f++){if(o=a.parseCard8(),u=a.parseCard16(),n<=o)throw new Error("CFF table CID Font FDSelect has bad FD index value "+o+" (FD count "+n+")");if(r<u)throw new Error("CFF Table CID Font FDSelect format 3 range has bad GID "+u);for(;d<u;d++)i.push(o);d=u}if(u!==r)throw new Error("CFF Table CID Font FDSelect format 3 range has bad final GID "+u)}return i}(e,h,r.numGlyphs,p.length)}var y=t+d.private[1],m=Le(e,y,d.private[0],l.objects);if(r.defaultWidthX=m.defaultWidthX,r.nominalWidthX=m.nominalWidthX,0!==m.subrs){var g=Se(e,y+m.subrs);r.subrs=g.objects,r.subrsBias=we(r.subrs)}else r.subrs=[],r.subrsBias=0;var v=Se(e,t+d.charStrings);r.nGlyphs=v.objects.length;var b=function(e,t,r,n){var o,i,a=new ae.Parser(e,t);--r;var s=[".notdef"],l=a.parseCard8();if(0===l)for(var u=0;u<r;u+=1)o=a.parseSID(),s.push(Ee(n,o));else if(1===l)for(;s.length<=r;){o=a.parseSID(),i=a.parseCard8();for(var c=0;c<=i;c+=1)s.push(Ee(n,o)),o+=1}else{if(2!==l)throw new Error("Unknown charset format "+l);for(;s.length<=r;){o=a.parseSID(),i=a.parseCard16();for(var d=0;d<=i;d+=1)s.push(Ee(n,o)),o+=1}}return s}(e,t+d.charset,r.nGlyphs,l.objects);0===d.encoding?r.cffEncoding=new pe(ue,b):1===d.encoding?r.cffEncoding=new pe(ce,b):r.cffEncoding=function(e,t,r){var n,o={},i=new ae.Parser(e,t),a=i.parseCard8();if(0===a)for(var s=i.parseCard8(),l=0;l<s;l+=1)o[n=i.parseCard8()]=l;else{if(1!==a)throw new Error("Unknown encoding format "+a);var u=i.parseCard8();n=1;for(var c=0;c<u;c+=1)for(var d=i.parseCard8(),f=i.parseCard8(),h=d;h<=d+f;h+=1)o[h]=n,n+=1}return new pe(o,r)}(e,t+d.encoding,b),r.encoding=r.encoding||r.cffEncoding,r.glyphs=new _e.GlyphSet(r);for(var _=0;_<r.nGlyphs;_+=1){var x=v.objects[_];r.glyphs.push(_,_e.cffGlyphLoader(r,_,ke,x))}},make:function(e,t){for(var r,n=new J.Table("CFF ",[{name:"header",type:"RECORD"},{name:"nameIndex",type:"RECORD"},{name:"topDictIndex",type:"RECORD"},{name:"stringIndex",type:"RECORD"},{name:"globalSubrIndex",type:"RECORD"},{name:"charsets",type:"RECORD"},{name:"charStringsIndex",type:"RECORD"},{name:"privateDict",type:"RECORD"}]),o=1/t.unitsPerEm,i={version:t.version,fullName:t.fullName,familyName:t.familyName,weight:t.weightName,fontBBox:t.fontBBox||[0,0,0,0],fontMatrix:[o,0,0,o,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]},a=[],s=1;s<e.length;s+=1)r=e.get(s),a.push(r.name);var l=[];n.header=new J.Record("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}]),n.nameIndex=function(e){var t=new J.Record("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);t.names=[];for(var r=0;r<e.length;r+=1)t.names.push({name:"name_"+r,type:"NAME",value:e[r]});return t}([t.postScriptName]);var u,c,d,f=De(i,l);n.topDictIndex=Ie(f),n.globalSubrIndex=new J.Record("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}]),n.charsets=function(e,t){for(var r=new J.Record("Charsets",[{name:"format",type:"Card8",value:0}]),n=0;n<e.length;n+=1){var o=Ae(e[n],t);r.fields.push({name:"glyph_"+n,type:"SID",value:o})}return r}(a,l),n.charStringsIndex=function(e){for(var t=new J.Record("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]),r=0;r<e.length;r+=1){var n=e.get(r),o=Ue(n);t.charStrings.push({name:n.name,type:"CHARSTRING",value:o})}return t}(e),n.privateDict=(u={},c=l,(d=new J.Record("Private DICT",[{name:"dict",type:"DICT",value:{}}])).dict=Re(Ce,u,c),d),n.stringIndex=function(e){var t=new J.Record("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);t.strings=[];for(var r=0;r<e.length;r+=1)t.strings.push({name:"string_"+r,type:"STRING",value:e[r]});return t}(l);var h=n.header.sizeOf()+n.nameIndex.sizeOf()+n.topDictIndex.sizeOf()+n.stringIndex.sizeOf()+n.globalSubrIndex.sizeOf();return i.charset=h,i.encoding=0,i.charStrings=i.charset+n.charsets.sizeOf(),i.private[1]=i.charStrings+n.charStringsIndex.sizeOf(),f=De(i,l),n.topDictIndex=Ie(f),n}};var Fe={parse:function(e,t){var r={},n=new ae.Parser(e,t);return r.version=n.parseVersion(),r.fontRevision=Math.round(1e3*n.parseFixed())/1e3,r.checkSumAdjustment=n.parseULong(),r.magicNumber=n.parseULong(),L.argument(1594834165===r.magicNumber,"Font header has wrong magic number."),r.flags=n.parseUShort(),r.unitsPerEm=n.parseUShort(),r.created=n.parseLongDateTime(),r.modified=n.parseLongDateTime(),r.xMin=n.parseShort(),r.yMin=n.parseShort(),r.xMax=n.parseShort(),r.yMax=n.parseShort(),r.macStyle=n.parseUShort(),r.lowestRecPPEM=n.parseUShort(),r.fontDirectionHint=n.parseShort(),r.indexToLocFormat=n.parseShort(),r.glyphDataFormat=n.parseShort(),r},make:function(e){var t=Math.round((new Date).getTime()/1e3)+2082844800,r=t;return e.createdTimestamp&&(r=e.createdTimestamp+2082844800),new J.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:r},{name:"modified",type:"LONGDATETIME",value:t},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:0},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],e)}};var Be={parse:function(e,t){var r={},n=new ae.Parser(e,t);return r.version=n.parseVersion(),r.ascender=n.parseShort(),r.descender=n.parseShort(),r.lineGap=n.parseShort(),r.advanceWidthMax=n.parseUShort(),r.minLeftSideBearing=n.parseShort(),r.minRightSideBearing=n.parseShort(),r.xMaxExtent=n.parseShort(),r.caretSlopeRise=n.parseShort(),r.caretSlopeRun=n.parseShort(),r.caretOffset=n.parseShort(),n.relativeOffset+=8,r.metricDataFormat=n.parseShort(),r.numberOfHMetrics=n.parseUShort(),r},make:function(e){return new J.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],e)}};var Ge={parse:function(e,t,r,n,o){for(var i,a,s=new ae.Parser(e,t),l=0;l<n;l+=1){l<r&&(i=s.parseUShort(),a=s.parseShort());var u=o.get(l);u.advanceWidth=i,u.leftSideBearing=a}},make:function(e){for(var t=new J.Table("hmtx",[]),r=0;r<e.length;r+=1){var n=e.get(r),o=n.advanceWidth||0,i=n.leftSideBearing||0;t.fields.push({name:"advanceWidth_"+r,type:"USHORT",value:o}),t.fields.push({name:"leftSideBearing_"+r,type:"SHORT",value:i})}return t}};var Ve={make:function(e){for(var t=new J.Table("ltag",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"numTags",type:"ULONG",value:e.length}]),r="",n=12+4*e.length,o=0;o<e.length;++o){var i=r.indexOf(e[o]);i<0&&(i=r.length,r+=e[o]),t.fields.push({name:"offset "+o,type:"USHORT",value:n+i}),t.fields.push({name:"length "+o,type:"USHORT",value:e[o].length})}return t.fields.push({name:"stringPool",type:"CHARARRAY",value:r}),t},parse:function(e,t){var r=new ae.Parser(e,t),n=r.parseULong();L.argument(1===n,"Unsupported ltag table version."),r.skip("uLong",1);for(var o=r.parseULong(),i=[],a=0;a<o;a++){for(var s="",l=t+r.parseUShort(),u=r.parseUShort(),c=l;c<l+u;++c)s+=String.fromCharCode(e.getInt8(c));i.push(s)}return i}};var ze={parse:function(e,t){var r={},n=new ae.Parser(e,t);return r.version=n.parseVersion(),r.numGlyphs=n.parseUShort(),1===r.version&&(r.maxPoints=n.parseUShort(),r.maxContours=n.parseUShort(),r.maxCompositePoints=n.parseUShort(),r.maxCompositeContours=n.parseUShort(),r.maxZones=n.parseUShort(),r.maxTwilightPoints=n.parseUShort(),r.maxStorage=n.parseUShort(),r.maxFunctionDefs=n.parseUShort(),r.maxInstructionDefs=n.parseUShort(),r.maxStackElements=n.parseUShort(),r.maxSizeOfInstructions=n.parseUShort(),r.maxComponentElements=n.parseUShort(),r.maxComponentDepth=n.parseUShort()),r},make:function(e){return new J.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:e}])}},He=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","license","licenseURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"],qe={0:"en",1:"fr",2:"de",3:"it",4:"nl",5:"sv",6:"es",7:"da",8:"pt",9:"no",10:"he",11:"ja",12:"ar",13:"fi",14:"el",15:"is",16:"mt",17:"tr",18:"hr",19:"zh-Hant",20:"ur",21:"hi",22:"th",23:"ko",24:"lt",25:"pl",26:"hu",27:"es",28:"lv",29:"se",30:"fo",31:"fa",32:"ru",33:"zh",34:"nl-BE",35:"ga",36:"sq",37:"ro",38:"cz",39:"sk",40:"si",41:"yi",42:"sr",43:"mk",44:"bg",45:"uk",46:"be",47:"uz",48:"kk",49:"az-Cyrl",50:"az-Arab",51:"hy",52:"ka",53:"mo",54:"ky",55:"tg",56:"tk",57:"mn-CN",58:"mn",59:"ps",60:"ks",61:"ku",62:"sd",63:"bo",64:"ne",65:"sa",66:"mr",67:"bn",68:"as",69:"gu",70:"pa",71:"or",72:"ml",73:"kn",74:"ta",75:"te",76:"si",77:"my",78:"km",79:"lo",80:"vi",81:"id",82:"tl",83:"ms",84:"ms-Arab",85:"am",86:"ti",87:"om",88:"so",89:"sw",90:"rw",91:"rn",92:"ny",93:"mg",94:"eo",128:"cy",129:"eu",130:"ca",131:"la",132:"qu",133:"gn",134:"ay",135:"tt",136:"ug",137:"dz",138:"jv",139:"su",140:"gl",141:"af",142:"br",143:"iu",144:"gd",145:"gv",146:"ga",147:"to",148:"el-polyton",149:"kl",150:"az",151:"nn"},We={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},Xe={1078:"af",1052:"sq",1156:"gsw",1118:"am",5121:"ar-DZ",15361:"ar-BH",3073:"ar",2049:"ar-IQ",11265:"ar-JO",13313:"ar-KW",12289:"ar-LB",4097:"ar-LY",6145:"ary",8193:"ar-OM",16385:"ar-QA",1025:"ar-SA",10241:"ar-SY",7169:"aeb",14337:"ar-AE",9217:"ar-YE",1067:"hy",1101:"as",2092:"az-Cyrl",1068:"az",1133:"ba",1069:"eu",1059:"be",2117:"bn",1093:"bn-IN",8218:"bs-Cyrl",5146:"bs",1150:"br",1026:"bg",1027:"ca",3076:"zh-HK",5124:"zh-MO",2052:"zh",4100:"zh-SG",1028:"zh-TW",1155:"co",1050:"hr",4122:"hr-BA",1029:"cs",1030:"da",1164:"prs",1125:"dv",2067:"nl-BE",1043:"nl",3081:"en-AU",10249:"en-BZ",4105:"en-CA",9225:"en-029",16393:"en-IN",6153:"en-IE",8201:"en-JM",17417:"en-MY",5129:"en-NZ",13321:"en-PH",18441:"en-SG",7177:"en-ZA",11273:"en-TT",2057:"en-GB",1033:"en",12297:"en-ZW",1061:"et",1080:"fo",1124:"fil",1035:"fi",2060:"fr-BE",3084:"fr-CA",1036:"fr",5132:"fr-LU",6156:"fr-MC",4108:"fr-CH",1122:"fy",1110:"gl",1079:"ka",3079:"de-AT",1031:"de",5127:"de-LI",4103:"de-LU",2055:"de-CH",1032:"el",1135:"kl",1095:"gu",1128:"ha",1037:"he",1081:"hi",1038:"hu",1039:"is",1136:"ig",1057:"id",1117:"iu",2141:"iu-Latn",2108:"ga",1076:"xh",1077:"zu",1040:"it",2064:"it-CH",1041:"ja",1099:"kn",1087:"kk",1107:"km",1158:"quc",1159:"rw",1089:"sw",1111:"kok",1042:"ko",1088:"ky",1108:"lo",1062:"lv",1063:"lt",2094:"dsb",1134:"lb",1071:"mk",2110:"ms-BN",1086:"ms",1100:"ml",1082:"mt",1153:"mi",1146:"arn",1102:"mr",1148:"moh",1104:"mn",2128:"mn-CN",1121:"ne",1044:"nb",2068:"nn",1154:"oc",1096:"or",1123:"ps",1045:"pl",1046:"pt",2070:"pt-PT",1094:"pa",1131:"qu-BO",2155:"qu-EC",3179:"qu",1048:"ro",1047:"rm",1049:"ru",9275:"smn",4155:"smj-NO",5179:"smj",3131:"se-FI",1083:"se",2107:"se-SE",8251:"sms",6203:"sma-NO",7227:"sms",1103:"sa",7194:"sr-Cyrl-BA",3098:"sr",6170:"sr-Latn-BA",2074:"sr-Latn",1132:"nso",1074:"tn",1115:"si",1051:"sk",1060:"sl",11274:"es-AR",16394:"es-BO",13322:"es-CL",9226:"es-CO",5130:"es-CR",7178:"es-DO",12298:"es-EC",17418:"es-SV",4106:"es-GT",18442:"es-HN",2058:"es-MX",19466:"es-NI",6154:"es-PA",15370:"es-PY",10250:"es-PE",20490:"es-PR",3082:"es",1034:"es",21514:"es-US",14346:"es-UY",8202:"es-VE",2077:"sv-FI",1053:"sv",1114:"syr",1064:"tg",2143:"tzm",1097:"ta",1092:"tt",1098:"te",1054:"th",1105:"bo",1055:"tr",1090:"tk",1152:"ug",1058:"uk",1070:"hsb",1056:"ur",2115:"uz-Cyrl",1091:"uz",1066:"vi",1106:"cy",1160:"wo",1157:"sah",1144:"ii",1130:"yo"};function Ye(e,t,r){switch(e){case 0:if(65535===t)return"und";if(r)return r[t];break;case 1:return qe[t];case 3:return Xe[t]}}var Ze="utf-16",Qe={0:"macintosh",1:"x-mac-japanese",2:"x-mac-chinesetrad",3:"x-mac-korean",6:"x-mac-greek",7:"x-mac-cyrillic",9:"x-mac-devanagai",10:"x-mac-gurmukhi",11:"x-mac-gujarati",12:"x-mac-oriya",13:"x-mac-bengali",14:"x-mac-tamil",15:"x-mac-telugu",16:"x-mac-kannada",17:"x-mac-malayalam",18:"x-mac-sinhalese",19:"x-mac-burmese",20:"x-mac-khmer",21:"x-mac-thai",22:"x-mac-lao",23:"x-mac-georgian",24:"x-mac-armenian",25:"x-mac-chinesesimp",26:"x-mac-tibetan",27:"x-mac-mongolian",28:"x-mac-ethiopic",29:"x-mac-ce",30:"x-mac-vietnamese",31:"x-mac-extarabic"},Ke={15:"x-mac-icelandic",17:"x-mac-turkish",18:"x-mac-croatian",24:"x-mac-ce",25:"x-mac-ce",26:"x-mac-ce",27:"x-mac-ce",28:"x-mac-ce",30:"x-mac-icelandic",37:"x-mac-romanian",38:"x-mac-ce",39:"x-mac-ce",40:"x-mac-ce",143:"x-mac-inuit",146:"x-mac-gaelic"};function Je(e,t,r){switch(e){case 0:return Ze;case 1:return Ke[r]||Qe[t];case 3:if(1===t||10===t)return Ze}}function $e(e){var t={};for(var r in e)t[e[r]]=parseInt(r);return t}function et(e,t,r,n,o,i){return new J.Record("NameRecord",[{name:"platformID",type:"USHORT",value:e},{name:"encodingID",type:"USHORT",value:t},{name:"languageID",type:"USHORT",value:r},{name:"nameID",type:"USHORT",value:n},{name:"length",type:"USHORT",value:o},{name:"offset",type:"USHORT",value:i}])}function tt(e,t){var r=function(e,t){var r=e.length,n=t.length-r+1;e:for(var o=0;o<n;o++)for(;o<n;o++){for(var i=0;i<r;i++)if(t[o+i]!==e[i])continue e;return o}return-1}(e,t);if(r<0){r=t.length;for(var n=0,o=e.length;n<o;++n)t.push(e[n])}return r}var rt={parse:function(e,t,r){for(var n={},o=new ae.Parser(e,t),i=o.parseUShort(),a=o.parseUShort(),s=o.offset+o.parseUShort(),l=0;l<a;l++){var u=o.parseUShort(),c=o.parseUShort(),d=o.parseUShort(),f=o.parseUShort(),h=He[f]||f,p=o.parseUShort(),y=o.parseUShort(),m=Ye(u,d,r),g=Je(u,c,d);if(void 0!==g&&void 0!==m){var v=void 0;if(v=g===Ze?P.UTF16(e,s+y,p):P.MACSTRING(e,s+y,p,g)){var b=n[h];void 0===b&&(b=n[h]={}),b[m]=v}}}return 1===i&&o.parseUShort(),n},make:function(e,t){var r,n=[],o={},i=$e(He);for(var a in e){var s=i[a];if(void 0===s&&(s=a),r=parseInt(s),isNaN(r))throw new Error('Name table entry "'+a+'" does not exist, see nameTableNames for complete list.');o[r]=e[a],n.push(r)}for(var l=$e(qe),u=$e(Xe),c=[],d=[],f=0;f<n.length;f++){var h=o[r=n[f]];for(var p in h){var y=h[p],m=1,g=l[p],v=We[g],b=Je(m,v,g),_=k.MACSTRING(y,b);void 0===_&&(m=0,(g=t.indexOf(p))<0&&(g=t.length,t.push(p)),v=4,_=k.UTF16(y));var x=tt(_,d);c.push(et(m,v,g,r,_.length,x));var w=u[p];if(void 0!==w){var S=k.UTF16(y),j=tt(S,d);c.push(et(3,1,w,r,S.length,j))}}}c.sort(function(e,t){return e.platformID-t.platformID||e.encodingID-t.encodingID||e.languageID-t.languageID||e.nameID-t.nameID});for(var M=new J.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:c.length},{name:"stringOffset",type:"USHORT",value:6+12*c.length}]),E=0;E<c.length;E++)M.fields.push({name:"record_"+E,type:"RECORD",value:c[E]});return M.fields.push({name:"strings",type:"LITERAL",value:d}),M}},nt=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];var ot={parse:function(e,t){var r={},n=new ae.Parser(e,t);r.version=n.parseUShort(),r.xAvgCharWidth=n.parseShort(),r.usWeightClass=n.parseUShort(),r.usWidthClass=n.parseUShort(),r.fsType=n.parseUShort(),r.ySubscriptXSize=n.parseShort(),r.ySubscriptYSize=n.parseShort(),r.ySubscriptXOffset=n.parseShort(),r.ySubscriptYOffset=n.parseShort(),r.ySuperscriptXSize=n.parseShort(),r.ySuperscriptYSize=n.parseShort(),r.ySuperscriptXOffset=n.parseShort(),r.ySuperscriptYOffset=n.parseShort(),r.yStrikeoutSize=n.parseShort(),r.yStrikeoutPosition=n.parseShort(),r.sFamilyClass=n.parseShort(),r.panose=[];for(var o=0;o<10;o++)r.panose[o]=n.parseByte();return r.ulUnicodeRange1=n.parseULong(),r.ulUnicodeRange2=n.parseULong(),r.ulUnicodeRange3=n.parseULong(),r.ulUnicodeRange4=n.parseULong(),r.achVendID=String.fromCharCode(n.parseByte(),n.parseByte(),n.parseByte(),n.parseByte()),r.fsSelection=n.parseUShort(),r.usFirstCharIndex=n.parseUShort(),r.usLastCharIndex=n.parseUShort(),r.sTypoAscender=n.parseShort(),r.sTypoDescender=n.parseShort(),r.sTypoLineGap=n.parseShort(),r.usWinAscent=n.parseUShort(),r.usWinDescent=n.parseUShort(),1<=r.version&&(r.ulCodePageRange1=n.parseULong(),r.ulCodePageRange2=n.parseULong()),2<=r.version&&(r.sxHeight=n.parseShort(),r.sCapHeight=n.parseShort(),r.usDefaultChar=n.parseUShort(),r.usBreakChar=n.parseUShort(),r.usMaxContent=n.parseUShort()),r},make:function(e){return new J.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],e)},unicodeRanges:nt,getUnicodeRange:function(e){for(var t=0;t<nt.length;t+=1){var r=nt[t];if(e>=r.begin&&e<r.end)return t}return-1}};var it={parse:function(e,t){var r={},n=new ae.Parser(e,t);switch(r.version=n.parseVersion(),r.italicAngle=n.parseFixed(),r.underlinePosition=n.parseShort(),r.underlineThickness=n.parseShort(),r.isFixedPitch=n.parseULong(),r.minMemType42=n.parseULong(),r.maxMemType42=n.parseULong(),r.minMemType1=n.parseULong(),r.maxMemType1=n.parseULong(),r.version){case 1:r.names=de.slice();break;case 2:r.numberOfGlyphs=n.parseUShort(),r.glyphNameIndex=new Array(r.numberOfGlyphs);for(var o=0;o<r.numberOfGlyphs;o++)r.glyphNameIndex[o]=n.parseUShort();r.names=[];for(var i=0;i<r.numberOfGlyphs;i++)if(r.glyphNameIndex[i]>=de.length){var a=n.parseChar();r.names.push(n.parseString(a))}break;case 2.5:r.numberOfGlyphs=n.parseUShort(),r.offset=new Array(r.numberOfGlyphs);for(var s=0;s<r.numberOfGlyphs;s++)r.offset[s]=n.parseChar()}return r},make:function(){return new J.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:0},{name:"underlinePosition",type:"FWORD",value:0},{name:"underlineThickness",type:"FWORD",value:0},{name:"isFixedPitch",type:"ULONG",value:0},{name:"minMemType42",type:"ULONG",value:0},{name:"maxMemType42",type:"ULONG",value:0},{name:"minMemType1",type:"ULONG",value:0},{name:"maxMemType1",type:"ULONG",value:0}])}},at=new Array(9);at[1]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();return 1===t?{substFormat:1,coverage:this.parsePointer(oe.coverage),deltaGlyphId:this.parseUShort()}:2===t?{substFormat:2,coverage:this.parsePointer(oe.coverage),substitute:this.parseOffset16List()}:void L.assert(!1,"0x"+e.toString(16)+": lookup type 1 format must be 1 or 2.")},at[2]=function(){var e=this.parseUShort();return L.argument(1===e,"GSUB Multiple Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),sequences:this.parseListOfLists()}},at[3]=function(){var e=this.parseUShort();return L.argument(1===e,"GSUB Alternate Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),alternateSets:this.parseListOfLists()}},at[4]=function(){var e=this.parseUShort();return L.argument(1===e,"GSUB ligature table identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)}})}};var st={sequenceIndex:oe.uShort,lookupListIndex:oe.uShort};at[5]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();if(1===t)return{substFormat:t,coverage:this.parsePointer(oe.coverage),ruleSets:this.parseListOfLists(function(){var e=this.parseUShort(),t=this.parseUShort();return{input:this.parseUShortList(e-1),lookupRecords:this.parseRecordList(t,st)}})};if(2===t)return{substFormat:t,coverage:this.parsePointer(oe.coverage),classDef:this.parsePointer(oe.classDef),classSets:this.parseListOfLists(function(){var e=this.parseUShort(),t=this.parseUShort();return{classes:this.parseUShortList(e-1),lookupRecords:this.parseRecordList(t,st)}})};if(3===t){var r=this.parseUShort(),n=this.parseUShort();return{substFormat:t,coverages:this.parseList(r,oe.pointer(oe.coverage)),lookupRecords:this.parseRecordList(n,st)}}L.assert(!1,"0x"+e.toString(16)+": lookup type 5 format must be 1, 2 or 3.")},at[6]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();return 1===t?{substFormat:1,coverage:this.parsePointer(oe.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(st)}})}:2===t?{substFormat:2,coverage:this.parsePointer(oe.coverage),backtrackClassDef:this.parsePointer(oe.classDef),inputClassDef:this.parsePointer(oe.classDef),lookaheadClassDef:this.parsePointer(oe.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(st)}})}:3===t?{substFormat:3,backtrackCoverage:this.parseList(oe.pointer(oe.coverage)),inputCoverage:this.parseList(oe.pointer(oe.coverage)),lookaheadCoverage:this.parseList(oe.pointer(oe.coverage)),lookupRecords:this.parseRecordList(st)}:void L.assert(!1,"0x"+e.toString(16)+": lookup type 6 format must be 1, 2 or 3.")},at[7]=function(){var e=this.parseUShort();L.argument(1===e,"GSUB Extension Substitution subtable identifier-format must be 1");var t=this.parseUShort(),r=new oe(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:t,extension:at[t].call(r)}},at[8]=function(){var e=this.parseUShort();return L.argument(1===e,"GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(oe.coverage),backtrackCoverage:this.parseList(oe.pointer(oe.coverage)),lookaheadCoverage:this.parseList(oe.pointer(oe.coverage)),substitutes:this.parseUShortList()}};var lt=new Array(9);lt[1]=function(e){return 1===e.substFormat?new J.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new J.Coverage(e.coverage)},{name:"deltaGlyphID",type:"USHORT",value:e.deltaGlyphId}]):new J.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:2},{name:"coverage",type:"TABLE",value:new J.Coverage(e.coverage)}].concat(J.ushortList("substitute",e.substitute)))},lt[3]=function(e){return L.assert(1===e.substFormat,"Lookup type 3 substFormat must be 1."),new J.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new J.Coverage(e.coverage)}].concat(J.tableList("altSet",e.alternateSets,function(e){return new J.Table("alternateSetTable",J.ushortList("alternate",e))})))},lt[4]=function(e){return L.assert(1===e.substFormat,"Lookup type 4 substFormat must be 1."),new J.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new J.Coverage(e.coverage)}].concat(J.tableList("ligSet",e.ligatureSets,function(e){return new J.Table("ligatureSetTable",J.tableList("ligature",e,function(e){return new J.Table("ligatureTable",[{name:"ligGlyph",type:"USHORT",value:e.ligGlyph}].concat(J.ushortList("component",e.components,e.components.length+1)))}))})))};var ut={parse:function(e,t){var r=new oe(e,t=t||0),n=r.parseVersion(1);return L.argument(1===n||1.1===n,"Unsupported GSUB table version."),1===n?{version:n,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(at)}:{version:n,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(at),variations:r.parseFeatureVariationsList()}},make:function(e){return new J.Table("GSUB",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new J.ScriptList(e.scripts)},{name:"features",type:"TABLE",value:new J.FeatureList(e.features)},{name:"lookups",type:"TABLE",value:new J.LookupList(e.lookups,lt)}])}};var ct={parse:function(e,t){var r=new ae.Parser(e,t),n=r.parseULong();L.argument(1===n,"Unsupported META table version."),r.parseULong(),r.parseULong();for(var o=r.parseULong(),i={},a=0;a<o;a++){var s=r.parseTag(),l=r.parseULong(),u=r.parseULong(),c=P.UTF8(e,t+l,u);i[s]=c}return i},make:function(e){var t=Object.keys(e).length,r="",n=16+12*t,o=new J.Table("meta",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"offset",type:"ULONG",value:n},{name:"numTags",type:"ULONG",value:t}]);for(var i in e){var a=r.length;r+=e[i],o.fields.push({name:"tag "+i,type:"TAG",value:i}),o.fields.push({name:"offset "+i,type:"ULONG",value:n+a}),o.fields.push({name:"length "+i,type:"ULONG",value:e[i].length})}return o.fields.push({name:"stringPool",type:"CHARARRAY",value:r}),o}};function dt(e){return Math.log(e)/Math.log(2)|0}function ft(e){for(;e.length%4!=0;)e.push(0);for(var t=0,r=0;r<e.length;r+=4)t+=(e[r]<<24)+(e[r+1]<<16)+(e[r+2]<<8)+e[r+3];return t%=Math.pow(2,32)}function ht(e,t,r,n){return new J.Record("Table Record",[{name:"tag",type:"TAG",value:void 0!==e?e:""},{name:"checkSum",type:"ULONG",value:void 0!==t?t:0},{name:"offset",type:"ULONG",value:void 0!==r?r:0},{name:"length",type:"ULONG",value:void 0!==n?n:0}])}function pt(e){var t=new J.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);t.tables=e,t.numTables=e.length;var r=Math.pow(2,dt(t.numTables));t.searchRange=16*r,t.entrySelector=dt(r),t.rangeShift=16*t.numTables-t.searchRange;for(var n=[],o=[],i=t.sizeOf()+ht().sizeOf()*t.numTables;i%4!=0;)i+=1,o.push({name:"padding",type:"BYTE",value:0});for(var a=0;a<e.length;a+=1){var s=e[a];L.argument(4===s.tableName.length,"Table name"+s.tableName+" is invalid.");var l=s.sizeOf(),u=ht(s.tableName,ft(s.encode()),i,l);for(n.push({name:u.tag+" Table Record",type:"RECORD",value:u}),o.push({name:s.tableName+" table",type:"RECORD",value:s}),i+=l,L.argument(!isNaN(i),"Something went wrong calculating the offset.");i%4!=0;)i+=1,o.push({name:"padding",type:"BYTE",value:0})}return n.sort(function(e,t){return e.value.tag>t.value.tag?1:-1}),t.fields=t.fields.concat(n),t.fields=t.fields.concat(o),t}function yt(e,t,r){for(var n=0;n<t.length;n+=1){var o=e.charToGlyphIndex(t[n]);if(0<o)return e.glyphs.get(o).getMetrics()}return r}var mt={make:pt,fontToTable:function(e){for(var t,r=[],n=[],o=[],i=[],a=[],s=[],l=[],u=0,c=0,d=0,f=0,h=0,p=0;p<e.glyphs.length;p+=1){var y=e.glyphs.get(p),m=0|y.unicode;if(isNaN(y.advanceWidth))throw new Error("Glyph "+y.name+" ("+p+"): advanceWidth is not a number.");(m<t||void 0===t)&&0<m&&(t=m),u<m&&(u=m);var g=ot.getUnicodeRange(m);if(g<32)c|=1<<g;else if(g<64)d|=1<<g-32;else if(g<96)f|=1<<g-64;else{if(!(g<123))throw new Error("Unicode ranges bits > 123 are reserved for internal usage");h|=1<<g-96}if(".notdef"!==y.name){var v=y.getMetrics();r.push(v.xMin),n.push(v.yMin),o.push(v.xMax),i.push(v.yMax),s.push(v.leftSideBearing),l.push(v.rightSideBearing),a.push(y.advanceWidth)}}var b={xMin:Math.min.apply(null,r),yMin:Math.min.apply(null,n),xMax:Math.max.apply(null,o),yMax:Math.max.apply(null,i),advanceWidthMax:Math.max.apply(null,a),advanceWidthAvg:function(e){for(var t=0,r=0;r<e.length;r+=1)t+=e[r];return t/e.length}(a),minLeftSideBearing:Math.min.apply(null,s),maxLeftSideBearing:Math.max.apply(null,s),minRightSideBearing:Math.min.apply(null,l)};b.ascender=e.ascender,b.descender=e.descender;var _=Fe.make({flags:3,unitsPerEm:e.unitsPerEm,xMin:b.xMin,yMin:b.yMin,xMax:b.xMax,yMax:b.yMax,lowestRecPPEM:3,createdTimestamp:e.createdTimestamp}),x=Be.make({ascender:b.ascender,descender:b.descender,advanceWidthMax:b.advanceWidthMax,minLeftSideBearing:b.minLeftSideBearing,minRightSideBearing:b.minRightSideBearing,xMaxExtent:b.maxLeftSideBearing+(b.xMax-b.xMin),numberOfHMetrics:e.glyphs.length}),w=ze.make(e.glyphs.length),S=ot.make({xAvgCharWidth:Math.round(b.advanceWidthAvg),usWeightClass:e.tables.os2.usWeightClass,usWidthClass:e.tables.os2.usWidthClass,usFirstCharIndex:t,usLastCharIndex:u,ulUnicodeRange1:c,ulUnicodeRange2:d,ulUnicodeRange3:f,ulUnicodeRange4:h,fsSelection:e.tables.os2.fsSelection,sTypoAscender:b.ascender,sTypoDescender:b.descender,sTypoLineGap:0,usWinAscent:b.yMax,usWinDescent:Math.abs(b.yMin),ulCodePageRange1:1,sxHeight:yt(e,"xyvw",{yMax:Math.round(b.ascender/2)}).yMax,sCapHeight:yt(e,"HIKLEFJMNTZBDPRAGOQSUVWXY",b).yMax,usDefaultChar:e.hasChar(" ")?32:0,usBreakChar:e.hasChar(" ")?32:0}),j=Ge.make(e.glyphs),M=se.make(e.glyphs),E=e.getEnglishName("fontFamily"),T=e.getEnglishName("fontSubfamily"),O=E+" "+T,C=e.getEnglishName("postScriptName");C=C||E.replace(/\s/g,"")+"-"+T;var L={};for(var P in e.names)L[P]=e.names[P];L.uniqueID||(L.uniqueID={en:e.getEnglishName("manufacturer")+":"+O}),L.postScriptName||(L.postScriptName={en:C}),L.preferredFamily||(L.preferredFamily=e.names.fontFamily),L.preferredSubfamily||(L.preferredSubfamily=e.names.fontSubfamily);var k=[],A=rt.make(L,k),R=0<k.length?Ve.make(k):void 0,D=it.make(),I=Ne.make(e.glyphs,{version:e.getEnglishName("version"),fullName:O,familyName:E,weightName:T,postScriptName:C,unitsPerEm:e.unitsPerEm,fontBBox:[0,b.yMin,b.ascender,b.advanceWidthMax]}),U=e.metas&&0<Object.keys(e.metas).length?ct.make(e.metas):void 0,N=[_,x,w,S,A,M,D,I,j];R&&N.push(R),e.tables.gsub&&N.push(ut.make(e.tables.gsub)),U&&N.push(U);for(var F=pt(N),B=ft(F.encode()),G=F.fields,V=!1,z=0;z<G.length;z+=1)if("head table"===G[z].name){G[z].value.checkSumAdjustment=2981146554-B,V=!0;break}if(!V)throw new Error("Could not find head table with checkSum to adjust.");return F},computeCheckSum:ft};function gt(e,t){for(var r=0,n=e.length-1;r<=n;){var o=r+n>>>1,i=e[o].tag;if(i===t)return o;i<t?r=1+o:n=o-1}return-r-1}function vt(e,t){for(var r=0,n=e.length-1;r<=n;){var o=r+n>>>1,i=e[o];if(i===t)return o;i<t?r=1+o:n=o-1}return-r-1}function bt(e,t){for(var r,n=0,o=e.length-1;n<=o;){var i=n+o>>>1,a=(r=e[i]).start;if(a===t)return r;a<t?n=1+i:o=i-1}if(0<n)return t>(r=e[n-1]).end?0:r}function _t(e,t){this.font=e,this.tableName=t}function xt(e){_t.call(this,e,"gpos")}function wt(e){_t.call(this,e,"gsub")}function St(e,t){var r=e.length;if(r!==t.length)return!1;for(var n=0;n<r;n++)if(e[n]!==t[n])return!1;return!0}function jt(e,t,r){for(var n=e.subtables,o=0;o<n.length;o++){var i=n[o];if(i.substFormat===t)return i}if(r)return n.push(r),r}function Mt(e){for(var t=new ArrayBuffer(e.length),r=new Uint8Array(t),n=0;n<e.length;++n)r[n]=e[n];return t}function Et(e,t){if(!e)throw t}function Tt(e,t,r,n,o){var i;return i=0<(t&n)?(i=e.parseByte(),0==(t&o)&&(i=-i),r+i):0<(t&o)?r:r+e.parseShort()}function Ot(e,t,r){var n,o,i=new ae.Parser(t,r);if(e.numberOfContours=i.parseShort(),e._xMin=i.parseShort(),e._yMin=i.parseShort(),e._xMax=i.parseShort(),e._yMax=i.parseShort(),0<e.numberOfContours){for(var a=e.endPointIndices=[],s=0;s<e.numberOfContours;s+=1)a.push(i.parseUShort());e.instructionLength=i.parseUShort(),e.instructions=[];for(var l=0;l<e.instructionLength;l+=1)e.instructions.push(i.parseByte());var u=a[a.length-1]+1;n=[];for(var c=0;c<u;c+=1)if(o=i.parseByte(),n.push(o),0<(8&o))for(var d=i.parseByte(),f=0;f<d;f+=1)n.push(o),c+=1;if(L.argument(n.length===u,"Bad flags."),0<a.length){var h,p=[];if(0<u){for(var y=0;y<u;y+=1)o=n[y],(h={}).onCurve=!!(1&o),h.lastPointOfContour=0<=a.indexOf(y),p.push(h);for(var m=0,g=0;g<u;g+=1)o=n[g],(h=p[g]).x=Tt(i,o,m,2,16),m=h.x;for(var v=0,b=0;b<u;b+=1)o=n[b],(h=p[b]).y=Tt(i,o,v,4,32),v=h.y}e.points=p}else e.points=[]}else if(0===e.numberOfContours)e.points=[];else{e.isComposite=!0,e.points=[],e.components=[];for(var _=!0;_;){n=i.parseUShort();var x={glyphIndex:i.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};0<(1&n)?0<(2&n)?(x.dx=i.parseShort(),x.dy=i.parseShort()):x.matchedPoints=[i.parseUShort(),i.parseUShort()]:0<(2&n)?(x.dx=i.parseChar(),x.dy=i.parseChar()):x.matchedPoints=[i.parseByte(),i.parseByte()],0<(8&n)?x.xScale=x.yScale=i.parseF2Dot14():0<(64&n)?(x.xScale=i.parseF2Dot14(),x.yScale=i.parseF2Dot14()):0<(128&n)&&(x.xScale=i.parseF2Dot14(),x.scale01=i.parseF2Dot14(),x.scale10=i.parseF2Dot14(),x.yScale=i.parseF2Dot14()),e.components.push(x),_=!!(32&n)}if(256&n){e.instructionLength=i.parseUShort(),e.instructions=[];for(var w=0;w<e.instructionLength;w+=1)e.instructions.push(i.parseByte())}}}function Ct(e,t){for(var r=[],n=0;n<e.length;n+=1){var o=e[n],i={x:t.xScale*o.x+t.scale01*o.y+t.dx,y:t.scale10*o.x+t.yScale*o.y+t.dy,onCurve:o.onCurve,lastPointOfContour:o.lastPointOfContour};r.push(i)}return r}function Lt(e){var t=new D;if(!e)return t;for(var r=function(e){for(var t=[],r=[],n=0;n<e.length;n+=1){var o=e[n];r.push(o),o.lastPointOfContour&&(t.push(r),r=[])}return L.argument(0===r.length,"There are still points left in the current contour."),t}(e),n=0;n<r.length;++n){var o=r[n],i=null,a=o[o.length-1],s=o[0];if(a.onCurve)t.moveTo(a.x,a.y);else if(s.onCurve)t.moveTo(s.x,s.y);else{var l={x:.5*(a.x+s.x),y:.5*(a.y+s.y)};t.moveTo(l.x,l.y)}for(var u=0;u<o.length;++u)if(i=a,a=s,s=o[(u+1)%o.length],a.onCurve)t.lineTo(a.x,a.y);else{var c=s;i.onCurve||{x:.5*(a.x+i.x),y:.5*(a.y+i.y)},s.onCurve||(c={x:.5*(a.x+s.x),y:.5*(a.y+s.y)}),t.quadraticCurveTo(a.x,a.y,c.x,c.y)}t.closePath()}return t}function Pt(e,t){if(t.isComposite)for(var r=0;r<t.components.length;r+=1){var n=t.components[r],o=e.get(n.glyphIndex);if(o.getPath(),o.points){var i=void 0;if(void 0===n.matchedPoints)i=Ct(o.points,n);else{if(n.matchedPoints[0]>t.points.length-1||n.matchedPoints[1]>o.points.length-1)throw Error("Matched points out of range in "+t.name);var a=t.points[n.matchedPoints[0]],s=o.points[n.matchedPoints[1]],l={xScale:n.xScale,scale01:n.scale01,scale10:n.scale10,yScale:n.yScale,dx:0,dy:0};s=Ct([s],l)[0],l.dx=a.x-s.x,l.dy=a.y-s.y,i=Ct(o.points,l)}t.points=t.points.concat(i)}}return Lt(t.points)}(xt.prototype=_t.prototype={searchTag:gt,binSearch:vt,getTable:function(e){var t=this.font.tables[this.tableName];return!t&&e&&(t=this.font.tables[this.tableName]=this.createDefaultTable()),t},getScriptNames:function(){var e=this.getTable();return e?e.scripts.map(function(e){return e.tag}):[]},getDefaultScriptName:function(){var e=this.getTable();if(e){for(var t=!1,r=0;r<e.scripts.length;r++){var n=e.scripts[r].tag;if("DFLT"===n)return n;"latn"===n&&(t=!0)}return t?"latn":void 0}},getScriptTable:function(e,t){var r=this.getTable(t);if(r){e=e||"DFLT";var n=r.scripts,o=gt(r.scripts,e);if(0<=o)return n[o].script;if(t){var i={tag:e,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}};return n.splice(-1-o,0,i),i.script}}},getLangSysTable:function(e,t,r){var n=this.getScriptTable(e,r);if(n){if(!t||"dflt"===t||"DFLT"===t)return n.defaultLangSys;var o=gt(n.langSysRecords,t);if(0<=o)return n.langSysRecords[o].langSys;if(r){var i={tag:t,langSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]}};return n.langSysRecords.splice(-1-o,0,i),i.langSys}}},getFeatureTable:function(e,t,r,n){var o=this.getLangSysTable(e,t,n);if(o){for(var i,a=o.featureIndexes,s=this.font.tables[this.tableName].features,l=0;l<a.length;l++)if((i=s[a[l]]).tag===r)return i.feature;if(n){var u=s.length;return L.assert(0===u||r>=s[u-1].tag,"Features must be added in alphabetical order."),i={tag:r,feature:{params:0,lookupListIndexes:[]}},s.push(i),a.push(u),i.feature}}},getLookupTables:function(e,t,r,n,o){var i=this.getFeatureTable(e,t,r,o),a=[];if(i){for(var s,l=i.lookupListIndexes,u=this.font.tables[this.tableName].lookups,c=0;c<l.length;c++)(s=u[l[c]]).lookupType===n&&a.push(s);if(0===a.length&&o){s={lookupType:n,lookupFlag:0,subtables:[],markFilteringSet:void 0};var d=u.length;return u.push(s),l.push(d),[s]}}return a},getGlyphClass:function(e,t){switch(e.format){case 1:return e.startGlyph<=t&&t<e.startGlyph+e.classes.length?e.classes[t-e.startGlyph]:0;case 2:var r=bt(e.ranges,t);return r?r.classId:0}},getCoverageIndex:function(e,t){switch(e.format){case 1:var r=vt(e.glyphs,t);return 0<=r?r:-1;case 2:var n=bt(e.ranges,t);return n?n.index+t-n.start:-1}},expandCoverage:function(e){if(1===e.format)return e.glyphs;for(var t=[],r=e.ranges,n=0;n<r.length;n++)for(var o=r[n],i=o.start,a=o.end,s=i;s<=a;s++)t.push(s);return t}}).init=function(){var e=this.getDefaultScriptName();this.defaultKerningTables=this.getKerningTables(e)},xt.prototype.getKerningValue=function(e,t,r){for(var n=0;n<e.length;n++)for(var o=e[n].subtables,i=0;i<o.length;i++){var a=o[i],s=this.getCoverageIndex(a.coverage,t);if(!(s<0))switch(a.posFormat){case 1:for(var l=a.pairSets[s],u=0;u<l.length;u++){var c=l[u];if(c.secondGlyph===r)return c.value1&&c.value1.xAdvance||0}break;case 2:var d=this.getGlyphClass(a.classDef1,t),f=this.getGlyphClass(a.classDef2,r),h=a.classRecords[d][f];return h.value1&&h.value1.xAdvance||0}}return 0},xt.prototype.getKerningTables=function(e,t){if(this.font.tables.gpos)return this.getLookupTables(e,t,"kern",2)},(wt.prototype=_t.prototype).createDefaultTable=function(){return{version:1,scripts:[{tag:"DFLT",script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]}},wt.prototype.getSingle=function(e,t,r){for(var n=[],o=this.getLookupTables(t,r,e,1),i=0;i<o.length;i++)for(var a=o[i].subtables,s=0;s<a.length;s++){var l=a[s],u=this.expandCoverage(l.coverage),c=void 0;if(1===l.substFormat){var d=l.deltaGlyphId;for(c=0;c<u.length;c++){var f=u[c];n.push({sub:f,by:f+d})}}else{var h=l.substitute;for(c=0;c<u.length;c++)n.push({sub:u[c],by:h[c]})}}return n},wt.prototype.getAlternates=function(e,t,r){for(var n=[],o=this.getLookupTables(t,r,e,3),i=0;i<o.length;i++)for(var a=o[i].subtables,s=0;s<a.length;s++)for(var l=a[s],u=this.expandCoverage(l.coverage),c=l.alternateSets,d=0;d<u.length;d++)n.push({sub:u[d],by:c[d]});return n},wt.prototype.getLigatures=function(e,t,r){for(var n=[],o=this.getLookupTables(t,r,e,4),i=0;i<o.length;i++)for(var a=o[i].subtables,s=0;s<a.length;s++)for(var l=a[s],u=this.expandCoverage(l.coverage),c=l.ligatureSets,d=0;d<u.length;d++)for(var f=u[d],h=c[d],p=0;p<h.length;p++){var y=h[p];n.push({sub:[f].concat(y.components),by:y.ligGlyph})}return n},wt.prototype.addSingle=function(e,t,r,n){var o=jt(this.getLookupTables(r,n,e,1,!0)[0],2,{substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});L.assert(1===o.coverage.format,"Ligature: unable to modify coverage table format "+o.coverage.format);var i=t.sub,a=this.binSearch(o.coverage.glyphs,i);a<0&&(a=-1-a,o.coverage.glyphs.splice(a,0,i),o.substitute.splice(a,0,0)),o.substitute[a]=t.by},wt.prototype.addAlternate=function(e,t,r,n){var o=jt(this.getLookupTables(r,n,e,3,!0)[0],1,{substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});L.assert(1===o.coverage.format,"Ligature: unable to modify coverage table format "+o.coverage.format);var i=t.sub,a=this.binSearch(o.coverage.glyphs,i);a<0&&(a=-1-a,o.coverage.glyphs.splice(a,0,i),o.alternateSets.splice(a,0,0)),o.alternateSets[a]=t.by},wt.prototype.addLigature=function(e,t,r,n){var o=this.getLookupTables(r,n,e,4,!0)[0],i=o.subtables[0];i||(i={substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]},o.subtables[0]=i),L.assert(1===i.coverage.format,"Ligature: unable to modify coverage table format "+i.coverage.format);var a=t.sub[0],s=t.sub.slice(1),l={ligGlyph:t.by,components:s},u=this.binSearch(i.coverage.glyphs,a);if(0<=u){for(var c=i.ligatureSets[u],d=0;d<c.length;d++)if(St(c[d].components,s))return;c.push(l)}else u=-1-u,i.coverage.glyphs.splice(u,0,a),i.ligatureSets.splice(u,0,[l])},wt.prototype.getFeature=function(e,t,r){if(/ss\d\d/.test(e))return this.getSingle(e,t,r);switch(e){case"aalt":case"salt":return this.getSingle(e,t,r).concat(this.getAlternates(e,t,r));case"dlig":case"liga":case"rlig":return this.getLigatures(e,t,r)}},wt.prototype.add=function(e,t,r,n){if(/ss\d\d/.test(e))return this.addSingle(e,t,r,n);switch(e){case"aalt":case"salt":return"number"==typeof t.by?this.addSingle(e,t,r,n):this.addAlternate(e,t,r,n);case"dlig":case"liga":case"rlig":return this.addLigature(e,t,r,n)}};var kt,At,Rt,Dt,It={getPath:Lt,parse:function(e,t,r,n){for(var o=new _e.GlyphSet(n),i=0;i<r.length-1;i+=1){var a=r[i];a!==r[i+1]?o.push(i,_e.ttfGlyphLoader(n,i,Ot,e,t+a,Pt)):o.push(i,_e.glyphLoader(n,i))}return o}};function Ut(e){this.font=e,this.getCommands=function(e){return It.getPath(e).commands},this._fpgmState=this._prepState=void 0,this._errorState=0}function Nt(e){return e}function Ft(e){return Math.sign(e)*Math.round(Math.abs(e))}function Bt(e){return Math.sign(e)*Math.round(Math.abs(2*e))/2}function Gt(e){return Math.sign(e)*(Math.round(Math.abs(e)+.5)-.5)}function Vt(e){return Math.sign(e)*Math.ceil(Math.abs(e))}function zt(e){return Math.sign(e)*Math.floor(Math.abs(e))}function Ht(e){var t=this.srPeriod,r=this.srPhase,n=1;return e<0&&(e=-e,n=-1),e+=this.srThreshold-r,e=Math.trunc(e/t)*t,(e+=r)<0?r*n:e*n}var qt={x:1,y:0,axis:"x",distance:function(e,t,r,n){return(r?e.xo:e.x)-(n?t.xo:t.x)},interpolate:function(e,t,r,n){var o,i,a,s,l,u,c;if(!n||n===this)return o=e.xo-t.xo,i=e.xo-r.xo,l=t.x-t.xo,u=r.x-r.xo,0===(c=(a=Math.abs(o))+(s=Math.abs(i)))?void(e.x=e.xo+(l+u)/2):void(e.x=e.xo+(l*s+u*a)/c);o=n.distance(e,t,!0,!0),i=n.distance(e,r,!0,!0),l=n.distance(t,t,!1,!0),u=n.distance(r,r,!1,!0),0!==(c=(a=Math.abs(o))+(s=Math.abs(i)))?qt.setRelative(e,e,(l*s+u*a)/c,n,!0):qt.setRelative(e,e,(l+u)/2,n,!0)},normalSlope:Number.NEGATIVE_INFINITY,setRelative:function(e,t,r,n,o){if(n&&n!==this){var i=o?t.xo:t.x,a=o?t.yo:t.y,s=i+r*n.x,l=a+r*n.y;e.x=s+(e.y-l)/n.normalSlope}else e.x=(o?t.xo:t.x)+r},slope:0,touch:function(e){e.xTouched=!0},touched:function(e){return e.xTouched},untouch:function(e){e.xTouched=!1}},Wt={x:0,y:1,axis:"y",distance:function(e,t,r,n){return(r?e.yo:e.y)-(n?t.yo:t.y)},interpolate:function(e,t,r,n){var o,i,a,s,l,u,c;if(!n||n===this)return o=e.yo-t.yo,i=e.yo-r.yo,l=t.y-t.yo,u=r.y-r.yo,0===(c=(a=Math.abs(o))+(s=Math.abs(i)))?void(e.y=e.yo+(l+u)/2):void(e.y=e.yo+(l*s+u*a)/c);o=n.distance(e,t,!0,!0),i=n.distance(e,r,!0,!0),l=n.distance(t,t,!1,!0),u=n.distance(r,r,!1,!0),0!==(c=(a=Math.abs(o))+(s=Math.abs(i)))?Wt.setRelative(e,e,(l*s+u*a)/c,n,!0):Wt.setRelative(e,e,(l+u)/2,n,!0)},normalSlope:0,setRelative:function(e,t,r,n,o){if(n&&n!==this){var i=o?t.xo:t.x,a=o?t.yo:t.y,s=i+r*n.x,l=a+r*n.y;e.y=l+n.normalSlope*(e.x-s)}else e.y=(o?t.yo:t.y)+r},slope:Number.POSITIVE_INFINITY,touch:function(e){e.yTouched=!0},touched:function(e){return e.yTouched},untouch:function(e){e.yTouched=!1}};function Xt(e,t){this.x=e,this.y=t,this.axis=void 0,this.slope=t/e,this.normalSlope=-e/t,Object.freeze(this)}function Yt(e,t){var r=Math.sqrt(e*e+t*t);return t/=r,1===(e/=r)&&0===t?qt:0===e&&1===t?Wt:new Xt(e,t)}function Zt(e,t,r,n){this.x=this.xo=Math.round(64*e)/64,this.y=this.yo=Math.round(64*t)/64,this.lastPointOfContour=r,this.onCurve=n,this.prevPointOnContour=void 0,this.nextPointOnContour=void 0,this.xTouched=!1,this.yTouched=!1,Object.preventExtensions(this)}Object.freeze(qt),Object.freeze(Wt),Xt.prototype.distance=function(e,t,r,n){return this.x*qt.distance(e,t,r,n)+this.y*Wt.distance(e,t,r,n)},Xt.prototype.interpolate=function(e,t,r,n){var o,i,a,s,l,u,c;a=n.distance(e,t,!0,!0),s=n.distance(e,r,!0,!0),o=n.distance(t,t,!1,!0),i=n.distance(r,r,!1,!0),0!==(c=(l=Math.abs(a))+(u=Math.abs(s)))?this.setRelative(e,e,(o*u+i*l)/c,n,!0):this.setRelative(e,e,(o+i)/2,n,!0)},Xt.prototype.setRelative=function(e,t,r,n,o){n=n||this;var i=o?t.xo:t.x,a=o?t.yo:t.y,s=i+r*n.x,l=a+r*n.y,u=n.normalSlope,c=this.slope,d=e.x,f=e.y;e.x=(c*d-u*s+l-f)/(c-u),e.y=c*(e.x-d)+f},Xt.prototype.touch=function(e){e.xTouched=!0,e.yTouched=!0},Zt.prototype.nextTouched=function(e){for(var t=this.nextPointOnContour;!e.touched(t)&&t!==this;)t=t.nextPointOnContour;return t},Zt.prototype.prevTouched=function(e){for(var t=this.prevPointOnContour;!e.touched(t)&&t!==this;)t=t.prevPointOnContour;return t};var Qt=Object.freeze(new Zt(0,0)),Kt={cvCutIn:17/16,deltaBase:9,deltaShift:.125,loop:1,minDis:1,autoFlip:!0};function Jt(e,t){switch(this.env=e,this.stack=[],this.prog=t,e){case"glyf":this.zp0=this.zp1=this.zp2=1,this.rp0=this.rp1=this.rp2=0;case"prep":this.fv=this.pv=this.dpv=qt,this.round=Ft}}function $t(e){for(var t=e.tZone=new Array(e.gZone.length),r=0;r<t.length;r++)t[r]=new Zt(0,0)}function er(e,t){var r,n=e.prog,o=e.ip,i=1;do{if(88===(r=n[++o]))i++;else if(89===r)i--;else if(64===r)o+=n[o+1]+1;else if(65===r)o+=2*n[o+1]+1;else if(176<=r&&r<=183)o+=r-176+1;else if(184<=r&&r<=191)o+=2*(r-184+1);else if(t&&1===i&&27===r)break}while(0<i);e.ip=o}function tr(e,t){M.DEBUG&&console.log(t.step,"SVTCA["+e.axis+"]"),t.fv=t.pv=t.dpv=e}function rr(e,t){M.DEBUG&&console.log(t.step,"SPVTCA["+e.axis+"]"),t.pv=t.dpv=e}function nr(e,t){M.DEBUG&&console.log(t.step,"SFVTCA["+e.axis+"]"),t.fv=e}function or(e,t){var r,n,o=t.stack,i=o.pop(),a=o.pop(),s=t.z2[i],l=t.z1[a];M.DEBUG&&console.log("SPVTL["+e+"]",i,a),n=e?(r=s.y-l.y,l.x-s.x):(r=l.x-s.x,l.y-s.y),t.pv=t.dpv=Yt(r,n)}function ir(e,t){var r,n,o=t.stack,i=o.pop(),a=o.pop(),s=t.z2[i],l=t.z1[a];M.DEBUG&&console.log("SFVTL["+e+"]",i,a),n=e?(r=s.y-l.y,l.x-s.x):(r=l.x-s.x,l.y-s.y),t.fv=Yt(r,n)}function ar(e){M.DEBUG&&console.log(e.step,"POP[]"),e.stack.pop()}function sr(e,t){var r=t.stack.pop(),n=t.z0[r],o=t.fv,i=t.pv;M.DEBUG&&console.log(t.step,"MDAP["+e+"]",r);var a=i.distance(n,Qt);e&&(a=t.round(a)),o.setRelative(n,Qt,a,i),o.touch(n),t.rp0=t.rp1=r}function lr(e,t){var r,n,o,i=t.z2,a=i.length-2;M.DEBUG&&console.log(t.step,"IUP["+e.axis+"]");for(var s=0;s<a;s++)r=i[s],e.touched(r)||(n=r.prevTouched(e))!==r&&(n===(o=r.nextTouched(e))&&e.setRelative(r,r,e.distance(n,n,!1,!0),e,!0),e.interpolate(r,n,o,e))}function ur(e,t){for(var r=t.stack,n=e?t.rp1:t.rp2,o=(e?t.z0:t.z1)[n],i=t.fv,a=t.pv,s=t.loop,l=t.z2;s--;){var u=r.pop(),c=l[u],d=a.distance(o,o,!1,!0);i.setRelative(c,c,d,a),i.touch(c),M.DEBUG&&console.log(t.step,(1<t.loop?"loop "+(t.loop-s)+": ":"")+"SHP["+(e?"rp1":"rp2")+"]",u)}t.loop=1}function cr(e,t){var r=t.stack,n=e?t.rp1:t.rp2,o=(e?t.z0:t.z1)[n],i=t.fv,a=t.pv,s=r.pop(),l=t.z2[t.contours[s]],u=l;M.DEBUG&&console.log(t.step,"SHC["+e+"]",s);for(var c=a.distance(o,o,!1,!0);u!==o&&i.setRelative(u,u,c,a),(u=u.nextPointOnContour)!==l;);}function dr(e,t){var r,n,o=t.stack,i=e?t.rp1:t.rp2,a=(e?t.z0:t.z1)[i],s=t.fv,l=t.pv,u=o.pop();switch(M.DEBUG&&console.log(t.step,"SHZ["+e+"]",u),u){case 0:r=t.tZone;break;case 1:r=t.gZone;break;default:throw new Error("Invalid zone")}for(var c=l.distance(a,a,!1,!0),d=r.length-2,f=0;f<d;f++)n=r[f],s.setRelative(n,n,c,l)}function fr(e,t){var r=t.stack,n=r.pop()/64,o=r.pop(),i=t.z1[o],a=t.z0[t.rp0],s=t.fv,l=t.pv;s.setRelative(i,a,n,l),s.touch(i),M.DEBUG&&console.log(t.step,"MSIRP["+e+"]",n,o),t.rp1=t.rp0,t.rp2=o,e&&(t.rp0=o)}function hr(e,t){var r=t.stack,n=r.pop(),o=r.pop(),i=t.z0[o],a=t.fv,s=t.pv,l=t.cvt[n];M.DEBUG&&console.log(t.step,"MIAP["+e+"]",n,"(",l,")",o);var u=s.distance(i,Qt);e&&(Math.abs(u-l)<t.cvCutIn&&(u=l),u=t.round(u)),a.setRelative(i,Qt,u,s),0===t.zp0&&(i.xo=i.x,i.yo=i.y),a.touch(i),t.rp0=t.rp1=o}function pr(e,t){var r=t.stack,n=r.pop(),o=t.z2[n];M.DEBUG&&console.log(t.step,"GC["+e+"]",n),r.push(64*t.dpv.distance(o,Qt,e,!1))}function yr(e,t){var r=t.stack,n=r.pop(),o=r.pop(),i=t.z1[n],a=t.z0[o],s=t.dpv.distance(a,i,e,e);M.DEBUG&&console.log(t.step,"MD["+e+"]",n,o,"->",s),t.stack.push(Math.round(64*s))}function mr(e,t){var r=t.stack,n=r.pop(),o=t.fv,i=t.pv,a=t.ppem,s=t.deltaBase+16*(e-1),l=t.deltaShift,u=t.z0;M.DEBUG&&console.log(t.step,"DELTAP["+e+"]",n,r);for(var c=0;c<n;c++){var d=r.pop(),f=r.pop();if(s+((240&f)>>4)===a){var h=(15&f)-8;0<=h&&h++,M.DEBUG&&console.log(t.step,"DELTAPFIX",d,"by",h*l);var p=u[d];o.setRelative(p,p,h*l,i)}}}function gr(e,t){var r=t.stack,n=r.pop();M.DEBUG&&console.log(t.step,"ROUND[]"),r.push(64*t.round(n/64))}function vr(e,t){var r=t.stack,n=r.pop(),o=t.ppem,i=t.deltaBase+16*(e-1),a=t.deltaShift;M.DEBUG&&console.log(t.step,"DELTAC["+e+"]",n,r);for(var s=0;s<n;s++){var l=r.pop(),u=r.pop();if(i+((240&u)>>4)===o){var c=(15&u)-8;0<=c&&c++;var d=c*a;M.DEBUG&&console.log(t.step,"DELTACFIX",l,"by",d),t.cvt[l]+=d}}}function br(e,t){var r,n,o=t.stack,i=o.pop(),a=o.pop(),s=t.z2[i],l=t.z1[a];M.DEBUG&&console.log(t.step,"SDPVTL["+e+"]",i,a),n=e?(r=s.y-l.y,l.x-s.x):(r=l.x-s.x,l.y-s.y),t.dpv=Yt(r,n)}function _r(e,t){var r=t.stack,n=t.prog,o=t.ip;M.DEBUG&&console.log(t.step,"PUSHB["+e+"]");for(var i=0;i<e;i++)r.push(n[++o]);t.ip=o}function xr(e,t){var r=t.ip,n=t.prog,o=t.stack;M.DEBUG&&console.log(t.ip,"PUSHW["+e+"]");for(var i=0;i<e;i++){var a=n[++r]<<8|n[++r];32768&a&&(a=-(1+(65535^a))),o.push(a)}t.ip=r}function wr(e,t,r,n,o,i){var a,s,l,u,c=i.stack,d=e&&c.pop(),f=c.pop(),h=i.rp0,p=i.z0[h],y=i.z1[f],m=i.minDis,g=i.fv,v=i.dpv;l=0<=(s=a=v.distance(y,p,!0,!0))?1:-1,s=Math.abs(s),e&&(u=i.cvt[d],n&&Math.abs(s-u)<i.cvCutIn&&(s=u)),r&&s<m&&(s=m),n&&(s=i.round(s)),g.setRelative(y,p,l*s,v),g.touch(y),M.DEBUG&&console.log(i.step,(e?"MIRP[":"MDRP[")+(t?"M":"m")+(r?">":"_")+(n?"R":"_")+(0===o?"Gr":1===o?"Bl":2===o?"Wh":"")+"]",e?d+"("+i.cvt[d]+","+u+")":"",f,"(d =",a,"->",l*s,")"),i.rp1=i.rp0,i.rp2=f,t&&(i.rp0=f)}Ut.prototype.exec=function(e,t){if("number"!=typeof t)throw new Error("Point size is not a number!");if(!(2<this._errorState)){var r=this.font,n=this._prepState;if(!n||n.ppem!==t){var o=this._fpgmState;if(!o){Jt.prototype=Kt,(o=this._fpgmState=new Jt("fpgm",r.tables.fpgm)).funcs=[],o.font=r,M.DEBUG&&(console.log("---EXEC FPGM---"),o.step=-1);try{At(o)}catch(e){return console.log("Hinting error in FPGM:"+e),void(this._errorState=3)}}Jt.prototype=o,(n=this._prepState=new Jt("prep",r.tables.prep)).ppem=t;var i=r.tables.cvt;if(i)for(var a=n.cvt=new Array(i.length),s=t/r.unitsPerEm,l=0;l<i.length;l++)a[l]=i[l]*s;else n.cvt=[];M.DEBUG&&(console.log("---EXEC PREP---"),n.step=-1);try{At(n)}catch(e){this._errorState<2&&console.log("Hinting error in PREP:"+e),this._errorState=2}}if(!(1<this._errorState))try{return Rt(e,n)}catch(e){return this._errorState<1&&(console.log("Hinting error:"+e),console.log("Note: further hinting errors are silenced")),void(this._errorState=1)}}},Rt=function(e,t){var r,n,o,i=t.ppem/t.font.unitsPerEm,a=i,s=e.components;if(Jt.prototype=t,s){var l=t.font;n=[],r=[];for(var u=0;u<s.length;u++){var c=s[u],d=l.glyphs.get(c.glyphIndex);o=new Jt("glyf",d.instructions),M.DEBUG&&(console.log("---EXEC COMP "+u+"---"),o.step=-1),Dt(d,o,i,a);for(var f=Math.round(c.dx*i),h=Math.round(c.dy*a),p=o.gZone,y=o.contours,m=0;m<p.length;m++){var g=p[m];g.xTouched=g.yTouched=!1,g.xo=g.x=g.x+f,g.yo=g.y=g.y+h}var v=n.length;n.push.apply(n,p);for(var b=0;b<y.length;b++)r.push(y[b]+v)}e.instructions&&!o.inhibitGridFit&&((o=new Jt("glyf",e.instructions)).gZone=o.z0=o.z1=o.z2=n,o.contours=r,n.push(new Zt(0,0),new Zt(Math.round(e.advanceWidth*i),0)),M.DEBUG&&(console.log("---EXEC COMPOSITE---"),o.step=-1),At(o),n.length-=2)}else o=new Jt("glyf",e.instructions),M.DEBUG&&(console.log("---EXEC GLYPH---"),o.step=-1),Dt(e,o,i,a),n=o.gZone;return n},Dt=function(e,t,r,n){for(var o,i,a,s=e.points||[],l=s.length,u=t.gZone=t.z0=t.z1=t.z2=[],c=t.contours=[],d=0;d<l;d++)o=s[d],u[d]=new Zt(o.x*r,o.y*n,o.lastPointOfContour,o.onCurve);for(var f=0;f<l;f++)o=u[f],i||(i=o,c.push(f)),o.lastPointOfContour?((o.nextPointOnContour=i).prevPointOnContour=o,i=void 0):(a=u[f+1],(o.nextPointOnContour=a).prevPointOnContour=o);if(!t.inhibitGridFit){if(M.DEBUG){console.log("PROCESSING GLYPH",t.stack);for(var h=0;h<l;h++)console.log(h,u[h].x,u[h].y)}if(u.push(new Zt(0,0),new Zt(Math.round(e.advanceWidth*r),0)),At(t),u.length-=2,M.DEBUG){console.log("FINISHED GLYPH",t.stack);for(var p=0;p<l;p++)console.log(p,u[p].x,u[p].y)}}},At=function(e){var t=e.prog;if(t){var r,n=t.length;for(e.ip=0;e.ip<n;e.ip++){if(M.DEBUG&&e.step++,!(r=kt[t[e.ip]]))throw new Error("unknown instruction: 0x"+Number(t[e.ip]).toString(16));r(e)}}},kt=[tr.bind(void 0,Wt),tr.bind(void 0,qt),rr.bind(void 0,Wt),rr.bind(void 0,qt),nr.bind(void 0,Wt),nr.bind(void 0,qt),or.bind(void 0,0),or.bind(void 0,1),ir.bind(void 0,0),ir.bind(void 0,1),function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"SPVFS[]",r,n),e.pv=e.dpv=Yt(n,r)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"SPVFS[]",r,n),e.fv=Yt(n,r)},function(e){var t=e.stack,r=e.pv;M.DEBUG&&console.log(e.step,"GPV[]"),t.push(16384*r.x),t.push(16384*r.y)},function(e){var t=e.stack,r=e.fv;M.DEBUG&&console.log(e.step,"GFV[]"),t.push(16384*r.x),t.push(16384*r.y)},function(e){e.fv=e.pv,M.DEBUG&&console.log(e.step,"SFVTPV[]")},function(e){var t=e.stack,r=t.pop(),n=t.pop(),o=t.pop(),i=t.pop(),a=t.pop(),s=e.z0,l=e.z1,u=s[r],c=s[n],d=l[o],f=l[i],h=e.z2[a];M.DEBUG&&console.log("ISECT[], ",r,n,o,i,a);var p=u.x,y=u.y,m=c.x,g=c.y,v=d.x,b=d.y,_=f.x,x=f.y,w=(p-m)*(b-x)-(y-g)*(v-_),S=p*g-y*m,j=v*x-b*_;h.x=(S*(v-_)-j*(p-m))/w,h.y=(S*(b-x)-j*(y-g))/w},function(e){e.rp0=e.stack.pop(),M.DEBUG&&console.log(e.step,"SRP0[]",e.rp0)},function(e){e.rp1=e.stack.pop(),M.DEBUG&&console.log(e.step,"SRP1[]",e.rp1)},function(e){e.rp2=e.stack.pop(),M.DEBUG&&console.log(e.step,"SRP2[]",e.rp2)},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZP0[]",t),e.zp0=t){case 0:e.tZone||$t(e),e.z0=e.tZone;break;case 1:e.z0=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZP1[]",t),e.zp1=t){case 0:e.tZone||$t(e),e.z1=e.tZone;break;case 1:e.z1=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZP2[]",t),e.zp2=t){case 0:e.tZone||$t(e),e.z2=e.tZone;break;case 1:e.z2=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){var t=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SZPS[]",t),e.zp0=e.zp1=e.zp2=t,t){case 0:e.tZone||$t(e),e.z0=e.z1=e.z2=e.tZone;break;case 1:e.z0=e.z1=e.z2=e.gZone;break;default:throw new Error("Invalid zone pointer")}},function(e){e.loop=e.stack.pop(),M.DEBUG&&console.log(e.step,"SLOOP[]",e.loop)},function(e){M.DEBUG&&console.log(e.step,"RTG[]"),e.round=Ft},function(e){M.DEBUG&&console.log(e.step,"RTHG[]"),e.round=Gt},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SMD[]",t),e.minDis=t/64},function(e){M.DEBUG&&console.log(e.step,"ELSE[]"),er(e,!1)},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"JMPR[]",t),e.ip+=t-1},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SCVTCI[]",t),e.cvCutIn=t/64},void 0,void 0,function(e){var t=e.stack;M.DEBUG&&console.log(e.step,"DUP[]"),t.push(t[t.length-1])},ar,function(e){M.DEBUG&&console.log(e.step,"CLEAR[]"),e.stack.length=0},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"SWAP[]"),t.push(r),t.push(n)},function(e){var t=e.stack;M.DEBUG&&console.log(e.step,"DEPTH[]"),t.push(t.length)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"CINDEX[]",r),t.push(t[t.length-r])},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"MINDEX[]",r),t.push(t.splice(t.length-r,1)[0])},void 0,void 0,void 0,function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"LOOPCALL[]",r,n);var o=e.ip,i=e.prog;e.prog=e.funcs[r];for(var a=0;a<n;a++)At(e),M.DEBUG&&console.log(++e.step,a+1<n?"next loopcall":"done loopcall",a);e.ip=o,e.prog=i},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"CALL[]",t);var r=e.ip,n=e.prog;e.prog=e.funcs[t],At(e),e.ip=r,e.prog=n,M.DEBUG&&console.log(++e.step,"returning from",t)},function(e){if("fpgm"!==e.env)throw new Error("FDEF not allowed here");var t=e.stack,r=e.prog,n=e.ip,o=t.pop(),i=n;for(M.DEBUG&&console.log(e.step,"FDEF[]",o);45!==r[++n];);e.ip=n,e.funcs[o]=r.slice(i+1,n)},void 0,sr.bind(void 0,0),sr.bind(void 0,1),lr.bind(void 0,Wt),lr.bind(void 0,qt),ur.bind(void 0,0),ur.bind(void 0,1),cr.bind(void 0,0),cr.bind(void 0,1),dr.bind(void 0,0),dr.bind(void 0,1),function(e){for(var t=e.stack,r=e.loop,n=e.fv,o=t.pop()/64,i=e.z2;r--;){var a=t.pop(),s=i[a];M.DEBUG&&console.log(e.step,(1<e.loop?"loop "+(e.loop-r)+": ":"")+"SHPIX[]",a,o),n.setRelative(s,s,o),n.touch(s)}e.loop=1},function(e){for(var t=e.stack,r=e.rp1,n=e.rp2,o=e.loop,i=e.z0[r],a=e.z1[n],s=e.fv,l=e.dpv,u=e.z2;o--;){var c=t.pop(),d=u[c];M.DEBUG&&console.log(e.step,(1<e.loop?"loop "+(e.loop-o)+": ":"")+"IP[]",c,r,"<->",n),s.interpolate(d,i,a,l),s.touch(d)}e.loop=1},fr.bind(void 0,0),fr.bind(void 0,1),function(e){for(var t=e.stack,r=e.rp0,n=e.z0[r],o=e.loop,i=e.fv,a=e.pv,s=e.z1;o--;){var l=t.pop(),u=s[l];M.DEBUG&&console.log(e.step,(1<e.loop?"loop "+(e.loop-o)+": ":"")+"ALIGNRP[]",l),i.setRelative(u,n,0,a),i.touch(u)}e.loop=1},function(e){M.DEBUG&&console.log(e.step,"RTDG[]"),e.round=Bt},hr.bind(void 0,0),hr.bind(void 0,1),function(e){var t=e.prog,r=e.ip,n=e.stack,o=t[++r];M.DEBUG&&console.log(e.step,"NPUSHB[]",o);for(var i=0;i<o;i++)n.push(t[++r]);e.ip=r},function(e){var t=e.ip,r=e.prog,n=e.stack,o=r[++t];M.DEBUG&&console.log(e.step,"NPUSHW[]",o);for(var i=0;i<o;i++){var a=r[++t]<<8|r[++t];32768&a&&(a=-(1+(65535^a))),n.push(a)}e.ip=t},function(e){var t=e.stack,r=e.store;r=r||(e.store=[]);var n=t.pop(),o=t.pop();M.DEBUG&&console.log(e.step,"WS",n,o),r[o]=n},function(e){var t=e.stack,r=e.store,n=t.pop();M.DEBUG&&console.log(e.step,"RS",n);var o=r&&r[n]||0;t.push(o)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"WCVTP",r,n),e.cvt[n]=r/64},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"RCVT",r),t.push(64*e.cvt[r])},pr.bind(void 0,0),pr.bind(void 0,1),void 0,yr.bind(void 0,0),yr.bind(void 0,1),function(e){M.DEBUG&&console.log(e.step,"MPPEM[]"),e.stack.push(e.ppem)},void 0,function(e){M.DEBUG&&console.log(e.step,"FLIPON[]"),e.autoFlip=!0},void 0,void 0,function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"LT[]",r,n),t.push(n<r?1:0)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"LTEQ[]",r,n),t.push(n<=r?1:0)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"GT[]",r,n),t.push(r<n?1:0)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"GTEQ[]",r,n),t.push(r<=n?1:0)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"EQ[]",r,n),t.push(r===n?1:0)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"NEQ[]",r,n),t.push(r!==n?1:0)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"ODD[]",r),t.push(Math.trunc(r)%2?1:0)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"EVEN[]",r),t.push(Math.trunc(r)%2?0:1)},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"IF[]",t),t||(er(e,!0),M.DEBUG&&console.log(e.step,"EIF[]"))},function(e){M.DEBUG&&console.log(e.step,"EIF[]")},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"AND[]",r,n),t.push(r&&n?1:0)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"OR[]",r,n),t.push(r||n?1:0)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"NOT[]",r),t.push(r?0:1)},mr.bind(void 0,1),function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SDB[]",t),e.deltaBase=t},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SDS[]",t),e.deltaShift=Math.pow(.5,t)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"ADD[]",r,n),t.push(n+r)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"SUB[]",r,n),t.push(n-r)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"DIV[]",r,n),t.push(64*n/r)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"MUL[]",r,n),t.push(n*r/64)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"ABS[]",r),t.push(Math.abs(r))},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"NEG[]",r),t.push(-r)},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"FLOOR[]",r),t.push(64*Math.floor(r/64))},function(e){var t=e.stack,r=t.pop();M.DEBUG&&console.log(e.step,"CEILING[]",r),t.push(64*Math.ceil(r/64))},gr.bind(void 0,0),gr.bind(void 0,1),gr.bind(void 0,2),gr.bind(void 0,3),void 0,void 0,void 0,void 0,function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"WCVTF[]",r,n),e.cvt[n]=r*e.ppem/e.font.unitsPerEm},mr.bind(void 0,2),mr.bind(void 0,3),vr.bind(void 0,1),vr.bind(void 0,2),vr.bind(void 0,3),function(e){var t,r=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"SROUND[]",r),e.round=Ht,192&r){case 0:t=.5;break;case 64:t=1;break;case 128:t=2;break;default:throw new Error("invalid SROUND value")}switch(e.srPeriod=t,48&r){case 0:e.srPhase=0;break;case 16:e.srPhase=.25*t;break;case 32:e.srPhase=.5*t;break;case 48:e.srPhase=.75*t;break;default:throw new Error("invalid SROUND value")}r&=15,e.srThreshold=0===r?0:(r/8-.5)*t},function(e){var t,r=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"S45ROUND[]",r),e.round=Ht,192&r){case 0:t=Math.sqrt(2)/2;break;case 64:t=Math.sqrt(2);break;case 128:t=2*Math.sqrt(2);break;default:throw new Error("invalid S45ROUND value")}switch(e.srPeriod=t,48&r){case 0:e.srPhase=0;break;case 16:e.srPhase=.25*t;break;case 32:e.srPhase=.5*t;break;case 48:e.srPhase=.75*t;break;default:throw new Error("invalid S45ROUND value")}r&=15,e.srThreshold=0===r?0:(r/8-.5)*t},void 0,void 0,function(e){M.DEBUG&&console.log(e.step,"ROFF[]"),e.round=Nt},void 0,function(e){M.DEBUG&&console.log(e.step,"RUTG[]"),e.round=Vt},function(e){M.DEBUG&&console.log(e.step,"RDTG[]"),e.round=zt},ar,ar,void 0,void 0,void 0,void 0,void 0,function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SCANCTRL[]",t)},br.bind(void 0,0),br.bind(void 0,1),function(e){var t=e.stack,r=t.pop(),n=0;M.DEBUG&&console.log(e.step,"GETINFO[]",r),1&r&&(n=35),32&r&&(n|=4096),t.push(n)},void 0,function(e){var t=e.stack,r=t.pop(),n=t.pop(),o=t.pop();M.DEBUG&&console.log(e.step,"ROLL[]"),t.push(n),t.push(r),t.push(o)},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"MAX[]",r,n),t.push(Math.max(n,r))},function(e){var t=e.stack,r=t.pop(),n=t.pop();M.DEBUG&&console.log(e.step,"MIN[]",r,n),t.push(Math.min(n,r))},function(e){var t=e.stack.pop();M.DEBUG&&console.log(e.step,"SCANTYPE[]",t)},function(e){var t=e.stack.pop(),r=e.stack.pop();switch(M.DEBUG&&console.log(e.step,"INSTCTRL[]",t,r),t){case 1:return void(e.inhibitGridFit=!!r);case 2:return void(e.ignoreCvt=!!r);default:throw new Error("invalid INSTCTRL[] selector")}},void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,_r.bind(void 0,1),_r.bind(void 0,2),_r.bind(void 0,3),_r.bind(void 0,4),_r.bind(void 0,5),_r.bind(void 0,6),_r.bind(void 0,7),_r.bind(void 0,8),xr.bind(void 0,1),xr.bind(void 0,2),xr.bind(void 0,3),xr.bind(void 0,4),xr.bind(void 0,5),xr.bind(void 0,6),xr.bind(void 0,7),xr.bind(void 0,8),wr.bind(void 0,0,0,0,0,0),wr.bind(void 0,0,0,0,0,1),wr.bind(void 0,0,0,0,0,2),wr.bind(void 0,0,0,0,0,3),wr.bind(void 0,0,0,0,1,0),wr.bind(void 0,0,0,0,1,1),wr.bind(void 0,0,0,0,1,2),wr.bind(void 0,0,0,0,1,3),wr.bind(void 0,0,0,1,0,0),wr.bind(void 0,0,0,1,0,1),wr.bind(void 0,0,0,1,0,2),wr.bind(void 0,0,0,1,0,3),wr.bind(void 0,0,0,1,1,0),wr.bind(void 0,0,0,1,1,1),wr.bind(void 0,0,0,1,1,2),wr.bind(void 0,0,0,1,1,3),wr.bind(void 0,0,1,0,0,0),wr.bind(void 0,0,1,0,0,1),wr.bind(void 0,0,1,0,0,2),wr.bind(void 0,0,1,0,0,3),wr.bind(void 0,0,1,0,1,0),wr.bind(void 0,0,1,0,1,1),wr.bind(void 0,0,1,0,1,2),wr.bind(void 0,0,1,0,1,3),wr.bind(void 0,0,1,1,0,0),wr.bind(void 0,0,1,1,0,1),wr.bind(void 0,0,1,1,0,2),wr.bind(void 0,0,1,1,0,3),wr.bind(void 0,0,1,1,1,0),wr.bind(void 0,0,1,1,1,1),wr.bind(void 0,0,1,1,1,2),wr.bind(void 0,0,1,1,1,3),wr.bind(void 0,1,0,0,0,0),wr.bind(void 0,1,0,0,0,1),wr.bind(void 0,1,0,0,0,2),wr.bind(void 0,1,0,0,0,3),wr.bind(void 0,1,0,0,1,0),wr.bind(void 0,1,0,0,1,1),wr.bind(void 0,1,0,0,1,2),wr.bind(void 0,1,0,0,1,3),wr.bind(void 0,1,0,1,0,0),wr.bind(void 0,1,0,1,0,1),wr.bind(void 0,1,0,1,0,2),wr.bind(void 0,1,0,1,0,3),wr.bind(void 0,1,0,1,1,0),wr.bind(void 0,1,0,1,1,1),wr.bind(void 0,1,0,1,1,2),wr.bind(void 0,1,0,1,1,3),wr.bind(void 0,1,1,0,0,0),wr.bind(void 0,1,1,0,0,1),wr.bind(void 0,1,1,0,0,2),wr.bind(void 0,1,1,0,0,3),wr.bind(void 0,1,1,0,1,0),wr.bind(void 0,1,1,0,1,1),wr.bind(void 0,1,1,0,1,2),wr.bind(void 0,1,1,0,1,3),wr.bind(void 0,1,1,1,0,0),wr.bind(void 0,1,1,1,0,1),wr.bind(void 0,1,1,1,0,2),wr.bind(void 0,1,1,1,0,3),wr.bind(void 0,1,1,1,1,0),wr.bind(void 0,1,1,1,1,1),wr.bind(void 0,1,1,1,1,2),wr.bind(void 0,1,1,1,1,3)];var Sr=Array.from||function(e){return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g)||[]};function jr(e){(e=e||{}).empty||(Et(e.familyName,"When creating a new Font object, familyName is required."),Et(e.styleName,"When creating a new Font object, styleName is required."),Et(e.unitsPerEm,"When creating a new Font object, unitsPerEm is required."),Et(e.ascender,"When creating a new Font object, ascender is required."),Et(e.descender,"When creating a new Font object, descender is required."),Et(e.descender<0,"Descender should be negative (e.g. -512)."),this.names={fontFamily:{en:e.familyName||" "},fontSubfamily:{en:e.styleName||" "},fullName:{en:e.fullName||e.familyName+" "+e.styleName},postScriptName:{en:e.postScriptName||(e.familyName+e.styleName).replace(/\s/g,"")},designer:{en:e.designer||" "},designerURL:{en:e.designerURL||" "},manufacturer:{en:e.manufacturer||" "},manufacturerURL:{en:e.manufacturerURL||" "},license:{en:e.license||" "},licenseURL:{en:e.licenseURL||" "},version:{en:e.version||"Version 0.1"},description:{en:e.description||" "},copyright:{en:e.copyright||" "},trademark:{en:e.trademark||" "}},this.unitsPerEm=e.unitsPerEm||1e3,this.ascender=e.ascender,this.descender=e.descender,this.createdTimestamp=e.createdTimestamp,this.tables={os2:{usWeightClass:e.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:e.widthClass||this.usWidthClasses.MEDIUM,fsSelection:e.fsSelection||this.fsSelectionValues.REGULAR}}),this.supported=!0,this.glyphs=new _e.GlyphSet(this,e.glyphs||[]),this.encoding=new fe(this),this.position=new xt(this),this.substitution=new wt(this),this.tables=this.tables||{},Object.defineProperty(this,"hinting",{get:function(){return this._hinting?this._hinting:"truetype"===this.outlinesFormat?this._hinting=new Ut(this):void 0}})}function Mr(e,t){var r=JSON.stringify(e),n=256;for(var o in t){var i=parseInt(o);if(i&&!(i<256)){if(JSON.stringify(t[o])===r)return i;n<=i&&(n=i+1)}}return t[n]=e,n}function Er(e,t,r,n){for(var o=[{name:"nameID_"+e,type:"USHORT",value:Mr(t.name,n)},{name:"flags_"+e,type:"USHORT",value:0}],i=0;i<r.length;++i){var a=r[i].tag;o.push({name:"axis_"+e+" "+a,type:"FIXED",value:t.coordinates[a]<<16})}return o}function Tr(e,t,r,n){var o={},i=new ae.Parser(e,t);o.name=n[i.parseUShort()]||{},i.skip("uShort",1),o.coordinates={};for(var a=0;a<r.length;++a)o.coordinates[r[a].tag]=i.parseFixed();return o}jr.prototype.hasChar=function(e){return null!==this.encoding.charToGlyphIndex(e)},jr.prototype.charToGlyphIndex=function(e){return this.encoding.charToGlyphIndex(e)},jr.prototype.charToGlyph=function(e){var t=this.charToGlyphIndex(e),r=this.glyphs.get(t);return r=r||this.glyphs.get(0)},jr.prototype.stringToGlyphs=function(e,t){t=t||this.defaultRenderOptions;for(var r=Sr(e),n=[],o=0;o<r.length;o+=1){var i=r[o];n.push(this.charToGlyphIndex(i))}var a=n.length;if(t.features){var s=t.script||this.substitution.getDefaultScriptName(),l=[];t.features.liga&&(l=l.concat(this.substitution.getFeature("liga",s,t.language))),t.features.rlig&&(l=l.concat(this.substitution.getFeature("rlig",s,t.language)));for(var u=0;u<a;u+=1)for(var c=0;c<l.length;c++){for(var d=l[c],f=d.sub,h=f.length,p=0;p<h&&f[p]===n[u+p];)p++;p===h&&(n.splice(u,h,d.by),a=a-h+1)}}for(var y=new Array(a),m=this.glyphs.get(0),g=0;g<a;g+=1)y[g]=this.glyphs.get(n[g])||m;return y},jr.prototype.nameToGlyphIndex=function(e){return this.glyphNames.nameToGlyphIndex(e)},jr.prototype.nameToGlyph=function(e){var t=this.nameToGlyphIndex(e),r=this.glyphs.get(t);return r=r||this.glyphs.get(0)},jr.prototype.glyphIndexToName=function(e){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(e):""},jr.prototype.getKerningValue=function(e,t){e=e.index||e,t=t.index||t;var r=this.position.defaultKerningTables;return r?this.position.getKerningValue(r,e,t):this.kerningPairs[e+","+t]||0},jr.prototype.defaultRenderOptions={kerning:!0,features:{liga:!0,rlig:!0}},jr.prototype.forEachGlyph=function(e,t,r,n,o,i){t=void 0!==t?t:0,r=void 0!==r?r:0,n=void 0!==n?n:72,o=o||this.defaultRenderOptions;var a,s=1/this.unitsPerEm*n,l=this.stringToGlyphs(e,o);if(o.kerning){var u=o.script||this.position.getDefaultScriptName();a=this.position.getKerningTables(u,o.language)}for(var c=0;c<l.length;c+=1){var d=l[c];if(i.call(this,d,t,r,n,o),d.advanceWidth&&(t+=d.advanceWidth*s),o.kerning&&c<l.length-1)t+=(a?this.position.getKerningValue(a,d.index,l[c+1].index):this.getKerningValue(d,l[c+1]))*s;o.letterSpacing?t+=o.letterSpacing*n:o.tracking&&(t+=o.tracking/1e3*n)}return t},jr.prototype.getPath=function(e,t,r,n,i){var a=new D;return this.forEachGlyph(e,t,r,n,i,function(e,t,r,n){var o=e.getPath(t,r,n,i,this);a.extend(o)}),a},jr.prototype.getPaths=function(e,t,r,n,i){var a=[];return this.forEachGlyph(e,t,r,n,i,function(e,t,r,n){var o=e.getPath(t,r,n,i,this);a.push(o)}),a},jr.prototype.getAdvanceWidth=function(e,t,r){return this.forEachGlyph(e,0,0,t,r,function(){})},jr.prototype.draw=function(e,t,r,n,o,i){this.getPath(t,r,n,o,i).draw(e)},jr.prototype.drawPoints=function(o,e,t,r,n,i){this.forEachGlyph(e,t,r,n,i,function(e,t,r,n){e.drawPoints(o,t,r,n)})},jr.prototype.drawMetrics=function(o,e,t,r,n,i){this.forEachGlyph(e,t,r,n,i,function(e,t,r,n){e.drawMetrics(o,t,r,n)})},jr.prototype.getEnglishName=function(e){var t=this.names[e];if(t)return t.en},jr.prototype.validate=function(){var r=this;function e(e){var t=r.getEnglishName(e);t&&t.trim().length}e("fontFamily"),e("weightName"),e("manufacturer"),e("copyright"),e("version"),this.unitsPerEm},jr.prototype.toTables=function(){return mt.fontToTable(this)},jr.prototype.toBuffer=function(){return console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."),this.toArrayBuffer()},jr.prototype.toArrayBuffer=function(){for(var e=this.toTables().encode(),t=new ArrayBuffer(e.length),r=new Uint8Array(t),n=0;n<e.length;n++)r[n]=e[n];return t},jr.prototype.download=function(t){var e=this.getEnglishName("fontFamily"),r=this.getEnglishName("fontSubfamily");t=t||e.replace(/\s/g,"")+"-"+r+".otf";var o=this.toArrayBuffer();if("undefined"!=typeof window)window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(window.TEMPORARY,o.byteLength,function(e){e.root.getFile(t,{create:!0},function(n){n.createWriter(function(e){var t=new DataView(o),r=new Blob([t],{type:"font/opentype"});e.write(r),e.addEventListener("writeend",function(){location.href=n.toURL()},!1)})})},function(e){throw new Error(e.name+": "+e.message)});else{var n=Br("fs"),i=function(e){for(var t=new Fr(e.byteLength),r=new Uint8Array(e),n=0;n<t.length;++n)t[n]=r[n];return t}(o);n.writeFileSync(t,i)}},jr.prototype.fsSelectionValues={ITALIC:1,UNDERSCORE:2,NEGATIVE:4,OUTLINED:8,STRIKEOUT:16,BOLD:32,REGULAR:64,USER_TYPO_METRICS:128,WWS:256,OBLIQUE:512},jr.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9},jr.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};var Or={make:function(e,t){var r,n,o,i,a=new J.Table("fvar",[{name:"version",type:"ULONG",value:65536},{name:"offsetToData",type:"USHORT",value:0},{name:"countSizePairs",type:"USHORT",value:2},{name:"axisCount",type:"USHORT",value:e.axes.length},{name:"axisSize",type:"USHORT",value:20},{name:"instanceCount",type:"USHORT",value:e.instances.length},{name:"instanceSize",type:"USHORT",value:4+4*e.axes.length}]);a.offsetToData=a.sizeOf();for(var s=0;s<e.axes.length;s++)a.fields=a.fields.concat((r=s,n=e.axes[s],o=t,i=Mr(n.name,o),[{name:"tag_"+r,type:"TAG",value:n.tag},{name:"minValue_"+r,type:"FIXED",value:n.minValue<<16},{name:"defaultValue_"+r,type:"FIXED",value:n.defaultValue<<16},{name:"maxValue_"+r,type:"FIXED",value:n.maxValue<<16},{name:"flags_"+r,type:"USHORT",value:0},{name:"nameID_"+r,type:"USHORT",value:i}]));for(var l=0;l<e.instances.length;l++)a.fields=a.fields.concat(Er(l,e.instances[l],e.axes,t));return a},parse:function(e,t,r){var n=new ae.Parser(e,t),o=n.parseULong();L.argument(65536===o,"Unsupported fvar table version.");var i=n.parseOffset16();n.skip("uShort",1);for(var a,s,l,u,c,d=n.parseUShort(),f=n.parseUShort(),h=n.parseUShort(),p=n.parseUShort(),y=[],m=0;m<d;m++)y.push((a=e,s=t+i+m*f,l=r,c=u=void 0,u={},c=new ae.Parser(a,s),u.tag=c.parseTag(),u.minValue=c.parseFixed(),u.defaultValue=c.parseFixed(),u.maxValue=c.parseFixed(),c.skip("uShort",1),u.name=l[c.parseUShort()]||{},u));for(var g=[],v=t+i+d*f,b=0;b<h;b++)g.push(Tr(e,v+b*p,y,r));return{axes:y,instances:g}}},Cr=new Array(10);Cr[1]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();return 1===t?{posFormat:1,coverage:this.parsePointer(oe.coverage),value:this.parseValueRecord()}:2===t?{posFormat:2,coverage:this.parsePointer(oe.coverage),values:this.parseValueRecordList()}:void L.assert(!1,"0x"+e.toString(16)+": GPOS lookup type 1 format must be 1 or 2.")},Cr[2]=function(){var e=this.offset+this.relativeOffset,t=this.parseUShort();L.assert(1===t||2===t,"0x"+e.toString(16)+": GPOS lookup type 2 format must be 1 or 2.");var r=this.parsePointer(oe.coverage),n=this.parseUShort(),o=this.parseUShort();if(1===t)return{posFormat:t,coverage:r,valueFormat1:n,valueFormat2:o,pairSets:this.parseList(oe.pointer(oe.list(function(){return{secondGlyph:this.parseUShort(),value1:this.parseValueRecord(n),value2:this.parseValueRecord(o)}})))};if(2===t){var i=this.parsePointer(oe.classDef),a=this.parsePointer(oe.classDef),s=this.parseUShort(),l=this.parseUShort();return{posFormat:t,coverage:r,valueFormat1:n,valueFormat2:o,classDef1:i,classDef2:a,class1Count:s,class2Count:l,classRecords:this.parseList(s,oe.list(l,function(){return{value1:this.parseValueRecord(n),value2:this.parseValueRecord(o)}}))}}},Cr[3]=function(){return{error:"GPOS Lookup 3 not supported"}},Cr[4]=function(){return{error:"GPOS Lookup 4 not supported"}},Cr[5]=function(){return{error:"GPOS Lookup 5 not supported"}},Cr[6]=function(){return{error:"GPOS Lookup 6 not supported"}},Cr[7]=function(){return{error:"GPOS Lookup 7 not supported"}},Cr[8]=function(){return{error:"GPOS Lookup 8 not supported"}},Cr[9]=function(){return{error:"GPOS Lookup 9 not supported"}};var Lr=new Array(10);var Pr={parse:function(e,t){var r=new oe(e,t=t||0),n=r.parseVersion(1);return L.argument(1===n||1.1===n,"Unsupported GPOS table version "+n),1===n?{version:n,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(Cr)}:{version:n,scripts:r.parseScriptList(),features:r.parseFeatureList(),lookups:r.parseLookupList(Cr),variations:r.parseFeatureVariationsList()}},make:function(e){return new J.Table("GPOS",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new J.ScriptList(e.scripts)},{name:"features",type:"TABLE",value:new J.FeatureList(e.features)},{name:"lookups",type:"TABLE",value:new J.LookupList(e.lookups,Lr)}])}};var kr={parse:function(e,t){var r=new ae.Parser(e,t),n=r.parseUShort();if(0===n)return function(e){var t={};e.skip("uShort");var r=e.parseUShort();L.argument(0===r,"Unsupported kern sub-table version."),e.skip("uShort",2);var n=e.parseUShort();e.skip("uShort",3);for(var o=0;o<n;o+=1){var i=e.parseUShort(),a=e.parseUShort(),s=e.parseShort();t[i+","+a]=s}return t}(r);if(1===n)return function(e){var t={};e.skip("uShort"),1<e.parseULong()&&console.warn("Only the first kern subtable is supported."),e.skip("uLong");var r=255&e.parseUShort();if(e.skip("uShort"),0==r){var n=e.parseUShort();e.skip("uShort",3);for(var o=0;o<n;o+=1){var i=e.parseUShort(),a=e.parseUShort(),s=e.parseShort();t[i+","+a]=s}}return t}(r);throw new Error("Unsupported kern table version ("+n+").")}};var Ar={parse:function(e,t,r,n){for(var o=new ae.Parser(e,t),i=n?o.parseUShort:o.parseULong,a=[],s=0;s<r+1;s+=1){var l=i.call(o);n&&(l*=2),a.push(l)}return a}};function Rr(e,r){Br("fs").readFile(e,function(e,t){if(e)return r(e.message);r(null,Mt(t))})}function Dr(e,t){var r=new XMLHttpRequest;r.open("get",e,!0),r.responseType="arraybuffer",r.onload=function(){return r.response?t(null,r.response):t("Font could not be loaded: "+r.statusText)},r.onerror=function(){t("Font could not be loaded")},r.send()}function Ir(e,t){for(var r=[],n=12,o=0;o<t;o+=1){var i=ae.getTag(e,n),a=ae.getULong(e,n+4),s=ae.getULong(e,n+8),l=ae.getULong(e,n+12);r.push({tag:i,checksum:a,offset:s,length:l,compression:!1}),n+=16}return r}function Ur(e,t){if("WOFF"!==t.compression)return{data:e,offset:t.offset};var r=new Uint8Array(e.buffer,t.offset+2,t.compressedLength-2),n=new Uint8Array(t.length);if(o(r,n),n.byteLength!==t.length)throw new Error("Decompression error: "+t.tag+" decompressed length doesn't match recorded length");return{data:new DataView(n.buffer,0),offset:0}}function Nr(e){var t,r,n,o,i,a,s,l,u,c,d,f,h,p,y=new jr({empty:!0}),m=new DataView(e,0),g=[],v=ae.getTag(m,0);if(v===String.fromCharCode(0,1,0,0)||"true"===v||"typ1"===v)y.outlinesFormat="truetype",g=Ir(m,n=ae.getUShort(m,4));else if("OTTO"===v)y.outlinesFormat="cff",g=Ir(m,n=ae.getUShort(m,4));else{if("wOFF"!==v)throw new Error("Unsupported OpenType signature "+v);var b=ae.getTag(m,4);if(b===String.fromCharCode(0,1,0,0))y.outlinesFormat="truetype";else{if("OTTO"!==b)throw new Error("Unsupported OpenType flavor "+v);y.outlinesFormat="cff"}g=function(e,t){for(var r=[],n=44,o=0;o<t;o+=1){var i=ae.getTag(e,n),a=ae.getULong(e,n+4),s=ae.getULong(e,n+8),l=ae.getULong(e,n+12),u=void 0;u=s<l&&"WOFF",r.push({tag:i,offset:a,compression:u,compressedLength:s,length:l}),n+=20}return r}(m,n=ae.getUShort(m,12))}for(var _=0;_<n;_+=1){var x=g[_],w=void 0;switch(x.tag){case"cmap":w=Ur(m,x),y.tables.cmap=se.parse(w.data,w.offset),y.encoding=new he(y.tables.cmap);break;case"cvt ":w=Ur(m,x),p=new ae.Parser(w.data,w.offset),y.tables.cvt=p.parseShortList(x.length/2);break;case"fvar":i=x;break;case"fpgm":w=Ur(m,x),p=new ae.Parser(w.data,w.offset),y.tables.fpgm=p.parseByteList(x.length);break;case"head":w=Ur(m,x),y.tables.head=Fe.parse(w.data,w.offset),y.unitsPerEm=y.tables.head.unitsPerEm,t=y.tables.head.indexToLocFormat;break;case"hhea":w=Ur(m,x),y.tables.hhea=Be.parse(w.data,w.offset),y.ascender=y.tables.hhea.ascender,y.descender=y.tables.hhea.descender,y.numberOfHMetrics=y.tables.hhea.numberOfHMetrics;break;case"hmtx":u=x;break;case"ltag":w=Ur(m,x),r=Ve.parse(w.data,w.offset);break;case"maxp":w=Ur(m,x),y.tables.maxp=ze.parse(w.data,w.offset),y.numGlyphs=y.tables.maxp.numGlyphs;break;case"name":f=x;break;case"OS/2":w=Ur(m,x),y.tables.os2=ot.parse(w.data,w.offset);break;case"post":w=Ur(m,x),y.tables.post=it.parse(w.data,w.offset),y.glyphNames=new ye(y.tables.post);break;case"prep":w=Ur(m,x),p=new ae.Parser(w.data,w.offset),y.tables.prep=p.parseByteList(x.length);break;case"glyf":a=x;break;case"loca":d=x;break;case"CFF ":o=x;break;case"kern":c=x;break;case"GPOS":s=x;break;case"GSUB":l=x;break;case"meta":h=x}}var S=Ur(m,f);if(y.tables.name=rt.parse(S.data,S.offset,r),y.names=y.tables.name,a&&d){var j=0===t,M=Ur(m,d),E=Ar.parse(M.data,M.offset,y.numGlyphs,j),T=Ur(m,a);y.glyphs=It.parse(T.data,T.offset,E,y)}else{if(!o)throw new Error("Font doesn't contain TrueType or CFF outlines.");var O=Ur(m,o);Ne.parse(O.data,O.offset,y)}var C=Ur(m,u);if(Ge.parse(C.data,C.offset,y.numberOfHMetrics,y.numGlyphs,y.glyphs),function(e){for(var t,r=e.tables.cmap.glyphIndexMap,n=Object.keys(r),o=0;o<n.length;o+=1){var i=n[o],a=r[i];(t=e.glyphs.get(a)).addUnicode(parseInt(i))}for(var s=0;s<e.glyphs.length;s+=1)t=e.glyphs.get(s),e.cffEncoding?e.isCIDFont?t.name="gid"+s:t.name=e.cffEncoding.charset[s]:e.glyphNames.names&&(t.name=e.glyphNames.glyphIndexToName(s))}(y),c){var L=Ur(m,c);y.kerningPairs=kr.parse(L.data,L.offset)}else y.kerningPairs={};if(s){var P=Ur(m,s);y.tables.gpos=Pr.parse(P.data,P.offset),y.position.init()}if(l){var k=Ur(m,l);y.tables.gsub=ut.parse(k.data,k.offset)}if(i){var A=Ur(m,i);y.tables.fvar=Or.parse(A.data,A.offset,y.names)}if(h){var R=Ur(m,h);y.tables.meta=ct.parse(R.data,R.offset),y.metas=y.tables.meta}return y}M.Font=jr,M.Glyph=ge,M.Path=D,M.BoundingBox=T,M._parse=ae,M.parse=Nr,M.load=function(e,n){("undefined"==typeof window?Rr:Dr)(e,function(e,t){if(e)return n(e);var r;try{r=Nr(t)}catch(e){return n(e,null)}return n(null,r)})},M.loadSync=function(e){return Nr(Mt(Br("fs").readFileSync(e)))},Object.defineProperty(M,"__esModule",{value:!0})}("object"==typeof r&&void 0!==t?r:e.opentype={})}).call(this,Br("buffer").Buffer)},{buffer:4,fs:2}],237:[function(e,t,u){(function(o){function i(e,t){for(var r=0,n=e.length-1;0<=n;n--){var o=e[n];"."===o?e.splice(n,1):".."===o?(e.splice(n,1),r++):r&&(e.splice(n,1),r--)}if(t)for(;r--;)e.unshift("..");return e}function a(e,t){if(e.filter)return e.filter(t);for(var r=[],n=0;n<e.length;n++)t(e[n],n,e)&&r.push(e[n]);return r}u.resolve=function(){for(var e="",t=!1,r=arguments.length-1;-1<=r&&!t;r--){var n=0<=r?arguments[r]:o.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");n&&(e=n+"/"+e,t="/"===n.charAt(0))}return(t?"/":"")+(e=i(a(e.split("/"),function(e){return!!e}),!t).join("/"))||"."},u.normalize=function(e){var t=u.isAbsolute(e),r="/"===n(e,-1);return(e=i(a(e.split("/"),function(e){return!!e}),!t).join("/"))||t||(e="."),e&&r&&(e+="/"),(t?"/":"")+e},u.isAbsolute=function(e){return"/"===e.charAt(0)},u.join=function(){var e=Array.prototype.slice.call(arguments,0);return u.normalize(a(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},u.relative=function(e,t){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var r=e.length-1;0<=r&&""===e[r];r--);return r<t?[]:e.slice(t,r-t+1)}e=u.resolve(e).substr(1),t=u.resolve(t).substr(1);for(var n=r(e.split("/")),o=r(t.split("/")),i=Math.min(n.length,o.length),a=i,s=0;s<i;s++)if(n[s]!==o[s]){a=s;break}var l=[];for(s=a;s<n.length;s++)l.push("..");return(l=l.concat(o.slice(a))).join("/")},u.sep="/",u.delimiter=":",u.dirname=function(e){if("string"!=typeof e&&(e+=""),0===e.length)return".";for(var t=e.charCodeAt(0),r=47===t,n=-1,o=!0,i=e.length-1;1<=i;--i)if(47===(t=e.charCodeAt(i))){if(!o){n=i;break}}else o=!1;return-1===n?r?"/":".":r&&1===n?"/":e.slice(0,n)},u.basename=function(e,t){var r=function(e){"string"!=typeof e&&(e+="");var t,r=0,n=-1,o=!0;for(t=e.length-1;0<=t;--t)if(47===e.charCodeAt(t)){if(!o){r=t+1;break}}else-1===n&&(o=!1,n=t+1);return-1===n?"":e.slice(r,n)}(e);return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},u.extname=function(e){"string"!=typeof e&&(e+="");for(var t=-1,r=0,n=-1,o=!0,i=0,a=e.length-1;0<=a;--a){var s=e.charCodeAt(a);if(47===s){if(o)continue;r=a+1;break}-1===n&&(o=!1,n=a+1),46===s?-1===t?t=a:1!==i&&(i=1):-1!==t&&(i=-1)}return-1===t||-1===n||0===i||1===i&&t===n-1&&t===r+1?"":e.slice(t,n)};var n="b"==="ab".substr(-1)?function(e,t,r){return e.substr(t,r)}:function(e,t,r){return t<0&&(t=e.length+t),e.substr(t,r)}}).call(this,e("_process"))},{_process:238}],238:[function(e,t,r){var n,o,i=t.exports={};function a(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function l(t){if(n===setTimeout)return setTimeout(t,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(e){o=s}}();var u,c=[],d=!1,f=-1;function h(){d&&u&&(d=!1,u.length?c=u.concat(c):f=-1,c.length&&p())}function p(){if(!d){var e=l(h);d=!0;for(var t=c.length;t;){for(u=c,c=[];++f<t;)u&&u[f].run();f=-1,t=c.length}u=null,d=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===s||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(e)}}function y(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new y(e,t)),1!==c.length||d||l(p)},y.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],239:[function(e,t,r){!function(e){"use strict";if(!e.fetch){var t="URLSearchParams"in e,r="Symbol"in e&&"iterator"in Symbol,a="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),n="FormData"in e,o="ArrayBuffer"in e;if(o)var i=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],s=function(e){return e&&DataView.prototype.isPrototypeOf(e)},l=ArrayBuffer.isView||function(e){return e&&-1<i.indexOf(Object.prototype.toString.call(e))};p.prototype.append=function(e,t){e=d(e),t=f(t);var r=this.map[e];this.map[e]=r?r+","+t:t},p.prototype.delete=function(e){delete this.map[d(e)]},p.prototype.get=function(e){return e=d(e),this.has(e)?this.map[e]:null},p.prototype.has=function(e){return this.map.hasOwnProperty(d(e))},p.prototype.set=function(e,t){this.map[d(e)]=f(t)},p.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},p.prototype.keys=function(){var r=[];return this.forEach(function(e,t){r.push(t)}),h(r)},p.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),h(t)},p.prototype.entries=function(){var r=[];return this.forEach(function(e,t){r.push([t,e])}),h(r)},r&&(p.prototype[Symbol.iterator]=p.prototype.entries);var u=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},b.call(_.prototype),b.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new p(this.headers),url:this.url})},w.error=function(){var e=new w(null,{status:0,statusText:""});return e.type="error",e};var c=[301,302,303,307,308];w.redirect=function(e,t){if(-1===c.indexOf(t))throw new RangeError("Invalid status code");return new w(null,{status:t,headers:{location:e}})},e.Headers=p,e.Request=_,e.Response=w,e.fetch=function(r,o){return new Promise(function(n,e){var t=new _(r,o),i=new XMLHttpRequest;i.onload=function(){var e,o,t={status:i.status,statusText:i.statusText,headers:(e=i.getAllResponseHeaders()||"",o=new p,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var t=e.split(":"),r=t.shift().trim();if(r){var n=t.join(":").trim();o.append(r,n)}}),o)};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;n(new w(r,t))},i.onerror=function(){e(new TypeError("Network request failed"))},i.ontimeout=function(){e(new TypeError("Network request failed"))},i.open(t.method,t.url,!0),"include"===t.credentials?i.withCredentials=!0:"omit"===t.credentials&&(i.withCredentials=!1),"responseType"in i&&a&&(i.responseType="blob"),t.headers.forEach(function(e,t){i.setRequestHeader(t,e)}),i.send(void 0===t._bodyInit?null:t._bodyInit)})},e.fetch.polyfill=!0}function d(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function f(e){return"string"!=typeof e&&(e=String(e)),e}function h(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return r&&(e[Symbol.iterator]=function(){return e}),e}function p(t){this.map={},t instanceof p?t.forEach(function(e,t){this.append(t,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function y(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function m(r){return new Promise(function(e,t){r.onload=function(){e(r.result)},r.onerror=function(){t(r.error)}})}function g(e){var t=new FileReader,r=m(t);return t.readAsArrayBuffer(e),r}function v(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e)if("string"==typeof e)this._bodyText=e;else if(a&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(n&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(t&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(o&&a&&s(e))this._bodyArrayBuffer=v(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!o||!ArrayBuffer.prototype.isPrototypeOf(e)&&!l(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=v(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},a&&(this.blob=function(){var e=y(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?y(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(g)}),this.text=function(){var e,t,r,n=y(this);if(n)return n;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,r=m(t),t.readAsText(e),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},n&&(this.formData=function(){return this.text().then(x)}),this.json=function(){return this.text().then(JSON.parse)},this}function _(e,t){var r,n,o=(t=t||{}).body;if(e instanceof _){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new p(e.headers)),this.method=e.method,this.mode=e.mode,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new p(t.headers)),this.method=(r=t.method||this.method||"GET",n=r.toUpperCase(),-1<u.indexOf(n)?n:r),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function x(e){var o=new FormData;return e.trim().split("&").forEach(function(e){if(e){var t=e.split("="),r=t.shift().replace(/\+/g," "),n=t.join("=").replace(/\+/g," ");o.append(decodeURIComponent(r),decodeURIComponent(n))}}),o}function w(e,t){t=t||{},this.type="default",this.status=void 0===t.status?200:t.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new p(t.headers),this.url=t.url||"",this._initBody(e)}}("undefined"!=typeof self?self:this)},{}],240:[function(e,t,r){"use strict";e("core-js/modules/es.function.name"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.split"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var l,n=i(e("../core/main")),o=i(e("../color/color_conversion"));function i(e){return e&&e.__esModule?e:{default:e}}var u=[{h:0,s:0,b:.8275,name:"gray"},{h:0,s:0,b:.8627,name:"gray"},{h:0,s:0,b:.7529,name:"gray"},{h:.0167,s:.1176,b:1,name:"light pink"}],c=[{h:0,s:0,b:0,name:"black"},{h:0,s:0,b:.5,name:"gray"},{h:0,s:0,b:1,name:"white"},{h:0,s:.5,b:.5,name:"dark maroon"},{h:0,s:.5,b:1,name:"salmon pink"},{h:0,s:1,b:0,name:"black"},{h:0,s:1,b:.5,name:"dark red"},{h:0,s:1,b:1,name:"red"},{h:5,s:0,b:1,name:"very light peach"},{h:5,s:.5,b:.5,name:"brown"},{h:5,s:.5,b:1,name:"peach"},{h:5,s:1,b:.5,name:"brick red"},{h:5,s:1,b:1,name:"crimson"},{h:10,s:0,b:1,name:"light peach"},{h:10,s:.5,b:.5,name:"brown"},{h:10,s:.5,b:1,name:"light orange"},{h:10,s:1,b:.5,name:"brown"},{h:10,s:1,b:1,name:"orange"},{h:15,s:0,b:1,name:"very light yellow"},{h:15,s:.5,b:.5,name:"olive green"},{h:15,s:.5,b:1,name:"light yellow"},{h:15,s:1,b:0,name:"dark olive green"},{h:15,s:1,b:.5,name:"olive green"},{h:15,s:1,b:1,name:"yellow"},{h:20,s:0,b:1,name:"very light yellow"},{h:20,s:.5,b:.5,name:"olive green"},{h:20,s:.5,b:1,name:"light yellow green"},{h:20,s:1,b:0,name:"dark olive green"},{h:20,s:1,b:.5,name:"dark yellow green"},{h:20,s:1,b:1,name:"yellow green"},{h:25,s:.5,b:.5,name:"dark yellow green"},{h:25,s:.5,b:1,name:"light green"},{h:25,s:1,b:.5,name:"dark green"},{h:25,s:1,b:1,name:"green"},{h:30,s:.5,b:1,name:"light green"},{h:30,s:1,b:.5,name:"dark green"},{h:30,s:1,b:1,name:"green"},{h:35,s:0,b:.5,name:"light green"},{h:35,s:0,b:1,name:"very light green"},{h:35,s:.5,b:.5,name:"dark green"},{h:35,s:.5,b:1,name:"light green"},{h:35,s:1,b:0,name:"very dark green"},{h:35,s:1,b:.5,name:"dark green"},{h:35,s:1,b:1,name:"green"},{h:40,s:0,b:1,name:"very light green"},{h:40,s:.5,b:.5,name:"dark green"},{h:40,s:.5,b:1,name:"light green"},{h:40,s:1,b:.5,name:"dark green"},{h:40,s:1,b:1,name:"green"},{h:45,s:.5,b:1,name:"light turquoise"},{h:45,s:1,b:.5,name:"dark turquoise"},{h:45,s:1,b:1,name:"turquoise"},{h:50,s:0,b:1,name:"light sky blue"},{h:50,s:.5,b:.5,name:"dark cyan"},{h:50,s:.5,b:1,name:"light cyan"},{h:50,s:1,b:.5,name:"dark cyan"},{h:50,s:1,b:1,name:"cyan"},{h:55,s:0,b:1,name:"light sky blue"},{h:55,s:.5,b:1,name:"light sky blue"},{h:55,s:1,b:.5,name:"dark blue"},{h:55,s:1,b:1,name:"sky blue"},{h:60,s:0,b:.5,name:"gray"},{h:60,s:0,b:1,name:"very light blue"},{h:60,s:.5,b:.5,name:"blue"},{h:60,s:.5,b:1,name:"light blue"},{h:60,s:1,b:.5,name:"navy blue"},{h:60,s:1,b:1,name:"blue"},{h:65,s:0,b:1,name:"lavender"},{h:65,s:.5,b:.5,name:"navy blue"},{h:65,s:.5,b:1,name:"light purple"},{h:65,s:1,b:.5,name:"dark navy blue"},{h:65,s:1,b:1,name:"blue"},{h:70,s:0,b:1,name:"lavender"},{h:70,s:.5,b:.5,name:"navy blue"},{h:70,s:.5,b:1,name:"lavender blue"},{h:70,s:1,b:.5,name:"dark navy blue"},{h:70,s:1,b:1,name:"blue"},{h:75,s:.5,b:1,name:"lavender"},{h:75,s:1,b:.5,name:"dark purple"},{h:75,s:1,b:1,name:"purple"},{h:80,s:.5,b:1,name:"pinkish purple"},{h:80,s:1,b:.5,name:"dark purple"},{h:80,s:1,b:1,name:"purple"},{h:85,s:0,b:1,name:"light pink"},{h:85,s:.5,b:.5,name:"purple"},{h:85,s:.5,b:1,name:"light fuchsia"},{h:85,s:1,b:.5,name:"dark fuchsia"},{h:85,s:1,b:1,name:"fuchsia"},{h:90,s:.5,b:.5,name:"dark fuchsia"},{h:90,s:.5,b:1,name:"hot pink"},{h:90,s:1,b:.5,name:"dark fuchsia"},{h:90,s:1,b:1,name:"fuchsia"},{h:95,s:0,b:1,name:"pink"},{h:95,s:.5,b:1,name:"light pink"},{h:95,s:1,b:.5,name:"dark magenta"},{h:95,s:1,b:1,name:"magenta"}];n.default.prototype._rgbColorName=function(e){var t=o.default._rgbaToHSBA(e);return function(e){var t;if(0!==e[0]){e[0]=Math.round(100*e[0]);var r=e[0].toString().split(""),n=r.length-1;r[n]=parseInt(r[n]),r[n]<2.5?r[n]=0:2.5<=r[n]&&r[n]<7.5&&(r[n]=5),2===r.length?(r[0]=parseInt(r[0]),7.5<=r[n]&&(r[n]=0,r[0]=r[0]+1),e[0]=10*r[0]+r[1]):7.5<=r[n]?e[0]=10:e[0]=r[n]}e[2]=e[2]/255;for(var o=e.length-1;1<=o;o--)e[o]<=.25?e[o]=0:.25<e[o]&&e[o]<.75?e[o]=.5:e[o]=1;if(0===e[0]&&0===e[1]&&1===e[2]){for(var i=2;0<=i;i--)l[i]=Math.round(1e4*l[i])/1e4;for(var a=0;a<u.length;a++){if(u[a].h===l[0]&&u[a].s===l[1]&&u[a].b===l[2]){t=u[a].name;break}t="white"}}else for(var s=0;s<c.length;s++)if(c[s].h===e[0]&&c[s].s===e[1]&&c[s].b===e[2]){t=c[s].name;break}return t}([(l=t)[0],t[1],t[2]])};var a=n.default;r.default=a},{"../color/color_conversion":246,"../core/main":260,"core-js/modules/es.function.name":163,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.split":188}],241:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.ends-with"),e("core-js/modules/es.string.replace"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,a=(n=e("../core/main"))&&n.__esModule?n:{default:n};var l="_Description",u="_fallbackDesc",c="_fallbackTable",d="_Label",f="_labelDesc",h="_labelTable";function s(e){if("label"===e||"fallback"===e)throw new Error("description should not be LABEL or FALLBACK");return e.endsWith(".")||e.endsWith(";")||e.endsWith(",")||e.endsWith("?")||e.endsWith("!")||(e+="."),e}a.default.prototype.describe=function(e,t){if(a.default._validateParameters("describe",arguments),"string"==typeof e){var r=this.canvas.id;e=s(e),this.dummyDOM||(this.dummyDOM=document.getElementById(r).parentNode),this.descriptions||(this.descriptions={}),this.descriptions.fallback?this.descriptions.fallback.innerHTML!==e&&(this.descriptions.fallback.innerHTML=e):this._describeHTML("fallback",e),t===this.LABEL&&(this.descriptions.label?this.descriptions.label.innerHTML!==e&&(this.descriptions.label.innerHTML=e):this._describeHTML("label",e))}},a.default.prototype.describeElement=function(e,t,r){if(a.default._validateParameters("describeElement",arguments),"string"==typeof t&&"string"==typeof e){var n=this.canvas.id;t=s(t);var o=function(e){if("label"===e||"fallback"===e)throw new Error("element name should not be LABEL or FALLBACK");e.endsWith(".")||e.endsWith(";")||e.endsWith(",")?e=e.replace(/.$/,":"):e.endsWith(":")||(e+=":");return e}(e);e=e.replace(/[^a-zA-Z0-9 ]/g,"");var i='<th scope="row">'.concat(o,"</th><td>").concat(t,"</td>");this.dummyDOM||(this.dummyDOM=document.getElementById(n).parentNode),this.descriptions?this.descriptions.fallbackElements||(this.descriptions.fallbackElements={}):this.descriptions={fallbackElements:{}},this.descriptions.fallbackElements[e]?this.descriptions.fallbackElements[e].innerHTML!==i&&(this.descriptions.fallbackElements[e].innerHTML=i):this._describeElementHTML("fallback",e,i),r===this.LABEL&&(this.descriptions.labelElements||(this.descriptions.labelElements={}),this.descriptions.labelElements[e]?this.descriptions.labelElements[e].innerHTML!==i&&(this.descriptions.labelElements[e].innerHTML=i):this._describeElementHTML("label",e,i))}},a.default.prototype._describeHTML=function(e,t){var r=this.canvas.id;if("fallback"===e){if(this.dummyDOM.querySelector("#".concat(r+l)))this.dummyDOM.querySelector("#"+r+c).insertAdjacentHTML("beforebegin",'<p id="'.concat(r+u,'"></p>'));else{var n='<div id="'.concat(r).concat(l,'" role="region" aria-label="Canvas Description"><p id="').concat(r).concat(u,'"></p></div>');this.dummyDOM.querySelector("#".concat(r,"accessibleOutput"))?this.dummyDOM.querySelector("#".concat(r,"accessibleOutput")).insertAdjacentHTML("beforebegin",n):this.dummyDOM.querySelector("#".concat(r)).innerHTML=n}return this.descriptions.fallback=this.dummyDOM.querySelector("#".concat(r).concat(u)),void(this.descriptions.fallback.innerHTML=t)}if("label"===e){if(this.dummyDOM.querySelector("#".concat(r+d)))this.dummyDOM.querySelector("#".concat(r+h))&&this.dummyDOM.querySelector("#".concat(r+h)).insertAdjacentHTML("beforebegin",'<p id="'.concat(r).concat(f,'"></p>'));else{var o='<div id="'.concat(r).concat(d,'" class="p5Label"><p id="').concat(r).concat(f,'"></p></div>');this.dummyDOM.querySelector("#".concat(r,"accessibleOutputLabel"))?this.dummyDOM.querySelector("#".concat(r,"accessibleOutputLabel")).insertAdjacentHTML("beforebegin",o):this.dummyDOM.querySelector("#"+r).insertAdjacentHTML("afterend",o)}return this.descriptions.label=this.dummyDOM.querySelector("#"+r+f),void(this.descriptions.label.innerHTML=t)}},a.default.prototype._describeElementHTML=function(e,t,r){var n=this.canvas.id;if("fallback"===e){if(this.dummyDOM.querySelector("#".concat(n+l)))this.dummyDOM.querySelector("#"+n+c)||this.dummyDOM.querySelector("#"+n+u).insertAdjacentHTML("afterend",'<table id="'.concat(n).concat(c,'"><caption>Canvas elements and their descriptions</caption></table>'));else{var o='<div id="'.concat(n).concat(l,'" role="region" aria-label="Canvas Description"><table id="').concat(n).concat(c,'"><caption>Canvas elements and their descriptions</caption></table></div>');this.dummyDOM.querySelector("#".concat(n,"accessibleOutput"))?this.dummyDOM.querySelector("#".concat(n,"accessibleOutput")).insertAdjacentHTML("beforebegin",o):this.dummyDOM.querySelector("#"+n).innerHTML=o}var i=document.createElement("tr");return i.id=n+"_fte_"+t,this.dummyDOM.querySelector("#"+n+c).appendChild(i),this.descriptions.fallbackElements[t]=this.dummyDOM.querySelector("#".concat(n).concat("_fte_").concat(t)),void(this.descriptions.fallbackElements[t].innerHTML=r)}if("label"===e){if(this.dummyDOM.querySelector("#".concat(n+d)))this.dummyDOM.querySelector("#".concat(n+h))||this.dummyDOM.querySelector("#"+n+f).insertAdjacentHTML("afterend",'<table id="'.concat(n+h,'"></table>'));else{var a='<div id="'.concat(n).concat(d,'" class="p5Label"><table id="').concat(n).concat(h,'"></table></div>');this.dummyDOM.querySelector("#".concat(n,"accessibleOutputLabel"))?this.dummyDOM.querySelector("#".concat(n,"accessibleOutputLabel")).insertAdjacentHTML("beforebegin",a):this.dummyDOM.querySelector("#"+n).insertAdjacentHTML("afterend",a)}var s=document.createElement("tr");s.id=n+"_lte_"+t,this.dummyDOM.querySelector("#"+n+h).appendChild(s),this.descriptions.labelElements[t]=this.dummyDOM.querySelector("#".concat(n).concat("_lte_").concat(t)),this.descriptions.labelElements[t].innerHTML=r}};var o=a.default;r.default=o},{"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.ends-with":181,"core-js/modules/es.string.replace":186}],242:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.map"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype._updateGridOutput=function(e){if(this.dummyDOM.querySelector("#".concat(e,"_summary"))){var t=this._accessibleOutputs[e],r=function(e,t){var r="",n="",o=0;for(var i in t){var a=0;for(var s in t[i]){var l='<li id="'.concat(e,"shape").concat(o,'">').concat(t[i][s].color," ").concat(i,",");"line"===i?l+=" location = ".concat(t[i][s].pos,", length = ").concat(t[i][s].length," pixels"):(l+=" location = ".concat(t[i][s].pos),"point"!==i&&(l+=", area = ".concat(t[i][s].area," %")),l+="</li>"),r+=l,a++,o++}n=1<a?"".concat(n," ").concat(a," ").concat(i,"s"):"".concat(n," ").concat(a," ").concat(i)}return{numShapes:[o,n],details:r}}(e,this.ingredients.shapes),n=function(e,t,r,n){var o="".concat(t," canvas, ").concat(r," by ").concat(n," pixels, contains ").concat(e[0]);o=1===e[0]?"".concat(o," shape: ").concat(e[1]):"".concat(o," shapes: ").concat(e[1]);return o}(r.numShapes,this.ingredients.colors.background,this.width,this.height),o=function(e,t){var r=0,n="",o=Array.apply(null,Array(10)).map(function(){});for(var i in o)o[i]=Array.apply(null,Array(10)).map(function(){});for(var a in t)for(var s in t[a]){var l=void 0;l="line"!==a?'<a href="#'.concat(e,"shape").concat(r,'">').concat(t[a][s].color," ").concat(a,"</a>"):'<a href="#'.concat(e,"shape").concat(r,'">').concat(t[a][s].color," ").concat(a," midpoint</a>"),o[t[a][s].loc.locY][t[a][s].loc.locX]?o[t[a][s].loc.locY][t[a][s].loc.locX]=o[t[a][s].loc.locY][t[a][s].loc.locX]+"  "+l:o[t[a][s].loc.locY][t[a][s].loc.locX]=l,r++}for(var u in o){var c="<tr>";for(var d in o[u])c+="<td>",void 0!==o[u][d]&&(c+=o[u][d]),c+="</td>";n=n+c+"</tr>"}return n}(e,this.ingredients.shapes);n!==t.summary.innerHTML&&(t.summary.innerHTML=n),o!==t.map.innerHTML&&(t.map.innerHTML=o),r.details!==t.shapeDetails.innerHTML&&(t.shapeDetails.innerHTML=r.details),this._accessibleOutputs[e]=t}};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.map":159}],243:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.fill"),e("core-js/modules/es.array.map"),e("core-js/modules/es.number.to-fixed"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};function l(e,t,r){return e[0]<.4*t?e[1]<.4*r?"top left":e[1]>.6*r?"bottom left":"mid left":e[0]>.6*t?e[1]<.4*r?"top right":e[1]>.6*r?"bottom right":"mid right":e[1]<.4*r?"top middle":e[1]>.6*r?"bottom middle":"middle"}function u(e,t,r){var n=Math.floor(e[0]/t*10),o=Math.floor(e[1]/r*10);return 10===n&&--n,10===o&&--o,{locX:n,locY:o}}o.default.prototype.textOutput=function(e){o.default._validateParameters("textOutput",arguments),this._accessibleOutputs.text||(this._accessibleOutputs.text=!0,this._createOutput("textOutput","Fallback"),e===this.LABEL&&(this._accessibleOutputs.textLabel=!0,this._createOutput("textOutput","Label")))},o.default.prototype.gridOutput=function(e){o.default._validateParameters("gridOutput",arguments),this._accessibleOutputs.grid||(this._accessibleOutputs.grid=!0,this._createOutput("gridOutput","Fallback"),e===this.LABEL&&(this._accessibleOutputs.gridLabel=!0,this._createOutput("gridOutput","Label")))},o.default.prototype._addAccsOutput=function(){return this._accessibleOutputs||(this._accessibleOutputs={text:!1,grid:!1,textLabel:!1,gridLabel:!1}),this._accessibleOutputs.grid||this._accessibleOutputs.text},o.default.prototype._createOutput=function(e,t){var r,n,o,i=this.canvas.id;this.ingredients||(this.ingredients={shapes:{},colors:{background:"white",fill:"white",stroke:"black"},pShapes:""}),this.dummyDOM||(this.dummyDOM=document.getElementById(i).parentNode);var a="";"Fallback"===t?(r=i+e,n=i+"accessibleOutput",this.dummyDOM.querySelector("#".concat(n))||(this.dummyDOM.querySelector("#".concat(i,"_Description"))?this.dummyDOM.querySelector("#".concat(i,"_Description")).insertAdjacentHTML("afterend",'<div id="'.concat(n,'" role="region" aria-label="Canvas Outputs"></div>')):this.dummyDOM.querySelector("#".concat(i)).innerHTML='<div id="'.concat(n,'" role="region" aria-label="Canvas Outputs"></div>'))):"Label"===t&&(r=i+e+(a=t),n=i+"accessibleOutput"+t,this.dummyDOM.querySelector("#".concat(n))||(this.dummyDOM.querySelector("#".concat(i,"_Label"))?this.dummyDOM.querySelector("#".concat(i,"_Label")).insertAdjacentHTML("afterend",'<div id="'.concat(n,'"></div>')):this.dummyDOM.querySelector("#".concat(i)).insertAdjacentHTML("afterend",'<div id="'.concat(n,'"></div>')))),this._accessibleOutputs[r]={},"textOutput"===e?(a="#".concat(i,"gridOutput").concat(a),o='<div id="'.concat(r,'">Text Output<div id="').concat(r,'Summary" aria-label="text output summary"><p id="').concat(r,'_summary"></p><ul id="').concat(r,'_list"></ul></div><table id="').concat(r,'_shapeDetails" summary="text output shape details"></table></div>'),this.dummyDOM.querySelector(a)?this.dummyDOM.querySelector(a).insertAdjacentHTML("beforebegin",o):this.dummyDOM.querySelector("#".concat(n)).innerHTML=o,this._accessibleOutputs[r].list=this.dummyDOM.querySelector("#".concat(r,"_list"))):"gridOutput"===e&&(a="#".concat(i,"textOutput").concat(a),o='<div id="'.concat(r,'">Grid Output<p id="').concat(r,'_summary" aria-label="grid output summary"><table id="').concat(r,'_map" summary="grid output content"></table><ul id="').concat(r,'_shapeDetails" aria-label="grid output shape details"></ul></div>'),this.dummyDOM.querySelector(a)?this.dummyDOM.querySelector(a).insertAdjacentHTML("afterend",o):this.dummyDOM.querySelector("#".concat(n)).innerHTML=o,this._accessibleOutputs[r].map=this.dummyDOM.querySelector("#".concat(r,"_map"))),this._accessibleOutputs[r].shapeDetails=this.dummyDOM.querySelector("#".concat(r,"_shapeDetails")),this._accessibleOutputs[r].summary=this.dummyDOM.querySelector("#".concat(r,"_summary"))},o.default.prototype._updateAccsOutput=function(){var e=this.canvas.id;JSON.stringify(this.ingredients.shapes)!==this.ingredients.pShapes&&(this.ingredients.pShapes=JSON.stringify(this.ingredients.shapes),this._accessibleOutputs.text&&this._updateTextOutput(e+"textOutput"),this._accessibleOutputs.grid&&this._updateGridOutput(e+"gridOutput"),this._accessibleOutputs.textLabel&&this._updateTextOutput(e+"textOutputLabel"),this._accessibleOutputs.gridLabel&&this._updateGridOutput(e+"gridOutputLabel"))},o.default.prototype._accsBackground=function(e){this.ingredients.pShapes=JSON.stringify(this.ingredients.shapes),this.ingredients.shapes={},this.ingredients.colors.backgroundRGBA!==e&&(this.ingredients.colors.backgroundRGBA=e,this.ingredients.colors.background=this._rgbColorName(e))},o.default.prototype._accsCanvasColors=function(e,t){"fill"===e?this.ingredients.colors.fillRGBA!==t&&(this.ingredients.colors.fillRGBA=t,this.ingredients.colors.fill=this._rgbColorName(t)):"stroke"===e&&this.ingredients.colors.strokeRGBA!==t&&(this.ingredients.colors.strokeRGBA=t,this.ingredients.colors.stroke=this._rgbColorName(t))},o.default.prototype._accsOutput=function(e,t){"ellipse"===e&&t[2]===t[3]?e="circle":"rectangle"===e&&t[2]===t[3]&&(e="square");var r={},n=!0,o=function(e,t){var r,n;n="rectangle"===e||"ellipse"===e||"arc"===e||"circle"===e||"square"===e?(r=Math.round(t[0]+t[2]/2),Math.round(t[1]+t[3]/2)):"triangle"===e?(r=(t[0]+t[2]+t[4])/3,(t[1]+t[3]+t[5])/3):"quadrilateral"===e?(r=(t[0]+t[2]+t[4]+t[6])/4,(t[1]+t[3]+t[5]+t[7])/4):"line"===e?(r=(t[0]+t[2])/2,(t[1]+t[3])/2):(r=t[0],t[1]);return[r,n]}(e,t);if("line"===e){r.color=this.ingredients.colors.stroke,r.length=Math.round(this.dist(t[0],t[1],t[2],t[3]));var i=l([t[0],[1]],this.width,this.height),a=l([t[2],[3]],this.width,this.height);r.loc=u(o,this.width,this.height),r.pos=i===a?"at ".concat(i):"from ".concat(i," to ").concat(a)}else"point"===e?r.color=this.ingredients.colors.stroke:(r.color=this.ingredients.colors.fill,r.area=function(e,t,r,n){var o=0;if("arc"===e){var i=((t[5]-t[4])%(2*Math.PI)+2*Math.PI)%(2*Math.PI);if(o=i*t[2]*t[3]/8,"open"===t[6]||"chord"===t[6]){var a=t[0],s=t[1],l=t[0]+t[2]/2*Math.cos(t[4]).toFixed(2),u=t[1]+t[3]/2*Math.sin(t[4]).toFixed(2),c=t[0]+t[2]/2*Math.cos(t[5]).toFixed(2),d=t[1]+t[3]/2*Math.sin(t[5]).toFixed(2),f=Math.abs(a*(u-d)+l*(d-s)+c*(s-u))/2;i>Math.PI?o+=f:o-=f}}else"ellipse"===e||"circle"===e?o=3.14*t[2]/2*t[3]/2:"line"===e?o=0:"point"===e?o=0:"quadrilateral"===e?o=Math.abs((t[6]+t[0])*(t[7]-t[1])+(t[0]+t[2])*(t[1]-t[3])+(t[2]+t[4])*(t[3]-t[5])+(t[4]+t[6])*(t[5]-t[7]))/2:"rectangle"===e||"square"===e?o=t[2]*t[3]:"triangle"===e&&(o=Math.abs(t[0]*(t[3]-t[5])+t[2]*(t[5]-t[1])+t[4]*(t[1]-t[3]))/2);return Math.round(100*o/(r*n))}(e,t,this.width,this.height)),r.pos=l(o,this.width,this.height),r.loc=u(o,this.width,this.height);if(this.ingredients.shapes[e]){if(this.ingredients.shapes[e]!==[r]){for(var s in this.ingredients.shapes[e])JSON.stringify(this.ingredients.shapes[e][s])===JSON.stringify(r)&&(n=!1);!0===n&&this.ingredients.shapes[e].push(r)}}else this.ingredients.shapes[e]=[r]};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.fill":150,"core-js/modules/es.array.map":159,"core-js/modules/es.number.to-fixed":169}],244:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype._updateTextOutput=function(e){if(this.dummyDOM.querySelector("#".concat(e,"_summary"))){var t=this._accessibleOutputs[e],r=function(e,t){var r="",n=0;for(var o in t)for(var i in t[o]){var a='<li><a href="#'.concat(e,"shape").concat(n,'">').concat(t[o][i].color," ").concat(o,"</a>");"line"===o?a+=", ".concat(t[o][i].pos,", ").concat(t[o][i].length," pixels long.</li>"):(a+=", at ".concat(t[o][i].pos),"point"!==o&&(a+=", covering ".concat(t[o][i].area,"% of the canvas")),a+=".</li>"),r+=a,n++}return{numShapes:n,listShapes:r}}(e,this.ingredients.shapes),n=function(e,t,r,n){var o="Your output is a, ".concat(r," by ").concat(n," pixels, ").concat(t," canvas containing the following");o=1===e?"".concat(o," shape:"):"".concat(o," ").concat(e," shapes:");return o}(r.numShapes,this.ingredients.colors.background,this.width,this.height),o=function(e,t){var r="",n=0;for(var o in t)for(var i in t[o]){var a='<tr id="'.concat(e,"shape").concat(n,'"><th>').concat(t[o][i].color," ").concat(o,"</th>");"line"===o?a+="<td>location = ".concat(t[o][i].pos,"</td><td>length = ").concat(t[o][i].length," pixels</td></tr>"):(a+="<td>location = ".concat(t[o][i].pos,"</td>"),"point"!==o&&(a+="<td> area = ".concat(t[o][i].area,"%</td>")),a+="</tr>"),r+=a,n++}return r}(e,this.ingredients.shapes);n!==t.summary.innerHTML&&(t.summary.innerHTML=n),r.listShapes!==t.list.innerHTML&&(t.list.innerHTML=r.listShapes),o!==t.shapeDetails.innerHTML&&(t.shapeDetails.innerHTML=o),this._accessibleOutputs[e]=t}};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.concat":148}],245:[function(e,t,r){"use strict";var n,o=(n=e("./core/main"))&&n.__esModule?n:{default:n};e("./core/constants"),e("./core/environment"),e("./core/friendly_errors/stacktrace"),e("./core/friendly_errors/validate_params"),e("./core/friendly_errors/file_errors"),e("./core/friendly_errors/fes_core"),e("./core/helpers"),e("./core/legacy"),e("./core/preload"),e("./core/p5.Element"),e("./core/p5.Graphics"),e("./core/p5.Renderer"),e("./core/p5.Renderer2D"),e("./core/rendering"),e("./core/shim"),e("./core/structure"),e("./core/transform"),e("./core/shape/2d_primitives"),e("./core/shape/attributes"),e("./core/shape/curves"),e("./core/shape/vertex"),e("./accessibility/outputs"),e("./accessibility/textOutput"),e("./accessibility/gridOutput"),e("./accessibility/color_namer"),e("./color/color_conversion"),e("./color/creating_reading"),e("./color/p5.Color"),e("./color/setting"),e("./data/p5.TypedDict"),e("./data/local_storage.js"),e("./dom/dom"),e("./accessibility/describe"),e("./events/acceleration"),e("./events/keyboard"),e("./events/mouse"),e("./events/touch"),e("./image/filters"),e("./image/image"),e("./image/loading_displaying"),e("./image/p5.Image"),e("./image/pixels"),e("./io/files"),e("./io/p5.Table"),e("./io/p5.TableRow"),e("./io/p5.XML"),e("./math/calculation"),e("./math/math"),e("./math/noise"),e("./math/p5.Vector"),e("./math/random"),e("./math/trigonometry"),e("./typography/attributes"),e("./typography/loading_displaying"),e("./typography/p5.Font"),e("./utilities/array_functions"),e("./utilities/conversion"),e("./utilities/string_functions"),e("./utilities/time_date"),e("./webgl/3d_primitives"),e("./webgl/interaction"),e("./webgl/light"),e("./webgl/loading"),e("./webgl/material"),e("./webgl/p5.Camera"),e("./webgl/p5.Geometry"),e("./webgl/p5.Matrix"),e("./webgl/p5.RendererGL.Immediate"),e("./webgl/p5.RendererGL"),e("./webgl/p5.RendererGL.Retained"),e("./webgl/p5.Shader"),e("./webgl/p5.RenderBuffer"),e("./webgl/p5.Texture"),e("./webgl/text"),e("./core/init"),t.exports=o.default},{"./accessibility/color_namer":240,"./accessibility/describe":241,"./accessibility/gridOutput":242,"./accessibility/outputs":243,"./accessibility/textOutput":244,"./color/color_conversion":246,"./color/creating_reading":247,"./color/p5.Color":248,"./color/setting":249,"./core/constants":250,"./core/environment":251,"./core/friendly_errors/fes_core":252,"./core/friendly_errors/file_errors":253,"./core/friendly_errors/stacktrace":254,"./core/friendly_errors/validate_params":255,"./core/helpers":256,"./core/init":257,"./core/legacy":259,"./core/main":260,"./core/p5.Element":261,"./core/p5.Graphics":262,"./core/p5.Renderer":263,"./core/p5.Renderer2D":264,"./core/preload":265,"./core/rendering":266,"./core/shape/2d_primitives":267,"./core/shape/attributes":268,"./core/shape/curves":269,"./core/shape/vertex":270,"./core/shim":271,"./core/structure":272,"./core/transform":273,"./data/local_storage.js":274,"./data/p5.TypedDict":275,"./dom/dom":276,"./events/acceleration":277,"./events/keyboard":278,"./events/mouse":279,"./events/touch":280,"./image/filters":281,"./image/image":282,"./image/loading_displaying":283,"./image/p5.Image":284,"./image/pixels":285,"./io/files":286,"./io/p5.Table":287,"./io/p5.TableRow":288,"./io/p5.XML":289,"./math/calculation":290,"./math/math":291,"./math/noise":292,"./math/p5.Vector":293,"./math/random":294,"./math/trigonometry":295,"./typography/attributes":296,"./typography/loading_displaying":297,"./typography/p5.Font":298,"./utilities/array_functions":299,"./utilities/conversion":300,"./utilities/string_functions":301,"./utilities/time_date":302,"./webgl/3d_primitives":303,"./webgl/interaction":304,"./webgl/light":305,"./webgl/loading":306,"./webgl/material":307,"./webgl/p5.Camera":308,"./webgl/p5.Geometry":309,"./webgl/p5.Matrix":310,"./webgl/p5.RenderBuffer":311,"./webgl/p5.RendererGL":314,"./webgl/p5.RendererGL.Immediate":312,"./webgl/p5.RendererGL.Retained":313,"./webgl/p5.Shader":315,"./webgl/p5.Texture":316,"./webgl/text":317}],246:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.ColorConversion={},o.default.ColorConversion._hsbaToHSLA=function(e){var t=e[0],r=e[1],n=e[2],o=(2-r)*n/2;return 0!=o&&(1==o?r=0:o<.5?r/=2-r:r=r*n/(2-2*o)),[t,r,o,e[3]]},o.default.ColorConversion._hsbaToRGBA=function(e){var t=6*e[0],r=e[1],n=e[2],o=[];if(0===r)o=[n,n,n,e[3]];else{var i,a,s,l=Math.floor(t),u=n*(1-r),c=n*(1-r*(t-l)),d=n*(1-r*(1+l-t));s=1===l?(i=c,a=n,u):2===l?(i=u,a=n,d):3===l?(i=u,a=c,n):4===l?(i=d,a=u,n):5===l?(i=n,a=u,c):(i=n,a=d,u),o=[i,a,s,e[3]]}return o},o.default.ColorConversion._hslaToHSBA=function(e){var t,r=e[0],n=e[1],o=e[2];return[r,n=2*((t=o<.5?(1+n)*o:o+n-o*n)-o)/t,t,e[3]]},o.default.ColorConversion._hslaToRGBA=function(e){var t=6*e[0],r=e[1],n=e[2],o=[];if(0===r)o=[n,n,n,e[3]];else{var i,a=2*n-(i=n<.5?(1+r)*n:n+r-n*r),s=function(e,t,r){return e<0?e+=6:6<=e&&(e-=6),e<1?t+(r-t)*e:e<3?r:e<4?t+(r-t)*(4-e):t};o=[s(2+t,a,i),s(t,a,i),s(t-2,a,i),e[3]]}return o},o.default.ColorConversion._rgbaToHSBA=function(e){var t,r,n=e[0],o=e[1],i=e[2],a=Math.max(n,o,i),s=a-Math.min(n,o,i);return 0==s?r=t=0:(r=s/a,n===a?t=(o-i)/s:o===a?t=2+(i-n)/s:i===a&&(t=4+(n-o)/s),t<0?t+=6:6<=t&&(t-=6)),[t/6,r,a,e[3]]},o.default.ColorConversion._rgbaToHSLA=function(e){var t,r,n=e[0],o=e[1],i=e[2],a=Math.max(n,o,i),s=Math.min(n,o,i),l=a+s,u=a-s;return 0==u?r=t=0:(r=l<1?u/l:u/(2-l),n===a?t=(o-i)/u:o===a?t=2+(i-n)/u:i===a&&(t=4+(n-o)/u),t<0?t+=6:6<=t&&(t-=6)),[t/6,r,l/2,e[3]]};var i=o.default.ColorConversion;r.default=i},{"../core/main":260}],247:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.map"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,d=(n=e("../core/main"))&&n.__esModule?n:{default:n},f=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}e("./p5.Color"),e("../core/friendly_errors/validate_params"),e("../core/friendly_errors/file_errors"),e("../core/friendly_errors/fes_core"),d.default.prototype.alpha=function(e){return d.default._validateParameters("alpha",arguments),this.color(e)._getAlpha()},d.default.prototype.blue=function(e){return d.default._validateParameters("blue",arguments),this.color(e)._getBlue()},d.default.prototype.brightness=function(e){return d.default._validateParameters("brightness",arguments),this.color(e)._getBrightness()},d.default.prototype.color=function(){if(d.default._validateParameters("color",arguments),arguments[0]instanceof d.default.Color)return arguments[0];var e=arguments[0]instanceof Array?arguments[0]:arguments;return new d.default.Color(this,e)},d.default.prototype.green=function(e){return d.default._validateParameters("green",arguments),this.color(e)._getGreen()},d.default.prototype.hue=function(e){return d.default._validateParameters("hue",arguments),this.color(e)._getHue()},d.default.prototype.lerpColor=function(e,t,r){d.default._validateParameters("lerpColor",arguments);var n,o,i,a,s,l,u=this._colorMode,c=this._colorMaxes;if(u===f.RGB)s=e.levels.map(function(e){return e/255}),l=t.levels.map(function(e){return e/255});else if(u===f.HSB)e._getBrightness(),t._getBrightness(),s=e.hsba,l=t.hsba;else{if(u!==f.HSL)throw new Error("".concat(u,"cannot be used for interpolation."));e._getLightness(),t._getLightness(),s=e.hsla,l=t.hsla}return r=Math.max(Math.min(r,1),0),void 0===this.lerp&&(this.lerp=function(e,t,r){return r*(t-e)+e}),n=this.lerp(s[0],l[0],r),o=this.lerp(s[1],l[1],r),i=this.lerp(s[2],l[2],r),a=this.lerp(s[3],l[3],r),n*=c[u][0],o*=c[u][1],i*=c[u][2],a*=c[u][3],this.color(n,o,i,a)},d.default.prototype.lightness=function(e){return d.default._validateParameters("lightness",arguments),this.color(e)._getLightness()},d.default.prototype.red=function(e){return d.default._validateParameters("red",arguments),this.color(e)._getRed()},d.default.prototype.saturation=function(e){return d.default._validateParameters("saturation",arguments),this.color(e)._getSaturation()};var o=d.default;r.default=o},{"../core/constants":250,"../core/friendly_errors/fes_core":252,"../core/friendly_errors/file_errors":253,"../core/friendly_errors/validate_params":255,"../core/main":260,"./p5.Color":248,"core-js/modules/es.array.map":159}],248:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.join"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.constructor"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.trim"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=n(e("../core/main")),f=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants")),h=n(e("./color_conversion"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function n(e){return e&&e.__esModule?e:{default:e}}d.default.Color=function(e,t){if(this._storeModeAndMaxes(e._colorMode,e._colorMaxes),this.mode!==f.RGB&&this.mode!==f.HSL&&this.mode!==f.HSB)throw new Error("".concat(this.mode," is an invalid colorMode."));return this._array=d.default.Color._parseInputs.apply(this,t),this._calculateLevels(),this},d.default.Color.prototype.toString=function(e){var t=this.levels,r=this._array,n=r[3];switch(e){case"#rrggbb":return"#".concat(t[0]<16?"0".concat(t[0].toString(16)):t[0].toString(16),t[1]<16?"0".concat(t[1].toString(16)):t[1].toString(16),t[2]<16?"0".concat(t[2].toString(16)):t[2].toString(16));case"#rrggbbaa":return"#".concat(t[0]<16?"0".concat(t[0].toString(16)):t[0].toString(16),t[1]<16?"0".concat(t[1].toString(16)):t[1].toString(16),t[2]<16?"0".concat(t[2].toString(16)):t[2].toString(16),t[3]<16?"0".concat(t[3].toString(16)):t[3].toString(16));case"#rgb":return"#".concat(Math.round(15*r[0]).toString(16),Math.round(15*r[1]).toString(16),Math.round(15*r[2]).toString(16));case"#rgba":return"#".concat(Math.round(15*r[0]).toString(16),Math.round(15*r[1]).toString(16),Math.round(15*r[2]).toString(16),Math.round(15*r[3]).toString(16));case"rgb":return"rgb(".concat(t[0],", ",t[1],", ",t[2],")");case"rgb%":return"rgb(".concat((100*r[0]).toPrecision(3),"%, ",(100*r[1]).toPrecision(3),"%, ",(100*r[2]).toPrecision(3),"%)");case"rgba%":return"rgba(".concat((100*r[0]).toPrecision(3),"%, ",(100*r[1]).toPrecision(3),"%, ",(100*r[2]).toPrecision(3),"%, ",(100*r[3]).toPrecision(3),"%)");case"hsb":case"hsv":return this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),"hsb(".concat(this.hsba[0]*this.maxes[f.HSB][0],", ",this.hsba[1]*this.maxes[f.HSB][1],", ",this.hsba[2]*this.maxes[f.HSB][2],")");case"hsb%":case"hsv%":return this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),"hsb(".concat((100*this.hsba[0]).toPrecision(3),"%, ",(100*this.hsba[1]).toPrecision(3),"%, ",(100*this.hsba[2]).toPrecision(3),"%)");case"hsba":case"hsva":return this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),"hsba(".concat(this.hsba[0]*this.maxes[f.HSB][0],", ",this.hsba[1]*this.maxes[f.HSB][1],", ",this.hsba[2]*this.maxes[f.HSB][2],", ",n,")");case"hsba%":case"hsva%":return this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),"hsba(".concat((100*this.hsba[0]).toPrecision(3),"%, ",(100*this.hsba[1]).toPrecision(3),"%, ",(100*this.hsba[2]).toPrecision(3),"%, ",(100*n).toPrecision(3),"%)");case"hsl":return this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),"hsl(".concat(this.hsla[0]*this.maxes[f.HSL][0],", ",this.hsla[1]*this.maxes[f.HSL][1],", ",this.hsla[2]*this.maxes[f.HSL][2],")");case"hsl%":return this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),"hsl(".concat((100*this.hsla[0]).toPrecision(3),"%, ",(100*this.hsla[1]).toPrecision(3),"%, ",(100*this.hsla[2]).toPrecision(3),"%)");case"hsla":return this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),"hsla(".concat(this.hsla[0]*this.maxes[f.HSL][0],", ",this.hsla[1]*this.maxes[f.HSL][1],", ",this.hsla[2]*this.maxes[f.HSL][2],", ",n,")");case"hsla%":return this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),"hsl(".concat((100*this.hsla[0]).toPrecision(3),"%, ",(100*this.hsla[1]).toPrecision(3),"%, ",(100*this.hsla[2]).toPrecision(3),"%, ",(100*n).toPrecision(3),"%)");case"rgba":default:return"rgba(".concat(t[0],",",t[1],",",t[2],",",n,")")}},d.default.Color.prototype.setRed=function(e){this._array[0]=e/this.maxes[f.RGB][0],this._calculateLevels()},d.default.Color.prototype.setGreen=function(e){this._array[1]=e/this.maxes[f.RGB][1],this._calculateLevels()},d.default.Color.prototype.setBlue=function(e){this._array[2]=e/this.maxes[f.RGB][2],this._calculateLevels()},d.default.Color.prototype.setAlpha=function(e){this._array[3]=e/this.maxes[this.mode][3],this._calculateLevels()},d.default.Color.prototype._calculateLevels=function(){for(var e=this._array,t=this.levels=new Array(e.length),r=e.length-1;0<=r;--r)t[r]=Math.round(255*e[r])},d.default.Color.prototype._getAlpha=function(){return this._array[3]*this.maxes[this.mode][3]},d.default.Color.prototype._storeModeAndMaxes=function(e,t){this.mode=e,this.maxes=t},d.default.Color.prototype._getMode=function(){return this.mode},d.default.Color.prototype._getMaxes=function(){return this.maxes},d.default.Color.prototype._getBlue=function(){return this._array[2]*this.maxes[f.RGB][2]},d.default.Color.prototype._getBrightness=function(){return this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),this.hsba[2]*this.maxes[f.HSB][2]},d.default.Color.prototype._getGreen=function(){return this._array[1]*this.maxes[f.RGB][1]},d.default.Color.prototype._getHue=function(){return this.mode===f.HSB?(this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),this.hsba[0]*this.maxes[f.HSB][0]):(this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),this.hsla[0]*this.maxes[f.HSL][0])},d.default.Color.prototype._getLightness=function(){return this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),this.hsla[2]*this.maxes[f.HSL][2]},d.default.Color.prototype._getRed=function(){return this._array[0]*this.maxes[f.RGB][0]},d.default.Color.prototype._getSaturation=function(){return this.mode===f.HSB?(this.hsba||(this.hsba=h.default._rgbaToHSBA(this._array)),this.hsba[1]*this.maxes[f.HSB][1]):(this.hsla||(this.hsla=h.default._rgbaToHSLA(this._array)),this.hsla[1]*this.maxes[f.HSL][1])};var p={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},o=/\s*/,i=/(\d{1,3})/,l=/((?:\d+(?:\.\d+)?)|(?:\.\d+))/,u=new RegExp("".concat(l.source,"%")),y={HEX3:/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX4:/^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])$/i,HEX6:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,HEX8:/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i,RGB:new RegExp(["^rgb\\(",i.source,",",i.source,",",i.source,"\\)$"].join(o.source),"i"),RGB_PERCENT:new RegExp(["^rgb\\(",u.source,",",u.source,",",u.source,"\\)$"].join(o.source),"i"),RGBA:new RegExp(["^rgba\\(",i.source,",",i.source,",",i.source,",",l.source,"\\)$"].join(o.source),"i"),RGBA_PERCENT:new RegExp(["^rgba\\(",u.source,",",u.source,",",u.source,",",l.source,"\\)$"].join(o.source),"i"),HSL:new RegExp(["^hsl\\(",i.source,",",u.source,",",u.source,"\\)$"].join(o.source),"i"),HSLA:new RegExp(["^hsla\\(",i.source,",",u.source,",",u.source,",",l.source,"\\)$"].join(o.source),"i"),HSB:new RegExp(["^hsb\\(",i.source,",",u.source,",",u.source,"\\)$"].join(o.source),"i"),HSBA:new RegExp(["^hsba\\(",i.source,",",u.source,",",u.source,",",l.source,"\\)$"].join(o.source),"i")};d.default.Color._parseInputs=function(e,t,r,n){var o,i=arguments.length,a=this.mode,s=this.maxes[a],l=[];if(3<=i){for(l[0]=e/s[0],l[1]=t/s[1],l[2]=r/s[2],l[3]="number"==typeof n?n/s[3]:1,o=l.length-1;0<=o;--o){var u=l[o];u<0?l[o]=0:1<u&&(l[o]=1)}return a===f.HSL?h.default._hslaToRGBA(l):a===f.HSB?h.default._hsbaToRGBA(l):l}if(1===i&&"string"==typeof e){var c=e.trim().toLowerCase();if(p[c])return d.default.Color._parseInputs.call(this,p[c]);if(y.HEX3.test(c))return(l=y.HEX3.exec(c).slice(1).map(function(e){return parseInt(e+e,16)/255}))[3]=1,l;if(y.HEX6.test(c))return(l=y.HEX6.exec(c).slice(1).map(function(e){return parseInt(e,16)/255}))[3]=1,l;if(y.HEX4.test(c))return l=y.HEX4.exec(c).slice(1).map(function(e){return parseInt(e+e,16)/255});if(y.HEX8.test(c))return l=y.HEX8.exec(c).slice(1).map(function(e){return parseInt(e,16)/255});if(y.RGB.test(c))return(l=y.RGB.exec(c).slice(1).map(function(e){return e/255}))[3]=1,l;if(y.RGB_PERCENT.test(c))return(l=y.RGB_PERCENT.exec(c).slice(1).map(function(e){return parseFloat(e)/100}))[3]=1,l;if(y.RGBA.test(c))return l=y.RGBA.exec(c).slice(1).map(function(e,t){return 3===t?parseFloat(e):e/255});if(y.RGBA_PERCENT.test(c))return l=y.RGBA_PERCENT.exec(c).slice(1).map(function(e,t){return 3===t?parseFloat(e):parseFloat(e)/100});if(y.HSL.test(c)?(l=y.HSL.exec(c).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:parseInt(e,10)/100}))[3]=1:y.HSLA.test(c)&&(l=y.HSLA.exec(c).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:3===t?parseFloat(e):parseInt(e,10)/100})),(l=l.map(function(e){return Math.max(Math.min(e,1),0)})).length)return h.default._hslaToRGBA(l);if(y.HSB.test(c)?(l=y.HSB.exec(c).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:parseInt(e,10)/100}))[3]=1:y.HSBA.test(c)&&(l=y.HSBA.exec(c).slice(1).map(function(e,t){return 0===t?parseInt(e,10)/360:3===t?parseFloat(e):parseInt(e,10)/100})),l.length){for(o=l.length-1;0<=o;--o)l[o]=Math.max(Math.min(l[o],1),0);return h.default._hsbaToRGBA(l)}l=[1,1,1,1]}else{if(1!==i&&2!==i||"number"!=typeof e)throw new Error("".concat(arguments,"is not a valid color representation."));l[0]=e/s[2],l[1]=e/s[2],l[2]=e/s[2],l[3]="number"==typeof t?t/s[3]:1,l=l.map(function(e){return Math.max(Math.min(e,1),0)})}return l};var c=d.default.Color;r.default=c},{"../core/constants":250,"../core/main":260,"./color_conversion":246,"core-js/modules/es.array.join":157,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.constructor":177,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.trim":190}],249:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.fill"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("../core/main"))&&n.__esModule?n:{default:n},l=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}e("./p5.Color"),s.default.prototype.background=function(){var e;return(e=this._renderer).background.apply(e,arguments),this},s.default.prototype.clear=function(){return this._renderer.clear(),this},s.default.prototype.colorMode=function(e,t,r,n,o){if(s.default._validateParameters("colorMode",arguments),e===l.RGB||e===l.HSB||e===l.HSL){this._colorMode=e;var i=this._colorMaxes[e];2===arguments.length?(i[0]=t,i[1]=t,i[2]=t,i[3]=t):4===arguments.length?(i[0]=t,i[1]=r,i[2]=n):5===arguments.length&&(i[0]=t,i[1]=r,i[2]=n,i[3]=o)}return this},s.default.prototype.fill=function(){var e;return this._renderer._setProperty("_fillSet",!0),this._renderer._setProperty("_doFill",!0),(e=this._renderer).fill.apply(e,arguments),this},s.default.prototype.noFill=function(){return this._renderer._setProperty("_doFill",!1),this},s.default.prototype.noStroke=function(){return this._renderer._setProperty("_doStroke",!1),this},s.default.prototype.stroke=function(){var e;return this._renderer._setProperty("_strokeSet",!0),this._renderer._setProperty("_doStroke",!0),(e=this._renderer).stroke.apply(e,arguments),this},s.default.prototype.erase=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:255,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:255;return this._renderer.erase(e,t),this},s.default.prototype.noErase=function(){return this._renderer.noErase(),this};var o=s.default;r.default=o},{"../core/constants":250,"../core/main":260,"./p5.Color":248,"core-js/modules/es.array.fill":150}],250:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.STROKE=r.CURVE=r.BEZIER=r.QUADRATIC=r.LINEAR=r._CTX_MIDDLE=r._DEFAULT_LEADMULT=r._DEFAULT_TEXT_FILL=r.BOLDITALIC=r.BOLD=r.ITALIC=r.NORMAL=r.BLUR=r.ERODE=r.DILATE=r.POSTERIZE=r.INVERT=r.OPAQUE=r.GRAY=r.THRESHOLD=r.BURN=r.DODGE=r.SOFT_LIGHT=r.HARD_LIGHT=r.OVERLAY=r.REPLACE=r.SCREEN=r.MULTIPLY=r.EXCLUSION=r.SUBTRACT=r.DIFFERENCE=r.LIGHTEST=r.DARKEST=r.ADD=r.REMOVE=r.BLEND=r.UP_ARROW=r.TAB=r.SHIFT=r.RIGHT_ARROW=r.RETURN=r.OPTION=r.LEFT_ARROW=r.ESCAPE=r.ENTER=r.DOWN_ARROW=r.DELETE=r.CONTROL=r.BACKSPACE=r.ALT=r.AUTO=r.HSL=r.HSB=r.RGB=r.MITER=r.BEVEL=r.ROUND=r.SQUARE=r.PROJECT=r.PIE=r.CHORD=r.OPEN=r.CLOSE=r.TESS=r.QUAD_STRIP=r.QUADS=r.TRIANGLE_STRIP=r.TRIANGLE_FAN=r.TRIANGLES=r.LINE_LOOP=r.LINE_STRIP=r.LINES=r.POINTS=r.BASELINE=r.BOTTOM=r.TOP=r.CENTER=r.LEFT=r.RIGHT=r.RADIUS=r.CORNERS=r.CORNER=r.RAD_TO_DEG=r.DEG_TO_RAD=r.RADIANS=r.DEGREES=r.TWO_PI=r.TAU=r.QUARTER_PI=r.PI=r.HALF_PI=r.WAIT=r.TEXT=r.MOVE=r.HAND=r.CROSS=r.ARROW=r.WEBGL=r.P2D=r.VERSION=void 0,r.FALLBACK=r.LABEL=r.AXES=r.GRID=r._DEFAULT_FILL=r._DEFAULT_STROKE=r.PORTRAIT=r.LANDSCAPE=r.MIRROR=r.CLAMP=r.REPEAT=r.NEAREST=r.IMAGE=r.IMMEDIATE=r.TEXTURE=r.FILL=void 0;var n=Math.PI;r.VERSION="1.3.1";r.P2D="p2d";r.WEBGL="webgl";r.ARROW="default";r.CROSS="crosshair";r.HAND="pointer";r.MOVE="move";r.TEXT="text";r.WAIT="wait";var o=n/2;r.HALF_PI=o;var i=n;r.PI=i;var a=n/4;r.QUARTER_PI=a;var s=2*n;r.TAU=s;var l=2*n;r.TWO_PI=l;r.DEGREES="degrees";r.RADIANS="radians";var u=n/180;r.DEG_TO_RAD=u;var c=180/n;r.RAD_TO_DEG=c;r.CORNER="corner";r.CORNERS="corners";r.RADIUS="radius";r.RIGHT="right";r.LEFT="left";r.CENTER="center";r.TOP="top";r.BOTTOM="bottom";r.BASELINE="alphabetic";r.POINTS=0;r.LINES=1;r.LINE_STRIP=3;r.LINE_LOOP=2;r.TRIANGLES=4;r.TRIANGLE_FAN=6;r.TRIANGLE_STRIP=5;r.QUADS="quads";r.QUAD_STRIP="quad_strip";r.TESS="tess";r.CLOSE="close";r.OPEN="open";r.CHORD="chord";r.PIE="pie";r.PROJECT="square";r.SQUARE="butt";r.ROUND="round";r.BEVEL="bevel";r.MITER="miter";r.RGB="rgb";r.HSB="hsb";r.HSL="hsl";r.AUTO="auto";r.ALT=18;r.BACKSPACE=8;r.CONTROL=17;r.DELETE=46;r.DOWN_ARROW=40;r.ENTER=13;r.ESCAPE=27;r.LEFT_ARROW=37;r.OPTION=18;r.RETURN=13;r.RIGHT_ARROW=39;r.SHIFT=16;r.TAB=9;r.UP_ARROW=38;r.BLEND="source-over";r.REMOVE="destination-out";r.ADD="lighter";r.DARKEST="darken";r.LIGHTEST="lighten";r.DIFFERENCE="difference";r.SUBTRACT="subtract";r.EXCLUSION="exclusion";r.MULTIPLY="multiply";r.SCREEN="screen";r.REPLACE="copy";r.OVERLAY="overlay";r.HARD_LIGHT="hard-light";r.SOFT_LIGHT="soft-light";r.DODGE="color-dodge";r.BURN="color-burn";r.THRESHOLD="threshold";r.GRAY="gray";r.OPAQUE="opaque";r.INVERT="invert";r.POSTERIZE="posterize";r.DILATE="dilate";r.ERODE="erode";r.BLUR="blur";r.NORMAL="normal";r.ITALIC="italic";r.BOLD="bold";r.BOLDITALIC="bold italic";r._DEFAULT_TEXT_FILL="#000000";r._DEFAULT_LEADMULT=1.25;r._CTX_MIDDLE="middle";r.LINEAR="linear";r.QUADRATIC="quadratic";r.BEZIER="bezier";r.CURVE="curve";r.STROKE="stroke";r.FILL="fill";r.TEXTURE="texture";r.IMMEDIATE="immediate";r.IMAGE="image";r.NEAREST="nearest";r.REPEAT="repeat";r.CLAMP="clamp";r.MIRROR="mirror";r.LANDSCAPE="landscape";r.PORTRAIT="portrait";r._DEFAULT_STROKE="#000000";r._DEFAULT_FILL="#FFFFFF";r.GRID="grid";r.AXES="axes";r.LABEL="label";r.FALLBACK="fallback"},{}],251:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.includes"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.includes"),e("core-js/modules/es.string.search"),e("core-js/modules/es.string.split"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("./main"))&&n.__esModule?n:{default:n},i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("./constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}var l=[i.ARROW,i.CROSS,i.HAND,i.MOVE,i.TEXT,i.WAIT];o.default.prototype._frameRate=0,o.default.prototype._lastFrameTime=window.performance.now(),o.default.prototype._targetFrameRate=60;var u=window.print;function c(){return window.innerWidth||document.documentElement&&document.documentElement.clientWidth||document.body&&document.body.clientWidth||0}function d(){return window.innerHeight||document.documentElement&&document.documentElement.clientHeight||document.body&&document.body.clientHeight||0}o.default.prototype.print=function(){var e;arguments.length?(e=console).log.apply(e,arguments):u()},o.default.prototype.frameCount=0,o.default.prototype.deltaTime=0,o.default.prototype.focused=document.hasFocus(),o.default.prototype.cursor=function(e,t,r){var n="auto",o=this._curElement.elt;if(l.includes(e))n=e;else if("string"==typeof e){var i="";t&&r&&"number"==typeof t&&"number"==typeof r&&(i="".concat(t," ").concat(r)),n="http://"===e.substring(0,7)||"https://"===e.substring(0,8)?"url(".concat(e,") ").concat(i,", auto"):/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(e)?"url(".concat(e,") ").concat(i,", auto"):e}o.style.cursor=n},o.default.prototype.frameRate=function(e){return o.default._validateParameters("frameRate",arguments),"number"!=typeof e||e<0?this._frameRate:(this._setProperty("_targetFrameRate",e),0===e&&this._setProperty("_frameRate",e),this)},o.default.prototype.getFrameRate=function(){return this.frameRate()},o.default.prototype.setFrameRate=function(e){return this.frameRate(e)},o.default.prototype.noCursor=function(){this._curElement.elt.style.cursor="none"},o.default.prototype.displayWidth=screen.width,o.default.prototype.displayHeight=screen.height,o.default.prototype.windowWidth=c(),o.default.prototype.windowHeight=d(),o.default.prototype._onresize=function(e){this._setProperty("windowWidth",c()),this._setProperty("windowHeight",d());var t,r=this._isGlobal?window:this;"function"==typeof r.windowResized&&(void 0===(t=r.windowResized(e))||t||e.preventDefault())},o.default.prototype.width=0,o.default.prototype.height=0,o.default.prototype.fullscreen=function(e){if(o.default._validateParameters("fullscreen",arguments),void 0===e)return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;e?function(e){if(!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled))throw new Error("Fullscreen not enabled in this browser.");e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}(document.documentElement):document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},o.default.prototype.pixelDensity=function(e){var t;return o.default._validateParameters("pixelDensity",arguments),"number"==typeof e?(e!==this._pixelDensity&&(this._pixelDensity=e),(t=this).resizeCanvas(this.width,this.height,!0)):t=this._pixelDensity,t},o.default.prototype.displayDensity=function(){return window.devicePixelRatio},o.default.prototype.getURL=function(){return location.href},o.default.prototype.getURLPath=function(){return location.pathname.split("/").filter(function(e){return""!==e})},o.default.prototype.getURLParams=function(){for(var e,t=/[?&]([^&=]+)(?:[&=])([^&=]+)/gim,r={};null!=(e=t.exec(location.search));)e.index===t.lastIndex&&t.lastIndex++,r[e[1]]=e[2];return r};var f=o.default;r.default=f},{"./constants":250,"./main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.includes":154,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.includes":182,"core-js/modules/es.string.search":187,"core-js/modules/es.string.split":188}],252:[function(r,e,t){"use strict";r("core-js/modules/es.symbol"),r("core-js/modules/es.symbol.description"),r("core-js/modules/es.symbol.iterator"),r("core-js/modules/es.array.concat"),r("core-js/modules/es.array.filter"),r("core-js/modules/es.array.for-each"),r("core-js/modules/es.array.includes"),r("core-js/modules/es.array.iterator"),r("core-js/modules/es.array.join"),r("core-js/modules/es.array.map"),r("core-js/modules/es.array.slice"),r("core-js/modules/es.array.some"),r("core-js/modules/es.function.name"),r("core-js/modules/es.object.assign"),r("core-js/modules/es.object.get-own-property-names"),r("core-js/modules/es.object.keys"),r("core-js/modules/es.object.to-string"),r("core-js/modules/es.regexp.constructor"),r("core-js/modules/es.regexp.exec"),r("core-js/modules/es.regexp.to-string"),r("core-js/modules/es.string.iterator"),r("core-js/modules/es.string.match"),r("core-js/modules/es.string.replace"),r("core-js/modules/es.string.search"),r("core-js/modules/es.string.split"),r("core-js/modules/web.dom-collections.for-each"),r("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=(n=r("../main"))&&n.__esModule?n:{default:n};r("../internationalization");var i=null,a=null;o.default._friendlyError=o.default._checkForUserDefinedFunctions=o.default._fesErrorMonitor=function(){},i=null;var s="https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup";a=function(){function e(r){return Object.getOwnPropertyNames(r).filter(function(e){return"_"!==e[0]&&(!(e in t)&&(t[e]=!0))}).map(function(e){var t;return t="function"==typeof r[e]?"function":e===e.toUpperCase()?"constant":"variable",{name:e,type:t}})}var t={};(i=[].concat(e(o.default.prototype),e(r("../constants")))).sort(function(e,t){return t.name.length-e.name.length})};function l(r,n){n=n||console.log.bind(console),i||a(),i.some(function(e){if(r.message&&null!==r.message.match("\\W?".concat(e.name,"\\W"))){var t="function"===e.type?"".concat(e.name,"()"):e.name;return n("Did you just try to use p5.js's ".concat(t," ").concat(e.type,"? If so, you may want to move it into your sketch's setup() function.\n\nFor more details, see: ").concat(s)),!0}})}o.default.prototype._helpForMisusedAtTopLevelCode=l,"complete"!==document.readyState&&(window.addEventListener("error",l,!1),window.addEventListener("load",function(){window.removeEventListener("error",l,!1)}));var u=o.default;t.default=u},{"../constants":250,"../internationalization":258,"../main":260,"./browser_errors":void 0,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.for-each":152,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.join":157,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.some":161,"core-js/modules/es.function.name":163,"core-js/modules/es.object.assign":170,"core-js/modules/es.object.get-own-property-names":171,"core-js/modules/es.object.keys":173,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.constructor":177,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.match":184,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.search":187,"core-js/modules/es.string.split":188,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.for-each":225,"core-js/modules/web.dom-collections.iterator":226}],253:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../main"))&&n.__esModule?n:{default:n};e("../internationalization");o.default._friendlyFileLoadError=function(){};var i=o.default;r.default=i},{"../internationalization":258,"../main":260}],254:[function(e,t,r){"use strict";e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.join"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.match"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.split"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../main"))&&n.__esModule?n:{default:n};function i(){var t=/(^|@)\S+:\d+/,r=/^\s*at .*(\S+:\d+|\(native\))/m,n=/^(eval@)?(\[native code])?$/;return{parse:function(e){return void 0!==e.stacktrace||void 0!==e["opera#sourceloc"]?this.parseOpera(e):e.stack&&e.stack.match(r)?this.parseV8OrIE(e):e.stack?this.parseFFOrSafari(e):void 0},extractLocation:function(e){if(-1===e.indexOf(":"))return[e];var t=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g,""));return[t[1],t[2]||void 0,t[3]||void 0]},parseV8OrIE:function(e){return e.stack.split("\n").filter(function(e){return!!e.match(r)},this).map(function(e){-1<e.indexOf("(eval ")&&(e=e.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(\),.*$)/g,""));var t=e.replace(/^\s+/,"").replace(/\(eval code/g,"("),r=t.match(/ (\((.+):(\d+):(\d+)\)$)/),n=(t=r?t.replace(r[0],""):t).split(/\s+/).slice(1),o=this.extractLocation(r?r[1]:n.pop());return{functionName:n.join(" ")||void 0,fileName:-1<["eval","<anonymous>"].indexOf(o[0])?void 0:o[0],lineNumber:o[1],columnNumber:o[2],source:e}},this)},parseFFOrSafari:function(e){return e.stack.split("\n").filter(function(e){return!e.match(n)},this).map(function(e){if(-1<e.indexOf(" > eval")&&(e=e.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),-1===e.indexOf("@")&&-1===e.indexOf(":"))return{functionName:e};var t=/((.*".+"[^@]*)?[^@]*)(?:@)/,r=e.match(t),n=r&&r[1]?r[1]:void 0,o=this.extractLocation(e.replace(t,""));return{functionName:n,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:e}},this)},parseOpera:function(e){return!e.stacktrace||-1<e.message.indexOf("\n")&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(e){for(var t=/Line (\d+).*script (?:in )?(\S+)/i,r=e.message.split("\n"),n=[],o=2,i=r.length;o<i;o+=2){var a=t.exec(r[o]);a&&n.push({fileName:a[2],lineNumber:a[1],source:r[o]})}return n},parseOpera10:function(e){for(var t=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,r=e.stacktrace.split("\n"),n=[],o=0,i=r.length;o<i;o+=2){var a=t.exec(r[o]);a&&n.push({functionName:a[3]||void 0,fileName:a[2],lineNumber:a[1],source:r[o]})}return n},parseOpera11:function(e){return e.stack.split("\n").filter(function(e){return!!e.match(t)&&!e.match(/^Error created at/)},this).map(function(e){var t,r=e.split("@"),n=this.extractLocation(r.pop()),o=r.shift()||"",i=o.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0;return o.match(/\(([^)]*)\)/)&&(t=o.replace(/^[^(]+\(([^)]*)\)$/,"$1")),{functionName:i,args:void 0===t||"[arguments not available]"===t?void 0:t.split(","),fileName:n[0],lineNumber:n[1],columnNumber:n[2],source:e}},this)}}}o.default._getErrorStackParser=function(){return new i};var a=o.default;r.default=a},{"../main":260,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.join":157,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.match":184,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.split":188}],255:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.for-each"),e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.join"),e("core-js/modules/es.array.last-index-of"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.function.name"),e("core-js/modules/es.map"),e("core-js/modules/es.number.constructor"),e("core-js/modules/es.object.get-prototype-of"),e("core-js/modules/es.object.keys"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.reflect.construct"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.set"),e("core-js/modules/es.string.includes"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.split"),e("core-js/modules/web.dom-collections.for-each"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../main"))&&n.__esModule?n:{default:n};(function(e){if(e&&e.__esModule)return;if(null===e||"object"!==s(e)&&"function"!=typeof e)return;var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r)})(e("../constants")),e("../internationalization");function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}o.default._validateParameters=o.default._clearValidateParamsCache=function(){};var i=o.default;r.default=i},{"../../../docs/parameterData.json":void 0,"../constants":250,"../internationalization":258,"../main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.for-each":152,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.join":157,"core-js/modules/es.array.last-index-of":158,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.function.name":163,"core-js/modules/es.map":164,"core-js/modules/es.number.constructor":167,"core-js/modules/es.object.get-prototype-of":172,"core-js/modules/es.object.keys":173,"core-js/modules/es.object.to-string":174,"core-js/modules/es.reflect.construct":176,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.set":180,"core-js/modules/es.string.includes":182,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.split":188,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.for-each":225,"core-js/modules/web.dom-collections.iterator":226}],256:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("./constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}var n={modeAdjust:function(e,t,r,n,o){return o===i.CORNER?{x:e,y:t,w:r,h:n}:o===i.CORNERS?{x:e,y:t,w:r-e,h:n-t}:o===i.RADIUS?{x:e-r,y:t-n,w:2*r,h:2*n}:o===i.CENTER?{x:e-.5*r,y:t-.5*n,w:r,h:n}:void 0}};r.default=n},{"./constants":250}],257:[function(e,t,r){"use strict";e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.promise"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.iterator");var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};e("./internationalization");var i=Promise.resolve();Promise.all([new Promise(function(e,t){"complete"===document.readyState?e():window.addEventListener("load",e,!1)}),i]).then(function(){void 0===window._setupDone?window.mocha||(window.setup&&"function"==typeof window.setup||window.draw&&"function"==typeof window.draw)&&!o.default.instance&&new o.default:console.warn("p5.js seems to have been imported multiple times. Please remove the duplicate import")})},{"../core/main":260,"./internationalization":258,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.promise":175,"core-js/modules/es.string.iterator":183,"core-js/modules/web.dom-collections.iterator":226}],258:[function(e,t,r){"use strict";e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.join"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.keys"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.promise"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.includes"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.split"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.initialize=r.translator=void 0;var i,a,n=s(e("i18next")),o=s(e("i18next-browser-languagedetector"));function s(e){return e&&e.__esModule?e:{default:e}}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function r(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),this.init(e,t)}var e,t,n;return e=r,(t=[{key:"fetchWithTimeout",value:function(e,t,r){var n=2<arguments.length&&void 0!==r?r:2e3;return Promise.race([fetch(e,t),new Promise(function(e,t){return setTimeout(function(){return t(new Error("timeout"))},n)})])}},{key:"init",value:function(e,t){var r=1<arguments.length&&void 0!==t?t:{};this.services=e,this.options=r}},{key:"read",value:function(e,t,r){var n=this.options.loadPath;if(e===this.options.fallback)r(null,i[e][t]);else if(a.includes(e)){var o=this.services.interpolator.interpolate(n,{lng:e,ns:t});this.loadUrl(o,r)}else r("Not found",!1)}},{key:"loadUrl",value:function(t,r){this.fetchWithTimeout(t).then(function(e){if(!e.ok)throw new Error("failed loading ".concat(t));return e.json()},function(){throw new Error("failed loading ".concat(t))}).then(function(e){return r(null,e)}).catch(r)}}])&&l(e.prototype,t),n&&l(e,n),r}();u.type="backend";var c=function(e,t){console.debug("p5.js translator called before translations were loaded"),n.default.t(e,t)};r.translator=c;r.initialize=function(){return n.default.use(o.default).use(u).init({fallbackLng:"en",nestingPrefix:"$tr(",nestingSuffix:")",defaultNS:"translation",returnEmptyString:!1,interpolation:{escapeValue:!1},detection:{checkWhitelist:!1,order:["querystring","navigator","htmlTag","path","subdomain"],caches:[]},backend:{fallback:"en",loadPath:"https://cdn.jsdelivr.net/npm/p5/translations/{{lng}}/{{ns}}.json"},partialBundledLanguages:!0,resources:i}).then(function(e){r.translator=c=e},function(e){return console.debug("Translations failed to load (".concat(e,")"))})}},{"../../translations":void 0,"../../translations/dev":void 0,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.join":157,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.keys":173,"core-js/modules/es.object.to-string":174,"core-js/modules/es.promise":175,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.includes":182,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.split":188,"core-js/modules/web.dom-collections.iterator":226,i18next:3,"i18next-browser-languagedetector":3}],259:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("./main"))&&n.__esModule?n:{default:n};o.default.prototype.pushStyle=function(){throw new Error("pushStyle() not used, see push()")},o.default.prototype.popStyle=function(){throw new Error("popStyle() not used, see pop()")},o.default.prototype.popMatrix=function(){throw new Error("popMatrix() not used, see pop()")},o.default.prototype.pushMatrix=function(){throw new Error("pushMatrix() not used, see push()")};var i=o.default;r.default=i},{"./main":260}],260:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.for-each"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.get-own-property-names"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.for-each"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,e("./shim");var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("./constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function _(e,t,r){var f=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,_),this._setupDone=!1,this._pixelDensity=Math.ceil(window.devicePixelRatio)||1,this._userNode=t,this._curElement=null,this._elements=[],this._glAttributes=null,this._requestAnimId=0,this._preloadCount=0,this._isGlobal=!1,this._loop=!0,this._initializeInstanceVariables(),this._defaultCanvasSize={width:100,height:100},this._events={mousemove:null,mousedown:null,mouseup:null,dragend:null,dragover:null,click:null,dblclick:null,mouseover:null,mouseout:null,keydown:null,keyup:null,keypress:null,touchstart:null,touchmove:null,touchend:null,resize:null,blur:null},this._millisStart=-1,this._lcg_random_state=null,this._gaussian_previous=!1,this._events.wheel=null,this._loadingScreenId="p5_loading",this._registeredMethods={};var n=Object.getOwnPropertyNames(_.prototype._registeredMethods),o=!0,i=!1,a=void 0;try{for(var s,l=n[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){var u=s.value;this._registeredMethods[u]=_.prototype._registeredMethods[u].slice()}}catch(e){i=!0,a=e}finally{try{o||null==l.return||l.return()}finally{if(i)throw a}}window.DeviceOrientationEvent&&(this._events.deviceorientation=null),window.DeviceMotionEvent&&!window._isNodeWebkit&&(this._events.devicemotion=null),this._start=function(){f._userNode&&"string"==typeof f._userNode&&(f._userNode=document.getElementById(f._userNode));var e=f._isGlobal?window:f;if(e.preload){var t=document.getElementById(f._loadingScreenId);if(!t)(t=document.createElement("div")).innerHTML="Loading...",t.style.position="absolute",t.id=f._loadingScreenId,(f._userNode||document.body).appendChild(t);var r=f._preloadMethods;for(var n in r){r[n]=r[n]||_;var o=r[n];o!==_.prototype&&o!==_||(f._isGlobal&&(window[n]=f._wrapPreload(f,n)),o=f),f._registeredPreloadMethods[n]=o[n],o[n]=f._wrapPreload(o,n)}e.preload(),f._runIfPreloadsAreDone()}else f._setup(),f._draw()},this._runIfPreloadsAreDone=function(){var e=this._isGlobal?window:this;if(0===e._preloadCount){var t=document.getElementById(e._loadingScreenId);t&&t.parentNode.removeChild(t),this._setupDone||(this._lastFrameTime=window.performance.now(),e._setup(),e._draw())}},this._decrementPreload=function(){var e=this._isGlobal?window:this;"function"==typeof e.preload&&(e._setProperty("_preloadCount",e._preloadCount-1),e._runIfPreloadsAreDone())},this._wrapPreload=function(n,o){var i=this;return function(){i._incrementPreload();for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return i._registeredPreloadMethods[o].apply(n,t)}},this._incrementPreload=function(){var e=this._isGlobal?window:this;e._setProperty("_preloadCount",e._preloadCount+1)},this._setup=function(){f.createCanvas(f._defaultCanvasSize.width,f._defaultCanvasSize.height,"p2d");var e=f._isGlobal?window:f;if("function"==typeof e.preload)for(var t in f._preloadMethods)e[t]=f._preloadMethods[t][t],e[t]&&f&&(e[t]=e[t].bind(f));f._millisStart=window.performance.now(),"function"==typeof e.setup&&e.setup();var r=document.getElementsByTagName("canvas"),n=!0,o=!1,i=void 0;try{for(var a,s=r[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var l=a.value;"true"===l.dataset.hidden&&(l.style.visibility="",delete l.dataset.hidden)}}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}f._lastFrameTime=window.performance.now(),f._setupDone=!0,(f._accessibleOutputs.grid||f._accessibleOutputs.text)&&f._updateAccsOutput()},this._draw=function(){var e=window.performance.now(),t=e-f._lastFrameTime,r=1e3/f._targetFrameRate;(!f._loop||r-5<=t)&&(f.redraw(),f._frameRate=1e3/(e-f._lastFrameTime),f.deltaTime=e-f._lastFrameTime,f._setProperty("deltaTime",f.deltaTime),f._lastFrameTime=e,void 0!==f._updateMouseCoords&&(f._updateMouseCoords(),f._setProperty("movedX",0),f._setProperty("movedY",0))),f._loop&&(f._requestAnimId=window.requestAnimationFrame(f._draw))},this._setProperty=function(e,t){f[e]=t,f._isGlobal&&(window[e]=t)},this.remove=function(){var e=document.getElementById(f._loadingScreenId);if(e&&(e.parentNode.removeChild(e),f._incrementPreload()),f._curElement){for(var t in f._loop=!1,f._requestAnimId&&window.cancelAnimationFrame(f._requestAnimId),f._events)window.removeEventListener(t,f._events[t]);var r=!0,n=!1,o=void 0;try{for(var i,a=f._elements[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value;for(var l in s.elt&&s.elt.parentNode&&s.elt.parentNode.removeChild(s.elt),s._events)s.elt.removeEventListener(l,s._events[l])}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}var u=f;f._registeredMethods.remove.forEach(function(e){void 0!==e&&e.call(u)})}if(f._isGlobal){for(var c in _.prototype)try{delete window[c]}catch(e){window[c]=void 0}for(var d in f)if(f.hasOwnProperty(d))try{delete window[d]}catch(e){window[d]=void 0}_.instance=null}},this._registeredMethods.init.forEach(function(e){void 0!==e&&e.call(this)},this),this._setupPromisePreloads();var c=this._createFriendlyGlobalFunctionBinder();if(e)e(this),_._checkForUserDefinedFunctions(this);else{for(var d in this._isGlobal=!0,_.instance=this,_.prototype)if("function"==typeof _.prototype[d]){var h=d.substring(2);this._events.hasOwnProperty(h)||(Math.hasOwnProperty(d)&&Math[d]===_.prototype[d]?c(d,_.prototype[d]):c(d,_.prototype[d].bind(this)))}else c(d,_.prototype[d]);for(var p in this)this.hasOwnProperty(p)&&c(p,this[p])}for(var y in this._events){var m=this["_on".concat(y)];if(m){var g=m.bind(this);window.addEventListener(y,g,{passive:!1}),this._events[y]=g}}function v(){f._setProperty("focused",!0)}function b(){f._setProperty("focused",!1)}window.addEventListener("focus",v),window.addEventListener("blur",b),this.registerMethod("remove",function(){window.removeEventListener("focus",v),window.removeEventListener("blur",b)}),"complete"===document.readyState?this._start():window.addEventListener("load",this._start.bind(this),!1)}var e,t,r;return e=_,(t=[{key:"_initializeInstanceVariables",value:function(){this._accessibleOutputs={text:!1,grid:!1,textLabel:!1,gridLabel:!1},this._styles=[],this._bezierDetail=20,this._curveDetail=20,this._colorMode=n.RGB,this._colorMaxes={rgb:[255,255,255,255],hsb:[360,100,100,1],hsl:[360,100,100,1]},this._downKeys={}}},{key:"registerPreloadMethod",value:function(e,t){_.prototype._preloadMethods.hasOwnProperty(e)||(_.prototype._preloadMethods[e]=t)}},{key:"registerMethod",value:function(e,t){var r=this||_.prototype;r._registeredMethods.hasOwnProperty(e)||(r._registeredMethods[e]=[]),r._registeredMethods[e].push(t)}},{key:"_createFriendlyGlobalFunctionBinder",value:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=t.globalObject||window;t.log||console.log.bind(console);return function(e,t){r[e]=t}}}])&&o(e.prototype,t),r&&o(e,r),_}();for(var l in i.instance=null,i.disableFriendlyErrors=!1,n)i.prototype[l]=n[l];i.prototype._preloadMethods={loadJSON:i.prototype,loadImage:i.prototype,loadStrings:i.prototype,loadXML:i.prototype,loadBytes:i.prototype,loadTable:i.prototype,loadFont:i.prototype,loadModel:i.prototype,loadShader:i.prototype},i.prototype._registeredMethods={init:[],pre:[],post:[],remove:[]},i.prototype._registeredPreloadMethods={};var u=i;r.default=u},{"./constants":250,"./shim":271,"core-js/modules/es.array.for-each":152,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.get-own-property-names":171,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.for-each":225,"core-js/modules/web.dom-collections.iterator":226}],261:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("./main"))&&n.__esModule?n:{default:n};o.default.Element=function(e,t){this.elt=e,this._pInst=this._pixelsState=t,this._events={},this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight},o.default.Element.prototype.parent=function(e){return void 0===e?this.elt.parentNode:("string"==typeof e?("#"===e[0]&&(e=e.substring(1)),e=document.getElementById(e)):e instanceof o.default.Element&&(e=e.elt),e.appendChild(this.elt),this)},o.default.Element.prototype.id=function(e){return void 0===e?this.elt.id:(this.elt.id=e,this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this)},o.default.Element.prototype.class=function(e){return void 0===e?this.elt.className:(this.elt.className=e,this)},o.default.Element.prototype.mousePressed=function(t){return o.default.Element._adjustListener("mousedown",function(e){return this._pInst._setProperty("mouseIsPressed",!0),this._pInst._setMouseButton(e),t.call(this)},this),this},o.default.Element.prototype.doubleClicked=function(e){return o.default.Element._adjustListener("dblclick",e,this),this},o.default.Element.prototype.mouseWheel=function(e){return o.default.Element._adjustListener("wheel",e,this),this},o.default.Element.prototype.mouseReleased=function(e){return o.default.Element._adjustListener("mouseup",e,this),this},o.default.Element.prototype.mouseClicked=function(e){return o.default.Element._adjustListener("click",e,this),this},o.default.Element.prototype.mouseMoved=function(e){return o.default.Element._adjustListener("mousemove",e,this),this},o.default.Element.prototype.mouseOver=function(e){return o.default.Element._adjustListener("mouseover",e,this),this},o.default.Element.prototype.mouseOut=function(e){return o.default.Element._adjustListener("mouseout",e,this),this},o.default.Element.prototype.touchStarted=function(e){return o.default.Element._adjustListener("touchstart",e,this),this},o.default.Element.prototype.touchMoved=function(e){return o.default.Element._adjustListener("touchmove",e,this),this},o.default.Element.prototype.touchEnded=function(e){return o.default.Element._adjustListener("touchend",e,this),this},o.default.Element.prototype.dragOver=function(e){return o.default.Element._adjustListener("dragover",e,this),this},o.default.Element.prototype.dragLeave=function(e){return o.default.Element._adjustListener("dragleave",e,this),this},o.default.Element._adjustListener=function(e,t,r){return!1===t?o.default.Element._detachListener(e,r):o.default.Element._attachListener(e,t,r),this},o.default.Element._attachListener=function(e,t,r){r._events[e]&&o.default.Element._detachListener(e,r);var n=t.bind(r);r.elt.addEventListener(e,n,!1),r._events[e]=n},o.default.Element._detachListener=function(e,t){var r=t._events[e];t.elt.removeEventListener(e,r,!1),t._events[e]=null},o.default.Element.prototype._setProperty=function(e,t){this[e]=t};var i=o.default.Element;r.default=i},{"./main":260}],262:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.splice"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("./main"))&&n.__esModule?n:{default:n},l=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("./constants"));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}s.default.Graphics=function(e,t,r,n){var o=r||l.P2D;this.canvas=document.createElement("canvas");var i=n._userNode||document.body;for(var a in i.appendChild(this.canvas),s.default.Element.call(this,this.canvas,n),s.default.prototype)this[a]||("function"==typeof s.default.prototype[a]?this[a]=s.default.prototype[a].bind(this):this[a]=s.default.prototype[a]);return s.default.prototype._initializeInstanceVariables.apply(this),this.width=e,this.height=t,this._pixelDensity=n._pixelDensity,o===l.WEBGL?this._renderer=new s.default.RendererGL(this.canvas,this,!1):this._renderer=new s.default.Renderer2D(this.canvas,this,!1),n._elements.push(this),Object.defineProperty(this,"deltaTime",{get:function(){return this._pInst.deltaTime}}),this._renderer.resize(e,t),this._renderer._applyDefaults(),this},s.default.Graphics.prototype=Object.create(s.default.Element.prototype),s.default.Graphics.prototype.reset=function(){this._renderer.resetMatrix(),this._renderer.isP3D&&this._renderer._update()},s.default.Graphics.prototype.remove=function(){this.elt.parentNode&&this.elt.parentNode.removeChild(this.elt);var e=this._pInst._elements.indexOf(this);for(var t in-1!==e&&this._pInst._elements.splice(e,1),this._events)this.elt.removeEventListener(t,this._events[t])};var o=s.default.Graphics;r.default=o},{"./constants":250,"./main":260,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.splice":162}],263:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.number.constructor"),e("core-js/modules/es.object.assign"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.split"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,l=(n=e("./main"))&&n.__esModule?n:{default:n},_=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==s(e)&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e){var t=0,r=0;if(e.offsetParent)for(;t+=e.offsetLeft,r+=e.offsetTop,e=e.offsetParent;);else t+=e.offsetLeft,r+=e.offsetTop;return[t,r]}l.default.Renderer=function(e,t,r){l.default.Element.call(this,e,t),this.canvas=e,this._pixelsState=t,r?(this._isMainCanvas=!0,this._pInst._setProperty("_curElement",this),this._pInst._setProperty("canvas",this.canvas),this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height)):(this.canvas.style.display="none",this._styles=[]),this._textSize=12,this._textLeading=15,this._textFont="sans-serif",this._textStyle=_.NORMAL,this._textAscent=null,this._textDescent=null,this._textAlign=_.LEFT,this._textBaseline=_.BASELINE,this._rectMode=_.CORNER,this._ellipseMode=_.CENTER,this._curveTightness=0,this._imageMode=_.CORNER,this._tint=null,this._doStroke=!0,this._doFill=!0,this._strokeSet=!1,this._fillSet=!1},l.default.Renderer.prototype=Object.create(l.default.Element.prototype),l.default.Renderer.prototype.push=function(){return{properties:{_doStroke:this._doStroke,_strokeSet:this._strokeSet,_doFill:this._doFill,_fillSet:this._fillSet,_tint:this._tint,_imageMode:this._imageMode,_rectMode:this._rectMode,_ellipseMode:this._ellipseMode,_textFont:this._textFont,_textLeading:this._textLeading,_textSize:this._textSize,_textAlign:this._textAlign,_textBaseline:this._textBaseline,_textStyle:this._textStyle}}},l.default.Renderer.prototype.pop=function(e){e.properties&&Object.assign(this,e.properties)},l.default.Renderer.prototype.resize=function(e,t){this.width=e,this.height=t,this.elt.width=e*this._pInst._pixelDensity,this.elt.height=t*this._pInst._pixelDensity,this.elt.style.width="".concat(e,"px"),this.elt.style.height="".concat(t,"px"),this._isMainCanvas&&(this._pInst._setProperty("width",this.width),this._pInst._setProperty("height",this.height))},l.default.Renderer.prototype.get=function(e,t,r,n){var o=this._pixelsState,i=o._pixelDensity,a=this.canvas;if(void 0===e&&void 0===t)e=t=0,r=o.width,n=o.height;else if(e*=i,t*=i,void 0===r&&void 0===n)return e<0||t<0||e>=a.width||t>=a.height?[0,0,0,0]:this._getPixel(e,t);var s=new l.default.Image(r,n);return s.canvas.getContext("2d").drawImage(a,e,t,r*i,n*i,0,0,r,n),s},l.default.Renderer.prototype.textLeading=function(e){return"number"==typeof e?(this._setProperty("_textLeading",e),this._pInst):this._textLeading},l.default.Renderer.prototype.textSize=function(e){return"number"==typeof e?(this._setProperty("_textSize",e),this._setProperty("_textLeading",e*_._DEFAULT_LEADMULT),this._applyTextProperties()):this._textSize},l.default.Renderer.prototype.textStyle=function(e){return e?(e!==_.NORMAL&&e!==_.ITALIC&&e!==_.BOLD&&e!==_.BOLDITALIC||this._setProperty("_textStyle",e),this._applyTextProperties()):this._textStyle},l.default.Renderer.prototype.textAscent=function(){return null===this._textAscent&&this._updateTextMetrics(),this._textAscent},l.default.Renderer.prototype.textDescent=function(){return null===this._textDescent&&this._updateTextMetrics(),this._textDescent},l.default.Renderer.prototype.textAlign=function(e,t){return void 0!==e?(this._setProperty("_textAlign",e),void 0!==t&&this._setProperty("_textBaseline",t),this._applyTextProperties()):{horizontal:this._textAlign,vertical:this._textBaseline}},l.default.Renderer.prototype.text=function(e,t,r,n,o){var i,a,s,l,u,c,d,f,h,p,y=this._pInst,m=Number.MAX_VALUE;if((this._doFill||this._doStroke)&&void 0!==e){if("string"!=typeof e&&(e=e.toString()),i=(e=e.replace(/(\t)/g,"  ")).split("\n"),void 0!==n){for(d=1,s=h=0;s<i.length;s++){for(u="",f=i[s].split(" "),a=0;a<f.length;a++)c="".concat(u+f[a]," "),n<this.textWidth(c)&&1<d?(u="".concat(f[a]," "),h+=y.textLeading(),d=1):(u=c,d+=1);s<i.length-1&&(h+=y.textLeading())}switch(this._rectMode===_.CENTER&&(t-=n/2,r-=o/2),this._textAlign){case _.CENTER:t+=n/2;break;case _.RIGHT:t+=n}var g=!1;if(void 0!==o){switch(this._textBaseline){case _.BOTTOM:p=r+(o-h),r=Math.max(p,r);break;case _.CENTER:p=r+(o-h)/2,r=Math.max(p,r);break;case _.BASELINE:g=!0,this._textBaseline=_.TOP}m=r+o-y.textAscent()}for(s=0;s<i.length;s++){for(u="",f=i[s].split(" "),a=0;a<f.length;a++)c="".concat(u+f[a]," "),n<this.textWidth(c)&&0<u.length?(this._renderText(y,u,t,r,m),u="".concat(f[a]," "),r+=y.textLeading()):u=c;this._renderText(y,u,t,r,m),r+=y.textLeading(),g&&(this._textBaseline=_.BASELINE)}}else{var v=0,b=y.textAlign().vertical;for(b===_.CENTER?v=(i.length-1)*y.textLeading()/2:b===_.BOTTOM&&(v=(i.length-1)*y.textLeading()),l=0;l<i.length;l++)this._renderText(y,i[l],t,r-v,m),r+=y.textLeading()}return y}},l.default.Renderer.prototype._applyDefaults=function(){return this},l.default.Renderer.prototype._isOpenType=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:this._textFont;return"object"===s(e)&&e.font&&e.font.supported},l.default.Renderer.prototype._updateTextMetrics=function(){if(this._isOpenType())return this._setProperty("_textAscent",this._textFont._textAscent()),this._setProperty("_textDescent",this._textFont._textDescent()),this;var e=document.createElement("span");e.style.fontFamily=this._textFont,e.style.fontSize="".concat(this._textSize,"px"),e.innerHTML="ABCjgq|";var t=document.createElement("div");t.style.display="inline-block",t.style.width="1px",t.style.height="0px";var r=document.createElement("div");r.appendChild(e),r.appendChild(t),r.style.height="0px",r.style.overflow="hidden",document.body.appendChild(r),t.style.verticalAlign="baseline";var n=u(t),o=u(e),i=n[1]-o[1];t.style.verticalAlign="bottom",n=u(t),o=u(e);var a=n[1]-o[1]-i;return document.body.removeChild(r),this._setProperty("_textAscent",i),this._setProperty("_textDescent",a),this};var o=l.default.Renderer;r.default=o},{"../core/constants":250,"./main":260,"core-js/modules/es.array.iterator":156,"core-js/modules/es.number.constructor":167,"core-js/modules/es.object.assign":170,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.split":188,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],264:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.fill"),e("core-js/modules/es.array.for-each"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.function.name"),e("core-js/modules/es.number.to-fixed"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var d=n(e("./main")),p=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("./constants")),f=n(e("../image/filters"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function n(e){return e&&e.__esModule?e:{default:e}}e("./p5.Renderer");var m="rgba(0,0,0,0)";d.default.Renderer2D=function(e,t,r){return d.default.Renderer.call(this,e,t,r),this.drawingContext=this.canvas.getContext("2d"),this._pInst._setProperty("drawingContext",this.drawingContext),this},d.default.Renderer2D.prototype=Object.create(d.default.Renderer.prototype),d.default.Renderer2D.prototype._applyDefaults=function(){this._cachedFillStyle=this._cachedStrokeStyle=void 0,this._cachedBlendMode=p.BLEND,this._setFill(p._DEFAULT_FILL),this._setStroke(p._DEFAULT_STROKE),this.drawingContext.lineCap=p.ROUND,this.drawingContext.font="normal 12px sans-serif"},d.default.Renderer2D.prototype.resize=function(e,t){d.default.Renderer.prototype.resize.call(this,e,t),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity)},d.default.Renderer2D.prototype.background=function(){if(this.drawingContext.save(),this.resetMatrix(),(arguments.length<=0?void 0:arguments[0])instanceof d.default.Image)this._pInst.image(arguments.length<=0?void 0:arguments[0],0,0,this.width,this.height);else{var e,t=this._getFill(),r=(e=this._pInst).color.apply(e,arguments);this._pInst._addAccsOutput()&&this._pInst._accsBackground(r.levels);var n=r.toString();this._setFill(n),this._isErasing&&this.blendMode(this._cachedBlendMode),this.drawingContext.fillRect(0,0,this.width,this.height),this._setFill(t),this._isErasing&&this._pInst.erase()}this.drawingContext.restore()},d.default.Renderer2D.prototype.clear=function(){this.drawingContext.save(),this.resetMatrix(),this.drawingContext.clearRect(0,0,this.width,this.height),this.drawingContext.restore()},d.default.Renderer2D.prototype.fill=function(){var e,t=(e=this._pInst).color.apply(e,arguments);this._setFill(t.toString()),this._pInst._addAccsOutput()&&this._pInst._accsCanvasColors("fill",t.levels)},d.default.Renderer2D.prototype.stroke=function(){var e,t=(e=this._pInst).color.apply(e,arguments);this._setStroke(t.toString()),this._pInst._addAccsOutput()&&this._pInst._accsCanvasColors("stroke",t.levels)},d.default.Renderer2D.prototype.erase=function(e,t){if(!this._isErasing){this._cachedFillStyle=this.drawingContext.fillStyle;var r=this._pInst.color(255,e).toString();this.drawingContext.fillStyle=r,this._cachedStrokeStyle=this.drawingContext.strokeStyle;var n=this._pInst.color(255,t).toString();this.drawingContext.strokeStyle=n;var o=this._cachedBlendMode;this.blendMode(p.REMOVE),this._cachedBlendMode=o,this._isErasing=!0}},d.default.Renderer2D.prototype.noErase=function(){this._isErasing&&(this.drawingContext.fillStyle=this._cachedFillStyle,this.drawingContext.strokeStyle=this._cachedStrokeStyle,this.blendMode(this._cachedBlendMode),this._isErasing=!1)},d.default.Renderer2D.prototype.image=function(e,t,r,n,o,i,a,s,l){var u;e.gifProperties&&e._animateGif(this._pInst);try{this._tint&&(d.default.MediaElement&&e instanceof d.default.MediaElement&&e.loadPixels(),e.canvas&&(u=this._getTintedImageCanvas(e))),u=u||(e.canvas||e.elt);var c=1;e.width&&0<e.width&&(c=u.width/e.width),this._isErasing&&this.blendMode(this._cachedBlendMode),this.drawingContext.drawImage(u,c*t,c*r,c*n,c*o,i,a,s,l),this._isErasing&&this._pInst.erase()}catch(e){if("NS_ERROR_NOT_AVAILABLE"!==e.name)throw e}},d.default.Renderer2D.prototype._getTintedImageCanvas=function(e){if(!e.canvas)return e;var t=f.default._toPixels(e.canvas),r=document.createElement("canvas");r.width=e.canvas.width,r.height=e.canvas.height;for(var n=r.getContext("2d"),o=n.createImageData(e.canvas.width,e.canvas.height),i=o.data,a=0;a<t.length;a+=4){var s=t[a],l=t[a+1],u=t[a+2],c=t[a+3];i[a]=s*this._tint[0]/255,i[a+1]=l*this._tint[1]/255,i[a+2]=u*this._tint[2]/255,i[a+3]=c*this._tint[3]/255}return n.putImageData(o,0,0),r},d.default.Renderer2D.prototype.blendMode=function(e){if(e===p.SUBTRACT)console.warn("blendMode(SUBTRACT) only works in WEBGL mode.");else{if(e!==p.BLEND&&e!==p.REMOVE&&e!==p.DARKEST&&e!==p.LIGHTEST&&e!==p.DIFFERENCE&&e!==p.MULTIPLY&&e!==p.EXCLUSION&&e!==p.SCREEN&&e!==p.REPLACE&&e!==p.OVERLAY&&e!==p.HARD_LIGHT&&e!==p.SOFT_LIGHT&&e!==p.DODGE&&e!==p.BURN&&e!==p.ADD)throw new Error("Mode ".concat(e," not recognized."));this._cachedBlendMode=e,this.drawingContext.globalCompositeOperation=e}},d.default.Renderer2D.prototype.blend=function(){for(var e=this.drawingContext.globalCompositeOperation,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var o=r[r.length-1],i=Array.prototype.slice.call(r,0,r.length-1);this.drawingContext.globalCompositeOperation=o,d.default.prototype.copy.apply(this,i),this.drawingContext.globalCompositeOperation=e},d.default.Renderer2D.prototype._getPixel=function(e,t){var r;return[(r=this.drawingContext.getImageData(e,t,1,1).data)[0],r[1],r[2],r[3]]},d.default.Renderer2D.prototype.loadPixels=function(){var e=this._pixelsState,t=e._pixelDensity,r=this.width*t,n=this.height*t,o=this.drawingContext.getImageData(0,0,r,n);e._setProperty("imageData",o),e._setProperty("pixels",o.data)},d.default.Renderer2D.prototype.set=function(e,t,r){e=Math.floor(e),t=Math.floor(t);var n=this._pixelsState;if(r instanceof d.default.Image)this.drawingContext.save(),this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(n._pixelDensity,n._pixelDensity),this.drawingContext.clearRect(e,t,r.width,r.height),this.drawingContext.drawImage(r.canvas,e,t),this.drawingContext.restore();else{var o=0,i=0,a=0,s=0,l=4*(t*n._pixelDensity*(this.width*n._pixelDensity)+e*n._pixelDensity);if(n.imageData||n.loadPixels.call(n),"number"==typeof r)l<n.pixels.length&&(a=i=o=r,s=255);else if(r instanceof Array){if(r.length<4)throw new Error("pixel array must be of the form [R, G, B, A]");l<n.pixels.length&&(o=r[0],i=r[1],a=r[2],s=r[3])}else r instanceof d.default.Color&&l<n.pixels.length&&(o=r.levels[0],i=r.levels[1],a=r.levels[2],s=r.levels[3]);for(var u=0;u<n._pixelDensity;u++)for(var c=0;c<n._pixelDensity;c++)l=4*((t*n._pixelDensity+c)*this.width*n._pixelDensity+(e*n._pixelDensity+u)),n.pixels[l]=o,n.pixels[l+1]=i,n.pixels[l+2]=a,n.pixels[l+3]=s}},d.default.Renderer2D.prototype.updatePixels=function(e,t,r,n){var o=this._pixelsState,i=o._pixelDensity;void 0===e&&void 0===t&&void 0===r&&void 0===n&&(t=e=0,r=this.width,n=this.height),e*=i,t*=i,r*=i,n*=i,this.gifProperties&&(this.gifProperties.frames[this.gifProperties.displayIndex].image=o.imageData),this.drawingContext.putImageData(o.imageData,e,t,0,0,r,n)},d.default.Renderer2D.prototype._acuteArcToBezier=function(e,t){var r=t/2,n=Math.cos(r),o=Math.sin(r),i=1/Math.tan(r),a=e+r,s=Math.cos(a),l=Math.sin(a),u=(4-n)/3,c=o+(n-u)*i;return{ax:Math.cos(e).toFixed(7),ay:Math.sin(e).toFixed(7),bx:(u*s+c*l).toFixed(7),by:(u*l-c*s).toFixed(7),cx:(u*s-c*l).toFixed(7),cy:(u*l+c*s).toFixed(7),dx:Math.cos(e+t).toFixed(7),dy:Math.sin(e+t).toFixed(7)}},d.default.Renderer2D.prototype.arc=function(r,n,e,t,o,i,a){var s=this.drawingContext,l=e/2,u=t/2,c=0,d=[];for(r+=l,n+=u;1e-5<=i-o;)c=Math.min(i-o,p.HALF_PI),d.push(this._acuteArcToBezier(o,c)),o+=c;return this._doFill&&(s.beginPath(),d.forEach(function(e,t){0===t&&s.moveTo(r+e.ax*l,n+e.ay*u),s.bezierCurveTo(r+e.bx*l,n+e.by*u,r+e.cx*l,n+e.cy*u,r+e.dx*l,n+e.dy*u)}),a!==p.PIE&&null!=a||s.lineTo(r,n),s.closePath(),s.fill()),this._doStroke&&(s.beginPath(),d.forEach(function(e,t){0===t&&s.moveTo(r+e.ax*l,n+e.ay*u),s.bezierCurveTo(r+e.bx*l,n+e.by*u,r+e.cx*l,n+e.cy*u,r+e.dx*l,n+e.dy*u)}),a===p.PIE?(s.lineTo(r,n),s.closePath()):a===p.CHORD&&s.closePath(),s.stroke()),this},d.default.Renderer2D.prototype.ellipse=function(e){var t=this.drawingContext,r=this._doFill,n=this._doStroke,o=parseFloat(e[0]),i=parseFloat(e[1]),a=parseFloat(e[2]),s=parseFloat(e[3]);if(r&&!n){if(this._getFill()===m)return this}else if(!r&&n&&this._getStroke()===m)return this;var l=a/2*.5522847498,u=s/2*.5522847498,c=o+a,d=i+s,f=o+a/2,h=i+s/2;t.beginPath(),t.moveTo(o,h),t.bezierCurveTo(o,h-u,f-l,i,f,i),t.bezierCurveTo(f+l,i,c,h-u,c,h),t.bezierCurveTo(c,h+u,f+l,d,f,d),t.bezierCurveTo(f-l,d,o,h+u,o,h),r&&t.fill(),n&&t.stroke()},d.default.Renderer2D.prototype.line=function(e,t,r,n){var o=this.drawingContext;return this._doStroke&&(this._getStroke()===m||(o.beginPath(),o.moveTo(e,t),o.lineTo(r,n),o.stroke())),this},d.default.Renderer2D.prototype.point=function(e,t){var r=this.drawingContext;if(!this._doStroke)return this;if(this._getStroke()===m)return this;var n=this._getStroke(),o=this._getFill();this._setFill(n),r.beginPath(),r.arc(e,t,r.lineWidth/2,0,p.TWO_PI,!1),r.fill(),this._setFill(o)},d.default.Renderer2D.prototype.quad=function(e,t,r,n,o,i,a,s){var l=this.drawingContext,u=this._doFill,c=this._doStroke;if(u&&!c){if(this._getFill()===m)return this}else if(!u&&c&&this._getStroke()===m)return this;return l.beginPath(),l.moveTo(e,t),l.lineTo(r,n),l.lineTo(o,i),l.lineTo(a,s),l.closePath(),u&&l.fill(),c&&l.stroke(),this},d.default.Renderer2D.prototype.rect=function(e){var t=e[0],r=e[1],n=e[2],o=e[3],i=e[4],a=e[5],s=e[6],l=e[7],u=this.drawingContext,c=this._doFill,d=this._doStroke;if(c&&!d){if(this._getFill()===m)return this}else if(!c&&d&&this._getStroke()===m)return this;if(u.beginPath(),void 0===i)u.rect(t,r,n,o);else{void 0===a&&(a=i),void 0===s&&(s=a),void 0===l&&(l=s);var f=Math.abs(n),h=Math.abs(o),p=f/2,y=h/2;f<2*i&&(i=p),h<2*i&&(i=y),f<2*a&&(a=p),h<2*a&&(a=y),f<2*s&&(s=p),h<2*s&&(s=y),f<2*l&&(l=p),h<2*l&&(l=y),u.beginPath(),u.moveTo(t+i,r),u.arcTo(t+n,r,t+n,r+o,a),u.arcTo(t+n,r+o,t,r+o,s),u.arcTo(t,r+o,t,r,l),u.arcTo(t,r,t+n,r,i),u.closePath()}return this._doFill&&u.fill(),this._doStroke&&u.stroke(),this},d.default.Renderer2D.prototype.triangle=function(e){var t=this.drawingContext,r=this._doFill,n=this._doStroke,o=e[0],i=e[1],a=e[2],s=e[3],l=e[4],u=e[5];if(r&&!n){if(this._getFill()===m)return this}else if(!r&&n&&this._getStroke()===m)return this;t.beginPath(),t.moveTo(o,i),t.lineTo(a,s),t.lineTo(l,u),t.closePath(),r&&t.fill(),n&&t.stroke()},d.default.Renderer2D.prototype.endShape=function(e,t,r,n,o,i,a){if(0===t.length)return this;if(!this._doStroke&&!this._doFill)return this;var s,l,u,c=e===p.CLOSE;c&&!i&&t.push(t[0]);var d=t.length;if(!r||a!==p.POLYGON&&null!==a)if(!n||a!==p.POLYGON&&null!==a)if(!o||a!==p.POLYGON&&null!==a)if(a===p.POINTS)for(l=0;l<d;l++)s=t[l],this._doStroke&&this._pInst.stroke(s[6]),this._pInst.point(s[0],s[1]);else if(a===p.LINES)for(l=0;l+1<d;l+=2)s=t[l],this._doStroke&&this._pInst.stroke(t[l+1][6]),this._pInst.line(s[0],s[1],t[l+1][0],t[l+1][1]);else if(a===p.TRIANGLES)for(l=0;l+2<d;l+=3)s=t[l],this.drawingContext.beginPath(),this.drawingContext.moveTo(s[0],s[1]),this.drawingContext.lineTo(t[l+1][0],t[l+1][1]),this.drawingContext.lineTo(t[l+2][0],t[l+2][1]),this.drawingContext.closePath(),this._doFill&&(this._pInst.fill(t[l+2][5]),this.drawingContext.fill()),this._doStroke&&(this._pInst.stroke(t[l+2][6]),this.drawingContext.stroke());else if(a===p.TRIANGLE_STRIP)for(l=0;l+1<d;l++)s=t[l],this.drawingContext.beginPath(),this.drawingContext.moveTo(t[l+1][0],t[l+1][1]),this.drawingContext.lineTo(s[0],s[1]),this._doStroke&&this._pInst.stroke(t[l+1][6]),this._doFill&&this._pInst.fill(t[l+1][5]),l+2<d&&(this.drawingContext.lineTo(t[l+2][0],t[l+2][1]),this._doStroke&&this._pInst.stroke(t[l+2][6]),this._doFill&&this._pInst.fill(t[l+2][5])),this._doFillStrokeClose(c);else if(a===p.TRIANGLE_FAN){if(2<d){for(this.drawingContext.beginPath(),l=2;l<d;l++)s=t[l],this.drawingContext.moveTo(t[0][0],t[0][1]),this.drawingContext.lineTo(t[l-1][0],t[l-1][1]),this.drawingContext.lineTo(s[0],s[1]),this.drawingContext.lineTo(t[0][0],t[0][1]),l<d-1&&(this._doFill&&s[5]!==t[l+1][5]||this._doStroke&&s[6]!==t[l+1][6])&&(this._doFill&&(this._pInst.fill(s[5]),this.drawingContext.fill(),this._pInst.fill(t[l+1][5])),this._doStroke&&(this._pInst.stroke(s[6]),this.drawingContext.stroke(),this._pInst.stroke(t[l+1][6])),this.drawingContext.closePath(),this.drawingContext.beginPath());this._doFillStrokeClose(c)}}else if(a===p.QUADS)for(l=0;l+3<d;l+=4){for(s=t[l],this.drawingContext.beginPath(),this.drawingContext.moveTo(s[0],s[1]),u=1;u<4;u++)this.drawingContext.lineTo(t[l+u][0],t[l+u][1]);this.drawingContext.lineTo(s[0],s[1]),this._doFill&&this._pInst.fill(t[l+3][5]),this._doStroke&&this._pInst.stroke(t[l+3][6]),this._doFillStrokeClose(c)}else if(a===p.QUAD_STRIP){if(3<d)for(l=0;l+1<d;l+=2)s=t[l],this.drawingContext.beginPath(),l+3<d?(this.drawingContext.moveTo(t[l+2][0],t[l+2][1]),this.drawingContext.lineTo(s[0],s[1]),this.drawingContext.lineTo(t[l+1][0],t[l+1][1]),this.drawingContext.lineTo(t[l+3][0],t[l+3][1]),this._doFill&&this._pInst.fill(t[l+3][5]),this._doStroke&&this._pInst.stroke(t[l+3][6])):(this.drawingContext.moveTo(s[0],s[1]),this.drawingContext.lineTo(t[l+1][0],t[l+1][1])),this._doFillStrokeClose(c)}else{for(this.drawingContext.beginPath(),this.drawingContext.moveTo(t[0][0],t[0][1]),l=1;l<d;l++)(s=t[l]).isVert&&(s.moveTo?this.drawingContext.moveTo(s[0],s[1]):this.drawingContext.lineTo(s[0],s[1]));this._doFillStrokeClose(c)}else{for(this.drawingContext.beginPath(),l=0;l<d;l++)t[l].isVert?t[l].moveTo?this.drawingContext.moveTo(t[l][0],t[l][1]):this.drawingContext.lineTo(t[l][0],t[l][1]):this.drawingContext.quadraticCurveTo(t[l][0],t[l][1],t[l][2],t[l][3]);this._doFillStrokeClose(c)}else{for(this.drawingContext.beginPath(),l=0;l<d;l++)t[l].isVert?t[l].moveTo?this.drawingContext.moveTo(t[l][0],t[l][1]):this.drawingContext.lineTo(t[l][0],t[l][1]):this.drawingContext.bezierCurveTo(t[l][0],t[l][1],t[l][2],t[l][3],t[l][4],t[l][5]);this._doFillStrokeClose(c)}else if(3<d){var f=[],h=1-this._curveTightness;for(this.drawingContext.beginPath(),this.drawingContext.moveTo(t[1][0],t[1][1]),l=1;l+2<d;l++)s=t[l],f[0]=[s[0],s[1]],f[1]=[s[0]+(h*t[l+1][0]-h*t[l-1][0])/6,s[1]+(h*t[l+1][1]-h*t[l-1][1])/6],f[2]=[t[l+1][0]+(h*t[l][0]-h*t[l+2][0])/6,t[l+1][1]+(h*t[l][1]-h*t[l+2][1])/6],f[3]=[t[l+1][0],t[l+1][1]],this.drawingContext.bezierCurveTo(f[1][0],f[1][1],f[2][0],f[2][1],f[3][0],f[3][1]);c&&this.drawingContext.lineTo(t[l+1][0],t[l+1][1]),this._doFillStrokeClose(c)}return i=o=n=r=!1,c&&t.pop(),this},d.default.Renderer2D.prototype.strokeCap=function(e){return e!==p.ROUND&&e!==p.SQUARE&&e!==p.PROJECT||(this.drawingContext.lineCap=e),this},d.default.Renderer2D.prototype.strokeJoin=function(e){return e!==p.ROUND&&e!==p.BEVEL&&e!==p.MITER||(this.drawingContext.lineJoin=e),this},d.default.Renderer2D.prototype.strokeWeight=function(e){return this.drawingContext.lineWidth=void 0===e||0===e?1e-4:e,this},d.default.Renderer2D.prototype._getFill=function(){return this._cachedFillStyle||(this._cachedFillStyle=this.drawingContext.fillStyle),this._cachedFillStyle},d.default.Renderer2D.prototype._setFill=function(e){e!==this._cachedFillStyle&&(this.drawingContext.fillStyle=e,this._cachedFillStyle=e)},d.default.Renderer2D.prototype._getStroke=function(){return this._cachedStrokeStyle||(this._cachedStrokeStyle=this.drawingContext.strokeStyle),this._cachedStrokeStyle},d.default.Renderer2D.prototype._setStroke=function(e){e!==this._cachedStrokeStyle&&(this.drawingContext.strokeStyle=e,this._cachedStrokeStyle=e)},d.default.Renderer2D.prototype.bezier=function(e,t,r,n,o,i,a,s){return this._pInst.beginShape(),this._pInst.vertex(e,t),this._pInst.bezierVertex(r,n,o,i,a,s),this._pInst.endShape(),this},d.default.Renderer2D.prototype.curve=function(e,t,r,n,o,i,a,s){return this._pInst.beginShape(),this._pInst.curveVertex(e,t),this._pInst.curveVertex(r,n),this._pInst.curveVertex(o,i),this._pInst.curveVertex(a,s),this._pInst.endShape(),this},d.default.Renderer2D.prototype._doFillStrokeClose=function(e){e&&this.drawingContext.closePath(),this._doFill&&this.drawingContext.fill(),this._doStroke&&this.drawingContext.stroke()},d.default.Renderer2D.prototype.applyMatrix=function(e,t,r,n,o,i){this.drawingContext.transform(e,t,r,n,o,i)},d.default.Renderer2D.prototype.resetMatrix=function(){return this.drawingContext.setTransform(1,0,0,1,0,0),this.drawingContext.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),this},d.default.Renderer2D.prototype.rotate=function(e){this.drawingContext.rotate(e)},d.default.Renderer2D.prototype.scale=function(e,t){return this.drawingContext.scale(e,t),this},d.default.Renderer2D.prototype.translate=function(e,t){return e instanceof d.default.Vector&&(t=e.y,e=e.x),this.drawingContext.translate(e,t),this},d.default.Renderer2D.prototype.text=function(e,t,r,n,o){var i;void 0!==n&&this.drawingContext.textBaseline===p.BASELINE&&(i=!0,this.drawingContext.textBaseline=p.TOP);var a=d.default.Renderer.prototype.text.apply(this,arguments);return i&&(this.drawingContext.textBaseline=p.BASELINE),a},d.default.Renderer2D.prototype._renderText=function(e,t,r,n,o){if(!(o<=n))return e.push(),this._isOpenType()?this._textFont._renderPath(t,r,n,{renderer:this}):(this._doStroke&&this._strokeSet&&this.drawingContext.strokeText(t,r,n),this._doFill&&(this._fillSet||this._setFill(p._DEFAULT_TEXT_FILL),this.drawingContext.fillText(t,r,n))),e.pop(),e},d.default.Renderer2D.prototype.textWidth=function(e){return this._isOpenType()?this._textFont._textWidth(e,this._textSize):this.drawingContext.measureText(e).width},d.default.Renderer2D.prototype._applyTextProperties=function(){var e,t=this._pInst;return this._setProperty("_textAscent",null),this._setProperty("_textDescent",null),e=this._textFont,this._isOpenType()&&(e=this._textFont.font.familyName,this._setProperty("_textStyle",this._textFont.font.styleName)),this.drawingContext.font="".concat(this._textStyle||"normal"," ").concat(this._textSize||12,"px ").concat(e||"sans-serif"),this.drawingContext.textAlign=this._textAlign,this._textBaseline===p.CENTER?this.drawingContext.textBaseline=p._CTX_MIDDLE:this.drawingContext.textBaseline=this._textBaseline,t},d.default.Renderer2D.prototype.push=function(){return this.drawingContext.save(),d.default.Renderer.prototype.push.apply(this)},d.default.Renderer2D.prototype.pop=function(e){this.drawingContext.restore(),this._cachedFillStyle=this.drawingContext.fillStyle,this._cachedStrokeStyle=this.drawingContext.strokeStyle,d.default.Renderer.prototype.pop.call(this,e)};var o=d.default.Renderer2D;r.default=o},{"../image/filters":281,"./constants":250,"./main":260,"./p5.Renderer":263,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.fill":150,"core-js/modules/es.array.for-each":152,"core-js/modules/es.array.slice":160,"core-js/modules/es.function.name":163,"core-js/modules/es.number.to-fixed":169,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179}],265:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.assign"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.promise"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.iterator");var n,f=(n=e("./main"))&&n.__esModule?n:{default:n};f.default.prototype._promisePreloads=[];var h=!(f.default.prototype.registerPromisePreload=function(e){f.default.prototype._promisePreloads.push(e)});f.default.prototype._setupPromisePreloads=function(){var e=!0,t=!1,r=void 0;try{for(var n,o=this._promisePreloads[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value,a=this,s=i.method,l=i.addCallbacks,u=i.legacyPreloadSetup,c=i.target||this,d=c[s].bind(c);if(c===f.default.prototype){if(h)continue;a=null,d=c[s]}if(c[s]=this._wrapPromisePreload(a,d,l),u)c[u.method]=this._legacyPreloadGenerator(a,u,c[s])}}catch(e){t=!0,r=e}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}h=!0},f.default.prototype._wrapPromisePreload=function(e,l,u){var t=function(){var e=this;this._incrementPreload();for(var t=null,r=null,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];if(u)for(var a=o.length-1;0<=a&&!r&&"function"==typeof o[a];a--)r=t,t=o.pop();var s=Promise.resolve(l.apply(this,o));return t&&s.then(t),r&&s.catch(r),s.then(function(){return e._decrementPreload()}),s};return e&&(t=t.bind(e)),t};function i(){return{}}f.default.prototype._legacyPreloadGenerator=function(e,t,n){var o=t.createBaseObject||i,r=function(){var t=this;this._incrementPreload();var r=o.apply(this,arguments);return n.apply(this,arguments).then(function(e){Object.assign(r,e),t._decrementPreload()}),r};return e&&(r=r.bind(e)),r}},{"./main":260,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.assign":170,"core-js/modules/es.object.to-string":174,"core-js/modules/es.promise":175,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],266:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,l=(n=e("./main"))&&n.__esModule?n:{default:n},u=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==s(e)&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("./constants"));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("./p5.Graphics"),e("./p5.Renderer2D"),e("../webgl/p5.RendererGL");var c="defaultCanvas0";l.default.prototype.createCanvas=function(e,t,r){l.default._validateParameters("createCanvas",arguments);var n,o=r||u.P2D;if(o===u.WEBGL){if(n=document.getElementById(c)){n.parentNode.removeChild(n);var i=this._renderer;this._elements=this._elements.filter(function(e){return e!==i})}(n=document.createElement("canvas")).id=c,n.classList.add("p5Canvas")}else if(this._defaultGraphicsCreated)n=this.canvas;else{n=document.createElement("canvas");for(var a=0;document.getElementById("defaultCanvas".concat(a));)a++;c="defaultCanvas".concat(a),n.id=c,n.classList.add("p5Canvas")}if(this._setupDone||(n.dataset.hidden=!0,n.style.visibility="hidden"),this._userNode)this._userNode.appendChild(n);else{if(0===document.getElementsByTagName("main").length){var s=document.createElement("main");document.body.appendChild(s)}document.getElementsByTagName("main")[0].appendChild(n)}return o===u.WEBGL?(this._setProperty("_renderer",new l.default.RendererGL(n,this,!0)),this._elements.push(this._renderer)):this._defaultGraphicsCreated||(this._setProperty("_renderer",new l.default.Renderer2D(n,this,!0)),this._defaultGraphicsCreated=!0,this._elements.push(this._renderer)),this._renderer.resize(e,t),this._renderer._applyDefaults(),this._renderer},l.default.prototype.resizeCanvas=function(e,t,r){if(l.default._validateParameters("resizeCanvas",arguments),this._renderer){var n={};for(var o in this.drawingContext){var i=this.drawingContext[o];"object"!==s(i)&&"function"!=typeof i&&(n[o]=i)}for(var a in this._renderer.resize(e,t),this.width=e,this.height=t,n)try{this.drawingContext[a]=n[a]}catch(e){}r||this.redraw()}this._addAccsOutput()&&this._updateAccsOutput()},l.default.prototype.noCanvas=function(){this.canvas&&this.canvas.parentNode.removeChild(this.canvas)},l.default.prototype.createGraphics=function(e,t,r){return l.default._validateParameters("createGraphics",arguments),new l.default.Graphics(e,t,r,this)},l.default.prototype.blendMode=function(e){l.default._validateParameters("blendMode",arguments),e===u.NORMAL&&(console.warn("NORMAL has been deprecated for use in blendMode. defaulting to BLEND instead."),e=u.BLEND),this._renderer.blendMode(e)};var o=l.default;r.default=o},{"../webgl/p5.RendererGL":314,"./constants":250,"./main":260,"./p5.Graphics":262,"./p5.Renderer2D":264,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],267:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.slice"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var c=n(e("../main")),s=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../constants")),d=n(e("../helpers"));function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function n(e){return e&&e.__esModule?e:{default:e}}e("../friendly_errors/fes_core"),e("../friendly_errors/file_errors"),e("../friendly_errors/validate_params"),c.default.prototype._normalizeArcAngles=function(e,t,r,n,o){var i;return e-=s.TWO_PI*Math.floor(e/s.TWO_PI),t-=s.TWO_PI*Math.floor(t/s.TWO_PI),i=Math.min(Math.abs(e-t),s.TWO_PI-Math.abs(e-t)),o&&(e=e<=s.HALF_PI?Math.atan(r/n*Math.tan(e)):e>s.HALF_PI&&e<=3*s.HALF_PI?Math.atan(r/n*Math.tan(e))+s.PI:Math.atan(r/n*Math.tan(e))+s.TWO_PI,t=t<=s.HALF_PI?Math.atan(r/n*Math.tan(t)):t>s.HALF_PI&&t<=3*s.HALF_PI?Math.atan(r/n*Math.tan(t))+s.PI:Math.atan(r/n*Math.tan(t))+s.TWO_PI),t<e&&(t+=s.TWO_PI),{start:e,stop:t,correspondToSamePoint:i<1e-5}},c.default.prototype.arc=function(e,t,r,n,o,i,a,s){if(c.default._validateParameters("arc",arguments),!this._renderer._doStroke&&!this._renderer._doFill)return this;if(o===i)return this;o=this._toRadians(o),i=this._toRadians(i),r=Math.abs(r),n=Math.abs(n);var l=d.default.modeAdjust(e,t,r,n,this._renderer._ellipseMode),u=this._normalizeArcAngles(o,i,l.w,l.h,!0);return u.correspondToSamePoint?this._renderer.ellipse([l.x,l.y,l.w,l.h,s]):(this._renderer.arc(l.x,l.y,l.w,l.h,u.start,u.stop,a,s),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("arc",[l.x,l.y,l.w,l.h,u.start,u.stop,a])),this},c.default.prototype.ellipse=function(e,t,r,n,o){return c.default._validateParameters("ellipse",arguments),this._renderEllipse.apply(this,arguments)},c.default.prototype.circle=function(){c.default._validateParameters("circle",arguments);var e=Array.prototype.slice.call(arguments,0,2);return e.push(arguments[2]),e.push(arguments[2]),this._renderEllipse.apply(this,e)},c.default.prototype._renderEllipse=function(e,t,r,n,o){if(!this._renderer._doStroke&&!this._renderer._doFill)return this;r<0&&(r=Math.abs(r)),void 0===n?n=r:n<0&&(n=Math.abs(n));var i=d.default.modeAdjust(e,t,r,n,this._renderer._ellipseMode);return this._renderer.ellipse([i.x,i.y,i.w,i.h,o]),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("ellipse",[i.x,i.y,i.w,i.h]),this},c.default.prototype.line=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;c.default._validateParameters("line",t),this._renderer._doStroke&&(n=this._renderer).line.apply(n,t);return(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("line",t),this},c.default.prototype.point=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;c.default._validateParameters("point",t),this._renderer._doStroke&&(1===t.length&&t[0]instanceof c.default.Vector?this._renderer.point.call(this._renderer,t[0].x,t[0].y,t[0].z):((n=this._renderer).point.apply(n,t),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("point",t)));return this},c.default.prototype.quad=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;c.default._validateParameters("quad",t),(this._renderer._doStroke||this._renderer._doFill)&&(this._renderer.isP3D&&t.length<=12?this._renderer.quad.call(this._renderer,t[0],t[1],0,t[2],t[3],0,t[4],t[5],0,t[6],t[7],0,t[8],t[9]):((n=this._renderer).quad.apply(n,t),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("quadrilateral",t)));return this},c.default.prototype.rect=function(){return c.default._validateParameters("rect",arguments),this._renderRect.apply(this,arguments)},c.default.prototype.square=function(e,t,r,n,o,i,a){return c.default._validateParameters("square",arguments),this._renderRect.call(this,e,t,r,r,n,o,i,a)},c.default.prototype._renderRect=function(){if(this._renderer._doStroke||this._renderer._doFill){3===arguments.length&&(arguments[3]=arguments[2]);for(var e=d.default.modeAdjust(arguments[0],arguments[1],arguments[2],arguments[3],this._renderer._rectMode),t=[e.x,e.y,e.w,e.h],r=4;r<arguments.length;r++)t[r]=arguments[r];this._renderer.rect(t),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("rectangle",[e.x,e.y,e.w,e.h])}return this},c.default.prototype.triangle=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return c.default._validateParameters("triangle",t),(this._renderer._doStroke||this._renderer._doFill)&&this._renderer.triangle(t),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._accsOutput("triangle",t),this};var o=c.default;r.default=o},{"../constants":250,"../friendly_errors/fes_core":252,"../friendly_errors/file_errors":253,"../friendly_errors/validate_params":255,"../helpers":256,"../main":260,"core-js/modules/es.array.slice":160}],268:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../main"))&&n.__esModule?n:{default:n},i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}o.default.prototype.ellipseMode=function(e){return o.default._validateParameters("ellipseMode",arguments),e!==i.CORNER&&e!==i.CORNERS&&e!==i.RADIUS&&e!==i.CENTER||(this._renderer._ellipseMode=e),this},o.default.prototype.noSmooth=function(){return this.setAttributes("antialias",!1),this._renderer.isP3D||"imageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.imageSmoothingEnabled=!1),this},o.default.prototype.rectMode=function(e){return o.default._validateParameters("rectMode",arguments),e!==i.CORNER&&e!==i.CORNERS&&e!==i.RADIUS&&e!==i.CENTER||(this._renderer._rectMode=e),this},o.default.prototype.smooth=function(){return this.setAttributes("antialias",!0),this._renderer.isP3D||"imageSmoothingEnabled"in this.drawingContext&&(this.drawingContext.imageSmoothingEnabled=!0),this},o.default.prototype.strokeCap=function(e){return o.default._validateParameters("strokeCap",arguments),e!==i.ROUND&&e!==i.SQUARE&&e!==i.PROJECT||this._renderer.strokeCap(e),this},o.default.prototype.strokeJoin=function(e){return o.default._validateParameters("strokeJoin",arguments),e!==i.ROUND&&e!==i.BEVEL&&e!==i.MITER||this._renderer.strokeJoin(e),this},o.default.prototype.strokeWeight=function(e){return o.default._validateParameters("strokeWeight",arguments),this._renderer.strokeWeight(e),this};var l=o.default;r.default=l},{"../constants":250,"../main":260}],269:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("../main"))&&n.__esModule?n:{default:n};e("../friendly_errors/fes_core"),e("../friendly_errors/file_errors"),e("../friendly_errors/validate_params"),s.default.prototype.bezier=function(){for(var e,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return s.default._validateParameters("bezier",r),(this._renderer._doStroke||this._renderer._doFill)&&(e=this._renderer).bezier.apply(e,r),this},s.default.prototype.bezierDetail=function(e){return s.default._validateParameters("bezierDetail",arguments),this._bezierDetail=e,this},s.default.prototype.bezierPoint=function(e,t,r,n,o){s.default._validateParameters("bezierPoint",arguments);var i=1-o;return Math.pow(i,3)*e+3*Math.pow(i,2)*o*t+3*i*Math.pow(o,2)*r+Math.pow(o,3)*n},s.default.prototype.bezierTangent=function(e,t,r,n,o){s.default._validateParameters("bezierTangent",arguments);var i=1-o;return 3*n*Math.pow(o,2)-3*r*Math.pow(o,2)+6*r*i*o-6*t*i*o+3*t*Math.pow(i,2)-3*e*Math.pow(i,2)},s.default.prototype.curve=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;s.default._validateParameters("curve",t),this._renderer._doStroke&&(n=this._renderer).curve.apply(n,t);return this},s.default.prototype.curveDetail=function(e){return s.default._validateParameters("curveDetail",arguments),this._curveDetail=e<3?3:e,this},s.default.prototype.curveTightness=function(e){return s.default._validateParameters("curveTightness",arguments),this._renderer._curveTightness=e,this},s.default.prototype.curvePoint=function(e,t,r,n,o){s.default._validateParameters("curvePoint",arguments);var i=o*o*o,a=o*o;return e*(-.5*i+a-.5*o)+t*(1.5*i-2.5*a+1)+r*(-1.5*i+2*a+.5*o)+n*(.5*i-.5*a)},s.default.prototype.curveTangent=function(e,t,r,n,o){s.default._validateParameters("curveTangent",arguments);var i=o*o;return e*(-3*i/2+2*o-.5)+t*(9*i/2-5*o)+r*(-9*i/2+4*o+.5)+n*(3*i/2-o)};var o=s.default;r.default=o},{"../friendly_errors/fes_core":252,"../friendly_errors/file_errors":253,"../friendly_errors/validate_params":255,"../main":260}],270:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.slice"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("../main"))&&n.__esModule?n:{default:n},l=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../constants"));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}var o=null,c=[],d=[],f=!1,i=!1,h=!1,p=!1,y=!0;s.default.prototype.beginContour=function(){return d=[],p=!0,this},s.default.prototype.beginShape=function(e){var t;(s.default._validateParameters("beginShape",arguments),this._renderer.isP3D)?(t=this._renderer).beginShape.apply(t,arguments):(o=e===l.POINTS||e===l.LINES||e===l.TRIANGLES||e===l.TRIANGLE_FAN||e===l.TRIANGLE_STRIP||e===l.QUADS||e===l.QUAD_STRIP?e:null,c=[],d=[]);return this},s.default.prototype.bezierVertex=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;if(s.default._validateParameters("bezierVertex",t),this._renderer.isP3D)(n=this._renderer).bezierVertex.apply(n,t);else if(0===c.length)s.default._friendlyError("vertex() must be used once before calling bezierVertex()","bezierVertex");else{f=!0;for(var o=[],i=0;i<t.length;i++)o[i]=t[i];o.isVert=!1,p?d.push(o):c.push(o)}return this},s.default.prototype.curveVertex=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;(s.default._validateParameters("curveVertex",t),this._renderer.isP3D)?(n=this._renderer).curveVertex.apply(n,t):(i=!0,this.vertex(t[0],t[1]));return this},s.default.prototype.endContour=function(){var e=d[0].slice();e.isVert=d[0].isVert,e.moveTo=!1,d.push(e),y&&(c.push(c[0]),y=!1);for(var t=0;t<d.length;t++)c.push(d[t]);return this},s.default.prototype.endShape=function(e){if(s.default._validateParameters("endShape",arguments),this._renderer.isP3D)this._renderer.endShape(e,i,f,h,p,o);else{if(0===c.length)return this;if(!this._renderer._doStroke&&!this._renderer._doFill)return this;var t=e===l.CLOSE;t&&!p&&c.push(c[0]),this._renderer.endShape(e,c,i,f,h,p,o),y=!(p=h=f=i=!1),t&&c.pop()}return this},s.default.prototype.quadraticVertex=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];if(s.default._validateParameters("quadraticVertex",t),this._renderer.isP3D){var n;(n=this._renderer).quadraticVertex.apply(n,t)}else{if(this._contourInited){var o={};return o.x=t[0],o.y=t[1],o.x3=t[2],o.y3=t[3],o.type=l.QUADRATIC,this._contourVertices.push(o),this}if(0<c.length){h=!0;for(var i=[],a=0;a<t.length;a++)i[a]=t[a];i.isVert=!1,p?d.push(i):c.push(i)}else s.default._friendlyError("vertex() must be used once before calling quadraticVertex()","quadraticVertex")}return this},s.default.prototype.vertex=function(e,t,r,n,o){if(this._renderer.isP3D){var i;(i=this._renderer).vertex.apply(i,arguments)}else{var a=[];a.isVert=!0,a[0]=e,a[1]=t,a[2]=0,a[3]=0,a[4]=0,a[5]=this._renderer._getFill(),a[6]=this._renderer._getStroke(),r&&(a.moveTo=r),p?(0===d.length&&(a.moveTo=!0),d.push(a)):c.push(a)}return this};var m=s.default;r.default=m},{"../constants":250,"../main":260,"core-js/modules/es.array.slice":160}],271:[function(e,t,r){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.assign"),e("core-js/modules/es.object.keys"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.typed-array.uint8-clamped-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.iterator"),window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)},"undefined"==typeof Uint8ClampedArray||Uint8ClampedArray.prototype.slice||Object.defineProperty(Uint8ClampedArray.prototype,"slice",{value:Array.prototype.slice,writable:!0,configurable:!0,enumerable:!1}),function(){if(!Object.assign){var s=Object.keys,e=Object.defineProperty,l="function"==typeof Symbol&&"symbol"===n(Symbol()),r=Object.prototype.propertyIsEnumerable,u=function(t){return function(e){return r.call(t,e)}};e(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("target must be an object");var r,n,o,i,a=Object(e);for(r=1;r<arguments.length;++r)for(n=Object(arguments[r]),i=s(n),l&&Object.getOwnPropertySymbols&&i.push.apply(i,Object.getOwnPropertySymbols(n).filter(u(n))),o=0;o<i.length;++o)a[i[o]]=n[i[o]];return a},configurable:!0,enumerable:!1,writable:!0})}}()},{"core-js/modules/es.array.filter":151,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.assign":170,"core-js/modules/es.object.keys":173,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint8-clamped-array":224,"core-js/modules/web.dom-collections.iterator":226}],272:[function(e,t,r){"use strict";e("core-js/modules/es.array.for-each"),e("core-js/modules/es.object.assign"),e("core-js/modules/web.dom-collections.for-each"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("./main"))&&n.__esModule?n:{default:n};o.default.prototype.noLoop=function(){this._loop=!1},o.default.prototype.loop=function(){this._loop||(this._loop=!0,this._setupDone&&this._draw())},o.default.prototype.isLooping=function(){return this._loop},o.default.prototype.push=function(){this._styles.push({props:{_colorMode:this._colorMode},renderer:this._renderer.push()})},o.default.prototype.pop=function(){var e=this._styles.pop();e?(this._renderer.pop(e.renderer),Object.assign(this,e.props)):console.warn("pop() was called without matching push()")},o.default.prototype.redraw=function(e){if(!this._inUserDraw&&this._setupDone){var t=parseInt(e);(isNaN(t)||t<1)&&(t=1);var r=this._isGlobal?window:this;if("function"==typeof r.draw){void 0===r.setup&&r.scale(r._pixelDensity,r._pixelDensity);for(var n=function(e){e.call(r)},o=0;o<t;o++){r.resetMatrix(),(this._accessibleOutputs.grid||this._accessibleOutputs.text)&&this._updateAccsOutput(),r._renderer.isP3D&&r._renderer._update(),r._setProperty("frameCount",r.frameCount+1),r._registeredMethods.pre.forEach(n),this._inUserDraw=!0;try{r.draw()}finally{this._inUserDraw=!1}r._registeredMethods.post.forEach(n)}}}};var i=o.default;r.default=i},{"./main":260,"core-js/modules/es.array.for-each":152,"core-js/modules/es.object.assign":170,"core-js/modules/web.dom-collections.for-each":225}],273:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.from"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.get-prototype-of"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,i=(n=e("./main"))&&n.__esModule?n:{default:n};function o(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}i.default.prototype.applyMatrix=function(){var e,t,r=arguments[0]instanceof Object.getPrototypeOf(Uint8Array);Array.isArray(arguments[0])||r?(e=this._renderer).applyMatrix.apply(e,o(arguments[0])):(t=this._renderer).applyMatrix.apply(t,arguments);return this},i.default.prototype.resetMatrix=function(){return this._renderer.resetMatrix(),this},i.default.prototype.rotate=function(e,t){return i.default._validateParameters("rotate",arguments),this._renderer.rotate(this._toRadians(e),t),this},i.default.prototype.rotateX=function(e){return this._assert3d("rotateX"),i.default._validateParameters("rotateX",arguments),this._renderer.rotateX(this._toRadians(e)),this},i.default.prototype.rotateY=function(e){return this._assert3d("rotateY"),i.default._validateParameters("rotateY",arguments),this._renderer.rotateY(this._toRadians(e)),this},i.default.prototype.rotateZ=function(e){return this._assert3d("rotateZ"),i.default._validateParameters("rotateZ",arguments),this._renderer.rotateZ(this._toRadians(e)),this},i.default.prototype.scale=function(e,t,r){if(i.default._validateParameters("scale",arguments),e instanceof i.default.Vector){var n=e;e=n.x,t=n.y,r=n.z}else if(e instanceof Array){var o=e;e=o[0],t=o[1],r=o[2]||1}return isNaN(t)?t=r=e:isNaN(r)&&(r=1),this._renderer.scale.call(this._renderer,e,t,r),this},i.default.prototype.shearX=function(e){i.default._validateParameters("shearX",arguments);var t=this._toRadians(e);return this._renderer.applyMatrix(1,0,Math.tan(t),1,0,0),this},i.default.prototype.shearY=function(e){i.default._validateParameters("shearY",arguments);var t=this._toRadians(e);return this._renderer.applyMatrix(1,Math.tan(t),0,1,0,0),this},i.default.prototype.translate=function(e,t,r){return i.default._validateParameters("translate",arguments),this._renderer.isP3D?this._renderer.translate(e,t,r):this._renderer.translate(e,t),this};var a=i.default;r.default=a},{"./main":260,"core-js/modules/es.array.from":153,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.get-prototype-of":172,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint8-array":223,"core-js/modules/web.dom-collections.iterator":226}],274:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.from"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.ends-with"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.iterator");var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};function i(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}o.default.prototype.storeItem=function(e,t){"string"!=typeof e&&console.log("The argument that you passed to storeItem() - ".concat(e," is not a string.")),e.endsWith("p5TypeID")&&console.log("The argument that you passed to storeItem() - ".concat(e," must not end with 'p5TypeID'.")),void 0===t&&console.log("You cannot store undefined variables using storeItem().");var r=a(t);switch(r){case"number":case"boolean":t=t.toString();break;case"object":if(t instanceof o.default.Color)r="p5.Color";else if(t instanceof o.default.Vector){r="p5.Vector",t=[t.x,t.y,t.z]}t=JSON.stringify(t)}localStorage.setItem(e,t);var n="".concat(e,"p5TypeID");localStorage.setItem(n,r)},o.default.prototype.getItem=function(e){var t=localStorage.getItem(e),r=localStorage.getItem("".concat(e,"p5TypeID"));if(void 0===r)console.log("Unable to determine type of item stored under ".concat(e,"in local storage. Did you save the item with something other than setItem()?"));else if(null!==t)switch(r){case"number":t=parseFloat(t);break;case"boolean":t="true"===t;break;case"object":t=JSON.parse(t);break;case"p5.Color":t=JSON.parse(t),t=this.color.apply(this,i(t.levels));break;case"p5.Vector":t=JSON.parse(t),t=this.createVector.apply(this,i(t))}return t},o.default.prototype.clearStorage=function(){localStorage.clear()},o.default.prototype.removeItem=function(e){"string"!=typeof e&&console.log("The argument that you passed to removeItem() - ".concat(e," is not a string.")),localStorage.removeItem(e),localStorage.removeItem("".concat(e,"p5TypeID"))}},{"../core/main":260,"core-js/modules/es.array.from":153,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.ends-with":181,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],275:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.object.keys"),e("core-js/modules/es.string.sub"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.createStringDict=function(e,t){return o.default._validateParameters("createStringDict",arguments),new o.default.StringDict(e,t)},o.default.prototype.createNumberDict=function(e,t){return o.default._validateParameters("createNumberDict",arguments),new o.default.NumberDict(e,t)},o.default.TypedDict=function(e,t){return e instanceof Object?this.data=e:(this.data={},this.data[e]=t),this},o.default.TypedDict.prototype.size=function(){return Object.keys(this.data).length},o.default.TypedDict.prototype.hasKey=function(e){return this.data.hasOwnProperty(e)},o.default.TypedDict.prototype.get=function(e){if(this.data.hasOwnProperty(e))return this.data[e];console.log("".concat(e," does not exist in this Dictionary"))},o.default.TypedDict.prototype.set=function(e,t){this._validate(t)?this.data[e]=t:console.log("Those values dont work for this dictionary type.")},o.default.TypedDict.prototype._addObj=function(e){for(var t in e)this.set(t,e[t])},o.default.TypedDict.prototype.create=function(e,t){e instanceof Object&&void 0===t?this._addObj(e):void 0!==e?this.set(e,t):console.log("In order to create a new Dictionary entry you must pass an object or a key, value pair")},o.default.TypedDict.prototype.clear=function(){this.data={}},o.default.TypedDict.prototype.remove=function(e){if(!this.data.hasOwnProperty(e))throw new Error("".concat(e," does not exist in this Dictionary"));delete this.data[e]},o.default.TypedDict.prototype.print=function(){for(var e in this.data)console.log("key:".concat(e," value:").concat(this.data[e]))},o.default.TypedDict.prototype.saveTable=function(e){var t="";for(var r in this.data)t+="".concat(r,",").concat(this.data[r],"\n");var n=new Blob([t],{type:"text/csv"});o.default.prototype.downloadFile(n,e||"mycsv","csv")},o.default.TypedDict.prototype.saveJSON=function(e,t){o.default.prototype.saveJSON(this.data,e,t)},o.default.TypedDict.prototype._validate=function(e){return!0},o.default.StringDict=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.default.TypedDict.apply(this,t)},o.default.StringDict.prototype=Object.create(o.default.TypedDict.prototype),o.default.StringDict.prototype._validate=function(e){return"string"==typeof e},o.default.NumberDict=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.default.TypedDict.apply(this,t)},o.default.NumberDict.prototype=Object.create(o.default.TypedDict.prototype),o.default.NumberDict.prototype._validate=function(e){return"number"==typeof e},o.default.NumberDict.prototype.add=function(e,t){this.data.hasOwnProperty(e)?this.data[e]+=t:console.log("The key - ".concat(e," does not exist in this dictionary."))},o.default.NumberDict.prototype.sub=function(e,t){this.add(e,-t)},o.default.NumberDict.prototype.mult=function(e,t){this.data.hasOwnProperty(e)?this.data[e]*=t:console.log("The key - ".concat(e," does not exist in this dictionary."))},o.default.NumberDict.prototype.div=function(e,t){this.data.hasOwnProperty(e)?this.data[e]/=t:console.log("The key - ".concat(e," does not exist in this dictionary."))},o.default.NumberDict.prototype._valueTest=function(e){if(0===Object.keys(this.data).length)throw new Error("Unable to search for a minimum or maximum value on an empty NumberDict");if(1===Object.keys(this.data).length)return this.data[Object.keys(this.data)[0]];var t=this.data[Object.keys(this.data)[0]];for(var r in this.data)this.data[r]*e<t*e&&(t=this.data[r]);return t},o.default.NumberDict.prototype.minValue=function(){return this._valueTest(1)},o.default.NumberDict.prototype.maxValue=function(){return this._valueTest(-1)},o.default.NumberDict.prototype._keyTest=function(e){if(0===Object.keys(this.data).length)throw new Error("Unable to use minValue on an empty NumberDict");if(1===Object.keys(this.data).length)return Object.keys(this.data)[0];for(var t=Object.keys(this.data)[0],r=1;r<Object.keys(this.data).length;r++)Object.keys(this.data)[r]*e<t*e&&(t=Object.keys(this.data)[r]);return t},o.default.NumberDict.prototype.minKey=function(){return this._keyTest(1)},o.default.NumberDict.prototype.maxKey=function(){return this._keyTest(-1)};var i=o.default.TypedDict;r.default=i},{"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.object.keys":173,"core-js/modules/es.string.sub":189}],276:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.every"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.for-each"),e("core-js/modules/es.array.from"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.array.splice"),e("core-js/modules/es.function.name"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.promise"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.split"),e("core-js/modules/es.string.trim"),e("core-js/modules/web.dom-collections.for-each"),e("core-js/modules/web.dom-collections.iterator"),e("core-js/modules/web.url"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,f=(n=e("../core/main"))&&n.__esModule?n:{default:n};function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t,r){(t._userNode?t._userNode:document.body).appendChild(e);var n=r?new f.default.MediaElement(e,t):new f.default.Element(e,t);return t._elements.push(n),n}function o(e,t,r,n){var o=document.createElement(t);"string"==typeof(r=r||"")&&(r=[r]);var i=!0,a=!1,s=void 0;try{for(var l,u=r[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var c=l.value,d=document.createElement("source");d.setAttribute("src",c),o.appendChild(d)}}catch(e){a=!0,s=e}finally{try{i||null==u.return||u.return()}finally{if(a)throw s}}if("function"==typeof n){o.addEventListener("canplaythrough",function e(){n(),o.removeEventListener("canplaythrough",e)})}var f=y(o,e,!0);return f.loadedmetadata=!1,o.addEventListener("loadedmetadata",function(){f.width=o.videoWidth,f.height=o.videoHeight,0===f.elt.width&&(f.elt.width=o.videoWidth),0===f.elt.height&&(f.elt.height=o.videoHeight),f.presetPlaybackRate&&(f.elt.playbackRate=f.presetPlaybackRate,delete f.presetPlaybackRate),f.loadedmetadata=!0}),f}f.default.prototype.select=function(e,t){f.default._validateParameters("select",arguments);var r=this._getContainer(t).querySelector(e);return r?this._wrapElement(r):null},f.default.prototype.selectAll=function(e,t){f.default._validateParameters("selectAll",arguments);var r=[],n=this._getContainer(t).querySelectorAll(e);if(n)for(var o=0;o<n.length;o++){var i=this._wrapElement(n[o]);r.push(i)}return r},f.default.prototype._getContainer=function(e){var t=document;return"string"==typeof e?t=document.querySelector(e)||document:e instanceof f.default.Element?t=e.elt:e instanceof HTMLElement&&(t=e),t},f.default.prototype._wrapElement=function(e){var t=Array.prototype.slice.call(e.children);if("INPUT"!==e.tagName||"checkbox"!==e.type)return"VIDEO"===e.tagName||"AUDIO"===e.tagName?new f.default.MediaElement(e,this):"SELECT"===e.tagName?this.createSelect(new f.default.Element(e,this)):0<t.length&&t.every(function(e){return"INPUT"===e.tagName||"LABEL"===e.tagName})?this.createRadio(new f.default.Element(e,this)):new f.default.Element(e,this);var r=new f.default.Element(e,this);return r.checked=function(){return 0===arguments.length?this.elt.checked:(this.elt.checked=!!arguments[0],this)},r},f.default.prototype.removeElements=function(e){f.default._validateParameters("removeElements",arguments);this._elements.filter(function(e){return!(e.elt instanceof HTMLCanvasElement)}).map(function(e){return e.remove()})},f.default.Element.prototype.changed=function(e){return f.default.Element._adjustListener("change",e,this),this},f.default.Element.prototype.input=function(e){return f.default.Element._adjustListener("input",e,this),this},f.default.prototype.createDiv=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=document.createElement("div");return t.innerHTML=e,y(t,this)},f.default.prototype.createP=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=document.createElement("p");return t.innerHTML=e,y(t,this)},f.default.prototype.createSpan=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=document.createElement("span");return t.innerHTML=e,y(t,this)},f.default.prototype.createImg=function(){f.default._validateParameters("createImg",arguments);var t,r=document.createElement("img"),n=arguments;return 1<n.length&&"string"==typeof n[1]&&(r.alt=n[1]),2<n.length&&"string"==typeof n[2]&&(r.crossOrigin=n[2]),r.src=n[0],t=y(r,this),r.addEventListener("load",function(){t.width=r.offsetWidth||r.width,t.height=r.offsetHeight||r.height;var e=n[n.length-1];"function"==typeof e&&e(t)}),t},f.default.prototype.createA=function(e,t,r){f.default._validateParameters("createA",arguments);var n=document.createElement("a");return n.href=e,n.innerHTML=t,r&&(n.target=r),y(n,this)},f.default.prototype.createSlider=function(e,t,r,n){f.default._validateParameters("createSlider",arguments);var o=document.createElement("input");return o.type="range",o.min=e,o.max=t,0===n?o.step=1e-18:n&&(o.step=n),"number"==typeof r&&(o.value=r),y(o,this)},f.default.prototype.createButton=function(e,t){f.default._validateParameters("createButton",arguments);var r=document.createElement("button");return r.innerHTML=e,t&&(r.value=t),y(r,this)},f.default.prototype.createCheckbox=function(){f.default._validateParameters("createCheckbox",arguments);var e=document.createElement("div"),t=document.createElement("input");t.type="checkbox",e.appendChild(t);var r=y(e,this);if(r.checked=function(){var e=r.elt.getElementsByTagName("input")[0];if(e){if(0===arguments.length)return e.checked;e.checked=!!arguments[0]}return r},this.value=function(e){return r.value=e,this},arguments[0]){var n=Math.random().toString(36).slice(2),o=document.createElement("label");t.setAttribute("id",n),o.htmlFor=n,r.value(arguments[0]),o.appendChild(document.createTextNode(arguments[0])),e.appendChild(o)}return arguments[1]&&(t.checked=!0),r},f.default.prototype.createSelect=function(){var e;f.default._validateParameters("createSelect",arguments);var t=arguments[0];if(t instanceof f.default.Element&&t.elt instanceof HTMLSelectElement)e=t,this.elt=t.elt;else if(t instanceof HTMLSelectElement)e=y(t,this),this.elt=t;else{var r=document.createElement("select");t&&"boolean"==typeof t&&r.setAttribute("multiple","true"),e=y(r,this),this.elt=r}return e.option=function(e,t){var r;if(void 0!==e){for(var n=0;n<this.elt.length;n+=1)if(this.elt[n].innerHTML===e){r=n;break}if(void 0!==r)!1===t?this.elt.remove(r):this.elt[r].value=t;else{var o=document.createElement("option");o.innerHTML=e,o.value=void 0===t?e:t,this.elt.appendChild(o),this._pInst._elements.push(o)}}},e.selected=function(e){if(void 0!==e){for(var t=0;t<this.elt.length;t+=1)this.elt[t].value.toString()===e.toString()&&(this.elt.selectedIndex=t);return this}if(this.elt.getAttribute("multiple")){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=this.elt.selectedOptions[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var l=a.value;r.push(l.value)}}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}return this.elt.value},e.disable=function(e){if("string"==typeof e)for(var t=0;t<this.elt.length;t++)this.elt[t].value.toString()===e&&(this.elt[t].disabled=!0,this.elt[t].selected=!1);else this.elt.disabled=!0;return this},e},f.default.prototype.createRadio=function(){var e,t,r=arguments[0];r instanceof HTMLDivElement||r instanceof HTMLSpanElement?(e=r,"string"==typeof arguments[1]&&(t=arguments[1])):("string"==typeof r&&(t=r),e=document.createElement("div"));var p=y(this.elt=e,this);p._name=t||"radioOption";function n(e){return e instanceof HTMLInputElement&&"radio"===e.type}function c(e){return e.nextElementSibling instanceof HTMLLabelElement}return p._getOptionsArray=function(){return Array.from(this.elt.children).filter(n)},p.option=function(e,t){var r,n,o=!0,i=!1,a=void 0;try{for(var s,l=p._getOptionsArray()[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){var u=s.value;if(u.value===e){r=u;break}}}catch(e){i=!0,a=e}finally{try{o||null==l.return||l.return()}finally{if(i)throw a}}return void 0===r&&((r=document.createElement("input")).setAttribute("type","radio"),r.setAttribute("value",e),this.elt.appendChild(r)),c(r)?n=r.nextElementSibling:(n=document.createElement("label"),r.insertAdjacentElement("afterend",n)),n.innerHTML=void 0===t?e:t,r.setAttribute("name",p._name),r},p.remove=function(e){var t=!0,r=!1,n=void 0;try{for(var o,i=p._getOptionsArray()[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;if(a.value===e)return c(a)&&a.nextElementSibling.remove(),void a.remove()}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}},p.value=function(){var e="",t=!0,r=!1,n=void 0;try{for(var o,i=p._getOptionsArray()[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;if(a.checked){e=a.value;break}}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}return e},p.selected=function(e){var t=null;if(void 0===e){var r=!0,n=!1,o=void 0;try{for(var i,a=p._getOptionsArray()[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value;if(s.checked){t=s;break}}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}}else{var l=!0,u=!1,c=void 0;try{for(var d,f=p._getOptionsArray()[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var h=d.value;h.value===e&&(h.setAttribute("checked",!0),t=h)}}catch(e){u=!0,c=e}finally{try{l||null==f.return||f.return()}finally{if(u)throw c}}}return t},p.disable=function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=!0,r=!1,n=void 0;try{for(var o,i=p._getOptionsArray()[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){o.value.setAttribute("disabled",e)}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}},p},f.default.prototype.createColorPicker=function(e){f.default._validateParameters("createColorPicker",arguments);var t,r=document.createElement("input");return r.type="color",e?e instanceof f.default.Color?r.value=e.toString("#rrggbb"):(f.default.prototype._colorMode="rgb",f.default.prototype._colorMaxes={rgb:[255,255,255,255],hsb:[360,100,100,1],hsl:[360,100,100,1]},r.value=f.default.prototype.color(e).toString("#rrggbb")):r.value="#000000",(t=y(r,this)).color=function(){return e&&(e.mode&&(f.default.prototype._colorMode=e.mode),e.maxes&&(f.default.prototype._colorMaxes=e.maxes)),f.default.prototype.color(this.elt.value)},t},f.default.prototype.createInput=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"text";f.default._validateParameters("createInput",arguments);var r=document.createElement("input");return r.setAttribute("value",e),r.setAttribute("type",t),y(r,this)},f.default.prototype.createFileInput=function(s){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];f.default._validateParameters("createFileInput",arguments);if(window.File&&window.FileReader&&window.FileList&&window.Blob){var t=document.createElement("input");return t.setAttribute("type","file"),e&&t.setAttribute("multiple",!0),t.addEventListener("change",function(e){var t=!0,r=!1,n=void 0;try{for(var o,i=e.target.files[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;f.default.File._load(a,s)}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}},!1),y(t,this)}console.log("The File APIs are not fully supported in this browser. Cannot create element.")},f.default.prototype.createVideo=function(e,t){return f.default._validateParameters("createVideo",arguments),o(this,"video",e,t)},f.default.prototype.createAudio=function(e,t){return f.default._validateParameters("createAudio",arguments),o(this,"audio",e,t)},f.default.prototype.VIDEO="video",f.default.prototype.AUDIO="audio",void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(r){var n=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return n?new Promise(function(e,t){n.call(navigator,r,e,t)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}),f.default.prototype.createCapture=function(){if(f.default._validateParameters("createCapture",arguments),!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new DOMException("getUserMedia not supported in this browser");var e,t,r=!0,n=!0,o=!0,i=!1,a=void 0;try{for(var s,l=arguments[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){var u=s.value;u===f.default.prototype.VIDEO?n=!1:u===f.default.prototype.AUDIO?r=!1:"object"===h(u)?e=u:"function"==typeof u&&(t=u)}}catch(e){i=!0,a=e}finally{try{o||null==l.return||l.return()}finally{if(i)throw a}}e=e||{video:r,audio:n};var c=document.createElement("video");c.setAttribute("playsinline",""),navigator.mediaDevices.getUserMedia(e).then(function(t){try{"srcObject"in c?c.srcObject=t:c.src=window.URL.createObjectURL(t)}catch(e){c.src=t}},console.log);var d=y(c,this,!0);return d.loadedmetadata=!1,c.addEventListener("loadedmetadata",function(){c.play(),c.width?(d.width=c.width,d.height=c.height):(d.width=d.elt.width=c.videoWidth,d.height=d.elt.height=c.videoHeight),d.loadedmetadata=!0,t&&t(c.srcObject)}),d},f.default.prototype.createElement=function(e,t){f.default._validateParameters("createElement",arguments);var r=document.createElement(e);return void 0!==t&&(r.innerHTML=t),y(r,this)},f.default.Element.prototype.addClass=function(e){return this.elt.className?this.hasClass(e)||(this.elt.className=this.elt.className+" "+e):this.elt.className=e,this},f.default.Element.prototype.removeClass=function(e){return this.elt.classList.remove(e),this},f.default.Element.prototype.hasClass=function(e){return this.elt.classList.contains(e)},f.default.Element.prototype.toggleClass=function(e){return this.elt.classList.contains(e)?this.elt.classList.remove(e):this.elt.classList.add(e),this},f.default.Element.prototype.child=function(e){return void 0===e?this.elt.childNodes:("string"==typeof e?("#"===e[0]&&(e=e.substring(1)),e=document.getElementById(e)):e instanceof f.default.Element&&(e=e.elt),e instanceof HTMLElement&&this.elt.appendChild(e),this)},f.default.Element.prototype.center=function(e){var t=this.elt.style.display,r="none"===this.elt.style.display,n="none"===this.parent().style.display,o={x:this.elt.offsetLeft,y:this.elt.offsetTop};r&&this.show(),n&&this.parent().show(),this.elt.style.display="block",this.position(0,0);var i=Math.abs(this.parent().offsetWidth-this.elt.offsetWidth),a=Math.abs(this.parent().offsetHeight-this.elt.offsetHeight);return"both"===e||void 0===e?this.position(i/2+this.parent().offsetLeft,a/2+this.parent().offsetTop):"horizontal"===e?this.position(i/2+this.parent().offsetLeft,o.y):"vertical"===e&&this.position(o.x,a/2+this.parent().offsetTop),this.style("display",t),r&&this.hide(),n&&this.parent().hide(),this},f.default.Element.prototype.html=function(){return 0===arguments.length?this.elt.innerHTML:(arguments[1]?this.elt.insertAdjacentHTML("beforeend",arguments[0]):this.elt.innerHTML=arguments[0],this)},f.default.Element.prototype.position=function(){if(0===arguments.length)return{x:this.elt.offsetLeft,y:this.elt.offsetTop};var e="absolute";return"static"!==arguments[2]&&"fixed"!==arguments[2]&&"relative"!==arguments[2]&&"sticky"!==arguments[2]&&"initial"!==arguments[2]&&"inherit"!==arguments[2]||(e=arguments[2]),this.elt.style.position=e,this.elt.style.left=arguments[0]+"px",this.elt.style.top=arguments[1]+"px",this.x=arguments[0],this.y=arguments[1],this},f.default.Element.prototype._translate=function(){this.elt.style.position="absolute";var e="";return this.elt.style.transform&&(e=(e=this.elt.style.transform.replace(/translate3d\(.*\)/g,"")).replace(/translate[X-Z]?\(.*\)/g,"")),2===arguments.length?this.elt.style.transform="translate("+arguments[0]+"px, "+arguments[1]+"px)":2<arguments.length&&(this.elt.style.transform="translate3d("+arguments[0]+"px,"+arguments[1]+"px,"+arguments[2]+"px)",this.elt.parentElement.style.perspective=3===arguments.length?"1000px":arguments[3]+"px"),this.elt.style.transform+=e,this},f.default.Element.prototype._rotate=function(){var e="";return this.elt.style.transform&&(e=(e=this.elt.style.transform.replace(/rotate3d\(.*\)/g,"")).replace(/rotate[X-Z]?\(.*\)/g,"")),1===arguments.length?this.elt.style.transform="rotate("+arguments[0]+"deg)":2===arguments.length?this.elt.style.transform="rotate("+arguments[0]+"deg, "+arguments[1]+"deg)":3===arguments.length&&(this.elt.style.transform="rotateX("+arguments[0]+"deg)",this.elt.style.transform+="rotateY("+arguments[1]+"deg)",this.elt.style.transform+="rotateZ("+arguments[2]+"deg)"),this.elt.style.transform+=e,this},f.default.Element.prototype.style=function(e,t){if(t instanceof f.default.Color&&(t="rgba("+t.levels[0]+","+t.levels[1]+","+t.levels[2]+","+t.levels[3]/255+")"),void 0===t){if(-1===e.indexOf(":"))return window.getComputedStyle(this.elt).getPropertyValue(e);for(var r=e.split(";"),n=0;n<r.length;n++){var o=r[n].split(":");o[0]&&o[1]&&(this.elt.style[o[0].trim()]=o[1].trim())}}else if(this.elt.style[e]=t,"width"===e||"height"===e||"left"===e||"top"===e){var i=window.getComputedStyle(this.elt).getPropertyValue(e).replace(/\D+/g,"");this[e]=parseInt(i,10)}return this},f.default.Element.prototype.attribute=function(e,t){if(null==this.elt.firstChild||"checkbox"!==this.elt.firstChild.type&&"radio"!==this.elt.firstChild.type)return void 0===t?this.elt.getAttribute(e):(this.elt.setAttribute(e,t),this);if(void 0===t)return this.elt.firstChild.getAttribute(e);for(var r=0;r<this.elt.childNodes.length;r++)this.elt.childNodes[r].setAttribute(e,t)},f.default.Element.prototype.removeAttribute=function(e){if(null!=this.elt.firstChild&&("checkbox"===this.elt.firstChild.type||"radio"===this.elt.firstChild.type))for(var t=0;t<this.elt.childNodes.length;t++)this.elt.childNodes[t].removeAttribute(e);return this.elt.removeAttribute(e),this},f.default.Element.prototype.value=function(){return 0<arguments.length?(this.elt.value=arguments[0],this):"range"===this.elt.type?parseFloat(this.elt.value):this.elt.value},f.default.Element.prototype.show=function(){return this.elt.style.display="block",this},f.default.Element.prototype.hide=function(){return this.elt.style.display="none",this},f.default.Element.prototype.size=function(e,t){if(0===arguments.length)return{width:this.elt.offsetWidth,height:this.elt.offsetHeight};var r=e,n=t,o=f.default.prototype.AUTO;if(r!==o||n!==o){if(r===o?r=t*this.width/this.height:n===o&&(n=e*this.height/this.width),this.elt instanceof HTMLCanvasElement){var i,a={},s=this.elt.getContext("2d");for(i in s)a[i]=s[i];for(i in this.elt.setAttribute("width",r*this._pInst._pixelDensity),this.elt.setAttribute("height",n*this._pInst._pixelDensity),this.elt.style.width=r+"px",this.elt.style.height=n+"px",this._pInst.scale(this._pInst._pixelDensity,this._pInst._pixelDensity),a)this.elt.getContext("2d")[i]=a[i]}else this.elt.style.width=r+"px",this.elt.style.height=n+"px",this.elt.width=r,this.elt.height=n;this.width=this.elt.offsetWidth,this.height=this.elt.offsetHeight,this._pInst&&this._pInst._curElement&&this._pInst._curElement.elt===this.elt&&(this._pInst._setProperty("width",this.elt.offsetWidth),this._pInst._setProperty("height",this.elt.offsetHeight))}return this},f.default.Element.prototype.remove=function(){if(this instanceof f.default.MediaElement){this.stop();var e=this.elt.srcObject;if(null!==e)e.getTracks().forEach(function(e){e.stop()})}var t=this._pInst._elements.indexOf(this);for(var r in-1!==t&&this._pInst._elements.splice(t,1),this._events)this.elt.removeEventListener(r,this._events[r]);this.elt&&this.elt.parentNode&&this.elt.parentNode.removeChild(this.elt)},f.default.Element.prototype.drop=function(o,i){if(window.File&&window.FileReader&&window.FileList&&window.Blob){if(!this._dragDisabled){this._dragDisabled=!0;var e=function(e){e.preventDefault()};this.elt.addEventListener("dragover",e),this.elt.addEventListener("dragleave",e)}f.default.Element._attachListener("drop",function(e){e.preventDefault(),"function"==typeof i&&i.call(this,e);for(var t=e.dataTransfer.files,r=0;r<t.length;r++){var n=t[r];f.default.File._load(n,o)}},this)}else console.log("The File APIs are not fully supported in this browser.");return this},f.default.MediaElement=function(n,e){f.default.Element.call(this,n,e);var o=this;this.elt.crossOrigin="anonymous",this._prevTime=0,this._cueIDCounter=0,this._cues=[],(this._pixelsState=this)._pixelDensity=1,this._modified=!1,Object.defineProperty(o,"src",{get:function(){var e=o.elt.children[0].src,t=o.elt.src===window.location.href?"":o.elt.src;return e===window.location.href?t:e},set:function(e){for(var t=0;t<o.elt.children.length;t++)o.elt.removeChild(o.elt.children[t]);var r=document.createElement("source");r.src=e,n.appendChild(r),o.elt.src=e,o.modified=!0}}),o._onended=function(){},o.elt.onended=function(){o._onended(o)}},f.default.MediaElement.prototype=Object.create(f.default.Element.prototype),f.default.MediaElement.prototype.play=function(){var e,t=this;return this.elt.currentTime===this.elt.duration&&(this.elt.currentTime=0),(e=(1<this.elt.readyState||this.elt.load(),this.elt.play()))&&e.catch&&e.catch(function(e){"NotAllowedError"===e.name?f.default._friendlyAutoplayError(t.src):console.error("Media play method encountered an unexpected error",e)}),this},f.default.MediaElement.prototype.stop=function(){return this.elt.pause(),this.elt.currentTime=0,this},f.default.MediaElement.prototype.pause=function(){return this.elt.pause(),this},f.default.MediaElement.prototype.loop=function(){return this.elt.setAttribute("loop",!0),this.play(),this},f.default.MediaElement.prototype.noLoop=function(){return this.elt.removeAttribute("loop"),this},f.default.MediaElement.prototype._setupAutoplayFailDetection=function(){var e=this,t=setTimeout(function(){return f.default._friendlyAutoplayError(e.src)},500);this.elt.addEventListener("play",function(){return clearTimeout(t)},{passive:!0,once:!0})},f.default.MediaElement.prototype.autoplay=function(e){var t=this,r=this.elt.getAttribute("autoplay");if(this.elt.setAttribute("autoplay",e),e&&!r){var n=function(){return t._setupAutoplayFailDetection()};4===this.elt.readyState?n():this.elt.addEventListener("canplay",n,{passive:!0,once:!0})}return this},f.default.MediaElement.prototype.volume=function(e){if(void 0===e)return this.elt.volume;this.elt.volume=e},f.default.MediaElement.prototype.speed=function(e){if(void 0===e)return this.presetPlaybackRate||this.elt.playbackRate;this.loadedmetadata?this.elt.playbackRate=e:this.presetPlaybackRate=e},f.default.MediaElement.prototype.time=function(e){return void 0===e?this.elt.currentTime:(this.elt.currentTime=e,this)},f.default.MediaElement.prototype.duration=function(){return this.elt.duration},f.default.MediaElement.prototype.pixels=[],f.default.MediaElement.prototype._ensureCanvas=function(){this.canvas||(this.canvas=document.createElement("canvas"),this.drawingContext=this.canvas.getContext("2d"),this.setModified(!0)),this.loadedmetadata&&(this.canvas.width!==this.elt.width&&(this.canvas.width=this.elt.width,this.canvas.height=this.elt.height,this.width=this.canvas.width,this.height=this.canvas.height),this.drawingContext.drawImage(this.elt,0,0,this.canvas.width,this.canvas.height),this.setModified(!0))},f.default.MediaElement.prototype.loadPixels=function(){return this._ensureCanvas(),f.default.Renderer2D.prototype.loadPixels.apply(this,arguments)},f.default.MediaElement.prototype.updatePixels=function(e,t,r,n){return this.loadedmetadata&&(this._ensureCanvas(),f.default.Renderer2D.prototype.updatePixels.call(this,e,t,r,n)),this.setModified(!0),this},f.default.MediaElement.prototype.get=function(){return this._ensureCanvas(),f.default.Renderer2D.prototype.get.apply(this,arguments)},f.default.MediaElement.prototype._getPixel=function(){return this.loadPixels(),f.default.Renderer2D.prototype._getPixel.apply(this,arguments)},f.default.MediaElement.prototype.set=function(e,t,r){this.loadedmetadata&&(this._ensureCanvas(),f.default.Renderer2D.prototype.set.call(this,e,t,r),this.setModified(!0))},f.default.MediaElement.prototype.copy=function(){this._ensureCanvas(),f.default.prototype.copy.apply(this,arguments)},f.default.MediaElement.prototype.mask=function(){this.loadPixels(),this.setModified(!0),f.default.Image.prototype.mask.apply(this,arguments)},f.default.MediaElement.prototype.isModified=function(){return this._modified},f.default.MediaElement.prototype.setModified=function(e){this._modified=e},f.default.MediaElement.prototype.onended=function(e){return this._onended=e,this},f.default.MediaElement.prototype.connect=function(e){var t,r;if("function"==typeof f.default.prototype.getAudioContext)t=f.default.prototype.getAudioContext(),r=f.default.soundOut.input;else try{r=(t=e.context).destination}catch(e){throw"connect() is meant to be used with Web Audio API or p5.sound.js"}this.audioSourceNode||(this.audioSourceNode=t.createMediaElementSource(this.elt),this.audioSourceNode.connect(r)),e?e.input?this.audioSourceNode.connect(e.input):this.audioSourceNode.connect(e):this.audioSourceNode.connect(r)},f.default.MediaElement.prototype.disconnect=function(){if(!this.audioSourceNode)throw"nothing to disconnect";this.audioSourceNode.disconnect()},f.default.MediaElement.prototype.showControls=function(){this.elt.style["text-align"]="inherit",this.elt.controls=!0},f.default.MediaElement.prototype.hideControls=function(){this.elt.controls=!1};function i(e,t,r,n){this.callback=e,this.time=t,this.id=r,this.val=n}f.default.MediaElement.prototype.addCue=function(e,t,r){var n=this._cueIDCounter++,o=new i(t,e,n,r);return this._cues.push(o),this.elt.ontimeupdate||(this.elt.ontimeupdate=this._onTimeUpdate.bind(this)),n},f.default.MediaElement.prototype.removeCue=function(e){for(var t=0;t<this._cues.length;t++)this._cues[t].id===e&&(console.log(e),this._cues.splice(t,1));0===this._cues.length&&(this.elt.ontimeupdate=null)},f.default.MediaElement.prototype.clearCues=function(){this._cues=[],this.elt.ontimeupdate=null},f.default.MediaElement.prototype._onTimeUpdate=function(){for(var e=this.time(),t=0;t<this._cues.length;t++){var r=this._cues[t].time,n=this._cues[t].val;this._prevTime<r&&r<=e&&this._cues[t].callback(n)}this._prevTime=e},f.default.File=function(e,t){this.file=e,this._pInst=t;var r=e.type.split("/");this.type=r[0],this.subtype=r[1],this.name=e.name,this.size=e.size,this.data=void 0},f.default.File._createLoader=function(n,o){var e=new FileReader;return e.onload=function(e){var t=new f.default.File(n);if("application/json"===t.file.type)t.data=JSON.parse(e.target.result);else if("text/xml"===t.file.type){var r=(new DOMParser).parseFromString(e.target.result,"text/xml");t.data=new f.default.XML(r.documentElement)}else t.data=e.target.result;o(t)},e},f.default.File._load=function(e,t){if(/^text\//.test(e.type)||"application/json"===e.type)f.default.File._createLoader(e,t).readAsText(e);else if(/^(video|audio)\//.test(e.type)){var r=new f.default.File(e);r.data=URL.createObjectURL(e),t(r)}else f.default.File._createLoader(e,t).readAsDataURL(e)};var a=f.default;r.default=a},{"../core/main":260,"core-js/modules/es.array.every":149,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.for-each":152,"core-js/modules/es.array.from":153,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.splice":162,"core-js/modules/es.function.name":163,"core-js/modules/es.object.to-string":174,"core-js/modules/es.promise":175,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.split":188,"core-js/modules/es.string.trim":190,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.for-each":225,"core-js/modules/web.dom-collections.iterator":226,"core-js/modules/web.url":228}],277:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n},i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}o.default.prototype.deviceOrientation=1<window.innerWidth/window.innerHeight?"landscape":"portrait",o.default.prototype.accelerationX=0,o.default.prototype.accelerationY=0,o.default.prototype.accelerationZ=0,o.default.prototype.pAccelerationX=0,o.default.prototype.pAccelerationY=0,o.default.prototype.pAccelerationZ=0,o.default.prototype._updatePAccelerations=function(){this._setProperty("pAccelerationX",this.accelerationX),this._setProperty("pAccelerationY",this.accelerationY),this._setProperty("pAccelerationZ",this.accelerationZ)},o.default.prototype.rotationX=0,o.default.prototype.rotationY=0,o.default.prototype.rotationZ=0,o.default.prototype.pRotationX=0,o.default.prototype.pRotationY=0;var u=o.default.prototype.pRotationZ=0,c=0,d=0,f="clockwise",h="clockwise",p="clockwise";o.default.prototype.pRotateDirectionX=void 0,o.default.prototype.pRotateDirectionY=void 0,o.default.prototype.pRotateDirectionZ=void 0,o.default.prototype._updatePRotations=function(){this._setProperty("pRotationX",this.rotationX),this._setProperty("pRotationY",this.rotationY),this._setProperty("pRotationZ",this.rotationZ)},o.default.prototype.turnAxis=void 0;var y=.5,m=30;o.default.prototype.setMoveThreshold=function(e){o.default._validateParameters("setMoveThreshold",arguments),y=e},o.default.prototype.setShakeThreshold=function(e){o.default._validateParameters("setShakeThreshold",arguments),m=e},o.default.prototype._ondeviceorientation=function(e){this._updatePRotations(),this._angleMode===i.radians&&(e.beta=e.beta*(_PI/180),e.gamma=e.gamma*(_PI/180),e.alpha=e.alpha*(_PI/180)),this._setProperty("rotationX",e.beta),this._setProperty("rotationY",e.gamma),this._setProperty("rotationZ",e.alpha),this._handleMotion()},o.default.prototype._ondevicemotion=function(e){this._updatePAccelerations(),this._setProperty("accelerationX",2*e.acceleration.x),this._setProperty("accelerationY",2*e.acceleration.y),this._setProperty("accelerationZ",2*e.acceleration.z),this._handleMotion()},o.default.prototype._handleMotion=function(){90===window.orientation||-90===window.orientation?this._setProperty("deviceOrientation","landscape"):0===window.orientation?this._setProperty("deviceOrientation","portrait"):void 0===window.orientation&&this._setProperty("deviceOrientation","undefined");var e,t,r=this._isGlobal?window:this;if("function"==typeof r.deviceMoved&&(Math.abs(this.accelerationX-this.pAccelerationX)>y||Math.abs(this.accelerationY-this.pAccelerationY)>y||Math.abs(this.accelerationZ-this.pAccelerationZ)>y)&&r.deviceMoved(),"function"==typeof r.deviceTurned){var n=this.rotationX+180,o=this.pRotationX+180,i=u+180;0<n-o&&n-o<270||n-o<-270?f="clockwise":(n-o<0||270<n-o)&&(f="counter-clockwise"),f!==this.pRotateDirectionX&&(i=n),90<Math.abs(n-i)&&Math.abs(n-i)<270&&(i=n,this._setProperty("turnAxis","X"),r.deviceTurned()),this.pRotateDirectionX=f,u=i-180;var a=this.rotationY+180,s=this.pRotationY+180,l=c+180;0<a-s&&a-s<270||a-s<-270?h="clockwise":(a-s<0||270<a-this.pRotationY)&&(h="counter-clockwise"),h!==this.pRotateDirectionY&&(l=a),90<Math.abs(a-l)&&Math.abs(a-l)<270&&(l=a,this._setProperty("turnAxis","Y"),r.deviceTurned()),this.pRotateDirectionY=h,c=l-180,0<this.rotationZ-this.pRotationZ&&this.rotationZ-this.pRotationZ<270||this.rotationZ-this.pRotationZ<-270?p="clockwise":(this.rotationZ-this.pRotationZ<0||270<this.rotationZ-this.pRotationZ)&&(p="counter-clockwise"),p!==this.pRotateDirectionZ&&(d=this.rotationZ),90<Math.abs(this.rotationZ-d)&&Math.abs(this.rotationZ-d)<270&&(d=this.rotationZ,this._setProperty("turnAxis","Z"),r.deviceTurned()),this.pRotateDirectionZ=p,this._setProperty("turnAxis",void 0)}"function"==typeof r.deviceShaken&&(null!==this.pAccelerationX&&(e=Math.abs(this.accelerationX-this.pAccelerationX),t=Math.abs(this.accelerationY-this.pAccelerationY)),m<e+t&&r.deviceShaken())};var l=o.default;r.default=l},{"../core/constants":250,"../core/main":260}],278:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.isKeyPressed=!1,o.default.prototype.keyIsPressed=!1,o.default.prototype.key="",o.default.prototype.keyCode=0,o.default.prototype._onkeydown=function(e){if(!this._downKeys[e.which]){this._setProperty("isKeyPressed",!0),this._setProperty("keyIsPressed",!0),this._setProperty("keyCode",e.which),this._downKeys[e.which]=!0,this._setProperty("key",e.key||String.fromCharCode(e.which)||e.which);var t=this._isGlobal?window:this;if("function"==typeof t.keyPressed&&!e.charCode)!1===t.keyPressed(e)&&e.preventDefault()}},o.default.prototype._onkeyup=function(e){this._downKeys[e.which]=!1,this._areDownKeys()||(this._setProperty("isKeyPressed",!1),this._setProperty("keyIsPressed",!1)),this._setProperty("_lastKeyCodeTyped",null),this._setProperty("key",e.key||String.fromCharCode(e.which)||e.which),this._setProperty("keyCode",e.which);var t=this._isGlobal?window:this;"function"==typeof t.keyReleased&&!1===t.keyReleased(e)&&e.preventDefault()},o.default.prototype._onkeypress=function(e){if(e.which!==this._lastKeyCodeTyped){this._setProperty("_lastKeyCodeTyped",e.which),this._setProperty("key",e.key||String.fromCharCode(e.which)||e.which);var t=this._isGlobal?window:this;if("function"==typeof t.keyTyped)!1===t.keyTyped(e)&&e.preventDefault()}},o.default.prototype._onblur=function(e){this._downKeys={}},o.default.prototype.keyIsDown=function(e){return o.default._validateParameters("keyIsDown",arguments),this._downKeys[e]||!1},o.default.prototype._areDownKeys=function(){for(var e in this._downKeys)if(this._downKeys.hasOwnProperty(e)&&!0===this._downKeys[e])return!0;return!1};var i=o.default;r.default=i},{"../core/main":260}],279:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.includes"),e("core-js/modules/es.string.includes"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n},i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}o.default.prototype.movedX=0,o.default.prototype.movedY=0,o.default.prototype._hasMouseInteracted=!1,o.default.prototype.mouseX=0,o.default.prototype.mouseY=0,o.default.prototype.pmouseX=0,o.default.prototype.pmouseY=0,o.default.prototype.winMouseX=0,o.default.prototype.winMouseY=0,o.default.prototype.pwinMouseX=0,o.default.prototype.pwinMouseY=0,o.default.prototype.mouseButton=0,o.default.prototype.mouseIsPressed=!1,o.default.prototype._updateNextMouseCoords=function(e){if(null!==this._curElement&&(!e.touches||0<e.touches.length)){var t=function(e,t,r,n){n&&!n.clientX&&(n.touches?n=n.touches[0]:n.changedTouches&&(n=n.changedTouches[0]));var o=e.getBoundingClientRect(),i=e.scrollWidth/t||1,a=e.scrollHeight/r||1;return{x:(n.clientX-o.left)/i,y:(n.clientY-o.top)/a,winX:n.clientX,winY:n.clientY,id:n.identifier}}(this._curElement.elt,this.width,this.height,e);this._setProperty("movedX",e.movementX),this._setProperty("movedY",e.movementY),this._setProperty("mouseX",t.x),this._setProperty("mouseY",t.y),this._setProperty("winMouseX",t.winX),this._setProperty("winMouseY",t.winY)}this._hasMouseInteracted||(this._updateMouseCoords(),this._setProperty("_hasMouseInteracted",!0))},o.default.prototype._updateMouseCoords=function(){this._setProperty("pmouseX",this.mouseX),this._setProperty("pmouseY",this.mouseY),this._setProperty("pwinMouseX",this.winMouseX),this._setProperty("pwinMouseY",this.winMouseY),this._setProperty("_pmouseWheelDeltaY",this._mouseWheelDeltaY)},o.default.prototype._setMouseButton=function(e){1===e.button?this._setProperty("mouseButton",i.CENTER):2===e.button?this._setProperty("mouseButton",i.RIGHT):this._setProperty("mouseButton",i.LEFT)},o.default.prototype._onmousemove=function(e){var t=this._isGlobal?window:this;this._updateNextMouseCoords(e),this.mouseIsPressed?"function"==typeof t.mouseDragged?!1===t.mouseDragged(e)&&e.preventDefault():"function"==typeof t.touchMoved&&!1===t.touchMoved(e)&&e.preventDefault():"function"==typeof t.mouseMoved&&!1===t.mouseMoved(e)&&e.preventDefault()},o.default.prototype._onmousedown=function(e){var t=this._isGlobal?window:this;this._setProperty("mouseIsPressed",!0),this._setMouseButton(e),this._updateNextMouseCoords(e),"function"==typeof t.mousePressed?!1===t.mousePressed(e)&&e.preventDefault():navigator.userAgent.toLowerCase().includes("safari")&&"function"==typeof t.touchStarted&&!1===t.touchStarted(e)&&e.preventDefault()},o.default.prototype._onmouseup=function(e){var t=this._isGlobal?window:this;this._setProperty("mouseIsPressed",!1),"function"==typeof t.mouseReleased?!1===t.mouseReleased(e)&&e.preventDefault():"function"==typeof t.touchEnded&&!1===t.touchEnded(e)&&e.preventDefault()},o.default.prototype._ondragend=o.default.prototype._onmouseup,o.default.prototype._ondragover=o.default.prototype._onmousemove,o.default.prototype._onclick=function(e){var t=this._isGlobal?window:this;"function"==typeof t.mouseClicked&&!1===t.mouseClicked(e)&&e.preventDefault()},o.default.prototype._ondblclick=function(e){var t=this._isGlobal?window:this;"function"==typeof t.doubleClicked&&!1===t.doubleClicked(e)&&e.preventDefault()},o.default.prototype._mouseWheelDeltaY=0,o.default.prototype._pmouseWheelDeltaY=0,o.default.prototype._onwheel=function(e){var t=this._isGlobal?window:this;this._setProperty("_mouseWheelDeltaY",e.deltaY),"function"==typeof t.mouseWheel&&(e.delta=e.deltaY,!1===t.mouseWheel(e)&&e.preventDefault())},o.default.prototype.requestPointerLock=function(){var e=this._curElement.elt;return e.requestPointerLock=e.requestPointerLock||e.mozRequestPointerLock,e.requestPointerLock?(e.requestPointerLock(),!0):(console.log("requestPointerLock is not implemented in this browser"),!1)},o.default.prototype.exitPointerLock=function(){document.exitPointerLock()};var l=o.default;r.default=l},{"../core/constants":250,"../core/main":260,"core-js/modules/es.array.includes":154,"core-js/modules/es.string.includes":182}],280:[function(e,t,r){"use strict";e("core-js/modules/es.array.includes"),e("core-js/modules/es.string.includes"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};function i(e,t,r,n,o){var i=4<arguments.length&&void 0!==o?o:0,a=e.getBoundingClientRect(),s=e.scrollWidth/t||1,l=e.scrollHeight/r||1,u=n.touches[i]||n.changedTouches[i];return{x:(u.clientX-a.left)/s,y:(u.clientY-a.top)/l,winX:u.clientX,winY:u.clientY,id:u.identifier}}o.default.prototype.touches=[],o.default.prototype._updateTouchCoords=function(e){if(null!==this._curElement){for(var t=[],r=0;r<e.touches.length;r++)t[r]=i(this._curElement.elt,this.width,this.height,e,r);this._setProperty("touches",t)}},o.default.prototype._ontouchstart=function(e){var t=this._isGlobal?window:this;this._setProperty("mouseIsPressed",!0),this._updateTouchCoords(e),this._updateNextMouseCoords(e),this._updateMouseCoords(),"function"==typeof t.touchStarted?!1===t.touchStarted(e)&&e.preventDefault():navigator.userAgent.toLowerCase().includes("safari")&&"function"==typeof t.mousePressed&&!1===t.mousePressed(e)&&e.preventDefault()},o.default.prototype._ontouchmove=function(e){var t=this._isGlobal?window:this;this._updateTouchCoords(e),this._updateNextMouseCoords(e),"function"==typeof t.touchMoved?!1===t.touchMoved(e)&&e.preventDefault():"function"==typeof t.mouseDragged&&!1===t.mouseDragged(e)&&e.preventDefault()},o.default.prototype._ontouchend=function(e){this._setProperty("mouseIsPressed",!1),this._updateTouchCoords(e),this._updateNextMouseCoords(e);var t=this._isGlobal?window:this;"function"==typeof t.touchEnded?!1===t.touchEnded(e)&&e.preventDefault():"function"==typeof t.mouseReleased&&!1===t.mouseReleased(e)&&e.preventDefault()};var a=o.default;r.default=a},{"../core/main":260,"core-js/modules/es.array.includes":154,"core-js/modules/es.string.includes":182}],281:[function(e,t,r){"use strict";e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.typed-array.int32-array"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var O,C,L,P,k={};function n(e,t){for(var r,n,o,i,a,s,l,u,c,d,f=k._toPixels(e),h=e.width,p=e.height,y=h*p,m=new Int32Array(y),g=0;g<y;g++)m[g]=k._getARGB(f,g);var v,b,_,x,w=new Int32Array(y),S=new Int32Array(y),j=new Int32Array(y),M=new Int32Array(y),E=0;for(!function(e){var t=3.5*e|0;if(O!==(t=t<1?1:t<248?t:248)){C=1+(O=t)<<1,L=new Int32Array(C),P=new Array(C);for(var r=0;r<C;r++)P[r]=new Int32Array(256);for(var n,o,i,a,s=1,l=t-1;s<t;s++){L[t+s]=L[l]=o=l*l,i=P[t+s],a=P[l--];for(var u=0;u<256;u++)i[u]=a[u]=o*u}n=L[t]=t*t,i=P[t];for(var c=0;c<256;c++)i[c]=n*c}}(t),b=0;b<p;b++){for(v=0;v<h;v++){if(i=o=n=a=r=0,(s=v-O)<0)d=-s,s=0;else{if(h<=s)break;d=0}for(_=d;_<C&&!(h<=s);_++){var T=m[s+E];a+=(x=P[_])[(-16777216&T)>>>24],n+=x[(16711680&T)>>16],o+=x[(65280&T)>>8],i+=x[255&T],r+=L[_],s++}w[l=E+v]=a/r,S[l]=n/r,j[l]=o/r,M[l]=i/r}E+=h}for(c=(u=-O)*h,b=E=0;b<p;b++){for(v=0;v<h;v++){if(i=o=n=a=r=0,u<0)d=l=-u,s=v;else{if(p<=u)break;d=0,l=u,s=v+c}for(_=d;_<C&&!(p<=l);_++)a+=(x=P[_])[w[s]],n+=x[S[s]],o+=x[j[s]],i+=x[M[s]],r+=L[_],l++,s+=h;m[v+E]=a/r<<24|n/r<<16|o/r<<8|i/r}E+=h,c+=h,u++}k._setPixels(f,m)}k._toPixels=function(e){if(e instanceof ImageData)return e.data;if(e.getContext("2d"))return e.getContext("2d").getImageData(0,0,e.width,e.height).data;if(e.getContext("webgl")){var t=e.getContext("webgl"),r=t.drawingBufferWidth*t.drawingBufferHeight*4,n=new Uint8Array(r);return t.readPixels(0,0,e.width,e.height,t.RGBA,t.UNSIGNED_BYTE,n),n}},k._getARGB=function(e,t){var r=4*t;return e[3+r]<<24&4278190080|e[r]<<16&16711680|e[1+r]<<8&65280|255&e[2+r]},k._setPixels=function(e,t){for(var r=0,n=0,o=e.length;n<o;n++)e[(r=4*n)+0]=(16711680&t[n])>>>16,e[r+1]=(65280&t[n])>>>8,e[r+2]=255&t[n],e[r+3]=(4278190080&t[n])>>>24},k._toImageData=function(e){return e instanceof ImageData?e:e.getContext("2d").getImageData(0,0,e.width,e.height)},k._createImageData=function(e,t){return k._tmpCanvas=document.createElement("canvas"),k._tmpCtx=k._tmpCanvas.getContext("2d"),this._tmpCtx.createImageData(e,t)},k.apply=function(e,t,r){var n=e.getContext("2d"),o=n.getImageData(0,0,e.width,e.height),i=t(o,r);i instanceof ImageData?n.putImageData(i,0,0,0,0,e.width,e.height):n.putImageData(o,0,0,0,0,e.width,e.height)},k.threshold=function(e,t){var r=k._toPixels(e);void 0===t&&(t=.5);for(var n=Math.floor(255*t),o=0;o<r.length;o+=4){var i=void 0;i=n<=.2126*r[o]+.7152*r[o+1]+.0722*r[o+2]?255:0,r[o]=r[o+1]=r[o+2]=i}},k.gray=function(e){for(var t=k._toPixels(e),r=0;r<t.length;r+=4){var n=.2126*t[r]+.7152*t[r+1]+.0722*t[r+2];t[r]=t[r+1]=t[r+2]=n}},k.opaque=function(e){for(var t=k._toPixels(e),r=0;r<t.length;r+=4)t[r+3]=255;return t},k.invert=function(e){for(var t=k._toPixels(e),r=0;r<t.length;r+=4)t[r]=255-t[r],t[r+1]=255-t[r+1],t[r+2]=255-t[r+2]},k.posterize=function(e,t){var r=k._toPixels(e);if(t<2||255<t)throw new Error("Level must be greater than 2 and less than 255 for posterize");for(var n=t-1,o=0;o<r.length;o+=4){var i=r[o],a=r[o+1],s=r[o+2];r[o]=255*(i*t>>8)/n,r[o+1]=255*(a*t>>8)/n,r[o+2]=255*(s*t>>8)/n}},k.dilate=function(e){for(var t,r,n,o,i,a,s,l,u,c,d,f,h,p,y,m,g,v=k._toPixels(e),b=0,_=v.length?v.length/4:0,x=new Int32Array(_);b<_;)for(r=(t=b)+e.width;b<r;)n=o=k._getARGB(v,b),(s=b-1)<t&&(s=b),r<=(a=b+1)&&(a=b),(l=b-e.width)<0&&(l=0),_<=(u=b+e.width)&&(u=b),f=k._getARGB(v,l),d=k._getARGB(v,s),h=k._getARGB(v,u),(i=77*(n>>16&255)+151*(n>>8&255)+28*(255&n))<(y=77*(d>>16&255)+151*(d>>8&255)+28*(255&d))&&(o=d,i=y),i<(p=77*((c=k._getARGB(v,a))>>16&255)+151*(c>>8&255)+28*(255&c))&&(o=c,i=p),i<(m=77*(f>>16&255)+151*(f>>8&255)+28*(255&f))&&(o=f,i=m),i<(g=77*(h>>16&255)+151*(h>>8&255)+28*(255&h))&&(o=h,i=g),x[b++]=o;k._setPixels(v,x)},k.erode=function(e){for(var t,r,n,o,i,a,s,l,u,c,d,f,h,p,y,m,g,v=k._toPixels(e),b=0,_=v.length?v.length/4:0,x=new Int32Array(_);b<_;)for(r=(t=b)+e.width;b<r;)n=o=k._getARGB(v,b),(s=b-1)<t&&(s=b),r<=(a=b+1)&&(a=b),(l=b-e.width)<0&&(l=0),_<=(u=b+e.width)&&(u=b),f=k._getARGB(v,l),d=k._getARGB(v,s),h=k._getARGB(v,u),(y=77*(d>>16&255)+151*(d>>8&255)+28*(255&d))<(i=77*(n>>16&255)+151*(n>>8&255)+28*(255&n))&&(o=d,i=y),(p=77*((c=k._getARGB(v,a))>>16&255)+151*(c>>8&255)+28*(255&c))<i&&(o=c,i=p),(m=77*(f>>16&255)+151*(f>>8&255)+28*(255&f))<i&&(o=f,i=m),(g=77*(h>>16&255)+151*(h>>8&255)+28*(255&h))<i&&(o=h,i=g),x[b++]=o;k._setPixels(v,x)},k.blur=function(e,t){n(e,t)};var o=k;r.default=o},{"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.int32-array":206,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint8-array":223}],282:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.from"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.keys"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.set"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.split"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.uint32-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var k=n(e("../core/main")),A=n(e("omggif"));function n(e){return e&&e.__esModule?e:{default:e}}function R(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}k.default.prototype.createImage=function(e,t){return k.default._validateParameters("createImage",arguments),new k.default.Image(e,t)},k.default.prototype.saveCanvas=function(){k.default._validateParameters("saveCanvas",arguments);var e,t,r,n,o=[].slice.call(arguments);switch(arguments[0]instanceof HTMLCanvasElement?(e=arguments[0],o.shift()):arguments[0]instanceof k.default.Element?(e=arguments[0].elt,o.shift()):e=this._curElement&&this._curElement.elt,1<=o.length&&(t=o[0]),2<=o.length&&(r=o[1]),r=r||k.default.prototype._checkFileExtension(t,r)[1]||"png"){default:n="image/png";break;case"jpeg":case"jpg":n="image/jpeg"}e.toBlob(function(e){k.default.prototype.downloadFile(e,t,r)},n)},k.default.prototype.saveGif=function(p,e){var y=p.gifProperties,t=y.loopLimit;1===t?t=null:null===t&&(t=0);for(var r=new Uint8Array(p.width*p.height*y.numFrames),m=[],n={},o=0;o<y.numFrames;o++){for(var i=new Set,a=y.frames[o].image.data,s=a.length,l=new Uint32Array(p.width*p.height),u=0,c=0;u<s;u+=4,c++){var d=a[u+0]<<16|a[u+1]<<8|a[u+2]<<0;i.add(d),l[c]=d}var f=R(i).sort().toString();void 0===n[f]?n[f]={freq:1,frames:[o]}:(n[f].freq+=1,n[f].frames.push(o)),m.push(l)}var g=[],h=Object.keys(n).sort(function(e,t){return n[t].freq-n[e].freq}),v=h[0].split(",").map(function(e){return parseInt(e)});g=g.concat(n[v].frames);for(var b=new Set(v),_=1;_<h.length;_++){var x=h[_].split(",").map(function(e){return parseInt(e)}).filter(function(e){return!b.has(e)});if(v.length+x.length<=256){for(var w=0;w<x.length;w++)v.push(x[w]),b.add(x[w]);g=g.concat(n[h[_]].frames)}}g=new Set(g);for(var S={},j=0;j<v.length;j++)S[v[j]]||(S[v[j]]=j);for(var M=1;M<v.length;)M<<=1;v.length=M;for(var E={loop:t,palette:new Uint32Array(v)},T=new A.default.GifWriter(r,p.width,p.height,E),O={},C=function(e){for(var t=!g.has(e),r=t?[]:v,n=new Uint8Array(p.width*p.height),o={},i=new Set,a=0;a<m[e].length;a++){var s=m[e][a];t?(void 0===o[s]&&(o[s]=r.length,r.push(s)),n[a]=o[s]):n[a]=S[s],0<e&&m[e-1][a]!==s&&i.add(s)}var l={},u=r.filter(function(e){return!i.has(e)});if(0<u.length){var c=u[0],d=t?o[c]:S[c];if(0<e){for(var f=0;f<m[e].length;f++)m[e-1][f]===m[e][f]&&(n[f]=d);l.transparent=d,O.frameOpts.disposal=1}}if(l.delay=y.frames[e].delay/10,t){for(var h=1;h<r.length;)h<<=1;r.length=h,l.palette=new Uint32Array(r)}0<e&&T.addFrame(0,0,p.width,p.height,O.pixelPaletteIndex,O.frameOpts),O={pixelPaletteIndex:n,frameOpts:l}},L=0;L<y.numFrames;L++)C(L);O.frameOpts.disposal=1,T.addFrame(0,0,p.width,p.height,O.pixelPaletteIndex,O.frameOpts);var P=new Blob([r.slice(0,T.end())],{type:"image/gif"});k.default.prototype.downloadFile(P,e,"gif")},k.default.prototype.saveFrames=function(e,t,r,n,a){k.default._validateParameters("saveFrames",arguments);var o=r||3;o=k.default.prototype.constrain(o,0,15),o*=1e3;var i=n||15;i=k.default.prototype.constrain(i,0,22);var s=0,l=k.default.prototype._makeFrame,u=this._curElement.elt,c=[],d=setInterval(function(){c.push(l(e+s,t,u)),s++},1e3/i);setTimeout(function(){if(clearInterval(d),a)a(c);else{var e=!0,t=!1,r=void 0;try{for(var n,o=c[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value;k.default.prototype.downloadFile(i.imageData,i.filename,i.ext)}}catch(e){t=!0,r=e}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}}c=[]},o+.01)},k.default.prototype._makeFrame=function(e,t,r){var n,o;if(n=this?this._curElement.elt:r,t)switch(t.toLowerCase()){case"png":o="image/png";break;case"jpeg":case"jpg":o="image/jpeg";break;default:o="image/png"}else t="png",o="image/png";var i=n.toDataURL(o);i=i.replace(o,"image/octet-stream");var a={};return a.imageData=i,a.filename=e,a.ext=t,a};var o=k.default;r.default=o},{"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.from":153,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.keys":173,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.set":180,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.split":188,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint32-array":222,"core-js/modules/es.typed-array.uint8-array":223,"core-js/modules/web.dom-collections.iterator":226,omggif:235}],283:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.promise"),e("core-js/modules/es.string.includes"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.uint8-clamped-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var x=o(e("../core/main")),d=o(e("./filters")),w=o(e("../core/helpers")),n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants")),y=o(e("omggif"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function o(e){return e&&e.__esModule?e:{default:e}}function S(e,t){return 0<e&&e<t?e:t}e("../core/friendly_errors/validate_params"),e("../core/friendly_errors/file_errors"),e("../core/friendly_errors/fes_core"),x.default.prototype.loadImage=function(n,o,i){x.default._validateParameters("loadImage",arguments);var a=new x.default.Image(1,1,this),s=this,e=new Request(n,{method:"GET",mode:"cors"});return fetch(n,e).then(function(e){var t=e.headers.get("content-type");if(null===t&&console.warn("The image you loaded does not have a Content-Type header. If you are using the online editor consider reuploading the asset."),t&&t.includes("image/gif"))e.arrayBuffer().then(function(e){e&&function(e,r,t,n,o){var i=new y.default.GifReader(e);r.width=r.canvas.width=i.width,r.height=r.canvas.height=i.height;var a=[],s=i.numFrames(),l=new Uint8ClampedArray(r.width*r.height*4);if(1<s){for(var u=function(e,t){try{t.decodeAndBlitFrameRGBA(e,l)}catch(e){x.default._friendlyFileLoadError(8,r.src),"function"==typeof n?n(e):console.error(e)}},c=0;c<s;c++){var d=i.frameInfo(c);1===i.frameInfo(c).disposal&&0<c?r.drawingContext.putImageData(a[c-1].image,0,0):(r.drawingContext.clearRect(0,0,r.width,r.height),l=new Uint8ClampedArray(r.width*r.height*4)),u(c,i);var f=new ImageData(l,r.width,r.height);r.drawingContext.putImageData(f,0,0);var h=d.delay;0===h&&(h=10),a.push({image:r.drawingContext.getImageData(0,0,r.width,r.height),delay:10*h})}var p=i.loopCount();null===p?p=1:0===p&&(p=null),r.drawingContext.putImageData(a[0].image,0,0),r.gifProperties={displayIndex:0,loopLimit:p,loopCount:0,frames:a,numFrames:s,playing:!0,timeDisplayed:0,lastChangeTime:0}}"function"==typeof t&&t(r);o()}(new Uint8Array(e),a,o,i,function(e){s._decrementPreload()}.bind(s))},function(e){"function"==typeof i?i(e):console.error(e)});else{var r=new Image;r.onload=function(){a.width=a.canvas.width=r.width,a.height=a.canvas.height=r.height,a.drawingContext.drawImage(r,0,0),a.modified=!0,"function"==typeof o&&o(a),s._decrementPreload()},r.onerror=function(e){x.default._friendlyFileLoadError(0,r.src),"function"==typeof i?i(e):console.error(e)},0!==n.indexOf("data:image/")&&(r.crossOrigin="Anonymous"),r.src=n}a.modified=!0}).catch(function(e){x.default._friendlyFileLoadError(0,n),"function"==typeof i?i(e):console.error(e)}),a},x.default.prototype.image=function(e,t,r,n,o,i,a,s,l){x.default._validateParameters("image",arguments);var u=e.width,c=e.height;e.elt&&e.elt.videoWidth&&!e.canvas&&(u=e.elt.videoWidth,c=e.elt.videoHeight);var d=t,f=r,h=n||u,p=o||c,y=i||0,m=a||0,g=s||u,v=l||c;g=S(g,u),v=S(v,c);var b=1;e.elt&&!e.canvas&&e.elt.style.width&&(b=e.elt.videoWidth&&!n?e.elt.videoWidth:e.elt.width,b/=parseInt(e.elt.style.width,10)),y*=b,m*=b,v*=b,g*=b;var _=w.default.modeAdjust(d,f,h,p,this._renderer._imageMode);this._renderer.image(e,y,m,g,v,_.x,_.y,_.w,_.h)},x.default.prototype.tint=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];x.default._validateParameters("tint",t);var n=this.color.apply(this,t);this._renderer._tint=n.levels},x.default.prototype.noTint=function(){this._renderer._tint=null},x.default.prototype._getTintedImageCanvas=function(e){if(!e.canvas)return e;var t=d.default._toPixels(e.canvas),r=document.createElement("canvas");r.width=e.canvas.width,r.height=e.canvas.height;for(var n=r.getContext("2d"),o=n.createImageData(e.canvas.width,e.canvas.height),i=o.data,a=0;a<t.length;a+=4){var s=t[a],l=t[a+1],u=t[a+2],c=t[a+3];i[a]=s*this._renderer._tint[0]/255,i[a+1]=l*this._renderer._tint[1]/255,i[a+2]=u*this._renderer._tint[2]/255,i[a+3]=c*this._renderer._tint[3]/255}return n.putImageData(o,0,0),r},x.default.prototype.imageMode=function(e){x.default._validateParameters("imageMode",arguments),e!==n.CORNER&&e!==n.CORNERS&&e!==n.CENTER||(this._renderer._imageMode=e)};var i=x.default;r.default=i},{"../core/constants":250,"../core/friendly_errors/fes_core":252,"../core/friendly_errors/file_errors":253,"../core/friendly_errors/validate_params":255,"../core/helpers":256,"../core/main":260,"./filters":281,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.promise":175,"core-js/modules/es.string.includes":182,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint8-array":223,"core-js/modules/es.typed-array.uint8-clamped-array":224,omggif:235}],284:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var o=i(e("../core/main")),n=i(e("./filters"));function i(e){return e&&e.__esModule?e:{default:e}}o.default.Image=function(e,t){this.width=e,this.height=t,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.drawingContext=this.canvas.getContext("2d"),(this._pixelsState=this)._pixelDensity=1,this.gifProperties=null,this._modified=!1,this.pixels=[]},o.default.Image.prototype._animateGif=function(e){var t=this.gifProperties,r=e._lastFrameTime+e.deltaTime;if(0===t.lastChangeTime&&(t.lastChangeTime=r),t.playing){t.timeDisplayed=r-t.lastChangeTime;var n=t.frames[t.displayIndex].delay;if(t.timeDisplayed>=n){var o=Math.floor(t.timeDisplayed/n);if(t.timeDisplayed=0,t.lastChangeTime=r,t.displayIndex+=o,t.loopCount=Math.floor(t.displayIndex/t.numFrames),null!==t.loopLimit&&t.loopCount>=t.loopLimit)t.playing=!1;else{var i=t.displayIndex%t.numFrames;this.drawingContext.putImageData(t.frames[i].image,0,0),t.displayIndex=i,this.setModified(!0)}}}},o.default.Image.prototype._setProperty=function(e,t){this[e]=t,this.setModified(!0)},o.default.Image.prototype.loadPixels=function(){o.default.Renderer2D.prototype.loadPixels.call(this),this.setModified(!0)},o.default.Image.prototype.updatePixels=function(e,t,r,n){o.default.Renderer2D.prototype.updatePixels.call(this,e,t,r,n),this.setModified(!0)},o.default.Image.prototype.get=function(e,t,r,n){return o.default._validateParameters("p5.Image.get",arguments),o.default.Renderer2D.prototype.get.apply(this,arguments)},o.default.Image.prototype._getPixel=o.default.Renderer2D.prototype._getPixel,o.default.Image.prototype.set=function(e,t,r){o.default.Renderer2D.prototype.set.call(this,e,t,r),this.setModified(!0)},o.default.Image.prototype.resize=function(e,t){0===e&&0===t?(e=this.canvas.width,t=this.canvas.height):0===e?e=this.canvas.width*t/this.canvas.height:0===t&&(t=this.canvas.height*e/this.canvas.width),e=Math.floor(e),t=Math.floor(t);var r=document.createElement("canvas");if(r.width=e,r.height=t,this.gifProperties)for(var n=this.gifProperties,o=function(e,t){for(var r=0,n=0;n<t.height;n++)for(var o=0;o<t.width;o++){var i=Math.floor(o*e.width/t.width),a=4*(Math.floor(n*e.height/t.height)*e.width+i);t.data[r++]=e.data[a++],t.data[r++]=e.data[a++],t.data[r++]=e.data[a++],t.data[r++]=e.data[a++]}},i=0;i<n.numFrames;i++){var a=this.drawingContext.createImageData(e,t);o(n.frames[i].image,a),n.frames[i].image=a}r.getContext("2d").drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,r.width,r.height),this.canvas.width=this.width=e,this.canvas.height=this.height=t,this.drawingContext.drawImage(r,0,0,e,t,0,0,e,t),0<this.pixels.length&&this.loadPixels(),this.setModified(!0)},o.default.Image.prototype.copy=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.default.prototype.copy.apply(this,t)},o.default.Image.prototype.mask=function(e){void 0===e&&(e=this);var t=this.drawingContext.globalCompositeOperation,r=1;e instanceof o.default.Renderer&&(r=e._pInst._pixelDensity);var n=[e,0,0,r*e.width,r*e.height,0,0,this.width,this.height];this.drawingContext.globalCompositeOperation="destination-in",o.default.Image.prototype.copy.apply(this,n),this.drawingContext.globalCompositeOperation=t,this.setModified(!0)},o.default.Image.prototype.filter=function(e,t){n.default.apply(this.canvas,n.default[e],t),this.setModified(!0)},o.default.Image.prototype.blend=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];o.default._validateParameters("p5.Image.blend",arguments),o.default.prototype.blend.apply(this,t),this.setModified(!0)},o.default.Image.prototype.setModified=function(e){this._modified=e},o.default.Image.prototype.isModified=function(){return this._modified},o.default.Image.prototype.save=function(e,t){this.gifProperties?o.default.prototype.saveGif(this,e):o.default.prototype.saveCanvas(this.canvas,e,t)},o.default.Image.prototype.reset=function(){if(this.gifProperties){var e=this.gifProperties;e.playing=!0,e.timeSinceStart=0,e.timeDisplayed=0,e.lastChangeTime=0,e.loopCount=0,e.displayIndex=0,this.drawingContext.putImageData(e.frames[0].image,0,0)}},o.default.Image.prototype.getCurrentFrame=function(){if(this.gifProperties){var e=this.gifProperties;return e.displayIndex%e.numFrames}},o.default.Image.prototype.setFrame=function(e){if(this.gifProperties){var t=this.gifProperties;e<t.numFrames&&0<=e?(t.timeDisplayed=0,t.lastChangeTime=0,t.displayIndex=e,this.drawingContext.putImageData(t.frames[e].image,0,0)):console.log("Cannot set GIF to a frame number that is higher than total number of frames or below zero.")}},o.default.Image.prototype.numFrames=function(){if(this.gifProperties)return this.gifProperties.numFrames},o.default.Image.prototype.play=function(){this.gifProperties&&(this.gifProperties.playing=!0)},o.default.Image.prototype.pause=function(){this.gifProperties&&(this.gifProperties.playing=!1)},o.default.Image.prototype.delay=function(e,t){if(this.gifProperties){var r=this.gifProperties;if(t<r.numFrames&&0<=t)r.frames[t].delay=e;else{var n=!0,o=!1,i=void 0;try{for(var a,s=r.frames[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){a.value.delay=e}}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}}}};var a=o.default.Image;r.default=a},{"../core/main":260,"./filters":281,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],285:[function(e,t,r){"use strict";e("core-js/modules/es.array.filter"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var h=o(e("../core/main")),n=o(e("./filters"));function o(e){return e&&e.__esModule?e:{default:e}}e("../color/p5.Color"),h.default.prototype.pixels=[],h.default.prototype.blend=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n;(h.default._validateParameters("blend",t),this._renderer)?(n=this._renderer).blend.apply(n,t):h.default.Renderer2D.prototype.blend.apply(this,t)},h.default.prototype.copy=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n,o,i,a,s,l,u,c,d;if(h.default._validateParameters("copy",t),9===t.length)n=t[0],o=t[1],i=t[2],a=t[3],s=t[4],l=t[5],u=t[6],c=t[7],d=t[8];else{if(8!==t.length)throw new Error("Signature not supported");n=this,o=t[0],i=t[1],a=t[2],s=t[3],l=t[4],u=t[5],c=t[6],d=t[7]}h.default.prototype._copyHelper(this,n,o,i,a,s,l,u,c,d)},h.default.prototype._copyHelper=function(e,t,r,n,o,i,a,s,l,u){t.loadPixels();var c=t.canvas.width/t.width,d=0,f=0;t._renderer&&t._renderer.isP3D&&(d=t.width/2,f=t.height/2),e._renderer&&e._renderer.isP3D?h.default.RendererGL.prototype.image.call(e._renderer,t,r+d,n+f,o,i,a,s,l,u):e.drawingContext.drawImage(t.canvas,c*(r+d),c*(n+f),c*o,c*i,a,s,l,u)},h.default.prototype.filter=function(e,t){h.default._validateParameters("filter",arguments),void 0!==this.canvas?n.default.apply(this.canvas,n.default[e],t):n.default.apply(this.elt,n.default[e],t)},h.default.prototype.get=function(e,t,r,n){var o;return h.default._validateParameters("get",arguments),(o=this._renderer).get.apply(o,arguments)},h.default.prototype.loadPixels=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];h.default._validateParameters("loadPixels",t),this._renderer.loadPixels()},h.default.prototype.set=function(e,t,r){this._renderer.set(e,t,r)},h.default.prototype.updatePixels=function(e,t,r,n){h.default._validateParameters("updatePixels",arguments),0!==this.pixels.length&&this._renderer.updatePixels(e,t,r,n)};var i=h.default;r.default=i},{"../color/p5.Color":248,"../core/main":260,"./filters":281,"core-js/modules/es.array.filter":151}],286:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.last-index-of"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.array.splice"),e("core-js/modules/es.function.name"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.promise"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.includes"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.split"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.iterator"),e("core-js/modules/web.url"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var g=n(e("../core/main"));e("whatwg-fetch"),e("es6-promise/auto");var m=n(e("fetch-jsonp")),s=n(e("file-saver"));function n(e){return e&&e.__esModule?e:{default:e}}function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){var r={};if(void 0===(t=t||[]))for(var n=0;n<e.length;n++)t[n.toString()]=n;for(var o=0;o<t.length;o++){var i=t[o],a=e[o];r[i]=a}return r}function y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function l(e,t){t&&!0!==t&&"true"!==t||(t="");var r="";return(e=e||"untitled")&&e.includes(".")&&(r=e.split(".").pop()),t&&r!==t&&(r=t,e="".concat(e,".").concat(r)),[e,r]}e("../core/friendly_errors/validate_params"),e("../core/friendly_errors/file_errors"),e("../core/friendly_errors/fes_core"),g.default.prototype.loadJSON=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g.default._validateParameters("loadJSON",t);for(var n,o,i,a=t[0],s={},l="json",u=1;u<t.length;u++){var c=t[u];"string"==typeof c?"jsonp"!==c&&"json"!==c||(l=c):"function"==typeof c?n?o=c:n=c:"object"===v(c)&&(c.hasOwnProperty("jsonpCallback")||c.hasOwnProperty("jsonpCallbackFunction"))&&(l="jsonp",i=c)}var d=this;return this.httpDo(a,"GET",i,l,function(e){for(var t in e)s[t]=e[t];void 0!==n&&n(e),d._decrementPreload()},function(e){if(g.default._friendlyFileLoadError(5,a),!o)throw e;o(e)}),s},g.default.prototype.loadStrings=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g.default._validateParameters("loadStrings",t);for(var o,n,i=[],a=1;a<t.length;a++){var s=t[a];"function"==typeof s&&(void 0===o?o=s:void 0===n&&(n=s))}var l=this;return g.default.prototype.httpDo.call(this,t[0],"GET","text",function(e){for(var t=e.replace(/\r\n/g,"\r").replace(/\n/g,"\r").split(/\r/),r=0,n=t.length;r<n;r+=32768)Array.prototype.push.apply(i,t.slice(r,Math.min(r+32768,n)));void 0!==o&&o(i),l._decrementPreload()},function(e){if(g.default._friendlyFileLoadError(3,e),!n)throw e;n(e)}),i},g.default.prototype.loadTable=function(t){var f,r,h,e=[],p=!1,n=t.substring(t.lastIndexOf(".")+1,t.length);"csv"===n?h=",":"ssv"===n?h=";":"tsv"===n&&(h="\t");for(var o=1;o<arguments.length;o++)"function"==typeof arguments[o]?void 0===f?f=arguments[o]:void 0===r&&(r=arguments[o]):"string"==typeof arguments[o]&&(e.push(arguments[o]),"header"===arguments[o]&&(p=!0),"csv"===arguments[o]?h=",":"ssv"===arguments[o]?h=";":"tsv"===arguments[o]&&(h="\t"));var y=new g.default.Table,m=this;return this.httpDo(t,"GET","table",function(e){for(var t,r,n={},o=[],i=0,a=null,s=function(){n.currentState=0,n.token=""},l=function(){a.push(n.token),s()},u=function(){n.currentState=4,o.push(a),a=null};;){if(null==(t=e[i++])){if(n.escaped)throw new Error("Unclosed quote in file.");if(a){l(),u();break}}if(null===a&&(n.escaped=!1,a=[],s()),0===n.currentState){if('"'===t){n.escaped=!0,n.currentState=1;continue}n.currentState=1}if(1===n.currentState&&n.escaped)if('"'===t)'"'===e[i]?(n.token+='"',i++):(n.escaped=!1,n.currentState=2);else{if("\r"===t)continue;n.token+=t}else"\r"===t?("\n"===e[i]&&i++,l(),u()):"\n"===t?(l(),u()):t===h?l():1===n.currentState&&(n.token+=t)}if(p)y.columns=o.shift();else for(var c=0;c<o[0].length;c++)y.columns[c]="null";for(var d=0;d<o.length;d++)(1!==o[d].length||"undefined"!==o[d][0]&&""!==o[d][0])&&((r=new g.default.TableRow).arr=o[d],r.obj=b(o[d],y.columns),y.addRow(r));"function"==typeof f&&f(y),m._decrementPreload()},function(e){g.default._friendlyFileLoadError(2,t),r?r(e):console.error(e)}),y},g.default.prototype.loadXML=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];for(var n,o,i=new g.default.XML,a=1;a<t.length;a++){var s=t[a];"function"==typeof s&&(void 0===n?n=s:void 0===o&&(o=s))}var l=this;return this.httpDo(t[0],"GET","xml",function(e){for(var t in e)i[t]=e[t];void 0!==n&&n(i),l._decrementPreload()},function(e){if(g.default._friendlyFileLoadError(1,e),!o)throw e;o(e)}),i},g.default.prototype.loadBytes=function(t,r,n){var o={},i=this;return this.httpDo(t,"GET","arrayBuffer",function(e){o.bytes=new Uint8Array(e),"function"==typeof r&&r(o),i._decrementPreload()},function(e){if(g.default._friendlyFileLoadError(6,t),!n)throw e;n(e)}),o},g.default.prototype.httpGet=function(){g.default._validateParameters("httpGet",arguments);var e=Array.prototype.slice.call(arguments);return e.splice(1,0,"GET"),g.default.prototype.httpDo.apply(this,e)},g.default.prototype.httpPost=function(){g.default._validateParameters("httpPost",arguments);var e=Array.prototype.slice.call(arguments);return e.splice(1,0,"POST"),g.default.prototype.httpDo.apply(this,e)},g.default.prototype.httpDo=function(){for(var n,e,t,r,o,i={},a=0,s="text/plain",l=arguments.length-1;0<l&&"function"==typeof(l<0||arguments.length<=l?void 0:arguments[l]);l--)a++;var u=arguments.length<=0?void 0:arguments[0];if(2==arguments.length-a&&"string"==typeof u&&"object"===v(arguments.length<=1?void 0:arguments[1]))r=new Request(u,arguments.length<=1?void 0:arguments[1]),e=arguments.length<=2?void 0:arguments[2],t=arguments.length<=3?void 0:arguments[3];else{for(var c,d="GET",f=1;f<arguments.length;f++){var h=f<0||arguments.length<=f?void 0:arguments[f];if("string"==typeof h)"GET"===h||"POST"===h||"PUT"===h||"DELETE"===h?d=h:"json"===h||"jsonp"===h||"binary"===h||"arrayBuffer"===h||"xml"===h||"text"===h||"table"===h?n=h:c=h;else if("number"==typeof h)c=h.toString();else if("object"===v(h))if(h.hasOwnProperty("jsonpCallback")||h.hasOwnProperty("jsonpCallbackFunction"))for(var p in h)i[p]=h[p];else s=h instanceof g.default.XML?(c=h.serialize(),"application/xml"):(c=JSON.stringify(h),"application/json");else"function"==typeof h&&(e?t=h:e=h)}var y="GET"===d?new Headers:new Headers({"Content-Type":s});r=new Request(u,{method:d,mode:"cors",body:c,headers:y})}return(o=(o="jsonp"===(n=n||(u.includes("json")?"json":u.includes("xml")?"xml":"text"))?(0,m.default)(u,i):fetch(r)).then(function(e){if(!e.ok){var t=new Error(e.body);throw t.status=e.status,t.ok=!1,t}var r=0;switch("jsonp"!==n&&(r=e.headers.get("content-length")),r&&64e6<r&&g.default._friendlyFileLoadError(7,u),n){case"json":case"jsonp":return e.json();case"binary":return e.blob();case"arrayBuffer":return e.arrayBuffer();case"xml":return e.text().then(function(e){var t=(new DOMParser).parseFromString(e,"text/xml");return new g.default.XML(t.documentElement)});default:return e.text()}})).then(e||function(){}),o.catch(t||console.error),o},window.URL=window.URL||window.webkitURL,g.default.prototype._pWriters=[],g.default.prototype.createWriter=function(e,t){var r;for(var n in g.default.prototype._pWriters)if(g.default.prototype._pWriters[n].name===e)return r=new g.default.PrintWriter(e+this.millis(),t),g.default.prototype._pWriters.push(r),r;return r=new g.default.PrintWriter(e,t),g.default.prototype._pWriters.push(r),r},g.default.PrintWriter=function(r,n){var o=this;this.name=r,this.content="",this.write=function(e){this.content+=e},this.print=function(e){this.content+="".concat(e,"\n")},this.clear=function(){this.content=""},this.close=function(){var e=[];for(var t in e.push(this.content),g.default.prototype.writeFile(e,r,n),g.default.prototype._pWriters)g.default.prototype._pWriters[t].name===this.name&&g.default.prototype._pWriters.splice(t,1);o.clear(),o={}}},g.default.prototype.save=function(e,t,r){var n=arguments,o=this._curElement?this._curElement.elt:this.elt;if(0!==n.length)if(n[0]instanceof g.default.Renderer||n[0]instanceof g.default.Graphics)g.default.prototype.saveCanvas(n[0].elt,n[1],n[2]);else if(1===n.length&&"string"==typeof n[0])g.default.prototype.saveCanvas(o,n[0]);else switch(l(n[1],n[2])[1]){case"json":return void g.default.prototype.saveJSON(n[0],n[1],n[2]);case"txt":return void g.default.prototype.saveStrings(n[0],n[1],n[2]);default:n[0]instanceof Array?g.default.prototype.saveStrings(n[0],n[1],n[2]):n[0]instanceof g.default.Table?g.default.prototype.saveTable(n[0],n[1],n[2]):n[0]instanceof g.default.Image?g.default.prototype.saveCanvas(n[0].canvas,n[1]):n[0]instanceof g.default.SoundFile&&g.default.prototype.saveSound(n[0],n[1],n[2],n[3])}else g.default.prototype.saveCanvas(o)},g.default.prototype.saveJSON=function(e,t,r){var n;g.default._validateParameters("saveJSON",arguments),n=r?JSON.stringify(e):JSON.stringify(e,void 0,2),this.saveStrings(n.split("\n"),t,"json")},g.default.prototype.saveJSONObject=g.default.prototype.saveJSON,g.default.prototype.saveJSONArray=g.default.prototype.saveJSON,g.default.prototype.saveStrings=function(e,t,r,n){g.default._validateParameters("saveStrings",arguments);for(var o=r||"txt",i=this.createWriter(t,o),a=0;a<e.length;a++)n?i.write(e[a]+"\r\n"):i.write(e[a]+"\n");i.close(),i.clear()},g.default.prototype.saveTable=function(e,t,r){var n;g.default._validateParameters("saveTable",arguments),n=void 0===r?t.substring(t.lastIndexOf(".")+1,t.length):r;var o=this.createWriter(t,n),i=e.columns,a=",";if("tsv"===n&&(a="\t"),"html"!==n){if("0"!==i[0]){for(var s=0;s<i.length;s++)s<i.length-1?o.write(i[s]+a):o.write(i[s]);o.write("\n")}for(var l=0;l<e.rows.length;l++){var u=void 0;for(u=0;u<e.rows[l].arr.length;u++)u<e.rows[l].arr.length-1?"csv"===n&&String(e.rows[l].arr[u]).includes(",")?o.write('"'+e.rows[l].arr[u]+'"'+a):o.write(e.rows[l].arr[u]+a):"csv"===n&&String(e.rows[l].arr[u]).includes(",")?o.write('"'+e.rows[l].arr[u]+'"'):o.write(e.rows[l].arr[u]);o.write("\n")}}else{o.print("<html>"),o.print("<head>");if(o.print('  <meta http-equiv="content-type" content="text/html;charset=utf-8" />'),o.print("</head>"),o.print("<body>"),o.print("  <table>"),"0"!==i[0]){o.print("    <tr>");for(var c=0;c<i.length;c++){var d=y(i[c]);o.print("      <td>".concat(d)),o.print("      </td>")}o.print("    </tr>")}for(var f=0;f<e.rows.length;f++){o.print("    <tr>");for(var h=0;h<e.columns.length;h++){var p=y(e.rows[f].getString(h));o.print("      <td>".concat(p)),o.print("      </td>")}o.print("    </tr>")}o.print("  </table>"),o.print("</body>"),o.print("</html>")}o.close(),o.clear()},g.default.prototype.writeFile=function(e,t,r){var n="application/octet-stream";g.default.prototype._isSafari()&&(n="text/plain");var o=new Blob(e,{type:n});g.default.prototype.downloadFile(o,t,r)},g.default.prototype.downloadFile=function(e,t,r){var n=l(t,r),o=n[0];if(e instanceof Blob)s.default.saveAs(e,o);else{var i=document.createElement("a");if(i.href=e,i.download=o,i.onclick=function(e){var t;t=e,document.body.removeChild(t.target),e.stopPropagation()},i.style.display="none",document.body.appendChild(i),g.default.prototype._isSafari()){var a="Hello, Safari user! To download this file...\n";a+="1. Go to File --\x3e Save As.\n",a+='2. Choose "Page Source" as the Format.\n',a+='3. Name it with this extension: ."'.concat(n[1],'"'),alert(a)}i.click()}},g.default.prototype._checkFileExtension=l,g.default.prototype._isSafari=function(){return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")};var o=g.default;r.default=o},{"../core/friendly_errors/fes_core":252,"../core/friendly_errors/file_errors":253,"../core/friendly_errors/validate_params":255,"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.last-index-of":158,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.splice":162,"core-js/modules/es.function.name":163,"core-js/modules/es.object.to-string":174,"core-js/modules/es.promise":175,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.includes":182,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.split":188,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint8-array":223,"core-js/modules/web.dom-collections.iterator":226,"core-js/modules/web.url":228,"es6-promise/auto":229,"fetch-jsonp":231,"file-saver":232,"whatwg-fetch":239}],287:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.join"),e("core-js/modules/es.array.splice"),e("core-js/modules/es.regexp.constructor"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.match"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.trim"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.Table=function(e){this.columns=[],this.rows=[]},o.default.Table.prototype.addRow=function(e){var t=e||new o.default.TableRow;if(void 0===t.arr||void 0===t.obj)throw new Error("invalid TableRow: ".concat(t));return(t.table=this).rows.push(t),t},o.default.Table.prototype.removeRow=function(e){this.rows[e].table=null;var t=this.rows.splice(e+1,this.rows.length);this.rows.pop(),this.rows=this.rows.concat(t)},o.default.Table.prototype.getRow=function(e){return this.rows[e]},o.default.Table.prototype.getRows=function(){return this.rows},o.default.Table.prototype.findRow=function(e,t){if("string"==typeof t){for(var r=0;r<this.rows.length;r++)if(this.rows[r].obj[t]===e)return this.rows[r]}else for(var n=0;n<this.rows.length;n++)if(this.rows[n].arr[t]===e)return this.rows[n];return null},o.default.Table.prototype.findRows=function(e,t){var r=[];if("string"==typeof t)for(var n=0;n<this.rows.length;n++)this.rows[n].obj[t]===e&&r.push(this.rows[n]);else for(var o=0;o<this.rows.length;o++)this.rows[o].arr[t]===e&&r.push(this.rows[o]);return r},o.default.Table.prototype.matchRow=function(e,t){if("number"==typeof t){for(var r=0;r<this.rows.length;r++)if(this.rows[r].arr[t].match(e))return this.rows[r]}else for(var n=0;n<this.rows.length;n++)if(this.rows[n].obj[t].match(e))return this.rows[n];return null},o.default.Table.prototype.matchRows=function(e,t){var r=[];if("number"==typeof t)for(var n=0;n<this.rows.length;n++)this.rows[n].arr[t].match(e)&&r.push(this.rows[n]);else for(var o=0;o<this.rows.length;o++)this.rows[o].obj[t].match(e)&&r.push(this.rows[o]);return r},o.default.Table.prototype.getColumn=function(e){var t=[];if("string"==typeof e)for(var r=0;r<this.rows.length;r++)t.push(this.rows[r].obj[e]);else for(var n=0;n<this.rows.length;n++)t.push(this.rows[n].arr[e]);return t},o.default.Table.prototype.clearRows=function(){delete this.rows,this.rows=[]},o.default.Table.prototype.addColumn=function(e){var t=e||null;this.columns.push(t)},o.default.Table.prototype.getColumnCount=function(){return this.columns.length},o.default.Table.prototype.getRowCount=function(){return this.rows.length},o.default.Table.prototype.removeTokens=function(e,t){for(var r=[],n=0;n<e.length;n++)r.push(e.charAt(n).replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"));var o=new RegExp(r.join("|"),"g");if(void 0===t)for(var i=0;i<this.columns.length;i++)for(var a=0;a<this.rows.length;a++){var s=this.rows[a].arr[i];s=s.replace(o,""),this.rows[a].arr[i]=s,this.rows[a].obj[this.columns[i]]=s}else if("string"==typeof t)for(var l=0;l<this.rows.length;l++){var u=this.rows[l].obj[t];u=u.replace(o,""),this.rows[l].obj[t]=u;var c=this.columns.indexOf(t);this.rows[l].arr[c]=u}else for(var d=0;d<this.rows.length;d++){var f=this.rows[d].arr[t];f=f.replace(o,""),this.rows[d].arr[t]=f,this.rows[d].obj[this.columns[t]]=f}},o.default.Table.prototype.trim=function(e){var t=new RegExp(" ","g");if(void 0===e)for(var r=0;r<this.columns.length;r++)for(var n=0;n<this.rows.length;n++){var o=this.rows[n].arr[r];o=o.replace(t,""),this.rows[n].arr[r]=o,this.rows[n].obj[this.columns[r]]=o}else if("string"==typeof e)for(var i=0;i<this.rows.length;i++){var a=this.rows[i].obj[e];a=a.replace(t,""),this.rows[i].obj[e]=a;var s=this.columns.indexOf(e);this.rows[i].arr[s]=a}else for(var l=0;l<this.rows.length;l++){var u=this.rows[l].arr[e];u=u.replace(t,""),this.rows[l].arr[e]=u,this.rows[l].obj[this.columns[e]]=u}},o.default.Table.prototype.removeColumn=function(e){var t,r;"string"==typeof e?(t=e,r=this.columns.indexOf(e)):(r=e,t=this.columns[e]);var n=this.columns.splice(r+1,this.columns.length);this.columns.pop(),this.columns=this.columns.concat(n);for(var o=0;o<this.rows.length;o++){var i=this.rows[o].arr,a=i.splice(r+1,i.length);i.pop(),this.rows[o].arr=i.concat(a),delete this.rows[o].obj[t]}},o.default.Table.prototype.set=function(e,t,r){this.rows[e].set(t,r)},o.default.Table.prototype.setNum=function(e,t,r){this.rows[e].setNum(t,r)},o.default.Table.prototype.setString=function(e,t,r){this.rows[e].setString(t,r)},o.default.Table.prototype.get=function(e,t){return this.rows[e].get(t)},o.default.Table.prototype.getNum=function(e,t){return this.rows[e].getNum(t)},o.default.Table.prototype.getString=function(e,t){return this.rows[e].getString(t)},o.default.Table.prototype.getObject=function(e){for(var t,r={},n=0;n<this.rows.length;n++)if(t=this.rows[n].obj,"string"==typeof e){if(!(0<=this.columns.indexOf(e)))throw new Error('This table has no column named "'.concat(e,'"'));r[t[e]]=t}else r[n]=this.rows[n].obj;return r},o.default.Table.prototype.getArray=function(){for(var e=[],t=0;t<this.rows.length;t++)e.push(this.rows[t].arr);return e};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.join":157,"core-js/modules/es.array.splice":162,"core-js/modules/es.regexp.constructor":177,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.match":184,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.trim":190}],288:[function(e,t,r){"use strict";e("core-js/modules/es.array.index-of"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.split"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.TableRow=function(e,t){var r=[],n={};e&&(t=t||",",r=e.split(t));for(var o=0;o<r.length;o++){var i=o,a=r[o];n[i]=a}this.arr=r,this.obj=n,this.table=null},o.default.TableRow.prototype.set=function(e,t){if("string"==typeof e){var r=this.table.columns.indexOf(e);if(!(0<=r))throw new Error('This table has no column named "'.concat(e,'"'));this.obj[e]=t,this.arr[r]=t}else{if(!(e<this.table.columns.length))throw new Error("Column #".concat(e," is out of the range of this table"));this.arr[e]=t;var n=this.table.columns[e];this.obj[n]=t}},o.default.TableRow.prototype.setNum=function(e,t){var r=parseFloat(t);this.set(e,r)},o.default.TableRow.prototype.setString=function(e,t){var r=t.toString();this.set(e,r)},o.default.TableRow.prototype.get=function(e){return"string"==typeof e?this.obj[e]:this.arr[e]},o.default.TableRow.prototype.getNum=function(e){var t;if("NaN"===(t="string"==typeof e?parseFloat(this.obj[e]):parseFloat(this.arr[e])).toString())throw"Error: ".concat(this.obj[e]," is NaN (Not a Number)");return t},o.default.TableRow.prototype.getString=function(e){return"string"==typeof e?this.obj[e].toString():this.arr[e].toString()};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.index-of":155,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.split":188}],289:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.number.constructor"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.replace"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("../core/main"))&&n.__esModule?n:{default:n};function o(e){for(var t=[],r=0;r<e.length;r++)t.push(new s.default.XML(e[r]));return t}s.default.XML=function(e){if(e)this.DOM=e;else{var t=document.implementation.createDocument(null,"doc");this.DOM=t.createElement("root")}},s.default.XML.prototype.getParent=function(){return new s.default.XML(this.DOM.parentElement)},s.default.XML.prototype.getName=function(){return this.DOM.tagName},s.default.XML.prototype.setName=function(e){var t=this.DOM.innerHTML,r=this.DOM.attributes,n=document.implementation.createDocument(null,"default").createElement(e);n.innerHTML=t;for(var o=0;o<r.length;o++)n.setAttribute(r[o].nodeName,r.nodeValue);this.DOM=n},s.default.XML.prototype.hasChildren=function(){return 0<this.DOM.children.length},s.default.XML.prototype.listChildren=function(){for(var e=[],t=0;t<this.DOM.childNodes.length;t++)e.push(this.DOM.childNodes[t].nodeName);return e},s.default.XML.prototype.getChildren=function(e){return o(e?this.DOM.getElementsByTagName(e):this.DOM.children)},s.default.XML.prototype.getChild=function(e){if("string"!=typeof e)return new s.default.XML(this.DOM.children[e]);var t=!0,r=!1,n=void 0;try{for(var o,i=this.DOM.children[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;if(a.tagName===e)return new s.default.XML(a)}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}},s.default.XML.prototype.addChild=function(e){e instanceof s.default.XML&&this.DOM.appendChild(e.DOM)},s.default.XML.prototype.removeChild=function(e){var t=-1;if("string"==typeof e){for(var r=0;r<this.DOM.children.length;r++)if(this.DOM.children[r].tagName===e){t=r;break}}else t=e;-1!==t&&this.DOM.removeChild(this.DOM.children[t])},s.default.XML.prototype.getAttributeCount=function(){return this.DOM.attributes.length},s.default.XML.prototype.listAttributes=function(){var e=[],t=!0,r=!1,n=void 0;try{for(var o,i=this.DOM.attributes[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;e.push(a.nodeName)}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}return e},s.default.XML.prototype.hasAttribute=function(e){var t={},r=!0,n=!1,o=void 0;try{for(var i,a=this.DOM.attributes[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value;t[s.nodeName]=s.nodeValue}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}return!!t[e]},s.default.XML.prototype.getNum=function(e,t){var r={},n=!0,o=!1,i=void 0;try{for(var a,s=this.DOM.attributes[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var l=a.value;r[l.nodeName]=l.nodeValue}}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return Number(r[e])||t||0},s.default.XML.prototype.getString=function(e,t){var r={},n=!0,o=!1,i=void 0;try{for(var a,s=this.DOM.attributes[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var l=a.value;r[l.nodeName]=l.nodeValue}}catch(e){o=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r[e]?String(r[e]):t||null},s.default.XML.prototype.setAttribute=function(e,t){this.DOM.setAttribute(e,t)},s.default.XML.prototype.getContent=function(e){return this.DOM.textContent.replace(/\s\s+/g,",")||e||null},s.default.XML.prototype.setContent=function(e){this.DOM.children.length||(this.DOM.textContent=e)},s.default.XML.prototype.serialize=function(){return(new XMLSerializer).serializeToString(this.DOM)};var i=s.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.iterator":156,"core-js/modules/es.number.constructor":167,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.replace":186,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],290:[function(e,t,r){"use strict";e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.math.hypot"),e("core-js/modules/es.number.constructor"),e("core-js/modules/es.string.includes"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("../core/main"))&&n.__esModule?n:{default:n};function o(){if("function"==typeof Math.hypot)return Math.hypot.apply(null,arguments);for(var e=arguments.length,t=[],r=0,n=0;n<e;n++){var o=arguments[n];if((o=+o)===1/0||o===-1/0)return 1/0;r<(o=Math.abs(o))&&(r=o),t[n]=o}0===r&&(r=1);for(var i=0,a=0,s=0;s<e;s++){var l=t[s]/r,u=l*l-a,c=i+u;a=c-i-u,i=c}return Math.sqrt(i)*r}s.default.prototype.abs=Math.abs,s.default.prototype.ceil=Math.ceil,s.default.prototype.constrain=function(e,t,r){return s.default._validateParameters("constrain",arguments),Math.max(Math.min(e,r),t)},s.default.prototype.dist=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return s.default._validateParameters("dist",t),4===t.length?o(t[2]-t[0],t[3]-t[1]):6===t.length?o(t[3]-t[0],t[4]-t[1],t[5]-t[2]):void 0},s.default.prototype.exp=Math.exp,s.default.prototype.floor=Math.floor,s.default.prototype.lerp=function(e,t,r){return s.default._validateParameters("lerp",arguments),r*(t-e)+e},s.default.prototype.log=Math.log,s.default.prototype.mag=function(e,t){return s.default._validateParameters("mag",arguments),o(e,t)},s.default.prototype.map=function(e,t,r,n,o,i){s.default._validateParameters("map",arguments);var a=(e-t)/(r-t)*(o-n)+n;return i?n<o?this.constrain(a,n,o):this.constrain(a,o,n):a},s.default.prototype.max=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t[0]instanceof Array?Math.max.apply(null,t[0]):Math.max.apply(null,t)},s.default.prototype.min=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t[0]instanceof Array?Math.min.apply(null,t[0]):Math.min.apply(null,t)},s.default.prototype.norm=function(e,t,r){return s.default._validateParameters("norm",arguments),this.map(e,t,r,0,1)},s.default.prototype.pow=Math.pow,s.default.prototype.round=function(e,t){return t?Number(Math.round(e+"e"+t)+"e-"+t):Math.round(e)},s.default.prototype.sq=function(e){return e*e},s.default.prototype.sqrt=Math.sqrt,s.default.prototype.fract=function(e){s.default._validateParameters("fract",arguments);var t=0,r=Number(e);if(isNaN(r)||Math.abs(r)===1/0)return r;if(r<0&&(r=-r,t=1),!String(r).includes(".")||String(r).includes("e"))return r<1?Math.abs(t-r):0;var n=String(r);return n=Number("0"+n.slice(n.indexOf("."))),Math.abs(t-n)};var i=s.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.math.hypot":165,"core-js/modules/es.number.constructor":167,"core-js/modules/es.string.includes":182}],291:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.createVector=function(e,t,r){return this instanceof o.default?new o.default.Vector(this,arguments):new o.default.Vector(e,t,r)};var i=o.default;r.default=i},{"../core/main":260}],292:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};function b(e){return.5*(1-Math.cos(e*Math.PI))}var _,x=4095,w=4,S=.5;o.default.prototype.noise=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;if(null==_){_=new Array(4096);for(var n=0;n<4096;n++)_[n]=Math.random()}e<0&&(e=-e),t<0&&(t=-t),r<0&&(r=-r);for(var o,i,a,s,l,u=Math.floor(e),c=Math.floor(t),d=Math.floor(r),f=e-u,h=t-c,p=r-d,y=0,m=.5,g=0;g<w;g++){var v=u+(c<<4)+(d<<8);o=b(f),i=b(h),a=_[v&x],a+=o*(_[v+1&x]-a),s=_[v+16&x],a+=i*((s+=o*(_[v+16+1&x]-s))-a),s=_[(v+=256)&x],s+=o*(_[v+1&x]-s),l=_[v+16&x],s+=i*((l+=o*(_[v+16+1&x]-l))-s),y+=(a+=b(p)*(s-a))*m,m*=S,u<<=1,c<<=1,d<<=1,1<=(f*=2)&&(u++,f--),1<=(h*=2)&&(c++,h--),1<=(p*=2)&&(d++,p--)}return y},o.default.prototype.noiseDetail=function(e,t){0<e&&(w=e),0<t&&(S=t)},o.default.prototype.noiseSeed=function(e){var t,r,n,o=(n=4294967296,{setSeed:function(e){r=t=(null==e?Math.random()*n:e)>>>0},getSeed:function(){return t},rand:function(){return(r=(1664525*r+1013904223)%n)/n}});o.setSeed(e),_=new Array(4096);for(var i=0;i<4096;i++)_[i]=o.rand()};var i=o.default;r.default=i},{"../core/main":260}],293:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.every"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.array.some"),e("core-js/modules/es.math.sign"),e("core-js/modules/es.number.constructor"),e("core-js/modules/es.number.is-finite"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.sub"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,l=(n=e("../core/main"))&&n.__esModule?n:{default:n},i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}l.default.Vector=function(e,t,r){var n,o,i;i=e instanceof l.default?(this.p5=e,n=t[0]||0,o=t[1]||0,t[2]||0):(n=e||0,o=t||0,r||0),this.x=n,this.y=o,this.z=i},l.default.Vector.prototype.toString=function(){return"p5.Vector Object : [".concat(this.x,", ").concat(this.y,", ").concat(this.z,"]")},l.default.Vector.prototype.set=function(e,t,r){return e instanceof l.default.Vector?(this.x=e.x||0,this.y=e.y||0,this.z=e.z||0):e instanceof Array?(this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0):(this.x=e||0,this.y=t||0,this.z=r||0),this},l.default.Vector.prototype.copy=function(){return this.p5?new l.default.Vector(this.p5,[this.x,this.y,this.z]):new l.default.Vector(this.x,this.y,this.z)},l.default.Vector.prototype.add=function(e,t,r){return e instanceof l.default.Vector?(this.x+=e.x||0,this.y+=e.y||0,this.z+=e.z||0):e instanceof Array?(this.x+=e[0]||0,this.y+=e[1]||0,this.z+=e[2]||0):(this.x+=e||0,this.y+=t||0,this.z+=r||0),this};function u(e,t){return 0!==e&&(this.x=this.x%e),0!==t&&(this.y=this.y%t),this}function c(e,t,r){return 0!==e&&(this.x=this.x%e),0!==t&&(this.y=this.y%t),0!==r&&(this.z=this.z%r),this}l.default.Vector.prototype.rem=function(e,t,r){if(e instanceof l.default.Vector){if(Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.z)){var n=parseFloat(e.x),o=parseFloat(e.y),i=parseFloat(e.z);c.call(this,n,o,i)}}else if(e instanceof Array)e.every(function(e){return Number.isFinite(e)})&&(2===e.length&&u.call(this,e[0],e[1]),3===e.length&&c.call(this,e[0],e[1],e[2]));else if(1===arguments.length){if(Number.isFinite(e)&&0!==e)return this.x=this.x%e,this.y=this.y%e,this.z=this.z%e,this}else if(2===arguments.length){var a=Array.prototype.slice.call(arguments);a.every(function(e){return Number.isFinite(e)})&&2===a.length&&u.call(this,a[0],a[1])}else if(3===arguments.length){var s=Array.prototype.slice.call(arguments);s.every(function(e){return Number.isFinite(e)})&&3===s.length&&c.call(this,s[0],s[1],s[2])}},l.default.Vector.prototype.sub=function(e,t,r){return e instanceof l.default.Vector?(this.x-=e.x||0,this.y-=e.y||0,this.z-=e.z||0):e instanceof Array?(this.x-=e[0]||0,this.y-=e[1]||0,this.z-=e[2]||0):(this.x-=e||0,this.y-=t||0,this.z-=r||0),this},l.default.Vector.prototype.mult=function(e,t,r){if(e instanceof l.default.Vector)return Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.z)&&"number"==typeof e.x&&"number"==typeof e.y&&"number"==typeof e.z?(this.x*=e.x,this.y*=e.y,this.z*=e.z):console.warn("p5.Vector.prototype.mult:","x contains components that are either undefined or not finite numbers"),this;if(e instanceof Array)return e.every(function(e){return Number.isFinite(e)})&&e.every(function(e){return"number"==typeof e})?1===e.length?(this.x*=e[0],this.y*=e[0],this.z*=e[0]):2===e.length?(this.x*=e[0],this.y*=e[1]):3===e.length&&(this.x*=e[0],this.y*=e[1],this.z*=e[2]):console.warn("p5.Vector.prototype.mult:","x contains elements that are either undefined or not finite numbers"),this;var n=Array.prototype.slice.call(arguments);return n.every(function(e){return Number.isFinite(e)})&&n.every(function(e){return"number"==typeof e})?(1===arguments.length&&(this.x*=e,this.y*=e,this.z*=e),2===arguments.length&&(this.x*=e,this.y*=t),3===arguments.length&&(this.x*=e,this.y*=t,this.z*=r)):console.warn("p5.Vector.prototype.mult:","x, y, or z arguments are either undefined or not a finite number"),this},l.default.Vector.prototype.div=function(e,t,r){if(e instanceof l.default.Vector){if(Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.z)&&"number"==typeof e.x&&"number"==typeof e.y&&"number"==typeof e.z){if(0===e.x||0===e.y||0===e.z)return console.warn("p5.Vector.prototype.div:","divide by 0"),this;this.x/=e.x,this.y/=e.y,this.z/=e.z}else console.warn("p5.Vector.prototype.div:","x contains components that are either undefined or not finite numbers");return this}if(e instanceof Array){if(e.every(function(e){return Number.isFinite(e)})&&e.every(function(e){return"number"==typeof e})){if(e.some(function(e){return 0===e}))return console.warn("p5.Vector.prototype.div:","divide by 0"),this;1===e.length?(this.x/=e[0],this.y/=e[0],this.z/=e[0]):2===e.length?(this.x/=e[0],this.y/=e[1]):3===e.length&&(this.x/=e[0],this.y/=e[1],this.z/=e[2])}else console.warn("p5.Vector.prototype.div:","x contains components that are either undefined or not finite numbers");return this}var n=Array.prototype.slice.call(arguments);if(n.every(function(e){return Number.isFinite(e)})&&n.every(function(e){return"number"==typeof e})){if(n.some(function(e){return 0===e}))return console.warn("p5.Vector.prototype.div:","divide by 0"),this;1===arguments.length&&(this.x/=e,this.y/=e,this.z/=e),2===arguments.length&&(this.x/=e,this.y/=t),3===arguments.length&&(this.x/=e,this.y/=t,this.z/=r)}else console.warn("p5.Vector.prototype.div:","x, y, or z arguments are either undefined or not a finite number");return this},l.default.Vector.prototype.mag=function(){return Math.sqrt(this.magSq())},l.default.Vector.prototype.magSq=function(){var e=this.x,t=this.y,r=this.z;return e*e+t*t+r*r},l.default.Vector.prototype.dot=function(e,t,r){return e instanceof l.default.Vector?this.dot(e.x,e.y,e.z):this.x*(e||0)+this.y*(t||0)+this.z*(r||0)},l.default.Vector.prototype.cross=function(e){var t=this.y*e.z-this.z*e.y,r=this.z*e.x-this.x*e.z,n=this.x*e.y-this.y*e.x;return this.p5?new l.default.Vector(this.p5,[t,r,n]):new l.default.Vector(t,r,n)},l.default.Vector.prototype.dist=function(e){return e.copy().sub(this).mag()},l.default.Vector.prototype.normalize=function(){var e=this.mag();return 0!==e&&this.mult(1/e),this},l.default.Vector.prototype.limit=function(e){var t=this.magSq();return e*e<t&&this.div(Math.sqrt(t)).mult(e),this},l.default.Vector.prototype.setMag=function(e){return this.normalize().mult(e)},l.default.Vector.prototype.heading=function(){var e=Math.atan2(this.y,this.x);return this.p5?this.p5._fromRadians(e):e},l.default.Vector.prototype.setHeading=function(e){var t=this.mag();return this.x=t*Math.cos(e),this.y=t*Math.sin(e),this},l.default.Vector.prototype.rotate=function(e){var t=this.heading()+e;this.p5&&(t=this.p5._toRadians(t));var r=this.mag();return this.x=Math.cos(t)*r,this.y=Math.sin(t)*r,this},l.default.Vector.prototype.angleBetween=function(e){var t,r=this.dot(e)/(this.mag()*e.mag());return t=Math.acos(Math.min(1,Math.max(-1,r))),t*=Math.sign(this.cross(e).z||1),this.p5&&(t=this.p5._fromRadians(t)),t},l.default.Vector.prototype.lerp=function(e,t,r,n){return e instanceof l.default.Vector?this.lerp(e.x,e.y,e.z,t):(this.x+=(e-this.x)*n||0,this.y+=(t-this.y)*n||0,this.z+=(r-this.z)*n||0,this)},l.default.Vector.prototype.reflect=function(e){return e.normalize(),this.sub(e.mult(2*this.dot(e)))},l.default.Vector.prototype.array=function(){return[this.x||0,this.y||0,this.z||0]},l.default.Vector.prototype.equals=function(e,t,r){var n,o,i;return i=e instanceof l.default.Vector?(n=e.x||0,o=e.y||0,e.z||0):e instanceof Array?(n=e[0]||0,o=e[1]||0,e[2]||0):(n=e||0,o=t||0,r||0),this.x===n&&this.y===o&&this.z===i},l.default.Vector.fromAngle=function(e,t){return void 0===t&&(t=1),new l.default.Vector(t*Math.cos(e),t*Math.sin(e),0)},l.default.Vector.fromAngles=function(e,t,r){void 0===r&&(r=1);var n=Math.cos(t),o=Math.sin(t),i=Math.cos(e),a=Math.sin(e);return new l.default.Vector(r*a*o,-r*i,r*a*n)},l.default.Vector.random2D=function(){return this.fromAngle(Math.random()*i.TWO_PI)},l.default.Vector.random3D=function(){var e=Math.random()*i.TWO_PI,t=2*Math.random()-1,r=Math.sqrt(1-t*t),n=r*Math.cos(e),o=r*Math.sin(e);return new l.default.Vector(n,o,t)},l.default.Vector.add=function(e,t,r){return r?r.set(e):(r=e.copy(),3===arguments.length&&l.default._friendlyError("The target parameter is undefined, it should be of type p5.Vector","p5.Vector.add")),r.add(t),r},l.default.Vector.rem=function(e,t){if(e instanceof l.default.Vector&&t instanceof l.default.Vector){var r=e.copy();return r.rem(t),r}},l.default.Vector.sub=function(e,t,r){return r?r.set(e):(r=e.copy(),3===arguments.length&&l.default._friendlyError("The target parameter is undefined, it should be of type p5.Vector","p5.Vector.sub")),r.sub(t),r},l.default.Vector.mult=function(e,t,r){return r?r.set(e):(r=e.copy(),3===arguments.length&&l.default._friendlyError("The target parameter is undefined, it should be of type p5.Vector","p5.Vector.mult")),r.mult(t),r},l.default.Vector.rotate=function(e,t,r){return 2===arguments.length?r=e.copy():(r instanceof l.default.Vector||l.default._friendlyError("The target parameter should be of type p5.Vector","p5.Vector.rotate"),r.set(e)),r.rotate(t),r},l.default.Vector.div=function(e,t,r){return r?r.set(e):(r=e.copy(),3===arguments.length&&l.default._friendlyError("The target parameter is undefined, it should be of type p5.Vector","p5.Vector.div")),r.div(t),r},l.default.Vector.dot=function(e,t){return e.dot(t)},l.default.Vector.cross=function(e,t){return e.cross(t)},l.default.Vector.dist=function(e,t){return e.dist(t)},l.default.Vector.lerp=function(e,t,r,n){return n?n.set(e):(n=e.copy(),4===arguments.length&&l.default._friendlyError("The target parameter is undefined, it should be of type p5.Vector","p5.Vector.lerp")),n.lerp(t,r),n},l.default.Vector.mag=function(e){var t=e.x,r=e.y,n=e.z,o=t*t+r*r+n*n;return Math.sqrt(o)},l.default.Vector.normalize=function(e,t){return arguments.length<2?t=e.copy():(t instanceof l.default.Vector||l.default._friendlyError("The target parameter should be of type p5.Vector","p5.Vector.normalize"),t.set(e)),t.normalize()};var o=l.default.Vector;r.default=o},{"../core/constants":250,"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.every":149,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.some":161,"core-js/modules/es.math.sign":166,"core-js/modules/es.number.constructor":167,"core-js/modules/es.number.is-finite":168,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.sub":189}],294:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};var i="_lcg_random_state",a=4294967296,s=0;o.default.prototype._lcg=function(e){return this[e]=(1664525*this[e]+1013904223)%a,this[e]/a},o.default.prototype._lcgSetSeed=function(e,t){this[e]=(null==t?Math.random()*a:t)>>>0},o.default.prototype.randomSeed=function(e){this._lcgSetSeed(i,e),this._gaussian_previous=!1},o.default.prototype.random=function(e,t){var r;if(o.default._validateParameters("random",arguments),r=null!=this[i]?this._lcg(i):Math.random(),void 0===e)return r;if(void 0===t)return e instanceof Array?e[Math.floor(r*e.length)]:r*e;if(t<e){var n=e;e=t,t=n}return r*(t-e)+e},o.default.prototype.randomGaussian=function(e){var t,r,n,o,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;if(this._gaussian_previous)t=s,this._gaussian_previous=!1;else{for(;1<=(o=(r=this.random(2)-1)*r+(n=this.random(2)-1)*n););t=r*(o=Math.sqrt(-2*Math.log(o)/o)),s=n*o,this._gaussian_previous=!0}return t*i+(e||0)};var l=o.default;r.default=l},{"../core/main":260}],295:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n},i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}o.default.prototype._angleMode=i.RADIANS,o.default.prototype.acos=function(e){return this._fromRadians(Math.acos(e))},o.default.prototype.asin=function(e){return this._fromRadians(Math.asin(e))},o.default.prototype.atan=function(e){return this._fromRadians(Math.atan(e))},o.default.prototype.atan2=function(e,t){return this._fromRadians(Math.atan2(e,t))},o.default.prototype.cos=function(e){return Math.cos(this._toRadians(e))},o.default.prototype.sin=function(e){return Math.sin(this._toRadians(e))},o.default.prototype.tan=function(e){return Math.tan(this._toRadians(e))},o.default.prototype.degrees=function(e){return e*i.RAD_TO_DEG},o.default.prototype.radians=function(e){return e*i.DEG_TO_RAD},o.default.prototype.angleMode=function(e){e!==i.DEGREES&&e!==i.RADIANS||(this._angleMode=e)},o.default.prototype._toRadians=function(e){return this._angleMode===i.DEGREES?e*i.DEG_TO_RAD:e},o.default.prototype._toDegrees=function(e){return this._angleMode===i.RADIANS?e*i.RAD_TO_DEG:e},o.default.prototype._fromRadians=function(e){return this._angleMode===i.DEGREES?e*i.RAD_TO_DEG:e};var l=o.default;r.default=l},{"../core/constants":250,"../core/main":260}],296:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.textAlign=function(e,t){var r;return o.default._validateParameters("textAlign",arguments),(r=this._renderer).textAlign.apply(r,arguments)},o.default.prototype.textLeading=function(e){var t;return o.default._validateParameters("textLeading",arguments),(t=this._renderer).textLeading.apply(t,arguments)},o.default.prototype.textSize=function(e){var t;return o.default._validateParameters("textSize",arguments),(t=this._renderer).textSize.apply(t,arguments)},o.default.prototype.textStyle=function(e){var t;return o.default._validateParameters("textStyle",arguments),(t=this._renderer).textStyle.apply(t,arguments)},o.default.prototype.textWidth=function(){for(var e,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return r[0]+="",o.default._validateParameters("textWidth",r),0===r[0].length?0:(e=this._renderer).textWidth.apply(e,r)},o.default.prototype.textAscent=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return o.default._validateParameters("textAscent",t),this._renderer.textAscent()},o.default.prototype.textDescent=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return o.default._validateParameters("textDescent",t),this._renderer.textDescent()},o.default.prototype._updateTextMetrics=function(){return this._renderer._updateTextMetrics()};var i=o.default;r.default=i},{"../core/main":260}],297:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.last-index-of"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.split"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,f=(n=e("../core/main"))&&n.__esModule?n:{default:n},o=l(e("../core/constants")),i=l(e("opentype.js"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function l(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}return r.default=e,t&&t.set(e,r),r}e("../core/friendly_errors/validate_params"),e("../core/friendly_errors/file_errors"),e("../core/friendly_errors/fes_core"),f.default.prototype.loadFont=function(s,l,u){f.default._validateParameters("loadFont",arguments);var c=new f.default.Font(this),d=this;return i.load(s,function(e,t){if(e)return f.default._friendlyFileLoadError(4,s),void 0!==u?u(e):void console.error(e,s);c.font=t,void 0!==l&&l(c),d._decrementPreload();var r,n,o=s.split("\\").pop().split("/").pop(),i=o.lastIndexOf("."),a=i<1?null:o.substr(i+1);["ttf","otf","woff","woff2"].includes(a)&&(r=o.substr(0,i),(n=document.createElement("style")).appendChild(document.createTextNode("\n@font-face {\nfont-family: ".concat(r,";\nsrc: url(").concat(s,");\n}\n"))),document.head.appendChild(n))}),c},f.default.prototype.text=function(e,t,r,n,o){var i;return f.default._validateParameters("text",arguments),this._renderer._doFill||this._renderer._doStroke?(i=this._renderer).text.apply(i,arguments):this},f.default.prototype.textFont=function(e,t){if(f.default._validateParameters("textFont",arguments),arguments.length){if(!e)throw new Error("null font passed to textFont");return this._renderer._setProperty("_textFont",e),t&&(this._renderer._setProperty("_textSize",t),this._renderer._setProperty("_textLeading",t*o._DEFAULT_LEADMULT)),this._renderer._applyTextProperties()}return this._renderer._textFont};var u=f.default;r.default=u},{"../core/constants":250,"../core/friendly_errors/fes_core":252,"../core/friendly_errors/file_errors":253,"../core/friendly_errors/validate_params":255,"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.last-index-of":158,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.split":188,"opentype.js":236}],298:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.fill"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.join"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.array.splice"),e("core-js/modules/es.function.name"),e("core-js/modules/es.number.to-fixed"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.split"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n},x=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==h(e)&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var r=function(e,t){if("object"!==h(e))e=t;else for(var r in t)void 0===e[r]&&(e[r]=t[r]);return e}(t,{sampleFactor:.1,simplifyThreshold:0}),n=l(e,0,1),o=n/(n*r.sampleFactor),i=[],a=0;a<n;a+=o)i.push(l(e,a));return r.simplifyThreshold&&function(e){for(var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=0,n=e.length-1;3<e.length&&0<=n;--n)f(s(e,n-1),s(e,n),s(e,n+1),t)&&(e.splice(n%e.length,1),r++)}(i,r.simplifyThreshold),i}function y(e){for(var t,r=[],n=0;n<e.length;n++)"M"===e[n].type&&(t&&r.push(t),t=[]),t.push(i(e[n]));return r.push(t),r}function i(e){var t=[e.type];return"M"===e.type||"L"===e.type?t.push(e.x,e.y):"C"===e.type?t.push(e.x1,e.y1,e.x2,e.y2,e.x,e.y):"Q"===e.type&&t.push(e.x1,e.y1,e.x,e.y),t}function s(e,t){var r=e.length;return e[t<0?t%r+r:t%r]}function f(e,t,r,n){if(!n)return 0==(o=e,a=r,((i=t)[0]-o[0])*(a[1]-o[1])-(a[0]-o[0])*(i[1]-o[1]));var o,i,a;void 0===f.tmpPoint1&&(f.tmpPoint1=[],f.tmpPoint2=[]);var s=f.tmpPoint1,l=f.tmpPoint2;s.x=t.x-e.x,s.y=t.y-e.y,l.x=r.x-t.x,l.y=r.y-t.y;var u=s.x*l.x+s.y*l.y,c=Math.sqrt(s.x*s.x+s.y*s.y),d=Math.sqrt(l.x*l.x+l.y*l.y);return Math.acos(u/(c*d))<n}function d(e,t,r,n,o,i,a,s,l){var u=1-l,c=Math.pow(u,3),d=Math.pow(u,2),f=l*l,h=f*l,p=c*e+3*d*l*r+3*u*l*l*o+h*a,y=c*t+3*d*l*n+3*u*l*l*i+h*s,m=e+2*l*(r-e)+f*(o-2*r+e),g=t+2*l*(n-t)+f*(i-2*n+t),v=r+2*l*(o-r)+f*(a-2*o+r),b=n+2*l*(i-n)+f*(s-2*i+n),_=u*e+l*r,x=u*t+l*n,w=u*o+l*a,S=u*i+l*s,j=90-180*Math.atan2(m-v,g-b)/Math.PI;return(v<m||g<b)&&(j+=180),{x:p,y:y,m:{x:m,y:g},n:{x:v,y:b},start:{x:_,y:x},end:{x:w,y:S},alpha:j}}function m(e,t,r,n,o,i,a,s,l){return null==l?g(e,t,r,n,o,i,a,s):d(e,t,r,n,o,i,a,s,function(e,t,r,n,o,i,a,s,l){if(l<0||g(e,t,r,n,o,i,a,s)<l)return;var u,c=.5,d=1-c;u=g(e,t,r,n,o,i,a,s,d);for(;.01<Math.abs(u-l);)u=g(e,t,r,n,o,i,a,s,d+=(u<l?1:-1)*(c/=2));return d}(e,t,r,n,o,i,a,s,l))}function l(e,t,r){for(var n,o,i,a,s,l=0,u=0,c=(e=function(e,t){function r(e,t,r){var n,o;if(!e)return["C",t.x,t.y,t.x,t.y,t.x,t.y];switch(e[0]in{T:1,Q:1}||(t.qx=t.qy=null),e[0]){case"M":t.X=e[1],t.Y=e[2];break;case"A":e=["C"].concat(function e(t,r,n,o,i,a,s,l,u,c){var d=Math.PI;var f=120*d/180;var h;var p;var y;var m;var g=d/180*(+i||0);var v=[];var b;var _=function(e,t,r){var n=e*Math.cos(r)-t*Math.sin(r),o=e*Math.sin(r)+t*Math.cos(r);return{x:n,y:o}};if(c)h=c[0],p=c[1],y=c[2],m=c[3];else{b=_(t,r,-g),t=b.x,r=b.y,b=_(l,u,-g),l=b.x,u=b.y;var x=(t-l)/2,w=(r-u)/2,S=x*x/(n*n)+w*w/(o*o);1<S&&(S=Math.sqrt(S),n*=S,o*=S);var j=n*n,M=o*o,E=(a===s?-1:1)*Math.sqrt(Math.abs((j*M-j*w*w-M*x*x)/(j*w*w+M*x*x)));y=E*n*w/o+(t+l)/2,m=E*-o*x/n+(r+u)/2,h=Math.asin(((r-m)/o).toFixed(9)),p=Math.asin(((u-m)/o).toFixed(9)),(h=t<y?d-h:h)<0&&(h=2*d+h),(p=l<y?d-p:p)<0&&(p=2*d+p),s&&p<h&&(h-=2*d),!s&&h<p&&(p-=2*d)}var T=p-h;if(Math.abs(T)>f){var O=p,C=l,L=u;p=h+f*(s&&h<p?1:-1),l=y+n*Math.cos(p),u=m+o*Math.sin(p),v=e(l,u,n,o,i,0,s,C,L,[p,O,y,m])}T=p-h;var P=Math.cos(h),k=Math.sin(h),A=Math.cos(p),R=Math.sin(p),D=Math.tan(T/4),I=4/3*n*D,U=4/3*o*D,N=[t,r],F=[t+I*k,r-U*P],B=[l+I*R,u-U*A],G=[l,u];F[0]=2*N[0]-F[0];F[1]=2*N[1]-F[1];{if(c)return[F,B,G].concat(v);v=[F,B,G].concat(v).join().split(",");for(var V=[],z=0,H=v.length;z<H;z++)V[z]=z%2?_(v[z-1],v[z],g).y:_(v[z],v[z+1],g).x;return V}}.apply(0,[t.x,t.y].concat(e.slice(1))));break;case"S":o="C"===r||"S"===r?(n=2*t.x-t.bx,2*t.y-t.by):(n=t.x,t.y),e=["C",n,o].concat(e.slice(1));break;case"T":"Q"===r||"T"===r?(t.qx=2*t.x-t.qx,t.qy=2*t.y-t.qy):(t.qx=t.x,t.qy=t.y),e=["C"].concat(S(t.x,t.y,t.qx,t.qy,e[1],e[2]));break;case"Q":t.qx=e[1],t.qy=e[2],e=["C"].concat(S(t.x,t.y,e[1],e[2],e[3],e[4]));break;case"L":e=["C"].concat(w(t.x,t.y,e[1],e[2]));break;case"H":e=["C"].concat(w(t.x,t.y,e[1],t.y));break;case"V":e=["C"].concat(w(t.x,t.y,t.x,e[1]));break;case"Z":e=["C"].concat(w(t.x,t.y,t.X,t.Y))}return e}function n(e,t){if(7<e[t].length){e[t].shift();for(var r=e[t];r.length;)c[t]="A",s&&(d[t]="A"),e.splice(t++,0,["C"].concat(r.splice(0,6)));e.splice(t,1),i=Math.max(a.length,s&&s.length||0)}}function o(e,t,r,n,o){e&&t&&"M"===e[o][0]&&"M"!==t[o][0]&&(t.splice(o,0,["M",n.x,n.y]),r.bx=0,r.by=0,r.x=e[o][1],r.y=e[o][2],i=Math.max(a.length,s&&s.length||0))}var i,a=b(e),s=t&&b(t),l={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},u={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},c=[],d=[],f="",h="";i=Math.max(a.length,s&&s.length||0);for(var p=0;p<i;p++){a[p]&&(f=a[p][0]),"C"!==f&&(c[p]=f,p&&(h=c[p-1])),a[p]=r(a[p],l,h),"A"!==c[p]&&"C"===f&&(c[p]="C"),n(a,p),s&&(s[p]&&(f=s[p][0]),"C"!==f&&(d[p]=f,p&&(h=d[p-1])),s[p]=r(s[p],u,h),"A"!==d[p]&&"C"===f&&(d[p]="C"),n(s,p)),o(a,s,l,u,p),o(s,a,u,l,p);var y=a[p],m=s&&s[p],g=y.length,v=s&&m.length;l.x=y[g-2],l.y=y[g-1],l.bx=parseFloat(y[g-4])||l.x,l.by=parseFloat(y[g-3])||l.y,u.bx=s&&(parseFloat(m[v-4])||u.x),u.by=s&&(parseFloat(m[v-3])||u.y),u.x=s&&m[v-2],u.y=s&&m[v-1]}return s?[a,s]:a}(e)).length;u<c;u++){if("M"===(i=e[u])[0])n=+i[1],o=+i[2];else{if(t<l+(a=m(n,o,i[1],i[2],i[3],i[4],i[5],i[6]))&&!r)return{x:(s=m(n,o,i[1],i[2],i[3],i[4],i[5],i[6],t-l)).x,y:s.y,alpha:s.alpha};l+=a,n=+i[5],o=+i[6]}i.shift()+i}return(s=r?l:d(n,o,i[0],i[1],i[2],i[3],i[4],i[5],1)).alpha&&(s={x:s.x,y:s.y,alpha:s.alpha}),s}function b(e){var t,r=[],n=0,o=0,i=0,a=0,s=0;if(!e)return r;"M"===e[0][0]&&(i=n=+e[0][1],a=o=+e[0][2],s++,r[0]=["M",n,o]);for(var l,u,c=3===e.length&&"M"===e[0][0]&&"R"===e[1][0].toUpperCase()&&"Z"===e[2][0].toUpperCase(),d=s,f=e.length;d<f;d++){if(r.push(l=[]),(u=e[d])[0]!==String.prototype.toUpperCase.call(u[0]))switch(l[0]=String.prototype.toUpperCase.call(u[0]),l[0]){case"A":l[1]=u[1],l[2]=u[2],l[3]=u[3],l[4]=u[4],l[5]=u[5],l[6]=+(u[6]+n),l[7]=+(u[7]+o);break;case"V":l[1]=+u[1]+o;break;case"H":l[1]=+u[1]+n;break;case"R":for(var h=2,p=(t=[n,o].concat(u.slice(1))).length;h<p;h++)t[h]=+t[h]+n,t[++h]=+t[h]+o;r.pop(),r=r.concat(_(t,c));break;case"M":i=+u[1]+n,a=+u[2]+o;break;default:for(var y=1,m=u.length;y<m;y++)l[y]=+u[y]+(y%2?n:o)}else if("R"===u[0])t=[n,o].concat(u.slice(1)),r.pop(),r=r.concat(_(t,c)),l=["R"].concat(u.slice(-2));else for(var g=0,v=u.length;g<v;g++)l[g]=u[g];switch(l[0]){case"Z":n=i,o=a;break;case"H":n=l[1];break;case"V":o=l[1];break;case"M":i=l[l.length-2],a=l[l.length-1];break;default:n=l[l.length-2],o=l[l.length-1]}}return r}function _(e,t){for(var r=[],n=0,o=e.length;n<o-2*!t;n+=2){var i=[{x:+e[n-2],y:+e[n-1]},{x:+e[n],y:+e[n+1]},{x:+e[n+2],y:+e[n+3]},{x:+e[n+4],y:+e[n+5]}];t?n?o-4===n?i[3]={x:+e[0],y:+e[1]}:o-2===n&&(i[2]={x:+e[0],y:+e[1]},i[3]={x:+e[2],y:+e[3]}):i[0]={x:+e[o-2],y:+e[o-1]}:o-4===n?i[3]=i[2]:n||(i[0]={x:+e[n],y:+e[n+1]}),r.push(["C",(-i[0].x+6*i[1].x+i[2].x)/6,(-i[0].y+6*i[1].y+i[2].y)/6,(i[1].x+6*i[2].x-i[3].x)/6,(i[1].y+6*i[2].y-i[3].y)/6,i[2].x,i[2].y])}return r}function w(e,t,r,n){return[e,t,r,n,r,n]}function S(e,t,r,n,o,i){return[1/3*e+2/3*r,1/3*t+2/3*n,1/3*o+2/3*r,1/3*i+2/3*n,o,i]}function g(e,t,r,n,o,i,a,s,l){null==l&&(l=1);for(var u=(l=1<l?1:l<0?0:l)/2,c=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],d=0,f=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],h=0;h<12;h++){var p=u*c[h]+u,y=v(p,e,r,o,a),m=v(p,t,n,i,s),g=y*y+m*m;d+=f[h]*Math.sqrt(g)}return u*d}function v(e,t,r,n,o){return e*(e*(-3*t+9*r-9*n+3*o)+6*t-12*r+6*n)-3*t+3*r}o.default.Font=function(e){this.parent=e,this.cache={},this.font=void 0},o.default.Font.prototype.textBounds=function(e){var t,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,o=3<arguments.length?arguments[3]:void 0,i=4<arguments.length?arguments[4]:void 0,a=i&&i.renderer&&i.renderer._pInst||this.parent,s=a._renderer.drawingContext;s.textAlign||x.LEFT,s.textBaseline||x.BASELINE;if(o=o||a._renderer._textSize,!t){var l,u,c=[],d=[],f=[];f[0]=[];var h=[],p=this._scale(o),y=a._renderer.textLeading(),m=0;this.font.forEachGlyph(e,r,n,o,i,function(e,t,r,n){var o=e.getMetrics();0===e.index||10===e.index?f[m+=1]=[]:(f[m].push(t+o.xMin*p),f[m].push(t+o.xMax*p),h.push(r+m*y+-o.yMin*p),h.push(r+m*y+-o.yMax*p))}),0<f[m].length&&(c[m]=Math.min.apply(null,f[m]),d[m]=Math.max.apply(null,f[m]));for(var g=0,v=0;v<=m;v++){c[v]=Math.min.apply(null,f[v]),d[v]=Math.max.apply(null,f[v]);var b=d[v]-c[v];g<b&&(g=b)}var _=Math.min.apply(null,c);t={x:_,y:l=Math.min.apply(null,h),h:Math.max.apply(null,h)-l,w:g,advance:_-r},u=this._handleAlignment(a._renderer,e,t.x,t.y,t.w+t.advance),t.x=u.x,t.y=u.y}return t},o.default.Font.prototype.textToPoints=function(e,t,r,n,o){var i,a=0,s=[],l=this._getGlyphs(e);n=n||this.parent._renderer._textSize;for(var u=0;u<l.length;u++){if(!(l[i=u].name&&"space"===l[i].name||e.length===l.length&&" "===e[i]||l[i].index&&3===l[i].index))for(var c=y(l[u].getPath(t,r,n).commands),d=0;d<c.length;d++)for(var f=p(c[d],o),h=0;h<f.length;h++)f[h].x+=a,s.push(f[h]);a+=l[u].advanceWidth*this._scale(n)}return s},o.default.Font.prototype._getGlyphs=function(e){return this.font.stringToGlyphs(e)},o.default.Font.prototype._getPath=function(e,t,r,n){var o=(n&&n.renderer&&n.renderer._pInst||this.parent)._renderer,i=this._handleAlignment(o,e,t,r);return this.font.getPath(e,i.x,i.y,o._textSize,n)},o.default.Font.prototype._getPathData=function(e,t,r,n){var o=3;return"string"==typeof e&&2<arguments.length?e=this._getPath(e,t,r,n):"object"===h(t)&&(n=t),n&&"number"==typeof n.decimals&&(o=n.decimals),e.toPathData(o)},o.default.Font.prototype._getSVG=function(e,t,r,n){var o=3;return"string"==typeof e&&2<arguments.length?e=this._getPath(e,t,r,n):"object"===h(t)&&(n=t),n&&("number"==typeof n.decimals&&(o=n.decimals),"number"==typeof n.strokeWidth&&(e.strokeWidth=n.strokeWidth),void 0!==n.fill&&(e.fill=n.fill),void 0!==n.stroke&&(e.stroke=n.stroke)),e.toSVG(o)},o.default.Font.prototype._renderPath=function(e,t,r,n){var o,i=n&&n.renderer||this.parent._renderer,a=i.drawingContext;o="object"===h(e)&&e.commands?e.commands:this._getPath(e,t,r,n).commands,a.beginPath();var s=!0,l=!1,u=void 0;try{for(var c,d=o[Symbol.iterator]();!(s=(c=d.next()).done);s=!0){var f=c.value;"M"===f.type?a.moveTo(f.x,f.y):"L"===f.type?a.lineTo(f.x,f.y):"C"===f.type?a.bezierCurveTo(f.x1,f.y1,f.x2,f.y2,f.x,f.y):"Q"===f.type?a.quadraticCurveTo(f.x1,f.y1,f.x,f.y):"Z"===f.type&&a.closePath()}}catch(e){l=!0,u=e}finally{try{s||null==d.return||d.return()}finally{if(l)throw u}}return i._doStroke&&i._strokeSet&&a.stroke(),i._doFill&&(i._fillSet||i._setFill(x._DEFAULT_TEXT_FILL),a.fill()),this},o.default.Font.prototype._textWidth=function(e,t){return this.font.getAdvanceWidth(e,t)},o.default.Font.prototype._textAscent=function(e){return this.font.ascender*this._scale(e)},o.default.Font.prototype._textDescent=function(e){return-this.font.descender*this._scale(e)},o.default.Font.prototype._scale=function(e){return 1/this.font.unitsPerEm*(e||this.parent._renderer._textSize)},o.default.Font.prototype._handleAlignment=function(e,t,r,n,o){var i=e._textSize;switch(void 0===o&&(o=this._textWidth(t,i)),e._textAlign){case x.CENTER:r-=o/2;break;case x.RIGHT:r-=o}switch(e._textBaseline){case x.TOP:n+=this._textAscent(i);break;case x.CENTER:n+=this._textAscent(i)/2;break;case x.BOTTOM:n-=this._textDescent(i)}return{x:r,y:n}};var u=o.default;r.default=u},{"../core/constants":250,"../core/main":260,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.fill":150,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.join":157,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.splice":162,"core-js/modules/es.function.name":163,"core-js/modules/es.number.to-fixed":169,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.split":188,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],299:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.array.splice"),e("core-js/modules/es.array-buffer.constructor"),e("core-js/modules/es.object.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.append=function(e,t){return e.push(t),e},o.default.prototype.arrayCopy=function(e,t,r,n,o){var i,a;e=void 0!==o?(a=Math.min(o,e.length),i=n,e.slice(t,a+t)):(a=void 0!==r?(a=r,Math.min(a,e.length)):e.length,i=0,r=t,e.slice(0,a)),Array.prototype.splice.apply(r,[i,a].concat(e))},o.default.prototype.concat=function(e,t){return e.concat(t)},o.default.prototype.reverse=function(e){return e.reverse()},o.default.prototype.shorten=function(e){return e.pop(),e},o.default.prototype.shuffle=function(e,t){for(var r,n,o=ArrayBuffer&&ArrayBuffer.isView&&ArrayBuffer.isView(e),i=(e=t||o?e:e.slice()).length;1<i;)r=this.random(0,1)*i|0,n=e[--i],e[i]=e[r],e[r]=n;return e},o.default.prototype.sort=function(e,t){var r=t?e.slice(0,Math.min(t,e.length)):e,n=t?e.slice(Math.min(t,e.length)):[];return(r="string"==typeof r[0]?r.sort():r.sort(function(e,t){return e-t})).concat(n)},o.default.prototype.splice=function(e,t,r){return Array.prototype.splice.apply(e,[r,0].concat(t)),e},o.default.prototype.subset=function(e,t,r){return void 0!==r?e.slice(t,t+r):e.slice(t,e.length)};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array-buffer.constructor":147,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.splice":162,"core-js/modules/es.object.to-string":174}],300:[function(e,t,r){"use strict";e("core-js/modules/es.array.map"),e("core-js/modules/es.number.constructor"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.repeat"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.float=function(e){return e instanceof Array?e.map(parseFloat):parseFloat(e)},o.default.prototype.int=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:10;return e===1/0||"Infinity"===e?1/0:e===-1/0||"-Infinity"===e?-1/0:"string"==typeof e?parseInt(e,t):"number"==typeof e?0|e:"boolean"==typeof e?e?1:0:e instanceof Array?e.map(function(e){return o.default.prototype.int(e,t)}):void 0},o.default.prototype.str=function(e){return e instanceof Array?e.map(o.default.prototype.str):String(e)},o.default.prototype.boolean=function(e){return"number"==typeof e?0!==e:"string"==typeof e?"true"===e.toLowerCase():"boolean"==typeof e?e:e instanceof Array?e.map(o.default.prototype.boolean):void 0},o.default.prototype.byte=function(e){var t=o.default.prototype.int(e,10);return"number"==typeof t?(t+128)%256-128:t instanceof Array?t.map(o.default.prototype.byte):void 0},o.default.prototype.char=function(e){return"number"!=typeof e||isNaN(e)?e instanceof Array?e.map(o.default.prototype.char):"string"==typeof e?o.default.prototype.char(parseInt(e,10)):void 0:String.fromCharCode(e)},o.default.prototype.unchar=function(e){return"string"==typeof e&&1===e.length?e.charCodeAt(0):e instanceof Array?e.map(o.default.prototype.unchar):void 0},o.default.prototype.hex=function(e,t){if(t=null==t?t=8:t,e instanceof Array)return e.map(function(e){return o.default.prototype.hex(e,t)});if(e===1/0||e===-1/0)return(e===1/0?"F":"0").repeat(t);if("number"==typeof e){e<0&&(e=4294967295+e+1);for(var r=Number(e).toString(16).toUpperCase();r.length<t;)r="0".concat(r);return r.length>=t&&(r=r.substring(r.length-t,r.length)),r}},o.default.prototype.unhex=function(e){return e instanceof Array?e.map(o.default.prototype.unhex):parseInt("0x".concat(e),16)};var i=o.default;r.default=i},{"../core/main":260,"core-js/modules/es.array.map":159,"core-js/modules/es.number.constructor":167,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.repeat":185}],301:[function(e,t,r){"use strict";e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.join"),e("core-js/modules/es.array.map"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.constructor"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.match"),e("core-js/modules/es.string.replace"),e("core-js/modules/es.string.split"),e("core-js/modules/es.string.trim"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,a=(n=e("../core/main"))&&n.__esModule?n:{default:n};function o(e,t,r){var n=e<0,o=n?e.toString().substring(1):e.toString(),i=o.indexOf("."),a=-1!==i?o.substring(0,i):o,s=-1!==i?o.substring(i+1):"",l=n?"-":"";if(void 0!==r){var u="";(-1!==i||0<r-s.length)&&(u="."),s.length>r&&(s=s.substring(0,r));for(var c=0;c<t-a.length;c++)l+="0";l+=a,l+=u,l+=s;for(var d=0;d<r-s.length;d++)l+="0";return l}for(var f=0;f<Math.max(t-a.length,0);f++)l+="0";return l+=o}function i(e,t){var r=(e=e.toString()).indexOf("."),n=-1!==r?e.substring(r):"",o=-1!==r?e.substring(0,r):e;if(o=o.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),0===t)n="";else if(void 0!==t)if(t>n.length)for(var i=t-(n+=-1===r?".":"").length+1,a=0;a<i;a++)n+="0";else n=n.substring(0,t+1);return o+n}function s(e){return 0<parseFloat(e)?"+".concat(e.toString()):e.toString()}function l(e){return 0<=parseFloat(e)?" ".concat(e.toString()):e.toString()}e("../core/friendly_errors/validate_params"),e("../core/friendly_errors/file_errors"),e("../core/friendly_errors/fes_core"),a.default.prototype.join=function(e,t){return a.default._validateParameters("join",arguments),e.join(t)},a.default.prototype.match=function(e,t){return a.default._validateParameters("match",arguments),e.match(t)},a.default.prototype.matchAll=function(e,t){a.default._validateParameters("matchAll",arguments);for(var r=new RegExp(t,"g"),n=r.exec(e),o=[];null!==n;)o.push(n),n=r.exec(e);return o},a.default.prototype.nf=function(e,t,r){return a.default._validateParameters("nf",arguments),e instanceof Array?e.map(function(e){return o(e,t,r)}):"[object Arguments]"===Object.prototype.toString.call(e)?3===e.length?this.nf(e[0],e[1],e[2]):2===e.length?this.nf(e[0],e[1]):this.nf(e[0]):o(e,t,r)},a.default.prototype.nfc=function(e,t){return a.default._validateParameters("nfc",arguments),e instanceof Array?e.map(function(e){return i(e,t)}):i(e,t)},a.default.prototype.nfp=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];a.default._validateParameters("nfp",t);var n=a.default.prototype.nf.apply(this,t);return n instanceof Array?n.map(s):s(n)},a.default.prototype.nfs=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];a.default._validateParameters("nfs",t);var n=a.default.prototype.nf.apply(this,t);return n instanceof Array?n.map(l):l(n)},a.default.prototype.split=function(e,t){return a.default._validateParameters("split",arguments),e.split(t)},a.default.prototype.splitTokens=function(e,t){var r;if(a.default._validateParameters("splitTokens",arguments),void 0!==t){var n=t,o=/\]/g.exec(n),i=/\[/g.exec(n);r=i&&o?(n=n.slice(0,o.index)+n.slice(o.index+1),i=/\[/g.exec(n),n=n.slice(0,i.index)+n.slice(i.index+1),new RegExp("[\\[".concat(n,"\\]]"),"g")):o?(n=n.slice(0,o.index)+n.slice(o.index+1),new RegExp("[".concat(n,"\\]]"),"g")):i?(n=n.slice(0,i.index)+n.slice(i.index+1),new RegExp("[".concat(n,"\\[]"),"g")):new RegExp("[".concat(n,"]"),"g")}else r=/\s/g;return e.split(r).filter(function(e){return e})},a.default.prototype.trim=function(e){return a.default._validateParameters("trim",arguments),e instanceof Array?e.map(this.trim):e.trim()};var u=a.default;r.default=u},{"../core/friendly_errors/fes_core":252,"../core/friendly_errors/file_errors":253,"../core/friendly_errors/validate_params":255,"../core/main":260,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.join":157,"core-js/modules/es.array.map":159,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.constructor":177,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.match":184,"core-js/modules/es.string.replace":186,"core-js/modules/es.string.split":188,"core-js/modules/es.string.trim":190}],302:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.prototype.day=function(){return(new Date).getDate()},o.default.prototype.hour=function(){return(new Date).getHours()},o.default.prototype.minute=function(){return(new Date).getMinutes()},o.default.prototype.millis=function(){return-1===this._millisStart?0:window.performance.now()-this._millisStart},o.default.prototype.month=function(){return(new Date).getMonth()+1},o.default.prototype.second=function(){return(new Date).getSeconds()},o.default.prototype.year=function(){return(new Date).getFullYear()};var i=o.default;r.default=i},{"../core/main":260}],303:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.concat"),e("core-js/modules/es.number.to-fixed"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,E=(n=e("../core/main"))&&n.__esModule?n:{default:n};e("./p5.Geometry");var h=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}E.default.prototype.plane=function(e,t,r,n){this._assert3d("plane"),E.default._validateParameters("plane",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=1),void 0===n&&(n=1);var o="plane|".concat(r,"|").concat(n);if(!this._renderer.geometryInHash(o)){var i=new E.default.Geometry(r,n,function(){for(var e,t,r,n=0;n<=this.detailY;n++){t=n/this.detailY;for(var o=0;o<=this.detailX;o++)e=o/this.detailX,r=new E.default.Vector(e-.5,t-.5,0),this.vertices.push(r),this.uvs.push(e,t)}});i.computeFaces().computeNormals(),r<=1&&n<=1?i._makeTriangleEdges()._edgesToVertices():this._renderer._doStroke&&console.log("Cannot draw stroke on plane objects with more than 1 detailX or 1 detailY"),this._renderer.createBuffers(o,i)}return this._renderer.drawBuffersScaled(o,e,t,1),this},E.default.prototype.box=function(e,t,r,n,o){this._assert3d("box"),E.default._validateParameters("box",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=t);var i=this._renderer.attributes&&this._renderer.attributes.perPixelLighting;void 0===n&&(n=i?1:4),void 0===o&&(o=i?1:4);var a="box|".concat(n,"|").concat(o);if(!this._renderer.geometryInHash(a)){var s=new E.default.Geometry(n,o,function(){var e=[[0,4,2,6],[1,3,5,7],[0,1,4,5],[2,6,3,7],[0,2,1,3],[4,5,6,7]];this.strokeIndices=[[0,1],[1,3],[3,2],[6,7],[8,9],[9,11],[14,15],[16,17],[17,19],[18,19],[20,21],[22,23]];for(var t=0;t<e.length;t++){for(var r=e[t],n=4*t,o=0;o<4;o++){var i=r[o],a=new E.default.Vector((2*(1&i)-1)/2,((2&i)-1)/2,((4&i)/2-1)/2);this.vertices.push(a),this.uvs.push(1&o,(2&o)/2)}this.faces.push([n,1+n,2+n]),this.faces.push([2+n,1+n,3+n])}});s.computeNormals(),n<=4&&o<=4?s._makeTriangleEdges()._edgesToVertices():this._renderer._doStroke&&console.log("Cannot draw stroke on box objects with more than 4 detailX or 4 detailY"),this._renderer.createBuffers(a,s)}return this._renderer.drawBuffersScaled(a,e,t,r),this},E.default.prototype.sphere=function(e,t,r){return this._assert3d("sphere"),E.default._validateParameters("sphere",arguments),void 0===e&&(e=50),void 0===t&&(t=24),void 0===r&&(r=16),this.ellipsoid(e,e,e,t,r),this};function l(e,t,r,n,o,i,a){e=e<=0?1:e,t=t<0?0:t,r=r<=0?e:r,n=n<3?3:n;var s,l,u,c=(i=void 0===i||i)?-2:0,d=(o=o<1?1:o)+((a=void 0===a?0!==t:a)?2:0),f=Math.atan2(e-t,r),h=Math.sin(f),p=Math.cos(f);for(s=c;s<=d;++s){var y=s/o,m=r*y,g=void 0;for(g=s<0?(y=m=0,e):o<s?(m=r,y=1,t):e+(t-e)*y,-2!==s&&s!==o+2||(g=0),m-=r/2,l=0;l<n;++l){var v=l/(n-1),b=2*Math.PI*v,_=Math.sin(b),x=Math.cos(b);this.vertices.push(new E.default.Vector(_*g,m,x*g));var w=void 0;w=s<0?new E.default.Vector(0,-1,0):o<s&&t?new E.default.Vector(0,1,0):new E.default.Vector(_*p,h,x*p),this.vertexNormals.push(w),this.uvs.push(v,y)}}var S=0;if(i){for(u=0;u<n;++u){var j=(u+1)%n;this.faces.push([S+u,S+n+j,S+n+u])}S+=2*n}for(s=0;s<o;++s){for(l=0;l<n;++l){var M=(l+1)%n;this.faces.push([S+l,S+M,S+n+M]),this.faces.push([S+l,S+n+M,S+n+l])}S+=n}if(a)for(S+=n,l=0;l<n;++l)this.faces.push([S+l,S+(l+1)%n,S+n])}E.default.prototype.cylinder=function(e,t,r,n,o,i){this._assert3d("cylinder"),E.default._validateParameters("cylinder",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=24),void 0===n&&(n=1),void 0===i&&(i=!0),void 0===o&&(o=!0);var a="cylinder|".concat(r,"|").concat(n,"|").concat(o,"|").concat(i);if(!this._renderer.geometryInHash(a)){var s=new E.default.Geometry(r,n);l.call(s,1,1,1,r,n,o,i),r<=24&&n<=16?s._makeTriangleEdges()._edgesToVertices():this._renderer._doStroke&&console.log("Cannot draw stroke on cylinder objects with more than 24 detailX or 16 detailY"),this._renderer.createBuffers(a,s)}return this._renderer.drawBuffersScaled(a,e,t,e),this},E.default.prototype.cone=function(e,t,r,n,o){this._assert3d("cone"),E.default._validateParameters("cone",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=24),void 0===n&&(n=1),void 0===o&&(o=!0);var i="cone|".concat(r,"|").concat(n,"|").concat(o);if(!this._renderer.geometryInHash(i)){var a=new E.default.Geometry(r,n);l.call(a,1,0,1,r,n,o,!1),r<=24&&n<=16?a._makeTriangleEdges()._edgesToVertices():this._renderer._doStroke&&console.log("Cannot draw stroke on cone objects with more than 24 detailX or 16 detailY"),this._renderer.createBuffers(i,a)}return this._renderer.drawBuffersScaled(i,e,t,e),this},E.default.prototype.ellipsoid=function(e,t,r,n,o){this._assert3d("ellipsoid"),E.default._validateParameters("ellipsoid",arguments),void 0===e&&(e=50),void 0===t&&(t=e),void 0===r&&(r=e),void 0===n&&(n=24),void 0===o&&(o=16);var i="ellipsoid|".concat(n,"|").concat(o);if(!this._renderer.geometryInHash(i)){var a=new E.default.Geometry(n,o,function(){for(var e=0;e<=this.detailY;e++)for(var t=e/this.detailY,r=Math.PI*t-Math.PI/2,n=Math.cos(r),o=Math.sin(r),i=0;i<=this.detailX;i++){var a=i/this.detailX,s=2*Math.PI*a,l=Math.cos(s),u=Math.sin(s),c=new E.default.Vector(n*u,o,n*l);this.vertices.push(c),this.vertexNormals.push(c),this.uvs.push(a,t)}});a.computeFaces(),n<=24&&o<=24?a._makeTriangleEdges()._edgesToVertices():this._renderer._doStroke&&console.log("Cannot draw stroke on ellipsoids with more than 24 detailX or 24 detailY"),this._renderer.createBuffers(i,a)}return this._renderer.drawBuffersScaled(i,e,t,r),this},E.default.prototype.torus=function(e,t,r,n){if(this._assert3d("torus"),E.default._validateParameters("torus",arguments),void 0===e)e=50;else if(!e)return;if(void 0===t)t=10;else if(!t)return;void 0===r&&(r=24),void 0===n&&(n=16);var h=(t/e).toPrecision(4),o="torus|".concat(h,"|").concat(r,"|").concat(n);if(!this._renderer.geometryInHash(o)){var i=new E.default.Geometry(r,n,function(){for(var e=0;e<=this.detailY;e++)for(var t=e/this.detailY,r=2*Math.PI*t,n=Math.cos(r),o=Math.sin(r),i=1+h*n,a=0;a<=this.detailX;a++){var s=a/this.detailX,l=2*Math.PI*s,u=Math.cos(l),c=Math.sin(l),d=new E.default.Vector(i*u,i*c,h*o),f=new E.default.Vector(n*u,n*c,o);this.vertices.push(d),this.vertexNormals.push(f),this.uvs.push(s,t)}});i.computeFaces(),r<=24&&n<=16?i._makeTriangleEdges()._edgesToVertices():this._renderer._doStroke&&console.log("Cannot draw strokes on torus object with more than 24 detailX or 16 detailY"),this._renderer.createBuffers(o,i)}return this._renderer.drawBuffersScaled(o,e,e,e),this},E.default.RendererGL.prototype.point=function(e,t,r){void 0===r&&(r=0);var n=[];return n.push(new E.default.Vector(e,t,r)),this._drawPoints(n,this.immediateMode.buffers.point),this},E.default.RendererGL.prototype.triangle=function(e){var t=e[0],r=e[1],n=e[2],o=e[3],i=e[4],a=e[5];if(!this.geometryInHash("tri")){var s=new E.default.Geometry(1,1,function(){var e=[];e.push(new E.default.Vector(0,0,0)),e.push(new E.default.Vector(0,1,0)),e.push(new E.default.Vector(1,0,0)),this.strokeIndices=[[0,1],[1,2],[2,0]],this.vertices=e,this.faces=[[0,1,2]],this.uvs=[0,0,0,1,1,1]});s._makeTriangleEdges()._edgesToVertices(),s.computeNormals(),this.createBuffers("tri",s)}var l=this.uMVMatrix.copy();try{var u=new E.default.Matrix([n-t,o-r,0,0,i-t,a-r,0,0,0,0,1,0,t,r,0,1]).mult(this.uMVMatrix);this.uMVMatrix=u,this.drawBuffers("tri")}finally{this.uMVMatrix=l}return this},E.default.RendererGL.prototype.ellipse=function(e){this.arc(e[0],e[1],e[2],e[3],0,h.TWO_PI,h.OPEN,e[4])},E.default.RendererGL.prototype.arc=function(e){var t,r,n=e,o=arguments[1],i=arguments[2],a=arguments[3],s=arguments[4],l=arguments[5],u=arguments[6],c=arguments[7]||25;if(r=Math.abs(l-s)>=h.TWO_PI?"".concat(t="ellipse","|").concat(c,"|"):"".concat(t="arc","|").concat(s,"|").concat(l,"|").concat(u,"|").concat(c,"|"),!this.geometryInHash(r)){var d=new E.default.Geometry(c,1,function(){if(this.strokeIndices=[],s.toFixed(10)!==l.toFixed(10)){u!==h.PIE&&void 0!==u||(this.vertices.push(new E.default.Vector(.5,.5,0)),this.uvs.push([.5,.5]));for(var e=0;e<=c;e++){var t=(l-s)*(e/c)+s,r=.5+Math.cos(t)/2,n=.5+Math.sin(t)/2;this.vertices.push(new E.default.Vector(r,n,0)),this.uvs.push([r,n]),e<c-1&&(this.faces.push([0,e+1,e+2]),this.strokeIndices.push([e+1,e+2]))}switch(u){case h.PIE:this.faces.push([0,this.vertices.length-2,this.vertices.length-1]),this.strokeIndices.push([0,1]),this.strokeIndices.push([this.vertices.length-2,this.vertices.length-1]),this.strokeIndices.push([0,this.vertices.length-1]);break;case h.CHORD:this.strokeIndices.push([0,1]),this.strokeIndices.push([0,this.vertices.length-1]);break;case h.OPEN:this.strokeIndices.push([0,1]);break;default:this.faces.push([0,this.vertices.length-2,this.vertices.length-1]),this.strokeIndices.push([this.vertices.length-2,this.vertices.length-1])}}});d.computeNormals(),c<=50?d._makeTriangleEdges()._edgesToVertices(d):this._doStroke&&console.log("Cannot apply a stroke to an ".concat(t," with more than 50 detail")),this.createBuffers(r,d)}var f=this.uMVMatrix.copy();try{this.uMVMatrix.translate([n,o,0]),this.uMVMatrix.scale(i,a,1),this.drawBuffers(r)}finally{this.uMVMatrix=f}return this},E.default.RendererGL.prototype.rect=function(e){var t=this._pInst._glAttributes.perPixelLighting,r=e[0],n=e[1],o=e[2],i=e[3],a=e[4]||(t?1:24),s=e[5]||(t?1:16),l="rect|".concat(a,"|").concat(s);if(!this.geometryInHash(l)){var u=new E.default.Geometry(a,s,function(){for(var e=0;e<=this.detailY;e++)for(var t=e/this.detailY,r=0;r<=this.detailX;r++){var n=r/this.detailX,o=new E.default.Vector(n,t,0);this.vertices.push(o),this.uvs.push(n,t)}0<a&&0<s&&(this.strokeIndices=[[0,a],[a,(a+1)*(s+1)-1],[(a+1)*(s+1)-1,(a+1)*s],[(a+1)*s,0]])});u.computeFaces().computeNormals()._makeTriangleEdges()._edgesToVertices(),this.createBuffers(l,u)}var c=this.uMVMatrix.copy();try{this.uMVMatrix.translate([r,n,0]),this.uMVMatrix.scale(o,i,1),this.drawBuffers(l)}finally{this.uMVMatrix=c}return this},E.default.RendererGL.prototype.quad=function(u,c,d,f,h,p,y,m,g,v,b,_,e,t){void 0===e&&(e=2),void 0===t&&(t=2);var r="quad|".concat(u,"|").concat(c,"|").concat(d,"|").concat(f,"|").concat(h,"|").concat(p,"|").concat(y,"|").concat(m,"|").concat(g,"|").concat(v,"|").concat(b,"|").concat(_,"|").concat(e,"|").concat(t);if(!this.geometryInHash(r)){var n=new E.default.Geometry(e,t,function(){for(var e=1/(this.detailX-1),t=1/(this.detailY-1),r=0;r<this.detailY;r++)for(var n=0;n<this.detailX;n++){var o=n*e,i=r*t,a=(1-o)*((1-i)*u+i*v)+o*((1-i)*f+i*y),s=(1-o)*((1-i)*c+i*b)+o*((1-i)*h+i*m),l=(1-o)*((1-i)*d+i*_)+o*((1-i)*p+i*g);this.vertices.push(new E.default.Vector(a,s,l)),this.uvs.push([o,i])}});n.faces=[];for(var o=0;o<t-1;o++)for(var i=0;i<e-1;i++){var a=i+o*e,s=i+1+o*e,l=i+1+(o+1)*e,x=i+(o+1)*e;n.faces.push([a,s,l]),n.faces.push([a,l,x])}n.computeNormals()._makeTriangleEdges()._edgesToVertices(),this.createBuffers(r,n)}return this.drawBuffers(r),this},E.default.RendererGL.prototype.bezier=function(e,t,r,n,o,i,a,s,l,u,c,d){8===arguments.length&&(c=s,u=a,s=i,a=o,o=n,n=r,r=i=l=d=0);var f=this._pInst._bezierDetail||20;this.beginShape();for(var h=0;h<=f;h++){var p=Math.pow(1-h/f,3),y=h/f*3*Math.pow(1-h/f,2),m=3*Math.pow(h/f,2)*(1-h/f),g=Math.pow(h/f,3);this.vertex(e*p+n*y+a*m+u*g,t*p+o*y+s*m+c*g,r*p+i*y+l*m+d*g)}return this.endShape(),this},E.default.RendererGL.prototype.curve=function(e,t,r,n,o,i,a,s,l,u,c,d){8===arguments.length&&(u=a,c=s,a=o,s=n,o=n=r,r=i=l=d=0);var f=this._pInst._curveDetail;this.beginShape();for(var h=0;h<=f;h++){var p=.5*Math.pow(h/f,3),y=.5*Math.pow(h/f,2),m=h/f*.5,g=p*(3*n-e-3*a+u)+y*(2*e-5*n+4*a-u)+m*(-e+a)+2*n*.5,v=p*(3*o-t-3*s+c)+y*(2*t-5*o+4*s-c)+m*(-t+s)+2*o*.5,b=p*(3*i-r-3*l+d)+y*(2*r-5*i+4*l-d)+m*(-r+l)+2*i*.5;this.vertex(g,v,b)}return this.endShape(),this},E.default.RendererGL.prototype.line=function(){return 6===arguments.length?(this.beginShape(h.LINES),this.vertex(arguments.length<=0?void 0:arguments[0],arguments.length<=1?void 0:arguments[1],arguments.length<=2?void 0:arguments[2]),this.vertex(arguments.length<=3?void 0:arguments[3],arguments.length<=4?void 0:arguments[4],arguments.length<=5?void 0:arguments[5]),this.endShape()):4===arguments.length&&(this.beginShape(h.LINES),this.vertex(arguments.length<=0?void 0:arguments[0],arguments.length<=1?void 0:arguments[1],0),this.vertex(arguments.length<=2?void 0:arguments[2],arguments.length<=3?void 0:arguments[3],0),this.endShape()),this},E.default.RendererGL.prototype.bezierVertex=function(){if(0===this.immediateMode._bezierVertex.length)throw Error("vertex() must be used once before calling bezierVertex()");var e,t,r,n,o,i=[],a=[],s=[],l=arguments.length;if((e=0)===this._lookUpTableBezier.length||this._lutBezierDetail!==this._pInst._curveDetail){this._lookUpTableBezier=[],this._lutBezierDetail=this._pInst._curveDetail;for(var u=1/this._lutBezierDetail,c=0,d=1,f=0;c<1;){if(e=parseFloat(c.toFixed(6)),this._lookUpTableBezier[f]=this._bezierCoefficients(e),d.toFixed(6)===u.toFixed(6)){e=parseFloat(d.toFixed(6))+parseFloat(c.toFixed(6)),++f,this._lookUpTableBezier[f]=this._bezierCoefficients(e);break}c+=u,d-=u,++f}}var h=this._lookUpTableBezier.length;if(6===l){for(this.isBezier=!0,i=[this.immediateMode._bezierVertex[0],arguments.length<=0?void 0:arguments[0],arguments.length<=2?void 0:arguments[2],arguments.length<=4?void 0:arguments[4]],a=[this.immediateMode._bezierVertex[1],arguments.length<=1?void 0:arguments[1],arguments.length<=3?void 0:arguments[3],arguments.length<=5?void 0:arguments[5]],o=0;o<h;o++)t=i[0]*this._lookUpTableBezier[o][0]+i[1]*this._lookUpTableBezier[o][1]+i[2]*this._lookUpTableBezier[o][2]+i[3]*this._lookUpTableBezier[o][3],r=a[0]*this._lookUpTableBezier[o][0]+a[1]*this._lookUpTableBezier[o][1]+a[2]*this._lookUpTableBezier[o][2]+a[3]*this._lookUpTableBezier[o][3],this.vertex(t,r);this.immediateMode._bezierVertex[0]=arguments.length<=4?void 0:arguments[4],this.immediateMode._bezierVertex[1]=arguments.length<=5?void 0:arguments[5]}else if(9===l){for(this.isBezier=!0,i=[this.immediateMode._bezierVertex[0],arguments.length<=0?void 0:arguments[0],arguments.length<=3?void 0:arguments[3],arguments.length<=6?void 0:arguments[6]],a=[this.immediateMode._bezierVertex[1],arguments.length<=1?void 0:arguments[1],arguments.length<=4?void 0:arguments[4],arguments.length<=7?void 0:arguments[7]],s=[this.immediateMode._bezierVertex[2],arguments.length<=2?void 0:arguments[2],arguments.length<=5?void 0:arguments[5],arguments.length<=8?void 0:arguments[8]],o=0;o<h;o++)t=i[0]*this._lookUpTableBezier[o][0]+i[1]*this._lookUpTableBezier[o][1]+i[2]*this._lookUpTableBezier[o][2]+i[3]*this._lookUpTableBezier[o][3],r=a[0]*this._lookUpTableBezier[o][0]+a[1]*this._lookUpTableBezier[o][1]+a[2]*this._lookUpTableBezier[o][2]+a[3]*this._lookUpTableBezier[o][3],n=s[0]*this._lookUpTableBezier[o][0]+s[1]*this._lookUpTableBezier[o][1]+s[2]*this._lookUpTableBezier[o][2]+s[3]*this._lookUpTableBezier[o][3],this.vertex(t,r,n);this.immediateMode._bezierVertex[0]=arguments.length<=6?void 0:arguments[6],this.immediateMode._bezierVertex[1]=arguments.length<=7?void 0:arguments[7],this.immediateMode._bezierVertex[2]=arguments.length<=8?void 0:arguments[8]}},E.default.RendererGL.prototype.quadraticVertex=function(){if(0===this.immediateMode._quadraticVertex.length)throw Error("vertex() must be used once before calling quadraticVertex()");var e,t,r,n,o,i=[],a=[],s=[],l=arguments.length;if((e=0)===this._lookUpTableQuadratic.length||this._lutQuadraticDetail!==this._pInst._curveDetail){this._lookUpTableQuadratic=[],this._lutQuadraticDetail=this._pInst._curveDetail;for(var u=1/this._lutQuadraticDetail,c=0,d=1,f=0;c<1;){if(e=parseFloat(c.toFixed(6)),this._lookUpTableQuadratic[f]=this._quadraticCoefficients(e),d.toFixed(6)===u.toFixed(6)){e=parseFloat(d.toFixed(6))+parseFloat(c.toFixed(6)),++f,this._lookUpTableQuadratic[f]=this._quadraticCoefficients(e);break}c+=u,d-=u,++f}}var h=this._lookUpTableQuadratic.length;if(4===l){for(this.isQuadratic=!0,i=[this.immediateMode._quadraticVertex[0],arguments.length<=0?void 0:arguments[0],arguments.length<=2?void 0:arguments[2]],a=[this.immediateMode._quadraticVertex[1],arguments.length<=1?void 0:arguments[1],arguments.length<=3?void 0:arguments[3]],o=0;o<h;o++)t=i[0]*this._lookUpTableQuadratic[o][0]+i[1]*this._lookUpTableQuadratic[o][1]+i[2]*this._lookUpTableQuadratic[o][2],r=a[0]*this._lookUpTableQuadratic[o][0]+a[1]*this._lookUpTableQuadratic[o][1]+a[2]*this._lookUpTableQuadratic[o][2],this.vertex(t,r);this.immediateMode._quadraticVertex[0]=arguments.length<=2?void 0:arguments[2],this.immediateMode._quadraticVertex[1]=arguments.length<=3?void 0:arguments[3]}else if(6===l){for(this.isQuadratic=!0,i=[this.immediateMode._quadraticVertex[0],arguments.length<=0?void 0:arguments[0],arguments.length<=3?void 0:arguments[3]],a=[this.immediateMode._quadraticVertex[1],arguments.length<=1?void 0:arguments[1],arguments.length<=4?void 0:arguments[4]],s=[this.immediateMode._quadraticVertex[2],arguments.length<=2?void 0:arguments[2],arguments.length<=5?void 0:arguments[5]],o=0;o<h;o++)t=i[0]*this._lookUpTableQuadratic[o][0]+i[1]*this._lookUpTableQuadratic[o][1]+i[2]*this._lookUpTableQuadratic[o][2],r=a[0]*this._lookUpTableQuadratic[o][0]+a[1]*this._lookUpTableQuadratic[o][1]+a[2]*this._lookUpTableQuadratic[o][2],n=s[0]*this._lookUpTableQuadratic[o][0]+s[1]*this._lookUpTableQuadratic[o][1]+s[2]*this._lookUpTableQuadratic[o][2],this.vertex(t,r,n);this.immediateMode._quadraticVertex[0]=arguments.length<=3?void 0:arguments[3],this.immediateMode._quadraticVertex[1]=arguments.length<=4?void 0:arguments[4],this.immediateMode._quadraticVertex[2]=arguments.length<=5?void 0:arguments[5]}},E.default.RendererGL.prototype.curveVertex=function(){var e,t,r,n,o,i=[],a=[],s=[],l=arguments.length;if((e=0)===this._lookUpTableBezier.length||this._lutBezierDetail!==this._pInst._curveDetail){this._lookUpTableBezier=[],this._lutBezierDetail=this._pInst._curveDetail;for(var u=1/this._lutBezierDetail,c=0,d=1,f=0;c<1;){if(e=parseFloat(c.toFixed(6)),this._lookUpTableBezier[f]=this._bezierCoefficients(e),d.toFixed(6)===u.toFixed(6)){e=parseFloat(d.toFixed(6))+parseFloat(c.toFixed(6)),++f,this._lookUpTableBezier[f]=this._bezierCoefficients(e);break}c+=u,d-=u,++f}}var h=this._lookUpTableBezier.length;if(2===l){if(this.immediateMode._curveVertex.push(arguments.length<=0?void 0:arguments[0]),this.immediateMode._curveVertex.push(arguments.length<=1?void 0:arguments[1]),8===this.immediateMode._curveVertex.length){for(this.isCurve=!0,i=this._bezierToCatmull([this.immediateMode._curveVertex[0],this.immediateMode._curveVertex[2],this.immediateMode._curveVertex[4],this.immediateMode._curveVertex[6]]),a=this._bezierToCatmull([this.immediateMode._curveVertex[1],this.immediateMode._curveVertex[3],this.immediateMode._curveVertex[5],this.immediateMode._curveVertex[7]]),o=0;o<h;o++)t=i[0]*this._lookUpTableBezier[o][0]+i[1]*this._lookUpTableBezier[o][1]+i[2]*this._lookUpTableBezier[o][2]+i[3]*this._lookUpTableBezier[o][3],r=a[0]*this._lookUpTableBezier[o][0]+a[1]*this._lookUpTableBezier[o][1]+a[2]*this._lookUpTableBezier[o][2]+a[3]*this._lookUpTableBezier[o][3],this.vertex(t,r);for(o=0;o<l;o++)this.immediateMode._curveVertex.shift()}}else if(3===l&&(this.immediateMode._curveVertex.push(arguments.length<=0?void 0:arguments[0]),this.immediateMode._curveVertex.push(arguments.length<=1?void 0:arguments[1]),this.immediateMode._curveVertex.push(arguments.length<=2?void 0:arguments[2]),12===this.immediateMode._curveVertex.length)){for(this.isCurve=!0,i=this._bezierToCatmull([this.immediateMode._curveVertex[0],this.immediateMode._curveVertex[3],this.immediateMode._curveVertex[6],this.immediateMode._curveVertex[9]]),a=this._bezierToCatmull([this.immediateMode._curveVertex[1],this.immediateMode._curveVertex[4],this.immediateMode._curveVertex[7],this.immediateMode._curveVertex[10]]),s=this._bezierToCatmull([this.immediateMode._curveVertex[2],this.immediateMode._curveVertex[5],this.immediateMode._curveVertex[8],this.immediateMode._curveVertex[11]]),o=0;o<h;o++)t=i[0]*this._lookUpTableBezier[o][0]+i[1]*this._lookUpTableBezier[o][1]+i[2]*this._lookUpTableBezier[o][2]+i[3]*this._lookUpTableBezier[o][3],r=a[0]*this._lookUpTableBezier[o][0]+a[1]*this._lookUpTableBezier[o][1]+a[2]*this._lookUpTableBezier[o][2]+a[3]*this._lookUpTableBezier[o][3],n=s[0]*this._lookUpTableBezier[o][0]+s[1]*this._lookUpTableBezier[o][1]+s[2]*this._lookUpTableBezier[o][2]+s[3]*this._lookUpTableBezier[o][3],this.vertex(t,r,n);for(o=0;o<l;o++)this.immediateMode._curveVertex.shift()}},E.default.RendererGL.prototype.image=function(e,t,r,n,o,i,a,s,l){this._isErasing&&this.blendMode(this._cachedBlendMode),this._pInst.push(),this._pInst.noLights(),this._pInst.texture(e),this._pInst.textureMode(h.NORMAL);var u=0;t<=e.width&&(u=t/e.width);var c=1;t+n<=e.width&&(c=(t+n)/e.width);var d=0;r<=e.height&&(d=r/e.height);var f=1;r+o<=e.height&&(f=(r+o)/e.height),this.beginShape(),this.vertex(i,a,0,u,d),this.vertex(i+s,a,0,c,d),this.vertex(i+s,a+l,0,c,f),this.vertex(i,a+l,0,u,f),this.endShape(h.CLOSE),this._pInst.pop(),this._isErasing&&this.blendMode(h.REMOVE)};var o=E.default;r.default=o},{"../core/constants":250,"../core/main":260,"./p5.Geometry":309,"core-js/modules/es.array.concat":148,"core-js/modules/es.number.to-fixed":169}],304:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.splice"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,f=(n=e("../core/main"))&&n.__esModule?n:{default:n},o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}f.default.prototype.orbitControl=function(e,t,r){if(this._assert3d("orbitControl"),f.default._validateParameters("orbitControl",arguments),this.mouseX<this.width&&0<this.mouseX&&this.mouseY<this.height&&0<this.mouseY){var n=this._renderer._curCamera;void 0===e&&(e=1),void 0===t&&(t=e),void 0===r&&(r=.5),!0!==this.contextMenuDisabled&&(this.canvas.oncontextmenu=function(){return!1},this._setProperty("contextMenuDisabled",!0)),!0!==this.wheelDefaultDisabled&&(this.canvas.onwheel=function(){return!1},this._setProperty("wheelDefaultDisabled",!0));var o=this.height<this.width?this.height:this.width;if(this._mouseWheelDeltaY!==this._pmouseWheelDeltaY&&(0<this._mouseWheelDeltaY?this._renderer._curCamera._orbit(0,0,r*o):this._renderer._curCamera._orbit(0,0,-r*o)),this.mouseIsPressed)if(this.mouseButton===this.LEFT){var i=-e*(this.mouseX-this.pmouseX)/o,a=t*(this.mouseY-this.pmouseY)/o;this._renderer._curCamera._orbit(i,a,0)}else if(this.mouseButton===this.RIGHT){var s=n._getLocalAxes(),l=Math.sqrt(s.x[0]*s.x[0]+s.x[2]*s.x[2]);0!==l&&(s.x[0]/=l,s.x[2]/=l);var u=Math.sqrt(s.y[0]*s.y[0]+s.y[2]*s.y[2]);0!==u&&(s.y[0]/=u,s.y[2]/=u);var c=-1*e*(this.mouseX-this.pmouseX),d=-1*t*(this.mouseY-this.pmouseY);n.setPosition(n.eyeX+c*s.x[0]+d*s.z[0],n.eyeY,n.eyeZ+c*s.x[2]+d*s.z[2])}return this}},f.default.prototype.debugMode=function(){this._assert3d("debugMode");for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];f.default._validateParameters("debugMode",t);for(var n=this._registeredMethods.post.length-1;0<=n;n--)this._registeredMethods.post[n].toString()!==this._grid().toString()&&this._registeredMethods.post[n].toString()!==this._axesIcon().toString()||this._registeredMethods.post.splice(n,1);t[0]===o.GRID?this.registerMethod("post",this._grid.call(this,t[1],t[2],t[3],t[4],t[5])):t[0]===o.AXES?this.registerMethod("post",this._axesIcon.call(this,t[1],t[2],t[3],t[4])):(this.registerMethod("post",this._grid.call(this,t[0],t[1],t[2],t[3],t[4])),this.registerMethod("post",this._axesIcon.call(this,t[5],t[6],t[7],t[8])))},f.default.prototype.noDebugMode=function(){this._assert3d("noDebugMode");for(var e=this._registeredMethods.post.length-1;0<=e;e--)this._registeredMethods.post[e].toString()!==this._grid().toString()&&this._registeredMethods.post[e].toString()!==this._axesIcon().toString()||this._registeredMethods.post.splice(e,1)},f.default.prototype._grid=function(e,r,n,o,i){void 0===e&&(e=this.width/2),void 0===r&&(r=Math.round(e/30)<4?4:Math.round(e/30)),void 0===n&&(n=0),void 0===o&&(o=0),void 0===i&&(i=0);var a=e/r,s=e/2;return function(){this.push(),this.stroke(255*this._renderer.curStrokeColor[0],255*this._renderer.curStrokeColor[1],255*this._renderer.curStrokeColor[2]),this._renderer.uMVMatrix.set(this._renderer._curCamera.cameraMatrix.mat4[0],this._renderer._curCamera.cameraMatrix.mat4[1],this._renderer._curCamera.cameraMatrix.mat4[2],this._renderer._curCamera.cameraMatrix.mat4[3],this._renderer._curCamera.cameraMatrix.mat4[4],this._renderer._curCamera.cameraMatrix.mat4[5],this._renderer._curCamera.cameraMatrix.mat4[6],this._renderer._curCamera.cameraMatrix.mat4[7],this._renderer._curCamera.cameraMatrix.mat4[8],this._renderer._curCamera.cameraMatrix.mat4[9],this._renderer._curCamera.cameraMatrix.mat4[10],this._renderer._curCamera.cameraMatrix.mat4[11],this._renderer._curCamera.cameraMatrix.mat4[12],this._renderer._curCamera.cameraMatrix.mat4[13],this._renderer._curCamera.cameraMatrix.mat4[14],this._renderer._curCamera.cameraMatrix.mat4[15]);for(var e=0;e<=r;e++)this.beginShape(this.LINES),this.vertex(-s+n,o,e*a-s+i),this.vertex(+s+n,o,e*a-s+i),this.endShape();for(var t=0;t<=r;t++)this.beginShape(this.LINES),this.vertex(t*a-s+n,o,-s+i),this.vertex(t*a-s+n,o,+s+i),this.endShape();this.pop()}},f.default.prototype._axesIcon=function(e,t,r,n){return void 0===e&&(e=40<this.width/20?this.width/20:40),void 0===t&&(t=-this.width/4),void 0===r&&(r=t),void 0===n&&(n=t),function(){this.push(),this._renderer.uMVMatrix.set(this._renderer._curCamera.cameraMatrix.mat4[0],this._renderer._curCamera.cameraMatrix.mat4[1],this._renderer._curCamera.cameraMatrix.mat4[2],this._renderer._curCamera.cameraMatrix.mat4[3],this._renderer._curCamera.cameraMatrix.mat4[4],this._renderer._curCamera.cameraMatrix.mat4[5],this._renderer._curCamera.cameraMatrix.mat4[6],this._renderer._curCamera.cameraMatrix.mat4[7],this._renderer._curCamera.cameraMatrix.mat4[8],this._renderer._curCamera.cameraMatrix.mat4[9],this._renderer._curCamera.cameraMatrix.mat4[10],this._renderer._curCamera.cameraMatrix.mat4[11],this._renderer._curCamera.cameraMatrix.mat4[12],this._renderer._curCamera.cameraMatrix.mat4[13],this._renderer._curCamera.cameraMatrix.mat4[14],this._renderer._curCamera.cameraMatrix.mat4[15]),this.strokeWeight(2),this.stroke(255,0,0),this.beginShape(this.LINES),this.vertex(t,r,n),this.vertex(t+e,r,n),this.endShape(),this.stroke(0,255,0),this.beginShape(this.LINES),this.vertex(t,r,n),this.vertex(t,r+e,n),this.endShape(),this.stroke(0,0,255),this.beginShape(this.LINES),this.vertex(t,r,n),this.vertex(t,r,n+e),this.endShape(),this.pop()}};var i=f.default;r.default=i},{"../core/constants":250,"../core/main":260,"core-js/modules/es.array.splice":162,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179}],305:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,y=(n=e("../core/main"))&&n.__esModule?n:{default:n},o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}y.default.prototype.ambientLight=function(e,t,r,n){this._assert3d("ambientLight"),y.default._validateParameters("ambientLight",arguments);var o=this.color.apply(this,arguments);return this._renderer.ambientLightColors.push(o._array[0],o._array[1],o._array[2]),this._renderer._enableLighting=!0,this},y.default.prototype.specularColor=function(e,t,r){this._assert3d("specularColor"),y.default._validateParameters("specularColor",arguments);var n=this.color.apply(this,arguments);return this._renderer.specularColors=[n._array[0],n._array[1],n._array[2]],this},y.default.prototype.directionalLight=function(e,t,r,n,o,i){var a,s,l,u;this._assert3d("directionalLight"),y.default._validateParameters("directionalLight",arguments),a=e instanceof y.default.Color?e:this.color(e,t,r);var c=arguments[arguments.length-1];u="number"==typeof c?(s=arguments[arguments.length-3],l=arguments[arguments.length-2],arguments[arguments.length-1]):(s=c.x,l=c.y,c.z);var d=Math.sqrt(s*s+l*l+u*u);return this._renderer.directionalLightDirections.push(s/d,l/d,u/d),this._renderer.directionalLightDiffuseColors.push(a._array[0],a._array[1],a._array[2]),Array.prototype.push.apply(this._renderer.directionalLightSpecularColors,this._renderer.specularColors),this._renderer._enableLighting=!0,this},y.default.prototype.pointLight=function(e,t,r,n,o,i){var a,s,l,u;this._assert3d("pointLight"),y.default._validateParameters("pointLight",arguments),a=e instanceof y.default.Color?e:this.color(e,t,r);var c=arguments[arguments.length-1];return u="number"==typeof c?(s=arguments[arguments.length-3],l=arguments[arguments.length-2],arguments[arguments.length-1]):(s=c.x,l=c.y,c.z),this._renderer.pointLightPositions.push(s,l,u),this._renderer.pointLightDiffuseColors.push(a._array[0],a._array[1],a._array[2]),Array.prototype.push.apply(this._renderer.pointLightSpecularColors,this._renderer.specularColors),this._renderer._enableLighting=!0,this},y.default.prototype.lights=function(){if(this._assert3d("lights"),this._colorMode===o.RGB)this.ambientLight(128,128,128),this.directionalLight(128,128,128,0,0,-1);else{var e=this._colorMaxes[this._colorMode][2];this.ambientLight(0,0,e),this.directionalLight(0,0,e,0,0,-1)}return this},y.default.prototype.lightFalloff=function(e,t,r){return this._assert3d("lightFalloff"),y.default._validateParameters("lightFalloff",arguments),e<0&&(e=0,console.warn("Value of constant argument in lightFalloff() should be never be negative. Set to 0.")),t<0&&(t=0,console.warn("Value of linear argument in lightFalloff() should be never be negative. Set to 0.")),r<0&&(r=0,console.warn("Value of quadratic argument in lightFalloff() should be never be negative. Set to 0.")),0===e&&0===t&&0===r&&(e=1,console.warn("Either one of the three arguments in lightFalloff() should be greater than zero. Set constant argument to 1.")),this._renderer.constantAttenuation=e,this._renderer.linearAttenuation=t,this._renderer.quadraticAttenuation=r,this},y.default.prototype.spotLight=function(e,t,r,n,o,i,a,s,l,u,c){var d,f,h;this._assert3d("spotLight"),y.default._validateParameters("spotLight",arguments);var p=arguments.length;switch(p){case 11:case 10:d=this.color(e,t,r),f=new y.default.Vector(n,o,i),h=new y.default.Vector(a,s,l);break;case 9:e instanceof y.default.Color?(d=e,f=new y.default.Vector(t,r,n),h=new y.default.Vector(o,i,a),u=s,c=l):n instanceof y.default.Vector?(d=this.color(e,t,r),f=n,h=new y.default.Vector(o,i,a),u=s,c=l):a instanceof y.default.Vector?(d=this.color(e,t,r),f=new y.default.Vector(n,o,i),h=a,u=s,c=l):(d=this.color(e,t,r),f=new y.default.Vector(n,o,i),h=new y.default.Vector(a,s,l));break;case 8:u=(h=e instanceof y.default.Color?(d=e,f=new y.default.Vector(t,r,n),new y.default.Vector(o,i,a)):n instanceof y.default.Vector?(d=this.color(e,t,r),f=n,new y.default.Vector(o,i,a)):(d=this.color(e,t,r),f=new y.default.Vector(n,o,i),a),s);break;case 7:e instanceof y.default.Color&&t instanceof y.default.Vector?(d=e,f=t,h=new y.default.Vector(r,n,o),u=i,c=a):e instanceof y.default.Color&&o instanceof y.default.Vector?(d=e,f=new y.default.Vector(t,r,n),h=o,u=i,c=a):n instanceof y.default.Vector&&o instanceof y.default.Vector?(d=this.color(e,t,r),f=n,h=o,u=i,c=a):h=e instanceof y.default.Color?(d=e,f=new y.default.Vector(t,r,n),new y.default.Vector(o,i,a)):n instanceof y.default.Vector?(d=this.color(e,t,r),f=n,new y.default.Vector(o,i,a)):(d=this.color(e,t,r),f=new y.default.Vector(n,o,i),a);break;case 6:n instanceof y.default.Vector&&o instanceof y.default.Vector?(d=this.color(e,t,r),f=n,h=o,u=i):e instanceof y.default.Color&&o instanceof y.default.Vector?(d=e,f=new y.default.Vector(t,r,n),h=o,u=i):e instanceof y.default.Color&&t instanceof y.default.Vector&&(d=e,f=t,h=new y.default.Vector(r,n,o),u=i);break;case 5:e instanceof y.default.Color&&t instanceof y.default.Vector&&r instanceof y.default.Vector?(d=e,f=t,h=r,u=n,c=o):n instanceof y.default.Vector&&o instanceof y.default.Vector?(d=this.color(e,t,r),f=n,h=o):e instanceof y.default.Color&&o instanceof y.default.Vector?(d=e,f=new y.default.Vector(t,r,n),h=o):e instanceof y.default.Color&&t instanceof y.default.Vector&&(d=e,f=t,h=new y.default.Vector(r,n,o));break;case 4:d=e,f=t,h=r,u=n;break;case 3:d=e,f=t,h=r;break;default:return console.warn("Sorry, input for spotlight() is not in prescribed format. Too ".concat(p<3?"few":"many"," arguments were provided")),this}return this._renderer.spotLightDiffuseColors.push(d._array[0],d._array[1],d._array[2]),Array.prototype.push.apply(this._renderer.spotLightSpecularColors,this._renderer.specularColors),this._renderer.spotLightPositions.push(f.x,f.y,f.z),h.normalize(),this._renderer.spotLightDirections.push(h.x,h.y,h.z),void 0===u&&(u=Math.PI/3),void 0!==c&&c<1?(c=1,console.warn("Value of concentration needs to be greater than 1. Setting it to 1")):void 0===c&&(c=100),u=this._renderer._pInst._toRadians(u),this._renderer.spotLightAngle.push(Math.cos(u)),this._renderer.spotLightConc.push(c),this._renderer._enableLighting=!0,this},y.default.prototype.noLights=function(){return this._assert3d("noLights"),y.default._validateParameters("noLights",arguments),this._renderer._enableLighting=!1,this._renderer.ambientLightColors.length=0,this._renderer.specularColors=[1,1,1],this._renderer.directionalLightDirections.length=0,this._renderer.directionalLightDiffuseColors.length=0,this._renderer.directionalLightSpecularColors.length=0,this._renderer.pointLightPositions.length=0,this._renderer.pointLightDiffuseColors.length=0,this._renderer.pointLightSpecularColors.length=0,this._renderer.spotLightPositions.length=0,this._renderer.spotLightDirections.length=0,this._renderer.spotLightDiffuseColors.length=0,this._renderer.spotLightSpecularColors.length=0,this._renderer.spotLightAngle.length=0,this._renderer.spotLightConc.length=0,this._renderer.constantAttenuation=1,this._renderer.linearAttenuation=0,this._renderer.quadraticAttenuation=0,this._renderer._useShininess=1,this};var i=y.default;r.default=i},{"../core/constants":250,"../core/main":260}],306:[function(e,t,r){"use strict";e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.array.splice"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.match"),e("core-js/modules/es.string.split"),e("core-js/modules/es.string.trim"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,S=(n=e("../core/main"))&&n.__esModule?n:{default:n};function s(e,t,r){for(var n=0,o=e.length;n<o;n++)if(e[n]!==t.getUint8(r+n,!1))return!1;return!0}e("./p5.Geometry"),S.default.prototype.loadModel=function(e){var t,r,n;S.default._validateParameters("loadModel",arguments);var o=e.slice(-4);"boolean"==typeof arguments[1]?(t=arguments[1],r=arguments[2],n=arguments[3],void 0!==arguments[4]&&(o=arguments[4])):(t=!1,r=arguments[1],n=arguments[2],void 0!==arguments[3]&&(o=arguments[3]));var i=new S.default.Geometry;i.gid="".concat(e,"|").concat(t);var a=this;return o.match(/\.stl$/i)?this.httpDo(e,"GET","arrayBuffer",function(e){!function(e,t){if(function(e){for(var t=new DataView(e),r=[115,111,108,105,100],n=0;n<5;n++)if(s(r,t,n))return!1;return!0}(t))!function(e,t){for(var r,n,o,i,a,s,l,u=new DataView(t),c=u.getUint32(80,!0),d=!1,f=0;f<70;f++)1129270351===u.getUint32(f,!1)&&82===u.getUint8(f+4)&&61===u.getUint8(f+5)&&(d=!0,i=[],a=u.getUint8(f+6)/255,s=u.getUint8(f+7)/255,l=u.getUint8(f+8)/255);for(var h=0;h<c;h++){var p=84+50*h,y=u.getFloat32(p,!0),m=u.getFloat32(4+p,!0),g=u.getFloat32(8+p,!0);if(d){var v=u.getUint16(48+p,!0);o=0==(32768&v)?(r=(31&v)/31,n=(v>>5&31)/31,(v>>10&31)/31):(r=a,n=s,l)}for(var b=new S.default.Vector(y,m,g),_=1;_<=3;_++){var x=p+12*_,w=new S.default.Vector(u.getFloat32(x,!0),u.getFloat32(4+x,!0),u.getFloat32(8+x,!0));e.vertices.push(w),e.vertexNormals.push(b),d&&i.push(r,n,o)}e.faces.push([3*h,3*h+1,3*h+2]),e.uvs.push([0,0],[0,0],[0,0])}}(e,t);else{var r=new DataView(t);if(!("TextDecoder"in window))return console.warn("Sorry, ASCII STL loading only works in browsers that support TextDecoder (https://caniuse.com/#feat=textencoder)");var n=new TextDecoder("utf-8").decode(r).split("\n");!function(e,t){for(var r,n,o="",i=[],a=0;a<t.length;++a){for(var s=t[a].trim(),l=s.split(" "),u=0;u<l.length;++u)""===l[u]&&l.splice(u,1);if(0!==l.length)switch(o){case"":if("solid"!==l[0])return console.error(s),console.error('Invalid state "'.concat(l[0],'", should be "solid"'));o="solid";break;case"solid":if("facet"!==l[0]||"normal"!==l[1])return console.error(s),console.error('Invalid state "'.concat(l[0],'", should be "facet normal"'));r=new S.default.Vector(parseFloat(l[2]),parseFloat(l[3]),parseFloat(l[4])),e.vertexNormals.push(r,r,r),o="facet normal";break;case"facet normal":if("outer"!==l[0]||"loop"!==l[1])return console.error(s),console.error('Invalid state "'.concat(l[0],'", should be "outer loop"'));o="vertex";break;case"vertex":if("vertex"===l[0])n=new S.default.Vector(parseFloat(l[1]),parseFloat(l[2]),parseFloat(l[3])),e.vertices.push(n),e.uvs.push([0,0]),i.push(e.vertices.indexOf(n));else{if("endloop"!==l[0])return console.error(s),console.error('Invalid state "'.concat(l[0],'", should be "vertex" or "endloop"'));e.faces.push(i),i=[],o="endloop"}break;case"endloop":if("endfacet"!==l[0])return console.error(s),console.error('Invalid state "'.concat(l[0],'", should be "endfacet"'));o="endfacet";break;case"endfacet":if("endsolid"!==l[0]){if("facet"!==l[0]||"normal"!==l[1])return console.error(s),console.error('Invalid state "'.concat(l[0],'", should be "endsolid" or "facet normal"'));r=new S.default.Vector(parseFloat(l[2]),parseFloat(l[3]),parseFloat(l[4])),e.vertexNormals.push(r,r,r),o="facet normal"}break;default:console.error('Invalid state "'.concat(o,'"'))}}}(e,n)}}(i,e),t&&i.normalize(),a._decrementPreload(),"function"==typeof r&&r(i)},n):o.match(/\.obj$/i)?this.loadStrings(e,function(e){!function(e,t){for(var r={v:[],vt:[],vn:[]},n={},o=0;o<t.length;++o){var i=t[o].trim().split(/\b\s+/);if(0<i.length)if("v"===i[0]||"vn"===i[0]){var a=new S.default.Vector(parseFloat(i[1]),parseFloat(i[2]),parseFloat(i[3]));r[i[0]].push(a)}else if("vt"===i[0]){var s=[parseFloat(i[1]),1-parseFloat(i[2])];r[i[0]].push(s)}else if("f"===i[0])for(var l=3;l<i.length;++l){for(var u=[],c=[1,l-1,l],d=0;d<c.length;++d){var f=i[c[d]],h=0;if(void 0!==n[f])h=n[f];else{for(var p=f.split("/"),y=0;y<p.length;y++)p[y]=parseInt(p[y])-1;h=n[f]=e.vertices.length,e.vertices.push(r.v[p[0]].copy()),r.vt[p[1]]?e.uvs.push(r.vt[p[1]].slice()):e.uvs.push([0,0]),r.vn[p[2]]&&e.vertexNormals.push(r.vn[p[2]].copy())}u.push(h)}u[0]!==u[1]&&u[0]!==u[2]&&u[1]!==u[2]&&e.faces.push(u)}}0===e.vertexNormals.length&&e.computeNormals()}(i,e),t&&i.normalize(),a._decrementPreload(),"function"==typeof r&&r(i)},n):(S.default._friendlyFileLoadError(3,e),n?n():console.error("Sorry, the file type is invalid. Only OBJ and STL files are supported.")),i},S.default.prototype.model=function(e){this._assert3d("model"),S.default._validateParameters("model",arguments),0<e.vertices.length&&(this._renderer.geometryInHash(e.gid)||(e._makeTriangleEdges()._edgesToVertices(),this._renderer.createBuffers(e.gid,e)),this._renderer.drawBuffers(e.gid))};var o=S.default;r.default=o},{"../core/main":260,"./p5.Geometry":309,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.slice":160,"core-js/modules/es.array.splice":162,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.match":184,"core-js/modules/es.string.split":188,"core-js/modules/es.string.trim":190}],307:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.join"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,u=(n=e("../core/main"))&&n.__esModule?n:{default:n},o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}e("./p5.Texture"),u.default.prototype.loadShader=function(e,t,r,n){u.default._validateParameters("loadShader",arguments),n=n||console.error;function o(){a._decrementPreload(),r&&r(i)}var i=new u.default.Shader,a=this,s=!1,l=!1;return this.loadStrings(e,function(e){i._vertSrc=e.join("\n"),l=!0,s&&o()},n),this.loadStrings(t,function(e){i._fragSrc=e.join("\n"),s=!0,l&&o()},n),i},u.default.prototype.createShader=function(e,t){return this._assert3d("createShader"),u.default._validateParameters("createShader",arguments),new u.default.Shader(this._renderer,e,t)},u.default.prototype.shader=function(e){return this._assert3d("shader"),u.default._validateParameters("shader",arguments),void 0===e._renderer&&(e._renderer=this._renderer),e.isStrokeShader()?this._renderer.userStrokeShader=e:(this._renderer.userFillShader=e,this._renderer._useNormalMaterial=!1),e.init(),this},u.default.prototype.resetShader=function(){return this._renderer.userFillShader=this._renderer.userStrokeShader=null,this},u.default.prototype.normalMaterial=function(){this._assert3d("normalMaterial");for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return u.default._validateParameters("normalMaterial",t),this._renderer.drawMode=o.FILL,this._renderer._useSpecularMaterial=!1,this._renderer._useEmissiveMaterial=!1,this._renderer._useNormalMaterial=!0,this._renderer.curFillColor=[1,1,1,1],this._renderer._setProperty("_doFill",!0),this.noStroke(),this},u.default.prototype.texture=function(e){return this._assert3d("texture"),u.default._validateParameters("texture",arguments),e.gifProperties&&e._animateGif(this),this._renderer.drawMode=o.TEXTURE,this._renderer._useSpecularMaterial=!1,this._renderer._useEmissiveMaterial=!1,this._renderer._useNormalMaterial=!1,this._renderer._tex=e,this._renderer._setProperty("_doFill",!0),this},u.default.prototype.textureMode=function(e){e!==o.IMAGE&&e!==o.NORMAL?console.warn("You tried to set ".concat(e," textureMode only supports IMAGE & NORMAL ")):this._renderer.textureMode=e},u.default.prototype.textureWrap=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:e;this._renderer.textureWrapX=e,this._renderer.textureWrapY=t;for(var r=this._renderer.textures,n=0;n<r.length;n++)r[n].setWrapMode(e,t)},u.default.prototype.ambientMaterial=function(e,t,r){this._assert3d("ambientMaterial"),u.default._validateParameters("ambientMaterial",arguments);var n=u.default.prototype.color.apply(this,arguments);return this._renderer.curFillColor=n._array,this._renderer._useSpecularMaterial=!1,this._renderer._useEmissiveMaterial=!1,this._renderer._useNormalMaterial=!1,this._renderer._enableLighting=!0,this._renderer._tex=null,this},u.default.prototype.emissiveMaterial=function(e,t,r,n){this._assert3d("emissiveMaterial"),u.default._validateParameters("emissiveMaterial",arguments);var o=u.default.prototype.color.apply(this,arguments);return this._renderer.curFillColor=o._array,this._renderer._useSpecularMaterial=!1,this._renderer._useEmissiveMaterial=!0,this._renderer._useNormalMaterial=!1,this._renderer._enableLighting=!0,this._renderer._tex=null,this},u.default.prototype.specularMaterial=function(e,t,r,n){this._assert3d("specularMaterial"),u.default._validateParameters("specularMaterial",arguments);var o=u.default.prototype.color.apply(this,arguments);return this._renderer.curFillColor=o._array,this._renderer._useSpecularMaterial=!0,this._renderer._useEmissiveMaterial=!1,this._renderer._useNormalMaterial=!1,this._renderer._enableLighting=!0,this._renderer._tex=null,this},u.default.prototype.shininess=function(e){return this._assert3d("shininess"),u.default._validateParameters("shininess",arguments),e<1&&(e=1),this._renderer._useShininess=e,this},u.default.RendererGL.prototype._applyColorBlend=function(e){var t=this.GL,r=this.drawMode===o.TEXTURE||e[e.length-1]<1||this._isErasing;return r!==this._isBlending&&(r||this.curBlendMode!==o.BLEND&&this.curBlendMode!==o.ADD?t.enable(t.BLEND):t.disable(t.BLEND),t.depthMask(!0),this._isBlending=r),this._applyBlendMode(),e},u.default.RendererGL.prototype._applyBlendMode=function(){if(this._cachedBlendMode!==this.curBlendMode){var e=this.GL;switch(this.curBlendMode){case o.BLEND:case o.ADD:e.blendEquation(e.FUNC_ADD),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);break;case o.REMOVE:e.blendEquation(e.FUNC_REVERSE_SUBTRACT),e.blendFunc(e.SRC_ALPHA,e.DST_ALPHA);break;case o.MULTIPLY:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD),e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ONE,e.ONE);break;case o.SCREEN:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD),e.blendFuncSeparate(e.ONE_MINUS_DST_COLOR,e.ONE,e.ONE,e.ONE);break;case o.EXCLUSION:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD),e.blendFuncSeparate(e.ONE_MINUS_DST_COLOR,e.ONE_MINUS_SRC_COLOR,e.ONE,e.ONE);break;case o.REPLACE:e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO);break;case o.SUBTRACT:e.blendEquationSeparate(e.FUNC_REVERSE_SUBTRACT,e.FUNC_ADD),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case o.DARKEST:this.blendExt?(e.blendEquationSeparate(this.blendExt.MIN_EXT,e.FUNC_ADD),e.blendFuncSeparate(e.ONE,e.ONE,e.ONE,e.ONE)):console.warn("blendMode(DARKEST) does not work in your browser in WEBGL mode.");break;case o.LIGHTEST:this.blendExt?(e.blendEquationSeparate(this.blendExt.MAX_EXT,e.FUNC_ADD),e.blendFuncSeparate(e.ONE,e.ONE,e.ONE,e.ONE)):console.warn("blendMode(LIGHTEST) does not work in your browser in WEBGL mode.");break;default:console.error("Oops! Somehow RendererGL set curBlendMode to an unsupported mode.")}this._isErasing||(this._cachedBlendMode=this.curBlendMode)}};var i=u.default;r.default=i},{"../core/constants":250,"../core/main":260,"./p5.Texture":316,"core-js/modules/es.array.join":157}],308:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,y=(n=e("../core/main"))&&n.__esModule?n:{default:n};y.default.prototype.camera=function(){var e;this._assert3d("camera");for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return y.default._validateParameters("camera",r),(e=this._renderer._curCamera).camera.apply(e,r),this},y.default.prototype.perspective=function(){var e;this._assert3d("perspective");for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return y.default._validateParameters("perspective",r),(e=this._renderer._curCamera).perspective.apply(e,r),this},y.default.prototype.ortho=function(){var e;this._assert3d("ortho");for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return y.default._validateParameters("ortho",r),(e=this._renderer._curCamera).ortho.apply(e,r),this},y.default.prototype.frustum=function(){var e;this._assert3d("frustum");for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return y.default._validateParameters("frustum",r),(e=this._renderer._curCamera).frustum.apply(e,r),this},y.default.prototype.createCamera=function(){this._assert3d("createCamera");var e=new y.default.Camera(this._renderer);return e._computeCameraDefaultSettings(),e._setDefaultCamera(),this._renderer._curCamera=e},y.default.Camera=function(e){this._renderer=e,this.cameraType="default",this.cameraMatrix=new y.default.Matrix,this.projMatrix=new y.default.Matrix},y.default.Camera.prototype.perspective=function(e,t,r,n){this.cameraType=0<arguments.length?"custom":"default",void 0===e?(e=this.defaultCameraFOV,this.cameraFOV=e):this.cameraFOV=this._renderer._pInst._toRadians(e),void 0===t&&(t=this.defaultAspectRatio),void 0===r&&(r=this.defaultCameraNear),void 0===n&&(n=this.defaultCameraFar),r<=1e-4&&(r=.01,console.log("Avoid perspective near plane values close to or below 0. Setting value to 0.01.")),n<r&&console.log("Perspective far plane value is less than near plane value. Nothing will be shown."),this.aspectRatio=t,this.cameraNear=r,this.cameraFar=n,this.projMatrix=y.default.Matrix.identity();var o=1/Math.tan(this.cameraFOV/2),i=1/(this.cameraNear-this.cameraFar);this.projMatrix.set(o/t,0,0,0,0,-o,0,0,0,0,(n+r)*i,-1,0,0,2*n*r*i,0),this._isActive()&&this._renderer.uPMatrix.set(this.projMatrix.mat4[0],this.projMatrix.mat4[1],this.projMatrix.mat4[2],this.projMatrix.mat4[3],this.projMatrix.mat4[4],this.projMatrix.mat4[5],this.projMatrix.mat4[6],this.projMatrix.mat4[7],this.projMatrix.mat4[8],this.projMatrix.mat4[9],this.projMatrix.mat4[10],this.projMatrix.mat4[11],this.projMatrix.mat4[12],this.projMatrix.mat4[13],this.projMatrix.mat4[14],this.projMatrix.mat4[15])},y.default.Camera.prototype.ortho=function(e,t,r,n,o,i){void 0===e&&(e=-this._renderer.width/2),void 0===t&&(t=this._renderer.width/2),void 0===r&&(r=-this._renderer.height/2),void 0===n&&(n=this._renderer.height/2),void 0===o&&(o=0),void 0===i&&(i=Math.max(this._renderer.width,this._renderer.height));var a=t-e,s=n-r,l=i-o,u=2/a,c=2/s,d=-2/l,f=-(t+e)/a,h=-(n+r)/s,p=-(i+o)/l;this.projMatrix=y.default.Matrix.identity(),this.projMatrix.set(u,0,0,0,0,-c,0,0,0,0,d,0,f,h,p,1),this._isActive()&&this._renderer.uPMatrix.set(this.projMatrix.mat4[0],this.projMatrix.mat4[1],this.projMatrix.mat4[2],this.projMatrix.mat4[3],this.projMatrix.mat4[4],this.projMatrix.mat4[5],this.projMatrix.mat4[6],this.projMatrix.mat4[7],this.projMatrix.mat4[8],this.projMatrix.mat4[9],this.projMatrix.mat4[10],this.projMatrix.mat4[11],this.projMatrix.mat4[12],this.projMatrix.mat4[13],this.projMatrix.mat4[14],this.projMatrix.mat4[15]),this.cameraType="custom"},y.default.Camera.prototype.frustum=function(e,t,r,n,o,i){void 0===e&&(e=-this._renderer.width/2),void 0===t&&(t=this._renderer.width/2),void 0===r&&(r=-this._renderer.height/2),void 0===n&&(n=this._renderer.height/2),void 0===o&&(o=0),void 0===i&&(i=Math.max(this._renderer.width,this._renderer.height));var a=t-e,s=n-r,l=i-o,u=2*o/a,c=2*o/s,d=-2*i*o/l,f=(t+e)/a,h=(n+r)/s,p=-(i+o)/l;this.projMatrix=y.default.Matrix.identity(),this.projMatrix.set(u,0,0,0,0,c,0,0,f,h,p,-1,0,0,d,0),this._isActive()&&this._renderer.uPMatrix.set(this.projMatrix.mat4[0],this.projMatrix.mat4[1],this.projMatrix.mat4[2],this.projMatrix.mat4[3],this.projMatrix.mat4[4],this.projMatrix.mat4[5],this.projMatrix.mat4[6],this.projMatrix.mat4[7],this.projMatrix.mat4[8],this.projMatrix.mat4[9],this.projMatrix.mat4[10],this.projMatrix.mat4[11],this.projMatrix.mat4[12],this.projMatrix.mat4[13],this.projMatrix.mat4[14],this.projMatrix.mat4[15]),this.cameraType="custom"},y.default.Camera.prototype._rotateView=function(e,t,r,n){var o=this.centerX,i=this.centerY,a=this.centerZ;o-=this.eyeX,i-=this.eyeY,a-=this.eyeZ;var s=y.default.Matrix.identity(this._renderer._pInst);s.rotate(this._renderer._pInst._toRadians(e),t,r,n);var l=[o*s.mat4[0]+i*s.mat4[4]+a*s.mat4[8],o*s.mat4[1]+i*s.mat4[5]+a*s.mat4[9],o*s.mat4[2]+i*s.mat4[6]+a*s.mat4[10]];l[0]+=this.eyeX,l[1]+=this.eyeY,l[2]+=this.eyeZ,this.camera(this.eyeX,this.eyeY,this.eyeZ,l[0],l[1],l[2],this.upX,this.upY,this.upZ)},y.default.Camera.prototype.pan=function(e){var t=this._getLocalAxes();this._rotateView(e,t.y[0],t.y[1],t.y[2])},y.default.Camera.prototype.tilt=function(e){var t=this._getLocalAxes();this._rotateView(e,t.x[0],t.x[1],t.x[2])},y.default.Camera.prototype.lookAt=function(e,t,r){this.camera(this.eyeX,this.eyeY,this.eyeZ,e,t,r,this.upX,this.upY,this.upZ)},y.default.Camera.prototype.camera=function(e,t,r,n,o,i,a,s,l){void 0===e&&(e=this.defaultEyeX,t=this.defaultEyeY,r=this.defaultEyeZ,n=e,o=t,s=1,l=a=i=0),this.eyeX=e,this.eyeY=t,this.eyeZ=r,void 0!==n&&(this.centerX=n,this.centerY=o,this.centerZ=i),void 0!==a&&(this.upX=a,this.upY=s,this.upZ=l);var u=this._getLocalAxes();this.cameraMatrix.set(u.x[0],u.y[0],u.z[0],0,u.x[1],u.y[1],u.z[1],0,u.x[2],u.y[2],u.z[2],0,0,0,0,1);var c=-e,d=-t,f=-r;return this.cameraMatrix.translate([c,d,f]),this._isActive()&&this._renderer.uMVMatrix.set(this.cameraMatrix.mat4[0],this.cameraMatrix.mat4[1],this.cameraMatrix.mat4[2],this.cameraMatrix.mat4[3],this.cameraMatrix.mat4[4],this.cameraMatrix.mat4[5],this.cameraMatrix.mat4[6],this.cameraMatrix.mat4[7],this.cameraMatrix.mat4[8],this.cameraMatrix.mat4[9],this.cameraMatrix.mat4[10],this.cameraMatrix.mat4[11],this.cameraMatrix.mat4[12],this.cameraMatrix.mat4[13],this.cameraMatrix.mat4[14],this.cameraMatrix.mat4[15]),this},y.default.Camera.prototype.move=function(e,t,r){var n=this._getLocalAxes(),o=[n.x[0]*e,n.x[1]*e,n.x[2]*e],i=[n.y[0]*t,n.y[1]*t,n.y[2]*t],a=[n.z[0]*r,n.z[1]*r,n.z[2]*r];this.camera(this.eyeX+o[0]+i[0]+a[0],this.eyeY+o[1]+i[1]+a[1],this.eyeZ+o[2]+i[2]+a[2],this.centerX+o[0]+i[0]+a[0],this.centerY+o[1]+i[1]+a[1],this.centerZ+o[2]+i[2]+a[2],0,1,0)},y.default.Camera.prototype.setPosition=function(e,t,r){var n=e-this.eyeX,o=t-this.eyeY,i=r-this.eyeZ;this.camera(e,t,r,this.centerX+n,this.centerY+o,this.centerZ+i,0,1,0)},y.default.Camera.prototype._computeCameraDefaultSettings=function(){this.defaultCameraFOV=60/180*Math.PI,this.defaultAspectRatio=this._renderer.width/this._renderer.height,this.defaultEyeX=0,this.defaultEyeY=0,this.defaultEyeZ=this._renderer.height/2/Math.tan(this.defaultCameraFOV/2),this.defaultCenterX=0,this.defaultCenterY=0,this.defaultCenterZ=0,this.defaultCameraNear=.1*this.defaultEyeZ,this.defaultCameraFar=10*this.defaultEyeZ},y.default.Camera.prototype._setDefaultCamera=function(){this.cameraFOV=this.defaultCameraFOV,this.aspectRatio=this.defaultAspectRatio,this.eyeX=this.defaultEyeX,this.eyeY=this.defaultEyeY,this.eyeZ=this.defaultEyeZ,this.centerX=this.defaultCenterX,this.centerY=this.defaultCenterY,this.centerZ=this.defaultCenterZ,this.upX=0,this.upY=1,this.upZ=0,this.cameraNear=this.defaultCameraNear,this.cameraFar=this.defaultCameraFar,this.perspective(),this.camera(),this.cameraType="default"},y.default.Camera.prototype._resize=function(){"default"===this.cameraType?(this._computeCameraDefaultSettings(),this._setDefaultCamera()):this.perspective(this.cameraFOV,this._renderer.width/this._renderer.height)},y.default.Camera.prototype.copy=function(){var e=new y.default.Camera(this._renderer);return e.cameraFOV=this.cameraFOV,e.aspectRatio=this.aspectRatio,e.eyeX=this.eyeX,e.eyeY=this.eyeY,e.eyeZ=this.eyeZ,e.centerX=this.centerX,e.centerY=this.centerY,e.centerZ=this.centerZ,e.cameraNear=this.cameraNear,e.cameraFar=this.cameraFar,e.cameraType=this.cameraType,e.cameraMatrix=this.cameraMatrix.copy(),e.projMatrix=this.projMatrix.copy(),e},y.default.Camera.prototype._getLocalAxes=function(){var e=this.eyeX-this.centerX,t=this.eyeY-this.centerY,r=this.eyeZ-this.centerZ,n=Math.sqrt(e*e+t*t+r*r);0!==n&&(e/=n,t/=n,r/=n);var o=this.upX,i=this.upY,a=this.upZ,s=i*r-a*t,l=-o*r+a*e,u=o*t-i*e;o=t*u-r*l,i=-e*u+r*s,a=e*l-t*s;var c=Math.sqrt(s*s+l*l+u*u);0!==c&&(s/=c,l/=c,u/=c);var d=Math.sqrt(o*o+i*i+a*a);return 0!==d&&(o/=d,i/=d,a/=d),{x:[s,l,u],y:[o,i,a],z:[e,t,r]}},y.default.Camera.prototype._orbit=function(e,t,r){var n=this.eyeX-this.centerX,o=this.eyeY-this.centerY,i=this.eyeZ-this.centerZ,a=Math.sqrt(n*n+o*o+i*i),s=Math.atan2(n,i),l=Math.acos(Math.max(-1,Math.min(1,o/a)));s+=e,(a+=r)<0&&(a=.1),(l+=t)>Math.PI?l=Math.PI:l<=0&&(l=.001);var u=Math.sin(l)*a*Math.sin(s),c=Math.cos(l)*a,d=Math.sin(l)*a*Math.cos(s);this.camera(u+this.centerX,c+this.centerY,d+this.centerZ,this.centerX,this.centerY,this.centerZ,0,1,0)},y.default.Camera.prototype._isActive=function(){return this===this._renderer._curCamera},y.default.prototype.setCamera=function(e){this._renderer._curCamera=e,this._renderer.uPMatrix.set(e.projMatrix.mat4[0],e.projMatrix.mat4[1],e.projMatrix.mat4[2],e.projMatrix.mat4[3],e.projMatrix.mat4[4],e.projMatrix.mat4[5],e.projMatrix.mat4[6],e.projMatrix.mat4[7],e.projMatrix.mat4[8],e.projMatrix.mat4[9],e.projMatrix.mat4[10],e.projMatrix.mat4[11],e.projMatrix.mat4[12],e.projMatrix.mat4[13],e.projMatrix.mat4[14],e.projMatrix.mat4[15])};var o=y.default.Camera;r.default=o},{"../core/main":260}],309:[function(e,t,r){"use strict";e("core-js/modules/es.string.sub"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,c=(n=e("../core/main"))&&n.__esModule?n:{default:n};c.default.Geometry=function(e,t,r){return this.vertices=[],this.lineVertices=[],this.lineNormals=[],this.vertexNormals=[],this.faces=[],this.uvs=[],this.edges=[],this.vertexColors=[],this.detailX=void 0!==e?e:1,this.detailY=void 0!==t?t:1,this.dirtyFlags={},r instanceof Function&&r.call(this),this},c.default.Geometry.prototype.reset=function(){this.lineVertices.length=0,this.lineNormals.length=0,this.vertices.length=0,this.edges.length=0,this.vertexColors.length=0,this.vertexNormals.length=0,this.uvs.length=0,this.dirtyFlags={}},c.default.Geometry.prototype.computeFaces=function(){this.faces.length=0;for(var e,t,r,n,o=this.detailX+1,i=0;i<this.detailY;i++)for(var a=0;a<this.detailX;a++)t=(e=i*o+a)+1,r=(i+1)*o+a+1,n=(i+1)*o+a,this.faces.push([e,t,n]),this.faces.push([n,t,r]);return this},c.default.Geometry.prototype._getFaceNormal=function(e){var t=this.faces[e],r=this.vertices[t[0]],n=this.vertices[t[1]],o=this.vertices[t[2]],i=c.default.Vector.sub(n,r),a=c.default.Vector.sub(o,r),s=c.default.Vector.cross(i,a),l=c.default.Vector.mag(s),u=l/(c.default.Vector.mag(i)*c.default.Vector.mag(a));return 0===u||isNaN(u)?(console.warn("p5.Geometry.prototype._getFaceNormal:","face has colinear sides or a repeated vertex"),s):(1<u&&(u=1),s.mult(Math.asin(u)/l))},c.default.Geometry.prototype.computeNormals=function(){var e,t=this.vertexNormals,r=this.vertices,n=this.faces;for(e=t.length=0;e<r.length;++e)t.push(new c.default.Vector);for(var o=0;o<n.length;++o)for(var i=n[o],a=this._getFaceNormal(o),s=0;s<3;++s){t[i[s]].add(a)}for(e=0;e<r.length;++e)t[e].normalize();return this},c.default.Geometry.prototype.averageNormals=function(){for(var e=0;e<=this.detailY;e++){var t=this.detailX+1,r=c.default.Vector.add(this.vertexNormals[e*t],this.vertexNormals[e*t+this.detailX]);r=c.default.Vector.div(r,2),this.vertexNormals[e*t]=r,this.vertexNormals[e*t+this.detailX]=r}return this},c.default.Geometry.prototype.averagePoleNormals=function(){for(var e=new c.default.Vector(0,0,0),t=0;t<this.detailX;t++)e.add(this.vertexNormals[t]);e=c.default.Vector.div(e,this.detailX);for(var r=0;r<this.detailX;r++)this.vertexNormals[r]=e;e=new c.default.Vector(0,0,0);for(var n=this.vertices.length-1;n>this.vertices.length-1-this.detailX;n--)e.add(this.vertexNormals[n]);e=c.default.Vector.div(e,this.detailX);for(var o=this.vertices.length-1;o>this.vertices.length-1-this.detailX;o--)this.vertexNormals[o]=e;return this},c.default.Geometry.prototype._makeTriangleEdges=function(){if(this.edges.length=0,Array.isArray(this.strokeIndices))for(var e=0,t=this.strokeIndices.length;e<t;e++)this.edges.push(this.strokeIndices[e]);else for(var r=0;r<this.faces.length;r++)this.edges.push([this.faces[r][0],this.faces[r][1]]),this.edges.push([this.faces[r][1],this.faces[r][2]]),this.edges.push([this.faces[r][2],this.faces[r][0]]);return this},c.default.Geometry.prototype._edgesToVertices=function(){this.lineVertices.length=0;for(var e=this.lineNormals.length=0;e<this.edges.length;e++){var t=this.vertices[this.edges[e][0]],r=this.vertices[this.edges[e][1]],n=r.copy().sub(t).normalize(),o=t.array(),i=t.array(),a=r.array(),s=r.array(),l=n.array(),u=n.array();l.push(1),u.push(-1),this.lineNormals.push(l,u,l,l,u,u),this.lineVertices.push(o,i,a,a,i,s)}return this},c.default.Geometry.prototype.normalize=function(){if(0<this.vertices.length){for(var e=this.vertices[0].copy(),t=this.vertices[0].copy(),r=0;r<this.vertices.length;r++)e.x=Math.max(e.x,this.vertices[r].x),t.x=Math.min(t.x,this.vertices[r].x),e.y=Math.max(e.y,this.vertices[r].y),t.y=Math.min(t.y,this.vertices[r].y),e.z=Math.max(e.z,this.vertices[r].z),t.z=Math.min(t.z,this.vertices[r].z);for(var n=c.default.Vector.lerp(e,t,.5),o=c.default.Vector.sub(e,t),i=200/Math.max(Math.max(o.x,o.y),o.z),a=0;a<this.vertices.length;a++)this.vertices[a].sub(n),this.vertices[a].mult(i)}return this};var o=c.default.Geometry;r.default=o},{"../core/main":260,"core-js/modules/es.string.sub":189}],310:[function(e,t,r){"use strict";e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.typed-array.float32-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,L=(n=e("../core/main"))&&n.__esModule?n:{default:n};var o=Array,P=function(e){return e instanceof Array};"undefined"!=typeof Float32Array&&(o=Float32Array,P=function(e){return e instanceof Array||e instanceof Float32Array}),L.default.Matrix=function(){for(var e=new Array(arguments.length),t=0;t<e.length;++t)e[t]=arguments[t];return e.length&&e[e.length-1]instanceof L.default&&(this.p5=e[e.length-1]),"mat3"===e[0]?this.mat3=Array.isArray(e[1])?e[1]:new o([1,0,0,0,1,0,0,0,1]):this.mat4=Array.isArray(e[0])?e[0]:new o([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this},L.default.Matrix.prototype.set=function(e){return e instanceof L.default.Matrix?this.mat4=e.mat4:P(e)?this.mat4=e:16===arguments.length&&(this.mat4[0]=e,this.mat4[1]=arguments[1],this.mat4[2]=arguments[2],this.mat4[3]=arguments[3],this.mat4[4]=arguments[4],this.mat4[5]=arguments[5],this.mat4[6]=arguments[6],this.mat4[7]=arguments[7],this.mat4[8]=arguments[8],this.mat4[9]=arguments[9],this.mat4[10]=arguments[10],this.mat4[11]=arguments[11],this.mat4[12]=arguments[12],this.mat4[13]=arguments[13],this.mat4[14]=arguments[14],this.mat4[15]=arguments[15]),this},L.default.Matrix.prototype.get=function(){return new L.default.Matrix(this.mat4,this.p5)},L.default.Matrix.prototype.copy=function(){var e=new L.default.Matrix(this.p5);return e.mat4[0]=this.mat4[0],e.mat4[1]=this.mat4[1],e.mat4[2]=this.mat4[2],e.mat4[3]=this.mat4[3],e.mat4[4]=this.mat4[4],e.mat4[5]=this.mat4[5],e.mat4[6]=this.mat4[6],e.mat4[7]=this.mat4[7],e.mat4[8]=this.mat4[8],e.mat4[9]=this.mat4[9],e.mat4[10]=this.mat4[10],e.mat4[11]=this.mat4[11],e.mat4[12]=this.mat4[12],e.mat4[13]=this.mat4[13],e.mat4[14]=this.mat4[14],e.mat4[15]=this.mat4[15],e},L.default.Matrix.identity=function(e){return new L.default.Matrix(e)},L.default.Matrix.prototype.transpose=function(e){var t,r,n,o,i,a;return e instanceof L.default.Matrix?(t=e.mat4[1],r=e.mat4[2],n=e.mat4[3],o=e.mat4[6],i=e.mat4[7],a=e.mat4[11],this.mat4[0]=e.mat4[0],this.mat4[1]=e.mat4[4],this.mat4[2]=e.mat4[8],this.mat4[3]=e.mat4[12],this.mat4[4]=t,this.mat4[5]=e.mat4[5],this.mat4[6]=e.mat4[9],this.mat4[7]=e.mat4[13],this.mat4[8]=r,this.mat4[9]=o,this.mat4[10]=e.mat4[10],this.mat4[11]=e.mat4[14],this.mat4[12]=n,this.mat4[13]=i,this.mat4[14]=a,this.mat4[15]=e.mat4[15]):P(e)&&(t=e[1],r=e[2],n=e[3],o=e[6],i=e[7],a=e[11],this.mat4[0]=e[0],this.mat4[1]=e[4],this.mat4[2]=e[8],this.mat4[3]=e[12],this.mat4[4]=t,this.mat4[5]=e[5],this.mat4[6]=e[9],this.mat4[7]=e[13],this.mat4[8]=r,this.mat4[9]=o,this.mat4[10]=e[10],this.mat4[11]=e[14],this.mat4[12]=n,this.mat4[13]=i,this.mat4[14]=a,this.mat4[15]=e[15]),this},L.default.Matrix.prototype.invert=function(e){var t,r,n,o,i,a,s,l,u,c,d,f,h,p,y,m;e instanceof L.default.Matrix?(t=e.mat4[0],r=e.mat4[1],n=e.mat4[2],o=e.mat4[3],i=e.mat4[4],a=e.mat4[5],s=e.mat4[6],l=e.mat4[7],u=e.mat4[8],c=e.mat4[9],d=e.mat4[10],f=e.mat4[11],h=e.mat4[12],p=e.mat4[13],y=e.mat4[14],m=e.mat4[15]):P(e)&&(t=e[0],r=e[1],n=e[2],o=e[3],i=e[4],a=e[5],s=e[6],l=e[7],u=e[8],c=e[9],d=e[10],f=e[11],h=e[12],p=e[13],y=e[14],m=e[15]);var g=t*a-r*i,v=t*s-n*i,b=t*l-o*i,_=r*s-n*a,x=r*l-o*a,w=n*l-o*s,S=u*p-c*h,j=u*y-d*h,M=u*m-f*h,E=c*y-d*p,T=c*m-f*p,O=d*m-f*y,C=g*O-v*T+b*E+_*M-x*j+w*S;return C?(C=1/C,this.mat4[0]=(a*O-s*T+l*E)*C,this.mat4[1]=(n*T-r*O-o*E)*C,this.mat4[2]=(p*w-y*x+m*_)*C,this.mat4[3]=(d*x-c*w-f*_)*C,this.mat4[4]=(s*M-i*O-l*j)*C,this.mat4[5]=(t*O-n*M+o*j)*C,this.mat4[6]=(y*b-h*w-m*v)*C,this.mat4[7]=(u*w-d*b+f*v)*C,this.mat4[8]=(i*T-a*M+l*S)*C,this.mat4[9]=(r*M-t*T-o*S)*C,this.mat4[10]=(h*x-p*b+m*g)*C,this.mat4[11]=(c*b-u*x-f*g)*C,this.mat4[12]=(a*j-i*E-s*S)*C,this.mat4[13]=(t*E-r*j+n*S)*C,this.mat4[14]=(p*v-h*_-y*g)*C,this.mat4[15]=(u*_-c*v+d*g)*C,this):null},L.default.Matrix.prototype.invert3x3=function(){var e=this.mat3[0],t=this.mat3[1],r=this.mat3[2],n=this.mat3[3],o=this.mat3[4],i=this.mat3[5],a=this.mat3[6],s=this.mat3[7],l=this.mat3[8],u=l*o-i*s,c=-l*n+i*a,d=s*n-o*a,f=e*u+t*c+r*d;return f?(f=1/f,this.mat3[0]=u*f,this.mat3[1]=(-l*t+r*s)*f,this.mat3[2]=(i*t-r*o)*f,this.mat3[3]=c*f,this.mat3[4]=(l*e-r*a)*f,this.mat3[5]=(-i*e+r*n)*f,this.mat3[6]=d*f,this.mat3[7]=(-s*e+t*a)*f,this.mat3[8]=(o*e-t*n)*f,this):null},L.default.Matrix.prototype.transpose3x3=function(e){var t=e[1],r=e[2],n=e[5];return this.mat3[1]=e[3],this.mat3[2]=e[6],this.mat3[3]=t,this.mat3[5]=e[7],this.mat3[6]=r,this.mat3[7]=n,this},L.default.Matrix.prototype.inverseTranspose=function(e){void 0===this.mat3?console.error("sorry, this function only works with mat3"):(this.mat3[0]=e.mat4[0],this.mat3[1]=e.mat4[1],this.mat3[2]=e.mat4[2],this.mat3[3]=e.mat4[4],this.mat3[4]=e.mat4[5],this.mat3[5]=e.mat4[6],this.mat3[6]=e.mat4[8],this.mat3[7]=e.mat4[9],this.mat3[8]=e.mat4[10]);var t=this.invert3x3();if(t)t.transpose3x3(this.mat3);else for(var r=0;r<9;r++)this.mat3[r]=0;return this},L.default.Matrix.prototype.determinant=function(){var e=this.mat4[0]*this.mat4[5]-this.mat4[1]*this.mat4[4],t=this.mat4[0]*this.mat4[6]-this.mat4[2]*this.mat4[4],r=this.mat4[0]*this.mat4[7]-this.mat4[3]*this.mat4[4],n=this.mat4[1]*this.mat4[6]-this.mat4[2]*this.mat4[5],o=this.mat4[1]*this.mat4[7]-this.mat4[3]*this.mat4[5],i=this.mat4[2]*this.mat4[7]-this.mat4[3]*this.mat4[6],a=this.mat4[8]*this.mat4[13]-this.mat4[9]*this.mat4[12],s=this.mat4[8]*this.mat4[14]-this.mat4[10]*this.mat4[12],l=this.mat4[8]*this.mat4[15]-this.mat4[11]*this.mat4[12],u=this.mat4[9]*this.mat4[14]-this.mat4[10]*this.mat4[13],c=this.mat4[9]*this.mat4[15]-this.mat4[11]*this.mat4[13];return e*(this.mat4[10]*this.mat4[15]-this.mat4[11]*this.mat4[14])-t*c+r*u+n*l-o*s+i*a},L.default.Matrix.prototype.mult=function(e){var t;if(e===this||e===this.mat4)t=this.copy().mat4;else if(e instanceof L.default.Matrix)t=e.mat4;else if(P(e))t=e;else{if(16!==arguments.length)return;t=arguments}var r=this.mat4[0],n=this.mat4[1],o=this.mat4[2],i=this.mat4[3];return this.mat4[0]=r*t[0]+n*t[4]+o*t[8]+i*t[12],this.mat4[1]=r*t[1]+n*t[5]+o*t[9]+i*t[13],this.mat4[2]=r*t[2]+n*t[6]+o*t[10]+i*t[14],this.mat4[3]=r*t[3]+n*t[7]+o*t[11]+i*t[15],r=this.mat4[4],n=this.mat4[5],o=this.mat4[6],i=this.mat4[7],this.mat4[4]=r*t[0]+n*t[4]+o*t[8]+i*t[12],this.mat4[5]=r*t[1]+n*t[5]+o*t[9]+i*t[13],this.mat4[6]=r*t[2]+n*t[6]+o*t[10]+i*t[14],this.mat4[7]=r*t[3]+n*t[7]+o*t[11]+i*t[15],r=this.mat4[8],n=this.mat4[9],o=this.mat4[10],i=this.mat4[11],this.mat4[8]=r*t[0]+n*t[4]+o*t[8]+i*t[12],this.mat4[9]=r*t[1]+n*t[5]+o*t[9]+i*t[13],this.mat4[10]=r*t[2]+n*t[6]+o*t[10]+i*t[14],this.mat4[11]=r*t[3]+n*t[7]+o*t[11]+i*t[15],r=this.mat4[12],n=this.mat4[13],o=this.mat4[14],i=this.mat4[15],this.mat4[12]=r*t[0]+n*t[4]+o*t[8]+i*t[12],this.mat4[13]=r*t[1]+n*t[5]+o*t[9]+i*t[13],this.mat4[14]=r*t[2]+n*t[6]+o*t[10]+i*t[14],this.mat4[15]=r*t[3]+n*t[7]+o*t[11]+i*t[15],this},L.default.Matrix.prototype.apply=function(e){var t;if(e===this||e===this.mat4)t=this.copy().mat4;else if(e instanceof L.default.Matrix)t=e.mat4;else if(P(e))t=e;else{if(16!==arguments.length)return;t=arguments}var r=this.mat4,n=r[0],o=r[4],i=r[8],a=r[12];r[0]=t[0]*n+t[1]*o+t[2]*i+t[3]*a,r[4]=t[4]*n+t[5]*o+t[6]*i+t[7]*a,r[8]=t[8]*n+t[9]*o+t[10]*i+t[11]*a,r[12]=t[12]*n+t[13]*o+t[14]*i+t[15]*a;var s=r[1],l=r[5],u=r[9],c=r[13];r[1]=t[0]*s+t[1]*l+t[2]*u+t[3]*c,r[5]=t[4]*s+t[5]*l+t[6]*u+t[7]*c,r[9]=t[8]*s+t[9]*l+t[10]*u+t[11]*c,r[13]=t[12]*s+t[13]*l+t[14]*u+t[15]*c;var d=r[2],f=r[6],h=r[10],p=r[14];r[2]=t[0]*d+t[1]*f+t[2]*h+t[3]*p,r[6]=t[4]*d+t[5]*f+t[6]*h+t[7]*p,r[10]=t[8]*d+t[9]*f+t[10]*h+t[11]*p,r[14]=t[12]*d+t[13]*f+t[14]*h+t[15]*p;var y=r[3],m=r[7],g=r[11],v=r[15];return r[3]=t[0]*y+t[1]*m+t[2]*g+t[3]*v,r[7]=t[4]*y+t[5]*m+t[6]*g+t[7]*v,r[11]=t[8]*y+t[9]*m+t[10]*g+t[11]*v,r[15]=t[12]*y+t[13]*m+t[14]*g+t[15]*v,this},L.default.Matrix.prototype.scale=function(e,t,r){return e instanceof L.default.Vector?(t=e.y,r=e.z,e=e.x):e instanceof Array&&(t=e[1],r=e[2],e=e[0]),this.mat4[0]*=e,this.mat4[1]*=e,this.mat4[2]*=e,this.mat4[3]*=e,this.mat4[4]*=t,this.mat4[5]*=t,this.mat4[6]*=t,this.mat4[7]*=t,this.mat4[8]*=r,this.mat4[9]*=r,this.mat4[10]*=r,this.mat4[11]*=r,this},L.default.Matrix.prototype.rotate=function(e,t,r,n){t instanceof L.default.Vector?(r=t.y,n=t.z,t=t.x):t instanceof Array&&(r=t[1],n=t[2],t=t[0]);var o=Math.sqrt(t*t+r*r+n*n);t*=1/o,r*=1/o,n*=1/o;var i=this.mat4[0],a=this.mat4[1],s=this.mat4[2],l=this.mat4[3],u=this.mat4[4],c=this.mat4[5],d=this.mat4[6],f=this.mat4[7],h=this.mat4[8],p=this.mat4[9],y=this.mat4[10],m=this.mat4[11],g=Math.sin(e),v=Math.cos(e),b=1-v,_=t*t*b+v,x=r*t*b+n*g,w=n*t*b-r*g,S=t*r*b-n*g,j=r*r*b+v,M=n*r*b+t*g,E=t*n*b+r*g,T=r*n*b-t*g,O=n*n*b+v;return this.mat4[0]=i*_+u*x+h*w,this.mat4[1]=a*_+c*x+p*w,this.mat4[2]=s*_+d*x+y*w,this.mat4[3]=l*_+f*x+m*w,this.mat4[4]=i*S+u*j+h*M,this.mat4[5]=a*S+c*j+p*M,this.mat4[6]=s*S+d*j+y*M,this.mat4[7]=l*S+f*j+m*M,this.mat4[8]=i*E+u*T+h*O,this.mat4[9]=a*E+c*T+p*O,this.mat4[10]=s*E+d*T+y*O,this.mat4[11]=l*E+f*T+m*O,this},L.default.Matrix.prototype.translate=function(e){var t=e[0],r=e[1],n=e[2]||0;this.mat4[12]+=this.mat4[0]*t+this.mat4[4]*r+this.mat4[8]*n,this.mat4[13]+=this.mat4[1]*t+this.mat4[5]*r+this.mat4[9]*n,this.mat4[14]+=this.mat4[2]*t+this.mat4[6]*r+this.mat4[10]*n,this.mat4[15]+=this.mat4[3]*t+this.mat4[7]*r+this.mat4[11]*n},L.default.Matrix.prototype.rotateX=function(e){this.rotate(e,1,0,0)},L.default.Matrix.prototype.rotateY=function(e){this.rotate(e,0,1,0)},L.default.Matrix.prototype.rotateZ=function(e){this.rotate(e,0,0,1)},L.default.Matrix.prototype.perspective=function(e,t,r,n){var o=1/Math.tan(e/2),i=1/(r-n);return this.mat4[0]=o/t,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=o,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=(n+r)*i,this.mat4[11]=-1,this.mat4[12]=0,this.mat4[13]=0,this.mat4[14]=2*n*r*i,this.mat4[15]=0,this},L.default.Matrix.prototype.ortho=function(e,t,r,n,o,i){var a=1/(e-t),s=1/(r-n),l=1/(o-i);return this.mat4[0]=-2*a,this.mat4[1]=0,this.mat4[2]=0,this.mat4[3]=0,this.mat4[4]=0,this.mat4[5]=-2*s,this.mat4[6]=0,this.mat4[7]=0,this.mat4[8]=0,this.mat4[9]=0,this.mat4[10]=2*l,this.mat4[11]=0,this.mat4[12]=(e+t)*a,this.mat4[13]=(n+r)*s,this.mat4[14]=(i+o)*l,this.mat4[15]=1,this};var i=L.default.Matrix;r.default=i},{"../core/main":260,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.float32-array":200,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220}],311:[function(e,t,r){"use strict";e("core-js/modules/es.array.map"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.RenderBuffer=function(e,t,r,n,o,i){this.size=e,this.src=t,this.dst=r,this.attr=n,this._renderer=o,this.map=i},o.default.RenderBuffer.prototype._prepareBuffer=function(e,t){var r,n=t.attributes,o=this._renderer.GL;r=e.model?e.model:e;var i=n[this.attr];if(i){var a=e[this.dst],s=r[this.src];if(0<s.length){var l=!a;if(l&&(e[this.dst]=a=o.createBuffer()),o.bindBuffer(o.ARRAY_BUFFER,a),l||!1!==r.dirtyFlags[this.src]){var u=this.map,c=u?u(s):s;this._renderer._bindBuffer(a,o.ARRAY_BUFFER,c),r.dirtyFlags[this.src]=!1}t.enableAttrib(i,this.size)}}};var i=o.default.RenderBuffer;r.default=i},{"../core/main":260,"core-js/modules/es.array.map":159}],312:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.fill"),e("core-js/modules/es.array.for-each"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.typed-array.float32-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.for-each"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,s=(n=e("../core/main"))&&n.__esModule?n:{default:n},l=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}e("./p5.RenderBuffer"),s.default.RendererGL.prototype.beginShape=function(e){return this.immediateMode.shapeMode=void 0!==e?e:l.TRIANGLE_FAN,this.immediateMode.geometry.reset(),this},s.default.RendererGL.prototype.vertex=function(e,t){var r,n,o;r=n=o=0,3===arguments.length?r=arguments[2]:4===arguments.length?(n=arguments[2],o=arguments[3]):5===arguments.length&&(r=arguments[2],n=arguments[3],o=arguments[4]);var i=new s.default.Vector(e,t,r);this.immediateMode.geometry.vertices.push(i);var a=this.curFillColor||[.5,.5,.5,1];return this.immediateMode.geometry.vertexColors.push(a[0],a[1],a[2],a[3]),this.textureMode===l.IMAGE&&(null!==this._tex?0<this._tex.width&&0<this._tex.height&&(n/=this._tex.width,o/=this._tex.height):null===this._tex&&4<=arguments.length&&console.warn("You must first call texture() before using vertex() with image based u and v coordinates")),this.immediateMode.geometry.uvs.push(n,o),this.immediateMode._bezierVertex[0]=e,this.immediateMode._bezierVertex[1]=t,this.immediateMode._bezierVertex[2]=r,this.immediateMode._quadraticVertex[0]=e,this.immediateMode._quadraticVertex[1]=t,this.immediateMode._quadraticVertex[2]=r,this},s.default.RendererGL.prototype.endShape=function(e,t,r,n,o,i){return this.immediateMode.shapeMode===l.POINTS?this._drawPoints(this.immediateMode.geometry.vertices,this.immediateMode.buffers.point):(this._processVertices.apply(this,arguments),this._doFill&&1<this.immediateMode.geometry.vertices.length&&this._drawImmediateFill(),this._doStroke&&1<this.immediateMode.geometry.lineVertices.length&&this._drawImmediateStroke(),this.isBezier=!1,this.isQuadratic=!1,this.isCurve=!1,this.immediateMode._bezierVertex.length=0,this.immediateMode._quadraticVertex.length=0,this.immediateMode._curveVertex.length=0),this},s.default.RendererGL.prototype._processVertices=function(e){if(0!==this.immediateMode.geometry.vertices.length){var t=this._doStroke&&this.drawMode!==l.TEXTURE,r=e===l.CLOSE;t&&(this.immediateMode.geometry.edges=this._calculateEdges(this.immediateMode.shapeMode,this.immediateMode.geometry.vertices,r),this.immediateMode.geometry._edgesToVertices());var n=this.immediateMode.shapeMode===l.TESS;(this.isBezier||this.isQuadratic||this.isCurve||n)&&this.immediateMode.shapeMode!==l.LINES&&this._tesselateShape()}},s.default.RendererGL.prototype._calculateEdges=function(e,t,r){var n=[],o=0;switch(e){case l.TRIANGLE_STRIP:for(o=0;o<t.length-2;o++)n.push([o,o+1]),n.push([o,o+2]);n.push([o,o+1]);break;case l.TRIANGLES:for(o=0;o<t.length-2;o+=3)n.push([o,o+1]),n.push([o+1,o+2]),n.push([o+2,o]);break;case l.LINES:for(o=0;o<t.length-1;o+=2)n.push([o,o+1]);break;default:for(o=0;o<t.length-1;o++)n.push([o,o+1])}return r&&n.push([t.length-1,0]),n},s.default.RendererGL.prototype._tesselateShape=function(){this.immediateMode.shapeMode=l.TRIANGLES;var e=[new Float32Array(this._vToNArray(this.immediateMode.geometry.vertices))],t=this._triangulate(e);this.immediateMode.geometry.vertices=[];for(var r=0,n=t.length;r<n;r+=3)this.vertex(t[r],t[r+1],t[r+2])},s.default.RendererGL.prototype._drawImmediateFill=function(){var e=this.GL,t=this._getImmediateFillShader();this._calculateNormals(this.immediateMode.geometry),this._setFillUniforms(t);var r=!0,n=!1,o=void 0;try{for(var i,a=this.immediateMode.buffers.fill[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){i.value._prepareBuffer(this.immediateMode.geometry,t)}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}this.immediateMode.shapeMode!==l.LINE_STRIP&&this.immediateMode.shapeMode!==l.LINES||(this.immediateMode.shapeMode=l.TRIANGLE_FAN),this._applyColorBlend(this.curFillColor),e.drawArrays(this.immediateMode.shapeMode,0,this.immediateMode.geometry.vertices.length),t.unbindShader()},s.default.RendererGL.prototype._drawImmediateStroke=function(){var e=this.GL,t=this._getImmediateStrokeShader();this._setStrokeUniforms(t);var r=!0,n=!1,o=void 0;try{for(var i,a=this.immediateMode.buffers.stroke[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){i.value._prepareBuffer(this.immediateMode.geometry,t)}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}this._applyColorBlend(this.curStrokeColor),e.drawArrays(e.TRIANGLES,0,this.immediateMode.geometry.lineVertices.length),t.unbindShader()},s.default.RendererGL.prototype._calculateNormals=function(e){e.vertices.forEach(function(){e.vertexNormals.push(new s.default.Vector(0,0,1))})};var o=s.default.RendererGL;r.default=o},{"../core/constants":250,"../core/main":260,"./p5.RenderBuffer":311,"core-js/modules/es.array.fill":150,"core-js/modules/es.array.for-each":152,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.float32-array":200,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/web.dom-collections.for-each":225,"core-js/modules/web.dom-collections.iterator":226}],313:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.fill"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.keys"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.typed-array.float32-array"),e("core-js/modules/es.typed-array.uint16-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,a=(n=e("../core/main"))&&n.__esModule?n:{default:n};e("./p5.RendererGL"),e("./p5.RenderBuffer");var o=0;a.default.RendererGL.prototype._initBufferDefaults=function(e){if(this._freeBuffers(e),1e3<++o){var t=Object.keys(this.retainedMode.geometry)[0];delete this.retainedMode.geometry[t],o--}return this.retainedMode.geometry[e]={}},a.default.RendererGL.prototype._freeBuffers=function(e){var s=this.retainedMode.geometry[e];if(s){delete this.retainedMode.geometry[e],o--;var l=this.GL;s.indexBuffer&&l.deleteBuffer(s.indexBuffer),t(this.retainedMode.buffers.stroke),t(this.retainedMode.buffers.fill)}function t(e){var t=!0,r=!1,n=void 0;try{for(var o,i=e[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;s[a.dst]&&(l.deleteBuffer(s[a.dst]),s[a.dst]=null)}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}}},a.default.RendererGL.prototype.createBuffers=function(e,t){var r=this.GL,n=this._initBufferDefaults(e);n.model=t;var o=n.indexBuffer;if(t.faces.length){o=o||(n.indexBuffer=r.createBuffer());var i=a.default.RendererGL.prototype._flatten(t.faces);this._bindBuffer(o,r.ELEMENT_ARRAY_BUFFER,i,Uint16Array),n.vertexCount=3*t.faces.length}else o&&(r.deleteBuffer(o),n.indexBuffer=null),n.vertexCount=t.vertices?t.vertices.length:0;return n.lineVertexCount=t.lineVertices?t.lineVertices.length:0,n},a.default.RendererGL.prototype.drawBuffers=function(e){var t=this.GL,r=this.retainedMode.geometry[e];if(this._doStroke&&0<r.lineVertexCount){var n=this._getRetainedStrokeShader();this._setStrokeUniforms(n);var o=!0,i=!1,a=void 0;try{for(var s,l=this.retainedMode.buffers.stroke[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){s.value._prepareBuffer(r,n)}}catch(e){i=!0,a=e}finally{try{o||null==l.return||l.return()}finally{if(i)throw a}}this._applyColorBlend(this.curStrokeColor),this._drawArrays(t.TRIANGLES,e),n.unbindShader()}if(this._doFill){var u=this._getRetainedFillShader();this._setFillUniforms(u);var c=!0,d=!1,f=void 0;try{for(var h,p=this.retainedMode.buffers.fill[Symbol.iterator]();!(c=(h=p.next()).done);c=!0){h.value._prepareBuffer(r,u)}}catch(e){d=!0,f=e}finally{try{c||null==p.return||p.return()}finally{if(d)throw f}}r.indexBuffer&&this._bindBuffer(r.indexBuffer,t.ELEMENT_ARRAY_BUFFER),this._applyColorBlend(this.curFillColor),this._drawElements(t.TRIANGLES,e),u.unbindShader()}return this},a.default.RendererGL.prototype.drawBuffersScaled=function(e,t,r,n){var o=this.uMVMatrix.copy();try{this.uMVMatrix.scale(t,r,n),this.drawBuffers(e)}finally{this.uMVMatrix=o}},a.default.RendererGL.prototype._drawArrays=function(e,t){return this.GL.drawArrays(e,0,this.retainedMode.geometry[t].lineVertexCount),this},a.default.RendererGL.prototype._drawElements=function(e,t){var r=this.retainedMode.geometry[t],n=this.GL;r.indexBuffer?n.drawElements(n.TRIANGLES,r.vertexCount,n.UNSIGNED_SHORT,0):n.drawArrays(e||n.TRIANGLES,0,r.vertexCount)},a.default.RendererGL.prototype._drawPoints=function(e,t){var r=this.GL,n=this._getImmediatePointShader();this._setPointUniforms(n),this._bindBuffer(t,r.ARRAY_BUFFER,this._vToNArray(e),Float32Array,r.STATIC_DRAW),n.enableAttrib(n.attributes.aPosition,3),r.drawArrays(r.Points,0,e.length),n.unbindShader()};var i=a.default.RendererGL;r.default=i},{"../core/main":260,"./p5.RenderBuffer":311,"./p5.RendererGL":314,"core-js/modules/es.array.fill":150,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.keys":173,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.float32-array":200,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint16-array":221,"core-js/modules/web.dom-collections.iterator":226}],314:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.concat"),e("core-js/modules/es.array.fill"),e("core-js/modules/es.array.filter"),e("core-js/modules/es.array.from"),e("core-js/modules/es.array.includes"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.object.assign"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.to-string"),e("core-js/modules/es.string.includes"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.typed-array.float32-array"),e("core-js/modules/es.typed-array.float64-array"),e("core-js/modules/es.typed-array.int16-array"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.uint16-array"),e("core-js/modules/es.typed-array.uint32-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var u=o(e("../core/main")),i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants")),n=o(e("libtess"));e("./p5.Shader"),e("./p5.Camera"),e("../core/p5.Renderer"),e("./p5.Matrix");e("path");function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function o(e){return e&&e.__esModule?e:{default:e}}function l(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var c="precision highp float;\nprecision highp int;\n\nuniform mat4 uViewMatrix;\n\nuniform bool uUseLighting;\n\nuniform int uAmbientLightCount;\nuniform vec3 uAmbientColor[5];\n\nuniform int uDirectionalLightCount;\nuniform vec3 uLightingDirection[5];\nuniform vec3 uDirectionalDiffuseColors[5];\nuniform vec3 uDirectionalSpecularColors[5];\n\nuniform int uPointLightCount;\nuniform vec3 uPointLightLocation[5];\nuniform vec3 uPointLightDiffuseColors[5];\t\nuniform vec3 uPointLightSpecularColors[5];\n\nuniform int uSpotLightCount;\nuniform float uSpotLightAngle[5];\nuniform float uSpotLightConc[5];\nuniform vec3 uSpotLightDiffuseColors[5];\nuniform vec3 uSpotLightSpecularColors[5];\nuniform vec3 uSpotLightLocation[5];\nuniform vec3 uSpotLightDirection[5];\n\nuniform bool uSpecular;\nuniform float uShininess;\n\nuniform float uConstantAttenuation;\nuniform float uLinearAttenuation;\nuniform float uQuadraticAttenuation;\n\nconst float specularFactor = 2.0;\nconst float diffuseFactor = 0.73;\n\nstruct LightResult {\n  float specular;\n  float diffuse;\n};\n\nfloat _phongSpecular(\n  vec3 lightDirection,\n  vec3 viewDirection,\n  vec3 surfaceNormal,\n  float shininess) {\n\n  vec3 R = reflect(lightDirection, surfaceNormal);\n  return pow(max(0.0, dot(R, viewDirection)), shininess);\n}\n\nfloat _lambertDiffuse(vec3 lightDirection, vec3 surfaceNormal) {\n  return max(0.0, dot(-lightDirection, surfaceNormal));\n}\n\nLightResult _light(vec3 viewDirection, vec3 normal, vec3 lightVector) {\n\n  vec3 lightDir = normalize(lightVector);\n\n  //compute our diffuse & specular terms\n  LightResult lr;\n  if (uSpecular)\n    lr.specular = _phongSpecular(lightDir, viewDirection, normal, uShininess);\n  lr.diffuse = _lambertDiffuse(lightDir, normal);\n  return lr;\n}\n\nvoid totalLight(\n  vec3 modelPosition,\n  vec3 normal,\n  out vec3 totalDiffuse,\n  out vec3 totalSpecular\n) {\n\n  totalSpecular = vec3(0.0);\n\n  if (!uUseLighting) {\n    totalDiffuse = vec3(1.0);\n    return;\n  }\n\n  totalDiffuse = vec3(0.0);\n\n  vec3 viewDirection = normalize(-modelPosition);\n\n  for (int j = 0; j < 5; j++) {\n    if (j < uDirectionalLightCount) {\n      vec3 lightVector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;\n      vec3 lightColor = uDirectionalDiffuseColors[j];\n      vec3 specularColor = uDirectionalSpecularColors[j];\n      LightResult result = _light(viewDirection, normal, lightVector);\n      totalDiffuse += result.diffuse * lightColor;\n      totalSpecular += result.specular * lightColor * specularColor;\n    }\n\n    if (j < uPointLightCount) {\n      vec3 lightPosition = (uViewMatrix * vec4(uPointLightLocation[j], 1.0)).xyz;\n      vec3 lightVector = modelPosition - lightPosition;\n    \n      //calculate attenuation\n      float lightDistance = length(lightVector);\n      float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);\n      vec3 lightColor = lightFalloff * uPointLightDiffuseColors[j];\n      vec3 specularColor = lightFalloff * uPointLightSpecularColors[j];\n\n      LightResult result = _light(viewDirection, normal, lightVector);\n      totalDiffuse += result.diffuse * lightColor;\n      totalSpecular += result.specular * lightColor * specularColor;\n    }\n\n    if(j < uSpotLightCount) {\n      vec3 lightPosition = (uViewMatrix * vec4(uSpotLightLocation[j], 1.0)).xyz;\n      vec3 lightVector = modelPosition - lightPosition;\n    \n      float lightDistance = length(lightVector);\n      float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);\n\n      vec3 lightDirection = (uViewMatrix * vec4(uSpotLightDirection[j], 0.0)).xyz;\n      float spotDot = dot(normalize(lightVector), normalize(lightDirection));\n      float spotFalloff;\n      if(spotDot < uSpotLightAngle[j]) {\n        spotFalloff = 0.0;\n      }\n      else {\n        spotFalloff = pow(spotDot, uSpotLightConc[j]);\n      }\n      lightFalloff *= spotFalloff;\n\n      vec3 lightColor = uSpotLightDiffuseColors[j];\n      vec3 specularColor = uSpotLightSpecularColors[j];\n     \n      LightResult result = _light(viewDirection, normal, lightVector);\n      \n      totalDiffuse += result.diffuse * lightColor * lightFalloff;\n      totalSpecular += result.specular * lightColor * specularColor * lightFalloff;\n    }\n  }\n\n  totalDiffuse *= diffuseFactor;\n  totalSpecular *= specularFactor;\n}\n",d={immediateVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uResolution;\nuniform float uPointSize;\n\nvarying vec4 vColor;\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n  gl_PointSize = uPointSize;\n}\n",vertexColorVert:"attribute vec3 aPosition;\nattribute vec4 aVertexColor;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vColor = aVertexColor;\n}\n",vertexColorFrag:"precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n  gl_FragColor = vColor;\n}",normalVert:"attribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nvarying vec3 vVertexNormal;\nvarying highp vec2 vVertTexCoord;\n\nvoid main(void) {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vVertexNormal = normalize(vec3( uNormalMatrix * aNormal ));\n  vVertTexCoord = aTexCoord;\n}\n",normalFrag:"precision mediump float;\nvarying vec3 vVertexNormal;\nvoid main(void) {\n  gl_FragColor = vec4(vVertexNormal, 1.0);\n}",basicFrag:"precision mediump float;\nuniform vec4 uMaterialColor;\nvoid main(void) {\n  gl_FragColor = uMaterialColor;\n}",lightVert:c+"// include lighting.glgl\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nvarying highp vec2 vVertTexCoord;\nvarying vec3 vDiffuseColor;\nvarying vec3 vSpecularColor;\n\nvoid main(void) {\n\n  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);\n  gl_Position = uProjectionMatrix * viewModelPosition;\n\n  vec3 vertexNormal = normalize(uNormalMatrix * aNormal);\n  vVertTexCoord = aTexCoord;\n\n  totalLight(viewModelPosition.xyz, vertexNormal, vDiffuseColor, vSpecularColor);\n\n  for (int i = 0; i < 8; i++) {\n    if (i < uAmbientLightCount) {\n      vDiffuseColor += uAmbientColor[i];\n    }\n  }\n}\n",lightTextureFrag:"precision highp float;\n\nuniform vec4 uMaterialColor;\nuniform vec4 uTint;\nuniform sampler2D uSampler;\nuniform bool isTexture;\nuniform bool uEmissive;\n\nvarying highp vec2 vVertTexCoord;\nvarying vec3 vDiffuseColor;\nvarying vec3 vSpecularColor;\n\nvoid main(void) {\n  if(uEmissive && !isTexture) {\n    gl_FragColor = uMaterialColor;\n  }\n  else {\n    gl_FragColor = isTexture ? texture2D(uSampler, vVertTexCoord) * (uTint / vec4(255, 255, 255, 255)) : uMaterialColor;\n    gl_FragColor.rgb = gl_FragColor.rgb * vDiffuseColor + vSpecularColor;\n  }\n}",phongVert:"precision highp float;\nprecision highp int;\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aTexCoord;\n\nuniform vec3 uAmbientColor[5];\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\nuniform int uAmbientLightCount;\n\nvarying vec3 vNormal;\nvarying vec2 vTexCoord;\nvarying vec3 vViewPosition;\nvarying vec3 vAmbientColor;\n\nvoid main(void) {\n\n  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);\n\n  // Pass varyings to fragment shader\n  vViewPosition = viewModelPosition.xyz;\n  gl_Position = uProjectionMatrix * viewModelPosition;  \n\n  vNormal = uNormalMatrix * aNormal;\n  vTexCoord = aTexCoord;\n\n  // TODO: this should be a uniform\n  vAmbientColor = vec3(0.0);\n  for (int i = 0; i < 5; i++) {\n    if (i < uAmbientLightCount) {\n      vAmbientColor += uAmbientColor[i];\n    }\n  }\n}\n",phongFrag:c+"// include lighting.glsl\nprecision highp float;\nprecision highp int;\n\nuniform vec4 uMaterialColor;\nuniform vec4 uTint;\nuniform sampler2D uSampler;\nuniform bool isTexture;\nuniform bool uEmissive;\n\nvarying vec3 vNormal;\nvarying vec2 vTexCoord;\nvarying vec3 vViewPosition;\nvarying vec3 vAmbientColor;\n\nvoid main(void) {\n\n  vec3 diffuse;\n  vec3 specular;\n  totalLight(vViewPosition, normalize(vNormal), diffuse, specular);\n\n  if(uEmissive && !isTexture) {\n    gl_FragColor = uMaterialColor;\n  }\n  else {\n    gl_FragColor = isTexture ? texture2D(uSampler, vTexCoord) * (uTint / vec4(255, 255, 255, 255)) : uMaterialColor;\n    gl_FragColor.rgb = gl_FragColor.rgb * (diffuse + vAmbientColor) + specular;\n  }\n}",fontVert:"precision mediump float;\n\nattribute vec3 aPosition;\nattribute vec2 aTexCoord;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nuniform vec4 uGlyphRect;\nuniform float uGlyphOffset;\n\nvarying vec2 vTexCoord;\nvarying float w;\n\nvoid main() {\n  vec4 positionVec4 = vec4(aPosition, 1.0);\n\n  // scale by the size of the glyph's rectangle\n  positionVec4.xy *= uGlyphRect.zw - uGlyphRect.xy;\n\n  // move to the corner of the glyph\n  positionVec4.xy += uGlyphRect.xy;\n\n  // move to the letter's line offset\n  positionVec4.x += uGlyphOffset;\n  \n  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n  vTexCoord = aTexCoord;\n  w = gl_Position.w;\n}\n",fontFrag:"#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n\n#if 0\n  // simulate integer math using floats\n\t#define int float\n\t#define ivec2 vec2\n\t#define INT(x) float(x)\n\n\tint ifloor(float v) { return floor(v); }\n\tivec2 ifloor(vec2 v) { return floor(v); }\n\n#else\n  // use native integer math\n\tprecision highp int;\n\t#define INT(x) x\n\n\tint ifloor(float v) { return int(v); }\n\tint ifloor(int v) { return v; }\n\tivec2 ifloor(vec2 v) { return ivec2(v); }\n\n#endif\n\nuniform sampler2D uSamplerStrokes;\nuniform sampler2D uSamplerRowStrokes;\nuniform sampler2D uSamplerRows;\nuniform sampler2D uSamplerColStrokes;\nuniform sampler2D uSamplerCols;\n\nuniform ivec2 uStrokeImageSize;\nuniform ivec2 uCellsImageSize;\nuniform ivec2 uGridImageSize;\n\nuniform ivec2 uGridOffset;\nuniform ivec2 uGridSize;\nuniform vec4 uMaterialColor;\n\nvarying vec2 vTexCoord;\n\n// some helper functions\nint round(float v) { return ifloor(v + 0.5); }\nivec2 round(vec2 v) { return ifloor(v + 0.5); }\nfloat saturate(float v) { return clamp(v, 0.0, 1.0); }\nvec2 saturate(vec2 v) { return clamp(v, 0.0, 1.0); }\n\nint mul(float v1, int v2) {\n  return ifloor(v1 * float(v2));\n}\n\nivec2 mul(vec2 v1, ivec2 v2) {\n  return ifloor(v1 * vec2(v2) + 0.5);\n}\n\n// unpack a 16-bit integer from a float vec2\nint getInt16(vec2 v) {\n  ivec2 iv = round(v * 255.0);\n  return iv.x * INT(128) + iv.y;\n}\n\nvec2 pixelScale;\nvec2 coverage = vec2(0.0);\nvec2 weight = vec2(0.5);\nconst float minDistance = 1.0/8192.0;\nconst float hardness = 1.05; // amount of antialias\n\n// the maximum number of curves in a glyph\nconst int N = INT(250);\n\n// retrieves an indexed pixel from a sampler\nvec4 getTexel(sampler2D sampler, int pos, ivec2 size) {\n  int width = size.x;\n  int y = ifloor(pos / width);\n  int x = pos - y * width;  // pos % width\n\n  return texture2D(sampler, (vec2(x, y) + 0.5) / vec2(size));\n}\n\nvoid calulateCrossings(vec2 p0, vec2 p1, vec2 p2, out vec2 C1, out vec2 C2) {\n\n  // get the coefficients of the quadratic in t\n  vec2 a = p0 - p1 * 2.0 + p2;\n  vec2 b = p0 - p1;\n  vec2 c = p0 - vTexCoord;\n\n  // found out which values of 't' it crosses the axes\n  vec2 surd = sqrt(max(vec2(0.0), b * b - a * c));\n  vec2 t1 = ((b - surd) / a).yx;\n  vec2 t2 = ((b + surd) / a).yx;\n\n  // approximate straight lines to avoid rounding errors\n  if (abs(a.y) < 0.001)\n    t1.x = t2.x = c.y / (2.0 * b.y);\n\n  if (abs(a.x) < 0.001)\n    t1.y = t2.y = c.x / (2.0 * b.x);\n\n  // plug into quadratic formula to find the corrdinates of the crossings\n  C1 = ((a * t1 - b * 2.0) * t1 + c) * pixelScale;\n  C2 = ((a * t2 - b * 2.0) * t2 + c) * pixelScale;\n}\n\nvoid coverageX(vec2 p0, vec2 p1, vec2 p2) {\n\n  vec2 C1, C2;\n  calulateCrossings(p0, p1, p2, C1, C2);\n\n  // determine on which side of the x-axis the points lie\n  bool y0 = p0.y > vTexCoord.y;\n  bool y1 = p1.y > vTexCoord.y;\n  bool y2 = p2.y > vTexCoord.y;\n\n  // could web be under the curve (after t1)?\n  if (y1 ? !y2 : y0) {\n    // add the coverage for t1\n    coverage.x += saturate(C1.x + 0.5);\n    // calculate the anti-aliasing for t1\n    weight.x = min(weight.x, abs(C1.x));\n  }\n\n  // are we outside the curve (after t2)?\n  if (y1 ? !y0 : y2) {\n    // subtract the coverage for t2\n    coverage.x -= saturate(C2.x + 0.5);\n    // calculate the anti-aliasing for t2\n    weight.x = min(weight.x, abs(C2.x));\n  }\n}\n\n// this is essentially the same as coverageX, but with the axes swapped\nvoid coverageY(vec2 p0, vec2 p1, vec2 p2) {\n\n  vec2 C1, C2;\n  calulateCrossings(p0, p1, p2, C1, C2);\n\n  bool x0 = p0.x > vTexCoord.x;\n  bool x1 = p1.x > vTexCoord.x;\n  bool x2 = p2.x > vTexCoord.x;\n\n  if (x1 ? !x2 : x0) {\n    coverage.y -= saturate(C1.y + 0.5);\n    weight.y = min(weight.y, abs(C1.y));\n  }\n\n  if (x1 ? !x0 : x2) {\n    coverage.y += saturate(C2.y + 0.5);\n    weight.y = min(weight.y, abs(C2.y));\n  }\n}\n\nvoid main() {\n\n  // calculate the pixel scale based on screen-coordinates\n  pixelScale = hardness / fwidth(vTexCoord);\n\n  // which grid cell is this pixel in?\n  ivec2 gridCoord = ifloor(vTexCoord * vec2(uGridSize));\n\n  // intersect curves in this row\n  {\n    // the index into the row info bitmap\n    int rowIndex = gridCoord.y + uGridOffset.y;\n    // fetch the info texel\n    vec4 rowInfo = getTexel(uSamplerRows, rowIndex, uGridImageSize);\n    // unpack the rowInfo\n    int rowStrokeIndex = getInt16(rowInfo.xy);\n    int rowStrokeCount = getInt16(rowInfo.zw);\n\n    for (int iRowStroke = INT(0); iRowStroke < N; iRowStroke++) {\n      if (iRowStroke >= rowStrokeCount)\n        break;\n\n      // each stroke is made up of 3 points: the start and control point\n      // and the start of the next curve.\n      // fetch the indices of this pair of strokes:\n      vec4 strokeIndices = getTexel(uSamplerRowStrokes, rowStrokeIndex++, uCellsImageSize);\n\n      // unpack the stroke index\n      int strokePos = getInt16(strokeIndices.xy);\n\n      // fetch the two strokes\n      vec4 stroke0 = getTexel(uSamplerStrokes, strokePos + INT(0), uStrokeImageSize);\n      vec4 stroke1 = getTexel(uSamplerStrokes, strokePos + INT(1), uStrokeImageSize);\n\n      // calculate the coverage\n      coverageX(stroke0.xy, stroke0.zw, stroke1.xy);\n    }\n  }\n\n  // intersect curves in this column\n  {\n    int colIndex = gridCoord.x + uGridOffset.x;\n    vec4 colInfo = getTexel(uSamplerCols, colIndex, uGridImageSize);\n    int colStrokeIndex = getInt16(colInfo.xy);\n    int colStrokeCount = getInt16(colInfo.zw);\n    \n    for (int iColStroke = INT(0); iColStroke < N; iColStroke++) {\n      if (iColStroke >= colStrokeCount)\n        break;\n\n      vec4 strokeIndices = getTexel(uSamplerColStrokes, colStrokeIndex++, uCellsImageSize);\n\n      int strokePos = getInt16(strokeIndices.xy);\n      vec4 stroke0 = getTexel(uSamplerStrokes, strokePos + INT(0), uStrokeImageSize);\n      vec4 stroke1 = getTexel(uSamplerStrokes, strokePos + INT(1), uStrokeImageSize);\n      coverageY(stroke0.xy, stroke0.zw, stroke1.xy);\n    }\n  }\n\n  weight = saturate(1.0 - weight * 2.0);\n  float distance = max(weight.x + weight.y, minDistance); // manhattan approx.\n  float antialias = abs(dot(coverage, weight) / distance);\n  float cover = min(abs(coverage.x), abs(coverage.y));\n  gl_FragColor = uMaterialColor;\n  gl_FragColor.a *= saturate(max(antialias, cover));\n}",lineVert:"/*\n  Part of the Processing project - http://processing.org\n  Copyright (c) 2012-15 The Processing Foundation\n  Copyright (c) 2004-12 Ben Fry and Casey Reas\n  Copyright (c) 2001-04 Massachusetts Institute of Technology\n  This library is free software; you can redistribute it and/or\n  modify it under the terms of the GNU Lesser General Public\n  License as published by the Free Software Foundation, version 2.1.\n  This library is distributed in the hope that it will be useful,\n  but WITHOUT ANY WARRANTY; without even the implied warranty of\n  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n  Lesser General Public License for more details.\n  You should have received a copy of the GNU Lesser General\n  Public License along with this library; if not, write to the\n  Free Software Foundation, Inc., 59 Temple Place, Suite 330,\n  Boston, MA  02111-1307  USA\n*/\n\n#define PROCESSING_LINE_SHADER\n\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform float uStrokeWeight;\n\nuniform vec4 uViewport;\nuniform int uPerspective;\n\nattribute vec4 aPosition;\nattribute vec4 aDirection;\n  \nvoid main() {\n  // using a scale <1 moves the lines towards the camera\n  // in order to prevent popping effects due to half of\n  // the line disappearing behind the geometry faces.\n  vec3 scale = vec3(0.9995);\n\n  vec4 posp = uModelViewMatrix * aPosition;\n  vec4 posq = uModelViewMatrix * (aPosition + vec4(aDirection.xyz, 0));\n\n  // Moving vertices slightly toward the camera\n  // to avoid depth-fighting with the fill triangles.\n  // Discussed here:\n  // http://www.opengl.org/discussion_boards/ubbthreads.php?ubb=showflat&Number=252848  \n  posp.xyz = posp.xyz * scale;\n  posq.xyz = posq.xyz * scale;\n\n  vec4 p = uProjectionMatrix * posp;\n  vec4 q = uProjectionMatrix * posq;\n\n  // formula to convert from clip space (range -1..1) to screen space (range 0..[width or height])\n  // screen_p = (p.xy/p.w + <1,1>) * 0.5 * uViewport.zw\n\n  // prevent division by W by transforming the tangent formula (div by 0 causes\n  // the line to disappear, see https://github.com/processing/processing/issues/5183)\n  // t = screen_q - screen_p\n  //\n  // tangent is normalized and we don't care which aDirection it points to (+-)\n  // t = +- normalize( screen_q - screen_p )\n  // t = +- normalize( (q.xy/q.w+<1,1>)*0.5*uViewport.zw - (p.xy/p.w+<1,1>)*0.5*uViewport.zw )\n  //\n  // extract common factor, <1,1> - <1,1> cancels out\n  // t = +- normalize( (q.xy/q.w - p.xy/p.w) * 0.5 * uViewport.zw )\n  //\n  // convert to common divisor\n  // t = +- normalize( ((q.xy*p.w - p.xy*q.w) / (p.w*q.w)) * 0.5 * uViewport.zw )\n  //\n  // remove the common scalar divisor/factor, not needed due to normalize and +-\n  // (keep uViewport - can't remove because it has different components for x and y\n  //  and corrects for aspect ratio, see https://github.com/processing/processing/issues/5181)\n  // t = +- normalize( (q.xy*p.w - p.xy*q.w) * uViewport.zw )\n\n  vec2 tangent = normalize((q.xy*p.w - p.xy*q.w) * uViewport.zw);\n\n  // flip tangent to normal (it's already normalized)\n  vec2 normal = vec2(-tangent.y, tangent.x);\n\n  float thickness = aDirection.w * uStrokeWeight;\n  vec2 offset = normal * thickness / 2.0;\n\n  vec2 curPerspScale;\n\n  if(uPerspective == 1) {\n    // Perspective ---\n    // convert from world to clip by multiplying with projection scaling factor\n    // to get the right thickness (see https://github.com/processing/processing/issues/5182)\n    // invert Y, projections in Processing invert Y\n    curPerspScale = (uProjectionMatrix * vec4(1, -1, 0, 0)).xy;\n  } else {\n    // No Perspective ---\n    // multiply by W (to cancel out division by W later in the pipeline) and\n    // convert from screen to clip (derived from clip to screen above)\n    curPerspScale = p.w / (0.5 * uViewport.zw);\n  }\n\n  gl_Position.xy = p.xy + offset.xy * curPerspScale;\n  gl_Position.zw = p.zw;\n}\n",lineFrag:"precision mediump float;\nprecision mediump int;\n\nuniform vec4 uMaterialColor;\n\nvoid main() {\n  gl_FragColor = uMaterialColor;\n}",pointVert:"attribute vec3 aPosition;\nuniform float uPointSize;\nvarying float vStrokeWeight;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\nvoid main() {\n\tvec4 positionVec4 =  vec4(aPosition, 1.0);\n\tgl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;\n\tgl_PointSize = uPointSize;\n\tvStrokeWeight = uPointSize;\n}",pointFrag:"precision mediump float;\nprecision mediump int;\nuniform vec4 uMaterialColor;\nvarying float vStrokeWeight;\n\nvoid main(){\n\tfloat mask = 0.0;\n\n\t// make a circular mask using the gl_PointCoord (goes from 0 - 1 on a point)\n    // might be able to get a nicer edge on big strokeweights with smoothstep but slightly less performant\n\n\tmask = step(0.98, length(gl_PointCoord * 2.0 - 1.0));\n\n\t// if strokeWeight is 1 or less lets just draw a square\n\t// this prevents weird artifacting from carving circles when our points are really small\n\t// if strokeWeight is larger than 1, we just use it as is\n\n\tmask = mix(0.0, mask, clamp(floor(vStrokeWeight - 0.5),0.0,1.0));\n\n\t// throw away the borders of the mask\n    // otherwise we get weird alpha blending issues\n\n\tif(mask > 0.98){\n      discard;\n  \t}\n\n  \tgl_FragColor = vec4(uMaterialColor.rgb * (1.0 - mask), uMaterialColor.a) ;\n}"};u.default.RendererGL=function(e,t,r,n){return u.default.Renderer.call(this,e,t,r),this._setAttributeDefaults(t),this._initContext(),this.isP3D=!0,this.GL=this.drawingContext,this._pInst._setProperty("drawingContext",this.drawingContext),this._isErasing=!1,this._enableLighting=!1,this.ambientLightColors=[],this.specularColors=[1,1,1],this.directionalLightDirections=[],this.directionalLightDiffuseColors=[],this.directionalLightSpecularColors=[],this.pointLightPositions=[],this.pointLightDiffuseColors=[],this.pointLightSpecularColors=[],this.spotLightPositions=[],this.spotLightDirections=[],this.spotLightDiffuseColors=[],this.spotLightSpecularColors=[],this.spotLightAngle=[],this.spotLightConc=[],this.drawMode=i.FILL,this.curFillColor=this._cachedFillStyle=[1,1,1,1],this.curStrokeColor=this._cachedStrokeStyle=[0,0,0,1],this.curBlendMode=i.BLEND,this._cachedBlendMode=void 0,this.blendExt=this.GL.getExtension("EXT_blend_minmax"),this._isBlending=!1,this._useSpecularMaterial=!1,this._useEmissiveMaterial=!1,this._useNormalMaterial=!1,this._useShininess=1,this._tint=[255,255,255,255],this.constantAttenuation=1,this.linearAttenuation=0,this.quadraticAttenuation=0,this.uMVMatrix=new u.default.Matrix,this.uPMatrix=new u.default.Matrix,this.uNMatrix=new u.default.Matrix("mat3"),this._curCamera=new u.default.Camera(this),this._curCamera._computeCameraDefaultSettings(),this._curCamera._setDefaultCamera(),this._defaultLightShader=void 0,this._defaultImmediateModeShader=void 0,this._defaultNormalShader=void 0,this._defaultColorShader=void 0,this._defaultPointShader=void 0,this.userFillShader=void 0,this.userStrokeShader=void 0,this.userPointShader=void 0,this.retainedMode={geometry:{},buffers:{stroke:[new u.default.RenderBuffer(3,"lineVertices","lineVertexBuffer","aPosition",this,this._flatten),new u.default.RenderBuffer(4,"lineNormals","lineNormalBuffer","aDirection",this,this._flatten)],fill:[new u.default.RenderBuffer(3,"vertices","vertexBuffer","aPosition",this,this._vToNArray),new u.default.RenderBuffer(3,"vertexNormals","normalBuffer","aNormal",this,this._vToNArray),new u.default.RenderBuffer(4,"vertexColors","colorBuffer","aMaterialColor",this),new u.default.RenderBuffer(3,"vertexAmbients","ambientBuffer","aAmbientColor",this),new u.default.RenderBuffer(2,"uvs","uvBuffer","aTexCoord",this,this._flatten)],text:[new u.default.RenderBuffer(3,"vertices","vertexBuffer","aPosition",this,this._vToNArray),new u.default.RenderBuffer(2,"uvs","uvBuffer","aTexCoord",this,this._flatten)]}},this.immediateMode={geometry:new u.default.Geometry,shapeMode:i.TRIANGLE_FAN,_bezierVertex:[],_quadraticVertex:[],_curveVertex:[],buffers:{fill:[new u.default.RenderBuffer(3,"vertices","vertexBuffer","aPosition",this,this._vToNArray),new u.default.RenderBuffer(3,"vertexNormals","normalBuffer","aNormal",this,this._vToNArray),new u.default.RenderBuffer(4,"vertexColors","colorBuffer","aVertexColor",this),new u.default.RenderBuffer(3,"vertexAmbients","ambientBuffer","aAmbientColor",this),new u.default.RenderBuffer(2,"uvs","uvBuffer","aTexCoord",this,this._flatten)],stroke:[new u.default.RenderBuffer(3,"lineVertices","lineVertexBuffer","aPosition",this,this._flatten),new u.default.RenderBuffer(4,"lineNormals","lineNormalBuffer","aDirection",this,this._flatten)],point:this.GL.createBuffer()}},this.pointSize=5,this.curStrokeWeight=1,this.textures=[],this.textureMode=i.IMAGE,this.textureWrapX=i.CLAMP,this.textureWrapY=i.CLAMP,this._tex=null,this._curveTightness=6,this._lookUpTableBezier=[],this._lookUpTableQuadratic=[],this._lutBezierDetail=0,this._lutQuadraticDetail=0,this._tessy=this._initTessy(),this.fontInfos={},this._curShader=void 0,this},u.default.RendererGL.prototype=Object.create(u.default.Renderer.prototype),u.default.RendererGL.prototype._setAttributeDefaults=function(e){var t={alpha:!0,depth:!0,stencil:!0,antialias:navigator.userAgent.toLowerCase().includes("safari"),premultipliedAlpha:!1,preserveDrawingBuffer:!0,perPixelLighting:!0};null===e._glAttributes?e._glAttributes=t:e._glAttributes=Object.assign(t,e._glAttributes)},u.default.RendererGL.prototype._initContext=function(){try{if(this.drawingContext=this.canvas.getContext("webgl",this._pInst._glAttributes)||this.canvas.getContext("experimental-webgl",this._pInst._glAttributes),null===this.drawingContext)throw new Error("Error creating webgl context");var e=this.drawingContext;e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),this._viewport=this.drawingContext.getParameter(this.drawingContext.VIEWPORT)}catch(e){throw e}},u.default.RendererGL.prototype._resetContext=function(e,t){var r=this.width,n=this.height,o=this.canvas.id,i=this._pInst instanceof u.default.Graphics;if(i){var a=this._pInst;a.canvas.parentNode.removeChild(a.canvas),a.canvas=document.createElement("canvas"),(a._pInst._userNode||document.body).appendChild(a.canvas),u.default.Element.call(a,a.canvas,a._pInst),a.width=r,a.height=n}else{var s=this.canvas;s&&s.parentNode.removeChild(s),(s=document.createElement("canvas")).id=o,this._pInst._userNode?this._pInst._userNode.appendChild(s):document.body.appendChild(s),this._pInst.canvas=s}var l=new u.default.RendererGL(this._pInst.canvas,this._pInst,!i);this._pInst._setProperty("_renderer",l),l.resize(r,n),l._applyDefaults(),i||this._pInst._elements.push(l),"function"==typeof t&&setTimeout(function(){t.apply(window._renderer,e)},0)},u.default.prototype.setAttributes=function(e,t){if(void 0!==this._glAttributes){var r=!0;if(void 0!==t?(null===this._glAttributes&&(this._glAttributes={}),this._glAttributes[e]!==t&&(this._glAttributes[e]=t,r=!1)):e instanceof Object&&this._glAttributes!==e&&(this._glAttributes=e,r=!1),this._renderer.isP3D&&!r){if(!this._setupDone)for(var n in this._renderer.retainedMode.geometry)if(this._renderer.retainedMode.geometry.hasOwnProperty(n))return void console.error("Sorry, Could not set the attributes, you need to call setAttributes() before calling the other drawing methods in setup()");this.push(),this._renderer._resetContext(),this.pop(),this._renderer._curCamera&&(this._renderer._curCamera._renderer=this._renderer)}}else console.log("You are trying to use setAttributes on a p5.Graphics object that does not use a WEBGL renderer.")},u.default.RendererGL.prototype._update=function(){this.uMVMatrix.set(this._curCamera.cameraMatrix.mat4[0],this._curCamera.cameraMatrix.mat4[1],this._curCamera.cameraMatrix.mat4[2],this._curCamera.cameraMatrix.mat4[3],this._curCamera.cameraMatrix.mat4[4],this._curCamera.cameraMatrix.mat4[5],this._curCamera.cameraMatrix.mat4[6],this._curCamera.cameraMatrix.mat4[7],this._curCamera.cameraMatrix.mat4[8],this._curCamera.cameraMatrix.mat4[9],this._curCamera.cameraMatrix.mat4[10],this._curCamera.cameraMatrix.mat4[11],this._curCamera.cameraMatrix.mat4[12],this._curCamera.cameraMatrix.mat4[13],this._curCamera.cameraMatrix.mat4[14],this._curCamera.cameraMatrix.mat4[15]),this.ambientLightColors.length=0,this.specularColors=[1,1,1],this.directionalLightDirections.length=0,this.directionalLightDiffuseColors.length=0,this.directionalLightSpecularColors.length=0,this.pointLightPositions.length=0,this.pointLightDiffuseColors.length=0,this.pointLightSpecularColors.length=0,this.spotLightPositions.length=0,this.spotLightDirections.length=0,this.spotLightDiffuseColors.length=0,this.spotLightSpecularColors.length=0,this.spotLightAngle.length=0,this.spotLightConc.length=0,this._enableLighting=!1,this._tint=[255,255,255,255],this.GL.clear(this.GL.DEPTH_BUFFER_BIT)},u.default.RendererGL.prototype.background=function(){var e,t=(e=this._pInst).color.apply(e,arguments),r=t.levels[0]/255,n=t.levels[1]/255,o=t.levels[2]/255,i=t.levels[3]/255;this.GL.clearColor(r,n,o,i),this.GL.clear(this.GL.COLOR_BUFFER_BIT)},u.default.RendererGL.prototype.fill=function(e,t,r,n){var o=u.default.prototype.color.apply(this._pInst,arguments);this.curFillColor=o._array,this.drawMode=i.FILL,this._useNormalMaterial=!1,this._tex=null},u.default.RendererGL.prototype.stroke=function(e,t,r,n){arguments[3]=255;var o=u.default.prototype.color.apply(this._pInst,arguments);this.curStrokeColor=o._array},u.default.RendererGL.prototype.strokeCap=function(e){console.error("Sorry, strokeCap() is not yet implemented in WEBGL mode")},u.default.RendererGL.prototype.strokeJoin=function(e){console.error("Sorry, strokeJoin() is not yet implemented in WEBGL mode")},u.default.RendererGL.prototype.filter=function(e){console.error("filter() does not work in WEBGL mode")},u.default.RendererGL.prototype.blendMode=function(e){e===i.DARKEST||e===i.LIGHTEST||e===i.ADD||e===i.BLEND||e===i.SUBTRACT||e===i.SCREEN||e===i.EXCLUSION||e===i.REPLACE||e===i.MULTIPLY||e===i.REMOVE?this.curBlendMode=e:e!==i.BURN&&e!==i.OVERLAY&&e!==i.HARD_LIGHT&&e!==i.SOFT_LIGHT&&e!==i.DODGE||console.warn("BURN, OVERLAY, HARD_LIGHT, SOFT_LIGHT, and DODGE only work for blendMode in 2D mode.")},u.default.RendererGL.prototype.erase=function(e,t){this._isErasing||(this._applyBlendMode(i.REMOVE),this._isErasing=!0,this._cachedFillStyle=this.curFillColor.slice(),this.curFillColor=[1,1,1,e/255],this._cachedStrokeStyle=this.curStrokeColor.slice(),this.curStrokeColor=[1,1,1,t/255])},u.default.RendererGL.prototype.noErase=function(){this._isErasing&&(this._isErasing=!1,this.curFillColor=this._cachedFillStyle.slice(),this.curStrokeColor=this._cachedStrokeStyle.slice(),this.blendMode(this._cachedBlendMode))},u.default.RendererGL.prototype.strokeWeight=function(e){this.curStrokeWeight!==e&&(this.pointSize=e,this.curStrokeWeight=e)},u.default.RendererGL.prototype._getPixel=function(e,t){var r;return r=new Uint8Array(4),this.drawingContext.readPixels(e,t,1,1,this.drawingContext.RGBA,this.drawingContext.UNSIGNED_BYTE,r),[r[0],r[1],r[2],r[3]]},u.default.RendererGL.prototype.loadPixels=function(){var e=this._pixelsState;if(!0===this._pInst._glAttributes.preserveDrawingBuffer){var t=e.pixels,r=this.GL.drawingBufferWidth*this.GL.drawingBufferHeight*4;t instanceof Uint8Array&&t.length===r||(t=new Uint8Array(r),this._pixelsState._setProperty("pixels",t));var n=this._pInst._pixelDensity;this.GL.readPixels(0,0,this.width*n,this.height*n,this.GL.RGBA,this.GL.UNSIGNED_BYTE,t)}else console.log("loadPixels only works in WebGL when preserveDrawingBuffer is true.")},u.default.RendererGL.prototype.geometryInHash=function(e){return void 0!==this.retainedMode.geometry[e]},u.default.RendererGL.prototype.resize=function(e,t){u.default.Renderer.prototype.resize.call(this,e,t),this.GL.viewport(0,0,this.GL.drawingBufferWidth,this.GL.drawingBufferHeight),this._viewport=this.GL.getParameter(this.GL.VIEWPORT),this._curCamera._resize();var r=this._pixelsState;void 0!==r.pixels&&r._setProperty("pixels",new Uint8Array(this.GL.drawingBufferWidth*this.GL.drawingBufferHeight*4))},u.default.RendererGL.prototype.clear=function(){var e=(arguments.length<=0?void 0:arguments[0])||0,t=(arguments.length<=1?void 0:arguments[1])||0,r=(arguments.length<=2?void 0:arguments[2])||0,n=(arguments.length<=3?void 0:arguments[3])||0;this.GL.clearColor(e,t,r,n),this.GL.clear(this.GL.COLOR_BUFFER_BIT|this.GL.DEPTH_BUFFER_BIT)},u.default.RendererGL.prototype.applyMatrix=function(e,t,r,n,o,i){16===arguments.length?u.default.Matrix.prototype.apply.apply(this.uMVMatrix,arguments):this.uMVMatrix.apply([e,t,0,0,r,n,0,0,0,0,1,0,o,i,0,1])},u.default.RendererGL.prototype.translate=function(e,t,r){return e instanceof u.default.Vector&&(r=e.z,t=e.y,e=e.x),this.uMVMatrix.translate([e,t,r]),this},u.default.RendererGL.prototype.scale=function(e,t,r){return this.uMVMatrix.scale(e,t,r),this},u.default.RendererGL.prototype.rotate=function(e,t){return void 0===t?this.rotateZ(e):(u.default.Matrix.prototype.rotate.apply(this.uMVMatrix,arguments),this)},u.default.RendererGL.prototype.rotateX=function(e){return this.rotate(e,1,0,0),this},u.default.RendererGL.prototype.rotateY=function(e){return this.rotate(e,0,1,0),this},u.default.RendererGL.prototype.rotateZ=function(e){return this.rotate(e,0,0,1),this},u.default.RendererGL.prototype.push=function(){var e=u.default.Renderer.prototype.push.apply(this),t=e.properties;return t.uMVMatrix=this.uMVMatrix.copy(),t.uPMatrix=this.uPMatrix.copy(),t._curCamera=this._curCamera,this._curCamera=this._curCamera.copy(),t.ambientLightColors=this.ambientLightColors.slice(),t.specularColors=this.specularColors.slice(),t.directionalLightDirections=this.directionalLightDirections.slice(),t.directionalLightDiffuseColors=this.directionalLightDiffuseColors.slice(),t.directionalLightSpecularColors=this.directionalLightSpecularColors.slice(),t.pointLightPositions=this.pointLightPositions.slice(),t.pointLightDiffuseColors=this.pointLightDiffuseColors.slice(),t.pointLightSpecularColors=this.pointLightSpecularColors.slice(),t.spotLightPositions=this.spotLightPositions.slice(),t.spotLightDirections=this.spotLightDirections.slice(),t.spotLightDiffuseColors=this.spotLightDiffuseColors.slice(),t.spotLightSpecularColors=this.spotLightSpecularColors.slice(),t.spotLightAngle=this.spotLightAngle.slice(),t.spotLightConc=this.spotLightConc.slice(),t.userFillShader=this.userFillShader,t.userStrokeShader=this.userStrokeShader,t.userPointShader=this.userPointShader,t.pointSize=this.pointSize,t.curStrokeWeight=this.curStrokeWeight,t.curStrokeColor=this.curStrokeColor,t.curFillColor=this.curFillColor,t._useSpecularMaterial=this._useSpecularMaterial,t._useEmissiveMaterial=this._useEmissiveMaterial,t._useShininess=this._useShininess,t.constantAttenuation=this.constantAttenuation,t.linearAttenuation=this.linearAttenuation,t.quadraticAttenuation=this.quadraticAttenuation,t._enableLighting=this._enableLighting,t._useNormalMaterial=this._useNormalMaterial,t._tex=this._tex,t.drawMode=this.drawMode,e},u.default.RendererGL.prototype.resetMatrix=function(){return this.uMVMatrix=u.default.Matrix.identity(this._pInst),this},u.default.RendererGL.prototype._getImmediateStrokeShader=function(){var e=this.userStrokeShader;return e&&e.isStrokeShader()?e:this._getLineShader()},u.default.RendererGL.prototype._getRetainedStrokeShader=u.default.RendererGL.prototype._getImmediateStrokeShader,u.default.RendererGL.prototype._getImmediateFillShader=function(){var e=this.userFillShader;if(this._useNormalMaterial&&(!e||!e.isNormalShader()))return this._getNormalShader();if(this._enableLighting){if(!e||!e.isLightShader())return this._getLightShader()}else if(this._tex){if(!e||!e.isTextureShader())return this._getLightShader()}else if(!e)return this._getImmediateModeShader();return e},u.default.RendererGL.prototype._getRetainedFillShader=function(){if(this._useNormalMaterial)return this._getNormalShader();var e=this.userFillShader;if(this._enableLighting){if(!e||!e.isLightShader())return this._getLightShader()}else if(this._tex){if(!e||!e.isTextureShader())return this._getLightShader()}else if(!e)return this._getColorShader();return e},u.default.RendererGL.prototype._getImmediatePointShader=function(){var e=this.userPointShader;return e&&e.isPointShader()?e:this._getPointShader()},u.default.RendererGL.prototype._getRetainedLineShader=u.default.RendererGL.prototype._getImmediateLineShader,u.default.RendererGL.prototype._getLightShader=function(){return this._defaultLightShader||(this._pInst._glAttributes.perPixelLighting?this._defaultLightShader=new u.default.Shader(this,d.phongVert,d.phongFrag):this._defaultLightShader=new u.default.Shader(this,d.lightVert,d.lightTextureFrag)),this._defaultLightShader},u.default.RendererGL.prototype._getImmediateModeShader=function(){return this._defaultImmediateModeShader||(this._defaultImmediateModeShader=new u.default.Shader(this,d.immediateVert,d.vertexColorFrag)),this._defaultImmediateModeShader},u.default.RendererGL.prototype._getNormalShader=function(){return this._defaultNormalShader||(this._defaultNormalShader=new u.default.Shader(this,d.normalVert,d.normalFrag)),this._defaultNormalShader},u.default.RendererGL.prototype._getColorShader=function(){return this._defaultColorShader||(this._defaultColorShader=new u.default.Shader(this,d.normalVert,d.basicFrag)),this._defaultColorShader},u.default.RendererGL.prototype._getPointShader=function(){return this._defaultPointShader||(this._defaultPointShader=new u.default.Shader(this,d.pointVert,d.pointFrag)),this._defaultPointShader},u.default.RendererGL.prototype._getLineShader=function(){return this._defaultLineShader||(this._defaultLineShader=new u.default.Shader(this,d.lineVert,d.lineFrag)),this._defaultLineShader},u.default.RendererGL.prototype._getFontShader=function(){return this._defaultFontShader||(this.GL.getExtension("OES_standard_derivatives"),this._defaultFontShader=new u.default.Shader(this,d.fontVert,d.fontFrag)),this._defaultFontShader},u.default.RendererGL.prototype._getEmptyTexture=function(){if(!this._emptyTexture){var e=new u.default.Image(1,1);e.set(0,0,255),this._emptyTexture=new u.default.Texture(this,e)}return this._emptyTexture},u.default.RendererGL.prototype.getTexture=function(e){var t=this.textures,r=!0,n=!1,o=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value;if(s.src===e)return s}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}var l=new u.default.Texture(this,e);return t.push(l),l},u.default.RendererGL.prototype._setStrokeUniforms=function(e){e.bindShader(),e.setUniform("uMaterialColor",this.curStrokeColor),e.setUniform("uStrokeWeight",this.curStrokeWeight)},u.default.RendererGL.prototype._setFillUniforms=function(e){e.bindShader(),e.setUniform("uMaterialColor",this.curFillColor),e.setUniform("isTexture",!!this._tex),this._tex&&e.setUniform("uSampler",this._tex),e.setUniform("uTint",this._tint),e.setUniform("uSpecular",this._useSpecularMaterial),e.setUniform("uEmissive",this._useEmissiveMaterial),e.setUniform("uShininess",this._useShininess),e.setUniform("uUseLighting",this._enableLighting);var t=this.pointLightDiffuseColors.length/3;e.setUniform("uPointLightCount",t),e.setUniform("uPointLightLocation",this.pointLightPositions),e.setUniform("uPointLightDiffuseColors",this.pointLightDiffuseColors),e.setUniform("uPointLightSpecularColors",this.pointLightSpecularColors);var r=this.directionalLightDiffuseColors.length/3;e.setUniform("uDirectionalLightCount",r),e.setUniform("uLightingDirection",this.directionalLightDirections),e.setUniform("uDirectionalDiffuseColors",this.directionalLightDiffuseColors),e.setUniform("uDirectionalSpecularColors",this.directionalLightSpecularColors);var n=this.ambientLightColors.length/3;e.setUniform("uAmbientLightCount",n),e.setUniform("uAmbientColor",this.ambientLightColors);var o=this.spotLightDiffuseColors.length/3;e.setUniform("uSpotLightCount",o),e.setUniform("uSpotLightAngle",this.spotLightAngle),e.setUniform("uSpotLightConc",this.spotLightConc),e.setUniform("uSpotLightDiffuseColors",this.spotLightDiffuseColors),e.setUniform("uSpotLightSpecularColors",this.spotLightSpecularColors),e.setUniform("uSpotLightLocation",this.spotLightPositions),e.setUniform("uSpotLightDirection",this.spotLightDirections),e.setUniform("uConstantAttenuation",this.constantAttenuation),e.setUniform("uLinearAttenuation",this.linearAttenuation),e.setUniform("uQuadraticAttenuation",this.quadraticAttenuation),e.bindTextures()},u.default.RendererGL.prototype._setPointUniforms=function(e){e.bindShader(),e.setUniform("uMaterialColor",this.curStrokeColor),e.setUniform("uPointSize",this.pointSize*this._pInst._pixelDensity)},u.default.RendererGL.prototype._bindBuffer=function(e,t,r,n,o){if(t=t||this.GL.ARRAY_BUFFER,this.GL.bindBuffer(t,e),void 0!==r){var i=new(n||Float32Array)(r);this.GL.bufferData(t,i,o||this.GL.STATIC_DRAW)}},u.default.RendererGL.prototype._arraysEqual=function(e,t){var r=e.length;if(r!==t.length)return!1;for(var n=0;n<r;n++)if(e[n]!==t[n])return!1;return!0},u.default.RendererGL.prototype._isTypedArray=function(e){return Float32Array,Float64Array,Int16Array,Uint16Array,e instanceof Uint32Array},u.default.RendererGL.prototype._flatten=function(e){if(0===e.length)return[];if(2e4<e.length){var t,r=Object.prototype.toString,n=[],o=e.slice();for(t=o.pop();"[object Array]"===r.call(t)?o.push.apply(o,l(t)):n.push(t),o.length&&void 0!==(t=o.pop()););return n.reverse(),n}var i;return(i=[]).concat.apply(i,l(e))},u.default.RendererGL.prototype._vToNArray=function(e){var t=[],r=!0,n=!1,o=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value;t.push(s.x,s.y,s.z)}}catch(e){n=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}return t},u.default.prototype._assert3d=function(e){if(!this._renderer.isP3D)throw new Error("".concat(e,"() is only supported in WEBGL mode. If you'd like to use 3D graphics and WebGL, see  https://p5js.org/examples/form-3d-primitives.html for more information."))},u.default.RendererGL.prototype._initTessy=function(){var e=new n.default.GluTesselator;return e.gluTessCallback(n.default.gluEnum.GLU_TESS_VERTEX_DATA,function(e,t){t[t.length]=e[0],t[t.length]=e[1],t[t.length]=e[2]}),e.gluTessCallback(n.default.gluEnum.GLU_TESS_BEGIN,function(e){e!==n.default.primitiveType.GL_TRIANGLES&&console.log("expected TRIANGLES but got type: ".concat(e))}),e.gluTessCallback(n.default.gluEnum.GLU_TESS_ERROR,function(e){console.log("error callback"),console.log("error number: ".concat(e))}),e.gluTessCallback(n.default.gluEnum.GLU_TESS_COMBINE,function(e,t,r){return[e[0],e[1],e[2]]}),e.gluTessCallback(n.default.gluEnum.GLU_TESS_EDGE_FLAG,function(e){}),e},u.default.RendererGL.prototype._triangulate=function(e){this._tessy.gluTessNormal(0,0,1);var t=[];this._tessy.gluTessBeginPolygon(t);for(var r=0;r<e.length;r++){this._tessy.gluTessBeginContour();for(var n=e[r],o=0;o<n.length;o+=3){var i=[n[o],n[o+1],n[o+2]];this._tessy.gluTessVertex(i,i)}this._tessy.gluTessEndContour()}return this._tessy.gluTessEndPolygon(),t},u.default.RendererGL.prototype._bezierCoefficients=function(e){var t=e*e,r=1-e,n=r*r;return[n*r,3*n*e,3*r*t,t*e]},u.default.RendererGL.prototype._quadraticCoefficients=function(e){var t=1-e;return[t*t,2*t*e,e*e]},u.default.RendererGL.prototype._bezierToCatmull=function(e){return[e[1],e[1]+(e[2]-e[0])/this._curveTightness,e[2]-(e[3]-e[1])/this._curveTightness,e[2]]};var f=u.default.RendererGL;r.default=f},{"../core/constants":250,"../core/main":260,"../core/p5.Renderer":263,"./p5.Camera":308,"./p5.Matrix":310,"./p5.Shader":315,"core-js/modules/es.array.concat":148,"core-js/modules/es.array.fill":150,"core-js/modules/es.array.filter":151,"core-js/modules/es.array.from":153,"core-js/modules/es.array.includes":154,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.slice":160,"core-js/modules/es.object.assign":170,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.to-string":179,"core-js/modules/es.string.includes":182,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.float32-array":200,"core-js/modules/es.typed-array.float64-array":201,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.int16-array":205,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint16-array":221,"core-js/modules/es.typed-array.uint32-array":222,"core-js/modules/es.typed-array.uint8-array":223,"core-js/modules/web.dom-collections.iterator":226,libtess:234,path:237}],315:[function(e,t,r){"use strict";e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.index-of"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.array.slice"),e("core-js/modules/es.function.name"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.string.iterator"),e("core-js/modules/web.dom-collections.iterator"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n};o.default.Shader=function(e,t,r){this._renderer=e,this._vertSrc=t,this._fragSrc=r,this._vertShader=-1,this._fragShader=-1,this._glProgram=0,this._loadedAttributes=!1,this.attributes={},this._loadedUniforms=!1,this.uniforms={},this._bound=!1,this.samplers=[]},o.default.Shader.prototype.init=function(){if(0===this._glProgram){var e=this._renderer.GL;if(this._vertShader=e.createShader(e.VERTEX_SHADER),e.shaderSource(this._vertShader,this._vertSrc),e.compileShader(this._vertShader),!e.getShaderParameter(this._vertShader,e.COMPILE_STATUS))return console.error("Yikes! An error occurred compiling the vertex shader:".concat(e.getShaderInfoLog(this._vertShader))),null;if(this._fragShader=e.createShader(e.FRAGMENT_SHADER),e.shaderSource(this._fragShader,this._fragSrc),e.compileShader(this._fragShader),!e.getShaderParameter(this._fragShader,e.COMPILE_STATUS))return console.error("Darn! An error occurred compiling the fragment shader:".concat(e.getShaderInfoLog(this._fragShader))),null;this._glProgram=e.createProgram(),e.attachShader(this._glProgram,this._vertShader),e.attachShader(this._glProgram,this._fragShader),e.linkProgram(this._glProgram),e.getProgramParameter(this._glProgram,e.LINK_STATUS)||console.error("Snap! Error linking shader program: ".concat(e.getProgramInfoLog(this._glProgram))),this._loadAttributes(),this._loadUniforms()}return this},o.default.Shader.prototype._loadAttributes=function(){if(!this._loadedAttributes){this.attributes={};for(var e=this._renderer.GL,t=e.getProgramParameter(this._glProgram,e.ACTIVE_ATTRIBUTES),r=0;r<t;++r){var n=e.getActiveAttrib(this._glProgram,r),o=n.name,i=e.getAttribLocation(this._glProgram,o),a={};a.name=o,a.location=i,a.index=r,a.type=n.type,a.size=n.size,this.attributes[o]=a}this._loadedAttributes=!0}},o.default.Shader.prototype._loadUniforms=function(){if(!this._loadedUniforms){for(var e=this._renderer.GL,t=e.getProgramParameter(this._glProgram,e.ACTIVE_UNIFORMS),r=0,n=0;n<t;++n){var o=e.getActiveUniform(this._glProgram,n),i={};i.location=e.getUniformLocation(this._glProgram,o.name),i.size=o.size;var a=o.name;1<o.size&&(a=a.substring(0,a.indexOf("[0]"))),i.name=a,i.type=o.type,i._cachedData=void 0,i.type===e.SAMPLER_2D&&(i.samplerIndex=r,r++,this.samplers.push(i)),i.isArray=i.type===e.FLOAT_MAT3||i.type===e.FLOAT_MAT4||i.type===e.FLOAT_VEC2||i.type===e.FLOAT_VEC3||i.type===e.FLOAT_VEC4||i.type===e.INT_VEC2||i.type===e.INT_VEC3||i.type===e.INT_VEC4,this.uniforms[a]=i}this._loadedUniforms=!0}},o.default.Shader.prototype.compile=function(){},o.default.Shader.prototype.bindShader=function(){this.init(),this._bound||(this.useProgram(),this._bound=!0,this._setMatrixUniforms(),this.setUniform("uViewport",this._renderer._viewport))},o.default.Shader.prototype.unbindShader=function(){return this._bound&&(this.unbindTextures(),this._bound=!1),this},o.default.Shader.prototype.bindTextures=function(){var e=this._renderer.GL,t=!0,r=!1,n=void 0;try{for(var o,i=this.samplers[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value,s=a.texture;void 0===s&&(s=this._renderer._getEmptyTexture()),e.activeTexture(e.TEXTURE0+a.samplerIndex),s.bindTexture(),s.update(),e.uniform1i(a.location,a.samplerIndex)}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}},o.default.Shader.prototype.updateTextures=function(){var e=!0,t=!1,r=void 0;try{for(var n,o=this.samplers[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value.texture;i&&i.update()}}catch(e){t=!0,r=e}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}},o.default.Shader.prototype.unbindTextures=function(){},o.default.Shader.prototype._setMatrixUniforms=function(){this.setUniform("uProjectionMatrix",this._renderer.uPMatrix.mat4),this.isStrokeShader()&&("default"===this._renderer._curCamera.cameraType?this.setUniform("uPerspective",1):this.setUniform("uPerspective",0)),this.setUniform("uModelViewMatrix",this._renderer.uMVMatrix.mat4),this.setUniform("uViewMatrix",this._renderer._curCamera.cameraMatrix.mat4),this.uniforms.uNormalMatrix&&(this._renderer.uNMatrix.inverseTranspose(this._renderer.uMVMatrix),this.setUniform("uNormalMatrix",this._renderer.uNMatrix.mat3))},o.default.Shader.prototype.useProgram=function(){var e=this._renderer.GL;return this._renderer._curShader!==this&&(e.useProgram(this._glProgram),this._renderer._curShader=this),this},o.default.Shader.prototype.setUniform=function(e,t){var r=this.uniforms[e];if(r){var n=this._renderer.GL;if(r.isArray){if(r._cachedData&&this._renderer._arraysEqual(r._cachedData,t))return;r._cachedData=t.slice(0)}else{if(r._cachedData&&r._cachedData===t)return;r._cachedData=t}var o=r.location;switch(this.useProgram(),r.type){case n.BOOL:!0===t?n.uniform1i(o,1):n.uniform1i(o,0);break;case n.INT:1<r.size?t.length&&n.uniform1iv(o,t):n.uniform1i(o,t);break;case n.FLOAT:1<r.size?t.length&&n.uniform1fv(o,t):n.uniform1f(o,t);break;case n.FLOAT_MAT3:n.uniformMatrix3fv(o,!1,t);break;case n.FLOAT_MAT4:n.uniformMatrix4fv(o,!1,t);break;case n.FLOAT_VEC2:1<r.size?t.length&&n.uniform2fv(o,t):n.uniform2f(o,t[0],t[1]);break;case n.FLOAT_VEC3:1<r.size?t.length&&n.uniform3fv(o,t):n.uniform3f(o,t[0],t[1],t[2]);break;case n.FLOAT_VEC4:1<r.size?t.length&&n.uniform4fv(o,t):n.uniform4f(o,t[0],t[1],t[2],t[3]);break;case n.INT_VEC2:1<r.size?t.length&&n.uniform2iv(o,t):n.uniform2i(o,t[0],t[1]);break;case n.INT_VEC3:1<r.size?t.length&&n.uniform3iv(o,t):n.uniform3i(o,t[0],t[1],t[2]);break;case n.INT_VEC4:1<r.size?t.length&&n.uniform4iv(o,t):n.uniform4i(o,t[0],t[1],t[2],t[3]);break;case n.SAMPLER_2D:n.activeTexture(n.TEXTURE0+r.samplerIndex),r.texture=this._renderer.getTexture(t),n.uniform1i(r.location,r.samplerIndex)}return this}},o.default.Shader.prototype.isLightShader=function(){return void 0!==this.attributes.aNormal||void 0!==this.uniforms.uUseLighting||void 0!==this.uniforms.uAmbientLightCount||void 0!==this.uniforms.uDirectionalLightCount||void 0!==this.uniforms.uPointLightCount||void 0!==this.uniforms.uAmbientColor||void 0!==this.uniforms.uDirectionalDiffuseColors||void 0!==this.uniforms.uDirectionalSpecularColors||void 0!==this.uniforms.uPointLightLocation||void 0!==this.uniforms.uPointLightDiffuseColors||void 0!==this.uniforms.uPointLightSpecularColors||void 0!==this.uniforms.uLightingDirection||void 0!==this.uniforms.uSpecular},o.default.Shader.prototype.isNormalShader=function(){return void 0!==this.attributes.aNormal},o.default.Shader.prototype.isTextureShader=function(){return 0<this.samplerIndex},o.default.Shader.prototype.isColorShader=function(){return void 0!==this.attributes.aVertexColor||void 0!==this.uniforms.uMaterialColor},o.default.Shader.prototype.isTexLightShader=function(){return this.isLightShader()&&this.isTextureShader()},o.default.Shader.prototype.isStrokeShader=function(){return void 0!==this.uniforms.uStrokeWeight},o.default.Shader.prototype.enableAttrib=function(e,t,r,n,o,i){if(e){0;var a=e.location;if(-1!==a){var s=this._renderer.GL;e.enabled||(s.enableVertexAttribArray(a),e.enabled=!0),this._renderer.GL.vertexAttribPointer(a,t,r||s.FLOAT,n||!1,o||0,i||0)}}return this};var i=o.default.Shader;r.default=i},{"../core/main":260,"core-js/modules/es.array.index-of":155,"core-js/modules/es.array.iterator":156,"core-js/modules/es.array.slice":160,"core-js/modules/es.function.name":163,"core-js/modules/es.object.to-string":174,"core-js/modules/es.string.iterator":183,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}],316:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.typed-array.uint8-array"),e("core-js/modules/es.typed-array.copy-within"),e("core-js/modules/es.typed-array.every"),e("core-js/modules/es.typed-array.fill"),e("core-js/modules/es.typed-array.filter"),e("core-js/modules/es.typed-array.find"),e("core-js/modules/es.typed-array.find-index"),e("core-js/modules/es.typed-array.for-each"),e("core-js/modules/es.typed-array.includes"),e("core-js/modules/es.typed-array.index-of"),e("core-js/modules/es.typed-array.iterator"),e("core-js/modules/es.typed-array.join"),e("core-js/modules/es.typed-array.last-index-of"),e("core-js/modules/es.typed-array.map"),e("core-js/modules/es.typed-array.reduce"),e("core-js/modules/es.typed-array.reduce-right"),e("core-js/modules/es.typed-array.reverse"),e("core-js/modules/es.typed-array.set"),e("core-js/modules/es.typed-array.slice"),e("core-js/modules/es.typed-array.some"),e("core-js/modules/es.typed-array.sort"),e("core-js/modules/es.typed-array.subarray"),e("core-js/modules/es.typed-array.to-locale-string"),e("core-js/modules/es.typed-array.to-string"),Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=e("../core/main"))&&n.__esModule?n:{default:n},s=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}o.default.Texture=function(e,t){this._renderer=e;var r=this._renderer.GL;this.src=t,this.glTex=void 0,this.glTarget=r.TEXTURE_2D,this.glFormat=r.RGBA,this.mipmaps=!1,this.glMinFilter=r.LINEAR,this.glMagFilter=r.LINEAR,this.glWrapS=r.CLAMP_TO_EDGE,this.glWrapT=r.CLAMP_TO_EDGE,this.isSrcMediaElement=void 0!==o.default.MediaElement&&t instanceof o.default.MediaElement,this._videoPrevUpdateTime=0,this.isSrcHTMLElement=void 0!==o.default.Element&&t instanceof o.default.Element&&!(t instanceof o.default.Graphics),this.isSrcP5Image=t instanceof o.default.Image,this.isSrcP5Graphics=t instanceof o.default.Graphics,this.isImageData="undefined"!=typeof ImageData&&t instanceof ImageData;var n=this._getTextureDataFromSource();return this.width=n.width,this.height=n.height,this.init(n),this},o.default.Texture.prototype._getTextureDataFromSource=function(){var e;return this.isSrcP5Image?e=this.src.canvas:this.isSrcMediaElement||this.isSrcP5Graphics||this.isSrcHTMLElement?e=this.src.elt:this.isImageData&&(e=this.src),e},o.default.Texture.prototype.init=function(e){var t=this._renderer.GL;if(this.glTex=t.createTexture(),this.glWrapS=this._renderer.textureWrapX,this.glWrapT=this._renderer.textureWrapY,this.setWrapMode(this.glWrapS,this.glWrapT),this.bindTexture(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,this.glMagFilter),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,this.glMinFilter),0===this.width||0===this.height||this.isSrcMediaElement&&!this.src.loadedmetadata){var r=new Uint8Array([1,1,1,1]);t.texImage2D(this.glTarget,0,t.RGBA,1,1,0,this.glFormat,t.UNSIGNED_BYTE,r)}else t.texImage2D(this.glTarget,0,this.glFormat,this.glFormat,t.UNSIGNED_BYTE,e)},o.default.Texture.prototype.update=function(){var e=this.src;if(0===e.width||0===e.height)return!1;var t=this._getTextureDataFromSource(),r=!1,n=this._renderer.GL;return t.width!==this.width||t.height!==this.height?(r=!0,this.width=t.width,this.height=t.height,this.isSrcP5Image?e.setModified(!1):(this.isSrcMediaElement||this.isSrcHTMLElement)&&e.setModified(!0)):this.isSrcP5Image?e.isModified()&&(r=!0,e.setModified(!1)):this.isSrcMediaElement?e.isModified()?(r=!0,e.setModified(!1)):e.loadedmetadata&&this._videoPrevUpdateTime!==e.time()&&(this._videoPrevUpdateTime=e.time(),r=!0):this.isImageData?e._dirty&&(r=!(e._dirty=!1)):r=!0,r&&(this.bindTexture(),n.texImage2D(this.glTarget,0,this.glFormat,this.glFormat,n.UNSIGNED_BYTE,t)),r},o.default.Texture.prototype.bindTexture=function(){return this._renderer.GL.bindTexture(this.glTarget,this.glTex),this},o.default.Texture.prototype.unbindTexture=function(){this._renderer.GL.bindTexture(this.glTarget,null)},o.default.Texture.prototype.setInterpolation=function(e,t){var r=this._renderer.GL;e===s.NEAREST?this.glMinFilter=r.NEAREST:this.glMinFilter=r.LINEAR,t===s.NEAREST?this.glMagFilter=r.NEAREST:this.glMagFilter=r.LINEAR,this.bindTexture(),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,this.glMinFilter),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,this.glMagFilter),this.unbindTexture()},o.default.Texture.prototype.setWrapMode=function(e,t){function r(e){return 0==(e&e-1)}var n=this._renderer.GL,o=r(this.width),i=r(this.height);e===s.REPEAT?o&&i?this.glWrapS=n.REPEAT:(console.warn("You tried to set the wrap mode to REPEAT but the texture size is not a power of two. Setting to CLAMP instead"),this.glWrapS=n.CLAMP_TO_EDGE):e===s.MIRROR?o&&i?this.glWrapS=n.MIRRORED_REPEAT:(console.warn("You tried to set the wrap mode to MIRROR but the texture size is not a power of two. Setting to CLAMP instead"),this.glWrapS=n.CLAMP_TO_EDGE):this.glWrapS=n.CLAMP_TO_EDGE,t===s.REPEAT?o&&i?this.glWrapT=n.REPEAT:(console.warn("You tried to set the wrap mode to REPEAT but the texture size is not a power of two. Setting to CLAMP instead"),this.glWrapT=n.CLAMP_TO_EDGE):t===s.MIRROR?o&&i?this.glWrapT=n.MIRRORED_REPEAT:(console.warn("You tried to set the wrap mode to MIRROR but the texture size is not a power of two. Setting to CLAMP instead"),this.glWrapT=n.CLAMP_TO_EDGE):this.glWrapT=n.CLAMP_TO_EDGE,this.bindTexture(),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,this.glWrapS),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,this.glWrapT),this.unbindTexture()};var i=o.default.Texture;r.default=i},{"../core/constants":250,"../core/main":260,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.typed-array.copy-within":194,"core-js/modules/es.typed-array.every":195,"core-js/modules/es.typed-array.fill":196,"core-js/modules/es.typed-array.filter":197,"core-js/modules/es.typed-array.find":199,"core-js/modules/es.typed-array.find-index":198,"core-js/modules/es.typed-array.for-each":202,"core-js/modules/es.typed-array.includes":203,"core-js/modules/es.typed-array.index-of":204,"core-js/modules/es.typed-array.iterator":207,"core-js/modules/es.typed-array.join":208,"core-js/modules/es.typed-array.last-index-of":209,"core-js/modules/es.typed-array.map":210,"core-js/modules/es.typed-array.reduce":212,"core-js/modules/es.typed-array.reduce-right":211,"core-js/modules/es.typed-array.reverse":213,"core-js/modules/es.typed-array.set":214,"core-js/modules/es.typed-array.slice":215,"core-js/modules/es.typed-array.some":216,"core-js/modules/es.typed-array.sort":217,"core-js/modules/es.typed-array.subarray":218,"core-js/modules/es.typed-array.to-locale-string":219,"core-js/modules/es.typed-array.to-string":220,"core-js/modules/es.typed-array.uint8-array":223}],317:[function(e,t,r){"use strict";function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e("core-js/modules/es.symbol"),e("core-js/modules/es.symbol.description"),e("core-js/modules/es.symbol.iterator"),e("core-js/modules/es.array.iterator"),e("core-js/modules/es.object.to-string"),e("core-js/modules/es.regexp.exec"),e("core-js/modules/es.string.iterator"),e("core-js/modules/es.string.split"),e("core-js/modules/es.string.sub"),e("core-js/modules/web.dom-collections.iterator");var n,G=(n=e("../core/main"))&&n.__esModule?n:{default:n},A=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=n?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(r,o,i):r[o]=e[o]}r.default=e,t&&t.set(e,r);return r}(e("../core/constants"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}e("./p5.Shader"),e("./p5.RendererGL.Retained"),G.default.RendererGL.prototype._applyTextProperties=function(){},G.default.RendererGL.prototype.textWidth=function(e){return this._isOpenType()?this._textFont._textWidth(e,this._textSize):0};function o(e,t){this.width=e,this.height=t,this.infos=[],this.findImage=function(e){var t,r,n=this.width*this.height;if(n<e)throw new Error("font is too complex to render in 3D");for(var o=this.infos.length-1;0<=o;--o){var i=this.infos[o];if(i.index+e<n){r=(t=i).imageData;break}}if(!t){try{r=new ImageData(this.width,this.height)}catch(e){var a=document.getElementsByTagName("canvas")[0],s=!a;a||((a=document.createElement("canvas")).style.display="none",document.body.appendChild(a));var l=a.getContext("2d");l&&(r=l.createImageData(this.width,this.height)),s&&document.body.removeChild(a)}t={index:0,imageData:r},this.infos.push(t)}var u=t.index;return t.index+=e,r._dirty=!0,{imageData:r,index:u}}}function V(e,t,r,n,o){var i=e.imageData.data,a=4*e.index++;i[a++]=t,i[a++]=r,i[a++]=n,i[a++]=o}function R(e){this.font=e,this.strokeImageInfos=new o(64,64),this.colDimImageInfos=new o(64,64),this.rowDimImageInfos=new o(64,64),this.colCellImageInfos=new o(64,64),this.rowCellImageInfos=new o(64,64),this.glyphInfos={},this.getGlyphInfo=function(e){var t=this.glyphInfos[e.index];if(t)return t;var r,n=e.getBoundingBox(),o=n.x1,i=n.y1,a=n.x2-o,s=n.y2-i,l=e.path.commands;if(0==a||0==s||!l.length)return this.glyphInfos[e.index]={};var u,c,d,f,h=[],p=[],y=[];for(r=8;0<=r;--r)y.push([]);for(r=8;0<=r;--r)p.push([]);function m(e,t,r){var n=h.length;function o(e,t,r){for(var n=e.length;0<n--;){var o=e[n];o<t&&(t=o),r<o&&(r=o)}return{min:t,max:r}}h.push(r);for(var i=o(e,1,0),a=Math.max(Math.floor(9*i.min),0),s=Math.min(Math.ceil(9*i.max),9),l=a;l<s;++l)y[l].push(n);for(var u=o(t,1,0),c=Math.max(Math.floor(9*u.min),0),d=Math.min(Math.ceil(9*u.max),9),f=c;f<d;++f)p[f].push(n)}function g(e){return(t=(n=255)*e)<(r=0)?r:n<t?n:t;var t,r,n}function w(e,t,r,n){this.p0=e,this.c0=t,this.c1=r,this.p1=n,this.toQuadratic=function(){return{x:this.p0.x,y:this.p0.y,x1:this.p1.x,y1:this.p1.y,cx:(3*(this.c0.x+this.c1.x)-(this.p0.x+this.p1.x))/4,cy:(3*(this.c0.y+this.c1.y)-(this.p0.y+this.p1.y))/4}},this.quadError=function(){return G.default.Vector.sub(G.default.Vector.sub(this.p1,this.p0),G.default.Vector.mult(G.default.Vector.sub(this.c1,this.c0),3)).mag()/2},this.split=function(e){var t=G.default.Vector.lerp(this.p0,this.c0,e),r=G.default.Vector.lerp(this.c0,this.c1,e),n=G.default.Vector.lerp(t,r,e);this.c1=G.default.Vector.lerp(this.c1,this.p1,e),this.c0=G.default.Vector.lerp(r,this.c1,e);var o=G.default.Vector.lerp(n,this.c0,e),i=new w(this.p0,t,n,o);return this.p0=o,i},this.splitInflections=function(){var e=G.default.Vector.sub(this.c0,this.p0),t=G.default.Vector.sub(G.default.Vector.sub(this.c1,this.c0),e),r=G.default.Vector.sub(G.default.Vector.sub(G.default.Vector.sub(this.p1,this.c1),e),G.default.Vector.mult(t,2)),n=[],o=t.x*r.y-t.y*r.x;if(0!==o){var i=e.x*r.y-e.y*r.x,a=e.x*t.y-e.y*t.x,s=i*i-4*o*a;if(0<=s){o<0&&(o=-o,i=-i,a=-a);var l=Math.sqrt(s),u=(-i-l)/(2*o),c=(-i+l)/(2*o);0<u&&u<1&&(n.push(this.split(u)),c=1-(1-c)/(1-u)),0<c&&c<1&&n.push(this.split(c))}}return n.push(this),n}}function v(e,t,r,n,o,i,a,s){var l=new w(new G.default.Vector(e,t),new G.default.Vector(r,n),new G.default.Vector(o,i),new G.default.Vector(a,s)).splitInflections(),u=[],c=30/z,d=!0,f=!1,h=void 0;try{for(var p,y=l[Symbol.iterator]();!(d=(p=y.next()).done);d=!0){for(var m=p.value,g=[],v=void 0;!(.125<=(v=c/m.quadError()));){var b=Math.pow(v,1/3),_=m.split(b),x=m.split(1-b/(1-b));u.push(_),g.push(m),m=x}v<1&&u.push(m.split(.5)),u.push(m),Array.prototype.push.apply(u,g.reverse())}}catch(e){f=!0,h=e}finally{try{d||null==y.return||y.return()}finally{if(f)throw h}}return u}function b(e,t,r,n){m([e,r],[t,n],{x:e,y:t,cx:(e+r)/2,cy:(t+n)/2})}function _(e,t,r,n){return Math.abs(r-e)<1e-5&&Math.abs(n-t)<1e-5}var x=!0,S=!1,j=void 0;try{for(var M,E=l[Symbol.iterator]();!(x=(M=E.next()).done);x=!0){var T=M.value,O=(T.x-o)/a,C=(T.y-i)/s;if(!_(u,c,O,C)){switch(T.type){case"M":d=O,f=C;break;case"L":b(u,c,O,C);break;case"Q":var L=(T.x1-o)/a,P=(T.y1-i)/s;m([u,O,L],[c,C,P],{x:u,y:c,cx:L,cy:P});break;case"Z":_(u,c,d,f)?h.push({x:u,y:c}):(b(u,c,d,f),h.push({x:d,y:f}));break;case"C":for(var k=v(u,c,(T.x1-o)/a,(T.y1-i)/s,(T.x2-o)/a,(T.y2-i)/s,O,C),A=0;A<k.length;A++){var R=k[A].toQuadratic();m([R.x,R.x1,R.cx],[R.y,R.y1,R.cy],R)}break;default:throw new Error("unknown command type: ".concat(T.type))}u=O,c=C}}}catch(e){S=!0,j=e}finally{try{x||null==E.return||E.return()}finally{if(S)throw j}}for(var D=h.length,I=this.strokeImageInfos.findImage(D),U=I.index,N=0;N<D;++N){var F=h[N];V(I,g(F.x),g(F.y),g(F.cx),g(F.cy))}function B(e,t,r){for(var n=e.length,o=t.findImage(n),i=o.index,a=0,s=0;s<n;++s)a+=e[s].length;for(var l=r.findImage(a),u=0;u<n;++u){var c=e[u],d=c.length,f=l.index;V(o,f>>7,127&f,d>>7,127&d);for(var h=0;h<d;++h){var p=c[h]+U;V(l,p>>7,127&p,0,0)}}return{cellImageInfo:l,dimOffset:i,dimImageInfo:o}}return(t=this.glyphInfos[e.index]={glyph:e,uGlyphRect:[n.x1,-n.y1,n.x2,-n.y2],strokeImageInfo:I,strokes:h,colInfo:B(y,this.colDimImageInfos,this.colCellImageInfos),rowInfo:B(p,this.rowDimImageInfos,this.rowCellImageInfos)}).uGridOffset=[t.colInfo.dimOffset,t.rowInfo.dimOffset],t}}var z=Math.sqrt(3);G.default.RendererGL.prototype._renderText=function(e,t,r,n,o){if(this._textFont&&"string"!=typeof this._textFont){if(!(o<=n)&&this._doFill){if(!this._isOpenType())return console.log("WEBGL: only Opentype (.otf) and Truetype (.ttf) fonts are supported"),e;e.push();var i=this._doStroke,a=this.drawMode;this._doStroke=!1,this.drawMode=A.TEXTURE;var s=this._textFont.font,l=this._textFont._fontInfo;l=l||(this._textFont._fontInfo=new R(s));var u=this._textFont._handleAlignment(this,t,r,n),c=this._textSize/s.unitsPerEm;this.translate(u.x,u.y,0),this.scale(c,c,1);var d=this.GL,f=!this._defaultFontShader,h=this._getFontShader();h.init(),h.bindShader(),f&&(h.setUniform("uGridImageSize",[64,64]),h.setUniform("uCellsImageSize",[64,64]),h.setUniform("uStrokeImageSize",[64,64]),h.setUniform("uGridSize",[9,9])),this._applyColorBlend(this.curFillColor);var p=this.retainedMode.geometry.glyph;if(!p){var y=this._textGeom=new G.default.Geometry(1,1,function(){for(var e=0;e<=1;e++)for(var t=0;t<=1;t++)this.vertices.push(new G.default.Vector(t,e,0)),this.uvs.push(t,e)});y.computeFaces().computeNormals(),p=this.createBuffers("glyph",y)}var m=!0,g=!1,v=void 0;try{for(var b,_=this.retainedMode.buffers.text[Symbol.iterator]();!(m=(b=_.next()).done);m=!0){b.value._prepareBuffer(p,h)}}catch(e){g=!0,v=e}finally{try{m||null==_.return||_.return()}finally{if(g)throw v}}this._bindBuffer(p.indexBuffer,d.ELEMENT_ARRAY_BUFFER),h.setUniform("uMaterialColor",this.curFillColor);try{var x=0,w=null,S=s.stringToGlyphs(t),j=!0,M=!1,E=void 0;try{for(var T,O=S[Symbol.iterator]();!(j=(T=O.next()).done);j=!0){var C=T.value;w&&(x+=s.getKerningValue(w,C));var L=l.getGlyphInfo(C);if(L.uGlyphRect){var P=L.rowInfo,k=L.colInfo;h.setUniform("uSamplerStrokes",L.strokeImageInfo.imageData),h.setUniform("uSamplerRowStrokes",P.cellImageInfo.imageData),h.setUniform("uSamplerRows",P.dimImageInfo.imageData),h.setUniform("uSamplerColStrokes",k.cellImageInfo.imageData),h.setUniform("uSamplerCols",k.dimImageInfo.imageData),h.setUniform("uGridOffset",L.uGridOffset),h.setUniform("uGlyphRect",L.uGlyphRect),h.setUniform("uGlyphOffset",x),h.bindTextures(),d.drawElements(d.TRIANGLES,6,this.GL.UNSIGNED_SHORT,0)}x+=C.advanceWidth,w=C}}catch(e){M=!0,E=e}finally{try{j||null==O.return||O.return()}finally{if(M)throw E}}}finally{h.unbindShader(),this._doStroke=i,this.drawMode=a,e.pop()}return e}}else console.log("WEBGL: you must load and set a font before drawing text. See `loadFont` and `textFont` for more details.")}},{"../core/constants":250,"../core/main":260,"./p5.RendererGL.Retained":313,"./p5.Shader":315,"core-js/modules/es.array.iterator":156,"core-js/modules/es.object.to-string":174,"core-js/modules/es.regexp.exec":178,"core-js/modules/es.string.iterator":183,"core-js/modules/es.string.split":188,"core-js/modules/es.string.sub":189,"core-js/modules/es.symbol":193,"core-js/modules/es.symbol.description":191,"core-js/modules/es.symbol.iterator":192,"core-js/modules/web.dom-collections.iterator":226}]},{},[245])(245)});
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.automaticLasers = void 0;
const p5_1 = __importDefault(require("p5"));
const boundary_1 = require("../../js/lightshow/boundary");
const randomParticle_1 = require("../../js/lightshow/randomParticle");
class automaticLasers {
    constructor(toggle, side) {
        this.s = (sketch) => {
            let floors = [];
            let windowX = window.innerWidth;
            let windowY = window.innerHeight;
            let particle;
            sketch.setup = () => {
                const renderer = sketch.createCanvas(windowX, windowY);
                renderer.parent("canvases");
                let startX;
                let finishX;
                for (let i = 0; i < 4; i++) {
                    let xPos;
                    if (this.side === "left") {
                        const wholeLength = windowX / 3;
                        xPos = (i + 1) * (wholeLength / 4) - wholeLength / 5;
                    }
                    else {
                        const wholeLength = windowX / 3;
                        xPos =
                            (i + 1) * (wholeLength / 4) - wholeLength / 5 + wholeLength * 2;
                    }
                    if (i === 0) {
                        startX = Math.floor(xPos);
                    }
                    let x1 = Math.floor(xPos);
                    if (i === 3) {
                        finishX = Math.floor(xPos) + Math.floor(windowX / 12);
                    }
                    let x2 = Math.floor(xPos) + Math.floor(windowX / 12);
                    let y1 = windowY - 70;
                    let y2 = windowY - 50;
                    floors[i] = new boundary_1.Boundary(sketch, x1, y1, x2, y2);
                }
                particle = new randomParticle_1.randomParticle(sketch, generateColors(), [startX + 150, 300], [startX, finishX, windowY]);
            };
            sketch.draw = () => {
                if (this.toggle) {
                    sketch.clear();
                    particle.update();
                    particle.show();
                    particle.look(floors);
                }
                else {
                    sketch.clear();
                }
            };
            const setSize = () => {
                windowX = window.innerWidth;
                windowY = window.innerHeight;
                sketch.resizeCanvas(windowX, windowY);
                for (let i = 0; i < floors.length; i++) {
                    let xPos;
                    if (this.side === "left") {
                        const centerLength = windowX / 3;
                        xPos = (i + 1) * (centerLength / 4) - centerLength / 5;
                    }
                    else {
                        const centerLength = windowX / 3;
                        xPos =
                            (i + 1) * (centerLength / 4) - centerLength / 5 + centerLength * 2;
                    }
                    let x1 = Math.floor(xPos);
                    let x2 = Math.floor(xPos) + Math.floor(windowX / 12);
                    let y1 = windowY - 70;
                    let y2 = windowY - 50;
                    floors[i].updateLocation(x1, x2, y1, y2);
                }
            };
            function generateColors() {
                const output = [];
                while (output.length < 4) {
                    const r = sketch.random(0, 255);
                    const g = sketch.random(0, 255);
                    const b = sketch.random(0, 255);
                    output.push(sketch.color(r, g, b));
                }
                return output;
            }
            window.addEventListener("mousedown", (e) => {
                particle.updateColors(generateColors());
            });
            window.addEventListener("resize", setSize);
        };
        this.toggle = toggle;
        this.side = side;
    }
    getP5() {
        return new p5_1.default(this.s);
    }
    setToggle() {
        this.toggle = !this.toggle;
    }
}
exports.automaticLasers = automaticLasers;

},{"../../js/lightshow/boundary":5,"../../js/lightshow/randomParticle":7,"p5":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boundary = void 0;
class Boundary {
    constructor(sketch, x1, y1, x2, y2) {
        this.sketch = sketch;
        this.a = sketch.createVector(x1, y1);
        this.b = sketch.createVector(x2, y2);
    }
    updateLocation(x1, x2, y1, y2) {
        this.a = this.sketch.createVector(x1, y1);
        this.b = this.sketch.createVector(x2, y2);
    }
}
exports.Boundary = Boundary;

},{}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const ray_1 = require("./ray");
const p5_1 = __importDefault(require("p5"));
class Particle {
    constructor(sketch, colors) {
        this.sketch = sketch;
        this.pos = sketch.createVector(200, 100);
        this.rays = [];
        this.colorSelection = colors;
        for (let angle = 0; angle < 360; angle += 1) {
            this.rays.push(new ray_1.Ray(sketch, this.pos, sketch.radians(angle)));
        }
    }
    updateColors(colors) {
        this.colorSelection = colors;
    }
    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
    look(walls) {
        let i = 0;
        for (let ray of this.rays) {
            i++;
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5_1.default.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                if (i < 75) {
                    this.sketch.stroke(this.colorSelection[0]);
                }
                else if (i < 100) {
                    this.sketch.stroke(this.colorSelection[1]);
                }
                else if (i < 175) {
                    this.sketch.stroke(this.colorSelection[2]);
                }
                else {
                    this.sketch.stroke(this.colorSelection[3]);
                }
                this.sketch.line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
    show() {
        for (let ray of this.rays) {
            ray.show();
        }
    }
}
exports.Particle = Particle;

},{"./ray":8,"p5":3}],7:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomParticle = void 0;
const ray_1 = require("./ray");
const p5_1 = __importDefault(require("p5"));
class randomParticle {
    constructor(sketch, colors, startPos, bounds) {
        this.sketch = sketch;
        this.pos = sketch.createVector(startPos[0], startPos[1]);
        this.vel = sketch.createVector();
        this.acc = sketch.createVector();
        this.rays = [];
        this.colorSelection = colors;
        this.bounds = bounds;
        for (let angle = 0; angle < 360; angle += 1) {
            this.rays.push(new ray_1.Ray(sketch, this.pos, sketch.radians(angle)));
        }
    }
    updateColors(colors) {
        this.colorSelection = colors;
    }
    update() {
        const dir = p5_1.default.Vector.random2D().mult(0.1);
        this.acc.add(dir);
        this.move();
        this.show();
    }
    move() {
        this.vel.add(this.acc);
        if (!this.checkXinBounds(this.pos.x + this.vel.x)) {
            this.vel.x = this.vel.x * -1;
        }
        if (!this.checkYinBounds(this.pos.y + this.vel.y)) {
            this.vel.y = this.vel.y * -1;
        }
        this.pos.add(this.vel);
        this.vel.limit(5);
        this.acc.mult(0);
    }
    look(floors) {
        let i = 0;
        for (let ray of this.rays) {
            i++;
            let closest = null;
            let record = Infinity;
            for (let floor of floors) {
                const pt = ray.cast(floor);
                if (pt) {
                    const d = p5_1.default.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                if (i < 75) {
                    this.sketch.stroke(this.colorSelection[0]);
                }
                else if (i < 100) {
                    this.sketch.stroke(this.colorSelection[1]);
                }
                else if (i < 175) {
                    this.sketch.stroke(this.colorSelection[2]);
                }
                else {
                    this.sketch.stroke(this.colorSelection[3]);
                }
                this.sketch.line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
    show() {
        for (let ray of this.rays) {
            ray.show();
        }
    }
    checkXinBounds(x) {
        const x0 = this.bounds[0];
        const x1 = this.bounds[1];
        return x > x0 && x < x1;
    }
    checkYinBounds(y) {
        const y0 = 0;
        const y1 = this.bounds[2] - 200;
        return y > y0 && y < y1;
    }
}
exports.randomParticle = randomParticle;

},{"./ray":8,"p5":3}],8:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ray = void 0;
const p5_1 = __importDefault(require("p5"));
class Ray {
    constructor(sketch, pos, angle) {
        this.sketch = sketch;
        this.pos = pos;
        this.dir = p5_1.default.Vector.fromAngle(angle);
    }
    show() {
        this.sketch.stroke(255);
        this.sketch.push();
        this.sketch.translate(this.pos.x, this.pos.y);
        this.sketch.line(0, 0, this.dir.x * 10, this.dir.y * 10);
        this.sketch.pop();
    }
    cast(floor) {
        const x1 = floor.a.x;
        const y1 = floor.a.y;
        const x2 = floor.b.x;
        const y2 = floor.b.y;
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return;
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            const pt = this.sketch.createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }
        else {
            return;
        }
    }
}
exports.Ray = Ray;

},{"p5":3}],9:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControlledLasers = void 0;
const p5_1 = __importDefault(require("p5"));
const boundary_1 = require("../../js/lightshow/boundary");
const particle_1 = require("../../js/lightshow/particle");
class userControlledLasers {
    constructor(toggle) {
        this.s = (sketch) => {
            let floors = [];
            let windowX = window.innerWidth;
            let windowY = window.innerHeight;
            let particle;
            sketch.setup = () => {
                const renderer = sketch.createCanvas(windowX, windowY);
                renderer.parent("canvases");
                for (let i = 0; i < 4; i++) {
                    const centerLength = windowX / 3;
                    const xPos = (i + 1) * (centerLength / 4) - centerLength / 5 + centerLength;
                    let x1 = Math.floor(xPos);
                    let x2 = Math.floor(xPos) + Math.floor(windowX / 12);
                    let y1 = windowY - 50;
                    let y2 = windowY - 70;
                    floors[i] = new boundary_1.Boundary(sketch, x1, y1, x2, y2);
                }
                particle = new particle_1.Particle(sketch, generateColors());
            };
            sketch.draw = () => {
                if (this.toggle) {
                    sketch.clear();
                    particle.update(sketch.mouseX, sketch.mouseY);
                    particle.show();
                    particle.look(floors);
                }
                else {
                    sketch.clear();
                }
            };
            function setSize() {
                windowX = window.innerWidth;
                windowY = window.innerHeight;
                sketch.resizeCanvas(windowX, windowY);
                for (let i = 0; i < floors.length; i++) {
                    const centerLength = windowX / 3;
                    const xPos = (i + 1) * (centerLength / 4) - centerLength / 5 + centerLength;
                    let x1 = Math.floor(xPos);
                    let x2 = Math.floor(xPos) + Math.floor(windowX / 12);
                    let y1 = windowY - 50;
                    let y2 = windowY - 70;
                    floors[i].updateLocation(x1, x2, y1, y2);
                }
            }
            function generateColors() {
                const output = [];
                while (output.length < 4) {
                    const r = sketch.random(0, 255);
                    const g = sketch.random(0, 255);
                    const b = sketch.random(0, 255);
                    output.push(sketch.color(r, g, b));
                }
                return output;
            }
            window.addEventListener("mousedown", (e) => {
                particle = new particle_1.Particle(sketch, generateColors());
            });
            window.addEventListener("resize", setSize);
        };
        this.toggle = toggle;
    }
    getP5() {
        return new p5_1.default(this.s);
    }
    setToggle() {
        this.toggle = !this.toggle;
    }
}
exports.userControlledLasers = userControlledLasers;

},{"../../js/lightshow/boundary":5,"../../js/lightshow/particle":6,"p5":3}],10:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gsap_1 = __importDefault(require("gsap"));
const DrawSVGPlugin_1 = __importDefault(require("gsap/DrawSVGPlugin"));
const userControlled_1 = require("./lightshow/userControlled");
const automaticLasers_1 = require("./lightshow/automaticLasers");
gsap_1.default.registerPlugin(DrawSVGPlugin_1.default);
window.addEventListener('touchmove', function () { });
const textFireworkArray = Array.from(document.getElementsByClassName("fireworkText"));
const otherFireworkArray = Array.from(document.getElementsByClassName("firework"));
const masks = Array.from(document.getElementsByClassName("mask"));
document.addEventListener("click", fireRocket);
const mainTimeline = gsap_1.default
    .timeline()
    .from("#background_buildings", { y: +150, duration: 2 })
    .from("#foreground_buildings", { y: +100, duration: 2, stagger: 1 }, "-=1.5")
    .add(animateText())
    .addLabel("showButton")
    .add(showButton(), "showButton")
    .addLabel("looping")
    .add(loopFireworks(), "-=2")
    .add(animateSignature());
function loopFireworks() {
    const timeline = gsap_1.default.timeline({ repeat: -1 });
    timeline.data = "loopFireworks";
    timeline.eventCallback("onRepeat", () => {
        if (toggle) {
            timeline.pause();
        }
    });
    for (let firework of otherFireworkArray) {
        let fireworkAndShadowArray;
        if (firework) {
            fireworkAndShadowArray = Array.from(firework.children);
        }
        if (fireworkAndShadowArray) {
            timeline.add(animateFirework(fireworkAndShadowArray[0], fireworkAndShadowArray[1], fireworkAndShadowArray[2]), "<" + (Math.random() * 2 - 1));
        }
    }
    return timeline;
}
function animateText() {
    const timelineTextAndFireworks = gsap_1.default.timeline({ delay: 0 });
    for (let mask of masks) {
        gsap_1.default.set("#" + mask.id, { scale: 0 });
    }
    const tracer = document.getElementById("tracer1");
    timelineTextAndFireworks.add(createTracer(tracer), 0);
    let i = 0;
    for (let mask of masks) {
        let fireworkAndShadowArray;
        if (textFireworkArray[i]) {
            fireworkAndShadowArray = Array.from(textFireworkArray[i].children);
        }
        if (fireworkAndShadowArray) {
            let delay;
            i === 0 ? (delay = 0.5) : (delay = 0);
            timelineTextAndFireworks
                .add(animateTextFirework(fireworkAndShadowArray[0], fireworkAndShadowArray[1]), "<" + delay)
                .to("#" + mask.id, { duration: 0.2, scale: 1, stagger: 0.5, transformOrigin: "center" }, "<0.2");
        }
        i++;
    }
    return timelineTextAndFireworks;
}
function animateFirework(firework, shadow, tracer) {
    const timeline = gsap_1.default.timeline();
    timeline
        .add(createTracer(tracer), 0)
        .add(animateTextFirework(firework, shadow), 0.5);
    return timeline;
}
function createTracer(tracer) {
    const timeline = gsap_1.default.timeline();
    timeline
        .from(tracer, { y: 800, duration: 0.4, ease: "power4.out" }, 0)
        .to(tracer, { opacity: 1, duration: 0.1 }, 0)
        .to(tracer, { opacity: 0.4, duration: 0.2 }, 0.1)
        .to(tracer, { opacity: 0, duration: 0.1 }, 0.3);
    return timeline;
}
function animateTextFirework(firework, shadow) {
    const timeline = gsap_1.default.timeline();
    timeline
        .to(firework, {
        backgroundPosition: "-9216px 0px",
        ease: "steps(18)",
        duration: 1.2,
    })
        .to(firework, { opacity: 1 }, 0)
        .to(firework, { opacity: 0.8, duration: 0.5 }, 0)
        .to(firework, { opacity: 0, duration: 0.7 }, 0.5)
        .to(shadow, {
        scale: 2.5,
        ease: "power4.out",
        duration: 1.5,
    }, 0)
        .to(shadow, { opacity: 1 }, 0)
        .to(shadow, { opacity: 0.8, duration: 0.4 }, 0)
        .to(shadow, { opacity: 0, duration: 1 }, 0.7)
        .to("#background_buildings", { fill: "#1A1818" }, 0.0)
        .to("#background_buildings", { duration: 0.8, fill: "#141313" }, 0.1)
        .to("#lit_up_background", { opacity: 1 }, 0)
        .to("#lit_up_background", { duration: 0.1, opacity: 0.4 }, 0.1)
        .to("#lit_up_background", { duration: 0.5, opacity: 0 }, 0.2);
    return timeline;
}
function animateSignature() {
    const timeline = gsap_1.default.timeline();
    timeline
        .fromTo("#soovib", { drawSVG: "0% 0%" }, { duration: 4, drawSVG: "100% 0%", ease: "power1.in" })
        .fromTo("#i-tapp-1", { drawSVG: "0% 0%" }, { duration: 0.5, drawSVG: "100% 0%" })
        .fromTo("#raiko", { drawSVG: "0% 0%" }, { duration: 3, drawSVG: "100% 0%" })
        .fromTo("#i-tapp-2", { drawSVG: "0% 0%" }, { duration: 0.2, drawSVG: "100% 0%" })
        .fromTo("#kittus", { drawSVG: "0% 0%" }, { duration: 3, drawSVG: "100% 0%" })
        .fromTo("#tt-kriips", { drawSVG: "0% 0%" }, { duration: 0.5, drawSVG: "100% 0%", ease: "power4.out" })
        .fromTo("#i-tapp-3", { drawSVG: "0% 0%" }, { duration: 0.2, drawSVG: "100% 0%" });
    return timeline;
}
function fireRocket(event) {
    let fireworkObject;
    if (!isOnButton() && !toggle) {
        const newFireworkIndex = createFireworkIndex();
        fireworkObject = document.createElement("div");
        fireworkObject.classList.add("firework");
        fireworkObject.id = "fire" + newFireworkIndex;
        fireworkObject.style.position = "absolute";
        fireworkObject.style.left = event.clientX - 250 + "px";
        fireworkObject.style.top = event.clientY + 23 + "px";
        const colors = ["yellow", "red", "blue", "green", "white", "colorful"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const sparkles = document.createElement("div");
        sparkles.classList.add("big", randomColor);
        sparkles.id = randomColor + newFireworkIndex;
        const shadow = document.createElement("div");
        shadow.classList.add("shadow", randomColor);
        shadow.id = "shadow" + newFireworkIndex;
        const tracer = document.createElement("div");
        tracer.classList.add("tracer");
        tracer.id = "tracer" + newFireworkIndex;
        fireworkObject.appendChild(sparkles);
        fireworkObject.appendChild(shadow);
        fireworkObject.appendChild(tracer);
        document.getElementById("firedRockets").appendChild(fireworkObject);
        animateFirework(sparkles, shadow, tracer).eventCallback("onComplete", removeFirework);
    }
    function removeFirework() {
        document.getElementById("firedRockets").removeChild(fireworkObject);
    }
    function createFireworkIndex() {
        const array = document.getElementsByClassName("firework");
        return parseInt(array[array.length - 1].id.substring(4)) + 1;
    }
    function isOnButton() {
        var rect = document.getElementById("laser-btn").getBoundingClientRect();
        var x = event.clientX;
        if (x < rect.left || x >= rect.right)
            return false;
        var y = event.clientY;
        if (y < rect.top || y >= rect.bottom)
            return false;
        return true;
    }
}
let toggle = false;
const button = document.getElementById("laser-btn");
button.onclick = () => {
    button.classList.toggle("active");
    toggle = !toggle;
    updateToggles();
    if (!toggle) {
        mainTimeline.resume();
        for (let timeline of mainTimeline.getChildren(false, false, true)) {
            if (timeline.data === "loopFireworks") {
                timeline.resume();
            }
        }
    }
};
function showButton() {
    return gsap_1.default.to("#laser-btn", { opacity: 1, duration: 3, ease: "power4.out" });
}
let userControlled = new userControlled_1.userControlledLasers(toggle);
userControlled.getP5();
let automatic1 = new automaticLasers_1.automaticLasers(toggle, "left");
automatic1.getP5();
let automatic2 = new automaticLasers_1.automaticLasers(toggle, "right");
automatic2.getP5();
function updateToggles() {
    userControlled.setToggle();
    automatic1.setToggle();
    automatic2.setToggle();
}

},{"./lightshow/automaticLasers":4,"./lightshow/userControlled":9,"gsap":2,"gsap/DrawSVGPlugin":1}]},{},[10]);
