import React, { Component } from 'react'
import ControlPanel from './ControlPanel'

class PlayField extends Component {
  handleOnMouseDownButton = (e) => {
    if (!this.isAllPlayButtonOff()) {
      return
    }
    switch (e.target.className) {
      case 'top-left off':
        this.props.onHandleTopLeftButton(1)
        break
      case 'top-right off':
        this.props.onHandleTopRightButton(1)
        break
      case 'bottom-left off':
        this.props.onHandleBottomLeftButton(1)
        break
      case 'bottom-right off':
        this.props.onHandleBottomRightButton(1)
        break
      default:
        return
    }
  }
  handleOnMouseUpButton = (e) => {
    switch (e.target.className) {
      case 'top-left on':
        this.props.onHandleTopLeftButton(0)
        break
      case 'top-right on':
        this.props.onHandleTopRightButton(0)
        break
      case 'bottom-left on':
        this.props.onHandleBottomLeftButton(0)
        break
      case 'bottom-right on':
        this.props.onHandleBottomRightButton(0)
        break
      default:
        return
    }
  }

  isAllPlayButtonOff = () => {
    if (this.props.topLeftState || this.props.topRightState || this.props.bottomLeftState || this.props.bottomRightState) {
      return false
    }
    return true
  }

  render() {
    return (
      <div className='app'>
        <div className='main-cycle'>
          <div className='frame-cycle'>
            <div className='frame-in-cycle'>
              <ControlPanel
                count={this.props.count}
                playSequences={this.props.playSequences}
                isGameOn={this.props.isGameOn}
                onHandleGameSwitcher={this.props.onHandleGameSwitcher}
                switchStrictMode={this.props.switchStrictMode}
                isStrictMode={this.props.isStrictMode}
                isMessage={this.props.isMessage}
                onHandleGameStart={this.props.onHandleGameStart}
                isGameStart={this.props.isGameStart}
              />
            </div>
            <div className='square'>
              <div className='top-part'>
                <div
                  className={this.props.topLeftState ? 'top-left on' : 'top-left off'}
                  onMouseDown={this.handleOnMouseDownButton}
                  onMouseUp={this.handleOnMouseUpButton}
                  onMouseLeave={this.handleOnMouseUpButton}
                  onTouchStart={this.handleOnMouseDownButton}
                >
                </div>
                <div
                  className={this.props.topRightState ? 'top-right on' : 'top-right off'}
                  onMouseDown={this.handleOnMouseDownButton}
                  onMouseUp={this.handleOnMouseUpButton}
                  onMouseLeave={this.handleOnMouseUpButton}
                  onTouchStart={this.handleOnMouseDownButton}
                >
                </div>
              </div>
              <div className='bottom-part'>
                <div
                  className={this.props.bottomLeftState ? 'bottom-left on' : 'bottom-left off'}
                  onMouseDown={this.handleOnMouseDownButton}
                  onMouseUp={this.handleOnMouseUpButton}
                  onMouseLeave={this.handleOnMouseUpButton}
                  onTouchStart={this.handleOnMouseDownButton}
                >
                </div>
                <div
                  className={this.props.bottomRightState ? 'bottom-right on' : 'bottom-right off'}
                  onMouseDown={this.handleOnMouseDownButton}
                  onMouseUp={this.handleOnMouseUpButton}
                  onMouseLeave={this.handleOnMouseUpButton}
                  onTouchStart={this.handleOnMouseDownButton}
                >
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
