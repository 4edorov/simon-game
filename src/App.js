import React, { Component } from 'react'
import PlayField from './components/PlayField'
import './App.css'
import {
  comparisons
} from './libs/libs'

const _ = require('lodash')

const audioContext = new (window.AudioContext || window.webkitAudioCOntext)()

const createAudio = frequency => {
  const oscillator = audioContext.createOscillator()
  oscillator.type = 'square'
  oscillator.frequency.value = frequency
  oscillator.start()
  return oscillator
}

const tl = createAudio(415)
const tr = createAudio(310)
const bl = createAudio(209)
const br = createAudio(252)

let breakSequences

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      handleTopLeft: 0,
      handleTopRight: 0,
      handleBottomLeft: 0,
      handleBottomRight: 0,
      count: 0,
      userSequence: [],
      isGameOn: false,
      isStrictMode: false,
      isGameStart: false,
      isMessage: ''
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
      tl.connect(audioContext.destination)
      tl.disconnect(audioContext.destination)
    }
    if (prevState.handleTopRight) {
      tr.connect(audioContext.destination)
      tr.disconnect(audioContext.destination)
    }
    if (prevState.handleBottomLeft) {
      bl.connect(audioContext.destination)
      bl.disconnect(audioContext.destination)
    }
    if (prevState.handleBottomRight) {
      br.connect(audioContext.destination)
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

  handleGameSwitcher = gameState => {
    this.setState({
      isGameOn: gameState
    })
    if (!gameState) {
      breakSequences = true
      setTimeout(() => {
        this.setState({
          isStrictMode: false,
          count: 0,
          isMessage: '',
          isGameStart: false
        })
      }, 1000)
    }
  }

  handleSwitchStrictMode = () => {
    this.setState(prevState => ({
      isStrictMode: !prevState.isStrictMode
    }))
  }

  handleGameStart = () => {
    this.setState(prevState => ({
      isGameStart: !prevState.isGameStart
    }))
  }

  playSequences = sequences => {
    const delay = time => {
      return new Promise(resolve => setTimeout(resolve, time))
    }
    const delayedLightOff = async item => {
      await delay(500)
      await this.setState({
        [item]: 0
      })
    }
    const processSequence = async array => {
      for (let el of array) {
        if (breakSequences) {
          break
        }

        await delay(250)

        el = comparisons[el]
        this.setState({
          [el]: 1
        })
        if (!breakSequences) {
          await delayedLightOff(el)
        }
      }
    }
    const waitForUserInput = async sequence => {
      const checkNumberUserInput = async goalNumber => {
        if (this.state.userSequence.length < goalNumber && this.state.isGameOn) {
          await delay(700)
          await checkNumberUserInput(goalNumber)
        } else {
          await delay(700)
        }
      }

      await checkNumberUserInput(sequence.length)

      if (!this.state.isGameOn) {
        return false
      }

      const test = _.isEqual(this.state.userSequence, sequence)

      if (test) {
        this.setState({
          isMessage: 'right'
        })
        await delay(500)
        this.setState({
          isMessage: ''
        })
        this.setState(prevState => ({
          count: prevState.count + 1
        }))
        return true
      } else {
        this.setState({
          isMessage: 'wrong'
        })
        await delay(500)
        this.setState({
          isMessage: '',
          userSequence: []
        })

        if (this.state.isStrictMode) {
          await delay(500)
          this.setState({
            isMessage: 'reset'
          })
          await delay(500)
          this.setState({
            isMessage: '',
            count: 0
          })
          return false
        } else {
          await processSequence(sequence)
          await waitForUserInput(sequence)
        }
      }
    }

    const randomFormSequences = () => {
      const addRandomValue = initialArr => {
        initialArr.push(_.random(3).toString())
        return initialArr
      }
      let initArr = [[]]
      let sequences = []
      Array(20).fill(0).forEach((value, index) => {
        initArr[index] = [].concat(addRandomValue([].concat(initArr[Math.max(index - 1, 0)])))
        sequences[index] = initArr[index]
      })
      return sequences
    }

    const processSequences = async sequences => {
      for (let sequence of sequences) {
        breakSequences = false
        this.setState({
          userSequence: []
        })
        await delay(500)
        await processSequence(sequence)
        const userResult = await waitForUserInput(sequence)
        if (userResult === false) {
          breakSequences = true
          break
        }
        if (breakSequences) {
          break
        }
      }

      breakSequences && this.state.isGameOn && this.playSequences(sequences)

      if (!breakSequences && this.state.isGameOn) {
        this.setState({
          isMessage: 'win!!!'
        })
      }
    }

    if (!sequences) {
      sequences = [].concat(randomFormSequences())
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
        isGameOn={this.state.isGameOn}
        onHandleGameSwitcher={this.handleGameSwitcher}
        switchStrictMode={this.handleSwitchStrictMode}
        isStrictMode={this.state.isStrictMode}
        isMessage={this.state.isMessage}
        onHandleGameStart={this.handleGameStart}
        isGameStart={this.state.isGameStart}
      />
    )
  }
}

export default App
