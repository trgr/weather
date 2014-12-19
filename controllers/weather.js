var StringDecoder = require('string_decoder').StringDecoder
var async = require( 'async' )

var WeatherLog = require( '../schemas/weatherlog' )
var fs = require( 'fs' )

module.exports = {
	
	getWeatherData : function( req , res ){
		WeatherLog.aggregate( {
			$group : { _id : {
				month : { $month : "$time" },
				/* day: { $dayOfMonth: "$time" } */
			},
								 tempInside : { $avg : "$tempInside" } 
							 }
								 
		} , function( err , logdata ){
			
			res.send( logdata )
		})
	},

	index : function( req , res ){
		
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
