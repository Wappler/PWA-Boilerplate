// Initialise Modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// File path variables
const files = {
    scssPath: '_src/scss/**/*.scss',
    cssDist: './bootstrap/4/css/',
}

// Sass task
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(files.cssDist));
}

// Watch task
function watchTask() {
    watch([files.scssPath],
        parallel(scssTask));
}

// Default task
exports.default = series(
    parallel(scssTask),
    watchTask
);