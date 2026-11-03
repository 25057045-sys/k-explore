const params = new URLSearchParams(window.location.search);
const eventId = Number(params.get("id"));
const currentEvent = events.find(e => e.id === eventId);
const detailsBox = document.getElementById("event-details");
const eventSelect = document.getElementById("event-select");

if (!currentEvent) {
  detailsBox.innerHTML = "<h2>Event not found.</h2><a href='index.html' class='btn'>Go back</a>";
} else {
  document.title = currentEvent.name + " – K Explore";
  detailsBox.innerHTML = `
    <img src="${currentEvent.image}" alt="${currentEvent.name}" class="detail-img">
    <span class="tag">${currentEvent.category}</span>
    <h1>${currentEvent.name}</h1>
    <p class="meta">📅 ${new Date(currentEvent.date).toLocaleString()} · 📍 ${currentEvent.venue}</p>
    <div id="countdown" class="countdown"></div>
    <p>${currentEvent.details}</p>
  `;
  startCountdown(currentEvent.date);
}

// Fill dropdown with all events, preselect the current one
eventSelect.innerHTML =
  `<option value="">-- Select an event --</option>` +
  events.map(e =>
    `<option value="${e.id}" ${e.id === eventId ? "selected" : ""}>${e.name}</option>`
  ).join("");

function startCountdown(dateStr) {
  const box = document.getElementById("countdown");
  const target = new Date(dateStr).getTime();

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      box.textContent = "This event has started or ended.";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    box.textContent = `⏳ Starts in ${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  const timer = setInterval(update, 1000);
}