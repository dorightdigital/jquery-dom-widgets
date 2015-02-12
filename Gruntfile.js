module.exports = function (grunt) {

  grunt.initConfig({
    jslint: {
      all: {
        src: [
          'src/**/*.js',
          'test/**/*.js'
        ],
        directives: {
          browser: true,
          indent: 2,
          predef: [
            'jQuery'
          ]
        }
      }
    },
    watch: {
      files: ['src/**/*.js', 'test/**/*.js'],
      tasks: ['jasmine', 'jslint']
    },
    jasmine: {
      all: {
        src: ['jquery-*.js', 'src/**/*.js'],
        options: {
          specs: 'test/**/*_spec.js',
          helpers: 'test/**/*_helper.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jslint', 'jasmine']);
  grunt.registerTask('dev', ['test', 'watch']);
  grunt.registerTask('default', ['watch']);

};