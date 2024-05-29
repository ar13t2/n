document.addEventListener('DOMContentLoaded', () => {
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const noteCategory = document.getElementById('note-category');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');
    const scrollToTopButton = document.getElementById('scroll-to-top');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const renderNotes = () => {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = `note ${note.category}`;
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button onclick="editNote(${index})">Editar</button>
                <button onclick="deleteNote(${index})">Eliminar</button>
            `;
            notesList.appendChild(noteElement);
        });
    };

    const addNote = () => {
        const newNote = {
            title: noteTitle.value,
            content: noteContent.value,
            category: noteCategory.value
        };
        notes.push(newNote);
        saveNotes();
        renderNotes();
        noteTitle.value = '';
        noteContent.value = '';
        noteCategory.value = 'work';
    };

    addNoteButton.addEventListener('click', addNote);

    window.editNote = (index) => {
        const note = notes[index];
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteCategory.value = note.category;
        addNoteButton.textContent = 'Guardar Cambios';
        addNoteButton.onclick = () => {
            notes[index] = {
                title: noteTitle.value,
                content: noteContent.value,
                category: noteCategory.value
            };
            saveNotes();
            renderNotes();
            addNoteButton.textContent = 'Agregar Nota';
            addNoteButton.onclick = addNote;
            noteTitle.value = '';
            noteContent.value = '';
            noteCategory.value = 'work';
        };
    };

    window.deleteNote = (index) => {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    };

   scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mostrar el botón "Volver a la parte superior" cuando se desplaza hacia abajo
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    

    renderNotes();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(error => console.log('Service Worker registration failed:', error));
}
