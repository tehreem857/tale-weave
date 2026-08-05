/* 
========================================================================
   TALEWEAVE STORY DETAIL & READER VIEW (js/views/story.js)
   Cozy distraction-free reading experience, chapter navigation,
   sharing buttons, reading time estimate, and comments system.
========================================================================
*/

import { getStory, getComments, addComment, isBookmarked, toggleBookmark } from "../store.js";

// Helper ornament separator
const getDivider = () => `
  <div class="ornament-divider">
    <div class="ornament-line"></div>
    <div class="ornament-symbol">✦</div>
    <div class="ornament-line"></div>
  </div>
`;

export const StoryView = ({ params, container }) => {
  const storyId = params.id;
  const story = getStory(storyId);

  if (!story) {
    container.innerHTML = `
      <div class="section-header" style="padding: 8rem 2rem;">
        <div style="font-size: 5rem; margin-bottom: 1.5rem;">📖</div>
        <h2 class="section-title">Story Not Found</h2>
        <p class="section-subtitle">The scroll you requested does not exist in our library.</p>
        <div style="margin-top: 2.5rem;">
          <a href="#/stories" class="btn btn-primary">Back to Archives</a>
        </div>
      </div>
    `;
    return;
  }

  // 1-indexed chapter from parameters, default to chapter 1
  const activeChapterIndex = params.chapterNum ? parseInt(params.chapterNum, 10) - 1 : 0;
  const chaptersCount = story.chapters.length;

  if (activeChapterIndex < 0 || activeChapterIndex >= chaptersCount) {
    container.innerHTML = `
      <div class="section-header" style="padding: 8rem 2rem;">
        <div style="font-size: 5rem; margin-bottom: 1.5rem;">🍂</div>
        <h2 class="section-title">Chapter Not Found</h2>
        <p class="section-subtitle">This story does not have a chapter numbered ${activeChapterIndex + 1}.</p>
        <div style="margin-top: 2.5rem;">
          <a href="#/story/${story.id}" class="btn btn-primary">Read First Chapter</a>
        </div>
      </div>
    `;
    return;
  }

  const currentChapter = story.chapters[activeChapterIndex];

  // Render Layout
  container.innerHTML = `
    <div class="reader-container">
      <div class="story-layout">
        
        <!-- Sidebar: Table of Contents (Hidden if single chapter) -->
        <aside class="story-sidebar" style="${chaptersCount <= 1 ? 'display: none;' : ''}">
          <h4 class="sidebar-title">Table of Contents</h4>
          <ul class="sidebar-toc-list">
            ${story.chapters.map((ch, idx) => `
              <li class="sidebar-toc-item">
                <a 
                  href="#/story/${story.id}/chapter/${idx + 1}" 
                  class="sidebar-toc-link ${idx === activeChapterIndex ? 'active' : ''}"
                >
                  ${ch.title.split(":")[0]}
                </a>
              </li>
            `).join('')}
          </ul>
        </aside>

        <!-- Main Reader Shell -->
        <div class="reader-wrapper" style="${chaptersCount <= 1 ? 'grid-column: 1 / -1; max-width: 720px;' : ''}">
          
          <!-- Story Header -->
          <header class="story-meta-header">
            <span class="story-category-tag">${story.genre}</span>
            <h1 class="story-main-title">${story.title}</h1>
            ${chaptersCount > 1 ? `<h2 class="chapter-subtitle">${currentChapter.title}</h2>` : ''}
            
            <div class="story-reader-meta">
              <span><i class="fa-regular fa-user"></i> By ${story.author}</span>
              <span><i class="fa-regular fa-clock"></i> ${story.readingTime} min read</span>
              <span><i class="fa-regular fa-calendar"></i> ${new Date(story.publishDate).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
              <button 
                id="reader-bookmark-btn" 
                class="btn btn-secondary btn-sm ${isBookmarked(story.id) ? 'bookmarked' : ''}"
                style="border-radius: 20px; font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem;"
              >
                <i class="fa-${isBookmarked(story.id) ? 'solid' : 'regular'} fa-bookmark"></i>
                <span id="bookmark-text">${isBookmarked(story.id) ? 'Saved' : 'Bookmark'}</span>
              </button>
            </div>
          </header>

          <!-- Control bar for Reader (Font sizes and theme schemes) -->
          <div class="reader-controls-bar">
            <div class="control-group">
              <span class="control-label">Aesthetics</span>
              <div class="color-swatch-group">
                <button class="color-swatch swatch-light active" data-scheme="light" title="Light paper"></button>
                <button class="color-swatch swatch-sepia" data-scheme="sepia" title="Cozy sepia"></button>
                <button class="color-swatch swatch-dark" data-scheme="dark" title="Midnight forest"></button>
              </div>
            </div>

            <div class="control-group">
              <span class="control-label">Font Size</span>
              <button id="font-decrease" class="control-btn" title="Decrease font size"><i class="fa-solid fa-minus"></i></button>
              <button id="font-increase" class="control-btn" title="Increase font size"><i class="fa-solid fa-plus"></i></button>
            </div>

            <div class="control-group">
              <button id="distraction-free-btn" class="control-btn" title="Toggle distraction-free reading">
                <i class="fa-solid fa-expand"></i> Focus
              </button>
            </div>
          </div>

          <!-- Reading Core Text -->
          <article id="reading-text-box" class="reading-text">
            ${currentChapter.content.split('\n\n').map(p => {
              if (p.trim().startsWith('*') && p.trim().endsWith('*')) {
                // If it's a quote or italic subtitle
                return `<p style="font-style: italic; text-align: center; margin: 2rem 0; color: var(--text-secondary);">${p.replace(/\*/g, '')}</p>`;
              }
              return `<p>${p.trim()}</p>`;
            }).join('')}
          </article>

          <!-- Chapter Navigation Footer (Show only if multi-chapter) -->
          ${chaptersCount > 1 ? `
            <nav class="story-reader-footer-nav" aria-label="Chapter Navigation">
              <div class="nav-chapter-box prev-chapter">
                ${activeChapterIndex > 0 ? `
                  <a href="#/story/${story.id}/chapter/${activeChapterIndex}">
                    <span class="nav-chapter-label"><i class="fa-solid fa-arrow-left"></i> Previous Chapter</span>
                    <span class="nav-chapter-title">${story.chapters[activeChapterIndex - 1].title.split(":")[0]}</span>
                  </a>
                ` : `
                  <span class="nav-chapter-label" style="opacity: 0.5;">No Previous Chapter</span>
                `}
              </div>
              
              <div class="nav-chapter-box next-chapter">
                ${activeChapterIndex < chaptersCount - 1 ? `
                  <a href="#/story/${story.id}/chapter/${activeChapterIndex + 2}">
                    <span class="nav-chapter-label">Next Chapter <i class="fa-solid fa-arrow-right"></i></span>
                    <span class="nav-chapter-title">${story.chapters[activeChapterIndex + 1].title.split(":")[0]}</span>
                  </a>
                ` : `
                  <a href="#/stories">
                    <span class="nav-chapter-label">The End</span>
                    <span class="nav-chapter-title">Back to Archives <i class="fa-solid fa-folder-open"></i></span>
                  </a>
                `}
              </div>
            </nav>
          ` : `
            <div style="text-align: center; margin: 4rem 0;">
              ${getDivider()}
              <a href="#/stories" class="btn btn-secondary">
                <i class="fa-solid fa-reply"></i> Return to Story Archives
              </a>
            </div>
          `}

          <!-- Share Section -->
          <div class="share-section">
            <h4 class="share-title">Enjoyed the reading? Share this story:</h4>
            <div class="share-buttons">
              <button class="share-icon-btn" id="share-copy" title="Copy link to clipboard"><i class="fa-solid fa-link"></i></button>
              <button class="share-icon-btn" id="share-twitter" title="Share on Twitter"><i class="fa-brands fa-twitter"></i></button>
              <button class="share-icon-btn" id="share-facebook" title="Share on Facebook"><i class="fa-brands fa-facebook-f"></i></button>
            </div>
            <div id="toast-notify" class="share-toast">Link copied to parchment clipboard! ✒️</div>
          </div>

          <!-- Comments Parlor -->
          <section class="comments-section">
            <h3 class="comments-title">Comments Parlor</h3>
            
            <!-- Comment form -->
            <form id="comment-post-form" class="comment-form">
              <div class="comment-form-row">
                <div class="form-group">
                  <label for="comment-author-input">Your Scribe Name</label>
                  <input type="text" id="comment-author-input" class="form-control" placeholder="E.g., Jane Reader" required>
                </div>
                <div class="form-group">
                  <label for="comment-email-input">Your Email (never visible)</label>
                  <input type="email" id="comment-email-input" class="form-control" placeholder="E.g., jane@email.com" required>
                </div>
              </div>
              <div class="form-group">
                <label for="comment-text-input">Your Thoughts</label>
                <textarea id="comment-text-input" class="form-control" placeholder="Share your insights, wild theories, or words of encouragement..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Leave a Comment</button>
            </form>

            <!-- Comments List -->
            <div id="comments-list-root" class="comments-list">
              <!-- Loaded dynamically -->
            </div>
          </section>

        </div>
      </div>
    </div>
  `;

  // --- Dynamic Interactions Setup ---

  // Font Size Sizing (Range 0.9rem to 1.7rem)
  let currentReaderSize = 1.15; // rem
  const textBox = document.getElementById("reading-text-box");
  const btnIncrease = document.getElementById("font-increase");
  const btnDecrease = document.getElementById("font-decrease");

  btnIncrease.addEventListener("click", () => {
    if (currentReaderSize < 1.7) {
      currentReaderSize += 0.1;
      textBox.style.setProperty("--reader-size", `${currentReaderSize}rem`);
    }
  });

  btnDecrease.addEventListener("click", () => {
    if (currentReaderSize > 0.9) {
      currentReaderSize -= 0.1;
      textBox.style.setProperty("--reader-size", `${currentReaderSize}rem`);
    }
  });

  // Reader Mode Theme Selector
  const swatches = container.querySelectorAll(".color-swatch");
  swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      swatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
      
      const scheme = swatch.getAttribute("data-scheme");
      if (scheme === "light") {
        textBox.style.setProperty("--reader-bg", "#FDFBF7");
        textBox.style.setProperty("--reader-text", "#2C2520");
      } else if (scheme === "sepia") {
        textBox.style.setProperty("--reader-bg", "#F4ECD8");
        textBox.style.setProperty("--reader-text", "#433422");
      } else if (scheme === "dark") {
        textBox.style.setProperty("--reader-bg", "#181E1A");
        textBox.style.setProperty("--reader-text", "#EAE5D9");
      }
    });
  });

  // Distraction-Free Toggle
  const focusBtn = document.getElementById("distraction-free-btn");
  focusBtn.addEventListener("click", () => {
    const isFocus = document.body.classList.toggle("distraction-free");
    if (isFocus) {
      focusBtn.innerHTML = '<i class="fa-solid fa-compress"></i> Unfocus';
    } else {
      focusBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Focus';
    }
  });

  // Bookmark Toggle
  const bookmarkBtn = document.getElementById("reader-bookmark-btn");
  const bookmarkText = document.getElementById("bookmark-text");
  bookmarkBtn.addEventListener("click", () => {
    const active = toggleBookmark(story.id);
    if (active) {
      bookmarkBtn.classList.add("bookmarked");
      bookmarkBtn.querySelector("i").className = "fa-solid fa-bookmark";
      bookmarkText.textContent = "Saved";
    } else {
      bookmarkBtn.classList.remove("bookmarked");
      bookmarkBtn.querySelector("i").className = "fa-regular fa-bookmark";
      bookmarkText.textContent = "Bookmark";
    }
  });

  // Share Actions
  const toast = document.getElementById("toast-notify");
  const triggerToast = () => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  };

  document.getElementById("share-copy").addEventListener("click", () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl)
      .then(() => triggerToast())
      .catch(err => console.error("Clipboard copy failed:", err));
  });

  document.getElementById("share-twitter").addEventListener("click", () => {
    const text = encodeURIComponent(`I'm reading "${story.title}" on TaleWeave! Join the reading circle:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  });

  document.getElementById("share-facebook").addEventListener("click", () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  });

  // Comments Rendering Engine
  const commentsListRoot = document.getElementById("comments-list-root");

  const renderComments = () => {
    const commentsList = getComments(story.id);
    
    if (commentsList.length === 0) {
      commentsListRoot.innerHTML = `
        <div class="no-comments">
          No comments in the parlor yet. Be the first to share your thoughts!
        </div>
      `;
      return;
    }

    commentsListRoot.innerHTML = commentsList.map(c => `
      <div class="comment-card">
        <div class="comment-header">
          <span class="comment-author">${c.author}</span>
          <span class="comment-date">${c.date}</span>
        </div>
        <p class="comment-body">${c.content}</p>
      </div>
    `).reverse().join(''); // Show latest comments first
  };

  // Comment Post Handler
  const commentForm = document.getElementById("comment-post-form");
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const authorVal = document.getElementById("comment-author-input").value;
    const contentVal = document.getElementById("comment-text-input").value;

    addComment(story.id, authorVal, contentVal);
    
    // Clear forms
    document.getElementById("comment-author-input").value = "";
    document.getElementById("comment-email-input").value = "";
    document.getElementById("comment-text-input").value = "";

    // Refresh comments list
    renderComments();
  });

  // Initialize comments
  renderComments();

  // Scroll to page top on load
  window.scrollTo(0, 0);
};
