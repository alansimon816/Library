const newBtn = document.getElementById('new-book-btn')
const form = document.getElementById('new-book-form')
const editForm = document.getElementById('edit-book-form')
const exitFormBtn = document.getElementById('exit-form-btn')
const exitEditFormBtn = document.getElementById('exit-edit-form-btn')
const exitSelectedBookBtn = document.getElementById('exit-selected-book-btn')
const deleteBtn = document.getElementById('delete-btn')
const deleteWarning = document.getElementById('delete-warning-container')
const titleInput = document.getElementById('title-in')
const authorInput = document.getElementById('author-in')
const genreInput = document.getElementById('genre-in')
const pagesInput = document.getElementById('pages-in')

let library = []

setEventListeners()

// Sets event listeners for buttons and inputs.
function setEventListeners() {
    newBtn.addEventListener('click', showForm)
    form.addEventListener('submit', addBookToLibrary)
    exitFormBtn.addEventListener('click', exitNewBookForm)
    exitEditFormBtn.addEventListener('click', exitEditBookForm)
    exitSelectedBookBtn.addEventListener('click',exitSelectedBook)
    deleteBtn.addEventListener('click', showDeleteWarning)
    titleInput.addEventListener('keydown', exitFocus)
    authorInput.addEventListener('keydown', exitFocus)
    genreInput.addEventListener('keydown', exitFocus)
    pagesInput.addEventListener('keydown', exitFocus)
}

// Defines a Book object
function Book(title, author, genre, numPages) {
    this.title = title
    this.author = author
    this.genre = genre
    this.numPages = numPages
}

// Returns a string containing all of a books information.
Book.prototype.getInfo = function () {
    return `Title: ${this.title}\n` + 
            `Author: ${this.author}\n` +
            `Genre: ${this.genre}\n` +
            `# of Pages: ${this.numPages}\n`        
}

// Undos the focus on the focused input.
function exitFocus(e) {
    if (e.code === 'Enter') {
        let element = e.target
        element.blur()   
    }
}

// Shows the selected book in the middle of the screen.
function showSelectedBook(e) {
    let selectedBook = document.getElementById('selected-book')
    let selectedBookContainer = document.getElementById('selected-book-flex-box')
    let p
    console.log(e.target.nodeName + ' clicked.')

    if (e.target.nodeName === 'P' || e.target.nodeName === 'B') {
        e.stopPropagation()
    }

    if (e.target.nodeName === 'P') {
        p = e.target.cloneNode(true)
    } else if (e.target.nodeName === 'B') {
        p = e.target.parentNode.cloneNode(true)
    } else {
        p = e.target.querySelector('p').cloneNode(true)
    }

    console.log(p)

    selectedBook.insertBefore(p, selectedBook.querySelector('#selected-book-main-btns'))
    selectedBookContainer.style.zIndex = 2
    selectedBook.style.visibility = 'visible'
}

// Shows a form for user to input book information.
function showForm() {
    let form = document.getElementById('new-book-form')
    form.style.visibility = 'visible'
}

// Shows a form for editing/deleting the book that was clicked on.
function showEditForm(e) {
    editForm.style.visibility = 'visible'
}

// Displays a window containing a message that questions
// whether user is sure that they want to delete the book or not.
function showDeleteWarning() {
    deleteWarning.visibility = 'visible'
}

// Exits the new book form.
function exitNewBookForm() {
    form.reset()
    form.style.visibility = 'hidden'
}

// Exits the edit book form.
function exitEditBookForm() {
    editForm.reset()
    editForm.style.visibility = 'hidden'
}

// Exits the selected book.
function exitSelectedBook() {  
    let selectedBook = document.getElementById('selected-book')
    let selectedBookContainer = document.getElementById('selected-book-flex-box') 
    let p = selectedBook.querySelector('P') 
    selectedBookContainer.style.zIndex = 0
    selectedBook.style.visibility = 'hidden'
    selectedBook.removeChild(p)
}
// Creates a book object and adds a book to the library array 
function addBookToLibrary(e) {
    // prevents default browser behavior (page refresh)
    e.preventDefault();
    let title = document.getElementById('title-in').value
    let author = document.getElementById('author-in').value
    let genre = document.getElementById('genre-in').value
    let numPages = document.getElementById('pages-in').value
    let book = new Book(title, author, genre, numPages)
    library.push(book) 
    console.log(library[library.length - 1].getInfo())
    form.reset()
    form.style.visibility = 'hidden'
    createBookDiv(book)
}

// Creates a div to be associated with a book.
// Adds a data-attribute for index of book in library to the DOM element.
function createBookDiv(book) {
    let div = document.createElement('DIV')
    div.dataset.index = library.indexOf(book)
    div.className = 'bookCard'
    let p = document.createElement('P')
    let text = book.getInfo().replace(/\n/g, '<br /><br />')
    text = text.replace('Title', '<b>Title</b>')
    text = text.replace('Author', '<b>Author</b>')
    text = text.replace('Genre', '<b>Genre</b>')
    text = text.replace('# of Pages', '<b># of Pages</b>')
    p.innerHTML = text
    // p.addEventListener('click', showSelected)
    div.appendChild(p)
    div.addEventListener('mouseenter', jump)
    div.addEventListener('mouseleave', land)
    div.addEventListener('click', showSelectedBook)
    document.getElementById('flex-box').appendChild(div)
}

// Offsets an element vertically, thereby making it "jump."
function jump(e) {
    let element = e.target
    element.classList.add("jump")
}

// Undoes the operation performed in jump().
function land(e) {
    let element = e.target
    element.classList.remove("jump")
} 

// Removes the div associated with the book, updates data-index attributes,
// removes the book from library.
function removeBook(book) {
    let i = library.indexOf(book)
    let div = document.querySelector(`div[data-index=${i}]`)
    div.remove();
    updateIndexAttributes(i)
    library.splice(i, 1)
}

// Updates Data-index attributes of book divs. This function is meant to be 
// called after deletion of a book which may cause books in library array to
// have new indexes.
function updateIndexAttributes(idx) {
    let nodes = document.querySelectorAll('.bookCard')

    if (idx != library.length() - 1) {
        nodes = [...nodes].filter(node => node.dataset.index > idx)
    } else if (idx != 0){
        return
    }

    for (node in nodes) {
        node.dataset.index -= 1
    }
}

// Stores the information associated with a book.
function storeBookInfo() {

}

// Deletes stored information about the book.
function deleteBookInfo() {

}