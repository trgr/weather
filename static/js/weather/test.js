function formatDate( date , hastime){

	var datestring = date.getDate() + "-" + (date.getMonth() +1 ) + "-" + date.getFullYear()
	if( hastime )
		datestring +=  " " + date.getHours() + ":" + date.getMinutes();
	
	return datestring
}

function getDatasetAndLabels( data , showHours ){
	var setLength = data.length;
	var labels    = new Array()
	var dataset   = new Array()

	for( var i = 0; setLength >i; i++ ){
		var tmpDate = new Date();
		
		tmpDate.setFullYear( data[i]._id.year );
		tmpDate.setMonth( data[i]._id.month - 1 );
		tmpDate.setDate( data[i]._id.day );
		tmpDate.setMinutes( 0 );
		if( data[i]._id.hour )
			tmpDate.setHours( data[i]._id.hour );
		
		
		labels.push ( formatDate(tmpDate , showHours ) );
		dataset.push( data[i].datapoint );
	}

	return { labels : labels, dataset:dataset }
}

function createChart( startDate , endDate , showHours ,field , day , type ,  htmlelement, chartType , title){
	$.get( 'ajax/weather?field='+field+'&day='+day+'&type='+type+'&startDate='+startDate+'&endDate='+endDate+'&showHours='+showHours , function( data ){
		var dandl = getDatasetAndLabels( data , showHours );
		
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


function drawCharts( startDate , endDate , graphFunction , showHours ){
	createChart( startDate , endDate , showHours ,  "tempOutside" , true , graphFunction  , "#colTmpOutside", "line" , "Temperatur ute");

	createChart( startDate , endDate , showHours , "airMoistOutside" , true , graphFunction , "#colAirMoistOutside" ,"line" , "Luftfuktighet ute"  );

	createChart( startDate , endDate , showHours , "dewPoint" , true , graphFunction , "#colDewPoint" ,"line" , "Duggpunkt"  );
	
	createChart( startDate , endDate , showHours , "rainprhour" , true , graphFunction ,  "#colRainPrHour" ,"line" , "Regn pr time"  );

	createChart( startDate , endDate , showHours , "windSpeed" , true , graphFunction ,  "#colWindSpeed" ,"line" , "Vindhastighet"  );

	createChart( startDate , endDate , showHours , "windTemp" , true , graphFunction ,  "#colWindTemp" ,"line" , "Vindtemperatur"  );

	createChart( startDate , endDate , showHours , "relHPA" , true , graphFunction ,  "#colRelHPA" ,"line" , "Rel HPA"  );

	createChart( startDate , endDate , showHours , "absHPA" , true , graphFunction ,  "#colAbsHPA" ,"line" , "Abs HPA"  );
}

function draw(){
	var startDate = new Date( $("#dateFromVal").val() );
	var endDate   = new Date( $("#dateToVal").val() );

	var graphFunction = $("#graphFunc").val();

	var showHours = $("#showHours").is(":checked");
	if( startDate == "Invalid Date" || endDate == "Invalid Date" ){
		startDate = new Date();
		endDate   = new Date();
		startDate.setMonth( startDate.getMonth() - 1 );			
	}
	console.log( showHours );
	drawCharts( startDate , endDate ,  graphFunction , showHours );
}
$(document).ready(function(){
	

	$('#dateFrom').datetimepicker({ pickTime: false});
	$('#dateTo').datetimepicker({ pickTime: false});

	draw();
	
	$("#updatebtn").click( function(){
		draw();		
	})
});
