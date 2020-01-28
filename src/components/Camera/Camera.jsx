import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Camera = props => {
  const { classes, bCameraHidden } = props;
  return (
    <div
      id="camera-container"
      className={bCameraHidden ? classes.hidden : classes.cameraContainer}
    />
  );
};

export default withStyles(styles)(Camera);
