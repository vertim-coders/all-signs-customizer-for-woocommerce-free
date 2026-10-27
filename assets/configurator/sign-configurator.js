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
}) : o, n)), d = (e) => a.call(e, "module.exports") ? e["module.exports"] : l(t({}, "__esModule", { value: !0 }), e), f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O = {}, k = [], A = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, j = Array.isArray;
function M(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function N(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function P(e, t, n) {
	var r, i, a, o = {};
	for (a in t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : o[a] = t[a];
	if (arguments.length > 2 && (o.children = arguments.length > 3 ? f.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) o[a] === void 0 && (o[a] = e.defaultProps[a]);
	return F(e, o, r, i, null);
}
function F(e, t, n, r, i) {
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
		__v: i ?? ++m,
		__i: -1,
		__u: 0
	};
	return i == null && p.vnode != null && p.vnode(a), a;
}
function I(e) {
	return e.children;
}
function ee(e, t) {
	this.props = e, this.context = t;
}
function te(e, t) {
	if (t == null) return e.__ ? te(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? te(e) : null;
}
function ne(e) {
	if (e.__P && e.__d) {
		var t = e.__v, n = t.__e, r = [], i = [], a = M({}, t);
		a.__v = t.__v + 1, p.vnode && p.vnode(a), pe(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? te(t), !!(32 & t.__u), i), a.__v = t.__v, a.__.__k[a.__i] = a, he(r, a, i), t.__e = t.__ = null, a.__e != n && re(a);
	}
}
function re(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), re(e);
}
function ie(e) {
	(!e.__d && (e.__d = !0) && g.push(e) && !ae.__r++ || _ != p.debounceRendering) && ((_ = p.debounceRendering) || v)(ae);
}
function ae() {
	try {
		for (var e, t = 1; g.length;) g.length > t && g.sort(y), e = g.shift(), t = g.length, ne(e);
	} finally {
		g.length = ae.__r = 0;
	}
}
function oe(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, _ = r && r.__k || k, v = t.length;
	for (c = se(n, t, _, c, v), d = 0; d < v; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && _[p.__i] || O, p.__i = d, g = pe(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && ve(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = ce(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && g !== void 0 ? c = g : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function se(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = F(null, o, null, null, null) : j(o) ? o = e.__k[a] = F(I, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = F(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = le(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = te(s)), ye(s, s));
	return r;
}
function ce(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = ce(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = te(e)), t = n.insertBefore(e.__e, t || null));
	do
		t = t && t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function le(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function ue(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || A.test(t) ? n : n + "px";
}
function de(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ue(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || ue(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(C, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? r ? n[S] = r[S] : (n[S] = w, e.addEventListener(t, a ? E : T, a)) : e.removeEventListener(t, a ? E : T, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function fe(e) {
	return function(t) {
		if (this.l) {
			var n = this.l[t.type + e];
			if (t[x] == null) t[x] = w++;
			else if (t[x] < n[S]) return;
			return n(p.event ? p.event(t) : t);
		}
	};
}
function pe(e, t, n, r, i, a, o, s, c, l) {
	var u, d, f, m, h, g, _, v, y, b, x, S, C, w, T, E, D = t.type;
	if (t.constructor !== void 0) return null;
	128 & n.__u && (c = !!(32 & n.__u), a = [s = t.__e = n.__e]), (u = p.__b) && u(t);
	n: if (typeof D == "function") {
		d = o.length;
		try {
			if (y = t.props, b = D.prototype && D.prototype.render, x = (u = D.contextType) && r[u.__c], S = u ? x ? x.props.value : u.__ : r, n.__c ? v = (f = t.__c = n.__c).__ = f.__E : (b ? t.__c = f = new D(y, S) : (t.__c = f = new ee(y, S), f.constructor = D, f.render = be), x && x.sub(f), f.state || (f.state = {}), f.__n = r, m = f.__d = !0, f.__h = [], f._sb = []), b && f.__s == null && (f.__s = f.state), b && D.getDerivedStateFromProps != null && (f.__s == f.state && (f.__s = M({}, f.__s)), M(f.__s, D.getDerivedStateFromProps(y, f.__s))), h = f.props, g = f.state, f.__v = t, m) b && D.getDerivedStateFromProps == null && f.componentWillMount != null && f.componentWillMount(), b && f.componentDidMount != null && f.__h.push(f.componentDidMount);
			else {
				if (b && D.getDerivedStateFromProps == null && y !== h && f.componentWillReceiveProps != null && f.componentWillReceiveProps(y, S), t.__v == n.__v || !f.__e && f.shouldComponentUpdate != null && !1 === f.shouldComponentUpdate(y, f.__s, S)) {
					t.__v != n.__v && (f.props = y, f.state = f.__s, f.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), k.push.apply(f.__h, f._sb), f._sb = [], f.__h.length && o.push(f), s = te(n);
					break n;
				}
				f.componentWillUpdate != null && f.componentWillUpdate(y, f.__s, S), b && f.componentDidUpdate != null && f.__h.push(function() {
					f.componentDidUpdate(h, g, _);
				});
			}
			if (f.context = S, f.props = y, f.__P = e, f.__e = !1, C = p.__r, w = 0, b) f.state = f.__s, f.__d = !1, C && C(t), u = f.render(f.props, f.state, f.context), k.push.apply(f.__h, f._sb), f._sb = [];
			else do
				f.__d = !1, C && C(t), u = f.render(f.props, f.state, f.context), f.state = f.__s;
			while (f.__d && ++w < 25);
			f.state = f.__s, f.getChildContext != null && (r = M(M({}, r), f.getChildContext())), b && !m && f.getSnapshotBeforeUpdate != null && (_ = f.getSnapshotBeforeUpdate(h, g)), T = u != null && u.type === I && u.key == null ? ge(u.props.children) : u, s = oe(e, j(T) ? T : [T], t, n, r, i, a, o, s, c, l), f.base = t.__e, t.__u &= -161, f.__h.length && o.push(f), v && (f.__E = f.__ = null);
		} catch (e) {
			if (o.length = d, t.__v = null, c || a != null) {
				if (e.then) {
					for (t.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling;) s = s.nextSibling;
					a != null && (a[a.indexOf(s)] = null), t.__e = s;
				} else if (a != null) for (E = a.length; E--;) N(a[E]);
			} else t.__e = n.__e;
			t.__k ?? (t.__k = n.__k || []), e.then || me(t), p.__e(e, t, n);
		}
	} else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = _e(n.__e, t, n, r, i, a, o, c, l);
	return (u = p.diffed) && u(t), 128 & t.__u ? void 0 : s;
}
function me(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(me));
}
function he(e, t, n) {
	for (var r = 0; r < n.length; r++) ve(n[r], n[++r], n[++r]);
	p.__c && p.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			p.__e(e, t.__v);
		}
	});
}
function ge(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : j(e) ? e.map(ge) : e.constructor === void 0 ? M({}, e) : null;
}
function _e(e, t, n, r, i, a, o, s, c) {
	var l, u, d, m, h, g, _, v = n.props || O, y = t.props, b = t.type;
	if (b == "svg" ? i = "http://www.w3.org/2000/svg" : b == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), a != null) {
		for (l = 0; l < a.length; l++) if ((h = a[l]) && "setAttribute" in h == !!b && (b ? h.localName == b : h.nodeType == 3)) {
			e = h, a[l] = null;
			break;
		}
	}
	if (e == null) {
		if (b == null) return document.createTextNode(y);
		e = document.createElementNS(i, b, y.is && y), s && (p.__m && p.__m(t, a), s = !1), a = null;
	}
	if (b == null) v === y || s && e.data == y || (e.data = y);
	else {
		if (a = b == "textarea" && y.defaultValue != null ? null : a && f.call(e.childNodes), !s && a != null) for (v = {}, l = 0; l < e.attributes.length; l++) v[(h = e.attributes[l]).name] = h.value;
		for (l in v) h = v[l], l == "dangerouslySetInnerHTML" ? d = h : l == "children" || l in y || l == "value" && "defaultValue" in y || l == "checked" && "defaultChecked" in y || de(e, l, null, h, i);
		for (l in y) h = y[l], l == "children" ? m = h : l == "dangerouslySetInnerHTML" ? u = h : l == "value" ? g = h : l == "checked" ? _ = h : s && typeof h != "function" || v[l] === h || de(e, l, h, v[l], i);
		if (u) s || d && (u.__html == d.__html || u.__html == e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
		else if (d && (e.innerHTML = ""), oe(t.type == "template" ? e.content : e, j(m) ? m : [m], t, n, r, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, o, a ? a[0] : n.__k && te(n, 0), s, c), a != null) for (l = a.length; l--;) N(a[l]);
		s && b != "textarea" || (l = "value", b == "progress" && g == null ? e.removeAttribute("value") : g != null && (g !== e[l] || b == "progress" && !g || b == "option" && g != v[l]) && de(e, l, g, v[l], i), l = "checked", _ != null && _ != e[l] && de(e, l, _, v[l], i));
	}
	return e;
}
function ve(e, t, n) {
	try {
		if (typeof e == "function") {
			var r = typeof e.__u == "function";
			r && e.__u(), r && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		p.__e(e, n);
	}
}
function ye(e, t, n) {
	var r, i;
	if (p.unmount && p.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || ve(r, null, t)), (r = e.__c) != null) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			p.__e(e, t);
		}
		r.base = r.__P = r.__n = null;
	}
	if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && ye(r[i], t, n || typeof e.type != "function");
	n || N(e.__e), e.__c = e.__ = e.__e = void 0;
}
function be(e, t, n) {
	return this.constructor(e, n);
}
function xe(e, t, n) {
	var r, i, a, o;
	t == document && (t = document.documentElement), p.__ && p.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], o = [], pe(t, e = (!r && n || t).__k = P(I, null, [e]), i || O, O, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? f.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, o), he(a, e, o), e.props.children = null;
}
function Se(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, ie(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + D++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
f = k.slice, p = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, m = 0, h = function(e) {
	return e != null && e.constructor === void 0;
}, ee.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = M({}, this.state);
	typeof e == "function" && (e = e(M({}, n), this.props)), e && M(n, e), e != null && this.__v && (t && this._sb.push(t), ie(this));
}, ee.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), ie(this));
}, ee.prototype.render = I, g = [], v = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, y = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, ae.__r = 0, b = Math.random().toString(8), x = "__d" + b, S = "__a" + b, C = /(PointerCapture)$|Capture$/i, w = 0, T = fe(!1), E = fe(!0), D = 0;
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
var Ce, we, Te, Ee, De = 0, Oe = [], ke = p, Ae = ke.__b, je = ke.__r, Me = ke.diffed, Ne = ke.__c, Pe = ke.unmount, Fe = ke.__;
function Ie(e, t) {
	ke.__h && ke.__h(we, e, De || t), De = 0;
	var n = we.__H || (we.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function L(e) {
	return De = 1, Le(Ye, e);
}
function Le(e, t, n) {
	var r = Ie(Ce++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Ye(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = we, !we.__f)) {
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
		we.__f = !0;
		var a = we.shouldComponentUpdate, o = we.componentWillUpdate;
		we.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, we.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Re(e, t) {
	var n = Ie(Ce++, 3);
	!ke.__s && Je(n.__H, t) && (n.__ = e, n.u = t, we.__H.__h.push(n));
}
function ze(e) {
	return De = 5, Be(function() {
		return { current: e };
	}, []);
}
function Be(e, t) {
	var n = Ie(Ce++, 7);
	return Je(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ve(e) {
	var t = we.context[e.__c], n = Ie(Ce++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(we)), t.props.value) : e.__;
}
function He() {
	var e = Ie(Ce++, 11);
	if (!e.__) {
		for (var t = we.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function Ue() {
	for (var e; e = Oe.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Ke), t.__h.some(qe), t.__h = [];
		} catch (n) {
			t.__h = [], ke.__e(n, e.__v);
		}
	}
}
ke.__b = function(e) {
	we = null, Ae && Ae(e);
}, ke.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Fe && Fe(e, t);
}, ke.__r = function(e) {
	je && je(e), Ce = 0;
	var t = (we = e.__c).__H;
	t && (Te === we ? (t.__h = [], we.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Ke), t.__h.some(qe), t.__h = [], Ce = 0)), Te = we;
}, ke.diffed = function(e) {
	Me && Me(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Oe.push(t) !== 1 && Ee === ke.requestAnimationFrame || ((Ee = ke.requestAnimationFrame) || Ge)(Ue)), t.__H.__.some(function(e) {
		e.u && (e.__H = e.u, e.u = void 0);
	})), Te = we = null;
}, ke.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Ke), e.__h = e.__h.filter(function(e) {
				return !e.__ || qe(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h && (e.__h = []);
			}), t = [], ke.__e(n, e.__v);
		}
	}), Ne && Ne(e, t);
}, ke.unmount = function(e) {
	Pe && Pe(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Ke(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && ke.__e(t, n.__v));
};
var We = typeof requestAnimationFrame == "function";
function Ge(e) {
	var t, n = function() {
		clearTimeout(r), We && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	We && (t = requestAnimationFrame(n));
}
function Ke(e) {
	var t = we, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), we = t;
}
function qe(e) {
	var t = we;
	e.__c = e.__(), we = t;
}
function Je(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Ye(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region node_modules/@preact/signals-core/dist/signals-core.module.js
var Xe = Symbol.for("preact-signals");
function Ze() {
	if (rt > 1) rt--;
	else {
		var e, t = !1;
		for ((function() {
			var e = st;
			for (st = void 0; e !== void 0;) {
				var t = e.S;
				if (t.v === e.v) for (var n = t.t; n !== void 0; n = n.x) n.i === e.i && (n.i = t.i);
				e = e.o;
			}
		})(); nt !== void 0;) {
			var n = nt;
			for (nt = void 0, it++; n !== void 0;) {
				var r = n.u;
				if (n.u = void 0, n.f &= -3, !(8 & n.f) && ft(n)) try {
					n.c();
				} catch (n) {
					t || (e = n, t = !0);
				}
				n = r;
			}
		}
		if (it = 0, rt--, t) throw e;
	}
}
function Qe(e) {
	if (rt > 0) return e();
	ot = ++at, rt++;
	try {
		return e();
	} finally {
		Ze();
	}
}
var $e, et = void 0;
function tt(e) {
	var t = et, n = $e;
	et = void 0, $e = void 0;
	try {
		return e();
	} finally {
		et = t, $e = n;
	}
}
var nt = void 0, rt = 0, it = 0, at = 0, ot = 0, st = void 0, ct = 0;
function lt(e) {
	if (et !== void 0) {
		var t = e.n;
		if (t === void 0 || t.t !== et) return t = {
			i: 0,
			S: e,
			p: et.s,
			n: void 0,
			t: et,
			e: void 0,
			x: void 0,
			r: t
		}, et.s !== void 0 && (et.s.n = t), et.s = t, e.n = t, 32 & et.f && e.S(t), t;
		if (t.i === -1) return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = et.s, t.n = void 0, et.s.n = t, et.s = t), t;
	}
}
function ut(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
ut.prototype.brand = Xe, ut.prototype.h = function() {
	return !0;
}, ut.prototype.S = function(e) {
	var t = this, n = this.t;
	n !== e && e.e === void 0 && (e.x = n, this.t = e, n === void 0 ? tt(function() {
		var e;
		(e = t.W) == null || e.call(t);
	}) : n.e = e);
}, ut.prototype.U = function(e) {
	var t = this;
	if (this.t !== void 0) {
		var n = e.e, r = e.x;
		n !== void 0 && (n.x = r, e.e = void 0), r !== void 0 && (r.e = n, e.x = void 0), e === this.t && (this.t = r, r === void 0 && tt(function() {
			var e;
			(e = t.Z) == null || e.call(t);
		}));
	}
}, ut.prototype.subscribe = function(e) {
	var t = this;
	return xt(function() {
		var n = t.value;
		tt(function() {
			return e(n);
		});
	}, { name: "sub" });
}, ut.prototype.valueOf = function() {
	return this.value;
}, ut.prototype.toString = function() {
	return this.value + "";
}, ut.prototype.toJSON = function() {
	return this.value;
}, ut.prototype.peek = function() {
	var e = this;
	return tt(function() {
		return e.value;
	});
}, Object.defineProperty(ut.prototype, "value", {
	get: function() {
		var e = lt(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set: function(e) {
		if (e !== this.v) {
			if (it > 100) throw Error("Cycle detected");
			(function(e) {
				rt !== 0 && it === 0 && e.l !== ot && (e.l = ot, st = {
					S: e,
					v: e.v,
					i: e.i,
					o: st
				});
			})(this), this.v = e, this.i++, ct++, rt++;
			try {
				for (var t = this.t; t !== void 0; t = t.x) t.t.N();
			} finally {
				Ze();
			}
		}
	}
});
function dt(e, t) {
	return new ut(e, t);
}
function ft(e) {
	for (var t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function pt(e) {
	for (var t = e.s; t !== void 0; t = t.n) {
		var n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function mt(e) {
	for (var t = e.s, n = void 0; t !== void 0;) {
		var r = t.p;
		t.i === -1 ? (t.S.U(t), r !== void 0 && (r.n = t.n), t.n !== void 0 && (t.n.p = r)) : n = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = r;
	}
	e.s = n;
}
function ht(e, t) {
	ut.call(this, void 0, t), this.x = e, this.s = void 0, this.g = ct - 1, this.f = 4;
}
ht.prototype = new ut(), ht.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === ct)) return !0;
	if (this.g = ct, this.f |= 1, this.i > 0 && !ft(this)) return this.f &= -2, !0;
	var e = et;
	try {
		pt(this), et = this;
		var t = this.x();
		(16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return et = e, mt(this), this.f &= -2, !0;
}, ht.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
	}
	ut.prototype.S.call(this, e);
}, ht.prototype.U = function(e) {
	if (this.t !== void 0 && (ut.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
	}
}, ht.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (var e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(ht.prototype, "value", { get: function() {
	if (1 & this.f) throw Error("Cycle detected");
	var e = lt(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} });
function gt(e, t) {
	return new ht(e, t);
}
function _t(e) {
	var t = e.m;
	if (e.m = void 0, typeof t == "function") {
		rt++;
		var n = et;
		et = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, vt(e), t;
		} finally {
			et = n, Ze();
		}
	}
}
function vt(e) {
	for (var t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, _t(e);
}
function yt(e) {
	if (et !== this) throw Error("Out-of-order effect");
	mt(this), et = e, this.f &= -2, 8 & this.f && vt(this), Ze();
}
function bt(e, t) {
	this.x = e, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name, $e && $e.push(this);
}
bt.prototype.c = function() {
	var e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		var t = this.x();
		typeof t == "function" && (this.m = t);
	} finally {
		e();
	}
}, bt.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, _t(this), pt(this), rt++;
	var e = et;
	return et = this, yt.bind(this, e);
}, bt.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = nt, nt = this);
}, bt.prototype.d = function() {
	this.f |= 8, 1 & this.f || vt(this);
}, bt.prototype.dispose = function() {
	this.d();
};
function xt(e, t) {
	var n = new bt(e, t);
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
var St, Ct, wt = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, Tt = [];
xt(function() {
	St = this.N;
})();
function Et(e, t) {
	p[e] = t.bind(null, p[e] || function() {});
}
function Dt(e) {
	if (Ct) {
		var t = Ct;
		Ct = void 0, t();
	}
	Ct = e && e.S();
}
function Ot(e) {
	var t = this, n = e.data, r = At(n);
	r.name = "ReactiveDom", r.value = n;
	var i = Be(function() {
		for (var e = t, n = t.__v; n = n.__;) if (n.__c) {
			n.__c.__$f |= 4;
			break;
		}
		var i = gt(function() {
			var e = r.value.value;
			return e === 0 ? 0 : !0 === e ? "" : e || "";
		}), a = gt(function() {
			return !Array.isArray(i.value) && !h(i.value);
		}), o = xt(function() {
			if (this.N = Nt, a.value) {
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
Ot.displayName = "ReactiveTextNode", Object.defineProperties(ut.prototype, {
	constructor: {
		configurable: !0,
		value: void 0
	},
	type: {
		configurable: !0,
		value: Ot
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
}), Et("__b", function(e, t) {
	if (Dt(), typeof t.type == "string") {
		var n, r = t.props;
		for (var i in r) if (i !== "children") {
			var a = r[i];
			a instanceof ut && (n || (t.__np = n = {}), n[i] = a, r[i] = a.peek());
		}
	}
	e(t);
}), Et("__r", function(e, t) {
	if (e(t), t.type !== I) {
		Dt();
		var n, r = t.__c;
		r && (r.__$f &= -2, (n = r.__$u) === void 0 && (r.__$u = n = function(e, t) {
			var n;
			return xt(function() {
				n = this;
			}, { name: t }), n.c = e, n;
		}(function(e) {
			return function() {
				var t;
				wt && ((t = this.y) == null || t.call(this)), e.__$f |= 1, e.setState({});
			};
		}(r), typeof t.type == "function" ? t.type.displayName || t.type.name : ""))), Dt(n);
	}
}), Et("__e", function(e, t, n, r) {
	Dt(), e(t, n, r);
}), Et("diffed", function(e, t) {
	Dt();
	var n;
	if (typeof t.type == "string" && (n = t.__e)) {
		var r = t.__np, i = t.props, a = n.U;
		if (a) for (var o in a) {
			var s = a[o];
			s === void 0 || r && o in r || (s.d(), a[o] = void 0);
		}
		if (r) for (var c in a || (a = {}, n.U = a), r) {
			var l = a[c], u = r[c];
			l === void 0 ? (l = kt(n, c, u, i), a[c] = l) : l.o(u, i);
		}
	}
	e(t);
});
function kt(e, t, n, r) {
	var i = t in e && e.ownerSVGElement === void 0, a = dt(n);
	return {
		o: function(e, t) {
			a.value = e, r = t;
		},
		d: xt(function() {
			this.N = Nt;
			var n = a.value.value;
			r[t] !== n && (r[t] = n, i ? e[t] = n : n != null && (!1 !== n || t[4] === "-") ? e.setAttribute(t, n) : e.removeAttribute(t));
		})
	};
}
Et("unmount", function(e, t) {
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
}), Et("__h", function(e, t, n, r) {
	r < 3 && (t.__$f |= 2), e(t, n, r);
}), ee.prototype.shouldComponentUpdate = function(e, t) {
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
function At(e, t) {
	return Be(function() {
		return dt(e, t);
	}, []);
}
var jt = function(e) {
	queueMicrotask(function() {
		queueMicrotask(e);
	});
};
function Mt() {
	Qe(function() {
		for (var e; e = Tt.shift();) St.call(e);
	});
}
function Nt() {
	Tt.push(this) === 1 && (p.requestAnimationFrame || jt)(Mt);
}
//#endregion
//#region src/styles/sign.css?url
var Pt = "" + new URL("sign-configurator.css", import.meta.url).href;
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/typeof.js
function Ft(e) {
	"@babel/helpers - typeof";
	return Ft = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Ft(e);
}
var It = o((() => {}));
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPrimitive.js
function Lt(e, t) {
	if (Ft(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Ft(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Rt = o((() => {
	It();
}));
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPropertyKey.js
function zt(e) {
	var t = Lt(e, "string");
	return Ft(t) == "symbol" ? t : t + "";
}
var Bt = o((() => {
	It(), Rt();
}));
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/defineProperty.js
function R(e, t, n) {
	return (t = zt(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var Vt = o((() => {
	Bt();
}));
//#endregion
//#region src/integrations/aso/mapConfig.ts
Vt();
var Ht = class extends Error {
	constructor(e) {
		super(e.join("\n")), R(this, "problems", void 0), this.problems = e;
	}
}, z = (e, t = 0) => {
	if (typeof e == "number") return Number.isFinite(e) ? e : t;
	let n = Number(String(e ?? "").trim().replace(",", "."));
	return String(e ?? "").trim() !== "" && Number.isFinite(n) ? n : t;
}, Ut = (e) => {
	let t = z(e, -1);
	return t > 0 ? t : null;
}, B = (e, t = "") => e == null ? t : String(e).trim() || t, V = (e) => Array.isArray(e) ? e : [], Wt = (e) => V(e).map((e) => String(e)).filter(Boolean), Gt = (e) => (e.visible ?? e.isVisible) !== !1, Kt = (e, t = "item") => String(e ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || t;
function qt(e) {
	let t = Math.max(0, e.findIndex((e) => e.isDefault));
	return e.map((e, n) => ({
		...e,
		isDefault: n === t
	}));
}
function Jt(e) {
	let t = typeof e.data == "string" ? JSON.parse(e.data) : e.data;
	if (!t || typeof t != "object") throw new Ht(["currentConfig.data est vide ou illisible"]);
	return t;
}
var Yt = (e) => e, H = (...e) => {
	for (let t of e) {
		let e = B(t);
		if (e) return Yt(e);
	}
}, Xt = [
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
], Zt = [
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
], Qt = [
	"none",
	"normal",
	"rounded-corners",
	"old-world"
], $t = {
	shape: "/images/shapes/ic_shape_",
	border: "/images/borders/ic_border_",
	fixing: "/images/fixing-methodes/ic_fixmethod_"
}, en = {
	"border-normal": "thin",
	"shape-rounded-square": "rounded",
	"fixing-cable-labeling": "cable_label"
}, tn = (e, t) => `${$t[e]}${en[`${e}-${t}`] ?? t.replace(/-/g, "_")}.svg`;
function nn(e, t, n, r) {
	let i = V(e).map((e, r) => {
		let i = Kt(n(e), String(r)), a = B(e.id), o = `${t}-${i}`;
		return {
			id: !a || a === `fixing-method-${i}` ? o : a,
			key: i,
			index: r,
			icon: H(e.icon, e.url, e.previewImg),
			popupImage: H(e.popupImage, e.popImg)
		};
	});
	return i.length ? i : r.map((e, n) => ({
		id: `${t}-${e}`,
		key: e,
		index: n,
		icon: H(tn(t, e))
	}));
}
var rn = (e) => e === "stand-off" ? "standoff" : e;
function an(e, t) {
	let n = B(e);
	if (!n) return null;
	if (/^\d+$/.test(n)) return t.find((e) => e.index === Number(n)) ?? null;
	for (let e of [n, n.replace(/^fixing-method-/, "fixing-").replace(/^border-border-/, "border-")]) {
		let n = t.find((t) => t.id === e);
		if (n) return n;
		let r = rn(e.replace(/^(shape|fixing|border)-/, "")), i = t.find((e) => rn(e.key) === r);
		if (i) return i;
		let a = /^(?:shape|fixing|border)-(?:method-)?\s*(\d+)$/.exec(e);
		if (a) {
			let e = t.find((e) => e.index === Number(a[1]));
			if (e) return e;
		}
	}
	return null;
}
function on(e) {
	return {
		shapes: nn(e?.allShapes, "shape", (e) => e.value ?? e.name ?? e.key ?? e.id, Xt),
		fixings: nn(e?.allFixingMethods, "fixing", (e) => e.type ?? e.name ?? e.key ?? e.id, Zt),
		borders: nn(e?.allBorders ?? e?.borders, "border", (e) => e.value ?? e.name ?? e.key ?? e.id, Qt)
	};
}
var sn = /* @__PURE__ */ new Set([
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
]), cn = /* @__PURE__ */ new Set([
	"none",
	"normal",
	"rounded-corners",
	"old-world"
]), ln = (e) => e && sn.has(e.key) ? e.key : "rectangle", un = (e) => e && cn.has(e.key) ? e.key : "normal", dn = (e) => e ? rn(e.key) : "none";
function fn(e, t, n) {
	let r = (e) => e == null || e === "" ? null : z(e), i = n, a = n?.unit;
	return {
		id: e,
		label: t,
		type: B(n?.type),
		ranges: V(n?.range).map((e) => ({
			surface: r(e.surface),
			size: r(e.size),
			basePrice: z(e.basePrice ?? e.price ?? e.additionalPrice),
			charPrice: r(e.charPrice),
			startPriceAtChar: r(e.startPriceAtChar),
			maxTextChar: r(e.maxTextChar),
			perRange: typeof e.perRange == "boolean" ? e.perRange : null
		})),
		unit: a ? {
			surface: z(a.surface),
			areaFactor: z(a.areaConversionFactor),
			basePrice: z(a.basePrice),
			charPrice: r(a.charPrice)
		} : null,
		perUnit: n?.rangePricingPerUnit === !0,
		flatPrice: z(i?.basePrice ?? i?.price ?? i?.additionalPrice)
	};
}
function pn(e) {
	return {
		kind: e?.type === "base" || e?.type === "multiplier" ? e.type : "none",
		value: z(e?.value)
	};
}
var mn = {
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
function hn(e, t) {
	let n = e.mode === "simple", r = e.sizes.length > 0 || e.customSize !== null, i = {
		material: e.materials.length > 1 || !n,
		component: !n && e.components.length > 0,
		size: n && r,
		shape: n && e.shapes.length > 0,
		fixing: n && e.fixings.length > 0,
		border: n && e.borders.length > 0,
		color: n && r && e.colors.length > 0,
		lighting: e.lightingEnabled && e.lightings.length > 0,
		text: n && r,
		qrcode: !n || r,
		image: n && r && (e.images.upload || e.images.cliparts),
		options: e.inputs.length > 0,
		addons: n && e.addons.length > 0,
		templates: !1
	}, a = [...t];
	if (!a.some((e) => mn[e.type] === "lighting")) {
		let e = a.findIndex((e) => e.type === "colors");
		a.splice(e >= 0 ? e + 1 : a.length, 0, {
			type: "lightings",
			active: !0
		});
	}
	let o = [];
	for (let e of a) {
		let t = mn[e.type];
		t && e.active && i[t] && !o.includes(t) && (o.push(t), t === "material" && i.component && o.push("component"));
	}
	return i.component && !o.includes("component") && o.unshift("component"), o;
}
function gn(e) {
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
		customCss: B(e?.customCss)
	};
}
function _n(e) {
	let t = {
		small: z(e?.small),
		medium: z(e?.medium),
		large: z(e?.large)
	};
	return t.small || t.medium || t.large ? t : {
		small: 10,
		medium: 20,
		large: 30
	};
}
function vn(e, t) {
	let n = e.custom === !0 && B(e.url) !== "", r = an(e.shapeId ?? e.id, t.shapes);
	return {
		id: B(e.id) || r?.id || "shape",
		label: B(e.label, "Shape"),
		image: H(r?.icon, e.icon, e.url, e.previewImg),
		popupImage: H(r?.popupImage, e.popImg),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault,
		kind: n ? "custom" : ln(r),
		svgUrl: n ? H(e.url) : void 0,
		priceBySurface: e.enablePricingBySurface === !0 ? { surface: z(e.surface) } : null,
		excludeMaterials: Wt(e.excludeMaterials),
		outlineSizes: _n(e.shapeSize)
	};
}
function yn(e, t) {
	let n = e.custom === !0 && B(e.url) !== "", r = an(e.borderId ?? e.manageBorderId ?? e.id, t.borders);
	return {
		id: B(e.id) || r?.id || "border",
		label: B(e.label, "Border"),
		description: B(e.description) || void 0,
		image: H(r?.icon, e.icon, e.url, e.previewImg),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault,
		kind: n ? "custom" : un(r),
		svgUrl: n ? H(e.url) : void 0,
		excludeSizes: Wt(e.excludeSizes),
		excludeShapes: Wt(e.excludeShapes)
	};
}
function bn(e, t) {
	let n = (e.mode === "custom" || e.custom === !0) && B(e.url || e.previewImg) !== "", r = an(e.fixingMethodId ?? e.id, t.fixings);
	return {
		id: B(e.id) || r?.id || "fixing",
		label: B(e.label, "Fixing"),
		description: B(e.description) || void 0,
		image: H(r?.icon, e.icon, e.url, e.previewImg),
		popupImage: H(r?.popupImage, e.popImg),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault,
		kind: n ? "custom" : dn(r),
		svgUrl: n ? H(e.url, e.previewImg) : void 0,
		count: z(e.fixingCount),
		excludeMaterials: Wt(e.excludeMaterials),
		excludeSizes: Wt(e.excludeSizes),
		excludeShapes: Wt(e.excludeShapes)
	};
}
function xn(e, t) {
	let n = !!(e.pattern?.active && B(e.pattern?.url));
	return {
		id: B(e.id) || `color-${Kt(e.name, String(t))}`,
		label: B(e.name, "Color"),
		image: H(e.prevImg),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault,
		hex: B(e.pattern?.codeHex, "#ffffff"),
		patternUrl: n ? H(e.pattern.url) ?? null : null,
		textColor: e.textColor?.active ? {
			hex: B(e.textColor.codeHex, "#000000"),
			name: B(e.textColor.name),
			sameForBorder: !!e.textColor.sameForBorder
		} : null,
		excludeMaterials: Wt(e.excludeMaterials)
	};
}
var Sn = (e, t, n) => e && e[t] !== void 0 ? e[t] !== !1 : !n, Cn = (e, t, n, r) => {
	if (e) {
		if (e[t] === !1) return !1;
		if (e[n] !== void 0) return e[n] !== !1;
		if (e[t] !== void 0) return !0;
	}
	return !r;
}, wn = (e) => {
	let t = e.permissions, n = e;
	return {
		edit: Sn(t, "editText", n.lockTextEdit),
		font: Sn(t, "changeFont", n.lockFont || n.loctFont || n.lockFontFamily),
		color: t?.changeColor !== !1,
		resize: Sn(t, "resizeText", n.lockScale === !0),
		moveX: Cn(t, "moveText", "moveTextX", n.lockMove?.x === !0),
		moveY: Cn(t, "moveText", "moveTextY", n.lockMove?.y === !0),
		rotate: Sn(t, "rotateText", n.lockRotate === !0),
		flipX: t?.flipHorizontally !== !1,
		flipY: t?.flipVertically !== !1
	};
};
function Tn(e, t) {
	let n = (e) => {
		let t = V(e);
		return {
			ids: t.map((e) => B(e.id)).filter(Boolean),
			def: t.find((e) => e.isDefault)?.id
		};
	}, r = n(e.sizes?.items), i = n(e.shapes?.items), a = n(e.borders?.items), o = n(e.fixingMethods?.items), s = n(e.backgrounds?.items), c = V(e.lightings?.items).map((e) => {
		let n = t.get(e.id);
		return {
			id: e.id,
			label: B(e.label ?? n?.label, "Light"),
			hex: B(e.hexCode ?? n?.hex, "#ffffff"),
			price: z(e.additionalPrice ?? n?.price),
			isDefault: !!e.isDefault
		};
	}), l = V(e.textZones).map((e) => ({
		id: e.id,
		label: B(e.label, "Text"),
		value: String(e.value ?? ""),
		fontLabel: B(e.defaultFont),
		fontSize: z(e.fontSize, 24),
		color: B(e.color, "#000000"),
		align: e.textAlign ?? "center",
		bold: !!e.bold,
		italic: !!e.italic,
		required: !!e.required,
		minChars: Ut(e.minCharacters ?? e.minChar),
		maxChars: Ut(e.maxCharacters ?? e.maxChar),
		x: z(e.x),
		y: z(e.y),
		percent: e.measure === "percent",
		can: wn(e)
	})), u = V(e.imageZones).map((e) => {
		let t = e.permissions, n = t, r = e, i = e.allowedFiles ? Object.entries(e.allowedFiles).filter(([, e]) => e).map(([e]) => e) : [
			"svg",
			"png",
			"jpeg",
			"webp"
		];
		return {
			id: e.id,
			label: B(e.label, "Image"),
			image: H(e.image) ?? "",
			tint: B(e.tint) || null,
			fit: e.fitMode ?? "contain",
			lockRatio: e.lockAspectRatio !== !1,
			required: !!e.required,
			width: z(e.width, 30),
			height: z(e.height, 30),
			x: z(e.x),
			y: z(e.y),
			percent: e.measure === "percent",
			allowedTypes: i,
			maxFileSizeMb: Ut(e.maxFileSizeMb),
			can: {
				replace: t?.replaceImage !== !1,
				resize: Sn(n, "resizeImage", r.lockScale === !0),
				moveX: Cn(n, "moveImage", "moveImageX", r.lockMove?.x === !0),
				moveY: Cn(n, "moveImage", "moveImageY", r.lockMove?.y === !0),
				rotate: Sn(n, "rotateImage", r.lockRotate === !0),
				flipX: t?.flipHorizontally !== !1,
				flipY: t?.flipVertically !== !1
			}
		};
	}), d = (e) => V(e).filter((e) => e.custom === !0 && B(e.url)), f = (e, t, n) => ({
		id: B(e.id) || `${n}-${t}`,
		label: B(e.label, n),
		description: B(e.description) || void 0,
		image: H(e.previewImg, e.icon, e.url),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault
	}), p = d(e.shapes?.items).map((e, t) => ({
		...f(e, t, "custom-shape"),
		kind: "custom",
		svgUrl: H(e.url),
		priceBySurface: null,
		excludeMaterials: []
	})), m = d(e.borders?.items).map((e, t) => ({
		...f(e, t, "custom-border"),
		kind: "custom",
		svgUrl: H(e.url),
		excludeSizes: Wt(e.excludeSizes),
		excludeShapes: Wt(e.excludeShapes)
	})), h = d(e.fixingMethods?.items).map((e, t) => ({
		...f(e, t, "custom-fixing"),
		kind: "custom",
		svgUrl: H(e.url),
		count: z(e.fixingCount),
		excludeMaterials: [],
		excludeSizes: Wt(e.excludeSizes),
		excludeShapes: Wt(e.excludeShapes)
	}));
	return {
		id: B(e.id),
		label: B(e.label, "Design"),
		description: B(e.description) || void 0,
		image: H(e.image, e.icon),
		price: z(e.overrides?.additionalPrice ?? e.additionalPrice),
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
function En(e, t) {
	let n = {
		index: t,
		id: B(e.id) || `input-${t}`,
		label: B(e.label, "Option"),
		description: B(e.description) || void 0
	}, r = H(e.popupImg);
	switch (e.type) {
		case "yes/no": return {
			kind: "yes-no",
			...n,
			popupImage: r,
			yes: B(e.inputs?.yes, "Yes"),
			no: B(e.inputs?.no, "No"),
			default: e.default === "yes",
			price: pn(e.price)
		};
		case "dropdown": return {
			kind: "dropdown",
			...n,
			popupImage: r,
			options: V(e.options).map((e, t) => ({
				value: B(e.value, String(t)),
				label: B(e.label, String(t)),
				popupImage: H(e.popupImg),
				price: pn(e.price)
			}))
		};
		case "image-input": return {
			kind: "cards",
			...n,
			popupImage: r,
			options: V(e.options).map((e, t) => ({
				value: B(e.value, String(t)),
				label: B(e.label, String(t)),
				image: H(e.previewImg),
				color: B(e.color) || void 0,
				popupImage: H(e.popupImg),
				price: pn(e.price)
			}))
		};
		case "note": return {
			kind: "note",
			...n,
			maxChars: Ut(e.noteLimitChar)
		};
		case "include-type": return {
			kind: "included",
			...n,
			popupImage: r,
			price: pn(e.price)
		};
		default: return null;
	}
}
var Dn = /* @__PURE__ */ new Set([
	"mm",
	"cm",
	"m",
	"in",
	"ft"
]), On = /^(arial|helvetica|times( new roman)?|verdana|georgia|tahoma|courier( new)?)$/i;
function kn(e, t) {
	if (!t || !On.test(e.trim())) return e;
	let n = decodeURIComponent(t.split(/[?#]/)[0].split("/").pop() ?? "").replace(/\.(ttf|otf|woff2?)$/i, ""), r = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, "");
	if (!n || r(n).includes(r(e))) return e;
	let i = n.replace(/[-_ ]?(regular|normal|book)$/i, "").replace(/[-_]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
	return i ? i.charAt(0).toUpperCase() + i.slice(1) : e;
}
function An(e, t, n = {}) {
	Yt = n.resolveAsset ?? ((e) => e);
	let r = Jt(e), i = [];
	if (r.settings || i.push("data.settings manquant"), r.requiredOptions || i.push("data.requiredOptions manquant (ancien format non pris en charge)"), i.length) throw new Ht(i);
	let a = r.settings, o = r.requiredOptions, s = r.additionalOptions ?? {}, c = a.customizerSign, l = c?.customizerOptions, u = a.languageImages?.visualizer ?? {}, d = a.languageImages?.images ?? {}, f = B(r.materialType ?? e.materialType).toLowerCase().startsWith("adv") ? "advance" : "simple", p = V(o.pricings?.items).map((e, t) => fn(B(e.id) || `pricing-${Kt(e.label ?? t, `p-${t}`)}`, B(e.label, `Pricing ${t + 1}`), e.customPricing)), m = qt(V(s.materials?.items).filter((e) => e.active !== !1).map((e, t) => ({
		id: B(e.id) || `material-${t}`,
		label: B(e.label, `Material ${t + 1}`),
		description: B(e.description) || void 0,
		image: H(e.previewImg, e.image),
		popupImage: H(e.popupImg, e.popupImage, e.popImg),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault,
		pricingId: B(e.pricingId) || null,
		excludeComponentIds: Wt(e.excludeComponentIds)
	}))), h = qt(V(o.sizes?.items).map((e, t) => ({
		id: B(e.id) || `size-${t}`,
		label: B(e.label, `${e.width} x ${e.height}`),
		price: 0,
		isDefault: !!e.isDefault,
		width: z(e.width),
		height: z(e.height, z(e.width)),
		maxTextChar: Ut(e.maxTextChar),
		maxLines: Ut(e.numberOfLines ?? e.textNumber),
		excludeMaterials: Wt(e.excludeMaterials)
	}))), g = o.sizes?.customSize ?? o.sizes?.settings?.customSize, _ = g?.active ? {
		width: {
			label: B(g.width?.label, "Width"),
			min: z(g.width?.min),
			max: z(g.width?.max, 1e3)
		},
		height: {
			label: B(g.height?.label, "Height"),
			min: z(g.height?.min),
			max: z(g.height?.max, 1e3)
		},
		hidePresets: !!g.hideSizes,
		pricing: g.pricings ? fn("custom-size", "Custom size", g.pricings) : null
	} : null, v = o.sizes?.thickness?.active ? o.sizes.thickness : o.sizes?.settings?.thickness ?? o.sizes?.thickness, y = V(v?.values).length ? V(v?.values) : V(v?.items), b = B(v?.unit).toLowerCase(), x = Dn.has(b) ? b : void 0, S = o.sizes?.orientationSwitcher ?? o.sizes?.settings?.orientationSwitcher, C = S && (S.active === !0 || S.enabled === !0) ? {
		label: B(S.label),
		portrait: B(S.portraitLabel),
		landscape: B(S.landscapeLabel),
		default: S.default === "landscape" ? "landscape" : "portrait"
	} : null, w = v?.active ? y.map((e, t) => {
		let n = typeof e == "object" && e ? e : {
			label: String(e),
			value: e
		};
		return {
			id: `thickness-${t}`,
			label: B(n.label, String(n.value ?? "")),
			value: z(n.value),
			pricingType: n.pricingType === "multiplier" ? "multiplier" : "additional",
			price: z(n.additionalPrice),
			multiplier: z(n.multiplier, 1),
			...x ? { unit: x } : {}
		};
	}) : [], T = on(t), E = qt(V(o.shapes?.items).filter(Gt).map((e) => vn(e, T))), D = qt(V(o.borders?.items).filter(Gt).map((e) => yn(e, T))), O = qt(V(o.fixingMethods?.items).filter(Gt).map((e) => bn(e, T))), k = qt(V(o.colors?.items).map(xn)), A = qt(V(o.lightings?.items).map((e, t) => ({
		id: B(e.id) || `lighting-${t}`,
		label: B(e.label, "Light"),
		price: z(e.additionalPrice),
		isDefault: !!e.isDefault,
		hex: B(e.hexCode, "#ffffff")
	}))), j = new Map(A.map((e) => [e.id, e])), M = (e) => String(e.managedFontId ?? e.id), N = V(o.fonts?.items), P = Wt(c?.text?.selectedFonts), F = P.length > 0 && N.some((e) => P.includes(M(e))), I = new Map(V(t?.fonts).map((e) => [String(e.id), e])), ee = qt(N.filter((e) => !F || P.includes(M(e))).map((e, t) => {
		let n = B(e.label, "Arial"), r = kn(n, B(e.url) || B(I.get(String(e.managedFontId))?.url));
		return {
			id: B(e.id) || `font-${t}`,
			label: n,
			...r === n ? {} : { display: r },
			url: H(e.url, I.get(String(e.managedFontId))?.url) ?? "",
			isDefault: !!e.isDefault
		};
	})), te = f === "advance" ? V(o.components?.items).filter((e) => e.isVisible !== !1).map((e, t) => ({
		id: B(e.id) || `component-${t}`,
		label: B(e.label, "Component"),
		description: B(e.description) || void 0,
		icon: H(e.icon),
		isDefault: !!e.isDefault,
		options: qt(V(e.options).map((e) => Tn(e, j)))
	})) : [], ne = f === "simple" ? V(s.components?.items).map((e, t) => ({
		id: B(e.id) || `addon-${t}`,
		label: B(e.title, "Option"),
		description: B(e.description) || void 0,
		icon: H(e.icon),
		options: qt(V(e.options).map((n, r) => ({
			id: `${B(e.id) || `addon-${t}`}-${r}`,
			label: B(n.title, `Option ${r + 1}`),
			description: B(n.description) || void 0,
			image: H(n.image, n.icon),
			popupImage: H(n.popupImg),
			price: z(n.additionalPrice),
			isDefault: !!n.isDefault,
			priceBySurface: n.enablePricingBySurface === !0 ? { surface: z(n.surface) } : null,
			excludeColorIds: Wt(n.excludeColors)
		}))),
		disabledForMaterials: Object.entries(e.rulesByMaterial ?? {}).filter(([, e]) => e && e.enabled === !1).map(([e]) => e)
	})) : [], re = V(s.inputs?.items).map(En).filter((e) => e !== null), ie = c?.text ?? {}, ae = c?.images ?? {}, oe = ie.enableFontSize, se = c?.signPart?.doublePart, ce = a.generals ?? {}, le = ce.discounts, ue = ce.quantityLimits, de = ue?.enableQuantityLimits === !0 || ue?.enableQuantityLimits === "on", fe = B(l?.measurementUnit, "cm").toLowerCase(), pe = B(l?.showHideMeasurements, "both").toLowerCase(), me = V(t?.cliparts).map((e, t) => ({
		id: B(e.id, String(t)),
		title: B(e.title, `Cliparts ${t + 1}`),
		description: B(e.description) || void 0,
		items: V(e.cliparts).map((e, n) => ({
			id: B(e.id, `${t}-${n}`),
			title: B(e.title),
			url: H(e.url) ?? "",
			price: z(e.additionalPrice)
		})).filter((e) => e.url)
	})), he = {
		id: B(e.id, "aso"),
		name: B(e.name),
		mode: f,
		productType: B(r.productType ?? e.productType, "signs-panels"),
		skin: a.themeColors?.skin === "couffo" ? "couffo" : "default",
		unit: Dn.has(fe) ? fe : "cm",
		unitSwitcher: (() => {
			let e = o.sizes?.unitSwitcher ?? o.sizes?.settings?.unitSwitcher;
			if (e?.enabled !== !0) return null;
			let t = Dn.has(fe) ? fe : "cm", n = [.../* @__PURE__ */ new Set([t, ...V(e.units).map((e) => String(e).toLowerCase())])].filter((e) => Dn.has(e));
			return n.length > 1 ? {
				label: B(e.label),
				units: n
			} : null;
		})(),
		decimals: B(l?.decimalFormatMeasurements, "with-decimal") !== "without-decimal",
		measurements: pe.includes("none") ? "none" : pe.includes("width") ? "width" : pe.includes("height") ? "height" : "both",
		panelSide: B(l?.desktopColumnOrder, "right") === "left" ? "left" : "right",
		finishPosition: l?.finishButtonPosition === "top" ? "top" : "bottom",
		sectionLabels: {
			material: B(s.materials?.label) || B(u.textMaterial),
			component: B(o.components?.settings?.label) || B(o.components?.label),
			size: B(u.textSize) || B(o.sizes?.label),
			shape: B(u.textShape) || B(o.shapes?.label),
			fixing: B(u.textFixingMethods) || B(o.fixingMethods?.label),
			border: B(u.textBorder) || B(o.borders?.label),
			color: B(u.textColor) || B(o.colors?.label),
			lighting: B(o.lightings?.label),
			text: B(u.textOptionText),
			image: B(u.textImage),
			options: B(u.textAdditonnalOptionsHeader) || B(s.inputs?.label),
			addons: B(s.components?.label)
		},
		sectionIcons: {
			material: H(d.changeIconMaterial),
			size: H(d.changeIconSize),
			shape: H(d.changeIconShape),
			fixing: H(d.changeIconFixingMethod),
			border: H(d.changeIconBorder),
			color: H(d.changeIconColor),
			text: H(d.changeIconText),
			image: H(d.changeIconImage),
			qrcode: H(d.changeIconQrCode),
			component: H(o.components?.settings?.tabIcon)
		},
		materials: m,
		pricingProfiles: p,
		sizes: _?.hidePresets ? [] : h,
		customSize: _,
		orientation: C,
		thickness: w,
		shapes: E,
		borders: D,
		borderSettings: {
			colors: V(o.borders?.settings?.colors).map((e, t) => ({
				id: `border-color-${Kt(e.name, String(t))}`,
				label: B(e.name, e.codeHex),
				hex: B(e.codeHex, "#000000"),
				price: z(e.additionalPrice)
			})),
			allowColor: o.borders?.settings?.enableBorderColor !== !1,
			allowWidth: o.borders?.settings?.enableBorderWidth !== !1,
			colorsLabel: B(o.borders?.settings?.borderColorsLabel, "Border colors")
		},
		fixings: O,
		colors: k,
		customBackground: o.colors?.customColors?.active ? {
			label: B(o.colors.customColors.label, "Custom color"),
			image: H(o.colors.customColors.prevImg)
		} : null,
		lightings: A,
		lightingEnabled: o.lightings?.enabled !== !1,
		fonts: ee,
		components: te,
		componentsBehavior: o.components?.settings?.behavior === "choose-before-customization" ? "choose-before-customization" : "show-options-directly",
		addons: ne,
		inputs: re,
		text: {
			colors: V(ie.colors).map((e) => ({
				label: B(e.name, e.codeHex),
				hex: B(e.codeHex, "#000000")
			})),
			colorsLabel: B(ie.colorsLabel, "Text colors"),
			allowCustomColor: ie.enableCustomColor !== !1,
			customColorImage: H(ie.colorsPrevImg),
			type: ie.textType === "neon" ? "neon" : ie.textType === "3D" || ie.textType === "3d" ? "3D" : "normal",
			bold: ie.enableBold !== !1,
			italic: ie.enableItalic !== !1,
			underline: ie.enableUnderline !== !1,
			strike: ie.enableStrike !== !1,
			overline: ie.enableOverline !== !1,
			outline: ie.enableBorder !== !1,
			opacity: ie.enableOpacity !== !1,
			curveUp: !!ie.enableCurvedUp,
			curveDown: !!ie.enableCurvedDown,
			align: ie.enableTextAlignment !== !1,
			fontSize: {
				enabled: oe?.active !== !1,
				default: z(oe?.defaultFontSize, 16),
				min: z(oe?.minimumFontSize, 4),
				max: z(oe?.maximumFontSize, 100)
			}
		},
		images: {
			upload: ae.enableUploadImage !== !1,
			cliparts: !!ae.enableClipart && me.some((e) => e.items.length > 0),
			clipartGroups: me,
			cutline: {
				mode: ae.selectedCutline === "1x" || ae.selectedCutline === "2x" ? ae.selectedCutline : "none",
				first: {
					size: z(ae.cutlines?.first?.borderSize, 10),
					color: B(ae.cutlines?.first?.color, "green")
				},
				second: {
					color: B(ae.cutlines?.second?.color, "white"),
					size: z(ae.cutlines?.second?.size, 30),
					borderColor: B(ae.cutlines?.second?.borderColor, "red"),
					borderSize: z(ae.cutlines?.second?.borderSize, 10)
				}
			},
			scenes: V(ae.scenes).map((e) => H(typeof e == "string" ? e : e?.url)).filter((e) => !!e),
			allowedTypes: V(ae.fileUploadScript?.allowedUploadsExtentions).map((e) => e.toLowerCase()),
			colors: V(ae.colors).map((e) => ({
				label: B(e.name, e.codeHex),
				hex: B(e.codeHex, "#000000")
			})),
			allowCustomColor: ae.enableCustomColor !== !1,
			customColorImage: H(ae.colorsPrevImg),
			filters: Object.entries(ae.filter ?? {}).filter(([e, t]) => e !== "active" && t === !0).map(([e]) => e.replace(/^enable/, "").toLowerCase().replace(/^embross$/, "emboss")).filter((e) => e !== "opacity"),
			download: !!ae.enableDownloadImage
		},
		doubleSided: se?.active ? {
			label: B(se.label, "Switch face"),
			front: B(se.part1, "Face A"),
			back: B(se.part2, "Face B"),
			allowCopy: se.enableCopyDesignFromSide !== !1,
			pricing: se.pricing?.type === "multiplier" ? {
				kind: "multiplier",
				value: z(se.pricing.multiplier, 1)
			} : {
				kind: "additional",
				value: z(se.pricing?.additionalPrice)
			}
		} : null,
		output: {
			formats: B(ce.output?.filesFormat, "png").split("+").filter((e) => e === "png" || e === "jpeg" || e === "svg"),
			prefix: ce.output?.zipOutputFiles?.active ? B(ce.output.zipOutputFiles.zipOutFolderPrefix) : "",
			designComposition: ce.output?.designComposition !== !1,
			watermark: B(ce.output?.waterMark)
		},
		missingRequired: [...!g?.active && V(o.sizes?.items).length === 0 ? ["size"] : [], ...(f === "simple" ? V(o.shapes?.items).filter(Gt) : V(o.shapes?.items)).length === 0 ? ["shape"] : []],
		hidePricing: !!ce.product?.hidePricing,
		showRecap: ce.product?.showRecapAfterFinish !== !1,
		redirectToCheckout: !!ce.product?.redirectToCheckOutPage,
		quantity: {
			min: de ? Math.max(1, z(ue?.minQuantity, 1)) : 1,
			max: de ? Ut(ue?.maxQuantity) : null
		},
		discounts: {
			byQuantity: !!le?.byQuantity,
			global: {
				kind: le?.discount === "percent" || le?.discount === "fixed" ? le.discount : "none",
				value: z(le?.discountValue)
			},
			lots: V(le?.lots).map((e) => ({
				quantity: z(e.quantity),
				kind: e.discount === "percent" || e.discount === "fixed" ? e.discount : "none",
				value: z(e.discountValue)
			}))
		},
		quote: { enabled: !!ce.requestQuote?.enableRequestQuote },
		texts: Object.fromEntries(Object.entries(u).filter(([, e]) => typeof e == "string" && e.trim() !== "")),
		theme: gn(a.themeColors)
	};
	return {
		...he,
		sections: hn(he, V(c?.configOptions))
	};
}
//#endregion
//#region src/integrations/aso/assets.ts
var jn = {
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
function Mn(e) {
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
var Nn = [
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
], Pn = "/apps/aso-proxy/";
function Fn(e, t) {
	for (let n of Nn) for (let r of n.patterns) if (e.startsWith(r)) return `${t[n.key].replace(/\/+$/, "")}/${e.slice(r.length)}`;
	return e.startsWith(Pn) ? `${t.proxy_url.replace(/\/+$/, "")}/${e.slice(16)}` : "";
}
function In(e, t) {
	let n = String(e ?? "").trim();
	if (!n || /^(data:|blob:)/i.test(n)) return n;
	let r = Fn(n, t);
	if (r) return r;
	if (/^(https?:)?\/\//i.test(n)) try {
		let e = new URL(n.startsWith("//") ? `https:${n}` : n);
		return Fn(e.pathname + e.search + e.hash, t) || n;
	} catch {
		return n;
	}
	return n;
}
//#endregion
//#region src/core/units.ts
var Ln = {
	mm: 1,
	cm: 10,
	m: 1e3,
	in: 25.4,
	ft: 304.8
}, Rn = (e, t) => e * Ln[t], zn = (e, t) => e / Ln[t], Bn = (e, t, n) => zn(Rn(e, t), n);
function Vn(e, t, n = !0, r = "fr") {
	let i = n ? t === "mm" ? 0 : t === "m" ? 2 : 1 : 0;
	return new Intl.NumberFormat(r, { maximumFractionDigits: i }).format(e);
}
var Hn = (e, t, n, r = !0, i = "fr") => `${Vn(e, n, r, i)} × ${Vn(t, n, r, i)} ${n}`;
function Un(e, t, n, r = "fr") {
	return e.unit ? `${new Intl.NumberFormat(r, { maximumFractionDigits: 2 }).format(e.value)} ${e.unit}` : `${Vn(Bn(e.value, t, n), n, !0, r)} ${n}`;
}
//#endregion
//#region src/core/rules.ts
var Wn = (e, t) => t && t.length ? e.filter((e) => t.includes(e.id)) : e;
function Gn(e, t) {
	if (e.mode !== "advance") return null;
	let n = e.components.find((e) => e.id === t.componentId) ?? e.components[0];
	return n?.options.find((e) => e.id === t.componentOptionId) ?? n?.options[0] ?? null;
}
function Kn(e, t) {
	let n = e.materials.find((e) => e.id === t.materialId);
	return e.components.map((e) => ({
		...e,
		options: e.options.filter((t) => !n?.excludeComponentIds.includes(t.id) && !n?.excludeComponentIds.includes(e.id))
	})).filter((e) => e.options.length > 0);
}
function qn(e, t) {
	let n = Gn(e, t);
	return Wn(e.sizes, n?.sizeIds).filter((e) => !t.materialId || !e.excludeMaterials.includes(t.materialId));
}
function Jn(e, t) {
	return [...e.shapes, ...Gn(e, t)?.customShapes ?? []];
}
function Yn(e, t) {
	return [...e.borders, ...Gn(e, t)?.customBorders ?? []];
}
function Xn(e, t) {
	return [...e.fixings, ...Gn(e, t)?.customFixings ?? []];
}
function Zn(e, t) {
	let n = Gn(e, t);
	return [...Wn(e.shapes, n?.shapeIds), ...n?.customShapes ?? []].filter((e) => !t.materialId || !e.excludeMaterials.includes(t.materialId));
}
function Qn(e, t) {
	let n = t === "rectangle" ? "square" : t;
	return !e || e === "none" || e === "normal" ? !0 : e === "old-world" ? n === "square" : e === "rounded-corners" ? n === "rounded-square" : e !== "custom" || n === "square" || n === "rounded-square";
}
function $n(e, t) {
	let n = Gn(e, t), r = t.shapeId ? Jn(e, t).find((e) => e.id === t.shapeId)?.kind : void 0;
	return [...Wn(e.borders, n?.borderIds), ...n?.customBorders ?? []].filter((e) => !(t.sizeId && e.excludeSizes.includes(t.sizeId)) && !(t.shapeId && e.excludeShapes.includes(t.shapeId)) && (!r || Qn(e.kind, r)));
}
function er(e, t) {
	let n = Gn(e, t);
	return [...Wn(e.fixings, n?.fixingIds), ...n?.customFixings ?? []].filter((e) => !(t.materialId && e.excludeMaterials.includes(t.materialId)) && !(t.sizeId && e.excludeSizes.includes(t.sizeId)) && !(t.shapeId && e.excludeShapes.includes(t.shapeId)));
}
function tr(e, t) {
	let n = Gn(e, t);
	return Wn(e.colors, n?.backgroundIds).filter((e) => !t.materialId || !e.excludeMaterials.includes(t.materialId));
}
function nr(e, t) {
	let n = Gn(e, t);
	return n && n.lightings.length ? n.lightings : e.lightings;
}
function rr(e, t) {
	return e.addons.filter((e) => !t.materialId || !e.disabledForMaterials.includes(t.materialId)).map((e) => ({
		...e,
		options: e.options.filter((e) => !t.colorId || !e.excludeColorIds.includes(t.colorId))
	})).filter((e) => e.options.length > 0);
}
function ir(e, t) {
	let n = e.unit === "in" ? 300 : e.unit === "cm" ? 120 : 12 * Rn(1, e.unit), r = t.width * n, i = t.height * n, a = r > i ? 1e3 / r : 370 / i, o = r * a, s = i * a;
	return (o > 1e3 || s > 370) && (a *= o > 1e3 ? 1e3 / o : 370 / s), n * a;
}
var ar = 40;
function or(e, t, n) {
	return ar * n / 12 / ir(e, t);
}
function sr(e, t, n) {
	return n * ir(e, t) * 12 / ar;
}
function cr(e, t, n) {
	let r = (t) => e.fonts.find((e) => e.label.toLowerCase() === t.toLowerCase()) ?? e.fonts.find((e) => e.isDefault) ?? e.fonts[0], i = ir(e, n), a = (e) => e.percent ? {
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
		size: or(e, n, t.fontSize),
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
function lr(e, t, n) {
	let r = (e, t, n) => t && e.some((e) => e.id === t) ? t : n && e.some((e) => e.id === n) ? n : (e.find((e) => e.isDefault) ?? e[0])?.id ?? null, i = { ...t };
	if (i.materialId = r(e.materials, t.materialId), e.mode === "advance") {
		let n = Kn(e, i);
		i.componentId = r(n, t.componentId);
		let a = n.find((e) => e.id === i.componentId);
		i.componentOptionId = a ? r(a.options, t.componentOptionId) : null;
	}
	let a = Gn(e, i), o = a?.id !== Gn(e, n ?? t)?.id;
	i.sizeId = i.customSize && e.customSize && e.mode === "simple" ? null : r(qn(e, i), o ? null : t.sizeId, a?.defaults.size), i.sizeId && (i.customSize = null), i.shapeId = r(Zn(e, i), o ? null : t.shapeId, a?.defaults.shape), i.borderId = r($n(e, i), o ? null : t.borderId, a?.defaults.border), i.fixingId = r(er(e, i), o ? null : t.fixingId, a?.defaults.fixing), i.customColor || (i.colorId = r(tr(e, i), o ? null : t.colorId, a?.defaults.background)), i.lightingId = r(nr(e, i), o ? null : t.lightingId, a?.defaults.lighting);
	let s = rr(e, i);
	return i.addons = Object.fromEntries(s.map((e) => {
		let n = t.addons[e.id];
		return [e.id, n && e.options.some((e) => e.id === n) ? n : n === null ? null : e.options.find((e) => e.isDefault)?.id ?? null];
	})), e.doubleSided || (i.doubleSided = !1), a && (o || !i.objects.length && (a.textZones.length || a.imageZones.length)) ? i.objects = cr(e, a, dr(e, i)) : n && i.objects.length && i.objects === n.objects && (i.objects = ur(e, i.objects, dr(e, n), dr(e, i))), i;
}
function ur(e, t, n, r) {
	if (n.width === r.width && n.height === r.height) return t;
	let i = ir(e, n) / ir(e, r);
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
function dr(e, t) {
	if (t.customSize) return t.customSize;
	let n = e.sizes.find((e) => e.id === t.sizeId) ?? qn(e, t)[0];
	return n ? fr(e, t, n) : {
		width: 300,
		height: 200
	};
}
function fr(e, t, n) {
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
var pr = 0, mr = (e) => `${e}-${Date.now().toString(36)}-${(++pr).toString(36)}`;
function hr(e, t) {
	let n = e.borderSettings.colors, r = n[0];
	if (!r) return null;
	let i = (t ?? "").trim().toLowerCase();
	return !i || r.hex.trim().toLowerCase() !== i ? r.id : (n.find((e) => e.hex.trim().toLowerCase() !== i && e.price <= r.price) ?? r).id;
}
function gr(e) {
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
		borderColorId: r?.textColor?.sameForBorder ? null : hr(e, r?.patternUrl ? null : r?.hex),
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
	}), lr(e, i);
}
function _r(e, t) {
	let n = dt(t ?? gr(e)), r = dt({
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
	}), i = dt([]), a = dt([]), o = (t) => {
		let r = lr(e, t, n.value);
		Qe(() => {
			i.value = [...i.value.slice(-59), n.value], a.value = [], n.value = r;
		});
	}, s = {
		patch(e) {
			o({
				...n.value,
				...e
			});
		},
		selectBorder(t) {
			let r = Yn(e, n.value).find((e) => e.id === t), i = e.colors.find((e) => e.id === n.value.colorId), a = n.value.customColor ?? (i?.patternUrl ? null : i?.hex), s = n.value.borderColorId ?? (r && r.kind !== "none" ? hr(e, a) : null);
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
				id: mr(t.type),
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
				id: mr(e.type),
				face: t
			}));
			o({
				...n.value,
				objects: [...r, ...i]
			});
		},
		undo() {
			let e = i.value.at(-1);
			e && Qe(() => {
				a.value = [n.value, ...a.value], i.value = i.value.slice(0, -1), n.value = e;
			});
		},
		redo() {
			let e = a.value[0];
			e && Qe(() => {
				i.value = [...i.value, n.value], a.value = a.value.slice(1), n.value = e;
			});
		},
		reset() {
			o(gr(e));
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
		canUndo: gt(() => i.value.length > 0),
		canRedo: gt(() => a.value.length > 0),
		actions: s
	};
}
//#endregion
//#region src/core/pricing.ts
var vr = (e) => {
	let t = typeof e == "number" ? e : parseFloat(String(e));
	return Number.isFinite(t) ? t : 0;
}, yr = (e, t) => t ?? e[e.length - 1];
function br(e, t) {
	let n = () => {
		let n = yr(e.ranges, e.ranges.find((e) => t <= (e.surface ?? 0)));
		return n.perRange === !0 || e.perUnit ? n.basePrice * t : n.basePrice;
	};
	return e.type === "range" && e.ranges.length ? n() : e.type === "unit" && e.unit ? e.unit.surface > 0 && t > 0 ? e.unit.basePrice * t / e.unit.surface : e.unit.basePrice : e.ranges.length ? n() : e.flatPrice;
}
function xr(e, t) {
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
var Sr = (e) => !!(e && (e.type === "unit" && e.unit || e.ranges.length || e.unit));
function Cr(e, t) {
	let n = (t) => e.objects.reduce((e, n) => n.type === "text" && n.face === t ? e + n.text : e, "").length;
	return Math.max(0, n("front") - t) + Math.max(0, n("back") - t);
}
var wr = (e, t, n) => t ? vr(n / t.surface * e) : e;
function Tr(e, t, n, r = {}) {
	let i = [], a = (e, t, n, r = "base") => {
		let a = vr(n);
		(r !== "base" || a !== 0) && i.push({
			key: e,
			label: t,
			amount: a,
			kind: r
		});
	}, o = e.mode === "simple", { width: s, height: c } = dr(e, t), l = s * c, u = e.doubleSided ? 2 : 1, d = e.colors.find((e) => e.isDefault) ?? e.colors[0], f = e.materials.find((e) => e.id === t.materialId) ?? null, p = f?.pricingId ? e.pricingProfiles.find((e) => e.id === f.pricingId) ?? null : null;
	f && a("material", f.label, p ? br(p, l) : f.price);
	let m = !!(t.customSize && e.customSize), h = e.customSize?.pricing ?? null, g;
	if (m) {
		g = Sr(h) ? xr(h, l) : xr(null, 0);
		let e = vr(g.basePrice), t = g.rangeSurface > 0 ? g.rangeSurface : l;
		a("sizeTextBase", `${s} × ${c}`, g.perRange ? e * t : e);
	} else g = xr(p, l);
	let _ = e.thickness.find((e) => e.id === t.thicknessId);
	_ && (_.pricingType === "multiplier" ? a("thickness", _.label, _.multiplier || 1, "multiplier") : a("thickness", _.label, _.price));
	let v = Jn(e, t).find((e) => e.id === t.shapeId);
	v && o && a("shape", v.label, wr(v.price, v.priceBySurface, l));
	let y = Yn(e, t).find((e) => e.id === t.borderId);
	if (y) for (let e = 1; e <= u; e++) a(`border${e}`, y.label, y.price);
	let b = e.borderSettings.colors.find((e) => e.id === t.borderColorId);
	if (b && y && y.kind !== "none") {
		a("border-color1", b.label, b.price);
		let t = e.borderSettings.colors[0];
		a("border-color2", t.label, t.price);
	}
	let x = Xn(e, t).find((e) => e.id === t.fixingId);
	x && a("fixing", x.label, x.price);
	let S = e.colors.find((e) => e.id === t.colorId);
	o && (S && !t.customColor && a("color1", S.label, S.price), u === 2 && d && a("color2", d.label, d.price));
	let C = Gn(e, t), w = e.lightingEnabled ? (C?.lightings.length ? C.lightings : e.lightings).find((e) => e.id === t.lightingId) : void 0;
	if (w && a("lighting", w.label, w.price), o) for (let n of rr(e, t)) {
		let e = n.options.find((e) => e.id === t.addons[n.id]);
		e && a(`addon:${n.id}`, `${n.label} : ${e.label}`, wr(e.price, e.priceBySurface, l));
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
	let T = i.filter((e) => e.kind === "base").reduce((e, t) => e + t.amount, 0), E = i.filter((e) => e.kind === "multiplier"), D = E.length ? T * E.reduce((e, t) => e * t.amount, 1) : T, O = Cr(t, g.startPriceAtChar) * vr(g.charPrice);
	O && i.push({
		key: "chars",
		label: "chars",
		amount: O,
		kind: "base"
	});
	let k = vr(t.template === null ? 0 : t.template ? t.template.basePrice : r.templateBasePrice) + D + O, A = Math.max(1, n), j = k * A, M = Dr(j, Er(e, A));
	return {
		unit: k,
		chars: O,
		quantity: A,
		subtotal: j,
		discount: j - M,
		total: M,
		lines: i
	};
}
function Er(e, t) {
	return e.discounts.byQuantity ? [...e.discounts.lots].filter((e) => t >= e.quantity).sort((e, t) => t.quantity - e.quantity)[0] ?? null : e.discounts.global;
}
function Dr(e, t) {
	return !t || t.kind === "none" || !(t.value > 0) ? e : t.kind === "percent" ? e * (1 - Math.min(t.value, 100) / 100) : Math.max(0, e - t.value);
}
var Or = {
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
}, kr = {
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
}, Ar = {
	fr: Or,
	en: kr
}, jr = {
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
}, Mr = {
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
function Nr(e, t = {}) {
	let n = e.split("-")[0].toLowerCase(), r = {};
	for (let [e, i] of Object.entries(t)) {
		let t = jr[e], a = typeof i == "string" ? i.trim() : "";
		if (!t || !a) continue;
		let o = a.toLowerCase() === (Mr[e] ?? "").toLowerCase() || a.toLowerCase() === String(kr[t] ?? "").toLowerCase();
		n !== "en" && o || (r[t] = a);
	}
	let i = {
		...kr,
		...Ar[n] ?? {},
		...r
	};
	return (e, t) => {
		let n = i[e] ?? e;
		return t ? n.replace(/\{(\w+)\}/g, (e, n) => String(t[n] ?? `{${n}}`)) : n;
	};
}
//#endregion
//#region src/core/theme.ts
var Pr = (e) => {
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
}, Fr = (e) => `#${e.map((e) => Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0")).join("")}`;
function Ir(e) {
	let t = Pr(e);
	if (!t) return 0;
	let n = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * n(t[0]) + .7152 * n(t[1]) + .0722 * n(t[2]);
}
function Lr(e, t) {
	let [n, r] = [Ir(e), Ir(t)].sort((e, t) => t - e);
	return (n + .05) / (r + .05);
}
var Rr = (e) => Lr(e, "#ffffff") >= Lr(e, "#111418") ? "#ffffff" : "#111418";
function zr(e, t, n) {
	let r = Pr(e), i = Pr(t);
	return !r || !i ? e : Fr(r.map((e, t) => e + (i[t] - e) * n));
}
function Br(e, t, n = 4.5) {
	if (!Pr(e) || !Pr(t)) return e;
	let r = Ir(t) > .4 ? "#000000" : "#ffffff";
	for (let i = 0; i <= 1.0001; i += .02) {
		let a = zr(e, r, i);
		if (Lr(a, t) >= n) return a;
	}
	return r;
}
var Vr = (e, t, n = 4.5) => Pr(e) && Pr(t) && Lr(e, t) < n ? Br(e, t, n) : e, Hr = (e, t) => Pr(e) ? e : t;
function Ur(e) {
	let t = Hr(e.barBg, "#ffffff"), n = Ir(t) < .2, r = n ? zr(t, "#ffffff", .06) : "#ffffff", i = Hr(e.panelBg, n ? zr(t, "#ffffff", .03) : "#f3f5f7"), a = Vr(Hr(e.barTitle, n ? "#f2f4f6" : "#111418"), t, 7), o = Lr(a, i) < Lr(a, r) ? i : r, s = Vr(zr(a, o, .38), o, 4.5), c = Hr(e.primary, "#0f6a6a"), l = Lr(c, r) >= 3 ? c : Br(c, r, 3), u = Hr(e.finishBg, "#febd52"), d = Hr(e.cartBg, u), f = Hr(e.priceBg, t);
	return {
		vars: {
			"--sc-bg": t,
			"--sc-text": a,
			"--sc-text-muted": s,
			"--sc-panel-bg": i,
			"--sc-surface": r,
			"--sc-stage-bg": Hr(e.stageBg, n ? "#16181b" : "#eef1f4"),
			"--sc-stage-border": Hr(e.stageBorder, "#c9d1d9"),
			"--sc-primary": l,
			"--sc-on-primary": Pr(e.primaryText) && Lr(e.primaryText, l) >= 4.5 ? e.primaryText : Rr(l),
			"--sc-primary-hover": Hr(e.primaryHover, zr(l, "#000000", .08)),
			"--sc-active-text": Vr(Hr(e.optionActiveText, l), r),
			"--sc-hover-bg": Hr(e.optionHoverBg, n ? zr(r, "#ffffff", .06) : "#eef2f5"),
			"--sc-cta": u,
			"--sc-on-cta": Pr(e.finishText) && Lr(e.finishText, u) >= 4.5 ? e.finishText : Rr(u),
			"--sc-cta-hover": Hr(e.finishHoverBg, zr(u, "#000000", .08)),
			"--sc-cart": d,
			"--sc-on-cart": Pr(e.cartText) && Lr(e.cartText, d) >= 4.5 ? e.cartText : Rr(d),
			"--sc-cart-hover": Hr(e.cartHoverBg, zr(d, "#000000", .08)),
			"--sc-price-bg": f,
			"--sc-price": Vr(Hr(e.priceText, a), f),
			"--sc-price-before": Vr(Hr(e.priceBeforeText, s), f),
			"--sc-price-after": Vr(Hr(e.priceAfterText, s), f),
			"--sc-danger": Vr(Hr(e.danger, "#b42318"), r),
			"--sc-border": zr(a, r, .88),
			"--sc-border-control": Br(zr(a, r, .55), r, 3),
			"--sc-focus": Lr(l, t) >= 3 ? l : a
		},
		dark: n
	};
}
//#endregion
//#region src/ui/context.ts
var Wr = Se(null), Gr = () => Ve(Wr), Kr = "#ffffff";
function qr(e, t) {
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
//#region node_modules/konva/lib/Global.js
function Jr() {
	return typeof window < "u" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
}
var Yr, Xr, U, Zr, Qr, $r = o((() => {
	Yr = Math.PI / 180, Xr = typeof global < "u" ? global : typeof window < "u" ? window : typeof WorkerGlobalScope < "u" ? self : {}, U = {
		_global: Xr,
		version: "10.8.0",
		isBrowser: Jr(),
		isUnminified: /param/.test(function(e) {}.toString()),
		dblClickWindow: 400,
		getAngle(e) {
			return U.angleDeg ? e * Yr : e;
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
			return U.DD.isDragging;
		},
		isTransforming() {
			return U.Transformer?.isTransforming() ?? !1;
		},
		isDragReady() {
			return !!U.DD.node;
		},
		releaseCanvasOnDestroy: !0,
		document: Xr.document,
		_injectGlobal(e) {
			Xr.Konva !== void 0 && console.error("Several Konva instances detected. It is not recommended to use multiple Konva instances in the same environment."), Xr.Konva = e;
		}
	}, Zr = /* @__PURE__ */ new Set(), Qr = (e, t = !1) => {
		U[e.prototype.getClassName()] = e, t && Zr.add(e);
	}, U._injectGlobal(U);
}));
//#endregion
//#region node_modules/konva/lib/Util.js
function ei(e, t) {
	return Math.min(Math.max(e || 0, 0), t);
}
var ti, ni, ri, ii, ai, oi, si, ci, li, ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, W, ki = o((() => {
	$r(), ti = "Konva.js unsupported environment.\n\nLooks like you are trying to use Konva.js in Node.js environment (or in a Web Worker), because \"document\" object is undefined.\n\nTo use Konva.js in Node.js environment, you need to use the \"canvas-backend\" or \"skia-backend\" module.\n\nbash: npm install canvas\njs: import \"konva/canvas-backend\";\n\nor\n\nbash: npm install skia-canvas\njs: import \"konva/skia-backend\";\n", ni = () => {
		if (typeof document > "u") throw Error(ti);
	}, ri = class e {
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
			return s.rotation = W._getRotation(s.rotation), s;
		}
	}, ii = "[object Array]", ai = "[object Number]", oi = "[object String]", si = "[object Boolean]", ci = Math.PI / 180, li = 180 / Math.PI, ui = "#", di = "", fi = "0", pi = "Konva warning: ", mi = "Konva error: ", hi = {
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
	}, gi = null, _i = typeof window < "u" ? window : {}, vi = /* @__PURE__ */ new WeakMap(), yi = (e, t) => {
		typeof e.requestAnimationFrame == "function" ? e.requestAnimationFrame(t) : typeof requestAnimationFrame < "u" ? requestAnimationFrame(t) : setTimeout(t, 16);
	}, bi = /* @__PURE__ */ new Map(), xi = Object.getPrototypeOf(Int8Array), Si = (e) => {
		let t = e.trim();
		return t.indexOf(",") === -1 ? t.split(/\s*\/\s*|\s+/) : t.split(/\s*,\s*/);
	}, Ci = "[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?", wi = RegExp(`^(${Ci})(%?)$`, "i"), Ti = (e, t) => {
		let n = wi.exec(e);
		if (!n) return NaN;
		let r = n[2] ? Number(n[1]) / 100 * t : Number(n[1]);
		return Math.min(Math.max(r, 0), t);
	}, Ei = /^#[0-9a-f]+$/i, Di = RegExp(`^(${Ci})(deg|grad|rad|turn)?$`, "i"), Oi = {
		deg: 1,
		grad: .9,
		rad: li,
		turn: 360
	}, W = {
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
			return Object.prototype.toString.call(e) === ii;
		},
		_isNumber(e) {
			return Object.prototype.toString.call(e) === ai && !isNaN(e) && isFinite(e);
		},
		_isString(e) {
			return Object.prototype.toString.call(e) === oi;
		},
		_isBoolean(e) {
			return Object.prototype.toString.call(e) === si;
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
			let n = t && !t.closed && t || _i, r = vi.get(n);
			r || (r = [], vi.set(n, r), yi(n, function() {
				vi.delete(n), r.forEach(function(e) {
					e();
				});
			})), r.push(e);
		},
		createCanvasElement() {
			ni();
			let e = document.createElement("canvas");
			try {
				e.style = e.style || {};
			} catch {}
			return e;
		},
		createImageElement() {
			return ni(), document.createElement("img");
		},
		_urlToImage(e, t, n) {
			let r = W.createImageElement();
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
			e = e.replace(ui, di);
			let t = parseInt(e, 16);
			return {
				r: t >> 16 & 255,
				g: t >> 8 & 255,
				b: t & 255
			};
		},
		getRandomColor() {
			let e = (Math.random() * 16777215 | 0).toString(16);
			for (; e.length < 6;) e = fi + e;
			return ui + e;
		},
		isCanvasFarblingActive() {
			if (gi !== null) return gi;
			if (typeof document > "u") return gi = !1, !1;
			let e = this.createCanvasElement();
			e.width = 10, e.height = 10;
			let t = e.getContext("2d", { willReadFrequently: !0 });
			t.clearRect(0, 0, 10, 10), t.fillStyle = "#282828", t.fillRect(0, 0, 10, 10);
			let n = t.getImageData(0, 0, 10, 10).data, r = !1;
			for (let e = 0; e < 100; e++) if (n[e * 4] !== 40 || n[e * 4 + 1] !== 40 || n[e * 4 + 2] !== 40 || n[e * 4 + 3] !== 255) {
				r = !0;
				break;
			}
			return gi = r, this.releaseCanvas(e), gi;
		},
		getHitColor() {
			let e = () => Math.random() * 256 | 0;
			return this.getHitColorKey(e(), e(), e());
		},
		getHitColorKey(e, t, n) {
			let r = this.isCanvasFarblingActive() ? 5 : 3, i = (e) => Math.round(e / r) * r;
			return ui + this._rgbToHex(i(e), i(t), i(n));
		},
		getSnappedHexColor(e) {
			let { r: t, g: n, b: r } = this._hexToRgb(e);
			return this.getHitColorKey(t, n, r);
		},
		getRGB(e) {
			let { r: t = 0, g: n = 0, b: r = 0 } = W.colorToRGBA(e) ?? {};
			return {
				r: t,
				g: n,
				b: r
			};
		},
		colorToRGBA(e) {
			e = (e || "").trim() || "black";
			let t = W._namedColorToRBA(e) || W._hex3ColorToRGBA(e) || W._hex4ColorToRGBA(e) || W._hex6ColorToRGBA(e) || W._hex8ColorToRGBA(e) || W._rgbColorToRGBA(e) || W._hslColorToRGBA(e);
			if (t && [
				t.r,
				t.g,
				t.b,
				t.a
			].every(W._isNumber)) return t;
		},
		_namedColorToRBA(e) {
			let t = hi[e.toLowerCase()];
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
			let n = Si(t[1]);
			if (!(n.length < 3 || n.length > 4)) return {
				r: Ti(n[0], 255),
				g: Ti(n[1], 255),
				b: Ti(n[2], 255),
				a: n.length > 3 ? Ti(n[3], 1) : 1
			};
		},
		_hex8ColorToRGBA(e) {
			if (e.length === 9 && Ei.test(e)) return {
				r: parseInt(e.slice(1, 3), 16),
				g: parseInt(e.slice(3, 5), 16),
				b: parseInt(e.slice(5, 7), 16),
				a: parseInt(e.slice(7, 9), 16) / 255
			};
		},
		_hex6ColorToRGBA(e) {
			if (e.length === 7 && Ei.test(e)) return {
				r: parseInt(e.slice(1, 3), 16),
				g: parseInt(e.slice(3, 5), 16),
				b: parseInt(e.slice(5, 7), 16),
				a: 1
			};
		},
		_hex4ColorToRGBA(e) {
			if (e.length === 5 && Ei.test(e)) return {
				r: parseInt(e[1] + e[1], 16),
				g: parseInt(e[2] + e[2], 16),
				b: parseInt(e[3] + e[3], 16),
				a: parseInt(e[4] + e[4], 16) / 255
			};
		},
		_hex3ColorToRGBA(e) {
			if (e.length === 4 && Ei.test(e)) return {
				r: parseInt(e[1] + e[1], 16),
				g: parseInt(e[2] + e[2], 16),
				b: parseInt(e[3] + e[3], 16),
				a: 1
			};
		},
		_hslColorToRGBA(e) {
			let t = /^hsla?\(([^)]*)\)$/i.exec(e);
			if (!t) return;
			let n = Si(t[1]);
			if (n.length < 3 || n.length > 4) return;
			let r = Di.exec(n[0]);
			if (!r) return;
			let i = r[2], a = Number(r[1]) * (i ? Oi[i.toLowerCase()] : 1);
			if (!isFinite(a)) return;
			let o = (a % 360 + 360) % 360 / 360, s = Ti(n[1], 100) / 100, c = Ti(n[2], 100) / 100, l = n.length > 3 ? Ti(n[3], 1) : 1, u = c < .5 ? c * (1 + s) : c + s - c * s, d = 2 * c - u, f = [
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
			for (let n in e) t[n] = W._cloneValue(e[n]);
			return t;
		},
		_cloneValue(e) {
			return W._isArray(e) ? e.some((e) => typeof e == "object") ? e.map(W._cloneValue) : e.slice() : W._isPlainObject(e) ? W.cloneObject(e) : e instanceof xi ? e.slice() : e;
		},
		cloneArray(e) {
			return e.slice(0);
		},
		degToRad(e) {
			return e * ci;
		},
		radToDeg(e) {
			return e * li;
		},
		_getRotation(e) {
			return U.angleDeg ? W.radToDeg(e) : e;
		},
		_capitalize(e) {
			let t = bi.get(e);
			if (t !== void 0) return t;
			let n = e.charAt(0).toUpperCase() + e.slice(1);
			return bi.set(e, n), n;
		},
		throw(e) {
			throw Error(mi + e);
		},
		error(e) {
			console.error(mi + e);
		},
		warn(e) {
			U.showWarnings && console.warn(pi + e);
		},
		_batchEvents(e, t) {
			if (!e) return t();
			let n = !1, r = !0;
			try {
				e(() => {
					n || !r ? W.warn("eventBatchFunc must call its argument exactly once, synchronously.") : (n = !0, t());
				});
			} finally {
				r = !1, n || W.warn("eventBatchFunc must call its argument synchronously.");
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
			let r = W.cloneObject(e), i = Number.MAX_VALUE;
			return t.forEach(function(a, o) {
				if (!n && o === t.length - 1) return;
				let s = t[(o + 1) % t.length], c = W._getProjectionToSegment(a.x, a.y, s.x, s.y, e.x, e.y), l = c[0], u = c[1], d = c[2];
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
				let t = W._getProjectionToLine(e, r, n);
				a.push(t.x), a.push(t.y);
			}), a;
		},
		_prepareToStringify(e, t = /* @__PURE__ */ new Set()) {
			let n = W._isArray(e) ? [] : {};
			t.add(e);
			for (let r of Object.keys(e)) {
				let i = e[r];
				W._isElement(i) || t.has(i) || (n[r] = W._isPlainObject(i) || W._isArray(i) ? W._prepareToStringify(i, t) : i);
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
			U.releaseCanvasOnDestroy && e.forEach((e) => {
				e.width = 0, e.height = 0;
			});
		},
		_cornerRadii(e, t, n) {
			let r = Math.min(t, n) / 2;
			if (typeof e == "number") {
				let t = ei(e, r);
				return [
					t,
					t,
					t,
					t
				];
			}
			return [
				ei(e[0], r),
				ei(e[1], r),
				ei(e[2], r),
				ei(e[3], r)
			];
		},
		drawRoundedRectPath(e, t, n, r) {
			let i = t < 0 ? t : 0, a = n < 0 ? n : 0;
			t = Math.abs(t), n = Math.abs(n);
			let [o, s, c, l] = W._cornerRadii(r, t, n);
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
function Ai(e) {
	let t = [], n = e.length, r = W;
	for (let i = 0; i < n; i++) {
		let n = e[i];
		r._isNumber(n) ? n = Math.round(n * 1e3) / 1e3 : r._isString(n) || (n += ""), t.push(n);
	}
	return t;
}
function ji() {
	if (Vi !== null) return Vi;
	try {
		let e = W.createCanvasElement(), t = e.getContext("2d");
		Vi = !!t && "filter" in t, W.releaseCanvas(e);
	} catch {
		Vi = !1;
	}
	return Vi;
}
var Mi, Ni, Pi, Fi, Ii, Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi = o((() => {
	ki(), $r(), Mi = ",", Ni = "(", Pi = ")", Fi = ";", Ii = "()", Li = "=", Ri = /* @__PURE__ */ "arc.arcTo.beginPath.bezierCurveTo.clearRect.clip.closePath.createLinearGradient.createPattern.createRadialGradient.drawImage.ellipse.fill.fillText.getImageData.createImageData.lineTo.moveTo.putImageData.quadraticCurveTo.rect.roundRect.restore.rotate.save.scale.setLineDash.setTransform.stroke.strokeText.transform.translate".split("."), zi = [
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
	], Bi = 100, Vi = null, Hi = class {
		constructor(e) {
			this.canvas = e, U.enableTrace && (this.traceArr = [], this._enableTrace());
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
			for (a = 0; a < r; a++) o = n[a], s = o.method, s ? (c = o.args, i += s, e ? i += Ii : (t && (c = c.map((e) => typeof e == "number" ? Math.floor(e) : e)), i += Ni + c.join(Mi) + Pi)) : (i += o.property, e || (i += Li + o.val)), i += Fi;
			return i;
		}
		clearTrace() {
			this.traceArr = [];
		}
		_trace(e) {
			let t = this.traceArr, n;
			t.push(e), n = t.length, n >= Bi && t.shift();
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
			let e = this, t = Ri.length, n = this.setAttr, r, i, a = function(t) {
				let n = e[t], r;
				e[t] = function() {
					return i = Ai(Array.prototype.slice.call(arguments, 0)), r = n.apply(e, arguments), e._trace({
						method: t,
						args: i
					}), r;
				};
			};
			for (r = 0; r < t; r++) a(Ri[r]);
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
	}, zi.forEach(function(e) {
		Object.defineProperty(Hi.prototype, e, {
			get() {
				return this._context[e];
			},
			set(t) {
				this._context[e] = t;
			}
		});
	}), Ui = class extends Hi {
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
				let { a: e, b: r, c: i, d: a, e: o, f: s } = this._context.getTransform(), c = new ri([
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
	}, Wi = class extends Hi {
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
})), Ki, qi, Ji, Yi = o((() => {
	ki(), Gi(), $r(), Ki = class {
		constructor(e) {
			this.pixelRatio = 1, this.width = 0, this.height = 0, this._logicalWidth = 0, this._logicalHeight = 0, this.isCache = !1;
			let t = (e || {}).pixelRatio || U.pixelRatio || U._global.devicePixelRatio || 1;
			this.pixelRatio = t, this._canvas = W.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0";
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
			(!isFinite(e ?? 0) || !isFinite(t ?? 0)) && (W.error(`Canvas size must be finite numbers, got ${e}x${t}. The canvas is left empty.`), e = t = 0), e = e || 0, t = t || 0;
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
					throw W.error("Unable to get data URL. " + e.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), e;
				}
			}
		}
	}, qi = class e extends Ki {
		_prepareIsolationCanvas(t) {
			let { a: n, b: r, c: i, d: a, e: o, f: s } = this.getContext()._context.getTransform(), c = this._isolationRect || this, l = 0, u = 0, d = c.width, f = c.height;
			if (t) {
				let e = new ri([
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
			e && (e._releaseIsolationCanvas(), W.releaseCanvas(e._canvas), this._isolationCanvas = void 0);
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
			}, this._isolationLowFrames = 0, this.context = new Ui(this, { willReadFrequently: e.willReadFrequently }), this.setSize(e.width, e.height);
		}
	}, Ji = class extends Ki {
		constructor(e = {
			width: 0,
			height: 0
		}) {
			super(e), this.hitCanvas = !0, this.context = new Wi(this), this.context.imageSmoothingEnabled = !1, this.setSize(e.width, e.height);
		}
	};
})), Xi, Zi = o((() => {
	ki(), Xi = {
		get isDragging() {
			let e = !1;
			return Xi._dragElements.forEach((t) => {
				t.dragStatus === "dragging" && (e = !0);
			}), e;
		},
		get node() {
			let e;
			for (let t of Xi._dragElements.values()) {
				if (t.dragStatus === "dragging") return t.node;
				e = t.node;
			}
			return e;
		},
		_dragElements: /* @__PURE__ */ new Map(),
		_listenToWindow(e) {
			let t = (t) => Xi._endDragBefore(t, e), n = (t) => Xi._batchEvents(() => Xi._drag(t, e), e), r = (e) => Xi._batchEvents(() => Xi._endDragAfter(e));
			e.addEventListener("mouseup", t, !0), e.addEventListener("touchend", t, !0), e.addEventListener("touchcancel", t, !0), e.addEventListener("mousemove", n), e.addEventListener("touchmove", n), e.addEventListener("mouseup", r, !1), e.addEventListener("touchend", r, !1), e.addEventListener("touchcancel", r, !1);
		},
		_batchEvents(e, t) {
			if (!Xi._dragElements.size) return;
			let n = /* @__PURE__ */ new Set();
			for (let { node: e } of Xi._dragElements.values()) {
				let r = e.getStage();
				if (!r || t && r._getOwnerWindow() !== t) continue;
				let i = r.eventBatchFunc();
				i && n.add(i);
			}
			let r = e;
			for (let e of n) {
				let t = r;
				r = () => W._batchEvents(e, t);
			}
			r();
		},
		_drag(e, t) {
			let n = [], r = /* @__PURE__ */ new Set();
			Xi._dragElements.forEach((i, a) => {
				let { node: o } = i, s = o.getStage();
				if (t && s._getOwnerWindow() !== t || (r.has(s) || (s.setPointersPositions(e), r.add(s)), i.pointerEventType && i.pointerEventType !== s._pointerEventType)) return;
				i.pointerId === void 0 && (i.pointerId = W._getFirstPointerId(e), i.pointerEventType = s._pointerEventType, i.dragStatus === "dragging" && s._cancelClick(i.pointerId, i.pointerEventType));
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
			Xi._dragElements.forEach((a, o) => {
				let { node: s } = a;
				if (n && a !== n && a.pointerId !== n.pointerId) return;
				let c = s.getStage();
				if (e && !i.has(c) && (!t || c._getOwnerWindow() === t) && (c.setPointersPositions(e), i.add(c)), n || (!e || !a.pointerEventType || a.pointerEventType === W._getEventType(e.type)) && (a.pointerId === void 0 || c._changedPointerPositions.some((e) => e.id === a.pointerId))) {
					if (a.dragStatus === "ready") Xi._dragElements.delete(o);
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
			Xi._dragElements.forEach((n, r) => {
				n.dragStatus !== "stopped" || t && n !== t && n.pointerId !== t.pointerId || (n.node.fire("dragend", {
					type: "dragend",
					target: n.node,
					evt: e
				}, !0), n.dragStatus !== "dragging" && Xi._dragElements.delete(r));
			});
		}
	};
}));
//#endregion
//#region node_modules/konva/lib/PointerEvents.js
function Qi(e, t) {
	let n = ia.get(e);
	return n && (!t || n.stage === t) ? n.shape : void 0;
}
function $i(e, t, n) {
	e._fire(t, {
		evt: new PointerEvent(t, { pointerId: n }),
		pointerId: n
	});
}
function ea(e, t) {
	return ia.get(e)?.shape === t;
}
function ta(e, t) {
	var n;
	ra(e);
	let r = t.getStage();
	if (r && (ia.set(e, {
		shape: t,
		stage: r
	}), aa)) {
		try {
			(n = r.content) == null || n.setPointerCapture(e);
		} catch {}
		$i(t, "gotpointercapture", e);
	}
}
function na(e) {
	ia.forEach(({ shape: t, stage: n }, r) => {
		(t === e || n === e) && ra(r);
	});
}
function ra(e, t) {
	var n;
	let r = ia.get(e);
	if (!r || t && r.shape !== t) return;
	let { shape: i, stage: a } = r;
	if (ia.delete(e), aa) {
		try {
			(n = a.content) == null || n.releasePointerCapture(e);
		} catch {}
		$i(i, "lostpointercapture", e);
	}
}
var ia, aa, oa = o((() => {
	$r(), ia = /* @__PURE__ */ new Map(), aa = U._global.PointerEvent !== void 0;
}));
//#endregion
//#region node_modules/konva/lib/Validators.js
function sa(e) {
	return W._isString(e) ? "\"" + e + "\"" : Object.prototype.toString.call(e) === "[object Number]" || W._isBoolean(e) ? e : Object.prototype.toString.call(e);
}
function ca(e) {
	return e > 255 ? 255 : e < 0 ? 0 : Math.round(e);
}
function G() {
	if (U.isUnminified) return function(e, t) {
		return W._isNumber(e) || W.warn(sa(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a number."), e;
	};
}
function la(e) {
	if (U.isUnminified) return function(t, n) {
		let r = W._isNumber(t), i = W._isArray(t) && t.length == e;
		return !r && !i && W.warn(sa(t) + " is a not valid value for \"" + n + "\" attribute. The value should be a number or Array<number>(" + e + ")"), t;
	};
}
function ua() {
	if (U.isUnminified) return function(e, t) {
		return W._isNumber(e) || e === "auto" || W.warn(sa(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a number or \"auto\"."), e;
	};
}
function da() {
	if (U.isUnminified) return function(e, t) {
		return W._isString(e) || W.warn(sa(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a string."), e;
	};
}
function fa() {
	if (U.isUnminified) return function(e, t) {
		let n = W._isString(e), r = Object.prototype.toString.call(e) === "[object CanvasGradient]" || e && e.addColorStop;
		return n || r || W.warn(sa(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a string or a native gradient."), e;
	};
}
function pa() {
	if (U.isUnminified) return function(e, t) {
		return e instanceof xi || (W._isArray(e) ? e.forEach(function(e) {
			W._isNumber(e) || W.warn("\"" + t + "\" attribute has non numeric element " + e + ". Make sure that all elements are numbers.");
		}) : W.warn(sa(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a array of numbers.")), e;
	};
}
function ma() {
	if (U.isUnminified) return function(e, t) {
		return e !== !0 && e !== !1 && W.warn(sa(e) + " is a not valid value for \"" + t + "\" attribute. The value should be a boolean."), e;
	};
}
function ha(e) {
	if (U.isUnminified) return function(t, n) {
		return t == null || W.isObject(t) || W.warn(sa(t) + " is a not valid value for \"" + n + "\" attribute. The value should be an object with properties " + e), t;
	};
}
var ga = o((() => {
	$r(), ki();
})), _a, va, K, q = o((() => {
	ki(), ga(), _a = "get", va = "set", K = {
		addGetterSetter(e, t, n, r, i) {
			K.addGetter(e, t, n), K.addSetter(e, t, r, i), K.addOverloadedGetterSetter(e, t);
		},
		addGetter(e, t, n) {
			let r = _a + W._capitalize(t), i = Array.isArray(n), a = function() {
				let e = this.attrs[t];
				return e === void 0 ? i ? n.slice() : n : e;
			};
			a._def = n, e.prototype[r] = e.prototype[r] || a;
		},
		addSetter(e, t, n, r) {
			let i = va + W._capitalize(t);
			e.prototype[i] || K.overWriteSetter(e, t, n, r);
		},
		overWriteSetter(e, t, n, r) {
			let i = va + W._capitalize(t);
			e.prototype[i] = function(e) {
				return n && e != null && (e = n.call(this, e, t)), this._setAttr(t, e), r && r.call(this), this;
			};
		},
		addComponentsGetterSetter(e, t, n, r, i) {
			let a = n.length, o = W._capitalize, s = _a + o(t), c = va + o(t), l = n.map((e) => t + o(e)), u = l.map((e) => _a + o(e));
			e.prototype[s] = function() {
				let e = {};
				for (let t = 0; t < a; t++) {
					let r = this[u[t]];
					e[n[t]] = r ? r.call(this) : this.attrs[l[t]];
				}
				return e;
			};
			let d = ha(n);
			e.prototype[c] = function(e) {
				let a = this[s]();
				r && (e = r.call(this, e, t)), d && d.call(this, e, t);
				for (let n in e) e.hasOwnProperty(n) && this._setAttr(t + o(n), e[n]);
				return e || n.forEach((e) => {
					this._setAttr(t + o(e), void 0);
				}), this._fireChangeEvent(t, a, e), i && i.call(this), this;
			}, K.addOverloadedGetterSetter(e, t);
		},
		addOverloadedGetterSetter(e, t) {
			let n = W._capitalize(t), r = va + n, i = _a + n, a = function() {
				return arguments.length ? (this[r](arguments[0]), this) : this[i]();
			};
			e.prototype[t] = a;
		},
		backCompat(e, t) {
			W.each(t, function(t, n) {
				let r = e.prototype[n], i = _a + W._capitalize(t), a = va + W._capitalize(t);
				function o() {
					return W.error("\"" + t + "\" method is deprecated and will be removed soon. Use \"\"" + n + "\" instead."), r.apply(this, arguments);
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
function ya(e) {
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
			W.warn(`CSS filter "${e}" is not supported in fallback mode. Consider using function filters for better compatibility.`);
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
			let t = U.Filters?.[W._capitalize(r)];
			if (!t) continue;
			let a = Object.create(this);
			a.attrs = { ...this.attrs }, r === "blur" && (a.attrs.blurRadius = i * .5), r === "brightness" && (a.attrs.brightness = i), r === "contrast" && (a.attrs.contrast = 100 * (Math.sqrt(i) - 1)), t.call(a, e, n);
		}
	};
}
var ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, J, Ia, La = o((() => {
	Yi(), Gi(), Zi(), oa(), q(), $r(), ki(), ga(), ba = "absoluteOpacity", xa = "absoluteTransform", Sa = "Change", Ca = "children", wa = "konva", Ta = "listening", Ea = [
		"mouseenter",
		"mouseleave",
		"pointerenter",
		"pointerleave",
		"touchenter",
		"touchleave"
	], Da = "set", Oa = "Shape", ka = " ", Aa = "stage", ja = "transform", Ma = "Stage", Na = "visible", Pa = [
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
	].join(ka), Fa = 1, J = class e {
		constructor(e) {
			this._id = Fa++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this.parent = null, this._cache = {}, this._canvasCache = null, this._batchingTransformChange = !1, this._needClearTransformCache = !1, this._filterUpToDate = !1, this._isUnderCache = !1, this._dragEventId = null, this._shouldFireChangeEvents = !1, this.setAttrs(e), this._shouldFireChangeEvents = !0;
		}
		hasChildren() {
			return !1;
		}
		_clearCache(e) {
			(e === ja || e === xa) && this._cache[e] ? this._cache[e].dirty = !0 : e ? this._cache[e] = void 0 : (this._cache = {}, this._attrsVersion !== void 0 && this._attrsVersion++);
		}
		_releaseCanvasCache() {
			let e = this._canvasCache;
			e && (W.releaseCanvas(e.scene._canvas, e.filter._canvas, ...e.hit ? [e.hit._canvas] : []), this._canvasCache = null);
		}
		_getCache(e, t) {
			let n = this._cache[e];
			return (n === void 0 || (e === ja || e === xa) && n.dirty === !0) && (n = t.call(this), this._cache[e] = n), n;
		}
		_getCanvasCache() {
			return this._canvasCache;
		}
		_clearSelfAndDescendantCache(e) {
			this._clearCache(e), (e === void 0 || e === xa) && this.fire("absoluteTransformChange");
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
			if (a <= 0 || o <= 0 || !isFinite(r + i + a + o)) return W.error(`Can not cache the node. Its size is 0 or its bounds are not finite numbers (${r}, ${i}, ${a}x${o}). Caching is skipped.`), this;
			a += c * 2, o += c * 2, r -= c, i -= c;
			let d = new qi({
				pixelRatio: s,
				width: a,
				height: o
			}), f = new qi({
				pixelRatio: s,
				width: 0,
				height: 0,
				willReadFrequently: !0
			}), p = d.getContext();
			d.isCache = !0, this._releaseCanvasCache(), this._filterUpToDate = !1, t.imageSmoothingEnabled === !1 && (d.getContext()._context.imageSmoothingEnabled = !1, f.getContext()._context.imageSmoothingEnabled = !1), p.save(), p.translate(-r, -i), this._isUnderCache = !0, this._clearSelfAndDescendantCache(ba);
			try {
				this.drawScene(d, this);
			} catch (e) {
				throw W.releaseCanvas(d._canvas), e;
			} finally {
				this._isUnderCache = !1, this._clearSelfAndDescendantCache(ba), p.restore(), d._releaseIsolationCanvas();
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
			let n = new Ji(t.hitConfig);
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
			for (let t = 0; t < e.length; t++) if (typeof e[t] != "string" || !ji()) {
				l = !1;
				break;
			}
			let u = n.pixelRatio;
			if (r.setSizeIfChanged(n._logicalWidth, n._logicalHeight), l) {
				let t = e.join(" ").replace(/url\((?:[^()"']|"[^"]*"|'[^']*')*\)|"[^"]*"|'[^']*'|([-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?)(px|em|rem|ex|ch|cap|ic|lh|rlh|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc)\b/gi, (e, t, n) => t === void 0 ? e : `${Number(t) * u}${n}`);
				return i.clear(), i.save(), i.setAttr("filter", t), i.drawImage(n._canvas, 0, 0, n.getWidth() / u, n.getHeight() / u), i.restore(), this._filterUpToDate = !0, r;
			}
			try {
				for (a = e.length, i.clear(), i.drawImage(n._canvas, 0, 0, n.getWidth() / u, n.getHeight() / u), o = i.getImageData(0, 0, r.getWidth(), r.getHeight()), s = 0; s < a; s++) c = e[s], typeof c == "string" && (c = ya(c)), c.call(this, o, u);
				i.putImageData(o, 0, 0);
			} catch (e) {
				W.error("Unable to apply filter. " + e.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
			}
			return this._filterUpToDate = !0, r;
		}
		on(...e) {
			this._prepareListeners();
			let t = e[0], n = e[1];
			if (e[2], e.length === 3) return this._delegate.apply(this, e);
			let r = t.split(ka);
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
			let n = (e || "").split(ka), r = n.length, i, a, o, s, c, l;
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
				for (let t = 0; t < i.length; t++) e = W.cloneObject(e), e.currentTarget = i[t], n.call(i[t], e);
			}), this;
		}
		remove() {
			return this.isDragging() && this.stopDrag(), Xi._dragElements.delete(this._id), Xi._dragElements.forEach((e, t) => {
				this.isAncestorOf(e.node) && Xi._dragElements.delete(t);
			}), this._remove(), this;
		}
		_clearCaches() {
			this._clearSelfAndDescendantCache(xa), this._clearSelfAndDescendantCache(ba), this._clearSelfAndDescendantCache(Aa), this._clearSelfAndDescendantCache(Na), this._clearSelfAndDescendantCache(Ta);
		}
		_remove() {
			let e = this.getParent();
			e && e.children && (e.children.splice(this.index, 1), e._setChildrenIndices(), this.parent = null), this._clearCaches();
		}
		destroy() {
			return this._fire("destroy", { target: this }), na(this), this.remove(), this.clearCache(), this;
		}
		getAttr(e) {
			let t = "get" + W._capitalize(e);
			return W._isFunction(this[t]) ? this[t]() : this.attrs[e];
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
				for (t in e) t !== Ca && (n = Da + W._capitalize(t), W._isFunction(this[n]) ? this[n](e[t]) : this._setAttr(t, e[t]));
			}), this;
		}
		isListening() {
			return this._getCache(Ta, this._isListening);
		}
		_isListening(e) {
			if (!this.listening()) return !1;
			let t = this.getParent();
			return t && t !== e && this !== e ? t._isListening(e) : !0;
		}
		isVisible() {
			return this._getCache(Na, this._isVisible);
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
				for (r = [], i = c.length, a = 0; a < i; a++) o = c[a], n++, o.nodeType !== Oa && (r = r.concat(o.children)), o._id === t._id && (a = i);
				r.length > 0 && r[0].getDepth() <= e && s(r);
			}
			let c = this.getStage();
			return t.nodeType !== Ma && c && s(c.children), n;
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
					this._batchingTransformChange = !1, this._needClearTransformCache && (this._needClearTransformCache = !1, this._clearCache(ja), this._clearSelfAndDescendantCache(xa));
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
			let t = this.getAbsoluteTransform(e).getMatrix(), n = new ri(), r = this.offset();
			return n.m = t.slice(), n.translate(r.x, r.y), n.getTranslation();
		}
		setAbsolutePosition(e) {
			let { x: t, y: n, ...r } = this._clearTransform();
			this.attrs.x = t, this.attrs.y = n, this._clearCache(ja);
			let i = this._getAbsoluteTransform().copy(), a = i.isInvertible();
			i.invert(), i.translate(e.x, e.y);
			let { x: o, y: s } = i.getTranslation();
			return this._setTransform(r), a ? this.setPosition({
				x: this.attrs.x + o,
				y: this.attrs.y + s
			}) : W.warn("Cannot set the absolute position: the absolute transform is not invertible (an ancestor has a zero scale)."), this._clearCache(ja), this._clearSelfAndDescendantCache(xa), this;
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
			if (!this.parent) return W.warn("Node has no parent. moveToTop function is ignored."), !1;
			let e = this.index;
			return e < this.parent.children.length - 1 && (this.parent.children.splice(e, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0);
		}
		moveUp() {
			if (!this.parent) return W.warn("Node has no parent. moveUp function is ignored."), !1;
			let e = this.index;
			return e < this.parent.children.length - 1 && (this.parent.children.splice(e, 1), this.parent.children.splice(e + 1, 0, this), this.parent._setChildrenIndices(), !0);
		}
		moveDown() {
			if (!this.parent) return W.warn("Node has no parent. moveDown function is ignored."), !1;
			let e = this.index;
			return e > 0 && (this.parent.children.splice(e, 1), this.parent.children.splice(e - 1, 0, this), this.parent._setChildrenIndices(), !0);
		}
		moveToBottom() {
			if (!this.parent) return W.warn("Node has no parent. moveToBottom function is ignored."), !1;
			let e = this.index;
			return e > 0 && (this.parent.children.splice(e, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0);
		}
		setZIndex(e) {
			if (!this.parent) return W.warn("Node has no parent. zIndex parameter is ignored."), this;
			(e < 0 || e >= this.parent.children.length) && W.warn("Unexpected value " + e + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
			let t = this.index;
			return this.parent.children.splice(t, 1), this.parent.children.splice(e, 0, this), this.parent._setChildrenIndices(), this;
		}
		getAbsoluteOpacity() {
			return this._getCache(ba, this._getAbsoluteOpacity);
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
			for (t in e) n = e[t], n instanceof xi && (n = Array.from(n)), r = W.isObject(n) && !W._isPlainObject(n) && !W._isArray(n), !r && (this["get" + W._capitalize(t)]?._def !== n || t === "brightness" || t === "threshold") && (i.attrs[t] = t === "filters" && W._isArray(n) ? n.filter((e) => typeof e == "string") : W.isObject(n) ? W._prepareToStringify(n) : n);
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
			for (r = 0; r < n; r++) if (i = t[r], W.isValidSelector(i) || (W.warn("Selector \"" + i + "\" is invalid. Allowed selectors examples are \"#foo\", \".bar\" or \"Group\"."), W.warn("If you have a custom shape with such className, please change it to start with upper letter like \"Triangle\"."), W.warn("Konva is awesome, right?")), i.charAt(0) === "#") {
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
			return this._getCache(Aa, this._getStage);
		}
		_getStage() {
			let e = this.getParent();
			return e ? e.getStage() : null;
		}
		fire(e, t, n) {
			return t = t || {}, t.target = t.target || this, n ? this._fireAndBubble(e, t) : this._fire(e, t), this;
		}
		getAbsoluteTransform(e) {
			return e || this._hasCachedAncestor() ? this._getAbsoluteTransform(e) : this._getCache(xa, this._getCachedAbsoluteTransform);
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
			let t = new ri();
			return this === e ? t : (this.parent && this.parent !== e && this.parent.getAbsoluteTransform(e).copyInto(t), this._multiplyOwnTransform(t));
		}
		_getCachedAbsoluteTransform() {
			let e = this._cache[xa] || new ri();
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
			return this._getCache(ja, this._getTransform);
		}
		_getTransform() {
			let e = this._cache[ja] || new ri();
			e.reset();
			let t = this.x(), n = this.y(), r = U.getAngle(this.rotation()), i = this.attrs.scaleX ?? 1, a = this.attrs.scaleY ?? 1, o = this.attrs.skewX || 0, s = this.attrs.skewY || 0, c = this.attrs.offsetX || 0, l = this.attrs.offsetY || 0;
			return (t !== 0 || n !== 0) && e.translate(t, n), r !== 0 && e.rotate(r), (o !== 0 || s !== 0) && e.skew(o, s), (i !== 1 || a !== 1) && e.scale(i, a), (c !== 0 || l !== 0) && e.translate(-1 * c, -1 * l), e.dirty = !1, e;
		}
		clone(e) {
			let t = W.cloneObject(this.attrs), n, r, i, a, o;
			for (n in e) t[n] = e[n];
			let s = new this.constructor(t);
			for (n in this.eventListeners) for (r = this.eventListeners[n], i = r.length, a = 0; a < i; a++) o = r[a], o.name.indexOf(wa) < 0 && (s.eventListeners[n] || (s.eventListeners[n] = []), s.eventListeners[n].push(o));
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
			isFinite(t.x + t.y + t.width + t.height) || W.error(`Cannot find the bounds of the node to export, its client rect is ${t.x}, ${t.y}, ${t.width}x${t.height}. Check its position, size and points.`);
			let n = this.getStage(), r = e.x === void 0 ? Math.floor(t.x) : e.x, i = e.y === void 0 ? Math.floor(t.y) : e.y, a = e.pixelRatio || 1, o = new qi({
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
					W._urlToImage(this.toDataURL(i), function(e) {
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
			return this.attrs.dragDistance === void 0 ? this.parent ? this.parent.getDragDistance() : U.dragDistance : this.attrs.dragDistance;
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
			this._fire(e + Sa, {
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
			let n = this[Da + W._capitalize(e)];
			return W._isFunction(n) ? n.call(this, t) : this._setAttr(e, t), this;
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
			(e = this.parent) == null || e._notifySubtreeChange(), U.autoDrawEnabled && (this.getLayer() || this.getStage())?.batchDraw();
		}
		_setAttr(e, t) {
			let n = this.attrs[e];
			(n !== t || W.isObject(t)) && (t == null ? delete this.attrs[e] : this.attrs[e] = t, this._attrsVersion !== void 0 && this._attrsVersion++, this._shouldFireChangeEvents && this._fireChangeEvent(e, n, t), this._requestDraw());
		}
		_fireAndBubble(e, t, n) {
			t && this.nodeType === Oa && (t.target = this);
			let r = Ea.indexOf(e) !== -1;
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
			let i = n._getPointerById(t) || n._changedPointerPositions[0] || r, a = e?.evt?.type ? W._getEventType(e.evt.type) : n._pointerEventType, o = a !== "pointer";
			Xi._dragElements.set(this._id, {
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
			Xi._dragElements.has(this._id) || this._createDragElement(e);
			let r = Xi._dragElements.get(this._id);
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
				if (!t) W.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
				else if (!W._isNumber(t.x) || !W._isNumber(t.y)) {
					W.warn(`dragBoundFunc returned a position with a non-finite x or y (${t.x}, ${t.y}). The node was not moved.`);
					return;
				} else r = t;
			}
			let a = t.lastPos;
			(!a || a.x !== r.x || a.y !== r.y) && (this.setAbsolutePosition(r), this._requestDraw()), t.lastPos = r;
		}
		stopDrag(e) {
			let t = Xi._dragElements.get(this._id);
			t && (t.dragStatus = "stopped", Xi._endDragBefore(e, void 0, t), Xi._endDragAfter(e, t));
		}
		setDraggable(e) {
			this._setAttr("draggable", e), this._dragChange();
		}
		isDragging() {
			let e = Xi._dragElements.get(this._id);
			return e ? e.dragStatus === "dragging" : !1;
		}
		_listenDrag() {
			this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(e) {
				if (!(e.evt.button === void 0 || U.dragButtons.indexOf(e.evt.button) >= 0) || Xi._dragElements.has(this._id)) return;
				let t = !1;
				Xi._dragElements.forEach((e) => {
					this.isAncestorOf(e.node) && (t = !0);
				}), t || this._createDragElement(e);
			});
		}
		_dragChange() {
			if (this.attrs.draggable) this._listenDrag();
			else {
				if (this._dragCleanup(), !this.getStage()) return;
				let e = Xi._dragElements.get(this._id), t = e && e.dragStatus === "dragging", n = e && e.dragStatus === "ready";
				t ? this.stopDrag() : n && Xi._dragElements.delete(this._id);
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
			return W.haveIntersection(n, this.getClientRect());
		}
		static create(e, t) {
			return W._isString(e) && (e = JSON.parse(e)), this._createNode(e, t);
		}
		static _createNode(t, n) {
			let r = e.prototype.getClassName.call(t), i = t.children, a, o, s;
			if (n && (t.attrs.container = n), !U[r]) {
				let e = i ? "Group" : "Shape";
				W.warn("Can not find a node with class name \"" + r + `". Fallback to "${e}".`), r = e;
			}
			let c = U[r];
			if (a = new c(t.attrs), i) for (o = i.length, s = 0; s < o; s++) a.add(e._createNode(i[s]));
			return a;
		}
	}, J._subtreeObserverCount = 0, J._absTransformCascadeDepth = 0, J._pendingAfterCascade = [], J.protoListenerMap = /* @__PURE__ */ new WeakMap(), J.prototype.nodeType = "Node", J.prototype._attrsAffectingSize = [], J.prototype.on(Pa, function() {
		this._batchingTransformChange ? this._needClearTransformCache = !0 : (this._clearCache(ja), this._clearSelfAndDescendantCache(xa));
	}), J.prototype.on("visibleChange.konva", function() {
		this._clearSelfAndDescendantCache(Na);
	}), J.prototype.on("listeningChange.konva", function() {
		this._clearSelfAndDescendantCache(Ta);
		for (let e = this.getParent(); e; e = e.getParent()) {
			let t = e._getCanvasCache();
			t?.hit && (W.releaseCanvas(t.hit._canvas), t.hit = null);
		}
	}), J.prototype.on("opacityChange.konva", function() {
		this._clearSelfAndDescendantCache(ba);
	}), Ia = K.addGetterSetter, Ia(J, "zIndex"), Ia(J, "absolutePosition"), Ia(J, "position"), Ia(J, "x", 0, G()), Ia(J, "y", 0, G()), Ia(J, "globalCompositeOperation", "source-over", da()), Ia(J, "opacity", 1, G()), Ia(J, "name", "", da()), Ia(J, "id", "", da()), Ia(J, "rotation", 0, G()), K.addComponentsGetterSetter(J, "scale", ["x", "y"]), Ia(J, "scaleX", 1, G()), Ia(J, "scaleY", 1, G()), K.addComponentsGetterSetter(J, "skew", ["x", "y"]), Ia(J, "skewX", 0, G()), Ia(J, "skewY", 0, G()), K.addComponentsGetterSetter(J, "offset", ["x", "y"]), Ia(J, "offsetX", 0, G()), Ia(J, "offsetY", 0, G()), Ia(J, "dragDistance", void 0, G()), Ia(J, "width", 0, G()), Ia(J, "height", 0, G()), Ia(J, "listening", !0, ma()), Ia(J, "preventDefault", !0, ma()), Ia(J, "filters", void 0, function(e) {
		return this._filterUpToDate = !1, e;
	}), Ia(J, "visible", !0, ma()), Ia(J, "transformsEnabled", "all", da()), Ia(J, "size"), Ia(J, "dragBoundFunc"), Ia(J, "draggable", !1, ma()), K.backCompat(J, {
		rotateDeg: "rotate",
		setRotationDeg: "setRotation",
		getRotationDeg: "getRotation"
	});
})), Ra, za = o((() => {
	q(), La(), ga(), Ra = class extends J {
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
			let e = J.prototype.toObject.call(this);
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
			let t = J.prototype.clone.call(this, e);
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
			n && J._absTransformCascadeDepth++;
			try {
				if (super._clearSelfAndDescendantCache(e), e === "absoluteTransform" && this.isCached()) return;
				(t = this.children) == null || t.forEach(function(t) {
					t._clearSelfAndDescendantCache(e);
				});
			} finally {
				if (n && --J._absTransformCascadeDepth === 0) {
					let e = J._pendingAfterCascade;
					if (e.length) {
						J._pendingAfterCascade = [];
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
	}, K.addComponentsGetterSetter(Ra, "clip", [
		"x",
		"y",
		"width",
		"height"
	]), K.addGetterSetter(Ra, "clipX", void 0, G()), K.addGetterSetter(Ra, "clipY", void 0, G()), K.addGetterSetter(Ra, "clipWidth", void 0, G()), K.addGetterSetter(Ra, "clipHeight", void 0, G()), K.addGetterSetter(Ra, "clipFunc");
}));
//#endregion
//#region node_modules/konva/lib/Stage.js
function Ba(e = {}) {
	return (e.clipFunc || e.clipWidth || e.clipHeight) && W.warn("Stage does not support clipping. Please use clip for Layers or Groups."), e;
}
var Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo, so, co, lo, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So = o((() => {
	ki(), q(), za(), $r(), Yi(), Zi(), oa(), Va = "Stage", Ha = "string", Ua = "px", Wa = "mouseout", Ga = "mouseleave", Ka = "mouseover", qa = "mouseenter", Ja = "mousemove", Ya = "mousedown", Xa = "mouseup", Za = "pointermove", Qa = "pointerdown", $a = "pointerup", eo = "pointercancel", to = "lostpointercapture", no = "pointerout", ro = "pointerleave", io = "pointerover", ao = "pointerenter", oo = "contextmenu", so = "touchstart", co = "touchend", lo = "touchmove", uo = "touchcancel", fo = "wheel", po = 5, mo = [
		[qa, "_pointerenter"],
		[Ya, "_pointerdown"],
		[Ja, "_pointermove"],
		[Xa, "_pointerup"],
		[Ga, "_pointerleave"],
		[so, "_pointerdown"],
		[lo, "_pointermove"],
		[co, "_pointerup"],
		[uo, "_pointercancel"],
		[Ka, "_pointerover"],
		[fo, "_wheel"],
		[oo, "_contextmenu"],
		[Qa, "_pointerdown"],
		[Za, "_pointermove"],
		[$a, "_pointerup"],
		[eo, "_pointercancel"],
		[ro, "_pointerleave"],
		[to, "_lostpointercapture"]
	], ho = {
		mouse: {
			[no]: Wa,
			[ro]: Ga,
			[io]: Ka,
			[ao]: qa,
			[Za]: Ja,
			[Qa]: Ya,
			[$a]: Xa,
			[eo]: "mousecancel",
			pointerclick: "click",
			pointerdblclick: "dblclick"
		},
		touch: {
			[no]: "touchout",
			[ro]: "touchleave",
			[io]: "touchover",
			[ao]: "touchenter",
			[Za]: lo,
			[Qa]: so,
			[$a]: co,
			[eo]: uo,
			pointerclick: "tap",
			pointerdblclick: "dbltap"
		},
		pointer: {
			[no]: no,
			[ro]: ro,
			[io]: io,
			[ao]: ao,
			[Za]: Za,
			[Qa]: Qa,
			[$a]: $a,
			[eo]: eo,
			pointerclick: "pointerclick",
			pointerdblclick: "pointerdblclick"
		}
	}, go = (e) => {
		let t = W._getEventType(e);
		if (t === "pointer") return U.pointerEventsEnabled && ho.pointer;
		if (t === "touch") return ho.touch;
		if (t === "mouse") return ho.mouse;
	}, _o = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);", vo = [], yo = /* @__PURE__ */ new WeakSet(), bo = (e) => {
		e && !yo.has(e) && (yo.add(e), Xi._listenToWindow(e), e.document.addEventListener("visibilitychange", () => {
			vo.forEach((e) => {
				e.batchDraw();
			});
		}));
	}, xo = class extends Ra {
		constructor(e) {
			super(Ba(e)), this._pointerPositions = [], this._changedPointerPositions = [], this._pointerStates = /* @__PURE__ */ new Map(), this._lastClicks = {}, this._buildDOM(), this._bindContentEvents(), vo.push(this), this.on("widthChange.konva heightChange.konva", this._resizeDOM), this.on("visibleChange.konva", this._checkVisibility), this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
				Ba(this.attrs);
			}), this._checkVisibility();
		}
		_validateAdd(e) {
			let t = e.getType() === "Layer", n = e.getType() === "FastLayer";
			t || n || W.throw("You may only add layers to the stage.");
		}
		_checkVisibility() {
			if (!this.content) return;
			let e = this.visible() ? "" : "none";
			this.content.style.display = e;
		}
		_getOwnerWindow() {
			return (this.content || this.container())?.ownerDocument?.defaultView || (U.isBrowser ? window : null);
		}
		setContainer(e) {
			if (typeof e === Ha) {
				let t;
				if (e.charAt(0) === ".") {
					let t = e.slice(1);
					e = document.getElementsByClassName(t)[0];
				} else t = e.charAt(0) === "#" ? e.slice(1) : e, e = document.getElementById(t);
				if (!e) throw "Can not find container in document with id " + t;
			}
			return this._setAttr("container", e), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), e.appendChild(this.content), bo(this._getOwnerWindow())), this;
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
			return e || (e = {}), e.container = typeof document < "u" && document.createElement("div"), Ra.prototype.clone.call(this, e);
		}
		destroy() {
			var e;
			super.destroy(), this._pointerStates.clear(), this._lastClicks = {};
			let t = this.content;
			(e = t?.parentNode) == null || e.removeChild(t);
			let n = vo.indexOf(this);
			return n > -1 && vo.splice(n, 1), W.releaseCanvas(this.bufferHitCanvas._canvas), this;
		}
		getPointerPosition() {
			let e = this._pointerPositions[0] || this._changedPointerPositions[0];
			return e ? {
				x: e.x,
				y: e.y
			} : (W.warn(_o), null);
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
			let t = new qi({
				width: e.width,
				height: e.height,
				pixelRatio: e.pixelRatio || 1
			}), n = t.getContext()._context, r = this.children;
			return (e.x || e.y) && n.translate(-1 * e.x, -1 * e.y), r.forEach(function(t) {
				if (!t.isVisible()) return;
				let r = t._toKonvaCanvas(e);
				n.drawImage(r._canvas, e.x, e.y, r.getWidth() / r.getPixelRatio(), r.getHeight() / r.getPixelRatio()), W.releaseCanvas(r._canvas);
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
			this.content && (this.content.style.width = e + Ua, this.content.style.height = t + Ua), this.children.forEach((n) => {
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
			return n > po && W.warn("The stage has " + n + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), e._setSize({
				width: this.width(),
				height: this.height()
			}), e.draw(), U.isBrowser && this.content.appendChild(e.canvas._canvas), this;
		}
		getParent() {
			return null;
		}
		getLayer() {
			return null;
		}
		hasPointerCapture(e) {
			return ea(e, this);
		}
		setPointerCapture(e) {
			ta(e, this);
		}
		releaseCapture(e) {
			ra(e, this);
		}
		getLayers() {
			return this.getChildren();
		}
		_bindContentEvents() {
			U.isBrowser && mo.forEach(([e, t]) => {
				this.content.addEventListener(e, (e) => {
					this._batchEvents(() => this[t](e));
				}, { passive: !1 });
			});
		}
		_batchEvents(e) {
			W._batchEvents(this.eventBatchFunc(), e);
		}
		_pointerenter(e) {
			this.setPointersPositions(e);
			let t = go(e.type);
			t && this._fire(t.pointerenter, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_pointerover(e) {
			this.setPointersPositions(e);
			let t = go(e.type);
			t && this._fire(t.pointerover, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_pointerEventsEnabled() {
			if (U.hitOnDragEnabled) return !0;
			for (let { node: e, dragStatus: t } of Xi._dragElements.values()) if (t === "dragging" && e.getStage() === this) return !1;
			return !this.getLayers().some((e) => U.Transformer?._isLayerTransforming(e));
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
			let t = go(e.type), n = W._getEventType(e.type);
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
			let t = go(e.type), n = W._getEventType(e.type);
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
				for (let e of Xi._dragElements.values()) e.dragStatus === "dragging" && (e.pointerId === void 0 || e.pointerEventType === n && e.pointerId === i.id || e.pointerEventType === "mouse" && n === "pointer" && s.pointerType !== "touch") && e.node.getStage() === this && (e.pointerId === void 0 && n !== "pointer" && (e.pointerId = i.id, e.pointerEventType = n), this._cancelClick(i.id, n));
				if (!a || !a.isListening()) return;
				U.capturePointerEventsEnabled && a.setPointerCapture(i.id), a._fireAndBubble(t.pointerdown, {
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
			let t = go(e.type), n = W._getEventType(e.type);
			if (!t) return;
			let r = e.type.indexOf("touch") >= 0 || e.pointerType === "touch";
			if (e.cancelable && r) {
				for (let { node: t, dragStatus: n } of Xi._dragElements.values()) if (n === "dragging" && t.getStage() === this && t.preventDefault()) {
					e.preventDefault();
					break;
				}
			}
			if (this.setPointersPositions(e), !this._pointerEventsEnabled()) return;
			let i = {}, a = !1;
			this._changedPointerPositions.forEach((r) => {
				let o = `${n}:${r.id}`, s = this._pointerStates.get(o);
				s || (s = {}, this._pointerStates.set(o, s));
				let c = Qi(r.id) || this.getIntersection(r), l = s.targetShape === c || s.targetShape?.getStage() === this ? s.targetShape : void 0, u = r.id, d = {
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
			let t = go(e.type), n = W._getEventType(e.type);
			if (!t) return;
			this.setPointersPositions(e);
			let r = {}, i = !1;
			this._changedPointerPositions.forEach((a) => {
				let o = `${n}:${a.id}`, s = this._pointerStates.get(o), c = s?.clickStartShape !== void 0, l = s?.clickStartShape;
				s?.targetShape && n !== "touch" ? this._pointerStates.set(o, { targetShape: s.targetShape }) : this._pointerStates.delete(o);
				let u = Qi(a.id) || this.getIntersection(a), d = u && r[u._id];
				u && (u.releaseCapture(a.id), r[u._id] = !0);
				let f = a.id, p = {
					evt: e,
					pointerId: f
				}, m = u && u.isListening() ? u : null, h = this._lastClicks[n], g = c && (!m || l === m), _ = g && h && s?.lastClick === h && h.shape === m && Date.now() - h.time < U.dblClickWindow;
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
			t && t.isListening() ? t._fireAndBubble(oo, { evt: e }) : this._fire(oo, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_wheel(e) {
			this.setPointersPositions(e);
			let t = this.getIntersection(this.getPointerPosition());
			t && t.isListening() ? t._fireAndBubble(fo, { evt: e }) : this._fire(fo, {
				evt: e,
				target: this,
				currentTarget: this
			});
		}
		_pointercancel(e) {
			this.setPointersPositions(e);
			let t = go(e.type);
			this._changedPointerPositions.forEach((n) => {
				let r = W._getEventType(e.type), i = `${r}:${n.id}`;
				this._cancelClick(n.id, r);
				let a = this._pointerStates.get(i)?.targetShape;
				a && r !== "touch" ? this._pointerStates.set(i, { targetShape: a }) : this._pointerStates.delete(i);
				let o = Qi(n.id) || this.getIntersection(n), s = {
					evt: e,
					pointerId: n.id
				};
				o ? (t && o._fireAndBubble(t.pointercancel, { ...s }), o._fireAndBubble($a, { ...s })) : t && this._fire(t.pointercancel, {
					...s,
					target: this,
					currentTarget: this
				}), ra(n.id), t && r === "touch" && a?.getStage() === this && (a._fireAndBubble(t.pointerout, { ...s }), a._fireAndBubble(t.pointerleave, { ...s }));
			});
		}
		_lostpointercapture(e) {
			Qi(e.pointerId, this) && ra(e.pointerId);
		}
		setPointersPositions(e) {
			let t = this._getContentPosition(), n = null, r = null;
			e = e || window.event, e.touches === void 0 ? (this._pointerEventType = e.pointerId === void 0 ? "mouse" : "pointer", n = (e.clientX - t.left) / t.scaleX, r = (e.clientY - t.top) / t.scaleY, this.pointerPos = {
				x: n,
				y: r
			}, this._pointerPositions = [{
				x: n,
				y: r,
				id: W._getFirstPointerId(e)
			}], this._changedPointerPositions = [{
				x: n,
				y: r,
				id: W._getFirstPointerId(e)
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
			W.warn("Method _setPointerPosition is deprecated. Use \"stage.setPointersPositions(event)\" instead."), this.setPointersPositions(e);
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
			if (this.bufferHitCanvas = new Ji({
				pixelRatio: 1,
				width: 0,
				height: 0
			}), !U.isBrowser) return;
			let e = this.container();
			if (!e) throw "Stage has no container. A container is required.";
			e.innerHTML = "", this.content = e.ownerDocument.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), e.appendChild(this.content), bo(this._getOwnerWindow()), this._resizeDOM();
		}
		cache() {
			return W.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this;
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
	}, xo.prototype.nodeType = Va, Qr(xo), K.addGetterSetter(xo, "container"), K.addGetterSetter(xo, "eventBatchFunc");
}));
//#endregion
//#region node_modules/konva/lib/Shape.js
function Co() {
	return Bo || (Bo = W.createCanvasElement().getContext("2d"), Bo);
}
function wo(e) {
	let t = this.attrs.fillRule;
	t ? e.fill(t) : e.fill();
}
function To(e) {
	e.stroke();
}
function Eo() {
	this._clearCache(No);
}
function Do() {
	this._clearCache(Po);
}
function Oo() {
	this._clearCache(Fo);
}
function ko() {
	this._clearCache(Io);
}
function Ao() {
	this._clearCache(Lo);
}
function jo() {
	this._clearCache(Ro);
}
function Mo() {
	this._clearCache(zo);
}
var No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Y, Ho = o((() => {
	$r(), ki(), q(), La(), ga(), oa(), No = "hasShadow", Po = "hasFill", Fo = "hasStroke", Io = "shadowRGBA", Lo = "patternImage", Ro = "linearGradient", zo = "radialGradient", Vo = {}, Y = class e extends J {
		constructor(e) {
			super(e);
			let t, n = 0;
			for (; t = W.getHitColor(), !t || t in Vo;) if (n++, n >= 1e4) {
				W.warn("Failed to find a unique color key for a shape. Konva may work incorrectly. Most likely your browser is using canvas farbling. Consider disabling it."), t = W.getRandomColor();
				break;
			}
			this.colorKey = t, Vo[t] = this;
		}
		getContext() {
			return W.warn("shape.getContext() method is deprecated. Please do not use it."), this.getLayer().getContext();
		}
		getCanvas() {
			return W.warn("shape.getCanvas() method is deprecated. Please do not use it."), this.getLayer().getCanvas();
		}
		getSceneFunc() {
			return this.attrs.sceneFunc || this._sceneFunc;
		}
		getHitFunc() {
			return this.attrs.hitFunc || this._hitFunc;
		}
		hasShadow() {
			return this._getCache(No, this._hasShadow);
		}
		_hasShadow() {
			return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
		}
		_getFillPattern() {
			return this._getCache(Lo, this.__getFillPattern);
		}
		__getFillPattern() {
			if (this.fillPatternImage()) {
				let e = Co().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
				if (e && e.setTransform) {
					let t = new ri();
					t.translate(this.fillPatternX(), this.fillPatternY()), t.rotate(U.getAngle(this.fillPatternRotation())), t.scale(this.fillPatternScaleX(), this.fillPatternScaleY()), t.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
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
			return this._getCache(Ro, this.__getLinearGradient);
		}
		__getLinearGradient() {
			let e = this.fillLinearGradientColorStops();
			if (e) {
				let t = Co(), n = this.fillLinearGradientStartPoint(), r = this.fillLinearGradientEndPoint(), i = t.createLinearGradient(n.x, n.y, r.x, r.y);
				for (let t = 0; t < e.length; t += 2) i.addColorStop(e[t], e[t + 1]);
				return i;
			}
		}
		_getRadialGradient() {
			return this._getCache(zo, this.__getRadialGradient);
		}
		__getRadialGradient() {
			let e = this.fillRadialGradientColorStops();
			if (e) {
				let t = Co(), n = this.fillRadialGradientStartPoint(), r = this.fillRadialGradientEndPoint(), i = t.createRadialGradient(n.x, n.y, this.fillRadialGradientStartRadius(), r.x, r.y, this.fillRadialGradientEndRadius());
				for (let t = 0; t < e.length; t += 2) i.addColorStop(e[t], e[t + 1]);
				return i;
			}
		}
		getShadowRGBA() {
			return this._getCache(Io, this._getShadowRGBA);
		}
		_getShadowRGBA() {
			if (!this.hasShadow()) return;
			let e = W.colorToRGBA(this.shadowColor());
			if (e) return "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a * (this.shadowOpacity() || 1) + ")";
		}
		hasFill() {
			return this._getCache(Po, this._hasFill);
		}
		_hasFill() {
			return this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops());
		}
		hasStroke() {
			return this._getCache(Fo, this._hasStroke);
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
			return J.prototype.destroy.call(this), delete Vo[this.colorKey], delete this.colorKey, this;
		}
		_useBufferCanvas(e, t = this.getAbsoluteOpacity()) {
			if (!(this.attrs.perfectDrawEnabled ?? !0)) return !1;
			let n = e || this.hasFill(), r = this.hasStroke(), i = !this._isUnderCache && t !== 1;
			if (n && r && i) return !0;
			let a = this.hasShadow(), o = this.shadowForStrokeEnabled();
			return !!(n && r && a && o);
		}
		setStrokeHitEnabled(e) {
			W.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), e ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0);
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
			i && !this.strokeScaleEnabled() ? a = this._transformedRect(a, r) : (a.width < 0 || a.height < 0) && (a = new ri()._getTransformedRect(a));
			let o = !e.skipStroke && this.hasStroke() ? i ? this._getStrokePadding() * 2 : this.strokeWidth() : 0, s = o, c = o, l;
			if (!i && o && !this.strokeScaleEnabled()) {
				let e = this;
				for (; e && !e.isCached() && !e._isUnderCache;) e = e.parent;
				let [t, i, a, o] = this.getAbsoluteTransform(e).getMatrix(), u = Math.abs(t * o - i * a);
				if (u) s *= Math.hypot(a, o) / u, c *= Math.hypot(t, i) / u;
				else if (!n && (s = c = 0, l = e ? e.getAbsoluteTransform().copy() : new ri(), r)) {
					let e = r.getAbsoluteTransform(), [t, n, i, a] = e.getMatrix();
					l = t * a - n * i ? e.copy().invert().multiply(l) : new ri();
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
					let t = !!a._opacityRoot || !!this.attrs.selfRectFunc && this.getSelfRect === e.prototype.getSelfRect || !this.attrs.sceneFunc && !this.attrs.charRenderFunc && Zr.has(this.constructor), r = i._prepareIsolationCanvas(t ? this.getClientRect({
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
			if (this.colorKey || W.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"), o) {
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
				let t = r.getImageData(0, 0, i, a), n = t.data, o = n.length, s = W._hexToRgb(this.colorKey);
				for (let t = 0; t < o; t += 4) n[t + 3] > e ? (n[t] = s.r, n[t + 1] = s.g, n[t + 2] = s.b, n[t + 3] = 255) : n[t + 3] = 0;
				r.putImageData(t, 0, 0);
			} catch (e) {
				W.error("Unable to draw hit graph from cached scene canvas. " + e.message);
			}
			return this;
		}
		hasPointerCapture(e) {
			return ea(e, this);
		}
		setPointerCapture(e) {
			ta(e, this);
		}
		releaseCapture(e) {
			ra(e, this);
		}
	}, Y.prototype._fillFunc = wo, Y.prototype._strokeFunc = To, Y.prototype._fillFuncHit = wo, Y.prototype._strokeFuncHit = To, Y.prototype._centroid = !1, Y.prototype.nodeType = "Shape", Qr(Y), Y.prototype.on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetXChange.konva shadowOffsetYChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", Eo), Y.prototype.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", ko), Y.prototype.on("fillEnabledChange.konva fillChange.konva fillPatternImageChange.konva fillLinearGradientColorStopsChange.konva fillRadialGradientColorStopsChange.konva", Do), Y.prototype.on("strokeEnabledChange.konva strokeWidthChange.konva strokeChange.konva strokeLinearGradientColorStopsChange.konva", Oo), Y.prototype.on("fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", Ao), Y.prototype.on("fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", jo), Y.prototype.on("fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", Mo), K.addGetterSetter(Y, "stroke", void 0, fa()), K.addGetterSetter(Y, "strokeWidth", 2, G()), K.addGetterSetter(Y, "fillAfterStrokeEnabled", !1), K.addGetterSetter(Y, "hitStrokeWidth", "auto", ua()), K.addGetterSetter(Y, "strokeHitEnabled", !0, ma()), K.addGetterSetter(Y, "perfectDrawEnabled", !0, ma()), K.addGetterSetter(Y, "shadowForStrokeEnabled", !0, ma()), K.addGetterSetter(Y, "lineJoin"), K.addGetterSetter(Y, "lineCap"), K.addGetterSetter(Y, "miterLimit"), K.addGetterSetter(Y, "sceneFunc"), K.addGetterSetter(Y, "hitFunc"), K.addGetterSetter(Y, "selfRectFunc"), K.addGetterSetter(Y, "dash"), K.addGetterSetter(Y, "dashOffset", 0, G()), K.addGetterSetter(Y, "shadowColor", void 0, da()), K.addGetterSetter(Y, "shadowBlur", 0, G()), K.addGetterSetter(Y, "shadowOpacity", 1, G()), K.addComponentsGetterSetter(Y, "shadowOffset", ["x", "y"]), K.addGetterSetter(Y, "shadowOffsetX", 0, G()), K.addGetterSetter(Y, "shadowOffsetY", 0, G()), K.addGetterSetter(Y, "fillPatternImage"), K.addGetterSetter(Y, "fill", void 0, fa()), K.addGetterSetter(Y, "fillPatternX", 0, G()), K.addGetterSetter(Y, "fillPatternY", 0, G()), K.addGetterSetter(Y, "fillLinearGradientColorStops"), K.addGetterSetter(Y, "strokeLinearGradientColorStops"), K.addGetterSetter(Y, "fillRadialGradientStartRadius", 0), K.addGetterSetter(Y, "fillRadialGradientEndRadius", 0), K.addGetterSetter(Y, "fillRadialGradientColorStops"), K.addGetterSetter(Y, "fillPatternRepeat", "repeat"), K.addGetterSetter(Y, "fillEnabled", !0), K.addGetterSetter(Y, "strokeEnabled", !0), K.addGetterSetter(Y, "shadowEnabled", !0), K.addGetterSetter(Y, "dashEnabled", !0), K.addGetterSetter(Y, "strokeScaleEnabled", !0), K.addGetterSetter(Y, "fillPriority", "color"), K.addComponentsGetterSetter(Y, "fillPatternOffset", ["x", "y"]), K.addGetterSetter(Y, "fillPatternOffsetX", 0, G()), K.addGetterSetter(Y, "fillPatternOffsetY", 0, G()), K.addComponentsGetterSetter(Y, "fillPatternScale", ["x", "y"]), K.addGetterSetter(Y, "fillPatternScaleX", 1, G()), K.addGetterSetter(Y, "fillPatternScaleY", 1, G()), K.addComponentsGetterSetter(Y, "fillLinearGradientStartPoint", ["x", "y"]), K.addComponentsGetterSetter(Y, "strokeLinearGradientStartPoint", ["x", "y"]), K.addGetterSetter(Y, "fillLinearGradientStartPointX", 0), K.addGetterSetter(Y, "strokeLinearGradientStartPointX", 0), K.addGetterSetter(Y, "fillLinearGradientStartPointY", 0), K.addGetterSetter(Y, "strokeLinearGradientStartPointY", 0), K.addComponentsGetterSetter(Y, "fillLinearGradientEndPoint", ["x", "y"]), K.addComponentsGetterSetter(Y, "strokeLinearGradientEndPoint", ["x", "y"]), K.addGetterSetter(Y, "fillLinearGradientEndPointX", 0), K.addGetterSetter(Y, "strokeLinearGradientEndPointX", 0), K.addGetterSetter(Y, "fillLinearGradientEndPointY", 0), K.addGetterSetter(Y, "strokeLinearGradientEndPointY", 0), K.addComponentsGetterSetter(Y, "fillRadialGradientStartPoint", ["x", "y"]), K.addGetterSetter(Y, "fillRadialGradientStartPointX", 0), K.addGetterSetter(Y, "fillRadialGradientStartPointY", 0), K.addComponentsGetterSetter(Y, "fillRadialGradientEndPoint", ["x", "y"]), K.addGetterSetter(Y, "fillRadialGradientEndPointX", 0), K.addGetterSetter(Y, "fillRadialGradientEndPointY", 0), K.addGetterSetter(Y, "fillPatternRotation", 0), K.addGetterSetter(Y, "fillRule", void 0, da()), K.backCompat(Y, {
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
function Uo(e, t) {
	return e[t + 3] >= 128 ? Vo[W.getHitColorKey(e[t], e[t + 1], e[t + 2])] : void 0;
}
var Wo, Go, Ko, qo, Jo, Yo = o((() => {
	ki(), za(), La(), q(), Yi(), Ho(), $r(), Zi(), Wo = "beforeDraw", Go = "draw", Ko = 10, qo = 256, Jo = class extends Ra {
		constructor(e) {
			super(e), this.canvas = new qi(), this.hitCanvas = new Ji({ pixelRatio: 1 }), this._waitingForDraw = !1, this.on("visibleChange.konva", this._checkVisibility), this._checkVisibility(), this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled), this._setSmoothEnabled();
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
			J.prototype.moveToTop.call(this);
			let e = this.getStage();
			return e && e.content && (e.content.removeChild(this.getNativeCanvasElement()), e.content.appendChild(this.getNativeCanvasElement())), !0;
		}
		moveUp() {
			if (!J.prototype.moveUp.call(this)) return !1;
			let e = this.getStage();
			return !e || !e.content ? !1 : (e.content.removeChild(this.getNativeCanvasElement()), this.index < e.children.length - 1 ? e.content.insertBefore(this.getNativeCanvasElement(), e.children[this.index + 1].getCanvas()._canvas) : e.content.appendChild(this.getNativeCanvasElement()), !0);
		}
		moveDown() {
			if (J.prototype.moveDown.call(this)) {
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
			if (J.prototype.moveToBottom.call(this)) {
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
			t !== "Group" && t !== "Shape" && W.throw("You may only add groups and shapes to a layer.");
		}
		_toKonvaCanvas(e) {
			return e = { ...e }, e.width = e.width || this.getWidth(), e.height = e.height || this.getHeight(), e.x = e.x === void 0 ? this.x() : e.x, e.y = e.y === void 0 ? this.y() : e.y, J.prototype._toKonvaCanvas.call(this, e);
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
			W.warn("Can not change width of layer. Use \"stage.width(value)\" function instead.");
		}
		getHeight() {
			if (this.parent) return this.parent.height();
		}
		setHeight() {
			W.warn("Can not change height of layer. Use \"stage.height(value)\" function instead.");
		}
		batchDraw() {
			return this._waitingForDraw || (this._waitingForDraw = !0, W.requestAnimFrame(() => {
				this._waitingForDraw = !1, this.draw();
			}, this.getStage()?._getOwnerWindow())), this;
		}
		getIntersection(e) {
			if (!this.isListening() || !this.isVisible()) return null;
			let t = this._getIntersection(e);
			if (t.shape) return t.shape;
			if (!t.antialiased) return null;
			let n = this.hitCanvas.pixelRatio, r = Math.floor(e.x * n), i = Math.floor(e.y * n), a = (e) => this.hitCanvas.context.getImageData(r - e, i - e, e * 2 + 1, e * 2 + 1).data, o = Ko, s = o * 2 + 1, c = a(o), l = c[(o * s + o) * 4 + 3];
			for (let e = 1; e <= qo; e++) {
				e > o && (o = Math.min(qo, o * 2), s = o * 2 + 1, c = a(o));
				let t = 0;
				for (let n = -e; n <= e; n++) {
					let r = Math.abs(n) === e ? 1 : e * 2;
					for (let i = -e; i <= e; i += r) {
						let e = ((n + o) * s + i + o) * 4, r = Uo(c, e);
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
			let t = this.hitCanvas.pixelRatio, n = this.hitCanvas.context.getImageData(Math.floor(e.x * t), Math.floor(e.y * t), 1, 1).data, r = Uo(n, 0);
			return r ? { shape: r } : n[3] > 0 ? { antialiased: !0 } : {};
		}
		drawScene(e, t) {
			let n = this.getLayer(), r = e || n && n.getCanvas();
			return this._fire(Wo, { node: this }), this.clearBeforeDraw() && r.getContext().clear(), Ra.prototype.drawScene.call(this, r, t), r._trimIsolationCanvas(), this._fire(Go, { node: this }), this;
		}
		shouldDrawHit(e) {
			if (!super.shouldDrawHit(e)) return !1;
			if (e || U.hitOnDragEnabled) return !0;
			let t = !1;
			return Xi._dragElements.forEach((e) => {
				e.dragStatus === "dragging" && (e.node === this.getStage() || e.node.getLayer() === this) && (t = !0);
			}), !t && !U.Transformer?._isLayerTransforming(this);
		}
		drawHit(e, t) {
			let n = this.getLayer(), r = e || n && n.hitCanvas;
			return !e && n && (n._syncHitCanvasSize(), n.clearBeforeDraw() && n.getHitCanvas().getContext().clear()), Ra.prototype.drawHit.call(this, r, t), this;
		}
		enableHitGraph() {
			return this.hitGraphEnabled(!0), this;
		}
		disableHitGraph() {
			return this.hitGraphEnabled(!1), this;
		}
		setHitGraphEnabled(e) {
			W.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening(e);
		}
		getHitGraphEnabled(e) {
			return W.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening();
		}
		toggleHitCanvas() {
			if (!this.parent || !this.parent.content) return;
			let e = this.parent;
			this.hitCanvas._canvas.parentNode ? e.content.removeChild(this.hitCanvas._canvas) : e.content.appendChild(this.hitCanvas._canvas);
		}
		destroy() {
			return this.getCanvas()._releaseIsolationCanvas(), W.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas), super.destroy();
		}
	}, Jo.prototype.nodeType = "Layer", Qr(Jo), K.addGetterSetter(Jo, "imageSmoothingEnabled", !0), K.addGetterSetter(Jo, "clearBeforeDraw", !0), K.addOverloadedGetterSetter(Jo, "hitGraphEnabled");
})), Xo, Zo = o((() => {
	ki(), Yo(), $r(), Xo = class extends Jo {
		constructor(e) {
			super(e), this.listening(!1), W.warn("Konva.FastLayer is deprecated. Please use \"new Konva.Layer({ listening: false })\" instead.");
		}
	}, Xo.prototype.nodeType = "FastLayer", Qr(Xo);
})), Qo, $o = o((() => {
	ki(), za(), $r(), q(), ga(), Qo = class extends Ra {
		_validateAdd(e) {
			let t = e.getType();
			t !== "Group" && t !== "Shape" && W.throw("You may only add groups and shapes to groups.");
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
	}, K.addGetterSetter(Qo, "isolated", !1, ma()), Qo.prototype.nodeType = "Group", Qr(Qo);
})), es, ts, ns = o((() => {
	$r(), ki(), es = Xr.performance?.now ? () => Xr.performance.now() : Date.now, ts = class e {
		constructor(t, n) {
			this.id = e.animIdCounter++, this.frame = {
				time: 0,
				timeDiff: 0,
				lastTime: es(),
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
			return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = es(), e._addAnimation(this), this;
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
				this.animations.has(t) && (t._updateFrameObject(es()), !(t.func && t.func.call(t, t.frame) === !1) && t.layers.forEach((t) => t && e.add(t)));
			}), e.forEach((e) => e.batchDraw());
		}
		static _animationLoop() {
			let t = e;
			t.animations.size ? (t._runFrames(), W.requestAnimFrame(t._animationLoop)) : t.animRunning = !1;
		}
		static _handleAnimation() {
			this.animRunning || (this.animRunning = !0, W.requestAnimFrame(this._animationLoop));
		}
	}, ts.animations = /* @__PURE__ */ new Set(), ts.animIdCounter = 0, ts.animRunning = !1;
}));
//#endregion
//#region node_modules/konva/lib/Tween.js
function rs(e) {
	return W.colorToRGBA(e) || W.throw("can not tween the color \"" + e + "\", because it is not a valid color.");
}
function is(e, t) {
	return {
		r: t.r - e.r,
		g: t.g - e.g,
		b: t.b - e.b,
		a: t.a - e.a
	};
}
function as(e, t, n) {
	return "rgba(" + Math.round(e.r + t.r * n) + "," + Math.round(e.g + t.g * n) + "," + Math.round(e.b + t.b * n) + "," + (e.a + t.a * n) + ")";
}
var os, ss, cs, ls, us, ds, fs, ps, ms, hs = o((() => {
	ki(), ns(), La(), $r(), os = {
		node: 1,
		duration: 1,
		easing: 1,
		onFinish: 1,
		onUpdate: 1,
		onReset: 1,
		yoyo: 1
	}, ss = 1, cs = 2, ls = 3, us = [
		"fill",
		"stroke",
		"shadowColor"
	], ds = 0, fs = class {
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
			this.state = cs, this._startTime = this.getTimer() - this._time, this.fire("onPlay"), this.onEnterFrame();
		}
		reverse() {
			this.state = ls, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.fire("onReverse"), this.onEnterFrame();
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
			this.state === cs ? this.setTime(e) : this.state === ls && this.setTime(this.duration - e);
		}
		pause() {
			this.state = ss, this.fire("onPause");
		}
		getTimer() {
			return Date.now();
		}
	}, ps = class e {
		constructor(t) {
			let n = this, r = t.node, i = r._id, a = t.easing || ms.Linear, o = !!t.yoyo, s, c;
			s = t.duration === void 0 ? .3 : t.duration === 0 ? .001 : t.duration, this.node = r, this._id = ds++;
			let l = r.getLayer() || (r instanceof U.Stage ? r.getLayers() : null);
			for (c in l || W.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new ts(function() {
				n.tween.onEnterFrame();
			}, l), this.tween = new fs(c, function(e) {
				n._tweenFunc(e);
			}, a, 0, 1, s * 1e3, o), this._addListeners(), e.attrs[i] || (e.attrs[i] = {}), e.attrs[i][this._id] || (e.attrs[i][this._id] = {}), e.tweens[i] || (e.tweens[i] = {}), t) os[c] === void 0 && this._addAttr(c, t[c]);
			this.reset(), this.onFinish = t.onFinish, this.onReset = t.onReset, this.onUpdate = t.onUpdate;
		}
		_addAttr(t, n) {
			if (W._isPlainObject(n)) {
				for (let e in n) this._addAttr(t + W._capitalize(e), n[e]);
				return;
			}
			let r = this.node, i = r._id, a, o, s, c, l = e.tweens[i][t];
			l !== void 0 && delete e.attrs[i][l][t];
			let u = r.getAttr(t);
			if (W._isArray(n) || W._isArray(u)) {
				if (a = [], c = u, s = n, u = W._isArray(u) ? u.slice() : Array(n.length).fill(u || 0), W._isArray(n) || (n = Array(u.length).fill(n)), o = Math.max(n.length, u.length), t === "points" && n.length !== u.length && (n.length > u.length ? u = W._prepareArrayForTween(u, n, r.closed()) : n = W._prepareArrayForTween(n, u, r.closed())), t.endsWith("ColorStops")) for (let e = 0; e < o; e++) if (e % 2 == 0) a.push((n[e] || 0) - (u[e] || 0));
				else {
					let t = rs(u[e]);
					u[e] = t, a.push(is(t, rs(n[e])));
				}
				else for (let e = 0; e < o; e++) a.push((n[e] || 0) - (u[e] || 0));
			} else us.indexOf(t) === -1 ? a = n - u : (u = rs(u), a = is(u, rs(n)));
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
				if (a = r[i], o = a.start, s = a.diff, d = a.end, W._isArray(o)) {
					if (c = [], u = Math.max(o.length, d.length), i.endsWith("ColorStops")) for (l = 0; l < u; l++) l % 2 == 0 ? c.push((o[l] || 0) + s[l] * t) : c.push(as(o[l], s[l], t));
					else for (l = 0; l < u; l++) c.push((o[l] || 0) + s[l] * t);
				} else c = us.indexOf(i) === -1 ? o + s * t : as(o, s, t);
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
	}, ps.attrs = {}, ps.tweens = {}, J.prototype.to = function(e) {
		let t = e.onFinish, n = new ps({
			...e,
			node: this,
			onFinish() {
				n.destroy(), t && t();
			}
		});
		return n.play(), n;
	}, ms = {
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
			return n - ms.BounceEaseOut(r - e, 0, n, r) + t;
		},
		BounceEaseInOut(e, t, n, r) {
			return e < r / 2 ? ms.BounceEaseIn(e * 2, 0, n, r) * .5 + t : ms.BounceEaseOut(e * 2 - r, 0, n, r) * .5 + n * .5 + t;
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
})), gs, _s = o((() => {
	$r(), ki(), La(), za(), So(), Yo(), Zo(), $o(), Zi(), Ho(), ns(), hs(), Gi(), Yi(), gs = W._assign(U, {
		Util: W,
		Transform: ri,
		Node: J,
		Container: Ra,
		Stage: xo,
		stages: vo,
		Layer: Jo,
		FastLayer: Xo,
		Group: Qo,
		DD: Xi,
		Shape: Y,
		shapes: Vo,
		Animation: ts,
		Tween: ps,
		Easings: ms,
		Context: Hi,
		Canvas: Ki
	});
})), vs, ys = o((() => {
	q(), Ho(), $r(), ga(), vs = class extends Y {
		_sceneFunc(e) {
			let t = U.getAngle(this.angle()), n = this.clockwise();
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
			let e = Math.abs(this.innerRadius()), t = Math.abs(this.outerRadius()), n = Math.min(e, t), r = Math.max(e, t), i = this.clockwise(), a = U.getAngle(this.angle());
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
	}, vs.prototype._centroid = !0, vs.prototype.className = "Arc", vs.prototype._attrsAffectingSize = [
		"innerRadius",
		"outerRadius",
		"angle",
		"clockwise"
	], Qr(vs, !0), K.addGetterSetter(vs, "innerRadius", 0, G()), K.addGetterSetter(vs, "outerRadius", 0, G()), K.addGetterSetter(vs, "angle", 0, G()), K.addGetterSetter(vs, "clockwise", !1, ma());
}));
//#endregion
//#region node_modules/konva/lib/BezierFunctions.js
function bs(e, t, n) {
	let r = 1 - n, i = r * r, a = 2 * r * n, o = n * n, s = i * (3 * (e[1] - e[0])) + a * (3 * (e[2] - e[1])) + o * (3 * (e[3] - e[2])), c = i * (3 * (t[1] - t[0])) + a * (3 * (t[2] - t[1])) + o * (3 * (t[3] - t[2]));
	return Math.sqrt(s * s + c * c);
}
var xs, Ss, Cs, ws, Ts, Es, Ds, Os, ks, As = o((() => {
	xs = [
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
	], Ss = [
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
	], Cs = (e, t, n) => {
		let r = n / 2, i = 0;
		for (let n = 0; n < xs.length; n++) {
			let a = r * xs[n] + r;
			i += Ss[n] * bs(e, t, a);
		}
		return r * i;
	}, ws = (e, t, n = 1) => Cs([
		e[0],
		e[0] + 2 / 3 * (e[1] - e[0]),
		e[2] + 2 / 3 * (e[1] - e[2]),
		e[2]
	], [
		t[0],
		t[0] + 2 / 3 * (t[1] - t[0]),
		t[2] + 2 / 3 * (t[1] - t[2]),
		t[2]
	], n), Ts = (e, t, n) => {
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
	}, Es = (e, t, n, r) => {
		let i = 1 - r;
		return i * i * e + 2 * i * r * t + r * r * n;
	}, Ds = (e, t, n, r, i, a) => {
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
			c > 0 && c < 1 && o.push(Es(e, n, i, c), Es(t, r, a, c));
		}
		return o;
	}, Os = (e, t, n, r, i) => {
		let a = 1 - i;
		return a * a * a * e + 3 * a * a * i * t + 3 * a * i * i * n + i * i * i * r;
	}, ks = (e, t, n, r, i, a, o, s) => {
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
			for (let l of [m / u, f / m]) l > 0 && l < 1 && c.push(Os(e, n, i, o, l), Os(t, r, a, s, l));
		}
		return c;
	};
}));
//#endregion
//#region node_modules/konva/lib/shapes/Line.js
function js(e, t, n, r, i, a, o) {
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
function Ms(e, t) {
	let n = e.length, r = [];
	for (let i = 2; i < n - 2; i += 2) {
		let n = js(e[i - 2], e[i - 1], e[i], e[i + 1], e[i + 2], e[i + 3], t);
		isNaN(n[0]) || (r.push(n[0]), r.push(n[1]), r.push(e[i]), r.push(e[i + 1]), r.push(n[2]), r.push(n[3]));
	}
	return r;
}
function Ns(e) {
	let t = [];
	for (let n = 0; n + 7 < e.length; n += 6) t.push(e[n + 6], e[n + 7], ...ks(e[n], e[n + 1], e[n + 2], e[n + 3], e[n + 4], e[n + 5], e[n + 6], e[n + 7]));
	return t;
}
var Ps, Fs = o((() => {
	As(), q(), $r(), Ho(), ki(), ga(), Ps = class extends Y {
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
			return this.closed() ? this._getTensionPointsClosed() : Ms(this.points(), this.tension());
		}
		_getTensionPointsClosed() {
			let e = this.points(), t = e.length, n = this.tension(), r = js(e[t - 2], e[t - 1], e[0], e[1], e[2], e[3], n), i = js(e[t - 4], e[t - 3], e[t - 2], e[t - 1], e[0], e[1], n), a = Ms(e, n);
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
				this._eachTensionSegment((e, n, r, i, a, o) => t.push(a, o, ...Ds(e, n, r, i, a, o)), (e, n, r, i, a, o, s, c) => t.push(s, c, ...ks(e, n, r, i, a, o, s, c))), e = t;
			} else this.bezier() && (e = [
				e[0],
				e[1],
				...Ns(e)
			]);
			return W._getPointsRect(e);
		}
	}, Ps.prototype.className = "Line", Ps.prototype._attrsAffectingSize = [
		"points",
		"bezier",
		"tension",
		"closed"
	], Qr(Ps, !0), K.addGetterSetter(Ps, "closed", !1), K.addGetterSetter(Ps, "bezier", !1), K.addGetterSetter(Ps, "tension", 0, G()), K.addGetterSetter(Ps, "points", [], pa());
})), Is, Ls, Rs, zs = o((() => {
	q(), $r(), Ho(), ki(), As(), Is = {
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
	}, Ls = Math.PI * 2, Rs = class e extends Y {
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
						if (((n - s) * Math.sign(c) % Ls + Ls) % Ls < Math.abs(c)) {
							let s = e.getPointOnEllipticalArc(r, i, a, o, n, l);
							t.push(s.x, s.y);
						}
					});
				} else n.command === "C" ? t.push(n.start.x, n.start.y, n.points[4], n.points[5], ...ks(n.start.x, n.start.y, n.points[0], n.points[1], n.points[2], n.points[3], n.points[4], n.points[5])) : n.command === "Q" ? t.push(n.start.x, n.start.y, n.points[2], n.points[3], ...Ds(n.start.x, n.start.y, n.points[0], n.points[1], n.points[2], n.points[3])) : t.push(...n.points);
			}), W._getPointsRect(t);
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
				case "C": return e.getPointOnCubicBezier(Ts(t, c.pathLength, (e) => Cs([
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
				case "Q": return e.getPointOnQuadraticBezier(Ts(t, c.pathLength, (e) => ws([
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
				for (; m < f.length && !(f.length - m < Is[n.toLowerCase()] || n === "z" || n === "Z");) {
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
				case "C": return Cs([
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
				case "Q": return ws([
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
	}, Rs.prototype.className = "Path", Rs.prototype._attrsAffectingSize = ["data"], Qr(Rs, !0), K.addGetterSetter(Rs, "data");
})), Bs, Vs = o((() => {
	q(), Fs(), ga(), $r(), zs(), Bs = class extends Ps {
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
				let e = i[i.length - 4], t = i[i.length - 3], n = i[i.length - 2], r = i[i.length - 1], l = Rs.calcLength(e, t, "Q", [
					n,
					r,
					a,
					o
				]), u = Rs.getPointOnQuadraticBezier(l ? Math.max(0, 1 - this.pointerLength() / l) : 0, e, t, n, r, a, o);
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
	}, Bs.prototype.className = "Arrow", Bs.prototype._attrsAffectingSize = [
		...Ps.prototype._attrsAffectingSize,
		"pointerLength",
		"pointerWidth",
		"pointerAtBeginning",
		"pointerAtEnding"
	], Qr(Bs, !0), K.addGetterSetter(Bs, "pointerLength", 10, G()), K.addGetterSetter(Bs, "pointerWidth", 10, G()), K.addGetterSetter(Bs, "pointerAtBeginning", !1), K.addGetterSetter(Bs, "pointerAtEnding", !0);
})), Hs, Us = o((() => {
	q(), Ho(), ga(), $r(), Hs = class extends Y {
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
	}, Hs.prototype._centroid = !0, Hs.prototype.className = "Circle", Hs.prototype._attrsAffectingSize = ["radius"], Qr(Hs, !0), K.addGetterSetter(Hs, "radius", 0, G());
})), Ws, Gs = o((() => {
	q(), Ho(), ga(), $r(), Ws = class extends Y {
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
	}, Ws.prototype.className = "Ellipse", Ws.prototype._centroid = !0, Ws.prototype._attrsAffectingSize = ["radiusX", "radiusY"], Qr(Ws, !0), K.addComponentsGetterSetter(Ws, "radius", ["x", "y"]), K.addGetterSetter(Ws, "radiusX", 0, G()), K.addGetterSetter(Ws, "radiusY", 0, G());
})), Ks, qs = o((() => {
	ki(), q(), Ho(), $r(), ga(), Ks = class e extends Y {
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
			if ((this.hasFill() || this.hasStroke() || r) && (e.beginPath(), r ? W.drawRoundedRectPath(e, t, n, r) : e.rect(0, 0, t, n), e.closePath(), e.fillStrokeShape(this)), i) {
				r && e.clip();
				let a = this.attrs.cropWidth, o = this.attrs.cropHeight;
				a && o ? e.drawImage(i, this.cropX(), this.cropY(), a, o, 0, 0, t, n) : e.drawImage(i, 0, 0, t, n);
			}
		}
		_hitFunc(e) {
			let t = this.width(), n = this.height(), r = this.cornerRadius();
			e.beginPath(), r ? W.drawRoundedRectPath(e, t, n, r) : e.rect(0, 0, t, n), e.closePath(), e.fillStrokeShape(this);
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
			let i = W.createImageElement();
			i.onload = () => {
				i.onload = i.onerror = null, n(new e({ image: i }));
			}, i.onerror = r, i.crossOrigin = "Anonymous", i.src = t;
		}
	}, Ks.prototype.className = "Image", Ks.prototype._attrsAffectingSize = ["image"], Qr(Ks, !0), K.addGetterSetter(Ks, "cornerRadius", 0, la(4)), K.addGetterSetter(Ks, "image"), K.addComponentsGetterSetter(Ks, "crop", [
		"x",
		"y",
		"width",
		"height"
	]), K.addGetterSetter(Ks, "cropX", 0, G()), K.addGetterSetter(Ks, "cropY", 0, G()), K.addGetterSetter(Ks, "cropWidth", 0, G()), K.addGetterSetter(Ks, "cropHeight", 0, G());
}));
//#endregion
//#region node_modules/konva/lib/shapes/Text.js
function Js(e) {
	return e / 15;
}
function Ys(e) {
	return nc ? Array.from(nc.segment(e), (e) => e.segment) : e.match(/\p{RI}\p{RI}|\P{M}(?:\p{M}|\p{Emoji_Modifier}|\uFE0F|\u200D\P{M})*|\p{M}+/gu) || [];
}
function Xs() {
	if (Ec !== null) return Ec;
	Ec = !1;
	let e;
	try {
		e = W.createCanvasElement(), e.width = 10, e.height = 10;
		let t = e.getContext(cc);
		if (t) {
			t.globalAlpha = 0, t.shadowColor = "black", t.shadowBlur = 5, t.shadowOffsetX = 5, t.shadowOffsetY = 5, t.fillStyle = "black", t.font = "10px Arial", t.fillText("X", 0, 10);
			let e = t.getImageData(0, 0, 10, 10).data;
			for (let t = 3; t < e.length; t += 4) if (e[t] > 0) {
				Ec = !0;
				break;
			}
		}
	} catch {} finally {
		e && W.releaseCanvas(e);
	}
	return Ec;
}
function Zs(e) {
	return e.split(",").map((e) => {
		e = e.trim();
		let t = e.indexOf(" ") >= 0, n = e.indexOf("\"") >= 0 || e.indexOf("'") >= 0;
		return t && !n && (e = `"${e}"`), e;
	}).join(", ");
}
function Qs() {
	return Dc || (Dc = W.createCanvasElement().getContext(cc), Dc);
}
function $s(e) {
	this._partialFillStyle && e.setAttr("fillStyle", this._partialFillStyle), e.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function ec(e) {
	e.setAttr("miterLimit", 2), this._partialStrokeStyle && e.setAttr("strokeStyle", this._partialStrokeStyle), e.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function tc(e) {
	return e = e || {}, e.fill || e.fillLinearGradientColorStops || e.fillRadialGradientColorStops || e.fillPatternImage ? e : {
		...e,
		fill: "black"
	};
}
var nc, rc, ic, ac, oc, sc, cc, lc, uc, dc, fc, pc, mc, hc, gc, _c, vc, yc, bc, xc, Sc, Cc, wc, Tc, Ec, Dc, Oc, kc = o((() => {
	ki(), q(), Ho(), $r(), ga(), nc = typeof Intl < "u" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null, rc = "auto", ic = "center", ac = "inherit", oc = "justify", sc = "Change.konva", cc = "2d", lc = "-", uc = "left", dc = "text", fc = "Text", pc = "top", mc = "bottom", hc = "middle", gc = "normal", _c = "px ", vc = " ", yc = "right", bc = "rtl", xc = "word", Sc = "char", Cc = "none", wc = "…", Tc = [
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
	], Ec = null, Oc = class extends Y {
		constructor(e) {
			super(tc(e)), this._partialTextX = 0, this._partialTextY = 0, this._baselineShift = 0, this._setTextData();
		}
		_sceneFunc(e) {
			let t = this.textArr, n = t.length;
			if (!this.text()) return;
			let r = this.padding(), i = this.fontSize(), a = this.lineHeight() * i, o = this.direction(), s = this.align(), c = this.getWidth(), l = this.letterSpacing(), u = this.charRenderFunc(), d = this.textDecoration(), f = d.indexOf("underline") !== -1, p = d.indexOf("line-through") !== -1, m, h = a / 2, g = hc;
			if (!U.legacyTextRendering) {
				let e = this.measureSize("M");
				g = "alphabetic", h = ((e.fontBoundingBoxAscent ?? e.actualBoundingBoxAscent) - (e.fontBoundingBoxDescent ?? e.actualBoundingBoxDescent)) / 2 + a / 2;
			}
			if (o === ac ? o = e.direction : e.setAttr("direction", o), e.setAttr("font", this._getContextFont()), e.setAttr("textBaseline", g), e.setAttr("textAlign", uc), e.translate(r, this._getTextTop()), u) {
				let t = e._getFillStyle(this);
				t !== void 0 && (e.fillStyle = t), this.hasStroke() && e._applyStrokeStyle(this);
			}
			let _ = u ? e.fillStyle : void 0, v = u ? e.strokeStyle : void 0, y = 0;
			for (m = 0; m < n; m++) {
				let d = 0, g = t[m], b = g.text, x = g.width, S = g.lastInParagraph;
				if (e.save(), s === yc ? d += c - x - r * 2 : s === ic && (d += (c - x - r * 2) / 2), f) {
					e.save(), e.beginPath();
					let t = this._getUnderlineOffset(), n = d, a = h + 0 + t;
					e.moveTo(n, a);
					let o = s === oc && !S ? c - r * 2 : x;
					e.lineTo(n + Math.round(o), a), e.lineWidth = Js(i), e.strokeStyle = e._getFillStyle(this), e.stroke(), e.restore();
				}
				let C = d;
				if (o !== bc && (l !== 0 || s === oc || u)) {
					let t = b.split(" ").length - 1, n = Ys(b);
					for (let i = 0; i < n.length; i++) {
						let a = n[i];
						a === " " && !S && s === oc && (d += (c - r * 2 - x) / t), this._partialTextX = d, this._partialTextY = h + 0, this._partialText = a;
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
					let t = U.legacyTextRendering ? 0 : -Math.round(i / 4), n = C;
					e.moveTo(n, h + 0 + t);
					let a = s === oc && !S ? c - r * 2 : x;
					e.lineTo(n + Math.round(a), h + 0 + t), e.lineWidth = Js(i), e.strokeStyle = e._getFillStyle(this), e.stroke(), e.restore();
				}
				e.restore(), n > 1 && (h += a);
			}
		}
		_getTextTop() {
			let e = this.padding(), t = this.getHeight() - this.textArr.length * this.lineHeight() * this.fontSize() - e * 2, n = this.verticalAlign();
			return n === hc ? e + t / 2 : n === mc ? e + t : e;
		}
		_getUnderlineOffset() {
			return this.underlineOffset() ?? Math.round(this.fontSize() / (U.legacyTextRendering ? 2 : 4));
		}
		getSelfRect() {
			let e = super.getSelfRect(), t = this.textArr.length;
			if (!t || this.textDecoration().indexOf("underline") === -1) return e;
			let n = this.fontSize(), r = this.lineHeight() * n, i = this._getTextTop() + t * r - r / 2;
			return U.legacyTextRendering || (i += this._baselineShift), i += this._getUnderlineOffset() + Js(n) / 2, e.height = Math.max(e.y + e.height, i) - e.y, e;
		}
		_getSelfRectForDrawing() {
			let e = this.getSelfRect(), t = this.fontSize(), n = this.padding(), r = this.lineHeight() * t, i = this.getWidth() - n * 2, a = this.align(), o = this.textArr.length * r, s = this._getTextTop(), c = e.x, l = e.x + e.width;
			for (let { text: e, width: t } of this.textArr) {
				let r = n + (a === yc ? i - t : a === ic ? (i - t) / 2 : 0), o = Math.min(0, this.letterSpacing()) * e.length;
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
			let t = W._isString(e) ? e : e == null ? "" : e + "";
			return this._setAttr(dc, t), this;
		}
		getWidth() {
			return this.attrs.width === rc || this.attrs.width === void 0 ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
		}
		getHeight() {
			return this.attrs.height === rc || this.attrs.height === void 0 ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
		}
		getTextWidth() {
			return this.textWidth;
		}
		getTextHeight() {
			return W.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
		}
		measureSize(e) {
			let t = Qs(), n = this.fontSize(), r;
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
			return this.fontStyle() + vc + this.fontVariant() + vc + (this.fontSize() + _c) + Zs(this.fontFamily());
		}
		_addTextLine(e) {
			this.align() === oc && (e = e.trim());
			let t = this._getTextWidth(e);
			return this.textArr.push({
				text: e,
				width: t,
				lastInParagraph: !1
			});
		}
		_getTextWidth(e, t) {
			let n = this.letterSpacing(), r = n ? n * (t ?? Ys(e).length) : 0;
			return Qs().measureText(e).width + r;
		}
		_setTextData() {
			let e = this.text().split("\n"), t = +this.fontSize(), n = this.lineHeight() * t, r = this.attrs.width, i = this.attrs.height, a = r !== rc && r !== void 0, o = i !== rc && i !== void 0, s = this.padding(), c = r - s * 2, l = i - s * 2, u = 0, d = this.wrap(), f = d !== Sc && d !== Cc, p = this.ellipsis(), m = this.measureSize("M");
			this._baselineShift = (m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2, this.textArr = [];
			let h = Qs();
			h.font = this._getContextFont(), h.fontKerning = this.direction() !== bc && (this.letterSpacing() !== 0 || this.align() === oc || this.charRenderFunc()) ? "none" : "auto";
			let g = p ? this._getTextWidth(wc) : 0;
			for (let t = 0, r = e.length; t < r; ++t) {
				let i = e[t], s = this._getTextWidth(i);
				if (a && s > c) {
					let e = Ys(i), a = e.length, d = 0, m = (t) => e.slice(d, t).join(""), h = (e) => e === vc || e === lc, _ = Math.max(1, Math.ceil(a * c / s));
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
			let t = +this.fontSize(), n = this.lineHeight() * t, r = this.attrs.height, i = r !== rc && r !== void 0, a = r - this.padding() * 2;
			return this.wrap() === Cc || i && e + n > a;
		}
		_tryToAddEllipsisToLastLine() {
			let e = this.attrs.width, t = e !== rc && e !== void 0, n = e - this.padding() * 2, r = this.ellipsis(), i = this.textArr[this.textArr.length - 1];
			if (!i || !r) return;
			let a = i.text + wc;
			if (t) {
				let e = Ys(i.text);
				for (; e.length && this._getTextWidth(a) > n;) e.pop(), a = e.join("") + wc;
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
			return n && r || r && t !== 1 && Xs() ? !0 : super._useBufferCanvas(e, t);
		}
	}, Oc.prototype._fillFunc = $s, Oc.prototype._strokeFunc = ec, Oc.prototype.className = fc, Oc.prototype._attrsAffectingSize = Tc.filter((e) => e !== "width" && e !== "height").concat(["textDecoration", "underlineOffset"]), Qr(Oc, !0), Oc.prototype.on(Tc.map((e) => e + sc).join(" "), function() {
		this._setTextData();
	}), K.overWriteSetter(Oc, "width", ua()), K.overWriteSetter(Oc, "height", ua()), K.addGetterSetter(Oc, "direction", ac), K.addGetterSetter(Oc, "fontFamily", "Arial"), K.addGetterSetter(Oc, "fontSize", 12, G()), K.addGetterSetter(Oc, "fontStyle", gc), K.addGetterSetter(Oc, "fontVariant", gc), K.addGetterSetter(Oc, "padding", 0, G()), K.addGetterSetter(Oc, "align", uc), K.addGetterSetter(Oc, "verticalAlign", pc), K.addGetterSetter(Oc, "lineHeight", 1, G()), K.addGetterSetter(Oc, "wrap", xc), K.addGetterSetter(Oc, "ellipsis", !1, ma()), K.addGetterSetter(Oc, "letterSpacing", 0, G()), K.addGetterSetter(Oc, "text", "", da()), K.addGetterSetter(Oc, "textDecoration", ""), K.addGetterSetter(Oc, "underlineOffset", void 0, G()), K.addGetterSetter(Oc, "charRenderFunc", void 0);
})), Ac, jc, Mc, Nc, Pc, Fc, Ic, Lc, Rc = o((() => {
	q(), ki(), Ho(), $o(), ga(), $r(), kc(), Ac = [
		...Oc.prototype._attrsAffectingSize,
		"width",
		"height",
		"pointerDirection",
		"pointerWidth",
		"pointerHeight"
	].map((e) => e + "Change.konva").join(" "), jc = "none", Mc = "up", Nc = "right", Pc = "down", Fc = "left", Ic = class extends Qo {
		constructor(e) {
			super(e), this._sync = this._sync.bind(this), this.on("add.konva", function(e) {
				e.child.off(Ac, this._sync).on(Ac, this._sync), this._sync();
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
					case Mc:
						o = n / 2, s = -1 * c;
						break;
					case Nc:
						o = n + a, s = r / 2;
						break;
					case Pc:
						o = n / 2, s = r + c;
						break;
					case Fc: o = -1 * a, s = r / 2;
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
	}, Ic.prototype.className = "Label", Qr(Ic), Lc = class extends Y {
		_sceneFunc(e) {
			let t = this.width(), n = this.height(), r = this.pointerDirection(), i = this.pointerWidth(), a = this.pointerHeight(), o = this.cornerRadius(), [s, c, l, u] = W._cornerRadii(o, t, n);
			e.beginPath(), e.moveTo(s, 0), r === Mc && (e.lineTo((t - i) / 2, 0), e.lineTo(t / 2, -1 * a), e.lineTo((t + i) / 2, 0)), e.lineTo(t - c, 0), e.arc(t - c, c, c, Math.PI * 3 / 2, 0, !1), r === Nc && (e.lineTo(t, (n - a) / 2), e.lineTo(t + i, n / 2), e.lineTo(t, (n + a) / 2)), e.lineTo(t, n - l), e.arc(t - l, n - l, l, 0, Math.PI / 2, !1), r === Pc && (e.lineTo((t + i) / 2, n), e.lineTo(t / 2, n + a), e.lineTo((t - i) / 2, n)), e.lineTo(u, n), e.arc(u, n - u, u, Math.PI / 2, Math.PI, !1), r === Fc && (e.lineTo(0, (n + a) / 2), e.lineTo(-1 * i, n / 2), e.lineTo(0, (n - a) / 2)), e.lineTo(0, s), e.arc(s, s, s, Math.PI, Math.PI * 3 / 2, !1), e.closePath(), e.fillStrokeShape(this);
		}
		getSelfRect() {
			let e = this.pointerWidth(), t = this.pointerHeight(), n = this.pointerDirection(), r = this.width(), i = this.height();
			return n === Mc || n === Pc ? {
				x: Math.min(0, (r - e) / 2),
				y: n === Mc ? -t : 0,
				width: Math.max(r, e),
				height: i + t
			} : n === Fc || n === Nc ? {
				x: n === Fc ? -e : 0,
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
	}, Lc.prototype.className = "Tag", Qr(Lc, !0), K.addGetterSetter(Lc, "pointerDirection", jc), K.addGetterSetter(Lc, "pointerWidth", 0, G()), K.addGetterSetter(Lc, "pointerHeight", 0, G()), K.addGetterSetter(Lc, "cornerRadius", 0, la(4));
})), zc, Bc = o((() => {
	q(), Ho(), $r(), ki(), ga(), zc = class extends Y {
		_getStrokePadding() {
			return super._getStrokePadding(this.strokeScaleEnabled() ? 1 : void 0);
		}
		_sceneFunc(e) {
			let t = this.cornerRadius(), n = this.width(), r = this.height();
			e.beginPath(), t ? W.drawRoundedRectPath(e, n, r, t) : e.rect(0, 0, n, r), e.closePath(), e.fillStrokeShape(this);
		}
	}, zc.prototype.className = "Rect", Qr(zc, !0), K.addGetterSetter(zc, "cornerRadius", 0, la(4));
})), Vc, Hc = o((() => {
	q(), Ho(), ga(), $r(), ki(), Vc = class extends Y {
		_sceneFunc(e) {
			let t = this._getPoints(), n = this.radius(), r = this.sides(), i = this.cornerRadius();
			if (t.length) {
				if (e.beginPath(), i) W.drawRoundedPolygonPath(e, t, r, n, i);
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
	}, Vc.prototype.className = "RegularPolygon", Vc.prototype._centroid = !0, Vc.prototype._attrsAffectingSize = ["radius", "sides"], Qr(Vc, !0), K.addGetterSetter(Vc, "radius", 0, G()), K.addGetterSetter(Vc, "sides", 0, G()), K.addGetterSetter(Vc, "cornerRadius", 0, la(4));
})), Uc, Wc, Gc = o((() => {
	q(), Ho(), ga(), $r(), Uc = Math.PI * 2, Wc = class extends Y {
		_getStrokePadding() {
			return super._getStrokePadding(1);
		}
		_sceneFunc(e) {
			let t = Math.abs(this.innerRadius()), n = Math.abs(this.outerRadius());
			e.beginPath(), e.arc(0, 0, t, 0, Uc, !1), e.moveTo(n, 0), e.arc(0, 0, n, Uc, 0, !0), e.closePath(), e.fillStrokeShape(this);
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
	}, Wc.prototype.className = "Ring", Wc.prototype._centroid = !0, Wc.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], Qr(Wc, !0), K.addGetterSetter(Wc, "innerRadius", 0, G()), K.addGetterSetter(Wc, "outerRadius", 0, G());
})), Kc, qc = o((() => {
	q(), Ho(), ns(), ga(), $r(), Kc = class extends Y {
		constructor(e) {
			super(e), this._updated = !0, this.anim = new ts(() => {
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
	}, Kc.prototype.className = "Sprite", Qr(Kc, !0), K.addGetterSetter(Kc, "animation"), K.addGetterSetter(Kc, "animations"), K.addGetterSetter(Kc, "frameOffsets"), K.addGetterSetter(Kc, "image"), K.addGetterSetter(Kc, "frameIndex", 0, G()), K.addGetterSetter(Kc, "frameRate", 17, G()), K.backCompat(Kc, {
		index: "frameIndex",
		getIndex: "getFrameIndex",
		setIndex: "setFrameIndex"
	});
})), Jc, Yc = o((() => {
	q(), Ho(), ga(), $r(), Jc = class extends Y {
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
	}, Jc.prototype.className = "Star", Jc.prototype._centroid = !0, Jc.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], Qr(Jc, !0), K.addGetterSetter(Jc, "numPoints", 5, G()), K.addGetterSetter(Jc, "innerRadius", 0, G()), K.addGetterSetter(Jc, "outerRadius", 0, G());
}));
//#endregion
//#region node_modules/konva/lib/shapes/TextPath.js
function Xc(e) {
	e.fillText(this.partialText, 0, 0);
}
function Zc(e) {
	e.strokeText(this.partialText, 0, 0);
}
var Qc, $c, el, tl = o((() => {
	ki(), q(), Ho(), zs(), kc(), ga(), $r(), Qc = "", $c = "normal", el = class extends Y {
		constructor(e) {
			super(e), this.dataArray = [], this._readDataAttribute(), this._setTextData();
		}
		_getTextPathLength() {
			return Rs.getPathLength(this.dataArray);
		}
		_getPointAtLength(e, t) {
			return !this.attrs.data || e > this.pathLength ? null : Rs.getPointAtLengthOfDataArray(e, this.dataArray, t);
		}
		_readDataAttribute() {
			this.dataArray = Rs.parsePathData(this.attrs.data), this.pathLength = this._getTextPathLength();
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
			if (a && (e.strokeStyle = n, e.lineWidth = Js(r), e.stroke()), o) {
				e.beginPath();
				for (let t = 0; t < i.length; t++) {
					e.save();
					let n = i[t].p0;
					e.translate(n.x, n.y), e.rotate(i[t].rotation), t === 0 && e.moveTo(0, 0), e.lineTo(i[t].width, 0), e.restore();
				}
				e.strokeStyle = n, e.lineWidth = Js(r), e.stroke();
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
			return W.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
		}
		setText(e) {
			return Oc.prototype.setText.call(this, e);
		}
		_getContextFont() {
			return Oc.prototype._getContextFont.call(this);
		}
		_getTextSize(e) {
			let t = Qs();
			t.save(), t.font = this._getContextFont(), t.fontKerning = "auto";
			let n = t.measureText(e);
			return t.restore(), {
				width: n.width,
				height: parseInt(`${this.fontSize()}`, 10)
			};
		}
		_setTextData() {
			let e = Ys(this.text());
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
				let h = Rs.getLineLength(r.x, r.y, m.x, m.y), g = Math.atan2(m.y - r.y, m.x - r.x);
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
			let t = W._getPointsRect(e), n = this.fontSize();
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
	}, el.prototype._fillFunc = Xc, el.prototype._strokeFunc = Zc, el.prototype._fillFuncHit = Xc, el.prototype._strokeFuncHit = Zc, el.prototype.className = "TextPath", el.prototype._attrsAffectingSize = [
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
	], Qr(el, !0), el.prototype.on("dataChange.konva", function() {
		this._readDataAttribute(), this._setTextData();
	}), el.prototype.on(el.prototype._attrsAffectingSize.filter((e) => e !== "data").map((e) => e + "Change.konva").join(" "), function() {
		this._setTextData();
	}), K.addGetterSetter(el, "data"), K.addGetterSetter(el, "fontFamily", "Arial"), K.addGetterSetter(el, "fontSize", 12, G()), K.addGetterSetter(el, "fontStyle", $c), K.addGetterSetter(el, "align", "left"), K.addGetterSetter(el, "letterSpacing", 0, G()), K.addGetterSetter(el, "textBaseline", "middle"), K.addGetterSetter(el, "fontVariant", $c), K.addGetterSetter(el, "text", Qc), K.addGetterSetter(el, "textDecoration", ""), K.addGetterSetter(el, "kerningFunc", void 0), K.addGetterSetter(el, "direction", "inherit");
}));
//#endregion
//#region node_modules/konva/lib/shapes/Transformer.js
function nl(e) {
	return e.startsWith("rotater");
}
function rl(e, t) {
	let n = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g transform="rotate(${e} 12 12)" stroke-linejoin="round"><path d="M5 8 A11 11 0 0 1 16 19" fill="none" stroke="white" stroke-width="4"/><path d="M2 8 L6 4.5 L6 11.5 Z M16 22 L12.5 18 L19.5 18 Z" fill="black" stroke="white"/><path d="M5 8 A11 11 0 0 1 16 19" fill="none" stroke="black" stroke-width="1.5"/></g></svg>`;
	return `url("data:image/svg+xml,${encodeURIComponent(n)}") 12 12, ${t}`;
}
function il(e, t, n) {
	if (e === "rotater") return n;
	if (nl(e)) {
		let r = e.slice(8);
		return rl(Math.round(W.radToDeg(t) + hl[r] - 45), n);
	}
	t += W.degToRad(hl[e] || 0);
	let r = (W.radToDeg(t) % 360 + 360) % 360;
	return W._inRange(r, 337.5, 360) || W._inRange(r, 0, 22.5) ? "ns-resize" : W._inRange(r, 22.5, 67.5) ? "nesw-resize" : W._inRange(r, 67.5, 112.5) ? "ew-resize" : W._inRange(r, 112.5, 157.5) ? "nwse-resize" : W._inRange(r, 157.5, 202.5) ? "ns-resize" : W._inRange(r, 202.5, 247.5) ? "nesw-resize" : W._inRange(r, 247.5, 292.5) ? "ew-resize" : W._inRange(r, 292.5, 337.5) ? "nwse-resize" : (W.error("Transformer has unknown angle for cursor detection: " + r), "pointer");
}
function al(e) {
	return {
		x: e.x + e.width / 2 * Math.cos(e.rotation) + e.height / 2 * Math.sin(-e.rotation),
		y: e.y + e.height / 2 * Math.cos(e.rotation) + e.width / 2 * Math.sin(e.rotation)
	};
}
function ol(e, t, n) {
	let r = n.x + (e.x - n.x) * Math.cos(t) - (e.y - n.y) * Math.sin(t), i = n.y + (e.x - n.x) * Math.sin(t) + (e.y - n.y) * Math.cos(t);
	return {
		...e,
		rotation: e.rotation + t,
		x: r,
		y: i
	};
}
function sl(e, t) {
	return ol(e, t, al(e));
}
function cl(e, t, n) {
	let r = t, i = n;
	for (let n = 0; n < e.length; n++) {
		let a = U.getAngle(e[n]), o = Math.abs(a - t) % (Math.PI * 2), s = Math.min(o, Math.PI * 2 - o);
		s < i && (i = s, r = a);
	}
	return r;
}
function ll(e, t, n) {
	let r = W.degToRad(e.rotateAnchorAngle()), i = Math.sin(r), a = -Math.cos(r), o = t / 2, s = n / 2, c = Infinity;
	a < 0 ? c = Math.min(c, -s / a) : a > 0 && (c = Math.min(c, (n - s) / a)), i < 0 ? c = Math.min(c, -o / i) : i > 0 && (c = Math.min(c, (t - o) / i));
	let l = o + i * c, u = s + a * c, d = e.rotateAnchorOffset() + e.padding();
	return {
		edgeX: l,
		edgeY: u,
		endX: l + i * d,
		endY: u + a * d
	};
}
function ul(e) {
	return e instanceof Array || W.warn("enabledAnchors value should be an array"), e instanceof Array && e.forEach(function(e) {
		yl.indexOf(e) === -1 && W.warn("Unknown anchor name: " + e + ". Available names are: " + yl.join(", "));
	}), e || [];
}
var dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, X, xl = o((() => {
	ki(), q(), La(), Ho(), Bc(), $o(), za(), $r(), ga(), dl = "tr-konva", fl = [
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
	].map((e) => e + `.${dl}`).join(" "), pl = "nodesRect", ml = [
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
	], hl = {
		"top-left": -45,
		"top-center": 0,
		"top-right": 45,
		"middle-right": -90,
		"middle-left": 90,
		"bottom-left": -135,
		"bottom-center": 180,
		"bottom-right": 135
	}, gl = "ontouchstart" in U._global, _l = [
		"rotater-top-left",
		"rotater-top-right",
		"rotater-bottom-left",
		"rotater-bottom-right"
	], vl = Math.PI / 12, yl = [
		"top-left",
		"top-center",
		"top-right",
		"middle-right",
		"middle-left",
		"bottom-left",
		"bottom-center",
		"bottom-right"
	], bl = /* @__PURE__ */ new Set(), X = class extends Qo {
		static _isLayerTransforming(e) {
			for (let t of bl) if (t.getLayer() === e || t._nodes.some((t) => t.getLayer() === e)) return !0;
			return !1;
		}
		constructor(e) {
			super(e), this._movingAnchorName = null, this._anchors = {}, this._transforming = !1, this._fitting = !1, this._transformWindow = null, this._elementsCreated = !1, this._updateScheduled = !1, this._subtreeChanged = !1, this._createElements(), this._handleMouseMove = this._handleMouseMove.bind(this), this._handleMouseUp = this._handleMouseUp.bind(this), this.update = this.update.bind(this), this.on(fl, (e) => {
				e.type === "ignoreStrokeChange" && this._resetTransformCache(), this.update();
			}), this.on(`rotationChange.${dl}`, () => this._clearCache(pl)), this.getNode() && this.update();
		}
		attachTo(e) {
			return this.setNode(e), this;
		}
		setNode(e) {
			return W.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."), this.setNodes([e]);
		}
		getNode() {
			return this._nodes && this._nodes[0];
		}
		_getEventNamespace() {
			return dl + this._id;
		}
		setNodes(e = []) {
			this._nodes && this._nodes.length && this.detach();
			let t = new Set(e);
			for (let e of t) e.isAncestorOf(this) && (W.error("Konva.Transformer cannot be an a child of the node you are trying to attach"), t.delete(e));
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
				e.on(ml.map((e) => e + `.${this._getEventNamespace()}`).join(" "), t), e.on(`absoluteTransformChange.${this._getEventNamespace()}`, t), e instanceof Ra && e._addSubtreeObserver(this), e.on(`destroy.${this._getEventNamespace()}`, () => {
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
			e ? (t = this._nodeRectCache) == null || t.delete(e) : (n = this._nodeRectCache) == null || n.clear(), this._clearCache(pl), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform");
		}
		_onSubtreeChange(e) {
			var t;
			this._fitting || (!this._subtreeChanged || this._cache[pl]) && (this._resetTransformCache(e), this._subtreeChanged || (this._subtreeChanged = !0, W.requestAnimFrame(() => this._syncSubtreeChange(), this.getStage()?._getOwnerWindow()), (t = this.getLayer()) == null || t.batchDraw()));
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
			return this._getCache(pl, this.__getNodeRect);
		}
		__getNodeRect() {
			if (!this.getNode()) return {
				x: -1e8,
				y: -1e8,
				width: 0,
				height: 0,
				rotation: 0
			};
			let e = U.getAngle(this.rotation()), t = this.ignoreStroke(), n = new ri();
			n.rotate(-e);
			let r = this._nodeRectCache || (this._nodeRectCache = /* @__PURE__ */ new Map()), i = Infinity, a = Infinity, o = -Infinity, s = -Infinity;
			for (let c of this.nodes()) {
				let l = c instanceof Y && c.getSelfRect === Y.prototype.getSelfRect && !c.attrs.selfRectFunc && !c._hasCachedAncestor(), u = l ? c.width() : 0, d = l ? c.height() : 0;
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
					m && (i = new ri()), f = {
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
				rotation: U.getAngle(this.rotation())
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
			this._createBack(), _l.forEach((e) => {
				this._createAnchor(e, "_rotate-zone").setAttrs({
					fill: "transparent",
					strokeEnabled: !1,
					visible: !1
				});
			}), yl.forEach((e) => {
				this._createAnchor(e);
			}), this._createAnchor("rotater"), this._elementsCreated = !0;
		}
		_createAnchor(e, t = "_anchor") {
			let n = new zc({
				stroke: "rgb(0, 161, 255)",
				fill: "white",
				strokeWidth: 1,
				name: e + " " + t,
				dragDistance: 0,
				draggable: !0,
				hitStrokeWidth: gl ? 10 : "auto"
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
		_setAnchorCursor(e, t = U.getAngle(this.rotation())) {
			let n = this.getStage()?.content;
			n && (n.style.cursor = il(e, t, this.rotateAnchorCursor()));
		}
		_createBack() {
			let e = new Y({
				name: "back",
				width: 0,
				height: 0,
				sceneFunc(e, t) {
					let n = t.getParent();
					if (!n.borderEnabled()) return;
					let r = n.padding(), i = t.width(), a = t.height();
					if (e.beginPath(), e.rect(-r, -r, i + r * 2, a + r * 2), n.rotateEnabled() && n.rotateLineVisible() && n.rotateMode() !== "corners") {
						let t = ll(n, i, a);
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
			if (e.evt.button !== void 0 && !U.dragButtons.includes(e.evt.button) || this._transforming) return;
			this._movingAnchorName = e.target.name().split(" ")[0];
			let t = this._getNodeRect(), n = t.width, r = t.height, i = Math.sqrt(n ** 2 + r ** 2);
			this.sin = Math.abs(r / i), this.cos = Math.abs(n / i);
			let a = this.getStage()?._getOwnerWindow();
			this._transformWindow = a || null, a && (a.addEventListener("mousemove", this._handleMouseMove), a.addEventListener("touchmove", this._handleMouseMove), a.addEventListener("mouseup", this._handleMouseUp, !0), a.addEventListener("touchend", this._handleMouseUp, !0), a.addEventListener("touchcancel", this._handleMouseUp, !0)), this._transforming = !0, this._pointerId = e.pointerId ?? W._getFirstPointerId(e.evt);
			let o = e.target.getAbsolutePosition(), s = e.target.getStage()._getPointerById(this._pointerId);
			if (this._anchorDragOffset = {
				x: s.x - o.x,
				y: s.y - o.y
			}, nl(this._movingAnchorName)) {
				let e = al(t);
				this._rotateStart = {
					pointerAngle: Math.atan2(s.y - e.y, s.x - e.x),
					rotation: t.rotation
				};
			}
			bl.add(this), this._fire("transformstart", {
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
			if (nl(this._movingAnchorName)) {
				let t = this._getNodeRect(), n = al(t), r = this._rotateStart, i = {
					x: l.x + this._anchorDragOffset.x,
					y: l.y + this._anchorDragOffset.y
				}, a = Math.atan2(i.y - n.y, i.x - n.x), o = r.rotation + a - r.pointerAngle, s;
				if (e.shiftKey && this.shiftBehavior() !== "none") s = Math.round(o / vl) * vl;
				else {
					let e = U.getAngle(this.rotationSnapTolerance());
					s = cl(this.rotationSnaps(), o, e);
				}
				this._movingAnchorName !== "rotater" && this._setAnchorCursor(this._movingAnchorName, s);
				let c = sl(t, s - t.rotation);
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
				rotation: U.getAngle(this.rotation())
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
				bl.delete(this), this._fire("transformend", {
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
			if (!r.width || !r.height || W._inRange(e.width, -this.padding() * 2 - 1, 1) || W._inRange(e.height, -this.padding() * 2 - 1, 1)) {
				this.update();
				return;
			}
			let i = new ri();
			i.rotate(U.getAngle(this.rotation()));
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
				t ? e = t : W.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
			}
			for (let t of [o, s]) t && e[t.axis] < 0 && this._movingAnchorName && (this._movingAnchorName = this._movingAnchorName.replace(t.from, t.to), this._anchorDragOffset.x -= t.offset.x, this._anchorDragOffset.y -= t.offset.y);
			let c = 1e7, l = new ri();
			l.translate(r.x, r.y), l.rotate(r.rotation), l.scale(r.width / c, r.height / c);
			let u = new ri(), d = e.width / c, f = e.height / c;
			this.flipEnabled() === !1 ? (u.translate(e.x, e.y), u.rotate(e.rotation), u.translate(e.width < 0 ? e.width : 0, e.height < 0 ? e.height : 0), u.scale(Math.abs(d), Math.abs(f))) : (u.translate(e.x, e.y), u.rotate(e.rotation), u.scale(d, f));
			let p = u.multiply(l.invert()), m = /* @__PURE__ */ new Set();
			this._nodes.forEach((e) => {
				if (!e.getStage()) return;
				let t = e.getParent().getAbsoluteTransform(), n = e.getTransform().copy();
				n.translate(e.offsetX(), e.offsetY());
				let r = new ri();
				r.multiply(t.copy().invert()).multiply(p).multiply(t).multiply(n);
				let i = r.decompose();
				e.setAttrs(i);
				let a = e.getLayer();
				a && m.add(a);
			}), this.rotation(W._getRotation(e.rotation)), this._nodes.forEach((e) => {
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
			this._updateScheduled || (this._updateScheduled = !0, J._runAfterAbsTransformCascade(() => {
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
			let c = this.rotateMode(), l = ll(this, n, r);
			this._anchors.rotater.setAttrs({
				x: l.endX,
				y: l.endY,
				visible: this.rotateEnabled() && c !== "corners"
			});
			let u = s * 2, d = this.rotateEnabled() && c !== "handle", f = -o - u;
			_l.forEach((e) => {
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
			return this.getStage() && this._cursorChange && this.getStage().content && (this.getStage().content.style.cursor = ""), Qo.prototype.destroy.call(this), this.detach(), this._removeEvents(), this;
		}
		add(...e) {
			return this._elementsCreated ? (W.error("You cannot add external nodes to the Transformer. Use tr.nodes([node]) instead."), this) : super.add(...e);
		}
		toObject() {
			return J.prototype.toObject.call(this);
		}
		clone(e) {
			return J.prototype.clone.call(this, e);
		}
		getClientRect(e) {
			return this.nodes().length > 0 ? super.getClientRect(e) : {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
	}, X.isTransforming = () => bl.size > 0, X.prototype.className = "Transformer", Qr(X), K.addGetterSetter(X, "enabledAnchors", yl, ul), K.addGetterSetter(X, "flipEnabled", !0, ma()), K.addGetterSetter(X, "resizeEnabled", !0), K.addGetterSetter(X, "anchorSize", 10, G()), K.addGetterSetter(X, "rotateEnabled", !0), K.addGetterSetter(X, "rotateLineVisible", !0), K.addGetterSetter(X, "rotationSnaps", []), K.addGetterSetter(X, "rotateAnchorOffset", 50, G()), K.addGetterSetter(X, "rotateAnchorAngle", 0, G()), K.addGetterSetter(X, "rotateAnchorCursor", "crosshair"), K.addGetterSetter(X, "rotateMode", "handle"), K.addGetterSetter(X, "rotationSnapTolerance", 5, G()), K.addGetterSetter(X, "borderEnabled", !0), K.addGetterSetter(X, "anchorStroke", "rgb(0, 161, 255)"), K.addGetterSetter(X, "anchorStrokeWidth", 1, G()), K.addGetterSetter(X, "anchorFill", "white"), K.addGetterSetter(X, "anchorCornerRadius", 0, G()), K.addGetterSetter(X, "borderStroke", "rgb(0, 161, 255)"), K.addGetterSetter(X, "borderStrokeWidth", 1, G()), K.addGetterSetter(X, "borderDash"), K.addGetterSetter(X, "keepRatio", !0), K.addGetterSetter(X, "shiftBehavior", "default"), K.addGetterSetter(X, "centeredScaling", !1), K.addGetterSetter(X, "ignoreStroke", !1), K.addGetterSetter(X, "padding", 0, G()), K.addGetterSetter(X, "nodes"), K.addGetterSetter(X, "node"), K.addGetterSetter(X, "boundBoxFunc"), K.addGetterSetter(X, "anchorDragBoundFunc"), K.addGetterSetter(X, "anchorStyleFunc"), K.addGetterSetter(X, "shouldOverdrawWholeArea", !1), K.addGetterSetter(X, "useSingleNodeRotation", !0), K.backCompat(X, {
		lineEnabled: "borderEnabled",
		rotateHandlerOffset: "rotateAnchorOffset",
		enabledHandlers: "enabledAnchors"
	});
})), Sl, Cl = o((() => {
	q(), Ho(), $r(), ga(), Sl = class extends Y {
		_sceneFunc(e) {
			e.beginPath(), e.arc(0, 0, Math.abs(this.radius()), 0, U.getAngle(this.angle()), this.clockwise()), e.lineTo(0, 0), e.closePath(), e.fillStrokeShape(this);
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
	}, Sl.prototype.className = "Wedge", Sl.prototype._centroid = !0, Sl.prototype._attrsAffectingSize = ["radius"], Qr(Sl, !0), K.addGetterSetter(Sl, "radius", 0, G()), K.addGetterSetter(Sl, "angle", 0, G()), K.addGetterSetter(Sl, "clockwise", !1), K.backCompat(Sl, {
		angleDeg: "angle",
		getAngleDeg: "getAngle",
		setAngleDeg: "setAngle"
	});
}));
//#endregion
//#region node_modules/konva/lib/filters/Blur.js
function wl() {
	this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
}
function Tl(e, t) {
	return t === 255 ? e : e * t / 255;
}
function El(e, t) {
	let n = e.data, r = e.width, i = e.height, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T = t + t + 1, E = r - 1, D = i - 1, O = t + 1, k = O * (O + 1) / 2, A = new wl(), j = t <= kl ? Dl[t] / 2 ** Ol[t] : 1 / (O * O), M = null, N = A, P = null, F = null;
	for (let e = 1; e < T; e++) N = N.next = new wl(), e === O && (M = N);
	N.next = A, s = o = 0;
	for (let e = 0; e < i; e++) {
		g = _ = v = y = c = l = u = d = 0, C = n[o + 3], b = Tl(n[o], C), x = Tl(n[o + 1], C), S = Tl(n[o + 2], C), f = O * b, p = O * x, m = O * S, h = O * C, c += k * b, l += k * x, u += k * S, d += k * C, N = A;
		for (let e = 0; e < O; e++) N.r = b, N.g = x, N.b = S, N.a = C, N = N.next;
		for (let e = 1; e < O; e++) a = o + ((E < e ? E : e) << 2), C = n[a + 3], c += (N.r = b = Tl(n[a], C)) * (w = O - e), l += (N.g = x = Tl(n[a + 1], C)) * w, u += (N.b = S = Tl(n[a + 2], C)) * w, d += (N.a = C) * w, g += b, _ += x, v += S, y += C, N = N.next;
		P = A, F = M;
		for (let e = 0; e < r; e++) n[o] = Math.floor(c * j), n[o + 1] = Math.floor(l * j), n[o + 2] = Math.floor(u * j), n[o + 3] = Math.floor(d * j), c -= f, l -= p, u -= m, d -= h, f -= P.r, p -= P.g, m -= P.b, h -= P.a, a = s + ((a = e + t + 1) < E ? a : E) << 2, C = n[a + 3], g += P.r = Tl(n[a], C), _ += P.g = Tl(n[a + 1], C), v += P.b = Tl(n[a + 2], C), y += P.a = C, c += g, l += _, u += v, d += y, P = P.next, f += b = F.r, p += x = F.g, m += S = F.b, h += C = F.a, g -= b, _ -= x, v -= S, y -= C, F = F.next, o += 4;
		s += r;
	}
	for (let e = 0; e < r; e++) {
		_ = v = y = g = l = u = d = c = 0, o = e << 2, f = O * (b = n[o]), p = O * (x = n[o + 1]), m = O * (S = n[o + 2]), h = O * (C = n[o + 3]), c += k * b, l += k * x, u += k * S, d += k * C, N = A;
		for (let e = 0; e < O; e++) N.r = b, N.g = x, N.b = S, N.a = C, N = N.next;
		let s = Math.min(1, D) * r;
		for (let i = 1; i <= t; i++) o = s + e << 2, c += (N.r = b = n[o]) * (w = O - i), l += (N.g = x = n[o + 1]) * w, u += (N.b = S = n[o + 2]) * w, d += (N.a = C = n[o + 3]) * w, g += b, _ += x, v += S, y += C, N = N.next, i < D && (s += r);
		o = e, P = A, F = M;
		for (let t = 0; t < i; t++) a = o << 2, n[a + 3] = C = Math.floor(d * j), C > 0 ? (C = 255 / C, n[a] = Math.floor(c * j) * C, n[a + 1] = Math.floor(l * j) * C, n[a + 2] = Math.floor(u * j) * C) : n[a] = n[a + 1] = n[a + 2] = 0, c -= f, l -= p, u -= m, d -= h, f -= P.r, p -= P.g, m -= P.b, h -= P.a, a = e + ((a = t + O) < D ? a : D) * r << 2, c += g += P.r = n[a], l += _ += P.g = n[a + 1], u += v += P.b = n[a + 2], d += y += P.a = n[a + 3], P = P.next, f += b = F.r, p += x = F.g, m += S = F.b, h += C = F.a, g -= b, _ -= x, v -= S, y -= C, F = F.next, o += r;
	}
}
var Dl, Ol, kl, Al, jl = o((() => {
	q(), La(), ga(), Dl = [
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
	], Ol = [
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
	], kl = 180, Al = function(e, t = 1) {
		let n = Math.round(Math.min(this.blurRadius(), kl) * t);
		n > 0 && El(e, n);
	}, K.addGetterSetter(J, "blurRadius", 0, G(), K.afterSetFilter);
})), Ml, Nl = o((() => {
	q(), La(), ga(), Ml = function(e) {
		let t = this.brightness() * 255, n = e.data, r = n.length;
		for (let e = 0; e < r; e += 4) n[e] += t, n[e + 1] += t, n[e + 2] += t;
	}, K.addGetterSetter(J, "brightness", 0, G(), K.afterSetFilter);
})), Pl, Fl = o((() => {
	Nl(), Pl = function(e) {
		let t = this.attrs.brightness === void 0 ? 1 : this.brightness(), n = e.data, r = n.length;
		for (let e = 0; e < r; e += 4) n[e] = Math.min(255, n[e] * t), n[e + 1] = Math.min(255, n[e + 1] * t), n[e + 2] = Math.min(255, n[e + 2] * t);
	};
})), Il, Ll = o((() => {
	q(), La(), ga(), Il = function(e) {
		let t = ((this.contrast() + 100) / 100) ** 2, n = e.data, r = n.length, i = 150, a = 150, o = 150;
		for (let e = 0; e < r; e += 4) i = n[e], a = n[e + 1], o = n[e + 2], i /= 255, i -= .5, i *= t, i += .5, i *= 255, a /= 255, a -= .5, a *= t, a += .5, a *= 255, o /= 255, o -= .5, o *= t, o += .5, o *= 255, i = i < 0 ? 0 : i > 255 ? 255 : i, a = a < 0 ? 0 : a > 255 ? 255 : a, o = o < 0 ? 0 : o > 255 ? 255 : o, n[e] = i, n[e + 1] = a, n[e + 2] = o;
	}, K.addGetterSetter(J, "contrast", 0, G(), K.afterSetFilter);
})), Rl, zl = o((() => {
	q(), La(), ga(), Rl = function(e) {
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
	}, K.addGetterSetter(J, "embossStrength", .5, G(), K.afterSetFilter), K.addGetterSetter(J, "embossWhiteLevel", .5, G(), K.afterSetFilter), K.addGetterSetter(J, "embossDirection", "top-left", void 0, K.afterSetFilter), K.addGetterSetter(J, "embossBlend", !1, void 0, K.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Enhance.js
function Bl(e, t, n, r, i) {
	let a = n - t, o = i - r;
	if (a === 0) return r + o / 2;
	if (o === 0) return r;
	let s = (e - t) / a;
	return s = o * s + r, s;
}
var Vl, Hl = o((() => {
	q(), La(), ga(), Vl = function(e) {
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
		for (let e = 0; e < n; e += 4) t[e + 0] = Bl(t[e + 0], r, i, m, p), t[e + 1] = Bl(t[e + 1], o, s, g, h), t[e + 2] = Bl(t[e + 2], l, u, v, _);
	}, K.addGetterSetter(J, "enhance", 0, G(), K.afterSetFilter);
})), Ul, Wl = o((() => {
	Ul = function(e) {
		let t = e.data, n = t.length;
		for (let e = 0; e < n; e += 4) {
			let n = .34 * t[e] + .5 * t[e + 1] + .16 * t[e + 2];
			t[e] = n, t[e + 1] = n, t[e + 2] = n;
		}
	};
})), Gl, Kl = o((() => {
	q(), La(), ga(), K.addGetterSetter(J, "hue", 0, G(), K.afterSetFilter), K.addGetterSetter(J, "saturation", 0, G(), K.afterSetFilter), K.addGetterSetter(J, "luminance", 0, G(), K.afterSetFilter), Gl = function(e) {
		let t = e.data, n = t.length, r = 2 ** this.saturation(), i = (this.hue() % 360 + 360) % 360, a = this.luminance() * 127, o = 1 * r * Math.cos(i * Math.PI / 180), s = 1 * r * Math.sin(i * Math.PI / 180), c = .299 + .701 * o + .168 * s, l = .587 - .587 * o + .33 * s, u = .114 - .114 * o - .497 * s, d = .299 - .299 * o - .328 * s, f = .587 + .413 * o + .035 * s, p = .114 - .114 * o + .292 * s, m = .299 - .3 * o + 1.25 * s, h = .587 - .588 * o - 1.05 * s, g = .114 + .886 * o - .203 * s, _, v, y, b;
		for (let e = 0; e < n; e += 4) _ = t[e + 0], v = t[e + 1], y = t[e + 2], b = t[e + 3], t[e + 0] = c * _ + l * v + u * y + a, t[e + 1] = d * _ + f * v + p * y + a, t[e + 2] = m * _ + h * v + g * y + a, t[e + 3] = b;
	};
})), ql, Jl = o((() => {
	q(), La(), ga(), ql = function(e) {
		let t = e.data, n = t.length, r = 2 ** this.value(), i = 2 ** this.saturation(), a = (this.hue() % 360 + 360) % 360, o = r * i * Math.cos(a * Math.PI / 180), s = r * i * Math.sin(a * Math.PI / 180), c = .299 * r + .701 * o + .168 * s, l = .587 * r - .587 * o + .33 * s, u = .114 * r - .114 * o - .497 * s, d = .299 * r - .299 * o - .328 * s, f = .587 * r + .413 * o + .035 * s, p = .114 * r - .114 * o + .292 * s, m = .299 * r - .3 * o + 1.25 * s, h = .587 * r - .588 * o - 1.05 * s, g = .114 * r + .886 * o - .203 * s;
		for (let e = 0; e < n; e += 4) {
			let n = t[e + 0], r = t[e + 1], i = t[e + 2], a = t[e + 3];
			t[e + 0] = c * n + l * r + u * i, t[e + 1] = d * n + f * r + p * i, t[e + 2] = m * n + h * r + g * i, t[e + 3] = a;
		}
	}, K.addGetterSetter(J, "hue", 0, G(), K.afterSetFilter), K.addGetterSetter(J, "saturation", 0, G(), K.afterSetFilter), K.addGetterSetter(J, "value", 0, G(), K.afterSetFilter);
})), Yl, Xl = o((() => {
	Yl = function(e) {
		let t = e.data, n = t.length;
		for (let e = 0; e < n; e += 4) t[e] = 255 - t[e], t[e + 1] = 255 - t[e + 1], t[e + 2] = 255 - t[e + 2];
	};
})), Zl, Ql, $l, eu = o((() => {
	q(), La(), ga(), Zl = function(e, t, n) {
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
	}, Ql = function(e, t, n) {
		let r = e.data, i = t.data, a = e.width, o = e.height, s = n.polarCenterX || a / 2, c = n.polarCenterY || o / 2, l = Math.sqrt(s * s + c * c), u = a - s, d = o - c, f = Math.sqrt(u * u + d * d);
		l = f > l ? f : l;
		let p = o, m = a, h = n.polarRotation || 0, g, _;
		for (u = 0; u < a; u += 1) for (d = 0; d < o; d += 1) {
			let e = u - s, t = d - c, n = Math.sqrt(e * e + t * t) * p / l, o = (Math.atan2(t, e) * 180 / Math.PI + 360 + h) % 360;
			o = o * m / 360, g = Math.floor(o), _ = Math.floor(n);
			let f = (_ * a + g) * 4, v = r[f + 0], y = r[f + 1], b = r[f + 2], x = r[f + 3];
			f = (d * a + u) * 4, i[f + 0] = v, i[f + 1] = y, i[f + 2] = b, i[f + 3] = x;
		}
	}, $l = function(e) {
		let t = e.width, n = e.height, r, i, a, o, s, c, l, u, d, f, p = Math.round(this.kaleidoscopePower()), m = Math.round(this.kaleidoscopeAngle()), h = Math.floor(t * ((m % 360 + 360) % 360) / 360);
		if (p < 1) return;
		let g = {
			width: t,
			height: n,
			data: new Uint8ClampedArray(t * n * 4)
		};
		Zl(e, g, {
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
		Ql(g, e, { polarRotation: 0 });
	}, K.addGetterSetter(J, "kaleidoscopePower", 2, G(), K.afterSetFilter), K.addGetterSetter(J, "kaleidoscopeAngle", 0, G(), K.afterSetFilter);
}));
//#endregion
//#region node_modules/konva/lib/filters/Mask.js
function tu(e, t, n) {
	let r = (n * e.width + t) * 4, i = [];
	return i.push(e.data[r++], e.data[r++], e.data[r++], e.data[r++]), i;
}
function nu(e, t) {
	return Math.sqrt((e[0] - t[0]) ** 2 + (e[1] - t[1]) ** 2 + (e[2] - t[2]) ** 2);
}
function ru(e) {
	let t = [
		0,
		0,
		0
	];
	for (let n = 0; n < e.length; n++) t[0] += e[n][0], t[1] += e[n][1], t[2] += e[n][2];
	return t[0] /= e.length, t[1] /= e.length, t[2] /= e.length, t;
}
function iu(e, t) {
	let n = tu(e, 0, 0), r = tu(e, e.width - 1, 0), i = tu(e, 0, e.height - 1), a = tu(e, e.width - 1, e.height - 1);
	if (nu(n, r) < t && nu(r, a) < t && nu(a, i) < t && nu(i, n) < t) {
		let o = ru([
			r,
			n,
			a,
			i
		]), s = [];
		for (let n = 0; n < e.width * e.height; n++) {
			let r = nu(o, [
				e.data[n * 4],
				e.data[n * 4 + 1],
				e.data[n * 4 + 2]
			]);
			s[n] = r < t ? 0 : 255;
		}
		return s;
	}
}
function au(e, t) {
	for (let n = 0; n < e.width * e.height; n++) e.data[4 * n + 3] = t[n];
}
function ou(e, t, n) {
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
function su(e, t, n) {
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
function cu(e, t, n) {
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
var lu, uu = o((() => {
	q(), La(), ga(), lu = function(e) {
		let t = iu(e, this.attrs.threshold ?? 10);
		return t && (t = ou(t, e.width, e.height), t = su(t, e.width, e.height), t = cu(t, e.width, e.height), au(e, t)), e;
	}, K.addGetterSetter(J, "threshold", .5, G(), K.afterSetFilter);
})), du, fu = o((() => {
	q(), La(), ga(), du = function(e) {
		let t = this.noise() * 255, n = e.data, r = n.length, i = t / 2;
		for (let e = 0; e < r; e += 4) n[e + 0] += i - 2 * i * Math.random(), n[e + 1] += i - 2 * i * Math.random(), n[e + 2] += i - 2 * i * Math.random();
	}, K.addGetterSetter(J, "noise", .2, G(), K.afterSetFilter);
})), pu, mu = o((() => {
	q(), ki(), La(), ga(), pu = function(e, t = 1) {
		let n = Math.ceil(this.pixelSize() * t), r = e.width, i = e.height, a = Math.ceil(r / n), o = Math.ceil(i / n), s = e.data;
		if (n <= 0) W.error("pixelSize value can not be <= 0");
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
	}, K.addGetterSetter(J, "pixelSize", 8, G(), K.afterSetFilter);
})), hu, gu = o((() => {
	q(), La(), ga(), hu = function(e) {
		let t = Math.round(this.levels() * 254) + 1, n = e.data, r = n.length, i = 255 / t;
		for (let e = 0; e < r; e += 1) n[e] = Math.floor(n[e] / i) * i;
	}, K.addGetterSetter(J, "levels", .5, G(), K.afterSetFilter);
})), _u, vu = o((() => {
	q(), La(), ga(), _u = function(e) {
		let t = e.data, n = t.length, r = this.red(), i = this.green(), a = this.blue();
		for (let e = 0; e < n; e += 4) {
			let n = (.34 * t[e] + .5 * t[e + 1] + .16 * t[e + 2]) / 255;
			t[e] = n * r, t[e + 1] = n * i, t[e + 2] = n * a, t[e + 3] = t[e + 3];
		}
	}, K.addGetterSetter(J, "red", 0, ca, K.afterSetFilter), K.addGetterSetter(J, "green", 0, ca, K.afterSetFilter), K.addGetterSetter(J, "blue", 0, ca, K.afterSetFilter);
})), yu, bu = o((() => {
	q(), La(), vu(), yu = function(e) {
		let t = e.data, n = t.length, r = this.red(), i = this.green(), a = this.blue(), o = this.alpha();
		for (let e = 0; e < n; e += 4) {
			let n = 1 - o;
			t[e] = r * o + t[e] * n, t[e + 1] = i * o + t[e + 1] * n, t[e + 2] = a * o + t[e + 2] * n;
		}
	}, K.addGetterSetter(J, "alpha", 1, (e) => Math.min(1, Math.max(0, e)), K.afterSetFilter);
})), xu, Su = o((() => {
	xu = function(e) {
		let t = e.data, n = t.length;
		for (let e = 0; e < n; e += 4) {
			let n = t[e + 0], r = t[e + 1], i = t[e + 2];
			t[e + 0] = Math.min(255, n * .393 + r * .769 + i * .189), t[e + 1] = Math.min(255, n * .349 + r * .686 + i * .168), t[e + 2] = Math.min(255, n * .272 + r * .534 + i * .131);
		}
	};
})), Cu, wu = o((() => {
	Cu = function(e) {
		let t = e.data;
		for (let e = 0; e < t.length; e += 4) {
			let n = t[e], r = t[e + 1], i = t[e + 2];
			.2126 * n + .7152 * r + .0722 * i >= 128 && (t[e] = 255 - n, t[e + 1] = 255 - r, t[e + 2] = 255 - i);
		}
		return e;
	};
})), Tu, Eu = o((() => {
	q(), La(), ga(), Tu = function(e) {
		let t = this.threshold() * 255, n = e.data, r = n.length;
		for (let e = 0; e < r; e += 1) n[e] = n[e] < t ? 0 : 255;
	}, K.addGetterSetter(J, "threshold", .5, G(), K.afterSetFilter);
})), Du, Ou = o((() => {
	_s(), ys(), Vs(), Us(), Gs(), qs(), Rc(), Fs(), zs(), Bc(), Hc(), Gc(), qc(), Yc(), kc(), tl(), xl(), Cl(), jl(), Nl(), Fl(), Ll(), zl(), Hl(), Wl(), Kl(), Jl(), Xl(), eu(), uu(), fu(), mu(), gu(), vu(), bu(), Su(), wu(), Eu(), Du = gs.Util._assign(gs, {
		Arc: vs,
		Arrow: Bs,
		Circle: Hs,
		Ellipse: Ws,
		Image: Ks,
		Label: Ic,
		Tag: Lc,
		Line: Ps,
		Path: Rs,
		Rect: zc,
		RegularPolygon: Vc,
		Ring: Wc,
		Sprite: Kc,
		Star: Jc,
		Text: Oc,
		TextPath: el,
		Transformer: X,
		Wedge: Sl,
		Filters: {
			Blur: Al,
			Brightness: Pl,
			Brighten: Ml,
			Contrast: Il,
			Emboss: Rl,
			Enhance: Vl,
			Grayscale: Ul,
			HSL: Gl,
			HSV: ql,
			Invert: Yl,
			Kaleidoscope: $l,
			Mask: lu,
			Noise: du,
			Pixelate: pu,
			Posterize: hu,
			RGB: _u,
			RGBA: yu,
			Sepia: xu,
			Solarize: Cu,
			Threshold: Tu
		}
	});
})), Z, ku = o((() => {
	Ou(), Z = Du;
}));
//#endregion
//#region src/render/realSize.ts
ku();
var Au = [
	"auto",
	"person",
	"sofa",
	"door",
	"counter"
], ju = {
	widthCm: 200,
	heightCm: 85
}, Mu = {
	heightCm: 175,
	widthCm: 50
}, Nu = {
	widthCm: 90,
	heightCm: 204
}, Pu = {
	widthCm: 200,
	heightCm: 110
}, Fu = 150, Iu = .86;
function Lu(e, t) {
	return !e || e === "auto" ? t < Fu ? "sofa" : "person" : e;
}
function Ru(e, t, n) {
	if (e === "sofa" || e === "counter") {
		let r = e === "sofa" ? ju.widthCm : Pu.widthCm, i = e === "sofa" ? ju.heightCm : Pu.heightCm, a = Math.max(r, t) + 50, o = i + 30;
		return {
			w: a,
			h: o + n + 40,
			signCx: a / 2,
			signBottom: o,
			refX: a / 2 - r / 2
		};
	}
	let r = e === "person" ? Mu.widthCm : Nu.widthCm + 12, i = e === "person" ? Mu.heightCm : Nu.heightCm + 6, a = Math.max(40, 150 - n / 2);
	return {
		w: 25 + r + 40 + t + 25,
		h: Math.max(i, a + n) + 40,
		signCx: 25 + r + 40 + t / 2,
		signBottom: a,
		refX: 25
	};
}
function zu(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(a, r / 2, i / 2));
	e.beginPath(), e.moveTo(t + o, n), e.arcTo(t + r, n, t + r, n + i, o), e.arcTo(t + r, n + i, t, n + i, o), e.arcTo(t, n + i, t, n, o), e.arcTo(t, n, t + r, n, o), e.closePath();
}
function Bu(e, t, n, r, i) {
	e.save(), e.fillStyle = i;
	let a = (i, a, o, s, c) => {
		zu(e, t + i * r, n - (a + s) * r, o * r, s * r, c * r), e.fill();
	};
	a(8, 0, 6, 12, 1), a(186, 0, 6, 12, 1), a(0, 10, 200, 32, 6), a(10, 38, 180, 47, 8), a(0, 10, 22, 52, 7), a(178, 10, 22, 52, 7), e.globalAlpha = .5, e.fillStyle = "#000", e.fillRect(t + 100 * r - .5, n - 42 * r, Math.max(1, r * .6), 30 * r), e.restore();
}
function Vu(e, t, n, r, i) {
	let a = (e) => n - e * r;
	e.save(), e.fillStyle = i, e.beginPath(), e.ellipse(t, a(162), 10 * r, 12 * r, 0, 0, Math.PI * 2), e.fill(), e.beginPath(), e.moveTo(t - 22 * r, a(145)), e.quadraticCurveTo(t, a(150), t + 22 * r, a(145)), e.lineTo(t + 25 * r, a(95)), e.lineTo(t + 18 * r, a(94)), e.lineTo(t + 15 * r, a(130)), e.lineTo(t + 15 * r, a(88)), e.lineTo(t - 15 * r, a(88)), e.lineTo(t - 15 * r, a(130)), e.lineTo(t - 18 * r, a(94)), e.lineTo(t - 25 * r, a(95)), e.closePath(), e.fill(), e.beginPath(), e.moveTo(t - 15 * r, a(90)), e.lineTo(t + 15 * r, a(90)), e.lineTo(t + 13 * r, a(0)), e.lineTo(t + 3 * r, a(0)), e.lineTo(t, a(55)), e.lineTo(t - 3 * r, a(0)), e.lineTo(t - 13 * r, a(0)), e.closePath(), e.fill(), e.restore();
}
function Hu(e, t, n, r, i) {
	e.save(), e.fillStyle = i, zu(e, t - 6 * r, n - 210 * r, 102 * r, 210 * r, 1.5 * r), e.fill(), e.globalCompositeOperation = "destination-out", zu(e, t, n - 204 * r, 90 * r, 204 * r, 1 * r), e.fill(), e.globalCompositeOperation = "source-over", e.globalAlpha = .75, zu(e, t + 1.5 * r, n - 202.5 * r, 87 * r, 202.5 * r, 1 * r), e.fill(), e.globalAlpha = 1, e.fillStyle = "rgba(0,0,0,0.35)";
	for (let [i, a] of [[20, 80], [112, 80]]) zu(e, t + 14 * r, n - (i + a) * r, 62 * r, a * r, 2 * r), e.fill();
	e.beginPath(), e.arc(t + 78 * r, n - 102 * r, 3 * r, 0, Math.PI * 2), e.fill(), e.restore();
}
function Uu(e, t, n, r, i) {
	e.save(), e.fillStyle = i, zu(e, t - 6 * r, n - 110 * r, 212 * r, 6 * r, 2 * r), e.fill(), zu(e, t, n - 104 * r, 200 * r, 104 * r, 1 * r), e.globalAlpha = .8, e.fill(), e.globalAlpha = 1;
	for (let i of [40, 140]) zu(e, t + (i - 18) * r, n - 78 * r, 36 * r, 6 * r, 3 * r), e.fill(), e.fillRect(t + (i - 1.5) * r, n - 72 * r, 3 * r, 70 * r), zu(e, t + (i - 15) * r, n - 3 * r, 30 * r, 3 * r, 1.5 * r), e.fill();
	e.restore();
}
function Wu(e, t, n, r, i, a, o) {
	let s = n + r * a;
	t === "sofa" ? Bu(e, s, i, a, o) : t === "counter" ? Uu(e, s, i, a, o) : t === "door" ? Hu(e, s + 6 * a, i, a, o) : Vu(e, s + Mu.widthCm / 2 * a, i, a, o);
}
function Gu(e, t, n, r, i, a) {
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
var Ku = {
	mm: 12,
	cm: 120,
	in: 300,
	m: 12e3,
	ft: 3600
};
function qu(e, t, n) {
	let r = 1e3, i = Ku[n] ?? 12, a = e * i, o = t * i, s = a > 1e4 || o > 1e4 ? .25 : .35, c = o >= a / 2 ? "big" : "small", l, u, d;
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
var Ju = (e) => e === "rectangle" ? "square" : e;
function Yu(e, t, n = 0, r = 0) {
	let i = Math.min(n, e / 2), a = Math.min(r, t / 2);
	return !i || !a ? `M0,0 H${e} V${t} H0 Z` : `M${i},0 H${e - i} A${i},${a} 0 0 1 ${e},${a} V${t - a} A${i},${a} 0 0 1 ${e - i},${t} H${i} A${i},${a} 0 0 1 0,${t - a} V${a} A${i},${a} 0 0 1 ${i},0 Z`;
}
var Xu = (e) => `M${e.map(([e, t]) => `${e},${t}`).join(" L")} Z`;
function Zu(e, t, n) {
	switch (e) {
		case "rounded-square": return Yu(t, n, 35, 35);
		case "oval": return `M0,${n / 2} A${t / 2},${n / 2} 0 1 0 ${t},${n / 2} A${t / 2},${n / 2} 0 1 0 0,${n / 2} Z`;
		case "triangle": return Xu([
			[0, n],
			[t / 2, 0],
			[t, n]
		]);
		case "rotated-square": return Xu([
			[t / 2, 0],
			[t, n / 2],
			[t / 2, n],
			[0, n / 2]
		]);
		case "turn-left": return Xu([
			[0, n / 2],
			[t / 2, 0],
			[t, 0],
			[t, n],
			[t / 2, n]
		]);
		case "turn-right": return Xu([
			[0, 0],
			[t / 2, 0],
			[t, n / 2],
			[t / 2, n],
			[0, n]
		]);
		case "arrow-right": return Xu([
			[0, n / 5 * 4],
			[t / 2, n / 5 * 4],
			[t / 2, n],
			[t, n / 2],
			[t / 2, 0],
			[t / 2, n / 5],
			[0, n / 5]
		]);
		case "arrow-left": return Xu([
			[0, n / 2],
			[t / 2, 0],
			[t / 2, n / 5],
			[t, n / 5],
			[t, n / 5 * 4],
			[t / 2, n / 5 * 4],
			[t / 2, n]
		]);
		case "stop": return Xu([
			[0, n / 3 * 2],
			[t / 3, n],
			[t / 3 * 2, n],
			[t, n / 3 * 2],
			[t, n / 3],
			[t / 3 * 2, 0],
			[t / 3, 0],
			[0, n / 3]
		]);
		case "rounded-top": return Yu(t, n, t, 10);
		case "rounded-sides": return Yu(t, n, 10, n);
		default: return Yu(t, n);
	}
}
function Qu(e, t, n, r = 10) {
	let i = t + r * 2, a = n + r * 2;
	switch (e) {
		case "triangle": return {
			data: Xu([
				[0, a],
				[i / 2, 0],
				[i, a]
			]),
			x: -r,
			y: -r * 1.5
		};
		case "turn-left": return {
			data: Zu(e, i, a),
			x: -r * 1.2,
			y: -r
		};
		case "turn-right": return {
			data: Zu(e, i, a),
			x: -r / 1.5,
			y: -r
		};
		case "arrow-right": {
			let e = i / 2 / 1.05;
			return {
				data: Xu([
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
				data: Xu([
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
			data: Yu(i, a, i, 10),
			x: -r,
			y: -r
		};
		case "rounded-sides": return {
			data: Yu(i, a, 10, a),
			x: -r,
			y: -r
		};
		default: return {
			data: Zu(e, i, a),
			x: -r,
			y: -r
		};
	}
}
var $u = {
	shadowColor: "#000000",
	shadowOffsetX: 3,
	shadowOffsetY: 3,
	shadowBlur: 30,
	shadowOpacity: 1
};
function ed(e, t, n) {
	let r = e === "old-world" ? "im_old_world" : "im_rounded_corners";
	return t === n ? `${r}.svg` : t >= 2 * n ? `${r}_longW.svg` : t > n ? `${r}_mediumW.svg` : n >= 2 * t ? `${r}_longH.svg` : n > t ? `${r}_mediumH.svg` : null;
}
var td = /* @__PURE__ */ new Map();
function nd(e, t, n) {
	let r = `${e}|${t}|${n}`, i = td.get(r);
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
	}).catch(() => null), td.set(r, i)), i;
}
function rd(e, t) {
	return nd(e, t, "both");
}
//#endregion
//#region node_modules/qrcode/lib/can-promise.js
var id = /* @__PURE__ */ s(((e, t) => {
	t.exports = function() {
		return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
	};
})), ad = /* @__PURE__ */ s(((e) => {
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
})), od = /* @__PURE__ */ s(((e) => {
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
})), sd = /* @__PURE__ */ s(((e, t) => {
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
})), cd = /* @__PURE__ */ s(((e, t) => {
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
})), ld = /* @__PURE__ */ s(((e) => {
	var t = ad().getSymbolSize;
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
})), ud = /* @__PURE__ */ s(((e) => {
	var t = ad().getSymbolSize, n = 7;
	e.getPositions = function(e) {
		let r = t(e);
		return [
			[0, 0],
			[r - n, 0],
			[0, r - n]
		];
	};
})), dd = /* @__PURE__ */ s(((e) => {
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
})), fd = /* @__PURE__ */ s(((e) => {
	var t = od(), n = [
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
})), pd = /* @__PURE__ */ s(((e) => {
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
})), md = /* @__PURE__ */ s(((e) => {
	var t = pd();
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
})), hd = /* @__PURE__ */ s(((e, t) => {
	var n = md();
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
})), gd = /* @__PURE__ */ s(((e) => {
	e.isValid = function(e) {
		return !isNaN(e) && e >= 1 && e <= 40;
	};
})), _d = /* @__PURE__ */ s(((e) => {
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
})), vd = /* @__PURE__ */ s(((e) => {
	var t = gd(), n = _d();
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
})), yd = /* @__PURE__ */ s(((e) => {
	var t = ad(), n = fd(), r = od(), i = vd(), a = gd(), o = 7973, s = t.getBCHDigit(o);
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
})), bd = /* @__PURE__ */ s(((e) => {
	var t = ad(), n = 1335, r = 21522, i = t.getBCHDigit(n);
	e.getEncodedBits = function(e, a) {
		let o = e.bit << 3 | a, s = o << 10;
		for (; t.getBCHDigit(s) - i >= 0;) s ^= n << t.getBCHDigit(s) - i;
		return (o << 10 | s) ^ r;
	};
})), xd = /* @__PURE__ */ s(((e, t) => {
	var n = vd();
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
})), Sd = /* @__PURE__ */ s(((e, t) => {
	var n = vd(), r = /* @__PURE__ */ "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
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
})), Cd = /* @__PURE__ */ s(((e, t) => {
	var n = vd();
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
})), wd = /* @__PURE__ */ s(((e, t) => {
	var n = vd(), r = ad();
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
})), Td = /* @__PURE__ */ s(((e, t) => {
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
})), Ed = /* @__PURE__ */ s(((e) => {
	var t = vd(), n = xd(), r = Sd(), i = Cd(), a = wd(), o = _d(), s = ad(), c = Td();
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
})), Dd = /* @__PURE__ */ s(((e) => {
	var t = ad(), n = od(), r = sd(), i = cd(), a = ld(), o = ud(), s = dd(), c = fd(), l = hd(), u = yd(), d = bd(), f = vd(), p = Ed();
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
})), Od = /* @__PURE__ */ s(((e) => {
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
})), kd = /* @__PURE__ */ s(((e) => {
	var t = Od();
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
})), Ad = /* @__PURE__ */ s(((e) => {
	var t = Od();
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
})), jd = /* @__PURE__ */ u((/* @__PURE__ */ s(((e) => {
	var t = id(), n = Dd(), r = kd(), i = Ad();
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
})))(), 1), Md = 2;
function Nd(e, t, n, r = "#ffffff") {
	let i = new Z.Group({
		width: t,
		height: t
	});
	i.add(new Z.Rect({
		width: t,
		height: t,
		fill: r
	}));
	let a = null;
	try {
		a = jd.create(e.trim() || " ", { errorCorrectionLevel: "M" }).modules;
	} catch {
		a = null;
	}
	if (!a) return i;
	let o = t / (a.size + 4);
	return i.add(new Z.Shape({
		fill: n,
		listening: !1,
		sceneFunc: (e, t) => {
			e.beginPath();
			for (let t = 0; t < a.size; t++) for (let n = 0; n < a.size; n++) a.get(t, n) && e.rect((n + Md) * o, (t + Md) * o, o + .02, o + .02);
			e.fillShape(t);
		}
	})), i;
}
function Pd(e, t) {
	let n;
	try {
		n = jd.create(e.trim() || " ", { errorCorrectionLevel: "M" }).modules;
	} catch {
		return "";
	}
	let r = t / (n.size + 4), i = "";
	for (let e = 0; e < n.size; e++) for (let t = 0; t < n.size; t++) n.get(e, t) && (i += `M${((t + Md) * r).toFixed(3)} ${((e + Md) * r).toFixed(3)}h${r.toFixed(3)}v${r.toFixed(3)}h${(-r).toFixed(3)}z`);
	return i;
}
//#endregion
//#region src/render/filters.ts
ku();
function Fd(e) {
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
var Id = (e) => (t) => {
	let n = t.data;
	for (let t = 0; t < n.length; t += 4) {
		let [r, i, a] = e(n[t], n[t + 1], n[t + 2]);
		n[t] = r, n[t + 1] = i, n[t + 2] = a;
	}
}, Ld = {
	sepia: Z.Filters.Sepia,
	greyscale: Z.Filters.Grayscale,
	blur: Z.Filters.Blur,
	emboss: Fd([
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
	sharpen: Fd([
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
	greenify: Id((e, t) => [
		0,
		t,
		0
	]),
	blueify: Id((e, t, n) => [
		0,
		t * .5,
		n * .8
	]),
	pinkify: Id((e, t, n) => [
		e,
		t * .3,
		n * .8
	]),
	orangeify: Id((e, t, n) => [
		Math.min(255, e * 1.2),
		Math.min(255, t * .9),
		n * .2
	])
}, Rd = Object.keys(Ld);
//#endregion
//#region src/render/legacy/fabricShim.ts
function zd(e) {
	return {
		Image: { fromURL(t, n) {
			e.track(e.load(t), (e) => n(new Vd("image", {
				image: e,
				width: e.naturalWidth,
				height: e.naturalHeight
			})));
		} },
		Circle: function(e) {
			return new Vd("circle", e);
		},
		Rect: function(e) {
			return new Vd("rect", e);
		},
		Polygon: function(e, t) {
			let n = e.map((e) => e.x), r = e.map((e) => e.y);
			return new Vd("polygon", {
				...t,
				points: e,
				width: Math.max(...n) - Math.min(...n),
				height: Math.max(...r) - Math.min(...r)
			});
		}
	};
}
function Bd(e) {
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
			return new Z.Image({
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
		case "circle": return new Z.Circle({
			...n,
			x: r.left + r.width / 2,
			y: r.top + r.height / 2,
			radius: e.radius * e.scaleX
		});
		case "rect": return new Z.Rect({
			...n,
			x: r.left + t / 2,
			y: r.top + t / 2,
			width: e.width * e.scaleX,
			height: e.height * e.scaleY
		});
		case "polygon": {
			let i = Math.min(...e.points.map((e) => e.x)), a = Math.min(...e.points.map((e) => e.y));
			return new Z.Line({
				...n,
				closed: !0,
				points: e.points.flatMap((n) => [r.left + (n.x - i) * e.scaleX + t / 2, r.top + (n.y - a) * e.scaleY + t / 2])
			});
		}
		default: return null;
	}
}
var Vd, Hd, Ud, Wd = o((() => {
	ku(), Vt(), Vd = class {
		constructor(e, t = {}) {
			R(this, "kind", void 0), R(this, "canvas", null), R(this, "name", ""), R(this, "objectType", ""), R(this, "left", 0), R(this, "top", 0), R(this, "width", 0), R(this, "height", 0), R(this, "scaleX", 1), R(this, "scaleY", 1), R(this, "flipX", !1), R(this, "flipY", !1), R(this, "angle", 0), R(this, "originX", "left"), R(this, "originY", "top"), R(this, "strokeWidth", 1), R(this, "fill", null), R(this, "stroke", null), R(this, "radius", 0), R(this, "points", []), R(this, "image", null), this.kind = e, this.set(t);
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
	}, Hd = class {
		constructor() {
			R(this, "objects", []);
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
	}, Ud = class {
		constructor() {
			R(this, "cache", /* @__PURE__ */ new Map()), R(this, "pending", 0), R(this, "waiters", []);
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
function Gd(e) {
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
	function T(e) {
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
						var T = new t.Rect({
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
						}), E = new t.Rect({
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
						}), D = new t.Rect({
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
						}), O = new t.Rect({
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
						e.add(T, E, D, O);
					}
					if (a == "oval" || a == "stop") {
						var T = new t.Rect({
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
						}), E = new t.Rect({
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
						e.add(T, E);
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
						var k = new t.Circle({
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
						e.add(k);
					}
					if (a == "oval" || a == "stop") {
						m(h("im_keyring_oval.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.4, t.left = r.left + r.width / 2 - n / 2, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var A = r.height * .05, k = new t.Circle({
							id: 43,
							radius: A,
							fill: "#f5f5f5",
							top: r.top + 15,
							left: r.left + r.width / 2 - A,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(k);
					}
					if (a == "rotated-square") {
						m(h("im_keyring_losange.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.4, t.left = r.left + r.width / 2 - n / 2, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var A = r.height * .05, k = new t.Circle({
							id: 43,
							radius: A,
							fill: "#f5f5f5",
							top: r.top + 15,
							left: r.left + r.width / 2 - A,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(k);
					}
					if (a == "triangle") {
						m(h("im_keyring_triangle.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.25), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top + r.height / 10 - i / 1.2, t.left = r.left + r.width / 2 - n / 2, t.set("name", "keyring"), t.id = 44, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var A = r.height * .05, k = new t.Circle({
							id: 43,
							radius: A,
							fill: "#f5f5f5",
							top: r.top + r.height / 10,
							left: r.left + r.width / 2 - A,
							name: "keyring-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(k);
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
						var A = r.height * .05, k = new t.Circle({
							id: 46,
							radius: A,
							fill: "#f5f5f5",
							top: r.top + r.height / 25,
							left: r.left + r.width / 2 - A,
							name: "s-hook-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(k);
					}
					if (a == "rotated-square") {
						m(h("im_s-hook_losange.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.6), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.5, t.left = r.left + r.width / 2 - n / 1.9, t.set("name", "s-hook"), t.id = 45, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var A = r.height * .05, k = new t.Circle({
							id: 46,
							radius: A,
							fill: "#f5f5f5",
							top: r.top + r.height / 15,
							left: r.left + r.width / 2 - A,
							name: "s-hook-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(k);
					}
					if (a == "triangle") {
						m(h("im_s-hook_triangle.png"), function(n) {
							t.Image.fromURL(n, function(t) {
								t.scale(.6), t.setCoords();
								var n = t.width * t.scaleX, i = t.height * t.scaleY;
								t.top = r.top - i / 1.6, t.left = r.left + r.width / 2 - n / 1.9, t.set("name", "s-hook"), t.id = 45, t.selectable = !1, t.objectType = "aso-fixingMethods", e.add(t);
							});
						});
						var A = r.height * .05, k = new t.Circle({
							id: 46,
							radius: A,
							fill: "#f5f5f5",
							top: r.top + r.height / 10,
							left: r.left + r.width / 2 - A,
							name: "s-hook-hole",
							strokeWidth: 2,
							stroke: "grey",
							selectable: !1
						});
						e.add(k);
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
	return { setFixing: T };
}
var Kd = o((() => {})), qd = /* @__PURE__ */ c({ drawLegacyFixings: () => Jd });
async function Jd(e) {
	let t = new Hd(), n = new Vd("sign", {
		name: "safeObject",
		left: 0,
		top: 0,
		width: e.width,
		height: e.height
	});
	t.add(n);
	let { setFixing: r } = Gd({
		fabric: zd(Xd),
		methode: e.method,
		selectedShape: e.shape,
		sizeRatio: e.sizeRatio,
		fixScale: e.fixScale,
		customUrl: e.customUrl,
		fixingCount: e.count,
		run: 1,
		knownTypes: Yd,
		console: {
			log() {},
			info() {},
			warn() {},
			error() {}
		},
		handleConvertImageToDataURI(e, t) {
			let n = (Array.isArray(e) ? e : [e]).filter(Boolean), r = (e) => e >= n.length ? Promise.reject(/* @__PURE__ */ Error("fixation introuvable")) : Xd.load(n[e]).then(() => n[e], () => r(e + 1));
			Xd.track(r(0), t);
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
	r(t), await Xd.idle();
	let i = t.getObjects(), a = i.indexOf(n), o = (e) => e.map(Bd).filter((e) => e !== null);
	return {
		back: o(i.slice(0, a)),
		front: o(i.slice(a + 1))
	};
}
var Yd, Xd, Zd = o((() => {
	Wd(), Kd(), Yd = [
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
	], Xd = new Ud();
})), Qd = /* @__PURE__ */ s(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = n || self).RBush = r();
	})(e, function() {
		function e(e, r, i, a, o) {
			(function e(n, r, i, a, o) {
				for (; a > i;) {
					if (a - i > 600) {
						var s = a - i + 1, c = r - i + 1, l = Math.log(s), u = .5 * Math.exp(2 * l / 3), d = .5 * Math.sqrt(l * u * (s - u) / s) * (c - s / 2 < 0 ? -1 : 1);
						e(n, r, Math.max(i, Math.floor(r - c * u / s + d)), Math.min(a, Math.floor(r + (s - c) * u / s + d)), o);
					}
					var f = n[r], p = i, m = a;
					for (t(n, i, r), o(n[a], f) > 0 && t(n, i, a); p < m;) {
						for (t(n, p, m), p++, m--; o(n[p], f) < 0;) p++;
						for (; o(n[m], f) > 0;) m--;
					}
					o(n[i], f) === 0 ? t(n, i, m) : t(n, ++m, a), m <= r && (i = m + 1), r <= m && (a = m - 1);
				}
			})(e, r, i || 0, a || e.length - 1, o || n);
		}
		function t(e, t, n) {
			var r = e[t];
			e[t] = e[n], e[n] = r;
		}
		function n(e, t) {
			return e < t ? -1 : +(e > t);
		}
		var r = function(e) {
			e === void 0 && (e = 9), this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), this.clear();
		};
		function i(e, t, n) {
			if (!n) return t.indexOf(e);
			for (var r = 0; r < t.length; r++) if (n(e, t[r])) return r;
			return -1;
		}
		function a(e, t) {
			o(e, 0, e.children.length, t, e);
		}
		function o(e, t, n, r, i) {
			i || (i = m(null)), i.minX = 1 / 0, i.minY = 1 / 0, i.maxX = -1 / 0, i.maxY = -1 / 0;
			for (var a = t; a < n; a++) {
				var o = e.children[a];
				s(i, e.leaf ? r(o) : o);
			}
			return i;
		}
		function s(e, t) {
			return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), e.maxY = Math.max(e.maxY, t.maxY), e;
		}
		function c(e, t) {
			return e.minX - t.minX;
		}
		function l(e, t) {
			return e.minY - t.minY;
		}
		function u(e) {
			return (e.maxX - e.minX) * (e.maxY - e.minY);
		}
		function d(e) {
			return e.maxX - e.minX + (e.maxY - e.minY);
		}
		function f(e, t) {
			return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
		}
		function p(e, t) {
			return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
		}
		function m(e) {
			return {
				children: e,
				height: 1,
				leaf: !0,
				minX: 1 / 0,
				minY: 1 / 0,
				maxX: -1 / 0,
				maxY: -1 / 0
			};
		}
		function h(t, n, r, i, a) {
			for (var o = [n, r]; o.length;) if (!((r = o.pop()) - (n = o.pop()) <= i)) {
				var s = n + Math.ceil((r - n) / i / 2) * i;
				e(t, s, n, r, a), o.push(n, s, s, r);
			}
		}
		return r.prototype.all = function() {
			return this._all(this.data, []);
		}, r.prototype.search = function(e) {
			var t = this.data, n = [];
			if (!p(e, t)) return n;
			for (var r = this.toBBox, i = []; t;) {
				for (var a = 0; a < t.children.length; a++) {
					var o = t.children[a], s = t.leaf ? r(o) : o;
					p(e, s) && (t.leaf ? n.push(o) : f(e, s) ? this._all(o, n) : i.push(o));
				}
				t = i.pop();
			}
			return n;
		}, r.prototype.collides = function(e) {
			var t = this.data;
			if (!p(e, t)) return !1;
			for (var n = []; t;) {
				for (var r = 0; r < t.children.length; r++) {
					var i = t.children[r], a = t.leaf ? this.toBBox(i) : i;
					if (p(e, a)) {
						if (t.leaf || f(e, a)) return !0;
						n.push(i);
					}
				}
				t = n.pop();
			}
			return !1;
		}, r.prototype.load = function(e) {
			if (!e || !e.length) return this;
			if (e.length < this._minEntries) {
				for (var t = 0; t < e.length; t++) this.insert(e[t]);
				return this;
			}
			var n = this._build(e.slice(), 0, e.length - 1, 0);
			if (this.data.children.length) {
				if (this.data.height === n.height) this._splitRoot(this.data, n);
				else {
					if (this.data.height < n.height) {
						var r = this.data;
						this.data = n, n = r;
					}
					this._insert(n, this.data.height - n.height - 1, !0);
				}
			} else this.data = n;
			return this;
		}, r.prototype.insert = function(e) {
			return e && this._insert(e, this.data.height - 1), this;
		}, r.prototype.clear = function() {
			return this.data = m([]), this;
		}, r.prototype.remove = function(e, t) {
			if (!e) return this;
			for (var n, r, a, o = this.data, s = this.toBBox(e), c = [], l = []; o || c.length;) {
				if (o || (o = c.pop(), r = c[c.length - 1], n = l.pop(), a = !0), o.leaf) {
					var u = i(e, o.children, t);
					if (u !== -1) return o.children.splice(u, 1), c.push(o), this._condense(c), this;
				}
				a || o.leaf || !f(o, s) ? r ? (n++, o = r.children[n], a = !1) : o = null : (c.push(o), l.push(n), n = 0, r = o, o = o.children[0]);
			}
			return this;
		}, r.prototype.toBBox = function(e) {
			return e;
		}, r.prototype.compareMinX = function(e, t) {
			return e.minX - t.minX;
		}, r.prototype.compareMinY = function(e, t) {
			return e.minY - t.minY;
		}, r.prototype.toJSON = function() {
			return this.data;
		}, r.prototype.fromJSON = function(e) {
			return this.data = e, this;
		}, r.prototype._all = function(e, t) {
			for (var n = []; e;) e.leaf ? t.push.apply(t, e.children) : n.push.apply(n, e.children), e = n.pop();
			return t;
		}, r.prototype._build = function(e, t, n, r) {
			var i, o = n - t + 1, s = this._maxEntries;
			if (o <= s) return a(i = m(e.slice(t, n + 1)), this.toBBox), i;
			r || (r = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / s ** (r - 1))), (i = m([])).leaf = !1, i.height = r;
			var c = Math.ceil(o / s), l = c * Math.ceil(Math.sqrt(s));
			h(e, t, n, l, this.compareMinX);
			for (var u = t; u <= n; u += l) {
				var d = Math.min(u + l - 1, n);
				h(e, u, d, c, this.compareMinY);
				for (var f = u; f <= d; f += c) {
					var p = Math.min(f + c - 1, d);
					i.children.push(this._build(e, f, p, r - 1));
				}
			}
			return a(i, this.toBBox), i;
		}, r.prototype._chooseSubtree = function(e, t, n, r) {
			for (; r.push(t), !t.leaf && r.length - 1 !== n;) {
				for (var i = 1 / 0, a = 1 / 0, o = void 0, s = 0; s < t.children.length; s++) {
					var c = t.children[s], l = u(c), d = (f = e, p = c, (Math.max(p.maxX, f.maxX) - Math.min(p.minX, f.minX)) * (Math.max(p.maxY, f.maxY) - Math.min(p.minY, f.minY)) - l);
					d < a ? (a = d, i = l < i ? l : i, o = c) : d === a && l < i && (i = l, o = c);
				}
				t = o || t.children[0];
			}
			var f, p;
			return t;
		}, r.prototype._insert = function(e, t, n) {
			var r = n ? e : this.toBBox(e), i = [], a = this._chooseSubtree(r, this.data, t, i);
			for (a.children.push(e), s(a, r); t >= 0 && i[t].children.length > this._maxEntries;) this._split(i, t), t--;
			this._adjustParentBBoxes(r, i, t);
		}, r.prototype._split = function(e, t) {
			var n = e[t], r = n.children.length, i = this._minEntries;
			this._chooseSplitAxis(n, i, r);
			var o = this._chooseSplitIndex(n, i, r), s = m(n.children.splice(o, n.children.length - o));
			s.height = n.height, s.leaf = n.leaf, a(n, this.toBBox), a(s, this.toBBox), t ? e[t - 1].children.push(s) : this._splitRoot(n, s);
		}, r.prototype._splitRoot = function(e, t) {
			this.data = m([e, t]), this.data.height = e.height + 1, this.data.leaf = !1, a(this.data, this.toBBox);
		}, r.prototype._chooseSplitIndex = function(e, t, n) {
			for (var r, i, a, s, c, l, d, f = 1 / 0, p = 1 / 0, m = t; m <= n - t; m++) {
				var h = o(e, 0, m, this.toBBox), g = o(e, m, n, this.toBBox), _ = (i = h, a = g, s = void 0, c = void 0, l = void 0, d = void 0, s = Math.max(i.minX, a.minX), c = Math.max(i.minY, a.minY), l = Math.min(i.maxX, a.maxX), d = Math.min(i.maxY, a.maxY), Math.max(0, l - s) * Math.max(0, d - c)), v = u(h) + u(g);
				_ < f ? (f = _, r = m, p = v < p ? v : p) : _ === f && v < p && (p = v, r = m);
			}
			return r || n - t;
		}, r.prototype._chooseSplitAxis = function(e, t, n) {
			var r = e.leaf ? this.compareMinX : c, i = e.leaf ? this.compareMinY : l;
			this._allDistMargin(e, t, n, r) < this._allDistMargin(e, t, n, i) && e.children.sort(r);
		}, r.prototype._allDistMargin = function(e, t, n, r) {
			e.children.sort(r);
			for (var i = this.toBBox, a = o(e, 0, t, i), c = o(e, n - t, n, i), l = d(a) + d(c), u = t; u < n - t; u++) {
				var f = e.children[u];
				s(a, e.leaf ? i(f) : f), l += d(a);
			}
			for (var p = n - t - 1; p >= t; p--) {
				var m = e.children[p];
				s(c, e.leaf ? i(m) : m), l += d(c);
			}
			return l;
		}, r.prototype._adjustParentBBoxes = function(e, t, n) {
			for (var r = n; r >= 0; r--) s(t[r], e);
		}, r.prototype._condense = function(e) {
			for (var t = e.length - 1, n = void 0; t >= 0; t--) e[t].children.length === 0 ? t > 0 ? (n = e[t - 1].children).splice(n.indexOf(e[t]), 1) : this.clear() : a(e[t], this.toBBox);
		}, r;
	});
})), $d = /* @__PURE__ */ c({ default: () => tf });
function ef(e, t) {
	return e < t ? -1 : +(e > t);
}
var tf, nf = o((() => {
	tf = class {
		constructor(e = [], t = ef) {
			if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0) for (let e = (this.length >> 1) - 1; e >= 0; e--) this._down(e);
		}
		push(e) {
			this.data.push(e), this.length++, this._up(this.length - 1);
		}
		pop() {
			if (this.length === 0) return;
			let e = this.data[0], t = this.data.pop();
			return this.length--, this.length > 0 && (this.data[0] = t, this._down(0)), e;
		}
		peek() {
			return this.data[0];
		}
		_up(e) {
			let { data: t, compare: n } = this, r = t[e];
			for (; e > 0;) {
				let i = e - 1 >> 1, a = t[i];
				if (n(r, a) >= 0) break;
				t[e] = a, e = i;
			}
			t[e] = r;
		}
		_down(e) {
			let { data: t, compare: n } = this, r = this.length >> 1, i = t[e];
			for (; e < r;) {
				let r = (e << 1) + 1, a = t[r], o = r + 1;
				if (o < this.length && n(t[o], a) < 0 && (r = o, a = t[o]), n(a, i) >= 0) break;
				t[e] = a, e = r;
			}
			t[e] = i;
		}
	};
})), rf = /* @__PURE__ */ s(((e, t) => {
	t.exports = function(e, t, n, r) {
		var i = e[0], a = e[1], o = !1;
		n === void 0 && (n = 0), r === void 0 && (r = t.length);
		for (var s = (r - n) / 2, c = 0, l = s - 1; c < s; l = c++) {
			var u = t[n + c * 2 + 0], d = t[n + c * 2 + 1], f = t[n + l * 2 + 0], p = t[n + l * 2 + 1];
			d > a != p > a && i < (f - u) * (a - d) / (p - d) + u && (o = !o);
		}
		return o;
	};
})), af = /* @__PURE__ */ s(((e, t) => {
	t.exports = function(e, t, n, r) {
		var i = e[0], a = e[1], o = !1;
		n === void 0 && (n = 0), r === void 0 && (r = t.length);
		for (var s = r - n, c = 0, l = s - 1; c < s; l = c++) {
			var u = t[c + n][0], d = t[c + n][1], f = t[l + n][0], p = t[l + n][1];
			d > a != p > a && i < (f - u) * (a - d) / (p - d) + u && (o = !o);
		}
		return o;
	};
})), of = /* @__PURE__ */ s(((e, t) => {
	var n = rf(), r = af();
	t.exports = function(e, t, i, a) {
		return t.length > 0 && Array.isArray(t[0]) ? r(e, t, i, a) : n(e, t, i, a);
	}, t.exports.nested = r, t.exports.flat = n;
})), sf = /* @__PURE__ */ s(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : r((n = n || self).predicates = {});
	})(e, function(e) {
		let t = 134217729;
		function n(e, t, n, r, i) {
			let a, o, s, c, l = t[0], u = r[0], d = 0, f = 0;
			u > l == u > -l ? (a = l, l = t[++d]) : (a = u, u = r[++f]);
			let p = 0;
			if (d < e && f < n) for (u > l == u > -l ? (s = a - ((o = l + a) - l), l = t[++d]) : (s = a - ((o = u + a) - u), u = r[++f]), a = o, s !== 0 && (i[p++] = s); d < e && f < n;) u > l == u > -l ? (s = a - ((o = a + l) - (c = o - a)) + (l - c), l = t[++d]) : (s = a - ((o = a + u) - (c = o - a)) + (u - c), u = r[++f]), a = o, s !== 0 && (i[p++] = s);
			for (; d < e;) s = a - ((o = a + l) - (c = o - a)) + (l - c), l = t[++d], a = o, s !== 0 && (i[p++] = s);
			for (; f < n;) s = a - ((o = a + u) - (c = o - a)) + (u - c), u = r[++f], a = o, s !== 0 && (i[p++] = s);
			return a === 0 && p !== 0 || (i[p++] = a), p;
		}
		function r(e) {
			return new Float64Array(e);
		}
		let i = r(4), a = r(8), o = r(12), s = r(16), c = r(4);
		e.orient2d = function(e, r, l, u, d, f) {
			let p = (r - f) * (l - d), m = (e - d) * (u - f), h = p - m;
			if (p === 0 || m === 0 || p > 0 != m > 0) return h;
			let g = Math.abs(p + m);
			return Math.abs(h) >= 33306690738754716e-32 * g ? h : -function(e, r, l, u, d, f, p) {
				let m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M = e - d, N = l - d, P = r - f, F = u - f;
				v = (O = (x = M - (b = (y = t * M) - (y - M))) * (C = F - (S = (y = t * F) - (y - F))) - ((D = M * F) - b * S - x * S - b * C)) - (w = O - (A = (x = P - (b = (y = t * P) - (y - P))) * (C = N - (S = (y = t * N) - (y - N))) - ((k = P * N) - b * S - x * S - b * C))), i[0] = O - (w + v) + (v - A), v = (E = D - ((T = D + w) - (v = T - D)) + (w - v)) - (w = E - k), i[1] = E - (w + v) + (v - k), v = (j = T + w) - T, i[2] = T - (j - v) + (w - v), i[3] = j;
				let I = function(e, t) {
					let n = t[0];
					for (let r = 1; r < e; r++) n += t[r];
					return n;
				}(4, i), ee = 22204460492503146e-32 * p;
				if (I >= ee || -I >= ee || (m = e - (M + (v = e - M)) + (v - d), g = l - (N + (v = l - N)) + (v - d), h = r - (P + (v = r - P)) + (v - f), _ = u - (F + (v = u - F)) + (v - f), m === 0 && h === 0 && g === 0 && _ === 0) || (ee = 11093356479670487e-47 * p + 33306690738754706e-32 * Math.abs(I), (I += M * _ + F * m - (P * g + N * h)) >= ee || -I >= ee)) return I;
				v = (O = (x = m - (b = (y = t * m) - (y - m))) * (C = F - (S = (y = t * F) - (y - F))) - ((D = m * F) - b * S - x * S - b * C)) - (w = O - (A = (x = h - (b = (y = t * h) - (y - h))) * (C = N - (S = (y = t * N) - (y - N))) - ((k = h * N) - b * S - x * S - b * C))), c[0] = O - (w + v) + (v - A), v = (E = D - ((T = D + w) - (v = T - D)) + (w - v)) - (w = E - k), c[1] = E - (w + v) + (v - k), v = (j = T + w) - T, c[2] = T - (j - v) + (w - v), c[3] = j;
				let te = n(4, i, 4, c, a);
				v = (O = (x = M - (b = (y = t * M) - (y - M))) * (C = _ - (S = (y = t * _) - (y - _))) - ((D = M * _) - b * S - x * S - b * C)) - (w = O - (A = (x = P - (b = (y = t * P) - (y - P))) * (C = g - (S = (y = t * g) - (y - g))) - ((k = P * g) - b * S - x * S - b * C))), c[0] = O - (w + v) + (v - A), v = (E = D - ((T = D + w) - (v = T - D)) + (w - v)) - (w = E - k), c[1] = E - (w + v) + (v - k), v = (j = T + w) - T, c[2] = T - (j - v) + (w - v), c[3] = j;
				let ne = n(te, a, 4, c, o);
				v = (O = (x = m - (b = (y = t * m) - (y - m))) * (C = _ - (S = (y = t * _) - (y - _))) - ((D = m * _) - b * S - x * S - b * C)) - (w = O - (A = (x = h - (b = (y = t * h) - (y - h))) * (C = g - (S = (y = t * g) - (y - g))) - ((k = h * g) - b * S - x * S - b * C))), c[0] = O - (w + v) + (v - A), v = (E = D - ((T = D + w) - (v = T - D)) + (w - v)) - (w = E - k), c[1] = E - (w + v) + (v - k), v = (j = T + w) - T, c[2] = T - (j - v) + (w - v), c[3] = j;
				let re = n(ne, o, 4, c, s);
				return s[re - 1];
			}(e, r, l, u, d, f, g);
		}, e.orient2dfast = function(e, t, n, r, i, a) {
			return (t - a) * (n - i) - (e - i) * (r - a);
		}, Object.defineProperty(e, "__esModule", { value: !0 });
	});
})), cf = /* @__PURE__ */ s(((e, t) => {
	var n = Qd(), r = (nf(), d($d)), i = of(), a = sf().orient2d;
	r.default && (r = r.default), t.exports = o, t.exports.default = o;
	function o(e, t, r) {
		t = Math.max(0, t === void 0 ? 2 : t), r = r || 0;
		var i = g(e), a = new n(16);
		a.toBBox = function(e) {
			return {
				minX: e[0],
				minY: e[1],
				maxX: e[0],
				maxY: e[1]
			};
		}, a.compareMinX = function(e, t) {
			return e[0] - t[0];
		}, a.compareMinY = function(e, t) {
			return e[1] - t[1];
		}, a.load(e);
		for (var o = [], c = 0, l; c < i.length; c++) {
			var u = i[c];
			a.remove(u), l = _(u, l), o.push(l);
		}
		var d = new n(16);
		for (c = 0; c < o.length; c++) d.insert(h(o[c]));
		for (var f = t * t, p = r * r; o.length;) {
			var m = o.shift(), y = m.p, b = m.next.p, x = v(y, b);
			if (!(x < p)) {
				var S = x / f;
				u = s(a, m.prev.p, y, b, m.next.next.p, S, d), u && Math.min(v(u, y), v(u, b)) <= S && (o.push(m), o.push(_(u, m)), a.remove(u), d.remove(m), d.insert(h(m)), d.insert(h(m.next)));
			}
		}
		m = l;
		var C = [];
		do
			C.push(m.p), m = m.next;
		while (m !== l);
		return C.push(m.p), C;
	}
	function s(e, t, n, i, a, o, s) {
		for (var u = new r([], c), d = e.data; d;) {
			for (var p = 0; p < d.children.length; p++) {
				var m = d.children[p], h = d.leaf ? y(m, n, i) : l(n, i, m);
				h > o || u.push({
					node: m,
					dist: h
				});
			}
			for (; u.length && !u.peek().node.children;) {
				var g = u.pop(), _ = g.node, v = y(_, t, n), b = y(_, i, a);
				if (g.dist < v && g.dist < b && f(n, _, s) && f(i, _, s)) return _;
			}
			d = u.pop(), d && (d = d.node);
		}
		return null;
	}
	function c(e, t) {
		return e.dist - t.dist;
	}
	function l(e, t, n) {
		if (u(e, n) || u(t, n)) return 0;
		var r = b(e[0], e[1], t[0], t[1], n.minX, n.minY, n.maxX, n.minY);
		if (r === 0) return 0;
		var i = b(e[0], e[1], t[0], t[1], n.minX, n.minY, n.minX, n.maxY);
		if (i === 0) return 0;
		var a = b(e[0], e[1], t[0], t[1], n.maxX, n.minY, n.maxX, n.maxY);
		if (a === 0) return 0;
		var o = b(e[0], e[1], t[0], t[1], n.minX, n.maxY, n.maxX, n.maxY);
		return o === 0 ? 0 : Math.min(r, i, a, o);
	}
	function u(e, t) {
		return e[0] >= t.minX && e[0] <= t.maxX && e[1] >= t.minY && e[1] <= t.maxY;
	}
	function f(e, t, n) {
		for (var r = Math.min(e[0], t[0]), i = Math.min(e[1], t[1]), a = Math.max(e[0], t[0]), o = Math.max(e[1], t[1]), s = n.search({
			minX: r,
			minY: i,
			maxX: a,
			maxY: o
		}), c = 0; c < s.length; c++) if (m(s[c].p, s[c].next.p, e, t)) return !1;
		return !0;
	}
	function p(e, t, n) {
		return a(e[0], e[1], t[0], t[1], n[0], n[1]);
	}
	function m(e, t, n, r) {
		return e !== r && t !== n && p(e, t, n) > 0 != p(e, t, r) > 0 && p(n, r, e) > 0 != p(n, r, t) > 0;
	}
	function h(e) {
		var t = e.p, n = e.next.p;
		return e.minX = Math.min(t[0], n[0]), e.minY = Math.min(t[1], n[1]), e.maxX = Math.max(t[0], n[0]), e.maxY = Math.max(t[1], n[1]), e;
	}
	function g(e) {
		for (var t = e[0], n = e[0], r = e[0], a = e[0], o = 0; o < e.length; o++) {
			var s = e[o];
			s[0] < t[0] && (t = s), s[0] > r[0] && (r = s), s[1] < n[1] && (n = s), s[1] > a[1] && (a = s);
		}
		var c = [
			t,
			n,
			r,
			a
		], l = c.slice();
		for (o = 0; o < e.length; o++) i(e[o], c) || l.push(e[o]);
		return S(l);
	}
	function _(e, t) {
		var n = {
			p: e,
			prev: null,
			next: null,
			minX: 0,
			minY: 0,
			maxX: 0,
			maxY: 0
		};
		return t ? (n.next = t.next, n.prev = t, t.next.prev = n, t.next = n) : (n.prev = n, n.next = n), n;
	}
	function v(e, t) {
		var n = e[0] - t[0], r = e[1] - t[1];
		return n * n + r * r;
	}
	function y(e, t, n) {
		var r = t[0], i = t[1], a = n[0] - r, o = n[1] - i;
		if (a !== 0 || o !== 0) {
			var s = ((e[0] - r) * a + (e[1] - i) * o) / (a * a + o * o);
			s > 1 ? (r = n[0], i = n[1]) : s > 0 && (r += a * s, i += o * s);
		}
		return a = e[0] - r, o = e[1] - i, a * a + o * o;
	}
	function b(e, t, n, r, i, a, o, s) {
		var c = n - e, l = r - t, u = o - i, d = s - a, f = e - i, p = t - a, m = c * c + l * l, h = c * u + l * d, g = u * u + d * d, _ = c * f + l * p, v = u * f + d * p, y = m * g - h * h, b, x, S, C, w = y, T = y;
		y === 0 ? (x = 0, w = 1, C = v, T = g) : (x = h * v - g * _, C = m * v - h * _, x < 0 ? (x = 0, C = v, T = g) : x > w && (x = w, C = v + h, T = g)), C < 0 ? (C = 0, -_ < 0 ? x = 0 : -_ > m ? x = w : (x = -_, w = m)) : C > T && (C = T, -_ + h < 0 ? x = 0 : -_ + h > m ? x = w : (x = -_ + h, w = m)), b = x === 0 ? 0 : x / w, S = C === 0 ? 0 : C / T;
		var E = (1 - b) * e + b * n, D = (1 - b) * t + b * r, O = (1 - S) * i + S * o, k = (1 - S) * a + S * s, A = O - E, j = k - D;
		return A * A + j * j;
	}
	function x(e, t) {
		return e[0] === t[0] ? e[1] - t[1] : e[0] - t[0];
	}
	function S(e) {
		e.sort(x);
		for (var t = [], n = 0; n < e.length; n++) {
			for (; t.length >= 2 && p(t[t.length - 2], t[t.length - 1], e[n]) <= 0;) t.pop();
			t.push(e[n]);
		}
		for (var r = [], i = e.length - 1; i >= 0; i--) {
			for (; r.length >= 2 && p(r[r.length - 2], r[r.length - 1], e[i]) <= 0;) r.pop();
			r.push(e[i]);
		}
		return r.pop(), t.pop(), t.concat(r);
	}
})), lf = /* @__PURE__ */ c({ computeContour: () => uf });
function uf(e, t, n) {
	let r = e.getContext("2d", { willReadFrequently: !0 });
	if (!r || !e.width || !e.height) return null;
	let { data: i, width: a, height: o } = r.getImageData(0, 0, e.width, e.height), s = [];
	for (let e = 0; e < o; e += ff) for (let t = 0; t < a; t += ff) i[(e * a + t) * 4 + 3] > 10 && s.push([t, e]);
	if (s.length < 3) return null;
	let c = (0, df.default)(s, 1), l = Math.ceil(t / 2) + 2, u = document.createElement("canvas");
	u.width = a + l * 2, u.height = o + l * 2;
	let d = u.getContext("2d");
	if (!d) return null;
	d.translate(l, l), d.fillStyle = n, d.strokeStyle = n, d.lineJoin = "round", d.lineCap = "round", d.lineWidth = Math.max(1, t), d.beginPath(), c.forEach(([e, t], n) => n ? d.lineTo(e, t) : d.moveTo(e, t)), d.closePath(), d.fill(), d.stroke();
	let f = c.map((e) => e[0]), p = c.map((e) => e[1]), m = Math.max(1, t) / 2, h = Math.min(...f) - m, g = Math.min(...p) - m;
	return {
		canvas: u,
		x: -l,
		y: -l,
		bounds: {
			x: h,
			y: g,
			width: Math.max(...f) + m - h,
			height: Math.max(...p) + m - g
		},
		hull: c
	};
}
var df, ff, pf = o((() => {
	df = /* @__PURE__ */ u(cf(), 1), ff = 2;
}));
ku(), Vt();
var mf = {
	top: 24,
	right: 64,
	bottom: 112,
	left: 24
}, hf = class {
	constructor(e, t) {
		R(this, "container", void 0), R(this, "cb", void 0), R(this, "stage", void 0), R(this, "signLayer", new Z.Layer({ listening: !1 })), R(this, "refLayer", new Z.Layer({ listening: !1 })), R(this, "dimLayer", new Z.Layer({ listening: !1 })), R(this, "objectLayer", new Z.Layer()), R(this, "world", new Z.Group()), R(this, "objectsGroup", new Z.Group()), R(this, "transformer", new Z.Transformer({
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
		})), R(this, "model", null), R(this, "frame", null), R(this, "signKey", ""), R(this, "signToken", 0), R(this, "bounds", {
			x: 0,
			y: 0,
			width: 1,
			height: 1
		}), R(this, "nodes", /* @__PURE__ */ new Map()), R(this, "cut", null), R(this, "contourGroup", new Z.Group()), R(this, "contourFrame", 0), R(this, "images", /* @__PURE__ */ new Map()), R(this, "dragging", !1), R(this, "ro", void 0), R(this, "pad", mf), R(this, "building", !1), R(this, "signBounds", {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		}), R(this, "printParts", []), R(this, "cutlineBox", null), R(this, "contourImage", null), R(this, "contourPath", null), this.container = e, this.cb = t, this.stage = new Z.Stage({
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
			let t = e.cutline, i = this.contourPath, a = (e, t) => `<path d="${i.d}" fill="${n(e)}" stroke="${n(e)}" stroke-width="${r(t)}" stroke-linejoin="round"/>`;
			t && t.mode === "2x" && (s.push(a(t.second.borderColor, i.stroke + t.first.size + t.second.size + t.second.borderSize)), s.push(a(t.second.color, i.stroke + t.first.size + t.second.size))), t && t.mode !== "none" && s.push(a(t.first.color, i.stroke + t.first.size)), s.push(a(e.fill, i.stroke));
		}
		let d = Ju(e.shape), f = "";
		if (d !== "cut-to-shape" && !(d === "custom" && e.shapeSvgUrl)) {
			let e = l("clip");
			o.push(`<clipPath id="${e}"><path d="${Zu(d, t.width, t.height)}"/></clipPath>`), f = ` clip-path="url(#${e})"`;
		}
		let p = [], m = [...this.nodes.entries()].sort((e, t) => e[1].node.zIndex() - t[1].node.zIndex());
		for (let [t, { node: i, key: a }] of m) {
			let s = e.objects.find((e) => e.id === t);
			if (!s || !i.visible()) continue;
			let c = `translate(${r(i.x())} ${r(i.y())}) rotate(${r(i.rotation())}) scale(${r(i.scaleX())} ${r(i.scaleY())}) translate(${r(-i.offsetX())} ${r(-i.offsetY())})`;
			if (i instanceof Z.TextPath) {
				let e = l("tp");
				o.push(`<path id="${e}" d="${i.data()}"/>`);
				let t = i.strokeWidth(), a = i.stroke();
				p.push(`<text transform="${c}"${i.opacity() < 1 ? ` opacity="${r(i.opacity())}"` : ""} font-family="${n(i.fontFamily())}" font-size="${r(i.fontSize())}" font-style="${/italic/.test(i.fontStyle()) ? "italic" : "normal"}" font-weight="${/bold/.test(i.fontStyle()) ? "bold" : "normal"}" fill="${n(String(i.fill()))}"${a && t > 0 ? ` stroke="${n(a)}" stroke-width="${r(t)}" stroke-linejoin="round" paint-order="stroke"` : ""}><textPath href="#${e}" startOffset="50%" text-anchor="middle">${n(i.text())}</textPath></text>`);
			} else if (i instanceof Z.Text) {
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
			} else if (i instanceof Z.Image) {
				let e = i.image();
				if (!e?.naturalWidth) continue;
				p.push(`<image transform="${c}" width="${r(i.width())}" height="${r(i.height())}" preserveAspectRatio="none" href="${n(this.filteredSource(i, e))}"/>`);
			} else a.startsWith("qr|") && s.type === "qr" && p.push(`<g transform="${c}"><rect width="100" height="100" fill="#ffffff"/><path d="${Pd(s.value, 100)}" fill="${n(s.color)}"/></g>`);
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
		this.model = e, this.frame = qu(e.width, e.height, e.unit);
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
		t !== this.signKey && (this.signKey = t, this.buildSign(e, this.frame)), this.syncObjects(e, this.frame), this.scheduleContour(), this.fit();
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
		let n = Rn(e.width, e.unit) / 10, r = Rn(e.height, e.unit) / 10, i = Lu(e.reference, n), a = Ru(i, n, r), o = this.stage.width(), s = this.stage.height() - 56 - 86, c = Math.max(.01, Math.min(Iu * o / a.w, Iu * s / a.h) * e.zoom), l = o / 2 - a.w / 2 * c, u = 56 + s / 2 + a.h / 2 * c, d = c * n / t.width, f = l + a.signCx * c - t.width / 2 * d, p = u - a.signBottom * c - t.height * d;
		for (let e of [this.world, this.objectsGroup]) e.setAttrs({
			x: f,
			y: p,
			scaleX: d,
			scaleY: d
		});
		this.transformer.nodes([]), this.objectLayer.listening(!1), this.dimLayer.destroyChildren(), this.dimLayer.batchDraw();
		let m = e.colors.dim;
		this.refLayer.destroyChildren(), this.refLayer.add(new Z.Shape({
			listening: !1,
			sceneFunc: (e) => {
				let t = e._context;
				t.save(), t.globalAlpha = .28, Wu(t, i, l, a.refX, u, c, m), t.restore(), Gu(t, l, l + a.w * c, u, c, m);
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
		}, a = t.x + i.x * t.s, o = t.y + i.y * t.s, s = i.width * t.s, c = i.height * t.s, l = this.cut ?? this.cutlineBox, u = l ? l.width / r.pxPerUnit : e.width, d = l ? l.height / r.pxPerUnit : e.height, f = Math.max(a + s, t.x + (this.bounds.x + this.bounds.width) * t.s), p = Math.max(o + c, t.y + (this.bounds.y + this.bounds.height) * t.s), m = e.colors.dim, h = (t) => `${Vn(Bn(t, e.unit, e.displayUnit), e.displayUnit, e.decimals, e.locale)} ${e.displayUnit}`, g = (e, t, r, i = !1) => {
			let a = new Z.Text({
				text: e,
				fontSize: 12,
				fontStyle: "bold",
				fill: "#ffffff",
				padding: 4
			}), o = new Z.Rect({
				width: a.width(),
				height: a.height(),
				cornerRadius: 4,
				fill: m
			}), s = new Z.Group({
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
			if (n.add(new Z.Arrow({
				points: [
					a,
					t,
					a + s,
					t
				],
				..._
			})), n.add(new Z.Line({
				points: [
					a,
					o + c + 4,
					a,
					t + 4
				],
				...v
			})), n.add(new Z.Line({
				points: [
					a + s,
					o + c + 4,
					a + s,
					t + 4
				],
				...v
			})), g(h(u), a + s / 2, t), e.thicknessLabel) {
				let r = new Z.Text({
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
			n.add(new Z.Arrow({
				points: [
					e,
					o,
					e,
					o + c
				],
				..._
			})), n.add(new Z.Line({
				points: [
					a + s + 4,
					o,
					e + 4,
					o
				],
				...v
			})), n.add(new Z.Line({
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
		let { width: r, height: i } = t, a = Ju(e.shape), o = e.light ? {
			...$u,
			shadowColor: e.light
		} : null, s = e.border && e.border.kind !== "none" && a !== "cut-to-shape" && Qn(e.border.kind, a) ? e.border : null, c = new Z.Group(), l = [], u = e.fixing, d = u && u.kind !== "none" && a !== "cut-to-shape" ? Promise.resolve().then(() => (Zd(), qd)).then(({ drawLegacyFixings: n }) => n({
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
			let e = p ? await rd(p, s.color) : null, t = e ? await this.image(e) : null;
			if (t && e) c.add(new Z.Image({
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
				let e = Qu(a === "custom" ? "square" : a, r, i, 10);
				c.add(new Z.Path({
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
		let m = a === "cut-to-shape", h, g = p ? await rd(p, e.fill) : null, _ = g ? await this.image(g) : null;
		if (_) h = new Z.Image({
			image: _,
			width: r,
			height: i
		});
		else {
			h = new Z.Path({
				data: Zu(a, r, i),
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
					data: Zu(a, r, i),
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
			let e = f && s ? Qu(a === "custom" ? "square" : a, r, i, 10) : {
				data: Zu(a, r, i),
				x: 0,
				y: 0
			};
			c.getChildren().filter((e) => e instanceof Z.Path).find((t) => t.data() === e.data)?.setAttrs({
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
				}, s = new Z.Path({
					...a,
					fill: v.second.color,
					stroke: v.second.color,
					strokeWidth: t
				}), u = new Z.Path({
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
			let t = ed(s.kind, r, i), n = t ? `${e.assets.borders.replace(/\/+$/, "")}/${t}` : null, a = n ? await nd(n, s.color, s.kind === "old-world" ? "fill" : "stroke") : null, o = a ? await this.image(a) : null;
			if (o) {
				let e = s.kind === "rounded-corners" ? {
					x: .009,
					y: t?.endsWith("longH.svg") ? .005 : t?.endsWith("mediumH.svg") ? .008 : .01
				} : {
					x: 0,
					y: 0
				};
				c.add(new Z.Image({
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
			let t = await nd(e.assets.resolve(s.svgUrl), s.color, "both"), n = t ? await this.image(t) : null;
			n && (c.add(new Z.Image({
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
		let b = new Z.Group({ name: "sc-fixings" }), x = new Z.Group({ name: "sc-fixings" });
		b.add(...y.back), x.add(...y.front), c.add(x), c.add(b), b.moveToBottom(), this.printParts = l, this.contourGroup.remove(), this.world.destroyChildren(), this.world.add(c), m && (this.world.add(this.contourGroup), this.contourGroup.moveToBottom()), this.signBounds = c.getClientRect({
			skipShadow: !0,
			relativeTo: this.world
		}), this.updateBounds();
		let S = _ || m ? null : new Path2D(Zu(a, r, i));
		this.objectsGroup.clipFunc(S ? () => [S] : void 0), m ? this.scheduleContour() : this.cut = null, this.fit();
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
		e && Ju(e.shape) === "cut-to-shape" && (cancelAnimationFrame(this.contourFrame), this.contourFrame = requestAnimationFrame(() => void this.drawContour()));
	}
	async drawContour() {
		let e = this.model;
		if (!e || Ju(e.shape) !== "cut-to-shape") return;
		this.contourGroup.destroyChildren();
		let t = this.objectsGroup.scaleX() || 1, n = this.objectsGroup.getChildren();
		if (!n.length || this.dragging) {
			n.length || (this.cut = null);
			return;
		}
		let r = this.transformer.nodes();
		this.transformer.nodes([]);
		let i = this.objectsGroup.getClientRect({
			skipShadow: !0,
			skipStroke: !1
		}), a = this.objectsGroup.toCanvas({
			x: i.x,
			y: i.y,
			width: i.width,
			height: i.height,
			pixelRatio: 1 / t
		});
		this.transformer.nodes(r);
		let { computeContour: o } = await Promise.resolve().then(() => (pf(), lf)), s = o(a, e.outline, e.fill);
		if (!s) {
			this.cut = null;
			return;
		}
		let c = (i.x - this.objectsGroup.x()) / t, l = (i.y - this.objectsGroup.y()) / t, u = e.light ? {
			...$u,
			shadowColor: e.light
		} : {};
		this.contourGroup.add(new Z.Image({
			image: s.canvas,
			x: c + s.x,
			y: l + s.y,
			listening: !1,
			...u
		})), this.contourImage = {
			href: s.canvas.toDataURL("image/png"),
			x: c + s.x,
			y: l + s.y,
			width: s.canvas.width,
			height: s.canvas.height
		};
		let d = s.hull.map(([e, t]) => [e + c, t + l]);
		this.contourPath = {
			d: `M${d.map(([e, t]) => `${e.toFixed(2)} ${t.toFixed(2)}`).join(" L")} Z`,
			stroke: Math.max(1, e.outline)
		};
		let f = e.cutline;
		if (f && f.mode !== "none") {
			let t = d.flat(), n = (e, n) => new Z.Line({
				points: t,
				closed: !0,
				fill: e,
				stroke: e,
				strokeWidth: n,
				lineJoin: "round",
				listening: !1
			}), r = Math.max(1, e.outline), i = [n(f.first.color, r + f.first.size)];
			f.mode === "2x" && i.unshift(n(f.second.color, r + f.first.size + f.second.size), n(f.second.borderColor, r + f.first.size + f.second.size + f.second.borderSize)), i.forEach((e) => {
				this.contourGroup.add(e), e.moveToBottom();
			});
			let a = (i[0].strokeWidth() - r) / 2;
			this.cut = {
				x: c + s.bounds.x - a,
				y: l + s.bounds.y - a,
				width: s.bounds.width + a * 2,
				height: s.bounds.height + a * 2
			}, this.updateBounds(), this.fit();
		} else this.cut = {
			x: c + s.bounds.x,
			y: l + s.bounds.y,
			width: s.bounds.width,
			height: s.bounds.height
		}, this.updateBounds(), this.fit();
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
		if (e.type === "text" && e.curve && (t.textType ?? "normal") === "normal") return new Z.TextPath({ data: "M0 0" });
		if (e.type === "text") {
			let e = new Z.Text({ lineHeight: 1.1 });
			return e.sceneFunc((e, t) => {
				let n = t, r = () => Z.Text.prototype._sceneFunc.call(n, e), i = n.getAttr("sc-fx"), a = n.getAbsoluteScale().x * (e.canvas?.getPixelRatio?.() ?? 1), o = e._context, s = n.attrs, c = {
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
			let n = new Z.Image({ image: void 0 }), r = t.assets.resolve(e.src), i = /\.svg(\?|#|$)/i.test(r) || r.startsWith("data:image/svg");
			return (e.tint && i ? nd(r, e.tint, "both") : Promise.resolve(r)).then((e) => e ? this.image(e) : null).then((e) => {
				e && (n.image(e), this.model && this.syncObjects(this.model, this.frame));
			}), n;
		}
		let n = e;
		return Nd(n.value, 100, n.color);
	}
	styleNode(e, t, n, r, i) {
		if (t.type === "text" && (e instanceof Z.Text || e instanceof Z.TextPath)) {
			let a = qr(n.textType ?? "normal", t), o = a.type === "normal", s = {
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
			if (e instanceof Z.TextPath) {
				let n = new Z.Text(s), r = n.width();
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
				"sc-fx": gf(a, s.fontSize)
			});
			let c = i.width * .92;
			e.width() > c && e.fontSize(e.fontSize() * (c / e.width()));
		} else if (t.type === "image" && e instanceof Z.Image) {
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
			let o = (t.filters ?? []).map((e) => Ld[e]).filter(Boolean);
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
function gf(e, t) {
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
var _f = 0;
Array.isArray;
function Q(e, t, n, r, i, a) {
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
		__v: --_f,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return p.vnode && p.vnode(l), l;
}
//#endregion
//#region src/ui/components/Icon.tsx
var vf = {
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
function $({ name: e, size: t = 20, label: n, ...r }) {
	return /* @__PURE__ */ Q("svg", {
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
		children: /* @__PURE__ */ Q("path", { d: vf[e] ?? vf.more })
	});
}
function yf({ id: e, url: t, size: n = 22 }) {
	return t ? /* @__PURE__ */ Q("img", {
		src: t,
		width: n,
		height: n,
		alt: "",
		class: "sc-section-img"
	}) : /* @__PURE__ */ Q($, {
		name: e,
		size: n
	});
}
//#endregion
//#region src/ui/components/primitives.tsx
function bf({ icon: e, label: t, pressed: n, disabled: r, onClick: i, class: a = "", ...o }) {
	return /* @__PURE__ */ Q("button", {
		type: "button",
		class: `sc-iconbtn ${a}`,
		"aria-label": t,
		title: t,
		"aria-pressed": n === void 0 ? void 0 : n,
		disabled: r,
		onClick: i,
		...o,
		children: /* @__PURE__ */ Q($, { name: e })
	});
}
function xf(e, t, n, r, i) {
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
function Sf({ image: e, visual: t }) {
	let [n, r] = L(!1);
	return e && !n ? /* @__PURE__ */ Q("img", {
		src: e,
		alt: "",
		loading: "lazy",
		onError: () => r(!0)
	}) : t ? /* @__PURE__ */ Q(I, { children: t }) : null;
}
function Cf({ url: e, label: t, caption: n, onClose: r }) {
	return /* @__PURE__ */ Q("div", {
		class: "sc-lightbox",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": n ? `${t} — ${n}` : t,
		onClick: r,
		onKeyDown: (e) => e.key === "Escape" && r(),
		children: [/* @__PURE__ */ Q("figure", {
			class: "sc-lightbox__figure",
			children: [/* @__PURE__ */ Q("img", {
				src: e,
				alt: n ?? ""
			}), n && /* @__PURE__ */ Q("figcaption", {
				class: "sc-lightbox__caption",
				children: n
			})]
		}), /* @__PURE__ */ Q("button", {
			type: "button",
			class: "sc-lightbox__close",
			autoFocus: !0,
			onClick: r,
			children: [/* @__PURE__ */ Q($, {
				name: "close",
				size: 18
			}), /* @__PURE__ */ Q("span", {
				class: "sc-visually-hidden",
				children: t
			})]
		})]
	});
}
function wf({ label: e, items: t, value: n, onChange: r, columns: i = 2, exampleLabel: a = "Exemple" }) {
	let o = ze(null), [s, c] = L(null), l = (e, t) => /* @__PURE__ */ Q("button", {
		type: "button",
		class: t,
		"aria-label": `${a} — ${e.label}`,
		onClick: (t) => {
			t.stopPropagation(), c(e);
		},
		children: [/* @__PURE__ */ Q($, {
			name: "eye",
			size: 14
		}), /* @__PURE__ */ Q("span", { children: a })]
	});
	return /* @__PURE__ */ Q("div", {
		ref: o,
		class: `sc-cards sc-cards--${i}`,
		role: "radiogroup",
		"aria-label": e,
		onKeyDown: (e) => xf(e, t.map((e) => e.id), n, r, o.current),
		children: [t.map((e) => {
			let i = e.id === n;
			return /* @__PURE__ */ Q("div", {
				class: "sc-card",
				role: "radio",
				"aria-checked": i,
				tabIndex: i || !n && e === t[0] ? 0 : -1,
				onClick: () => r(e.id),
				children: [
					(e.visual || e.image) && /* @__PURE__ */ Q("div", {
						class: "sc-card__media",
						children: /* @__PURE__ */ Q(Sf, {
							image: e.image,
							visual: e.visual
						})
					}),
					/* @__PURE__ */ Q("div", {
						class: "sc-card__body",
						children: [
							/* @__PURE__ */ Q("span", {
								class: "sc-card__label",
								children: e.label
							}),
							e.description && /* @__PURE__ */ Q("span", {
								class: "sc-card__desc",
								children: e.description
							}),
							e.popupImage && l(e, "sc-card__example")
						]
					}),
					e.price && /* @__PURE__ */ Q("span", {
						class: "sc-card__price",
						children: e.price
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-card__check",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q($, {
							name: "check",
							size: 14
						})
					})
				]
			}, e.id);
		}), s?.popupImage && /* @__PURE__ */ Q(Cf, {
			url: s.popupImage,
			label: a,
			caption: s.label,
			onClose: () => c(null)
		})]
	});
}
function Tf({ label: e, items: t, value: n, onChange: r }) {
	let i = ze(null), a = t.find((e) => e.id === n);
	return /* @__PURE__ */ Q("div", {
		class: "sc-swatches-wrap",
		children: [/* @__PURE__ */ Q("div", {
			ref: i,
			class: "sc-swatches",
			role: "radiogroup",
			"aria-label": e,
			onKeyDown: (e) => xf(e, t.map((e) => e.id), n, r, i.current),
			children: t.map((e) => {
				let i = e.id === n;
				return /* @__PURE__ */ Q("div", {
					class: "sc-swatch",
					role: "radio",
					"aria-checked": i,
					"aria-label": e.price ? `${e.label}, ${e.price}` : e.label,
					title: e.label,
					tabIndex: i || !n && e === t[0] ? 0 : -1,
					onClick: () => r(e.id),
					style: {
						"--sw": e.hex,
						backgroundImage: e.image ? `url("${e.image}")` : void 0
					},
					children: /* @__PURE__ */ Q("span", {
						class: "sc-swatch__check",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q($, {
							name: "check",
							size: 14
						})
					})
				}, e.id);
			})
		}), a && /* @__PURE__ */ Q("p", {
			class: "sc-swatches__name",
			children: [a.label, a.price && /* @__PURE__ */ Q("span", {
				class: "sc-muted",
				children: [" · ", a.price]
			})]
		})]
	});
}
function Ef({ label: e, options: t, value: n, onChange: r, size: i = "md", withText: a = !1 }) {
	let o = ze(null);
	return /* @__PURE__ */ Q("div", {
		ref: o,
		class: `sc-seg sc-seg--${i}`,
		role: "radiogroup",
		"aria-label": e,
		onKeyDown: (e) => xf(e, t.map((e) => e.value), n, (e) => r(e), o.current),
		children: t.map((e) => /* @__PURE__ */ Q("div", {
			role: "radio",
			class: "sc-seg__opt",
			"aria-checked": e.value === n,
			tabIndex: e.value === n ? 0 : -1,
			onClick: () => r(e.value),
			title: e.icon ? e.label : void 0,
			"aria-label": e.icon ? e.label : void 0,
			children: e.icon && a ? /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q($, {
				name: e.icon,
				size: 16,
				class: "sc-seg__icon"
			}), /* @__PURE__ */ Q("span", {
				class: "sc-seg__text",
				children: e.label
			})] }) : e.icon ? /* @__PURE__ */ Q($, {
				name: e.icon,
				size: 18
			}) : e.label
		}, e.value))
	});
}
function Df({ label: e, value: t, min: n = 1, max: r, onChange: i, decLabel: a, incLabel: o }) {
	let s = He(), c = (e) => Math.max(n, r ? Math.min(r, e) : e);
	return /* @__PURE__ */ Q("div", {
		class: "sc-stepper",
		children: [
			/* @__PURE__ */ Q("label", {
				for: s,
				class: "sc-visually-hidden",
				children: e
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-stepper__btn",
				"aria-label": a,
				disabled: t <= n,
				onClick: () => i(c(t - 1)),
				children: /* @__PURE__ */ Q($, {
					name: "minus",
					size: 16
				})
			}),
			/* @__PURE__ */ Q("input", {
				id: s,
				class: "sc-stepper__input",
				type: "text",
				inputMode: "numeric",
				value: t,
				onChange: (e) => i(c(parseInt(e.target.value, 10) || n))
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-stepper__btn",
				"aria-label": o,
				disabled: !!r && t >= r,
				onClick: () => i(c(t + 1)),
				children: /* @__PURE__ */ Q($, {
					name: "plus",
					size: 16
				})
			})
		]
	});
}
function Of({ label: e, hint: t, error: n, counter: r, children: i, id: a }) {
	let o = He(), s = a ?? o, c = t ? `${s}-hint` : void 0, l = n ? `${s}-err` : void 0;
	return /* @__PURE__ */ Q("div", {
		class: `sc-field${n ? " sc-field--error" : ""}`,
		children: [
			/* @__PURE__ */ Q("div", {
				class: "sc-field__top",
				children: [/* @__PURE__ */ Q("label", {
					class: "sc-field__label",
					for: s,
					children: e
				}), r && /* @__PURE__ */ Q("span", {
					class: "sc-field__counter",
					children: r
				})]
			}),
			i({
				id: s,
				describedBy: [c, l].filter(Boolean).join(" ") || void 0
			}),
			t && !n && /* @__PURE__ */ Q("p", {
				class: "sc-field__hint",
				id: c,
				children: t
			}),
			n && /* @__PURE__ */ Q("p", {
				class: "sc-field__error",
				id: l,
				role: "alert",
				children: n
			})
		]
	});
}
function kf({ id: e, value: t, onCommit: n, unit: r, min: i, max: a, step: o = 1, describedBy: s, disabled: c, label: l }) {
	let u = (e) => {
		let t = Number(e.replace(",", "."));
		Number.isFinite(t) && n(Math.min(a ?? Infinity, Math.max(i ?? -Infinity, t)));
	};
	return /* @__PURE__ */ Q("div", {
		class: "sc-num",
		children: [/* @__PURE__ */ Q("input", {
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
		}), r && /* @__PURE__ */ Q("span", {
			class: "sc-num__unit",
			children: r
		})]
	});
}
function Af({ label: e, value: t, active: n, image: r, onChange: i }) {
	let [a, o] = L(!1), s = t && /^#[0-9a-f]{6}$/i.test(t) ? t : "#000000";
	return /* @__PURE__ */ Q("label", {
		class: `sc-customcolor${n ? " is-on" : ""}`,
		title: e,
		children: [
			/* @__PURE__ */ Q("input", {
				type: "color",
				class: "sc-visually-hidden",
				value: s,
				"aria-label": e,
				onInput: (e) => i(e.target.value)
			}),
			/* @__PURE__ */ Q("span", {
				class: "sc-customcolor__disc",
				"aria-hidden": "true",
				children: [r && !a ? /* @__PURE__ */ Q("img", {
					src: r,
					alt: "",
					onError: () => o(!0)
				}) : /* @__PURE__ */ Q("svg", {
					viewBox: "0 0 44 44",
					children: /* @__PURE__ */ Q("g", {
						fill: "none",
						"fill-rule": "evenodd",
						children: [
							/* @__PURE__ */ Q("path", {
								d: "M22 0H1a1 1 0 0 0-.6.3L22 22V0z",
								fill: "#CE1128"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M.3.3A1 1 0 0 0 0 1v21h22L.3.3z",
								fill: "#ED2E8A"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M43.7.3A1 1 0 0 0 43 0H22v22L43.7.3z",
								fill: "#F99410"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M43.7 43.7A1 1 0 0 0 44 43V22H22l21.7 21.7z",
								fill: "#20B718"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M43.7.3 22 22h22V1a1 1 0 0 0-.3-.7",
								fill: "#FCEA10"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M22 44h21a1 1 0 0 0 .7-.3L22 22v22z",
								fill: "#2CB1E5"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M0 22v21c0 .3.1.5.3.7L22 22H0z",
								fill: "#662483"
							}),
							/* @__PURE__ */ Q("path", {
								d: "M.3 43.7A1 1 0 0 0 1 44h21V22L.3 43.7z",
								fill: "#126EB2"
							})
						]
					})
				}), n && /* @__PURE__ */ Q("span", {
					class: "sc-customcolor__dot",
					style: { background: s }
				})]
			}),
			/* @__PURE__ */ Q("span", {
				class: "sc-customcolor__text",
				children: [e, n && /* @__PURE__ */ Q("span", {
					class: "sc-customcolor__hex",
					children: s.toUpperCase()
				})]
			})
		]
	});
}
//#endregion
//#region src/ui/downscale.ts
async function jf(e, t = 1920) {
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
//#region src/ui/Layers.tsx
var Mf = {
	text: "text",
	image: "image",
	qr: "qrcode"
};
function Nf({ onClose: e }) {
	let { store: t, t: n, config: r } = Gr(), i = t.ui.value, a = t.design.value.objects.filter((e) => e.face === i.face), o = [...a].reverse(), [s, c] = L(null), [l, u] = L(null), d = (e) => a.length - 1 - e, f = (e) => e.type === "text" ? e.text.split("\n")[0] || "…" : e.type === "image" ? e.name || n("object.image") : e.value || n("object.qr"), p = (e) => {
		if (e.type === "text") {
			let t = r.fonts.find((t) => t.id === e.fontId);
			return t ? t.display ?? t.label : "";
		}
		return e.type === "qr" ? n("object.qr") : e.zoneId ? n("layers.zone") : "";
	};
	return /* @__PURE__ */ Q("div", {
		class: "sc-popover sc-layers",
		role: "dialog",
		"aria-label": n("layers.title"),
		onKeyDown: (t) => t.key === "Escape" && e(),
		children: [
			/* @__PURE__ */ Q("div", {
				class: "sc-layers__head",
				children: [/* @__PURE__ */ Q("h3", {
					class: "sc-subtitle",
					children: n("layers.title")
				}), /* @__PURE__ */ Q(bf, {
					icon: "close",
					label: n("action.close"),
					onClick: e
				})]
			}),
			/* @__PURE__ */ Q("p", {
				class: "sc-muted sc-small",
				children: n("layers.subtitle")
			}),
			o.length === 0 ? /* @__PURE__ */ Q("p", {
				class: "sc-empty",
				children: n("layers.empty")
			}) : /* @__PURE__ */ Q("ol", {
				class: "sc-layers__list",
				children: o.map((e, r) => /* @__PURE__ */ Q("li", {
					class: [
						"sc-layer",
						e.id === i.selectedObjectId && "is-active",
						e.hidden && "is-hidden",
						s === e.id && "is-dragging",
						l === r && s !== e.id && "is-over"
					].filter(Boolean).join(" "),
					draggable: !0,
					onDragStart: (t) => {
						c(e.id), t.dataTransfer?.setData("text/plain", e.id), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
					},
					onDragEnd: () => {
						c(null), u(null);
					},
					onDragOver: (e) => {
						e.preventDefault(), u(r);
					},
					onDrop: (e) => {
						e.preventDefault(), s && t.actions.arrangeObject(s, d(r)), c(null), u(null);
					},
					children: [
						/* @__PURE__ */ Q("span", {
							class: "sc-layer__grip",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Q($, {
								name: "grip",
								size: 16
							})
						}),
						/* @__PURE__ */ Q("button", {
							type: "button",
							class: "sc-layer__main",
							"aria-pressed": e.id === i.selectedObjectId,
							disabled: e.hidden,
							onClick: () => t.actions.ui({ selectedObjectId: e.id }),
							children: [/* @__PURE__ */ Q("span", {
								class: "sc-layer__thumb",
								children: e.type === "image" ? /* @__PURE__ */ Q("img", {
									src: e.src,
									alt: ""
								}) : /* @__PURE__ */ Q($, {
									name: Mf[e.type],
									size: 16
								})
							}), /* @__PURE__ */ Q("span", {
								class: "sc-layer__text",
								children: [/* @__PURE__ */ Q("span", {
									class: "sc-layer__name",
									children: [/* @__PURE__ */ Q("span", {
										class: "sc-layer__label",
										children: f(e)
									}), r === 0 && /* @__PURE__ */ Q("span", {
										class: "sc-layer__badge",
										children: n("layers.top")
									})]
								}), p(e) && /* @__PURE__ */ Q("span", {
									class: "sc-muted sc-small",
									children: p(e)
								})]
							})]
						}),
						/* @__PURE__ */ Q("span", {
							class: "sc-layer__actions",
							children: [
								/* @__PURE__ */ Q(bf, {
									icon: "forward",
									label: n("action.forward"),
									disabled: r === 0,
									onClick: () => t.actions.arrangeObject(e.id, "forward")
								}),
								/* @__PURE__ */ Q(bf, {
									icon: "backward",
									label: n("action.backward"),
									disabled: r === o.length - 1,
									onClick: () => t.actions.arrangeObject(e.id, "backward")
								}),
								/* @__PURE__ */ Q(bf, {
									icon: e.hidden ? "eyeOff" : "eye",
									label: e.hidden ? n("layers.show") : n("layers.hide"),
									onClick: () => t.actions.setObjectHidden(e.id, !e.hidden)
								}),
								!e.zoneId && /* @__PURE__ */ Q(bf, {
									icon: "trash",
									class: "is-danger",
									label: n("action.delete"),
									onClick: () => t.actions.removeObject(e.id)
								})
							]
						})
					]
				}, e.id))
			}),
			o.length > 1 && /* @__PURE__ */ Q("p", {
				class: "sc-muted sc-small sc-layers__hint",
				children: n("layers.dragHint")
			})
		]
	});
}
function Pf({ value: e, onChange: t }) {
	let { config: n, store: r, t: i } = Gr(), a = r.ui.value.customSceneUrl, [o, s] = L([]), [c, l] = L(!1), u = async (e) => {
		let n = e.currentTarget, i = n.files?.[0];
		if (n.value = "", i) {
			l(!0);
			try {
				let e = await jf(i);
				r.actions.ui({ customSceneUrl: e }), t(e);
			} catch {} finally {
				l(!1);
			}
		}
	}, d = n.images.scenes.filter((e) => !o.includes(e)), f = (n, r, i) => /* @__PURE__ */ Q("button", {
		type: "button",
		role: "radio",
		"aria-checked": e === n,
		"aria-label": r,
		title: r,
		class: "sc-scene-thumb",
		onClick: () => t(n),
		children: /* @__PURE__ */ Q("img", {
			src: n,
			alt: "",
			loading: "lazy",
			onError: i
		})
	}, n);
	return /* @__PURE__ */ Q("div", {
		class: "sc-scenes",
		children: [/* @__PURE__ */ Q("div", {
			class: "sc-scene-row",
			role: "radiogroup",
			"aria-label": i("scenes.title"),
			children: [
				/* @__PURE__ */ Q("button", {
					type: "button",
					role: "radio",
					"aria-checked": e === null,
					"aria-label": i("scenes.none"),
					title: i("scenes.none"),
					class: "sc-scene-thumb sc-scene-thumb--none",
					onClick: () => t(null),
					children: /* @__PURE__ */ Q($, {
						name: "close",
						size: 18
					})
				}),
				a && f(a, i("scenes.mine")),
				d.map((e, t) => f(e, i("scenes.item", { n: t + 1 }), () => s((t) => [...t, e])))
			]
		}), /* @__PURE__ */ Q("div", {
			class: "sc-scene-actions",
			children: /* @__PURE__ */ Q("label", {
				class: `sc-stage-btn${c ? " is-busy" : ""}`,
				children: [
					/* @__PURE__ */ Q($, {
						name: "upload",
						size: 16
					}),
					i("scenes.upload"),
					/* @__PURE__ */ Q("input", {
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
//#region src/ui/ObjectPanel.tsx
function Ff(e) {
	let { config: t, store: n, optionEditor: r } = Gr(), i = Gn(t, n.design.value), a = e.zoneId ? i?.textZones.find((t) => t.id === e.zoneId) : void 0, o = e.zoneId ? i?.imageZones.find((t) => t.id === e.zoneId) : void 0, s = !!(a || o);
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
function If({ label: e, value: t, palette: n, custom: r, image: i, onChange: a }) {
	let { t: o } = Gr(), s = n.map((e, t) => ({
		id: `${t}-${e.hex}`,
		label: e.label,
		hex: e.hex
	})), c = s.find((e) => e.hex.toLowerCase() === t.toLowerCase())?.id ?? null;
	return /* @__PURE__ */ Q("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Q("h4", {
			class: "sc-subtitle",
			children: e
		}), /* @__PURE__ */ Q("div", {
			class: "sc-colorrow",
			children: [s.length > 0 && /* @__PURE__ */ Q(Tf, {
				label: e,
				items: s,
				value: c,
				onChange: (e) => a(s.find((t) => t.id === e).hex)
			}), r && /* @__PURE__ */ Q(Af, {
				label: o("color.customPick"),
				value: t,
				active: c === null && !!t,
				image: i,
				onChange: a
			})]
		})]
	});
}
function Lf({ object: e }) {
	let { config: t, store: n, t: r, assets: i } = Gr(), a = Ff(e), o = t.unit, s = (t) => n.actions.updateObject(e.id, t), c = e.type === "text" ? r("object.text") : e.type === "image" ? r("object.image") : r("object.qr"), l = /* @__PURE__ */ Q("span", {
		class: "sc-locked",
		children: [
			/* @__PURE__ */ Q($, {
				name: "lock",
				size: 14
			}),
			" ",
			r("text.locked")
		]
	});
	return /* @__PURE__ */ Q("section", {
		class: "sc-objpanel",
		"aria-label": c,
		children: [
			/* @__PURE__ */ Q("header", {
				class: "sc-objpanel__head",
				children: [
					e.type === "image" && /* @__PURE__ */ Q("span", {
						class: "sc-objlist__thumb is-image",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q("img", {
							src: i.resolve(e.src),
							alt: ""
						})
					}),
					/* @__PURE__ */ Q("h4", {
						class: "sc-subtitle sc-objpanel__title",
						children: e.type === "image" && e.name ? e.name : c
					}),
					/* @__PURE__ */ Q(bf, {
						icon: "close",
						label: r("action.close"),
						onClick: () => n.actions.ui({ selectedObjectId: null })
					})
				]
			}),
			e.type === "text" && /* @__PURE__ */ Q(Xf, { o: e }),
			e.type === "image" && /* @__PURE__ */ Q(Vf, { o: e }),
			e.type === "qr" && /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q(Of, {
				label: r("qr.value"),
				children: ({ id: t }) => /* @__PURE__ */ Q("input", {
					id: t,
					class: "sc-input",
					value: e.value,
					placeholder: r("qr.placeholder"),
					onInput: (e) => s({ value: e.target.value })
				})
			}), /* @__PURE__ */ Q(If, {
				label: r("qr.color"),
				value: e.color,
				palette: t.text.colors,
				custom: !0,
				onChange: (e) => s({ color: e })
			})] }),
			/* @__PURE__ */ Q("details", {
				class: "sc-disclosure",
				open: !0,
				children: [
					/* @__PURE__ */ Q("summary", { children: r("object.position") }),
					/* @__PURE__ */ Q("div", {
						class: "sc-grid-3",
						children: [
							/* @__PURE__ */ Q(Of, {
								label: r("object.x"),
								children: ({ id: t }) => /* @__PURE__ */ Q(kf, {
									id: t,
									value: e.x,
									unit: o,
									disabled: !a.moveX,
									onCommit: (e) => s({ x: e })
								})
							}),
							/* @__PURE__ */ Q(Of, {
								label: r("object.y"),
								children: ({ id: t }) => /* @__PURE__ */ Q(kf, {
									id: t,
									value: e.y,
									unit: o,
									disabled: !a.moveY,
									onCommit: (e) => s({ y: e })
								})
							}),
							/* @__PURE__ */ Q(Of, {
								label: r("object.rotation"),
								children: ({ id: t }) => /* @__PURE__ */ Q(kf, {
									id: t,
									value: e.rotation,
									unit: "°",
									min: -360,
									max: 360,
									disabled: !a.rotate,
									onCommit: (e) => s({ rotation: e })
								})
							}),
							e.type === "image" && /* @__PURE__ */ Q(Of, {
								label: r("object.width"),
								children: ({ id: t }) => /* @__PURE__ */ Q(kf, {
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
							e.type === "qr" && /* @__PURE__ */ Q(Of, {
								label: r("object.width"),
								children: ({ id: t }) => /* @__PURE__ */ Q(kf, {
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
					/* @__PURE__ */ Q("div", {
						class: "sc-toolrow",
						children: [/* @__PURE__ */ Q("button", {
							type: "button",
							class: "sc-btn sc-btn--ghost",
							disabled: !a.moveX,
							onClick: () => s({ x: 0 }),
							children: [
								/* @__PURE__ */ Q($, {
									name: "centerH",
									size: 18
								}),
								" ",
								r("action.centerH")
							]
						}), /* @__PURE__ */ Q("button", {
							type: "button",
							class: "sc-btn sc-btn--ghost",
							disabled: !a.moveY,
							onClick: () => s({ y: 0 }),
							children: [
								/* @__PURE__ */ Q($, {
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
			e.zoneId && /* @__PURE__ */ Q(Rf, {
				zoneId: e.zoneId,
				kind: e.type === "text" ? "text" : "image"
			}),
			/* @__PURE__ */ Q("footer", {
				class: "sc-objpanel__foot",
				children: [a.clone && /* @__PURE__ */ Q("button", {
					type: "button",
					class: "sc-btn sc-btn--ghost",
					onClick: () => n.actions.duplicateObject(e.id),
					children: [
						/* @__PURE__ */ Q($, {
							name: "copy",
							size: 18
						}),
						" ",
						r("action.clone")
					]
				}), a.remove && /* @__PURE__ */ Q("button", {
					type: "button",
					class: "sc-btn sc-btn--danger",
					onClick: () => n.actions.removeObject(e.id),
					children: [
						/* @__PURE__ */ Q($, {
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
function Rf({ zoneId: e, kind: t }) {
	let { optionEditor: n, t: r } = Gr();
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
	return /* @__PURE__ */ Q("details", {
		class: "sc-disclosure",
		open: !0,
		children: [
			/* @__PURE__ */ Q("summary", { children: r("editor.rights") }),
			/* @__PURE__ */ Q("p", {
				class: "sc-muted sc-small",
				children: r("editor.rightsHint")
			}),
			/* @__PURE__ */ Q("div", {
				class: "sc-rights",
				children: a.map((t) => /* @__PURE__ */ Q("label", {
					class: "sc-switch sc-switch--sm",
					children: [/* @__PURE__ */ Q("input", {
						type: "checkbox",
						checked: i[t],
						onChange: (r) => n.set(e, { [t]: r.target.checked })
					}), /* @__PURE__ */ Q("span", {
						class: "sc-switch__text",
						children: r(`editor.right.${t}`)
					})]
				}, t))
			})
		]
	});
}
var zf = {
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
function Bf({ filter: e, base: t, fallback: n }) {
	let r = e === "blur" ? "sharpen" : e, [i, a] = L(!1), o = i || !t ? n : `${t.replace(/\/+$/, "")}/im_${r}_filter.png`, s = i || !t || e === "blur" ? zf[e] : void 0;
	return /* @__PURE__ */ Q("span", {
		class: "sc-fx__thumb",
		children: /* @__PURE__ */ Q("img", {
			src: o,
			alt: "",
			loading: "lazy",
			style: s ? { filter: s } : void 0,
			onError: () => !i && a(!0)
		})
	});
}
function Vf({ o: e }) {
	let { config: t, store: n, t: r, assets: i } = Gr(), a = Ff(e), o = (t) => n.actions.updateObject(e.id, t), s = /\.svg(\?|#|$)/i.test(e.src) || e.src.startsWith("data:image/svg"), c = t.images.filters.filter((e) => Rd.includes(e)), l = new Set(e.filters ?? []);
	return /* @__PURE__ */ Q(I, { children: [
		/* @__PURE__ */ Q("div", {
			class: "sc-toolrow",
			children: [/* @__PURE__ */ Q(bf, {
				icon: "flipX",
				label: r("image.flipX"),
				pressed: !!e.flipX,
				disabled: !a.rotate,
				onClick: () => o({ flipX: !e.flipX })
			}), /* @__PURE__ */ Q(bf, {
				icon: "flipY",
				label: r("image.flipY"),
				pressed: !!e.flipY,
				disabled: !a.rotate,
				onClick: () => o({ flipY: !e.flipY })
			})]
		}),
		s && (t.images.colors.length > 0 || t.images.allowCustomColor) && /* @__PURE__ */ Q(If, {
			label: r("image.color"),
			value: e.tint ?? "",
			palette: t.images.colors,
			custom: t.images.allowCustomColor,
			image: t.images.customColorImage,
			onChange: (e) => o({ tint: e })
		}),
		!s && c.length > 0 && /* @__PURE__ */ Q("div", {
			class: "sc-block",
			children: [/* @__PURE__ */ Q("h4", {
				class: "sc-subtitle",
				children: r("image.filters")
			}), /* @__PURE__ */ Q("div", {
				class: "sc-fxgrid",
				role: "group",
				"aria-label": r("image.filters"),
				children: c.map((t) => /* @__PURE__ */ Q("button", {
					type: "button",
					class: `sc-fx${l.has(t) ? " is-on" : ""}`,
					"aria-pressed": l.has(t),
					onClick: () => {
						let e = new Set(l);
						e.has(t) ? e.delete(t) : e.add(t), o({ filters: [...e] });
					},
					children: [
						/* @__PURE__ */ Q(Bf, {
							filter: t,
							base: i.urls.filters_url,
							fallback: e.src
						}),
						/* @__PURE__ */ Q("span", {
							class: "sc-fx__label",
							children: r(`image.filter.${t}`)
						}),
						l.has(t) && /* @__PURE__ */ Q("span", {
							class: "sc-fx__check",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Q($, {
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
function Hf({ o: e, update: t }) {
	let { config: n, t: r } = Gr(), i = qr(n.text.type, e), a = i.type === "normal", o = Jf(n.fonts.find((t) => t.id === e.fontId)), s = [
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
	] : [], u = (e, t, r) => /* @__PURE__ */ Q(If, {
		label: e,
		value: t,
		palette: n.text.colors,
		custom: n.text.allowCustomColor,
		image: n.text.customColorImage,
		onChange: r
	});
	return /* @__PURE__ */ Q(I, { children: [
		(s.length > 0 || l.length > 0) && /* @__PURE__ */ Q("div", {
			class: "sc-block",
			children: [
				/* @__PURE__ */ Q("h4", {
					class: "sc-subtitle",
					children: r("text.effects")
				}),
				s.length > 0 && /* @__PURE__ */ Q("div", {
					class: "sc-fxgrid sc-fxgrid--text",
					role: "group",
					"aria-label": r("text.effects"),
					children: s.map((e) => /* @__PURE__ */ Q("button", {
						type: "button",
						class: `sc-fx${e.on ? " is-on" : ""}`,
						"aria-pressed": e.on,
						onClick: e.set,
						children: [/* @__PURE__ */ Q("span", {
							class: "sc-fx__thumb sc-fx__thumb--text",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Q("span", {
								style: {
									fontFamily: o,
									...e.css
								},
								children: "Ab"
							})
						}), /* @__PURE__ */ Q("span", {
							class: "sc-fx__label",
							children: e.label
						})]
					}, e.key))
				}),
				l.length > 0 && /* @__PURE__ */ Q("div", {
					class: "sc-fxgrid sc-fxgrid--text",
					role: "radiogroup",
					"aria-label": r("text.curve"),
					children: l.map((n) => /* @__PURE__ */ Q("button", {
						type: "button",
						role: "radio",
						"aria-checked": c === n.v,
						title: n.v === "none" ? n.label : n.v === "up" ? r("text.curveUp") : r("text.curveDown"),
						class: `sc-fx${c === n.v ? " is-on" : ""}`,
						onClick: () => t({ curve: n.v === "up" ? 150 : n.v === "down" ? -150 : 0 }),
						children: [/* @__PURE__ */ Q("span", {
							class: "sc-fx__thumb sc-fx__thumb--text",
							"aria-hidden": "true",
							children: /* @__PURE__ */ Q("svg", {
								viewBox: "0 0 64 40",
								width: "64",
								height: "40",
								children: [/* @__PURE__ */ Q("path", {
									id: `sc-curve-${e.id}-${n.v}`,
									d: n.d,
									fill: "none"
								}), /* @__PURE__ */ Q("text", {
									"font-family": o,
									"font-size": "15",
									"font-weight": "600",
									fill: "currentColor",
									"text-anchor": "middle",
									"dominant-baseline": n.v === "down" ? "hanging" : "auto",
									children: /* @__PURE__ */ Q("textPath", {
										href: `#sc-curve-${e.id}-${n.v}`,
										startOffset: "50%",
										children: "Abcde"
									})
								})]
							})
						}), /* @__PURE__ */ Q("span", {
							class: "sc-fx__label",
							children: n.label
						})]
					}, n.v))
				})
			]
		}),
		a && n.text.outline && /* @__PURE__ */ Q("div", {
			class: "sc-block sc-fxblock",
			children: [/* @__PURE__ */ Q(Wf, {
				label: r("text.outline"),
				value: i.outline.width,
				max: 25,
				onChange: (e) => t({ outlineWidth: e })
			}), i.outline.width > 0 && u(r("text.outlineColor"), i.outline.color, (e) => t({ outlineColor: e }))]
		}),
		i.type === "3D" && i.border2 && i.side && /* @__PURE__ */ Q("div", {
			class: "sc-block sc-fxblock",
			children: [
				/* @__PURE__ */ Q("h4", {
					class: "sc-subtitle",
					children: r("text.3d.borders")
				}),
				/* @__PURE__ */ Q(Wf, {
					label: r("text.3d.first"),
					help: "first-border",
					value: i.outline.width,
					max: 25,
					onChange: (e) => t({ outlineWidth: e })
				}),
				u(r("text.3d.firstColor"), i.outline.color, (e) => t({ outlineColor: e })),
				/* @__PURE__ */ Q(Wf, {
					label: r("text.3d.second"),
					help: "second-border",
					value: i.border2.width,
					max: 30,
					onChange: (e) => t({ border2Width: e })
				}),
				u(r("text.3d.secondColor"), i.border2.color, (e) => t({ border2Color: e })),
				/* @__PURE__ */ Q(Gf, {
					label: r("text.3d.side"),
					help: "side",
					on: i.side.on,
					onChange: (e) => t({ side: e })
				}),
				i.side.on && u(r("text.3d.sideColor"), i.side.color, (e) => t({ sideColor: e }))
			]
		}),
		i.type === "neon" && i.glow && /* @__PURE__ */ Q("div", {
			class: "sc-block sc-fxblock",
			children: [/* @__PURE__ */ Q(Gf, {
				label: r("text.neon.light"),
				on: i.glow.on,
				onChange: (e) => t({ glow: e })
			}), i.glow.on && u(r("text.neon.lightColor"), i.glow.color, (e) => t({ glowColor: e }))]
		}),
		n.text.opacity && /* @__PURE__ */ Q("div", {
			class: "sc-block sc-fxblock",
			children: /* @__PURE__ */ Q(Wf, {
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
function Uf({ name: e }) {
	let { assets: t } = Gr(), n = t.urls.asset_images_url.replace(/\/+$/, ""), r = [
		`${n}/text-types/help/${e}.png`,
		`${n}/text-types/Help/${e}.png`,
		`${n}/${e}.png`
	], [i, a] = L(0);
	return !n || i >= r.length ? null : /* @__PURE__ */ Q("span", {
		class: "sc-fxrow__help",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("img", {
			src: r[i],
			alt: "",
			loading: "lazy",
			onError: () => a(i + 1)
		})
	});
}
function Wf({ label: e, value: t, min: n = 0, max: r, unit: i = "px", help: a, onChange: o }) {
	let s = He();
	return /* @__PURE__ */ Q("div", {
		class: "sc-fxrow",
		children: [a && /* @__PURE__ */ Q(Uf, { name: a }), /* @__PURE__ */ Q("div", {
			class: "sc-fxrow__body",
			children: [/* @__PURE__ */ Q("label", {
				for: s,
				class: "sc-fxrow__label",
				children: [e, /* @__PURE__ */ Q("span", {
					class: "sc-fxrow__value",
					children: [
						t,
						" ",
						i
					]
				})]
			}), /* @__PURE__ */ Q("input", {
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
function Gf({ label: e, on: t, help: n, onChange: r }) {
	return /* @__PURE__ */ Q("div", {
		class: "sc-fxrow",
		children: [n && /* @__PURE__ */ Q(Uf, { name: n }), /* @__PURE__ */ Q("label", {
			class: "sc-switch sc-fxrow__body",
			children: [/* @__PURE__ */ Q("input", {
				type: "checkbox",
				role: "switch",
				checked: t,
				onChange: (e) => r(e.target.checked)
			}), /* @__PURE__ */ Q("span", { children: e })]
		})]
	});
}
var Kf = null;
function qf(e, t, n) {
	Kf ?? (Kf = document.createElement("canvas").getContext("2d"));
	let r = Kf;
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
function Jf(e) {
	return e?.url ? `sc-font-${e.id}, "${e.label}", sans-serif` : `"${e?.label ?? "inherit"}", sans-serif`;
}
function Yf({ id: e, value: t, disabled: n, onChange: r }) {
	let { config: i, t: a } = Gr(), [o, s] = L(!1), [c, l] = L(0), u = ze(null), d = ze(null), f = i.fonts.find((e) => e.id === t) ?? i.fonts[0], p = `${e}-list`;
	Re(() => {
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
	return /* @__PURE__ */ Q("div", {
		class: `sc-fontpick${o ? " is-open" : ""}`,
		ref: u,
		children: [/* @__PURE__ */ Q("button", {
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
			children: [/* @__PURE__ */ Q("span", {
				class: "sc-fontpick__name",
				style: { fontFamily: Jf(f) },
				children: f ? f.display ?? f.label : ""
			}), /* @__PURE__ */ Q($, {
				name: "chevronDown",
				size: 18
			})]
		}), o && /* @__PURE__ */ Q("ul", {
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
			children: i.fonts.map((e, n) => /* @__PURE__ */ Q("li", {
				id: `${p}-${n}`,
				role: "option",
				"aria-selected": e.id === t,
				class: `sc-fontpick__opt${n === c ? " is-active" : ""}${e.id === t ? " is-on" : ""}`,
				style: { fontFamily: Jf(e) },
				onPointerEnter: () => l(n),
				onClick: () => m(n),
				children: [/* @__PURE__ */ Q("span", {
					class: "sc-fontpick__label",
					children: e.display ?? e.label
				}), e.id === t && /* @__PURE__ */ Q($, {
					name: "check",
					size: 16
				})]
			}, e.id))
		})]
	});
}
function Xf({ o: e }) {
	let t = Gr(), { config: n, store: r, t: i } = t, a = Ff(e), o = a.textZone, s = (t) => r.actions.updateObject(e.id, t), c = e.text.length, l = o?.maxChars ?? null, u = r.design.value, d = u.customSize ? null : n.sizes.find((e) => e.id === u.sizeId)?.maxTextChar ?? null, f = u.objects.reduce((t, n) => n.type === "text" && n.face === e.face && n.id !== e.id ? t + n.text.length : t, 0), p = d === null ? null : Math.max(0, d - f), m = (e) => s({ text: p === null ? e : e.slice(0, Math.max(p, Math.min(e.length, c))) }), h = o?.minChars ?? null, g = l !== null && c > l ? i("text.tooLong", { max: l }) : h !== null && c < h ? i("text.tooShort", { min: h }) : null, _ = n.text.fontSize, v = dr(n, u), y = Math.round(sr(n, v, e.size) * 10) / 10, b = qf(e, Jf(n.fonts.find((t) => t.id === e.fontId)), v.width);
	return /* @__PURE__ */ Q(I, { children: [
		/* @__PURE__ */ Q(Of, {
			label: i("object.text"),
			error: g,
			counter: l ? i("text.chars", {
				n: c,
				max: l
			}) : void 0,
			children: ({ id: t, describedBy: n }) => /* @__PURE__ */ Q("textarea", {
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
		p !== null && /* @__PURE__ */ Q("p", {
			class: "sc-muted sc-small",
			children: i("text.sizeLimit", {
				n: f + c,
				max: d
			})
		}),
		/* @__PURE__ */ Q("div", {
			class: "sc-grid-2",
			children: [/* @__PURE__ */ Q(Of, {
				label: i("text.font"),
				children: ({ id: t }) => /* @__PURE__ */ Q(Yf, {
					id: t,
					value: e.fontId,
					disabled: !a.font,
					onChange: (e) => s({ fontId: e })
				})
			}), _.enabled && /* @__PURE__ */ Q("div", {
				class: "sc-field",
				children: [/* @__PURE__ */ Q("span", {
					class: "sc-field__label",
					children: i("text.size")
				}), /* @__PURE__ */ Q(kf, {
					label: i("text.size"),
					value: y,
					min: _.min,
					max: _.max,
					step: 1,
					disabled: !a.resize,
					onCommit: (e) => s({ size: or(n, v, e) })
				})]
			})]
		}),
		b && /* @__PURE__ */ Q("p", {
			class: "sc-muted sc-small",
			children: i("text.dims", { dims: sp(t, b.w, b.h) })
		}),
		a.color && (n.text.colors.length > 0 || n.text.allowCustomColor) && /* @__PURE__ */ Q(If, {
			label: i("text.color"),
			value: e.color,
			palette: n.text.colors,
			custom: n.text.allowCustomColor,
			image: n.text.customColorImage,
			onChange: (e) => s({ color: e })
		}),
		/* @__PURE__ */ Q(Hf, {
			o: e,
			update: s
		}),
		/* @__PURE__ */ Q("div", {
			class: "sc-toolrow",
			children: n.text.align && /* @__PURE__ */ Q(Ef, {
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
function Zf({ type: e }) {
	let { store: t, t: n, assets: r } = Gr(), i = t.design.value, a = t.ui.value, o = i.objects.filter((t) => (e === null || t.type === e) && t.face === a.face);
	return o.length ? /* @__PURE__ */ Q("div", {
		class: "sc-objlist",
		children: [/* @__PURE__ */ Q("h4", {
			class: "sc-subtitle",
			children: n("object.list")
		}), /* @__PURE__ */ Q("ul", { children: o.map((e) => /* @__PURE__ */ Q("li", {
			class: e.id === a.selectedObjectId ? "is-active" : "",
			children: [
				/* @__PURE__ */ Q("button", {
					type: "button",
					class: "sc-objlist__main",
					"aria-pressed": e.id === a.selectedObjectId,
					onClick: () => t.actions.ui({ selectedObjectId: e.id }),
					children: [/* @__PURE__ */ Q("span", {
						class: `sc-objlist__thumb${e.type === "image" ? " is-image" : ""}`,
						"aria-hidden": "true",
						children: e.type === "image" ? /* @__PURE__ */ Q("img", {
							src: r.resolve(e.src),
							alt: "",
							loading: "lazy"
						}) : /* @__PURE__ */ Q($, {
							name: e.type === "text" ? "text" : "qrcode",
							size: 18
						})
					}), /* @__PURE__ */ Q("span", {
						class: "sc-objlist__label",
						children: e.type === "text" ? e.text || "…" : e.type === "image" ? e.name || n("object.image") : e.value
					})]
				}),
				/* @__PURE__ */ Q(bf, {
					icon: "forward",
					label: n("action.forward"),
					onClick: () => t.actions.moveObjectInStack(e.id, 1)
				}),
				/* @__PURE__ */ Q(bf, {
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
function Qf(e, t) {
	if (e.config.hidePricing || !t.value) return null;
	if (t.kind === "multiplier") {
		if (t.value === 1) return null;
		let n = new Intl.NumberFormat(e.locale, { maximumFractionDigits: 1 }).format(Math.abs(t.value - 1) * 100);
		return `${t.value > 1 ? "+" : "−"}${n}\u00a0%`;
	}
	return `+${e.money(t.value)}`;
}
var $f = (e, t, n) => {
	let r = t.trim();
	return !r || !e.locale.toLowerCase().startsWith("en") && r.toLowerCase() === n ? e.t(`input.${n}`) : r;
}, ep = 5;
function tp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value, [a, o] = L(null), s = (e) => e ? /* @__PURE__ */ Q("button", {
		type: "button",
		class: "sc-linkbtn sc-opt__example",
		onClick: (t) => (t.preventDefault(), t.stopPropagation(), o(e)),
		children: [
			/* @__PURE__ */ Q($, {
				name: "info",
				size: 14
			}),
			" ",
			r("info.example")
		]
	}) : null, c = (e, t, n, r, i) => /* @__PURE__ */ Q("div", {
		class: `sc-opt${t ? " is-on" : ""}`,
		children: [/* @__PURE__ */ Q("div", {
			class: "sc-opt__head",
			children: [
				/* @__PURE__ */ Q("div", {
					class: "sc-opt__text",
					children: [
						/* @__PURE__ */ Q("h4", {
							class: "sc-opt__title",
							children: e.label
						}),
						e.description && /* @__PURE__ */ Q("p", {
							class: "sc-opt__desc",
							children: e.description
						}),
						"popupImage" in e && s(e.popupImage)
					]
				}),
				n && /* @__PURE__ */ Q("span", {
					class: `sc-opt__price${t ? " is-on" : ""}`,
					children: n
				}),
				i
			]
		}), r]
	}, e.id);
	return /* @__PURE__ */ Q("div", {
		class: "sc-opts",
		children: [t.inputs.map((t) => {
			let a = i.inputs[t.id];
			switch (t.kind) {
				case "yes-no": {
					let r = a === !0, i = Qf(e, t.price);
					return /* @__PURE__ */ Q("label", {
						class: `sc-opt sc-opt--switch${r ? " is-on" : ""}`,
						children: /* @__PURE__ */ Q("div", {
							class: "sc-opt__head",
							children: [
								/* @__PURE__ */ Q("div", {
									class: "sc-opt__text",
									children: [
										/* @__PURE__ */ Q("span", {
											class: "sc-opt__title",
											children: t.label
										}),
										t.description && /* @__PURE__ */ Q("span", {
											class: "sc-opt__desc",
											children: t.description
										}),
										s(t.popupImage)
									]
								}),
								i && /* @__PURE__ */ Q("span", {
									class: `sc-opt__price${r ? " is-on" : ""}`,
									children: i
								}),
								/* @__PURE__ */ Q("span", {
									class: "sc-opt__toggle",
									children: [
										/* @__PURE__ */ Q("input", {
											type: "checkbox",
											role: "switch",
											checked: r,
											onChange: (e) => n.actions.setInput(t.id, e.target.checked)
										}),
										/* @__PURE__ */ Q("span", {
											class: "sc-opt__track",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ Q("span", {
											class: "sc-opt__state",
											children: r ? $f(e, t.yes, "yes") : $f(e, t.no, "no")
										})
									]
								})
							]
						})
					}, t.id);
				}
				case "dropdown": {
					let r = t.options.find((e) => e.value === a), i = r ? Qf(e, r.price) : null, o = t.options.length <= ep;
					return c(t, !!r, i, o ? /* @__PURE__ */ Q("div", {
						class: "sc-chips",
						role: "radiogroup",
						"aria-label": t.label,
						children: t.options.map((r) => {
							let i = Qf(e, r.price);
							return /* @__PURE__ */ Q("button", {
								type: "button",
								role: "radio",
								"aria-checked": r.value === a,
								class: `sc-chip${r.value === a ? " is-on" : ""}`,
								onClick: () => n.actions.setInput(t.id, r.value),
								children: [r.label, i && /* @__PURE__ */ Q("span", {
									class: "sc-chip__price",
									children: i
								})]
							}, r.value);
						})
					}) : /* @__PURE__ */ Q("select", {
						class: "sc-input",
						"aria-label": t.label,
						value: String(a ?? ""),
						onChange: (e) => n.actions.setInput(t.id, e.target.value),
						children: t.options.map((t) => {
							let n = Qf(e, t.price);
							return /* @__PURE__ */ Q("option", {
								value: t.value,
								children: [t.label, n ? ` (${n})` : ""]
							}, t.value);
						})
					}));
				}
				case "cards": return c(t, a !== void 0 && a !== "", null, /* @__PURE__ */ Q(wf, {
					exampleLabel: r("info.example"),
					label: t.label,
					value: String(a ?? ""),
					onChange: (e) => n.actions.setInput(t.id, e),
					items: t.options.map((t) => ({
						id: t.value,
						label: t.label,
						image: t.image,
						popupImage: t.popupImage,
						price: Qf(e, t.price) ?? void 0
					}))
				}));
				case "note": {
					let e = String(a ?? "");
					return c(t, e.trim() !== "", null, /* @__PURE__ */ Q("div", {
						class: "sc-opt__note",
						children: [/* @__PURE__ */ Q("textarea", {
							class: "sc-input sc-textarea",
							rows: 3,
							"aria-label": t.label,
							maxLength: t.maxChars ?? void 0,
							placeholder: r("input.notePlaceholder"),
							value: e,
							onInput: (e) => n.actions.setInput(t.id, e.target.value)
						}), t.maxChars && /* @__PURE__ */ Q("span", {
							class: "sc-opt__count",
							children: r("text.chars", {
								n: e.length,
								max: t.maxChars
							})
						})]
					}));
				}
				case "included": return c(t, !0, Qf(e, t.price) ?? r("price.included"), null, /* @__PURE__ */ Q($, {
					name: "check",
					size: 20,
					class: "sc-opt__check"
				}));
			}
		}), a && /* @__PURE__ */ Q(Cf, {
			url: a,
			label: r("info.example"),
			onClose: () => o(null)
		})]
	});
}
//#endregion
//#region src/ui/steps/Images.tsx
function np({ onFile: e, onClipart: t }) {
	let { config: n, t: r } = Gr(), i = n.images.upload && n.images.cliparts, [a, o] = L(null), s = i ? a : n.images.upload ? "upload" : n.images.cliparts ? "browse" : null, c = n.images.clipartGroups.reduce((e, t) => e + t.items.length, 0), l = (n.images.allowedTypes.length ? n.images.allowedTypes : [
		"png",
		"jpg",
		"svg"
	]).map((e) => e.toUpperCase()).join(", "), u = i ? () => o(null) : void 0;
	return s === "upload" ? /* @__PURE__ */ Q(ip, {
		formats: l,
		onFile: e,
		onBack: u
	}) : s === "browse" ? /* @__PURE__ */ Q(ap, {
		onPick: t,
		onBack: u
	}) : /* @__PURE__ */ Q("div", {
		class: "sc-imgsrc",
		role: "group",
		"aria-labelledby": "sc-imgsrc-title",
		children: [
			/* @__PURE__ */ Q("h4", {
				id: "sc-imgsrc-title",
				class: "sc-subtitle",
				children: r("image.chooseSource")
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-imgsrc__row",
				onClick: () => o("upload"),
				children: [
					/* @__PURE__ */ Q("span", {
						class: "sc-imgsrc__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q($, {
							name: "upload",
							size: 22
						})
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-imgsrc__text",
						children: [/* @__PURE__ */ Q("span", {
							class: "sc-imgsrc__title",
							children: r("image.sourceUpload")
						}), /* @__PURE__ */ Q("span", {
							class: "sc-imgsrc__hint",
							children: r("image.sourceUploadHint", { formats: l })
						})]
					}),
					/* @__PURE__ */ Q($, {
						name: "chevronRight",
						size: 18,
						class: "sc-imgsrc__chev"
					})
				]
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-imgsrc__row",
				onClick: () => o("browse"),
				children: [
					/* @__PURE__ */ Q("span", {
						class: "sc-imgsrc__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q($, {
							name: "image",
							size: 22
						})
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-imgsrc__text",
						children: [/* @__PURE__ */ Q("span", {
							class: "sc-imgsrc__title",
							children: r("image.sourceBrowse")
						}), /* @__PURE__ */ Q("span", {
							class: "sc-imgsrc__hint",
							children: r("image.sourceBrowseHint", { n: c })
						})]
					}),
					/* @__PURE__ */ Q($, {
						name: "chevronRight",
						size: 18,
						class: "sc-imgsrc__chev"
					})
				]
			})
		]
	});
}
function rp({ title: e, extra: t, onBack: n }) {
	let { t: r } = Gr();
	return /* @__PURE__ */ Q("div", {
		class: "sc-imgpanel__head",
		children: [
			n && /* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-iconbtn sc-imgpanel__back",
				"aria-label": r("image.otherSource"),
				title: r("image.otherSource"),
				onClick: n,
				children: /* @__PURE__ */ Q($, {
					name: "chevronLeft",
					size: 20
				})
			}),
			/* @__PURE__ */ Q("h4", {
				class: "sc-subtitle sc-imgpanel__title",
				children: e
			}),
			t
		]
	});
}
function ip({ formats: e, onFile: t, onBack: n }) {
	let { config: r, t: i } = Gr(), [a, o] = L(!1), s = (r.images.allowedTypes.length ? r.images.allowedTypes : [
		"png",
		"jpg",
		"jpeg",
		"svg"
	]).map((e) => `.${e}`).join(",");
	return /* @__PURE__ */ Q("div", {
		class: "sc-imgpanel",
		children: [
			/* @__PURE__ */ Q(rp, {
				title: i("image.sourceUpload"),
				onBack: n
			}),
			/* @__PURE__ */ Q("label", {
				class: `sc-drop${a ? " is-over" : ""}`,
				onDragOver: (e) => (e.preventDefault(), o(!0)),
				onDragLeave: () => o(!1),
				onDrop: (e) => {
					e.preventDefault(), o(!1);
					let n = e.dataTransfer?.files?.[0];
					n && t(n);
				},
				children: [
					/* @__PURE__ */ Q("input", {
						type: "file",
						class: "sc-visually-hidden",
						accept: s,
						onChange: (e) => {
							let n = e.target, r = n.files?.[0];
							r && t(r), n.value = "";
						}
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-drop__icon",
						"aria-hidden": "true",
						children: /* @__PURE__ */ Q($, {
							name: "upload",
							size: 26
						})
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-drop__title",
						children: i("image.dropTitle")
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-drop__or",
						children: i("image.dropOr")
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-btn sc-btn--secondary sc-drop__btn",
						children: i("image.pickFile")
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-drop__formats",
						children: i("image.formats", { formats: e })
					})
				]
			}),
			/* @__PURE__ */ Q("p", {
				class: "sc-imgpanel__tip",
				children: [
					/* @__PURE__ */ Q($, {
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
function ap({ onPick: e, onBack: t }) {
	let n = Gr(), { config: r, t: i } = n, a = r.images.clipartGroups.filter((e) => e.items.length > 0), [o, s] = L(a[0]?.id ?? ""), [c, l] = L(""), u = a.reduce((e, t) => e + t.items.length, 0), d = u > 12 && a.some((e) => e.items.some((e) => e.title.trim())), f = c.trim().toLowerCase(), p = a.find((e) => e.id === o) ?? a[0], m = Be(() => f ? a.flatMap((e) => e.items).filter((e) => e.title.toLowerCase().includes(f)) : p?.items ?? [], [
		f,
		p,
		a
	]);
	return p ? /* @__PURE__ */ Q("div", {
		class: "sc-imgpanel",
		children: [
			/* @__PURE__ */ Q(rp, {
				title: i("image.sourceBrowse"),
				onBack: t,
				extra: /* @__PURE__ */ Q("span", {
					class: "sc-imgpanel__count",
					children: i("image.count", { n: u })
				})
			}),
			d && /* @__PURE__ */ Q("label", {
				class: "sc-search",
				children: [/* @__PURE__ */ Q($, {
					name: "search",
					size: 18
				}), /* @__PURE__ */ Q("input", {
					type: "search",
					class: "sc-search__input",
					placeholder: i("image.search"),
					"aria-label": i("image.search"),
					value: c,
					onInput: (e) => l(e.target.value)
				})]
			}),
			!f && a.length > 1 && /* @__PURE__ */ Q("div", {
				class: "sc-chips sc-chips--scroll",
				role: "tablist",
				"aria-label": i("image.clipartGroup"),
				children: a.map((e) => /* @__PURE__ */ Q("button", {
					type: "button",
					role: "tab",
					"aria-selected": e.id === p.id,
					class: `sc-chip${e.id === p.id ? " is-on" : ""}`,
					onClick: () => s(e.id),
					children: [e.title, /* @__PURE__ */ Q("span", {
						class: "sc-chip__price",
						children: e.items.length
					})]
				}, e.id))
			}),
			!f && p.description && /* @__PURE__ */ Q("p", {
				class: "sc-muted sc-small",
				children: p.description
			}),
			m.length ? /* @__PURE__ */ Q("ul", {
				class: "sc-library",
				"aria-label": f ? i("image.search") : p.title,
				children: m.map((t) => /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ Q("button", {
					type: "button",
					class: "sc-library__item",
					title: t.title || void 0,
					onClick: () => e(t.url, t.price, t.title.trim() || void 0),
					children: [
						/* @__PURE__ */ Q("span", {
							class: "sc-library__thumb",
							children: /* @__PURE__ */ Q("img", {
								src: t.url,
								alt: t.title,
								loading: "lazy"
							})
						}),
						t.title && /* @__PURE__ */ Q("span", {
							class: "sc-library__name",
							children: t.title
						}),
						t.price > 0 && !r.hidePricing && /* @__PURE__ */ Q("span", {
							class: "sc-library__price",
							children: ["+", n.money(t.price)]
						})
					]
				}) }, `${t.id}-${t.url}`))
			}) : /* @__PURE__ */ Q("p", {
				class: "sc-empty",
				children: i("image.noResult")
			})
		]
	}) : null;
}
//#endregion
//#region src/ui/steps/Templates.tsx
function op() {
	let e = Gr(), { t, store: n, config: r } = e, i = e.templates, [a, o] = L(""), [s, c] = L(null);
	if (!i) return null;
	let l = n.design.value.template?.id ?? null, u = i.loadingId.value, d = i.categories.filter((e) => i.list.some((t) => t.categoryId === e.value)), f = a ? i.list.filter((e) => e.categoryId === a) : i.list, p = (e) => {
		c(null), e === "blank" ? i.reset() : i.apply(e);
	}, m = (e) => {
		(e === "blank" || e.id !== l) && (e !== "blank" || l || i.dirty()) && (i.dirty() ? c(e) : p(e));
	}, h = i.prices.value, g = (n) => {
		let i = h[n.key];
		return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ Q("button", {
			type: "button",
			class: `sc-tplrow${n.on ? " is-on" : ""}${n.blank ? " is-blank" : ""}`,
			"aria-pressed": n.on,
			"aria-busy": n.busy,
			disabled: u !== null && !n.busy,
			onClick: n.onClick,
			children: [
				/* @__PURE__ */ Q("span", {
					class: "sc-tplrow__media",
					"aria-hidden": "true",
					children: [n.media, n.busy && /* @__PURE__ */ Q("span", { class: "sc-spinner sc-tplrow__spinner" })]
				}),
				/* @__PURE__ */ Q("span", {
					class: "sc-tplrow__body",
					children: [
						/* @__PURE__ */ Q("span", {
							class: "sc-tplrow__name",
							children: n.name
						}),
						n.meta && /* @__PURE__ */ Q("span", {
							class: "sc-tplrow__meta",
							children: n.meta
						}),
						n.on && /* @__PURE__ */ Q("span", {
							class: "sc-tplrow__current",
							children: [
								/* @__PURE__ */ Q($, {
									name: "check",
									size: 12
								}),
								" ",
								t("templates.current")
							]
						})
					]
				}),
				!r.hidePricing && (i === void 0 ? /* @__PURE__ */ Q("span", {
					class: "sc-tplrow__price is-loading",
					"aria-hidden": "true"
				}) : /* @__PURE__ */ Q("span", {
					class: "sc-tplrow__price",
					children: e.money(i)
				}))
			]
		}) }, n.key || "__blank");
	};
	return /* @__PURE__ */ Q("div", {
		class: "sc-tplstep",
		children: [
			i.labels.description && /* @__PURE__ */ Q("p", {
				class: "sc-muted sc-small",
				children: i.labels.description
			}),
			d.length > 0 && /* @__PURE__ */ Q("div", {
				class: "sc-chips sc-chips--scroll",
				role: "tablist",
				"aria-label": t("templates.categories"),
				children: [{
					value: "",
					name: i.labels.all || t("templates.all")
				}, ...d].map((e) => /* @__PURE__ */ Q("button", {
					type: "button",
					role: "tab",
					"aria-selected": a === e.value,
					class: `sc-chip${a === e.value ? " is-on" : ""}`,
					onClick: () => o(e.value),
					children: e.name
				}, e.value))
			}),
			s && /* @__PURE__ */ Q("div", {
				class: "sc-confirm",
				role: "alertdialog",
				"aria-labelledby": "sc-tpl-confirm-title",
				"aria-describedby": "sc-tpl-confirm-text",
				children: [
					/* @__PURE__ */ Q("p", {
						id: "sc-tpl-confirm-title",
						class: "sc-confirm__title",
						children: t("templates.confirmTitle")
					}),
					/* @__PURE__ */ Q("p", {
						id: "sc-tpl-confirm-text",
						class: "sc-muted sc-small",
						children: t("templates.confirmText")
					}),
					/* @__PURE__ */ Q("div", {
						class: "sc-confirm__actions",
						children: [/* @__PURE__ */ Q("button", {
							type: "button",
							class: "sc-btn sc-btn--ghost",
							onClick: () => c(null),
							children: t("templates.cancel")
						}), /* @__PURE__ */ Q("button", {
							type: "button",
							class: "sc-btn sc-btn--cta",
							autoFocus: !0,
							onClick: () => p(s),
							children: t("templates.confirmOk")
						})]
					})
				]
			}),
			i.error.value && /* @__PURE__ */ Q("p", {
				class: "sc-error",
				role: "alert",
				children: i.error.value
			}),
			/* @__PURE__ */ Q("ul", {
				class: "sc-tpllist",
				"aria-busy": u !== null,
				children: [g({
					key: "",
					on: !l,
					name: t("templates.blank"),
					meta: t("templates.blankHint"),
					media: /* @__PURE__ */ Q($, {
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
					media: e.image ? /* @__PURE__ */ Q("img", {
						src: e.image,
						alt: "",
						loading: "lazy"
					}) : /* @__PURE__ */ Q($, {
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
function sp(e, t, n) {
	let r = e.config, i = e.store.ui.value.displayUnit;
	return Hn(Bn(t, r.unit, i), Bn(n, r.unit, i), i, r.decimals, e.locale);
}
var cp = (e, t) => e.config.hidePricing || !t ? void 0 : `+${e.money(t)}`;
function lp(e, t) {
	return e.t(`section.${t}`);
}
function up(e, t, n) {
	let r = e.config, i = (e, t) => e.find((e) => e.id === t)?.label ?? "";
	switch (t) {
		case "material": return i(r.materials, n.materialId);
		case "component": return r.components.find((e) => e.id === n.componentId)?.options.find((e) => e.id === n.componentOptionId)?.label ?? "";
		case "size": {
			let t = dr(r, n);
			return sp(e, t.width, t.height);
		}
		case "shape": return i(Jn(r, n), n.shapeId);
		case "fixing": return i(Xn(r, n), n.fixingId);
		case "border": return i(Yn(r, n), n.borderId);
		case "color": return n.customColor ? n.customColor.toUpperCase() : i(r.colors, n.colorId);
		case "lighting": return i(nr(r, n), n.lightingId);
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
		case "addons": return rr(r, n).map((e) => e.options.find((t) => t.id === n.addons[e.id])?.label).filter(Boolean).join(", ");
		case "templates": return n.template ? e.templates?.list.find((e) => e.id === n.template.id)?.name ?? "" : e.t("templates.blankShort");
	}
}
function dp(e, t, n) {
	if ((t === "component" || t === "text") && (e.components.find((e) => e.id === n.componentId)?.options.find((e) => e.id === n.componentOptionId)?.textZones ?? []).some((e) => {
		let t = n.objects.find((t) => t.zoneId === e.id)?.text.trim().length ?? 0;
		return e.required && !t || e.minChars !== null && t < e.minChars || e.maxChars !== null && t > e.maxChars;
	})) return "todo";
}
function fp({ kind: e }) {
	return /* @__PURE__ */ Q("svg", {
		viewBox: "-2 -2 52 40",
		width: "52",
		height: "40",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", {
			d: Zu(Ju(e), 48, 36),
			fill: "currentColor",
			"fill-opacity": ".12",
			stroke: "currentColor",
			"stroke-width": "1.5"
		})
	});
}
function pp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value, a = Zn(t, i).find((e) => e.id === i.shapeId);
	return /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q(wf, {
		exampleLabel: e.t("info.example"),
		label: r("section.shape"),
		columns: 3,
		value: i.shapeId,
		onChange: (e) => n.actions.patch({ shapeId: e }),
		items: Zn(t, i).map((t) => ({
			id: t.id,
			label: t.label,
			image: t.image,
			popupImage: t.popupImage,
			visual: /* @__PURE__ */ Q(fp, { kind: t.kind }),
			price: cp(e, t.priceBySurface ? 0 : t.price)
		}))
	}), a?.kind === "cut-to-shape" && /* @__PURE__ */ Q("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Q("h4", {
			class: "sc-subtitle",
			children: r("shape.outline")
		}), /* @__PURE__ */ Q(Ef, {
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
function mp(e) {
	let t = e.config.orientation, n = e.locale.toLowerCase().startsWith("en"), r = (t, r, i) => t && (n || t.toLowerCase() !== r) ? t : e.t(i);
	return {
		label: r(t?.label, "orientation", "size.orientation"),
		portrait: r(t?.portrait, "portrait", "size.portrait"),
		landscape: r(t?.landscape, "landscape", "size.landscape")
	};
}
function hp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value, a = qn(t, i), o = i.customSize, s = t.unit, c = n.ui.value.displayUnit, l = (e) => Bn(e, s, c), u = (e) => Bn(e, c, s), d = mp(e), f = t.unitSwitcher, p = f?.label && (e.locale.toLowerCase().startsWith("en") || !/^change the unit of measurement$/i.test(f.label.trim())) ? f.label : r("size.unit");
	return /* @__PURE__ */ Q(I, { children: [
		f && /* @__PURE__ */ Q("div", {
			class: "sc-block sc-unitswitch",
			children: [/* @__PURE__ */ Q("h4", {
				class: "sc-subtitle",
				children: p
			}), /* @__PURE__ */ Q(Ef, {
				label: p,
				value: c,
				onChange: (e) => n.actions.ui({ displayUnit: e }),
				options: f.units.map((e) => ({
					value: e,
					label: e.toUpperCase()
				}))
			})]
		}),
		t.orientation && !o && /* @__PURE__ */ Q("div", {
			class: "sc-block",
			children: [/* @__PURE__ */ Q("h4", {
				class: "sc-subtitle",
				id: "sc-orient-title",
				children: d.label
			}), /* @__PURE__ */ Q("div", {
				class: "sc-orient",
				role: "radiogroup",
				"aria-labelledby": "sc-orient-title",
				children: ["portrait", "landscape"].map((r) => {
					let a = (i.orientation ?? t.orientation.default) === r, o = dr(t, {
						...i,
						orientation: r
					});
					return /* @__PURE__ */ Q("button", {
						type: "button",
						role: "radio",
						"aria-checked": a,
						class: `sc-orient__card${a ? " is-on" : ""}`,
						onClick: () => n.actions.patch({ orientation: r }),
						children: [/* @__PURE__ */ Q("svg", {
							viewBox: "0 0 48 48",
							width: "40",
							height: "40",
							"aria-hidden": "true",
							class: "sc-orient__art",
							children: /* @__PURE__ */ Q("rect", {
								x: r === "portrait" ? 13 : 5,
								y: r === "portrait" ? 5 : 13,
								width: r === "portrait" ? 22 : 38,
								height: r === "portrait" ? 38 : 22,
								rx: "3",
								fill: "currentColor",
								"fill-opacity": ".14",
								stroke: "currentColor",
								"stroke-width": "2"
							})
						}), /* @__PURE__ */ Q("span", {
							class: "sc-orient__text",
							children: [/* @__PURE__ */ Q("span", {
								class: "sc-orient__label",
								children: r === "portrait" ? d.portrait : d.landscape
							}), /* @__PURE__ */ Q("span", {
								class: "sc-orient__dims",
								children: sp(e, o.width, o.height)
							})]
						})]
					}, r);
				})
			})]
		}),
		a.length > 0 && /* @__PURE__ */ Q(wf, {
			exampleLabel: e.t("info.example"),
			label: r("section.size"),
			columns: 2,
			value: o ? null : i.sizeId,
			onChange: (e) => n.actions.patch({
				sizeId: e,
				customSize: null
			}),
			items: a.map((n) => {
				let r = fr(t, i, n), a = r.width === n.width && r.height === n.height;
				return {
					id: n.id,
					label: n.label,
					description: c === s && a && n.label.includes(String(n.width)) ? void 0 : sp(e, r.width, r.height)
				};
			})
		}),
		t.customSize && /* @__PURE__ */ Q("div", {
			class: `sc-custom-size${o ? " is-on" : ""}`,
			children: [/* @__PURE__ */ Q("label", {
				class: "sc-switch",
				children: [/* @__PURE__ */ Q("input", {
					type: "checkbox",
					checked: !!o,
					onChange: (e) => {
						let r = e.target.checked, a = dr(t, i);
						n.actions.patch(r ? {
							customSize: { ...a },
							sizeId: null
						} : { customSize: null });
					}
				}), /* @__PURE__ */ Q("span", { children: r("size.custom") })]
			}), o && /* @__PURE__ */ Q("div", {
				class: "sc-grid-2",
				children: ["width", "height"].map((i) => {
					let a = t.customSize[i];
					return /* @__PURE__ */ Q(Of, {
						label: r(`size.${i}`),
						hint: r("size.range", {
							min: Vn(l(a.min), c, !0, e.locale),
							max: Vn(l(a.max), c, !0, e.locale),
							unit: c
						}),
						children: ({ id: e, describedBy: t }) => /* @__PURE__ */ Q(kf, {
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
		t.thickness.length > 0 && /* @__PURE__ */ Q("div", {
			class: "sc-block",
			children: [/* @__PURE__ */ Q("h4", {
				class: "sc-subtitle",
				children: r("size.thickness")
			}), /* @__PURE__ */ Q(Ef, {
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
function gp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value;
	return /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q(Tf, {
		label: r("section.color"),
		value: i.customColor ? null : i.colorId,
		onChange: (e) => n.actions.patch({
			colorId: e,
			customColor: null
		}),
		items: tr(t, i).map((t) => ({
			id: t.id,
			label: t.label,
			hex: t.hex,
			image: t.patternUrl ?? void 0,
			price: cp(e, t.price)
		}))
	}), t.customBackground && /* @__PURE__ */ Q("div", {
		class: "sc-block",
		children: /* @__PURE__ */ Q(Af, {
			label: t.customBackground.label && !/^custom colou?rs?$/i.test(t.customBackground.label.trim()) ? t.customBackground.label : r("color.custom"),
			value: i.customColor,
			active: !!i.customColor,
			image: t.customBackground.image,
			onChange: (e) => n.actions.patch({ customColor: e })
		})
	})] });
}
function _p() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value, a = $n(t, i), o = a.find((e) => e.id === i.borderId);
	return /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q(wf, {
		exampleLabel: e.t("info.example"),
		label: r("section.border"),
		columns: 2,
		value: i.borderId,
		onChange: (e) => n.actions.selectBorder(e),
		items: a.map((t) => ({
			id: t.id,
			label: t.label,
			description: t.description,
			image: t.image,
			popupImage: t.popupImage,
			price: cp(e, t.price)
		}))
	}), t.borderSettings.allowColor && t.borderSettings.colors.length > 0 && o && o.kind !== "none" && /* @__PURE__ */ Q("div", {
		class: "sc-block",
		children: [/* @__PURE__ */ Q("h4", {
			class: "sc-subtitle",
			children: r("border.color")
		}), /* @__PURE__ */ Q(Tf, {
			label: r("border.color"),
			value: i.borderColorId,
			onChange: (e) => n.actions.patch({ borderColorId: e }),
			items: t.borderSettings.colors.map((t) => ({
				id: t.id,
				label: t.label,
				hex: t.hex,
				price: cp(e, t.price)
			}))
		})]
	})] });
}
function vp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value, a = Kn(t, i), o = a.find((e) => e.id === i.componentId) ?? a[0];
	return /* @__PURE__ */ Q(I, { children: [
		a.length > 1 && /* @__PURE__ */ Q(Ef, {
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
		o && /* @__PURE__ */ Q(wf, {
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
				price: cp(e, t.price)
			}))
		}),
		/* @__PURE__ */ Q(yp, {})
	] });
}
function yp() {
	let { config: e, store: t, t: n } = Gr(), r = t.design.value, i = e.components.find((e) => e.id === r.componentId)?.options.find((e) => e.id === r.componentOptionId);
	return i?.textZones.length ? /* @__PURE__ */ Q("div", {
		class: "sc-block sc-zones",
		children: i.textZones.map((e) => {
			let i = r.objects.find((t) => t.zoneId === e.id);
			if (!i) return null;
			let a = i.text.length, o = e.maxChars !== null && a > e.maxChars ? n("text.tooLong", { max: e.maxChars }) : e.minChars !== null && a < e.minChars ? n("text.tooShort", { min: e.minChars }) : null;
			return /* @__PURE__ */ Q(Of, {
				label: e.label,
				error: o,
				counter: e.maxChars ? n("text.chars", {
					n: a,
					max: e.maxChars
				}) : void 0,
				children: ({ id: n, describedBy: r }) => /* @__PURE__ */ Q("input", {
					id: n,
					class: "sc-input",
					value: i.text,
					readOnly: !e.can.edit,
					"aria-describedby": r,
					"aria-invalid": !!o,
					onInput: (e) => t.actions.updateObject(i.id, { text: e.target.value })
				})
			}, e.id);
		})
	}) : null;
}
function bp({ type: e }) {
	let t = Gr(), { config: n, store: r, t: i } = t, a = r.design.value, o = r.ui.value, { width: s, height: c } = dr(n, a), l = a.objects.filter((t) => t.type === e && t.face === o.face), u = a.objects.find((t) => t.id === o.selectedObjectId && t.type === e), d = n.text.type === "neon" ? Kr : n.colors.find((e) => e.id === a.colorId)?.textColor?.hex ?? n.text.colors[0]?.hex ?? "#000000", f = () => r.actions.addObject({
		id: mr("text"),
		type: "text",
		face: o.face,
		text: i("text.placeholder"),
		fontId: n.fonts.find((e) => e.isDefault)?.id ?? n.fonts[0]?.id ?? "",
		size: or(n, {
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
		id: mr("qr"),
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
				id: mr("image"),
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
	return /* @__PURE__ */ Q(I, { children: [u ? /* @__PURE__ */ Q(Lf, { object: u }) : t.optionEditor ? /* @__PURE__ */ Q("p", {
		class: "sc-muted sc-small",
		children: i("editor.zonesHint")
	}) : /* @__PURE__ */ Q(I, { children: [
		e === "text" && /* @__PURE__ */ Q("button", {
			type: "button",
			class: "sc-btn sc-btn--secondary sc-btn--block",
			onClick: f,
			children: [
				/* @__PURE__ */ Q($, {
					name: "plus",
					size: 18
				}),
				" ",
				i("action.addText")
			]
		}),
		e === "qr" && !l.length && /* @__PURE__ */ Q("button", {
			type: "button",
			class: "sc-btn sc-btn--secondary sc-btn--block",
			onClick: p,
			children: [
				/* @__PURE__ */ Q($, {
					name: "qrcode",
					size: 18
				}),
				" ",
				i("action.addQr")
			]
		}),
		e === "image" && /* @__PURE__ */ Q(np, {
			onFile: (e) => {
				let t = new FileReader();
				t.onload = () => m(String(t.result), void 0, e.name), t.readAsDataURL(e);
			},
			onClipart: (e, t, n) => m(e, t, n)
		}),
		!l.length && e === "text" && /* @__PURE__ */ Q("p", {
			class: "sc-empty",
			children: i("text.empty")
		})
	] }), /* @__PURE__ */ Q(Zf, { type: e })] });
}
function xp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = n.design.value;
	return /* @__PURE__ */ Q("div", {
		class: "sc-stack",
		children: rr(t, i).map((t) => /* @__PURE__ */ Q("div", {
			class: "sc-block",
			children: [
				/* @__PURE__ */ Q("h4", {
					class: "sc-subtitle",
					children: t.label
				}),
				t.description && /* @__PURE__ */ Q("p", {
					class: "sc-muted sc-small",
					children: t.description
				}),
				/* @__PURE__ */ Q(wf, {
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
						price: cp(e, t.priceBySurface ? 0 : t.price)
					}))]
				})
			]
		}, t.id))
	});
}
function Sp({ section: e }) {
	let t = Gr(), { config: n, store: r, t: i } = t, a = r.design.value;
	switch (e) {
		case "material": return /* @__PURE__ */ Q(wf, {
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
				price: cp(t, e.pricingId ? 0 : e.price)
			}))
		});
		case "component": return /* @__PURE__ */ Q(vp, {});
		case "size": return /* @__PURE__ */ Q(hp, {});
		case "shape": return /* @__PURE__ */ Q(pp, {});
		case "fixing": return /* @__PURE__ */ Q(wf, {
			exampleLabel: t.t("info.example"),
			label: i("section.fixing"),
			columns: 2,
			value: a.fixingId,
			onChange: (e) => r.actions.patch({ fixingId: e }),
			items: er(n, a).map((e) => ({
				id: e.id,
				label: e.label,
				description: e.description,
				image: e.image,
				popupImage: e.popupImage,
				visual: /* @__PURE__ */ Q($, {
					name: "fixing",
					size: 28
				}),
				price: cp(t, e.price)
			}))
		});
		case "border": return /* @__PURE__ */ Q(_p, {});
		case "color": return /* @__PURE__ */ Q(gp, {});
		case "lighting": return /* @__PURE__ */ Q(Tf, {
			label: i("section.lighting"),
			value: a.lightingId,
			onChange: (e) => r.actions.patch({ lightingId: e }),
			items: nr(n, a).map((e) => ({
				id: e.id,
				label: e.label,
				hex: e.hex,
				price: cp(t, e.price)
			}))
		});
		case "text": return /* @__PURE__ */ Q(bp, { type: "text" });
		case "qrcode": return /* @__PURE__ */ Q(bp, { type: "qr" });
		case "image": return /* @__PURE__ */ Q(bp, { type: "image" });
		case "options": return /* @__PURE__ */ Q(tp, {});
		case "addons": return /* @__PURE__ */ Q(xp, {});
		case "templates": return /* @__PURE__ */ Q(op, {});
	}
}
//#endregion
//#region src/ui/Stage.tsx
var Cp = 48, wp = 240, Tp = (e, t) => e.x < t.x + t.width && t.x < e.x + e.width && e.y < t.y + t.height && t.y < e.y + e.height;
function Ep(e, t, n, r, i, a) {
	let o = Math.max(128, Math.min(n + e.x + e.width / 2, i - 8 - wp / 2)), s = t ? {
		x: n + t.x - 6,
		y: r + t.y - 6,
		width: t.width + 12,
		height: t.height + 12
	} : null, c = a - 80, l = [
		r + e.y + e.height + 14,
		r + e.y - 14 - Cp,
		s ? s.y + s.height + 8 : -1,
		s ? s.y - 8 - Cp : -1
	], u = l.find((e) => e >= 8 && e + Cp <= c && !(s && Tp({
		x: o - wp / 2,
		y: e,
		width: wp,
		height: Cp
	}, s))) ?? Math.max(8, Math.min(l[0], c - Cp));
	return {
		left: `${o}px`,
		top: `${u}px`
	};
}
function Dp({ toolbarExtra: e }) {
	let t = Gr(), { config: n, store: r, t: i } = t, a = ze(null), o = ze(null), [s, c] = L(null), [l, u] = L(!1), [d, f] = L(0);
	Re(() => {
		let e = o.current;
		if (!e) return;
		let t = new ResizeObserver(() => f(e.clientWidth));
		return t.observe(e), () => t.disconnect();
	}, []);
	let p = d - (n.doubleSided ? r.design.value.doubleSided ? 210 : 60 : 0), m = d > 0 && p < 720, h = d > 0 && p < 480, g = r.design.value.orientation === "landscape", _ = () => r.actions.patch({ orientation: g ? "portrait" : "landscape" }), v = h ? " is-mini is-tiny is-compact" : m ? " is-tiny is-compact" : d && p < 1e3 ? " is-compact" : "", y = async () => {
		let e = await t.scene.current?.snapshotWithWatermark(n.output.watermark);
		if (!e) return;
		let r = document.createElement("a");
		r.href = e, r.download = `${n.name || "enseigne"}.png`, r.click();
	}, b = At(0), [x, S] = L(null), C = (e) => S((t) => t === e ? null : e), w = ze(null), T = ze(null);
	Re(() => {
		if (!x) return;
		let e = o.current?.getRootNode(), t = (e) => {
			let t = e.composedPath();
			w.current && !t.includes(w.current) && !(T.current && t.includes(T.current)) && S(null);
		}, n = (e) => {
			e.key === "Escape" && S(null);
		};
		return e?.addEventListener("pointerdown", t), e?.addEventListener("keydown", n), () => {
			e?.removeEventListener("pointerdown", t), e?.removeEventListener("keydown", n);
		};
	}, [x]), Re(() => {
		let e = !0;
		for (let t of n.fonts) t.url && new FontFace(`sc-font-${t.id}`, `url("${t.url}")`).load().then((t) => {
			document.fonts.add(t), e && b.value++;
		}, () => void 0);
		return () => {
			e = !1;
		};
	}, [n]), Re(() => {
		if (!a.current) return;
		let e = new hf(a.current, {
			onSelect: (e) => r.actions.ui({ selectedObjectId: e }),
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
		}, p = xt(() => {
			let a = r.design.value, s = r.ui.value, l = dr(n, a), u = n.colors.find((e) => e.id === a.colorId), d = Jn(n, a).find((e) => e.id === a.shapeId), p = Yn(n, a).find((e) => e.id === a.borderId), m = n.borderSettings.colors.find((e) => e.id === a.borderColorId)?.hex ?? (u?.textColor?.sameForBorder ? u.textColor.hex : "#111111"), h = nr(n, a).find((e) => e.id === a.lightingId), g = Xn(n, a).find((e) => e.id === a.fixingId), _ = n.thickness.find((e) => e.id === a.thicknessId), v = Gn(n, a);
			b.value, f({
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
				thicknessLabel: _ ? `${i("size.thickness")}: ${Un(_, n.unit, s.displayUnit, t.locale)}` : null,
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
	}, D = r.ui.value, O = r.design.value, k = dr(n, O), A = O.objects.find((e) => e.id === D.selectedObjectId), j = o.current?.getBoundingClientRect(), M = a.current?.getBoundingClientRect(), N = n.sections.includes("lighting"), P = O.objects.filter((e) => e.face === D.face), F = A ? P.indexOf(A) : -1, ee = n.doubleSided?.front || i("stage.front"), te = n.doubleSided?.back || i("stage.back"), ne = n.doubleSided ? Qf(t, n.doubleSided.pricing) : null, re = D.face === "front" ? "back" : "front";
	return /* @__PURE__ */ Q("div", {
		class: `sc-stage${D.sceneUrl ? " has-scene" : ""}${v}`,
		part: "stage",
		ref: o,
		style: D.sceneUrl ? { backgroundImage: `url("${D.sceneUrl.replace(/"/g, "%22")}")` } : void 0,
		children: [
			/* @__PURE__ */ Q("div", {
				class: "sc-stage__canvas",
				ref: a,
				tabIndex: 0,
				role: "img",
				"aria-label": i("stage.label", { dims: Hn(Bn(k.width, n.unit, D.displayUnit), Bn(k.height, n.unit, D.displayUnit), D.displayUnit, n.decimals, t.locale) }),
				onKeyDown: E
			}),
			D.stageView === "design" && n.doubleSided && O.doubleSided && /* @__PURE__ */ Q("div", {
				class: "sc-facetag",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ Q($, {
						name: "doubleSided",
						size: 18,
						class: "sc-facetag__icon"
					}),
					/* @__PURE__ */ Q("span", {
						class: "sc-facetag__text",
						children: i("doubleSided.editing", { face: D.face === "front" ? ee : te })
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						class: "sc-facetag__flip",
						title: i("doubleSided.switchTo", { face: re === "front" ? ee : te }),
						"aria-label": i("doubleSided.switchTo", { face: re === "front" ? ee : te }),
						onClick: () => r.actions.ui({
							face: re,
							selectedObjectId: null
						}),
						children: /* @__PURE__ */ Q($, {
							name: "flip",
							size: 16
						})
					})
				]
			}),
			D.stageView === "real-size" && /* @__PURE__ */ Q("div", {
				class: "sc-refbar",
				role: "radiogroup",
				"aria-label": i("ref.label"),
				children: [/* @__PURE__ */ Q("span", {
					class: "sc-refbar__label",
					"aria-hidden": "true",
					children: i("ref.label")
				}), Au.map((e) => /* @__PURE__ */ Q("button", {
					type: "button",
					role: "radio",
					"aria-checked": D.reference === e,
					class: "sc-refbar__item",
					onClick: () => r.actions.ui({ reference: e }),
					children: i(`ref.${e}`)
				}, e))]
			}),
			D.stageView === "design" && A && s && j && M && !l && /* @__PURE__ */ Q("div", {
				class: "sc-minibar",
				style: Ep(s, t.scene.current?.rotateHandleBox() ?? null, M.left - j.left, M.top - j.top, j.width, j.height),
				children: [
					P.length > 1 && /* @__PURE__ */ Q(I, { children: [
						/* @__PURE__ */ Q(bf, {
							icon: "forward",
							label: i("action.forward"),
							disabled: F === P.length - 1,
							onClick: () => r.actions.arrangeObject(A.id, "forward")
						}),
						/* @__PURE__ */ Q(bf, {
							icon: "backward",
							label: i("action.backward"),
							disabled: F === 0,
							onClick: () => r.actions.arrangeObject(A.id, "backward")
						}),
						/* @__PURE__ */ Q("span", { class: "sc-minibar__sep" })
					] }),
					!t.optionEditor && /* @__PURE__ */ Q(bf, {
						icon: "copy",
						label: i("action.clone"),
						onClick: () => r.actions.duplicateObject(A.id)
					}),
					!A.zoneId && /* @__PURE__ */ Q(bf, {
						icon: "trash",
						class: "is-danger",
						label: i("action.delete"),
						onClick: () => r.actions.removeObject(A.id)
					}),
					/* @__PURE__ */ Q(bf, {
						icon: "close",
						label: i("action.close"),
						onClick: () => r.actions.ui({ selectedObjectId: null })
					})
				]
			}),
			/* @__PURE__ */ Q("div", {
				class: "sc-stage__toolbar",
				part: "stage-toolbar",
				role: "toolbar",
				"aria-label": i("title"),
				ref: T,
				children: [
					/* @__PURE__ */ Q(Ef, {
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
					/* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" }),
					n.doubleSided && /* @__PURE__ */ Q(I, { children: [O.doubleSided ? /* @__PURE__ */ Q(I, { children: [
						/* @__PURE__ */ Q("div", {
							class: "sc-faceseg",
							role: "radiogroup",
							"aria-label": i("doubleSided.faceTitle"),
							children: ["front", "back"].map((e) => /* @__PURE__ */ Q("button", {
								type: "button",
								role: "radio",
								"aria-checked": D.face === e,
								class: `sc-faceseg__opt${D.face === e ? " is-on" : ""}`,
								onClick: () => r.actions.ui({
									face: e,
									selectedObjectId: null
								}),
								children: /* @__PURE__ */ Q("span", {
									class: "sc-faceseg__text",
									children: e === "front" ? ee : te
								})
							}, e))
						}),
						n.doubleSided.allowCopy && !h && /* @__PURE__ */ Q(bf, {
							icon: "copy",
							label: i("action.copyFace", { face: D.face === "front" ? te : ee }),
							onClick: () => r.actions.copyFace(D.face)
						}),
						/* @__PURE__ */ Q(bf, {
							icon: "close",
							class: "sc-faceseg__remove",
							label: i("doubleSided.remove"),
							onClick: () => (r.actions.patch({ doubleSided: !1 }), r.actions.ui({
								face: "front",
								selectedObjectId: null
							}))
						})
					] }) : /* @__PURE__ */ Q("button", {
						type: "button",
						class: "sc-toolchip",
						title: `${i("doubleSided.add")}${ne ? ` (${ne})` : ""}`,
						"aria-label": `${i("doubleSided.add")}${ne ? ` (${ne})` : ""}`,
						onClick: () => (r.actions.patch({ doubleSided: !0 }), r.actions.ui({
							face: "back",
							selectedObjectId: null
						})),
						children: [/* @__PURE__ */ Q($, {
							name: "doubleSided",
							size: 18
						}), /* @__PURE__ */ Q("span", {
							class: "sc-toolchip__text",
							children: i("doubleSided.add")
						})]
					}), /* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" })] }),
					n.orientation && !O.customSize && !h && /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q(bf, {
						icon: "orientation",
						class: O.orientation === "landscape" ? "is-landscape" : "",
						label: `${i("stage.orientation")} — ${O.orientation === "landscape" ? mp(t).landscape : mp(t).portrait}`,
						pressed: O.orientation === "landscape",
						onClick: () => r.actions.patch({ orientation: O.orientation === "landscape" ? "portrait" : "landscape" })
					}), /* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" })] }),
					!m && /* @__PURE__ */ Q(I, { children: [
						/* @__PURE__ */ Q(bf, {
							icon: "zoomOut",
							label: i("stage.zoomOut"),
							disabled: D.zoom <= .5,
							onClick: () => r.actions.ui({ zoom: Math.max(.5, D.zoom - .25) })
						}),
						/* @__PURE__ */ Q("span", {
							class: "sc-toolbar__value",
							"aria-live": "off",
							children: [Math.round(D.zoom * 100), " %"]
						}),
						/* @__PURE__ */ Q(bf, {
							icon: "zoomIn",
							label: i("stage.zoomIn"),
							disabled: D.zoom >= 3,
							onClick: () => r.actions.ui({ zoom: Math.min(3, D.zoom + .25) })
						})
					] }),
					!m && /* @__PURE__ */ Q(bf, {
						icon: "fit",
						label: i("stage.fit"),
						onClick: () => r.actions.ui({ zoom: 1 })
					}),
					N && !h && /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" }), /* @__PURE__ */ Q(bf, {
						icon: "sun",
						label: i("stage.light"),
						pressed: D.lightOn,
						onClick: () => r.actions.ui({ lightOn: !D.lightOn })
					})] }),
					/* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" }),
					m ? /* @__PURE__ */ Q(bf, {
						icon: "more",
						label: i("stage.more"),
						pressed: x === "more",
						"aria-expanded": x === "more",
						"aria-haspopup": "menu",
						onClick: () => C("more")
					}) : /* @__PURE__ */ Q(I, { children: [
						/* @__PURE__ */ Q(bf, {
							icon: "layers",
							label: i("layers.title"),
							pressed: x === "layers",
							"aria-expanded": x === "layers",
							onClick: () => C("layers")
						}),
						n.images.scenes.length > 0 && /* @__PURE__ */ Q(bf, {
							icon: "scene",
							label: i("scenes.title"),
							pressed: x === "scenes",
							"aria-expanded": x === "scenes",
							onClick: () => C("scenes")
						}),
						n.images.download && /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" }), /* @__PURE__ */ Q(bf, {
							icon: "download",
							label: i("stage.download"),
							onClick: y
						})] })
					] }),
					e
				]
			}),
			x === "more" && /* @__PURE__ */ Q("div", {
				class: "sc-moremenu",
				ref: w,
				role: "menu",
				"aria-label": i("stage.more"),
				children: [
					h && n.orientation && !O.customSize && /* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitemcheckbox",
						"aria-checked": g,
						class: "sc-moremenu__item",
						onClick: _,
						children: [
							/* @__PURE__ */ Q($, {
								name: "orientation",
								size: 18,
								class: g ? "is-rotated" : ""
							}),
							" ",
							i("size.orientation"),
							" : ",
							g ? mp(t).landscape : mp(t).portrait
						]
					}),
					h && N && /* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitemcheckbox",
						"aria-checked": D.lightOn,
						class: "sc-moremenu__item",
						onClick: () => r.actions.ui({ lightOn: !D.lightOn }),
						children: [
							/* @__PURE__ */ Q($, {
								name: "sun",
								size: 18
							}),
							" ",
							i("section.lighting"),
							" : ",
							D.lightOn ? i("stage.on") : i("stage.off")
						]
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						disabled: D.zoom >= 3,
						onClick: () => r.actions.ui({ zoom: Math.min(3, D.zoom + .25) }),
						children: [
							/* @__PURE__ */ Q($, {
								name: "zoomIn",
								size: 18
							}),
							" ",
							i("stage.zoomIn")
						]
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						disabled: D.zoom <= .5,
						onClick: () => r.actions.ui({ zoom: Math.max(.5, D.zoom - .25) }),
						children: [
							/* @__PURE__ */ Q($, {
								name: "zoomOut",
								size: 18
							}),
							" ",
							i("stage.zoomOut")
						]
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => r.actions.ui({ zoom: 1 }),
						children: [
							/* @__PURE__ */ Q($, {
								name: "fit",
								size: 18
							}),
							" ",
							i("stage.fit")
						]
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => S("layers"),
						children: [
							/* @__PURE__ */ Q($, {
								name: "layers",
								size: 18
							}),
							" ",
							i("layers.title")
						]
					}),
					n.images.scenes.length > 0 && /* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => S("scenes"),
						children: [
							/* @__PURE__ */ Q($, {
								name: "scene",
								size: 18
							}),
							" ",
							i("scenes.title")
						]
					}),
					n.images.download && /* @__PURE__ */ Q("button", {
						type: "button",
						role: "menuitem",
						class: "sc-moremenu__item",
						onClick: () => {
							S(null), y();
						},
						children: [
							/* @__PURE__ */ Q($, {
								name: "download",
								size: 18
							}),
							" ",
							i("stage.download")
						]
					})
				]
			}),
			x === "layers" && /* @__PURE__ */ Q("div", {
				class: "sc-stage__panel",
				ref: w,
				children: /* @__PURE__ */ Q(Nf, { onClose: () => S(null) })
			}),
			x === "scenes" && /* @__PURE__ */ Q("div", {
				class: "sc-scenemenu",
				ref: w,
				role: "dialog",
				"aria-label": i("scenes.title"),
				children: /* @__PURE__ */ Q(Pf, {
					value: D.sceneUrl,
					onChange: (e) => r.actions.ui({ sceneUrl: e })
				})
			}),
			/* @__PURE__ */ Q("p", {
				class: "sc-stage__hint sc-visually-hidden",
				children: /* @__PURE__ */ Q($, {
					name: "info",
					size: 14
				})
			})
		]
	});
}
//#endregion
//#region src/ui/PriceBlock.tsx
function Op({ compact: e = !1 }) {
	let t = Gr(), { config: n, t: r } = t, i = t.price.value, [a, o] = L(!1), s = ze(null);
	if (Re(() => {
		if (!a) return;
		let e = (e) => !s.current?.contains(e.composedPath()[0]) && o(!1), t = (e) => e.key === "Escape" && o(!1);
		return document.addEventListener("pointerdown", e, !0), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e, !0), document.removeEventListener("keydown", t);
		};
	}, [a]), n.hidePricing) return null;
	let c = n.texts.textBeforePrice, l = Ap(n.texts.textAfterPrice);
	return /* @__PURE__ */ Q("div", {
		class: `sc-price${e ? " sc-price--compact" : ""}`,
		part: "price",
		ref: s,
		children: [
			/* @__PURE__ */ Q("div", {
				class: "sc-price__amount",
				"aria-live": "polite",
				"aria-atomic": "true",
				children: [
					c && /* @__PURE__ */ Q("span", {
						class: "sc-price__before",
						children: c
					}),
					/* @__PURE__ */ Q("strong", {
						class: "sc-price__total",
						children: t.money(i.total)
					}),
					l && /* @__PURE__ */ Q("span", {
						class: "sc-price__after",
						children: l
					})
				]
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-linkbtn",
				"aria-expanded": a,
				onClick: () => o(!a),
				children: [r("action.details"), /* @__PURE__ */ Q($, {
					name: "chevronDown",
					size: 14
				})]
			}),
			a && /* @__PURE__ */ Q("div", {
				class: "sc-popover",
				role: "dialog",
				"aria-label": r("price.detail"),
				children: [/* @__PURE__ */ Q("h4", {
					class: "sc-subtitle",
					children: r("price.detail")
				}), /* @__PURE__ */ Q("ul", {
					class: "sc-pricelines",
					children: [
						i.lines.map((e) => /* @__PURE__ */ Q("li", { children: [/* @__PURE__ */ Q("span", { children: e.label }), /* @__PURE__ */ Q("span", {
							class: "sc-num-tab",
							children: e.kind === "multiplier" ? `× ${e.amount}` : t.money(e.amount)
						})] }, e.key)),
						i.quantity > 1 && /* @__PURE__ */ Q("li", { children: [/* @__PURE__ */ Q("span", { children: r("qty.label") }), /* @__PURE__ */ Q("span", {
							class: "sc-num-tab",
							children: ["× ", i.quantity]
						})] }),
						i.discount > 0 && /* @__PURE__ */ Q("li", {
							class: "is-discount",
							children: [/* @__PURE__ */ Q("span", { children: r("price.discount") }), /* @__PURE__ */ Q("span", {
								class: "sc-num-tab",
								children: ["−", t.money(i.discount)]
							})]
						}),
						/* @__PURE__ */ Q("li", {
							class: "is-total",
							children: [/* @__PURE__ */ Q("span", { children: r("price.total") }), /* @__PURE__ */ Q("span", {
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
var kp = /* @__PURE__ */ new Set(["tva include", "vat included"]);
function Ap(e) {
	let t = (e ?? "").trim();
	return kp.has(t.toLowerCase()) ? "" : t;
}
function jp() {
	let e = Gr(), { config: t, t: n } = e, r = t.discounts.byQuantity ? [...t.discounts.lots].filter((t) => t.quantity > e.quantity.value && t.kind !== "none").sort((e, t) => e.quantity - t.quantity)[0] : void 0;
	return /* @__PURE__ */ Q("div", {
		class: "sc-qty",
		children: [
			/* @__PURE__ */ Q("span", {
				class: "sc-qty__label",
				children: n("qty.label")
			}),
			/* @__PURE__ */ Q(Df, {
				label: n("qty.label"),
				value: e.quantity.value,
				min: t.quantity.min,
				max: t.quantity.max,
				decLabel: n("qty.decrease"),
				incLabel: n("qty.increase"),
				onChange: e.setQuantity
			}),
			r && /* @__PURE__ */ Q("span", {
				class: "sc-qty__lot",
				children: n("qty.lot", {
					qty: r.quantity,
					value: r.kind === "percent" ? `${r.value} %` : e.money(r.value)
				})
			})
		]
	});
}
//#endregion
//#region src/ui/skins/Default.tsx
var Mp = 4;
function Np() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = e.sections.value, a = n.ui.value, o = n.design.value, s = a.section && i.includes(a.section) ? a.section : i[0] ?? null, c = s ? i.indexOf(s) : -1, l = ze(null), [u, d] = L(!1), f = (e) => {
		n.actions.ui({
			section: e,
			selectedObjectId: null
		}), d(!1), requestAnimationFrame(() => l.current?.focus({ preventScroll: !0 }));
	}, p = e.status.value, m = (n, i) => /* @__PURE__ */ Q("button", {
		type: "button",
		class: `sc-navitem sc-navitem--${i}`,
		part: "rail-item",
		title: lp(e, n),
		"aria-current": n === s ? "step" : void 0,
		onClick: () => f(n),
		children: [
			/* @__PURE__ */ Q("span", {
				class: "sc-navitem__icon",
				children: [/* @__PURE__ */ Q(yf, {
					id: n,
					url: t.sectionIcons[n]
				}), p[n] === "todo" && /* @__PURE__ */ Q("span", {
					class: "sc-dot",
					"aria-label": r("nav.todo")
				})]
			}),
			/* @__PURE__ */ Q("span", {
				class: "sc-navitem__label",
				children: lp(e, n)
			}),
			i === "rail" && /* @__PURE__ */ Q("span", {
				class: "sc-navitem__summary",
				children: up(e, n, o)
			})
		]
	}, n), h = /* @__PURE__ */ Q("button", {
		type: "button",
		class: "sc-btn sc-btn--cta",
		part: "finish",
		onClick: e.onFinish,
		children: r("action.finish")
	}), g = t.finishPosition === "top";
	return /* @__PURE__ */ Q("div", {
		class: "sc-skin sc-default",
		"data-side": t.panelSide,
		children: [
			/* @__PURE__ */ Q("header", {
				class: "sc-topbar",
				part: "topbar",
				children: [/* @__PURE__ */ Q("div", {
					class: "sc-topbar__group",
					children: [
						/* @__PURE__ */ Q(bf, {
							icon: "undo",
							label: r("action.undo"),
							disabled: !n.canUndo.value,
							onClick: n.actions.undo
						}),
						/* @__PURE__ */ Q(bf, {
							icon: "redo",
							label: r("action.redo"),
							disabled: !n.canRedo.value,
							onClick: n.actions.redo
						}),
						/* @__PURE__ */ Q("h2", {
							class: "sc-topbar__title",
							children: r("title")
						})
					]
				}), /* @__PURE__ */ Q("div", {
					class: "sc-topbar__group sc-topbar__end",
					children: [
						/* @__PURE__ */ Q("div", {
							class: "sc-only-desktop",
							children: /* @__PURE__ */ Q(jp, {})
						}),
						/* @__PURE__ */ Q(Op, {}),
						/* @__PURE__ */ Q("div", {
							class: g ? "sc-only-desktop" : "sc-hidden",
							children: h
						})
					]
				})]
			}),
			/* @__PURE__ */ Q("nav", {
				class: "sc-rail",
				part: "rail",
				"aria-label": r("nav.sections"),
				children: i.map((e) => m(e, "rail"))
			}),
			/* @__PURE__ */ Q(Dp, {}),
			/* @__PURE__ */ Q("section", {
				class: "sc-panel",
				part: "panel",
				"aria-labelledby": "sc-panel-title",
				children: s && /* @__PURE__ */ Q(I, { children: [
					/* @__PURE__ */ Q("header", {
						class: "sc-panel__head",
						part: "panel-header",
						children: [/* @__PURE__ */ Q("p", {
							class: "sc-panel__step",
							children: [
								c + 1,
								" / ",
								i.length
							]
						}), /* @__PURE__ */ Q("h3", {
							id: "sc-panel-title",
							class: "sc-panel__title",
							tabIndex: -1,
							ref: l,
							children: lp(e, s)
						})]
					}),
					/* @__PURE__ */ Q("div", {
						class: "sc-panel__body",
						children: /* @__PURE__ */ Q(Sp, { section: s })
					}),
					/* @__PURE__ */ Q("footer", {
						class: "sc-panel__foot",
						part: "panel-footer",
						children: [/* @__PURE__ */ Q("div", {
							class: "sc-panel__nav",
							children: [/* @__PURE__ */ Q("button", {
								type: "button",
								class: "sc-btn sc-btn--ghost",
								disabled: c <= 0,
								onClick: () => f(i[c - 1]),
								children: [
									/* @__PURE__ */ Q($, {
										name: "chevronLeft",
										size: 18
									}),
									" ",
									r("nav.previous")
								]
							}), c < i.length - 1 && /* @__PURE__ */ Q("button", {
								type: "button",
								class: "sc-btn sc-btn--secondary",
								onClick: () => f(i[c + 1]),
								children: [
									r("nav.next"),
									" ",
									/* @__PURE__ */ Q($, {
										name: "chevronRight",
										size: 18
									})
								]
							})]
						}), !g && /* @__PURE__ */ Q("div", {
							class: "sc-panel__finish sc-only-desktop",
							children: h
						})]
					})
				] })
			}),
			/* @__PURE__ */ Q("div", {
				class: "sc-bottom sc-only-mobile",
				children: [/* @__PURE__ */ Q("nav", {
					class: "sc-bottomnav",
					"aria-label": r("nav.sections"),
					children: [i.slice(0, i.length > 5 ? Mp : i.length).map((e) => m(e, "bottom")), i.length > 5 && /* @__PURE__ */ Q("button", {
						type: "button",
						class: "sc-navitem sc-navitem--bottom",
						"aria-expanded": u,
						onClick: () => d(!u),
						children: [/* @__PURE__ */ Q("span", {
							class: "sc-navitem__icon",
							children: /* @__PURE__ */ Q($, {
								name: "more",
								size: 22
							})
						}), /* @__PURE__ */ Q("span", {
							class: "sc-navitem__label",
							children: r("nav.more")
						})]
					})]
				}), /* @__PURE__ */ Q("div", {
					class: "sc-actionbar",
					children: [/* @__PURE__ */ Q(jp, {}), h]
				})]
			}),
			u && /* @__PURE__ */ Q("div", {
				class: "sc-sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": r("nav.sections"),
				onKeyDown: (e) => e.key === "Escape" && d(!1),
				children: [/* @__PURE__ */ Q("div", {
					class: "sc-sheet__backdrop",
					onClick: () => d(!1)
				}), /* @__PURE__ */ Q("div", {
					class: "sc-sheet__body",
					children: [/* @__PURE__ */ Q("header", {
						class: "sc-sheet__head",
						children: [/* @__PURE__ */ Q("h3", {
							class: "sc-subtitle",
							children: r("nav.sections")
						}), /* @__PURE__ */ Q(bf, {
							icon: "close",
							label: r("action.close"),
							onClick: () => d(!1)
						})]
					}), /* @__PURE__ */ Q("div", {
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
function Pp() {
	let e = Gr(), { config: t, store: n, t: r } = e, i = e.sections.value, a = n.ui.value, o = n.design.value, s = a.section && i.includes(a.section) ? a.section : i[0] ?? null, c = ze(null), l = e.status.value, u = (e, t = !1) => {
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
	}, f = /* @__PURE__ */ Q("button", {
		type: "button",
		class: "sc-btn sc-btn--cta",
		part: "finish",
		onClick: e.onFinish,
		children: r("action.finish")
	}), p = t.finishPosition === "top";
	return /* @__PURE__ */ Q("div", {
		class: `sc-skin sc-couffo${p ? " has-topbar" : ""}`,
		"data-side": t.panelSide,
		children: [
			p && /* @__PURE__ */ Q("header", {
				class: "sc-topbar sc-topbar--slim",
				part: "topbar",
				children: [/* @__PURE__ */ Q("div", {
					class: "sc-topbar__group",
					children: [
						/* @__PURE__ */ Q(bf, {
							icon: "undo",
							label: r("action.undo"),
							disabled: !n.canUndo.value,
							onClick: n.actions.undo
						}),
						/* @__PURE__ */ Q(bf, {
							icon: "redo",
							label: r("action.redo"),
							disabled: !n.canRedo.value,
							onClick: n.actions.redo
						}),
						/* @__PURE__ */ Q("h2", {
							class: "sc-topbar__title",
							children: r("title")
						})
					]
				}), /* @__PURE__ */ Q("div", {
					class: "sc-only-desktop",
					children: f
				})]
			}),
			/* @__PURE__ */ Q(Dp, { toolbarExtra: !p && /* @__PURE__ */ Q(I, { children: [
				/* @__PURE__ */ Q("span", { class: "sc-toolbar__sep" }),
				/* @__PURE__ */ Q(bf, {
					icon: "undo",
					label: r("action.undo"),
					disabled: !n.canUndo.value,
					onClick: n.actions.undo
				}),
				/* @__PURE__ */ Q(bf, {
					icon: "redo",
					label: r("action.redo"),
					disabled: !n.canRedo.value,
					onClick: n.actions.redo
				})
			] }) }),
			/* @__PURE__ */ Q("div", {
				class: "sc-steps",
				part: "steps",
				ref: c,
				children: i.map((t, n) => {
					let a = t === s, c = up(e, t, o), f = l[t];
					return /* @__PURE__ */ Q("section", {
						class: `sc-step${a ? " is-open" : ""}`,
						part: "step",
						children: [/* @__PURE__ */ Q("h3", {
							class: "sc-step__h",
							children: /* @__PURE__ */ Q("button", {
								type: "button",
								class: "sc-step__head",
								part: "step-header",
								"data-step": t,
								"aria-expanded": a,
								"aria-controls": `sc-step-${t}`,
								onClick: () => u(a ? null : t),
								onKeyDown: (e) => d(e, n),
								children: [
									/* @__PURE__ */ Q("span", {
										class: "sc-step__num",
										"aria-hidden": "true",
										children: f === "todo" ? "!" : n + 1
									}),
									/* @__PURE__ */ Q("span", {
										class: "sc-step__label",
										children: [/* @__PURE__ */ Q("span", {
											class: "sc-step__title",
											children: lp(e, t)
										}), !a && c && /* @__PURE__ */ Q("span", {
											class: "sc-step__summary",
											title: c,
											children: c
										})]
									}),
									f === "todo" ? /* @__PURE__ */ Q("span", {
										class: "sc-dot",
										"aria-label": r("nav.todo")
									}) : c && !a ? /* @__PURE__ */ Q($, {
										name: "check",
										size: 16,
										class: "sc-step__ok"
									}) : null,
									/* @__PURE__ */ Q($, {
										name: "chevronDown",
										size: 18,
										class: "sc-step__chev"
									})
								]
							})
						}), a && /* @__PURE__ */ Q("div", {
							class: "sc-step__body",
							id: `sc-step-${t}`,
							part: "step-body",
							children: [/* @__PURE__ */ Q(Sp, { section: t }), /* @__PURE__ */ Q("div", {
								class: "sc-step__next",
								children: n < i.length - 1 ? /* @__PURE__ */ Q("button", {
									type: "button",
									class: "sc-btn sc-btn--secondary",
									onClick: () => u(i[n + 1], !0),
									children: [
										r("nav.next"),
										" ",
										/* @__PURE__ */ Q($, {
											name: "chevronRight",
											size: 18
										})
									]
								}) : /* @__PURE__ */ Q("button", {
									type: "button",
									class: "sc-btn sc-btn--secondary",
									onClick: e.onFinish,
									children: [
										r("nav.toRecap"),
										" ",
										/* @__PURE__ */ Q($, {
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
			/* @__PURE__ */ Q("footer", {
				class: "sc-bottombar",
				part: "bottombar",
				children: [/* @__PURE__ */ Q("div", {
					class: "sc-only-desktop",
					children: /* @__PURE__ */ Q(jp, {})
				}), /* @__PURE__ */ Q("div", {
					class: "sc-bottombar__end",
					children: [/* @__PURE__ */ Q(Op, {}), /* @__PURE__ */ Q("div", {
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
var Fp = () => new Promise((e) => requestAnimationFrame(() => e()));
async function Ip(e) {
	let { config: t, store: n } = e, r = e.scene.current, i = n.design.value, a = n.ui.value, o = t.doubleSided ? ["front", "back"] : ["front"], s = [];
	e.capturing.current = !0;
	try {
		for (let e of o) n.actions.ui({
			face: e,
			selectedObjectId: null,
			zoom: 1,
			stageView: "design"
		}), await Fp(), await Fp(), await r?.ready(), s.push({
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
var Lp = {
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
}, Rp = [
	"#6b7179",
	"#868c94",
	"#a3a9b0"
], zp = "#d5d9de", Bp = 3;
function Vp(e, t) {
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
function Hp(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = n, r.src = e;
	});
}
function Up(e, t, n, r, i, a) {
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
function Wp({ images: e }) {
	let t = Gr(), { config: n, store: r, t: i } = t, a = r.ui.value, o = r.design.value, s = !!e.back, [c, l] = L(Lp.front), [u, d] = L(100), [f, p] = L(!1), [m, h] = L({
		w: 0,
		h: 0
	}), [g, _] = L(null), v = ze(null), y = ze(null), b = ze(0);
	Re(() => {
		let e = v.current;
		if (!e) return;
		let t = new ResizeObserver(() => h({
			w: e.clientWidth,
			h: e.clientHeight
		}));
		return t.observe(e), () => t.disconnect();
	}, []), Re(() => {
		if (!e.front) return;
		let t = !0;
		return (async () => {
			let n = await Hp(e.front), r = e.back ? await Hp(e.back).catch(() => null) : null;
			t && _({
				front: n,
				back: r ?? Vp(n, zp),
				backIsCapture: !!r,
				edges: Rp.map((e) => Vp(n, e))
			});
		})(), () => {
			t = !1;
		};
	}, [e.front, e.back]);
	let x = g ? {
		w: g.front.naturalWidth,
		h: g.front.naturalHeight
	} : null, S = x && m.w && m.h ? Math.min(m.w * .82 / x.w, m.h * .82 / x.h) : 0, C = x ? x.w * S * (u / 100) : 0, w = x ? x.h * S * (u / 100) : 0, T = dr(n, o), E = n.thickness.find((e) => e.id === o.thicknessId), D = E ? Bn(E.value, E.unit ?? n.unit, n.unit) : Bn(Bp, "mm", n.unit), O = Math.min(1, D / Math.max(1e-6, Math.max(T.width, T.height))), k = E?.unit ? Math.min(C / 2, Math.max(1.5, C * D / Math.max(1e-6, T.width))) : C * Math.min(.07, .012 + .07 * Math.sqrt(O));
	Re(() => {
		let e = y.current;
		if (!e || !g || !C) return;
		let t = Math.min(2, window.devicePixelRatio || 1), n = Math.round(m.w * t), r = Math.round(m.h * t);
		(e.width !== n || e.height !== r) && (e.width = n, e.height = r), Up(e, g, c, C, w, k);
	}, [
		g,
		c,
		C,
		w,
		k,
		m.w,
		m.h
	]), Re(() => () => cancelAnimationFrame(b.current), []);
	let A = Object.keys(Lp).find((e) => Math.abs(((c.yaw - Lp[e].yaw) % 360 + 360) % 360) < .01 && Math.abs(Lp[e].pitch - c.pitch) < .01) ?? null, j = Math.cos(c.yaw * Math.PI / 180) < 0, M = ze(null), N = (e) => {
		cancelAnimationFrame(b.current), e.currentTarget.setPointerCapture(e.pointerId), M.current = {
			x: e.clientX,
			y: e.clientY,
			...c
		}, p(!0);
	}, P = (e) => {
		let t = M.current;
		t && l({
			yaw: t.yaw + (e.clientX - t.x) * .5,
			pitch: Math.max(-30, Math.min(30, t.pitch - (e.clientY - t.y) * .3))
		});
	}, F = () => {
		M.current = null, p(!1);
	}, I = (e) => {
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
	}, ee = (e) => {
		let t = e.shiftKey ? 45 : 15;
		if (e.key === "ArrowLeft") I({
			...c,
			yaw: c.yaw - t
		});
		else if (e.key === "ArrowRight") I({
			...c,
			yaw: c.yaw + t
		});
		else if (e.key === "ArrowUp") I({
			...c,
			pitch: Math.min(30, c.pitch + 5)
		});
		else if (e.key === "ArrowDown") I({
			...c,
			pitch: Math.max(-30, c.pitch - 5)
		});
		else return;
		e.preventDefault();
	}, te = (e) => {
		let t = Lp[e], n = Math.round((c.yaw - t.yaw) / 360);
		I({
			yaw: t.yaw + n * 360,
			pitch: t.pitch
		});
	}, ne = (e) => d((t) => Math.min(300, Math.max(50, t + e))), re = [
		"front",
		"angled",
		"side",
		"back"
	], ie = (e) => e === "back" && s ? n.doubleSided?.back || i("stage.back") : i(`preview.${e}`);
	return /* @__PURE__ */ Q("div", {
		class: "sc-viewer",
		children: [/* @__PURE__ */ Q("div", {
			class: `sc-viewer__stage${a.sceneUrl ? " has-scene" : ""}`,
			style: a.sceneUrl ? { backgroundImage: `url("${a.sceneUrl.replace(/"/g, "%22")}")` } : void 0,
			children: [
				/* @__PURE__ */ Q("div", {
					class: "sc-viewer__top",
					children: [/* @__PURE__ */ Q(Ef, {
						size: "sm",
						label: i("preview.view"),
						value: A ?? "",
						onChange: te,
						options: re.map((e) => ({
							value: e,
							label: ie(e)
						}))
					}), /* @__PURE__ */ Q("div", {
						class: "sc-viewer__zoom",
						role: "group",
						"aria-label": i("preview.zoom"),
						children: [
							/* @__PURE__ */ Q(bf, {
								icon: "zoomOut",
								label: i("stage.zoomOut"),
								disabled: u <= 50,
								onClick: () => ne(-10)
							}),
							/* @__PURE__ */ Q("span", {
								class: "sc-viewer__value",
								"aria-live": "polite",
								children: [u, " %"]
							}),
							/* @__PURE__ */ Q(bf, {
								icon: "zoomIn",
								label: i("stage.zoomIn"),
								disabled: u >= 300,
								onClick: () => ne(10)
							}),
							/* @__PURE__ */ Q(bf, {
								icon: "fit",
								label: i("preview.fit"),
								onClick: () => {
									d(100), te("front");
								}
							})
						]
					})]
				}),
				/* @__PURE__ */ Q("div", {
					ref: v,
					class: `sc-viewer__art${f ? " is-dragging" : ""}`,
					tabIndex: 0,
					role: "img",
					"aria-roledescription": i("preview.rotatable"),
					"aria-label": `${i("recap.title")} — ${j ? ie("back") : i("preview.front")}`,
					onPointerDown: N,
					onPointerMove: P,
					onPointerUp: F,
					onPointerCancel: F,
					onKeyDown: ee,
					children: [/* @__PURE__ */ Q("span", {
						class: "sc-viewer__ground",
						"aria-hidden": "true",
						style: C ? { width: `${Math.min(m.w, C * .9)}px` } : void 0
					}), /* @__PURE__ */ Q("canvas", {
						ref: y,
						class: "sc-viewer__canvas",
						"aria-hidden": "true"
					})]
				}),
				/* @__PURE__ */ Q("div", {
					class: "sc-viewer__foot",
					children: [E && /* @__PURE__ */ Q("p", {
						class: "sc-viewer__thickness",
						children: [
							/* @__PURE__ */ Q($, {
								name: "ruler",
								size: 14
							}),
							i("size.thickness"),
							": ",
							Un(E, n.unit, a.displayUnit, t.locale)
						]
					}), /* @__PURE__ */ Q("p", {
						class: "sc-viewer__hint",
						"aria-hidden": "true",
						children: i("preview.dragHint")
					})]
				})
			]
		}), /* @__PURE__ */ Q("div", {
			class: "sc-recap__scenes",
			children: [/* @__PURE__ */ Q("span", {
				class: "sc-small sc-muted",
				children: i("scenes.preview")
			}), /* @__PURE__ */ Q(Pf, {
				value: a.sceneUrl,
				onChange: (e) => r.actions.ui({ sceneUrl: e })
			})]
		})]
	});
}
//#endregion
//#region src/ui/Recap.tsx
var Gp = [
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
];
function Kp({ images: e }) {
	let t = Gr(), { config: n, store: r, t: i } = t, a = r.design.value, o = t.sections.value, s = ze(null);
	Re(() => s.current?.focus(), []);
	let c = (e) => r.actions.ui({
		view: "edit",
		section: e
	}), [l, u] = L(!1), [d, f] = L(null), p = t.onSaveTemplate !== null, m = p ? t.onSaveTemplate : t.onAddToCart, h = (p || !t.preview) && m !== null, g = t.saveKind, [_, v] = L(!1), [y, b] = L({ busy: !1 });
	return /* @__PURE__ */ Q("div", {
		class: "sc-recap",
		part: "recap",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "sc-recap-title",
		onKeyDown: (e) => e.key === "Escape" && r.actions.ui({ view: "edit" }),
		children: [/* @__PURE__ */ Q("div", {
			class: "sc-recap__preview",
			part: "recap-preview",
			children: [/* @__PURE__ */ Q(Wp, { images: e }), /* @__PURE__ */ Q("button", {
				type: "button",
				class: "sc-btn sc-btn--ghost",
				onClick: () => r.actions.ui({ view: "edit" }),
				children: [
					/* @__PURE__ */ Q($, {
						name: "chevronLeft",
						size: 18
					}),
					" ",
					i("action.backToEdit")
				]
			})]
		}), /* @__PURE__ */ Q("div", {
			class: "sc-recap__side",
			children: [
				/* @__PURE__ */ Q("h2", {
					id: "sc-recap-title",
					class: "sc-recap__title",
					tabIndex: -1,
					ref: s,
					children: i("recap.title")
				}),
				/* @__PURE__ */ Q("div", {
					class: "sc-recap__groups",
					children: Gp.map((e) => {
						let n = e.sections.filter((e) => o.includes(e)).map((e) => ({
							s: e,
							v: up(t, e, a)
						})).filter((e) => e.v);
						return n.length ? /* @__PURE__ */ Q("section", {
							class: "sc-recap__group",
							part: "recap-group",
							children: [/* @__PURE__ */ Q("header", { children: [/* @__PURE__ */ Q("h3", {
								class: "sc-subtitle",
								children: i(`recap.${e.key}`)
							}), /* @__PURE__ */ Q("button", {
								type: "button",
								class: "sc-linkbtn",
								onClick: () => c(n[0].s),
								children: i("action.edit")
							})] }), /* @__PURE__ */ Q("dl", { children: n.map(({ s: e, v: n }) => /* @__PURE__ */ Q("div", {
								class: "sc-recap__row",
								children: [/* @__PURE__ */ Q("dt", { children: lp(t, e) }), /* @__PURE__ */ Q("dd", { children: n })]
							}, e)) })]
						}, e.key) : null;
					})
				}),
				/* @__PURE__ */ Q("div", {
					class: "sc-recap__buy",
					part: "recap-price",
					children: [
						/* @__PURE__ */ Q(jp, {}),
						/* @__PURE__ */ Q(Op, {}),
						/* @__PURE__ */ Q("button", {
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
										let e = await m(await Ip(t));
										e.success ? p && v(!0) : f(e.message || i(p ? `${g}.error` : "cart.error"));
									} catch (e) {
										f(e instanceof Error ? e.message : i("cart.error"));
									} finally {
										u(!1);
									}
								}
							},
							children: [
								/* @__PURE__ */ Q($, {
									name: p ? "check" : "cart",
									size: 18
								}),
								" ",
								l ? i(p ? `${g}.saving` : "cart.adding") : p ? i(`${g}.save`) : n.quote.enabled ? i("action.quote") : i("action.addToCart")
							]
						}),
						_ && /* @__PURE__ */ Q("p", {
							class: "sc-success",
							role: "status",
							children: i(`${g}.saved`)
						}),
						d && /* @__PURE__ */ Q("p", {
							class: "sc-error",
							role: "alert",
							children: d
						}),
						t.onShare && !p && !t.preview && /* @__PURE__ */ Q("div", {
							class: "sc-share",
							children: [
								/* @__PURE__ */ Q("button", {
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
										/* @__PURE__ */ Q($, {
											name: "copy",
											size: 16
										}),
										" ",
										y.busy ? i("share.creating") : i("share.action")
									]
								}),
								y.url && /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q("input", {
									class: "sc-input",
									readOnly: !0,
									value: y.url,
									"aria-label": i("share.link"),
									onFocus: (e) => e.currentTarget.select()
								}), /* @__PURE__ */ Q("p", {
									class: "sc-success",
									role: "status",
									children: y.copied ? i("share.copied") : i("share.ready")
								})] }),
								y.url === null && /* @__PURE__ */ Q("p", {
									class: "sc-error",
									role: "alert",
									children: i("share.error")
								})
							]
						}),
						t.preview && !p && /* @__PURE__ */ Q("p", {
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
function qp({ ctx: e, skin: t }) {
	let { vars: n, dark: r } = Ur(e.config.theme), [i, a] = L({
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
	return /* @__PURE__ */ Q(Wr.Provider, {
		value: s,
		children: /* @__PURE__ */ Q("div", {
			class: "sc-root",
			"data-theme": r ? "dark" : "light",
			"data-skin": t,
			style: n,
			lang: e.locale,
			children: e.config.missingRequired.length > 0 ? /* @__PURE__ */ Q(I, { children: [/* @__PURE__ */ Q("div", {
				class: "sc-blocked",
				inert: !0,
				children: Q(t === "couffo" ? Pp : Np, {})
			}), /* @__PURE__ */ Q(Jp, {})] }) : /* @__PURE__ */ Q(I, { children: [Q(t === "couffo" ? Pp : Np, {}), o === "recap" && /* @__PURE__ */ Q(Kp, { images: i })] })
		})
	});
}
function Jp() {
	let { config: e, t } = Ve(Wr);
	return /* @__PURE__ */ Q("div", {
		class: "sc-required",
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": "sc-required-title",
		"aria-describedby": "sc-required-text",
		children: /* @__PURE__ */ Q("div", {
			class: "sc-required__card",
			children: [
				/* @__PURE__ */ Q("h2", {
					id: "sc-required-title",
					class: "sc-required__title",
					children: [/* @__PURE__ */ Q($, {
						name: "info",
						size: 22
					}), t("required.title")]
				}),
				/* @__PURE__ */ Q("p", {
					id: "sc-required-text",
					children: t("required.text")
				}),
				/* @__PURE__ */ Q("ul", {
					class: "sc-required__list",
					children: e.missingRequired.map((e) => /* @__PURE__ */ Q("li", { children: [/* @__PURE__ */ Q($, {
						name: e,
						size: 20
					}), t(`section.${e}`)] }, e))
				}),
				/* @__PURE__ */ Q("p", {
					class: "sc-muted sc-small",
					children: t("required.hint")
				})
			]
		})
	});
}
//#endregion
//#region src/integrations/aso/cart.ts
var Yp = "ascwo_add_custom_design_to_cart";
function Xp(e, t = new FormData()) {
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
async function Zp(e, t) {
	if (typeof window.add_to_cart_shopify == "function") return window.add_to_cart_shopify(e, t.redirectToCheckOut);
	if (!t.ajaxUrl) return {
		success: !1,
		message: "Missing add-to-cart endpoint"
	};
	let n = Xp({
		action: Yp,
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
var Qp = {
	all: "All",
	addToCart: "Add to cart",
	customize: "Customize",
	noSize: "",
	emptyTitle: "No templates available",
	emptyDescription: "There are no visible templates for this configuration yet."
}, $p = (e, t) => ({
	all: e.allTemplatesText || e.all || t.all,
	addToCart: e.templateAddToCartButton || e.textAddToCart || e.addToCart || t.addToCart,
	customize: e.templateDesignButton || e.productDesignButton || e.customize || t.customize,
	noSize: e.noSize ?? t.noSize,
	emptyTitle: e.emptyTitle || t.emptyTitle,
	emptyDescription: e.emptyDescription || t.emptyDescription
});
function em(e, t, n = Qp) {
	return $p({
		...e.languageImages?.templates ?? {},
		...e.buttons ?? {},
		...t?.languageImages?.templates ?? {},
		...t?.buttons ?? {}
	}, n);
}
var tm = (e, t = 0) => e.id ?? e.templateId ?? e._index ?? t;
function nm(e, t) {
	let n = Array.isArray(e.templates) ? e.templates : [];
	return t ? n.filter((e) => String(e.categoryId ?? "") === t) : n;
}
var rm = (e) => Number(e) || 0;
function im(...e) {
	for (let t of e) {
		let e = t?.settings?.generals ?? t?.data?.settings?.generals ?? t?.config?.data?.settings?.generals ?? t?.config?.settings?.generals ?? t?.generals;
		if (e?.discounts && typeof e.discounts == "object") return e.discounts;
	}
	return null;
}
function am(e, t) {
	let n = ["percent", "fixed"].includes(t?.discount) ? t.discount : "none", r = rm(t?.discountValue);
	return r <= 0 || n === "none" ? e : n === "percent" ? e * (1 - Math.min(r, 100) / 100) : Math.max(0, e - r);
}
function om(e, t, ...n) {
	let r = im(...n);
	if (!r) return e;
	if (!r.byQuantity) return am(e, r);
	let i = (Array.isArray(r.lots) ? r.lots : []).filter((e) => t >= rm(e?.quantity)).sort((e, t) => rm(t?.quantity) - rm(e?.quantity))[0];
	return i ? am(e, i) : e;
}
function sm(e, t, n = {}) {
	return om(rm(e.recaps?.customPrice), 1, e, t, n) + rm(e.basePrice ?? t.regularPrice ?? n.regularPrice);
}
function cm(e, t, n, r = {}) {
	let i = encodeURIComponent(String(tm(e, t))), a = String(e.designPageUrl || e.design_page_url || n.designPageUrl || n.design_page_url || "").trim();
	if (a) return a.includes("{templateId}") ? a.replace("{templateId}", i) : `${a.replace(/\/?$/, "/")}${i}/`;
	let o = n.productId || r.productId || "", s = String(r.siteUrl || location.origin).replace(/\/$/, "");
	return o ? `${s}/configurator-page/ascwo-design/${encodeURIComponent(String(o))}/${i}/` : "#";
}
function lm(e) {
	let t = String(e ?? "").trim();
	return !t || /^(https?:|blob:|data:|\/)/.test(t) ? t : /^(uploads|aso_default_files|images|assets)\//.test(t) ? `/${t}` : t;
}
function um(e) {
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
async function dm(e, t) {
	if (!e.enableAddToCart) return { success: !1 };
	if (typeof window.addTemplateToCartShopify == "function") return await window.addTemplateToCartShopify(e), { success: !0 };
	let n = e, r = e.configId || t.data.configId, i = String(t.restUrl || t.data.rest_url || "").replace(/\/$/, "");
	if (i && r && !e.data?.cartData) {
		let a = await fetch(`${i}/templates/${r}/${tm(e)}`, {
			credentials: "same-origin",
			headers: t.restNonce ? { "X-WP-Nonce": t.restNonce } : {}
		});
		a.ok && (n = await a.json() || e);
	}
	let a = om(rm(e.recaps?.customPrice ?? n.data?.cartData?.custom_price), 1, n, e, t.data, t.runtime ?? {}), o = rm(e.basePrice ?? n.basePrice), s = t.data.productId || t.productId || "";
	return Zp({
		recaps: {
			...um(n.data?.cartData),
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
function fm({ data: e, t, money: n, resolveImage: r, runtime: i = {}, linkOptions: a, onAddToCart: o }) {
	let [s, c] = L(""), [l, u] = L(null), [d, f] = L(null), p = {
		all: t("templates.all"),
		addToCart: t("templates.addToCart"),
		customize: t("templates.customize"),
		noSize: "",
		emptyTitle: t("templates.emptyTitle"),
		emptyDescription: t("templates.emptyDescription")
	}, m = em(e, void 0, p), h = Array.isArray(e.categories) ? e.categories : [], g = nm(e, s), _ = async (e) => {
		if (!o) return;
		let t = String(tm(e));
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
	return /* @__PURE__ */ Q("section", {
		class: "sc-tpl",
		children: [h.length > 0 && /* @__PURE__ */ Q("div", {
			class: "sc-tpl-tabs",
			role: "tablist",
			"aria-label": t("templates.categories"),
			children: [{
				name: m.all,
				value: ""
			}, ...h].map((e) => /* @__PURE__ */ Q("button", {
				type: "button",
				role: "tab",
				class: `sc-chip${s === String(e.value) ? " is-on" : ""}`,
				"aria-selected": s === String(e.value),
				onClick: () => c(String(e.value)),
				children: e.name
			}, String(e.value)))
		}), g.length === 0 ? /* @__PURE__ */ Q("div", {
			class: "sc-empty",
			children: [/* @__PURE__ */ Q("h3", { children: m.emptyTitle }), /* @__PURE__ */ Q("p", {
				class: "sc-muted",
				children: m.emptyDescription
			})]
		}) : /* @__PURE__ */ Q("ul", {
			class: "sc-tpl-grid",
			children: g.map((s, c) => {
				let u = String(tm(s, c)), f = em(e, s, p), m = String(s.name ?? "");
				return /* @__PURE__ */ Q("li", {
					class: "sc-tpl-card",
					children: [/* @__PURE__ */ Q("div", {
						class: "sc-tpl-media",
						children: [s.prevImg ? /* @__PURE__ */ Q("img", {
							src: r(s.prevImg),
							alt: m,
							loading: "lazy"
						}) : /* @__PURE__ */ Q("span", {
							"aria-hidden": "true",
							children: m.slice(0, 2).toUpperCase()
						}), s.realImg && /* @__PURE__ */ Q("img", {
							class: "sc-tpl-real",
							src: r(s.realImg),
							alt: "",
							loading: "lazy"
						})]
					}), /* @__PURE__ */ Q("div", {
						class: "sc-tpl-body",
						children: [
							/* @__PURE__ */ Q("h3", { children: m }),
							/* @__PURE__ */ Q("p", {
								class: "sc-muted sc-small",
								children: s.recaps?.size || f.noSize
							}),
							/* @__PURE__ */ Q("p", {
								class: "sc-tpl-price",
								children: [
									/* @__PURE__ */ Q("strong", { children: n(sm(s, e, i)) }),
									" ",
									s.recaps?.priceType && /* @__PURE__ */ Q("span", {
										class: "sc-muted sc-small",
										children: s.recaps.priceType
									})
								]
							}),
							/* @__PURE__ */ Q("div", {
								class: "sc-tpl-actions",
								children: [/* @__PURE__ */ Q("a", {
									class: "sc-btn sc-btn--cta",
									href: cm(s, c, e, a),
									children: [
										/* @__PURE__ */ Q($, {
											name: "edit",
											size: 18
										}),
										" ",
										f.customize
									]
								}), s.enableAddToCart && o && /* @__PURE__ */ Q("button", {
									type: "button",
									class: "sc-btn sc-btn--secondary",
									disabled: l === u,
									"aria-busy": l === u,
									onClick: () => void _(s),
									children: [
										/* @__PURE__ */ Q($, {
											name: "cart",
											size: 18
										}),
										" ",
										l === u ? t("cart.adding") : f.addToCart
									]
								})]
							}),
							d?.id === u && /* @__PURE__ */ Q("p", {
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
var pm = (e, t) => String(e ?? "").trim() !== "" && String(e ?? "").trim() === String(t ?? "").trim();
function mm(e, t) {
	let n = e?.data?.requiredOptions?.components?.items ?? [];
	if (!n.length) return null;
	let r = n.findIndex((e, n) => pm(e?.id, t.componentId) || pm(e?.id, t.componentRef) || pm(n, t.componentId) || pm(n, t.componentRef));
	r < 0 && (r = 0);
	let i = Array.isArray(n[r].options) ? n[r].options : [];
	if (!i.length) return null;
	let a = i.findIndex((e, n) => pm(e?.id, t.optionId) || pm(n, t.optionIndex));
	return a < 0 && (a = Math.max(0, i.findIndex((e) => e?.isDefault))), {
		componentIndex: r,
		optionIndex: a,
		componentId: String(n[r].id || `component-${r}`),
		optionId: String(i[a].id ?? "")
	};
}
function hm(e, t) {
	let n = JSON.parse(JSON.stringify(e)), r = n.data.requiredOptions.components.items[t.componentIndex];
	return r && (r.isVisible = !0), n;
}
var gm = (e) => Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [], _m = (e, t) => Array.isArray(e) ? t : {
	...e ?? {},
	items: t
};
function vm(e, t) {
	let n = gm(e);
	if (!n.length || !t) return e;
	let r = n.map((e) => [
		e?.id,
		e?.borderId,
		e?.fixingMethodId,
		e?.shapeId,
		e?.sizeId,
		e?.colorId
	].some((e) => pm(e, t)));
	return r.some(Boolean) ? _m(e, n.map((e, t) => ({
		...e,
		isDefault: r[t]
	}))) : e;
}
var ym = (e, t = 0) => Math.round(e * 10 ** t) / 10 ** t || 0;
function bm(e, t) {
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
function xm(e, t, n, r) {
	let i = JSON.parse(JSON.stringify(e));
	i.sizes = vm(i.sizes, n.sizeId), i.shapes = vm(i.shapes, n.shapeId), i.fixingMethods = vm(i.fixingMethods, n.fixingId), i.borders = vm(i.borders, n.borderId), i.backgrounds = vm(i.backgrounds, n.colorId), i.lightings = vm(i.lightings, n.lightingId);
	let a = dr(t, n), o = ir(t, a), s = (e) => n.objects.find((t) => t.zoneId === e), c = (e, t, n) => e.measure === "percent" ? {
		x: ym(t / (a.width / 2) * 100, 2),
		y: ym(-n / (a.height / 2) * 100, 2)
	} : {
		x: ym(t * o),
		y: ym(-n * o)
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
			width: ym(t.width / a.width * 100, 2),
			height: ym(t.height / a.height * 100, 2),
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
async function Sm(e, t, n, r, i = fetch) {
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
function Cm(e, t) {
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
async function wm(e, t, n, r, i, a = fetch) {
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
function Tm(e) {
	if (e) return e;
	if ("" + new URL("sign-configurator.css", import.meta.url).href + !1) return Pt;
	let t = Array.from(document.querySelectorAll("script[src]")).map((e) => e.src).find((e) => /sign-configurator(\.iife)?\.js(?:[?#]|$)/i.test(e));
	return t ? new URL(Pt.split("/").pop(), t).href : new URL(Pt, document.baseURI).href;
}
function Em(e, t = {}, n = "fr") {
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
function Dm(e, t) {
	let n = typeof e == "string" ? document.querySelector(e) : e;
	if (!n) throw Error(`[sign-configurator] élément introuvable : ${String(e)}`);
	let r = n.shadowRoot ?? n.attachShadow({ mode: "open" });
	r.replaceChildren();
	let i = document.createElement("link");
	return i.rel = "stylesheet", i.href = Tm(t), r.appendChild(i), r;
}
function Om(e, t) {
	let n = Dm(e, t.stylesheetUrl), r = {
		...jn,
		...t.assets
	}, i = t.locale ?? (document.documentElement.lang || "fr"), { vars: a, dark: o } = Ur(gn(t.themeColors)), s = document.createElement("div");
	return s.className = "sc-root sc-host", s.dataset.theme = o ? "dark" : "light", s.lang = i, Object.entries(a).forEach(([e, t]) => s.style.setProperty(e, t)), n.appendChild(s), xe(P(fm, {
		data: t.data,
		t: Nr(i),
		money: (e) => Em(e, t.money, i),
		resolveImage: (e) => In(lm(e), r),
		runtime: t.runtime,
		linkOptions: t.linkOptions,
		onAddToCart: t.onAddToCart
	}), s), { destroy() {
		xe(null, s), n.replaceChildren();
	} };
}
function km(e, t) {
	let n = Dm(e, t.stylesheetUrl), r = {
		...jn,
		...t.assets
	}, i = {
		urls: r,
		resolve: (e) => In(e, r)
	}, a, o = {};
	try {
		a = An(t.configuration, t.managesData, { resolveAsset: i.resolve }), t.optionEditor && (o = t.optionEditor.rights ?? bm(a, t.optionEditor.optionId), a = Cm(a, t.optionEditor.optionId));
	} catch (e) {
		let t = document.createElement("div");
		throw t.setAttribute("role", "alert"), t.className = "sc-fatal", t.textContent = e instanceof Ht ? `Configuration invalide : ${e.problems.join(" · ")}` : String(e), n.appendChild(t), e;
	}
	let s = t.optionEditor ? void 0 : t.templates;
	if (s?.list.length && (a = {
		...a,
		sections: ["templates", ...a.sections]
	}), a.theme.customCss) {
		let e = document.createElement("style");
		e.textContent = a.theme.customCss, n.appendChild(e);
	}
	let c = t.locale ?? (document.documentElement.lang || "fr"), l = Nr(c, a.texts), u = t.optionEditor, d = u ? a.components.find((e) => e.options.some((e) => e.id === u.optionId)) : void 0, f = d ? lr(a, {
		...gr(a),
		objects: [],
		componentId: d.id,
		componentOptionId: u.optionId
	}) : typeof t.initialDesign == "function" ? t.initialDesign(a) : t.initialDesign, p = dt(o), m = _r(a, f ?? void 0), h = dt(a.quantity.min), g = null, _ = () => {};
	if (s?.list.length) {
		let e = dt(null), n = dt(null), r = /* @__PURE__ */ new Map(), i = m.design.peek(), o = dt({ "": Tr(a, lr(a, {
			...gr(a),
			template: null
		}), 1).unit });
		(async () => {
			for (let e of s.list) try {
				let n = r.has(e.id) ? r.get(e.id) : await s.load(e);
				if (r.set(e.id, n), !n) continue;
				let i = lr(a, {
					...n.design(a),
					template: {
						id: e.id,
						basePrice: n.basePrice
					}
				});
				o.value = {
					...o.value,
					[e.id]: Tr(a, i, 1, { templateBasePrice: t.templateBasePrice }).unit
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
					...lr(a, gr(a)),
					template: null
				}), m.actions.ui({
					selectedObjectId: null,
					face: "front"
				}), i = m.design.peek();
			}
		};
		let c = m.design.peek().template?.id ?? null;
		_ = xt(() => {
			let e = m.design.value.template?.id ?? null;
			e !== c && (c = e, s.onApplied?.(e));
		});
	}
	let v = {
		config: a,
		store: m,
		t: l,
		locale: c,
		money: (e) => Em(e, t.money, c),
		price: gt(() => Tr(a, m.design.value, h.value, { templateBasePrice: t.templateBasePrice })),
		quantity: h,
		setQuantity: (e) => h.value = e,
		sections: gt(() => a.sections),
		status: gt(() => Object.fromEntries(a.sections.map((e) => [e, dp(a, e, m.design.value)]))),
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
	return y.className = "sc-host", n.appendChild(y), xe(P(qp, {
		ctx: v,
		skin: t.skin ?? a.skin
	}), y), {
		config: a,
		store: m,
		get scene() {
			return v.scene.current;
		},
		destroy() {
			_(), xe(null, y), n.replaceChildren();
		}
	};
}
//#endregion
//#region src/integrations/aso/recaps.ts
var Am = (e) => Number.parseFloat(e.toFixed(3)).toString(), jm = (e) => Math.round(e * 10) / 10;
function Mm(e) {
	return `data:image/svg+xml;base64,${typeof btoa == "function" ? btoa(unescape(encodeURIComponent(e))) : Buffer.from(e, "utf8").toString("base64")}`;
}
function Nm(e, t, n) {
	if (!e) return "";
	let r = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${t}" height="${n}" viewBox="0 0 ${t} ${n}"><image width="${t}" height="${n}" xlink:href="${e}" href="${e}"/></svg>`;
	return `data:image/svg+xml;base64,${typeof btoa == "function" ? btoa(unescape(encodeURIComponent(r))) : Buffer.from(r, "utf8").toString("base64")}`;
}
function Pm(e, t = {}) {
	let { config: n, design: r, price: i, quantity: a } = e, o = (e, t) => n.texts[e]?.trim() ? n.texts[e].trim() : t, s = n.unit, c = n.doubleSided !== null, l = dr(n, r), u = e.faces.find((e) => e.face === "front"), d = Ju(Jn(n, r).find((e) => e.id === r.shapeId)?.kind ?? "rectangle") === "cut-to-shape", f = d && u?.measure ? {
		width: u.measure.sign.width,
		height: u.measure.sign.height
	} : l, p = Jn(n, r).find((e) => e.id === r.shapeId), m = n.colors.findIndex((e) => e.id === r.colorId), h = n.colors[m], g = r.customColor ? {
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
	}, _ = Yn(n, r).find((e) => e.id === r.borderId), v = n.borderSettings.colors.find((e) => e.id === r.borderColorId), y = !r.customColor && h?.textColor?.sameForBorder && !v, b = d || !_ || _.kind === "none" ? {
		type: d ? "None" : _?.label ?? "None",
		rawType: "none",
		color: null,
		codeHex: null
	} : {
		type: _.label,
		rawType: _.kind,
		color: y ? h?.textColor?.name ?? null : v?.label ?? null,
		codeHex: y ? h?.textColor?.hex ?? null : v?.hex ?? null
	}, x = Xn(n, r).find((e) => e.id === r.fixingId), S = n.lightingEnabled ? nr(n, r).find((e) => e.id === r.lightingId) : void 0, C = n.thickness.find((e) => e.id === r.thicknessId), w = {
		size: {
			label: o("textSize", "Size"),
			value: {
				width: {
					label: o("textWidth", "Width"),
					value: `${Am(f.width)} ${s}`
				},
				height: {
					label: o("textHeight", "Height"),
					value: `${Am(f.height)} ${s}`
				},
				thickness: {
					label: o("thickness", "thickness"),
					value: C ? `${Am(C.value)} ${C.unit ?? s}` : "none"
				}
			}
		},
		shape: {
			label: o("textShape", "Shape"),
			value: p?.label ?? "",
			id: Ju(p?.kind ?? "rectangle")
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
	}, T = (e, t) => {
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
			value: jm(t)
		});
		return {
			width: c(o("textWidth", "width"), r.width),
			height: c(o("textHeight", "height"), r.height),
			left: c(o("textLeft", "Left"), a),
			top: c(o("textTop", "top"), s),
			right: c(o("textRight", "right"), i.width - (r.width + a)),
			bottom: c(o("textBottom", "bottom"), i.height - (r.height + s))
		};
	}, E = (e) => n.fonts.find((t) => t.id === e)?.label ?? "Arial", D = (t) => {
		let n = e.faces.find((e) => e.face === t), i = r.objects.filter((e) => e.face === t);
		return {
			texts: i.flatMap((e) => e.type === "text" ? [{
				id: e.id,
				type: "normal",
				values: T(e, n),
				textContent: e.text,
				bold: e.bold ? "bold" : "normal",
				italic: e.italic ? "italic" : "normal",
				fontFamily: E(e.fontId),
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
				values: T(e, n)
			}] : []),
			qrCodes: i.flatMap((e) => e.type === "qr" ? [{
				id: e.id,
				text: e.value,
				url: n?.measure?.qr[e.id] ?? "",
				values: T(e, n)
			}] : [])
		};
	}, O = D("front"), k = D("back"), A = (e) => c ? {
		face1: O[e],
		face2: k[e]
	} : O[e], j = rr(n, r).flatMap((e) => {
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
	}), M = n.inputs.flatMap((e) => {
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
	}), N = (t) => {
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
			url: Nm(r.preview, 1200, 800)
		} : {
			format: e,
			url: r.preview
		});
		return {
			print: r.printSvg ? Mm(r.printSvg) : Nm(r.print, a, o),
			design: c
		};
	}, P = N("front"), F = c ? N("back") : null;
	return {
		...c ? { faces: {
			face1: n.doubleSided.front,
			face2: n.doubleSided.back
		} } : {},
		sign: w,
		texts: {
			label: o("textOptionText", "Texts"),
			value: A("texts")
		},
		images: {
			label: o("textImage", "Images"),
			value: A("images")
		},
		qrCodes: {
			label: "qr Codes",
			value: A("qrCodes")
		},
		quantity: a,
		additionalComponents: j,
		[c ? "additionnalOptions" : "additionalOptions"]: M,
		printImage: c ? {
			face1: P.print,
			face2: F.print
		} : P.print,
		designImages: c ? {
			face1: P.design,
			face2: F.design
		} : P.design,
		output: {
			prefix: n.output.prefix,
			designDisplayComposition: n.output.designComposition
		},
		custom_price: i.total.toFixed(t.decimals ?? 2)
	};
}
//#endregion
//#region src/integrations/aso/templates.ts
function Fm(e, t) {
	let n = Number(e?.basePrice);
	if (Number.isFinite(n)) return n;
	let r = Number(e?.price?.value), i = Number(e?.data?.cartData?.custom_price);
	if (Number.isFinite(r) && Number.isFinite(i)) return Math.max(0, r - i);
	let a = Number(t);
	return Number.isFinite(a) ? a : 0;
}
var Im = (e) => String(e ?? "").trim().replace(/^ASOFont_/i, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").toLowerCase();
function Lm(e) {
	let t = Number(e.width ?? 0) * Math.abs(Number(e.scaleX ?? 1)), n = Number(e.height ?? 0) * Math.abs(Number(e.scaleY ?? 1)), r = e.originX === "center" ? 0 : e.originX === "right" ? -t / 2 : t / 2, i = e.originY === "center" ? 0 : e.originY === "bottom" ? -n / 2 : n / 2;
	return {
		x: Number(e.left ?? 0) + r,
		y: Number(e.top ?? 0) + i,
		w: t,
		h: n
	};
}
function Rm(e, t, n, r, i = () => 0) {
	let a = Array.isArray(t?.objects) ? t.objects : [], o = a.find((e) => e.name === "safeObject");
	if (!o) return [];
	let s = Lm(o), c = s.w > 0 && r.width > 0 ? s.w / r.width : qu(r.width, r.height, e.unit).pxPerUnit, l = (t) => {
		let n = [Im(t.originalFontFamily), Im(t.fontFamily)];
		return (e.fonts.find((e) => n.includes(Im(e.label)) || t.fontFamilyUrl && e.url === t.fontFamilyUrl) ?? e.fonts.find((e) => e.isDefault) ?? e.fonts[0])?.id ?? "";
	}, u = [];
	return a.forEach((e, t) => {
		let r = Lm(e), a = {
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
function zm(e, t) {
	if (t?.v2?.design) return lr(e, {
		...gr(e),
		...t.v2.design
	});
	let n = gr(e), r = t?.options ?? {}, i = t?.sign ?? {}, a = (e, t) => t == null ? void 0 : e.find((e) => e.id === String(t)) ?? (Number.isInteger(Number(t)) ? e[Number(t)] : void 0);
	n.materialId = e.materials.find((e) => e.id === r.materialId)?.id ?? n.materialId;
	let o = e.sizes.find((e) => e.id === String(r.sizeId)), s = parseFloat(i.size?.width), c = parseFloat(i.size?.height);
	o ? (n.sizeId = o.id, n.customSize = null) : e.customSize && s > 0 && c > 0 && (n.sizeId = null, n.customSize = {
		width: s,
		height: c
	}), n.shapeId = (e.shapes.find((e) => e.id === String(r.shapeId)) ?? e.shapes.find((e) => Ju(e.kind) === i.shape))?.id ?? n.shapeId, n.colorId = (a(e.colors, r.colorId?.face1) ?? e.colors.find((e) => e.label === i.color?.face1?.name))?.id ?? n.colorId, n.borderId = (a(e.borders, r.borderId?.face1) ?? e.borders.find((e) => e.kind === i.border?.face1?.type))?.id ?? n.borderId;
	let l = e.borderSettings.colors.find((e) => e.label === i.border?.face1?.color || e.hex.toLowerCase() === String(i.border?.face1?.codeHex ?? "").toLowerCase());
	l && (n.borderColorId = l.id), n.fixingId = (a(e.fixings, r.fixingId) ?? e.fixings.find((e) => e.kind === i.fixingMethod?.type))?.id ?? n.fixingId;
	let u = e.thickness.find((t) => `${t.value} ${t.unit ?? e.unit}` === i.size?.thickness?.value || String(t.value) === String(i.size?.thickness?.value));
	u && (n.thicknessId = u.id);
	for (let r of Array.isArray(t?.additionalOptions) ? t.additionalOptions : []) {
		let t = e.inputs.find((e) => e.label === r.label);
		t && (t.kind === "yes-no" ? n.inputs[t.id] = r.value === t.yes : t.kind === "dropdown" || t.kind === "cards" ? n.inputs[t.id] = String(r.value) : t.kind === "note" && (n.inputs[t.id] = String(r.value ?? "")));
	}
	let d = dr(e, n), f = Array.isArray(t?.price?.array) ? t.price.array : [], p = (e) => Number(f.find((t) => t.type === "image" && t.name === e)?.price ?? 0) || 0;
	return n.objects = [...Rm(e, t?.template?.face1, "front", d, p), ...Rm(e, t?.template?.face2, "back", d, p)], n.doubleSided = !!(e.doubleSided && n.objects.some((e) => e.face === "back")), lr(e, n);
}
function Bm(e, t, n) {
	let r = dr(e, t), i = qu(r.width, r.height, e.unit), a = i.pxPerUnit, o = i.width / 2, s = i.height / 2, c = (t) => e.fonts.find((e) => e.id === t), l = [{
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
function Vm(e, t, n) {
	let { config: r, design: i, price: a } = e, o = dr(r, i), s = r.shapes.find((e) => e.id === i.shapeId), c = r.borders.find((e) => e.id === i.borderId), l = r.fixings.find((e) => e.id === i.fixingId), u = t.sign, d = (e) => e && "face1" in e ? e : {
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
					ratioScale: qu(o.width, o.height, r.unit).pxPerUnit / {
						mm: 12,
						cm: 120,
						in: 300,
						m: 12e3,
						ft: 3600
					}[r.unit],
					unit: r.unit
				},
				shape: Ju(s?.kind ?? "rectangle"),
				color: d(u?.color?.value),
				border: d(u?.border?.value),
				fixingMethod: { type: l?.kind ?? "none" }
			},
			texts: t.texts?.value,
			images: t.images?.value,
			qrCodes: t.qrCodes?.value,
			designImages: t.designImages,
			template: {
				face1: Bm(r, i, "front"),
				face2: Bm(r, i, "back")
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
var Hm = "aso_share", Um = 1, Wm = () => typeof window < "u" ? window.asoShopifyNcpcApi ?? null : null, Gm = () => typeof Wm()?.shareConfiguration == "function";
function Km(e) {
	let t = new URLSearchParams(e).get(Hm);
	return t && /^[\w-]{4,128}$/.test(t) ? t : null;
}
function qm(e, t) {
	let n = new URL(e);
	return n.searchParams.set(Hm, t), n.toString();
}
var Jm = (e, t) => ({
	_sign: {
		version: Um,
		configId: t
	},
	design: e
});
async function Ym(e, t) {
	let n = Wm();
	if (!n?.shareConfiguration) return null;
	let r = await n.shareConfiguration(Jm(e, t));
	return r?.success && r.share_id ? qm(location.href, String(r.share_id)) : null;
}
async function Xm(e) {
	let t = Wm();
	if (!t?.getSharedConfiguration) return null;
	let n = await t.getSharedConfiguration(e).catch(() => null);
	return n?.success ? n.config ?? null : null;
}
function Zm(e, t) {
	let n = e;
	return !n?._sign || !n.design || typeof n.design != "object" ? null : lr(t, {
		...gr(t),
		...n.design
	});
}
//#endregion
//#region src/aso.ts
var Qm = (e) => ["templates", "templates-list"].includes(String(e.runtime?.mode ?? "")), $m = (e) => !!(e && ((e.currentConfig ?? e.configuration ?? e.config)?.data || Qm(e)));
async function eh(e = window) {
	let t = [
		e.__asoConfiguratorData,
		e.__asoStorefrontRuntimeData,
		e.aso_configurator_data,
		e.ascwo_configurator_data,
		e.asowp_configurator_data
	].find($m);
	if (t) return t;
	if (typeof e.aso_confiurator_dataFunction == "function") {
		let t = await e.aso_confiurator_dataFunction();
		if ($m(t)) return t;
	}
	return null;
}
var th = [
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
function nh(e) {
	let t = Object.fromEntries(th.map((t) => [t, typeof e[t] == "string" ? e[t] : ""]).filter(([, e]) => e)), n = /^(.*)\/images\/[^/]+\/?$/.exec(t.fixing_methods_url ?? t.borders_url ?? "");
	return {
		...n ? Mn(n[1].replace(/\/assets$/, "")) : jn,
		...t
	};
}
async function rh(e, t) {
	let n = String(e.ascwo_data?.rest_url || `${location.origin}/wp-json/ascwo/v1`).replace(/\/$/, ""), r = e.ascwo_data?.rest_nonce ?? "", i = await fetch(`${n}/configs/${encodeURIComponent(t)}/preview`, {
		credentials: "same-origin",
		headers: r ? { "X-WP-Nonce": r } : {}
	}).catch(() => null), a = i?.ok ? await i.json().catch(() => null) : null;
	if (!$m(a ?? void 0)) return null;
	let o = a.currentConfig ?? a.configuration ?? a.config;
	return o && o.id === void 0 && (o.id = Number(t) || t), {
		...e.ascwo_configurator_data ?? {},
		...a
	};
}
function ih() {
	let e = () => {
		for (let e of ["aso-frontend-app", "ascwo-frontend-app"]) {
			let t = document.getElementById(e);
			t && !t.dataset.scMounted && (t.dataset.scMounted = "true", ah(t).catch((e) => console.error("[sign-configurator]", e)));
		}
	};
	e(), new MutationObserver(e).observe(document.documentElement, {
		childList: !0,
		subtree: !0
	});
}
async function ah(e) {
	let t = window, n = e.dataset.route ?? "", r = n === "templates" || t.ascwo_data?.page === "templates", i = !n && t.ascwo_data?.page === "admin" ? /#\/configuration\/(\d+)\/preview/.exec(location.hash)?.[1] ?? "" : "", a = e.dataset.configId && n !== "configurator" && n !== "templates" ? e.dataset.configId : i, o = (a ? await rh(t, a) : null) ?? await eh(t) ?? (r && t.ascwo_templates ? { runtime: { mode: "templates" } } : null), s = "#aso-configurator-loader, .aso-configurator-loader, #ascwo-configurator-loader, .aso-loader-overlay", c = document.querySelector(s) !== null;
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
		Om(e, {
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
			assets: nh(o),
			runtime: o,
			linkOptions: {
				siteUrl: String(t.ascwo_data?.site_url ?? o.site_url ?? ""),
				productId: b
			},
			onAddToCart: (e) => dm(e, {
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
	}, w = (...e) => e.map((e) => C[e]).find((e) => e != null && String(e) !== ""), T = _ === "mini-preview" || w("componentRef", "asoComponentRef", "componentId", "asoComponentId", "optionId", "asoOptionId") ? mm(f, {
		componentId: w("componentId", "asoComponentId"),
		componentRef: w("componentRef", "asoComponentRef"),
		optionId: w("optionId", "asoOptionId"),
		optionIndex: w("optionIndex", "asoOptionIndex")
	}) : null;
	if (T) {
		let n = hm(f, T), r = n.data.requiredOptions.components.items[T.componentIndex].options[T.optionIndex], i = t.__asoPreviewParams, s = String(a || (n.id ?? "")), c = (e) => window.dispatchEvent(new CustomEvent(e.success ? "ascwo:option-configurator-saved" : "ascwo:option-configurator-save-error", { detail: { message: e.message } }));
		km(e, {
			configuration: n,
			managesData: o.managesData,
			preview: !0,
			money: y,
			assets: nh(o),
			optionEditor: {
				optionId: T.optionId,
				onSave: async (e, a) => {
					let l = xm(r, An(n, o.managesData), e, a);
					if (!v) return Sm(s, T, l, String(i?.token ?? o.token ?? ""));
					let u = await wm(String(t.ascwo_data?.rest_url || `${location.origin}/wp-json/ascwo/v1`), s, T, l, t.ascwo_data?.rest_nonce ?? "");
					return c(u), u;
				}
			}
		}), d();
		return;
	}
	let E = o.templates ?? {}, D = E.template ?? {}, O = String(E.currentTemplateId || e.dataset.templateId || e.dataset.asoTemplateId || m?.[2] || D.id || D.templateId || ""), k = String(a || m?.[1] || (f.id ?? "")), A = v ? () => `${j}/${k}/${O}` : () => `${j}/${O}`, j = String(t.ascwo_data?.template_api_url || o.template_api_url || "/api/templates").replace(/\/$/, ""), M = () => {
		let e = t.ascwo_data?.rest_nonce ?? "", n = String(t.ascwo_data?.accessToken ?? o.accessToken ?? o.token ?? "");
		return {
			"Content-Type": "application/json",
			...e ? { "X-WP-Nonce": e } : {},
			...n ? { "Aso-Access-Token": n } : {}
		};
	}, N = _ === "template-maker", P = E.template && Object.keys(E.template).length ? E.template : null;
	N && !P && O && (P = await fetch(A(), {
		credentials: "same-origin",
		headers: M()
	}).then((e) => e.ok ? e.json() : null).catch(() => null));
	let F = P?.data?.templateData, I = !!(F && F.sign?.size), ee = N ? null : Km(location.search), te = ee ? await Xm(ee) : null, ne = String(f.id ?? ""), re = P && (N || E.designFromTemplate) ? Fm(P, o.regularPrice) : 0, ie = o.templates ?? {}, ae = Array.isArray(ie.list) ? ie.list : [], oe = f.data, se = !String(oe.materialType ?? f.materialType ?? "").toLowerCase().startsWith("adv"), ce = oe.settings?.customizerSign?.configOptions?.find((e) => e.type === "templates")?.active !== !1, le = nh(o), ue = /* @__PURE__ */ new Map(), de = async (e, t) => {
		if (!ue.has(t)) {
			let n = v ? `${j}/${e}/${encodeURIComponent(t)}` : `${j}/${encodeURIComponent(t)}`, r = await fetch(n, {
				credentials: "same-origin",
				headers: M()
			}).then((e) => e.ok ? e.json() : null);
			ue.set(t, r);
		}
		return ue.get(t) ?? null;
	}, fe = !N && se && ce && ae.length ? {
		list: ae.map((e, t) => ({
			id: String(e.id ?? e.templateId ?? t),
			name: String(e.name ?? ""),
			image: e.prevImg ? In(lm(e.prevImg), le) : void 0,
			categoryId: e.categoryId === void 0 ? void 0 : String(e.categoryId),
			size: e.recaps?.size || void 0
		})),
		categories: (ie.categories ?? []).map((e) => ({
			value: String(e.value),
			name: String(e.name)
		})),
		labels: {
			description: String(ie.buttons?.templatesSectionDescription ?? "") || void 0,
			all: String(ie.buttons?.allTemplatesText ?? "") || void 0
		},
		load: async (e) => {
			let t = ae.find((t) => String(t.id ?? t.templateId) === e.id), n = await de(String(t?.configId ?? k), e.id), r = n?.data?.templateData;
			return !r || !r.sign?.size ? null : {
				design: (e) => zm(e, r),
				basePrice: Fm(n, o.regularPrice)
			};
		}
	} : void 0;
	km(e, {
		configuration: f,
		managesData: o.managesData,
		preview: _ === "preview" || N,
		initialDesign: te ? (e) => Zm(te, e) ?? (I ? zm(e, F) : null) : I ? (e) => {
			let t = zm(e, F);
			return E.designFromTemplate && O && !N ? {
				...t,
				template: {
					id: O,
					basePrice: re
				}
			} : t;
		} : void 0,
		templates: fe,
		onShare: Gm() && !N ? (e) => Ym(e, ne) : void 0,
		templateBasePrice: N ? 0 : re,
		onSaveTemplate: N ? async (e) => {
			if (!O) return {
				success: !1,
				message: "Missing template id"
			};
			let { templateData: n, cartData: r } = Vm(e, Pm(e, { decimals: p }), re);
			if (v) {
				let e = P ?? {}, t = await fetch(A(), {
					method: "PUT",
					credentials: "same-origin",
					headers: M(),
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
			let i = await fetch(`${j}/config/${O}`, {
				method: "POST",
				credentials: "same-origin",
				headers: M(),
				body: JSON.stringify({
					id: O,
					templateId: O,
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
		assets: nh(o),
		onAddToCart: async (e) => Zp({
			recaps: Pm(e, { decimals: p }),
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
ih();
//#endregion
export { nh as assetUrlsOf, ih as bootAso, eh as readRuntimeData };

//# sourceMappingURL=sign-configurator.js.map