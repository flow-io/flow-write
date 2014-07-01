
// MODULES //

var // Filesystem module:
	fs = require( 'fs' ),

	// Path module:
	path = require( 'path' ),

	// Expectation library:
	chai = require( 'chai' ),

	// Stream spec:
	spec = require( 'stream-spec' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	fStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'file/write', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( fStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to get the file path', function test() {
		var stream = fStream();
		expect( stream.path ).to.be.a( 'function' );
	});

	it( 'should provide a method to set the file path', function test() {
		var stream = fStream(),
			filepath = path.resolve( __dirname, 'tmp/output.txt' );
		stream.path( filepath );
		assert.strictEqual( stream.path(), filepath );
	});

	it( 'should not allow the path to anything other than a string', function test() {
		var stream = fStream();
		
		expect( badValue( function(){} ) ).to.throw( Error );
		expect( badValue( 5 ) ).to.throw( Error );
		expect( badValue( [] ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				stream.path( value );
			};
		}
	});

	it( 'should throw an error if a file path is not set', function test() {
		var stream = fStream();

		expect( stream.stream ).to.throw( Error );
	});

	it( 'should write to a file', function test( done ){
		var numData = 1000,
			expected = new Array( numData ),
			filepath, wStream;

		// Create mock data:
		for ( var i = 0; i < numData; i++ ) {
			expected[ i ] = '' + Math.round( 1000 * Math.random() );
		}

		// Specify the output file destination:
		filepath = path.join( __dirname, 'tmp/output1.txt' );

		// Create a file write stream:
		wStream = fStream()
			.path( filepath )
			.stream( onError );

		// Mock writing to the stream:
		utils.writeStream( expected, wStream );

		return;

		/**
		* FUNCTION: onError( error )
		*	Error handler. Error should not exist.
		*/
		function onError( error ) {
			expect( error ).to.not.exist;
			fs.unlink( filepath, function onError( error ) {
				if ( error ) {
					console.error( error.stack );
				}
			});
			done();
		} // end FUNCTION onError()
	});

	it( 'should execute a callback when stream finishes', function test( done ) {
		var numData = 1000,
			expected = new Array( numData ),
			filepath, wStream;

		// Create mock data:
		for ( var i = 0; i < numData; i++ ) {
			expected[ i ] = '' + Math.round( 1000 * Math.random() );
		}

		// Specify the output file destination:
		filepath = path.join( __dirname, 'tmp/output2.txt' );

		// Create a file write stream:
		wStream = fStream()
			.path( filepath )
			.stream( onFinish );

		// Mock writing to the stream:
		utils.writeStream( expected, wStream );

		return;

		/**
		* FUNCTION: onFinish( error )
		*	Finish event handler. Checks for errors and confirms callback invoked.
		*/
		function onFinish( error ) {
			expect( error ).to.not.exist;
			assert.ok( true, 'callback invoked' );
			fs.unlink( filepath, function onError( error ) {
				if ( error ) {
					console.error( error.stack );
				}
			});
			done();
		} // end FUNCTION onFinish()
	});

});