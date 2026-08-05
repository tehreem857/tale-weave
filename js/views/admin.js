/* 
========================================================================
   TALEWEAVE ADMIN DASHBOARD (js/views/admin.js)
   Complete publishing workspace with Login auth, Story listing table,
   Base64 image upload, Draft/Publish toggling, and Chapter editor.
========================================================================
*/

import { 
  getStories, 
  getStory, 
  saveStory, 
  deleteStory, 
  login, 
  logout, 
  getCurrentUser, 
  getBookmarks 
} from "../store.js";

// Helper ornament separator
const getDivider = () => `
  <div class="ornament-divider">
    <div class="ornament-line"></div>
    <div class="ornament-symbol">✒️</div>
    <div class="ornament-line"></div>
  </div>
`;

export const AdminView = ({ params, container }) => {
  const currentUser = getCurrentUser();

  // --- Auth Gate ---
  if (!currentUser) {
    renderLogin(container);
    return;
  }

  const hash = window.location.hash;
  
  if (hash.includes("/admin/new")) {
    renderEditor(container, null); // Create mode
  } else if (hash.includes("/admin/edit/")) {
    const id = params.id;
    const story = getStory(id);
    if (!story) {
      container.innerHTML = `
        <div class="section-header" style="padding: 8rem 2rem;">
          <h2 class="section-title">Story Not Found</h2>
          <p class="section-subtitle">Cannot edit a non-existent chronicle.</p>
          <div style="margin-top: 2rem;"><a href="#/admin" class="btn btn-primary">Back to Dashboard</a></div>
        </div>
      `;
    } else {
      renderEditor(container, story); // Edit mode
    }
  } else {
    renderDashboard(container); // List mode
  }
};

