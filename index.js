let addBtn = document.querySelector('#add-book-btn');

addBtn.addEventListener('click', function(){
    let info = document.querySelector('#book-info');
    if(info.classList.contains('active')){
        info.classList.remove('active');
        info.classList.add('hidden');
        return;
    }
    info.classList.remove('hidden');
    info.classList.add('active');
});

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let numberOfBooks = 0;

function createBook(title, author, pages, read){
    let div1 = document.createElement('div');
    div1.classList.add('card');
    div1.innerHTML = `<p id="title">${title}</p>
                      <p id="author">by ${author}</p>
                      <p id="pages">${pages} pages</p>
                      <p id="read">${read}</p>`
    document.querySelector('.card-container').appendChild(div1);
}


let submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', addBook);

function addBook(event){
event.preventDefault();
let book1 = new Book(document.querySelector('#title-input').value, document.querySelector('#author-input').value, document.querySelector('#pages-input').value, document.querySelector('#read-input').value);
createBook(book1.title, book1.author, book1.pages, book1.read);
}
