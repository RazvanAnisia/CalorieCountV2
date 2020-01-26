import Quagga from 'quagga'; // ES6
import React, { Component } from 'react';

const withBarcode = Wrapped => {
  class withBarcode extends Component {
    state = {
      productName: null,
      productPhoto: null,
      productCategories: null,
      productKeywords: null,
      hideCamera: true
    };

    handleInit = err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Initialization finished. Ready to scan');
      Quagga.onDetected(data => {
        data.codeResult
          ? console.log(data.codeResult.code)
          : console.log('nope');
        const productCode = data.codeResult.code;
        if (productCode) {
          fetch(`https://world.openfoodfacts.org/api/v0/product/${productCode}`)
            .then(res => res.json())
            .then(data => {
              if (data.status_verbose === 'product found') {
                console.log(data.product);
                this.setState({
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
    };

    initiateBarcodeDetection = () => {
      const objConfig = {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('.camera-container')
        },
        numOfWorkers: 1,
        decoder: {
          readers: [
            'ean_reader',
            'code_128_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader'
          ]
        },
        locate: true,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        }
      };
      if (
        // safely access `navigator.mediaDevices.getUserMedia`
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === 'function'
      ) {
        //reset the state
        this.setState({
          productName: '',
          productPhoto: '',
          productCategories: '',
          productKeywords: '',
          hideCamera: false
        });
      }
      Quagga.init(objConfig, this.handleInit);
    };

    stopBarcodeDetection = () => {
      Quagga.stop();
      this.setState({
        productCategories: '',
        productKeywords: '',
        productName: '',
        productPhoto: ''
      });
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          stopBarcodeDetection={this.stopBarcodeDetection}
          initiateBarcodeDetection={this.initiateBarcodeDetection}
        />
      );
    }
  }
  return withBarcode;
};

export default withBarcode;
