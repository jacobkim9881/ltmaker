import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import styled from 'styled-components'
 
class LottoQr extends Component {
  state = {
    result: 'No result'
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <Contain>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </Contain>
    )
  }
}

export default LottoQr;

const Contain = styled.div`

@media screen and (min-width: 480px) { 
  margin-top: 60px;
}
margin-top: 120px;
`