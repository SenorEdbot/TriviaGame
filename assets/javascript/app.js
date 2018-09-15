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

//Waiting for the document to load
$(document).ready(function(){



    //What happens when the start button is clicked
    $("#startButton").on("click",function(){

        //Hides the start button after pressing it. 
        $("#startButton").hide();

    });

});