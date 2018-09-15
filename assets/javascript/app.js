/* Logic Needed: 
1. User presses a start button to start the game and start the first timer.
2. Question Logic
    a) If the timer runs out of time the question is considered 'unanswered' and the answer is shown for a few seconds (5)
    b) If the user guesses the correct answer the question is considered 'correct' and the answer is shown for a few seconds (5)
    c) If the user guesses incorrectly the question is considered 'incorrect' and and "Oh, No! The correct answer was" and then show the correct answer screen (5)
3. After each answered screen the game should automatically display the next question and start the timer at 30 seconds.
4. After the game is completed a summary screen is shown that displays the number of 'unanswered', 'correct', or 'incorrect' answers and displays a "Start Over?" button. 
5. The start over button does not reload the page and starts the game over at the beginning. 
*/

/**
 * When an answer button is pressed
 *  Check to see what position the question array is on
 *  Determine if the correct answer was associated to that button for that question in the array
 */

//Setting up the Questions Array
var questions = [
    "What is Eminem's full name?",
    "What State was he born in?",
    "How many times did he repeat 9th grade?",
    "What is the name of the first rap group he joined?",
    "What is the name of his Ex-Wife?",
    "What is the name of his Daughter?",
    "Which song broke a Guinness Book of World Record for the most words in a song?",
    "Who did he call when he needed to get Clean?",
    "How many consecutive number one albums has he released (UK Albums Chart)?",
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
//Setting the 4 required variables
var correct, incorrect, unanswered, questionCounter = 0;
var questionsRemaining = true;
var correctAnswer = false;

//Setting the jQuery ID's to variables
var timerDiv = $('#timerDiv');
var questionDiv = $('#questionDiv');
var correctAnsDiv = $('#correctAnsDiv');
var ans1Button = $('#answer1');
var ans2Button = $('#answer2');
var ans3Button = $('#answer3');
var ans4Button = $('#answer4');
var startButton = $('#startButton');
var resetButton = $('#resetButton');

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
            countdownClock.stop();
            countdownClock.reset();
            correctAnswer = false;
            //display the correct answer function (do a timeout of 7 seconds)
            //setInterval(dispCorrectAns, 7000);
            questionCounter += 1;
            if(questionCounter < 9) {
                gameLogic.questionSetup();
                countdownClock.start();
            } else {
                //Run the logic for the end of the game.
            }

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
var gameLogic = {
    dispCorrectAns: function() {
        $('.answers').hide();
        correctAnsDiv.show();
        switch(questionCounter){
            case 0:
                questionDiv.text();
                //Display the image.
                correctAnsDiv.text("The correct answer was :" + correctAnswerArr[0])
                break;
            case 1:
                questionDiv.text("The correct answer was :" + correctAnswerArr[1]);
                break;
            case 2:
                questionDiv.text("The correct answer was :" + correctAnswerArr[2]);
                break;
            case 3:
                questionDiv.text("The correct answer was :" + correctAnswerArr[3]);
                break;
            case 4:
                questionDiv.text("The correct answer was :" + correctAnswerArr[4]);
                break;
            case 5:
                questionDiv.text("The correct answer was :" + correctAnswerArr[5]);
                break;
            case 6:
                questionDiv.text("The correct answer was :" + correctAnswerArr[6]);
                break;
            case 7:
                questionDiv.text("The correct answer was :" + correctAnswerArr[7]);
                break;
            case 8:
                questionDiv.text("The correct answer was :" + correctAnswerArr[8]);
                break;
            case 9:
                questionDiv.text("The correct answer was :" + correctAnswerArr[9]);
                break;
        }
    },
    questionSetup: function() {
        correctAnsDiv.hide();
        questionDiv.text(questions[questionCounter]);
        $('.answers').show();
        ans1Button.text(answerArr1[questionCounter]);
        ans2Button.text(answerArr2[questionCounter]);
        ans3Button.text(answerArr3[questionCounter]);
        ans4Button.text(answerArr4[questionCounter]);
    }
}

var answerChecker = function(x) {
    if(x === correctAnswerArr[questionCounter]) {
        correct += 1;
        countdownClock.stop();
        countdownClock.reset();
        correctAnswer = true;
        //timeout for displaying the correct answer screen here
        questionCounter += 1;
            if(questionCounter < 9) {
                gameLogic.questionSetup();
                countdownClock.start();
            } else {
                //Run the logic for the end of the game.
            }
    } else {
        incorrect += 1;
        countdownClock.stop();
        countdownClock.reset();
        correctAnswer = false;
        //timeout for displaying the correct answer
        questionCounter += 1;
            if(questionCounter < 9) {
                gameLogic.questionSetup();
                countdownClock.start();
            } else {
                //Run the logic for the end of the game.
            }
    }
}



//Waiting for the document to load
$(document).ready(function(){

    //What happens when the start button is clicked
    startButton.on('click',function(event){

        //Hides the start button after pressing it. 
        startButton.hide();
        //Set first question and start the timer?
        $('.answers').show();
        questionSetup();
        countdownClock.start();

    });

});