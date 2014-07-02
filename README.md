flow-write
==========

Thin wrapper for [graceful-fs](https://github.com/isaacs/node-graceful-fs) file write stream.


## Installation

``` bash
$ npm install flow-write
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	writeStream = require( 'flow-write' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new stream, passing along an optional error handler:
var stream = writeStream()
	.path( __dirname + '/path/to/output/file.json' )
	.stream( onError );

// Pipe the data to the stream...
readStream.pipe( stream );

// Error handler:
function onError( error ) {
	if ( error ) {
		console.error( error.stack );
		throw new Error( 'Error!!!' );
	}
	console.log( 'Finished!' );
}
```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

