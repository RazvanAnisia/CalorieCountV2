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

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Quagga from "quagga"; // ES6

class App extends Component {
  state = {
    productName: "",
    productPhoto: "",
    productCategories: "",
    productKeywords: "",
    hideCamera: false,
    addedProducts: []
  };
  componentDidMount = () => {};
  initiateBarcodeDetection = () => {
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
      // safely access `navigator.mediaDevices.getUserMedia`
      this.setState({
        productName: "",
        productPhoto: "",
        productCategories: "",
        productKeywords: "",
        hideCamera: false
      });
      var that = this;
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector(".camera-container")
            // Or '#yourElement' (optional)
          },
          numOfWorkers: 1,
          decoder: {
            readers: [
              "ean_reader",
              "code_128_reader",
              "ean_8_reader",
              "code_39_reader",
              "code_39_vin_reader",
              "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              "i2of5_reader"
            ]
          },
          locate: true,
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          }
        },
        function(err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.onDetected(function callback(data) {
            data.codeResult
              ? console.log(data.codeResult.code)
              : console.log("nope");
            const productCode = data.codeResult.code;
            if (productCode) {
              fetch(
                `https://world.openfoodfacts.org/api/v0/product/${productCode}`
              )
                .then(res => res.json())
                .then(data => {
                  if (data.status_verbose === "product found") {
                    console.log(data.product);
                    that.setState({
                      productName: data.product.product_name,
                      productPhoto: data.product.image_front_url,
                      productCategories: data.product.categories,
                      productKeywords: data.product._keywords,
                      hideCamera: true
                    });
                    Quagga.stop();
                  }
                });
            }
          });
          /*
          What I could do here, is take the result, wait for 1-2 seconds, and keep checking if the result is the same,if not then update the value
           and use it to fetch frokm the food facts api
          If I have a result then I display it, if not, then keep trying the code from the barcode
          In case the code was moved and it can be read better now.
          Again, test, if no result keep repeating.If we do get one, then stop the quagga process and the camera live
          session
                */
          // Quagga.onProcessed(function callback(data){
          //   console.log(data)
          // })
          Quagga.start();
        }
      );
    }
  };
  stopBarcodeDetection = () => {
    Quagga.stop();
    this.setState({
      productCategories: "",
      productKeywords: "",
      productName: "",
      productPhoto: ""
    });
  };
  addProduct = () => {
    // console.log(this.state.addedProduct.length)
    // if (this.state.addedProducts.length !== 0) {
    //   const addedProducts = this.state.addedProducts.push(this.state.productName);
    //   console.log(addedProducts)
    // this.setState({
    //   addedProducts:addedProducts
    // })
    // }
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <p>Find your food products</p>
        <button onClick={this.initiateBarcodeDetection}>Start</button>
        <button onClick={this.stopBarcodeDetection}>Stop</button>
        <div
          className="camera-container"
          style={this.state.hideCamera ? { display: "none" } : null}
        />

        <div className="product-container">
          {this.state.productName ? (
            <div>
              <p>
                Product name:
                <strong>{this.state.productName}</strong>
              </p>
              <button onClick={this.addProduct}>Add Product</button>
            </div>
          ) : null}
          {this.state.productCategories ? (
            <p>Category:{this.state.productCategories}</p>
          ) : null}
          {this.state.productKeywords
            ? this.state.productKeywords.map((keyword, index) => (
                <li key="index">{keyword}</li>
              ))
            : null}
          {this.state.productPhoto ? (
            <img src={this.state.productPhoto} />
          ) : null}
        </div>
        <div className="summary">
          {console.log(this.state.addedProducts)}
          {this.state.addedProducts
            ? this.state.addedProducts.map((prod, index) => (
                <li key={index}>{prod}</li>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default App;