// --- View 1: Login Form ---
function renderLogin(container) {
  container.innerHTML = `
    <div class="admin-container">
      <div class="admin-auth-card">
        <div class="admin-auth-icon">
          <i class="fa-solid fa-feather-pointed"></i>
        </div>
        <h2>Scribe's Login</h2>
        <p>Enter the inner chamber to write, draft, and publish your chronicles.</p>
        
        <div id="auth-error-msg" class="auth-error" style="display: none;"></div>

        <form id="admin-login-form">
          <div class="form-group">
            <label for="login-username" style="text-align: left;">Username</label>
            <input type="text" id="login-username" class="form-control" required placeholder="admin">
          </div>
          <div class="form-group">
            <label for="login-password" style="text-align: left;">Passphrase</label>
            <input type="password" id="login-password" class="form-control" required placeholder="••••••••">
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.5rem; text-align: left;">
            <i class="fa-solid fa-circle-info"></i> Default credentials: <code>admin</code> / <code>writer123</code>
          </p>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Enter Chamber</button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("admin-login-form");
  const errorMsg = document.getElementById("auth-error-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-username").value.trim();
    const pass = document.getElementById("login-password").value.trim();

    const res = login(user, pass);
    if (res.success) {
      window.location.hash = "#/admin"; // Reload view
    } else {
      errorMsg.style.display = "block";
      errorMsg.textContent = res.error;
    }
  });
}

// --- View 2: Dashboard Table & Metrics ---
function renderDashboard(container) {
  const stories = getStories(true); // Include drafts
  const bookmarks = getBookmarks();
  
  // Stats Calculations
  const totalStories = stories.length;
  const totalDrafts = stories.filter(s => s.status === "draft").length;
  const totalPublished = totalStories - totalDrafts;
  
  let totalChapters = 0;
  let totalWords = 0;
  stories.forEach(s => {
    totalChapters += s.chapters.length;
    s.chapters.forEach(ch => {
      totalWords += ch.content.split(/\s+/).filter(Boolean).length;
    });
  });

  container.innerHTML = `
    <div class="admin-container">
      
      <!-- Dashboard Header -->
      <div class="admin-dashboard-header">
        <div>
          <span class="section-subtitle">Chamber of Administration</span>
          <h2 class="editor-title" style="margin-top: 0.2rem;">Storyteller's Desk</h2>
        </div>
        <div class="admin-user-profile">
          <div class="admin-user-info">
            <span class="admin-user-name">Elara Vance</span>
            <span class="admin-logout-btn" id="admin-logout">Leave Chamber</span>
          </div>
          <div style="font-size: 2.2rem;">👩‍💻</div>
        </div>
      </div>

      <!-- Metrics stats -->
      <div class="admin-stats-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-book"></i></div>
          <div>
            <div class="stat-number">${totalStories}</div>
            <div class="stat-label">Total Stories</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-list-ol"></i></div>
          <div>
            <div class="stat-number">${totalChapters}</div>
            <div class="stat-label">Chapters</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-paragraph"></i></div>
          <div>
            <div class="stat-number">${Math.round(totalWords / 100) / 10}k</div>
            <div class="stat-label">Words Wrote</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-bookmark" style="color: var(--accent-gold);"></i></div>
          <div>
            <div class="stat-number">${bookmarks.length}</div>
            <div class="stat-label">Bookmarks</div>
          </div>
        </div>
      </div>

      <!-- Stories table list -->
      <div class="admin-table-section">
        <div class="table-header-row">
          <h3>Your Library</h3>
          <a href="#/admin/new" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-circle-plus"></i> Write New Story
          </a>
        </div>

        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Chapters</th>
                <th>Status</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="admin-table-body">
              ${stories.map(story => `
                <tr id="row-${story.id}">
                  <td>
                    <span class="admin-story-row-title">${story.title}</span>
                    <span class="admin-story-row-excerpt">${story.excerpt}</span>
                  </td>
                  <td><span class="genre-pill sm" style="font-size: 0.8rem; padding: 0.2rem 0.6rem;">${story.genre}</span></td>
                  <td>${story.chapters.length} ${story.chapters.length === 1 ? 'chapter' : 'chapters'}</td>
                  <td>
                    <span class="status-badge status-${story.status}">
                      ${story.status}
                    </span>
                  </td>
                  <td>${new Date(story.publishDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</td>
                  <td>
                    <div class="table-actions">
                      <a href="#/story/${story.id}" class="table-action-btn" title="View Story Reader" target="_blank">
                        <i class="fa-regular fa-eye"></i>
                      </a>
                      <a href="#/admin/edit/${story.id}" class="table-action-btn" title="Edit Story Info">
                        <i class="fa-regular fa-pen-to-square"></i>
                      </a>
                      <button class="table-action-btn btn-delete" data-id="${story.id}" title="Delete Story">
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
              ${totalStories === 0 ? `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted); font-style: italic;">
                    No stories found. Grab your quill and write your first tale!
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  // Bind Logout
  document.getElementById("admin-logout").addEventListener("click", () => {
    logout();
    window.location.hash = "#/admin"; // Reload auth screen
  });

  // Bind Story Deletion
  container.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const story = getStory(id);
      
      if (confirm(`Are you sure you want to permanently incinerate "${story.title}"? This cannot be undone.`)) {
        deleteStory(id);
        
        // Remove row from table
        const row = document.getElementById(`row-${id}`);
        if (row) row.remove();
        
        // Reload dashboard
        setTimeout(() => {
          renderDashboard(container);
        }, 100);
      }
    });
  });
}

