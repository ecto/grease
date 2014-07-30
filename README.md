<img src="https://i.imgur.com/TsDkHvI.png" alt="grease" />

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][coveralls-image]][coveralls-url]

  Simple packaging for cross-platform Cordova and node-webkit applications.

## Installation

As a CLI:

````
npm install -g grease
````

As a module:

````
npm install --save grease
````

## Quick start

````
grease create foo
cd foo
grease run
````

For more information, just run

````
grease
````

for usage information.

## Usage as a module

````javascript
var grease = require('grease');

grease.run();
````

## Running tests

To run tests, clone the repository and run the following from inside the directory:

````
npm install
npm test
````

# License

````
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2014 Cam Pedersen <cam@campedersen.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
````

[npm-image]: https://img.shields.io/npm/v/grease.svg?style=flat
[npm-url]: https://npmjs.org/package/grease
[travis-image]: https://img.shields.io/travis/ecto/grease.svg?style=flat
[travis-url]: https://travis-ci.org/ecto/grease
[coveralls-image]: https://img.shields.io/coveralls/ecto/grease.svg?style=flat
[coveralls-url]: https://coveralls.io/r/ecto/grease?branch=master

