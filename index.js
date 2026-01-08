const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const {initializeDatabase} = require("./db/db.connect")

const Book = require("./models/book.models")

initializeDatabase()


// for Q1 and Q2 Create an API with route "/books" to create a new book data in the books Database.
async function createBook(newBook){
    try{
        const book = new Book(newBook)
        const saveBook = await book.save()
        return saveBook
    } catch(error){
        throw error 
    }
    
}

app.post("/books",async(req,res)=>{
    try{
        const savedBook = await createBook(req.body)
        res.status(201).json({message: "Book added successfully." , book: savedBook})
    } catch(error){
        res.status(500).json({error: "Failed to add book"})
    }
})


//Q3 Create an API to get all the books in the database as response. 

async function readAllBooks(){
    try{
  const allBooks = await Book.find()

  return allBooks
    } catch(error){

        console.log(error)

    }
}

app.get("/books",async(req,res) => {
    try{
        const books = await readAllBooks()
        if(books.length != 0){
            res.json(books)
        } else {
            res.status(404).json({ error: "No books found."})
        }
    }catch(error){
res.status(500).json({error: "Failed to fetch books"})
    }
})




// Q4 Create an API to get a book's detail by its title.

async function readBookByTitle(bookTitle){

    try{

        const book = await Book.findOne({title:bookTitle})
        return movie

    } catch(error){        

        throw error

    }

}


app.get("/books/:title", async (req,res) => {
    try{

        const book = await readBookByTitle(req.params.title)
        if(book){
            res.json(book)
        } else {
            res.status(404).json({error: "Book not found"})
        }

    } catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
} )






// Q5 Create an API to get details of all the books by an author. 

async function readBooksByAuthor(authorName){
    try{
const booksByAuthor = await Book.find({author:authorName})

return booksByAuthor

    } catch(error){
        console.log(error)
    }
}


app.get("/books/author/:authorName" , async(req,res) => {
    try{

        const books = await readBooksByAuthor(req.params.authorName)

        if(books.length != 0 ){

            res.json(books)
        } else{ 
            res.status(404).json({error: "No books found."})
        }

    } catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})



// Q6 Create an API to get all the books which are of "Business" genre.

async function readBooksByGenre(genreName){
    try{
const booksByGenre = await Book.find({genre:genreName})

return booksByGenre

    } catch(error){
        console.log(error)
    }
}

app.get("/books/genres/:genreName" , async(req,res) => {
    try{

        const books = await readBooksByGenre(req.params.genreName)
        if(books.length != 0){
            res.json(books)
        } else {
             res.status(404).json({error: "No books found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})


// Q7 Create an API to get all the books which was released in the year 2012.

async function readBooksByYear(pubYear){
    try{
const booksByYear = await Book.find({publishedYear:pubYear})

return booksByYear

    } catch(error){
        console.log(error)
    }
}

app.get("/books/year/:pubYear" , async(req,res) => {
    try{

        const books = await readBooksByYear(req.params.pubYear)
        if(books.length != 0){
            res.json(books)
        } else {
             res.status(404).json({error: "No books found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})


// Q8 Create an API to update a book's rating with the help of its id.

async function updateBook(bookId, dataToUpdate) {
    try{

        const updatedBook = await Book.findByIdAndUpdate(bookId,dataToUpdate,{new:true,})
        return updatedBook

    } catch(error){
        console.log("Error in updating Book rating" , error)
    }
}


app.post("/books/:bookId" , async(req,res)=>{
    try{

        const updatedBook = await updateBook(req.params.bookId, req.body)

        if(updatedBook){
            res.status(200).json({message: "Book updated successully.", updatedBook:updatedBook})
        } else {
            res.status(404).json({error: "Book not found"})
        }

    } catch(error){
        res.status(500).json({error: "failed to update book."})
    }
})


// Q9 Create an API to update a book's rating with the help of its title. 

async function updateBookByTitle(bookTitle, dataToUpdate) {
    try{

        const updatedBook = await Book.findOneAndUpdate({ title: bookTitle },dataToUpdate,{new:true,})
        return updatedBook

    } catch(error){
        console.log("Error in updating Book rating" , error)
    }
}


app.post("/books/title/:bookTitle" , async(req,res)=>{
    try{

        const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body)

        if(updatedBook){
            res.status(200).json({message: "Book updated successully.", updatedBook:updatedBook})
        } else {
            res.status(404).json({error: "Book not found"})
        }

    } catch(error){
        res.status(500).json({error: "failed to update book."})
    }
})


//Q10 Create an API to delete a book with the help of a book id,

async function deleteBook(bookId){
    try{

        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook

    } catch (error){
        console.log(error)
    }
}

app.delete("/books/:bookId" , async(req,res) => {
    try{ 

        const deletedBook = await deleteBook(req.params.bookId)
        if(deletedBook){
            res.status(200).json({message: "Book deleted successfully."})
        }       

    } catch(error){
        res.status(500).json({error: "Failed to delete book."})
    }
} )



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});