var time = 60;
var score = 0
var live_moles = {}


$(document).ready(function() {

    window.setInterval(function(){  
        count_down();
        show_mole();
        
        for (mole in live_moles) {
            live_moles[mole] += 1;
            if (live_moles[mole] > 3) {
                $("#"+mole).attr("src", "hole.png");
                delete live_moles[mole];
            }
        }

    }, 1000);
    
});

function count_down() {
    
    $("#timer").html(time);
    
    if (time > 0) {
        time--;
    } else {
        
        //All moles dissapear 
        for (mole in live_moles) {
            $("#"+mole).attr("src", "hole.png");
            delete live_moles[mole];
        }

        //displays message
        $("#game_over").css("visibility", "visible");

    }
}

function show_mole() {
    
    if (time > 0) {  //so that no moles appear when game is not running
        var timeRand = Math.floor(Math.random() * 5000)+1000; //Generate Random number between 1000-6000 (0-5 secs)
        setTimeout(show_mole, timeRand); 

        var moleHole = Math.floor(Math.random() * 9 ); //Generate Random hole number between 0-8 

        if (!(moleHole in live_moles)) {
            $("#"+moleHole).attr("src", "mole.png");
            live_moles[moleHole] = 0;
        }

    }

}

function wack_mole( holeNum ) {

    if ($("#"+holeNum).attr("src") != "hole.png") {

        $("#"+holeNum).attr("src", "hole.png");
        delete live_moles[holeNum];
        
        score++;
        $("#score").html(score);

    }

}

function reset_game() {
    currentTime = 60;
    score = 0;

}

    $(".button").click(function() {
        time = 60;
        score = 0;
        $("#timer").html(time);
        $("#score").html(score);
        
        //All moles dissapear 
        for (mole in live_moles) {
            $("#"+mole).attr("src", "hole.png");
            delete live_moles[mole];
        }

        $("#game_over").css("visibility", "hidden");
    });

    $(".square").click(function() {
        var holeId = $(this).attr("id");
        wack_mole(holeId); 
    });

