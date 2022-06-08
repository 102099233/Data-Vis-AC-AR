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
	var color = d3.scaleOrdinal(d3.schemeCategory10);

	//Create SVG element
	var svg = d3.select("#chart")
			    .append("svg")
				.attr("width", w)
				.attr("height", h);

    var svg2 = d3.select("#chart")
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

        //creating tooltip variable
        // var Tooltip = d3.select("#chart")
        //         .append("div")
        //         .attr("class", "tooltip")
        //         .style("opacity", 0)
        //         .style("background-color", "white")
        //         .style("border", "solid")
        //         .style("border-width", "2px")
        //         .style("border-radius", "5px")
        //         .style("padding", "5px")
        //         .style("position", "absolute");

        //Set up groups
        var arcs = svg.selectAll("g.arc")
                    .data(pie(dataInt))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                    .on('mouseover', function (d, i) { //hover feature
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '.85')
                            .style("cursor", "pointer")
                            // path.append("svg:title")
                            // .text( function (d) { 
                            //     return "This value is ";
                            // });
                        // div.transition()
                        //     .duration(50)
                        //     .style("opacity", 1);
                        // let num = 'Total emissions: ' + i;
                        // div.html(num)
                        //     .style("left", (d3.event.pageX + 10) + "px")
                        //     .style("top", (d3.event.pageY - 15) + "px");
                    })
                    // .on("mousemove", function(event, d) {
                    //     Tooltip.html("Total emissions: " + d.value)
                    //            .style("left", (d3.pointer(event)[0]) + "px")
                    //            .style("top", (d3.pointer(event)[1]) + "px");
                    // })
                    .on('mouseout', function (d, i) {
                        d3.select(this).transition()
                            .duration('50')
                            .attr('opacity', '1');
                    });

        //Draw arc paths
        arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);
    
    //creating keys for the legend and settign colour to each one
    var keys = ["VIC", "NSW", "QLD", "TAS", "SA", "WA", "NT", "ACT"];

    var colors = d3.scaleOrdinal()
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