module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/application.css': 'sass/application.scss'
        },
        options: {
          includePaths: [
            './bower_components/bourbon/app/assets/stylesheets'
          ]
        }

      }
    },
    watch: {
      source: {
        files: ['sass/**/*.scss', '*.html'],
        tasks: ['sass'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass']);
};