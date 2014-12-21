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

function createChart( field , day , type ,  htmlelement, chartType , title){
	$.get( 'ajax/weather?field='+field+'&day='+day+'type='+type, function( data ){

		
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

		var panel   = document.createElement("div");
		$(panel).addClass( "panel panel-default");
		
		var heading = document.createElement("div");
		$(heading).addClass("panel-heading");
		$(heading).html( title);

		var body = document.createElement("div");
		$(body).addClass( "panel-body" );

		var canvas = document.createElement( "canvas" );
		$(canvas).attr("width", 400 );
		$(canvas).attr("height", 400 );

		$(body).append( canvas );

		$(panel).append( heading )

		$(panel).append( body )

		$(htmlelement).append( panel )


		// Draw
		var ctx = $(canvas).get(0).getContext("2d");		
		
		if( chartType == "line")
			var myLineChart = new Chart(ctx).Line(data, { animation : false } );

		if( chartType == "bar")
			var myLineChart = new Chart(ctx).Bar(data, { });


	});	
}

$(document).ready(function(){
	
	createChart( "tempOutside" , true , "max"  , "#colTmpOutside", "line" , "Tempratur ute");

	createChart( "airMoistOutside" , true , "max" , "#colAirMoistOutside" ,"line" , "Luftfuktighet ute"  );

	createChart( "dewPoint" , true , "max" , "#colDewPoint" ,"line" , "Duggpunkt"  );
	
	createChart( "rainprhour" , true , "max" ,  "#colRainPrHour" ,"line" , "Regn pr time"  );

	createChart( "windSpeed" , true , "max" ,  "#colWindSpeed" ,"line" , "Vindhastighet"  );

	createChart( "windTemp" , true , "max" ,  "#colWindTemp" ,"line" , "Vindtemperatur"  );

	//createChart( "dewPoint" , true , "max" , "#dewPoint" , "line" );
	

	$('#dateFrom').datetimepicker({ pickTime: false});
	$('#dateTo').datetimepicker({ pickTime: false});
});
