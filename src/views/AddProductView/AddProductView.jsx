import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withBarcode } from '../../hoc';

import CloseIcon from '../../assets/icons/close-button.svg';
import style from './style';
import STEPS from './constants';
import { Camera, ScanProduct } from '../../components';
import { ChooseSearchMethod } from './components';

const objSteps = [
  STEPS.CHOOSE_SEARCH_METHOD,
  STEPS.SCAN_BARCODE,
  STEPS.PRODUCT_INFORMATION
];
class AddProductView extends Component {
  state = {
    step: objSteps[0]
  };

  isBackButtonDisabled = () => {
    const { step } = this.state;
    return step === STEPS.SCAN_BARCODE || STEPS.PRODUCT_INFORMATION;
  };

  handleBackButtonClick = () => {
    const { step } = this.state;
    this.setState(prevState => {});
  };

  handleNavigateToNextStep = () => {
    const { step } = this.state;
    const intIncrementedIndex = objSteps.indexOf(step) + 1;
    const intMaxIndex = objSteps.length - 1;

    this.setState({ step: objSteps[intIncrementedIndex] });
  };

  renderStep = () => {
    const { step } = this.state;
    const {
      bCameraHidden,
      stopBarcodeDetection,
      strProductCategories,
      strProductName,
      strProductPhoto,
      arrProductKeywords,
      initiateBarcodeDetection
    } = this.props;

    const intCurrentIndex = objSteps.indexOf(this.state.step);
    console.log(intCurrentIndex);
    switch (step) {
      case STEPS.CHOOSE_SEARCH_METHOD:
        return (
          <ChooseSearchMethod
            handleNavigateToNextStep={this.handleNavigateToNextStep}
            initiateBarcodeDetection={initiateBarcodeDetection}
          />
        );
      case STEPS.SCAN_BARCODE:
        return '';
      case STEPS.PRODUCT_INFORMATION:
        return (
          <ScanProduct
            strProductName={strProductName}
            strProductPhoto={strProductPhoto}
            strProductCategories={strProductCategories}
            arrProductKeywords={arrProductKeywords}
          />
        );
      default:
        return <h3>Error.Please try to reopen the modal.</h3>;
    }
  };
  render() {
    const {
      handleModalClose,
      classes,
      bCameraHidden,
      stopBarcodeDetection,
      initiateBarcodeDetection
    } = this.props;

    return (
      <div className={classes.scanModal}>
        <Grid container justify="center" alignItems="center" direction="column">
          <IconButton
            disabled
            onClick={this.isBackButtonDisabled()}
            className={classes.backButton}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleModalClose();
              !bCameraHidden && stopBarcodeDetection();
            }}
            color="primary"
            className={classes.closeButton}>
            <img alt={'close button'} src={CloseIcon}></img>
          </IconButton>
          {this.renderStep()}
          <Camera
            bCameraHidden={bCameraHidden}
            stopBarcodeDetection={stopBarcodeDetection}
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(withBarcode(AddProductView));
