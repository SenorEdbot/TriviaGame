//Waiting for the document to load
$(document).ready(function(){

    //Setting up the Questions Array
    var questions = [
        "What is Eminem's full name?",
        "What State was he born in?",
        "How many times did he repeat 9th grade?",
        "What is the name of the first rap group he joined?",
        "What is the name of his Ex-Wife?",
        "What is the name of his Daughter?",
        "Which song broke a Guinness Book of World Record?",
        "Who did he call when he needed to get Clean?",
        "How many consecutive #1 albums has he released?",
        "Who of the follow has he not yet ended their career?"
    ];
    //Setting up the Answer Arrays (4)
    var answerArr1 = [
        "Marshall Mathers",
        "Missouri",
        "0",
        "Soul Intent",
        "Kimberly Smith",
        "Hailie",
        "Bad Guy",
        "Kim",
        "6",
        "Drake"
    ];
    var answerArr2 = [
        "Marshall Bruce Mathers III",
        "Michigan",
        "2",
        "D12",
        "Dawn Scott",
        "Hannah",
        "Stan",
        "Elton John",
        "9",
        "Ja Rule"
    ];
    var answerArr3 = [
        "Marshall Mathers Jr.",
        "Ohio",
        "1",
        "Fresh Inc",
        "Kimberly Scott",
        "Kaylie",
        "Rap God",
        "Hailie",
        "4",
        "Benzino"
    ];
    var answerArr4 = [
        "Marshall Mathers II",
        "Illinois",
        "3",
        "New Jacks",
        "Dawn Smith",
        "Hillary",
        "Lose Yourself",
        "Dr. Dre",
        "8",
        "MGK"
    ];
    var correctAnswerArr = [
        "Marshall Bruce Mathers III",
        "Missouri",
        "3",
        "New Jacks",
        "Kimberly Scott",
        "Hailie",
        "Rap God",
        "Elton John",
        "9",
        "Drake"
    ];
    //Setting the 5 required variables
    var correct = 0; 
    var incorrect = 0;
    var unanswered = 0;
    var questionCounter = 0;
    var infoText;

    //Setting the jQuery ID's to variables
    var timerDiv = $('#timerDiv');
    var questionDiv = $('#questionDiv');
    var correctAnsDiv = $('#correctAnsDiv');
    var answerImage = $('#answerImage');
    var ans1Button = $('#answer1');
    var ans2Button = $('#answer2');
    var ans3Button = $('#answer3');
    var ans4Button = $('#answer4');
    var startButton = $('#startButton');
    var resetButton = $('#resetButton');

    //setting up the timer object
    var cdClockID;
    var clockRunning = false;
    var countdownClock = {
        time: 30,
        reset: function() {
            countdownClock.time = 30;
            timerDiv.text("30");
        },
        start: function() {
            if(!clockRunning) {
                timerDiv.text("30");
                cdClockID = setInterval(countdownClock.count, 1000);
                clockRunning = true;
            }
        },
        stop: function() {
            clearInterval(cdClockID);
            clockRunning = false;
        },
        count: function() {
            countdownClock.time--;
            var converted = countdownClock.timeConverter(countdownClock.time);
            timerDiv.text(converted);
            if(countdownClock.time === 0) {
                unanswered += 1;
                infoText = "Out of Time!";
                countdownClock.stop();
                countdownClock.reset();
                correctAnswer = false;
                gameLogic.dispCorrectAns();
                setTimeout(gameLogic.questionIncrement,2000);
            }
        },
        timeConverter: function(t) {
            var seconds = t
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return seconds;
        }
    };

    //setting up the Game Logic Functions
    var gameLogic = {
        dispCorrectAns: function() {
            $('.answers').hide();
            correctAnsDiv.show();
            answerImage.show();
            questionDiv.text(infoText);
            switch(questionCounter){
                case 0:
                    answerImage.attr('src','assets/images/image1.jpg').attr('alt','A picture of Eminem');
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[0])
                    break;
                case 1:
                    answerImage.attr('src','assets/images/image2.jpg').attr('alt','A picture of Missouri');
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[1]);
                    break;
                case 2:
                    answerImage.attr('src','assets/images/image3.jpg').attr('alt','A picture of a report card receiving an F');
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[2]);
                    break;
                case 3:
                    answerImage.attr('src','assets/images/image4.jpg').attr('alt','A picture of New Jacks rap group logo');
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[3]);
                    break;
                case 4:
                    answerImage.attr('src','assets/images/image5.jpg').attr('alt',"A picture of Kim, Eminem's ex-wife");
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[4]);
                    break;
                case 5:
                    answerImage.attr('src','assets/images/image6.jpg').attr('alt',"A picture of Hailie, Eminem's daughter");
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[5]);
                    break;
                case 6:
                    answerImage.attr('src','assets/images/image7.jpg').attr('alt',"A picture of Eminem in his music video for Rap God");
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[6]);
                    break;
                case 7:
                    answerImage.attr('src','assets/images/image8.jpg').attr('alt',"A picture of Elton John and Eminem on stage aftering preforming Stan");
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[7]);
                    break;
                case 8:
                    answerImage.attr('src','assets/images/image9.jpg').attr('alt',"A picture of a Guardian article showing Eminem's latest record");
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[8]);
                    break;
                case 9:
                    answerImage.attr('src','assets/images/image10.jpg').attr('alt',"A picture of Eminem's latest diss track against MGK, Killshot");
                    correctAnsDiv.text("The correct answer was: " + correctAnswerArr[9]);
                    break;
            };
        },
        questionSetup: function() {
            correctAnsDiv.hide();
            answerImage.hide();
            questionDiv.text(questions[questionCounter]);
            $('.answers').show();
            ans1Button.text(answerArr1[questionCounter]);
            ans2Button.text(answerArr2[questionCounter]);
            ans3Button.text(answerArr3[questionCounter]);
            ans4Button.text(answerArr4[questionCounter]);
        },
        answerChecker : function(x) {
            if(x === correctAnswerArr[questionCounter]) {
                correct += 1;
                infoText = "Correct!"
                countdownClock.stop();
                countdownClock.reset();
                correctAnswer = true;
                gameLogic.dispCorrectAns();
                setTimeout(gameLogic.questionIncrement,2000);
            } else {
                incorrect += 1;
                infoText = "Uh Oh! Incorrect."
                countdownClock.stop();
                countdownClock.reset();
                correctAnswer = false;
                gameLogic.dispCorrectAns();
                setTimeout(gameLogic.questionIncrement,2000);
            }
        },
        questionIncrement: function(){
            questionCounter += 1;
                if(questionCounter < 10) {
                    gameLogic.questionSetup();
                    countdownClock.start();
                } else {
                    //Run the logic for the end of the game.
                    $('.answers').hide();
                    timerDiv.hide();
                    questionDiv.hide();
                    answerImage.attr('src','assets/images/image11.jpg').attr('alt',"A picture of Eminem with a tie on");
                    correctAnsDiv.show().html("<p>Correct: " + correct + "<br />Incorrect: "+incorrect+"<br />Unanswered: "+unanswered);
                    resetButton.show();
                }
        }
    };

    //What happens when the start button is clicked
    startButton.on('click',function(){

        //Hides the start button after pressing it. 
        startButton.hide();
        //Set first question and start the timer?
        $('.answers').show();
        gameLogic.questionSetup();
        countdownClock.start();

    });

    ans1Button.on('click', function(){
        event.preventDefault();
        var userGuess1 = answerArr1[questionCounter];
        gameLogic.answerChecker(userGuess1);
    });
    ans2Button.on('click', function(){
        event.preventDefault();
        var userGuess2 = answerArr2[questionCounter];
        gameLogic.answerChecker(userGuess2);
    });
    ans3Button.on('click', function(){
        event.preventDefault();
        var userGuess3 = answerArr3[questionCounter];
        gameLogic.answerChecker(userGuess3);
    });
    ans4Button.on('click', function(){
        event.preventDefault();
        var userGuess4 = answerArr4[questionCounter];
        gameLogic.answerChecker(userGuess4);
    });

    resetButton.on('click', function(){
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        questionCounter = 0;
        infoText = '';
        $('.answers').show();
        questionDiv.empty().show();
        correctAnsDiv.empty().hide();
        timerDiv.show();
        resetButton.hide();
        gameLogic.questionSetup();
        countdownClock.start();
    })

});