var time = 60;
var score = 0
var live_moles = {}
const timer = document.querySelector("#timer")


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

// function count_down() {
    
//     $("#timer").html(time);
    
//     if (time > 0) {
//         time--;
//     } else {
        
//         //All moles dissapear 
//         for (mole in live_moles) {
//             $("#"+mole).attr("src", "hole.png");
//             delete live_moles[mole];
//         }

//         //displays message
//         $("#game_over").css("visibility", "visible");

//     }
// }

function count_down() {
    timer.innerHTML = time;

    if (time > 0){
        time--;
    }

    else {
        live_moles.forEach((mole) => {
            $("#"+mole).attr("src", "hole.png");
            delete live_moles[mole];})
    }
}

function show_mole() {
    
    if (time > 0) {  
        var rand_wait_time = Math.floor(Math.random() * 3000)+500; 
        setTimeout(show_mole, rand_wait_time); 

        var moleHole = Math.floor(Math.random() * 9 ); // random hole between 0 and 8

        if (!(moleHole in live_moles)) {
            $("#"+moleHole).attr("src", "mole.png");
            live_moles[moleHole] = 0;
        }
    }
}

// on clicking the square
$(".square").click(function() {
    var hole_id = $(this).attr("id");
    wack_mole(hole_id); 
});

function wack_mole( hole_id ) {

    if ($("#"+hole_id).attr("src") != "hole.png") {

        $("#"+hole_id).attr("src", "hole.png");
        delete live_moles[hole_id];
        
        score++;
        $("#score").html(score);

    }

}

function reset_game() {
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

}



