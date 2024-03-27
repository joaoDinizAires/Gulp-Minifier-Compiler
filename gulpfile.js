
const { src, task, dest, watch, parallel } = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    path = require('path'),
    sourceMaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

// você pode usar o prefixo '_' para arquivos scss que não deseja compilar em sua build

const sassPath = path.join(__dirname, 'src/scss/*.scss'),
    cssPath = path.join(__dirname, 'build/css/main.css'),
    jsPath = path.join(__dirname, 'src/scripts/*.js'),
    jsBuildPath = path.join(__dirname, 'build/scripts'),
    imgPath = path.join(__dirname, 'src/img/.*{png,jpg,jpeg,gif}'),
    imgPathBuild = path.join(__dirname, 'build/img');
task('sassCompiler', () => {
    return src(sassPath)
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(dest(cssPath));

});

task('minifyJs', () => {
    return src(jsPath)
        .pipe(uglify())
        .pipe(dest(jsBuildPath));

});

task('imagemin', () => {
    return src(imgPath)
        .pipe(imagemin())
        .pipe(dest(imgPathBuild));
});
task('watch', () => {
    watch(sassPath, parallel('sassCompiler'));
    watch(jsPath, parallel('minifyJs'));
    watch(imgPath, parallel('imagemin'));
});

task('default', parallel('sassCompiler', 'minifyJs', 'imagemin', 'watch'));