const newBtn = document.getElementById('new-book-btn')


let library = []

setEventListeners()

// Sets event listeners for buttons
function setEventListeners() {
    newBtn.addEventListener('click', showForm)
}

// Shows a form for user to input book information.
function showForm() {
    let form = document.getElementById('new-book-form')
    form.style.visibility = 'visible'
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
            `Number of Pages: ${this.numPages}\n`        
}

// Adds a book to the library array 
function addBooktoLibrary(book) {
    library.push(book)    
}

// Stores the information associated with a book.
function storeBookInfo() {

}

// Creates a div to be associated with a book.
// Adds a data-attribute for index of book in library to the DOM element.
function createBookDiv() {
    let div = document.createElement('DIV')
    document.getElementById('flex-box').appendChild(div)
}

// Removes a book from the library. 
function removeBookFromLibrary() {
    library.pop(book)
}

// Removes the div associated with the book.
function removeBookiv() {

}

// Deletes stored information about the book.
function deleteBookInfo() {

}