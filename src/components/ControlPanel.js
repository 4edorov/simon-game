import React, { Component } from 'react'
import { Label } from 'react-bootstrap'

class ControlPanel extends Component {
  render () {
    return (
      <div className='table-cycle'>
        <h1>
          <Label bsStyle='success'>
            Simon
            <sup className='special-symbols'>&reg;</sup>
          </Label>
        </h1>
      </div>
    )
  }
}

export default ControlPanel
