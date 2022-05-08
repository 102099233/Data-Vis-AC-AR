var w = 500;
var h = 300;

var projection = d3.geoMercator()
                    .center([159.07, -31.5023])
                    .translate([w/2, h/2]);
                    //.scale(0);

var path = d3.geoPath()
              .projection(projection);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey");

d3.json("aus_state.geojson").then(function(json) {
  svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path);
})
