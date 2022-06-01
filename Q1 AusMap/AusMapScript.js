var w = 700;
var h = 450;
//creating projection
var projection = d3.geoMercator()
                    .center([135, -28])
                    .translate([w/2, h/2])
                    .scale(600);
//creating path
var path = d3.geoPath()
              .projection(projection);
//scaling the colours
var color = d3.scaleOrdinal()
              .range(['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9']);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
//parsing in data
d3.csv("Question 1 Map.csv").then( function(data) {
d3.json("aust.json").then(function(json) {      //loading in json file for map of Australia

    for (var i=0; i < data.length; i++) {
      var dataSTATE_NAME = data[i].STATE_NAME;
      var dataTRenew = parseFloat(data[i].TRenew);
      var dataTNonRenew = parseFloat(data[i].TNonRenew);
      for(var j = 0; j < json.features.length; j++) {
        var jsonSTATE_NAME = json.features[j].properties.STATE_NAME;
        if (dataSTATE_NAME == jsonSTATE_NAME)
        {
          json.features[j].properties.TRenew = dataTRenew;//json features stores the data from the csv file into properties value called TRenew
          json.features[j].properties.TNonRenew = dataTNonRenew;
          break;
        }
      }
    }
    var Tooltip = d3.select("#chart") //tooltip is created
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0)
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px")
                    .style("position", "absolute");
//creating state names on the map
  svg.selectAll("text")
    .data(json.features)
    .enter()
  	.append("text")
    .attr("fill", "darkslategray")
  	.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
  	.attr("text-anchor", "middle")
  	.attr("dy", ".35em")
    .text(function(d) {
      	return d.properties.STATE_NAME;
                    				});
//appending the path through json features
  svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "dimgray")
      .attr("fill", function(d, i) {return color(i)}) //each state is given a colour from the colour function
      .on("mouseover", function (event, d) { //mouseover function to create interactivity
        d3.select(this)
          .transition()
          .duration("50")
          .attr("opacity", ".50");
          Tooltip.style("opacity", 1);//changes tooltip to visible

      })
      .on("mousemove", function(event, d) { //creates tooltip when mouse is moved
        if(d.properties.TRenew == 0 && d.properties.TNonRenew == 0)
        {
          Tooltip.html("State: " + d.properties.STATE_NAME + "<br>" + "Total Renewable Energy: Data Not Available" + "<br>" + "Total Non-Renewable Energy: Data Not Available")
                 .style("left", (d3.pointer(event)[0]) + "px")
                 .style("top", (d3.pointer(event)[1]) + "px");
        }
        else {
          Tooltip.html("State: " + d.properties.STATE_NAME + "<br>" + "Total Renewable Energy: " + d.properties.TRenew + " GWh" + "<br>" + "Total Non-Renewable Energy: " + d.properties.TNonRenew + " GWh")
                 .style("left", `${d3.pointer(event)[0]}px`)
                 .style("top", `${d3.pointer(event)[1]}px`);
        }

        })
      .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration("50")
            .attr("opacity", "1");
            Tooltip.style("opacity", 0);//hides tooltip on mouseout
      });
    })
})
