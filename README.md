# gulp-grunt-practice
This is a practice project to compare the two libraries: Gulp & Grunt.
More details will follow!

## gulp-sourcemaps: 
Sourcemaps are a way to map a combined/minified file back to an unbuilt state. They hold information about your original files when you're running a set of tasks like minification, compression, or other things that could change your code. When you're debugging code in your browser but the codebase has been transformed and bundled, sourcemaps help the browser match the transformed code to the original source code. This makes debugging a lot easier.

## gulp-postcss: 
PostCSS is a tool for transforming CSS with JavaScript. It's a node.js module that parses CSS into an abstract syntax tree (AST); passes it through a series of plugins, and then converts it back into a string, which you can output to a file. It's used by industry leaders including Wikipedia, Twitter, Alibaba, and JetBrains. The PostCSS community has authored hundreds of innovative plugins. In this case, it's being used with autoprefixer and cssnano.

## autoprefixer: 
It uses data from Can I Use to automatically add necessary CSS vendor prefixes. For example, you write display: flex; and it adds -webkit- and -ms- prefixes automatically when needed.

## cssnano: 
It's a modular minifier that aims to utilise small modules from the PostCSS ecosystem, rather than being an all-encompassing module that may be difficult to contribute to. It compresses your CSS files for production.
