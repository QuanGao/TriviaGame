
$(document).ready(function(){
    var sets = [
        { 
            Q: "What is the make, model and year of the car that Dean and Sam drive?",
            A: [
                {content: "1967 Chevy Impala", fact: true },
                {content: "1977 Chevy Alpaca", fact: false },
                {content: "1957 Chevy Llama", fact: false },
                {content: "1987 Chevy Kangoroo", fact: false },
            ]
        },
        { 
            Q: "Where did Sam go to college?",
            A: [
                {content: "Yale", fact: false },
                {content: "Stanford", fact: true },
                {content: "Harvard", fact: false },
                {content: "Little witch academy", fact: false },
            ]
        }
    ]
    console.log(Object.keys(sets[0].A[0].content));

    var intervalID;
    var timerRunning;
    var timer = {
        time: 30,
        count: function(){
            if(timer.time > 0){
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
    }
    var askNewQuestion = function(i){
        var q = sets[i];
        $(".question").text(q.Q);
        var answerList = $("ul").children();
        for (var i = 0; i < 4; i++){
            answerList.eq(i).text(q.A[i].content);
        };
    }

    $(".playground").on("click", ".start",function(){
        console.log("clicked")       
        $(".brothers").hide();
        $("h1").removeClass("start");
        $("h1").text("Supernatural Trivia");
        timer.reset();
        timer.start();
        askNewQuestion(0);

        
    });

 
    






});