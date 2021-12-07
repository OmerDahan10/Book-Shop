'use strict';

function init() {
    createBooks()
    setSort()
    renderBooks()
}

function renderBooks() {
    const books = getGbooks();
    var strHTML = books.map((book) => {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><button onclick ="onRead('${book.id}')">Read</button></td>
        <td><button onclick ="onUpdateBook('${book.id}')">Update</button></td>
        <td><button onclick ="removeBook('${book.id}')">Delete</button></td>
        </tr>`
    })

    document.querySelector('.book-list').innerHTML = strHTML.join('');
}


function removeBook(bookId) {
    deleteBookGbooks(bookId);
    renderBooks();
}

function onAddBook() {
    const name = document.querySelector('.new-book-name').value;
    const price = document.querySelector('.new-book-price').value;
    addBook(name, price);
    renderBooks();
    document.querySelector('.new-book-name').value = '';
    document.querySelector('.new-book-price').value = '';
}

function onUpdateBook(bookId) {
    var price = prompt('Enter new price:');
    updatebook(bookId, price);
    renderBooks();
}

function onRead(bookId) {
    var book = getBook(bookId);
    document.querySelector('.book-modal h3').innerText = book.name;
    document.querySelector('.book-modal h4 span').innerText = book.price;
    document.querySelector('.book-modal h5 span').innerText = book.rate;
    document.querySelector('.book-modal p').innerText = book.details;
    document.querySelector('.book-modal').classList.add('open');
}

function closeModal() {
    document.querySelector('.book-modal').classList.remove('open');
}

function onPlusRate() {
    var bookName = document.querySelector('.book-modal h3').innerText;
    var book = getBookByname(bookName);
    if (book.rate === 10) return;
    plusRate(book);
    document.querySelector('.book-modal h5 span').innerText++;
}

function onMinusRate() {
    var bookName = document.querySelector('.book-modal h3').innerText;
    var book = getBookByname(bookName);
    if (book.rate === 0) return;
    minusRate(book);
    document.querySelector('.book-modal h5 span').innerText--;
}

function onSortBy(sortBy) {
    setgSort(sortBy);
    renderBooks()
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}