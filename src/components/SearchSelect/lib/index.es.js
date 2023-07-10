import { defineComponent as Q, resolveComponent as M, resolveDirective as X, openBlock as a, createElementBlock as i, createElementVNode as d, unref as o, createCommentVNode as f, Fragment as N, renderList as z, createBlock as V, withCtx as r, renderSlot as S, createTextVNode as B, toDisplayString as K, withModifiers as E, createVNode as u, normalizeClass as F, Transition as Y, isRef as Z, withDirectives as ee } from "vue";
import { ArrowDown as P, Close as te, Search as le } from "@element-plus/icons-vue";
import { debounce as se, uniqBy as T } from "lodash";
const oe = {
  key: 0,
  class: "placeholder"
}, ne = {
  key: 1,
  class: "select-tags-container"
}, ae = { class: "search-select-tags-wrapper" }, ce = { class: "search-select-arrow" }, ie = {
  class: "select-tags-container",
  style: { height: "0", overflow: "hidden", "border-top": "none", "border-bottom": "0" }
}, de = { class: "search-select-arrow" }, re = {
  key: 0,
  class: "popper-warpper"
}, ue = { class: "content-board" }, pe = { class: "input-search-wrapper" }, ve = { class: "tip-text" }, fe = ["onClick"], he = {
  key: 0,
  class: "empty"
}, me = /* @__PURE__ */ Q({
  __name: "index",
  props: {
    loading: { type: Boolean, default: !1 },
    options: { default: () => [] },
    valueKey: { default: "value" },
    labelKey: { default: "label" },
    modelValue: { default: () => [] },
    initRemoteLoad: { type: Boolean, default: !0 },
    defaultSelectedOptions: { default: null },
    disabledOption: { type: Function, default: () => !1 },
    selectDisabledOption: { type: Function, default: () => !1 },
    remoteMethod: { type: Function, default: void 0 }
  },
  emits: ["update:modelValue", "collapse-click"],
  setup(n, { emit: h }) {
    const t = n, g = ref(null), b = ref(null), p = ref({
      viewIndexs: [],
      collapseIndexs: []
    }), m = ref(!1), D = (e) => {
      if (!m.value)
        return;
      const l = g.value;
      l && !l.contains(e.target) && (m.value = !1, k.value = "", L(""));
    };
    document.addEventListener("mousedown", D), onUnmounted(() => {
      document.removeEventListener("mousedown", D);
    });
    const W = () => {
      h("collapse-click", _.value);
    }, U = () => {
      m.value = !0;
    };
    t.initRemoteLoad && t.remoteMethod && t.remoteMethod();
    const k = ref(""), L = se((e) => {
      t.remoteMethod && t.remoteMethod(e);
    }, 600), q = () => {
      const e = b.value;
      if (!e)
        return { viewIndexs: [], collapseIndexs: [] };
      const l = e.children, c = window.getComputedStyle(e), v = Math.ceil(Number(c.width.slice(0, -2))), x = l.length;
      if (!x)
        return { viewIndexs: [], collapseIndexs: [] };
      let C = 0;
      const s = [], I = [];
      for (let w = 0; w < x; w++) {
        const G = l[w], H = window.getComputedStyle(G), J = Math.ceil(Number(H.width.slice(0, -2))) + 4, $ = C + J;
        $ < v - 70 ? (C = $, s.push(w)) : I.push(w);
      }
      return { viewIndexs: s, collapseIndexs: I };
    }, A = async (e) => {
      await nextTick(), p.value = q(), e && e();
    };
    watch(
      [() => t.modelValue, () => t.options],
      () => {
        O.value = !1, A(() => {
          O.value = !0;
        });
      },
      { deep: !0 }
    );
    const y = ref([]);
    watch([() => t.options, () => t.defaultSelectedOptions], ([e, l]) => {
      e && e.length && (y.value = T([...y.value, ...e], t.valueKey)), l && l.length && (y.value = T([...y.value, ...l], t.valueKey));
    });
    const j = (e) => {
      const l = [];
      return y.value.forEach((c) => {
        e.includes(c[t.valueKey]) && l.push(c);
      }), l;
    }, _ = computed(() => j(t.modelValue)), O = ref(!0), R = async (e) => {
      if (t.disabledOption(e) || t.selectDisabledOption(e))
        return;
      const l = [...t.modelValue], c = l.indexOf(e[t.valueKey]);
      c > -1 ? l.splice(c, 1) : l.push(e[t.valueKey]), h("update:modelValue", l);
    };
    return (e, l) => {
      const c = M("el-tag"), v = M("el-icon"), x = M("el-input"), C = X("loading");
      return a(), i("div", {
        ref_key: "containerRef",
        ref: g,
        class: "search-select-container"
      }, [
        d("div", {
          class: "select-wrapper",
          onClick: U
        }, [
          o(p).viewIndexs.length ? f("", !0) : (a(), i("div", oe, "Select")),
          o(O) ? (a(), i("div", ne, [
            d("div", ae, [
              (a(!0), i(N, null, z(o(p).viewIndexs, (s) => (a(), V(c, {
                key: s,
                "disable-transitions": "",
                type: "info",
                closable: "",
                onClose: (I) => R(o(_)[s])
              }, {
                default: r(() => [
                  S(e.$slots, "tag", {
                    option: o(_)[s]
                  }, () => [
                    B(K(o(_)[s][n.labelKey]), 1)
                  ], !0)
                ]),
                _: 2
              }, 1032, ["onClose"]))), 128)),
              o(p).collapseIndexs.length ? (a(), V(c, {
                key: 0,
                "disable-transitions": "",
                type: "info",
                onClick: E(W, ["stop"])
              }, {
                default: r(() => [
                  B(" +" + K(o(p).collapseIndexs.length), 1)
                ]),
                _: 1
              }, 8, ["onClick"])) : f("", !0)
            ]),
            d("div", ce, [
              u(v, {
                size: 16,
                class: F(["arrow", { "is-reverse": o(m) }])
              }, {
                default: r(() => [
                  u(o(P))
                ]),
                _: 1
              }, 8, ["class"])
            ])
          ])) : f("", !0),
          o(p).viewIndexs.length ? (a(), V(v, {
            key: 2,
            class: "clear-icon",
            size: 14,
            onClick: l[0] || (l[0] = E((s) => h("update:modelValue", []), ["stop"]))
          }, {
            default: r(() => [
              u(o(te))
            ]),
            _: 1
          })) : f("", !0),
          d("div", ie, [
            d("div", {
              ref_key: "tagsRef",
              ref: b,
              class: "search-select-tags-wrapper"
            }, [
              (a(!0), i(N, null, z(o(_), (s) => (a(), V(c, {
                key: s[n.valueKey],
                "disable-transitions": "",
                type: "info",
                closable: ""
              }, {
                default: r(() => [
                  S(e.$slots, "tag", { option: s }, () => [
                    B(K(s[n.labelKey]), 1)
                  ], !0)
                ]),
                _: 2
              }, 1024))), 128))
            ], 512),
            d("div", de, [
              u(v, {
                size: 14,
                class: "arrow"
              }, {
                default: r(() => [
                  u(o(P))
                ]),
                _: 1
              })
            ])
          ])
        ]),
        u(Y, { name: "be-zoom-in-top" }, {
          default: r(() => [
            o(m) ? (a(), i("div", re, [
              d("div", ue, [
                d("div", pe, [
                  u(x, {
                    modelValue: o(k),
                    "onUpdate:modelValue": l[1] || (l[1] = (s) => Z(k) ? k.value = s : null),
                    clearable: "",
                    placeholder: "Please search for content",
                    onInput: o(L)
                  }, {
                    suffix: r(() => [
                      u(v, null, {
                        default: r(() => [
                          u(o(le))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onInput"])
                ]),
                d("p", ve, [
                  S(e.$slots, "search-tip", {}, void 0, !0)
                ]),
                ee((a(), i("ul", null, [
                  (a(!0), i(N, null, z(n.options, (s) => (a(), i("li", {
                    key: s[n.valueKey],
                    class: F({
                      selected: n.modelValue.includes(s[n.valueKey]),
                      selectdisabled: n.selectDisabledOption(s),
                      disabled: n.disabledOption(s)
                    }),
                    onClick: (I) => R(s)
                  }, [
                    S(e.$slots, "option", { option: s }, () => [
                      d("span", null, K(s[t.labelKey]), 1)
                    ], !0)
                  ], 10, fe))), 128))
                ])), [
                  [C, t.loading]
                ]),
                n.options.length ? f("", !0) : (a(), i("div", he, "No data to show"))
              ])
            ])) : f("", !0)
          ]),
          _: 3
        })
      ], 512);
    };
  }
});
const ye = (n, h) => {
  const t = n.__vccOpts || n;
  for (const [g, b] of h)
    t[g] = b;
  return t;
}, be = /* @__PURE__ */ ye(me, [["__scopeId", "data-v-b40d82a8"]]);
export {
  be as SearchSelect
};
