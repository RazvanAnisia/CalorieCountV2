import Quagga from 'quagga'; // ES6
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodFactsData } from '../actions/ActionFoodFacts';

const withBarcode = Wrapped => {
  class withBarcode extends Component {
    state = {
      strProductName: null,
      strProductPhoto: null,
      strProductCategories: null,
      arrProductKeywords: null,
      bCameraHidden: true
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
                  strProductName: data.product.product_name,
                  strProductPhoto: data.product.image_front_url,
                  strProductCategories: data.product.categories,
                  arrProductKeywords: data.product._keywords,
                  bCameraHidden: true
                });
                Quagga.stop();
              }
            });
        }
      });
      Quagga.start();
    };

    initiateBarcodeDetection = () => {
      const objConfig = {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#camera-container')
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
          strProductName: '',
          strProductPhoto: '',
          strProductCategories: '',
          arrProductKeywords: '',
          bCameraHidden: false
        });
      }
      Quagga.init(objConfig, this.handleInit);
    };

    stopBarcodeDetection = () => {
      Quagga.stop();
      this.setState({
        strProductCategories: '',
        arrProductKeywords: '',
        strProductName: '',
        strProductPhoto: '',
        bCameraHidden: true
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
  const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps,
      bLoading: state.foodfactsReducer.bLoading,
      nstrError: state.foodfactsReducer.nstrError,
      arrFoodfacts: state.foodfactsReducer.arrFoodfacts
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      fetchFoodFactsData: () => dispatch(fetchFoodFactsData())
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(withBarcode);
};

export default withBarcode;
