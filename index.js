let addBtn = document.querySelector('#add-book-btn');
let info = document.querySelector('#book-info');
let titleInput = document.querySelector('#title-input');
let authorInput = document.querySelector('#author-input');
let pagesInput = document.querySelector('#pages-input');
let readInput = document.querySelectorAll('input[name="read-radio"]');
let library = [];
let currentBookNumber = 0;
let latestBook;


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    return book;
}

function addToLibrary(book) {
    library.push(book);
    latestBook = library[library.length - 1];
    createCard(latestBook);
}

function createCard(book) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    currentBookNumber++;
    cardDiv.setAttribute('id', `book${currentBookNumber}`);
    cardDiv.innerHTML = `<p id="title">${book.title}</p>
    <p id="author">by ${book.author}</p>
    <p id="pages">${book.pages} pages</p>
                      <p id="read">${book.read}</p>`
    document.querySelector('.card-container').appendChild(cardDiv);
}

function toggleForm() {
    if (info.classList.contains('active')) {
        info.classList.remove('active');
        info.classList.add('hidden');
        titleInput.value = authorInput.value = pagesInput.value = '';
        readInput.forEach(input => input.checked = false);
        return;
    }
    info.classList.remove('hidden');
    info.classList.add('active');
}

// function createBook(title, author, pages, read){
//     // let div1 = document.createElement('div');
//     // div1.classList.add('card');
//     // div1.innerHTML = `<p id="title">${title}</p>
//     // <p id="author">by ${author}</p>
//     // <p id="pages">${pages} pages</p>
//     //                   <p id="read">${read}</p>`
//     // document.querySelector('.card-container').appendChild(div1);
// }

// let submitButton = document.querySelector('#submit');

// submitButton.addEventListener('click', addBook);


addBtn.addEventListener('click', toggleForm);



// function addBook(event){
//     event.preventDefault();
//     let book1 = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
//     // if(book1.title == '' || book1.author == '' || book1.pages == '' || book1.read == ''){
//         //     return;
//             createBook(book1.title, book1.author, book1.pages, book1.read);
//             info.classList.remove('active');
//             info.classList.add('hidden');
//             titleInput.value = authorInput.value = pagesInput.value = readInput.value = '';

//         }


const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    //   if(titleInput.value == '' || authorInput.value == '' || pagesInput.value == '' || readInput.value == ''){
    //     return false;
    //   }
    let newBook = createBook(titleInput.value, authorInput.value, pagesInput.value, document.querySelector('input[name="read-radio"]:checked').value);
    addToLibrary(newBook);
    toggleForm();
    console.log('Form submission cancelled.');
});