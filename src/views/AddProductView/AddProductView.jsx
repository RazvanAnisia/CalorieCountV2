import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { withBarcode, withModal } from '../../hoc';
import { Camera, ScanProduct } from '../../components';
import BarcodeIcon from '../../assets/icons/barcode-scanner.svg';
import CloseIcon from '../../assets/icons/close-button.svg';
import style from './style';

class AddProductView extends Component {
  //steps = [Add New Product, Scan Barcode, See Product Details && add quantity]
  state = {};
  render() {
    const {
      handleModalClose,
      classes,
      bCameraHidden,
      stopBarcodeDetection,
      initiateBarcodeDetection,
      strProductCategories,
      strProductName,
      strProductPhoto,
      arrProductKeywords
    } = this.props;
    console.log(handleModalClose);
    return (
      <div className={classes.scanModal}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Typography noWrap variant="h6" align="center">
            ADD NEW PRODUCT
          </Typography>
          <Camera
            bCameraHidden={bCameraHidden}
            stopBarcodeDetection={stopBarcodeDetection}
          />
          <TextField
            id="filled-textarea"
            label="Enter product barcode"
            placeholder="Ex:4890008100309"
            className={classes.addProductInput}
          />
          <Typography>OR USE BARCODE SCANNER</Typography>
          <IconButton onClick={initiateBarcodeDetection} color="primary">
            <img alt={'barcode scanner'} src={BarcodeIcon}></img>
          </IconButton>
          <ScanProduct
            strProductName={strProductName}
            strProductPhoto={strProductPhoto}
            strProductCategories={strProductCategories}
            arrProductKeywords={arrProductKeywords}
          />
          <IconButton
            onClick={() => {
              handleModalClose();
              !bCameraHidden && stopBarcodeDetection();
            }}
            color="primary"
            className={classes.closeButton}>
            <img alt={'close button'} src={CloseIcon}></img>
          </IconButton>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(withBarcode(AddProductView));
