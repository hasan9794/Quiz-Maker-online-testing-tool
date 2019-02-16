var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
  };
  firebase.initializeApp(config);

  let signUpBtn = document.getElementById('signup');
  signUpBtn.addEventListener('click', () => {
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let studentId = document.getElementById('studentid').value;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( (success)=>{
        let userObj = {
          name,
          email,
          studentId
        }
        let uid = firebase.auth().currentUser.uid;
        console.log(uid)
        firebase.database().ref('users/' + uid).set(userObj);
        alert("Signup Successful");
        location.assign('../pages/student-login.html')
      })      
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      
      console.log(name, email, password, studentId)
    })