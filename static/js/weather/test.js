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

function createChart( startDate , endDate ,field , day , type ,  htmlelement, chartType , title){
	$.get( 'ajax/weather?field='+field+'&day='+day+'&type='+type+'&startDate='+startDate+'&endDate='+endDate, function( data ){

		
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

		$(panel).append( body );

		$(htmlelement).html("" );
		$(htmlelement).append( panel );


		// Draw
		var ctx = $(canvas).get(0).getContext("2d");		
		
		if( chartType == "line")
			var myLineChart = new Chart(ctx).Line(data, { animation : false } );

		if( chartType == "bar")
			var myLineChart = new Chart(ctx).Bar(data, { });


	});	
}


function drawCharts( startDate , endDate , graphFunction ){
	createChart( startDate , endDate , "tempOutside" , true , "max"  , "#colTmpOutside", "line" , "Tempratur ute");

	createChart( startDate , endDate ,"airMoistOutside" , true , "max" , "#colAirMoistOutside" ,"line" , "Luftfuktighet ute"  );

	createChart( startDate , endDate ,"dewPoint" , true , "max" , "#colDewPoint" ,"line" , "Duggpunkt"  );
	
	createChart( startDate , endDate , "rainprhour" , true , "max" ,  "#colRainPrHour" ,"line" , "Regn pr time"  );

	createChart( startDate , endDate ,"windSpeed" , true , "max" ,  "#colWindSpeed" ,"line" , "Vindhastighet"  );

	createChart( startDate , endDate , "windTemp" , true , "max" ,  "#colWindTemp" ,"line" , "Vindtemperatur"  );
}

function draw(){
	var startDate = new Date( $("#dateFromVal").val() );
	var endDate   = new Date( $("#dateToVal").val() );
	console.log( startDate );
	console.log( endDate );
	if( startDate == "Invalid Date" || endDate == "Invalid Date" ){
		startDate = new Date();
		endDate   = new Date();
		startDate.setMonth( startDate.getMonth() - 1 );			
	}
	console.log( startDate );
	console.log( endDate );
	
	drawCharts( startDate , endDate , "min" );
}
$(document).ready(function(){

	

	$('#dateFrom').datetimepicker({ pickTime: false});
	$('#dateTo').datetimepicker({ pickTime: false});

	draw();
	
	$("#updatebtn").click( function(){
		draw();		
	})
});
