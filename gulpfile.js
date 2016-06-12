const gulp = require('gulp')
const babel = require('gulp-babel')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

const reload = browserSync.reload

gulp.task('serve', ['stylus'], function() {
    browserSync.init({
        proxy: 'localhost:8080'
    })
    gulp.watch('./src/stylus/**/*.styl', ['stylus'])
    gulp.watch('./src/es2015/**/*.js', ['es2015-watch'])
})

gulp.task('es2015-watch', ['es2015'], function() {
    reload()
})

gulp.task('es2015', function() {
    return gulp.src('./src/es2015/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/javascripts'))
})

gulp.task('stylus', function() {
    return gulp.src('./src/stylus/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true,
            'compress': false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/stylesheets'))
        .pipe(reload({ stream: true }))
})

gulp.task('default', ['serve'])

