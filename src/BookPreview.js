import React, {Component} from 'react';

class BookPreview extends Component {

  /**
   * @param Event Object
   * This function use the updateBook func prop
   * and send info to update shelf
   */
  checkShelfChange (e) {
    const {book, updateBook} = this.props;
    if(e.target.value !== "none")
      updateBook(book, e.target.value)
  }

  render() {
    const {book} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => this.checkShelfChange(e)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.map(a => a)}</div>
        </div>
      </li>
    );
  }
}
module.exports = BookPreview;
