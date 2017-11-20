import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Library from './Library'
import SearchView from './SearchView'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
      books: [],
      retrievedBooks: []
    };
  }


  componentDidMount() {
    // Using BookAPI getAll to get all books from server
    BooksAPI.getAll().then((books) =>  {
      // Filter books shelf on 3 categories
      this.setState({
        currentlyReadingBooks: books.filter((b) => b.shelf === "currentlyReading"),
        wantToReadBooks: books.filter((b) => b.shelf === "wantToRead"),
        readBooks: books.filter((b) => b.shelf === "read"),
        books: books
      })
    })
  }

 /*
  @param book - Book Object
  @param shelf - String, shelf category
 */
  updateBookShelf(book, shelf) {
    // Use Books api to update shelf status
    BooksAPI.update(book, shelf).then((response) => {
      // Update state using books ids from response
      // Merge retrived and current books
      book.shelf = shelf;
      var complete_books = [...this.state.books.filter(e => e.id !== book.id), book]
      this.setState({
        currentlyReadingBooks: complete_books.filter((b) => response.currentlyReading.includes(b.id)),
        wantToReadBooks: complete_books.filter((b) => response.wantToRead.includes(b.id)),
        readBooks: complete_books.filter((b) => response.read.includes(b.id))
      })
    })
  }


  /*
   @param query - String Terms
   @param maxResults - Integer
  */
   searchBook(query) {
     // Use Books api to search books
     BooksAPI.search(query, 20).then((response) => {
        if(response && !("error" in response)) {
          var booksIds = this.state.books.map(b => b.id);
          //  Update list of retrieved books
          var books = response.map(b => {
            // Check if book already has an state
            var idx = booksIds.indexOf(b.id);
            if(idx > -1) {
              return this.state.books[idx];
            }
            return b;
          })
          this.setState({
            retrievedBooks: books
          })
        }
     })
   }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library
            {...this.state}
            updateBookShelf={(b,s) => this.updateBookShelf(b,s)}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchView
            retrievedBooks={this.state.retrievedBooks}
            updateBookShelf={(b,s) => {
              this.updateBookShelf(b,s)
              history.push('/')
            }}
            searchBook={(q) => this.searchBook(q)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
