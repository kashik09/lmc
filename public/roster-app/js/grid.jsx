/* ============================================================
   Lifeline Roster — Sidebar (doctor palette) + WeekGrid
   Exports: Sidebar, WeekGrid
   Drag state shared via window.__lmcDrag
   ============================================================ */
(function () {
  "use strict";
  var h = React.createElement;
  var useState = React.useState, useMemo = React.useMemo, useRef = React.useRef;
  var L = window.LMC;

  function setDrag(d) { window.__lmcDrag = d; }
  function getDrag() { return window.__lmcDrag || null; }

  /* ---------------- Doctor palette card ---------------- */
  function PaletteCard(props) {
    var d = props.doc, dept = props.dept;
    return h("div", {
      className: "pal-card" + (d.active ? "" : " leave"),
      draggable: d.active,
      onDragStart: function (e) {
        setDrag({ docId: d.id, fromKey: null });
        e.dataTransfer.effectAllowed = "copy";
        try { e.dataTransfer.setData("text/plain", d.id); } catch (x) {}
        e.currentTarget.classList.add("dragging");
      },
      onDragEnd: function (e) { setDrag(null); e.currentTarget.classList.remove("dragging"); },
      title: d.active ? "Drag onto a slot to schedule" : "On leave — toggle active to schedule"
    },
      d.active && h("span", { className: "pal-grip" }, h(window.Icon, { name: "grip", size: 15 })),
      h(window.Avatar, { text: L.initials(d.name), color: dept ? dept.color : null, size: 38, onleave: !d.active }),
      h("div", { className: "pal-meta" },
        h("div", { className: "pal-name" }, d.name),
        h("div", { className: "pal-tags" },
          dept && h(window.DeptTag, { dept: dept, dot: true }),
          h("span", { className: "pal-title" }, d.title))
      ),
      h("div", { className: "pal-actions" },
        h(window.Switch, { checked: d.active, title: d.active ? "Set on leave" : "Set active",
          onChange: function () { props.onToggleActive(d); } }),
        h(window.IconBtn, { icon: "pencil", iconSize: 15, className: "pal-edit",
          onClick: function () { props.onEdit(d); }, "aria-label": "Edit doctor" })
      )
    );
  }

  /* ---------------- Sidebar ---------------- */
  function Sidebar(props) {
    var qs = useState(""), q = qs[0], setQ = qs[1];
    var fs = useState("all"), filt = fs[0], setFilt = fs[1];

    var deptById = props.deptById;
    var filtered = useMemo(function () {
      var ql = q.trim().toLowerCase();
      return props.doctors.filter(function (d) {
        if (filt === "active" && !d.active) return false;
        if (filt === "leave" && d.active) return false;
        if (!ql) return true;
        var dep = deptById[d.deptId];
        return d.name.toLowerCase().indexOf(ql) >= 0 ||
          (dep && dep.name.toLowerCase().indexOf(ql) >= 0);
      });
    }, [props.doctors, q, filt, deptById]);

    var activeCount = props.doctors.filter(function (d) { return d.active; }).length;

    return h("aside", { className: "sidebar" },
      h("div", { className: "side-head" },
        h("div", { className: "side-title" },
          h("span", null, "Doctors"),
          h("span", { className: "side-count" }, props.doctors.length)),
        h(window.Btn, { variant: "primary", size: "sm", icon: "plus", onClick: props.onAddDoctor }, "Add")
      ),
      h("div", { className: "side-search" },
        h(window.Icon, { name: "search", size: 15, style: { color: "var(--text-faint)" } }),
        h("input", { placeholder: "Search doctors…", value: q, onChange: function (e) { setQ(e.target.value); } }),
        q && h(window.IconBtn, { icon: "close", iconSize: 14, onClick: function () { setQ(""); } })
      ),
      h("div", { className: "side-filters" },
        [["all", "All " + props.doctors.length], ["active", "On duty " + activeCount], ["leave", "On leave " + (props.doctors.length - activeCount)]]
          .map(function (o) {
            return h("button", { key: o[0], type: "button",
              className: "chip-filter" + (filt === o[0] ? " on" : ""),
              onClick: function () { setFilt(o[0]); } }, o[1]);
          })
      ),
      h("div", { className: "side-list scroll" },
        filtered.length === 0
          ? h("div", { className: "side-empty" },
              h(window.Icon, { name: "user", size: 22 }),
              h("span", null, "No doctors match."))
          : filtered.map(function (d) {
              return h(PaletteCard, { key: d.id, doc: d, dept: deptById[d.deptId],
                onToggleActive: props.onToggleActive, onEdit: props.onEditDoctor });
            })
      ),
      h("div", { className: "side-foot" },
        h(window.Icon, { name: "info", size: 13 }),
        h("span", null, "Drag a doctor onto any slot, or click a slot to pick."))
    );
  }

  /* ---------------- Cell chip ---------------- */
  function CellChip(props) {
    var d = props.doc, dept = props.dept, k = props.cellKey;
    return h("div", {
      className: "cell-chip",
      style: { background: dept ? dept.color.bg : "var(--surface-3)", color: dept ? dept.color.fg : "var(--text)" },
      draggable: true,
      onDragStart: function (e) {
        setDrag({ docId: d.id, fromKey: k });
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", d.id); } catch (x) {}
        e.currentTarget.classList.add("dragging");
      },
      onDragEnd: function (e) { setDrag(null); e.currentTarget.classList.remove("dragging"); }
    },
      h("span", { className: "cc-dot", style: { background: dept ? dept.color.fg : "var(--text-faint)" } }),
      h("span", { className: "cc-name" }, d.name),
      !d.active && h("span", { className: "cc-leave", title: "This doctor is on leave" }, h(window.Icon, { name: "leave", size: 12 })),
      h("button", { type: "button", className: "cc-x", "aria-label": "Remove",
        onMouseDown: function (e) { e.stopPropagation(); },
        onClick: function (e) { e.stopPropagation(); props.onRemove(); } },
        h(window.Icon, { name: "close", size: 12 }))
    );
  }

  /* ---------------- Cell ---------------- */
  function Cell(props) {
    var over = useState(false), isOver = over[0], setOver = over[1];
    var k = L.key(props.block.id, props.day);
    var ids = props.assigned;

    function onDrop(e) {
      e.preventDefault();
      setOver(false);
      var drag = getDrag();
      if (!drag) return;
      if (drag.fromKey === k) return;
      if (ids.indexOf(drag.docId) >= 0) {
        // already here; if moving from elsewhere just remove source
        if (drag.fromKey) props.onUnassign(drag.fromKey, drag.docId);
        props.onToast("Already in this slot.", "info", 1800);
        return;
      }
      if (drag.fromKey) props.onMove(drag.fromKey, k, drag.docId);
      else props.onAssign(k, drag.docId);
    }

    return h("td", {
      className: "cell" + (isOver ? " over" : "") + (props.weekend ? " weekend" : ""),
      onDragOver: function (e) {
        var drag = getDrag(); if (!drag) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = drag.fromKey ? "move" : "copy";
        if (!isOver) setOver(true);
      },
      onDragLeave: function (e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setOver(false);
      },
      onDrop: onDrop
    },
      h("div", { className: "cell-inner" },
        ids.length === 0
          ? h("div", { className: "cell-empty" }, isOver ? "Drop here" : "—")
          : ids.map(function (id) {
              var d = props.docById[id]; if (!d) return null;
              return h(CellChip, { key: id, doc: d, dept: props.deptById[d.deptId], cellKey: k,
                onRemove: function () { props.onUnassign(k, id); }, onToast: props.onToast });
            }),
        h("button", { type: "button", className: "cell-add",
          ref: function (el) { props.regAnchor(k, el); },
          onClick: function (e) { props.onOpenAssign(props.block.id, props.day, e.currentTarget); },
          title: "Assign doctor" },
          h(window.Icon, { name: "plus", size: 14 }),
          ids.length === 0 && h("span", null, "Assign"))
      )
    );
  }

  /* ---------------- Week grid ---------------- */
  function WeekGrid(props) {
    var anchors = useRef({});
    function regAnchor(k, el) { if (el) anchors.current[k] = el; }

    return h("div", { className: "grid-scroll scroll" },
      h("table", { className: "wk" },
        h("thead", null,
          h("tr", null,
            h("th", { className: "wk-corner" },
              h(window.Icon, { name: "cal", size: 15 }), h("span", null, "Shift")),
            L.DAYS.map(function (day) {
              return h("th", { key: day, className: "wk-day" + (L.WEEKEND[day] ? " weekend" : "") },
                h("span", { className: "wk-day-full" }, L.DAY_FULL[day]),
                h("span", { className: "wk-day-ab" }, day));
            })
          )
        ),
        h("tbody", null,
          props.timeBlocks.map(function (b) {
            return h("tr", { key: b.id },
              h("th", { className: "wk-time", scope: "row" },
                h("button", { type: "button", className: "wk-time-btn", onClick: props.onManageBlocks,
                  title: "Edit time blocks" },
                  h("span", { className: "wk-time-label mono" }, L.fmtTime(b.start)),
                  h("span", { className: "wk-time-sep mono" }, L.fmtTime(b.end)),
                  h("span", { className: "wk-time-edit" }, h(window.Icon, { name: "pencil", size: 12 })))
              ),
              L.DAYS.map(function (day) {
                return h(Cell, {
                  key: day, block: b, day: day, weekend: L.WEEKEND[day],
                  assigned: (props.schedule[L.key(b.id, day)] || []),
                  docById: props.docById, deptById: props.deptById,
                  onAssign: props.onAssign, onUnassign: props.onUnassign, onMove: props.onMove,
                  onOpenAssign: props.onOpenAssign, onToast: props.onToast, regAnchor: regAnchor
                });
              })
            );
          })
        )
      )
    );
  }

  Object.assign(window, { Sidebar: Sidebar, WeekGrid: WeekGrid });
})();
