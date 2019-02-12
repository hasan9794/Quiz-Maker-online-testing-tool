var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
  };
  firebase.initializeApp(config);
  

function addQuestions() {
    let quizTitle = document.getElementById('title').value;
    let quizName = document.getElementById('name').value;
    let productKey = document.getElementById('productKey').value;
    let duration = document.getElementById('duration').value;
    let previousData = document.getElementById('col');
    
    let quizDetails = {
        details: {
            quizTitle,
            quizName,
            productKey,
            duration
        }
    }

    firebase.database().ref('quizes/')
        .push(quizDetails)
        .catch((err)=>{
            alert(err.message);
        })
    // previousData.innerHTML = '';
}