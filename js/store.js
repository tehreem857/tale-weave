/* 
========================================================================
   TALEWEAVE MOCK DATASTORE (js/store.js)
   Deals with localStorage persistence for Stories, Drafts,
   Bookmarks, Comments, and Admin Session.
========================================================================
*/

const SEED_STORIES = [
  {
    id: "whispering-canopy",
    title: "The Whispering Canopy",
    genre: "Fantasy",
    author: "Elara Vance",
    cover: "assets/cover-whispers.jpg",
    excerpt: "Deep within the Heartwood, the trees don't just grow—they speak. When a young cartographer is sent to map the forbidden forest, she discovers that the trees are keeping a secret that could break the kingdom.",
    readingTime: 12,
    publishDate: "2026-05-15",
    popularity: 142,
    status: "published",
    chapters: [
      {
        title: "Chapter 1: The Ink-Stained Map",
        content: `Elara’s fingers traced the faded borders of the old kingdom maps. They were beautiful, certainly, decorated with sea serpents in the margins and sweeping gold script. But they were incomplete. In the center lay a vast blank space, marked only with the warning: *The Heartwood Canopy—Unchartable.*

"A cartographer’s job is to put boundaries on the unknown, Elara," her grandfather had told her when he handed her the brass compass. "But some places refuse to be measured."

Now, standing at the forest's edge, she understood what he meant. The trees were massive, their trunks like ancient stone pillars rising into a dense roof of silver leaves. But it wasn't their size that made her hesitate; it was the sound. It wasn't the rustle of wind. It was a low, melodic hum, like thousands of distant voices whispering in a language just out of reach.

She stepped across the mossy boundary.

Almost immediately, the light changed. The sun was filtered through the silver leaves, casting a shimmering green glow over the forest floor. Her compass needle spun lazily, pointing in no clear direction before settling due east—towards the deepest part of the wood.

"Fascinating," she muttered, pulling out her notebook to sketch the root structures. As she touched her pen to the paper, a soft voice breathed in her ear:

*“Write carefully, little crow. The ink remembers everything.”*

She spun around, but there was no one there. Only the great trees, their silver leaves shimmering in the quiet air.`
      },
      {
        title: "Chapter 2: The Firefly Glen",
        content: `By evening, the forest had grown dark, but it was far from pitch black. Soft bioluminescent moss covered the fallen logs, and glowing white mushrooms dotted the roots of the ancient trees.

Elara set up her small canvas tent in a small clearing. She lit a fire, the wood crackling softly as she boiled water for tea.

As the steam rose, a cluster of glowing fireflies began to gather around her. They didn't fly randomly; they floated in structured patterns, grouping themselves into geometric shapes that mirrored the constellations on her star charts.

"Are you... mapping the sky?" she asked aloud, feeling slightly foolish.

To her astonishment, the fireflies shifted. They drifted apart and reformed into the shape of a hand, pointing towards the eastern ridge.

She grabbed her lantern and followed. The fireflies led her through a narrow archway of intertwined birch trees into a hidden glen. In the center of the glen stood a pool of perfectly still water. Unlike normal water, it didn't reflect the trees around it; it reflected a vibrant city of stone arches and floating towers under a sky filled with three moons.

*“This is the memory of what was,”* the whispering leaves murmured in unison. *“And the shadow of what could return, if the canopy falls.”*

Elara walked to the water’s edge and looked down. She realized she wasn't mapping a wilderness. She was mapping a graveyard of a forgotten magic.`
      }
    ]
  },
  {
    id: "shadows-inkwell",
    title: "Shadows in the Inkwell",
    genre: "Mystery",
    author: "Elara Vance",
    cover: "assets/cover-shadows.jpg",
    excerpt: "Every story written by Arthur Pendelton came true. But when the celebrated mystery novelist is found dead at his desk, his final, unfinished manuscript points to a killer that shouldn't exist.",
    readingTime: 8,
    publishDate: "2026-06-20",
    popularity: 98,
    status: "published",
    chapters: [
      {
        title: "The Unfinished Line",
        content: `Inspector Joshua Finch liked things that were tidy. He liked his tea hot, his notebooks lined, and his cases wrapped up in neat manila folders. 

The study of Arthur Pendelton was the opposite of tidy. 

Books were piled high on every surface, pages of manuscript scattered like dry leaves across the Persian rug. In the center of the chaos sat the novelist, slumped over his heavy oak desk, a copper-nibbed pen still held loosely in his cold fingers.

"The doctor says it was heart failure, sir," Sergeant Miller said, tipping his hat. "At seventy-two, it's not a surprise."

"He was writing, Miller," Finch remarked, stepping closer. "A man doesn't usually die of a peaceful heart attack in the middle of a stroke."

Finch gently slid the paper from beneath Pendelton's hand. The ink was dry, but the final sentence was unfinished:

*Joshua Finch stepped into the study, unaware that the killer was standing right behind the—*

Finch felt a chill run down his spine. He looked at the paper, then at the body of the novelist. 

"Is something wrong, Inspector?" Miller asked.

"Look at the name in the sentence, Miller," Finch whispered. "He wrote *my* name. He wrote it before I was even assigned to this precinct."

Arthur Pendelton was famous for his eerie accuracy. Criminals he invented were captured in real life doing the exact same crimes. Now, he had written the inspector into his own death scene. Finch turned around slowly, looking at the heavy velvet curtains hanging in the corner of the dark room.

A floorboard creaked behind him.`
      }
    ]
  },
  {
    id: "stardust-tea-leaves",
    title: "Stardust and Tea Leaves",
    genre: "Sci-Fi",
    author: "Elara Vance",
    cover: "assets/cover-stardust.jpg",
    excerpt: "At the edge of the galaxy, the Voyager's Cafe serves hot beverages to weary spacefarers. But when an alien diplomat leaves behind a container of glowing blue tea, the barista accidentally brews a timeline collapse.",
    readingTime: 15,
    publishDate: "2026-06-10",
    popularity: 115,
    status: "published",
    chapters: [
      {
        title: "Chapter 1: The Nebula Brew",
        content: `Operating a cafe on a hollowed-out asteroid in the Orion Spur was mostly boring. Mae spent her days wiping down the steel counter, cleaning the espresso filters, and listening to the complaints of cargo haulers.

But Tuesdays were different. Tuesdays were when the diplomats from the inner rings stopped by.

"The usual, Ambassador?" Mae asked, smiling at the tall, slender alien with iridescent violet skin.

"Thank you, Mae. Make it extra hot. The transit through the gravity well was chilly today," the diplomat replied, placing a small metal canister on the bar.

While Mae brewed his chamomile-blend, the diplomat received an urgent comms ping. He stood up, spoke in hurried tones to his wrist-link, and rushed out, forgetting the canister on the counter.

Mae called after him, but he had already boarded the shuttle. She picked up the canister. It was warm to the touch, and when she opened it, a sweet fragrance of lavender and ozone filled the air. Inside were leaves that glowed with a faint blue stardust.

"Well," Mae thought, looking at the empty cafe. "He won't mind if I try one cup."

She heated a pot of mineral water and tossed a pinch of the glowing leaves in. The water turned a beautiful, swirling sapphire blue, reflecting tiny pinpricks of light like a miniature galaxy.

She took a sip.

The taste was incredible—mint, honey, and a strange tingling sensation. But as she swallowed, the sound of the cafe's refrigerator hum disappeared. The asteroid's artificial gravity flickered. She looked out the panoramic window.

The nebula outside wasn't moving anymore. The stars had stopped twinkling. Everything was perfectly, silent, frozen in time. Except for her.`
      },
      {
        title: "Chapter 2: The Voyager's Lounge",
        content: `Mae stepped out from behind the counter, her boots making no sound on the metal floor. She walked over to the windows.

Outside, a cargo ship was frozen mid-takeoff, the orange plasma thrust locked in a static, glowing flame. A spilled coffee cup belonging to a trucker sat suspended in the air, a globule of dark liquid floating an inch above the table.

"Okay," Mae said, her voice sounding flat and echo-free. "I broke time."

*“You didn't break it,”* a voice said from the back booth. *“You just stepped between the gears.”*

Mae gasped, spinning around. Sitting in the corner booth was a woman she had never seen before, wearing a flight jacket that looked like it had been patched with pieces of space suits from five different centuries. She was calmly sipping a cup of the same blue tea.

"Who are you?" Mae asked, holding her wiping cloth like a weapon.

"I'm Captain Julia," the woman said, gesturing for Mae to sit down. "I'm the cartographer of the lost hours. That tea you drank is made from chronon-infused leaves. It detaches your consciousness from the standard timeline. It's very expensive, and very dangerous if you drink it without a guide."

"A guide?" Mae walked over, looking at the floating coffee bubble. "How do I turn it off?"

"You don't," Julia said, smiling. "Not until we find the diplomat. Because he didn't forget that jar, Mae. He was running from the people who want to burn the timeline down."`
      }
    ]
  }
];

