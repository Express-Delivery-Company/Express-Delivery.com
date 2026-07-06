const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.body.classList.add("is-loaded");

document.querySelectorAll("[data-visual-upload]").forEach((upload) => {
  const input = upload.querySelector("[data-visual-upload-input]");
  const text = upload.querySelector("[data-visual-upload-text]");

  input?.addEventListener("change", () => {
    const file = input.files?.[0];
    upload.classList.toggle("has-file", Boolean(file));
    if (text) {
      text.textContent = file ? `Selected: ${file.name}` : "Select a clear package photo for reference.";
    }
  });
});

const revealItems = document.querySelectorAll(".section, .pagehead, .tracking-hero, .track-alert-wrap");

if ("IntersectionObserver" in window) {
  revealItems.forEach(item => item.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
