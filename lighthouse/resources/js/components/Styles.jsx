import {
  createMuiTheme
} from '@material-ui/core/styles';
import {
  lightBlue,
  deepOrange,
  red
} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[600]
    },
    secondary: {
      main: deepOrange[500]
    },
    type: 'light'
  },
  status: {
    danger: red[400]
  },
  typography: {
    useNextVariants: true,
  }
});

console.log(theme);

export const color = {
  primary: `${theme.palette.primary.main}`,
  error: `${theme.status.danger}`,
  black: '#19171c',
  darkGrey: '#3f4448',
  white: '#ffffff',
  background: '#fafafa'
}

export const statusBorder = {
  primary: `5px solid ${theme.palette.primary.main}`,
  error: `5px solid ${theme.status.danger}`
}
