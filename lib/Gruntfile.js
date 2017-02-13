module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      js: {
        src: ['../javascripts/main.js'],
        dest: '../dist/app.js'
      },
      options: {
        transform: ["hbsfy"],
        browserifyOptions: {
          paths: [
            "./node_modules"
          ]
        }
      }
    },
     copy: { //for bootstrap and jquery - only need to do the first time.
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist',
        src: ['**'],
        dest: '../dist'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist',
        src: ['jquery.min.js'],
        dest: '../dist'
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$" ],
        esnext: true,
        globalstrict: true,
        browserify: true
      },
      files: ['../javascripts/**/*.js']
    },
   /* sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/main.scss'
        }
      }
    }, */
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};