import { createMuiTheme } from '@material-ui/core/styles';
import {
  flexMixin,
  centerFlex,
  textOverflowEllipse,
  textClamp,
} from './mixins';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Jost', 'Roboto', 'sans-serif'].join(','),
  },
  mixins: {
    customize: {
      flexMixin,
      centerFlex,
      textClamp,
      textOverflowEllipse,
    },
  },
});

export default theme;
