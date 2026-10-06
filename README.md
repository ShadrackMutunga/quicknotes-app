   # QuickNotes

   QuickNotes is a simple, fast, and clutter-free web-based note-taking application. It allows users to quickly jot down thoughts, categorize them, and search through them effortlessly. All notes are saved locally in the browser, ensuring your data persists across page refreshes without needing a backend server.

   ## Features
   - Add notes with a specific category (Personal, Work, Study)
   - Real-time search filtering for your notes
   - Input validation to prevent empty or overly long notes
   - Persistent storage using `localStorage`
   - Responsive design that works on both desktop and mobile devices
   - Distinct visual styling (colored borders) for each note category

   ## How to Run Locally
   1. Clone this repository to your local machine: `git clone https://github.com/your-username/quicknotes-app.git`
   2. Navigate into the project folder: `cd quicknotes-app`
   3. Open `index.html` in your web browser, or use a local server extension like VS Code's "Live Server" to view the app.

   ## What I Learned
   1. How to manipulate the DOM safely using `createElement` and `textContent` instead of `innerHTML` to prevent XSS vulnerabilities.
   2. How to use `localStorage` with `JSON.stringify` and `JSON.parse` to persist user data across browser sessions.
   3. How to implement responsive design using CSS Flexbox and media queries to ensure a good user experience on all screen sizes.