var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
};
firebase.initializeApp(config);


let get = localStorage.getItem("clikedQuizKey");
let currentQuizNode = JSON.parse(get);

let getuid = localStorage.getItem("userAuth");
let userAuth = JSON.parse(getuid);
console.log(userAuth.user);
let userUid = userAuth.user.uid;
console.log(userUid)
firebase.database().ref(`results/${currentQuizNode}/${userUid}`)
.once('value', (snapshot) => {
    let resultsArea = document.getElementById('result');
    let status = document.getElementById('status');
    let marksObj = snapshot.val()
    let percentage = parseInt(marksObj.percentage)
    if(marksObj.percentage < 50.00){
        status.innerHTML = `<h2>Staus: Fail</h2>`
    }  else{
        status.innerHTML = `<h2>Staus: Pass</h2>`
    }
        
        resultsArea.innerHTML = `
        <h3>Percentage: ${marksObj.percentage} </h3>
        <h3>Total Questions: ${marksObj.total}</h3>
        <h3>Total Correct Questions: ${marksObj.correct}</h3>
        `
})