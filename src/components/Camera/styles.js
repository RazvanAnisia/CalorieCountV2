import palette from '../../MaterialUi/Palette';

export default {
  hidden: {
    display: 'none'
  },
  cameraContainer: {
    width: '100%',
    height: 500,
    display: 'flex',
    justifyContent: 'center',
    '& video': {
      width: '90%'
    }
  },
  closeCameraButton: {
    position: 'absolute',
    top: 128,
    right: 30,
    background: palette.coral,
    '&:hover': {
      background: palette.purple
    },
    zIndex: 10
  }
};
