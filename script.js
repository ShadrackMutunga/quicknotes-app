// Select elements
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');

// Notes array
let notes = [];

// Load from localStorage
function loadNotes() {
    const stored = localStorage.getItem('quicknotes');
    if (stored) {
        notes = JSON.parse(stored);
    }
}

// Save to localStorage
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// Update count message
function updateCount() {
    const count = notes.length;
    if (count === 0) {
        noteCount.textContent = 'You have no notes yet.';
    } else if (count === 1) {
        noteCount.textContent = 'You have 1 note.';
    } else {
        noteCount.textContent = `You have ${count} notes.`;
    }
}

// Render notes safely (no innerHTML for user text)
function render(notesToRender = notes) {
    notesList.innerHTML = ''; // Clear current list
    
    if (notesToRender.length === 0 && searchInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = 'No notes match your search.';
        notesList.appendChild(li);
        return;
    }

    notesToRender.forEach(note => {
        const li = document.createElement('li');
        li.className = `note-card category-${note.category}`;

        const textP = document.createElement('p');
        textP.className = 'note-text';
        textP.textContent = note.text; // Safe from XSS

        const metaDiv = document.createElement('div');
        metaDiv.className = 'note-meta';

        const categorySpan = document.createElement('span');
        categorySpan.textContent = `${note.category} | ${note.createdAt}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id));

        metaDiv.appendChild(categorySpan);
        metaDiv.appendChild(deleteBtn);

        li.appendChild(textP);
        li.appendChild(metaDiv);
        notesList.appendChild(li);
    });

    updateCount();
}

// Add note with validation
function addNote(e) {
    e.preventDefault();
    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Validation
    if (text === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }
    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }

    // Clear error
    errorMessage.textContent = '';

    // Create note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);
    saveNotes();
    render();
    
    // Clear input
    noteInput.value = '';
}

// Delete note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render();
}

// Search notes
function searchNotes(e) {
    const query = e.target.value.toLowerCase();
    const filtered = notes.filter(note => note.text.toLowerCase().includes(query));
    render(filtered);
}

// Event Listeners
noteForm.addEventListener('submit', addNote);
searchInput.addEventListener('input', searchNotes);

// Initialize
loadNotes();
render();
   // Task 5: localStorage and search feature complete