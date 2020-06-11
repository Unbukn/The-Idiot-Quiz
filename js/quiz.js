$(document).ready(function () {
        // Global vars and objects
    // startup text var
    var startingText = ["A quiz to evaluate where you fall on the scale of idocracy.", "This quiz is intended to inform you that no matter how smart you think you are, you're prolly an idiot.", "See if you have what it takes prove you've got a brain on those sholders."];
    var pageTitle = $("title")
    var bigText = $("#bigText")
    var alertText = $("#displayAlerts")
    var questionText = $("#displayQuestion")
    var questionContainer = $("#choiceList")

    // sounds object
    var sound = {
        start: ["./assets/Start.wav"],
        correct: ["./assets/success.wav"],
        incorrect: ["./assets/incorrect.wav"],
        timesUp: [""],
        end: [""],
    }; 

    var startSound = sound.start[0];
    var correctSound = sound.correct[0];
    var incorrectSound = sound.incorrect[0];

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
        theChoices:["Deer","Rabbit","Rats", "Dogs", "Computers"],
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

    var correctCounter = 0
    var incorrectCounter = 0
    var quizCounter = 0
    var endTest = false


    // display page title
    pageTitle.text("The Idiot Quiz - Start"); 
    // display the application title
    bigText.text("The Idiot Quiz")
    // display random startup text
    alertText.text(startingText[Math.floor(Math.random() * startingText.length)]);

    // wait for start to be clicked
    $("#startButton").click(function (event) { 
        event.preventDefault();
        // play start sound
        playSound(startSound)   
        // remove the start button
        $("#startButton").remove("#startButton");
        // empty the question list
        questionContainer.empty()
        // Start the quiz
        loadQuestion(0)

    });

        function loadQuestion(questionNumber) {
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
                choice.text(crntQuestion.theChoices[i])
                choice.addClass("btn btn-outline-primary");
                choice.attr("id", "btn"+i)
                questionContainer.append(choice);
            }
            // What happens when a choice is selected
            questionContainer.on("click", function (event) {
                event.preventDefault();
                var element = event.target;
                if (element.matches("li") === true) {
                    // get the text of the button
                    var buttonSelected = $(element).text();
                    if ((buttonSelected === crntQuestion.theAwnser[0]) === false) {
                        // when user picks the wrong choice
                        // play the wrong choice sound
                        playSound(incorrectSound)
                        // add to incorrect counter

                        console.log(incorrectCounter + " incorrect so far")
                        // shake the screen for 2 seconds
                        // shakeScreen(4)
                        correctCounter++
                        
                        nextQuestion()

                    }else{
                        // when user picks the right choice
                        // play incorrect sound
                        playSound(correctSound)
                        incorrectCounter++
                        console.log(correctCounter + " correct so far")
                        // shake the screen for .5 seconds
                        // shakeScreen(1)
                        nextQuestion()
                    }                
                }

            });



        }



















    // Functions
    function nextQuestion(params) {
    // display the next button to 
    // create the button
    nextDiv = $("#nextDiv")
    var nextButton = $("<button></button>")
    nextButton.attr("class", "alert alert-dark");
    nextButton.text("Next Question")
    nextDiv.append(nextButton)
    thisQuestion++
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
        // produce the results
        // clear the contents of the screen
        bigText.empty()
        alertText.empty()
        questionText.empty()
        questionContainer.empty()
        // create a new para
        totalCorrect = $("<div>")
        totalCorrect.attr("class", "alert alert-primary")
        totalCorrect.text("Correct Answers: " + correctCounter)
        $("#resultsContainer").append(totalCorrect);



        quizCounter++
        bigText.text("Your Score")
        alertText.text("Let's see how you did.")
        
        questionText.html("This some text")
        // play ending sound

        // display results!
                    
    }


});