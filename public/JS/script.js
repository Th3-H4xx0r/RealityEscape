(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyBfk_azgMiG46pSCIue7Z9EN7lspt8YTiQ",
        authDomain: "realityescape---multiplayer.firebaseapp.com",
        databaseURL: "https://realityescape---multiplayer.firebaseio.com",
        projectId: "realityescape---multiplayer",
        storageBucket: "realityescape---multiplayer.appspot.com",
        messagingSenderId: "339229573398",
        appId: "1:339229573398:web:19e073c24ed00589065037",
        measurementId: "G-7N68B8HPHR"
    };

    // Initialize Firebase with a default Firebase project
    firebase.initializeApp(firebaseConfig);

    // Initialize Firebase with a second Firebase project
    // Use the shorthand notation to access the default project's Firebase services
    // var ref = firebase.database().ref().child("Test").set("Helloo12");


}());

function registerUser() {

    var username = document.getElementById("usernameFourm").value;
    var errorText = document.getElementById("errorText");
    var startButton = document.getElementById("startButton");

    var delayInMilliseconds = 1000; //1 second

    var usernnameTaken = false;

    if (username == "") {
        errorText.innerHTML = "Can't leave username blank";
    } else {
        startButton.innerHTML = "Loading...";

        var checkRef = firebase.database().ref().child("UserData").child(username);

        checkRef.once("value", (snap)=>{
            console.log(snap.val());
            console.log("WORKS 1");

            if(snap.val() != null){
                usernnameTaken = true;
                console.log("Username taken");
            }
        
          }).then(function(){
            errorText.innerHTML = "";
        

        if(usernnameTaken == true){
            errorText.innerHTML = "Name already taken";
            setTimeout(function () {
                startButton.innerHTML = "Play";
            }, delayInMilliseconds);
        } else {
            var ref = firebase.database().ref().child("UserData").child(username);
        ref.child("Username").set(username);
        ref.child("Level").set(0);
        ref.child("Points").set(0);

        var leaderBoard_ref = firebase.database().ref().child("Leaderboard").child(username);
        leaderBoard_ref.child("Username").set(username);
        leaderBoard_ref.child("Level").set(0);
        leaderBoard_ref.child("Points").set(0);

        setTimeout(function () {
            startButton.innerHTML = "Play";
        }, delayInMilliseconds);


        
        }
          });
        
        setTimeout(function () {
            startButton.innerHTML = "Play";
        }, delayInMilliseconds);

  
    }

    


}

function getLeaderBoardData(){
    /*
    original = document.getElementById("test");
    elem = addThing = document.createElement("div");

    elem.innerHTML = "HEllo";

    document.body.appendChild(elem);
    */

   var ref = firebase.database().ref().child("Leaderboard");

   ref.once("value", (snap)=>{
    console.log(snap.val());

    snap.forEach((child) => {
        console.log(child);
    });

  });



    

}



