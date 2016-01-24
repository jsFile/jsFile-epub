var filesToValidate = [
    'src/**/*.js',
    'tests/unit/**/*.js'
];

module.exports = function (grunt) {
    grunt.initConfig({
        webpack: {
            app: require('./webpack.config.js')
        },
        eslint: {
            app: filesToValidate
        },
        jscs: {
            src: filesToValidate
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-blobify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /**
     * include tasks
     */
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve(__dirname + '/grunt_tasks_config'),
        fileExtensions: ['js']
    }, function (err) {
        grunt.log.error(err);
    });

    grunt.registerTask('build', [
        'copy',
        'jscs',
        'eslint',
        'webpack',
        'uglify'
    ]);
};