(function () {
  var views = {};
  document.querySelectorAll("[data-view]").forEach(function (v) { views[v.dataset.view] = v; });
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem("ieqa:" + k) || "null"); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem("ieqa:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  var done = store.get("done") || {};

  function navKey(view) {
    if (view === "home") return "home";
    if (view === "course" || /^(m|l|q)-/.test(view)) return "course";
    if (view === "certificate") return "fees";
    return view;
  }

  function show() {
    var id = (location.hash || "#home").slice(1);
    if (!views[id]) id = "home";
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== id; });
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.dataset.nav === navKey(id)) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.getElementById("nav").classList.remove("open");
    document.getElementById("menu-btn").setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    paint();
  }

  function paint() {
    document.querySelectorAll("[data-dot]").forEach(function (d) { d.classList.toggle("done", !!done[d.dataset.dot]); });
    document.querySelectorAll("[data-done]").forEach(function (m) {
      if (done[m.dataset.done]) m.innerHTML = '<span class="tag done">Done</span>';
    });
    document.querySelectorAll("[data-complete]").forEach(function (b) {
      var k = b.dataset.complete;
      b.textContent = done[k] ? "Mark as not done" : "Mark complete";
      b.className = done[k] ? "btn small" : "btn solid";
      var s = document.querySelector('[data-status="' + k + '"]');
      if (s) s.innerHTML = done[k] ? '<span class="tag done">Marked complete</span>' : "Progress is kept in this browser only in the preview.";
    });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-complete]");
    if (!b) return;
    var k = b.dataset.complete;
    if (done[k]) delete done[k]; else done[k] = true;
    store.set("done", done);
    paint();
  });

  var menu = document.getElementById("menu-btn");
  menu.addEventListener("click", function () {
    var nav = document.getElementById("nav");
    var open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // ---- Module 1 quiz, with options shuffled per visit
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function renderQuiz(form) {
    var slug = form.dataset.quiz, qs = QUIZ[slug];
    var html = '<div class="quiz-result"></div><ol class="qlist">';
    qs.forEach(function (q) {
      var order = shuffle(q.options.map(function (t, i) { return { t: t, i: i }; }));
      html += '<li class="qitem"><fieldset id="fs-' + q.id + '"><legend>' + esc(q.prompt) + "</legend>";
      order.forEach(function (o) {
        html += '<label class="opt" data-v="' + o.i + '"><input type="radio" name="' + q.id + '" value="' + o.i + '" required><span>' + esc(o.t) + "</span></label>";
      });
      html += '<p class="explain" hidden></p></fieldset></li>';
    });
    html += '</ol><div class="actions"><button class="btn solid" type="submit">Submit answers</button><span class="muted small quiz-count">0 of ' + qs.length + " answered</span></div>";
    form.innerHTML = html;
  }

  document.querySelectorAll("form[data-quiz]").forEach(function (form) {
    renderQuiz(form);
    form.addEventListener("change", function () {
      var n = form.querySelectorAll("input:checked").length;
      var c = form.querySelector(".quiz-count");
      if (c) c.textContent = n + " of " + QUIZ[form.dataset.quiz].length + " answered";
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var slug = form.dataset.quiz, qs = QUIZ[slug], score = 0;
      qs.forEach(function (q) {
        var picked = form.querySelector('input[name="' + q.id + '"]:checked');
        var v = picked ? Number(picked.value) : -1, ok = v === q.answer;
        if (ok) score++;
        var fs = document.getElementById("fs-" + q.id);
        fs.disabled = true;
        fs.querySelectorAll(".opt").forEach(function (o) {
          var ov = Number(o.dataset.v);
          if (ov === q.answer) o.classList.add("right"); else if (ov === v) o.classList.add("wrong");
        });
        var ex = fs.querySelector(".explain");
        ex.textContent = (ok ? "Correct. " : "Not quite. ") + q.explain;
        ex.hidden = false;
      });
      var need = Math.ceil(qs.length * 0.75), passed = score >= need;
      if (passed) { done["quiz:" + slug] = true; store.set("done", done); paint(); }
      form.querySelector(".actions").hidden = true;
      form.querySelector(".quiz-result").innerHTML =
        '<div class="result ' + (passed ? "pass" : "fail") + '" role="status"><h2>' + (passed ? "Module cleared" : "Not cleared yet") + "</h2><p>You scored " + score + " of " + qs.length + ". " +
        (passed ? "In the full course this clears the module and opens the next item on the board." : "You need " + need + " correct. Read the explanations below and try again.") +
        '</p><div class="actions">' + (passed ? '<a class="btn solid" href="#m-courts-and-jurisdiction">See item 2</a><a class="btn" href="#fees">Enrol in the full course</a>' : '<button type="button" class="btn solid quiz-retry">Try the quiz again</button>') + "</div></div>";
      var r = form.querySelector(".quiz-retry");
      if (r) r.addEventListener("click", function () { renderQuiz(form); });
      form.scrollIntoView({ block: "start" });
    });
  });

  // ---- sample certificate name
  var nameIn = document.getElementById("cert-name"), nameOut = document.getElementById("cert-name-out");
  if (nameIn) nameIn.addEventListener("input", function () { nameOut.textContent = nameIn.value.trim() || "Your name here"; });

  // ---- verification (explains that live checks run on the Academy's site)
  var vf = document.getElementById("verify-form");
  if (vf) vf.addEventListener("submit", function (e) {
    e.preventDefault();
    var code = document.getElementById("verify-code").value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    var out = document.getElementById("verify-out");
    var ok = /^IEQA-\d{4}-[2-9A-HJKMNP-TV-Z]{4}-[2-9A-HJKMNP-TV-Z]{4}$/.test(code);
    out.className = "result " + (ok ? "pass" : "fail");
    out.innerHTML = ok
      ? "<h2>Number format is valid</h2><p>" + esc(code) + " is written correctly. In the live Academy this page shows the name it was issued to and the date. Certificates are issued once the Academy opens.</p>"
      : "<h2>That is not a certificate number</h2><p>Numbers look like IEQA-2026-7KQ4-M2XD. Check for typing errors; the letters I, L, O and U and the digits 0 and 1 are never used.</p>";
    out.hidden = false;
  });

  window.addEventListener("hashchange", show);
  show();
})();
