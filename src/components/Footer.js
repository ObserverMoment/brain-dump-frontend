import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  background-color: whitesmoke;
  padding: 30px;
  margin: 10px 0 0 0;
  font-size: 16px;
`

export default () => (
  <Footer>
    <div>
      Some company info
    </div>
    <div>
      Some social media links
    </div>
    <div>
      Some other links
    </div>
  </Footer>
)
