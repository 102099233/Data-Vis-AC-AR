function base(){
    var w = 300;
    var h = 300;
    var outerRadius = w / 2;
	var innerRadius = 0;
	var arc = d3.arc()
		        .innerRadius(innerRadius)
				.outerRadius(outerRadius);
			
	var pie = d3.pie();
			
	//Easy colors accessible via a 10-step ordinal scale
	var color = d3.scaleOrdinal(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f']);

	//Create SVG element
	var svg = d3.select("#pie")
			    .append("svg")
				.attr("width", w)
				.attr("height", h);

    var svg2 = d3.select("#pie")
                .append("svg")
                .attr("width", 200)
                .attr("height", 270)
                .append("g");

    d3.csv("Question2_PieChart.csv").then(function(data) {
        var dataInt = new Array();
        var dataTitle = new Array();

        for(var i=0; i < data.length; i++) {
            dataTitle[i] = data[i].State;
        }

        for(var i=0; i < data.length; i++) {
            dataInt[i] = data[i].Total_Emission;
        }

        var Tooltip = d3.select("#pie")
                        .append("div")
                        .style("opacity", 0)
                        .attr("class", "tooltip")
                        .style("background-color", "white")
                        .style("border", "solid")
                        .style("border-width", "2px")
                        .style("border-radius", "5px")
                        .style("padding", "5px")
                        .style("position", "absolute");

        //Set up groups
        var arcs = svg.selectAll("g.arc")
                    .data(pie(dataInt))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                    .on('mouseover', function () { //hover feature
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '.85')
                            .style("cursor", "pointer")
                            Tooltip.style("opacity", 1);
                    })
                    .on("mousemove",  function(event, d) {
                    Tooltip.html("Total emissions (t CO2-e) of " + keys[d.index] + ": " + d.value)
                            .style("left", (d3.pointer(event)[0]+250) + "px")
                            .style("top", (d3.pointer(event)[1]+500) + "px")
                            console.log("Total emissions (t CO2-e) of " + keys[d.index] + ": " + d.value);
                        })
                    .on('mouseout', function () {
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '1')
                            Tooltip.style("opacity", 0);
                    });

        //Draw arc paths
        arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);
    
    //creating keys for the legend and settign colour to each one
    var keys = ["QLD", "NSW", "VIC", "WA", "SA", "NT", "TAS"];

    var colors = d3.scaleOrdinal()
        .domain(keys)
        .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f']);

    //Placing dots on the legend
    svg2.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
        .attr("cx", 10)
        .attr("cy", function(d,i){ return 25 + i*25})
        .attr("r", 7)
        .style("fill", function(d){ return colors(d)});

    //Placing key values on the legend
    svg2.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 30)
        .attr("y", function(d,i){ return 25 + i*25})
        .style("fill", function(d){ return colors(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    });
}

window.onload = base;