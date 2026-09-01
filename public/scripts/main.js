// helix: public/scripts/main.js
// Footer year rendering and inline contact-form validation.

(function () {
  "use strict";

  function setFooterYear() {
    var year = String(new Date().getFullYear());
    var nodes = document.querySelectorAll("[data-footer-year]");
    Array.prototype.forEach.call(nodes, function (el) {
      el.textContent = year;
    });
  }

  function showFieldError(input, message) {
    var name = input.getAttribute("name");
    var slot = document.querySelector('[data-error-for="' + name + '"]');
    if (slot) slot.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateField(input) {
    var value = (input.value || "").trim();
    var type = input.getAttribute("type") || "text";

    if (input.required && value.length === 0) {
      showFieldError(input, "This field is required.");
      return false;
    }
    if (type === "email" && value.length > 0) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showFieldError(input, "Please enter a valid email address.");
        return false;
      }
    }
    if (input.minLength && value.length > 0 && value.length < input.minLength) {
      showFieldError(input, "Please use at least " + input.minLength + " characters.");
      return false;
    }
    showFieldError(input, "");
    return true;
  }

  function initContactForm() {
    var form = document.querySelector(".contact-form");
    if (!form) return;

    var inputs = form.querySelectorAll("input, textarea");
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(input);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var allValid = true;
      Array.prototype.forEach.call(inputs, function (input) {
        if (!validateField(input)) allValid = false;
      });

      var status = form.querySelector(".contact-form__status");
      if (allValid) {
        if (status) status.textContent = "Thanks! Your message has been received.";
        form.reset();
        Array.prototype.forEach.call(inputs, function (input) {
          input.setAttribute("aria-invalid", "false");
        });
      } else if (status) {
        status.textContent = "Please fix the highlighted fields and try again.";
      }
    });
  }

  function init() {
    setFooterYear();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();