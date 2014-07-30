var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var prompt = require('prompt');
var cordova = require('../lib/cordova');

prompt.message = '';
prompt.delimiter = '';
prompt.start();

module.exports = function (cli) {
  var name = cli.argv._[1];

  if (!name) {
    console.log('Error: must include name\n');
    cli.showHelp();
    process.exit(1);
  }

  isDirectoryEmpty(name, function (isEmpty) {
    if (isEmpty || cli.argv['f']) {
      createApplication(name);
    } else {
      var options = {
        name: 'continue',
        description: 'Destination not empty, continue?'.red,
        default: 'yes'
      };

      prompt.get(options, function (err, res) {
        if (!res || res.continue != 'yes' && res.continue != 'y') {
          console.log('\nAborting...');
          process.exit(1);
        }

        createApplication(name);
      });
    }
  });
};

function isDirectoryEmpty (path, callback) {
  fs.readdir(path, function (err, files) {
    if (err && 'ENOENT' != err.code) {
      throw err;
    }

    callback(!files || !files.length);
  });
}

function cp (name, file) {
  var from = path.join(__dirname, '..', 'template', file);
  write(name + '/' + file, read(from));
}

function replaceAndCopy (name, file, options) {
  var from = path.join(__dirname, '..', 'template', file);
  var data = read(from);

  for (var i in options) {
    data = data.replace('{{ ' + i + ' }}', options[i]);
  }

  write(name + '/' + file, data);
}

function read (from) {
  return fs.readFileSync(from, 'utf-8');
}

function write (path, str, mode) {
  fs.writeFile(path, str, {
    mode: mode || 0666
  });

  console.log(('Created ' + path).green);
}

function mkdir (path, callback) {
  mkdirp(path, 0755, function(err){
    if (err) {
      throw err;
    }

    console.log(('Created directory ' + path).green);
    callback && callback();
  });
}

function createApplication (name) {
  console.log('Creating application ' + name + '...');
  var template = '../template/';

  mkdir(name, function () {
    replaceAndCopy(name, 'package.json', {
      'name': name
    });

    mkdir(name + '/src', function () {
      cp(name, 'src/index.html');
      replaceAndCopy(name, 'src/package.json', {
        'name': name
      });

      mkdir(name + '/src/js', function () {
        cp(name, 'src/js/app.js');
      });

      mkdir(name + '/src/css', function () {
        cp(name, 'src/css/global.css');
      });

      mkdir(name + '/test', function () {
        cp(name, 'test/basic.js');
      });

      mkdir(name + '/res', function () {
        var config = {
          lib: {
            www: {
              link: true,
              uri: process.cwd() + '/' + name + '/src'
            }
          }
        };

        cordova.raw.create(
          name + '/res',
          'io.grease.' + name,
          name,
          config
        ).fail(function (err) {
          console.log(err.message.red);
          process.exit(1);
        }).done(function () {
          console.log(('Generated Cordova project at ' + name + '/res').green);

// This may be too volatile..
/*
          process.chdir(name + '/res');
          cordova.raw.platform('add', [
            'ios',
            'android'
          ], {}).done(function () {
            process.chdir('../..');
          });
*/
        });
      });
    });
  });
}
