//Multi line chart
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
//setting x and y scales
var x = d3.scalePoint().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
//creating each line based on column heading
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


//create svg for chart and legend
var svg = d3.select("#line")
						.append("svg")
						.attr("width", width + margin.left + margin.right + 20)
						.attr("height", height + margin.top + margin.bottom + 20)
						.append("g")
						.attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");

var svg2 = d3.select("#line")
						.append("svg")
						.attr("width", 200)
						.attr("height", 270)
						.append("g");

//calling data source
d3.csv("Question 3 Line Chart CSV.csv").then(function(data) {
  //storing data in string or numerical form
					data.forEach(function(d) {
						    d.Years = d.Years;
						    d.Agriculture = +d.Agriculture;
						    d.Mining = +d.Mining;
								d.Manufacturing = +d.Manufacturing;
						    d.ElectricityGeneration = +d.ElectricityGeneration;
								d.Construction = +d.Construction;
						    d.Transport = +d.Transport;
								d.WaterWaste = +d.WaterWaste;
								d.CommercialServices = +d.CommercialServices;
								d.Residential = +d.Residential;
						  	});
//creating tooltip variable
                var Tooltip = d3.select("#line")
                                .append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0)
                                .style("background-color", "white")
                                .style("border", "solid")
                                .style("border-width", "2px")
                                .style("border-radius", "5px")
                                .style("padding", "5px")
                                .style("position", "absolute");

//setting domain based on values of data
					x.domain(d3.map(data, function(d) { return d.Years; }));
					y.domain([0, d3.max(data, function(d) {
	  					return Math.max(d.Agriculture, d.Mining, d.Manufacturing, d.ElectricityGeneration, d.Construction, d.Transport, d.WaterWaste, d.CommercialServices, d.Residential); })]);

//appending paths for each line include on mouse functions

//Value Line 1
					svg.append("path")
	       			.data([data])
	       			.attr("class", "line")
							.style("stroke", d3.schemeCategory10[0]) //giving colour to line
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")//setting cursor to pointer
	       			.attr("d", valueline1)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[0] + " Energy Consumption")
                         .style("left", (d3.pointer(event)[0]+20) + "px")
                         .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 2
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[1])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline2)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[1] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 3
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[2])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline3)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[2] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 4
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[3])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline4)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[3] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 5
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[4])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline5)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[4] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 6
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[5])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline6)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[5] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 7
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[6])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline7)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[6] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 8
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[7])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline8)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[7] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//Value Line 9
							svg.append("path")
							.data([data])
							.attr("class", "line")
							.style("stroke", d3.schemeCategory10[8])
							.attr("stroke-width", 4)
							.style("fill","none")
              .style("cursor", "pointer")
							.attr("d", valueline9)
              .on("mouseover", function (event, d) {
                d3.select(this)
                  .transition()
                  .duration("50")
                  .attr("opacity", ".50");
                  Tooltip.style("opacity", 1);

              })
              .on("mousemove", function(event, d) {
                  Tooltip.html(keys[8] + " Energy Consumption")
                  .style("left", (d3.pointer(event)[0]+20) + "px")
                  .style("top", (d3.pointer(event)[1]+380) + "px");
                })
              .on("mouseout", function (event, d) {
                  d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
                    Tooltip.style("opacity", 0);
              });

//appending axis to chart
	   			svg.append("g")
	       			.attr("transform", "translate(0," + height + ")")
	       			.call(d3.axisBottom(x));

	   			svg.append("g")
	       			.call(d3.axisLeft(y));

//Axis labels
              svg.append("text")
                  .attr("text-anchor", "end")
                  .attr("x", width/2)
                  .attr("y", height + margin.top + 20)
                  .text("Years");

              svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "rotate(-90)")
                  .attr("y", -margin.left)
                  .attr("x", -(height/2))
                  .text("Net Energy Consumption (PJ)");

//Appending background grid to chart
					svg.append('g')
							.attr('class', 'grid')
							.attr('transform', 'translate(0,' + height + ')')
							.call(d3.axisBottom(x).tickSize(-height).tickFormat(''));

					svg.append('g')
							.attr('class', 'grid')
							.call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

//creating keys for the legend and settign colour to each one
							var keys = ["Agriculture", "Mining", "Manufacturing", "Electricity Generation", "Construction", "Transport", "Water Waste", "Commercial Services", "Residential"];

							var color = d3.scaleOrdinal()
								.domain(keys)
								.range(d3.schemeCategory10);

//Placing dots on the legend
							svg2.selectAll("mydots")
								.data(keys)
								.enter()
								.append("circle")
								.attr("cx", 10)
								.attr("cy", function(d,i){ return 25 + i*25})
								.attr("r", 7)
								.style("fill", function(d){ return color(d)});

//Placing key values on the legend
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
