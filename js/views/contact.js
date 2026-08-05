/* 
========================================================================
   TALEWEAVE CONTACT VIEW (js/views/contact.js)
   Renders the contact form and social media handles.
========================================================================
*/

export const ContactView = ({ container }) => {
  container.innerHTML = `
    <section class="contact-container">
      <div class="section-header">
        <span class="section-subtitle">Send a Letter to the Scribe</span>
        <h2 class="section-title">Get in Touch</h2>
        <div class="ornament-divider">
          <div class="ornament-line"></div>
          <div class="ornament-symbol">✉</div>
          <div class="ornament-line"></div>
        </div>
      </div>

      <div class="contact-grid">
        <!-- Contact Information -->
        <div class="contact-info">
          <div class="contact-intro">
            <p style="margin-bottom: 1rem; font-size: 1.05rem;">
              Have a question about a character? A theory about the forest whispers? Or perhaps a licensing inquiry? 
              I would love to hear from you. 
            </p>
            <p>
              Please drop a letter in my mailbox using the form, or reach out directly on social media. 
              I read every single message and reply as soon as the ink dries!
            </p>
          </div>

          <div class="contact-method">
            <div class="contact-method-icon">
              <i class="fa-regular fa-envelope"></i>
            </div>
            <div class="contact-method-text">
              <h5>Email Address</h5>
              <p>elara@taleweave.com</p>
            </div>
          </div>

          <div class="contact-method">
            <div class="contact-method-icon">
              <i class="fa-solid fa-map-location-dot"></i>
            </div>
            <div class="contact-method-text">
              <h5>The Scribe's Cottage</h5>
              <p>Orion Spur Astro-Station & Sherwood Birch-wood</p>
            </div>
          </div>

          <div class="contact-method">
            <div class="contact-method-icon">
              <i class="fa-regular fa-paper-plane"></i>
            </div>
            <div class="contact-method-text">
              <h5>Social Channels</h5>
              <p>@ElaraVanceWrites on major platforms</p>
            </div>
          </div>
        </div>

        <!-- Contact Form Wrapper -->
        <div class="contact-form-wrapper" id="form-container">
          <form id="contact-mail-form">
            <div class="form-group">
              <label for="contact-name">Your Full Name</label>
              <input type="text" id="contact-name" class="form-control" placeholder="E.g., Julian Vance" required>
            </div>
            
            <div class="form-group">
              <label for="contact-email">Email Address</label>
              <input type="email" id="contact-email" class="form-control" placeholder="E.g., julian@domain.com" required>
            </div>

            <div class="form-group">
              <label for="contact-subject">Message Subject</label>
              <input type="text" id="contact-subject" class="form-control" placeholder="E.g., Heartwood Theory" required>
            </div>

            <div class="form-group">
              <label for="contact-message">Your Message</label>
              <textarea id="contact-message" class="form-control" placeholder="Write your letter here..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Send Letter <i class="fa-regular fa-paper-plane" style="margin-left: 0.3rem;"></i>
            </button>
          </form>
        </div>

      </div>
    </section>
  `;

  // Submit Interceptor
  const form = document.getElementById("contact-mail-form");
  const formWrapper = document.getElementById("form-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameVal = document.getElementById("contact-name").value;

    // Simulate sending progress, then show success screen
    formWrapper.innerHTML = `
      <div class="initial-loader" style="padding: 4rem 0;">
        <div class="spinner"></div>
        <p>Sealing envelope with wax...</p>
      </div>
    `;

    setTimeout(() => {
      formWrapper.innerHTML = `
        <div class="contact-success-msg">
          <i class="fa-solid fa-envelope-open-text"></i>
          <h3>Letter Sent!</h3>
          <p>Thank you, <strong>${nameVal}</strong>. Your letter has been safely stored in the author's mailbox. Elara will read it shortly.</p>
          <button id="send-another-btn" class="btn btn-secondary btn-sm">Write Another Letter</button>
        </div>
      `;

      document.getElementById("send-another-btn").addEventListener("click", () => {
        ContactView({ container });
      });
    }, 1500);
  });
};
