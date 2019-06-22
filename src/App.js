import React, {Fragment} from 'react';
import styled from 'styled-components';
import CheckBoard from './checkerboard/index'
import Chess from './chess/index'
import chessArr from './data/index'

function App() {
  const chesses = chessArr.map((row) => {
    return row.map((val) => {
      if(val !== null) {
        return (
          <Chess
            info={val}
            key={JSON.stringify(val)}
          ></Chess>
        )
      }
    })
  })
  console.log(chesses);
  return (
    <Fragment>
      <CheckBoard></CheckBoard>
      <div>{chesses}</div>
    </Fragment>
  );
}

export default App;
