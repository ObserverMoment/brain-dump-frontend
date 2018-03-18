import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  background-color: lightblue;
`

export default () => (
  <Header>
    <div>Menu</div>
    <h1>Brain Dump Collaboration Station</h1>
    <div>Login / Account</div>
  </Header>
)
