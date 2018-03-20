import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  background-color: #e4fffd;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.12);
  color: #505050;
`

export default () => (
  <Header>
    <div>Menu</div>
    <h1>Brain Dump Collaboration Station</h1>
    <div>Login / Account</div>
  </Header>
)
