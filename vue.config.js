const path = require("path");
// const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".css"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@com": path.resolve(__dirname, "./src/components"),
          "@assets": path.resolve(__dirname, "./assets"),
          "@views": path.resolve(__dirname, "./views")
        }
      },
      // plugins: [
      //   new webpack.ProvidePlugin({
      //     mapboxgl: 'mapbox-gl'
      //   })
      // ]
  },

};
