
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
                {content: "www.beautyandthefeast.com", fact: "right" },
                {content: "www.bustyasianbeauties.com", fact: "right" },
            ],
            ImgSrc: "assets/images/Q3.jpg"
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
        }, 3000);
    };
    var timer = {
        time: 10,
        count: function(){
            var correctAnswer = $("li[data-fact='right']");
            if(timer.time > 0){
                timer.time--;
                $(".display").html(`<h2>Time Remaining: ${timer.time} seconds </h2>`);
                $(".options").on("click","li", function(){
                    var choice = $(this);
                    timer.stop();
                    $(".quiz").hide();
                    if(choice.attr("data-fact") === "right"){
                        $(".judge").text("That's right!")
                    } else {
                        $(".judge").text("You are so wrong!");
                        $(".correctA").text(`The correct answer is: ${correctAnswer.attr("data-content")}`)
                    } 
                    var imagesource = $(".quiz").attr("data-source")
                    $(".pics").attr("src", imagesource);
                    goToNextQuestion();
                })
            } else {
                timer.stop();
                $(".quiz").hide();  
                $(".judge").text("You ran out of time!");
                $(".correctA").text(`The correct answer is: ${correctAnswer.attr("data-content")}`)              
                var imagesource = $(".quiz").attr("data-source")
                $(".pics").attr("src", imagesource);
                goToNextQuestion();
                
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
 
    

    $(".playground").on("click", ".start",function(){  
        $(".brothers").hide();
        $("h1").removeClass("start");
        $("h1").text("Supernatural Trivia");
        timer.reset();
        timer.start();
        askNewQuestion(n);
      
    });

    // $(".options").on("click","li", function(){
    //     var choice = $(this);
    //     var correctAnswer = $("li[data-fact='right']");
    //     console.log(correctAnswer)
    //     timer.stop();
    //     $(".quiz").hide();
    //     if(choice.attr("data-fact") === "right"){
    //         $(".judge").text("That's right!")
    //     } else {
    //         $(".judge").text("You are so wrong!");
    //         $(".correctA").text(`The correct answer is: ${correctAnswer.attr("data-content")}`)
    //     } 
    //     var imagesource = $(".quiz").attr("data-source")
    //     $(".pics").attr("src", imagesource);
        // setTimeout(function(){
        //     askNewQuestion(1);
        //     $(".reveal").hide();
        //     $(".judge").hide();
        //     $(".quiz").show();
        // },2000)
        // n++;    
    // })
    






});