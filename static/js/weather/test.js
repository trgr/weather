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

$(document).ready(function(){
	// Get context with jQuery - using jQuery's .get() method.
	
	var ctx = $("#tmpOutside").get(0).getContext("2d");

	$.get( 'ajax/weather?field=tempOutside&day=true&type=min' , function( data ){
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
		
		
		var myLineChart = new Chart(ctx).Line(data, { });
	})

	
});
