import React, { Component } from 'react';
import { withBarcode, withModal } from './hoc';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Camera, ScanProduct } from './components';
import { ModalComponent } from './components/UI';
import palette from './MaterialUi/Palette';

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
            <Button onClick={initiateBarcodeDetection} color="primary">
              Start
            </Button>
            <Button onClick={stopBarcodeDetection} color="secondary">
              Stop
            </Button>
            <Camera bCameraHidden={bCameraHidden} />
            <ScanProduct
              strProductName={strProductName}
              strProductPhoto={strProductPhoto}
              strProductCategories={strProductCategories}
              arrProductKeywords={arrProductKeywords}
            />
          </div>
        </ModalComponent>
        <Button onClick={handleModalOpen} color="secondary">
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
    height: '100%'
  }
};

App.propTypes = {
  bCameraHidden: PropTypes.bool
};

export default withStyles(styles)(withModal(withBarcode(App)));
