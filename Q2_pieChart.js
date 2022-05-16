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

    d3.csv("Question2_PieChart.csv").then(function(data) {
        var dataInt = new Array();
        var dataTitle = new Array();

        for(var i=0; i < data.length; i++) {
            dataTitle[i] = data[i].State;
        }

        for(var i=0; i < data.length; i++) {
            dataInt[i] = data[i].Total_Emission;
        }

        //Set up groups
        var arcs = svg.selectAll("g.arc")
                    .data(pie(dataInt))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
                    .on("mouseover", function(d, event) {
                        // var xPosition = parseFloat(d3.select( this ).attr("x")) + xScale.bandwidth() / 2; 
                        //     var yPosition = parseFloat(d3.select( this ).attr("y")) + 14;
            
                            // svg.append("text") 
                            // .attr("id", "tooltip") 
                            // .attr("x", xPosition) 
                            // .attr("y", yPosition) 
                            // .attr("text-anchor", "middle") 
                            // .attr("font-family", "sans-serif") 
                            // .attr("font-size", "11px") 
                            // .attr("font-weight", "bold") 
                            // .attr("fill", "black") 
                            // .text(d);
            
                            d3.select(this)
                                .attr("fill", "orange");
                    })
                    .on("mouseout", function() {
                        d3.select("#tooltip").remove();
                        d3.select(this)
                            .attr("fill", "yellow");
                    });

        //Draw arc paths
        arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

        //Labels
        // arcs.append("text")
        //     .attr("transform", function(dataTitle) {
        //         return "translate(" + arc.centroid(dataTitle) + ")";
        //     })
        //     .attr("text-anchor", "middle")
        //     .text(function(dataTitle) {
        //         console.log(dataTitle[i]);
        //         return dataTitle.value;
        // });
    });
}

window.onload = base;