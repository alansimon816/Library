const newBtn = document.getElementById('new-book-btn')
const form = document.getElementById('new-book-form')
const editForm = document.getElementById('edit-book-form')
const exitFormBtn = document.getElementById('exit-form-btn')
const exitEditFormBtn = document.getElementById('exit-edit-form-btn')
const exitSelectedBookBtn = document.getElementById('exit-selected-book-btn')
const editBtn = document.getElementById('edit-btn')
const deleteBtn = document.getElementById('delete-btn')
const confirmDeleteBtn = document.getElementById('delete-confirm')
const cancelDeleteBtn = document.getElementById('delete-cancel')
const deleteWarning = document.getElementById('delete-warning')
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
    editForm.addEventListener('submit', editBookInLibrary)
    exitFormBtn.addEventListener('click', exitNewBookForm)
    exitEditFormBtn.addEventListener('click', exitEditBookForm)
    exitSelectedBookBtn.addEventListener('click',exitSelectedBook)
    editBtn.addEventListener('click', showEditForm)
    deleteBtn.addEventListener('click', showDeleteWarning)
    cancelDeleteBtn.addEventListener('click', exitDeleteWarning)
    confirmDeleteBtn.addEventListener('click', removeBook)
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
    let i 

    console.log(e.target.nodeName + ' clicked.')

    if (e.target.nodeName === 'P' || e.target.nodeName === 'B') {
        e.stopPropagation()
    }

    if (e.target.nodeName === 'P') {
        i = e.target.parentNode.dataset.index
        p = e.target.cloneNode(true)
    } else if (e.target.nodeName === 'B') {
        i = e.target.parentNode.parentNode.dataset.index
        p = e.target.parentNode.cloneNode(true)
    } else {
        i = e.target.dataset.index
        p = e.target.querySelector('p').cloneNode(true)
    }

    console.log(p)
    selectedBook.dataset.index = i
    selectedBook.insertBefore(p, selectedBook.querySelector('#selected-book-main-btns'))
    selectedBookContainer.style.zIndex = 2
    selectedBook.style.visibility = 'visible'
}

// Shows a form for user to input book information.
function showForm() {
    form.style.visibility = 'visible'
}

// Shows a form for editing/deleting the book that was clicked on.
function showEditForm(e) {
    fillEditForm()
    let editFormContainer = document.getElementById('edit-form-container')
    editFormContainer.style.zIndex = 3
    editForm.style.visibility = 'visible'
    preventBackgroundPointerEvents()
}

// Fills the fields of the edit form with the information of the book
// being edited.
function fillEditForm() {
    let selectedBook = document.getElementById('selected-book')
    let titleInput = document.getElementById('title-edit-in')
    let authorInput = document.getElementById('author-edit-in')
    let genreInput = document.getElementById('genre-edit-in')
    let pagesInput = document.getElementById('pages-edit-in')
    let i = selectedBook.dataset.index

    titleInput.value = library[i].title
    authorInput.value = library[i].author
    genreInput.value = library[i].genre
    pagesInput.value = library[i].numPages   
}

// Displays a window containing a message that questions
// whether user is sure that they want to delete the book or not.
function showDeleteWarning() {
    let warningContainer = document.getElementById('delete-warning-container') 
    warningContainer.style.zIndex = 3
    deleteWarning.style.visibility = 'visible'
    preventBackgroundPointerEvents()
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
    allowPointerEvents()
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

// Exits the delete warning window.
function exitDeleteWarning() {
    let warningContainer = document.getElementById('delete-warning-container')
    warningContainer.style.zIndex = 0
    deleteWarning.style.visibility = 'hidden'
    allowPointerEvents()
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

// Updates the information associated with a book that exists in library array
function editBookInLibrary(e) {
    e.preventDefault();
    let selectedBook = document.getElementById('selected-book')
    let i = selectedBook.dataset.index
    let p = document.querySelector(`div[data-index='${i}'] > p`)

    library[i].title = editForm.querySelector('#title-edit-in').value
    library[i].author = editForm.querySelector('#author-edit-in').value
    library[i].genre = editForm.querySelector('#genre-edit-in').value
    library[i].numPages = editForm.querySelector('#pages-edit-in').value

    p.innerHTML = createBookDivText(library[i]) 

    exitEditBookForm()
    exitSelectedBook()
}

// Creates a div to be associated with a book.
// Adds a data-attribute for index of book in library to the DOM element.
function createBookDiv(book) {
    let div = document.createElement('DIV')
    div.dataset.index = library.indexOf(book)
    div.className = 'bookCard'
    let p = document.createElement('P')
    p.innerHTML = createBookDivText(book)
    // p.addEventListener('click', showSelected)
    div.appendChild(p)
    div.addEventListener('mouseenter', jump)
    div.addEventListener('mouseleave', land)
    div.addEventListener('click', showSelectedBook)
    document.getElementById('flex-box').appendChild(div)
}

// Creates a string of inner HTML for a child <p></p> with a
// parent div of class .bookCard. NOTE: this only
// creates a string, it does not update the actual innerHTML.
function createBookDivText(book) {
    let text = book.getInfo().replace(/\n/g, '<br /><br />')
    text = text.replace('Title', '<b>Title</b>')
    text = text.replace('Author', '<b>Author</b>')
    text = text.replace('Genre', '<b>Genre</b>')
    text = text.replace('# of Pages', '<b># of Pages</b>')
    return text
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
function removeBook(e) {
    let i  = document.getElementById('selected-book').dataset.index
    let div = document.querySelector(`div[data-index='${i}']`)

    div.remove();
    updateIndexAttributes(i)
    library.splice(i, 1)
    exitWindows() 
}

// Exits stacked windows.
function exitWindows() {
    exitDeleteWarning()
    exitSelectedBook() 
}

// Updates Data-index attributes of book divs. This function is meant to be 
// called after deletion of a book which may cause books in library array to
// have new indexes.
function updateIndexAttributes(idx) {
    let nodes = document.querySelectorAll('.bookCard')

    if (nodes.length === 0 || idx === library.length - 1) {
        return
    }

    for (let node of nodes) {
        if (node.dataset.index > idx) {
            node.dataset.index -= 1
        }
    }
}

// Prevents interaction with #outermost-div and #selected-book-container
// elements that are in the background while another element is in the
// foreground.
function preventBackgroundPointerEvents() {
    let selectedBookFlexBox = document.getElementById('selected-book-flex-box')
    let outermostDiv = document.getElementById('outermost-div')
    outermostDiv.style.pointerEvents = 'none'
    selectedBookFlexBox.style.pointerEvents = 'none'
}

// Allows for interaction with #outermost-div and #selected-book-container
// elements.
function allowPointerEvents() {
    let selectedBookFlexBox = document.getElementById('selected-book-flex-box')
    let outermostDiv = document.getElementById('outermost-div')
    outermostDiv.style.pointerEvents = 'auto'
    selectedBookFlexBox.style.pointerEvents = 'auto'
}

// Stores the information associated with a book (database).
function storeBookInfo() {

}

// Deletes stored information about the book (database).
function deleteBookInfo() {

}