var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
  };
  firebase.initializeApp(config);

  
  let loginBtn = document.getElementById('log-in');
  loginBtn.addEventListener('click' , () => {
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((success) =>{
    // alert("Welcome");
    localStorage.setItem("userAuth",JSON.stringify(success))
    location.assign("../pages/student-panel.html")
  })
  
  .catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorMessage)
    location.reload();
    // ...
  })

})