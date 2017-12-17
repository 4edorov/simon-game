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

module.exports = {
  sequences,
  comparisons
}
