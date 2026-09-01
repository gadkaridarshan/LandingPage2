// helix: public/scripts/main.js
// @helix:story [USER-675000]
//
// Page behaviour only — no styling. Two responsibilities:
//   1. Render the current year into the footer copyright line.
//   2. Provide inline validation + success handling for the contact form.

(function () {
  'use strict';

  // ---- Footer year ----------------------------------------------------------
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ---- Contact form validation ---------------------------------------------
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('contact-status');
  if (!form) return;

  // Simple, dependency-free email shape check — sufficient for client-side hint.
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getErrorEl(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function setFieldError(input, message) {
    var errEl = getErrorEl(input.name);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (errEl) {
        errEl.textContent = message;
        errEl.hidden = false;
      }
    } else {
      input.removeAttribute('aria-invalid');
      if (errEl) {
        errEl.textContent = '';
        errEl.hidden = true;
      }
    }
  }

  function validateField(input) {
    var value = (input.value || '').trim();
    if (!value) {
      var label = (form.querySelector('label[for="' + input.id + '"]') || {}).textContent || 'This field';
      setFieldError(input, label + ' is required.');
      return false;
    }
    if (input.type === 'email' && !EMAIL_RE.test(value)) {
      setFieldError(input, 'Please enter a valid email address.');
      return false;
    }
    setFieldError(input, '');
    return true;
  }

  // Live validation as the user fixes each field.
  var inputs = form.querySelectorAll('input, textarea');
  Array.prototype.forEach.call(inputs, function (input) {
    input.addEventListener('blur', function () {
      validateField(input);
    });
    input.addEventListener('input', function () {
      // Clear the error as soon as the user starts correcting it.
      var errEl = getErrorEl(input.name);
      if (errEl && !errEl.hidden) {
        setFieldError(input, '');
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var allValid = true;
    Array.prototype.forEach.call(inputs, function (input) {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) {
      if (statusEl) {
        statusEl.textContent = 'Please fix the highlighted fields and try again.';
      }
      // Focus the first invalid field for keyboard users.
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid && typeof firstInvalid.focus === 'function') {
        firstInvalid.focus();
      }
      return;
    }

    // Success — in a real deployment this would POST to a server.
    if (statusEl) {
      statusEl.textContent = "Thanks! Your message has been received.";
    }
    form.reset();
    Array.prototype.forEach.call(inputs, function (input) {
      setFieldError(input, '');
    });
  });
})();