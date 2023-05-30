let addBtn = document.querySelector('#add-book-btn');
let info = document.querySelector('#book-info');
let titleInput = document.querySelector('#title-input');
let authorInput = document.querySelector('#author-input');
let pagesInput = document.querySelector('#pages-input');
let readInput = document.querySelectorAll('input[name="read-radio"]');
let readButton = document.querySelector('#read');
let library = [];
let currentBookNumber = 0;
let latestBook;


function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
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
    if (book.read == 'Read'){
        readStatus = 'read';
    } else {
        readStatus = 'not-read'
    }
    cardDiv.classList.add('card');
    // cardDiv.setAttribute('id', `book${currentBookNumber}`);
    cardDiv.dataset.index = currentBookNumber;
    cardDiv.innerHTML = `<p id="title">${book.title}</p>
                        <p id="author">by ${book.author}</p>
                        <p id="pages">${book.pages} pages</p>
                        <button id="read" class="${readStatus}">${book.read}</button>
                        <button class="delete">Delete</button>`
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

addBtn.addEventListener('click', toggleForm);


const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    //   if(titleInput.value == '' || authorInput.value == '' || pagesInput.value == '' || readInput.value == ''){
    //     return false;
    //   }
    let newBook = createBook(titleInput.value, authorInput.value, pagesInput.value, document.querySelector('input[name="read-radio"]:checked').value, currentBookNumber);
    addToLibrary(newBook);
    toggleForm();
    console.log('Form submission cancelled.');


    allDivs = document.querySelectorAll('.card');
    delButtons = document.querySelectorAll('.delete');
    delButtons.forEach(function (i) {
        i.addEventListener('click', delFunction);
      });
});

function delFunction(){
    const currentButton = this;
    if(allDivs){
        allDivs.forEach(function (i) {
            if(i.querySelector('.delete') == currentButton){
                const currentBook = library.find(element => {
                    element.index = i.dataset.index;
                });
                const index = library.indexOf(currentBook);
                library.splice(index, 1);
                i.remove();
                currentBookNumber = library.length;
                console.log('w');
            } else {
                console.log('not w');
            }
          });
    } else {
        return;
    }
}

let delButtons;
let allDivs;

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