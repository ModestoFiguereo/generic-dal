/* eslint-disable */
import gulp from 'gulp';
import babel from 'gulp-babel';
import shell from 'gulp-shell';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import rimraf from 'rimraf';

/**
 * Where compiled files go.
 * NOTE: Do not edit anything here. Changes will be deleted upon next build.
 * @type {String}
 */
const TMP_DIR = '.tmp';

/**
 * Where test files go.
 * @type {String}
 */
const TEST_DIR = 'test';

/**
 * Where source code goes.
 * @type {String}
 */
const SOURCE_DIR = 'src';

/**
 * Test files.
 * @type {String}
 */
const TEST_FILES = `${TEST_DIR}/**/*.test.js`;
const TEST_DIR_CONTENT = `${TEST_DIR}/**/*.js`;

/**
 * Source files.
 * @type {String}
 */
const SOURCE_FILES = `${SOURCE_DIR}/**/*.js`;

/**
 * Holds all files.
 * @type {Array}
 */
const FILES = []
.concat(TEST_FILES)
.concat(TEST_DIR_CONTENT)
.concat(SOURCE_FILES);

/**
 * `gulp default`
 * An alias for `test` task.
 */
gulp.task('default', ['test'], () => {
});

/**
 * `gulp test`
 * Runs test files.
 */
gulp.task('test/unit', ['compile'], shell.task([
  `blue-tape ${TMP_DIR}/${TEST_FILES} | faucet`,
]));

/**
 * `gulp compile`
 * Compiles ES6 files into ES5.
 */
gulp.task('compile', ['lint', 'clean'], () => {
  return gulp.src(FILES, {base: '.'})
  .pipe(babel())
  .pipe(rename((p) => p.extname = '.js'))
  .pipe(gulp.dest(TMP_DIR));
});

/**
 * `gulp lint`
 * Checks ES6 files for syntax errors.
 */
gulp.task('lint', () => {
  const filesToLint = FILES.concat([
    'gulpfile.babel.js',
  ]);

  return gulp.src(filesToLint)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

/**
 * `gulp clean`
 * Deletes temporal directory.
 */
gulp.task('clean', (done) => {
  rimraf(TMP_DIR, done);
});

gulp.on('err', (e) => {
  console.log(e.err.stack);
});
