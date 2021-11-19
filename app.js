var time = 60;
var score = 0
var liveMoles = {}


$(document).ready(function() {

    window.setInterval(function(){  
        count_down();
        show_mole();
        
        for (mole in liveMoles) {
            liveMoles[mole] += 1;
            if (liveMoles[mole] > 3) {
                $("#"+mole).attr("src", "hole.png");
                delete liveMoles[mole];
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
        for (mole in liveMoles) {
            $("#"+mole).attr("src", "hole.png");
            delete liveMoles[mole];
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

        if (!(moleHole in liveMoles)) {
            $("#"+moleHole).attr("src", "mole.png");
            liveMoles[moleHole] = 0;
        }

    }

}

function wack_mole( holeNum ) {

    if ($("#"+holeNum).attr("src") != "hole.png") {

        $("#"+holeNum).attr("src", "hole.png");
        delete liveMoles[holeNum];
        
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
        for (mole in liveMoles) {
            $("#"+mole).attr("src", "hole.png");
            delete liveMoles[mole];
        }

        $("#game_over").css("visibility", "hidden");
    });

    $(".square").click(function() {
        var holeId = $(this).attr("id");
        wack_mole(holeId); 
    });

