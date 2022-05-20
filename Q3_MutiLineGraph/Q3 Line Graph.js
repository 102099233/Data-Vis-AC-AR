
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scalePoint().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var valueline1 = d3.line()
		    					.x(function(d) { return x(d.Years); })
		    					.y(function(d) { return y(d.Agriculture); });
var valueline2 = d3.line()
									.x(function(d) { return x(d.Years); })
									.y(function(d) { return y(d.Mining); });
var valueline3 = d3.line()
									.x(function(d) { return x(d.Years); })
									.y(function(d) { return y(d.Manufacturing); });
var valueline4 = d3.line()
									.x(function(d) { return x(d.Years); })
									.y(function(d) { return y(d.ElectricityGeneration); });
var valueline5 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.Construction); });
var valueline6 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.Transport); });
var valueline7 = d3.line()
									.x(function(d) { return x(d.Years); })
									.y(function(d) { return y(d.WaterWaste); });
var valueline8 = d3.line()
									.x(function(d) { return x(d.Years); })
									.y(function(d) { return y(d.CommercialServices); });
var valueline9 = d3.line()
									.x(function(d) { return x(d.Years); })
									.y(function(d) { return y(d.Residential); });

var svg = d3.select("#chart")
						.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Question 3 Line Chart CSV.csv").then(function(data) {
					data.forEach(function(d) {
						    d.Years = d.Years;
						    d.Agriculture = +d.Agriculture;
						    d.Mining = +d.Mining;
								d.Manufacturing = d.Manufacturing;
						    d.ElectricityGeneration = +d.ElectricityGeneration;
								d.Construction = +d.Construction;
						    d.Transport = +d.Transport;
								d.WaterWaste = +d.WaterWaste;
								d.CommercialServices = +d.CommercialServices;
								d.Residential = +d.Residential;
						  	});

					x.domain(d3.map(data, function(d) { return d.Years; }));
					y.domain([0, d3.max(data, function(d) {
	  					return Math.max(d.Agriculture, d.Mining, d.Manufacturing, d.ElectricityGeneration, d.Construction, d.Transport, d.WaterWaste, d.CommercialServices, d.Residential); })]);

					svg.append("path")
	       			.data([data])
	       			.attr("class", "line")
							.style("fill","none")
	       			.attr("d", valueline1);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline2);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline3);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline4);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline5);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline6);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline7);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline8);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", "red")
							.style("fill","none")
							.attr("d", valueline9);



	   			svg.append("g")
	       			.attr("transform", "translate(0," + height + ")")
	       			.call(d3.axisBottom(x));


	   			svg.append("g")
	       			.call(d3.axisLeft(y));

	 });
