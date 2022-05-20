
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

var svg2 = d3.select("#chart")
						.append("svg")
						.attr("width", 200)
						.attr("height", 400)
						.append("g");


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
							.style("stroke", d3.schemeSet3[0])
							.attr("stroke-width", 2)
							.style("fill","none")
	       			.attr("d", valueline1);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[1])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline2);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[2])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline3);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[3])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline4);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[4])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline5);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[5])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline6);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[6])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline7);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[7])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline8);

							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeSet3[8])
							.attr("stroke-width", 2)
							.style("fill","none")
							.attr("d", valueline9);

	   			svg.append("g")
	       			.attr("transform", "translate(0," + height + ")")
	       			.call(d3.axisBottom(x));

	   			svg.append("g")
	       			.call(d3.axisLeft(y));

					svg.append('g')
							.attr('class', 'grid')
							.attr('transform', 'translate(0,' + height + ')')
							.call(d3.axisBottom(x).tickSize(-height).tickFormat(''));

					svg.append('g')
							.attr('class', 'grid')
							.call(d3.axisLeft(y).tickSize(-width).tickFormat(''));


							var keys = ["Agriculture", "Mining", "Manufacturing", "Electricity Generation", "Construction", "Transport", "WaterWaste", "Commercial Services", "Residential"];

							var color = d3.scaleOrdinal()
								.domain(keys)
								.range(d3.schemeSet3);

							svg2.selectAll("mydots")
								.data(keys)
								.enter()
								.append("circle")
								.attr("cx", 10)
								.attr("cy", function(d,i){ return 25 + i*25})
								.attr("r", 7)
								.style("fill", function(d){ return color(d)});

							svg2.selectAll("mylabels")
								.data(keys)
								.enter()
								.append("text")
								.attr("x", 30)
								.attr("y", function(d,i){ return 25 + i*25})
								.style("fill", function(d){ return color(d)})
								.text(function(d){ return d})
								.attr("text-anchor", "left")
								.style("alignment-baseline", "middle");
	 });
