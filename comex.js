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
			"condev": "condev",
			"depher": "depher",
			"diatom": "diatom",
			"falzy": "falzy",
			"filled": "filled",
			"gnaw": "gnaw",
			"harden": "harden",
			"kein": "kein",
			"plough": "plough",
			"protype": "protype",
			"raze": "raze",
			"stringe": "stringe",
			"stuffed": "stuffed",
			"transpher": "transpher",
			"truly": "truly",
			"wichevr": "wichevr",
			"zelf": "zelf"
		}
	@end-include
*/

const arid = require( "arid" );
const condev = require( "condev" );
const depher = require( "depher" );
const diatom = require( "diatom" );
const falzy = require( "falzy" );
const filled = require( "filled" );
const gnaw = require( "gnaw" );
const harden = require( "harden" );
const kein = require( "kein" );
const plough = require( "plough" );
const protype = require( "protype" );
const raze = require( "raze" );
const stringe = require( "stringe" );
const stuffed = require( "stuffed" );
const transpher = require( "transpher" );
const truly = require( "truly" );
const wichevr = require( "wichevr" );
const zelf = require( "zelf" );

const AND_SEPARATOR = "&&";
const OR_SEPARATOR = "||";
const PIPE_SEPARATOR = "|";
const THEN_SEPARATOR = ";";
const SPACE_SEPARATOR = " ";

const ANNOTATE_PATTERN = /^\@/;

const CACHE = Symbol( "cache" );
const CATCHER = Symbol( "catcher" );
const CLONE = Symbol( "clone" );
const DEFAULT = Symbol( "default" );
const FORMAT = Symbol( "format" );
const STATE = Symbol( "state" );
const STOPPED = Symbol( "stopped" );

const Command = diatom( "Command" );

Command.prototype.initialize = function initialize( command ){
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

	harden( FORMAT, [ ], this );

	harden( CACHE, { }, this );

	this[ STATE ] = { };

	this[ DEFAULT ] = "";

	return this;
};

