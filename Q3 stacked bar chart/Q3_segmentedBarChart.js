function base(){
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    d3.csv("Question 3 Segmented Bar CSV.csv").then( function(data) {

    // List of subgroups = header of the csv files = soil condition here
  const subgroups = data.columns

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

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']);

    // //Set up scales
    // var xScale = d3.scaleBand()
    //     .domain(d3.range(data.length))
    //     .range([0, width])
    //     .paddingInner(0.05);

    // var yScale = d3.scaleLinear()
    //     .domain([0,				
    //         d3.max(data, function(d) {
    //             return d.Agriculture + d.Mining + d.Manufacturing + d.ElectricityGeneration + d.Construction + 
    //             d.Transport + d.WaterWaste + d.CommercialServices + d.Residential;
    //         })
    //     ])
    //     .range([height, 0]);

    //stack data
    var stack = d3.stack()
                    .keys(subgroups)

    var series = stack(data);

    // var group = svg.selectAll("g")
    //     .data(series)
    //     .enter()
    //     .append("g")
    //     .style("fill", function(d, i) {
    //         return colors(i);
    //     });

    // var rects = group.selectAll("rect")
    //     .data(function(d) { return d; })
    //     .enter()
    //     .append("rect")
    //     .attr("x", function(d, i) {
    //         return xScale(i);
    //     })
    //     .attr("y", function(d) {
    //         return yScale(d[1]);
    //     })
    //     .attr("height", function(d) {
    //         return yScale(d[0]) - yScale(d[1]);
    //     })
    //     .attr("width", xScale.bandwidth());

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
    })
}

window.onload = base;