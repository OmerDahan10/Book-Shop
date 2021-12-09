'use strict';
var gLang = 'es';

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
        <td>${book.price}</td>
        <td><button onclick ="onRead('${book.id}')" data-trans="read">Read</button></td>
        <td><button onclick ="onUpdateBook('${book.id}')" data-trans="update">Update</button></td>
        <td><button onclick ="removeBook('${book.id}')" data-trans="delete">Delete</button></td>
        </tr>`
    })

    document.querySelector('.book-list').innerHTML = strHTML.join('');
}


function removeBook(bookId) {
    deleteBookGbooks(bookId);
    renderBooks();
}

function onAddBook() {
    var name = document.querySelector('.new-book-name');
    var price = document.querySelector('.new-book-price');
    addBook(name.value, price.value);
    renderBooks();
    toggleNewModal()
    name.value = '';
    price.value = '';

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

var gTranslate = {
    title: { es: 'welcome to My Bookshop!', hb: 'ברוכים הבאים לחנות הספרים שלי' },
    newBook: { es: 'Create new book', hb: 'צור ספר חדש' },
    tActions: { es: 'Actions', hb: 'פעולות' },
    tPrice: { es: 'Price', hb: 'מחיר' },
    tTitle: { es: 'title', hb: 'כותרת' },
    tId: { es: 'Id', hb: 'מ.ס' },
    read: { es: 'Read', hb: 'קרא עוד' },
    update: { es: 'Update', hb: 'עדכן' },
    delete: { es: 'Delete', hb: 'מחק' },
    pPage: { es: '← Prev page', hb: 'עמוד קודם→' },
    nPage: { es: '← Next page', hb: '← עמוד הבא' },
    newName: { es: 'Enter book name:', hb: 'הכנס שם ספר' },
    newPrice: { es: 'Enter book price', hb: 'הכנס מחיר ספר' }
}

function changeLang(lang) {
    if (lang === 'hb') document.body.style.direction = 'rtl';
    else document.body.style.direction = 'ltr';

    translate(lang);
}

function translate(lang) {
    var trans = document.querySelectorAll('[data-trans]');
    trans.forEach(el => {
        if (el.nodeName === 'INPUT') el.placeholder = gTranslate[el.dataset.trans][lang];
        else el.innerText = gTranslate[el.dataset.trans][lang];

    })
}

function toggleNewModal(){
    var x = document.querySelector('.new-book-modal').classList.toggle('open');
}

