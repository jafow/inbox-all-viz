import node from "rollup-plugin-node-resolve"

export default {
  input: "index.js",
  output: {
    file: "dist/bundle.js",
    name: "d3",
    format: "umd",
  },
  plugins: [node()]
}
