import React, { Component } from 'react';
import withBarcode from './hoc/withBarcode';
import { connect } from 'react-redux';
import { fetchFoodFactsData } from './actions/ActionFoodFacts';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    addedProducts: []
  };

  addProduct = () => {
    // console.log('adding product');
    const { productName, productPhoto, productCategories } = this.props;
    this.setState(() => {
      return {
        addedProducts: [
          ...this.state.addedProducts,
          { productName, productPhoto, productCategories }
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
      classes
    } = this.props;

    return (
      <div className="App">
        <p className={classes.headline}>Find your food products</p>
        <Button onClick={this.props.initiateBarcodeDetection} color="primary">
          Start
        </Button>
        <Button onClick={this.props.stopBarcodeDetection} color="secondary">
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
          className="camera-container"
          style={this.props.hideCamera ? { display: 'none' } : null}
        />
        <div className="product-container">
          {this.props.productName ? (
            <div>
              <p>
                Product name:
                <strong>{this.props.productName}</strong>
              </p>
              <button onClick={this.addProduct}>Add Product</button>
            </div>
          ) : null}
          {this.props.productCategories ? (
            <p>Category:{this.props.productCategories}</p>
          ) : null}
          <List aria-label="main mailbox folders">
            {this.props.productKeywords
              ? this.props.productKeywords.map((keyword, index) => (
                  <ListItem key="index">
                    <ListItemText primary={keyword} />
                  </ListItem>
                ))
              : null}
          </List>

          {this.props.productPhoto ? (
            <img src={this.props.productPhoto} alt={'productPhoto'} />
          ) : null}
        </div>
        <div className="summary">
          Added products:
          {this.state.addedProducts
            ? this.state.addedProducts.map((prod, index) => (
                <>
                  <div>
                    <span key={index}>{prod.productName}</span>
                    <img
                      style={{ width: '30px' }}
                      src={prod.productPhoto}
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    bLoading: state.foodfactsReducer.bLoading,
    nstrError: state.foodfactsReducer.nstrError,
    arrFoodfacts: state.foodfactsReducer.arrFoodfacts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFoodFactsData: () => dispatch(fetchFoodFactsData())
  };
};

const style = {
  headline: {
    fontSize: '20px;'
  }
};

App.propTypes = {
  hideCamera: PropTypes.bool
};

export default withStyles(style)(
  withBarcode(connect(mapStateToProps, mapDispatchToProps)(App))
);
