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
    justifyContent: 'center'
  }
}

class ControlPanel extends Component {
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
          <div>
            <Well></Well>
            <h3><Label>Count</Label></h3>
          </div>
          <div>
            <Button bsStyle='danger' />
            <h3><Label>Start</Label></h3>
          </div>
          <div>
            <Button bsStyle='warning' />
            <h3><Label>Strict</Label></h3>
          </div>
        </div>
        <div>
          <div>
            <Checkbox />
          </div>
        </div>
      </div>
    )
  }
}

export default ControlPanel
