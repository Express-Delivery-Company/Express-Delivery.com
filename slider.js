(function () {
  const sliders = document.querySelectorAll("[data-slider]");
  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const dotsWrap = slider.querySelector("[data-dots]");
    if (!slides.length || !dotsWrap) return;

    let idx = 0;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot" + (i === 0 ? " active" : "");
      d.type = "button";
      d.addEventListener("click", () => go(i));
      dotsWrap.appendChild(d);
    });

    const dots = Array.from(dotsWrap.querySelectorAll(".dot"));

    function go(i) {
      slides[idx].classList.remove("active");
      dots[idx].classList.remove("active");
      idx = i;
      slides[idx].classList.add("active");
      dots[idx].classList.add("active");
    }

    setInterval(() => go((idx + 1) % slides.length), 4500);
  });
})();
