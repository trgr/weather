var util = require( 'util' )
var mongoose   = require( 'mongoose' )
var i18n       = require( 'i18n' )
var express    = require( 'express' )
var multer     = require( 'multer' )
var ejslayouts = require( 'express-ejs-layouts' )
var bodyparser = require( 'body-parser' )

/* Our own includes*/
var routes       = require( './config/routes' )

var config   = require( './config/config' )
mongoose.connect( config.database )

i18n.configure({
    locales:['en'],
    defaultLocale: 'en',
    directory: __dirname + '/locales'
});

var app = express()

app.use( i18n.init )

/* Configure the render engine and layouts*/
app.set( 'view engine' , 'ejs' )
app.use( ejslayouts ) 

/* Bodyparser for req.param , req.body  */
//app.use( bodyparser({uploadDir:'./uploads'}) )
app.use( bodyparser.json() )
app.use( bodyparser.urlencoded({ extended: false } ) )
app.use( multer( { dest: './uploads/'} ) )

app.use( '/static', express.static( './static' ) )
app.use( '/',routes ) 


var server = app.listen( config.port , config.host , function(){
  console.log( "Started" )
})
