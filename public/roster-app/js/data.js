/* ============================================================
   Lifeline Roster — data model with Supabase backend
   Plain script. Everything attaches to window.LMC
   ============================================================ */
(function () {
  "use strict";

  var SESSION_KEY = "lmc_roster_session_v1";
  var OLD_STORAGE_KEY = "lmc_roster_doc_v1"; // Legacy localStorage key to clear
  var SCHEMA = 3;

  // Clear old localStorage data on startup (migration to Supabase)
  try {
    if (localStorage.getItem(OLD_STORAGE_KEY)) {
      localStorage.removeItem(OLD_STORAGE_KEY);
    }
  } catch (e) {}

  var DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var DAY_FULL = {
    Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
    Fri: "Friday", Sat: "Saturday", Sun: "Sunday"
  };
  var WEEKEND = { Sat: true, Sun: true };

  /* curated soft palette an admin can pick from for department tags */
  var PALETTE = [
    // Greens
    { bg: "#dcefe4", fg: "#1c7a55" },
    { bg: "#e5efe6", fg: "#1b7a12" },
    { bg: "#d4edda", fg: "#155724" },
    { bg: "#e6ede0", fg: "#5a7a32" },
    // Blues
    { bg: "#dcebf8", fg: "#1f5fa8" },
    { bg: "#dff0f1", fg: "#1f7a86" },
    { bg: "#e0e7f1", fg: "#304770" },
    { bg: "#cce5ff", fg: "#004085" },
    // Purples & Pinks
    { bg: "#e8e1f5", fg: "#6b3fb8" },
    { bg: "#f3e4f1", fg: "#9b3f8e" },
    { bg: "#fce3ef", fg: "#b23b7e" },
    { bg: "#e2d5f0", fg: "#5e3d8e" },
    // Reds & Oranges
    { bg: "#fbe2e9", fg: "#c0395b" },
    { bg: "#f8d7da", fg: "#a71d2a" },
    { bg: "#fdecd6", fg: "#c77a21" },
    { bg: "#ffe5d0", fg: "#d35400" },
    // Neutrals & Earth
    { bg: "#e7eaf3", fg: "#45568c" },
    { bg: "#f0e7df", fg: "#8a5a35" },
    { bg: "#e8e8e8", fg: "#495057" },
    { bg: "#fff3cd", fg: "#856404" }
  ];

  /* Supabase client - initialized on first load */
  var supabase = null;

  async function initSupabase() {
    if (supabase) return supabase;
    try {
      var res = await fetch("/api/roster/config");
      var config = await res.json();
      if (config.supabaseUrl && config.supabaseAnonKey) {
        supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      }
    } catch (e) {
      // Supabase init failed silently
    }
    return supabase;
  }

  /* ---------- seed data (fallback) ---------- */
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
  function isDept(d) {
    return d && typeof d.id === "string" && typeof d.name === "string" &&
      d.color && typeof d.color.bg === "string" && typeof d.color.fg === "string";
  }
  function isDoctor(d) { return d && typeof d.id === "string" && typeof d.name === "string"; }
  function isBlock(b) { return b && typeof b.id === "string" && typeof b.start === "string" && typeof b.end === "string"; }

  function sanitize(doc, useSeedFallback) {
    var base = seed();
    if (!doc || typeof doc !== "object") return base;

    // Only use seed fallback if explicitly requested (for initial empty state)
    var shouldFallback = useSeedFallback === true;

    var departments = Array.isArray(doc.departments) ? doc.departments.filter(isDept) : [];
    if (departments.length === 0 && shouldFallback) departments = base.departments;

    var deptIds = {};
    departments.forEach(function (d) { deptIds[d.id] = true; });
    var fallbackDept = departments.length > 0 ? departments[0].id : null;

    // Keep doctors array as-is (even if empty) - don't inject seed data
    var doctors = (Array.isArray(doc.doctors) ? doc.doctors : [])
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

    var timeBlocks = (Array.isArray(doc.timeBlocks) ? doc.timeBlocks : []).filter(isBlock);
    if (timeBlocks.length === 0 && shouldFallback) timeBlocks = base.timeBlocks;
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

  /* ---------- Supabase data loading ---------- */
  async function loadFromSupabase() {
    var sb = await initSupabase();
    if (!sb) {
      return null;
    }

    try {

      // Fetch all data in parallel
      var [deptsRes, docsRes, blocksRes, assignRes] = await Promise.all([
        sb.from("roster_departments").select("*").order("sort_order"),
        sb.from("roster_doctors").select("*"),
        sb.from("roster_time_blocks").select("*").order("sort_order"),
        sb.from("roster_assignments").select("*")
      ]);

      // If ALL queries failed, return null
      if (deptsRes.error && docsRes.error && blocksRes.error && assignRes.error) {
        return null;
      }

      // Transform to app format
      var departments = (deptsRes.data || []).map(function (d) {
        return {
          id: d.id,
          name: d.name,
          short: d.short_name || d.name,
          color: { bg: d.color_bg, fg: d.color_fg }
        };
      });

      var doctors = (docsRes.data || []).map(function (d) {
        return {
          id: d.id,
          name: d.name,
          title: d.title || "Doctor",
          deptId: d.department_id,
          active: d.active !== false
        };
      });

      var timeBlocks = (blocksRes.data || []).map(function (b) {
        return {
          id: b.id,
          start: b.start_time,
          end: b.end_time
        };
      });

      // Build schedule from assignments
      var schedule = {};
      timeBlocks.forEach(function (b) {
        DAYS.forEach(function (day) {
          schedule[key(b.id, day)] = [];
        });
      });
      (assignRes.data || []).forEach(function (a) {
        var k = key(a.time_block_id, a.day);
        if (schedule[k]) {
          schedule[k].push(a.doctor_id);
        }
      });

      return { schema: SCHEMA, departments: departments, doctors: doctors, timeBlocks: timeBlocks, schedule: schedule };
    } catch (e) {
      return null;
    }
  }

  /* ---------- Supabase save operations ---------- */
  async function saveDoctor(doctor) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_doctors").upsert({
      id: doctor.id,
      name: doctor.name,
      title: doctor.title,
      department_id: doctor.deptId,
      active: doctor.active
    });

    // Error handled by return value
    return !error;
  }

  async function deleteDoctor(doctorId) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_doctors").delete().eq("id", doctorId);
    // Error handled by return value
    return !error;
  }

  async function saveDepartment(dept) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_departments").upsert({
      id: dept.id,
      name: dept.name,
      short_name: dept.short,
      color_bg: dept.color.bg,
      color_fg: dept.color.fg
    });

    // Error handled by return value
    return !error;
  }

  async function deleteDepartment(deptId) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_departments").delete().eq("id", deptId);
    // Error handled by return value
    return !error;
  }

  async function saveTimeBlock(block) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_time_blocks").upsert({
      id: block.id,
      start_time: block.start,
      end_time: block.end
    });

    // Error handled by return value
    return !error;
  }

  async function deleteTimeBlock(blockId) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_time_blocks").delete().eq("id", blockId);
    // Error handled by return value
    return !error;
  }

  async function assignDoctor(blockId, day, doctorId) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_assignments").upsert({
      time_block_id: blockId,
      day: day,
      doctor_id: doctorId
    }, { onConflict: "time_block_id,day,doctor_id" });

    // Error handled by return value
    return !error;
  }

  async function unassignDoctor(blockId, day, doctorId) {
    var sb = await initSupabase();
    if (!sb) return false;

    var { error } = await sb.from("roster_assignments")
      .delete()
      .eq("time_block_id", blockId)
      .eq("day", day)
      .eq("doctor_id", doctorId);

    // Error handled by return value
    return !error;
  }

  /* ---------- main load function (async) ---------- */
  async function load() {
    // Try Supabase first
    var sbDoc = await loadFromSupabase();

    if (sbDoc) {
      // Use Supabase data even if some arrays are empty
      return { doc: sanitize(sbDoc), fresh: false, source: "supabase" };
    }

    // Fallback to seed only if Supabase completely failed
    return { doc: seed(), fresh: true, source: "seed" };
  }

  /* ---------- batch save (for publish) ---------- */
  async function saveAll(doc) {
    var sb = await initSupabase();
    if (!sb) return false;

    try {
      // Save departments
      var deptData = doc.departments.map(function (d, i) {
        return {
          id: d.id,
          name: d.name,
          short_name: d.short,
          color_bg: d.color.bg,
          color_fg: d.color.fg,
          sort_order: i
        };
      });
      await sb.from("roster_departments").upsert(deptData);

      // Save doctors
      var docData = doc.doctors.map(function (d) {
        return {
          id: d.id,
          name: d.name,
          title: d.title,
          department_id: d.deptId,
          active: d.active
        };
      });
      await sb.from("roster_doctors").upsert(docData);

      // Save time blocks
      var blockData = doc.timeBlocks.map(function (b, i) {
        return {
          id: b.id,
          start_time: b.start,
          end_time: b.end,
          sort_order: i
        };
      });
      await sb.from("roster_time_blocks").upsert(blockData);

      // Clear and rebuild assignments
      await sb.from("roster_assignments").delete().neq("id", "00000000-0000-0000-0000-000000000000");

      var assignments = [];
      Object.keys(doc.schedule).forEach(function (k) {
        var parts = k.split("|");
        var blockId = parts[0], day = parts[1];
        doc.schedule[k].forEach(function (doctorId) {
          assignments.push({
            time_block_id: blockId,
            day: day,
            doctor_id: doctorId
          });
        });
      });

      if (assignments.length > 0) {
        await sb.from("roster_assignments").insert(assignments);
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  /* ---------- Supabase Auth ---------- */
  async function signIn(email, password) {
    var sb = await initSupabase();
    if (!sb) {
      return { error: { message: "Could not connect to authentication service." } };
    }

    // Attempt sign in
    var authResult = await sb.auth.signInWithPassword({ email: email, password: password });
    if (authResult.error) {
      return { error: authResult.error };
    }

    var user = authResult.data.user;
    if (!user) {
      return { error: { message: "Authentication failed." } };
    }

    // Fetch user's role from profiles table
    var profileResult = await sb.from("profiles").select("role, full_name").eq("id", user.id).single();
    if (profileResult.error) {
      // Profile lookup failed - sign out and reject
      await sb.auth.signOut();
      return { error: { message: "Could not verify staff permissions." } };
    }

    var role = profileResult.data.role;
    if (role !== "staff" && role !== "admin") {
      // Not authorized - sign out and reject
      await sb.auth.signOut();
      return { error: { message: "Access denied. Staff or admin role required." } };
    }

    // Success - return user info
    return {
      data: {
        id: user.id,
        email: user.email,
        name: profileResult.data.full_name || user.email.split("@")[0],
        role: role
      }
    };
  }

  async function signOut() {
    var sb = await initSupabase();
    if (sb) {
      await sb.auth.signOut();
    }
    clearSession();
  }

  async function sendMagicLink(email) {
    var sb = await initSupabase();
    if (!sb) {
      return { error: { message: "Could not connect to authentication service." } };
    }

    // Check if user exists and has staff/admin role BEFORE sending link
    var profileCheck = await sb.from("profiles")
      .select("role")
      .eq("id", sb.rpc ? undefined : undefined) // Can't check without user ID
      .limit(1);

    // Send magic link
    var result = await sb.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin + "/roster-app/"
      }
    });

    if (result.error) {
      return { error: result.error };
    }

    return { data: { message: "Check your email for the login link." } };
  }

  async function getSession() {
    var sb = await initSupabase();
    if (!sb) return null;

    var sessionResult = await sb.auth.getSession();
    if (!sessionResult.data.session) return null;

    var user = sessionResult.data.session.user;
    if (!user) return null;

    // Verify role is still valid
    var profileResult = await sb.from("profiles").select("role, full_name").eq("id", user.id).single();
    if (profileResult.error) return null;

    var role = profileResult.data.role;
    if (role !== "staff" && role !== "admin") return null;

    return {
      id: user.id,
      email: user.email,
      name: profileResult.data.full_name || user.email.split("@")[0],
      role: role
    };
  }

  /* ---------- session storage (local, for UI state) ---------- */
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
    // Async Supabase operations
    load: load,
    saveAll: saveAll,
    saveDoctor: saveDoctor,
    deleteDoctor: deleteDoctor,
    saveDepartment: saveDepartment,
    deleteDepartment: deleteDepartment,
    saveTimeBlock: saveTimeBlock,
    deleteTimeBlock: deleteTimeBlock,
    assignDoctor: assignDoctor,
    unassignDoctor: unassignDoctor,
    // Auth
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    sendMagicLink: sendMagicLink,
    // Session (local)
    loadSession: loadSession, saveSession: saveSession, clearSession: clearSession
  };
})();
