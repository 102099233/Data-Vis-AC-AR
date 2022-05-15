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

    for (var i=0; i < data.length; i++) {
      var dataSTATE_NAME = data[i].STATE_NAME;
      var dataTRenew = parseFloat(data[i].TRenew);
      var dataTNonRenew = parseFloat(data[i].TNonRenew);
      for(var j = 0; j < json.features.length; j++) {
        var jsonSTATE_NAME = json.features[j].properties.STATE_NAME;
        if (dataSTATE_NAME == jsonSTATE_NAME)
        {
          json.features[j].properties.TRenew = dataTRenew;
          json.features[j].properties.TNonRenew = dataTNonRenew;
          break;
        }
      }
    }
    console.log(JSON.stringify(json.features[1].properties));
    var Tooltip = d3.selectAll("#chart")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 1)
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px");

  svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "dimgray")
      .attr("fill", function(d, i) {return color(i)})
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration("50")
          .attr("opacity", ".50");
          Tooltip.style("opacity", 1);

      })
      .on("mousemove", function(event, d) {
        if(d.properties.TRenew == 0 && d.properties.TNonRenew == 0)
        {
          Tooltip.html("State: " + d.properties.STATE_NAME + "<br>" + "Total Renewable Energy: Data Not Available" + "<br>" + "Total Non-Renewable Energy: Data Not Available")
                 .style("left", (d3.pointer(event.x)) + "px")
                 .style("top", (d3.pointer(event.y)) + "px");
        }
        else {
          Tooltip.html("State: " + d.properties.STATE_NAME + "<br>" + "Total Renewable Energy: " + d.properties.TRenew + "<br>" + "Total Non-Renewable Energy: " + d.properties.TNonRenew)
                 .style("left", (d3.pointer(event.x)) + "px")
                 .style("top", (d3.pointer(event.y)) + "px");
        }

        })
      .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration("50")
            .attr("opacity", "1");
            Tooltip.style("opacity", 0);
      });
    })
})
