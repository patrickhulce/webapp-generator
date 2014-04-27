# generator-webapp

> [Yeoman](http://yeoman.io) generator


## Getting Started

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-webapp from npm, run:

```
$ npm install -g git://github.com/patrickhulce/webapp-generator.git
```

Finally, initiate the generator:

```
$ yo webapp
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## About This Generator

Scaffolds a web application with

- jQuery
- Angular (and various ng-* packages)
- Bootstrap
- FontAwesome

With Python option adds

- Python virtualenv
- Flask
- Gunicorn
- Vagrantfile
    - Ubuntu (Precise)
    - nginx
    - MySQL
    - redis

### Intended Usage

The intended usage is to offer a complete deployment solution from the start. This package assumes two primary modes of deployment: static or python.


#### Static Deployment

If the python option is not enabled, the assumption is that the site (or at least the repository) will be entirely static.
In this case, the `grunt run` command will the `grunt-contrib-connect` server for hosting the site during development.
Deployment during production will simply be hosting the `www-root` folder after a `grunt build` on the target server.

#### Python Deployment

If the python option is enabled, the assumption is that the site's static files will be hosted through nginx and the app itself will be hosted through Gunicorn proxy behind nginx.
In this case, the Vagrantfile describes the Ubuntu configuration with a configured nginx server that points back the host machine for the gunicorn app.
This way all commands can easily be performed on the host machine without interacting with the guest at all. Ports 80, 3306, and 6379 are forwarded to the host.
To the application, there is no difference running in this environment compared to production as localhost can still be referenced.
In this scenario, `grunt` will build the files in the `www-root` directory (which nginx references through a shared Vagrant folder) and start gunicorn (which nginx references through proxy).
Deployment during production will simply be changing the corresponding lines in the nginx.conf after a grunt build on the target server and starting up gunicorn.


#### Commonalities

As a result of this structure, regardless of the method of deployment used, the application is always available at localhost:8080 during development and is easily deployed to production.


## License

MIT
