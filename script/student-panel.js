var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
  };
  firebase.initializeApp(config);

window.addEventListener('load', async () => {
    getQuizes()
})

function getQuizes() {
    let quizArea = document.querySelector("#row");
    firebase.database().ref('quizes/')
      .once('value', (snapshot) =>{
          let quizObj = snapshot.val(); 
          let quizKeys = Object.keys(quizObj);
          quizKeys.map(key =>{
              quizArea.innerHTML +=
              `
              <div id="main" class="col-md-4 col-sm-12">
              <div class="card" style="width: 18rem;">
                  <div class="card-body">
                      <h5 class="card-title">${quizObj[key].details.quizTitle}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${quizObj[key].details.quizName}</h6>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                          card's content.</p>
                      <a onClick="startQuiz('${key}')" href="javascript:void(0)" class="card-link">Start Quiz</a>
                  </div>
              </div>
            </div>
            `
          })
      })
}

function startQuiz(e) {
    localStorage.setItem("clikedQuizKey", JSON.stringify(e));
    location.assign("../pages/quiz.html");
}


function logout() {
    firebase.auth().signOut()
    .then(() => {
        localStorage.setItem("userAuth", JSON.stringify({
            user: "null"
        }));
        location.assign("../pages/student-login.html");
        //signout Succesful
    }).catch((error) => {
        alert(error)
    })
 }
