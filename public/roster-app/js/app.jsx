/* ============================================================
   Lifeline Roster — app root with Supabase backend
   ============================================================ */
(function () {
  "use strict";
  var h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect,
      useReducer = React.useReducer, useCallback = React.useCallback,
      useRef = React.useRef, useMemo = React.useMemo;
  var L = window.LMC;
  var HISTORY_CAP = 60;

  /* ---------------- pure doc mutations ---------------- */
  function withSchedule(doc, k, fn) {
    var sch = Object.assign({}, doc.schedule);
    sch[k] = fn((sch[k] || []).slice());
    return Object.assign({}, doc, { schedule: sch });
  }
  var M = {
    assignAdd: function (doc, k, id) {
      return withSchedule(doc, k, function (arr) { return arr.indexOf(id) >= 0 ? arr : arr.concat([id]); });
    },
    assignRemove: function (doc, k, id) {
      return withSchedule(doc, k, function (arr) { return arr.filter(function (x) { return x !== id; }); });
    },
    assignMove: function (doc, fromK, toK, id) {
      var d2 = M.assignRemove(doc, fromK, id);
      return M.assignAdd(d2, toK, id);
    },
    saveDoctor: function (doc, dr) {
      var found = false;
      var doctors = doc.doctors.map(function (d) { if (d.id === dr.id) { found = true; return dr; } return d; });
      if (!found) doctors = doctors.concat([dr]);
      return Object.assign({}, doc, { doctors: doctors });
    },
    deleteDoctor: function (doc, id) {
      var doctors = doc.doctors.filter(function (d) { return d.id !== id; });
      var sch = {};
      Object.keys(doc.schedule).forEach(function (k) {
        sch[k] = doc.schedule[k].filter(function (x) { return x !== id; });
      });
      return Object.assign({}, doc, { doctors: doctors, schedule: sch });
    },
    toggleActive: function (doc, id) {
      return Object.assign({}, doc, { doctors: doc.doctors.map(function (d) {
        return d.id === id ? Object.assign({}, d, { active: !d.active }) : d;
      }) });
    },
    applyDepts: function (doc, list) {
      return L.sanitize(Object.assign({}, doc, { departments: list }));
    },
    applyBlocks: function (doc, list) {
      return L.sanitize(Object.assign({}, doc, { timeBlocks: list }));
    }
  };

  /* ---------------- history reducer ---------------- */
  function historyReducer(state, action) {
    switch (action.type) {
      case "init":
        return { past: [], present: action.doc, future: [] };
      case "commit": {
        var next = typeof action.fn === "function" ? action.fn(state.present) : action.fn;
        if (next === state.present) return state;
        var past = state.past.concat([state.present]);
        if (past.length > HISTORY_CAP) past = past.slice(past.length - HISTORY_CAP);
        return { past: past, present: next, future: [] };
      }
      case "undo": {
        if (!state.past.length) return state;
        var prev = state.past[state.past.length - 1];
        return { past: state.past.slice(0, -1), present: prev, future: [state.present].concat(state.future) };
      }
      case "redo": {
        if (!state.future.length) return state;
        var nx = state.future[0];
        return { past: state.past.concat([state.present]), present: nx, future: state.future.slice(1) };
      }
      default: return state;
    }
  }

  /* ---------------- Loading screen ---------------- */
  function LoadingScreen() {
    return h("div", { className: "loading-screen" },
      h("div", { className: "loading-content" },
        h(window.Logo, { size: 48 }),
        h("div", { className: "loading-spinner" },
          h(window.Icon, { name: "spark", size: 20, className: "spin" })),
        h("p", null, "Loading roster data…")
      )
    );
  }

  /* ---------------- root ---------------- */
  function RosterApp() {
    /* loading state */
    var loadingS = useState(true), loading = loadingS[0], setLoading = loadingS[1];
    var dataSourceS = useState(""), dataSource = dataSourceS[0], setDataSource = dataSourceS[1];

    /* session / login */
    var sess = useState(function () { return L.loadSession(); });
    var user = sess[0], setUser = sess[1];

    /* document history */
    var hist = useReducer(historyReducer, { past: [], present: L.seed(), future: [] });
    var state = hist[0], dispatch = hist[1];
    var doc = state.present;

    var toasts = window.useToasts();

    /* publish / dirty tracking */
    var publishedRef = useRef("");
    var dirty = useState(false);
    var isDirty = dirty[0], setDirty = dirty[1];
    var saveStateS = useState("saved"), saveState = saveStateS[0], setSaveState = saveStateS[1];
    var publishingS = useState(false), publishing = publishingS[0], setPublishing = publishingS[1];

    /* UI surfaces */
    var ui = useState({ doctorModal: null, manageDepts: false, manageBlocks: false, confirm: null, userMenu: false });
    var surf = ui[0], setSurf = ui[1];
    var patchSurf = useCallback(function (p) { setSurf(function (s) { return Object.assign({}, s, p); }); }, []);
    var assignS = useState(null), assign = assignS[0], setAssign = assignS[1];

    /* derived lookups */
    var deptById = useMemo(function () {
      var m = {}; doc.departments.forEach(function (d) { m[d.id] = d; }); return m;
    }, [doc.departments]);
    var docById = useMemo(function () {
      var m = {}; doc.doctors.forEach(function (d) { m[d.id] = d; }); return m;
    }, [doc.doctors]);

    /* initial async load */
    useEffect(function () {
      // Clear any old localStorage data first
      try {
        localStorage.removeItem("lmc_roster_doc_v1");
      } catch (e) {}

      L.load().then(function (result) {
        console.log("[LMC] Data loaded:", result.source, result.doc);
        dispatch({ type: "init", doc: result.doc });
        publishedRef.current = JSON.stringify(result.doc);
        setDataSource(result.source);
        setLoading(false);
        if (result.source === "supabase") {
          toasts.push("Connected to database.", "ok", 2600);
        } else if (result.fresh) {
          toasts.push("Using default roster (database unavailable).", "info", 3500);
        }
      }).catch(function (err) {
        console.error("Load error:", err);
        setLoading(false);
        toasts.push("Failed to load data. Using defaults.", "err", 4000);
      });
    }, []);

    /* ---- commit + autosave indicator ---- */
    var commit = useCallback(function (fn) {
      dispatch({ type: "commit", fn: fn });
      setDirty(true);
      setSaveState("unsaved");
    }, []);

    /* recompute dirty vs published */
    useEffect(function () {
      setDirty(JSON.stringify(doc) !== publishedRef.current);
    }, [doc]);

    /* ---- undo / redo ---- */
    var canUndo = state.past.length > 0, canRedo = state.future.length > 0;
    var undo = useCallback(function () { dispatch({ type: "undo" }); }, []);
    var redo = useCallback(function () { dispatch({ type: "redo" }); }, []);

    useEffect(function () {
      function onKey(e) {
        var t = e.target;
        if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
        var meta = e.metaKey || e.ctrlKey;
        if (!meta) return;
        var key = e.key.toLowerCase();
        if (key === "z" && !e.shiftKey) { e.preventDefault(); dispatch({ type: "undo" }); }
        else if ((key === "z" && e.shiftKey) || key === "y") { e.preventDefault(); dispatch({ type: "redo" }); }
      }
      document.addEventListener("keydown", onKey);
      return function () { document.removeEventListener("keydown", onKey); };
    }, []);

    /* ---- unsaved-changes warning ---- */
    useEffect(function () {
      function onBeforeUnload(e) {
        if (!isDirty || !user) return;
        e.preventDefault(); e.returnValue = ""; return "";
      }
      window.addEventListener("beforeunload", onBeforeUnload);
      return function () { window.removeEventListener("beforeunload", onBeforeUnload); };
    }, [isDirty, user]);

    /* ---- publish to Supabase ---- */
    function publish() {
      if (publishing) return;
      setPublishing(true);
      setSaveState("saving");

      L.saveAll(doc).then(function (success) {
        if (success) {
          publishedRef.current = JSON.stringify(doc);
          setDirty(false);
          setSaveState("saved");
          toasts.push("Published to database.", "ok");
        } else {
          setSaveState("unsaved");
          toasts.push("Failed to publish. Check connection.", "err");
        }
        setPublishing(false);
      }).catch(function (err) {
        console.error("Publish error:", err);
        setSaveState("unsaved");
        setPublishing(false);
        toasts.push("Publish failed: " + err.message, "err");
      });
    }

    /* ---- doctor actions ---- */
    function onSaveDoctor(dr) {
      var isNew = !doc.doctors.some(function (d) { return d.id === dr.id; });
      commit(function (d) { return M.saveDoctor(d, dr); });
      patchSurf({ doctorModal: null });
      toasts.push(isNew ? "Added " + dr.name + " to the roster." : "Saved changes to " + dr.name + ".", "ok");
    }
    function requestDeleteDoctor(dr) {
      var slots = Object.keys(doc.schedule).filter(function (k) { return doc.schedule[k].indexOf(dr.id) >= 0; }).length;
      patchSurf({
        doctorModal: null,
        confirm: {
          title: "Remove " + dr.name + "?", danger: true, confirmLabel: "Remove", confirmIcon: "trash",
          message: slots
            ? dr.name + " is assigned to " + slots + " slot" + (slots > 1 ? "s" : "") + ". Removing them clears those assignments."
            : "This removes " + dr.name + " from the roster.",
          onConfirm: function () {
            commit(function (d) { return M.deleteDoctor(d, dr.id); });
            patchSurf({ confirm: null });
            toasts.push("Removed " + dr.name + ".", "ok");
          }
        }
      });
    }
    function toggleActive(dr) {
      commit(function (d) { return M.toggleActive(d, dr.id); });
    }

    /* ---- slot actions ---- */
    var onAssign = useCallback(function (k, id) { commit(function (d) { return M.assignAdd(d, k, id); }); }, [commit]);
    var onUnassign = useCallback(function (k, id) { commit(function (d) { return M.assignRemove(d, k, id); }); }, [commit]);
    var onMove = useCallback(function (fromK, toK, id) { commit(function (d) { return M.assignMove(d, fromK, toK, id); }); }, [commit]);

    function openAssign(blockId, day, anchor) {
      setAssign({ blockId: blockId, day: day, anchor: anchor });
    }
    function toggleSlotDoctor(id) {
      if (!assign) return;
      var k = L.key(assign.blockId, assign.day);
      var has = (doc.schedule[k] || []).indexOf(id) >= 0;
      commit(function (d) { return has ? M.assignRemove(d, k, id) : M.assignAdd(d, k, id); });
    }

    /* ---- manager applies ---- */
    function applyDepts(list) {
      commit(function (d) { return M.applyDepts(d, list); });
      patchSurf({ manageDepts: false });
      toasts.push("Departments updated.", "ok");
    }
    function applyBlocks(list, overlap) {
      commit(function (d) { return M.applyBlocks(d, list); });
      patchSurf({ manageBlocks: false });
      toasts.push(overlap ? "Time blocks saved (note: some overlap)." : "Time blocks updated.", overlap ? "info" : "ok");
    }

    /* ---- refresh from database ---- */
    function refreshFromDB() {
      patchSurf({ userMenu: false });
      setLoading(true);
      L.load().then(function (result) {
        dispatch({ type: "init", doc: result.doc });
        publishedRef.current = JSON.stringify(result.doc);
        setDataSource(result.source);
        setDirty(false);
        setLoading(false);
        toasts.push("Refreshed from database.", "ok");
      }).catch(function (err) {
        setLoading(false);
        toasts.push("Failed to refresh: " + err.message, "err");
      });
    }

    /* ---- reset / logout ---- */
    function requestReset() {
      patchSurf({ userMenu: false, confirm: {
        title: "Reset to defaults?", danger: true, confirmLabel: "Reset everything", confirmIcon: "trash",
        message: "This restores the original roster from the database seed. Your unpublished changes will be discarded.",
        onConfirm: function () {
          var fresh = L.seed();
          dispatch({ type: "init", doc: fresh });
          publishedRef.current = JSON.stringify(fresh);
          setDirty(false);
          patchSurf({ confirm: null });
          toasts.push("Roster reset to defaults.", "ok");
        }
      } });
    }
    function logout() {
      L.clearSession(); setUser(null); patchSurf({ userMenu: false });
    }

    /* ============ render: loading ============ */
    if (loading) {
      return h(LoadingScreen);
    }

    /* ============ render: login gate ============ */
    if (!user) {
      return h(window.LoginScreen, { onLogin: function (u) { L.saveSession(u); setUser(u); } });
    }

    var unpublished = isDirty;
    var assignDoc = assign ? (doc.schedule[L.key(assign.blockId, assign.day)] || []) : [];
    var assignBlock = assign ? doc.timeBlocks.find(function (b) { return b.id === assign.blockId; }) : null;

    /* ============ render: app ============ */
    return h("div", { className: "app" },
      /* header */
      h("header", { className: "topbar" },
        h("div", { className: "tb-left" },
          h(window.Logo, { size: 36 }),
          h("span", { className: "tb-slug mono" }, "/roster"),
          dataSource === "supabase" && h("span", { className: "db-badge" }, "DB")
        ),
        h("div", { className: "tb-center" },
          h(window.IconBtn, { icon: "undo", framed: true, onClick: undo, disabled: !canUndo,
            title: "Undo (Ctrl+Z)", "aria-label": "Undo" }),
          h(window.IconBtn, { icon: "redo", framed: true, onClick: redo, disabled: !canRedo,
            title: "Redo (Ctrl+Shift+Z)", "aria-label": "Redo" }),
          h("span", { className: "save-state " + saveState },
            saveState === "saving"
              ? h(React.Fragment, null, h(window.Icon, { name: "spark", size: 13, className: "spin" }), "Saving…")
              : saveState === "unsaved"
              ? h(React.Fragment, null, h(window.Icon, { name: "warn", size: 13 }), "Unsaved changes")
              : h(React.Fragment, null, h(window.Icon, { name: "check", size: 13 }), "All changes saved"))
        ),
        h("div", { className: "tb-right" },
          h(window.Btn, { variant: "primary", icon: publishing ? null : "spark", onClick: publish,
            disabled: publishing || !unpublished, className: "publish-btn" },
            publishing
              ? h(React.Fragment, null, h(window.Icon, { name: "spark", size: 15, className: "spin" }), " Publishing…")
              : (unpublished ? "Publish changes" : "Published"),
            unpublished && !publishing && h("span", { className: "pub-dot" })),
          h("div", { className: "usermenu-wrap" },
            h("button", { type: "button", className: "usermenu-btn", onClick: function () { patchSurf({ userMenu: !surf.userMenu }); } },
              h(window.Avatar, { text: L.initials(user.name), size: 32, color: { fg: "var(--green-600)" } }),
              h(window.Icon, { name: "chevdown", size: 15, style: { color: "var(--text-faint)" } })),
            surf.userMenu && h(React.Fragment, null,
              h("div", { className: "menu-scrim", onClick: function () { patchSurf({ userMenu: false }); } }),
              h("div", { className: "usermenu" },
                h("div", { className: "um-id" },
                  h("div", { className: "um-name" }, user.name),
                  h("div", { className: "um-email" }, user.email)),
                h("hr", { className: "divider" }),
                h("button", { className: "um-item", onClick: refreshFromDB },
                  h(window.Icon, { name: "undo", size: 16 }), "Refresh from database"),
                h("button", { className: "um-item", onClick: requestReset },
                  h(window.Icon, { name: "trash", size: 16 }), "Reset to defaults"),
                h("button", { className: "um-item danger", onClick: logout },
                  h(window.Icon, { name: "logout", size: 16 }), "Sign out"))
            )
          )
        )
      ),

      /* body */
      h("div", { className: "body" },
        h(window.Sidebar, {
          doctors: doc.doctors, deptById: deptById,
          onAddDoctor: function () { patchSurf({ doctorModal: { mode: "new" } }); },
          onEditDoctor: function (d) { patchSurf({ doctorModal: { mode: "edit", doctor: d } }); },
          onToggleActive: toggleActive
        }),
        h("main", { className: "main" },
          h("div", { className: "main-toolbar" },
            h("div", null,
              h("h1", { className: "main-title" }, "Doctors' weekly schedule"),
              h("p", { className: "main-sub" },
                doc.doctors.filter(function(d){return d.active;}).length + " on duty · " +
                doc.departments.length + " departments · " + doc.timeBlocks.length + " shifts/day")),
            h("div", { className: "main-tools" },
              h(window.Btn, { variant: "soft", icon: "clock", onClick: function () { patchSurf({ manageBlocks: true }); } }, "Time blocks"),
              h(window.Btn, { variant: "soft", icon: "tag", onClick: function () { patchSurf({ manageDepts: true }); } }, "Departments"))
          ),
          h(window.WeekGrid, {
            timeBlocks: doc.timeBlocks, schedule: doc.schedule,
            docById: docById, deptById: deptById,
            onAssign: onAssign, onUnassign: onUnassign, onMove: onMove,
            onOpenAssign: openAssign, onManageBlocks: function () { patchSurf({ manageBlocks: true }); },
            onToast: toasts.push
          })
        )
      ),

      /* assign popover */
      assign && assignBlock && h(window.AssignPopover, {
        anchor: assign.anchor, departments: doc.departments, doctors: doc.doctors,
        assigned: assignDoc, onToggle: toggleSlotDoctor, onClose: function () { setAssign(null); }
      }),

      /* doctor modal */
      surf.doctorModal && h(window.DoctorModal, {
        doctor: surf.doctorModal.mode === "edit" ? surf.doctorModal.doctor : null,
        departments: doc.departments, doctors: doc.doctors,
        onSave: onSaveDoctor, onClose: function () { patchSurf({ doctorModal: null }); },
        onRequestDelete: requestDeleteDoctor
      }),

      /* department manager */
      surf.manageDepts && h(window.DepartmentManager, {
        departments: doc.departments, doctors: doc.doctors,
        onApply: applyDepts, onClose: function () { patchSurf({ manageDepts: false }); },
        onToast: toasts.push
      }),

      /* time-block manager */
      surf.manageBlocks && h(window.TimeBlockManager, {
        timeBlocks: doc.timeBlocks,
        onApply: applyBlocks, onClose: function () { patchSurf({ manageBlocks: false }); }
      }),

      /* confirm dialog */
      surf.confirm && h(window.ConfirmDialog, {
        title: surf.confirm.title, message: surf.confirm.message, danger: surf.confirm.danger,
        confirmLabel: surf.confirm.confirmLabel, confirmIcon: surf.confirm.confirmIcon,
        onConfirm: surf.confirm.onConfirm, onCancel: function () { patchSurf({ confirm: null }); }
      }),

      h(window.ToastHost, { toasts: toasts })
    );
  }

  /* mount */
  var root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(h(window.ErrorBoundary, null, h(RosterApp)));
})();
