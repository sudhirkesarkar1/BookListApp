// Book Class : Represents a Book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author=author;
        this.isbn=isbn;
    }
}


// UI Class : Handle UI Tasks
class UI{
    static displayBooks(){
        // const StoredBooks = [
        //     {
        //         title:'B1',
        //         author:'a1',
        //         isbn:'123'
        //     },
        //     {
        //         title:'B2',
        //         author:'a2',
        //         isbn:'456'
        //     }
        // ];

        // const books = StoredBooks;
        const books = Store.getBooks();

        books.forEach((book)=> UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
        `;

        list.appendChild(row);

    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.getElementById('container');
        const form = document.getElementById('book-form');
        container.insertBefore(div,form);

        //vanish in 3 sec
        setTimeout(()=>{document.querySelector('.alert').remove()}
        ,3000);
    }
}

// Store Class : Handles Storage
class Store{
    static getBooks(){
        let books =[];
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn ===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


// Event : Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit',(e)=>{
    //prevent actual submit
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title,author,isbn);
    console.log(book);

    //Add book to UI
    UI.addBookToList(book);

    //Add book to store
    Store.addBook(book);

    //show success message
    UI.showAlert('Book Added','success');

    //Clear Fields
    UI.clearFields();
})

//Event:  Remove a book
document.getElementById('book-list').addEventListener('click',(e)=>{
    //Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show delete alert
    UI.showAlert('Book deleted','success');
});