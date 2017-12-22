
$(document).ready(function(){
    var sets = [
        { 
            Q: "1.  What is the make, model and year of the car that Dean and Sam drive?",
            A: [
                {content: "1967 Chevy Impala", fact: "right" },
                {content: "1977 Chevy Alpaca", fact: "wrong" },
                {content: "1957 Chevy Llama", fact: "wrong" },
                {content: "1987 Chevy Kangaroo", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q1.gif"
        },
        { 
            Q: "2.  What is Dean's favorite dessert?",
            A: [
                {content: "Cake", fact: "wrong" },
                {content: "Pie", fact: "right" },
                {content: "Ice Cream", fact: "wrong" },
                {content: "Cookies", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q2.gif"
        },
        { 
            Q: "3.  What website is Sam's computer frozen on in the season 2 episode 'Tall Tales'?",
            A: [
                {content: "www.topdeanbottomsamftw.com", fact: "wrong" },
                {content: "www.finestfantasy.com", fact: "wrong" },
                {content: "www.beautyandthefeast.com", fact: "wrong" },
                {content: "www.bustyasianbeauties.com", fact: "right" },
            ],
            ImgSrc: "assets/images/Q3.jpg"
        },
        { 
            Q: "4.  What animal set Dean kicking & screaming when investigating an abandant mill in the season 4 episode 'Yellow Fever'?",
            A: [
                {content: "A Cat", fact: "right" },
                {content: "A Puppy", fact: "wrong" },
                {content: "A Bear", fact: "wrong" },
                {content: "A Deer", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q4.gif"
        },
        { 
            Q: "5.  What's the name of the episode where Sam switched body with a teenage boy in season 5?",
            A: [
                {content: "Free To Be You And Me", fact: "wrong" },
                {content: "Sam, Interrupted", fact: "wrong" },
                {content: "Changing Channels", fact: "wrong" },
                {content: "Swap Meat", fact: "right" },
            ],
            ImgSrc: "assets/images/Q5.gif"
        },  
        { 
            Q: "6.  Which superhero Dean likes to claim himself to be?",
            A: [
                {content: "Superman", fact: "wrong" },
                {content: "Batman", fact: "right" },
                {content: "Spiderman", fact: "wrong" },
                {content: "Packman", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q6.gif"
        }, 
        { 
            Q: "7.  Sam is the intended vessel of what Biblical figure?",
            A: [
                {content: "Michael", fact: "wrong" },
                {content: "Gabriel", fact: "wrong" },
                {content: "Lucifer", fact: "right" },
                {content: "God himself", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q7.gif"
        },      
        { 
            Q: "8.  What does Dean call their car?",
            A: [
                {content: "Bae", fact: "wrong" },
                {content: "Babe", fact: "wrong" },
                {content: "Baby", fact: "right" },
                {content: "Sweetie", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q8.gif"
        },      
        { 
            Q: "9.  Which town does Bobby Singer live nearby?",
            A: [
                {content: "Sioux Falls", fact: "right" },
                {content: "Niagara Falls", fact: "wrong" },
                {content: "Free Falls", fact: "wrong" },
                {content: "Everything Falls", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q9.gif"
        },      
        { 
            Q: "10. Who serves as the human vessel for Castiel and what is his profession?",
            A: [
                {content: "Joseph Christian-Daddy", fact: "wrong" },
                {content: "Jimmy Novak-Accountant", fact: "right" },
                {content: "Jeremy Noah-Singer", fact: "wrong" },
                {content: "John Wick-Doglover", fact: "wrong" },
            ],
            ImgSrc: "assets/images/Q10.gif"
        }       
    ]
    var intervalID;
    var timerRunning;
    var n;
    var correctCounter;
    var wrongCounter;
    var unansweredCounter;
    var resetParameters = function(){
        n = 0;
        correctCounter = 0;
        wrongCounter = 0;
        unansweredCounter = 0;
    }
    var timer = {
        time: 30,
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
            timer.time = 30;
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
    };
    var displayPics = function(){
        var imagesource = $(".quiz").attr("data-source")
        $(".pics").attr("src", imagesource);    
    };
    var displayCorrectChoice = function(){
        var correctAnswer = $("li[data-fact='right']");
        $(".correctA").text(`The correct answer is: ${correctAnswer.attr("data-content")}`) 
    };
    var onRunOutTime = function(){
        $(".quiz").hide();
        $(".judge").text("You ran out of time!");
        displayCorrectChoice();     
        displayPics();
        $(".reveal").show();  
        unansweredCounter++;
        if(n < 9){
            goToNextQuestion();
        } else{
            onComplete();
        };      
    };
    var onChoose = function(){
        timer.stop();
        $(".quiz").hide();
        displayPics();
        $(".reveal").show();
    };
    var onWrongAnswer = function(){
        $(".judge").text("You are so wrong!");
        displayCorrectChoice();
        wrongCounter++;  
    };
    var onRightAnswer = function(){
        $(".correctA").empty();
        $(".judge").text("That's right!");
        correctCounter++;
    };
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
    };
    var goToNextQuestion = function(){
        n = n + 1;   
        setTimeout(function(){
            $(".reveal").hide();
            askNewQuestion(n);
            timer.reset();
            timer.start();
            $(".quiz").show();
        }, 5000);
    };
    var restart = function(){
        resetParameters();
        $(".alldone").empty();
        $(".score").empty();
        timer.reset();
        timer.start();
        askNewQuestion(n);
        $(".quiz").show();  
        
    };
    var onComplete = function(){
        $(".reveal").hide();
        $(".summary").show();
        $(".alldone").html("<h2>All done, here's how you did!</h2>");
        var restartButton = $("<li>");
        restartButton.addClass("startOver");
        restartButton.text("Start Over?");
        $(".score").append(`<li>Correct Answers: ${correctCounter}</li>`).
        append(`<li>Incorrect Answers: ${wrongCounter}</li>`).
        append(`<li>Unanswered: ${unansweredCounter}</li>`).append(restartButton);
        $(".startOver").on("click",function(){
            console.log("startover licked");
            restart();});
    };
    var start = function(){
        resetParameters();
        $(".playground").on("click", ".start",function(){  
            $(".brothers").hide();
            $("h1").removeClass("start");
            $("h1").text("Supernatural Trivia");
            timer.reset();
            timer.start();
            askNewQuestion(n);
            $(".quiz").show();    
        });
    };

    start();
    $(".options").on("click","li", function(){    
        if(timerRunning){
            onChoose();
            if($(this).attr("data-fact") === "right"){
                onRightAnswer();
            } else {
                onWrongAnswer();
            };
        };
        if(n < 9){
            goToNextQuestion();
        } else{
            onComplete();
        };       
    })
});