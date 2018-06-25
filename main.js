$(document).ready(function() {

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD47WJEKseSrs0E0dY_hYW9hkFOk4hl2ts",
    authDomain: "trainscheduler-b287d.firebaseapp.com",
    databaseURL: "https://trainscheduler-b287d.firebaseio.com",
    projectId: "trainscheduler-b287d",
    storageBucket: "trainscheduler-b287d.appspot.com",
    messagingSenderId: "391977992338"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Inital Values

  var name = "";
  var destination = "";
  var firstTrain = "";
  var trainFrequency = "";

  // Capture Button Click
  $("#btn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#minuteInput").val().trim();
    trainFrequency = $("#arrivalTimeInput").val().trim();

    // Code for "Setting values in the database"
    database.ref().set({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      trainFrequency: trainFrequency
    });

  });

  database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().trainFrequency);

    // Change the HTML to reflect
    $("#name-display").text(childSnapshot.val().name);
    $("#destination-display").text(childSnapshot.val().destination);
    $("#train-display").text(childSnapshot.val().firstTrain);
    $("#freq-display").text(childSnapshot.val().trainFrequency);

    
    var submitButton = $('button')

    $(function() {
    submitButton.on('click', function() {
    
// Create and save a reference to new empty table row
var tbody = $("tbody")
var tr = $("<tr>");

// Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
var trainNamedisplay = '<td id= "name-display">' + name + '</td>';
var destinationdisplay = '<td id= "destination-display">'+ destination + '</td>' ;
var firstTraindisplay = '<td id= "train-display">' + firstTrain + '</td>' ;
var frequencydisplay = '<td id= "freq-display" >' + trainFrequency + '</td>' ;



// Append the td elements to the new table row
tr.append(trainNamedisplay);
tr.append(destinationdisplay);
tr.append(firstTraindisplay);
tr.append(frequencydisplay);

// Append the table row to the tbody element
tbody.append(tr)

});
    })
  }); 

   
  
    
});