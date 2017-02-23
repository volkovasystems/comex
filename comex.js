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
			"diatom": "diatom",
			"falzy": "falzy",
			"gnaw": "gnaw",
			"plough": "plough",
			"protype": "protype",
			"truly": "truly"
		}
	@end-include
*/

const arid = require( "arid" );
const diatom = require( "diatom" );
const falzy = require( "falzy" );
const gnaw = require( "gnaw" );
const plough = require( "plough" );
const protype = require( "protype" );
const truly = require( "truly" );

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

	this.command = this.flatten( arguments );

	if( arid( this.command ) ){
		throw new Error( "invalid command" );
	}

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

	return plough( arguments ).filter( truly )
		.map( ( command ) => { return command.toString( ); } );
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

Comex.prototype.execute = function execute( callback ){
	/*;
		@meta-configuration:
			{
				"callback": "function"
			}
		@end-meta-configuration
	*/

	let command = this.resolve( this.command );

	if( truly( callback ) && protype( callback, FUNCTION ) ){
		return gnaw( command )( callback );

	}else{
		return gnaw( command, true );
	}
};

module.exports = Comex;
