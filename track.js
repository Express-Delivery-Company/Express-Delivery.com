const trackForm = document.getElementById("trackForm");

const trackingDatabase = {
  "EXD-2048-9921": "tracking.html",
  "EXD-4587-1204": "tracking.html",
  "EXD-7812-3345": "tracking.html",
  "EXD-9901-7742": "tracking.html",
  "EXD-6633-1188": "tracking.html",
  "EXD-4402-5567": "tracking.html",
  "EXD-8754-2219": "tracking.html"
};

if (trackForm) {
  const submitBtn = trackForm.querySelector("button[type='submit']");
  const messageBox = document.getElementById("trackMessage");

  trackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const orderId = form.orderId.value.trim().toUpperCase();
    const email = form.email.value.trim();

    if (trackingDatabase[orderId]) {
      messageBox.textContent = "Delivery number check successful.";
      messageBox.style.color = "green";

      submitBtn.disabled = true;
      submitBtn.textContent = "Please wait...";

      localStorage.removeItem("express_delivery_tracking_request");
      sessionStorage.setItem(`express_delivery_email_${orderId}`, email);

      setTimeout(() => {
        window.location.href = `${trackingDatabase[orderId]}?code=${encodeURIComponent(orderId)}`;
      }, 1200);
    } else {
      messageBox.textContent = "Invalid delivery number. Please check and try again.";
      messageBox.style.color = "red";

      submitBtn.disabled = false;
      submitBtn.textContent = "Track Now";
    }
  });
}
