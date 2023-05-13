module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/styles',
          src: ['*.scss'],
          dest: 'dist/styles',
          ext: '.css'
        }]
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/scripts/main.js': 'src/scripts/main.js'
        }
      }
    },
    concat: {
      dist: {
        src: ['dist/scripts/main.js'],
        dest: 'dist/scripts/main.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/scripts/main.min.js': ['dist/scripts/main.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['babel', 'concat', 'uglify']
      },
      css: {
        files: ['src/styles/*.scss'],
        tasks: ['sass']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'babel', 'concat', 'uglify', 'watch']);
}