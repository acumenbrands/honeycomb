module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('bower.json'),
    concat: {
      options: {
        seperator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%=pkg.name%>.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/<%=pkg.name%>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat', 'uglify']);
}
