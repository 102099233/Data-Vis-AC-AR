var w = 500;
var h = 300;

var projection = d3.geoMercator()
                    .center([39.74739, -105])
                    .translate([w/2, h/2])
                    .scale(2500);

var path = d3.geoPath()
              .projection(projection);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

d3.json("australia.geo.json").then(function(json) {
  svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path);
})