Command.prototype.context = function context( self ){
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

Command.prototype.resolve = function resolve( command ){
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

Command.prototype.flatten = function flatten( command ){
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

Command.prototype.output = function output( command ){
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

Command.prototype.and = function and( command ){
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

Command.prototype.or = function or( command ){
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

Command.prototype.pipe = function pipe( command ){
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

Command.prototype.then = function then( command ){
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

Command.prototype.join = function join( command ){
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

Command.prototype.log = function log( logPath ){
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

Command.prototype.background = function background( ){
	this.daemon = true;

	return this;
};

Command.prototype.replace = function replace( pattern, value ){
	/*;
		@meta-configuration:
			{
				"pattern:required": [
					"string",
					RegExp
				],
				"value:required": "*"
			}
		@end-meta-configuration
	*/

	if( falzy( pattern ) || !condev( pattern, [ STRING, RegExp ] ) ){
		throw new Error( "invalid log path" );
	}

	if( protype( pattern, STRING ) && !ANNOTATE_PATTERN.test( pattern ) ){
		pattern = `@${ pattern }`;
	}

	if( protype( pattern, STRING ) ){
		pattern = new RegExp( pattern );
	}

	this.command.forEach( ( command, index ) => {
		this.command[ index ] = command.replace( pattern, stringe( value ) );
	} );

	return this;
};

Command.prototype.clone = function clone( ){
	let command = Command.apply( null, this.command );

	command[ DEFAULT ] = this[ DEFAULT ];

	if( filled( this[ FORMAT ] ) ){
		this[ FORMAT ].forEach( ( formatter ) => command[ FORMAT ].push( formatter ) );
	}

	if( stuffed( this[ STATE ] ) ){
		command[ STATE ] = this[ STATE ];
	}

	/*;
		@note:
			Cache is not transferred by reference.
		@end-note
	*/
	if( stuffed( this[ CACHE ] ) ){
		Object.keys( this[ CACHE ] ).forEach( ( property ) => {
			command[ CACHE ][ property ] = this[ CACHE ][ property ];
		} );
	}

	if( !kein( CLONE, this[ CACHE ] ) ){
		this[ CACHE ][ CLONE ] = [ ];

		command[ CACHE ][ CLONE ] = this[ CACHE ][ CLONE ];

	}else{
		command[ CACHE ][ CLONE ] = this[ CACHE ][ CLONE ];
	}

	this[ CACHE ][ CLONE ].push( command );

	return transpher( this, command, true );
};

Command.prototype.format = function format( formatter ){
	/*;
		@meta-configuration:
			{
				"formatter:required": "function"
			}
		@end-meta-configuration
	*/

	if( falzy( formatter ) || !protype( formatter, FUNCTION ) ){
		throw new Error( "invalid formatter" );
	}

	this[ FORMAT ].push( formatter );

	return this;
};

Command.prototype.stop = function stop( ){
	harden( STOPPED, true, this[ STATE ] );

	this[ CACHE ][ CLONE ].forEach( ( command ) => {
		if( kein( CATCHER, command ) ){
			command[ CATCHER ].stop( null, command[ DEFAULT ] );
		}
	} );

	return this;
};

Command.prototype.defer = function defer( value ){
	/*;
		@meta-configuration:
			{
				"value:required": "*"
			}
		@end-meta-configuration
	*/

	this[ DEFAULT ] = value;

	return this;
};

Command.prototype.set = function set( property, value ){
	/*;
		@meta-configuration:
			{
				"property:required": [
					"number",
					"string",
					"symbol"
				],
				"value:required": "*"
			}
		@end-meta-configuration
	*/

	if( falzy( property ) || !protype( property, NUMBER + STRING + SYMBOL ) ){
		throw new Error( "invalid property" );
	}

	this[ CACHE ][ property ] = value;

	return this;
};

Command.prototype.get = function get( property ){
	/*;
		@meta-configuration:
			{
				"property:required": [
					"number",
					"string",
					"symbol"
				]
			}
		@end-meta-configuration
	*/

	if( falzy( property ) || !protype( property, NUMBER + STRING + SYMBOL ) ){
		throw new Error( "invalid property" );
	}

	return this[ CACHE ][ property ];
};

Command.prototype.execute = function execute( synchronous, option ){
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
			let defaultValue = this[ DEFAULT ];

			if( this[ STATE ][ STOPPED ] ){
				return defaultValue;

			}else if( filled( this[ FORMAT ] ) ){
				let result = gnaw( command, true, option );

				return wichevr( this[ FORMAT ].reduce( ( result, formatter ) => {
					return formatter( result );
				}, result ), defaultValue );

			}else{
				return wichevr( gnaw( command, true, option ), defaultValue );
			}

		}catch( error ){
			throw new Error( `cannot chain command, ${ error.stack }` );
		}

	}else{
		let self = this;

		let catcher = gnaw.bind( this.self )( command, option )
			.push( function done( error, result ){
				if( self[ STATE ][ STOPPED ] ){
					return catcher;
				}

				let defaultValue = self[ DEFAULT ];

				if( error instanceof Error ){
					return catcher.pass( new Error( `cannot chain command, ${ error.stack }` ), defaultValue );

				}else if( filled( self[ FORMAT ] ) ){
					try{
						result = wichevr( self[ FORMAT ].reduce( ( result, formatter ) => {
							return formatter( result );
						}, result ), defaultValue );

						return catcher.pass( null, result );

					}catch( error ){
						return catcher.pass( new Error( `cannot format, cannot chain command, ${ error.stack }` ), defaultValue );
					}

				}else{
					return catcher.pass( null, wichevr( result, defaultValue ) );
				}
			} );

		this[ CATCHER ] = catcher;

		return catcher;
	}
};

const comex = function comex( command ){
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

	return Command.apply( null, arguments ).context( zelf( this ) );
};

module.exports = comex;
