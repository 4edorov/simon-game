import React, { Component } from 'react'
import PlayField from './components/PlayField'
import './App.css'
import {
  sequences,
  comparisons,
  audios
} from './libs/libs'

const audioPlayButton = async numberButton => {
  let audio = new Audio(audios[0])
  audio.play()
  console.log('audio', audio)
}

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

  handleTopLeftButton = handleTopLeft => {
    audioPlayButton(0)
    this.setState({
      handleTopLeft: handleTopLeft
    })
  }
  handleTopRightButton = handleTopRight => {
    this.setState({
      handleTopRight: handleTopRight
    })
  }
  handleBottomLeftButton = handleBottomLeft => {
    this.setState({
      handleBottomLeft: handleBottomLeft
    })
  }
  handleBottomRightButton = handleBottomRight => {
    this.setState({
      handleBottomRight: handleBottomRight
    })
  }

  playSequences = () => {
    const delay = () => {
      return new Promise(resolve => setTimeout(resolve, 700))
    }
    const delayedLightOff = async item => {
      await delay()
      this.setState({
        [item]: 0
      })
    }
    const processSequence = async array => {
      for (let el of array) {
        await delay()
        // audioPlayButton(el)
        el = comparisons[el]
        this.setState({
          [el]: 1
        })
        await delayedLightOff(el)
      }
    }
    const processSequences = async sequences => {
      for (let sequence of sequences) {
        await delay()
        await processSequence(sequence)
      }
    }

    processSequences(sequences)
  }

  render() {
    console.log('libs', sequences, comparisons)
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
        playSequences={this.playSequences}
      />
    )
  }
}

export default App
