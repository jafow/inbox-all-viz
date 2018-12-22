/* global d3 */

// fetch the file

d3.csv('./public/data/bubbles.csv')
  .then(function (rows) {
    let rowFreq = rows.map(r => ({
      word: r.word,
      freq: r.freq,
      freq_t: r.freq * (10 ** 5)
    }))
    makeBubbles(rowFreq, '#frame-all')
    highlightLove (rowFreq, '#frame-love', loveFilter)
  })
  .catch(function (err) {
    console.error(new Error(err))
  })


const height = 840
const width = 1080
const margin = {left: 20, right: 20, horiz: 40, vert: 40}
const color = d3.scaleOrdinal().range(d3.schemeCategory10)


function makeBubbles (rows, elId, colorFilter=identity) {
  const g = setupSvg(rows, elId)

  g.append('circle')
    .attr('r', d => d.freq_t)
    .attr('cx', () => Math.random() * width)
    .attr('cy', () => Math.random() * height)
    .attr('fill-opacity', 0.7)
    .attr('fill', d => color(colorFilter(d.word)))

  return g 
}

function highlightLove (rows, elId, colorFilter) {
  const g = setupSvg(rows, elId)

    g.append('circle')
      .attr('r', d => d.freq_t)
      .attr('cx', (d) => d.word === 'love' ? (width + margin.horiz) / 5 : Math.random() * width)
      .attr('cy', (d) => d.word === 'love' ? (height + margin.vert) / 2.5 : Math.random() * height)
      .attr('fill-opacity', d => d.word === 'love' ? 1 : 0.36)
      .attr('fill', d => color(colorFilter(d.word)))

    return g 
}

function identity (d) {
  return d
}

function loveFilter (n) {
  return n === 'love'
    ? n + n
    : ''
}

function setupSvg (data, elId) {
  const svg = d3.select(elId)
                .append('svg')
                .attr('height', height)
                .attr('width', width)
                .attr('viewBox', () => 
                  `0 0 ${width + margin.horiz} ${height}`
                )


  const g = svg.selectAll('g')
                .data(data)
                .enter()
  return g
}
