const grid = document.getElementById("events-grid");
const searchInput = document.getElementById("search");
const filtersBox = document.getElementById("filters");

let activeCategory = "All";

function renderEvents() {
  const query = searchInput.value.toLowerCase();
  const filtered = events.filter(e =>
    (activeCategory === "All" || e.category === activeCategory) &&
    e.name.toLowerCase().includes(query)
  );

  grid.innerHTML = filtered.length
    ? filtered.map(e => `
      <article class="card">
        <img src="${e.image}" alt="${e.name}">
        <div class="card-body">
          <span class="tag">${e.category}</span>
          <h3>${e.name}</h3>
          <p class="meta">📅 ${new Date(e.date).toLocaleDateString()} · 📍 ${e.venue}</p>
          <p>${e.description}</p>
          <a href="event.html?id=${e.id}" class="btn">View Details</a>
        </div>
      </article>`).join("")
    : "<p>No events found.</p>";
}

function renderFilters() {
  const categories = ["All", ...new Set(events.map(e => e.category))];
  filtersBox.innerHTML = categories.map(c =>
    `<button class="filter-btn ${c === activeCategory ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
}

filtersBox.addEventListener("click", e => {
  if (e.target.matches(".filter-btn")) {
    activeCategory = e.target.dataset.cat;
    renderFilters();
    renderEvents();
  }
});

searchInput.addEventListener("input", renderEvents);

renderFilters();
renderEvents();