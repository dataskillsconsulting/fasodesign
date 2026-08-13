var e = (e, t) => () => (
  t || (e((t = { exports: {} }).exports, t), (e = null)),
  t.exports
);
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var t = e((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.consumer`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.for(`react.activity`),
      p = Symbol.iterator;
    function m(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (p && e[p]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var h = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      g = Object.assign,
      _ = {};
    function v(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = _),
        (this.updater = n || h));
    }
    ((v.prototype.isReactComponent = {}),
      (v.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `takes an object of state variables to update or a function which returns an object of state variables.`,
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (v.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }));
    function y() {}
    y.prototype = v.prototype;
    function b(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = _),
        (this.updater = n || h));
    }
    var x = (b.prototype = new y());
    ((x.constructor = b), g(x, v.prototype), (x.isPureReactComponent = !0));
    var ee = Array.isArray;
    function S() {}
    var C = { H: null, A: null, T: null, S: null },
      te = Object.prototype.hasOwnProperty;
    function ne(e, n, r) {
      var i = r.ref;
      return {
        $$typeof: t,
        type: e,
        key: n,
        ref: i === void 0 ? null : i,
        props: r,
      };
    }
    function re(e, t) {
      return ne(e.type, t, e.props);
    }
    function w(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    function ie(e) {
      var t = { "=": `=0`, ":": `=2` };
      return (
        `$` +
        e.replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    var ae = /\/+/g;
    function oe(e, t) {
      return typeof e == `object` && e && e.key != null
        ? ie(`` + e.key)
        : t.toString(36);
    }
    function T(e) {
      switch (e.status) {
        case `fulfilled`:
          return e.value;
        case `rejected`:
          throw e.reason;
        default:
          switch (
            (typeof e.status == `string`
              ? e.then(S, S)
              : ((e.status = `pending`),
                e.then(
                  function (t) {
                    e.status === `pending` &&
                      ((e.status = `fulfilled`), (e.value = t));
                  },
                  function (t) {
                    e.status === `pending` &&
                      ((e.status = `rejected`), (e.reason = t));
                  },
                )),
            e.status)
          ) {
            case `fulfilled`:
              return e.value;
            case `rejected`:
              throw e.reason;
          }
      }
      throw e;
    }
    function se(e, r, i, a, o) {
      var s = typeof e;
      (s === `undefined` || s === `boolean`) && (e = null);
      var c = !1;
      if (e === null) c = !0;
      else
        switch (s) {
          case `bigint`:
          case `string`:
          case `number`:
            c = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                c = !0;
                break;
              case d:
                return ((c = e._init), se(c(e._payload), r, i, a, o));
            }
        }
      if (c)
        return (
          (o = o(e)),
          (c = a === `` ? `.` + oe(e, 0) : a),
          ee(o)
            ? ((i = ``),
              c != null && (i = c.replace(ae, `$&/`) + `/`),
              se(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (w(o) &&
                (o = re(
                  o,
                  i +
                    (o.key == null || (e && e.key === o.key)
                      ? ``
                      : (`` + o.key).replace(ae, `$&/`) + `/`) +
                    c,
                )),
              r.push(o)),
          1
        );
      c = 0;
      var l = a === `` ? `.` : a + `:`;
      if (ee(e))
        for (var u = 0; u < e.length; u++)
          ((a = e[u]), (s = l + oe(a, u)), (c += se(a, r, i, s, o)));
      else if (((u = m(e)), typeof u == `function`))
        for (e = u.call(e), u = 0; !(a = e.next()).done; )
          ((a = a.value), (s = l + oe(a, u++)), (c += se(a, r, i, s, o)));
      else if (s === `object`) {
        if (typeof e.then == `function`) return se(T(e), r, i, a, o);
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`,
          )
        );
      }
      return c;
    }
    function ce(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        se(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function le(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (t) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = t));
            },
            function (t) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = t));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var E =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (
                typeof window == `object` &&
                typeof window.ErrorEvent == `function`
              ) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == `object` &&
                typeof process.emit == `function`
              ) {
                process.emit(`uncaughtException`, e);
                return;
              }
              console.error(e);
            },
      D = {
        map: ce,
        forEach: function (e, t, n) {
          ce(
            e,
            function () {
              t.apply(this, arguments);
            },
            n,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            ce(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            ce(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!w(e))
            throw Error(
              `React.Children.only expected to receive a single React element child.`,
            );
          return e;
        },
      };
    ((e.Activity = f),
      (e.Children = D),
      (e.Component = v),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = b),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C),
      (e.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (e) {
          return C.H.useMemoCache(e);
        },
      }),
      (e.cache = function (e) {
        return function () {
          return e.apply(null, arguments);
        };
      }),
      (e.cacheSignal = function () {
        return null;
      }),
      (e.cloneElement = function (e, t, n) {
        if (e == null)
          throw Error(
            `The argument must be a React element, but you passed ` + e + `.`,
          );
        var r = g({}, e.props),
          i = e.key;
        if (t != null)
          for (a in (t.key !== void 0 && (i = `` + t.key), t))
            !te.call(t, a) ||
              a === `key` ||
              a === `__self` ||
              a === `__source` ||
              (a === `ref` && t.ref === void 0) ||
              (r[a] = t[a]);
        var a = arguments.length - 2;
        if (a === 1) r.children = n;
        else if (1 < a) {
          for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
          r.children = o;
        }
        return ne(e.type, i, r);
      }),
      (e.createContext = function (e) {
        return (
          (e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (e.Provider = e),
          (e.Consumer = { $$typeof: o, _context: e }),
          e
        );
      }),
      (e.createElement = function (e, t, n) {
        var r,
          i = {},
          a = null;
        if (t != null)
          for (r in (t.key !== void 0 && (a = `` + t.key), t))
            te.call(t, r) &&
              r !== `key` &&
              r !== `__self` &&
              r !== `__source` &&
              (i[r] = t[r]);
        var o = arguments.length - 2;
        if (o === 1) i.children = n;
        else if (1 < o) {
          for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
          i.children = s;
        }
        if (e && e.defaultProps)
          for (r in ((o = e.defaultProps), o)) i[r] === void 0 && (i[r] = o[r]);
        return ne(e, a, i);
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: c, render: e };
      }),
      (e.isValidElement = w),
      (e.lazy = function (e) {
        return {
          $$typeof: d,
          _payload: { _status: -1, _result: e },
          _init: le,
        };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = C.T,
          n = {};
        C.T = n;
        try {
          var r = e(),
            i = C.S;
          (i !== null && i(n, r),
            typeof r == `object` &&
              r &&
              typeof r.then == `function` &&
              r.then(S, E));
        } catch (e) {
          E(e);
        } finally {
          (t !== null && n.types !== null && (t.types = n.types), (C.T = t));
        }
      }),
      (e.unstable_useCacheRefresh = function () {
        return C.H.useCacheRefresh();
      }),
      (e.use = function (e) {
        return C.H.use(e);
      }),
      (e.useActionState = function (e, t, n) {
        return C.H.useActionState(e, t, n);
      }),
      (e.useCallback = function (e, t) {
        return C.H.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return C.H.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e, t) {
        return C.H.useDeferredValue(e, t);
      }),
      (e.useEffect = function (e, t) {
        return C.H.useEffect(e, t);
      }),
      (e.useEffectEvent = function (e) {
        return C.H.useEffectEvent(e);
      }),
      (e.useId = function () {
        return C.H.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return C.H.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return C.H.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return C.H.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return C.H.useMemo(e, t);
      }),
      (e.useOptimistic = function (e, t) {
        return C.H.useOptimistic(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return C.H.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return C.H.useRef(e);
      }),
      (e.useState = function (e) {
        return C.H.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return C.H.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return C.H.useTransition();
      }),
      (e.version = `19.2.8`));
  }),
  n = e((e, n) => {
    n.exports = t();
  }),
  r = e((e) => {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      a: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
        else break a;
      }
    }
    function n(e) {
      return e.length === 0 ? null : e[0];
    }
    function r(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
          var s = 2 * (r + 1) - 1,
            c = e[s],
            l = s + 1,
            u = e[l];
          if (0 > i(c, n))
            l < a && 0 > i(u, c)
              ? ((e[r] = u), (e[l] = n), (r = l))
              : ((e[r] = c), (e[s] = n), (r = s));
          else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
          else break a;
        }
      }
      return t;
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n === 0 ? e.id - t.id : n;
    }
    if (
      ((e.unstable_now = void 0),
      typeof performance == `object` && typeof performance.now == `function`)
    ) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var c = [],
      l = [],
      u = 1,
      d = null,
      f = 3,
      p = !1,
      m = !1,
      h = !1,
      g = !1,
      _ = typeof setTimeout == `function` ? setTimeout : null,
      v = typeof clearTimeout == `function` ? clearTimeout : null,
      y = typeof setImmediate < `u` ? setImmediate : null;
    function b(e) {
      for (var i = n(l); i !== null; ) {
        if (i.callback === null) r(l);
        else if (i.startTime <= e)
          (r(l), (i.sortIndex = i.expirationTime), t(c, i));
        else break;
        i = n(l);
      }
    }
    function x(e) {
      if (((h = !1), b(e), !m))
        if (n(c) !== null) ((m = !0), ee || ((ee = !0), w()));
        else {
          var t = n(l);
          t !== null && oe(x, t.startTime - e);
        }
    }
    var ee = !1,
      S = -1,
      C = 5,
      te = -1;
    function ne() {
      return g ? !0 : !(e.unstable_now() - te < C);
    }
    function re() {
      if (((g = !1), ee)) {
        var t = e.unstable_now();
        te = t;
        var i = !0;
        try {
          a: {
            ((m = !1), h && ((h = !1), v(S), (S = -1)), (p = !0));
            var a = f;
            try {
              b: {
                for (
                  b(t), d = n(c);
                  d !== null && !(d.expirationTime > t && ne());
                ) {
                  var o = d.callback;
                  if (typeof o == `function`) {
                    ((d.callback = null), (f = d.priorityLevel));
                    var s = o(d.expirationTime <= t);
                    if (((t = e.unstable_now()), typeof s == `function`)) {
                      ((d.callback = s), b(t), (i = !0));
                      break b;
                    }
                    (d === n(c) && r(c), b(t));
                  } else r(c);
                  d = n(c);
                }
                if (d !== null) i = !0;
                else {
                  var u = n(l);
                  (u !== null && oe(x, u.startTime - t), (i = !1));
                }
              }
              break a;
            } finally {
              ((d = null), (f = a), (p = !1));
            }
            i = void 0;
          }
        } finally {
          i ? w() : (ee = !1);
        }
      }
    }
    var w;
    if (typeof y == `function`)
      w = function () {
        y(re);
      };
    else if (typeof MessageChannel < `u`) {
      var ie = new MessageChannel(),
        ae = ie.port2;
      ((ie.port1.onmessage = re),
        (w = function () {
          ae.postMessage(null);
        }));
    } else
      w = function () {
        _(re, 0);
      };
    function oe(t, n) {
      S = _(function () {
        t(e.unstable_now());
      }, n);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
            )
          : (C = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f;
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = f;
        }
        var n = f;
        f = t;
        try {
          return e();
        } finally {
          f = n;
        }
      }),
      (e.unstable_requestPaint = function () {
        g = !0;
      }),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = f;
        f = e;
        try {
          return t();
        } finally {
          f = n;
        }
      }),
      (e.unstable_scheduleCallback = function (r, i, a) {
        var o = e.unstable_now();
        switch (
          (typeof a == `object` && a
            ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
            : (a = o),
          r)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 1073741823;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (s = a + s),
          (r = {
            id: u++,
            callback: i,
            priorityLevel: r,
            startTime: a,
            expirationTime: s,
            sortIndex: -1,
          }),
          a > o
            ? ((r.sortIndex = a),
              t(l, r),
              n(c) === null &&
                r === n(l) &&
                (h ? (v(S), (S = -1)) : (h = !0), oe(x, a - o)))
            : ((r.sortIndex = s),
              t(c, r),
              m || p || ((m = !0), ee || ((ee = !0), w()))),
          r
        );
      }),
      (e.unstable_shouldYield = ne),
      (e.unstable_wrapCallback = function (e) {
        var t = f;
        return function () {
          var n = f;
          f = t;
          try {
            return e.apply(this, arguments);
          } finally {
            f = n;
          }
        };
      }));
  }),
  i = e((e, t) => {
    t.exports = r();
  }),
  a = e((e) => {
    var t = n();
    function r(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function i() {}
    var a = {
        d: {
          f: i,
          r: function () {
            throw Error(r(522));
          },
          D: i,
          C: i,
          L: i,
          m: i,
          X: i,
          S: i,
          M: i,
        },
        p: 0,
        findDOMNode: null,
      },
      o = Symbol.for(`react.portal`);
    function s(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: o,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function l(e, t) {
      if (e === `font`) return ``;
      if (typeof t == `string`) return t === `use-credentials` ? t : ``;
    }
    ((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a),
      (e.createPortal = function (e, t) {
        var n =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
          throw Error(r(299));
        return s(e, t, null, n);
      }),
      (e.flushSync = function (e) {
        var t = c.T,
          n = a.p;
        try {
          if (((c.T = null), (a.p = 2), e)) return e();
        } finally {
          ((c.T = t), (a.p = n), a.d.f());
        }
      }),
      (e.preconnect = function (e, t) {
        typeof e == `string` &&
          (t
            ? ((t = t.crossOrigin),
              (t =
                typeof t == `string`
                  ? t === `use-credentials`
                    ? t
                    : ``
                  : void 0))
            : (t = null),
          a.d.C(e, t));
      }),
      (e.prefetchDNS = function (e) {
        typeof e == `string` && a.d.D(e);
      }),
      (e.preinit = function (e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
          var n = t.as,
            r = l(n, t.crossOrigin),
            i = typeof t.integrity == `string` ? t.integrity : void 0,
            o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
          n === `style`
            ? a.d.S(
                e,
                typeof t.precedence == `string` ? t.precedence : void 0,
                { crossOrigin: r, integrity: i, fetchPriority: o },
              )
            : n === `script` &&
              a.d.X(e, {
                crossOrigin: r,
                integrity: i,
                fetchPriority: o,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
        }
      }),
      (e.preinitModule = function (e, t) {
        if (typeof e == `string`)
          if (typeof t == `object` && t) {
            if (t.as == null || t.as === `script`) {
              var n = l(t.as, t.crossOrigin);
              a.d.M(e, {
                crossOrigin: n,
                integrity:
                  typeof t.integrity == `string` ? t.integrity : void 0,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
            }
          } else t ?? a.d.M(e);
      }),
      (e.preload = function (e, t) {
        if (
          typeof e == `string` &&
          typeof t == `object` &&
          t &&
          typeof t.as == `string`
        ) {
          var n = t.as,
            r = l(n, t.crossOrigin);
          a.d.L(e, n, {
            crossOrigin: r,
            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            nonce: typeof t.nonce == `string` ? t.nonce : void 0,
            type: typeof t.type == `string` ? t.type : void 0,
            fetchPriority:
              typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
            referrerPolicy:
              typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
            imageSrcSet:
              typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
            imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
            media: typeof t.media == `string` ? t.media : void 0,
          });
        }
      }),
      (e.preloadModule = function (e, t) {
        if (typeof e == `string`)
          if (t) {
            var n = l(t.as, t.crossOrigin);
            a.d.m(e, {
              as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
              crossOrigin: n,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            });
          } else a.d.m(e);
      }),
      (e.requestFormReset = function (e) {
        a.d.r(e);
      }),
      (e.unstable_batchedUpdates = function (e, t) {
        return e(t);
      }),
      (e.useFormState = function (e, t, n) {
        return c.H.useFormState(e, t, n);
      }),
      (e.useFormStatus = function () {
        return c.H.useHostTransitionStatus();
      }),
      (e.version = `19.2.8`));
  }),
  o = e((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = a()));
  }),
  s = e((e) => {
    var t = i(),
      r = n(),
      a = o();
    function s(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function c(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function l(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function u(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function d(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function f(e) {
      if (l(e) !== e) throw Error(s(188));
    }
    function p(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = l(e)), t === null)) throw Error(s(188));
        return t === e ? e : null;
      }
      for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var a = i.alternate;
        if (a === null) {
          if (((r = i.return), r !== null)) {
            n = r;
            continue;
          }
          break;
        }
        if (i.child === a.child) {
          for (a = i.child; a; ) {
            if (a === n) return (f(i), e);
            if (a === r) return (f(i), t);
            a = a.sibling;
          }
          throw Error(s(188));
        }
        if (n.return !== r.return) ((n = i), (r = a));
        else {
          for (var o = !1, c = i.child; c; ) {
            if (c === n) {
              ((o = !0), (n = i), (r = a));
              break;
            }
            if (c === r) {
              ((o = !0), (r = i), (n = a));
              break;
            }
            c = c.sibling;
          }
          if (!o) {
            for (c = a.child; c; ) {
              if (c === n) {
                ((o = !0), (n = a), (r = i));
                break;
              }
              if (c === r) {
                ((o = !0), (r = a), (n = i));
                break;
              }
              c = c.sibling;
            }
            if (!o) throw Error(s(189));
          }
        }
        if (n.alternate !== r) throw Error(s(190));
      }
      if (n.tag !== 3) throw Error(s(188));
      return n.stateNode.current === n ? e : t;
    }
    function m(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (((t = m(e)), t !== null)) return t;
        e = e.sibling;
      }
      return null;
    }
    var h = Object.assign,
      g = Symbol.for(`react.element`),
      _ = Symbol.for(`react.transitional.element`),
      v = Symbol.for(`react.portal`),
      y = Symbol.for(`react.fragment`),
      b = Symbol.for(`react.strict_mode`),
      x = Symbol.for(`react.profiler`),
      ee = Symbol.for(`react.consumer`),
      S = Symbol.for(`react.context`),
      C = Symbol.for(`react.forward_ref`),
      te = Symbol.for(`react.suspense`),
      ne = Symbol.for(`react.suspense_list`),
      re = Symbol.for(`react.memo`),
      w = Symbol.for(`react.lazy`),
      ie = Symbol.for(`react.activity`),
      ae = Symbol.for(`react.memo_cache_sentinel`),
      oe = Symbol.iterator;
    function T(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (oe && e[oe]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var se = Symbol.for(`react.client.reference`);
    function ce(e) {
      if (e == null) return null;
      if (typeof e == `function`)
        return e.$$typeof === se ? null : e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case y:
          return `Fragment`;
        case x:
          return `Profiler`;
        case b:
          return `StrictMode`;
        case te:
          return `Suspense`;
        case ne:
          return `SuspenseList`;
        case ie:
          return `Activity`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case v:
            return `Portal`;
          case S:
            return e.displayName || `Context`;
          case ee:
            return (e._context.displayName || `Context`) + `.Consumer`;
          case C:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case re:
            return (
              (t = e.displayName || null),
              t === null ? ce(e.type) || `Memo` : t
            );
          case w:
            ((t = e._payload), (e = e._init));
            try {
              return ce(e(t));
            } catch {}
        }
      return null;
    }
    var le = Array.isArray,
      E = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      D = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ue = { pending: !1, data: null, method: null, action: null },
      de = [],
      fe = -1;
    function O(e) {
      return { current: e };
    }
    function k(e) {
      0 > fe || ((e.current = de[fe]), (de[fe] = null), fe--);
    }
    function A(e, t) {
      (fe++, (de[fe] = e.current), (e.current = t));
    }
    var pe = O(null),
      j = O(null),
      me = O(null),
      he = O(null);
    function ge(e, t) {
      switch ((A(me, t), A(j, e), A(pe, null), t.nodeType)) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
          break;
        default:
          if (((e = t.tagName), (t = t.namespaceURI)))
            ((t = Vd(t)), (e = Hd(t, e)));
          else
            switch (e) {
              case `svg`:
                e = 1;
                break;
              case `math`:
                e = 2;
                break;
              default:
                e = 0;
            }
      }
      (k(pe), A(pe, e));
    }
    function _e() {
      (k(pe), k(j), k(me));
    }
    function ve(e) {
      e.memoizedState !== null && A(he, e);
      var t = pe.current,
        n = Hd(t, e.type);
      t !== n && (A(j, e), A(pe, n));
    }
    function ye(e) {
      (j.current === e && (k(pe), k(j)),
        he.current === e && (k(he), (Qf._currentValue = ue)));
    }
    var be, xe;
    function Se(e) {
      if (be === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          ((be = (t && t[1]) || ``),
            (xe =
              -1 <
              e.stack.indexOf(`
    at`)
                ? ` (<anonymous>)`
                : -1 < e.stack.indexOf(`@`)
                  ? `@unknown:0:0`
                  : ``));
        }
      return (
        `
` +
        be +
        e +
        xe
      );
    }
    var Ce = !1;
    function we(e, t) {
      if (!e || Ce) return ``;
      Ce = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var r = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var n = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(n.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == `object` && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(n, []);
                  } catch (e) {
                    var r = e;
                  }
                  Reflect.construct(e, [], n);
                } else {
                  try {
                    n.call();
                  } catch (e) {
                    r = e;
                  }
                  e.call(n.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (e) {
                  r = e;
                }
                (n = e()) &&
                  typeof n.catch == `function` &&
                  n.catch(function () {});
              }
            } catch (e) {
              if (e && r && typeof e.stack == `string`)
                return [e.stack, r.stack];
            }
            return [null, null];
          },
        };
        r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
        var i = Object.getOwnPropertyDescriptor(
          r.DetermineComponentFrameRoot,
          `name`,
        );
        i &&
          i.configurable &&
          Object.defineProperty(r.DetermineComponentFrameRoot, "name", {
            value: `DetermineComponentFrameRoot`,
          });
        var a = r.DetermineComponentFrameRoot(),
          o = a[0],
          s = a[1];
        if (o && s) {
          var c = o.split(`
`),
            l = s.split(`
`);
          for (
            i = r = 0;
            r < c.length && !c[r].includes(`DetermineComponentFrameRoot`);
          )
            r++;
          for (
            ;
            i < l.length && !l[i].includes(`DetermineComponentFrameRoot`);
          )
            i++;
          if (r === c.length || i === l.length)
            for (
              r = c.length - 1, i = l.length - 1;
              1 <= r && 0 <= i && c[r] !== l[i];
            )
              i--;
          for (; 1 <= r && 0 <= i; r--, i--)
            if (c[r] !== l[i]) {
              if (r !== 1 || i !== 1)
                do
                  if ((r--, i--, 0 > i || c[r] !== l[i])) {
                    var u =
                      `
` + c[r].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        u.includes(`<anonymous>`) &&
                        (u = u.replace(`<anonymous>`, e.displayName)),
                      u
                    );
                  }
                while (1 <= r && 0 <= i);
              break;
            }
        }
      } finally {
        ((Ce = !1), (Error.prepareStackTrace = n));
      }
      return (n = e ? e.displayName || e.name : ``) ? Se(n) : ``;
    }
    function Te(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Se(e.type);
        case 16:
          return Se(`Lazy`);
        case 13:
          return e.child !== t && t !== null
            ? Se(`Suspense Fallback`)
            : Se(`Suspense`);
        case 19:
          return Se(`SuspenseList`);
        case 0:
        case 15:
          return we(e.type, !1);
        case 11:
          return we(e.type.render, !1);
        case 1:
          return we(e.type, !0);
        case 31:
          return Se(`Activity`);
        default:
          return ``;
      }
    }
    function Ee(e) {
      try {
        var t = ``,
          n = null;
        do ((t += Te(e, n)), (n = e), (e = e.return));
        while (e);
        return t;
      } catch (e) {
        return (
          `
Error generating stack: ` +
          e.message +
          `
` +
          e.stack
        );
      }
    }
    var De = Object.prototype.hasOwnProperty,
      Oe = t.unstable_scheduleCallback,
      ke = t.unstable_cancelCallback,
      Ae = t.unstable_shouldYield,
      je = t.unstable_requestPaint,
      Me = t.unstable_now,
      Ne = t.unstable_getCurrentPriorityLevel,
      Pe = t.unstable_ImmediatePriority,
      Fe = t.unstable_UserBlockingPriority,
      Ie = t.unstable_NormalPriority,
      Le = t.unstable_LowPriority,
      Re = t.unstable_IdlePriority,
      ze = t.log,
      Be = t.unstable_setDisableYieldValue,
      Ve = null,
      M = null;
    function He(e) {
      if (
        (typeof ze == `function` && Be(e),
        M && typeof M.setStrictMode == `function`)
      )
        try {
          M.setStrictMode(Ve, e);
        } catch {}
    }
    var Ue = Math.clz32 ? Math.clz32 : Ke,
      We = Math.log,
      Ge = Math.LN2;
    function Ke(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((We(e) / Ge) | 0)) | 0);
    }
    var qe = 256,
      Je = 262144,
      Ye = 4194304;
    function Xe(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return e;
      }
    }
    function Ze(e, t, n) {
      var r = e.pendingLanes;
      if (r === 0) return 0;
      var i = 0,
        a = e.suspendedLanes,
        o = e.pingedLanes;
      e = e.warmLanes;
      var s = r & 134217727;
      return (
        s === 0
          ? ((s = r & ~a),
            s === 0
              ? o === 0
                ? n || ((n = r & ~e), n !== 0 && (i = Xe(n)))
                : (i = Xe(o))
              : (i = Xe(s)))
          : ((r = s & ~a),
            r === 0
              ? ((o &= s),
                o === 0
                  ? n || ((n = s & ~e), n !== 0 && (i = Xe(n)))
                  : (i = Xe(o)))
              : (i = Xe(r))),
        i === 0
          ? 0
          : t !== 0 &&
              t !== i &&
              (t & a) === 0 &&
              ((a = i & -i), (n = t & -t), a >= n || (a === 32 && n & 4194048))
            ? t
            : i
      );
    }
    function Qe(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function $e(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function et() {
      var e = Ye;
      return ((Ye <<= 1), !(Ye & 62914560) && (Ye = 4194304), e);
    }
    function tt(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function nt(e, t) {
      ((e.pendingLanes |= t),
        t !== 268435456 &&
          ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
    }
    function rt(e, t, n, r, i, a) {
      var o = e.pendingLanes;
      ((e.pendingLanes = n),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.warmLanes = 0),
        (e.expiredLanes &= n),
        (e.entangledLanes &= n),
        (e.errorRecoveryDisabledLanes &= n),
        (e.shellSuspendCounter = 0));
      var s = e.entanglements,
        c = e.expirationTimes,
        l = e.hiddenUpdates;
      for (n = o & ~n; 0 < n; ) {
        var u = 31 - Ue(n),
          d = 1 << u;
        ((s[u] = 0), (c[u] = -1));
        var f = l[u];
        if (f !== null)
          for (l[u] = null, u = 0; u < f.length; u++) {
            var p = f[u];
            p !== null && (p.lane &= -536870913);
          }
        n &= ~d;
      }
      (r !== 0 && it(e, r, 0),
        a !== 0 &&
          i === 0 &&
          e.tag !== 0 &&
          (e.suspendedLanes |= a & ~(o & ~t)));
    }
    function it(e, t, n) {
      ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
      var r = 31 - Ue(t);
      ((e.entangledLanes |= t),
        (e.entanglements[r] = e.entanglements[r] | 1073741824 | (n & 261930)));
    }
    function at(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - Ue(n),
          i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
      }
    }
    function ot(e, t) {
      var n = t & -t;
      return (
        (n = n & 42 ? 1 : st(n)),
        (n & (e.suspendedLanes | t)) === 0 ? n : 0
      );
    }
    function st(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function ct(e) {
      return (
        (e &= -e),
        2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
      );
    }
    function lt() {
      var e = D.p;
      return e === 0 ? ((e = window.event), e === void 0 ? 32 : mp(e.type)) : e;
    }
    function ut(e, t) {
      var n = D.p;
      try {
        return ((D.p = e), t());
      } finally {
        D.p = n;
      }
    }
    var dt = Math.random().toString(36).slice(2),
      ft = `__reactFiber$` + dt,
      pt = `__reactProps$` + dt,
      mt = `__reactContainer$` + dt,
      ht = `__reactEvents$` + dt,
      gt = `__reactListeners$` + dt,
      _t = `__reactHandles$` + dt,
      vt = `__reactResources$` + dt,
      yt = `__reactMarker$` + dt;
    function bt(e) {
      (delete e[ft], delete e[pt], delete e[ht], delete e[gt], delete e[_t]);
    }
    function xt(e) {
      var t = e[ft];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[mt] || n[ft])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = df(e); e !== null; ) {
              if ((n = e[ft])) return n;
              e = df(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function St(e) {
      if ((e = e[ft] || e[mt])) {
        var t = e.tag;
        if (
          t === 5 ||
          t === 6 ||
          t === 13 ||
          t === 31 ||
          t === 26 ||
          t === 27 ||
          t === 3
        )
          return e;
      }
      return null;
    }
    function Ct(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
      throw Error(s(33));
    }
    function N(e) {
      var t = e[vt];
      return (
        (t ||= e[vt] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        t
      );
    }
    function wt(e) {
      e[yt] = !0;
    }
    var Tt = new Set(),
      Et = {};
    function Dt(e, t) {
      (Ot(e, t), Ot(e + `Capture`, t));
    }
    function Ot(e, t) {
      for (Et[e] = t, e = 0; e < t.length; e++) Tt.add(t[e]);
    }
    var kt = RegExp(
        `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
      ),
      At = {},
      jt = {};
    function Mt(e) {
      return De.call(jt, e)
        ? !0
        : De.call(At, e)
          ? !1
          : kt.test(e)
            ? (jt[e] = !0)
            : ((At[e] = !0), !1);
    }
    function P(e, t, n) {
      if (Mt(t))
        if (n === null) e.removeAttribute(t);
        else {
          switch (typeof n) {
            case `undefined`:
            case `function`:
            case `symbol`:
              e.removeAttribute(t);
              return;
            case `boolean`:
              var r = t.toLowerCase().slice(0, 5);
              if (r !== `data-` && r !== `aria-`) {
                e.removeAttribute(t);
                return;
              }
          }
          e.setAttribute(t, `` + n);
        }
    }
    function Nt(e, t, n) {
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case `undefined`:
          case `function`:
          case `symbol`:
          case `boolean`:
            e.removeAttribute(t);
            return;
        }
        e.setAttribute(t, `` + n);
      }
    }
    function Pt(e, t, n, r) {
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case `undefined`:
          case `function`:
          case `symbol`:
          case `boolean`:
            e.removeAttribute(n);
            return;
        }
        e.setAttributeNS(t, n, `` + r);
      }
    }
    function Ft(e) {
      switch (typeof e) {
        case `bigint`:
        case `boolean`:
        case `number`:
        case `string`:
        case `undefined`:
          return e;
        case `object`:
          return e;
        default:
          return ``;
      }
    }
    function It(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === `input` &&
        (t === `checkbox` || t === `radio`)
      );
    }
    function Lt(e, t, n) {
      var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      if (
        !e.hasOwnProperty(t) &&
        r !== void 0 &&
        typeof r.get == `function` &&
        typeof r.set == `function`
      ) {
        var i = r.get,
          a = r.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              ((n = `` + e), a.call(this, e));
            },
          }),
          Object.defineProperty(e, t, { enumerable: r.enumerable }),
          {
            getValue: function () {
              return n;
            },
            setValue: function (e) {
              n = `` + e;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function Rt(e) {
      if (!e._valueTracker) {
        var t = It(e) ? `checked` : `value`;
        e._valueTracker = Lt(e, t, `` + e[t]);
      }
    }
    function zt(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = ``;
      return (
        e && (r = It(e) ? (e.checked ? `true` : `false`) : e.value),
        (e = r),
        e === n ? !1 : (t.setValue(e), !0)
      );
    }
    function Bt(e) {
      if (((e ||= typeof document < `u` ? document : void 0), e === void 0))
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Vt = /[\n"\\]/g;
    function Ht(e) {
      return e.replace(Vt, function (e) {
        return `\\` + e.charCodeAt(0).toString(16) + ` `;
      });
    }
    function Ut(e, t, n, r, i, a, o, s) {
      ((e.name = ``),
        o != null &&
        typeof o != `function` &&
        typeof o != `symbol` &&
        typeof o != `boolean`
          ? (e.type = o)
          : e.removeAttribute(`type`),
        t == null
          ? (o !== `submit` && o !== `reset`) || e.removeAttribute(`value`)
          : o === `number`
            ? ((t === 0 && e.value === ``) || e.value != t) &&
              (e.value = `` + Ft(t))
            : e.value !== `` + Ft(t) && (e.value = `` + Ft(t)),
        t == null
          ? n == null
            ? r != null && e.removeAttribute(`value`)
            : Wt(e, o, Ft(n))
          : Wt(e, o, Ft(t)),
        i == null && a != null && (e.defaultChecked = !!a),
        i != null &&
          (e.checked = i && typeof i != `function` && typeof i != `symbol`),
        s != null &&
        typeof s != `function` &&
        typeof s != `symbol` &&
        typeof s != `boolean`
          ? (e.name = `` + Ft(s))
          : e.removeAttribute(`name`));
    }
    function F(e, t, n, r, i, a, o, s) {
      if (
        (a != null &&
          typeof a != `function` &&
          typeof a != `symbol` &&
          typeof a != `boolean` &&
          (e.type = a),
        t != null || n != null)
      ) {
        if (!((a !== `submit` && a !== `reset`) || t != null)) {
          Rt(e);
          return;
        }
        ((n = n == null ? `` : `` + Ft(n)),
          (t = t == null ? n : `` + Ft(t)),
          s || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((r ??= i),
        (r = typeof r != `function` && typeof r != `symbol` && !!r),
        (e.checked = s ? e.checked : !!r),
        (e.defaultChecked = !!r),
        o != null &&
          typeof o != `function` &&
          typeof o != `symbol` &&
          typeof o != `boolean` &&
          (e.name = o),
        Rt(e));
    }
    function Wt(e, t, n) {
      (t === `number` && Bt(e.ownerDocument) === e) ||
        e.defaultValue === `` + n ||
        (e.defaultValue = `` + n);
    }
    function Gt(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty(`$` + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0));
      } else {
        for (n = `` + Ft(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Kt(e, t, n) {
      if (
        t != null &&
        ((t = `` + Ft(t)), t !== e.value && (e.value = t), n == null)
      ) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = n == null ? `` : `` + Ft(n);
    }
    function qt(e, t, n, r) {
      if (t == null) {
        if (r != null) {
          if (n != null) throw Error(s(92));
          if (le(r)) {
            if (1 < r.length) throw Error(s(93));
            r = r[0];
          }
          n = r;
        }
        ((n ??= ``), (t = n));
      }
      ((n = Ft(t)),
        (e.defaultValue = n),
        (r = e.textContent),
        r === n && r !== `` && r !== null && (e.value = r),
        Rt(e));
    }
    function Jt(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Yt = new Set(
      `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
        ` `,
      ),
    );
    function Xt(e, t, n) {
      var r = t.indexOf(`--`) === 0;
      n == null || typeof n == `boolean` || n === ``
        ? r
          ? e.setProperty(t, ``)
          : t === `float`
            ? (e.cssFloat = ``)
            : (e[t] = ``)
        : r
          ? e.setProperty(t, n)
          : typeof n != `number` || n === 0 || Yt.has(t)
            ? t === `float`
              ? (e.cssFloat = n)
              : (e[t] = (`` + n).trim())
            : (e[t] = n + `px`);
    }
    function I(e, t, n) {
      if (t != null && typeof t != `object`) throw Error(s(62));
      if (((e = e.style), n != null)) {
        for (var r in n)
          !n.hasOwnProperty(r) ||
            (t != null && t.hasOwnProperty(r)) ||
            (r.indexOf(`--`) === 0
              ? e.setProperty(r, ``)
              : r === `float`
                ? (e.cssFloat = ``)
                : (e[r] = ``));
        for (var i in t)
          ((r = t[i]), t.hasOwnProperty(i) && n[i] !== r && Xt(e, i, r));
      } else for (var a in t) t.hasOwnProperty(a) && Xt(e, a, t[a]);
    }
    function Zt(e) {
      if (e.indexOf(`-`) === -1) return !1;
      switch (e) {
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          return !1;
        default:
          return !0;
      }
    }
    var Qt = new Map([
        [`acceptCharset`, `accept-charset`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
        [`crossOrigin`, `crossorigin`],
        [`accentHeight`, `accent-height`],
        [`alignmentBaseline`, `alignment-baseline`],
        [`arabicForm`, `arabic-form`],
        [`baselineShift`, `baseline-shift`],
        [`capHeight`, `cap-height`],
        [`clipPath`, `clip-path`],
        [`clipRule`, `clip-rule`],
        [`colorInterpolation`, `color-interpolation`],
        [`colorInterpolationFilters`, `color-interpolation-filters`],
        [`colorProfile`, `color-profile`],
        [`colorRendering`, `color-rendering`],
        [`dominantBaseline`, `dominant-baseline`],
        [`enableBackground`, `enable-background`],
        [`fillOpacity`, `fill-opacity`],
        [`fillRule`, `fill-rule`],
        [`floodColor`, `flood-color`],
        [`floodOpacity`, `flood-opacity`],
        [`fontFamily`, `font-family`],
        [`fontSize`, `font-size`],
        [`fontSizeAdjust`, `font-size-adjust`],
        [`fontStretch`, `font-stretch`],
        [`fontStyle`, `font-style`],
        [`fontVariant`, `font-variant`],
        [`fontWeight`, `font-weight`],
        [`glyphName`, `glyph-name`],
        [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
        [`glyphOrientationVertical`, `glyph-orientation-vertical`],
        [`horizAdvX`, `horiz-adv-x`],
        [`horizOriginX`, `horiz-origin-x`],
        [`imageRendering`, `image-rendering`],
        [`letterSpacing`, `letter-spacing`],
        [`lightingColor`, `lighting-color`],
        [`markerEnd`, `marker-end`],
        [`markerMid`, `marker-mid`],
        [`markerStart`, `marker-start`],
        [`overlinePosition`, `overline-position`],
        [`overlineThickness`, `overline-thickness`],
        [`paintOrder`, `paint-order`],
        [`panose-1`, `panose-1`],
        [`pointerEvents`, `pointer-events`],
        [`renderingIntent`, `rendering-intent`],
        [`shapeRendering`, `shape-rendering`],
        [`stopColor`, `stop-color`],
        [`stopOpacity`, `stop-opacity`],
        [`strikethroughPosition`, `strikethrough-position`],
        [`strikethroughThickness`, `strikethrough-thickness`],
        [`strokeDasharray`, `stroke-dasharray`],
        [`strokeDashoffset`, `stroke-dashoffset`],
        [`strokeLinecap`, `stroke-linecap`],
        [`strokeLinejoin`, `stroke-linejoin`],
        [`strokeMiterlimit`, `stroke-miterlimit`],
        [`strokeOpacity`, `stroke-opacity`],
        [`strokeWidth`, `stroke-width`],
        [`textAnchor`, `text-anchor`],
        [`textDecoration`, `text-decoration`],
        [`textRendering`, `text-rendering`],
        [`transformOrigin`, `transform-origin`],
        [`underlinePosition`, `underline-position`],
        [`underlineThickness`, `underline-thickness`],
        [`unicodeBidi`, `unicode-bidi`],
        [`unicodeRange`, `unicode-range`],
        [`unitsPerEm`, `units-per-em`],
        [`vAlphabetic`, `v-alphabetic`],
        [`vHanging`, `v-hanging`],
        [`vIdeographic`, `v-ideographic`],
        [`vMathematical`, `v-mathematical`],
        [`vectorEffect`, `vector-effect`],
        [`vertAdvY`, `vert-adv-y`],
        [`vertOriginX`, `vert-origin-x`],
        [`vertOriginY`, `vert-origin-y`],
        [`wordSpacing`, `word-spacing`],
        [`writingMode`, `writing-mode`],
        [`xmlnsXlink`, `xmlns:xlink`],
        [`xHeight`, `x-height`],
      ]),
      $t =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function en(e) {
      return $t.test(`` + e)
        ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`
        : e;
    }
    function tn() {}
    var nn = null;
    function rn(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var an = null,
      on = null;
    function sn(e) {
      var t = St(e);
      if (t && (e = t.stateNode)) {
        var n = e[pt] || null;
        a: switch (((e = t.stateNode), t.type)) {
          case `input`:
            if (
              (Ut(
                e,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              ),
              (t = n.name),
              n.type === `radio` && t != null)
            ) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  `input[name="` + Ht(`` + t) + `"][type="radio"]`,
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                  var i = r[pt] || null;
                  if (!i) throw Error(s(90));
                  Ut(
                    r,
                    i.value,
                    i.defaultValue,
                    i.defaultValue,
                    i.checked,
                    i.defaultChecked,
                    i.type,
                    i.name,
                  );
                }
              }
              for (t = 0; t < n.length; t++)
                ((r = n[t]), r.form === e.form && zt(r));
            }
            break a;
          case `textarea`:
            Kt(e, n.value, n.defaultValue);
            break a;
          case `select`:
            ((t = n.value), t != null && Gt(e, !!n.multiple, t, !1));
        }
      }
    }
    var cn = !1;
    function ln(e, t, n) {
      if (cn) return e(t, n);
      cn = !0;
      try {
        return e(t);
      } finally {
        if (
          ((cn = !1),
          (an !== null || on !== null) &&
            (bu(), an && ((t = an), (e = on), (on = an = null), sn(t), e)))
        )
          for (t = 0; t < e.length; t++) sn(e[t]);
      }
    }
    function un(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = n[pt] || null;
      if (r === null) return null;
      n = r[t];
      a: switch (t) {
        case `onClick`:
        case `onClickCapture`:
        case `onDoubleClick`:
        case `onDoubleClickCapture`:
        case `onMouseDown`:
        case `onMouseDownCapture`:
        case `onMouseMove`:
        case `onMouseMoveCapture`:
        case `onMouseUp`:
        case `onMouseUpCapture`:
        case `onMouseEnter`:
          ((r = !r.disabled) ||
            ((e = e.type),
            (r = !(
              e === `button` ||
              e === `input` ||
              e === `select` ||
              e === `textarea`
            ))),
            (e = !r));
          break a;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != `function`) throw Error(s(231, t, typeof n));
      return n;
    }
    var dn = !(
        typeof window > `u` ||
        window.document === void 0 ||
        window.document.createElement === void 0
      ),
      fn = !1;
    if (dn)
      try {
        var pn = {};
        (Object.defineProperty(pn, "passive", {
          get: function () {
            fn = !0;
          },
        }),
          window.addEventListener(`test`, pn, pn),
          window.removeEventListener(`test`, pn, pn));
      } catch {
        fn = !1;
      }
    var mn = null,
      hn = null,
      L = null;
    function gn() {
      if (L) return L;
      var e,
        t = hn,
        n = t.length,
        r,
        i = `value` in mn ? mn.value : mn.textContent,
        a = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e;
      for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
      return (L = i.slice(e, 1 < r ? 1 - r : void 0));
    }
    function R(e) {
      var t = e.keyCode;
      return (
        `charCode` in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function _n() {
      return !0;
    }
    function vn() {
      return !1;
    }
    function yn(e) {
      function t(t, n, r, i, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented == null
              ? !1 === i.returnValue
              : i.defaultPrevented
          )
            ? _n
            : vn),
          (this.isPropagationStopped = vn),
          this
        );
      }
      return (
        h(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != `unknown` && (e.returnValue = !1),
              (this.isDefaultPrevented = _n));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
              (this.isPropagationStopped = _n));
          },
          persist: function () {},
          isPersistent: _n,
        }),
        t
      );
    }
    var bn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      xn = yn(bn),
      z = h({}, bn, { view: 0, detail: 0 }),
      Sn = yn(z),
      Cn,
      wn,
      Tn,
      En = h({}, z, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Fn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return `movementX` in e
            ? e.movementX
            : (e !== Tn &&
                (Tn && e.type === `mousemove`
                  ? ((Cn = e.screenX - Tn.screenX),
                    (wn = e.screenY - Tn.screenY))
                  : (wn = Cn = 0),
                (Tn = e)),
              Cn);
        },
        movementY: function (e) {
          return `movementY` in e ? e.movementY : wn;
        },
      }),
      Dn = yn(En),
      On = yn(h({}, En, { dataTransfer: 0 })),
      B = yn(h({}, z, { relatedTarget: 0 })),
      V = yn(h({}, bn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
      kn = yn(
        h({}, bn, {
          clipboardData: function (e) {
            return `clipboardData` in e
              ? e.clipboardData
              : window.clipboardData;
          },
        }),
      ),
      An = yn(h({}, bn, { data: 0 })),
      jn = {
        Esc: `Escape`,
        Spacebar: ` `,
        Left: `ArrowLeft`,
        Up: `ArrowUp`,
        Right: `ArrowRight`,
        Down: `ArrowDown`,
        Del: `Delete`,
        Win: `OS`,
        Menu: `ContextMenu`,
        Apps: `ContextMenu`,
        Scroll: `ScrollLock`,
        MozPrintableKey: `Unidentified`,
      },
      Mn = {
        8: `Backspace`,
        9: `Tab`,
        12: `Clear`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        19: `Pause`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        45: `Insert`,
        46: `Delete`,
        112: `F1`,
        113: `F2`,
        114: `F3`,
        115: `F4`,
        116: `F5`,
        117: `F6`,
        118: `F7`,
        119: `F8`,
        120: `F9`,
        121: `F10`,
        122: `F11`,
        123: `F12`,
        144: `NumLock`,
        145: `ScrollLock`,
        224: `Meta`,
      },
      Nn = {
        Alt: `altKey`,
        Control: `ctrlKey`,
        Meta: `metaKey`,
        Shift: `shiftKey`,
      };
    function Pn(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = Nn[e])
          ? !!t[e]
          : !1;
    }
    function Fn() {
      return Pn;
    }
    var In = yn(
        h({}, z, {
          key: function (e) {
            if (e.key) {
              var t = jn[e.key] || e.key;
              if (t !== `Unidentified`) return t;
            }
            return e.type === `keypress`
              ? ((e = R(e)), e === 13 ? `Enter` : String.fromCharCode(e))
              : e.type === `keydown` || e.type === `keyup`
                ? Mn[e.keyCode] || `Unidentified`
                : ``;
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Fn,
          charCode: function (e) {
            return e.type === `keypress` ? R(e) : 0;
          },
          keyCode: function (e) {
            return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
          },
          which: function (e) {
            return e.type === `keypress`
              ? R(e)
              : e.type === `keydown` || e.type === `keyup`
                ? e.keyCode
                : 0;
          },
        }),
      ),
      Ln = yn(
        h({}, En, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        }),
      ),
      Rn = yn(
        h({}, z, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: Fn,
        }),
      ),
      zn = yn(h({}, bn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
      Bn = yn(
        h({}, En, {
          deltaX: function (e) {
            return `deltaX` in e
              ? e.deltaX
              : `wheelDeltaX` in e
                ? -e.wheelDeltaX
                : 0;
          },
          deltaY: function (e) {
            return `deltaY` in e
              ? e.deltaY
              : `wheelDeltaY` in e
                ? -e.wheelDeltaY
                : `wheelDelta` in e
                  ? -e.wheelDelta
                  : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
      ),
      Vn = yn(h({}, bn, { newState: 0, oldState: 0 })),
      Hn = [9, 13, 27, 32],
      Un = dn && `CompositionEvent` in window,
      Wn = null;
    dn && `documentMode` in document && (Wn = document.documentMode);
    var Gn = dn && `TextEvent` in window && !Wn,
      Kn = dn && (!Un || (Wn && 8 < Wn && 11 >= Wn)),
      qn = ` `,
      Jn = !1;
    function Yn(e, t) {
      switch (e) {
        case `keyup`:
          return Hn.indexOf(t.keyCode) !== -1;
        case `keydown`:
          return t.keyCode !== 229;
        case `keypress`:
        case `mousedown`:
        case `focusout`:
          return !0;
        default:
          return !1;
      }
    }
    function Xn(e) {
      return (
        (e = e.detail),
        typeof e == `object` && `data` in e ? e.data : null
      );
    }
    var Zn = !1;
    function Qn(e, t) {
      switch (e) {
        case `compositionend`:
          return Xn(t);
        case `keypress`:
          return t.which === 32 ? ((Jn = !0), qn) : null;
        case `textInput`:
          return ((e = t.data), e === qn && Jn ? null : e);
        default:
          return null;
      }
    }
    function $n(e, t) {
      if (Zn)
        return e === `compositionend` || (!Un && Yn(e, t))
          ? ((e = gn()), (L = hn = mn = null), (Zn = !1), e)
          : null;
      switch (e) {
        case `paste`:
          return null;
        case `keypress`:
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case `compositionend`:
          return Kn && t.locale !== `ko` ? null : t.data;
        default:
          return null;
      }
    }
    var er = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function tr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === `input` ? !!er[e.type] : t === `textarea`;
    }
    function nr(e, t, n, r) {
      (an ? (on ? on.push(r) : (on = [r])) : (an = r),
        (t = Ed(t, `onChange`)),
        0 < t.length &&
          ((n = new xn(`onChange`, `change`, null, n, r)),
          e.push({ event: n, listeners: t })));
    }
    var rr = null,
      ir = null;
    function ar(e) {
      yd(e, 0);
    }
    function or(e) {
      if (zt(Ct(e))) return e;
    }
    function sr(e, t) {
      if (e === `change`) return t;
    }
    var cr = !1;
    if (dn) {
      var lr;
      if (dn) {
        var ur = `oninput` in document;
        if (!ur) {
          var dr = document.createElement(`div`);
          (dr.setAttribute(`oninput`, `return;`),
            (ur = typeof dr.oninput == `function`));
        }
        lr = ur;
      } else lr = !1;
      cr = lr && (!document.documentMode || 9 < document.documentMode);
    }
    function fr() {
      rr && (rr.detachEvent(`onpropertychange`, pr), (ir = rr = null));
    }
    function pr(e) {
      if (e.propertyName === `value` && or(ir)) {
        var t = [];
        (nr(t, ir, e, rn(e)), ln(ar, t));
      }
    }
    function mr(e, t, n) {
      e === `focusin`
        ? (fr(), (rr = t), (ir = n), rr.attachEvent(`onpropertychange`, pr))
        : e === `focusout` && fr();
    }
    function hr(e) {
      if (e === `selectionchange` || e === `keyup` || e === `keydown`)
        return or(ir);
    }
    function gr(e, t) {
      if (e === `click`) return or(t);
    }
    function _r(e, t) {
      if (e === `input` || e === `change`) return or(t);
    }
    function vr(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var yr = typeof Object.is == `function` ? Object.is : vr;
    function br(e, t) {
      if (yr(e, t)) return !0;
      if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!De.call(t, i) || !yr(e[i], t[i])) return !1;
      }
      return !0;
    }
    function xr(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Sr(e, t) {
      var n = xr(e);
      e = 0;
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return { node: n, offset: t - e };
          e = r;
        }
        a: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break a;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = xr(n);
      }
    }
    function Cr(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? Cr(e, t.parentNode)
              : `contains` in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function wr(e) {
      e =
        e != null &&
        e.ownerDocument != null &&
        e.ownerDocument.defaultView != null
          ? e.ownerDocument.defaultView
          : window;
      for (var t = Bt(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == `string`;
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Bt(e.document);
      }
      return t;
    }
    function Tr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === `input` &&
          (e.type === `text` ||
            e.type === `search` ||
            e.type === `tel` ||
            e.type === `url` ||
            e.type === `password`)) ||
          t === `textarea` ||
          e.contentEditable === `true`)
      );
    }
    var Er = dn && `documentMode` in document && 11 >= document.documentMode,
      Dr = null,
      Or = null,
      kr = null,
      Ar = !1;
    function jr(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Ar ||
        Dr == null ||
        Dr !== Bt(r) ||
        ((r = Dr),
        `selectionStart` in r && Tr(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = (
              (r.ownerDocument && r.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (kr && br(kr, r)) ||
          ((kr = r),
          (r = Ed(Or, `onSelect`)),
          0 < r.length &&
            ((t = new xn(`onSelect`, `select`, null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = Dr))));
    }
    function Mr(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n[`Webkit` + e] = `webkit` + t),
        (n[`Moz` + e] = `moz` + t),
        n
      );
    }
    var Nr = {
        animationend: Mr(`Animation`, `AnimationEnd`),
        animationiteration: Mr(`Animation`, `AnimationIteration`),
        animationstart: Mr(`Animation`, `AnimationStart`),
        transitionrun: Mr(`Transition`, `TransitionRun`),
        transitionstart: Mr(`Transition`, `TransitionStart`),
        transitioncancel: Mr(`Transition`, `TransitionCancel`),
        transitionend: Mr(`Transition`, `TransitionEnd`),
      },
      Pr = {},
      Fr = {};
    dn &&
      ((Fr = document.createElement(`div`).style),
      `AnimationEvent` in window ||
        (delete Nr.animationend.animation,
        delete Nr.animationiteration.animation,
        delete Nr.animationstart.animation),
      `TransitionEvent` in window || delete Nr.transitionend.transition);
    function Ir(e) {
      if (Pr[e]) return Pr[e];
      if (!Nr[e]) return e;
      var t = Nr[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Fr) return (Pr[e] = t[n]);
      return e;
    }
    var Lr = Ir(`animationend`),
      Rr = Ir(`animationiteration`),
      zr = Ir(`animationstart`),
      Br = Ir(`transitionrun`),
      Vr = Ir(`transitionstart`),
      Hr = Ir(`transitioncancel`),
      Ur = Ir(`transitionend`),
      Wr = new Map(),
      Gr =
        `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
          ` `,
        );
    Gr.push(`scrollEnd`);
    function Kr(e, t) {
      (Wr.set(e, t), Dt(t, [e]));
    }
    var qr =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (
                typeof window == `object` &&
                typeof window.ErrorEvent == `function`
              ) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == `object` &&
                typeof process.emit == `function`
              ) {
                process.emit(`uncaughtException`, e);
                return;
              }
              console.error(e);
            },
      Jr = [],
      Yr = 0,
      Xr = 0;
    function Zr() {
      for (var e = Yr, t = (Xr = Yr = 0); t < e; ) {
        var n = Jr[t];
        Jr[t++] = null;
        var r = Jr[t];
        Jr[t++] = null;
        var i = Jr[t];
        Jr[t++] = null;
        var a = Jr[t];
        if (((Jr[t++] = null), r !== null && i !== null)) {
          var o = r.pending;
          (o === null ? (i.next = i) : ((i.next = o.next), (o.next = i)),
            (r.pending = i));
        }
        a !== 0 && ti(n, i, a);
      }
    }
    function Qr(e, t, n, r) {
      ((Jr[Yr++] = e),
        (Jr[Yr++] = t),
        (Jr[Yr++] = n),
        (Jr[Yr++] = r),
        (Xr |= r),
        (e.lanes |= r),
        (e = e.alternate),
        e !== null && (e.lanes |= r));
    }
    function $r(e, t, n, r) {
      return (Qr(e, t, n, r), ni(e));
    }
    function ei(e, t) {
      return (Qr(e, null, null, t), ni(e));
    }
    function ti(e, t, n) {
      e.lanes |= n;
      var r = e.alternate;
      r !== null && (r.lanes |= n);
      for (var i = !1, a = e.return; a !== null; )
        ((a.childLanes |= n),
          (r = a.alternate),
          r !== null && (r.childLanes |= n),
          a.tag === 22 &&
            ((e = a.stateNode), e === null || e._visibility & 1 || (i = !0)),
          (e = a),
          (a = a.return));
      return e.tag === 3
        ? ((a = e.stateNode),
          i &&
            t !== null &&
            ((i = 31 - Ue(n)),
            (e = a.hiddenUpdates),
            (r = e[i]),
            r === null ? (e[i] = [t]) : r.push(t),
            (t.lane = n | 536870912)),
          a)
        : null;
    }
    function ni(e) {
      if (50 < du) throw ((du = 0), (fu = null), Error(s(185)));
      for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
      return e.tag === 3 ? e.stateNode : null;
    }
    var ri = {};
    function ii(e, t, n, r) {
      ((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function ai(e, t, n, r) {
      return new ii(e, t, n, r);
    }
    function oi(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function si(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = ai(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 65011712),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        (n.refCleanup = e.refCleanup),
        n
      );
    }
    function ci(e, t) {
      e.flags &= 65011714;
      var n = e.alternate;
      return (
        n === null
          ? ((e.childLanes = 0),
            (e.lanes = t),
            (e.child = null),
            (e.subtreeFlags = 0),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.dependencies = null),
            (e.stateNode = null))
          : ((e.childLanes = n.childLanes),
            (e.lanes = n.lanes),
            (e.child = n.child),
            (e.subtreeFlags = 0),
            (e.deletions = null),
            (e.memoizedProps = n.memoizedProps),
            (e.memoizedState = n.memoizedState),
            (e.updateQueue = n.updateQueue),
            (e.type = n.type),
            (t = n.dependencies),
            (e.dependencies =
              t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext })),
        e
      );
    }
    function li(e, t, n, r, i, a) {
      var o = 0;
      if (((r = e), typeof e == `function`)) oi(e) && (o = 1);
      else if (typeof e == `string`)
        o = Uf(e, n, pe.current)
          ? 26
          : e === `html` || e === `head` || e === `body`
            ? 27
            : 5;
      else
        a: switch (e) {
          case ie:
            return (
              (e = ai(31, n, t, i)),
              (e.elementType = ie),
              (e.lanes = a),
              e
            );
          case y:
            return ui(n.children, i, a, t);
          case b:
            ((o = 8), (i |= 24));
            break;
          case x:
            return (
              (e = ai(12, n, t, i | 2)),
              (e.elementType = x),
              (e.lanes = a),
              e
            );
          case te:
            return (
              (e = ai(13, n, t, i)),
              (e.elementType = te),
              (e.lanes = a),
              e
            );
          case ne:
            return (
              (e = ai(19, n, t, i)),
              (e.elementType = ne),
              (e.lanes = a),
              e
            );
          default:
            if (typeof e == `object` && e)
              switch (e.$$typeof) {
                case S:
                  o = 10;
                  break a;
                case ee:
                  o = 9;
                  break a;
                case C:
                  o = 11;
                  break a;
                case re:
                  o = 14;
                  break a;
                case w:
                  ((o = 16), (r = null));
                  break a;
              }
            ((o = 29),
              (n = Error(s(130, e === null ? `null` : typeof e, ``))),
              (r = null));
        }
      return (
        (t = ai(o, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = a),
        t
      );
    }
    function ui(e, t, n, r) {
      return ((e = ai(7, e, r, t)), (e.lanes = n), e);
    }
    function di(e, t, n) {
      return ((e = ai(6, e, null, t)), (e.lanes = n), e);
    }
    function fi(e) {
      var t = ai(18, null, null, 0);
      return ((t.stateNode = e), t);
    }
    function pi(e, t, n) {
      return (
        (t = ai(4, e.children === null ? [] : e.children, e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    var mi = new WeakMap();
    function hi(e, t) {
      if (typeof e == `object` && e) {
        var n = mi.get(e);
        return n === void 0
          ? ((t = { value: e, source: t, stack: Ee(t) }), mi.set(e, t), t)
          : n;
      }
      return { value: e, source: t, stack: Ee(t) };
    }
    var gi = [],
      _i = 0,
      vi = null,
      yi = 0,
      bi = [],
      xi = 0,
      Si = null,
      Ci = 1,
      wi = ``;
    function Ti(e, t) {
      ((gi[_i++] = yi), (gi[_i++] = vi), (vi = e), (yi = t));
    }
    function Ei(e, t, n) {
      ((bi[xi++] = Ci), (bi[xi++] = wi), (bi[xi++] = Si), (Si = e));
      var r = Ci;
      e = wi;
      var i = 32 - Ue(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - Ue(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        ((a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          (Ci = (1 << (32 - Ue(t) + i)) | (n << i) | r),
          (wi = a + e));
      } else ((Ci = (1 << a) | (n << i) | r), (wi = e));
    }
    function Di(e) {
      e.return !== null && (Ti(e, 1), Ei(e, 1, 0));
    }
    function Oi(e) {
      for (; e === vi; )
        ((vi = gi[--_i]), (gi[_i] = null), (yi = gi[--_i]), (gi[_i] = null));
      for (; e === Si; )
        ((Si = bi[--xi]),
          (bi[xi] = null),
          (wi = bi[--xi]),
          (bi[xi] = null),
          (Ci = bi[--xi]),
          (bi[xi] = null));
    }
    function ki(e, t) {
      ((bi[xi++] = Ci),
        (bi[xi++] = wi),
        (bi[xi++] = Si),
        (Ci = t.id),
        (wi = t.overflow),
        (Si = e));
    }
    var Ai = null,
      H = null,
      U = !1,
      ji = null,
      Mi = !1,
      Ni = Error(s(519));
    function Pi(e) {
      throw (
        Bi(
          hi(
            Error(
              s(
                418,
                1 < arguments.length && arguments[1] !== void 0 && arguments[1]
                  ? `text`
                  : `HTML`,
                ``,
              ),
            ),
            e,
          ),
        ),
        Ni
      );
    }
    function Fi(e) {
      var t = e.stateNode,
        n = e.type,
        r = e.memoizedProps;
      switch (((t[ft] = e), (t[pt] = r), n)) {
        case `dialog`:
          (Q(`cancel`, t), Q(`close`, t));
          break;
        case `iframe`:
        case `object`:
        case `embed`:
          Q(`load`, t);
          break;
        case `video`:
        case `audio`:
          for (n = 0; n < _d.length; n++) Q(_d[n], t);
          break;
        case `source`:
          Q(`error`, t);
          break;
        case `img`:
        case `image`:
        case `link`:
          (Q(`error`, t), Q(`load`, t));
          break;
        case `details`:
          Q(`toggle`, t);
          break;
        case `input`:
          (Q(`invalid`, t),
            F(
              t,
              r.value,
              r.defaultValue,
              r.checked,
              r.defaultChecked,
              r.type,
              r.name,
              !0,
            ));
          break;
        case `select`:
          Q(`invalid`, t);
          break;
        case `textarea`:
          (Q(`invalid`, t), qt(t, r.value, r.defaultValue, r.children));
      }
      ((n = r.children),
        (typeof n != `string` &&
          typeof n != `number` &&
          typeof n != `bigint`) ||
        t.textContent === `` + n ||
        !0 === r.suppressHydrationWarning ||
        Md(t.textContent, n)
          ? (r.popover != null && (Q(`beforetoggle`, t), Q(`toggle`, t)),
            r.onScroll != null && Q(`scroll`, t),
            r.onScrollEnd != null && Q(`scrollend`, t),
            r.onClick != null && (t.onclick = tn),
            (t = !0))
          : (t = !1),
        t || Pi(e, !0));
    }
    function Ii(e) {
      for (Ai = e.return; Ai; )
        switch (Ai.tag) {
          case 5:
          case 31:
          case 13:
            Mi = !1;
            return;
          case 27:
          case 3:
            Mi = !0;
            return;
          default:
            Ai = Ai.return;
        }
    }
    function Li(e) {
      if (e !== Ai) return !1;
      if (!U) return (Ii(e), (U = !0), !1);
      var t = e.tag,
        n;
      if (
        ((n = t !== 3 && t !== 27) &&
          ((n = t === 5) &&
            ((n = e.type),
            (n =
              !(n !== `form` && n !== `button`) ||
              Ud(e.type, e.memoizedProps))),
          (n = !n)),
        n && H && Pi(e),
        Ii(e),
        t === 13)
      ) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(s(317));
        H = uf(e);
      } else if (t === 31) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(s(317));
        H = uf(e);
      } else
        t === 27
          ? ((t = H), Zd(e.type) ? ((e = lf), (lf = null), (H = e)) : (H = t))
          : (H = Ai ? cf(e.stateNode.nextSibling) : null);
      return !0;
    }
    function Ri() {
      ((H = Ai = null), (U = !1));
    }
    function zi() {
      var e = ji;
      return (
        e !== null &&
          (Zl === null ? (Zl = e) : Zl.push.apply(Zl, e), (ji = null)),
        e
      );
    }
    function Bi(e) {
      ji === null ? (ji = [e]) : ji.push(e);
    }
    var Vi = O(null),
      Hi = null,
      Ui = null;
    function Wi(e, t, n) {
      (A(Vi, t._currentValue), (t._currentValue = n));
    }
    function Gi(e) {
      ((e._currentValue = Vi.current), k(Vi));
    }
    function Ki(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) === t
            ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
            : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function qi(e, t, n, r) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var a = i.dependencies;
        if (a !== null) {
          var o = i.child;
          a = a.firstContext;
          a: for (; a !== null; ) {
            var c = a;
            a = i;
            for (var l = 0; l < t.length; l++)
              if (c.context === t[l]) {
                ((a.lanes |= n),
                  (c = a.alternate),
                  c !== null && (c.lanes |= n),
                  Ki(a.return, n, e),
                  r || (o = null));
                break a;
              }
            a = c.next;
          }
        } else if (i.tag === 18) {
          if (((o = i.return), o === null)) throw Error(s(341));
          ((o.lanes |= n),
            (a = o.alternate),
            a !== null && (a.lanes |= n),
            Ki(o, n, e),
            (o = null));
        } else o = i.child;
        if (o !== null) o.return = i;
        else
          for (o = i; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            if (((i = o.sibling), i !== null)) {
              ((i.return = o.return), (o = i));
              break;
            }
            o = o.return;
          }
        i = o;
      }
    }
    function Ji(e, t, n, r) {
      e = null;
      for (var i = t, a = !1; i !== null; ) {
        if (!a) {
          if (i.flags & 524288) a = !0;
          else if (i.flags & 262144) break;
        }
        if (i.tag === 10) {
          var o = i.alternate;
          if (o === null) throw Error(s(387));
          if (((o = o.memoizedProps), o !== null)) {
            var c = i.type;
            yr(i.pendingProps.value, o.value) ||
              (e === null ? (e = [c]) : e.push(c));
          }
        } else if (i === he.current) {
          if (((o = i.alternate), o === null)) throw Error(s(387));
          o.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
            (e === null ? (e = [Qf]) : e.push(Qf));
        }
        i = i.return;
      }
      (e !== null && qi(t, e, n, r), (t.flags |= 262144));
    }
    function Yi(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!yr(e.context._currentValue, e.memoizedValue)) return !0;
        e = e.next;
      }
      return !1;
    }
    function Xi(e) {
      ((Hi = e),
        (Ui = null),
        (e = e.dependencies),
        e !== null && (e.firstContext = null));
    }
    function Zi(e) {
      return $i(Hi, e);
    }
    function Qi(e, t) {
      return (Hi === null && Xi(e), $i(e, t));
    }
    function $i(e, t) {
      var n = t._currentValue;
      if (((t = { context: t, memoizedValue: n, next: null }), Ui === null)) {
        if (e === null) throw Error(s(308));
        ((Ui = t),
          (e.dependencies = { lanes: 0, firstContext: t }),
          (e.flags |= 524288));
      } else Ui = Ui.next = t;
      return n;
    }
    var ea =
        typeof AbortController < `u`
          ? AbortController
          : function () {
              var e = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (t, n) {
                    e.push(n);
                  },
                });
              this.abort = function () {
                ((t.aborted = !0),
                  e.forEach(function (e) {
                    return e();
                  }));
              };
            },
      ta = t.unstable_scheduleCallback,
      na = t.unstable_NormalPriority,
      ra = {
        $$typeof: S,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function ia() {
      return { controller: new ea(), data: new Map(), refCount: 0 };
    }
    function aa(e) {
      (e.refCount--,
        e.refCount === 0 &&
          ta(na, function () {
            e.controller.abort();
          }));
    }
    var oa = null,
      sa = 0,
      ca = 0,
      la = null;
    function ua(e, t) {
      if (oa === null) {
        var n = (oa = []);
        ((sa = 0),
          (ca = dd()),
          (la = {
            status: `pending`,
            value: void 0,
            then: function (e) {
              n.push(e);
            },
          }));
      }
      return (sa++, t.then(da, da), t);
    }
    function da() {
      if (--sa === 0 && oa !== null) {
        la !== null && (la.status = `fulfilled`);
        var e = oa;
        ((oa = null), (ca = 0), (la = null));
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function fa(e, t) {
      var n = [],
        r = {
          status: `pending`,
          value: null,
          reason: null,
          then: function (e) {
            n.push(e);
          },
        };
      return (
        e.then(
          function () {
            ((r.status = `fulfilled`), (r.value = t));
            for (var e = 0; e < n.length; e++) (0, n[e])(t);
          },
          function (e) {
            for (r.status = `rejected`, r.reason = e, e = 0; e < n.length; e++)
              (0, n[e])(void 0);
          },
        ),
        r
      );
    }
    var pa = E.S;
    E.S = function (e, t) {
      ((eu = Me()),
        typeof t == `object` && t && typeof t.then == `function` && ua(e, t),
        pa !== null && pa(e, t));
    };
    var ma = O(null);
    function ha() {
      var e = ma.current;
      return e === null ? q.pooledCache : e;
    }
    function ga(e, t) {
      t === null ? A(ma, ma.current) : A(ma, t.pool);
    }
    function _a() {
      var e = ha();
      return e === null ? null : { parent: ra._currentValue, pool: e };
    }
    var va = Error(s(460)),
      ya = Error(s(474)),
      ba = Error(s(542)),
      xa = { then: function () {} };
    function Sa(e) {
      return ((e = e.status), e === `fulfilled` || e === `rejected`);
    }
    function Ca(e, t, n) {
      switch (
        ((n = e[n]),
        n === void 0 ? e.push(t) : n !== t && (t.then(tn, tn), (t = n)),
        t.status)
      ) {
        case `fulfilled`:
          return t.value;
        case `rejected`:
          throw ((e = t.reason), Da(e), e);
        default:
          if (typeof t.status == `string`) t.then(tn, tn);
          else {
            if (((e = q), e !== null && 100 < e.shellSuspendCounter))
              throw Error(s(482));
            ((e = t),
              (e.status = `pending`),
              e.then(
                function (e) {
                  if (t.status === `pending`) {
                    var n = t;
                    ((n.status = `fulfilled`), (n.value = e));
                  }
                },
                function (e) {
                  if (t.status === `pending`) {
                    var n = t;
                    ((n.status = `rejected`), (n.reason = e));
                  }
                },
              ));
          }
          switch (t.status) {
            case `fulfilled`:
              return t.value;
            case `rejected`:
              throw ((e = t.reason), Da(e), e);
          }
          throw ((Ta = t), va);
      }
    }
    function wa(e) {
      try {
        var t = e._init;
        return t(e._payload);
      } catch (e) {
        throw typeof e == `object` && e && typeof e.then == `function`
          ? ((Ta = e), va)
          : e;
      }
    }
    var Ta = null;
    function Ea() {
      if (Ta === null) throw Error(s(459));
      var e = Ta;
      return ((Ta = null), e);
    }
    function Da(e) {
      if (e === va || e === ba) throw Error(s(483));
    }
    var Oa = null,
      ka = 0;
    function Aa(e) {
      var t = ka;
      return ((ka += 1), Oa === null && (Oa = []), Ca(Oa, e, t));
    }
    function ja(e, t) {
      ((t = t.props.ref), (e.ref = t === void 0 ? null : t));
    }
    function Ma(e, t) {
      throw t.$$typeof === g
        ? Error(s(525))
        : ((e = Object.prototype.toString.call(t)),
          Error(
            s(
              31,
              e === `[object Object]`
                ? `object with keys {` + Object.keys(t).join(`, `) + `}`
                : e,
            ),
          ));
    }
    function Na(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; r !== null; ) (t(n, r), (r = r.sibling));
        return null;
      }
      function r(e) {
        for (var t = new Map(); e !== null; )
          (e.key === null ? t.set(e.index, e) : t.set(e.key, e),
            (e = e.sibling));
        return t;
      }
      function i(e, t) {
        return ((e = si(e, t)), (e.index = 0), (e.sibling = null), e);
      }
      function a(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              r === null
                ? ((t.flags |= 67108866), n)
                : ((r = r.index), r < n ? ((t.flags |= 67108866), n) : r))
            : ((t.flags |= 1048576), n)
        );
      }
      function o(t) {
        return (e && t.alternate === null && (t.flags |= 67108866), t);
      }
      function c(e, t, n, r) {
        return t === null || t.tag !== 6
          ? ((t = di(n, e.mode, r)), (t.return = e), t)
          : ((t = i(t, n)), (t.return = e), t);
      }
      function l(e, t, n, r) {
        var a = n.type;
        return a === y
          ? d(e, t, n.props.children, r, n.key)
          : t !== null &&
              (t.elementType === a ||
                (typeof a == `object` &&
                  a &&
                  a.$$typeof === w &&
                  wa(a) === t.type))
            ? ((t = i(t, n.props)), ja(t, n), (t.return = e), t)
            : ((t = li(n.type, n.key, n.props, null, e.mode, r)),
              ja(t, n),
              (t.return = e),
              t);
      }
      function u(e, t, n, r) {
        return t === null ||
          t.tag !== 4 ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = pi(n, e.mode, r)), (t.return = e), t)
          : ((t = i(t, n.children || [])), (t.return = e), t);
      }
      function d(e, t, n, r, a) {
        return t === null || t.tag !== 7
          ? ((t = ui(n, e.mode, r, a)), (t.return = e), t)
          : ((t = i(t, n)), (t.return = e), t);
      }
      function f(e, t, n) {
        if (
          (typeof t == `string` && t !== ``) ||
          typeof t == `number` ||
          typeof t == `bigint`
        )
          return ((t = di(`` + t, e.mode, n)), (t.return = e), t);
        if (typeof t == `object` && t) {
          switch (t.$$typeof) {
            case _:
              return (
                (n = li(t.type, t.key, t.props, null, e.mode, n)),
                ja(n, t),
                (n.return = e),
                n
              );
            case v:
              return ((t = pi(t, e.mode, n)), (t.return = e), t);
            case w:
              return ((t = wa(t)), f(e, t, n));
          }
          if (le(t) || T(t))
            return ((t = ui(t, e.mode, n, null)), (t.return = e), t);
          if (typeof t.then == `function`) return f(e, Aa(t), n);
          if (t.$$typeof === S) return f(e, Qi(e, t), n);
          Ma(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var i = t === null ? null : t.key;
        if (
          (typeof n == `string` && n !== ``) ||
          typeof n == `number` ||
          typeof n == `bigint`
        )
          return i === null ? c(e, t, `` + n, r) : null;
        if (typeof n == `object` && n) {
          switch (n.$$typeof) {
            case _:
              return n.key === i ? l(e, t, n, r) : null;
            case v:
              return n.key === i ? u(e, t, n, r) : null;
            case w:
              return ((n = wa(n)), p(e, t, n, r));
          }
          if (le(n) || T(n)) return i === null ? d(e, t, n, r, null) : null;
          if (typeof n.then == `function`) return p(e, t, Aa(n), r);
          if (n.$$typeof === S) return p(e, t, Qi(e, n), r);
          Ma(e, n);
        }
        return null;
      }
      function m(e, t, n, r, i) {
        if (
          (typeof r == `string` && r !== ``) ||
          typeof r == `number` ||
          typeof r == `bigint`
        )
          return ((e = e.get(n) || null), c(t, e, `` + r, i));
        if (typeof r == `object` && r) {
          switch (r.$$typeof) {
            case _:
              return (
                (e = e.get(r.key === null ? n : r.key) || null),
                l(t, e, r, i)
              );
            case v:
              return (
                (e = e.get(r.key === null ? n : r.key) || null),
                u(t, e, r, i)
              );
            case w:
              return ((r = wa(r)), m(e, t, n, r, i));
          }
          if (le(r) || T(r))
            return ((e = e.get(n) || null), d(t, e, r, i, null));
          if (typeof r.then == `function`) return m(e, t, n, Aa(r), i);
          if (r.$$typeof === S) return m(e, t, n, Qi(t, r), i);
          Ma(t, r);
        }
        return null;
      }
      function h(i, o, s, c) {
        for (
          var l = null, u = null, d = o, h = (o = 0), g = null;
          d !== null && h < s.length;
          h++
        ) {
          d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
          var _ = p(i, d, s[h], c);
          if (_ === null) {
            d === null && (d = g);
            break;
          }
          (e && d && _.alternate === null && t(i, d),
            (o = a(_, o, h)),
            u === null ? (l = _) : (u.sibling = _),
            (u = _),
            (d = g));
        }
        if (h === s.length) return (n(i, d), U && Ti(i, h), l);
        if (d === null) {
          for (; h < s.length; h++)
            ((d = f(i, s[h], c)),
              d !== null &&
                ((o = a(d, o, h)),
                u === null ? (l = d) : (u.sibling = d),
                (u = d)));
          return (U && Ti(i, h), l);
        }
        for (d = r(d); h < s.length; h++)
          ((g = m(d, i, h, s[h], c)),
            g !== null &&
              (e &&
                g.alternate !== null &&
                d.delete(g.key === null ? h : g.key),
              (o = a(g, o, h)),
              u === null ? (l = g) : (u.sibling = g),
              (u = g)));
        return (
          e &&
            d.forEach(function (e) {
              return t(i, e);
            }),
          U && Ti(i, h),
          l
        );
      }
      function g(i, o, c, l) {
        if (c == null) throw Error(s(151));
        for (
          var u = null, d = null, h = o, g = (o = 0), _ = null, v = c.next();
          h !== null && !v.done;
          g++, v = c.next()
        ) {
          h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
          var y = p(i, h, v.value, l);
          if (y === null) {
            h === null && (h = _);
            break;
          }
          (e && h && y.alternate === null && t(i, h),
            (o = a(y, o, g)),
            d === null ? (u = y) : (d.sibling = y),
            (d = y),
            (h = _));
        }
        if (v.done) return (n(i, h), U && Ti(i, g), u);
        if (h === null) {
          for (; !v.done; g++, v = c.next())
            ((v = f(i, v.value, l)),
              v !== null &&
                ((o = a(v, o, g)),
                d === null ? (u = v) : (d.sibling = v),
                (d = v)));
          return (U && Ti(i, g), u);
        }
        for (h = r(h); !v.done; g++, v = c.next())
          ((v = m(h, i, g, v.value, l)),
            v !== null &&
              (e &&
                v.alternate !== null &&
                h.delete(v.key === null ? g : v.key),
              (o = a(v, o, g)),
              d === null ? (u = v) : (d.sibling = v),
              (d = v)));
        return (
          e &&
            h.forEach(function (e) {
              return t(i, e);
            }),
          U && Ti(i, g),
          u
        );
      }
      function b(e, r, a, c) {
        if (
          (typeof a == `object` &&
            a &&
            a.type === y &&
            a.key === null &&
            (a = a.props.children),
          typeof a == `object` && a)
        ) {
          switch (a.$$typeof) {
            case _:
              a: {
                for (var l = a.key; r !== null; ) {
                  if (r.key === l) {
                    if (((l = a.type), l === y)) {
                      if (r.tag === 7) {
                        (n(e, r.sibling),
                          (c = i(r, a.props.children)),
                          (c.return = e),
                          (e = c));
                        break a;
                      }
                    } else if (
                      r.elementType === l ||
                      (typeof l == `object` &&
                        l &&
                        l.$$typeof === w &&
                        wa(l) === r.type)
                    ) {
                      (n(e, r.sibling),
                        (c = i(r, a.props)),
                        ja(c, a),
                        (c.return = e),
                        (e = c));
                      break a;
                    }
                    n(e, r);
                    break;
                  } else t(e, r);
                  r = r.sibling;
                }
                a.type === y
                  ? ((c = ui(a.props.children, e.mode, c, a.key)),
                    (c.return = e),
                    (e = c))
                  : ((c = li(a.type, a.key, a.props, null, e.mode, c)),
                    ja(c, a),
                    (c.return = e),
                    (e = c));
              }
              return o(e);
            case v:
              a: {
                for (l = a.key; r !== null; ) {
                  if (r.key === l)
                    if (
                      r.tag === 4 &&
                      r.stateNode.containerInfo === a.containerInfo &&
                      r.stateNode.implementation === a.implementation
                    ) {
                      (n(e, r.sibling),
                        (c = i(r, a.children || [])),
                        (c.return = e),
                        (e = c));
                      break a;
                    } else {
                      n(e, r);
                      break;
                    }
                  else t(e, r);
                  r = r.sibling;
                }
                ((c = pi(a, e.mode, c)), (c.return = e), (e = c));
              }
              return o(e);
            case w:
              return ((a = wa(a)), b(e, r, a, c));
          }
          if (le(a)) return h(e, r, a, c);
          if (T(a)) {
            if (((l = T(a)), typeof l != `function`)) throw Error(s(150));
            return ((a = l.call(a)), g(e, r, a, c));
          }
          if (typeof a.then == `function`) return b(e, r, Aa(a), c);
          if (a.$$typeof === S) return b(e, r, Qi(e, a), c);
          Ma(e, a);
        }
        return (typeof a == `string` && a !== ``) ||
          typeof a == `number` ||
          typeof a == `bigint`
          ? ((a = `` + a),
            r !== null && r.tag === 6
              ? (n(e, r.sibling), (c = i(r, a)), (c.return = e), (e = c))
              : (n(e, r), (c = di(a, e.mode, c)), (c.return = e), (e = c)),
            o(e))
          : n(e, r);
      }
      return function (e, t, n, r) {
        try {
          ka = 0;
          var i = b(e, t, n, r);
          return ((Oa = null), i);
        } catch (t) {
          if (t === va || t === ba) throw t;
          var a = ai(29, t, null, e.mode);
          return ((a.lanes = r), (a.return = e), a);
        }
      };
    }
    var Pa = Na(!0),
      Fa = Na(!1),
      Ia = !1;
    function La(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function Ra(e, t) {
      ((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null,
          }));
    }
    function za(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null };
    }
    function Ba(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), K & 2)) {
        var i = r.pending;
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          (t = ni(e)),
          ti(e, null, n),
          t
        );
      }
      return (Qr(e, r, t, n), ni(e));
    }
    function Va(e, t, n) {
      if (((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194048))) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), at(e, n));
      }
    }
    function Ha(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          a = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = {
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: null,
              next: null,
            };
            (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
          } while (n !== null);
          a === null ? (i = a = t) : (a = a.next = t);
        } else i = a = t;
        ((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: a,
          shared: r.shared,
          callbacks: r.callbacks,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    var Ua = !1;
    function Wa() {
      if (Ua) {
        var e = la;
        if (e !== null) throw e;
      }
    }
    function Ga(e, t, n, r) {
      Ua = !1;
      var i = e.updateQueue;
      Ia = !1;
      var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending;
      if (s !== null) {
        i.shared.pending = null;
        var c = s,
          l = c.next;
        ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
        var u = e.alternate;
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== o &&
            (s === null ? (u.firstBaseUpdate = l) : (s.next = l),
            (u.lastBaseUpdate = c)));
      }
      if (a !== null) {
        var d = i.baseState;
        ((o = 0), (u = l = c = null), (s = a));
        do {
          var f = s.lane & -536870913,
            p = f !== s.lane;
          if (p ? (Y & f) === f : (r & f) === f) {
            (f !== 0 && f === ca && (Ua = !0),
              u !== null &&
                (u = u.next =
                  {
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: null,
                    next: null,
                  }));
            a: {
              var m = e,
                g = s;
              f = t;
              var _ = n;
              switch (g.tag) {
                case 1:
                  if (((m = g.payload), typeof m == `function`)) {
                    d = m.call(_, d, f);
                    break a;
                  }
                  d = m;
                  break a;
                case 3:
                  m.flags = (m.flags & -65537) | 128;
                case 0:
                  if (
                    ((m = g.payload),
                    (f = typeof m == `function` ? m.call(_, d, f) : m),
                    f == null)
                  )
                    break a;
                  d = h({}, d, f);
                  break a;
                case 2:
                  Ia = !0;
              }
            }
            ((f = s.callback),
              f !== null &&
                ((e.flags |= 64),
                p && (e.flags |= 8192),
                (p = i.callbacks),
                p === null ? (i.callbacks = [f]) : p.push(f)));
          } else
            ((p = {
              lane: f,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            }),
              u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
              (o |= f));
          if (((s = s.next), s === null)) {
            if (((s = i.shared.pending), s === null)) break;
            ((p = s),
              (s = p.next),
              (p.next = null),
              (i.lastBaseUpdate = p),
              (i.shared.pending = null));
          }
        } while (1);
        (u === null && (c = d),
          (i.baseState = c),
          (i.firstBaseUpdate = l),
          (i.lastBaseUpdate = u),
          a === null && (i.shared.lanes = 0),
          (Gl |= o),
          (e.lanes = o),
          (e.memoizedState = d));
      }
    }
    function Ka(e, t) {
      if (typeof e != `function`) throw Error(s(191, e));
      e.call(t);
    }
    function qa(e, t) {
      var n = e.callbacks;
      if (n !== null)
        for (e.callbacks = null, e = 0; e < n.length; e++) Ka(n[e], t);
    }
    var Ja = O(null),
      Ya = O(0);
    function Xa(e, t) {
      ((e = Ul), A(Ya, e), A(Ja, t), (Ul = e | t.baseLanes));
    }
    function Za() {
      (A(Ya, Ul), A(Ja, Ja.current));
    }
    function Qa() {
      ((Ul = Ya.current), k(Ja), k(Ya));
    }
    var $a = O(null),
      eo = null;
    function to(e) {
      var t = e.alternate;
      (A(oo, oo.current & 1),
        A($a, e),
        eo === null &&
          (t === null || Ja.current !== null || t.memoizedState !== null) &&
          (eo = e));
    }
    function no(e) {
      (A(oo, oo.current), A($a, e), eo === null && (eo = e));
    }
    function ro(e) {
      e.tag === 22
        ? (A(oo, oo.current), A($a, e), eo === null && (eo = e))
        : io(e);
    }
    function io() {
      (A(oo, oo.current), A($a, $a.current));
    }
    function ao(e) {
      (k($a), eo === e && (eo = null), k(oo));
    }
    var oo = O(0);
    function so(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && ((n = n.dehydrated), n === null || af(n) || of(n)))
            return t;
        } else if (
          t.tag === 19 &&
          (t.memoizedProps.revealOrder === `forwards` ||
            t.memoizedProps.revealOrder === `backwards` ||
            t.memoizedProps.revealOrder === `unstable_legacy-backwards` ||
            t.memoizedProps.revealOrder === `together`)
        ) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var co = 0,
      W = null,
      G = null,
      lo = null,
      uo = !1,
      fo = !1,
      po = !1,
      mo = 0,
      ho = 0,
      go = null,
      _o = 0;
    function vo() {
      throw Error(s(321));
    }
    function yo(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!yr(e[n], t[n])) return !1;
      return !0;
    }
    function bo(e, t, n, r, i, a) {
      return (
        (co = a),
        (W = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (E.H = e === null || e.memoizedState === null ? Ls : Rs),
        (po = !1),
        (a = n(r, i)),
        (po = !1),
        fo && (a = So(t, n, r, i)),
        xo(e),
        a
      );
    }
    function xo(e) {
      E.H = Is;
      var t = G !== null && G.next !== null;
      if (((co = 0), (lo = G = W = null), (uo = !1), (ho = 0), (go = null), t))
        throw Error(s(300));
      e === null ||
        tc ||
        ((e = e.dependencies), e !== null && Yi(e) && (tc = !0));
    }
    function So(e, t, n, r) {
      W = e;
      var i = 0;
      do {
        if ((fo && (go = null), (ho = 0), (fo = !1), 25 <= i))
          throw Error(s(301));
        if (((i += 1), (lo = G = null), e.updateQueue != null)) {
          var a = e.updateQueue;
          ((a.lastEffect = null),
            (a.events = null),
            (a.stores = null),
            a.memoCache != null && (a.memoCache.index = 0));
        }
        ((E.H = zs), (a = t(n, r)));
      } while (fo);
      return a;
    }
    function Co() {
      var e = E.H,
        t = e.useState()[0];
      return (
        (t = typeof t.then == `function` ? Ao(t) : t),
        (e = e.useState()[0]),
        (G === null ? null : G.memoizedState) !== e && (W.flags |= 1024),
        t
      );
    }
    function wo() {
      var e = mo !== 0;
      return ((mo = 0), e);
    }
    function To(e, t, n) {
      ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
    }
    function Eo(e) {
      if (uo) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          (t !== null && (t.pending = null), (e = e.next));
        }
        uo = !1;
      }
      ((co = 0), (lo = G = W = null), (fo = !1), (ho = mo = 0), (go = null));
    }
    function Do() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        lo === null ? (W.memoizedState = lo = e) : (lo = lo.next = e),
        lo
      );
    }
    function Oo() {
      if (G === null) {
        var e = W.alternate;
        e = e === null ? null : e.memoizedState;
      } else e = G.next;
      var t = lo === null ? W.memoizedState : lo.next;
      if (t !== null) ((lo = t), (G = e));
      else {
        if (e === null)
          throw W.alternate === null ? Error(s(467)) : Error(s(310));
        ((G = e),
          (e = {
            memoizedState: G.memoizedState,
            baseState: G.baseState,
            baseQueue: G.baseQueue,
            queue: G.queue,
            next: null,
          }),
          lo === null ? (W.memoizedState = lo = e) : (lo = lo.next = e));
      }
      return lo;
    }
    function ko() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Ao(e) {
      var t = ho;
      return (
        (ho += 1),
        go === null && (go = []),
        (e = Ca(go, e, t)),
        (t = W),
        (lo === null ? t.memoizedState : lo.next) === null &&
          ((t = t.alternate),
          (E.H = t === null || t.memoizedState === null ? Ls : Rs)),
        e
      );
    }
    function jo(e) {
      if (typeof e == `object` && e) {
        if (typeof e.then == `function`) return Ao(e);
        if (e.$$typeof === S) return Zi(e);
      }
      throw Error(s(438, String(e)));
    }
    function Mo(e) {
      var t = null,
        n = W.updateQueue;
      if ((n !== null && (t = n.memoCache), t == null)) {
        var r = W.alternate;
        r !== null &&
          ((r = r.updateQueue),
          r !== null &&
            ((r = r.memoCache),
            r != null &&
              (t = {
                data: r.data.map(function (e) {
                  return e.slice();
                }),
                index: 0,
              })));
      }
      if (
        ((t ??= { data: [], index: 0 }),
        n === null && ((n = ko()), (W.updateQueue = n)),
        (n.memoCache = t),
        (n = t.data[t.index]),
        n === void 0)
      )
        for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ae;
      return (t.index++, n);
    }
    function No(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function Po(e) {
      return Fo(Oo(), G, e);
    }
    function Fo(e, t, n) {
      var r = e.queue;
      if (r === null) throw Error(s(311));
      r.lastRenderedReducer = n;
      var i = e.baseQueue,
        a = r.pending;
      if (a !== null) {
        if (i !== null) {
          var o = i.next;
          ((i.next = a.next), (a.next = o));
        }
        ((t.baseQueue = i = a), (r.pending = null));
      }
      if (((a = e.baseState), i === null)) e.memoizedState = a;
      else {
        t = i.next;
        var c = (o = null),
          l = null,
          u = t,
          d = !1;
        do {
          var f = u.lane & -536870913;
          if (f === u.lane ? (co & f) === f : (Y & f) === f) {
            var p = u.revertLane;
            if (p === 0)
              (l !== null &&
                (l = l.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null,
                  }),
                f === ca && (d = !0));
            else if ((co & p) === p) {
              ((u = u.next), p === ca && (d = !0));
              continue;
            } else
              ((f = {
                lane: 0,
                revertLane: u.revertLane,
                gesture: null,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
                l === null ? ((c = l = f), (o = a)) : (l = l.next = f),
                (W.lanes |= p),
                (Gl |= p));
            ((f = u.action),
              po && n(a, f),
              (a = u.hasEagerState ? u.eagerState : n(a, f)));
          } else
            ((p = {
              lane: f,
              revertLane: u.revertLane,
              gesture: u.gesture,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
              l === null ? ((c = l = p), (o = a)) : (l = l.next = p),
              (W.lanes |= f),
              (Gl |= f));
          u = u.next;
        } while (u !== null && u !== t);
        if (
          (l === null ? (o = a) : (l.next = c),
          !yr(a, e.memoizedState) && ((tc = !0), d && ((n = la), n !== null)))
        )
          throw n;
        ((e.memoizedState = a),
          (e.baseState = o),
          (e.baseQueue = l),
          (r.lastRenderedState = a));
      }
      return (i === null && (r.lanes = 0), [e.memoizedState, r.dispatch]);
    }
    function Io(e) {
      var t = Oo(),
        n = t.queue;
      if (n === null) throw Error(s(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        i = n.pending,
        a = t.memoizedState;
      if (i !== null) {
        n.pending = null;
        var o = (i = i.next);
        do ((a = e(a, o.action)), (o = o.next));
        while (o !== i);
        (yr(a, t.memoizedState) || (tc = !0),
          (t.memoizedState = a),
          t.baseQueue === null && (t.baseState = a),
          (n.lastRenderedState = a));
      }
      return [a, r];
    }
    function Lo(e, t, n) {
      var r = W,
        i = Oo(),
        a = U;
      if (a) {
        if (n === void 0) throw Error(s(407));
        n = n();
      } else n = t();
      var o = !yr((G || i).memoizedState, n);
      if (
        (o && ((i.memoizedState = n), (tc = !0)),
        (i = i.queue),
        cs(Bo.bind(null, r, i, e), [e]),
        i.getSnapshot !== t || o || (lo !== null && lo.memoizedState.tag & 1))
      ) {
        if (
          ((r.flags |= 2048),
          rs(9, { destroy: void 0 }, zo.bind(null, r, i, n, t), null),
          q === null)
        )
          throw Error(s(349));
        a || co & 127 || Ro(r, t, n);
      }
      return n;
    }
    function Ro(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = W.updateQueue),
        t === null
          ? ((t = ko()), (W.updateQueue = t), (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function zo(e, t, n, r) {
      ((t.value = n), (t.getSnapshot = r), Vo(t) && Ho(e));
    }
    function Bo(e, t, n) {
      return n(function () {
        Vo(t) && Ho(e);
      });
    }
    function Vo(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !yr(e, n);
      } catch {
        return !0;
      }
    }
    function Ho(e) {
      var t = ei(e, 2);
      t !== null && hu(t, e, 2);
    }
    function Uo(e) {
      var t = Do();
      if (typeof e == `function`) {
        var n = e;
        if (((e = n()), po)) {
          He(!0);
          try {
            n();
          } finally {
            He(!1);
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = e),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: No,
          lastRenderedState: e,
        }),
        t
      );
    }
    function Wo(e, t, n, r) {
      return ((e.baseState = n), Fo(e, G, typeof r == `function` ? r : No));
    }
    function Go(e, t, n, r, i) {
      if (Ns(e)) throw Error(s(485));
      if (((e = t.action), e !== null)) {
        var a = {
          payload: i,
          action: e,
          next: null,
          isTransition: !0,
          status: `pending`,
          value: null,
          reason: null,
          listeners: [],
          then: function (e) {
            a.listeners.push(e);
          },
        };
        (E.T === null ? (a.isTransition = !1) : n(!0),
          r(a),
          (n = t.pending),
          n === null
            ? ((a.next = t.pending = a), Ko(t, a))
            : ((a.next = n.next), (t.pending = n.next = a)));
      }
    }
    function Ko(e, t) {
      var n = t.action,
        r = t.payload,
        i = e.state;
      if (t.isTransition) {
        var a = E.T,
          o = {};
        E.T = o;
        try {
          var s = n(i, r),
            c = E.S;
          (c !== null && c(o, s), qo(e, t, s));
        } catch (n) {
          Yo(e, t, n);
        } finally {
          (a !== null && o.types !== null && (a.types = o.types), (E.T = a));
        }
      } else
        try {
          ((a = n(i, r)), qo(e, t, a));
        } catch (n) {
          Yo(e, t, n);
        }
    }
    function qo(e, t, n) {
      typeof n == `object` && n && typeof n.then == `function`
        ? n.then(
            function (n) {
              Jo(e, t, n);
            },
            function (n) {
              return Yo(e, t, n);
            },
          )
        : Jo(e, t, n);
    }
    function Jo(e, t, n) {
      ((t.status = `fulfilled`),
        (t.value = n),
        Xo(t),
        (e.state = n),
        (t = e.pending),
        t !== null &&
          ((n = t.next),
          n === t
            ? (e.pending = null)
            : ((n = n.next), (t.next = n), Ko(e, n))));
    }
    function Yo(e, t, n) {
      var r = e.pending;
      if (((e.pending = null), r !== null)) {
        r = r.next;
        do ((t.status = `rejected`), (t.reason = n), Xo(t), (t = t.next));
        while (t !== r);
      }
      e.action = null;
    }
    function Xo(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Zo(e, t) {
      return t;
    }
    function Qo(e, t) {
      if (U) {
        var n = q.formState;
        if (n !== null) {
          a: {
            var r = W;
            if (U) {
              if (H) {
                b: {
                  for (var i = H, a = Mi; i.nodeType !== 8; ) {
                    if (!a) {
                      i = null;
                      break b;
                    }
                    if (((i = cf(i.nextSibling)), i === null)) {
                      i = null;
                      break b;
                    }
                  }
                  ((a = i.data), (i = a === `F!` || a === `F` ? i : null));
                }
                if (i) {
                  ((H = cf(i.nextSibling)), (r = i.data === `F!`));
                  break a;
                }
              }
              Pi(r);
            }
            r = !1;
          }
          r && (t = n[0]);
        }
      }
      return (
        (n = Do()),
        (n.memoizedState = n.baseState = t),
        (r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Zo,
          lastRenderedState: t,
        }),
        (n.queue = r),
        (n = As.bind(null, W, r)),
        (r.dispatch = n),
        (r = Uo(!1)),
        (a = Ms.bind(null, W, !1, r.queue)),
        (r = Do()),
        (i = { state: t, dispatch: null, action: e, pending: null }),
        (r.queue = i),
        (n = Go.bind(null, W, i, a, n)),
        (i.dispatch = n),
        (r.memoizedState = e),
        [t, n, !1]
      );
    }
    function $o(e) {
      return es(Oo(), G, e);
    }
    function es(e, t, n) {
      if (
        ((t = Fo(e, t, Zo)[0]),
        (e = Po(No)[0]),
        typeof t == `object` && t && typeof t.then == `function`)
      )
        try {
          var r = Ao(t);
        } catch (e) {
          throw e === va ? ba : e;
        }
      else r = t;
      t = Oo();
      var i = t.queue,
        a = i.dispatch;
      return (
        n !== t.memoizedState &&
          ((W.flags |= 2048),
          rs(9, { destroy: void 0 }, ts.bind(null, i, n), null)),
        [r, a, e]
      );
    }
    function ts(e, t) {
      e.action = t;
    }
    function ns(e) {
      var t = Oo(),
        n = G;
      if (n !== null) return es(t, n, e);
      (Oo(), (t = t.memoizedState), (n = Oo()));
      var r = n.queue.dispatch;
      return ((n.memoizedState = e), [t, r, !1]);
    }
    function rs(e, t, n, r) {
      return (
        (e = { tag: e, create: n, deps: r, inst: t, next: null }),
        (t = W.updateQueue),
        t === null && ((t = ko()), (W.updateQueue = t)),
        (n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
        e
      );
    }
    function is() {
      return Oo().memoizedState;
    }
    function as(e, t, n, r) {
      var i = Do();
      ((W.flags |= e),
        (i.memoizedState = rs(
          1 | t,
          { destroy: void 0 },
          n,
          r === void 0 ? null : r,
        )));
    }
    function os(e, t, n, r) {
      var i = Oo();
      r = r === void 0 ? null : r;
      var a = i.memoizedState.inst;
      G !== null && r !== null && yo(r, G.memoizedState.deps)
        ? (i.memoizedState = rs(t, a, n, r))
        : ((W.flags |= e), (i.memoizedState = rs(1 | t, a, n, r)));
    }
    function ss(e, t) {
      as(8390656, 8, e, t);
    }
    function cs(e, t) {
      os(2048, 8, e, t);
    }
    function ls(e) {
      W.flags |= 4;
      var t = W.updateQueue;
      if (t === null) ((t = ko()), (W.updateQueue = t), (t.events = [e]));
      else {
        var n = t.events;
        n === null ? (t.events = [e]) : n.push(e);
      }
    }
    function us(e) {
      var t = Oo().memoizedState;
      return (
        ls({ ref: t, nextImpl: e }),
        function () {
          if (K & 2) throw Error(s(440));
          return t.impl.apply(void 0, arguments);
        }
      );
    }
    function ds(e, t) {
      return os(4, 2, e, t);
    }
    function fs(e, t) {
      return os(4, 4, e, t);
    }
    function ps(e, t) {
      if (typeof t == `function`) {
        e = e();
        var n = t(e);
        return function () {
          typeof n == `function` ? n() : t(null);
        };
      }
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function ms(e, t, n) {
      ((n = n == null ? null : n.concat([e])),
        os(4, 4, ps.bind(null, t, e), n));
    }
    function hs() {}
    function gs(e, t) {
      var n = Oo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return t !== null && yo(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
    }
    function _s(e, t) {
      var n = Oo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      if (t !== null && yo(t, r[1])) return r[0];
      if (((r = e()), po)) {
        He(!0);
        try {
          e();
        } finally {
          He(!1);
        }
      }
      return ((n.memoizedState = [r, t]), r);
    }
    function vs(e, t, n) {
      return n === void 0 || (co & 1073741824 && !(Y & 261930))
        ? (e.memoizedState = t)
        : ((e.memoizedState = n), (e = mu()), (W.lanes |= e), (Gl |= e), n);
    }
    function ys(e, t, n, r) {
      return yr(n, t)
        ? n
        : Ja.current === null
          ? !(co & 42) || (co & 1073741824 && !(Y & 261930))
            ? ((tc = !0), (e.memoizedState = n))
            : ((e = mu()), (W.lanes |= e), (Gl |= e), t)
          : ((e = vs(e, n, r)), yr(e, t) || (tc = !0), e);
    }
    function bs(e, t, n, r, i) {
      var a = D.p;
      D.p = a !== 0 && 8 > a ? a : 8;
      var o = E.T,
        s = {};
      ((E.T = s), Ms(e, !1, t, n));
      try {
        var c = i(),
          l = E.S;
        (l !== null && l(s, c),
          typeof c == `object` && c && typeof c.then == `function`
            ? js(e, t, fa(c, r), pu(e))
            : js(e, t, r, pu(e)));
      } catch (n) {
        js(e, t, { then: function () {}, status: `rejected`, reason: n }, pu());
      } finally {
        ((D.p = a),
          o !== null && s.types !== null && (o.types = s.types),
          (E.T = o));
      }
    }
    function xs() {}
    function Ss(e, t, n, r) {
      if (e.tag !== 5) throw Error(s(476));
      var i = Cs(e).queue;
      bs(
        e,
        i,
        t,
        ue,
        n === null
          ? xs
          : function () {
              return (ws(e), n(r));
            },
      );
    }
    function Cs(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ue,
        baseState: ue,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: No,
          lastRenderedState: ue,
        },
        next: null,
      };
      var n = {};
      return (
        (t.next = {
          memoizedState: n,
          baseState: n,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: No,
            lastRenderedState: n,
          },
          next: null,
        }),
        (e.memoizedState = t),
        (e = e.alternate),
        e !== null && (e.memoizedState = t),
        t
      );
    }
    function ws(e) {
      var t = Cs(e);
      (t.next === null && (t = e.alternate.memoizedState),
        js(e, t.next.queue, {}, pu()));
    }
    function Ts() {
      return Zi(Qf);
    }
    function Es() {
      return Oo().memoizedState;
    }
    function Ds() {
      return Oo().memoizedState;
    }
    function Os(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = pu();
            e = za(n);
            var r = Ba(t, e, n);
            (r !== null && (hu(r, t, n), Va(r, t, n)),
              (t = { cache: ia() }),
              (e.payload = t));
            return;
        }
        t = t.return;
      }
    }
    function ks(e, t, n) {
      var r = pu();
      ((n = {
        lane: r,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Ns(e)
          ? Ps(t, n)
          : ((n = $r(e, t, n, r)), n !== null && (hu(n, e, r), Fs(n, t, r))));
    }
    function As(e, t, n) {
      js(e, t, n, pu());
    }
    function js(e, t, n, r) {
      var i = {
        lane: r,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Ns(e)) Ps(t, i);
      else {
        var a = e.alternate;
        if (
          e.lanes === 0 &&
          (a === null || a.lanes === 0) &&
          ((a = t.lastRenderedReducer), a !== null)
        )
          try {
            var o = t.lastRenderedState,
              s = a(o, n);
            if (((i.hasEagerState = !0), (i.eagerState = s), yr(s, o)))
              return (Qr(e, t, i, 0), q === null && Zr(), !1);
          } catch {}
        if (((n = $r(e, t, i, r)), n !== null))
          return (hu(n, e, r), Fs(n, t, r), !0);
      }
      return !1;
    }
    function Ms(e, t, n, r) {
      if (
        ((r = {
          lane: 2,
          revertLane: dd(),
          gesture: null,
          action: r,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ns(e))
      ) {
        if (t) throw Error(s(479));
      } else ((t = $r(e, n, r, 2)), t !== null && hu(t, e, 2));
    }
    function Ns(e) {
      var t = e.alternate;
      return e === W || (t !== null && t === W);
    }
    function Ps(e, t) {
      fo = uo = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
    }
    function Fs(e, t, n) {
      if (n & 4194048) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), at(e, n));
      }
    }
    var Is = {
      readContext: Zi,
      use: jo,
      useCallback: vo,
      useContext: vo,
      useEffect: vo,
      useImperativeHandle: vo,
      useLayoutEffect: vo,
      useInsertionEffect: vo,
      useMemo: vo,
      useReducer: vo,
      useRef: vo,
      useState: vo,
      useDebugValue: vo,
      useDeferredValue: vo,
      useTransition: vo,
      useSyncExternalStore: vo,
      useId: vo,
      useHostTransitionStatus: vo,
      useFormState: vo,
      useActionState: vo,
      useOptimistic: vo,
      useMemoCache: vo,
      useCacheRefresh: vo,
    };
    Is.useEffectEvent = vo;
    var Ls = {
        readContext: Zi,
        use: jo,
        useCallback: function (e, t) {
          return ((Do().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Zi,
        useEffect: ss,
        useImperativeHandle: function (e, t, n) {
          ((n = n == null ? null : n.concat([e])),
            as(4194308, 4, ps.bind(null, t, e), n));
        },
        useLayoutEffect: function (e, t) {
          return as(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          as(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Do();
          t = t === void 0 ? null : t;
          var r = e();
          if (po) {
            He(!0);
            try {
              e();
            } finally {
              He(!1);
            }
          }
          return ((n.memoizedState = [r, t]), r);
        },
        useReducer: function (e, t, n) {
          var r = Do();
          if (n !== void 0) {
            var i = n(t);
            if (po) {
              He(!0);
              try {
                n(t);
              } finally {
                He(!1);
              }
            }
          } else i = t;
          return (
            (r.memoizedState = r.baseState = i),
            (e = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: i,
            }),
            (r.queue = e),
            (e = e.dispatch = ks.bind(null, W, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Do();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: function (e) {
          e = Uo(e);
          var t = e.queue,
            n = As.bind(null, W, t);
          return ((t.dispatch = n), [e.memoizedState, n]);
        },
        useDebugValue: hs,
        useDeferredValue: function (e, t) {
          return vs(Do(), e, t);
        },
        useTransition: function () {
          var e = Uo(!1);
          return (
            (e = bs.bind(null, W, e.queue, !0, !1)),
            (Do().memoizedState = e),
            [!1, e]
          );
        },
        useSyncExternalStore: function (e, t, n) {
          var r = W,
            i = Do();
          if (U) {
            if (n === void 0) throw Error(s(407));
            n = n();
          } else {
            if (((n = t()), q === null)) throw Error(s(349));
            Y & 127 || Ro(r, t, n);
          }
          i.memoizedState = n;
          var a = { value: n, getSnapshot: t };
          return (
            (i.queue = a),
            ss(Bo.bind(null, r, a, e), [e]),
            (r.flags |= 2048),
            rs(9, { destroy: void 0 }, zo.bind(null, r, a, n, t), null),
            n
          );
        },
        useId: function () {
          var e = Do(),
            t = q.identifierPrefix;
          if (U) {
            var n = wi,
              r = Ci;
            ((n = (r & ~(1 << (32 - Ue(r) - 1))).toString(32) + n),
              (t = `_` + t + `R_` + n),
              (n = mo++),
              0 < n && (t += `H` + n.toString(32)),
              (t += `_`));
          } else ((n = _o++), (t = `_` + t + `r_` + n.toString(32) + `_`));
          return (e.memoizedState = t);
        },
        useHostTransitionStatus: Ts,
        useFormState: Qo,
        useActionState: Qo,
        useOptimistic: function (e) {
          var t = Do();
          t.memoizedState = t.baseState = e;
          var n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (t.queue = n),
            (t = Ms.bind(null, W, !0, n)),
            (n.dispatch = t),
            [e, t]
          );
        },
        useMemoCache: Mo,
        useCacheRefresh: function () {
          return (Do().memoizedState = Os.bind(null, W));
        },
        useEffectEvent: function (e) {
          var t = Do(),
            n = { impl: e };
          return (
            (t.memoizedState = n),
            function () {
              if (K & 2) throw Error(s(440));
              return n.impl.apply(void 0, arguments);
            }
          );
        },
      },
      Rs = {
        readContext: Zi,
        use: jo,
        useCallback: gs,
        useContext: Zi,
        useEffect: cs,
        useImperativeHandle: ms,
        useInsertionEffect: ds,
        useLayoutEffect: fs,
        useMemo: _s,
        useReducer: Po,
        useRef: is,
        useState: function () {
          return Po(No);
        },
        useDebugValue: hs,
        useDeferredValue: function (e, t) {
          return ys(Oo(), G.memoizedState, e, t);
        },
        useTransition: function () {
          var e = Po(No)[0],
            t = Oo().memoizedState;
          return [typeof e == `boolean` ? e : Ao(e), t];
        },
        useSyncExternalStore: Lo,
        useId: Es,
        useHostTransitionStatus: Ts,
        useFormState: $o,
        useActionState: $o,
        useOptimistic: function (e, t) {
          return Wo(Oo(), G, e, t);
        },
        useMemoCache: Mo,
        useCacheRefresh: Ds,
      };
    Rs.useEffectEvent = us;
    var zs = {
      readContext: Zi,
      use: jo,
      useCallback: gs,
      useContext: Zi,
      useEffect: cs,
      useImperativeHandle: ms,
      useInsertionEffect: ds,
      useLayoutEffect: fs,
      useMemo: _s,
      useReducer: Io,
      useRef: is,
      useState: function () {
        return Io(No);
      },
      useDebugValue: hs,
      useDeferredValue: function (e, t) {
        var n = Oo();
        return G === null ? vs(n, e, t) : ys(n, G.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Io(No)[0],
          t = Oo().memoizedState;
        return [typeof e == `boolean` ? e : Ao(e), t];
      },
      useSyncExternalStore: Lo,
      useId: Es,
      useHostTransitionStatus: Ts,
      useFormState: ns,
      useActionState: ns,
      useOptimistic: function (e, t) {
        var n = Oo();
        return G === null
          ? ((n.baseState = e), [e, n.queue.dispatch])
          : Wo(n, G, e, t);
      },
      useMemoCache: Mo,
      useCacheRefresh: Ds,
    };
    zs.useEffectEvent = us;
    function Bs(e, t, n, r) {
      ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : h({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var Vs = {
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = pu(),
          i = za(r);
        ((i.payload = t),
          n != null && (i.callback = n),
          (t = Ba(e, i, r)),
          t !== null && (hu(t, e, r), Va(t, e, r)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = pu(),
          i = za(r);
        ((i.tag = 1),
          (i.payload = t),
          n != null && (i.callback = n),
          (t = Ba(e, i, r)),
          t !== null && (hu(t, e, r), Va(t, e, r)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = pu(),
          r = za(n);
        ((r.tag = 2),
          t != null && (r.callback = t),
          (t = Ba(e, r, n)),
          t !== null && (hu(t, e, n), Va(t, e, n)));
      },
    };
    function Hs(e, t, n, r, i, a, o) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == `function`
          ? e.shouldComponentUpdate(r, a, o)
          : t.prototype && t.prototype.isPureReactComponent
            ? !br(n, r) || !br(i, a)
            : !0
      );
    }
    function Us(e, t, n, r) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == `function` &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == `function` &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Vs.enqueueReplaceState(t, t.state, null));
    }
    function Ws(e, t) {
      var n = t;
      if (`ref` in t) for (var r in ((n = {}), t)) r !== `ref` && (n[r] = t[r]);
      if ((e = e.defaultProps))
        for (var i in (n === t && (n = h({}, n)), e))
          n[i] === void 0 && (n[i] = e[i]);
      return n;
    }
    function Gs(e) {
      qr(e);
    }
    function Ks(e) {
      console.error(e);
    }
    function qs(e) {
      qr(e);
    }
    function Js(e, t) {
      try {
        var n = e.onUncaughtError;
        n(t.value, { componentStack: t.stack });
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function Ys(e, t, n) {
      try {
        var r = e.onCaughtError;
        r(n.value, {
          componentStack: n.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null,
        });
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function Xs(e, t, n) {
      return (
        (n = za(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Js(e, t);
        }),
        n
      );
    }
    function Zs(e) {
      return ((e = za(e)), (e.tag = 3), e);
    }
    function Qs(e, t, n, r) {
      var i = n.type.getDerivedStateFromError;
      if (typeof i == `function`) {
        var a = r.value;
        ((e.payload = function () {
          return i(a);
        }),
          (e.callback = function () {
            Ys(t, n, r);
          }));
      }
      var o = n.stateNode;
      o !== null &&
        typeof o.componentDidCatch == `function` &&
        (e.callback = function () {
          (Ys(t, n, r),
            typeof i != `function` &&
              (ru === null ? (ru = new Set([this])) : ru.add(this)));
          var e = r.stack;
          this.componentDidCatch(r.value, {
            componentStack: e === null ? `` : e,
          });
        });
    }
    function $s(e, t, n, r, i) {
      if (
        ((n.flags |= 32768),
        typeof r == `object` && r && typeof r.then == `function`)
      ) {
        if (
          ((t = n.alternate),
          t !== null && Ji(t, n, i, !0),
          (n = $a.current),
          n !== null)
        ) {
          switch (n.tag) {
            case 31:
            case 13:
              return (
                eo === null
                  ? Du()
                  : n.alternate === null && Wl === 0 && (Wl = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = i),
                r === xa
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null ? (n.updateQueue = new Set([r])) : t.add(r),
                    Gu(e, r, i)),
                !1
              );
            case 22:
              return (
                (n.flags |= 65536),
                r === xa
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null
                      ? ((t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([r]),
                        }),
                        (n.updateQueue = t))
                      : ((n = t.retryQueue),
                        n === null ? (t.retryQueue = new Set([r])) : n.add(r)),
                    Gu(e, r, i)),
                !1
              );
          }
          throw Error(s(435, n.tag));
        }
        return (Gu(e, r, i), Du(), !1);
      }
      if (U)
        return (
          (t = $a.current),
          t === null
            ? (r !== Ni && ((t = Error(s(423), { cause: r })), Bi(hi(t, n))),
              (e = e.current.alternate),
              (e.flags |= 65536),
              (i &= -i),
              (e.lanes |= i),
              (r = hi(r, n)),
              (i = Xs(e.stateNode, r, i)),
              Ha(e, i),
              Wl !== 4 && (Wl = 2))
            : (!(t.flags & 65536) && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = i),
              r !== Ni && ((e = Error(s(422), { cause: r })), Bi(hi(e, n)))),
          !1
        );
      var a = Error(s(520), { cause: r });
      if (
        ((a = hi(a, n)),
        Xl === null ? (Xl = [a]) : Xl.push(a),
        Wl !== 4 && (Wl = 2),
        t === null)
      )
        return !0;
      ((r = hi(r, n)), (n = t));
      do {
        switch (n.tag) {
          case 3:
            return (
              (n.flags |= 65536),
              (e = i & -i),
              (n.lanes |= e),
              (e = Xs(n.stateNode, r, e)),
              Ha(n, e),
              !1
            );
          case 1:
            if (
              ((t = n.type),
              (a = n.stateNode),
              !(n.flags & 128) &&
                (typeof t.getDerivedStateFromError == `function` ||
                  (a !== null &&
                    typeof a.componentDidCatch == `function` &&
                    (ru === null || !ru.has(a)))))
            )
              return (
                (n.flags |= 65536),
                (i &= -i),
                (n.lanes |= i),
                (i = Zs(i)),
                Qs(i, e, n, r),
                Ha(n, i),
                !1
              );
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var ec = Error(s(461)),
      tc = !1;
    function nc(e, t, n, r) {
      t.child = e === null ? Fa(t, null, n, r) : Pa(t, e.child, n, r);
    }
    function rc(e, t, n, r, i) {
      n = n.render;
      var a = t.ref;
      if (`ref` in r) {
        var o = {};
        for (var s in r) s !== `ref` && (o[s] = r[s]);
      } else o = r;
      return (
        Xi(t),
        (r = bo(e, t, n, o, a, i)),
        (s = wo()),
        e !== null && !tc
          ? (To(e, t, i), Dc(e, t, i))
          : (U && s && Di(t), (t.flags |= 1), nc(e, t, r, i), t.child)
      );
    }
    function ic(e, t, n, r, i) {
      if (e === null) {
        var a = n.type;
        return typeof a == `function` &&
          !oi(a) &&
          a.defaultProps === void 0 &&
          n.compare === null
          ? ((t.tag = 15), (t.type = a), ac(e, t, a, r, i))
          : ((e = li(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((a = e.child), !Oc(e, i))) {
        var o = a.memoizedProps;
        if (
          ((n = n.compare),
          (n = n === null ? br : n),
          n(o, r) && e.ref === t.ref)
        )
          return Dc(e, t, i);
      }
      return (
        (t.flags |= 1),
        (e = si(a, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function ac(e, t, n, r, i) {
      if (e !== null) {
        var a = e.memoizedProps;
        if (br(a, r) && e.ref === t.ref)
          if (((tc = !1), (t.pendingProps = r = a), Oc(e, i)))
            e.flags & 131072 && (tc = !0);
          else return ((t.lanes = e.lanes), Dc(e, t, i));
      }
      return pc(e, t, n, r, i);
    }
    function oc(e, t, n, r) {
      var i = r.children,
        a = e === null ? null : e.memoizedState;
      if (
        (e === null &&
          t.stateNode === null &&
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        r.mode === `hidden`)
      ) {
        if (t.flags & 128) {
          if (((a = a === null ? n : a.baseLanes | n), e !== null)) {
            for (r = t.child = e.child, i = 0; r !== null; )
              ((i = i | r.lanes | r.childLanes), (r = r.sibling));
            r = i & ~a;
          } else ((r = 0), (t.child = null));
          return cc(e, t, a, n, r);
        }
        if (n & 536870912)
          ((t.memoizedState = { baseLanes: 0, cachePool: null }),
            e !== null && ga(t, a === null ? null : a.cachePool),
            a === null ? Za() : Xa(t, a),
            ro(t));
        else
          return (
            (r = t.lanes = 536870912),
            cc(e, t, a === null ? n : a.baseLanes | n, n, r)
          );
      } else
        a === null
          ? (e !== null && ga(t, null), Za(), io(t))
          : (ga(t, a.cachePool), Xa(t, a), io(t), (t.memoizedState = null));
      return (nc(e, t, i, n), t.child);
    }
    function sc(e, t) {
      return (
        (e !== null && e.tag === 22) ||
          t.stateNode !== null ||
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        t.sibling
      );
    }
    function cc(e, t, n, r, i) {
      var a = ha();
      return (
        (a = a === null ? null : { parent: ra._currentValue, pool: a }),
        (t.memoizedState = { baseLanes: n, cachePool: a }),
        e !== null && ga(t, null),
        Za(),
        ro(t),
        e !== null && Ji(e, t, r, !0),
        (t.childLanes = i),
        null
      );
    }
    function lc(e, t) {
      return (
        (t = Sc({ mode: t.mode, children: t.children }, e.mode)),
        (t.ref = e.ref),
        (e.child = t),
        (t.return = e),
        t
      );
    }
    function uc(e, t, n) {
      return (
        Pa(t, e.child, null, n),
        (e = lc(t, t.pendingProps)),
        (e.flags |= 2),
        ao(t),
        (t.memoizedState = null),
        e
      );
    }
    function dc(e, t, n) {
      var r = t.pendingProps,
        i = (t.flags & 128) != 0;
      if (((t.flags &= -129), e === null)) {
        if (U) {
          if (r.mode === `hidden`)
            return ((e = lc(t, r)), (t.lanes = 536870912), sc(null, e));
          if (
            (no(t),
            (e = H)
              ? ((e = rf(e, Mi)),
                (e = e !== null && e.data === `&` ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Si === null ? null : { id: Ci, overflow: wi },
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = fi(e)),
                  (n.return = t),
                  (t.child = n),
                  (Ai = t),
                  (H = null)))
              : (e = null),
            e === null)
          )
            throw Pi(t);
          return ((t.lanes = 536870912), null);
        }
        return lc(t, r);
      }
      var a = e.memoizedState;
      if (a !== null) {
        var o = a.dehydrated;
        if ((no(t), i))
          if (t.flags & 256) ((t.flags &= -257), (t = uc(e, t, n)));
          else if (t.memoizedState !== null)
            ((t.child = e.child), (t.flags |= 128), (t = null));
          else throw Error(s(558));
        else if (
          (tc || Ji(e, t, n, !1), (i = (n & e.childLanes) !== 0), tc || i)
        ) {
          if (
            ((r = q),
            r !== null && ((o = ot(r, n)), o !== 0 && o !== a.retryLane))
          )
            throw ((a.retryLane = o), ei(e, o), hu(r, e, o), ec);
          (Du(), (t = uc(e, t, n)));
        } else
          ((e = a.treeContext),
            (H = cf(o.nextSibling)),
            (Ai = t),
            (U = !0),
            (ji = null),
            (Mi = !1),
            e !== null && ki(t, e),
            (t = lc(t, r)),
            (t.flags |= 4096));
        return t;
      }
      return (
        (e = si(e.child, { mode: r.mode, children: r.children })),
        (e.ref = t.ref),
        (t.child = e),
        (e.return = t),
        e
      );
    }
    function fc(e, t) {
      var n = t.ref;
      if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof n != `function` && typeof n != `object`) throw Error(s(284));
        (e === null || e.ref !== n) && (t.flags |= 4194816);
      }
    }
    function pc(e, t, n, r, i) {
      return (
        Xi(t),
        (n = bo(e, t, n, r, void 0, i)),
        (r = wo()),
        e !== null && !tc
          ? (To(e, t, i), Dc(e, t, i))
          : (U && r && Di(t), (t.flags |= 1), nc(e, t, n, i), t.child)
      );
    }
    function mc(e, t, n, r, i, a) {
      return (
        Xi(t),
        (t.updateQueue = null),
        (n = So(t, r, n, i)),
        xo(e),
        (r = wo()),
        e !== null && !tc
          ? (To(e, t, a), Dc(e, t, a))
          : (U && r && Di(t), (t.flags |= 1), nc(e, t, n, a), t.child)
      );
    }
    function hc(e, t, n, r, i) {
      if ((Xi(t), t.stateNode === null)) {
        var a = ri,
          o = n.contextType;
        (typeof o == `object` && o && (a = Zi(o)),
          (a = new n(r, a)),
          (t.memoizedState =
            a.state !== null && a.state !== void 0 ? a.state : null),
          (a.updater = Vs),
          (t.stateNode = a),
          (a._reactInternals = t),
          (a = t.stateNode),
          (a.props = r),
          (a.state = t.memoizedState),
          (a.refs = {}),
          La(t),
          (o = n.contextType),
          (a.context = typeof o == `object` && o ? Zi(o) : ri),
          (a.state = t.memoizedState),
          (o = n.getDerivedStateFromProps),
          typeof o == `function` &&
            (Bs(t, n, o, r), (a.state = t.memoizedState)),
          typeof n.getDerivedStateFromProps == `function` ||
            typeof a.getSnapshotBeforeUpdate == `function` ||
            (typeof a.UNSAFE_componentWillMount != `function` &&
              typeof a.componentWillMount != `function`) ||
            ((o = a.state),
            typeof a.componentWillMount == `function` && a.componentWillMount(),
            typeof a.UNSAFE_componentWillMount == `function` &&
              a.UNSAFE_componentWillMount(),
            o !== a.state && Vs.enqueueReplaceState(a, a.state, null),
            Ga(t, r, a, i),
            Wa(),
            (a.state = t.memoizedState)),
          typeof a.componentDidMount == `function` && (t.flags |= 4194308),
          (r = !0));
      } else if (e === null) {
        a = t.stateNode;
        var s = t.memoizedProps,
          c = Ws(n, s);
        a.props = c;
        var l = a.context,
          u = n.contextType;
        ((o = ri), typeof u == `object` && u && (o = Zi(u)));
        var d = n.getDerivedStateFromProps;
        ((u =
          typeof d == `function` ||
          typeof a.getSnapshotBeforeUpdate == `function`),
          (s = t.pendingProps !== s),
          u ||
            (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
              typeof a.componentWillReceiveProps != `function`) ||
            ((s || l !== o) && Us(t, a, r, o)),
          (Ia = !1));
        var f = t.memoizedState;
        ((a.state = f),
          Ga(t, r, a, i),
          Wa(),
          (l = t.memoizedState),
          s || f !== l || Ia
            ? (typeof d == `function` &&
                (Bs(t, n, d, r), (l = t.memoizedState)),
              (c = Ia || Hs(t, n, c, r, f, l, o))
                ? (u ||
                    (typeof a.UNSAFE_componentWillMount != `function` &&
                      typeof a.componentWillMount != `function`) ||
                    (typeof a.componentWillMount == `function` &&
                      a.componentWillMount(),
                    typeof a.UNSAFE_componentWillMount == `function` &&
                      a.UNSAFE_componentWillMount()),
                  typeof a.componentDidMount == `function` &&
                    (t.flags |= 4194308))
                : (typeof a.componentDidMount == `function` &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = l)),
              (a.props = r),
              (a.state = l),
              (a.context = o),
              (r = c))
            : (typeof a.componentDidMount == `function` && (t.flags |= 4194308),
              (r = !1)));
      } else {
        ((a = t.stateNode),
          Ra(e, t),
          (o = t.memoizedProps),
          (u = Ws(n, o)),
          (a.props = u),
          (d = t.pendingProps),
          (f = a.context),
          (l = n.contextType),
          (c = ri),
          typeof l == `object` && l && (c = Zi(l)),
          (s = n.getDerivedStateFromProps),
          (l =
            typeof s == `function` ||
            typeof a.getSnapshotBeforeUpdate == `function`) ||
            (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
              typeof a.componentWillReceiveProps != `function`) ||
            ((o !== d || f !== c) && Us(t, a, r, c)),
          (Ia = !1),
          (f = t.memoizedState),
          (a.state = f),
          Ga(t, r, a, i),
          Wa());
        var p = t.memoizedState;
        o !== d ||
        f !== p ||
        Ia ||
        (e !== null && e.dependencies !== null && Yi(e.dependencies))
          ? (typeof s == `function` && (Bs(t, n, s, r), (p = t.memoizedState)),
            (u =
              Ia ||
              Hs(t, n, u, r, f, p, c) ||
              (e !== null && e.dependencies !== null && Yi(e.dependencies)))
              ? (l ||
                  (typeof a.UNSAFE_componentWillUpdate != `function` &&
                    typeof a.componentWillUpdate != `function`) ||
                  (typeof a.componentWillUpdate == `function` &&
                    a.componentWillUpdate(r, p, c),
                  typeof a.UNSAFE_componentWillUpdate == `function` &&
                    a.UNSAFE_componentWillUpdate(r, p, c)),
                typeof a.componentDidUpdate == `function` && (t.flags |= 4),
                typeof a.getSnapshotBeforeUpdate == `function` &&
                  (t.flags |= 1024))
              : (typeof a.componentDidUpdate != `function` ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof a.getSnapshotBeforeUpdate != `function` ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = p)),
            (a.props = r),
            (a.state = p),
            (a.context = c),
            (r = u))
          : (typeof a.componentDidUpdate != `function` ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != `function` ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return (
        (a = r),
        fc(e, t),
        (r = (t.flags & 128) != 0),
        a || r
          ? ((a = t.stateNode),
            (n =
              r && typeof n.getDerivedStateFromError != `function`
                ? null
                : a.render()),
            (t.flags |= 1),
            e !== null && r
              ? ((t.child = Pa(t, e.child, null, i)),
                (t.child = Pa(t, null, n, i)))
              : nc(e, t, n, i),
            (t.memoizedState = a.state),
            (e = t.child))
          : (e = Dc(e, t, i)),
        e
      );
    }
    function gc(e, t, n, r) {
      return (Ri(), (t.flags |= 256), nc(e, t, n, r), t.child);
    }
    var _c = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function vc(e) {
      return { baseLanes: e, cachePool: _a() };
    }
    function yc(e, t, n) {
      return ((e = e === null ? 0 : e.childLanes & ~n), t && (e |= Jl), e);
    }
    function bc(e, t, n) {
      var r = t.pendingProps,
        i = !1,
        a = (t.flags & 128) != 0,
        o;
      if (
        ((o = a) ||
          (o =
            e !== null && e.memoizedState === null
              ? !1
              : (oo.current & 2) != 0),
        o && ((i = !0), (t.flags &= -129)),
        (o = (t.flags & 32) != 0),
        (t.flags &= -33),
        e === null)
      ) {
        if (U) {
          if (
            (i ? to(t) : io(t),
            (e = H)
              ? ((e = rf(e, Mi)),
                (e = e !== null && e.data !== `&` ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: Si === null ? null : { id: Ci, overflow: wi },
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = fi(e)),
                  (n.return = t),
                  (t.child = n),
                  (Ai = t),
                  (H = null)))
              : (e = null),
            e === null)
          )
            throw Pi(t);
          return (of(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        }
        var c = r.children;
        return (
          (r = r.fallback),
          i
            ? (io(t),
              (i = t.mode),
              (c = Sc({ mode: `hidden`, children: c }, i)),
              (r = ui(r, i, n, null)),
              (c.return = t),
              (r.return = t),
              (c.sibling = r),
              (t.child = c),
              (r = t.child),
              (r.memoizedState = vc(n)),
              (r.childLanes = yc(e, o, n)),
              (t.memoizedState = _c),
              sc(null, r))
            : (to(t), xc(t, c))
        );
      }
      var l = e.memoizedState;
      if (l !== null && ((c = l.dehydrated), c !== null)) {
        if (a)
          t.flags & 256
            ? (to(t), (t.flags &= -257), (t = Cc(e, t, n)))
            : t.memoizedState === null
              ? (io(t),
                (c = r.fallback),
                (i = t.mode),
                (r = Sc({ mode: `visible`, children: r.children }, i)),
                (c = ui(c, i, n, null)),
                (c.flags |= 2),
                (r.return = t),
                (c.return = t),
                (r.sibling = c),
                (t.child = r),
                Pa(t, e.child, null, n),
                (r = t.child),
                (r.memoizedState = vc(n)),
                (r.childLanes = yc(e, o, n)),
                (t.memoizedState = _c),
                (t = sc(null, r)))
              : (io(t), (t.child = e.child), (t.flags |= 128), (t = null));
        else if ((to(t), of(c))) {
          if (((o = c.nextSibling && c.nextSibling.dataset), o)) var u = o.dgst;
          ((o = u),
            (r = Error(s(419))),
            (r.stack = ``),
            (r.digest = o),
            Bi({ value: r, source: null, stack: null }),
            (t = Cc(e, t, n)));
        } else if (
          (tc || Ji(e, t, n, !1), (o = (n & e.childLanes) !== 0), tc || o)
        ) {
          if (
            ((o = q),
            o !== null && ((r = ot(o, n)), r !== 0 && r !== l.retryLane))
          )
            throw ((l.retryLane = r), ei(e, r), hu(o, e, r), ec);
          (af(c) || Du(), (t = Cc(e, t, n)));
        } else
          af(c)
            ? ((t.flags |= 192), (t.child = e.child), (t = null))
            : ((e = l.treeContext),
              (H = cf(c.nextSibling)),
              (Ai = t),
              (U = !0),
              (ji = null),
              (Mi = !1),
              e !== null && ki(t, e),
              (t = xc(t, r.children)),
              (t.flags |= 4096));
        return t;
      }
      return i
        ? (io(t),
          (c = r.fallback),
          (i = t.mode),
          (l = e.child),
          (u = l.sibling),
          (r = si(l, { mode: `hidden`, children: r.children })),
          (r.subtreeFlags = l.subtreeFlags & 65011712),
          u === null
            ? ((c = ui(c, i, n, null)), (c.flags |= 2))
            : (c = si(u, c)),
          (c.return = t),
          (r.return = t),
          (r.sibling = c),
          (t.child = r),
          sc(null, r),
          (r = t.child),
          (c = e.child.memoizedState),
          c === null
            ? (c = vc(n))
            : ((i = c.cachePool),
              i === null
                ? (i = _a())
                : ((l = ra._currentValue),
                  (i = i.parent === l ? i : { parent: l, pool: l })),
              (c = { baseLanes: c.baseLanes | n, cachePool: i })),
          (r.memoizedState = c),
          (r.childLanes = yc(e, o, n)),
          (t.memoizedState = _c),
          sc(e.child, r))
        : (to(t),
          (n = e.child),
          (e = n.sibling),
          (n = si(n, { mode: `visible`, children: r.children })),
          (n.return = t),
          (n.sibling = null),
          e !== null &&
            ((o = t.deletions),
            o === null ? ((t.deletions = [e]), (t.flags |= 16)) : o.push(e)),
          (t.child = n),
          (t.memoizedState = null),
          n);
    }
    function xc(e, t) {
      return (
        (t = Sc({ mode: `visible`, children: t }, e.mode)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Sc(e, t) {
      return ((e = ai(22, e, null, t)), (e.lanes = 0), e);
    }
    function Cc(e, t, n) {
      return (
        Pa(t, e.child, null, n),
        (e = xc(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function wc(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      (r !== null && (r.lanes |= t), Ki(e.return, t, n));
    }
    function Tc(e, t, n, r, i, a) {
      var o = e.memoizedState;
      o === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
            treeForkCount: a,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = i),
          (o.treeForkCount = a));
    }
    function Ec(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail;
      r = r.children;
      var o = oo.current,
        s = (o & 2) != 0;
      if (
        (s ? ((o = (o & 1) | 2), (t.flags |= 128)) : (o &= 1),
        A(oo, o),
        nc(e, t, r, n),
        (r = U ? yi : 0),
        !s && e !== null && e.flags & 128)
      )
        a: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
          else if (e.tag === 19) wc(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break a;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break a;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      switch (i) {
        case `forwards`:
          for (n = t.child, i = null; n !== null; )
            ((e = n.alternate),
              e !== null && so(e) === null && (i = n),
              (n = n.sibling));
          ((n = i),
            n === null
              ? ((i = t.child), (t.child = null))
              : ((i = n.sibling), (n.sibling = null)),
            Tc(t, !1, i, n, a, r));
          break;
        case `backwards`:
        case `unstable_legacy-backwards`:
          for (n = null, i = t.child, t.child = null; i !== null; ) {
            if (((e = i.alternate), e !== null && so(e) === null)) {
              t.child = i;
              break;
            }
            ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
          }
          Tc(t, !0, n, null, a, r);
          break;
        case `together`:
          Tc(t, !1, null, null, void 0, r);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Dc(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Gl |= t.lanes),
        (n & t.childLanes) === 0)
      )
        if (e !== null) {
          if ((Ji(e, t, n, !1), (n & t.childLanes) === 0)) return null;
        } else return null;
      if (e !== null && t.child !== e.child) throw Error(s(153));
      if (t.child !== null) {
        for (
          e = t.child, n = si(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling),
            (n = n.sibling = si(e, e.pendingProps)),
            (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function Oc(e, t) {
      return (e.lanes & t) === 0
        ? ((e = e.dependencies), !!(e !== null && Yi(e)))
        : !0;
    }
    function kc(e, t, n) {
      switch (t.tag) {
        case 3:
          (ge(t, t.stateNode.containerInfo),
            Wi(t, ra, e.memoizedState.cache),
            Ri());
          break;
        case 27:
        case 5:
          ve(t);
          break;
        case 4:
          ge(t, t.stateNode.containerInfo);
          break;
        case 10:
          Wi(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return ((t.flags |= 128), no(t), null);
          break;
        case 13:
          var r = t.memoizedState;
          if (r !== null)
            return r.dehydrated === null
              ? (n & t.child.childLanes) === 0
                ? (to(t), (e = Dc(e, t, n)), e === null ? null : e.sibling)
                : bc(e, t, n)
              : (to(t), (t.flags |= 128), null);
          to(t);
          break;
        case 19:
          var i = (e.flags & 128) != 0;
          if (
            ((r = (n & t.childLanes) !== 0),
            (r ||= (Ji(e, t, n, !1), (n & t.childLanes) !== 0)),
            i)
          ) {
            if (r) return Ec(e, t, n);
            t.flags |= 128;
          }
          if (
            ((i = t.memoizedState),
            i !== null &&
              ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            A(oo, oo.current),
            r)
          )
            break;
          return null;
        case 22:
          return ((t.lanes = 0), oc(e, t, n, t.pendingProps));
        case 24:
          Wi(t, ra, e.memoizedState.cache);
      }
      return Dc(e, t, n);
    }
    function Ac(e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps) tc = !0;
        else {
          if (!Oc(e, n) && !(t.flags & 128)) return ((tc = !1), kc(e, t, n));
          tc = !!(e.flags & 131072);
        }
      else ((tc = !1), U && t.flags & 1048576 && Ei(t, yi, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          a: {
            var r = t.pendingProps;
            if (((e = wa(t.elementType)), (t.type = e), typeof e == `function`))
              oi(e)
                ? ((r = Ws(e, r)), (t.tag = 1), (t = hc(null, t, e, r, n)))
                : ((t.tag = 0), (t = pc(null, t, e, r, n)));
            else {
              if (e != null) {
                var i = e.$$typeof;
                if (i === C) {
                  ((t.tag = 11), (t = rc(null, t, e, r, n)));
                  break a;
                } else if (i === re) {
                  ((t.tag = 14), (t = ic(null, t, e, r, n)));
                  break a;
                }
              }
              throw ((t = ce(e) || e), Error(s(306, t, ``)));
            }
          }
          return t;
        case 0:
          return pc(e, t, t.type, t.pendingProps, n);
        case 1:
          return ((r = t.type), (i = Ws(r, t.pendingProps)), hc(e, t, r, i, n));
        case 3:
          a: {
            if ((ge(t, t.stateNode.containerInfo), e === null))
              throw Error(s(387));
            r = t.pendingProps;
            var a = t.memoizedState;
            ((i = a.element), Ra(e, t), Ga(t, r, null, n));
            var o = t.memoizedState;
            if (
              ((r = o.cache),
              Wi(t, ra, r),
              r !== a.cache && qi(t, [ra], n, !0),
              Wa(),
              (r = o.element),
              a.isDehydrated)
            )
              if (
                ((a = { element: r, isDehydrated: !1, cache: o.cache }),
                (t.updateQueue.baseState = a),
                (t.memoizedState = a),
                t.flags & 256)
              ) {
                t = gc(e, t, r, n);
                break a;
              } else if (r !== i) {
                ((i = hi(Error(s(424)), t)), Bi(i), (t = gc(e, t, r, n)));
                break a;
              } else {
                switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === `HTML` ? e.ownerDocument.body : e;
                }
                for (
                  H = cf(e.firstChild),
                    Ai = t,
                    U = !0,
                    ji = null,
                    Mi = !0,
                    n = Fa(t, null, r, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
              }
            else {
              if ((Ri(), r === i)) {
                t = Dc(e, t, n);
                break a;
              }
              nc(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            fc(e, t),
            e === null
              ? (n = kf(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = n)
                : U ||
                  ((n = t.type),
                  (e = t.pendingProps),
                  (r = Bd(me.current).createElement(n)),
                  (r[ft] = t),
                  (r[pt] = e),
                  Pd(r, n, e),
                  wt(r),
                  (t.stateNode = r))
              : (t.memoizedState = kf(
                  t.type,
                  e.memoizedProps,
                  t.pendingProps,
                  e.memoizedState,
                )),
            null
          );
        case 27:
          return (
            ve(t),
            e === null &&
              U &&
              ((r = t.stateNode = ff(t.type, t.pendingProps, me.current)),
              (Ai = t),
              (Mi = !0),
              (i = H),
              Zd(t.type) ? ((lf = i), (H = cf(r.firstChild))) : (H = i)),
            nc(e, t, t.pendingProps.children, n),
            fc(e, t),
            e === null && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            e === null &&
              U &&
              ((i = r = H) &&
                ((r = tf(r, t.type, t.pendingProps, Mi)),
                r === null
                  ? (i = !1)
                  : ((t.stateNode = r),
                    (Ai = t),
                    (H = cf(r.firstChild)),
                    (Mi = !1),
                    (i = !0))),
              i || Pi(t)),
            ve(t),
            (i = t.type),
            (a = t.pendingProps),
            (o = e === null ? null : e.memoizedProps),
            (r = a.children),
            Ud(i, a) ? (r = null) : o !== null && Ud(i, o) && (t.flags |= 32),
            t.memoizedState !== null &&
              ((i = bo(e, t, Co, null, null, n)), (Qf._currentValue = i)),
            fc(e, t),
            nc(e, t, r, n),
            t.child
          );
        case 6:
          return (
            e === null &&
              U &&
              ((e = n = H) &&
                ((n = nf(n, t.pendingProps, Mi)),
                n === null
                  ? (e = !1)
                  : ((t.stateNode = n), (Ai = t), (H = null), (e = !0))),
              e || Pi(t)),
            null
          );
        case 13:
          return bc(e, t, n);
        case 4:
          return (
            ge(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = Pa(t, null, r, n)) : nc(e, t, r, n),
            t.child
          );
        case 11:
          return rc(e, t, t.type, t.pendingProps, n);
        case 7:
          return (nc(e, t, t.pendingProps, n), t.child);
        case 8:
          return (nc(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (nc(e, t, t.pendingProps.children, n), t.child);
        case 10:
          return (
            (r = t.pendingProps),
            Wi(t, t.type, r.value),
            nc(e, t, r.children, n),
            t.child
          );
        case 9:
          return (
            (i = t.type._context),
            (r = t.pendingProps.children),
            Xi(t),
            (i = Zi(i)),
            (r = r(i)),
            (t.flags |= 1),
            nc(e, t, r, n),
            t.child
          );
        case 14:
          return ic(e, t, t.type, t.pendingProps, n);
        case 15:
          return ac(e, t, t.type, t.pendingProps, n);
        case 19:
          return Ec(e, t, n);
        case 31:
          return dc(e, t, n);
        case 22:
          return oc(e, t, n, t.pendingProps);
        case 24:
          return (
            Xi(t),
            (r = Zi(ra)),
            e === null
              ? ((i = ha()),
                i === null &&
                  ((i = q),
                  (a = ia()),
                  (i.pooledCache = a),
                  a.refCount++,
                  a !== null && (i.pooledCacheLanes |= n),
                  (i = a)),
                (t.memoizedState = { parent: r, cache: i }),
                La(t),
                Wi(t, ra, i))
              : ((e.lanes & n) !== 0 && (Ra(e, t), Ga(t, null, null, n), Wa()),
                (i = e.memoizedState),
                (a = t.memoizedState),
                i.parent === r
                  ? ((r = a.cache),
                    Wi(t, ra, r),
                    r !== i.cache && qi(t, [ra], n, !0))
                  : ((i = { parent: r, cache: r }),
                    (t.memoizedState = i),
                    t.lanes === 0 &&
                      (t.memoizedState = t.updateQueue.baseState = i),
                    Wi(t, ra, r))),
            nc(e, t, t.pendingProps.children, n),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(s(156, t.tag));
    }
    function jc(e) {
      e.flags |= 4;
    }
    function Mc(e, t, n, r, i) {
      if (((t = (e.mode & 32) != 0) && (t = !1), t)) {
        if (((e.flags |= 16777216), (i & 335544128) === i))
          if (e.stateNode.complete) e.flags |= 8192;
          else if (wu()) e.flags |= 8192;
          else throw ((Ta = xa), ya);
      } else e.flags &= -16777217;
    }
    function Nc(e, t) {
      if (t.type !== `stylesheet` || t.state.loading & 4) e.flags &= -16777217;
      else if (((e.flags |= 16777216), !Wf(t)))
        if (wu()) e.flags |= 8192;
        else throw ((Ta = xa), ya);
    }
    function Pc(e, t) {
      (t !== null && (e.flags |= 4),
        e.flags & 16384 &&
          ((t = e.tag === 22 ? 536870912 : et()), (e.lanes |= t), (Yl |= t)));
    }
    function Fc(e, t) {
      if (!U)
        switch (e.tailMode) {
          case `hidden`:
            t = e.tail;
            for (var n = null; t !== null; )
              (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case `collapsed`:
            n = e.tail;
            for (var r = null; n !== null; )
              (n.alternate !== null && (r = n), (n = n.sibling));
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function Ic(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 65011712),
            (r |= i.flags & 65011712),
            (i.return = e),
            (i = i.sibling));
      else
        for (i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling));
      return ((e.subtreeFlags |= r), (e.childLanes = n), t);
    }
    function Lc(e, t, n) {
      var r = t.pendingProps;
      switch ((Oi(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (Ic(t), null);
        case 1:
          return (Ic(t), null);
        case 3:
          return (
            (n = t.stateNode),
            (r = null),
            e !== null && (r = e.memoizedState.cache),
            t.memoizedState.cache !== r && (t.flags |= 2048),
            Gi(ra),
            _e(),
            n.pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (e === null || e.child === null) &&
              (Li(t)
                ? jc(t)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), zi())),
            Ic(t),
            null
          );
        case 26:
          var i = t.type,
            a = t.memoizedState;
          return (
            e === null
              ? (jc(t),
                a === null ? (Ic(t), Mc(t, i, null, r, n)) : (Ic(t), Nc(t, a)))
              : a
                ? a === e.memoizedState
                  ? (Ic(t), (t.flags &= -16777217))
                  : (jc(t), Ic(t), Nc(t, a))
                : ((e = e.memoizedProps),
                  e !== r && jc(t),
                  Ic(t),
                  Mc(t, i, e, r, n)),
            null
          );
        case 27:
          if (
            (ye(t),
            (n = me.current),
            (i = t.type),
            e !== null && t.stateNode != null)
          )
            e.memoizedProps !== r && jc(t);
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(s(166));
              return (Ic(t), null);
            }
            ((e = pe.current),
              Li(t) ? Fi(t, e) : ((e = ff(i, r, n)), (t.stateNode = e), jc(t)));
          }
          return (Ic(t), null);
        case 5:
          if ((ye(t), (i = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== r && jc(t);
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(s(166));
              return (Ic(t), null);
            }
            if (((a = pe.current), Li(t))) Fi(t, a);
            else {
              var o = Bd(me.current);
              switch (a) {
                case 1:
                  a = o.createElementNS(`http://www.w3.org/2000/svg`, i);
                  break;
                case 2:
                  a = o.createElementNS(
                    `http://www.w3.org/1998/Math/MathML`,
                    i,
                  );
                  break;
                default:
                  switch (i) {
                    case `svg`:
                      a = o.createElementNS(`http://www.w3.org/2000/svg`, i);
                      break;
                    case `math`:
                      a = o.createElementNS(
                        `http://www.w3.org/1998/Math/MathML`,
                        i,
                      );
                      break;
                    case `script`:
                      ((a = o.createElement(`div`)),
                        (a.innerHTML = `<script><\/script>`),
                        (a = a.removeChild(a.firstChild)));
                      break;
                    case `select`:
                      ((a =
                        typeof r.is == `string`
                          ? o.createElement(`select`, { is: r.is })
                          : o.createElement(`select`)),
                        r.multiple
                          ? (a.multiple = !0)
                          : r.size && (a.size = r.size));
                      break;
                    default:
                      a =
                        typeof r.is == `string`
                          ? o.createElement(i, { is: r.is })
                          : o.createElement(i);
                  }
              }
              ((a[ft] = t), (a[pt] = r));
              a: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                  ((o.child.return = o), (o = o.child));
                  continue;
                }
                if (o === t) break a;
                for (; o.sibling === null; ) {
                  if (o.return === null || o.return === t) break a;
                  o = o.return;
                }
                ((o.sibling.return = o.return), (o = o.sibling));
              }
              t.stateNode = a;
              a: switch ((Pd(a, i, r), i)) {
                case `button`:
                case `input`:
                case `select`:
                case `textarea`:
                  r = !!r.autoFocus;
                  break a;
                case `img`:
                  r = !0;
                  break a;
                default:
                  r = !1;
              }
              r && jc(t);
            }
          }
          return (
            Ic(t),
            Mc(
              t,
              t.type,
              e === null ? null : e.memoizedProps,
              t.pendingProps,
              n,
            ),
            null
          );
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== r && jc(t);
          else {
            if (typeof r != `string` && t.stateNode === null)
              throw Error(s(166));
            if (((e = me.current), Li(t))) {
              if (
                ((e = t.stateNode),
                (n = t.memoizedProps),
                (r = null),
                (i = Ai),
                i !== null)
              )
                switch (i.tag) {
                  case 27:
                  case 5:
                    r = i.memoizedProps;
                }
              ((e[ft] = t),
                (e = !!(
                  e.nodeValue === n ||
                  (r !== null && !0 === r.suppressHydrationWarning) ||
                  Md(e.nodeValue, n)
                )),
                e || Pi(t, !0));
            } else
              ((e = Bd(e).createTextNode(r)), (e[ft] = t), (t.stateNode = e));
          }
          return (Ic(t), null);
        case 31:
          if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
            if (((r = Li(t)), n !== null)) {
              if (e === null) {
                if (!r) throw Error(s(318));
                if (
                  ((e = t.memoizedState),
                  (e = e === null ? null : e.dehydrated),
                  !e)
                )
                  throw Error(s(557));
                e[ft] = t;
              } else
                (Ri(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4));
              (Ic(t), (e = !1));
            } else
              ((n = zi()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = n),
                (e = !0));
            if (!e) return t.flags & 256 ? (ao(t), t) : (ao(t), null);
            if (t.flags & 128) throw Error(s(558));
          }
          return (Ic(t), null);
        case 13:
          if (
            ((r = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (((i = Li(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!i) throw Error(s(318));
                if (
                  ((i = t.memoizedState),
                  (i = i === null ? null : i.dehydrated),
                  !i)
                )
                  throw Error(s(317));
                i[ft] = t;
              } else
                (Ri(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4));
              (Ic(t), (i = !1));
            } else
              ((i = zi()),
                e !== null &&
                  e.memoizedState !== null &&
                  (e.memoizedState.hydrationErrors = i),
                (i = !0));
            if (!i) return t.flags & 256 ? (ao(t), t) : (ao(t), null);
          }
          return (
            ao(t),
            t.flags & 128
              ? ((t.lanes = n), t)
              : ((n = r !== null),
                (e = e !== null && e.memoizedState !== null),
                n &&
                  ((r = t.child),
                  (i = null),
                  r.alternate !== null &&
                    r.alternate.memoizedState !== null &&
                    r.alternate.memoizedState.cachePool !== null &&
                    (i = r.alternate.memoizedState.cachePool.pool),
                  (a = null),
                  r.memoizedState !== null &&
                    r.memoizedState.cachePool !== null &&
                    (a = r.memoizedState.cachePool.pool),
                  a !== i && (r.flags |= 2048)),
                n !== e && n && (t.child.flags |= 8192),
                Pc(t, t.updateQueue),
                Ic(t),
                null)
          );
        case 4:
          return (
            _e(),
            e === null && Sd(t.stateNode.containerInfo),
            Ic(t),
            null
          );
        case 10:
          return (Gi(t.type), Ic(t), null);
        case 19:
          if ((k(oo), (r = t.memoizedState), r === null)) return (Ic(t), null);
          if (((i = (t.flags & 128) != 0), (a = r.rendering), a === null))
            if (i) Fc(r, !1);
            else {
              if (Wl !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((a = so(e)), a !== null)) {
                    for (
                      t.flags |= 128,
                        Fc(r, !1),
                        e = a.updateQueue,
                        t.updateQueue = e,
                        Pc(t, e),
                        t.subtreeFlags = 0,
                        e = n,
                        n = t.child;
                      n !== null;
                    )
                      (ci(n, e), (n = n.sibling));
                    return (
                      A(oo, (oo.current & 1) | 2),
                      U && Ti(t, r.treeForkCount),
                      t.child
                    );
                  }
                  e = e.sibling;
                }
              r.tail !== null &&
                Me() > tu &&
                ((t.flags |= 128), (i = !0), Fc(r, !1), (t.lanes = 4194304));
            }
          else {
            if (!i)
              if (((e = so(a)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (i = !0),
                  (e = e.updateQueue),
                  (t.updateQueue = e),
                  Pc(t, e),
                  Fc(r, !0),
                  r.tail === null &&
                    r.tailMode === `hidden` &&
                    !a.alternate &&
                    !U)
                )
                  return (Ic(t), null);
              } else
                2 * Me() - r.renderingStartTime > tu &&
                  n !== 536870912 &&
                  ((t.flags |= 128), (i = !0), Fc(r, !1), (t.lanes = 4194304));
            r.isBackwards
              ? ((a.sibling = t.child), (t.child = a))
              : ((e = r.last),
                e === null ? (t.child = a) : (e.sibling = a),
                (r.last = a));
          }
          return r.tail === null
            ? (Ic(t), null)
            : ((e = r.tail),
              (r.rendering = e),
              (r.tail = e.sibling),
              (r.renderingStartTime = Me()),
              (e.sibling = null),
              (n = oo.current),
              A(oo, i ? (n & 1) | 2 : n & 1),
              U && Ti(t, r.treeForkCount),
              e);
        case 22:
        case 23:
          return (
            ao(t),
            Qa(),
            (r = t.memoizedState !== null),
            e === null
              ? r && (t.flags |= 8192)
              : (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r
              ? n & 536870912 &&
                !(t.flags & 128) &&
                (Ic(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : Ic(t),
            (n = t.updateQueue),
            n !== null && Pc(t, n.retryQueue),
            (n = null),
            e !== null &&
              e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (n = e.memoizedState.cachePool.pool),
            (r = null),
            t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (r = t.memoizedState.cachePool.pool),
            r !== n && (t.flags |= 2048),
            e !== null && k(ma),
            null
          );
        case 24:
          return (
            (n = null),
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            Gi(ra),
            Ic(t),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(s(156, t.tag));
    }
    function Rc(e, t) {
      switch ((Oi(t), t.tag)) {
        case 1:
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            Gi(ra),
            _e(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 26:
        case 27:
        case 5:
          return (ye(t), null);
        case 31:
          if (t.memoizedState !== null) {
            if ((ao(t), t.alternate === null)) throw Error(s(340));
            Ri();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 13:
          if (
            (ao(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(s(340));
            Ri();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return (k(oo), null);
        case 4:
          return (_e(), null);
        case 10:
          return (Gi(t.type), null);
        case 22:
        case 23:
          return (
            ao(t),
            Qa(),
            e !== null && k(ma),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 24:
          return (Gi(ra), null);
        case 25:
          return null;
        default:
          return null;
      }
    }
    function zc(e, t) {
      switch ((Oi(t), t.tag)) {
        case 3:
          (Gi(ra), _e());
          break;
        case 26:
        case 27:
        case 5:
          ye(t);
          break;
        case 4:
          _e();
          break;
        case 31:
          t.memoizedState !== null && ao(t);
          break;
        case 13:
          ao(t);
          break;
        case 19:
          k(oo);
          break;
        case 10:
          Gi(t.type);
          break;
        case 22:
        case 23:
          (ao(t), Qa(), e !== null && k(ma));
          break;
        case 24:
          Gi(ra);
      }
    }
    function Bc(e, t) {
      try {
        var n = t.updateQueue,
          r = n === null ? null : n.lastEffect;
        if (r !== null) {
          var i = r.next;
          n = i;
          do {
            if ((n.tag & e) === e) {
              r = void 0;
              var a = n.create,
                o = n.inst;
              ((r = a()), (o.destroy = r));
            }
            n = n.next;
          } while (n !== i);
        }
      } catch (e) {
        Z(t, t.return, e);
      }
    }
    function Vc(e, t, n) {
      try {
        var r = t.updateQueue,
          i = r === null ? null : r.lastEffect;
        if (i !== null) {
          var a = i.next;
          r = a;
          do {
            if ((r.tag & e) === e) {
              var o = r.inst,
                s = o.destroy;
              if (s !== void 0) {
                ((o.destroy = void 0), (i = t));
                var c = n,
                  l = s;
                try {
                  l();
                } catch (e) {
                  Z(i, c, e);
                }
              }
            }
            r = r.next;
          } while (r !== a);
        }
      } catch (e) {
        Z(t, t.return, e);
      }
    }
    function Hc(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var n = e.stateNode;
        try {
          qa(t, n);
        } catch (t) {
          Z(e, e.return, t);
        }
      }
    }
    function Uc(e, t, n) {
      ((n.props = Ws(e.type, e.memoizedProps)), (n.state = e.memoizedState));
      try {
        n.componentWillUnmount();
      } catch (n) {
        Z(e, t, n);
      }
    }
    function Wc(e, t) {
      try {
        var n = e.ref;
        if (n !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var r = e.stateNode;
              break;
            case 30:
              r = e.stateNode;
              break;
            default:
              r = e.stateNode;
          }
          typeof n == `function` ? (e.refCleanup = n(r)) : (n.current = r);
        }
      } catch (n) {
        Z(e, t, n);
      }
    }
    function Gc(e, t) {
      var n = e.ref,
        r = e.refCleanup;
      if (n !== null)
        if (typeof r == `function`)
          try {
            r();
          } catch (n) {
            Z(e, t, n);
          } finally {
            ((e.refCleanup = null),
              (e = e.alternate),
              e != null && (e.refCleanup = null));
          }
        else if (typeof n == `function`)
          try {
            n(null);
          } catch (n) {
            Z(e, t, n);
          }
        else n.current = null;
    }
    function Kc(e) {
      var t = e.type,
        n = e.memoizedProps,
        r = e.stateNode;
      try {
        a: switch (t) {
          case `button`:
          case `input`:
          case `select`:
          case `textarea`:
            n.autoFocus && r.focus();
            break a;
          case `img`:
            n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet);
        }
      } catch (t) {
        Z(e, e.return, t);
      }
    }
    function qc(e, t, n) {
      try {
        var r = e.stateNode;
        (Fd(r, e.type, n, t), (r[pt] = t));
      } catch (t) {
        Z(e, e.return, t);
      }
    }
    function Jc(e) {
      return (
        e.tag === 5 ||
        e.tag === 3 ||
        e.tag === 26 ||
        (e.tag === 27 && Zd(e.type)) ||
        e.tag === 4
      );
    }
    function Yc(e) {
      a: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || Jc(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (
            (e.tag === 27 && Zd(e.type)) ||
            e.flags & 2 ||
            e.child === null ||
            e.tag === 4
          )
            continue a;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Xc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? (n.nodeType === 9
                ? n.body
                : n.nodeName === `HTML`
                  ? n.ownerDocument.body
                  : n
              ).insertBefore(e, t)
            : ((t =
                n.nodeType === 9
                  ? n.body
                  : n.nodeName === `HTML`
                    ? n.ownerDocument.body
                    : n),
              t.appendChild(e),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = tn)));
      else if (
        r !== 4 &&
        (r === 27 && Zd(e.type) && ((n = e.stateNode), (t = null)),
        (e = e.child),
        e !== null)
      )
        for (Xc(e, t, n), e = e.sibling; e !== null; )
          (Xc(e, t, n), (e = e.sibling));
    }
    function Zc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (
        r !== 4 &&
        (r === 27 && Zd(e.type) && (n = e.stateNode), (e = e.child), e !== null)
      )
        for (Zc(e, t, n), e = e.sibling; e !== null; )
          (Zc(e, t, n), (e = e.sibling));
    }
    function Qc(e) {
      var t = e.stateNode,
        n = e.memoizedProps;
      try {
        for (var r = e.type, i = t.attributes; i.length; )
          t.removeAttributeNode(i[0]);
        (Pd(t, r, n), (t[ft] = e), (t[pt] = n));
      } catch (t) {
        Z(e, e.return, t);
      }
    }
    var $c = !1,
      el = !1,
      tl = !1,
      nl = typeof WeakSet == `function` ? WeakSet : Set,
      rl = null;
    function il(e, t) {
      if (((e = e.containerInfo), (Rd = sp), (e = wr(e)), Tr(e))) {
        if (`selectionStart` in e)
          var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          a: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
              n = r.anchorNode;
              var i = r.anchorOffset,
                a = r.focusNode;
              r = r.focusOffset;
              try {
                (n.nodeType, a.nodeType);
              } catch {
                n = null;
                break a;
              }
              var o = 0,
                c = -1,
                l = -1,
                u = 0,
                d = 0,
                f = e,
                p = null;
              b: for (;;) {
                for (
                  var m;
                  f !== n || (i !== 0 && f.nodeType !== 3) || (c = o + i),
                    f !== a || (r !== 0 && f.nodeType !== 3) || (l = o + r),
                    f.nodeType === 3 && (o += f.nodeValue.length),
                    (m = f.firstChild) !== null;
                )
                  ((p = f), (f = m));
                for (;;) {
                  if (f === e) break b;
                  if (
                    (p === n && ++u === i && (c = o),
                    p === a && ++d === r && (l = o),
                    (m = f.nextSibling) !== null)
                  )
                    break;
                  ((f = p), (p = f.parentNode));
                }
                f = m;
              }
              n = c === -1 || l === -1 ? null : { start: c, end: l };
            } else n = null;
          }
        n ||= { start: 0, end: 0 };
      } else n = null;
      for (
        zd = { focusedElem: e, selectionRange: n }, sp = !1, rl = t;
        rl !== null;
      )
        if (((t = rl), (e = t.child), t.subtreeFlags & 1028 && e !== null))
          ((e.return = t), (rl = e));
        else
          for (; rl !== null; ) {
            switch (((t = rl), (a = t.alternate), (e = t.flags), t.tag)) {
              case 0:
                if (
                  e & 4 &&
                  ((e = t.updateQueue),
                  (e = e === null ? null : e.events),
                  e !== null)
                )
                  for (n = 0; n < e.length; n++)
                    ((i = e[n]), (i.ref.impl = i.nextImpl));
                break;
              case 11:
              case 15:
                break;
              case 1:
                if (e & 1024 && a !== null) {
                  ((e = void 0),
                    (n = t),
                    (i = a.memoizedProps),
                    (a = a.memoizedState),
                    (r = n.stateNode));
                  try {
                    var h = Ws(n.type, i);
                    ((e = r.getSnapshotBeforeUpdate(h, a)),
                      (r.__reactInternalSnapshotBeforeUpdate = e));
                  } catch (e) {
                    Z(n, n.return, e);
                  }
                }
                break;
              case 3:
                if (e & 1024) {
                  if (
                    ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                  )
                    ef(e);
                  else if (n === 1)
                    switch (e.nodeName) {
                      case `HEAD`:
                      case `HTML`:
                      case `BODY`:
                        ef(e);
                        break;
                      default:
                        e.textContent = ``;
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if (e & 1024) throw Error(s(163));
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (rl = e));
              break;
            }
            rl = t.return;
          }
    }
    function al(e, t, n) {
      var r = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (bl(e, n), r & 4 && Bc(5, n));
          break;
        case 1:
          if ((bl(e, n), r & 4))
            if (((e = n.stateNode), t === null))
              try {
                e.componentDidMount();
              } catch (e) {
                Z(n, n.return, e);
              }
            else {
              var i = Ws(n.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                e.componentDidUpdate(
                  i,
                  t,
                  e.__reactInternalSnapshotBeforeUpdate,
                );
              } catch (e) {
                Z(n, n.return, e);
              }
            }
          (r & 64 && Hc(n), r & 512 && Wc(n, n.return));
          break;
        case 3:
          if ((bl(e, n), r & 64 && ((e = n.updateQueue), e !== null))) {
            if (((t = null), n.child !== null))
              switch (n.child.tag) {
                case 27:
                case 5:
                  t = n.child.stateNode;
                  break;
                case 1:
                  t = n.child.stateNode;
              }
            try {
              qa(e, t);
            } catch (e) {
              Z(n, n.return, e);
            }
          }
          break;
        case 27:
          t === null && r & 4 && Qc(n);
        case 26:
        case 5:
          (bl(e, n), t === null && r & 4 && Kc(n), r & 512 && Wc(n, n.return));
          break;
        case 12:
          bl(e, n);
          break;
        case 31:
          (bl(e, n), r & 4 && dl(e, n));
          break;
        case 13:
          (bl(e, n),
            r & 4 && fl(e, n),
            r & 64 &&
              ((e = n.memoizedState),
              e !== null &&
                ((e = e.dehydrated),
                e !== null && ((n = Ju.bind(null, n)), sf(e, n)))));
          break;
        case 22:
          if (((r = n.memoizedState !== null || $c), !r)) {
            ((t = (t !== null && t.memoizedState !== null) || el), (i = $c));
            var a = el;
            (($c = r),
              (el = t) && !a
                ? Sl(e, n, (n.subtreeFlags & 8772) != 0)
                : bl(e, n),
              ($c = i),
              (el = a));
          }
          break;
        case 30:
          break;
        default:
          bl(e, n);
      }
    }
    function ol(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), ol(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 && ((t = e.stateNode), t !== null && bt(t)),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    var sl = null,
      cl = !1;
    function ll(e, t, n) {
      for (n = n.child; n !== null; ) (ul(e, t, n), (n = n.sibling));
    }
    function ul(e, t, n) {
      if (M && typeof M.onCommitFiberUnmount == `function`)
        try {
          M.onCommitFiberUnmount(Ve, n);
        } catch {}
      switch (n.tag) {
        case 26:
          (el || Gc(n, t),
            ll(e, t, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode &&
                ((n = n.stateNode), n.parentNode.removeChild(n)));
          break;
        case 27:
          el || Gc(n, t);
          var r = sl,
            i = cl;
          (Zd(n.type) && ((sl = n.stateNode), (cl = !1)),
            ll(e, t, n),
            pf(n.stateNode),
            (sl = r),
            (cl = i));
          break;
        case 5:
          el || Gc(n, t);
        case 6:
          if (
            ((r = sl),
            (i = cl),
            (sl = null),
            ll(e, t, n),
            (sl = r),
            (cl = i),
            sl !== null)
          )
            if (cl)
              try {
                (sl.nodeType === 9
                  ? sl.body
                  : sl.nodeName === `HTML`
                    ? sl.ownerDocument.body
                    : sl
                ).removeChild(n.stateNode);
              } catch (e) {
                Z(n, t, e);
              }
            else
              try {
                sl.removeChild(n.stateNode);
              } catch (e) {
                Z(n, t, e);
              }
          break;
        case 18:
          sl !== null &&
            (cl
              ? ((e = sl),
                Qd(
                  e.nodeType === 9
                    ? e.body
                    : e.nodeName === `HTML`
                      ? e.ownerDocument.body
                      : e,
                  n.stateNode,
                ),
                Np(e))
              : Qd(sl, n.stateNode));
          break;
        case 4:
          ((r = sl),
            (i = cl),
            (sl = n.stateNode.containerInfo),
            (cl = !0),
            ll(e, t, n),
            (sl = r),
            (cl = i));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          (Vc(2, n, t), el || Vc(4, n, t), ll(e, t, n));
          break;
        case 1:
          (el ||
            (Gc(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == `function` && Uc(n, t, r)),
            ll(e, t, n));
          break;
        case 21:
          ll(e, t, n);
          break;
        case 22:
          ((el = (r = el) || n.memoizedState !== null), ll(e, t, n), (el = r));
          break;
        default:
          ll(e, t, n);
      }
    }
    function dl(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
      ) {
        e = e.dehydrated;
        try {
          Np(e);
        } catch (e) {
          Z(t, t.return, e);
        }
      }
    }
    function fl(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate),
        e !== null &&
          ((e = e.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)))
      )
        try {
          Np(e);
        } catch (e) {
          Z(t, t.return, e);
        }
    }
    function pl(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return (t === null && (t = e.stateNode = new nl()), t);
        case 22:
          return (
            (e = e.stateNode),
            (t = e._retryCache),
            t === null && (t = e._retryCache = new nl()),
            t
          );
        default:
          throw Error(s(435, e.tag));
      }
    }
    function ml(e, t) {
      var n = pl(e);
      t.forEach(function (t) {
        if (!n.has(t)) {
          n.add(t);
          var r = Yu.bind(null, e, t);
          t.then(r, r);
        }
      });
    }
    function hl(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            a = e,
            o = t,
            c = o;
          a: for (; c !== null; ) {
            switch (c.tag) {
              case 27:
                if (Zd(c.type)) {
                  ((sl = c.stateNode), (cl = !1));
                  break a;
                }
                break;
              case 5:
                ((sl = c.stateNode), (cl = !1));
                break a;
              case 3:
              case 4:
                ((sl = c.stateNode.containerInfo), (cl = !0));
                break a;
            }
            c = c.return;
          }
          if (sl === null) throw Error(s(160));
          (ul(a, o, i),
            (sl = null),
            (cl = !1),
            (a = i.alternate),
            a !== null && (a.return = null),
            (i.return = null));
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null; ) (_l(t, e), (t = t.sibling));
    }
    var gl = null;
    function _l(e, t) {
      var n = e.alternate,
        r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (hl(t, e),
            vl(e),
            r & 4 && (Vc(3, e, e.return), Bc(3, e), Vc(5, e, e.return)));
          break;
        case 1:
          (hl(t, e),
            vl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            r & 64 &&
              $c &&
              ((e = e.updateQueue),
              e !== null &&
                ((r = e.callbacks),
                r !== null &&
                  ((n = e.shared.hiddenCallbacks),
                  (e.shared.hiddenCallbacks = n === null ? r : n.concat(r))))));
          break;
        case 26:
          var i = gl;
          if (
            (hl(t, e),
            vl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            r & 4)
          ) {
            var a = n === null ? null : n.memoizedState;
            if (((r = e.memoizedState), n === null))
              if (r === null)
                if (e.stateNode === null) {
                  a: {
                    ((r = e.type),
                      (n = e.memoizedProps),
                      (i = i.ownerDocument || i));
                    b: switch (r) {
                      case `title`:
                        ((a = i.getElementsByTagName(`title`)[0]),
                          (!a ||
                            a[yt] ||
                            a[ft] ||
                            a.namespaceURI === `http://www.w3.org/2000/svg` ||
                            a.hasAttribute(`itemprop`)) &&
                            ((a = i.createElement(r)),
                            i.head.insertBefore(
                              a,
                              i.querySelector(`head > title`),
                            )),
                          Pd(a, r, n),
                          (a[ft] = e),
                          wt(a),
                          (r = a));
                        break a;
                      case `link`:
                        var o = Vf(`link`, `href`, i).get(r + (n.href || ``));
                        if (o) {
                          for (var c = 0; c < o.length; c++)
                            if (
                              ((a = o[c]),
                              a.getAttribute(`href`) ===
                                (n.href == null || n.href === ``
                                  ? null
                                  : n.href) &&
                                a.getAttribute(`rel`) ===
                                  (n.rel == null ? null : n.rel) &&
                                a.getAttribute(`title`) ===
                                  (n.title == null ? null : n.title) &&
                                a.getAttribute(`crossorigin`) ===
                                  (n.crossOrigin == null
                                    ? null
                                    : n.crossOrigin))
                            ) {
                              o.splice(c, 1);
                              break b;
                            }
                        }
                        ((a = i.createElement(r)),
                          Pd(a, r, n),
                          i.head.appendChild(a));
                        break;
                      case `meta`:
                        if (
                          (o = Vf(`meta`, `content`, i).get(
                            r + (n.content || ``),
                          ))
                        ) {
                          for (c = 0; c < o.length; c++)
                            if (
                              ((a = o[c]),
                              a.getAttribute(`content`) ===
                                (n.content == null ? null : `` + n.content) &&
                                a.getAttribute(`name`) ===
                                  (n.name == null ? null : n.name) &&
                                a.getAttribute(`property`) ===
                                  (n.property == null ? null : n.property) &&
                                a.getAttribute(`http-equiv`) ===
                                  (n.httpEquiv == null ? null : n.httpEquiv) &&
                                a.getAttribute(`charset`) ===
                                  (n.charSet == null ? null : n.charSet))
                            ) {
                              o.splice(c, 1);
                              break b;
                            }
                        }
                        ((a = i.createElement(r)),
                          Pd(a, r, n),
                          i.head.appendChild(a));
                        break;
                      default:
                        throw Error(s(468, r));
                    }
                    ((a[ft] = e), wt(a), (r = a));
                  }
                  e.stateNode = r;
                } else Hf(i, e.type, e.stateNode);
              else e.stateNode = If(i, r, e.memoizedProps);
            else
              a === r
                ? r === null &&
                  e.stateNode !== null &&
                  qc(e, e.memoizedProps, n.memoizedProps)
                : (a === null
                    ? n.stateNode !== null &&
                      ((n = n.stateNode), n.parentNode.removeChild(n))
                    : a.count--,
                  r === null
                    ? Hf(i, e.type, e.stateNode)
                    : If(i, r, e.memoizedProps));
          }
          break;
        case 27:
          (hl(t, e),
            vl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            n !== null && r & 4 && qc(e, e.memoizedProps, n.memoizedProps));
          break;
        case 5:
          if (
            (hl(t, e),
            vl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            e.flags & 32)
          ) {
            i = e.stateNode;
            try {
              Jt(i, ``);
            } catch (t) {
              Z(e, e.return, t);
            }
          }
          (r & 4 &&
            e.stateNode != null &&
            ((i = e.memoizedProps), qc(e, i, n === null ? i : n.memoizedProps)),
            r & 1024 && (tl = !0));
          break;
        case 6:
          if ((hl(t, e), vl(e), r & 4)) {
            if (e.stateNode === null) throw Error(s(162));
            ((r = e.memoizedProps), (n = e.stateNode));
            try {
              n.nodeValue = r;
            } catch (t) {
              Z(e, e.return, t);
            }
          }
          break;
        case 3:
          if (
            ((Bf = null),
            (i = gl),
            (gl = gf(t.containerInfo)),
            hl(t, e),
            (gl = i),
            vl(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Np(t.containerInfo);
            } catch (t) {
              Z(e, e.return, t);
            }
          tl && ((tl = !1), yl(e));
          break;
        case 4:
          ((r = gl),
            (gl = gf(e.stateNode.containerInfo)),
            hl(t, e),
            vl(e),
            (gl = r));
          break;
        case 12:
          (hl(t, e), vl(e));
          break;
        case 31:
          (hl(t, e),
            vl(e),
            r & 4 &&
              ((r = e.updateQueue),
              r !== null && ((e.updateQueue = null), ml(e, r))));
          break;
        case 13:
          (hl(t, e),
            vl(e),
            e.child.flags & 8192 &&
              (e.memoizedState !== null) !=
                (n !== null && n.memoizedState !== null) &&
              ($l = Me()),
            r & 4 &&
              ((r = e.updateQueue),
              r !== null && ((e.updateQueue = null), ml(e, r))));
          break;
        case 22:
          i = e.memoizedState !== null;
          var l = n !== null && n.memoizedState !== null,
            u = $c,
            d = el;
          if (
            (($c = u || i),
            (el = d || l),
            hl(t, e),
            (el = d),
            ($c = u),
            vl(e),
            r & 8192)
          )
            a: for (
              t = e.stateNode,
                t._visibility = i ? t._visibility & -2 : t._visibility | 1,
                i && (n === null || l || $c || el || xl(e)),
                n = null,
                t = e;
              ;
            ) {
              if (t.tag === 5 || t.tag === 26) {
                if (n === null) {
                  l = n = t;
                  try {
                    if (((a = l.stateNode), i))
                      ((o = a.style),
                        typeof o.setProperty == `function`
                          ? o.setProperty(`display`, `none`, `important`)
                          : (o.display = `none`));
                    else {
                      c = l.stateNode;
                      var f = l.memoizedProps.style,
                        p =
                          f != null && f.hasOwnProperty(`display`)
                            ? f.display
                            : null;
                      c.style.display =
                        p == null || typeof p == `boolean`
                          ? ``
                          : (`` + p).trim();
                    }
                  } catch (e) {
                    Z(l, l.return, e);
                  }
                }
              } else if (t.tag === 6) {
                if (n === null) {
                  l = t;
                  try {
                    l.stateNode.nodeValue = i ? `` : l.memoizedProps;
                  } catch (e) {
                    Z(l, l.return, e);
                  }
                }
              } else if (t.tag === 18) {
                if (n === null) {
                  l = t;
                  try {
                    var m = l.stateNode;
                    i ? $d(m, !0) : $d(l.stateNode, !1);
                  } catch (e) {
                    Z(l, l.return, e);
                  }
                }
              } else if (
                ((t.tag !== 22 && t.tag !== 23) ||
                  t.memoizedState === null ||
                  t === e) &&
                t.child !== null
              ) {
                ((t.child.return = t), (t = t.child));
                continue;
              }
              if (t === e) break a;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) break a;
                (n === t && (n = null), (t = t.return));
              }
              (n === t && (n = null),
                (t.sibling.return = t.return),
                (t = t.sibling));
            }
          r & 4 &&
            ((r = e.updateQueue),
            r !== null &&
              ((n = r.retryQueue),
              n !== null && ((r.retryQueue = null), ml(e, n))));
          break;
        case 19:
          (hl(t, e),
            vl(e),
            r & 4 &&
              ((r = e.updateQueue),
              r !== null && ((e.updateQueue = null), ml(e, r))));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          (hl(t, e), vl(e));
      }
    }
    function vl(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          for (var n, r = e.return; r !== null; ) {
            if (Jc(r)) {
              n = r;
              break;
            }
            r = r.return;
          }
          if (n == null) throw Error(s(160));
          switch (n.tag) {
            case 27:
              var i = n.stateNode;
              Zc(e, Yc(e), i);
              break;
            case 5:
              var a = n.stateNode;
              (n.flags & 32 && (Jt(a, ``), (n.flags &= -33)), Zc(e, Yc(e), a));
              break;
            case 3:
            case 4:
              var o = n.stateNode.containerInfo;
              Xc(e, Yc(e), o);
              break;
            default:
              throw Error(s(161));
          }
        } catch (t) {
          Z(e, e.return, t);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function yl(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          (yl(t),
            t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
            (e = e.sibling));
        }
    }
    function bl(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          (al(e, t.alternate, t), (t = t.sibling));
    }
    function xl(e) {
      for (e = e.child; e !== null; ) {
        var t = e;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            (Vc(4, t, t.return), xl(t));
            break;
          case 1:
            Gc(t, t.return);
            var n = t.stateNode;
            (typeof n.componentWillUnmount == `function` && Uc(t, t.return, n),
              xl(t));
            break;
          case 27:
            pf(t.stateNode);
          case 26:
          case 5:
            (Gc(t, t.return), xl(t));
            break;
          case 22:
            t.memoizedState === null && xl(t);
            break;
          case 30:
            xl(t);
            break;
          default:
            xl(t);
        }
        e = e.sibling;
      }
    }
    function Sl(e, t, n) {
      for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null; ) {
        var r = t.alternate,
          i = e,
          a = t,
          o = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            (Sl(i, a, n), Bc(4, a));
            break;
          case 1:
            if (
              (Sl(i, a, n),
              (r = a),
              (i = r.stateNode),
              typeof i.componentDidMount == `function`)
            )
              try {
                i.componentDidMount();
              } catch (e) {
                Z(r, r.return, e);
              }
            if (((r = a), (i = r.updateQueue), i !== null)) {
              var s = r.stateNode;
              try {
                var c = i.shared.hiddenCallbacks;
                if (c !== null)
                  for (
                    i.shared.hiddenCallbacks = null, i = 0;
                    i < c.length;
                    i++
                  )
                    Ka(c[i], s);
              } catch (e) {
                Z(r, r.return, e);
              }
            }
            (n && o & 64 && Hc(a), Wc(a, a.return));
            break;
          case 27:
            Qc(a);
          case 26:
          case 5:
            (Sl(i, a, n), n && r === null && o & 4 && Kc(a), Wc(a, a.return));
            break;
          case 12:
            Sl(i, a, n);
            break;
          case 31:
            (Sl(i, a, n), n && o & 4 && dl(i, a));
            break;
          case 13:
            (Sl(i, a, n), n && o & 4 && fl(i, a));
            break;
          case 22:
            (a.memoizedState === null && Sl(i, a, n), Wc(a, a.return));
            break;
          case 30:
            break;
          default:
            Sl(i, a, n);
        }
        t = t.sibling;
      }
    }
    function Cl(e, t) {
      var n = null;
      (e !== null &&
        e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (n = e.memoizedState.cachePool.pool),
        (e = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++, n != null && aa(n)));
    }
    function wl(e, t) {
      ((e = null),
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== e && (t.refCount++, e != null && aa(e)));
    }
    function Tl(e, t, n, r) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) (El(e, t, n, r), (t = t.sibling));
    }
    function El(e, t, n, r) {
      var i = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (Tl(e, t, n, r), i & 2048 && Bc(9, t));
          break;
        case 1:
          Tl(e, t, n, r);
          break;
        case 3:
          (Tl(e, t, n, r),
            i & 2048 &&
              ((e = null),
              t.alternate !== null && (e = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache),
              t !== e && (t.refCount++, e != null && aa(e))));
          break;
        case 12:
          if (i & 2048) {
            (Tl(e, t, n, r), (e = t.stateNode));
            try {
              var a = t.memoizedProps,
                o = a.id,
                s = a.onPostCommit;
              typeof s == `function` &&
                s(
                  o,
                  t.alternate === null ? `mount` : `update`,
                  e.passiveEffectDuration,
                  -0,
                );
            } catch (e) {
              Z(t, t.return, e);
            }
          } else Tl(e, t, n, r);
          break;
        case 31:
          Tl(e, t, n, r);
          break;
        case 13:
          Tl(e, t, n, r);
          break;
        case 23:
          break;
        case 22:
          ((a = t.stateNode),
            (o = t.alternate),
            t.memoizedState === null
              ? a._visibility & 2
                ? Tl(e, t, n, r)
                : ((a._visibility |= 2),
                  Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1))
              : a._visibility & 2
                ? Tl(e, t, n, r)
                : Ol(e, t),
            i & 2048 && Cl(o, t));
          break;
        case 24:
          (Tl(e, t, n, r), i & 2048 && wl(t.alternate, t));
          break;
        default:
          Tl(e, t, n, r);
      }
    }
    function Dl(e, t, n, r, i) {
      for (
        i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child;
        t !== null;
      ) {
        var a = e,
          o = t,
          s = n,
          c = r,
          l = o.flags;
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            (Dl(a, o, s, c, i), Bc(8, o));
            break;
          case 23:
            break;
          case 22:
            var u = o.stateNode;
            (o.memoizedState === null
              ? ((u._visibility |= 2), Dl(a, o, s, c, i))
              : u._visibility & 2
                ? Dl(a, o, s, c, i)
                : Ol(a, o),
              i && l & 2048 && Cl(o.alternate, o));
            break;
          case 24:
            (Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o));
            break;
          default:
            Dl(a, o, s, c, i);
        }
        t = t.sibling;
      }
    }
    function Ol(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var n = e,
            r = t,
            i = r.flags;
          switch (r.tag) {
            case 22:
              (Ol(n, r), i & 2048 && Cl(r.alternate, r));
              break;
            case 24:
              (Ol(n, r), i & 2048 && wl(r.alternate, r));
              break;
            default:
              Ol(n, r);
          }
          t = t.sibling;
        }
    }
    var kl = 8192;
    function Al(e, t, n) {
      if (e.subtreeFlags & kl)
        for (e = e.child; e !== null; ) (jl(e, t, n), (e = e.sibling));
    }
    function jl(e, t, n) {
      switch (e.tag) {
        case 26:
          (Al(e, t, n),
            e.flags & kl &&
              e.memoizedState !== null &&
              Gf(n, gl, e.memoizedState, e.memoizedProps));
          break;
        case 5:
          Al(e, t, n);
          break;
        case 3:
        case 4:
          var r = gl;
          ((gl = gf(e.stateNode.containerInfo)), Al(e, t, n), (gl = r));
          break;
        case 22:
          e.memoizedState === null &&
            ((r = e.alternate),
            r !== null && r.memoizedState !== null
              ? ((r = kl), (kl = 16777216), Al(e, t, n), (kl = r))
              : Al(e, t, n));
          break;
        default:
          Al(e, t, n);
      }
    }
    function Ml(e) {
      var t = e.alternate;
      if (t !== null && ((e = t.child), e !== null)) {
        t.child = null;
        do ((t = e.sibling), (e.sibling = null), (e = t));
        while (e !== null);
      }
    }
    function Nl(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            ((rl = r), Il(r, e));
          }
        Ml(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) (Pl(e), (e = e.sibling));
    }
    function Pl(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          (Nl(e), e.flags & 2048 && Vc(9, e, e.return));
          break;
        case 3:
          Nl(e);
          break;
        case 12:
          Nl(e);
          break;
        case 22:
          var t = e.stateNode;
          e.memoizedState !== null &&
          t._visibility & 2 &&
          (e.return === null || e.return.tag !== 13)
            ? ((t._visibility &= -3), Fl(e))
            : Nl(e);
          break;
        default:
          Nl(e);
      }
    }
    function Fl(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            ((rl = r), Il(r, e));
          }
        Ml(e);
      }
      for (e = e.child; e !== null; ) {
        switch (((t = e), t.tag)) {
          case 0:
          case 11:
          case 15:
            (Vc(8, t, t.return), Fl(t));
            break;
          case 22:
            ((n = t.stateNode),
              n._visibility & 2 && ((n._visibility &= -3), Fl(t)));
            break;
          default:
            Fl(t);
        }
        e = e.sibling;
      }
    }
    function Il(e, t) {
      for (; rl !== null; ) {
        var n = rl;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Vc(8, n, t);
            break;
          case 23:
          case 22:
            if (
              n.memoizedState !== null &&
              n.memoizedState.cachePool !== null
            ) {
              var r = n.memoizedState.cachePool.pool;
              r != null && r.refCount++;
            }
            break;
          case 24:
            aa(n.memoizedState.cache);
        }
        if (((r = n.child), r !== null)) ((r.return = n), (rl = r));
        else
          a: for (n = e; rl !== null; ) {
            r = rl;
            var i = r.sibling,
              a = r.return;
            if ((ol(r), r === n)) {
              rl = null;
              break a;
            }
            if (i !== null) {
              ((i.return = a), (rl = i));
              break a;
            }
            rl = a;
          }
      }
    }
    var Ll = {
        getCacheForType: function (e) {
          var t = Zi(ra),
            n = t.data.get(e);
          return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
        },
        cacheSignal: function () {
          return Zi(ra).controller.signal;
        },
      },
      Rl = typeof WeakMap == `function` ? WeakMap : Map,
      K = 0,
      q = null,
      J = null,
      Y = 0,
      X = 0,
      zl = null,
      Bl = !1,
      Vl = !1,
      Hl = !1,
      Ul = 0,
      Wl = 0,
      Gl = 0,
      Kl = 0,
      ql = 0,
      Jl = 0,
      Yl = 0,
      Xl = null,
      Zl = null,
      Ql = !1,
      $l = 0,
      eu = 0,
      tu = 1 / 0,
      nu = null,
      ru = null,
      iu = 0,
      au = null,
      ou = null,
      su = 0,
      cu = 0,
      lu = null,
      uu = null,
      du = 0,
      fu = null;
    function pu() {
      return K & 2 && Y !== 0 ? Y & -Y : E.T === null ? lt() : dd();
    }
    function mu() {
      if (Jl === 0)
        if (!(Y & 536870912) || U) {
          var e = Je;
          ((Je <<= 1), !(Je & 3932160) && (Je = 262144), (Jl = e));
        } else Jl = 536870912;
      return ((e = $a.current), e !== null && (e.flags |= 32), Jl);
    }
    function hu(e, t, n) {
      (((e === q && (X === 2 || X === 9)) || e.cancelPendingCommit !== null) &&
        (Su(e, 0), yu(e, Y, Jl, !1)),
        nt(e, n),
        (!(K & 2) || e !== q) &&
          (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)),
          rd(e)));
    }
    function gu(e, t, n) {
      if (K & 6) throw Error(s(327));
      var r = (!n && (t & 127) == 0 && (t & e.expiredLanes) === 0) || Qe(e, t),
        i = r ? Au(e, t) : Ou(e, t, !0),
        a = r;
      do {
        if (i === 0) {
          Vl && !r && yu(e, t, 0, !1);
          break;
        } else {
          if (((n = e.current.alternate), a && !vu(n))) {
            ((i = Ou(e, t, !1)), (a = !1));
            continue;
          }
          if (i === 2) {
            if (((a = t), e.errorRecoveryDisabledLanes & a)) var o = 0;
            else
              ((o = e.pendingLanes & -536870913),
                (o = o === 0 ? (o & 536870912 ? 536870912 : 0) : o));
            if (o !== 0) {
              t = o;
              a: {
                var c = e;
                i = Xl;
                var l = c.current.memoizedState.isDehydrated;
                if (
                  (l && (Su(c, o).flags |= 256), (o = Ou(c, o, !1)), o !== 2)
                ) {
                  if (Hl && !l) {
                    ((c.errorRecoveryDisabledLanes |= a), (Kl |= a), (i = 4));
                    break a;
                  }
                  ((a = Zl),
                    (Zl = i),
                    a !== null &&
                      (Zl === null ? (Zl = a) : Zl.push.apply(Zl, a)));
                }
                i = o;
              }
              if (((a = !1), i !== 2)) continue;
            }
          }
          if (i === 1) {
            (Su(e, 0), yu(e, t, 0, !0));
            break;
          }
          a: {
            switch (((r = e), (a = i), a)) {
              case 0:
              case 1:
                throw Error(s(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                yu(r, t, Jl, !Bl);
                break a;
              case 2:
                Zl = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(s(329));
            }
            if ((t & 62914560) === t && ((i = $l + 300 - Me()), 10 < i)) {
              if ((yu(r, t, Jl, !Bl), Ze(r, 0, !0) !== 0)) break a;
              ((su = t),
                (r.timeoutHandle = Kd(
                  _u.bind(
                    null,
                    r,
                    n,
                    Zl,
                    nu,
                    Ql,
                    t,
                    Jl,
                    Kl,
                    Yl,
                    Bl,
                    a,
                    `Throttled`,
                    -0,
                    0,
                  ),
                  i,
                )));
              break a;
            }
            _u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, a, null, -0, 0);
          }
        }
        break;
      } while (1);
      rd(e);
    }
    function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
      if (
        ((e.timeoutHandle = -1),
        (d = t.subtreeFlags),
        d & 8192 || (d & 16785408) == 16785408)
      ) {
        ((d = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: tn,
        }),
          jl(t, a, d));
        var m =
          (a & 62914560) === a
            ? $l - Me()
            : (a & 4194048) === a
              ? eu - Me()
              : 0;
        if (((m = qf(d, m)), m !== null)) {
          ((su = a),
            (e.cancelPendingCommit = m(
              Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p),
            )),
            yu(e, a, o, !l));
          return;
        }
      }
      Lu(e, t, a, n, r, i, o, s, c);
    }
    function vu(e) {
      for (var t = e; ; ) {
        var n = t.tag;
        if (
          (n === 0 || n === 11 || n === 15) &&
          t.flags & 16384 &&
          ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
        )
          for (var r = 0; r < n.length; r++) {
            var i = n[r],
              a = i.getSnapshot;
            i = i.value;
            try {
              if (!yr(a(), i)) return !1;
            } catch {
              return !1;
            }
          }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
          ((n.return = t), (t = n));
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function yu(e, t, n, r) {
      ((t &= ~ql),
        (t &= ~Kl),
        (e.suspendedLanes |= t),
        (e.pingedLanes &= ~t),
        r && (e.warmLanes |= t),
        (r = e.expirationTimes));
      for (var i = t; 0 < i; ) {
        var a = 31 - Ue(i),
          o = 1 << a;
        ((r[a] = -1), (i &= ~o));
      }
      n !== 0 && it(e, n, t);
    }
    function bu() {
      return K & 6 ? !0 : (id(0, !1), !1);
    }
    function xu() {
      if (J !== null) {
        if (X === 0) var e = J.return;
        else ((e = J), (Ui = Hi = null), Eo(e), (Oa = null), (ka = 0), (e = J));
        for (; e !== null; ) (zc(e.alternate, e), (e = e.return));
        J = null;
      }
    }
    function Su(e, t) {
      var n = e.timeoutHandle;
      (n !== -1 && ((e.timeoutHandle = -1), qd(n)),
        (n = e.cancelPendingCommit),
        n !== null && ((e.cancelPendingCommit = null), n()),
        (su = 0),
        xu(),
        (q = e),
        (J = n = si(e.current, null)),
        (Y = t),
        (X = 0),
        (zl = null),
        (Bl = !1),
        (Vl = Qe(e, t)),
        (Hl = !1),
        (Yl = Jl = ql = Kl = Gl = Wl = 0),
        (Zl = Xl = null),
        (Ql = !1),
        t & 8 && (t |= t & 32));
      var r = e.entangledLanes;
      if (r !== 0)
        for (e = e.entanglements, r &= t; 0 < r; ) {
          var i = 31 - Ue(r),
            a = 1 << i;
          ((t |= e[i]), (r &= ~a));
        }
      return ((Ul = t), Zr(), n);
    }
    function Cu(e, t) {
      ((W = null),
        (E.H = Is),
        t === va || t === ba
          ? ((t = Ea()), (X = 3))
          : t === ya
            ? ((t = Ea()), (X = 4))
            : (X =
                t === ec
                  ? 8
                  : typeof t == `object` && t && typeof t.then == `function`
                    ? 6
                    : 1),
        (zl = t),
        J === null && ((Wl = 1), Js(e, hi(t, e.current))));
    }
    function wu() {
      var e = $a.current;
      return e === null
        ? !0
        : (Y & 4194048) === Y
          ? eo === null
          : (Y & 62914560) === Y || Y & 536870912
            ? e === eo
            : !1;
    }
    function Tu() {
      var e = E.H;
      return ((E.H = Is), e === null ? Is : e);
    }
    function Eu() {
      var e = E.A;
      return ((E.A = Ll), e);
    }
    function Du() {
      ((Wl = 4),
        Bl || ((Y & 4194048) !== Y && $a.current !== null) || (Vl = !0),
        (!(Gl & 134217727) && !(Kl & 134217727)) ||
          q === null ||
          yu(q, Y, Jl, !1));
    }
    function Ou(e, t, n) {
      var r = K;
      K |= 2;
      var i = Tu(),
        a = Eu();
      ((q !== e || Y !== t) && ((nu = null), Su(e, t)), (t = !1));
      var o = Wl;
      a: do
        try {
          if (X !== 0 && J !== null) {
            var s = J,
              c = zl;
            switch (X) {
              case 8:
                (xu(), (o = 6));
                break a;
              case 3:
              case 2:
              case 9:
              case 6:
                $a.current === null && (t = !0);
                var l = X;
                if (((X = 0), (zl = null), Pu(e, s, c, l), n && Vl)) {
                  o = 0;
                  break a;
                }
                break;
              default:
                ((l = X), (X = 0), (zl = null), Pu(e, s, c, l));
            }
          }
          (ku(), (o = Wl));
          break;
        } catch (t) {
          Cu(e, t);
        }
      while (1);
      return (
        t && e.shellSuspendCounter++,
        (Ui = Hi = null),
        (K = r),
        (E.H = i),
        (E.A = a),
        J === null && ((q = null), (Y = 0), Zr()),
        o
      );
    }
    function ku() {
      for (; J !== null; ) Mu(J);
    }
    function Au(e, t) {
      var n = K;
      K |= 2;
      var r = Tu(),
        i = Eu();
      q !== e || Y !== t
        ? ((nu = null), (tu = Me() + 500), Su(e, t))
        : (Vl = Qe(e, t));
      a: do
        try {
          if (X !== 0 && J !== null) {
            t = J;
            var a = zl;
            b: switch (X) {
              case 1:
                ((X = 0), (zl = null), Pu(e, t, a, 1));
                break;
              case 2:
              case 9:
                if (Sa(a)) {
                  ((X = 0), (zl = null), Nu(t));
                  break;
                }
                ((t = function () {
                  ((X !== 2 && X !== 9) || q !== e || (X = 7), rd(e));
                }),
                  a.then(t, t));
                break a;
              case 3:
                X = 7;
                break a;
              case 4:
                X = 5;
                break a;
              case 7:
                Sa(a)
                  ? ((X = 0), (zl = null), Nu(t))
                  : ((X = 0), (zl = null), Pu(e, t, a, 7));
                break;
              case 5:
                var o = null;
                switch (J.tag) {
                  case 26:
                    o = J.memoizedState;
                  case 5:
                  case 27:
                    var c = J;
                    if (o ? Wf(o) : c.stateNode.complete) {
                      ((X = 0), (zl = null));
                      var l = c.sibling;
                      if (l !== null) J = l;
                      else {
                        var u = c.return;
                        u === null ? (J = null) : ((J = u), Fu(u));
                      }
                      break b;
                    }
                }
                ((X = 0), (zl = null), Pu(e, t, a, 5));
                break;
              case 6:
                ((X = 0), (zl = null), Pu(e, t, a, 6));
                break;
              case 8:
                (xu(), (Wl = 6));
                break a;
              default:
                throw Error(s(462));
            }
          }
          ju();
          break;
        } catch (t) {
          Cu(e, t);
        }
      while (1);
      return (
        (Ui = Hi = null),
        (E.H = r),
        (E.A = i),
        (K = n),
        J === null ? ((q = null), (Y = 0), Zr(), Wl) : 0
      );
    }
    function ju() {
      for (; J !== null && !Ae(); ) Mu(J);
    }
    function Mu(e) {
      var t = Ac(e.alternate, e, Ul);
      ((e.memoizedProps = e.pendingProps), t === null ? Fu(e) : (J = t));
    }
    function Nu(e) {
      var t = e,
        n = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = mc(n, t, t.pendingProps, t.type, void 0, Y);
          break;
        case 11:
          t = mc(n, t, t.pendingProps, t.type.render, t.ref, Y);
          break;
        case 5:
          Eo(t);
        default:
          (zc(n, t), (t = J = ci(t, Ul)), (t = Ac(n, t, Ul)));
      }
      ((e.memoizedProps = e.pendingProps), t === null ? Fu(e) : (J = t));
    }
    function Pu(e, t, n, r) {
      ((Ui = Hi = null), Eo(t), (Oa = null), (ka = 0));
      var i = t.return;
      try {
        if ($s(e, i, t, n, Y)) {
          ((Wl = 1), Js(e, hi(n, e.current)), (J = null));
          return;
        }
      } catch (t) {
        if (i !== null) throw ((J = i), t);
        ((Wl = 1), Js(e, hi(n, e.current)), (J = null));
        return;
      }
      t.flags & 32768
        ? (U || r === 1
            ? (e = !0)
            : Vl || Y & 536870912
              ? (e = !1)
              : ((Bl = e = !0),
                (r === 2 || r === 9 || r === 3 || r === 6) &&
                  ((r = $a.current),
                  r !== null && r.tag === 13 && (r.flags |= 16384))),
          Iu(t, e))
        : Fu(t);
    }
    function Fu(e) {
      var t = e;
      do {
        if (t.flags & 32768) {
          Iu(t, Bl);
          return;
        }
        e = t.return;
        var n = Lc(t.alternate, t, Ul);
        if (n !== null) {
          J = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          J = t;
          return;
        }
        J = t = e;
      } while (t !== null);
      Wl === 0 && (Wl = 5);
    }
    function Iu(e, t) {
      do {
        var n = Rc(e.alternate, e);
        if (n !== null) {
          ((n.flags &= 32767), (J = n));
          return;
        }
        if (
          ((n = e.return),
          n !== null &&
            ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !t && ((e = e.sibling), e !== null))
        ) {
          J = e;
          return;
        }
        J = e = n;
      } while (e !== null);
      ((Wl = 6), (J = null));
    }
    function Lu(e, t, n, r, i, a, o, c, l) {
      e.cancelPendingCommit = null;
      do Hu();
      while (iu !== 0);
      if (K & 6) throw Error(s(327));
      if (t !== null) {
        if (t === e.current) throw Error(s(177));
        if (
          ((a = t.lanes | t.childLanes),
          (a |= Xr),
          rt(e, n, a, o, c, l),
          e === q && ((J = q = null), (Y = 0)),
          (ou = t),
          (au = e),
          (su = n),
          (cu = a),
          (lu = i),
          (uu = r),
          t.subtreeFlags & 10256 || t.flags & 10256
            ? ((e.callbackNode = null),
              (e.callbackPriority = 0),
              Xu(Ie, function () {
                return (Uu(), null);
              }))
            : ((e.callbackNode = null), (e.callbackPriority = 0)),
          (r = (t.flags & 13878) != 0),
          t.subtreeFlags & 13878 || r)
        ) {
          ((r = E.T), (E.T = null), (i = D.p), (D.p = 2), (o = K), (K |= 4));
          try {
            il(e, t, n);
          } finally {
            ((K = o), (D.p = i), (E.T = r));
          }
        }
        ((iu = 1), Ru(), zu(), Bu());
      }
    }
    function Ru() {
      if (iu === 1) {
        iu = 0;
        var e = au,
          t = ou,
          n = (t.flags & 13878) != 0;
        if (t.subtreeFlags & 13878 || n) {
          ((n = E.T), (E.T = null));
          var r = D.p;
          D.p = 2;
          var i = K;
          K |= 4;
          try {
            _l(t, e);
            var a = zd,
              o = wr(e.containerInfo),
              s = a.focusedElem,
              c = a.selectionRange;
            if (
              o !== s &&
              s &&
              s.ownerDocument &&
              Cr(s.ownerDocument.documentElement, s)
            ) {
              if (c !== null && Tr(s)) {
                var l = c.start,
                  u = c.end;
                if ((u === void 0 && (u = l), `selectionStart` in s))
                  ((s.selectionStart = l),
                    (s.selectionEnd = Math.min(u, s.value.length)));
                else {
                  var d = s.ownerDocument || document,
                    f = (d && d.defaultView) || window;
                  if (f.getSelection) {
                    var p = f.getSelection(),
                      m = s.textContent.length,
                      h = Math.min(c.start, m),
                      g = c.end === void 0 ? h : Math.min(c.end, m);
                    !p.extend && h > g && ((o = g), (g = h), (h = o));
                    var _ = Sr(s, h),
                      v = Sr(s, g);
                    if (
                      _ &&
                      v &&
                      (p.rangeCount !== 1 ||
                        p.anchorNode !== _.node ||
                        p.anchorOffset !== _.offset ||
                        p.focusNode !== v.node ||
                        p.focusOffset !== v.offset)
                    ) {
                      var y = d.createRange();
                      (y.setStart(_.node, _.offset),
                        p.removeAllRanges(),
                        h > g
                          ? (p.addRange(y), p.extend(v.node, v.offset))
                          : (y.setEnd(v.node, v.offset), p.addRange(y)));
                    }
                  }
                }
              }
              for (d = [], p = s; (p = p.parentNode); )
                p.nodeType === 1 &&
                  d.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
              for (
                typeof s.focus == `function` && s.focus(), s = 0;
                s < d.length;
                s++
              ) {
                var b = d[s];
                ((b.element.scrollLeft = b.left),
                  (b.element.scrollTop = b.top));
              }
            }
            ((sp = !!Rd), (zd = Rd = null));
          } finally {
            ((K = i), (D.p = r), (E.T = n));
          }
        }
        ((e.current = t), (iu = 2));
      }
    }
    function zu() {
      if (iu === 2) {
        iu = 0;
        var e = au,
          t = ou,
          n = (t.flags & 8772) != 0;
        if (t.subtreeFlags & 8772 || n) {
          ((n = E.T), (E.T = null));
          var r = D.p;
          D.p = 2;
          var i = K;
          K |= 4;
          try {
            al(e, t.alternate, t);
          } finally {
            ((K = i), (D.p = r), (E.T = n));
          }
        }
        iu = 3;
      }
    }
    function Bu() {
      if (iu === 4 || iu === 3) {
        ((iu = 0), je());
        var e = au,
          t = ou,
          n = su,
          r = uu;
        t.subtreeFlags & 10256 || t.flags & 10256
          ? (iu = 5)
          : ((iu = 0), (ou = au = null), Vu(e, e.pendingLanes));
        var i = e.pendingLanes;
        if (
          (i === 0 && (ru = null),
          ct(n),
          (t = t.stateNode),
          M && typeof M.onCommitFiberRoot == `function`)
        )
          try {
            M.onCommitFiberRoot(Ve, t, void 0, (t.current.flags & 128) == 128);
          } catch {}
        if (r !== null) {
          ((t = E.T), (i = D.p), (D.p = 2), (E.T = null));
          try {
            for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
              var s = r[o];
              a(s.value, { componentStack: s.stack });
            }
          } finally {
            ((E.T = t), (D.p = i));
          }
        }
        (su & 3 && Hu(),
          rd(e),
          (i = e.pendingLanes),
          n & 261930 && i & 42
            ? e === fu
              ? du++
              : ((du = 0), (fu = e))
            : (du = 0),
          id(0, !1));
      }
    }
    function Vu(e, t) {
      (e.pooledCacheLanes &= t) === 0 &&
        ((t = e.pooledCache), t != null && ((e.pooledCache = null), aa(t)));
    }
    function Hu() {
      return (Ru(), zu(), Bu(), Uu());
    }
    function Uu() {
      if (iu !== 5) return !1;
      var e = au,
        t = cu;
      cu = 0;
      var n = ct(su),
        r = E.T,
        i = D.p;
      try {
        ((D.p = 32 > n ? 32 : n), (E.T = null), (n = lu), (lu = null));
        var a = au,
          o = su;
        if (((iu = 0), (ou = au = null), (su = 0), K & 6)) throw Error(s(331));
        var c = K;
        if (
          ((K |= 4),
          Pl(a.current),
          El(a, a.current, o, n),
          (K = c),
          id(0, !1),
          M && typeof M.onPostCommitFiberRoot == `function`)
        )
          try {
            M.onPostCommitFiberRoot(Ve, a);
          } catch {}
        return !0;
      } finally {
        ((D.p = i), (E.T = r), Vu(e, t));
      }
    }
    function Wu(e, t, n) {
      ((t = hi(n, t)),
        (t = Xs(e.stateNode, t, 2)),
        (e = Ba(e, t, 2)),
        e !== null && (nt(e, 2), rd(e)));
    }
    function Z(e, t, n) {
      if (e.tag === 3) Wu(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Wu(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == `function` ||
              (typeof r.componentDidCatch == `function` &&
                (ru === null || !ru.has(r)))
            ) {
              ((e = hi(n, e)),
                (n = Zs(2)),
                (r = Ba(t, n, 2)),
                r !== null && (Qs(n, r, t, e), nt(r, 2), rd(r)));
              break;
            }
          }
          t = t.return;
        }
    }
    function Gu(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new Rl();
        var i = new Set();
        r.set(t, i);
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
      i.has(n) ||
        ((Hl = !0), i.add(n), (e = Ku.bind(null, e, t, n)), t.then(e, e));
    }
    function Ku(e, t, n) {
      var r = e.pingCache;
      (r !== null && r.delete(t),
        (e.pingedLanes |= e.suspendedLanes & n),
        (e.warmLanes &= ~n),
        q === e &&
          (Y & n) === n &&
          (Wl === 4 || (Wl === 3 && (Y & 62914560) === Y && 300 > Me() - $l)
            ? !(K & 2) && Su(e, 0)
            : (ql |= n),
          Yl === Y && (Yl = 0)),
        rd(e));
    }
    function qu(e, t) {
      (t === 0 && (t = et()), (e = ei(e, t)), e !== null && (nt(e, t), rd(e)));
    }
    function Ju(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), qu(e, n));
    }
    function Yu(e, t) {
      var n = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var r = e.stateNode,
            i = e.memoizedState;
          i !== null && (n = i.retryLane);
          break;
        case 19:
          r = e.stateNode;
          break;
        case 22:
          r = e.stateNode._retryCache;
          break;
        default:
          throw Error(s(314));
      }
      (r !== null && r.delete(t), qu(e, n));
    }
    function Xu(e, t) {
      return Oe(e, t);
    }
    var Zu = null,
      Qu = null,
      $u = !1,
      ed = !1,
      td = !1,
      nd = 0;
    function rd(e) {
      (e !== Qu &&
        e.next === null &&
        (Qu === null ? (Zu = Qu = e) : (Qu = Qu.next = e)),
        (ed = !0),
        $u || (($u = !0), ud()));
    }
    function id(e, t) {
      if (!td && ed) {
        td = !0;
        do
          for (var n = !1, r = Zu; r !== null; ) {
            if (!t)
              if (e !== 0) {
                var i = r.pendingLanes;
                if (i === 0) var a = 0;
                else {
                  var o = r.suspendedLanes,
                    s = r.pingedLanes;
                  ((a = (1 << (31 - Ue(42 | e) + 1)) - 1),
                    (a &= i & ~(o & ~s)),
                    (a = a & 201326741 ? (a & 201326741) | 1 : a ? a | 2 : 0));
                }
                a !== 0 && ((n = !0), ld(r, a));
              } else
                ((a = Y),
                  (a = Ze(
                    r,
                    r === q ? a : 0,
                    r.cancelPendingCommit !== null || r.timeoutHandle !== -1,
                  )),
                  !(a & 3) || Qe(r, a) || ((n = !0), ld(r, a)));
            r = r.next;
          }
        while (n);
        td = !1;
      }
    }
    function ad() {
      od();
    }
    function od() {
      ed = $u = !1;
      var e = 0;
      nd !== 0 && Gd() && (e = nd);
      for (var t = Me(), n = null, r = Zu; r !== null; ) {
        var i = r.next,
          a = sd(r, t);
        (a === 0
          ? ((r.next = null),
            n === null ? (Zu = i) : (n.next = i),
            i === null && (Qu = n))
          : ((n = r), (e !== 0 || a & 3) && (ed = !0)),
          (r = i));
      }
      ((iu !== 0 && iu !== 5) || id(e, !1), nd !== 0 && (nd = 0));
    }
    function sd(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          i = e.expirationTimes,
          a = e.pendingLanes & -62914561;
        0 < a;
      ) {
        var o = 31 - Ue(a),
          s = 1 << o,
          c = i[o];
        (c === -1
          ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = $e(s, t))
          : c <= t && (e.expiredLanes |= s),
          (a &= ~s));
      }
      if (
        ((t = q),
        (n = Y),
        (n = Ze(
          e,
          e === t ? n : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        (r = e.callbackNode),
        n === 0 ||
          (e === t && (X === 2 || X === 9)) ||
          e.cancelPendingCommit !== null)
      )
        return (
          r !== null && r !== null && ke(r),
          (e.callbackNode = null),
          (e.callbackPriority = 0)
        );
      if (!(n & 3) || Qe(e, n)) {
        if (((t = n & -n), t === e.callbackPriority)) return t;
        switch ((r !== null && ke(r), ct(n))) {
          case 2:
          case 8:
            n = Fe;
            break;
          case 32:
            n = Ie;
            break;
          case 268435456:
            n = Re;
            break;
          default:
            n = Ie;
        }
        return (
          (r = cd.bind(null, e)),
          (n = Oe(n, r)),
          (e.callbackPriority = t),
          (e.callbackNode = n),
          t
        );
      }
      return (
        r !== null && r !== null && ke(r),
        (e.callbackPriority = 2),
        (e.callbackNode = null),
        2
      );
    }
    function cd(e, t) {
      if (iu !== 0 && iu !== 5)
        return ((e.callbackNode = null), (e.callbackPriority = 0), null);
      var n = e.callbackNode;
      if (Hu() && e.callbackNode !== n) return null;
      var r = Y;
      return (
        (r = Ze(
          e,
          e === q ? r : 0,
          e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
        )),
        r === 0
          ? null
          : (gu(e, r, t),
            sd(e, Me()),
            e.callbackNode != null && e.callbackNode === n
              ? cd.bind(null, e)
              : null)
      );
    }
    function ld(e, t) {
      if (Hu()) return null;
      gu(e, t, !0);
    }
    function ud() {
      Yd(function () {
        K & 6 ? Oe(Pe, ad) : od();
      });
    }
    function dd() {
      if (nd === 0) {
        var e = ca;
        (e === 0 && ((e = qe), (qe <<= 1), !(qe & 261888) && (qe = 256)),
          (nd = e));
      }
      return nd;
    }
    function fd(e) {
      return e == null || typeof e == `symbol` || typeof e == `boolean`
        ? null
        : typeof e == `function`
          ? e
          : en(`` + e);
    }
    function pd(e, t) {
      var n = t.ownerDocument.createElement(`input`);
      return (
        (n.name = t.name),
        (n.value = t.value),
        e.id && n.setAttribute(`form`, e.id),
        t.parentNode.insertBefore(n, t),
        (e = new FormData(e)),
        n.parentNode.removeChild(n),
        e
      );
    }
    function md(e, t, n, r, i) {
      if (t === `submit` && n && n.stateNode === i) {
        var a = fd((i[pt] || null).action),
          o = r.submitter;
        o &&
          ((t = (t = o[pt] || null)
            ? fd(t.formAction)
            : o.getAttribute(`formAction`)),
          t !== null && ((a = t), (o = null)));
        var s = new xn(`action`, `action`, null, r, i);
        e.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (r.defaultPrevented) {
                  if (nd !== 0) {
                    var e = o ? pd(i, o) : new FormData(i);
                    Ss(
                      n,
                      { pending: !0, data: e, method: i.method, action: a },
                      null,
                      e,
                    );
                  }
                } else
                  typeof a == `function` &&
                    (s.preventDefault(),
                    (e = o ? pd(i, o) : new FormData(i)),
                    Ss(
                      n,
                      { pending: !0, data: e, method: i.method, action: a },
                      a,
                      e,
                    ));
              },
              currentTarget: i,
            },
          ],
        });
      }
    }
    for (var hd = 0; hd < Gr.length; hd++) {
      var gd = Gr[hd];
      Kr(gd.toLowerCase(), `on` + (gd[0].toUpperCase() + gd.slice(1)));
    }
    (Kr(Lr, `onAnimationEnd`),
      Kr(Rr, `onAnimationIteration`),
      Kr(zr, `onAnimationStart`),
      Kr(`dblclick`, `onDoubleClick`),
      Kr(`focusin`, `onFocus`),
      Kr(`focusout`, `onBlur`),
      Kr(Br, `onTransitionRun`),
      Kr(Vr, `onTransitionStart`),
      Kr(Hr, `onTransitionCancel`),
      Kr(Ur, `onTransitionEnd`),
      Ot(`onMouseEnter`, [`mouseout`, `mouseover`]),
      Ot(`onMouseLeave`, [`mouseout`, `mouseover`]),
      Ot(`onPointerEnter`, [`pointerout`, `pointerover`]),
      Ot(`onPointerLeave`, [`pointerout`, `pointerover`]),
      Dt(
        `onChange`,
        `change click focusin focusout input keydown keyup selectionchange`.split(
          ` `,
        ),
      ),
      Dt(
        `onSelect`,
        `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
          ` `,
        ),
      ),
      Dt(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]),
      Dt(
        `onCompositionEnd`,
        `compositionend focusout keydown keypress keyup mousedown`.split(` `),
      ),
      Dt(
        `onCompositionStart`,
        `compositionstart focusout keydown keypress keyup mousedown`.split(` `),
      ),
      Dt(
        `onCompositionUpdate`,
        `compositionupdate focusout keydown keypress keyup mousedown`.split(
          ` `,
        ),
      ));
    var _d =
        `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
          ` `,
        ),
      vd = new Set(
        `beforetoggle cancel close invalid load scroll scrollend toggle`
          .split(` `)
          .concat(_d),
      );
    function yd(e, t) {
      t = (t & 4) != 0;
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event;
        r = r.listeners;
        a: {
          var a = void 0;
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var s = r[o],
                c = s.instance,
                l = s.currentTarget;
              if (((s = s.listener), c !== a && i.isPropagationStopped()))
                break a;
              ((a = s), (i.currentTarget = l));
              try {
                a(i);
              } catch (e) {
                qr(e);
              }
              ((i.currentTarget = null), (a = c));
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((s = r[o]),
                (c = s.instance),
                (l = s.currentTarget),
                (s = s.listener),
                c !== a && i.isPropagationStopped())
              )
                break a;
              ((a = s), (i.currentTarget = l));
              try {
                a(i);
              } catch (e) {
                qr(e);
              }
              ((i.currentTarget = null), (a = c));
            }
        }
      }
    }
    function Q(e, t) {
      var n = t[ht];
      n === void 0 && (n = t[ht] = new Set());
      var r = e + `__bubble`;
      n.has(r) || (Cd(t, e, 2, !1), n.add(r));
    }
    function bd(e, t, n) {
      var r = 0;
      (t && (r |= 4), Cd(n, e, r, t));
    }
    var xd = `_reactListening` + Math.random().toString(36).slice(2);
    function Sd(e) {
      if (!e[xd]) {
        ((e[xd] = !0),
          Tt.forEach(function (t) {
            t !== `selectionchange` &&
              (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[xd] || ((t[xd] = !0), bd(`selectionchange`, !1, t));
      }
    }
    function Cd(e, t, n, r) {
      switch (mp(t)) {
        case 2:
          var i = cp;
          break;
        case 8:
          i = lp;
          break;
        default:
          i = up;
      }
      ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !fn ||
          (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) ||
          (i = !0),
        r
          ? i === void 0
            ? e.addEventListener(t, n, !0)
            : e.addEventListener(t, n, { capture: !0, passive: i })
          : i === void 0
            ? e.addEventListener(t, n, !1)
            : e.addEventListener(t, n, { passive: i }));
    }
    function wd(e, t, n, r, i) {
      var a = r;
      if (!(t & 1) && !(t & 2) && r !== null)
        a: for (;;) {
          if (r === null) return;
          var o = r.tag;
          if (o === 3 || o === 4) {
            var s = r.stateNode.containerInfo;
            if (s === i) break;
            if (o === 4)
              for (o = r.return; o !== null; ) {
                var c = o.tag;
                if ((c === 3 || c === 4) && o.stateNode.containerInfo === i)
                  return;
                o = o.return;
              }
            for (; s !== null; ) {
              if (((o = xt(s)), o === null)) return;
              if (((c = o.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
                r = a = o;
                continue a;
              }
              s = s.parentNode;
            }
          }
          r = r.return;
        }
      ln(function () {
        var r = a,
          i = rn(n),
          o = [];
        a: {
          var s = Wr.get(e);
          if (s !== void 0) {
            var c = xn,
              u = e;
            switch (e) {
              case `keypress`:
                if (R(n) === 0) break a;
              case `keydown`:
              case `keyup`:
                c = In;
                break;
              case `focusin`:
                ((u = `focus`), (c = B));
                break;
              case `focusout`:
                ((u = `blur`), (c = B));
                break;
              case `beforeblur`:
              case `afterblur`:
                c = B;
                break;
              case `click`:
                if (n.button === 2) break a;
              case `auxclick`:
              case `dblclick`:
              case `mousedown`:
              case `mousemove`:
              case `mouseup`:
              case `mouseout`:
              case `mouseover`:
              case `contextmenu`:
                c = Dn;
                break;
              case `drag`:
              case `dragend`:
              case `dragenter`:
              case `dragexit`:
              case `dragleave`:
              case `dragover`:
              case `dragstart`:
              case `drop`:
                c = On;
                break;
              case `touchcancel`:
              case `touchend`:
              case `touchmove`:
              case `touchstart`:
                c = Rn;
                break;
              case Lr:
              case Rr:
              case zr:
                c = V;
                break;
              case Ur:
                c = zn;
                break;
              case `scroll`:
              case `scrollend`:
                c = Sn;
                break;
              case `wheel`:
                c = Bn;
                break;
              case `copy`:
              case `cut`:
              case `paste`:
                c = kn;
                break;
              case `gotpointercapture`:
              case `lostpointercapture`:
              case `pointercancel`:
              case `pointerdown`:
              case `pointermove`:
              case `pointerout`:
              case `pointerover`:
              case `pointerup`:
                c = Ln;
                break;
              case `toggle`:
              case `beforetoggle`:
                c = Vn;
            }
            var d = (t & 4) != 0,
              f = !d && (e === `scroll` || e === `scrollend`),
              p = d ? (s === null ? null : s + `Capture`) : s;
            d = [];
            for (var m = r, h; m !== null; ) {
              var g = m;
              if (
                ((h = g.stateNode),
                (g = g.tag),
                (g !== 5 && g !== 26 && g !== 27) ||
                  h === null ||
                  p === null ||
                  ((g = un(m, p)), g != null && d.push(Td(m, g, h))),
                f)
              )
                break;
              m = m.return;
            }
            0 < d.length &&
              ((s = new c(s, u, null, n, i)),
              o.push({ event: s, listeners: d }));
          }
        }
        if (!(t & 7)) {
          a: {
            if (
              ((s = e === `mouseover` || e === `pointerover`),
              (c = e === `mouseout` || e === `pointerout`),
              s &&
                n !== nn &&
                (u = n.relatedTarget || n.fromElement) &&
                (xt(u) || u[mt]))
            )
              break a;
            if (
              (c || s) &&
              ((s =
                i.window === i
                  ? i
                  : (s = i.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              c
                ? ((u = n.relatedTarget || n.toElement),
                  (c = r),
                  (u = u ? xt(u) : null),
                  u !== null &&
                    ((f = l(u)),
                    (d = u.tag),
                    u !== f || (d !== 5 && d !== 27 && d !== 6)) &&
                    (u = null))
                : ((c = null), (u = r)),
              c !== u)
            ) {
              if (
                ((d = Dn),
                (g = `onMouseLeave`),
                (p = `onMouseEnter`),
                (m = `mouse`),
                (e === `pointerout` || e === `pointerover`) &&
                  ((d = Ln),
                  (g = `onPointerLeave`),
                  (p = `onPointerEnter`),
                  (m = `pointer`)),
                (f = c == null ? s : Ct(c)),
                (h = u == null ? s : Ct(u)),
                (s = new d(g, m + `leave`, c, n, i)),
                (s.target = f),
                (s.relatedTarget = h),
                (g = null),
                xt(i) === r &&
                  ((d = new d(p, m + `enter`, u, n, i)),
                  (d.target = h),
                  (d.relatedTarget = f),
                  (g = d)),
                (f = g),
                c && u)
              )
                b: {
                  for (d = Dd, p = c, m = u, h = 0, g = p; g; g = d(g)) h++;
                  g = 0;
                  for (var _ = m; _; _ = d(_)) g++;
                  for (; 0 < h - g; ) ((p = d(p)), h--);
                  for (; 0 < g - h; ) ((m = d(m)), g--);
                  for (; h--; ) {
                    if (p === m || (m !== null && p === m.alternate)) {
                      d = p;
                      break b;
                    }
                    ((p = d(p)), (m = d(m)));
                  }
                  d = null;
                }
              else d = null;
              (c !== null && Od(o, s, c, d, !1),
                u !== null && f !== null && Od(o, f, u, d, !0));
            }
          }
          a: {
            if (
              ((s = r ? Ct(r) : window),
              (c = s.nodeName && s.nodeName.toLowerCase()),
              c === `select` || (c === `input` && s.type === `file`))
            )
              var v = sr;
            else if (tr(s))
              if (cr) v = _r;
              else {
                v = hr;
                var y = mr;
              }
            else
              ((c = s.nodeName),
                !c ||
                c.toLowerCase() !== `input` ||
                (s.type !== `checkbox` && s.type !== `radio`)
                  ? r && Zt(r.elementType) && (v = sr)
                  : (v = gr));
            if ((v &&= v(e, r))) {
              nr(o, v, n, i);
              break a;
            }
            (y && y(e, s, r),
              e === `focusout` &&
                r &&
                s.type === `number` &&
                r.memoizedProps.value != null &&
                Wt(s, `number`, s.value));
          }
          switch (((y = r ? Ct(r) : window), e)) {
            case `focusin`:
              (tr(y) || y.contentEditable === `true`) &&
                ((Dr = y), (Or = r), (kr = null));
              break;
            case `focusout`:
              kr = Or = Dr = null;
              break;
            case `mousedown`:
              Ar = !0;
              break;
            case `contextmenu`:
            case `mouseup`:
            case `dragend`:
              ((Ar = !1), jr(o, n, i));
              break;
            case `selectionchange`:
              if (Er) break;
            case `keydown`:
            case `keyup`:
              jr(o, n, i);
          }
          var b;
          if (Un)
            b: {
              switch (e) {
                case `compositionstart`:
                  var x = `onCompositionStart`;
                  break b;
                case `compositionend`:
                  x = `onCompositionEnd`;
                  break b;
                case `compositionupdate`:
                  x = `onCompositionUpdate`;
                  break b;
              }
              x = void 0;
            }
          else
            Zn
              ? Yn(e, n) && (x = `onCompositionEnd`)
              : e === `keydown` &&
                n.keyCode === 229 &&
                (x = `onCompositionStart`);
          (x &&
            (Kn &&
              n.locale !== `ko` &&
              (Zn || x !== `onCompositionStart`
                ? x === `onCompositionEnd` && Zn && (b = gn())
                : ((mn = i),
                  (hn = `value` in mn ? mn.value : mn.textContent),
                  (Zn = !0))),
            (y = Ed(r, x)),
            0 < y.length &&
              ((x = new An(x, e, null, n, i)),
              o.push({ event: x, listeners: y }),
              b ? (x.data = b) : ((b = Xn(n)), b !== null && (x.data = b)))),
            (b = Gn ? Qn(e, n) : $n(e, n)) &&
              ((x = Ed(r, `onBeforeInput`)),
              0 < x.length &&
                ((y = new An(`onBeforeInput`, `beforeinput`, null, n, i)),
                o.push({ event: y, listeners: x }),
                (y.data = b))),
            md(o, e, r, n, i));
        }
        yd(o, t);
      });
    }
    function Td(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function Ed(e, t) {
      for (var n = t + `Capture`, r = []; e !== null; ) {
        var i = e,
          a = i.stateNode;
        if (
          ((i = i.tag),
          (i !== 5 && i !== 26 && i !== 27) ||
            a === null ||
            ((i = un(e, n)),
            i != null && r.unshift(Td(e, i, a)),
            (i = un(e, t)),
            i != null && r.push(Td(e, i, a))),
          e.tag === 3)
        )
          return r;
        e = e.return;
      }
      return [];
    }
    function Dd(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Od(e, t, n, r, i) {
      for (var a = t._reactName, o = []; n !== null && n !== r; ) {
        var s = n,
          c = s.alternate,
          l = s.stateNode;
        if (((s = s.tag), c !== null && c === r)) break;
        ((s !== 5 && s !== 26 && s !== 27) ||
          l === null ||
          ((c = l),
          i
            ? ((l = un(n, a)), l != null && o.unshift(Td(n, l, c)))
            : i || ((l = un(n, a)), l != null && o.push(Td(n, l, c)))),
          (n = n.return));
      }
      o.length !== 0 && e.push({ event: t, listeners: o });
    }
    var kd = /\r\n?/g,
      Ad = /\u0000|\uFFFD/g;
    function jd(e) {
      return (typeof e == `string` ? e : `` + e)
        .replace(
          kd,
          `
`,
        )
        .replace(Ad, ``);
    }
    function Md(e, t) {
      return ((t = jd(t)), jd(e) === t);
    }
    function $(e, t, n, r, i, a) {
      switch (n) {
        case `children`:
          typeof r == `string`
            ? t === `body` || (t === `textarea` && r === ``) || Jt(e, r)
            : (typeof r == `number` || typeof r == `bigint`) &&
              t !== `body` &&
              Jt(e, `` + r);
          break;
        case `className`:
          Nt(e, `class`, r);
          break;
        case `tabIndex`:
          Nt(e, `tabindex`, r);
          break;
        case `dir`:
        case `role`:
        case `viewBox`:
        case `width`:
        case `height`:
          Nt(e, n, r);
          break;
        case `style`:
          I(e, r, a);
          break;
        case `data`:
          if (t !== `object`) {
            Nt(e, `data`, r);
            break;
          }
        case `src`:
        case `href`:
          if (r === `` && (t !== `a` || n !== `href`)) {
            e.removeAttribute(n);
            break;
          }
          if (
            r == null ||
            typeof r == `function` ||
            typeof r == `symbol` ||
            typeof r == `boolean`
          ) {
            e.removeAttribute(n);
            break;
          }
          ((r = en(`` + r)), e.setAttribute(n, r));
          break;
        case `action`:
        case `formAction`:
          if (typeof r == `function`) {
            e.setAttribute(
              n,
              `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`,
            );
            break;
          } else
            typeof a == `function` &&
              (n === `formAction`
                ? (t !== `input` && $(e, t, `name`, i.name, i, null),
                  $(e, t, `formEncType`, i.formEncType, i, null),
                  $(e, t, `formMethod`, i.formMethod, i, null),
                  $(e, t, `formTarget`, i.formTarget, i, null))
                : ($(e, t, `encType`, i.encType, i, null),
                  $(e, t, `method`, i.method, i, null),
                  $(e, t, `target`, i.target, i, null)));
          if (r == null || typeof r == `symbol` || typeof r == `boolean`) {
            e.removeAttribute(n);
            break;
          }
          ((r = en(`` + r)), e.setAttribute(n, r));
          break;
        case `onClick`:
          r != null && (e.onclick = tn);
          break;
        case `onScroll`:
          r != null && Q(`scroll`, e);
          break;
        case `onScrollEnd`:
          r != null && Q(`scrollend`, e);
          break;
        case `dangerouslySetInnerHTML`:
          if (r != null) {
            if (typeof r != `object` || !(`__html` in r)) throw Error(s(61));
            if (((n = r.__html), n != null)) {
              if (i.children != null) throw Error(s(60));
              e.innerHTML = n;
            }
          }
          break;
        case `multiple`:
          e.multiple = r && typeof r != `function` && typeof r != `symbol`;
          break;
        case `muted`:
          e.muted = r && typeof r != `function` && typeof r != `symbol`;
          break;
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `defaultValue`:
        case `defaultChecked`:
        case `innerHTML`:
        case `ref`:
          break;
        case `autoFocus`:
          break;
        case `xlinkHref`:
          if (
            r == null ||
            typeof r == `function` ||
            typeof r == `boolean` ||
            typeof r == `symbol`
          ) {
            e.removeAttribute(`xlink:href`);
            break;
          }
          ((n = en(`` + r)),
            e.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n));
          break;
        case `contentEditable`:
        case `spellCheck`:
        case `draggable`:
        case `value`:
        case `autoReverse`:
        case `externalResourcesRequired`:
        case `focusable`:
        case `preserveAlpha`:
          r != null && typeof r != `function` && typeof r != `symbol`
            ? e.setAttribute(n, `` + r)
            : e.removeAttribute(n);
          break;
        case `inert`:
        case `allowFullScreen`:
        case `async`:
        case `autoPlay`:
        case `controls`:
        case `default`:
        case `defer`:
        case `disabled`:
        case `disablePictureInPicture`:
        case `disableRemotePlayback`:
        case `formNoValidate`:
        case `hidden`:
        case `loop`:
        case `noModule`:
        case `noValidate`:
        case `open`:
        case `playsInline`:
        case `readOnly`:
        case `required`:
        case `reversed`:
        case `scoped`:
        case `seamless`:
        case `itemScope`:
          r && typeof r != `function` && typeof r != `symbol`
            ? e.setAttribute(n, ``)
            : e.removeAttribute(n);
          break;
        case `capture`:
        case `download`:
          !0 === r
            ? e.setAttribute(n, ``)
            : !1 !== r &&
                r != null &&
                typeof r != `function` &&
                typeof r != `symbol`
              ? e.setAttribute(n, r)
              : e.removeAttribute(n);
          break;
        case `cols`:
        case `rows`:
        case `size`:
        case `span`:
          r != null &&
          typeof r != `function` &&
          typeof r != `symbol` &&
          !isNaN(r) &&
          1 <= r
            ? e.setAttribute(n, r)
            : e.removeAttribute(n);
          break;
        case `rowSpan`:
        case `start`:
          r == null ||
          typeof r == `function` ||
          typeof r == `symbol` ||
          isNaN(r)
            ? e.removeAttribute(n)
            : e.setAttribute(n, r);
          break;
        case `popover`:
          (Q(`beforetoggle`, e), Q(`toggle`, e), P(e, `popover`, r));
          break;
        case `xlinkActuate`:
          Pt(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r);
          break;
        case `xlinkArcrole`:
          Pt(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r);
          break;
        case `xlinkRole`:
          Pt(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r);
          break;
        case `xlinkShow`:
          Pt(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r);
          break;
        case `xlinkTitle`:
          Pt(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r);
          break;
        case `xlinkType`:
          Pt(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r);
          break;
        case `xmlBase`:
          Pt(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r);
          break;
        case `xmlLang`:
          Pt(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r);
          break;
        case `xmlSpace`:
          Pt(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r);
          break;
        case `is`:
          P(e, `is`, r);
          break;
        case `innerText`:
        case `textContent`:
          break;
        default:
          (!(2 < n.length) ||
            (n[0] !== `o` && n[0] !== `O`) ||
            (n[1] !== `n` && n[1] !== `N`)) &&
            ((n = Qt.get(n) || n), P(e, n, r));
      }
    }
    function Nd(e, t, n, r, i, a) {
      switch (n) {
        case `style`:
          I(e, r, a);
          break;
        case `dangerouslySetInnerHTML`:
          if (r != null) {
            if (typeof r != `object` || !(`__html` in r)) throw Error(s(61));
            if (((n = r.__html), n != null)) {
              if (i.children != null) throw Error(s(60));
              e.innerHTML = n;
            }
          }
          break;
        case `children`:
          typeof r == `string`
            ? Jt(e, r)
            : (typeof r == `number` || typeof r == `bigint`) && Jt(e, `` + r);
          break;
        case `onScroll`:
          r != null && Q(`scroll`, e);
          break;
        case `onScrollEnd`:
          r != null && Q(`scrollend`, e);
          break;
        case `onClick`:
          r != null && (e.onclick = tn);
          break;
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `innerHTML`:
        case `ref`:
          break;
        case `innerText`:
        case `textContent`:
          break;
        default:
          if (!Et.hasOwnProperty(n))
            a: {
              if (
                n[0] === `o` &&
                n[1] === `n` &&
                ((i = n.endsWith(`Capture`)),
                (t = n.slice(2, i ? n.length - 7 : void 0)),
                (a = e[pt] || null),
                (a = a == null ? null : a[n]),
                typeof a == `function` && e.removeEventListener(t, a, i),
                typeof r == `function`)
              ) {
                (typeof a != `function` &&
                  a !== null &&
                  (n in e
                    ? (e[n] = null)
                    : e.hasAttribute(n) && e.removeAttribute(n)),
                  e.addEventListener(t, r, i));
                break a;
              }
              n in e
                ? (e[n] = r)
                : !0 === r
                  ? e.setAttribute(n, ``)
                  : P(e, n, r);
            }
      }
    }
    function Pd(e, t, n) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
        case `a`:
        case `g`:
        case `p`:
        case `li`:
          break;
        case `img`:
          (Q(`error`, e), Q(`load`, e));
          var r = !1,
            i = !1,
            a;
          for (a in n)
            if (n.hasOwnProperty(a)) {
              var o = n[a];
              if (o != null)
                switch (a) {
                  case `src`:
                    r = !0;
                    break;
                  case `srcSet`:
                    i = !0;
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(s(137, t));
                  default:
                    $(e, t, a, o, n, null);
                }
            }
          (i && $(e, t, `srcSet`, n.srcSet, n, null),
            r && $(e, t, `src`, n.src, n, null));
          return;
        case `input`:
          Q(`invalid`, e);
          var c = (a = o = i = null),
            l = null,
            u = null;
          for (r in n)
            if (n.hasOwnProperty(r)) {
              var d = n[r];
              if (d != null)
                switch (r) {
                  case `name`:
                    i = d;
                    break;
                  case `type`:
                    o = d;
                    break;
                  case `checked`:
                    l = d;
                    break;
                  case `defaultChecked`:
                    u = d;
                    break;
                  case `value`:
                    a = d;
                    break;
                  case `defaultValue`:
                    c = d;
                    break;
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    if (d != null) throw Error(s(137, t));
                    break;
                  default:
                    $(e, t, r, d, n, null);
                }
            }
          F(e, a, c, l, u, o, i, !1);
          return;
        case `select`:
          for (i in (Q(`invalid`, e), (r = o = a = null), n))
            if (n.hasOwnProperty(i) && ((c = n[i]), c != null))
              switch (i) {
                case `value`:
                  a = c;
                  break;
                case `defaultValue`:
                  o = c;
                  break;
                case `multiple`:
                  r = c;
                default:
                  $(e, t, i, c, n, null);
              }
          ((t = a),
            (n = o),
            (e.multiple = !!r),
            t == null ? n != null && Gt(e, !!r, n, !0) : Gt(e, !!r, t, !1));
          return;
        case `textarea`:
          for (o in (Q(`invalid`, e), (a = i = r = null), n))
            if (n.hasOwnProperty(o) && ((c = n[o]), c != null))
              switch (o) {
                case `value`:
                  r = c;
                  break;
                case `defaultValue`:
                  i = c;
                  break;
                case `children`:
                  a = c;
                  break;
                case `dangerouslySetInnerHTML`:
                  if (c != null) throw Error(s(91));
                  break;
                default:
                  $(e, t, o, c, n, null);
              }
          qt(e, r, i, a);
          return;
        case `option`:
          for (l in n)
            if (n.hasOwnProperty(l) && ((r = n[l]), r != null))
              switch (l) {
                case `selected`:
                  e.selected =
                    r && typeof r != `function` && typeof r != `symbol`;
                  break;
                default:
                  $(e, t, l, r, n, null);
              }
          return;
        case `dialog`:
          (Q(`beforetoggle`, e), Q(`toggle`, e), Q(`cancel`, e), Q(`close`, e));
          break;
        case `iframe`:
        case `object`:
          Q(`load`, e);
          break;
        case `video`:
        case `audio`:
          for (r = 0; r < _d.length; r++) Q(_d[r], e);
          break;
        case `image`:
          (Q(`error`, e), Q(`load`, e));
          break;
        case `details`:
          Q(`toggle`, e);
          break;
        case `embed`:
        case `source`:
        case `link`:
          (Q(`error`, e), Q(`load`, e));
        case `area`:
        case `base`:
        case `br`:
        case `col`:
        case `hr`:
        case `keygen`:
        case `meta`:
        case `param`:
        case `track`:
        case `wbr`:
        case `menuitem`:
          for (u in n)
            if (n.hasOwnProperty(u) && ((r = n[u]), r != null))
              switch (u) {
                case `children`:
                case `dangerouslySetInnerHTML`:
                  throw Error(s(137, t));
                default:
                  $(e, t, u, r, n, null);
              }
          return;
        default:
          if (Zt(t)) {
            for (d in n)
              n.hasOwnProperty(d) &&
                ((r = n[d]), r !== void 0 && Nd(e, t, d, r, n, void 0));
            return;
          }
      }
      for (c in n)
        n.hasOwnProperty(c) &&
          ((r = n[c]), r != null && $(e, t, c, r, n, null));
    }
    function Fd(e, t, n, r) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
        case `a`:
        case `g`:
        case `p`:
        case `li`:
          break;
        case `input`:
          var i = null,
            a = null,
            o = null,
            c = null,
            l = null,
            u = null,
            d = null;
          for (m in n) {
            var f = n[m];
            if (n.hasOwnProperty(m) && f != null)
              switch (m) {
                case `checked`:
                  break;
                case `value`:
                  break;
                case `defaultValue`:
                  l = f;
                default:
                  r.hasOwnProperty(m) || $(e, t, m, null, r, f);
              }
          }
          for (var p in r) {
            var m = r[p];
            if (((f = n[p]), r.hasOwnProperty(p) && (m != null || f != null)))
              switch (p) {
                case `type`:
                  a = m;
                  break;
                case `name`:
                  i = m;
                  break;
                case `checked`:
                  u = m;
                  break;
                case `defaultChecked`:
                  d = m;
                  break;
                case `value`:
                  o = m;
                  break;
                case `defaultValue`:
                  c = m;
                  break;
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (m != null) throw Error(s(137, t));
                  break;
                default:
                  m !== f && $(e, t, p, m, r, f);
              }
          }
          Ut(e, o, c, l, u, d, a, i);
          return;
        case `select`:
          for (a in ((m = o = c = p = null), n))
            if (((l = n[a]), n.hasOwnProperty(a) && l != null))
              switch (a) {
                case `value`:
                  break;
                case `multiple`:
                  m = l;
                default:
                  r.hasOwnProperty(a) || $(e, t, a, null, r, l);
              }
          for (i in r)
            if (
              ((a = r[i]),
              (l = n[i]),
              r.hasOwnProperty(i) && (a != null || l != null))
            )
              switch (i) {
                case `value`:
                  p = a;
                  break;
                case `defaultValue`:
                  c = a;
                  break;
                case `multiple`:
                  o = a;
                default:
                  a !== l && $(e, t, i, a, r, l);
              }
          ((t = c),
            (n = o),
            (r = m),
            p == null
              ? !!r != !!n &&
                (t == null ? Gt(e, !!n, n ? [] : ``, !1) : Gt(e, !!n, t, !0))
              : Gt(e, !!n, p, !1));
          return;
        case `textarea`:
          for (c in ((m = p = null), n))
            if (
              ((i = n[c]),
              n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c))
            )
              switch (c) {
                case `value`:
                  break;
                case `children`:
                  break;
                default:
                  $(e, t, c, null, r, i);
              }
          for (o in r)
            if (
              ((i = r[o]),
              (a = n[o]),
              r.hasOwnProperty(o) && (i != null || a != null))
            )
              switch (o) {
                case `value`:
                  p = i;
                  break;
                case `defaultValue`:
                  m = i;
                  break;
                case `children`:
                  break;
                case `dangerouslySetInnerHTML`:
                  if (i != null) throw Error(s(91));
                  break;
                default:
                  i !== a && $(e, t, o, i, r, a);
              }
          Kt(e, p, m);
          return;
        case `option`:
          for (var h in n)
            if (
              ((p = n[h]),
              n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h))
            )
              switch (h) {
                case `selected`:
                  e.selected = !1;
                  break;
                default:
                  $(e, t, h, null, r, p);
              }
          for (l in r)
            if (
              ((p = r[l]),
              (m = n[l]),
              r.hasOwnProperty(l) && p !== m && (p != null || m != null))
            )
              switch (l) {
                case `selected`:
                  e.selected =
                    p && typeof p != `function` && typeof p != `symbol`;
                  break;
                default:
                  $(e, t, l, p, r, m);
              }
          return;
        case `img`:
        case `link`:
        case `area`:
        case `base`:
        case `br`:
        case `col`:
        case `embed`:
        case `hr`:
        case `keygen`:
        case `meta`:
        case `param`:
        case `source`:
        case `track`:
        case `wbr`:
        case `menuitem`:
          for (var g in n)
            ((p = n[g]),
              n.hasOwnProperty(g) &&
                p != null &&
                !r.hasOwnProperty(g) &&
                $(e, t, g, null, r, p));
          for (u in r)
            if (
              ((p = r[u]),
              (m = n[u]),
              r.hasOwnProperty(u) && p !== m && (p != null || m != null))
            )
              switch (u) {
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (p != null) throw Error(s(137, t));
                  break;
                default:
                  $(e, t, u, p, r, m);
              }
          return;
        default:
          if (Zt(t)) {
            for (var _ in n)
              ((p = n[_]),
                n.hasOwnProperty(_) &&
                  p !== void 0 &&
                  !r.hasOwnProperty(_) &&
                  Nd(e, t, _, void 0, r, p));
            for (d in r)
              ((p = r[d]),
                (m = n[d]),
                !r.hasOwnProperty(d) ||
                  p === m ||
                  (p === void 0 && m === void 0) ||
                  Nd(e, t, d, p, r, m));
            return;
          }
      }
      for (var v in n)
        ((p = n[v]),
          n.hasOwnProperty(v) &&
            p != null &&
            !r.hasOwnProperty(v) &&
            $(e, t, v, null, r, p));
      for (f in r)
        ((p = r[f]),
          (m = n[f]),
          !r.hasOwnProperty(f) ||
            p === m ||
            (p == null && m == null) ||
            $(e, t, f, p, r, m));
    }
    function Id(e) {
      switch (e) {
        case `css`:
        case `script`:
        case `font`:
        case `img`:
        case `image`:
        case `input`:
        case `link`:
          return !0;
        default:
          return !1;
      }
    }
    function Ld() {
      if (typeof performance.getEntriesByType == `function`) {
        for (
          var e = 0, t = 0, n = performance.getEntriesByType(`resource`), r = 0;
          r < n.length;
          r++
        ) {
          var i = n[r],
            a = i.transferSize,
            o = i.initiatorType,
            s = i.duration;
          if (a && s && Id(o)) {
            for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
              var c = n[r],
                l = c.startTime;
              if (l > s) break;
              var u = c.transferSize,
                d = c.initiatorType;
              u &&
                Id(d) &&
                ((c = c.responseEnd),
                (o += u * (c < s ? 1 : (s - l) / (c - l))));
            }
            if ((--r, (t += (8 * (a + o)) / (i.duration / 1e3)), e++, 10 < e))
              break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection &&
        ((e = navigator.connection.downlink), typeof e == `number`)
        ? e
        : 5;
    }
    var Rd = null,
      zd = null;
    function Bd(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Vd(e) {
      switch (e) {
        case `http://www.w3.org/2000/svg`:
          return 1;
        case `http://www.w3.org/1998/Math/MathML`:
          return 2;
        default:
          return 0;
      }
    }
    function Hd(e, t) {
      if (e === 0)
        switch (t) {
          case `svg`:
            return 1;
          case `math`:
            return 2;
          default:
            return 0;
        }
      return e === 1 && t === `foreignObject` ? 0 : e;
    }
    function Ud(e, t) {
      return (
        e === `textarea` ||
        e === `noscript` ||
        typeof t.children == `string` ||
        typeof t.children == `number` ||
        typeof t.children == `bigint` ||
        (typeof t.dangerouslySetInnerHTML == `object` &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Wd = null;
    function Gd() {
      var e = window.event;
      return e && e.type === `popstate`
        ? e === Wd
          ? !1
          : ((Wd = e), !0)
        : ((Wd = null), !1);
    }
    var Kd = typeof setTimeout == `function` ? setTimeout : void 0,
      qd = typeof clearTimeout == `function` ? clearTimeout : void 0,
      Jd = typeof Promise == `function` ? Promise : void 0,
      Yd =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : Jd === void 0
            ? Kd
            : function (e) {
                return Jd.resolve(null).then(e).catch(Xd);
              };
    function Xd(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Zd(e) {
      return e === `head`;
    }
    function Qd(e, t) {
      var n = t,
        r = 0;
      do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
          if (((n = i.data), n === `/$` || n === `/&`)) {
            if (r === 0) {
              (e.removeChild(i), Np(t));
              return;
            }
            r--;
          } else if (
            n === `$` ||
            n === `$?` ||
            n === `$~` ||
            n === `$!` ||
            n === `&`
          )
            r++;
          else if (n === `html`) pf(e.ownerDocument.documentElement);
          else if (n === `head`) {
            ((n = e.ownerDocument.head), pf(n));
            for (var a = n.firstChild; a; ) {
              var o = a.nextSibling,
                s = a.nodeName;
              (a[yt] ||
                s === `SCRIPT` ||
                s === `STYLE` ||
                (s === `LINK` && a.rel.toLowerCase() === `stylesheet`) ||
                n.removeChild(a),
                (a = o));
            }
          } else n === `body` && pf(e.ownerDocument.body);
        n = i;
      } while (n);
      Np(t);
    }
    function $d(e, t) {
      var n = e;
      e = 0;
      do {
        var r = n.nextSibling;
        if (
          (n.nodeType === 1
            ? t
              ? ((n._stashedDisplay = n.style.display),
                (n.style.display = `none`))
              : ((n.style.display = n._stashedDisplay || ``),
                n.getAttribute(`style`) === `` && n.removeAttribute(`style`))
            : n.nodeType === 3 &&
              (t
                ? ((n._stashedText = n.nodeValue), (n.nodeValue = ``))
                : (n.nodeValue = n._stashedText || ``)),
          r && r.nodeType === 8)
        )
          if (((n = r.data), n === `/$`)) {
            if (e === 0) break;
            e--;
          } else (n !== `$` && n !== `$?` && n !== `$~` && n !== `$!`) || e++;
        n = r;
      } while (n);
    }
    function ef(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t;
        switch (((t = t.nextSibling), n.nodeName)) {
          case `HTML`:
          case `HEAD`:
          case `BODY`:
            (ef(n), bt(n));
            continue;
          case `SCRIPT`:
          case `STYLE`:
            continue;
          case `LINK`:
            if (n.rel.toLowerCase() === `stylesheet`) continue;
        }
        e.removeChild(n);
      }
    }
    function tf(e, t, n, r) {
      for (; e.nodeType === 1; ) {
        var i = n;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) break;
        } else if (!r)
          if (t === `input` && e.type === `hidden`) {
            var a = i.name == null ? null : `` + i.name;
            if (i.type === `hidden` && e.getAttribute(`name`) === a) return e;
          } else return e;
        else if (!e[yt])
          switch (t) {
            case `meta`:
              if (!e.hasAttribute(`itemprop`)) break;
              return e;
            case `link`:
              if (
                ((a = e.getAttribute(`rel`)),
                (a === `stylesheet` && e.hasAttribute(`data-precedence`)) ||
                  a !== i.rel ||
                  e.getAttribute(`href`) !==
                    (i.href == null || i.href === `` ? null : i.href) ||
                  e.getAttribute(`crossorigin`) !==
                    (i.crossOrigin == null ? null : i.crossOrigin) ||
                  e.getAttribute(`title`) !==
                    (i.title == null ? null : i.title))
              )
                break;
              return e;
            case `style`:
              if (e.hasAttribute(`data-precedence`)) break;
              return e;
            case `script`:
              if (
                ((a = e.getAttribute(`src`)),
                (a !== (i.src == null ? null : i.src) ||
                  e.getAttribute(`type`) !== (i.type == null ? null : i.type) ||
                  e.getAttribute(`crossorigin`) !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  a &&
                  e.hasAttribute(`async`) &&
                  !e.hasAttribute(`itemprop`))
              )
                break;
              return e;
            default:
              return e;
          }
        if (((e = cf(e.nextSibling)), e === null)) break;
      }
      return null;
    }
    function nf(e, t, n) {
      if (t === ``) return null;
      for (; e.nodeType !== 3; )
        if (
          ((e.nodeType !== 1 ||
            e.nodeName !== `INPUT` ||
            e.type !== `hidden`) &&
            !n) ||
          ((e = cf(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function rf(e, t) {
      for (; e.nodeType !== 8; )
        if (
          ((e.nodeType !== 1 ||
            e.nodeName !== `INPUT` ||
            e.type !== `hidden`) &&
            !t) ||
          ((e = cf(e.nextSibling)), e === null)
        )
          return null;
      return e;
    }
    function af(e) {
      return e.data === `$?` || e.data === `$~`;
    }
    function of(e) {
      return (
        e.data === `$!` ||
        (e.data === `$?` && e.ownerDocument.readyState !== `loading`)
      );
    }
    function sf(e, t) {
      var n = e.ownerDocument;
      if (e.data === `$~`) e._reactRetry = t;
      else if (e.data !== `$?` || n.readyState !== `loading`) t();
      else {
        var r = function () {
          (t(), n.removeEventListener(`DOMContentLoaded`, r));
        };
        (n.addEventListener(`DOMContentLoaded`, r), (e._reactRetry = r));
      }
    }
    function cf(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (
            ((t = e.data),
            t === `$` ||
              t === `$!` ||
              t === `$?` ||
              t === `$~` ||
              t === `&` ||
              t === `F!` ||
              t === `F`)
          )
            break;
          if (t === `/$` || t === `/&`) return null;
        }
      }
      return e;
    }
    var lf = null;
    function uf(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === `/$` || n === `/&`) {
            if (t === 0) return cf(e.nextSibling);
            t--;
          } else
            (n !== `$` &&
              n !== `$!` &&
              n !== `$?` &&
              n !== `$~` &&
              n !== `&`) ||
              t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function df(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (
            n === `$` ||
            n === `$!` ||
            n === `$?` ||
            n === `$~` ||
            n === `&`
          ) {
            if (t === 0) return e;
            t--;
          } else (n !== `/$` && n !== `/&`) || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function ff(e, t, n) {
      switch (((t = Bd(n)), e)) {
        case `html`:
          if (((e = t.documentElement), !e)) throw Error(s(452));
          return e;
        case `head`:
          if (((e = t.head), !e)) throw Error(s(453));
          return e;
        case `body`:
          if (((e = t.body), !e)) throw Error(s(454));
          return e;
        default:
          throw Error(s(451));
      }
    }
    function pf(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
      bt(e);
    }
    var mf = new Map(),
      hf = new Set();
    function gf(e) {
      return typeof e.getRootNode == `function`
        ? e.getRootNode()
        : e.nodeType === 9
          ? e
          : e.ownerDocument;
    }
    var _f = D.d;
    D.d = { f: vf, r: yf, D: Sf, C: Cf, L: wf, m: Tf, X: Df, S: Ef, M: Of };
    function vf() {
      var e = _f.f(),
        t = bu();
      return e || t;
    }
    function yf(e) {
      var t = St(e);
      t !== null && t.tag === 5 && t.type === `form` ? ws(t) : _f.r(e);
    }
    var bf = typeof document > `u` ? null : document;
    function xf(e, t, n) {
      var r = bf;
      if (r && typeof t == `string` && t) {
        var i = Ht(t);
        ((i = `link[rel="` + e + `"][href="` + i + `"]`),
          typeof n == `string` && (i += `[crossorigin="` + n + `"]`),
          hf.has(i) ||
            (hf.add(i),
            (e = { rel: e, crossOrigin: n, href: t }),
            r.querySelector(i) === null &&
              ((t = r.createElement(`link`)),
              Pd(t, `link`, e),
              wt(t),
              r.head.appendChild(t))));
      }
    }
    function Sf(e) {
      (_f.D(e), xf(`dns-prefetch`, e, null));
    }
    function Cf(e, t) {
      (_f.C(e, t), xf(`preconnect`, e, t));
    }
    function wf(e, t, n) {
      _f.L(e, t, n);
      var r = bf;
      if (r && e && t) {
        var i = `link[rel="preload"][as="` + Ht(t) + `"]`;
        t === `image` && n && n.imageSrcSet
          ? ((i += `[imagesrcset="` + Ht(n.imageSrcSet) + `"]`),
            typeof n.imageSizes == `string` &&
              (i += `[imagesizes="` + Ht(n.imageSizes) + `"]`))
          : (i += `[href="` + Ht(e) + `"]`);
        var a = i;
        switch (t) {
          case `style`:
            a = Af(e);
            break;
          case `script`:
            a = Pf(e);
        }
        mf.has(a) ||
          ((e = h(
            {
              rel: `preload`,
              href: t === `image` && n && n.imageSrcSet ? void 0 : e,
              as: t,
            },
            n,
          )),
          mf.set(a, e),
          r.querySelector(i) !== null ||
            (t === `style` && r.querySelector(jf(a))) ||
            (t === `script` && r.querySelector(Ff(a))) ||
            ((t = r.createElement(`link`)),
            Pd(t, `link`, e),
            wt(t),
            r.head.appendChild(t)));
      }
    }
    function Tf(e, t) {
      _f.m(e, t);
      var n = bf;
      if (n && e) {
        var r = t && typeof t.as == `string` ? t.as : `script`,
          i =
            `link[rel="modulepreload"][as="` +
            Ht(r) +
            `"][href="` +
            Ht(e) +
            `"]`,
          a = i;
        switch (r) {
          case `audioworklet`:
          case `paintworklet`:
          case `serviceworker`:
          case `sharedworker`:
          case `worker`:
          case `script`:
            a = Pf(e);
        }
        if (
          !mf.has(a) &&
          ((e = h({ rel: `modulepreload`, href: e }, t)),
          mf.set(a, e),
          n.querySelector(i) === null)
        ) {
          switch (r) {
            case `audioworklet`:
            case `paintworklet`:
            case `serviceworker`:
            case `sharedworker`:
            case `worker`:
            case `script`:
              if (n.querySelector(Ff(a))) return;
          }
          ((r = n.createElement(`link`)),
            Pd(r, `link`, e),
            wt(r),
            n.head.appendChild(r));
        }
      }
    }
    function Ef(e, t, n) {
      _f.S(e, t, n);
      var r = bf;
      if (r && e) {
        var i = N(r).hoistableStyles,
          a = Af(e);
        t ||= `default`;
        var o = i.get(a);
        if (!o) {
          var s = { loading: 0, preload: null };
          if ((o = r.querySelector(jf(a)))) s.loading = 5;
          else {
            ((e = h({ rel: `stylesheet`, href: e, "data-precedence": t }, n)),
              (n = mf.get(a)) && Rf(e, n));
            var c = (o = r.createElement(`link`));
            (wt(c),
              Pd(c, `link`, e),
              (c._p = new Promise(function (e, t) {
                ((c.onload = e), (c.onerror = t));
              })),
              c.addEventListener(`load`, function () {
                s.loading |= 1;
              }),
              c.addEventListener(`error`, function () {
                s.loading |= 2;
              }),
              (s.loading |= 4),
              Lf(o, t, r));
          }
          ((o = { type: `stylesheet`, instance: o, count: 1, state: s }),
            i.set(a, o));
        }
      }
    }
    function Df(e, t) {
      _f.X(e, t);
      var n = bf;
      if (n && e) {
        var r = N(n).hoistableScripts,
          i = Pf(e),
          a = r.get(i);
        a ||
          ((a = n.querySelector(Ff(i))),
          a ||
            ((e = h({ src: e, async: !0 }, t)),
            (t = mf.get(i)) && zf(e, t),
            (a = n.createElement(`script`)),
            wt(a),
            Pd(a, `link`, e),
            n.head.appendChild(a)),
          (a = { type: `script`, instance: a, count: 1, state: null }),
          r.set(i, a));
      }
    }
    function Of(e, t) {
      _f.M(e, t);
      var n = bf;
      if (n && e) {
        var r = N(n).hoistableScripts,
          i = Pf(e),
          a = r.get(i);
        a ||
          ((a = n.querySelector(Ff(i))),
          a ||
            ((e = h({ src: e, async: !0, type: `module` }, t)),
            (t = mf.get(i)) && zf(e, t),
            (a = n.createElement(`script`)),
            wt(a),
            Pd(a, `link`, e),
            n.head.appendChild(a)),
          (a = { type: `script`, instance: a, count: 1, state: null }),
          r.set(i, a));
      }
    }
    function kf(e, t, n, r) {
      var i = (i = me.current) ? gf(i) : null;
      if (!i) throw Error(s(446));
      switch (e) {
        case `meta`:
        case `title`:
          return null;
        case `style`:
          return typeof n.precedence == `string` && typeof n.href == `string`
            ? ((t = Af(n.href)),
              (n = N(i).hoistableStyles),
              (r = n.get(t)),
              r ||
                ((r = { type: `style`, instance: null, count: 0, state: null }),
                n.set(t, r)),
              r)
            : { type: `void`, instance: null, count: 0, state: null };
        case `link`:
          if (
            n.rel === `stylesheet` &&
            typeof n.href == `string` &&
            typeof n.precedence == `string`
          ) {
            e = Af(n.href);
            var a = N(i).hoistableStyles,
              o = a.get(e);
            if (
              (o ||
                ((i = i.ownerDocument || i),
                (o = {
                  type: `stylesheet`,
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                a.set(e, o),
                (a = i.querySelector(jf(e))) &&
                  !a._p &&
                  ((o.instance = a), (o.state.loading = 5)),
                mf.has(e) ||
                  ((n = {
                    rel: `preload`,
                    as: `style`,
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  mf.set(e, n),
                  a || Nf(i, e, n, o.state))),
              t && r === null)
            )
              throw Error(s(528, ``));
            return o;
          }
          if (t && r !== null) throw Error(s(529, ``));
          return null;
        case `script`:
          return (
            (t = n.async),
            (n = n.src),
            typeof n == `string` &&
            t &&
            typeof t != `function` &&
            typeof t != `symbol`
              ? ((t = Pf(n)),
                (n = N(i).hoistableScripts),
                (r = n.get(t)),
                r ||
                  ((r = {
                    type: `script`,
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  n.set(t, r)),
                r)
              : { type: `void`, instance: null, count: 0, state: null }
          );
        default:
          throw Error(s(444, e));
      }
    }
    function Af(e) {
      return `href="` + Ht(e) + `"`;
    }
    function jf(e) {
      return `link[rel="stylesheet"][` + e + `]`;
    }
    function Mf(e) {
      return h({}, e, { "data-precedence": e.precedence, precedence: null });
    }
    function Nf(e, t, n, r) {
      e.querySelector(`link[rel="preload"][as="style"][` + t + `]`)
        ? (r.loading = 1)
        : ((t = e.createElement(`link`)),
          (r.preload = t),
          t.addEventListener(`load`, function () {
            return (r.loading |= 1);
          }),
          t.addEventListener(`error`, function () {
            return (r.loading |= 2);
          }),
          Pd(t, `link`, n),
          wt(t),
          e.head.appendChild(t));
    }
    function Pf(e) {
      return `[src="` + Ht(e) + `"]`;
    }
    function Ff(e) {
      return `script[async]` + e;
    }
    function If(e, t, n) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case `style`:
            var r = e.querySelector(`style[data-href~="` + Ht(n.href) + `"]`);
            if (r) return ((t.instance = r), wt(r), r);
            var i = h({}, n, {
              "data-href": n.href,
              "data-precedence": n.precedence,
              href: null,
              precedence: null,
            });
            return (
              (r = (e.ownerDocument || e).createElement(`style`)),
              wt(r),
              Pd(r, `style`, i),
              Lf(r, n.precedence, e),
              (t.instance = r)
            );
          case `stylesheet`:
            i = Af(n.href);
            var a = e.querySelector(jf(i));
            if (a) return ((t.state.loading |= 4), (t.instance = a), wt(a), a);
            ((r = Mf(n)),
              (i = mf.get(i)) && Rf(r, i),
              (a = (e.ownerDocument || e).createElement(`link`)),
              wt(a));
            var o = a;
            return (
              (o._p = new Promise(function (e, t) {
                ((o.onload = e), (o.onerror = t));
              })),
              Pd(a, `link`, r),
              (t.state.loading |= 4),
              Lf(a, n.precedence, e),
              (t.instance = a)
            );
          case `script`:
            return (
              (a = Pf(n.src)),
              (i = e.querySelector(Ff(a)))
                ? ((t.instance = i), wt(i), i)
                : ((r = n),
                  (i = mf.get(a)) && ((r = h({}, n)), zf(r, i)),
                  (e = e.ownerDocument || e),
                  (i = e.createElement(`script`)),
                  wt(i),
                  Pd(i, `link`, r),
                  e.head.appendChild(i),
                  (t.instance = i))
            );
          case `void`:
            return null;
          default:
            throw Error(s(443, t.type));
        }
      else
        t.type === `stylesheet` &&
          !(t.state.loading & 4) &&
          ((r = t.instance), (t.state.loading |= 4), Lf(r, n.precedence, e));
      return t.instance;
    }
    function Lf(e, t, n) {
      for (
        var r = n.querySelectorAll(
            `link[rel="stylesheet"][data-precedence],style[data-precedence]`,
          ),
          i = r.length ? r[r.length - 1] : null,
          a = i,
          o = 0;
        o < r.length;
        o++
      ) {
        var s = r[o];
        if (s.dataset.precedence === t) a = s;
        else if (a !== i) break;
      }
      a
        ? a.parentNode.insertBefore(e, a.nextSibling)
        : ((t = n.nodeType === 9 ? n.head : n),
          t.insertBefore(e, t.firstChild));
    }
    function Rf(e, t) {
      ((e.crossOrigin ??= t.crossOrigin),
        (e.referrerPolicy ??= t.referrerPolicy),
        (e.title ??= t.title));
    }
    function zf(e, t) {
      ((e.crossOrigin ??= t.crossOrigin),
        (e.referrerPolicy ??= t.referrerPolicy),
        (e.integrity ??= t.integrity));
    }
    var Bf = null;
    function Vf(e, t, n) {
      if (Bf === null) {
        var r = new Map(),
          i = (Bf = new Map());
        i.set(n, r);
      } else ((i = Bf), (r = i.get(n)), r || ((r = new Map()), i.set(n, r)));
      if (r.has(e)) return r;
      for (
        r.set(e, null), n = n.getElementsByTagName(e), i = 0;
        i < n.length;
        i++
      ) {
        var a = n[i];
        if (
          !(
            a[yt] ||
            a[ft] ||
            (e === `link` && a.getAttribute(`rel`) === `stylesheet`)
          ) &&
          a.namespaceURI !== `http://www.w3.org/2000/svg`
        ) {
          var o = a.getAttribute(t) || ``;
          o = e + o;
          var s = r.get(o);
          s ? s.push(a) : r.set(o, [a]);
        }
      }
      return r;
    }
    function Hf(e, t, n) {
      ((e = e.ownerDocument || e),
        e.head.insertBefore(
          n,
          t === `title` ? e.querySelector(`head > title`) : null,
        ));
    }
    function Uf(e, t, n) {
      if (n === 1 || t.itemProp != null) return !1;
      switch (e) {
        case `meta`:
        case `title`:
          return !0;
        case `style`:
          if (
            typeof t.precedence != `string` ||
            typeof t.href != `string` ||
            t.href === ``
          )
            break;
          return !0;
        case `link`:
          if (
            typeof t.rel != `string` ||
            typeof t.href != `string` ||
            t.href === `` ||
            t.onLoad ||
            t.onError
          )
            break;
          switch (t.rel) {
            case `stylesheet`:
              return (
                (e = t.disabled),
                typeof t.precedence == `string` && e == null
              );
            default:
              return !0;
          }
        case `script`:
          if (
            t.async &&
            typeof t.async != `function` &&
            typeof t.async != `symbol` &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            typeof t.src == `string`
          )
            return !0;
      }
      return !1;
    }
    function Wf(e) {
      return !(e.type === `stylesheet` && !(e.state.loading & 3));
    }
    function Gf(e, t, n, r) {
      if (
        n.type === `stylesheet` &&
        (typeof r.media != `string` || !1 !== matchMedia(r.media).matches) &&
        !(n.state.loading & 4)
      ) {
        if (n.instance === null) {
          var i = Af(r.href),
            a = t.querySelector(jf(i));
          if (a) {
            ((t = a._p),
              typeof t == `object` &&
                t &&
                typeof t.then == `function` &&
                (e.count++, (e = Jf.bind(e)), t.then(e, e)),
              (n.state.loading |= 4),
              (n.instance = a),
              wt(a));
            return;
          }
          ((a = t.ownerDocument || t),
            (r = Mf(r)),
            (i = mf.get(i)) && Rf(r, i),
            (a = a.createElement(`link`)),
            wt(a));
          var o = a;
          ((o._p = new Promise(function (e, t) {
            ((o.onload = e), (o.onerror = t));
          })),
            Pd(a, `link`, r),
            (n.instance = a));
        }
        (e.stylesheets === null && (e.stylesheets = new Map()),
          e.stylesheets.set(n, t),
          (t = n.state.preload) &&
            !(n.state.loading & 3) &&
            (e.count++,
            (n = Jf.bind(e)),
            t.addEventListener(`load`, n),
            t.addEventListener(`error`, n)));
      }
    }
    var Kf = 0;
    function qf(e, t) {
      return (
        e.stylesheets && e.count === 0 && Xf(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount
          ? function (n) {
              var r = setTimeout(function () {
                if ((e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
                  var t = e.unsuspend;
                  ((e.unsuspend = null), t());
                }
              }, 6e4 + t);
              0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
              var i = setTimeout(
                function () {
                  if (
                    ((e.waitingForImages = !1),
                    e.count === 0 &&
                      (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend))
                  ) {
                    var t = e.unsuspend;
                    ((e.unsuspend = null), t());
                  }
                },
                (e.imgBytes > Kf ? 50 : 800) + t,
              );
              return (
                (e.unsuspend = n),
                function () {
                  ((e.unsuspend = null), clearTimeout(r), clearTimeout(i));
                }
              );
            }
          : null
      );
    }
    function Jf() {
      if (
        (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
      ) {
        if (this.stylesheets) Xf(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          ((this.unsuspend = null), e());
        }
      }
    }
    var Yf = null;
    function Xf(e, t) {
      ((e.stylesheets = null),
        e.unsuspend !== null &&
          (e.count++,
          (Yf = new Map()),
          t.forEach(Zf, e),
          (Yf = null),
          Jf.call(e)));
    }
    function Zf(e, t) {
      if (!(t.state.loading & 4)) {
        var n = Yf.get(e);
        if (n) var r = n.get(null);
        else {
          ((n = new Map()), Yf.set(e, n));
          for (
            var i = e.querySelectorAll(
                `link[data-precedence],style[data-precedence]`,
              ),
              a = 0;
            a < i.length;
            a++
          ) {
            var o = i[a];
            (o.nodeName === `LINK` || o.getAttribute(`media`) !== `not all`) &&
              (n.set(o.dataset.precedence, o), (r = o));
          }
          r && n.set(null, r);
        }
        ((i = t.instance),
          (o = i.getAttribute(`data-precedence`)),
          (a = n.get(o) || r),
          a === r && n.set(null, i),
          n.set(o, i),
          this.count++,
          (r = Jf.bind(this)),
          i.addEventListener(`load`, r),
          i.addEventListener(`error`, r),
          a
            ? a.parentNode.insertBefore(i, a.nextSibling)
            : ((e = e.nodeType === 9 ? e.head : e),
              e.insertBefore(i, e.firstChild)),
          (t.state.loading |= 4));
      }
    }
    var Qf = {
      $$typeof: S,
      Provider: null,
      Consumer: null,
      _currentValue: ue,
      _currentValue2: ue,
      _threadCount: 0,
    };
    function $f(e, t, n, r, i, a, o, s, c) {
      ((this.tag = 1),
        (this.containerInfo = e),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = tt(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = tt(0)),
        (this.hiddenUpdates = tt(null)),
        (this.identifierPrefix = r),
        (this.onUncaughtError = i),
        (this.onCaughtError = a),
        (this.onRecoverableError = o),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = c),
        (this.incompleteTransitions = new Map()));
    }
    function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
      return (
        (e = new $f(e, t, n, o, c, l, u, d, s)),
        (t = 1),
        !0 === a && (t |= 24),
        (a = ai(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (t = ia()),
        t.refCount++,
        (e.pooledCache = t),
        t.refCount++,
        (a.memoizedState = { element: r, isDehydrated: n, cache: t }),
        La(a),
        e
      );
    }
    function tp(e) {
      return e ? ((e = ri), e) : ri;
    }
    function np(e, t, n, r, i, a) {
      ((i = tp(i)),
        r.context === null ? (r.context = i) : (r.pendingContext = i),
        (r = za(t)),
        (r.payload = { element: n }),
        (a = a === void 0 ? null : a),
        a !== null && (r.callback = a),
        (n = Ba(e, r, t)),
        n !== null && (hu(n, e, t), Va(n, e, t)));
    }
    function rp(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function ip(e, t) {
      (rp(e, t), (e = e.alternate) && rp(e, t));
    }
    function ap(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = ei(e, 67108864);
        (t !== null && hu(t, e, 67108864), ip(e, 67108864));
      }
    }
    function op(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = pu();
        t = st(t);
        var n = ei(e, t);
        (n !== null && hu(n, e, t), ip(e, t));
      }
    }
    var sp = !0;
    function cp(e, t, n, r) {
      var i = E.T;
      E.T = null;
      var a = D.p;
      try {
        ((D.p = 2), up(e, t, n, r));
      } finally {
        ((D.p = a), (E.T = i));
      }
    }
    function lp(e, t, n, r) {
      var i = E.T;
      E.T = null;
      var a = D.p;
      try {
        ((D.p = 8), up(e, t, n, r));
      } finally {
        ((D.p = a), (E.T = i));
      }
    }
    function up(e, t, n, r) {
      if (sp) {
        var i = dp(r);
        if (i === null) (wd(e, t, r, fp, n), Cp(e, r));
        else if (Tp(i, e, t, n, r)) r.stopPropagation();
        else if ((Cp(e, r), t & 4 && -1 < Sp.indexOf(e))) {
          for (; i !== null; ) {
            var a = St(i);
            if (a !== null)
              switch (a.tag) {
                case 3:
                  if (
                    ((a = a.stateNode), a.current.memoizedState.isDehydrated)
                  ) {
                    var o = Xe(a.pendingLanes);
                    if (o !== 0) {
                      var s = a;
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; o; ) {
                        var c = 1 << (31 - Ue(o));
                        ((s.entanglements[1] |= c), (o &= ~c));
                      }
                      (rd(a), !(K & 6) && ((tu = Me() + 500), id(0, !1)));
                    }
                  }
                  break;
                case 31:
                case 13:
                  ((s = ei(a, 2)), s !== null && hu(s, a, 2), bu(), ip(a, 2));
              }
            if (((a = dp(r)), a === null && wd(e, t, r, fp, n), a === i)) break;
            i = a;
          }
          i !== null && r.stopPropagation();
        } else wd(e, t, r, null, n);
      }
    }
    function dp(e) {
      return ((e = rn(e)), pp(e));
    }
    var fp = null;
    function pp(e) {
      if (((fp = null), (e = xt(e)), e !== null)) {
        var t = l(e);
        if (t === null) e = null;
        else {
          var n = t.tag;
          if (n === 13) {
            if (((e = u(t)), e !== null)) return e;
            e = null;
          } else if (n === 31) {
            if (((e = d(t)), e !== null)) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ((fp = e), null);
    }
    function mp(e) {
      switch (e) {
        case `beforetoggle`:
        case `cancel`:
        case `click`:
        case `close`:
        case `contextmenu`:
        case `copy`:
        case `cut`:
        case `auxclick`:
        case `dblclick`:
        case `dragend`:
        case `dragstart`:
        case `drop`:
        case `focusin`:
        case `focusout`:
        case `input`:
        case `invalid`:
        case `keydown`:
        case `keypress`:
        case `keyup`:
        case `mousedown`:
        case `mouseup`:
        case `paste`:
        case `pause`:
        case `play`:
        case `pointercancel`:
        case `pointerdown`:
        case `pointerup`:
        case `ratechange`:
        case `reset`:
        case `resize`:
        case `seeked`:
        case `submit`:
        case `toggle`:
        case `touchcancel`:
        case `touchend`:
        case `touchstart`:
        case `volumechange`:
        case `change`:
        case `selectionchange`:
        case `textInput`:
        case `compositionstart`:
        case `compositionend`:
        case `compositionupdate`:
        case `beforeblur`:
        case `afterblur`:
        case `beforeinput`:
        case `blur`:
        case `fullscreenchange`:
        case `focus`:
        case `hashchange`:
        case `popstate`:
        case `select`:
        case `selectstart`:
          return 2;
        case `drag`:
        case `dragenter`:
        case `dragexit`:
        case `dragleave`:
        case `dragover`:
        case `mousemove`:
        case `mouseout`:
        case `mouseover`:
        case `pointermove`:
        case `pointerout`:
        case `pointerover`:
        case `scroll`:
        case `touchmove`:
        case `wheel`:
        case `mouseenter`:
        case `mouseleave`:
        case `pointerenter`:
        case `pointerleave`:
          return 8;
        case `message`:
          switch (Ne()) {
            case Pe:
              return 2;
            case Fe:
              return 8;
            case Ie:
            case Le:
              return 32;
            case Re:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var hp = !1,
      gp = null,
      _p = null,
      vp = null,
      yp = new Map(),
      bp = new Map(),
      xp = [],
      Sp =
        `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(
          ` `,
        );
    function Cp(e, t) {
      switch (e) {
        case `focusin`:
        case `focusout`:
          gp = null;
          break;
        case `dragenter`:
        case `dragleave`:
          _p = null;
          break;
        case `mouseover`:
        case `mouseout`:
          vp = null;
          break;
        case `pointerover`:
        case `pointerout`:
          yp.delete(t.pointerId);
          break;
        case `gotpointercapture`:
        case `lostpointercapture`:
          bp.delete(t.pointerId);
      }
    }
    function wp(e, t, n, r, i, a) {
      return e === null || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [i],
          }),
          t !== null && ((t = St(t)), t !== null && ap(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
    }
    function Tp(e, t, n, r, i) {
      switch (t) {
        case `focusin`:
          return ((gp = wp(gp, e, t, n, r, i)), !0);
        case `dragenter`:
          return ((_p = wp(_p, e, t, n, r, i)), !0);
        case `mouseover`:
          return ((vp = wp(vp, e, t, n, r, i)), !0);
        case `pointerover`:
          var a = i.pointerId;
          return (yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0);
        case `gotpointercapture`:
          return (
            (a = i.pointerId),
            bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)),
            !0
          );
      }
      return !1;
    }
    function Ep(e) {
      var t = xt(e.target);
      if (t !== null) {
        var n = l(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = u(n)), t !== null)) {
              ((e.blockedOn = t),
                ut(e.priority, function () {
                  op(n);
                }));
              return;
            }
          } else if (t === 31) {
            if (((t = d(n)), t !== null)) {
              ((e.blockedOn = t),
                ut(e.priority, function () {
                  op(n);
                }));
              return;
            }
          } else if (
            t === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Dp(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = dp(e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ((nn = r), n.target.dispatchEvent(r), (nn = null));
        } else return ((t = St(n)), t !== null && ap(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function Op(e, t, n) {
      Dp(e) && n.delete(t);
    }
    function kp() {
      ((hp = !1),
        gp !== null && Dp(gp) && (gp = null),
        _p !== null && Dp(_p) && (_p = null),
        vp !== null && Dp(vp) && (vp = null),
        yp.forEach(Op),
        bp.forEach(Op));
    }
    function Ap(e, n) {
      e.blockedOn === n &&
        ((e.blockedOn = null),
        hp ||
          ((hp = !0),
          t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
    }
    var jp = null;
    function Mp(e) {
      jp !== e &&
        ((jp = e),
        t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
          jp === e && (jp = null);
          for (var t = 0; t < e.length; t += 3) {
            var n = e[t],
              r = e[t + 1],
              i = e[t + 2];
            if (typeof r != `function`) {
              if (pp(r || n) === null) continue;
              break;
            }
            var a = St(n);
            a !== null &&
              (e.splice(t, 3),
              (t -= 3),
              Ss(
                a,
                { pending: !0, data: i, method: n.method, action: r },
                r,
                i,
              ));
          }
        }));
    }
    function Np(e) {
      function t(t) {
        return Ap(t, e);
      }
      (gp !== null && Ap(gp, e),
        _p !== null && Ap(_p, e),
        vp !== null && Ap(vp, e),
        yp.forEach(t),
        bp.forEach(t));
      for (var n = 0; n < xp.length; n++) {
        var r = xp[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
      for (; 0 < xp.length && ((n = xp[0]), n.blockedOn === null); )
        (Ep(n), n.blockedOn === null && xp.shift());
      if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
        for (r = 0; r < n.length; r += 3) {
          var i = n[r],
            a = n[r + 1],
            o = i[pt] || null;
          if (typeof a == `function`) o || Mp(n);
          else if (o) {
            var s = null;
            if (a && a.hasAttribute(`formAction`)) {
              if (((i = a), (o = a[pt] || null))) s = o.formAction;
              else if (pp(i) !== null) continue;
            } else s = o.action;
            (typeof s == `function`
              ? (n[r + 1] = s)
              : (n.splice(r, 3), (r -= 3)),
              Mp(n));
          }
        }
    }
    function Pp() {
      function e(e) {
        e.canIntercept &&
          e.info === `react-transition` &&
          e.intercept({
            handler: function () {
              return new Promise(function (e) {
                return (i = e);
              });
            },
            focusReset: `manual`,
            scroll: `manual`,
          });
      }
      function t() {
        (i !== null && (i(), (i = null)), r || setTimeout(n, 20));
      }
      function n() {
        if (!r && !navigation.transition) {
          var e = navigation.currentEntry;
          e &&
            e.url != null &&
            navigation.navigate(e.url, {
              state: e.getState(),
              info: `react-transition`,
              history: `replace`,
            });
        }
      }
      if (typeof navigation == `object`) {
        var r = !1,
          i = null;
        return (
          navigation.addEventListener(`navigate`, e),
          navigation.addEventListener(`navigatesuccess`, t),
          navigation.addEventListener(`navigateerror`, t),
          setTimeout(n, 100),
          function () {
            ((r = !0),
              navigation.removeEventListener(`navigate`, e),
              navigation.removeEventListener(`navigatesuccess`, t),
              navigation.removeEventListener(`navigateerror`, t),
              i !== null && (i(), (i = null)));
          }
        );
      }
    }
    function Fp(e) {
      this._internalRoot = e;
    }
    ((Ip.prototype.render = Fp.prototype.render =
      function (e) {
        var t = this._internalRoot;
        if (t === null) throw Error(s(409));
        var n = t.current;
        np(n, pu(), e, t, null, null);
      }),
      (Ip.prototype.unmount = Fp.prototype.unmount =
        function () {
          var e = this._internalRoot;
          if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            (np(e.current, 2, null, e, null, null), bu(), (t[mt] = null));
          }
        }));
    function Ip(e) {
      this._internalRoot = e;
    }
    Ip.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = lt();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
        (xp.splice(n, 0, e), n === 0 && Ep(e));
      }
    };
    var Lp = r.version;
    if (Lp !== `19.2.8`) throw Error(s(527, Lp, `19.2.8`));
    D.findDOMNode = function (e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == `function`
          ? Error(s(188))
          : ((e = Object.keys(e).join(`,`)), Error(s(268, e)));
      return (
        (e = p(t)),
        (e = e === null ? null : m(e)),
        (e = e === null ? null : e.stateNode),
        e
      );
    };
    var Rp = {
      bundleType: 0,
      version: `19.2.8`,
      rendererPackageName: `react-dom`,
      currentDispatcherRef: E,
      reconcilerVersion: `19.2.8`,
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
      var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!zp.isDisabled && zp.supportsFiber)
        try {
          ((Ve = zp.inject(Rp)), (M = zp));
        } catch {}
    }
    e.createRoot = function (e, t) {
      if (!c(e)) throw Error(s(299));
      var n = !1,
        r = ``,
        i = Gs,
        a = Ks,
        o = qs;
      return (
        t != null &&
          (!0 === t.unstable_strictMode && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (a = t.onCaughtError),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = ep(e, 1, !1, null, null, n, r, null, i, a, o, Pp)),
        (e[mt] = t.current),
        Sd(e),
        new Fp(t)
      );
    };
  }),
  c = e((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = s()));
  }),
  l = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  u = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  d = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) =>
      n ? n.toUpperCase() : t.toLowerCase(),
    ),
  f = (e) => {
    let t = d(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  p = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  m = (e) => {
    for (let t in e)
      if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
    return !1;
  },
  h = n(),
  g = (0, h.createContext)({}),
  _ = () => (0, h.useContext)(g),
  v = (0, h.forwardRef)(
    (
      {
        color: e,
        size: t,
        strokeWidth: n,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c,
    ) => {
      let {
          size: u = 24,
          strokeWidth: d = 2,
          absoluteStrokeWidth: f = !1,
          color: g = `currentColor`,
          className: v = ``,
        } = _() ?? {},
        y = (r ?? f) ? (Number(n ?? d) * 24) / Number(t ?? u) : (n ?? d);
      return (0, h.createElement)(
        `svg`,
        {
          ref: c,
          ...p,
          width: t ?? u ?? p.width,
          height: t ?? u ?? p.height,
          stroke: e ?? g,
          strokeWidth: y,
          className: l(`lucide`, v, i),
          ...(!a && !m(s) && { "aria-hidden": `true` }),
          ...s,
        },
        [
          ...o.map(([e, t]) => (0, h.createElement)(e, t)),
          ...(Array.isArray(a) ? a : [a]),
        ],
      );
    },
  ),
  y = (e, t) => {
    let n = (0, h.forwardRef)(({ className: n, ...r }, i) =>
      (0, h.createElement)(v, {
        ref: i,
        iconNode: t,
        className: l(`lucide-${u(f(e))}`, `lucide-${e}`, n),
        ...r,
      }),
    );
    return ((n.displayName = f(e)), n);
  },
  b = y(`accessibility`, [
    [`circle`, { cx: `16`, cy: `4`, r: `1`, key: `1grugj` }],
    [`path`, { d: `m18 19 1-7-6 1`, key: `r0i19z` }],
    [`path`, { d: `m5 8 3-3 5.5 3-2.36 3.5`, key: `9ptxx2` }],
    [`path`, { d: `M4.24 14.5a5 5 0 0 0 6.88 6`, key: `10kmtu` }],
    [`path`, { d: `M13.76 17.5a5 5 0 0 0-6.88-6`, key: `2qq6rc` }],
  ]),
  x = y(`archive`, [
    [
      `rect`,
      { width: `20`, height: `5`, x: `2`, y: `3`, rx: `1`, key: `1wp1u1` },
    ],
    [`path`, { d: `M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8`, key: `1s80jp` }],
    [`path`, { d: `M10 12h4`, key: `a56b0p` }],
  ]),
  ee = y(`arrow-down`, [
    [`path`, { d: `M12 5v14`, key: `s699le` }],
    [`path`, { d: `m19 12-7 7-7-7`, key: `1idqje` }],
  ]),
  S = y(`arrow-left`, [
    [`path`, { d: `m12 19-7-7 7-7`, key: `1l729n` }],
    [`path`, { d: `M19 12H5`, key: `x3x0zl` }],
  ]),
  C = y(`arrow-right`, [
    [`path`, { d: `M5 12h14`, key: `1ays0h` }],
    [`path`, { d: `m12 5 7 7-7 7`, key: `xquz4c` }],
  ]),
  te = y(`arrow-up-down`, [
    [`path`, { d: `m21 16-4 4-4-4`, key: `f6ql7i` }],
    [`path`, { d: `M17 20V4`, key: `1ejh1v` }],
    [`path`, { d: `m3 8 4-4 4 4`, key: `11wl7u` }],
    [`path`, { d: `M7 4v16`, key: `1glfcx` }],
  ]),
  ne = y(`arrow-up-right`, [
    [`path`, { d: `M7 7h10v10`, key: `1tivn9` }],
    [`path`, { d: `M7 17 17 7`, key: `1vkiza` }],
  ]),
  re = y(`arrow-up`, [
    [`path`, { d: `m5 12 7-7 7 7`, key: `hav0vg` }],
    [`path`, { d: `M12 19V5`, key: `x0mq9r` }],
  ]),
  w = y(`bell`, [
    [`path`, { d: `M10.268 21a2 2 0 0 0 3.464 0`, key: `vwvbt9` }],
    [
      `path`,
      {
        d: `M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,
        key: `11g9vi`,
      },
    ],
  ]),
  ie = y(`book-open`, [
    [`path`, { d: `M12 5v16`, key: `1f6ucr` }],
    [
      `path`,
      {
        d: `M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z`,
        key: `1fyvmf`,
      },
    ],
  ]),
  ae = y(`box`, [
    [
      `path`,
      {
        d: `M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z`,
        key: `hh9hay`,
      },
    ],
    [`path`, { d: `m3.3 7 8.7 5 8.7-5`, key: `g66t2b` }],
    [`path`, { d: `M12 22V12`, key: `d0xqtd` }],
  ]),
  oe = y(`calendar-days`, [
    [`path`, { d: `M8 2v4`, key: `1cmpym` }],
    [`path`, { d: `M16 2v4`, key: `4m81vk` }],
    [
      `rect`,
      { width: `18`, height: `18`, x: `3`, y: `4`, rx: `2`, key: `1hopcy` },
    ],
    [`path`, { d: `M3 10h18`, key: `8toen8` }],
    [`path`, { d: `M8 14h.01`, key: `6423bh` }],
    [`path`, { d: `M12 14h.01`, key: `1etili` }],
    [`path`, { d: `M16 14h.01`, key: `1gbofw` }],
    [`path`, { d: `M8 18h.01`, key: `lrp35t` }],
    [`path`, { d: `M12 18h.01`, key: `mhygvu` }],
    [`path`, { d: `M16 18h.01`, key: `kzsmim` }],
  ]),
  T = y(`check`, [[`path`, { d: `M20 6 9 17l-5-5`, key: `1gmf2c` }]]),
  se = y(`chevron-down`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  ce = y(`chevron-left`, [[`path`, { d: `m15 18-6-6 6-6`, key: `1wnfg3` }]]),
  le = y(`chevron-right`, [[`path`, { d: `m9 18 6-6-6-6`, key: `mthhwq` }]]),
  E = y(`circle-alert`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`line`, { x1: `12`, x2: `12`, y1: `8`, y2: `12`, key: `1pkeuh` }],
    [`line`, { x1: `12`, x2: `12.01`, y1: `16`, y2: `16`, key: `4dfq90` }],
  ]),
  D = y(`circle-check`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `m9 12 2 2 4-4`, key: `dzmm74` }],
  ]),
  ue = y(`circle-question-mark`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`, key: `1u773s` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  de = y(`clock-3`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 6v6h4`, key: `135r8i` }],
  ]),
  fe = y(`cloud-upload`, [
    [`path`, { d: `M12 13v8`, key: `1l5pq0` }],
    [
      `path`,
      {
        d: `M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242`,
        key: `1pljnt`,
      },
    ],
    [`path`, { d: `m8 17 4-4 4 4`, key: `1quai1` }],
  ]),
  O = y(`component`, [
    [
      `path`,
      {
        d: `M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z`,
        key: `1uwlt4`,
      },
    ],
    [
      `path`,
      {
        d: `M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z`,
        key: `10291m`,
      },
    ],
    [
      `path`,
      {
        d: `M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z`,
        key: `1tqoq1`,
      },
    ],
    [
      `path`,
      {
        d: `M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z`,
        key: `1x6lto`,
      },
    ],
  ]),
  k = y(`copy`, [
    [
      `rect`,
      {
        width: `14`,
        height: `14`,
        x: `8`,
        y: `8`,
        rx: `2`,
        ry: `2`,
        key: `17jyea`,
      },
    ],
    [
      `path`,
      {
        d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,
        key: `zix9uf`,
      },
    ],
  ]),
  A = y(`credit-card`, [
    [
      `rect`,
      { width: `20`, height: `14`, x: `2`, y: `5`, rx: `2`, key: `ynyp8z` },
    ],
    [`line`, { x1: `2`, x2: `22`, y1: `10`, y2: `10`, key: `1b3vmo` }],
  ]),
  pe = y(`download`, [
    [`path`, { d: `M12 15V3`, key: `m9g1x1` }],
    [`path`, { d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`, key: `ih7n3h` }],
    [`path`, { d: `m7 10 5 5 5-5`, key: `brsn70` }],
  ]),
  j = y(`ellipsis`, [
    [`circle`, { cx: `12`, cy: `12`, r: `1`, key: `41hilf` }],
    [`circle`, { cx: `19`, cy: `12`, r: `1`, key: `1wjl8i` }],
    [`circle`, { cx: `5`, cy: `12`, r: `1`, key: `1pcz8c` }],
  ]),
  me = y(`external-link`, [
    [`path`, { d: `M15 3h6v6`, key: `1q9fwt` }],
    [`path`, { d: `M10 14 21 3`, key: `gplh6r` }],
    [
      `path`,
      {
        d: `M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,
        key: `a6xqqp`,
      },
    ],
  ]),
  he = y(`file-badge`, [
    [
      `path`,
      {
        d: `M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3`,
        key: `cvl1xm`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [
      `path`,
      {
        d: `m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88`,
        key: `1ff7gj`,
      },
    ],
    [`circle`, { cx: `6`, cy: `14`, r: `3`, key: `a1xfv6` }],
  ]),
  ge = y(`file-check-corner`, [
    [
      `path`,
      {
        d: `M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6`,
        key: `g5mvt7`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `m14 20 2 2 4-4`, key: `15kota` }],
  ]),
  _e = y(`file-text`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `M10 9H8`, key: `b1mrlr` }],
    [`path`, { d: `M16 13H8`, key: `t4e002` }],
    [`path`, { d: `M16 17H8`, key: `z1uh3a` }],
  ]),
  ve = y(`file-up`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `M12 12v6`, key: `3ahymv` }],
    [`path`, { d: `m15 15-3-3-3 3`, key: `15xj92` }],
  ]),
  ye = y(`file`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
  ]),
  be = y(`folder-open`, [
    [
      `path`,
      {
        d: `m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2`,
        key: `usdka0`,
      },
    ],
  ]),
  xe = y(`graduation-cap`, [
    [
      `path`,
      {
        d: `M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z`,
        key: `j76jl0`,
      },
    ],
    [`path`, { d: `M22 10v6`, key: `1lu8f3` }],
    [`path`, { d: `M6 12.5V16a6 3 0 0 0 12 0v-3.5`, key: `1r8lef` }],
  ]),
  Se = y(`grid-2x2`, [
    [`path`, { d: `M12 3v18`, key: `108xh3` }],
    [`path`, { d: `M3 12h18`, key: `1i2n21` }],
    [
      `rect`,
      { x: `3`, y: `3`, width: `18`, height: `18`, rx: `2`, key: `h1oib` },
    ],
  ]),
  Ce = y(`house`, [
    [
      `path`,
      { d: `M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`, key: `5wwlr5` },
    ],
    [
      `path`,
      {
        d: `M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,
        key: `r6nss1`,
      },
    ],
  ]),
  we = y(`info`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 16v-4`, key: `1dtifu` }],
    [`path`, { d: `M12 8h.01`, key: `e9boi3` }],
  ]),
  Te = y(`loader-circle`, [
    [`path`, { d: `M21 12a9 9 0 1 1-6.219-8.56`, key: `13zald` }],
  ]),
  Ee = y(`lock-keyhole`, [
    [`circle`, { cx: `12`, cy: `16`, r: `1`, key: `1au0dj` }],
    [
      `rect`,
      { x: `3`, y: `10`, width: `18`, height: `12`, rx: `2`, key: `6s8ecr` },
    ],
    [`path`, { d: `M7 10V7a5 5 0 0 1 10 0v3`, key: `1pqi11` }],
  ]),
  De = y(`log-out`, [
    [`path`, { d: `m16 17 5-5-5-5`, key: `1bji2h` }],
    [`path`, { d: `M21 12H9`, key: `dn1m92` }],
    [`path`, { d: `M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`, key: `1uf3rs` }],
  ]),
  Oe = y(`map-pin`, [
    [
      `path`,
      {
        d: `M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,
        key: `1r0f0z`,
      },
    ],
    [`circle`, { cx: `12`, cy: `10`, r: `3`, key: `ilqhr7` }],
  ]),
  ke = y(`menu`, [
    [`path`, { d: `M4 5h16`, key: `1tepv9` }],
    [`path`, { d: `M4 12h16`, key: `1lakjw` }],
    [`path`, { d: `M4 19h16`, key: `1djgab` }],
  ]),
  Ae = y(`moon`, [
    [
      `path`,
      {
        d: `M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,
        key: `kfwtm`,
      },
    ],
  ]),
  je = y(`palette`, [
    [
      `path`,
      {
        d: `M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z`,
        key: `e79jfc`,
      },
    ],
    [
      `circle`,
      { cx: `13.5`, cy: `6.5`, r: `.5`, fill: `currentColor`, key: `1okk4w` },
    ],
    [
      `circle`,
      { cx: `17.5`, cy: `10.5`, r: `.5`, fill: `currentColor`, key: `f64h9f` },
    ],
    [
      `circle`,
      { cx: `6.5`, cy: `12.5`, r: `.5`, fill: `currentColor`, key: `qy21gx` },
    ],
    [
      `circle`,
      { cx: `8.5`, cy: `7.5`, r: `.5`, fill: `currentColor`, key: `fotxhn` },
    ],
  ]),
  Me = y(`plus`, [
    [`path`, { d: `M5 12h14`, key: `1ays0h` }],
    [`path`, { d: `M12 5v14`, key: `s699le` }],
  ]),
  Ne = y(`school`, [
    [`path`, { d: `M14 21v-3a2 2 0 0 0-4 0v3`, key: `1rgiei` }],
    [`path`, { d: `M18 4.933V21`, key: `tjwmp4` }],
    [`path`, { d: `m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6`, key: `zywc2d` }],
    [
      `path`,
      {
        d: `m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11`,
        key: `1d4ql0`,
      },
    ],
    [`path`, { d: `M6 4.933V21`, key: `1ufz1j` }],
    [`circle`, { cx: `12`, cy: `9`, r: `2`, key: `1092wv` }],
  ]),
  Pe = y(`search`, [
    [`path`, { d: `m21 21-4.34-4.34`, key: `14j7rj` }],
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
  ]),
  Fe = y(`send`, [
    [
      `path`,
      {
        d: `M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,
        key: `1ffxy3`,
      },
    ],
    [`path`, { d: `m21.854 2.147-10.94 10.939`, key: `12cjpa` }],
  ]),
  Ie = y(`shield-check`, [
    [
      `path`,
      {
        d: `M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,
        key: `oel41y`,
      },
    ],
    [`path`, { d: `m9 12 2 2 4-4`, key: `dzmm74` }],
  ]),
  Le = y(`smartphone`, [
    [
      `rect`,
      {
        width: `14`,
        height: `20`,
        x: `5`,
        y: `2`,
        rx: `2`,
        ry: `2`,
        key: `1yt0o3`,
      },
    ],
    [`path`, { d: `M12 18h.01`, key: `mhygvu` }],
  ]),
  Re = y(`sparkles`, [
    [
      `path`,
      {
        d: `M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,
        key: `1s2grr`,
      },
    ],
    [`path`, { d: `M20 2v4`, key: `1rf3ol` }],
    [`path`, { d: `M22 4h-4`, key: `gwowj6` }],
    [`circle`, { cx: `4`, cy: `20`, r: `2`, key: `6kqj1y` }],
  ]),
  ze = y(`sun`, [
    [`circle`, { cx: `12`, cy: `12`, r: `4`, key: `4exip2` }],
    [`path`, { d: `M12 2v2`, key: `tus03m` }],
    [`path`, { d: `M12 20v2`, key: `1lh1kg` }],
    [`path`, { d: `m4.93 4.93 1.41 1.41`, key: `149t6j` }],
    [`path`, { d: `m17.66 17.66 1.41 1.41`, key: `ptbguv` }],
    [`path`, { d: `M2 12h2`, key: `1t8f8n` }],
    [`path`, { d: `M20 12h2`, key: `1q8mjw` }],
    [`path`, { d: `m6.34 17.66-1.41 1.41`, key: `1m8zz5` }],
    [`path`, { d: `m19.07 4.93-1.41 1.41`, key: `1shlcs` }],
  ]),
  Be = y(`triangle-alert`, [
    [
      `path`,
      {
        d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
        key: `wmoenq`,
      },
    ],
    [`path`, { d: `M12 9v4`, key: `juzpu7` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  Ve = y(`user-round`, [
    [`circle`, { cx: `12`, cy: `8`, r: `5`, key: `1hypcn` }],
    [`path`, { d: `M20 21a8 8 0 0 0-16 0`, key: `rfgkzh` }],
  ]),
  M = y(`x`, [
    [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
    [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
  ]),
  He = c();
function Ue(e) {
  var t,
    n,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++)
        e[t] && (n = Ue(e[t])) && (r && (r += ` `), (r += n));
    } else for (n in e) e[n] && (r && (r += ` `), (r += n));
  return r;
}
function We() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = Ue(e)) && (r && (r += ` `), (r += t));
  return r;
}
var Ge = (e, t) => {
    let n = Array(e.length + t.length);
    for (let t = 0; t < e.length; t++) n[t] = e[t];
    for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
    return n;
  },
  Ke = (e, t) => ({ classGroupId: e, validator: t }),
  qe = (e = new Map(), t = null, n) => ({
    nextPart: e,
    validators: t,
    classGroupId: n,
  }),
  Je = `-`,
  Ye = [],
  Xe = `arbitrary..`,
  Ze = (e) => {
    let t = et(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (e) => {
        if (e.startsWith(`[`) && e.endsWith(`]`)) return $e(e);
        let n = e.split(Je);
        return Qe(n, +(n[0] === `` && n.length > 1), t);
      },
      getConflictingClassGroupIds: (e, t) => {
        if (t) {
          let t = r[e],
            i = n[e];
          return t ? (i ? Ge(i, t) : t) : i || Ye;
        }
        return n[e] || Ye;
      },
    };
  },
  Qe = (e, t, n) => {
    if (e.length - t === 0) return n.classGroupId;
    let r = e[t],
      i = n.nextPart.get(r);
    if (i) {
      let n = Qe(e, t + 1, i);
      if (n) return n;
    }
    let a = n.validators;
    if (a === null) return;
    let o = t === 0 ? e.join(Je) : e.slice(t).join(Je),
      s = a.length;
    for (let e = 0; e < s; e++) {
      let t = a[e];
      if (t.validator(o)) return t.classGroupId;
    }
  },
  $e = (e) =>
    e.slice(1, -1).indexOf(`:`) === -1
      ? void 0
      : (() => {
          let t = e.slice(1, -1),
            n = t.indexOf(`:`),
            r = t.slice(0, n);
          return r ? Xe + r : void 0;
        })(),
  et = (e) => {
    let { theme: t, classGroups: n } = e;
    return tt(n, t);
  },
  tt = (e, t) => {
    let n = qe();
    for (let r in e) {
      let i = e[r];
      nt(i, n, r, t);
    }
    return n;
  },
  nt = (e, t, n, r) => {
    let i = e.length;
    for (let a = 0; a < i; a++) {
      let i = e[a];
      rt(i, t, n, r);
    }
  },
  rt = (e, t, n, r) => {
    if (typeof e == `string`) {
      it(e, t, n);
      return;
    }
    if (typeof e == `function`) {
      at(e, t, n, r);
      return;
    }
    ot(e, t, n, r);
  },
  it = (e, t, n) => {
    let r = e === `` ? t : st(t, e);
    r.classGroupId = n;
  },
  at = (e, t, n, r) => {
    if (ct(e)) {
      nt(e(r), t, n, r);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(Ke(n, e)));
  },
  ot = (e, t, n, r) => {
    let i = Object.entries(e),
      a = i.length;
    for (let e = 0; e < a; e++) {
      let [a, o] = i[e];
      nt(o, st(t, a), n, r);
    }
  },
  st = (e, t) => {
    let n = e,
      r = t.split(Je),
      i = r.length;
    for (let e = 0; e < i; e++) {
      let t = r[e],
        i = n.nextPart.get(t);
      (i || ((i = qe()), n.nextPart.set(t, i)), (n = i));
    }
    return n;
  },
  ct = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
  lt = (e) => {
    if (e < 1) return { get: () => void 0, set: () => {} };
    let t = 0,
      n = Object.create(null),
      r = Object.create(null),
      i = (i, a) => {
        ((n[i] = a),
          t++,
          t > e && ((t = 0), (r = n), (n = Object.create(null))));
      };
    return {
      get(e) {
        let t = n[e];
        if (t !== void 0) return t;
        if ((t = r[e]) !== void 0) return (i(e, t), t);
      },
      set(e, t) {
        e in n ? (n[e] = t) : i(e, t);
      },
    };
  },
  ut = `!`,
  dt = `:`,
  ft = [],
  pt = (e, t, n, r, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: r,
    isExternal: i,
  }),
  mt = (e) => {
    let { prefix: t, experimentalParseClassName: n } = e,
      r = (e) => {
        let t = [],
          n = 0,
          r = 0,
          i = 0,
          a,
          o = e.length;
        for (let s = 0; s < o; s++) {
          let o = e[s];
          if (n === 0 && r === 0) {
            if (o === dt) {
              (t.push(e.slice(i, s)), (i = s + 1));
              continue;
            }
            if (o === `/`) {
              a = s;
              continue;
            }
          }
          o === `[`
            ? n++
            : o === `]`
              ? n--
              : o === `(`
                ? r++
                : o === `)` && r--;
        }
        let s = t.length === 0 ? e : e.slice(i),
          c = s,
          l = !1;
        s.endsWith(ut)
          ? ((c = s.slice(0, -1)), (l = !0))
          : s.startsWith(ut) && ((c = s.slice(1)), (l = !0));
        let u = a && a > i ? a - i : void 0;
        return pt(t, l, c, u);
      };
    if (t) {
      let e = t + dt,
        n = r;
      r = (t) =>
        t.startsWith(e) ? n(t.slice(e.length)) : pt(ft, !1, t, void 0, !0);
    }
    if (n) {
      let e = r;
      r = (t) => n({ className: t, parseClassName: e });
    }
    return r;
  },
  ht = (e) => {
    let t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((e, n) => {
        t.set(e, 1e6 + n);
      }),
      (e) => {
        let n = [],
          r = [];
        for (let i = 0; i < e.length; i++) {
          let a = e[i],
            o = a[0] === `[`,
            s = t.has(a);
          o || s
            ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])), n.push(a))
            : r.push(a);
        }
        return (r.length > 0 && (r.sort(), n.push(...r)), n);
      }
    );
  },
  gt = (e) => ({
    cache: lt(e.cacheSize),
    parseClassName: mt(e),
    sortModifiers: ht(e),
    postfixLookupClassGroupIds: _t(e),
    ...Ze(e),
  }),
  _t = (e) => {
    let t = Object.create(null),
      n = e.postfixLookupClassGroups;
    if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
    return t;
  },
  vt = /\s+/,
  yt = (e, t) => {
    let {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
        sortModifiers: a,
        postfixLookupClassGroupIds: o,
      } = t,
      s = [],
      c = e.trim().split(vt),
      l = ``;
    for (let e = c.length - 1; e >= 0; --e) {
      let t = c[e],
        {
          isExternal: u,
          modifiers: d,
          hasImportantModifier: f,
          baseClassName: p,
          maybePostfixModifierPosition: m,
        } = n(t);
      if (u) {
        l = t + (l.length > 0 ? ` ` + l : l);
        continue;
      }
      let h = !!m,
        g;
      if (h) {
        g = r(p.substring(0, m));
        let e = g && o[g] ? r(p) : void 0;
        e && e !== g && ((g = e), (h = !1));
      } else g = r(p);
      if (!g) {
        if (!h) {
          l = t + (l.length > 0 ? ` ` + l : l);
          continue;
        }
        if (((g = r(p)), !g)) {
          l = t + (l.length > 0 ? ` ` + l : l);
          continue;
        }
        h = !1;
      }
      let _ = d.length === 0 ? `` : d.length === 1 ? d[0] : a(d).join(`:`),
        v = f ? _ + ut : _,
        y = v + g;
      if (s.indexOf(y) > -1) continue;
      s.push(y);
      let b = i(g, h);
      for (let e = 0; e < b.length; ++e) {
        let t = b[e];
        s.push(v + t);
      }
      l = t + (l.length > 0 ? ` ` + l : l);
    }
    return l;
  },
  bt = (...e) => {
    let t = 0,
      n,
      r,
      i = ``;
    for (; t < e.length; )
      (n = e[t++]) && (r = xt(n)) && (i && (i += ` `), (i += r));
    return i;
  },
  xt = (e) => {
    if (typeof e == `string`) return e;
    let t,
      n = ``;
    for (let r = 0; r < e.length; r++)
      e[r] && (t = xt(e[r])) && (n && (n += ` `), (n += t));
    return n;
  },
  St = (e, ...t) => {
    let n,
      r,
      i,
      a,
      o = (o) => (
        (n = gt(t.reduce((e, t) => t(e), e()))),
        (r = n.cache.get),
        (i = n.cache.set),
        (a = s),
        s(o)
      ),
      s = (e) => {
        let t = r(e);
        if (t) return t;
        let a = yt(e, n);
        return (i(e, a), a);
      };
    return ((a = o), (...e) => a(bt(...e)));
  },
  Ct = [],
  N = (e) => {
    let t = (t) => t[e] || Ct;
    return ((t.isThemeGetter = !0), t);
  },
  wt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Tt = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Et = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Dt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Ot =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  kt = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  At = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  jt =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Mt = (e) => Et.test(e),
  P = (e) => !!e && !Number.isNaN(Number(e)),
  Nt = (e) => !!e && Number.isInteger(Number(e)),
  Pt = (e) => e.endsWith(`%`) && P(e.slice(0, -1)),
  Ft = (e) => Dt.test(e),
  It = () => !0,
  Lt = (e) => Ot.test(e) && !kt.test(e),
  Rt = () => !1,
  zt = (e) => At.test(e),
  Bt = (e) => jt.test(e),
  Vt = (e) => !F(e) && !I(e),
  Ht = (e) =>
    e.startsWith(`@container`) &&
    ((e[10] === `/` && e[11] !== void 0) ||
      (e[11] === `s` && e[16] !== void 0 && e.startsWith(`-size/`, 10)) ||
      (e[11] === `n` && e[18] !== void 0 && e.startsWith(`-normal/`, 10))),
  Ut = (e) => an(e, ln, Rt),
  F = (e) => wt.test(e),
  Wt = (e) => an(e, un, Lt),
  Gt = (e) => an(e, dn, P),
  Kt = (e) => an(e, pn, It),
  qt = (e) => an(e, fn, Rt),
  Jt = (e) => an(e, sn, Rt),
  Yt = (e) => an(e, cn, Bt),
  Xt = (e) => an(e, mn, zt),
  I = (e) => Tt.test(e),
  Zt = (e) => on(e, un),
  Qt = (e) => on(e, fn),
  $t = (e) => on(e, sn),
  en = (e) => on(e, ln),
  tn = (e) => on(e, cn),
  nn = (e) => on(e, mn, !0),
  rn = (e) => on(e, pn, !0),
  an = (e, t, n) => {
    let r = wt.exec(e);
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
  },
  on = (e, t, n = !1) => {
    let r = Tt.exec(e);
    return r ? (r[1] ? t(r[1]) : n) : !1;
  },
  sn = (e) => e === `position` || e === `percentage`,
  cn = (e) => e === `image` || e === `url`,
  ln = (e) => e === `length` || e === `size` || e === `bg-size`,
  un = (e) => e === `length`,
  dn = (e) => e === `number`,
  fn = (e) => e === `family-name`,
  pn = (e) => e === `number` || e === `weight`,
  mn = (e) => e === `shadow`,
  hn = St(() => {
    let e = N(`color`),
      t = N(`font`),
      n = N(`text`),
      r = N(`font-weight`),
      i = N(`tracking`),
      a = N(`leading`),
      o = N(`breakpoint`),
      s = N(`container`),
      c = N(`spacing`),
      l = N(`radius`),
      u = N(`shadow`),
      d = N(`inset-shadow`),
      f = N(`text-shadow`),
      p = N(`drop-shadow`),
      m = N(`blur`),
      h = N(`perspective`),
      g = N(`aspect`),
      _ = N(`ease`),
      v = N(`animate`),
      y = () => [
        `auto`,
        `avoid`,
        `all`,
        `avoid-page`,
        `page`,
        `left`,
        `right`,
        `column`,
      ],
      b = () => [
        `center`,
        `top`,
        `bottom`,
        `left`,
        `right`,
        `top-left`,
        `left-top`,
        `top-right`,
        `right-top`,
        `bottom-right`,
        `right-bottom`,
        `bottom-left`,
        `left-bottom`,
      ],
      x = () => [...b(), I, F],
      ee = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
      S = () => [`auto`, `contain`, `none`],
      C = () => [I, F, c],
      te = () => [Mt, `full`, `auto`, ...C()],
      ne = () => [Nt, `none`, `subgrid`, I, F],
      re = () => [`auto`, { span: [`full`, Nt, I, F] }, Nt, I, F],
      w = () => [Nt, `auto`, I, F],
      ie = () => [`auto`, `min`, `max`, `fr`, I, F],
      ae = () => [
        `start`,
        `end`,
        `center`,
        `between`,
        `around`,
        `evenly`,
        `stretch`,
        `baseline`,
        `center-safe`,
        `end-safe`,
      ],
      oe = () => [
        `start`,
        `end`,
        `center`,
        `stretch`,
        `center-safe`,
        `end-safe`,
      ],
      T = () => [`auto`, ...C()],
      se = () => [
        Mt,
        `auto`,
        `full`,
        `dvw`,
        `dvh`,
        `lvw`,
        `lvh`,
        `svw`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...C(),
      ],
      ce = () => [
        Mt,
        `screen`,
        `full`,
        `dvw`,
        `lvw`,
        `svw`,
        `min`,
        `max`,
        `fit`,
        ...C(),
      ],
      le = () => [
        Mt,
        `screen`,
        `full`,
        `lh`,
        `dvh`,
        `lvh`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...C(),
      ],
      E = () => [e, I, F],
      D = () => [...b(), $t, Jt, { position: [I, F] }],
      ue = () => [`no-repeat`, { repeat: [``, `x`, `y`, `space`, `round`] }],
      de = () => [`auto`, `cover`, `contain`, en, Ut, { size: [I, F] }],
      fe = () => [Pt, Zt, Wt],
      O = () => [``, `none`, `full`, l, I, F],
      k = () => [``, P, Zt, Wt],
      A = () => [`solid`, `dashed`, `dotted`, `double`],
      pe = () => [
        `normal`,
        `multiply`,
        `screen`,
        `overlay`,
        `darken`,
        `lighten`,
        `color-dodge`,
        `color-burn`,
        `hard-light`,
        `soft-light`,
        `difference`,
        `exclusion`,
        `hue`,
        `saturation`,
        `color`,
        `luminosity`,
      ],
      j = () => [P, Pt, $t, Jt],
      me = () => [``, `none`, m, I, F],
      he = () => [`none`, P, I, F],
      ge = () => [`none`, P, I, F],
      _e = () => [P, I, F],
      ve = () => [Mt, `full`, ...C()];
    return {
      cacheSize: 500,
      theme: {
        animate: [`spin`, `ping`, `pulse`, `bounce`],
        aspect: [`video`],
        blur: [Ft],
        breakpoint: [Ft],
        color: [It],
        container: [Ft],
        "drop-shadow": [Ft],
        ease: [`in`, `out`, `in-out`],
        font: [Vt],
        "font-weight": [
          `thin`,
          `extralight`,
          `light`,
          `normal`,
          `medium`,
          `semibold`,
          `bold`,
          `extrabold`,
          `black`,
        ],
        "inset-shadow": [Ft],
        leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
        perspective: [
          `dramatic`,
          `near`,
          `normal`,
          `midrange`,
          `distant`,
          `none`,
        ],
        radius: [Ft],
        shadow: [Ft],
        spacing: [`px`, P],
        text: [Ft],
        "text-shadow": [Ft],
        tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`],
      },
      classGroups: {
        aspect: [{ aspect: [`auto`, `square`, Mt, F, I, g] }],
        container: [`container`],
        "container-type": [{ "@container": [``, `normal`, `size`, I, F] }],
        "container-named": [Ht],
        columns: [{ columns: [P, F, I, s] }],
        "break-after": [{ "break-after": y() }],
        "break-before": [{ "break-before": y() }],
        "break-inside": [
          { "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`] },
        ],
        "box-decoration": [{ "box-decoration": [`slice`, `clone`] }],
        box: [{ box: [`border`, `content`] }],
        display: [
          `block`,
          `inline-block`,
          `inline`,
          `flex`,
          `inline-flex`,
          `table`,
          `inline-table`,
          `table-caption`,
          `table-cell`,
          `table-column`,
          `table-column-group`,
          `table-footer-group`,
          `table-header-group`,
          `table-row-group`,
          `table-row`,
          `flow-root`,
          `grid`,
          `inline-grid`,
          `contents`,
          `list-item`,
          `hidden`,
        ],
        sr: [`sr-only`, `not-sr-only`],
        float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
        clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
        isolation: [`isolate`, `isolation-auto`],
        "object-fit": [
          { object: [`contain`, `cover`, `fill`, `none`, `scale-down`] },
        ],
        "object-position": [{ object: x() }],
        overflow: [{ overflow: ee() }],
        "overflow-x": [{ "overflow-x": ee() }],
        "overflow-y": [{ "overflow-y": ee() }],
        overscroll: [{ overscroll: S() }],
        "overscroll-x": [{ "overscroll-x": S() }],
        "overscroll-y": [{ "overscroll-y": S() }],
        position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
        inset: [{ inset: te() }],
        "inset-x": [{ "inset-x": te() }],
        "inset-y": [{ "inset-y": te() }],
        start: [{ "inset-s": te(), start: te() }],
        end: [{ "inset-e": te(), end: te() }],
        "inset-bs": [{ "inset-bs": te() }],
        "inset-be": [{ "inset-be": te() }],
        top: [{ top: te() }],
        right: [{ right: te() }],
        bottom: [{ bottom: te() }],
        left: [{ left: te() }],
        visibility: [`visible`, `invisible`, `collapse`],
        z: [{ z: [Nt, `auto`, I, F] }],
        basis: [{ basis: [Mt, `full`, `auto`, s, ...C()] }],
        "flex-direction": [
          { flex: [`row`, `row-reverse`, `col`, `col-reverse`] },
        ],
        "flex-wrap": [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
        flex: [{ flex: [P, Mt, `auto`, `initial`, `none`, F] }],
        grow: [{ grow: [``, P, I, F] }],
        shrink: [{ shrink: [``, P, I, F] }],
        order: [{ order: [Nt, `first`, `last`, `none`, I, F] }],
        "grid-cols": [{ "grid-cols": ne() }],
        "col-start-end": [{ col: re() }],
        "col-start": [{ "col-start": w() }],
        "col-end": [{ "col-end": w() }],
        "grid-rows": [{ "grid-rows": ne() }],
        "row-start-end": [{ row: re() }],
        "row-start": [{ "row-start": w() }],
        "row-end": [{ "row-end": w() }],
        "grid-flow": [
          { "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`] },
        ],
        "auto-cols": [{ "auto-cols": ie() }],
        "auto-rows": [{ "auto-rows": ie() }],
        gap: [{ gap: C() }],
        "gap-x": [{ "gap-x": C() }],
        "gap-y": [{ "gap-y": C() }],
        "justify-content": [{ justify: [...ae(), `normal`] }],
        "justify-items": [{ "justify-items": [...oe(), `normal`] }],
        "justify-self": [{ "justify-self": [`auto`, ...oe()] }],
        "align-content": [{ content: [`normal`, ...ae()] }],
        "align-items": [{ items: [...oe(), { baseline: [``, `last`] }] }],
        "align-self": [{ self: [`auto`, ...oe(), { baseline: [``, `last`] }] }],
        "place-content": [{ "place-content": ae() }],
        "place-items": [{ "place-items": [...oe(), `baseline`] }],
        "place-self": [{ "place-self": [`auto`, ...oe()] }],
        p: [{ p: C() }],
        px: [{ px: C() }],
        py: [{ py: C() }],
        ps: [{ ps: C() }],
        pe: [{ pe: C() }],
        pbs: [{ pbs: C() }],
        pbe: [{ pbe: C() }],
        pt: [{ pt: C() }],
        pr: [{ pr: C() }],
        pb: [{ pb: C() }],
        pl: [{ pl: C() }],
        m: [{ m: T() }],
        mx: [{ mx: T() }],
        my: [{ my: T() }],
        ms: [{ ms: T() }],
        me: [{ me: T() }],
        mbs: [{ mbs: T() }],
        mbe: [{ mbe: T() }],
        mt: [{ mt: T() }],
        mr: [{ mr: T() }],
        mb: [{ mb: T() }],
        ml: [{ ml: T() }],
        "space-x": [{ "space-x": C() }],
        "space-x-reverse": [`space-x-reverse`],
        "space-y": [{ "space-y": C() }],
        "space-y-reverse": [`space-y-reverse`],
        size: [{ size: se() }],
        "inline-size": [{ inline: [`auto`, ...ce()] }],
        "min-inline-size": [{ "min-inline": [`auto`, ...ce()] }],
        "max-inline-size": [{ "max-inline": [`none`, ...ce()] }],
        "block-size": [{ block: [`auto`, ...le()] }],
        "min-block-size": [{ "min-block": [`auto`, ...le()] }],
        "max-block-size": [{ "max-block": [`none`, ...le()] }],
        w: [{ w: [s, `screen`, ...se()] }],
        "min-w": [{ "min-w": [s, `screen`, `none`, ...se()] }],
        "max-w": [
          { "max-w": [s, `screen`, `none`, `prose`, { screen: [o] }, ...se()] },
        ],
        h: [{ h: [`screen`, `lh`, ...se()] }],
        "min-h": [{ "min-h": [`screen`, `lh`, `none`, ...se()] }],
        "max-h": [{ "max-h": [`screen`, `lh`, ...se()] }],
        "font-size": [{ text: [`base`, n, Zt, Wt] }],
        "font-smoothing": [`antialiased`, `subpixel-antialiased`],
        "font-style": [`italic`, `not-italic`],
        "font-weight": [{ font: [r, rn, Kt] }],
        "font-stretch": [
          {
            "font-stretch": [
              `ultra-condensed`,
              `extra-condensed`,
              `condensed`,
              `semi-condensed`,
              `normal`,
              `semi-expanded`,
              `expanded`,
              `extra-expanded`,
              `ultra-expanded`,
              Pt,
              F,
            ],
          },
        ],
        "font-family": [{ font: [Qt, qt, t] }],
        "font-features": [{ "font-features": [F] }],
        "fvn-normal": [`normal-nums`],
        "fvn-ordinal": [`ordinal`],
        "fvn-slashed-zero": [`slashed-zero`],
        "fvn-figure": [`lining-nums`, `oldstyle-nums`],
        "fvn-spacing": [`proportional-nums`, `tabular-nums`],
        "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
        tracking: [{ tracking: [i, I, F] }],
        "line-clamp": [{ "line-clamp": [P, `none`, I, Gt] }],
        leading: [{ leading: [a, ...C()] }],
        "list-image": [{ "list-image": [`none`, I, F] }],
        "list-style-position": [{ list: [`inside`, `outside`] }],
        "list-style-type": [{ list: [`disc`, `decimal`, `none`, I, F] }],
        "text-alignment": [
          { text: [`left`, `center`, `right`, `justify`, `start`, `end`] },
        ],
        "placeholder-color": [{ placeholder: E() }],
        "text-color": [{ text: E() }],
        "text-decoration": [
          `underline`,
          `overline`,
          `line-through`,
          `no-underline`,
        ],
        "text-decoration-style": [{ decoration: [...A(), `wavy`] }],
        "text-decoration-thickness": [
          { decoration: [P, `from-font`, `auto`, I, Wt] },
        ],
        "text-decoration-color": [{ decoration: E() }],
        "underline-offset": [{ "underline-offset": [P, `auto`, I, F] }],
        "text-transform": [
          `uppercase`,
          `lowercase`,
          `capitalize`,
          `normal-case`,
        ],
        "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
        "text-wrap": [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
        indent: [{ indent: C() }],
        "tab-size": [{ tab: [Nt, I, F] }],
        "vertical-align": [
          {
            align: [
              `baseline`,
              `top`,
              `middle`,
              `bottom`,
              `text-top`,
              `text-bottom`,
              `sub`,
              `super`,
              I,
              F,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              `normal`,
              `nowrap`,
              `pre`,
              `pre-line`,
              `pre-wrap`,
              `break-spaces`,
            ],
          },
        ],
        break: [{ break: [`normal`, `words`, `all`, `keep`] }],
        wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
        hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
        content: [{ content: [`none`, I, F] }],
        "bg-attachment": [{ bg: [`fixed`, `local`, `scroll`] }],
        "bg-clip": [{ "bg-clip": [`border`, `padding`, `content`, `text`] }],
        "bg-origin": [{ "bg-origin": [`border`, `padding`, `content`] }],
        "bg-position": [{ bg: D() }],
        "bg-repeat": [{ bg: ue() }],
        "bg-size": [{ bg: de() }],
        "bg-image": [
          {
            bg: [
              `none`,
              {
                linear: [
                  { to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] },
                  Nt,
                  I,
                  F,
                ],
                radial: [``, I, F],
                conic: [Nt, I, F],
              },
              tn,
              Yt,
            ],
          },
        ],
        "bg-color": [{ bg: E() }],
        "gradient-from-pos": [{ from: fe() }],
        "gradient-via-pos": [{ via: fe() }],
        "gradient-to-pos": [{ to: fe() }],
        "gradient-from": [{ from: E() }],
        "gradient-via": [{ via: E() }],
        "gradient-to": [{ to: E() }],
        rounded: [{ rounded: O() }],
        "rounded-s": [{ "rounded-s": O() }],
        "rounded-e": [{ "rounded-e": O() }],
        "rounded-t": [{ "rounded-t": O() }],
        "rounded-r": [{ "rounded-r": O() }],
        "rounded-b": [{ "rounded-b": O() }],
        "rounded-l": [{ "rounded-l": O() }],
        "rounded-ss": [{ "rounded-ss": O() }],
        "rounded-se": [{ "rounded-se": O() }],
        "rounded-ee": [{ "rounded-ee": O() }],
        "rounded-es": [{ "rounded-es": O() }],
        "rounded-tl": [{ "rounded-tl": O() }],
        "rounded-tr": [{ "rounded-tr": O() }],
        "rounded-br": [{ "rounded-br": O() }],
        "rounded-bl": [{ "rounded-bl": O() }],
        "border-w": [{ border: k() }],
        "border-w-x": [{ "border-x": k() }],
        "border-w-y": [{ "border-y": k() }],
        "border-w-s": [{ "border-s": k() }],
        "border-w-e": [{ "border-e": k() }],
        "border-w-bs": [{ "border-bs": k() }],
        "border-w-be": [{ "border-be": k() }],
        "border-w-t": [{ "border-t": k() }],
        "border-w-r": [{ "border-r": k() }],
        "border-w-b": [{ "border-b": k() }],
        "border-w-l": [{ "border-l": k() }],
        "divide-x": [{ "divide-x": k() }],
        "divide-x-reverse": [`divide-x-reverse`],
        "divide-y": [{ "divide-y": k() }],
        "divide-y-reverse": [`divide-y-reverse`],
        "border-style": [{ border: [...A(), `hidden`, `none`] }],
        "divide-style": [{ divide: [...A(), `hidden`, `none`] }],
        "border-color": [{ border: E() }],
        "border-color-x": [{ "border-x": E() }],
        "border-color-y": [{ "border-y": E() }],
        "border-color-s": [{ "border-s": E() }],
        "border-color-e": [{ "border-e": E() }],
        "border-color-bs": [{ "border-bs": E() }],
        "border-color-be": [{ "border-be": E() }],
        "border-color-t": [{ "border-t": E() }],
        "border-color-r": [{ "border-r": E() }],
        "border-color-b": [{ "border-b": E() }],
        "border-color-l": [{ "border-l": E() }],
        "divide-color": [{ divide: E() }],
        "outline-style": [{ outline: [...A(), `none`, `hidden`] }],
        "outline-offset": [{ "outline-offset": [P, I, F] }],
        "outline-w": [{ outline: [``, P, Zt, Wt] }],
        "outline-color": [{ outline: E() }],
        shadow: [{ shadow: [``, `none`, u, nn, Xt] }],
        "shadow-color": [{ shadow: E() }],
        "inset-shadow": [{ "inset-shadow": [`none`, d, nn, Xt] }],
        "inset-shadow-color": [{ "inset-shadow": E() }],
        "ring-w": [{ ring: k() }],
        "ring-w-inset": [`ring-inset`],
        "ring-color": [{ ring: E() }],
        "ring-offset-w": [{ "ring-offset": [P, Wt] }],
        "ring-offset-color": [{ "ring-offset": E() }],
        "inset-ring-w": [{ "inset-ring": k() }],
        "inset-ring-color": [{ "inset-ring": E() }],
        "text-shadow": [{ "text-shadow": [`none`, f, nn, Xt] }],
        "text-shadow-color": [{ "text-shadow": E() }],
        opacity: [{ opacity: [P, I, F] }],
        "mix-blend": [
          { "mix-blend": [...pe(), `plus-darker`, `plus-lighter`] },
        ],
        "bg-blend": [{ "bg-blend": pe() }],
        "mask-clip": [
          {
            "mask-clip": [
              `border`,
              `padding`,
              `content`,
              `fill`,
              `stroke`,
              `view`,
            ],
          },
          `mask-no-clip`,
        ],
        "mask-composite": [
          { mask: [`add`, `subtract`, `intersect`, `exclude`] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [P] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": j() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": j() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": E() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": E() }],
        "mask-image-t-from-pos": [{ "mask-t-from": j() }],
        "mask-image-t-to-pos": [{ "mask-t-to": j() }],
        "mask-image-t-from-color": [{ "mask-t-from": E() }],
        "mask-image-t-to-color": [{ "mask-t-to": E() }],
        "mask-image-r-from-pos": [{ "mask-r-from": j() }],
        "mask-image-r-to-pos": [{ "mask-r-to": j() }],
        "mask-image-r-from-color": [{ "mask-r-from": E() }],
        "mask-image-r-to-color": [{ "mask-r-to": E() }],
        "mask-image-b-from-pos": [{ "mask-b-from": j() }],
        "mask-image-b-to-pos": [{ "mask-b-to": j() }],
        "mask-image-b-from-color": [{ "mask-b-from": E() }],
        "mask-image-b-to-color": [{ "mask-b-to": E() }],
        "mask-image-l-from-pos": [{ "mask-l-from": j() }],
        "mask-image-l-to-pos": [{ "mask-l-to": j() }],
        "mask-image-l-from-color": [{ "mask-l-from": E() }],
        "mask-image-l-to-color": [{ "mask-l-to": E() }],
        "mask-image-x-from-pos": [{ "mask-x-from": j() }],
        "mask-image-x-to-pos": [{ "mask-x-to": j() }],
        "mask-image-x-from-color": [{ "mask-x-from": E() }],
        "mask-image-x-to-color": [{ "mask-x-to": E() }],
        "mask-image-y-from-pos": [{ "mask-y-from": j() }],
        "mask-image-y-to-pos": [{ "mask-y-to": j() }],
        "mask-image-y-from-color": [{ "mask-y-from": E() }],
        "mask-image-y-to-color": [{ "mask-y-to": E() }],
        "mask-image-radial": [{ "mask-radial": [I, F] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": j() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": j() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": E() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": E() }],
        "mask-image-radial-shape": [{ "mask-radial": [`circle`, `ellipse`] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: [`side`, `corner`], farthest: [`side`, `corner`] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": b() }],
        "mask-image-conic-pos": [{ "mask-conic": [P] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": j() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": j() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": E() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": E() }],
        "mask-mode": [{ mask: [`alpha`, `luminance`, `match`] }],
        "mask-origin": [
          {
            "mask-origin": [
              `border`,
              `padding`,
              `content`,
              `fill`,
              `stroke`,
              `view`,
            ],
          },
        ],
        "mask-position": [{ mask: D() }],
        "mask-repeat": [{ mask: ue() }],
        "mask-size": [{ mask: de() }],
        "mask-type": [{ "mask-type": [`alpha`, `luminance`] }],
        "mask-image": [{ mask: [`none`, I, F] }],
        filter: [{ filter: [``, `none`, I, F] }],
        blur: [{ blur: me() }],
        brightness: [{ brightness: [P, I, F] }],
        contrast: [{ contrast: [P, I, F] }],
        "drop-shadow": [{ "drop-shadow": [``, `none`, p, nn, Xt] }],
        "drop-shadow-color": [{ "drop-shadow": E() }],
        grayscale: [{ grayscale: [``, P, I, F] }],
        "hue-rotate": [{ "hue-rotate": [P, I, F] }],
        invert: [{ invert: [``, P, I, F] }],
        saturate: [{ saturate: [P, I, F] }],
        sepia: [{ sepia: [``, P, I, F] }],
        "backdrop-filter": [{ "backdrop-filter": [``, `none`, I, F] }],
        "backdrop-blur": [{ "backdrop-blur": me() }],
        "backdrop-brightness": [{ "backdrop-brightness": [P, I, F] }],
        "backdrop-contrast": [{ "backdrop-contrast": [P, I, F] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [``, P, I, F] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [P, I, F] }],
        "backdrop-invert": [{ "backdrop-invert": [``, P, I, F] }],
        "backdrop-opacity": [{ "backdrop-opacity": [P, I, F] }],
        "backdrop-saturate": [{ "backdrop-saturate": [P, I, F] }],
        "backdrop-sepia": [{ "backdrop-sepia": [``, P, I, F] }],
        "border-collapse": [{ border: [`collapse`, `separate`] }],
        "border-spacing": [{ "border-spacing": C() }],
        "border-spacing-x": [{ "border-spacing-x": C() }],
        "border-spacing-y": [{ "border-spacing-y": C() }],
        "table-layout": [{ table: [`auto`, `fixed`] }],
        caption: [{ caption: [`top`, `bottom`] }],
        transition: [
          {
            transition: [
              ``,
              `all`,
              `colors`,
              `opacity`,
              `shadow`,
              `transform`,
              `none`,
              I,
              F,
            ],
          },
        ],
        "transition-behavior": [{ transition: [`normal`, `discrete`] }],
        duration: [{ duration: [P, `initial`, I, F] }],
        ease: [{ ease: [`linear`, `initial`, _, I, F] }],
        delay: [{ delay: [P, I, F] }],
        animate: [{ animate: [`none`, v, I, F] }],
        backface: [{ backface: [`hidden`, `visible`] }],
        perspective: [{ perspective: [h, I, F] }],
        "perspective-origin": [{ "perspective-origin": x() }],
        rotate: [{ rotate: he() }],
        "rotate-x": [{ "rotate-x": he() }],
        "rotate-y": [{ "rotate-y": he() }],
        "rotate-z": [{ "rotate-z": he() }],
        scale: [{ scale: ge() }],
        "scale-x": [{ "scale-x": ge() }],
        "scale-y": [{ "scale-y": ge() }],
        "scale-z": [{ "scale-z": ge() }],
        "scale-3d": [`scale-3d`],
        skew: [{ skew: _e() }],
        "skew-x": [{ "skew-x": _e() }],
        "skew-y": [{ "skew-y": _e() }],
        transform: [{ transform: [I, F, ``, `none`, `gpu`, `cpu`] }],
        "transform-origin": [{ origin: x() }],
        "transform-style": [{ transform: [`3d`, `flat`] }],
        translate: [{ translate: ve() }],
        "translate-x": [{ "translate-x": ve() }],
        "translate-y": [{ "translate-y": ve() }],
        "translate-z": [{ "translate-z": ve() }],
        "translate-none": [`translate-none`],
        zoom: [{ zoom: [Nt, I, F] }],
        accent: [{ accent: E() }],
        appearance: [{ appearance: [`none`, `auto`] }],
        "caret-color": [{ caret: E() }],
        "color-scheme": [
          {
            scheme: [
              `normal`,
              `dark`,
              `light`,
              `light-dark`,
              `only-dark`,
              `only-light`,
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              `auto`,
              `default`,
              `pointer`,
              `wait`,
              `text`,
              `move`,
              `help`,
              `not-allowed`,
              `none`,
              `context-menu`,
              `progress`,
              `cell`,
              `crosshair`,
              `vertical-text`,
              `alias`,
              `copy`,
              `no-drop`,
              `grab`,
              `grabbing`,
              `all-scroll`,
              `col-resize`,
              `row-resize`,
              `n-resize`,
              `e-resize`,
              `s-resize`,
              `w-resize`,
              `ne-resize`,
              `nw-resize`,
              `se-resize`,
              `sw-resize`,
              `ew-resize`,
              `ns-resize`,
              `nesw-resize`,
              `nwse-resize`,
              `zoom-in`,
              `zoom-out`,
              I,
              F,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": [`fixed`, `content`] }],
        "pointer-events": [{ "pointer-events": [`auto`, `none`] }],
        resize: [{ resize: [`none`, ``, `y`, `x`] }],
        "scroll-behavior": [{ scroll: [`auto`, `smooth`] }],
        "scrollbar-thumb-color": [{ "scrollbar-thumb": E() }],
        "scrollbar-track-color": [{ "scrollbar-track": E() }],
        "scrollbar-gutter": [
          { "scrollbar-gutter": [`auto`, `stable`, `both`] },
        ],
        "scrollbar-w": [{ scrollbar: [`auto`, `thin`, `none`] }],
        "scroll-m": [{ "scroll-m": C() }],
        "scroll-mx": [{ "scroll-mx": C() }],
        "scroll-my": [{ "scroll-my": C() }],
        "scroll-ms": [{ "scroll-ms": C() }],
        "scroll-me": [{ "scroll-me": C() }],
        "scroll-mbs": [{ "scroll-mbs": C() }],
        "scroll-mbe": [{ "scroll-mbe": C() }],
        "scroll-mt": [{ "scroll-mt": C() }],
        "scroll-mr": [{ "scroll-mr": C() }],
        "scroll-mb": [{ "scroll-mb": C() }],
        "scroll-ml": [{ "scroll-ml": C() }],
        "scroll-p": [{ "scroll-p": C() }],
        "scroll-px": [{ "scroll-px": C() }],
        "scroll-py": [{ "scroll-py": C() }],
        "scroll-ps": [{ "scroll-ps": C() }],
        "scroll-pe": [{ "scroll-pe": C() }],
        "scroll-pbs": [{ "scroll-pbs": C() }],
        "scroll-pbe": [{ "scroll-pbe": C() }],
        "scroll-pt": [{ "scroll-pt": C() }],
        "scroll-pr": [{ "scroll-pr": C() }],
        "scroll-pb": [{ "scroll-pb": C() }],
        "scroll-pl": [{ "scroll-pl": C() }],
        "snap-align": [{ snap: [`start`, `end`, `center`, `align-none`] }],
        "snap-stop": [{ snap: [`normal`, `always`] }],
        "snap-type": [{ snap: [`none`, `x`, `y`, `both`] }],
        "snap-strictness": [{ snap: [`mandatory`, `proximity`] }],
        touch: [{ touch: [`auto`, `none`, `manipulation`] }],
        "touch-x": [{ "touch-pan": [`x`, `left`, `right`] }],
        "touch-y": [{ "touch-pan": [`y`, `up`, `down`] }],
        "touch-pz": [`touch-pinch-zoom`],
        select: [{ select: [`none`, `text`, `all`, `auto`] }],
        "will-change": [
          { "will-change": [`auto`, `scroll`, `contents`, `transform`, I, F] },
        ],
        fill: [{ fill: [`none`, ...E()] }],
        "stroke-w": [{ stroke: [P, Zt, Wt, Gt] }],
        stroke: [{ stroke: [`none`, ...E()] }],
        "forced-color-adjust": [{ "forced-color-adjust": [`auto`, `none`] }],
      },
      conflictingClassGroups: {
        "container-named": [`container-type`],
        overflow: [`overflow-x`, `overflow-y`],
        overscroll: [`overscroll-x`, `overscroll-y`],
        inset: [
          `inset-x`,
          `inset-y`,
          `inset-bs`,
          `inset-be`,
          `start`,
          `end`,
          `top`,
          `right`,
          `bottom`,
          `left`,
        ],
        "inset-x": [`right`, `left`],
        "inset-y": [`top`, `bottom`],
        flex: [`basis`, `grow`, `shrink`],
        gap: [`gap-x`, `gap-y`],
        p: [`px`, `py`, `ps`, `pe`, `pbs`, `pbe`, `pt`, `pr`, `pb`, `pl`],
        px: [`pr`, `pl`],
        py: [`pt`, `pb`],
        m: [`mx`, `my`, `ms`, `me`, `mbs`, `mbe`, `mt`, `mr`, `mb`, `ml`],
        mx: [`mr`, `ml`],
        my: [`mt`, `mb`],
        size: [`w`, `h`],
        "font-size": [`leading`],
        "fvn-normal": [
          `fvn-ordinal`,
          `fvn-slashed-zero`,
          `fvn-figure`,
          `fvn-spacing`,
          `fvn-fraction`,
        ],
        "fvn-ordinal": [`fvn-normal`],
        "fvn-slashed-zero": [`fvn-normal`],
        "fvn-figure": [`fvn-normal`],
        "fvn-spacing": [`fvn-normal`],
        "fvn-fraction": [`fvn-normal`],
        "line-clamp": [`display`, `overflow`],
        rounded: [
          `rounded-s`,
          `rounded-e`,
          `rounded-t`,
          `rounded-r`,
          `rounded-b`,
          `rounded-l`,
          `rounded-ss`,
          `rounded-se`,
          `rounded-ee`,
          `rounded-es`,
          `rounded-tl`,
          `rounded-tr`,
          `rounded-br`,
          `rounded-bl`,
        ],
        "rounded-s": [`rounded-ss`, `rounded-es`],
        "rounded-e": [`rounded-se`, `rounded-ee`],
        "rounded-t": [`rounded-tl`, `rounded-tr`],
        "rounded-r": [`rounded-tr`, `rounded-br`],
        "rounded-b": [`rounded-br`, `rounded-bl`],
        "rounded-l": [`rounded-tl`, `rounded-bl`],
        "border-spacing": [`border-spacing-x`, `border-spacing-y`],
        "border-w": [
          `border-w-x`,
          `border-w-y`,
          `border-w-s`,
          `border-w-e`,
          `border-w-bs`,
          `border-w-be`,
          `border-w-t`,
          `border-w-r`,
          `border-w-b`,
          `border-w-l`,
        ],
        "border-w-x": [`border-w-r`, `border-w-l`],
        "border-w-y": [`border-w-t`, `border-w-b`],
        "border-color": [
          `border-color-x`,
          `border-color-y`,
          `border-color-s`,
          `border-color-e`,
          `border-color-bs`,
          `border-color-be`,
          `border-color-t`,
          `border-color-r`,
          `border-color-b`,
          `border-color-l`,
        ],
        "border-color-x": [`border-color-r`, `border-color-l`],
        "border-color-y": [`border-color-t`, `border-color-b`],
        translate: [`translate-x`, `translate-y`, `translate-none`],
        "translate-none": [
          `translate`,
          `translate-x`,
          `translate-y`,
          `translate-z`,
        ],
        "scroll-m": [
          `scroll-mx`,
          `scroll-my`,
          `scroll-ms`,
          `scroll-me`,
          `scroll-mbs`,
          `scroll-mbe`,
          `scroll-mt`,
          `scroll-mr`,
          `scroll-mb`,
          `scroll-ml`,
        ],
        "scroll-mx": [`scroll-mr`, `scroll-ml`],
        "scroll-my": [`scroll-mt`, `scroll-mb`],
        "scroll-p": [
          `scroll-px`,
          `scroll-py`,
          `scroll-ps`,
          `scroll-pe`,
          `scroll-pbs`,
          `scroll-pbe`,
          `scroll-pt`,
          `scroll-pr`,
          `scroll-pb`,
          `scroll-pl`,
        ],
        "scroll-px": [`scroll-pr`, `scroll-pl`],
        "scroll-py": [`scroll-pt`, `scroll-pb`],
        touch: [`touch-x`, `touch-y`, `touch-pz`],
        "touch-x": [`touch`],
        "touch-y": [`touch`],
        "touch-pz": [`touch`],
      },
      conflictingClassGroupModifiers: { "font-size": [`leading`] },
      postfixLookupClassGroups: [`container-type`],
      orderSensitiveModifiers: [
        `*`,
        `**`,
        `after`,
        `backdrop`,
        `before`,
        `details-content`,
        `file`,
        `first-letter`,
        `first-line`,
        `marker`,
        `placeholder`,
        `selection`,
      ],
    };
  });
function L(...e) {
  return hn(We(e));
}
var gn = e((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.fragment`);
    function r(e, n, r) {
      var i = null;
      if (
        (r !== void 0 && (i = `` + r),
        n.key !== void 0 && (i = `` + n.key),
        `key` in n)
      )
        for (var a in ((r = {}), n)) a !== `key` && (r[a] = n[a]);
      else r = n;
      return (
        (n = r.ref),
        { $$typeof: t, type: e, key: i, ref: n === void 0 ? null : n, props: r }
      );
    }
    ((e.Fragment = n), (e.jsx = r), (e.jsxs = r));
  }),
  R = e((e, t) => {
    t.exports = gn();
  })();
function _n({ className: e, ...t }) {
  return (0, R.jsx)(`div`, {
    className: L(
      `mx-auto w-full max-w-[var(--content-max-width)] px-[var(--page-gutter)]`,
      e,
    ),
    ...t,
  });
}
var vn = (e) => (typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e),
  yn = We,
  bn = (e, t) => (n) => {
    if (t?.variants == null) return yn(e, n?.class, n?.className);
    let { variants: r, defaultVariants: i } = t,
      a = Object.keys(r).map((e) => {
        let t = n?.[e],
          a = i?.[e];
        if (t === null) return null;
        let o = vn(t) || vn(a);
        return r[e][o];
      }),
      o =
        n &&
        Object.entries(n).reduce((e, t) => {
          let [n, r] = t;
          return (r === void 0 || (e[n] = r), e);
        }, {});
    return yn(
      e,
      a,
      t?.compoundVariants?.reduce((e, t) => {
        let { class: n, className: r, ...a } = t;
        return Object.entries(a).every((e) => {
          let [t, n] = e;
          return Array.isArray(n)
            ? n.includes({ ...i, ...o }[t])
            : { ...i, ...o }[t] === n;
        })
          ? [...e, n, r]
          : e;
      }, []),
      n?.class,
      n?.className,
    );
  },
  xn = bn(
    `relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:shrink-0`,
    {
      variants: {
        variant: {
          default: `bg-primary text-primary-foreground shadow-[0_1px_1px_rgb(0_0_0/.15)] hover:bg-primary/90`,
          secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/75`,
          outline: `border border-input bg-background text-foreground hover:border-primary/40 hover:bg-accent`,
          ghost: `text-foreground hover:bg-accent hover:text-accent-foreground`,
          destructive: `bg-destructive text-destructive-foreground shadow-[0_1px_1px_rgb(0_0_0/.15)] hover:bg-destructive/90`,
          link: `h-auto rounded-sm p-0 text-primary underline-offset-4 hover:underline active:translate-y-0`,
        },
        size: {
          sm: `h-9 px-3.5 text-sm [&_svg]:size-4`,
          default: `h-11 px-5 text-sm [&_svg]:size-4`,
          lg: `h-12 px-5 text-base [&_svg]:size-[1.125rem]`,
          icon: `size-11 p-0 [&_svg]:size-[1.125rem]`,
          "icon-sm": `size-9 p-0 [&_svg]:size-4`,
          "icon-lg": `size-12 p-0 [&_svg]:size-5`,
        },
        width: { auto: ``, full: `w-full` },
      },
      compoundVariants: [
        { variant: `link`, size: `sm`, className: `h-auto px-0` },
        { variant: `link`, size: `default`, className: `h-auto px-0` },
        { variant: `link`, size: `lg`, className: `h-auto px-0` },
      ],
      defaultVariants: { variant: `default`, size: `default`, width: `auto` },
    },
  );
function z({
  children: e,
  className: t,
  disabled: n,
  loading: r = !1,
  loadingText: i,
  type: a = `button`,
  variant: o,
  size: s,
  width: c,
  ...l
}) {
  return (0, R.jsx)(`button`, {
    className: L(xn({ variant: o, size: s, width: c }), t),
    disabled: n || r,
    type: a,
    "aria-busy": r || void 0,
    ...l,
    children: r
      ? (0, R.jsxs)(R.Fragment, {
          children: [
            (0, R.jsx)(Te, {
              "aria-hidden": `true`,
              className: `animate-spin`,
            }),
            i ?? e,
          ],
        })
      : e,
  });
}
function Sn() {
  return (0, R.jsx)(`span`, {
    className: `government-mark`,
    children: (0, R.jsx)(`i`, { children: `★` }),
  });
}
function Cn({ serviceName: e = `Nom du service` }) {
  return (0, R.jsxs)(`header`, {
    className: `government-header`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `government-identity`,
        children: [
          (0, R.jsx)(Sn, {}),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`small`, { children: `Burkina Faso` }),
              (0, R.jsx)(`strong`, { children: e }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`nav`, {
        "aria-label": `Navigation principale`,
        children: [
          (0, R.jsx)(`a`, { href: `#vue-d’ensemble`, children: `Accueil` }),
          (0, R.jsx)(`a`, {
            href: `#tableau-de-bord`,
            children: `Mes démarches`,
          }),
          (0, R.jsx)(`a`, { href: `#référentiel`, children: `Aide` }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(z, {
            variant: `ghost`,
            size: `icon`,
            "aria-label": `Rechercher`,
            children: (0, R.jsx)(Pe, {}),
          }),
          (0, R.jsx)(z, {
            variant: `outline`,
            size: `sm`,
            children: `Se connecter`,
          }),
          (0, R.jsx)(z, {
            variant: `ghost`,
            size: `icon`,
            className: `government-menu`,
            "aria-label": `Menu`,
            children: (0, R.jsx)(ke, {}),
          }),
        ],
      }),
    ],
  });
}
function wn() {
  return (0, R.jsxs)(`footer`, {
    className: `government-footer`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `government-identity`,
        children: [
          (0, R.jsx)(Sn, {}),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`small`, { children: `Burkina Faso` }),
              (0, R.jsx)(`strong`, { children: `Service public numérique` }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`strong`, { children: `Liens utiles` }),
          (0, R.jsx)(`a`, { href: `#référentiel`, children: `Accessibilité` }),
          (0, R.jsx)(`a`, {
            href: `#principes`,
            children: `Données personnelles`,
          }),
          (0, R.jsx)(`a`, {
            href: `mailto:aide@service-public.gov.bf`,
            children: `Aide et contact`,
          }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`strong`, { children: `Sites de référence` }),
          (0, R.jsxs)(`a`, {
            href: `https://servicepublic.gov.bf`,
            target: `_blank`,
            rel: `noreferrer`,
            children: [`Service public `, (0, R.jsx)(me, {})],
          }),
          (0, R.jsxs)(`a`, {
            href: `https://www.gouvernement.gov.bf`,
            target: `_blank`,
            rel: `noreferrer`,
            children: [`Gouvernement `, (0, R.jsx)(me, {})],
          }),
        ],
      }),
    ],
  });
}
var Tn = bn(
    `relative flex gap-3 rounded-md border p-4 text-sm [&_svg]:shrink-0`,
    {
      variants: {
        variant: {
          information: `border-information/25 bg-information/[0.07]`,
          success: `border-success/25 bg-success/[0.07]`,
          warning: `border-warning/35 bg-warning/[0.09]`,
          destructive: `border-destructive/25 bg-destructive/[0.06]`,
        },
      },
      defaultVariants: { variant: `information` },
    },
  ),
  En = { information: we, success: D, warning: E, destructive: E };
function Dn({
  className: e,
  title: t,
  icon: n,
  children: r,
  variant: i = `information`,
  onDismiss: a,
  ...o
}) {
  let s = i ?? `information`,
    c = En[s];
  return (0, R.jsxs)(`div`, {
    className: L(Tn({ variant: s }), e),
    role: s === `destructive` ? `alert` : `status`,
    ...o,
    children: [
      (0, R.jsx)(`span`, {
        className: L(`alert-icon`, `alert-icon-${s}`),
        children: n ?? (0, R.jsx)(c, { size: 19 }),
      }),
      (0, R.jsxs)(`div`, {
        className: L(`min-w-0`, a && `pr-7`),
        children: [
          (0, R.jsx)(`strong`, {
            className: `block font-bold text-foreground`,
            children: t,
          }),
          r
            ? (0, R.jsx)(`div`, {
                className: `mt-1 text-xs leading-5 text-muted-foreground`,
                children: r,
              })
            : null,
        ],
      }),
      a
        ? (0, R.jsx)(`button`, {
            className: `alert-dismiss`,
            type: `button`,
            onClick: a,
            "aria-label": `Fermer le message`,
            children: (0, R.jsx)(M, { size: 16 }),
          })
        : null,
    ],
  });
}
var On = bn(
  `inline-flex w-fit shrink-0 items-center gap-1.5 border font-bold leading-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        neutral: `border-transparent bg-muted text-muted-foreground`,
        primary: `border-transparent bg-primary/10 text-primary`,
        success: `border-transparent bg-success/12 text-success`,
        warning: `border-transparent bg-warning/18 text-warning-foreground`,
        destructive: `border-transparent bg-destructive/10 text-destructive`,
        information: `border-transparent bg-information/15 text-information-foreground`,
        outline: `border-border bg-background text-foreground`,
      },
      size: {
        sm: `rounded-md px-2 py-0.5 text-[10px] [&_svg]:size-3`,
        default: `rounded-md px-2.5 py-1 text-[11px] [&_svg]:size-3`,
      },
    },
    defaultVariants: { variant: `neutral`, size: `default` },
  },
);
function B({ className: e, variant: t, size: n, ...r }) {
  return (0, R.jsx)(`span`, {
    className: L(On({ variant: t, size: n }), e),
    ...r,
  });
}
function V({ className: e, ...t }) {
  return (0, R.jsx)(`div`, {
    className: L(
      `rounded-lg border bg-card text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/.035)]`,
      e,
    ),
    ...t,
  });
}
var kn = (0, h.forwardRef)(({ className: e, ...t }, n) =>
  (0, R.jsx)(`textarea`, {
    ref: n,
    className: L(
      `flex min-h-28 w-full resize-y rounded-md border border-input bg-background px-3.5 py-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-75`,
      e,
    ),
    ...t,
  }),
);
kn.displayName = `Textarea`;
var An = (0, h.forwardRef)(({ className: e, children: t, ...n }, r) =>
  (0, R.jsxs)(`div`, {
    className: `relative`,
    children: [
      (0, R.jsx)(`select`, {
        ref: r,
        className: L(
          `h-11 w-full appearance-none rounded-md border border-input bg-background px-3.5 pr-10 text-sm outline-none transition-[border-color,box-shadow] hover:border-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-75`,
          e,
        ),
        ...n,
        children: t,
      }),
      (0, R.jsx)(se, {
        "aria-hidden": `true`,
        className: `pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`,
      }),
    ],
  }),
);
An.displayName = `Select`;
function jn({ className: e, children: t, ...n }) {
  return (0, R.jsxs)(`label`, {
    className: L(`choice-control`, e),
    children: [
      (0, R.jsxs)(`span`, {
        className: `checkbox-box`,
        children: [
          (0, R.jsx)(`input`, { type: `checkbox`, ...n }),
          (0, R.jsx)(T, { "aria-hidden": `true` }),
        ],
      }),
      (0, R.jsx)(`span`, { children: t }),
    ],
  });
}
function Mn({ className: e, children: t, ...n }) {
  return (0, R.jsxs)(`label`, {
    className: L(`choice-control`, e),
    children: [
      (0, R.jsxs)(`span`, {
        className: `radio-box`,
        children: [
          (0, R.jsx)(`input`, { type: `radio`, ...n }),
          (0, R.jsx)(`i`, {}),
        ],
      }),
      (0, R.jsx)(`span`, { children: t }),
    ],
  });
}
function Nn({ className: e, children: t, ...n }) {
  return (0, R.jsxs)(`label`, {
    className: L(`switch-control`, e),
    children: [
      (0, R.jsx)(`span`, { children: t }),
      (0, R.jsxs)(`span`, {
        className: `switch-track`,
        children: [
          (0, R.jsx)(`input`, { type: `checkbox`, role: `switch`, ...n }),
          (0, R.jsx)(`i`, {}),
        ],
      }),
    ],
  });
}
var Pn = (0, h.forwardRef)(
  ({ className: e, invalid: t = !1, leadingIcon: n, trailing: r, ...i }, a) =>
    (0, R.jsxs)(`div`, {
      className: `relative`,
      children: [
        n
          ? (0, R.jsx)(`span`, {
              className: `pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground [&_svg]:size-4`,
              children: n,
            })
          : null,
        (0, R.jsx)(`input`, {
          ref: a,
          "aria-invalid": t || void 0,
          className: L(
            `flex h-11 w-full rounded-md border border-input bg-background px-3.5 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-foreground/35 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-75`,
            n && `pl-10`,
            r && `pr-12`,
            t &&
              `border-destructive focus:border-destructive focus:ring-destructive/15`,
            e,
          ),
          ...i,
        }),
        r
          ? (0, R.jsx)(`span`, {
              className: `absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-muted-foreground [&_svg]:size-4`,
              children: r,
            })
          : null,
      ],
    }),
);
Pn.displayName = `Input`;
function Fn({
  id: e,
  label: t,
  hint: n,
  error: r,
  optional: i = !1,
  required: a,
  ...o
}) {
  let s = (0, h.useId)(),
    c = e ?? s,
    l = n || r ? `${c}-description` : void 0;
  return (0, R.jsxs)(`div`, {
    className: `field`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `field-label-row`,
        children: [
          (0, R.jsx)(`label`, { htmlFor: c, children: t }),
          i ? (0, R.jsx)(`span`, { children: `Facultatif` }) : null,
        ],
      }),
      (0, R.jsx)(Pn, {
        id: c,
        required: a,
        invalid: !!r,
        "aria-describedby": l,
        ...o,
      }),
      r
        ? (0, R.jsx)(`p`, {
            className: `field-message error`,
            id: l,
            children: r,
          })
        : n
          ? (0, R.jsx)(`p`, { className: `field-message`, id: l, children: n })
          : null,
    ],
  });
}
function In({ items: e }) {
  return (0, R.jsx)(`nav`, {
    "aria-label": `Fil d’Ariane`,
    children: (0, R.jsx)(`ol`, {
      className: `breadcrumb-list`,
      children: e.map((e, t) =>
        (0, R.jsxs)(
          `li`,
          {
            children: [
              t ? (0, R.jsx)(le, { "aria-hidden": `true` }) : null,
              e.href
                ? (0, R.jsx)(`a`, { href: e.href, children: e.label })
                : (0, R.jsx)(`span`, {
                    "aria-current": `page`,
                    children: e.label,
                  }),
            ],
          },
          e.label,
        ),
      ),
    }),
  });
}
function Ln({ items: e, value: t, onValueChange: n }) {
  let r = e.find((e) => e.value === t) ?? e[0];
  function i(t, r) {
    if (![`ArrowLeft`, `ArrowRight`, `Home`, `End`].includes(t.key)) return;
    t.preventDefault();
    let i =
      t.key === `Home`
        ? 0
        : t.key === `End`
          ? e.length - 1
          : t.key === `ArrowRight`
            ? (r + 1) % e.length
            : (r - 1 + e.length) % e.length;
    (n(e[i].value), document.getElementById(`tab-${e[i].value}`)?.focus());
  }
  return (0, R.jsxs)(`div`, {
    children: [
      (0, R.jsx)(`div`, {
        className: `tabs-list`,
        role: `tablist`,
        children: e.map((e, r) =>
          (0, R.jsx)(
            `button`,
            {
              id: `tab-${e.value}`,
              role: `tab`,
              "aria-selected": t === e.value,
              "aria-controls": `panel-${e.value}`,
              onClick: () => n(e.value),
              onKeyDown: (e) => i(e, r),
              tabIndex: t === e.value ? 0 : -1,
              children: e.label,
            },
            e.value,
          ),
        ),
      }),
      (0, R.jsx)(`div`, {
        className: `tabs-panel`,
        id: `panel-${r.value}`,
        role: `tabpanel`,
        "aria-labelledby": `tab-${r.value}`,
        children: r.content,
      }),
    ],
  });
}
function Rn({ page: e = 2, total: t = 5 }) {
  return (0, R.jsxs)(`nav`, {
    className: `pagination`,
    "aria-label": `Pagination`,
    children: [
      (0, R.jsx)(z, {
        variant: `outline`,
        size: `icon-sm`,
        "aria-label": `Page précédente`,
        children: (0, R.jsx)(ce, {}),
      }),
      Array.from({ length: t }, (e, t) => t + 1).map((t) =>
        (0, R.jsx)(
          `button`,
          {
            className: L(`page-button`, t === e && `active`),
            "aria-current": t === e ? `page` : void 0,
            children: t,
          },
          t,
        ),
      ),
      (0, R.jsx)(z, {
        variant: `outline`,
        size: `icon-sm`,
        "aria-label": `Page suivante`,
        children: (0, R.jsx)(le, {}),
      }),
    ],
  });
}
function zn({ value: e, label: t }) {
  return (0, R.jsxs)(`div`, {
    className: `progress-wrap`,
    children: [
      t
        ? (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: t }),
              (0, R.jsxs)(`strong`, { children: [e, ` %`] }),
            ],
          })
        : null,
      (0, R.jsx)(`div`, {
        className: `progress-track`,
        role: `progressbar`,
        "aria-label": t ?? `Progression`,
        "aria-valuenow": e,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        children: (0, R.jsx)(`span`, {
          style: { width: `${Math.min(100, Math.max(0, e))}%` },
        }),
      }),
    ],
  });
}
function Bn({ className: e, ...t }) {
  return (0, R.jsx)(`div`, {
    className: L(`skeleton`, e),
    "aria-hidden": `true`,
    ...t,
  });
}
var Vn = [`Identité`, `Justificatifs`, `Vérification`, `Confirmation`];
function Hn() {
  let [e, t] = (0, h.useState)(1);
  return (0, R.jsxs)(`div`, {
    className: `pattern-shell`,
    children: [
      (0, R.jsxs)(`header`, {
        className: `pattern-app-header`,
        children: [
          (0, R.jsxs)(`div`, {
            className: `flex items-center gap-2.5`,
            children: [
              (0, R.jsx)(`span`, {
                className: `pattern-mini-mark`,
                children: `★`,
              }),
              (0, R.jsx)(`strong`, { children: `Service public` }),
            ],
          }),
          (0, R.jsxs)(`span`, {
            children: [
              `Besoin d’aide ? `,
              (0, R.jsx)(`a`, {
                href: `mailto:aide@service-public.gov.bf`,
                children: `Nous contacter`,
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        className: `application-layout`,
        children: [
          (0, R.jsxs)(`aside`, {
            className: `application-summary`,
            children: [
              (0, R.jsxs)(B, {
                variant: `success`,
                className: `application-summary-badge`,
                style: {
                  background: `rgb(94 211 154 / .14)`,
                  color: `#82e5b2`,
                },
                children: [(0, R.jsx)(Ie, {}), ` Connexion sécurisée`],
              }),
              (0, R.jsx)(`h3`, {
                children: `Demande de certificat de nationalité`,
              }),
              (0, R.jsx)(`p`, { children: `Temps estimé : 8 minutes` }),
              (0, R.jsx)(`ol`, {
                children: Vn.map((t, n) => {
                  let r = n + 1;
                  return (0, R.jsxs)(
                    `li`,
                    {
                      className: L(r === e && `active`, r < e && `complete`),
                      children: [
                        (0, R.jsx)(`span`, {
                          children: r < e ? (0, R.jsx)(T, {}) : r,
                        }),
                        (0, R.jsxs)(`div`, {
                          children: [
                            (0, R.jsxs)(`small`, { children: [`Étape `, r] }),
                            (0, R.jsx)(`strong`, { children: t }),
                          ],
                        }),
                      ],
                    },
                    t,
                  );
                }),
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            className: `application-content`,
            children: [
              (0, R.jsx)(`div`, {
                className: `mobile-progress`,
                children: (0, R.jsx)(zn, {
                  value: e * 25,
                  label: `Étape ${e} sur 4`,
                }),
              }),
              e === 1
                ? (0, R.jsxs)(R.Fragment, {
                    children: [
                      (0, R.jsx)(`span`, {
                        className: `pattern-kicker`,
                        children: `Étape 1 sur 4`,
                      }),
                      (0, R.jsx)(`h3`, { children: `Vérifiez votre identité` }),
                      (0, R.jsx)(`p`, {
                        className: `pattern-intro`,
                        children: `Ces informations doivent correspondre exactement à celles indiquées sur votre CNIB.`,
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `mt-6 grid gap-5 sm:grid-cols-2`,
                        children: [
                          (0, R.jsx)(Fn, {
                            label: `Nom de naissance`,
                            placeholder: `Ex. Ouédraogo`,
                          }),
                          (0, R.jsx)(Fn, {
                            label: `Prénom(s)`,
                            placeholder: `Ex. Adama`,
                          }),
                          (0, R.jsx)(Fn, {
                            label: `Date de naissance`,
                            type: `date`,
                          }),
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`label`, {
                                className: `mb-2 block text-xs font-bold`,
                                htmlFor: `sexe`,
                                children: `Sexe`,
                              }),
                              (0, R.jsxs)(An, {
                                id: `sexe`,
                                defaultValue: ``,
                                children: [
                                  (0, R.jsx)(`option`, {
                                    value: ``,
                                    disabled: !0,
                                    children: `Sélectionner`,
                                  }),
                                  (0, R.jsx)(`option`, { children: `Féminin` }),
                                  (0, R.jsx)(`option`, {
                                    children: `Masculin`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : e === 2
                  ? (0, R.jsxs)(R.Fragment, {
                      children: [
                        (0, R.jsx)(`span`, {
                          className: `pattern-kicker`,
                          children: `Étape 2 sur 4`,
                        }),
                        (0, R.jsx)(`h3`, {
                          children: `Ajoutez vos justificatifs`,
                        }),
                        (0, R.jsx)(`p`, {
                          className: `pattern-intro`,
                          children: `Les fichiers doivent être lisibles, au format PDF, JPG ou PNG, et peser moins de 5 Mo.`,
                        }),
                        (0, R.jsxs)(`div`, {
                          className: `upload-list`,
                          children: [
                            (0, R.jsxs)(`div`, {
                              children: [
                                (0, R.jsx)(`span`, {
                                  children: (0, R.jsx)(_e, {}),
                                }),
                                (0, R.jsxs)(`div`, {
                                  children: [
                                    (0, R.jsx)(`strong`, {
                                      children: `Copie de la CNIB`,
                                    }),
                                    (0, R.jsx)(`small`, {
                                      children: `Obligatoire · Recto et verso`,
                                    }),
                                  ],
                                }),
                                (0, R.jsx)(z, {
                                  variant: `outline`,
                                  size: `sm`,
                                  children: `Ajouter`,
                                }),
                              ],
                            }),
                            (0, R.jsxs)(`div`, {
                              children: [
                                (0, R.jsx)(`span`, {
                                  children: (0, R.jsx)(_e, {}),
                                }),
                                (0, R.jsxs)(`div`, {
                                  children: [
                                    (0, R.jsx)(`strong`, {
                                      children: `Extrait d’acte de naissance`,
                                    }),
                                    (0, R.jsx)(`small`, {
                                      children: `Obligatoire · Moins de 3 mois`,
                                    }),
                                  ],
                                }),
                                (0, R.jsx)(z, {
                                  variant: `outline`,
                                  size: `sm`,
                                  children: `Ajouter`,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                  : e === 3
                    ? (0, R.jsxs)(R.Fragment, {
                        children: [
                          (0, R.jsx)(`span`, {
                            className: `pattern-kicker`,
                            children: `Étape 3 sur 4`,
                          }),
                          (0, R.jsx)(`h3`, {
                            children: `Vérifiez votre demande`,
                          }),
                          (0, R.jsx)(`p`, {
                            className: `pattern-intro`,
                            children: `Relisez les informations avant de transmettre le dossier.`,
                          }),
                          (0, R.jsxs)(`dl`, {
                            className: `review-list`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                children: [
                                  (0, R.jsx)(`dt`, { children: `Identité` }),
                                  (0, R.jsx)(`dd`, {
                                    children: `Adama Ouédraogo · 14 mai 1991`,
                                  }),
                                  (0, R.jsx)(`button`, {
                                    children: `Modifier`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                children: [
                                  (0, R.jsx)(`dt`, {
                                    children: `Pièces jointes`,
                                  }),
                                  (0, R.jsx)(`dd`, {
                                    children: `2 documents ajoutés`,
                                  }),
                                  (0, R.jsx)(`button`, {
                                    children: `Modifier`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                children: [
                                  (0, R.jsx)(`dt`, {
                                    children: `Frais de dossier`,
                                  }),
                                  (0, R.jsx)(`dd`, { children: `1 000 FCFA` }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsx)(jn, {
                            className: `mt-5`,
                            children: `Je certifie l’exactitude des informations fournies.`,
                          }),
                        ],
                      })
                    : (0, R.jsxs)(`div`, {
                        className: `confirmation-panel`,
                        children: [
                          (0, R.jsx)(`span`, { children: (0, R.jsx)(D, {}) }),
                          (0, R.jsx)(B, {
                            variant: `success`,
                            children: `Demande transmise`,
                          }),
                          (0, R.jsx)(`h3`, {
                            children: `Votre dossier est enregistré`,
                          }),
                          (0, R.jsxs)(`p`, {
                            children: [
                              `La référence `,
                              (0, R.jsx)(`strong`, {
                                children: `BF-2026-0148`,
                              }),
                              ` vous permet de suivre son traitement.`,
                            ],
                          }),
                          (0, R.jsxs)(z, {
                            variant: `outline`,
                            children: [
                              (0, R.jsx)(pe, {}),
                              ` Télécharger le récépissé`,
                            ],
                          }),
                        ],
                      }),
              (0, R.jsxs)(`div`, {
                className: `application-actions`,
                children: [
                  e > 1 && e < 4
                    ? (0, R.jsxs)(z, {
                        variant: `outline`,
                        onClick: () => t((e) => e - 1),
                        children: [(0, R.jsx)(S, {}), ` Retour`],
                      })
                    : (0, R.jsx)(`span`, {}),
                  e < 4
                    ? (0, R.jsxs)(z, {
                        onClick: () => t((e) => e + 1),
                        children: [
                          e === 3 ? `Transmettre la demande` : `Continuer`,
                          ` `,
                          (0, R.jsx)(C, {}),
                        ],
                      })
                    : (0, R.jsx)(z, {
                        onClick: () => t(1),
                        children: `Retour à mes démarches`,
                      }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var Un = [
  {
    reference: `BF-2026-0148`,
    name: `Certificat de nationalité`,
    status: `En traitement`,
    variant: `primary`,
    date: `25 juil. 2026`,
  },
  {
    reference: `BF-2026-0132`,
    name: `Casier judiciaire`,
    status: `Action requise`,
    variant: `warning`,
    date: `23 juil. 2026`,
  },
  {
    reference: `BF-2026-0096`,
    name: `Extrait de naissance`,
    status: `Disponible`,
    variant: `success`,
    date: `18 juil. 2026`,
  },
];
function Wn() {
  let [e, t] = (0, h.useState)(``),
    n = Un.filter(
      (t) =>
        t.name.toLowerCase().includes(e.toLowerCase()) ||
        t.reference.toLowerCase().includes(e.toLowerCase()),
    );
  return (0, R.jsxs)(`div`, {
    className: `dashboard-pattern`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `dashboard-welcome`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `Bonjour Adama,` }),
              (0, R.jsx)(`h3`, { children: `Vos démarches` }),
              (0, R.jsx)(`p`, {
                children: `Retrouvez vos demandes et les actions à effectuer.`,
              }),
            ],
          }),
          (0, R.jsxs)(z, {
            children: [(0, R.jsx)(Me, {}), ` Nouvelle démarche`],
          }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        className: `dashboard-stats`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, {
                className: `stat-icon red`,
                children: (0, R.jsx)(be, {}),
              }),
              (0, R.jsxs)(`p`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `3` }),
                  `Démarches en cours`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, {
                className: `stat-icon amber`,
                children: (0, R.jsx)(de, {}),
              }),
              (0, R.jsxs)(`p`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `1` }),
                  `Action requise`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, {
                className: `stat-icon green`,
                children: (0, R.jsx)(ge, {}),
              }),
              (0, R.jsxs)(`p`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `4` }),
                  `Documents disponibles`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(V, {
        className: `overflow-hidden`,
        children: [
          (0, R.jsxs)(`div`, {
            className: `dashboard-list-header`,
            children: [
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`h4`, { children: `Demandes récentes` }),
                  (0, R.jsx)(`p`, {
                    children: `3 démarches mises à jour ce mois-ci`,
                  }),
                ],
              }),
              (0, R.jsxs)(`div`, {
                className: `dashboard-search`,
                children: [
                  (0, R.jsx)(Pe, {}),
                  (0, R.jsx)(Pn, {
                    value: e,
                    onChange: (e) => t(e.target.value),
                    placeholder: `Rechercher…`,
                    "aria-label": `Rechercher une demande`,
                  }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            className: `case-list`,
            children: [
              n.map((e) =>
                (0, R.jsxs)(
                  `button`,
                  {
                    children: [
                      (0, R.jsx)(`span`, {
                        className: `case-file`,
                        children: (0, R.jsx)(_e, {}),
                      }),
                      (0, R.jsxs)(`span`, {
                        className: `case-main`,
                        children: [
                          (0, R.jsx)(`small`, { children: e.reference }),
                          (0, R.jsx)(`strong`, { children: e.name }),
                        ],
                      }),
                      (0, R.jsx)(B, { variant: e.variant, children: e.status }),
                      (0, R.jsx)(`span`, {
                        className: `case-date`,
                        children: e.date,
                      }),
                      (0, R.jsx)(le, { className: `case-arrow` }),
                    ],
                  },
                  e.reference,
                ),
              ),
              n.length === 0
                ? (0, R.jsx)(`p`, {
                    className: `empty-search`,
                    children: `Aucune démarche ne correspond à cette recherche.`,
                  })
                : null,
            ],
          }),
        ],
      }),
    ],
  });
}
var Gn = [
  {
    title: `Document disponible`,
    text: `Votre certificat peut être téléchargé.`,
    date: `25 juillet · 14:32`,
    complete: !0,
  },
  {
    title: `Dossier validé`,
    text: `Les informations et les pièces ont été vérifiées.`,
    date: `25 juillet · 10:18`,
    complete: !0,
  },
  {
    title: `Dossier en cours d’examen`,
    text: `Un agent traite actuellement votre demande.`,
    date: `24 juillet · 08:45`,
    complete: !0,
  },
  {
    title: `Demande transmise`,
    text: `Votre dossier a bien été enregistré.`,
    date: `23 juillet · 16:04`,
    complete: !0,
  },
];
function Kn() {
  return (0, R.jsxs)(`div`, {
    className: `tracking-pattern`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `tracking-topbar`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `Référence du dossier` }),
              (0, R.jsx)(`strong`, { children: `BF-2026-0148` }),
            ],
          }),
          (0, R.jsxs)(z, {
            variant: `outline`,
            size: `sm`,
            children: [(0, R.jsx)(j, {}), ` Actions`],
          }),
        ],
      }),
      (0, R.jsx)(Dn, {
        variant: `success`,
        title: `Votre document est disponible`,
        children: `Téléchargez-le depuis cet espace. Il restera accessible pendant 90 jours.`,
      }),
      (0, R.jsxs)(`div`, {
        className: `tracking-grid`,
        children: [
          (0, R.jsxs)(V, {
            className: `tracking-card`,
            children: [
              (0, R.jsxs)(`div`, {
                className: `tracking-heading`,
                children: [
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(B, {
                        variant: `success`,
                        children: `Terminé`,
                      }),
                      (0, R.jsx)(`h3`, {
                        children: `Certificat de nationalité`,
                      }),
                    ],
                  }),
                  (0, R.jsx)(`span`, { children: (0, R.jsx)(ge, {}) }),
                ],
              }),
              (0, R.jsxs)(`dl`, {
                className: `tracking-details`,
                children: [
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Demandeur` }),
                      (0, R.jsx)(`dd`, { children: `Adama Ouédraogo` }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Date de la demande` }),
                      (0, R.jsx)(`dd`, { children: `23 juillet 2026` }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Service instructeur` }),
                      (0, R.jsx)(`dd`, {
                        children: `Tribunal de grande instance`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(z, {
                width: `full`,
                children: [(0, R.jsx)(pe, {}), ` Télécharger le certificat`],
              }),
            ],
          }),
          (0, R.jsxs)(V, {
            className: `timeline-card`,
            children: [
              (0, R.jsx)(`h3`, { children: `Historique du dossier` }),
              (0, R.jsx)(`ol`, {
                className: `case-timeline`,
                children: Gn.map((e, t) =>
                  (0, R.jsxs)(
                    `li`,
                    {
                      children: [
                        (0, R.jsx)(`span`, {
                          className: L(`timeline-dot`, t === 0 && `current`),
                          children: (0, R.jsx)(T, {}),
                        }),
                        (0, R.jsxs)(`div`, {
                          children: [
                            (0, R.jsx)(`strong`, { children: e.title }),
                            (0, R.jsx)(`p`, { children: e.text }),
                            (0, R.jsxs)(`small`, {
                              children: [(0, R.jsx)(oe, {}), ` `, e.date],
                            }),
                          ],
                        }),
                      ],
                    },
                    e.title,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function qn({
  label: e = `Ajouter un document`,
  accept: t = `.pdf,.jpg,.jpeg,.png`,
  maxSize: n = `5 Mo`,
}) {
  let r = (0, h.useId)(),
    [i, a] = (0, h.useState)(null);
  return (0, R.jsxs)(`div`, {
    children: [
      (0, R.jsxs)(`label`, {
        className: L(`file-dropzone`, i && `has-file`),
        htmlFor: r,
        children: [
          (0, R.jsx)(`input`, {
            id: r,
            type: `file`,
            accept: t,
            onChange: (e) => a(e.target.files?.[0] ?? null),
          }),
          i ? (0, R.jsx)(ye, {}) : (0, R.jsx)(fe, {}),
          (0, R.jsx)(`strong`, { children: i ? i.name : e }),
          (0, R.jsx)(`span`, {
            children: i
              ? `${Math.max(0.1, i.size / 1024 / 1024).toFixed(1)} Mo`
              : `PDF, JPG ou PNG · ${n} maximum`,
          }),
          i ? null : (0, R.jsx)(`em`, { children: `Parcourir les fichiers` }),
        ],
      }),
      i
        ? (0, R.jsxs)(`button`, {
            className: `file-remove`,
            onClick: () => a(null),
            children: [(0, R.jsx)(M, {}), ` Retirer le fichier`],
          })
        : null,
    ],
  });
}
function Jn({ length: e = 6, label: t = `Code de vérification` }) {
  let [n, r] = (0, h.useState)(() => Array.from({ length: e }, () => ``)),
    i = (0, h.useRef)([]);
  return (0, R.jsxs)(`fieldset`, {
    className: `otp-field`,
    children: [
      (0, R.jsx)(`legend`, { children: t }),
      (0, R.jsx)(`div`, {
        children: n.map((t, n) =>
          (0, R.jsx)(
            `input`,
            {
              ref: (e) => {
                i.current[n] = e;
              },
              value: t,
              inputMode: `numeric`,
              autoComplete: n === 0 ? `one-time-code` : `off`,
              "aria-label": `Chiffre ${n + 1} sur ${e}`,
              maxLength: 1,
              onChange: (e) => {
                let t = e.target.value.replace(/\D/g, ``).slice(-1);
                (r((e) => e.map((e, r) => (r === n ? t : e))),
                  t && i.current[n + 1]?.focus());
              },
              onKeyDown: (e) => {
                e.key === `Backspace` && !t && i.current[n - 1]?.focus();
              },
            },
            n,
          ),
        ),
      }),
    ],
  });
}
function Yn({ label: e = `Date` }) {
  let t = (0, h.useId)();
  return (0, R.jsxs)(`div`, {
    className: `field`,
    children: [
      (0, R.jsx)(`div`, {
        className: `field-label-row`,
        children: (0, R.jsx)(`label`, { htmlFor: t, children: e }),
      }),
      (0, R.jsx)(Pn, { id: t, type: `date`, leadingIcon: (0, R.jsx)(oe, {}) }),
    ],
  });
}
function Xn({ label: e = `Numéro de téléphone` }) {
  let t = (0, h.useId)();
  return (0, R.jsxs)(`div`, {
    className: `field`,
    children: [
      (0, R.jsx)(`div`, {
        className: `field-label-row`,
        children: (0, R.jsx)(`label`, { htmlFor: t, children: e }),
      }),
      (0, R.jsxs)(`div`, {
        className: `phone-field`,
        children: [
          (0, R.jsx)(`span`, { children: `+226` }),
          (0, R.jsx)(Pn, {
            id: t,
            inputMode: `tel`,
            placeholder: `70 00 00 00`,
            "aria-describedby": `${t}-hint`,
          }),
        ],
      }),
      (0, R.jsx)(`p`, {
        className: `field-message`,
        id: `${t}-hint`,
        children: `Huit chiffres, sans l’indicatif.`,
      }),
    ],
  });
}
function Zn({ label: e = `Commune`, options: t }) {
  let n = (0, h.useId)(),
    r = `${n}-options`;
  return (0, R.jsxs)(`div`, {
    className: `field`,
    children: [
      (0, R.jsx)(`div`, {
        className: `field-label-row`,
        children: (0, R.jsx)(`label`, { htmlFor: n, children: e }),
      }),
      (0, R.jsx)(Pn, {
        id: n,
        list: r,
        leadingIcon: (0, R.jsx)(Pe, {}),
        placeholder: `Rechercher…`,
        autoComplete: `off`,
      }),
      (0, R.jsx)(`datalist`, {
        id: r,
        children: t.map((e) => (0, R.jsx)(`option`, { value: e }, e)),
      }),
    ],
  });
}
function Qn({ errors: e }) {
  return (0, R.jsxs)(`div`, {
    className: `error-summary`,
    role: `alert`,
    tabIndex: -1,
    children: [
      (0, R.jsx)(E, {}),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`strong`, {
            children: `Corrigez les informations suivantes`,
          }),
          (0, R.jsx)(`ul`, {
            children: e.map((e) =>
              (0, R.jsx)(
                `li`,
                {
                  children: (0, R.jsx)(`a`, {
                    href: `#${e.field}`,
                    children: e.message,
                  }),
                },
                e.field,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function $n({ items: e }) {
  let [t, n] = (0, h.useState)(0);
  return (0, R.jsx)(`div`, {
    className: `accordion`,
    children: e.map((e, r) =>
      (0, R.jsxs)(
        `div`,
        {
          children: [
            (0, R.jsxs)(`button`, {
              "aria-expanded": t === r,
              onClick: () => n(t === r ? null : r),
              children: [e.title, (0, R.jsx)(se, {})],
            }),
            t === r ? (0, R.jsx)(`div`, { children: e.content }) : null,
          ],
        },
        e.title,
      ),
    ),
  });
}
function er({
  icon: e = (0, R.jsx)(ve, {}),
  title: t,
  description: n,
  action: r,
}) {
  return (0, R.jsxs)(`div`, {
    className: `empty-state`,
    children: [
      (0, R.jsx)(`span`, { children: e }),
      (0, R.jsx)(`h3`, { children: t }),
      (0, R.jsx)(`p`, { children: n }),
      r,
    ],
  });
}
function tr({ label: e = `Chargement en cours` }) {
  return (0, R.jsxs)(`span`, {
    className: `spinner`,
    role: `status`,
    children: [
      (0, R.jsx)(Te, {}),
      (0, R.jsx)(`span`, { className: `sr-only`, children: e }),
    ],
  });
}
function nr({ label: e, children: t }) {
  return (0, R.jsxs)(`span`, {
    className: `tooltip`,
    children: [
      (0, R.jsx)(`span`, { tabIndex: 0, children: t }),
      (0, R.jsx)(`span`, { role: `tooltip`, children: e }),
    ],
  });
}
function rr({ title: e, children: t, onDismiss: n }) {
  return (0, R.jsxs)(`div`, {
    className: `toast`,
    role: `status`,
    children: [
      (0, R.jsx)(`span`, { children: (0, R.jsx)(T, {}) }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`strong`, { children: e }),
          t ? (0, R.jsx)(`p`, { children: t }) : null,
        ],
      }),
      (0, R.jsx)(`button`, {
        onClick: n,
        "aria-label": `Fermer la notification`,
        children: (0, R.jsx)(M, {}),
      }),
    ],
  });
}
function ir({ children: e }) {
  return (0, R.jsxs)(`div`, {
    className: `global-banner`,
    children: [
      (0, R.jsx)(we, {}),
      ` `,
      (0, R.jsx)(`div`, { children: e }),
      (0, R.jsx)(z, { variant: `link`, children: `En savoir plus` }),
    ],
  });
}
function ar({ name: e, src: t, size: n = `default` }) {
  let r = e
    .split(` `)
    .map((e) => e[0])
    .slice(0, 2)
    .join(``)
    .toUpperCase();
  return (0, R.jsx)(`span`, {
    className: L(`avatar`, `avatar-${n}`),
    children: t ? (0, R.jsx)(`img`, { src: t, alt: `` }) : r,
  });
}
function or({ label: e }) {
  return (0, R.jsx)(`div`, {
    className: `separator`,
    role: `separator`,
    children: e ? (0, R.jsx)(`span`, { children: e }) : null,
  });
}
function sr({ items: e }) {
  return (0, R.jsx)(`dl`, {
    className: `data-list`,
    children: e.map((e) =>
      (0, R.jsxs)(
        `div`,
        {
          children: [
            (0, R.jsx)(`dt`, { children: e.label }),
            (0, R.jsx)(`dd`, { children: e.value }),
          ],
        },
        e.label,
      ),
    ),
  });
}
function cr({ label: e, value: t, detail: n, icon: r }) {
  return (0, R.jsxs)(`div`, {
    className: `stat-card`,
    children: [
      r ? (0, R.jsx)(`span`, { children: r }) : null,
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`small`, { children: e }),
          (0, R.jsx)(`strong`, { children: t }),
          n ? (0, R.jsx)(`p`, { children: n }) : null,
        ],
      }),
    ],
  });
}
var lr = `button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])`;
function ur({ open: e, containerRef: t, onDismiss: n, lockScroll: r = !1 }) {
  (0, h.useEffect)(() => {
    if (!e) return;
    let i = document.activeElement,
      a = document.body.style.overflow;
    r && (document.body.style.overflow = `hidden`);
    let o = requestAnimationFrame(() => t.current?.querySelector(lr)?.focus());
    function s(e) {
      if (e.key === `Escape`) {
        (e.preventDefault(), n());
        return;
      }
      if (e.key !== `Tab`) return;
      let r = [...(t.current?.querySelectorAll(lr) ?? [])];
      if (!r.length) {
        (e.preventDefault(), t.current?.focus());
        return;
      }
      let i = r[0],
        a = r.at(-1);
      e.shiftKey && document.activeElement === i
        ? (e.preventDefault(), a?.focus())
        : !e.shiftKey &&
          document.activeElement === a &&
          (e.preventDefault(), i?.focus());
    }
    return (
      document.addEventListener(`keydown`, s),
      () => {
        (cancelAnimationFrame(o),
          document.removeEventListener(`keydown`, s),
          r && (document.body.style.overflow = a),
          i?.focus());
      }
    );
  }, [t, r, n, e]);
}
function dr({
  open: e,
  onOpenChange: t,
  title: n,
  description: r,
  children: i,
}) {
  let a = (0, h.useId)(),
    o = (0, h.useId)(),
    s = (0, h.useRef)(null);
  return (
    ur({ open: e, containerRef: s, onDismiss: () => t(!1), lockScroll: !0 }),
    e
      ? (0, R.jsxs)(`div`, {
          className: `dialog-layer`,
          children: [
            (0, R.jsx)(`button`, {
              className: `dialog-backdrop`,
              onClick: () => t(!1),
              "aria-label": `Fermer la fenêtre`,
            }),
            (0, R.jsxs)(`div`, {
              ref: s,
              className: `dialog-panel`,
              role: `dialog`,
              "aria-modal": `true`,
              "aria-labelledby": a,
              "aria-describedby": r ? o : void 0,
              children: [
                (0, R.jsx)(z, {
                  className: `dialog-close`,
                  size: `icon-sm`,
                  variant: `ghost`,
                  onClick: () => t(!1),
                  "aria-label": `Fermer`,
                  children: (0, R.jsx)(M, {}),
                }),
                (0, R.jsx)(`h2`, { id: a, children: n }),
                r ? (0, R.jsx)(`p`, { id: o, children: r }) : null,
                i,
              ],
            }),
          ],
        })
      : null
  );
}
var fr = (0, h.forwardRef)(
  ({ className: e, variant: t = `link`, size: n = `default`, ...r }, i) =>
    (0, R.jsx)(`a`, {
      ref: i,
      className: L(xn({ variant: t, size: n }), e),
      ...r,
    }),
);
fr.displayName = `Link`;
var pr = (0, h.forwardRef)(
  (
    { label: e, size: t = `default`, className: n, type: r = `button`, ...i },
    a,
  ) =>
    (0, R.jsx)(`button`, {
      ref: a,
      type: r,
      "aria-label": e,
      className: L(`icon-control`, `icon-control-${t}`, n),
      ...i,
    }),
);
pr.displayName = `IconButton`;
function mr({ optional: e, children: t, className: n, ...r }) {
  return (0, R.jsxs)(`div`, {
    className: `form-label-row`,
    children: [
      (0, R.jsx)(`label`, { className: n, ...r, children: t }),
      e ? (0, R.jsx)(`span`, { children: `Facultatif` }) : null,
    ],
  });
}
function hr({ error: e, children: t, id: n }) {
  return (0, R.jsx)(`p`, {
    id: n,
    className: L(`form-message`, e && `error`),
    role: e ? `alert` : void 0,
    children: t,
  });
}
function gr({
  label: e,
  hint: t,
  error: n,
  optional: r,
  required: i,
  children: a,
}) {
  let o = (0, h.useId)(),
    s = a.props.id ?? o,
    c = t || n ? `${s}-message` : void 0;
  return (0, R.jsxs)(`div`, {
    className: `form-field`,
    children: [
      (0, R.jsxs)(mr, {
        htmlFor: s,
        optional: r,
        children: [
          e,
          i
            ? (0, R.jsx)(`span`, { "aria-hidden": `true`, children: ` *` })
            : null,
        ],
      }),
      (0, h.cloneElement)(a, {
        id: s,
        "aria-describedby": c,
        "aria-invalid": !!n || void 0,
      }),
      n
        ? (0, R.jsx)(hr, { id: c, error: !0, children: n })
        : t
          ? (0, R.jsx)(hr, { id: c, children: t })
          : null,
    ],
  });
}
function _r({ trigger: e, children: t, align: n = `start`, label: r }) {
  let [i, a] = (0, h.useState)(!1),
    o = (0, h.useRef)(null),
    s = (0, h.useId)();
  return (
    (0, h.useEffect)(() => {
      if (!i) return;
      function e(e) {
        o.current?.contains(e.target) || a(!1);
      }
      function t(e) {
        e.key === `Escape` &&
          (a(!1), o.current?.querySelector(`:scope > button`)?.focus());
      }
      return (
        document.addEventListener(`pointerdown`, e),
        document.addEventListener(`keydown`, t),
        () => {
          (document.removeEventListener(`pointerdown`, e),
            document.removeEventListener(`keydown`, t));
        }
      );
    }, [i]),
    (0, R.jsxs)(`div`, {
      className: `popover-root`,
      ref: o,
      children: [
        (0, h.cloneElement)(e, {
          "aria-expanded": i,
          "aria-controls": i ? s : void 0,
          onClick: (t) => {
            (e.props.onClick?.(t), a((e) => !e));
          },
        }),
        i
          ? (0, R.jsx)(`div`, {
              id: s,
              className: L(`popover-panel`, `popover-${n}`),
              role: `dialog`,
              "aria-label": r,
              children: t,
            })
          : null,
      ],
    })
  );
}
function vr({
  options: e,
  onSelect: t,
  placeholder: n = `Rechercher…`,
  emptyText: r = `Aucun résultat`,
}) {
  let [i, a] = (0, h.useState)(``),
    [o, s] = (0, h.useState)(0),
    c = (0, h.useId)(),
    l = i.trim().toLocaleLowerCase(`fr`),
    u = l
      ? e.filter((e) =>
          [e.label, e.description, ...(e.keywords ?? [])]
            .filter(Boolean)
            .join(` `)
            .toLocaleLowerCase(`fr`)
            .includes(l),
        )
      : e;
  function d(e) {
    let n = u[e];
    n && (t(n), a(n.label));
  }
  return (0, R.jsxs)(`div`, {
    className: `command-search`,
    children: [
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(Pe, { "aria-hidden": `true` }),
          (0, R.jsx)(`input`, {
            role: `combobox`,
            "aria-expanded": !!i,
            "aria-controls": i ? c : void 0,
            "aria-autocomplete": `list`,
            "aria-activedescendant": i && u[o] ? `${c}-${o}` : void 0,
            value: i,
            placeholder: n,
            onChange: (e) => {
              (a(e.target.value), s(0));
            },
            onKeyDown: (e) => {
              e.key === `ArrowDown`
                ? (e.preventDefault(), s((e) => Math.min(e + 1, u.length - 1)))
                : e.key === `ArrowUp`
                  ? (e.preventDefault(), s((e) => Math.max(e - 1, 0)))
                  : e.key === `Enter`
                    ? (e.preventDefault(), d(o))
                    : e.key === `Escape` && a(``);
            },
          }),
          i
            ? (0, R.jsx)(`button`, {
                type: `button`,
                onClick: () => a(``),
                "aria-label": `Effacer la recherche`,
                children: (0, R.jsx)(M, {}),
              })
            : null,
        ],
      }),
      i
        ? (0, R.jsx)(`div`, {
            id: c,
            role: `listbox`,
            children: u.length
              ? u.map((e, t) =>
                  (0, R.jsxs)(
                    `button`,
                    {
                      type: `button`,
                      role: `option`,
                      "aria-selected": t === o,
                      id: `${c}-${t}`,
                      onMouseEnter: () => s(t),
                      onClick: () => d(t),
                      children: [
                        (0, R.jsx)(`strong`, { children: e.label }),
                        e.description
                          ? (0, R.jsx)(`small`, { children: e.description })
                          : null,
                      ],
                    },
                    e.value,
                  ),
                )
              : (0, R.jsx)(`p`, { children: r }),
          })
        : null,
    ],
  });
}
var yr = [`Lu`, `Ma`, `Me`, `Je`, `Ve`, `Sa`, `Di`],
  br = new Intl.DateTimeFormat(`fr-BF`, { month: `long`, year: `numeric` }),
  xr = new Intl.DateTimeFormat(`fr-BF`, { dateStyle: `long` });
function Sr(e, t) {
  return (
    e.getFullYear() === t.getFullYear() &&
    e.getMonth() === t.getMonth() &&
    e.getDate() === t.getDate()
  );
}
function Cr({ value: e, onValueChange: t, min: n, max: r }) {
  let [i, a] = (0, h.useState)(
      () =>
        new Date(
          e?.getFullYear() ?? new Date().getFullYear(),
          e?.getMonth() ?? new Date().getMonth(),
          1,
        ),
    ),
    o = (i.getDay() + 6) % 7,
    s = new Date(i.getFullYear(), i.getMonth() + 1, 0).getDate();
  return (0, R.jsxs)(`div`, {
    className: `calendar`,
    children: [
      (0, R.jsxs)(`header`, {
        children: [
          (0, R.jsx)(pr, {
            label: `Mois précédent`,
            size: `sm`,
            onClick: () => a(new Date(i.getFullYear(), i.getMonth() - 1, 1)),
            children: (0, R.jsx)(ce, {}),
          }),
          (0, R.jsx)(`strong`, { children: br.format(i) }),
          (0, R.jsx)(pr, {
            label: `Mois suivant`,
            size: `sm`,
            onClick: () => a(new Date(i.getFullYear(), i.getMonth() + 1, 1)),
            children: (0, R.jsx)(le, {}),
          }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        className: `calendar-grid`,
        children: [
          yr.map((e) => (0, R.jsx)(`span`, { children: e }, e)),
          Array.from({ length: o }, (e, t) =>
            (0, R.jsx)(`i`, {}, `empty-${t}`),
          ),
          Array.from({ length: s }, (a, o) => {
            let s = new Date(i.getFullYear(), i.getMonth(), o + 1);
            return (0, R.jsx)(
              `button`,
              {
                type: `button`,
                disabled: !!((n && s < n) || (r && s > r)),
                className: L(
                  e && Sr(s, e) && `selected`,
                  Sr(s, new Date()) && `today`,
                ),
                "aria-label": xr.format(s),
                "aria-pressed": e ? Sr(s, e) : !1,
                onClick: () => t(s),
                children: o + 1,
              },
              s.toISOString(),
            );
          }),
        ],
      }),
    ],
  });
}
function wr({
  value: e,
  onValueChange: t,
  label: n = `Choisir une date`,
  placeholder: r = `Sélectionner une date`,
}) {
  return (0, R.jsx)(_r, {
    label: n,
    trigger: (0, R.jsxs)(`button`, {
      type: `button`,
      className: `date-picker-trigger`,
      children: [(0, R.jsx)(oe, {}), e ? xr.format(e) : r],
    }),
    children: (0, R.jsx)(Cr, { value: e, onValueChange: t }),
  });
}
function Tr({
  columns: e,
  data: t,
  getRowKey: n,
  caption: r,
  emptyTitle: i = `Aucune donnée`,
  emptyDescription: a = `Aucun élément ne correspond à cette liste.`,
  loading: o = !1,
  selectedKeys: s,
  onSelectedKeysChange: c,
  sort: l,
  onSortChange: u,
  page: d = 1,
  pageSize: f,
  totalItems: p,
  onPageChange: m,
}) {
  let [g, _] = (0, h.useState)(null),
    v = l === void 0 ? g : l,
    y = v ? e.find((e) => e.key === v.key) : void 0,
    b = y?.sortValue
      ? [...t].sort((e, t) => {
          let n = y.sortValue?.(e) ?? ``,
            r = y.sortValue?.(t) ?? ``,
            i =
              typeof n == `number` && typeof r == `number`
                ? n - r
                : String(n).localeCompare(String(r), `fr`, { numeric: !0 });
          return v?.direction === `desc` ? -i : i;
        })
      : t;
  function x(e) {
    let t =
      v?.key === e
        ? { key: e, direction: v.direction === `asc` ? `desc` : `asc` }
        : { key: e, direction: `asc` };
    (l === void 0 && _(t), u?.(t));
  }
  let S = !!(s && c),
    C = b.map(n),
    ne = C.length > 0 && C.every((e) => s?.includes(e)),
    w = f ? Math.max(1, Math.ceil((p ?? t.length) / f)) : 1;
  return (0, R.jsxs)(`div`, {
    className: `data-table-wrap`,
    children: [
      (0, R.jsxs)(`table`, {
        className: `data-table`,
        children: [
          r ? (0, R.jsx)(`caption`, { children: r }) : null,
          (0, R.jsx)(`thead`, {
            children: (0, R.jsxs)(`tr`, {
              children: [
                S
                  ? (0, R.jsx)(`th`, {
                      className: `data-table-select`,
                      children: (0, R.jsx)(`input`, {
                        type: `checkbox`,
                        "aria-label": `Sélectionner toutes les lignes`,
                        checked: ne,
                        onChange: () =>
                          c?.(
                            ne
                              ? (s ?? []).filter((e) => !C.includes(e))
                              : [...new Set([...(s ?? []), ...C])],
                          ),
                      }),
                    })
                  : null,
                e.map((e) => {
                  let t = !!e.sortValue,
                    n = v?.key === e.key ? v.direction : void 0,
                    r = n === `asc` ? re : n === `desc` ? ee : te;
                  return (0, R.jsx)(
                    `th`,
                    {
                      className: L(`is-${e.align ?? `left`}`, e.className),
                      "aria-sort": n
                        ? n === `asc`
                          ? `ascending`
                          : `descending`
                        : void 0,
                      children: t
                        ? (0, R.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => x(e.key),
                            children: [
                              e.header,
                              (0, R.jsx)(r, { "aria-hidden": `true` }),
                            ],
                          })
                        : e.header,
                    },
                    e.key,
                  );
                }),
              ],
            }),
          }),
          (0, R.jsx)(`tbody`, {
            children: o
              ? (0, R.jsx)(`tr`, {
                  children: (0, R.jsx)(`td`, {
                    className: `data-table-empty`,
                    colSpan: e.length + +!!S,
                    "aria-live": `polite`,
                    children: (0, R.jsx)(`strong`, {
                      children: `Chargement des données…`,
                    }),
                  }),
                })
              : b.length
                ? b.map((t) => {
                    let r = n(t),
                      i = s?.includes(r) ?? !1;
                    return (0, R.jsxs)(
                      `tr`,
                      {
                        "data-selected": i || void 0,
                        children: [
                          S
                            ? (0, R.jsx)(`td`, {
                                className: `data-table-select`,
                                children: (0, R.jsx)(`input`, {
                                  type: `checkbox`,
                                  "aria-label": `Sélectionner la ligne ${r}`,
                                  checked: i,
                                  onChange: () =>
                                    c?.(
                                      i
                                        ? (s ?? []).filter((e) => e !== r)
                                        : [...(s ?? []), r],
                                    ),
                                }),
                              })
                            : null,
                          e.map((e) =>
                            (0, R.jsx)(
                              `td`,
                              {
                                className: L(
                                  `is-${e.align ?? `left`}`,
                                  e.className,
                                ),
                                children: e.cell(t),
                              },
                              e.key,
                            ),
                          ),
                        ],
                      },
                      r,
                    );
                  })
                : (0, R.jsx)(`tr`, {
                    children: (0, R.jsxs)(`td`, {
                      className: `data-table-empty`,
                      colSpan: e.length + +!!S,
                      children: [
                        (0, R.jsx)(`strong`, { children: i }),
                        (0, R.jsx)(`span`, { children: a }),
                      ],
                    }),
                  }),
          }),
        ],
      }),
      f && w > 1
        ? (0, R.jsxs)(`nav`, {
            className: `data-table-pagination`,
            "aria-label": `Pagination du tableau`,
            children: [
              (0, R.jsx)(`button`, {
                type: `button`,
                disabled: d <= 1,
                onClick: () => m?.(d - 1),
                children: `Précédent`,
              }),
              (0, R.jsxs)(`span`, { children: [`Page `, d, ` sur `, w] }),
              (0, R.jsx)(`button`, {
                type: `button`,
                disabled: d >= w,
                onClick: () => m?.(d + 1),
                children: `Suivant`,
              }),
            ],
          })
        : null,
    ],
  });
}
function Er({
  open: e,
  onOpenChange: t,
  title: n,
  description: r,
  side: i = `right`,
  children: a,
  footer: o,
}) {
  let s = (0, h.useId)(),
    c = (0, h.useId)(),
    l = (0, h.useRef)(null);
  return (
    ur({ open: e, containerRef: l, onDismiss: () => t(!1), lockScroll: !0 }),
    e
      ? (0, R.jsxs)(`div`, {
          className: `drawer-layer`,
          children: [
            (0, R.jsx)(`button`, {
              className: `drawer-backdrop`,
              type: `button`,
              onClick: () => t(!1),
              "aria-label": `Fermer le panneau`,
            }),
            (0, R.jsxs)(`div`, {
              ref: l,
              className: L(`drawer-panel`, `drawer-${i}`),
              role: `dialog`,
              "aria-modal": `true`,
              "aria-labelledby": s,
              "aria-describedby": r ? c : void 0,
              children: [
                (0, R.jsxs)(`header`, {
                  children: [
                    (0, R.jsxs)(`div`, {
                      children: [
                        (0, R.jsx)(`h2`, { id: s, children: n }),
                        r ? (0, R.jsx)(`p`, { id: c, children: r }) : null,
                      ],
                    }),
                    (0, R.jsx)(z, {
                      size: `icon-sm`,
                      variant: `ghost`,
                      onClick: () => t(!1),
                      "aria-label": `Fermer`,
                      children: (0, R.jsx)(M, {}),
                    }),
                  ],
                }),
                (0, R.jsx)(`div`, { className: `drawer-content`, children: a }),
                o ? (0, R.jsx)(`footer`, { children: o }) : null,
              ],
            }),
          ],
        })
      : null
  );
}
function Dr({ trigger: e, label: t, align: n = `end`, children: r }) {
  let [i, a] = (0, h.useState)(!1),
    o = (0, h.useId)(),
    s = (0, h.useRef)(null);
  function c() {
    s.current?.querySelector(`:scope > button`)?.focus();
  }
  function l(e) {
    let t = [
      ...(s.current?.querySelectorAll(
        `[role='menuitem']:not([aria-disabled='true'])`,
      ) ?? []),
    ];
    t[(e + t.length) % t.length]?.focus();
  }
  (0, h.useEffect)(() => {
    if (!i) return;
    function e(e) {
      s.current?.contains(e.target) || a(!1);
    }
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  }, [i]);
  function u(e) {
    let t = [
        ...(s.current?.querySelectorAll(
          `[role='menuitem']:not([aria-disabled='true'])`,
        ) ?? []),
      ],
      n = t.indexOf(document.activeElement);
    e.key === `ArrowDown`
      ? (e.preventDefault(), l(n + 1))
      : e.key === `ArrowUp`
        ? (e.preventDefault(), l(n - 1))
        : e.key === `Home`
          ? (e.preventDefault(), l(0))
          : e.key === `End`
            ? (e.preventDefault(), l(t.length - 1))
            : e.key === `Escape`
              ? (a(!1), c())
              : e.key === `Tab` && a(!1);
  }
  return (0, R.jsxs)(`div`, {
    className: `dropdown-root`,
    ref: s,
    children: [
      (0, h.cloneElement)(e, {
        "aria-haspopup": `menu`,
        "aria-expanded": i,
        "aria-controls": i ? o : void 0,
        onClick: (t) => {
          (e.props.onClick?.(t), a((e) => !e));
        },
        onKeyDown: (t) => {
          (e.props.onKeyDown?.(t),
            [`ArrowDown`, `ArrowUp`].includes(t.key) &&
              (t.preventDefault(),
              a(!0),
              requestAnimationFrame(() => l(t.key === `ArrowUp` ? -1 : 0))));
        },
      }),
      i
        ? (0, R.jsx)(`div`, {
            id: o,
            role: `menu`,
            "aria-label": t,
            className: L(`dropdown-panel`, `dropdown-${n}`),
            onKeyDown: u,
            onClick: (e) => {
              let t = e.target.closest(`[role='menuitem']`);
              t && t.getAttribute(`aria-disabled`) !== `true` && a(!1);
            },
            children: r,
          })
        : null,
    ],
  });
}
function Or({
  children: e,
  icon: t,
  destructive: n,
  selected: r,
  disabled: i,
  onSelect: a,
}) {
  return (0, R.jsxs)(`button`, {
    type: `button`,
    role: `menuitem`,
    tabIndex: -1,
    "aria-disabled": i || void 0,
    className: L(`dropdown-item`, n && `destructive`),
    onClick: () => {
      i || a?.();
    },
    children: [
      t,
      (0, R.jsx)(`span`, { children: e }),
      r
        ? (0, R.jsx)(T, { className: `dropdown-check`, "aria-hidden": `true` })
        : null,
    ],
  });
}
function kr({ children: e }) {
  return (0, R.jsx)(`div`, { className: `dropdown-label`, children: e });
}
function Ar() {
  return (0, R.jsx)(`div`, {
    className: `dropdown-separator`,
    role: `separator`,
  });
}
function jr({
  open: e,
  onOpenChange: t,
  title: n,
  description: r,
  confirmLabel: i = `Confirmer`,
  cancelLabel: a = `Annuler`,
  destructive: o,
  onConfirm: s,
}) {
  return (0, R.jsx)(dr, {
    open: e,
    onOpenChange: t,
    title: n,
    description: r,
    children: (0, R.jsxs)(`div`, {
      className: `mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`,
      children: [
        (0, R.jsx)(z, {
          variant: `outline`,
          onClick: () => t(!1),
          children: a,
        }),
        (0, R.jsx)(z, {
          variant: o ? `destructive` : `default`,
          onClick: () => {
            (s(), t(!1));
          },
          children: i,
        }),
      ],
    }),
  });
}
function Mr({ children: e, onRemove: t, selected: n, disabled: r }) {
  return (0, R.jsxs)(`span`, {
    className: L(`tag`, n && `selected`, r && `disabled`),
    children: [
      n ? (0, R.jsx)(T, { "aria-hidden": `true` }) : null,
      (0, R.jsx)(`span`, { children: e }),
      t
        ? (0, R.jsx)(`button`, {
            type: `button`,
            disabled: r,
            onClick: t,
            "aria-label": `Retirer ${String(e)}`,
            children: (0, R.jsx)(M, {}),
          })
        : null,
    ],
  });
}
function Nr({ notifications: e, onRead: t, title: n = `Notifications` }) {
  let [r, i] = (0, h.useState)(!1),
    a = e.filter((e) => e.unread).length;
  return (0, R.jsxs)(R.Fragment, {
    children: [
      (0, R.jsxs)(`button`, {
        type: `button`,
        className: `notification-trigger`,
        "aria-label": `${n}, ${a} non lues`,
        onClick: () => i(!0),
        children: [
          (0, R.jsx)(w, {}),
          a ? (0, R.jsx)(`span`, { children: a > 9 ? `9+` : a }) : null,
        ],
      }),
      (0, R.jsx)(Er, {
        open: r,
        onOpenChange: i,
        title: n,
        description: a
          ? `${a} notification${a > 1 ? `s` : ``} non lue${a > 1 ? `s` : ``}`
          : `Vous êtes à jour`,
        children: e.length
          ? (0, R.jsx)(`div`, {
              className: `notification-list`,
              children: e.map((e) =>
                (0, R.jsxs)(
                  `a`,
                  {
                    href: e.href,
                    className: L(e.unread && `unread`),
                    onClick: () => t?.(e.id),
                    children: [
                      (0, R.jsx)(`i`, { "aria-hidden": `true` }),
                      (0, R.jsxs)(`span`, {
                        children: [
                          (0, R.jsx)(`strong`, { children: e.title }),
                          e.description
                            ? (0, R.jsx)(`small`, { children: e.description })
                            : null,
                          e.time
                            ? (0, R.jsx)(`time`, { children: e.time })
                            : null,
                        ],
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            })
          : (0, R.jsxs)(`div`, {
              className: `notification-empty`,
              children: [
                (0, R.jsx)(w, {}),
                (0, R.jsx)(`strong`, { children: `Aucune notification` }),
                (0, R.jsx)(`p`, {
                  children: `Les mises à jour de vos démarches apparaîtront ici.`,
                }),
              ],
            }),
      }),
    ],
  });
}
function Pr({
  name: e,
  size: t,
  type: n,
  status: r = `ready`,
  onRemove: i,
  onOpen: a,
}) {
  return (0, R.jsxs)(`div`, {
    className: L(`file-preview`, r),
    children: [
      (0, R.jsx)(`span`, { children: (0, R.jsx)(_e, {}) }),
      (0, R.jsxs)(`button`, {
        type: `button`,
        onClick: a,
        disabled: !a,
        children: [
          (0, R.jsx)(`strong`, { children: e }),
          (0, R.jsxs)(`small`, {
            children: [
              [n, t].filter(Boolean).join(` · `),
              r === `uploading`
                ? ` · Téléversement…`
                : r === `error`
                  ? ` · Échec du téléversement`
                  : ``,
            ],
          }),
        ],
      }),
      i
        ? (0, R.jsx)(pr, {
            size: `sm`,
            label: `Retirer ${e}`,
            onClick: i,
            children: (0, R.jsx)(M, {}),
          })
        : null,
    ],
  });
}
function Fr({ items: e, ariaLabel: t = `Navigation principale` }) {
  let [n, r] = (0, h.useState)(null);
  return (0, R.jsx)(`nav`, {
    className: `navigation-menu`,
    "aria-label": t,
    children: (0, R.jsx)(`ul`, {
      children: e.map((e) =>
        (0, R.jsx)(
          `li`,
          {
            children: e.children
              ? (0, R.jsxs)(R.Fragment, {
                  children: [
                    (0, R.jsxs)(`button`, {
                      type: `button`,
                      "aria-expanded": n === e.label,
                      onClick: () => r((t) => (t === e.label ? null : e.label)),
                      children: [e.icon, e.label, (0, R.jsx)(se, {})],
                    }),
                    n === e.label
                      ? (0, R.jsx)(`ul`, {
                          className: `navigation-submenu`,
                          children: e.children.map((e) =>
                            (0, R.jsx)(
                              `li`,
                              {
                                children: (0, R.jsxs)(`a`, {
                                  href: e.href,
                                  children: [
                                    e.icon,
                                    (0, R.jsxs)(`span`, {
                                      children: [
                                        (0, R.jsx)(`strong`, {
                                          children: e.label,
                                        }),
                                        e.description
                                          ? (0, R.jsx)(`small`, {
                                              children: e.description,
                                            })
                                          : null,
                                      ],
                                    }),
                                  ],
                                }),
                              },
                              e.label,
                            ),
                          ),
                        })
                      : null,
                  ],
                })
              : (0, R.jsxs)(`a`, { href: e.href, children: [e.icon, e.label] }),
          },
          e.label,
        ),
      ),
    }),
  });
}
function Ir({
  eyebrow: e,
  title: t,
  description: n,
  actions: r,
  breadcrumbs: i,
}) {
  return (0, R.jsxs)(`header`, {
    className: `page-header`,
    children: [
      i,
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              e ? (0, R.jsx)(`span`, { children: e }) : null,
              (0, R.jsx)(`h1`, { children: t }),
              n ? (0, R.jsx)(`p`, { children: n }) : null,
            ],
          }),
          r ? (0, R.jsx)(`aside`, { children: r }) : null,
        ],
      }),
    ],
  });
}
function Lr({ title: e, description: t, action: n, className: r }) {
  return (0, R.jsxs)(`header`, {
    className: L(`section-header`, r),
    children: [
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`h2`, { children: e }),
          t ? (0, R.jsx)(`p`, { children: t }) : null,
        ],
      }),
      n,
    ],
  });
}
function Rr({
  items: e,
  currentStep: t,
  orientation: n = `horizontal`,
  className: r,
}) {
  let i = Math.min(Math.max(t, 1), e.length);
  return (0, R.jsx)(`nav`, {
    className: L(`stepper`, `stepper-${n}`, r),
    "aria-label": `Progression de la démarche`,
    children: (0, R.jsx)(`ol`, {
      children: e.map((e, t) => {
        let n = t + 1,
          r = n < i ? `complete` : n === i ? `current` : `upcoming`;
        return (0, R.jsxs)(
          `li`,
          {
            className: r,
            "aria-current": r === `current` ? `step` : void 0,
            children: [
              (0, R.jsx)(`span`, {
                className: `stepper-marker`,
                "aria-hidden": `true`,
                children: r === `complete` ? (0, R.jsx)(T, {}) : n,
              }),
              (0, R.jsxs)(`span`, {
                className: `stepper-content`,
                children: [
                  (0, R.jsx)(`strong`, { children: e.label }),
                  e.description
                    ? (0, R.jsx)(`small`, { children: e.description })
                    : null,
                ],
              }),
            ],
          },
          `${n}-${e.label}`,
        );
      }),
    }),
  });
}
function zr({
  value: e,
  currency: t = `XOF`,
  locale: n = `fr-BF`,
  compact: r = !1,
}) {
  return (0, R.jsx)(`span`, {
    className: `amount`,
    children: new Intl.NumberFormat(n, {
      style: `currency`,
      currency: t,
      currencyDisplay: t === `XOF` ? `code` : `symbol`,
      maximumFractionDigits: 0,
      notation: r ? `compact` : `standard`,
    })
      .format(e)
      .replace(`XOF`, `FCFA`),
  });
}
function Br({ prefix: e = `address`, required: t }) {
  return (0, R.jsxs)(`fieldset`, {
    className: `address-field`,
    children: [
      (0, R.jsxs)(`legend`, { children: [(0, R.jsx)(Oe, {}), `Adresse`] }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(Fn, {
            id: `${e}-street`,
            label: `Adresse ou secteur`,
            placeholder: `Ex. Secteur 15`,
            required: t,
          }),
          (0, R.jsx)(Fn, {
            id: `${e}-city`,
            label: `Ville`,
            placeholder: `Ex. Ouagadougou`,
            required: t,
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`label`, {
                htmlFor: `${e}-region`,
                children: `Région`,
              }),
              (0, R.jsxs)(An, {
                id: `${e}-region`,
                defaultValue: ``,
                children: [
                  (0, R.jsx)(`option`, {
                    value: ``,
                    disabled: !0,
                    children: `Sélectionner une région`,
                  }),
                  (0, R.jsx)(`option`, { children: `Centre` }),
                  (0, R.jsx)(`option`, { children: `Hauts-Bassins` }),
                  (0, R.jsx)(`option`, { children: `Centre-Ouest` }),
                  (0, R.jsx)(`option`, { children: `Nord` }),
                ],
              }),
            ],
          }),
          (0, R.jsx)(Fn, {
            id: `${e}-country`,
            label: `Pays`,
            defaultValue: `Burkina Faso`,
            required: t,
          }),
        ],
      }),
    ],
  });
}
function Vr({ prefix: e = `identity` }) {
  return (0, R.jsxs)(`fieldset`, {
    className: `identity-field`,
    children: [
      (0, R.jsxs)(`legend`, {
        children: [(0, R.jsx)(he, {}), `Pièce d’identité`],
      }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`label`, {
                htmlFor: `${e}-type`,
                children: `Type de pièce`,
              }),
              (0, R.jsxs)(An, {
                id: `${e}-type`,
                defaultValue: `cnib`,
                children: [
                  (0, R.jsx)(`option`, { value: `cnib`, children: `CNIB` }),
                  (0, R.jsx)(`option`, {
                    value: `passport`,
                    children: `Passeport`,
                  }),
                  (0, R.jsx)(`option`, {
                    value: `consular`,
                    children: `Carte consulaire`,
                  }),
                ],
              }),
            ],
          }),
          (0, R.jsx)(Fn, {
            id: `${e}-number`,
            label: `Numéro de la pièce`,
            placeholder: `Ex. B12345678`,
            required: !0,
          }),
          (0, R.jsx)(Fn, {
            id: `${e}-issued`,
            label: `Date de délivrance`,
            type: `date`,
            required: !0,
          }),
          (0, R.jsx)(Fn, {
            id: `${e}-expires`,
            label: `Date d’expiration`,
            type: `date`,
            required: !0,
          }),
        ],
      }),
    ],
  });
}
function Hr({ items: e, fee: t, totalLabel: n = `Total à payer`, action: r }) {
  let i = e.reduce((e, t) => e + t.amount, t ?? 0);
  return (0, R.jsxs)(V, {
    className: `payment-summary`,
    children: [
      (0, R.jsxs)(`header`, {
        children: [
          (0, R.jsx)(A, {}),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`h3`, { children: `Récapitulatif du paiement` }),
              (0, R.jsx)(`p`, {
                children: `Les frais sont affichés avant validation.`,
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`dl`, {
        children: [
          e.map((e) =>
            (0, R.jsxs)(
              `div`,
              {
                children: [
                  (0, R.jsx)(`dt`, { children: e.label }),
                  (0, R.jsx)(`dd`, {
                    children: (0, R.jsx)(zr, { value: e.amount }),
                  }),
                ],
              },
              e.label,
            ),
          ),
          t
            ? (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`dt`, { children: `Frais de service` }),
                  (0, R.jsx)(`dd`, { children: (0, R.jsx)(zr, { value: t }) }),
                ],
              })
            : null,
          (0, R.jsxs)(`div`, {
            className: `payment-total`,
            children: [
              (0, R.jsx)(`dt`, { children: n }),
              (0, R.jsx)(`dd`, { children: (0, R.jsx)(zr, { value: i }) }),
            ],
          }),
        ],
      }),
      r ? (0, R.jsx)(`footer`, { children: r }) : null,
    ],
  });
}
function Ur({ label: e = `Actions`, children: t }) {
  return (0, R.jsx)(Dr, {
    label: e,
    trigger: (0, R.jsx)(z, {
      size: `icon-sm`,
      variant: `ghost`,
      "aria-label": e,
      children: (0, R.jsx)(j, {}),
    }),
    children: t,
  });
}
function Wr({ items: e, label: t = `Historique du dossier` }) {
  return (0, R.jsx)(`ol`, {
    className: `status-tracker`,
    "aria-label": t,
    children: e.map((e, t) =>
      (0, R.jsxs)(
        `li`,
        {
          className: e.status,
          children: [
            e.status === `complete`
              ? (0, R.jsx)(T, {})
              : e.status === `error`
                ? (0, R.jsx)(E, {})
                : (0, R.jsx)(de, {}),
            (0, R.jsxs)(`div`, {
              children: [
                (0, R.jsx)(`strong`, { children: e.title }),
                e.description
                  ? (0, R.jsx)(`p`, { children: e.description })
                  : null,
                e.date ? (0, R.jsx)(`time`, { children: e.date }) : null,
              ],
            }),
            e.status === `current`
              ? (0, R.jsx)(B, {
                  variant: `information`,
                  size: `sm`,
                  children: `En cours`,
                })
              : null,
          ],
        },
        `${e.title}-${t}`,
      ),
    ),
  });
}
var Gr = `/fasodesign/`.endsWith(`/`) ? `/fasodesign/` : `/fasodesign//`;
function Kr(e = ``) {
  return `${Gr}${e.replace(/^\//, ``)}`;
}
function qr(e) {
  let t = Gr.replace(/\/$/, ``);
  return t && e.startsWith(t) ? e.slice(t.length) || `/` : e;
}
var Jr = [
    {
      label: `Commencer`,
      icon: ie,
      items: [`Vue d’ensemble`, `Installation`, `Principes`],
    },
    {
      label: `Fondations`,
      icon: je,
      items: [`Couleurs`, `Typographie`, `Espacement`, `Iconographie`],
    },
    {
      label: `Composants`,
      icon: O,
      count: 58,
      items: [
        `Bouton`,
        `Champ de saisie`,
        `Badge`,
        `Alerte`,
        `Formulaires`,
        `Navigation`,
        `Dialogue`,
        `Tableau`,
        `Composants avancés`,
        `Composants complémentaires`,
        `Structure officielle`,
      ],
    },
    {
      label: `Patrons métier`,
      icon: Se,
      items: [`Démarche en ligne`, `Tableau de bord`, `Suivi de dossier`],
    },
    {
      label: `Accessibilité`,
      icon: b,
      items: [`Référentiel`, `Rédaction`, `Tests`],
    },
  ],
  Yr = [
    {
      icon: je,
      title: `Une identité publique`,
      text: `Des couleurs nationales utilisées comme repères, jamais comme décoration.`,
    },
    {
      icon: b,
      title: `Accessible d’abord`,
      text: `Contrastes AA, clavier, français clair et zones tactiles généreuses.`,
    },
    {
      icon: ae,
      title: `Conçu pour durer`,
      text: `Des primitives stables, composables et simples à maintenir.`,
    },
  ],
  Xr = [
    { name: `Vert institution`, value: `#006A45`, className: `bg-[#006A45]` },
    { name: `Vert clair`, value: `#E8F1ED`, className: `bg-[#E8F1ED]` },
    { name: `Encre`, value: `#1E2A24`, className: `bg-[#1E2A24]` },
    { name: `Gris texte`, value: `#5F6B65`, className: `bg-[#5F6B65]` },
    { name: `Gris interface`, value: `#D9DFDC`, className: `bg-[#D9DFDC]` },
    { name: `Blanc`, value: `#FFFFFF`, className: `bg-white border` },
  ],
  Zr = [
    [
      `variant`,
      `"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"`,
      `"default"`,
    ],
    [
      `size`,
      `"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"`,
      `"default"`,
    ],
    [`width`, `"auto" | "full"`, `"auto"`],
    [`loading`, `boolean`, `false`],
    [`loadingText`, `ReactNode`, `—`],
  ],
  Qr = [
    {
      reference: `BF-0148`,
      service: `Certificat de nationalité`,
      status: `Validé`,
      updated: `2026-07-25`,
    },
    {
      reference: `BF-0132`,
      service: `Casier judiciaire`,
      status: `En attente`,
      updated: `2026-07-23`,
    },
    {
      reference: `BF-0096`,
      service: `Extrait de naissance`,
      status: `Brouillon`,
      updated: `2026-07-18`,
    },
  ],
  $r = [
    {
      key: `reference`,
      header: `Référence`,
      cell: (e) => (0, R.jsx)(`code`, { children: e.reference }),
      sortValue: (e) => e.reference,
    },
    {
      key: `service`,
      header: `Démarche`,
      cell: (e) => e.service,
      sortValue: (e) => e.service,
    },
    {
      key: `status`,
      header: `Statut`,
      cell: (e) =>
        (0, R.jsx)(B, {
          variant:
            e.status === `Validé`
              ? `success`
              : e.status === `En attente`
                ? `warning`
                : `neutral`,
          size: `sm`,
          children: e.status,
        }),
      sortValue: (e) => e.status,
    },
    {
      key: `updated`,
      header: `Mise à jour`,
      cell: (e) =>
        new Intl.DateTimeFormat(`fr-BF`, { dateStyle: `medium` }).format(
          new Date(e.updated),
        ),
      sortValue: (e) => e.updated,
    },
  ],
  ei = Jr.flatMap((e) =>
    e.items.map((t) => ({
      label: t,
      group: e.label,
      id: t.toLowerCase().replaceAll(` `, `-`),
    })),
  );
function ti() {
  return (0, R.jsxs)(`span`, {
    className: `faso-mark`,
    "aria-hidden": `true`,
    children: [
      (0, R.jsx)(`span`, {}),
      (0, R.jsx)(Re, { size: 13, strokeWidth: 2.5 }),
    ],
  });
}
function ni() {
  let [e, t] = (0, h.useState)(`light`),
    [n, r] = (0, h.useState)(!1),
    [i, a] = (0, h.useState)(!1),
    [o, s] = (0, h.useState)(!0),
    [c, l] = (0, h.useState)(!1),
    [u, d] = (0, h.useState)(!1),
    [f, p] = (0, h.useState)(!1),
    [m, g] = (0, h.useState)(),
    [_, v] = (0, h.useState)(`demande`),
    [y, ee] = (0, h.useState)(!1),
    [S, te] = (0, h.useState)(``),
    [re, w] = (0, h.useState)(!1),
    ie = S.trim()
      ? ei
          .filter((e) => e.label.toLowerCase().includes(S.toLowerCase()))
          .slice(0, 7)
      : [];
  function ae(e) {
    (document
      .getElementById(e)
      ?.scrollIntoView({ behavior: `smooth`, block: `start` }),
      te(``),
      w(!1),
      r(!1));
  }
  (0, h.useEffect)(() => {
    let e = localStorage.getItem(`faso-ui-theme`) === `dark` ? `dark` : `light`;
    (t(e), document.documentElement.classList.toggle(`dark`, e === `dark`));
  }, []);
  function oe() {
    let n = e === `light` ? `dark` : `light`;
    (t(n),
      document.documentElement.classList.toggle(`dark`, n === `dark`),
      localStorage.setItem(`faso-ui-theme`, n));
  }
  function se() {
    (navigator.clipboard?.writeText(`npm install @faso-ui/react`),
      a(!0),
      window.setTimeout(() => a(!1), 1800));
  }
  return (0, R.jsxs)(`div`, {
    className: `min-h-dvh bg-background text-foreground`,
    children: [
      (0, R.jsx)(`a`, {
        className: `skip-link`,
        href: `#contenu`,
        children: `Aller au contenu`,
      }),
      (0, R.jsx)(`div`, { className: `civic-line`, "aria-hidden": `true` }),
      (0, R.jsx)(`header`, {
        className: `sticky top-0 z-40 border-b border-border/80 bg-background/94 backdrop-blur-xl`,
        children: (0, R.jsxs)(_n, {
          className: `flex h-16 items-center gap-5`,
          children: [
            (0, R.jsx)(`button`, {
              className: `icon-button lg:hidden`,
              "aria-label": `Ouvrir la navigation`,
              onClick: () => r(!0),
              children: (0, R.jsx)(ke, { size: 20 }),
            }),
            (0, R.jsxs)(`a`, {
              href: `#vue-d’ensemble`,
              className: `flex shrink-0 items-center gap-2.5`,
              "aria-label": `Faso UI, accueil`,
              children: [
                (0, R.jsx)(ti, {}),
                (0, R.jsx)(`span`, {
                  className: `font-display text-lg font-bold tracking-[-0.02em]`,
                  children: `Faso UI`,
                }),
                (0, R.jsx)(B, {
                  variant: `neutral`,
                  className: `hidden sm:inline-flex`,
                  children: `v1.0`,
                }),
              ],
            }),
            (0, R.jsxs)(`div`, {
              className: `search-wrapper mx-auto hidden w-full max-w-lg md:block`,
              children: [
                (0, R.jsxs)(`div`, {
                  className: `search-trigger flex`,
                  children: [
                    (0, R.jsx)(Pe, { size: 17 }),
                    (0, R.jsx)(`input`, {
                      value: S,
                      onChange: (e) => te(e.target.value),
                      placeholder: `Rechercher dans la documentation…`,
                      "aria-label": `Rechercher dans la documentation`,
                    }),
                    (0, R.jsx)(`kbd`, { children: `⌘ K` }),
                  ],
                }),
                ie.length
                  ? (0, R.jsx)(`div`, {
                      className: `search-results`,
                      children: ie.map((e) =>
                        (0, R.jsxs)(
                          `button`,
                          {
                            onClick: () => ae(e.id),
                            children: [
                              (0, R.jsx)(`span`, { children: e.label }),
                              (0, R.jsx)(`small`, { children: e.group }),
                              (0, R.jsx)(le, {}),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    })
                  : null,
              ],
            }),
            (0, R.jsxs)(`nav`, {
              className: `ml-auto flex items-center gap-1`,
              "aria-label": `Actions`,
              children: [
                (0, R.jsx)(`button`, {
                  className: `icon-button md:hidden`,
                  onClick: () => w(!0),
                  "aria-label": `Rechercher`,
                  children: (0, R.jsx)(Pe, { size: 19 }),
                }),
                (0, R.jsx)(`button`, {
                  className: `icon-button`,
                  onClick: oe,
                  "aria-label": `Changer de thème`,
                  children:
                    e === `light`
                      ? (0, R.jsx)(Ae, { size: 19 })
                      : (0, R.jsx)(ze, { size: 19 }),
                }),
                (0, R.jsx)(`a`, {
                  className: `icon-button hidden sm:inline-flex`,
                  href: `https://github.com`,
                  "aria-label": `GitHub`,
                  children: (0, R.jsx)(O, { size: 19 }),
                }),
                (0, R.jsxs)(z, {
                  size: `sm`,
                  className: `hidden sm:inline-flex`,
                  onClick: () => {
                    window.location.href = Kr(`exemple-casier/`);
                  },
                  children: [
                    `Voir l’application `,
                    (0, R.jsx)(C, { size: 15 }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      re
        ? (0, R.jsxs)(`div`, {
            className: `mobile-search-layer`,
            children: [
              (0, R.jsx)(`button`, {
                "aria-label": `Fermer la recherche`,
                onClick: () => w(!1),
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsxs)(`div`, {
                    className: `search-trigger flex`,
                    children: [
                      (0, R.jsx)(Pe, {}),
                      (0, R.jsx)(`input`, {
                        autoFocus: !0,
                        value: S,
                        onChange: (e) => te(e.target.value),
                        placeholder: `Rechercher un composant…`,
                      }),
                    ],
                  }),
                  (0, R.jsx)(`div`, {
                    className: `search-results static mt-2`,
                    children: (ie.length ? ie : ei.slice(0, 6)).map((e) =>
                      (0, R.jsxs)(
                        `button`,
                        {
                          onClick: () => ae(e.id),
                          children: [
                            (0, R.jsx)(`span`, { children: e.label }),
                            (0, R.jsx)(`small`, { children: e.group }),
                            (0, R.jsx)(le, {}),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          })
        : null,
      (0, R.jsxs)(`div`, {
        className: `mx-auto flex w-full max-w-[96rem]`,
        children: [
          (0, R.jsxs)(`aside`, {
            className: L(`docs-sidebar`, n && `is-open`),
            children: [
              (0, R.jsxs)(`div`, {
                className: `flex h-16 items-center justify-between border-b px-5 lg:hidden`,
                children: [
                  (0, R.jsxs)(`span`, {
                    className: `flex items-center gap-2 font-display font-bold`,
                    children: [(0, R.jsx)(ti, {}), ` Faso UI`],
                  }),
                  (0, R.jsx)(`button`, {
                    className: `icon-button`,
                    onClick: () => r(!1),
                    "aria-label": `Fermer`,
                    children: (0, R.jsx)(M, { size: 20 }),
                  }),
                ],
              }),
              (0, R.jsxs)(`div`, {
                className: `sidebar-scroll`,
                children: [
                  (0, R.jsxs)(`div`, {
                    className: `mb-6 rounded-xl border border-primary/15 bg-primary/[0.045] p-3.5`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `flex items-center gap-2 text-sm font-semibold text-primary`,
                        children: [
                          (0, R.jsx)(Ie, { size: 17 }),
                          ` Service public numérique`,
                        ],
                      }),
                      (0, R.jsx)(`p`, {
                        className: `mt-1.5 text-xs leading-5 text-muted-foreground`,
                        children: `Le socle commun des interfaces de l’État burkinabè.`,
                      }),
                    ],
                  }),
                  (0, R.jsx)(`nav`, {
                    "aria-label": `Documentation`,
                    children: Jr.map((e, t) =>
                      (0, R.jsxs)(
                        `div`,
                        {
                          className: `nav-group`,
                          children: [
                            (0, R.jsxs)(`div`, {
                              className: `nav-label`,
                              children: [
                                (0, R.jsx)(e.icon, { size: 15 }),
                                e.label,
                                e.count
                                  ? (0, R.jsx)(`span`, { children: e.count })
                                  : null,
                              ],
                            }),
                            e.items.map((e, n) =>
                              (0, R.jsx)(
                                `a`,
                                {
                                  className: L(
                                    `nav-item`,
                                    t === 0 && n === 0 && `active`,
                                  ),
                                  onClick: () => r(!1),
                                  href: `#${e.toLowerCase().replaceAll(` `, `-`)}`,
                                  children: e,
                                },
                                e,
                              ),
                            ),
                          ],
                        },
                        e.label,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          n
            ? (0, R.jsx)(`button`, {
                className: `sidebar-backdrop`,
                onClick: () => r(!1),
                "aria-label": `Fermer la navigation`,
              })
            : null,
          (0, R.jsxs)(`main`, {
            id: `contenu`,
            className: `min-w-0 flex-1`,
            children: [
              (0, R.jsxs)(`article`, {
                className: `mx-auto max-w-[70rem] px-5 py-10 sm:px-8 lg:px-12 lg:py-16`,
                children: [
                  (0, R.jsxs)(`div`, {
                    className: `mb-5 flex items-center gap-2 text-sm font-medium text-primary`,
                    children: [
                      (0, R.jsx)(`span`, { children: `Commencer` }),
                      (0, R.jsx)(le, { size: 14 }),
                      (0, R.jsx)(`span`, { children: `Vue d’ensemble` }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `hero-grid`,
                    id: `vue-d’ensemble`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        children: [
                          (0, R.jsxs)(B, {
                            variant: `success`,
                            className: `mb-5`,
                            children: [
                              (0, R.jsx)(`span`, { className: `status-dot` }),
                              ` Prêt pour les services publics`,
                            ],
                          }),
                          (0, R.jsxs)(`h1`, {
                            className: `max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.055em]`,
                            children: [
                              `Le numérique public, `,
                              (0, R.jsx)(`span`, {
                                className: `text-primary`,
                                children: `simplement.`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            className: `mt-6 max-w-2xl text-lg leading-8 text-muted-foreground`,
                            children: `Faso UI est le design system open source des services numériques burkinabè. Il aide les équipes à construire des démarches cohérentes, accessibles et dignes de confiance.`,
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `mt-8 flex flex-wrap gap-3`,
                            children: [
                              (0, R.jsxs)(z, {
                                size: `lg`,
                                onClick: () => {
                                  window.location.href = Kr(`exemple-casier/`);
                                },
                                children: [
                                  `Voir l’application exemple `,
                                  (0, R.jsx)(C, { size: 17 }),
                                ],
                              }),
                              (0, R.jsxs)(z, {
                                size: `lg`,
                                variant: `outline`,
                                children: [
                                  (0, R.jsx)(O, { size: 17 }),
                                  ` Voir les composants`,
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `woven-panel`,
                        "aria-hidden": `true`,
                        children: [
                          (0, R.jsx)(`div`, {
                            className: `woven-star`,
                            children: `★`,
                          }),
                          (0, R.jsxs)(`span`, {
                            className: `woven-label`,
                            children: [
                              `Burkina Faso`,
                              (0, R.jsx)(`br`, {}),
                              `Service public`,
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsx)(`section`, {
                    className: `mt-16 grid gap-3 md:grid-cols-3`,
                    children: Yr.map((e) =>
                      (0, R.jsxs)(
                        V,
                        {
                          className: `foundation-card`,
                          children: [
                            (0, R.jsx)(`span`, {
                              className: `feature-icon`,
                              children: (0, R.jsx)(e.icon, { size: 20 }),
                            }),
                            (0, R.jsx)(`h2`, { children: e.title }),
                            (0, R.jsx)(`p`, { children: e.text }),
                          ],
                        },
                        e.title,
                      ),
                    ),
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `installation`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Commencer`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Installation` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Ajoutez Faso UI à une application React, puis importez les tokens globaux une seule fois à la racine.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(`pre`, {
                        className: `code-block`,
                        children: (0, R.jsx)(`code`, {
                          children: `npm install @faso-ui/react

import "@faso-ui/react/styles.css"
import { Button, Field, Alert } from "@faso-ui/react"`,
                        }),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `principes`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Commencer`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Principes de conception`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Clarté, confiance et inclusion guident chaque décision. Une interface publique explique toujours où l’usager se trouve et ce qu’il doit faire.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(`div`, {
                        className: `grid gap-3 sm:grid-cols-3`,
                        children: Yr.map((e) =>
                          (0, R.jsxs)(
                            V,
                            {
                              className: `foundation-card`,
                              children: [
                                (0, R.jsx)(`span`, {
                                  className: `feature-icon`,
                                  children: (0, R.jsx)(e.icon, {}),
                                }),
                                (0, R.jsx)(`h2`, { children: e.title }),
                                (0, R.jsx)(`p`, { children: e.text }),
                              ],
                            },
                            `principle-${e.title}`,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `couleurs`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Fondations`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Une identité cohérente, à grande échelle`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Les décisions visuelles deviennent des variables partagées entre les équipes de conception et de développement.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `color-board`,
                        children: [
                          (0, R.jsx)(`div`, {
                            className: `swatch-grid`,
                            children: Xr.map((e) =>
                              (0, R.jsxs)(
                                `div`,
                                {
                                  className: `swatch`,
                                  children: [
                                    (0, R.jsx)(`div`, {
                                      className: e.className,
                                    }),
                                    (0, R.jsx)(`strong`, { children: e.name }),
                                    (0, R.jsx)(`code`, { children: e.value }),
                                  ],
                                },
                                e.name,
                              ),
                            ),
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `type-sample`,
                            children: [
                              (0, R.jsx)(`span`, { children: `Typographie` }),
                              (0, R.jsx)(`strong`, { children: `Aa` }),
                              (0, R.jsxs)(`p`, {
                                children: [
                                  `Clarté institutionnelle`,
                                  (0, R.jsx)(`br`, {}),
                                  (0, R.jsx)(`b`, {
                                    children: `à chaque échelle.`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `foundation-links`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            id: `typographie`,
                            children: [
                              (0, R.jsx)(`strong`, { children: `Typographie` }),
                              (0, R.jsx)(`p`, {
                                children: `Manrope assure une lecture claire du mobile aux grands tableaux de données.`,
                              }),
                              (0, R.jsx)(`span`, {
                                className: `font-display text-3xl font-extrabold`,
                                children: `Aa Bb Cc 0123`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            id: `espacement`,
                            children: [
                              (0, R.jsx)(`strong`, { children: `Espacement` }),
                              (0, R.jsx)(`p`, {
                                children: `Une base de 4 px structure les contrôles, les groupes et les sections.`,
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `space-scale`,
                                children: [
                                  (0, R.jsx)(`i`, {}),
                                  (0, R.jsx)(`i`, {}),
                                  (0, R.jsx)(`i`, {}),
                                  (0, R.jsx)(`i`, {}),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            id: `iconographie`,
                            children: [
                              (0, R.jsx)(`strong`, {
                                children: `Iconographie`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Les icônes Lucide accompagnent toujours un libellé ou possèdent un nom accessible.`,
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `flex gap-3 text-primary`,
                                children: [
                                  (0, R.jsx)(Ie, {}),
                                  (0, R.jsx)(ge, {}),
                                  (0, R.jsx)(Pe, {}),
                                  (0, R.jsx)(ue, {}),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `bouton`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Actions`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Bouton` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le bouton déclenche une action immédiate. Son libellé commence par un verbe et annonce clairement ce qui va se passer.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-demo`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `demo-toolbar`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `flex items-center gap-1`,
                                children: [
                                  (0, R.jsx)(`button`, {
                                    className: `demo-tab active`,
                                    children: `Aperçu`,
                                  }),
                                  (0, R.jsx)(`button`, {
                                    className: `demo-tab`,
                                    children: `Code`,
                                  }),
                                  (0, R.jsx)(`button`, {
                                    className: `demo-tab`,
                                    children: `Accessibilité`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(B, {
                                variant: `neutral`,
                                children: `Bouton`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`div`, {
                            className: `demo-canvas`,
                            children: (0, R.jsxs)(`div`, {
                              className: `flex flex-wrap items-center justify-center gap-3`,
                              children: [
                                (0, R.jsxs)(z, {
                                  children: [`Continuer `, (0, R.jsx)(C, {})],
                                }),
                                (0, R.jsx)(z, {
                                  variant: `secondary`,
                                  children: `Enregistrer`,
                                }),
                                (0, R.jsx)(z, {
                                  variant: `outline`,
                                  children: `Annuler`,
                                }),
                                (0, R.jsx)(z, {
                                  variant: `ghost`,
                                  children: `Voir le détail`,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Variantes` }),
                              (0, R.jsx)(`p`, {
                                children: `La hiérarchie visuelle reflète l’importance et le niveau de risque de l’action.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `example-row`,
                            children: [
                              (0, R.jsx)(z, { children: `Action principale` }),
                              (0, R.jsx)(z, {
                                variant: `secondary`,
                                children: `Action secondaire`,
                              }),
                              (0, R.jsx)(z, {
                                variant: `outline`,
                                children: `Action tertiaire`,
                              }),
                              (0, R.jsx)(z, {
                                variant: `ghost`,
                                children: `Action discrète`,
                              }),
                              (0, R.jsxs)(z, {
                                variant: `destructive`,
                                children: [(0, R.jsx)(x, {}), ` Supprimer`],
                              }),
                              (0, R.jsxs)(z, {
                                variant: `link`,
                                children: [
                                  `Consulter les conditions `,
                                  (0, R.jsx)(ne, {}),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Tailles` }),
                              (0, R.jsx)(`p`, {
                                children: `Utilisez la taille par défaut dans les formulaires. Les petites tailles sont réservées aux interfaces denses.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `example-row items-center`,
                            children: [
                              (0, R.jsx)(z, { size: `sm`, children: `Petit` }),
                              (0, R.jsx)(z, { children: `Par défaut` }),
                              (0, R.jsx)(z, { size: `lg`, children: `Grand` }),
                              (0, R.jsx)(z, {
                                size: `icon`,
                                "aria-label": `Télécharger le document`,
                                children: (0, R.jsx)(pe, {}),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `États` }),
                              (0, R.jsx)(`p`, {
                                children: `Les états restent explicites. Pendant une opération, le bouton conserve son libellé ou précise l’action en cours.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `example-row`,
                            children: [
                              (0, R.jsxs)(z, {
                                children: [
                                  (0, R.jsx)(Fe, {}),
                                  ` Envoyer la demande`,
                                ],
                              }),
                              (0, R.jsx)(z, {
                                loading: !0,
                                loadingText: `Envoi en cours…`,
                                children: `Envoyer la demande`,
                              }),
                              (0, R.jsx)(z, {
                                disabled: !0,
                                children: `Action indisponible`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `button-guidance`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `guidance-do`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [
                                  (0, R.jsx)(T, { size: 15 }),
                                  ` À faire`,
                                ],
                              }),
                              (0, R.jsx)(`strong`, {
                                children: `Enregistrer les modifications`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Utiliser un verbe précis et un complément utile.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `guidance-dont`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [
                                  (0, R.jsx)(M, { size: 15 }),
                                  ` À éviter`,
                                ],
                              }),
                              (0, R.jsx)(`strong`, { children: `Valider` }),
                              (0, R.jsx)(`p`, {
                                children: `Éviter les libellés génériques qui ne décrivent pas le résultat.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Utilisation` }),
                              (0, R.jsx)(`p`, {
                                children: `Importez le composant depuis la bibliothèque. Le type natif est conservé pour les formulaires.`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`pre`, {
                            className: `code-block`,
                            children: (0, R.jsx)(`code`, {
                              children: `import { Button } from "@/components/ui/button"

<Button type="submit">
  Envoyer la demande
  <ArrowRight />
</Button>

<Button variant="outline" loading={isSaving}>
  Enregistrer
</Button>`,
                            }),
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `API` }),
                              (0, R.jsxs)(`p`, {
                                children: [
                                  `Toutes les propriétés natives de `,
                                  (0, R.jsx)(`code`, { children: `button` }),
                                  ` sont également acceptées.`,
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsx)(`div`, {
                            className: `api-table-wrap`,
                            children: (0, R.jsxs)(`table`, {
                              className: `api-table`,
                              children: [
                                (0, R.jsx)(`thead`, {
                                  children: (0, R.jsxs)(`tr`, {
                                    children: [
                                      (0, R.jsx)(`th`, {
                                        children: `Propriété`,
                                      }),
                                      (0, R.jsx)(`th`, { children: `Type` }),
                                      (0, R.jsx)(`th`, {
                                        children: `Valeur par défaut`,
                                      }),
                                    ],
                                  }),
                                }),
                                (0, R.jsx)(`tbody`, {
                                  children: Zr.map(([e, t, n]) =>
                                    (0, R.jsxs)(
                                      `tr`,
                                      {
                                        children: [
                                          (0, R.jsx)(`td`, {
                                            children: (0, R.jsx)(`code`, {
                                              children: e,
                                            }),
                                          }),
                                          (0, R.jsx)(`td`, {
                                            children: (0, R.jsx)(`code`, {
                                              children: t,
                                            }),
                                          }),
                                          (0, R.jsx)(`td`, {
                                            children: (0, R.jsx)(`code`, {
                                              children: n,
                                            }),
                                          }),
                                        ],
                                      },
                                      e,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, R.jsx)(Dn, {
                        className: `mt-6`,
                        icon: (0, R.jsx)(b, { size: 18 }),
                        title: `Accessibilité`,
                        children: `Les boutons icône doivent toujours avoir un nom accessible avec aria-label. Ne remplacez pas un lien de navigation par un bouton.`,
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `champ-de-saisie`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Formulaires`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Champ de saisie` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le champ permet de recueillir une information courte. Le libellé reste toujours visible et les erreurs indiquent comment corriger la saisie.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-demo`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `demo-toolbar`,
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `px-2 text-xs font-bold`,
                                children: `Aperçu`,
                              }),
                              (0, R.jsx)(B, { children: `Input + Field` }),
                            ],
                          }),
                          (0, R.jsx)(`div`, {
                            className: `demo-canvas`,
                            children: (0, R.jsx)(`div`, {
                              className: `w-full max-w-sm`,
                              children: (0, R.jsx)(Fn, {
                                label: `Numéro CNIB`,
                                placeholder: `Ex. B1234567`,
                                hint: `Le numéro figure au recto de votre carte.`,
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `États` }),
                              (0, R.jsx)(`p`, {
                                children: `Les états utilisent plusieurs indices : couleur, bordure, texte explicatif et attributs accessibles.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `form-example-grid`,
                            children: [
                              (0, R.jsx)(Fn, {
                                label: `Nom de naissance`,
                                placeholder: `Ex. Ouédraogo`,
                              }),
                              (0, R.jsx)(Fn, {
                                label: `Téléphone`,
                                placeholder: `+226 70 00 00 00`,
                                hint: `Format burkinabè à huit chiffres.`,
                              }),
                              (0, R.jsx)(Fn, {
                                label: `Adresse électronique`,
                                defaultValue: `adama@`,
                                error: `Saisissez une adresse électronique valide.`,
                              }),
                              (0, R.jsx)(Fn, {
                                label: `Référence du dossier`,
                                defaultValue: `BF-2026-0148`,
                                disabled: !0,
                                hint: `Cette valeur ne peut pas être modifiée.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Contenu complémentaire`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Une icône peut aider à reconnaître le type de donnée. Le suffixe est réservé aux unités et informations brèves.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `example-row`,
                            children: [
                              (0, R.jsx)(`div`, {
                                className: `w-full max-w-sm`,
                                children: (0, R.jsx)(Pn, {
                                  leadingIcon: (0, R.jsx)(Pe, {}),
                                  placeholder: `Rechercher une démarche…`,
                                  "aria-label": `Rechercher une démarche`,
                                }),
                              }),
                              (0, R.jsx)(`div`, {
                                className: `w-full max-w-xs`,
                                children: (0, R.jsx)(Pn, {
                                  inputMode: `numeric`,
                                  placeholder: `0`,
                                  trailing: `FCFA`,
                                  "aria-label": `Montant en francs CFA`,
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Utilisation` }),
                              (0, R.jsxs)(`p`, {
                                children: [
                                  (0, R.jsx)(`code`, { children: `Field` }),
                                  ` assemble le libellé, le champ et le message. Utilisez `,
                                  (0, R.jsx)(`code`, { children: `Input` }),
                                  ` seul dans les compositions avancées.`,
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsx)(`pre`, {
                            className: `code-block`,
                            children: (0, R.jsx)(`code`, {
                              children: `<Field
  label="Numéro CNIB"
  placeholder="Ex. B1234567"
  hint="Le numéro figure au recto de votre carte."
/>

<Field
  label="Adresse électronique"
  error="Saisissez une adresse valide."
/>`,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `badge`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Information`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Badge` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le badge qualifie un statut ou une catégorie avec quelques mots. Il n’est ni interactif ni utilisé pour afficher une longue information.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-demo`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `demo-toolbar`,
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `px-2 text-xs font-bold`,
                                children: `Variantes sémantiques`,
                              }),
                              (0, R.jsx)(B, { children: `Badge` }),
                            ],
                          }),
                          (0, R.jsx)(`div`, {
                            className: `demo-canvas`,
                            children: (0, R.jsxs)(`div`, {
                              className: `flex flex-wrap justify-center gap-3`,
                              children: [
                                (0, R.jsx)(B, { children: `Non commencé` }),
                                (0, R.jsx)(B, {
                                  variant: `primary`,
                                  children: `À traiter`,
                                }),
                                (0, R.jsxs)(B, {
                                  variant: `success`,
                                  children: [
                                    (0, R.jsx)(`span`, {
                                      className: `status-dot`,
                                    }),
                                    ` Validé`,
                                  ],
                                }),
                                (0, R.jsxs)(B, {
                                  variant: `warning`,
                                  children: [(0, R.jsx)(de, {}), ` En attente`],
                                }),
                                (0, R.jsx)(B, {
                                  variant: `destructive`,
                                  children: `Rejeté`,
                                }),
                                (0, R.jsx)(B, {
                                  variant: `information`,
                                  children: `Information`,
                                }),
                                (0, R.jsx)(B, {
                                  variant: `outline`,
                                  children: `Brouillon`,
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Tailles et contenu`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `La taille standard convient aux statuts. La petite taille accompagne les métadonnées compactes.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `example-row`,
                            children: [
                              (0, R.jsx)(B, {
                                variant: `success`,
                                children: `Dossier complet`,
                              }),
                              (0, R.jsx)(B, {
                                variant: `success`,
                                size: `sm`,
                                children: `Complet`,
                              }),
                              (0, R.jsx)(B, {
                                variant: `outline`,
                                children: `Nationalité burkinabè`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `button-guidance`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `guidance-do`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [
                                  (0, R.jsx)(T, { size: 15 }),
                                  ` À faire`,
                                ],
                              }),
                              (0, R.jsx)(`strong`, {
                                children: `En attente de paiement`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Décrire un état précis, compréhensible sans la couleur.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `guidance-dont`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [
                                  (0, R.jsx)(M, { size: 15 }),
                                  ` À éviter`,
                                ],
                              }),
                              (0, R.jsx)(`strong`, { children: `Cliquer ici` }),
                              (0, R.jsx)(`p`, {
                                children: `Un badge ne déclenche pas d’action. Utilisez un bouton ou un lien.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Utilisation` }),
                              (0, R.jsx)(`p`, {
                                children: `Choisissez une variante selon le sens du statut, pas selon une préférence esthétique.`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`pre`, {
                            className: `code-block`,
                            children: (0, R.jsx)(`code`, {
                              children: `<Badge variant="success">Validé</Badge>
<Badge variant="warning">
  <Clock3 />
  En attente
</Badge>`,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `alerte`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Retour système`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Alerte` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `L’alerte attire l’attention sur un changement, une confirmation ou un problème. Son titre résume le message et son contenu indique la suite.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `alert-stack`,
                        children: [
                          (0, R.jsx)(Dn, {
                            title: `Document nécessaire`,
                            children: `Joignez une copie lisible de votre CNIB avant de poursuivre.`,
                          }),
                          (0, R.jsx)(Dn, {
                            variant: `success`,
                            title: `Dossier transmis`,
                            children: `Votre demande n° BF-2026-0148 a bien été enregistrée.`,
                          }),
                          (0, R.jsx)(Dn, {
                            variant: `warning`,
                            title: `Paiement en attente`,
                            children: `Finalisez le paiement avant le 28 juillet pour conserver votre demande.`,
                          }),
                          (0, R.jsx)(Dn, {
                            variant: `destructive`,
                            title: `Document illisible`,
                            children: `Remplacez la pièce d’identité par un fichier net de moins de 5 Mo.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Alerte refermable`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Rendez une alerte refermable uniquement si sa disparition ne masque pas une information indispensable.`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`div`, {
                            className: `example-row`,
                            children: o
                              ? (0, R.jsx)(Dn, {
                                  className: `w-full`,
                                  title: `Maintenance programmée`,
                                  onDismiss: () => s(!1),
                                  children: `Le service sera momentanément indisponible dimanche de 02 h à 04 h.`,
                                })
                              : (0, R.jsx)(z, {
                                  variant: `outline`,
                                  onClick: () => s(!0),
                                  children: `Afficher à nouveau l’alerte`,
                                }),
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Utilisation` }),
                              (0, R.jsxs)(`p`, {
                                children: [
                                  `Les erreurs importantes utilisent automatiquement `,
                                  (0, R.jsx)(`code`, {
                                    children: `role="alert"`,
                                  }),
                                  `. Les autres messages utilisent `,
                                  (0, R.jsx)(`code`, {
                                    children: `role="status"`,
                                  }),
                                  `.`,
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsx)(`pre`, {
                            className: `code-block`,
                            children: (0, R.jsx)(`code`, {
                              children: `<Alert variant="success" title="Dossier transmis">
  Votre demande a bien été enregistrée.
</Alert>

<Alert
  variant="destructive"
  title="Document illisible"
>
  Ajoutez un nouveau fichier pour continuer.
</Alert>`,
                            }),
                          }),
                        ],
                      }),
                      (0, R.jsx)(Dn, {
                        className: `mt-6`,
                        icon: (0, R.jsx)(Be, { size: 18 }),
                        title: `Rédaction`,
                        children: `Une alerte explique le problème et propose une solution. Évitez les messages vagues comme « Une erreur est survenue ».`,
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `formulaires`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Formulaires`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Contrôles de formulaire`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Les contrôles natifs sont habillés par Faso UI afin de rester rapides, robustes et compatibles avec les technologies d’assistance.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `catalog-grid`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Liste de sélection`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Select`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(`label`, {
                                className: `mb-2 block text-xs font-bold`,
                                htmlFor: `province`,
                                children: `Province`,
                              }),
                              (0, R.jsxs)(An, {
                                id: `province`,
                                defaultValue: ``,
                                children: [
                                  (0, R.jsx)(`option`, {
                                    value: ``,
                                    disabled: !0,
                                    children: `Sélectionner une province`,
                                  }),
                                  (0, R.jsx)(`option`, { children: `Kadiogo` }),
                                  (0, R.jsx)(`option`, { children: `Houet` }),
                                  (0, R.jsx)(`option`, {
                                    children: `Boulkiemdé`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `Texte long` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Textarea`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(`label`, {
                                className: `mb-2 block text-xs font-bold`,
                                htmlFor: `motif`,
                                children: `Motif de la demande`,
                              }),
                              (0, R.jsx)(kn, {
                                id: `motif`,
                                placeholder: `Décrivez votre demande…`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Choix multiples`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Checkbox`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `space-y-3`,
                                children: [
                                  (0, R.jsx)(jn, {
                                    defaultChecked: !0,
                                    children: `Recevoir le récépissé par courriel`,
                                  }),
                                  (0, R.jsx)(jn, {
                                    children: `Recevoir les alertes par SMS`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Choix unique`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Radio`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`fieldset`, {
                                className: `space-y-3`,
                                children: [
                                  (0, R.jsx)(`legend`, {
                                    className: `sr-only`,
                                    children: `Mode de retrait`,
                                  }),
                                  (0, R.jsx)(Mn, {
                                    name: `retrait`,
                                    defaultChecked: !0,
                                    children: `Retrait au guichet`,
                                  }),
                                  (0, R.jsx)(Mn, {
                                    name: `retrait`,
                                    children: `Envoi électronique`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card sm:col-span-2`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `Paramètres` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Switch`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Nn, {
                                defaultChecked: !0,
                                children: `Notifications de suivi du dossier`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Principes` }),
                              (0, R.jsxs)(`p`, {
                                children: [
                                  `Regroupez les choix liés dans un `,
                                  (0, R.jsx)(`code`, { children: `fieldset` }),
                                  `, affichez toujours un libellé et ne pré-sélectionnez pas une décision sensible.`,
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsx)(`pre`, {
                            className: `code-block`,
                            children: (0, R.jsx)(`code`, {
                              children: `<Select aria-label="Province">
  <option>Kadiogo</option>
  <option>Houet</option>
</Select>

<Checkbox>Recevoir les alertes par SMS</Checkbox>
<Switch>Notifications de suivi</Switch>`,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `navigation`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Navigation`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `S’orienter dans un service`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le fil d’Ariane situe la page, les onglets changent de vue et la pagination permet de parcourir une collection.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(V, {
                        className: `catalog-card`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `catalog-title`,
                            children: [
                              (0, R.jsx)(`h3`, { children: `Fil d’Ariane` }),
                              (0, R.jsx)(B, {
                                size: `sm`,
                                children: `Breadcrumb`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(In, {
                            items: [
                              { label: `Accueil`, href: `#` },
                              { label: `Mes démarches`, href: `#` },
                              { label: `Certificat de nationalité` },
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `mt-4 grid gap-4 lg:grid-cols-[1.4fr_.6fr]`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `Onglets` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Tabs`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Ln, {
                                value: _,
                                onValueChange: v,
                                items: [
                                  {
                                    value: `demande`,
                                    label: `Demande`,
                                    content: (0, R.jsx)(`p`, {
                                      children: `Informations générales et état de la demande.`,
                                    }),
                                  },
                                  {
                                    value: `documents`,
                                    label: `Documents`,
                                    content: (0, R.jsx)(`p`, {
                                      children: `Deux pièces justificatives ont été ajoutées.`,
                                    }),
                                  },
                                  {
                                    value: `historique`,
                                    label: `Historique`,
                                    content: (0, R.jsx)(`p`, {
                                      children: `Dernière mise à jour le 25 juillet 2026.`,
                                    }),
                                  },
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `Pagination` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Pagination`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(`div`, {
                                className: `grid min-h-24 place-items-center`,
                                children: (0, R.jsx)(Rn, { total: 3 }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `dialogue`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Superposition`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Dialogue` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le dialogue interrompt brièvement le parcours pour confirmer une action importante. Il se ferme avec Échap ou via son bouton dédié.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(`div`, {
                        className: `example-row justify-center`,
                        children: (0, R.jsxs)(z, {
                          variant: `destructive`,
                          onClick: () => l(!0),
                          children: [
                            (0, R.jsx)(x, {}),
                            ` Supprimer le brouillon`,
                          ],
                        }),
                      }),
                      (0, R.jsx)(dr, {
                        open: c,
                        onOpenChange: l,
                        title: `Supprimer ce brouillon ?`,
                        description: `Cette action est définitive. Les informations déjà saisies seront perdues.`,
                        children: (0, R.jsxs)(`div`, {
                          className: `mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`,
                          children: [
                            (0, R.jsx)(z, {
                              variant: `outline`,
                              onClick: () => l(!1),
                              children: `Annuler`,
                            }),
                            (0, R.jsx)(z, {
                              variant: `destructive`,
                              onClick: () => l(!1),
                              children: `Supprimer le brouillon`,
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `tableau`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Données`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Données et chargement`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Les tableaux présentent des informations comparables. La progression et le squelette expliquent clairement l’état du système.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(V, {
                        className: `overflow-hidden`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `catalog-title p-5`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Demandes récentes`,
                              }),
                              (0, R.jsx)(B, {
                                variant: `outline`,
                                children: `3 dossiers`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(Tr, {
                            columns: $r,
                            data: Qr,
                            getRowKey: (e) => e.reference,
                            caption: `Demandes récentes`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `mt-4 grid gap-4 sm:grid-cols-2`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `Progression` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Progress`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(zn, {
                                value: 75,
                                label: `Dossier complété`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `Chargement` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Skeleton`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `space-y-3`,
                                children: [
                                  (0, R.jsx)(Bn, { className: `h-4 w-2/3` }),
                                  (0, R.jsx)(Bn, { className: `h-3 w-full` }),
                                  (0, R.jsx)(Bn, { className: `h-3 w-4/5` }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `mt-4 grid gap-4 lg:grid-cols-2`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Étapes d’une demande`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Stepper`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Rr, {
                                currentStep: 2,
                                orientation: `vertical`,
                                items: [
                                  {
                                    label: `Identité`,
                                    description: `Informations vérifiées`,
                                  },
                                  {
                                    label: `Justificatifs`,
                                    description: `Étape en cours`,
                                  },
                                  { label: `Paiement` },
                                  { label: `Transmission` },
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Actions contextuelles`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `DropdownMenu`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `example-row`,
                                children: [
                                  (0, R.jsxs)(Dr, {
                                    label: `Actions du dossier`,
                                    trigger: (0, R.jsxs)(z, {
                                      variant: `outline`,
                                      children: [`Actions `, (0, R.jsx)(j, {})],
                                    }),
                                    children: [
                                      (0, R.jsx)(kr, {
                                        children: `Dossier BF-0148`,
                                      }),
                                      (0, R.jsx)(Or, {
                                        onSelect: () => d(!0),
                                        children: `Voir le détail`,
                                      }),
                                      (0, R.jsx)(Or, {
                                        children: `Télécharger le récépissé`,
                                      }),
                                      (0, R.jsx)(Ar, {}),
                                      (0, R.jsx)(Or, {
                                        destructive: !0,
                                        children: `Supprimer le brouillon`,
                                      }),
                                    ],
                                  }),
                                  (0, R.jsx)(z, {
                                    onClick: () => d(!0),
                                    children: `Ouvrir le panneau`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsx)(Er, {
                        open: u,
                        onOpenChange: d,
                        title: `Dossier BF-0148`,
                        description: `Certificat de nationalité`,
                        footer: (0, R.jsxs)(`div`, {
                          className: `flex justify-end gap-2`,
                          children: [
                            (0, R.jsx)(z, {
                              variant: `outline`,
                              onClick: () => d(!1),
                              children: `Fermer`,
                            }),
                            (0, R.jsx)(z, { children: `Ouvrir le dossier` }),
                          ],
                        }),
                        children: (0, R.jsx)(sr, {
                          items: [
                            { label: `Demandeur`, value: `Adama Ouédraogo` },
                            {
                              label: `Statut`,
                              value: (0, R.jsx)(B, {
                                variant: `success`,
                                children: `Validé`,
                              }),
                            },
                            { label: `Mise à jour`, value: `25 juillet 2026` },
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `composants-avancés`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Démarches`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Composants avancés`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Identification, pièces justificatives, recherche assistée et retours système propres aux services administratifs.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `catalog-grid`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card sm:col-span-2`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Téléversement de fichier`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `FileUpload`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(qn, {
                                label: `Déposez votre copie de CNIB`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Code de vérification`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `OTP`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Jn, {}),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Date et téléphone`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Champs locaux`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `space-y-4`,
                                children: [
                                  (0, R.jsx)(Yn, {
                                    label: `Date de naissance`,
                                  }),
                                  (0, R.jsx)(Xn, {}),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Autocomplétion`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Combobox`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Zn, {
                                options: [
                                  `Ouagadougou`,
                                  `Bobo-Dioulasso`,
                                  `Koudougou`,
                                  `Ouahigouya`,
                                  `Banfora`,
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Résumé d’erreurs`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `ErrorSummary`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Qn, {
                                errors: [
                                  {
                                    field: `numero`,
                                    message: `Renseignez votre numéro CNIB.`,
                                  },
                                  {
                                    field: `province`,
                                    message: `Sélectionnez votre province.`,
                                  },
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `mt-4 grid gap-4 lg:grid-cols-2`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Questions fréquentes`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Accordion`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)($n, {
                                items: [
                                  {
                                    title: `Quels formats sont acceptés ?`,
                                    content: (0, R.jsx)(`p`, {
                                      children: `Les documents PDF, JPG et PNG de moins de 5 Mo.`,
                                    }),
                                  },
                                  {
                                    title: `Comment suivre ma demande ?`,
                                    content: (0, R.jsx)(`p`, {
                                      children: `Utilisez la référence reçue après la transmission du dossier.`,
                                    }),
                                  },
                                  {
                                    title: `Puis-je modifier un dossier ?`,
                                    content: (0, R.jsx)(`p`, {
                                      children: `Un brouillon reste modifiable tant qu’il n’est pas transmis.`,
                                    }),
                                  },
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, { children: `État vide` }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `EmptyState`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(er, {
                                title: `Aucune démarche`,
                                description: `Commencez une demande pour la retrouver dans cet espace.`,
                                action: (0, R.jsx)(z, {
                                  size: `sm`,
                                  children: `Nouvelle démarche`,
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Notifications et utilitaires`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Les notifications confirment une action sans interrompre le parcours. Les infobulles ne contiennent jamais une information essentielle.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `example-row`,
                            children: [
                              (0, R.jsx)(z, {
                                onClick: () => ee(!0),
                                children: `Afficher une notification`,
                              }),
                              (0, R.jsx)(nr, {
                                label: `Le traitement prend généralement deux jours ouvrés`,
                                children: (0, R.jsx)(z, {
                                  variant: `outline`,
                                  size: `icon`,
                                  "aria-label": `Informations sur le délai`,
                                  children: (0, R.jsx)(ue, {}),
                                }),
                              }),
                              (0, R.jsx)(tr, {}),
                              (0, R.jsx)(ar, { name: `Adama Ouédraogo` }),
                              (0, R.jsx)(ar, {
                                name: `Ministère Justice`,
                                size: `lg`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      y
                        ? (0, R.jsx)(`div`, {
                            className: `toast-viewport`,
                            children: (0, R.jsx)(rr, {
                              title: `Brouillon enregistré`,
                              onDismiss: () => ee(!1),
                              children: `Vos informations ont été sauvegardées.`,
                            }),
                          })
                        : null,
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Contenu structuré`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Les listes de données et cartes statistiques donnent une structure commune aux informations administratives.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `grid gap-4 sm:grid-cols-2`,
                            children: [
                              (0, R.jsx)(V, {
                                className: `catalog-card`,
                                children: (0, R.jsx)(sr, {
                                  items: [
                                    {
                                      label: `Référence`,
                                      value: `BF-2026-0148`,
                                    },
                                    {
                                      label: `Demandeur`,
                                      value: `Adama Ouédraogo`,
                                    },
                                    {
                                      label: `Statut`,
                                      value: (0, R.jsx)(B, {
                                        variant: `success`,
                                        children: `Validé`,
                                      }),
                                    },
                                  ],
                                }),
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `grid gap-3`,
                                children: [
                                  (0, R.jsx)(cr, {
                                    label: `Dossiers traités`,
                                    value: `1 248`,
                                    detail: `+12 % ce mois`,
                                    icon: (0, R.jsx)(ge, {}),
                                  }),
                                  (0, R.jsx)(or, { label: `ou` }),
                                  (0, R.jsx)(ir, {
                                    children: `Maintenance prévue dimanche de 02 h à 04 h.`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `composants-complémentaires`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Compléments`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Interactions et services`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Les dernières primitives couvrent la recherche, les dates, les actions contextuelles et les données propres aux démarches publiques.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `catalog-grid`,
                        children: [
                          (0, R.jsxs)(V, {
                            className: `catalog-card sm:col-span-2`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Recherche et navigation`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `SearchBox · NavigationMenu`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `space-y-4`,
                                children: [
                                  (0, R.jsx)(vr, {
                                    options: [
                                      {
                                        value: `nationalite`,
                                        label: `Certificat de nationalité`,
                                        description: `Justice`,
                                      },
                                      {
                                        value: `casier`,
                                        label: `Casier judiciaire`,
                                        description: `Justice`,
                                      },
                                      {
                                        value: `naissance`,
                                        label: `Extrait de naissance`,
                                        description: `État civil`,
                                      },
                                    ],
                                    onSelect: () => void 0,
                                  }),
                                  (0, R.jsx)(Fr, {
                                    items: [
                                      {
                                        label: `Démarches`,
                                        children: [
                                          {
                                            label: `Justice`,
                                            href: `#`,
                                            description: `Casier et nationalité`,
                                          },
                                          {
                                            label: `État civil`,
                                            href: `#`,
                                            description: `Actes et certificats`,
                                          },
                                        ],
                                      },
                                      { label: `Mes dossiers`, href: `#` },
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Date et superposition`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `DatePicker · Popover`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `flex flex-wrap gap-3`,
                                children: [
                                  (0, R.jsx)(wr, {
                                    value: m,
                                    onValueChange: g,
                                  }),
                                  (0, R.jsx)(_r, {
                                    label: `Aide`,
                                    trigger: (0, R.jsx)(z, {
                                      variant: `outline`,
                                      children: `Pourquoi ?`,
                                    }),
                                    children: (0, R.jsx)(`p`, {
                                      className: `text-sm text-muted-foreground`,
                                      children: `Cette date permet de vérifier la validité du document.`,
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Formulaire composé`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `FormField`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(gr, {
                                label: `Numéro de dossier`,
                                hint: `Format attendu : BF-0000`,
                                required: !0,
                                children: (0, R.jsx)(Pn, {
                                  placeholder: `BF-0148`,
                                }),
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `mt-3 flex items-center gap-2`,
                                children: [
                                  (0, R.jsx)(fr, {
                                    href: `#formulaires`,
                                    children: `Aide à la saisie`,
                                  }),
                                  (0, R.jsx)(pr, {
                                    label: `Action rapide`,
                                    children: (0, R.jsx)(ue, {}),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Étiquettes et fichier`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `Tag · FilePreview`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `mb-4 flex flex-wrap gap-2`,
                                children: [
                                  (0, R.jsx)(Mr, {
                                    selected: !0,
                                    children: `Validé`,
                                  }),
                                  (0, R.jsx)(Mr, {
                                    onRemove: () => void 0,
                                    children: `Kadiogo`,
                                  }),
                                  (0, R.jsx)(Mr, {
                                    disabled: !0,
                                    children: `Archivé`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(Pr, {
                                name: `cnib-adama.pdf`,
                                type: `PDF`,
                                size: `1,2 Mo`,
                                onRemove: () => void 0,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `catalog-title`,
                                children: [
                                  (0, R.jsx)(`h3`, {
                                    children: `Notifications et confirmation`,
                                  }),
                                  (0, R.jsx)(B, {
                                    size: `sm`,
                                    children: `NotificationCenter · AlertDialog`,
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `example-row`,
                                children: [
                                  (0, R.jsx)(Nr, {
                                    notifications: [
                                      {
                                        id: `1`,
                                        title: `Dossier validé`,
                                        description: `Votre document est disponible.`,
                                        time: `Il y a 10 min`,
                                        unread: !0,
                                      },
                                      {
                                        id: `2`,
                                        title: `Paiement reçu`,
                                        time: `Hier`,
                                      },
                                    ],
                                  }),
                                  (0, R.jsx)(z, {
                                    variant: `destructive`,
                                    onClick: () => p(!0),
                                    children: `Annuler la demande`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(jr, {
                                open: f,
                                onOpenChange: p,
                                title: `Annuler cette demande ?`,
                                description: `Le dossier ne sera plus transmis au service instructeur.`,
                                confirmLabel: `Annuler la demande`,
                                destructive: !0,
                                onConfirm: () => void 0,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsx)(Lr, {
                            title: `Informations administratives`,
                            description: `Champs spécialisés pour les services burkinabè.`,
                            action: (0, R.jsxs)(Ur, {
                              children: [
                                (0, R.jsx)(Or, { children: `Modifier` }),
                                (0, R.jsx)(Ar, {}),
                                (0, R.jsx)(Or, {
                                  destructive: !0,
                                  children: `Supprimer`,
                                }),
                              ],
                            }),
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `mt-5 grid gap-6 lg:grid-cols-2`,
                            children: [(0, R.jsx)(Br, {}), (0, R.jsx)(Vr, {})],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `mt-4 grid gap-4 lg:grid-cols-2`,
                        children: [
                          (0, R.jsx)(Hr, {
                            items: [
                              { label: `Timbre fiscal`, amount: 200 },
                              { label: `Quittance`, amount: 300 },
                            ],
                            fee: 50,
                            action: (0, R.jsxs)(z, {
                              width: `full`,
                              children: [
                                `Payer `,
                                (0, R.jsx)(zr, { value: 550 }),
                              ],
                            }),
                          }),
                          (0, R.jsxs)(V, {
                            className: `catalog-card`,
                            children: [
                              (0, R.jsx)(Lr, { title: `Suivi du dossier` }),
                              (0, R.jsx)(`div`, {
                                className: `mt-5`,
                                children: (0, R.jsx)(Wr, {
                                  items: [
                                    {
                                      title: `Demande transmise`,
                                      date: `22 juillet 2026`,
                                      status: `complete`,
                                    },
                                    {
                                      title: `Vérification des pièces`,
                                      description: `Traitement par le greffe`,
                                      status: `current`,
                                    },
                                    {
                                      title: `Document disponible`,
                                      status: `upcoming`,
                                    },
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsx)(`div`, {
                        className: `component-doc-block`,
                        children: (0, R.jsx)(Ir, {
                          eyebrow: `Ministère de la Justice`,
                          title: `Mes démarches`,
                          description: `Consultez vos demandes et les actions à effectuer.`,
                          actions: (0, R.jsx)(z, {
                            children: `Nouvelle demande`,
                          }),
                        }),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `structure-officielle`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Composants · Structure`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Structure officielle`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `L’en-tête et le pied de page assurent une identification constante de l’État et du service responsable.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `official-preview`,
                        children: [
                          (0, R.jsx)(Cn, { serviceName: `Justice en ligne` }),
                          (0, R.jsxs)(`div`, {
                            className: `official-preview-body`,
                            children: [
                              (0, R.jsx)(`span`, {
                                children: `Aperçu du contenu du service`,
                              }),
                              (0, R.jsx)(`h3`, {
                                children: `Demander un casier judiciaire`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Une démarche officielle de la Burkina Faso.`,
                              }),
                              (0, R.jsx)(z, {
                                children: `Commencer la démarche`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(wn, {}),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `démarche-en-ligne`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Patrons métier · Parcours`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Démarche en ligne`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Un formulaire découpé en étapes courtes réduit les erreurs et permet à l’usager de comprendre sa progression.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(Hn, {}),
                      (0, R.jsxs)(`div`, {
                        className: `pattern-guidelines`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`strong`, {
                                children: `Quand l’utiliser`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Pour une demande administrative qui nécessite plusieurs catégories d’informations ou des pièces justificatives.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`strong`, { children: `Principes` }),
                              (0, R.jsx)(`p`, {
                                children: `Une tâche par étape, sauvegarde automatique, validation avant transmission et confirmation avec référence.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `tableau-de-bord`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Patrons métier · Espace usager`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Tableau de bord` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le tableau de bord donne une vue immédiate des démarches, des actions requises et des documents disponibles.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(Wn, {}),
                      (0, R.jsxs)(`div`, {
                        className: `component-doc-block`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `component-doc-heading`,
                            children: [
                              (0, R.jsx)(`h3`, {
                                children: `Hiérarchie recommandée`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Commencez par les actions urgentes, puis les démarches récentes. Les statistiques servent de raccourcis et non de décoration.`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`pre`, {
                            className: `code-block`,
                            children: (0, R.jsx)(`code`, {
                              children: `<Dashboard>
  <DashboardSummary />
  <RequiredActions />
  <RecentApplications />
</Dashboard>`,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `suivi-de-dossier`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Patrons métier · Transparence`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Suivi de dossier`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Le suivi répond à trois questions : où en est la demande, que doit faire l’usager et quand la situation a-t-elle changé ?`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(Kn, {}),
                      (0, R.jsxs)(`div`, {
                        className: `button-guidance`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `guidance-do`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [
                                  (0, R.jsx)(T, { size: 15 }),
                                  ` À faire`,
                                ],
                              }),
                              (0, R.jsx)(`strong`, {
                                children: `Pièce à remplacer avant le 28 juillet`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Indiquer l’action, l’échéance et le moyen de résoudre le problème.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `guidance-dont`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [
                                  (0, R.jsx)(M, { size: 15 }),
                                  ` À éviter`,
                                ],
                              }),
                              (0, R.jsx)(`strong`, {
                                children: `Dossier en cours`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Éviter un statut vague qui ne donne ni étape, ni délai, ni prochaine action.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `référentiel`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Accessibilité`,
                              }),
                              (0, R.jsx)(`h2`, { children: `Référentiel` }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Faso UI vise le niveau WCAG 2.2 AA : navigation clavier, contrastes suffisants, zoom à 200 % et restitution correcte par lecteur d’écran.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(`div`, {
                        className: `accessibility-checklist`,
                        children: [
                          `Contraste texte et composants`,
                          `Navigation complète au clavier`,
                          `Focus visible et prévisible`,
                          `Libellés et messages associés`,
                          `Réduction des animations`,
                          `Contenu utilisable à 200 %`,
                        ].map((e) =>
                          (0, R.jsxs)(
                            `div`,
                            { children: [(0, R.jsx)(T, {}), e] },
                            e,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `rédaction`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Accessibilité · Contenu`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Rédaction claire`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Utilisez des phrases courtes, des verbes d’action et le vocabulaire de l’usager. Une erreur décrit le problème et la manière de le corriger.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `button-guidance`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `guidance-do`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [(0, R.jsx)(T, {}), ` À faire`],
                              }),
                              (0, R.jsx)(`strong`, {
                                children: `Ajoutez une copie lisible de votre CNIB.`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `L’action attendue et le document sont explicites.`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `guidance-dont`,
                            children: [
                              (0, R.jsxs)(`span`, {
                                children: [(0, R.jsx)(M, {}), ` À éviter`],
                              }),
                              (0, R.jsx)(`strong`, {
                                children: `Erreur de fichier.`,
                              }),
                              (0, R.jsx)(`p`, {
                                children: `Le problème et sa résolution restent inconnus.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `doc-section`,
                    id: `tests`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `section-heading`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`span`, {
                                className: `eyebrow`,
                                children: `Accessibilité · Qualité`,
                              }),
                              (0, R.jsx)(`h2`, {
                                children: `Tests recommandés`,
                              }),
                            ],
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Les contrôles automatisés sont complétés par une revue clavier, lecteur d’écran et zoom avant chaque mise en production.`,
                          }),
                        ],
                      }),
                      (0, R.jsx)(`pre`, {
                        className: `code-block`,
                        children: (0, R.jsx)(`code`, {
                          children: `npm run test
npm run test:a11y
npm run typecheck
npm run build`,
                        }),
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`section`, {
                    className: `install-banner`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        children: [
                          (0, R.jsx)(`span`, {
                            className: `eyebrow text-[#86D7B1]`,
                            children: `Prêt à construire ?`,
                          }),
                          (0, R.jsx)(`h2`, {
                            children: `Adoptez un langage commun.`,
                          }),
                          (0, R.jsx)(`p`, {
                            children: `Installez les composants, copiez les tokens et commencez votre prochaine démarche publique.`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`button`, {
                        className: `install-command`,
                        onClick: se,
                        children: [
                          (0, R.jsx)(`code`, {
                            children: `npm install @faso-ui/react`,
                          }),
                          i
                            ? (0, R.jsx)(T, { size: 17 })
                            : (0, R.jsx)(k, { size: 17 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, R.jsx)(`footer`, {
                className: `border-t`,
                children: (0, R.jsxs)(`div`, {
                  className: `mx-auto flex max-w-[70rem] flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-12`,
                  children: [
                    (0, R.jsxs)(`span`, {
                      className: `flex items-center gap-2 font-medium text-foreground`,
                      children: [(0, R.jsx)(ti, {}), ` Faso UI — Burkina Faso`],
                    }),
                    (0, R.jsxs)(`div`, {
                      className: `flex gap-5`,
                      children: [
                        (0, R.jsx)(`a`, {
                          href: `#référentiel`,
                          children: `Accessibilité`,
                        }),
                        (0, R.jsx)(`a`, {
                          href: `#principes`,
                          children: `Contribuer`,
                        }),
                        (0, R.jsx)(`a`, {
                          href: `#installation`,
                          children: `Licence`,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, R.jsxs)(`aside`, {
            className: `toc`,
            children: [
              (0, R.jsx)(`span`, { children: `Sur cette page` }),
              (0, R.jsx)(`a`, {
                className: `active`,
                href: `#contenu`,
                children: `Vue d’ensemble`,
              }),
              (0, R.jsx)(`a`, { href: `#principes`, children: `Fondations` }),
              (0, R.jsx)(`a`, { href: `#bouton`, children: `Composants` }),
              (0, R.jsx)(`a`, {
                href: `#démarche-en-ligne`,
                children: `Patrons métier`,
              }),
              (0, R.jsx)(`a`, {
                href: `#installation`,
                children: `Installation`,
              }),
              (0, R.jsxs)(`div`, {
                className: `toc-help`,
                children: [
                  (0, R.jsx)(ue, { size: 16 }),
                  (0, R.jsxs)(`span`, {
                    children: [
                      `Une question ?`,
                      (0, R.jsx)(`br`, {}),
                      (0, R.jsx)(`a`, {
                        href: `mailto:equipe@faso-ui.gov.bf`,
                        children: `Contacter l’équipe`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var ri = [`Identité`, `Documents`, `Récapitulatif`, `Paiement`, `Confirmation`];
function ii() {
  let [e, t] = (0, h.useState)(`home`),
    [n, r] = (0, h.useState)(1),
    [i, a] = (0, h.useState)(!1);
  function o() {
    (t(`request`), r(1), window.scrollTo({ top: 0, behavior: `smooth` }));
  }
  return (0, R.jsxs)(`div`, {
    className: `ecasier-app`,
    children: [
      (0, R.jsx)(`div`, { className: `civic-line` }),
      (0, R.jsx)(Cn, { serviceName: `e-Casier judiciaire` }),
      (0, R.jsxs)(`div`, {
        className: `ecasier-official-bar`,
        children: [
          (0, R.jsxs)(`span`, {
            children: [
              (0, R.jsx)(Ie, {}),
              ` Site officiel de l’administration burkinabè`,
            ],
          }),
          (0, R.jsxs)(`span`, {
            children: [
              `Une question ? `,
              (0, R.jsx)(`a`, {
                href: `tel:+22625409267`,
                children: `(+226) 25 40 92 67`,
              }),
            ],
          }),
        ],
      }),
      e === `home`
        ? (0, R.jsx)(ai, { onStart: o, onTrack: () => t(`tracking`) })
        : null,
      e === `request`
        ? (0, R.jsx)(oi, {
            step: n,
            setStep: r,
            paid: i,
            setPaid: a,
            onHome: () => t(`home`),
          })
        : null,
      e === `tracking` ? (0, R.jsx)(pi, { onHome: () => t(`home`) }) : null,
      (0, R.jsx)(wn, {}),
    ],
  });
}
function ai({ onStart: e, onTrack: t }) {
  return (0, R.jsxs)(`main`, {
    children: [
      (0, R.jsxs)(`section`, {
        className: `ecasier-hero`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, {
                className: `ecasier-eyebrow`,
                children: `Ministère de la Justice et des Droits humains`,
              }),
              (0, R.jsx)(`h1`, {
                children: `Votre casier judiciaire, sans vous déplacer.`,
              }),
              (0, R.jsx)(`p`, {
                children: `Demandez votre bulletin n°3 en ligne, payez par mobile money et recevez votre document par voie électronique.`,
              }),
              (0, R.jsxs)(`div`, {
                className: `ecasier-actions`,
                children: [
                  (0, R.jsxs)(z, {
                    size: `lg`,
                    onClick: e,
                    children: [`Faire une demande `, (0, R.jsx)(C, {})],
                  }),
                  (0, R.jsxs)(z, {
                    size: `lg`,
                    variant: `outline`,
                    onClick: t,
                    children: [(0, R.jsx)(Pe, {}), ` Suivre une demande`],
                  }),
                ],
              }),
              (0, R.jsxs)(`span`, {
                className: `ecasier-security`,
                children: [
                  (0, R.jsx)(Ee, {}),
                  ` Vos données sont transmises de manière sécurisée.`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(V, {
            className: `ecasier-info-card`,
            children: [
              (0, R.jsx)(`span`, {
                className: `ecasier-card-grid`,
                "aria-hidden": `true`,
              }),
              (0, R.jsx)(`span`, {
                className: `ecasier-document`,
                children: (0, R.jsx)(ge, {}),
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`small`, { children: `Document délivré` }),
                  (0, R.jsx)(`h2`, {
                    children: `Bulletin n°3 du casier judiciaire`,
                  }),
                ],
              }),
              (0, R.jsxs)(`dl`, {
                children: [
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Coût indicatif` }),
                      (0, R.jsx)(`dd`, { children: `500 FCFA` }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Délai` }),
                      (0, R.jsx)(`dd`, { children: `24 à 48 heures` }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Validité` }),
                      (0, R.jsx)(`dd`, { children: `3 mois` }),
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`div`, {
                className: `ecasier-card-seal`,
                children: [
                  (0, R.jsx)(`span`, { children: `★` }),
                  ` Burkina Faso`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `ecasier-trust-strip`,
        "aria-label": `Avantages du service`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(Ie, {}),
              (0, R.jsxs)(`span`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `Démarche sécurisée` }),
                  `Vos données restent protégées`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(de, {}),
              (0, R.jsxs)(`span`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `Disponible 24 h / 24` }),
                  `Depuis un mobile ou ordinateur`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(Le, {}),
              (0, R.jsxs)(`span`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `Paiement mobile` }),
                  `Orange Money et Moov Money`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(pe, {}),
              (0, R.jsxs)(`span`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `Document numérique` }),
                  `Reçu directement dans votre espace`,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `ecasier-section`,
        children: [
          (0, R.jsxs)(`div`, {
            className: `ecasier-section-heading split`,
            children: [
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`span`, { children: `Avant de commencer` }),
                  (0, R.jsx)(`h2`, { children: `Préparez votre demande` }),
                ],
              }),
              (0, R.jsx)(`p`, {
                children: `Réunissez ces trois éléments. Vous pourrez enregistrer un brouillon et reprendre la démarche plus tard.`,
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            className: `ecasier-requirements`,
            children: [
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, { children: `01` }),
                  (0, R.jsx)(_e, {}),
                  (0, R.jsx)(`h3`, { children: `Pièce d’identité` }),
                  (0, R.jsx)(`p`, {
                    children: `Une CNIB ou un passeport en cours de validité.`,
                  }),
                ],
              }),
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, { children: `02` }),
                  (0, R.jsx)(_e, {}),
                  (0, R.jsx)(`h3`, { children: `Acte de naissance` }),
                  (0, R.jsx)(`p`, {
                    children: `Une copie lisible de votre extrait ou jugement supplétif.`,
                  }),
                ],
              }),
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, { children: `03` }),
                  (0, R.jsx)(Le, {}),
                  (0, R.jsx)(`h3`, { children: `Téléphone actif` }),
                  (0, R.jsx)(`p`, {
                    children: `Un numéro associé à votre compte mobile money.`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `ecasier-process`,
        children: [
          (0, R.jsx)(`div`, {
            className: `ecasier-process-pattern`,
            "aria-hidden": `true`,
            children: `★`,
          }),
          (0, R.jsxs)(`div`, {
            className: `ecasier-section-heading`,
            children: [
              (0, R.jsx)(`span`, { children: `Comment ça marche ?` }),
              (0, R.jsxs)(`h2`, {
                children: [
                  `Quatre étapes,`,
                  (0, R.jsx)(`br`, {}),
                  `entièrement en ligne`,
                ],
              }),
            ],
          }),
          (0, R.jsx)(`ol`, {
            children: [
              [`Remplissez`, `Renseignez vos informations personnelles.`],
              [`Ajoutez`, `Transmettez vos pièces justificatives.`],
              [`Payez`, `Réglez les frais avec votre mobile money.`],
              [`Recevez`, `Téléchargez le document depuis votre espace.`],
            ].map(([e, t], n) =>
              (0, R.jsxs)(
                `li`,
                {
                  children: [
                    (0, R.jsx)(`span`, { children: n + 1 }),
                    (0, R.jsxs)(`div`, {
                      children: [
                        (0, R.jsx)(`h3`, { children: e }),
                        (0, R.jsx)(`p`, { children: t }),
                      ],
                    }),
                  ],
                },
                e,
              ),
            ),
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `ecasier-cta`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(B, {
                variant: `success`,
                children: `Service disponible 24 h / 24`,
              }),
              (0, R.jsx)(`h2`, { children: `Prêt à commencer ?` }),
              (0, R.jsx)(`p`, {
                children: `La démarche prend environ huit minutes.`,
              }),
            ],
          }),
          (0, R.jsxs)(z, {
            size: `lg`,
            onClick: e,
            children: [`Faire ma demande `, (0, R.jsx)(C, {})],
          }),
        ],
      }),
    ],
  });
}
function oi({ step: e, setStep: t, paid: n, setPaid: r, onHome: i }) {
  return (0, R.jsxs)(`main`, {
    className: `ecasier-form-page`,
    children: [
      (0, R.jsxs)(`button`, {
        className: `ecasier-back-home`,
        onClick: i,
        children: [(0, R.jsx)(S, {}), ` Retour à l’accueil`],
      }),
      (0, R.jsxs)(`div`, {
        className: `ecasier-form-layout`,
        children: [
          (0, R.jsxs)(`aside`, {
            children: [
              (0, R.jsx)(`span`, { children: `Votre demande` }),
              (0, R.jsx)(`h2`, { children: `Bulletin n°3` }),
              (0, R.jsx)(`ol`, {
                children: ri.map((t, n) =>
                  (0, R.jsxs)(
                    `li`,
                    {
                      className: L(
                        n + 1 === e && `active`,
                        n + 1 < e && `done`,
                      ),
                      children: [
                        (0, R.jsx)(`span`, {
                          children: n + 1 < e ? (0, R.jsx)(T, {}) : n + 1,
                        }),
                        (0, R.jsx)(`strong`, { children: t }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(ue, {}),
                  (0, R.jsxs)(`p`, {
                    children: [
                      `Besoin d’aide ?`,
                      (0, R.jsx)(`br`, {}),
                      (0, R.jsx)(`a`, {
                        href: `mailto:casierjudiciaire@justice.gov.bf`,
                        children: `Contacter l’assistance`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(V, {
            className: `ecasier-form-card`,
            children: [
              (0, R.jsx)(`div`, {
                className: `ecasier-mobile-progress`,
                children: (0, R.jsx)(zn, {
                  value: e * 20,
                  label: `Étape ${e} sur 5`,
                }),
              }),
              e === 1 ? (0, R.jsx)(ci, {}) : null,
              e === 2 ? (0, R.jsx)(li, {}) : null,
              e === 3 ? (0, R.jsx)(ui, {}) : null,
              e === 4 ? (0, R.jsx)(di, { paid: n, onPay: () => r(!0) }) : null,
              e === 5 ? (0, R.jsx)(fi, { onHome: i }) : null,
              e < 5
                ? (0, R.jsxs)(`div`, {
                    className: `ecasier-form-actions`,
                    children: [
                      e > 1
                        ? (0, R.jsxs)(z, {
                            variant: `outline`,
                            onClick: () => t(e - 1),
                            children: [(0, R.jsx)(S, {}), ` Retour`],
                          })
                        : (0, R.jsx)(`span`, {}),
                      e === 4 && !n
                        ? null
                        : (0, R.jsxs)(z, {
                            onClick: () => t(e + 1),
                            children: [
                              e === 3
                                ? `Confirmer et payer`
                                : e === 4
                                  ? `Terminer`
                                  : `Continuer`,
                              ` `,
                              (0, R.jsx)(C, {}),
                            ],
                          }),
                    ],
                  })
                : null,
            ],
          }),
        ],
      }),
    ],
  });
}
function si({ number: e, title: t, description: n }) {
  return (0, R.jsxs)(`div`, {
    className: `ecasier-step-title`,
    children: [
      (0, R.jsxs)(`span`, { children: [`Étape `, e, ` sur 5`] }),
      (0, R.jsx)(`h1`, { children: t }),
      (0, R.jsx)(`p`, { children: n }),
    ],
  });
}
function ci() {
  return (0, R.jsxs)(R.Fragment, {
    children: [
      (0, R.jsx)(si, {
        number: 1,
        title: `Votre identité`,
        description: `Saisissez les informations telles qu’elles figurent sur votre acte de naissance.`,
      }),
      (0, R.jsxs)(`div`, {
        className: `ecasier-fields`,
        children: [
          (0, R.jsx)(Fn, {
            label: `Nom de naissance`,
            placeholder: `Ex. Ouédraogo`,
            required: !0,
          }),
          (0, R.jsx)(Fn, {
            label: `Prénom(s)`,
            placeholder: `Ex. Adama`,
            required: !0,
          }),
          (0, R.jsx)(Fn, {
            label: `Date de naissance`,
            type: `date`,
            required: !0,
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`label`, {
                htmlFor: `birthplace`,
                children: `Lieu de naissance`,
              }),
              (0, R.jsxs)(An, {
                id: `birthplace`,
                defaultValue: ``,
                children: [
                  (0, R.jsx)(`option`, {
                    value: ``,
                    disabled: !0,
                    children: `Sélectionner une commune`,
                  }),
                  (0, R.jsx)(`option`, { children: `Ouagadougou` }),
                  (0, R.jsx)(`option`, { children: `Bobo-Dioulasso` }),
                  (0, R.jsx)(`option`, { children: `Koudougou` }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`label`, { htmlFor: `gender`, children: `Sexe` }),
              (0, R.jsxs)(An, {
                id: `gender`,
                defaultValue: ``,
                children: [
                  (0, R.jsx)(`option`, {
                    value: ``,
                    disabled: !0,
                    children: `Sélectionner`,
                  }),
                  (0, R.jsx)(`option`, { children: `Féminin` }),
                  (0, R.jsx)(`option`, { children: `Masculin` }),
                ],
              }),
            ],
          }),
          (0, R.jsx)(Xn, {}),
        ],
      }),
    ],
  });
}
function li() {
  return (0, R.jsxs)(R.Fragment, {
    children: [
      (0, R.jsx)(si, {
        number: 2,
        title: `Vos justificatifs`,
        description: `Ajoutez des fichiers nets et complets. Chaque fichier doit peser moins de 5 Mo.`,
      }),
      (0, R.jsxs)(`div`, {
        className: `space-y-5`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsxs)(`h3`, {
                className: `ecasier-upload-title`,
                children: [
                  `CNIB ou passeport `,
                  (0, R.jsx)(B, {
                    variant: `destructive`,
                    size: `sm`,
                    children: `Obligatoire`,
                  }),
                ],
              }),
              (0, R.jsx)(qn, { label: `Ajouter votre pièce d’identité` }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsxs)(`h3`, {
                className: `ecasier-upload-title`,
                children: [
                  `Acte de naissance `,
                  (0, R.jsx)(B, {
                    variant: `destructive`,
                    size: `sm`,
                    children: `Obligatoire`,
                  }),
                ],
              }),
              (0, R.jsx)(qn, { label: `Ajouter votre acte de naissance` }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ui() {
  return (0, R.jsxs)(R.Fragment, {
    children: [
      (0, R.jsx)(si, {
        number: 3,
        title: `Vérifiez votre demande`,
        description: `Relisez attentivement les informations avant de passer au paiement.`,
      }),
      (0, R.jsxs)(`div`, {
        className: `ecasier-summary`,
        children: [
          (0, R.jsxs)(`section`, {
            children: [
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`h3`, { children: `Identité` }),
                  (0, R.jsx)(`button`, { children: `Modifier` }),
                ],
              }),
              (0, R.jsxs)(`dl`, {
                children: [
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Nom complet` }),
                      (0, R.jsx)(`dd`, { children: `Adama Ouédraogo` }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Naissance` }),
                      (0, R.jsx)(`dd`, {
                        children: `14 mai 1991 à Ouagadougou`,
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Téléphone` }),
                      (0, R.jsx)(`dd`, { children: `+226 70 00 00 00` }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`section`, {
            children: [
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`h3`, { children: `Documents` }),
                  (0, R.jsx)(`button`, { children: `Modifier` }),
                ],
              }),
              (0, R.jsxs)(`p`, {
                children: [
                  (0, R.jsx)(_e, {}),
                  ` cnib-adama.pdf `,
                  (0, R.jsx)(D, {}),
                ],
              }),
              (0, R.jsxs)(`p`, {
                children: [
                  (0, R.jsx)(_e, {}),
                  ` acte-naissance.pdf `,
                  (0, R.jsx)(D, {}),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`section`, {
            className: `ecasier-price`,
            children: [
              (0, R.jsx)(`span`, { children: `Montant total` }),
              (0, R.jsx)(`strong`, { children: `500 FCFA` }),
              (0, R.jsx)(`small`, {
                children: `Quittance 300 FCFA + timbre fiscal 200 FCFA`,
              }),
            ],
          }),
        ],
      }),
      (0, R.jsx)(jn, {
        className: `mt-5`,
        children: `Je certifie que les informations fournies sont exactes.`,
      }),
    ],
  });
}
function di({ paid: e, onPay: t }) {
  return (0, R.jsxs)(R.Fragment, {
    children: [
      (0, R.jsx)(si, {
        number: 4,
        title: `Paiement mobile money`,
        description: `Choisissez un opérateur puis confirmez le paiement avec votre code OTP.`,
      }),
      e
        ? (0, R.jsx)(Dn, {
            variant: `success`,
            title: `Paiement confirmé`,
            children: `Votre transaction de 500 FCFA a été validée.`,
          })
        : (0, R.jsxs)(R.Fragment, {
            children: [
              (0, R.jsxs)(`div`, {
                className: `ecasier-payment-options`,
                children: [
                  (0, R.jsxs)(`button`, {
                    className: `selected`,
                    children: [
                      (0, R.jsx)(`span`, {
                        className: `orange-money`,
                        children: `OM`,
                      }),
                      (0, R.jsx)(`strong`, { children: `Orange Money` }),
                      (0, R.jsx)(T, {}),
                    ],
                  }),
                  (0, R.jsxs)(`button`, {
                    children: [
                      (0, R.jsx)(`span`, {
                        className: `moov-money`,
                        children: `MM`,
                      }),
                      (0, R.jsx)(`strong`, { children: `Moov Money` }),
                    ],
                  }),
                ],
              }),
              (0, R.jsx)(Dn, {
                title: `Générez votre code de paiement`,
                children: `Depuis votre téléphone, composez le code de paiement indiqué par votre opérateur.`,
              }),
              (0, R.jsx)(`div`, {
                className: `mt-5`,
                children: (0, R.jsx)(Jn, { label: `Code OTP reçu` }),
              }),
              (0, R.jsxs)(z, {
                className: `mt-6`,
                width: `full`,
                onClick: t,
                children: [`Payer 500 FCFA `, (0, R.jsx)(Ee, {})],
              }),
            ],
          }),
    ],
  });
}
function fi({ onHome: e }) {
  return (0, R.jsxs)(`div`, {
    className: `ecasier-confirmation`,
    children: [
      (0, R.jsx)(`span`, { children: (0, R.jsx)(D, {}) }),
      (0, R.jsx)(B, { variant: `success`, children: `Demande transmise` }),
      (0, R.jsx)(`h1`, { children: `Votre demande est enregistrée` }),
      (0, R.jsxs)(`p`, {
        children: [
          `Un message de confirmation a été envoyé au `,
          (0, R.jsx)(`strong`, { children: `+226 70 00 00 00` }),
          `.`,
        ],
      }),
      (0, R.jsxs)(`div`, {
        children: [
          (0, R.jsx)(`small`, { children: `Référence de suivi` }),
          (0, R.jsx)(`strong`, { children: `ECJ-2026-004821` }),
        ],
      }),
      (0, R.jsx)(Dn, {
        title: `Conservez cette référence`,
        children: `Elle vous permettra de suivre votre demande et de télécharger votre document.`,
      }),
      (0, R.jsxs)(`div`, {
        className: `flex flex-wrap justify-center gap-3`,
        children: [
          (0, R.jsxs)(z, {
            variant: `outline`,
            children: [(0, R.jsx)(pe, {}), ` Télécharger le récépissé`],
          }),
          (0, R.jsxs)(z, {
            onClick: e,
            children: [(0, R.jsx)(Ce, {}), ` Retour à l’accueil`],
          }),
        ],
      }),
    ],
  });
}
function pi({ onHome: e }) {
  return (0, R.jsxs)(`main`, {
    className: `ecasier-tracking-page`,
    children: [
      (0, R.jsxs)(`button`, {
        className: `ecasier-back-home`,
        onClick: e,
        children: [(0, R.jsx)(S, {}), ` Retour à l’accueil`],
      }),
      (0, R.jsxs)(`div`, {
        className: `ecasier-section-heading`,
        children: [
          (0, R.jsx)(`span`, { children: `Suivre une demande` }),
          (0, R.jsx)(`h1`, { children: `Où en est votre dossier ?` }),
          (0, R.jsx)(`p`, {
            children: `Renseignez la référence reçue lors de votre demande.`,
          }),
        ],
      }),
      (0, R.jsxs)(V, {
        className: `ecasier-tracking-search`,
        children: [
          (0, R.jsx)(Fn, {
            label: `Référence du dossier`,
            defaultValue: `ECJ-2026-004821`,
          }),
          (0, R.jsxs)(z, { children: [(0, R.jsx)(Pe, {}), ` Rechercher`] }),
        ],
      }),
      (0, R.jsxs)(V, {
        className: `ecasier-tracking-result`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsxs)(B, {
                variant: `primary`,
                children: [(0, R.jsx)(de, {}), ` En traitement`],
              }),
              (0, R.jsx)(`h2`, {
                children: `Bulletin n°3 du casier judiciaire`,
              }),
              (0, R.jsx)(`span`, { children: `Référence ECJ-2026-004821` }),
            ],
          }),
          (0, R.jsx)(zn, { value: 66, label: `Progression du dossier` }),
          (0, R.jsxs)(`ol`, {
            children: [
              (0, R.jsxs)(`li`, {
                className: `done`,
                children: [
                  (0, R.jsx)(T, {}),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Demande transmise` }),
                      (0, R.jsx)(`small`, {
                        children: `25 juillet 2026 · 14:32`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                className: `done`,
                children: [
                  (0, R.jsx)(T, {}),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Paiement confirmé` }),
                      (0, R.jsx)(`small`, {
                        children: `25 juillet 2026 · 14:35`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                className: `current`,
                children: [
                  (0, R.jsx)(de, {}),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Vérification par le greffe`,
                      }),
                      (0, R.jsx)(`small`, { children: `Traitement en cours` }),
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                children: [
                  (0, R.jsx)(ge, {}),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Document disponible` }),
                      (0, R.jsx)(`small`, { children: `Étape à venir` }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function mi() {
  let [e, t] = (0, h.useState)(!1);
  return (0, R.jsxs)(`div`, {
    className: `campus-app`,
    children: [
      (0, R.jsx)(`div`, { className: `civic-line` }),
      (0, R.jsxs)(`header`, {
        className: `campus-header`,
        children: [
          (0, R.jsxs)(`a`, {
            href: Kr(`exemple-campusfaso/`),
            className: `campus-brand`,
            children: [
              (0, R.jsx)(`span`, { children: (0, R.jsx)(xe, {}) }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`strong`, { children: `CampusFaso` }),
                  (0, R.jsx)(`small`, {
                    children: `Orientation universitaire`,
                  }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`nav`, {
            children: [
              (0, R.jsx)(`a`, { href: `#formations`, children: `Formations` }),
              (0, R.jsx)(`a`, { href: `#calendrier`, children: `Calendrier` }),
              (0, R.jsx)(`a`, { href: `#aide`, children: `Aide` }),
            ],
          }),
          (0, R.jsx)(z, {
            variant: e ? `ghost` : `outline`,
            size: `sm`,
            onClick: () => t(!e),
            children: e
              ? (0, R.jsxs)(R.Fragment, {
                  children: [(0, R.jsx)(De, {}), ` Déconnexion`],
                })
              : (0, R.jsxs)(R.Fragment, {
                  children: [(0, R.jsx)(Ve, {}), ` Mon espace`],
                }),
          }),
        ],
      }),
      e ? (0, R.jsx)(gi, {}) : (0, R.jsx)(hi, { onConnect: () => t(!0) }),
      (0, R.jsxs)(`footer`, {
        className: `campus-footer`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`strong`, { children: `CampusFaso` }),
              (0, R.jsx)(`span`, {
                children: `Ministère de l’Enseignement supérieur, de la Recherche et de l’Innovation`,
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`a`, { href: `#aide`, children: `Assistance` }),
              (0, R.jsx)(`a`, {
                href: `#formations`,
                children: `Guide du candidat`,
              }),
              (0, R.jsx)(`a`, { href: Kr(), children: `Retour à Faso UI` }),
            ],
          }),
        ],
      }),
    ],
  });
}
function hi({ onConnect: e }) {
  return (0, R.jsxs)(`main`, {
    children: [
      (0, R.jsxs)(`section`, {
        className: `campus-hero`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsxs)(B, {
                variant: `success`,
                children: [
                  (0, R.jsx)(`span`, { className: `status-dot` }),
                  ` Campagne 2026–2027 ouverte`,
                ],
              }),
              (0, R.jsxs)(`h1`, {
                children: [
                  `Choisis ta formation.`,
                  (0, R.jsx)(`br`, {}),
                  (0, R.jsx)(`span`, { children: `Construis ton avenir.` }),
                ],
              }),
              (0, R.jsx)(`p`, {
                children: `La plateforme nationale pour candidater aux formations des universités publiques et privées du Burkina Faso.`,
              }),
              (0, R.jsxs)(`div`, {
                className: `campus-actions`,
                children: [
                  (0, R.jsxs)(z, {
                    size: `lg`,
                    onClick: e,
                    children: [`Créer mon dossier `, (0, R.jsx)(C, {})],
                  }),
                  (0, R.jsxs)(z, {
                    variant: `outline`,
                    size: `lg`,
                    children: [(0, R.jsx)(Pe, {}), ` Explorer les formations`],
                  }),
                ],
              }),
            ],
          }),
          (0, R.jsxs)(V, {
            className: `campus-deadline`,
            children: [
              (0, R.jsx)(`span`, {
                className: `campus-deadline-icon`,
                children: (0, R.jsx)(oe, {}),
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`small`, { children: `Prochaine échéance` }),
                  (0, R.jsx)(`h2`, { children: `Demandes d’orientation` }),
                ],
              }),
              (0, R.jsx)(`strong`, { children: `26 juillet` }),
              (0, R.jsx)(`p`, {
                children: `Clôture de la première session à 23 h 59.`,
              }),
              (0, R.jsx)(`div`, {
                className: `campus-meter`,
                children: (0, R.jsx)(`span`, {}),
              }),
              (0, R.jsxs)(`button`, {
                children: [`Voir tout le calendrier `, (0, R.jsx)(le, {})],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `campus-steps`,
        id: `formations`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `01` }),
              (0, R.jsx)(ie, {}),
              (0, R.jsx)(`strong`, { children: `Explore` }),
              (0, R.jsx)(`p`, {
                children: `Compare les filières et leurs conditions d’accès.`,
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `02` }),
              (0, R.jsx)(T, {}),
              (0, R.jsx)(`strong`, { children: `Candidate` }),
              (0, R.jsx)(`p`, {
                children: `Classe tes choix et transmets ton dossier.`,
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `03` }),
              (0, R.jsx)(Ne, {}),
              (0, R.jsx)(`strong`, { children: `Confirme` }),
              (0, R.jsx)(`p`, {
                children: `Consulte ton orientation et valide ton inscription.`,
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `campus-calendar`,
        id: `calendrier`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `Campagne nationale` }),
              (0, R.jsx)(`h2`, { children: `Les dates à retenir` }),
              (0, R.jsx)(`p`, {
                children: `Un calendrier lisible pour ne manquer aucune étape de ton orientation.`,
              }),
            ],
          }),
          (0, R.jsxs)(`ol`, {
            children: [
              (0, R.jsxs)(`li`, {
                className: `active`,
                children: [
                  (0, R.jsx)(`time`, { children: `19–26 juil.` }),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Candidatures` }),
                      `Première session`,
                    ],
                  }),
                  (0, R.jsx)(B, { variant: `success`, children: `En cours` }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                children: [
                  (0, R.jsx)(`time`, { children: `10–13 sept.` }),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Résultats` }),
                      `Publication des orientations`,
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                children: [
                  (0, R.jsx)(`time`, { children: `4–10 sept.` }),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Paiement` }),
                      `Validation de l’inscription`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `campus-help`,
        id: `aide`,
        children: [
          (0, R.jsx)(ue, {}),
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`strong`, {
                children: `Besoin d’aide pour ton dossier ?`,
              }),
              (0, R.jsx)(`p`, {
                children: `Nos conseillers répondent les jours ouvrables, de 8 h à 18 h.`,
              }),
            ],
          }),
          (0, R.jsx)(z, { variant: `outline`, children: `80 00 13 80` }),
        ],
      }),
    ],
  });
}
function gi() {
  return (0, R.jsxs)(`main`, {
    className: `campus-dashboard`,
    children: [
      (0, R.jsxs)(`div`, {
        className: `campus-dashboard-head`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `Espace candidat` }),
              (0, R.jsx)(`h1`, { children: `Bonjour, Aïcha.` }),
              (0, R.jsx)(`p`, {
                children: `Ton dossier avance bien. Il reste une action avant de pouvoir candidater.`,
              }),
            ],
          }),
          (0, R.jsx)(B, { variant: `success`, children: `Dossier actif` }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        className: `campus-dashboard-grid`,
        children: [
          (0, R.jsxs)(V, {
            className: `campus-profile-card`,
            children: [
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(Ve, {}),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, { children: `Aïcha Kaboré` }),
                      (0, R.jsx)(`small`, { children: `Bac D · Session 2026` }),
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`span`, { children: `Complétude du dossier` }),
                  (0, R.jsx)(`strong`, { children: `75 %` }),
                ],
              }),
              (0, R.jsx)(`div`, {
                className: `campus-progress`,
                children: (0, R.jsx)(`span`, {}),
              }),
              (0, R.jsxs)(z, {
                width: `full`,
                children: [`Compléter mon profil `, (0, R.jsx)(C, {})],
              }),
            ],
          }),
          (0, R.jsxs)(`section`, {
            className: `campus-choices`,
            children: [
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsx)(`span`, { children: `Mes choix de formation` }),
                  (0, R.jsx)(z, { size: `sm`, children: `Ajouter un choix` }),
                ],
              }),
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, {
                    className: `choice-rank`,
                    children: `1`,
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Licence Informatique`,
                      }),
                      (0, R.jsx)(`small`, {
                        children: `Université Joseph Ki-Zerbo · Ouagadougou`,
                      }),
                    ],
                  }),
                  (0, R.jsx)(B, { variant: `success`, children: `Éligible` }),
                  (0, R.jsx)(le, {}),
                ],
              }),
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, {
                    className: `choice-rank`,
                    children: `2`,
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Licence Mathématiques`,
                      }),
                      (0, R.jsx)(`small`, {
                        children: `Université Nazi Boni · Bobo-Dioulasso`,
                      }),
                    ],
                  }),
                  (0, R.jsx)(B, { variant: `neutral`, children: `À vérifier` }),
                  (0, R.jsx)(le, {}),
                ],
              }),
              (0, R.jsxs)(V, {
                className: `campus-action-card`,
                children: [
                  (0, R.jsx)(de, {}),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Finalise ton dossier avant le 26 juillet`,
                      }),
                      (0, R.jsx)(`small`, {
                        children: `Ajoute ton relevé de notes pour transmettre tes choix.`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function _i() {
  let [e, t] = (0, h.useState)(!1),
    [n, r] = (0, h.useState)(1);
  return (0, R.jsxs)(`div`, {
    className: `nationality-app`,
    children: [
      (0, R.jsx)(`div`, { className: `civic-line` }),
      (0, R.jsx)(Cn, { serviceName: `e-Certificat de nationalité` }),
      (0, R.jsxs)(`div`, {
        className: `nationality-official`,
        children: [
          (0, R.jsx)(Ie, {}),
          ` Site officiel de la justice burkinabè`,
        ],
      }),
      e
        ? (0, R.jsx)(yi, { step: n, setStep: r, onHome: () => t(!1) })
        : (0, R.jsx)(vi, { onStart: () => t(!0) }),
      (0, R.jsx)(wn, {}),
    ],
  });
}
function vi({ onStart: e }) {
  return (0, R.jsxs)(`main`, {
    children: [
      (0, R.jsxs)(`section`, {
        className: `nationality-hero`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, {
                className: `ecasier-eyebrow`,
                children: `Ministère de la Justice`,
              }),
              (0, R.jsx)(`h1`, {
                children: `Votre certificat de nationalité, désormais en ligne.`,
              }),
              (0, R.jsx)(`p`, {
                children: `Constituez votre dossier, réglez les frais et suivez son traitement sans multiplier les déplacements au tribunal.`,
              }),
              (0, R.jsxs)(`div`, {
                children: [
                  (0, R.jsxs)(z, {
                    size: `lg`,
                    onClick: e,
                    children: [`Commencer la demande `, (0, R.jsx)(C, {})],
                  }),
                  (0, R.jsxs)(z, {
                    size: `lg`,
                    variant: `outline`,
                    children: [(0, R.jsx)(Pe, {}), ` Suivre mon dossier`],
                  }),
                ],
              }),
              (0, R.jsxs)(`small`, {
                children: [
                  (0, R.jsx)(Ee, {}),
                  ` Connexion et paiement sécurisés`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(V, {
            className: `nationality-document`,
            children: [
              (0, R.jsx)(`div`, {
                className: `nationality-seal`,
                children: `★`,
              }),
              (0, R.jsx)(`span`, { children: `Burkina Faso` }),
              (0, R.jsx)(ge, {}),
              (0, R.jsx)(`small`, { children: `Document demandé` }),
              (0, R.jsx)(`h2`, {
                children: `Certificat de nationalité burkinabè`,
              }),
              (0, R.jsxs)(`dl`, {
                children: [
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Démarche` }),
                      (0, R.jsx)(`dd`, { children: `100 % en ligne` }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    children: [
                      (0, R.jsx)(`dt`, { children: `Paiement` }),
                      (0, R.jsx)(`dd`, { children: `Sous 24 heures` }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `nationality-intro`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(`span`, { children: `Avant de commencer` }),
              (0, R.jsx)(`h2`, { children: `Identifiez votre situation` }),
              (0, R.jsx)(`p`, {
                children: `Les justificatifs demandés dépendent du fondement juridique de votre nationalité.`,
              }),
            ],
          }),
          (0, R.jsxs)(`div`, {
            className: `nationality-reasons`,
            children: [
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, { children: `01` }),
                  (0, R.jsx)(Ve, {}),
                  (0, R.jsx)(`strong`, {
                    children: `Nationalité par filiation`,
                  }),
                  (0, R.jsx)(`p`, {
                    children: `Votre père ou votre mère possède la nationalité burkinabè.`,
                  }),
                ],
              }),
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, { children: `02` }),
                  (0, R.jsx)(_e, {}),
                  (0, R.jsx)(`strong`, { children: `Naissance et résidence` }),
                  (0, R.jsx)(`p`, {
                    children: `Vous êtes né et résidez au Burkina Faso de parents étrangers.`,
                  }),
                ],
              }),
              (0, R.jsxs)(V, {
                children: [
                  (0, R.jsx)(`span`, { children: `03` }),
                  (0, R.jsx)(Ie, {}),
                  (0, R.jsx)(`strong`, { children: `Autre situation` }),
                  (0, R.jsx)(`p`, {
                    children: `Mariage, naturalisation ou décision administrative.`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, R.jsxs)(`section`, {
        className: `nationality-reassurance`,
        children: [
          (0, R.jsxs)(`div`, {
            children: [
              (0, R.jsx)(B, {
                variant: `success`,
                children: `Démarche guidée`,
              }),
              (0, R.jsxs)(`h2`, {
                children: [
                  `Un dossier clair,`,
                  (0, R.jsx)(`br`, {}),
                  `étape par étape.`,
                ],
              }),
            ],
          }),
          (0, R.jsxs)(`ol`, {
            children: [
              (0, R.jsxs)(`li`, {
                children: [
                  (0, R.jsx)(T, {}),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Décrivez votre situation`,
                      }),
                      `Le service adapte automatiquement les pièces demandées.`,
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                children: [
                  (0, R.jsx)(T, {}),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Ajoutez vos justificatifs`,
                      }),
                      `Vous vérifiez chaque document avant l’envoi.`,
                    ],
                  }),
                ],
              }),
              (0, R.jsxs)(`li`, {
                children: [
                  (0, R.jsx)(T, {}),
                  (0, R.jsxs)(`span`, {
                    children: [
                      (0, R.jsx)(`strong`, {
                        children: `Suivez le traitement`,
                      }),
                      `Chaque changement de statut apparaît dans votre espace.`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function yi({ step: e, setStep: t, onHome: n }) {
  let r = [`Situation`, `Identité`, `Parents`, `Conjoint`, `Justificatifs`];
  return (0, R.jsxs)(`main`, {
    className: `nationality-form`,
    children: [
      (0, R.jsx)(`button`, { onClick: n, children: `← Retour à l’accueil` }),
      (0, R.jsxs)(`div`, {
        className: `nationality-form-head`,
        children: [
          (0, R.jsx)(`span`, { children: `Nouvelle demande` }),
          (0, R.jsx)(`h1`, { children: `Certificat de nationalité` }),
          (0, R.jsx)(zn, { value: e * 20, label: `Étape ${e} sur 5` }),
        ],
      }),
      (0, R.jsxs)(`div`, {
        className: `nationality-form-layout`,
        children: [
          (0, R.jsxs)(`aside`, {
            children: [
              (0, R.jsx)(`ol`, {
                children: r.map((t, n) =>
                  (0, R.jsxs)(
                    `li`,
                    {
                      className:
                        n + 1 === e ? `active` : n + 1 < e ? `done` : ``,
                      children: [
                        (0, R.jsx)(`span`, {
                          children: n + 1 < e ? (0, R.jsx)(T, {}) : n + 1,
                        }),
                        t,
                      ],
                    },
                    t,
                  ),
                ),
              }),
              (0, R.jsx)(Dn, {
                title: `Votre brouillon est enregistré`,
                children: `Vous pourrez reprendre cette demande depuis votre espace.`,
              }),
            ],
          }),
          (0, R.jsxs)(V, {
            className: `nationality-form-card`,
            children: [
              e === 1
                ? (0, R.jsxs)(R.Fragment, {
                    children: [
                      (0, R.jsx)(B, {
                        variant: `neutral`,
                        children: `Étape 1 sur 5`,
                      }),
                      (0, R.jsx)(`h2`, {
                        children: `Quelle est votre situation ?`,
                      }),
                      (0, R.jsx)(`p`, {
                        children: `Choisissez le fondement qui correspond à votre demande.`,
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `nationality-options`,
                        children: [
                          (0, R.jsx)(Mn, {
                            name: `reason`,
                            defaultChecked: !0,
                            children: `Je suis né(e) d’un parent burkinabè`,
                          }),
                          (0, R.jsx)(Mn, {
                            name: `reason`,
                            children: `Je suis né(e) et réside au Burkina Faso, de parents étrangers`,
                          }),
                          (0, R.jsx)(Mn, {
                            name: `reason`,
                            children: `J’ai acquis la nationalité par mariage ou naturalisation`,
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, R.jsxs)(R.Fragment, {
                    children: [
                      (0, R.jsxs)(B, {
                        variant: `neutral`,
                        children: [`Étape `, e, ` sur 5`],
                      }),
                      (0, R.jsx)(`h2`, { children: r[e - 1] }),
                      (0, R.jsx)(`p`, {
                        children: `Renseignez les informations telles qu’elles figurent sur vos documents d’état civil.`,
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `nationality-fields`,
                        children: [
                          (0, R.jsx)(Fn, {
                            label: `Nom de famille`,
                            placeholder: `Ex. Ouédraogo`,
                            required: !0,
                          }),
                          (0, R.jsx)(Fn, {
                            label: `Prénom(s)`,
                            placeholder: `Ex. Issa`,
                            required: !0,
                          }),
                          (0, R.jsx)(Fn, {
                            label: `Date de naissance`,
                            type: `date`,
                            required: !0,
                          }),
                          (0, R.jsxs)(`div`, {
                            children: [
                              (0, R.jsx)(`label`, {
                                htmlFor: `commune`,
                                children: `Commune de naissance`,
                              }),
                              (0, R.jsxs)(An, {
                                id: `commune`,
                                children: [
                                  (0, R.jsx)(`option`, {
                                    children: `Ouagadougou`,
                                  }),
                                  (0, R.jsx)(`option`, {
                                    children: `Bobo-Dioulasso`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
              (0, R.jsxs)(`div`, {
                className: `nationality-form-actions`,
                children: [
                  e > 1
                    ? (0, R.jsx)(z, {
                        variant: `outline`,
                        onClick: () => t(e - 1),
                        children: `Retour`,
                      })
                    : (0, R.jsx)(`span`, {}),
                  e < 5
                    ? (0, R.jsxs)(z, {
                        onClick: () => t(e + 1),
                        children: [`Continuer `, (0, R.jsx)(C, {})],
                      })
                    : (0, R.jsxs)(z, {
                        children: [
                          `Transmettre le dossier `,
                          (0, R.jsx)(C, {}),
                        ],
                      }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var bi = qr(window.location.pathname),
  xi = bi.startsWith(`/exemple-casier`)
    ? ii
    : bi.startsWith(`/exemple-campusfaso`)
      ? mi
      : bi.startsWith(`/exemple-certificat-nationalite`)
        ? _i
        : ni;
(0, He.createRoot)(document.getElementById(`root`)).render(
  (0, R.jsx)(h.StrictMode, { children: (0, R.jsx)(xi, {}) }),
);
