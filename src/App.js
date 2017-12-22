import React, { Component } from 'react'
import PlayField from './components/PlayField'
import './App.css'
import {
  sequences,
  comparisons
} from './libs/libs'

const audioContext = new (window.AudioContext || window.webkitAudioCOntext)()

const createAudio = frequency => {
  const oscillator = audioContext.createOscillator()
  oscillator.type = 'square'
  oscillator.frequency.value = frequency
  oscillator.start()
  return oscillator
}

const tl = createAudio(440)
const tr = createAudio(340)
const bl = createAudio(240)
const br = createAudio(140)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      handleTopLeft: 0,
      handleTopRight: 0,
      handleBottomLeft: 0,
      handleBottomRight: 0,
      count: 0,
      userSequence: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.handleTopLeft) {
      tl.connect(audioContext.destination)
    }
    if (nextState.handleTopRight) {
      tr.connect(audioContext.destination)
    }
    if (nextState.handleBottomLeft) {
      bl.connect(audioContext.destination)
    }
    if (nextState.handleBottomRight) {
      br.connect(audioContext.destination)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.handleTopLeft) {
      tl.disconnect(audioContext.destination)
    }
    if (prevState.handleTopRight) {
      tr.disconnect(audioContext.destination)
    }
    if (prevState.handleBottomLeft) {
      bl.disconnect(audioContext.destination)
    }
    if (prevState.handleBottomRight) {
      br.disconnect(audioContext.destination)
    }
  }

  handleTopLeftButton = handleTopLeft => {
    this.setState({
      handleTopLeft: handleTopLeft
    })
    if (handleTopLeft) {
      this.setState(prevState => ({
        userSequence: [...prevState.userSequence, '0']
      }))
    }
  }
  handleTopRightButton = handleTopRight => {
    this.setState({
      handleTopRight: handleTopRight
    })
    if (handleTopRight) {
      this.setState(prevState => ({
        userSequence: [...prevState.userSequence, '1']
      }))
    }
  }
  handleBottomLeftButton = handleBottomLeft => {
    this.setState({
      handleBottomLeft: handleBottomLeft
    })
    if (handleBottomLeft) {
      this.setState(prevState => ({
        userSequence: [...prevState.userSequence, '2']
      }))
    }
  }
  handleBottomRightButton = handleBottomRight => {
    this.setState({
      handleBottomRight: handleBottomRight
    })
    if (handleBottomRight) {
      this.setState(prevState => ({
        userSequence: [...prevState.userSequence, '3']
      }))
    }
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
