function base(){
    var w = 300;
    var h = 300;

    d3.csv("Question 3 Segmented Bar CSV.csv").then(function(data) {
        data.forEach(function(d) {
            //d.States = d.States
            d.Agriculture = d.Agriculture;
		    d.Mining = d.Mining;
		    d.Manufacturing = d.Manufacturing;
			d.ElectricityGeneration = d.ElectricityGeneration;
			d.Construction = d.Construction;
			d.Transport = d.Transport;
			d.WaterWaste = d.WaterWaste;
			d.CommercialServices = d.CommercialServices;
			d.Residential = d.Residential;
        });
        console.log(data);

        //Set up stack method
        var stack = d3.stack()
        .keys([ /*"States",*/ "Agriculture", "Mining", "Manufacturing", "ElectricityGeneration", 
        "Construction", "Transport", "WaterWaste", "CommercialServices", "Residential" ])
        .order(d3.stackOrderDescending); 

        var series = stack(data);

        //Set up scales
        var xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, w])
        .paddingInner(0.05);

        var yScale = d3.scaleLinear()
        .domain([0,				
        d3.max(data, function(d) {
        return d.Agriculture + d.Mining + d.Manufacturing + d.ElectricityGeneration + d.Construction + d.Transport + 
        d.WaterWaste + d.CommercialServices + d.Residential;
        })
        ])
        .range([h, 0]);

        var colors = d3.scaleOrdinal(d3.schemeCategory10);

        //Create SVG element
        var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
        return colors(i);
        });

        //create bars
        var rects = groups.selectAll("rect")
        .data(series)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
        return xScale(i);
        })
        .attr("y", function(d) {
        return yScale(d[1]);
        })
        .attr("height", function(d) {
        return console.log(d[0]) - yScale(d[1]);//yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth());
    });

    
}

window.onload = base;