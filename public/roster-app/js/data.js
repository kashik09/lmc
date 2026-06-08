/* ============================================================
   Lifeline Roster — data model, seed, helpers, safe storage
   Plain script. Everything attaches to window.LMC
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "lmc_roster_doc_v1";
  var SESSION_KEY = "lmc_roster_session_v1";
  var SCHEMA = 1;

  var DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var DAY_FULL = {
    Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
    Fri: "Friday", Sat: "Saturday", Sun: "Sunday"
  };
  var WEEKEND = { Sat: true, Sun: true };

  /* curated soft palette an admin can pick from for department tags */
  var PALETTE = [
    // Greens
    { bg: "#dcefe4", fg: "#1c7a55" }, // teal-green
    { bg: "#e5efe6", fg: "#1b7a12" }, // LMC brand green
    { bg: "#d4edda", fg: "#155724" }, // forest green
    { bg: "#e6ede0", fg: "#5a7a32" }, // olive
    // Blues
    { bg: "#dcebf8", fg: "#1f5fa8" }, // blue
    { bg: "#dff0f1", fg: "#1f7a86" }, // cyan/teal
    { bg: "#e0e7f1", fg: "#304770" }, // navy (LMC)
    { bg: "#cce5ff", fg: "#004085" }, // royal blue
    // Purples & Pinks
    { bg: "#e8e1f5", fg: "#6b3fb8" }, // purple
    { bg: "#f3e4f1", fg: "#9b3f8e" }, // magenta
    { bg: "#fce3ef", fg: "#b23b7e" }, // pink
    { bg: "#e2d5f0", fg: "#5e3d8e" }, // violet
    // Reds & Oranges
    { bg: "#fbe2e9", fg: "#c0395b" }, // rose
    { bg: "#f8d7da", fg: "#a71d2a" }, // red
    { bg: "#fdecd6", fg: "#c77a21" }, // amber
    { bg: "#ffe5d0", fg: "#d35400" }, // orange
    // Neutrals & Earth
    { bg: "#e7eaf3", fg: "#45568c" }, // indigo-slate
    { bg: "#f0e7df", fg: "#8a5a35" }, // clay/brown
    { bg: "#e8e8e8", fg: "#495057" }, // slate gray
    { bg: "#fff3cd", fg: "#856404" }  // gold/yellow
  ];

  function seed() {
    var departments = [
      { id: "g_consult", name: "General Consultation", short: "General", color: { bg: "#e5efe6", fg: "#2e7d45" } },
      { id: "dental",    name: "Dental",               short: "Dental",  color: { bg: "#dcefe4", fg: "#1c7a55" } },
      { id: "xray",      name: "X-Ray",                short: "X-Ray",   color: { bg: "#dcebf8", fg: "#1f5fa8" } },
      { id: "lab",       name: "Laboratory",           short: "Laboratory", color: { bg: "#e8e1f5", fg: "#6b3fb8" } },
      { id: "cardio",    name: "Cardiology",           short: "Cardiology", color: { bg: "#fbe2e9", fg: "#c0395b" } },
      { id: "micro",     name: "Microbiology Lab",     short: "Microbiology Lab", color: { bg: "#e6ede0", fg: "#5a7a32" } },
      { id: "neuro",     name: "Neurology",            short: "Neurology", color: { bg: "#f3e4f1", fg: "#9b3f8e" } },
      { id: "peds",      name: "Pediatrics",           short: "Pediatrics", color: { bg: "#fdecd6", fg: "#c77a21" } },
      { id: "imaging",   name: "Diagnostic Imaging",   short: "Diagnostic Imaging", color: { bg: "#dff0f1", fg: "#1f7a86" } },
      { id: "gyn",       name: "Gynaecology & Birth",  short: "Gynaecology & Birth", color: { bg: "#fce3ef", fg: "#b23b7e" } },
      { id: "ortho",     name: "Orthopedic",           short: "Orthopedic", color: { bg: "#e7eaf3", fg: "#45568c" } }
    ];

    var doctors = [
      { id: "d_a",     name: "Dr. A",                title: "Doctor", deptId: "dental",    active: true },
      { id: "d_b",     name: "Dr. B",                title: "Doctor", deptId: "xray",      active: true },
      { id: "d_c",     name: "Dr. C",                title: "Doctor", deptId: "lab",       active: true },
      { id: "d_d",     name: "Dr. D",                title: "Doctor", deptId: "g_consult", active: true },
      { id: "d_e",     name: "Dr. E",                title: "Doctor", deptId: "g_consult", active: true },
      { id: "d_card",  name: "Cardiology Lead",      title: "Lead",   deptId: "cardio",    active: true },
      { id: "d_micro", name: "Microbiology Lab Lead", title: "Lead",  deptId: "micro",     active: true },
      { id: "d_neuro", name: "Neurology Lead",       title: "Lead",   deptId: "neuro",     active: true },
      { id: "d_ped",   name: "Pediatrics Lead",      title: "Lead",   deptId: "peds",      active: true },
      { id: "d_diag",  name: "Diagnostic Imaging Lead", title: "Lead", deptId: "imaging",  active: true },
      { id: "d_ortho", name: "Orthopedic Lead",      title: "Lead",   deptId: "ortho",     active: true },
      { id: "d_gyn",   name: "Gynaecology Lead",     title: "Lead",   deptId: "gyn",       active: true }
    ];

    var timeBlocks = [
      { id: "b1", start: "08:00", end: "11:00" },
      { id: "b2", start: "11:00", end: "14:00" },
      { id: "b3", start: "14:00", end: "17:00" }
    ];

    var schedule = {
      "b1|Mon": ["d_a", "d_b", "d_c", "d_card", "d_micro"],
      "b1|Tue": ["d_a", "d_b", "d_c", "d_neuro", "d_ped"],
      "b1|Wed": ["d_a", "d_c", "d_e", "d_diag", "d_gyn"],
      "b1|Thu": ["d_b", "d_c", "d_e", "d_ortho", "d_micro"],
      "b1|Fri": ["d_a", "d_b", "d_c", "d_card", "d_ped"],
      "b1|Sat": ["d_b", "d_d", "d_c", "d_diag", "d_card", "d_ped"],
      "b1|Sun": ["d_e"],

      "b2|Mon": ["d_a", "d_c", "d_e", "d_ortho"],
      "b2|Tue": ["d_b", "d_d", "d_ped"],
      "b2|Wed": ["d_a", "d_b", "d_c", "d_card", "d_gyn"],
      "b2|Thu": ["d_a", "d_b", "d_c", "d_d", "d_neuro"],
      "b2|Fri": ["d_a", "d_d", "d_e", "d_gyn"],
      "b2|Sat": ["d_d", "d_e"],
      "b2|Sun": [],

      "b3|Mon": ["d_c", "d_d"],
      "b3|Tue": ["d_c", "d_d", "d_micro"],
      "b3|Wed": ["d_d"],
      "b3|Thu": ["d_c"],
      "b3|Fri": ["d_c", "d_d"],
      "b3|Sat": [],
      "b3|Sun": []
    };

    return { schema: SCHEMA, departments: departments, doctors: doctors, timeBlocks: timeBlocks, schedule: schedule };
  }

  /* ---------- helpers ---------- */
  function uid(prefix) {
    return (prefix || "id") + "_" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
  }

  function key(blockId, day) { return blockId + "|" + day; }

  function initials(name) {
    if (!name) return "?";
    var clean = String(name).replace(/^Dr\.?\s*/i, "").trim();
    var parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function fmtTime(t) {
    // "08:00" -> "8:00"
    if (!t) return "";
    var m = /^(\d{1,2}):(\d{2})$/.exec(t);
    if (!m) return t;
    return String(parseInt(m[1], 10)) + ":" + m[2];
  }

  function blockLabel(b) {
    if (!b) return "";
    return fmtTime(b.start) + " — " + fmtTime(b.end);
  }

  function toMinutes(t) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(t || "");
    if (!m) return NaN;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }

  /* ---------- validation / integrity ---------- */
  // Make any loaded doc internally consistent so the UI can never crash on bad refs.
  function sanitize(doc) {
    var base = seed();
    if (!doc || typeof doc !== "object") return base;

    var departments = Array.isArray(doc.departments) ? doc.departments.filter(isDept) : base.departments;
    if (departments.length === 0) departments = base.departments;

    var deptIds = {};
    departments.forEach(function (d) { deptIds[d.id] = true; });
    var fallbackDept = departments[0].id;

    var doctors = (Array.isArray(doc.doctors) ? doc.doctors : base.doctors)
      .filter(isDoctor)
      .map(function (d) {
        return {
          id: d.id, name: String(d.name),
          title: typeof d.title === "string" ? d.title : "Doctor",
          deptId: deptIds[d.deptId] ? d.deptId : fallbackDept,
          active: d.active !== false
        };
      });
    var docIds = {};
    doctors.forEach(function (d) { docIds[d.id] = true; });

    var timeBlocks = (Array.isArray(doc.timeBlocks) ? doc.timeBlocks : base.timeBlocks).filter(isBlock);
    if (timeBlocks.length === 0) timeBlocks = base.timeBlocks;
    var blockIds = {};
    timeBlocks.forEach(function (b) { blockIds[b.id] = true; });

    var schedule = {};
    var src = (doc.schedule && typeof doc.schedule === "object") ? doc.schedule : {};
    timeBlocks.forEach(function (b) {
      DAYS.forEach(function (day) {
        var k = key(b.id, day);
        var arr = Array.isArray(src[k]) ? src[k] : [];
        var seen = {}, out = [];
        arr.forEach(function (id) {
          if (docIds[id] && !seen[id]) { seen[id] = true; out.push(id); }
        });
        schedule[k] = out;
      });
    });

    return { schema: SCHEMA, departments: departments, doctors: doctors, timeBlocks: timeBlocks, schedule: schedule };
  }

  function isDept(d) {
    return d && typeof d.id === "string" && typeof d.name === "string" &&
      d.color && typeof d.color.bg === "string" && typeof d.color.fg === "string";
  }
  function isDoctor(d) { return d && typeof d.id === "string" && typeof d.name === "string"; }
  function isBlock(b) { return b && typeof b.id === "string" && typeof b.start === "string" && typeof b.end === "string"; }

  /* ---------- safe storage ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { doc: seed(), fresh: true };
      var parsed = JSON.parse(raw);
      return { doc: sanitize(parsed), fresh: false };
    } catch (e) {
      console.warn("[LMC] roster store unreadable, recovering with seed:", e);
      return { doc: seed(), fresh: true, recovered: true };
    }
  }

  function save(doc) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
      return true;
    } catch (e) {
      console.warn("[LMC] could not persist roster:", e);
      return false;
    }
  }

  function clearStore() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function loadSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
    catch (e) { return null; }
  }
  function saveSession(s) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  window.LMC = {
    DAYS: DAYS, DAY_FULL: DAY_FULL, WEEKEND: WEEKEND, PALETTE: PALETTE,
    seed: seed, sanitize: sanitize,
    uid: uid, key: key, initials: initials, fmtTime: fmtTime, blockLabel: blockLabel, toMinutes: toMinutes,
    load: load, save: save, clearStore: clearStore,
    loadSession: loadSession, saveSession: saveSession, clearSession: clearSession
  };
})();
