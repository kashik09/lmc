/* ============================================================
   Lifeline Roster — UI primitives
   Exports to window: Icon, Logo, Btn, IconBtn, Avatar, DeptTag,
   Switch, TextField, Modal, ConfirmDialog, ErrorBoundary,
   ToastHost, useToasts
   ============================================================ */
(function () {
  "use strict";
  var h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect,
      useRef = React.useRef, useCallback = React.useCallback;

  /* ---------------- Icons ---------------- */
  var PATHS = {
    plus:   "M12 5v14M5 12h14",
    close:  "M6 6l12 12M18 6L6 18",
    check:  "M20 6L9 17l-5-5",
    pencil: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
    trash:  "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6",
    undo:   "M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3",
    redo:   "M15 14l5-5-5-5M20 9H9a5 5 0 0 0 0 10h3",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
    grip:   "M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01",
    user:   "M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
    cal:    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    clock:  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
    tag:    "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8ZM7.5 7.5h.01",
    sliders:"M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
    warn:   "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
    spark:  "M12 3l1.9 5.5L19 10l-5.1 1.5L12 17l-1.9-5.5L5 10l5.1-1.5L12 3Z",
    info:   "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-4M12 8h.01",
    chevdown:"M6 9l6 6 6-6",
    drag:   "M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20",
    eye:    "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    leave:  "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM5 5l14 14"
  };
  function Icon(props) {
    var d = PATHS[props.name] || "";
    var s = props.size || 18;
    return h("svg", {
      width: s, height: s, viewBox: "0 0 24 24", fill: "none",
      stroke: "currentColor", strokeWidth: props.weight || 2,
      strokeLinecap: "round", strokeLinejoin: "round",
      style: props.style, "aria-hidden": "true", className: props.className
    }, d.split(" M").map(function (seg, i) {
      return h("path", { key: i, d: (i ? "M" : "") + seg });
    }));
  }

  /* ---------------- Logo ---------------- */
  function Logo(props) {
    var size = props.size || 38;
    var withWord = props.word !== false;
    var sub = props.sub;
    return h("div", { className: "lmc-logo", style: { display: "flex", alignItems: "center", gap: 11 } },
      h("svg", { width: size, height: size, viewBox: "0 0 44 44", "aria-hidden": "true",
        style: { flex: "none", filter: "drop-shadow(0 3px 6px rgba(16,40,24,.22))" } },
        h("defs", null,
          h("linearGradient", { id: "lmcG", x1: "0", y1: "0", x2: "1", y2: "1" },
            h("stop", { offset: "0", stopColor: "#34a85f" }),
            h("stop", { offset: "1", stopColor: "#15703a" })
          )
        ),
        h("rect", { x: 2, y: 2, width: 40, height: 40, rx: 13, fill: "url(#lmcG)" }),
        h("rect", { x: 2, y: 2, width: 40, height: 40, rx: 13, fill: "none",
          stroke: "rgba(255,255,255,.25)", strokeWidth: 1 }),
        // pulse / lifeline
        h("path", { d: "M7 24 H15 L18 15 L24 30 L27 24 H37",
          fill: "none", stroke: "#fff", strokeWidth: 2.7,
          strokeLinecap: "round", strokeLinejoin: "round" }),
        h("circle", { cx: 37, cy: 24, r: 1.7, fill: "#fff" })
      ),
      withWord && h("div", { style: { lineHeight: 1.05 } },
        h("div", { style: { fontSize: 17, fontWeight: 800, letterSpacing: "-.02em", color: "var(--text)" } },
          "Lifeline", h("span", { style: { color: "var(--green-600)" } }, " Medical")),
        h("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em",
          textTransform: "uppercase", color: "var(--text-faint)", marginTop: 2 } }, sub || "Centre · Gayaza"))
    );
  }

  /* ---------------- Buttons ---------------- */
  function Btn(props) {
    var variant = props.variant || "soft";
    var cls = "btn btn-" + variant;
    if (props.size) cls += " btn-" + props.size;
    if (props.className) cls += " " + props.className;
    var rest = {};
    for (var k in props) if (["variant", "size", "className", "icon", "iconRight", "children"].indexOf(k) < 0) rest[k] = props[k];
    return h("button", Object.assign({ className: cls, type: "button" }, rest),
      props.icon && h(Icon, { name: props.icon, size: props.size === "xs" ? 14 : 16 }),
      props.children,
      props.iconRight && h(Icon, { name: props.iconRight, size: 16 })
    );
  }
  function IconBtn(props) {
    var cls = "btn btn-icon" + (props.framed ? " framed" : "") + (props.className ? " " + props.className : "");
    var rest = {};
    for (var k in props) if (["icon", "framed", "className", "size", "iconSize"].indexOf(k) < 0) rest[k] = props[k];
    return h("button", Object.assign({ className: cls, type: "button" }, rest),
      h(Icon, { name: props.icon, size: props.iconSize || 18 }));
  }

  /* ---------------- Avatar ---------------- */
  function Avatar(props) {
    var size = props.size || 34;
    var color = props.color;
    var style = {
      width: size, height: size, fontSize: Math.round(size * 0.38),
    };
    if (color) { style.background = color.fg; }
    return h("span", {
      className: "avatar" + (props.onleave ? " onleave" : "") + (props.className ? " " + props.className : ""),
      style: Object.assign(style, props.style || {}), title: props.title
    }, props.text);
  }

  /* ---------------- Department tag ---------------- */
  function DeptTag(props) {
    var d = props.dept;
    if (!d) return null;
    return h("span", {
      className: "tag", style: { background: d.color.bg, color: d.color.fg }
    },
      props.dot !== false && h("span", { className: "dot", style: { background: d.color.fg } }),
      props.label || d.short || d.name);
  }

  /* ---------------- Switch ---------------- */
  function Switch(props) {
    return h("label", { className: "switch", title: props.title },
      h("input", { type: "checkbox", checked: !!props.checked, onChange: props.onChange,
        "aria-label": props["aria-label"] || props.title }),
      h("span", { className: "track" }),
      h("span", { className: "thumb" }));
  }

  /* ---------------- TextField ---------------- */
  function TextField(props) {
    var rest = {};
    for (var k in props) if (["label", "hint", "error", "as", "className"].indexOf(k) < 0) rest[k] = props[k];
    var Tag = props.as || "input";
    return h("div", { className: "field" },
      props.label && h("label", null, props.label),
      h(Tag, Object.assign({
        className: "input" + (props.error ? " invalid" : "") + (props.className ? " " + props.className : "")
      }, rest)),
      props.error
        ? h("div", { className: "field-err" }, h(Icon, { name: "warn", size: 13 }), props.error)
        : (props.hint && h("div", { className: "field-hint" }, props.hint))
    );
  }

  /* ---------------- Modal ---------------- */
  function Modal(props) {
    useEffect(function () {
      function onKey(e) { if (e.key === "Escape" && props.onClose) props.onClose(); }
      document.addEventListener("keydown", onKey);
      return function () { document.removeEventListener("keydown", onKey); };
    }, [props.onClose]);

    return h("div", {
      className: "overlay",
      onMouseDown: function (e) { if (e.target === e.currentTarget && props.onClose && !props.lock) props.onClose(); }
    },
      h("div", { className: "modal" + (props.wide ? " wide" : ""), role: "dialog", "aria-modal": "true" },
        h("div", { className: "modal-head" },
          props.icon && h("span", { style: {
            width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center",
            background: "var(--green-50)", color: "var(--green-600)", flex: "none"
          } }, h(Icon, { name: props.icon, size: 20 })),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("h2", null, props.title),
            props.sub && h("div", { className: "sub" }, props.sub)),
          props.onClose && h(IconBtn, { icon: "close", onClick: props.onClose, "aria-label": "Close" })
        ),
        h("div", { className: "modal-body scroll" }, props.children),
        props.footer && h("div", { className: "modal-foot" }, props.footer)
      )
    );
  }

  /* ---------------- Confirm dialog ---------------- */
  function ConfirmDialog(props) {
    return h(Modal, {
      title: props.title, icon: props.danger ? "warn" : "info",
      onClose: props.onCancel,
      footer: [
        h(Btn, { key: "c", variant: "ghost", onClick: props.onCancel }, props.cancelLabel || "Cancel"),
        h(Btn, { key: "k", variant: props.danger ? "danger-solid" : "primary", onClick: props.onConfirm,
          icon: props.confirmIcon }, props.confirmLabel || "Confirm")
      ]
    }, h("p", { style: { margin: 0, color: "var(--text-soft)", fontSize: 14.5, lineHeight: 1.55 } }, props.message));
  }

  /* ---------------- Toasts ---------------- */
  function useToasts() {
    var ref = useState(function () { return { id: 0 }; })[0];
    var st = useState([]);
    var list = st[0], setList = st[1];
    var push = useCallback(function (msg, kind, ms) {
      var id = ++ref.id;
      setList(function (l) { return l.concat([{ id: id, msg: msg, kind: kind || "info" }]); });
      var dur = ms == null ? 3200 : ms;
      if (dur > 0) setTimeout(function () {
        setList(function (l) { return l.filter(function (t) { return t.id !== id; }); });
      }, dur);
      return id;
    }, []);
    var dismiss = useCallback(function (id) {
      setList(function (l) { return l.filter(function (t) { return t.id !== id; }); });
    }, []);
    return { list: list, push: push, dismiss: dismiss };
  }
  function ToastHost(props) {
    var ICON = { ok: "check", err: "warn", info: "info" };
    return h("div", { className: "toast-host" },
      props.toasts.list.map(function (t) {
        return h("div", { className: "toast " + t.kind, key: t.id },
          h("span", { className: "ic" }, h(Icon, { name: ICON[t.kind] || "info", size: 17 })),
          h("span", null, t.msg),
          h("button", { onClick: function () { props.toasts.dismiss(t.id); } }, "Dismiss"));
      }));
  }

  /* ---------------- Error boundary ---------------- */
  function ErrorBoundary() { return null; }
  var EB = (function () {
    function Boundary(props) { React.Component.call(this, props); this.state = { err: null }; }
    Boundary.prototype = Object.create(React.Component.prototype);
    Boundary.prototype.constructor = Boundary;
    Boundary.getDerivedStateFromError = function (err) { return { err: err }; };
    Boundary.prototype.componentDidCatch = function (err, info) { console.error("[LMC] UI crash:", err, info); };
    Boundary.prototype.render = function () {
      var self = this;
      if (this.state.err) {
        return h("div", { style: {
          height: "100%", display: "grid", placeItems: "center", padding: 24, background: "var(--bg)"
        } },
          h("div", { style: {
            maxWidth: 440, background: "var(--surface)", borderRadius: "var(--r-lg)",
            boxShadow: "var(--sh-2)", padding: "34px 32px", textAlign: "center"
          } },
            h("div", { style: {
              width: 54, height: 54, borderRadius: 16, margin: "0 auto 18px", display: "grid",
              placeItems: "center", background: "var(--danger-bg)", color: "var(--danger)"
            } }, h(Icon, { name: "warn", size: 28 })),
            h("h2", { style: { margin: "0 0 8px", fontSize: 20, fontWeight: 800 } }, "Something hiccuped"),
            h("p", { style: { margin: "0 0 22px", color: "var(--text-soft)", fontSize: 14.5, lineHeight: 1.55 } },
              "The editor hit an unexpected snag, but your saved roster is safe. Reload to pick up where you left off."),
            h("div", { style: { display: "flex", gap: 10, justifyContent: "center" } },
              h(Btn, { variant: "primary", icon: "undo", onClick: function () { location.reload(); } }, "Reload editor"),
              h(Btn, { variant: "ghost", onClick: function () { self.setState({ err: null }); } }, "Try to continue"))
          )
        );
      }
      return this.props.children;
    };
    return Boundary;
  })();

  Object.assign(window, {
    Icon: Icon, Logo: Logo, Btn: Btn, IconBtn: IconBtn, Avatar: Avatar, DeptTag: DeptTag,
    Switch: Switch, TextField: TextField, Modal: Modal, ConfirmDialog: ConfirmDialog,
    ToastHost: ToastHost, useToasts: useToasts, ErrorBoundary: EB
  });
})();
