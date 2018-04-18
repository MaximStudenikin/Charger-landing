'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');

//var sass
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaCSSQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');
const autoPref = require('gulp-autoprefixer');
const pxtorem = require('postcss-pxtorem');

const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

//html
const pug = require('gulp-pug');

//img
const image = require('gulp-image');

//js
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

//del
const del = require('del');

//server
const browserSync = require('browser-sync').create();

//paths
const paths = {
	build: './build/',       //Готовый продукт
	dev: './dev/',          //Все наше сокровище
	src: './source/' //исходники для работы (шрифты, картинки и тд)
};

function html() {
	return gulp.src(paths.dev + 'page/index.pug')
		.pipe(plumber())
		.pipe(pug({ pretty: true }))                  //pretty: true убирает что бы index был читаймым
		// .pipe(rename({ basename: "index" }))
		.pipe(rename({ dirname: "" }))
		.pipe(gulp.dest(paths.build))
}

function style() {
	return gulp.src(paths.dev + '/scss/main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(groupMediaCSSQueries())
		.pipe(cleanCSS())
		// .pipe(autoPref({
		//     browsers: ['last 15 versions'],
		//     cascade: false
		// }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(paths.build + 'css/'))
}


//js
function script() {
	return gulp.src(paths.dev + 'js/*.js')
		// .pipe(plumber())
		// .pipe(babel({
		// 	presets: ['env']
		// }))
		// .pipe(uglify())
		.pipe(gulp.dest(paths.build + 'js/'))
}

//img
function img() {
	return gulp.src(paths.src + 'img/**/*.{jpg,png}')
		.pipe(image({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			guetzli: false,
			gifsicle: true,
			svgo: true,
			concurrent: 10
		}))
		.pipe(gulp.dest(paths.build + 'img/'))
}

//fonts
function font() {
	return	gulp.src(paths.src + 'fonts/*')
	.pipe(gulp.dest(paths.build + 'fonts/'))
}

function remov() {
	return del('./build/')
}

//watch
function watch() {
	gulp.watch(paths.dev + 'page/**/*.pug', html);
	gulp.watch(paths.dev + '/**/*.scss', style);
	gulp.watch(paths.dev + 'js/*.js', script);
}


function serve() {

	browserSync.init({
		server: {
			baseDir: paths.build
		},
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		port: 3000,
		browser: "chrome",
		online: true
	});
	browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.html = html;
exports.style = style;
exports.script = script;
exports.font = font;
exports.img = img;
exports.remov = remov;
exports.watch = watch;

gulp.task('build', gulp.series(
	remov,
	html,
	font,
	style,
	script
));

gulp.task('default', gulp.series(
	remov,
	gulp.parallel(style, script, html, font, img),
	gulp.parallel(watch, serve)
));