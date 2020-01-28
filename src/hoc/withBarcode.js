import Quagga from 'quagga';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFoodFactsData } from '../actions/ActionFoodFacts';
import { withSnackbar } from 'notistack';

/**
 *
 * @param {Component} Wrapped Component that will be wrapped
 * @return {JSX} withBarcode
 */
const withBarcode = Wrapped => {
  class withBarcode extends Component {
    state = {
      strProductName: null,
      strProductPhoto: null,
      strProductCategories: null,
      arrProductKeywords: null,
      bCameraHidden: true
    };

    /**
     * @description Instantiate Quagga instance and live camera feed
     * @return {void}
     */
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
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === 'function'
      ) {
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

    /**
     * @description Callback for when QUAGGA is successfully initialised
     * @return {void}
     */
    handleInit = () => {
      const { enqueueSnackbar, fetchFoodFactsData } = this.props;
      enqueueSnackbar('Ready to scan');

      console.log(fetchFoodFactsData);

      Quagga.onDetected(data => {
        data.codeResult
          ? enqueueSnackbar('Found possible match')
          : enqueueSnackbar('Could not find match');
        const productCode = data.codeResult.code;
        if (productCode) {
          // fetchFoodFactsData();
          fetch(`https://world.openfoodfacts.org/api/v0/product/${productCode}`)
            .then(res => res.json())
            .then(data => {
              if (data.status_verbose === 'product found') {
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

    /**
     * @description Stops the quagga instance and hides the camera
     */
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
      objFoodfacts: state.foodfactsReducer.objFoodfacts
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      fetchFoodFactsData: () => dispatch(fetchFoodFactsData())
    };
  };
  return withSnackbar(
    connect(mapStateToProps, mapDispatchToProps)(withBarcode)
  );
};

export default withBarcode;
