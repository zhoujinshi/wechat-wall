var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

// 语法检查
/*gulp.task('jshint', function () {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});*/

// 合并文件之后压缩代码
gulp.task('minify', function () {
    return gulp.src('./js/*/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist'));
});

// 編譯 Sass
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch('./js/*/*.js', ['minify']);
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// 注册缺省任务
gulp.task('default', ['minify', 'sass', 'watch']);