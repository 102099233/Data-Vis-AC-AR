var w = 850;
var h = 700;

var projection = d3.geoMercator()
                    .center([135, -30])
                    .translate([w/2, h/2])
                    .scale(1000);

var path = d3.geoPath()
              .projection(projection);

var color = d3.scaleOrdinal()
              .range(['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9']);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

d3.csv("Question 1 Map.csv").then( function(data) {
d3.json("aust.json").then(function(json) {
  svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "dimgray")
      .attr("fill", function(d, i) {return color(i)})
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration("50")
          .attr("opacity", ".50");
      })
      .on("mouseout", function () {
          d3.select(this)
            .transition()
            .duration("50")
            .attr("opacity", "1");
      });


  var Tooltip = d3.selectAll("#chart")
                  .append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 1)
                  .style("background-color", "white")
                  .style("border", "solid")
                  .style("border-width", "2px")
                  .style("border-radius", "5px")
                  .style("padding", "5px");

  var mouseover = function(event, d) {
         Tooltip.style("opacity", 1);
         }
  var mousemove = function(event, d) {
    if(d.TRenew == 0 && d.TNonRenew == 0)
    {
      Tooltip.html("State: " + d.STATE_NAME + "<br>" + "Total Renewable Energy: Data Not Available" + "<br>" + "Total Non-Renewable Energy: Data Not Available")
             .style("left", (d3.pointer(event.x)) + "px")
             .style("top", (d3.pointer(event.y)) + "px");
    }
    else {
      Tooltip.html("State: " + d.STATE_NAME + "<br>" + "Total Renewable Energy: " + d.TRenew + "<br>" + "Total Non-Renewable Energy: " + d.TNonRenew)
             .style("left", (d3.pointer(event.x)) + "px")
             .style("top", (d3.pointer(event.y)) + "px");
    }

    }
  var mouseout = function(event, d) {
         Tooltip.style("opacity", 0);
        }

  svg.selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d){ return projection([d.Long, d.Lat])[0] })
      .attr("cy", function(d){ return projection([d.Long, d.Lat])[1] })
      .attr("r", 14)
      .attr("class", "circle")
      .style("fill", "69b3a2")
      .attr("stroke", function(d, i) {return color(i)})
      .attr("stroke-width", 3)
      .attr("fill-opacity", .4)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout);
    })
})
