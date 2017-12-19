
$(document).ready(function(){
    var sets = [
        { 
            Q: "What is the make, model and year of the car that Dean and Sam drive?",
            A: [
                {content: "1967 Chevy Impala", fact: "right" },
                {content: "1977 Chevy Alpaca", fact: "wrong" },
                {content: "1957 Chevy Llama", fact: "wrong" },
                {content: "1987 Chevy Kangaroo", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q1.gif"
        },
        { 
            Q: "What is Dean's favorite dessert?",
            A: [
                {content: "Cake", fact: "wrong" },
                {content: "Pie", fact: "right" },
                {content: "Ice Cream", fact: "wrong" },
                {content: "Cookies", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q2.gif"
        },
        { 
            Q: "What website is Sam's computer frozen on in the season 2 episode 'Tall Tales'?",
            A: [
                {content: "www.topdeanbottomsamftw.com", fact: "wrong" },
                {content: "www.finestfantasy.com", fact: "wrong" },
                {content: "www.beautyandthefeast.com", fact: "wrong" },
                {content: "www.bustyasianbeauties.com", fact: "right" },
            ],
            ImgSrc: "assets/images/Q3.jpg"
        },
        { 
            Q: "What animal set Dean screaming when investigating an abandant mill in the season 4 episode 'Yellow Fever'?",
            A: [
                {content: "A Cat", fact: "right" },
                {content: "A Puppy", fact: "wrong" },
                {content: "A Bear", fact: "wrong" },
                {content: "A Deer", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q4.gif"
        },
        { 
            Q: "What's the name of the episode where Sam switched body with a teenage boy in season 5?",
            A: [
                {content: "Free To Be You And Me", fact: "right" },
                {content: "Sam, Interrupted", fact: "wrong" },
                {content: "Changing Channels", fact: "wrong" },
                {content: "Swap Meat", fact: "right" },
            ],
            ImgSrc: "assets/images/Q5.gif"
        },  
        { 
            Q: "Which superhero Dean likes to claim himself to be?",
            A: [
                {content: "Superman", fact: "wrong" },
                {content: "Batman", fact: "right" },
                {content: "Spiderman", fact: "wrong" },
                {content: "Packman", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q6.gif"
        }, 
        { 
            Q: "Sam is the intended vessel of what Biblical figure?",
            A: [
                {content: "Michael", fact: "wrong" },
                {content: "Gabriel", fact: "wrong" },
                {content: "Lucifer", fact: "right" },
                {content: "God himself", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q7.gif"
        },      
        { 
            Q: "What does Dean call their car?",
            A: [
                {content: "Bae", fact: "wrong" },
                {content: "Babe", fact: "wrong" },
                {content: "Baby", fact: "right" },
                {content: "Sweetie", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q8.gif"
        }
        
    ]
    var intervalID;
    var timerRunning;
    var n = 0;
    var correctCounter = 0;
    var wrongCounter = 0;
    var unansweredCounter = 0;
    var timer = {
        time: 10,
        count: function(){
            if(timer.time <=0){
                timer.stop();
                $(".display").html(`<h2>Time Remaining: 0 seconds </h2>`);
                onRunOutTime();        
            } else {
                timer.time--;
                $(".display").html(`<h2>Time Remaining: ${timer.time} seconds </h2>`);
            }
        },
        reset: function(){
            timer.time = 10;
            $(".display").html(`<h2>Time Remaining: ${timer.time} seconds </h2>`);
            timerRunning = false;
        },
        start: function(){
            if(!timerRunning){
                intervalID = setInterval(timer.count, 1000)
            };
            timerRunning = true;
        },
        stop: function(){
            clearInterval(intervalID);
            timerRunning = false;
        }
    }
    var displayPics = function(){
        var imagesource = $(".quiz").attr("data-source")
        $(".pics").attr("src", imagesource);    
    }
    var displayCorrectChoice = function(){
        var correctAnswer = $("li[data-fact='right']");
        $(".correctA").text(`The correct answer is: ${correctAnswer.attr("data-content")}`) 
    }
    var onRunOutTime = function(){
        $(".quiz").hide();  
        $(".judge").text("You ran out of time!");
        displayCorrectChoice();     
        displayPics();
        goToNextQuestion();
        unansweredCounter++;
    }
    var onChoose = function(){
        timer.stop();
        $(".quiz").hide();
        $(".reveal").show();
        displayPics();
    }
    var onWrongAnswer = function(){
        $(".judge").text("You are so wrong!");
        displayCorrectChoice();
        wrongCounter++;  
    }
    var onRightAnswer = function(){
        $(".judge").text("That's right!");
        correctCounter++;
    }
    var askNewQuestion = function(i){
        var q = sets[i];
        $(".question").html(`<span>${q.Q}</span>`);
        $(".quiz").attr("data-source",q.ImgSrc);
        var answerList = $("ul").children();
        for (var i = 0; i < 4; i++){
            answerList.eq(i).text(q.A[i].content);
            answerList.eq(i).attr("data-fact",q.A[i].fact);
            answerList.eq(i).attr("data-content",q.A[i].content);
        };
    }
    var goToNextQuestion = function(){
        n = n + 1;
        setTimeout(function(){
            $(".reveal").hide();
            $(".quiz").show();
            askNewQuestion(n);
            timer.reset();
            timer.start();
        }, 4000);
    };

    var restart = function(){
        $(".summary").hide();
        $(".brothers").show();
        $("h1").addClass("start");
        $("h1").text("Start Trivia Game");
    };

    var onComplete = function(){
        $(".reveal").hide();
        $(".summary").show();
        $(".alldone").text("All done, here's how you did!");
        $(".score").append(`<li>Correct Answers: ${correctCounter}</li>`).
        append(`<li>Incorrect Answers: ${wrongCounter}</li>`).
        append(`<li>Unanswered: ${unansweredCounter}</li>`)
    }

    $(".playground").on("click", ".start",function(){  
        $(".brothers").hide();
        $("h1").removeClass("start");
        $("h1").text("Supernatural Trivia");
        timer.reset();
        timer.start();
        askNewQuestion(n);    
    });

    $(".options").on("click","li", function(){    
        if(timerRunning){
            onChoose();
            if($(this).attr("data-fact") === "right"){
                onRightAnswer();
            } else {
                onWrongAnswer();
            } 
            goToNextQuestion();
        } 
    })
 


    
 
    






});