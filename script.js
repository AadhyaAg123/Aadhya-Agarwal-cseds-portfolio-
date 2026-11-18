const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

// Interaction 1: switch between light and dark themes.
themeToggle.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
});

// Interaction 2: responsive mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
    navItems.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

// Contact form validation (front-end only; no message is sent).
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const fields = ["name", "email", "subject", "message"].map(id => document.getElementById(id));

function validateField(field) {
  const value = field.value.trim();
  let valid = value.length > 0;
  if (field.id === "name") valid = value.length >= 2;
  if (field.id === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (field.id === "message") valid = value.length >= 10;
  field.classList.toggle("invalid", !valid);
  return valid;
}

fields.forEach(field => {
  field.addEventListener("input", () => {
    if (field.classList.contains("invalid")) validateField(field);
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const allValid = fields.map(validateField).every(Boolean);
  if (allValid) {
    formMessage.textContent = "The form is valid. This demo does not send or store your message.";
    formMessage.className = "form-message success";
  } else {
    formMessage.textContent = "Please correct the highlighted fields and try again.";
    formMessage.className = "form-message";
  }
});
