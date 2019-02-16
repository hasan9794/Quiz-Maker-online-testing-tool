var config = {
  apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
  authDomain: "sillynamemaker-754c6.firebaseapp.com",
  databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
  projectId: "sillynamemaker-754c6",
  storageBucket: "sillynamemaker-754c6.appspot.com",
  messagingSenderId: "646651677926"
};
firebase.initializeApp(config);

let adminLogin = document.getElementById("log-in");
adminLogin.addEventListener('click', () => {
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;

if(email !== "admin@gmail.com"){
  alert("You are not admin")
  return false;
}

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
      localStorage.setItem("userAuth", JSON.stringify(success));
      alert("SignIn Successful")
      location.assign('../pages/admin-panel.html');
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

})