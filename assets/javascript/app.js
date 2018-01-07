
$(document).ready(function(){
    var sets = [
        { 
            Q: "1.  What is the make, model and year of the car that Dean and Sam drive?",
            A: [
                {content: "1967 Chevy Impala", fact: true },
                {content: "1977 Chevy Alpaca", fact: false },
                {content: "1957 Chevy Llama", fact: false },
                {content: "1987 Chevy Kangaroo", fact: false },
            ],
            imgSrc: "assets/images/Q1.gif"
        },
        { 
            Q: "2.  What is Dean's favorite dessert?",
            A: [
                {content: "Cake", fact: false },
                {content: "Pie", fact: true },
                {content: "Ice Cream", fact: false },
                {content: "Cookies", fact: false },
            ],
            imgSrc: "assets/images/Q2.gif"
        },
        { 
            Q: "3.  What website is Sam's computer frozen on in the season 2 episode 'Tall Tales'?",
            A: [
                {content: "www.topdeanbottomsamftw.com", fact: false },
                {content: "www.finestfantasy.com", fact: false },
                {content: "www.beautyandthefeast.com", fact: false },
                {content: "www.bustyasianbeauties.com", fact: true},
            ],
            imgSrc: "assets/images/Q3.jpg"
        },
        { 
            Q: "4.  What animal set Dean kicking & screaming when investigating an abandant mill in the season 4 episode 'Yellow Fever'?",
            A: [
                {content: "A Cat", fact: true},
                {content: "A Puppy", fact: false },
                {content: "A Bear", fact: false },
                {content: "A Deer", fact: false },
            ],
            imgSrc: "assets/images/Q4.gif"
        },
        { 
            Q: "5.  What's the name of the episode where Sam switched body with a teenage boy in season 5?",
            A: [
                {content: "Free To Be You And Me", fact: false },
                {content: "Sam, Interrupted", fact: false },
                {content: "Changing Channels", fact: false },
                {content: "Swap Meat", fact: true },
            ],
            imgSrc: "assets/images/Q5.gif"
        },  
        { 
            Q: "6.  Which superhero Dean likes to claim himself to be?",
            A: [
                {content: "Superman", fact: false },
                {content: "Batman", fact: true },
                {content: "Spiderman", fact: false },
                {content: "Packman", fact: false },
            ],
            imgSrc: "assets/images/Q6.gif"
        }, 
        { 
            Q: "7.  Sam is the intended vessel of what Biblical figure?",
            A: [
                {content: "Michael", fact: false },
                {content: "Gabriel", fact: false },
                {content: "Lucifer", fact:true },
                {content: "God himself", fact: false },
            ],
            imgSrc: "assets/images/Q7.gif"
        },      
        { 
            Q: "8.  What does Dean call their car?",
            A: [
                {content: "Bae", fact: false },
                {content: "Babe", fact: false },
                {content: "Baby", fact:true },
                {content: "Sweetie", fact: false },
            ],
            imgSrc: "assets/images/Q8.gif"
        },      
        { 
            Q: "9.  Which town does Bobby Singer live nearby?",
            A: [
                {content: "Sioux Falls", fact: true },
                {content: "Niagara Falls", fact: false },
                {content: "Free Falls", fact: false },
                {content: "Everything Falls", fact: false },
            ],
            imgSrc: "assets/images/Q9.gif"
        },      
        { 
            Q: "10. Who serves as the human vessel for Castiel and what is his profession?",
            A: [
                {content: "Joseph Christian-Daddy", fact: false },
                {content: "Jimmy Novak-Accountant", fact: true },
                {content: "Jeremy Noah-Singer", fact: false },
                {content: "John Wick-Doglover", fact: false },
            ],
            imgSrc: "assets/images/Q10.gif"
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
        var correctAnswer = $("li[data-fact=true]");
        $(".correctA").text(`The correct answer is: ${correctAnswer.attr("data-content")}`) 
    };
    var onRunOutTime = function(){
        $(".judge").text("You ran out of time!");
        displayCorrectChoice();     
        displayPics();
        $(".quiz").hide();
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
        displayPics();
        $(".quiz").hide();
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
        $(".quiz").attr("data-source",q.imgSrc);
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
            $(".pics").attr("src",""); 
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
    var addRestartButton = function(){
        var restartButton = $("<li>");
        restartButton.addClass("startOver");
        restartButton.text("Start Over?");
        $(".score").append(restartButton);
        $(".startOver").on("click",function(){
            console.log("startover clicked");
            restart();});
    };
    var onComplete = function(){
        setTimeout(function(){
            $(".reveal").hide();
            $(".pics").attr("src","");
            $(".summary").show();
            $(".alldone").html("<h2>All done, here's how you did!</h2>");
            $(".score").append(`<li>Correct Answers: ${correctCounter}</li>`).
            append(`<li>Incorrect Answers: ${wrongCounter}</li>`).
            append(`<li>Unanswered: ${unansweredCounter}</li>`);
            addRestartButton();},5000);
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
            if($(this).attr("data-fact")){
                onRightAnswer();
            } else {
                onWrongAnswer();
            };
            $(".reveal").show();
        };
        if(n < 9){
            goToNextQuestion();
        } else{
            onComplete();
        };       
    })
});