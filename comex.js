"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "comex",
			"path": "comex/comex.js",
			"file": "comex.js",
			"module": "comex",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/comex.git",
			"test": "comex-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Shell command builder executor.
	@end-module-documentation

	@include:
		{
			"arid": "arid",
			"depher": "depher",
			"diatom": "diatom",
			"falzy": "falzy",
			"gnaw": "gnaw",
			"letgo": "letgo",
			"plough": "plough",
			"protype": "protype",
			"raze": "raze",
			"stringe": "stringe",
			"truly": "truly",
			"zelf": "zelf"
		}
	@end-include
*/

const arid = require( "arid" );
const clazof = require( "clazof" );
const depher = require( "depher" );
const diatom = require( "diatom" );
const falzy = require( "falzy" );
const gnaw = require( "gnaw" );
const letgo = require( "letgo" );
const plough = require( "plough" );
const protype = require( "protype" );
const raze = require( "raze" );
const stringe = require( "stringe" );
const truly = require( "truly" );
const zelf = require( "zelf" );

const AND_SEPARATOR = "&&";
const OR_SEPARATOR = "||";
const PIPE_SEPARATOR = "|";
const THEN_SEPARATOR = ";";
const SPACE_SEPARATOR = " ";

const Comex = diatom( "Comex" );

Comex.prototype.initialize = function initialize( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	this.context( );

	this.command = this.flatten( arguments );

	if( arid( this.command ) ){
		throw new Error( "invalid command" );
	}

	return this;
};

Comex.prototype.context = function context( self ){
	/*;
		@meta-configuration:
			{
				"self:required": "*"
			}
		@end-meta-configuration
	*/

	this.self = zelf( self );

	return this;
};

Comex.prototype.resolve = function resolve( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	return this.output( this.flatten( arguments ) );
};

Comex.prototype.flatten = function flatten( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	return plough( arguments ).filter( truly ).map( stringe );
};

Comex.prototype.output = function output( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	return plough( arguments ).filter( truly )
		.join( SPACE_SEPARATOR ).replace( /\s+/g, SPACE_SEPARATOR ).trim( );
};

Comex.prototype.and = function and( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	this.join( AND_SEPARATOR ).join( this.resolve( arguments ) );

	return this;
};

Comex.prototype.or = function or( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	this.join( OR_SEPARATOR ).join( this.resolve( arguments ) );

	return this;
};

Comex.prototype.pipe = function pipe( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	this.join( PIPE_SEPARATOR ).join( this.resolve( arguments ) );

	return this;
};

Comex.prototype.then = function then( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	this.join( THEN_SEPARATOR ).join( this.resolve( arguments ) );

	return this;
};

Comex.prototype.join = function join( command ){
	/*;
		@meta-configuration:
			{
				"command:required": [
					"string",
					"..."
				]
			}
		@end-meta-configuration
	*/

	command = this.resolve( arguments );

	if( falzy( command ) || !protype( command, STRING ) ){
		throw new Error( "invalid command" );
	}

	this.command.push( command );

	return this;
};

Comex.prototype.log = function log( logPath ){
	/*;
		@meta-configuration:
			{
				"logPath:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( logPath ) || !protype( logPath, STRING ) ){
		throw new Error( "invalid log path" );
	}

	this.logPath = logPath;

	return this;
};

Comex.prototype.background = function background( ){
	this.daemon = true;

	return this;
};

Comex.prototype.execute = function execute( synchronous, option ){
	/*;
		@meta-configuration:
			{
				"synchronous": "boolean",
				"option": "object"
			}
		@end-meta-configuration
	*/

	let parameter = raze( arguments );
	synchronous = depher( parameter, BOOLEAN, false );
	option = depher( parameter, OBJECT, { } );

	let command = this.resolve( this.command );

	if( truly( this.logPath ) ){
		command = `${ command } 2>&1 1> ${ this.logPath }`;
	}

	if( this.daemon === true ){
		command = `${ command } &`;
	}

	if( synchronous ){
		try{
			return gnaw( command, option, true );

		}catch( error ){
			throw new Error( `command chain execution failed, ${ error.stack }` );
		}

	}else{
	 	return letgo.bind( this.self )( function later( cache ){
			return gnaw( command, option )( function done( error, result ){
				if( clazof( error, Error ) ){
					return cache.callback( new Error( `command chain execution failed, ${ error.stack }` ), "" );

				}else{
					return cache.callback( null, result );
				}
			} );
		} );
	}
};

module.exports = Comex;
