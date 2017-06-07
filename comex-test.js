
const comex = require( "./comex.js" );

console.log( comex( "ps -e" )
	.pipe( "grep node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( true ) );

comex( "ps -e" )
	.pipe( "grep node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( )( function done( error, result ){
		console.log( arguments );
	} );

comex( "ps -e" )
	.pipe( "grep", "node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( )( function done( error, result ){
		console.log( arguments );
	} );

comex( "ps -e" )
	.pipe( "grep", "node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.execute( )( function done( error, result ){
		console.log( arguments );
	} );

comex( "ps -e" )
	.pipe( "grep", "atom" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.log( "./log" )
	.execute( true );

comex( "ps -e" )
	.pipe( "grep", "sh" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.background( )
	.execute( true );

let command = comex( "ps -e" )
	.pipe( "grep @name" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" );

console.log( "chrome", command.clone( ).replace( "name", "chrome" ).execute( true ) );

console.log( "atom", command.clone( ).replace( "name", "atom" ).execute( true ) );
