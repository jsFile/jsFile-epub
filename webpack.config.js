module.exports = {
    // webpack options
    entry: "./src/index.js",
    output: {
        path: "dist/",
        filename: "jsfile-epub.js",
        library: ["JsFileEpub"],
        libraryTarget: "umd"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },

    externals: [
        {
            "JsFile": {
                root: "JsFile",
                commonjs2: "JsFile",
                commonjs: "JsFile",
                amd: "JsFile"
            }
        }
    ],

    stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },

    progress: false
};