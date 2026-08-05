/* 
========================================================================
   TALEWEAVE HOME VIEW (js/views/home.js)
   Renders the author profile hero, featured story card,
   and recent publications list.
========================================================================
*/

import { getStories, isBookmarked, toggleBookmark } from "../store.js";

// Helper ornament separator
const getDivider = () => `
  <div class="ornament-divider">
    <div class="ornament-line"></div>
    <div class="ornament-symbol">❦</div>
    <div class="ornament-line"></div>
  </div>
`;

export const HomeView = ({ container }) => {
  const stories = getStories();
  
  // Sort stories by publishDate desc
  const sortedStories = [...stories].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  // Featured story (highest popularity or most recent)
  const featured = sortedStories.find(s => s.popularity > 100) || sortedStories[0];
  
  // Latest 3 stories (excluding featured if possible, otherwise just top 3)
  const latest = sortedStories.slice(0, 3);

  const homeHtml = `
    <!-- Hero Header -->
    <section class="home-hero">
      <div class="hero-content">
        <span class="hero-pretitle">Welcome to the Story Parlor</span>
        <h1 class="hero-title">Ink, Tea, & Cozier Chronicles</h1>
        <p class="hero-description">
          Step inside a library of original tales woven with magic, mystery, and heart. 
          Pull up a chair, pour a cup of tea, and escape into cozy, hand-crafted worlds.
        </p>
        <div class="hero-actions">
          <a href="#/stories" class="btn btn-primary">
            <i class="fa-solid fa-book-open"></i> Browse Stories
          </a>
          <a href="#/about" class="btn btn-secondary">
            Meet the Author
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Story -->
    ${featured ? `
    <section class="featured-section">
      <div class="section-header">
        <span class="section-subtitle">A Highlight from the Quill</span>
        <h2 class="section-title">Featured Masterpiece</h2>
        ${getDivider()}
      </div>
      
      <div class="featured-card">
        <div class="featured-image-wrapper">
          <img src="${featured.cover}" alt="${featured.title} cover" class="featured-image" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600'">
          <span class="featured-badge">Featured</span>
        </div>
        <div class="featured-info">
          <div class="featured-meta">
            <span><i class="fa-solid fa-tag"></i> ${featured.genre}</span>
            <span><i class="fa-regular fa-clock"></i> ${featured.readingTime} min read</span>
            <span><i class="fa-regular fa-calendar"></i> ${new Date(featured.publishDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
          </div>
          <h3 class="featured-story-title">${featured.title}</h3>
          <p class="featured-summary">${featured.excerpt}</p>
          <div class="featured-actions">
            <a href="#/story/${featured.id}" class="btn btn-primary">Start Reading</a>
            <button 
              class="bookmark-btn ${isBookmarked(featured.id) ? 'bookmarked' : ''}" 
              data-id="${featured.id}" 
              title="${isBookmarked(featured.id) ? 'Remove bookmark' : 'Bookmark story'}"
              aria-label="Bookmark story"
            >
              <i class="fa-${isBookmarked(featured.id) ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Recent Publications -->
    <section class="latest-section">
      <div class="latest-container">
        <div class="section-header">
          <span class="section-subtitle">Freshly Dipped in Ink</span>
          <h2 class="section-title">The Latest Stories</h2>
          ${getDivider()}
        </div>

        <div class="stories-grid">
          ${latest.map(story => {
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
          }).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 3.5rem;">
          <a href="#/stories" class="btn btn-secondary">
            View All Chronicles
          </a>
        </div>
      </div>
    </section>
  `;

  container.innerHTML = homeHtml;

  // Bind Bookmark Event Listeners
  const bindBookmarks = () => {
    container.querySelectorAll('.bookmark-btn, .story-card-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        const active = toggleBookmark(id);
        
        // Update all instances of this bookmark button in the DOM
        container.querySelectorAll(`[data-id="${id}"]`).forEach(btnInstance => {
          if (active) {
            btnInstance.classList.add('bookmarked');
            btnInstance.querySelector('i').className = 'fa-solid fa-bookmark';
            btnInstance.title = 'Remove bookmark';
          } else {
            btnInstance.classList.remove('bookmarked');
            btnInstance.querySelector('i').className = 'fa-regular fa-bookmark';
            btnInstance.title = 'Bookmark story';
          }
        });
      });
    });
  };

  bindBookmarks();
};
