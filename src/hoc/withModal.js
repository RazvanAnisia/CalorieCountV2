import React, { Component } from 'react';

const withModal = Wrapped => {
  class withModal extends Component {
    state = {
      bIsModalOpened: false
    };

    /**
     *
     */
    handleModalClose = () => {
      this.setState({
        bIsModalOpened: false
      });
    };

    handleModalOpen = () => {
      this.setState({
        bIsModalOpened: true
      });
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
        />
      );
    }
  }
  return withModal;
};

export default withModal;
