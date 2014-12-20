var util = require( 'util' )
var StringDecoder = require('string_decoder').StringDecoder
var async = require( 'async' )

var WeatherLog = require( '../schemas/weatherlog' )
var fs = require( 'fs' )

function buildQuery( field, type , month , day, time ){
	
	var d = new Date("12-02-2014 00:01")
	
	var group = { }
	var sort  = { }
	var datapoint = {}

	group.year = { $year : "$time" }
	
	if( month ){
		group.month = { $month : "$time" }
		sort['_id.month'] = 1 
	}
	
	if( day ){
		group.day = { $dayOfMonth : "$time" }
		sort['_id.day'] = 1
	}

	var query_type = "$" + type
	
	datapoint[query_type] = "$" + field
	var query = [
		{ $match : { time : { $gt : d } } } ,

		{ $group : { _id : group,
								 datapoint : datapoint
							 } },
		{ $sort  : sort }
	]
	return query
}
module.exports = {
	
	getlog : function( req , res ){
		
		var field = req.param('field')
		var type  = req.param( 'type' )|| "avg"
		var month = req.param('month') || true
		var day   = req.param('day')   || false
		var time  = req.param('time')  || false
		
		var query = buildQuery( field, type , month , day, time )
		
		console.log( util.inspect( query , { depth : null } ) )
		
		WeatherLog.aggregate( query ,function( err , logdata ){
			
			res.json( logdata )
		})
	},

	index : function( req , res ){
		res.render( 'index' )
	},

	upload : function( req , res ) {
		res.render( 'upload' )
	},
	importfile : function( req , res ){
		var filename = req.files.thumbnail.name
		var weatherInstances = new Array()
		fs.readFile( './uploads/'+filename , "ucs2" , function( err , data ){
			var lines = data.split("\r")
			for( var i = 1; data.length > i; i++){
				if( typeof(lines[i] ) == "undefined" )
					continue				
				var tmp = lines[i].replace("\n","").split("\t")
				
				if( typeof( tmp[1] ) == "undefined" )
					continue
				var dateRaw = tmp[1].split(".")
				var date = new Date( dateRaw[1] + "." + dateRaw[0] + "." + dateRaw[2] )
					var structure = {
						no : tmp[0],
						time : date,
						interval : tmp[2],
						tempInside : tmp[3],
						airMoistInside : tmp[4],
						tempOutside : tmp[5],
						airMoistOutside : tmp[6],
						relHPA : tmp[7],
						absHPA : tmp[8],
						windSpeed : tmp[9],
						windBy : tmp[10],
						windDir : tmp[11],
						dewPoint : tmp[12],
						windTemp : tmp[13],
						rainprhour : tmp[14],
						rainlasttwentyfour : tmp[15],
						rainlastweek : tmp[16],
						rainlastmonth : tmp[17],
						raintotal : tmp[18]
					}

				var weatherlog = new WeatherLog( structure )
				weatherInstances.push( weatherlog )
			}
			console.log( "Got %s" , weatherInstances.length )
			async.forEach( weatherInstances, function( w , callback){
				w.save( callback )
			}, function( err , done ){
				res.render( 'upload_done', { line_count : weatherInstances.length } )
			})
		})
	}
}
