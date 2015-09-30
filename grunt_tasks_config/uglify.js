module.exports = function () {
    return {
        options: {
            compress: true,
            report: false
        },
        engine: {
            'src': 'dist/jsfile-epub.js',
            'dest': 'dist/jsfile-epub.min.js'
        }
    };
};