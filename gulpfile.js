const gulp = require('gulp')
const babel = require('gulp-babel')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const { exec } = require('child_process')
const browserSync = require('browser-sync').create()

const reload = browserSync.reload

gulp.task('es6', () => {
    gulp.src('./src/es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./public/javascripts'))
})

gulp.task('stylus', () => {
    gulp.src('./src/stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true,
            'compress': false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/stylesheets'))
        .pipe(reload({ stream: true }))
})

gulp.task('default', ['stylus', 'es6'], () => {
    browserSync.init({
        proxy: 'localhost:8080'
    })
    gulp.watch('./src/stylus/**/*.styl', ['stylus'])
    gulp.watch('./src/es6/**/*.js', ['es6'])
    gulp.watch('./public/javascripts/**/*.js', () => reload())
})