const LOCAL_STORAGE_KEYS = {
  STORIES: "taleweave-stories",
  BOOKMARKS: "taleweave-bookmarks",
  COMMENTS: "taleweave-comments",
  SESSION: "taleweave-session"
};

// Initialize Store
export const initStore = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.STORIES)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.STORIES, JSON.stringify(SEED_STORIES));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKMARKS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKMARKS, JSON.stringify([]));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.COMMENTS)) {
    // Seed initial comments
    const initialComments = {
      "whispering-canopy": [
        { id: 1, author: "Jane Reader", date: "2026-05-16 10:30", content: "Oh my goodness! The imagery of the trees whispering is so beautiful. I cannot wait to read what lies in the Firefly Glen!" },
        { id: 2, author: "Bookworm99", date: "2026-05-18 14:15", content: "I love the mystery setup. Will Elara map the whole forest? Please upload Chapter 3 soon!" }
      ],
      "shadows-inkwell": [
        { id: 3, author: "MysteryLover", date: "2026-06-21 09:00", content: "This gave me absolute goosebumps. What a thriller!" }
      ]
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMMENTS, JSON.stringify(initialComments));
  }
};

// --- Stories API ---
export const getStories = (includeDrafts = false) => {
  const stories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.STORIES)) || [];
  if (includeDrafts) return stories;
  return stories.filter(s => s.status === "published");
};

