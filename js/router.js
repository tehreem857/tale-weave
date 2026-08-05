/* 
========================================================================
   TALEWEAVE CLIENT ROUTER (js/router.js)
   Simple dynamic client-side router using location hashes.
========================================================================
*/

export class Router {
  constructor(routes, appRootId) {
    this.routes = routes;
    this.appRoot = document.getElementById(appRootId);
    
    // Listen to hash shifts
    window.addEventListener("hashchange", () => this.handleRouteChange());
  }

  init() {
    this.handleRouteChange();
  }

  handleRouteChange() {
    let hash = window.location.hash || "#/";
    let path = hash.slice(1) || "/";
    
    // Parse query params (e.g., #/stories?genre=Fantasy)
    let queryParams = {};
    if (path.includes("?")) {
      const parts = path.split("?");
      path = parts[0];
      const queryStr = parts[1];
      const params = new URLSearchParams(queryStr);
      for (const [key, val] of params.entries()) {
        queryParams[key] = val;
      }
    }

    // Match path against registered routes
    let matchedRoute = null;
    let params = {};

    for (const routePattern in this.routes) {
      const paramNames = [];
      
      // Convert e.g., "/story/:id/chapter/:idx" -> regex
      const regexPath = routePattern
        .replace(/:([^\/]+)/g, (match, name) => {
          paramNames.push(name);
          return "([^\\/]+)";
        })
        .replace(/\//g, "\\/");
        
      const regex = new RegExp(`^${regexPath}$`);
      const match = path.match(regex);
      
      if (match) {
        matchedRoute = this.routes[routePattern];
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        break;
      }
    }

    // Toggle reading progress bar visibility (only active on reading pages)
    const progressBar = document.getElementById("reading-progress-container");
    if (progressBar) {
      if (path.startsWith("/story/") && !path.includes("/admin")) {
        progressBar.style.display = "block";
      } else {
        progressBar.style.display = "none";
      }
    }

    // Reset distraction free mode body tags
    document.body.classList.remove("distraction-free");

    if (matchedRoute) {
      this.updateActiveNav(path);
      
      // Page transition effect (fade-in loader shell)
      this.appRoot.innerHTML = `
        <div class="initial-loader" style="opacity: 0; transition: opacity 0.2s ease;">
          <div class="spinner"></div>
        </div>
      `;
      
      setTimeout(() => {
        const loader = this.appRoot.querySelector(".initial-loader");
        if (loader) loader.style.opacity = "1";
      }, 50);

      // Execute view builder
      setTimeout(() => {
        try {
          matchedRoute({ params, queryParams, container: this.appRoot });
        } catch (err) {
          console.error("Route render crash:", err);
          this.renderError("A spell went wrong while turning this page. Please try again.");
        }
      }, 150);
    } else {
      this.render404();
    }
    
    // Reset view position
    window.scrollTo(0, 0);
  }

  updateActiveNav(path) {
    document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(el => {
      el.classList.remove("active");
    });
    
    // Match links (e.g. /stories matches /stories/something)
    let segments = path.split("/");
    let rootPath = "/" + (segments[1] || "");
    
    const selector = `.nav-item[href="#${rootPath}"], .mobile-nav-item[href="#${rootPath}"]`;
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add("active");
    });

    if (path === "/" || path === "") {
      document.querySelectorAll('.nav-item[href="#/"], .mobile-nav-item[href="#/"]').forEach(el => {
        el.classList.add("active");
      });
    }
  }

  render404() {
    this.appRoot.innerHTML = `
      <div class="section-header" style="padding: 8rem 2rem;">
        <div style="font-size: 5rem; margin-bottom: 1.5rem;">🧭</div>
        <h2 class="section-title">Lost in the Archives</h2>
        <p class="section-subtitle">This chronicle path is blank. Let's find our way back to the reading parlor.</p>
        <div style="margin-top: 2.5rem;">
          <a href="#/" class="btn btn-primary">Return to Home</a>
        </div>
      </div>
    `;
  }

  renderError(msg) {
    this.appRoot.innerHTML = `
      <div class="section-header" style="padding: 8rem 2rem;">
        <div style="font-size: 5rem; margin-bottom: 1.5rem;">📜</div>
        <h2 class="section-title">An Error Occurred</h2>
        <p class="section-subtitle">${msg}</p>
        <div style="margin-top: 2.5rem;">
          <a href="#/" class="btn btn-primary">Go to Home</a>
        </div>
      </div>
    `;
  }
}
