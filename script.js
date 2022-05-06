const form = document.querySelector('form');

let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    console.log('Hello');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;
    const newBook = new Book(title, author, pages, read)
    library.push(newBook);
}

form.addEventListener('submit', () => addBookToLibrary());