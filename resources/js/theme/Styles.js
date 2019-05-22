import {
  createMuiTheme
} from '@material-ui/core/styles';
import {
  indigo,
  pink,
  red,
  green
} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[500],
    },
    type: 'light',
  },
  status: {
    danger: red[400],
    success: green[600],
  },
  typography: {
    useNextVariants: true,
  },
});

export const color = {
  primary: `${theme.palette.primary.main}`,
  error: `${theme.status.danger}`,
  success: `${theme.status.success}`,
  dark: '#424242',
  black: '#19171c',
  darkGrey: '#3f4448',
  white: '#ffffff',
}

export const statusBorder = {
  primary: `5px solid ${theme.palette.primary.main}`,
  error: `5px solid ${theme.status.danger}`
}

export const adminToolbar = {
  margin: '53px',
}
