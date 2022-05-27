function nonRenew() {

  d3.selectAll("svg").remove();
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var x = d3.scalePoint().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	var valueline1 = d3.line()
			    					.x(function(d) { return x(d.Years); })
			    					.y(function(d) { return y(d.BlackCoal); });
	var valueline2 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.BrownCoal); });
	var valueline3 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.NaturalGas); });
	var valueline4 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.OilProducts); });

	var svg = d3.select("#chart")
							.append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom)
							.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var svg2 = d3.select("#chart")
							 .append("svg")
						 	 .attr("width", 200)
							 .attr("height", 270)
							 .append("g");

	d3.csv("Question 1 Line Non Renew.csv").then(function(data) {
		data.forEach(function(d) {
					d.Years = d.Years;
					d.BlackCoal = +d.BlackCoal;
					d.BrownCoal = +d.BrownCoal;
					d.NaturalGas = +d.NaturalGas;
					d.OilProducts = +d.OilProducts;
        });

			x.domain(d3.map(data, function(d) { return d.Years; }));
			y.domain([0, d3.max(data, function(d) {
						return Math.max(d.BlackCoal, d.BrownCoal, d.NaturalGas, d.OilProducts); })]);


						svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[0])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline1);

								svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[1])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline2);

								svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[2])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline3);

								svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[3])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline4);


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


										var keys = ["Black Coal", "Brown Coal", "Natural Gas", "Oil Products"];

										var color = d3.scaleOrdinal()
											.domain(keys)
											.range(d3.schemeCategory10);

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
}

function Renew() {

  d3.selectAll("svg").remove();
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var x = d3.scalePoint().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	var valueline1 = d3.line()
			    					.x(function(d) { return x(d.Years); })
			    					.y(function(d) { return y(d.BagasseWood); });
	var valueline2 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.Biogas); });
	var valueline3 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.Wind); });
	var valueline4 = d3.line()
										.x(function(d) { return x(d.Years); })
										.y(function(d) { return y(d.Hydro); });
  var valueline5 = d3.line()
                    .x(function(d) { return x(d.Years); })
                    .y(function(d) { return y(d.LargeScaleSolarPV); });
  var valueline6 = d3.line()
                    .x(function(d) { return x(d.Years); })
                    .y(function(d) { return y(d.SmallScaleSolarPV); });

	var svg = d3.select("#chart")
							.append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom)
							.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var svg2 = d3.select("#chart")
							 .append("svg")
						 	 .attr("width", 200)
							 .attr("height", 270)
							 .append("g");

	d3.csv("Question 1 Line Renew.csv").then(function(data) {
		data.forEach(function(d) {
					d.Years = d.Years;
					d.BagasseWood = +d.BagasseWood;
					d.Biogas = +d.Biogas;
					d.Wind = +d.Wind;
					d.Hydro = +d.Hydro;
          d.LargeScaleSolarPV = +d.LargeScaleSolarPV;
					d.SmallScaleSolarPV = +d.SmallScaleSolarPV;
        });

			x.domain(d3.map(data, function(d) { return d.Years; }));
			y.domain([0, d3.max(data, function(d) {
						return Math.max(d.BagasseWood, d.Biogas, d.Wind, d.Hydro, d.LargeScaleSolarPV, d.SmallScaleSolarPV); })]);


						svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[0])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline1);

								svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[1])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline2);

								svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[2])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline3);

								svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[3])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline4);

                svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[4])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline5);

                svg.append("path")
								.data([data])
								.attr("class", "line")
								.style("stroke", d3.schemeCategory10[5])
								.attr("stroke-width", 2)
								.style("fill","none")
								.attr("d", valueline6);


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


										var keys = ["Bagasse / Wood", "Biogas", "Wind", "Hydro", "Large Scale Solar PV", "Small Scale Solar PV"];

										var color = d3.scaleOrdinal()
											.domain(keys)
											.range(d3.schemeCategory10);

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
}

window.onload = nonRenew()
