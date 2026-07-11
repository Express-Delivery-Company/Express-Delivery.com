(() => {
  const btn = document.querySelector("[data-menu-btn]");
  const nav = document.querySelector("[data-nav]");
  if (!btn || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  };

  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    setOpen(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      btn.blur();
    }
  });
})();
