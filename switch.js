// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKZcilGU9V7fI_BCTPwEp-hHqM6N1xviU",
    authDomain: "familysample-3e57f.firebaseapp.com",
    databaseURL: "https://familysample-3e57f-default-rtdb.firebaseio.com",
    projectId: "familysample-3e57f",
    storageBucket: "familysample-3e57f.appspot.com",
    messagingSenderId: "1039147474984",
    appId: "1:1039147474984:web:396eb25d58c9ae9d6cd51d",
    measurementId: "G-S1ZSDG3SW6"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  //var retrieveStore;

  function updateUserData(where, val) {
    //var updates = {};

    if (where == "share") {
      var postData = {
        share: val
      };
    }
    else if (where == "drag"){
      var postData = {
        drag: val
      };
    }
    else if (where == "like"){
      var postData = {
        like: val
      };
    }

    return firebase.database().ref().update(postData);
  }

  function retrieveData(item) {
    //const dbRef = database.ref();
    database.ref("/" + item).once("value").then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val(), typeof(snapshot.val()));
        var retrieveStore = snapshot.val();
        //console.log(retrieveStore);
        if (item == "share") {
          updateUserData(retrieveStore + 1, item);
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }


  var liked = 0;
  var rectW, rectH;
  var barY, iconSize, startX, startY, likeButX, likeButY, sendButX, navIconY, bookmarkX;


  function preload() {
    
    like = loadImage('assets/like.png');
    likePressed = loadImage('assets/like_pink.png');
  }

  function setup() {
    
    iconSize = Math.floor(windowWidth * 0.05);
    startX = windowWidth/2 - rectW/2;
    startY = windowHeight/2 - rectH/2;
    
    if (rectH > windowHeight){
      createCanvas(windowWidth, rectH);
    }
    else {
      createCanvas(windowWidth, windowHeight);
    }

    // like bar icons
    image(like, windowWidth/2, windowHeight/2, iconSize, iconSize);    
   
    fill(0);
  }
  
  function draw(){
    
    // like bar icons
    if (liked == true) {
      image(likePressed, windowWidth/2, windowHeight/2, iconSize, iconSize);
    }
    else {
      image(like, windowWidth/2, windowHeight/2, iconSize, iconSize);
    }
    

  }


  function getRandomInt(min, max) {
      return Math.floor(Math.random() * max) + min;
  }

  function mouseClicked(){
    if (dist(mouseX, mouseY, windowWidth/2 + iconSize/2, windowHeight/2 + iconSize/2) < iconSize * 0.6){ // like        
      liked = liked + 1;
      updateUserData("like", liked);      
    }
    
  }


