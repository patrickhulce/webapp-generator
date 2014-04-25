module.exports = function (grunt) {
  var staticFolder = 'www-root';
  var destPrefix = staticFolder + '/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      app: {
        files: [
          {
            dest: destPrefix + 'css/app.css',
            src: ['app/less/**/*.less']
          }
        ]
      }
    },
    copy: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/partials',
            src: '**',
            dest: destPrefix + 'partials'
          },
          {
            src: 'app/index.html',
            dest: destPrefix + 'index.html'
          }
        ]
      }
    },
    concat: {
      vendor: {
        files: [
          {
            dest: destPrefix + 'css/vendor.css',
            src: [
              'bower_components/bootstrap/dist/css/bootstrap.css'
            ]},
          {
            dest: destPrefix + 'js/vendor.js',
            src: [
              'bower_components/jquery/dist/jquery.js',
              'bower_components/angular/angular.js',
              'bower_components/bootstrap/dist/js/bootstrap.js',
              'bower_components/angular-bootstrap/ui-bootstrap.js',
              'bower_components/angular-route/angular-route.js',
              'bower_components/underscore/underscore.js'
            ]
          }
        ]
      },
      app: {
        files: [
          {
            dest: destPrefix + 'js/app.js',
            src: ['app/js/**/*.js']
          }
        ]
      }
    },
    uglify: {
      vendor: {
        files: [
          {
            dest: destPrefix + 'js/vendor.min.js',
            src: destPrefix + 'js/vendor.js'
          }
        ]
      }
    },
    watch: {
      appJs: {
        files: ['app/js/**/*.js'],
        tasks: ['concat:app']
      },
      appLess: {
        files: ['app/less/**/*.less'],
        tasks: ['less']
      },
      appHtml: {
        files: ['app/index.html', 'app/partials/**/*.html'],
        tasks: ['copy']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: staticFolder
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  var buildTasks = ['less', 'concat', 'copy', 'uglyify'];
  var runTasks = ['watch', 'connect'];
  var testTesks = [];
  var defaultTasks = buildTasks.concat(runTasks);

  grunt.registerTask('build', buildTasks);
  grunt.registerTask('run', runTasks);
  grunt.registerTask('default', defaultTasks);
};
