import React, { Component } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import TokenUtils from '../../utils/TokenUtils';
import LoadingButton from '../../components/LoadingButton';
import styled from 'styled-components';
import { statusBorder } from '../../theme/Styles';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      statusBorder: statusBorder.primary,
      isAuthenticated: false,
      rememberMe: false
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheckboxChange = () => {
    let checked = !this.state.rememberMe;
    this.setState({ rememberMe: checked });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({
      isLoading: true,
      statusBorder: statusBorder.primary
    });

    api.post('/login', { email, password })
      .then(response => {
        this.setState({ isAuthenticated: true });
        TokenUtils.setToken(response.data.token);
      })
      .catch(error => {
        this.setState({ statusBorder: statusBorder.error });
        // localStorage.removeItem('token');
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const {
      email,
      password,
      isLoading,
      statusBorder,
      isAuthenticated,
      rememberMe
    } = this.state;

    return (
      <div style={{ height: '100vh' }}>
        <Grid container justify="center" alignItems="center">
          <Grid item style={{ marginTop: '50px' }}>
            {isAuthenticated
              ? <Redirect to='/admin' />
              : <Paper
                elevation={1}
                square={true}
                style={{
                  maxWidth: '400px',
                  margin: '25px',
                  padding: '25px',
                  borderTop: statusBorder
                }}>
                <HeaderWrapper>
                  <Typography
                    variant="h5"
                    component="h3">
                    Login
                  </Typography>
                  <LockOutlined color='primary'/>
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
                      loading={isLoading}
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