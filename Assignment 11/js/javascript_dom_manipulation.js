// from data.js
let tableData = data;

// Get a reference to the table body
let tbody = d3.select("tbody");

// Get a reference to the submit button
let submit = d3.select("#submit")

// Console.log the alien sighting from data.js
console.log(tableData);

// // Loop Through `data` and console.log each alien sighting object
tableData.forEach(function(alienSighting) {

  console.log(alienSighting);

});


// using filter to find the dates from the search bar
submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  let inputElement = d3.select("#myInput");

  // Get the value property of the input element
  let inputValue = inputElement.property("value");


  console.log(inputValue);
  console.log(tableData);

  // Filter the data
  let filteredData = tableData.filter(date => date.datetime == inputValue);

  console.log(filteredData);

  
  // // Use d3 to update each cell's text with
  // // alien sighing values (datetime, city, state, 
  // // country, shape, durationMinutes, comments)
  filteredData.forEach(function(alienSighting) {

    console.log(alienSighting);
    let row = tbody.append("tr");
    Object.entries(alienSighting).forEach(function([key, value]) {

      console.log(key, value);

      // Append a cell to the row for each value
      // in the alien sighting object
      let cell = row.append("td");
      cell.text(value);

    });
  });
});
