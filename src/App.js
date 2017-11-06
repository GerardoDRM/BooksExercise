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
      books: []
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
      this.setState({
        currentlyReadingBooks: this.state.books.filter((b) => response.currentlyReading.includes(b.id)),
        wantToReadBooks: this.state.books.filter((b) => response.wantToRead.includes(b.id)),
        readBooks: this.state.books.filter((b) => response.read.includes(b.id))
      })
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
          <SearchView/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
