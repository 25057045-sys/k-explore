function getRegistrations() {
  return JSON.parse(localStorage.getItem("registrations")) || [];
}

function saveRegistration(reg) {
  const all = getRegistrations();
  all.push(reg);
  localStorage.setItem("registrations", JSON.stringify(all));
}

function isAlreadyRegistered(email, eventId) {
  return getRegistrations().some(
    r => r.email.toLowerCase() === email.toLowerCase() && r.eventId === eventId
  );
}