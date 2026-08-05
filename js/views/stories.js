/* 
========================================================================
   TALEWEAVE STORIES VIEW (js/views/stories.js)
   Renders the stories archive gallery with filters, search, 
   and sorting capabilities.
========================================================================
*/

import { getStories, isBookmarked, toggleBookmark } from "../store.js";

export const StoriesView = ({ container, queryParams }) => {
  // Local state
  let searchQuery = "";
  let selectedGenre = queryParams.genre || "All";
  let sortBy = "newest"; // newest, oldest, popular, alphabetically

  const allStories = getStories();
  
  // Extract all unique genres for filter bar
  const genres = ["All", ...new Set(allStories.map(s => s.genre))];

  // Render Page Skeleton
  container.innerHTML = `
    <section class="browse-section">
      <div class="section-header">
        <span class="section-subtitle">Leaf through the Chronicles</span>
        <h2 class="section-title">The Story Archives</h2>
        <div class="ornament-divider">
          <div class="ornament-line"></div>
          <div class="ornament-symbol">📜</div>
          <div class="ornament-line"></div>
        </div>
      </div>

      <!-- Filters Panel -->
      <div class="filters-bar">
        <div class="filters-top">
          <div class="search-wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              id="search-input" 
              class="form-control" 
              placeholder="Search chronicles by title or keyword..." 
              value="${searchQuery}"
              aria-label="Search stories"
            >
          </div>
          
          <div class="sort-wrapper">
            <select id="sort-select" class="form-control" aria-label="Sort stories">
              <option value="newest" ${sortBy === "newest" ? "selected" : ""}>Sort: Newest Uploads</option>
              <option value="oldest" ${sortBy === "oldest" ? "selected" : ""}>Sort: Oldest Archives</option>
              <option value="popular" ${sortBy === "popular" ? "selected" : ""}>Sort: Most Popular</option>
              <option value="alphabetical" ${sortBy === "alphabetical" ? "selected" : ""}>Sort: Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        <div class="genre-filters">
          <span class="control-label" style="margin-right: 0.5rem;">Genres:</span>
          ${genres.map(genre => `
            <button 
              class="genre-pill ${genre === selectedGenre ? 'active' : ''}" 
              data-genre="${genre}"
            >
              ${genre}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Grid Results Area -->
      <div id="stories-grid-root" class="stories-grid">
        <!-- Rendered dynamically -->
      </div>
    </section>
  `;

  const gridRoot = document.getElementById("stories-grid-root");

  // Function to filter, sort, and render stories list
  const updateGrid = () => {
    let filtered = allStories.filter(story => {
      const matchSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGenre = selectedGenre === "All" || story.genre === selectedGenre;
      return matchSearch && matchGenre;
    });

    // Apply Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filtered.length === 0) {
      gridRoot.innerHTML = `
        <div class="no-results">
          <i class="fa-regular fa-folder-open"></i>
          <h3>No chronicles found</h3>
          <p>No stories fit the active spell requirements. Try clearing your filters or changing your search terms.</p>
        </div>
      `;
      return;
    }

    gridRoot.innerHTML = filtered.map(story => {
      const bookmarked = isBookmarked(story.id);
      return `
        <article class="card story-card">
          <div class="story-card-cover">
            <img src="${story.cover}" alt="${story.title} cover" onerror="this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400'">
            <span class="story-card-genre">${story.genre}</span>
            <button 
              class="story-card-bookmark ${bookmarked ? 'bookmarked' : ''}" 
              data-id="${story.id}"
              aria-label="Bookmark story"
              title="${bookmarked ? 'Remove bookmark' : 'Bookmark story'}"
            >
              <i class="fa-${bookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
          </div>
          <div class="story-card-content">
            <div class="story-card-meta">
              <span><i class="fa-regular fa-calendar"></i> ${new Date(story.publishDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
              <span><i class="fa-regular fa-clock"></i> ${story.readingTime} min</span>
            </div>
            <h3 class="story-card-title">
              <a href="#/story/${story.id}">${story.title}</a>
            </h3>
            <p class="story-card-excerpt">${story.excerpt}</p>
            <div class="story-card-footer">
              <a href="#/story/${story.id}" class="read-more-link">
                Read Tale <i class="fa-solid fa-arrow-right-long"></i>
              </a>
              <span class="story-card-popularity">
                <i class="fa-solid fa-heart" style="color: var(--accent-gold);"></i> ${story.popularity}
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind Bookmark button listeners
    gridRoot.querySelectorAll('.story-card-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        const active = toggleBookmark(id);
        
        if (active) {
          btn.classList.add('bookmarked');
          btn.querySelector('i').className = 'fa-solid fa-bookmark';
          btn.title = 'Remove bookmark';
        } else {
          btn.classList.remove('bookmarked');
          btn.querySelector('i').className = 'fa-regular fa-bookmark';
          btn.title = 'Bookmark story';
        }
      });
    });
  };

  // Bind Event Listeners
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    updateGrid();
  });

  sortSelect.addEventListener("change", (e) => {
    sortBy = e.target.value;
    updateGrid();
  });

  // Genre pills click triggers
  container.querySelectorAll(".genre-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      container.querySelectorAll(".genre-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedGenre = pill.getAttribute("data-genre");
      updateGrid();
    });
  });

  // Initial Grid Render
  updateGrid();
};