export const getStory = (id) => {
  const stories = getStories(true);
  return stories.find(s => s.id === id);
};

export const saveStory = (story) => {
  const stories = getStories(true);
  const index = stories.findIndex(s => s.id === story.id);
  
  if (index !== -1) {
    // Update existing story
    stories[index] = { ...stories[index], ...story };
  } else {
    // Create new story
    stories.push(story);
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEYS.STORIES, JSON.stringify(stories));
  return story;
};

export const deleteStory = (id) => {
  let stories = getStories(true);
  stories = stories.filter(s => s.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEYS.STORIES, JSON.stringify(stories));
  
  // Cleanup comments & bookmarks
  deleteComments(id);
  removeBookmark(id);
};

// --- Bookmarks API ---
export const getBookmarks = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKMARKS)) || [];
};

export const toggleBookmark = (storyId) => {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(storyId);
  let isBookmarked = false;
  
  if (index !== -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(storyId);
    isBookmarked = true;
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  return isBookmarked;
};

export const isBookmarked = (storyId) => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(storyId);
};

const removeBookmark = (storyId) => {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(storyId);
  if (index !== -1) {
    bookmarks.splice(index, 1);
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }
};

// --- Comments API ---
export const getComments = (storyId) => {
  const commentsDB = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COMMENTS)) || {};
  return commentsDB[storyId] || [];
};

export const addComment = (storyId, author, content) => {
  const commentsDB = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COMMENTS)) || {};
  if (!commentsDB[storyId]) {
    commentsDB[storyId] = [];
  }
  
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newComment = {
    id: Date.now(),
    author: author || "Anonymous Reader",
    date: formattedDate,
    content: content
  };
  
  commentsDB[storyId].push(newComment);
  localStorage.setItem(LOCAL_STORAGE_KEYS.COMMENTS, JSON.stringify(commentsDB));
  return newComment;
};

const deleteComments = (storyId) => {
  const commentsDB = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COMMENTS)) || {};
  if (commentsDB[storyId]) {
    delete commentsDB[storyId];
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMMENTS, JSON.stringify(commentsDB));
  }
};

// --- Admin Session Auth API ---
export const login = (username, password) => {
  // Simple credential verification
  if (username === "admin" && password === "writer123") {
    const user = { username: "admin", role: "Author" };
    localStorage.setItem(LOCAL_STORAGE_KEYS.SESSION, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: "Invalid scribe credentials." };
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.SESSION);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION)) || null;
};
