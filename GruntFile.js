module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });
  grunt.initConfig({
    'http-server': {
      dev: {
        root: '.',
        port: 8080,
        showDir: true,
        autoIndex: true,
        defaultExt: 'html'
      }
    },
    jasmine: {
      test: {
        src: 'src/DomWidgets.js',
        options: {
          specs: 'test/*.spec.js',
          helpers: 'test/*.helper.js',
          template: require('grunt-template-jasmine-requirejs'),
          host: 'http://127.0.0.1:<%= connect.test.port %>/',
        }
      }
    },
    connect: {
      test: {
        port: 8000,
        base: '.'
      }
    }
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('dev', ['http-server']);

  grunt.registerTask('test', function(subTask) {
    var taskList = [
      'connect',
      ['jasmine', subTask].join(':')
    ];
    grunt.task.run(taskList);
  });

};
