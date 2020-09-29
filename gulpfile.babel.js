const gulp = require('gulp'),
  docs = '.',
  distDir = docs + '/dist',
  srcDir = docs + '/src',
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  mozjpeg = require('imagemin-mozjpeg'),
  changed = require('gulp-changed'),
  nNotify = require('node-notifier'),
  notify = require('gulp-notify'),
  fs = require('fs');

  //png
gulp.task('png', () => {
  return gulp.src(srcDir + '/**/*.png')
    .pipe(changed(distDir))
    .pipe(imagemin([
      pngquant({
        quality: [.8, 1],
        speed: 1,
        floyd: 0,
      }),
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest(distDir))
    .pipe(notify('(｀・ω・) <%= file.relative %> を圧縮したよ!!'));
});

//jpg
gulp.task('jpg', () => {
  return gulp.src(srcDir + '/**/*.jpg')
    .pipe(changed(distDir))
    .pipe(imagemin([
      mozjpeg({
        quality: 85,
        progressive: true
      }),
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest(distDir))
    .pipe(notify('(｀・ω・) <%= file.relative %> を圧縮したよ!!'));
});

//svg
gulp.task('svg', () => {
  return gulp.src(srcDir + '/**/*.svg')
    .pipe(changed(distDir))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
    ]))
    .pipe(gulp.dest(distDir))
    .pipe(notify('(｀・ω・) <%= file.relative %> を圧縮したよ!!'));
});

//gif
gulp.task('gif', () => {
  return gulp.src(srcDir + '/**/*.gif')
    .pipe(changed(distDir))
    .pipe(imagemin([
      imagemin.gifsicle()
    ]))
    .pipe(imagemin())
    .pipe(gulp.dest(distDir))
    .pipe(notify('(｀・ω・) <%= file.relative %> を圧縮したよ!!'));
});

//それ以外はこぴー
gulp.task('cp', () => {
  return gulp.src([srcDir + '/**/*.*', '!' + srcDir + '/**/*.{png,jpg,gif,svg}'])
    .pipe(changed(distDir))
    .pipe(gulp.dest(distDir))
    .pipe(notify('(｀・ω・) <%= file.relative %> は圧縮できないので移動!!'));
});

gulp.task('fs', (done) => {
  nNotify.notify({
    title: 'Compression complete !!',
    message: '圧縮した',
    icon: './ico.png',
    sound: 'Glass',
  })
  done()
});



gulp.task('imgCompressor', gulp.series('cp', 'jpg', 'svg', 'png', 'gif', 'fs'));
