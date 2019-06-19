  function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url =  `/metadata/${sample}`;

  d3.json(url).then(function(sample){
    console.log(sample)
    

    // Use `d3.json` to fetch the metadata for a sample
      // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata")
    
    panel.html("");
      // Use `.html("") to clear any existing metadata
    Object.entries(sample).forEach(function([key, value]) {
    
      panel
        .append("p")
        .text(`${key}: ${value}`)


    })
  })
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
    // BONUS: Build the Gauge Chart
    buildGauge(sample.WFREQ);
  }
  
  function buildCharts(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then(function(data) {
      // @TODO: Build a Bubble Chart using the sample data
     
     // Pie Chart
      var trace1 = {
        labels: data.otu_ids.slice(0, 10),
        values: data.sample_values.slice(0,10),
        hover_values: data.otu_labels.slice(0,10),
        type: 'pie'
      };
  
      var pie_data = [trace1];
  
      var layout1 = {
        title: "'Pie' Chart",
      };
  
      Plotly.plot("pie", pie_data, layout1);

  
      // scatter plot
      var trace2 = {
        labels: data.otu_labels,
        x: data.otu_ids,
        y: data.sample_values,
        mode: 'markers',
        marker: {
          size: data.sample_values,
          color: data.otu_ids},
        type: 'scatter'
      }
  
      var bubble_data = [trace2];
  
      var layout2 = {
        title: "Sample Data"
      }
  
      Plotly.plot("bubble", bubble_data, layout2);
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,


      
     
    
    })
  }

  function buildGauge(sample) {
     // Guage Chart ***
    var level = sample;

    // Trig to calc meter point
    var degrees = 180 - (level * 20),
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var gauge_data = [{ type: 'scatter',
      x:[0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'Belly Button Washing Frequency',
        text: sample,
        hoverinfo: 'text+name'},
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4',
                '2-3', '1-2', '0-1'],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                            'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                            'rgba(227, 43, 43, .25)', 'rgba(227, 43, 43, .5)',
                            'rgba(227, 43, 43, 1)']},
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week',
      height: 500,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.plot('gauge', gauge_data, layout);
  }


  
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  