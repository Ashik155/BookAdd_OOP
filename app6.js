class Book{
    constructor(author,title,isbn,category){
        this.author = author;
        this.title = title;
        this.category = category;
        this.isbn = isbn;
        }
}

class UIhandle{
    setListOnTable(book){
        const list = document.getElementById('book-list')
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.category}</td>
        <td><a href="#" class="delete" >Remove</a></td>`
    
        
    
        list.appendChild(row)
    }
    clearTask(){
    document.getElementById('title').value = ""
    document.getElementById('author').value =""
    document.getElementById('isbn').value = ""
    document.getElementById('category').value = ""
    }
    showAlert(msg,className){
        const cont = document.querySelector(".container")
    const form = document.querySelector("#book-form")
    const ele = document.createElement("div")
    ele.className = `alert ${className}`;
    ele.appendChild(document.createTextNode(msg))
    cont.insertBefore(ele,form)
    
    setTimeout(()=>{
        document.querySelector(".alert").remove();
    }, 3000)
        
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
            
             
        }
    }
}

class Store{
 static getBooks(){
     let books;
     if(localStorage.getItem('books') === null){
         books = [];
     }
     else{
         books = JSON.parse(localStorage.getItem('books'))
     }

     return books;
 }
 static addBookToStore(book){
     let books = Store.getBooks();
     books.push(book)
     localStorage.setItem("books", JSON.stringify(books) )

 }

 static displayBooks(){
     let books = Store.getBooks();
     books.forEach(function(book)
     {
         const ui = new UIhandle;
         ui.setListOnTable(book)
     }
     )
 }
 static delfromStore(category){
     const books = Store.getBooks();
     books.forEach(function(book,index){
        if(book.category === category){
            books.splice(index,1)
        }
     })
     localStorage.setItem("books", JSON.stringify(books))

 }


}

document.addEventListener("DOMContentLoaded", (e=>{
    Store.displayBooks()
    e.preventDefault()
}))
document.getElementById("book-form").addEventListener("submit", (e)=>{
    console.log("Somthing Happened ")
    const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value,
         cat = document.getElementById('category').value
         console.log()

    book = new Book(author,title,isbn,cat)
    
    ui = new UIhandle()


    if(author === '' || title === '' || isbn === '' || cat === ''){
        
        ui.showAlert("Hey Nigga, All fields are mandatory","error");
    }else{
        ui.setListOnTable(book)
        Store.addBookToStore(book)
        ui.showAlert("Yo Nigs, Added that Book Chill....", "success");
        ui.clearTask()
        
    
    }

   
  e.preventDefault()
})

document.getElementById("book-list").addEventListener("click", (e)=>{
    
     const ui = new UIhandle()
     ui.deleteBook(e.target)
     Store.delfromStore(e.target.parentElement.previousElementSibling.textContent)
     ui.showAlert("Deleted Successfully", "success")
    e.preventDefault()
})