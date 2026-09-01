/* helix: public/scripts/main.js */
/* @helix:story [USER-776000] — Progressive enhancement for the contact form */
/* Vanilla JS, no dependencies. Runs in strict mode. */

(function () {
  "use strict";

  // ---------- Footer year (small, cheap, keeps the page feeling current) ----------
  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ---------- Contact form validation & submit handler ----------
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("contact-form-status");
  var submitBtn = form.querySelector(".contact-form__submit");

  var fields = {
    name: {
      input: document.getElementById("contact-name"),
      error: document.getElementById("contact-name-error"),
      validate: function (value) {
        var trimmed = (value || "").trim();
        if (!trimmed) return "Please enter your name.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        if (trimmed.length > 80) return "Name must be 80 characters or fewer.";
        return "";
      },
    },
    email: {
      input: document.getElementById("contact-email"),
      error: document.getElementById("contact-email-error"),
      // RFC 5322-inspired, intentionally simple and pragmatic.
      validate: function (value) {
        var trimmed = (value || "").trim();
        if (!trimmed) return "Please enter your email address.";
        if (trimmed.length > 120) return "Email must be 120 characters or fewer.";
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!re.test(trimmed)) return "Please enter a valid email address (e.g. you@example.com).";
        return "";
      },
    },
    message: {
      input: document.getElementById("contact-message"),
      error: document.getElementById("contact-message-error"),
      validate: function (value) {
        var trimmed = (value || "").trim();
        if (!trimmed) return "Please enter a message.";
        if (trimmed.length < 10) return "Message must be at least 10 characters.";
        if (trimmed.length > 2000) return "Message must be 2000 characters or fewer.";
        return "";
      },
    },
  };

  function setFieldError(name, message) {
    var field = fields[name];
    if (!field) return;
    if (field.error) field.error.textContent = message || "";
    if (field.input) {
      if (message) {
        field.input.setAttribute("aria-invalid", "true");
      } else {
        field.input.removeAttribute("aria-invalid");
      }
    }
  }

  function validateField(name) {
    var field = fields[name];
    if (!field || !field.input) return true;
    var message = field.validate(field.input.value);
    setFieldError(name, message);
    return !message;
  }

  function validateAll() {
    var ok = true;
    Object.keys(fields).forEach(function (name) {
      if (!validateField(name)) ok = false;
    });
    return ok;
  }

  function clearStatus() {
    if (!statusEl) return;
    statusEl.textContent = "";
    statusEl.classList.remove("is-success", "is-error");
  }

  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.classList.remove("is-success", "is-error");
    if (kind === "success") statusEl.classList.add("is-success");
    if (kind === "error") statusEl.classList.add("is-error");
  }

  // Live validation on blur and on input after first blur (gentle UX).
  Object.keys(fields).forEach(function (name) {
    var field = fields[name];
    if (!field || !field.input) return;
    var touched = false;

    field.input.addEventListener("blur", function () {
      touched = true;
      validateField(name);
    });

    field.input.addEventListener("input", function () {
      if (touched && field.input.getAttribute("aria-invalid") === "true") {
        validateField(name);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearStatus();

    if (!validateAll()) {
      setStatus("Please fix the highlighted fields and try again.", "error");
      // Move focus to the first invalid field for keyboard users.
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid && typeof firstInvalid.focus === "function") {
        firstInvalid.focus();
      }
      return;
    }

    // Simulated submit. Static landing page — no backend wired up.
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
    }

    window.setTimeout(function () {
      setStatus("Thanks! Your message has been sent. We'll reply within one business day.", "success");
      form.reset();
      // Reset aria-invalid flags explicitly (form.reset doesn't touch them).
      Object.keys(fields).forEach(function (name) {
        var input = fields[name] && fields[name].input;
        if (input) input.removeAttribute("aria-invalid");
      });
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalLabel || "Send message";
      }
    }, 700);
  });
})();