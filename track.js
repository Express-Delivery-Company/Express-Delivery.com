const trackForm = document.getElementById("trackForm");

if (trackForm) {
  const trackingDatabase = {
    "EXD-2048-9921": {
      page: "tracking.html",
      receiver: "James F Eckardt",
      sender: "Iva Trogrlic",
      status: "In Transit",
      eta: "24 Business Days",
      weight: "22 kg",
      service: "Express Air"
    },
    "EXD-4587-1204": {
      page: "tracking2.html",
      receiver: "Martin Gauthier ",
      sender: "Iva Trogrlic",
      status: "In Transit",
      eta: "24 Business Days",
      weight: "23 kg",
      service: "Express Ground"
    },
    "EXD-7812-3345": {
      page: "tracking3.html",
      receiver: "Michael Stone",
      sender: "Grace Wilson",
      status: "Out for Delivery",
      eta: "Today",
      weight: "1.5 kg",
      service: "Same Day Express"
    },
    "EXD-9901-7742": {
      page: "tracking4.html",
      receiver: "Emily Brown",
      sender: "Daniel Scott",
      status: "In Transit",
      eta: "4 - 6 Business Days",
      weight: "5.1 kg",
      service: "International Air"
    },
    "EXD-6633-1188": {
      page: "tracking5.html",
      receiver: "Sophia White",
      sender: "James Walker",
      status: "Arrived at Hub",
      eta: "1 - 2 Business Days",
      weight: "3.7 kg",
      service: "Priority Express"
    },
    "EXD-4402-5567": {
      page: "tracking6.html",
      receiver: "Olivia Green",
      sender: "Chris Adams",
      status: "Customs Clearance",
      eta: "5 - 7 Business Days",
      weight: "6.0 kg",
      service: "International Cargo"
    },
    "EXD-8754-2219": {
      page: "tracking7.html",
      receiver: "Ethan Hall",
      sender: "Victoria Lee",
      status: "Delivered",
      eta: "Completed",
      weight: "2.2 kg",
      service: "Express Air"
    }
  };

  const submitBtn = trackForm.querySelector("button[type='submit']");
  const messageBox = document.getElementById("trackMessage");

  trackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const orderId = form.orderId.value.trim().toUpperCase();
    const email = form.email.value.trim();

    if (trackingDatabase[orderId]) {
      const data = trackingDatabase[orderId];

      messageBox.textContent = "Delivery number check successful.";
      messageBox.style.color = "green";

      submitBtn.disabled = true;
      submitBtn.textContent = "Please wait...";

      const payload = {
        orderId,
        email,
        receiver: data.receiver,
        sender: data.sender,
        status: data.status,
        eta: data.eta,
        weight: data.weight,
        service: data.service
      };

      localStorage.setItem("express_delivery_tracking_request", JSON.stringify(payload));

      setTimeout(() => {
        window.location.href = data.page;
      }, 5000);
    } else {
      messageBox.textContent = "Invalid delivery number. Please check and try again.";
      messageBox.style.color = "red";

      submitBtn.disabled = false;
      submitBtn.textContent = "Track Now";
    }
  });
}