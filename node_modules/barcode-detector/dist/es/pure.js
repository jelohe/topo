var Zr = (o) => {
  throw TypeError(o);
};
var Jr = (o, d, p) => d.has(o) || Zr("Cannot " + p);
var Kr = (o, d, p) => (Jr(o, d, "read from private field"), p ? p.call(o) : d.get(o)), te = (o, d, p) => d.has(o) ? Zr("Cannot add the same private member more than once") : d instanceof WeakSet ? d.add(o) : d.set(o, p), re = (o, d, p, y) => (Jr(o, d, "write to private field"), y ? y.call(o, p) : d.set(o, p), p);
const ee = [
  "Aztec",
  "Codabar",
  "Code128",
  "Code39",
  "Code93",
  "DataBar",
  "DataBarExpanded",
  "DataBarLimited",
  "DataMatrix",
  "DXFilmEdge",
  "EAN-13",
  "EAN-8",
  "ITF",
  "Linear-Codes",
  "Matrix-Codes",
  "MaxiCode",
  "MicroQRCode",
  "None",
  "PDF417",
  "QRCode",
  "rMQRCode",
  "UPC-A",
  "UPC-E"
];
function ro(o) {
  return o.join("|");
}
function eo(o) {
  const d = ne(o);
  let p = 0, y = ee.length - 1;
  for (; p <= y; ) {
    const c = Math.floor((p + y) / 2), P = ee[c], D = ne(P);
    if (D === d)
      return P;
    D < d ? p = c + 1 : y = c - 1;
  }
  return "None";
}
function ne(o) {
  return o.toLowerCase().replace(/_-\[\]/g, "");
}
function no(o, d) {
  return o.Binarizer[d];
}
function ao(o, d) {
  return o.CharacterSet[d];
}
const oo = [
  "Text",
  "Binary",
  "Mixed",
  "GS1",
  "ISO15434",
  "UnknownECI"
];
function io(o) {
  return oo[o.value];
}
function so(o, d) {
  return o.EanAddOnSymbol[d];
}
function uo(o, d) {
  return o.TextMode[d];
}
const st = {
  formats: [],
  tryHarder: !0,
  tryRotate: !0,
  tryInvert: !0,
  tryDownscale: !0,
  binarizer: "LocalAverage",
  isPure: !1,
  downscaleFactor: 3,
  downscaleThreshold: 500,
  minLineCount: 2,
  maxNumberOfSymbols: 255,
  tryCode39ExtendedMode: !1,
  validateCode39CheckSum: !1,
  validateITFCheckSum: !1,
  returnCodabarStartEnd: !1,
  returnErrors: !1,
  eanAddOnSymbol: "Read",
  textMode: "Plain",
  characterSet: "Unknown"
};
function oe(o, d) {
  return {
    ...d,
    formats: ro(d.formats),
    binarizer: no(o, d.binarizer),
    eanAddOnSymbol: so(
      o,
      d.eanAddOnSymbol
    ),
    textMode: uo(o, d.textMode),
    characterSet: ao(
      o,
      d.characterSet
    )
  };
}
function ie(o) {
  return {
    ...o,
    format: eo(o.format),
    eccLevel: o.eccLevel,
    contentType: io(o.contentType)
  };
}
const co = {
  locateFile: (o, d) => {
    const p = o.match(/_(.+?)\.wasm$/);
    return p ? `https://fastly.jsdelivr.net/npm/zxing-wasm@1.3.4/dist/${p[1]}/${o}` : d + o;
  }
};
let ar = /* @__PURE__ */ new WeakMap();
function ir(o, d) {
  var p;
  const y = ar.get(o);
  if (y != null && y.modulePromise && d === void 0)
    return y.modulePromise;
  const c = (p = y == null ? void 0 : y.moduleOverrides) != null ? p : co, P = o({
    ...c
  });
  return ar.set(o, {
    moduleOverrides: c,
    modulePromise: P
  }), P;
}
function lo(o, d) {
  ar.set(o, {
    moduleOverrides: d
  });
}
async function fo(o, d, p = st) {
  const y = {
    ...st,
    ...p
  }, c = await ir(o), { size: P } = d, D = new Uint8Array(await d.arrayBuffer()), B = c._malloc(P);
  c.HEAPU8.set(D, B);
  const V = c.readBarcodesFromImage(
    B,
    P,
    oe(c, y)
  );
  c._free(B);
  const R = [];
  for (let W = 0; W < V.size(); ++W)
    R.push(
      ie(V.get(W))
    );
  return R;
}
async function ho(o, d, p = st) {
  const y = {
    ...st,
    ...p
  }, c = await ir(o), {
    data: P,
    width: D,
    height: B,
    data: { byteLength: V }
  } = d, R = c._malloc(V);
  c.HEAPU8.set(P, R);
  const W = c.readBarcodesFromPixmap(
    R,
    D,
    B,
    oe(c, y)
  );
  c._free(R);
  const N = [];
  for (let H = 0; H < W.size(); ++H)
    N.push(
      ie(W.get(H))
    );
  return N;
}
({
  ...st,
  formats: [...st.formats]
});
var Bt = (() => {
  var o, d = typeof document < "u" && ((o = document.currentScript) == null ? void 0 : o.tagName.toUpperCase()) === "SCRIPT" ? document.currentScript.src : void 0;
  return function(p = {}) {
    var y, c = p, P, D, B = new Promise((t, r) => {
      P = t, D = r;
    }), V = typeof window == "object", R = typeof Bun < "u", W = typeof importScripts == "function";
    typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
    var N = Object.assign({}, c), H = "./this.program", I = "";
    function ut(t) {
      return c.locateFile ? c.locateFile(t, I) : I + t;
    }
    var ct, et;
    if (V || W || R) {
      var lt;
      W ? I = self.location.href : typeof document < "u" && ((lt = document.currentScript) === null || lt === void 0 ? void 0 : lt.tagName.toUpperCase()) === "SCRIPT" && (I = document.currentScript.src), d && (I = d), I.startsWith("blob:") ? I = "" : I = I.substr(0, I.replace(/[?#].*/, "").lastIndexOf("/") + 1), W && (et = (t) => {
        var r = new XMLHttpRequest();
        return r.open("GET", t, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
      }), ct = (t) => fetch(t, {
        credentials: "same-origin"
      }).then((r) => r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.status + " : " + r.url)));
    }
    var kt = c.print || console.log.bind(console), nt = c.printErr || console.error.bind(console);
    Object.assign(c, N), N = null, c.arguments && c.arguments, c.thisProgram && (H = c.thisProgram);
    var wt = c.wasmBinary, $t, sr = !1, L, F, at, ft, Z, E, ur, cr;
    function lr() {
      var t = $t.buffer;
      c.HEAP8 = L = new Int8Array(t), c.HEAP16 = at = new Int16Array(t), c.HEAPU8 = F = new Uint8Array(t), c.HEAPU16 = ft = new Uint16Array(t), c.HEAP32 = Z = new Int32Array(t), c.HEAPU32 = E = new Uint32Array(t), c.HEAPF32 = ur = new Float32Array(t), c.HEAPF64 = cr = new Float64Array(t);
    }
    var fr = [], dr = [], hr = [];
    function me() {
      var t = c.preRun;
      t && (typeof t == "function" && (t = [t]), t.forEach($e)), Vt(fr);
    }
    function ge() {
      Vt(dr);
    }
    function we() {
      var t = c.postRun;
      t && (typeof t == "function" && (t = [t]), t.forEach(Ce)), Vt(hr);
    }
    function $e(t) {
      fr.unshift(t);
    }
    function be(t) {
      dr.unshift(t);
    }
    function Ce(t) {
      hr.unshift(t);
    }
    var J = 0, dt = null;
    function Te(t) {
      var r;
      J++, (r = c.monitorRunDependencies) === null || r === void 0 || r.call(c, J);
    }
    function Pe(t) {
      var r;
      if (J--, (r = c.monitorRunDependencies) === null || r === void 0 || r.call(c, J), J == 0 && dt) {
        var e = dt;
        dt = null, e();
      }
    }
    function Ut(t) {
      var r;
      (r = c.onAbort) === null || r === void 0 || r.call(c, t), t = "Aborted(" + t + ")", nt(t), sr = !0, t += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(t);
      throw D(e), e;
    }
    var Ee = "data:application/octet-stream;base64,", pr = (t) => t.startsWith(Ee);
    function _e() {
      var t = "zxing_reader.wasm";
      return pr(t) ? t : ut(t);
    }
    var bt;
    function vr(t) {
      if (t == bt && wt)
        return new Uint8Array(wt);
      if (et)
        return et(t);
      throw "both async and sync fetching of the wasm failed";
    }
    function Ae(t) {
      return wt ? Promise.resolve().then(() => vr(t)) : ct(t).then((r) => new Uint8Array(r), () => vr(t));
    }
    function yr(t, r, e) {
      return Ae(t).then((n) => WebAssembly.instantiate(n, r)).then(e, (n) => {
        nt(`failed to asynchronously prepare wasm: ${n}`), Ut(n);
      });
    }
    function Oe(t, r, e, n) {
      return !t && typeof WebAssembly.instantiateStreaming == "function" && !pr(r) && typeof fetch == "function" ? fetch(r, {
        credentials: "same-origin"
      }).then((a) => {
        var i = WebAssembly.instantiateStreaming(a, e);
        return i.then(n, function(u) {
          return nt(`wasm streaming compile failed: ${u}`), nt("falling back to ArrayBuffer instantiation"), yr(r, e, n);
        });
      }) : yr(r, e, n);
    }
    function xe() {
      return {
        a: wa
      };
    }
    function De() {
      var t, r = xe();
      function e(a, i) {
        return A = a.exports, $t = A.za, lr(), _r = A.Da, be(A.Aa), Pe(), A;
      }
      Te();
      function n(a) {
        e(a.instance);
      }
      if (c.instantiateWasm)
        try {
          return c.instantiateWasm(r, e);
        } catch (a) {
          nt(`Module.instantiateWasm callback failed with error: ${a}`), D(a);
        }
      return (t = bt) !== null && t !== void 0 || (bt = _e()), Oe(wt, bt, r, n).catch(D), {};
    }
    var Vt = (t) => {
      t.forEach((r) => r(c));
    };
    c.noExitRuntime;
    var w = (t) => Br(t), $ = () => kr(), Ct = [], Tt = 0, Se = (t) => {
      var r = new Ht(t);
      return r.get_caught() || (r.set_caught(!0), Tt--), r.set_rethrown(!1), Ct.push(r), Vr(t), Ir(t);
    }, G = 0, je = () => {
      m(0, 0);
      var t = Ct.pop();
      Ur(t.excPtr), G = 0;
    };
    class Ht {
      constructor(r) {
        this.excPtr = r, this.ptr = r - 24;
      }
      set_type(r) {
        E[this.ptr + 4 >> 2] = r;
      }
      get_type() {
        return E[this.ptr + 4 >> 2];
      }
      set_destructor(r) {
        E[this.ptr + 8 >> 2] = r;
      }
      get_destructor() {
        return E[this.ptr + 8 >> 2];
      }
      set_caught(r) {
        r = r ? 1 : 0, L[this.ptr + 12] = r;
      }
      get_caught() {
        return L[this.ptr + 12] != 0;
      }
      set_rethrown(r) {
        r = r ? 1 : 0, L[this.ptr + 13] = r;
      }
      get_rethrown() {
        return L[this.ptr + 13] != 0;
      }
      init(r, e) {
        this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(e);
      }
      set_adjusted_ptr(r) {
        E[this.ptr + 16 >> 2] = r;
      }
      get_adjusted_ptr() {
        return E[this.ptr + 16 >> 2];
      }
    }
    var Fe = (t) => {
      throw G || (G = t), G;
    }, Pt = (t) => Rr(t), Lt = (t) => {
      var r = G;
      if (!r)
        return Pt(0), 0;
      var e = new Ht(r);
      e.set_adjusted_ptr(r);
      var n = e.get_type();
      if (!n)
        return Pt(0), r;
      for (var a of t) {
        if (a === 0 || a === n)
          break;
        var i = e.ptr + 16;
        if (Hr(a, n, i))
          return Pt(a), r;
      }
      return Pt(n), r;
    }, Me = () => Lt([]), We = (t) => Lt([t]), Ie = (t, r) => Lt([t, r]), Re = () => {
      var t = Ct.pop();
      t || Ut("no exception to throw");
      var r = t.excPtr;
      throw t.get_rethrown() || (Ct.push(t), t.set_rethrown(!0), t.set_caught(!1), Tt++), G = r, G;
    }, Be = (t, r, e) => {
      var n = new Ht(t);
      throw n.init(r, e), G = t, Tt++, G;
    }, ke = () => Tt, Ue = () => {
      Ut("");
    }, Et = {}, zt = (t) => {
      for (; t.length; ) {
        var r = t.pop(), e = t.pop();
        e(r);
      }
    };
    function ht(t) {
      return this.fromWireType(E[t >> 2]);
    }
    var ot = {}, K = {}, _t = {}, mr, At = (t) => {
      throw new mr(t);
    }, tt = (t, r, e) => {
      t.forEach((s) => _t[s] = r);
      function n(s) {
        var l = e(s);
        l.length !== t.length && At("Mismatched type converter count");
        for (var f = 0; f < t.length; ++f)
          k(t[f], l[f]);
      }
      var a = new Array(r.length), i = [], u = 0;
      r.forEach((s, l) => {
        K.hasOwnProperty(s) ? a[l] = K[s] : (i.push(s), ot.hasOwnProperty(s) || (ot[s] = []), ot[s].push(() => {
          a[l] = K[s], ++u, u === i.length && n(a);
        }));
      }), i.length === 0 && n(a);
    }, Ve = (t) => {
      var r = Et[t];
      delete Et[t];
      var e = r.rawConstructor, n = r.rawDestructor, a = r.fields, i = a.map((u) => u.getterReturnType).concat(a.map((u) => u.setterArgumentType));
      tt([t], i, (u) => {
        var s = {};
        return a.forEach((l, f) => {
          var h = l.fieldName, v = u[f], g = l.getter, T = l.getterContext, _ = u[f + a.length], S = l.setter, O = l.setterContext;
          s[h] = {
            read: (x) => v.fromWireType(g(T, x)),
            write: (x, rt) => {
              var M = [];
              S(O, x, _.toWireType(M, rt)), zt(M);
            }
          };
        }), [{
          name: r.name,
          fromWireType: (l) => {
            var f = {};
            for (var h in s)
              f[h] = s[h].read(l);
            return n(l), f;
          },
          toWireType: (l, f) => {
            for (var h in s)
              if (!(h in f))
                throw new TypeError(`Missing field: "${h}"`);
            var v = e();
            for (h in s)
              s[h].write(v, f[h]);
            return l !== null && l.push(n, v), v;
          },
          argPackAdvance: z,
          readValueFromPointer: ht,
          destructorFunction: n
        }];
      });
    }, He = (t, r, e, n, a) => {
    }, Le = () => {
      for (var t = new Array(256), r = 0; r < 256; ++r)
        t[r] = String.fromCharCode(r);
      gr = t;
    }, gr, j = (t) => {
      for (var r = "", e = t; F[e]; )
        r += gr[F[e++]];
      return r;
    }, it, C = (t) => {
      throw new it(t);
    };
    function ze(t, r) {
      let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var n = r.name;
      if (t || C(`type "${n}" must have a positive integer typeid pointer`), K.hasOwnProperty(t)) {
        if (e.ignoreDuplicateRegistrations)
          return;
        C(`Cannot register type '${n}' twice`);
      }
      if (K[t] = r, delete _t[t], ot.hasOwnProperty(t)) {
        var a = ot[t];
        delete ot[t], a.forEach((i) => i());
      }
    }
    function k(t, r) {
      let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return ze(t, r, e);
    }
    var z = 8, Ne = (t, r, e, n) => {
      r = j(r), k(t, {
        name: r,
        fromWireType: function(a) {
          return !!a;
        },
        toWireType: function(a, i) {
          return i ? e : n;
        },
        argPackAdvance: z,
        readValueFromPointer: function(a) {
          return this.fromWireType(F[a]);
        },
        destructorFunction: null
      });
    }, Ge = (t) => ({
      count: t.count,
      deleteScheduled: t.deleteScheduled,
      preservePointerOnDelete: t.preservePointerOnDelete,
      ptr: t.ptr,
      ptrType: t.ptrType,
      smartPtr: t.smartPtr,
      smartPtrType: t.smartPtrType
    }), Nt = (t) => {
      function r(e) {
        return e.$$.ptrType.registeredClass.name;
      }
      C(r(t) + " instance already deleted");
    }, Gt = !1, wr = (t) => {
    }, Xe = (t) => {
      t.smartPtr ? t.smartPtrType.rawDestructor(t.smartPtr) : t.ptrType.registeredClass.rawDestructor(t.ptr);
    }, $r = (t) => {
      t.count.value -= 1;
      var r = t.count.value === 0;
      r && Xe(t);
    }, br = (t, r, e) => {
      if (r === e)
        return t;
      if (e.baseClass === void 0)
        return null;
      var n = br(t, r, e.baseClass);
      return n === null ? null : e.downcast(n);
    }, Cr = {}, Qe = {}, Ye = (t, r) => {
      for (r === void 0 && C("ptr should not be undefined"); t.baseClass; )
        r = t.upcast(r), t = t.baseClass;
      return r;
    }, qe = (t, r) => (r = Ye(t, r), Qe[r]), Ot = (t, r) => {
      (!r.ptrType || !r.ptr) && At("makeClassHandle requires ptr and ptrType");
      var e = !!r.smartPtrType, n = !!r.smartPtr;
      return e !== n && At("Both smartPtrType and smartPtr must be specified"), r.count = {
        value: 1
      }, pt(Object.create(t, {
        $$: {
          value: r,
          writable: !0
        }
      }));
    };
    function Ze(t) {
      var r = this.getPointee(t);
      if (!r)
        return this.destructor(t), null;
      var e = qe(this.registeredClass, r);
      if (e !== void 0) {
        if (e.$$.count.value === 0)
          return e.$$.ptr = r, e.$$.smartPtr = t, e.clone();
        var n = e.clone();
        return this.destructor(t), n;
      }
      function a() {
        return this.isSmartPointer ? Ot(this.registeredClass.instancePrototype, {
          ptrType: this.pointeeType,
          ptr: r,
          smartPtrType: this,
          smartPtr: t
        }) : Ot(this.registeredClass.instancePrototype, {
          ptrType: this,
          ptr: t
        });
      }
      var i = this.registeredClass.getActualType(r), u = Cr[i];
      if (!u)
        return a.call(this);
      var s;
      this.isConst ? s = u.constPointerType : s = u.pointerType;
      var l = br(r, this.registeredClass, s.registeredClass);
      return l === null ? a.call(this) : this.isSmartPointer ? Ot(s.registeredClass.instancePrototype, {
        ptrType: s,
        ptr: l,
        smartPtrType: this,
        smartPtr: t
      }) : Ot(s.registeredClass.instancePrototype, {
        ptrType: s,
        ptr: l
      });
    }
    var pt = (t) => typeof FinalizationRegistry > "u" ? (pt = (r) => r, t) : (Gt = new FinalizationRegistry((r) => {
      $r(r.$$);
    }), pt = (r) => {
      var e = r.$$, n = !!e.smartPtr;
      if (n) {
        var a = {
          $$: e
        };
        Gt.register(r, a, r);
      }
      return r;
    }, wr = (r) => Gt.unregister(r), pt(t)), xt = [], Je = () => {
      for (; xt.length; ) {
        var t = xt.pop();
        t.$$.deleteScheduled = !1, t.delete();
      }
    }, Tr, Ke = () => {
      Object.assign(Dt.prototype, {
        isAliasOf(t) {
          if (!(this instanceof Dt) || !(t instanceof Dt))
            return !1;
          var r = this.$$.ptrType.registeredClass, e = this.$$.ptr;
          t.$$ = t.$$;
          for (var n = t.$$.ptrType.registeredClass, a = t.$$.ptr; r.baseClass; )
            e = r.upcast(e), r = r.baseClass;
          for (; n.baseClass; )
            a = n.upcast(a), n = n.baseClass;
          return r === n && e === a;
        },
        clone() {
          if (this.$$.ptr || Nt(this), this.$$.preservePointerOnDelete)
            return this.$$.count.value += 1, this;
          var t = pt(Object.create(Object.getPrototypeOf(this), {
            $$: {
              value: Ge(this.$$)
            }
          }));
          return t.$$.count.value += 1, t.$$.deleteScheduled = !1, t;
        },
        delete() {
          this.$$.ptr || Nt(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && C("Object already scheduled for deletion"), wr(this), $r(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
        },
        isDeleted() {
          return !this.$$.ptr;
        },
        deleteLater() {
          return this.$$.ptr || Nt(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && C("Object already scheduled for deletion"), xt.push(this), xt.length === 1 && Tr && Tr(Je), this.$$.deleteScheduled = !0, this;
        }
      });
    };
    function Dt() {
    }
    var vt = (t, r) => Object.defineProperty(r, "name", {
      value: t
    }), Pr = (t, r, e) => {
      if (t[r].overloadTable === void 0) {
        var n = t[r];
        t[r] = function() {
          for (var a = arguments.length, i = new Array(a), u = 0; u < a; u++)
            i[u] = arguments[u];
          return t[r].overloadTable.hasOwnProperty(i.length) || C(`Function '${e}' called with an invalid number of arguments (${i.length}) - expects one of (${t[r].overloadTable})!`), t[r].overloadTable[i.length].apply(this, i);
        }, t[r].overloadTable = [], t[r].overloadTable[n.argCount] = n;
      }
    }, Xt = (t, r, e) => {
      c.hasOwnProperty(t) ? ((e === void 0 || c[t].overloadTable !== void 0 && c[t].overloadTable[e] !== void 0) && C(`Cannot register public name '${t}' twice`), Pr(c, t, t), c.hasOwnProperty(e) && C(`Cannot register multiple overloads of a function with the same number of arguments (${e})!`), c[t].overloadTable[e] = r) : (c[t] = r, e !== void 0 && (c[t].numArguments = e));
    }, tn = 48, rn = 57, en = (t) => {
      t = t.replace(/[^a-zA-Z0-9_]/g, "$");
      var r = t.charCodeAt(0);
      return r >= tn && r <= rn ? `_${t}` : t;
    };
    function nn(t, r, e, n, a, i, u, s) {
      this.name = t, this.constructor = r, this.instancePrototype = e, this.rawDestructor = n, this.baseClass = a, this.getActualType = i, this.upcast = u, this.downcast = s, this.pureVirtualFunctions = [];
    }
    var Qt = (t, r, e) => {
      for (; r !== e; )
        r.upcast || C(`Expected null or instance of ${e.name}, got an instance of ${r.name}`), t = r.upcast(t), r = r.baseClass;
      return t;
    };
    function an(t, r) {
      if (r === null)
        return this.isReference && C(`null is not a valid ${this.name}`), 0;
      r.$$ || C(`Cannot pass "${tr(r)}" as a ${this.name}`), r.$$.ptr || C(`Cannot pass deleted object as a pointer of type ${this.name}`);
      var e = r.$$.ptrType.registeredClass, n = Qt(r.$$.ptr, e, this.registeredClass);
      return n;
    }
    function on(t, r) {
      var e;
      if (r === null)
        return this.isReference && C(`null is not a valid ${this.name}`), this.isSmartPointer ? (e = this.rawConstructor(), t !== null && t.push(this.rawDestructor, e), e) : 0;
      (!r || !r.$$) && C(`Cannot pass "${tr(r)}" as a ${this.name}`), r.$$.ptr || C(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && r.$$.ptrType.isConst && C(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
      var n = r.$$.ptrType.registeredClass;
      if (e = Qt(r.$$.ptr, n, this.registeredClass), this.isSmartPointer)
        switch (r.$$.smartPtr === void 0 && C("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
          case 0:
            r.$$.smartPtrType === this ? e = r.$$.smartPtr : C(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
            break;
          case 1:
            e = r.$$.smartPtr;
            break;
          case 2:
            if (r.$$.smartPtrType === this)
              e = r.$$.smartPtr;
            else {
              var a = r.clone();
              e = this.rawShare(e, Q.toHandle(() => a.delete())), t !== null && t.push(this.rawDestructor, e);
            }
            break;
          default:
            C("Unsupporting sharing policy");
        }
      return e;
    }
    function sn(t, r) {
      if (r === null)
        return this.isReference && C(`null is not a valid ${this.name}`), 0;
      r.$$ || C(`Cannot pass "${tr(r)}" as a ${this.name}`), r.$$.ptr || C(`Cannot pass deleted object as a pointer of type ${this.name}`), r.$$.ptrType.isConst && C(`Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`);
      var e = r.$$.ptrType.registeredClass, n = Qt(r.$$.ptr, e, this.registeredClass);
      return n;
    }
    var un = () => {
      Object.assign(St.prototype, {
        getPointee(t) {
          return this.rawGetPointee && (t = this.rawGetPointee(t)), t;
        },
        destructor(t) {
          var r;
          (r = this.rawDestructor) === null || r === void 0 || r.call(this, t);
        },
        argPackAdvance: z,
        readValueFromPointer: ht,
        fromWireType: Ze
      });
    };
    function St(t, r, e, n, a, i, u, s, l, f, h) {
      this.name = t, this.registeredClass = r, this.isReference = e, this.isConst = n, this.isSmartPointer = a, this.pointeeType = i, this.sharingPolicy = u, this.rawGetPointee = s, this.rawConstructor = l, this.rawShare = f, this.rawDestructor = h, !a && r.baseClass === void 0 ? n ? (this.toWireType = an, this.destructorFunction = null) : (this.toWireType = sn, this.destructorFunction = null) : this.toWireType = on;
    }
    var Er = (t, r, e) => {
      c.hasOwnProperty(t) || At("Replacing nonexistent public symbol"), c[t].overloadTable !== void 0 && e !== void 0 ? c[t].overloadTable[e] = r : (c[t] = r, c[t].argCount = e);
    }, cn = (t, r, e) => {
      t = t.replace(/p/g, "i");
      var n = c["dynCall_" + t];
      return n(r, ...e);
    }, jt = [], _r, b = (t) => {
      var r = jt[t];
      return r || (t >= jt.length && (jt.length = t + 1), jt[t] = r = _r.get(t)), r;
    }, ln = function(t, r) {
      let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (t.includes("j"))
        return cn(t, r, e);
      var n = b(r)(...e);
      return n;
    }, fn = (t, r) => function() {
      for (var e = arguments.length, n = new Array(e), a = 0; a < e; a++)
        n[a] = arguments[a];
      return ln(t, r, n);
    }, U = (t, r) => {
      t = j(t);
      function e() {
        return t.includes("j") ? fn(t, r) : b(r);
      }
      var n = e();
      return typeof n != "function" && C(`unknown function pointer with signature ${t}: ${r}`), n;
    }, dn = (t, r) => {
      var e = vt(r, function(n) {
        this.name = r, this.message = n;
        var a = new Error(n).stack;
        a !== void 0 && (this.stack = this.toString() + `
` + a.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.prototype.toString = function() {
        return this.message === void 0 ? this.name : `${this.name}: ${this.message}`;
      }, e;
    }, Ar, Or = (t) => {
      var r = Wr(t), e = j(r);
      return Y(r), e;
    }, Ft = (t, r) => {
      var e = [], n = {};
      function a(i) {
        if (!n[i] && !K[i]) {
          if (_t[i]) {
            _t[i].forEach(a);
            return;
          }
          e.push(i), n[i] = !0;
        }
      }
      throw r.forEach(a), new Ar(`${t}: ` + e.map(Or).join([", "]));
    }, hn = (t, r, e, n, a, i, u, s, l, f, h, v, g) => {
      h = j(h), i = U(a, i), s && (s = U(u, s)), f && (f = U(l, f)), g = U(v, g);
      var T = en(h);
      Xt(T, function() {
        Ft(`Cannot construct ${h} due to unbound types`, [n]);
      }), tt([t, r, e], n ? [n] : [], (_) => {
        _ = _[0];
        var S, O;
        n ? (S = _.registeredClass, O = S.instancePrototype) : O = Dt.prototype;
        var x = vt(h, function() {
          if (Object.getPrototypeOf(this) !== rt)
            throw new it("Use 'new' to construct " + h);
          if (M.constructor_body === void 0)
            throw new it(h + " has no accessible constructor");
          for (var Yr = arguments.length, It = new Array(Yr), Rt = 0; Rt < Yr; Rt++)
            It[Rt] = arguments[Rt];
          var qr = M.constructor_body[It.length];
          if (qr === void 0)
            throw new it(`Tried to invoke ctor of ${h} with invalid number of parameters (${It.length}) - expected (${Object.keys(M.constructor_body).toString()}) parameters instead!`);
          return qr.apply(this, It);
        }), rt = Object.create(O, {
          constructor: {
            value: x
          }
        });
        x.prototype = rt;
        var M = new nn(h, x, rt, g, S, i, s, f);
        if (M.baseClass) {
          var q, Wt;
          (Wt = (q = M.baseClass).__derivedClasses) !== null && Wt !== void 0 || (q.__derivedClasses = []), M.baseClass.__derivedClasses.push(M);
        }
        var to = new St(h, M, !0, !1, !1), Xr = new St(h + "*", M, !1, !1, !1), Qr = new St(h + " const*", M, !1, !0, !1);
        return Cr[t] = {
          pointerType: Xr,
          constPointerType: Qr
        }, Er(T, x), [to, Xr, Qr];
      });
    }, Yt = (t, r) => {
      for (var e = [], n = 0; n < t; n++)
        e.push(E[r + n * 4 >> 2]);
      return e;
    };
    function pn(t) {
      for (var r = 1; r < t.length; ++r)
        if (t[r] !== null && t[r].destructorFunction === void 0)
          return !0;
      return !1;
    }
    function qt(t, r, e, n, a, i) {
      var u = r.length;
      u < 2 && C("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var s = r[1] !== null && e !== null, l = pn(r), f = r[0].name !== "void", h = u - 2, v = new Array(h), g = [], T = [], _ = function() {
        T.length = 0;
        var S;
        g.length = s ? 2 : 1, g[0] = a, s && (S = r[1].toWireType(T, this), g[1] = S);
        for (var O = 0; O < h; ++O)
          v[O] = r[O + 2].toWireType(T, O < 0 || arguments.length <= O ? void 0 : arguments[O]), g.push(v[O]);
        var x = n(...g);
        function rt(M) {
          if (l)
            zt(T);
          else
            for (var q = s ? 1 : 2; q < r.length; q++) {
              var Wt = q === 1 ? S : v[q - 2];
              r[q].destructorFunction !== null && r[q].destructorFunction(Wt);
            }
          if (f)
            return r[0].fromWireType(M);
        }
        return rt(x);
      };
      return vt(t, _);
    }
    var vn = (t, r, e, n, a, i) => {
      var u = Yt(r, e);
      a = U(n, a), tt([], [t], (s) => {
        s = s[0];
        var l = `constructor ${s.name}`;
        if (s.registeredClass.constructor_body === void 0 && (s.registeredClass.constructor_body = []), s.registeredClass.constructor_body[r - 1] !== void 0)
          throw new it(`Cannot register multiple constructors with identical number of parameters (${r - 1}) for class '${s.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
        return s.registeredClass.constructor_body[r - 1] = () => {
          Ft(`Cannot construct ${s.name} due to unbound types`, u);
        }, tt([], u, (f) => (f.splice(1, 0, null), s.registeredClass.constructor_body[r - 1] = qt(l, f, null, a, i), [])), [];
      });
    }, xr = (t) => {
      t = t.trim();
      const r = t.indexOf("(");
      return r !== -1 ? t.substr(0, r) : t;
    }, yn = (t, r, e, n, a, i, u, s, l, f) => {
      var h = Yt(e, n);
      r = j(r), r = xr(r), i = U(a, i), tt([], [t], (v) => {
        v = v[0];
        var g = `${v.name}.${r}`;
        r.startsWith("@@") && (r = Symbol[r.substring(2)]), s && v.registeredClass.pureVirtualFunctions.push(r);
        function T() {
          Ft(`Cannot call ${g} due to unbound types`, h);
        }
        var _ = v.registeredClass.instancePrototype, S = _[r];
        return S === void 0 || S.overloadTable === void 0 && S.className !== v.name && S.argCount === e - 2 ? (T.argCount = e - 2, T.className = v.name, _[r] = T) : (Pr(_, r, g), _[r].overloadTable[e - 2] = T), tt([], h, (O) => {
          var x = qt(g, O, v, i, u);
          return _[r].overloadTable === void 0 ? (x.argCount = e - 2, _[r] = x) : _[r].overloadTable[e - 2] = x, [];
        }), [];
      });
    }, Zt = [], X = [], Jt = (t) => {
      t > 9 && --X[t + 1] === 0 && (X[t] = void 0, Zt.push(t));
    }, mn = () => X.length / 2 - 5 - Zt.length, gn = () => {
      X.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1), c.count_emval_handles = mn;
    }, Q = {
      toValue: (t) => (t || C("Cannot use deleted val. handle = " + t), X[t]),
      toHandle: (t) => {
        switch (t) {
          case void 0:
            return 2;
          case null:
            return 4;
          case !0:
            return 6;
          case !1:
            return 8;
          default: {
            const r = Zt.pop() || X.length;
            return X[r] = t, X[r + 1] = 1, r;
          }
        }
      }
    }, Dr = {
      name: "emscripten::val",
      fromWireType: (t) => {
        var r = Q.toValue(t);
        return Jt(t), r;
      },
      toWireType: (t, r) => Q.toHandle(r),
      argPackAdvance: z,
      readValueFromPointer: ht,
      destructorFunction: null
    }, wn = (t) => k(t, Dr), $n = (t, r, e) => {
      switch (r) {
        case 1:
          return e ? function(n) {
            return this.fromWireType(L[n]);
          } : function(n) {
            return this.fromWireType(F[n]);
          };
        case 2:
          return e ? function(n) {
            return this.fromWireType(at[n >> 1]);
          } : function(n) {
            return this.fromWireType(ft[n >> 1]);
          };
        case 4:
          return e ? function(n) {
            return this.fromWireType(Z[n >> 2]);
          } : function(n) {
            return this.fromWireType(E[n >> 2]);
          };
        default:
          throw new TypeError(`invalid integer width (${r}): ${t}`);
      }
    }, bn = (t, r, e, n) => {
      r = j(r);
      function a() {
      }
      a.values = {}, k(t, {
        name: r,
        constructor: a,
        fromWireType: function(i) {
          return this.constructor.values[i];
        },
        toWireType: (i, u) => u.value,
        argPackAdvance: z,
        readValueFromPointer: $n(r, e, n),
        destructorFunction: null
      }), Xt(r, a);
    }, Kt = (t, r) => {
      var e = K[t];
      return e === void 0 && C(`${r} has unknown type ${Or(t)}`), e;
    }, Cn = (t, r, e) => {
      var n = Kt(t, "enum");
      r = j(r);
      var a = n.constructor, i = Object.create(n.constructor.prototype, {
        value: {
          value: e
        },
        constructor: {
          value: vt(`${n.name}_${r}`, function() {
          })
        }
      });
      a.values[e] = i, a[r] = i;
    }, tr = (t) => {
      if (t === null)
        return "null";
      var r = typeof t;
      return r === "object" || r === "array" || r === "function" ? t.toString() : "" + t;
    }, Tn = (t, r) => {
      switch (r) {
        case 4:
          return function(e) {
            return this.fromWireType(ur[e >> 2]);
          };
        case 8:
          return function(e) {
            return this.fromWireType(cr[e >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${r}): ${t}`);
      }
    }, Pn = (t, r, e) => {
      r = j(r), k(t, {
        name: r,
        fromWireType: (n) => n,
        toWireType: (n, a) => a,
        argPackAdvance: z,
        readValueFromPointer: Tn(r, e),
        destructorFunction: null
      });
    }, En = (t, r, e, n, a, i, u, s) => {
      var l = Yt(r, e);
      t = j(t), t = xr(t), a = U(n, a), Xt(t, function() {
        Ft(`Cannot call ${t} due to unbound types`, l);
      }, r - 1), tt([], l, (f) => {
        var h = [f[0], null].concat(f.slice(1));
        return Er(t, qt(t, h, null, a, i), r - 1), [];
      });
    }, _n = (t, r, e) => {
      switch (r) {
        case 1:
          return e ? (n) => L[n] : (n) => F[n];
        case 2:
          return e ? (n) => at[n >> 1] : (n) => ft[n >> 1];
        case 4:
          return e ? (n) => Z[n >> 2] : (n) => E[n >> 2];
        default:
          throw new TypeError(`invalid integer width (${r}): ${t}`);
      }
    }, An = (t, r, e, n, a) => {
      r = j(r);
      var i = (h) => h;
      if (n === 0) {
        var u = 32 - 8 * e;
        i = (h) => h << u >>> u;
      }
      var s = r.includes("unsigned"), l = (h, v) => {
      }, f;
      s ? f = function(h, v) {
        return l(v, this.name), v >>> 0;
      } : f = function(h, v) {
        return l(v, this.name), v;
      }, k(t, {
        name: r,
        fromWireType: i,
        toWireType: f,
        argPackAdvance: z,
        readValueFromPointer: _n(r, e, n !== 0),
        destructorFunction: null
      });
    }, On = (t, r, e) => {
      var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], a = n[r];
      function i(u) {
        var s = E[u >> 2], l = E[u + 4 >> 2];
        return new a(L.buffer, l, s);
      }
      e = j(e), k(t, {
        name: e,
        fromWireType: i,
        argPackAdvance: z,
        readValueFromPointer: i
      }, {
        ignoreDuplicateRegistrations: !0
      });
    }, xn = Object.assign({
      optional: !0
    }, Dr), Dn = (t, r) => {
      k(t, xn);
    }, Sn = (t, r, e, n) => {
      if (!(n > 0)) return 0;
      for (var a = e, i = e + n - 1, u = 0; u < t.length; ++u) {
        var s = t.charCodeAt(u);
        if (s >= 55296 && s <= 57343) {
          var l = t.charCodeAt(++u);
          s = 65536 + ((s & 1023) << 10) | l & 1023;
        }
        if (s <= 127) {
          if (e >= i) break;
          r[e++] = s;
        } else if (s <= 2047) {
          if (e + 1 >= i) break;
          r[e++] = 192 | s >> 6, r[e++] = 128 | s & 63;
        } else if (s <= 65535) {
          if (e + 2 >= i) break;
          r[e++] = 224 | s >> 12, r[e++] = 128 | s >> 6 & 63, r[e++] = 128 | s & 63;
        } else {
          if (e + 3 >= i) break;
          r[e++] = 240 | s >> 18, r[e++] = 128 | s >> 12 & 63, r[e++] = 128 | s >> 6 & 63, r[e++] = 128 | s & 63;
        }
      }
      return r[e] = 0, e - a;
    }, yt = (t, r, e) => Sn(t, F, r, e), jn = (t) => {
      for (var r = 0, e = 0; e < t.length; ++e) {
        var n = t.charCodeAt(e);
        n <= 127 ? r++ : n <= 2047 ? r += 2 : n >= 55296 && n <= 57343 ? (r += 4, ++e) : r += 3;
      }
      return r;
    }, Sr = typeof TextDecoder < "u" ? new TextDecoder() : void 0, jr = function(t) {
      let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
      for (var n = r + e, a = r; t[a] && !(a >= n); ) ++a;
      if (a - r > 16 && t.buffer && Sr)
        return Sr.decode(t.subarray(r, a));
      for (var i = ""; r < a; ) {
        var u = t[r++];
        if (!(u & 128)) {
          i += String.fromCharCode(u);
          continue;
        }
        var s = t[r++] & 63;
        if ((u & 224) == 192) {
          i += String.fromCharCode((u & 31) << 6 | s);
          continue;
        }
        var l = t[r++] & 63;
        if ((u & 240) == 224 ? u = (u & 15) << 12 | s << 6 | l : u = (u & 7) << 18 | s << 12 | l << 6 | t[r++] & 63, u < 65536)
          i += String.fromCharCode(u);
        else {
          var f = u - 65536;
          i += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023);
        }
      }
      return i;
    }, Fn = (t, r) => t ? jr(F, t, r) : "", Mn = (t, r) => {
      r = j(r);
      var e = r === "std::string";
      k(t, {
        name: r,
        fromWireType(n) {
          var a = E[n >> 2], i = n + 4, u;
          if (e)
            for (var s = i, l = 0; l <= a; ++l) {
              var f = i + l;
              if (l == a || F[f] == 0) {
                var h = f - s, v = Fn(s, h);
                u === void 0 ? u = v : (u += "\0", u += v), s = f + 1;
              }
            }
          else {
            for (var g = new Array(a), l = 0; l < a; ++l)
              g[l] = String.fromCharCode(F[i + l]);
            u = g.join("");
          }
          return Y(n), u;
        },
        toWireType(n, a) {
          a instanceof ArrayBuffer && (a = new Uint8Array(a));
          var i, u = typeof a == "string";
          u || a instanceof Uint8Array || a instanceof Uint8ClampedArray || a instanceof Int8Array || C("Cannot pass non-string to std::string"), e && u ? i = jn(a) : i = a.length;
          var s = nr(4 + i + 1), l = s + 4;
          if (E[s >> 2] = i, e && u)
            yt(a, l, i + 1);
          else if (u)
            for (var f = 0; f < i; ++f) {
              var h = a.charCodeAt(f);
              h > 255 && (Y(l), C("String has UTF-16 code units that do not fit in 8 bits")), F[l + f] = h;
            }
          else
            for (var f = 0; f < i; ++f)
              F[l + f] = a[f];
          return n !== null && n.push(Y, s), s;
        },
        argPackAdvance: z,
        readValueFromPointer: ht,
        destructorFunction(n) {
          Y(n);
        }
      });
    }, Fr = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, Wn = (t, r) => {
      for (var e = t, n = e >> 1, a = n + r / 2; !(n >= a) && ft[n]; ) ++n;
      if (e = n << 1, e - t > 32 && Fr) return Fr.decode(F.subarray(t, e));
      for (var i = "", u = 0; !(u >= r / 2); ++u) {
        var s = at[t + u * 2 >> 1];
        if (s == 0) break;
        i += String.fromCharCode(s);
      }
      return i;
    }, In = (t, r, e) => {
      var n;
      if ((n = e) !== null && n !== void 0 || (e = 2147483647), e < 2) return 0;
      e -= 2;
      for (var a = r, i = e < t.length * 2 ? e / 2 : t.length, u = 0; u < i; ++u) {
        var s = t.charCodeAt(u);
        at[r >> 1] = s, r += 2;
      }
      return at[r >> 1] = 0, r - a;
    }, Rn = (t) => t.length * 2, Bn = (t, r) => {
      for (var e = 0, n = ""; !(e >= r / 4); ) {
        var a = Z[t + e * 4 >> 2];
        if (a == 0) break;
        if (++e, a >= 65536) {
          var i = a - 65536;
          n += String.fromCharCode(55296 | i >> 10, 56320 | i & 1023);
        } else
          n += String.fromCharCode(a);
      }
      return n;
    }, kn = (t, r, e) => {
      var n;
      if ((n = e) !== null && n !== void 0 || (e = 2147483647), e < 4) return 0;
      for (var a = r, i = a + e - 4, u = 0; u < t.length; ++u) {
        var s = t.charCodeAt(u);
        if (s >= 55296 && s <= 57343) {
          var l = t.charCodeAt(++u);
          s = 65536 + ((s & 1023) << 10) | l & 1023;
        }
        if (Z[r >> 2] = s, r += 4, r + 4 > i) break;
      }
      return Z[r >> 2] = 0, r - a;
    }, Un = (t) => {
      for (var r = 0, e = 0; e < t.length; ++e) {
        var n = t.charCodeAt(e);
        n >= 55296 && n <= 57343 && ++e, r += 4;
      }
      return r;
    }, Vn = (t, r, e) => {
      e = j(e);
      var n, a, i, u;
      r === 2 ? (n = Wn, a = In, u = Rn, i = (s) => ft[s >> 1]) : r === 4 && (n = Bn, a = kn, u = Un, i = (s) => E[s >> 2]), k(t, {
        name: e,
        fromWireType: (s) => {
          for (var l = E[s >> 2], f, h = s + 4, v = 0; v <= l; ++v) {
            var g = s + 4 + v * r;
            if (v == l || i(g) == 0) {
              var T = g - h, _ = n(h, T);
              f === void 0 ? f = _ : (f += "\0", f += _), h = g + r;
            }
          }
          return Y(s), f;
        },
        toWireType: (s, l) => {
          typeof l != "string" && C(`Cannot pass non-string to C++ string type ${e}`);
          var f = u(l), h = nr(4 + f + r);
          return E[h >> 2] = f / r, a(l, h + 4, f + r), s !== null && s.push(Y, h), h;
        },
        argPackAdvance: z,
        readValueFromPointer: ht,
        destructorFunction(s) {
          Y(s);
        }
      });
    }, Hn = (t, r, e, n, a, i) => {
      Et[t] = {
        name: j(r),
        rawConstructor: U(e, n),
        rawDestructor: U(a, i),
        fields: []
      };
    }, Ln = (t, r, e, n, a, i, u, s, l, f) => {
      Et[t].fields.push({
        fieldName: j(r),
        getterReturnType: e,
        getter: U(n, a),
        getterContext: i,
        setterArgumentType: u,
        setter: U(s, l),
        setterContext: f
      });
    }, zn = (t, r) => {
      r = j(r), k(t, {
        isVoid: !0,
        name: r,
        argPackAdvance: 0,
        fromWireType: () => {
        },
        toWireType: (e, n) => {
        }
      });
    }, Nn = (t, r, e) => F.copyWithin(t, r, r + e), rr = [], Gn = (t, r, e, n) => (t = rr[t], r = Q.toValue(r), t(null, r, e, n)), Xn = {}, Qn = (t) => {
      var r = Xn[t];
      return r === void 0 ? j(t) : r;
    }, Mr = () => {
      if (typeof globalThis == "object")
        return globalThis;
      function t(r) {
        r.$$$embind_global$$$ = r;
        var e = typeof $$$embind_global$$$ == "object" && r.$$$embind_global$$$ == r;
        return e || delete r.$$$embind_global$$$, e;
      }
      if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && t(global) ? $$$embind_global$$$ = global : typeof self == "object" && t(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object"))
        return $$$embind_global$$$;
      throw Error("unable to get global object.");
    }, Yn = (t) => t === 0 ? Q.toHandle(Mr()) : (t = Qn(t), Q.toHandle(Mr()[t])), qn = (t) => {
      var r = rr.length;
      return rr.push(t), r;
    }, Zn = (t, r) => {
      for (var e = new Array(t), n = 0; n < t; ++n)
        e[n] = Kt(E[r + n * 4 >> 2], "parameter " + n);
      return e;
    }, Jn = Reflect.construct, Kn = (t, r, e) => {
      var n = [], a = t.toWireType(n, e);
      return n.length && (E[r >> 2] = Q.toHandle(n)), a;
    }, ta = (t, r, e) => {
      var n = Zn(t, r), a = n.shift();
      t--;
      var i = new Array(t), u = (l, f, h, v) => {
        for (var g = 0, T = 0; T < t; ++T)
          i[T] = n[T].readValueFromPointer(v + g), g += n[T].argPackAdvance;
        var _ = e === 1 ? Jn(f, i) : f.apply(l, i);
        return Kn(a, h, _);
      }, s = `methodCaller<(${n.map((l) => l.name).join(", ")}) => ${a.name}>`;
      return qn(vt(s, u));
    }, ra = (t) => {
      t > 9 && (X[t + 1] += 1);
    }, ea = (t) => {
      var r = Q.toValue(t);
      zt(r), Jt(t);
    }, na = (t, r) => {
      t = Kt(t, "_emval_take_value");
      var e = t.readValueFromPointer(r);
      return Q.toHandle(e);
    }, aa = (t, r, e, n) => {
      var a = (/* @__PURE__ */ new Date()).getFullYear(), i = new Date(a, 0, 1), u = new Date(a, 6, 1), s = i.getTimezoneOffset(), l = u.getTimezoneOffset(), f = Math.max(s, l);
      E[t >> 2] = f * 60, Z[r >> 2] = +(s != l);
      var h = (T) => {
        var _ = T >= 0 ? "-" : "+", S = Math.abs(T), O = String(Math.floor(S / 60)).padStart(2, "0"), x = String(S % 60).padStart(2, "0");
        return `UTC${_}${O}${x}`;
      }, v = h(s), g = h(l);
      l < s ? (yt(v, e, 17), yt(g, n, 17)) : (yt(v, n, 17), yt(g, e, 17));
    }, oa = () => 2147483648, ia = (t, r) => Math.ceil(t / r) * r, sa = (t) => {
      var r = $t.buffer, e = (t - r.byteLength + 65535) / 65536 | 0;
      try {
        return $t.grow(e), lr(), 1;
      } catch {
      }
    }, ua = (t) => {
      var r = F.length;
      t >>>= 0;
      var e = oa();
      if (t > e)
        return !1;
      for (var n = 1; n <= 4; n *= 2) {
        var a = r * (1 + 0.2 / n);
        a = Math.min(a, t + 100663296);
        var i = Math.min(e, ia(Math.max(t, a), 65536)), u = sa(i);
        if (u)
          return !0;
      }
      return !1;
    }, er = {}, ca = () => H || "./this.program", mt = () => {
      if (!mt.strings) {
        var t = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: t,
          _: ca()
        };
        for (var e in er)
          er[e] === void 0 ? delete r[e] : r[e] = er[e];
        var n = [];
        for (var e in r)
          n.push(`${e}=${r[e]}`);
        mt.strings = n;
      }
      return mt.strings;
    }, la = (t, r) => {
      for (var e = 0; e < t.length; ++e)
        L[r++] = t.charCodeAt(e);
      L[r] = 0;
    }, fa = (t, r) => {
      var e = 0;
      return mt().forEach((n, a) => {
        var i = r + e;
        E[t + a * 4 >> 2] = i, la(n, i), e += n.length + 1;
      }), 0;
    }, da = (t, r) => {
      var e = mt();
      E[t >> 2] = e.length;
      var n = 0;
      return e.forEach((a) => n += a.length + 1), E[r >> 2] = n, 0;
    }, ha = (t) => 52;
    function pa(t, r, e, n, a) {
      return 70;
    }
    var va = [null, [], []], ya = (t, r) => {
      var e = va[t];
      r === 0 || r === 10 ? ((t === 1 ? kt : nt)(jr(e)), e.length = 0) : e.push(r);
    }, ma = (t, r, e, n) => {
      for (var a = 0, i = 0; i < e; i++) {
        var u = E[r >> 2], s = E[r + 4 >> 2];
        r += 8;
        for (var l = 0; l < s; l++)
          ya(t, F[u + l]);
        a += s;
      }
      return E[n >> 2] = a, 0;
    }, ga = (t) => t;
    mr = c.InternalError = class extends Error {
      constructor(t) {
        super(t), this.name = "InternalError";
      }
    }, Le(), it = c.BindingError = class extends Error {
      constructor(t) {
        super(t), this.name = "BindingError";
      }
    }, Ke(), un(), Ar = c.UnboundTypeError = dn(Error, "UnboundTypeError"), gn();
    var wa = {
      t: Se,
      x: je,
      a: Me,
      j: We,
      k: Ie,
      O: Re,
      q: Be,
      ga: ke,
      d: Fe,
      ca: Ue,
      va: Ve,
      ba: He,
      pa: Ne,
      ta: hn,
      sa: vn,
      E: yn,
      oa: wn,
      F: bn,
      n: Cn,
      W: Pn,
      X: En,
      y: An,
      u: On,
      ua: Dn,
      V: Mn,
      P: Vn,
      L: Hn,
      wa: Ln,
      qa: zn,
      ja: Nn,
      T: Gn,
      xa: Jt,
      ya: Yn,
      U: ta,
      Y: ra,
      Z: ea,
      ra: na,
      da: aa,
      ha: ua,
      ea: fa,
      fa: da,
      ia: ha,
      $: pa,
      S: ma,
      J: Ua,
      C: Ha,
      Q: Pa,
      R: Ya,
      r: Ia,
      b: $a,
      D: ka,
      la: za,
      c: _a,
      ka: Na,
      h: Ta,
      i: Da,
      s: Sa,
      N: Ba,
      w: Fa,
      I: Xa,
      K: Ra,
      z: La,
      H: qa,
      aa: Ja,
      _: Ka,
      l: Aa,
      f: Ea,
      e: Ca,
      g: ba,
      M: Qa,
      m: xa,
      ma: Va,
      p: ja,
      v: Ma,
      na: Wa,
      B: Ga,
      o: Oa,
      G: Za,
      A: ga
    }, A = De(), Wr = (t) => (Wr = A.Ba)(t), Y = c._free = (t) => (Y = c._free = A.Ca)(t), nr = c._malloc = (t) => (nr = c._malloc = A.Ea)(t), Ir = (t) => (Ir = A.Fa)(t), m = (t, r) => (m = A.Ga)(t, r), Rr = (t) => (Rr = A.Ha)(t), Br = (t) => (Br = A.Ia)(t), kr = () => (kr = A.Ja)(), Ur = (t) => (Ur = A.Ka)(t), Vr = (t) => (Vr = A.La)(t), Hr = (t, r, e) => (Hr = A.Ma)(t, r, e);
    c.dynCall_viijii = (t, r, e, n, a, i, u) => (c.dynCall_viijii = A.Na)(t, r, e, n, a, i, u);
    var Lr = c.dynCall_jiii = (t, r, e, n) => (Lr = c.dynCall_jiii = A.Oa)(t, r, e, n);
    c.dynCall_jiji = (t, r, e, n, a) => (c.dynCall_jiji = A.Pa)(t, r, e, n, a);
    var zr = c.dynCall_jiiii = (t, r, e, n, a) => (zr = c.dynCall_jiiii = A.Qa)(t, r, e, n, a);
    c.dynCall_iiiiij = (t, r, e, n, a, i, u) => (c.dynCall_iiiiij = A.Ra)(t, r, e, n, a, i, u), c.dynCall_iiiiijj = (t, r, e, n, a, i, u, s, l) => (c.dynCall_iiiiijj = A.Sa)(t, r, e, n, a, i, u, s, l), c.dynCall_iiiiiijj = (t, r, e, n, a, i, u, s, l, f) => (c.dynCall_iiiiiijj = A.Ta)(t, r, e, n, a, i, u, s, l, f);
    function $a(t, r) {
      var e = $();
      try {
        return b(t)(r);
      } catch (n) {
        if (w(e), n !== n + 0) throw n;
        m(1, 0);
      }
    }
    function ba(t, r, e, n) {
      var a = $();
      try {
        b(t)(r, e, n);
      } catch (i) {
        if (w(a), i !== i + 0) throw i;
        m(1, 0);
      }
    }
    function Ca(t, r, e) {
      var n = $();
      try {
        b(t)(r, e);
      } catch (a) {
        if (w(n), a !== a + 0) throw a;
        m(1, 0);
      }
    }
    function Ta(t, r, e, n) {
      var a = $();
      try {
        return b(t)(r, e, n);
      } catch (i) {
        if (w(a), i !== i + 0) throw i;
        m(1, 0);
      }
    }
    function Pa(t, r, e, n, a) {
      var i = $();
      try {
        return b(t)(r, e, n, a);
      } catch (u) {
        if (w(i), u !== u + 0) throw u;
        m(1, 0);
      }
    }
    function Ea(t, r) {
      var e = $();
      try {
        b(t)(r);
      } catch (n) {
        if (w(e), n !== n + 0) throw n;
        m(1, 0);
      }
    }
    function _a(t, r, e) {
      var n = $();
      try {
        return b(t)(r, e);
      } catch (a) {
        if (w(n), a !== a + 0) throw a;
        m(1, 0);
      }
    }
    function Aa(t) {
      var r = $();
      try {
        b(t)();
      } catch (e) {
        if (w(r), e !== e + 0) throw e;
        m(1, 0);
      }
    }
    function Oa(t, r, e, n, a, i, u, s, l, f, h) {
      var v = $();
      try {
        b(t)(r, e, n, a, i, u, s, l, f, h);
      } catch (g) {
        if (w(v), g !== g + 0) throw g;
        m(1, 0);
      }
    }
    function xa(t, r, e, n, a) {
      var i = $();
      try {
        b(t)(r, e, n, a);
      } catch (u) {
        if (w(i), u !== u + 0) throw u;
        m(1, 0);
      }
    }
    function Da(t, r, e, n, a) {
      var i = $();
      try {
        return b(t)(r, e, n, a);
      } catch (u) {
        if (w(i), u !== u + 0) throw u;
        m(1, 0);
      }
    }
    function Sa(t, r, e, n, a, i) {
      var u = $();
      try {
        return b(t)(r, e, n, a, i);
      } catch (s) {
        if (w(u), s !== s + 0) throw s;
        m(1, 0);
      }
    }
    function ja(t, r, e, n, a, i) {
      var u = $();
      try {
        b(t)(r, e, n, a, i);
      } catch (s) {
        if (w(u), s !== s + 0) throw s;
        m(1, 0);
      }
    }
    function Fa(t, r, e, n, a, i, u) {
      var s = $();
      try {
        return b(t)(r, e, n, a, i, u);
      } catch (l) {
        if (w(s), l !== l + 0) throw l;
        m(1, 0);
      }
    }
    function Ma(t, r, e, n, a, i, u, s) {
      var l = $();
      try {
        b(t)(r, e, n, a, i, u, s);
      } catch (f) {
        if (w(l), f !== f + 0) throw f;
        m(1, 0);
      }
    }
    function Wa(t, r, e, n, a, i, u, s, l) {
      var f = $();
      try {
        b(t)(r, e, n, a, i, u, s, l);
      } catch (h) {
        if (w(f), h !== h + 0) throw h;
        m(1, 0);
      }
    }
    function Ia(t) {
      var r = $();
      try {
        return b(t)();
      } catch (e) {
        if (w(r), e !== e + 0) throw e;
        m(1, 0);
      }
    }
    function Ra(t, r, e, n, a, i, u, s, l) {
      var f = $();
      try {
        return b(t)(r, e, n, a, i, u, s, l);
      } catch (h) {
        if (w(f), h !== h + 0) throw h;
        m(1, 0);
      }
    }
    function Ba(t, r, e, n, a, i, u) {
      var s = $();
      try {
        return b(t)(r, e, n, a, i, u);
      } catch (l) {
        if (w(s), l !== l + 0) throw l;
        m(1, 0);
      }
    }
    function ka(t, r, e, n) {
      var a = $();
      try {
        return b(t)(r, e, n);
      } catch (i) {
        if (w(a), i !== i + 0) throw i;
        m(1, 0);
      }
    }
    function Ua(t, r, e, n) {
      var a = $();
      try {
        return b(t)(r, e, n);
      } catch (i) {
        if (w(a), i !== i + 0) throw i;
        m(1, 0);
      }
    }
    function Va(t, r, e, n, a, i, u, s) {
      var l = $();
      try {
        b(t)(r, e, n, a, i, u, s);
      } catch (f) {
        if (w(l), f !== f + 0) throw f;
        m(1, 0);
      }
    }
    function Ha(t, r, e, n, a, i) {
      var u = $();
      try {
        return b(t)(r, e, n, a, i);
      } catch (s) {
        if (w(u), s !== s + 0) throw s;
        m(1, 0);
      }
    }
    function La(t, r, e, n, a, i, u, s, l, f) {
      var h = $();
      try {
        return b(t)(r, e, n, a, i, u, s, l, f);
      } catch (v) {
        if (w(h), v !== v + 0) throw v;
        m(1, 0);
      }
    }
    function za(t, r, e) {
      var n = $();
      try {
        return b(t)(r, e);
      } catch (a) {
        if (w(n), a !== a + 0) throw a;
        m(1, 0);
      }
    }
    function Na(t, r, e, n, a) {
      var i = $();
      try {
        return b(t)(r, e, n, a);
      } catch (u) {
        if (w(i), u !== u + 0) throw u;
        m(1, 0);
      }
    }
    function Ga(t, r, e, n, a, i, u, s, l, f) {
      var h = $();
      try {
        b(t)(r, e, n, a, i, u, s, l, f);
      } catch (v) {
        if (w(h), v !== v + 0) throw v;
        m(1, 0);
      }
    }
    function Xa(t, r, e, n, a, i, u, s) {
      var l = $();
      try {
        return b(t)(r, e, n, a, i, u, s);
      } catch (f) {
        if (w(l), f !== f + 0) throw f;
        m(1, 0);
      }
    }
    function Qa(t, r, e, n, a, i, u) {
      var s = $();
      try {
        b(t)(r, e, n, a, i, u);
      } catch (l) {
        if (w(s), l !== l + 0) throw l;
        m(1, 0);
      }
    }
    function Ya(t, r, e, n) {
      var a = $();
      try {
        return b(t)(r, e, n);
      } catch (i) {
        if (w(a), i !== i + 0) throw i;
        m(1, 0);
      }
    }
    function qa(t, r, e, n, a, i, u, s, l, f, h, v) {
      var g = $();
      try {
        return b(t)(r, e, n, a, i, u, s, l, f, h, v);
      } catch (T) {
        if (w(g), T !== T + 0) throw T;
        m(1, 0);
      }
    }
    function Za(t, r, e, n, a, i, u, s, l, f, h, v, g, T, _, S) {
      var O = $();
      try {
        b(t)(r, e, n, a, i, u, s, l, f, h, v, g, T, _, S);
      } catch (x) {
        if (w(O), x !== x + 0) throw x;
        m(1, 0);
      }
    }
    function Ja(t, r, e, n) {
      var a = $();
      try {
        return Lr(t, r, e, n);
      } catch (i) {
        if (w(a), i !== i + 0) throw i;
        m(1, 0);
      }
    }
    function Ka(t, r, e, n, a) {
      var i = $();
      try {
        return zr(t, r, e, n, a);
      } catch (u) {
        if (w(i), u !== u + 0) throw u;
        m(1, 0);
      }
    }
    var Mt, Nr;
    dt = function t() {
      Mt || Gr(), Mt || (dt = t);
    };
    function Gr() {
      if (J > 0 || !Nr && (Nr = 1, me(), J > 0))
        return;
      function t() {
        var r;
        Mt || (Mt = 1, c.calledRun = 1, !sr && (ge(), P(c), (r = c.onRuntimeInitialized) === null || r === void 0 || r.call(c), we()));
      }
      c.setStatus ? (c.setStatus("Running..."), setTimeout(() => {
        setTimeout(() => c.setStatus(""), 1), t();
      }, 1)) : t();
    }
    if (c.preInit)
      for (typeof c.preInit == "function" && (c.preInit = [c.preInit]); c.preInit.length > 0; )
        c.preInit.pop()();
    return Gr(), y = B, y;
  };
})();
function po(o) {
  return ir(
    Bt,
    o
  );
}
function Fo(o) {
  return lo(
    Bt,
    o
  );
}
async function vo(o, d) {
  return fo(
    Bt,
    o,
    d
  );
}
async function yo(o, d) {
  return ho(
    Bt,
    o,
    d
  );
}
const se = [
  ["aztec", "Aztec"],
  ["code_128", "Code128"],
  ["code_39", "Code39"],
  ["code_93", "Code93"],
  ["codabar", "Codabar"],
  ["databar", "DataBar"],
  ["databar_expanded", "DataBarExpanded"],
  ["databar_limited", "DataBarLimited"],
  ["data_matrix", "DataMatrix"],
  ["dx_film_edge", "DXFilmEdge"],
  ["ean_13", "EAN-13"],
  ["ean_8", "EAN-8"],
  ["itf", "ITF"],
  ["maxi_code", "MaxiCode"],
  ["micro_qr_code", "MicroQRCode"],
  ["pdf417", "PDF417"],
  ["qr_code", "QRCode"],
  ["rm_qr_code", "rMQRCode"],
  ["upc_a", "UPC-A"],
  ["upc_e", "UPC-E"],
  ["linear_codes", "Linear-Codes"],
  ["matrix_codes", "Matrix-Codes"]
], mo = [...se, ["unknown"]].map((o) => o[0]), or = new Map(
  se
);
function go(o) {
  for (const [d, p] of or)
    if (o === p)
      return d;
  return "unknown";
}
function wo(o) {
  if (ue(o))
    return {
      width: o.naturalWidth,
      height: o.naturalHeight
    };
  if (ce(o))
    return {
      width: o.width.baseVal.value,
      height: o.height.baseVal.value
    };
  if (le(o))
    return {
      width: o.videoWidth,
      height: o.videoHeight
    };
  if (de(o))
    return {
      width: o.width,
      height: o.height
    };
  if (pe(o))
    return {
      width: o.displayWidth,
      height: o.displayHeight
    };
  if (fe(o))
    return {
      width: o.width,
      height: o.height
    };
  if (he(o))
    return {
      width: o.width,
      height: o.height
    };
  throw new TypeError(
    "The provided value is not of type '(Blob or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or ImageData or OffscreenCanvas or SVGImageElement or VideoFrame)'."
  );
}
function ue(o) {
  var d, p;
  try {
    return o instanceof ((p = (d = o == null ? void 0 : o.ownerDocument) == null ? void 0 : d.defaultView) == null ? void 0 : p.HTMLImageElement);
  } catch {
    return !1;
  }
}
function ce(o) {
  var d, p;
  try {
    return o instanceof ((p = (d = o == null ? void 0 : o.ownerDocument) == null ? void 0 : d.defaultView) == null ? void 0 : p.SVGImageElement);
  } catch {
    return !1;
  }
}
function le(o) {
  var d, p;
  try {
    return o instanceof ((p = (d = o == null ? void 0 : o.ownerDocument) == null ? void 0 : d.defaultView) == null ? void 0 : p.HTMLVideoElement);
  } catch {
    return !1;
  }
}
function fe(o) {
  var d, p;
  try {
    return o instanceof ((p = (d = o == null ? void 0 : o.ownerDocument) == null ? void 0 : d.defaultView) == null ? void 0 : p.HTMLCanvasElement);
  } catch {
    return !1;
  }
}
function de(o) {
  try {
    return o instanceof ImageBitmap || Object.prototype.toString.call(o) === "[object ImageBitmap]";
  } catch {
    return !1;
  }
}
function he(o) {
  try {
    return o instanceof OffscreenCanvas || Object.prototype.toString.call(o) === "[object OffscreenCanvas]";
  } catch {
    return !1;
  }
}
function pe(o) {
  try {
    return o instanceof VideoFrame || Object.prototype.toString.call(o) === "[object VideoFrame]";
  } catch {
    return !1;
  }
}
function ve(o) {
  try {
    return o instanceof Blob || Object.prototype.toString.call(o) === "[object Blob]";
  } catch {
    return !1;
  }
}
function $o(o) {
  try {
    return o instanceof ImageData || Object.prototype.toString.call(o) === "[object ImageData]";
  } catch {
    return !1;
  }
}
function bo(o, d) {
  try {
    const p = new OffscreenCanvas(o, d);
    if (p.getContext("2d") instanceof OffscreenCanvasRenderingContext2D)
      return p;
    throw void 0;
  } catch {
    const p = document.createElement("canvas");
    return p.width = o, p.height = d, p;
  }
}
async function ye(o) {
  if (ue(o) && !await Eo(o))
    throw new DOMException(
      "Failed to load or decode HTMLImageElement.",
      "InvalidStateError"
    );
  if (ce(o) && !await _o(o))
    throw new DOMException(
      "Failed to load or decode SVGImageElement.",
      "InvalidStateError"
    );
  if (pe(o) && Ao(o))
    throw new DOMException("VideoFrame is closed.", "InvalidStateError");
  if (le(o) && (o.readyState === 0 || o.readyState === 1))
    throw new DOMException("Invalid element or state.", "InvalidStateError");
  if (de(o) && xo(o))
    throw new DOMException(
      "The image source is detached.",
      "InvalidStateError"
    );
  const { width: d, height: p } = wo(o);
  if (d === 0 || p === 0)
    return null;
  const c = bo(d, p).getContext("2d");
  c.drawImage(o, 0, 0);
  try {
    return c.getImageData(0, 0, d, p);
  } catch {
    throw new DOMException("Source would taint origin.", "SecurityError");
  }
}
async function Co(o) {
  let d;
  try {
    if (globalThis.createImageBitmap)
      d = await createImageBitmap(o);
    else if (globalThis.Image) {
      d = new Image();
      let y = "";
      try {
        y = URL.createObjectURL(o), d.src = y, await d.decode();
      } finally {
        URL.revokeObjectURL(y);
      }
    } else
      return o;
  } catch {
    throw new DOMException(
      "Failed to load or decode Blob.",
      "InvalidStateError"
    );
  }
  return await ye(d);
}
function To(o) {
  const { width: d, height: p } = o;
  if (d === 0 || p === 0)
    return null;
  const y = o.getContext("2d");
  try {
    return y.getImageData(0, 0, d, p);
  } catch {
    throw new DOMException("Source would taint origin.", "SecurityError");
  }
}
async function Po(o) {
  if (ve(o))
    return await Co(o);
  if ($o(o)) {
    if (Oo(o))
      throw new DOMException(
        "The image data has been detached.",
        "InvalidStateError"
      );
    return o;
  }
  return fe(o) || he(o) ? To(o) : await ye(o);
}
async function Eo(o) {
  try {
    return await o.decode(), !0;
  } catch {
    return !1;
  }
}
async function _o(o) {
  var d;
  try {
    return await ((d = o.decode) == null ? void 0 : d.call(o)), !0;
  } catch {
    return !1;
  }
}
function Ao(o) {
  return o.format === null;
}
function Oo(o) {
  return o.data.buffer.byteLength === 0;
}
function xo(o) {
  return o.width === 0 && o.height === 0;
}
function ae(o, d) {
  return Do(o) ? new DOMException(`${d}: ${o.message}`, o.name) : So(o) ? new o.constructor(`${d}: ${o.message}`) : new Error(`${d}: ${o}`);
}
function Do(o) {
  return o instanceof DOMException || Object.prototype.toString.call(o) === "[object DOMException]";
}
function So(o) {
  return o instanceof Error || Object.prototype.toString.call(o) === "[object Error]";
}
var gt;
class Mo extends EventTarget {
  constructor(p = {}) {
    var y;
    super();
    te(this, gt);
    try {
      const c = (y = p == null ? void 0 : p.formats) == null ? void 0 : y.filter(
        (P) => P !== "unknown"
      );
      if ((c == null ? void 0 : c.length) === 0)
        throw new TypeError("Hint option provided, but is empty.");
      for (const P of c != null ? c : [])
        if (!or.has(P))
          throw new TypeError(
            `Failed to read the 'formats' property from 'BarcodeDetectorOptions': The provided value '${P}' is not a valid enum value of type BarcodeFormat.`
          );
      re(this, gt, c != null ? c : []), po().then((P) => {
        this.dispatchEvent(
          new CustomEvent("load", {
            detail: P
          })
        );
      }).catch((P) => {
        this.dispatchEvent(new CustomEvent("error", { detail: P }));
      });
    } catch (c) {
      throw ae(
        c,
        "Failed to construct 'BarcodeDetector'"
      );
    }
  }
  static async getSupportedFormats() {
    return mo.filter((p) => p !== "unknown");
  }
  async detect(p) {
    try {
      const y = await Po(p);
      if (y === null)
        return [];
      let c;
      const P = {
        tryHarder: !0,
        // https://github.com/Sec-ant/barcode-detector/issues/91
        returnCodabarStartEnd: !0,
        formats: Kr(this, gt).map((D) => or.get(D))
      };
      try {
        ve(y) ? c = await vo(
          y,
          P
        ) : c = await yo(
          y,
          P
        );
      } catch (D) {
        throw console.error(D), new DOMException(
          "Barcode detection service unavailable.",
          "NotSupportedError"
        );
      }
      return c.map((D) => {
        const {
          topLeft: { x: B, y: V },
          topRight: { x: R, y: W },
          bottomLeft: { x: N, y: H },
          bottomRight: { x: I, y: ut }
        } = D.position, ct = Math.min(B, R, N, I), et = Math.min(V, W, H, ut), lt = Math.max(B, R, N, I), kt = Math.max(V, W, H, ut);
        return {
          boundingBox: new DOMRectReadOnly(
            ct,
            et,
            lt - ct,
            kt - et
          ),
          rawValue: D.text,
          format: go(D.format),
          cornerPoints: [
            {
              x: B,
              y: V
            },
            {
              x: R,
              y: W
            },
            {
              x: I,
              y: ut
            },
            {
              x: N,
              y: H
            }
          ]
        };
      });
    } catch (y) {
      throw ae(
        y,
        "Failed to execute 'detect' on 'BarcodeDetector'"
      );
    }
  }
}
gt = new WeakMap();
export {
  Mo as BarcodeDetector,
  Fo as setZXingModuleOverrides
};
