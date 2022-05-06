const addBookButton = document.getElementById('add-book');
const readBookButton = document.getElementById('read-button');
const removeBookButton = document.getElementById('remove-button');
const bookCardsContainer = document.getElementById('book-cards-container');
const formModal = document.getElementById('form-modal');
const form = document.querySelector('form');
const overlay = document.getElementById('overlay');

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

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const isRead = document.createElement('p');

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} Pages`;
    isRead.textContent = book.isRead ? 'Read' : 'Not Read';

    bookCard.classList.add('book-card');

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(isRead);

    return bookCard;
}

const updateBookCardContainer = () => {
    bookCardsContainer.innerHTML = '';

    for (const book of library) {
        const bookCard = createBookCard(book);
        bookCardsContainer.appendChild(bookCard);
    }
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    return new Book(title, author, pages, isRead);
}

const addBookToLibrary = () => {
    const newBook = getBookFromInput();
    if (!isInLibrary(newBook)) {
        library.push(newBook);
        updateBookCardContainer();
    }
}

const toggleFormModal = () => {
    formModal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

readBookButton.addEventListener('click', () => {
    readBookButton.classList.toggle('read');
    readBookButton.classList.toggle('not-read');
});

removeBookButton.addEventListener('click', (e) => {
});

addBookButton.addEventListener('click', () => toggleFormModal());
overlay.addEventListener('click', () => toggleFormModal());

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    e.target.reset();
    toggleFormModal();
});