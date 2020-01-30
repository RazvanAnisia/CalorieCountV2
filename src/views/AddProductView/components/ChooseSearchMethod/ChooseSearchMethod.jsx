import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import style from './style';
import BarcodeIcon from '../../../../assets/icons/barcode-scanner.svg';

const ChooseSearchMethod = props => {
  const { initiateBarcodeDetection, classes, handleNavigateToNextStep } = props;

  const navigateToBarcodeScan = () => {
    initiateBarcodeDetection();
    handleNavigateToNextStep();
  };
  return (
    <div>
      <Typography noWrap variant="h6" align="center">
        ADD NEW PRODUCT
      </Typography>

      <TextField
        id="filled-textarea"
        label="Enter product barcode"
        placeholder="Ex:4890008100309"
        className={classes.addProductInput}
      />
      <Typography>OR USE BARCODE SCANNER</Typography>
      <IconButton onClick={() => navigateToBarcodeScan()} color="primary">
        <img alt={'barcode scanner'} src={BarcodeIcon}></img>
      </IconButton>
    </div>
  );
};

export default withStyles(style)(ChooseSearchMethod);
