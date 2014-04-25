'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');


var PyappGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.author = 'Patrick Hulce';

    this.bowerPackages = [
      'angular',
      'angular-bootstrap',
      'bootstrap',
      'jquery',
      'underscore'
    ];
    this.optionalBowerPackages = [
      'angular-route',
      'angular-resource'
    ];

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic pyapp generator.'));

    var basicPrompts = [
      {
        name: 'appName',
        message: 'Application name: '
      },
      {
        name: 'appDescription',
        message: 'Application description: '
      }
    ];

    var bowerPrompts = _.map(this.optionalBowerPackages, function (pkgName) {
      var varName = 'bowerPkg-' + pkgName;
      return {
        name: varName,
        type: 'confirm',
        message: 'Include ' + pkgName + '? ',
        default: true
      };
    });


    var prompts = basicPrompts.concat(bowerPrompts);
    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      var bowerPkgs = this.bowerPackages;

      _.forEach(bowerPrompts, function (prompt) {
        if (!props[prompt.name]) return;
        bowerPkgs.push(prompt.name.split('bowerPkg-')[1]);
      });

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');

    this.bowerInstall(this.bowerPackages, { save: true });
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PyappGenerator;
