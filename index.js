const addBtn = document.querySelector('#add-book-btn');
const info = document.querySelector('#book-info');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const readInput = document.querySelectorAll('input[name="read-radio"]');
const form = document.querySelector('form');
const clearBtn = document.querySelector('#clear-btn');
let library = [];
let currentBookNumber = 0;
let latestBook;
let delButtons;
let allDivs;
let readButtons;

addBtn.addEventListener('click', toggleForm);
clearBtn.addEventListener('click', delAll);

form.addEventListener('submit', event => {
    event.preventDefault();
    let newBook = createBook(titleInput.value, authorInput.value, pagesInput.value, document.querySelector('input[name="read-radio"]:checked').value, currentBookNumber);
    addToLibrary(newBook);
    toggleForm();

    allDivs = document.querySelectorAll('.card');
    delButtons = document.querySelectorAll('.delete');
    delButtons.forEach(function (button) {
        button.addEventListener('click', delFunction);
    });
    readButtons = document.querySelectorAll('#read');
    readButtons.forEach(function (i) {
        i.addEventListener('click', readFunction);
    });
    updateIndex();
});

class Book {
    constructor(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }

    toggleRead() {
        const thisBook = this;
        if (thisBook.read == 'Read') {
            thisBook.read = 'Not Read';
        } else {
            thisBook.read = 'Read';
        }
    }
}

function createBook(title, author, pages, read, index) {
    const book = new Book(title, author, pages, read, index);
    return book;
}

function addToLibrary(book) {
    library.push(book);
    latestBook = library[library.length - 1];
    createCard(latestBook);
}

function createCard(book) {
    let cardDiv = document.createElement('div');
    let readStatus;
    if (book.read == 'Read') {
        readStatus = 'read';
    } else {
        readStatus = 'not-read'
    }
    cardDiv.classList.add('card');
    cardDiv.dataset.index = currentBookNumber;
    cardDiv.innerHTML = `<p id="title">${book.title}</p>
                        <p id="author">by ${book.author}</p>
                        <p id="pages">${book.pages} pages</p>
                        <button id="read" class="${readStatus}">${book.read}</button>
                        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>`
    document.querySelector('.card-container').appendChild(cardDiv);
    currentBookNumber++;
}

function toggleForm() {
    if (!info.classList.contains('hidden')) {
        info.classList.add('hidden');
        titleInput.value = authorInput.value = pagesInput.value = '';
        readInput.forEach(input => input.checked = false);
        return;
    }
    info.classList.remove('hidden');
}


function delFunction() {
    const currentButton = this;
    if (allDivs) {
        allDivs.forEach(function (div) {
            if (div.querySelector('.delete') == currentButton) {
                const currentBook = library.filter(element => {
                    return element.index == div.dataset.index;
                });
                const index = library.indexOf(currentBook[0]);
                library.splice(index, 1);
                div.remove();
                if (!library[0]) {
                    currentBookNumber = 0;
                } else {
                    currentBookNumber = library[library.length - 1].index + 1;
                }
                updateIndex();
            } else {
                return;
            }
        });
    } else {
        return;
    }
}

function delAll() {
    if (library[0]) {
        library = [];
        allDivs.forEach(function (div) {
            div.remove();
        });
    } else {
        return;
    }
}

function readFunction() {
    const currentButton = this;
    if (allDivs) {
        allDivs.forEach(function (i) {
            if (i.querySelector('#read') == currentButton) {
                const currentBook = library.filter(element => {
                    return element.index == i.dataset.index;
                });
                const index = library.indexOf(currentBook[0]);
                library[index].toggleRead();
                if (i.querySelector('#read').classList.contains('read')) {
                    i.querySelector('#read').textContent = 'Not Read';
                    i.querySelector('#read').classList.remove('read');
                    i.querySelector('#read').classList.add('not-read');
                } else {
                    i.querySelector('#read').textContent = 'Read';
                    i.querySelector('#read').classList.add('read');
                    i.querySelector('#read').classList.remove('not-read');
                }
            } else {
                return;
            }
        });
    } else {
        return;
    }
}

function updateIndex() {
    library.forEach(function (book) {
        allDivs.forEach(function (div) {
            if (div.dataset.index == book.index) {
                const newIndex = library.indexOf(book);
                div.dataset.index = +newIndex;
                book.index = +div.dataset.index;
            } else {
                return;
            }
        });
    });
}