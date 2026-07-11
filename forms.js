(() => {
  const forms = document.querySelectorAll("[data-managed-form]");

  forms.forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const endpoint = form.getAttribute("action") || "";
      const successUrl = form.dataset.success || "submitted.html";
      const redirectUrl = new URL(successUrl, window.location.href).href;

      if (!endpoint) {
        setStatus(status, "This request channel is not available right now. Please try again later.", "error");
        return;
      }

      ensureHiddenField(form, "_next", redirectUrl);
      setStatus(status, "Processing your request...", "pending");
      setLoading(submitButton, true);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (!response.ok) {
          throw new Error(getFriendlyError(response.status));
        }

        window.location.href = successUrl;
      } catch (error) {
        setStatus(status, error?.message || "We could not send your request. Please check the details and try again.", "error");
        setLoading(submitButton, false);
      }
    });
  });

  function getFriendlyError(status) {
    if (status === 400 || status === 422) {
      return "Please check the required details and try again.";
    }

    if (status === 403) {
      return "We could not verify this request. Please refresh the page and try again.";
    }

    if (status === 429) {
      return "We are receiving many requests right now. Please wait a moment and try again.";
    }

    if (status >= 500) {
      return "The request channel is temporarily unavailable. Please try again shortly.";
    }

    return "We could not send your request. Please check the details and try again.";
  }

  function ensureHiddenField(form, name, value) {
    let field = form.querySelector(`input[name="${name}"]`);

    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.appendChild(field);
    }

    field.value = value;
  }

  function setStatus(element, message, state) {
    if (!element) return;
    element.textContent = message;
    element.dataset.state = state;
  }

  function setLoading(button, isLoading) {
    if (!button) return;
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent.trim();
    }
    button.disabled = isLoading;
    button.textContent = isLoading ? "Processing..." : button.dataset.originalText;
  }
})();
