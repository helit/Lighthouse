import * as React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Icon,
  Avatar
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';
import styled from 'styled-components';
import { color } from '../../theme/Styles';
import userStore from '../../stores/UserStore';
import { observer } from 'mobx-react';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

interface IState {
  email: string;
  password: string;
  rememberMe: boolean;
}

@observer
export default class Login extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<IState, keyof IState>);
  }

  onCheckboxChange = (e) => {
    this.setState({ rememberMe: e.target.checked });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = this.state;
    userStore.login(email, password, rememberMe);
  }

  render() {
    const {
      email,
      password,
      rememberMe,
    } = this.state;

    return (
      <div style={{ height: '100vh' }}>
        <Grid container justify="center" alignItems="center">
          <Grid item style={{ marginTop: '50px' }}>
            {userStore.isAuthenticated
              ? <Redirect to='/admin' />
              : <Paper
                elevation={1}
                square={true}
                style={{
                  maxWidth: '400px',
                  margin: '25px',
                  padding: '25px'
                }}>
                <HeaderWrapper>
                  <Avatar
                    style={{
                      color: '#fff',
                      backgroundColor: userStore.badCredentials
                        ? color.error
                        : color.primary,
                      marginBottom: '10px',
                    }}>
                    <Icon>vpn_key</Icon>
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h3">
                    Login
                  </Typography>
                </HeaderWrapper>
                <form onSubmit={this.onSubmit}>
                  <FormControl margin="normal" fullWidth>
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.onInputChange}
                      fullWidth
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.onInputChange}
                      fullWidth
                      required
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={this.onCheckboxChange}
                            value="rememberMe"
                            color="primary"
                          />
                        }
                        label="Remember me"
                      />
                    </FormGroup>
                  </FormControl>
                  <FooterWrapper>
                    <LoadingButton
                      text={'Login'}
                      color={'primary'}
                      type={'submit'}
                      loading={false}
                      style={{ flex: '1', justifyContent: 'flex-start' }} />
                    <Link to="/reset">
                      <Button>
                        Forgot password?
                      </Button>
                    </Link>
                  </FooterWrapper>
                </form>
              </Paper>
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}