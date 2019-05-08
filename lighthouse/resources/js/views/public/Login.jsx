import React, { Component } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '../../components/LoadingButton';
import styled from 'styled-components';
import { statusBorder } from '../../components/Styles';

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
      statusBorder: statusBorder.default,
      isAuthenticated: false
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({
      isLoading: true,
      statusBorder: statusBorder.default
    });

    axios.post('/api/login', { email, password })
      .then(response => {
        this.setState({ isAuthenticated: true });
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        this.setState({ statusBorder: statusBorder.error });
        localStorage.removeItem('token');
        console.log(error);
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const {
      email,
      password,
      isLoading,
      statusBorder,
      isAuthenticated
    } = this.state;

    return (
      <Grid container justify="center" alignItems="center" style={{ flex: '1' }}>
        <Grid item>
          {isAuthenticated
            ? <Redirect to='/admin' />
            : <Paper style={{
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
                <LockOutlined />
              </HeaderWrapper>
              <form onSubmit={this.onSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onInputChange}
                  fullWidth
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onInputChange}
                  fullWidth
                  required
                  style={{ marginBottom: '20px' }}
                />
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
    );
  }
}
