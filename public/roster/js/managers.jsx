/* ============================================================
   Lifeline Roster — manager surfaces
   Exports: LoginScreen, DoctorModal, DepartmentManager,
   TimeBlockManager, AssignPopover
   ============================================================ */
(function () {
  "use strict";
  var h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect,
      useRef = React.useRef, useMemo = React.useMemo, useLayoutEffect = React.useLayoutEffect;
  var L = window.LMC;

  /* =====================================================
     LOGIN
     ===================================================== */
  function LoginScreen(props) {
    var em = useState(""), email = em[0], setEmail = em[1];
    var pw = useState(""), pass = pw[0], setPass = pw[1];
    var er = useState(null), err = er[0], setErr = er[1];
    var busy = useState(false), loading = busy[0], setLoading = busy[1];

    function submit(e) {
      e.preventDefault();
      if (!email.trim() || !pass.trim()) {
        setErr("Enter your staff email and password to continue.");
        return;
      }
      setErr(null); setLoading(true);
      setTimeout(function () {
        var nm = email.split("@")[0].replace(/[._-]+/g, " ")
          .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        props.onLogin({ name: nm || "Admin", email: email.trim() });
      }, 650);
    }

    return h("div", { className: "login-wrap" },
      h("div", { className: "login-art" },
        h("div", { className: "login-art-inner" },
          h(window.Logo, { size: 52, word: false }),
          h("h1", null, "Roster Control"),
          h("p", null, "Plan who's on duty across every department and time block — drag, drop, and publish to the live schedule in seconds."),
          h("ul", { className: "login-feat" },
            ["Live weekly grid for every department", "Drag-and-drop doctor assignment", "Autosaves as you work — nothing gets lost"].map(function (t, i) {
              return h("li", { key: i }, h(window.Icon, { name: "check", size: 15 }), t);
            })
          )
        ),
        h("div", { className: "login-pulse" })
      ),
      h("div", { className: "login-form-col" },
        h("form", { className: "login-card", onSubmit: submit },
          h("div", { style: { marginBottom: 26 } }, h(window.Logo, { size: 40 })),
          h("h2", null, "Staff sign in"),
          h("p", { className: "login-sub" }, "Sign in to manage the doctors' weekly schedule."),
          h(window.TextField, {
            label: "Staff email", type: "email", placeholder: "you@lmc.co.ug",
            value: email, autoFocus: true,
            onChange: function (e) { setEmail(e.target.value); setErr(null); }
          }),
          h("div", { style: { height: 14 } }),
          h(window.TextField, {
            label: "Password", type: "password", placeholder: "••••••••",
            value: pass, error: err,
            onChange: function (e) { setPass(e.target.value); setErr(null); }
          }),
          h(window.Btn, {
            variant: "primary", type: "submit", disabled: loading,
            className: "login-btn", iconRight: loading ? null : "logout"
          }, loading
            ? h(React.Fragment, null, h(window.Icon, { name: "spark", size: 16, className: "spin" }), " Signing in…")
            : "Sign in"),
          h("div", { className: "login-demo" },
            h(window.Icon, { name: "info", size: 13 }),
            h("span", null, "Demo workspace — any email & password will sign you in.")
          )
        ),
        h("div", { className: "login-foot" }, "© 2026 Lifeline Medical Centre — Gayaza")
      )
    );
  }

  /* =====================================================
     DOCTOR add / edit modal
     ===================================================== */
  var TITLES = ["Dr.", "Lead", "Consultant", "Nurse", "Specialist", "Technician"];
  function DoctorModal(props) {
    var existing = props.doctor;
    var st = useState(function () {
      return existing
        ? { name: existing.name, title: existing.title || "Dr.", deptId: existing.deptId, active: existing.active !== false }
        : { name: "", title: "Dr.", deptId: (props.departments[0] || {}).id, active: true };
    });
    var f = st[0], set = st[1];
    var er = useState(null), err = er[0], setErr = er[1];
    function upd(k, v) { set(function (s) { var n = Object.assign({}, s); n[k] = v; return n; }); setErr(null); }

    var dept = props.departments.find(function (d) { return d.id === f.deptId; });

    function save() {
      var name = f.name.trim();
      if (!name) { setErr("Give this team member a name."); return; }
      var dup = props.doctors.find(function (d) {
        return d.name.trim().toLowerCase() === name.toLowerCase() && (!existing || d.id !== existing.id);
      });
      if (dup) { setErr("Another roster member already uses this name."); return; }
      props.onSave({
        id: existing ? existing.id : L.uid("d"),
        name: name, title: f.title, deptId: f.deptId, active: f.active
      });
    }

    return h(window.Modal, {
      title: existing ? "Edit team member" : "Add team member",
      icon: "user", onClose: props.onClose,
      footer: [
        existing && h(window.Btn, { key: "del", variant: "danger", icon: "trash",
          onClick: function () { props.onRequestDelete(existing); } }, "Delete"),
        h("div", { key: "sp", style: { flex: 1 } }),
        h(window.Btn, { key: "c", variant: "ghost", onClick: props.onClose }, "Cancel"),
        h(window.Btn, { key: "s", variant: "primary", icon: "check", onClick: save },
          existing ? "Save changes" : "Add to roster")
      ]
    },
      h("div", { style: { display: "flex", gap: 16, alignItems: "center", marginBottom: 20 } },
        h(window.Avatar, { text: L.initials(f.name), color: dept ? dept.color : null, size: 56, onleave: !f.active }),
        h("div", { style: { fontSize: 13.5, color: "var(--text-soft)", lineHeight: 1.5 } },
          h("strong", { style: { color: "var(--text)", fontWeight: 700 } },
            (f.title && f.title !== "Lead" ? f.title + " " : "") + (f.name || "New member") + (f.title === "Lead" ? "" : "")),
          h("br"),
          dept ? h(window.DeptTag, { dept: dept }) : h("span", { className: "muted" }, "No department"))
      ),
      h(window.TextField, {
        label: "Name", placeholder: "e.g. Dr. Aisha Nakato", value: f.name, error: err,
        onChange: function (e) { upd("name", e.target.value); }, autoFocus: true
      }),
      h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 } },
        h("div", { className: "field" },
          h("label", null, "Title"),
          h("select", { className: "select", value: f.title, onChange: function (e) { upd("title", e.target.value); } },
            TITLES.map(function (t) { return h("option", { key: t, value: t }, t); }))),
        h("div", { className: "field" },
          h("label", null, "Department"),
          h("select", { className: "select", value: f.deptId, onChange: function (e) { upd("deptId", e.target.value); } },
            props.departments.map(function (d) { return h("option", { key: d.id, value: d.id }, d.name); })))
      ),
      h("div", { style: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 20, padding: "12px 14px", background: "var(--surface-2)",
        border: "1px solid var(--border)", borderRadius: "var(--r-sm)"
      } },
        h("div", null,
          h("div", { style: { fontWeight: 700, fontSize: 14 } }, "Active on roster"),
          h("div", { className: "field-hint" }, f.active ? "Available to schedule into slots." : "On leave — hidden from new assignments.")),
        h(window.Switch, { checked: f.active, onChange: function (e) { upd("active", e.target.checked); }, title: "Toggle active" })
      )
    );
  }

  /* =====================================================
     DEPARTMENT manager
     ===================================================== */
  function DepartmentManager(props) {
    var st = useState(function () { return props.departments.map(function (d) { return Object.assign({}, d, { color: Object.assign({}, d.color) }); }); });
    var list = st[0], setList = st[1];
    var openColor = useState(null), colorFor = openColor[0], setColorFor = openColor[1];
    var er = useState(null), err = er[0], setErr = er[1];

    var usage = useMemo(function () {
      var u = {};
      props.doctors.forEach(function (d) { u[d.deptId] = (u[d.deptId] || 0) + 1; });
      return u;
    }, [props.doctors]);

    function patch(id, k, v) {
      setList(function (l) { return l.map(function (d) {
        if (d.id !== id) return d;
        var n = Object.assign({}, d); n[k] = v; return n;
      }); });
      setErr(null);
    }
    function setColor(id, color) {
      setList(function (l) { return l.map(function (d) { return d.id === id ? Object.assign({}, d, { color: Object.assign({}, color) }) : d; }); });
    }
    function add() {
      var pal = L.PALETTE[list.length % L.PALETTE.length];
      var nd = { id: L.uid("dep"), name: "", short: "", color: Object.assign({}, pal) };
      setList(function (l) { return l.concat([nd]); });
    }
    function remove(id) {
      if (usage[id]) {
        props.onToast((usage[id]) + " roster member" + (usage[id] > 1 ? "s use" : " uses") + " this department — reassign them first.", "err");
        return;
      }
      setList(function (l) { return l.filter(function (d) { return d.id !== id; }); });
    }
    function apply() {
      var cleaned = [];
      for (var i = 0; i < list.length; i++) {
        var d = list[i];
        var name = (d.name || "").trim();
        if (!name) { setErr("Every department needs a name."); return; }
        if (cleaned.some(function (c) { return c.name.toLowerCase() === name.toLowerCase(); })) {
          setErr("Duplicate department name: “" + name + "”."); return;
        }
        cleaned.push({ id: d.id, name: name, short: (d.short || "").trim() || name, color: d.color });
      }
      if (cleaned.length === 0) { setErr("Keep at least one department."); return; }
      props.onApply(cleaned);
    }

    return h(window.Modal, {
      title: "Departments & tags", icon: "tag", wide: true, sub: "Rename, recolour, add or remove specialties.",
      onClose: props.onClose,
      footer: [
        err && h("div", { key: "e", className: "field-err", style: { marginRight: "auto" } },
          h(window.Icon, { name: "warn", size: 13 }), err),
        h(window.Btn, { key: "c", variant: "ghost", onClick: props.onClose }, "Cancel"),
        h(window.Btn, { key: "s", variant: "primary", icon: "check", onClick: apply }, "Save departments")
      ]
    },
      h("div", { style: { display: "flex", flexDirection: "column", gap: 9 } },
        list.map(function (d) {
          return h("div", { key: d.id, className: "dept-row" },
            h("div", { style: { position: "relative" } },
              h("button", { type: "button", className: "swatch", title: "Change colour",
                style: { background: d.color.bg, color: d.color.fg },
                onClick: function () { setColorFor(colorFor === d.id ? null : d.id); } },
                h("span", { className: "dot", style: { background: d.color.fg } })),
              colorFor === d.id && h("div", { className: "swatch-pop" },
                L.PALETTE.map(function (p, i) {
                  return h("button", { key: i, type: "button", className: "swatch-opt",
                    style: { background: p.bg, color: p.fg, outline: (p.fg === d.color.fg ? "2px solid " + p.fg : "none") },
                    onClick: function () { setColor(d.id, p); setColorFor(null); } },
                    h("span", { className: "dot", style: { background: p.fg } }));
                }))
            ),
            h("input", { className: "input dept-name", placeholder: "Department name", value: d.name,
              onChange: function (e) { patch(d.id, "name", e.target.value); } }),
            h("input", { className: "input dept-short", placeholder: "Tag label", value: d.short,
              onChange: function (e) { patch(d.id, "short", e.target.value); } }),
            h("span", { className: "dept-usage" }, (usage[d.id] || 0) + (usage[d.id] === 1 ? " doc" : " docs")),
            h(window.IconBtn, { icon: "trash", onClick: function () { remove(d.id); },
              "aria-label": "Remove department" })
          );
        })
      ),
      h(window.Btn, { variant: "soft", icon: "plus", size: "sm", onClick: add,
        className: "", style: { marginTop: 14 } }, "Add department")
    );
  }

  /* =====================================================
     TIME-BLOCK manager
     ===================================================== */
  function TimeBlockManager(props) {
    var st = useState(function () { return props.timeBlocks.map(function (b) { return Object.assign({}, b); }); });
    var list = st[0], setList = st[1];
    var er = useState(null), err = er[0], setErr = er[1];

    function patch(id, k, v) {
      setList(function (l) { return l.map(function (b) { if (b.id !== id) return b; var n = Object.assign({}, b); n[k] = v; return n; }); });
      setErr(null);
    }
    function add() {
      var last = list[list.length - 1];
      var start = last ? last.end : "08:00";
      var sm = L.toMinutes(start) + 180;
      var end = (Math.floor(sm / 60) % 24 < 10 ? "0" : "") + (Math.floor(sm / 60) % 24) + ":" + (sm % 60 < 10 ? "0" : "") + (sm % 60);
      setList(function (l) { return l.concat([{ id: L.uid("b"), start: start, end: end }]); });
    }
    function remove(id) { setList(function (l) { return l.filter(function (b) { return b.id !== id; }); }); setErr(null); }

    function apply() {
      if (list.length === 0) { setErr("Keep at least one time block."); return; }
      for (var i = 0; i < list.length; i++) {
        var b = list[i];
        var s = L.toMinutes(b.start), e = L.toMinutes(b.end);
        if (isNaN(s) || isNaN(e)) { setErr("Every block needs a valid start and end time."); return; }
        if (e <= s) { setErr("Block “" + L.blockLabel(b) + "” ends before it starts."); return; }
      }
      var sorted = list.slice().sort(function (a, b) { return L.toMinutes(a.start) - L.toMinutes(b.start); });
      // soft overlap warning (non-blocking)
      var overlap = false;
      for (var j = 1; j < sorted.length; j++) {
        if (L.toMinutes(sorted[j].start) < L.toMinutes(sorted[j - 1].end)) overlap = true;
      }
      props.onApply(sorted, overlap);
    }

    return h(window.Modal, {
      title: "Time blocks", icon: "clock", sub: "Define the shifts shown as rows in the grid.",
      onClose: props.onClose,
      footer: [
        err && h("div", { key: "e", className: "field-err", style: { marginRight: "auto" } },
          h(window.Icon, { name: "warn", size: 13 }), err),
        h(window.Btn, { key: "c", variant: "ghost", onClick: props.onClose }, "Cancel"),
        h(window.Btn, { key: "s", variant: "primary", icon: "check", onClick: apply }, "Save blocks")
      ]
    },
      h("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
        list.map(function (b) {
          return h("div", { key: b.id, className: "tb-row" },
            h("span", { className: "tb-ic" }, h(window.Icon, { name: "clock", size: 16 })),
            h("input", { className: "input", type: "time", value: b.start,
              onChange: function (e) { patch(b.id, "start", e.target.value); } }),
            h("span", { className: "muted", style: { fontWeight: 700 } }, "→"),
            h("input", { className: "input", type: "time", value: b.end,
              onChange: function (e) { patch(b.id, "end", e.target.value); } }),
            h(window.IconBtn, { icon: "trash", onClick: function () { remove(b.id); }, "aria-label": "Remove block" })
          );
        })
      ),
      h(window.Btn, { variant: "soft", icon: "plus", size: "sm", onClick: add, style: { marginTop: 14 } }, "Add time block"),
      h("p", { className: "field-hint", style: { marginTop: 14 } },
        "Removing a block clears its assignments. Existing assignments for kept blocks are preserved.")
    );
  }

  /* =====================================================
     ASSIGN popover (click-to-edit a cell)
     ===================================================== */
  function AssignPopover(props) {
    var ref = useRef(null);
    var qs = useState(""), q = qs[0], setQ = qs[1];
    var pos = useState(null), coords = pos[0], setCoords = pos[1];

    useLayoutEffect(function () {
      var el = ref.current; if (!el) return;
      var r = props.anchor.getBoundingClientRect();
      var w = el.offsetWidth, hgt = el.offsetHeight;
      var left = Math.min(r.left, window.innerWidth - w - 12);
      left = Math.max(12, left);
      var top = r.bottom + 8;
      if (top + hgt > window.innerHeight - 12) top = Math.max(12, r.top - hgt - 8);
      setCoords({ left: left, top: top });
    }, []);

    useEffect(function () {
      function onDown(e) { if (ref.current && !ref.current.contains(e.target)) props.onClose(); }
      function onKey(e) { if (e.key === "Escape") props.onClose(); }
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
      return function () { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
    }, []);

    var assigned = props.assigned; // array of ids
    var assignedSet = {};
    assigned.forEach(function (id) { assignedSet[id] = true; });

    var byDept = useMemo(function () {
      var ql = q.trim().toLowerCase();
      var groups = props.departments.map(function (dep) {
        var docs = props.doctors.filter(function (d) {
          if (d.deptId !== dep.id) return false;
          if (!d.active && !assignedSet[d.id]) return false;
          if (ql && d.name.toLowerCase().indexOf(ql) < 0 && dep.name.toLowerCase().indexOf(ql) < 0) return false;
          return true;
        });
        return { dep: dep, docs: docs };
      }).filter(function (g) { return g.docs.length; });
      return groups;
    }, [q, props.doctors, props.departments, props.assigned]);

    return h("div", { ref: ref, className: "assign-pop",
      style: coords ? { left: coords.left, top: coords.top, opacity: 1 } : { opacity: 0, left: -9999, top: 0 } },
      h("div", { className: "assign-pop-head" },
        h(window.Icon, { name: "search", size: 15, style: { color: "var(--text-faint)" } }),
        h("input", { className: "assign-search", placeholder: "Find a doctor…", value: q, autoFocus: true,
          onChange: function (e) { setQ(e.target.value); } }),
        h(window.IconBtn, { icon: "close", onClick: props.onClose, "aria-label": "Close", iconSize: 15 })
      ),
      h("div", { className: "assign-list scroll" },
        byDept.length === 0
          ? h("div", { className: "assign-empty" }, "No matching doctors.")
          : byDept.map(function (g) {
            return h("div", { key: g.dep.id, className: "assign-group" },
              h("div", { className: "assign-group-h" }, h(window.DeptTag, { dept: g.dep })),
              g.docs.map(function (d) {
                var on = !!assignedSet[d.id];
                return h("button", { key: d.id, type: "button",
                  className: "assign-item" + (on ? " on" : ""),
                  onClick: function () { props.onToggle(d.id); } },
                  h(window.Avatar, { text: L.initials(d.name), color: g.dep.color, size: 28, onleave: !d.active }),
                  h("span", { className: "assign-name" },
                    d.name,
                    !d.active && h("span", { className: "assign-leave" }, "on leave")),
                  h("span", { className: "assign-check" }, on && h(window.Icon, { name: "check", size: 15 }))
                );
              })
            );
          })
      ),
      h("div", { className: "assign-foot" },
        h("span", { className: "muted", style: { fontSize: 12 } }, assigned.length + " assigned"),
        h(window.Btn, { variant: "ghost", size: "sm", onClick: props.onClose }, "Done"))
    );
  }

  Object.assign(window, {
    LoginScreen: LoginScreen, DoctorModal: DoctorModal,
    DepartmentManager: DepartmentManager, TimeBlockManager: TimeBlockManager,
    AssignPopover: AssignPopover
  });
})();
