const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function libs() {
    return gulp.src(['./src/libs/pixijs/*'])
    .pipe(gulp.dest('./build/libs/pixijs'))
}

function texture() {
    return gulp.src('./src/textures/*')
        .pipe(gulp.dest('./build/textures'))
}

function htmls() {
    return gulp.src('./src/index.html')
                .pipe(gulp.dest('./build'));
}

function styles() {
    return gulp.src('./src/css/style.css')
                .pipe(autoprefixer({
                    overrideBrowserlist: ['> 1%'],
                    cascade: false
                }))
		        .pipe(gulp.dest('./build/css'));
}

function scripts() {
	return gulp.src(['./src/js/main.js', './src/js/setupFunction.js', './src/js/additionalFunctions.js'])
				.pipe(concat('script.js'))
				.pipe(babel({
		            presets: ['@babel/env']
                }))
                .pipe(uglify())
				.pipe(gulp.dest('./build/js'));
}

function watch() { 
    gulp.watch('./src/*.html', htmls);
	gulp.watch('./src/css/**/*.css', styles);
	gulp.watch('./src/js/**/*.js', scripts);
}

async function build() {
    await libs();
    await texture();
    await htmls();
    await styles();
    await scripts();
}

gulp.task('htmls', htmls);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', build);