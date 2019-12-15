/*
TO DO
PHASE:1
-After let's say 8-10 seconds, if we can't find anythig hide the camera, and stop the process, and prompt the user to insert the barcode manually if they want.
-Add a modal for when the camera starts, with some text saying Please tryo to get a clear image of the barcode
-Add box drawing around the barcode, and give the user some feedback after detecting it
-If we cannot find the product, then Prompt the user to add it in the Open food facts api
-Add the keywords as tags, for each product.

PHASE:2
- Show the products nutritional values /100g
- Add a Select product button, which opens a new view, or makes you scroll down
and you can add the quanity of the product.
-When you add the quanity, you cna see in a top-right/top left/view how many calories you had for today and how many you have eaten so far
The moment you press add entry btn, this changes.
-If you are over  the limit you have set for yourself, then  it will turn red.or maybe the background will turn red.
-Add a Summary for today view, so you can see what you have eaten, quanity for each, and your total calories.
-Add ability to delete entries, or edit them
PHASE:3
-Add authentication.
-Add backend profiles for each user, store the data in the db, in Mongo
-Create Rest architecture for the backend + CRUD, for adding new items, editing, etc
*/

import React, { Component } from 'react';
import './App.css';
// import Quagga from 'quagga'; // ES6
import ErrorBoundary from './ErrorBoundary';
import withBarcode from './hoc/withBarcode';

class App extends Component {
  state = {
    addedProducts: []
  };

  addProduct = () => {
    console.log('adding product');
    const { productName, productPhoto, productCategories } = this.props;
    this.setState(() => {
      return {
        addedProducts: [
          ...this.state.addedProducts,
          { productName, productPhoto, productCategories }
        ]
      };
    });
  };

  render() {
    return (
      <div className="App">
        <p>Find your food products</p>
        <button onClick={this.props.initiateBarcodeDetection}>Start</button>
        <button onClick={this.props.stopBarcodeDetection}>Stop</button>
        <div
          className="camera-container"
          style={this.props.hideCamera ? { display: 'none' } : null}
        />
        <ErrorBoundary>
          <div className="product-container">
            {this.props.productName ? (
              <div>
                <p>
                  Product name:
                  <strong>{this.props.productName}</strong>
                </p>
                <button onClick={this.addProduct}>Add Product</button>
              </div>
            ) : null}
            {this.props.productCategories ? (
              <p>Category:{this.props.productCategories}</p>
            ) : null}
            {this.props.productKeywords
              ? this.props.productKeywords.map((keyword, index) => (
                  <li key="index">{keyword}</li>
                ))
              : null}
            {this.props.productPhoto ? (
              <img src={this.props.productPhoto} alt={'productPhoto'} />
            ) : null}
          </div>
          <div className="summary">
            Added products:
            {this.state.addedProducts
              ? this.state.addedProducts.map((prod, index) => (
                  <>
                    <div>
                      <span key={index}>{prod.productName}</span>
                      <img
                        style={{ width: '30px' }}
                        src={prod.productPhoto}
                        alt={'product'}
                      />
                    </div>
                  </>
                ))
              : null}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default withBarcode(App);