// --- View 3: Creative Editor workspace ---
function renderEditor(container, existingStory) {
  const isEdit = !!existingStory;
  
  // Default values or placeholders
  let storyData = existingStory ? { ...existingStory } : {
    id: "",
    title: "",
    genre: "Fantasy",
    author: "Elara Vance",
    cover: "assets/cover-whispers.jpg",
    excerpt: "",
    readingTime: 5,
    publishDate: new Date().toISOString().split('T')[0],
    popularity: 0,
    status: "draft",
    chapters: [{ title: "Chapter 1: The Beginning", content: "Write chapter contents here..." }]
  };

  // Base64 cover state
  let currentCover = storyData.cover;

  container.innerHTML = `
    <div class="admin-container">
      
      <!-- Editor Header -->
      <div class="editor-header">
        <div>
          <span class="section-subtitle">${isEdit ? 'Re-writing Chapter Logs' : 'Weaving a New Narrative'}</span>
          <h2 class="editor-title">${isEdit ? `Edit: ${storyData.title}` : 'The Quill Room'}</h2>
        </div>
        <div style="display: flex; gap: 1rem;">
          <button id="editor-cancel" class="btn btn-secondary">Cancel</button>
          <button id="editor-save" class="btn btn-primary">
            <i class="fa-regular fa-floppy-disk"></i> Save Story
          </button>
        </div>
      </div>

      <!-- Editor Main Columns Grid -->
      <div class="editor-grid">
        
        <!-- Left Panel: Metadata form -->
        <div class="editor-main-panel">
          <div class="form-group">
            <label for="edit-title">Story Title</label>
            <input type="text" id="edit-title" class="form-control" value="${storyData.title}" placeholder="E.g., The Midnight Library" required>
          </div>

          <div class="form-group">
            <label for="edit-excerpt">Short Description (Excerpt)</label>
            <textarea id="edit-excerpt" class="form-control" placeholder="Write a brief, catchy summary of the narrative to attract readers..." required>${storyData.excerpt}</textarea>
          </div>

          <!-- Chapter list manager -->
          <div class="editor-chapters-section">
            <div class="chapters-section-header">
              <h4>Chronicle Chapters</h4>
              <button type="button" id="add-chapter-btn" class="btn btn-secondary btn-sm">
                <i class="fa-solid fa-plus"></i> Add Chapter
              </button>
            </div>

            <div id="editor-chapters-list" class="chapters-list">
              <!-- Load Chapters dynamically -->
            </div>
          </div>
        </div>

        <!-- Right Panel: Side Settings -->
        <div class="editor-sidebar-panel">
          
          <div class="form-group">
            <label for="edit-genre">Story Genre</label>
            <select id="edit-genre" class="form-control">
              <option value="Fantasy" ${storyData.genre === "Fantasy" ? "selected" : ""}>Fantasy</option>
              <option value="Mystery" ${storyData.genre === "Mystery" ? "selected" : ""}>Mystery</option>
              <option value="Sci-Fi" ${storyData.genre === "Sci-Fi" ? "selected" : ""}>Sci-Fi</option>
              <option value="Romance" ${storyData.genre === "Romance" ? "selected" : ""}>Cozy Romance</option>
              <option value="Drama" ${storyData.genre === "Drama" ? "selected" : ""}>Drama / Slice of Life</option>
            </select>
          </div>

          <div class="form-group">
            <label for="edit-reading-time">Est. Reading Time (minutes)</label>
            <input type="number" id="edit-reading-time" class="form-control" value="${storyData.readingTime}" min="1" required>
          </div>

          <div class="form-group">
            <label for="edit-status">Publish Status</label>
            <select id="edit-status" class="form-control">
              <option value="draft" ${storyData.status === "draft" ? "selected" : ""}>Draft (Hidden from Library)</option>
              <option value="published" ${storyData.status === "published" ? "selected" : ""}>Published (Visible to All)</option>
            </select>
          </div>

          <div class="form-group">
            <label>Cover Art Image</label>
            
            <div id="cover-preview-box" class="cover-upload-preview" style="${currentCover ? '' : 'display:none;'}">
              <img id="cover-preview-img" src="${currentCover}" alt="Cover preview">
              <button type="button" id="remove-cover-pic" class="remove-cover-btn" title="Remove image">✕</button>
            </div>

            <div id="cover-upload-box" class="cover-upload-area" style="${currentCover ? 'display:none;' : ''}">
              <div class="cover-upload-placeholder">
                <i class="fa-regular fa-image"></i>
                <p>Click or Drop files to upload cover art</p>
                <span style="font-size:0.75rem; color:var(--text-muted);">Format: PNG, JPG (Max 5MB)</span>
              </div>
              <input type="file" id="cover-file-input" accept="image/*" style="display: none;">
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  // --- Image Upload Reader ---
  const uploadBox = document.getElementById("cover-upload-box");
  const fileInput = document.getElementById("cover-file-input");
  const previewBox = document.getElementById("cover-preview-box");
  const previewImg = document.getElementById("cover-preview-img");
  const removeCoverBtn = document.getElementById("remove-cover-pic");

  uploadBox.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        currentCover = event.target.result; // Base64 encoding string
        previewImg.src = currentCover;
        uploadBox.style.display = "none";
        previewBox.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  removeCoverBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentCover = "";
    previewImg.src = "";
    previewBox.style.display = "none";
    uploadBox.style.display = "block";
    fileInput.value = ""; // clear file
  });

  // --- Chapter Rendering Engine ---
  const chaptersListRoot = document.getElementById("editor-chapters-list");
  let chaptersLocal = [...storyData.chapters];

  const renderChaptersList = () => {
    chaptersListRoot.innerHTML = chaptersLocal.map((ch, idx) => `
      <div class="chapter-accordion-card" id="ch-card-${idx}">
        <div class="chapter-accordion-header" data-index="${idx}">
          <h5>Chapter ${idx + 1}: <span id="ch-header-title-${idx}">${ch.title || 'Untitled Chapter'}</span></h5>
          <div class="chapter-accordion-actions">
            <button type="button" class="btn btn-secondary btn-sm btn-delete-chapter" data-index="${idx}" title="Delete Chapter">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <i class="fa-solid fa-chevron-down accordion-arrow"></i>
          </div>
        </div>
        
        <div class="chapter-accordion-content" id="ch-content-box-${idx}" style="display: ${idx === chaptersLocal.length - 1 ? 'block' : 'none'};">
          <div class="form-group">
            <label>Chapter Title</label>
            <input type="text" class="form-control ch-title-input" data-index="${idx}" value="${ch.title}" placeholder="E.g., Chapter 1: The Dark Forest">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label>Chapter Contents</label>
            <textarea class="form-control ch-content-textarea" data-index="${idx}" placeholder="Write chapter story lines here. Separate paragraphs with double enter (blank line)..." style="min-height: 250px;">${ch.content}</textarea>
          </div>
        </div>
      </div>
    `).join('');

    // Bind Accordion Toggles
    container.querySelectorAll(".chapter-accordion-header").forEach(header => {
      header.addEventListener("click", (e) => {
        if (e.target.closest(".btn-delete-chapter")) return;
        const idx = header.getAttribute("data-index");
        const contentBox = document.getElementById(`ch-content-box-${idx}`);
        const arrow = header.querySelector(".accordion-arrow");
        
        const isVisible = contentBox.style.display === "block";
        contentBox.style.display = isVisible ? "none" : "block";
        arrow.style.transform = isVisible ? "rotate(0)" : "rotate(180deg)";
      });
    });

    // Bind inputs to save contents directly into local arrays immediately
    container.querySelectorAll(".ch-title-input").forEach(input => {
      input.addEventListener("input", (e) => {
        const idx = parseInt(input.getAttribute("data-index"), 10);
        chaptersLocal[idx].title = e.target.value;
        document.getElementById(`ch-header-title-${idx}`).textContent = e.target.value || "Untitled Chapter";
      });
    });

    container.querySelectorAll(".ch-content-textarea").forEach(textarea => {
      textarea.addEventListener("input", (e) => {
        const idx = parseInt(textarea.getAttribute("data-index"), 10);
        chaptersLocal[idx].content = e.target.value;
      });
    });

    // Bind Chapter deletion
    container.querySelectorAll(".btn-delete-chapter").forEach(delBtn => {
      delBtn.addEventListener("click", () => {
        const idx = parseInt(delBtn.getAttribute("data-index"), 10);
        if (chaptersLocal.length <= 1) {
          alert("A story must have at least one chapter.");
          return;
        }
        if (confirm("Are you sure you want to rip out this chapter? This cannot be undone.")) {
          chaptersLocal.splice(idx, 1);
          renderChaptersList();
        }
      });
    });
  };

  // Add Chapter trigger
  document.getElementById("add-chapter-btn").addEventListener("click", () => {
    chaptersLocal.push({
      title: `Chapter ${chaptersLocal.length + 1}: New Chapter`,
      content: ""
    });
    renderChaptersList();
  });

  // Initial render of chapters
  renderChaptersList();

  // Cancel Handler
  document.getElementById("editor-cancel").addEventListener("click", () => {
    if (confirm("Discard all edits and return to dashboard?")) {
      window.location.hash = "#/admin";
    }
  });

  // Save Handler
  document.getElementById("editor-save").addEventListener("click", () => {
    const titleVal = document.getElementById("edit-title").value.trim();
    const excerptVal = document.getElementById("edit-excerpt").value.trim();
    const genreVal = document.getElementById("edit-genre").value;
    const readVal = parseInt(document.getElementById("edit-reading-time").value, 10) || 5;
    const statusVal = document.getElementById("edit-status").value;

    if (!titleVal || !excerptVal) {
      alert("Please fill out the story Title and Excerpt description.");
      return;
    }

    // Generate slug id for new stories
    const storyId = isEdit ? storyData.id : titleVal.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const finalStory = {
      ...storyData,
      id: storyId,
      title: titleVal,
      genre: genreVal,
      excerpt: excerptVal,
      readingTime: readVal,
      status: statusVal,
      cover: currentCover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400", // fallback
      chapters: chaptersLocal
    };

    saveStory(finalStory);
    alert("Chronicle successfully saved in archives!");
    window.location.hash = "#/admin";
  });
}
