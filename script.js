const addBookBtn = document.getElementById('add-book-btn');
const addBookModal = document.getElementById('add-book-modal');
const addBookForm = document.getElementById('add-book-form');
const overlay = document.getElementById('overlay');
const bookGrid = document.getElementById('book-grid');

let library = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

const isInLibrary = (newBook) => {
    return library.some(book => book.title === newBook.title);
}

const findInLibrary = (title) => {
    return library.find(book => book.title === title);
}

const toggleReadBook = (e) => {
    const title = e.target.parentNode.firstElementChild.textContent;
    const book = findInLibrary(title.slice(1, -1));
    book.isRead = !book.isRead;
    updateBookGrid();
}

const removeBook = (e) => {
    const title = e.target.parentNode.firstElementChild.textContent;
    const book = findInLibrary(title.slice(1, -1));
    const bookIndex = library.indexOf(book);
    library.splice(bookIndex, 1);
    updateBookGrid();
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} Pages`;
    
    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.style.backgroundColor = '#9fff9c';
    } else {
        readBtn.textContent = 'Not Read'
        readBtn.style.backgroundColor = '#ff9c9c';
    }

    removeBtn.textContent = 'Remove';

    readBtn.addEventListener('click', (e) => toggleReadBook(e));
    removeBtn.addEventListener('click', (e) => removeBook(e));

    bookCard.classList.add('book-card');

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);

    return bookCard;
}

const resetBookGrid = () => {
    bookGrid.innerHTML = '';
}

const updateBookGrid = () => {
    resetBookGrid();

    for (const book of library) {
        const bookCard = createBookCard(book);
        bookGrid.appendChild(bookCard);
    }
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('is-read').checked;
    return new Book(title, author, pages, isRead);
}

const addBookToLibrary = () => {
    const newBook = getBookFromInput();
    if (!isInLibrary(newBook)) {
        library.push(newBook);
        updateBookGrid();
    } else {
        alert('Book already in library.');
    }
}

const toggleAddBookModal = () => {
    addBookModal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    addBookForm.reset();
}

addBookBtn.addEventListener('click', () => toggleAddBookModal());
overlay.addEventListener('click', () => toggleAddBookModal());

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    e.target.reset();
    toggleAddBookModal();
});