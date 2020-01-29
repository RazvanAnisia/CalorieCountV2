import { createMuiTheme } from '@material-ui/core/styles';
import palette from './Palette';

const theme = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: palette.purpleFaded
      }
    },
    MuiDialog: {
      paper: {
        height: 700
      }
    },
    MuiTextField: {
      root: {
        backgroundColor: palette.white,
        borderRadius: '10px'
      }
    },
    MuiButton: {
      root: {
        background: palette.purple,
        borderRadius: 10,
        '&:hover': {
          background: palette.black
        }
      },
      label: {
        color: palette.white,
        '&:active': {
          color: palette.black
        },
        '&:hover': {
          color: palette.black
        }
      }
    }
  }
});

export default theme;
