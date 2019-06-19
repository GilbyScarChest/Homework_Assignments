// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;



// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("./assets/data/data.csv").then(function(risks) {

  // Print the risks
  console.log(risks);

  // Cast the poverty and healthcare to a number for each piece of risks
  risks.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // create scales
    var povertyXAxis = d3.scaleLinear()
        .domain(d3.extent(risks, d => d.poverty))
        .range([0, chartWidth]);

    var healthcareYAxis = d3.scaleLinear()
        .domain([0, d3.max(risks, d => d.healthcare)])
        .range([chartHeight, 0]);


    // create axes
    var xAxis = d3.axisBottom(povertyXAxis).ticks(6);
    var yAxis = d3.axisLeft(healthcareYAxis).ticks(6);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

  // append circles
  var circlesGroup = chartGroup.selectAll("circle")
        .data(risks)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => povertyXAxis(d.poverty))
        .attr("cy", d => healthcareYAxis(d.healthcare))
        .attr("r", "15")

    // append abbr text to same location as circles
    chartGroup.selectAll("text")
        .data(risks)
        .enter()
        .append("text")
        .classed("stateText", true)
        .text(d => d.abbr)
        .attr("x", d => povertyXAxis(d.poverty))
        .attr("y", d => healthcareYAxis(d.healthcare) + 6)

    // Chart Labels
    var xText = d3.select(".xText");
    var yText = d3.select(".yText");

    xText.append("text")
      .attr("y", - 26)
      .attr("data-name", "poverty")
      .attr("data-axis", "x")
      .attr("class", "aText active y")
      .text("In Poverty (%)");
      
    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`<strong>Poverty#: ${d.poverty}<strong><br>healthcare#: ${d.healthcare}`);
    });

    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function(d) {
        toolTip.hide(d);
    });
});