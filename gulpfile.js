var gulp = require('gulp');

var paths = {
	sass: 'src/sass/',
	js: 'src/js/',
	dest: 'dist/',
	icons: 'dist/icons/',
	lang: 'languages/'
};

/**
 * SASS
 */
var sleekSASS = require(__dirname + '/../sleek/gulp/sass.js');

gulp.task('sass', ['icons'], function () {
	return sleekSASS(paths.sass + 'all.scss', paths.dest);
});

gulp.task('sass-only', function () {
	return sleekSASS(paths.sass + 'all.scss', paths.dest);
});

/**
 * Icons
 */
var sleekIcons = require(__dirname + '/../sleek/gulp/icons.js');

gulp.task('rewrite-icon-css', ['download-icons'], function () {
	return sleekIcons.rewriteCSS(paths.icons, paths.sass);
});

gulp.task('download-icons', function () {
	return sleekIcons.download('icons.json', paths.icons);
});

gulp.task('icons', ['rewrite-icon-css']);

/**
 * JS
 */
var sleekJS = require(__dirname + '/../sleek/gulp/js.js');
var sleekJSHint = require(__dirname + '/../sleek/gulp/jshint.js');

gulp.task('js', function () {
	return sleekJS(paths.js, paths.dest);
});

gulp.task('js-hint', function () {
	return sleekJSHint(paths.js);
});

/**
 * Styleguide
 */
var sleekStyleguide = require(__dirname + '/../sleek/gulp/styleguide.js');

gulp.task('styleguide', function () {
	return sleekStyleguide(paths.sass + 'all.scss', paths.dest);
});


/**
 * GetText
 */
var sleekGetText = require(__dirname + '/../sleek/gulp/gettext.js');

gulp.task('gettext', function () {
	return sleekGetText(paths.lang);
});

/**
 * Watch and default
 */
gulp.task('default', ['sass', 'js', 'gettext', 'styleguide']);

gulp.task('watch', function () {
	gulp.watch(paths.sass + '**/*.scss', ['sass-only']);
	gulp.watch(paths.js + '**/*.js', ['js']);
	gulp.watch('icons.json', ['sass']);
	gulp.watch(paths.lang + '**/*.po', ['gettext']);
});
