var path = require('path');
var exec = require('child_process').exec;
var NwBuilder = require('node-webkit-builder');

module.exports = function (cli) {
  var platform = cli.argv._[1] || 'desktop';

  if (platform == 'desktop') {
    // TODO this assumes the project name is the same as its containing folder name
    var appName = path.basename(process.cwd());

    var nw = new NwBuilder({
      files: 'src/**/**',
      buildDir: './dist',
      platforms: [
        'win',
        'osx',
        'linux32',
        'linux64'
      ]
    });

    nw.on('log',  console.log);

    nw.build(function (err) {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      if (process.platform == 'darwin') {
        var child = exec('open dist/' + appName + '/osx/node-webkit.app');
      }
    })

    return;
  }

  console.log(platform);
};
