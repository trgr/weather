function formatDate( date , hastime){
	var datetring = date.getDate() + "-" + (date.getMonth() +1 ) + "-" + date.getFullYear()
	return datetring
}

function getDatasetAndLabels( data ){
	var setLength = data.length;
	var labels    = new Array()
	var dataset   = new Array()

	for( var i = 0; setLength >i; i++ ){
		var tmpDate = new Date();
		
		tmpDate.setFullYear( data[i]._id.year );
		tmpDate.setMonth( data[i]._id.month - 1 );
		tmpDate.setDate( data[i]._id.day );
		
		labels.push ( formatDate(tmpDate) );
		dataset.push( data[i].datapoint );
	}

	return { labels : labels, dataset:dataset }
}

function createChart( field , day , type , element , chartType){
	$.get( 'ajax/weather?field='+field+'&day='+day+'type='+type, function( data ){
		var ctx = $(element).get(0).getContext("2d");
		var dandl = getDatasetAndLabels( data )
		var data = {
			labels: dandl.labels,
			datasets: [
				{
					label: "Temperatur ute",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(0,220,220,1)",
					pointColor: "rgba(20,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: dandl.dataset
				}
			]
		};
		
		if( chartType == "line")
			var myLineChart = new Chart(ctx).Line(data, { });

		if( chartType == "bar")
			var myLineChart = new Chart(ctx).Bar(data, { });
		
	});	
}

$(document).ready(function(){
	
	createChart( "tempOutside" , true , "avg" , "#tmpOutside" , "line");

	createChart( "airMoistOutside" , true , "avg" , "#airMoistOutside" , "bar" );

	createChart( "dewPoint" , true , "avg" , "#dewPoint" , "line" );
	
});
