function init() {
	var w = 600;
	var h = 300;

	var dataset;
//download from the csv file
	d3.csv("Question 3 Line Chart CSV.csv").then(function(data) {
						dataset = data;
						lineChart(dataset);
						console.table(dataset);//creates a table in the console so can see the data stored
					});
}

function lineChart(dataset) {
		var w = 600;
		var h = 300;
		var padding = 20;
 xScale = d3.scaleTime()
									.domain([d3.min(dataset, function(d) {return d.Years;}),//scaling in the x axis with domain being min date and max date
														d3.max(dataset, function(d) {return d.Years;})
													])
									.range([padding + 60, w-padding]);



yScale = d3.scaleLinear()
									.domain([0, d3.max(dataset, function(d) { return d.number; })])//scaling in the y axis
									.range ([h - padding, padding]);

 area = d3.area()
 					.x(function(d) { return xScale(d.date); })//area chart with x component being date and y component being the number. And the filling of the area being y0.
					.y0(function() { return yScale.range() [0]; })
					.y1(function(d) { return yScale(d.number); });



	var svg = d3.select("#chart") //creates svg in chart
				.append("svg")
				.attr("width", w)
				.attr("height", h);

			svg.append("path")//creates a path with the area chart
			.datum(dataset)
			.attr("class", "area")
			.attr("d", area);

			svg.append("line")
					.attr("class", "line halfMilMark")//creates a line across the chart
					.attr("x1", padding +60)
					.attr("y1", yScale(500000))
					.attr("x2", w - padding)
					.attr("y2", yScale(500000));

			svg.append("text")
					.attr("class", "halfMilLabel")//creates a label for the line across the chart
					.attr("x", padding + 80)
					.attr("y", yScale(500000) - 7)
					.text("Half a million unemployed");

					var xAxis = d3.axisBottom().ticks(10).scale(xScale);//creates x axis label and y axis label

					var yAxis = d3.axisLeft().ticks(10).scale(yScale);

							svg.append("g")
									.attr("transform", "translate(0, " + (h - padding) + ")")
									.call(xAxis);

							svg.append("g")
									.attr("transform", "translate(" + (padding + 60) + ", 0)")
									.call(yAxis);
}

window.onload = init;
