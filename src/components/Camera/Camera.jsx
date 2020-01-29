import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

const Camera = props => {
  const { classes, bCameraHidden, stopBarcodeDetection } = props;
  return (
    <div
      id="camera-container"
      className={bCameraHidden ? classes.hidden : classes.cameraContainer}>
      <Button
        className={classes.closeCameraButton}
        onClick={stopBarcodeDetection}>
        <CancelIcon /> Close Camera
      </Button>
    </div>
  );
};

export default withStyles(styles)(Camera);
