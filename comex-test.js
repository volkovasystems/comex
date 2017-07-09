
const assert = require( "assert" );
const comex = require( "./comex.js" );
const filled = require( "filled" );
const fs = require( "fs" );

assert.equal( typeof comex( "ps -e" )
	.pipe( "grep node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( true ) == "string", true, "should be true" );

comex( "ps -e" )
	.pipe( "grep node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( )( function done( error, result ){
		assert.equal( filled( Array.from( arguments ) ), true, "should be true" );
	} );

comex( "ps -e" )
	.pipe( "grep", "atom" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.log( "./log" )
	.execute( true );

const checkIfLogExist = function checkIfLogExist( ){
	try{
		fs.accessSync( "./log", fs.constants.R_OK | fs.constants.W_OK );

	}catch( error ){
		return false;
	}

	return true;
};

assert.equal( checkIfLogExist( ), true, "should be true" );

let command = comex( "ps -e" )
	.pipe( "grep @name" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" );

assert.ok( command.clone( ).replace( "name", "chrome" ).execute( true ) );

assert.ok( command.clone( ).replace( "name", "atom" ).execute( true ) );

assert.equal( comex( "echo hello" ).refresh( ).and( "echo hi" ).execute( true ), "hello\nhi", "should be equal" );

console.log( "ok" );
