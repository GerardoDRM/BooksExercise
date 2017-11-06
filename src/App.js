import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookPreview from './BookPreview'

class BooksApp extends React.Component {

  construct() {
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    books: []
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {this.state.currentlyReadingBooks.map((book) =>
                       <BookPreview key={book.id} book={book} updateBook={(b,s) => this.updateBookShelf(b, s)}/>
                     )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.wantToReadBooks.map((book) =>
                      <BookPreview key={book.id} book={book} updateBook={(b,s) => this.updateBookShelf(b, s)}/>
                    )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.readBooks.map((book) =>
                      <BookPreview key={book.id} book={book} updateBook={(b,s) => this.updateBookShelf(b, s)}/>
                    )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
