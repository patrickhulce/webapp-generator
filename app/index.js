'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');


var WebappGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.author = 'Patrick Hulce';

    this.bowerPackages = [
      {
        name: 'jquery',
        js: 'bower_components/jquery/dist/jquery.js'
      },
      {
        name: 'bootstrap',
        css: 'bower_components/bootstrap/dist/css/bootstrap.css'
      },
      {
        name: 'lodash',
        js: 'bower_components/lodash/dist/lodash.js'
      },
      {
        name: 'angular',
        js: 'bower_components/angular/angular.js'
      },
      {
        name: 'angular-bootstrap',
        js: 'bower_components/angular-bootstrap/ui-bootstrap.js'
      },
      {
        name: 'angular-route',
        js: 'bower_components/angular-route/angular-route.js'
      },
      {
        name: 'font-awesome',
        css: 'bower_components/font-awesome/css/font-awesome.css',
        copy: {
          expand: true,
          dest: 'fonts',
          cwd: 'bower_components/font-awesome/fonts',
          src: '**'
        }
      }
    ];
    this.optionalBowerPackages = [
      {
        name: 'angular-resource',
        js: 'bower_components/angular-resource/angular-resource.js'
      }
    ];

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
        this.spawnCommand('sh', ['misc/app.sh', 'install']);
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic webapp generator.'));

    var basicPrompts = [
      {
        name: 'appName',
        message: 'Application name: '
      },
      {
        name: 'appDescription',
        message: 'Application description: '
      },
      {
        name: 'usePython',
        type: 'confirm',
        message: 'Use Python? ',
        default: true
      }
    ];

    var i = 0;
    var bowerPrompts = _.map(this.optionalBowerPackages, function (option) {
      var varName = 'bowerPkg-' + i;
      i++;
      return {
        name: varName,
        type: 'confirm',
        message: 'Include ' + option.name + '? ',
        default: true
      };
    });


    var prompts = basicPrompts.concat(bowerPrompts);
    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.usePython = props.usePython;

      var bowerPkgs = this.bowerPackages;
      var options = this.optionalBowerPackages;
      _.forEach(bowerPrompts, function (prompt) {
        if (!props[prompt.name]) return;
        var index = prompt.name.split('bowerPkg-')[1];
        bowerPkgs.push(options[index]);
      });

      this.toInstall = _.map(bowerPkgs, 'name');
      this.bowerSrcPaths = JSON.stringify({
        css: _.map(_.filter(bowerPkgs, 'css'), 'css'),
        js: _.map(_.filter(bowerPkgs, 'js'), 'js'),
        copy: _.map(_.filter(bowerPkgs, 'copy'), 'copy')
      });
      this.runTasks = this.usePython ? 'shell:appRestart' : 'connect';

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/js');
    this.mkdir('app/less');
    this.mkdir('app/partials');

    this.template('package.json', 'package.json');
    this.template('bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');

    this.template('app/index.html', 'app/index.html');
    this.template('app/app.js', 'app/js/app.js');
    this.copy('app/app.less', 'app/less/app.less');

    if (this.usePython) {
      this.copy('Vagrantfile', 'Vagrantfile');

      this.mkdir('misc');
      this.copy('misc/app.sh', 'misc/app.sh');
      this.copy('misc/bootstrap.sh', 'misc/bootstrap.sh');
      this.copy('misc/requirements.txt', 'misc/requirements.txt');
      this.spawnCommand('touch', ['app/__init__.py']);
      this.copy('app/app.py', 'app/app.py');
      this.copy('app/routes.py', 'app/routes.py');
    }

    this.bowerInstall(this.toInstall, { save: true });
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = WebappGenerator;
