import React, { Component } from 'react';
import {
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { color } from '../Styles';
import AdminDropdown from './AdminDropdown';

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  color: ${color.white};
  background-color: ${color.darkGrey};
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  padding: 10px;
`;

const Title = styled.div`
  flex: 1;
`;

export default class AdminToolbar extends Component {
  render() {
    return (
      <Toolbar>
        <Title>
          Admin Toolbar
        </Title>
        <AdminDropdown text={'Menu'} />
      </Toolbar>
    );
  }
}