var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
};
firebase.initializeApp(config);

let correctQuestions = 0;
let questionNo = 0;

function productKeyAuthencation() {
    let validiationArea = document.getElementById("keyBox");
    validiationArea.style.display = "none";
    let loader = document.getElementById("loader");
    loader.style.visibility = "visible";
    let get = localStorage.getItem("clikedQuizKey");
    let currentQuizNode = JSON.parse(get);
    console.log(currentQuizNode);

    firebase.database().ref(`quizes/${currentQuizNode}/details`)
        .once('value', function (snapshot) {
            let deatilsObj = snapshot.val()
            let key = deatilsObj.productKey;
            console.log(key)
            let enteredProductKey = document.getElementById("productKey").value;
            if (enteredProductKey === key) {
                startQuiz();
            } else {
                alert("Wrong Product Key")
                loader.style.visibility = "hidden";
                validiationArea.style.display = "";
            }
        });

}

function startQuiz() {
    let get = localStorage.getItem("clikedQuizKey");
    let currentQuizNode = JSON.parse(get);
    let validiationArea = document.getElementById("productKeyBoxId");
    validiationArea.style.display = "none";
    let quizArea = document.getElementById("questionArea");

    firebase.database().ref(`quizes/${currentQuizNode}/questions`)
        .once('value', function (snapshot) {
            let questionsObj = snapshot.val();
            localStorage.setItem("questionsObj", JSON.stringify(questionsObj))
            let question = Object.keys(questionsObj);
            let questionsLength = question.length;

            quizArea.innerHTML =
                `
            <br />
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <pre>${questionsObj[question[questionNo]].question}</pre>
                </div>
                <!--.panel-heading-->

                <div class="panel-body">
                    <h4>Your Answer</h4>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div id="radios" class="funkyradio">
                            <div class="funkyradio-default">
                                <input value="1" type="radio" name="radio" id="radio1" />
                                <label for="radio1">${questionsObj[question[questionNo]].firstOption}</label>
                            </div>
                            <div class="funkyradio-primary">
                                <input value="2" type="radio" name="radio" id="radio2" checked />
                                <label for="radio2">${questionsObj[question[questionNo]].secondOption}</label>
                            </div>
                            <div class="funkyradio-success">
                                <input value="3" type="radio" name="radio" id="radio3" />
                                <label for="radio3">${questionsObj[question[questionNo]].thirdOption}</label>
                            </div>
                            <div class="funkyradio-danger">
                                <input value="4" type="radio" name="radio" id="radio4" />
                                <label for="radio4">${questionsObj[question[questionNo]].fourthOption}</label>
                            </div>
                            <button style="visibility: hidden;" onClick="printQuiz()" style="margin-top: 10px" type="button" class="btn btn-primary">Submit Quiz</button>
                            <button onClick="checkAnswer()" style="margin-top: 10px" type="button" class="btn btn-primary">Next Question</button>
                        </div>

                    </div>

                </div>
            </div>
            `
            
            
        })
}


//Check for correct/incorrect answers
function checkAnswer() {
    let get = localStorage.getItem("questionsObj");
    let questionsObj = JSON.parse(get);
    let question = Object.keys(questionsObj);

    let list = document.getElementById("radios"); //Client ID of the radiolist
    let inputs = list.getElementsByTagName("input");
    let selected;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            selected = inputs[i];
            break;
        }
    }
    if (selected.value === questionsObj[question[questionNo]].answer) {
        correctQuestions++;
    }

    nextQuestion()

}

function nextQuestion() {
    questionNo++;
    let get = localStorage.getItem("questionsObj");
    let questionsObj = JSON.parse(get);
    // let questionsObj = JSON.parse(e);
    let question = Object.keys(questionsObj);
    console.log(question);
    totalNumberOfQuestions = question.length;
    let quizArea = document.getElementById("questionArea");

    if (questionNo === totalNumberOfQuestions) {
        let nextBtn = document.getElementById('nextQuestion')
        nextBtn.style.visibility = "hidden";
        let submit = document.getElementById('submitQuiz')
        submit.style.visibility = "";
        console.log("quiz finished")
        getResult();
        return false;
    }

    quizArea.innerHTML =
        `   
    <br />
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <pre>${questionsObj[question[questionNo]].question}</pre>
                </div>
                <!--.panel-heading-->

                <div class="panel-body">
                    <h4>Your Answer</h4>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div id="radios" class="funkyradio">
                            <div class="funkyradio-default">
                                <input value="1" type="radio" name="radio" id="radio1" />
                                <label for="radio1">${questionsObj[question[questionNo]].firstOption}</label>
                            </div>
                            <div class="funkyradio-primary">
                                <input value="2" type="radio" name="radio" id="radio2" checked />
                                <label for="radio2">${questionsObj[question[questionNo]].secondOption}</label>
                            </div>
                            <div class="funkyradio-success">
                                <input value="3" type="radio" name="radio" id="radio3" />
                                <label for="radio3">${questionsObj[question[questionNo]].thirdOption}</label>
                            </div>
                            <div class="funkyradio-danger">
                                <input value="4" type="radio" name="radio" id="radio4" />
                                <label for="radio4">${questionsObj[question[questionNo]].fourthOption}</label>
                            </div>
                            <button id="submitQuiz" style="visibility: hidden;" onClick="getResult()" style="margin-top: 10px" type="button" class="btn btn-success">Submit Quiz</button>
                            <button id="nextQuestion" onClick="checkAnswer()" style="margin-top: 10px" type="button" class="btn btn-primary">Next Question</button>
                        </div>

                    </div>
                </div>
            </div>
    `
}

function getResult() {
    let percentage = (correctQuestions/totalNumberOfQuestions) *100;
    percentage = percentage.toFixed(2)
    let marksObj = {
        correct: correctQuestions,
        total : totalNumberOfQuestions,
        percentage : percentage
    }
    let get = localStorage.getItem("clikedQuizKey");
    let currentQuizNode = JSON.parse(get);
    let userUid = firebase.auth().currentUser.uid;
    firebase.database().ref(`results/${currentQuizNode}/${userUid}`)
        .set(marksObj)

    // localStorage.setItem("correctQuestions", JSON.stringify(correctQuestions))
    // localStorage.setItem("totalNumberOfQuestions", JSON.stringify(totalNumberOfQuestions))
    // localStorage.setItem("questionsObj", JSON.stringify(questionsObj))
    console.log(percentage);
    location.assign('../pages/result.html')

}