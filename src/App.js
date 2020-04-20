import React from 'react';
import styled from 'styled-components'

import Ball from './component/ball'
import Refresh from './component/Refresh'

function App() {
  return (
    <Main>
      <Ball /><Ball /><Ball /><Ball /><Ball /><Ball /> + <Ball />
      <Refresh />
    </Main>
  );
}

export default App;

const Main = styled.div`
@media screen and (min-width: 480px) {
  position: relative;
  top: 300px;
  width: 900px;
  margin: 0 auto;
}
  position: relative;
  width: 400px;
  margin: 0 auto;
`