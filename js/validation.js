const form = document.getElementById("register-form");
const confirmation = document.getElementById("confirmation");

function setError(field, message) {
  document.getElementById(field + "-error").textContent = message;
}

function validateForm() {
  let valid = true;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventVal = eventSelect.value;

  ["name", "email", "phone", "event"].forEach(f => setError(f, ""));

  if (name.length < 3 || !/^[A-Za-z\s.]+$/.test(name)) {
    setError("name", "Enter a valid name (at least 3 letters, letters only).");
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Enter a valid email address.");
    valid = false;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    setError("phone", "Enter a valid 10-digit mobile number.");
    valid = false;
  }
  if (!eventVal) {
    setError("event", "Please select an event.");
    valid = false;
  }
  return valid;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm()) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const selectedId = Number(eventSelect.value);
  const selectedEvent = events.find(ev => ev.id === selectedId);

  if (isAlreadyRegistered(email, selectedId)) {
    setError("email", "This email is already registered for this event.");
    return;
  }

  saveRegistration({ name, email, phone, eventId: selectedId, time: new Date().toISOString() });

  form.hidden = true;
  confirmation.hidden = false;
  confirmation.innerHTML = `
    <h3>🎉 Registration Successful!</h3>
    <p>Thank you, <strong>${name}</strong>. You are registered for
    <strong>${selectedEvent.name}</strong>.</p>
    <p>A confirmation will be sent to ${email}.</p>
    <a href="index.html" class="btn">Back to Events</a>
  `;
});