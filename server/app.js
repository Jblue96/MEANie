var express = require( 'express' );
var app=express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );

//use
app.use( express.static( 'public' ) );
app.use( bodyParser.json() );

//global
var port = process.env.PORT || 3456;

//listening
app.listen( 8080, 'localhost', function( req, res ){
console.log( 'listening on 8080' );
});

// 27017 is default mongo port
mongoose.connect( 'localhost:27017/meanie' );
var ourSchema = new  mongoose.Schema({
name: String,
location: String
});
//Model
var ourModel = mongoose.model( 'ourModel', ourSchema );

//base page
app.get( '/', function( req, res ){
res.sendFile( path.resolve( 'public/views/index.html' ) );
});
// getting some records
app.get( '/getRecords', function( req, res ){
// get and send back all the things
ourModel.find().then( function( data ){
res.send( data );
    });//end our model
}); // end the getting of records


//posting some records
app.post( '/testPost', function( req, res ){
console.log( 'req.body.name: ' + req.body.name );
// retrieved the req.body
// putting it into an object to be saved in the db
var recordToAdd={
name:req.body.name,
location:req.body.location
};//end rec to add
// create new record
var newRecord=ourModel( recordToAdd );
newRecord.save();
});//our model
