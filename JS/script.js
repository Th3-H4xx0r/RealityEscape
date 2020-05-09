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
    var ref = firebase.database().ref().child("Test").set("Helloo12");

   
}());
