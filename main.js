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
    highlightLove(rowFreq.slice(0, 35), '#frame-love', loveFilter)
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
  const g = setupSvg(rows.map(r => Object.assign(r, {freq_t: r.freq * 50000})), elId)
  const easeOut = d3.easeQuadOut
  const easeIn = d3.easeQuadIn

  const transIn = d3.transition().duration(220).delay(10).ease(easeOut)
  const transOut = d3.transition().duration(120).ease(easeIn)

  const circles = g.append('circle')
      .attr('r', d => d.freq_t)
      .attr('cx', (d) => d.word === 'love' ? (width + margin.horiz) / 5 : Math.random() * width)
      .attr('cy', (d) => d.word === 'love' ? (height + margin.vert) / 2.5 : Math.random() * height)
      .attr('data-coord', function (d) { d.coord = {_x: this.cx.baseVal.value, _y: this.cy.baseVal.value}})
      .attr('fill-opacity', d => d.word === 'love' ? 1 : 0.36)
      .attr('stroke', d => d.word in {'love': 1, 'work': 1, 'got': 1} ? '#000' : '')
      .attr('fill', d => color(colorFilter(d.word)))
      .on('mouseenter', function (d) {
        var x = this.cx.baseVal.value
        console.log(`base val ${x}`)
      })

  g.append('text')
      .append('tspan')
      .attr('class', 'label')
      .attr('fill', '#fff')
      .attr('fill-opacity', d => d.word in {'love': 1, 'work': 1, 'got': 1}  ? 1 : 0.0)
      .attr('x', d => d.coord._x - 22)
      .attr('y', d => d.coord._y)
      .text(d => d.word)

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
