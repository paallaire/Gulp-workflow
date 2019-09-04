var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    styleguide = require('sc5-styleguide');

// Paths
var paths = {
    src: 'assets',
    dist: 'dist',
    styleguide: 'styleguide'
};

// =================================================
// Styles
// =================================================

// Cette tâche va générer les styles du projet à partir des fichiers sass importé dans src/styles/styles.scss 

gulp.task('styles', function () {
    return gulp.src(paths.src + '/styles/test.scss')
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(cssnano()) // Minification des CSS
        .pipe(gulp.dest(paths.styleguide + '/assets/css/'));
});


// =================================================
// Styleguide
// =================================================

// Tâche pour générer le styleguide (dossier styleguide dans l'arborescence du projet)
gulp.task('styleguide:generate', function () {
    return gulp.src(paths.src + '/styles/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Mon Styleguide', // Titre du styleguide
        server: true,
        rootPath: paths.styleguide, // Chemin du dossier de destination du styleguide
        overviewPath: 'styleguide.md', // Chemin du fichier markdown qui alimentera la première page de votre styleguide "Overview"
        disableEncapsulation: true,
        showReferenceNumbers: true,
        // Liste des balises que l'on souhaite ajouter dans le head du fichier index.html généré par SC5-Styleguide, dans cet exemple nous importons les fichiers javascript de UIkit
        extraHead: [
            '<script src="/assets/js/uikit.min.js"></script>',
            '<script src="/assets/js/uikit-icons.min.js"></script>'
        ]
    }))
    .pipe(gulp.dest(paths.styleguide));
});

// Tâche qui va générer les styles CSS a appliqué au styleguide
gulp.task('styleguide:applystyles', function() {
    return gulp.src(paths.src + '/styles/test.scss')
    .pipe(sass({
        includePaths: ['node_modules'],
        errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide));
});

// Tâche à lancer dans la console pour builder le styleguide à déployer sur votre serveur (gulp styleguide)
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);


// Watch Task - Met à jour automatiquement le styleguide lorsque vous faites des modifications dans les fichiers SASS, LESS ou PostCSS
gulp.task('watch', ['styleguide'], function() {
    // Start watching changes and update styleguide whenever changes are detected
    // Styleguide automatically detects existing server instance
    gulp.watch([paths.src + '/styles/**/*.scss'], ['styleguide']);
});
