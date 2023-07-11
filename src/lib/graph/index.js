var R = Object.defineProperty;
var E = (d, n, i) => n in d ? R(d, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : d[n] = i;
var m = (d, n, i) => (E(d, typeof n != "symbol" ? n + "" : n, i), i);
import f from "@antv/g6";
const H = (d, n) => {
  if (!d || !n)
    return { innerPoint3: { x: 0, y: 0 }, xDist: 0 };
  const i = n.x - d.x, e = i * 0.5, t = {
    x: d.x + i * 0.3,
    y: d.y
  }, s = {
    x: n.x - e - i * 0.16,
    y: n.y
  }, o = {
    x: n.x - e,
    y: n.y
  }, a = [t, s, o];
  let r = [d, { x: d.x + i * 0.05, y: d.y }];
  return a && (r = r.concat(a)), r.push(n), { path: [
    ["M", r[0].x, r[0].y],
    ["L", r[1].x, r[1].y],
    ["C", r[2].x, r[2].y, r[3].x, r[3].y, r[4].x, r[4].y],
    ["L", r[4].x, r[4].y],
    ["L", r[5].x, r[5].y]
  ], innerPoint3: o, xDist: i };
}, D = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA+NJREFUeF7tmluoDlEUx38nlyKUS/JCJJEi5c4DSiFFlEu5X4pcS5RL7rfcSoQIEeUWUZS88EKRXJMUD3jwQvFESfSvfTTt9nzfnplzPnvMrDqdvpk1e6//f9bae+21po6CS13B8VMSUHpAwRkoQ6DgDlAugmUIlCFQcAbKEMiBA0wBhgJDzP97wH3gCXAtq/0he8BUYAUwvAJIEXEIuJyWiFAJOA/MSADqHDA7gf5f1RAJEHARkFQmAdeTPpSGgPbAcWAg0BZ4DhxIM7nD2HbAA6CndW8vcAV4DXQCtC7stnReACOAr0lISEPARmCbY5LtwKYkkzt0FfeXrOtngHkx4/62ri8CTiSxIQ0BGn8NoLdiizxhdRIDLN0NwI7ItTvAmArjbQE2R+4rdGYlmT8tAZpjGXDYMdkxYEkSIyK6F4Fpkd8aXztBnPQHHkduvge6Jpk7CwGaZwFw0jHhWWBuEkOM7lVgcp4IkK1xq7YWLW1NPxIQoRBalZcQiOLSW1My0sQCewuYA3zxJEFbmZ3dBbkIuvCMMyS0sm7eNSR89CRB2d0wSzeobbASjlGGhA6W0kNDwpsqJLQBvnkSZavVLBGqZp8OLQqHzpbiS0PC05gBegOvqg0ecz+4VLifIaGHZfA7Q4LcPCra6287wEm/ewVSgj4MKZ2VJ/S1AHwyW6SSHInSWtdpTknOVmAmoAyvi/nL1XFYRgvcYIsExbnyhGZVwKeMCP/HsiZCPjN1NPn9SEv5pyHAHkPp8C6fgRtCpxYEyM7W5k2PrWK00usjDQHMd4xaESB7mhoStF25RIeYNHUAX6xOvVoS0NwQMLGIBKhwosVwdBFDQAmRwCtBiooSoz4OQv6rRbCXAW8DVWqsbXC6VdCo56M+B8gU3z4PN+YaMMCA72YZosORwH8w11XREWBbcp0IqTgpt1cOEJWbpr732boeR0IuU+HxBnxLC6QI0Zv/HuOaKqOlzQGCOQy5qrrCW6moEeVjAnDDJ3YdOv/8ODwfOOUw7Ciw1BNUC1PXV84QleALIstNj87Gud+U0D3xsxNYbykHXxJbF3N4UfMkWrP3IUHb46CIYtB9AdmpJoYSF1vWAnt8EFs6Kp6qPVYvQfcFDgIrHSDVyHA1THz4eGtVgIIlQM0QNUVsWRizEPqAl466SotDD4ELJoWNglJHVvu47mURNUFPh74Iqki5z9TufwGPTO3uWRbk5tlctMcbAGfFIYL/QKKxCdD4hf5Epp7gQn8kFfWywn4mV4tQK78Wb8yKUE3eYNZJSgKyMpj350sPyPsbzGp/6QFZGcz786UH5P0NZrW/8B7wBwBEzkFeAV/JAAAAAElFTkSuQmCC", S = (d, { x: n, y: i = 0, customNames: e, contentRender: t }, s = {}) => {
  const o = d.addGroup({
    name: e[0],
    setText: (h) => (c.attr({ text: h }), o)
  }), a = ["action", ...e], r = o.addShape("circle", {
    attrs: {
      x: n,
      y: i,
      r: 9,
      fill: "#FAFBFD",
      cursor: "pointer",
      stroke: "#CCD0D9"
    },
    zIndex: 1
  }), c = t(o);
  c.set("zIndex", 2);
  const l = c.get("type"), g = {
    attrs: {
      ...r.attr(),
      fillOpacity: 0,
      strokeOpacity: 0
    },
    names: a,
    type: "button",
    name: "",
    zIndex: 10,
    setHover() {
      if (l === "image")
        return;
      r.attr({ stroke: "#7033FF" });
      const h = c.attr("text");
      c.attr(h ? { fill: "#7033FF" } : { stroke: "#7033FF", fill: "#7033FF" });
    },
    clearHover() {
      if (l === "image")
        return;
      r.attr({ stroke: "#CCD0D9" });
      const h = c.attr("text");
      c.attr(h ? { fill: "#000000" } : { stroke: "#000000", fill: "#000000" });
    },
    methods: s
  };
  return o.addShape("circle", g), o.sort(), o;
}, b = (d, { x: n, y: i, r: e = 9 }) => S(d, { x: n, y: i, customNames: ["clip"], contentRender: (s) => s.addShape("image", {
  attrs: {
    x: n - e,
    y: i - e,
    img: D,
    width: e * 2,
    height: e * 2,
    cursor: "pointer"
  },
  names: ["clip"],
  draggable: !0,
  crossorigin: "*"
}) }), I = ({ edgeLabelRender: d, hideClip: n = () => !1, getEdgeStroke: i }) => ({
  itemType: "edge",
  draw: (e, t) => {
    if (!e || !t)
      return;
    const s = e.startPoint, o = e.endPoint;
    if (!s || !o)
      return;
    const { path: a, innerPoint3: r, xDist: c = 0 } = H(s, o);
    if (!e.targetNode || !e.sourceNode)
      return;
    const l = e.targetNode.getModel(), g = e.sourceNode.getModel(), h = l.direction, u = i ? i({ targetModel: l, sourceModel: g }) : "#CCD0D9", C = t.addShape("path", {
      attrs: {
        path: a,
        stroke: u,
        lineWidth: 2,
        lineAppendWidth: 15,
        startArrow: {
          path: h !== "BACK" ? f.Arrow.triangle(10, 10, 0) : !1,
          fill: "#CCD0D9"
        },
        endArrow: {
          path: h === "BACK" ? f.Arrow.triangle(10, 10, 0) : !1,
          fill: "#CCD0D9"
        }
      },
      names: ["edge-line"]
    });
    if (Math.abs(c) < 200)
      return C;
    const p = c > 0 ? r.x + 12 : o.x + 14;
    let x;
    if (d) {
      const A = d({ targetModel: l, sourceModel: g });
      x = t.addShape("text", {
        attrs: {
          text: A,
          x: p,
          y: o.y - 20,
          fontSize: 12,
          textAlign: "left",
          textBaseline: "middle",
          fill: "#000000",
          shapeKey: "path-text",
          cursor: "pointer"
        },
        names: ["edge-line"]
      });
    }
    if (t.cfg.setState = (A, w) => {
      if (A === "hover") {
        const N = {
          line: {
            stroke: u,
            startArrow: {
              path: h !== "BACK" ? f.Arrow.triangle(10, 10, 0) : !1,
              fill: u
            }
          },
          text: { fill: "#000000" }
        }, v = {
          line: {
            stroke: "#7033FF",
            startArrow: {
              path: h !== "BACK" ? f.Arrow.triangle(10, 10, 0) : !1,
              fill: "#7033FF"
            }
          },
          text: { fill: "#7033FF" }
        }, B = w ? v : N;
        C.attr(B.line), x && x.attr(B.text);
      }
    }, t.sort(), !n({ targetModel: l, sourceModel: g })) {
      const A = b(t, { x: r.x, y: r.y }).hide();
      t.cfg.setClipState = (w) => {
        w ? A.show() : A.hide();
      };
    }
    return t;
  }
}), O = ({ nodeTooltipRender: d, edgeTooltipRender: n }) => ({
  offsetX: 10,
  offsetY: 10,
  itemTypes: ["node", "edge"],
  className: "tooltip-container",
  getContent: (i) => {
    if (!i)
      return "";
    const t = (() => {
      const r = document.createElement("div");
      return r.style.width = "fit-content", r;
    })(), s = i.item.getModel(), o = i.target.get("names");
    if (!o)
      return "";
    if (o.includes("address-node") && d)
      return t.innerHTML = d(s), t;
    if (o.includes("edge-line") && n) {
      const r = i.item, c = r.getTarget().getModel(), l = r.getSource().getModel();
      return t.innerHTML = n({ targetModel: c, sourceModel: l }), t;
    }
    const a = {
      clip: "Hide Node",
      "extend-left": "Extend",
      "extend-right": "Extend",
      "show-left": "Show",
      "show-right": "Show",
      "hidden-left": "Hide",
      "hidden-right": "Hide"
    };
    return t.innerHTML = a[o[1]], t;
  },
  shouldBegin: (i) => {
    const e = i.target.get("names");
    return e ? !!(e.includes("address-node") && d || e.includes("edge-line") && n || e.includes("action")) : !1;
  }
}), W = (d, {
  el: n,
  defaultNodeType: i,
  layout: e,
  edgeLabelRender: t,
  nodeTooltipRender: s,
  edgeTooltipRender: o,
  hideClip: a,
  getEdgeStroke: r
}) => {
  const c = n.offsetHeight || 800, l = n.offsetWidth || 1e3;
  f.registerEdge("default-edge", I({ edgeLabelRender: t, hideClip: a, getEdgeStroke: r }));
  const g = new f.Minimap({
    size: [220, 120]
  }), h = new f.Tooltip(O({ nodeTooltipRender: s, edgeTooltipRender: o })), u = new f.TreeGraph({
    container: n,
    width: l,
    height: c,
    modes: {
      default: ["drag-canvas", "zoom-canvas"]
    },
    defaultNode: {
      type: i
    },
    defaultEdge: {
      type: "default-edge"
    },
    layout: {
      type: "compactBox",
      direction: "H",
      getHeight: () => 25,
      getWidth: () => 25,
      getVGap: () => 35,
      getHGap: () => 150,
      getSide: (C) => ({
        BACK: "right",
        FRONT: "left"
      })[C.data.direction],
      ...e
    },
    plugins: [g, h]
  });
  return u.data(d), u.render(), u.fitCenter(), u;
}, y = (d, { customNames: n, x: i }, e) => {
  const t = [
    ["M", i - 5, 0],
    ["L", i + 5, 0],
    ["M", i, -5],
    ["L", i, 5]
  ];
  return S(d, { x: i, contentRender: (o) => o.addShape("path", {
    attrs: {
      path: t,
      cursor: "pointer",
      stroke: "#000000",
      lineWidth: 1,
      lineAppendWidth: 5
    }
  }), customNames: n }, e);
}, F = (d, { customNames: n, x: i }, e) => {
  const t = [
    ["M", i - 5, 0],
    ["L", i + 5, 0]
  ];
  return S(d, { x: i, contentRender: (o) => o.addShape("path", {
    attrs: {
      path: t,
      cursor: "pointer",
      stroke: "#000000",
      lineWidth: 1,
      lineAppendWidth: 5
    }
  }), customNames: n }, e);
}, M = (d, { customNames: n, x: i, text: e = 0 }, t) => S(d, { x: i, contentRender: (o) => o.addShape("text", {
  attrs: {
    text: e,
    fill: "#000000",
    x: i,
    y: 0,
    fontWeight: "normal",
    textAlign: "center",
    textBaseline: "middle"
  },
  draggable: !0
}), customNames: n }, t), k = {
  left: { extend: !1, hidden: !1, show: !1 },
  right: { extend: !1, hidden: !1, show: !1 }
}, L = { r: 26 }, Q = (d, n, i = {}) => {
  const { r: e, getBtnOptions: t = () => ({ left: void 0, right: void 0 }) } = {
    ...L,
    ...i
  }, s = 12, o = 34, a = t(d) || {}, r = { ...k.left, ...a.left }, c = { ...k.right, ...a.right }, l = (A) => ({
    "extend-left": g,
    "hidden-left": h,
    "extend-right": C,
    "hidden-right": p,
    "show-left": u,
    "show-right": x
  })[A], g = r && r.extend && y(
    n,
    {
      customNames: ["extend-left"],
      x: -(e + s)
    },
    { getButton: l }
  ), h = r && r.hidden && F(
    n,
    {
      customNames: ["hidden-left"],
      x: -(e + o)
    },
    { getButton: l }
  ), u = r && r.show && M(n, { customNames: ["show-left"], x: -(e + s) }, { getButton: l }).hide(), C = c && c.extend && y(
    n,
    {
      customNames: ["extend-right"],
      x: e + s
    },
    { getButton: l }
  ), p = c && c.hidden && F(n, { customNames: ["hidden-right"], x: e + o }, { getButton: l }), x = c && c.show && M(n, { customNames: ["show-right"], x: e + s }, { getButton: l }).hide();
}, T = ({ r: d, ...n }) => ({
  options: n.options,
  draw(i, e) {
    if (!i || !e)
      return;
    Q(i, e, {
      getBtnOptions: n.getBtnOptions,
      r: d
    }), e.addNodeShape = (s, o) => {
      const a = e.addShape(s, o);
      return a.set("names", ["address-node", ...a.get("names") || []]), a;
    };
    const t = n.draw(i, e);
    return e.sort(), t;
  },
  getAnchorPoints: () => [
    [0, 0.5],
    [1, 0.5]
  ]
});
class z {
  constructor(n) {
    m(this, "props");
    m(this, "registerNode", (n, i, e) => {
      var t;
      f.registerNode(n, T({ ...i, getBtnOptions: (t = this.props) == null ? void 0 : t.getBtnOptions }), e);
    });
    m(this, "createGraph", (n, i) => {
      const { registerNode: e } = this, t = this.props;
      t != null && t.beforeCreate && t.beforeCreate({ registerNode: e }, f);
      const s = W(n, {
        ...i,
        defaultNodeType: t == null ? void 0 : t.defaultNodeType,
        layout: t == null ? void 0 : t.layout,
        edgeLabelRender: t == null ? void 0 : t.edgeLabelRender,
        hideClip: t == null ? void 0 : t.hideClip,
        getEdgeStroke: t == null ? void 0 : t.getEdgeStroke,
        nodeTooltipRender: t == null ? void 0 : t.nodeTooltipRender,
        edgeTooltipRender: t == null ? void 0 : t.edgeLabelRender
      });
      return t && this.onEventListener(s, t), s;
    });
    m(this, "interactive", (n, i, e, t) => {
      const s = this.props, o = n[1].split("-")[1], a = {
        left: { flow: "FRONT", unFlow: "BACK", cacheChildren: "cacheFrontChildren", hideChildren: "hideFrontChildren" },
        right: { flow: "BACK", unFlow: "FRONT", cacheChildren: "cacheBackChildren", hideChildren: "hideBackChildren" }
      }[o];
      if (n.includes(`extend-${o}`)) {
        if (!(s != null && s.extendMethod))
          return;
        const r = (s == null ? void 0 : s.extendMethod(i, a, n)) || [];
        r instanceof Promise ? r.then((c) => {
          e.updateChildren(c, i.id);
        }) : e.updateChildren(r, i.id);
      }
      if (n.includes(`hidden-${o}`)) {
        i[a.hideChildren] = i.children.filter((l) => l.direction === a.flow);
        const r = i.children.filter((l) => l.direction === a.unFlow);
        e.updateChildren(r, i.id);
        const c = t.target.get("methods");
        c.getButton(`extend-${o}`).hide(), c.getButton(`hidden-${o}`).hide(), c.getButton(`show-${o}`).cfg.setText(i[a.hideChildren].length).show();
      }
      if (n.includes(`show-${o}`)) {
        const r = i.children.concat(i[a.hideChildren]);
        i[a.hideChildren] = [], e.updateChildren(r, i.id);
        const c = t.target.get("methods");
        c.getButton(`extend-${o}`).show(), c.getButton(`hidden-${o}`).show(), c.getButton(`show-${o}`).hide();
      }
    });
    m(this, "onEventListener", (n, i) => {
      n.on("node:click", (e) => {
        const t = e.target.get("names");
        if (!t)
          return;
        if (t.includes("address-node")) {
          const o = e.item.getModel();
          i.onNodeClick && i.onNodeClick(o, e.item);
          return;
        }
        const s = e.item.getModel();
        this.interactive(t, s, n, e);
      }), n.on("edge:click", (e) => {
        const t = e.target.get("names"), s = e.item, o = s.getTarget().getModel(), a = s.getSource().getModel();
        if (t.includes("edge-line")) {
          i.onEdgeClick && i.onEdgeClick({ targetModel: o, sourceModel: a }, s);
          return;
        }
        t.includes("clip") && (n.removeChild(o.id), i.onClipClick && i.onClipClick({ targetModel: o, sourceModel: a }));
      }), n.on("node:mouseenter", (e) => {
        const t = e.target.get("names");
        !t || (t.includes("address-node") && n.setItemState(e.item, "hover", !0), t.includes("action") && e.target.cfg.setHover());
      }), n.on("node:mouseleave", (e) => {
        var t;
        if ((t = e.item) != null && t.hasState("hover")) {
          n.clearItemStates(e.item, "hover");
          return;
        }
      }), n.on("mouseleave", (e) => {
        const t = e.target.get("names");
        t && t.includes("action") && e.target.cfg.clearHover();
      }), n.on("edge:mouseenter", (e) => {
        if (!e.item)
          return;
        const t = e.item.getKeyShape();
        t.cfg.setState && t.cfg.setState("hover", !0), t.cfg.setClipState && t.cfg.setClipState(!0);
      }), n.on("edge:mouseleave", (e) => {
        if (!e.item)
          return;
        const t = e.item.getKeyShape();
        t.cfg.setState && t.cfg.setState("hover", !1), t.cfg.setClipState && t.cfg.setClipState(!1);
      });
    });
    this.props = n;
  }
}
export {
  z as default
};
