import React, {Component, PropTypes} from 'react';

class BookPreview extends Component {
  render() {
    const {children} = this.props;

    return (
      <div className="nav-bar" style={{
        "background": this.props.color
      }}>
        <div className="back">{parent}</div>
        <div className="links">{children}</div>
      </div>
    );
  }
}
module.exports = NavBar;
