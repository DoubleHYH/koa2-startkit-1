const gulp = require('gulp')
const babel = require('gulp-babel')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const { exec } = require('child_process')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

const reload = browserSync.reload

gulp.task('es6', function() {
    gulp.src('static_src/es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/javascripts'))
})

gulp.task('stylus', function() {
    gulp.src('static_src/style.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true,
            'compress': false
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(reload({ stream: true }))
})

gulp.task('build', ['stylus', 'es6'])

gulp.task('default', ['build'], function() {
    browserSync.init({ proxy: 'localhost:8080' })
    gulp.watch('static_src/**/*.styl', ['stylus'])
    gulp.watch('static_src/**/*.js', ['es6'])
})

