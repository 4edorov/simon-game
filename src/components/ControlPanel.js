import React, { Component } from 'react'
import {
  Label,
  Well,
  Button,
  Checkbox
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
    padding: '5px',
    marginBottom: '0px'
  },
  btn: {
    height: '30px',
    border: '1px solid'
  }
}

class ControlPanel extends Component {
  handleStartButton = () => {
    this.props.playSequences()
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
            <Well style={styles.countWell}>{this.props.count}</Well>
            <h3><Label>Count</Label></h3>
          </div>
          <div style={styles.row2El}>
            <Button bsStyle='danger' style={styles.btn}
              onClick={this.handleStartButton}
            />
            <h3><Label>Start</Label></h3>
          </div>
          <div style={styles.row2El}>
            <Button bsStyle='warning' style={styles.btn} />
            <h3><Label>Strict</Label></h3>
          </div>
        </div>
        <div style={styles.row3}>
          <Checkbox />
          <h3><Label>On/Off</Label></h3>
        </div>
      </div>
    )
  }
}

export default ControlPanel
