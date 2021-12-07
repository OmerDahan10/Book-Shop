'use strict';

var gBooks;
var gSortBy = 'Title';
const PAGE_SIZE = 5;
var gPageIdx = 0;

function createBook(name, price, imgUrl = null) {
    var book = {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0,
        details: makeLorem()
    }
    return book;
}

function createBooks() {
    if (!loadFromStorage('gBooks')) {
        gBooks = [createBook('Game of thrones', 20, 'img/got.jpg'),
            createBook('harry Potter', 15, 'img/harry-potter.jpg'),
            createBook('Jobs', 10, 'img/jobs.jpg')
        ];
        saveToStorage('gBooks', gBooks);

    } else {
        gBooks = loadFromStorage('gBooks');
    }
}

function getGbooks() {
    return gBooks.slice(gPageIdx * PAGE_SIZE, (gPageIdx * PAGE_SIZE) + PAGE_SIZE);
}

function deleteBookGbooks(bookId) {
    console.log(gBooks.length)
    var idx = gBooks.findIndex(book =>  book.id === bookId )
    gBooks.splice(idx, 1);
    saveToStorage('gBooks', gBooks);
}

function addBook(name, price) {
    gBooks.push(createBook(name, price));
    saveToStorage('gBooks', gBooks);
}

function updatebook(bookId, price) {
    var idx = gBooks.findIndex(book => { return book.id === bookId })
    gBooks[idx].price = price;
    saveToStorage('gBooks', gBooks);
}

function getBook(bookId) {
    return gBooks.find(book => { return book.id === bookId })

}

function getBookByname(bookName) {
    return gBooks.find(book => { return book.name === bookName })
}

function plusRate(bookObj) {
    var idx = gBooks.findIndex(book => { return book.id === bookObj.id })
    gBooks[idx].rate++;
    saveToStorage('gBooks', gBooks);
}

function minusRate(bookObj) {
    var idx = gBooks.findIndex(book => { return book.id === bookObj.id })
    gBooks[idx].rate--;
    saveToStorage('gBooks', gBooks);
}

function setgSort(SortBy) {
    gSortBy = SortBy.innerText;
    setSort(gSortBy);
}

function setSort(gSortBy = 'Title') {
    if (gSortBy === 'Title') {
        gBooks.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        })

    } else {
        gBooks.sort(function(a, b) {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
        })

    }
}

function nextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) return;
    gPageIdx++;
}

function prevPage() {
    if (gPageIdx === 0) return;
    gPageIdx--;
}