import node from "rollup-plugin-node-resolve"

export default {
  input: "index.js",
  output: {
    file: "dist/app.js",
    name: "app",
    format: "umd",
  },
  plugins: [node()]
}
