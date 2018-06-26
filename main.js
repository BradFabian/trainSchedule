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

  /*var name = "";
  var destination = "";
  var firstTrain = "";
  var trainFrequency = 0;*/

  // Capture Button Click
  $("#btn").on("click", function(event) {
    event.preventDefault();

    // Inital Values

  var name = "";
  var destination = "";
  var firstTrain = "";
  var trainFrequency = 0;

    // Grabbed values from text-boxes
    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#minuteInput").val().trim();
    trainFrequency = $("#arrivalTimeInput").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      trainFrequency: trainFrequency
    });

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#minuteInput").val("");
    $("#arrivalTimeInput").val("");
  

    return false;

  });
  

    
    


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

   // update the variable with data from the database
   name = childSnapshot.val().name;
   destination = childSnapshot.val().destination;
   firstTrain = childSnapshot.val().firstTrain;
   trainFrequency = childSnapshot.val().trainFrequency;
 // moment formula 
 var firstTrainMoment = moment(firstTrain, 'HH:mm');
    var nowMoment = moment(); 

    var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
    var minutesSinceLastArrival = minutesSinceFirstArrival % trainFrequency;
    var minutesAway = trainFrequency - minutesSinceLastArrival;

    var nextArrival = nowMoment.add(minutesAway, 'minutes');
    var formatNextArrival = nextArrival.format("HH:mm");
//add table
var tr = $('<tr>');
    var a = $('<td>');
    var b = $('<td>');
    var c = $('<td>');
    var d = $('<td>');
    var e = $('<td>');
    a.append(name);
    b.append(destination);
    c.append(trainFrequency);
    d.append(formatNextArrival);
    e.append(minutesAway);
    tr.append(a).append(b).append(c).append(d).append(e);
    $('#newTrains').append(tr);
  
  
}),
function (errorObject) {
  console.log("The read failed:" + errorObject.code);
}
    

 

   
  
    
});