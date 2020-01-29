import React, { Component } from 'react';
import { withBarcode, withModal } from './hoc';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Camera, ScanProduct } from './components';
import { ModalComponent } from './components/UI';
import palette from './MaterialUi/Palette';
import IconButton from '@material-ui/core/IconButton';
import BarcodeIcon from './assets/icons/barcode-scanner.svg';
import CloseIcon from './assets/icons/close-button.svg';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

class App extends Component {
  state = {
    addedProducts: []
  };

  addProduct = () => {
    const {
      strProductName,
      strProductPhoto,
      strProductCategories
    } = this.props;
    this.setState(() => {
      return {
        addedProducts: [
          ...this.state.addedProducts,
          { strProductName, strProductPhoto, strProductCategories }
        ]
      };
    });
  };

  render() {
    const {
      bLoading,
      nstrError,
      objFoodfacts,
      classes,
      initiateBarcodeDetection,
      stopBarcodeDetection,
      strProductCategories,
      arrProductKeywords,
      strProductPhoto,
      bCameraHidden,
      strProductName,
      bIsModalOpened,
      handleModalClose,
      handleModalOpen
    } = this.props;

    const { addedProducts } = this.state;
    return (
      <div className="App">
        <p className={classes.headline}>Find your food products</p>
        <ModalComponent
          bIsModalOpened={bIsModalOpened}
          handleModalClose={handleModalClose}>
          <div className={classes.scanModal}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column">
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
                disableUnderline={true}
              />
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
                  stopBarcodeDetection();
                }}
                color="primary"
                className={classes.closeButton}>
                <img alt={'close button'} src={CloseIcon}></img>
              </IconButton>
            </Grid>
          </div>
        </ModalComponent>
        <Button onClick={handleModalOpen} color="primary">
          Open Modal
        </Button>
        <div className="summary">
          Added products:
          {addedProducts
            ? addedProducts.map((prod, index) => (
                <>
                  <div>
                    <span key={index}>{prod.strProductName}</span>
                    <img
                      style={{ width: '30px' }}
                      src={prod.strProductPhoto}
                      alt={'product'}
                    />
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const styles = {
  headline: {
    fontSize: 20
  },
  scanModal: {
    background: palette.green,
    height: '100%',
    display: 'flex'
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20
  }
};

App.propTypes = {
  bCameraHidden: PropTypes.bool
};

export default withStyles(styles)(withModal(withBarcode(App)));
