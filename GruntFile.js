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
    }
  });

  grunt.loadNpmTasks('grunt-http-server');

  grunt.registerTask('dev', ['http-server']);
}
;
