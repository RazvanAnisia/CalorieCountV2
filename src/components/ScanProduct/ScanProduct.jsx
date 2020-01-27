import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

class ScanProduct extends Component {
  s;

  render() {
    const {
      strProductName,
      strProductPhoto,
      strProductCategories,
      arrProductKeywords
    } = this.props;
    return (
      <React.Fragment>
        <div className="product-container">
          {strProductName ? (
            <div>
              <p>
                Product name:
                <strong>{strProductName}</strong>
              </p>
              <button onClick={this.addProduct}>Add Product</button>
            </div>
          ) : null}
        </div>
        {strProductCategories ? <p>Category:{strProductCategories}</p> : null}
        <List aria-label="main mailbox folders">
          {arrProductKeywords
            ? arrProductKeywords.map((keyword, index) => (
                <ListItem key="index">
                  <ListItemText primary={keyword} />
                </ListItem>
              ))
            : null}
        </List>

        {strProductPhoto ? (
          <img src={strProductPhoto} alt={'strProductPhoto'} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default ScanProduct;
