var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
  };
  firebase.initializeApp(config);

  firebase.database().ref('quizes/')
    .once('value', (snapshot) =>{
        var quizes = snapshot.val();
        var quizKeys = Object.keys(quizes);
        console.log(quizKeys);
    })