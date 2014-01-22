/**
 * User: thomas.vo
 * Date: 1/22/14
 * Time: 1:36 AM
 *
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'public/style/style.css' : 'public.dev/sass/style.sass'
        }
      }
    },
    watch: {
      css: {
        files: 'public.dev/**/*.sass',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
};