(() => {
  const forms = document.querySelectorAll("[data-formspree-form]");

  forms.forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const endpoint = form.getAttribute("action") || "";
      const successUrl = form.dataset.success || "submitted.html";
      const redirectUrl = new URL(successUrl, window.location.href).href;

      if (!endpoint || endpoint === "https://formspree.io/f/") {
        setStatus(status, "Formspree is not connected yet. Add your real Formspree form endpoint first.", "error");
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
          throw new Error(await getErrorMessage(response));
        }

        window.location.href = successUrl;
      } catch (error) {
        const message = error?.message || "";
        if (message && message !== "Failed to fetch" && message !== "NetworkError when attempting to fetch resource.") {
          setStatus(status, message, "error");
          setLoading(submitButton, false);
          return;
        }

        setStatus(status, "Opening secure form submission...", "pending");
        HTMLFormElement.prototype.submit.call(form);
      }
    });
  });

  async function getErrorMessage(response) {
    try {
      const data = await response.json();
      const errors = data?.errors;

      if (Array.isArray(errors) && errors.length) {
        return errors.map((error) => error.message || error.field || "Formspree rejected the submission.").join(" ");
      }

      if (data?.error) return data.error;
      if (data?.message) return data.message;
    } catch (error) {
      return "Formspree rejected the submission. Please check the form details and try again.";
    }

    return "Formspree rejected the submission. Please check the form details and try again.";
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
