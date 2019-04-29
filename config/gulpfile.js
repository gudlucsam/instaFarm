"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
<<<<<<< HEAD
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
=======
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    '\n'
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
].join('');

// BrowserSync
function browserSync(done) {
<<<<<<< HEAD
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
=======
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// BrowserSync reload
function browserSyncReload(done) {
<<<<<<< HEAD
  browsersync.reload();
  done();
=======
    browsersync.reload();
    done();
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// Clean vendor
function clean() {
<<<<<<< HEAD
  return del(["./vendor/"]);
=======
    return del(["./vendor/"]);
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
<<<<<<< HEAD
  // Bootstrap JS
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest('./vendor/bootstrap/js'));
  // Bootstrap SCSS
  var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
    .pipe(gulp.dest('./vendor/bootstrap/scss'));
  // ChartJS
  var chartJS = gulp.src('./node_modules/chart.js/dist/*.js')
    .pipe(gulp.dest('./vendor/chart.js'));
  // dataTables
  var dataTables = gulp.src([
      './node_modules/datatables.net/js/*.js',
      './node_modules/datatables.net-bs4/js/*.js',
      './node_modules/datatables.net-bs4/css/*.css'
    ])
    .pipe(gulp.dest('./vendor/datatables'));
  // Font Awesome
  var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
    .pipe(gulp.dest('./vendor'));
  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./vendor/jquery-easing'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  return merge(bootstrapJS, bootstrapSCSS, chartJS, dataTables, fontAwesome, jquery, jqueryEasing);
=======
    // Bootstrap JS
    var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
        .pipe(gulp.dest('./vendor/bootstrap/js'));
    // Bootstrap SCSS
    var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
        .pipe(gulp.dest('./vendor/bootstrap/scss'));
    // ChartJS
    var chartJS = gulp.src('./node_modules/chart.js/dist/*.js')
        .pipe(gulp.dest('./vendor/chart.js'));
    // dataTables
    var dataTables = gulp.src([
            './node_modules/datatables.net/js/*.js',
            './node_modules/datatables.net-bs4/js/*.js',
            './node_modules/datatables.net-bs4/css/*.css'
        ])
        .pipe(gulp.dest('./vendor/datatables'));
    // Font Awesome
    var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
        .pipe(gulp.dest('./vendor'));
    // jQuery Easing
    var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
        .pipe(gulp.dest('./vendor/jquery-easing'));
    // jQuery
    var jquery = gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ])
        .pipe(gulp.dest('./vendor/jquery'));
    return merge(bootstrapJS, bootstrapSCSS, chartJS, dataTables, fontAwesome, jquery, jqueryEasing);
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// CSS task
function css() {
<<<<<<< HEAD
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
=======
    return gulp
        .src("./scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded",
            includePaths: "./node_modules",
        }))
        .on("error", sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest("./css"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./css"))
        .pipe(browsersync.stream());
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// JS task
function js() {
<<<<<<< HEAD
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js',
    ])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browsersync.stream());
=======
    return gulp
        .src([
            './js/*.js',
            '!./js/*.min.js',
        ])
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'))
        .pipe(browsersync.stream());
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// Watch files
function watchFiles() {
<<<<<<< HEAD
  gulp.watch("./scss/**/*", css);
  gulp.watch("./js/**/*", js);
  gulp.watch("./**/*.html", browserSyncReload);
=======
    gulp.watch("./scss/**/*", css);
    gulp.watch("./js/**/*", js);
    gulp.watch("./**/*.html", browserSyncReload);
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
<<<<<<< HEAD
exports.default = build;
=======
exports.default = build;
>>>>>>> 3815d505150517ef80997cbbc52975add2268ed2
