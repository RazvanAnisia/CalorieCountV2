import React, { Component } from 'react';
import { withBarcode, withModal } from './hoc';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import palette from './MaterialUi/Palette';
import AddProductView from './views/AddProductView';
import IconButton from '@material-ui/core/IconButton';
import BarcodeIcon from './assets/icons/barcode-scanner.svg';
import CloseIcon from './assets/icons/close-button.svg';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { ModalComponent } from './components/UI';
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
      <Grid container alignItems="center" direction="column">
        <p className={classes.headline}>Find your food products</p>
        <ModalComponent
          bIsModalOpened={bIsModalOpened}
          handleModalClose={handleModalClose}>
          <AddProductView
            bIsModalOpened={bIsModalOpened}
            handleModalClose={handleModalClose}></AddProductView>
        </ModalComponent>
        <Button onClick={handleModalOpen} color="primary">
          Add new entry
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
      </Grid>
    );
  }
}

const styles = {
  headline: {
    fontSize: 20
  }
};

App.propTypes = {
  bCameraHidden: PropTypes.bool
};

export default withStyles(styles)(withModal(App));
