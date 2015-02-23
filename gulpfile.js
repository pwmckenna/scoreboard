var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var nodemon = require('gulp-nodemon');
var nodeInspector = require('gulp-node-inspector');

var browserifyTask = function (options) {

    // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: options.development, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
    });

    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.development, livereload()))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }
            
    rebundle();
}

var cssTask = function (options) {
    if (options.development) {
        var run = function () {
            console.log(arguments);
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('main.css'))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));   
    }
}

var DEBUG_PORT = 5858;


// Starts our development workflow
gulp.task('default', function () {
    browserifyTask({
        development: true,
        src: './app/main.jsx',
        dest: './build'
    });
    
    cssTask({
        development: true,
        src: './styles/**/*.css',
        dest: './build'
    });

    nodemon({
        script: 'server.js',
        ext: 'js jsx ejs',
        env: {
            PORT: 3000
        },
        nodeArgs: ['--debug=' + DEBUG_PORT]
    });

    gulp.src([]).pipe(nodeInspector({
        debugPort: 5858,
        webHost: '0.0.0.0',
        webPort: 8080,
        saveLiveEdit: false,
        preload: true,
        inject: true,
        hidden: [],
        stackTraceLimit: 50,
        sslKey: '',
        sslCert: ''
    }));    
});

gulp.task('deploy', function () {
    browserifyTask({
        development: false,
        src: './app/main.jsx',
        dest: './dist'
    });
    
    cssTask({
        development: false,
        src: './styles/**/*.css',
        dest: './dist'
    });
});
