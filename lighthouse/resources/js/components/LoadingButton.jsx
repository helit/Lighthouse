import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button,
  CircularProgress
} from '@material-ui/core';

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export default class LoadingButton extends Component {
  render() {
    return (
      <Wrapper>
        <Button
          variant="contained"
          color={this.props.color}
          disabled={this.props.loading}
          type={this.props.type}>
          {this.props.text}
        </Button>
        {this.props.loading &&
          <CircularProgress
            color='secondary'
            size={24}
            style={{ position: 'absolute' }} />}
      </Wrapper>
    );
  }
}
