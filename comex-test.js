
const comex = require( "./comex.js" );

console.log( comex( "ps -e" )
	.pipe( "grep node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( ) );

comex( "ps -e" )
	.pipe( "grep node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( function done( error, result ){
		console.log( arguments );
	} );

comex( "ps -e" )
	.pipe( "grep", "node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f 1" )
	.execute( function done( error, result ){
		console.log( arguments );
	} );

comex( "ps -e" )
	.pipe( "grep", "node" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.execute( function done( error, result ){
		console.log( arguments );
	} );

comex( "ps -e" )
	.pipe( "grep", "atom" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.log( "./log" )
	.execute( );

comex( "ps -e" )
	.pipe( "grep", "sh" )
	.pipe( "tr -s ' '" )
	.pipe( "xargs echo -n" )
	.pipe( "cut -d ' ' -f", 1 )
	.background( )
	.execute( );
