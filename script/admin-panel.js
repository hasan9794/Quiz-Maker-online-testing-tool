var config = {
    apiKey: "AIzaSyDGxiWeXlyFgPKcT9CMqEnHAK3o1eMf8cY",
    authDomain: "sillynamemaker-754c6.firebaseapp.com",
    databaseURL: "https://sillynamemaker-754c6.firebaseio.com",
    projectId: "sillynamemaker-754c6",
    storageBucket: "sillynamemaker-754c6.appspot.com",
    messagingSenderId: "646651677926"
  };
  firebase.initializeApp(config);
  
 let id = 2;
function createQuiz() {
    let previousData = document.getElementById('user');
    previousData.innerHTML = '';
    previousData.innerHTML = 
    `
    <div class="row">
                        <div id="createQuiz" class="col-md-10 col-sm-10 col-xs-12 gutter">
                            <h1>Create Quiz</h1>
                            <div class="form-group">
                                <label for="quiTitle">Quiz Title</label>
                                <input type="text" class="form-control" id="title">
                            </div>
                            <div class="form-group">
                                <label for="name">Quiz Name</label>
                                <input type="text" class="form-control" id="name">
                            </div>
                            <div class="form-group">
                                <label for="productKey">Product Key</label>
                                <input type="text" class="form-control" id="productKey">
                            </div>
                            <div class="form-group">
                                <label for="quizDuration">Quiz Duration</label>
                                <select class="form-control" id="duration">
                                    <option value="10">10 Minutes</option>
                                    <option value="20">20 Minutes</option>
                                    <option value="30">30 Minutes</option>
                                    <option value="45">45 Minutes</option>
                                </select>
                            </div>
                            <button onClick="questions()" type="submit" class="btn btn-default">Create & Add
                                Questions</button>
                        </div>
    </div>
    `
}  

function questions() {
    let previousData = document.getElementById('createQuiz');
    // previousData.innerHTML = '';
    let quizTitle = document.getElementById('title').value;
    let quizName = document.getElementById('name').value;
    let productKey = document.getElementById('productKey').value;
    let duration = document.getElementById('duration').value;
    
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
        .then(() =>{
            previousData.innerHTML = 
            `   
                    <div class="row">
                        <div id="col" class="col-md-10 col-sm-10 col-xs-12 gutter">
                            <div class="form">
                                <h3>Question #1</h3>
                                <div class="form-group">
                                    <label for="question">Question</label>
                                    <input type="text" class="form-control" id="question_1">
                                </div>
                                <div class="form-group">
                                    <label for="q1">Enter 1st Option</label>
                                    <input type="text" class="form-control" id="firstOption_1" placeholder="Option A">
                                </div>
                                <div class="form-group">
                                    <label for="Answer1">Enter 2nd Option</label>
                                    <input type="text" class="form-control" id="secondOption_1" placeholder="Option B">
                                </div>
                                <div class="form-group">
                                    <label for="Answer1">Enter 3rd Option</label>
                                    <input type="text" class="form-control" id="thirdOption_1" placeholder="Option C">
                                </div>
                                <div class="form-group">
                                    <label for="Answer1">Enter 4th Option</label>
                                    <input type="text" class="form-control" id="fourthOption_1" placeholder="Option D">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                            <div class="col-md-10 col-sm-10 col-xs-12 gutter">
                                <div class="addQuestion">
                                    <button onClick="addQuestion()" id="newQuestion" class="btn btn-primary">Add Question</button>
                                    <button class="btn btn-success">Submit</button>
                                </div>
                            </div>    
                    </div>
            `

        })
        .catch((err)=>{
            alert(err.message);
        })
}

function addQuestion() {
    let previousData = document.getElementById('col');
    previousData.innerHTML += 
        `               <div class="form">
                            <h3>Question #2</h3>
                            <div class="form-group">
                                <label for="question">Question</label>
                                <input type="text" class="form-control" id="question_${id}">
                            </div>
                            <div class="form-group">
                                <label for="q1">Enter 1st Option</label>
                                <input type="text" class="form-control" id="firstOption_${id}" placeholder="Option A">
                            </div>
                            <div class="form-group">
                                <label for="Answer1">Enter 2nd Option</label>
                                <input type="text" class="form-control" id="secondOption_${id}" placeholder="Option B">
                            </div>
                            <div class="form-group">
                                <label for="Answer1">Enter 3rd Option</label>
                                <input type="text" class="form-control" id="thirdOption_${id}" placeholder="Option C">
                            </div>
                            <div class="form-group">
                                <label for="Answer1">Enter 4th Option</label>
                                <input type="text" class="form-control" id="fourthOption_${id}" placeholder="Option D">
                            </div>
                        </div>
                    
            `
            id++;
}

function submitData() {
    
}