import React, { Component } from 'react'
import {
  Label,
  Well,
  Button,
  Radio,
  FormGroup
} from 'react-bootstrap'

const styles = {
  row1: {
    display: 'flex',
    justifyContent: 'center'
  },
  row2: {
    display: 'flex',
    justifyContent: 'center',
  },
  row2El: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '3px'
  },
  row3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  countWell: {
    fontFamily: 'Roboto, sans-serif',
    padding: '0px 5px',
    marginBottom: '0px',
    backgroundColor: 'YellowGreen',
    color: 'Green',
    height: '30px',
    fontSize: '21px',
  },
  btn: {
    height: '30px',
    border: '1px solid'
  }
}

class ControlPanel extends Component {
  handleStartButton = () => {
    if (!this.props.isGameOn || this.props.isGameStart) {
      return
    }
    this.props.onHandleGameStart()
    this.props.playSequences()
  }

  handleStrictButton = () => {
    if (!this.props.isGameOn || this.props.isGameStart) {
      return
    }
    this.props.switchStrictMode()
  }

  handleGameSwitcherOn = () => {
    this.props.onHandleGameSwitcher(true)
  }

  handleGameSwitcherOff = () => {
    this.props.onHandleGameSwitcher(false)
  }

  render () {
    return (
      <div className='table-cycle'>
        <div style={styles.row1}>
          <h1>
            <Label bsStyle='success'>
              Simon
              <sup className='special-symbols'>&reg;</sup>
            </Label>
          </h1>
        </div>
        <div style={styles.row2}>
          <div style={styles.row2El}>
            <Well style={styles.countWell}>
              {this.props.isMessage || this.props.count}
            </Well>
            <h3><Label>Count</Label></h3>
          </div>
          <div style={styles.row2El}>
            <Button bsStyle='danger' style={styles.btn}
              onClick={this.handleStartButton}
            />
            <h3><Label bsStyle={this.props.isGameStart ? 'success' : 'default'}>Start</Label></h3>
          </div>
          <div style={styles.row2El}>
            <Button bsStyle='warning' style={styles.btn}
              onClick={this.handleStrictButton}
            />
            <h3><Label bsStyle={this.props.isStrictMode ? 'success' : 'default'}>Strict</Label></h3>
          </div>
        </div>
        <div style={styles.row3}>
          <FormGroup>
            <Radio name='radioSwitch' checked={this.props.isGameOn} onChange={this.handleGameSwitcherOn}>On</Radio>
            <Radio name='radioSwitch' validationState='error' checked={!this.props.isGameOn} onChange={this.handleGameSwitcherOff}>Off</Radio>
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default ControlPanel
