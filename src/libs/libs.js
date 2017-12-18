const simonSound0 = require('../assets/audio/simonSound0.mp3')

const sequences = [
  ['0'],
  ['0', '3'],
  ['0', '3', '2'],
  ['0', '3', '2', '1']
]

const comparisons = {
  '0': 'handleTopLeft',
  '1': 'handleTopRight',
  '2': 'handleBottomLeft',
  '3': 'handleBottomRight'
}

const audios = {
  '0': simonSound0
}

module.exports = {
  sequences,
  comparisons,
  audios
}
