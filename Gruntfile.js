
module.exports = function (grunt) {
    var path = require('path');
    var currentDir = process.cwd();

    var watchJsFiles, watchJsFiles,  watchKarmaFiles, watchFrameworkFiles;
	watchJsFiles = [
        'Gruntfile.js',
        'src/**/*.js',
        'js/**/*.ts',
        'index.html',
        'package.json'
    ];

	//watchKarmaFiles = ['test/**/*.js'];

    var jsHint = require('./grunt/jsHint');
    var less = require('./grunt/less');
    var uglify = require('./grunt/uglify');
    var webpackConfig = require('./webpack.config.js');


    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: less.task.dev,
            prod: less.task.prod
        },
        uglify: {
            app: uglify.task.app,
            vendor: uglify.task.vendor
        },
//        karma: {
//            single: {
//                configFile: 'karma.conf.js',
//                singleRun: true
//            },
//            watch_bg: {
//                configFile: 'karma.conf.js',
//                singleRun: false,
//                autoWatch: true,
//                background: true
//            }
//        },
        jshint: {
            app: jsHint.files,
            options: jsHint.options
        },
        watch: {
            less: {
                files: less.files,
                tasks: ['less'],
                //options: {cwd: {files: 'static/'}} // allow grunt to work from outer directory
            },
            webpack_main: {
                files: watchJsFiles,
                tasks: ['jshint:app', 'webpack:app', 'uglify:app', 'uglify:vendor'],
                options: {cwd: {files: 'static/'}}
            }
        },
        webpack: {
            app: {
                entry: 'src/index.ts',
                output: {
                    filename: 'app.full.js',
                    path: path.join(currentDir, 'dist')
                },
                resolveLoader: webpackConfig.resolveLoader,
                resolve: webpackConfig.resolve,
                plugins: [
                    webpackConfig.plugins.provide,
                    webpackConfig.plugins.vendorChunks
                ],
                module: webpackConfig.module,
                stats: 'minimal',
                //devtool: 'source-map',
                //progress: true
            },
        }
    };
    grunt.initConfig(gruntConfig);


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-webpack');

//    grunt.registerTask('watch-add-karma', 'Adding karma to watch task', function () {
//        grunt.config.merge({
//            watch: {
//                karma: {
//                    files: watchKarmaFiles,
//                    tasks: ['karma:single'],
//                    options: {cwd: {files: 'static/'}}
//                }
//            }
//        });
//    });

    var buildOnly = ['jshint', 'less', 'webpack:app', 'uglify'];
    // default task: lint, CSS, pack, minify and test
    //grunt.registerTask('default', buildOnly.concat(['karma:single']));
    grunt.registerTask('default', buildOnly);
    grunt.registerTask('and-watch', buildOnly.concat(['watch']));
};
