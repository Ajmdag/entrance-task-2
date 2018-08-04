const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// Компиляция sass
gulp.task('styles', () => {
  return gulp
    .src('./src/sass/main.sass')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpIf(!isDevelopment, cleanCSS({ compatibility: 'ie8' })))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./dist/styles'));
});

// Копирование файлов из папки assets
gulp.task('assets', () => {
  return gulp.src('./src/assets/**/**')
    .pipe(gulp.dest('./dist', { prefix: 2 }));
});

// Компилияция pug
gulp.task('pug', () => {
  return gulp.src('./src/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'));
});

// Удаление папки для публикации проекта (dist)
gulp.task('clean', () => {
  return del('dist');
});

gulp.task('scripts', () => {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(browserify({ debug: true }))
    .pipe(gulp.dest('./dist/js'));
});

// Слежка => перекомпиляция и копирование при изменении
gulp.task('watch', () => {
  gulp.watch('./src/sass/**/**', gulp.series('styles'));
  gulp.watch('./src/pug/**/**', gulp.series('pug'));
  gulp.watch('./src/assets/**/**', gulp.series('assets'));
  gulp.watch('./src/js/**/**', gulp.series('scripts'));
});

// Запуск локального сервера browserSync
gulp.task('serve', () => {
  browserSync.init({
    server: './dist'
  });

  browserSync.watch('./dist/**/**').on('change', browserSync.reload);
});

gulp.task('dev', gulp.parallel('pug', 'styles', 'assets', 'scripts'));

gulp.task('default', gulp.series(
  'clean', 'dev', gulp.parallel('watch', 'serve'))
);
