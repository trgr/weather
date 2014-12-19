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
					var structure = {
						no : tmp[0].toString("utf8"),
						time : tmp[1].toString("utf8"),
						interval : tmp[2].toString("utf8"),
						tempInside : tmp[3].toString("utf8"),
						airMoistInside : tmp[4].toString("utf8"),
						tempOutside : tmp[5].toString("utf8"),
						airMoistOutside : tmp[6].toString("utf8"),
						relHPA : tmp[7].toString("utf8"),
						absHPA : tmp[8].toString("utf8"),
						windSpeed : tmp[9].toString("utf8"),
						windBy : tmp[10].toString("utf8"),
						windDir : tmp[11].toString("utf8"),
						dewPoint : tmp[12].toString("utf8"),
						windTemp : tmp[13].toString("utf8"),
						rainprhour : tmp[14].toString("utf8"),
						rainlasttwentyfour : tmp[15].toString("utf8"),
						rainlastweek : tmp[16].toString("utf8"),
						rainlastmonth : tmp[17].toString("utf8"),
						raintotal : tmp[18].toString("utf8")
					}	
					console.log( structure )
				}
			})
		})
	}
}
