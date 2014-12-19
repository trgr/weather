var mongoose        = require( 'mongoose' )
var Schema          = mongoose.Schema


var WeatherLogSchema = {
	no : Number,
	time : Date,
	interval : Number,
	tempInside : Number,
	airMoistInside : Number,
	tempOutside : Number,
	airMoistOutside : Number,
	relHPA : Number,
	absHPA : Number,
	windSpeed : Number,
	windBy : Number,
	windDir : String,
	dewPoint : Number,
	windTemp : Number,
	rainprhour : Number,
	rainlasttwentyfour : Number,
	rainlastweek : Number,
	rainlastmonth : Number,
	raintotal : Number
}

module.exports = mongoose.model('WeatherLog', WeatherLogSchema)
