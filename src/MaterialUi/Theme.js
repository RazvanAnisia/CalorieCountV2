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
    }
  }
});

export default theme;
