// Mobile Menu Toggle
window.toggleMenu = function() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
};

// Open/Closed Logic
function checkShopStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeDecimal = hour + minute / 60;

  let isOpen = false;
  let statusText = "Closed";
  let color = "#e74c3c"; // Red

  // Hours: M-Sat 9am-9pm (21:00), Sun 10am-8pm (20:00)
  if (day === 0) {
    // Sunday
    if (timeDecimal >= 10 && timeDecimal < 20) isOpen = true;
  } else {
    // Mon-Sat
    if (timeDecimal >= 9 && timeDecimal < 21) isOpen = true;
  }

  if (isOpen) {
    statusText = "Open Now";
    color = "#2ecc71"; // Green
  }

  // Update DOM
  const statusTextEl = document.getElementById("statusText");
  const statusDotEl = document.getElementById("statusDot");
  if (statusTextEl) statusTextEl.innerText = statusText;
  if (statusDotEl) statusDotEl.style.backgroundColor = color;
}

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  let progressBar = document.querySelector(".scroll-progress");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);
  }
  progressBar.style.width = scrollPercent + "%";
}

// Scroll-Triggered Animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-up, .slide-left, .slide-right, .scale-in"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Fallback: Make all elements visible after 2 seconds if IntersectionObserver doesn't trigger
  setTimeout(() => {
    const hiddenElements = document.querySelectorAll(
      ".fade-in:not(.visible), .slide-up:not(.visible), .slide-left:not(.visible), .slide-right:not(.visible), .scale-in:not(.visible)"
    );
    hiddenElements.forEach((el) => {
      el.classList.add("visible");
    });
  }, 2000);
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        const nav = document.getElementById("navMenu");
        if (nav && nav.classList.contains("active")) {
          nav.classList.remove("active");
        }

        // Smooth scroll to target
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Add animation classes to sections automatically
function addAnimationClasses() {
  // Add fade-in to section headers
  document.querySelectorAll(".section-header").forEach((el, index) => {
    el.classList.add("fade-in");
    el.classList.add(`stagger-${(index % 5) + 1}`);
  });

  // Add slide-up to sale cards
  document.querySelectorAll(".sale-card").forEach((el, index) => {
    el.classList.add("slide-up");
    el.classList.add(`stagger-${(index % 5) + 1}`);
  });

  // Add scale-in to location card
  const locationCard = document.querySelector(".location-card");
  if (locationCard) {
    locationCard.classList.add("scale-in");
  }

  // Add slide-left to map container
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    mapContainer.classList.add("slide-left");
  }

  // Add slide-right to location info
  const locationInfo = document.querySelector(".location-info");
  if (locationInfo) {
    locationInfo.classList.add("slide-right");
  }

  // Add fade-in to category pills
  document.querySelectorAll(".cat-pill").forEach((el, index) => {
    el.classList.add("fade-in");
    el.classList.add(`stagger-${(index % 5) + 1}`);
  });
}

// Run on load
document.addEventListener("DOMContentLoaded", function () {
  checkShopStatus();
  addAnimationClasses(); // Add animation classes FIRST
  initScrollAnimations(); // Then set up the observer
  initSmoothScroll();
  updateScrollProgress();
});

// Run on scroll
window.addEventListener("scroll", () => {
  updateScrollProgress();
});
