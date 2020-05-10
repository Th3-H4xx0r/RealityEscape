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

        checkRef.once("value", (snap) => {
            console.log(snap.val());
            console.log("WORKS 1");

            if (snap.val() != null) {
                usernnameTaken = true;
                console.log("Username taken");
            }

        }).then(function () {
            errorText.innerHTML = "";

            if(username.includes("-")){
                errorText.innerHTML = "There can't be dashes in your name";
            } else {
                if (usernnameTaken == true) {
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
    
                    storeUsername(username);
    
                    redirect("cutscene.html");
    
    
    
                }
            }


            
        });

        setTimeout(function () {
            startButton.innerHTML = "Play";
        }, delayInMilliseconds);


    }
}

function getLeaderBoardData() {

    original = document.getElementById("leaderboardTableBody");

    var dataList = [];



    var ref = firebase.database().ref().child("Leaderboard");

    ref.once("value", (snap) => {
        console.log(snap.val());
        rawData = snap.val();


        snap.forEach((child) => {
            dataList.push([child.child("Username").val(), child.child("Points").val(), child.child("Level").val()]);
        });

    }).then(function(){

        
        console.log(dataList.sort(function(a,b){return b[1] - a[1];}));

        for(let i = 0; i <= dataList.length; i++){
            elem = document.createElement("tr");
            elem.innerHTML = '<th scope="col" class="leaderboardData">1</th><th scope="col" class="leaderboardData">Shabd Veyyakul1a</th><th scope="col" class="leaderboardData">20321</th><th scope="col" class="leaderboardData">Level 1</th>';
            elem.classList.add("leaderboardData")
            elem.innerHTML = '<th scope="col" class="leaderboardData">'+(i+1).toString()+'</th><th scope="col" class="leaderboardData">' + dataList[i][0] + '</th><th scope="col" class="leaderboardData">' + dataList[i][1] + '</th><th scope="col" class="leaderboardData">Level ' +dataList[i][2] + '</th>';
            original.appendChild(elem);
        };
    });

}

function redirect(page){
    window.location.href = page;
}

function storeUsername(username){
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("Username", username);
        console.log("STORED");
      } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
      }
}

function getUsername(){
    if (typeof(Storage) !== "undefined") {
        var name = localStorage.getItem("Username");
        console.log(name);
        return name;
      } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
      }
}

function updateLeaderboardData(){
    var username = getUsername();
    var level = document.getElementById("levelFourm").value;
    var score = document.getElementById("scoreFourm").value;
    var errorText = document.getElementById("errorTextScore");

    console.log(username);

    if(level == "" || score == ""){
        errorText.innerHTML = "Can't leave any of the fields blank";
    } else {
        var ref = firebase.database().ref().child("Leaderboard");
        errorText.innerHTML = "";

    ref.child(username).child("Level").set(level);
    ref.child(username).child("Points").set(score);
    ref.child(username).child("Username").set(username).then(function(){
        redirect("leaderboard.html");
    });
    

    //
    }

    
    

}




