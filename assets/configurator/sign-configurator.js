//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, l = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, u = (n, r, o) => (o = n == null ? {} : e(i(n)), l(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), d, f, p, m, h, g, _, v, y, b, x, S, C, w, ee, T, te = {}, E = [], D = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, O = Array.isArray;
function ne(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function re(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function k(e, t, n) {
	var r, i, a, o = {};
	for (a in t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : o[a] = t[a];
	if (arguments.length > 2 && (o.children = arguments.length > 3 ? d.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) o[a] === void 0 && (o[a] = e.defaultProps[a]);
	return A(e, o, r, i, null);
}
function A(e, t, n, r, i) {
	var a = {
		type: e,
		props: t,
		key: n,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: i ?? ++p,
		__i: -1,
		__u: 0
	};
	return i == null && f.vnode != null && f.vnode(a), a;
}
function j(e) {
	return e.children;
}
function ie(e, t) {
	this.props = e, this.context = t;
}
function ae(e, t) {
	if (t == null) return e.__ ? ae(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? ae(e) : null;
}
function oe(e) {
	if (e.__P && e.__d) {
		var t = e.__v, n = t.__e, r = [], i = [], a = ne({}, t);
		a.__v = t.__v + 1, f.vnode && f.vnode(a), ge(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? ae(t), !!(32 & t.__u), i), a.__v = t.__v, a.__.__k[a.__i] = a, ve(r, a, i), t.__e = t.__ = null, a.__e != n && se(a);
	}
}
function se(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), se(e);
}
function ce(e) {
	(!e.__d && (e.__d = !0) && h.push(e) && !M.__r++ || g != f.debounceRendering) && ((g = f.debounceRendering) || _)(M);
}
function M() {
	try {
		for (var e, t = 1; h.length;) h.length > t && h.sort(v), e = h.shift(), t = h.length, oe(e);
	} finally {
		h.length = M.__r = 0;
	}
}
function le(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, _ = r && r.__k || E, v = t.length;
	for (c = ue(n, t, _, c, v), d = 0; d < v; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && _[p.__i] || te, p.__i = d, g = ge(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && xe(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = de(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && g !== void 0 ? c = g : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function ue(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = A(null, o, null, null, null) : O(o) ? o = e.__k[a] = A(j, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = A(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = fe(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = ae(s)), Se(s, s));
	return r;
}
function de(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = de(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = ae(e)), t = n.insertBefore(e.__e, t || null));
	do
		t = t && t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function fe(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function pe(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || D.test(t) ? n : n + "px";
}
function me(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || pe(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || pe(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(S, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? r ? n[x] = r[x] : (n[x] = C, e.addEventListener(t, a ? ee : w, a)) : e.removeEventListener(t, a ? ee : w, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function he(e) {
	return function(t) {
		if (this.l) {
			var n = this.l[t.type + e];
			if (t[b] == null) t[b] = C++;
			else if (t[b] < n[x]) return;
			return n(f.event ? f.event(t) : t);
		}
	};
}
function ge(e, t, n, r, i, a, o, s, c, l) {
	var u, d, p, m, h, g, _, v, y, b, x, S, C, w, ee, T, te = t.type;
	if (t.constructor !== void 0) return null;
	128 & n.__u && (c = !!(32 & n.__u), a = [s = t.__e = n.__e]), (u = f.__b) && u(t);
	n: if (typeof te == "function") {
		d = o.length;
		try {
			if (y = t.props, b = te.prototype && te.prototype.render, x = (u = te.contextType) && r[u.__c], S = u ? x ? x.props.value : u.__ : r, n.__c ? v = (p = t.__c = n.__c).__ = p.__E : (b ? t.__c = p = new te(y, S) : (t.__c = p = new ie(y, S), p.constructor = te, p.render = Ce), x && x.sub(p), p.state || (p.state = {}), p.__n = r, m = p.__d = !0, p.__h = [], p._sb = []), b && p.__s == null && (p.__s = p.state), b && te.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = ne({}, p.__s)), ne(p.__s, te.getDerivedStateFromProps(y, p.__s))), h = p.props, g = p.state, p.__v = t, m) b && te.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), b && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (b && te.getDerivedStateFromProps == null && y !== h && p.componentWillReceiveProps != null && p.componentWillReceiveProps(y, S), t.__v == n.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(y, p.__s, S)) {
					t.__v != n.__v && (p.props = y, p.state = p.__s, p.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), E.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && o.push(p), s = ae(n);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(y, p.__s, S), b && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(h, g, _);
				});
			}
			if (p.context = S, p.props = y, p.__P = e, p.__e = !1, C = f.__r, w = 0, b) p.state = p.__s, p.__d = !1, C && C(t), u = p.render(p.props, p.state, p.context), E.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, C && C(t), u = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++w < 25);
			p.state = p.__s, p.getChildContext != null && (r = ne(ne({}, r), p.getChildContext())), b && !m && p.getSnapshotBeforeUpdate != null && (_ = p.getSnapshotBeforeUpdate(h, g)), ee = u != null && u.type === j && u.key == null ? ye(u.props.children) : u, s = le(e, O(ee) ? ee : [ee], t, n, r, i, a, o, s, c, l), p.base = t.__e, t.__u &= -161, p.__h.length && o.push(p), v && (p.__E = p.__ = null);
		} catch (e) {
			if (o.length = d, t.__v = null, c || a != null) {
				if (e.then) {
					for (t.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling;) s = s.nextSibling;
					a != null && (a[a.indexOf(s)] = null), t.__e = s;
				} else if (a != null) for (T = a.length; T--;) re(a[T]);
			} else t.__e = n.__e;
			t.__k ?? (t.__k = n.__k || []), e.then || _e(t), f.__e(e, t, n);
		}
	} else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = be(n.__e, t, n, r, i, a, o, c, l);
	return (u = f.diffed) && u(t), 128 & t.__u ? void 0 : s;
}
function _e(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(_e));
}
function ve(e, t, n) {
	for (var r = 0; r < n.length; r++) xe(n[r], n[++r], n[++r]);
	f.__c && f.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			f.__e(e, t.__v);
		}
	});
}
function ye(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : O(e) ? e.map(ye) : e.constructor === void 0 ? ne({}, e) : null;
}
function be(e, t, n, r, i, a, o, s, c) {
	var l, u, p, m, h, g, _, v = n.props || te, y = t.props, b = t.type;
	if (b == "svg" ? i = "http://www.w3.org/2000/svg" : b == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), a != null) {
		for (l = 0; l < a.length; l++) if ((h = a[l]) && "setAttribute" in h == !!b && (b ? h.localName == b : h.nodeType == 3)) {
			e = h, a[l] = null;
			break;
		}
	}
	if (e == null) {
		if (b == null) return document.createTextNode(y);
		e = document.createElementNS(i, b, y.is && y), s && (f.__m && f.__m(t, a), s = !1), a = null;
	}
	if (b == null) v === y || s && e.data == y || (e.data = y);
	else {
		if (a = b == "textarea" && y.defaultValue != null ? null : a && d.call(e.childNodes), !s && a != null) for (v = {}, l = 0; l < e.attributes.length; l++) v[(h = e.attributes[l]).name] = h.value;
		for (l in v) h = v[l], l == "dangerouslySetInnerHTML" ? p = h : l == "children" || l in y || l == "value" && "defaultValue" in y || l == "checked" && "defaultChecked" in y || me(e, l, null, h, i);
		for (l in y) h = y[l], l == "children" ? m = h : l == "dangerouslySetInnerHTML" ? u = h : l == "value" ? g = h : l == "checked" ? _ = h : s && typeof h != "function" || v[l] === h || me(e, l, h, v[l], i);
		if (u) s || p && (u.__html == p.__html || u.__html == e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
		else if (p && (e.innerHTML = ""), le(t.type == "template" ? e.content : e, O(m) ? m : [m], t, n, r, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, o, a ? a[0] : n.__k && ae(n, 0), s, c), a != null) for (l = a.length; l--;) re(a[l]);
		s && b != "textarea" || (l = "value", b == "progress" && g == null ? e.removeAttribute("value") : g != null && (g !== e[l] || b == "progress" && !g || b == "option" && g != v[l]) && me(e, l, g, v[l], i), l = "checked", _ != null && _ != e[l] && me(e, l, _, v[l], i));
	}
	return e;
}
function xe(e, t, n) {
	try {
		if (typeof e == "function") {
			var r = typeof e.__u == "function";
			r && e.__u(), r && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		f.__e(e, n);
	}
}
function Se(e, t, n) {
	var r, i;
	if (f.unmount && f.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || xe(r, null, t)), (r = e.__c) != null) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			f.__e(e, t);
		}
		r.base = r.__P = r.__n = null;
	}
	if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && Se(r[i], t, n || typeof e.type != "function");
	n || re(e.__e), e.__c = e.__ = e.__e = void 0;
}
function Ce(e, t, n) {
	return this.constructor(e, n);
}
function we(e, t, n) {
	var r, i, a, o;
	t == document && (t = document.documentElement), f.__ && f.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], o = [], ge(t, e = (!r && n || t).__k = k(j, null, [e]), i || te, te, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? d.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, o), ve(a, e, o), e.props.children = null;
}
function Te(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, ce(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + T++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
d = E.slice, f = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, p = 0, m = function(e) {
	return e != null && e.constructor === void 0;
}, ie.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = ne({}, this.state);
	typeof e == "function" && (e = e(ne({}, n), this.props)), e && ne(n, e), e != null && this.__v && (t && this._sb.push(t), ce(this));
}, ie.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), ce(this));
}, ie.prototype.render = j, h = [], _ = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, v = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, M.__r = 0, y = Math.random().toString(8), b = "__d" + y, x = "__a" + y, S = /(PointerCapture)$|Capture$/i, C = 0, w = he(!1), ee = he(!0), T = 0;
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
var Ee, De, Oe, ke, Ae = 0, je = [], Me = f, Ne = Me.__b, Pe = Me.__r, Fe = Me.diffed, Ie = Me.__c, Le = Me.unmount, Re = Me.__;
function ze(e, t) {
	Me.__h && Me.__h(De, e, Ae || t), Ae = 0;
	var n = De.__H || (De.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function N(e) {
	return Ae = 1, Be(Qe, e);
}
function Be(e, t, n) {
	var r = ze(Ee++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Qe(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = De, !De.__f)) {
		var i = function(e, t, n) {
			if (!r.__c.__H) return !0;
			var i = !1, o = r.__c.props !== e;
			if (r.__c.__H.__.some(function(e) {
				if (e.__N) {
					i = !0;
					var t = e.__[0];
					e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (o = !0);
				}
			}), a) {
				var s = a.call(this, e, t, n);
				return i ? s || o : s;
			}
			return !i || o;
		};
		De.__f = !0;
		var a = De.shouldComponentUpdate, o = De.componentWillUpdate;
		De.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, De.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Ve(e, t) {
	var n = ze(Ee++, 3);
	!Me.__s && Ze(n.__H, t) && (n.__ = e, n.u = t, De.__H.__h.push(n));
}
function He(e) {
	return Ae = 5, Ue(function() {
		return { current: e };
	}, []);
}
function Ue(e, t) {
	var n = ze(Ee++, 7);
	return Ze(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function We(e) {
	var t = De.context[e.__c], n = ze(Ee++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(De)), t.props.value) : e.__;
}
function Ge() {
	var e = ze(Ee++, 11);
	if (!e.__) {
		for (var t = De.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function Ke() {
	for (var e; e = je.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Ye), t.__h.some(Xe), t.__h = [];
		} catch (n) {
			t.__h = [], Me.__e(n, e.__v);
		}
	}
}
Me.__b = function(e) {
	De = null, Ne && Ne(e);
}, Me.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Re && Re(e, t);
}, Me.__r = function(e) {
	Pe && Pe(e), Ee = 0;
	var t = (De = e.__c).__H;
	t && (Oe === De ? (t.__h = [], De.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Ye), t.__h.some(Xe), t.__h = [], Ee = 0)), Oe = De;
}, Me.diffed = function(e) {
	Fe && Fe(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (je.push(t) !== 1 && ke === Me.requestAnimationFrame || ((ke = Me.requestAnimationFrame) || Je)(Ke)), t.__H.__.some(function(e) {
		e.u && (e.__H = e.u, e.u = void 0);
	})), Oe = De = null;
}, Me.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Ye), e.__h = e.__h.filter(function(e) {
				return !e.__ || Xe(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h && (e.__h = []);
			}), t = [], Me.__e(n, e.__v);
		}
	}), Ie && Ie(e, t);
}, Me.unmount = function(e) {
	Le && Le(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Ye(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && Me.__e(t, n.__v));
};
var qe = typeof requestAnimationFrame == "function";
function Je(e) {
	var t, n = function() {
		clearTimeout(r), qe && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	qe && (t = requestAnimationFrame(n));
}
function Ye(e) {
	var t = De, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), De = t;
}
function Xe(e) {
	var t = De;
	e.__c = e.__(), De = t;
}
function Ze(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Qe(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region node_modules/@preact/signals-core/dist/signals-core.module.js
var $e = Symbol.for("preact-signals");
function et() {
	if (ot > 1) ot--;
	else {
		var e, t = !1;
		for ((function() {
			var e = ut;
			for (ut = void 0; e !== void 0;) {
				var t = e.S;
				if (t.v === e.v) for (var n = t.t; n !== void 0; n = n.x) n.i === e.i && (n.i = t.i);
				e = e.o;
			}
		})(); at !== void 0;) {
			var n = at;
			for (at = void 0, st++; n !== void 0;) {
				var r = n.u;
				if (n.u = void 0, n.f &= -3, !(8 & n.f) && ht(n)) try {
					n.c();
				} catch (n) {
					t || (e = n, t = !0);
				}
				n = r;
			}
		}
		if (st = 0, ot--, t) throw e;
	}
}
function tt(e) {
	if (ot > 0) return e();
	lt = ++ct, ot++;
	try {
		return e();
	} finally {
		et();
	}
}
var nt, rt = void 0;
function it(e) {
	var t = rt, n = nt;
	rt = void 0, nt = void 0;
	try {
		return e();
	} finally {
		rt = t, nt = n;
	}
}
var at = void 0, ot = 0, st = 0, ct = 0, lt = 0, ut = void 0, dt = 0;
function ft(e) {
	if (rt !== void 0) {
		var t = e.n;
		if (t === void 0 || t.t !== rt) return t = {
			i: 0,
			S: e,
			p: rt.s,
			n: void 0,
			t: rt,
			e: void 0,
			x: void 0,
			r: t
		}, rt.s !== void 0 && (rt.s.n = t), rt.s = t, e.n = t, 32 & rt.f && e.S(t), t;
		if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = rt.s, t.n = void 0, rt.s.n = t, rt.s = t), t;
	}
}
function pt(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
pt.prototype.brand = $e, pt.prototype.h = function() {
	return !0;
}, pt.prototype.S = function(e) {
	var t = this, n = this.t;
	n !== e && e.e === void 0 && (e.x = n, this.t = e, n === void 0 ? it(function() {
		var e;
		(e = t.W) == null || e.call(t);
	}) : n.e = e);
}, pt.prototype.U = function(e) {
	var t = this;
	if (this.t !== void 0) {
		var n = e.e, r = e.x;
		n !== void 0 && (n.x = r, e.e = void 0), r !== void 0 && (r.e = n, e.x = void 0), e === this.t && (this.t = r, r === void 0 && it(function() {
			var e;
			(e = t.Z) == null || e.call(t);
		}));
	}
}, pt.prototype.subscribe = function(e) {
	var t = this;
	return wt(function() {
		var n = t.value;
		it(function() {
			return e(n);
		});
	}, { name: "sub" });
}, pt.prototype.valueOf = function() {
	return this.value;
}, pt.prototype.toString = function() {
	return this.value + "";
}, pt.prototype.toJSON = function() {
	return this.value;
}, pt.prototype.peek = function() {
	var e = this;
	return it(function() {
		return e.value;
	});
}, Object.defineProperty(pt.prototype, "value", {
	get: function() {
		var e = ft(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set: function(e) {
		if (e !== this.v) {
			if (st > 100) throw Error("Cycle detected");
			(function(e) {
				ot !== 0 && st === 0 && e.l !== lt && (e.l = lt, ut = {
					S: e,
					v: e.v,
					i: e.i,
					o: ut
				});
			})(this), this.v = e, this.i++, dt++, ot++;
			try {
				for (var t = this.t; t !== void 0; t = t.x) t.t.N();
			} finally {
				et();
			}
		}
	}
});
function mt(e, t) {
	return new pt(e, t);
}
function ht(e) {
	for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function gt(e) {
	for (var t = e.s; t !== void 0; t = t.n) {
		var n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function _t(e) {
	for (var t = e.s, n = void 0; t !== void 0;) {
		var r = t.p;
		t.i === -1 ? (t.S.U(t), r !== void 0 && (r.n = t.n), t.n !== void 0 && (t.n.p = r)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = r;
	}
	e.s = n;
}
function vt(e, t) {
	pt.call(this, void 0, t), this.x = e, this.s = void 0, this.g = dt - 1, this.f = 4;
}
vt.prototype = new pt(), vt.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === dt)) return !0;
	if (this.g = dt, this.f |= 1, this.i > 0 && !ht(this)) return this.f &= -2, !0;
	var e = rt;
	try {
		gt(this), rt = this;
		var t = this.x();
		(16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return rt = e, _t(this), this.f &= -2, !0;
}, vt.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
	}
	pt.prototype.S.call(this, e);
}, vt.prototype.U = function(e) {
	if (this.t !== void 0 && (pt.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
	}
}, vt.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (var e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(vt.prototype, "value", { get: function() {
	if (1 & this.f) throw Error("Cycle detected");
	var e = ft(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} });
function yt(e, t) {
	return new vt(e, t);
}
function bt(e) {
	var t = e.m;
	if (e.m = void 0, typeof t == "function") {
		ot++;
		var n = rt;
		rt = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, xt(e), t;
		} finally {
			rt = n, et();
		}
	}
}
function xt(e) {
	for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, bt(e);
}
function St(e) {
	if (rt !== this) throw Error("Out-of-order effect");
	_t(this), rt = e, this.f &= -2, 8 & this.f && xt(this), et();
}
function Ct(e, t) {
	this.x = e, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name, nt && nt.push(this);
}
Ct.prototype.c = function() {
	var e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		var t = this.x();
		typeof t == "function" && (this.m = t);
	} finally {
		e();
	}
}, Ct.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, bt(this), gt(this), ot++;
	var e = rt;
	return rt = this, St.bind(this, e);
}, Ct.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = at, at = this);
}, Ct.prototype.d = function() {
	this.f |= 8, 1 & this.f || xt(this);
}, Ct.prototype.dispose = function() {
	this.d();
};
function wt(e, t) {
	var n = new Ct(e, t);
	try {
		n.c();
	} catch (e) {
		throw n.d(), e;
	}
	var r = n.d.bind(n);
	return r[Symbol.dispose] = r, r;
}
//#endregion
//#region node_modules/@preact/signals/dist/signals.module.js
var Tt, Et, Dt = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, Ot = [];
wt(function() {
	Tt = this.N;
})();
function kt(e, t) {
	f[e] = t.bind(null, f[e] || function() {});
}
function At(e) {
	if (Et) {
		var t = Et;
		Et = void 0, t();
	}
	Et = e && e.S();
}
function jt(e) {
	var t = this, n = e.data, r = Nt(n);
	r.name = "ReactiveDom", r.value = n;
	var i = Ue(function() {
		for (var e = t, n = t.__v; n = n.__;) if (n.__c) {
			n.__c.__$f |= 4;
			break;
		}
		var i = yt(function() {
			var e = r.value.value;
			return e === 0 ? 0 : !0 === e ? "" : e || "";
		}), a = yt(function() {
			return !Array.isArray(i.value) && !m(i.value);
		}), o = wt(function() {
			if (this.N = It, a.value) {
				var t = i.value;
				e.__v && e.__v.__e && e.__v.__e.nodeType === 3 && (e.__v.__e.data = t);
			}
		}), s = t.__$u.d;
		return t.__$u.d = function() {
			o(), s.call(this);
		}, [a, i];
	}, []), a = i[0], o = i[1];
	return a.value ? o.peek() : o.value;
}
jt.displayName = "ReactiveTextNode", Object.defineProperties(pt.prototype, {
	constructor: {
		configurable: !0,
		value: void 0
	},
	type: {
		configurable: !0,
		value: jt
	},
	props: {
		configurable: !0,
		get: function() {
			var e = this;
			return { data: { get value() {
				return e.value;
			} } };
		}
	},
	__b: {
		configurable: !0,
		value: 1
	}
}), kt("__b", function(e, t) {
	if (At(), typeof t.type == "string") {
		var n, r = t.props;
		for (var i in r) if (i !== "children") {
			var a = r[i];
			a instanceof pt && (n || (t.__np = n = {}), n[i] = a, r[i] = a.peek());
		}
	}
	e(t);
}), kt("__r", function(e, t) {
	if (e(t), t.type !== j) {
		At();
		var n, r = t.__c;
		r && (r.__$f &= -2, (n = r.__$u) === void 0 && (r.__$u = n = function(e, t) {
			var n;
			return wt(function() {
				n = this;
			}, { name: t }), n.c = e, n;
		}(function(e) {
			return function() {
				var t;
				Dt && ((t = this.y) == null || t.call(this)), e.__$f |= 1, e.setState({});
			};
		}(r), typeof t.type == "function" ? t.type.displayName || t.type.name : ""))), At(n);
	}
}), kt("__e", function(e, t, n, r) {
	At(), e(t, n, r);
}), kt("diffed", function(e, t) {
	At();
	var n;
	if (typeof t.type == "string" && (n = t.__e)) {
		var r = t.__np, i = t.props, a = n.U;
		if (a) for (var o in a) {
			var s = a[o];
			s === void 0 || r && o in r || (s.d(), a[o] = void 0);
		}
		if (r) for (var c in a || (a = {}, n.U = a), r) {
			var l = a[c], u = r[c];
			l === void 0 ? (l = Mt(n, c, u, i), a[c] = l) : l.o(u, i);
		}
	}
	e(t);
});
function Mt(e, t, n, r) {
	var i = t in e && e.ownerSVGElement === void 0, a = mt(n);
	return {
		o: function(e, t) {
			a.value = e, r = t;
		},
		d: wt(function() {
			this.N = It;
			var n = a.value.value;
			r[t] !== n && (r[t] = n, i ? e[t] = n : n != null && (!1 !== n || t[4] === "-") ? e.setAttribute(t, n) : e.removeAttribute(t));
		})
	};
}
kt("unmount", function(e, t) {
	if (typeof t.type == "string") {
		var n = t.__e;
		if (n) {
			var r = n.U;
			if (r) for (var i in n.U = void 0, r) {
				var a = r[i];
				a && a.d();
			}
		}
		var o = t.__np;
		if (o) {
			var s = t.props;
			for (var c in o) s[c] = o[c];
		}
		t.__np = void 0;
	} else {
		var l = t.__c;
		if (l) {
			l.__$f |= 8;
			var u = l.__$u;
			u && (l.__$u = void 0, u.d());
		}
	}
	e(t);
}), kt("__h", function(e, t, n, r) {
	r < 3 && (t.__$f |= 2), e(t, n, r);
}), ie.prototype.shouldComponentUpdate = function(e, t) {
	if (this.__R) return !0;
	var n = this.__$u, r = n && n.s !== void 0;
	for (var i in t) return !0;
	if (this.__f || typeof this.u == "boolean" && !0 === this.u) {
		var a = 2 & this.__$f;
		if (!(r || a || 4 & this.__$f) || 1 & this.__$f) return !0;
	} else if (!(r || 4 & this.__$f) || 3 & this.__$f) return !0;
	for (var o in e) if (o !== "__source" && e[o] !== this.props[o]) return !0;
	for (var s in this.props) if (!(s in e)) return !0;
	return !1;
};
function Nt(e, t) {
	return Ue(function() {
		return mt(e, t);
	}, []);
}
var Pt = function(e) {
	queueMicrotask(function() {
		queueMicrotask(e);
	});
};
function Ft() {
	tt(function() {
		for (var e; e = Ot.shift();) Tt.call(e);
	});
}
function It() {
	Ot.push(this) === 1 && (f.requestAnimationFrame || Pt)(Ft);
}
//#endregion
//#region src/styles/sign.css?url
var Lt = "" + new URL("sign-configurator.css", import.meta.url).href;
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/typeof.js
function Rt(e) {
	"@babel/helpers - typeof";
	return Rt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Rt(e);
}
var zt = o((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPrimitive.js
function Bt(e, t) {
	if (Rt(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Rt(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Vt = o((() => {
	zt();
}));
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPropertyKey.js
function Ht(e) {
	var t = Bt(e, "string");
	return Rt(t) == "symbol" ? t : t + "";
}
var Ut = o((() => {
	zt(), Vt();
}));
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/defineProperty.js
function P(e, t, n) {
	return (t = Ht(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var Wt = o((() => {
	Ut();
}));
//#endregion
//#region src/integrations/aso/mapConfig.ts
Wt();
var Gt = class extends Error {
	constructor(e) {
		super(e.join("\n")), P(this, "problems", void 0), this.problems = e;
	}
}, F = (e, t = 0) => {
	if (typeof e == "number") return Number.isFinite(e) ? e : t;
	let n = Number(String(e ?? "").trim().replace(",", "."));
	return String(e ?? "").trim() !== "" && Number.isFinite(n) ? n : t;
}, Kt = (e) => {
	let t = F(e, -1);
	return t > 0 ? t : null;
}, I = (e, t = "") => e == null ? t : String(e).trim() || t, L = (e) => Array.isArray(e) ? e : [], qt = (e) => L(e).map((e) => String(e)).filter(Boolean), Jt = (e) => (e.visible ?? e.isVisible) !== !1, Yt = (e, t = "item") => String(e ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || t;
function Xt(e) {
	let t = Math.max(0, e.findIndex((e) => e.isDefault));
	return e.map((e, n) => ({
		...e,
		isDefault: n === t
	}));
}
function Zt(e) {
	let t = typeof e.data == "string" ? JSON.parse(e.data) : e.data;
	if (!t || typeof t != "object") throw new Gt(["currentConfig.data est vide ou illisible"]);
	return t;
}
var Qt = (e) => e, R = (...e) => {
	for (let t of e) {
		let e = I(t);
		if (e) return Qt(e);
	}
}, $t = [
	"oval",
	"square",
	"triangle",
	"rounded-square",
	"rotated-square",
	"turn-left",
	"turn-right",
	"arrow-left",
	"arrow-right",
	"stop",
	"rounded-top",
	"rounded-sides",
	"cut-to-shape"
], en = [
	"none",
	"adhesive-tape",
	"screw",
	"screw-cap",
	"standoff",
	"hanging",
	"flag",
	"suction-cup",
	"table-stand",
	"ceiling",
	"pole-attachment",
	"cable-labeling",
	"table-clamp",
	"base-support",
	"magnetic-strip",
	"keyring",
	"sign-holder",
	"eyelets",
	"s-hook",
	"roll-up",
	"invisible-standoff",
	"hidden-mount",
	"pins"
], tn = [
	"none",
	"normal",
	"rounded-corners",
	"old-world"
], nn = {
	shape: "/images/shapes/ic_shape_",
	border: "/images/borders/ic_border_",
	fixing: "/images/fixing-methodes/ic_fixmethod_"
}, rn = {
	"border-normal": "thin",
	"shape-rounded-square": "rounded",
	"fixing-cable-labeling": "cable_label"
}, an = (e, t) => `${nn[e]}${rn[`${e}-${t}`] ?? t.replace(/-/g, "_")}.svg`;
function on(e, t, n, r) {
	let i = L(e).map((e, r) => {
		let i = Yt(n(e), String(r)), a = I(e.id), o = `${t}-${i}`;
		return {
			id: !a || a === `fixing-method-${i}` ? o : a,
			key: i,
			index: r,
			icon: R(e.icon, e.url, e.previewImg),
			popupImage: R(e.popupImage, e.popImg)
		};
	});
	return i.length ? i : r.map((e, n) => ({
		id: `${t}-${e}`,
		key: e,
		index: n,
		icon: R(an(t, e))
	}));
}
var sn = (e) => e === "stand-off" ? "standoff" : e;
function cn(e, t) {
	let n = I(e);
	if (!n) return null;
	if (/^\d+$/.test(n)) return t.find((e) => e.index === Number(n)) ?? null;
	for (let e of [n, n.replace(/^fixing-method-/, "fixing-").replace(/^border-border-/, "border-")]) {
		let n = t.find((t) => t.id === e);
		if (n) return n;
		let r = sn(e.replace(/^(shape|fixing|border)-/, "")), i = t.find((e) => sn(e.key) === r);
		if (i) return i;
		let a = /^(?:shape|fixing|border)-(?:method-)?\s*(\d+)$/.exec(e);
		if (a) {
			let e = t.find((e) => e.index === Number(a[1]));
			if (e) return e;
		}
	}
	return null;
}
function ln(e) {
	return {
		shapes: on(e?.allShapes, "shape", (e) => e.value ?? e.name ?? e.key ?? e.id, $t),
		fixings: on(e?.allFixingMethods, "fixing", (e) => e.type ?? e.name ?? e.key ?? e.id, en),
		borders: on(e?.allBorders ?? e?.borders, "border", (e) => e.value ?? e.name ?? e.key ?? e.id, tn)
	};
}
var un = /* @__PURE__ */ new Set([
	"rectangle",
	"oval",
	"square",
	"triangle",
	"rounded-square",
	"rotated-square",
	"turn-left",
	"turn-right",
	"arrow-left",
	"arrow-right",
	"stop",
	"rounded-top",
	"rounded-sides",
	"cut-to-shape"
]), dn = /* @__PURE__ */ new Set([
	"none",
	"normal",
	"rounded-corners",
	"old-world"
]), fn = (e) => e && un.has(e.key) ? e.key : "rectangle", pn = (e) => e && dn.has(e.key) ? e.key : "normal", mn = (e) => e ? sn(e.key) : "none";
function hn(e, t, n) {
	let r = (e) => e == null || e === "" ? null : F(e), i = n, a = n?.unit;
	return {
		id: e,
		label: t,
		type: I(n?.type),
		ranges: L(n?.range).map((e) => ({
			surface: r(e.surface),
			size: r(e.size),
			basePrice: F(e.basePrice ?? e.price ?? e.additionalPrice),
			charPrice: r(e.charPrice),
			startPriceAtChar: r(e.startPriceAtChar),
			maxTextChar: r(e.maxTextChar),
			perRange: typeof e.perRange == "boolean" ? e.perRange : null
		})),
		unit: a ? {
			surface: F(a.surface),
			areaFactor: F(a.areaConversionFactor),
			basePrice: F(a.basePrice),
			charPrice: r(a.charPrice)
		} : null,
		perUnit: n?.rangePricingPerUnit === !0,
		flatPrice: F(i?.basePrice ?? i?.price ?? i?.additionalPrice)
	};
}
function gn(e) {
	return {
		kind: e?.type === "base" || e?.type === "multiplier" ? e.type : "none",
		value: F(e?.value)
	};
}
var _n = {
	materials: "material",
	sizes: "size",
	shapes: "shape",
	"fixing-methodes": "fixing",
	borders: "border",
	colors: "color",
	lightings: "lighting",
	lighting: "lighting",
	texts: "text",
	qrcodes: "qrcode",
	images: "image",
	"additional-options": "options",
	"additional-components": "addons"
};
function vn(e, t) {
	let n = e.mode === "simple", r = e.sizes.length > 0 || e.customSize !== null, i = (e, t, n, r) => (t.length ? e.filter((e) => t.includes(e.id)).length : r ? e.length : 0) + n.length, a = (t) => !n && e.components.some((e) => e.options.some((e) => t(e) > 1)), o = {
		material: e.materials.length > 1 || !n,
		component: !n && e.components.length > 0,
		size: n && r,
		shape: n ? e.shapes.length > 0 : a((t) => i(e.shapes, t.shapeIds, t.customShapes, !0)),
		fixing: n ? e.fixings.length > 0 : a((t) => i(e.fixings, t.fixingIds, t.customFixings, !1)),
		border: n ? e.borders.length > 0 : a((t) => i(e.borders, t.borderIds, t.customBorders, !1)),
		color: n && r && e.colors.length > 0,
		lighting: e.lightingEnabled && e.lightings.length > 0,
		text: n && r,
		qrcode: !n || r,
		image: n && r && (e.images.upload || e.images.cliparts),
		options: e.inputs.length > 0,
		addons: n && e.addons.length > 0,
		templates: !1
	}, s = [...t];
	if (!s.some((e) => _n[e.type] === "lighting")) {
		let e = s.findIndex((e) => e.type === "colors");
		s.splice(e >= 0 ? e + 1 : s.length, 0, {
			type: "lightings",
			active: !0
		});
	}
	let c = [];
	for (let e of s) {
		let t = _n[e.type];
		t && e.active && o[t] && !c.includes(t) && (c.push(t), t === "material" && o.component && c.push("component"));
	}
	return o.component && !c.includes("component") && c.unshift("component"), c;
}
function yn(e) {
	let t = e?.colors, n = t?.optionsSideBar?.options?.modals, r = t?.optionsSideBar?.options?.buttons, i = t?.recaps;
	return {
		pageBg: t?.bars?.backgroundColor ?? "#ffffff",
		barBg: t?.bars?.backgroundColor ?? "#ffffff",
		barTitle: t?.bars?.titleColor ?? "#000000",
		stageBg: t?.canvas?.backgroundColor ?? "#f4f8fa",
		stageBorder: t?.canvas?.borderColor ?? "#c3cfd6",
		panelBg: t?.optionsSideBar?.backgroundColor ?? "#eef3f6",
		optionText: r?.textColor ?? "#000000",
		optionHoverText: r?.hoverTextColor ?? "#016464",
		optionActiveText: n?.option?.activeTextColor ?? "#016464",
		optionHoverBg: n?.option?.hoverBackgroundColor ?? "#eef3f6",
		primary: n?.buttons?.backgroundColor ?? "#016464",
		primaryText: n?.buttons?.textColor ?? "#ffffff",
		primaryHover: n?.buttons?.hoverBackgroundColor ?? "#028383",
		finishBg: i?.buttonFinishBackgroundColor ?? "#febd52",
		finishText: i?.buttonFinishTextColor ?? "#14213d",
		finishHoverBg: i?.buttonFinishHoverBackgroundColor ?? "#fcac29",
		cartBg: i?.buttonAddToCartBackgroundColor ?? "#febd52",
		cartText: i?.buttonAddToCartTextColor ?? "#14213d",
		cartHoverBg: i?.buttonAddToCartHoverBackgroundColor ?? "#fcac29",
		priceBg: t?.bars?.price?.backgroundColor ?? "#ffffff",
		priceText: t?.bars?.price?.textColor ?? "#000000",
		priceBeforeText: t?.bars?.price?.textBeforeColor ?? "#000000",
		priceAfterText: t?.bars?.price?.textAfterColor ?? "#000000",
		danger: t?.objectsOptions?.delete?.textColor ?? "#dd3232",
		customCss: I(e?.customCss)
	};
}
function bn(e) {
	let t = {
		small: F(e?.small),
		medium: F(e?.medium),
		large: F(e?.large)
	};
	return t.small || t.medium || t.large ? t : {
		small: 10,
		medium: 20,
		large: 30
	};
}
function xn(e, t) {
	let n = e.custom === !0 && I(e.url) !== "", r = cn(e.shapeId ?? e.id, t.shapes);
	return {
		id: I(e.id) || r?.id || "shape",
		label: I(e.label, "Shape"),
		image: R(r?.icon, e.icon, e.url, e.previewImg),
		popupImage: R(r?.popupImage, e.popImg),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault,
		kind: n ? "custom" : fn(r),
		svgUrl: n ? R(e.url) : void 0,
		priceBySurface: e.enablePricingBySurface === !0 ? { surface: F(e.surface) } : null,
		excludeMaterials: qt(e.excludeMaterials),
		outlineSizes: bn(e.shapeSize)
	};
}
function Sn(e, t) {
	let n = e.custom === !0 && I(e.url) !== "", r = cn(e.borderId ?? e.manageBorderId ?? e.id, t.borders);
	return {
		id: I(e.id) || r?.id || "border",
		label: I(e.label, "Border"),
		description: I(e.description) || void 0,
		image: R(r?.icon, e.icon, e.url, e.previewImg),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault,
		kind: n ? "custom" : pn(r),
		svgUrl: n ? R(e.url) : void 0,
		excludeSizes: qt(e.excludeSizes),
		excludeShapes: qt(e.excludeShapes)
	};
}
function Cn(e, t) {
	let n = (e.mode === "custom" || e.custom === !0) && I(e.url || e.previewImg) !== "", r = cn(e.fixingMethodId ?? e.id, t.fixings);
	return {
		id: I(e.id) || r?.id || "fixing",
		label: I(e.label, "Fixing"),
		description: I(e.description) || void 0,
		image: R(r?.icon, e.icon, e.url, e.previewImg),
		popupImage: R(r?.popupImage, e.popImg),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault,
		kind: n ? "custom" : mn(r),
		svgUrl: n ? R(e.url, e.previewImg) : void 0,
		count: F(e.fixingCount),
		excludeMaterials: qt(e.excludeMaterials),
		excludeSizes: qt(e.excludeSizes),
		excludeShapes: qt(e.excludeShapes)
	};
}
function wn(e, t) {
	let n = !!(e.pattern?.active && I(e.pattern?.url));
	return {
		id: I(e.id) || `color-${Yt(e.name, String(t))}`,
		label: I(e.name, "Color"),
		image: R(e.prevImg),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault,
		hex: I(e.pattern?.codeHex, "#ffffff"),
		patternUrl: n ? R(e.pattern.url) ?? null : null,
		textColor: e.textColor?.active ? {
			hex: I(e.textColor.codeHex, "#000000"),
			name: I(e.textColor.name),
			sameForBorder: !!e.textColor.sameForBorder
		} : null,
		excludeMaterials: qt(e.excludeMaterials)
	};
}
var Tn = (e, t, n) => e && e[t] !== void 0 ? e[t] !== !1 : !n, En = (e, t, n, r) => {
	if (e) {
		if (e[t] === !1) return !1;
		if (e[n] !== void 0) return e[n] !== !1;
		if (e[t] !== void 0) return !0;
	}
	return !r;
}, Dn = (e) => {
	let t = e.permissions, n = e;
	return {
		edit: Tn(t, "editText", n.lockTextEdit),
		font: Tn(t, "changeFont", n.lockFont || n.loctFont || n.lockFontFamily),
		color: t?.changeColor !== !1,
		resize: Tn(t, "resizeText", n.lockScale === !0),
		moveX: En(t, "moveText", "moveTextX", n.lockMove?.x === !0),
		moveY: En(t, "moveText", "moveTextY", n.lockMove?.y === !0),
		rotate: Tn(t, "rotateText", n.lockRotate === !0),
		flipX: t?.flipHorizontally !== !1,
		flipY: t?.flipVertically !== !1
	};
};
function On(e, t) {
	let n = (e, t = (e) => e.id) => {
		let n = L(e), r = n.find((e) => e.isDefault);
		return {
			ids: n.map((e) => I(t(e))).filter(Boolean),
			def: r && I(t(r)) || void 0
		};
	}, r = n(e.sizes?.items), i = n(e.shapes?.items), a = n(e.borders?.items), o = n(e.fixingMethods?.items, (e) => e.fixingMethodId || e.id), s = n(e.backgrounds?.items), c = L(e.lightings?.items).map((e) => {
		let n = t.get(e.id);
		return {
			id: e.id,
			label: I(e.label ?? n?.label, "Light"),
			hex: I(e.hexCode ?? n?.hex, "#ffffff"),
			price: F(e.additionalPrice ?? n?.price),
			isDefault: !!e.isDefault
		};
	}), l = L(e.textZones).map((e) => ({
		id: e.id,
		label: I(e.label, "Text"),
		value: String(e.value ?? ""),
		fontLabel: I(e.defaultFont),
		fontSize: F(e.fontSize, 24),
		color: I(e.color, "#000000"),
		align: e.textAlign ?? "center",
		bold: !!e.bold,
		italic: !!e.italic,
		required: !!e.required,
		minChars: Kt(e.minCharacters ?? e.minChar),
		maxChars: Kt(e.maxCharacters ?? e.maxChar),
		x: F(e.x),
		y: F(e.y),
		percent: e.measure === "percent",
		can: Dn(e)
	})), u = L(e.imageZones).map((e) => {
		let t = e.permissions, n = t, r = e, i = e.allowedFiles ? Object.entries(e.allowedFiles).filter(([, e]) => e).map(([e]) => e) : [
			"svg",
			"png",
			"jpeg",
			"webp"
		];
		return {
			id: e.id,
			label: I(e.label, "Image"),
			image: R(e.image) ?? "",
			tint: I(e.tint) || null,
			fit: e.fitMode ?? "contain",
			lockRatio: e.lockAspectRatio !== !1,
			required: !!e.required,
			width: F(e.width, 30),
			height: F(e.height, 30),
			x: F(e.x),
			y: F(e.y),
			percent: e.measure === "percent",
			allowedTypes: i,
			maxFileSizeMb: Kt(e.maxFileSizeMb),
			can: {
				replace: t?.replaceImage !== !1,
				resize: Tn(n, "resizeImage", r.lockScale === !0),
				moveX: En(n, "moveImage", "moveImageX", r.lockMove?.x === !0),
				moveY: En(n, "moveImage", "moveImageY", r.lockMove?.y === !0),
				rotate: Tn(n, "rotateImage", r.lockRotate === !0),
				flipX: t?.flipHorizontally !== !1,
				flipY: t?.flipVertically !== !1
			}
		};
	}), d = (e) => L(e).filter((e) => e.custom === !0 && I(e.url)), f = (e, t, n) => ({
		id: I(e.id) || `${n}-${t}`,
		label: I(e.label, n),
		description: I(e.description) || void 0,
		image: R(e.previewImg, e.icon, e.url),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault
	}), p = d(e.shapes?.items).map((e, t) => ({
		...f(e, t, "custom-shape"),
		kind: "custom",
		svgUrl: R(e.url),
		priceBySurface: null,
		excludeMaterials: []
	})), m = d(e.borders?.items).map((e, t) => ({
		...f(e, t, "custom-border"),
		kind: "custom",
		svgUrl: R(e.url),
		excludeSizes: qt(e.excludeSizes),
		excludeShapes: qt(e.excludeShapes)
	})), h = d(e.fixingMethods?.items).map((e, t) => ({
		...f(e, t, "custom-fixing"),
		kind: "custom",
		svgUrl: R(e.url),
		count: F(e.fixingCount),
		excludeMaterials: [],
		excludeSizes: qt(e.excludeSizes),
		excludeShapes: qt(e.excludeShapes)
	}));
	return {
		id: I(e.id),
		label: I(e.label, "Design"),
		description: I(e.description) || void 0,
		image: R(e.image, e.icon),
		price: F(e.overrides?.additionalPrice ?? e.additionalPrice),
		isDefault: !!e.isDefault,
		sizeIds: r.ids,
		shapeIds: i.ids,
		borderIds: a.ids,
		fixingIds: o.ids,
		backgroundIds: s.ids,
		lightings: c,
		defaults: {
			size: r.def,
			shape: i.def,
			border: a.def,
			fixing: o.def,
			background: s.def,
			lighting: c.find((e) => e.isDefault)?.id
		},
		customShapes: p,
		customBorders: m,
		customFixings: h,
		textZones: l,
		imageZones: u
	};
}
function kn(e, t) {
	let n = {
		index: t,
		id: I(e.id) || `input-${t}`,
		label: I(e.label, "Option"),
		description: I(e.description) || void 0
	}, r = R(e.popupImg);
	switch (e.type) {
		case "yes/no": return {
			kind: "yes-no",
			...n,
			popupImage: r,
			yes: I(e.inputs?.yes, "Yes"),
			no: I(e.inputs?.no, "No"),
			default: e.default === "yes",
			price: gn(e.price)
		};
		case "dropdown": return {
			kind: "dropdown",
			...n,
			popupImage: r,
			options: L(e.options).map((e, t) => ({
				value: I(e.value, String(t)),
				label: I(e.label, String(t)),
				popupImage: R(e.popupImg),
				price: gn(e.price)
			}))
		};
		case "image-input": return {
			kind: "cards",
			...n,
			popupImage: r,
			options: L(e.options).map((e, t) => ({
				value: I(e.value, String(t)),
				label: I(e.label, String(t)),
				image: R(e.previewImg),
				color: I(e.color) || void 0,
				popupImage: R(e.popupImg),
				price: gn(e.price)
			}))
		};
		case "note": return {
			kind: "note",
			...n,
			maxChars: Kt(e.noteLimitChar)
		};
		case "include-type": return {
			kind: "included",
			...n,
			popupImage: r,
			price: gn(e.price)
		};
		default: return null;
	}
}
var An = /* @__PURE__ */ new Set([
	"mm",
	"cm",
	"m",
	"in",
	"ft"
]), jn = /^(arial|helvetica|times( new roman)?|verdana|georgia|tahoma|courier( new)?)$/i;
function Mn(e, t) {
	if (!t || !jn.test(e.trim())) return e;
	let n = decodeURIComponent(t.split(/[?#]/)[0].split("/").pop() ?? "").replace(/\.(ttf|otf|woff2?)$/i, ""), r = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, "");
	if (!n || r(n).includes(r(e))) return e;
	let i = n.replace(/[-_ ]?(regular|normal|book)$/i, "").replace(/[-_]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
	return i ? i.charAt(0).toUpperCase() + i.slice(1) : e;
}
function Nn(e, t, n = {}) {
	Qt = n.resolveAsset ?? ((e) => e);
	let r = Zt(e), i = [];
	if (r.settings || i.push("data.settings manquant"), r.requiredOptions || i.push("data.requiredOptions manquant (ancien format non pris en charge)"), i.length) throw new Gt(i);
	let a = r.settings, o = r.requiredOptions, s = r.additionalOptions ?? {}, c = a.customizerSign, l = c?.customizerOptions, u = a.languageImages?.visualizer ?? {}, d = a.languageImages?.images ?? {}, f = I(r.materialType ?? e.materialType).toLowerCase().startsWith("adv") ? "advance" : "simple", p = L(o.pricings?.items).map((e, t) => hn(I(e.id) || `pricing-${Yt(e.label ?? t, `p-${t}`)}`, I(e.label, `Pricing ${t + 1}`), e.customPricing)), m = Xt(L(s.materials?.items).filter((e) => e.active !== !1).map((e, t) => ({
		id: I(e.id) || `material-${t}`,
		label: I(e.label, `Material ${t + 1}`),
		description: I(e.description) || void 0,
		image: R(e.previewImg, e.image),
		popupImage: R(e.popupImg, e.popupImage, e.popImg),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault,
		pricingId: I(e.pricingId) || null,
		excludeComponentIds: qt(e.excludeComponentIds)
	}))), h = Xt(L(o.sizes?.items).map((e, t) => ({
		id: I(e.id) || `size-${t}`,
		label: I(e.label, `${e.width} x ${e.height}`),
		price: 0,
		isDefault: !!e.isDefault,
		width: F(e.width),
		height: F(e.height, F(e.width)),
		maxTextChar: Kt(e.maxTextChar),
		maxLines: Kt(e.numberOfLines ?? e.textNumber),
		excludeMaterials: qt(e.excludeMaterials)
	}))), g = o.sizes?.customSize ?? o.sizes?.settings?.customSize, _ = g?.active ? {
		width: {
			label: I(g.width?.label, "Width"),
			min: F(g.width?.min),
			max: F(g.width?.max, 1e3)
		},
		height: {
			label: I(g.height?.label, "Height"),
			min: F(g.height?.min),
			max: F(g.height?.max, 1e3)
		},
		hidePresets: !!g.hideSizes,
		pricing: g.pricings ? hn("custom-size", "Custom size", g.pricings) : null
	} : null, v = o.sizes?.thickness?.active ? o.sizes.thickness : o.sizes?.settings?.thickness ?? o.sizes?.thickness, y = L(v?.values).length ? L(v?.values) : L(v?.items), b = I(v?.unit).toLowerCase(), x = An.has(b) ? b : void 0, S = o.sizes?.orientationSwitcher ?? o.sizes?.settings?.orientationSwitcher, C = S && (S.active === !0 || S.enabled === !0) ? {
		label: I(S.label),
		portrait: I(S.portraitLabel),
		landscape: I(S.landscapeLabel),
		default: S.default === "landscape" ? "landscape" : "portrait"
	} : null, w = v?.active ? y.map((e, t) => {
		let n = typeof e == "object" && e ? e : {
			label: String(e),
			value: e
		};
		return {
			id: `thickness-${t}`,
			label: I(n.label, String(n.value ?? "")),
			value: F(n.value),
			pricingType: n.pricingType === "multiplier" ? "multiplier" : "additional",
			price: F(n.additionalPrice),
			multiplier: F(n.multiplier, 1),
			...x ? { unit: x } : {}
		};
	}) : [], ee = ln(t), T = Xt(L(o.shapes?.items).filter(Jt).map((e) => xn(e, ee))), te = Xt(L(o.borders?.items).filter(Jt).map((e) => Sn(e, ee))), E = Xt(L(o.fixingMethods?.items).filter(Jt).map((e) => Cn(e, ee))), D = Xt(L(o.colors?.items).map(wn)), O = Xt(L(o.lightings?.items).map((e, t) => ({
		id: I(e.id) || `lighting-${t}`,
		label: I(e.label, "Light"),
		price: F(e.additionalPrice),
		isDefault: !!e.isDefault,
		hex: I(e.hexCode, "#ffffff")
	}))), ne = new Map(O.map((e) => [e.id, e])), re = (e) => String(e.managedFontId ?? e.id), k = L(o.fonts?.items), A = qt(c?.text?.selectedFonts), j = A.length > 0 && k.some((e) => A.includes(re(e))), ie = new Map(L(t?.fonts).map((e) => [String(e.id), e])), ae = Xt(k.filter((e) => !j || A.includes(re(e))).map((e, t) => {
		let n = I(e.label, "Arial"), r = Mn(n, I(e.url) || I(ie.get(String(e.managedFontId))?.url));
		return {
			id: I(e.id) || `font-${t}`,
			label: n,
			...r === n ? {} : { display: r },
			url: R(e.url, ie.get(String(e.managedFontId))?.url) ?? "",
			isDefault: !!e.isDefault
		};
	})), oe = f === "advance" ? L(o.components?.items).filter((e) => e.isVisible !== !1).map((e, t) => ({
		id: I(e.id) || `component-${t}`,
		label: I(e.label, "Component"),
		description: I(e.description) || void 0,
		icon: R(e.icon),
		isDefault: !!e.isDefault,
		options: Xt(L(e.options).map((e) => On(e, ne)))
	})) : [], se = f === "simple" ? L(s.components?.items).map((e, t) => ({
		id: I(e.id) || `addon-${t}`,
		label: I(e.title, "Option"),
		description: I(e.description) || void 0,
		icon: R(e.icon),
		options: Xt(L(e.options).map((n, r) => ({
			id: `${I(e.id) || `addon-${t}`}-${r}`,
			label: I(n.title, `Option ${r + 1}`),
			description: I(n.description) || void 0,
			image: R(n.image, n.icon),
			popupImage: R(n.popupImg),
			price: F(n.additionalPrice),
			isDefault: !!n.isDefault,
			priceBySurface: n.enablePricingBySurface === !0 ? { surface: F(n.surface) } : null,
			excludeColorIds: qt(n.excludeColors)
		}))),
		disabledForMaterials: Object.entries(e.rulesByMaterial ?? {}).filter(([, e]) => e && e.enabled === !1).map(([e]) => e)
	})) : [], ce = L(s.inputs?.items).map(kn).filter((e) => e !== null), M = c?.text ?? {}, le = c?.images ?? {}, ue = M.enableFontSize, de = c?.signPart?.doublePart, fe = a.generals ?? {}, pe = fe.discounts, me = fe.quantityLimits, he = me?.enableQuantityLimits === !0 || me?.enableQuantityLimits === "on", ge = I(l?.measurementUnit, "cm").toLowerCase(), _e = I(l?.showHideMeasurements, "both").toLowerCase(), ve = L(t?.cliparts).map((e, t) => ({
		id: I(e.id, String(t)),
		title: I(e.title, `Cliparts ${t + 1}`),
		description: I(e.description) || void 0,
		items: L(e.cliparts).map((e, n) => ({
			id: I(e.id, `${t}-${n}`),
			title: I(e.title),
			url: R(e.url) ?? "",
			price: F(e.additionalPrice)
		})).filter((e) => e.url)
	})), ye = {
		id: I(e.id, "aso"),
		name: I(e.name),
		mode: f,
		productType: I(r.productType ?? e.productType, "signs-panels"),
		skin: a.themeColors?.skin === "couffo" ? "couffo" : "default",
		unit: An.has(ge) ? ge : "cm",
		unitSwitcher: (() => {
			let e = o.sizes?.unitSwitcher ?? o.sizes?.settings?.unitSwitcher;
			if (e?.enabled !== !0) return null;
			let t = An.has(ge) ? ge : "cm", n = [.../* @__PURE__ */ new Set([t, ...L(e.units).map((e) => String(e).toLowerCase())])].filter((e) => An.has(e));
			return n.length > 1 ? {
				label: I(e.label),
				units: n
			} : null;
		})(),
		decimals: I(l?.decimalFormatMeasurements, "with-decimal") !== "without-decimal",
		measurements: _e.includes("none") ? "none" : _e.includes("width") ? "width" : _e.includes("height") ? "height" : "both",
		panelSide: I(l?.desktopColumnOrder, "right") === "left" ? "left" : "right",
		finishPosition: l?.finishButtonPosition === "top" ? "top" : "bottom",
		sectionLabels: {
			material: I(s.materials?.label) || I(u.textMaterial),
			component: I(o.components?.settings?.label) || I(o.components?.label),
			size: I(u.textSize) || I(o.sizes?.label),
			shape: I(u.textShape) || I(o.shapes?.label),
			fixing: I(u.textFixingMethods) || I(o.fixingMethods?.label),
			border: I(u.textBorder) || I(o.borders?.label),
			color: I(u.textColor) || I(o.colors?.label),
			lighting: I(o.lightings?.label),
			text: I(u.textOptionText),
			image: I(u.textImage),
			options: I(u.textAdditonnalOptionsHeader) || I(s.inputs?.label),
			addons: I(s.components?.label)
		},
		sectionIcons: {
			material: R(d.changeIconMaterial),
			size: R(d.changeIconSize),
			shape: R(d.changeIconShape),
			fixing: R(d.changeIconFixingMethod),
			border: R(d.changeIconBorder),
			color: R(d.changeIconColor),
			text: R(d.changeIconText),
			image: R(d.changeIconImage),
			qrcode: R(d.changeIconQrCode),
			component: R(o.components?.settings?.tabIcon)
		},
		materials: m,
		pricingProfiles: p,
		sizes: _?.hidePresets ? [] : h,
		customSize: _,
		orientation: C,
		thickness: w,
		shapes: T,
		borders: te,
		borderSettings: {
			colors: L(o.borders?.settings?.colors).map((e, t) => ({
				id: `border-color-${Yt(e.name, String(t))}`,
				label: I(e.name, e.codeHex),
				hex: I(e.codeHex, "#000000"),
				price: F(e.additionalPrice)
			})),
			allowColor: o.borders?.settings?.enableBorderColor !== !1,
			allowWidth: o.borders?.settings?.enableBorderWidth !== !1,
			colorsLabel: I(o.borders?.settings?.borderColorsLabel, "Border colors")
		},
		fixings: E,
		colors: D,
		customBackground: o.colors?.customColors?.active ? {
			label: I(o.colors.customColors.label, "Custom color"),
			image: R(o.colors.customColors.prevImg)
		} : null,
		lightings: O,
		lightingEnabled: o.lightings?.enabled !== !1,
		fonts: ae,
		components: oe,
		componentsBehavior: o.components?.settings?.behavior === "choose-before-customization" ? "choose-before-customization" : "show-options-directly",
		addons: se,
		inputs: ce,
		text: {
			colors: L(M.colors).map((e) => ({
				label: I(e.name, e.codeHex),
				hex: I(e.codeHex, "#000000")
			})),
			colorsLabel: I(M.colorsLabel, "Text colors"),
			allowCustomColor: M.enableCustomColor !== !1,
			customColorImage: R(M.colorsPrevImg),
			type: M.textType === "neon" ? "neon" : M.textType === "3D" || M.textType === "3d" ? "3D" : "normal",
			bold: M.enableBold !== !1,
			italic: M.enableItalic !== !1,
			underline: M.enableUnderline !== !1,
			strike: M.enableStrike !== !1,
			overline: M.enableOverline !== !1,
			outline: M.enableBorder !== !1,
			opacity: M.enableOpacity !== !1,
			curveUp: !!M.enableCurvedUp,
			curveDown: !!M.enableCurvedDown,
			align: M.enableTextAlignment !== !1,
			fontSize: {
				enabled: ue?.active !== !1,
				default: F(ue?.defaultFontSize, 16),
				min: F(ue?.minimumFontSize, 4),
				max: F(ue?.maximumFontSize, 100)
			}
		},
		images: {
			upload: le.enableUploadImage !== !1,
			cliparts: !!le.enableClipart && ve.some((e) => e.items.length > 0),
			clipartGroups: ve,
			cutline: {
				mode: le.selectedCutline === "1x" || le.selectedCutline === "2x" ? le.selectedCutline : "none",
				first: {
					size: F(le.cutlines?.first?.borderSize, 10),
					color: I(le.cutlines?.first?.color, "green")
				},
				second: {
					color: I(le.cutlines?.second?.color, "white"),
					size: F(le.cutlines?.second?.size, 30),
					borderColor: I(le.cutlines?.second?.borderColor, "red"),
					borderSize: F(le.cutlines?.second?.borderSize, 10)
				}
			},
			scenes: L(le.scenes).map((e) => R(typeof e == "string" ? e : e?.url)).filter((e) => !!e),
			allowedTypes: L(le.fileUploadScript?.allowedUploadsExtentions).map((e) => e.toLowerCase()),
			colors: L(le.colors).map((e) => ({
				label: I(e.name, e.codeHex),
				hex: I(e.codeHex, "#000000")
			})),
			allowCustomColor: le.enableCustomColor !== !1,
			customColorImage: R(le.colorsPrevImg),
			filters: Object.entries(le.filter ?? {}).filter(([e, t]) => e !== "active" && t === !0).map(([e]) => e.replace(/^enable/, "").toLowerCase().replace(/^embross$/, "emboss")).filter((e) => e !== "opacity"),
			download: !!le.enableDownloadImage
		},
		doubleSided: de?.active ? {
			label: I(de.label, "Switch face"),
			front: I(de.part1, "Face A"),
			back: I(de.part2, "Face B"),
			allowCopy: de.enableCopyDesignFromSide !== !1,
			pricing: de.pricing?.type === "multiplier" ? {
				kind: "multiplier",
				value: F(de.pricing.multiplier, 1)
			} : {
				kind: "additional",
				value: F(de.pricing?.additionalPrice)
			}
		} : null,
		output: {
			formats: I(fe.output?.filesFormat, "png").split("+").filter((e) => e === "png" || e === "jpeg" || e === "svg"),
			prefix: fe.output?.zipOutputFiles?.active ? I(fe.output.zipOutputFiles.zipOutFolderPrefix) : "",
			designComposition: fe.output?.designComposition !== !1,
			watermark: I(fe.output?.waterMark)
		},
		missingRequired: [...!g?.active && L(o.sizes?.items).length === 0 ? ["size"] : [], ...(f === "simple" ? L(o.shapes?.items).filter(Jt) : L(o.shapes?.items)).length === 0 ? ["shape"] : []],
		hidePricing: !!fe.product?.hidePricing,
		showRecap: fe.product?.showRecapAfterFinish !== !1,
		redirectToCheckout: !!fe.product?.redirectToCheckOutPage,
		quantity: {
			min: he ? Math.max(1, F(me?.minQuantity, 1)) : 1,
			max: he ? Kt(me?.maxQuantity) : null
		},
		discounts: {
			byQuantity: !!pe?.byQuantity,
			global: {
				kind: pe?.discount === "percent" || pe?.discount === "fixed" ? pe.discount : "none",
				value: F(pe?.discountValue)
			},
			lots: L(pe?.lots).map((e) => ({
				quantity: F(e.quantity),
				kind: e.discount === "percent" || e.discount === "fixed" ? e.discount : "none",
				value: F(e.discountValue)
			}))
		},
		quote: { enabled: !!fe.requestQuote?.enableRequestQuote },
		texts: Object.fromEntries(Object.entries(u).filter(([, e]) => typeof e == "string" && e.trim() !== "")),
		theme: yn(a.themeColors)
	};
	return {
		...ye,
		sections: vn(ye, L(c?.configOptions))
	};
}
//#endregion
//#region src/integrations/aso/assets.ts
var Pn = {
	fixing_methods_url: "/apps/aso-proxy/assets/images/fixing-methodes",
	fixing_methods_alt_url: "/apps/aso-proxy/assets/images/fixing-methods",
	borders_url: "/apps/aso-proxy/assets/images/borders",
	shapes_url: "/apps/aso-proxy/assets/images/shapes",
	filters_url: "/apps/aso-proxy/assets/images/filters",
	fonts_url: "/apps/aso-proxy/assets/fonts",
	uploads_url: "/apps/aso-proxy/uploads",
	default_files_url: "/apps/aso-proxy/aso_default_files",
	asset_images_url: "/apps/aso-proxy/assets/images",
	images_url: "/apps/aso-proxy/images",
	proxy_url: "/apps/aso-proxy"
};
function Fn(e) {
	let t = e.replace(/\/+$/, "");
	return {
		fixing_methods_url: `${t}/assets/images/fixing-methodes`,
		fixing_methods_alt_url: `${t}/assets/images/fixing-methods`,
		borders_url: `${t}/assets/images/borders`,
		shapes_url: `${t}/assets/images/shapes`,
		filters_url: `${t}/assets/images/filters`,
		fonts_url: `${t}/assets/fonts`,
		uploads_url: `${t}/uploads`,
		default_files_url: `${t}/aso_default_files`,
		asset_images_url: `${t}/assets/images`,
		images_url: `${t}/images`,
		proxy_url: t
	};
}
var In = [
	{
		key: "fixing_methods_url",
		patterns: [
			"/images/fixing-methodes/",
			"/assets/images/fixing-methodes/",
			"/apps/aso-proxy/assets/images/fixing-methodes/",
			"/fixing-methodes/",
			"/images/fixing-methods/",
			"/assets/images/fixing-methods/",
			"/apps/aso-proxy/assets/images/fixing-methods/",
			"/fixing-methods/"
		]
	},
	{
		key: "borders_url",
		patterns: [
			"/images/borders/",
			"/assets/images/borders/",
			"/apps/aso-proxy/assets/images/borders/",
			"/borders/"
		]
	},
	{
		key: "shapes_url",
		patterns: [
			"/images/shapes/",
			"/assets/images/shapes/",
			"/apps/aso-proxy/assets/images/shapes/",
			"/shapes/"
		]
	},
	{
		key: "filters_url",
		patterns: [
			"/images/filters/",
			"/assets/images/filters/",
			"/apps/aso-proxy/assets/images/filters/",
			"/filters/"
		]
	},
	{
		key: "fonts_url",
		patterns: [
			"/assets/fonts/",
			"/apps/aso-proxy/assets/fonts/",
			"/fonts/"
		]
	},
	{
		key: "uploads_url",
		patterns: ["/uploads/", "/apps/aso-proxy/uploads/"]
	},
	{
		key: "default_files_url",
		patterns: ["/aso_default_files/", "/apps/aso-proxy/aso_default_files/"]
	},
	{
		key: "asset_images_url",
		patterns: ["/assets/images/", "/apps/aso-proxy/assets/images/"]
	},
	{
		key: "images_url",
		patterns: ["/images/", "/apps/aso-proxy/images/"]
	}
], Ln = "/apps/aso-proxy/";
function Rn(e, t) {
	for (let n of In) for (let r of n.patterns) if (e.startsWith(r)) return `${t[n.key].replace(/\/+$/, "")}/${e.slice(r.length)}`;
	return e.startsWith(Ln) ? `${t.proxy_url.replace(/\/+$/, "")}/${e.slice(16)}` : "";
}
function zn(e, t) {
	let n = String(e ?? "").trim();
	if (!n || /^(data:|blob:)/i.test(n)) return n;
	let r = Rn(n, t);
	if (r) return r;
	if (/^(https?:)?\/\//i.test(n)) try {
		let e = new URL(n.startsWith("//") ? `https:${n}` : n);
		return Rn(e.pathname + e.search + e.hash, t) || n;
	} catch {
		return n;
	}
	return n;
}
//#endregion
//#region src/core/units.ts
var Bn = {
	mm: 1,
	cm: 10,
	m: 1e3,
	in: 25.4,
	ft: 304.8
}, Vn = (e, t) => e * Bn[t], Hn = (e, t) => e / Bn[t], Un = (e, t, n) => Hn(Vn(e, t), n);
function Wn(e, t, n = !0, r = "fr") {
	let i = n ? t === "mm" ? 0 : t === "m" ? 2 : 1 : 0;
	return new Intl.NumberFormat(r, { maximumFractionDigits: i }).format(e);
}
var Gn = (e, t, n, r = !0, i = "fr") => `${Wn(e, n, r, i)} × ${Wn(t, n, r, i)} ${n}`;
function Kn(e, t, n, r = "fr") {
	return e.unit ? `${new Intl.NumberFormat(r, { maximumFractionDigits: 2 }).format(e.value)} ${e.unit}` : `${Wn(Un(e.value, t, n), n, !0, r)} ${n}`;
}
//#endregion
//#region src/core/textFx.ts
var qn = "#ffffff";
function Jn(e, t) {
	let n = e === "3D";
	return {
		type: e,
		outline: {
			width: t.outlineWidth ?? +!!n,
			color: t.outlineColor ?? "#000000"
		},
		border2: n ? {
			width: t.border2Width ?? 5,
			color: t.border2Color ?? "#c4271d"
		} : null,
		side: n ? {
			on: t.side ?? !0,
			color: t.sideColor ?? "#000000"
		} : null,
		glow: e === "neon" ? {
			on: t.glow ?? !0,
			color: t.glowColor ?? "#ffa500"
		} : null,
		opacity: Math.min(1, Math.max(.1, t.opacity ?? 1))
	};
}
//#endregion
//#region src/core/rules.ts
var Yn = (e, t) => t && t.length ? e.filter((e) => t.includes(e.id)) : e, Xn = (e, t, n) => t ? e.filter((e) => (n ?? []).includes(e.id)) : e;
function Zn(e, t) {
	if (e.mode !== "advance") return null;
	let n = e.components.find((e) => e.id === t.componentId) ?? e.components[0];
	return n?.options.find((e) => e.id === t.componentOptionId) ?? n?.options[0] ?? null;
}
function Qn(e, t) {
	let n = e.materials.find((e) => e.id === t.materialId);
	return e.components.map((e) => ({
		...e,
		options: e.options.filter((t) => !n?.excludeComponentIds.includes(t.id) && !n?.excludeComponentIds.includes(e.id))
	})).filter((e) => e.options.length > 0);
}
function $n(e, t) {
	let n = Zn(e, t);
	return Yn(e.sizes, n?.sizeIds).filter((e) => !t.materialId || !e.excludeMaterials.includes(t.materialId));
}
function er(e, t) {
	return [...e.shapes, ...Zn(e, t)?.customShapes ?? []];
}
function tr(e, t) {
	return [...e.borders, ...Zn(e, t)?.customBorders ?? []];
}
function nr(e, t) {
	return [...e.fixings, ...Zn(e, t)?.customFixings ?? []];
}
function rr(e, t) {
	let n = Zn(e, t);
	return [...Yn(e.shapes, n?.shapeIds), ...n?.customShapes ?? []].filter((e) => !t.materialId || !e.excludeMaterials.includes(t.materialId));
}
function ir(e, t) {
	let n = t === "rectangle" ? "square" : t;
	return !e || e === "none" || e === "normal" ? !0 : e === "old-world" ? n === "square" : e === "rounded-corners" ? n === "rounded-square" : e !== "custom" || n === "square" || n === "rounded-square";
}
function ar(e, t) {
	let n = Zn(e, t), r = t.shapeId ? er(e, t).find((e) => e.id === t.shapeId)?.kind : void 0;
	return [...Xn(e.borders, n, n?.borderIds), ...n?.customBorders ?? []].filter((e) => !(t.sizeId && e.excludeSizes.includes(t.sizeId)) && !(t.shapeId && e.excludeShapes.includes(t.shapeId)) && (!r || ir(e.kind, r)));
}
function or(e, t) {
	let n = Zn(e, t);
	return [...Xn(e.fixings, n, n?.fixingIds), ...n?.customFixings ?? []].filter((e) => !(t.materialId && e.excludeMaterials.includes(t.materialId)) && !(t.sizeId && e.excludeSizes.includes(t.sizeId)) && !(t.shapeId && e.excludeShapes.includes(t.shapeId)));
}
function sr(e, t) {
	let n = Zn(e, t);
	return Yn(e.colors, n?.backgroundIds).filter((e) => !t.materialId || !e.excludeMaterials.includes(t.materialId));
}
function cr(e, t) {
	let n = Zn(e, t);
	return n ? n.lightings : e.lightings;
}
function lr(e, t) {
	return e.addons.filter((e) => !t.materialId || !e.disabledForMaterials.includes(t.materialId)).map((e) => ({
		...e,
		options: e.options.filter((e) => !t.colorId || !e.excludeColorIds.includes(t.colorId))
	})).filter((e) => e.options.length > 0);
}
function ur(e, t) {
	let n = e.unit === "in" ? 300 : e.unit === "cm" ? 120 : 12 * Vn(1, e.unit), r = t.width * n, i = t.height * n, a = r > i ? 1e3 / r : 370 / i, o = r * a, s = i * a;
	return (o > 1e3 || s > 370) && (a *= o > 1e3 ? 1e3 / o : 370 / s), n * a;
}
var dr = 40;
function fr(e, t, n) {
	return dr * n / 12 / ur(e, t);
}
function pr(e, t, n) {
	return n * ur(e, t) * 12 / dr;
}
function mr(e, t, n) {
	let r = (t) => e.fonts.find((e) => e.label.toLowerCase() === t.toLowerCase()) ?? e.fonts.find((e) => e.isDefault) ?? e.fonts[0], i = ur(e, n), a = (e) => e.percent ? {
		x: n.width / 2 * (e.x / 100),
		y: -(n.height / 2) * (e.y / 100)
	} : {
		x: e.x / i,
		y: -e.y / i
	};
	return [...t.imageZones.map((e) => ({
		id: e.id,
		type: "image",
		face: "front",
		zoneId: e.id,
		src: e.image,
		tint: e.tint,
		width: n.width * (e.width / 100),
		height: n.height * (e.height / 100),
		...a(e),
		rotation: 0
	})), ...t.textZones.map((t) => ({
		id: t.id,
		type: "text",
		face: "front",
		zoneId: t.id,
		text: t.value,
		fontId: r(t.fontLabel)?.id ?? "",
		size: fr(e, n, t.fontSize),
		color: t.color,
		bold: t.bold,
		italic: t.italic,
		underline: !1,
		strike: !1,
		align: t.align,
		curve: 0,
		...a(t),
		rotation: 0
	}))];
}
function hr(e, t) {
	return t.customColor ? null : e.colors.find((e) => e.id === t.colorId)?.textColor?.hex ?? null;
}
function gr(e, t) {
	return e.text.type === "neon" ? qn : hr(e, t) ?? e.text.colors[0]?.hex ?? "#000000";
}
var _r = (e, t) => !!e && !!t && e.trim().toLowerCase() === t.trim().toLowerCase();
function vr(e, t, n) {
	let r = hr(e, n);
	if (e.text.type === "neon" || !r) return n.objects;
	let i = gr(e, t), a = e.text.colors.length > 0 || e.text.allowCustomColor, o = Zn(e, n), s = !1, c = n.objects.map((e) => {
		if (e.type === "text") {
			if ((!a || o?.textZones.find((t) => t.id === e.zoneId)?.can.color === !1 || _r(e.color, i)) && !_r(e.color, r)) return s = !0, {
				...e,
				color: r
			};
		} else if (e.type === "image" && _r(e.tint, i) && !_r(e.tint, r)) return s = !0, {
			...e,
			tint: r
		};
		return e;
	});
	return s ? c : n.objects;
}
function yr(e, t, n) {
	let r = (e, t, n) => t && e.some((e) => e.id === t) ? t : n && e.some((e) => e.id === n) ? n : (e.find((e) => e.isDefault) ?? e[0])?.id ?? null, i = { ...t };
	if (i.materialId = r(e.materials, t.materialId), e.mode === "advance") {
		let n = Qn(e, i);
		i.componentId = r(n, t.componentId);
		let a = n.find((e) => e.id === i.componentId);
		i.componentOptionId = a ? r(a.options, t.componentOptionId) : null;
	}
	let a = Zn(e, i), o = a?.id !== Zn(e, n ?? t)?.id;
	i.sizeId = i.customSize && e.customSize && e.mode === "simple" ? null : r($n(e, i), o ? null : t.sizeId, a?.defaults.size), i.sizeId && (i.customSize = null), i.shapeId = r(rr(e, i), o ? null : t.shapeId, a?.defaults.shape), i.borderId = r(ar(e, i), o ? null : t.borderId, a?.defaults.border), i.fixingId = r(or(e, i), o ? null : t.fixingId, a?.defaults.fixing), i.customColor || (i.colorId = r(sr(e, i), o ? null : t.colorId, a?.defaults.background)), i.lightingId = r(cr(e, i), o ? null : t.lightingId, a?.defaults.lighting);
	let s = lr(e, i);
	return i.addons = Object.fromEntries(s.map((e) => {
		let n = t.addons[e.id];
		return [e.id, n && e.options.some((e) => e.id === n) ? n : n === null ? null : e.options.find((e) => e.isDefault)?.id ?? null];
	})), e.doubleSided || (i.doubleSided = !1), a && (o || !i.objects.length && (a.textZones.length || a.imageZones.length)) ? i.objects = mr(e, a, Cr(e, i)) : n && i.objects.length && i.objects === n.objects && (i.objects = br(e, i.objects, Cr(e, n), Cr(e, i))), i;
}
function br(e, t, n, r) {
	if (n.width === r.width && n.height === r.height) return t;
	let i = ur(e, n) / ur(e, r);
	return !Number.isFinite(i) || i <= 0 || Math.abs(i - 1) < 1e-9 ? t : t.map((e) => {
		let t = {
			...e,
			x: e.x * i,
			y: e.y * i
		};
		return e.type === "text" ? {
			...t,
			size: e.size * i
		} : e.type === "image" ? {
			...t,
			width: e.width * i,
			height: e.height * i
		} : {
			...t,
			size: e.size * i
		};
	});
}
var xr = /* @__PURE__ */ new Set([
	"rectangle",
	"square",
	"rounded-square",
	"rounded-sides",
	"rounded-top"
]);
function Sr(e, t, n, r, i) {
	let a = t.filter((e) => n[e.id] && !e.hidden);
	if (!a.length) return t;
	let o = Infinity, s = Infinity, c = -Infinity, l = -Infinity;
	for (let e of a) {
		let t = n[e.id], r = e.rotation * Math.PI / 180, i = (Math.abs(t.width * Math.cos(r)) + Math.abs(t.height * Math.sin(r))) / 2, a = (Math.abs(t.width * Math.sin(r)) + Math.abs(t.height * Math.cos(r))) / 2;
		o = Math.min(o, e.x - i), c = Math.max(c, e.x + i), s = Math.min(s, e.y - a), l = Math.max(l, e.y + a);
	}
	let u = c - o, d = l - s;
	if (!(u > 0 && d > 0)) return t;
	let f = xr.has(i) ? .8 : .6, p = Math.min(r.width * f / u, r.height * f / d);
	if (e.text.fontSize.enabled && e.text.fontSize.max > 0) for (let t of a) {
		if (t.type !== "text") continue;
		let n = pr(e, r, t.size * p);
		n > e.text.fontSize.max && (p *= e.text.fontSize.max / n);
	}
	if (!Number.isFinite(p) || p <= 0 || Math.abs(p - 1) < .02) return t;
	let m = (o + c) / 2, h = (s + l) / 2, g = new Set(a.map((e) => e.id));
	return t.map((e) => {
		if (!g.has(e.id)) return e;
		let t = {
			...e,
			x: (e.x - m) * p,
			y: (e.y - h) * p
		};
		return e.type === "image" ? {
			...t,
			width: e.width * p,
			height: e.height * p
		} : {
			...t,
			size: e.size * p
		};
	});
}
function Cr(e, t) {
	if (t.customSize) return t.customSize;
	let n = e.sizes.find((e) => e.id === t.sizeId) ?? $n(e, t)[0];
	return n ? wr(e, t, n) : {
		width: 300,
		height: 200
	};
}
function wr(e, t, n) {
	let { width: r, height: i } = n;
	return e.orientation && t.orientation === "landscape" ? {
		width: i,
		height: r
	} : {
		width: r,
		height: i
	};
}
//#endregion
//#region src/core/state.ts
var Tr = 0, Er = (e) => `${e}-${Date.now().toString(36)}-${(++Tr).toString(36)}`;
function Dr(e, t) {
	let n = e.borderSettings.colors, r = n[0];
	if (!r) return null;
	let i = (t ?? "").trim().toLowerCase();
	return !i || r.hex.trim().toLowerCase() !== i ? r.id : (n.find((e) => e.hex.trim().toLowerCase() !== i && e.price <= r.price) ?? r).id;
}
function Or(e) {
	let t = (e) => (e.find((e) => e.isDefault) ?? e[0])?.id ?? null, n = e.components.find((e) => e.isDefault) ?? e.components[0], r = e.colors.find((e) => e.isDefault) ?? e.colors[0], i = {
		materialId: t(e.materials),
		componentId: n?.id ?? null,
		componentOptionId: n ? t(n.options) : null,
		sizeId: t(e.sizes),
		customSize: !e.sizes.length && e.customSize ? {
			width: e.customSize.width.min || 100,
			height: e.customSize.height.min || 100
		} : null,
		thicknessId: e.thickness[0]?.id ?? null,
		shapeId: t(e.shapes),
		outline: "medium",
		borderId: t(e.borders),
		borderColorId: r?.textColor?.sameForBorder ? null : Dr(e, r?.patternUrl ? null : r?.hex),
		fixingId: t(e.fixings),
		colorId: t(e.colors),
		customColor: null,
		lightingId: t(e.lightings),
		addons: Object.fromEntries(e.addons.map((e) => [e.id, (e.options.find((e) => e.isDefault) ?? null)?.id ?? null])),
		inputs: Object.fromEntries(e.inputs.flatMap((e) => e.kind === "yes-no" ? [[e.id, e.default]] : e.kind === "dropdown" || e.kind === "cards" ? [[e.id, e.options[0]?.value ?? ""]] : [])),
		doubleSided: !1,
		objects: [],
		...e.orientation ? { orientation: e.orientation.default } : {}
	};
	return e.mode === "advance" && Object.assign(i, {
		sizeId: null,
		shapeId: null,
		borderId: null,
		fixingId: null,
		colorId: null,
		lightingId: null
	}), yr(e, i);
}
function kr(e, t) {
	let n = mt(t ?? Or(e)), r = mt({
		section: e.sections[0] ?? null,
		view: "edit",
		face: "front",
		selectedObjectId: null,
		lightOn: !0,
		zoom: 1,
		displayUnit: e.unit,
		sceneUrl: null,
		customSceneUrl: null,
		stageView: "design",
		reference: "auto"
	}), i = mt([]), a = mt([]), o = (t) => {
		let r = yr(e, t, n.value);
		tt(() => {
			i.value = [...i.value.slice(-59), n.value], a.value = [], n.value = r;
		});
	}, s = {
		patch(e) {
			o({
				...n.value,
				...e
			});
		},
		selectColor(t) {
			let r = n.value, i = {
				...r,
				colorId: t,
				customColor: null
			};
			o({
				...i,
				objects: vr(e, r, i)
			});
		},
		selectBorder(t) {
			let r = tr(e, n.value).find((e) => e.id === t), i = e.colors.find((e) => e.id === n.value.colorId), a = n.value.customColor ?? (i?.patternUrl ? null : i?.hex), s = n.value.borderColorId ?? (r && r.kind !== "none" ? Dr(e, a) : null);
			o({
				...n.value,
				borderId: t,
				borderColorId: s
			});
		},
		setAddon(e, t) {
			o({
				...n.value,
				addons: {
					...n.value.addons,
					[e]: t
				}
			});
		},
		setInput(e, t) {
			o({
				...n.value,
				inputs: {
					...n.value.inputs,
					[e]: t
				}
			});
		},
		addObject(e) {
			o({
				...n.value,
				objects: [...n.value.objects, e]
			}), r.value = {
				...r.value,
				selectedObjectId: e.id
			};
		},
		updateObject(e, t) {
			o({
				...n.value,
				objects: n.value.objects.map((n) => n.id === e ? {
					...n,
					...t
				} : n)
			});
		},
		removeObject(e) {
			o({
				...n.value,
				objects: n.value.objects.filter((t) => t.id !== e)
			}), r.value.selectedObjectId === e && (r.value = {
				...r.value,
				selectedObjectId: null
			});
		},
		duplicateObject(e) {
			let t = n.value.objects.find((t) => t.id === e);
			if (!t) return;
			let r = {
				...t,
				id: Er(t.type),
				x: t.x + 10,
				y: t.y + 10,
				zoneId: void 0
			};
			s.addObject(r);
		},
		moveObjectInStack(e, t) {
			s.arrangeObject(e, t > 0 ? "forward" : "backward");
		},
		arrangeObject(e, t) {
			let r = n.value.objects, i = r.find((t) => t.id === e);
			if (!i) return;
			let a = r.filter((e) => e.face === i.face), s = a.indexOf(i), c = a.length - 1, l = t === "forward" ? s + 1 : t === "backward" ? s - 1 : t === "front" ? c : t === "back" ? 0 : t, u = Math.max(0, Math.min(c, l));
			if (u === s) return;
			let d = a.filter((e) => e !== i);
			d.splice(u, 0, i);
			let f = 0;
			o({
				...n.value,
				objects: r.map((e) => e.face === i.face ? d[f++] : e)
			});
		},
		setObjectHidden(e, t) {
			s.updateObject(e, { hidden: t }), t && r.value.selectedObjectId === e && (r.value = {
				...r.value,
				selectedObjectId: null
			});
		},
		copyFace(e) {
			let t = e === "front" ? "back" : "front", r = n.value.objects.filter((e) => e.face !== t), i = n.value.objects.filter((t) => t.face === e).map((e) => ({
				...e,
				id: Er(e.type),
				face: t
			}));
			o({
				...n.value,
				objects: [...r, ...i]
			});
		},
		undo() {
			let e = i.value.at(-1);
			e && tt(() => {
				a.value = [n.value, ...a.value], i.value = i.value.slice(0, -1), n.value = e;
			});
		},
		redo() {
			let e = a.value[0];
			e && tt(() => {
				i.value = [...i.value, n.value], a.value = a.value.slice(1), n.value = e;
			});
		},
		reset() {
			o(Or(e));
		},
		ui(e) {
			r.value = {
				...r.value,
				...e
			};
		}
	};
	return {
		config: e,
		design: n,
		ui: r,
		canUndo: yt(() => i.value.length > 0),
		canRedo: yt(() => a.value.length > 0),
		actions: s
	};
}
//#endregion
//#region src/core/pricing.ts
var Ar = (e) => {
	let t = typeof e == "number" ? e : parseFloat(String(e));
	return Number.isFinite(t) ? t : 0;
}, jr = (e, t) => t ?? e[e.length - 1];
function Mr(e, t) {
	let n = () => {
		let n = jr(e.ranges, e.ranges.find((e) => t <= (e.surface ?? 0)));
		return n.perRange === !0 || e.perUnit ? n.basePrice * t : n.basePrice;
	};
	return e.type === "range" && e.ranges.length ? n() : e.type === "unit" && e.unit ? e.unit.surface > 0 && t > 0 ? e.unit.basePrice * t / e.unit.surface : e.unit.basePrice : e.ranges.length ? n() : e.flatPrice;
}
function Nr(e, t) {
	let n = {
		basePrice: 0,
		rangeSurface: 0,
		charPrice: 0,
		startPriceAtChar: 0,
		perRange: !1
	};
	if (!e) return n;
	let r = e.type || (e.ranges.length ? "range" : e.unit ? "unit" : "");
	if (r === "range" && e.ranges.length) {
		let n = e.ranges[0];
		for (let r of e.ranges) if (n = r, t <= (r.surface ?? r.size ?? NaN)) break;
		return {
			basePrice: n.basePrice,
			rangeSurface: n.surface ?? 0,
			charPrice: n.charPrice ?? 0,
			startPriceAtChar: n.startPriceAtChar ?? 0,
			perRange: n.perRange ?? e.perUnit
		};
	}
	if (r === "unit" && e.unit) {
		let n = e.unit.surface || e.unit.areaFactor;
		return {
			basePrice: n > 0 ? t / n * e.unit.basePrice : e.unit.basePrice,
			rangeSurface: 0,
			charPrice: e.unit.charPrice ?? 0,
			startPriceAtChar: 0,
			perRange: !1
		};
	}
	return n;
}
var Pr = (e) => !!(e && (e.type === "unit" && e.unit || e.ranges.length || e.unit));
function Fr(e, t) {
	let n = (t) => e.objects.reduce((e, n) => n.type === "text" && n.face === t ? e + n.text : e, "").length;
	return Math.max(0, n("front") - t) + Math.max(0, n("back") - t);
}
var Ir = (e, t, n) => t ? Ar(n / t.surface * e) : e;
function Lr(e, t, n, r = {}) {
	let i = [], a = (e, t, n, r = "base") => {
		let a = Ar(n);
		(r !== "base" || a !== 0) && i.push({
			key: e,
			label: t,
			amount: a,
			kind: r
		});
	}, o = e.mode === "simple", { width: s, height: c } = Cr(e, t), l = s * c, u = e.doubleSided ? 2 : 1, d = e.colors.find((e) => e.isDefault) ?? e.colors[0], f = e.materials.find((e) => e.id === t.materialId) ?? null, p = f?.pricingId ? e.pricingProfiles.find((e) => e.id === f.pricingId) ?? null : null;
	f && a("material", f.label, p ? Mr(p, l) : f.price);
	let m = !!(t.customSize && e.customSize), h = e.customSize?.pricing ?? null, g;
	if (m) {
		g = Pr(h) ? Nr(h, l) : Nr(null, 0);
		let e = Ar(g.basePrice), t = g.rangeSurface > 0 ? g.rangeSurface : l;
		a("sizeTextBase", `${s} × ${c}`, g.perRange ? e * t : e);
	} else g = Nr(p, l);
	let _ = e.thickness.find((e) => e.id === t.thicknessId);
	_ && (_.pricingType === "multiplier" ? a("thickness", _.label, _.multiplier || 1, "multiplier") : a("thickness", _.label, _.price));
	let v = er(e, t).find((e) => e.id === t.shapeId);
	v && o && a("shape", v.label, Ir(v.price, v.priceBySurface, l));
	let y = tr(e, t).find((e) => e.id === t.borderId);
	if (y) for (let e = 1; e <= u; e++) a(`border${e}`, y.label, y.price);
	let b = e.borderSettings.colors.find((e) => e.id === t.borderColorId);
	if (b && y && y.kind !== "none") {
		a("border-color1", b.label, b.price);
		let t = e.borderSettings.colors[0];
		a("border-color2", t.label, t.price);
	}
	let x = nr(e, t).find((e) => e.id === t.fixingId);
	x && a("fixing", x.label, x.price);
	let S = e.colors.find((e) => e.id === t.colorId);
	o && (S && !t.customColor && a("color1", S.label, S.price), u === 2 && d && a("color2", d.label, d.price));
	let C = Zn(e, t), w = e.lightingEnabled ? (C?.lightings.length ? C.lightings : e.lightings).find((e) => e.id === t.lightingId) : void 0;
	if (w && a("lighting", w.label, w.price), o) for (let n of lr(e, t)) {
		let e = n.options.find((e) => e.id === t.addons[n.id]);
		e && a(`addon:${n.id}`, `${n.label} : ${e.label}`, Ir(e.price, e.priceBySurface, l));
	}
	for (let n of e.inputs) {
		let e = t.inputs[n.id], r = n.kind === "yes-no" ? e === !0 ? n.price : null : n.kind === "dropdown" || n.kind === "cards" ? n.options.find((t) => t.value === e)?.price ?? null : null;
		r?.kind === "base" && a(`input:${n.id}`, n.label, r.value), r?.kind === "multiplier" && a(`input:${n.id}`, n.label, r.value, "multiplier");
	}
	for (let e of t.objects) e.type === "image" && e.price && a(`image:${e.id}`, e.src, e.price);
	if (t.doubleSided && e.doubleSided) {
		let t = e.doubleSided.pricing;
		t.kind === "multiplier" ? a("doubleSided", e.doubleSided.label, t.value || 1, "multiplier") : a("doubleSided", e.doubleSided.label, t.value);
	}
	let ee = i.filter((e) => e.kind === "base").reduce((e, t) => e + t.amount, 0), T = i.filter((e) => e.kind === "multiplier"), te = T.length ? ee * T.reduce((e, t) => e * t.amount, 1) : ee, E = Fr(t, g.startPriceAtChar) * Ar(g.charPrice);
	E && i.push({
		key: "chars",
		label: "chars",
		amount: E,
		kind: "base"
	});
	let D = Ar(t.template === null ? 0 : t.template ? t.template.basePrice : r.templateBasePrice), O = D + te + E, ne = Math.max(1, n), re = O * ne, k = zr(re, Rr(e, ne));
	return {
		unit: O,
		chars: E,
		template: D,
		quantity: ne,
		subtotal: re,
		discount: re - k,
		total: k,
		lines: i
	};
}
function Rr(e, t) {
	return e.discounts.byQuantity ? [...e.discounts.lots].filter((e) => t >= e.quantity).sort((e, t) => t.quantity - e.quantity)[0] ?? null : e.discounts.global;
}
function zr(e, t) {
	return !t || t.kind === "none" || !(t.value > 0) ? e : t.kind === "percent" ? e * (1 - Math.min(t.value, 100) / 100) : Math.max(0, e - t.value);
}
var Br = {
	title: "Personnalisez votre enseigne",
	"section.material": "Matériau",
	"section.component": "Modèle",
	"section.size": "Taille",
	"section.shape": "Forme",
	"section.fixing": "Fixation",
	"section.border": "Bordure",
	"section.color": "Couleur",
	"section.lighting": "Éclairage",
	"section.text": "Textes",
	"section.qrcode": "QR code",
	"section.image": "Images",
	"section.options": "Options",
	"section.addons": "Compléments",
	"nav.more": "Plus",
	"nav.sections": "Étapes de personnalisation",
	"nav.previous": "Précédent",
	"nav.next": "Suivant",
	"nav.toRecap": "Voir le récapitulatif",
	"nav.todo": "À compléter",
	"nav.done": "Complété",
	"action.undo": "Annuler",
	"action.redo": "Rétablir",
	"action.reset": "Tout recommencer",
	"action.finish": "Terminer",
	"action.addToCart": "Ajouter au panier",
	"action.quote": "Demander un devis",
	"action.edit": "Modifier",
	"action.close": "Fermer",
	"action.clone": "Dupliquer",
	"action.delete": "Supprimer",
	"action.centerH": "Centrer horizontalement",
	"action.centerV": "Centrer verticalement",
	"action.forward": "Avancer",
	"action.backward": "Reculer",
	"action.addText": "Ajouter un texte",
	"action.addQr": "Ajouter un QR code",
	"action.addImage": "Importer une image",
	"action.backToEdit": "Retour à la personnalisation",
	"action.copyFace": "Copier sur {face}",
	"action.details": "Détail",
	"price.total": "Total",
	"price.unit": "Prix unitaire",
	"price.discount": "Remise",
	"price.included": "Inclus",
	"price.detail": "Détail du prix",
	"price.chars": "Caractères",
	"qty.label": "Quantité",
	"qty.decrease": "Diminuer la quantité",
	"qty.increase": "Augmenter la quantité",
	"qty.lot": "dès {qty} : −{value}",
	"stage.label": "Aperçu de votre enseigne, {dims}",
	"stage.zoomIn": "Zoom avant",
	"stage.zoomOut": "Zoom arrière",
	"stage.fit": "Recentrer",
	"stage.light": "Allumer / éteindre l’éclairage",
	"stage.front": "Recto",
	"stage.back": "Verso",
	"stage.layers": "Calques",
	"size.custom": "Taille personnalisée",
	"size.width": "Largeur",
	"size.height": "Hauteur",
	"size.range": "entre {min} et {max} {unit}",
	"size.thickness": "Épaisseur",
	"color.custom": "Couleur personnalisée",
	"border.color": "Couleur de la bordure",
	"doubleSided.enable": "Impression recto verso",
	"text.empty": "Aucun texte pour l’instant.",
	"text.placeholder": "Votre texte",
	"text.font": "Police",
	"text.size": "Taille",
	"text.dims": "Dimensions du texte : {dims}",
	"text.color": "Couleur",
	"text.style": "Style",
	"text.bold": "Gras",
	"text.italic": "Italique",
	"text.underline": "Souligné",
	"text.strike": "Barré",
	"text.align": "Alignement",
	"text.alignLeft": "Aligner à gauche",
	"text.alignCenter": "Centrer",
	"text.alignRight": "Aligner à droite",
	"text.chars": "{n} / {max}",
	"text.tooLong": "{max} caractères maximum.",
	"text.tooShort": "{min} caractères minimum.",
	"text.locked": "Fixé par le modèle",
	"object.position": "Position et taille",
	"object.x": "X",
	"object.y": "Y",
	"object.rotation": "Rotation",
	"object.width": "Largeur",
	"object.list": "Éléments de l’enseigne",
	"object.text": "Texte",
	"object.image": "Image",
	"object.qr": "QR code",
	"image.empty": "Importez votre logo ou une image (PNG, JPG, SVG).",
	"qr.placeholder": "https://…",
	"qr.value": "Lien ou texte",
	"input.yes": "Oui",
	"input.no": "Non",
	"input.notePlaceholder": "Votre message",
	"recap.title": "Votre enseigne",
	"recap.support": "Support",
	"recap.dimensions": "Dimensions",
	"recap.finish": "Finitions",
	"recap.content": "Contenu",
	"recap.options": "Options",
	"recap.none": "Aucun",
	"recap.texts": "{n} texte(s)",
	"info.example": "Voir un exemple",
	"toast.added": "Ajouté au panier",
	"dev.notice": "Maquette : panier désactivé",
	"shape.outline": "Marge de découpe",
	"shape.outline.small": "Fine",
	"shape.outline.medium": "Moyenne",
	"shape.outline.large": "Large",
	"cart.adding": "Ajout en cours…",
	"cart.error": "L’ajout au panier a échoué. Réessayez.",
	"text.overline": "Surligné",
	"text.curve": "Courbure",
	"text.curveNone": "Droit",
	"text.curveUp": "Arrondi vers le haut",
	"text.curveDown": "Arrondi vers le bas",
	"color.customPick": "Couleur personnalisée",
	"qr.color": "Couleur du QR code",
	"image.cliparts": "Cliparts",
	"image.clipartGroup": "Groupe de cliparts",
	"image.flipX": "Miroir horizontal",
	"image.flipY": "Miroir vertical",
	"image.color": "Couleur de l’image",
	"image.filters": "Filtres",
	"image.filter.greyscale": "Noir et blanc",
	"image.filter.sepia": "Sépia",
	"image.filter.blur": "Flou",
	"image.filter.emboss": "Relief",
	"image.filter.sharpen": "Netteté",
	"image.filter.opacity": "Transparence",
	"image.filter.invert": "Négatif",
	"image.filter.greenify": "Vert",
	"image.filter.pinkify": "Rose",
	"image.filter.orangeify": "Orange",
	"image.filter.blueify": "Bleu",
	"text.sizeLimit": "{n} / {max} caractères autorisés pour cette taille",
	"stage.download": "Télécharger l’aperçu",
	"template.save": "Enregistrer le template",
	"template.saving": "Enregistrement…",
	"template.saved": "Template enregistré.",
	"template.error": "L’enregistrement du template a échoué.",
	"templates.all": "Tous",
	"templates.addToCart": "Ajouter au panier",
	"templates.customize": "Personnaliser",
	"templates.emptyTitle": "Aucun modèle disponible",
	"templates.emptyDescription": "Cette configuration n’a pas encore de modèle visible.",
	"templates.categories": "Catégories de modèles",
	"templates.added": "Ajouté au panier.",
	"templates.error": "L’ajout au panier a échoué.",
	"share.action": "Partager mon design",
	"share.creating": "Création du lien…",
	"share.link": "Lien de partage",
	"share.copied": "Lien copié dans le presse-papiers.",
	"share.ready": "Copiez ce lien pour partager votre design.",
	"share.error": "Le lien de partage n’a pas pu être créé.",
	"layers.title": "Calques",
	"layers.subtitle": "Ordre des éléments sur l’enseigne, du dessus vers le dessous.",
	"layers.empty": "Aucun élément pour l’instant.",
	"layers.top": "Dessus",
	"layers.show": "Afficher",
	"layers.hide": "Masquer",
	"layers.dragHint": "Glissez les éléments pour changer leur ordre.",
	"layers.zone": "Zone du modèle",
	"scenes.title": "Scènes",
	"scenes.none": "Aucune scène",
	"scenes.item": "Scène {n}",
	"scenes.upload": "Importer ma photo",
	"scenes.preview": "Voir dans une scène",
	"option.save": "Enregistrer l’option",
	"option.saving": "Enregistrement…",
	"option.saved": "Option enregistrée.",
	"option.error": "L’enregistrement de l’option a échoué.",
	"editor.rights": "Ce que le client peut faire",
	"editor.rightsHint": "Les verrous s’appliquent au client ; vous pouvez toujours modifier la zone ici.",
	"editor.zonesHint": "Sélectionnez une zone sur l’enseigne ou dans la liste pour la régler.",
	"editor.right.edit": "Modifier le texte",
	"editor.right.font": "Changer la police",
	"editor.right.color": "Changer la couleur",
	"editor.right.resize": "Redimensionner",
	"editor.right.rotate": "Pivoter",
	"editor.right.moveX": "Déplacer horizontalement",
	"editor.right.moveY": "Déplacer verticalement",
	"editor.right.replace": "Remplacer l’image",
	"image.chooseSource": "Ajouter une image",
	"image.sourceUpload": "Importer mon image",
	"image.sourceBrowse": "Bibliothèque de cliparts",
	"image.sourceBrowseHint": "{n} images prêtes à l’emploi",
	"image.otherSource": "Revenir au choix de la source",
	"image.dropHint": "Glissez votre fichier ici ou cliquez pour le choisir (PNG, JPG, SVG).",
	"image.sourceUploadHint": "Logo, photo… ({formats})",
	"image.dropTitle": "Glissez votre fichier ici",
	"image.dropOr": "ou",
	"image.pickFile": "Choisir un fichier",
	"image.formats": "Formats acceptés : {formats}",
	"image.qualityTip": "Pour un rendu net, préférez un SVG ou un PNG à fond transparent.",
	"image.count": "{n} images",
	"image.search": "Rechercher un clipart",
	"image.noResult": "Aucun clipart ne correspond à votre recherche.",
	"section.templates": "Modèles",
	"templates.blank": "Partir de zéro",
	"templates.blankHint": "Enseigne vierge",
	"templates.blankShort": "Enseigne vierge",
	"templates.current": "Choisi",
	"templates.loading": "Préparation de votre design…",
	"templates.confirmTitle": "Remplacer votre création ?",
	"templates.confirmText": "Le modèle remplacera ce que vous avez déjà fait. Vous pourrez revenir en arrière avec « Annuler ».",
	"templates.confirmOk": "Remplacer",
	"templates.cancel": "Garder ma création",
	"templates.noDesign": "Ce modèle n’a pas encore de design enregistré.",
	"templates.loadError": "Impossible de charger ce modèle. Réessayez.",
	"scenes.mine": "Ma photo",
	"view.label": "Vue",
	"view.design": "Design",
	"view.real": "Taille réelle",
	"ref.label": "Repère",
	"ref.auto": "Auto",
	"ref.person": "Personne",
	"ref.sofa": "Canapé",
	"ref.door": "Porte",
	"ref.counter": "Comptoir",
	"view.realAnnounce": "Taille réelle : {dims}",
	"preview.view": "Vue",
	"preview.front": "De face",
	"preview.angled": "De biais",
	"preview.side": "De côté",
	"preview.zoom": "Zoom de l’aperçu",
	"preview.fit": "Ajuster à l’écran",
	"size.orientation": "Orientation",
	"size.portrait": "Portrait",
	"size.landscape": "Paysage",
	"stage.orientation": "Changer l’orientation (portrait / paysage)",
	"stage.more": "Plus d’actions",
	"stage.on": "activé",
	"stage.off": "désactivé",
	"doubleSided.faceTitle": "Face à personnaliser",
	"doubleSided.editing": "Vous modifiez : {face}",
	"doubleSided.switchTo": "Passer à : {face}",
	"doubleSided.add": "Ajouter le verso",
	"doubleSided.remove": "Revenir à une seule face",
	"text.effects": "Effets",
	"text.curveUpShort": "En arc",
	"text.curveDownShort": "En creux",
	"text.outline": "Bordure",
	"text.outlineColor": "Couleur de la bordure",
	"text.opacity": "Opacité",
	"text.3d.borders": "Bordures",
	"text.3d.first": "Première bordure",
	"text.3d.firstColor": "Couleur de la première bordure",
	"text.3d.second": "Deuxième bordure",
	"text.3d.secondColor": "Couleur de la deuxième bordure",
	"text.3d.side": "Effet 3D",
	"text.3d.sideColor": "Couleur de l'effet 3D",
	"text.neon.light": "Lumière",
	"text.neon.lightColor": "Couleur de la lumière",
	"size.unit": "Unité de mesure",
	"preview.back": "Dos",
	"preview.rotatable": "aperçu orientable",
	"preview.dragHint": "Faites glisser pour tourner l'enseigne",
	"required.title": "Configuration incomplète",
	"required.text": "Ces éléments obligatoires manquent dans la configuration. Ils sont nécessaires pour dessiner l'enseigne :",
	"required.hint": "Ajoutez-les dans la configuration de l'application, puis rechargez le configurateur."
}, Vr = {
	title: "Design your own sign",
	"section.material": "Material",
	"section.component": "Design",
	"section.size": "Size",
	"section.shape": "Shape",
	"section.fixing": "Fixing",
	"section.border": "Border",
	"section.color": "Color",
	"section.lighting": "Lighting",
	"section.text": "Texts",
	"section.qrcode": "QR code",
	"section.image": "Images",
	"section.options": "Options",
	"section.addons": "Add-ons",
	"nav.more": "More",
	"nav.sections": "Customization steps",
	"nav.previous": "Previous",
	"nav.next": "Next",
	"nav.toRecap": "Review my sign",
	"nav.todo": "To complete",
	"nav.done": "Done",
	"action.undo": "Undo",
	"action.redo": "Redo",
	"action.reset": "Start over",
	"action.finish": "Finish",
	"action.addToCart": "Add to cart",
	"action.quote": "Request a quote",
	"action.edit": "Edit",
	"action.close": "Close",
	"action.clone": "Duplicate",
	"action.delete": "Delete",
	"action.centerH": "Center horizontally",
	"action.centerV": "Center vertically",
	"action.forward": "Bring forward",
	"action.backward": "Send backward",
	"action.addText": "Add text",
	"action.addQr": "Add a QR code",
	"action.addImage": "Upload an image",
	"action.backToEdit": "Back to customization",
	"action.copyFace": "Copy to {face}",
	"action.details": "Details",
	"price.total": "Total",
	"price.unit": "Unit price",
	"price.discount": "Discount",
	"price.included": "Included",
	"price.detail": "Price details",
	"price.chars": "Characters",
	"qty.label": "Quantity",
	"qty.decrease": "Decrease quantity",
	"qty.increase": "Increase quantity",
	"qty.lot": "from {qty}: −{value}",
	"stage.label": "Preview of your sign, {dims}",
	"stage.zoomIn": "Zoom in",
	"stage.zoomOut": "Zoom out",
	"stage.fit": "Fit to screen",
	"stage.light": "Turn lighting on / off",
	"stage.front": "Front",
	"stage.back": "Back",
	"stage.layers": "Layers",
	"size.custom": "Custom size",
	"size.width": "Width",
	"size.height": "Height",
	"size.range": "between {min} and {max} {unit}",
	"size.thickness": "Thickness",
	"color.custom": "Custom color",
	"border.color": "Border color",
	"doubleSided.enable": "Double-sided",
	"text.empty": "No text yet.",
	"text.placeholder": "Your text",
	"text.font": "Font",
	"text.size": "Size",
	"text.dims": "Text dimensions: {dims}",
	"text.color": "Color",
	"text.style": "Style",
	"text.bold": "Bold",
	"text.italic": "Italic",
	"text.underline": "Underline",
	"text.strike": "Strikethrough",
	"text.align": "Alignment",
	"text.alignLeft": "Align left",
	"text.alignCenter": "Center",
	"text.alignRight": "Align right",
	"text.chars": "{n} / {max}",
	"text.tooLong": "{max} characters maximum.",
	"text.tooShort": "{min} characters minimum.",
	"text.locked": "Set by the design",
	"object.position": "Position and size",
	"object.x": "X",
	"object.y": "Y",
	"object.rotation": "Rotation",
	"object.width": "Width",
	"object.list": "Sign elements",
	"object.text": "Text",
	"object.image": "Image",
	"object.qr": "QR code",
	"image.empty": "Upload your logo or an image (PNG, JPG, SVG).",
	"qr.placeholder": "https://…",
	"qr.value": "Link or text",
	"input.yes": "Yes",
	"input.no": "No",
	"input.notePlaceholder": "Your message",
	"recap.title": "Your sign",
	"recap.support": "Support",
	"recap.dimensions": "Dimensions",
	"recap.finish": "Finishes",
	"recap.content": "Content",
	"recap.options": "Options",
	"recap.none": "None",
	"recap.texts": "{n} text(s)",
	"info.example": "See an example",
	"toast.added": "Added to cart",
	"dev.notice": "Mockup: cart disabled",
	"shape.outline": "Cut margin",
	"shape.outline.small": "Thin",
	"shape.outline.medium": "Medium",
	"shape.outline.large": "Wide",
	"cart.adding": "Adding…",
	"cart.error": "Could not add to cart. Please try again.",
	"text.overline": "Overline",
	"text.curve": "Curve",
	"text.curveNone": "Straight",
	"text.curveUp": "Curve up",
	"text.curveDown": "Curve down",
	"color.customPick": "Custom color",
	"qr.color": "QR code color",
	"image.cliparts": "Cliparts",
	"image.clipartGroup": "Clipart group",
	"image.flipX": "Flip horizontally",
	"image.flipY": "Flip vertically",
	"image.color": "Image color",
	"image.filters": "Filters",
	"image.filter.greyscale": "Greyscale",
	"image.filter.sepia": "Sepia",
	"image.filter.blur": "Blur",
	"image.filter.emboss": "Emboss",
	"image.filter.sharpen": "Sharpen",
	"image.filter.opacity": "Opacity",
	"image.filter.invert": "Invert",
	"image.filter.greenify": "Green",
	"image.filter.pinkify": "Pink",
	"image.filter.orangeify": "Orange",
	"image.filter.blueify": "Blue",
	"text.sizeLimit": "{n} / {max} characters allowed for this size",
	"stage.download": "Download preview",
	"template.save": "Save template",
	"template.saving": "Saving…",
	"template.saved": "Template saved.",
	"template.error": "Could not save the template.",
	"templates.all": "All",
	"templates.addToCart": "Add to cart",
	"templates.customize": "Customize",
	"templates.emptyTitle": "No templates available",
	"templates.emptyDescription": "There are no visible templates for this configuration yet.",
	"templates.categories": "Template categories",
	"templates.added": "Added to cart.",
	"templates.error": "Adding to cart failed.",
	"share.action": "Share my design",
	"share.creating": "Creating link…",
	"share.link": "Share link",
	"share.copied": "Link copied to clipboard.",
	"share.ready": "Copy this link to share your design.",
	"share.error": "The share link could not be created.",
	"layers.title": "Layers",
	"layers.subtitle": "Order of the elements on your sign, from top to bottom.",
	"layers.empty": "No elements added yet.",
	"layers.top": "Top",
	"layers.show": "Show",
	"layers.hide": "Hide",
	"layers.dragHint": "Drag to reorder",
	"layers.zone": "Template zone",
	"scenes.title": "Scenes",
	"scenes.none": "No scene",
	"scenes.item": "Scene {n}",
	"scenes.upload": "Upload my photo",
	"scenes.preview": "View in a scene",
	"option.save": "Save option",
	"option.saving": "Saving…",
	"option.saved": "Option saved.",
	"option.error": "Saving the option failed.",
	"editor.rights": "What the customer can do",
	"editor.rightsHint": "Locks apply to the customer; you can still edit the zone here.",
	"editor.zonesHint": "Select a zone on the sign or in the list to set it up.",
	"editor.right.edit": "Edit text",
	"editor.right.font": "Change font",
	"editor.right.color": "Change color",
	"editor.right.resize": "Resize",
	"editor.right.rotate": "Rotate",
	"editor.right.moveX": "Move horizontally",
	"editor.right.moveY": "Move vertically",
	"editor.right.replace": "Replace image",
	"image.chooseSource": "Add an image",
	"image.sourceUpload": "Upload my image",
	"image.sourceBrowse": "Clipart library",
	"image.sourceBrowseHint": "{n} ready-to-use images",
	"image.otherSource": "Back to source choice",
	"image.dropHint": "Drop your file here or click to choose it (PNG, JPG, SVG).",
	"image.sourceUploadHint": "Logo, photo… ({formats})",
	"image.dropTitle": "Drop your file here",
	"image.dropOr": "or",
	"image.pickFile": "Choose a file",
	"image.formats": "Accepted formats: {formats}",
	"image.qualityTip": "For a crisp result, prefer an SVG or a PNG with a transparent background.",
	"image.count": "{n} images",
	"image.search": "Search cliparts",
	"image.noResult": "No clipart matches your search.",
	"section.templates": "Templates",
	"templates.blank": "Start from scratch",
	"templates.blankHint": "Blank sign",
	"templates.blankShort": "Blank sign",
	"templates.current": "Selected",
	"templates.loading": "Drawing your design…",
	"templates.confirmTitle": "Replace your design?",
	"templates.confirmText": "The template will replace what you have done so far. You can go back with “Undo”.",
	"templates.confirmOk": "Replace",
	"templates.cancel": "Keep my design",
	"templates.noDesign": "This template has no saved design yet.",
	"templates.loadError": "Unable to load this template. Please try again.",
	"scenes.mine": "My photo",
	"view.label": "View",
	"view.design": "Design",
	"view.real": "Real size",
	"ref.label": "Reference",
	"ref.auto": "Auto",
	"ref.person": "Person",
	"ref.sofa": "Sofa",
	"ref.door": "Door",
	"ref.counter": "Counter",
	"view.realAnnounce": "Real size: {dims}",
	"preview.view": "View",
	"preview.front": "Front view",
	"preview.angled": "Angled view",
	"preview.side": "Side view",
	"preview.zoom": "Preview zoom",
	"preview.fit": "Fit to screen",
	"size.orientation": "Orientation",
	"size.portrait": "Portrait",
	"size.landscape": "Landscape",
	"stage.orientation": "Switch orientation (portrait / landscape)",
	"stage.more": "More actions",
	"stage.on": "on",
	"stage.off": "off",
	"doubleSided.faceTitle": "Face to customise",
	"doubleSided.editing": "Editing: {face}",
	"doubleSided.switchTo": "Switch to: {face}",
	"doubleSided.add": "Add the back",
	"doubleSided.remove": "Back to single-sided",
	"text.effects": "Effects",
	"text.curveUpShort": "Arch",
	"text.curveDownShort": "Dip",
	"text.outline": "Border",
	"text.outlineColor": "Border color",
	"text.opacity": "Opacity",
	"text.3d.borders": "Borders",
	"text.3d.first": "First border",
	"text.3d.firstColor": "First border color",
	"text.3d.second": "Second border",
	"text.3d.secondColor": "Second border color",
	"text.3d.side": "3D effect",
	"text.3d.sideColor": "3D effect color",
	"text.neon.light": "Light",
	"text.neon.lightColor": "Light color",
	"size.unit": "Measurement unit",
	"preview.back": "Back",
	"preview.rotatable": "rotatable preview",
	"preview.dragHint": "Drag to rotate the sign",
	"required.title": "Configuration incomplete",
	"required.text": "The following required elements are missing from this configuration. They are needed to generate the preview:",
	"required.hint": "Please add these options in the app configuration, then reload the configurator."
}, Hr = {
	fr: Br,
	en: Vr
}, Ur = {
	titleHeader: "title",
	textButtonFinish: "action.finish",
	textAddToCart: "action.addToCart",
	textButtonBack: "action.undo",
	textButtonNext: "action.redo",
	textButtonRefresh: "action.reset",
	textCanvasEdit: "action.edit",
	textCanvasClone: "action.clone",
	textCanvasDelete: "action.delete",
	textMaterial: "section.material",
	textSize: "section.size",
	textShape: "section.shape",
	textBorder: "section.border",
	textColor: "section.color",
	textOptionText: "section.text",
	textImage: "section.image",
	textFixingMethods: "section.fixing",
	textAdditonnalOptionsHeader: "section.options",
	customSize: "size.custom",
	textWidth: "size.width",
	textHeight: "size.height",
	thickness: "size.thickness",
	textAngle: "object.rotation",
	textPosition: "object.position",
	textTemplates: "section.templates",
	textTemplatesLoading: "templates.loading",
	textLayers: "layers.title",
	layersSubtitle: "layers.subtitle",
	layerTopLabel: "layers.top",
	layerEmptyLabel: "layers.empty",
	layerDragHint: "layers.dragHint",
	Scenes: "scenes.title",
	scenesTitle: "scenes.title",
	noSceneLabel: "scenes.none",
	uploadImageLabel: "scenes.upload",
	requiredOptionsTitle: "required.title",
	requiredOptionsDescription: "required.text",
	requiredOptionsHint: "required.hint"
}, Wr = {
	titleHeader: "Design your own sign",
	textButtonFinish: "Finish",
	textAddToCart: "Add To Cart",
	textButtonBack: "Undo",
	textButtonNext: "Redo",
	textButtonRefresh: "Restart all",
	textCanvasEdit: "Edit",
	textCanvasClone: "Clone",
	textCanvasDelete: "delete",
	textMaterial: "Material",
	textSize: "Size",
	textShape: "Shape",
	textBorder: "Border",
	textColor: "Color",
	textOptionText: "Text",
	textImage: "Image",
	textFixingMethods: "Fixing Methods",
	textAdditonnalOptionsHeader: "Additionnals Options",
	customSize: "Custom Size",
	textWidth: "Width",
	textHeight: "Height",
	thickness: "Thickness",
	textAngle: "Angle",
	textPosition: "Position",
	textTemplates: "Templates",
	uploadImageLabel: "Upload image"
};
function Gr(e, t = {}) {
	let n = e.split("-")[0].toLowerCase(), r = {};
	for (let [e, i] of Object.entries(t)) {
		let t = Ur[e], a = typeof i == "string" ? i.trim() : "";
		if (!t || !a) continue;
		let o = a.toLowerCase() === (Wr[e] ?? "").toLowerCase() || a.toLowerCase() === String(Vr[t] ?? "").toLowerCase();
		n !== "en" && o || (r[t] = a);
	}
	let i = {
		...Vr,
		...Hr[n] ?? {},
		...r
	};
	return (e, t) => {
		let n = i[e] ?? e;
		return t ? n.replace(/\{(\w+)\}/g, (e, n) => String(t[n] ?? `{${n}}`)) : n;
	};
}
//#endregion
//#region src/core/theme.ts
var Kr = (e) => {
	let t = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(e ?? "").trim());
	if (!t) return null;
	let n = t[1];
	n.length === 3 && (n = n.replace(/./g, (e) => e + e));
	let r = parseInt(n, 16);
	return [
		r >> 16 & 255,
		r >> 8 & 255,
		r & 255
	];
}, qr = (e) => `#${e.map((e) => Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0")).join("")}`;
function Jr(e) {
	let t = Kr(e);
	if (!t) return 0;
	let n = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * n(t[0]) + .7152 * n(t[1]) + .0722 * n(t[2]);
}
function Yr(e, t) {
	let [n, r] = [Jr(e), Jr(t)].sort((e, t) => t - e);
	return (n + .05) / (r + .05);
}
var Xr = (e) => Yr(e, "#ffffff") >= Yr(e, "#111418") ? "#ffffff" : "#111418";
function Zr(e, t, n) {
	let r = Kr(e), i = Kr(t);
	return !r || !i ? e : qr(r.map((e, t) => e + (i[t] - e) * n));
}
function Qr(e, t, n = 4.5) {
	if (!Kr(e) || !Kr(t)) return e;
	let r = Jr(t) > .4 ? "#000000" : "#ffffff";
	for (let i = 0; i <= 1.0001; i += .02) {
		let a = Zr(e, r, i);
		if (Yr(a, t) >= n) return a;
	}
	return r;
}
var $r = (e, t, n = 4.5) => Kr(e) && Kr(t) && Yr(e, t) < n ? Qr(e, t, n) : e, ei = (e, t) => Kr(e) ? e : t;
function ti(e) {
	let t = ei(e.barBg, "#ffffff"), n = Jr(t) < .2, r = n ? Zr(t, "#ffffff", .06) : "#ffffff", i = ei(e.panelBg, n ? Zr(t, "#ffffff", .03) : "#f3f5f7"), a = $r(ei(e.barTitle, n ? "#f2f4f6" : "#111418"), t, 7), o = Yr(a, i) < Yr(a, r) ? i : r, s = $r(Zr(a, o, .38), o, 4.5), c = ei(e.primary, "#0f6a6a"), l = Yr(c, r) >= 3 ? c : Qr(c, r, 3), u = ei(e.finishBg, "#febd52"), d = ei(e.cartBg, u), f = ei(e.priceBg, t);
	return {
		vars: {
			"--sc-bg": t,
			"--sc-text": a,
			"--sc-text-muted": s,
			"--sc-panel-bg": i,
			"--sc-surface": r,
			"--sc-stage-bg": ei(e.stageBg, n ? "#16181b" : "#eef1f4"),
			"--sc-stage-border": ei(e.stageBorder, "#c9d1d9"),
			"--sc-primary": l,
			"--sc-on-primary": Kr(e.primaryText) && Yr(e.primaryText, l) >= 4.5 ? e.primaryText : Xr(l),
			"--sc-primary-hover": ei(e.primaryHover, Zr(l, "#000000", .08)),
			"--sc-active-text": $r(ei(e.optionActiveText, l), r),
			"--sc-hover-bg": ei(e.optionHoverBg, n ? Zr(r, "#ffffff", .06) : "#eef2f5"),
			"--sc-cta": u,
			"--sc-on-cta": Kr(e.finishText) && Yr(e.finishText, u) >= 4.5 ? e.finishText : Xr(u),
			"--sc-cta-hover": ei(e.finishHoverBg, Zr(u, "#000000", .08)),
			"--sc-cart": d,
			"--sc-on-cart": Kr(e.cartText) && Yr(e.cartText, d) >= 4.5 ? e.cartText : Xr(d),
			"--sc-cart-hover": ei(e.cartHoverBg, Zr(d, "#000000", .08)),
			"--sc-price-bg": f,
			"--sc-price": $r(ei(e.priceText, a), f),
			"--sc-price-before": $r(ei(e.priceBeforeText, s), f),
			"--sc-price-after": $r(ei(e.priceAfterText, s), f),
			"--sc-danger": $r(ei(e.danger, "#b42318"), r),
			"--sc-border": Zr(a, r, .88),
			"--sc-border-control": Qr(Zr(a, r, .55), r, 3),
			"--sc-focus": Yr(l, t) >= 3 ? l : a
		},
		dark: n
	};
}
//#endregion
//#region src/ui/context.ts
var ni = Te(null), z = () => We(ni);
//#endregion
//#region node_modules/konva/lib/Global.js
function ri() {
	return typeof window < "u" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
}
var ii, ai, B, oi, si, ci = o((() => {
	ii = Math.PI / 180, ai = typeof global < "u" ? global : typeof window < "u" ? window : typeof WorkerGlobalScope < "u" ? self : {}, B = {
		_global: ai,
		version: "10.8.0",
		isBrowser: ri(),
		isUnminified: /param/.test(function(e) {}.toString()),
		dblClickWindow: 400,
		getAngle(e) {
			return B.angleDeg ? e * ii : e;
		},
		enableTrace: !1,
		pointerEventsEnabled: !0,
		autoDrawEnabled: !0,
		hitOnDragEnabled: !1,
		capturePointerEventsEnabled: !1,
		_renderBackend: "web",
		legacyTextRendering: !1,
		pixelRatio: typeof window < "u" && window.devicePixelRatio || 1,
		dragDistance: 3,
		angleDeg: !0,
		showWarnings: !0,
		dragButtons: [0, 1],
		isDragging() {
			return B.DD.isDragging;
		},
		isTransforming() {
			return B.Transformer?.isTransforming() ?? !1;
		},
		isDragReady() {
			return !!B.DD.node;
		},
		releaseCanvasOnDestroy: !0,
		document: ai.document,
		_injectGlobal(e) {
			ai.Konva !== void 0 && console.error("Several Konva instances detected. It is not recommended to use multiple Konva instances in the same environment."), ai.Konva = e;
		}
	}, oi = /* @__PURE__ */ new Set(), si = (e, t = !1) => {
		B[e.prototype.getClassName()] = e, t && oi.add(e);
	}, B._injectGlobal(B);
}));
//#endregion
//#region node_modules/konva/lib/Util.js
function li(e, t) {
	return Math.min(Math.max(e || 0, 0), t);
}
var ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii, Li, V, Ri = o((() => {
	ci(), ui = "Konva.js unsupported environment.\n\nLooks like you are trying to use Konva.js in Node.js environment (or in a Web Worker), because \"document\" object is undefined.\n\nTo use Konva.js in Node.js environment, you need to use the \"canvas-backend\" or \"skia-backend\" module.\n\nbash: npm install canvas\njs: import \"konva/canvas-backend\";\n\nor\n\nbash: npm install skia-canvas\njs: import \"konva/skia-backend\";\n", di = () => {
		if (typeof document > "u") throw Error(ui);
	}, fi = class e {
		constructor(e) {
			this.dirty = !1, this.m = e ? e.slice() : [
				1,
				0,
				0,
				1,
				0,
				0
			];
		}
		reset() {
			this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0;
		}
		copy() {
			return new e(this.m);
		}
		copyInto(e) {
			e.m[0] = this.m[0], e.m[1] = this.m[1], e.m[2] = this.m[2], e.m[3] = this.m[3], e.m[4] = this.m[4], e.m[5] = this.m[5];
		}
		point(e) {
			let t = this.m;
			return {
				x: t[0] * e.x + t[2] * e.y + t[4],
				y: t[1] * e.x + t[3] * e.y + t[5]
			};
		}
		_getTransformedRect(e) {
			let [t, n, r, i, a, o] = this.m, s = e.x, c = e.y, l = e.x + e.width, u = e.y + e.height, d = [
				t * s + r * c + a,
				t * l + r * c + a,
				t * l + r * u + a,
				t * s + r * u + a
			], f = [
				n * s + i * c + o,
				n * l + i * c + o,
				n * l + i * u + o,
				n * s + i * u + o
			], p = Math.min(d[0], d[1], d[2], d[3]), m = Math.min(f[0], f[1], f[2], f[3]);
			return {
				x: p,
				y: m,
				width: Math.max(d[0], d[1], d[2], d[3]) - p,
				height: Math.max(f[0], f[1], f[2], f[3]) - m
			};
		}
		translate(e, t) {
			return this.m[4] += this.m[0] * e + this.m[2] * t, this.m[5] += this.m[1] * e + this.m[3] * t, this;
		}
		scale(e, t) {
			return this.m[0] *= e, this.m[1] *= e, this.m[2] *= t, this.m[3] *= t, this;
		}
		rotate(e) {
			let t = Math.cos(e), n = Math.sin(e), r = this.m[0] * t + this.m[2] * n, i = this.m[1] * t + this.m[3] * n, a = this.m[0] * -n + this.m[2] * t, o = this.m[1] * -n + this.m[3] * t;
			return this.m[0] = r, this.m[1] = i, this.m[2] = a, this.m[3] = o, this;
		}
		getTranslation() {
			return {
				x: this.m[4],
				y: this.m[5]
			};
		}
		skew(e, t) {
			let n = this.m[0] + this.m[2] * t, r = this.m[1] + this.m[3] * t, i = this.m[2] + this.m[0] * e, a = this.m[3] + this.m[1] * e;
			return this.m[0] = n, this.m[1] = r, this.m[2] = i, this.m[3] = a, this;
		}
		multiply(e) {
			let t = this.m[0] * e.m[0] + this.m[2] * e.m[1], n = this.m[1] * e.m[0] + this.m[3] * e.m[1], r = this.m[0] * e.m[2] + this.m[2] * e.m[3], i = this.m[1] * e.m[2] + this.m[3] * e.m[3], a = this.m[0] * e.m[4] + this.m[2] * e.m[5] + this.m[4], o = this.m[1] * e.m[4] + this.m[3] * e.m[5] + this.m[5];
			return this.m[0] = t, this.m[1] = n, this.m[2] = r, this.m[3] = i, this.m[4] = a, this.m[5] = o, this;
		}
		isInvertible() {
			return this.m[0] * this.m[3] - this.m[1] * this.m[2] !== 0;
		}
		invert() {
			let e = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]), t = this.m[3] * e, n = -this.m[1] * e, r = -this.m[2] * e, i = this.m[0] * e, a = e * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), o = e * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
			return this.m[0] = t, this.m[1] = n, this.m[2] = r, this.m[3] = i, this.m[4] = a, this.m[5] = o, this;
		}
		getMatrix() {
			return this.m;
		}
		decompose() {
			let e = this.m[0], t = this.m[1], n = this.m[2], r = this.m[3], i = this.m[4], a = this.m[5], o = e * r - t * n, s = {
				x: i,
				y: a,
				rotation: 0,
				scaleX: 0,
				scaleY: 0,
				skewX: 0,
				skewY: 0
			};
			if (e != 0 || t != 0) {
				let i = Math.sqrt(e * e + t * t);
				s.rotation = t > 0 ? Math.acos(e / i) : -Math.acos(e / i), s.scaleX = i, s.scaleY = o / i, s.skewX = o && (e * n + t * r) / o, s.skewY = 0;
			} else if (n != 0 || r != 0) {
				let i = Math.sqrt(n * n + r * r);
				s.rotation = Math.PI / 2 - (r > 0 ? Math.acos(-n / i) : -Math.acos(n / i)), s.scaleX = o / i, s.scaleY = i, s.skewX = 0, s.skewY = o && (e * n + t * r) / o;
			}
			return s.rotation = V._getRotation(s.rotation), s;
		}
	}, pi = "[object Array]", mi = "[object Number]", hi = "[object String]", gi = "[object Boolean]", _i = Math.PI / 180, vi = 180 / Math.PI, yi = "#", bi = "", xi = "0", Si = "Konva warning: ", Ci = "Konva error: ", wi = {
		aliceblue: [
			240,
			248,
			255
		],
		antiquewhite: [
			250,
			235,
			215
		],
		aqua: [
			0,
			255,
			255
		],
		aquamarine: [
			127,
			255,
			212
		],
		azure: [
			240,
			255,
			255
		],
		beige: [
			245,
			245,
			220
		],
		bisque: [
			255,
			228,
			196
		],
		black: [
			0,
			0,
			0
		],
		blanchedalmond: [
			255,
			235,
			205
		],
		blue: [
			0,
			0,
			255
		],
		blueviolet: [
			138,
			43,
			226
		],
		brown: [
			165,
			42,
			42
		],
		burlywood: [
			222,
			184,
			135
		],
		cadetblue: [
			95,
			158,
			160
		],
		chartreuse: [
			127,
			255,
			0
		],
		chocolate: [
			210,
			105,
			30
		],
		coral: [
			255,
			127,
			80
		],
		cornflowerblue: [
			100,
			149,
			237
		],
		cornsilk: [
			255,
			248,
			220
		],
		crimson: [
			220,
			20,
			60
		],
		cyan: [
			0,
			255,
			255
		],
		darkblue: [
			0,
			0,
			139
		],
		darkcyan: [
			0,
			139,
			139
		],
		darkgoldenrod: [
			184,
			134,
			11
		],
		darkgray: [
			169,
			169,
			169
		],
		darkgreen: [
			0,
			100,
			0
		],
		darkgrey: [
			169,
			169,
			169
		],
		darkkhaki: [
			189,
			183,
			107
		],
		darkmagenta: [
			139,
			0,
			139
		],
		darkolivegreen: [
			85,
			107,
			47
		],
		darkorange: [
			255,
			140,
			0
		],
		darkorchid: [
			153,
			50,
			204
		],
		darkred: [
			139,
			0,
			0
		],
		darksalmon: [
			233,
			150,
			122
		],
		darkseagreen: [
			143,
			188,
			143
		],
		darkslateblue: [
			72,
			61,
			139
		],
		darkslategray: [
			47,
			79,
			79
		],
		darkslategrey: [
			47,
			79,
			79
		],
		darkturquoise: [
			0,
			206,
			209
		],
		darkviolet: [
			148,
			0,
			211
		],
		deeppink: [
			255,
			20,
			147
		],
		deepskyblue: [
			0,
			191,
			255
		],
		dimgray: [
			105,
			105,
			105
		],
		dimgrey: [
			105,
			105,
			105
		],
		dodgerblue: [
			30,
			144,
			255
		],
		firebrick: [
			178,
			34,
			34
		],
		floralwhite: [
			255,
			250,
			240
		],
		forestgreen: [
			34,
			139,
			34
		],
		fuchsia: [
			255,
			0,
			255
		],
		gainsboro: [
			220,
			220,
			220
		],
		ghostwhite: [
			248,
			248,
			255
		],
		gold: [
			255,
			215,
			0
		],
		goldenrod: [
			218,
			165,
			32
		],
		gray: [
			128,
			128,
			128
		],
		green: [
			0,
			128,
			0
		],
		greenyellow: [
			173,
			255,
			47
		],
		grey: [
			128,
			128,
			128
		],
		honeydew: [
			240,
			255,
			240
		],
		hotpink: [
			255,
			105,
			180
		],
		indianred: [
			205,
			92,
			92
		],
		indigo: [
			75,
			0,
			130
		],
		ivory: [
			255,
			255,
			240
		],
		khaki: [
			240,
			230,
			140
		],
		lavender: [
			230,
			230,
			250
		],
		lavenderblush: [
			255,
			240,
			245
		],
		lawngreen: [
			124,
			252,
			0
		],
		lemonchiffon: [
			255,
			250,
			205
		],
		lightblue: [
			173,
			216,
			230
		],
		lightcoral: [
			240,
			128,
			128
		],
		lightcyan: [
			224,
			255,
			255
		],
		lightgoldenrodyellow: [
			250,
			250,
			210
		],
		lightgray: [
			211,
			211,
			211
		],
		lightgreen: [
			144,
			238,
			144
		],
		lightgrey: [
			211,
			211,
			211
		],
		lightpink: [
			255,
			182,
			193
		],
		lightsalmon: [
			255,
			160,
			122
		],
		lightseagreen: [
			32,
			178,
			170
		],
		lightskyblue: [
			135,
			206,
			250
		],
		lightslategray: [
			119,
			136,
			153
		],
		lightslategrey: [
			119,
			136,
			153
		],
		lightsteelblue: [
			176,
			196,
			222
		],
		lightyellow: [
			255,
			255,
			224
		],
		lime: [
			0,
			255,
			0
		],
		limegreen: [
			50,
			205,
			50
		],
		linen: [
			250,
			240,
			230
		],
		magenta: [
			255,
			0,
			255
		],
		maroon: [
			128,
			0,
			0
		],
		mediumaquamarine: [
			102,
			205,
			170
		],
		mediumblue: [
			0,
			0,
			205
		],
		mediumorchid: [
			186,
			85,
			211
		],
		mediumpurple: [
			147,
			112,
			219
		],
		mediumseagreen: [
			60,
			179,
			113
		],
		mediumslateblue: [
			123,
			104,
			238
		],
		mediumspringgreen: [
			0,
			250,
			154
		],
		mediumturquoise: [
			72,
			209,
			204
		],
		mediumvioletred: [
			199,
			21,
			133
		],
		midnightblue: [
			25,
			25,
			112
		],
		mintcream: [
			245,
			255,
			250
		],
		mistyrose: [
			255,
			228,
			225
		],
		moccasin: [
			255,
			228,
			181
		],
		navajowhite: [
			255,
			222,
			173
		],
		navy: [
			0,
			0,
			128
		],
		oldlace: [
			253,
			245,
			230
		],
		olive: [
			128,
			128,
			0
		],
		olivedrab: [
			107,
			142,
			35
		],
		orange: [
			255,
			165,
			0
		],
		orangered: [
			255,
			69,
			0
		],
		orchid: [
			218,
			112,
			214
		],
		palegoldenrod: [
			238,
			232,
			170
		],
		palegreen: [
			152,
			251,
			152
		],
		paleturquoise: [
			175,
			238,
			238
		],
		palevioletred: [
			219,
			112,
			147
		],
		papayawhip: [
			255,
			239,
			213
		],
		peachpuff: [
			255,
			218,
			185
		],
		peru: [
			205,
			133,
			63
		],
		pink: [
			255,
			192,
			203
		],
		plum: [
			221,
			160,
			221
		],
		powderblue: [
			176,
			224,
			230
		],
		purple: [
			128,
			0,
			128
		],
		rebeccapurple: [
			102,
			51,
			153
		],
		red: [
			255,
			0,
			0
		],
		rosybrown: [
			188,
			143,
			143
		],
		royalblue: [
			65,
			105,
			225
		],
		saddlebrown: [
			139,
			69,
			19
		],
		salmon: [
			250,
			128,
			114
		],
		sandybrown: [
			244,
			164,
			96
		],
		seagreen: [
			46,
			139,
			87
		],
		seashell: [
			255,
			245,
			238
		],
		sienna: [
			160,
			82,
			45
		],
		silver: [
			192,
			192,
			192
		],
		skyblue: [
			135,
			206,
			235
		],
		slateblue: [
			106,
			90,
			205
		],
		slategray: [
			112,
			128,
			144
		],
		slategrey: [
			112,
			128,
			144
		],
		snow: [
			255,
			250,
			250
		],
		springgreen: [
			0,
			255,
			127
		],
		steelblue: [
			70,
			130,
			180
		],
		tan: [
			210,
			180,
			140
		],
		teal: [
			0,
			128,
			128
		],
		thistle: [
			216,
			191,
			216
		],
		transparent: [
			0,
			0,
			0,
			0
		],
		tomato: [
			255,
			99,
			71
		],
		turquoise: [
			64,
			224,
			208
		],
		violet: [
			238,
			130,
			238
		],
		wheat: [
			245,
			222,
			179
		],
		white: [
			255,
			255,
			255
		],
		whitesmoke: [
			245,
			245,
			245
		],
		yellow: [
			255,
			255,
			0
		],
		yellowgreen: [
			154,
			205,
			50
		]
	}, Ti = null, Ei = typeof window < "u" ? window : {}, Di = /* @__PURE__ */ new WeakMap(), Oi = (e, t) => {
		typeof e.requestAnimationFrame == "function" ? e.requestAnimationFrame(t) : typeof requestAnimationFrame < "u" ? requestAnimationFrame(t) : setTimeout(t, 16);
	}, ki = /* @__PURE__ */ new Map(), Ai = Object.getPrototypeOf(Int8Array), ji = (e) => {
		let t = e.trim();
		return t.indexOf(",") === -1 ? t.split(/\s*\/\s*|\s+/) : t.split(/\s*,\s*/);
	}, Mi = "[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?", Ni = RegExp(`^(${Mi})(%?)$`, "i"), Pi = (e, t) => {
		let n = Ni.exec(e);
		if (!n) return NaN;
		let r = n[2] ? Number(n[1]) / 100 * t : Number(n[1]);
		return Math.min(Math.max(r, 0), t);
	}, Fi = /^#[0-9a-f]+$/i, Ii = RegExp(`^(${Mi})(deg|grad|rad|turn)?$`, "i"), Li = {
		deg: 1,
		grad: .9,
		rad: vi,
		turn: 360
	}, V = {
		_isElement(e) {
			return !!(e && e.nodeType == 1);
		},
		_isFunction(e) {
			return !!(e && e.constructor && e.call && e.apply);
		},
		_isPlainObject(e) {
			return !!e && e.constructor === Object;
		},
		_isArray(e) {
			return Object.prototype.toString.call(e) === pi;
		},
		_isNumber(e) {
			return Object.prototype.toString.call(e) === mi && !isNaN(e) && isFinite(e);
		},
		_isString(e) {
			return Object.prototype.toString.call(e) === hi;
		},
		_isBoolean(e) {
			return Object.prototype.toString.call(e) === gi;
		},
		isObject(e) {
			return e instanceof Object;
		},
		isValidSelector(e) {
			if (typeof e != "string") return !1;
			let t = e[0];
			return t === "#" || t === "." || t === t.toUpperCase();
		},
		_sign(e) {
			return e === 0 || e > 0 ? 1 : -1;
		},
		requestAnimFrame(e, t) {
			let n = t && !t.closed && t || Ei, r = Di.get(n);
			r || (r = [], Di.set(n, r), Oi(n, function() {
				Di.delete(n), r.forEach(function(e) {
					e();
				});
			})), r.push(e);
		},
		createCanvasElement() {
			di();
			let e = document.createElement("canvas");
			try {
				e.style = e.style || {};
			} catch {}
			return e;
		},
		createImageElement() {
			return di(), document.createElement("img");
		},
		_urlToImage(e, t, n) {
			let r = V.createImageElement();
			r.onload = function() {
				t(r);
			}, r.onerror = (e) => {
				n?.(e instanceof Error ? e : /* @__PURE__ */ Error("Unable to load image."));
			}, r.src = e;
		},
		_rgbToHex(e, t, n) {
			return ((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1);
		},
		_hexToRgb(e) {
			e = e.replace(yi, bi);
			let t = parseInt(e, 16);
			return {
				r: t >> 16 & 255,
				g: t >> 8 & 255,
				b: t & 255
			};
		},
		getRandomColor() {
			let e = (Math.random() * 16777215 | 0).toString(16);
			for (; e.length < 6;) e = xi + e;
			return yi + e;
		},
		isCanvasFarblingActive() {
			if (Ti !== null) return Ti;
			if (typeof document > "u") return Ti = !1, !1;
			let e = this.createCanvasElement();
			e.width = 10, e.height = 10;
			let t = e.getContext("2d", { willReadFrequently: !0 });
			t.clearRect(0, 0, 10, 10), t.fillStyle = "#282828", t.fillRect(0, 0, 10, 10);
			let n = t.getImageData(0, 0, 10, 10).data, r = !1;
			for (let e = 0; e < 100; e++) if (n[e * 4] !== 40 || n[e * 4 + 1] !== 40 || n[e * 4 + 2] !== 40 || n[e * 4 + 3] !== 255) {
				r = !0;
				break;
			}
			return Ti = r, this.releaseCanvas(e), Ti;
		},
		getHitColor() {
			let e = () => Math.random() * 256 | 0;
			return this.getHitColorKey(e(), e(), e());
		},
		getHitColorKey(e, t, n) {
			let r = this.isCanvasFarblingActive() ? 5 : 3, i = (e) => Math.round(e / r) * r;
			return yi + this._rgbToHex(i(e), i(t), i(n));
		},
		getSnappedHexColor(e) {
			let { r: t, g: n, b: r } = this._hexToRgb(e);
			return this.getHitColorKey(t, n, r);
		},
		getRGB(e) {
			let { r: t = 0, g: n = 0, b: r = 0 } = V.colorToRGBA(e) ?? {};
			return {
				r: t,
				g: n,
				b: r
			};
		},
		colorToRGBA(e) {
			e = (e || "").trim() || "black";
			let t = V._namedColorToRBA(e) || V._hex3ColorToRGBA(e) || V._hex4ColorToRGBA(e) || V._hex6ColorToRGBA(e) || V._hex8ColorToRGBA(e) || V._rgbColorToRGBA(e) || V._hslColorToRGBA(e);
			if (t && [
				t.r,
				t.g,
				t.b,
				t.a
			].every(V._isNumber)) return t;
		},
		_namedColorToRBA(e) {
			let t = wi[e.toLowerCase()];
			return t ? {
				r: t[0],
				g: t[1],
				b: t[2],
				a: t.length > 3 ? t[3] : 1
			} : null;
		},
		_rgbColorToRGBA(e) {
			let t = /^rgba?\(([^)]*)\)$/i.exec(e);
			if (!t) return;
			let n = ji(t[1]);
			if (!(n.length < 3 || n.length > 4)) return {
				r: Pi(n[0], 255),
				g: Pi(n[1], 255),
				b: Pi(n[2], 255),
				a: n.length > 3 ? Pi(n[3], 1) : 1
			};
		},
		_hex8ColorToRGBA(e) {
			if (e.length === 9 && Fi.test(e)) return {
				r: parseInt(e.slice(1, 3), 16),
				g: parseInt(e.slice(3, 5), 16),
				b: parseInt(e.slice(5, 7), 16),
				a: parseInt(e.slice(7, 9), 16) / 255
			};
		},
		_hex6ColorToRGBA(e) {
			if (e.length === 7 && Fi.test(e)) return {
				r: parseInt(e.slice(1, 3), 16),
				g: parseInt(e.slice(3, 5), 16),
				b: parseInt(e.slice(5, 7), 16),
				a: 1
			};
		},
		_hex4ColorToRGBA(e) {
			if (e.length === 5 && Fi.test(e)) return {
				r: parseInt(e[1] + e[1], 16),
				g: parseInt(e[2] + e[2], 16),
				b: parseInt(e[3] + e[3], 16),
				a: parseInt(e[4] + e[4], 16) / 255
			};
		},
		_hex3ColorToRGBA(e) {
			if (e.length === 4 && Fi.test(e)) return {
				r: parseInt(e[1] + e[1], 16),
				g: parseInt(e[2] + e[2], 16),
				b: parseInt(e[3] + e[3], 16),
				a: 1
			};
		},
		_hslColorToRGBA(e) {
			let t = /^hsla?\(([^)]*)\)$/i.exec(e);
			if (!t) return;
			let n = ji(t[1]);
			if (n.length < 3 || n.length > 4) return;
			let r = Ii.exec(n[0]);
			if (!r) return;
			let i = r[2], a = Number(r[1]) * (i ? Li[i.toLowerCase()] : 1);
			if (!isFinite(a)) return;
			let o = (a % 360 + 360) % 360 / 360, s = Pi(n[1], 100) / 100, c = Pi(n[2], 100) / 100, l = n.length > 3 ? Pi(n[3], 1) : 1, u = c < .5 ? c * (1 + s) : c + s - c * s, d = 2 * c - u, f = [
				0,
				0,
				0
			];
			for (let e = 0; e < 3; e++) {
				let t = o + 1 / 3 * -(e - 1);
				t < 0 && t++, t > 1 && t--;
				let n;
				n = 6 * t < 1 ? d + (u - d) * 6 * t : 2 * t < 1 ? u : 3 * t < 2 ? d + (u - d) * (2 / 3 - t) * 6 : d, f[e] = n * 255;
			}
			return {
				r: Math.round(f[0]),
				g: Math.round(f[1]),
				b: Math.round(f[2]),
				a: l
			};
		},
		_getPointsRect(e) {
			let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
			for (let a = 0; a < e.length; a += 2) {
				let o = e[a], s = e[a + 1];
				isNaN(o) || (t = Math.min(t, o), r = Math.max(r, o)), isNaN(s) || (n = Math.min(n, s), i = Math.max(i, s));
			}
			return isFinite(t + n) ? {
				x: t,
				y: n,
				width: r - t,
				height: i - n
			} : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		},
		haveIntersection(e, t) {
			return !(t.x > e.x + e.width || t.x + t.width < e.x || t.y > e.y + e.height || t.y + t.height < e.y);
		},
		cloneObject(e) {
			let t = {};
			for (let n in e) t[n] = V._cloneValue(e[n]);
			return t;
		},
		_cloneValue(e) {
			return V._isArray(e) ? e.some((e) => typeof e == "object") ? e.map(V._cloneValue) : e.slice() : V._isPlainObject(e) ? V.cloneObject(e) : e instanceof Ai ? e.slice() : e;
		},
		cloneArray(e) {
			return e.slice(0);
		},
		degToRad(e) {
			return e * _i;
		},
		radToDeg(e) {
			return e * vi;
		},
		_getRotation(e) {
			return B.angleDeg ? V.radToDeg(e) : e;
		},
		_capitalize(e) {
			let t = ki.get(e);
			if (t !== void 0) return t;
			let n = e.charAt(0).toUpperCase() + e.slice(1);
			return ki.set(e, n), n;
		},
		throw(e) {
			throw Error(Ci + e);
		},
		error(e) {
			console.error(Ci + e);
		},
		warn(e) {
			B.showWarnings && console.warn(Si + e);
		},
		_batchEvents(e, t) {
			if (!e) return t();
			let n = !1, r = !0;
			try {
				e(() => {
					n || !r ? V.warn("eventBatchFunc must call its argument exactly once, synchronously.") : (n = !0, t());
				});
			} finally {
				r = !1, n || V.warn("eventBatchFunc must call its argument synchronously.");
			}
		},
		each(e, t) {
			for (let n in e) t(n, e[n]);
		},
		_inRange(e, t, n) {
			return t <= e && e < n;
		},
		_getProjectionToSegment(e, t, n, r, i, a) {
			let o, s, c, l = (e - n) * (e - n) + (t - r) * (t - r);
			if (l == 0) o = e, s = t, c = (i - n) * (i - n) + (a - r) * (a - r);
			else {
				let u = ((i - e) * (n - e) + (a - t) * (r - t)) / l;
				u < 0 ? (o = e, s = t, c = (e - i) * (e - i) + (t - a) * (t - a)) : u > 1 ? (o = n, s = r, c = (n - i) * (n - i) + (r - a) * (r - a)) : (o = e + u * (n - e), s = t + u * (r - t), c = (o - i) * (o - i) + (s - a) * (s - a));
			}
			return [
				o,
				s,
				c
			];
		},
		_getProjectionToLine(e, t, n) {
			let r = V.cloneObject(e), i = Number.MAX_VALUE;
			return t.forEach(function(a, o) {
				if (!n && o === t.length - 1) return;
				let s = t[(o + 1) % t.length], c = V._getProjectionToSegment(a.x, a.y, s.x, s.y, e.x, e.y), l = c[0], u = c[1], d = c[2];
				d < i && (r.x = l, r.y = u, i = d);
			}), r;
		},
		_prepareArrayForTween(e, t, n) {
			let r = [], i = [];
			if (e.length > t.length) {
				let n = t;
				t = e, e = n;
			}
			for (let t = 0; t < e.length; t += 2) r.push({
				x: e[t],
				y: e[t + 1]
			});
			for (let e = 0; e < t.length; e += 2) i.push({
				x: t[e],
				y: t[e + 1]
			});
			let a = [];
			return i.forEach(function(e) {
				let t = V._getProjectionToLine(e, r, n);
				a.push(t.x), a.push(t.y);
			}), a;
		},
		_prepareToStringify(e, t = /* @__PURE__ */ new Set()) {
			let n = V._isArray(e) ? [] : {};
			t.add(e);
			for (let r of Object.keys(e)) {
				let i = e[r];
				V._isElement(i) || t.has(i) || (n[r] = V._isPlainObject(i) || V._isArray(i) ? V._prepareToStringify(i, t) : i);
			}
			return t.delete(e), n;
		},
		_assign(e, t) {
			for (let n in t) e[n] = t[n];
			return e;
		},
		_getEventType(e) {
			return e.indexOf("pointer") >= 0 ? "pointer" : e.indexOf("touch") >= 0 ? "touch" : "mouse";
		},
		_getFirstPointerId(e) {
			return e.touches ? e.changedTouches[0].identifier : e.pointerId ?? 999;
		},
		releaseCanvas(...e) {
			B.releaseCanvasOnDestroy && e.forEach((e) => {
				e.width = 0, e.height = 0;
			});
		},
		_cornerRadii(e, t, n) {
			let r = Math.min(t, n) / 2;
			if (typeof e == "number") {
				let t = li(e, r);
				return [
					t,
					t,
					t,
					t
				];
			}
			return [
				li(e[0], r),
				li(e[1], r),
				li(e[2], r),
				li(e[3], r)
			];
		},
		drawRoundedRectPath(e, t, n, r) {
			let i = t < 0 ? t : 0, a = n < 0 ? n : 0;
			t = Math.abs(t), n = Math.abs(n);
			let [o, s, c, l] = V._cornerRadii(r, t, n);
			e.moveTo(i + o, a), e.lineTo(i + t - s, a), e.arc(i + t - s, a + s, s, Math.PI * 3 / 2, 0, !1), e.lineTo(i + t, a + n - c), e.arc(i + t - c, a + n - c, c, 0, Math.PI / 2, !1), e.lineTo(i + l, a + n), e.arc(i + l, a + n - l, l, Math.PI / 2, Math.PI, !1), e.lineTo(i, a + o), e.arc(i + o, a + o, o, Math.PI, Math.PI * 3 / 2, !1);
		},
		drawRoundedPolygonPath(e, t, n, r, i) {
			r = Math.abs(r);
			for (let a = 0; a < n; a++) {
				let o = t[(a - 1 + n) % n], s = t[a], c = t[(a + 1) % n], l = {
					x: s.x - o.x,
					y: s.y - o.y
				}, u = {
					x: c.x - s.x,
					y: c.y - s.y
				}, d = Math.hypot(l.x, l.y), f = Math.hypot(u.x, u.y), p;
				p = typeof i == "number" ? i : a < i.length ? i[a] : 0, p = r * Math.cos(Math.PI / n) * Math.min(1, p / r * 2);
				let m = {
					x: l.x / d,
					y: l.y / d
				}, h = {
					x: u.x / f,
					y: u.y / f
				}, g = {
					x: s.x - m.x * p,
					y: s.y - m.y * p
				}, _ = {
					x: s.x + h.x * p,
					y: s.y + h.y * p
				};
				a === 0 ? e.moveTo(g.x, g.y) : e.lineTo(g.x, g.y), e.arcTo(s.x, s.y, _.x, _.y, p);
			}
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/Context.js
function zi(e) {
	let t = [], n = e.length, r = V;
	for (let i = 0; i < n; i++) {
		let n = e[i];
		r._isNumber(n) ? n = Math.round(n * 1e3) / 1e3 : r._isString(n) || (n += ""), t.push(n);
	}
	return t;
}
function Bi() {
	if (Xi !== null) return Xi;
	try {
		let e = V.createCanvasElement(), t = e.getContext("2d");
		Xi = !!t && "filter" in t, V.releaseCanvas(e);
	} catch {
		Xi = !1;
	}
	return Xi;
}
var Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea = o((() => {
	Ri(), ci(), Vi = ",", Hi = "(", Ui = ")", Wi = ";", Gi = "()", Ki = "=", qi = /* @__PURE__ */ "arc.arcTo.beginPath.bezierCurveTo.clearRect.clip.closePath.createLinearGradient.createPattern.createRadialGradient.drawImage.ellipse.fill.fillText.getImageData.createImageData.lineTo.moveTo.putImageData.quadraticCurveTo.rect.roundRect.restore.rotate.save.scale.setLineDash.setTransform.stroke.strokeText.transform.translate".split("."), Ji = [
		"fillStyle",
		"strokeStyle",
		"shadowColor",
		"shadowBlur",
		"shadowOffsetX",
		"shadowOffsetY",
		"letterSpacing",
		"lineCap",
		"lineDashOffset",
		"lineJoin",
		"lineWidth",
		"miterLimit",
		"direction",
		"font",
		"textAlign",
		"textBaseline",
		"globalAlpha",
		"globalCompositeOperation",
		"imageSmoothingEnabled",
		"imageSmoothingQuality",
		"filter"
	], Yi = 100, Xi = null, Zi = class {
		constructor(e) {
			this.canvas = e, B.enableTrace && (this.traceArr = [], this._enableTrace());
		}
		fillShape(e) {
			e.fillEnabled() && this._fill(e);
		}
		_fill(e) {}
		strokeShape(e) {
			e.hasStroke() && this._stroke(e);
		}
		_stroke(e) {}
		fillStrokeShape(e) {
			e.attrs.fillAfterStrokeEnabled ? (this.strokeShape(e), this.fillShape(e)) : (this.fillShape(e), this.strokeShape(e));
		}
		getTrace(e, t) {
			let n = this.traceArr, r = n.length, i = "", a, o, s, c;
			for (a = 0; a < r; a++) o = n[a], s = o.method, s ? (c = o.args, i += s, e ? i += Gi : (t && (c = c.map((e) => typeof e == "number" ? Math.floor(e) : e)), i += Hi + c.join(Vi) + Ui)) : (i += o.property, e || (i += Ki + o.val)), i += Wi;
			return i;
		}
		clearTrace() {
			this.traceArr = [];
		}
		_trace(e) {
			let t = this.traceArr, n;
			t.push(e), n = t.length, n >= Yi && t.shift();
		}
		reset() {
			let e = this.getCanvas().getPixelRatio();
			this.setTransform(1 * e, 0, 0, 1 * e, 0, 0);
		}
		getCanvas() {
			return this.canvas;
		}
		clear(e) {
			let t = this.getCanvas();
			e ? this.clearRect(e.x || 0, e.y || 0, e.width || 0, e.height || 0) : this.clearRect(0, 0, t.getWidth() / t.pixelRatio, t.getHeight() / t.pixelRatio);
		}
		_drawDeviceBuffer(e) {
			let { x: t, y: n, width: r, height: i } = e._isolationRect;
			this.setTransform(1, 0, 0, 1, 0, 0), this.imageSmoothingEnabled = !1, this.drawImage(e._canvas, 0, 0, r, i, t, n, r, i);
		}
		_applyLineCap(e) {
			let t = e.attrs.lineCap;
			t && this.setAttr("lineCap", t);
		}
		_getOpacity(e) {
			if (!this._opacityRoot) return e.getAbsoluteOpacity();
			let t = e.opacity(), n = e.parent;
			for (; n && n !== this._opacityRoot;) t *= n.opacity(), n = n.parent;
			return t;
		}
		_applyOpacity(e) {
			let t = this._getOpacity(e);
			t !== 1 && this.setAttr("globalAlpha", t);
		}
		_applyLineJoin(e) {
			let t = e.attrs.lineJoin;
			t && this.setAttr("lineJoin", t);
		}
		_applyMiterLimit(e) {
			let t = e.attrs.miterLimit;
			t != null && this.setAttr("miterLimit", t);
		}
		setAttr(e, t) {
			this._context[e] = t;
		}
		arc(e, t, n, r, i, a) {
			this._context.arc(e, t, n, r, i, a);
		}
		arcTo(e, t, n, r, i) {
			this._context.arcTo(e, t, n, r, i);
		}
		beginPath() {
			this._context.beginPath();
		}
		bezierCurveTo(e, t, n, r, i, a) {
			this._context.bezierCurveTo(e, t, n, r, i, a);
		}
		clearRect(e, t, n, r) {
			this._context.clearRect(e, t, n, r);
		}
		clip(...e) {
			this._context.clip.apply(this._context, e);
		}
		closePath() {
			this._context.closePath();
		}
		createImageData(e, t) {
			let n = arguments;
			if (n.length === 2) return this._context.createImageData(e, t);
			if (n.length === 1) return this._context.createImageData(e);
		}
		createLinearGradient(e, t, n, r) {
			return this._context.createLinearGradient(e, t, n, r);
		}
		createPattern(e, t) {
			return this._context.createPattern(e, t);
		}
		createRadialGradient(e, t, n, r, i, a) {
			return this._context.createRadialGradient(e, t, n, r, i, a);
		}
		drawImage(e, t, n, r, i, a, o, s, c) {
			let l = arguments, u = this._context;
			l.length === 3 ? u.drawImage(e, t, n) : l.length === 5 ? u.drawImage(e, t, n, r, i) : l.length === 9 && u.drawImage(e, t, n, r, i, a, o, s, c);
		}
		ellipse(e, t, n, r, i, a, o, s) {
			this._context.ellipse(e, t, n, r, i, a, o, s);
		}
		isPointInPath(e, t, n, r) {
			return n ? this._context.isPointInPath(n, e, t, r) : this._context.isPointInPath(e, t, r);
		}
		fill(...e) {
			this._context.fill.apply(this._context, e);
		}
		fillRect(e, t, n, r) {
			this._context.fillRect(e, t, n, r);
		}
		strokeRect(e, t, n, r) {
			this._context.strokeRect(e, t, n, r);
		}
		fillText(e, t, n, r) {
			r ? this._context.fillText(e, t, n, r) : this._context.fillText(e, t, n);
		}
		measureText(e) {
			return this._context.measureText(e);
		}
		getImageData(e, t, n, r) {
			return this._context.getImageData(e, t, n, r);
		}
		lineTo(e, t) {
			this._context.lineTo(e, t);
		}
		moveTo(e, t) {
			this._context.moveTo(e, t);
		}
		rect(e, t, n, r) {
			this._context.rect(e, t, n, r);
		}
		roundRect(e, t, n, r, i) {
			this._context.roundRect(e, t, n, r, i);
		}
		putImageData(e, t, n) {
			this._context.putImageData(e, t, n);
		}
		quadraticCurveTo(e, t, n, r) {
			this._context.quadraticCurveTo(e, t, n, r);
		}
		restore() {
			this._context.restore();
		}
		rotate(e) {
			this._context.rotate(e);
		}
		save() {
			this._context.save();
		}
		scale(e, t) {
			this._context.scale(e, t);
		}
		setLineDash(e) {
			this._context.setLineDash(e);
		}
		getLineDash() {
			return this._context.getLineDash();
		}
		setTransform(e, t, n, r, i, a) {
			this._context.setTransform(e, t, n, r, i, a);
		}
		stroke(e) {
			e ? this._context.stroke(e) : this._context.stroke();
		}
		strokeText(e, t, n, r) {
			this._context.strokeText(e, t, n, r);
		}
		transform(e, t, n, r, i, a) {
			this._context.transform(e, t, n, r, i, a);
		}
		translate(e, t) {
			this._context.translate(e, t);
		}
		_enableTrace() {
			let e = this, t = qi.length, n = this.setAttr, r, i, a = function(t) {
				let n = e[t], r;
				e[t] = function() {
					return i = zi(Array.prototype.slice.call(arguments, 0)), r = n.apply(e, arguments), e._trace({
						method: t,
						args: i
					}), r;
				};
			};
			for (r = 0; r < t; r++) a(qi[r]);
			e.setAttr = function() {
				n.apply(e, arguments);
				let t = arguments[0], r = arguments[1];
				(t === "shadowOffsetX" || t === "shadowOffsetY" || t === "shadowBlur") && (r /= this.canvas.getPixelRatio()), e._trace({
					property: t,
					val: r
				});
			};
		}
		_applyGlobalCompositeOperation(e) {
			let t = e.attrs.globalCompositeOperation;
			t && t !== "source-over" && this.setAttr("globalCompositeOperation", t);
		}
	}, Ji.forEach(function(e) {
		Object.defineProperty(Zi.prototype, e, {
			get() {
				return this._context[e];
			},
			set(t) {
				this._context[e] = t;
			}
		});
	}), Qi = class extends Zi {
		constructor(e, { willReadFrequently: t = !1 } = {}) {
			super(e), this._context = e._canvas.getContext("2d", { willReadFrequently: t });
		}
		_getFillPattern(e) {
			let t = this._context;
			return "patternQuality" in t && (t.patternQuality = t.imageSmoothingEnabled ? "good" : "nearest"), e._getFillPattern();
		}
		_getFillStyle(e) {
			let t = e.fill(), n = e.fillPriority();
			if (t && n === "color") return t;
			let r = e.fillPatternImage();
			if (r && n === "pattern") return this._getFillPattern(e);
			let i = e.fillLinearGradientColorStops();
			if (i && n === "linear-gradient") return e._getLinearGradient();
			let a = e.fillRadialGradientColorStops();
			if (a && n === "radial-gradient") return e._getRadialGradient();
			if (t) return t;
			if (r) return this._getFillPattern(e);
			if (i) return e._getLinearGradient();
			if (a) return e._getRadialGradient();
		}
		_fill(e) {
			let t = this._getFillStyle(e);
			t !== void 0 && (this.setAttr("fillStyle", t), e._fillFunc(this));
		}
		_strokeLinearGradient(e) {
			let t = e.getStrokeLinearGradientStartPoint(), n = e.getStrokeLinearGradientEndPoint();
			if (!e.getStrokeScaleEnabled()) {
				let { a: e, b: r, c: i, d: a, e: o, f: s } = this._context.getTransform(), c = new fi([
					e,
					r,
					i,
					a,
					o,
					s
				]), l = this.canvas.getPixelRatio(), u = n.x - t.x, d = n.y - t.y, f = a * u - r * d, p = e * d - i * u, m = f * f + p * p, h = m ? (u * u + d * d) * (e * a - r * i) / m : 0;
				t = c.point(t), n = {
					x: t.x + f * h,
					y: t.y + p * h
				}, t = {
					x: t.x / l,
					y: t.y / l
				}, n = {
					x: n.x / l,
					y: n.y / l
				};
			}
			let r = e.getStrokeLinearGradientColorStops(), i = this.createLinearGradient(t.x, t.y, n.x, n.y);
			if (r) {
				for (let e = 0; e < r.length; e += 2) i.addColorStop(r[e], r[e + 1]);
				this.setAttr("strokeStyle", i);
			}
		}
		_applyStrokeStyle(e) {
			e.strokeLinearGradientColorStops() ? this._strokeLinearGradient(e) : this.setAttr("strokeStyle", e.stroke());
		}
		_stroke(e) {
			let t = e.dash(), n = e.getStrokeScaleEnabled();
			n || this.save(), this._applyLineCap(e), t && e.dashEnabled() && (this.setLineDash(t), this.setAttr("lineDashOffset", e.dashOffset())), this.setAttr("lineWidth", e.strokeWidth());
			let r = this.shadowColor, i = e.getShadowForStrokeEnabled();
			if (i || this.setAttr("shadowColor", "rgba(0,0,0,0)"), this._applyStrokeStyle(e), !n) {
				let e = this.getCanvas().getPixelRatio();
				this.setTransform(e, 0, 0, e, 0, 0);
			}
			try {
				e._strokeFunc(this);
			} finally {
				i || this.setAttr("shadowColor", r), n || this.restore();
			}
		}
		_applyShadow(e) {
			let t = e.getShadowRGBA() ?? "black", n = e.getShadowBlur(), r = e.getShadowOffset(), i = e.getAbsoluteScale(), a = this.canvas.getPixelRatio(), o = i.x * a, s = i.y * a;
			this.setAttr("shadowColor", t), this.setAttr("shadowBlur", n * Math.min(Math.abs(o), Math.abs(s))), this.setAttr("shadowOffsetX", r.x * o), this.setAttr("shadowOffsetY", r.y * s);
		}
	}, $i = class extends Zi {
		constructor(e) {
			super(e), this._context = e._canvas.getContext("2d", { willReadFrequently: !0 });
		}
		_fill(e) {
			this.save(), this.setAttr("fillStyle", e.colorKey), e._fillFuncHit(this), this.restore();
		}
		strokeShape(e) {
			e.hasHitStroke() && this._stroke(e);
		}
		_stroke(e) {
			let t = e.getStrokeScaleEnabled();
			if (!t) {
				this.save();
				let e = this.getCanvas().getPixelRatio();
				this.setTransform(e, 0, 0, e, 0, 0);
			}
			this._applyLineCap(e);
			let n = e.hitStrokeWidth(), r = n === "auto" ? e.strokeWidth() : n;
			this.setAttr("lineWidth", r), this.setAttr("strokeStyle", e.colorKey), e._strokeFuncHit(this), t || this.restore();
		}
	};
})), ta, na, ra, ia = o((() => {
	Ri(), ea(), ci(), ta = class {
		constructor(e) {
			this.pixelRatio = 1, this.width = 0, this.height = 0, this._logicalWidth = 0, this._logicalHeight = 0, this.isCache = !1;
			let t = (e || {}).pixelRatio || B.pixelRatio || B._global.devicePixelRatio || 1;
			this.pixelRatio = t, this._canvas = V.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0";
		}
		getContext() {
			return this.context;
		}
		getPixelRatio() {
			return this.pixelRatio;
		}
		setPixelRatio(e) {
			this.pixelRatio = e, this.setSize(this._logicalWidth, this._logicalHeight);
		}
		setWidth(e) {
			this.setSize(e, this._logicalHeight);
		}
		setHeight(e) {
			this.setSize(this._logicalWidth, e);
		}
		getWidth() {
			return this.width;
		}
		getHeight() {
			return this.height;
		}
		_bitmapSize(e) {
			return Math.floor((e || 0) * this.pixelRatio);
		}
		setSize(e, t) {
			(!isFinite(e ?? 0) || !isFinite(t ?? 0)) && (V.error(`Canvas size must be finite numbers, got ${e}x${t}. The canvas is left empty.`), e = t = 0), e = e || 0, t = t || 0;
			let n = this.pixelRatio, r = this.getContext()._context, i = r.imageSmoothingEnabled;
			this._logicalWidth = e, this._logicalHeight = t, this.width = this._canvas.width = this._bitmapSize(e), this.height = this._canvas.height = this._bitmapSize(t), this._canvas.style.width = e + "px", this._canvas.style.height = t + "px", r.scale(n, n), r.imageSmoothingEnabled = i;
		}
		setSizeIfChanged(e, t) {
			(this.width !== this._bitmapSize(e) || this.height !== this._bitmapSize(t)) && this.setSize(e, t);
		}
		toDataURL(e, t) {
			try {
				return this._canvas.toDataURL(e, t);
			} catch {
				try {
					return this._canvas.toDataURL();
				} catch (e) {
					throw V.error("Unable to get data URL. " + e.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), e;
				}
			}
		}
	}, na = class e extends ta {
		_prepareIsolationCanvas(t) {
			let { a: n, b: r, c: i, d: a, e: o, f: s } = this.getContext()._context.getTransform(), c = this._isolationRect || this, l = 0, u = 0, d = c.width, f = c.height;
			if (t) {
				let e = new fi([
					n,
					r,
					i,
					a,
					o,
					s
				])._getTransformedRect(t);
				l = Math.max(0, Math.floor(e.x) - 1), u = Math.max(0, Math.floor(e.y) - 1), d = Math.min(d, Math.ceil(e.x + e.width) + 1) - l, f = Math.min(f, Math.ceil(e.y + e.height) + 1) - u;
			}
			d > 0 && f > 0 || (l = u = 0, d = f = 1);
			let p = this._isolationCanvas || (this._isolationCanvas = new e({
				width: 0,
				height: 0,
				pixelRatio: this.pixelRatio
			}));
			if (p.width < d || p.height < f) {
				let e = this.pixelRatio, t = (t, n, r) => Math.min(r, Math.ceil((n < t ? Math.max(t, n * 1.5) : n) / e));
				p.setSize(t(d, p.width, this._logicalWidth), t(f, p.height, this._logicalHeight));
			}
			p._isolationRect = {
				x: l,
				y: u,
				width: d,
				height: f
			};
			let m = p._isolationPeak;
			m.width = Math.max(m.width, d), m.height = Math.max(m.height, f);
			let h = p.getContext();
			h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, d, f), h.setTransform(n, r, i, a, o - l, s - u);
			let g = this.getContext();
			return h.imageSmoothingEnabled = g.imageSmoothingEnabled, h.imageSmoothingQuality = g.imageSmoothingQuality, h.direction = g.direction, p;
		}
		_trimIsolationCanvas() {
			let e = this._isolationCanvas;
			if (!e) return;
			let t = e._isolationPeak;
			e._isolationLowFrames = e.width * e.height > 4 * t.width * t.height ? e._isolationLowFrames + 1 : 0, e._isolationLowFrames >= 10 ? this._releaseIsolationCanvas() : (t.width = t.height = 0, e._trimIsolationCanvas());
		}
		_releaseIsolationCanvas() {
			let e = this._isolationCanvas;
			e && (e._releaseIsolationCanvas(), V.releaseCanvas(e._canvas), this._isolationCanvas = void 0);
		}
		setSize(e, t) {
			this._releaseIsolationCanvas(), super.setSize(e, t);
		}
		constructor(e = {
			width: 0,
			height: 0,
			willReadFrequently: !1
		}) {
			super(e), this._isolationPeak = {
				width: 0,
				height: 0
			}, this._isolationLowFrames = 0, this.context = new Qi(this, { willReadFrequently: e.willReadFrequently }), this.setSize(e.width, e.height);
		}
	}, ra = class extends ta {
		constructor(e = {
			width: 0,
			height: 0
		}) {
			super(e), this.hitCanvas = !0, this.context = new $i(this), this.context.imageSmoothingEnabled = !1, this.setSize(e.width, e.height);
		}
	};
})), H, aa = o((() => {
	Ri(), H = {
		get isDragging() {
			let e = !1;
			return H._dragElements.forEach((t) => {
				t.dragStatus === "dragging" && (e = !0);
			}), e;
		},
		get node() {
			let e;
			for (let t of H._dragElements.values()) {
				if (t.dragStatus === "dragging") return t.node;
				e = t.node;
			}
			return e;
		},
		_dragElements: /* @__PURE__ */ new Map(),
		_listenToWindow(e) {
			let t = (t) => H._endDragBefore(t, e), n = (t) => H._batchEvents(() => H._drag(t, e), e), r = (e) => H._batchEvents(() => H._endDragAfter(e));
			e.addEventListener("mouseup", t, !0), e.addEventListener("touchend", t, !0), e.addEventListener("touchcancel", t, !0), e.addEventListener("mousemove", n), e.addEventListener("touchmove", n), e.addEventListener("mouseup", r, !1), e.addEventListener("touchend", r, !1), e.addEventListener("touchcancel", r, !1);
		},
		_batchEvents(e, t) {
			if (!H._dragElements.size) return;
			let n = /* @__PURE__ */ new Set();
			for (let { node: e } of H._dragElements.values()) {
				let r = e.getStage();
				if (!r || t && r._getOwnerWindow() !== t) continue;
				let i = r.eventBatchFunc();
				i && n.add(i);
			}
			let r = e;
			for (let e of n) {
				let t = r;
				r = () => V._batchEvents(e, t);
			}
			r();
		},
		_drag(e, t) {
			let n = [], r = /* @__PURE__ */ new Set();
			H._dragElements.forEach((i, a) => {
				let { node: o } = i, s = o.getStage();
				if (t && s._getOwnerWindow() !== t || (r.has(s) || (s.setPointersPositions(e), r.add(s)), i.pointerEventType && i.pointerEventType !== s._pointerEventType)) return;
				i.pointerId === void 0 && (i.pointerId = V._getFirstPointerId(e), i.pointerEventType = s._pointerEventType, i.dragStatus === "dragging" && s._cancelClick(i.pointerId, i.pointerEventType));
				let c = s._changedPointerPositions.find((e) => e.id === i.pointerId);
				if (c) {
					if (i.dragStatus !== "dragging") {
						let t = o.dragDistance();
						if (Math.max(Math.abs(c.x - i.startPointerPos.x), Math.abs(c.y - i.startPointerPos.y)) < t || (o.startDrag({ evt: e }), !o.isDragging())) return;
					}
					o._setDragPosition(e, i), n.push(o);
				}
			}), n.forEach((t) => {
				t.getStage() && t.fire("dragmove", {
					type: "dragmove",
					target: t,
					evt: e
				}, !0);
			});
		},
		_endDragBefore(e, t, n) {
			let r = [], i = /* @__PURE__ */ new Set();
			H._dragElements.forEach((a, o) => {
				let { node: s } = a;
				if (n && a !== n && a.pointerId !== n.pointerId) return;
				let c = s.getStage();
				if (e && !i.has(c) && (!t || c._getOwnerWindow() === t) && (c.setPointersPositions(e), i.add(c)), n || (!e || !a.pointerEventType || a.pointerEventType === V._getEventType(e.type)) && (a.pointerId === void 0 || c._changedPointerPositions.some((e) => e.id === a.pointerId))) {
					if (a.dragStatus === "ready") H._dragElements.delete(o);
					else {
						c._cancelClick(a.pointerId, a.pointerEventType), a.dragStatus = "stopped";
						let e = s.getLayer() || c;
						e && r.indexOf(e) === -1 && r.push(e);
					}
				}
			}), r.forEach((e) => {
				e.draw();
			});
		},
		_endDragAfter(e, t) {
			H._dragElements.forEach((n, r) => {
				n.dragStatus !== "stopped" || t && n !== t && n.pointerId !== t.pointerId || (n.node.fire("dragend", {
					type: "dragend",
					target: n.node,
					evt: e
				}, !0), n.dragStatus !== "dragging" && H._dragElements.delete(r));
			});
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/PointerEvents.js
function oa(e, t) {
	let n = fa.get(e);
	return n && (!t || n.stage === t) ? n.shape : void 0;
}
function sa(e, t, n) {
	e._fire(t, {
		evt: new PointerEvent(t, { pointerId: n }),
		pointerId: n
	});
}
function ca(e, t) {
	return fa.get(e)?.shape === t;
}
function la(e, t) {
	var n;
	da(e);
	let r = t.getStage();
	if (r && (fa.set(e, {
		shape: t,
		stage: r
	}), pa)) {
		try {
			(n = r.content) == null || n.setPointerCapture(e);
		} catch {}
		sa(t, "gotpointercapture", e);
	}
}
function ua(e) {
	fa.forEach(({ shape: t, stage: n }, r) => {
		(t === e || n === e) && da(r);
	});
}
function da(e, t) {
	var n;
	let r = fa.get(e);
	if (!r || t && r.shape !== t) return;
	let { shape: i, stage: a } = r;
	if (fa.delete(e), pa) {
		try {
			(n = a.content) == null || n.releasePointerCapture(e);
		} catch {}
		sa(i, "lostpointercapture", e);
	}
}
var fa, pa, ma = o((() => {
	ci(), fa = /* @__PURE__ */ new Map(), pa = B._global.PointerEvent !== void 0;
}));
//#endregion
//#region node_modules/konva/lib/Validators.js
function ha(e) {
	return V._isString(e) ? "\"" + e + "\"" : Object.prototype.toString.call(e) === "[object Number]" || V._isBoolean(e) ? e : Object.prototype.toString.call(e);
}
function ga(e) {
	return e > 255 ? 255 : e < 0 ? 0 : Math.round(e);
}
function U() {
	if (B.isUnminified) return function(e, t) {
		return V._isNumber(e) || V.warn(ha(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a number."), e;
	};
}
function _a(e) {
	if (B.isUnminified) return function(t, n) {
		let r = V._isNumber(t), i = V._isArray(t) && t.length == e;
		return !r && !i && V.warn(ha(t) + " is a not valid value for \"" + n + "\" attribute. The value should be a number or Array<number>(" + e + ")"), t;
	};
}
function va() {
	if (B.isUnminified) return function(e, t) {
		return V._isNumber(e) || e === "auto" || V.warn(ha(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a number or \"auto\"."), e;
	};
}
function ya() {
	if (B.isUnminified) return function(e, t) {
		return V._isString(e) || V.warn(ha(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a string."), e;
	};
}
function ba() {
	if (B.isUnminified) return function(e, t) {
		let n = V._isString(e), r = Object.prototype.toString.call(e) === "[object CanvasGradient]" || e && e.addColorStop;
		return n || r || V.warn(ha(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a string or a native gradient."), e;
	};
}
function xa() {
	if (B.isUnminified) return function(e, t) {
		return e instanceof Ai || (V._isArray(e) ? e.forEach(function(e) {
			V._isNumber(e) || V.warn("\"" + t + "\" attribute has non numeric element " + e + ". Make sure that all elements are numbers.");
		}) : V.warn(ha(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a array of numbers.")), e;
	};
}
function Sa() {
	if (B.isUnminified) return function(e, t) {
		return e !== !0 && e !== !1 && V.warn(ha(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a boolean."), e;
	};
}
function Ca(e) {
	if (B.isUnminified) return function(t, n) {
		return t == null || V.isObject(t) || V.warn(ha(t) + " is a not valid value for \"" + n + "\" attribute. The value should be an object with properties " + e), t;
	};
}
var W = o((() => {
	ci(), Ri();
})), wa, Ta, G, K = o((() => {
	Ri(), W(), wa = "get", Ta = "set", G = {
		addGetterSetter(e, t, n, r, i) {
			G.addGetter(e, t, n), G.addSetter(e, t, r, i), G.addOverloadedGetterSetter(e, t);
		},
		addGetter(e, t, n) {
			let r = wa + V._capitalize(t), i = Array.isArray(n), a = function() {
				let e = this.attrs[t];
				return e === void 0 ? i ? n.slice() : n : e;
			};
			a._def = n, e.prototype[r] = e.prototype[r] || a;
		},
		addSetter(e, t, n, r) {
			let i = Ta + V._capitalize(t);
			e.prototype[i] || G.overWriteSetter(e, t, n, r);
		},
		overWriteSetter(e, t, n, r) {
			let i = Ta + V._capitalize(t);
			e.prototype[i] = function(e) {
				return n && e != null && (e = n.call(this, e, t)), this._setAttr(t, e), r && r.call(this), this;
			};
		},
		addComponentsGetterSetter(e, t, n, r, i) {
			let a = n.length, o = V._capitalize, s = wa + o(t), c = Ta + o(t), l = n.map((e) => t + o(e)), u = l.map((e) => wa + o(e));
			e.prototype[s] = function() {
				let e = {};
				for (let t = 0; t < a; t++) {
					let r = this[u[t]];
					e[n[t]] = r ? r.call(this) : this.attrs[l[t]];
				}
				return e;
			};
			let d = Ca(n);
			e.prototype[c] = function(e) {
				let a = this[s]();
				r && (e = r.call(this, e, t)), d && d.call(this, e, t);
				for (let n in e) e.hasOwnProperty(n) && this._setAttr(t + o(n), e[n]);
				return e || n.forEach((e) => {
					this._setAttr(t + o(e), void 0);
				}), this._fireChangeEvent(t, a, e), i && i.call(this), this;
			}, G.addOverloadedGetterSetter(e, t);
		},
		addOverloadedGetterSetter(e, t) {
			let n = V._capitalize(t), r = Ta + n, i = wa + n, a = function() {
				return arguments.length ? (this[r](arguments[0]), this) : this[i]();
			};
			e.prototype[t] = a;
		},
		backCompat(e, t) {
			V.each(t, function(t, n) {
				let r = e.prototype[n], i = wa + V._capitalize(t), a = Ta + V._capitalize(t);
				function o() {
					return V.error("\"" + t + "\" method is deprecated and will be removed soon. Use \"\"" + n + "\" instead."), r.apply(this, arguments);
				}
				e.prototype[t] = o, e.prototype[i] = o, e.prototype[a] = o;
			});
		},
		afterSetFilter() {
			this._filterUpToDate = !1;
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/Node.js
function Ea(e) {
	let t = [], n = /(\w+)\(([^)]*)\)/g, r;
	for (; (r = n.exec(e)) !== null;) {
		let [, e, n] = r;
		if (![
			"blur",
			"brightness",
			"contrast",
			"grayscale",
			"sepia",
			"invert"
		].includes(e)) {
			V.warn(`CSS filter "${e}" is not supported in fallback mode. Consider using function filters for better compatibility.`);
			continue;
		}
		let i = n.trim() === "" ? e === "blur" ? 0 : 1 : parseFloat(n) / (n.includes("%") ? 100 : 1);
		t.push({
			name: e,
			value: i
		});
	}
	return function(e, n = 1) {
		for (let { name: r, value: i } of t) {
			if ([
				"grayscale",
				"sepia",
				"invert"
			].includes(r)) {
				let t = Math.min(1, Math.max(0, i)), n = e.data;
				for (let e = 0; e < n.length; e += 4) {
					let i = n[e], a = n[e + 1], o = n[e + 2], s, c, l;
					r === "grayscale" ? s = c = l = .2126 * i + .7152 * a + .0722 * o : r === "sepia" ? (s = .393 * i + .769 * a + .189 * o, c = .349 * i + .686 * a + .168 * o, l = .272 * i + .534 * a + .131 * o) : (s = 255 - i, c = 255 - a, l = 255 - o), n[e] = i + (s - i) * t, n[e + 1] = a + (c - a) * t, n[e + 2] = o + (l - o) * t;
				}
				continue;
			}
			let t = B.Filters?.[V._capitalize(r)];
			if (!t) continue;
			let a = Object.create(this);
			a.attrs = { ...this.attrs }, r === "blur" && (a.attrs.blurRadius = i * .5), r === "brightness" && (a.attrs.brightness = i), r === "contrast" && (a.attrs.contrast = 100 * (Math.sqrt(i) - 1)), t.call(a, e, n);
		}
	};
}
var Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, Ia, La, Ra, za, Ba, Va, Ha, q, Ua, Wa = o((() => {
	ia(), ea(), aa(), ma(), K(), ci(), Ri(), W(), Da = "absoluteOpacity", Oa = "absoluteTransform", ka = "Change", Aa = "children", ja = "konva", Ma = "listening", Na = [
		"mouseenter",
		"mouseleave",
		"pointerenter",
		"pointerleave",
		"touchenter",
		"touchleave"
	], Pa = "set", Fa = "Shape", Ia = " ", La = "stage", Ra = "transform", za = "Stage", Ba = "visible", Va = [
		"xChange.konva",
		"yChange.konva",
		"scaleXChange.konva",
		"scaleYChange.konva",
		"skewXChange.konva",
		"skewYChange.konva",
		"rotationChange.konva",
		"offsetXChange.konva",
		"offsetYChange.konva",
		"transformsEnabledChange.konva"
	].join(Ia), Ha = 1, q = class e {
		constructor(e) {
			this._id = Ha++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this.parent = null, this._cache = {}, this._canvasCache = null, this._batchingTransformChange = !1, this._needClearTransformCache = !1, this._filterUpToDate = !1, this._isUnderCache = !1, this._dragEventId = null, this._shouldFireChangeEvents = !1, this.setAttrs(e), this._shouldFireChangeEvents = !0;
		}
		hasChildren() {
			return !1;
		}
		_clearCache(e) {
			(e === Ra || e === Oa) && this._cache[e] ? this._cache[e].dirty = !0 : e ? this._cache[e] = void 0 : (this._cache = {}, this._attrsVersion !== void 0 && this._attrsVersion++);
		}
		_releaseCanvasCache() {
			let e = this._canvasCache;
			e && (V.releaseCanvas(e.scene._canvas, e.filter._canvas, ...e.hit ? [e.hit._canvas] : []), this._canvasCache = null);
		}
		_getCache(e, t) {
			let n = this._cache[e];
			return (n === void 0 || (e === Ra || e === Oa) && n.dirty === !0) && (n = t.call(this), this._cache[e] = n), n;
		}
		_getCanvasCache() {
			return this._canvasCache;
		}
		_clearSelfAndDescendantCache(e) {
			this._clearCache(e), (e === void 0 || e === Oa) && this.fire("absoluteTransformChange");
		}
		static _runAfterAbsTransformCascade(t) {
			e._absTransformCascadeDepth > 0 ? e._pendingAfterCascade.push(t) : t();
		}
		clearCache() {
			return this._releaseCanvasCache(), this._clearSelfAndDescendantCache(), this._requestDraw(), this;
		}
		cache(e) {
			let t = e || {}, n = {};
			if (t.x === void 0 || t.y === void 0 || t.width === void 0 || t.height === void 0) {
				let e = this._isUnderCache;
				this._isUnderCache = !0, n = this.getClientRect({
					skipTransform: !0,
					relativeTo: this.getParent() || void 0
				}), this._isUnderCache = e;
			}
			let r = t.x === void 0 ? Math.floor(n.x) : t.x, i = t.y === void 0 ? Math.floor(n.y) : t.y, a = Math.ceil(t.width || n.x + n.width - r), o = Math.ceil(t.height || n.y + n.height - i), s = t.pixelRatio, c = t.offset || 0, l = t.drawBorder || !1, u = t.hitCanvasPixelRatio || 1;
			if (a <= 0 || o <= 0 || !isFinite(r + i + a + o)) return V.error(`Can not cache the node. Its size is 0 or its bounds are not finite numbers (${r}, ${i}, ${a}x${o}). Caching is skipped.`), this;
			a += c * 2, o += c * 2, r -= c, i -= c;
			let d = new na({
				pixelRatio: s,
				width: a,
				height: o
			}), f = new na({
				pixelRatio: s,
				width: 0,
				height: 0,
				willReadFrequently: !0
			}), p = d.getContext();
			d.isCache = !0, this._releaseCanvasCache(), this._filterUpToDate = !1, t.imageSmoothingEnabled === !1 && (d.getContext()._context.imageSmoothingEnabled = !1, f.getContext()._context.imageSmoothingEnabled = !1), p.save(), p.translate(-r, -i), this._isUnderCache = !0, this._clearSelfAndDescendantCache(Da);
			try {
				this.drawScene(d, this);
			} catch (e) {
				throw V.releaseCanvas(d._canvas), e;
			} finally {
				this._isUnderCache = !1, this._clearSelfAndDescendantCache(Da), p.restore(), d._releaseIsolationCanvas();
			}
			return l && (p.save(), p.beginPath(), p.rect(0, 0, a, o), p.closePath(), p.setAttr("strokeStyle", "red"), p.setAttr("lineWidth", 5), p.stroke(), p.restore()), this._canvasCache = {
				scene: d,
				filter: f,
				hit: null,
				hitConfig: {
					pixelRatio: u,
					width: a,
					height: o
				},
				x: r,
				y: i
			}, this._clearSelfAndDescendantCache(), this._requestDraw(), this;
		}
		_getCachedHitCanvas(e) {
			if (e === this) return null;
			let t = this._getCanvasCache();
			if (!t) return null;
			if (t.hit) return t.hit;
			let n = new ra(t.hitConfig);
			n.isCache = !0;
			let r = n.getContext();
			return r.save(), r.translate(-t.x, -t.y), this.drawHit(n, this), r.restore(), t.hit = n, n;
		}
		isCached() {
			return !!this._canvasCache;
		}
		getClientRect(e) {
			throw Error("abstract \"getClientRect\" method call");
		}
		_getCachedSceneRect(e) {
			let t = e._forDrawing && !this._isUnderCache && this._getCanvasCache();
			if (!t) return;
			let n = {
				x: t.x,
				y: t.y,
				width: t.scene.width / t.scene.pixelRatio,
				height: t.scene.height / t.scene.pixelRatio
			};
			return e.skipTransform ? n : this._transformedRect(n, e.relativeTo);
		}
		_transformedRect(e, t) {
			return this.getAbsoluteTransform(t)._getTransformedRect(e);
		}
		_drawCachedSceneCanvas(e) {
			e.save(), e._applyOpacity(this), e._applyGlobalCompositeOperation(this);
			let t = this._getCanvasCache();
			e.translate(t.x, t.y);
			let n = this._getCachedSceneCanvas(), r = n.pixelRatio;
			e.drawImage(n._canvas, 0, 0, n.width / r, n.height / r), e.restore();
		}
		_drawCachedHitCanvas(e, t) {
			let n = this._getCanvasCache();
			e.save(), e.translate(n.x, n.y), e.drawImage(t._canvas, 0, 0, t.width / t.pixelRatio, t.height / t.pixelRatio), e.restore();
		}
		_getCachedSceneCanvas() {
			let e = this.filters(), t = this._getCanvasCache(), n = t.scene, r = t.filter, i = r.getContext(), a, o, s, c;
			if (!e || e.length === 0) return n;
			if (this._filterUpToDate) return r;
			let l = !0;
			for (let t = 0; t < e.length; t++) if (typeof e[t] != "string" || !Bi()) {
				l = !1;
				break;
			}
			let u = n.pixelRatio;
			if (r.setSizeIfChanged(n._logicalWidth, n._logicalHeight), l) {
				let t = e.join(" ").replace(/url\((?:[^()"']|"[^"]*"|'[^']*')*\)|"[^"]*"|'[^']*'|([-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?)(px|em|rem|ex|ch|cap|ic|lh|rlh|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc)\b/gi, (e, t, n) => t === void 0 ? e : `${Number(t) * u}${n}`);
				return i.clear(), i.save(), i.setAttr("filter", t), i.drawImage(n._canvas, 0, 0, n.getWidth() / u, n.getHeight() / u), i.restore(), this._filterUpToDate = !0, r;
			}
			try {
				for (a = e.length, i.clear(), i.drawImage(n._canvas, 0, 0, n.getWidth() / u, n.getHeight() / u), o = i.getImageData(0, 0, r.getWidth(), r.getHeight()), s = 0; s < a; s++) c = e[s], typeof c == "string" && (c = Ea(c)), c.call(this, o, u);
				i.putImageData(o, 0, 0);
			} catch (e) {
				V.error("Unable to apply filter. " + e.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
			}
			return this._filterUpToDate = !0, r;
		}
		on(...e) {
			this._prepareListeners();
			let t = e[0], n = e[1];
			if (e[2], e.length === 3) return this._delegate.apply(this, e);
			let r = t.split(Ia);
			for (let e = 0; e < r.length; e++) {
				let t = r[e].split("."), i = t[0], a = t[1] || "";
				this.eventListeners[i] || (this.eventListeners[i] = []), this.eventListeners[i].push({
					name: a,
					handler: n
				});
			}
			return this;
		}
		_prepareListeners() {
			this === this.constructor.prototype && (this.hasOwnProperty("eventListeners") || (this.eventListeners = {}), e.protoListenerMap = /* @__PURE__ */ new WeakMap());
		}
		off(e, t) {
			this._prepareListeners();
			let n = (e || "").split(Ia), r = n.length, i, a, o, s, c, l;
			if (!e) for (a in this.eventListeners) this._off(a);
			for (i = 0; i < r; i++) if (o = n[i], s = o.split("."), c = s[0], l = s[1], c) this.eventListeners[c] && this._off(c, l, t);
			else for (a in this.eventListeners) this._off(a, l, t);
			return this;
		}
		dispatchEvent(e) {
			let t = {
				target: this,
				type: e.type,
				evt: e
			};
			return this.fire(e.type, t), this;
		}
		addEventListener(e, t) {
			return this.on(e, function(e) {
				t.call(this, e.evt);
			}), this;
		}
		removeEventListener(e) {
			return this.off(e), this;
		}
		_delegate(e, t, n) {
			let r = this;
			return this.on(e, function(e) {
				let i = e.target.findAncestors(t, !0, r);
				for (let t = 0; t < i.length; t++) e = V.cloneObject(e), e.currentTarget = i[t], n.call(i[t], e);
			}), this;
		}
		remove() {
			return this.isDragging() && this.stopDrag(), H._dragElements.delete(this._id), H._dragElements.forEach((e, t) => {
				this.isAncestorOf(e.node) && H._dragElements.delete(t);
			}), this._remove(), this;
		}
		_clearCaches() {
			this._clearSelfAndDescendantCache(Oa), this._clearSelfAndDescendantCache(Da), this._clearSelfAndDescendantCache(La), this._clearSelfAndDescendantCache(Ba), this._clearSelfAndDescendantCache(Ma);
		}
		_remove() {
			let e = this.getParent();
			e && e.children && (e.children.splice(this.index, 1), e._setChildrenIndices(), this.parent = null), this._clearCaches();
		}
		destroy() {
			return this._fire("destroy", { target: this }), ua(this), this.remove(), this.clearCache(), this;
		}
		getAttr(e) {
			let t = "get" + V._capitalize(e);
			return V._isFunction(this[t]) ? this[t]() : this.attrs[e];
		}
		getAncestors() {
			let e = this.getParent(), t = [];
			for (; e;) t.push(e), e = e.getParent();
			return t;
		}
		getAttrs() {
			return this.attrs || {};
		}
		setAttrs(e) {
			return this._batchTransformChanges(() => {
				let t, n;
				if (!e) return this;
				for (t in e) t !== Aa && (n = Pa + V._capitalize(t), V._isFunction(this[n]) ? this[n](e[t]) : this._setAttr(t, e[t]));
			}), this;
		}
		isListening() {
			return this._getCache(Ma, this._isListening);
		}
		_isListening(e) {
			if (!this.listening()) return !1;
			let t = this.getParent();
			return t && t !== e && this !== e ? t._isListening(e) : !0;
		}
		isVisible() {
			return this._getCache(Ba, this._isVisible);
		}
		_isVisible(e) {
			if (!this.visible()) return !1;
			let t = this.getParent();
			return t && t !== e && this !== e ? t._isVisible(e) : !0;
		}
		shouldDrawHit(e) {
			return e ? this._isVisible(e) && this._isListening(e) : this.isListening() && this.isVisible();
		}
		show() {
			return this.visible(!0), this;
		}
		hide() {
			return this.visible(!1), this;
		}
		getZIndex() {
			return this.index || 0;
		}
		getAbsoluteZIndex() {
			let e = this.getDepth(), t = this, n = 0, r, i, a, o;
			function s(c) {
				for (r = [], i = c.length, a = 0; a < i; a++) o = c[a], n++, o.nodeType !== Fa && (r = r.concat(o.children)), o._id === t._id && (a = i);
				r.length > 0 && r[0].getDepth() <= e && s(r);
			}
			let c = this.getStage();
			return t.nodeType !== za && c && s(c.children), n;
		}
		getDepth() {
			let e = 0, t = this.parent;
			for (; t;) e++, t = t.parent;
			return e;
		}
		_batchTransformChanges(e) {
			if (this._batchingTransformChange) e();
			else {
				this._batchingTransformChange = !0;
				try {
					e();
				} finally {
					this._batchingTransformChange = !1, this._needClearTransformCache && (this._needClearTransformCache = !1, this._clearCache(Ra), this._clearSelfAndDescendantCache(Oa));
				}
			}
		}
		setPosition(e) {
			return this._batchTransformChanges(() => {
				this.x(e.x), this.y(e.y);
			}), this;
		}
		getPosition() {
			return {
				x: this.x(),
				y: this.y()
			};
		}
		getRelativePointerPosition() {
			let e = this.getStage();
			if (!e) return null;
			let t = e.getPointerPosition();
			if (!t) return null;
			let n = this.getAbsoluteTransform().copy();
			return n.invert(), n.point(t);
		}
		getAbsolutePosition(e) {
			let t = this.getAbsoluteTransform(e).getMatrix(), n = new fi(), r = this.offset();
			return n.m = t.slice(), n.translate(r.x, r.y), n.getTranslation();
		}
		setAbsolutePosition(e) {
			let { x: t, y: n, ...r } = this._clearTransform();
			this.attrs.x = t, this.attrs.y = n, this._clearCache(Ra);
			let i = this._getAbsoluteTransform().copy(), a = i.isInvertible();
			i.invert(), i.translate(e.x, e.y);
			let { x: o, y: s } = i.getTranslation();
			return this._setTransform(r), a ? this.setPosition({
				x: this.attrs.x + o,
				y: this.attrs.y + s
			}) : V.warn("Cannot set the absolute position: the absolute transform is not invertible (an ancestor has a zero scale)."), this._clearCache(Ra), this._clearSelfAndDescendantCache(Oa), this;
		}
		_setTransform(e) {
			let t;
			for (t in e) this.attrs[t] = e[t];
		}
		_clearTransform() {
			let e = {
				x: this.x(),
				y: this.y(),
				rotation: this.rotation(),
				scaleX: this.scaleX(),
				scaleY: this.scaleY(),
				offsetX: this.offsetX(),
				offsetY: this.offsetY(),
				skewX: this.skewX(),
				skewY: this.skewY()
			};
			return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, e;
		}
		move(e) {
			let t = e.x, n = e.y, r = this.x(), i = this.y();
			return t !== void 0 && (r += t), n !== void 0 && (i += n), this.setPosition({
				x: r,
				y: i
			}), this;
		}
		rotate(e) {
			return this.rotation(this.rotation() + e), this;
		}
		moveToTop() {
			if (!this.parent) return V.warn("Node has no parent. moveToTop function is ignored."), !1;
			let e = this.index;
			return e < this.parent.children.length - 1 && (this.parent.children.splice(e, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0);
		}
		moveUp() {
			if (!this.parent) return V.warn("Node has no parent. moveUp function is ignored."), !1;
			let e = this.index;
			return e < this.parent.children.length - 1 && (this.parent.children.splice(e, 1), this.parent.children.splice(e + 1, 0, this), this.parent._setChildrenIndices(), !0);
		}
		moveDown() {
			if (!this.parent) return V.warn("Node has no parent. moveDown function is ignored."), !1;
			let e = this.index;
			return e > 0 && (this.parent.children.splice(e, 1), this.parent.children.splice(e - 1, 0, this), this.parent._setChildrenIndices(), !0);
		}
		moveToBottom() {
			if (!this.parent) return V.warn("Node has no parent. moveToBottom function is ignored."), !1;
			let e = this.index;
			return e > 0 && (this.parent.children.splice(e, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0);
		}
		setZIndex(e) {
			if (!this.parent) return V.warn("Node has no parent. zIndex parameter is ignored."), this;
			(e < 0 || e >= this.parent.children.length) && V.warn("Unexpected value " + e + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
			let t = this.index;
			return this.parent.children.splice(t, 1), this.parent.children.splice(e, 0, this), this.parent._setChildrenIndices(), this;
		}
		getAbsoluteOpacity() {
			return this._getCache(Da, this._getAbsoluteOpacity);
		}
		_getAbsoluteOpacity() {
			let e = this.opacity(), t = this.getParent();
			return t && !t._isUnderCache && (e *= t.getAbsoluteOpacity()), e;
		}
		moveTo(e) {
			return this.getParent() !== e && (this._remove(), e.add(this)), this;
		}
		toObject() {
			let e = this.getAttrs(), t, n, r, i = {
				attrs: {},
				className: this.getClassName()
			};
			for (t in e) n = e[t], n instanceof Ai && (n = Array.from(n)), r = V.isObject(n) && !V._isPlainObject(n) && !V._isArray(n), !r && (this["get" + V._capitalize(t)]?._def !== n || t === "brightness" || t === "threshold") && (i.attrs[t] = t === "filters" && V._isArray(n) ? n.filter((e) => typeof e == "string") : V.isObject(n) ? V._prepareToStringify(n) : n);
			return i;
		}
		toJSON() {
			return JSON.stringify(this.toObject());
		}
		getParent() {
			return this.parent;
		}
		findAncestors(e, t, n) {
			let r = [];
			t && this._isMatch(e) && r.push(this);
			let i = this.parent;
			for (; i;) {
				if (i === n) return r;
				i._isMatch(e) && r.push(i), i = i.parent;
			}
			return r;
		}
		isAncestorOf(e) {
			return !1;
		}
		findAncestor(e, t, n) {
			return this.findAncestors(e, t, n)[0];
		}
		_isMatch(e) {
			if (!e) return !1;
			if (typeof e == "function") return e(this);
			let t = e.replace(/ /g, "").split(","), n = t.length, r, i;
			for (r = 0; r < n; r++) if (i = t[r], V.isValidSelector(i) || (V.warn("Selector \"" + i + "\" is invalid. Allowed selectors examples are \"#foo\", \".bar\" or \"Group\"."), V.warn("If you have a custom shape with such className, please change it to start with upper letter like \"Triangle\"."), V.warn("Konva is awesome, right?")), i.charAt(0) === "#") {
				if (this.id() === i.slice(1)) return !0;
			} else if (i.charAt(0) === ".") {
				if (this.hasName(i.slice(1))) return !0;
			} else if (this.className === i || this.nodeType === i) return !0;
			return !1;
		}
		getLayer() {
			let e = this.getParent();
			return e ? e.getLayer() : null;
		}
		getStage() {
			return this._getCache(La, this._getStage);
		}
		_getStage() {
			let e = this.getParent();
			return e ? e.getStage() : null;
		}
		fire(e, t, n) {
			return t = t || {}, t.target = t.target || this, n ? this._fireAndBubble(e, t) : this._fire(e, t), this;
		}
		getAbsoluteTransform(e) {
			return e || this._hasCachedAncestor() ? this._getAbsoluteTransform(e) : this._getCache(Oa, this._getCachedAbsoluteTransform);
		}
		_hasCachedAncestor() {
			let e = this.parent;
			for (; e;) {
				if (e.isCached()) return !0;
				e = e.parent;
			}
			return !1;
		}
		_getAbsoluteTransform(e) {
			let t = new fi();
			return this === e ? t : (this.parent && this.parent !== e && this.parent.getAbsoluteTransform(e).copyInto(t), this._multiplyOwnTransform(t));
		}
		_getCachedAbsoluteTransform() {
			let e = this._cache[Oa] || new fi();
			return this.parent ? this.parent.getAbsoluteTransform().copyInto(e) : e.reset(), this._multiplyOwnTransform(e), e.dirty = !1, e;
		}
		_multiplyOwnTransform(e) {
			let t = this.transformsEnabled();
			if (t === "all") e.multiply(this.getTransform());
			else if (t === "position") {
				let t = this.attrs.x || 0, n = this.attrs.y || 0, r = this.attrs.offsetX || 0, i = this.attrs.offsetY || 0;
				e.translate(t - r, n - i);
			}
			return e;
		}
		getAbsoluteScale(e) {
			let t = this;
			for (; t;) t._isUnderCache && (e = t), t = t.getParent();
			let n = this.getAbsoluteTransform(e).decompose();
			return {
				x: n.scaleX,
				y: n.scaleY
			};
		}
		getAbsoluteRotation() {
			return this.getAbsoluteTransform().decompose().rotation;
		}
		getTransform() {
			return this._getCache(Ra, this._getTransform);
		}
		_getTransform() {
			let e = this._cache[Ra] || new fi();
			e.reset();
			let t = this.x(), n = this.y(), r = B.getAngle(this.rotation()), i = this.attrs.scaleX ?? 1, a = this.attrs.scaleY ?? 1, o = this.attrs.skewX || 0, s = this.attrs.skewY || 0, c = this.attrs.offsetX || 0, l = this.attrs.offsetY || 0;
			return (t !== 0 || n !== 0) && e.translate(t, n), r !== 0 && e.rotate(r), (o !== 0 || s !== 0) && e.skew(o, s), (i !== 1 || a !== 1) && e.scale(i, a), (c !== 0 || l !== 0) && e.translate(-1 * c, -1 * l), e.dirty = !1, e;
		}
		clone(e) {
			let t = V.cloneObject(this.attrs), n, r, i, a, o;
			for (n in e) t[n] = e[n];
			let s = new this.constructor(t);
			for (n in this.eventListeners) for (r = this.eventListeners[n], i = r.length, a = 0; a < i; a++) o = r[a], o.name.indexOf(ja) < 0 && (s.eventListeners[n] || (s.eventListeners[n] = []), s.eventListeners[n].push(o));
			return s;
		}
		_toKonvaCanvas(e) {
			e = e || {};
			let t = e.x === void 0 || e.y === void 0 || !e.width || !e.height ? this.getClientRect() : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			isFinite(t.x + t.y + t.width + t.height) || V.error(`Cannot find the bounds of the node to export, its client rect is ${t.x}, ${t.y}, ${t.width}x${t.height}. Check its position, size and points.`);
			let n = this.getStage(), r = e.x === void 0 ? Math.floor(t.x) : e.x, i = e.y === void 0 ? Math.floor(t.y) : e.y, a = e.pixelRatio || 1, o = new na({
				width: e.width || Math.max(0, Math.ceil(t.x + t.width - r)) || (n ? n.width() : 0),
				height: e.height || Math.max(0, Math.ceil(t.y + t.height - i)) || (n ? n.height() : 0),
				pixelRatio: a
			}), s = o.getContext();
			return e.imageSmoothingEnabled === !1 && (s._context.imageSmoothingEnabled = !1), s.save(), (r || i) && s.translate(-1 * r, -1 * i), this.drawScene(o), s.restore(), o._releaseIsolationCanvas(), o;
		}
		toCanvas(e) {
			return this._toKonvaCanvas(e)._canvas;
		}
		toDataURL(e) {
			e = e || {};
			let t = e.mimeType || null, n = e.quality ?? null, r = this._toKonvaCanvas(e).toDataURL(t, n);
			return e.callback && e.callback(r), r;
		}
		toImage(e) {
			return new Promise((t, n) => {
				try {
					let { callback: r, ...i } = e || {};
					V._urlToImage(this.toDataURL(i), function(e) {
						t(e), r?.(e);
					}, n);
				} catch (e) {
					n(e);
				}
			});
		}
		toBlob(e) {
			return new Promise((t, n) => {
				try {
					this.toCanvas(e).toBlob((r) => {
						var i;
						r ? (t(r), (i = e?.callback) == null || i.call(e, r)) : n(/* @__PURE__ */ Error("Konva: toBlob() failed, the canvas was not encoded"));
					}, e?.mimeType, e?.quality);
				} catch (e) {
					n(e);
				}
			});
		}
		setSize(e) {
			return this.width(e.width), this.height(e.height), this;
		}
		getSize() {
			return {
				width: this.width(),
				height: this.height()
			};
		}
		getClassName() {
			return this.className || this.nodeType;
		}
		getType() {
			return this.nodeType;
		}
		getDragDistance() {
			return this.attrs.dragDistance === void 0 ? this.parent ? this.parent.getDragDistance() : B.dragDistance : this.attrs.dragDistance;
		}
		_off(e, t, n) {
			let r = this.eventListeners[e], i, a, o;
			for (i = 0; i < r.length; i++) if (a = r[i].name, o = r[i].handler, (a !== "konva" || t === "konva") && (!t || a === t) && (!n || n === o)) {
				if (r.splice(i, 1), r.length === 0) {
					delete this.eventListeners[e];
					break;
				}
				i--;
			}
		}
		_fireChangeEvent(e, t, n) {
			this._fire(e + ka, {
				oldVal: t,
				newVal: n
			});
		}
		addName(e) {
			if (!this.hasName(e)) {
				let t = this.name(), n = t ? t + " " + e : e;
				this.name(n);
			}
			return this;
		}
		hasName(e) {
			if (!e) return !1;
			let t = this.name();
			return t ? (t || "").split(/\s/g).indexOf(e) !== -1 : !1;
		}
		removeName(e) {
			let t = (this.name() || "").split(/\s/g), n = t.indexOf(e);
			return n !== -1 && (t.splice(n, 1), this.name(t.join(" "))), this;
		}
		setAttr(e, t) {
			let n = this[Pa + V._capitalize(e)];
			return V._isFunction(n) ? n.call(this, t) : this._setAttr(e, t), this;
		}
		_addSubtreeObserver(t) {
			(this._subtreeObservers ?? (this._subtreeObservers = /* @__PURE__ */ new Set())).add(t), e._subtreeObserverCount++;
		}
		_removeSubtreeObserver(t) {
			this._subtreeObservers?.delete(t) && e._subtreeObserverCount--;
		}
		_notifySubtreeChange() {
			if (e._subtreeObserverCount) for (let e = this; e; e = e.parent) {
				let t = e._subtreeObservers;
				if (t) for (let n of t) n._onSubtreeChange(e);
			}
		}
		_requestDraw() {
			var e;
			(e = this.parent) == null || e._notifySubtreeChange(), B.autoDrawEnabled && (this.getLayer() || this.getStage())?.batchDraw();
		}
		_setAttr(e, t) {
			let n = this.attrs[e];
			(n !== t || V.isObject(t)) && (t == null ? delete this.attrs[e] : this.attrs[e] = t, this._attrsVersion !== void 0 && this._attrsVersion++, this._shouldFireChangeEvents && this._fireChangeEvent(e, n, t), this._requestDraw());
		}
		_fireAndBubble(e, t, n) {
			t && this.nodeType === Fa && (t.target = this);
			let r = Na.indexOf(e) !== -1;
			if (!(r && (n && (this === n || this.isAncestorOf && this.isAncestorOf(n)) || this.nodeType === "Stage" && !n))) {
				this._fire(e, t);
				let i = r && n && n.isAncestorOf && n.isAncestorOf(this) && !n.isAncestorOf(this.parent);
				(t && !t.cancelBubble || !t) && this.parent && this.parent.isListening() && !i && (n && n.parent ? this._fireAndBubble.call(this.parent, e, t, n) : this._fireAndBubble.call(this.parent, e, t));
			}
		}
		_getProtoListeners(t) {
			let n = Object.getPrototypeOf(this), r = e.protoListenerMap.get(n);
			r || (r = {}, e.protoListenerMap.set(n, r));
			let i = r[t];
			if (i === void 0) {
				i = [];
				let e = /* @__PURE__ */ new Set(), n = Object.getPrototypeOf(this);
				for (; n;) {
					let r = n.eventListeners?.[t] ?? [];
					for (let t = 0; t < r.length; t++) {
						let n = r[t];
						e.has(n) || (e.add(n), i.push(n));
					}
					n = Object.getPrototypeOf(n);
				}
				r[t] = i;
			}
			return i;
		}
		_fire(e, t) {
			t = t || {}, t.currentTarget = this, t.type = e;
			let n = this._getProtoListeners(e);
			if (n) for (let e = 0; e < n.length; e++) n[e].handler.call(this, t);
			let r = this.eventListeners[e];
			if (r) {
				let n = r.slice(), i = n.length;
				for (let e = 0; e < n.length; e++) n[e].handler.call(this, t);
				let a = this.eventListeners[e];
				if (a) for (let e = i; e < a.length; e++) a[e].handler.call(this, t);
			}
		}
		draw() {
			return this.drawScene(), this.drawHit(), this;
		}
		_createDragElement(e) {
			let t = e ? e.pointerId : void 0, n = this.getStage(), r = this.getAbsolutePosition();
			if (!n) return;
			let i = n._getPointerById(t) || n._changedPointerPositions[0] || r, a = e?.evt?.type ? V._getEventType(e.evt.type) : n._pointerEventType, o = a !== "pointer";
			H._dragElements.set(this._id, {
				node: this,
				startPointerPos: i,
				offset: {
					x: i.x - r.x,
					y: i.y - r.y
				},
				dragStatus: "ready",
				pointerId: o ? t ?? ("id" in i ? i.id : void 0) : void 0,
				pointerEventType: o ? a : void 0,
				startEvent: e
			});
		}
		startDrag(e, t = !0) {
			var n;
			H._dragElements.has(this._id) || this._createDragElement(e);
			let r = H._dragElements.get(this._id);
			r && (r.dragStatus = "dragging", (n = this.getStage()) == null || n._cancelClick(r.pointerId, r.pointerEventType), this.fire("dragstart", {
				type: "dragstart",
				target: this,
				evt: r.startEvent && r.startEvent.evt || e && e.evt
			}, t));
		}
		_setDragPosition(e, t) {
			let n = this.getStage()._getPointerById(t.pointerId);
			if (!n) return;
			let r = {
				x: n.x - t.offset.x,
				y: n.y - t.offset.y
			}, i = this.dragBoundFunc();
			if (i !== void 0) {
				let t = i.call(this, r, e);
				if (!t) V.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
				else if (!V._isNumber(t.x) || !V._isNumber(t.y)) {
					V.warn(`dragBoundFunc returned a position with a non-finite x or y (${t.x}, ${t.y}). The node was not moved.`);
					return;
				} else r = t;
			}
			let a = t.lastPos;
			(!a || a.x !== r.x || a.y !== r.y) && (this.setAbsolutePosition(r), this._requestDraw()), t.lastPos = r;
		}
		stopDrag(e) {
			let t = H._dragElements.get(this._id);
			t && (t.dragStatus = "stopped", H._endDragBefore(e, void 0, t), H._endDragAfter(e, t));
		}
		setDraggable(e) {
			this._setAttr("draggable", e), this._dragChange();
		}
		isDragging() {
			let e = H._dragElements.get(this._id);
			return e ? e.dragStatus === "dragging" : !1;
		}
		_listenDrag() {
			this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(e) {
				if (!(e.evt.button === void 0 || B.dragButtons.indexOf(e.evt.button) >= 0) || H._dragElements.has(this._id)) return;
				let t = !1;
				H._dragElements.forEach((e) => {
					this.isAncestorOf(e.node) && (t = !0);
				}), t || this._createDragElement(e);
			});
		}
		_dragChange() {
			if (this.attrs.draggable) this._listenDrag();
			else {
				if (this._dragCleanup(), !this.getStage()) return;
				let e = H._dragElements.get(this._id), t = e && e.dragStatus === "dragging", n = e && e.dragStatus === "ready";
				t ? this.stopDrag() : n && H._dragElements.delete(this._id);
			}
		}
		_dragCleanup() {
			this.off("mousedown.konva"), this.off("touchstart.konva");
		}
		isClientRectOnScreen(e = {
			x: 0,
			y: 0
		}) {
			let t = this.getStage();
			if (!t) return !1;
			let n = {
				x: -e.x,
				y: -e.y,
				width: t.width() + 2 * e.x,
				height: t.height() + 2 * e.y
			};
			return V.haveIntersection(n, this.getClientRect());
		}
		static create(e, t) {
			return V._isString(e) && (e = JSON.parse(e)), this._createNode(e, t);
		}
		static _createNode(t, n) {
			let r = e.prototype.getClassName.call(t), i = t.children, a, o, s;
			if (n && (t.attrs.container = n), !B[r]) {
				let e = i ? "Group" : "Shape";
				V.warn("Can not find a node with class name \"" + r + `". Fallback to "${e}".`), r = e;
			}
			let c = B[r];
			if (a = new c(t.attrs), i) for (o = i.length, s = 0; s < o; s++) a.add(e._createNode(i[s]));
			return a;
		}
	}, q._subtreeObserverCount = 0, q._absTransformCascadeDepth = 0, q._pendingAfterCascade = [], q.protoListenerMap = /* @__PURE__ */ new WeakMap(), q.prototype.nodeType = "Node", q.prototype._attrsAffectingSize = [], q.prototype.on(Va, function() {
		this._batchingTransformChange ? this._needClearTransformCache = !0 : (this._clearCache(Ra), this._clearSelfAndDescendantCache(Oa));
	}), q.prototype.on("visibleChange.konva", function() {
		this._clearSelfAndDescendantCache(Ba);
	}), q.prototype.on("listeningChange.konva", function() {
		this._clearSelfAndDescendantCache(Ma);
		for (let e = this.getParent(); e; e = e.getParent()) {
			let t = e._getCanvasCache();
			t?.hit && (V.releaseCanvas(t.hit._canvas), t.hit = null);
		}
	}), q.prototype.on("opacityChange.konva", function() {
		this._clearSelfAndDescendantCache(Da);
	}), Ua = G.addGetterSetter, Ua(q, "zIndex"), Ua(q, "absolutePosition"), Ua(q, "position"), Ua(q, "x", 0, U()), Ua(q, "y", 0, U()), Ua(q, "globalCompositeOperation", "source-over", ya()), Ua(q, "opacity", 1, U()), Ua(q, "name", "", ya()), Ua(q, "id", "", ya()), Ua(q, "rotation", 0, U()), G.addComponentsGetterSetter(q, "scale", ["x", "y"]), Ua(q, "scaleX", 1, U()), Ua(q, "scaleY", 1, U()), G.addComponentsGetterSetter(q, "skew", ["x", "y"]), Ua(q, "skewX", 0, U()), Ua(q, "skewY", 0, U()), G.addComponentsGetterSetter(q, "offset", ["x", "y"]), Ua(q, "offsetX", 0, U()), Ua(q, "offsetY", 0, U()), Ua(q, "dragDistance", void 0, U()), Ua(q, "width", 0, U()), Ua(q, "height", 0, U()), Ua(q, "listening", !0, Sa()), Ua(q, "preventDefault", !0, Sa()), Ua(q, "filters", void 0, function(e) {
		return this._filterUpToDate = !1, e;
	}), Ua(q, "visible", !0, Sa()), Ua(q, "transformsEnabled", "all", ya()), Ua(q, "size"), Ua(q, "dragBoundFunc"), Ua(q, "draggable", !1, Sa()), G.backCompat(q, {
		rotateDeg: "rotate",
		setRotationDeg: "setRotation",
		getRotationDeg: "getRotation"
	});
})), Ga, Ka = o((() => {
	K(), Wa(), W(), Ga = class extends q {
		constructor() {
			super(...arguments), this.children = [];
		}
		getChildren(e) {
			let t = this.children || [];
			return e ? t.filter(e) : t.slice();
		}
		hasChildren() {
			return this.children.length > 0;
		}
		removeChildren() {
			return this.children.forEach((e) => {
				e.parent = null, e.index = 0, e.remove();
			}), this.children = [], this._notifySubtreeChange(), this._requestDraw(), this;
		}
		destroyChildren() {
			return this.children.forEach((e) => {
				e.parent = null, e.index = 0, e.destroy();
			}), this.children = [], this._notifySubtreeChange(), this._requestDraw(), this;
		}
		add(...e) {
			if (e.length === 0) return this;
			if (e.length > 1) {
				for (let t = 0; t < e.length; t++) this.add(e[t]);
				return this;
			}
			let t = e[0];
			return t.getParent() ? (t.moveTo(this), this) : (this._validateAdd(t), t.index = this.children.length, t.parent = this, t._clearCaches(), this.children.push(t), this._fire("add", { child: t }), this._notifySubtreeChange(), this._requestDraw(), this);
		}
		destroy() {
			return this.hasChildren() && this.destroyChildren(), super.destroy(), this;
		}
		find(e) {
			return this._generalFind(e, !1);
		}
		findOne(e) {
			let t = this._generalFind(e, !0);
			return t.length > 0 ? t[0] : void 0;
		}
		_generalFind(e, t) {
			let n = [];
			return this._descendants((r) => {
				let i = r._isMatch(e);
				return i && n.push(r), !!(i && t);
			}), n;
		}
		_descendants(e) {
			let t = !1;
			for (let n of this.children) if (t = e(n), t || n.hasChildren() && (t = n._descendants(e), t)) return !0;
			return !1;
		}
		toObject() {
			let e = q.prototype.toObject.call(this);
			return e.children = [], this.children.forEach((t) => {
				e.children.push(t.toObject());
			}), e;
		}
		isAncestorOf(e) {
			let t = e.getParent();
			for (; t;) {
				if (t._id === this._id) return !0;
				t = t.getParent();
			}
			return !1;
		}
		clone(e) {
			let t = q.prototype.clone.call(this, e);
			return this.children.forEach(function(e) {
				t.add(e.clone());
			}), t;
		}
		getAllIntersections(e) {
			let t = [];
			return this.find("Shape").forEach((n) => {
				n.isVisible() && n.intersects(e) && t.push(n);
			}), t;
		}
		_clearSelfAndDescendantCache(e) {
			var t;
			let n = e === void 0 || e === "absoluteTransform";
			n && q._absTransformCascadeDepth++;
			try {
				if (super._clearSelfAndDescendantCache(e), e === "absoluteTransform" && this.isCached()) return;
				(t = this.children) == null || t.forEach(function(t) {
					t._clearSelfAndDescendantCache(e);
				});
			} finally {
				if (n && --q._absTransformCascadeDepth === 0) {
					let e = q._pendingAfterCascade;
					if (e.length) {
						q._pendingAfterCascade = [];
						for (let t = 0; t < e.length; t++) e[t]();
					}
				}
			}
		}
		_setChildrenIndices() {
			var e;
			(e = this.children) == null || e.forEach(function(e, t) {
				e.index = t;
			}), this._notifySubtreeChange(), this._requestDraw();
		}
		drawScene(e, t) {
			let n = this.getLayer(), r = e || n && n.getCanvas(), i = r && r.getContext(), a = this._getCanvasCache(), o = a && a.scene, s = t === this;
			if (!(t ? this._isVisible(t) : this.isVisible()) && !s) return this;
			if (o) {
				i.save();
				let e = this.getAbsoluteTransform(t).getMatrix();
				i.transform(e[0], e[1], e[2], e[3], e[4], e[5]), this._drawCachedSceneCanvas(i), i.restore();
			} else this._drawChildren("drawScene", r, t);
			return this;
		}
		drawHit(e, t) {
			if (!this.shouldDrawHit(t)) return this;
			let n = this.getLayer(), r = e || n && n.hitCanvas, i = r && r.getContext(), a = this._getCachedHitCanvas(t);
			if (a) {
				i.save();
				let e = this.getAbsoluteTransform(t).getMatrix();
				i.transform(e[0], e[1], e[2], e[3], e[4], e[5]), this._drawCachedHitCanvas(i, a), i.restore();
			} else this._drawChildren("drawHit", r, t);
			return this;
		}
		_drawChildren(e, t, n) {
			let r = t && t.getContext(), i = this.clipWidth(), a = this.clipHeight(), o = this.clipFunc(), s = typeof i == "number" && typeof a == "number" || o, c = n === this;
			if (s) {
				r.save();
				let e = this.getAbsoluteTransform(n), t = e.getMatrix();
				r.transform(t[0], t[1], t[2], t[3], t[4], t[5]), r.beginPath();
				let s;
				if (o) s = o.call(this, r, this);
				else {
					let e = this.clipX(), t = this.clipY();
					r.rect(e || 0, t || 0, i, a);
				}
				r.clip.apply(r, s), t = e.copy().invert().getMatrix(), r.transform(t[0], t[1], t[2], t[3], t[4], t[5]);
			}
			let l = !c && this.globalCompositeOperation() !== "source-over" && e === "drawScene";
			l && (r.save(), r._applyGlobalCompositeOperation(this));
			try {
				this._drawChildNodes(e, t, n);
			} finally {
				l && r.restore(), s && r.restore();
			}
		}
		_drawChildNodes(e, t, n) {
			var r;
			(r = this.children) == null || r.forEach(function(r) {
				r[e](t, n);
			});
		}
		getClientRect(e = {}) {
			var t;
			let n = this._getCachedSceneRect(e);
			if (n) return n;
			let r = e.skipTransform, i = e.relativeTo, [a, o, s, c] = this.getAbsoluteTransform().getMatrix(), l = !r && (e._forDrawing || a * c - o * s === 0), u, d, f, p, m = {
				x: Infinity,
				y: Infinity,
				width: 0,
				height: 0
			}, h = this;
			return (t = this.children) == null || t.forEach(function(t) {
				if (!t.visible()) return;
				let n = t.getClientRect({
					relativeTo: l ? i : h,
					_forDrawing: e._forDrawing,
					skipShadow: e.skipShadow,
					skipStroke: e.skipStroke
				});
				n.width === 0 && n.height === 0 || !isFinite(n.x + n.y + n.width + n.height) || (u === void 0 ? (u = n.x, d = n.y, f = n.x + n.width, p = n.y + n.height) : (u = Math.min(u, n.x), d = Math.min(d, n.y), f = Math.max(f, n.x + n.width), p = Math.max(p, n.y + n.height)));
			}), m = u === void 0 ? {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			} : {
				x: u,
				y: d,
				width: f - u,
				height: p - d
			}, !r && !l ? this._transformedRect(m, i) : m;
		}
	}, G.addComponentsGetterSetter(Ga, "clip", [
		"x",
		"y",
		"width",
		"height"
	]), G.addGetterSetter(Ga, "clipX", void 0, U()), G.addGetterSetter(Ga, "clipY", void 0, U()), G.addGetterSetter(Ga, "clipWidth", void 0, U()), G.addGetterSetter(Ga, "clipHeight", void 0, U()), G.addGetterSetter(Ga, "clipFunc");
}));
//#endregion
//#region node_modules/konva/lib/Stage.js
function qa(e = {}) {
	return (e.clipFunc || e.clipWidth || e.clipHeight) && V.warn("Stage does not support clipping. Please use clip for Layers or Groups."), e;
}
var Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo, so, co, lo, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko = o((() => {
	Ri(), K(), Ka(), ci(), ia(), aa(), ma(), Ja = "Stage", Ya = "string", Xa = "px", Za = "mouseout", Qa = "mouseleave", $a = "mouseover", eo = "mouseenter", to = "mousemove", no = "mousedown", ro = "mouseup", io = "pointermove", ao = "pointerdown", oo = "pointerup", so = "pointercancel", co = "lostpointercapture", lo = "pointerout", uo = "pointerleave", fo = "pointerover", po = "pointerenter", mo = "contextmenu", ho = "touchstart", go = "touchend", _o = "touchmove", vo = "touchcancel", yo = "wheel", bo = 5, xo = [
		[eo, "_pointerenter"],
		[no, "_pointerdown"],
		[to, "_pointermove"],
		[ro, "_pointerup"],
		[Qa, "_pointerleave"],
		[ho, "_pointerdown"],
		[_o, "_pointermove"],
		[go, "_pointerup"],
		[vo, "_pointercancel"],
		[$a, "_pointerover"],
		[yo, "_wheel"],
		[mo, "_contextmenu"],
		[ao, "_pointerdown"],
		[io, "_pointermove"],
		[oo, "_pointerup"],
		[so, "_pointercancel"],
		[uo, "_pointerleave"],
		[co, "_lostpointercapture"]
	], So = {
		mouse: {
			[lo]: Za,
			[uo]: Qa,
			[fo]: $a,
			[po]: eo,
			[io]: to,
			[ao]: no,
			[oo]: ro,
			[so]: "mousecancel",
			pointerclick: "click",
			pointerdblclick: "dblclick"
		},
		touch: {
			[lo]: "touchout",
			[uo]: "touchleave",
			[fo]: "touchover",
			[po]: "touchenter",
			[io]: _o,
			[ao]: ho,
			[oo]: go,
			[so]: vo,
			pointerclick: "tap",
			pointerdblclick: "dbltap"
		},
		pointer: {
			[lo]: lo,
			[uo]: uo,
			[fo]: fo,
			[po]: po,
			[io]: io,
			[ao]: ao,
			[oo]: oo,
			[so]: so,
			pointerclick: "pointerclick",
			pointerdblclick: "pointerdblclick"
		}
	}, Co = (e) => {
		let t = V._getEventType(e);
		if (t === "pointer") return B.pointerEventsEnabled && So.pointer;
		if (t === "touch") return So.touch;
		if (t === "mouse") return So.mouse;
	}, wo = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);", To = [], Eo = /* @__PURE__ */ new WeakSet(), Do = (e) => {
		e && !Eo.has(e) && (Eo.add(e), H._listenToWindow(e), e.document.addEventListener("visibilitychange", () => {
			To.forEach((e) => {
				e.batchDraw();
			});
		}));
	}, Oo = class extends Ga {
		constructor(e) {
			super(qa(e)), this._pointerPositions = [], this._changedPointerPositions = [], this._pointerStates = /* @__PURE__ */ new Map(), this._lastClicks = {}, this._buildDOM(), this._bindContentEvents(), To.push(this), this.on("widthChange.konva heightChange.konva", this._resizeDOM), this.on("visibleChange.konva", this._checkVisibility), this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
				qa(this.attrs);
			}), this._checkVisibility();
		}
		_validateAdd(e) {
			let t = e.getType() === "Layer", n = e.getType() === "FastLayer";
			t || n || V.throw("You may only add layers to the stage.");
		}
		_checkVisibility() {
			if (!this.content) return;
			let e = this.visible() ? "" : "none";
			this.content.style.display = e;
		}
		_getOwnerWindow() {
			return (this.content || this.container())?.ownerDocument?.defaultView || (B.isBrowser ? window : null);
		}
		setContainer(e) {
			if (typeof e === Ya) {
				let t;
				if (e.charAt(0) === ".") {
					let t = e.slice(1);
					e = document.getElementsByClassName(t)[0];
				} else t = e.charAt(0) === "#" ? e.slice(1) : e, e = document.getElementById(t);
				if (!e) throw "Can not find container in document with id " + t;
			}
			return this._setAttr("container", e), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), e.appendChild(this.content), Do(this._getOwnerWindow())), this;
		}
		shouldDrawHit() {
			return !0;
		}
		clear() {
			let e = this.children, t = e.length;
			for (let n = 0; n < t; n++) e[n].clear();
			return this;
		}
		clone(e) {
			return e || (e = {}), e.container = typeof document < "u" && document.createElement("div"), Ga.prototype.clone.call(this, e);
		}
		destroy() {
			var e;
			super.destroy(), this._pointerStates.clear(), this._lastClicks = {};
			let t = this.content;
			(e = t?.parentNode) == null || e.removeChild(t);
			let n = To.indexOf(this);
			return n > -1 && To.splice(n, 1), V.releaseCanvas(this.bufferHitCanvas._canvas), this;
		}
		getPointerPosition() {
			let e = this._pointerPositions[0] || this._changedPointerPositions[0];
			return e ? {
				x: e.x,
				y: e.y
			} : (V.warn(wo), null);
		}
		_getPointerById(e) {
			return this._pointerPositions.find((t) => t.id === e);
		}
		getPointersPositions() {
			return this._pointerPositions;
		}
		getStage() {
			return this;
		}
		getContent() {
			return this.content;
		}
		_toKonvaCanvas(e) {
			e = { ...e }, e.x = e.x || 0, e.y = e.y || 0, e.width = e.width || this.width(), e.height = e.height || this.height();
			let t = new na({
				width: e.width,
				height: e.height,
				pixelRatio: e.pixelRatio || 1
			}), n = t.getContext()._context, r = this.children;
			return (e.x || e.y) && n.translate(-1 * e.x, -1 * e.y), r.forEach(function(t) {
				if (!t.isVisible()) return;
				let r = t._toKonvaCanvas(e);
				n.drawImage(r._canvas, e.x, e.y, r.getWidth() / r.getPixelRatio(), r.getHeight() / r.getPixelRatio()), V.releaseCanvas(r._canvas);
			}), t;
		}
		getIntersection(e) {
			if (!e) return null;
			let t = this.children, n = t.length - 1;
			for (let r = n; r >= 0; r--) {
				let n = t[r].getIntersection(e);
				if (n) return n;
			}
			return null;
		}
		_resizeDOM() {
			let e = this.width(), t = this.height();
			this.content && (this.content.style.width = e + Xa, this.content.style.height = t + Xa), this.children.forEach((n) => {
				n._setSize({
					width: e,
					height: t
				}), n.draw();
			});
		}
		add(e, ...t) {
			if (arguments.length > 1) {
				for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
				return this;
			}
			super.add(e);
			let n = this.children.length;
			return n > bo && V.warn("The stage has " + n + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), e._setSize({
				width: this.width(),
				height: this.height()
			}), e.draw(), B.isBrowser && this.content.appendChild(e.canvas._canvas), this;
		}
		getParent() {
			return null;
		}
		getLayer() {
			return null;
		}
		hasPointerCapture(e) {
			return ca(e, this);
		}
		setPointerCapture(e) {
			la(e, this);
		}
		releaseCapture(e) {
			da(e, this);
		}
		getLayers() {
			return this.getChildren();
		}
		_bindContentEvents() {
			B.isBrowser && xo.forEach(([e, t]) => {
				this.content.addEventListener(e, (e) => {
					this._batchEvents(() => this[t](e));
				}, { passive: !1 });
			});
		}
		_batchEvents(e) {
			V._batchEvents(this.eventBatchFunc(), e);
		}
		_pointerenter(e) {
			this.setPointersPositions(e);
			let t = Co(e.type);
			t && this._fire(t.pointerenter, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_pointerover(e) {
			this.setPointersPositions(e);
			let t = Co(e.type);
			t && this._fire(t.pointerover, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_pointerEventsEnabled() {
			if (B.hitOnDragEnabled) return !0;
			for (let { node: e, dragStatus: t } of H._dragElements.values()) if (t === "dragging" && e.getStage() === this) return !1;
			return !this.getLayers().some((e) => B.Transformer?._isLayerTransforming(e));
		}
		_cancelClick(e, t) {
			let n = t ? [t] : [
				"mouse",
				"touch",
				"pointer"
			];
			for (let t of n) {
				let n = this._pointerStates.get(`${t}:${e}`);
				n && (n.clickStartShape = void 0, n.relatedPointer && (n.relatedPointer.clickStartShape = void 0));
			}
		}
		_pointerleave(e) {
			let t = Co(e.type), n = V._getEventType(e.type);
			if (!t) return;
			this.setPointersPositions(e);
			let r = this._changedPointerPositions[0]?.id, i = `${n}:${r}`, a = this._pointerStates.get(i), o = (a?.targetShape)?.getStage() === this ? a.targetShape : void 0, s = this._pointerEventsEnabled() || e.pointerType === "touch" && !a?.downPosition;
			s && (a?.clickStartShape === void 0 ? this._pointerStates.delete(i) : a.targetShape = void 0), o && s ? (o._fireAndBubble(t.pointerout, {
				evt: e,
				pointerId: r
			}), o._fireAndBubble(t.pointerleave, {
				evt: e,
				pointerId: r
			}), this._fire(t.pointerleave, {
				evt: e,
				target: this,
				currentTarget: this
			})) : s && (this._fire(t.pointerleave, {
				evt: e,
				target: this,
				currentTarget: this
			}), this._fire(t.pointerout, {
				evt: e,
				target: this,
				currentTarget: this
			})), this.pointerPos = null, this._pointerPositions = [], this._changedPointerPositions = [], this._pointerEventType = void 0;
		}
		_pointerdown(e) {
			let t = Co(e.type), n = V._getEventType(e.type);
			if (!t) return;
			this.setPointersPositions(e);
			let r = !1;
			this._changedPointerPositions.forEach((i) => {
				let a = this.getIntersection(i), o = `${n}:${i.id}`, s = {
					targetShape: this._pointerStates.get(o)?.targetShape,
					clickStartShape: a && a.isListening() ? a : null,
					lastClick: this._lastClicks[n],
					downPosition: i,
					pointerType: e.pointerType
				};
				if (this._pointerStates.delete(o), n !== "pointer") {
					for (let [e, t] of [...this._pointerStates].reverse()) if (!(!e.startsWith("pointer:") || !t.downPosition || n === "touch" && t.relatedPointer) && (n === "mouse" ? t.pointerType !== "touch" : t.pointerType === "touch" && t.downPosition.x === i.x && t.downPosition.y === i.y)) {
						s.relatedPointer = t, t.relatedPointer = s, t.clickStartShape === void 0 && (s.clickStartShape = void 0);
						break;
					}
				}
				this._pointerStates.set(o, s);
				for (let e of H._dragElements.values()) e.dragStatus === "dragging" && (e.pointerId === void 0 || e.pointerEventType === n && e.pointerId === i.id || e.pointerEventType === "mouse" && n === "pointer" && s.pointerType !== "touch") && e.node.getStage() === this && (e.pointerId === void 0 && n !== "pointer" && (e.pointerId = i.id, e.pointerEventType = n), this._cancelClick(i.id, n));
				if (!a || !a.isListening()) return;
				B.capturePointerEventsEnabled && a.setPointerCapture(i.id), a._fireAndBubble(t.pointerdown, {
					evt: e,
					pointerId: i.id
				}), r = !0;
				let c = e.type.indexOf("touch") >= 0;
				a.preventDefault() && e.cancelable && c && e.preventDefault();
			}), r || this._fire(t.pointerdown, {
				evt: e,
				target: this,
				currentTarget: this,
				pointerId: this._changedPointerPositions[0].id
			});
		}
		_pointermove(e) {
			let t = Co(e.type), n = V._getEventType(e.type);
			if (!t) return;
			let r = e.type.indexOf("touch") >= 0 || e.pointerType === "touch";
			if (e.cancelable && r) {
				for (let { node: t, dragStatus: n } of H._dragElements.values()) if (n === "dragging" && t.getStage() === this && t.preventDefault()) {
					e.preventDefault();
					break;
				}
			}
			if (this.setPointersPositions(e), !this._pointerEventsEnabled()) return;
			let i = {}, a = !1;
			this._changedPointerPositions.forEach((r) => {
				let o = `${n}:${r.id}`, s = this._pointerStates.get(o);
				s || (s = {}, this._pointerStates.set(o, s));
				let c = oa(r.id) || this.getIntersection(r), l = s.targetShape === c || s.targetShape?.getStage() === this ? s.targetShape : void 0, u = r.id, d = {
					evt: e,
					pointerId: u
				}, f = l !== c;
				s.targetShape = c && c.isListening() ? c : void 0, f && l && (l._fireAndBubble(t.pointerout, { ...d }, c), l._fireAndBubble(t.pointerleave, { ...d }, c)), c && c.isListening() ? (a = !0, f && (c._fireAndBubble(t.pointerover, { ...d }, l), c._fireAndBubble(t.pointerenter, { ...d }, l)), i[c._id] || (i[c._id] = !0, c._fireAndBubble(t.pointermove, { ...d }))) : l && this._fire(t.pointerover, {
					evt: e,
					target: this,
					currentTarget: this,
					pointerId: u
				});
			}), a || this._fire(t.pointermove, {
				evt: e,
				target: this,
				currentTarget: this,
				pointerId: this._changedPointerPositions[0].id
			});
		}
		_pointerup(e) {
			let t = Co(e.type), n = V._getEventType(e.type);
			if (!t) return;
			this.setPointersPositions(e);
			let r = {}, i = !1;
			this._changedPointerPositions.forEach((a) => {
				let o = `${n}:${a.id}`, s = this._pointerStates.get(o), c = s?.clickStartShape !== void 0, l = s?.clickStartShape;
				s?.targetShape && n !== "touch" ? this._pointerStates.set(o, { targetShape: s.targetShape }) : this._pointerStates.delete(o);
				let u = oa(a.id) || this.getIntersection(a), d = u && r[u._id];
				u && (u.releaseCapture(a.id), r[u._id] = !0);
				let f = a.id, p = {
					evt: e,
					pointerId: f
				}, m = u && u.isListening() ? u : null, h = this._lastClicks[n], g = c && (!m || l === m), _ = g && h && s?.lastClick === h && h.shape === m && Date.now() - h.time < B.dblClickWindow;
				g && (this._lastClicks[n] = _ ? void 0 : {
					shape: m,
					time: Date.now()
				}), u && u.isListening() ? (i = !0, d || u._fireAndBubble(t.pointerup, { ...p }), c && l === u && (u._fireAndBubble(t.pointerclick, { ...p }), _ && u._fireAndBubble(t.pointerdblclick, { ...p }))) : (i || (this._fire(t.pointerup, {
					evt: e,
					target: this,
					currentTarget: this,
					pointerId: this._changedPointerPositions[0].id
				}), i = !0), c && this._fire(t.pointerclick, {
					evt: e,
					target: this,
					currentTarget: this,
					pointerId: f
				}), _ && this._fire(t.pointerdblclick, {
					evt: e,
					target: this,
					currentTarget: this,
					pointerId: f
				})), n === "touch" && (s?.targetShape)?.getStage() === this && (s.targetShape._fireAndBubble(t.pointerout, { ...p }), s.targetShape._fireAndBubble(t.pointerleave, { ...p }));
			}), i || this._fire(t.pointerup, {
				evt: e,
				target: this,
				currentTarget: this,
				pointerId: this._changedPointerPositions[0].id
			}), e.cancelable && n !== "touch" && n !== "pointer" && e.preventDefault();
		}
		_contextmenu(e) {
			this.setPointersPositions(e);
			let t = this.getIntersection(this.getPointerPosition());
			t && t.isListening() ? t._fireAndBubble(mo, { evt: e }) : this._fire(mo, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_wheel(e) {
			this.setPointersPositions(e);
			let t = this.getIntersection(this.getPointerPosition());
			t && t.isListening() ? t._fireAndBubble(yo, { evt: e }) : this._fire(yo, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_pointercancel(e) {
			this.setPointersPositions(e);
			let t = Co(e.type);
			this._changedPointerPositions.forEach((n) => {
				let r = V._getEventType(e.type), i = `${r}:${n.id}`;
				this._cancelClick(n.id, r);
				let a = this._pointerStates.get(i)?.targetShape;
				a && r !== "touch" ? this._pointerStates.set(i, { targetShape: a }) : this._pointerStates.delete(i);
				let o = oa(n.id) || this.getIntersection(n), s = {
					evt: e,
					pointerId: n.id
				};
				o ? (t && o._fireAndBubble(t.pointercancel, { ...s }), o._fireAndBubble(oo, { ...s })) : t && this._fire(t.pointercancel, {
					...s,
					target: this,
					currentTarget: this
				}), da(n.id), t && r === "touch" && a?.getStage() === this && (a._fireAndBubble(t.pointerout, { ...s }), a._fireAndBubble(t.pointerleave, { ...s }));
			});
		}
		_lostpointercapture(e) {
			oa(e.pointerId, this) && da(e.pointerId);
		}
		setPointersPositions(e) {
			let t = this._getContentPosition(), n = null, r = null;
			e = e || window.event, e.touches === void 0 ? (this._pointerEventType = e.pointerId === void 0 ? "mouse" : "pointer", n = (e.clientX - t.left) / t.scaleX, r = (e.clientY - t.top) / t.scaleY, this.pointerPos = {
				x: n,
				y: r
			}, this._pointerPositions = [{
				x: n,
				y: r,
				id: V._getFirstPointerId(e)
			}], this._changedPointerPositions = [{
				x: n,
				y: r,
				id: V._getFirstPointerId(e)
			}]) : (this._pointerEventType = "touch", this._pointerPositions = [], this._changedPointerPositions = [], Array.prototype.forEach.call(e.touches, (e) => {
				this._pointerPositions.push({
					id: e.identifier,
					x: (e.clientX - t.left) / t.scaleX,
					y: (e.clientY - t.top) / t.scaleY
				});
			}), Array.prototype.forEach.call(e.changedTouches || e.touches, (e) => {
				this._changedPointerPositions.push({
					id: e.identifier,
					x: (e.clientX - t.left) / t.scaleX,
					y: (e.clientY - t.top) / t.scaleY
				});
			}));
		}
		_setPointerPosition(e) {
			V.warn("Method _setPointerPosition is deprecated. Use \"stage.setPointersPositions(event)\" instead."), this.setPointersPositions(e);
		}
		_getContentPosition() {
			if (!this.content || !this.content.getBoundingClientRect) return {
				top: 0,
				left: 0,
				scaleX: 1,
				scaleY: 1
			};
			let e = this.content.getBoundingClientRect();
			return {
				top: e.top,
				left: e.left,
				scaleX: e.width / this.content.clientWidth || 1,
				scaleY: e.height / this.content.clientHeight || 1
			};
		}
		_buildDOM() {
			if (this.bufferHitCanvas = new ra({
				pixelRatio: 1,
				width: 0,
				height: 0
			}), !B.isBrowser) return;
			let e = this.container();
			if (!e) throw "Stage has no container. A container is required.";
			e.innerHTML = "", this.content = e.ownerDocument.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), e.appendChild(this.content), Do(this._getOwnerWindow()), this._resizeDOM();
		}
		cache() {
			return V.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this;
		}
		clearCache() {
			return this;
		}
		batchDraw() {
			var e;
			return (e = this.children) == null || e.forEach(function(e) {
				e.batchDraw();
			}), this;
		}
	}, Oo.prototype.nodeType = Ja, si(Oo), G.addGetterSetter(Oo, "container"), G.addGetterSetter(Oo, "eventBatchFunc");
}));
//#endregion
//#region node_modules/konva/lib/Shape.js
function Ao() {
	return qo || (qo = V.createCanvasElement().getContext("2d"), qo);
}
function jo(e) {
	let t = this.attrs.fillRule;
	t ? e.fill(t) : e.fill();
}
function Mo(e) {
	e.stroke();
}
function No() {
	this._clearCache(Bo);
}
function Po() {
	this._clearCache(Vo);
}
function Fo() {
	this._clearCache(Ho);
}
function Io() {
	this._clearCache(Uo);
}
function Lo() {
	this._clearCache(Wo);
}
function Ro() {
	this._clearCache(Go);
}
function zo() {
	this._clearCache(Ko);
}
var Bo, Vo, Ho, Uo, Wo, Go, Ko, qo, Jo, J, Yo = o((() => {
	ci(), Ri(), K(), Wa(), W(), ma(), Bo = "hasShadow", Vo = "hasFill", Ho = "hasStroke", Uo = "shadowRGBA", Wo = "patternImage", Go = "linearGradient", Ko = "radialGradient", Jo = {}, J = class e extends q {
		constructor(e) {
			super(e);
			let t, n = 0;
			for (; t = V.getHitColor(), !t || t in Jo;) if (n++, n >= 1e4) {
				V.warn("Failed to find a unique color key for a shape. Konva may work incorrectly. Most likely your browser is using canvas farbling. Consider disabling it."), t = V.getRandomColor();
				break;
			}
			this.colorKey = t, Jo[t] = this;
		}
		getContext() {
			return V.warn("shape.getContext() method is deprecated. Please do not use it."), this.getLayer().getContext();
		}
		getCanvas() {
			return V.warn("shape.getCanvas() method is deprecated. Please do not use it."), this.getLayer().getCanvas();
		}
		getSceneFunc() {
			return this.attrs.sceneFunc || this._sceneFunc;
		}
		getHitFunc() {
			return this.attrs.hitFunc || this._hitFunc;
		}
		hasShadow() {
			return this._getCache(Bo, this._hasShadow);
		}
		_hasShadow() {
			return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
		}
		_getFillPattern() {
			return this._getCache(Wo, this.__getFillPattern);
		}
		__getFillPattern() {
			if (this.fillPatternImage()) {
				let e = Ao().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
				if (e && e.setTransform) {
					let t = new fi();
					t.translate(this.fillPatternX(), this.fillPatternY()), t.rotate(B.getAngle(this.fillPatternRotation())), t.scale(this.fillPatternScaleX(), this.fillPatternScaleY()), t.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
					let n = t.getMatrix(), r = typeof DOMMatrix > "u" ? {
						a: n[0],
						b: n[1],
						c: n[2],
						d: n[3],
						e: n[4],
						f: n[5]
					} : new DOMMatrix(n);
					e.setTransform(r);
				}
				return e;
			}
		}
		_getLinearGradient() {
			return this._getCache(Go, this.__getLinearGradient);
		}
		__getLinearGradient() {
			let e = this.fillLinearGradientColorStops();
			if (e) {
				let t = Ao(), n = this.fillLinearGradientStartPoint(), r = this.fillLinearGradientEndPoint(), i = t.createLinearGradient(n.x, n.y, r.x, r.y);
				for (let t = 0; t < e.length; t += 2) i.addColorStop(e[t], e[t + 1]);
				return i;
			}
		}
		_getRadialGradient() {
			return this._getCache(Ko, this.__getRadialGradient);
		}
		__getRadialGradient() {
			let e = this.fillRadialGradientColorStops();
			if (e) {
				let t = Ao(), n = this.fillRadialGradientStartPoint(), r = this.fillRadialGradientEndPoint(), i = t.createRadialGradient(n.x, n.y, this.fillRadialGradientStartRadius(), r.x, r.y, this.fillRadialGradientEndRadius());
				for (let t = 0; t < e.length; t += 2) i.addColorStop(e[t], e[t + 1]);
				return i;
			}
		}
		getShadowRGBA() {
			return this._getCache(Uo, this._getShadowRGBA);
		}
		_getShadowRGBA() {
			if (!this.hasShadow()) return;
			let e = V.colorToRGBA(this.shadowColor());
			if (e) return "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a * (this.shadowOpacity() || 1) + ")";
		}
		hasFill() {
			return this._getCache(Vo, this._hasFill);
		}
		_hasFill() {
			return this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops());
		}
		hasStroke() {
			return this._getCache(Ho, this._hasStroke);
		}
		_hasStroke() {
			return this.strokeEnabled() && !!(this.strokeWidth() && (this.stroke() || this.strokeLinearGradientColorStops()));
		}
		hasHitStroke() {
			let e = this.hitStrokeWidth();
			return e === "auto" ? this.hasStroke() : this.strokeEnabled() && !!e;
		}
		intersects(e) {
			let t = this.getStage();
			if (!t) return !1;
			let n = t.bufferHitCanvas;
			return n.setSizeIfChanged(t.width(), t.height()), n.getContext().clear(), this.drawHit(n), n.context.getImageData(Math.floor(e.x), Math.floor(e.y), 1, 1).data[3] > 0;
		}
		destroy() {
			return q.prototype.destroy.call(this), delete Jo[this.colorKey], delete this.colorKey, this;
		}
		_useBufferCanvas(e, t = this.getAbsoluteOpacity()) {
			if (!(this.attrs.perfectDrawEnabled ?? !0)) return !1;
			let n = e || this.hasFill(), r = this.hasStroke(), i = !this._isUnderCache && t !== 1;
			if (n && r && i) return !0;
			let a = this.hasShadow(), o = this.shadowForStrokeEnabled();
			return !!(n && r && a && o);
		}
		setStrokeHitEnabled(e) {
			V.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), e ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0);
		}
		getStrokeHitEnabled() {
			return this.hitStrokeWidth() !== 0;
		}
		getSelfRect() {
			let e = this.attrs.selfRectFunc;
			if (e) return { ...e.call(this, this) };
			let t = this.size();
			return {
				x: this._centroid ? -t.width / 2 : 0,
				y: this._centroid ? -t.height / 2 : 0,
				width: t.width,
				height: t.height
			};
		}
		_getSelfRectForDrawing() {
			return this.getSelfRect();
		}
		getClientRect(e = {}) {
			let t = this._getCachedSceneRect(e);
			if (t) return t;
			let n = e.skipTransform, r = e.relativeTo, i = e._forDrawing, a = i ? this._getSelfRectForDrawing() : this.getSelfRect();
			i && !this.strokeScaleEnabled() ? a = this._transformedRect(a, r) : (a.width < 0 || a.height < 0) && (a = new fi()._getTransformedRect(a));
			let o = !e.skipStroke && this.hasStroke() ? i ? this._getStrokePadding() * 2 : this.strokeWidth() : 0, s = o, c = o, l;
			if (!i && o && !this.strokeScaleEnabled()) {
				let e = this;
				for (; e && !e.isCached() && !e._isUnderCache;) e = e.parent;
				let [t, i, a, o] = this.getAbsoluteTransform(e).getMatrix(), u = Math.abs(t * o - i * a);
				if (u) s *= Math.hypot(a, o) / u, c *= Math.hypot(t, i) / u;
				else if (!n && (s = c = 0, l = e ? e.getAbsoluteTransform().copy() : new fi(), r)) {
					let e = r.getAbsoluteTransform(), [t, n, i, a] = e.getMatrix();
					l = t * a - n * i ? e.copy().invert().multiply(l) : new fi();
				}
			}
			let u = {
				x: a.x - s / 2,
				y: a.y - c / 2,
				width: a.width + s,
				height: a.height + c
			};
			if (i && this.strokeScaleEnabled() && (u = this._transformedRect(u, r)), !e.skipShadow && this.hasShadow()) {
				let e = i ? this.getAbsoluteScale() : {
					x: 1,
					y: 1
				}, t = this.shadowOffsetX() * e.x, n = this.shadowOffsetY() * e.y, r = this.shadowBlur() * (i ? 2 * Math.min(Math.abs(e.x), Math.abs(e.y)) : 1);
				u.x += Math.min(0, t) - r, u.y += Math.min(0, n) - r, u.width += Math.abs(t) + r * 2, u.height += Math.abs(n) + r * 2;
			}
			if (i) return u;
			if (!n) {
				let e = this._transformedRect(u, r);
				if (l) {
					let [t, n, r, i] = l.getMatrix(), a = o * Math.hypot(t, r) / 2, s = o * Math.hypot(n, i) / 2;
					e.x -= a, e.y -= s, e.width += a * 2, e.height += s * 2;
				}
				return e;
			}
			return u;
		}
		_getStrokePadding(e = this.miterLimit() || 10) {
			return this.attrs.sceneFunc && (e = this.miterLimit() || 10), Math.abs(this.strokeWidth()) / 2 * Math.max(this.lineCap() === "square" ? Math.SQRT2 : 1, (this.lineJoin() || "miter") === "miter" ? e : 1);
		}
		drawScene(t, n) {
			let r = this.getLayer(), i = t || r.getCanvas(), a = i.getContext(), o = this._getCanvasCache(), s = this.getSceneFunc(), c = this.hasShadow(), l = n === this;
			if (!(n ? this._isVisible(n) : this.isVisible()) && !l) return this;
			if (o) {
				a.save();
				let e = this.getAbsoluteTransform(n).getMatrix();
				return a.transform(e[0], e[1], e[2], e[3], e[4], e[5]), this._drawCachedSceneCanvas(a), a.restore(), this;
			}
			if (!s) return this;
			a.save();
			try {
				if (i.width && i.height && this._useBufferCanvas(void 0, a._getOpacity(this))) {
					let t = !!a._opacityRoot || !!this.attrs.selfRectFunc && this.getSelfRect === e.prototype.getSelfRect || !this.attrs.sceneFunc && !this.attrs.charRenderFunc && oi.has(this.constructor), r = i._prepareIsolationCanvas(t ? this.getClientRect({
						_forDrawing: !0,
						relativeTo: n,
						skipShadow: !0
					}) : void 0), o = r.getContext();
					o.save(), o._applyLineJoin(this), o._applyMiterLimit(this);
					let u = this.getAbsoluteTransform(n).getMatrix();
					o.transform(u[0], u[1], u[2], u[3], u[4], u[5]), s.call(this, o, this), o.restore(), c && a._applyShadow(this), l || (a._applyOpacity(this), a._applyGlobalCompositeOperation(this)), a._drawDeviceBuffer(r);
				} else {
					if (a._applyLineJoin(this), a._applyMiterLimit(this), !l) {
						let e = this.getAbsoluteTransform(n).getMatrix();
						a.transform(e[0], e[1], e[2], e[3], e[4], e[5]), a._applyOpacity(this), a._applyGlobalCompositeOperation(this);
					}
					c && a._applyShadow(this), s.call(this, a, this);
				}
			} catch (e) {
				throw i._releaseIsolationCanvas(), e;
			} finally {
				a.restore();
			}
			return this;
		}
		drawHit(e, t) {
			if (!this.shouldDrawHit(t)) return this;
			let n = this.getLayer(), r = e || n.hitCanvas, i = r && r.getContext(), a = this.hitFunc() || this.sceneFunc(), o = this._getCachedHitCanvas(t);
			if (this.colorKey || V.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"), o) {
				i.save();
				let e = this.getAbsoluteTransform(t).getMatrix();
				return i.transform(e[0], e[1], e[2], e[3], e[4], e[5]), this._drawCachedHitCanvas(i, o), i.restore(), this;
			}
			if (!a) return this;
			if (i.save(), i._applyLineJoin(this), i._applyMiterLimit(this), this !== t) {
				let e = this.getAbsoluteTransform(t).getMatrix();
				i.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
			}
			try {
				a.call(this, i, this);
			} finally {
				i.restore();
			}
			return this;
		}
		drawHitFromCache(e = 0) {
			let t = this._getCachedSceneCanvas(), n = this._getCachedHitCanvas(), r = n.getContext(), i = n.getWidth(), a = n.getHeight();
			r.clear(), r.drawImage(t._canvas, 0, 0, i / n.pixelRatio, a / n.pixelRatio);
			try {
				let t = r.getImageData(0, 0, i, a), n = t.data, o = n.length, s = V._hexToRgb(this.colorKey);
				for (let t = 0; t < o; t += 4) n[t + 3] > e ? (n[t] = s.r, n[t + 1] = s.g, n[t + 2] = s.b, n[t + 3] = 255) : n[t + 3] = 0;
				r.putImageData(t, 0, 0);
			} catch (e) {
				V.error("Unable to draw hit graph from cached scene canvas. " + e.message);
			}
			return this;
		}
		hasPointerCapture(e) {
			return ca(e, this);
		}
		setPointerCapture(e) {
			la(e, this);
		}
		releaseCapture(e) {
			da(e, this);
		}
	}, J.prototype._fillFunc = jo, J.prototype._strokeFunc = Mo, J.prototype._fillFuncHit = jo, J.prototype._strokeFuncHit = Mo, J.prototype._centroid = !1, J.prototype.nodeType = "Shape", si(J), J.prototype.on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetXChange.konva shadowOffsetYChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", No), J.prototype.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", Io), J.prototype.on("fillEnabledChange.konva fillChange.konva fillPatternImageChange.konva fillLinearGradientColorStopsChange.konva fillRadialGradientColorStopsChange.konva", Po), J.prototype.on("strokeEnabledChange.konva strokeWidthChange.konva strokeChange.konva strokeLinearGradientColorStopsChange.konva", Fo), J.prototype.on("fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", Lo), J.prototype.on("fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", Ro), J.prototype.on("fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", zo), G.addGetterSetter(J, "stroke", void 0, ba()), G.addGetterSetter(J, "strokeWidth", 2, U()), G.addGetterSetter(J, "fillAfterStrokeEnabled", !1), G.addGetterSetter(J, "hitStrokeWidth", "auto", va()), G.addGetterSetter(J, "strokeHitEnabled", !0, Sa()), G.addGetterSetter(J, "perfectDrawEnabled", !0, Sa()), G.addGetterSetter(J, "shadowForStrokeEnabled", !0, Sa()), G.addGetterSetter(J, "lineJoin"), G.addGetterSetter(J, "lineCap"), G.addGetterSetter(J, "miterLimit"), G.addGetterSetter(J, "sceneFunc"), G.addGetterSetter(J, "hitFunc"), G.addGetterSetter(J, "selfRectFunc"), G.addGetterSetter(J, "dash"), G.addGetterSetter(J, "dashOffset", 0, U()), G.addGetterSetter(J, "shadowColor", void 0, ya()), G.addGetterSetter(J, "shadowBlur", 0, U()), G.addGetterSetter(J, "shadowOpacity", 1, U()), G.addComponentsGetterSetter(J, "shadowOffset", ["x", "y"]), G.addGetterSetter(J, "shadowOffsetX", 0, U()), G.addGetterSetter(J, "shadowOffsetY", 0, U()), G.addGetterSetter(J, "fillPatternImage"), G.addGetterSetter(J, "fill", void 0, ba()), G.addGetterSetter(J, "fillPatternX", 0, U()), G.addGetterSetter(J, "fillPatternY", 0, U()), G.addGetterSetter(J, "fillLinearGradientColorStops"), G.addGetterSetter(J, "strokeLinearGradientColorStops"), G.addGetterSetter(J, "fillRadialGradientStartRadius", 0), G.addGetterSetter(J, "fillRadialGradientEndRadius", 0), G.addGetterSetter(J, "fillRadialGradientColorStops"), G.addGetterSetter(J, "fillPatternRepeat", "repeat"), G.addGetterSetter(J, "fillEnabled", !0), G.addGetterSetter(J, "strokeEnabled", !0), G.addGetterSetter(J, "shadowEnabled", !0), G.addGetterSetter(J, "dashEnabled", !0), G.addGetterSetter(J, "strokeScaleEnabled", !0), G.addGetterSetter(J, "fillPriority", "color"), G.addComponentsGetterSetter(J, "fillPatternOffset", ["x", "y"]), G.addGetterSetter(J, "fillPatternOffsetX", 0, U()), G.addGetterSetter(J, "fillPatternOffsetY", 0, U()), G.addComponentsGetterSetter(J, "fillPatternScale", ["x", "y"]), G.addGetterSetter(J, "fillPatternScaleX", 1, U()), G.addGetterSetter(J, "fillPatternScaleY", 1, U()), G.addComponentsGetterSetter(J, "fillLinearGradientStartPoint", ["x", "y"]), G.addComponentsGetterSetter(J, "strokeLinearGradientStartPoint", ["x", "y"]), G.addGetterSetter(J, "fillLinearGradientStartPointX", 0), G.addGetterSetter(J, "strokeLinearGradientStartPointX", 0), G.addGetterSetter(J, "fillLinearGradientStartPointY", 0), G.addGetterSetter(J, "strokeLinearGradientStartPointY", 0), G.addComponentsGetterSetter(J, "fillLinearGradientEndPoint", ["x", "y"]), G.addComponentsGetterSetter(J, "strokeLinearGradientEndPoint", ["x", "y"]), G.addGetterSetter(J, "fillLinearGradientEndPointX", 0), G.addGetterSetter(J, "strokeLinearGradientEndPointX", 0), G.addGetterSetter(J, "fillLinearGradientEndPointY", 0), G.addGetterSetter(J, "strokeLinearGradientEndPointY", 0), G.addComponentsGetterSetter(J, "fillRadialGradientStartPoint", ["x", "y"]), G.addGetterSetter(J, "fillRadialGradientStartPointX", 0), G.addGetterSetter(J, "fillRadialGradientStartPointY", 0), G.addComponentsGetterSetter(J, "fillRadialGradientEndPoint", ["x", "y"]), G.addGetterSetter(J, "fillRadialGradientEndPointX", 0), G.addGetterSetter(J, "fillRadialGradientEndPointY", 0), G.addGetterSetter(J, "fillPatternRotation", 0), G.addGetterSetter(J, "fillRule", void 0, ya()), G.backCompat(J, {
		dashArray: "dash",
		getDashArray: "getDash",
		setDashArray: "setDash",
		drawFunc: "sceneFunc",
		getDrawFunc: "getSceneFunc",
		setDrawFunc: "setSceneFunc",
		drawHitFunc: "hitFunc",
		getDrawHitFunc: "getHitFunc",
		setDrawHitFunc: "setHitFunc"
	});
}));
//#endregion
//#region node_modules/konva/lib/Layer.js
function Xo(e, t) {
	return e[t + 3] >= 128 ? Jo[V.getHitColorKey(e[t], e[t + 1], e[t + 2])] : void 0;
}
var Zo, Qo, $o, es, ts, ns = o((() => {
	Ri(), Ka(), Wa(), K(), ia(), Yo(), ci(), aa(), Zo = "beforeDraw", Qo = "draw", $o = 10, es = 256, ts = class extends Ga {
		constructor(e) {
			super(e), this.canvas = new na(), this.hitCanvas = new ra({ pixelRatio: 1 }), this._waitingForDraw = !1, this.on("visibleChange.konva", this._checkVisibility), this._checkVisibility(), this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled), this._setSmoothEnabled();
		}
		createPNGStream() {
			return this.canvas._canvas.createPNGStream();
		}
		getCanvas() {
			return this.canvas;
		}
		getNativeCanvasElement() {
			return this.canvas._canvas;
		}
		getHitCanvas() {
			return this.hitCanvas;
		}
		getContext() {
			return this.getCanvas().getContext();
		}
		clear(e) {
			return this.getContext().clear(e), this.getHitCanvas().getContext().clear(e), this;
		}
		setZIndex(e) {
			super.setZIndex(e);
			let t = this.getStage();
			return t && t.content && (t.content.removeChild(this.getNativeCanvasElement()), e < t.children.length - 1 ? t.content.insertBefore(this.getNativeCanvasElement(), t.children[e + 1].getCanvas()._canvas) : t.content.appendChild(this.getNativeCanvasElement())), this;
		}
		moveToTop() {
			q.prototype.moveToTop.call(this);
			let e = this.getStage();
			return e && e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.appendChild(this.getNativeCanvasElement())), !0;
		}
		moveUp() {
			if (!q.prototype.moveUp.call(this)) return !1;
			let e = this.getStage();
			return !e || !e.content ? !1 : (e.content.removeChild(this.getNativeCanvasElement()), this.index < e.children.length - 1 ? e.content.insertBefore(this.getNativeCanvasElement(), e.children[this.index + 1].getCanvas()._canvas) : e.content.appendChild(this.getNativeCanvasElement()), !0);
		}
		moveDown() {
			if (q.prototype.moveDown.call(this)) {
				let e = this.getStage();
				if (e) {
					let t = e.children;
					e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.insertBefore(this.getNativeCanvasElement(), t[this.index + 1].getCanvas()._canvas));
				}
				return !0;
			}
			return !1;
		}
		moveToBottom() {
			if (q.prototype.moveToBottom.call(this)) {
				let e = this.getStage();
				if (e) {
					let t = e.children;
					e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.insertBefore(this.getNativeCanvasElement(), t[1].getCanvas()._canvas));
				}
				return !0;
			}
			return !1;
		}
		getLayer() {
			return this;
		}
		remove() {
			var e, t;
			super.remove();
			let n = this.getNativeCanvasElement(), r = this.getHitCanvas()._canvas;
			return (e = n.parentNode) == null || e.removeChild(n), (t = r.parentNode) == null || t.removeChild(r), this;
		}
		getStage() {
			return this.parent;
		}
		_setSize({ width: e, height: t }) {
			return this.canvas.setSize(e, t), this._syncHitCanvasSize(), this._setSmoothEnabled(), this;
		}
		_syncHitCanvasSize() {
			let e = this.isListening();
			this.hitCanvas.setSizeIfChanged((e ? this.getWidth() : 0) || 0, (e ? this.getHeight() : 0) || 0);
		}
		_validateAdd(e) {
			let t = e.getType();
			t !== "Group" && t !== "Shape" && V.throw("You may only add groups and shapes to a layer.");
		}
		_toKonvaCanvas(e) {
			return e = { ...e }, e.width = e.width || this.getWidth(), e.height = e.height || this.getHeight(), e.x = e.x === void 0 ? this.x() : e.x, e.y = e.y === void 0 ? this.y() : e.y, q.prototype._toKonvaCanvas.call(this, e);
		}
		_checkVisibility() {
			this.visible() ? this.canvas._canvas.style.display = "block" : this.canvas._canvas.style.display = "none";
		}
		_setSmoothEnabled() {
			this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
		}
		getWidth() {
			if (this.parent) return this.parent.width();
		}
		setWidth() {
			V.warn("Can not change width of layer. Use \"stage.width(value)\" function instead.");
		}
		getHeight() {
			if (this.parent) return this.parent.height();
		}
		setHeight() {
			V.warn("Can not change height of layer. Use \"stage.height(value)\" function instead.");
		}
		batchDraw() {
			return this._waitingForDraw || (this._waitingForDraw = !0, V.requestAnimFrame(() => {
				this._waitingForDraw = !1, this.draw();
			}, this.getStage()?._getOwnerWindow())), this;
		}
		getIntersection(e) {
			if (!this.isListening() || !this.isVisible()) return null;
			let t = this._getIntersection(e);
			if (t.shape) return t.shape;
			if (!t.antialiased) return null;
			let n = this.hitCanvas.pixelRatio, r = Math.floor(e.x * n), i = Math.floor(e.y * n), a = (e) => this.hitCanvas.context.getImageData(r - e, i - e, e * 2 + 1, e * 2 + 1).data, o = $o, s = o * 2 + 1, c = a(o), l = c[(o * s + o) * 4 + 3];
			for (let e = 1; e <= es; e++) {
				e > o && (o = Math.min(es, o * 2), s = o * 2 + 1, c = a(o));
				let t = 0;
				for (let n = -e; n <= e; n++) {
					let r = Math.abs(n) === e ? 1 : e * 2;
					for (let i = -e; i <= e; i += r) {
						let e = ((n + o) * s + i + o) * 4, r = Xo(c, e);
						if (r) return r;
						t = Math.max(t, c[e + 3]);
					}
				}
				if (t <= l && t !== 255) return null;
				l = t;
			}
			return null;
		}
		_getIntersection(e) {
			if (!this.hitCanvas.width || !this.hitCanvas.height) return {};
			let t = this.hitCanvas.pixelRatio, n = this.hitCanvas.context.getImageData(Math.floor(e.x * t), Math.floor(e.y * t), 1, 1).data, r = Xo(n, 0);
			return r ? { shape: r } : n[3] > 0 ? { antialiased: !0 } : {};
		}
		drawScene(e, t) {
			let n = this.getLayer(), r = e || n && n.getCanvas();
			return this._fire(Zo, { node: this }), this.clearBeforeDraw() && r.getContext().clear(), Ga.prototype.drawScene.call(this, r, t), r._trimIsolationCanvas(), this._fire(Qo, { node: this }), this;
		}
		shouldDrawHit(e) {
			if (!super.shouldDrawHit(e)) return !1;
			if (e || B.hitOnDragEnabled) return !0;
			let t = !1;
			return H._dragElements.forEach((e) => {
				e.dragStatus === "dragging" && (e.node === this.getStage() || e.node.getLayer() === this) && (t = !0);
			}), !t && !B.Transformer?._isLayerTransforming(this);
		}
		drawHit(e, t) {
			let n = this.getLayer(), r = e || n && n.hitCanvas;
			return !e && n && (n._syncHitCanvasSize(), n.clearBeforeDraw() && n.getHitCanvas().getContext().clear()), Ga.prototype.drawHit.call(this, r, t), this;
		}
		enableHitGraph() {
			return this.hitGraphEnabled(!0), this;
		}
		disableHitGraph() {
			return this.hitGraphEnabled(!1), this;
		}
		setHitGraphEnabled(e) {
			V.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening(e);
		}
		getHitGraphEnabled(e) {
			return V.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening();
		}
		toggleHitCanvas() {
			if (!this.parent || !this.parent.content) return;
			let e = this.parent;
			this.hitCanvas._canvas.parentNode ? e.content.removeChild(this.hitCanvas._canvas) : e.content.appendChild(this.hitCanvas._canvas);
		}
		destroy() {
			return this.getCanvas()._releaseIsolationCanvas(), V.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas), super.destroy();
		}
	}, ts.prototype.nodeType = "Layer", si(ts), G.addGetterSetter(ts, "imageSmoothingEnabled", !0), G.addGetterSetter(ts, "clearBeforeDraw", !0), G.addOverloadedGetterSetter(ts, "hitGraphEnabled");
})), rs, is = o((() => {
	Ri(), ns(), ci(), rs = class extends ts {
		constructor(e) {
			super(e), this.listening(!1), V.warn("Konva.FastLayer is deprecated. Please use \"new Konva.Layer({ listening: false })\" instead.");
		}
	}, rs.prototype.nodeType = "FastLayer", si(rs);
})), as, os = o((() => {
	Ri(), Ka(), ci(), K(), W(), as = class extends Ga {
		_validateAdd(e) {
			let t = e.getType();
			t !== "Group" && t !== "Shape" && V.throw("You may only add groups and shapes to groups.");
		}
		_drawChildNodes(e, t, n) {
			if (e !== "drawScene" || !this.isolated() || n === this) return super._drawChildNodes(e, t, n);
			if (!t.width || !t.height) return;
			let r = t.getContext(), i = t._prepareIsolationCanvas(this.getClientRect({
				_forDrawing: !0,
				relativeTo: n
			})), a = i.getContext();
			a._opacityRoot = this, r.save();
			try {
				super._drawChildNodes(e, i, n), r._applyOpacity(this), r._drawDeviceBuffer(i);
			} catch (e) {
				throw t._releaseIsolationCanvas(), e;
			} finally {
				r.restore(), a._opacityRoot = void 0;
			}
		}
	}, G.addGetterSetter(as, "isolated", !1, Sa()), as.prototype.nodeType = "Group", si(as);
})), ss, cs, ls = o((() => {
	ci(), Ri(), ss = ai.performance?.now ? () => ai.performance.now() : Date.now, cs = class e {
		constructor(t, n) {
			this.id = e.animIdCounter++, this.frame = {
				time: 0,
				timeDiff: 0,
				lastTime: ss(),
				frameRate: 0
			}, this.func = t, this.setLayers(n);
		}
		setLayers(e) {
			return this.layers = e ? [].concat(e) : [], this;
		}
		getLayers() {
			return this.layers;
		}
		addLayer(e) {
			let t = this.layers, n = t.length;
			for (let r = 0; r < n; r++) if (t[r]._id === e._id) return !1;
			return this.layers.push(e), !0;
		}
		isRunning() {
			return e.animations.has(this);
		}
		start() {
			return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = ss(), e._addAnimation(this), this;
		}
		stop() {
			return e._removeAnimation(this), this;
		}
		_updateFrameObject(e) {
			this.frame.timeDiff = e - this.frame.lastTime, this.frame.lastTime = e, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff;
		}
		static _addAnimation(e) {
			this.animations.add(e), this._handleAnimation();
		}
		static _removeAnimation(e) {
			this.animations.delete(e);
		}
		static _runFrames() {
			let e = /* @__PURE__ */ new Set();
			Array.from(this.animations).forEach((t) => {
				this.animations.has(t) && (t._updateFrameObject(ss()), !(t.func && t.func.call(t, t.frame) === !1) && t.layers.forEach((t) => t && e.add(t)));
			}), e.forEach((e) => e.batchDraw());
		}
		static _animationLoop() {
			let t = e;
			t.animations.size ? (t._runFrames(), V.requestAnimFrame(t._animationLoop)) : t.animRunning = !1;
		}
		static _handleAnimation() {
			this.animRunning || (this.animRunning = !0, V.requestAnimFrame(this._animationLoop));
		}
	}, cs.animations = /* @__PURE__ */ new Set(), cs.animIdCounter = 0, cs.animRunning = !1;
}));
//#endregion
//#region node_modules/konva/lib/Tween.js
function us(e) {
	return V.colorToRGBA(e) || V.throw("can not tween the color \"" + e + "\", because it is not a valid color.");
}
function ds(e, t) {
	return {
		r: t.r - e.r,
		g: t.g - e.g,
		b: t.b - e.b,
		a: t.a - e.a
	};
}
function fs(e, t, n) {
	return "rgba(" + Math.round(e.r + t.r * n) + "," + Math.round(e.g + t.g * n) + "," + Math.round(e.b + t.b * n) + "," + (e.a + t.a * n) + ")";
}
var ps, ms, hs, gs, _s, vs, ys, bs, xs, Ss = o((() => {
	Ri(), ls(), Wa(), ci(), ps = {
		node: 1,
		duration: 1,
		easing: 1,
		onFinish: 1,
		onUpdate: 1,
		onReset: 1,
		yoyo: 1
	}, ms = 1, hs = 2, gs = 3, _s = [
		"fill",
		"stroke",
		"shadowColor"
	], vs = 0, ys = class {
		constructor(e, t, n, r, i, a, o) {
			this.prop = e, this.propFunc = t, this.begin = r, this._pos = r, this.duration = a, this._change = 0, this.prevPos = 0, this.yoyo = o, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = n, this._change = i - this.begin, this.pause();
		}
		fire(e) {
			let t = this[e];
			t && t();
		}
		setTime(e) {
			e > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : e < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = e, this.update());
		}
		getTime() {
			return this._time;
		}
		setPosition(e) {
			this.prevPos = this._pos, this.propFunc(e), this._pos = e;
		}
		getPosition(e) {
			return e === void 0 && (e = this._time), this.func(e, this.begin, this._change, this.duration);
		}
		play() {
			this.state = hs, this._startTime = this.getTimer() - this._time, this.fire("onPlay"), this.onEnterFrame();
		}
		reverse() {
			this.state = gs, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.fire("onReverse"), this.onEnterFrame();
		}
		seek(e) {
			this.pause(), this._time = e, this.update(), this.fire("onSeek");
		}
		reset() {
			this.pause(), this._time = 0, this.update(), this.fire("onReset");
		}
		finish() {
			this.pause(), this._time = this.duration, this.update(), this.fire("onFinish");
		}
		update() {
			this.setPosition(this.getPosition(this._time)), this.fire("onUpdate");
		}
		onEnterFrame() {
			let e = this.getTimer() - this._startTime;
			this.state === hs ? this.setTime(e) : this.state === gs && this.setTime(this.duration - e);
		}
		pause() {
			this.state = ms, this.fire("onPause");
		}
		getTimer() {
			return Date.now();
		}
	}, bs = class e {
		constructor(t) {
			let n = this, r = t.node, i = r._id, a = t.easing || xs.Linear, o = !!t.yoyo, s, c;
			s = t.duration === void 0 ? .3 : t.duration === 0 ? .001 : t.duration, this.node = r, this._id = vs++;
			let l = r.getLayer() || (r instanceof B.Stage ? r.getLayers() : null);
			for (c in l || V.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new cs(function() {
				n.tween.onEnterFrame();
			}, l), this.tween = new ys(c, function(e) {
				n._tweenFunc(e);
			}, a, 0, 1, s * 1e3, o), this._addListeners(), e.attrs[i] || (e.attrs[i] = {}), e.attrs[i][this._id] || (e.attrs[i][this._id] = {}), e.tweens[i] || (e.tweens[i] = {}), t) ps[c] === void 0 && this._addAttr(c, t[c]);
			this.reset(), this.onFinish = t.onFinish, this.onReset = t.onReset, this.onUpdate = t.onUpdate;
		}
		_addAttr(t, n) {
			if (V._isPlainObject(n)) {
				for (let e in n) this._addAttr(t + V._capitalize(e), n[e]);
				return;
			}
			let r = this.node, i = r._id, a, o, s, c, l = e.tweens[i][t];
			l !== void 0 && delete e.attrs[i][l][t];
			let u = r.getAttr(t);
			if (V._isArray(n) || V._isArray(u)) {
				if (a = [], c = u, s = n, u = V._isArray(u) ? u.slice() : Array(n.length).fill(u || 0), V._isArray(n) || (n = Array(u.length).fill(n)), o = Math.max(n.length, u.length), t === "points" && n.length !== u.length && (n.length > u.length ? u = V._prepareArrayForTween(u, n, r.closed()) : n = V._prepareArrayForTween(n, u, r.closed())), t.endsWith("ColorStops")) for (let e = 0; e < o; e++) if (e % 2 == 0) a.push((n[e] || 0) - (u[e] || 0));
				else {
					let t = us(u[e]);
					u[e] = t, a.push(ds(t, us(n[e])));
				}
				else for (let e = 0; e < o; e++) a.push((n[e] || 0) - (u[e] || 0));
			} else _s.indexOf(t) === -1 ? a = n - u : (u = us(u), a = ds(u, us(n)));
			e.attrs[i][this._id][t] = {
				start: u,
				diff: a,
				end: n,
				trueEnd: s,
				trueStart: c
			}, e.tweens[i][t] = this._id;
		}
		_tweenFunc(t) {
			let n = this.node, r = e.attrs[n._id]?.[this._id], i, a, o, s, c, l, u, d;
			for (i in r) {
				if (a = r[i], o = a.start, s = a.diff, d = a.end, V._isArray(o)) {
					if (c = [], u = Math.max(o.length, d.length), i.endsWith("ColorStops")) for (l = 0; l < u; l++) l % 2 == 0 ? c.push((o[l] || 0) + s[l] * t) : c.push(fs(o[l], s[l], t));
					else for (l = 0; l < u; l++) c.push((o[l] || 0) + s[l] * t);
				} else c = _s.indexOf(i) === -1 ? o + s * t : fs(o, s, t);
				n.setAttr(i, c);
			}
		}
		_addListeners() {
			let t = `destroy.konva-tween${this._id}`, n = () => this.destroy(), r = () => {
				this.node.off(t).on(t, n), this.anim.start();
			};
			this.tween.onPlay = r, this.tween.onReverse = r, this.tween.onPause = () => {
				this.node.off(t), this.anim.stop();
			};
			let i = (t, n) => {
				let r = e.attrs[this.node._id]?.[this._id];
				if (r) {
					for (let e in r) r[e][t] !== void 0 && this.node.setAttr(e, r[e][t]);
					n?.call(this);
				}
			};
			this.tween.onFinish = () => i("trueEnd", this.onFinish), this.tween.onReset = () => i("trueStart", this.onReset), this.tween.onUpdate = () => {
				this.onUpdate && this.onUpdate.call(this);
			};
		}
		play() {
			return this.tween.play(), this;
		}
		reverse() {
			return this.tween.reverse(), this;
		}
		reset() {
			return this.tween.reset(), this;
		}
		seek(e) {
			return this.tween.seek(e * 1e3), this;
		}
		pause() {
			return this.tween.pause(), this;
		}
		finish() {
			return this.tween.finish(), this;
		}
		destroy() {
			let t = this.node._id, n = this._id, r = e.attrs[t]?.[n], i = e.tweens[t];
			if (this.pause(), this.anim && this.anim.stop(), r) {
				if (i) {
					for (let e in r) delete i[e];
					Object.keys(i).length === 0 && delete e.tweens[t];
				}
				delete e.attrs[t][n], Object.keys(e.attrs[t]).length === 0 && delete e.attrs[t];
			}
		}
	}, bs.attrs = {}, bs.tweens = {}, q.prototype.to = function(e) {
		let t = e.onFinish, n = new bs({
			...e,
			node: this,
			onFinish() {
				n.destroy(), t && t();
			}
		});
		return n.play(), n;
	}, xs = {
		BackEaseIn(e, t, n, r) {
			return n * (e /= r) * e * (2.70158 * e - 1.70158) + t;
		},
		BackEaseOut(e, t, n, r) {
			return n * ((e = e / r - 1) * e * (2.70158 * e + 1.70158) + 1) + t;
		},
		BackEaseInOut(e, t, n, r) {
			let i = 1.70158;
			return (e /= r / 2) < 1 ? n / 2 * (e * e * (((i *= 1.525) + 1) * e - i)) + t : n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t;
		},
		ElasticEaseIn(e, t, n, r, i, a) {
			let o = 0;
			return e === 0 ? t : (e /= r) === 1 ? t + n : (a || (a = r * .3), !i || i < Math.abs(n) ? (i = n, o = a / 4) : o = a / (2 * Math.PI) * Math.asin(n / i), -(i * 2 ** (10 * --e) * Math.sin((e * r - o) * (2 * Math.PI) / a)) + t);
		},
		ElasticEaseOut(e, t, n, r, i, a) {
			let o = 0;
			return e === 0 ? t : (e /= r) === 1 ? t + n : (a || (a = r * .3), !i || i < Math.abs(n) ? (i = n, o = a / 4) : o = a / (2 * Math.PI) * Math.asin(n / i), i * 2 ** (-10 * e) * Math.sin((e * r - o) * (2 * Math.PI) / a) + n + t);
		},
		ElasticEaseInOut(e, t, n, r, i, a) {
			let o = 0;
			return e === 0 ? t : (e /= r / 2) == 2 ? t + n : (a || (a = .3 * 1.5 * r), !i || i < Math.abs(n) ? (i = n, o = a / 4) : o = a / (2 * Math.PI) * Math.asin(n / i), e < 1 ? -.5 * (i * 2 ** (10 * --e) * Math.sin((e * r - o) * (2 * Math.PI) / a)) + t : i * 2 ** (-10 * --e) * Math.sin((e * r - o) * (2 * Math.PI) / a) * .5 + n + t);
		},
		BounceEaseOut(e, t, n, r) {
			return (e /= r) < 1 / 2.75 ? n * (7.5625 * e * e) + t : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t;
		},
		BounceEaseIn(e, t, n, r) {
			return n - xs.BounceEaseOut(r - e, 0, n, r) + t;
		},
		BounceEaseInOut(e, t, n, r) {
			return e < r / 2 ? xs.BounceEaseIn(e * 2, 0, n, r) * .5 + t : xs.BounceEaseOut(e * 2 - r, 0, n, r) * .5 + n * .5 + t;
		},
		EaseIn(e, t, n, r) {
			return n * (e /= r) * e + t;
		},
		EaseOut(e, t, n, r) {
			return -n * (e /= r) * (e - 2) + t;
		},
		EaseInOut(e, t, n, r) {
			return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t;
		},
		StrongEaseIn(e, t, n, r) {
			return n * (e /= r) * e * e * e * e + t;
		},
		StrongEaseOut(e, t, n, r) {
			return n * ((e = e / r - 1) * e * e * e * e + 1) + t;
		},
		StrongEaseInOut(e, t, n, r) {
			return (e /= r / 2) < 1 ? n / 2 * e * e * e * e * e + t : n / 2 * ((e -= 2) * e * e * e * e + 2) + t;
		},
		Linear(e, t, n, r) {
			return n * e / r + t;
		}
	};
})), Cs, ws = o((() => {
	ci(), Ri(), Wa(), Ka(), ko(), ns(), is(), os(), aa(), Yo(), ls(), Ss(), ea(), ia(), Cs = V._assign(B, {
		Util: V,
		Transform: fi,
		Node: q,
		Container: Ga,
		Stage: Oo,
		stages: To,
		Layer: ts,
		FastLayer: rs,
		Group: as,
		DD: H,
		Shape: J,
		shapes: Jo,
		Animation: cs,
		Tween: bs,
		Easings: xs,
		Context: Zi,
		Canvas: ta
	});
})), Ts, Es = o((() => {
	K(), Yo(), ci(), W(), Ts = class extends J {
		_sceneFunc(e) {
			let t = B.getAngle(this.angle()), n = this.clockwise();
			e.beginPath(), e.arc(0, 0, Math.abs(this.outerRadius()), 0, t, n), e.arc(0, 0, Math.abs(this.innerRadius()), t, 0, !n), e.closePath(), e.fillStrokeShape(this);
		}
		getWidth() {
			return Math.abs(this.outerRadius()) * 2;
		}
		getHeight() {
			return Math.abs(this.outerRadius()) * 2;
		}
		setWidth(e) {
			this.outerRadius(e / 2);
		}
		setHeight(e) {
			this.outerRadius(e / 2);
		}
		getSelfRect() {
			let e = Math.abs(this.innerRadius()), t = Math.abs(this.outerRadius()), n = Math.min(e, t), r = Math.max(e, t), i = this.clockwise(), a = B.getAngle(this.angle());
			if (a % (Math.PI * 2) == 0) return a === 0 ? {
				x: n,
				y: 0,
				width: r - n,
				height: 0
			} : {
				x: -r,
				y: -r,
				width: r * 2,
				height: r * 2
			};
			let o = Math.PI * 2, s = i ? -a : a, c = s >= o ? o : (s % o + o) % o, l = Math.cos(Math.min(c, Math.PI)), u = Math.sin(Math.min(Math.max(Math.PI, c), 3 * Math.PI / 2)), d = Math.sin(Math.min(c, Math.PI / 2)), f = l * (l > 0 ? n : r), p = 1 * r, m = u * (u > 0 ? n : r), h = d * (d > 0 ? r : n);
			return {
				x: f,
				y: i ? -1 * h : m,
				width: p - f,
				height: h - m
			};
		}
	}, Ts.prototype._centroid = !0, Ts.prototype.className = "Arc", Ts.prototype._attrsAffectingSize = [
		"innerRadius",
		"outerRadius",
		"angle",
		"clockwise"
	], si(Ts, !0), G.addGetterSetter(Ts, "innerRadius", 0, U()), G.addGetterSetter(Ts, "outerRadius", 0, U()), G.addGetterSetter(Ts, "angle", 0, U()), G.addGetterSetter(Ts, "clockwise", !1, Sa());
}));
//#endregion
//#region node_modules/konva/lib/BezierFunctions.js
function Ds(e, t, n) {
	let r = 1 - n, i = r * r, a = 2 * r * n, o = n * n, s = i * (3 * (e[1] - e[0])) + a * (3 * (e[2] - e[1])) + o * (3 * (e[3] - e[2])), c = i * (3 * (t[1] - t[0])) + a * (3 * (t[2] - t[1])) + o * (3 * (t[3] - t[2]));
	return Math.sqrt(s * s + c * c);
}
var Os, ks, As, js, Ms, Ns, Ps, Fs, Is, Ls = o((() => {
	Os = [
		-.07652652113349734,
		.07652652113349734,
		-.22778585114164507,
		.22778585114164507,
		-.37370608871541955,
		.37370608871541955,
		-.5108670019508271,
		.5108670019508271,
		-.636053680726515,
		.636053680726515,
		-.7463319064601508,
		.7463319064601508,
		-.8391169718222188,
		.8391169718222188,
		-.912234428251326,
		.912234428251326,
		-.9639719272779138,
		.9639719272779138,
		-.9931285991850949,
		.9931285991850949
	], ks = [
		.15275338713072584,
		.15275338713072584,
		.14917298647260374,
		.14917298647260374,
		.14209610931838204,
		.14209610931838204,
		.13168863844917664,
		.13168863844917664,
		.11819453196151841,
		.11819453196151841,
		.10193011981724044,
		.10193011981724044,
		.08327674157670475,
		.08327674157670475,
		.06267204833410907,
		.06267204833410907,
		.04060142980038694,
		.04060142980038694,
		.017614007139152118,
		.017614007139152118
	], As = (e, t, n) => {
		let r = n / 2, i = 0;
		for (let n = 0; n < Os.length; n++) {
			let a = r * Os[n] + r;
			i += ks[n] * Ds(e, t, a);
		}
		return r * i;
	}, js = (e, t, n = 1) => As([
		e[0],
		e[0] + 2 / 3 * (e[1] - e[0]),
		e[2] + 2 / 3 * (e[1] - e[2]),
		e[2]
	], [
		t[0],
		t[0] + 2 / 3 * (t[1] - t[0]),
		t[2] + 2 / 3 * (t[1] - t[2]),
		t[2]
	], n), Ms = (e, t, n) => {
		let r = 1, i = e / t, a = (e - n(i)) / t, o = 0;
		for (; r > .001;) {
			let s = n(i + a), c = Math.abs(e - s) / t;
			if (c < r) r = c, i += a;
			else {
				let o = n(i - a), s = Math.abs(e - o) / t;
				s < r ? (r = s, i -= a) : a /= 2;
			}
			if (o++, o > 500) break;
		}
		return i;
	}, Ns = (e, t, n, r) => {
		let i = 1 - r;
		return i * i * e + 2 * i * r * t + r * r * n;
	}, Ps = (e, t, n, r, i, a) => {
		let o = [];
		for (let s of [[
			e,
			n,
			i
		], [
			t,
			r,
			a
		]]) {
			let c = (s[0] - s[1]) / (s[0] - 2 * s[1] + s[2]);
			c > 0 && c < 1 && o.push(Ns(e, n, i, c), Ns(t, r, a, c));
		}
		return o;
	}, Fs = (e, t, n, r, i) => {
		let a = 1 - i;
		return a * a * a * e + 3 * a * a * i * t + 3 * a * i * i * n + i * i * i * r;
	}, Is = (e, t, n, r, i, a, o, s) => {
		let c = [];
		for (let l of [[
			e,
			n,
			i,
			o
		], [
			t,
			r,
			a,
			s
		]]) {
			let u = -3 * l[0] + 9 * l[1] - 9 * l[2] + 3 * l[3], d = 6 * l[0] - 12 * l[1] + 6 * l[2], f = -3 * l[0] + 3 * l[1], p = d * d - 4 * u * f;
			if (p < 0) continue;
			let m = -(d + (d < 0 ? -1 : 1) * Math.sqrt(p)) / 2;
			for (let l of [m / u, f / m]) l > 0 && l < 1 && c.push(Fs(e, n, i, o, l), Fs(t, r, a, s, l));
		}
		return c;
	};
}));
//#endregion
//#region node_modules/konva/lib/shapes/Line.js
function Rs(e, t, n, r, i, a, o) {
	let s = Math.sqrt((n - e) ** 2 + (r - t) ** 2), c = Math.sqrt((i - n) ** 2 + (a - r) ** 2), l = s + c;
	if (l === 0) return [
		n,
		r,
		n,
		r
	];
	let u = o * s / l, d = o * c / l;
	return [
		n - u * (i - e),
		r - u * (a - t),
		n + d * (i - e),
		r + d * (a - t)
	];
}
function zs(e, t) {
	let n = e.length, r = [];
	for (let i = 2; i < n - 2; i += 2) {
		let n = Rs(e[i - 2], e[i - 1], e[i], e[i + 1], e[i + 2], e[i + 3], t);
		isNaN(n[0]) || (r.push(n[0]), r.push(n[1]), r.push(e[i]), r.push(e[i + 1]), r.push(n[2]), r.push(n[3]));
	}
	return r;
}
function Bs(e) {
	let t = [];
	for (let n = 0; n + 7 < e.length; n += 6) t.push(e[n + 6], e[n + 7], ...Is(e[n], e[n + 1], e[n + 2], e[n + 3], e[n + 4], e[n + 5], e[n + 6], e[n + 7]));
	return t;
}
var Vs, Hs = o((() => {
	Ls(), K(), ci(), Yo(), Ri(), W(), Vs = class extends J {
		constructor(e) {
			super(e), this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
				this._clearCache("tensionPoints");
			});
		}
		_hasTension() {
			return this.tension() !== 0 && this.points().length > 4;
		}
		_eachTensionSegment(e, t) {
			let n = this.points(), r = n.length, i = this.closed(), a = this.getTensionPoints(), o = a.length, s = n[0], c = n[1], l = i ? 0 : 4;
			for (i || (e(s, c, a[0], a[1], a[2], a[3]), s = a[2], c = a[3]); l < o - 2;) {
				let e = a[l++], n = a[l++], r = a[l++], i = a[l++], o = a[l++], u = a[l++];
				t(s, c, e, n, r, i, o, u), s = o, c = u;
			}
			i || e(s, c, a[o - 2], a[o - 1], n[r - 2], n[r - 1]);
		}
		_getStrokePadding(e = this.points().length === 4 && !this.closed() ? 1 : void 0) {
			return super._getStrokePadding(e);
		}
		_sceneFunc(e) {
			let t = this.points(), n = t.length, r = this.closed(), i = this.bezier();
			if (!n) return;
			let a = 0;
			if (e.beginPath(), e.moveTo(t[0], t[1]), this._hasTension()) this._eachTensionSegment((t, n, r, i, a, o) => e.quadraticCurveTo(r, i, a, o), (t, n, r, i, a, o, s, c) => e.bezierCurveTo(r, i, a, o, s, c));
			else if (i) for (a = 2; a < n;) e.bezierCurveTo(t[a++], t[a++], t[a++], t[a++], t[a++], t[a++]);
			else for (a = 2; a < n; a += 2) e.lineTo(t[a], t[a + 1]);
			r ? (e.closePath(), e.fillStrokeShape(this)) : e.strokeShape(this);
		}
		getTensionPoints() {
			return this._getCache("tensionPoints", this._getTensionPoints);
		}
		_getTensionPoints() {
			return this.closed() ? this._getTensionPointsClosed() : zs(this.points(), this.tension());
		}
		_getTensionPointsClosed() {
			let e = this.points(), t = e.length, n = this.tension(), r = Rs(e[t - 2], e[t - 1], e[0], e[1], e[2], e[3], n), i = Rs(e[t - 4], e[t - 3], e[t - 2], e[t - 1], e[0], e[1], n), a = zs(e, n);
			return [r[2], r[3]].concat(a, [
				i[0],
				i[1],
				e[t - 2],
				e[t - 1],
				i[2],
				i[3],
				r[0],
				r[1],
				e[0],
				e[1]
			]);
		}
		getWidth() {
			return this.getSelfRect().width;
		}
		getHeight() {
			return this.getSelfRect().height;
		}
		getSelfRect() {
			let e = this.points();
			if (e.length < 4) return {
				x: e[0] || 0,
				y: e[1] || 0,
				width: 0,
				height: 0
			};
			if (this._hasTension()) {
				let t = [e[0], e[1]];
				this._eachTensionSegment((e, n, r, i, a, o) => t.push(a, o, ...Ps(e, n, r, i, a, o)), (e, n, r, i, a, o, s, c) => t.push(s, c, ...Is(e, n, r, i, a, o, s, c))), e = t;
			} else this.bezier() && (e = [
				e[0],
				e[1],
				...Bs(e)
			]);
			return V._getPointsRect(e);
		}
	}, Vs.prototype.className = "Line", Vs.prototype._attrsAffectingSize = [
		"points",
		"bezier",
		"tension",
		"closed"
	], si(Vs, !0), G.addGetterSetter(Vs, "closed", !1), G.addGetterSetter(Vs, "bezier", !1), G.addGetterSetter(Vs, "tension", 0, U()), G.addGetterSetter(Vs, "points", [], xa());
})), Us, Ws, Gs, Ks = o((() => {
	K(), ci(), Yo(), Ri(), Ls(), Us = {
		m: 2,
		l: 2,
		h: 1,
		v: 1,
		c: 6,
		s: 4,
		q: 4,
		t: 2,
		a: 7,
		z: 0
	}, Ws = Math.PI * 2, Gs = class e extends J {
		constructor(e) {
			super(e), this.dataArray = [], this.pathLength = 0, this._readDataAttribute(), this.on("dataChange.konva", function() {
				this._readDataAttribute();
			});
		}
		_readDataAttribute() {
			this.dataArray = e.parsePathData(this.data()), this.pathLength = e.getPathLength(this.dataArray);
		}
		_sceneFunc(e) {
			let t = this.dataArray;
			e.beginPath();
			let n = !1;
			for (let r = 0; r < t.length; r++) {
				let i = t[r].command, a = t[r].points;
				switch (i) {
					case "L":
						e.lineTo(a[0], a[1]);
						break;
					case "M":
						e.moveTo(a[0], a[1]);
						break;
					case "C":
						e.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
						break;
					case "Q":
						e.quadraticCurveTo(a[0], a[1], a[2], a[3]);
						break;
					case "A":
						e.ellipse(a[0], a[1], a[2], a[3], a[6], a[4], a[4] + a[5], !a[7]);
						break;
					case "z": n = !0, e.closePath();
				}
			}
			!n && !this.hasFill() ? e.strokeShape(this) : e.fillStrokeShape(this);
		}
		getWidth() {
			return this.getSelfRect().width;
		}
		getHeight() {
			return this.getSelfRect().height;
		}
		getSelfRect() {
			let t = [];
			return this.dataArray.forEach(function(n) {
				if (n.command === "A") {
					let [r, i, a, o, s, c, l] = n.points, u = Math.cos(l), d = Math.sin(l), f = e.getPointOnEllipticalArc(r, i, a, o, s + c, l);
					t.push(n.start.x, n.start.y, f.x, f.y);
					let p = Math.atan2(-o * d, a * u), m = Math.atan2(o * u, a * d);
					[
						p,
						p + Math.PI,
						m,
						m + Math.PI
					].forEach((n) => {
						if (((n - s) * Math.sign(c) % Ws + Ws) % Ws < Math.abs(c)) {
							let s = e.getPointOnEllipticalArc(r, i, a, o, n, l);
							t.push(s.x, s.y);
						}
					});
				} else n.command === "C" ? t.push(n.start.x, n.start.y, n.points[4], n.points[5], ...Is(n.start.x, n.start.y, n.points[0], n.points[1], n.points[2], n.points[3], n.points[4], n.points[5])) : n.command === "Q" ? t.push(n.start.x, n.start.y, n.points[2], n.points[3], ...Ps(n.start.x, n.start.y, n.points[0], n.points[1], n.points[2], n.points[3])) : t.push(...n.points);
			}), V._getPointsRect(t);
		}
		getLength() {
			return this.pathLength;
		}
		getPointAtLength(t) {
			return e.getPointAtLengthOfDataArray(t, this.dataArray);
		}
		static getLineLength(e, t, n, r) {
			return Math.sqrt((n - e) * (n - e) + (r - t) * (r - t));
		}
		static getPathLength(e) {
			let t = 0;
			for (let n = 0; n < e.length; ++n) t += e[n].pathLength;
			return t;
		}
		static getPointAtLengthOfDataArray(t, n, r) {
			let i, a = r?.index ?? 0, o = r?.offset ?? 0, s = n.length;
			if (!s) return null;
			for (; a > 0 && t <= o;) o -= n[--a].pathLength;
			for (t -= o; a < s && t > n[a].pathLength;) {
				let e = n[a].pathLength;
				t -= e, o += e, ++a;
			}
			if (r && a < s && (r.index = a, r.offset = o), a === s && (a--, t = n[a].pathLength), t < .01) return n[a].command === "M" ? (i = n[a].points.slice(0, 2), {
				x: i[0],
				y: i[1]
			}) : {
				x: n[a].start.x,
				y: n[a].start.y
			};
			let c = n[a], l = c.points;
			switch (c.command) {
				case "L":
				case "z": return e.getPointOnLine(t, c.start.x, c.start.y, l[0], l[1]);
				case "C": return e.getPointOnCubicBezier(Ms(t, c.pathLength, (e) => As([
					c.start.x,
					l[0],
					l[2],
					l[4]
				], [
					c.start.y,
					l[1],
					l[3],
					l[5]
				], e)), c.start.x, c.start.y, l[0], l[1], l[2], l[3], l[4], l[5]);
				case "Q": return e.getPointOnQuadraticBezier(Ms(t, c.pathLength, (e) => js([
					c.start.x,
					l[0],
					l[2]
				], [
					c.start.y,
					l[1],
					l[3]
				], e)), c.start.x, c.start.y, l[0], l[1], l[2], l[3]);
				case "A": return e.getPointOnEllipticalArc(l[0], l[1], l[2], l[3], l[2] === l[3] ? l[4] + l[5] * t / c.pathLength : e._walkArc(l, t).theta, l[6]);
			}
			return null;
		}
		static getPointOnLine(e, t, n, r, i, a, o) {
			a = a ?? t, o = o ?? n;
			let s = this.getLineLength(t, n, r, i);
			if (s < 1e-10) return {
				x: t,
				y: n
			};
			if (r === t) return {
				x: a,
				y: o + (i > n ? e : -e)
			};
			let c = (i - n) / (r - t), l = Math.sqrt(e * e / (1 + c * c)) * (r < t ? -1 : 1), u = c * l;
			if (Math.abs(o - n - c * (a - t)) < 1e-10) return {
				x: a + l,
				y: o + u
			};
			let d = ((a - t) * (r - t) + (o - n) * (i - n)) / (s * s), f = t + d * (r - t), p = n + d * (i - n), m = this.getLineLength(a, o, f, p), h = Math.sqrt(e * e - m * m), g = Math.sqrt(h * h / (1 + c * c)) * (r < t ? -1 : 1), _ = c * g;
			return {
				x: f + g,
				y: p + _
			};
		}
		static getPointOnCubicBezier(e, t, n, r, i, a, o, s, c) {
			function l(e) {
				return e * e * e;
			}
			function u(e) {
				return 3 * e * e * (1 - e);
			}
			function d(e) {
				return 3 * e * (1 - e) * (1 - e);
			}
			function f(e) {
				return (1 - e) * (1 - e) * (1 - e);
			}
			return {
				x: s * l(e) + a * u(e) + r * d(e) + t * f(e),
				y: c * l(e) + o * u(e) + i * d(e) + n * f(e)
			};
		}
		static getPointOnQuadraticBezier(e, t, n, r, i, a, o) {
			function s(e) {
				return e * e;
			}
			function c(e) {
				return 2 * e * (1 - e);
			}
			function l(e) {
				return (1 - e) * (1 - e);
			}
			return {
				x: a * s(e) + r * c(e) + t * l(e),
				y: o * s(e) + i * c(e) + n * l(e)
			};
		}
		static getPointOnEllipticalArc(e, t, n, r, i, a) {
			let o = Math.cos(a), s = Math.sin(a), c = {
				x: n * Math.cos(i),
				y: r * Math.sin(i)
			};
			return {
				x: e + (c.x * o - c.y * s),
				y: t + (c.x * s + c.y * o)
			};
		}
		static parsePathData(e) {
			if (!e) return [];
			let t = e, n = [
				"m",
				"M",
				"l",
				"L",
				"v",
				"V",
				"h",
				"H",
				"z",
				"Z",
				"c",
				"C",
				"q",
				"Q",
				"t",
				"T",
				"s",
				"S",
				"a",
				"A"
			];
			t = t.replace(/* @__PURE__ */ RegExp(" ", "g"), ",");
			for (let e = 0; e < n.length; e++) t = t.replace(new RegExp(n[e], "g"), "|" + n[e]);
			let r = t.split("|"), i = [], a = [], o = 0, s = 0, c = 0, l = 0, u = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, d;
			for (let e = 1; e < r.length; e++) {
				let t = r[e], n = t.charAt(0);
				for (t = t.slice(1), a.length = 0; d = u.exec(t);) a.push(d[0]);
				let f = [], p = n === "A" || n === "a" ? 0 : -1;
				for (let e = 0, t = a.length; e < t; e++) {
					let t = a[e];
					for (; (p === 3 || p === 4) && t.length > 1 && (t[0] === "0" || t[0] === "1");) f.push(+t[0]), p++, t = t.slice(1);
					let n = parseFloat(t);
					f.push(isNaN(n) ? 0 : n), p >= 0 && (p = (p + 1) % 7);
				}
				let m = 0;
				for (; m < f.length && !(f.length - m < Us[n.toLowerCase()] || n === "z" || n === "Z");) {
					let e = "", t = [], r = o, a = s, u, d, p, h, g, _, v, y, b, x;
					switch (n) {
						case "l":
							o += f[m++], s += f[m++], e = "L", t.push(o, s);
							break;
						case "L":
							o = f[m++], s = f[m++], t.push(o, s);
							break;
						case "m":
							o += f[m++], s += f[m++], e = "M", c = o, l = s, t.push(o, s), n = "l";
							break;
						case "M":
							o = f[m++], s = f[m++], e = "M", c = o, l = s, t.push(o, s), n = "L";
							break;
						case "h":
							o += f[m++], e = "L", t.push(o, s);
							break;
						case "H":
							o = f[m++], e = "L", t.push(o, s);
							break;
						case "v":
							s += f[m++], e = "L", t.push(o, s);
							break;
						case "V":
							s = f[m++], e = "L", t.push(o, s);
							break;
						case "C":
							t.push(f[m++], f[m++], f[m++], f[m++]), o = f[m++], s = f[m++], t.push(o, s);
							break;
						case "c":
							t.push(o + f[m++], s + f[m++], o + f[m++], s + f[m++]), o += f[m++], s += f[m++], e = "C", t.push(o, s);
							break;
						case "S":
							d = o, p = s, u = i[i.length - 1], u?.command === "C" && (d = o + (o - u.points[2]), p = s + (s - u.points[3])), t.push(d, p, f[m++], f[m++]), o = f[m++], s = f[m++], e = "C", t.push(o, s);
							break;
						case "s":
							d = o, p = s, u = i[i.length - 1], u?.command === "C" && (d = o + (o - u.points[2]), p = s + (s - u.points[3])), t.push(d, p, o + f[m++], s + f[m++]), o += f[m++], s += f[m++], e = "C", t.push(o, s);
							break;
						case "Q":
							t.push(f[m++], f[m++]), o = f[m++], s = f[m++], t.push(o, s);
							break;
						case "q":
							t.push(o + f[m++], s + f[m++]), o += f[m++], s += f[m++], e = "Q", t.push(o, s);
							break;
						case "T":
							d = o, p = s, u = i[i.length - 1], u?.command === "Q" && (d = o + (o - u.points[0]), p = s + (s - u.points[1])), o = f[m++], s = f[m++], e = "Q", t.push(d, p, o, s);
							break;
						case "t":
							d = o, p = s, u = i[i.length - 1], u?.command === "Q" && (d = o + (o - u.points[0]), p = s + (s - u.points[1])), o += f[m++], s += f[m++], e = "Q", t.push(d, p, o, s);
							break;
						case "A":
						case "a":
							if (h = Math.abs(f[m++]), g = Math.abs(f[m++]), _ = f[m++], v = f[m++], y = f[m++], b = o, x = s, n === "a" ? (o += f[m++], s += f[m++]) : (o = f[m++], s = f[m++]), e = "A", o === b && s === x) continue;
							!h || !g ? (e = "L", t.push(o, s)) : t = this.convertEndpointToCenterParameterization(b, x, o, s, v, y, h, g, _);
					}
					i.push({
						command: e || n,
						points: t,
						start: {
							x: r,
							y: a
						},
						pathLength: this.calcLength(r, a, e || n, t)
					});
				}
				(n === "z" || n === "Z") && (i.push({
					command: "z",
					points: [c, l],
					start: {
						x: o,
						y: s
					},
					pathLength: this.getLineLength(o, s, c, l)
				}), o = c, s = l);
			}
			return i;
		}
		static _walkArc(t, n) {
			let [r, i, a, o, s, c] = t, l = Math.max(1, Math.ceil(Math.abs(c) / (Math.PI / 180))), u = e.getPointOnEllipticalArc(r, i, a, o, s, 0), d = s, f = 0;
			for (let t = 1; t <= l; t++) {
				let p = s + c * t / l, m = e.getPointOnEllipticalArc(r, i, a, o, p, 0), h = e.getLineLength(u.x, u.y, m.x, m.y);
				if (f + h >= n) return {
					theta: d + (p - d) * ((n - f) / h),
					length: n
				};
				f += h, u = m, d = p;
			}
			return {
				theta: d,
				length: f
			};
		}
		static calcLength(t, n, r, i) {
			let a = e;
			switch (r) {
				case "L": return a.getLineLength(t, n, i[0], i[1]);
				case "C": return As([
					t,
					i[0],
					i[2],
					i[4]
				], [
					n,
					i[1],
					i[3],
					i[5]
				], 1);
				case "Q": return js([
					t,
					i[0],
					i[2]
				], [
					n,
					i[1],
					i[3]
				], 1);
				case "A": return a._walkArc(i, Infinity).length;
			}
			return 0;
		}
		static convertEndpointToCenterParameterization(e, t, n, r, i, a, o, s, c) {
			let l = Math.PI / 180 * c, u = Math.cos(l) * (e - n) / 2 + Math.sin(l) * (t - r) / 2, d = -1 * Math.sin(l) * (e - n) / 2 + Math.cos(l) * (t - r) / 2, f = u * u / (o * o) + d * d / (s * s);
			f > 1 && (o *= Math.sqrt(f), s *= Math.sqrt(f));
			let p = Math.sqrt((o * o * (s * s) - o * o * (d * d) - s * s * (u * u)) / (o * o * (d * d) + s * s * (u * u)));
			i === a && (p *= -1), isNaN(p) && (p = 0);
			let m = p * o * d / s, h = p * -s * u / o, g = (e + n) / 2 + Math.cos(l) * m - Math.sin(l) * h, _ = (t + r) / 2 + Math.sin(l) * m + Math.cos(l) * h, v = function(e) {
				return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
			}, y = function(e, t) {
				return (e[0] * t[0] + e[1] * t[1]) / (v(e) * v(t));
			}, b = function(e, t) {
				return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(y(e, t));
			}, x = b([1, 0], [(u - m) / o, (d - h) / s]), S = [(u - m) / o, (d - h) / s], C = [(-1 * u - m) / o, (-1 * d - h) / s], w = b(S, C);
			return y(S, C) <= -1 && (w = Math.PI), y(S, C) >= 1 && (w = 0), a === 0 && w > 0 && (w -= 2 * Math.PI), a === 1 && w < 0 && (w += 2 * Math.PI), [
				g,
				_,
				o,
				s,
				x,
				w,
				l,
				a
			];
		}
	}, Gs.prototype.className = "Path", Gs.prototype._attrsAffectingSize = ["data"], si(Gs, !0), G.addGetterSetter(Gs, "data");
})), qs, Js = o((() => {
	K(), Hs(), W(), ci(), Ks(), qs = class extends Vs {
		_getStrokePadding() {
			return super._getStrokePadding(this.pointerAtBeginning() || this.pointerAtEnding() ? this.miterLimit() || 10 : void 0);
		}
		_sceneFunc(e) {
			super._sceneFunc(e);
			let t = this.points(), n = t.length;
			if (n < 4) return;
			let r = this.pointerLength(), i = this.pointerWidth();
			this.pointerAtEnding() && (e.save(), e.beginPath(), e.translate(t[n - 2], t[n - 1]), e.rotate(this._getPointerAngle(!1)), e.moveTo(0, 0), e.lineTo(-r, i / 2), e.lineTo(-r, -i / 2), e.closePath(), e.restore(), this.__fillStroke(e)), this.pointerAtBeginning() && (e.save(), e.beginPath(), e.translate(t[0], t[1]), e.rotate(this._getPointerAngle(!0)), e.moveTo(0, 0), e.lineTo(-r, i / 2), e.lineTo(-r, -i / 2), e.closePath(), e.restore(), this.__fillStroke(e));
		}
		_getPointerAngle(e) {
			let t = this.points(), n = t.length, r = this.tension() !== 0 && n > 4, i = r ? this.getTensionPoints() : t, a = e ? t[0] : t[n - 2], o = e ? t[1] : t[n - 1], s = 0, c = 0;
			if (r && e) s = a - (i[0] + i[2]) / 2, c = o - (i[1] + i[3]) / 2;
			else if (r) {
				let e = i[i.length - 4], t = i[i.length - 3], n = i[i.length - 2], r = i[i.length - 1], l = Gs.calcLength(e, t, "Q", [
					n,
					r,
					a,
					o
				]), u = Gs.getPointOnQuadraticBezier(l ? Math.max(0, 1 - this.pointerLength() / l) : 0, e, t, n, r, a, o);
				s = a - u.x, c = o - u.y;
			}
			for (let t = e ? 0 : i.length - 2; !s && !c && t >= 0 && t < i.length; t += e ? 2 : -2) s = a - i[t], c = o - i[t + 1];
			let l = Math.PI * 2;
			return (Math.atan2(c, s) + l) % l;
		}
		__fillStroke(e) {
			let t = this.dashEnabled();
			t && (this.attrs.dashEnabled = !1, e.setLineDash([])), e.fillStrokeShape(this), t && (this.attrs.dashEnabled = !0);
		}
		getSelfRect() {
			let e = super.getSelfRect(), t = this.points();
			if (t.length < 4) return e;
			let n = e.x, r = e.y, i = n + e.width, a = r + e.height;
			for (let e of [!1, !0]) {
				if (!(e ? this.pointerAtBeginning() : this.pointerAtEnding())) continue;
				let o = e ? 0 : t.length - 2, s = this._getPointerAngle(e), c = Math.cos(s), l = Math.sin(s), u = t[o] - this.pointerLength() * c, d = t[o + 1] - this.pointerLength() * l, f = Math.abs(this.pointerWidth() * l / 2), p = Math.abs(this.pointerWidth() * c / 2);
				n = Math.min(n, u - f), r = Math.min(r, d - p), i = Math.max(i, u + f), a = Math.max(a, d + p);
			}
			return {
				x: n,
				y: r,
				width: i - n,
				height: a - r
			};
		}
	}, qs.prototype.className = "Arrow", qs.prototype._attrsAffectingSize = [
		...Vs.prototype._attrsAffectingSize,
		"pointerLength",
		"pointerWidth",
		"pointerAtBeginning",
		"pointerAtEnding"
	], si(qs, !0), G.addGetterSetter(qs, "pointerLength", 10, U()), G.addGetterSetter(qs, "pointerWidth", 10, U()), G.addGetterSetter(qs, "pointerAtBeginning", !1), G.addGetterSetter(qs, "pointerAtEnding", !0);
})), Ys, Xs = o((() => {
	K(), Yo(), W(), ci(), Ys = class extends J {
		_getStrokePadding() {
			return super._getStrokePadding(1);
		}
		_sceneFunc(e) {
			e.beginPath(), e.arc(0, 0, Math.abs(this.attrs.radius || 0), 0, Math.PI * 2, !1), e.closePath(), e.fillStrokeShape(this);
		}
		getWidth() {
			return Math.abs(this.radius()) * 2;
		}
		getHeight() {
			return Math.abs(this.radius()) * 2;
		}
		setWidth(e) {
			this.radius(e / 2);
		}
		setHeight(e) {
			this.radius(e / 2);
		}
	}, Ys.prototype._centroid = !0, Ys.prototype.className = "Circle", Ys.prototype._attrsAffectingSize = ["radius"], si(Ys, !0), G.addGetterSetter(Ys, "radius", 0, U());
})), Zs, Qs = o((() => {
	K(), Yo(), W(), ci(), Zs = class extends J {
		_getStrokePadding() {
			return super._getStrokePadding(1);
		}
		_sceneFunc(e) {
			let t = Math.abs(this.radiusX()), n = Math.abs(this.radiusY());
			e.beginPath(), e.ellipse(0, 0, t, n, 0, 0, Math.PI * 2, !1), e.closePath(), e.fillStrokeShape(this);
		}
		getWidth() {
			return Math.abs(this.radiusX()) * 2;
		}
		getHeight() {
			return Math.abs(this.radiusY()) * 2;
		}
		setWidth(e) {
			this.radiusX(e / 2);
		}
		setHeight(e) {
			this.radiusY(e / 2);
		}
	}, Zs.prototype.className = "Ellipse", Zs.prototype._centroid = !0, Zs.prototype._attrsAffectingSize = ["radiusX", "radiusY"], si(Zs, !0), G.addComponentsGetterSetter(Zs, "radius", ["x", "y"]), G.addGetterSetter(Zs, "radiusX", 0, U()), G.addGetterSetter(Zs, "radiusY", 0, U());
})), $s, ec = o((() => {
	Ri(), K(), Yo(), ci(), W(), $s = class e extends J {
		constructor(e) {
			super(e), this._loadListener = () => {
				this._requestDraw();
			}, this.on("imageChange.konva", (e) => {
				this._removeImageLoad(e.oldVal), this._setImageLoad();
			}), this._setImageLoad();
		}
		_setImageLoad() {
			var e;
			let t = this.image();
			t?.complete && t.src || t?.readyState >= 2 || (e = t?.addEventListener) == null || e.call(t, "videoWidth" in t ? "loadeddata" : "load", this._loadListener);
		}
		_removeImageLoad(e) {
			var t;
			(t = e?.removeEventListener) == null || t.call(e, "videoWidth" in e ? "loadeddata" : "load", this._loadListener);
		}
		destroy() {
			return this._removeImageLoad(this.image()), super.destroy(), this;
		}
		_useBufferCanvas(e, t = this.getAbsoluteOpacity()) {
			if (this.attrs.perfectDrawEnabled === !1) return !1;
			let n = !!this.cornerRadius(), r = this.hasShadow();
			return n && r ? !0 : super._useBufferCanvas(!0, t);
		}
		_getStrokePadding() {
			return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
		}
		_sceneFunc(e) {
			let t = this.getWidth(), n = this.getHeight(), r = this.cornerRadius(), i = this.attrs.image;
			if ((this.hasFill() || this.hasStroke() || r) && (e.beginPath(), r ? V.drawRoundedRectPath(e, t, n, r) : e.rect(0, 0, t, n), e.closePath(), e.fillStrokeShape(this)), i) {
				r && e.clip();
				let a = this.attrs.cropWidth, o = this.attrs.cropHeight;
				a && o ? e.drawImage(i, this.cropX(), this.cropY(), a, o, 0, 0, t, n) : e.drawImage(i, 0, 0, t, n);
			}
		}
		_hitFunc(e) {
			let t = this.width(), n = this.height(), r = this.cornerRadius();
			e.beginPath(), r ? V.drawRoundedRectPath(e, t, n, r) : e.rect(0, 0, t, n), e.closePath(), e.fillStrokeShape(this);
		}
		getWidth() {
			let e = this.image();
			return this.attrs.width ?? e?.videoWidth ?? e?.width ?? 0;
		}
		getHeight() {
			let e = this.image();
			return this.attrs.height ?? e?.videoHeight ?? e?.height ?? 0;
		}
		static fromURL(t, n, r = null) {
			let i = V.createImageElement();
			i.onload = () => {
				i.onload = i.onerror = null, n(new e({ image: i }));
			}, i.onerror = r, i.crossOrigin = "Anonymous", i.src = t;
		}
	}, $s.prototype.className = "Image", $s.prototype._attrsAffectingSize = ["image"], si($s, !0), G.addGetterSetter($s, "cornerRadius", 0, _a(4)), G.addGetterSetter($s, "image"), G.addComponentsGetterSetter($s, "crop", [
		"x",
		"y",
		"width",
		"height"
	]), G.addGetterSetter($s, "cropX", 0, U()), G.addGetterSetter($s, "cropY", 0, U()), G.addGetterSetter($s, "cropWidth", 0, U()), G.addGetterSetter($s, "cropHeight", 0, U());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Text.js
function tc(e) {
	return e / 15;
}
function nc(e) {
	return lc ? Array.from(lc.segment(e), (e) => e.segment) : e.match(/\p{RI}\p{RI}|\P{M}(?:\p{M}|\p{Emoji_Modifier}|\uFE0F|\u200D\P{M})*|\p{M}+/gu) || [];
}
function rc() {
	if (Nc !== null) return Nc;
	Nc = !1;
	let e;
	try {
		e = V.createCanvasElement(), e.width = 10, e.height = 10;
		let t = e.getContext(hc);
		if (t) {
			t.globalAlpha = 0, t.shadowColor = "black", t.shadowBlur = 5, t.shadowOffsetX = 5, t.shadowOffsetY = 5, t.fillStyle = "black", t.font = "10px Arial", t.fillText("X", 0, 10);
			let e = t.getImageData(0, 0, 10, 10).data;
			for (let t = 3; t < e.length; t += 4) if (e[t] > 0) {
				Nc = !0;
				break;
			}
		}
	} catch {} finally {
		e && V.releaseCanvas(e);
	}
	return Nc;
}
function ic(e) {
	return e.split(",").map((e) => {
		e = e.trim();
		let t = e.indexOf(" ") >= 0, n = e.indexOf("\"") >= 0 || e.indexOf("'") >= 0;
		return t && !n && (e = `"${e}"`), e;
	}).join(", ");
}
function ac() {
	return Pc || (Pc = V.createCanvasElement().getContext(hc), Pc);
}
function oc(e) {
	this._partialFillStyle && e.setAttr("fillStyle", this._partialFillStyle), e.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function sc(e) {
	e.setAttr("miterLimit", 2), this._partialStrokeStyle && e.setAttr("strokeStyle", this._partialStrokeStyle), e.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function cc(e) {
	return e = e || {}, e.fill || e.fillLinearGradientColorStops || e.fillRadialGradientColorStops || e.fillPatternImage ? e : {
		...e,
		fill: "black"
	};
}
var lc, uc, dc, fc, pc, mc, hc, gc, _c, vc, yc, bc, xc, Sc, Cc, wc, Tc, Ec, Dc, Oc, kc, Ac, jc, Mc, Nc, Pc, Fc, Ic = o((() => {
	Ri(), K(), Yo(), ci(), W(), lc = typeof Intl < "u" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null, uc = "auto", dc = "center", fc = "inherit", pc = "justify", mc = "Change.konva", hc = "2d", gc = "-", _c = "left", vc = "text", yc = "Text", bc = "top", xc = "bottom", Sc = "middle", Cc = "normal", wc = "px ", Tc = " ", Ec = "right", Dc = "rtl", Oc = "word", kc = "char", Ac = "none", jc = "…", Mc = [
		"direction",
		"fontFamily",
		"fontSize",
		"fontStyle",
		"fontVariant",
		"padding",
		"align",
		"verticalAlign",
		"lineHeight",
		"text",
		"width",
		"height",
		"wrap",
		"ellipsis",
		"letterSpacing"
	], Nc = null, Fc = class extends J {
		constructor(e) {
			super(cc(e)), this._partialTextX = 0, this._partialTextY = 0, this._baselineShift = 0, this._setTextData();
		}
		_sceneFunc(e) {
			let t = this.textArr, n = t.length;
			if (!this.text()) return;
			let r = this.padding(), i = this.fontSize(), a = this.lineHeight() * i, o = this.direction(), s = this.align(), c = this.getWidth(), l = this.letterSpacing(), u = this.charRenderFunc(), d = this.textDecoration(), f = d.indexOf("underline") !== -1, p = d.indexOf("line-through") !== -1, m, h = a / 2, g = Sc;
			if (!B.legacyTextRendering) {
				let e = this.measureSize("M");
				g = "alphabetic", h = ((e.fontBoundingBoxAscent ?? e.actualBoundingBoxAscent) - (e.fontBoundingBoxDescent ?? e.actualBoundingBoxDescent)) / 2 + a / 2;
			}
			if (o === fc ? o = e.direction : e.setAttr("direction", o), e.setAttr("font", this._getContextFont()), e.setAttr("textBaseline", g), e.setAttr("textAlign", _c), e.translate(r, this._getTextTop()), u) {
				let t = e._getFillStyle(this);
				t !== void 0 && (e.fillStyle = t), this.hasStroke() && e._applyStrokeStyle(this);
			}
			let _ = u ? e.fillStyle : void 0, v = u ? e.strokeStyle : void 0, y = 0;
			for (m = 0; m < n; m++) {
				let d = 0, g = t[m], b = g.text, x = g.width, S = g.lastInParagraph;
				if (e.save(), s === Ec ? d += c - x - r * 2 : s === dc && (d += (c - x - r * 2) / 2), f) {
					e.save(), e.beginPath();
					let t = this._getUnderlineOffset(), n = d, a = h + 0 + t;
					e.moveTo(n, a);
					let o = s === pc && !S ? c - r * 2 : x;
					e.lineTo(n + Math.round(o), a), e.lineWidth = tc(i), e.strokeStyle = e._getFillStyle(this), e.stroke(), e.restore();
				}
				let C = d;
				if (o !== Dc && (l !== 0 || s === pc || u)) {
					let t = b.split(" ").length - 1, n = nc(b);
					for (let i = 0; i < n.length; i++) {
						let a = n[i];
						a === " " && !S && s === pc && (d += (c - r * 2 - x) / t), this._partialTextX = d, this._partialTextY = h + 0, this._partialText = a;
						let o = e.measureText(a).width;
						if (u) {
							e.save(), u({
								char: a,
								index: y,
								x: d,
								y: h + 0,
								lineIndex: m,
								column: i,
								isLastInLine: i === n.length - 1,
								width: o,
								context: e
							});
							let t = e.fillStyle;
							t !== _ && (this._partialFillStyle = t);
							let r = e.strokeStyle;
							r !== v && (this._partialStrokeStyle = r);
						}
						e.fillStrokeShape(this), u && (this._partialFillStyle = void 0, this._partialStrokeStyle = void 0, e.restore()), d += o + l, y++;
					}
				} else l !== 0 && e.setAttr("letterSpacing", `${l}px`), this._partialTextX = d, this._partialTextY = h + 0, this._partialText = b, e.fillStrokeShape(this);
				if (p) {
					e.save(), e.beginPath();
					let t = B.legacyTextRendering ? 0 : -Math.round(i / 4), n = C;
					e.moveTo(n, h + 0 + t);
					let a = s === pc && !S ? c - r * 2 : x;
					e.lineTo(n + Math.round(a), h + 0 + t), e.lineWidth = tc(i), e.strokeStyle = e._getFillStyle(this), e.stroke(), e.restore();
				}
				e.restore(), n > 1 && (h += a);
			}
		}
		_getTextTop() {
			let e = this.padding(), t = this.getHeight() - this.textArr.length * this.lineHeight() * this.fontSize() - e * 2, n = this.verticalAlign();
			return n === Sc ? e + t / 2 : n === xc ? e + t : e;
		}
		_getUnderlineOffset() {
			return this.underlineOffset() ?? Math.round(this.fontSize() / (B.legacyTextRendering ? 2 : 4));
		}
		getSelfRect() {
			let e = super.getSelfRect(), t = this.textArr.length;
			if (!t || this.textDecoration().indexOf("underline") === -1) return e;
			let n = this.fontSize(), r = this.lineHeight() * n, i = this._getTextTop() + t * r - r / 2;
			return B.legacyTextRendering || (i += this._baselineShift), i += this._getUnderlineOffset() + tc(n) / 2, e.height = Math.max(e.y + e.height, i) - e.y, e;
		}
		_getSelfRectForDrawing() {
			let e = this.getSelfRect(), t = this.fontSize(), n = this.padding(), r = this.lineHeight() * t, i = this.getWidth() - n * 2, a = this.align(), o = this.textArr.length * r, s = this._getTextTop(), c = e.x, l = e.x + e.width;
			for (let { text: e, width: t } of this.textArr) {
				let r = n + (a === Ec ? i - t : a === dc ? (i - t) / 2 : 0), o = Math.min(0, this.letterSpacing()) * e.length;
				c = Math.min(c, r + o), l = Math.max(l, r + t - o);
			}
			let u = this.textDecoration().includes("underline"), d = Math.min(e.y, s + (u ? Math.min(0, this._getUnderlineOffset()) : 0));
			return {
				x: c - t,
				y: d - t,
				width: l - c + t * 2,
				height: Math.max(e.y + e.height, s + o) - d + t * 2
			};
		}
		_hitFunc(e) {
			let t = this.getWidth(), n = this.getHeight();
			e.beginPath(), e.rect(0, 0, t, n), e.closePath(), e.fillStrokeShape(this);
		}
		setText(e) {
			let t = V._isString(e) ? e : e == null ? "" : e + "";
			return this._setAttr(vc, t), this;
		}
		getWidth() {
			return this.attrs.width === uc || this.attrs.width === void 0 ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
		}
		getHeight() {
			return this.attrs.height === uc || this.attrs.height === void 0 ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
		}
		getTextWidth() {
			return this.textWidth;
		}
		getTextHeight() {
			return V.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
		}
		measureSize(e) {
			let t = ac(), n = this.fontSize(), r;
			t.save(), t.font = this._getContextFont(), r = t.measureText(e), t.restore();
			let i = n / 100;
			return {
				actualBoundingBoxAscent: r.actualBoundingBoxAscent ?? 71.58203125 * i,
				actualBoundingBoxDescent: r.actualBoundingBoxDescent ?? 0,
				actualBoundingBoxLeft: r.actualBoundingBoxLeft ?? -7.421875 * i,
				actualBoundingBoxRight: r.actualBoundingBoxRight ?? 75.732421875 * i,
				alphabeticBaseline: r.alphabeticBaseline ?? 0,
				emHeightAscent: r.emHeightAscent ?? 100 * i,
				emHeightDescent: r.emHeightDescent ?? -20 * i,
				fontBoundingBoxAscent: r.fontBoundingBoxAscent ?? 91 * i,
				fontBoundingBoxDescent: r.fontBoundingBoxDescent ?? 21 * i,
				hangingBaseline: r.hangingBaseline ?? 72.80000305175781 * i,
				ideographicBaseline: r.ideographicBaseline ?? -21 * i,
				width: r.width,
				height: n
			};
		}
		_getContextFont() {
			return this.fontStyle() + Tc + this.fontVariant() + Tc + (this.fontSize() + wc) + ic(this.fontFamily());
		}
		_addTextLine(e) {
			this.align() === pc && (e = e.trim());
			let t = this._getTextWidth(e);
			return this.textArr.push({
				text: e,
				width: t,
				lastInParagraph: !1
			});
		}
		_getTextWidth(e, t) {
			let n = this.letterSpacing(), r = n ? n * (t ?? nc(e).length) : 0;
			return ac().measureText(e).width + r;
		}
		_setTextData() {
			let e = this.text().split("\n"), t = +this.fontSize(), n = this.lineHeight() * t, r = this.attrs.width, i = this.attrs.height, a = r !== uc && r !== void 0, o = i !== uc && i !== void 0, s = this.padding(), c = r - s * 2, l = i - s * 2, u = 0, d = this.wrap(), f = d !== kc && d !== Ac, p = this.ellipsis(), m = this.measureSize("M");
			this._baselineShift = (m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2, this.textArr = [];
			let h = ac();
			h.font = this._getContextFont(), h.fontKerning = this.direction() !== Dc && (this.letterSpacing() !== 0 || this.align() === pc || this.charRenderFunc()) ? "none" : "auto";
			let g = p ? this._getTextWidth(jc) : 0;
			for (let t = 0, r = e.length; t < r; ++t) {
				let i = e[t], s = this._getTextWidth(i);
				if (a && s > c) {
					let e = nc(i), a = e.length, d = 0, m = (t) => e.slice(d, t).join(""), h = (e) => e === Tc || e === gc, _ = Math.max(1, Math.ceil(a * c / s));
					for (; d < a;) {
						let i = p && o && u + n > l ? g : 0, s = (e) => !(this._getTextWidth(m(e), e - d) + i > c), v = d, y = Math.min(a, d + _);
						for (; s(y) && (v = y, y !== a);) y = Math.min(a, y + (y - d));
						for (; y - v > 1;) {
							let e = v + y >>> 1;
							s(e) ? v = e : y = e;
						}
						if (v === d) break;
						if (v === a) {
							this._addTextLine(m(a)), u += n, o && u + n > l && t < r - 1 && this._tryToAddEllipsisToLastLine();
							break;
						}
						if (f && !h(e[v])) {
							let t = v - 1;
							for (; t >= d && !h(e[t]);) t--;
							t >= d && (v = t + 1);
						}
						if (this._addTextLine(m(v).trimRight()), u += n, this._shouldHandleEllipsis(u)) {
							this._tryToAddEllipsisToLastLine();
							break;
						}
						for (d = v; d < a && !e[d].trim();) d++;
					}
				} else this._addTextLine(i), u += n, o && u + n > l && t < r - 1 && this._tryToAddEllipsisToLastLine();
				if (this.textArr[this.textArr.length - 1] && (this.textArr[this.textArr.length - 1].lastInParagraph = !0), o && u + n > l) break;
			}
			this.textHeight = t, this.textWidth = this.textArr.reduce((e, t) => Math.max(e, t.width), 0);
		}
		_shouldHandleEllipsis(e) {
			let t = +this.fontSize(), n = this.lineHeight() * t, r = this.attrs.height, i = r !== uc && r !== void 0, a = r - this.padding() * 2;
			return this.wrap() === Ac || i && e + n > a;
		}
		_tryToAddEllipsisToLastLine() {
			let e = this.attrs.width, t = e !== uc && e !== void 0, n = e - this.padding() * 2, r = this.ellipsis(), i = this.textArr[this.textArr.length - 1];
			if (!i || !r) return;
			let a = i.text + jc;
			if (t) {
				let e = nc(i.text);
				for (; e.length && this._getTextWidth(a) > n;) e.pop(), a = e.join("") + jc;
				this._getTextWidth(a) > n && (a = "");
			}
			i.text = a, i.width = this._getTextWidth(a);
		}
		getStrokeScaleEnabled() {
			return !0;
		}
		_getStrokePadding() {
			return super._getStrokePadding(2);
		}
		_useBufferCanvas(e, t = this.getAbsoluteOpacity()) {
			if (this.attrs.perfectDrawEnabled === !1) return !1;
			let n = this.textDecoration().indexOf("underline") !== -1 || this.textDecoration().indexOf("line-through") !== -1, r = this.hasShadow();
			return n && r || r && t !== 1 && rc() ? !0 : super._useBufferCanvas(e, t);
		}
	}, Fc.prototype._fillFunc = oc, Fc.prototype._strokeFunc = sc, Fc.prototype.className = yc, Fc.prototype._attrsAffectingSize = Mc.filter((e) => e !== "width" && e !== "height").concat(["textDecoration", "underlineOffset"]), si(Fc, !0), Fc.prototype.on(Mc.map((e) => e + mc).join(" "), function() {
		this._setTextData();
	}), G.overWriteSetter(Fc, "width", va()), G.overWriteSetter(Fc, "height", va()), G.addGetterSetter(Fc, "direction", fc), G.addGetterSetter(Fc, "fontFamily", "Arial"), G.addGetterSetter(Fc, "fontSize", 12, U()), G.addGetterSetter(Fc, "fontStyle", Cc), G.addGetterSetter(Fc, "fontVariant", Cc), G.addGetterSetter(Fc, "padding", 0, U()), G.addGetterSetter(Fc, "align", _c), G.addGetterSetter(Fc, "verticalAlign", bc), G.addGetterSetter(Fc, "lineHeight", 1, U()), G.addGetterSetter(Fc, "wrap", Oc), G.addGetterSetter(Fc, "ellipsis", !1, Sa()), G.addGetterSetter(Fc, "letterSpacing", 0, U()), G.addGetterSetter(Fc, "text", "", ya()), G.addGetterSetter(Fc, "textDecoration", ""), G.addGetterSetter(Fc, "underlineOffset", void 0, U()), G.addGetterSetter(Fc, "charRenderFunc", void 0);
})), Lc, Rc, zc, Bc, Vc, Hc, Uc, Wc, Gc = o((() => {
	K(), Ri(), Yo(), os(), W(), ci(), Ic(), Lc = [
		...Fc.prototype._attrsAffectingSize,
		"width",
		"height",
		"pointerDirection",
		"pointerWidth",
		"pointerHeight"
	].map((e) => e + "Change.konva").join(" "), Rc = "none", zc = "up", Bc = "right", Vc = "down", Hc = "left", Uc = class extends as {
		constructor(e) {
			super(e), this._sync = this._sync.bind(this), this.on("add.konva", function(e) {
				e.child.off(Lc, this._sync).on(Lc, this._sync), this._sync();
			});
		}
		getText() {
			return this.find("Text")[0];
		}
		getTag() {
			return this.find("Tag")[0];
		}
		getWidth() {
			return this.getText().width();
		}
		getHeight() {
			return this.getText().height();
		}
		_sync() {
			let e = this.getText(), t = this.getTag(), n, r, i, a, o, s, c;
			if (e && t) {
				switch (n = e.width(), r = e.height(), i = t.pointerDirection(), a = t.pointerWidth(), c = t.pointerHeight(), o = 0, s = 0, i) {
					case zc:
						o = n / 2, s = -1 * c;
						break;
					case Bc:
						o = n + a, s = r / 2;
						break;
					case Vc:
						o = n / 2, s = r + c;
						break;
					case Hc: o = -1 * a, s = r / 2;
				}
				t.setAttrs({
					x: -1 * o,
					y: -1 * s,
					width: n,
					height: r
				}), e.setAttrs({
					x: -1 * o,
					y: -1 * s
				});
			}
		}
	}, Uc.prototype.className = "Label", si(Uc), Wc = class extends J {
		_sceneFunc(e) {
			let t = this.width(), n = this.height(), r = this.pointerDirection(), i = this.pointerWidth(), a = this.pointerHeight(), o = this.cornerRadius(), [s, c, l, u] = V._cornerRadii(o, t, n);
			e.beginPath(), e.moveTo(s, 0), r === zc && (e.lineTo((t - i) / 2, 0), e.lineTo(t / 2, -1 * a), e.lineTo((t + i) / 2, 0)), e.lineTo(t - c, 0), e.arc(t - c, c, c, Math.PI * 3 / 2, 0, !1), r === Bc && (e.lineTo(t, (n - a) / 2), e.lineTo(t + i, n / 2), e.lineTo(t, (n + a) / 2)), e.lineTo(t, n - l), e.arc(t - l, n - l, l, 0, Math.PI / 2, !1), r === Vc && (e.lineTo((t + i) / 2, n), e.lineTo(t / 2, n + a), e.lineTo((t - i) / 2, n)), e.lineTo(u, n), e.arc(u, n - u, u, Math.PI / 2, Math.PI, !1), r === Hc && (e.lineTo(0, (n + a) / 2), e.lineTo(-1 * i, n / 2), e.lineTo(0, (n - a) / 2)), e.lineTo(0, s), e.arc(s, s, s, Math.PI, Math.PI * 3 / 2, !1), e.closePath(), e.fillStrokeShape(this);
		}
		getSelfRect() {
			let e = this.pointerWidth(), t = this.pointerHeight(), n = this.pointerDirection(), r = this.width(), i = this.height();
			return n === zc || n === Vc ? {
				x: Math.min(0, (r - e) / 2),
				y: n === zc ? -t : 0,
				width: Math.max(r, e),
				height: i + t
			} : n === Hc || n === Bc ? {
				x: n === Hc ? -e : 0,
				y: Math.min(0, (i - t) / 2),
				width: r + e,
				height: Math.max(i, t)
			} : {
				x: 0,
				y: 0,
				width: r,
				height: i
			};
		}
	}, Wc.prototype.className = "Tag", si(Wc, !0), G.addGetterSetter(Wc, "pointerDirection", Rc), G.addGetterSetter(Wc, "pointerWidth", 0, U()), G.addGetterSetter(Wc, "pointerHeight", 0, U()), G.addGetterSetter(Wc, "cornerRadius", 0, _a(4));
})), Kc, qc = o((() => {
	K(), Yo(), ci(), Ri(), W(), Kc = class extends J {
		_getStrokePadding() {
			return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
		}
		_sceneFunc(e) {
			let t = this.cornerRadius(), n = this.width(), r = this.height();
			e.beginPath(), t ? V.drawRoundedRectPath(e, n, r, t) : e.rect(0, 0, n, r), e.closePath(), e.fillStrokeShape(this);
		}
	}, Kc.prototype.className = "Rect", si(Kc, !0), G.addGetterSetter(Kc, "cornerRadius", 0, _a(4));
})), Jc, Yc = o((() => {
	K(), Yo(), W(), ci(), Ri(), Jc = class extends J {
		_sceneFunc(e) {
			let t = this._getPoints(), n = this.radius(), r = this.sides(), i = this.cornerRadius();
			if (t.length) {
				if (e.beginPath(), i) V.drawRoundedPolygonPath(e, t, r, n, i);
				else {
					e.moveTo(t[0].x, t[0].y);
					for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
				}
				e.closePath(), e.fillStrokeShape(this);
			}
		}
		_getPoints() {
			let e = this.attrs.sides, t = this.attrs.radius || 0, n = [];
			for (let r = 0; r < e; r++) n.push({
				x: t * Math.sin(r * 2 * Math.PI / e),
				y: -1 * t * Math.cos(r * 2 * Math.PI / e)
			});
			return n;
		}
		getSelfRect() {
			let e = this._getPoints();
			if (!e.length) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			let t = e[0].x, n = e[0].x, r = e[0].y, i = e[0].y;
			return e.forEach((e) => {
				t = Math.min(t, e.x), n = Math.max(n, e.x), r = Math.min(r, e.y), i = Math.max(i, e.y);
			}), {
				x: t,
				y: r,
				width: n - t,
				height: i - r
			};
		}
		getWidth() {
			return this.radius() * 2;
		}
		getHeight() {
			return this.radius() * 2;
		}
		setWidth(e) {
			this.radius(e / 2);
		}
		setHeight(e) {
			this.radius(e / 2);
		}
	}, Jc.prototype.className = "RegularPolygon", Jc.prototype._centroid = !0, Jc.prototype._attrsAffectingSize = ["radius", "sides"], si(Jc, !0), G.addGetterSetter(Jc, "radius", 0, U()), G.addGetterSetter(Jc, "sides", 0, U()), G.addGetterSetter(Jc, "cornerRadius", 0, _a(4));
})), Xc, Zc, Qc = o((() => {
	K(), Yo(), W(), ci(), Xc = Math.PI * 2, Zc = class extends J {
		_getStrokePadding() {
			return super._getStrokePadding(1);
		}
		_sceneFunc(e) {
			let t = Math.abs(this.innerRadius()), n = Math.abs(this.outerRadius());
			e.beginPath(), e.arc(0, 0, t, 0, Xc, !1), e.moveTo(n, 0), e.arc(0, 0, n, Xc, 0, !0), e.closePath(), e.fillStrokeShape(this);
		}
		getSelfRect() {
			let e = Math.max(Math.abs(this.innerRadius()), Math.abs(this.outerRadius()));
			return {
				x: -e,
				y: -e,
				width: e * 2,
				height: e * 2
			};
		}
		getWidth() {
			return Math.abs(this.outerRadius()) * 2;
		}
		getHeight() {
			return Math.abs(this.outerRadius()) * 2;
		}
		setWidth(e) {
			this.outerRadius(e / 2);
		}
		setHeight(e) {
			this.outerRadius(e / 2);
		}
	}, Zc.prototype.className = "Ring", Zc.prototype._centroid = !0, Zc.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], si(Zc, !0), G.addGetterSetter(Zc, "innerRadius", 0, U()), G.addGetterSetter(Zc, "outerRadius", 0, U());
})), $c, el = o((() => {
	K(), Yo(), ls(), W(), ci(), $c = class extends J {
		constructor(e) {
			super(e), this._updated = !0, this.anim = new cs(() => {
				let e = this._updated;
				return this._updated = !1, e;
			}), this.on("animationChange.konva", function() {
				this.frameIndex(0);
			}), this.on("frameIndexChange.konva", function() {
				this._updated = !0;
			}), this.on("frameRateChange.konva", function() {
				this.anim.isRunning() && (clearInterval(this.interval), this._setInterval());
			});
		}
		_getFrame() {
			let e = this.animation(), t = this.animations()?.[e], n = this.frameIndex(), r = n * 4;
			if (!t || !Number.isInteger(n) || r < 0 || r + 4 > t.length) return;
			let i = this.frameOffsets()?.[e] || [];
			return {
				x: t[r],
				y: t[r + 1],
				width: t[r + 2],
				height: t[r + 3],
				offsetX: i[n * 2] || 0,
				offsetY: i[n * 2 + 1] || 0
			};
		}
		_getStrokePadding() {
			return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
		}
		_sceneFunc(e) {
			let t = this._getFrame();
			if (!t) return;
			let { x: n, y: r, width: i, height: a, offsetX: o, offsetY: s } = t, c = this.image();
			(this.hasFill() || this.hasStroke()) && (e.beginPath(), e.rect(o, s, i, a), e.closePath(), e.fillStrokeShape(this)), c && e.drawImage(c, n, r, i, a, o, s, i, a);
		}
		_hitFunc(e) {
			let { x: t, y: n, width: r, height: i } = this.getSelfRect();
			e.beginPath(), e.rect(t, n, r, i), e.closePath(), e.fillShape(this);
		}
		getSelfRect() {
			let e = this._getFrame();
			return e ? {
				x: e.offsetX,
				y: e.offsetY,
				width: e.width,
				height: e.height
			} : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
		_useBufferCanvas(e, t = this.getAbsoluteOpacity()) {
			return super._useBufferCanvas(!0, t);
		}
		_setInterval() {
			let e = this;
			this.interval = setInterval(function() {
				e._updateIndex();
			}, 1e3 / this.frameRate());
		}
		start() {
			if (this.isRunning()) return;
			let e = this.getLayer();
			this.anim.setLayers(e), this._setInterval(), this.anim.start();
		}
		stop() {
			this.anim.stop(), clearInterval(this.interval);
		}
		destroy() {
			return this.stop(), super.destroy();
		}
		isRunning() {
			return this.anim.isRunning();
		}
		_updateIndex() {
			let e = this.frameIndex(), t = this.animations()?.[this.animation()], n = t ? t.length / 4 : 0;
			this.frameIndex(e < n - 1 ? e + 1 : 0);
		}
	}, $c.prototype.className = "Sprite", si($c, !0), G.addGetterSetter($c, "animation"), G.addGetterSetter($c, "animations"), G.addGetterSetter($c, "frameOffsets"), G.addGetterSetter($c, "image"), G.addGetterSetter($c, "frameIndex", 0, U()), G.addGetterSetter($c, "frameRate", 17, U()), G.backCompat($c, {
		index: "frameIndex",
		getIndex: "getFrameIndex",
		setIndex: "setFrameIndex"
	});
})), tl, nl = o((() => {
	K(), Yo(), W(), ci(), tl = class extends J {
		_sceneFunc(e) {
			let t = this.innerRadius(), n = this.outerRadius(), r = this.numPoints();
			e.beginPath(), e.moveTo(0, 0 - n);
			for (let i = 1; i < r * 2; i++) {
				let a = i % 2 == 0 ? n : t, o = a * Math.sin(i * Math.PI / r), s = -1 * a * Math.cos(i * Math.PI / r);
				e.lineTo(o, s);
			}
			e.closePath(), e.fillStrokeShape(this);
		}
		getSelfRect() {
			let e = Math.max(Math.abs(this.innerRadius()), Math.abs(this.outerRadius()));
			return {
				x: -e,
				y: -e,
				width: e * 2,
				height: e * 2
			};
		}
		getWidth() {
			return this.outerRadius() * 2;
		}
		getHeight() {
			return this.outerRadius() * 2;
		}
		setWidth(e) {
			this.outerRadius(e / 2);
		}
		setHeight(e) {
			this.outerRadius(e / 2);
		}
	}, tl.prototype.className = "Star", tl.prototype._centroid = !0, tl.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], si(tl, !0), G.addGetterSetter(tl, "numPoints", 5, U()), G.addGetterSetter(tl, "innerRadius", 0, U()), G.addGetterSetter(tl, "outerRadius", 0, U());
}));
//#endregion
//#region node_modules/konva/lib/shapes/TextPath.js
function rl(e) {
	e.fillText(this.partialText, 0, 0);
}
function il(e) {
	e.strokeText(this.partialText, 0, 0);
}
var al, ol, sl, cl = o((() => {
	Ri(), K(), Yo(), Ks(), Ic(), W(), ci(), al = "", ol = "normal", sl = class extends J {
		constructor(e) {
			super(e), this.dataArray = [], this._readDataAttribute(), this._setTextData();
		}
		_getTextPathLength() {
			return Gs.getPathLength(this.dataArray);
		}
		_getPointAtLength(e, t) {
			return !this.attrs.data || e > this.pathLength ? null : Gs.getPointAtLengthOfDataArray(e, this.dataArray, t);
		}
		_readDataAttribute() {
			this.dataArray = Gs.parsePathData(this.attrs.data), this.pathLength = this._getTextPathLength();
		}
		_sceneFunc(e) {
			e.setAttr("font", this._getContextFont()), e.setAttr("textBaseline", this.textBaseline()), e.setAttr("textAlign", "left"), e.save();
			let t = this.textDecoration(), n = this.fill(), r = this.fontSize(), i = this.glyphInfo, a = t.indexOf("underline") !== -1, o = t.indexOf("line-through") !== -1;
			a && e.beginPath();
			for (let t = 0; t < i.length; t++) {
				e.save();
				let n = i[t].p0;
				e.translate(n.x, n.y), e.rotate(i[t].rotation), this.partialText = i[t].text, e.fillStrokeShape(this), a && (t === 0 && e.moveTo(0, r / 2 + 1), e.lineTo(i[t].width, r / 2 + 1)), e.restore();
			}
			if (a && (e.strokeStyle = n, e.lineWidth = tc(r), e.stroke()), o) {
				e.beginPath();
				for (let t = 0; t < i.length; t++) {
					e.save();
					let n = i[t].p0;
					e.translate(n.x, n.y), e.rotate(i[t].rotation), t === 0 && e.moveTo(0, 0), e.lineTo(i[t].width, 0), e.restore();
				}
				e.strokeStyle = n, e.lineWidth = tc(r), e.stroke();
			}
			e.restore();
		}
		_hitFunc(e) {
			e.beginPath();
			let t = this.glyphInfo;
			if (t.length >= 1) {
				let n = t[0].p0;
				e.moveTo(n.x, n.y);
			}
			for (let n = 0; n < t.length; n++) {
				let r = t[n].p1;
				e.lineTo(r.x, r.y);
			}
			e.setAttr("lineWidth", this.fontSize()), e.setAttr("strokeStyle", this.colorKey), e.stroke();
		}
		getTextWidth() {
			return this.textWidth;
		}
		getTextHeight() {
			return V.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
		}
		setText(e) {
			return Fc.prototype.setText.call(this, e);
		}
		_getContextFont() {
			return Fc.prototype._getContextFont.call(this);
		}
		_getTextSize(e) {
			let t = ac();
			t.save(), t.font = this._getContextFont(), t.fontKerning = "auto";
			let n = t.measureText(e);
			return t.restore(), {
				width: n.width,
				height: parseInt(`${this.fontSize()}`, 10)
			};
		}
		_setTextData() {
			let e = nc(this.text());
			this.direction() === "rtl" && e.reverse();
			let t = this.kerningFunc(), n = [], r = 0;
			for (let i = 0; i < e.length; i++) {
				let a = 0;
				if (t && i > 0) try {
					a = t(e[i - 1], e[i]) * this.fontSize();
				} catch {}
				n.push({
					char: e[i],
					width: this._getTextSize(e[i]).width,
					kern: a
				}), r += n[i].width + a;
			}
			let { width: i, height: a } = this._getTextSize(this.attrs.text);
			if (this.textWidth = r, this.textHeight = a, this.glyphInfo = [], !this.attrs.data) return null;
			let o = this.letterSpacing(), s = this.align(), c = s === "justify" ? this.text().split(" ").length - 1 : 0, l = Math.max(0, r - i), u = Math.max(this.textWidth + (e.length - 1) * o, 0), d = 0;
			s === "center" && (d = Math.max(0, this.pathLength / 2 - u / 2)), s === "right" && (d = Math.max(0, this.pathLength - u));
			let f = d, p = this.dataArray.some((e, t) => t > 0 && e.command === "M") ? void 0 : {
				index: 0,
				offset: 0
			};
			for (let t = 0; t < n.length; t++) {
				f += n[t].kern;
				let r = this._getPointAtLength(f, p);
				if (!r) return;
				let i = n[t].char, a = n[t].width + (t < n.length - 1 ? o : 0);
				i === " " && s === "justify" && (a += (this.pathLength - u) / c);
				let d = f + a, m = this._getPointAtLength(d > this.pathLength && d - this.pathLength <= l ? this.pathLength : d, p);
				if (!m) return;
				let h = Gs.getLineLength(r.x, r.y, m.x, m.y), g = Math.atan2(m.y - r.y, m.x - r.x);
				this.glyphInfo.push({
					text: e[t],
					rotation: g,
					p0: r,
					p1: m,
					width: h
				}), f += a;
			}
		}
		getSelfRect() {
			if (!this.glyphInfo.length) return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			let e = [];
			this.glyphInfo.forEach(function(t) {
				e.push(t.p0.x), e.push(t.p0.y), e.push(t.p1.x), e.push(t.p1.y);
			});
			let t = V._getPointsRect(e), n = this.fontSize();
			return {
				x: t.x - n / 2,
				y: t.y - n / 2,
				width: t.width + n,
				height: t.height + n
			};
		}
		getStrokeScaleEnabled() {
			return !0;
		}
		_getSelfRectForDrawing() {
			let e = this.getSelfRect(), t = this.fontSize();
			return {
				x: e.x - t,
				y: e.y - t,
				width: e.width + t * 2,
				height: e.height + t * 2
			};
		}
	}, sl.prototype._fillFunc = rl, sl.prototype._strokeFunc = il, sl.prototype._fillFuncHit = rl, sl.prototype._strokeFuncHit = il, sl.prototype.className = "TextPath", sl.prototype._attrsAffectingSize = [
		"text",
		"fontSize",
		"data",
		"align",
		"letterSpacing",
		"kerningFunc",
		"fontFamily",
		"fontStyle",
		"fontVariant",
		"direction"
	], si(sl, !0), sl.prototype.on("dataChange.konva", function() {
		this._readDataAttribute(), this._setTextData();
	}), sl.prototype.on(sl.prototype._attrsAffectingSize.filter((e) => e !== "data").map((e) => e + "Change.konva").join(" "), function() {
		this._setTextData();
	}), G.addGetterSetter(sl, "data"), G.addGetterSetter(sl, "fontFamily", "Arial"), G.addGetterSetter(sl, "fontSize", 12, U()), G.addGetterSetter(sl, "fontStyle", ol), G.addGetterSetter(sl, "align", "left"), G.addGetterSetter(sl, "letterSpacing", 0, U()), G.addGetterSetter(sl, "textBaseline", "middle"), G.addGetterSetter(sl, "fontVariant", ol), G.addGetterSetter(sl, "text", al), G.addGetterSetter(sl, "textDecoration", ""), G.addGetterSetter(sl, "kerningFunc", void 0), G.addGetterSetter(sl, "direction", "inherit");
}));
//#endregion
//#region node_modules/konva/lib/shapes/Transformer.js
function ll(e) {
	return e.startsWith("rotater");
}
function ul(e, t) {
	let n = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g transform="rotate(${e} 12 12)" stroke-linejoin="round"><path d="M5 8 A11 11 0 0 1 16 19" fill="none" stroke="white" stroke-width="4"/><path d="M2 8 L6 4.5 L6 11.5 Z M16 22 L12.5 18 L19.5 18 Z" fill="black" stroke="white"/><path d="M5 8 A11 11 0 0 1 16 19" fill="none" stroke="black" stroke-width="1.5"/></g></svg>`;
	return `url("data:image/svg+xml,${encodeURIComponent(n)}") 12 12, ${t}`;
}
function dl(e, t, n) {
	if (e === "rotater") return n;
	if (ll(e)) {
		let r = e.slice(8);
		return ul(Math.round(V.radToDeg(t) + Sl[r] - 45), n);
	}
	t += V.degToRad(Sl[e] || 0);
	let r = (V.radToDeg(t) % 360 + 360) % 360;
	return V._inRange(r, 337.5, 360) || V._inRange(r, 0, 22.5) ? "ns-resize" : V._inRange(r, 22.5, 67.5) ? "nesw-resize" : V._inRange(r, 67.5, 112.5) ? "ew-resize" : V._inRange(r, 112.5, 157.5) ? "nwse-resize" : V._inRange(r, 157.5, 202.5) ? "ns-resize" : V._inRange(r, 202.5, 247.5) ? "nesw-resize" : V._inRange(r, 247.5, 292.5) ? "ew-resize" : V._inRange(r, 292.5, 337.5) ? "nwse-resize" : (V.error("Transformer has unknown angle for cursor detection: " + r), "pointer");
}
function fl(e) {
	return {
		x: e.x + e.width / 2 * Math.cos(e.rotation) + e.height / 2 * Math.sin(-e.rotation),
		y: e.y + e.height / 2 * Math.cos(e.rotation) + e.width / 2 * Math.sin(e.rotation)
	};
}
function pl(e, t, n) {
	let r = n.x + (e.x - n.x) * Math.cos(t) - (e.y - n.y) * Math.sin(t), i = n.y + (e.x - n.x) * Math.sin(t) + (e.y - n.y) * Math.cos(t);
	return {
		...e,
		rotation: e.rotation + t,
		x: r,
		y: i
	};
}
function ml(e, t) {
	return pl(e, t, fl(e));
}
function hl(e, t, n) {
	let r = t, i = n;
	for (let n = 0; n < e.length; n++) {
		let a = B.getAngle(e[n]), o = Math.abs(a - t) % (Math.PI * 2), s = Math.min(o, Math.PI * 2 - o);
		s < i && (i = s, r = a);
	}
	return r;
}
function gl(e, t, n) {
	let r = V.degToRad(e.rotateAnchorAngle()), i = Math.sin(r), a = -Math.cos(r), o = t / 2, s = n / 2, c = Infinity;
	a < 0 ? c = Math.min(c, -s / a) : a > 0 && (c = Math.min(c, (n - s) / a)), i < 0 ? c = Math.min(c, -o / i) : i > 0 && (c = Math.min(c, (t - o) / i));
	let l = o + i * c, u = s + a * c, d = e.rotateAnchorOffset() + e.padding();
	return {
		edgeX: l,
		edgeY: u,
		endX: l + i * d,
		endY: u + a * d
	};
}
function _l(e) {
	return e instanceof Array || V.warn("enabledAnchors value should be an array"), e instanceof Array && e.forEach(function(e) {
		El.indexOf(e) === -1 && V.warn("Unknown anchor name: " + e + ". Available names are: " + El.join(", "));
	}), e || [];
}
var vl, yl, bl, xl, Sl, Cl, wl, Tl, El, Dl, Y, Ol = o((() => {
	Ri(), K(), Wa(), Yo(), qc(), os(), Ka(), ci(), W(), vl = "tr-konva", yl = [
		"resizeEnabledChange",
		"rotateAnchorOffsetChange",
		"rotateAnchorAngleChange",
		"rotateEnabledChange",
		"rotateModeChange",
		"enabledAnchorsChange",
		"anchorSizeChange",
		"borderEnabledChange",
		"shouldOverdrawWholeAreaChange",
		"borderStrokeChange",
		"borderStrokeWidthChange",
		"borderDashChange",
		"anchorStrokeChange",
		"anchorStrokeWidthChange",
		"anchorFillChange",
		"anchorCornerRadiusChange",
		"ignoreStrokeChange",
		"anchorStyleFuncChange",
		"paddingChange"
	].map((e) => e + `.${vl}`).join(" "), bl = "nodesRect", xl = [
		"widthChange",
		"heightChange",
		"scaleXChange",
		"scaleYChange",
		"skewXChange",
		"skewYChange",
		"rotationChange",
		"offsetXChange",
		"offsetYChange",
		"transformsEnabledChange",
		"strokeWidthChange",
		"strokeChange",
		"selfRectFuncChange",
		"strokeLinearGradientColorStopsChange",
		"strokeScaleEnabledChange",
		"strokeEnabledChange",
		"draggableChange"
	], Sl = {
		"top-left": -45,
		"top-center": 0,
		"top-right": 45,
		"middle-right": -90,
		"middle-left": 90,
		"bottom-left": -135,
		"bottom-center": 180,
		"bottom-right": 135
	}, Cl = "ontouchstart" in B._global, wl = [
		"rotater-top-left",
		"rotater-top-right",
		"rotater-bottom-left",
		"rotater-bottom-right"
	], Tl = Math.PI / 12, El = [
		"top-left",
		"top-center",
		"top-right",
		"middle-right",
		"middle-left",
		"bottom-left",
		"bottom-center",
		"bottom-right"
	], Dl = /* @__PURE__ */ new Set(), Y = class extends as {
		static _isLayerTransforming(e) {
			for (let t of Dl) if (t.getLayer() === e || t._nodes.some((t) => t.getLayer() === e)) return !0;
			return !1;
		}
		constructor(e) {
			super(e), this._movingAnchorName = null, this._anchors = {}, this._transforming = !1, this._fitting = !1, this._transformWindow = null, this._elementsCreated = !1, this._updateScheduled = !1, this._subtreeChanged = !1, this._createElements(), this._handleMouseMove = this._handleMouseMove.bind(this), this._handleMouseUp = this._handleMouseUp.bind(this), this.update = this.update.bind(this), this.on(yl, (e) => {
				e.type === "ignoreStrokeChange" && this._resetTransformCache(), this.update();
			}), this.on(`rotationChange.${vl}`, () => this._clearCache(bl)), this.getNode() && this.update();
		}
		attachTo(e) {
			return this.setNode(e), this;
		}
		setNode(e) {
			return V.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."), this.setNodes([e]);
		}
		getNode() {
			return this._nodes && this._nodes[0];
		}
		_getEventNamespace() {
			return vl + this._id;
		}
		setNodes(e = []) {
			this._nodes && this._nodes.length && this.detach();
			let t = new Set(e);
			for (let e of t) e.isAncestorOf(this) && (V.error("Konva.Transformer cannot be an a child of the node you are trying to attach"), t.delete(e));
			let n = Array.from(t).filter((e) => {
				for (let n = e.getParent(); n; n = n.getParent()) if (t.has(n)) return !1;
				return !0;
			});
			return this._nodes = e = n, e.length === 1 && this.useSingleNodeRotation() ? this.rotation(e[0].getAbsoluteRotation()) : this.rotation(0), this._nodes.forEach((e) => {
				let t = () => {
					var t;
					this._fitting ? (t = this._nodeRectCache) == null || t.delete(e) : (this.nodes().length === 1 && this.useSingleNodeRotation() && this.rotation(this.nodes()[0].getAbsoluteRotation()), this._resetTransformCache(e), this.isDragging() || this._scheduleUpdate());
				};
				if (e._attrsAffectingSize.length) {
					let n = e._attrsAffectingSize.map((e) => e + "Change." + this._getEventNamespace()).join(" ");
					e.on(n, t);
				}
				e.on(xl.map((e) => e + `.${this._getEventNamespace()}`).join(" "), t), e.on(`absoluteTransformChange.${this._getEventNamespace()}`, t), e instanceof Ga && e._addSubtreeObserver(this), e.on(`destroy.${this._getEventNamespace()}`, () => {
					this.setNodes(this._nodes.filter((t) => t !== e));
				}), this._proxyDrag(e);
			}), this._resetTransformCache(), this._elementsCreated && this.update(), this;
		}
		_proxyDrag(e) {
			let t;
			e.on(`dragstart.${this._getEventNamespace()}`, (n) => {
				t = e.getAbsolutePosition(), !this.isDragging() && e !== this._back && this.startDrag(n, !1);
			}), e.on(`dragmove.${this._getEventNamespace()}`, (n) => {
				if (!t) return;
				let r = e.getAbsolutePosition(), i = r.x - t.x, a = r.y - t.y;
				this.nodes().forEach((t) => {
					if (t === e || t.isDragging()) return;
					let r = t.getAbsolutePosition();
					t.setAbsolutePosition({
						x: r.x + i,
						y: r.y + a
					}), t.startDrag(n);
				}), t = null;
			});
		}
		getNodes() {
			return this._nodes || [];
		}
		getActiveAnchor() {
			return this._movingAnchorName;
		}
		detach() {
			var e;
			this._nodes && this._nodes.forEach((e) => {
				e.off("." + this._getEventNamespace()), e._removeSubtreeObserver(this);
			}), this._nodes = [], this._resetTransformCache(), (e = this.getLayer()) == null || e.batchDraw();
		}
		_resetTransformCache(e) {
			var t, n;
			e ? (t = this._nodeRectCache) == null || t.delete(e) : (n = this._nodeRectCache) == null || n.clear(), this._clearCache(bl), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform");
		}
		_onSubtreeChange(e) {
			var t;
			this._fitting || (!this._subtreeChanged || this._cache[bl]) && (this._resetTransformCache(e), this._subtreeChanged || (this._subtreeChanged = !0, V.requestAnimFrame(() => this._syncSubtreeChange(), this.getStage()?._getOwnerWindow()), (t = this.getLayer()) == null || t.batchDraw()));
		}
		_syncSubtreeChange() {
			this._subtreeChanged && this._nodes?.length && !this.isDragging() && this._update();
		}
		drawScene(e, t) {
			return this._syncSubtreeChange(), super.drawScene(e, t);
		}
		drawHit(e, t) {
			return this._syncSubtreeChange(), super.drawHit(e, t);
		}
		_getNodeRect() {
			return this._getCache(bl, this.__getNodeRect);
		}
		__getNodeRect() {
			if (!this.getNode()) return {
				x: -1e8,
				y: -1e8,
				width: 0,
				height: 0,
				rotation: 0
			};
			let e = B.getAngle(this.rotation()), t = this.ignoreStroke(), n = new fi();
			n.rotate(-e);
			let r = this._nodeRectCache || (this._nodeRectCache = /* @__PURE__ */ new Map()), i = Infinity, a = Infinity, o = -Infinity, s = -Infinity;
			for (let c of this.nodes()) {
				let l = c instanceof J && c.getSelfRect === J.prototype.getSelfRect && !c.attrs.selfRectFunc && !c._hasCachedAncestor(), u = l ? c.width() : 0, d = l ? c.height() : 0;
				l && (c._attrsVersion ?? (c._attrsVersion = 0));
				let f = l ? r.get(c) : void 0;
				if (!f || f.rotation !== e || f.ignoreStroke !== t || f.version !== c._attrsVersion || f.width !== u || f.height !== d) {
					let i = c.getAbsoluteTransform(), [a, o, s, p] = i.getMatrix(), m = a * p - o * s === 0, h = c.getClientRect({
						skipTransform: !m,
						skipShadow: !0,
						skipStroke: t
					}), g = [
						{
							x: h.x,
							y: h.y
						},
						{
							x: h.x + h.width,
							y: h.y
						},
						{
							x: h.x + h.width,
							y: h.y + h.height
						},
						{
							x: h.x,
							y: h.y + h.height
						}
					];
					m && (i = new fi()), f = {
						rotation: e,
						ignoreStroke: t,
						width: u,
						height: d,
						version: c._attrsVersion || 0,
						minX: Infinity,
						minY: Infinity,
						maxX: -Infinity,
						maxY: -Infinity
					};
					for (let e of g) {
						let t = n.point(i.point(e));
						f.minX = Math.min(f.minX, t.x), f.minY = Math.min(f.minY, t.y), f.maxX = Math.max(f.maxX, t.x), f.maxY = Math.max(f.maxY, t.y);
					}
					l && r.set(c, f);
				}
				i = Math.min(i, f.minX), a = Math.min(a, f.minY), o = Math.max(o, f.maxX), s = Math.max(s, f.maxY);
			}
			n.invert();
			let c = n.point({
				x: i,
				y: a
			});
			return {
				x: c.x,
				y: c.y,
				width: o - i,
				height: s - a,
				rotation: B.getAngle(this.rotation())
			};
		}
		getX() {
			return this._getNodeRect().x;
		}
		getY() {
			return this._getNodeRect().y;
		}
		getWidth() {
			return this._getNodeRect().width;
		}
		getHeight() {
			return this._getNodeRect().height;
		}
		_createElements() {
			this._createBack(), wl.forEach((e) => {
				this._createAnchor(e, "_rotate-zone").setAttrs({
					fill: "transparent",
					strokeEnabled: !1,
					visible: !1
				});
			}), El.forEach((e) => {
				this._createAnchor(e);
			}), this._createAnchor("rotater"), this._elementsCreated = !0;
		}
		_createAnchor(e, t = "_anchor") {
			let n = new Kc({
				stroke: "rgb(0, 161, 255)",
				fill: "white",
				strokeWidth: 1,
				name: e + " " + t,
				dragDistance: 0,
				draggable: !0,
				hitStrokeWidth: Cl ? 10 : "auto"
			});
			this._anchors[e] = n;
			let r = this;
			return n.on("mousedown touchstart", function(e) {
				r._handleMouseDown(e);
			}), n.on("dragstart", (e) => {
				n.stopDrag(), e.cancelBubble = !0;
			}), n.on("dragend", (e) => {
				e.cancelBubble = !0;
			}), n.on("mouseenter", () => {
				this.isTransforming() || (this._setAnchorCursor(e), this._cursorChange = !0);
			}), n.on("mouseout", () => {
				this._cursorChange = !1, !this.isTransforming() && n.getStage().content && (n.getStage().content.style.cursor = "");
			}), this.add(n), n;
		}
		_setAnchorCursor(e, t = B.getAngle(this.rotation())) {
			let n = this.getStage()?.content;
			n && (n.style.cursor = dl(e, t, this.rotateAnchorCursor()));
		}
		_createBack() {
			let e = new J({
				name: "back",
				width: 0,
				height: 0,
				sceneFunc(e, t) {
					let n = t.getParent();
					if (!n.borderEnabled()) return;
					let r = n.padding(), i = t.width(), a = t.height();
					if (e.beginPath(), e.rect(-r, -r, i + r * 2, a + r * 2), n.rotateEnabled() && n.rotateLineVisible() && n.rotateMode() !== "corners") {
						let t = gl(n, i, a);
						e.moveTo(t.edgeX, t.edgeY), e.lineTo(t.endX, t.endY);
					}
					e.fillStrokeShape(t);
				},
				hitFunc: (e, t) => {
					if (!this.shouldOverdrawWholeArea()) return;
					let n = this.padding();
					e.beginPath(), e.rect(-n, -n, t.width() + n * 2, t.height() + n * 2), e.fillStrokeShape(t);
				}
			});
			this._back = e, this.add(e), this._proxyDrag(e), e.on("dragstart", (e) => {
				e.cancelBubble = !0;
			}), e.on("dragmove", (e) => {
				e.cancelBubble = !0;
			}), e.on("dragend", (e) => {
				e.cancelBubble = !0;
			}), this.on("dragmove", (e) => {
				this.update();
			});
		}
		_handleMouseDown(e) {
			if (e.evt.button !== void 0 && !B.dragButtons.includes(e.evt.button) || this._transforming) return;
			this._movingAnchorName = e.target.name().split(" ")[0];
			let t = this._getNodeRect(), n = t.width, r = t.height, i = Math.sqrt(n ** 2 + r ** 2);
			this.sin = Math.abs(r / i), this.cos = Math.abs(n / i);
			let a = this.getStage()?._getOwnerWindow();
			this._transformWindow = a || null, a && (a.addEventListener("mousemove", this._handleMouseMove), a.addEventListener("touchmove", this._handleMouseMove), a.addEventListener("mouseup", this._handleMouseUp, !0), a.addEventListener("touchend", this._handleMouseUp, !0), a.addEventListener("touchcancel", this._handleMouseUp, !0)), this._transforming = !0, this._pointerId = e.pointerId ?? V._getFirstPointerId(e.evt);
			let o = e.target.getAbsolutePosition(), s = e.target.getStage()._getPointerById(this._pointerId);
			if (this._anchorDragOffset = {
				x: s.x - o.x,
				y: s.y - o.y
			}, ll(this._movingAnchorName)) {
				let e = fl(t);
				this._rotateStart = {
					pointerAngle: Math.atan2(s.y - e.y, s.x - e.x),
					rotation: t.rotation
				};
			}
			Dl.add(this), this._fire("transformstart", {
				evt: e.evt,
				target: this.getNode()
			}), this._nodes.forEach((t) => {
				t._fire("transformstart", {
					evt: e.evt,
					target: t
				});
			});
		}
		_handleMouseMove(e) {
			var t;
			(t = this.getStage()) == null || t._batchEvents(() => this._moveTransform(e));
		}
		_moveTransform(e) {
			this._syncSubtreeChange();
			let t, n, r, i = this._anchors[this._movingAnchorName], a = i.getStage();
			a.setPointersPositions(e);
			let o = a._getPointerById(this._pointerId);
			if (!o) return;
			let s = {
				x: o.x - this._anchorDragOffset.x,
				y: o.y - this._anchorDragOffset.y
			}, c = i.getAbsolutePosition();
			this.anchorDragBoundFunc() && (s = this.anchorDragBoundFunc()(c, s, e)), i.setAbsolutePosition(s);
			let l = i.getAbsolutePosition();
			if (c.x === l.x && c.y === l.y) return;
			if (ll(this._movingAnchorName)) {
				let t = this._getNodeRect(), n = fl(t), r = this._rotateStart, i = {
					x: l.x + this._anchorDragOffset.x,
					y: l.y + this._anchorDragOffset.y
				}, a = Math.atan2(i.y - n.y, i.x - n.x), o = r.rotation + a - r.pointerAngle, s;
				if (e.shiftKey && this.shiftBehavior() !== "none") s = Math.round(o / Tl) * Tl;
				else {
					let e = B.getAngle(this.rotationSnapTolerance());
					s = hl(this.rotationSnaps(), o, e);
				}
				this._movingAnchorName !== "rotater" && this._setAnchorCursor(this._movingAnchorName, s);
				let c = ml(t, s - t.rotation);
				this._fitNodesInto(c, e);
				return;
			}
			let u = this.shiftBehavior(), d;
			d = u === "inverted" ? this.keepRatio() && !e.shiftKey : u === "none" ? this.keepRatio() : this.keepRatio() || e.shiftKey;
			let f = this.centeredScaling() || e.altKey, p = !1;
			if (this._movingAnchorName === "top-left") {
				if (d) {
					p = !0;
					let e = f ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this._anchors["bottom-right"].x(),
						y: this._anchors["bottom-right"].y()
					};
					r = Math.sqrt((e.x - i.x()) ** 2 + (e.y - i.y()) ** 2);
					let a = this._anchors["top-left"].x() > e.x ? -1 : 1, o = this._anchors["top-left"].y() > e.y ? -1 : 1;
					t = r * this.cos * a, n = r * this.sin * o, this._anchors["top-left"].x(e.x - t), this._anchors["top-left"].y(e.y - n);
				}
			} else if (this._movingAnchorName === "top-center") this._anchors["top-left"].y(i.y());
			else if (this._movingAnchorName === "top-right") {
				if (d) {
					p = !0;
					let e = f ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this._anchors["bottom-left"].x(),
						y: this._anchors["bottom-left"].y()
					};
					r = Math.sqrt((i.x() - e.x) ** 2 + (e.y - i.y()) ** 2);
					let a = this._anchors["top-right"].x() < e.x ? -1 : 1, o = this._anchors["top-right"].y() > e.y ? -1 : 1;
					t = r * this.cos * a, n = r * this.sin * o, this._anchors["top-right"].x(e.x + t), this._anchors["top-right"].y(e.y - n);
				}
				var m = i.position();
				this._anchors["top-left"].y(m.y), this._anchors["bottom-right"].x(m.x);
			} else if (this._movingAnchorName === "middle-left") this._anchors["top-left"].x(i.x());
			else if (this._movingAnchorName === "middle-right") this._anchors["bottom-right"].x(i.x());
			else if (this._movingAnchorName === "bottom-left") {
				if (d) {
					p = !0;
					let e = f ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this._anchors["top-right"].x(),
						y: this._anchors["top-right"].y()
					};
					r = Math.sqrt((e.x - i.x()) ** 2 + (i.y() - e.y) ** 2);
					let a = e.x < i.x() ? -1 : 1, o = i.y() < e.y ? -1 : 1;
					t = r * this.cos * a, n = r * this.sin * o, i.x(e.x - t), i.y(e.y + n);
				}
				m = i.position(), this._anchors["top-left"].x(m.x), this._anchors["bottom-right"].y(m.y);
			} else if (this._movingAnchorName === "bottom-center") this._anchors["bottom-right"].y(i.y());
			else if (this._movingAnchorName === "bottom-right") {
				if (d) {
					p = !0;
					let e = f ? {
						x: this.width() / 2,
						y: this.height() / 2
					} : {
						x: this._anchors["top-left"].x(),
						y: this._anchors["top-left"].y()
					};
					r = Math.sqrt((i.x() - e.x) ** 2 + (i.y() - e.y) ** 2);
					let a = this._anchors["bottom-right"].x() < e.x ? -1 : 1, o = this._anchors["bottom-right"].y() < e.y ? -1 : 1;
					t = r * this.cos * a, n = r * this.sin * o, this._anchors["bottom-right"].x(e.x + t), this._anchors["bottom-right"].y(e.y + n);
				}
			} else console.error(/* @__PURE__ */ Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
			if (f = this.centeredScaling() || e.altKey, f) {
				let e = this._anchors["top-left"], t = this._anchors["bottom-right"], n = e.x(), r = e.y(), i = this.getWidth() - t.x(), a = this.getHeight() - t.y();
				t.move({
					x: -n,
					y: -r
				}), e.move({
					x: i,
					y: a
				});
			}
			let h = this._anchors["top-left"].getAbsolutePosition();
			t = h.x, n = h.y;
			let g = this._anchors["bottom-right"].x() - this._anchors["top-left"].x(), _ = this._anchors["bottom-right"].y() - this._anchors["top-left"].y();
			this._fitNodesInto({
				x: t,
				y: n,
				width: g,
				height: _,
				rotation: B.getAngle(this.rotation())
			}, e, p);
		}
		_handleMouseUp(e) {
			let t = this.getStage();
			t && (t.setPointersPositions(e), !t._changedPointerPositions.some((e) => e.id === this._pointerId)) || (t ? t._batchEvents(() => this._removeEvents(e)) : this._removeEvents(e));
		}
		getAbsoluteTransform(e) {
			let t = this.getTransform();
			return e ? e.getAbsoluteTransform().copy().invert().multiply(t) : t;
		}
		_removeEvents(e) {
			var t;
			if (this._transforming) {
				this._transforming = !1;
				let n = this.getStage()?.content;
				n && !this._cursorChange && (n.style.cursor = "");
				let r = this._transformWindow;
				this._transformWindow = null, r && (r.removeEventListener("mousemove", this._handleMouseMove), r.removeEventListener("touchmove", this._handleMouseMove), r.removeEventListener("mouseup", this._handleMouseUp, !0), r.removeEventListener("touchend", this._handleMouseUp, !0), r.removeEventListener("touchcancel", this._handleMouseUp, !0));
				let i = this.getNode();
				Dl.delete(this), this._fire("transformend", {
					evt: e,
					target: i
				}), (t = this.getLayer()) == null || t.batchDraw(), i && this._nodes.forEach((t) => {
					var n;
					t._fire("transformend", {
						evt: e,
						target: t
					}), (n = t.getLayer()) == null || n.batchDraw();
				}), this._movingAnchorName = null;
			}
		}
		_fitNodesInto(e, t, n = !1) {
			this._fitting = !0;
			try {
				return this._doFitNodesInto(e, t, n);
			} finally {
				this._fitting = !1;
			}
		}
		_doFitNodesInto(e, t, n = !1) {
			let r = this._getNodeRect();
			if (!r.width || !r.height || V._inRange(e.width, -this.padding() * 2 - 1, 1) || V._inRange(e.height, -this.padding() * 2 - 1, 1)) {
				this.update();
				return;
			}
			let i = new fi();
			i.rotate(B.getAngle(this.rotation()));
			let a = n ? 0 : this.padding() * 2, o = null, s = null;
			if (this._movingAnchorName && e.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
				let t = i.point({
					x: -a,
					y: 0
				});
				e.x += t.x, e.y += t.y, e.width += a, o = {
					axis: "width",
					from: "left",
					to: "right",
					offset: t
				};
			} else if (this._movingAnchorName && e.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
				let t = i.point({
					x: a,
					y: 0
				});
				e.width += a, o = {
					axis: "width",
					from: "right",
					to: "left",
					offset: t
				};
			}
			if (this._movingAnchorName && e.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
				let t = i.point({
					x: 0,
					y: -a
				});
				e.x += t.x, e.y += t.y, e.height += a, s = {
					axis: "height",
					from: "top",
					to: "bottom",
					offset: t
				};
			} else if (this._movingAnchorName && e.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
				let t = i.point({
					x: 0,
					y: a
				});
				e.height += a, s = {
					axis: "height",
					from: "bottom",
					to: "top",
					offset: t
				};
			}
			if (this.boundBoxFunc()) {
				let t = this.boundBoxFunc()(r, e);
				t ? e = t : V.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
			}
			for (let t of [o, s]) t && e[t.axis] < 0 && this._movingAnchorName && (this._movingAnchorName = this._movingAnchorName.replace(t.from, t.to), this._anchorDragOffset.x -= t.offset.x, this._anchorDragOffset.y -= t.offset.y);
			let c = 1e7, l = new fi();
			l.translate(r.x, r.y), l.rotate(r.rotation), l.scale(r.width / c, r.height / c);
			let u = new fi(), d = e.width / c, f = e.height / c;
			this.flipEnabled() === !1 ? (u.translate(e.x, e.y), u.rotate(e.rotation), u.translate(e.width < 0 ? e.width : 0, e.height < 0 ? e.height : 0), u.scale(Math.abs(d), Math.abs(f))) : (u.translate(e.x, e.y), u.rotate(e.rotation), u.scale(d, f));
			let p = u.multiply(l.invert()), m = /* @__PURE__ */ new Set();
			this._nodes.forEach((e) => {
				if (!e.getStage()) return;
				let t = e.getParent().getAbsoluteTransform(), n = e.getTransform().copy();
				n.translate(e.offsetX(), e.offsetY());
				let r = new fi();
				r.multiply(t.copy().invert()).multiply(p).multiply(t).multiply(n);
				let i = r.decompose();
				e.setAttrs(i);
				let a = e.getLayer();
				a && m.add(a);
			}), this.rotation(V._getRotation(e.rotation)), this._nodes.forEach((e) => {
				this._fire("transform", {
					evt: t,
					target: e
				}), e._fire("transform", {
					evt: t,
					target: e
				});
			}), this._resetTransformCache(), this.update(), m.add(this.getLayer()), m.forEach((e) => e && e.batchDraw());
		}
		_scheduleUpdate() {
			this._updateScheduled || (this._updateScheduled = !0, q._runAfterAbsTransformCascade(() => {
				this._updateScheduled = !1, !(!this._nodes?.length || this._fitting || this.isDragging()) && this._update();
			}));
		}
		forceUpdate() {
			this._resetTransformCache(), this.update();
		}
		update() {
			this._lastNodeRect = void 0, this._update();
		}
		_update() {
			var e;
			this._subtreeChanged = !1;
			let t = this._getNodeRect();
			this._updateElements(t);
			let n = this.nodes().some((e) => e.draggable());
			this._back.draggable() !== n && this._back.draggable(n);
			let r = this.anchorStyleFunc();
			r && Object.values(this._anchors).forEach((e) => e.hasName("_anchor") && r(e)), (e = this.getLayer()) == null || e.batchDraw();
		}
		_updateElements(e) {
			let t = this._lastNodeRect;
			if (t && !this.anchorStyleFunc() && e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height && e.rotation === t.rotation) return;
			this._lastNodeRect = { ...e };
			let n = e.width, r = e.height, i = this.enabledAnchors(), a = this.resizeEnabled(), o = this.padding(), s = this.anchorSize();
			Object.values(this._anchors).filter((e) => e.hasName("_anchor")).forEach((e) => {
				e.setAttrs({
					width: s,
					height: s,
					offsetX: s / 2,
					offsetY: s / 2,
					stroke: this.anchorStroke(),
					strokeWidth: this.anchorStrokeWidth(),
					fill: this.anchorFill(),
					cornerRadius: this.anchorCornerRadius()
				});
			}), this._anchors["top-left"].setAttrs({
				x: 0,
				y: 0,
				offsetX: s / 2 + o,
				offsetY: s / 2 + o,
				visible: a && i.indexOf("top-left") >= 0
			}), this._anchors["top-center"].setAttrs({
				x: n / 2,
				y: 0,
				offsetY: s / 2 + o,
				visible: a && i.indexOf("top-center") >= 0
			}), this._anchors["top-right"].setAttrs({
				x: n,
				y: 0,
				offsetX: s / 2 - o,
				offsetY: s / 2 + o,
				visible: a && i.indexOf("top-right") >= 0
			}), this._anchors["middle-left"].setAttrs({
				x: 0,
				y: r / 2,
				offsetX: s / 2 + o,
				visible: a && i.indexOf("middle-left") >= 0
			}), this._anchors["middle-right"].setAttrs({
				x: n,
				y: r / 2,
				offsetX: s / 2 - o,
				visible: a && i.indexOf("middle-right") >= 0
			}), this._anchors["bottom-left"].setAttrs({
				x: 0,
				y: r,
				offsetX: s / 2 + o,
				offsetY: s / 2 - o,
				visible: a && i.indexOf("bottom-left") >= 0
			}), this._anchors["bottom-center"].setAttrs({
				x: n / 2,
				y: r,
				offsetY: s / 2 - o,
				visible: a && i.indexOf("bottom-center") >= 0
			}), this._anchors["bottom-right"].setAttrs({
				x: n,
				y: r,
				offsetX: s / 2 - o,
				offsetY: s / 2 - o,
				visible: a && i.indexOf("bottom-right") >= 0
			});
			let c = this.rotateMode(), l = gl(this, n, r);
			this._anchors.rotater.setAttrs({
				x: l.endX,
				y: l.endY,
				visible: this.rotateEnabled() && c !== "corners"
			});
			let u = s * 2, d = this.rotateEnabled() && c !== "handle", f = -o - u;
			wl.forEach((e) => {
				this._anchors[e].setAttrs({
					x: e.includes("left") ? f : n + o,
					y: e.includes("top") ? f : r + o,
					width: u,
					height: u,
					visible: d
				});
			}), this._back.setAttrs({
				width: n,
				height: r,
				visible: this.borderEnabled() || this.shouldOverdrawWholeArea(),
				stroke: this.borderStroke(),
				strokeWidth: this.borderStrokeWidth(),
				dash: this.borderDash(),
				x: 0,
				y: 0
			});
		}
		isTransforming() {
			return this._transforming;
		}
		stopTransform() {
			this._transforming && this._removeEvents();
		}
		destroy() {
			return this.getStage() && this._cursorChange && this.getStage().content && (this.getStage().content.style.cursor = ""), as.prototype.destroy.call(this), this.detach(), this._removeEvents(), this;
		}
		add(...e) {
			return this._elementsCreated ? (V.error("You cannot add external nodes to the Transformer. Use tr.nodes([node]) instead."), this) : super.add(...e);
		}
		toObject() {
			return q.prototype.toObject.call(this);
		}
		clone(e) {
			return q.prototype.clone.call(this, e);
		}
		getClientRect(e) {
			return this.nodes().length > 0 ? super.getClientRect(e) : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
	}, Y.isTransforming = () => Dl.size > 0, Y.prototype.className = "Transformer", si(Y), G.addGetterSetter(Y, "enabledAnchors", El, _l), G.addGetterSetter(Y, "flipEnabled", !0, Sa()), G.addGetterSetter(Y, "resizeEnabled", !0), G.addGetterSetter(Y, "anchorSize", 10, U()), G.addGetterSetter(Y, "rotateEnabled", !0), G.addGetterSetter(Y, "rotateLineVisible", !0), G.addGetterSetter(Y, "rotationSnaps", []), G.addGetterSetter(Y, "rotateAnchorOffset", 50, U()), G.addGetterSetter(Y, "rotateAnchorAngle", 0, U()), G.addGetterSetter(Y, "rotateAnchorCursor", "crosshair"), G.addGetterSetter(Y, "rotateMode", "handle"), G.addGetterSetter(Y, "rotationSnapTolerance", 5, U()), G.addGetterSetter(Y, "borderEnabled", !0), G.addGetterSetter(Y, "anchorStroke", "rgb(0, 161, 255)"), G.addGetterSetter(Y, "anchorStrokeWidth", 1, U()), G.addGetterSetter(Y, "anchorFill", "white"), G.addGetterSetter(Y, "anchorCornerRadius", 0, U()), G.addGetterSetter(Y, "borderStroke", "rgb(0, 161, 255)"), G.addGetterSetter(Y, "borderStrokeWidth", 1, U()), G.addGetterSetter(Y, "borderDash"), G.addGetterSetter(Y, "keepRatio", !0), G.addGetterSetter(Y, "shiftBehavior", "default"), G.addGetterSetter(Y, "centeredScaling", !1), G.addGetterSetter(Y, "ignoreStroke", !1), G.addGetterSetter(Y, "padding", 0, U()), G.addGetterSetter(Y, "nodes"), G.addGetterSetter(Y, "node"), G.addGetterSetter(Y, "boundBoxFunc"), G.addGetterSetter(Y, "anchorDragBoundFunc"), G.addGetterSetter(Y, "anchorStyleFunc"), G.addGetterSetter(Y, "shouldOverdrawWholeArea", !1), G.addGetterSetter(Y, "useSingleNodeRotation", !0), G.backCompat(Y, {
		lineEnabled: "borderEnabled",
		rotateHandlerOffset: "rotateAnchorOffset",
		enabledHandlers: "enabledAnchors"
	});
})), kl, Al = o((() => {
	K(), Yo(), ci(), W(), kl = class extends J {
		_sceneFunc(e) {
			e.beginPath(), e.arc(0, 0, Math.abs(this.radius()), 0, B.getAngle(this.angle()), this.clockwise()), e.lineTo(0, 0), e.closePath(), e.fillStrokeShape(this);
		}
		getWidth() {
			return Math.abs(this.radius()) * 2;
		}
		getHeight() {
			return Math.abs(this.radius()) * 2;
		}
		setWidth(e) {
			this.radius(e / 2);
		}
		setHeight(e) {
			this.radius(e / 2);
		}
	}, kl.prototype.className = "Wedge", kl.prototype._centroid = !0, kl.prototype._attrsAffectingSize = ["radius"], si(kl, !0), G.addGetterSetter(kl, "radius", 0, U()), G.addGetterSetter(kl, "angle", 0, U()), G.addGetterSetter(kl, "clockwise", !1), G.backCompat(kl, {
		angleDeg: "angle",
		getAngleDeg: "getAngle",
		setAngleDeg: "setAngle"
	});
}));
//#endregion
//#region node_modules/konva/lib/filters/Blur.js
function jl() {
	this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
}
function Ml(e, t) {
	return t === 255 ? e : e * t / 255;
}
function Nl(e, t) {
	let n = e.data, r = e.width, i = e.height, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, ee = t + t + 1, T = r - 1, te = i - 1, E = t + 1, D = E * (E + 1) / 2, O = new jl(), ne = t <= Il ? Pl[t] / 2 ** Fl[t] : 1 / (E * E), re = null, k = O, A = null, j = null;
	for (let e = 1; e < ee; e++) k = k.next = new jl(), e === E && (re = k);
	k.next = O, s = o = 0;
	for (let e = 0; e < i; e++) {
		g = _ = v = y = c = l = u = d = 0, C = n[o + 3], b = Ml(n[o], C), x = Ml(n[o + 1], C), S = Ml(n[o + 2], C), f = E * b, p = E * x, m = E * S, h = E * C, c += D * b, l += D * x, u += D * S, d += D * C, k = O;
		for (let e = 0; e < E; e++) k.r = b, k.g = x, k.b = S, k.a = C, k = k.next;
		for (let e = 1; e < E; e++) a = o + ((T < e ? T : e) << 2), C = n[a + 3], c += (k.r = b = Ml(n[a], C)) * (w = E - e), l += (k.g = x = Ml(n[a + 1], C)) * w, u += (k.b = S = Ml(n[a + 2], C)) * w, d += (k.a = C) * w, g += b, _ += x, v += S, y += C, k = k.next;
		A = O, j = re;
		for (let e = 0; e < r; e++) n[o] = Math.floor(c * ne), n[o + 1] = Math.floor(l * ne), n[o + 2] = Math.floor(u * ne), n[o + 3] = Math.floor(d * ne), c -= f, l -= p, u -= m, d -= h, f -= A.r, p -= A.g, m -= A.b, h -= A.a, a = s + ((a = e + t + 1) < T ? a : T) << 2, C = n[a + 3], g += A.r = Ml(n[a], C), _ += A.g = Ml(n[a + 1], C), v += A.b = Ml(n[a + 2], C), y += A.a = C, c += g, l += _, u += v, d += y, A = A.next, f += b = j.r, p += x = j.g, m += S = j.b, h += C = j.a, g -= b, _ -= x, v -= S, y -= C, j = j.next, o += 4;
		s += r;
	}
	for (let e = 0; e < r; e++) {
		_ = v = y = g = l = u = d = c = 0, o = e << 2, f = E * (b = n[o]), p = E * (x = n[o + 1]), m = E * (S = n[o + 2]), h = E * (C = n[o + 3]), c += D * b, l += D * x, u += D * S, d += D * C, k = O;
		for (let e = 0; e < E; e++) k.r = b, k.g = x, k.b = S, k.a = C, k = k.next;
		let s = Math.min(1, te) * r;
		for (let i = 1; i <= t; i++) o = s + e << 2, c += (k.r = b = n[o]) * (w = E - i), l += (k.g = x = n[o + 1]) * w, u += (k.b = S = n[o + 2]) * w, d += (k.a = C = n[o + 3]) * w, g += b, _ += x, v += S, y += C, k = k.next, i < te && (s += r);
		o = e, A = O, j = re;
		for (let t = 0; t < i; t++) a = o << 2, n[a + 3] = C = Math.floor(d * ne), C > 0 ? (C = 255 / C, n[a] = Math.floor(c * ne) * C, n[a + 1] = Math.floor(l * ne) * C, n[a + 2] = Math.floor(u * ne) * C) : n[a] = n[a + 1] = n[a + 2] = 0, c -= f, l -= p, u -= m, d -= h, f -= A.r, p -= A.g, m -= A.b, h -= A.a, a = e + ((a = t + E) < te ? a : te) * r << 2, c += g += A.r = n[a], l += _ += A.g = n[a + 1], u += v += A.b = n[a + 2], d += y += A.a = n[a + 3], A = A.next, f += b = j.r, p += x = j.g, m += S = j.b, h += C = j.a, g -= b, _ -= x, v -= S, y -= C, j = j.next, o += r;
	}
}
var Pl, Fl, Il, Ll, Rl = o((() => {
	K(), Wa(), W(), Pl = [
		512,
		512,
		456,
		512,
		328,
		456,
		335,
		512,
		405,
		328,
		271,
		456,
		388,
		335,
		292,
		512,
		454,
		405,
		364,
		328,
		298,
		271,
		496,
		456,
		420,
		388,
		360,
		335,
		312,
		292,
		273,
		512,
		482,
		454,
		428,
		405,
		383,
		364,
		345,
		328,
		312,
		298,
		284,
		271,
		259,
		496,
		475,
		456,
		437,
		420,
		404,
		388,
		374,
		360,
		347,
		335,
		323,
		312,
		302,
		292,
		282,
		273,
		265,
		512,
		497,
		482,
		468,
		454,
		441,
		428,
		417,
		405,
		394,
		383,
		373,
		364,
		354,
		345,
		337,
		328,
		320,
		312,
		305,
		298,
		291,
		284,
		278,
		271,
		265,
		259,
		507,
		496,
		485,
		475,
		465,
		456,
		446,
		437,
		428,
		420,
		412,
		404,
		396,
		388,
		381,
		374,
		367,
		360,
		354,
		347,
		341,
		335,
		329,
		323,
		318,
		312,
		307,
		302,
		297,
		292,
		287,
		282,
		278,
		273,
		269,
		265,
		261,
		512,
		505,
		497,
		489,
		482,
		475,
		468,
		461,
		454,
		447,
		441,
		435,
		428,
		422,
		417,
		411,
		405,
		399,
		394,
		389,
		383,
		378,
		373,
		368,
		364,
		359,
		354,
		350,
		345,
		341,
		337,
		332,
		328,
		324,
		320,
		316,
		312,
		309,
		305,
		301,
		298,
		294,
		291,
		287,
		284,
		281,
		278,
		274,
		271,
		268,
		265,
		262,
		259,
		257,
		507,
		501,
		496,
		491,
		485,
		480,
		475,
		470,
		465,
		460,
		456,
		451,
		446,
		442,
		437,
		433,
		428,
		424,
		420,
		416,
		412,
		408,
		404,
		400,
		396,
		392,
		388,
		385,
		381,
		377,
		374,
		370,
		367,
		363,
		360,
		357,
		354,
		350,
		347,
		344,
		341,
		338,
		335,
		332,
		329,
		326,
		323,
		320,
		318,
		315,
		312,
		310,
		307,
		304,
		302,
		299,
		297,
		294,
		292,
		289,
		287,
		285,
		282,
		280,
		278,
		275,
		273,
		271,
		269,
		267,
		265,
		263,
		261,
		259
	], Fl = [
		9,
		11,
		12,
		13,
		13,
		14,
		14,
		15,
		15,
		15,
		15,
		16,
		16,
		16,
		16,
		17,
		17,
		17,
		17,
		17,
		17,
		17,
		18,
		18,
		18,
		18,
		18,
		18,
		18,
		18,
		18,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		19,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		20,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		21,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		22,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		23,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24,
		24
	], Il = 180, Ll = function(e, t = 1) {
		let n = Math.round(Math.min(this.blurRadius(), Il) * t);
		n > 0 && Nl(e, n);
	}, G.addGetterSetter(q, "blurRadius", 0, U(), G.afterSetFilter);
})), zl, Bl = o((() => {
	K(), Wa(), W(), zl = function(e) {
		let t = this.brightness() * 255, n = e.data, r = n.length;
		for (let e = 0; e < r; e += 4) n[e] += t, n[e + 1] += t, n[e + 2] += t;
	}, G.addGetterSetter(q, "brightness", 0, U(), G.afterSetFilter);
})), Vl, Hl = o((() => {
	Bl(), Vl = function(e) {
		let t = this.attrs.brightness === void 0 ? 1 : this.brightness(), n = e.data, r = n.length;
		for (let e = 0; e < r; e += 4) n[e] = Math.min(255, n[e] * t), n[e + 1] = Math.min(255, n[e + 1] * t), n[e + 2] = Math.min(255, n[e + 2] * t);
	};
})), Ul, Wl = o((() => {
	K(), Wa(), W(), Ul = function(e) {
		let t = ((this.contrast() + 100) / 100) ** 2, n = e.data, r = n.length, i = 150, a = 150, o = 150;
		for (let e = 0; e < r; e += 4) i = n[e], a = n[e + 1], o = n[e + 2], i /= 255, i -= .5, i *= t, i += .5, i *= 255, a /= 255, a -= .5, a *= t, a += .5, a *= 255, o /= 255, o -= .5, o *= t, o += .5, o *= 255, i = i < 0 ? 0 : i > 255 ? 255 : i, a = a < 0 ? 0 : a > 255 ? 255 : a, o = o < 0 ? 0 : o > 255 ? 255 : o, n[e] = i, n[e + 1] = a, n[e + 2] = o;
	}, G.addGetterSetter(q, "contrast", 0, U(), G.afterSetFilter);
})), Gl, Kl = o((() => {
	K(), Wa(), W(), Gl = function(e) {
		let t = e.data, n = e.width, r = e.height, i = Math.min(1, Math.max(0, this.embossStrength?.call(this) ?? .5)), a = Math.min(1, Math.max(0, this.embossWhiteLevel?.call(this) ?? .5)), o = {
			"top-left": 315,
			top: 270,
			"top-right": 225,
			right: 180,
			"bottom-right": 135,
			bottom: 90,
			"bottom-left": 45,
			left: 0
		}[this.embossDirection?.call(this) ?? "top-left"] ?? 315, s = !!(this.embossBlend?.call(this) ?? !1), c = i * 10, l = a * 255, u = o * Math.PI / 180, d = Math.cos(u), f = Math.sin(u), p = 128 / 1020 * c, m = new Float32Array(n * r);
		for (let e = 0, n = 0; n < t.length; n += 4, e++) m[e] = .2126 * t[n] + .7152 * t[n + 1] + .0722 * t[n + 2];
		let h = [
			-1,
			0,
			1,
			-2,
			0,
			2,
			-1,
			0,
			1
		], g = [
			-1,
			-2,
			-1,
			0,
			0,
			0,
			1,
			2,
			1
		], _ = (e) => e < 0 ? 0 : e > 255 ? 255 : e;
		for (let e = 0; e < r; e++) for (let i = 0; i < n; i++) {
			let a = 0, o = 0, c = 0;
			for (let t = -1; t <= 1; t++) {
				let s = Math.max(0, Math.min(r - 1, e + t)) * n;
				for (let e = -1; e <= 1; e++, c++) {
					let t = m[s + Math.max(0, Math.min(n - 1, i + e))];
					a += t * h[c], o += t * g[c];
				}
			}
			let u = e * n + i, v = _(l + (d * a + f * o) * p), y = u * 4;
			if (s) {
				let e = v - l;
				t[y] = _(t[y] + e), t[y + 1] = _(t[y + 1] + e), t[y + 2] = _(t[y + 2] + e);
			} else t[y] = t[y + 1] = t[y + 2] = v;
		}
		return e;
	}, G.addGetterSetter(q, "embossStrength", .5, U(), G.afterSetFilter), G.addGetterSetter(q, "embossWhiteLevel", .5, U(), G.afterSetFilter), G.addGetterSetter(q, "embossDirection", "top-left", void 0, G.afterSetFilter), G.addGetterSetter(q, "embossBlend", !1, void 0, G.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Enhance.js
function ql(e, t, n, r, i) {
	let a = n - t, o = i - r;
	if (a === 0) return r + o / 2;
	if (o === 0) return r;
	let s = (e - t) / a;
	return s = o * s + r, s;
}
var Jl, Yl = o((() => {
	K(), Wa(), W(), Jl = function(e) {
		let t = e.data, n = t.length, r = t[0], i = r, a, o = t[1], s = o, c, l = t[2], u = l, d, f = this.enhance();
		if (f === 0) return;
		for (let e = 0; e < n; e += 4) a = t[e + 0], a < r ? r = a : a > i && (i = a), c = t[e + 1], c < o ? o = c : c > s && (s = c), d = t[e + 2], d < l ? l = d : d > u && (u = d);
		i === r && (i = 255, r = 0), s === o && (s = 255, o = 0), u === l && (u = 255, l = 0);
		let p, m, h, g, _, v;
		if (f > 0) p = i + f * (255 - i), m = r - f * (r - 0), h = s + f * (255 - s), g = o - f * (o - 0), _ = u + f * (255 - u), v = l - f * (l - 0);
		else {
			let e = (i + r) * .5;
			p = i + f * (i - e), m = r + f * (r - e);
			let t = (s + o) * .5;
			h = s + f * (s - t), g = o + f * (o - t);
			let n = (u + l) * .5;
			_ = u + f * (u - n), v = l + f * (l - n);
		}
		for (let e = 0; e < n; e += 4) t[e + 0] = ql(t[e + 0], r, i, m, p), t[e + 1] = ql(t[e + 1], o, s, g, h), t[e + 2] = ql(t[e + 2], l, u, v, _);
	}, G.addGetterSetter(q, "enhance", 0, U(), G.afterSetFilter);
})), Xl, Zl = o((() => {
	Xl = function(e) {
		let t = e.data, n = t.length;
		for (let e = 0; e < n; e += 4) {
			let n = .34 * t[e] + .5 * t[e + 1] + .16 * t[e + 2];
			t[e] = n, t[e + 1] = n, t[e + 2] = n;
		}
	};
})), Ql, $l = o((() => {
	K(), Wa(), W(), G.addGetterSetter(q, "hue", 0, U(), G.afterSetFilter), G.addGetterSetter(q, "saturation", 0, U(), G.afterSetFilter), G.addGetterSetter(q, "luminance", 0, U(), G.afterSetFilter), Ql = function(e) {
		let t = e.data, n = t.length, r = 2 ** this.saturation(), i = (this.hue() % 360 + 360) % 360, a = this.luminance() * 127, o = 1 * r * Math.cos(i * Math.PI / 180), s = 1 * r * Math.sin(i * Math.PI / 180), c = .299 + .701 * o + .168 * s, l = .587 - .587 * o + .33 * s, u = .114 - .114 * o - .497 * s, d = .299 - .299 * o - .328 * s, f = .587 + .413 * o + .035 * s, p = .114 - .114 * o + .292 * s, m = .299 - .3 * o + 1.25 * s, h = .587 - .588 * o - 1.05 * s, g = .114 + .886 * o - .203 * s, _, v, y, b;
		for (let e = 0; e < n; e += 4) _ = t[e + 0], v = t[e + 1], y = t[e + 2], b = t[e + 3], t[e + 0] = c * _ + l * v + u * y + a, t[e + 1] = d * _ + f * v + p * y + a, t[e + 2] = m * _ + h * v + g * y + a, t[e + 3] = b;
	};
})), eu, tu = o((() => {
	K(), Wa(), W(), eu = function(e) {
		let t = e.data, n = t.length, r = 2 ** this.value(), i = 2 ** this.saturation(), a = (this.hue() % 360 + 360) % 360, o = r * i * Math.cos(a * Math.PI / 180), s = r * i * Math.sin(a * Math.PI / 180), c = .299 * r + .701 * o + .168 * s, l = .587 * r - .587 * o + .33 * s, u = .114 * r - .114 * o - .497 * s, d = .299 * r - .299 * o - .328 * s, f = .587 * r + .413 * o + .035 * s, p = .114 * r - .114 * o + .292 * s, m = .299 * r - .3 * o + 1.25 * s, h = .587 * r - .588 * o - 1.05 * s, g = .114 * r + .886 * o - .203 * s;
		for (let e = 0; e < n; e += 4) {
			let n = t[e + 0], r = t[e + 1], i = t[e + 2], a = t[e + 3];
			t[e + 0] = c * n + l * r + u * i, t[e + 1] = d * n + f * r + p * i, t[e + 2] = m * n + h * r + g * i, t[e + 3] = a;
		}
	}, G.addGetterSetter(q, "hue", 0, U(), G.afterSetFilter), G.addGetterSetter(q, "saturation", 0, U(), G.afterSetFilter), G.addGetterSetter(q, "value", 0, U(), G.afterSetFilter);
})), nu, ru = o((() => {
	nu = function(e) {
		let t = e.data, n = t.length;
		for (let e = 0; e < n; e += 4) t[e] = 255 - t[e], t[e + 1] = 255 - t[e + 1], t[e + 2] = 255 - t[e + 2];
	};
})), iu, au, ou, su = o((() => {
	K(), Wa(), W(), iu = function(e, t, n) {
		let r = e.data, i = t.data, a = e.width, o = e.height, s = n.polarCenterX || a / 2, c = n.polarCenterY || o / 2, l = Math.sqrt(s * s + c * c), u = a - s, d = o - c, f = Math.sqrt(u * u + d * d);
		l = f > l ? f : l;
		let p = o, m = a, h = 360 / m * Math.PI / 180;
		for (let e = 0; e < m; e += 1) {
			let t = Math.sin(e * h), n = Math.cos(e * h);
			for (let o = 0; o < p; o += 1) {
				u = Math.floor(s + l * o / p * n), d = Math.floor(c + l * o / p * t);
				let f = (d * a + u) * 4, m = r[f + 0], h = r[f + 1], g = r[f + 2], _ = r[f + 3];
				f = (e + o * a) * 4, i[f + 0] = m, i[f + 1] = h, i[f + 2] = g, i[f + 3] = _;
			}
		}
	}, au = function(e, t, n) {
		let r = e.data, i = t.data, a = e.width, o = e.height, s = n.polarCenterX || a / 2, c = n.polarCenterY || o / 2, l = Math.sqrt(s * s + c * c), u = a - s, d = o - c, f = Math.sqrt(u * u + d * d);
		l = f > l ? f : l;
		let p = o, m = a, h = n.polarRotation || 0, g, _;
		for (u = 0; u < a; u += 1) for (d = 0; d < o; d += 1) {
			let e = u - s, t = d - c, n = Math.sqrt(e * e + t * t) * p / l, o = (Math.atan2(t, e) * 180 / Math.PI + 360 + h) % 360;
			o = o * m / 360, g = Math.floor(o), _ = Math.floor(n);
			let f = (_ * a + g) * 4, v = r[f + 0], y = r[f + 1], b = r[f + 2], x = r[f + 3];
			f = (d * a + u) * 4, i[f + 0] = v, i[f + 1] = y, i[f + 2] = b, i[f + 3] = x;
		}
	}, ou = function(e) {
		let t = e.width, n = e.height, r, i, a, o, s, c, l, u, d, f, p = Math.round(this.kaleidoscopePower()), m = Math.round(this.kaleidoscopeAngle()), h = Math.floor(t * ((m % 360 + 360) % 360) / 360);
		if (p < 1) return;
		let g = {
			width: t,
			height: n,
			data: new Uint8ClampedArray(t * n * 4)
		};
		iu(e, g, {
			polarCenterX: t / 2,
			polarCenterY: n / 2
		});
		let _ = t / 2 ** p;
		for (; _ <= 8;) _ *= 2, --p;
		_ = Math.ceil(_);
		let v = _, y = 0, b = v, x = 1;
		for (h + _ > t && (y = v, b = 0, x = -1), i = 0; i < n; i += 1) for (r = y; r !== b; r += x) a = Math.round(r + h) % t, d = (t * i + a) * 4, s = g.data[d + 0], c = g.data[d + 1], l = g.data[d + 2], u = g.data[d + 3], f = (t * i + r) * 4, g.data[f + 0] = s, g.data[f + 1] = c, g.data[f + 2] = l, g.data[f + 3] = u;
		for (i = 0; i < n; i += 1) for (v = Math.floor(_), o = 0; o < p; o += 1) {
			for (r = 0; r < v + 1; r += 1) d = (t * i + r) * 4, s = g.data[d + 0], c = g.data[d + 1], l = g.data[d + 2], u = g.data[d + 3], f = (t * i + v * 2 - r - 1) * 4, g.data[f + 0] = s, g.data[f + 1] = c, g.data[f + 2] = l, g.data[f + 3] = u;
			v *= 2;
		}
		au(g, e, { polarRotation: 0 });
	}, G.addGetterSetter(q, "kaleidoscopePower", 2, U(), G.afterSetFilter), G.addGetterSetter(q, "kaleidoscopeAngle", 0, U(), G.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Mask.js
function cu(e, t, n) {
	let r = (n * e.width + t) * 4, i = [];
	return i.push(e.data[r++], e.data[r++], e.data[r++], e.data[r++]), i;
}
function lu(e, t) {
	return Math.sqrt((e[0] - t[0]) ** 2 + (e[1] - t[1]) ** 2 + (e[2] - t[2]) ** 2);
}
function uu(e) {
	let t = [
		0,
		0,
		0
	];
	for (let n = 0; n < e.length; n++) t[0] += e[n][0], t[1] += e[n][1], t[2] += e[n][2];
	return t[0] /= e.length, t[1] /= e.length, t[2] /= e.length, t;
}
function du(e, t) {
	let n = cu(e, 0, 0), r = cu(e, e.width - 1, 0), i = cu(e, 0, e.height - 1), a = cu(e, e.width - 1, e.height - 1);
	if (lu(n, r) < t && lu(r, a) < t && lu(a, i) < t && lu(i, n) < t) {
		let o = uu([
			r,
			n,
			a,
			i
		]), s = [];
		for (let n = 0; n < e.width * e.height; n++) {
			let r = lu(o, [
				e.data[n * 4],
				e.data[n * 4 + 1],
				e.data[n * 4 + 2]
			]);
			s[n] = r < t ? 0 : 255;
		}
		return s;
	}
}
function fu(e, t) {
	for (let n = 0; n < e.width * e.height; n++) e.data[4 * n + 3] = t[n];
}
function pu(e, t, n) {
	let r = [
		1,
		1,
		1,
		1,
		0,
		1,
		1,
		1,
		1
	], i = Math.round(Math.sqrt(r.length)), a = Math.floor(i / 2), o = [];
	for (let s = 0; s < n; s++) for (let c = 0; c < t; c++) {
		let l = s * t + c, u = 0;
		for (let o = 0; o < i; o++) for (let l = 0; l < i; l++) {
			let d = s + o - a, f = c + l - a;
			if (d >= 0 && d < n && f >= 0 && f < t) {
				let n = d * t + f, a = r[o * i + l];
				u += e[n] * a;
			}
		}
		o[l] = u === 2040 ? 255 : 0;
	}
	return o;
}
function mu(e, t, n) {
	let r = [
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1
	], i = Math.round(Math.sqrt(r.length)), a = Math.floor(i / 2), o = [];
	for (let s = 0; s < n; s++) for (let c = 0; c < t; c++) {
		let l = s * t + c, u = 0;
		for (let o = 0; o < i; o++) for (let l = 0; l < i; l++) {
			let d = s + o - a, f = c + l - a;
			if (d >= 0 && d < n && f >= 0 && f < t) {
				let n = d * t + f, a = r[o * i + l];
				u += e[n] * a;
			}
		}
		o[l] = u >= 1020 ? 255 : 0;
	}
	return o;
}
function hu(e, t, n) {
	let r = [
		1 / 9,
		1 / 9,
		1 / 9,
		1 / 9,
		1 / 9,
		1 / 9,
		1 / 9,
		1 / 9,
		1 / 9
	], i = Math.round(Math.sqrt(r.length)), a = Math.floor(i / 2), o = [];
	for (let s = 0; s < n; s++) for (let c = 0; c < t; c++) {
		let l = s * t + c, u = 0;
		for (let o = 0; o < i; o++) for (let l = 0; l < i; l++) {
			let d = s + o - a, f = c + l - a;
			if (d >= 0 && d < n && f >= 0 && f < t) {
				let n = d * t + f, a = r[o * i + l];
				u += e[n] * a;
			}
		}
		o[l] = u;
	}
	return o;
}
var gu, _u = o((() => {
	K(), Wa(), W(), gu = function(e) {
		let t = du(e, this.attrs.threshold ?? 10);
		return t && (t = pu(t, e.width, e.height), t = mu(t, e.width, e.height), t = hu(t, e.width, e.height), fu(e, t)), e;
	}, G.addGetterSetter(q, "threshold", .5, U(), G.afterSetFilter);
})), vu, yu = o((() => {
	K(), Wa(), W(), vu = function(e) {
		let t = this.noise() * 255, n = e.data, r = n.length, i = t / 2;
		for (let e = 0; e < r; e += 4) n[e + 0] += i - 2 * i * Math.random(), n[e + 1] += i - 2 * i * Math.random(), n[e + 2] += i - 2 * i * Math.random();
	}, G.addGetterSetter(q, "noise", .2, U(), G.afterSetFilter);
})), bu, xu = o((() => {
	K(), Ri(), Wa(), W(), bu = function(e, t = 1) {
		let n = Math.ceil(this.pixelSize() * t), r = e.width, i = e.height, a = Math.ceil(r / n), o = Math.ceil(i / n), s = e.data;
		if (n <= 0) V.error("pixelSize value can not be <= 0");
		else for (let e = 0; e < a; e += 1) for (let t = 0; t < o; t += 1) {
			let a = 0, o = 0, c = 0, l = 0, u = e * n, d = Math.min(u + n, r), f = t * n, p = Math.min(f + n, i);
			for (let e = u; e < d; e += 1) for (let t = f; t < p; t += 1) {
				let n = (r * t + e) * 4, i = s[n + 3];
				a += s[n + 0] * i, o += s[n + 1] * i, c += s[n + 2] * i, l += i;
			}
			l && (a /= l, o /= l, c /= l), l /= (d - u) * (p - f);
			for (let e = u; e < d; e += 1) for (let t = f; t < p; t += 1) {
				let n = (r * t + e) * 4;
				s[n + 0] = a, s[n + 1] = o, s[n + 2] = c, s[n + 3] = l;
			}
		}
	}, G.addGetterSetter(q, "pixelSize", 8, U(), G.afterSetFilter);
})), Su, Cu = o((() => {
	K(), Wa(), W(), Su = function(e) {
		let t = Math.round(this.levels() * 254) + 1, n = e.data, r = n.length, i = 255 / t;
		for (let e = 0; e < r; e += 1) n[e] = Math.floor(n[e] / i) * i;
	}, G.addGetterSetter(q, "levels", .5, U(), G.afterSetFilter);
})), wu, Tu = o((() => {
	K(), Wa(), W(), wu = function(e) {
		let t = e.data, n = t.length, r = this.red(), i = this.green(), a = this.blue();
		for (let e = 0; e < n; e += 4) {
			let n = (.34 * t[e] + .5 * t[e + 1] + .16 * t[e + 2]) / 255;
			t[e] = n * r, t[e + 1] = n * i, t[e + 2] = n * a, t[e + 3] = t[e + 3];
		}
	}, G.addGetterSetter(q, "red", 0, ga, G.afterSetFilter), G.addGetterSetter(q, "green", 0, ga, G.afterSetFilter), G.addGetterSetter(q, "blue", 0, ga, G.afterSetFilter);
})), Eu, Du = o((() => {
	K(), Wa(), Tu(), Eu = function(e) {
		let t = e.data, n = t.length, r = this.red(), i = this.green(), a = this.blue(), o = this.alpha();
		for (let e = 0; e < n; e += 4) {
			let n = 1 - o;
			t[e] = r * o + t[e] * n, t[e + 1] = i * o + t[e + 1] * n, t[e + 2] = a * o + t[e + 2] * n;
		}
	}, G.addGetterSetter(q, "alpha", 1, (e) => Math.min(1, Math.max(0, e)), G.afterSetFilter);
})), Ou, ku = o((() => {
	Ou = function(e) {
		let t = e.data, n = t.length;
		for (let e = 0; e < n; e += 4) {
			let n = t[e + 0], r = t[e + 1], i = t[e + 2];
			t[e + 0] = Math.min(255, n * .393 + r * .769 + i * .189), t[e + 1] = Math.min(255, n * .349 + r * .686 + i * .168), t[e + 2] = Math.min(255, n * .272 + r * .534 + i * .131);
		}
	};
})), Au, ju = o((() => {
	Au = function(e) {
		let t = e.data;
		for (let e = 0; e < t.length; e += 4) {
			let n = t[e], r = t[e + 1], i = t[e + 2];
			.2126 * n + .7152 * r + .0722 * i >= 128 && (t[e] = 255 - n, t[e + 1] = 255 - r, t[e + 2] = 255 - i);
		}
		return e;
	};
})), Mu, Nu = o((() => {
	K(), Wa(), W(), Mu = function(e) {
		let t = this.threshold() * 255, n = e.data, r = n.length;
		for (let e = 0; e < r; e += 1) n[e] = n[e] < t ? 0 : 255;
	}, G.addGetterSetter(q, "threshold", .5, U(), G.afterSetFilter);
})), Pu, Fu = o((() => {
	ws(), Es(), Js(), Xs(), Qs(), ec(), Gc(), Hs(), Ks(), qc(), Yc(), Qc(), el(), nl(), Ic(), cl(), Ol(), Al(), Rl(), Bl(), Hl(), Wl(), Kl(), Yl(), Zl(), $l(), tu(), ru(), su(), _u(), yu(), xu(), Cu(), Tu(), Du(), ku(), ju(), Nu(), Pu = Cs.Util._assign(Cs, {
		Arc: Ts,
		Arrow: qs,
		Circle: Ys,
		Ellipse: Zs,
		Image: $s,
		Label: Uc,
		Tag: Wc,
		Line: Vs,
		Path: Gs,
		Rect: Kc,
		RegularPolygon: Jc,
		Ring: Zc,
		Sprite: $c,
		Star: tl,
		Text: Fc,
		TextPath: sl,
		Transformer: Y,
		Wedge: kl,
		Filters: {
			Blur: Ll,
			Brightness: Vl,
			Brighten: zl,
			Contrast: Ul,
			Emboss: Gl,
			Enhance: Jl,
			Grayscale: Xl,
			HSL: Ql,
			HSV: eu,
			Invert: nu,
			Kaleidoscope: ou,
			Mask: gu,
			Noise: vu,
			Pixelate: bu,
			Posterize: Su,
			RGB: wu,
			RGBA: Eu,
			Sepia: Ou,
			Solarize: Au,
			Threshold: Mu
		}
	});
})), X, Iu = o((() => {
	Fu(), X = Pu;
}));
//#endregion
//#region src/render/realSize.ts
Iu();
var Lu = [
	"auto",
	"person",
	"sofa",
	"door",
	"counter"
], Ru = {
	widthCm: 200,
	heightCm: 85
}, zu = {
	heightCm: 175,
	widthCm: 50
}, Bu = {
	widthCm: 90,
	heightCm: 204
}, Vu = {
	widthCm: 200,
	heightCm: 110
}, Hu = 150, Uu = .86;
function Wu(e, t) {
	return !e || e === "auto" ? t < Hu ? "sofa" : "person" : e;
}
function Gu(e, t, n) {
	if (e === "sofa" || e === "counter") {
		let r = e === "sofa" ? Ru.widthCm : Vu.widthCm, i = e === "sofa" ? Ru.heightCm : Vu.heightCm, a = Math.max(r, t) + 50, o = i + 30;
		return {
			w: a,
			h: o + n + 40,
			signCx: a / 2,
			signBottom: o,
			refX: a / 2 - r / 2
		};
	}
	let r = e === "person" ? zu.widthCm : Bu.widthCm + 12, i = e === "person" ? zu.heightCm : Bu.heightCm + 6, a = Math.max(40, 150 - n / 2);
	return {
		w: 25 + r + 40 + t + 25,
		h: Math.max(i, a + n) + 40,
		signCx: 25 + r + 40 + t / 2,
		signBottom: a,
		refX: 25
	};
}
function Ku(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.arcTo(t + r, n, t + r, n + i, o), e.arcTo(t + r, n + i, t, n + i, o), e.arcTo(t, n + i, t, n, o), e.arcTo(t, n, t + r, n, o), e.closePath();
}
function qu(e, t, n, r, i) {
	e.save(), e.fillStyle = i;
	let a = (i, a, o, s, c) => {
		Ku(e, t + i * r, n - (a + s) * r, o * r, s * r, c * r), e.fill();
	};
	a(8, 0, 6, 12, 1), a(186, 0, 6, 12, 1), a(0, 10, 200, 32, 6), a(10, 38, 180, 47, 8), a(0, 10, 22, 52, 7), a(178, 10, 22, 52, 7), e.globalAlpha = .5, e.fillStyle = "#000", e.fillRect(t + 100 * r - .5, n - 42 * r, Math.max(1, r * .6), 30 * r), e.restore();
}
function Ju(e, t, n, r, i) {
	let a = (e) => n - e * r;
	e.save(), e.fillStyle = i, e.beginPath(), e.ellipse(t, a(162), 10 * r, 12 * r, 0, 0, Math.PI * 2), e.fill(), e.beginPath(), e.moveTo(t - 22 * r, a(145)), e.quadraticCurveTo(t, a(150), t + 22 * r, a(145)), e.lineTo(t + 25 * r, a(95)), e.lineTo(t + 18 * r, a(94)), e.lineTo(t + 15 * r, a(130)), e.lineTo(t + 15 * r, a(88)), e.lineTo(t - 15 * r, a(88)), e.lineTo(t - 15 * r, a(130)), e.lineTo(t - 18 * r, a(94)), e.lineTo(t - 25 * r, a(95)), e.closePath(), e.fill(), e.beginPath(), e.moveTo(t - 15 * r, a(90)), e.lineTo(t + 15 * r, a(90)), e.lineTo(t + 13 * r, a(0)), e.lineTo(t + 3 * r, a(0)), e.lineTo(t, a(55)), e.lineTo(t - 3 * r, a(0)), e.lineTo(t - 13 * r, a(0)), e.closePath(), e.fill(), e.restore();
}
function Yu(e, t, n, r, i) {
	e.save(), e.fillStyle = i, Ku(e, t - 6 * r, n - 210 * r, 102 * r, 210 * r, 1.5 * r), e.fill(), e.globalCompositeOperation = "destination-out", Ku(e, t, n - 204 * r, 90 * r, 204 * r, 1 * r), e.fill(), e.globalCompositeOperation = "source-over", e.globalAlpha = .75, Ku(e, t + 1.5 * r, n - 202.5 * r, 87 * r, 202.5 * r, 1 * r), e.fill(), e.globalAlpha = 1, e.fillStyle = "rgba(0,0,0,0.35)";
	for (let [i, a] of [[20, 80], [112, 80]]) Ku(e, t + 14 * r, n - (i + a) * r, 62 * r, a * r, 2 * r), e.fill();
	e.beginPath(), e.arc(t + 78 * r, n - 102 * r, 3 * r, 0, Math.PI * 2), e.fill(), e.restore();
}
function Xu(e, t, n, r, i) {
	e.save(), e.fillStyle = i, Ku(e, t - 6 * r, n - 110 * r, 212 * r, 6 * r, 2 * r), e.fill(), Ku(e, t, n - 104 * r, 200 * r, 104 * r, 1 * r), e.globalAlpha = .8, e.fill(), e.globalAlpha = 1;
	for (let i of [40, 140]) Ku(e, t + (i - 18) * r, n - 78 * r, 36 * r, 6 * r, 3 * r), e.fill(), e.fillRect(t + (i - 1.5) * r, n - 72 * r, 3 * r, 70 * r), Ku(e, t + (i - 15) * r, n - 3 * r, 30 * r, 3 * r, 1.5 * r), e.fill();
	e.restore();
}
function Zu(e, t, n, r, i, a, o) {
	let s = n + r * a;
	t === "sofa" ? qu(e, s, i, a, o) : t === "counter" ? Xu(e, s, i, a, o) : t === "door" ? Yu(e, s + 6 * a, i, a, o) : Ju(e, s + zu.widthCm / 2 * a, i, a, o);
}
function Qu(e, t, n, r, i, a) {
	let o = (n - t) / i, s = o > 600 ? 100 : 50;
	e.save(), e.strokeStyle = a, e.fillStyle = a, e.globalAlpha = .55, e.lineWidth = 1, e.beginPath(), e.moveTo(t, r), e.lineTo(n, r);
	for (let n = 0; n <= o + .01; n += 10) {
		let a = t + n * i;
		e.moveTo(a, r), e.lineTo(a, r + (n % s === 0 ? 8 : 4));
	}
	e.stroke(), e.globalAlpha = .8, e.font = "500 10px system-ui, -apple-system, \"Segoe UI\", sans-serif", e.textAlign = "center", e.textBaseline = "top";
	for (let n = 0; n <= o + .01; n += s) e.fillText(`${n}`, t + n * i, r + 10);
	e.restore();
}
//#endregion
//#region src/render/legacy/sign.ts
var $u = {
	mm: 12,
	cm: 120,
	in: 300,
	m: 12e3,
	ft: 3600
};
function ed(e, t, n) {
	let r = 1e3, i = $u[n] ?? 12, a = e * i, o = t * i, s = a > 1e4 || o > 1e4 ? .25 : .35, c = o >= a / 2 ? "big" : "small", l, u, d;
	if (a > o ? (l = r / a, u = r, d = o * l) : (l = 370 / o, d = 370, u = a * l), u > r || d > 370) {
		let e = u > r ? r / u : 370 / d;
		u *= e, d *= e, l *= e;
	}
	return {
		width: u,
		height: d,
		fixScale: s,
		sizeRatio: c,
		pxPerUnit: i * l
	};
}
var td = (e) => e === "rectangle" ? "square" : e;
function nd(e, t, n = 0, r = 0) {
	let i = Math.min(n, e / 2), a = Math.min(r, t / 2);
	return !i || !a ? `M0,0 H${e} V${t} H0 Z` : `M${i},0 H${e - i} A${i},${a} 0 0 1 ${e},${a} V${t - a} A${i},${a} 0 0 1 ${e - i},${t} H${i} A${i},${a} 0 0 1 0,${t - a} V${a} A${i},${a} 0 0 1 ${i},0 Z`;
}
var rd = (e) => `M${e.map(([e, t]) => `${e},${t}`).join(" L")} Z`;
function id(e, t, n) {
	switch (e) {
		case "rounded-square": return nd(t, n, 35, 35);
		case "oval": return `M0,${n / 2} A${t / 2},${n / 2} 0 1 0 ${t},${n / 2} A${t / 2},${n / 2} 0 1 0 0,${n / 2} Z`;
		case "triangle": return rd([
			[0, n],
			[t / 2, 0],
			[t, n]
		]);
		case "rotated-square": return rd([
			[t / 2, 0],
			[t, n / 2],
			[t / 2, n],
			[0, n / 2]
		]);
		case "turn-left": return rd([
			[0, n / 2],
			[t / 2, 0],
			[t, 0],
			[t, n],
			[t / 2, n]
		]);
		case "turn-right": return rd([
			[0, 0],
			[t / 2, 0],
			[t, n / 2],
			[t / 2, n],
			[0, n]
		]);
		case "arrow-right": return rd([
			[0, n / 5 * 4],
			[t / 2, n / 5 * 4],
			[t / 2, n],
			[t, n / 2],
			[t / 2, 0],
			[t / 2, n / 5],
			[0, n / 5]
		]);
		case "arrow-left": return rd([
			[0, n / 2],
			[t / 2, 0],
			[t / 2, n / 5],
			[t, n / 5],
			[t, n / 5 * 4],
			[t / 2, n / 5 * 4],
			[t / 2, n]
		]);
		case "stop": return rd([
			[0, n / 3 * 2],
			[t / 3, n],
			[t / 3 * 2, n],
			[t, n / 3 * 2],
			[t, n / 3],
			[t / 3 * 2, 0],
			[t / 3, 0],
			[0, n / 3]
		]);
		case "rounded-top": return nd(t, n, t, 10);
		case "rounded-sides": return nd(t, n, 10, n);
		default: return nd(t, n);
	}
}
function ad(e, t, n, r = 10) {
	let i = t + r * 2, a = n + r * 2;
	switch (e) {
		case "triangle": return {
			data: rd([
				[0, a],
				[i / 2, 0],
				[i, a]
			]),
			x: -r,
			y: -r * 1.5
		};
		case "turn-left": return {
			data: id(e, i, a),
			x: -r * 1.2,
			y: -r
		};
		case "turn-right": return {
			data: id(e, i, a),
			x: -r / 1.5,
			y: -r
		};
		case "arrow-right": {
			let e = i / 2 / 1.05;
			return {
				data: rd([
					[0, a / 5 * 4],
					[e, a / 5 * 4],
					[e, a],
					[i, a / 2],
					[e, 0],
					[e, a / 5],
					[0, a / 5]
				]),
				x: -r / 1.5,
				y: -r
			};
		}
		case "arrow-left": {
			let e = i / 2 * 1.05;
			return {
				data: rd([
					[0, a / 2],
					[e, 0],
					[e, a / 5],
					[i, a / 5],
					[i, a / 5 * 4],
					[e, a / 5 * 4],
					[e, a]
				]),
				x: -r * 1.2,
				y: -r
			};
		}
		case "rounded-top": return {
			data: nd(i, a, i, 10),
			x: -r,
			y: -r
		};
		case "rounded-sides": return {
			data: nd(i, a, 10, a),
			x: -r,
			y: -r
		};
		default: return {
			data: id(e, i, a),
			x: -r,
			y: -r
		};
	}
}
var od = {
	shadowColor: "#000000",
	shadowOffsetX: 3,
	shadowOffsetY: 3,
	shadowBlur: 30,
	shadowOpacity: 1
};
function sd(e, t, n) {
	let r = e === "old-world" ? "im_old_world" : "im_rounded_corners";
	return t === n ? `${r}.svg` : t >= 2 * n ? `${r}_longW.svg` : t > n ? `${r}_mediumW.svg` : n >= 2 * t ? `${r}_longH.svg` : n > t ? `${r}_mediumH.svg` : null;
}
var cd = /* @__PURE__ */ new Map();
function ld(e, t, n) {
	let r = `${e}|${t}|${n}`, i = cd.get(r);
	return i || (i = fetch(e).then((e) => e.ok ? e.text() : null).then((e) => {
		if (!e) return null;
		let r = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
		if (r.nodeName.toLowerCase() !== "svg") return null;
		for (let e of Array.from(r.querySelectorAll("path,rect,circle,ellipse,polygon,polyline,line,g"))) {
			let r = (n) => {
				let r = e.getAttribute(n) || e.style?.getPropertyValue(n), i = !r && n === "fill" && e.nodeName.toLowerCase() !== "g" && !e.closest("[fill=\"none\"], [fill=\"transparent\"]");
				(r && r !== "none" && r !== "transparent" || i) && (e.setAttribute(n, t), e.style?.removeProperty(n));
			};
			n !== "stroke" && r("fill"), n !== "fill" && r("stroke");
		}
		let i = new XMLSerializer().serializeToString(r);
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(i)}`;
	}).catch(() => null), cd.set(r, i)), i;
}
function ud(e, t) {
	return ld(e, t, "both");
}
//#endregion
//#region node_modules/qrcode/lib/can-promise.js
var dd = /* @__PURE__ */ s(((e, t) => {
	t.exports = function() {
		return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
	};
})), fd = /* @__PURE__ */ s(((e) => {
	var t, n = [
		0,
		26,
		44,
		70,
		100,
		134,
		172,
		196,
		242,
		292,
		346,
		404,
		466,
		532,
		581,
		655,
		733,
		815,
		901,
		991,
		1085,
		1156,
		1258,
		1364,
		1474,
		1588,
		1706,
		1828,
		1921,
		2051,
		2185,
		2323,
		2465,
		2611,
		2761,
		2876,
		3034,
		3196,
		3362,
		3532,
		3706
	];
	e.getSymbolSize = function(e) {
		if (!e) throw Error("\"version\" cannot be null or undefined");
		if (e < 1 || e > 40) throw Error("\"version\" should be in range from 1 to 40");
		return e * 4 + 17;
	}, e.getSymbolTotalCodewords = function(e) {
		return n[e];
	}, e.getBCHDigit = function(e) {
		let t = 0;
		for (; e !== 0;) t++, e >>>= 1;
		return t;
	}, e.setToSJISFunction = function(e) {
		if (typeof e != "function") throw Error("\"toSJISFunc\" is not a valid function.");
		t = e;
	}, e.isKanjiModeEnabled = function() {
		return t !== void 0;
	}, e.toSJIS = function(e) {
		return t(e);
	};
})), pd = /* @__PURE__ */ s(((e) => {
	e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
	function t(t) {
		if (typeof t != "string") throw Error("Param is not a string");
		switch (t.toLowerCase()) {
			case "l":
			case "low": return e.L;
			case "m":
			case "medium": return e.M;
			case "q":
			case "quartile": return e.Q;
			case "h":
			case "high": return e.H;
			default: throw Error("Unknown EC Level: " + t);
		}
	}
	e.isValid = function(e) {
		return e && e.bit !== void 0 && e.bit >= 0 && e.bit < 4;
	}, e.from = function(n, r) {
		if (e.isValid(n)) return n;
		try {
			return t(n);
		} catch {
			return r;
		}
	};
})), md = /* @__PURE__ */ s(((e, t) => {
	function n() {
		this.buffer = [], this.length = 0;
	}
	n.prototype = {
		get: function(e) {
			let t = Math.floor(e / 8);
			return (this.buffer[t] >>> 7 - e % 8 & 1) == 1;
		},
		put: function(e, t) {
			for (let n = 0; n < t; n++) this.putBit((e >>> t - n - 1 & 1) == 1);
		},
		getLengthInBits: function() {
			return this.length;
		},
		putBit: function(e) {
			let t = Math.floor(this.length / 8);
			this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
		}
	}, t.exports = n;
})), hd = /* @__PURE__ */ s(((e, t) => {
	function n(e) {
		if (!e || e < 1) throw Error("BitMatrix size must be defined and greater than 0");
		this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
	}
	n.prototype.set = function(e, t, n, r) {
		let i = e * this.size + t;
		this.data[i] = n, r && (this.reservedBit[i] = !0);
	}, n.prototype.get = function(e, t) {
		return this.data[e * this.size + t];
	}, n.prototype.xor = function(e, t, n) {
		this.data[e * this.size + t] ^= n;
	}, n.prototype.isReserved = function(e, t) {
		return this.reservedBit[e * this.size + t];
	}, t.exports = n;
})), gd = /* @__PURE__ */ s(((e) => {
	var t = fd().getSymbolSize;
	e.getRowColCoords = function(e) {
		if (e === 1) return [];
		let n = Math.floor(e / 7) + 2, r = t(e), i = r === 145 ? 26 : Math.ceil((r - 13) / (2 * n - 2)) * 2, a = [r - 7];
		for (let e = 1; e < n - 1; e++) a[e] = a[e - 1] - i;
		return a.push(6), a.reverse();
	}, e.getPositions = function(t) {
		let n = [], r = e.getRowColCoords(t), i = r.length;
		for (let e = 0; e < i; e++) for (let t = 0; t < i; t++) e === 0 && t === 0 || e === 0 && t === i - 1 || e === i - 1 && t === 0 || n.push([r[e], r[t]]);
		return n;
	};
})), _d = /* @__PURE__ */ s(((e) => {
	var t = fd().getSymbolSize, n = 7;
	e.getPositions = function(e) {
		let r = t(e);
		return [
			[0, 0],
			[r - n, 0],
			[0, r - n]
		];
	};
})), vd = /* @__PURE__ */ s(((e) => {
	e.Patterns = {
		PATTERN000: 0,
		PATTERN001: 1,
		PATTERN010: 2,
		PATTERN011: 3,
		PATTERN100: 4,
		PATTERN101: 5,
		PATTERN110: 6,
		PATTERN111: 7
	};
	var t = {
		N1: 3,
		N2: 3,
		N3: 40,
		N4: 10
	};
	e.isValid = function(e) {
		return e != null && e !== "" && !isNaN(e) && e >= 0 && e <= 7;
	}, e.from = function(t) {
		return e.isValid(t) ? parseInt(t, 10) : void 0;
	}, e.getPenaltyN1 = function(e) {
		let n = e.size, r = 0, i = 0, a = 0, o = null, s = null;
		for (let c = 0; c < n; c++) {
			i = a = 0, o = s = null;
			for (let l = 0; l < n; l++) {
				let n = e.get(c, l);
				n === o ? i++ : (i >= 5 && (r += t.N1 + (i - 5)), o = n, i = 1), n = e.get(l, c), n === s ? a++ : (a >= 5 && (r += t.N1 + (a - 5)), s = n, a = 1);
			}
			i >= 5 && (r += t.N1 + (i - 5)), a >= 5 && (r += t.N1 + (a - 5));
		}
		return r;
	}, e.getPenaltyN2 = function(e) {
		let n = e.size, r = 0;
		for (let t = 0; t < n - 1; t++) for (let i = 0; i < n - 1; i++) {
			let n = e.get(t, i) + e.get(t, i + 1) + e.get(t + 1, i) + e.get(t + 1, i + 1);
			(n === 4 || n === 0) && r++;
		}
		return r * t.N2;
	}, e.getPenaltyN3 = function(e) {
		let n = e.size, r = 0, i = 0, a = 0;
		for (let t = 0; t < n; t++) {
			i = a = 0;
			for (let o = 0; o < n; o++) i = i << 1 & 2047 | e.get(t, o), o >= 10 && (i === 1488 || i === 93) && r++, a = a << 1 & 2047 | e.get(o, t), o >= 10 && (a === 1488 || a === 93) && r++;
		}
		return r * t.N3;
	}, e.getPenaltyN4 = function(e) {
		let n = 0, r = e.data.length;
		for (let t = 0; t < r; t++) n += e.data[t];
		return Math.abs(Math.ceil(n * 100 / r / 5) - 10) * t.N4;
	};
	function n(t, n, r) {
		switch (t) {
			case e.Patterns.PATTERN000: return (n + r) % 2 == 0;
			case e.Patterns.PATTERN001: return n % 2 == 0;
			case e.Patterns.PATTERN010: return r % 3 == 0;
			case e.Patterns.PATTERN011: return (n + r) % 3 == 0;
			case e.Patterns.PATTERN100: return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 == 0;
			case e.Patterns.PATTERN101: return n * r % 2 + n * r % 3 == 0;
			case e.Patterns.PATTERN110: return (n * r % 2 + n * r % 3) % 2 == 0;
			case e.Patterns.PATTERN111: return (n * r % 3 + (n + r) % 2) % 2 == 0;
			default: throw Error("bad maskPattern:" + t);
		}
	}
	e.applyMask = function(e, t) {
		let r = t.size;
		for (let i = 0; i < r; i++) for (let a = 0; a < r; a++) t.isReserved(a, i) || t.xor(a, i, n(e, a, i));
	}, e.getBestMask = function(t, n) {
		let r = Object.keys(e.Patterns).length, i = 0, a = Infinity;
		for (let o = 0; o < r; o++) {
			n(o), e.applyMask(o, t);
			let r = e.getPenaltyN1(t) + e.getPenaltyN2(t) + e.getPenaltyN3(t) + e.getPenaltyN4(t);
			e.applyMask(o, t), r < a && (a = r, i = o);
		}
		return i;
	};
})), yd = /* @__PURE__ */ s(((e) => {
	var t = pd(), n = [
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		2,
		2,
		1,
		2,
		2,
		4,
		1,
		2,
		4,
		4,
		2,
		4,
		4,
		4,
		2,
		4,
		6,
		5,
		2,
		4,
		6,
		6,
		2,
		5,
		8,
		8,
		4,
		5,
		8,
		8,
		4,
		5,
		8,
		11,
		4,
		8,
		10,
		11,
		4,
		9,
		12,
		16,
		4,
		9,
		16,
		16,
		6,
		10,
		12,
		18,
		6,
		10,
		17,
		16,
		6,
		11,
		16,
		19,
		6,
		13,
		18,
		21,
		7,
		14,
		21,
		25,
		8,
		16,
		20,
		25,
		8,
		17,
		23,
		25,
		9,
		17,
		23,
		34,
		9,
		18,
		25,
		30,
		10,
		20,
		27,
		32,
		12,
		21,
		29,
		35,
		12,
		23,
		34,
		37,
		12,
		25,
		34,
		40,
		13,
		26,
		35,
		42,
		14,
		28,
		38,
		45,
		15,
		29,
		40,
		48,
		16,
		31,
		43,
		51,
		17,
		33,
		45,
		54,
		18,
		35,
		48,
		57,
		19,
		37,
		51,
		60,
		19,
		38,
		53,
		63,
		20,
		40,
		56,
		66,
		21,
		43,
		59,
		70,
		22,
		45,
		62,
		74,
		24,
		47,
		65,
		77,
		25,
		49,
		68,
		81
	], r = [
		7,
		10,
		13,
		17,
		10,
		16,
		22,
		28,
		15,
		26,
		36,
		44,
		20,
		36,
		52,
		64,
		26,
		48,
		72,
		88,
		36,
		64,
		96,
		112,
		40,
		72,
		108,
		130,
		48,
		88,
		132,
		156,
		60,
		110,
		160,
		192,
		72,
		130,
		192,
		224,
		80,
		150,
		224,
		264,
		96,
		176,
		260,
		308,
		104,
		198,
		288,
		352,
		120,
		216,
		320,
		384,
		132,
		240,
		360,
		432,
		144,
		280,
		408,
		480,
		168,
		308,
		448,
		532,
		180,
		338,
		504,
		588,
		196,
		364,
		546,
		650,
		224,
		416,
		600,
		700,
		224,
		442,
		644,
		750,
		252,
		476,
		690,
		816,
		270,
		504,
		750,
		900,
		300,
		560,
		810,
		960,
		312,
		588,
		870,
		1050,
		336,
		644,
		952,
		1110,
		360,
		700,
		1020,
		1200,
		390,
		728,
		1050,
		1260,
		420,
		784,
		1140,
		1350,
		450,
		812,
		1200,
		1440,
		480,
		868,
		1290,
		1530,
		510,
		924,
		1350,
		1620,
		540,
		980,
		1440,
		1710,
		570,
		1036,
		1530,
		1800,
		570,
		1064,
		1590,
		1890,
		600,
		1120,
		1680,
		1980,
		630,
		1204,
		1770,
		2100,
		660,
		1260,
		1860,
		2220,
		720,
		1316,
		1950,
		2310,
		750,
		1372,
		2040,
		2430
	];
	e.getBlocksCount = function(e, r) {
		switch (r) {
			case t.L: return n[(e - 1) * 4 + 0];
			case t.M: return n[(e - 1) * 4 + 1];
			case t.Q: return n[(e - 1) * 4 + 2];
			case t.H: return n[(e - 1) * 4 + 3];
			default: return;
		}
	}, e.getTotalCodewordsCount = function(e, n) {
		switch (n) {
			case t.L: return r[(e - 1) * 4 + 0];
			case t.M: return r[(e - 1) * 4 + 1];
			case t.Q: return r[(e - 1) * 4 + 2];
			case t.H: return r[(e - 1) * 4 + 3];
			default: return;
		}
	};
})), bd = /* @__PURE__ */ s(((e) => {
	var t = /* @__PURE__ */ new Uint8Array(512), n = /* @__PURE__ */ new Uint8Array(256);
	(function() {
		let e = 1;
		for (let r = 0; r < 255; r++) t[r] = e, n[e] = r, e <<= 1, e & 256 && (e ^= 285);
		for (let e = 255; e < 512; e++) t[e] = t[e - 255];
	})(), e.log = function(e) {
		if (e < 1) throw Error("log(" + e + ")");
		return n[e];
	}, e.exp = function(e) {
		return t[e];
	}, e.mul = function(e, r) {
		return e === 0 || r === 0 ? 0 : t[n[e] + n[r]];
	};
})), xd = /* @__PURE__ */ s(((e) => {
	var t = bd();
	e.mul = function(e, n) {
		let r = new Uint8Array(e.length + n.length - 1);
		for (let i = 0; i < e.length; i++) for (let a = 0; a < n.length; a++) r[i + a] ^= t.mul(e[i], n[a]);
		return r;
	}, e.mod = function(e, n) {
		let r = new Uint8Array(e);
		for (; r.length - n.length >= 0;) {
			let e = r[0];
			for (let i = 0; i < n.length; i++) r[i] ^= t.mul(n[i], e);
			let i = 0;
			for (; i < r.length && r[i] === 0;) i++;
			r = r.slice(i);
		}
		return r;
	}, e.generateECPolynomial = function(n) {
		let r = new Uint8Array([1]);
		for (let i = 0; i < n; i++) r = e.mul(r, new Uint8Array([1, t.exp(i)]));
		return r;
	};
})), Sd = /* @__PURE__ */ s(((e, t) => {
	var n = xd();
	function r(e) {
		this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
	}
	r.prototype.initialize = function(e) {
		this.degree = e, this.genPoly = n.generateECPolynomial(this.degree);
	}, r.prototype.encode = function(e) {
		if (!this.genPoly) throw Error("Encoder not initialized");
		let t = new Uint8Array(e.length + this.degree);
		t.set(e);
		let r = n.mod(t, this.genPoly), i = this.degree - r.length;
		if (i > 0) {
			let e = new Uint8Array(this.degree);
			return e.set(r, i), e;
		}
		return r;
	}, t.exports = r;
})), Cd = /* @__PURE__ */ s(((e) => {
	e.isValid = function(e) {
		return !isNaN(e) && e >= 1 && e <= 40;
	};
})), wd = /* @__PURE__ */ s(((e) => {
	var t = "[0-9]+", n = "[A-Z $%*+\\-./:]+", r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
	r = r.replace(/u/g, "\\u");
	var i = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + ")(?:.|[\r\n]))+";
	e.KANJI = new RegExp(r, "g"), e.BYTE_KANJI = /* @__PURE__ */ RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), e.BYTE = new RegExp(i, "g"), e.NUMERIC = new RegExp(t, "g"), e.ALPHANUMERIC = new RegExp(n, "g");
	var a = RegExp("^" + r + "$"), o = /* @__PURE__ */ RegExp("^[0-9]+$"), s = /* @__PURE__ */ RegExp("^[A-Z0-9 $%*+\\-./:]+$");
	e.testKanji = function(e) {
		return a.test(e);
	}, e.testNumeric = function(e) {
		return o.test(e);
	}, e.testAlphanumeric = function(e) {
		return s.test(e);
	};
})), Td = /* @__PURE__ */ s(((e) => {
	var t = Cd(), n = wd();
	e.NUMERIC = {
		id: "Numeric",
		bit: 1,
		ccBits: [
			10,
			12,
			14
		]
	}, e.ALPHANUMERIC = {
		id: "Alphanumeric",
		bit: 2,
		ccBits: [
			9,
			11,
			13
		]
	}, e.BYTE = {
		id: "Byte",
		bit: 4,
		ccBits: [
			8,
			16,
			16
		]
	}, e.KANJI = {
		id: "Kanji",
		bit: 8,
		ccBits: [
			8,
			10,
			12
		]
	}, e.MIXED = { bit: -1 }, e.getCharCountIndicator = function(e, n) {
		if (!e.ccBits) throw Error("Invalid mode: " + e);
		if (!t.isValid(n)) throw Error("Invalid version: " + n);
		return n >= 1 && n < 10 ? e.ccBits[0] : n < 27 ? e.ccBits[1] : e.ccBits[2];
	}, e.getBestModeForData = function(t) {
		return n.testNumeric(t) ? e.NUMERIC : n.testAlphanumeric(t) ? e.ALPHANUMERIC : n.testKanji(t) ? e.KANJI : e.BYTE;
	}, e.toString = function(e) {
		if (e && e.id) return e.id;
		throw Error("Invalid mode");
	}, e.isValid = function(e) {
		return e && e.bit && e.ccBits;
	};
	function r(t) {
		if (typeof t != "string") throw Error("Param is not a string");
		switch (t.toLowerCase()) {
			case "numeric": return e.NUMERIC;
			case "alphanumeric": return e.ALPHANUMERIC;
			case "kanji": return e.KANJI;
			case "byte": return e.BYTE;
			default: throw Error("Unknown mode: " + t);
		}
	}
	e.from = function(t, n) {
		if (e.isValid(t)) return t;
		try {
			return r(t);
		} catch {
			return n;
		}
	};
})), Ed = /* @__PURE__ */ s(((e) => {
	var t = fd(), n = yd(), r = pd(), i = Td(), a = Cd(), o = 7973, s = t.getBCHDigit(o);
	function c(t, n, r) {
		for (let i = 1; i <= 40; i++) if (n <= e.getCapacity(i, r, t)) return i;
	}
	function l(e, t) {
		return i.getCharCountIndicator(e, t) + 4;
	}
	function u(e, t) {
		let n = 0;
		return e.forEach(function(e) {
			let r = l(e.mode, t);
			n += r + e.getBitsLength();
		}), n;
	}
	function d(t, n) {
		for (let r = 1; r <= 40; r++) if (u(t, r) <= e.getCapacity(r, n, i.MIXED)) return r;
	}
	e.from = function(e, t) {
		return a.isValid(e) ? parseInt(e, 10) : t;
	}, e.getCapacity = function(e, r, o) {
		if (!a.isValid(e)) throw Error("Invalid QR Code version");
		o === void 0 && (o = i.BYTE);
		let s = (t.getSymbolTotalCodewords(e) - n.getTotalCodewordsCount(e, r)) * 8;
		if (o === i.MIXED) return s;
		let c = s - l(o, e);
		switch (o) {
			case i.NUMERIC: return Math.floor(c / 10 * 3);
			case i.ALPHANUMERIC: return Math.floor(c / 11 * 2);
			case i.KANJI: return Math.floor(c / 13);
			case i.BYTE:
			default: return Math.floor(c / 8);
		}
	}, e.getBestVersionForData = function(e, t) {
		let n, i = r.from(t, r.M);
		if (Array.isArray(e)) {
			if (e.length > 1) return d(e, i);
			if (e.length === 0) return 1;
			n = e[0];
		} else n = e;
		return c(n.mode, n.getLength(), i);
	}, e.getEncodedBits = function(e) {
		if (!a.isValid(e) || e < 7) throw Error("Invalid QR Code version");
		let n = e << 12;
		for (; t.getBCHDigit(n) - s >= 0;) n ^= o << t.getBCHDigit(n) - s;
		return e << 12 | n;
	};
})), Dd = /* @__PURE__ */ s(((e) => {
	var t = fd(), n = 1335, r = 21522, i = t.getBCHDigit(n);
	e.getEncodedBits = function(e, a) {
		let o = e.bit << 3 | a, s = o << 10;
		for (; t.getBCHDigit(s) - i >= 0;) s ^= n << t.getBCHDigit(s) - i;
		return (o << 10 | s) ^ r;
	};
})), Od = /* @__PURE__ */ s(((e, t) => {
	var n = Td();
	function r(e) {
		this.mode = n.NUMERIC, this.data = e.toString();
	}
	r.getBitsLength = function(e) {
		return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
	}, r.prototype.getLength = function() {
		return this.data.length;
	}, r.prototype.getBitsLength = function() {
		return r.getBitsLength(this.data.length);
	}, r.prototype.write = function(e) {
		let t, n, r;
		for (t = 0; t + 3 <= this.data.length; t += 3) n = this.data.substr(t, 3), r = parseInt(n, 10), e.put(r, 10);
		let i = this.data.length - t;
		i > 0 && (n = this.data.substr(t), r = parseInt(n, 10), e.put(r, i * 3 + 1));
	}, t.exports = r;
})), kd = /* @__PURE__ */ s(((e, t) => {
	var n = Td(), r = /* @__PURE__ */ "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
	function i(e) {
		this.mode = n.ALPHANUMERIC, this.data = e;
	}
	i.getBitsLength = function(e) {
		return 11 * Math.floor(e / 2) + e % 2 * 6;
	}, i.prototype.getLength = function() {
		return this.data.length;
	}, i.prototype.getBitsLength = function() {
		return i.getBitsLength(this.data.length);
	}, i.prototype.write = function(e) {
		let t = 0;
		for (; t + 2 <= this.data.length; t += 2) {
			let n = r.indexOf(this.data[t]) * 45;
			n += r.indexOf(this.data[t + 1]), e.put(n, 11);
		}
		this.data.length % 2 && e.put(r.indexOf(this.data[t]), 6);
	}, t.exports = i;
})), Ad = /* @__PURE__ */ s(((e, t) => {
	var n = Td();
	function r(e) {
		this.mode = n.BYTE, this.data = typeof e == "string" ? new TextEncoder().encode(e) : new Uint8Array(e);
	}
	r.getBitsLength = function(e) {
		return e * 8;
	}, r.prototype.getLength = function() {
		return this.data.length;
	}, r.prototype.getBitsLength = function() {
		return r.getBitsLength(this.data.length);
	}, r.prototype.write = function(e) {
		for (let t = 0, n = this.data.length; t < n; t++) e.put(this.data[t], 8);
	}, t.exports = r;
})), jd = /* @__PURE__ */ s(((e, t) => {
	var n = Td(), r = fd();
	function i(e) {
		this.mode = n.KANJI, this.data = e;
	}
	i.getBitsLength = function(e) {
		return e * 13;
	}, i.prototype.getLength = function() {
		return this.data.length;
	}, i.prototype.getBitsLength = function() {
		return i.getBitsLength(this.data.length);
	}, i.prototype.write = function(e) {
		let t = 0;
		for (; t < this.data.length; t++) {
			let n = r.toSJIS(this.data[t]);
			if (n >= 33088 && n <= 40956) n -= 33088;
			else if (n >= 57408 && n <= 60351) n -= 49472;
			else throw Error("Invalid SJIS character: " + this.data[t] + "\nMake sure your charset is UTF-8");
			n = (n >>> 8 & 255) * 192 + (n & 255), e.put(n, 13);
		}
	}, t.exports = i;
})), Md = /* @__PURE__ */ s(((e, t) => {
	var n = {
		single_source_shortest_paths: function(e, t, r) {
			var i = {}, a = {};
			a[t] = 0;
			var o = n.PriorityQueue.make();
			o.push(t, 0);
			for (var s, c, l, u, d, f, p, m, h; !o.empty();) for (l in s = o.pop(), c = s.value, u = s.cost, d = e[c] || {}, d) d.hasOwnProperty(l) && (f = d[l], p = u + f, m = a[l], h = a[l] === void 0, (h || m > p) && (a[l] = p, o.push(l, p), i[l] = c));
			if (r !== void 0 && a[r] === void 0) {
				var g = [
					"Could not find a path from ",
					t,
					" to ",
					r,
					"."
				].join("");
				throw Error(g);
			}
			return i;
		},
		extract_shortest_path_from_predecessor_list: function(e, t) {
			for (var n = [], r = t; r;) n.push(r), e[r], r = e[r];
			return n.reverse(), n;
		},
		find_path: function(e, t, r) {
			var i = n.single_source_shortest_paths(e, t, r);
			return n.extract_shortest_path_from_predecessor_list(i, r);
		},
		PriorityQueue: {
			make: function(e) {
				var t = n.PriorityQueue, r = {}, i;
				for (i in e = e || {}, t) t.hasOwnProperty(i) && (r[i] = t[i]);
				return r.queue = [], r.sorter = e.sorter || t.default_sorter, r;
			},
			default_sorter: function(e, t) {
				return e.cost - t.cost;
			},
			push: function(e, t) {
				var n = {
					value: e,
					cost: t
				};
				this.queue.push(n), this.queue.sort(this.sorter);
			},
			pop: function() {
				return this.queue.shift();
			},
			empty: function() {
				return this.queue.length === 0;
			}
		}
	};
	t !== void 0 && (t.exports = n);
})), Nd = /* @__PURE__ */ s(((e) => {
	var t = Td(), n = Od(), r = kd(), i = Ad(), a = jd(), o = wd(), s = fd(), c = Md();
	function l(e) {
		return unescape(encodeURIComponent(e)).length;
	}
	function u(e, t, n) {
		let r = [], i;
		for (; (i = e.exec(n)) !== null;) r.push({
			data: i[0],
			index: i.index,
			mode: t,
			length: i[0].length
		});
		return r;
	}
	function d(e) {
		let n = u(o.NUMERIC, t.NUMERIC, e), r = u(o.ALPHANUMERIC, t.ALPHANUMERIC, e), i, a;
		return s.isKanjiModeEnabled() ? (i = u(o.BYTE, t.BYTE, e), a = u(o.KANJI, t.KANJI, e)) : (i = u(o.BYTE_KANJI, t.BYTE, e), a = []), n.concat(r, i, a).sort(function(e, t) {
			return e.index - t.index;
		}).map(function(e) {
			return {
				data: e.data,
				mode: e.mode,
				length: e.length
			};
		});
	}
	function f(e, o) {
		switch (o) {
			case t.NUMERIC: return n.getBitsLength(e);
			case t.ALPHANUMERIC: return r.getBitsLength(e);
			case t.KANJI: return a.getBitsLength(e);
			case t.BYTE: return i.getBitsLength(e);
		}
	}
	function p(e) {
		return e.reduce(function(e, t) {
			let n = e.length - 1 >= 0 ? e[e.length - 1] : null;
			return n && n.mode === t.mode ? (e[e.length - 1].data += t.data, e) : (e.push(t), e);
		}, []);
	}
	function m(e) {
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			switch (i.mode) {
				case t.NUMERIC:
					n.push([
						i,
						{
							data: i.data,
							mode: t.ALPHANUMERIC,
							length: i.length
						},
						{
							data: i.data,
							mode: t.BYTE,
							length: i.length
						}
					]);
					break;
				case t.ALPHANUMERIC:
					n.push([i, {
						data: i.data,
						mode: t.BYTE,
						length: i.length
					}]);
					break;
				case t.KANJI:
					n.push([i, {
						data: i.data,
						mode: t.BYTE,
						length: l(i.data)
					}]);
					break;
				case t.BYTE: n.push([{
					data: i.data,
					mode: t.BYTE,
					length: l(i.data)
				}]);
			}
		}
		return n;
	}
	function h(e, n) {
		let r = {}, i = { start: {} }, a = ["start"];
		for (let o = 0; o < e.length; o++) {
			let s = e[o], c = [];
			for (let e = 0; e < s.length; e++) {
				let l = s[e], u = "" + o + e;
				c.push(u), r[u] = {
					node: l,
					lastCount: 0
				}, i[u] = {};
				for (let e = 0; e < a.length; e++) {
					let o = a[e];
					r[o] && r[o].node.mode === l.mode ? (i[o][u] = f(r[o].lastCount + l.length, l.mode) - f(r[o].lastCount, l.mode), r[o].lastCount += l.length) : (r[o] && (r[o].lastCount = l.length), i[o][u] = f(l.length, l.mode) + 4 + t.getCharCountIndicator(l.mode, n));
				}
			}
			a = c;
		}
		for (let e = 0; e < a.length; e++) i[a[e]].end = 0;
		return {
			map: i,
			table: r
		};
	}
	function g(e, o) {
		let c, l = t.getBestModeForData(e);
		if (c = t.from(o, l), c !== t.BYTE && c.bit < l.bit) throw Error("\"" + e + "\" cannot be encoded with mode " + t.toString(c) + ".\n Suggested mode is: " + t.toString(l));
		switch (c === t.KANJI && !s.isKanjiModeEnabled() && (c = t.BYTE), c) {
			case t.NUMERIC: return new n(e);
			case t.ALPHANUMERIC: return new r(e);
			case t.KANJI: return new a(e);
			case t.BYTE: return new i(e);
		}
	}
	e.fromArray = function(e) {
		return e.reduce(function(e, t) {
			return typeof t == "string" ? e.push(g(t, null)) : t.data && e.push(g(t.data, t.mode)), e;
		}, []);
	}, e.fromString = function(t, n) {
		let r = h(m(d(t, s.isKanjiModeEnabled())), n), i = c.find_path(r.map, "start", "end"), a = [];
		for (let e = 1; e < i.length - 1; e++) a.push(r.table[i[e]].node);
		return e.fromArray(p(a));
	}, e.rawSplit = function(t) {
		return e.fromArray(d(t, s.isKanjiModeEnabled()));
	};
})), Pd = /* @__PURE__ */ s(((e) => {
	var t = fd(), n = pd(), r = md(), i = hd(), a = gd(), o = _d(), s = vd(), c = yd(), l = Sd(), u = Ed(), d = Dd(), f = Td(), p = Nd();
	function m(e, t) {
		let n = e.size, r = o.getPositions(t);
		for (let t = 0; t < r.length; t++) {
			let i = r[t][0], a = r[t][1];
			for (let t = -1; t <= 7; t++) if (!(i + t <= -1 || n <= i + t)) for (let r = -1; r <= 7; r++) a + r <= -1 || n <= a + r || (t >= 0 && t <= 6 && (r === 0 || r === 6) || r >= 0 && r <= 6 && (t === 0 || t === 6) || t >= 2 && t <= 4 && r >= 2 && r <= 4 ? e.set(i + t, a + r, !0, !0) : e.set(i + t, a + r, !1, !0));
		}
	}
	function h(e) {
		let t = e.size;
		for (let n = 8; n < t - 8; n++) {
			let t = n % 2 == 0;
			e.set(n, 6, t, !0), e.set(6, n, t, !0);
		}
	}
	function g(e, t) {
		let n = a.getPositions(t);
		for (let t = 0; t < n.length; t++) {
			let r = n[t][0], i = n[t][1];
			for (let t = -2; t <= 2; t++) for (let n = -2; n <= 2; n++) t === -2 || t === 2 || n === -2 || n === 2 || t === 0 && n === 0 ? e.set(r + t, i + n, !0, !0) : e.set(r + t, i + n, !1, !0);
		}
	}
	function _(e, t) {
		let n = e.size, r = u.getEncodedBits(t), i, a, o;
		for (let t = 0; t < 18; t++) i = Math.floor(t / 3), a = t % 3 + n - 8 - 3, o = (r >> t & 1) == 1, e.set(i, a, o, !0), e.set(a, i, o, !0);
	}
	function v(e, t, n) {
		let r = e.size, i = d.getEncodedBits(t, n), a, o;
		for (a = 0; a < 15; a++) o = (i >> a & 1) == 1, a < 6 ? e.set(a, 8, o, !0) : a < 8 ? e.set(a + 1, 8, o, !0) : e.set(r - 15 + a, 8, o, !0), a < 8 ? e.set(8, r - a - 1, o, !0) : a < 9 ? e.set(8, 15 - a - 1 + 1, o, !0) : e.set(8, 15 - a - 1, o, !0);
		e.set(r - 8, 8, 1, !0);
	}
	function y(e, t) {
		let n = e.size, r = -1, i = n - 1, a = 7, o = 0;
		for (let s = n - 1; s > 0; s -= 2) for (s === 6 && s--;;) {
			for (let n = 0; n < 2; n++) if (!e.isReserved(i, s - n)) {
				let r = !1;
				o < t.length && (r = (t[o] >>> a & 1) == 1), e.set(i, s - n, r), a--, a === -1 && (o++, a = 7);
			}
			if (i += r, i < 0 || n <= i) {
				i -= r, r = -r;
				break;
			}
		}
	}
	function b(e, n, i) {
		let a = new r();
		i.forEach(function(t) {
			a.put(t.mode.bit, 4), a.put(t.getLength(), f.getCharCountIndicator(t.mode, e)), t.write(a);
		});
		let o = (t.getSymbolTotalCodewords(e) - c.getTotalCodewordsCount(e, n)) * 8;
		for (a.getLengthInBits() + 4 <= o && a.put(0, 4); a.getLengthInBits() % 8 != 0;) a.putBit(0);
		let s = (o - a.getLengthInBits()) / 8;
		for (let e = 0; e < s; e++) a.put(e % 2 ? 17 : 236, 8);
		return x(a, e, n);
	}
	function x(e, n, r) {
		let i = t.getSymbolTotalCodewords(n), a = i - c.getTotalCodewordsCount(n, r), o = c.getBlocksCount(n, r), s = o - i % o, u = Math.floor(i / o), d = Math.floor(a / o), f = d + 1, p = u - d, m = new l(p), h = 0, g = Array(o), _ = Array(o), v = 0, y = new Uint8Array(e.buffer);
		for (let e = 0; e < o; e++) {
			let t = e < s ? d : f;
			g[e] = y.slice(h, h + t), _[e] = m.encode(g[e]), h += t, v = Math.max(v, t);
		}
		let b = new Uint8Array(i), x = 0, S, C;
		for (S = 0; S < v; S++) for (C = 0; C < o; C++) S < g[C].length && (b[x++] = g[C][S]);
		for (S = 0; S < p; S++) for (C = 0; C < o; C++) b[x++] = _[C][S];
		return b;
	}
	function S(e, n, r, a) {
		let o;
		if (Array.isArray(e)) o = p.fromArray(e);
		else if (typeof e == "string") {
			let t = n;
			if (!t) {
				let n = p.rawSplit(e);
				t = u.getBestVersionForData(n, r);
			}
			o = p.fromString(e, t || 40);
		} else throw Error("Invalid data");
		let c = u.getBestVersionForData(o, r);
		if (!c) throw Error("The amount of data is too big to be stored in a QR Code");
		if (!n) n = c;
		else if (n < c) throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + c + ".\n");
		let l = b(n, r, o), d = new i(t.getSymbolSize(n));
		return m(d, n), h(d), g(d, n), v(d, r, 0), n >= 7 && _(d, n), y(d, l), isNaN(a) && (a = s.getBestMask(d, v.bind(null, d, r))), s.applyMask(a, d), v(d, r, a), {
			modules: d,
			version: n,
			errorCorrectionLevel: r,
			maskPattern: a,
			segments: o
		};
	}
	e.create = function(e, r) {
		if (e === void 0 || e === "") throw Error("No input text");
		let i = n.M, a, o;
		return r !== void 0 && (i = n.from(r.errorCorrectionLevel, n.M), a = u.from(r.version), o = s.from(r.maskPattern), r.toSJISFunc && t.setToSJISFunction(r.toSJISFunc)), S(e, a, i, o);
	};
})), Fd = /* @__PURE__ */ s(((e) => {
	function t(e) {
		if (typeof e == "number" && (e = e.toString()), typeof e != "string") throw Error("Color should be defined as hex string");
		let t = e.slice().replace("#", "").split("");
		if (t.length < 3 || t.length === 5 || t.length > 8) throw Error("Invalid hex color: " + e);
		(t.length === 3 || t.length === 4) && (t = Array.prototype.concat.apply([], t.map(function(e) {
			return [e, e];
		}))), t.length === 6 && t.push("F", "F");
		let n = parseInt(t.join(""), 16);
		return {
			r: n >> 24 & 255,
			g: n >> 16 & 255,
			b: n >> 8 & 255,
			a: n & 255,
			hex: "#" + t.slice(0, 6).join("")
		};
	}
	e.getOptions = function(e) {
		e || (e = {}), e.color || (e.color = {});
		let n = e.margin === void 0 || e.margin === null || e.margin < 0 ? 4 : e.margin, r = e.width && e.width >= 21 ? e.width : void 0, i = e.scale || 4;
		return {
			width: r,
			scale: r ? 4 : i,
			margin: n,
			color: {
				dark: t(e.color.dark || "#000000ff"),
				light: t(e.color.light || "#ffffffff")
			},
			type: e.type,
			rendererOpts: e.rendererOpts || {}
		};
	}, e.getScale = function(e, t) {
		return t.width && t.width >= e + t.margin * 2 ? t.width / (e + t.margin * 2) : t.scale;
	}, e.getImageWidth = function(t, n) {
		let r = e.getScale(t, n);
		return Math.floor((t + n.margin * 2) * r);
	}, e.qrToImageData = function(t, n, r) {
		let i = n.modules.size, a = n.modules.data, o = e.getScale(i, r), s = Math.floor((i + r.margin * 2) * o), c = r.margin * o, l = [r.color.light, r.color.dark];
		for (let e = 0; e < s; e++) for (let n = 0; n < s; n++) {
			let u = (e * s + n) * 4, d = r.color.light;
			if (e >= c && n >= c && e < s - c && n < s - c) {
				let t = Math.floor((e - c) / o), r = Math.floor((n - c) / o);
				d = l[+!!a[t * i + r]];
			}
			t[u++] = d.r, t[u++] = d.g, t[u++] = d.b, t[u] = d.a;
		}
	};
})), Id = /* @__PURE__ */ s(((e) => {
	var t = Fd();
	function n(e, t, n) {
		e.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), t.height = n, t.width = n, t.style.height = n + "px", t.style.width = n + "px";
	}
	function r() {
		try {
			return document.createElement("canvas");
		} catch {
			throw Error("You need to specify a canvas element");
		}
	}
	e.render = function(e, i, a) {
		let o = a, s = i;
		o === void 0 && (!i || !i.getContext) && (o = i, i = void 0), i || (s = r()), o = t.getOptions(o);
		let c = t.getImageWidth(e.modules.size, o), l = s.getContext("2d"), u = l.createImageData(c, c);
		return t.qrToImageData(u.data, e, o), n(l, s, c), l.putImageData(u, 0, 0), s;
	}, e.renderToDataURL = function(t, n, r) {
		let i = r;
		i === void 0 && (!n || !n.getContext) && (i = n, n = void 0), i || (i = {});
		let a = e.render(t, n, i), o = i.type || "image/png", s = i.rendererOpts || {};
		return a.toDataURL(o, s.quality);
	};
})), Ld = /* @__PURE__ */ s(((e) => {
	var t = Fd();
	function n(e, t) {
		let n = e.a / 255, r = t + "=\"" + e.hex + "\"";
		return n < 1 ? r + " " + t + "-opacity=\"" + n.toFixed(2).slice(1) + "\"" : r;
	}
	function r(e, t, n) {
		let r = e + t;
		return n !== void 0 && (r += " " + n), r;
	}
	function i(e, t, n) {
		let i = "", a = 0, o = !1, s = 0;
		for (let c = 0; c < e.length; c++) {
			let l = Math.floor(c % t), u = Math.floor(c / t);
			!l && !o && (o = !0), e[c] ? (s++, c > 0 && l > 0 && e[c - 1] || (i += o ? r("M", l + n, .5 + u + n) : r("m", a, 0), a = 0, o = !1), l + 1 < t && e[c + 1] || (i += r("h", s), s = 0)) : a++;
		}
		return i;
	}
	e.render = function(e, r, a) {
		let o = t.getOptions(r), s = e.modules.size, c = e.modules.data, l = s + o.margin * 2, u = o.color.light.a ? "<path " + n(o.color.light, "fill") + " d=\"M0 0h" + l + "v" + l + "H0z\"/>" : "", d = "<path " + n(o.color.dark, "stroke") + " d=\"" + i(c, s, o.margin) + "\"/>", f = "viewBox=\"0 0 " + l + " " + l + "\"", p = "<svg xmlns=\"http://www.w3.org/2000/svg\" " + (o.width ? "width=\"" + o.width + "\" height=\"" + o.width + "\" " : "") + f + " shape-rendering=\"crispEdges\">" + u + d + "</svg>\n";
		return typeof a == "function" && a(null, p), p;
	};
})), Rd = /* @__PURE__ */ u((/* @__PURE__ */ s(((e) => {
	var t = dd(), n = Pd(), r = Id(), i = Ld();
	function a(e, r, i, a, o) {
		let s = [].slice.call(arguments, 1), c = s.length, l = typeof s[c - 1] == "function";
		if (!l && !t()) throw Error("Callback required as last argument");
		if (l) {
			if (c < 2) throw Error("Too few arguments provided");
			c === 2 ? (o = i, i = r, r = a = void 0) : c === 3 && (r.getContext && o === void 0 ? (o = a, a = void 0) : (o = a, a = i, i = r, r = void 0));
		} else {
			if (c < 1) throw Error("Too few arguments provided");
			return c === 1 ? (i = r, r = a = void 0) : c === 2 && !r.getContext && (a = i, i = r, r = void 0), new Promise(function(t, o) {
				try {
					t(e(n.create(i, a), r, a));
				} catch (e) {
					o(e);
				}
			});
		}
		try {
			let t = n.create(i, a);
			o(null, e(t, r, a));
		} catch (e) {
			o(e);
		}
	}
	e.create = n.create, e.toCanvas = a.bind(null, r.render), e.toDataURL = a.bind(null, r.renderToDataURL), e.toString = a.bind(null, function(e, t, n) {
		return i.render(e, n);
	});
})))(), 1), zd = 2;
function Bd(e, t, n, r = "#ffffff") {
	let i = new X.Group({
		width: t,
		height: t
	});
	i.add(new X.Rect({
		width: t,
		height: t,
		fill: r
	}));
	let a = null;
	try {
		a = Rd.create(e.trim() || " ", { errorCorrectionLevel: "M" }).modules;
	} catch {
		a = null;
	}
	if (!a) return i;
	let o = t / (a.size + 4);
	return i.add(new X.Shape({
		fill: n,
		listening: !1,
		sceneFunc: (e, t) => {
			e.beginPath();
			for (let t = 0; t < a.size; t++) for (let n = 0; n < a.size; n++) a.get(t, n) && e.rect((n + zd) * o, (t + zd) * o, o + .02, o + .02);
			e.fillShape(t);
		}
	})), i;
}
function Vd(e, t) {
	let n;
	try {
		n = Rd.create(e.trim() || " ", { errorCorrectionLevel: "M" }).modules;
	} catch {
		return "";
	}
	let r = t / (n.size + 4), i = "";
	for (let e = 0; e < n.size; e++) for (let t = 0; t < n.size; t++) n.get(e, t) && (i += `M${((t + zd) * r).toFixed(3)} ${((e + zd) * r).toFixed(3)}h${r.toFixed(3)}v${r.toFixed(3)}h${(-r).toFixed(3)}z`);
	return i;
}
//#endregion
//#region src/render/filters.ts
Iu();
function Hd(e) {
	return (t) => {
		let { width: n, height: r, data: i } = t, a = new Uint8ClampedArray(i);
		for (let t = 0; t < r; t++) for (let o = 0; o < n; o++) {
			let s = (t * n + o) * 4, c = 0, l = 0, u = 0;
			for (let i = -1; i <= 1; i++) for (let s = -1; s <= 1; s++) {
				let d = Math.min(n - 1, Math.max(0, o + s)), f = (Math.min(r - 1, Math.max(0, t + i)) * n + d) * 4, p = e[(i + 1) * 3 + (s + 1)];
				c += a[f] * p, l += a[f + 1] * p, u += a[f + 2] * p;
			}
			i[s] = c, i[s + 1] = l, i[s + 2] = u;
		}
	};
}
var Ud = (e) => (t) => {
	let n = t.data;
	for (let t = 0; t < n.length; t += 4) {
		let [r, i, a] = e(n[t], n[t + 1], n[t + 2]);
		n[t] = r, n[t + 1] = i, n[t + 2] = a;
	}
}, Wd = {
	sepia: X.Filters.Sepia,
	greyscale: X.Filters.Grayscale,
	blur: X.Filters.Blur,
	emboss: Hd([
		1,
		1,
		1,
		1,
		.7,
		-1,
		-1,
		-1,
		-1
	]),
	sharpen: Hd([
		0,
		-1,
		0,
		-1,
		5,
		-1,
		0,
		-1,
		0
	]),
	greenify: Ud((e, t) => [
		0,
		t,
		0
	]),
	blueify: Ud((e, t, n) => [
		0,
		t * .5,
		n * .8
	]),
	pinkify: Ud((e, t, n) => [
		e,
		t * .3,
		n * .8
	]),
	orangeify: Ud((e, t, n) => [
		Math.min(255, e * 1.2),
		Math.min(255, t * .9),
		n * .2
	])
}, Gd = Object.keys(Wd);
//#endregion
//#region src/render/legacy/fabricShim.ts
function Kd(e) {
	return {
		Image: { fromURL(t, n) {
			e.track(e.load(t), (e) => n(new Jd("image", {
				image: e,
				width: e.naturalWidth,
				height: e.naturalHeight
			})));
		} },
		Circle: function(e) {
			return new Jd("circle", e);
		},
		Rect: function(e) {
			return new Jd("rect", e);
		},
		Polygon: function(e, t) {
			let n = e.map((e) => e.x), r = e.map((e) => e.y);
			return new Jd("polygon", {
				...t,
				points: e,
				width: Math.max(...n) - Math.min(...n),
				height: Math.max(...r) - Math.min(...r)
			});
		}
	};
}
function qd(e) {
	let t = e.stroke ? e.strokeWidth : 0, n = {
		fill: e.fill ?? void 0,
		stroke: e.stroke ?? void 0,
		strokeWidth: e.stroke ? e.strokeWidth : 0,
		listening: !1
	}, r = e.getBoundingRect();
	switch (e.kind) {
		case "image": {
			if (!e.image) return null;
			let t = e.width * e.scaleX, n = e.height * e.scaleY;
			return new X.Image({
				image: e.image,
				width: e.width,
				height: e.height,
				x: r.left + (e.flipX ? t : 0),
				y: r.top + (e.flipY ? n : 0),
				scaleX: e.flipX ? -e.scaleX : e.scaleX,
				scaleY: e.flipY ? -e.scaleY : e.scaleY,
				rotation: e.angle,
				listening: !1
			});
		}
		case "circle": return new X.Circle({
			...n,
			x: r.left + r.width / 2,
			y: r.top + r.height / 2,
			radius: e.radius * e.scaleX
		});
		case "rect": return new X.Rect({
			...n,
			x: r.left + t / 2,
			y: r.top + t / 2,
			width: e.width * e.scaleX,
			height: e.height * e.scaleY
		});
		case "polygon": {
			let i = Math.min(...e.points.map((e) => e.x)), a = Math.min(...e.points.map((e) => e.y));
			return new X.Line({
				...n,
				closed: !0,
				points: e.points.flatMap((n) => [r.left + (n.x - i) * e.scaleX + t / 2, r.top + (n.y - a) * e.scaleY + t / 2])
			});
		}
		default: return null;
	}
}
var Jd, Yd, Xd, Zd = o((() => {
	Iu(), Wt(), Jd = class {
		constructor(e, t = {}) {
			P(this, "kind", void 0), P(this, "canvas", null), P(this, "name", ""), P(this, "objectType", ""), P(this, "left", 0), P(this, "top", 0), P(this, "width", 0), P(this, "height", 0), P(this, "scaleX", 1), P(this, "scaleY", 1), P(this, "flipX", !1), P(this, "flipY", !1), P(this, "angle", 0), P(this, "originX", "left"), P(this, "originY", "top"), P(this, "strokeWidth", 1), P(this, "fill", null), P(this, "stroke", null), P(this, "radius", 0), P(this, "points", []), P(this, "image", null), this.kind = e, this.set(t);
		}
		set(e, t) {
			let n = typeof e == "string" ? { [e]: t } : e;
			return Object.assign(this, n), this.kind === "circle" && "radius" in n && (this.width = this.height = this.radius * 2), this;
		}
		setCoords() {
			return this;
		}
		getScaledWidth() {
			return this.width * this.scaleX;
		}
		getScaledHeight() {
			return this.height * this.scaleY;
		}
		scale(e) {
			return this.scaleX = this.scaleY = e, this;
		}
		scaleToWidth(e) {
			return this.scale(e / (this.width || 1));
		}
		scaleToHeight(e) {
			return this.scale(e / (this.height || 1));
		}
		bringToFront() {
			return this.canvas?.move(this, Infinity), this;
		}
		sendToBack() {
			return this.canvas?.move(this, 0), this;
		}
		getBoundingRect() {
			let e = this.stroke ? this.strokeWidth : 0, t = (this.width + e) * this.scaleX, n = (this.height + e) * this.scaleY, r = this.originX === "center" ? t / 2 : this.originX === "right" ? t : 0, i = this.originY === "center" ? n / 2 : this.originY === "bottom" ? n : 0;
			return {
				left: this.left - r,
				top: this.top - i,
				width: t,
				height: n
			};
		}
	}, Yd = class {
		constructor() {
			P(this, "objects", []);
		}
		getObjects() {
			return this.objects;
		}
		add(...e) {
			for (let t of e) t.kind !== "sign" && t.name && (this.objects = this.objects.filter((e) => e === t || e.kind === "sign" || e.name !== t.name)), t.canvas = this, this.objects.includes(t) || this.objects.push(t);
			return this;
		}
		remove(...e) {
			return this.objects = this.objects.filter((t) => !e.includes(t)), this;
		}
		move(e, t) {
			this.objects = this.objects.filter((t) => t !== e), this.objects.splice(Math.min(t, this.objects.length), 0, e);
		}
		moveAbove(e, t) {
			this.objects = this.objects.filter((t) => t !== e);
			let n = this.objects.indexOf(t);
			this.objects.splice(n < 0 ? this.objects.length : n + 1, 0, e);
		}
		renderAll() {}
		requestRenderAll() {}
	}, Xd = class {
		constructor() {
			P(this, "cache", /* @__PURE__ */ new Map()), P(this, "pending", 0), P(this, "waiters", []);
		}
		load(e) {
			let t = this.cache.get(e);
			return t || (t = new Promise((t, n) => {
				let r = new Image();
				r.crossOrigin = "anonymous", r.onload = () => t(r), r.onerror = () => n(Error(e)), r.src = e;
			}), this.cache.set(e, t)), t;
		}
		track(e, t) {
			this.pending++, e.then(t, () => void 0).finally(() => {
				this.pending--, this.pending || this.waiters.splice(0).forEach((e) => e());
			});
		}
		idle() {
			return this.pending ? new Promise((e) => this.waiters.push(e)) : Promise.resolve();
		}
	};
}));
//#endregion
//#region src/render/legacy/fixings.generated.ts
function Qd(e) {
	var t = e.fabric, n = e.methode, r = String(n || "").trim().toLowerCase(), i = /* @__PURE__ */ new Set([
		"adhesive",
		"adhesive-pad",
		"adhesive-tape"
	]), a = e.selectedShape, o = e.sizeRatio, s = e.fixScale, c = e.customUrl, l = e.fixingCount, u = e.run, d = e.run, f = e.knownTypes, p = e.console, m = e.handleConvertImageToDataURI, h = e.getFixingAssetCandidates, g = e.getFixingAssetCandidates, _ = e.handleResolveAssetUrl, v = e.handleGetSignBounds, y = e.handleGetObjectByName, b = e.handleInstallFixingAddGuard, x = e.resetFixing, S = e.moveObjectAbove;
	function C(e, t) {
		return e === 1 ? [[.5, .5]] : e === 2 ? t.width >= t.height ? [[.17, .5], [.83, .5]] : [[.5, .2], [.5, .8]] : e === 3 ? [
			[.5, .22],
			[.24, .74],
			[.76, .74]
		] : e >= 6 ? [
			[.2, .24],
			[.5, .24],
			[.8, .24],
			[.2, .76],
			[.5, .76],
			[.8, .76]
		] : [
			[.22, .24],
			[.78, .24],
			[.22, .76],
			[.78, .76]
		];
	}
	function w(e, n, r, i, a) {
		if (!e || !n || !r || a !== void 0 && a !== d) return;
		let o = y("safeObject", e), s = (t, n) => {
			(a === void 0 || a === d) && (t.set(Object.assign({
				selectable: !1,
				evented: !1,
				objectType: "aso-fixingMethods",
				name: "custom-fixing"
			}, n)), t.setCoords(), e.add(t), o && S(e, t, o), e.renderAll());
		};
		if (!i || i < 1) {
			t.Image.fromURL(n, function(e) {
				e.width && e.height && s(e, {
					scaleX: r.width / e.width,
					scaleY: r.height / e.height,
					left: r.left,
					top: r.top,
					id: 47
				});
			}, { crossOrigin: "anonymous" });
			return;
		}
		let c = C(i, r), l = Math.max(8, Math.min(r.width, r.height) * .11);
		c.forEach(function(e, i) {
			t.Image.fromURL(n, function(t) {
				let n = Math.max(t.width || 0, t.height || 0);
				if (!n) return;
				let a = l / n;
				s(t, {
					scaleX: a,
					scaleY: a,
					originX: "center",
					originY: "center",
					left: r.left + r.width * e[0],
					top: r.top + r.height * e[1],
					name: "custom-fixing" + (i + 1),
					id: 47 + i
				});
			}, { crossOrigin: "anonymous" });
		});
	}
	function ee(e) {
		b(e), x(e), !(r === "none" || i.has(r)) && (e.getObjects().forEach(function(r) {
			if (r.type !== "line" && r.name == "safeObject") {
				if (n == "screw" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (o == "small" && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), o == "big" && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX, t.height * t.scaleY, t.top = r.top, t.left = r.left, t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX;
						t.height * t.scaleY, t.top = r.top, t.left = r.left + (r.width - n), t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height - n), t.left = r.left, t.set("name", "screw3"), t.id = 9, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n), t.set("name", "screw4"), t.id = 10, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), a == "triangle" && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + i / 2, t.left = r.left + (r.width / 2 - n / 2), t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + n / 2, t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n) - n / 2, t.set("name", "screw3"), t.id = 9, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "oval" || a == "rotated-square") && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-left" || a == "arrow-left") && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-right" || a == "arrow-right") && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), a == "stop" && (m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "screw1"), t.id = 7, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "screw2"), t.id = 8, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "screw-cap" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (o == "small" && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), o == "big" && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX, t.height * t.scaleY, t.top = r.top, t.left = r.left, t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX;
						t.height * t.scaleY, t.top = r.top, t.left = r.left + (r.width - n), t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height - n), t.left = r.left, t.set("name", "screw-cap3"), t.id = 13, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n), t.set("name", "screw-cap4"), t.id = 14, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), a == "triangle" && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + i / 2, t.left = r.left + (r.width / 2 - n / 2), t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + n / 2, t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n) - n / 2, t.set("name", "screw-cap3"), t.id = 13, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "oval" || a == "rotated-square") && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-left" || a == "arrow-left") && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-right" || a == "arrow-right") && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), a == "stop" && (m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "screw-cap1"), t.id = 11, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_screw-cap.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "screw-cap2"), t.id = 12, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "suction-cup" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (o == "small" && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), o == "big" && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX, t.height * t.scaleY, t.top = r.top, t.left = r.left, t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX;
						t.height * t.scaleY, t.top = r.top, t.left = r.left + (r.width - n), t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height - n), t.left = r.left, t.set("name", "suction-cup3"), t.id = 17, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n), t.set("name", "suction-cup4"), t.id = 18, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), a == "triangle" && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + i / 2, t.left = r.left + (r.width / 2 - n / 2), t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + n / 2, t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n) - n / 2, t.set("name", "suction-cup3"), t.id = 17, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "oval" || a == "rotated-square") && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-left" || a == "arrow-left") && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-right" || a == "arrow-right") && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), a == "stop" && (m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "suction-cup1"), t.id = 15, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_suction-cup.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "suction-cup2"), t.id = 16, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "standoff" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (o == "small" && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), o == "big" && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX, t.height * t.scaleY, t.top = r.top, t.left = r.left, t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX;
						t.height * t.scaleY, t.top = r.top, t.left = r.left + (r.width - n), t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height - n), t.left = r.left, t.set("name", "standoff3"), t.id = 21, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n), t.set("name", "standoff4"), t.id = 22, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), a == "triangle" && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + i / 2, t.left = r.left + (r.width / 2 - n / 2), t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + n / 2, t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height - i), t.left = r.left + (r.width - n) - n / 2, t.set("name", "standoff3"), t.id = 21, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "oval" || a == "rotated-square") && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-left" || a == "arrow-left") && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + n / 2, t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "turn-right" || a == "arrow-right") && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n) - n / 2, t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), a == "stop" && (m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - n / 2), t.left = r.left, t.set("name", "standoff1"), t.id = 19, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_standoff.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + (r.width - n), t.set("name", "standoff2"), t.id = 20, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "flag" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides" || a == "turn-right" || a == "turn-left") && (o == "small" && m(h("im_flag.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left - n / 2, t.set("name", "flag1"), t.id = 23, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t), t.bringToFront();
					});
				}), o == "big" && (m(h("im_flag.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 4 - i / 2), t.left = r.left - n / 2, t.set("name", "flag1"), t.id = 23, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_flag.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 4 * 3 - i / 2), t.left = r.left - n / 2, t.set("name", "flag2"), t.id = 24, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), (a == "oval" || a == "stop") && m(h("im_flag.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left - n / 2, t.set("name", "flag1"), t.id = 23, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t), t.bringToFront();
					});
				}), a == "turn-left" && (o == "small" && m(h("im_flag-left.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 2 - i / 2), t.left = r.left + r.width - n / 2, t.set("name", "flag"), t.id = 23, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t), t.bringToFront();
					});
				}), o == "big" && (m(h("im_flag-left.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 4 - i / 2), t.left = r.left + r.width - n / 2, t.set("name", "flag1"), t.id = 23, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_flag-left.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + (r.height / 4 * 3 - i / 2), t.left = r.left + r.width - n / 2, t.set("name", "flag2"), t.id = 24, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})))), n == "table-stand" && (x(e), a == "square" || a == "rounded-square")) {
					var i = [
						{
							x: 0,
							y: 0
						},
						{
							x: -10,
							y: r.height / 10
						},
						{
							x: r.width + 10,
							y: r.height / 10
						},
						{
							x: r.width,
							y: 0
						}
					], d = new t.Polygon(i, {
						id: 25,
						left: r.left - 10,
						top: r.top + r.height,
						fill: "grey",
						name: "table-stand",
						selectable: !1
					});
					e.add(d), d.sendToBack();
				}
				if (n == "ceiling" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top - i / 2, t.left = r.left + r.width / 5 - n, t.set("name", "ceiling1"), t.id = 26, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top - n / 2, t.left = r.left + r.width / 5 * 4, t.set("name", "ceiling2"), t.id = 27, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), (a == "oval" || a == "stop") && m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top - i / 2, t.left = r.left + r.width / 2 - n / 2, t.set("name", "ceiling1"), t.id = 26, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), a == "turn-left" && (m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top - i / 2, t.left = r.left + r.width / 5 * 3.5 - n, t.set("name", "ceiling1"), t.id = 26, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top - n / 2, t.left = r.left + r.width / 5 * 4, t.set("name", "ceiling2"), t.id = 27, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), a == "turn-right" && (m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top - i / 2, t.left = r.left + r.width / 5 - n, t.set("name", "ceiling1"), t.id = 26, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_ceiling.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top - n / 2, t.left = r.left + r.width / 5 * 1.5, t.set("name", "ceiling2"), t.id = 27, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "hanging") {
					if (x(e), a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") {
						if (o == "small") {
							var y = new t.Circle({
								id: 28,
								radius: r.height * .06,
								fill: "#f5f5f5",
								left: r.left + r.width / 2 - 15,
								top: r.top + 15,
								name: "hanging-hole",
								strokeWidth: 2,
								stroke: "grey",
								selectable: !1
							});
							e.add(y);
						}
						if (o == "big") {
							var b = new t.Circle({
								id: 28,
								radius: r.height * .03,
								fill: "#f5f5f5",
								left: r.left + r.width / 8 - 15,
								top: r.top + 15,
								name: "hanging-hole1",
								strokeWidth: 2,
								stroke: "grey",
								selectable: !1
							}), S = new t.Circle({
								id: 29,
								radius: r.height * .03,
								fill: "#f5f5f5",
								left: r.left + r.width / 8 * 7 - 15,
								top: r.top + 15,
								name: "hanging-hole2",
								strokeWidth: 2,
								stroke: "grey",
								selectable: !1
							});
							e.add(b, S);
						}
					}
					if (a == "oval" || a == "stop" || a == "triangle" || a == "rotated-square") {
						var y = new t.Circle({
							id: 28,
							radius: r.height * .04,
							fill: "#f5f5f5",
							left: r.left + r.width / 2 - r.height * .04,
							top: r.top + 20,
							name: "hanging-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(y);
					}
				}
				if (n == "pole-attachment") {
					x(e);
					var C = new t.Rect({
						id: 30,
						width: r.width / 4,
						height: r.height * 2,
						top: r.top - r.height / 2,
						left: r.left + r.width / 2 - r.width / 4 / 2,
						fill: "grey",
						strokeWidth: 2,
						stroke: "grey",
						name: "pole",
						selectable: !1
					});
					e.add(C), C.sendToBack();
				}
				if (n == "cable-labeling") {
					if (x(e), a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") {
						var ee = new t.Rect({
							id: 31,
							width: r.width * .07,
							height: r.height * .05,
							top: r.top + r.height / 6 - r.height * .05,
							left: r.left + r.width / 7 - r.width * .05,
							fill: "#f5f5f5",
							strokeWidth: 2,
							stroke: "grey",
							name: "cable-hole1",
							selectable: !1
						}), T = new t.Rect({
							id: 32,
							width: r.width * .07,
							height: r.height * .05,
							top: r.top + r.height / 6 - r.height * .05,
							left: r.left + r.width / 7 * 6,
							fill: "#f5f5f5",
							strokeWidth: 2,
							stroke: "grey",
							name: "cable-hole2",
							selectable: !1
						}), te = new t.Rect({
							id: 33,
							width: r.width * .07,
							height: r.height * .05,
							top: r.top + r.height / 6 * 5 - r.height * .05,
							left: r.left + r.width / 7 - r.width * .05,
							fill: "#f5f5f5",
							strokeWidth: 2,
							stroke: "grey",
							name: "cable-hole3",
							selectable: !1
						}), E = new t.Rect({
							id: 34,
							width: r.width * .07,
							height: r.height * .05,
							top: r.top + r.height / 6 * 5 - r.height * .05,
							left: r.left + r.width / 7 * 6,
							fill: "#f5f5f5",
							strokeWidth: 2,
							stroke: "grey",
							name: "cable-hole4",
							selectable: !1
						});
						e.add(ee, T, te, E);
					}
					if (a == "oval" || a == "stop") {
						var ee = new t.Rect({
							id: 31,
							width: r.width * .07,
							height: r.height * .05,
							top: r.top + r.height / 2,
							left: r.left + r.width / 7 - r.width * .05,
							fill: "#f5f5f5",
							strokeWidth: 2,
							stroke: "grey",
							name: "cable-hole1",
							selectable: !1
						}), T = new t.Rect({
							id: 32,
							width: r.width * .07,
							height: r.height * .05,
							top: r.top + r.height / 2,
							left: r.left + r.width / 7 * 6,
							fill: "#f5f5f5",
							strokeWidth: 2,
							stroke: "grey",
							name: "cable-hole2",
							selectable: !1
						});
						e.add(ee, T);
					}
				}
				if (n == "table-clamp" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (m(h("im_table-clamp.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + r.height - i / 2, t.left = r.left + r.width / 5 - n, t.set("name", "table-clamp1"), t.id = 35, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_table-clamp.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + r.height - n / 2, t.left = r.left + r.width / 5 * 4, t.set("name", "table-clamp2"), t.id = 36, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "base-support" && (x(e), (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") && (m(h("im_base-support-left.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords();
						var n = t.width * t.scaleX, i = t.height * t.scaleY;
						t.top = r.top + r.height - i + 5, t.left = r.left + r.width / 5 - n, t.set("name", "base-support1"), t.id = 37, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_base-support-right.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scale(s), t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + r.height - n + 5, t.left = r.left + r.width / 5 * 4, t.set("name", "base-support2"), t.id = 38, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}))), n == "eyelets" && (a == "square" || a == "rounded-square")) {
					let n = typeof r.getScaledWidth == "function" ? r.getScaledWidth() : r.width * (r.scaleX || 1), i = typeof r.getScaledHeight == "function" ? r.getScaledHeight() : r.height * (r.scaleY || 1), a = (n, r, i, a, o = !1, s = !1) => {
						m(g("im_eyelets.png"), function(c) {
							t.Image.fromURL(c, function(t) {
								t.scale(.15), t.setCoords(), t.top = a(t), t.left = i(t), t.flipX = o, t.flipY = s, t.set("name", n), t.id = r, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
					};
					a("eyelet1", 39, () => r.left, () => r.top, !0), a("eyelet2", 40, (e) => r.left + n - e.width * e.scaleX, () => r.top), a("eyelet3", 41, () => r.left, (e) => r.top + i - e.height * e.scaleY, !0, !0), a("eyelet4", 42, (e) => r.left + n - e.width * e.scaleX, (e) => r.top + i - e.height * e.scaleY, !1, !0);
				}
				if (n == "keyring") {
					if (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides") {
						m(h("im_keyring.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.4, t.left = r.left - n / 2.5, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							}, { crossOrigin: "anonymous" });
						});
						var D = new t.Circle({
							id: 43,
							radius: r.height * .05,
							fill: "#f5f5f5",
							top: r.top + 13,
							left: r.left + 13,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
					if (a == "oval" || a == "stop") {
						m(h("im_keyring_oval.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.4, t.left = r.left + r.width / 2 - n / 2, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var O = r.height * .05, D = new t.Circle({
							id: 43,
							radius: O,
							fill: "#f5f5f5",
							top: r.top + 15,
							left: r.left + r.width / 2 - O,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
					if (a == "rotated-square") {
						m(h("im_keyring_losange.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.4, t.left = r.left + r.width / 2 - n / 2, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var O = r.height * .05, D = new t.Circle({
							id: 43,
							radius: O,
							fill: "#f5f5f5",
							top: r.top + 15,
							left: r.left + r.width / 2 - O,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
					if (a == "triangle") {
						m(h("im_keyring_triangle.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top + r.height / 10 - i / 1.2, t.left = r.left + r.width / 2 - n / 2, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var O = r.height * .05, D = new t.Circle({
							id: 43,
							radius: O,
							fill: "#f5f5f5",
							top: r.top + r.height / 10,
							left: r.left + r.width / 2 - O,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
				}
				if (n == "s-hook") {
					if (a == "square" || a == "rounded-square" || a == "rounded-top" || a == "rounded-sides" || a == "oval" || a == "stop") {
						m(h("im_s-hook.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.6), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.4, t.left = r.left + r.width / 2 - n / 2, t.set("name", "s-hook"), t.id = 45, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var O = r.height * .05, D = new t.Circle({
							id: 46,
							radius: O,
							fill: "#f5f5f5",
							top: r.top + r.height / 25,
							left: r.left + r.width / 2 - O,
							name: "s-hook-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
					if (a == "rotated-square") {
						m(h("im_s-hook_losange.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.6), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.5, t.left = r.left + r.width / 2 - n / 1.9, t.set("name", "s-hook"), t.id = 45, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var O = r.height * .05, D = new t.Circle({
							id: 46,
							radius: O,
							fill: "#f5f5f5",
							top: r.top + r.height / 15,
							left: r.left + r.width / 2 - O,
							name: "s-hook-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
					if (a == "triangle") {
						m(h("im_s-hook_triangle.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.6), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.6, t.left = r.left + r.width / 2 - n / 1.9, t.set("name", "s-hook"), t.id = 45, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var O = r.height * .05, D = new t.Circle({
							id: 46,
							radius: O,
							fill: "#f5f5f5",
							top: r.top + r.height / 10,
							left: r.left + r.width / 2 - O,
							name: "s-hook-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(D);
					}
				}
				if (n == "roll-up" && a == "square" && (m(h("im_roll-up_top.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scaleX = r.width / t.width, t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top - n, t.left = r.left, t.set("name", "roll-up-top"), t.id = 47, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_roll-up_bottom.jpg"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scaleX = r.width / t.width, t.setCoords(), t.width * t.scaleX, t.height * t.scaleY, t.top = r.top + r.height, t.left = r.left, t.set("name", "roll-up-bottom"), t.id = 48, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), n == "sign-holder" && a == "square" && (m(h("im_sign-holder.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scaleX = r.width / t.width, t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top - n + n / 2, t.left = r.left, t.set("name", "sign-holder-top"), t.id = 47, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				}), m(h("im_sign-holder.png"), function(n) {
					t.Image.fromURL(n, function(t) {
						t.scaleX = r.width / t.width, t.setCoords(), t.width * t.scaleX;
						var n = t.height * t.scaleY;
						t.top = r.top + r.height - n / 2, t.left = r.left, t.flipY = !0, t.set("name", "sign-holder-bottom"), t.id = 48, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
					});
				})), n == "custom") {
					let t = _(c, "fixing_methods_url");
					if (!t) {
						p.warn("[ASO] Fixation custom sans fichier : rien a dessiner.", {
							methode: n,
							url: c
						});
						return;
					}
					m(t, function(t) {
						w(e, t, v(r), l, u);
					});
				}
				if (c && n != "none" && n != "custom" && !f.includes(n)) {
					let t = _(c, "fixing_methods_url");
					if (!t) return;
					m(t, function(t) {
						w(e, t, v(r), l, u);
					});
				}
			}
			r.type === "line" && r.bringToFront();
		}), e.renderAll());
	}
	return { setFixing: ee };
}
var $d = o((() => {})), ef = /* @__PURE__ */ c({ drawLegacyFixings: () => tf });
async function tf(e) {
	let t = new Yd(), n = new Jd("sign", {
		name: "safeObject",
		left: 0,
		top: 0,
		width: e.width,
		height: e.height
	});
	t.add(n);
	let { setFixing: r } = Qd({
		fabric: Kd(rf),
		methode: e.method,
		selectedShape: e.shape,
		sizeRatio: e.sizeRatio,
		fixScale: e.fixScale,
		customUrl: e.customUrl,
		fixingCount: e.count,
		run: 1,
		knownTypes: nf,
		console: {
			log() {},
			info() {},
			warn() {},
			error() {}
		},
		handleConvertImageToDataURI(e, t) {
			let n = (Array.isArray(e) ? e : [e]).filter(Boolean), r = (e) => e >= n.length ? Promise.reject(/* @__PURE__ */ Error("fixation introuvable")) : rf.load(n[e]).then(() => n[e], () => r(e + 1));
			rf.track(r(0), t);
		},
		getFixingAssetCandidates: (t) => e.assetBases.map((e) => `${e.replace(/\/+$/, "")}/${t}`),
		handleResolveAssetUrl: (t) => t ? e.resolveUrl(t) : "",
		handleGetSignBounds: (e) => ({
			left: e.left,
			top: e.top,
			width: e.width,
			height: e.height
		}),
		handleGetObjectByName: (e, t) => t.getObjects().find((t) => t.name === e) ?? null,
		handleInstallFixingAddGuard() {},
		resetFixing: (e) => e.remove(...e.getObjects().filter((e) => e.kind !== "sign")),
		moveObjectAbove: (e, t, n) => e.moveAbove(t, n)
	});
	r(t), await rf.idle();
	let i = t.getObjects(), a = i.indexOf(n), o = (e) => e.map(qd).filter((e) => e !== null);
	return {
		back: o(i.slice(0, a)),
		front: o(i.slice(a + 1))
	};
}
var nf, rf, af = o((() => {
	Zd(), $d(), nf = [
		"none",
		"custom",
		"adhesive",
		"adhesive-pad",
		"adhesive-tape",
		"screw",
		"screw-cap",
		"suction-cup",
		"standoff",
		"flag",
		"table-stand",
		"ceiling",
		"hanging",
		"pole-attachment",
		"cable-labeling",
		"table-clamp",
		"base-support",
		"eyelets",
		"keyring",
		"s-hook",
		"roll-up",
		"sign-holder"
	], rf = new Xd();
})), of = /* @__PURE__ */ c({ computeContour: () => sf });
function sf(e, t, n = 1) {
	let r = e.width, i = e.height;
	if (!r || !i) return null;
	let a = Math.max(1, t), o = a * (1 + n) + 3, s = Math.min(2, Math.sqrt(yf / ((r + 2 * o) * (i + 2 * o)))), c = Math.ceil(o * s) + 2, l = Math.ceil(r * s) + 2 * c, u = Math.ceil(i * s) + 2 * c, d = document.createElement("canvas");
	d.width = l, d.height = u;
	let f = d.getContext("2d", { willReadFrequently: !0 });
	if (!f) return null;
	f.imageSmoothingEnabled = !0, f.drawImage(e, c, c, r * s, i * s);
	let p = a * s, m = p * n, h = null;
	for (let e = 0; e < 3; e++) {
		let t = cf(f, l, u);
		if (!t) return null;
		h = lf(t, l, u, p, m);
		let n = pf(h, l, u);
		if (n.count <= 1 || e === 2) break;
		mf(f, n, Math.max(2, p * .8));
	}
	if (!h) return null;
	let g = hf(h, l, u).map((e) => gf(e, .35)).filter((e) => e.length >= 3);
	if (!g.length) return null;
	let _ = (e) => [(e[0] - c) / s, (e[1] - c) / s], v = Infinity, y = Infinity, b = -Infinity, x = -Infinity;
	return {
		path: g.map((e) => {
			let t = e.map(_);
			for (let [e, n] of t) e < v && (v = e), n < y && (y = n), e > b && (b = e), n > x && (x = n);
			return vf(t);
		}).join(" "),
		bounds: {
			x: v,
			y,
			width: b - v,
			height: x - y
		}
	};
}
function cf(e, t, n) {
	let { data: r } = e.getImageData(0, 0, t, n), i = new Uint8Array(t * n), a = !1;
	for (let e = 0; e < i.length; e++) r[e * 4 + 3] > 32 && (i[e] = 1, a = !0);
	return a ? i : null;
}
function lf(e, t, n, r, i) {
	let a = t * n, o = new Float64Array(a);
	for (let t = 0; t < a; t++) o[t] = e[t] ? 0 : bf;
	uf(o, t, n);
	let s = r + i, c = s * s, l = new Uint8Array(a);
	for (let e = 0; e < a; e++) l[e] = +(o[e] <= c);
	ff(l, t, n);
	let u = new Float32Array(a);
	if (i <= 0) {
		for (let e = 0; e < a; e++) u[e] = l[e] ? Math.min(Math.sqrt(o[e]) - r, -.001) : Math.sqrt(o[e]) - r;
		return u;
	}
	let d = new Float64Array(a);
	for (let e = 0; e < a; e++) d[e] = l[e] ? bf : 0;
	uf(d, t, n);
	for (let e = 0; e < a; e++) u[e] = i - Math.sqrt(d[e]);
	return u;
}
function uf(e, t, n) {
	let r = Math.max(t, n), i = new Float64Array(r), a = new Float64Array(r), o = new Int32Array(r), s = new Float64Array(r + 1);
	for (let r = 0; r < t; r++) {
		for (let a = 0; a < n; a++) i[a] = e[a * t + r];
		df(i, n, a, o, s);
		for (let i = 0; i < n; i++) e[i * t + r] = a[i];
	}
	for (let r = 0; r < n; r++) {
		let n = r * t;
		for (let r = 0; r < t; r++) i[r] = e[n + r];
		df(i, t, a, o, s);
		for (let r = 0; r < t; r++) e[n + r] = a[r];
	}
}
function df(e, t, n, r, i) {
	let a = 0;
	r[0] = 0, i[0] = -0x56bc75e2d63100000, i[1] = bf;
	for (let n = 1; n < t; n++) {
		let t = r[a], o = (e[n] + n * n - (e[t] + t * t)) / (2 * n - 2 * t);
		for (; o <= i[a];) a--, t = r[a], o = (e[n] + n * n - (e[t] + t * t)) / (2 * n - 2 * t);
		a++, r[a] = n, i[a] = o, i[a + 1] = bf;
	}
	a = 0;
	for (let o = 0; o < t; o++) {
		for (; i[a + 1] < o;) a++;
		let t = r[a];
		n[o] = (o - t) * (o - t) + e[t];
	}
}
function ff(e, t, n) {
	let r = t * n, i = new Uint8Array(r), a = [], o = (t) => {
		!e[t] && !i[t] && (i[t] = 1, a.push(t));
	};
	for (let e = 0; e < t; e++) o(e), o((n - 1) * t + e);
	for (let e = 0; e < n; e++) o(e * t), o(e * t + t - 1);
	for (; a.length;) {
		let e = a.pop(), n = e % t;
		n > 0 && o(e - 1), n < t - 1 && o(e + 1), e >= t && o(e - t), e < r - t && o(e + t);
	}
	for (let t = 0; t < r; t++) !e[t] && !i[t] && (e[t] = 1);
}
function pf(e, t, n) {
	let r = t * n, i = new Int32Array(r).fill(-1), a = [], o = [];
	for (let s = 0; s < r; s++) {
		if (e[s] >= 0 || i[s] !== -1) continue;
		let r = a.length, c = [];
		for (i[s] = r, o.push(s); o.length;) {
			let a = o.pop(), s = a % t, l = (a - s) / t, u = !1;
			for (let c of [
				s > 0 ? a - 1 : -1,
				s < t - 1 ? a + 1 : -1,
				l > 0 ? a - t : -1,
				l < n - 1 ? a + t : -1
			]) c < 0 || (e[c] >= 0 ? u = !0 : i[c] === -1 && (i[c] = r, o.push(c)));
			u && c.push([s, l]);
		}
		a.push(c);
	}
	return {
		count: a.length,
		edges: a.map((e) => e.length > 300 ? e.filter((t, n) => n % Math.ceil(e.length / 300) === 0) : e)
	};
}
function mf(e, t, n) {
	let r = t.edges.length, i = (e, t) => {
		let n = {
			d: Infinity,
			p: e[0],
			q: t[0]
		};
		for (let r of e) for (let e of t) {
			let t = (r[0] - e[0]) ** 2 + (r[1] - e[1]) ** 2;
			t < n.d && (n = {
				d: t,
				p: r,
				q: e
			});
		}
		return n;
	}, a = Array(r).fill(!1);
	a[0] = !0, e.save(), e.strokeStyle = "#000", e.lineCap = "round", e.lineWidth = n;
	for (let n = 1; n < r; n++) {
		let n = null;
		for (let e = 0; e < r; e++) if (a[e]) for (let o = 0; o < r; o++) {
			if (a[o]) continue;
			let r = i(t.edges[e], t.edges[o]);
			(!n || r.d < n.d) && (n = {
				...r,
				j: o
			});
		}
		if (!n) break;
		a[n.j] = !0, e.beginPath(), e.moveTo(n.p[0] + .5, n.p[1] + .5), e.lineTo(n.q[0] + .5, n.q[1] + .5), e.stroke();
	}
	e.restore();
}
function hf(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = (e, n) => (n * t + e) * 2, o = (e, n) => (n * t + e) * 2 + 1, s = (e, t, n, i, a, o) => {
		if (r.has(e)) return;
		let s = i / (i - a);
		r.set(e, o ? [t + s, n] : [t, n + s]);
	}, c = (e, t) => {
		let n = i.get(e);
		n ? n.push(t) : i.set(e, [t]);
		let r = i.get(t);
		r ? r.push(e) : i.set(t, [e]);
	};
	for (let r = 0; r < n - 1; r++) for (let n = 0; n < t - 1; n++) {
		let i = e[r * t + n], l = e[r * t + n + 1], u = e[(r + 1) * t + n + 1], d = e[(r + 1) * t + n], f = i < 0, p = l < 0, m = u < 0, h = d < 0;
		if (f === p && p === m && m === h) continue;
		let g = a(n, r), _ = a(n, r + 1), v = o(n, r), y = o(n + 1, r);
		f !== p && s(g, n, r, i, l, !0), h !== m && s(_, n, r + 1, d, u, !0), f !== h && s(v, n, r, i, d, !1), p !== m && s(y, n + 1, r, l, u, !1);
		let b = [
			f !== p && g,
			p !== m && y,
			h !== m && _,
			f !== h && v
		].filter((e) => e !== !1);
		if (b.length === 2) c(b[0], b[1]);
		else {
			let e = (i + l + u + d) / 4 < 0;
			f !== e && c(g, v), p !== e && c(g, y), m !== e && c(y, _), h !== e && c(_, v);
		}
	}
	let l = /* @__PURE__ */ new Set(), u = [];
	for (let e of i.keys()) {
		if (l.has(e)) continue;
		let t = [], n = -1, a = e;
		for (let e = 0; e < 4e6; e++) {
			l.add(a), t.push(r.get(a));
			let e = (i.get(a) ?? []).find((e) => e !== n && !l.has(e));
			if (e === void 0) break;
			n = a, a = e;
		}
		t.length >= 3 && u.push(t);
	}
	return u;
}
function gf(e, t) {
	if (e.length < 8) return e;
	let n = 0, r = -1;
	for (let t = 1; t < e.length; t++) {
		let i = (e[t][0] - e[0][0]) ** 2 + (e[t][1] - e[0][1]) ** 2;
		i > r && (r = i, n = t);
	}
	let i = _f(e.slice(0, n + 1), t), a = _f([...e.slice(n), e[0]], t);
	return [...i.slice(0, -1), ...a.slice(0, -1)];
}
function _f(e, t) {
	let n = new Uint8Array(e.length);
	n[0] = 1, n[e.length - 1] = 1;
	let r = [[0, e.length - 1]];
	for (; r.length;) {
		let [i, a] = r.pop(), [o, s] = e[i], [c, l] = e[a], u = c - o, d = l - s, f = Math.hypot(u, d) || 1, p = -1, m = t;
		for (let t = i + 1; t < a; t++) {
			let n = Math.abs(d * e[t][0] - u * e[t][1] + c * s - l * o) / f;
			n > m && (m = n, p = t);
		}
		p >= 0 && (n[p] = 1, r.push([i, p], [p, a]));
	}
	return e.filter((e, t) => n[t]);
}
function vf(e) {
	let t = e.length, n = (e) => Number(e.toFixed(2)), r = (n) => e[(n + t) % t], i = `M${n(e[0][0])} ${n(e[0][1])}`;
	for (let e = 0; e < t; e++) {
		let t = r(e - 1), a = r(e), o = r(e + 1), s = r(e + 2);
		i += `C${n(a[0] + (o[0] - t[0]) / 6)} ${n(a[1] + (o[1] - t[1]) / 6)} ${n(o[0] - (s[0] - a[0]) / 6)} ${n(o[1] - (s[1] - a[1]) / 6)} ${n(o[0])} ${n(o[1])}`;
	}
	return `${i}Z`;
}
var yf, bf, xf = o((() => {
	yf = 1e6, bf = 0x56bc75e2d63100000;
}));
Iu(), Wt();
var Sf = {
	top: 24,
	right: 64,
	bottom: 112,
	left: 24
}, Cf = class {
	constructor(e, t) {
		P(this, "container", void 0), P(this, "cb", void 0), P(this, "stage", void 0), P(this, "signLayer", new X.Layer({ listening: !1 })), P(this, "refLayer", new X.Layer({ listening: !1 })), P(this, "dimLayer", new X.Layer({ listening: !1 })), P(this, "objectLayer", new X.Layer()), P(this, "world", new X.Group()), P(this, "objectsGroup", new X.Group()), P(this, "transformer", new X.Transformer({
			rotateEnabled: !0,
			keepRatio: !0,
			anchorSize: 10,
			borderStrokeWidth: 1.5,
			anchorCornerRadius: 2,
			rotationSnaps: [
				0,
				90,
				180,
				270
			],
			enabledAnchors: [
				"top-left",
				"top-right",
				"bottom-left",
				"bottom-right"
			]
		})), P(this, "model", null), P(this, "frame", null), P(this, "signKey", ""), P(this, "signToken", 0), P(this, "bounds", {
			x: 0,
			y: 0,
			width: 1,
			height: 1
		}), P(this, "nodes", /* @__PURE__ */ new Map()), P(this, "cut", null), P(this, "contourGroup", new X.Group()), P(this, "contourFrame", 0), P(this, "images", /* @__PURE__ */ new Map()), P(this, "dragging", !1), P(this, "ro", void 0), P(this, "pad", Sf), P(this, "building", !1), P(this, "signBounds", {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		}), P(this, "printParts", []), P(this, "cutlineBox", null), P(this, "contourPath", null), P(this, "contourToken", 0), this.container = e, this.cb = t, this.stage = new X.Stage({
			container: e,
			width: e.clientWidth || 600,
			height: e.clientHeight || 400
		}), this.signLayer.add(this.world), this.objectLayer.add(this.objectsGroup, this.transformer), this.stage.add(this.refLayer, this.signLayer, this.dimLayer, this.objectLayer), this.stage.on("pointerdown", (e) => {
			let t = e.target;
			this.transformer.isAncestorOf(t) || (t === this.stage || !this.objectsGroup.isAncestorOf(t)) && this.cb.onSelect(null);
		}), this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(e);
	}
	destroy() {
		this.ro.disconnect(), this.stage.destroy();
	}
	toDataURL(e = 2) {
		let t = this.transformer.nodes();
		this.transformer.nodes([]);
		let n = this.stage.toDataURL({ pixelRatio: e });
		return this.transformer.nodes(t), n;
	}
	snapshot({ print: e = !1, clean: t = !1, pixelRatio: n = 2, mimeType: r = "image/png" } = {}) {
		let i = this.transformer.nodes();
		this.transformer.nodes([]);
		let a = e ? [this.dimLayer, ...this.world.find(".sc-fixings")] : t ? [this.dimLayer] : [];
		a.forEach((e) => e.hide());
		let o = t && !e ? this.world.getClientRect() : null, s = o ? {
			x: o.x - 12,
			y: o.y - 12,
			width: o.width + 24,
			height: o.height + 24
		} : {}, c;
		if (e && this.frame) {
			let e = this.cut ?? this.cutlineBox ?? {
				x: 0,
				y: 0,
				width: this.frame.width,
				height: this.frame.height
			}, t = this.world.scaleX() || 1;
			c = this.stage.toDataURL({
				x: this.world.x() + e.x * t,
				y: this.world.y() + e.y * t,
				width: e.width * t,
				height: e.height * t,
				pixelRatio: Math.max(n, 1 / t),
				mimeType: r
			});
		} else if (r === "image/jpeg") {
			let e = this.stage.toCanvas({
				pixelRatio: n,
				...s
			}), t = document.createElement("canvas");
			t.width = e.width, t.height = e.height;
			let r = t.getContext("2d");
			r.fillStyle = "#ffffff", r.fillRect(0, 0, t.width, t.height), r.drawImage(e, 0, 0), c = t.toDataURL("image/jpeg", .92);
		} else c = this.stage.toDataURL({
			pixelRatio: n,
			mimeType: r,
			...s
		});
		return a.forEach((e) => e.show()), this.transformer.nodes(i), c;
	}
	measure() {
		let e = this.frame;
		if (!e) return null;
		let t = e.pxPerUnit, n = {}, r = {};
		for (let [e, { node: i, key: a }] of this.nodes) {
			let o = i.getClientRect({
				skipTransform: !0,
				skipShadow: !0,
				skipStroke: !0
			});
			n[e] = {
				width: o.width * Math.abs(i.scaleX()) / t,
				height: o.height * Math.abs(i.scaleY()) / t
			}, a.startsWith("qr|") && (r[e] = i.toDataURL({ pixelRatio: 256 / Math.max(1, i.getClientRect().width) }));
		}
		let i = this.cut ?? {
			x: 0,
			y: 0,
			width: e.width,
			height: e.height
		};
		return {
			sign: {
				x: i.x / t,
				y: i.y / t,
				width: i.width / t,
				height: i.height / t
			},
			objects: n,
			qr: r
		};
	}
	toPrintSVG() {
		let e = this.model, t = this.frame;
		if (!e || !t) return "";
		let n = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), r = (e) => Number(e.toFixed(3)), i = this.cut ?? this.cutlineBox ?? {
			x: 0,
			y: 0,
			width: t.width,
			height: t.height
		}, a = 1 / t.pxPerUnit * {
			mm: 1,
			cm: 10,
			m: 1e3,
			in: 25.4,
			ft: 304.8
		}[e.unit], o = [], s = [], c = 0, l = (e) => `${e}${++c}`, u = (e) => e.kind === "path" && e.stroke ? ` stroke="${n(e.stroke.color)}" stroke-width="${r(e.stroke.width)}" stroke-linejoin="round"` : "";
		for (let e of this.printParts) if (e.kind === "image") s.push(`<image x="${r(e.x)}" y="${r(e.y)}" width="${r(e.width)}" height="${r(e.height)}" preserveAspectRatio="none" href="${n(e.href)}"/>`);
		else if (e.pattern) {
			let t = l("pat");
			o.push(`<pattern id="${t}" patternUnits="userSpaceOnUse" width="${r(e.pattern.width)}" height="${r(e.pattern.height)}"><image width="${r(e.pattern.width)}" height="${r(e.pattern.height)}" preserveAspectRatio="none" href="${n(e.pattern.href)}"/></pattern>`), s.push(`<path transform="translate(${r(e.x)} ${r(e.y)})" d="${e.data}" fill="url(#${t})"${u(e)}/>`);
		} else s.push(`<path transform="translate(${r(e.x)} ${r(e.y)})" d="${e.data}" fill="${n(e.fill)}"${u(e)}/>`);
		if (this.cut && this.contourPath) {
			let t = this.contourPath, i = `translate(${r(t.x)} ${r(t.y)})`;
			for (let e of t.rings ?? []) s.push(`<path transform="${i}" d="${t.d}" fill="${n(e.color)}" stroke="${n(e.color)}" stroke-width="${r(e.width)}" stroke-linejoin="round"/>`);
			let a = n(e.fill);
			if (t.pattern) {
				let e = l("pat"), i = t.pattern;
				o.push(`<pattern id="${e}" patternUnits="userSpaceOnUse" x="${r(i.x)}" y="${r(i.y)}" width="${r(i.width)}" height="${r(i.height)}"><image width="${r(i.width)}" height="${r(i.height)}" preserveAspectRatio="none" href="${n(i.href)}"/></pattern>`), a = `url(#${e})`;
			}
			s.push(`<path transform="${i}" d="${t.d}" fill="${a}"/>`);
		}
		let d = td(e.shape), f = "";
		if (d !== "cut-to-shape" && !(d === "custom" && e.shapeSvgUrl)) {
			let e = l("clip");
			o.push(`<clipPath id="${e}"><path d="${id(d, t.width, t.height)}"/></clipPath>`), f = ` clip-path="url(#${e})"`;
		}
		let p = [], m = [...this.nodes.entries()].sort((e, t) => e[1].node.zIndex() - t[1].node.zIndex());
		for (let [t, { node: i, key: a }] of m) {
			let s = e.objects.find((e) => e.id === t);
			if (!s || !i.visible()) continue;
			let c = `translate(${r(i.x())} ${r(i.y())}) rotate(${r(i.rotation())}) scale(${r(i.scaleX())} ${r(i.scaleY())}) translate(${r(-i.offsetX())} ${r(-i.offsetY())})`;
			if (i instanceof X.TextPath) {
				let e = l("tp");
				o.push(`<path id="${e}" d="${i.data()}"/>`);
				let t = i.strokeWidth(), a = i.stroke();
				p.push(`<text transform="${c}"${i.opacity() < 1 ? ` opacity="${r(i.opacity())}"` : ""} font-family="${n(i.fontFamily())}" font-size="${r(i.fontSize())}" font-style="${/italic/.test(i.fontStyle()) ? "italic" : "normal"}" font-weight="${/bold/.test(i.fontStyle()) ? "bold" : "normal"}" fill="${n(String(i.fill()))}"${a && t > 0 ? ` stroke="${n(a)}" stroke-width="${r(t)}" stroke-linejoin="round" paint-order="stroke"` : ""}><textPath href="#${e}" startOffset="50%" text-anchor="middle">${n(i.text())}</textPath></text>`);
			} else if (i instanceof X.Text) {
				let e = i.fontSize(), t = e * i.lineHeight(), a = i.width(), s = i.align() === "right" ? "end" : i.align() === "center" ? "middle" : "start", u = i.align() === "right" ? a : i.align() === "center" ? a / 2 : 0, d = [i.textDecoration(), i.getAttr("sc-overline") ? "overline" : ""].filter(Boolean).join(" "), f = i.textArr.map((e, i) => `<tspan x="${r(u)}" y="${r(i * t + t / 2)}">${n(e.text)}</tspan>`).join(""), m = (t, a, o, l = "") => `<text transform="${c}"${l} font-family="${n(i.fontFamily())}" font-size="${r(e)}" font-style="${/italic/.test(i.fontStyle()) ? "italic" : "normal"}" font-weight="${/bold/.test(i.fontStyle()) ? "bold" : "normal"}" fill="${n(t)}"${a && o > 0 ? ` stroke="${n(a)}" stroke-width="${r(o)}" stroke-linejoin="round" paint-order="stroke"` : ""} text-anchor="${s}" dominant-baseline="middle"${d ? ` text-decoration="${d}"` : ""}>${f}</text>`, h = i.getAttr("sc-fx"), g = [];
				if (h?.layer) {
					let e = h.layer.side;
					e && g.push(`<g transform="translate(${r(e.offset)} ${r(e.offset)})">${m(e.color, e.color, h.layer.width)}</g>`), g.push(m(h.layer.color, h.layer.color, h.layer.width));
				}
				if (h?.glow) {
					let e = l("glow");
					o.push(`<filter id="${e}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r(h.glow.radius / 2)}"/></filter>`), g.push(m(h.glow.color, void 0, 0, ` filter="url(#${e})"`), m(h.glow.color, void 0, 0, ` filter="url(#${e})"`));
				}
				g.push(m(String(i.fill()), i.stroke(), i.strokeWidth()));
				let _ = i.opacity();
				p.push(_ < 1 ? `<g opacity="${r(_)}">${g.join("")}</g>` : g.join(""));
			} else if (i instanceof X.Image) {
				let e = i.image();
				if (!e?.naturalWidth) continue;
				p.push(`<image transform="${c}" width="${r(i.width())}" height="${r(i.height())}" preserveAspectRatio="none" href="${n(this.filteredSource(i, e))}"/>`);
			} else a.startsWith("qr|") && s.type === "qr" && p.push(`<g transform="${c}"><rect width="100" height="100" fill="#ffffff"/><path d="${Vd(s.value, 100)}" fill="${n(s.color)}"/></g>`);
		}
		s.push(`<g${f}>${p.join("")}</g>`);
		let h = (e.fontFaces ?? []).map((e) => `@font-face{font-family:"${e.family}";src:url("${e.url}");}`).join("");
		return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${r(i.width * a)}mm" height="${r(i.height * a)}mm" viewBox="${r(i.x)} ${r(i.y)} ${r(i.width)} ${r(i.height)}">` + (h ? `<style>${h}</style>` : "") + `<defs>${o.join("")}</defs>${s.join("")}</svg>`;
	}
	filteredSource(e, t) {
		let n = e.filters() ?? [];
		if (!n.length) return t.src;
		let r = document.createElement("canvas");
		r.width = t.naturalWidth, r.height = t.naturalHeight;
		let i = r.getContext("2d");
		if (!i) return t.src;
		i.drawImage(t, 0, 0);
		let a = i.getImageData(0, 0, r.width, r.height);
		for (let t of n) t.call(e, a);
		return i.putImageData(a, 0, 0), r.toDataURL("image/png");
	}
	ready() {
		return new Promise((e) => {
			let t = () => this.building ? requestAnimationFrame(t) : e();
			requestAnimationFrame(t);
		});
	}
	async snapshotWithWatermark(e, t = 2, n = !1) {
		if (!e || !this.frame) return this.snapshot({
			pixelRatio: t,
			clean: n
		});
		let r = await this.image(e), i = this.transformer.nodes();
		this.transformer.nodes([]), n && this.dimLayer.hide();
		let a = n ? this.world.getClientRect() : null, o = a ? {
			x: a.x - 12,
			y: a.y - 12,
			width: a.width + 24,
			height: a.height + 24
		} : {
			x: 0,
			y: 0
		}, s = this.stage.toCanvas({
			pixelRatio: t,
			...o
		});
		if (n && this.dimLayer.show(), this.transformer.nodes(i), r) {
			let e = this.world.scaleX() || 1, n = this.cut ?? {
				x: 0,
				y: 0,
				width: this.frame.width,
				height: this.frame.height
			}, i = 100 * e, a = this.world.x() + (n.x + n.width) * e - i - 10 * e - o.x, c = this.world.y() + (n.y + n.height) * e - i - 10 * e - o.y;
			s.getContext("2d")?.drawImage(r, a * t, c * t, i * t, i * t);
		}
		return s.toDataURL("image/png");
	}
	selectionBox() {
		let e = this.transformer.nodes()[0];
		return e ? e.getClientRect() : null;
	}
	rotateHandleBox() {
		if (!this.transformer.nodes().length) return null;
		let e = this.transformer.findOne(".rotater");
		return e?.isVisible() ? e.getClientRect() : null;
	}
	setPadding(e) {
		this.pad = e, this.fit();
	}
	update(e) {
		this.model = e, this.frame = ed(e.width, e.height, e.unit);
		let t = JSON.stringify([
			e.width,
			e.height,
			e.unit,
			e.displayUnit,
			e.decimals,
			e.shape,
			e.shapeSvgUrl,
			e.fill,
			e.patternUrl,
			e.border,
			e.fixing,
			e.light,
			e.thicknessLabel,
			e.measurements,
			e.outline,
			e.cutline
		]);
		t !== this.signKey && (this.signKey = t, this.cut && td(e.shape) !== "cut-to-shape" && (this.clearContour(), this.updateBounds()), this.buildSign(e, this.frame)), this.syncObjects(e, this.frame), this.scheduleContour(), this.fit();
	}
	resize() {
		let e = this.container.clientWidth, t = this.container.clientHeight;
		e && t && (this.stage.size({
			width: e,
			height: t
		}), this.fit());
	}
	fit() {
		let e = this.model;
		if (!e) return;
		if (e.view === "real-size" && this.frame) return this.fitRealSize(e, this.frame);
		this.refLayer.destroyChildren(), this.refLayer.batchDraw(), this.objectLayer.listening(!0);
		let t = this.pad, n = this.stage.width() - t.left - t.right, r = this.stage.height() - t.top - t.bottom, i = this.bounds, a = Math.max(.05, Math.min(n / i.width, r / i.height) * e.zoom), o = t.left + (n - i.width * a) / 2 - i.x * a, s = t.top + (r - i.height * a) / 2 - i.y * a;
		for (let e of [this.world, this.objectsGroup]) e.setAttrs({
			x: o,
			y: s,
			scaleX: a,
			scaleY: a
		});
		this.drawDimensions(e, {
			x: o,
			y: s,
			s: a
		}), this.signLayer.batchDraw(), this.objectLayer.batchDraw();
	}
	fitRealSize(e, t) {
		let n = Vn(e.width, e.unit) / 10, r = Vn(e.height, e.unit) / 10, i = Wu(e.reference, n), a = Gu(i, n, r), o = this.stage.width(), s = this.stage.height() - 56 - 86, c = Math.max(.01, Math.min(Uu * o / a.w, Uu * s / a.h) * e.zoom), l = o / 2 - a.w / 2 * c, u = 56 + s / 2 + a.h / 2 * c, d = c * n / t.width, f = l + a.signCx * c - t.width / 2 * d, p = u - a.signBottom * c - t.height * d;
		for (let e of [this.world, this.objectsGroup]) e.setAttrs({
			x: f,
			y: p,
			scaleX: d,
			scaleY: d
		});
		this.transformer.nodes([]), this.objectLayer.listening(!1), this.dimLayer.destroyChildren(), this.dimLayer.batchDraw();
		let m = e.colors.dim;
		this.refLayer.destroyChildren(), this.refLayer.add(new X.Shape({
			listening: !1,
			sceneFunc: (e) => {
				let t = e._context;
				t.save(), t.globalAlpha = .28, Zu(t, i, l, a.refX, u, c, m), t.restore(), Qu(t, l, l + a.w * c, u, c, m);
			}
		})), this.refLayer.batchDraw(), this.signLayer.batchDraw(), this.objectLayer.batchDraw();
	}
	drawDimensions(e, t) {
		let n = this.dimLayer;
		n.destroyChildren();
		let r = this.frame;
		if (!r || e.measurements === "none") return n.batchDraw();
		let i = this.cut ?? this.cutlineBox ?? {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}, a = t.x + i.x * t.s, o = t.y + i.y * t.s, s = i.width * t.s, c = i.height * t.s, l = this.cut ?? this.cutlineBox, u = l ? l.width / r.pxPerUnit : e.width, d = l ? l.height / r.pxPerUnit : e.height, f = Math.max(a + s, t.x + (this.bounds.x + this.bounds.width) * t.s), p = Math.max(o + c, t.y + (this.bounds.y + this.bounds.height) * t.s), m = e.colors.dim, h = (t) => `${Wn(Un(t, e.unit, e.displayUnit), e.displayUnit, e.decimals, e.locale)} ${e.displayUnit}`, g = (e, t, r, i = !1) => {
			let a = new X.Text({
				text: e,
				fontSize: 12,
				fontStyle: "bold",
				fill: "#ffffff",
				padding: 4
			}), o = new X.Rect({
				width: a.width(),
				height: a.height(),
				cornerRadius: 4,
				fill: m
			}), s = new X.Group({
				x: t,
				y: r,
				rotation: i ? -90 : 0,
				offsetX: a.width() / 2,
				offsetY: a.height() / 2
			});
			s.add(o, a), n.add(s);
		}, _ = {
			pointerAtBeginning: !0,
			pointerLength: 6,
			pointerWidth: 6,
			stroke: m,
			fill: m,
			strokeWidth: 1
		}, v = {
			stroke: m,
			strokeWidth: 1,
			dash: [2, 2]
		};
		if (e.measurements === "both" || e.measurements === "width") {
			let t = p + 18;
			if (n.add(new X.Arrow({
				points: [
					a,
					t,
					a + s,
					t
				],
				..._
			})), n.add(new X.Line({
				points: [
					a,
					o + c + 4,
					a,
					t + 4
				],
				...v
			})), n.add(new X.Line({
				points: [
					a + s,
					o + c + 4,
					a + s,
					t + 4
				],
				...v
			})), g(h(u), a + s / 2, t), e.thicknessLabel) {
				let r = new X.Text({
					text: e.thicknessLabel,
					fontSize: 12,
					fill: m
				});
				r.position({
					x: a + s / 2 - r.width() / 2,
					y: t + 14
				}), n.add(r);
			}
		}
		if (e.measurements === "both" || e.measurements === "height") {
			let e = f + 18;
			n.add(new X.Arrow({
				points: [
					e,
					o,
					e,
					o + c
				],
				..._
			})), n.add(new X.Line({
				points: [
					a + s + 4,
					o,
					e + 4,
					o
				],
				...v
			})), n.add(new X.Line({
				points: [
					a + s + 4,
					o + c,
					e + 4,
					o + c
				],
				...v
			})), g(h(d), e, o + c / 2, !0);
		}
		n.batchDraw();
	}
	image(e) {
		let t = this.images.get(e);
		return t ? Promise.resolve(t.naturalWidth ? t : null) : new Promise((t) => {
			let n = new Image();
			n.crossOrigin = "anonymous", n.onload = () => t(n), n.onerror = () => t(null), n.src = e, this.images.set(e, n);
		});
	}
	async buildSign(e, t) {
		let n = ++this.signToken;
		this.building = !0;
		let { width: r, height: i } = t, a = td(e.shape), o = e.light ? {
			...od,
			shadowColor: e.light
		} : null, s = e.border && e.border.kind !== "none" && a !== "cut-to-shape" && ir(e.border.kind, a) ? e.border : null, c = new X.Group(), l = [], u = e.fixing, d = u && u.kind !== "none" && a !== "cut-to-shape" ? Promise.resolve().then(() => (af(), ef)).then(({ drawLegacyFixings: n }) => n({
			method: u.kind,
			customUrl: u.customUrl,
			count: u.count,
			shape: a,
			width: r,
			height: i,
			fixScale: t.fixScale,
			sizeRatio: t.sizeRatio,
			assetBases: e.assets.fixings,
			resolveUrl: e.assets.resolve
		})).catch(() => ({
			back: [],
			front: []
		})) : Promise.resolve({
			back: [],
			front: []
		}), f = s?.kind === "normal", p = a === "custom" && e.shapeSvgUrl ? e.assets.resolve(e.shapeSvgUrl) : null;
		if (f && s) {
			let e = p ? await ud(p, s.color) : null, t = e ? await this.image(e) : null;
			if (t && e) c.add(new X.Image({
				image: t,
				x: -10,
				y: -10,
				width: r + 20,
				height: i + 20,
				...o ?? {}
			})), l.push({
				kind: "image",
				href: e,
				x: -10,
				y: -10,
				width: r + 20,
				height: i + 20
			});
			else {
				let e = ad(a === "custom" ? "square" : a, r, i, 10);
				c.add(new X.Path({
					data: e.data,
					x: e.x,
					y: e.y,
					fill: s.color,
					...o ?? {}
				})), l.push({
					kind: "path",
					data: e.data,
					x: e.x,
					y: e.y,
					fill: s.color
				});
			}
		}
		let m = a === "cut-to-shape", h, g = p ? await ud(p, e.fill) : null, _ = g ? await this.image(g) : null;
		if (_) h = new X.Image({
			image: _,
			width: r,
			height: i
		});
		else {
			h = new X.Path({
				data: id(a, r, i),
				fill: e.fill
			});
			let t = e.patternUrl ? await this.image(e.assets.resolve(e.patternUrl)) : null;
			t && h.setAttrs({
				fillPriority: "pattern",
				fillPatternImage: t,
				fillPatternRepeat: "no-repeat",
				fillPatternScale: {
					x: r / t.naturalWidth,
					y: i / t.naturalHeight
				}
			});
		}
		if (o && !f && h.setAttrs(o), !m) {
			if (c.add(h), _ && g) l.push({
				kind: "image",
				href: g,
				x: 0,
				y: 0,
				width: r,
				height: i
			});
			else {
				let t = h.fillPatternImage();
				l.push({
					kind: "path",
					data: id(a, r, i),
					x: 0,
					y: 0,
					fill: e.fill,
					pattern: t ? {
						href: t.src,
						width: r,
						height: i
					} : void 0
				});
			}
		}
		let v = e.cutline;
		if (this.cutlineBox = null, v && v.mode !== "none" && !m) {
			let e = f && s ? ad(a === "custom" ? "square" : a, r, i, 10) : {
				data: id(a, r, i),
				x: 0,
				y: 0
			};
			c.getChildren().filter((e) => e instanceof X.Path).find((t) => t.data() === e.data)?.setAttrs({
				stroke: v.first.color,
				strokeWidth: v.first.size,
				lineJoin: "round"
			});
			let t = l.find((t) => t.kind === "path" && t.data === e.data);
			if (t && t.kind === "path" && (t.stroke = {
				color: v.first.color,
				width: v.first.size
			}), v.mode === "2x") {
				let t = v.second.size + v.first.size, n = v.first.size + v.second.size + v.second.borderSize, a = {
					data: e.data,
					x: e.x,
					y: e.y,
					lineJoin: "round",
					listening: !1
				}, s = new X.Path({
					...a,
					fill: v.second.color,
					stroke: v.second.color,
					strokeWidth: t
				}), u = new X.Path({
					...a,
					fill: v.second.borderColor,
					stroke: v.second.borderColor,
					strokeWidth: n,
					...o ?? {}
				});
				c.getChildren().forEach((e) => e.setAttrs({
					shadowColor: void 0,
					shadowBlur: 0,
					shadowOpacity: 0
				})), c.add(s, u), s.moveToBottom(), u.moveToBottom(), l.unshift({
					kind: "path",
					data: e.data,
					x: e.x,
					y: e.y,
					fill: v.second.borderColor,
					stroke: {
						color: v.second.borderColor,
						width: n
					}
				}, {
					kind: "path",
					data: e.data,
					x: e.x,
					y: e.y,
					fill: v.second.color,
					stroke: {
						color: v.second.color,
						width: t
					}
				});
				let d = f ? r + 20 : r, p = f ? i + 20 : i;
				this.cutlineBox = {
					x: e.x - n / 2,
					y: e.y - n / 2,
					width: d + n,
					height: p + n
				};
			}
		}
		if (s && (s.kind === "old-world" || s.kind === "rounded-corners")) {
			let t = sd(s.kind, r, i), n = t ? `${e.assets.borders.replace(/\/+$/, "")}/${t}` : null, a = n ? await ld(n, s.color, s.kind === "old-world" ? "fill" : "stroke") : null, o = a ? await this.image(a) : null;
			if (o) {
				let e = s.kind === "rounded-corners" ? {
					x: .009,
					y: t?.endsWith("longH.svg") ? .005 : t?.endsWith("mediumH.svg") ? .008 : .01
				} : {
					x: 0,
					y: 0
				};
				c.add(new X.Image({
					image: o,
					width: o.naturalWidth,
					height: o.naturalHeight,
					scaleX: r / o.naturalWidth - e.x,
					scaleY: i / o.naturalHeight - e.y
				})), l.push({
					kind: "image",
					href: a,
					x: 0,
					y: 0,
					width: o.naturalWidth * (r / o.naturalWidth - e.x),
					height: o.naturalHeight * (i / o.naturalHeight - e.y)
				});
			}
		} else if (s?.kind === "custom" && s.svgUrl) {
			let t = await ld(e.assets.resolve(s.svgUrl), s.color, "both"), n = t ? await this.image(t) : null;
			n && (c.add(new X.Image({
				image: n,
				width: r,
				height: i
			})), l.push({
				kind: "image",
				href: t,
				x: 0,
				y: 0,
				width: r,
				height: i
			}));
		}
		let y = await d;
		if (n !== this.signToken) return;
		this.building = !1;
		let b = new X.Group({ name: "sc-fixings" }), x = new X.Group({ name: "sc-fixings" });
		b.add(...y.back), x.add(...y.front), c.add(x), c.add(b), b.moveToBottom(), this.printParts = l, m || this.clearContour(), this.contourGroup.remove(), this.world.destroyChildren(), this.world.add(c), m && (this.world.add(this.contourGroup), this.contourGroup.moveToBottom()), this.signBounds = c.getClientRect({
			skipShadow: !0,
			relativeTo: this.world
		}), this.updateBounds();
		let S = _ || m ? null : new Path2D(id(a, r, i));
		this.objectsGroup.clipFunc(S ? () => [S] : void 0), m && this.scheduleContour(), this.fit();
	}
	updateBounds() {
		let e = this.frame;
		if (!e) return;
		let t = (this.cut ? [this.cut] : [this.signBounds, {
			x: 0,
			y: 0,
			width: e.width,
			height: e.height
		}]).filter((e) => e.width > 0), n = Math.min(...t.map((e) => e.x)), r = Math.min(...t.map((e) => e.y));
		this.bounds = {
			x: n,
			y: r,
			width: Math.max(...t.map((e) => e.x + e.width)) - n,
			height: Math.max(...t.map((e) => e.y + e.height)) - r
		};
	}
	scheduleContour() {
		let e = this.model;
		e && td(e.shape) === "cut-to-shape" && (cancelAnimationFrame(this.contourFrame), this.contourFrame = requestAnimationFrame(() => void this.drawContour()));
	}
	async drawContour() {
		let e = this.model;
		if (!e || td(e.shape) !== "cut-to-shape") return;
		let t = this.objectsGroup.getChildren((e) => e.visible());
		if (this.dragging) return;
		let n = ++this.contourToken;
		if (!t.length) {
			this.clearContour(), this.updateBounds(), this.fit();
			return;
		}
		let r = this.objectsGroup.scaleX() || 1, i = this.transformer.nodes();
		this.transformer.nodes([]);
		let a = this.objectsGroup.getClientRect({
			skipShadow: !0,
			skipStroke: !1
		}), o = this.objectsGroup.toCanvas({
			x: a.x,
			y: a.y,
			width: a.width,
			height: a.height,
			pixelRatio: 1 / r
		});
		this.transformer.nodes(i);
		let { computeContour: s } = await Promise.resolve().then(() => (xf(), of)), c = s(o, Math.max(1, e.outline) / 2), l = e.patternUrl ? await this.image(e.assets.resolve(e.patternUrl)) : null;
		if (n !== this.contourToken || !this.model || td(this.model.shape) !== "cut-to-shape") return;
		if (this.contourGroup.destroyChildren(), !c) {
			this.clearContour(), this.updateBounds(), this.fit();
			return;
		}
		let u = (a.x - this.objectsGroup.x()) / r, d = (a.y - this.objectsGroup.y()) / r, f = c.bounds, p = e.light ? {
			...od,
			shadowColor: e.light
		} : {}, m = new X.Path({
			data: c.path,
			x: u,
			y: d,
			fill: e.fill,
			listening: !1
		});
		l && m.setAttrs({
			fillPriority: "pattern",
			fillPatternImage: l,
			fillPatternRepeat: "no-repeat",
			fillPatternX: f.x,
			fillPatternY: f.y,
			fillPatternScale: {
				x: f.width / l.naturalWidth,
				y: f.height / l.naturalHeight
			}
		}), this.contourPath = {
			d: c.path,
			x: u,
			y: d,
			pattern: l ? {
				href: l.src,
				...f
			} : null
		};
		let h = e.cutline, g = !h || h.mode === "none" ? [] : h.mode === "2x" ? [
			{
				color: h.second.borderColor,
				width: h.first.size + h.second.size + h.second.borderSize
			},
			{
				color: h.second.color,
				width: h.first.size + h.second.size
			},
			{
				color: h.first.color,
				width: h.first.size
			}
		] : [{
			color: h.first.color,
			width: h.first.size
		}];
		this.contourPath.rings = g, g.forEach((e, t) => {
			this.contourGroup.add(new X.Path({
				data: c.path,
				x: u,
				y: d,
				fill: e.color,
				stroke: e.color,
				strokeWidth: e.width,
				lineJoin: "round",
				listening: !1,
				...t === 0 ? p : {}
			}));
		}), g.length || m.setAttrs(p), this.contourGroup.add(m);
		let _ = (g[0]?.width ?? 0) / 2;
		this.cut = {
			x: u + f.x - _,
			y: d + f.y - _,
			width: f.width + _ * 2,
			height: f.height + _ * 2
		}, this.updateBounds(), this.fit();
	}
	clearContour() {
		cancelAnimationFrame(this.contourFrame), this.contourToken++, this.contourGroup.destroyChildren(), this.contourPath = null, this.cut = null;
	}
	syncObjects(e, t) {
		let n = t.pxPerUnit, r = t.width / 2, i = t.height / 2, a = /* @__PURE__ */ new Set(), o = null;
		for (let s of e.objects) {
			a.add(s.id);
			let c = e.canTransform(s), l = s.type === "image" ? `image|${s.src}|${s.tint ?? ""}` : s.type === "qr" ? `qr|${s.value}|${s.color}` : s.type === "text" && s.curve && (e.textType ?? "normal") === "normal" ? "text|curve" : s.type, u = this.nodes.get(s.id);
			(!u || u.key !== l) && (u?.node.destroy(), u = {
				node: this.createNode(s, e),
				key: l
			}, this.nodes.set(s.id, u), this.objectsGroup.add(u.node), this.bindNode(u.node, s.id));
			let d = u.node;
			if (!(this.dragging && this.transformer.nodes()[0] === d)) {
				this.styleNode(d, s, e, n, t);
				let a = s.type === "image" ? {
					scaleX: s.flipX ? -1 : 1,
					scaleY: s.flipY ? -1 : 1
				} : {
					scaleX: 1,
					scaleY: 1
				};
				d.setAttrs({
					x: r + s.x * n,
					y: i + s.y * n,
					rotation: s.rotation,
					...a
				});
			}
			d.draggable(c.moveX || c.moveY), d.setAttr("sc-can", c), s.id === e.selectedId && (o = d, this.transformer.setAttrs({
				resizeEnabled: c.resize,
				rotateEnabled: c.rotate,
				borderStroke: e.colors.primary,
				anchorStroke: e.colors.primary,
				anchorFill: "#ffffff"
			}));
		}
		for (let [e, t] of this.nodes) a.has(e) || (t.node.destroy(), this.nodes.delete(e));
		e.objects.forEach((e, t) => this.nodes.get(e.id)?.node.zIndex(t)), this.transformer.nodes(o ? [o] : []), this.objectLayer.batchDraw();
	}
	createNode(e, t) {
		if (e.type === "text" && e.curve && (t.textType ?? "normal") === "normal") return new X.TextPath({ data: "M0 0" });
		if (e.type === "text") {
			let e = new X.Text({ lineHeight: 1.1 });
			return e.sceneFunc((e, t) => {
				let n = t, r = () => X.Text.prototype._sceneFunc.call(n, e), i = n.getAttr("sc-fx"), a = n.getAbsoluteScale().x * (e.canvas?.getPixelRatio?.() ?? 1), o = e._context, s = n.attrs, c = {
					fill: s.fill,
					stroke: s.stroke,
					strokeWidth: s.strokeWidth
				};
				if (i?.layer && (e.save(), i.layer.side && (o.shadowColor = i.layer.side.color, o.shadowBlur = 0, o.shadowOffsetX = i.layer.side.offset * a, o.shadowOffsetY = i.layer.side.offset * a), Object.assign(s, {
					fill: i.layer.color,
					stroke: i.layer.width > 0 ? i.layer.color : void 0,
					strokeWidth: i.layer.width
				}), r(), Object.assign(s, c), e.restore()), i?.glow) {
					e.save(), Object.assign(s, {
						fill: i.glow.color,
						stroke: void 0,
						strokeWidth: 0
					});
					for (let e = i.glow.radius; e > 0; e -= i.glow.radius / 5) o.shadowColor = i.glow.color, o.shadowBlur = e * a, r();
					Object.assign(s, c), e.restore();
				}
				if (r(), !n.getAttr("sc-overline")) return;
				let l = n.fontSize(), u = l * n.lineHeight(), d = n.width();
				e.beginPath(), n.textArr.forEach((t, r) => {
					let i = n.align() === "right" ? d - t.width : n.align() === "center" ? (d - t.width) / 2 : 0, a = r * u + (u - l) / 2 + Math.max(1, l / 15);
					e.moveTo(i, a), e.lineTo(i + t.width, a);
				}), e.setAttr("strokeStyle", n.fill()), e.setAttr("lineWidth", Math.max(1, l / 15)), e.stroke();
			}), e;
		}
		if (e.type === "image") {
			let n = new X.Image({ image: void 0 }), r = t.assets.resolve(e.src), i = /\.svg(\?|#|$)/i.test(r) || r.startsWith("data:image/svg");
			return (e.tint && i ? ld(r, e.tint, "both") : Promise.resolve(r)).then((e) => e ? this.image(e) : null).then((e) => {
				e && (n.image(e), this.model && this.syncObjects(this.model, this.frame));
			}), n;
		}
		let n = e;
		return Bd(n.value, 100, n.color);
	}
	styleNode(e, t, n, r, i) {
		if (t.type === "text" && (e instanceof X.Text || e instanceof X.TextPath)) {
			let a = Jn(n.textType ?? "normal", t), o = a.type === "normal", s = {
				text: t.text || " ",
				fontFamily: n.fontFamily(t.fontId),
				fontSize: Math.max(4, t.size * r),
				fill: t.color,
				fontStyle: `${t.italic ? "italic " : ""}${t.bold ? "bold" : "normal"}`.trim(),
				textDecoration: o ? [t.underline ? "underline" : "", t.strike ? "line-through" : ""].join(" ").trim() : "",
				stroke: a.outline.width > 0 ? a.outline.color : void 0,
				strokeWidth: a.outline.width,
				fillAfterStrokeEnabled: !0,
				lineJoin: "round",
				opacity: a.opacity
			};
			if (e instanceof X.TextPath) {
				let n = new X.Text(s), r = n.width();
				n.destroy();
				let i = 3.75 * s.fontSize * Math.sign(t.curve);
				e.setAttrs({
					...s,
					align: "center",
					data: `M0 0 Q${r / 2} ${-i} ${r} 0`
				});
				let a = e.getSelfRect();
				e.offsetX(a.x + a.width / 2), e.offsetY(a.y + a.height / 2);
				return;
			}
			e.setAttrs({
				...s,
				align: t.align,
				"sc-overline": o && !!t.overline,
				"sc-fx": wf(a, s.fontSize)
			});
			let c = i.width * .92;
			e.width() > c && e.fontSize(e.fontSize() * (c / e.width()));
		} else if (t.type === "image" && e instanceof X.Image) {
			let n = e.image(), i = t.width * r, a = t.height * r;
			if (n?.naturalWidth) {
				let t = Math.min(i / n.naturalWidth, a / n.naturalHeight);
				e.size({
					width: n.naturalWidth * t,
					height: n.naturalHeight * t
				});
			} else e.size({
				width: i,
				height: a
			});
			let o = (t.filters ?? []).map((e) => Wd[e]).filter(Boolean);
			e.clearCache(), e.filters(o), o.length && n?.naturalWidth && (e.setAttr("blurRadius", 4), e.cache({ pixelRatio: 2 }));
		} else if (t.type === "qr") {
			let n = t.size * r / 100;
			e.setAttrs({
				width: 100,
				height: 100
			}), e.scale({
				x: n,
				y: n
			});
		}
		e.offsetX(e.width() / 2), e.offsetY(e.height() / 2);
	}
	bindNode(e, t) {
		let n = {
			x: 0,
			y: 0
		};
		e.on("pointerdown", () => this.cb.onSelect(t)), e.on("dragstart", () => {
			this.dragging = !0, this.cb.onGesture?.(!0), n = e.absolutePosition();
		}), e.dragBoundFunc((t) => {
			let r = e.getAttr("sc-can");
			return {
				x: r?.moveX === !1 ? n.x : t.x,
				y: r?.moveY === !1 ? n.y : t.y
			};
		}), e.on("dragend", () => {
			this.dragging = !1, this.cb.onGesture?.(!1), this.commit(e, t), this.scheduleContour();
		}), e.on("transformstart", () => {
			this.dragging = !0, this.cb.onGesture?.(!0);
		}), e.on("transformend", () => {
			this.dragging = !1, this.cb.onGesture?.(!1), this.commit(e, t, Math.abs(e.scaleX())), this.scheduleContour();
		});
	}
	commit(e, t, n = 1) {
		let r = this.model, i = this.frame;
		if (!r || !i) return;
		let a = r.objects.find((e) => e.id === t);
		if (!a) return;
		let o = i.pxPerUnit, s = {
			x: (e.x() - i.width / 2) / o,
			y: (e.y() - i.height / 2) / o,
			rotation: Math.round(e.rotation())
		};
		e.scale({
			x: 1,
			y: 1
		}), a.type === "image" ? this.cb.onChange(t, {
			...s,
			width: a.width * n,
			height: a.height * n
		}) : this.cb.onChange(t, {
			...s,
			size: a.size * n
		});
	}
};
function wf(e, t) {
	let n = t / 40, r = {};
	return e.border2 && (r.layer = {
		color: e.border2.color,
		width: e.border2.width * n,
		side: e.side?.on ? {
			color: e.side.color,
			offset: 2 * n
		} : null
	}), e.glow?.on && (r.glow = {
		color: e.glow.color,
		radius: 25 * n
	}), r.layer || r.glow ? r : void 0;
}
//#endregion
//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Tf = 0;
Array.isArray;
function Z(e, t, n, r, i, a) {
	t || (t = {});
	var o, s, c = t;
	if ("ref" in c) for (s in c = {}, t) s == "ref" ? o = t[s] : c[s] = t[s];
	var l = {
		type: e,
		props: c,
		key: n,
		ref: o,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --Tf,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return f.vnode && f.vnode(l), l;
}
//#endregion
//#region src/ui/components/Icon.tsx
var Ef = {
	material: "M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 17.5l9 5 9-5",
	component: "M4 4h16v6H4z M4 14h7v6H4z M15 14h5v6h-5z",
	size: "M3 7V3h4 M17 3h4v4 M21 17v4h-4 M7 21H3v-4 M8 12h8 M12 8v8",
	shape: "M8.5 3.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z M13 13h8v8h-8z M16.5 3l4.5 7.5h-9Z",
	fixing: "M12 2v4 M8 6h8l-1 3H9Z M10 9v11l2 2 2-2V9 M10 13h4 M10 17h4",
	border: "M4 4h16v16H4z M7.5 7.5h9v9h-9z",
	color: "M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.3-4-7.7-9-7.7Z M7.5 11.5h.01 M10 7.5h.01 M14.5 7.5h.01",
	lighting: "M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z",
	text: "M4 7V4h16v3 M9 20h6 M12 4v16",
	qrcode: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h3v3h-3z M20 14v.01 M14 20h.01 M17 20h4 M20 17v3",
	image: "M3 5h18v14H3z M8.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M21 15l-5-5L5 19",
	options: "M4 6h10 M18 6h2 M4 12h4 M12 12h8 M4 18h12 M20 18h0 M14 4v4 M8 10v4 M16 16v4",
	addons: "M4 4h16v16H4z M12 8v8 M8 12h8",
	doubleSided: "M3 9h12v12H3z M9 3h12v12h-6 M9 3v6 M6 15h6",
	flip: "M17 3l4 4-4 4 M21 7H8a5 5 0 0 0-5 5 M7 21l-4-4 4-4 M3 17h13a5 5 0 0 0 5-5",
	undo: "M9 14 4 9l5-5 M4 9h11a5 5 0 0 1 0 10h-3",
	redo: "m15 14 5-5-5-5 M20 9H9a5 5 0 0 0 0 10h3",
	reset: "M3 12a9 9 0 1 0 3-6.7L3 8 M3 3v5h5",
	zoomIn: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M21 21l-4.3-4.3 M11 8v6 M8 11h6",
	zoomOut: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M21 21l-4.3-4.3 M8 11h6",
	fit: "M8 3H5a2 2 0 0 0-2 2v3 M21 8V5a2 2 0 0 0-2-2h-3 M3 16v3a2 2 0 0 0 2 2h3 M16 21h3a2 2 0 0 0 2-2v-3",
	sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4",
	layers: "M12 2 2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5",
	chevronLeft: "m15 18-6-6 6-6",
	chevronRight: "m9 18 6-6-6-6",
	chevronDown: "m6 9 6 6 6-6",
	check: "M20 6 9 17l-5-5",
	close: "M18 6 6 18 M6 6l12 12",
	copy: "M9 9h11v11H9z M5 15H4V4h11v1",
	trash: "M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6 M10 11v6 M14 11v6",
	centerH: "M12 2v20 M6 7h12v4H6z M8 13h8v4H8z",
	centerV: "M2 12h20 M7 6h4v12H7z M13 8h4v8h-4z",
	forward: "M12 19V5 M5 12l7-7 7 7",
	backward: "M12 5v14 M19 12l-7 7-7-7",
	info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 16v-4 M12 8h.01",
	lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
	plus: "M12 5v14 M5 12h14",
	minus: "M5 12h14",
	bold: "M7 4h6a4 4 0 0 1 0 8H7z M7 12h7a4 4 0 0 1 0 8H7z",
	italic: "M19 4h-9 M14 20H5 M15 4 9 20",
	underline: "M6 4v6a6 6 0 0 0 12 0V4 M4 20h16",
	strike: "M16 4H9a3 3 0 0 0-2.8 4 M14 12a4 4 0 0 1 0 8H6 M4 12h16",
	overline: "M4 3h16 M7 21V11a5 5 0 0 1 10 0v10",
	curveUp: "M3 17c3-8 15-8 18 0 M8 20l-1-3 M16 20l1-3",
	curveDown: "M3 7c3 8 15 8 18 0 M8 4l-1 3 M16 4l1 3",
	curveNone: "M3 12h18 M3 9v6 M21 9v6",
	flipX: "M12 3v18 M8 7 3 12l5 5V7Z M16 7l5 5-5 5V7Z",
	flipY: "M3 12h18 M7 8l5-5 5 5H7Z M7 16l5 5 5-5H7Z",
	palette: "M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.8-1.9 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.3-4-7.7-9-7.7Z",
	alignLeft: "M3 6h18 M3 12h12 M3 18h16",
	alignCenter: "M3 6h18 M6 12h12 M4 18h16",
	alignRight: "M3 6h18 M9 12h12 M5 18h16",
	more: "M5 12h.01 M12 12h.01 M19 12h.01",
	edit: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
	upload: "M12 15V3 M7 8l5-5 5 5 M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4",
	download: "M12 3v12 M7 10l5 5 5-5 M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4",
	cart: "M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6 M9 21h.01 M18 21h.01",
	search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M20 20l-4-4",
	orientation: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M10 18h4",
	ruler: "M3 15 15 3l6 6L9 21l-6-6Z M7 11l2 2 M10 8l2 2 M13 5l2 2",
	templates: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
	grip: "M9 5h.01 M9 12h.01 M9 19h.01 M15 5h.01 M15 12h.01 M15 19h.01",
	eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
	eyeOff: "M3 3l18 18 M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1 M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.8-1.3 M9.9 9.9a3 3 0 0 0 4.2 4.2",
	scene: "M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 8.5h.01"
};
function Q({ name: e, size: t = 20, label: n, ...r }) {
	return /* @__PURE__ */ Z("svg", {
		width: t,
		height: t,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": "1.75",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"aria-hidden": n ? void 0 : "true",
		role: n ? "img" : void 0,
		"aria-label": n,
		focusable: "false",
		...r,
		children: /* @__PURE__ */ Z("path", { d: Ef[e] ?? Ef.more })
	});
}
function Df({ id: e, url: t, size: n = 22 }) {
	return t ? /* @__PURE__ */ Z("img", {
		src: t,
		width: n,
		height: n,
		alt: "",
		class: "sc-section-img"
	}) : /* @__PURE__ */ Z(Q, {
		name: e,
		size: n
	});
}
//#endregion
//#region src/ui/components/primitives.tsx
function $({ icon: e, label: t, pressed: n, disabled: r, onClick: i, class: a = "", ...o }) {
	return /* @__PURE__ */ Z("button", {
		type: "button",
		class: `sc-iconbtn ${a}`,
		"aria-label": t,
		title: t,
		"aria-pressed": n === void 0 ? void 0 : n,
		disabled: r,
		onClick: i,
		...o,
		children: /* @__PURE__ */ Z(Q, { name: e })
	});
}
function Of(e, t, n, r, i) {
	if (![
		"ArrowRight",
		"ArrowDown",
		"ArrowLeft",
		"ArrowUp",
		"Home",
		"End"
	].includes(e.key) || !t.length) return;
	e.preventDefault();
	let a = Math.max(0, t.indexOf(n ?? "")), o = e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : e.key === "ArrowRight" || e.key === "ArrowDown" ? (a + 1) % t.length : (a - 1 + t.length) % t.length;
	r(t[o]), i?.querySelectorAll("[role=\"radio\"]")[o]?.focus();
}
function kf({ image: e, visual: t }) {
	let [n, r] = N(!1);
	return e && !n ? /* @__PURE__ */ Z("img", {
		src: e,
		alt: "",
		loading: "lazy",
		onError: () => r(!0)
	}) : t ? /* @__PURE__ */ Z(j, { children: t }) : null;
}
function Af({ url: e, label: t, caption: n, onClose: r }) {
	return /* @__PURE__ */ Z("div", {
		class: "sc-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": n ? `${t} — ${n}` : t,
		onClick: r,
		onKeyDown: (e) => e.key === "Escape" && r(),
		children: [/* @__PURE__ */ Z("figure", {
			class: "sc-lightbox__figure",
			children: [/* @__PURE__ */ Z("img", {
				src: e,
				alt: n ?? ""
			}), n && /* @__PURE__ */ Z("figcaption", {
				class: "sc-lightbox__caption",
				children: n
			})]
		}), /* @__PURE__ */ Z("button", {
			type: "button",
			class: "sc-lightbox__close",
			autoFocus: !0,
			onClick: r,
			children: [/* @__PURE__ */ Z(Q, {
				name: "close",
				size: 18
			}), /* @__PURE__ */ Z("span", {
				class: "sc-visually-hidden",
				children: t
			})]
		})]
	});
}
function jf({ label: e, items: t, value: n, onChange: r, columns: i = 2, exampleLabel: a = "Exemple" }) {
	let o = He(null), [s, c] = N(null), l = (e, t) => /* @__PURE__ */ Z("button", {
		type: "button",
		class: t,
		"aria-label": `${a} — ${e.label}`,
		onClick: (t) => {
			t.stopPropagation(), c(e);
		},
		children: [/* @__PURE__ */ Z(Q, {
			name: "eye",
			size: 14
		}), /* @__PURE__ */ Z("span", { children: a })]
	});
	return /* @__PURE__ */ Z("div", {
		ref: o,
		class: `sc-cards sc-cards--${i}`,
		role: "radiogroup",
		"aria-label": e,
		onKeyDown: (e) => Of(e, t.map((e) => e.id), n, r, o.current),
		children: [t.map((e) => {
			let i = e.id === n;
			return /* @__PURE__ */ Z("div", {
				class: "sc-card",
				role: "radio",
				"aria-checked": i,
				tabIndex: i || !n && e === t[0] ? 0 : -1,
				onClick: () => r(e.id),
				children: [
					(e.visual || e.image) && /* @__PURE__ */ Z("div", {
						class: "sc-card__media",
						children: /* @__PURE__ */ Z(kf, {
							image: e.image,
							visual: e.visual
						})
					}),
					/* @__PURE__ */ Z("div", {
						class: "sc-card__body",
						children: [
							/* @__PURE__ */ Z("span", {
								class: "sc-card__label",
								children: e.label
							}),
							e.description && /* @__PURE__ */ Z("span", {
								class: "sc-card__desc",
								children: e.description
							}),
							e.popupImage && l(e, "sc-card__example")
						]
					}),
					e.price && /* @__PURE__ */ Z("span", {
						class: "sc-card__price",
						children: e.price
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-card__check",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z(Q, {
							name: "check",
							size: 14
						})
					})
				]
			}, e.id);
		}), s?.popupImage && /* @__PURE__ */ Z(Af, {
			url: s.popupImage,
			label: a,
			caption: s.label,
			onClose: () => c(null)
		})]
	});
}
function Mf({ label: e, items: t, value: n, onChange: r }) {
	let i = He(null), a = t.find((e) => e.id === n);
	return /* @__PURE__ */ Z("div", {
		class: "sc-swatches-wrap",
		children: [/* @__PURE__ */ Z("div", {
			ref: i,
			class: "sc-swatches",
			role: "radiogroup",
			"aria-label": e,
			onKeyDown: (e) => Of(e, t.map((e) => e.id), n, r, i.current),
			children: t.map((e) => {
				let i = e.id === n;
				return /* @__PURE__ */ Z("div", {
					class: `sc-swatch${e.inner ? " has-inner" : ""}`,
					role: "radio",
					"aria-checked": i,
					"aria-label": e.price ? `${e.label}, ${e.price}` : e.label,
					title: e.label,
					tabIndex: i || !n && e === t[0] ? 0 : -1,
					onClick: () => r(e.id),
					style: {
						"--sw": e.hex,
						...e.inner ? { "--sw-inner": e.inner } : {},
						backgroundImage: e.image ? `url("${e.image}")` : void 0
					},
					children: /* @__PURE__ */ Z("span", {
						class: "sc-swatch__check",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z(Q, {
							name: "check",
							size: 14
						})
					})
				}, e.id);
			})
		}), a && /* @__PURE__ */ Z("p", {
			class: "sc-swatches__name",
			children: [a.label, a.price && /* @__PURE__ */ Z("span", {
				class: "sc-muted",
				children: [" · ", a.price]
			})]
		})]
	});
}
function Nf({ label: e, options: t, value: n, onChange: r, size: i = "md", withText: a = !1 }) {
	let o = He(null);
	return /* @__PURE__ */ Z("div", {
		ref: o,
		class: `sc-seg sc-seg--${i}`,
		role: "radiogroup",
		"aria-label": e,
		onKeyDown: (e) => Of(e, t.map((e) => e.value), n, (e) => r(e), o.current),
		children: t.map((e) => /* @__PURE__ */ Z("div", {
			role: "radio",
			class: "sc-seg__opt",
			"aria-checked": e.value === n,
			tabIndex: e.value === n ? 0 : -1,
			onClick: () => r(e.value),
			title: e.icon ? e.label : void 0,
			"aria-label": e.icon ? e.label : void 0,
			children: e.icon && a ? /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z(Q, {
				name: e.icon,
				size: 16,
				class: "sc-seg__icon"
			}), /* @__PURE__ */ Z("span", {
				class: "sc-seg__text",
				children: e.label
			})] }) : e.icon ? /* @__PURE__ */ Z(Q, {
				name: e.icon,
				size: 18
			}) : e.label
		}, e.value))
	});
}
function Pf({ label: e, value: t, min: n = 1, max: r, onChange: i, decLabel: a, incLabel: o }) {
	let s = Ge(), c = (e) => Math.max(n, r ? Math.min(r, e) : e);
	return /* @__PURE__ */ Z("div", {
		class: "sc-stepper",
		children: [
			/* @__PURE__ */ Z("label", {
				for: s,
				class: "sc-visually-hidden",
				children: e
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-stepper__btn",
				"aria-label": a,
				disabled: t <= n,
				onClick: () => i(c(t - 1)),
				children: /* @__PURE__ */ Z(Q, {
					name: "minus",
					size: 16
				})
			}),
			/* @__PURE__ */ Z("input", {
				id: s,
				class: "sc-stepper__input",
				type: "text",
				inputMode: "numeric",
				value: t,
				onChange: (e) => i(c(parseInt(e.target.value, 10) || n))
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-stepper__btn",
				"aria-label": o,
				disabled: !!r && t >= r,
				onClick: () => i(c(t + 1)),
				children: /* @__PURE__ */ Z(Q, {
					name: "plus",
					size: 16
				})
			})
		]
	});
}
function Ff({ label: e, hint: t, error: n, counter: r, children: i, id: a }) {
	let o = Ge(), s = a ?? o, c = t ? `${s}-hint` : void 0, l = n ? `${s}-err` : void 0;
	return /* @__PURE__ */ Z("div", {
		class: `sc-field${n ? " sc-field--error" : ""}`,
		children: [
			/* @__PURE__ */ Z("div", {
				class: "sc-field__top",
				children: [/* @__PURE__ */ Z("label", {
					class: "sc-field__label",
					for: s,
					children: e
				}), r && /* @__PURE__ */ Z("span", {
					class: "sc-field__counter",
					children: r
				})]
			}),
			i({
				id: s,
				describedBy: [c, l].filter(Boolean).join(" ") || void 0
			}),
			t && !n && /* @__PURE__ */ Z("p", {
				class: "sc-field__hint",
				id: c,
				children: t
			}),
			n && /* @__PURE__ */ Z("p", {
				class: "sc-field__error",
				id: l,
				role: "alert",
				children: n
			})
		]
	});
}
function If({ id: e, value: t, onCommit: n, unit: r, min: i, max: a, step: o = 1, describedBy: s, disabled: c, label: l }) {
	let u = (e) => {
		let t = Number(e.replace(",", "."));
		Number.isFinite(t) && n(Math.min(a ?? Infinity, Math.max(i ?? -Infinity, t)));
	};
	return /* @__PURE__ */ Z("div", {
		class: "sc-num",
		children: [/* @__PURE__ */ Z("input", {
			id: e,
			class: "sc-num__input",
			type: "text",
			inputMode: "decimal",
			"aria-label": l,
			"aria-describedby": s,
			disabled: c,
			value: Math.round(t * 10) / 10,
			onChange: (e) => u(e.target.value),
			onKeyDown: (e) => {
				if (e.key === "ArrowUp" || e.key === "ArrowDown") {
					e.preventDefault();
					let r = (e.shiftKey ? 10 : 1) * o * (e.key === "ArrowUp" ? 1 : -1);
					n(Math.min(a ?? Infinity, Math.max(i ?? -Infinity, t + r)));
				}
			}
		}), r && /* @__PURE__ */ Z("span", {
			class: "sc-num__unit",
			children: r
		})]
	});
}
function Lf({ label: e, value: t, active: n, image: r, onChange: i }) {
	let [a, o] = N(!1), s = t && /^#[0-9a-f]{6}$/i.test(t) ? t : "#000000";
	return /* @__PURE__ */ Z("label", {
		class: `sc-customcolor${n ? " is-on" : ""}`,
		title: e,
		children: [
			/* @__PURE__ */ Z("input", {
				type: "color",
				class: "sc-visually-hidden",
				value: s,
				"aria-label": e,
				onInput: (e) => i(e.target.value)
			}),
			/* @__PURE__ */ Z("span", {
				class: "sc-customcolor__disc",
				"aria-hidden": "true",
				children: [r && !a ? /* @__PURE__ */ Z("img", {
					src: r,
					alt: "",
					onError: () => o(!0)
				}) : /* @__PURE__ */ Z("svg", {
					viewBox: "0 0 44 44",
					children: /* @__PURE__ */ Z("g", {
						fill: "none",
						"fill-rule": "evenodd",
						children: [
							/* @__PURE__ */ Z("path", {
								d: "M22 0H1a1 1 0 0 0-.6.3L22 22V0z",
								fill: "#CE1128"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M.3.3A1 1 0 0 0 0 1v21h22L.3.3z",
								fill: "#ED2E8A"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M43.7.3A1 1 0 0 0 43 0H22v22L43.7.3z",
								fill: "#F99410"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M43.7 43.7A1 1 0 0 0 44 43V22H22l21.7 21.7z",
								fill: "#20B718"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M43.7.3 22 22h22V1a1 1 0 0 0-.3-.7",
								fill: "#FCEA10"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M22 44h21a1 1 0 0 0 .7-.3L22 22v22z",
								fill: "#2CB1E5"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M0 22v21c0 .3.1.5.3.7L22 22H0z",
								fill: "#662483"
							}),
							/* @__PURE__ */ Z("path", {
								d: "M.3 43.7A1 1 0 0 0 1 44h21V22L.3 43.7z",
								fill: "#126EB2"
							})
						]
					})
				}), n && /* @__PURE__ */ Z("span", {
					class: "sc-customcolor__dot",
					style: { background: s }
				})]
			}),
			/* @__PURE__ */ Z("span", {
				class: "sc-customcolor__text",
				children: [e, n && /* @__PURE__ */ Z("span", {
					class: "sc-customcolor__hex",
					children: s.toUpperCase()
				})]
			})
		]
	});
}
//#endregion
//#region src/ui/downscale.ts
async function Rf(e, t = 1920) {
	let n = URL.createObjectURL(e);
	try {
		let e = await new Promise((e, t) => {
			let r = new Image();
			r.onload = () => e(r), r.onerror = () => t(/* @__PURE__ */ Error("Image illisible")), r.src = n;
		}), r = Math.min(1, t / Math.max(e.width, e.height)), i = document.createElement("canvas");
		return i.width = Math.round(e.width * r), i.height = Math.round(e.height * r), i.getContext("2d").drawImage(e, 0, 0, i.width, i.height), i.toDataURL("image/jpeg", .86);
	} finally {
		URL.revokeObjectURL(n);
	}
}
//#endregion
//#region src/ui/ObjectPanel.tsx
function zf(e) {
	let { config: t, store: n, optionEditor: r } = z(), i = Zn(t, n.design.value), a = e.zoneId ? i?.textZones.find((t) => t.id === e.zoneId) : void 0, o = e.zoneId ? i?.imageZones.find((t) => t.id === e.zoneId) : void 0, s = !!(a || o);
	return {
		zone: a ?? o ?? null,
		textZone: a ?? null,
		edit: !a || a.can.edit,
		font: !a || a.can.font,
		color: !a || a.can.color,
		resize: a ? a.can.resize : !o || o.can.resize,
		moveX: a ? a.can.moveX : !o || o.can.moveX,
		moveY: a ? a.can.moveY : !o || o.can.moveY,
		rotate: a ? a.can.rotate : !o || o.can.rotate,
		remove: !s,
		clone: !r
	};
}
function Bf({ label: e, value: t, palette: n, custom: r, image: i, onChange: a }) {
	let { t: o } = z(), s = n.map((e, t) => ({
		id: `${t}-${e.hex}`,
		label: e.label,
		hex: e.hex
	})), c = s.find((e) => e.hex.toLowerCase() === t.toLowerCase())?.id ?? null;
	return /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: e
		}), /* @__PURE__ */ Z("div", {
			class: "sc-colorrow",
			children: [s.length > 0 && /* @__PURE__ */ Z(Mf, {
				label: e,
				items: s,
				value: c,
				onChange: (e) => a(s.find((t) => t.id === e).hex)
			}), r && /* @__PURE__ */ Z(Lf, {
				label: o("color.customPick"),
				value: t,
				active: c === null && !!t,
				image: i,
				onChange: a
			})]
		})]
	});
}
function Vf({ object: e }) {
	let { config: t, store: n, t: r, assets: i } = z(), a = zf(e), o = t.unit, s = (t) => n.actions.updateObject(e.id, t), c = e.type === "text" ? r("object.text") : e.type === "image" ? r("object.image") : r("object.qr"), l = /* @__PURE__ */ Z("span", {
		class: "sc-locked",
		children: [
			/* @__PURE__ */ Z(Q, {
				name: "lock",
				size: 14
			}),
			" ",
			r("text.locked")
		]
	}), u = He(null);
	return Ve(() => {
		let e = u.current?.parentElement;
		for (; e && !(e.scrollHeight > e.clientHeight && /auto|scroll/.test(getComputedStyle(e).overflowY));) e = e.parentElement;
		e && u.current && (e.scrollTop += u.current.getBoundingClientRect().top - e.getBoundingClientRect().top);
	}, [e.id]), /* @__PURE__ */ Z("section", {
		ref: u,
		class: "sc-objpanel",
		"aria-label": c,
		children: [
			/* @__PURE__ */ Z("header", {
				class: "sc-objpanel__head",
				children: [
					e.type === "image" && /* @__PURE__ */ Z("span", {
						class: "sc-objlist__thumb is-image",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z("img", {
							src: i.resolve(e.src),
							alt: ""
						})
					}),
					/* @__PURE__ */ Z("h4", {
						class: "sc-subtitle sc-objpanel__title",
						children: e.type === "image" && e.name ? e.name : c
					}),
					/* @__PURE__ */ Z($, {
						icon: "close",
						label: r("action.close"),
						onClick: () => n.actions.ui({ selectedObjectId: null })
					})
				]
			}),
			e.type === "text" && /* @__PURE__ */ Z(ep, { o: e }),
			e.type === "image" && /* @__PURE__ */ Z(Gf, { o: e }),
			e.type === "qr" && /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z(Ff, {
				label: r("qr.value"),
				children: ({ id: t }) => /* @__PURE__ */ Z("input", {
					id: t,
					class: "sc-input",
					value: e.value,
					placeholder: r("qr.placeholder"),
					onInput: (e) => s({ value: e.target.value })
				})
			}), /* @__PURE__ */ Z(Bf, {
				label: r("qr.color"),
				value: e.color,
				palette: t.text.colors,
				custom: !0,
				onChange: (e) => s({ color: e })
			})] }),
			/* @__PURE__ */ Z("details", {
				class: "sc-disclosure",
				open: !0,
				children: [
					/* @__PURE__ */ Z("summary", { children: r("object.position") }),
					/* @__PURE__ */ Z("div", {
						class: "sc-grid-3",
						children: [
							/* @__PURE__ */ Z(Ff, {
								label: r("object.x"),
								children: ({ id: t }) => /* @__PURE__ */ Z(If, {
									id: t,
									value: e.x,
									unit: o,
									disabled: !a.moveX,
									onCommit: (e) => s({ x: e })
								})
							}),
							/* @__PURE__ */ Z(Ff, {
								label: r("object.y"),
								children: ({ id: t }) => /* @__PURE__ */ Z(If, {
									id: t,
									value: e.y,
									unit: o,
									disabled: !a.moveY,
									onCommit: (e) => s({ y: e })
								})
							}),
							/* @__PURE__ */ Z(Ff, {
								label: r("object.rotation"),
								children: ({ id: t }) => /* @__PURE__ */ Z(If, {
									id: t,
									value: e.rotation,
									unit: "°",
									min: -360,
									max: 360,
									disabled: !a.rotate,
									onCommit: (e) => s({ rotation: e })
								})
							}),
							e.type === "image" && /* @__PURE__ */ Z(Ff, {
								label: r("object.width"),
								children: ({ id: t }) => /* @__PURE__ */ Z(If, {
									id: t,
									value: e.width,
									unit: o,
									min: 1,
									disabled: !a.resize,
									onCommit: (t) => s({
										width: t,
										height: e.height * t / e.width
									})
								})
							}),
							e.type === "qr" && /* @__PURE__ */ Z(Ff, {
								label: r("object.width"),
								children: ({ id: t }) => /* @__PURE__ */ Z(If, {
									id: t,
									value: e.size,
									unit: o,
									min: 1,
									disabled: !a.resize,
									onCommit: (e) => s({ size: e })
								})
							})
						]
					}),
					/* @__PURE__ */ Z("div", {
						class: "sc-toolrow",
						children: [/* @__PURE__ */ Z("button", {
							type: "button",
							class: "sc-btn sc-btn--ghost",
							disabled: !a.moveX,
							onClick: () => s({ x: 0 }),
							children: [
								/* @__PURE__ */ Z(Q, {
									name: "centerH",
									size: 18
								}),
								" ",
								r("action.centerH")
							]
						}), /* @__PURE__ */ Z("button", {
							type: "button",
							class: "sc-btn sc-btn--ghost",
							disabled: !a.moveY,
							onClick: () => s({ y: 0 }),
							children: [
								/* @__PURE__ */ Z(Q, {
									name: "centerV",
									size: 18
								}),
								" ",
								r("action.centerV")
							]
						})]
					}),
					(!a.moveX || !a.moveY || !a.rotate) && l
				]
			}),
			e.zoneId && /* @__PURE__ */ Z(Hf, {
				zoneId: e.zoneId,
				kind: e.type === "text" ? "text" : "image"
			}),
			/* @__PURE__ */ Z("footer", {
				class: "sc-objpanel__foot",
				children: [a.clone && /* @__PURE__ */ Z("button", {
					type: "button",
					class: "sc-btn sc-btn--ghost",
					onClick: () => n.actions.duplicateObject(e.id),
					children: [
						/* @__PURE__ */ Z(Q, {
							name: "copy",
							size: 18
						}),
						" ",
						r("action.clone")
					]
				}), a.remove && /* @__PURE__ */ Z("button", {
					type: "button",
					class: "sc-btn sc-btn--danger",
					onClick: () => n.actions.removeObject(e.id),
					children: [
						/* @__PURE__ */ Z(Q, {
							name: "trash",
							size: 18
						}),
						" ",
						r("action.delete")
					]
				})]
			})
		]
	});
}
function Hf({ zoneId: e, kind: t }) {
	let { optionEditor: n, t: r } = z();
	if (!n) return null;
	let i = n.rights.value[e];
	if (!i) return null;
	let a = t === "text" ? [
		"edit",
		"font",
		"color",
		"resize",
		"rotate",
		"moveX",
		"moveY"
	] : [
		"replace",
		"resize",
		"rotate",
		"moveX",
		"moveY"
	];
	return /* @__PURE__ */ Z("details", {
		class: "sc-disclosure",
		open: !0,
		children: [
			/* @__PURE__ */ Z("summary", { children: r("editor.rights") }),
			/* @__PURE__ */ Z("p", {
				class: "sc-muted sc-small",
				children: r("editor.rightsHint")
			}),
			/* @__PURE__ */ Z("div", {
				class: "sc-rights",
				children: a.map((t) => /* @__PURE__ */ Z("label", {
					class: "sc-switch sc-switch--sm",
					children: [/* @__PURE__ */ Z("input", {
						type: "checkbox",
						checked: i[t],
						onChange: (r) => n.set(e, { [t]: r.target.checked })
					}), /* @__PURE__ */ Z("span", {
						class: "sc-switch__text",
						children: r(`editor.right.${t}`)
					})]
				}, t))
			})
		]
	});
}
var Uf = {
	greyscale: "grayscale(1)",
	sepia: "sepia(1)",
	blur: "blur(2px)",
	emboss: "grayscale(1) contrast(1.6)",
	sharpen: "contrast(1.35) saturate(1.2)",
	greenify: "sepia(1) hue-rotate(60deg) saturate(3)",
	pinkify: "sepia(1) hue-rotate(290deg) saturate(3)",
	orangeify: "sepia(1) hue-rotate(-20deg) saturate(4)",
	blueify: "sepia(1) hue-rotate(170deg) saturate(3)"
};
function Wf({ filter: e, base: t, fallback: n }) {
	let r = e === "blur" ? "sharpen" : e, [i, a] = N(!1), o = i || !t ? n : `${t.replace(/\/+$/, "")}/im_${r}_filter.png`, s = i || !t || e === "blur" ? Uf[e] : void 0;
	return /* @__PURE__ */ Z("span", {
		class: "sc-fx__thumb",
		children: /* @__PURE__ */ Z("img", {
			src: o,
			alt: "",
			loading: "lazy",
			style: s ? { filter: s } : void 0,
			onError: () => !i && a(!0)
		})
	});
}
function Gf({ o: e }) {
	let { config: t, store: n, t: r, assets: i } = z(), a = zf(e), o = (t) => n.actions.updateObject(e.id, t), s = /\.svg(\?|#|$)/i.test(e.src) || e.src.startsWith("data:image/svg"), c = t.images.filters.filter((e) => Gd.includes(e)), l = new Set(e.filters ?? []);
	return /* @__PURE__ */ Z(j, { children: [
		/* @__PURE__ */ Z("div", {
			class: "sc-toolrow",
			children: [/* @__PURE__ */ Z($, {
				icon: "flipX",
				label: r("image.flipX"),
				pressed: !!e.flipX,
				disabled: !a.rotate,
				onClick: () => o({ flipX: !e.flipX })
			}), /* @__PURE__ */ Z($, {
				icon: "flipY",
				label: r("image.flipY"),
				pressed: !!e.flipY,
				disabled: !a.rotate,
				onClick: () => o({ flipY: !e.flipY })
			})]
		}),
		s && (t.images.colors.length > 0 || t.images.allowCustomColor) && /* @__PURE__ */ Z(Bf, {
			label: r("image.color"),
			value: e.tint ?? "",
			palette: t.images.colors,
			custom: t.images.allowCustomColor,
			image: t.images.customColorImage,
			onChange: (e) => o({ tint: e })
		}),
		!s && c.length > 0 && /* @__PURE__ */ Z("div", {
			class: "sc-block",
			children: [/* @__PURE__ */ Z("h4", {
				class: "sc-subtitle",
				children: r("image.filters")
			}), /* @__PURE__ */ Z("div", {
				class: "sc-fxgrid",
				role: "group",
				"aria-label": r("image.filters"),
				children: c.map((t) => /* @__PURE__ */ Z("button", {
					type: "button",
					class: `sc-fx${l.has(t) ? " is-on" : ""}`,
					"aria-pressed": l.has(t),
					onClick: () => {
						let e = new Set(l);
						e.has(t) ? e.delete(t) : e.add(t), o({ filters: [...e] });
					},
					children: [
						/* @__PURE__ */ Z(Wf, {
							filter: t,
							base: i.urls.filters_url,
							fallback: e.src
						}),
						/* @__PURE__ */ Z("span", {
							class: "sc-fx__label",
							children: r(`image.filter.${t}`)
						}),
						l.has(t) && /* @__PURE__ */ Z("span", {
							class: "sc-fx__check",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Z(Q, {
								name: "check",
								size: 12
							})
						})
					]
				}, t))
			})]
		})
	] });
}
function Kf({ o: e, update: t }) {
	let { config: n, t: r } = z(), i = Jn(n.text.type, e), a = i.type === "normal", o = Qf(n.fonts.find((t) => t.id === e.fontId)), s = [
		n.text.bold && {
			key: "bold",
			label: r("text.bold"),
			on: e.bold,
			css: { fontWeight: 800 },
			set: () => t({ bold: !e.bold })
		},
		n.text.italic && {
			key: "italic",
			label: r("text.italic"),
			on: e.italic,
			css: { fontStyle: "italic" },
			set: () => t({ italic: !e.italic })
		},
		a && n.text.underline && {
			key: "underline",
			label: r("text.underline"),
			on: e.underline,
			css: { textDecoration: "underline" },
			set: () => t({ underline: !e.underline })
		},
		a && n.text.strike && {
			key: "strike",
			label: r("text.strike"),
			on: e.strike,
			css: { textDecoration: "line-through" },
			set: () => t({ strike: !e.strike })
		},
		a && n.text.overline && {
			key: "overline",
			label: r("text.overline"),
			on: !!e.overline,
			css: { textDecoration: "overline" },
			set: () => t({ overline: !e.overline })
		}
	].filter((e) => !!e), c = e.curve > 0 ? "up" : e.curve < 0 ? "down" : "none", l = a && (n.text.curveUp || n.text.curveDown) ? [
		{
			v: "none",
			label: r("text.curveNone"),
			d: "M6 24 H58"
		},
		...n.text.curveUp ? [{
			v: "up",
			label: r("text.curveUpShort"),
			d: "M6 30 Q32 4 58 30"
		}] : [],
		...n.text.curveDown ? [{
			v: "down",
			label: r("text.curveDownShort"),
			d: "M6 12 Q32 38 58 12"
		}] : []
	] : [], u = (e, t, r) => /* @__PURE__ */ Z(Bf, {
		label: e,
		value: t,
		palette: n.text.colors,
		custom: n.text.allowCustomColor,
		image: n.text.customColorImage,
		onChange: r
	});
	return /* @__PURE__ */ Z(j, { children: [
		(s.length > 0 || l.length > 0) && /* @__PURE__ */ Z("div", {
			class: "sc-block",
			children: [
				/* @__PURE__ */ Z("h4", {
					class: "sc-subtitle",
					children: r("text.effects")
				}),
				s.length > 0 && /* @__PURE__ */ Z("div", {
					class: "sc-fxgrid sc-fxgrid--text",
					role: "group",
					"aria-label": r("text.effects"),
					children: s.map((e) => /* @__PURE__ */ Z("button", {
						type: "button",
						class: `sc-fx${e.on ? " is-on" : ""}`,
						"aria-pressed": e.on,
						onClick: e.set,
						children: [/* @__PURE__ */ Z("span", {
							class: "sc-fx__thumb sc-fx__thumb--text",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Z("span", {
								style: {
									fontFamily: o,
									...e.css
								},
								children: "Ab"
							})
						}), /* @__PURE__ */ Z("span", {
							class: "sc-fx__label",
							children: e.label
						})]
					}, e.key))
				}),
				l.length > 0 && /* @__PURE__ */ Z("div", {
					class: "sc-fxgrid sc-fxgrid--text",
					role: "radiogroup",
					"aria-label": r("text.curve"),
					children: l.map((n) => /* @__PURE__ */ Z("button", {
						type: "button",
						role: "radio",
						"aria-checked": c === n.v,
						title: n.v === "none" ? n.label : n.v === "up" ? r("text.curveUp") : r("text.curveDown"),
						class: `sc-fx${c === n.v ? " is-on" : ""}`,
						onClick: () => t({ curve: n.v === "up" ? 150 : n.v === "down" ? -150 : 0 }),
						children: [/* @__PURE__ */ Z("span", {
							class: "sc-fx__thumb sc-fx__thumb--text",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Z("svg", {
								viewBox: "0 0 64 40",
								width: "64",
								height: "40",
								children: [/* @__PURE__ */ Z("path", {
									id: `sc-curve-${e.id}-${n.v}`,
									d: n.d,
									fill: "none"
								}), /* @__PURE__ */ Z("text", {
									"font-family": o,
									"font-size": "15",
									"font-weight": "600",
									fill: "currentColor",
									"text-anchor": "middle",
									"dominant-baseline": n.v === "down" ? "hanging" : "auto",
									children: /* @__PURE__ */ Z("textPath", {
										href: `#sc-curve-${e.id}-${n.v}`,
										startOffset: "50%",
										children: "Abcde"
									})
								})]
							})
						}), /* @__PURE__ */ Z("span", {
							class: "sc-fx__label",
							children: n.label
						})]
					}, n.v))
				})
			]
		}),
		a && n.text.outline && /* @__PURE__ */ Z("div", {
			class: "sc-block sc-fxblock",
			children: [/* @__PURE__ */ Z(Jf, {
				label: r("text.outline"),
				value: i.outline.width,
				max: 25,
				onChange: (e) => t({ outlineWidth: e })
			}), i.outline.width > 0 && u(r("text.outlineColor"), i.outline.color, (e) => t({ outlineColor: e }))]
		}),
		i.type === "3D" && i.border2 && i.side && /* @__PURE__ */ Z("div", {
			class: "sc-block sc-fxblock",
			children: [
				/* @__PURE__ */ Z("h4", {
					class: "sc-subtitle",
					children: r("text.3d.borders")
				}),
				/* @__PURE__ */ Z(Jf, {
					label: r("text.3d.first"),
					help: "first-border",
					value: i.outline.width,
					max: 25,
					onChange: (e) => t({ outlineWidth: e })
				}),
				u(r("text.3d.firstColor"), i.outline.color, (e) => t({ outlineColor: e })),
				/* @__PURE__ */ Z(Jf, {
					label: r("text.3d.second"),
					help: "second-border",
					value: i.border2.width,
					max: 30,
					onChange: (e) => t({ border2Width: e })
				}),
				u(r("text.3d.secondColor"), i.border2.color, (e) => t({ border2Color: e })),
				/* @__PURE__ */ Z(Yf, {
					label: r("text.3d.side"),
					help: "side",
					on: i.side.on,
					onChange: (e) => t({ side: e })
				}),
				i.side.on && u(r("text.3d.sideColor"), i.side.color, (e) => t({ sideColor: e }))
			]
		}),
		i.type === "neon" && i.glow && /* @__PURE__ */ Z("div", {
			class: "sc-block sc-fxblock",
			children: [/* @__PURE__ */ Z(Yf, {
				label: r("text.neon.light"),
				on: i.glow.on,
				onChange: (e) => t({ glow: e })
			}), i.glow.on && u(r("text.neon.lightColor"), i.glow.color, (e) => t({ glowColor: e }))]
		}),
		n.text.opacity && /* @__PURE__ */ Z("div", {
			class: "sc-block sc-fxblock",
			children: /* @__PURE__ */ Z(Jf, {
				label: r("text.opacity"),
				value: Math.round(i.opacity * 100),
				min: 10,
				max: 100,
				unit: "%",
				onChange: (e) => t({ opacity: e / 100 })
			})
		})
	] });
}
function qf({ name: e }) {
	let { assets: t } = z(), n = t.urls.asset_images_url.replace(/\/+$/, ""), r = [
		`${n}/text-types/help/${e}.png`,
		`${n}/text-types/Help/${e}.png`,
		`${n}/${e}.png`
	], [i, a] = N(0);
	return !n || i >= r.length ? null : /* @__PURE__ */ Z("span", {
		class: "sc-fxrow__help",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("img", {
			src: r[i],
			alt: "",
			loading: "lazy",
			onError: () => a(i + 1)
		})
	});
}
function Jf({ label: e, value: t, min: n = 0, max: r, unit: i = "px", help: a, onChange: o }) {
	let s = Ge();
	return /* @__PURE__ */ Z("div", {
		class: "sc-fxrow",
		children: [a && /* @__PURE__ */ Z(qf, { name: a }), /* @__PURE__ */ Z("div", {
			class: "sc-fxrow__body",
			children: [/* @__PURE__ */ Z("label", {
				for: s,
				class: "sc-fxrow__label",
				children: [e, /* @__PURE__ */ Z("span", {
					class: "sc-fxrow__value",
					children: [
						t,
						" ",
						i
					]
				})]
			}), /* @__PURE__ */ Z("input", {
				id: s,
				type: "range",
				class: "sc-range",
				min: n,
				max: r,
				step: 1,
				value: t,
				onInput: (e) => o(Number(e.target.value))
			})]
		})]
	});
}
function Yf({ label: e, on: t, help: n, onChange: r }) {
	return /* @__PURE__ */ Z("div", {
		class: "sc-fxrow",
		children: [n && /* @__PURE__ */ Z(qf, { name: n }), /* @__PURE__ */ Z("label", {
			class: "sc-switch sc-fxrow__body",
			children: [/* @__PURE__ */ Z("input", {
				type: "checkbox",
				role: "switch",
				checked: t,
				onChange: (e) => r(e.target.checked)
			}), /* @__PURE__ */ Z("span", { children: e })]
		})]
	});
}
var Xf = null;
function Zf(e, t, n) {
	Xf ?? (Xf = document.createElement("canvas").getContext("2d"));
	let r = Xf;
	if (!r || !e.text.trim()) return null;
	r.font = `${e.italic ? "italic " : ""}${e.bold ? "bold " : ""}100px ${t}`;
	let i = e.text.split("\n"), a = 0, o = 0, s = 0;
	i.forEach((e, t) => {
		let n = r.measureText(e || " ");
		a = Math.max(a, n.width), t === 0 && (o = n.actualBoundingBoxAscent), t === i.length - 1 && (s = n.actualBoundingBoxDescent);
	});
	let c = e.size / 100, l = a * c, u = (o + s + (i.length - 1) * 100) * c;
	if (l > n * .92) {
		let e = n * .92 / l;
		l *= e, u *= e;
	}
	return l > 0 && u > 0 ? {
		w: l,
		h: u
	} : null;
}
function Qf(e) {
	return e?.url ? `sc-font-${e.id}, "${e.label}", sans-serif` : `"${e?.label ?? "inherit"}", sans-serif`;
}
function $f({ id: e, value: t, disabled: n, onChange: r }) {
	let { config: i, t: a } = z(), [o, s] = N(!1), [c, l] = N(0), u = He(null), d = He(null), f = i.fonts.find((e) => e.id === t) ?? i.fonts[0], p = `${e}-list`;
	Ve(() => {
		if (!o) return;
		let e = Math.max(0, i.fonts.findIndex((e) => e.id === t));
		l(e), d.current?.focus({ preventScroll: !0 }), (d.current?.children[e])?.scrollIntoView({ block: "nearest" });
		let n = (e) => !e.composedPath().includes(u.current) && s(!1);
		return document.addEventListener("pointerdown", n, !0), () => document.removeEventListener("pointerdown", n, !0);
	}, [o]);
	let m = (e) => {
		let t = i.fonts[e];
		t && r(t.id), s(!1), (u.current?.querySelector("button"))?.focus();
	};
	return /* @__PURE__ */ Z("div", {
		class: `sc-fontpick${o ? " is-open" : ""}`,
		ref: u,
		children: [/* @__PURE__ */ Z("button", {
			id: e,
			type: "button",
			class: "sc-input sc-fontpick__btn",
			disabled: n,
			"aria-haspopup": "listbox",
			"aria-expanded": o,
			"aria-controls": p,
			onClick: () => s(!o),
			onKeyDown: (e) => {
				(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), s(!0));
			},
			children: [/* @__PURE__ */ Z("span", {
				class: "sc-fontpick__name",
				style: { fontFamily: Qf(f) },
				children: f ? f.display ?? f.label : ""
			}), /* @__PURE__ */ Z(Q, {
				name: "chevronDown",
				size: 18
			})]
		}), o && /* @__PURE__ */ Z("ul", {
			id: p,
			ref: d,
			class: "sc-fontpick__list",
			role: "listbox",
			tabIndex: -1,
			"aria-label": a("text.font"),
			"aria-activedescendant": `${p}-${c}`,
			onKeyDown: (e) => {
				let t = i.fonts.length, n = (t) => {
					e.preventDefault(), l(t), (d.current?.children[t])?.scrollIntoView({ block: "nearest" });
				};
				e.key === "ArrowDown" ? n(Math.min(t - 1, c + 1)) : e.key === "ArrowUp" ? n(Math.max(0, c - 1)) : e.key === "Home" ? n(0) : e.key === "End" ? n(t - 1) : e.key === "Enter" || e.key === " " ? (e.preventDefault(), m(c)) : (e.key === "Escape" || e.key === "Tab") && s(!1);
			},
			children: i.fonts.map((e, n) => /* @__PURE__ */ Z("li", {
				id: `${p}-${n}`,
				role: "option",
				"aria-selected": e.id === t,
				class: `sc-fontpick__opt${n === c ? " is-active" : ""}${e.id === t ? " is-on" : ""}`,
				style: { fontFamily: Qf(e) },
				onPointerEnter: () => l(n),
				onClick: () => m(n),
				children: [/* @__PURE__ */ Z("span", {
					class: "sc-fontpick__label",
					children: e.display ?? e.label
				}), e.id === t && /* @__PURE__ */ Z(Q, {
					name: "check",
					size: 16
				})]
			}, e.id))
		})]
	});
}
function ep({ o: e }) {
	let t = z(), { config: n, store: r, t: i } = t, a = zf(e), o = a.textZone, s = (t) => r.actions.updateObject(e.id, t), c = e.text.length, l = o?.maxChars ?? null, u = r.design.value, d = u.customSize ? null : n.sizes.find((e) => e.id === u.sizeId)?.maxTextChar ?? null, f = u.objects.reduce((t, n) => n.type === "text" && n.face === e.face && n.id !== e.id ? t + n.text.length : t, 0), p = d === null ? null : Math.max(0, d - f), m = (e) => s({ text: p === null ? e : e.slice(0, Math.max(p, Math.min(e.length, c))) }), h = o?.minChars ?? null, g = l !== null && c > l ? i("text.tooLong", { max: l }) : h !== null && c < h ? i("text.tooShort", { min: h }) : null, _ = n.text.fontSize, v = Cr(n, u), y = Math.round(pr(n, v, e.size) * 10) / 10, b = Zf(e, Qf(n.fonts.find((t) => t.id === e.fontId)), v.width);
	return /* @__PURE__ */ Z(j, { children: [
		/* @__PURE__ */ Z(Ff, {
			label: i("object.text"),
			error: g,
			counter: l ? i("text.chars", {
				n: c,
				max: l
			}) : void 0,
			children: ({ id: t, describedBy: n }) => /* @__PURE__ */ Z("textarea", {
				id: t,
				class: "sc-input sc-textarea",
				rows: 2,
				value: e.text,
				readOnly: !a.edit,
				"aria-invalid": !!g,
				"aria-describedby": n,
				maxLength: p ?? void 0,
				onInput: (e) => m(e.target.value)
			})
		}),
		p !== null && /* @__PURE__ */ Z("p", {
			class: "sc-muted sc-small",
			children: i("text.sizeLimit", {
				n: f + c,
				max: d
			})
		}),
		/* @__PURE__ */ Z("div", {
			class: "sc-grid-2",
			children: [/* @__PURE__ */ Z(Ff, {
				label: i("text.font"),
				children: ({ id: t }) => /* @__PURE__ */ Z($f, {
					id: t,
					value: e.fontId,
					disabled: !a.font,
					onChange: (e) => s({ fontId: e })
				})
			}), _.enabled && /* @__PURE__ */ Z("div", {
				class: "sc-field",
				children: [/* @__PURE__ */ Z("span", {
					class: "sc-field__label",
					children: i("text.size")
				}), /* @__PURE__ */ Z(If, {
					label: i("text.size"),
					value: y,
					min: _.min,
					max: _.max,
					step: 1,
					disabled: !a.resize,
					onCommit: (e) => s({ size: fr(n, v, e) })
				})]
			})]
		}),
		b && /* @__PURE__ */ Z("p", {
			class: "sc-muted sc-small",
			children: i("text.dims", { dims: dp(t, b.w, b.h) })
		}),
		a.color && (n.text.colors.length > 0 || n.text.allowCustomColor) && /* @__PURE__ */ Z(Bf, {
			label: i("text.color"),
			value: e.color,
			palette: n.text.colors,
			custom: n.text.allowCustomColor,
			image: n.text.customColorImage,
			onChange: (e) => s({ color: e })
		}),
		/* @__PURE__ */ Z(Kf, {
			o: e,
			update: s
		}),
		/* @__PURE__ */ Z("div", {
			class: "sc-toolrow",
			children: n.text.align && /* @__PURE__ */ Z(Nf, {
				size: "sm",
				label: i("text.align"),
				value: e.align,
				onChange: (e) => s({ align: e }),
				options: [
					{
						value: "left",
						label: i("text.alignLeft"),
						icon: "alignLeft"
					},
					{
						value: "center",
						label: i("text.alignCenter"),
						icon: "alignCenter"
					},
					{
						value: "right",
						label: i("text.alignRight"),
						icon: "alignRight"
					}
				]
			})
		})
	] });
}
function tp({ type: e }) {
	let { store: t, t: n, assets: r } = z(), i = t.design.value, a = t.ui.value, o = i.objects.filter((t) => (e === null || t.type === e) && t.face === a.face);
	return o.length ? /* @__PURE__ */ Z("div", {
		class: "sc-objlist",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: n("object.list")
		}), /* @__PURE__ */ Z("ul", { children: o.map((e) => /* @__PURE__ */ Z("li", {
			class: e.id === a.selectedObjectId ? "is-active" : "",
			children: [
				/* @__PURE__ */ Z("button", {
					type: "button",
					class: "sc-objlist__main",
					"aria-pressed": e.id === a.selectedObjectId,
					onClick: () => t.actions.ui({ selectedObjectId: e.id }),
					children: [/* @__PURE__ */ Z("span", {
						class: `sc-objlist__thumb${e.type === "image" ? " is-image" : ""}`,
						"aria-hidden": "true",
						children: e.type === "image" ? /* @__PURE__ */ Z("img", {
							src: r.resolve(e.src),
							alt: "",
							loading: "lazy"
						}) : /* @__PURE__ */ Z(Q, {
							name: e.type === "text" ? "text" : "qrcode",
							size: 18
						})
					}), /* @__PURE__ */ Z("span", {
						class: "sc-objlist__label",
						children: e.type === "text" ? e.text || "…" : e.type === "image" ? e.name || n("object.image") : e.value
					})]
				}),
				/* @__PURE__ */ Z($, {
					icon: "forward",
					label: n("action.forward"),
					onClick: () => t.actions.moveObjectInStack(e.id, 1)
				}),
				/* @__PURE__ */ Z($, {
					icon: "backward",
					label: n("action.backward"),
					onClick: () => t.actions.moveObjectInStack(e.id, -1)
				})
			]
		}, e.id)) })]
	}) : null;
}
//#endregion
//#region src/ui/steps/Options.tsx
function np(e, t) {
	if (e.config.hidePricing || !t.value) return null;
	if (t.kind === "multiplier") {
		if (t.value === 1) return null;
		let n = new Intl.NumberFormat(e.locale, { maximumFractionDigits: 1 }).format(Math.abs(t.value - 1) * 100);
		return `${t.value > 1 ? "+" : "−"}${n}\u00a0%`;
	}
	return `+${e.money(t.value)}`;
}
var rp = (e, t, n) => {
	let r = t.trim();
	return !r || !e.locale.toLowerCase().startsWith("en") && r.toLowerCase() === n ? e.t(`input.${n}`) : r;
}, ip = 5;
function ap() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value, [a, o] = N(null), s = (e) => e ? /* @__PURE__ */ Z("button", {
		type: "button",
		class: "sc-linkbtn sc-opt__example",
		onClick: (t) => (t.preventDefault(), t.stopPropagation(), o(e)),
		children: [
			/* @__PURE__ */ Z(Q, {
				name: "info",
				size: 14
			}),
			" ",
			r("info.example")
		]
	}) : null, c = (e, t, n, r, i) => /* @__PURE__ */ Z("div", {
		class: `sc-opt${t ? " is-on" : ""}`,
		children: [/* @__PURE__ */ Z("div", {
			class: "sc-opt__head",
			children: [
				/* @__PURE__ */ Z("div", {
					class: "sc-opt__text",
					children: [
						/* @__PURE__ */ Z("h4", {
							class: "sc-opt__title",
							children: e.label
						}),
						e.description && /* @__PURE__ */ Z("p", {
							class: "sc-opt__desc",
							children: e.description
						}),
						"popupImage" in e && s(e.popupImage)
					]
				}),
				n && /* @__PURE__ */ Z("span", {
					class: `sc-opt__price${t ? " is-on" : ""}`,
					children: n
				}),
				i
			]
		}), r]
	}, e.id);
	return /* @__PURE__ */ Z("div", {
		class: "sc-opts",
		children: [t.inputs.map((t) => {
			let a = i.inputs[t.id];
			switch (t.kind) {
				case "yes-no": {
					let r = a === !0, i = np(e, t.price);
					return /* @__PURE__ */ Z("label", {
						class: `sc-opt sc-opt--switch${r ? " is-on" : ""}`,
						children: /* @__PURE__ */ Z("div", {
							class: "sc-opt__head",
							children: [
								/* @__PURE__ */ Z("div", {
									class: "sc-opt__text",
									children: [
										/* @__PURE__ */ Z("span", {
											class: "sc-opt__title",
											children: t.label
										}),
										t.description && /* @__PURE__ */ Z("span", {
											class: "sc-opt__desc",
											children: t.description
										}),
										s(t.popupImage)
									]
								}),
								i && /* @__PURE__ */ Z("span", {
									class: `sc-opt__price${r ? " is-on" : ""}`,
									children: i
								}),
								/* @__PURE__ */ Z("span", {
									class: "sc-opt__toggle",
									children: [
										/* @__PURE__ */ Z("input", {
											type: "checkbox",
											role: "switch",
											checked: r,
											onChange: (e) => n.actions.setInput(t.id, e.target.checked)
										}),
										/* @__PURE__ */ Z("span", {
											class: "sc-opt__track",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ Z("span", {
											class: "sc-opt__state",
											children: r ? rp(e, t.yes, "yes") : rp(e, t.no, "no")
										})
									]
								})
							]
						})
					}, t.id);
				}
				case "dropdown": {
					let r = t.options.find((e) => e.value === a), i = r ? np(e, r.price) : null, o = t.options.length <= ip;
					return c(t, !!r, i, o ? /* @__PURE__ */ Z("div", {
						class: "sc-chips",
						role: "radiogroup",
						"aria-label": t.label,
						children: t.options.map((r) => {
							let i = np(e, r.price);
							return /* @__PURE__ */ Z("button", {
								type: "button",
								role: "radio",
								"aria-checked": r.value === a,
								class: `sc-chip${r.value === a ? " is-on" : ""}`,
								onClick: () => n.actions.setInput(t.id, r.value),
								children: [r.label, i && /* @__PURE__ */ Z("span", {
									class: "sc-chip__price",
									children: i
								})]
							}, r.value);
						})
					}) : /* @__PURE__ */ Z("select", {
						class: "sc-input",
						"aria-label": t.label,
						value: String(a ?? ""),
						onChange: (e) => n.actions.setInput(t.id, e.target.value),
						children: t.options.map((t) => {
							let n = np(e, t.price);
							return /* @__PURE__ */ Z("option", {
								value: t.value,
								children: [t.label, n ? ` (${n})` : ""]
							}, t.value);
						})
					}));
				}
				case "cards": return c(t, a !== void 0 && a !== "", null, /* @__PURE__ */ Z(jf, {
					exampleLabel: r("info.example"),
					label: t.label,
					value: String(a ?? ""),
					onChange: (e) => n.actions.setInput(t.id, e),
					items: t.options.map((t) => ({
						id: t.value,
						label: t.label,
						image: t.image,
						popupImage: t.popupImage,
						price: np(e, t.price) ?? void 0
					}))
				}));
				case "note": {
					let e = String(a ?? "");
					return c(t, e.trim() !== "", null, /* @__PURE__ */ Z("div", {
						class: "sc-opt__note",
						children: [/* @__PURE__ */ Z("textarea", {
							class: "sc-input sc-textarea",
							rows: 3,
							"aria-label": t.label,
							maxLength: t.maxChars ?? void 0,
							placeholder: r("input.notePlaceholder"),
							value: e,
							onInput: (e) => n.actions.setInput(t.id, e.target.value)
						}), t.maxChars && /* @__PURE__ */ Z("span", {
							class: "sc-opt__count",
							children: r("text.chars", {
								n: e.length,
								max: t.maxChars
							})
						})]
					}));
				}
				case "included": return c(t, !0, np(e, t.price) ?? r("price.included"), null, /* @__PURE__ */ Z(Q, {
					name: "check",
					size: 20,
					class: "sc-opt__check"
				}));
			}
		}), a && /* @__PURE__ */ Z(Af, {
			url: a,
			label: r("info.example"),
			onClose: () => o(null)
		})]
	});
}
//#endregion
//#region src/ui/steps/Images.tsx
function op({ onFile: e, onClipart: t }) {
	let { config: n, t: r } = z(), i = n.images.upload && n.images.cliparts, [a, o] = N(null), s = i ? a : n.images.upload ? "upload" : n.images.cliparts ? "browse" : null, c = n.images.clipartGroups.reduce((e, t) => e + t.items.length, 0), l = (n.images.allowedTypes.length ? n.images.allowedTypes : [
		"png",
		"jpg",
		"svg"
	]).map((e) => e.toUpperCase()).join(", "), u = i ? () => o(null) : void 0;
	return s === "upload" ? /* @__PURE__ */ Z(cp, {
		formats: l,
		onFile: e,
		onBack: u
	}) : s === "browse" ? /* @__PURE__ */ Z(lp, {
		onPick: t,
		onBack: u
	}) : /* @__PURE__ */ Z("div", {
		class: "sc-imgsrc",
		role: "group",
		"aria-labelledby": "sc-imgsrc-title",
		children: [
			/* @__PURE__ */ Z("h4", {
				id: "sc-imgsrc-title",
				class: "sc-subtitle",
				children: r("image.chooseSource")
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-imgsrc__row",
				onClick: () => o("upload"),
				children: [
					/* @__PURE__ */ Z("span", {
						class: "sc-imgsrc__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z(Q, {
							name: "upload",
							size: 22
						})
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-imgsrc__text",
						children: [/* @__PURE__ */ Z("span", {
							class: "sc-imgsrc__title",
							children: r("image.sourceUpload")
						}), /* @__PURE__ */ Z("span", {
							class: "sc-imgsrc__hint",
							children: r("image.sourceUploadHint", { formats: l })
						})]
					}),
					/* @__PURE__ */ Z(Q, {
						name: "chevronRight",
						size: 18,
						class: "sc-imgsrc__chev"
					})
				]
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-imgsrc__row",
				onClick: () => o("browse"),
				children: [
					/* @__PURE__ */ Z("span", {
						class: "sc-imgsrc__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z(Q, {
							name: "image",
							size: 22
						})
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-imgsrc__text",
						children: [/* @__PURE__ */ Z("span", {
							class: "sc-imgsrc__title",
							children: r("image.sourceBrowse")
						}), /* @__PURE__ */ Z("span", {
							class: "sc-imgsrc__hint",
							children: r("image.sourceBrowseHint", { n: c })
						})]
					}),
					/* @__PURE__ */ Z(Q, {
						name: "chevronRight",
						size: 18,
						class: "sc-imgsrc__chev"
					})
				]
			})
		]
	});
}
function sp({ title: e, extra: t, onBack: n }) {
	let { t: r } = z();
	return /* @__PURE__ */ Z("div", {
		class: "sc-imgpanel__head",
		children: [
			n && /* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-iconbtn sc-imgpanel__back",
				"aria-label": r("image.otherSource"),
				title: r("image.otherSource"),
				onClick: n,
				children: /* @__PURE__ */ Z(Q, {
					name: "chevronLeft",
					size: 20
				})
			}),
			/* @__PURE__ */ Z("h4", {
				class: "sc-subtitle sc-imgpanel__title",
				children: e
			}),
			t
		]
	});
}
function cp({ formats: e, onFile: t, onBack: n }) {
	let { config: r, t: i } = z(), [a, o] = N(!1), s = (r.images.allowedTypes.length ? r.images.allowedTypes : [
		"png",
		"jpg",
		"jpeg",
		"svg"
	]).map((e) => `.${e}`).join(",");
	return /* @__PURE__ */ Z("div", {
		class: "sc-imgpanel",
		children: [
			/* @__PURE__ */ Z(sp, {
				title: i("image.sourceUpload"),
				onBack: n
			}),
			/* @__PURE__ */ Z("label", {
				class: `sc-drop${a ? " is-over" : ""}`,
				onDragOver: (e) => (e.preventDefault(), o(!0)),
				onDragLeave: () => o(!1),
				onDrop: (e) => {
					e.preventDefault(), o(!1);
					let n = e.dataTransfer?.files?.[0];
					n && t(n);
				},
				children: [
					/* @__PURE__ */ Z("input", {
						type: "file",
						class: "sc-visually-hidden",
						accept: s,
						onChange: (e) => {
							let n = e.target, r = n.files?.[0];
							r && t(r), n.value = "";
						}
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-drop__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Z(Q, {
							name: "upload",
							size: 26
						})
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-drop__title",
						children: i("image.dropTitle")
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-drop__or",
						children: i("image.dropOr")
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-btn sc-btn--secondary sc-drop__btn",
						children: i("image.pickFile")
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-drop__formats",
						children: i("image.formats", { formats: e })
					})
				]
			}),
			/* @__PURE__ */ Z("p", {
				class: "sc-imgpanel__tip",
				children: [
					/* @__PURE__ */ Z(Q, {
						name: "info",
						size: 16
					}),
					" ",
					i("image.qualityTip")
				]
			})
		]
	});
}
function lp({ onPick: e, onBack: t }) {
	let n = z(), { config: r, t: i } = n, a = r.images.clipartGroups.filter((e) => e.items.length > 0), [o, s] = N(a[0]?.id ?? ""), [c, l] = N(""), u = a.reduce((e, t) => e + t.items.length, 0), d = u > 12 && a.some((e) => e.items.some((e) => e.title.trim())), f = c.trim().toLowerCase(), p = a.find((e) => e.id === o) ?? a[0], m = Ue(() => f ? a.flatMap((e) => e.items).filter((e) => e.title.toLowerCase().includes(f)) : p?.items ?? [], [
		f,
		p,
		a
	]);
	return p ? /* @__PURE__ */ Z("div", {
		class: "sc-imgpanel",
		children: [
			/* @__PURE__ */ Z(sp, {
				title: i("image.sourceBrowse"),
				onBack: t,
				extra: /* @__PURE__ */ Z("span", {
					class: "sc-imgpanel__count",
					children: i("image.count", { n: u })
				})
			}),
			d && /* @__PURE__ */ Z("label", {
				class: "sc-search",
				children: [/* @__PURE__ */ Z(Q, {
					name: "search",
					size: 18
				}), /* @__PURE__ */ Z("input", {
					type: "search",
					class: "sc-search__input",
					placeholder: i("image.search"),
					"aria-label": i("image.search"),
					value: c,
					onInput: (e) => l(e.target.value)
				})]
			}),
			!f && a.length > 1 && /* @__PURE__ */ Z("div", {
				class: "sc-chips sc-chips--scroll",
				role: "tablist",
				"aria-label": i("image.clipartGroup"),
				children: a.map((e) => /* @__PURE__ */ Z("button", {
					type: "button",
					role: "tab",
					"aria-selected": e.id === p.id,
					class: `sc-chip${e.id === p.id ? " is-on" : ""}`,
					onClick: () => s(e.id),
					children: [e.title, /* @__PURE__ */ Z("span", {
						class: "sc-chip__price",
						children: e.items.length
					})]
				}, e.id))
			}),
			!f && p.description && /* @__PURE__ */ Z("p", {
				class: "sc-muted sc-small",
				children: p.description
			}),
			m.length ? /* @__PURE__ */ Z("ul", {
				class: "sc-library",
				"aria-label": f ? i("image.search") : p.title,
				children: m.map((t) => /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Z("button", {
					type: "button",
					class: "sc-library__item",
					title: t.title || void 0,
					onClick: () => e(t.url, t.price, t.title.trim() || void 0),
					children: [
						/* @__PURE__ */ Z("span", {
							class: "sc-library__thumb",
							children: /* @__PURE__ */ Z("img", {
								src: t.url,
								alt: t.title,
								loading: "lazy"
							})
						}),
						t.title && /* @__PURE__ */ Z("span", {
							class: "sc-library__name",
							children: t.title
						}),
						t.price > 0 && !r.hidePricing && /* @__PURE__ */ Z("span", {
							class: "sc-library__price",
							children: ["+", n.money(t.price)]
						})
					]
				}) }, `${t.id}-${t.url}`))
			}) : /* @__PURE__ */ Z("p", {
				class: "sc-empty",
				children: i("image.noResult")
			})
		]
	}) : null;
}
//#endregion
//#region src/ui/steps/Templates.tsx
function up() {
	let e = z(), { t, store: n, config: r } = e, i = e.templates, [a, o] = N(""), [s, c] = N(null);
	if (!i) return null;
	let l = n.design.value.template?.id ?? null, u = i.loadingId.value, d = i.categories.filter((e) => i.list.some((t) => t.categoryId === e.value)), f = a ? i.list.filter((e) => e.categoryId === a) : i.list, p = (e) => {
		c(null), e === "blank" ? i.reset() : i.apply(e);
	}, m = (e) => {
		(e === "blank" || e.id !== l) && (e !== "blank" || l || i.dirty()) && (i.dirty() ? c(e) : p(e));
	}, h = i.prices.value, g = (n) => {
		let i = h[n.key];
		return /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Z("button", {
			type: "button",
			class: `sc-tplrow${n.on ? " is-on" : ""}${n.blank ? " is-blank" : ""}`,
			"aria-pressed": n.on,
			"aria-busy": n.busy,
			disabled: u !== null && !n.busy,
			onClick: n.onClick,
			children: [
				/* @__PURE__ */ Z("span", {
					class: "sc-tplrow__media",
					"aria-hidden": "true",
					children: [n.media, n.busy && /* @__PURE__ */ Z("span", { class: "sc-spinner sc-tplrow__spinner" })]
				}),
				/* @__PURE__ */ Z("span", {
					class: "sc-tplrow__body",
					children: [
						/* @__PURE__ */ Z("span", {
							class: "sc-tplrow__name",
							children: n.name
						}),
						n.meta && /* @__PURE__ */ Z("span", {
							class: "sc-tplrow__meta",
							children: n.meta
						}),
						n.on && /* @__PURE__ */ Z("span", {
							class: "sc-tplrow__current",
							children: [
								/* @__PURE__ */ Z(Q, {
									name: "check",
									size: 12
								}),
								" ",
								t("templates.current")
							]
						})
					]
				}),
				!r.hidePricing && (i === void 0 ? /* @__PURE__ */ Z("span", {
					class: "sc-tplrow__price is-loading",
					"aria-hidden": "true"
				}) : /* @__PURE__ */ Z("span", {
					class: "sc-tplrow__price",
					children: e.money(i)
				}))
			]
		}) }, n.key || "__blank");
	};
	return /* @__PURE__ */ Z("div", {
		class: "sc-tplstep",
		children: [
			i.labels.description && /* @__PURE__ */ Z("p", {
				class: "sc-muted sc-small",
				children: i.labels.description
			}),
			d.length > 0 && /* @__PURE__ */ Z("div", {
				class: "sc-chips sc-chips--scroll",
				role: "tablist",
				"aria-label": t("templates.categories"),
				children: [{
					value: "",
					name: i.labels.all || t("templates.all")
				}, ...d].map((e) => /* @__PURE__ */ Z("button", {
					type: "button",
					role: "tab",
					"aria-selected": a === e.value,
					class: `sc-chip${a === e.value ? " is-on" : ""}`,
					onClick: () => o(e.value),
					children: e.name
				}, e.value))
			}),
			s && /* @__PURE__ */ Z("div", {
				class: "sc-confirm",
				role: "alertdialog",
				"aria-labelledby": "sc-tpl-confirm-title",
				"aria-describedby": "sc-tpl-confirm-text",
				children: [
					/* @__PURE__ */ Z("p", {
						id: "sc-tpl-confirm-title",
						class: "sc-confirm__title",
						children: t("templates.confirmTitle")
					}),
					/* @__PURE__ */ Z("p", {
						id: "sc-tpl-confirm-text",
						class: "sc-muted sc-small",
						children: t("templates.confirmText")
					}),
					/* @__PURE__ */ Z("div", {
						class: "sc-confirm__actions",
						children: [/* @__PURE__ */ Z("button", {
							type: "button",
							class: "sc-btn sc-btn--ghost",
							onClick: () => c(null),
							children: t("templates.cancel")
						}), /* @__PURE__ */ Z("button", {
							type: "button",
							class: "sc-btn sc-btn--cta",
							autoFocus: !0,
							onClick: () => p(s),
							children: t("templates.confirmOk")
						})]
					})
				]
			}),
			i.error.value && /* @__PURE__ */ Z("p", {
				class: "sc-error",
				role: "alert",
				children: i.error.value
			}),
			/* @__PURE__ */ Z("ul", {
				class: "sc-tpllist",
				"aria-busy": u !== null,
				children: [g({
					key: "",
					on: !l,
					name: t("templates.blank"),
					meta: t("templates.blankHint"),
					media: /* @__PURE__ */ Z(Q, {
						name: "plus",
						size: 22
					}),
					blank: !0,
					onClick: () => m("blank")
				}), f.map((e) => g({
					key: e.id,
					on: e.id === l,
					busy: u === e.id,
					name: e.name,
					meta: e.size,
					media: e.image ? /* @__PURE__ */ Z("img", {
						src: e.image,
						alt: "",
						loading: "lazy"
					}) : /* @__PURE__ */ Z(Q, {
						name: "templates",
						size: 22
					}),
					onClick: () => m(e)
				}))]
			})
		]
	});
}
//#endregion
//#region src/ui/steps/Steps.tsx
function dp(e, t, n) {
	let r = e.config, i = e.store.ui.value.displayUnit;
	return Gn(Un(t, r.unit, i), Un(n, r.unit, i), i, r.decimals, e.locale);
}
var fp = (e, t) => e.config.hidePricing || !t ? void 0 : `+${e.money(t)}`;
function pp(e, t) {
	return e.t(`section.${t}`);
}
function mp(e, t, n) {
	let r = e.config, i = (e, t) => e.find((e) => e.id === t)?.label ?? "";
	switch (t) {
		case "material": return i(r.materials, n.materialId);
		case "component": return r.components.find((e) => e.id === n.componentId)?.options.find((e) => e.id === n.componentOptionId)?.label ?? "";
		case "size": {
			let t = Cr(r, n);
			return dp(e, t.width, t.height);
		}
		case "shape": return i(er(r, n), n.shapeId);
		case "fixing": return i(nr(r, n), n.fixingId);
		case "border": return i(tr(r, n), n.borderId);
		case "color": return n.customColor ? n.customColor.toUpperCase() : i(r.colors, n.colorId);
		case "lighting": return i(cr(r, n), n.lightingId);
		case "text": {
			let t = n.objects.filter((e) => e.type === "text").length;
			return t ? e.t("recap.texts", { n: t }) : "";
		}
		case "qrcode": return n.objects.some((e) => e.type === "qr") ? "1" : "";
		case "image": {
			let e = n.objects.filter((e) => e.type === "image").length;
			return e ? String(e) : "";
		}
		case "options": return r.inputs.map((e) => {
			let t = n.inputs[e.id];
			return e.kind === "yes-no" ? t === !0 ? e.label : "" : e.kind === "dropdown" || e.kind === "cards" ? e.options.find((e) => e.value === t)?.label ?? "" : "";
		}).filter(Boolean).join(", ");
		case "addons": return lr(r, n).map((e) => e.options.find((t) => t.id === n.addons[e.id])?.label).filter(Boolean).join(", ");
		case "templates": return n.template ? e.templates?.list.find((e) => e.id === n.template.id)?.name ?? "" : e.t("templates.blankShort");
	}
}
function hp(e, t, n) {
	if ((t === "component" || t === "text") && (e.components.find((e) => e.id === n.componentId)?.options.find((e) => e.id === n.componentOptionId)?.textZones ?? []).some((e) => {
		let t = n.objects.find((t) => t.zoneId === e.id)?.text.trim().length ?? 0;
		return e.required && !t || e.minChars !== null && t < e.minChars || e.maxChars !== null && t > e.maxChars;
	})) return "todo";
}
function gp({ kind: e }) {
	return /* @__PURE__ */ Z("svg", {
		viewBox: "-2 -2 52 40",
		width: "52",
		height: "40",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", {
			d: id(td(e), 48, 36),
			fill: "currentColor",
			"fill-opacity": ".12",
			stroke: "currentColor",
			"stroke-width": "1.5"
		})
	});
}
function _p() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value, a = rr(t, i).find((e) => e.id === i.shapeId);
	return /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z(jf, {
		exampleLabel: e.t("info.example"),
		label: r("section.shape"),
		columns: 3,
		value: i.shapeId,
		onChange: (r) => {
			let o = er(t, i).find((e) => e.id === r), s = e.scene.current?.measure();
			a?.kind === "cut-to-shape" && o && o.kind !== "cut-to-shape" && s ? n.actions.patch({
				shapeId: r,
				objects: Sr(t, i.objects, s.objects, Cr(t, i), o.kind)
			}) : n.actions.patch({ shapeId: r });
		},
		items: rr(t, i).map((t) => ({
			id: t.id,
			label: t.label,
			image: t.image,
			popupImage: t.popupImage,
			visual: /* @__PURE__ */ Z(gp, { kind: t.kind }),
			price: fp(e, t.priceBySurface ? 0 : t.price)
		}))
	}), a?.kind === "cut-to-shape" && /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: r("shape.outline")
		}), /* @__PURE__ */ Z(Nf, {
			label: r("shape.outline"),
			value: i.outline,
			onChange: (e) => n.actions.patch({ outline: e }),
			options: [
				"small",
				"medium",
				"large"
			].map((e) => ({
				value: e,
				label: r(`shape.outline.${e}`)
			}))
		})]
	})] });
}
function vp(e) {
	let t = e.config.orientation, n = e.locale.toLowerCase().startsWith("en"), r = (t, r, i) => t && (n || t.toLowerCase() !== r) ? t : e.t(i);
	return {
		label: r(t?.label, "orientation", "size.orientation"),
		portrait: r(t?.portrait, "portrait", "size.portrait"),
		landscape: r(t?.landscape, "landscape", "size.landscape")
	};
}
function yp() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value, a = n.ui.value.displayUnit;
	return /* @__PURE__ */ Z(jf, {
		exampleLabel: e.t("info.example"),
		label: r("section.size"),
		columns: 2,
		value: i.customSize ? null : i.sizeId,
		onChange: (e) => n.actions.patch({
			sizeId: e,
			customSize: null
		}),
		items: $n(t, i).map((n) => {
			let r = wr(t, i, n), o = r.width === n.width && r.height === n.height;
			return {
				id: n.id,
				label: n.label,
				description: a === t.unit && o && n.label.includes(String(n.width)) ? void 0 : dp(e, r.width, r.height)
			};
		})
	});
}
function bp() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value;
	return /* @__PURE__ */ Z(jf, {
		exampleLabel: e.t("info.example"),
		label: r("section.fixing"),
		columns: 2,
		value: i.fixingId,
		onChange: (e) => n.actions.patch({ fixingId: e }),
		items: or(t, i).map((t) => ({
			id: t.id,
			label: t.label,
			description: t.description,
			image: t.image,
			popupImage: t.popupImage,
			visual: /* @__PURE__ */ Z(Q, {
				name: "fixing",
				size: 28
			}),
			price: fp(e, t.price)
		}))
	});
}
function xp() {
	let e = z(), { config: t, store: n } = e, r = n.design.value, i = or(t, r);
	if (!i.length || e.sections.value.includes("fixing")) return null;
	let a = i.find((e) => e.id === r.fixingId);
	return /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: [pp(e, "fixing"), i.length === 1 && a && ` : ${a.label}`]
		}), i.length > 1 && /* @__PURE__ */ Z(bp, {})]
	});
}
function Sp() {
	let e = z(), { config: t, store: n } = e, r = n.design.value, i = $n(t, r);
	if (!i.length) return null;
	let a = Cr(t, r);
	return /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: [pp(e, "size"), i.length === 1 && ` : ${dp(e, a.width, a.height)}`]
		}), i.length > 1 && /* @__PURE__ */ Z(yp, {})]
	});
}
function Cp() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value, a = $n(t, i), o = i.customSize, s = t.unit, c = n.ui.value.displayUnit, l = (e) => Un(e, s, c), u = (e) => Un(e, c, s), d = vp(e), f = t.unitSwitcher, p = f?.label && (e.locale.toLowerCase().startsWith("en") || !/^change the unit of measurement$/i.test(f.label.trim())) ? f.label : r("size.unit");
	return /* @__PURE__ */ Z(j, { children: [
		f && /* @__PURE__ */ Z("div", {
			class: "sc-block sc-unitswitch",
			children: [/* @__PURE__ */ Z("h4", {
				class: "sc-subtitle",
				children: p
			}), /* @__PURE__ */ Z(Nf, {
				label: p,
				value: c,
				onChange: (e) => n.actions.ui({ displayUnit: e }),
				options: f.units.map((e) => ({
					value: e,
					label: e.toUpperCase()
				}))
			})]
		}),
		t.orientation && !o && /* @__PURE__ */ Z("div", {
			class: "sc-block",
			children: [/* @__PURE__ */ Z("h4", {
				class: "sc-subtitle",
				id: "sc-orient-title",
				children: d.label
			}), /* @__PURE__ */ Z("div", {
				class: "sc-orient",
				role: "radiogroup",
				"aria-labelledby": "sc-orient-title",
				children: ["portrait", "landscape"].map((r) => {
					let a = (i.orientation ?? t.orientation.default) === r, o = Cr(t, {
						...i,
						orientation: r
					}), s = o.width === o.height ? r === "landscape" : o.width > o.height;
					return /* @__PURE__ */ Z("button", {
						type: "button",
						role: "radio",
						"aria-checked": a,
						class: `sc-orient__card${a ? " is-on" : ""}`,
						onClick: () => n.actions.patch({ orientation: r }),
						children: [/* @__PURE__ */ Z("svg", {
							viewBox: "0 0 48 48",
							width: "40",
							height: "40",
							"aria-hidden": "true",
							class: "sc-orient__art",
							children: /* @__PURE__ */ Z("rect", {
								x: s ? 5 : 13,
								y: s ? 13 : 5,
								width: s ? 38 : 22,
								height: s ? 22 : 38,
								rx: "3",
								fill: "currentColor",
								"fill-opacity": ".14",
								stroke: "currentColor",
								"stroke-width": "2"
							})
						}), /* @__PURE__ */ Z("span", {
							class: "sc-orient__text",
							children: [/* @__PURE__ */ Z("span", {
								class: "sc-orient__label",
								children: r === "portrait" ? d.portrait : d.landscape
							}), /* @__PURE__ */ Z("span", {
								class: "sc-orient__dims",
								children: dp(e, o.width, o.height)
							})]
						})]
					}, r);
				})
			})]
		}),
		a.length > 0 && /* @__PURE__ */ Z(yp, {}),
		t.customSize && /* @__PURE__ */ Z("div", {
			class: `sc-custom-size${o ? " is-on" : ""}`,
			children: [/* @__PURE__ */ Z("label", {
				class: "sc-switch",
				children: [/* @__PURE__ */ Z("input", {
					type: "checkbox",
					checked: !!o,
					onChange: (e) => {
						let r = e.target.checked, a = Cr(t, i);
						n.actions.patch(r ? {
							customSize: { ...a },
							sizeId: null
						} : { customSize: null });
					}
				}), /* @__PURE__ */ Z("span", { children: r("size.custom") })]
			}), o && /* @__PURE__ */ Z("div", {
				class: "sc-grid-2",
				children: ["width", "height"].map((i) => {
					let a = t.customSize[i];
					return /* @__PURE__ */ Z(Ff, {
						label: r(`size.${i}`),
						hint: r("size.range", {
							min: Wn(l(a.min), c, !0, e.locale),
							max: Wn(l(a.max), c, !0, e.locale),
							unit: c
						}),
						children: ({ id: e, describedBy: t }) => /* @__PURE__ */ Z(If, {
							id: e,
							describedBy: t,
							value: Number(l(o[i]).toFixed(3)),
							unit: c,
							min: l(a.min),
							max: l(a.max),
							onCommit: (e) => n.actions.patch({ customSize: {
								...o,
								[i]: Math.min(a.max, Math.max(a.min, u(e)))
							} })
						})
					}, i);
				})
			})]
		}),
		t.thickness.length > 0 && /* @__PURE__ */ Z("div", {
			class: "sc-block",
			children: [/* @__PURE__ */ Z("h4", {
				class: "sc-subtitle",
				children: r("size.thickness")
			}), /* @__PURE__ */ Z(Nf, {
				label: r("size.thickness"),
				value: i.thicknessId ?? "",
				onChange: (e) => n.actions.patch({ thicknessId: e }),
				options: t.thickness.map((e) => ({
					value: e.id,
					label: e.label
				}))
			})]
		})
	] });
}
function wp() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value;
	return /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z(Mf, {
		label: r("section.color"),
		value: i.customColor ? null : i.colorId,
		onChange: (e) => n.actions.selectColor(e),
		items: sr(t, i).map((t) => ({
			id: t.id,
			label: t.label,
			hex: t.hex,
			image: t.image ?? t.patternUrl ?? void 0,
			inner: !t.image && !t.patternUrl ? t.textColor?.hex ?? void 0 : void 0,
			price: fp(e, t.price)
		}))
	}), t.customBackground && /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: /* @__PURE__ */ Z(Lf, {
			label: t.customBackground.label && !/^custom colou?rs?$/i.test(t.customBackground.label.trim()) ? t.customBackground.label : r("color.custom"),
			value: i.customColor,
			active: !!i.customColor,
			image: t.customBackground.image,
			onChange: (e) => n.actions.patch({ customColor: e })
		})
	})] });
}
function Tp() {
	return /* @__PURE__ */ Z(Ep, {});
}
function Ep({ inDesign: e = !1 }) {
	let t = z(), { config: n, store: r, t: i } = t, a = r.design.value, o = ar(n, a), s = o.find((e) => e.id === a.borderId), c = !!s && s.kind !== "none";
	if (e && (t.sections.value.includes("border") || !o.some((e) => e.kind !== "none"))) return null;
	let l = n.colors.find((e) => e.id === a.colorId), u = !a.customColor && l?.textColor?.sameForBorder ? l.textColor.hex.trim().toLowerCase() : null, d = a.borderColorId ?? (u ? n.borderSettings.colors.find((e) => e.hex.trim().toLowerCase() === u)?.id ?? null : null), f = n.borderSettings.allowColor && n.borderSettings.colors.length > 0 && c && /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: i("border.color")
		}), /* @__PURE__ */ Z(Mf, {
			label: i("border.color"),
			value: d,
			onChange: (e) => r.actions.patch({ borderColorId: e }),
			items: n.borderSettings.colors.map((e) => ({
				id: e.id,
				label: e.label,
				hex: e.hex,
				price: fp(t, e.price)
			}))
		})]
	});
	if (e && o.length === 1) return /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Z("h4", {
			class: "sc-subtitle",
			children: [
				pp(t, "border"),
				" : ",
				s?.label
			]
		}), f]
	});
	let p = /* @__PURE__ */ Z(jf, {
		exampleLabel: t.t("info.example"),
		label: i("section.border"),
		columns: 2,
		value: a.borderId,
		onChange: (e) => r.actions.selectBorder(e),
		items: o.map((e) => ({
			id: e.id,
			label: e.label,
			description: e.description,
			image: e.image,
			popupImage: e.popupImage,
			price: fp(t, e.price)
		}))
	});
	return e ? /* @__PURE__ */ Z("div", {
		class: "sc-block",
		children: [
			/* @__PURE__ */ Z("h4", {
				class: "sc-subtitle",
				children: pp(t, "border")
			}),
			p,
			f
		]
	}) : /* @__PURE__ */ Z(j, { children: [p, f] });
}
function Dp() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value, a = Qn(t, i), o = a.find((e) => e.id === i.componentId) ?? a[0];
	return /* @__PURE__ */ Z(j, { children: [
		a.length > 1 && /* @__PURE__ */ Z(Nf, {
			label: r("section.component"),
			value: o?.id ?? "",
			onChange: (e) => n.actions.patch({
				componentId: e,
				componentOptionId: null
			}),
			options: a.map((e) => ({
				value: e.id,
				label: e.label
			}))
		}),
		o && /* @__PURE__ */ Z(jf, {
			exampleLabel: e.t("info.example"),
			label: o.label,
			columns: 2,
			value: i.componentOptionId,
			onChange: (e) => n.actions.patch({ componentOptionId: e }),
			items: o.options.map((t) => ({
				id: t.id,
				label: t.label,
				description: t.description,
				image: t.image,
				popupImage: t.popupImage,
				price: fp(e, t.price)
			}))
		}),
		/* @__PURE__ */ Z(Sp, {}),
		/* @__PURE__ */ Z(xp, {}),
		/* @__PURE__ */ Z(Ep, { inDesign: !0 }),
		/* @__PURE__ */ Z(Op, {})
	] });
}
function Op() {
	let { config: e, store: t, t: n } = z(), r = t.design.value, i = e.components.find((e) => e.id === r.componentId)?.options.find((e) => e.id === r.componentOptionId);
	return i?.textZones.length ? /* @__PURE__ */ Z("div", {
		class: "sc-block sc-zones",
		children: i.textZones.map((i) => {
			let a = r.objects.find((e) => e.zoneId === i.id);
			if (!a) return null;
			let o = a.text.length, s = i.maxChars !== null && o > i.maxChars ? n("text.tooLong", { max: i.maxChars }) : i.minChars !== null && o < i.minChars ? n("text.tooShort", { min: i.minChars }) : null;
			return /* @__PURE__ */ Z("div", {
				class: "sc-zone",
				children: [
					/* @__PURE__ */ Z(Ff, {
						label: i.label,
						error: s,
						counter: i.maxChars ? n("text.chars", {
							n: o,
							max: i.maxChars
						}) : void 0,
						children: ({ id: e, describedBy: n }) => /* @__PURE__ */ Z("input", {
							id: e,
							class: "sc-input",
							value: a.text,
							readOnly: !i.can.edit,
							"aria-describedby": n,
							"aria-invalid": !!s,
							onInput: (e) => t.actions.updateObject(a.id, { text: e.target.value })
						})
					}),
					i.can.font && e.fonts.length > 1 && /* @__PURE__ */ Z(Ff, {
						label: n("text.font"),
						children: ({ id: e }) => /* @__PURE__ */ Z($f, {
							id: e,
							value: a.fontId,
							onChange: (e) => t.actions.updateObject(a.id, { fontId: e })
						})
					}),
					i.can.color && (e.text.colors.length > 0 || e.text.allowCustomColor) && /* @__PURE__ */ Z(Bf, {
						label: n("text.color"),
						value: a.color,
						palette: e.text.colors,
						custom: e.text.allowCustomColor,
						image: e.text.customColorImage,
						onChange: (e) => t.actions.updateObject(a.id, { color: e })
					})
				]
			}, i.id);
		})
	}) : null;
}
function kp({ type: e }) {
	let t = z(), { config: n, store: r, t: i } = t, a = r.design.value, o = r.ui.value, { width: s, height: c } = Cr(n, a), l = a.objects.filter((t) => t.type === e && t.face === o.face), u = a.objects.find((t) => t.id === o.selectedObjectId && t.type === e), d = gr(n, a), f = () => r.actions.addObject({
		id: Er("text"),
		type: "text",
		face: o.face,
		text: i("text.placeholder"),
		fontId: n.fonts.find((e) => e.isDefault)?.id ?? n.fonts[0]?.id ?? "",
		size: fr(n, {
			width: s,
			height: c
		}, n.text.fontSize.default),
		color: d,
		bold: !1,
		italic: !1,
		underline: !1,
		strike: !1,
		align: "center",
		curve: 0,
		x: 0,
		y: l.length * c * .18 - c * .1,
		rotation: 0
	}), p = () => r.actions.addObject({
		id: Er("qr"),
		type: "qr",
		face: o.face,
		value: "https://",
		color: "#111111",
		size: Math.min(s, c) * .4,
		x: s * .25,
		y: 0,
		rotation: 0
	}), m = (e, t, n) => {
		let i = new Image();
		i.crossOrigin = "anonymous";
		let a = (i) => {
			let a = Math.min(s, c) * .45;
			r.actions.addObject({
				id: Er("image"),
				type: "image",
				face: o.face,
				src: e,
				...n ? { name: n } : {},
				...t ? { price: t } : {},
				tint: null,
				width: a,
				height: a * i,
				x: 0,
				y: 0,
				rotation: 0
			});
		};
		i.onload = () => a(i.naturalWidth ? i.naturalHeight / i.naturalWidth : 1), i.onerror = () => a(1), i.src = e;
	};
	return /* @__PURE__ */ Z(j, { children: [u ? /* @__PURE__ */ Z(Vf, { object: u }) : t.optionEditor ? /* @__PURE__ */ Z("p", {
		class: "sc-muted sc-small",
		children: i("editor.zonesHint")
	}) : /* @__PURE__ */ Z(j, { children: [
		e === "text" && /* @__PURE__ */ Z("button", {
			type: "button",
			class: "sc-btn sc-btn--secondary sc-btn--block",
			onClick: f,
			children: [
				/* @__PURE__ */ Z(Q, {
					name: "plus",
					size: 18
				}),
				" ",
				i("action.addText")
			]
		}),
		e === "qr" && !l.length && /* @__PURE__ */ Z("button", {
			type: "button",
			class: "sc-btn sc-btn--secondary sc-btn--block",
			onClick: p,
			children: [
				/* @__PURE__ */ Z(Q, {
					name: "qrcode",
					size: 18
				}),
				" ",
				i("action.addQr")
			]
		}),
		e === "image" && /* @__PURE__ */ Z(op, {
			onFile: (e) => {
				let t = new FileReader();
				t.onload = () => m(String(t.result), void 0, e.name), t.readAsDataURL(e);
			},
			onClipart: (e, t, n) => m(e, t, n)
		}),
		!l.length && e === "text" && /* @__PURE__ */ Z("p", {
			class: "sc-empty",
			children: i("text.empty")
		})
	] }), /* @__PURE__ */ Z(tp, { type: e })] });
}
function Ap() {
	let e = z(), { config: t, store: n, t: r } = e, i = n.design.value;
	return /* @__PURE__ */ Z("div", {
		class: "sc-stack",
		children: lr(t, i).map((t) => /* @__PURE__ */ Z("div", {
			class: "sc-block",
			children: [
				/* @__PURE__ */ Z("h4", {
					class: "sc-subtitle",
					children: t.label
				}),
				t.description && /* @__PURE__ */ Z("p", {
					class: "sc-muted sc-small",
					children: t.description
				}),
				/* @__PURE__ */ Z(jf, {
					exampleLabel: e.t("info.example"),
					label: t.label,
					value: i.addons[t.id] ?? "__none",
					onChange: (e) => n.actions.setAddon(t.id, e === "__none" ? null : e),
					items: [{
						id: "__none",
						label: r("recap.none")
					}, ...t.options.map((t) => ({
						id: t.id,
						label: t.label,
						description: t.description,
						image: t.image,
						popupImage: t.popupImage,
						price: fp(e, t.priceBySurface ? 0 : t.price)
					}))]
				})
			]
		}, t.id))
	});
}
var jp = {
	text: "text",
	image: "image",
	qr: "qrcode"
};
function Mp(e, t) {
	let n = jp[t.type];
	return e.includes(n) ? n : e.includes("component") ? "component" : null;
}
function Np(e, t) {
	let n = t ? e.store.design.value.objects.find((e) => e.id === t) : void 0, r = n ? Mp(e.sections.value, n) : null;
	return {
		selectedObjectId: t,
		...r ? { section: r } : {}
	};
}
function Pp({ section: e }) {
	let { store: t, sections: n } = z(), r = t.ui.value.selectedObjectId, i = r ? t.design.value.objects.find((e) => e.id === r) : void 0;
	return i && e !== jp[i.type] && Mp(n.value, i) === e ? /* @__PURE__ */ Z(Vf, { object: i }) : /* @__PURE__ */ Z(Fp, { section: e });
}
function Fp({ section: e }) {
	let t = z(), { config: n, store: r, t: i } = t, a = r.design.value;
	switch (e) {
		case "material": return /* @__PURE__ */ Z(jf, {
			exampleLabel: t.t("info.example"),
			label: i("section.material"),
			value: a.materialId,
			onChange: (e) => r.actions.patch({ materialId: e }),
			items: n.materials.map((e) => ({
				id: e.id,
				label: e.label,
				description: e.description,
				image: e.image,
				popupImage: e.popupImage,
				price: fp(t, e.pricingId ? 0 : e.price)
			}))
		});
		case "component": return /* @__PURE__ */ Z(Dp, {});
		case "size": return /* @__PURE__ */ Z(Cp, {});
		case "shape": return /* @__PURE__ */ Z(_p, {});
		case "fixing": return /* @__PURE__ */ Z(bp, {});
		case "border": return /* @__PURE__ */ Z(Tp, {});
		case "color": return /* @__PURE__ */ Z(wp, {});
		case "lighting": return /* @__PURE__ */ Z(Mf, {
			label: i("section.lighting"),
			value: a.lightingId,
			onChange: (e) => r.actions.patch({ lightingId: e }),
			items: cr(n, a).map((e) => ({
				id: e.id,
				label: e.label,
				hex: e.hex,
				price: fp(t, e.price)
			}))
		});
		case "text": return /* @__PURE__ */ Z(kp, { type: "text" });
		case "qrcode": return /* @__PURE__ */ Z(kp, { type: "qr" });
		case "image": return /* @__PURE__ */ Z(kp, { type: "image" });
		case "options": return /* @__PURE__ */ Z(ap, {});
		case "addons": return /* @__PURE__ */ Z(Ap, {});
		case "templates": return /* @__PURE__ */ Z(up, {});
	}
}
//#endregion
//#region src/ui/Layers.tsx
var Ip = {
	text: "text",
	image: "image",
	qr: "qrcode"
};
function Lp({ onClose: e }) {
	let t = z(), { store: n, t: r, config: i } = t, a = n.ui.value, o = n.design.value.objects.filter((e) => e.face === a.face), s = [...o].reverse(), [c, l] = N(null), [u, d] = N(null), f = (e) => o.length - 1 - e, p = (e) => e.type === "text" ? e.text.split("\n")[0] || "…" : e.type === "image" ? e.name || r("object.image") : e.value || r("object.qr"), m = (e) => {
		if (e.type === "text") {
			let t = i.fonts.find((t) => t.id === e.fontId);
			return t ? t.display ?? t.label : "";
		}
		return e.type === "qr" ? r("object.qr") : e.zoneId ? r("layers.zone") : "";
	};
	return /* @__PURE__ */ Z("div", {
		class: "sc-popover sc-layers",
		role: "dialog",
		"aria-label": r("layers.title"),
		onKeyDown: (t) => t.key === "Escape" && e(),
		children: [
			/* @__PURE__ */ Z("div", {
				class: "sc-layers__head",
				children: [/* @__PURE__ */ Z("h3", {
					class: "sc-subtitle",
					children: r("layers.title")
				}), /* @__PURE__ */ Z($, {
					icon: "close",
					label: r("action.close"),
					onClick: e
				})]
			}),
			/* @__PURE__ */ Z("p", {
				class: "sc-muted sc-small",
				children: r("layers.subtitle")
			}),
			s.length === 0 ? /* @__PURE__ */ Z("p", {
				class: "sc-empty",
				children: r("layers.empty")
			}) : /* @__PURE__ */ Z("ol", {
				class: "sc-layers__list",
				children: s.map((e, i) => /* @__PURE__ */ Z("li", {
					class: [
						"sc-layer",
						e.id === a.selectedObjectId && "is-active",
						e.hidden && "is-hidden",
						c === e.id && "is-dragging",
						u === i && c !== e.id && "is-over"
					].filter(Boolean).join(" "),
					draggable: !0,
					onDragStart: (t) => {
						l(e.id), t.dataTransfer?.setData("text/plain", e.id), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
					},
					onDragEnd: () => {
						l(null), d(null);
					},
					onDragOver: (e) => {
						e.preventDefault(), d(i);
					},
					onDrop: (e) => {
						e.preventDefault(), c && n.actions.arrangeObject(c, f(i)), l(null), d(null);
					},
					children: [
						/* @__PURE__ */ Z("span", {
							class: "sc-layer__grip",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Z(Q, {
								name: "grip",
								size: 16
							})
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							class: "sc-layer__main",
							"aria-pressed": e.id === a.selectedObjectId,
							disabled: e.hidden,
							onClick: () => n.actions.ui(Np(t, e.id)),
							children: [/* @__PURE__ */ Z("span", {
								class: "sc-layer__thumb",
								children: e.type === "image" ? /* @__PURE__ */ Z("img", {
									src: e.src,
									alt: ""
								}) : /* @__PURE__ */ Z(Q, {
									name: Ip[e.type],
									size: 16
								})
							}), /* @__PURE__ */ Z("span", {
								class: "sc-layer__text",
								children: [/* @__PURE__ */ Z("span", {
									class: "sc-layer__name",
									children: [/* @__PURE__ */ Z("span", {
										class: "sc-layer__label",
										children: p(e)
									}), i === 0 && /* @__PURE__ */ Z("span", {
										class: "sc-layer__badge",
										children: r("layers.top")
									})]
								}), m(e) && /* @__PURE__ */ Z("span", {
									class: "sc-muted sc-small",
									children: m(e)
								})]
							})]
						}),
						/* @__PURE__ */ Z("span", {
							class: "sc-layer__actions",
							children: [
								/* @__PURE__ */ Z($, {
									icon: "forward",
									label: r("action.forward"),
									disabled: i === 0,
									onClick: () => n.actions.arrangeObject(e.id, "forward")
								}),
								/* @__PURE__ */ Z($, {
									icon: "backward",
									label: r("action.backward"),
									disabled: i === s.length - 1,
									onClick: () => n.actions.arrangeObject(e.id, "backward")
								}),
								/* @__PURE__ */ Z($, {
									icon: e.hidden ? "eyeOff" : "eye",
									label: e.hidden ? r("layers.show") : r("layers.hide"),
									onClick: () => n.actions.setObjectHidden(e.id, !e.hidden)
								}),
								!e.zoneId && /* @__PURE__ */ Z($, {
									icon: "trash",
									class: "is-danger",
									label: r("action.delete"),
									onClick: () => n.actions.removeObject(e.id)
								})
							]
						})
					]
				}, e.id))
			}),
			s.length > 1 && /* @__PURE__ */ Z("p", {
				class: "sc-muted sc-small sc-layers__hint",
				children: r("layers.dragHint")
			})
		]
	});
}
function Rp({ value: e, onChange: t }) {
	let { config: n, store: r, t: i } = z(), a = r.ui.value.customSceneUrl, [o, s] = N([]), [c, l] = N(!1), u = async (e) => {
		let n = e.currentTarget, i = n.files?.[0];
		if (n.value = "", i) {
			l(!0);
			try {
				let e = await Rf(i);
				r.actions.ui({ customSceneUrl: e }), t(e);
			} catch {} finally {
				l(!1);
			}
		}
	}, d = n.images.scenes.filter((e) => !o.includes(e)), f = (n, r, i) => /* @__PURE__ */ Z("button", {
		type: "button",
		role: "radio",
		"aria-checked": e === n,
		"aria-label": r,
		title: r,
		class: "sc-scene-thumb",
		onClick: () => t(n),
		children: /* @__PURE__ */ Z("img", {
			src: n,
			alt: "",
			loading: "lazy",
			onError: i
		})
	}, n);
	return /* @__PURE__ */ Z("div", {
		class: "sc-scenes",
		children: [/* @__PURE__ */ Z("div", {
			class: "sc-scene-row",
			role: "radiogroup",
			"aria-label": i("scenes.title"),
			children: [
				/* @__PURE__ */ Z("button", {
					type: "button",
					role: "radio",
					"aria-checked": e === null,
					"aria-label": i("scenes.none"),
					title: i("scenes.none"),
					class: "sc-scene-thumb sc-scene-thumb--none",
					onClick: () => t(null),
					children: /* @__PURE__ */ Z(Q, {
						name: "close",
						size: 18
					})
				}),
				a && f(a, i("scenes.mine")),
				d.map((e, t) => f(e, i("scenes.item", { n: t + 1 }), () => s((t) => [...t, e])))
			]
		}), /* @__PURE__ */ Z("div", {
			class: "sc-scene-actions",
			children: /* @__PURE__ */ Z("label", {
				class: `sc-stage-btn${c ? " is-busy" : ""}`,
				children: [
					/* @__PURE__ */ Z(Q, {
						name: "upload",
						size: 16
					}),
					i("scenes.upload"),
					/* @__PURE__ */ Z("input", {
						type: "file",
						accept: "image/*",
						class: "sc-visually-hidden",
						onChange: u
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/ui/Stage.tsx
var zp = 48, Bp = 240, Vp = (e, t) => e.x < t.x + t.width && t.x < e.x + e.width && e.y < t.y + t.height && t.y < e.y + e.height;
function Hp(e, t, n, r, i, a) {
	let o = Math.max(128, Math.min(n + e.x + e.width / 2, i - 8 - Bp / 2)), s = t ? {
		x: n + t.x - 6,
		y: r + t.y - 6,
		width: t.width + 12,
		height: t.height + 12
	} : null, c = a - 80, l = [
		r + e.y + e.height + 14,
		r + e.y - 14 - zp,
		s ? s.y + s.height + 8 : -1,
		s ? s.y - 8 - zp : -1
	], u = l.find((e) => e >= 8 && e + zp <= c && !(s && Vp({
		x: o - Bp / 2,
		y: e,
		width: Bp,
		height: zp
	}, s))) ?? Math.max(8, Math.min(l[0], c - zp));
	return {
		left: `${o}px`,
		top: `${u}px`
	};
}
function Up({ toolbarExtra: e }) {
	let t = z(), { config: n, store: r, t: i } = t, a = He(null), o = He(null), [s, c] = N(null), [l, u] = N(!1), [d, f] = N(0);
	Ve(() => {
		let e = o.current;
		if (!e) return;
		let t = new ResizeObserver(() => f(e.clientWidth));
		return t.observe(e), () => t.disconnect();
	}, []);
	let p = d - (n.doubleSided ? r.design.value.doubleSided ? 210 : 60 : 0), m = d > 0 && p < 720, h = d > 0 && p < 480, g = r.design.value.orientation === "landscape", _ = () => r.actions.patch({ orientation: g ? "portrait" : "landscape" }), v = Cr(n, r.design.value), y = v.width === v.height ? g : v.width > v.height, b = h ? " is-mini is-tiny is-compact" : m ? " is-tiny is-compact" : d && p < 1e3 ? " is-compact" : "", x = async () => {
		let e = await t.scene.current?.snapshotWithWatermark(n.output.watermark);
		if (!e) return;
		let r = document.createElement("a");
		r.href = e, r.download = `${n.name || "enseigne"}.png`, r.click();
	}, S = Nt(0), [C, w] = N(null), ee = (e) => w((t) => t === e ? null : e), T = He(null), te = He(null);
	Ve(() => {
		if (!C) return;
		let e = o.current?.getRootNode(), t = (e) => {
			let t = e.composedPath();
			T.current && !t.includes(T.current) && !(te.current && t.includes(te.current)) && w(null);
		}, n = (e) => {
			e.key === "Escape" && w(null);
		};
		return e?.addEventListener("pointerdown", t), e?.addEventListener("keydown", n), () => {
			e?.removeEventListener("pointerdown", t), e?.removeEventListener("keydown", n);
		};
	}, [C]), Ve(() => {
		let e = !0;
		for (let t of n.fonts) t.url && new FontFace(`sc-font-${t.id}`, `url("${t.url}")`).load().then((t) => {
			document.fonts.add(t), e && S.value++;
		}, () => void 0);
		return () => {
			e = !1;
		};
	}, [n]), Ve(() => {
		if (!a.current) return;
		let e = new Cf(a.current, {
			onSelect: (e) => r.actions.ui(Np(t, e)),
			onChange: (e, t) => r.actions.updateObject(e, t),
			onGesture: (t) => {
				u(t), t || queueMicrotask(() => c(e.selectionBox()));
			}
		});
		t.scene.current = e;
		let o = getComputedStyle(a.current), s = r.ui.peek().face, l = !1, d = null, f = (n, r) => {
			let i = a.current, o = matchMedia("(prefers-reduced-motion: reduce)").matches;
			if (l) {
				d = n;
				return;
			}
			if (r === s || !i || o || t.capturing.current || typeof i.animate != "function") {
				s = r, e.update(n);
				return;
			}
			l = !0, d = n;
			let c = r === "back" ? 1 : -1;
			i.animate([{ transform: "perspective(1600px) rotateY(0deg)" }, { transform: `perspective(1600px) rotateY(${90 * c}deg)` }], {
				duration: 200,
				easing: "ease-in"
			}).finished.then(() => (s = r, l = !1, e.update(d ?? n), d = null, i.animate([{ transform: `perspective(1600px) rotateY(${-90 * c}deg)` }, { transform: "perspective(1600px) rotateY(0deg)" }], {
				duration: 240,
				easing: "ease-out"
			}).finished)).catch(() => {
				l = !1, d && e.update(d);
			});
		}, p = wt(() => {
			let a = r.design.value, s = r.ui.value, l = Cr(n, a), u = n.colors.find((e) => e.id === a.colorId), d = er(n, a).find((e) => e.id === a.shapeId), p = tr(n, a).find((e) => e.id === a.borderId), m = n.borderSettings.colors.find((e) => e.id === a.borderColorId)?.hex ?? (u?.textColor?.sameForBorder ? u.textColor.hex : "#111111"), h = cr(n, a).find((e) => e.id === a.lightingId), g = nr(n, a).find((e) => e.id === a.fixingId), _ = n.thickness.find((e) => e.id === a.thicknessId), v = Zn(n, a);
			S.value, f({
				width: l.width,
				height: l.height,
				unit: n.unit,
				displayUnit: s.displayUnit,
				decimals: n.decimals,
				locale: t.locale,
				shape: d?.kind ?? "rectangle",
				shapeSvgUrl: d?.svgUrl ?? null,
				fill: a.customColor ?? u?.hex ?? "#ffffff",
				patternUrl: a.customColor ? null : u?.patternUrl ?? null,
				border: p ? {
					kind: p.kind,
					color: m,
					svgUrl: p.svgUrl ?? null
				} : null,
				fixing: g ? {
					kind: g.kind,
					customUrl: g.svgUrl ?? "",
					count: g.count
				} : null,
				light: h && n.lightingEnabled && s.lightOn ? h.hex : null,
				outline: d?.outlineSizes?.[a.outline] ?? 20,
				cutline: n.images.cutline,
				textType: n.text.type,
				fontFaces: n.fonts.filter((e) => e.url).map((e) => ({
					family: `sc-font-${e.id}`,
					url: e.url
				})),
				thicknessLabel: _ ? `${i("size.thickness")}: ${Kn(_, n.unit, s.displayUnit, t.locale)}` : null,
				objects: a.objects.filter((e) => e.face === s.face && !e.hidden),
				fontFamily: (e) => {
					let t = n.fonts.find((t) => t.id === e);
					return t?.url ? `sc-font-${t.id}, ${t.label}, sans-serif` : `${t?.label ?? "Arial"}, sans-serif`;
				},
				selectedId: s.selectedObjectId,
				canTransform: (e) => {
					let t = e.zoneId ? v?.textZones.find((t) => t.id === e.zoneId) : void 0, n = e.zoneId ? v?.imageZones.find((t) => t.id === e.zoneId) : void 0, r = t?.can ?? n?.can;
					return {
						moveX: r?.moveX ?? !0,
						moveY: r?.moveY ?? !0,
						resize: r?.resize ?? !0,
						rotate: r?.rotate ?? !0
					};
				},
				measurements: n.measurements,
				zoom: s.zoom,
				view: s.stageView,
				reference: s.reference,
				assets: {
					fixings: [t.assets.urls.fixing_methods_url, t.assets.urls.fixing_methods_alt_url],
					borders: t.assets.urls.borders_url,
					resolve: t.assets.resolve
				},
				colors: {
					primary: o.getPropertyValue("--sc-primary").trim() || "#0f6a6a",
					dim: o.getPropertyValue("--sc-text-muted").trim() || "#5b6470"
				}
			}, s.face), queueMicrotask(() => c(e.selectionBox()));
		});
		return () => {
			p(), e.destroy(), t.scene.current = null;
		};
	}, []);
	let E = (e) => {
		let t = r.ui.value.selectedObjectId, n = r.design.value.objects.find((e) => e.id === t), i = e.ctrlKey || e.metaKey;
		if (i && e.key.toLowerCase() === "z") {
			e.preventDefault(), e.shiftKey ? r.actions.redo() : r.actions.undo();
			return;
		}
		if (!n) return;
		let a = e.shiftKey ? 10 : 1, o = {
			ArrowLeft: [-a, 0],
			ArrowRight: [a, 0],
			ArrowUp: [0, -a],
			ArrowDown: [0, a]
		};
		if (o[e.key]) {
			e.preventDefault();
			let [t, i] = o[e.key];
			r.actions.updateObject(n.id, {
				x: n.x + t,
				y: n.y + i
			});
		} else (e.key === "Delete" || e.key === "Backspace") && !n.zoneId ? (e.preventDefault(), r.actions.removeObject(n.id)) : i && e.key.toLowerCase() === "d" ? (e.preventDefault(), r.actions.duplicateObject(n.id)) : e.key === "Escape" && r.actions.ui({ selectedObjectId: null });
	}, D = r.ui.value, O = r.design.value, ne = Cr(n, O), re = O.objects.find((e) => e.id === D.selectedObjectId), k = o.current?.getBoundingClientRect(), A = a.current?.getBoundingClientRect(), ie = t.sections.value.includes("lighting"), ae = O.objects.filter((e) => e.face === D.face), oe = re ? ae.indexOf(re) : -1, se = n.doubleSided?.front || i("stage.front"), ce = n.doubleSided?.back || i("stage.back"), M = n.doubleSided ? np(t, n.doubleSided.pricing) : null, le = D.face === "front" ? "back" : "front";
	return /* @__PURE__ */ Z("div", {
		class: `sc-stage${D.sceneUrl ? " has-scene" : ""}${b}`,
		part: "stage",
		ref: o,
		style: D.sceneUrl ? { backgroundImage: `url("${D.sceneUrl.replace(/"/g, "%22")}")` } : void 0,
		children: [
			/* @__PURE__ */ Z("div", {
				class: "sc-stage__canvas",
				ref: a,
				tabIndex: 0,
				role: "img",
				"aria-label": i("stage.label", { dims: Gn(Un(ne.width, n.unit, D.displayUnit), Un(ne.height, n.unit, D.displayUnit), D.displayUnit, n.decimals, t.locale) }),
				onKeyDown: E
			}),
			D.stageView === "design" && n.doubleSided && O.doubleSided && /* @__PURE__ */ Z("div", {
				class: "sc-facetag",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ Z(Q, {
						name: "doubleSided",
						size: 18,
						class: "sc-facetag__icon"
					}),
					/* @__PURE__ */ Z("span", {
						class: "sc-facetag__text",
						children: i("doubleSided.editing", { face: D.face === "front" ? se : ce })
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						class: "sc-facetag__flip",
						title: i("doubleSided.switchTo", { face: le === "front" ? se : ce }),
						"aria-label": i("doubleSided.switchTo", { face: le === "front" ? se : ce }),
						onClick: () => r.actions.ui({
							face: le,
							selectedObjectId: null
						}),
						children: /* @__PURE__ */ Z(Q, {
							name: "flip",
							size: 16
						})
					})
				]
			}),
			D.stageView === "real-size" && /* @__PURE__ */ Z("div", {
				class: "sc-refbar",
				role: "radiogroup",
				"aria-label": i("ref.label"),
				children: [/* @__PURE__ */ Z("span", {
					class: "sc-refbar__label",
					"aria-hidden": "true",
					children: i("ref.label")
				}), Lu.map((e) => /* @__PURE__ */ Z("button", {
					type: "button",
					role: "radio",
					"aria-checked": D.reference === e,
					class: "sc-refbar__item",
					onClick: () => r.actions.ui({ reference: e }),
					children: i(`ref.${e}`)
				}, e))]
			}),
			D.stageView === "design" && re && s && k && A && !l && /* @__PURE__ */ Z("div", {
				class: "sc-minibar",
				style: Hp(s, t.scene.current?.rotateHandleBox() ?? null, A.left - k.left, A.top - k.top, k.width, k.height),
				children: [
					ae.length > 1 && /* @__PURE__ */ Z(j, { children: [
						/* @__PURE__ */ Z($, {
							icon: "forward",
							label: i("action.forward"),
							disabled: oe === ae.length - 1,
							onClick: () => r.actions.arrangeObject(re.id, "forward")
						}),
						/* @__PURE__ */ Z($, {
							icon: "backward",
							label: i("action.backward"),
							disabled: oe === 0,
							onClick: () => r.actions.arrangeObject(re.id, "backward")
						}),
						/* @__PURE__ */ Z("span", { class: "sc-minibar__sep" })
					] }),
					!t.optionEditor && /* @__PURE__ */ Z($, {
						icon: "copy",
						label: i("action.clone"),
						onClick: () => r.actions.duplicateObject(re.id)
					}),
					!re.zoneId && /* @__PURE__ */ Z($, {
						icon: "trash",
						class: "is-danger",
						label: i("action.delete"),
						onClick: () => r.actions.removeObject(re.id)
					}),
					/* @__PURE__ */ Z($, {
						icon: "close",
						label: i("action.close"),
						onClick: () => r.actions.ui({ selectedObjectId: null })
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				class: "sc-stage__toolbar",
				part: "stage-toolbar",
				role: "toolbar",
				"aria-label": i("title"),
				ref: te,
				children: [
					/* @__PURE__ */ Z(Nf, {
						size: "sm",
						withText: !0,
						label: i("view.label"),
						value: D.stageView,
						onChange: (e) => r.actions.ui({
							stageView: e,
							selectedObjectId: null,
							zoom: 1
						}),
						options: [{
							value: "design",
							label: i("view.design"),
							icon: "edit"
						}, {
							value: "real-size",
							label: i("view.real"),
							icon: "ruler"
						}]
					}),
					/* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" }),
					n.doubleSided && /* @__PURE__ */ Z(j, { children: [O.doubleSided ? /* @__PURE__ */ Z(j, { children: [
						/* @__PURE__ */ Z("div", {
							class: "sc-faceseg",
							role: "radiogroup",
							"aria-label": i("doubleSided.faceTitle"),
							children: ["front", "back"].map((e) => /* @__PURE__ */ Z("button", {
								type: "button",
								role: "radio",
								"aria-checked": D.face === e,
								class: `sc-faceseg__opt${D.face === e ? " is-on" : ""}`,
								onClick: () => r.actions.ui({
									face: e,
									selectedObjectId: null
								}),
								children: /* @__PURE__ */ Z("span", {
									class: "sc-faceseg__text",
									children: e === "front" ? se : ce
								})
							}, e))
						}),
						n.doubleSided.allowCopy && !h && /* @__PURE__ */ Z($, {
							icon: "copy",
							label: i("action.copyFace", { face: D.face === "front" ? ce : se }),
							onClick: () => r.actions.copyFace(D.face)
						}),
						/* @__PURE__ */ Z($, {
							icon: "close",
							class: "sc-faceseg__remove",
							label: i("doubleSided.remove"),
							onClick: () => (r.actions.patch({ doubleSided: !1 }), r.actions.ui({
								face: "front",
								selectedObjectId: null
							}))
						})
					] }) : /* @__PURE__ */ Z("button", {
						type: "button",
						class: "sc-toolchip",
						title: `${i("doubleSided.add")}${M ? ` (${M})` : ""}`,
						"aria-label": `${i("doubleSided.add")}${M ? ` (${M})` : ""}`,
						onClick: () => (r.actions.patch({ doubleSided: !0 }), r.actions.ui({
							face: "back",
							selectedObjectId: null
						})),
						children: [/* @__PURE__ */ Z(Q, {
							name: "doubleSided",
							size: 18
						}), /* @__PURE__ */ Z("span", {
							class: "sc-toolchip__text",
							children: i("doubleSided.add")
						})]
					}), /* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" })] }),
					n.orientation && !O.customSize && !h && /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z($, {
						icon: "orientation",
						class: y ? "is-landscape" : "",
						label: `${i("stage.orientation")} — ${O.orientation === "landscape" ? vp(t).landscape : vp(t).portrait}`,
						pressed: O.orientation === "landscape",
						onClick: () => r.actions.patch({ orientation: O.orientation === "landscape" ? "portrait" : "landscape" })
					}), /* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" })] }),
					!m && /* @__PURE__ */ Z(j, { children: [
						/* @__PURE__ */ Z($, {
							icon: "zoomOut",
							label: i("stage.zoomOut"),
							disabled: D.zoom <= .5,
							onClick: () => r.actions.ui({ zoom: Math.max(.5, D.zoom - .25) })
						}),
						/* @__PURE__ */ Z("span", {
							class: "sc-toolbar__value",
							"aria-live": "off",
							children: [Math.round(D.zoom * 100), " %"]
						}),
						/* @__PURE__ */ Z($, {
							icon: "zoomIn",
							label: i("stage.zoomIn"),
							disabled: D.zoom >= 3,
							onClick: () => r.actions.ui({ zoom: Math.min(3, D.zoom + .25) })
						})
					] }),
					!m && /* @__PURE__ */ Z($, {
						icon: "fit",
						label: i("stage.fit"),
						onClick: () => r.actions.ui({ zoom: 1 })
					}),
					ie && !h && /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" }), /* @__PURE__ */ Z($, {
						icon: "sun",
						label: i("stage.light"),
						pressed: D.lightOn,
						onClick: () => r.actions.ui({ lightOn: !D.lightOn })
					})] }),
					/* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" }),
					m ? /* @__PURE__ */ Z($, {
						icon: "more",
						label: i("stage.more"),
						pressed: C === "more",
						"aria-expanded": C === "more",
						"aria-haspopup": "menu",
						onClick: () => ee("more")
					}) : /* @__PURE__ */ Z(j, { children: [
						/* @__PURE__ */ Z($, {
							icon: "layers",
							label: i("layers.title"),
							pressed: C === "layers",
							"aria-expanded": C === "layers",
							onClick: () => ee("layers")
						}),
						n.images.scenes.length > 0 && /* @__PURE__ */ Z($, {
							icon: "scene",
							label: i("scenes.title"),
							pressed: C === "scenes",
							"aria-expanded": C === "scenes",
							onClick: () => ee("scenes")
						}),
						n.images.download && /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" }), /* @__PURE__ */ Z($, {
							icon: "download",
							label: i("stage.download"),
							onClick: x
						})] })
					] }),
					e
				]
			}),
			C === "more" && /* @__PURE__ */ Z("div", {
				class: "sc-moremenu",
				ref: T,
				role: "menu",
				"aria-label": i("stage.more"),
				children: [
					h && n.orientation && !O.customSize && /* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitemcheckbox",
						"aria-checked": g,
						class: "sc-moremenu__item",
						onClick: _,
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "orientation",
								size: 18,
								class: y ? "is-rotated" : ""
							}),
							" ",
							i("size.orientation"),
							" :",
							" ",
							g ? vp(t).landscape : vp(t).portrait
						]
					}),
					h && ie && /* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitemcheckbox",
						"aria-checked": D.lightOn,
						class: "sc-moremenu__item",
						onClick: () => r.actions.ui({ lightOn: !D.lightOn }),
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "sun",
								size: 18
							}),
							" ",
							i("section.lighting"),
							" :",
							" ",
							D.lightOn ? i("stage.on") : i("stage.off")
						]
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						disabled: D.zoom >= 3,
						onClick: () => r.actions.ui({ zoom: Math.min(3, D.zoom + .25) }),
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "zoomIn",
								size: 18
							}),
							" ",
							i("stage.zoomIn")
						]
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						disabled: D.zoom <= .5,
						onClick: () => r.actions.ui({ zoom: Math.max(.5, D.zoom - .25) }),
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "zoomOut",
								size: 18
							}),
							" ",
							i("stage.zoomOut")
						]
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => r.actions.ui({ zoom: 1 }),
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "fit",
								size: 18
							}),
							" ",
							i("stage.fit")
						]
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => w("layers"),
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "layers",
								size: 18
							}),
							" ",
							i("layers.title")
						]
					}),
					n.images.scenes.length > 0 && /* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => w("scenes"),
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "scene",
								size: 18
							}),
							" ",
							i("scenes.title")
						]
					}),
					n.images.download && /* @__PURE__ */ Z("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => {
							w(null), x();
						},
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "download",
								size: 18
							}),
							" ",
							i("stage.download")
						]
					})
				]
			}),
			C === "layers" && /* @__PURE__ */ Z("div", {
				class: "sc-stage__panel",
				ref: T,
				children: /* @__PURE__ */ Z(Lp, { onClose: () => w(null) })
			}),
			C === "scenes" && /* @__PURE__ */ Z("div", {
				class: "sc-scenemenu",
				ref: T,
				role: "dialog",
				"aria-label": i("scenes.title"),
				children: /* @__PURE__ */ Z(Rp, {
					value: D.sceneUrl,
					onChange: (e) => r.actions.ui({ sceneUrl: e })
				})
			}),
			/* @__PURE__ */ Z("p", {
				class: "sc-stage__hint sc-visually-hidden",
				children: /* @__PURE__ */ Z(Q, {
					name: "info",
					size: 14
				})
			})
		]
	});
}
//#endregion
//#region src/ui/PriceBlock.tsx
function Wp({ compact: e = !1 }) {
	let t = z(), { config: n, t: r } = t, i = t.price.value, [a, o] = N(!1), s = He(null);
	if (Ve(() => {
		if (!a) return;
		let e = (e) => !s.current?.contains(e.composedPath()[0]) && o(!1), t = (e) => e.key === "Escape" && o(!1);
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t);
		};
	}, [a]), n.hidePricing) return null;
	let c = n.texts.textBeforePrice, l = Kp(n.texts.textAfterPrice);
	return /* @__PURE__ */ Z("div", {
		class: `sc-price${e ? " sc-price--compact" : ""}`,
		part: "price",
		ref: s,
		children: [
			/* @__PURE__ */ Z("div", {
				class: "sc-price__amount",
				"aria-live": "polite",
				"aria-atomic": "true",
				children: [
					c && /* @__PURE__ */ Z("span", {
						class: "sc-price__before",
						children: c
					}),
					/* @__PURE__ */ Z("strong", {
						class: "sc-price__total",
						children: t.money(i.total)
					}),
					l && /* @__PURE__ */ Z("span", {
						class: "sc-price__after",
						children: l
					})
				]
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-linkbtn",
				"aria-expanded": a,
				onClick: () => o(!a),
				children: [r("action.details"), /* @__PURE__ */ Z(Q, {
					name: "chevronDown",
					size: 14
				})]
			}),
			a && /* @__PURE__ */ Z("div", {
				class: "sc-popover",
				role: "dialog",
				"aria-label": r("price.detail"),
				children: [/* @__PURE__ */ Z("h4", {
					class: "sc-subtitle",
					children: r("price.detail")
				}), /* @__PURE__ */ Z("ul", {
					class: "sc-pricelines",
					children: [
						Yp(t, i).map((e) => /* @__PURE__ */ Z("li", {
							class: e.amount === null ? "is-included" : void 0,
							children: [/* @__PURE__ */ Z("span", {
								class: "sc-pricelines__what",
								children: [e.title && /* @__PURE__ */ Z("span", {
									class: "sc-pricelines__k",
									children: e.title
								}), /* @__PURE__ */ Z("span", { children: e.value })]
							}), /* @__PURE__ */ Z("span", {
								class: "sc-num-tab",
								children: e.amount === null ? r("price.included") : e.amount.kind === "multiplier" ? `× ${e.amount.value}` : t.money(e.amount.value)
							})]
						}, e.key)),
						i.quantity > 1 && /* @__PURE__ */ Z("li", { children: [/* @__PURE__ */ Z("span", { children: r("price.unit") }), /* @__PURE__ */ Z("span", {
							class: "sc-num-tab",
							children: t.money(i.unit)
						})] }),
						i.quantity > 1 && /* @__PURE__ */ Z("li", { children: [/* @__PURE__ */ Z("span", { children: r("qty.label") }), /* @__PURE__ */ Z("span", {
							class: "sc-num-tab",
							children: ["× ", i.quantity]
						})] }),
						i.discount > 0 && /* @__PURE__ */ Z("li", {
							class: "is-discount",
							children: [/* @__PURE__ */ Z("span", { children: r("price.discount") }), /* @__PURE__ */ Z("span", {
								class: "sc-num-tab",
								children: ["−", t.money(i.discount)]
							})]
						}),
						/* @__PURE__ */ Z("li", {
							class: "is-total",
							children: [/* @__PURE__ */ Z("span", { children: r("price.total") }), /* @__PURE__ */ Z("span", {
								class: "sc-num-tab",
								children: t.money(i.total)
							})]
						})
					]
				})]
			})
		]
	});
}
var Gp = /* @__PURE__ */ new Set(["tva include", "vat included"]);
function Kp(e) {
	let t = (e ?? "").trim();
	return Gp.has(t.toLowerCase()) ? "" : t;
}
function qp() {
	let e = z(), { config: t, t: n } = e, r = t.discounts.byQuantity ? [...t.discounts.lots].filter((t) => t.quantity > e.quantity.value && t.kind !== "none").sort((e, t) => e.quantity - t.quantity)[0] : void 0;
	return /* @__PURE__ */ Z("div", {
		class: "sc-qty",
		children: [
			/* @__PURE__ */ Z("span", {
				class: "sc-qty__label",
				children: n("qty.label")
			}),
			/* @__PURE__ */ Z(Pf, {
				label: n("qty.label"),
				value: e.quantity.value,
				min: t.quantity.min,
				max: t.quantity.max,
				decLabel: n("qty.decrease"),
				incLabel: n("qty.increase"),
				onChange: e.setQuantity
			}),
			r && /* @__PURE__ */ Z("span", {
				class: "sc-qty__lot",
				children: n("qty.lot", {
					qty: r.quantity,
					value: r.kind === "percent" ? `${r.value} %` : e.money(r.value)
				})
			})
		]
	});
}
var Jp = [
	{
		s: "component",
		keys: []
	},
	{
		s: "material",
		keys: ["material"]
	},
	{
		s: "size",
		keys: ["sizeTextBase"]
	},
	{
		s: "shape",
		keys: ["shape"]
	},
	{
		s: "color",
		keys: ["color1", "color2"]
	},
	{
		s: "border",
		keys: ["border1", "border2"]
	},
	{
		s: "fixing",
		keys: ["fixing"]
	},
	{
		s: "lighting",
		keys: ["lighting"]
	}
];
function Yp(e, t) {
	let n = e.config, r = e.store.design.value, i = e.t, a = /* @__PURE__ */ new Set(), o = (e) => {
		let n = t.lines.filter((t) => e.includes(t.key));
		if (n.forEach((e) => a.add(e.key)), !n.length) return null;
		let r = n.find((e) => e.kind === "multiplier");
		return r ? {
			kind: "multiplier",
			value: r.amount
		} : {
			kind: "base",
			value: n.reduce((e, t) => e + t.amount, 0)
		};
	}, s = [], c = (e, t, n, r) => {
		n && s.push({
			key: e,
			title: t,
			value: n,
			amount: o(r)
		});
	};
	if (t.template) {
		let n = r.template ? e.templates?.list.find((e) => e.id === r.template.id)?.name ?? "" : "";
		s.push({
			key: "template",
			title: pp(e, "templates"),
			value: n || i("section.templates"),
			amount: {
				kind: "base",
				value: t.template
			}
		});
	}
	for (let { s: t, keys: a } of Jp) if (c(t, pp(e, t), mp(e, t, r), a), t === "size" && c("thickness", i("size.thickness"), n.thickness.find((e) => e.id === r.thicknessId)?.label ?? "", ["thickness"]), t === "border" && r.borderId) {
		let e = n.borderSettings.colors.find((e) => e.id === r.borderColorId);
		e && tr(n, r).find((e) => e.id === r.borderId)?.kind !== "none" && c("border-color", i("border.color"), e.label, ["border-color1", "border-color2"]);
	}
	for (let e of lr(n, r)) c(`addon:${e.id}`, e.label, e.options.find((t) => t.id === r.addons[e.id])?.label ?? "", [`addon:${e.id}`]);
	for (let e of n.inputs) {
		let t = r.inputs[e.id], n = e.kind === "yes-no" ? t === !0 ? i("input.yes") : "" : e.kind === "dropdown" || e.kind === "cards" ? e.options.find((e) => e.value === t)?.label ?? "" : "";
		c(`input:${e.id}`, e.label, n, [`input:${e.id}`]);
	}
	for (let e of t.lines) {
		if (a.has(e.key)) continue;
		let t = e.key.startsWith("image:") ? r.objects.find((t) => `image:${t.id}` === e.key) : void 0, n = e.key === "chars" ? i("price.chars") : t?.type === "image" ? t.name ?? i("section.image") : e.label;
		s.push({
			key: e.key,
			title: "",
			value: n,
			amount: {
				kind: e.kind,
				value: e.amount
			}
		});
	}
	return s;
}
//#endregion
//#region src/ui/skins/Default.tsx
var Xp = 4;
function Zp() {
	let e = z(), { config: t, store: n, t: r } = e, i = e.sections.value, a = n.ui.value, o = n.design.value, s = a.section && i.includes(a.section) ? a.section : i[0] ?? null, c = s ? i.indexOf(s) : -1, l = He(null), [u, d] = N(!1), f = (e) => {
		n.actions.ui({
			section: e,
			selectedObjectId: null
		}), d(!1), requestAnimationFrame(() => l.current?.focus({ preventScroll: !0 }));
	}, p = e.status.value, m = (n, i) => /* @__PURE__ */ Z("button", {
		type: "button",
		class: `sc-navitem sc-navitem--${i}`,
		part: "rail-item",
		title: pp(e, n),
		"aria-current": n === s ? "step" : void 0,
		onClick: () => f(n),
		children: [
			/* @__PURE__ */ Z("span", {
				class: "sc-navitem__icon",
				children: [/* @__PURE__ */ Z(Df, {
					id: n,
					url: t.sectionIcons[n]
				}), p[n] === "todo" && /* @__PURE__ */ Z("span", {
					class: "sc-dot",
					"aria-label": r("nav.todo")
				})]
			}),
			/* @__PURE__ */ Z("span", {
				class: "sc-navitem__label",
				children: pp(e, n)
			}),
			i === "rail" && /* @__PURE__ */ Z("span", {
				class: "sc-navitem__summary",
				children: mp(e, n, o)
			})
		]
	}, n), h = /* @__PURE__ */ Z("button", {
		type: "button",
		class: "sc-btn sc-btn--cta",
		part: "finish",
		onClick: e.onFinish,
		children: r("action.finish")
	}), g = t.finishPosition === "top";
	return /* @__PURE__ */ Z("div", {
		class: "sc-skin sc-default",
		"data-side": t.panelSide,
		children: [
			/* @__PURE__ */ Z("header", {
				class: "sc-topbar",
				part: "topbar",
				children: [/* @__PURE__ */ Z("div", {
					class: "sc-topbar__group",
					children: [
						/* @__PURE__ */ Z($, {
							icon: "undo",
							label: r("action.undo"),
							disabled: !n.canUndo.value,
							onClick: n.actions.undo
						}),
						/* @__PURE__ */ Z($, {
							icon: "redo",
							label: r("action.redo"),
							disabled: !n.canRedo.value,
							onClick: n.actions.redo
						}),
						/* @__PURE__ */ Z("h2", {
							class: "sc-topbar__title",
							children: r("title")
						})
					]
				}), /* @__PURE__ */ Z("div", {
					class: "sc-topbar__group sc-topbar__end",
					children: [
						/* @__PURE__ */ Z("div", {
							class: "sc-only-desktop",
							children: /* @__PURE__ */ Z(qp, {})
						}),
						/* @__PURE__ */ Z(Wp, {}),
						/* @__PURE__ */ Z("div", {
							class: g ? "sc-only-desktop" : "sc-hidden",
							children: h
						})
					]
				})]
			}),
			/* @__PURE__ */ Z("nav", {
				class: "sc-rail",
				part: "rail",
				"aria-label": r("nav.sections"),
				children: i.map((e) => m(e, "rail"))
			}),
			/* @__PURE__ */ Z(Up, {}),
			/* @__PURE__ */ Z("section", {
				class: "sc-panel",
				part: "panel",
				"aria-labelledby": "sc-panel-title",
				children: s && /* @__PURE__ */ Z(j, { children: [
					/* @__PURE__ */ Z("header", {
						class: "sc-panel__head",
						part: "panel-header",
						children: [/* @__PURE__ */ Z("p", {
							class: "sc-panel__step",
							children: [
								c + 1,
								" / ",
								i.length
							]
						}), /* @__PURE__ */ Z("h3", {
							id: "sc-panel-title",
							class: "sc-panel__title",
							tabIndex: -1,
							ref: l,
							children: pp(e, s)
						})]
					}),
					/* @__PURE__ */ Z("div", {
						class: "sc-panel__body",
						children: /* @__PURE__ */ Z(Pp, { section: s })
					}),
					/* @__PURE__ */ Z("footer", {
						class: "sc-panel__foot",
						part: "panel-footer",
						children: [/* @__PURE__ */ Z("div", {
							class: "sc-panel__nav",
							children: [/* @__PURE__ */ Z("button", {
								type: "button",
								class: "sc-btn sc-btn--ghost",
								disabled: c <= 0,
								onClick: () => f(i[c - 1]),
								children: [
									/* @__PURE__ */ Z(Q, {
										name: "chevronLeft",
										size: 18
									}),
									" ",
									r("nav.previous")
								]
							}), c < i.length - 1 && /* @__PURE__ */ Z("button", {
								type: "button",
								class: "sc-btn sc-btn--secondary",
								onClick: () => f(i[c + 1]),
								children: [
									r("nav.next"),
									" ",
									/* @__PURE__ */ Z(Q, {
										name: "chevronRight",
										size: 18
									})
								]
							})]
						}), !g && /* @__PURE__ */ Z("div", {
							class: "sc-panel__finish sc-only-desktop",
							children: h
						})]
					})
				] })
			}),
			/* @__PURE__ */ Z("div", {
				class: "sc-bottom sc-only-mobile",
				children: [/* @__PURE__ */ Z("nav", {
					class: "sc-bottomnav",
					"aria-label": r("nav.sections"),
					children: [i.slice(0, i.length > 5 ? Xp : i.length).map((e) => m(e, "bottom")), i.length > 5 && /* @__PURE__ */ Z("button", {
						type: "button",
						class: "sc-navitem sc-navitem--bottom",
						"aria-expanded": u,
						onClick: () => d(!u),
						children: [/* @__PURE__ */ Z("span", {
							class: "sc-navitem__icon",
							children: /* @__PURE__ */ Z(Q, {
								name: "more",
								size: 22
							})
						}), /* @__PURE__ */ Z("span", {
							class: "sc-navitem__label",
							children: r("nav.more")
						})]
					})]
				}), /* @__PURE__ */ Z("div", {
					class: "sc-actionbar",
					children: [/* @__PURE__ */ Z(qp, {}), h]
				})]
			}),
			u && /* @__PURE__ */ Z("div", {
				class: "sc-sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": r("nav.sections"),
				onKeyDown: (e) => e.key === "Escape" && d(!1),
				children: [/* @__PURE__ */ Z("div", {
					class: "sc-sheet__backdrop",
					onClick: () => d(!1)
				}), /* @__PURE__ */ Z("div", {
					class: "sc-sheet__body",
					children: [/* @__PURE__ */ Z("header", {
						class: "sc-sheet__head",
						children: [/* @__PURE__ */ Z("h3", {
							class: "sc-subtitle",
							children: r("nav.sections")
						}), /* @__PURE__ */ Z($, {
							icon: "close",
							label: r("action.close"),
							onClick: () => d(!1)
						})]
					}), /* @__PURE__ */ Z("div", {
						class: "sc-sheet__list",
						children: i.map((e) => m(e, "rail"))
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/ui/skins/Couffo.tsx
function Qp() {
	let e = z(), { config: t, store: n, t: r } = e, i = e.sections.value, a = n.ui.value, o = n.design.value, s = a.section && i.includes(a.section) ? a.section : i[0] ?? null, c = He(null), l = e.status.value, u = (e, t = !1) => {
		n.actions.ui({
			section: e,
			selectedObjectId: null
		}), e && requestAnimationFrame(() => {
			let n = c.current, r = n?.querySelector(`[data-step="${e}"]`);
			if (!n || !r) return;
			let i = r.getBoundingClientRect().top - n.getBoundingClientRect().top;
			n.scrollTo({
				top: n.scrollTop + i - 8,
				behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
			}), t && r.focus({ preventScroll: !0 });
		});
	}, d = (e, t) => {
		let n = Array.from(c.current?.querySelectorAll(".sc-step__head") ?? []), r = e.key === "ArrowDown" ? t + 1 : e.key === "ArrowUp" ? t - 1 : e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : null;
		if (r === null) return;
		e.preventDefault();
		let i = n[(r + n.length) % n.length];
		i?.focus({ preventScroll: !0 }), i?.scrollIntoView({ block: "nearest" });
	}, f = /* @__PURE__ */ Z("button", {
		type: "button",
		class: "sc-btn sc-btn--cta",
		part: "finish",
		onClick: e.onFinish,
		children: r("action.finish")
	}), p = t.finishPosition === "top";
	return /* @__PURE__ */ Z("div", {
		class: `sc-skin sc-couffo${p ? " has-topbar" : ""}`,
		"data-side": t.panelSide,
		children: [
			p && /* @__PURE__ */ Z("header", {
				class: "sc-topbar sc-topbar--slim",
				part: "topbar",
				children: [/* @__PURE__ */ Z("div", {
					class: "sc-topbar__group",
					children: [
						/* @__PURE__ */ Z($, {
							icon: "undo",
							label: r("action.undo"),
							disabled: !n.canUndo.value,
							onClick: n.actions.undo
						}),
						/* @__PURE__ */ Z($, {
							icon: "redo",
							label: r("action.redo"),
							disabled: !n.canRedo.value,
							onClick: n.actions.redo
						}),
						/* @__PURE__ */ Z("h2", {
							class: "sc-topbar__title",
							children: r("title")
						})
					]
				}), /* @__PURE__ */ Z("div", {
					class: "sc-only-desktop",
					children: f
				})]
			}),
			/* @__PURE__ */ Z(Up, { toolbarExtra: !p && /* @__PURE__ */ Z(j, { children: [
				/* @__PURE__ */ Z("span", { class: "sc-toolbar__sep" }),
				/* @__PURE__ */ Z($, {
					icon: "undo",
					label: r("action.undo"),
					disabled: !n.canUndo.value,
					onClick: n.actions.undo
				}),
				/* @__PURE__ */ Z($, {
					icon: "redo",
					label: r("action.redo"),
					disabled: !n.canRedo.value,
					onClick: n.actions.redo
				})
			] }) }),
			/* @__PURE__ */ Z("div", {
				class: "sc-steps",
				part: "steps",
				ref: c,
				children: i.map((t, n) => {
					let a = t === s, c = mp(e, t, o), f = l[t];
					return /* @__PURE__ */ Z("section", {
						class: `sc-step${a ? " is-open" : ""}`,
						part: "step",
						children: [/* @__PURE__ */ Z("h3", {
							class: "sc-step__h",
							children: /* @__PURE__ */ Z("button", {
								type: "button",
								class: "sc-step__head",
								part: "step-header",
								"data-step": t,
								"aria-expanded": a,
								"aria-controls": `sc-step-${t}`,
								onClick: () => u(a ? null : t),
								onKeyDown: (e) => d(e, n),
								children: [
									/* @__PURE__ */ Z("span", {
										class: "sc-step__num",
										"aria-hidden": "true",
										children: f === "todo" ? "!" : n + 1
									}),
									/* @__PURE__ */ Z("span", {
										class: "sc-step__label",
										children: [/* @__PURE__ */ Z("span", {
											class: "sc-step__title",
											children: pp(e, t)
										}), !a && c && /* @__PURE__ */ Z("span", {
											class: "sc-step__summary",
											title: c,
											children: c
										})]
									}),
									f === "todo" ? /* @__PURE__ */ Z("span", {
										class: "sc-dot",
										"aria-label": r("nav.todo")
									}) : c && !a ? /* @__PURE__ */ Z(Q, {
										name: "check",
										size: 16,
										class: "sc-step__ok"
									}) : null,
									/* @__PURE__ */ Z(Q, {
										name: "chevronDown",
										size: 18,
										class: "sc-step__chev"
									})
								]
							})
						}), a && /* @__PURE__ */ Z("div", {
							class: "sc-step__body",
							id: `sc-step-${t}`,
							part: "step-body",
							children: [/* @__PURE__ */ Z(Pp, { section: t }), /* @__PURE__ */ Z("div", {
								class: "sc-step__next",
								children: n < i.length - 1 ? /* @__PURE__ */ Z("button", {
									type: "button",
									class: "sc-btn sc-btn--secondary",
									onClick: () => u(i[n + 1], !0),
									children: [
										r("nav.next"),
										" ",
										/* @__PURE__ */ Z(Q, {
											name: "chevronRight",
											size: 18
										})
									]
								}) : /* @__PURE__ */ Z("button", {
									type: "button",
									class: "sc-btn sc-btn--secondary",
									onClick: e.onFinish,
									children: [
										r("nav.toRecap"),
										" ",
										/* @__PURE__ */ Z(Q, {
											name: "chevronRight",
											size: 18
										})
									]
								})
							})]
						})]
					}, t);
				})
			}),
			/* @__PURE__ */ Z("footer", {
				class: "sc-bottombar",
				part: "bottombar",
				children: [/* @__PURE__ */ Z("div", {
					class: "sc-only-desktop",
					children: /* @__PURE__ */ Z(qp, {})
				}), /* @__PURE__ */ Z("div", {
					class: "sc-bottombar__end",
					children: [/* @__PURE__ */ Z(Wp, {}), /* @__PURE__ */ Z("div", {
						class: p ? "sc-only-mobile" : "",
						children: f
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/ui/order.ts
var $p = () => new Promise((e) => requestAnimationFrame(() => e()));
async function em(e) {
	let { config: t, store: n } = e, r = e.scene.current, i = n.design.value, a = n.ui.value, o = t.doubleSided ? ["front", "back"] : ["front"], s = [];
	e.capturing.current = !0;
	try {
		for (let e of o) n.actions.ui({
			face: e,
			selectedObjectId: null,
			zoom: 1,
			stageView: "design"
		}), await $p(), await $p(), await r?.ready(), s.push({
			face: e,
			preview: r?.snapshot({ clean: !0 }) ?? "",
			previewJpeg: t.output.formats.includes("jpeg") ? r?.snapshot({
				clean: !0,
				mimeType: "image/jpeg"
			}) : void 0,
			print: r?.snapshot({
				print: !0,
				pixelRatio: 3
			}) ?? "",
			printSvg: r?.toPrintSVG() || void 0,
			measure: r?.measure() ?? null
		});
	} finally {
		n.actions.ui({
			face: a.face,
			zoom: a.zoom,
			stageView: a.stageView
		}), e.capturing.current = !1;
	}
	return {
		config: t,
		design: i,
		price: e.price.value,
		quantity: e.quantity.value,
		faces: s
	};
}
//#endregion
//#region src/ui/PreviewViewer.tsx
var tm = {
	front: {
		yaw: 0,
		pitch: 0
	},
	angled: {
		yaw: -35,
		pitch: 10
	},
	side: {
		yaw: -68,
		pitch: 6
	},
	back: {
		yaw: 180,
		pitch: 0
	}
}, nm = [
	"#6b7179",
	"#868c94",
	"#a3a9b0"
], rm = "#d5d9de", im = 3;
function am(e, t) {
	let n = document.createElement("canvas");
	n.width = e.naturalWidth, n.height = e.naturalHeight;
	let r = n.getContext("2d");
	r.drawImage(e, 0, 0);
	let i = r.getImageData(0, 0, n.width, n.height), [a, o, s] = [
		1,
		3,
		5
	].map((e) => parseInt(t.slice(e, e + 2), 16));
	for (let e = 0; e < i.data.length; e += 4) {
		let t = i.data[e + 3] > 128;
		i.data[e] = a, i.data[e + 1] = o, i.data[e + 2] = s, i.data[e + 3] = t ? 255 : 0;
	}
	return r.putImageData(i, 0, 0), n;
}
function om(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = n, r.src = e;
	});
}
function sm(e, t, n, r, i, a) {
	let o = e.getContext("2d");
	if (!o) return;
	let s = e.width / Math.max(1, e.clientWidth);
	o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, e.width, e.height);
	let c = n.yaw * Math.PI / 180, l = n.pitch * Math.PI / 180, [u, d, f, p] = [
		Math.cos(c),
		Math.sin(c),
		Math.cos(l),
		Math.sin(l)
	], m = Math.abs(u) < .015 ? u < 0 ? -.015 : .015 : u, h = e.width / 2, g = e.height / 2, _ = (e, t, n = !1) => {
		o.setTransform(s * m, s * d * p, 0, s * f, h + s * e * d, g - s * e * m * p), n && o.scale(-1, 1), o.drawImage(t, -r / 2, -i / 2, r, i);
	}, v = m * f >= 0, y = Math.abs(d) * a + Math.abs(m * p) * a, b = Math.max(2, Math.min(400, Math.ceil(y * 2)));
	for (let e = 0; e <= b; e++) {
		let n = e / b;
		_(v ? -a / 2 + n * a : a / 2 - n * a, t.edges[e < 2 ? 0 : e > b - 2 ? 2 : 1]);
	}
	v ? _(a / 2, t.front) : _(-a / 2, t.back, !0);
}
function cm({ images: e }) {
	let t = z(), { config: n, store: r, t: i } = t, a = r.ui.value, o = r.design.value, s = !!e.back, [c, l] = N(tm.front), [u, d] = N(100), [f, p] = N(!1), [m, h] = N({
		w: 0,
		h: 0
	}), [g, _] = N(null), v = He(null), y = He(null), b = He(0);
	Ve(() => {
		let e = v.current;
		if (!e) return;
		let t = new ResizeObserver(() => h({
			w: e.clientWidth,
			h: e.clientHeight
		}));
		return t.observe(e), () => t.disconnect();
	}, []), Ve(() => {
		if (!e.front) return;
		let t = !0;
		return (async () => {
			let n = await om(e.front), r = e.back ? await om(e.back).catch(() => null) : null;
			t && _({
				front: n,
				back: r ?? am(n, rm),
				backIsCapture: !!r,
				edges: nm.map((e) => am(n, e))
			});
		})(), () => {
			t = !1;
		};
	}, [e.front, e.back]);
	let x = g ? {
		w: g.front.naturalWidth,
		h: g.front.naturalHeight
	} : null, S = x && m.w && m.h ? Math.min(m.w * .82 / x.w, m.h * .82 / x.h) : 0, C = x ? x.w * S * (u / 100) : 0, w = x ? x.h * S * (u / 100) : 0, ee = Cr(n, o), T = n.thickness.find((e) => e.id === o.thicknessId), te = T ? Un(T.value, T.unit ?? n.unit, n.unit) : Un(im, "mm", n.unit), E = Math.min(1, te / Math.max(1e-6, Math.max(ee.width, ee.height))), D = T?.unit ? Math.min(C / 2, Math.max(1.5, C * te / Math.max(1e-6, ee.width))) : C * Math.min(.07, .012 + .07 * Math.sqrt(E));
	Ve(() => {
		let e = y.current;
		if (!e || !g || !C) return;
		let t = Math.min(2, window.devicePixelRatio || 1), n = Math.round(m.w * t), r = Math.round(m.h * t);
		(e.width !== n || e.height !== r) && (e.width = n, e.height = r), sm(e, g, c, C, w, D);
	}, [
		g,
		c,
		C,
		w,
		D,
		m.w,
		m.h
	]), Ve(() => () => cancelAnimationFrame(b.current), []);
	let O = Object.keys(tm).find((e) => Math.abs(((c.yaw - tm[e].yaw) % 360 + 360) % 360) < .01 && Math.abs(tm[e].pitch - c.pitch) < .01) ?? null, ne = Math.cos(c.yaw * Math.PI / 180) < 0, re = He(null), k = (e) => {
		cancelAnimationFrame(b.current), e.currentTarget.setPointerCapture(e.pointerId), re.current = {
			x: e.clientX,
			y: e.clientY,
			...c
		}, p(!0);
	}, A = (e) => {
		let t = re.current;
		t && l({
			yaw: t.yaw + (e.clientX - t.x) * .5,
			pitch: Math.max(-30, Math.min(30, t.pitch - (e.clientY - t.y) * .3))
		});
	}, j = () => {
		re.current = null, p(!1);
	}, ie = (e) => {
		cancelAnimationFrame(b.current);
		let t = c;
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return l(e);
		let n = performance.now(), r = (i) => {
			let a = Math.min(1, (i - n) / 450), o = 1 - (1 - a) ** 3;
			l({
				yaw: t.yaw + (e.yaw - t.yaw) * o,
				pitch: t.pitch + (e.pitch - t.pitch) * o
			}), a < 1 && (b.current = requestAnimationFrame(r));
		};
		b.current = requestAnimationFrame(r);
	}, ae = (e) => {
		let t = e.shiftKey ? 45 : 15;
		if (e.key === "ArrowLeft") ie({
			...c,
			yaw: c.yaw - t
		});
		else if (e.key === "ArrowRight") ie({
			...c,
			yaw: c.yaw + t
		});
		else if (e.key === "ArrowUp") ie({
			...c,
			pitch: Math.min(30, c.pitch + 5)
		});
		else if (e.key === "ArrowDown") ie({
			...c,
			pitch: Math.max(-30, c.pitch - 5)
		});
		else return;
		e.preventDefault();
	}, oe = (e) => {
		let t = tm[e], n = Math.round((c.yaw - t.yaw) / 360);
		ie({
			yaw: t.yaw + n * 360,
			pitch: t.pitch
		});
	}, se = (e) => d((t) => Math.min(300, Math.max(50, t + e))), ce = [
		"front",
		"angled",
		"side",
		"back"
	], M = (e) => e === "back" && s ? n.doubleSided?.back || i("stage.back") : i(`preview.${e}`);
	return /* @__PURE__ */ Z("div", {
		class: "sc-viewer",
		children: [/* @__PURE__ */ Z("div", {
			class: `sc-viewer__stage${a.sceneUrl ? " has-scene" : ""}`,
			style: a.sceneUrl ? { backgroundImage: `url("${a.sceneUrl.replace(/"/g, "%22")}")` } : void 0,
			children: [
				/* @__PURE__ */ Z("div", {
					class: "sc-viewer__top",
					children: [/* @__PURE__ */ Z(Nf, {
						size: "sm",
						label: i("preview.view"),
						value: O ?? "",
						onChange: oe,
						options: ce.map((e) => ({
							value: e,
							label: M(e)
						}))
					}), /* @__PURE__ */ Z("div", {
						class: "sc-viewer__zoom",
						role: "group",
						"aria-label": i("preview.zoom"),
						children: [
							/* @__PURE__ */ Z($, {
								icon: "zoomOut",
								label: i("stage.zoomOut"),
								disabled: u <= 50,
								onClick: () => se(-10)
							}),
							/* @__PURE__ */ Z("span", {
								class: "sc-viewer__value",
								"aria-live": "polite",
								children: [u, " %"]
							}),
							/* @__PURE__ */ Z($, {
								icon: "zoomIn",
								label: i("stage.zoomIn"),
								disabled: u >= 300,
								onClick: () => se(10)
							}),
							/* @__PURE__ */ Z($, {
								icon: "fit",
								label: i("preview.fit"),
								onClick: () => {
									d(100), oe("front");
								}
							})
						]
					})]
				}),
				/* @__PURE__ */ Z("div", {
					ref: v,
					class: `sc-viewer__art${f ? " is-dragging" : ""}`,
					tabIndex: 0,
					role: "img",
					"aria-roledescription": i("preview.rotatable"),
					"aria-label": `${i("recap.title")} — ${ne ? M("back") : i("preview.front")}`,
					onPointerDown: k,
					onPointerMove: A,
					onPointerUp: j,
					onPointerCancel: j,
					onKeyDown: ae,
					children: [/* @__PURE__ */ Z("span", {
						class: "sc-viewer__ground",
						"aria-hidden": "true",
						style: C ? { width: `${Math.min(m.w, C * .9)}px` } : void 0
					}), /* @__PURE__ */ Z("canvas", {
						ref: y,
						class: "sc-viewer__canvas",
						"aria-hidden": "true"
					})]
				}),
				/* @__PURE__ */ Z("div", {
					class: "sc-viewer__foot",
					children: [T && /* @__PURE__ */ Z("p", {
						class: "sc-viewer__thickness",
						children: [
							/* @__PURE__ */ Z(Q, {
								name: "ruler",
								size: 14
							}),
							i("size.thickness"),
							": ",
							Kn(T, n.unit, a.displayUnit, t.locale)
						]
					}), /* @__PURE__ */ Z("p", {
						class: "sc-viewer__hint",
						"aria-hidden": "true",
						children: i("preview.dragHint")
					})]
				})
			]
		}), /* @__PURE__ */ Z("div", {
			class: "sc-recap__scenes",
			children: [/* @__PURE__ */ Z("span", {
				class: "sc-small sc-muted",
				children: i("scenes.preview")
			}), /* @__PURE__ */ Z(Rp, {
				value: a.sceneUrl,
				onChange: (e) => r.actions.ui({ sceneUrl: e })
			})]
		})]
	});
}
//#endregion
//#region src/ui/Recap.tsx
var lm = [
	{
		key: "support",
		sections: [
			"material",
			"component",
			"shape",
			"color"
		]
	},
	{
		key: "dimensions",
		sections: ["size"]
	},
	{
		key: "finish",
		sections: [
			"border",
			"fixing",
			"lighting"
		]
	},
	{
		key: "content",
		sections: [
			"text",
			"image",
			"qrcode"
		]
	},
	{
		key: "options",
		sections: ["options", "addons"]
	}
], um = [
	"size",
	"shape",
	"border",
	"fixing",
	"lighting"
];
function dm({ images: e }) {
	let t = z(), { config: n, store: r, t: i } = t, a = r.design.value, o = t.sections.value, s = He(null);
	Ve(() => s.current?.focus(), []);
	let c = (e) => r.actions.ui({
		view: "edit",
		section: e
	}), [l, u] = N(!1), [d, f] = N(null), p = t.onSaveTemplate !== null, m = p ? t.onSaveTemplate : t.onAddToCart, h = (p || !t.preview) && m !== null, g = t.saveKind, [_, v] = N(!1), [y, b] = N({ busy: !1 });
	return /* @__PURE__ */ Z("div", {
		class: "sc-recap",
		part: "recap",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "sc-recap-title",
		onKeyDown: (e) => e.key === "Escape" && r.actions.ui({ view: "edit" }),
		children: [/* @__PURE__ */ Z("div", {
			class: "sc-recap__preview",
			part: "recap-preview",
			children: [/* @__PURE__ */ Z(cm, { images: e }), /* @__PURE__ */ Z("button", {
				type: "button",
				class: "sc-btn sc-btn--ghost",
				onClick: () => r.actions.ui({ view: "edit" }),
				children: [
					/* @__PURE__ */ Z(Q, {
						name: "chevronLeft",
						size: 18
					}),
					" ",
					i("action.backToEdit")
				]
			})]
		}), /* @__PURE__ */ Z("div", {
			class: "sc-recap__side",
			children: [
				/* @__PURE__ */ Z("h2", {
					id: "sc-recap-title",
					class: "sc-recap__title",
					tabIndex: -1,
					ref: s,
					children: i("recap.title")
				}),
				/* @__PURE__ */ Z("div", {
					class: "sc-recap__groups",
					children: lm.map((e) => {
						let r = e.sections.filter((e) => o.includes(e) || n.mode !== "simple" && um.includes(e) && o.includes("component")).map((e) => ({
							s: e,
							v: mp(t, e, a)
						})).filter((e) => e.v);
						return r.length ? /* @__PURE__ */ Z("section", {
							class: "sc-recap__group",
							part: "recap-group",
							children: [/* @__PURE__ */ Z("header", { children: [/* @__PURE__ */ Z("h3", {
								class: "sc-subtitle",
								children: i(`recap.${e.key}`)
							}), /* @__PURE__ */ Z("button", {
								type: "button",
								class: "sc-linkbtn",
								onClick: () => c(o.includes(r[0].s) ? r[0].s : "component"),
								children: i("action.edit")
							})] }), /* @__PURE__ */ Z("dl", { children: r.map(({ s: e, v: n }) => /* @__PURE__ */ Z("div", {
								class: "sc-recap__row",
								children: [/* @__PURE__ */ Z("dt", { children: pp(t, e) }), /* @__PURE__ */ Z("dd", { children: n })]
							}, e)) })]
						}, e.key) : null;
					})
				}),
				/* @__PURE__ */ Z("div", {
					class: "sc-recap__buy",
					part: "recap-price",
					children: [
						/* @__PURE__ */ Z(qp, {}),
						/* @__PURE__ */ Z(Wp, {}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							class: "sc-btn sc-btn--cart sc-btn--block",
							part: "add-to-cart",
							disabled: !h || l,
							"aria-busy": l,
							"aria-describedby": t.preview ? "sc-preview-note" : void 0,
							onClick: async () => {
								if (m && !l) {
									u(!0), f(null), v(!1);
									try {
										let e = await m(await em(t));
										e.success ? p && v(!0) : f(e.message || i(p ? `${g}.error` : "cart.error"));
									} catch (e) {
										f(e instanceof Error ? e.message : i("cart.error"));
									} finally {
										u(!1);
									}
								}
							},
							children: [
								/* @__PURE__ */ Z(Q, {
									name: p ? "check" : "cart",
									size: 18
								}),
								" ",
								l ? i(p ? `${g}.saving` : "cart.adding") : p ? i(`${g}.save`) : n.quote.enabled ? i("action.quote") : i("action.addToCart")
							]
						}),
						_ && /* @__PURE__ */ Z("p", {
							class: "sc-success",
							role: "status",
							children: i(`${g}.saved`)
						}),
						d && /* @__PURE__ */ Z("p", {
							class: "sc-error",
							role: "alert",
							children: d
						}),
						t.onShare && !p && !t.preview && /* @__PURE__ */ Z("div", {
							class: "sc-share",
							children: [
								/* @__PURE__ */ Z("button", {
									type: "button",
									class: "sc-linkbtn",
									disabled: y.busy,
									"aria-busy": y.busy,
									onClick: async () => {
										if (!t.onShare || y.busy) return;
										b({ busy: !0 });
										let e = await t.onShare(a).catch(() => null), n = e ? await navigator.clipboard?.writeText(e).then(() => !0, () => !1) : !1;
										b({
											busy: !1,
											url: e,
											copied: n
										});
									},
									children: [
										/* @__PURE__ */ Z(Q, {
											name: "copy",
											size: 16
										}),
										" ",
										y.busy ? i("share.creating") : i("share.action")
									]
								}),
								y.url && /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z("input", {
									class: "sc-input",
									readOnly: !0,
									value: y.url,
									"aria-label": i("share.link"),
									onFocus: (e) => e.currentTarget.select()
								}), /* @__PURE__ */ Z("p", {
									class: "sc-success",
									role: "status",
									children: y.copied ? i("share.copied") : i("share.ready")
								})] }),
								y.url === null && /* @__PURE__ */ Z("p", {
									class: "sc-error",
									role: "alert",
									children: i("share.error")
								})
							]
						}),
						t.preview && !p && /* @__PURE__ */ Z("p", {
							id: "sc-preview-note",
							class: "sc-muted sc-small",
							children: i("dev.notice")
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/ui/App.tsx
function fm({ ctx: e, skin: t }) {
	let { vars: n, dark: r } = ti(e.config.theme), [i, a] = N({
		front: null,
		back: null
	}), o = e.store.ui.value.view, s = {
		...e,
		onFinish: () => {
			let t = e.sections.value.find((t) => e.status.value[t] === "todo");
			if (t) {
				e.store.actions.ui({
					section: t,
					view: "edit"
				});
				return;
			}
			let n = e.store.ui.peek().face, r = () => new Promise((e) => requestAnimationFrame(() => e())), i = async (t) => {
				e.store.actions.ui({
					face: t,
					selectedObjectId: null,
					stageView: "design",
					zoom: 1
				}), await r(), await r();
				let n = e.scene.current;
				return await n?.ready(), n ? await n.snapshotWithWatermark(e.config.output.watermark, 2, !0) : null;
			};
			(async () => {
				e.capturing.current = !0;
				let t, r;
				try {
					t = await i("front"), r = e.config.doubleSided && e.store.design.peek().doubleSided ? await i("back") : null;
				} finally {
					e.store.actions.ui({ face: n }), e.capturing.current = !1;
				}
				a({
					front: t,
					back: r
				}), e.store.actions.ui({ view: "recap" });
			})();
		}
	};
	return /* @__PURE__ */ Z(ni.Provider, {
		value: s,
		children: /* @__PURE__ */ Z("div", {
			class: "sc-root",
			"data-theme": r ? "dark" : "light",
			"data-skin": t,
			style: n,
			lang: e.locale,
			children: e.config.missingRequired.length > 0 ? /* @__PURE__ */ Z(j, { children: [/* @__PURE__ */ Z("div", {
				class: "sc-blocked",
				inert: !0,
				children: Z(t === "couffo" ? Qp : Zp, {})
			}), /* @__PURE__ */ Z(pm, {})] }) : /* @__PURE__ */ Z(j, { children: [Z(t === "couffo" ? Qp : Zp, {}), o === "recap" && /* @__PURE__ */ Z(dm, { images: i })] })
		})
	});
}
function pm() {
	let { config: e, t } = We(ni);
	return /* @__PURE__ */ Z("div", {
		class: "sc-required",
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": "sc-required-title",
		"aria-describedby": "sc-required-text",
		children: /* @__PURE__ */ Z("div", {
			class: "sc-required__card",
			children: [
				/* @__PURE__ */ Z("h2", {
					id: "sc-required-title",
					class: "sc-required__title",
					children: [/* @__PURE__ */ Z(Q, {
						name: "info",
						size: 22
					}), t("required.title")]
				}),
				/* @__PURE__ */ Z("p", {
					id: "sc-required-text",
					children: t("required.text")
				}),
				/* @__PURE__ */ Z("ul", {
					class: "sc-required__list",
					children: e.missingRequired.map((e) => /* @__PURE__ */ Z("li", { children: [/* @__PURE__ */ Z(Q, {
						name: e,
						size: 20
					}), t(`section.${e}`)] }, e))
				}),
				/* @__PURE__ */ Z("p", {
					class: "sc-muted sc-small",
					children: t("required.hint")
				})
			]
		})
	});
}
//#endregion
//#region src/integrations/aso/cart.ts
var mm = "ascwo_add_custom_design_to_cart";
function hm(e, t = new FormData()) {
	let n = (e) => e === null || [
		"string",
		"number",
		"boolean"
	].includes(typeof e), r = (e, i) => {
		if (e !== void 0) {
			if (e === null) return t.append(i, "");
			if (e instanceof Blob) return t.append(i, e);
			if (Array.isArray(e)) e.every(n) ? e.forEach((e) => r(e, `${i}[]`)) : e.forEach((e, t) => r(e, `${i}[${t}]`));
			else if (typeof e == "object") for (let [t, n] of Object.entries(e)) r(n, `${i}[${t}]`);
			else t.append(i, String(e));
		}
	};
	for (let [t, n] of Object.entries(e)) r(n, t);
	return t;
}
async function gm(e, t) {
	if (typeof window.add_to_cart_shopify == "function") return window.add_to_cart_shopify(e, t.redirectToCheckOut);
	if (!t.ajaxUrl) return {
		success: !1,
		message: "Missing add-to-cart endpoint"
	};
	let n = hm({
		action: mm,
		data: e,
		redirectToCheckOut: t.redirectToCheckOut,
		nonce: t.nonce ?? ""
	}), r = await (await fetch(t.ajaxUrl, {
		method: "POST",
		body: n,
		credentials: "same-origin"
	})).json().catch(() => ({}));
	return r.cart_item_key && r.url && (window.location.href = r.url), {
		...r,
		success: !!r.success
	};
}
//#endregion
//#region src/integrations/aso/templatesList.ts
var _m = {
	all: "All",
	addToCart: "Add to cart",
	customize: "Customize",
	noSize: "",
	emptyTitle: "No templates available",
	emptyDescription: "There are no visible templates for this configuration yet."
}, vm = (e, t) => ({
	all: e.allTemplatesText || e.all || t.all,
	addToCart: e.templateAddToCartButton || e.textAddToCart || e.addToCart || t.addToCart,
	customize: e.templateDesignButton || e.productDesignButton || e.customize || t.customize,
	noSize: e.noSize ?? t.noSize,
	emptyTitle: e.emptyTitle || t.emptyTitle,
	emptyDescription: e.emptyDescription || t.emptyDescription
});
function ym(e, t, n = _m) {
	return vm({
		...e.languageImages?.templates ?? {},
		...e.buttons ?? {},
		...t?.languageImages?.templates ?? {},
		...t?.buttons ?? {}
	}, n);
}
var bm = (e, t = 0) => e.id ?? e.templateId ?? e._index ?? t;
function xm(e, t) {
	let n = Array.isArray(e.templates) ? e.templates : [];
	return t ? n.filter((e) => String(e.categoryId ?? "") === t) : n;
}
var Sm = (e) => Number(e) || 0;
function Cm(...e) {
	for (let t of e) {
		let e = t?.settings?.generals ?? t?.data?.settings?.generals ?? t?.config?.data?.settings?.generals ?? t?.config?.settings?.generals ?? t?.generals;
		if (e?.discounts && typeof e.discounts == "object") return e.discounts;
	}
	return null;
}
function wm(e, t) {
	let n = ["percent", "fixed"].includes(t?.discount) ? t.discount : "none", r = Sm(t?.discountValue);
	return r <= 0 || n === "none" ? e : n === "percent" ? e * (1 - Math.min(r, 100) / 100) : Math.max(0, e - r);
}
function Tm(e, t, ...n) {
	let r = Cm(...n);
	if (!r) return e;
	if (!r.byQuantity) return wm(e, r);
	let i = (Array.isArray(r.lots) ? r.lots : []).filter((e) => t >= Sm(e?.quantity)).sort((e, t) => Sm(t?.quantity) - Sm(e?.quantity))[0];
	return i ? wm(e, i) : e;
}
function Em(e, t, n = {}) {
	return Tm(Sm(e.recaps?.customPrice), 1, e, t, n) + Sm(e.basePrice ?? t.regularPrice ?? n.regularPrice);
}
function Dm(e, t, n, r = {}) {
	let i = encodeURIComponent(String(bm(e, t))), a = String(e.designPageUrl || e.design_page_url || n.designPageUrl || n.design_page_url || "").trim();
	if (a) return a.includes("{templateId}") ? a.replace("{templateId}", i) : `${a.replace(/\/?$/, "/")}${i}/`;
	let o = n.productId || r.productId || "", s = String(r.siteUrl || location.origin).replace(/\/$/, "");
	return o ? `${s}/configurator-page/ascwo-design/${encodeURIComponent(String(o))}/${i}/` : "#";
}
function Om(e) {
	let t = String(e ?? "").trim();
	return !t || /^(https?:|blob:|data:|\/)/.test(t) ? t : /^(uploads|aso_default_files|images|assets)\//.test(t) ? `/${t}` : t;
}
function km(e) {
	let t = e && typeof e == "object" ? { ...e } : {};
	return !t.additionalOptions && t.additionnalOptions && (t.additionalOptions = t.additionnalOptions), delete t.additionnalOptions, !t.images || typeof t.images != "object" ? t.images = {
		label: "Images",
		value: []
	} : "value" in t.images || (t.images = {
		...t.images,
		value: []
	}), t.designImages ?? (t.designImages = []), (!t.output || typeof t.output != "object") && (t.output = {
		prefix: "",
		designDisplayComposition: !0
	}), t;
}
async function Am(e, t) {
	if (!e.enableAddToCart) return { success: !1 };
	if (typeof window.addTemplateToCartShopify == "function") return await window.addTemplateToCartShopify(e), { success: !0 };
	let n = e, r = e.configId || t.data.configId, i = String(t.restUrl || t.data.rest_url || "").replace(/\/$/, "");
	if (i && r && !e.data?.cartData) {
		let a = await fetch(`${i}/templates/${r}/${bm(e)}`, {
			credentials: "same-origin",
			headers: t.restNonce ? { "X-WP-Nonce": t.restNonce } : {}
		});
		a.ok && (n = await a.json() || e);
	}
	let a = Tm(Sm(e.recaps?.customPrice ?? n.data?.cartData?.custom_price), 1, n, e, t.data, t.runtime ?? {}), o = Sm(e.basePrice ?? n.basePrice), s = t.data.productId || t.productId || "";
	return gm({
		recaps: {
			...km(n.data?.cartData),
			custom_price: (a + o).toFixed(2)
		},
		productId: s,
		variation_id: s,
		quantity: 1
	}, {
		ajaxUrl: t.ajaxUrl,
		nonce: t.nonce,
		redirectToCheckOut: !!t.redirectToCheckOut
	});
}
//#endregion
//#region src/ui/TemplatesList.tsx
function jm({ data: e, t, money: n, resolveImage: r, runtime: i = {}, linkOptions: a, onAddToCart: o }) {
	let [s, c] = N(""), [l, u] = N(null), [d, f] = N(null), p = {
		all: t("templates.all"),
		addToCart: t("templates.addToCart"),
		customize: t("templates.customize"),
		noSize: "",
		emptyTitle: t("templates.emptyTitle"),
		emptyDescription: t("templates.emptyDescription")
	}, m = ym(e, void 0, p), h = Array.isArray(e.categories) ? e.categories : [], g = xm(e, s), _ = async (e) => {
		if (!o) return;
		let t = String(bm(e));
		u(t), f(null);
		try {
			let n = await o(e);
			f({
				id: t,
				ok: n.success,
				message: n.message
			});
		} catch {
			f({
				id: t,
				ok: !1
			});
		} finally {
			u(null);
		}
	};
	return /* @__PURE__ */ Z("section", {
		class: "sc-tpl",
		children: [h.length > 0 && /* @__PURE__ */ Z("div", {
			class: "sc-tpl-tabs",
			role: "tablist",
			"aria-label": t("templates.categories"),
			children: [{
				name: m.all,
				value: ""
			}, ...h].map((e) => /* @__PURE__ */ Z("button", {
				type: "button",
				role: "tab",
				class: `sc-chip${s === String(e.value) ? " is-on" : ""}`,
				"aria-selected": s === String(e.value),
				onClick: () => c(String(e.value)),
				children: e.name
			}, String(e.value)))
		}), g.length === 0 ? /* @__PURE__ */ Z("div", {
			class: "sc-empty",
			children: [/* @__PURE__ */ Z("h3", { children: m.emptyTitle }), /* @__PURE__ */ Z("p", {
				class: "sc-muted",
				children: m.emptyDescription
			})]
		}) : /* @__PURE__ */ Z("ul", {
			class: "sc-tpl-grid",
			children: g.map((s, c) => {
				let u = String(bm(s, c)), f = ym(e, s, p), m = String(s.name ?? "");
				return /* @__PURE__ */ Z("li", {
					class: "sc-tpl-card",
					children: [/* @__PURE__ */ Z("div", {
						class: "sc-tpl-media",
						children: [s.prevImg ? /* @__PURE__ */ Z("img", {
							src: r(s.prevImg),
							alt: m,
							loading: "lazy"
						}) : /* @__PURE__ */ Z("span", {
							"aria-hidden": "true",
							children: m.slice(0, 2).toUpperCase()
						}), s.realImg && /* @__PURE__ */ Z("img", {
							class: "sc-tpl-real",
							src: r(s.realImg),
							alt: "",
							loading: "lazy"
						})]
					}), /* @__PURE__ */ Z("div", {
						class: "sc-tpl-body",
						children: [
							/* @__PURE__ */ Z("h3", { children: m }),
							/* @__PURE__ */ Z("p", {
								class: "sc-muted sc-small",
								children: s.recaps?.size || f.noSize
							}),
							/* @__PURE__ */ Z("p", {
								class: "sc-tpl-price",
								children: [
									/* @__PURE__ */ Z("strong", { children: n(Em(s, e, i)) }),
									" ",
									s.recaps?.priceType && /* @__PURE__ */ Z("span", {
										class: "sc-muted sc-small",
										children: s.recaps.priceType
									})
								]
							}),
							/* @__PURE__ */ Z("div", {
								class: "sc-tpl-actions",
								children: [/* @__PURE__ */ Z("a", {
									class: "sc-btn sc-btn--cta",
									href: Dm(s, c, e, a),
									children: [
										/* @__PURE__ */ Z(Q, {
											name: "edit",
											size: 18
										}),
										" ",
										f.customize
									]
								}), s.enableAddToCart && o && /* @__PURE__ */ Z("button", {
									type: "button",
									class: "sc-btn sc-btn--secondary",
									disabled: l === u,
									"aria-busy": l === u,
									onClick: () => void _(s),
									children: [
										/* @__PURE__ */ Z(Q, {
											name: "cart",
											size: 18
										}),
										" ",
										l === u ? t("cart.adding") : f.addToCart
									]
								})]
							}),
							d?.id === u && /* @__PURE__ */ Z("p", {
								class: d.ok ? "sc-success" : "sc-error",
								role: "status",
								children: d.ok ? t("templates.added") : d.message || t("templates.error")
							})
						]
					})]
				}, u);
			})
		})]
	});
}
//#endregion
//#region src/integrations/aso/optionEditor.ts
var Mm = (e, t) => String(e ?? "").trim() !== "" && String(e ?? "").trim() === String(t ?? "").trim();
function Nm(e, t) {
	let n = e?.data?.requiredOptions?.components?.items ?? [];
	if (!n.length) return null;
	let r = n.findIndex((e, n) => Mm(e?.id, t.componentId) || Mm(e?.id, t.componentRef) || Mm(n, t.componentId) || Mm(n, t.componentRef));
	r < 0 && (r = 0);
	let i = Array.isArray(n[r].options) ? n[r].options : [];
	if (!i.length) return null;
	let a = i.findIndex((e, n) => Mm(e?.id, t.optionId) || Mm(n, t.optionIndex));
	return a < 0 && (a = Math.max(0, i.findIndex((e) => e?.isDefault))), {
		componentIndex: r,
		optionIndex: a,
		componentId: String(n[r].id || `component-${r}`),
		optionId: String(i[a].id ?? "")
	};
}
function Pm(e, t) {
	let n = JSON.parse(JSON.stringify(e)), r = n.data.requiredOptions.components.items[t.componentIndex];
	return r && (r.isVisible = !0), n;
}
var Fm = (e) => Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [], Im = (e, t) => Array.isArray(e) ? t : {
	...e ?? {},
	items: t
};
function Lm(e, t) {
	let n = Fm(e);
	if (!n.length || !t) return e;
	let r = n.map((e) => [
		e?.id,
		e?.borderId,
		e?.fixingMethodId,
		e?.shapeId,
		e?.sizeId,
		e?.colorId
	].some((e) => Mm(e, t)));
	return r.some(Boolean) ? Im(e, n.map((e, t) => ({
		...e,
		isDefault: r[t]
	}))) : e;
}
var Rm = (e, t = 0) => Math.round(e * 10 ** t) / 10 ** t || 0;
function zm(e, t) {
	let n = e.components.flatMap((e) => e.options).find((e) => e.id === t), r = {};
	for (let e of n?.textZones ?? []) r[e.id] = {
		edit: e.can.edit,
		font: e.can.font,
		color: e.can.color,
		resize: e.can.resize,
		rotate: e.can.rotate,
		moveX: e.can.moveX,
		moveY: e.can.moveY,
		replace: !0
	};
	for (let e of n?.imageZones ?? []) r[e.id] = {
		edit: !0,
		font: !0,
		color: !0,
		resize: e.can.resize,
		rotate: e.can.rotate,
		moveX: e.can.moveX,
		moveY: e.can.moveY,
		replace: e.can.replace
	};
	return r;
}
function Bm(e, t, n, r) {
	let i = JSON.parse(JSON.stringify(e));
	i.sizes = Lm(i.sizes, n.sizeId), i.shapes = Lm(i.shapes, n.shapeId), i.fixingMethods = Lm(i.fixingMethods, n.fixingId), i.borders = Lm(i.borders, n.borderId), i.backgrounds = Lm(i.backgrounds, n.colorId), i.lightings = Lm(i.lightings, n.lightingId);
	let a = Cr(t, n), o = ur(t, a), s = (e) => n.objects.find((t) => t.zoneId === e), c = (e, t, n) => e.measure === "percent" ? {
		x: Rm(t / (a.width / 2) * 100, 2),
		y: Rm(-n / (a.height / 2) * 100, 2)
	} : {
		x: Rm(t * o),
		y: Rm(-n * o)
	};
	return Array.isArray(i.textZones) && (i.textZones = i.textZones.map((e) => {
		let n = s(e.id), i = r[e.id];
		if (!n || n.type !== "text") return e;
		let a = t.fonts.find((e) => e.id === n.fontId);
		return {
			...e,
			value: n.text,
			defaultFont: a?.label ?? e.defaultFont,
			fontSize: Math.round(n.size * o * 12 / 40),
			color: n.color,
			textAlign: n.align,
			bold: n.bold,
			italic: n.italic,
			...c(e, n.x, n.y),
			permissions: i ? {
				...e.permissions ?? {},
				editText: i.edit,
				changeFont: i.font,
				changeColor: i.color,
				resizeText: i.resize,
				rotateText: i.rotate,
				moveText: i.moveX || i.moveY,
				moveTextX: i.moveX,
				moveTextY: i.moveY
			} : e.permissions
		};
	})), Array.isArray(i.imageZones) && (i.imageZones = i.imageZones.map((e) => {
		let t = s(e.id), n = r[e.id];
		return !t || t.type !== "image" ? e : {
			...e,
			tint: t.tint ?? "",
			width: Rm(t.width / a.width * 100, 2),
			height: Rm(t.height / a.height * 100, 2),
			...c(e, t.x, t.y),
			permissions: n ? {
				...e.permissions ?? {},
				replaceImage: n.replace,
				resizeImage: n.resize,
				rotateImage: n.rotate,
				moveImage: n.moveX || n.moveY,
				moveImageX: n.moveX,
				moveImageY: n.moveY
			} : e.permissions
		};
	})), i;
}
async function Vm(e, t, n, r, i = fetch) {
	let a = new FormData();
	a.append("operation", "save-option-section"), a.append("componentIndex", String(t.componentIndex)), a.append("optionIndex", String(t.optionIndex)), a.append("option", JSON.stringify(n));
	let o = await i(`/app/configuration/${encodeURIComponent(String(e))}/required-options/component-options/${t.componentIndex}/${t.optionIndex}`, {
		method: "POST",
		body: a,
		credentials: "same-origin",
		headers: {
			Accept: "application/json",
			...r ? { "Aso-Access-Token": r } : {}
		}
	}).catch(() => null);
	if (!o) return { success: !1 };
	let s = await o.json().catch(() => null);
	return o.ok ? {
		success: s?.ok !== !1,
		message: s?.error ?? s?.message
	} : {
		success: !1,
		message: s?.error ?? (o.status === 401 || o.status === 410 ? `Not authenticated (HTTP ${o.status})` : `HTTP ${o.status}`)
	};
}
function Hm(e, t) {
	let n = e.components.flatMap((e) => e.options).find((e) => e.id === t), r = {
		edit: !0,
		font: !0,
		color: !0,
		resize: !0,
		moveX: !0,
		moveY: !0,
		rotate: !0,
		flipX: !0,
		flipY: !0
	}, i = {
		size: !!n?.sizeIds.length || e.sizes.length > 0,
		shape: !!(n?.shapeIds.length || n?.customShapes.length),
		fixing: !!(n?.fixingIds.length || n?.customFixings.length),
		border: !!(n?.borderIds.length || n?.customBorders.length),
		color: !!n?.backgroundIds.length || e.colors.length > 0,
		lighting: e.lightingEnabled && !!(n?.lightings.length || e.lightings.length),
		text: !!n?.textZones.length,
		image: !!n?.imageZones.length
	}, a = [
		"size",
		"shape",
		"fixing",
		"border",
		"color",
		"lighting",
		"text",
		"image"
	];
	return {
		...e,
		sections: a.filter((e) => i[e]),
		components: e.components.map((e) => ({
			...e,
			options: e.options.map((e) => ({
				...e,
				textZones: e.textZones.map((e) => ({
					...e,
					can: { ...r }
				})),
				imageZones: e.imageZones.map((e) => ({
					...e,
					can: {
						...e.can,
						replace: !0,
						resize: !0,
						moveX: !0,
						moveY: !0,
						rotate: !0,
						flipX: !0,
						flipY: !0
					}
				}))
			}))
		}))
	};
}
async function Um(e, t, n, r, i, a = fetch) {
	let o = await a(`${e.replace(/\/$/, "")}/configs/${encodeURIComponent(String(t))}/required-options/components/items/${encodeURIComponent(n.componentId)}/options/${encodeURIComponent(n.optionId)}`, {
		method: "PUT",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			...i ? { "X-WP-Nonce": i } : {}
		},
		body: JSON.stringify(r)
	}).catch(() => null);
	if (!o) return { success: !1 };
	let s = await o.json().catch(() => null);
	return {
		success: o.ok && (s?.success === !0 || s?.success === "same"),
		message: s?.message
	};
}
//#endregion
//#region src/index.ts
var Wm = {
	shape: rr,
	fixing: or,
	border: ar
};
function Gm(e) {
	if (e) return e;
	if ("" + new URL("sign-configurator.css", import.meta.url).href + !1) return Lt;
	let t = Array.from(document.querySelectorAll("script[src]")).map((e) => e.src).find((e) => /sign-configurator(\.iife)?\.js(?:[?#]|$)/i.test(e));
	if (!t) return new URL(Lt, document.baseURI).href;
	let n = new URL(Lt.split("/").pop(), t);
	return n.search = new URL(t).search, n.href;
}
function Km(e, t = {}, n = "fr") {
	let r = t.decimals ?? 2, i = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: r,
		maximumFractionDigits: r
	}).formatToParts(e), a = t.decimalSep ?? (n.startsWith("fr") ? "," : "."), o = t.thousandSep ?? (n.startsWith("fr") ? " " : ","), s = i.map((e) => e.type === "group" ? o : e.type === "decimal" ? a : e.value).join(""), c = t.symbol ?? "€";
	switch (t.position ?? "right_space") {
		case "left": return `${c}${s}`;
		case "left_space": return `${c}\u00a0${s}`;
		case "right": return `${s}${c}`;
		default: return `${s}\u00a0${c}`;
	}
}
function qm(e, t) {
	let n = typeof e == "string" ? document.querySelector(e) : e;
	if (!n) throw Error(`[sign-configurator] élément introuvable : ${String(e)}`);
	let r = n.shadowRoot ?? n.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	return i.rel = "stylesheet", i.href = Gm(t), r.appendChild(i), r;
}
function Jm(e, t) {
	let n = qm(e, t.stylesheetUrl), r = {
		...Pn,
		...t.assets
	}, i = t.locale ?? (document.documentElement.lang || "fr"), { vars: a, dark: o } = ti(yn(t.themeColors)), s = document.createElement("div");
	return s.className = "sc-root sc-host", s.dataset.theme = o ? "dark" : "light", s.lang = i, Object.entries(a).forEach(([e, t]) => s.style.setProperty(e, t)), n.appendChild(s), we(k(jm, {
		data: t.data,
		t: Gr(i),
		money: (e) => Km(e, t.money, i),
		resolveImage: (e) => zn(Om(e), r),
		runtime: t.runtime,
		linkOptions: t.linkOptions,
		onAddToCart: t.onAddToCart
	}), s), { destroy() {
		we(null, s), n.replaceChildren();
	} };
}
function Ym(e, t) {
	let n = qm(e, t.stylesheetUrl), r = {
		...Pn,
		...t.assets
	}, i = {
		urls: r,
		resolve: (e) => zn(e, r)
	}, a, o = {};
	try {
		a = Nn(t.configuration, t.managesData, { resolveAsset: i.resolve }), t.optionEditor && (o = t.optionEditor.rights ?? zm(a, t.optionEditor.optionId), a = Hm(a, t.optionEditor.optionId));
	} catch (e) {
		let t = document.createElement("div");
		throw t.setAttribute("role", "alert"), t.className = "sc-fatal", t.textContent = e instanceof Gt ? `Configuration invalide : ${e.problems.join(" · ")}` : String(e), n.appendChild(t), e;
	}
	let s = t.optionEditor ? void 0 : t.templates;
	if (s?.list.length && (a = {
		...a,
		sections: ["templates", ...a.sections]
	}), a.theme.customCss) {
		let e = document.createElement("style");
		e.textContent = a.theme.customCss, n.appendChild(e);
	}
	let c = t.locale ?? (document.documentElement.lang || "fr"), l = Gr(c, a.texts), u = t.optionEditor, d = u ? a.components.find((e) => e.options.some((e) => e.id === u.optionId)) : void 0, f = d ? yr(a, {
		...Or(a),
		objects: [],
		componentId: d.id,
		componentOptionId: u.optionId
	}) : typeof t.initialDesign == "function" ? t.initialDesign(a) : t.initialDesign, p = mt(o), m = kr(a, f ?? void 0), h = mt(a.quantity.min), g = null, _ = () => {};
	if (s?.list.length) {
		let e = mt(null), n = mt(null), r = /* @__PURE__ */ new Map(), i = m.design.peek(), o = mt({ "": Lr(a, yr(a, {
			...Or(a),
			template: null
		}), 1).unit });
		(async () => {
			for (let e of s.list) try {
				let n = r.has(e.id) ? r.get(e.id) : await s.load(e);
				if (r.set(e.id, n), !n) continue;
				let i = yr(a, {
					...n.design(a),
					template: {
						id: e.id,
						basePrice: n.basePrice
					}
				});
				o.value = {
					...o.value,
					[e.id]: Lr(a, i, 1, { templateBasePrice: t.templateBasePrice }).unit
				};
			} catch {}
		})(), g = {
			list: s.list,
			categories: s.categories ?? [],
			labels: s.labels ?? {},
			loadingId: e,
			error: n,
			prices: o,
			dirty: () => m.design.peek() !== i,
			apply: async (t) => {
				if (!e.peek()) {
					e.value = t.id, n.value = null;
					try {
						let e = r.has(t.id) ? r.get(t.id) : await s.load(t);
						if (r.set(t.id, e), !e) {
							n.value = l("templates.noDesign");
							return;
						}
						m.actions.patch({
							...e.design(a),
							template: {
								id: t.id,
								basePrice: e.basePrice
							}
						}), m.actions.ui({
							selectedObjectId: null,
							face: "front"
						}), i = m.design.peek();
					} catch {
						n.value = l("templates.loadError");
					} finally {
						e.value = null;
					}
				}
			},
			reset: () => {
				m.actions.patch({
					...yr(a, Or(a)),
					template: null
				}), m.actions.ui({
					selectedObjectId: null,
					face: "front"
				}), i = m.design.peek();
			}
		};
		let c = m.design.peek().template?.id ?? null;
		_ = wt(() => {
			let e = m.design.value.template?.id ?? null;
			e !== c && (c = e, s.onApplied?.(e));
		});
	}
	let v = {
		config: a,
		store: m,
		t: l,
		locale: c,
		money: (e) => Km(e, t.money, c),
		price: yt(() => Lr(a, m.design.value, h.value, { templateBasePrice: t.templateBasePrice })),
		quantity: h,
		setQuantity: (e) => h.value = e,
		sections: yt(() => {
			let e = m.design.value;
			return a.sections.filter((t) => {
				if (t === "lighting") return cr(a, e).length > 0;
				let n = a.mode === "advance" ? Wm[t] : void 0;
				return !n || n(a, e).length > 1;
			});
		}),
		status: yt(() => Object.fromEntries(a.sections.map((e) => [e, hp(a, e, m.design.value)]))),
		scene: { current: null },
		capturing: { current: !1 },
		assets: i,
		onAddToCart: t.onAddToCart ?? null,
		onSaveTemplate: u ? (e) => u.onSave(e.design, p.value) : t.onSaveTemplate ?? null,
		saveKind: u ? "option" : "template",
		optionEditor: u ? {
			rights: p,
			set: (e, t) => p.value = {
				...p.value,
				[e]: {
					...p.value[e],
					...t
				}
			}
		} : null,
		onShare: t.onShare ?? null,
		templates: g,
		preview: t.preview ?? !1,
		onFinish: () => void 0
	}, y = document.createElement("div");
	return y.className = "sc-host", n.appendChild(y), we(k(fm, {
		ctx: v,
		skin: t.skin ?? a.skin
	}), y), {
		config: a,
		store: m,
		get scene() {
			return v.scene.current;
		},
		destroy() {
			_(), we(null, y), n.replaceChildren();
		}
	};
}
//#endregion
//#region src/integrations/aso/recaps.ts
var Xm = (e) => Number.parseFloat(e.toFixed(3)).toString(), Zm = (e) => Math.round(e * 10) / 10;
function Qm(e) {
	return `data:image/svg+xml;base64,${typeof btoa == "function" ? btoa(unescape(encodeURIComponent(e))) : Buffer.from(e, "utf8").toString("base64")}`;
}
function $m(e, t, n) {
	if (!e) return "";
	let r = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${t}" height="${n}" viewBox="0 0 ${t} ${n}"><image width="${t}" height="${n}" xlink:href="${e}" href="${e}"/></svg>`;
	return `data:image/svg+xml;base64,${typeof btoa == "function" ? btoa(unescape(encodeURIComponent(r))) : Buffer.from(r, "utf8").toString("base64")}`;
}
function eh(e, t = {}) {
	let { config: n, design: r, price: i, quantity: a } = e, o = (e, t) => n.texts[e]?.trim() ? n.texts[e].trim() : t, s = n.unit, c = n.doubleSided !== null, l = Cr(n, r), u = e.faces.find((e) => e.face === "front"), d = td(er(n, r).find((e) => e.id === r.shapeId)?.kind ?? "rectangle") === "cut-to-shape", f = d && u?.measure ? {
		width: u.measure.sign.width,
		height: u.measure.sign.height
	} : l, p = er(n, r).find((e) => e.id === r.shapeId), m = n.colors.findIndex((e) => e.id === r.colorId), h = n.colors[m], g = r.customColor ? {
		id: -1,
		name: n.customBackground?.label ?? "Custom",
		codeHex: r.customColor,
		textColor: {
			active: !1,
			name: null,
			codeHex: null
		}
	} : {
		id: m,
		name: h?.label ?? "",
		codeHex: h?.patternUrl ?? h?.hex ?? "",
		textColor: {
			active: !!h?.textColor,
			name: h?.textColor ? h.textColor.name : null,
			codeHex: h?.textColor ? h.textColor.hex : null
		}
	}, _ = tr(n, r).find((e) => e.id === r.borderId), v = n.borderSettings.colors.find((e) => e.id === r.borderColorId), y = !r.customColor && h?.textColor?.sameForBorder && !v, b = d || !_ || _.kind === "none" ? {
		type: d ? "None" : _?.label ?? "None",
		rawType: "none",
		color: null,
		codeHex: null
	} : {
		type: _.label,
		rawType: _.kind,
		color: y ? h?.textColor?.name ?? null : v?.label ?? null,
		codeHex: y ? h?.textColor?.hex ?? null : v?.hex ?? null
	}, x = nr(n, r).find((e) => e.id === r.fixingId), S = n.lightingEnabled ? cr(n, r).find((e) => e.id === r.lightingId) : void 0, C = n.thickness.find((e) => e.id === r.thicknessId), w = {
		size: {
			label: o("textSize", "Size"),
			value: {
				width: {
					label: o("textWidth", "Width"),
					value: `${Xm(f.width)} ${s}`
				},
				height: {
					label: o("textHeight", "Height"),
					value: `${Xm(f.height)} ${s}`
				},
				thickness: {
					label: o("thickness", "thickness"),
					value: C ? `${Xm(C.value)} ${C.unit ?? s}` : "none"
				}
			}
		},
		shape: {
			label: o("textShape", "Shape"),
			value: p?.label ?? "",
			id: td(p?.kind ?? "rectangle")
		},
		color: {
			label: o("textColor", "Colors"),
			value: c ? {
				face1: g,
				face2: g
			} : g
		},
		border: {
			label: o("textBorder", "Borders"),
			value: c ? {
				face1: b,
				face2: b
			} : b
		},
		fixingMethod: {
			label: o("textFixingMethods", "Fixing method"),
			value: x?.label ?? "None",
			id: x?.kind ?? "none",
			type: x?.kind ?? "none"
		},
		lighting: {
			label: n.sectionLabels.lighting || "Lighting",
			value: S ? {
				id: S.id,
				label: S.label,
				hexCode: S.hex
			} : {
				id: "none",
				label: "None",
				hexCode: ""
			}
		}
	}, ee = (e, t) => {
		let n = t?.measure, r = n?.objects[e.id] ?? {
			width: 0,
			height: 0
		}, i = n?.sign ?? {
			x: 0,
			y: 0,
			width: l.width,
			height: l.height
		}, a = l.width / 2 + e.x - r.width / 2 - i.x, s = l.height / 2 + e.y - r.height / 2 - i.y, c = (e, t) => ({
			label: e,
			value: Zm(t)
		});
		return {
			width: c(o("textWidth", "width"), r.width),
			height: c(o("textHeight", "height"), r.height),
			left: c(o("textLeft", "Left"), a),
			top: c(o("textTop", "top"), s),
			right: c(o("textRight", "right"), i.width - (r.width + a)),
			bottom: c(o("textBottom", "bottom"), i.height - (r.height + s))
		};
	}, T = (e) => n.fonts.find((t) => t.id === e)?.label ?? "Arial", te = (t) => {
		let n = e.faces.find((e) => e.face === t), i = r.objects.filter((e) => e.face === t);
		return {
			texts: i.flatMap((e) => e.type === "text" ? [{
				id: e.id,
				type: "normal",
				values: ee(e, n),
				textContent: e.text,
				bold: e.bold ? "bold" : "normal",
				italic: e.italic ? "italic" : "normal",
				fontFamily: T(e.fontId),
				color: e.color,
				neonColor: null,
				firstBorder: null,
				secondBorder: null,
				side: null,
				sideColor: null,
				underlined: e.underline,
				crossed: e.strike,
				overlined: !1,
				alignment: e.align
			}] : []),
			images: i.flatMap((e) => e.type === "image" ? [{
				id: e.id,
				url: e.src,
				values: ee(e, n)
			}] : []),
			qrCodes: i.flatMap((e) => e.type === "qr" ? [{
				id: e.id,
				text: e.value,
				url: n?.measure?.qr[e.id] ?? "",
				values: ee(e, n)
			}] : [])
		};
	}, E = te("front"), D = te("back"), O = (e) => c ? {
		face1: E[e],
		face2: D[e]
	} : E[e], ne = lr(n, r).flatMap((e) => {
		let t = e.options.find((t) => t.id === r.addons[e.id]);
		return t ? [{
			option: e.label,
			value: t.label,
			data: {
				title: t.label,
				description: t.description ?? "",
				image: t.image ?? "",
				additionalPrice: t.price
			}
		}] : [];
	}), re = n.inputs.flatMap((e) => {
		let t = r.inputs[e.id];
		if (e.kind === "yes-no") {
			let n = t === !0;
			return [{
				id: e.index,
				label: e.label,
				value: n ? e.yes : e.no,
				price: n ? {
					type: e.price.kind,
					value: e.price.value
				} : {
					type: "none",
					value: 0
				}
			}];
		}
		if (e.kind === "dropdown" || e.kind === "cards") {
			let n = e.options.find((e) => e.value === t);
			return n ? [{
				id: e.index,
				label: e.label,
				value: n.value,
				price: {
					type: n.price.kind,
					value: n.price.value
				}
			}] : [];
		}
		return e.kind === "note" && typeof t == "string" && t.trim() ? [{
			id: e.index,
			label: e.label,
			value: t
		}] : [];
	}), k = (t) => {
		let r = e.faces.find((e) => e.face === t);
		if (!r) return {
			print: "",
			design: []
		};
		let i = 300 / 25.4, a = Math.round((r.measure?.sign.width ?? f.width) * (s === "mm" ? 1 : s === "cm" ? 10 : s === "in" ? 25.4 : 1) * i), o = Math.round((r.measure?.sign.height ?? f.height) * (s === "mm" ? 1 : s === "cm" ? 10 : s === "in" ? 25.4 : 1) * i), c = n.output.formats.map((e) => e === "jpeg" ? {
			format: e,
			url: r.previewJpeg ?? r.preview
		} : e === "svg" ? {
			format: e,
			url: $m(r.preview, 1200, 800)
		} : {
			format: e,
			url: r.preview
		});
		return {
			print: r.printSvg ? Qm(r.printSvg) : $m(r.print, a, o),
			design: c
		};
	}, A = k("front"), j = c ? k("back") : null;
	return {
		...c ? { faces: {
			face1: n.doubleSided.front,
			face2: n.doubleSided.back
		} } : {},
		sign: w,
		texts: {
			label: o("textOptionText", "Texts"),
			value: O("texts")
		},
		images: {
			label: o("textImage", "Images"),
			value: O("images")
		},
		qrCodes: {
			label: "qr Codes",
			value: O("qrCodes")
		},
		quantity: a,
		additionalComponents: ne,
		[c ? "additionnalOptions" : "additionalOptions"]: re,
		printImage: c ? {
			face1: A.print,
			face2: j.print
		} : A.print,
		designImages: c ? {
			face1: A.design,
			face2: j.design
		} : A.design,
		output: {
			prefix: n.output.prefix,
			designDisplayComposition: n.output.designComposition
		},
		custom_price: i.total.toFixed(t.decimals ?? 2)
	};
}
//#endregion
//#region src/integrations/aso/templates.ts
function th(e, t) {
	let n = Number(e?.basePrice);
	if (Number.isFinite(n)) return n;
	let r = Number(e?.price?.value), i = Number(e?.data?.cartData?.custom_price);
	if (Number.isFinite(r) && Number.isFinite(i)) return Math.max(0, r - i);
	let a = Number(t);
	return Number.isFinite(a) ? a : 0;
}
var nh = (e) => String(e ?? "").trim().replace(/^ASOFont_/i, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").toLowerCase();
function rh(e) {
	let t = Number(e.width ?? 0) * Math.abs(Number(e.scaleX ?? 1)), n = Number(e.height ?? 0) * Math.abs(Number(e.scaleY ?? 1)), r = e.originX === "center" ? 0 : e.originX === "right" ? -t / 2 : t / 2, i = e.originY === "center" ? 0 : e.originY === "bottom" ? -n / 2 : n / 2;
	return {
		x: Number(e.left ?? 0) + r,
		y: Number(e.top ?? 0) + i,
		w: t,
		h: n
	};
}
function ih(e, t, n, r, i = () => 0) {
	let a = Array.isArray(t?.objects) ? t.objects : [], o = a.find((e) => e.name === "safeObject");
	if (!o) return [];
	let s = rh(o), c = s.w > 0 && r.width > 0 ? s.w / r.width : ed(r.width, r.height, e.unit).pxPerUnit, l = (t) => {
		let n = [nh(t.originalFontFamily), nh(t.fontFamily)];
		return (e.fonts.find((e) => n.includes(nh(e.label)) || t.fontFamilyUrl && e.url === t.fontFamilyUrl) ?? e.fonts.find((e) => e.isDefault) ?? e.fonts[0])?.id ?? "";
	}, u = [];
	return a.forEach((e, t) => {
		let r = rh(e), a = {
			id: `tpl-${n}-${t}`,
			face: n,
			x: (r.x - s.x) / c,
			y: (r.y - s.y) / c,
			rotation: Number(e.angle ?? 0)
		};
		if (e.name === "aso-SignText") u.push({
			...a,
			type: "text",
			text: String(e.text ?? ""),
			fontId: l(e),
			size: Number(e.fontSize ?? 40) * Math.abs(Number(e.scaleY ?? 1)) / c,
			color: typeof e.fill == "string" ? e.fill : "#000000",
			bold: String(e.fontWeight) === "bold" || Number(e.fontWeight) >= 600,
			italic: e.fontStyle === "italic",
			underline: !!e.underline,
			strike: !!e.linethrough,
			overline: !!e.overline,
			align: e.textAlign === "left" || e.textAlign === "right" ? e.textAlign : "center",
			curve: Number(e.curveIntensity ?? 0) > 0 ? 150 : Number(e.curveIntensity ?? 0) < 0 ? -150 : 0
		});
		else if (e.name === "aso-SignImage") {
			let t = String(e.imageUrl || e.src || "");
			if (!t) return;
			u.push({
				...a,
				type: "image",
				src: t,
				price: i(t),
				tint: null,
				width: r.w / c,
				height: r.h / c,
				flipX: !!e.flipX,
				flipY: !!e.flipY
			});
		} else e.name === "aso-QRCode" && u.push({
			...a,
			type: "qr",
			value: String(e.fromData ?? ""),
			color: String(e.color?.dark ?? "#000000"),
			size: r.w / c
		});
	}), u;
}
function ah(e, t) {
	if (t?.v2?.design) return yr(e, {
		...Or(e),
		...t.v2.design
	});
	let n = Or(e), r = t?.options ?? {}, i = t?.sign ?? {}, a = (e, t) => t == null ? void 0 : e.find((e) => e.id === String(t)) ?? (Number.isInteger(Number(t)) ? e[Number(t)] : void 0);
	n.materialId = e.materials.find((e) => e.id === r.materialId)?.id ?? n.materialId;
	let o = e.sizes.find((e) => e.id === String(r.sizeId)), s = parseFloat(i.size?.width), c = parseFloat(i.size?.height);
	o ? (n.sizeId = o.id, n.customSize = null) : e.customSize && s > 0 && c > 0 && (n.sizeId = null, n.customSize = {
		width: s,
		height: c
	}), n.shapeId = (e.shapes.find((e) => e.id === String(r.shapeId)) ?? e.shapes.find((e) => td(e.kind) === i.shape))?.id ?? n.shapeId, n.colorId = (a(e.colors, r.colorId?.face1) ?? e.colors.find((e) => e.label === i.color?.face1?.name))?.id ?? n.colorId, n.borderId = (a(e.borders, r.borderId?.face1) ?? e.borders.find((e) => e.kind === i.border?.face1?.type))?.id ?? n.borderId;
	let l = e.borderSettings.colors.find((e) => e.label === i.border?.face1?.color || e.hex.toLowerCase() === String(i.border?.face1?.codeHex ?? "").toLowerCase());
	l && (n.borderColorId = l.id), n.fixingId = (a(e.fixings, r.fixingId) ?? e.fixings.find((e) => e.kind === i.fixingMethod?.type))?.id ?? n.fixingId;
	let u = e.thickness.find((t) => `${t.value} ${t.unit ?? e.unit}` === i.size?.thickness?.value || String(t.value) === String(i.size?.thickness?.value));
	u && (n.thicknessId = u.id);
	for (let r of Array.isArray(t?.additionalOptions) ? t.additionalOptions : []) {
		let t = e.inputs.find((e) => e.label === r.label);
		t && (t.kind === "yes-no" ? n.inputs[t.id] = r.value === t.yes : t.kind === "dropdown" || t.kind === "cards" ? n.inputs[t.id] = String(r.value) : t.kind === "note" && (n.inputs[t.id] = String(r.value ?? "")));
	}
	let d = Cr(e, n), f = Array.isArray(t?.price?.array) ? t.price.array : [], p = (e) => Number(f.find((t) => t.type === "image" && t.name === e)?.price ?? 0) || 0;
	return n.objects = [...ih(e, t?.template?.face1, "front", d, p), ...ih(e, t?.template?.face2, "back", d, p)], n.doubleSided = !!(e.doubleSided && n.objects.some((e) => e.face === "back")), yr(e, n);
}
function oh(e, t, n) {
	let r = Cr(e, t), i = ed(r.width, r.height, e.unit), a = i.pxPerUnit, o = i.width / 2, s = i.height / 2, c = (t) => e.fonts.find((e) => e.id === t), l = [{
		type: "rect",
		name: "safeObject",
		id: 0,
		left: o,
		top: s,
		originX: "center",
		originY: "center",
		width: i.width,
		height: i.height,
		fill: "#ffffff",
		selectable: !1
	}];
	for (let e of t.objects.filter((e) => e.face === n)) {
		let t = {
			left: o + e.x * a,
			top: s + e.y * a,
			originX: "center",
			originY: "center",
			angle: e.rotation
		};
		e.type === "text" ? l.push({
			...t,
			type: "i-text",
			name: "aso-SignText",
			id: e.id,
			text: e.text,
			fontSize: 40,
			scaleX: e.size * a / 40,
			scaleY: e.size * a / 40,
			fill: e.color,
			fontFamily: c(e.fontId)?.label ?? "Arial",
			originalFontFamily: c(e.fontId)?.label ?? "Arial",
			fontFamilyUrl: c(e.fontId)?.url ?? "",
			fontWeight: e.bold ? "bold" : "normal",
			fontStyle: e.italic ? "italic" : "normal",
			underline: e.underline,
			linethrough: e.strike,
			overline: !!e.overline,
			textAlign: e.align,
			curveIntensity: e.curve
		}) : e.type === "image" ? l.push({
			...t,
			type: "image",
			name: "aso-SignImage",
			id: e.id,
			src: e.src,
			imageUrl: e.src,
			width: e.width * a,
			height: e.height * a,
			scaleX: 1,
			scaleY: 1,
			flipX: !!e.flipX,
			flipY: !!e.flipY
		}) : l.push({
			...t,
			type: "image",
			name: "aso-QRCode",
			id: e.id,
			fromData: e.value,
			color: {
				dark: e.color,
				light: "#ffffff"
			},
			width: e.size * a,
			height: e.size * a,
			scaleX: 1,
			scaleY: 1
		});
	}
	return {
		version: "5.3.0",
		objects: l
	};
}
function sh(e, t, n) {
	let { config: r, design: i, price: a } = e, o = Cr(r, i), s = r.shapes.find((e) => e.id === i.shapeId), c = r.borders.find((e) => e.id === i.borderId), l = r.fixings.find((e) => e.id === i.fixingId), u = t.sign, d = (e) => e && "face1" in e ? e : {
		face1: e,
		face2: e
	};
	return {
		templateData: {
			version: 2,
			materialType: "simple",
			options: {
				materialId: i.materialId,
				sizeId: i.sizeId,
				shapeId: i.shapeId,
				colorId: {
					face1: i.colorId,
					face2: i.colorId
				},
				borderId: {
					face1: i.borderId,
					face2: i.borderId
				},
				fixingId: i.fixingId
			},
			sign: {
				doubleFace: !!r.doubleSided,
				size: {
					width: String(o.width),
					height: String(o.height),
					maxChars: r.sizes.find((e) => e.id === i.sizeId)?.maxTextChar ?? -1,
					thickness: u?.size?.value?.thickness,
					ratioScale: ed(o.width, o.height, r.unit).pxPerUnit / {
						mm: 12,
						cm: 120,
						in: 300,
						m: 12e3,
						ft: 3600
					}[r.unit],
					unit: r.unit
				},
				shape: td(s?.kind ?? "rectangle"),
				color: d(u?.color?.value),
				border: d(u?.border?.value),
				fixingMethod: { type: l?.kind ?? "none" }
			},
			texts: t.texts?.value,
			images: t.images?.value,
			qrCodes: t.qrCodes?.value,
			designImages: t.designImages,
			template: {
				face1: oh(r, i, "front"),
				face2: oh(r, i, "back")
			},
			price: {
				value: n + a.unit,
				array: [],
				textAfter: r.texts.textAfterPrice ?? ""
			},
			additionalOptions: t.additionalOptions ?? t.additionnalOptions ?? [],
			border: c?.kind,
			v2: {
				version: 1,
				design: i
			}
		},
		cartData: {
			...t,
			basePrice: n,
			custom_price: a.unit,
			total_price: n + a.unit
		}
	};
}
//#endregion
//#region src/integrations/aso/share.ts
var ch = "aso_share", lh = 1, uh = () => typeof window < "u" ? window.asoShopifyNcpcApi ?? null : null, dh = () => typeof uh()?.shareConfiguration == "function";
function fh(e) {
	let t = new URLSearchParams(e).get(ch);
	return t && /^[\w-]{4,128}$/.test(t) ? t : null;
}
function ph(e, t) {
	let n = new URL(e);
	return n.searchParams.set(ch, t), n.toString();
}
var mh = (e, t) => ({
	_sign: {
		version: lh,
		configId: t
	},
	design: e
});
async function hh(e, t) {
	let n = uh();
	if (!n?.shareConfiguration) return null;
	let r = await n.shareConfiguration(mh(e, t));
	return r?.success && r.share_id ? ph(location.href, String(r.share_id)) : null;
}
async function gh(e) {
	let t = uh();
	if (!t?.getSharedConfiguration) return null;
	let n = await t.getSharedConfiguration(e).catch(() => null);
	return n?.success ? n.config ?? null : null;
}
function _h(e, t) {
	let n = e;
	return !n?._sign || !n.design || typeof n.design != "object" ? null : yr(t, {
		...Or(t),
		...n.design
	});
}
//#endregion
//#region src/aso.ts
var vh = (e) => ["templates", "templates-list"].includes(String(e.runtime?.mode ?? "")), yh = (e) => !!(e && ((e.currentConfig ?? e.configuration ?? e.config)?.data || vh(e)));
async function bh(e = window) {
	let t = [
		e.__asoConfiguratorData,
		e.__asoStorefrontRuntimeData,
		e.aso_configurator_data,
		e.ascwo_configurator_data,
		e.asowp_configurator_data
	].find(yh);
	if (t) return t;
	if (typeof e.aso_confiurator_dataFunction == "function") {
		let t = await e.aso_confiurator_dataFunction();
		if (yh(t)) return t;
	}
	return null;
}
var xh = [
	"fixing_methods_url",
	"fixing_methods_alt_url",
	"borders_url",
	"shapes_url",
	"filters_url",
	"fonts_url",
	"uploads_url",
	"default_files_url",
	"asset_images_url",
	"images_url"
];
function Sh(e) {
	let t = Object.fromEntries(xh.map((t) => [t, typeof e[t] == "string" ? e[t] : ""]).filter(([, e]) => e)), n = /^(.*)\/images\/[^/]+\/?$/.exec(t.fixing_methods_url ?? t.borders_url ?? "");
	return {
		...n ? Fn(n[1].replace(/\/assets$/, "")) : Pn,
		...t
	};
}
async function Ch(e, t) {
	let n = String(e.ascwo_data?.rest_url || `${location.origin}/wp-json/ascwo/v1`).replace(/\/$/, ""), r = e.ascwo_data?.rest_nonce ?? "", i = await fetch(`${n}/configs/${encodeURIComponent(t)}/preview`, {
		credentials: "same-origin",
		headers: r ? { "X-WP-Nonce": r } : {}
	}).catch(() => null), a = i?.ok ? await i.json().catch(() => null) : null;
	if (!yh(a ?? void 0)) return null;
	let o = a.currentConfig ?? a.configuration ?? a.config;
	return o && o.id === void 0 && (o.id = Number(t) || t), {
		...e.ascwo_configurator_data ?? {},
		...a
	};
}
function wh() {
	let e = () => {
		for (let e of ["aso-frontend-app", "ascwo-frontend-app"]) {
			let t = document.getElementById(e);
			t && !t.dataset.scMounted && (t.dataset.scMounted = "true", Th(t).catch((e) => console.error("[sign-configurator]", e)));
		}
	};
	e(), new MutationObserver(e).observe(document.documentElement, {
		childList: !0,
		subtree: !0
	});
}
async function Th(e) {
	let t = window, n = e.dataset.route ?? "", r = n === "templates" || t.ascwo_data?.page === "templates", i = !n && t.ascwo_data?.page === "admin" ? /#\/configuration\/(\d+)\/preview/.exec(location.hash)?.[1] ?? "" : "", a = e.dataset.configId && n !== "configurator" && n !== "templates" ? e.dataset.configId : i, o = (a ? await Ch(t, a) : null) ?? await bh(t) ?? (r && t.ascwo_templates ? { runtime: { mode: "templates" } } : null), s = "#aso-configurator-loader, .aso-configurator-loader, #ascwo-configurator-loader, .aso-loader-overlay", c = document.querySelector(s) !== null;
	c && Object.assign(e.style, {
		visibility: "hidden",
		height: "0",
		overflow: "hidden"
	});
	let l = (t) => {
		c && (Object.assign(e.style, {
			visibility: "",
			height: "",
			overflow: "",
			opacity: t ? "0" : ""
		}), t && (e.style.transition = "opacity 250ms ease", requestAnimationFrame(() => {
			e.style.opacity = "", setTimeout(() => e.style.transition = "", 260);
		})));
	}, u = (e = !1) => {
		document.querySelectorAll(s).forEach((e) => (e.parentElement?.classList.contains("bg-loader") ? e.parentElement : e).remove()), l(e);
	}, d = async () => {
		let t = e.shadowRoot?.querySelector("link[rel=\"stylesheet\"]"), n = t && !t.sheet ? new Promise((e) => {
			t.addEventListener("load", () => e(), { once: !0 }), t.addEventListener("error", () => e(), { once: !0 });
		}) : Promise.resolve(), r = document.fonts?.ready.then(() => void 0) ?? Promise.resolve();
		await Promise.race([Promise.all([n, r]), new Promise((e) => setTimeout(e, 1e4))]), await new Promise((e) => requestAnimationFrame(() => requestAnimationFrame(() => e()))), u(!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
	};
	if (!o) {
		u(), console.error("[sign-configurator] aucune configuration trouvée sur la page.");
		return;
	}
	let f = o.currentConfig ?? o.configuration ?? o.config, p = Number(o.decimals ?? o.nbDecimals ?? 2), m = /template-maker\/([^/]+)\/([^/?#]+)/.exec(location.hash), h = String(o.runtime?.route?.name || o.runtime?.routeName || ""), g = {
		preview: "preview",
		"template-maker": "template-maker",
		"option-configurator": "mini-preview",
		templates: "templates"
	}[n] ?? "", _ = String(e.dataset.asoMode !== "configurator" && e.dataset.asoMode || g || (i ? "preview" : "") || (r ? "templates" : "") || (h === "template-maker" ? h : "") || o.runtime?.mode || o.runtime?.renderMode || o.runtime?.page || (m ? "template-maker" : "")), v = e.id === "ascwo-frontend-app" || !!t.ascwo_data, y = {
		symbol: o.currencySymbol ?? "",
		position: o.currency_pos ?? "right",
		decimals: p,
		decimalSep: o.decimalSep ?? ".",
		thousandSep: o.thousandSep ?? ","
	}, b = o.productID ?? o.productId ?? "", x = f?.data?.settings, S = !!x?.generals?.product?.redirectToCheckOutPage;
	if (_ === "templates" || _ === "templates-list") {
		let n = t.ascwo_templates ?? o.templates ?? {}, r = {
			...n,
			templates: [
				n.templates,
				n.data,
				n.list
			].find(Array.isArray) ?? [],
			designPageUrl: n.designPageUrl || e.dataset.designPageUrl || ""
		};
		Jm(e, {
			data: r,
			themeColors: x?.themeColors,
			money: {
				...y,
				symbol: String(r.currencySymbol ?? y.symbol),
				position: String(r.currency_pos ?? y.position),
				decimals: Number(r.decimals ?? p),
				decimalSep: String(r.decimalSep ?? y.decimalSep),
				thousandSep: String(r.thousandSep ?? y.thousandSep)
			},
			assets: Sh(o),
			runtime: o,
			linkOptions: {
				siteUrl: String(t.ascwo_data?.site_url ?? o.site_url ?? ""),
				productId: b
			},
			onAddToCart: (e) => Am(e, {
				data: r,
				runtime: o,
				restUrl: t.ascwo_data?.rest_url,
				restNonce: t.ascwo_data?.rest_nonce,
				ajaxUrl: t.ascwo_data?.ajax_url ?? o.ajax_url,
				nonce: String(r.frontend_nonce ?? o.frontend_nonce ?? ""),
				productId: b,
				redirectToCheckOut: S
			})
		}), d();
		return;
	}
	if (!f) return u();
	let C = {
		...o.runtime ?? {},
		...e.dataset
	}, w = (...e) => e.map((e) => C[e]).find((e) => e != null && String(e) !== ""), ee = _ === "mini-preview" || w("componentRef", "asoComponentRef", "componentId", "asoComponentId", "optionId", "asoOptionId") ? Nm(f, {
		componentId: w("componentId", "asoComponentId"),
		componentRef: w("componentRef", "asoComponentRef"),
		optionId: w("optionId", "asoOptionId"),
		optionIndex: w("optionIndex", "asoOptionIndex")
	}) : null;
	if (ee) {
		let n = Pm(f, ee), r = n.data.requiredOptions.components.items[ee.componentIndex].options[ee.optionIndex], i = t.__asoPreviewParams, s = String(a || (n.id ?? "")), c = (e) => window.dispatchEvent(new CustomEvent(e.success ? "ascwo:option-configurator-saved" : "ascwo:option-configurator-save-error", { detail: { message: e.message } }));
		Ym(e, {
			configuration: n,
			managesData: o.managesData,
			preview: !0,
			money: y,
			assets: Sh(o),
			optionEditor: {
				optionId: ee.optionId,
				onSave: async (e, a) => {
					let l = Bm(r, Nn(n, o.managesData), e, a);
					if (!v) return Vm(s, ee, l, String(i?.token ?? o.token ?? ""));
					let u = await Um(String(t.ascwo_data?.rest_url || `${location.origin}/wp-json/ascwo/v1`), s, ee, l, t.ascwo_data?.rest_nonce ?? "");
					return c(u), u;
				}
			}
		}), d();
		return;
	}
	let T = o.templates ?? {}, te = T.template ?? {}, E = String(T.currentTemplateId || e.dataset.templateId || e.dataset.asoTemplateId || m?.[2] || te.id || te.templateId || ""), D = String(a || m?.[1] || (f.id ?? "")), O = v ? () => `${ne}/${D}/${E}` : () => `${ne}/${E}`, ne = String(t.ascwo_data?.template_api_url || o.template_api_url || "/api/templates").replace(/\/$/, ""), re = () => {
		let e = t.ascwo_data?.rest_nonce ?? "", n = String(t.ascwo_data?.accessToken ?? o.accessToken ?? o.token ?? "");
		return {
			"Content-Type": "application/json",
			...e ? { "X-WP-Nonce": e } : {},
			...n ? { "Aso-Access-Token": n } : {}
		};
	}, k = _ === "template-maker", A = T.template && Object.keys(T.template).length ? T.template : null;
	k && !A && E && (A = await fetch(O(), {
		credentials: "same-origin",
		headers: re()
	}).then((e) => e.ok ? e.json() : null).catch(() => null));
	let j = A?.data?.templateData, ie = !!(j && j.sign?.size), ae = k ? null : fh(location.search), oe = ae ? await gh(ae) : null, se = String(f.id ?? ""), ce = A && (k || T.designFromTemplate) ? th(A, o.regularPrice) : 0, M = o.templates ?? {}, le = Array.isArray(M.list) ? M.list : [], ue = f.data, de = !String(ue.materialType ?? f.materialType ?? "").toLowerCase().startsWith("adv"), fe = ue.settings?.customizerSign?.configOptions?.find((e) => e.type === "templates")?.active !== !1, pe = Sh(o), me = /* @__PURE__ */ new Map(), he = async (e, t) => {
		if (!me.has(t)) {
			let n = v ? `${ne}/${e}/${encodeURIComponent(t)}` : `${ne}/${encodeURIComponent(t)}`, r = await fetch(n, {
				credentials: "same-origin",
				headers: re()
			}).then((e) => e.ok ? e.json() : null);
			me.set(t, r);
		}
		return me.get(t) ?? null;
	}, ge = !k && de && fe && le.length ? {
		list: le.map((e, t) => ({
			id: String(e.id ?? e.templateId ?? t),
			name: String(e.name ?? ""),
			image: e.prevImg ? zn(Om(e.prevImg), pe) : void 0,
			categoryId: e.categoryId === void 0 ? void 0 : String(e.categoryId),
			size: e.recaps?.size || void 0
		})),
		categories: (M.categories ?? []).map((e) => ({
			value: String(e.value),
			name: String(e.name)
		})),
		labels: {
			description: String(M.buttons?.templatesSectionDescription ?? "") || void 0,
			all: String(M.buttons?.allTemplatesText ?? "") || void 0
		},
		load: async (e) => {
			let t = le.find((t) => String(t.id ?? t.templateId) === e.id), n = await he(String(t?.configId ?? D), e.id), r = n?.data?.templateData;
			return !r || !r.sign?.size ? null : {
				design: (e) => ah(e, r),
				basePrice: th(n, o.regularPrice)
			};
		}
	} : void 0;
	Ym(e, {
		configuration: f,
		managesData: o.managesData,
		preview: _ === "preview" || k,
		initialDesign: oe ? (e) => _h(oe, e) ?? (ie ? ah(e, j) : null) : ie ? (e) => {
			let t = ah(e, j);
			return T.designFromTemplate && E && !k ? {
				...t,
				template: {
					id: E,
					basePrice: ce
				}
			} : t;
		} : void 0,
		templates: ge,
		onShare: dh() && !k ? (e) => hh(e, se) : void 0,
		templateBasePrice: k ? 0 : ce,
		onSaveTemplate: k ? async (e) => {
			if (!E) return {
				success: !1,
				message: "Missing template id"
			};
			let { templateData: n, cartData: r } = sh(e, eh(e, { decimals: p }), ce);
			if (v) {
				let e = A ?? {}, t = await fetch(O(), {
					method: "PUT",
					credentials: "same-origin",
					headers: re(),
					body: JSON.stringify({
						...e,
						data: {
							...e.data ?? {},
							templateData: n,
							cartData: r
						}
					})
				}).catch(() => null), i = t ? await t.json().catch(() => ({})) : {};
				return {
					success: !(!t?.ok || i.success !== !0 && i.success !== "same"),
					message: i.message
				};
			}
			let i = await fetch(`${ne}/config/${E}`, {
				method: "POST",
				credentials: "same-origin",
				headers: re(),
				body: JSON.stringify({
					id: E,
					templateId: E,
					sessionId: String(t.ascwo_data?.sessionId ?? o.sessionId ?? ""),
					accessToken: String(t.ascwo_data?.accessToken ?? o.accessToken ?? o.token ?? ""),
					shop: String(t.Shopify?.shop ?? o.shop ?? ""),
					data: {
						templateData: n,
						cartData: r
					}
				})
			}).catch(() => null), a = i ? await i.json().catch(() => ({})) : {};
			return {
				success: !(!i?.ok || !a.success && a.status !== "success"),
				message: a.message
			};
		} : void 0,
		money: y,
		assets: Sh(o),
		onAddToCart: async (e) => gm({
			recaps: eh(e, { decimals: p }),
			productId: b,
			variation_id: b,
			quantity: e.quantity
		}, {
			ajaxUrl: t.ascwo_data?.ajax_url ?? o.ajax_url,
			nonce: o.frontend_nonce,
			redirectToCheckOut: S
		})
	}), d();
}
wh();
//#endregion
export { Sh as assetUrlsOf, wh as bootAso, bh as readRuntimeData };

//# sourceMappingURL=sign-configurator.js.map