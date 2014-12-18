var StringDecoder = require('string_decoder').StringDecoder
var decoder = new StringDecoder('ascii')

var fs = require( 'fs' )

var csv = require( 'csv' )
module.exports = {
	
	index : function( req , res ){
	},

	upload : function( req , res ) {
		res.render( 'upload' )
	},
	importfile : function( req , res ){
		var filename = req.files.thumbnail.name
		fs.readFile( './uploads/'+filename , function( err , data ){

			//console.log( decoder.end( data ) )
			csv.parse( data.toString("utf8") , function( err , data ){
				for( var i = 1; data.length > i; i++){
					var tmp = data[i].toString("ascii").split("\t")					
					if( typeof( tmp[1] ) == "undefined" )
						continue
					
					var no = tmp[0]
					var time = tmp[1].toString("utf8")
					var interval = tmp[2]
					var tempInside = tmp[3]
					var airMoistInside = tmp[4]
					var tempOutside = tmp[5]
					var airMoistOutside = tmp[6]
					var relHPA = tmp[7]
					var absHPA = tmp[8]
					var windSpeed = tmp[9]
					var windBy = tmp[10]
					var windDir = tmp[11]
					var dewPoint = tmp[12]
					var windTemp = tmp[13]
					var rainprhour = tmp[14]
					var rainlasttwentyfour = tmp[15]
					var rainlastweek = tmp[16]
					var rainlastmonth = tmp[17]
					var raintotal = tmp[18]
														
					console.log( raintotal )
				}
			})
		})
	}
}
