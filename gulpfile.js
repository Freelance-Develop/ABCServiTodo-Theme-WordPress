// Imports
var gulp = require( 'gulp' ),

    sass = require( 'gulp-sass' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    rename = require( 'gulp-rename' ),
    browsersync = require( 'browser-sync' ) .create(),
    wppot = require( 'gulp-wp-pot' ),
    babel = require( 'gulp-babel' )
    concat = require( 'gulp-concat' ),
    stripdebug = require( 'gulp-strip-debug' ),
    uglify = require( 'gulp-uglify' ),
    imagemin = require( 'gulp-imagemin' ),
    minifyCSS = require('gulp-csso');

// Variables
const WORDPRESS = {
  localDomain : 'http://localhost/projects/abcservitodo.wp/',
  textdomain  : 'jt-abcservitodo',
  admin       : 'Juan Carlos Jiménez Gutiérrez <jcjimenez29@misena.edu.co>',
  team        : 'Juan Carlos Jiménez Gutiérrez <jcjimenez29@misena.edu.co>'
}

const PATHS = {
  styles: {
    src  : './src/assets/scss/**/*.scss',
    dest : './dist/assets/css/',
    min  : './dist/assets/css/*.min.css'
  },
  php: {
    src : './**/*.php'
  },
  scripts: {
    src  : './src/assets/js/*.js',
    dest : './dist/assets/js/'
  },
  images: {
      src  : [
          './src/assets/images/*.{jpg,jpeg,png,gif,svg}',
          '!./src/assets/images/full-stack.jpeg',
          '!./src/assets/images/productos/'
      ],
      dest : './dist/assets/images/'
  },
  vendors: {
      normalize: {
          src  : './node_modules/normalize.css/normalize.css',
          dest : './dist/assets/vendor/'
      }
  }
};

const BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];
// Task: Normalize
function normalize() {
    return gulp .src( PATHS . vendors . normalize .src )
      .pipe( minifyCSS() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( gulp .dest( PATHS .vendors .normalize .dest ) );
}
// Tasks: Convert Sass to CSS
function scss() {
  return gulp .src( PATHS .styles .src )
    .pipe( sass( { outputStyle: 'compressed' } ) .on( 'error', sass .logError ) )
    .pipe( sourcemaps .init() )
    .pipe( autoprefixer( { browsers: BROWSERS } ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( sourcemaps .write( './' ) )
    .pipe( gulp .dest( PATHS .styles .dest ) );
}
// Tasks: Live Server
function browser() {
    var files = [
      PATHS .styles .min,
      PATHS .scripts .src,
      PATHS .images .src,
      PATHS .php .src
    ];

    browsersync .init( files, {
        proxy: WORDPRESS .localDomain,
        open: false
    });

    watchFiles();

    //watch('./sass/**/*.scss', css);
    //watch('./js/*.js', js).on('change', browserSync.reload);
}
// Task: Concatena y Minifica archivos JavaScript
function scripts() {
    return gulp .src( PATHS .scripts .src, { sourcemaps: true } )
        .pipe( babel({
            presets: [ '@babel/env' ]
        }))
        .pipe( concat( 'build.js' ) )
        .pipe( stripdebug() )
        .pipe( gulp .dest( PATHS .scripts .dest, { sourcemaps: true } ) )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp .dest( PATHS .scripts .dest, { sourcemaps: true } ) );
}
// Task: Minificación de imágenes
function images() {
    return gulp .src( PATHS .images .src, { allowEmpty: true } )
        .pipe( imagemin() )
        .pipe( gulp .dest( PATHS .images .dest ) );
}

// Task: Generate Tranlation File
function wpot() {
	return gulp .src( PATHS .php .src )
		.pipe( wppot( {
				domain: WORDPRESS .textdomain,
				lastTranslator: WORDPRESS .admin,
				team: WORDPRESS .team
			})
		)
		.pipe( gulp .dest( './languages/' + WORDPRESS .textdomain + '.pot' ) )
}

function watchFiles() {
  gulp .watch( PATHS .styles .src, gulp .parallel( scss ) ) ;
  gulp .watch( PATHS .scripts .src, gulp .parallel( scripts ) ) ;
  gulp .watch( PATHS .images .src, gulp .parallel( images ) ) .on( 'change', browsersync .reload );
}

// Exports
exports .default = gulp .series(
    images,
    gulp .parallel( normalize, scss ),
    gulp .parallel( scripts ),
    wpot,
    browser
);
