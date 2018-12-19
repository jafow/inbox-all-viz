<template>
  <div class="chart" id="chartId">
    <p>hello {{name}}</p>
  </div>
</template>

<script>
import {csv} from 'd3-fetch'

export default {
  name: 'Bubble',
  props: {
    chartId: String
  },
  data () {
    return {
      name: 'jared'
    }
  },
  mounted () {
    // return csv('./assets/data/bubbles.csv')
    fetch('http://localhost:8081/public/foo/hoo.json')
      .then(function onCsvSuccess (data) {
        if (data.ok) {
          console.log("data: ", data)
          return data.json()
        }
     })
      .then(function (text) {
        console.log("foo", text)
      })
      .catch(function onCsvErr (err) {
        var e = new Error(err
        console.dir("Failed to fetch file: ", e)
        return e
      })
  }
}
</script>
