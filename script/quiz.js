var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
};
firebase.initializeApp(config);

function productKeyAuthencation() {
    let get = localStorage.getItem("quizKey");
    let currentQuizNode = JSON.parse(get);
    console.log(currentQuizNode);

    firebase.database().ref(`quizes/${currentQuizNode}/details`)
    .once('value', function (snapshot) {
        let deatilsObj = snapshot.val()
        let key = deatilsObj.productKey;
        console.log(key)
        let enteredProductKey = document.getElementById("productKey").value;
        if(enteredProductKey === key){
            startQuiz();
        }
    });

}

function startQuiz() {
    let get = localStorage.getItem("quizKey");
    let currentQuizNode = JSON.parse(get);
    let validiationArea = document.getElementById("productKeyBoxId");
    validiationArea.style.display = "none";
    let quizArea = document.getElementById("questionArea");
    firebase.database().ref(`quizes/${currentQuizNode}/questions`)
    .once('value', function (snapshot) {
        let questionsObj = snapshot.val();
        let questions = Object.keys(questionsObj);
        questions.map(key => {
            quizArea.innerHTML +=             
            `
            <br />
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <pre>${questionsObj[key].question}</pre>
                </div>
                <!--.panel-heading-->

                <div class="panel-body">
                    <h4>Your Answer</h4>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="funkyradio">
                            <div class="funkyradio-default">
                                <input value="1" type="radio" name="radio" id="radio1" />
                                <label for="radio1">${questionsObj[key].firstOption}</label>
                            </div>
                            <div class="funkyradio-primary">
                                <input type="radio" name="radio" id="radio2" checked />
                                <label for="radio2">${questionsObj[key].secondOption}</label>
                            </div>
                            <div class="funkyradio-success">
                                <input type="radio" name="radio" id="radio3" />
                                <label for="radio3">${questionsObj[key].thirdOption}</label>
                            </div>
                            <div class="funkyradio-danger">
                                <input type="radio" name="radio" id="radio4" />
                                <label for="radio4">${questionsObj[key].fourthOption}</label>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


            `
            console.log(questionsObj[key].question);
        })
    })
}