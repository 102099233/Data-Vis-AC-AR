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
  var dataSTATE_NAME = new Array();
  var dataTRenew = new Array();
  var dataTNonRenew = new Array();
  var jsonSTATE_NAME = new Array();
  for (var i=0; i < data.length; i++) {
    dataSTATE_NAME[i] = data[i].STATE_NAME;
    dataTRenew[i] = parseFloat(data[i].TRenew);
    dataTNonRenew[i] = parseFloat(data[i].TNonRenew);
    for(var j = 0; j < json.features.length; j++) {
      jsonSTATE_NAME[j] = json.features[j].properties.STATE_NAME;
    }
  }

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
      })
      .append("title")
      .text(function(d, i) {
          if(dataSTATE_NAME[i] == jsonSTATE_NAME[i])
          {
            if(dataTRenew[i] == 0 && dataTNonRenew[i] == 0)
            {
              return "Total Renewable: Data Not Available" + "\n" + "Total Non Renewable: Data Not Available";
            }
            else
            {
              return "Total Renewable: " + dataTRenew[i] + "\n" + "Total Non Renewable: " + dataTNonRenew[i];
            }
          }
      });

    })
})
