const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const { VueLoaderPlugin } = require("vue-loader");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const config = require("./config.json");

const devMode = process.env.NODE_ENV !== "production";

// Naming and path settings
var appName = "app";
var entryPoint = {
  admin: ["./src/admin/main.js", "./src/admin/scss/admin.scss"],
  style: ["./src/global/scss/style.scss"],
};

var exportPath = path.resolve(__dirname, "./assets/js");

const cleanGeneratedAssets = () => {
  for (const relPath of ["./assets/js", "./assets/css"]) {
    const target = path.resolve(__dirname, relPath);
    if (!fs.existsSync(target)) {
      continue;
    }

    for (const entry of fs.readdirSync(target)) {
      const fullPath = path.join(target, entry);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  }
};

cleanGeneratedAssets();

// Enviroment flag
var plugins = [];

// extract css into its own file
plugins.push(
  new MiniCssExtractPlugin({
    filename: "../css/[name].css",
    chunkFilename: "../css/[id].css",
    ignoreOrder: false,
  }),
);

if (devMode) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

plugins.push(
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  }),
);

// enable live reload with browser-sync
// set your WordPress site URL in config.json
// file and uncomment the snippet below.
// --------------------------------------
// plugins.push(new BrowserSyncPlugin( {
//   proxy: {
//     target: config.proxyURL
//   },
//   files: [
//     '**/*.php'
//   ],
//   cors: true,
//   reloadDelay: 0
// } ));

plugins.push(new VueLoaderPlugin());

// Differ settings based on production flag
if (devMode) {
  appName = "[name].js";
} else {
  appName = "[name].min.js";
}

module.exports = {
  entry: entryPoint,
  mode: devMode ? "development" : "production",
  output: {
    path: exportPath,
    filename: appName,
    chunkFilename: "[name].js",
    clean: true,
  },
  externals: {
    jquery: "jQuery",
    underscore: "_",
    backbone: "Backbone",
    "@wordpress/i18n": "wp.i18n",
  },
  resolve: {
    fallback: {
      // "fs": require.resolve("browserify-fs"),
      // "path": require.resolve("path-browserify")
      fs: false,
      path: false,
    },
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js",
      "@": path.resolve("./src/"),
      admin: path.resolve("./src/admin/"),
    },
    modules: [
      path.resolve("./node_modules"),
      path.resolve(path.join(__dirname, "src/")),
    ],
  },

  optimization: {
    runtimeChunk: "single",
    chunkIds: "named",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
  },

  plugins,

  devtool: devMode ? "eval-cheap-module-source-map" : false,

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "../images",
            publicPath: (url, resourcePath) => {
              if (resourcePath.includes("node_modules")) {
                return url;
              }
              const rel = path.relative(path.dirname(resourcePath), __dirname);
              return path.posix
                .join(rel, "assets/images", url)
                .replace(/\\/g, "/");
            },
          },
        },
      },
      {
        test: /\.svg$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "../icons",
            publicPath: (url, resourcePath) => {
              if (resourcePath.includes("node_modules")) {
                return url;
              }
              const rel = path.relative(path.dirname(resourcePath), __dirname);
              return path.posix
                .join(rel, "assets/icons", url)
                .replace(/\\/g, "/");
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
        ],
      },
    ],
  },
};
