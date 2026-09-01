/* helix: public/scripts/main.js */
/* Renders the dynamic footer year and powers inline contact-form validation. */

(function main() {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById("contact-name"),
      errorEl: document.getElementById("contact-name-error"),
      validate(value) {
        const v = value.trim();
        if (v.length === 0) return "Please enter your name.";
        if (v.length < 2) return "Name must be at least 2 characters.";
        if (v.length > 80) return "Name must be 80 characters or fewer.";
        return "";
      },
    },
    email: {
      el: document.getElementById("contact-email"),
      errorEl: document.getElementById("contact-email-error"),
      // Pragmatic email pattern — not perfect, but matches realistic inputs.
      validate(value) {
        const v = value.trim();
        if (v.length === 0) return "Please enter your email.";
        if (v.length > 120) return "Email must be 120 characters or fewer.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
          return "Please enter a valid email address.";
        }
        return "";
      },
    },
    message: {
      el: document.getElementById("contact-message"),
      errorEl: document.getElementById("contact-message-error"),
      validate(value) {
        const v = value.trim();
        if (v.length === 0) return "Please enter a message.";
        if (v.length < 10) return "Message must be at least 10 characters.";
        if (v.length > 2000) return "Message must be 2000 characters or fewer.";
        return "";
      },
    },
  };

  const statusEl = document.getElementById("contact-form-status");
  const submitBtn = form.querySelector(".contact-form__submit");

  function setError(field, message) {
    if (!field || !field.el) return;
    const wrapper = field.el.closest(".field");
    if (wrapper) {
      wrapper.classList.toggle("field--invalid", Boolean(message));
    }
    if (field.errorEl) {
      field.errorEl.textContent = message;
    }
    if (message) {
      field.el.setAttribute("aria-invalid", "true");
    } else {
      field.el.removeAttribute("aria-invalid");
    }
  }

  function clearStatus() {
    if (!statusEl) return;
    statusEl.textContent = "";
    statusEl.classList.remove("contact-form__status--success", "contact-form__status--error");
  }

  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove(
      "contact-form__status--success",
      "contact-form__status--error"
    );
    if (kind === "success") statusEl.classList.add("contact-form__status--success");
    if (kind === "error") statusEl.classList.add("contact-form__status--error");
  }

  function validateField(field) {
    const message = field.validate(field.el.value);
    setError(field, message);
    return message === "";
  }

  // Validate on blur and clear errors as the user types.
  Object.values(fields).forEach(function attachFieldEvents(field) {
    if (!field.el) return;

    field.el.addEventListener("blur", function () {
      validateField(field);
    });

    field.el.addEventListener("input", function () {
      const wrapper = field.el.closest(".field");
      if (wrapper && wrapper.classList.contains("field--invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", function onSubmit(event) {
    event.preventDefault();
    clearStatus();

    let firstInvalid = null;
    Object.values(fields).forEach(function checkField(field) {
      const ok = validateField(field);
      if (!ok && !firstInvalid) firstInvalid = field.el;
    });

    if (firstInvalid) {
      setStatus("Please fix the highlighted fields and try again.", "error");
      firstInvalid.focus();
      return;
    }

    // Simulate submission — there is no backend in this static landing page.
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }

    window.setTimeout(function simulateSuccess() {
      setStatus("Thanks! Your message has been sent. We'll be in touch soon.", "success");
      form.reset();
      Object.values(fields).forEach(function resetField(field) {
        setError(field, "");
      });
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
    }, 600);
  });
})();