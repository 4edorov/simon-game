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
      handleBottomRight: 0
    }
  }

  handleTopLeftButton = (handleTopLeft) => {
    this.setState({
      handleTopLeft: handleTopLeft
    })
  }

  render() {
    console.log('state', this.state)
    return (
      <PlayField
        onHandleTopLeftButton={this.handleTopLeftButton}
      />
    )
  }
}

export default App
