document.getElementById("shipForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    pickup: form.pickup.value.trim(),
    destination: form.destination.value.trim(),
    description: form.description.value.trim(),
    photoDataUrl: null,
    createdAt: new Date().toISOString(),
  };

  const file = form.photo.files?.[0];
  if (file) {
    data.photoDataUrl = await fileToDataUrl(file);
  }

  localStorage.setItem("express_delivery_ship_request", JSON.stringify(data));
  window.location.href = "submitted.html";
});

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(file);
  });
}
