// 1. Mobile menu: open and close
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// 2. Fade-in animation when scrolling
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 3. Highlight the current section in the menu
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach(a =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-50% 0px -50% 0px" });
document.querySelectorAll("section").forEach(sec => sectionObserver.observe(sec));

// 4. If a picture is missing, hide it so the placeholder text shows instead
document.querySelectorAll("img").forEach(img => {
  const hide = () => (img.style.display = "none");
  img.addEventListener("error", hide);
  if (img.complete && img.naturalWidth === 0) hide();
});

// 5. Automatic year in the footer
document.getElementById("year").textContent = new Date().getFullYear();