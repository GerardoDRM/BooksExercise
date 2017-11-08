import React, {Component, PropTypes} from 'react';
import BookPreview from './BookPreview'
import { Link } from 'react-router-dom'

class Library extends Component {

  static propTypes = {
    currentlyReadingBooks: PropTypes.array.isRequired,
    wantToReadBooks: PropTypes.array.isRequired,
    readBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {currentlyReadingBooks, wantToReadBooks, readBooks, updateBookShelf} = this.props
    return (
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
                 {currentlyReadingBooks.map((book) =>
                   <BookPreview key={book.id} book={book} updateBook={updateBookShelf}/>
                 )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {wantToReadBooks.map((book) =>
                  <BookPreview key={book.id} book={book} updateBook={updateBookShelf}/>
                )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {readBooks.map((book) =>
                  <BookPreview key={book.id} book={book} updateBook={updateBookShelf}/>
                )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>

    );
  }
}
module.exports = Library;
