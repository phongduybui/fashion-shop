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
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 740,
      lg: 960,
      xl: 1280,
    },
  },
});

export default theme;
