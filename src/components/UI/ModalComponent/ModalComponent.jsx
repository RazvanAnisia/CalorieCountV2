import React, { Component } from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ModalComponent extends Component {
  render() {
    const { bIsModalOpened, handleModalClose } = this.props;
    const { children } = this.props;
    return (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        fullWidth={true}
        maxWidth={'sm'}
        scroll="body"
        TransitionComponent={Transition}
        open={bIsModalOpened}
        onClose={handleModalClose}>
        {children}
      </Dialog>
    );
  }
}

ModalComponent.propTypes = {
  bIsModalOpened: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired
};

export default ModalComponent;
