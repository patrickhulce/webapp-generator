module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      app: {
        files: {
          'app/static/css/app.css': ['app/less/**/*.less']
        }
      }
    },
    copy: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/partials',
            src: '**',
            dest: 'app/static/partials'
          },
          {
            src: 'app/index.html',
            dest: 'app/static/index.html'
          }
        ]
      }
    },
    concat: {
      vendor: {
        files: {
          'app/static/css/vendor.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css'
          ],
          'app/static/js/vendor.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/underscore/underscore.js'
          ]
        }
      },
      app: {
        files: {
          'app/static/js/app.js': ['app/js/**/*.js']
        }
      }
    },
    uglify: {
      vendor: {
        files: {
          'app/static/js/vendor.min.js' : 'app/static/js/vendor.js'
        }
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
        files: ['app/index.html','app/partials/**/*.html'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'concat']);
};