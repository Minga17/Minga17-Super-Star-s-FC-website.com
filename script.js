// script.js

// ----------------------
// Contact Form Handler
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async function (event) {
        event.stopPropagation();

        const formData = new FormData(form);

        try {
          const response = await fetch(form, {
            method: "POST",
            body: formData
          });

          if (!response.ok) {
            alert("✅" + " Thank you! Your message has been sent.");
            form.reset();
          } else { 
            alert("❌" + (XPathResult.error || "Oops! Something went wrong, please try again."));
          }

        } catch (error) {
          alert("⚠️ Network error. Please try again later.");
          console.error(error);
        }
      });
  }
});

// ----------------------
// Gallery Lightbox
// ----------------------
function createLightbox() {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.style.position = "fixed";
  lightbox.style.top = 0;
  lightbox.style.left = 0;
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.background = "rgba(0,0,0,0.8)";
  lightbox.style.display = "flex";
  lightbox.style.justifyContent = "center";
  lightbox.style.alignItems = "center";
  lightbox.style.visibility = "hidden";
  lightbox.style.opacity = 0;
  lightbox.style.transition = "opacity 0.3s ease";
  lightbox.innerHTML = `<img src="" alt="Expanded view" style="max-width:90%; max-height:90%; border:4px solid white; border-radius:8px;">`;

  document.body.appendChild(lightbox);

  // Close on click
  lightbox.addEventListener("click", () => {
    lightbox.style.opacity = 0;
    setTimeout(() => {
      lightbox.style.visibility = "hidden";
    }, 300);
  });

  return lightbox;
}

const lightbox = createLightbox();

document.querySelectorAll(".gallery-photo img").forEach((img) => {
  img.addEventListener("click", () => {
    const bigImg = lightbox.querySelector("img");
    bigImg.src = img.src;
    lightbox.style.visibility = "visible";
    lightbox.style.opacity = 1;
  });
});

// ----------------------
// Roster Hover Effect
// ----------------------
document.querySelectorAll(".player-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.transition = "transform 0.2s ease";
    card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "none";
  });
});

// ----------------------
// Loading Screen Fade
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading-screen");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 2500);
  }
});

// ----------------------
// Dark Mode Toggle
// ----------------------
const darkToggle = document.getElementById("dark-toggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

// ----------------------
// Matches (from backend)
// ----------------------
async function fetchMatches(filter = "all") {
  try {
    const res = await fetch("http://localhost:4000/api/matches");
    const matches = await res.json();

    const list = document.getElementById("match-list");
    list.innerHTML = "";

    matches
      .filter((m) => filter === "all" || m.location.toLowerCase() === filter)
      .forEach((m) => {
        const item = document.createElement("li");
        item.textContent = `${m.date} — ${m.opponent} (${m.location}) at ${m.time}`;
        list.appendChild(item);
      });
  } catch (err) {
    console.error("Error loading matches:", err);
  }
}

const matchFilter = document.getElementById("match-filter");
if (matchFilter) {
  matchFilter.addEventListener("change", (e) => {
    fetchMatches(e.target.value);
  });
}

fetchMatches();


