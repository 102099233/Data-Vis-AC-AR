function base(){
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 20, left: 50},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  //create svg for chart and legend
  var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right + 20)
  .attr("height", height + margin.top + margin.bottom + 20)
  .append("g")
  .attr("transform", "translate(" + (margin.left + 20) + "," + margin.top + ")");

  var svg2 = d3.select("#chart")
          .append("svg")
          .attr("width", 200)
          .attr("height", 270)
          .append("g");

  // Parse the Data
  d3.csv("Question 3 Segmented Bar CSV.csv").then( function(data) {

  // List of subgroups = header of the csv files = soil condition here
const subgroups = data.columns.slice(1)

// List of groups = species here = value of the first column called States
const groups = data.map(d => (d.group))

  // Add X axis
  const x = d3.scaleBand()
  .domain(groups)
  .range([0, width])
  .padding([0.2]);
  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  const y = d3.scaleLinear()
  .domain([0, 1500])
  .range([ height, 0 ]);
  svg.append("g")
  .call(d3.axisLeft(y));

  //Axis labels
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2)
      .attr("y", height + margin.top + 20)
      .text("States");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -(height/2))
      .text("Net Energy Consumption (PJ)");

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal()
  .domain(subgroups)
  .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6']);

  //stack data
  var stack = d3.stack()
                  .keys(subgroups)

  var series = stack(data);

  // Show the bars
  svg.append("g")
  .selectAll("g")
  // Enter in the stack data = loop key per key = group per group
  .data(series)
  .join("g")
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  // enter a second time = loop subgroup per subgroup to add all rectangles
  .data(d => d)
  .join("rect")
      .attr("x", d => x(d.data.group))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width",x.bandwidth());
  
  //creating keys for the legend and settign colour to each one
  var keys = ["Residential", "Agriculture", "Mining", "Manufacturing", "Electricity Generation", "Construction", "Transport", "Water Waste", "Commercial Services"];
  
  var colors = d3.scaleOrdinal()
              .domain(keys)
              .range(['#cab2d6','#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00']);
              //['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6']

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
  })
}

window.onload = base;