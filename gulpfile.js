var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    tslint = require('gulp-tslint'),
    tsconfig = require('./tsconfig.json');

var srcGlob = ['src/**/*.ts', 'tests/**/*.ts'];

gulp.task('lint', () => {
  return gulp.src(srcGlob)
        .pipe(tslint({
          formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

gulp.task('test', ['lint'], () => {
    gulp.src('dist/tests/**/*.js')
        .pipe(jasmine());
});
