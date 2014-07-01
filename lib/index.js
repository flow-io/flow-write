/**
*
*	STREAM: write
*
*
*	DESCRIPTION:
*		- Thin wrapper around graceful-fs file write stream to provide a consistent API with flow streams.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/05/11: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] graceful-fs
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Drop-in replacement for filesystem module:
		fs = require( 'graceful-fs' );
		

	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {stream} Stream instance
	*/
	function Stream() {
		this._path = null;
		return this;
	} // end FUNCTION stream()

	/**
	* METHOD: path( path )
	*	Setter and getter for the file path. If a path is provided, sets the file path. If no path is provided, returns the file path.
	*
	* @param {string} path - file path
	* @returns {object|string} instance object or file path
	*/
	Stream.prototype.path = function( path ) {
		if ( !arguments.length ) {
			return this._path;
		}
		if ( typeof path !== 'string' ) {
			throw new Error( 'path()::invalid input argument. Input argument must be a string.' );
		}
		this._path = path;
		return this;
	}; // end METHOD path()

	/**
	* METHOD: stream( clbk )
	*	Returns a writable stream which outputs to a provided destination.
	*
	* @param {function} clbk - (optional) callback to invoke after finishing writing a stream. Function should take one input argument: [ error ]. If no errors, error is null.
	* @returns {stream} writable stream
	*/
	Stream.prototype.stream = function( clbk ) {
		if ( !this._path ) {
			throw new Error( 'stream()::stream not initialized. Must provide an output file destination.' );
		}
		var stream = fs.createWriteStream( this._path );
		stream.on( 'error', function onError( error ) {
			if ( clbk ) {
				clbk( error );
				return;
			}
			console.error( error.stack );
		});
		stream.on( 'finish', function onEnd() {
			if ( clbk ) {
				clbk();
			}
		});
		return stream;
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();