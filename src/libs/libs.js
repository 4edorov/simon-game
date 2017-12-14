const sequences = [
  ['0'],
  ['0', '2'],
  ['0', '2', '3']
]

const comparisons = {
  '0': 'handleTopLeft',
  '1': 'handleTopRight',
  '2': 'handleBottomLeft',
  '3': 'handleBottomRight'
}

module.exports = {
  sequences,
  comparisons
}
