const { src, dest, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

const base = '2-Build_a_Survey_Form' + '/**/*.pug';
const dist = '2-Build_a_Survey_Form' + '/dist/';

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
  return src(base)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest(dist))
    .pipe(browserSync.stream());
};

const watching = () => {
  watch(base, pughtml).on('change', browserSync.reload);
  watch(dist + '**/*.css').on('change', browserSync.reload);
};

exports.browsersync = browsersync;
exports.pughtml = pughtml;
exports.watching = watching;

exports.default = parallel(pughtml, browsersync, watching);
