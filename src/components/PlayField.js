import React, { Component } from 'react'
import ControlPanel from './ControlPanel'

class PlayField extends Component {
  render() {
    return (
      <div className='app'>
        <div className='main-cycle'>
          <div className='frame-cycle'>
            <div className='frame-in-cycle'>
              <ControlPanel />
            </div>
            <div className='square'>
              <div className='top-part'>
                <div className='top-left'>
                </div>
                <div className='top-right'>
                </div>
              </div>
              <div className='bottom-part'>
                <div className='bottom-left'>
                </div>
                <div className='bottom-right'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayField