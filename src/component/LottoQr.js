import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import styled from 'styled-components'
 
class LottoQr extends Component {
  state = {
    result: 'No result',
    numbers: [],
    test: 'http://m.dhlottery.co.kr/?v=0917q031432363839n000000000000n000000000000n000000000000n0000000000001525257351'
  }

  componentDidMount() {
    let test = this.state.test;    
    let auto = test.match(/q\d{12}/g);
    let byHand = test.match(/m\d{12}/g);    
    let semiAuto = test.match(/s\d{12}/g);    
  }
 
  handleScan = data => {        
    if (data) {
      this.setState({
        result: data,
        numbers: data.match(/\w\d{12}/g)
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <Contain>        
        {this.state.result !== 'No result' ? <iframe title='qrToSite' width='100%' height='800px' src={this.state.result} >          
        </iframe> : ""}        
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