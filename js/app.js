/* 
========================================================================
   TALEWEAVE APP BOOTSTRAPPER (js/app.js)
   Initializes global events, registers routes, handles mobile drawers,
   reading scroll bar, newsletter forms, and theme states.
========================================================================
*/

import { initStore } from "./store.js";
import { Router } from "./router.js";

// Import Views
import { HomeView } from "./views/home.js";
import { StoriesView } from "./views/stories.js";
import { StoryView } from "./views/story.js";
import { AboutView } from "./views/about.js";
import { ContactView } from "./views/contact.js";
import { AdminView } from "./views/admin.js";

// Map routes to view handlers
const routes = {
  "/": HomeView,
  "/stories": StoriesView,
  "/story/:id": StoryView,
  "/story/:id/chapter/:chapterNum": StoryView,
  "/about": AboutView,
  "/contact": ContactView,
  "/admin": AdminView,
  "/admin/new": AdminView,
  "/admin/edit/:id": AdminView
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize store data
  initStore();

  // 2. Initialize Hash Router
  const router = new Router(routes, "app-root");
  router.init();

  // 3. Theme Controller (Light/Dark Mode Toggling)
  const themeToggle = document.getElementById("theme-toggle");
  
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("taleweave-theme", nextTheme);
  };
  
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // 4. Responsive Mobile Drawer Toggles
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  
  const toggleDrawer = () => {
    const isOpen = drawer.classList.toggle("open");
    menuBtn.classList.toggle("open");
    overlay.classList.toggle("visible");
    drawer.setAttribute("aria-hidden", !isOpen);
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    menuBtn.classList.remove("open");
    overlay.classList.remove("visible");
    drawer.setAttribute("aria-hidden", "true");
  };

  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener("click", toggleDrawer);
    overlay.addEventListener("click", closeDrawer);
    
    // Close drawer on clicking navigation links inside it
    drawer.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.addEventListener("click", closeDrawer);
    });
  }

  // 5. Global Reading Progress Scroll Listener
  const updateReadingProgressBar = () => {
    const hash = window.location.hash;
    // Check if we are inside story reader
    if (hash.startsWith("#/story/") && !hash.includes("/admin")) {
      const bar = document.getElementById("reading-progress-bar");
      if (bar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
      }
    }
  };

  window.addEventListener("scroll", updateReadingProgressBar);
  window.addEventListener("resize", updateReadingProgressBar);

  // 6. Global Footer Newsletter Form Handler
  const newsletterForm = document.getElementById("footer-newsletter-form");
  const newsletterSuccess = document.getElementById("newsletter-success");

  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      
      // Simulate newsletter signup
      emailInput.style.display = "none";
      newsletterForm.querySelector(".newsletter-submit").style.display = "none";
      newsletterForm.style.border = "none";
      newsletterSuccess.style.display = "flex";
      
      console.log(`Newsletter signup registered for email: ${emailInput.value}`);
    });
  }
});
