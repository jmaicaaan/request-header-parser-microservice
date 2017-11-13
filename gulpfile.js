const gulp = require('gulp');
const gulpTemplate = require('gulp-template');
const gulpRename = require('gulp-rename');
const gulpInsert = require('gulp-insert');
const gulpRemove = require('gulp-delete-lines');
const del = require('del');
const path = require('path');
const yargs = require('yargs');

let root = 'app';
let resolveToHandlers = () => {
  return path.join(root, 'handlers');
};
let handlerRootFile = path.join(resolveToHandlers(), 'index.js');
let paths = {
  handler: path.join(__dirname, 'generator', 'handler/*.**')
};

gulp.task('create-handler-file', () => {
  const name = yargs.argv.name;
  const destPath = path.join(resolveToHandlers(), name);

  return gulp.src(paths.handler)
    .pipe(gulpTemplate({
      name: name
    }))
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath))
});

gulp.task('add-handler', ['create-handler-file'], () => {
  const name = yargs.argv.name;
  const destPath = path.join(resolveToHandlers());
  const line = `\nexport * from './${name}/${name}.handler';`

  return gulp.src(handlerRootFile)
    .pipe(gulpInsert.append(line))
    .pipe(gulp.dest(destPath))
});

gulp.task('remove-handler', ['remove-handler-folder'], () => {
  const name = yargs.argv.name;
  const destPath = path.join(resolveToHandlers());
  let regex = new RegExp(name, 'gi');

  return gulp.src(handlerRootFile)
    .pipe(gulpRemove({
      'filters': [
        regex
      ]
    }))
    .pipe(gulp.dest(destPath))
});

gulp.task('remove-handler-folder', (cb) => {
  const name = yargs.argv.name;
  const handlerFolder = path.join(resolveToHandlers(), name);
  del([handlerFolder]).then((paths) => {
    cb();
  });
});