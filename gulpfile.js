const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
useref = require('gulp-useref');

const base = '3-Product_Landing_Page/src/';
const dist = '3-Product_Landing_Page' + '/dist';

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: dist,
    },
    port: 3000,
    notify: false,
  });
};

const pughtml = () => {
  return src(base + 'pug/index.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest(dist))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src(base + '/scss/main.scss')
    .pipe(
      sass({
        outputStyle: 'expanded',
        includePath: ['./node_modules'],
      })
    )
    .pipe(
      autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })
    )
    .pipe(useref())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(dist + '/css'))
    .pipe(browserSync.stream());
};

const watching = () => {
  watch(base, pughtml).on('change', browserSync.reload);
  watch(base + 'scss/**/*.scss', styles);
  watch(dist + '/css/*.css').on('change', browserSync.reload);
};

exports.browsersync = browsersync;
exports.pughtml = pughtml;
exports.watching = watching;
exports.styles = styles;

exports.default = parallel(pughtml, browsersync, styles, watching);
