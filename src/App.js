import React, { Component } from 'react';
import withBarcode from './hoc/withBarcode';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

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
      fetchFoodFactsData,
      bLoading,
      nstrError,
      arrFoodfacts,
      classes,
      initiateBarcodeDetection,
      stopBarcodeDetection,
      strProductCategories,
      arrProductKeywords,
      strProductPhoto,
      bCameraHidden,
      strProductName
    } = this.props;

    console.log(bCameraHidden);

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
        <Button onClick={fetchFoodFactsData} variant="contained">
          Food Facts
        </Button>

        <br></br>
        {bLoading ? 'Loading..' : null}
        {nstrError ? nstrError.message : null}
        {arrFoodfacts
          ? arrFoodfacts.map(product => <li>{product.title}</li>)
          : null}
        <div
          id="camera-container"
          className={bCameraHidden ? classes.hidden : classes.cameraContainer}
        />
        <div className="product-container">
          {strProductName ? (
            <div>
              <p>
                Product name:
                <strong>{strProductName}</strong>
              </p>
              <button onClick={this.addProduct}>Add Product</button>
            </div>
          ) : null}
          {strProductCategories ? <p>Category:{strProductCategories}</p> : null}
          <List aria-label="main mailbox folders">
            {arrProductKeywords
              ? arrProductKeywords.map((keyword, index) => (
                  <ListItem key="index">
                    <ListItemText primary={keyword} />
                  </ListItem>
                ))
              : null}
          </List>

          {strProductPhoto ? (
            <img src={strProductPhoto} alt={'strProductPhoto'} />
          ) : null}
        </div>
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
  hidden: {
    display: 'none'
  },
  cameraContainer: {
    width: 300,
    height: 400
  }
};

App.propTypes = {
  bCameraHidden: PropTypes.bool
};

export default withStyles(styles)(withBarcode(App));
