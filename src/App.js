import React, { Component } from 'react'
import PlayField from './components/PlayField'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      handleTopLeft: 0,
      handleTopRight: 0,
      handleBottomLeft: 0,
      handleBottomRight: 0,
      count: 0
    }
  }

  handleTopLeftButton = (handleTopLeft) => {
    this.setState({
      handleTopLeft: handleTopLeft
    })
  }
  handleTopRightButton = (handleTopRight) => {
    this.setState({
      handleTopRight: handleTopRight
    })
  }
  handleBottomLeftButton = (handleBottomLeft) => {
    this.setState({
      handleBottomLeft: handleBottomLeft
    })
  }
  handleBottomRightButton = (handleBottomRight) => {
    this.setState({
      handleBottomRight: handleBottomRight
    })
  }

  render() {
    return (
      <PlayField
        onHandleTopLeftButton={this.handleTopLeftButton}
        onHandleTopRightButton={this.handleTopRightButton}
        onHandleBottomLeftButton={this.handleBottomLeftButton}
        onHandleBottomRightButton={this.handleBottomRightButton}
        topLeftState={this.state.handleTopLeft}
        topRightState={this.state.handleTopRight}
        bottomLeftState={this.state.handleBottomLeft}
        bottomRightState={this.state.handleBottomRight}
        count={this.state.count}
      />
    )
  }
}

export default App
