$(document).ready(function () {
        // Global vars and objects
    // startup text var
    var startingText = ["A quiz to evaluate where you fall on the scale of idocracy.", "This quiz is intended to inform you that no matter how smart you think you are, you're prolly an idiot.", "See if you have what it takes prove you've got a brain on those sholders."];
    var pageTitle = $("title")
    var bigText = $("#bigText")
    var alertText = $("#displayAlerts")
    var questionText = $("#displayQuestion")
    var questionContainer = $("#choiceList")
    var resultsContainer = $("#resultsContainer")
    var nextDiv = $("#nextDiv")
    
    // sounds object
    var sound = {
        start: ["./assets/Start.wav"],
        correct: ["./assets/success.wav"],
        incorrect: ["./assets/incorrect.wav"],
        timesUp: ["./assets/TimesUp.wav"],
        end: ["./assets/end.wav"],
    }; 

    var startSound = sound.start[0];
    var correctSound = sound.correct[0];
    var incorrectSound = sound.incorrect[0];
    var timesup = sound.timesUp[0];
    var end = sound.end[0];

    // question objects are here
    var question0 = {
        theQuestion: ["What causes night and day?"],
        theAwnser: ["The earth spins on its axis."],
        theChoices:["The earth spins on its axis.","The earth moves around the sun.", "Clouds block out the sun's light.", "The earth moves into and out of the sun's shadow.", "The sun goes around the earth."],
    };

    var question1 = {
        theQuestion: ["What is the longest that an elephant has ever lived? (That we know of)"],
        theAwnser: ["86 years"],
        theChoices:["17 years","46 years", "86 years", "146 years"],
    };

    var question2 = {
        theQuestion: ["What is the name of the medical condition whereby people randomly develop a foreign accent?"],
        theAwnser: ["Foreign Accent Syndrome"],
        theChoices:["Insomnia","Frenchy Flu", "Foreign Accent Syndrome"],
    };

    var question3 = {
        theQuestion: ["Cabbage contains what percentage of water?"],
        theAwnser: ["91 percent"],
        theChoices:["32 percent","91 percent","2 percent", "15 percent"],
    };
    var question4 = {
        theQuestion: ["According to statistics, you'll probably live the longest in which U.S. state?"],
        theAwnser: ["Hawaii"],
        theChoices:["Hawaii","Illinois","Maryland", "New York"],
    };
    var question5 = {
        theQuestion: ["Nephophobia is the fear of _____."],
        theAwnser: ["Clouds"],
        theChoices:["Glass","Illinois","Textbooks", "Clouds", "Closeness"],
    };
    var question6 = {
        theQuestion: ["In Monopoly, you collect ____ for finishing second in a beauty contest."],
        theAwnser: ["$10"],
        theChoices:["$10","$50","$100", "$100", "$200"],
    };
    var question7 = {
        theQuestion: ["Ōkunoshima is an island off of Japan that’s completely overrun with _____."],
        theAwnser: ["Rabbits"],
        theChoices:["Deer","Rabbits","Rats", "Dogs", "Computers"],
    };
    var question8 = {
        theQuestion: ["Alfred Hitchcock’s Psycho was the first film to show a ____ on screen."],
        theAwnser: ["Toilet"],
        theChoices:["Topless woman","Toilet","Blood stain", "Couple in bed"],
    };
    var question9 = {
        theQuestion: ["True or False: The heart of a shrimp is located in its head."],
        theAwnser: ["True"],
        theChoices:["False","True"],
    };
    // array of question objects
    var questionsList = [question0,question1,question2,question3,question4,question5,question6,question7,question8,question9];

    // timer in second
    var secondsLeft = 60;
    var correctCounter = 0
    var incorrectCounter = 0
    var questionCounter = 0
    var quizCounter = 0
    var testEnd = false


    // Initial Display below
    pageTitle.text("The Idiot Quiz - Start"); 
    // display the application title
    bigText.text("The Idiot Quiz")
    // display random startup text
    alertText.text(startingText[~~(Math.random() * startingText.length)]);







    
    //**********************************event listeners below*****************


    // wait for start to be clicked
    $("#startButton").click(function (event) { 
        event.preventDefault();
        // play start sound
        playSound(startSound)   
        // remove the start button
        $("#startButton").remove("#startButton");
        // empty the question list
        questionContainer.empty()
        // Start the quiz (question Number)
        loadQuestion(questionCounter)
        // start the timer
        theTimer()

    });

    // when a choice is selected
    questionContainer.on("click", function (event) {
        event.preventDefault();
        var element = event.target;

        // prevent selecting multiple choices selection
        var totalAwnsers = incorrectCounter + correctCounter
              console.log("selected: " + totalAwnsers +" question#: " + questionCounter)
              console.log(questionCounter == totalAwnsers)
        if (totalAwnsers == questionCounter){
            if (element.matches("li") === true) {
                // get the text of the button
                var buttonSelected = $(element).text();
                // when user picks the wrong choice
    
                var crntQuestion = questionsList[questionCounter]
                console.log(crntQuestion.theAwnser[0])
                if (buttonSelected !== crntQuestion.theAwnser[0]) {
                    // play the wrong choice sound
                    playSound(incorrectSound)
                    // add to incorrect counter
                    incorrectCounter++
                    console.log(incorrectCounter + " incorrect so far")
                    // shake the screen for 1 seconds
                    // shakeScreen(2)
                    showNextButton()
                    
                    // turn the button red
                    
                    $("li").removeClass("btn-outline-primary");
                    $("li").addClass("btn-primary")
                    // buttonSelected.removeClass("btn btn-outline-primary");
                    // buttonSelected.addClass("btn btn-outline-danger");
                    
                }else{
                    // when user picks the right choice
                    // play incorrect sound
                    playSound(correctSound)
                    correctCounter++
                    console.log(correctCounter + " correct so far")
                    // shake the screen for .5 seconds
                                    // turn the button green
                    // buttonSelected.removeClass("btn btn-outline-success");
                    // buttonSelected.addClass("btn btn-outline-danger");
                    shakeScreen(1)
                    
                    showNextButton()
    
                }
                
            
            }
            
        }else if (totalAwnsers !== questionCounter){
            alertText.addClass("alert alert-warning");
            alertText.text("you already selected a choice for this question")
        }
            

    
    });
    
    // when the next button is clicked
    nextDiv.click(function (e) { 
        e.preventDefault();
        // if it's a button
        
        var element = event.target;
        if (element.matches("button") === true) {
            // load the next question
            questionCounter++
            nextQuestion()
            // clear the next button
            element.remove()
        }
        
    });

    // Functions
    function loadQuestion(questionNumber) {
        if (questionCounter == questionsList.length) {
            produceResults()
        }else {
            var thisQuestion = questionNumber
            // first clear all question
            alertText.empty()
            questionText.empty()
            questionContainer.empty()
            // produce questions
            var crntQuestion = questionsList[thisQuestion];
            questionText.text(crntQuestion.theQuestion[0]);
            questionText.attr("class", "lead");

            // produce choices
            for (i = 0; i < crntQuestion.theChoices.length; i++) {
                // display the question
                questionText.text(crntQuestion.theQuestion[0])
                // create a new list item
                var choice = $("<li>");
                // create the button
                choice.attr("type", "button");
                choice.addClass("btn btn-outline-primary");
                choice.attr("id", "btn"+i)
                choice.text(crntQuestion.theChoices[i])
                questionContainer.append(choice);
            }    
        }
    }

    function showNextButton() {
        // clear out existing next buttons
        nextDiv.empty()

        // display the next button to 

        // create the button
        var nextButton = $("<button></button>")
        // style the button
        nextButton.attr("class", "alert alert-dark");
        if (questionCounter == 10) {
            buttonText = "Get your score"
        }else{
            buttonText = "Next Question"
        }
        // add text to the button
        nextButton.text(buttonText)
        nextDiv.append(nextButton)
        
    }

    function nextQuestion() {
            
            console.log("loading next quetion")
            loadQuestion(questionCounter)
    }

        function theTimer() {
        
        var timerInterval = setInterval(function() {
            
            secondsLeft--;
            if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
            }else if (testEnd == true) {
                // stop the time interval
                clearInterval(timerInterval);
                
            }else {
                bigText.text(secondsLeft + " Seconds Remaining");
            }
            
        }, 1000);
    }
        function sendMessage() {
        bigText.text("TIMES UP!")
        // produce the results
        produceResults()
        // play sound
        playSound(timesup)
      }



    // play a sound(what sound?)
    function playSound(SoundType) {
    var audiobox = $("#soundBox")
    // document.createElement("audio");
        audiobox.attr("src", SoundType);
        // lower the volume (save the speakers)
        audiobox.attr("volume", "5");
    }

    // shake the screen( how many times? )
    function shakeScreen(count) {
        $("body").css("animation", "shake 0.5s");
        $("body").css("animation-iteration-count", count);
    }

    function produceResults() {
        testEnd = true
        quizCounter++
        bigText.text("")      
        // clear current question out
        questionContainer.empty()
        
        // create an new para for the results to go inside of
        result = $("h4")

            // determine result
            if (correctCounter <= 2) {
                // style it
                result.attr("class", "alert alert-danger")
                result.text("You completed the test with " + correctCounter + " correct answers and " + incorrectCounter + " incorrect. You're are a complete imbecile and might be affected with moderate intellectual disability!")
                bigText.text("Imbecile")

            }else if (correctCounter <= 4){
                // style it
                result.attr("class", "alert alert-danger")
                result.text("You completed the test with " + correctCounter + " correct answers and " + incorrectCounter + " incorrect. You're an idiot that most would consider a person of low intelligence!")
                bigText.text("Idiot")
            }
            else if (correctCounter <= 6){
                // style it
                result.attr("class", "alert alert-warning")
                result.text("You completed the test with " + correctCounter + " correct answers and " + incorrectCounter + " incorrect. You're a moron, otherwise know as a stupid person.")
                bigText.text("Moron")
             }
            else if (correctCounter <= 8){
                // style it
                result.attr("class", "alert alert-secondary")
                result.text("You completed the test with " + correctCounter + " correct answers and " + incorrectCounter + " incorrect. You're not too bright - Someone who is very stupid or just ignorant, and can't comprehend the most basic things.")
                bigText.text("Not Too Bright")
             }else if (correctCounter <= 10){
                // style it
                result.attr("class", "alert alert-success")
                result.text("You completed the test with " + correctCounter + " correct answers and " + incorrectCounter + " incorrect! But, it still looks like you're pretty dumb. Many things are challenging for you.")
                bigText.text("Still Pretty Dumb")
             }
                
        // attach the result to the results container
        resultsContainer.append(result);



        // play ending sound
        playSound(end)
        // display results!
              
    }


});