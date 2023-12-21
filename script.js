// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(document).ready(function () {
    // Display current date in the header
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    // Add click event listener for the save button
    $(".saveBtn").on("click", function () {
      // Get the id of the parent time-block
      var blockId = $(this).parent().attr("id");
  
      // Get the user input from the textarea
      var userInput = $(this).siblings(".description").val();
  
      // Save the user input to local storage using the time-block id as a key
      localStorage.setItem(blockId, userInput);
    });
  

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    // Apply past, present, or future class to each time block
    function updateBlocks() {
      // Get the current hour using Day.js
      var currentHour = dayjs().hour();
  
      // Loop through each time block
      $(".time-block").each(function () {
        // Extract the hour from the time-block id
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        // Remove any existing classes
        $(this).removeClass("past present future");
  
        // Add past, present, or future class based on the comparison with current hour
        if (blockHour < currentHour) {
          $(this).addClass("past");
        } else if (blockHour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Call the function to update block classes
    updateBlocks();


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.

  
    // Retrieve user input from local storage and set textarea values
    function retrieveUserInput() {
      // Loop through each time block
      $(".time-block").each(function () {
        // Get the id of the time block
        var blockId = $(this).attr("id");
  
        // Get the user input from local storage using the time-block id as a key
        var storedInput = localStorage.getItem(blockId);
  
        // Set the textarea value with the stored input
        $(this).find(".description").val(storedInput);
      });
    }
  
    // Call the function to retrieve user input from local storage
    retrieveUserInput();
  });
  