var w = 500;
var h = 450;

var projection = d3.geoMercator()
                    .center([135, -30])
                    .translate([w/2, h/2])
                    .scale(500);

var path = d3.geoPath()
              .projection(projection);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey")
            .on("mouseover", function(event, d) {
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;//creates a position with x, y coordinates to add text to
                var yPosition = parseFloat(d3.select(this).attr("y")) + 14;//so on mouseover it creates the text based on the coordinates created.
                svg.append("text")
                  .attr("id", "tooltip")
                  .attr("x", xPosition)
                  .attr("y", yPosition)
                  .attr("text-anchor", "middle")
                  .attr("font-family", "sans-serif")
                  .attr("font-weight", "bold")
                  .attr("fill", "black")
                  .text(d);
                d3.select(this)
                  .attr("fill", "orange");})
            .on("mouseout", function() {
              d3.select("#tooltip").remove();//removes the tooltip that was previously created in mouseover
              d3.select(this)
                .attr("fill", "slategrey");});

var xScale = d3.scaleBand()
              .domain([0,h])
              .rangeRound([0,w]);

d3.json("aus_state.geojson").then(function(json) {
  svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path);
})
