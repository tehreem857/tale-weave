/* 
========================================================================
   TALEWEAVE ABOUT VIEW (js/views/about.js)
   Renders the author profile, biography, favorite genres, 
   and a vertical milestones timeline.
========================================================================
*/

export const AboutView = ({ container }) => {
  const aboutHtml = `
    <section class="about-container">
      <div class="section-header">
        <span class="section-subtitle">Behind the Scribe’s Desk</span>
        <h2 class="section-title">About the Author</h2>
        <div class="ornament-divider">
          <div class="ornament-line"></div>
          <div class="ornament-symbol">✒️</div>
          <div class="ornament-line"></div>
        </div>
      </div>

      <div class="about-grid">
        <!-- Sidebar Portrait -->
        <div class="about-portrait-wrapper">
          <img src="assets/author.jpg" alt="Author Portrait" class="about-portrait" onerror="this.src='https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400'">
        </div>

        <!-- Biography Story -->
        <div class="about-story">
          <h3>Hello, I'm Elara Vance</h3>
          <p>
            I believe that every story begins with a quiet room, a fresh cup of jasmine tea, and the soft scratch of a quill on parchment. 
            For as long as I can remember, I have been gathering scraps of conversations, tracing maps of imaginary forests, and weaving narratives out of stardust.
          </p>
          <p>
            My writing journey began in the margins of my school notebooks. Over the years, those scribbled ideas grew into full-fledged worlds. 
            My goal is to create cozy, immersive reading experiences—the kinds of stories you want to curl up with on a rainy afternoon, wrapped in a warm blanket.
          </p>
          
          <h3>My Creative Sanctuary</h3>
          <p>
            When I am not writing, you can find me wandering through botanical gardens, searching for hidden gems in dusty antiquarian bookshops, or experimenting with tea blends. 
            I draw heavy inspiration from nature, ancient folklore, retro-futurism, and the small, magical moments hidden in everyday life.
          </p>

          <h3>My Favorite Genres</h3>
          <div class="about-genres-list">
            <span class="about-genre-item">Cozy Fantasy</span>
            <span class="about-genre-item">Gothic Mystery</span>
            <span class="about-genre-item">Soft Sci-Fi</span>
            <span class="about-genre-item">Slice of Life</span>
            <span class="about-genre-item">Fairy Tale Retellings</span>
          </div>
        </div>
      </div>

      <!-- Writing Journey Timeline -->
      <div class="timeline-section">
        <h3 class="timeline-title">The Writing Journey</h3>
        <div class="timeline">
          
          <div class="timeline-item timeline-left">
            <div class="timeline-content">
              <div class="timeline-year">2018</div>
              <h4 class="timeline-event-title">The First Spark</h4>
              <p>Wrote a collection of cozy fables and self-published a small booklet for family and friends. This cemented my love for the process of craft.</p>
            </div>
          </div>

          <div class="timeline-item timeline-right">
            <div class="timeline-content">
              <div class="timeline-year">2021</div>
              <h4 class="timeline-event-title">Leaving the Shore</h4>
              <p>Published my first gothic-mystery short story, *Shadows in the Inkwell*, in a prominent local fantasy anthology. Received my first letters from readers.</p>
            </div>
          </div>

          <div class="timeline-item timeline-left">
            <div class="timeline-content">
              <div class="timeline-year">2023</div>
              <h4 class="timeline-event-title">Mapping the Heartwood</h4>
              <p>Began drafting *The Whispering Canopy* during a cold autumn. Spent months walking in forests to capture the atmospheric soundscapes.</p>
            </div>
          </div>

          <div class="timeline-item timeline-right">
            <div class="timeline-content">
              <div class="timeline-year">2026</div>
              <h4 class="timeline-event-title">TaleWeave is Born</h4>
              <p>Launched this digital storytelling parlor. A cozy, distraction-free library to share my serialized chapters and interact directly with my readers.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  container.innerHTML = aboutHtml;
};
