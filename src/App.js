import React, { Component } from 'react';
import withBarcode from './hoc/withBarcode';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Camera, ScanProduct } from './components';

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
      strProductName
    } = this.props;

    const { addedProducts } = this.state;
    return (
      <div className="App">
        <p className={classes.headline}>Find your food products</p>
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
  }
};

App.propTypes = {
  bCameraHidden: PropTypes.bool
};

export default withStyles(styles)(withBarcode(App));
