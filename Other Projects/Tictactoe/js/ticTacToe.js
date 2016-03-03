$(document).ready(function() {

  var circleOrEx = "o"; // it represents the person who starts, they will be starting with the "o"
  var isGameInProgress = true; // after "o" has been placed, the game has begun
  var winningCombos = { // var is being assigned all the possible winning array combinations

    //0 1 2
    //3 4 5
    //6 7 8

    0: [ //0 is key
      [1, 2], //0 + 1 + 2 will equal a winning combination
      [3, 6], //0 + 3 + 6 will equal a winning combination
      [4, 8] //0 + 4 + 8 will equal a winning combination
    ],
    1: [
      [0, 2], //1 + 0 + 2 equal a winning combination
      [4, 7] //1 + 4 + 7 equal a winning combination
    ],
    2: [
      [0, 1], //2 + 0 + 1 equal a winning combination
      [5, 8], //2 + 5 + 8 equal a winning combination
      [4, 6] //2 + 4 + 6 equal a winning combination
    ],
    3: [
      [0, 6], //3 + 0 + 6 equal a winning combination
      [4, 5] //3 + 4 + 5 equal a winning combination
    ],
    4: [
      [1, 8], //4 + 1 + 8 equal a winning combination
      [2, 6], //4 + 2 + 6 equal a winning combination
      [1, 7], //4 + 1 + 7 equal a winning combination
      [3, 5] //4 + 3 + 5 equal a winning combination
    ],
    5: [
      [2, 8], //5 + 2 + 8 equal a winning combination
      [3, 4] //5 + 3 + 4 equal a winning combination
    ],
    6: [
      [0, 3], //6 + 0 + 3 equal a winning combination
      [2, 4], //6 + 2 + 4 equal a winning combination
      [7, 8] //6 + 7 + 8 equal a winning combination
    ],
    7: [
      [1, 4], //7 + 1 + 4 equal a winning combination
      [6, 8] //7 + 6 + 8 equal a winning combination
    ],
    8: [
      [0, 4], //8 + 0 + 4 equal a winning combination
      [2, 5], //8 + 2 + 5 equal a winning combination
      [6, 7] // 8 + 6 + 7 equal a winning combination
    ]
  };

  // when you click the board, the game will be in progress
  $("#board").find("div").on("click", function() {

    if (isGameInProgress && $(this).hasClass("empty")) { // remove the empty class and add "x" or an "o" to the square when it is clicked
      $(this).removeClass("empty").append("<span class='" + circleOrEx + "'>" + circleOrEx + "</span"); //allows the user to put "x" or "o" in the square

      checkIfWon($(this).index(), circleOrEx); //if "x" wins the last game, then "o" will start, and vice versa

      if (circleOrEx === "o") {
        circleOrEx = "x";
      } else {
        circleOrEx = "o";
      }
    }

  });

  // a new game will be started once the button is clicked on
  $("#newGame").on("click", function() {

    var boardSquares = $("#board").find("div"); // variable boardSquares is given to the empty board
    var firstEmptyMemorySquare = $(".container").find(".nine").filter(function() { // variable "EmptyMemorySquare" returns method with empty board
      return $.trim($(this).text()) === "" && $(this).children().length === 0;
    }).not("#board").first();

    if (firstEmptyMemorySquare.length == 1) { //it places a board game in progress, to be moved to another place on the screen or "EmptyMemorySquare"
      firstEmptyMemorySquare.html($("#board").html());
    } else {
      $(".container").find(".nine").not("#board").empty();
      $(".container").find(".nine").first().html($("#board").html());
    }

    //deletes anything in empty class to games that are in progress
    boardSquares.each(function() {
      $(this).addClass("empty").empty();
    })
    isGameInProgress = true;
  })

  //checks if player has won, chosenSquare is winning combination, combinations are 0-8
  function checkIfWon(chosenSquare) {

    var mulitArr = winningCombos[chosenSquare];
    var playerWon; //the chosen squares = winning combos, with the winning array combinations will show that the player won

    for (var i = 0; i < mulitArr.length; i++) { //a loop within a loop, so if the length of the array is 3 then the player has won, i starts at 0 and goes up by increments of 1 until won
      playerWon = true;
      for (var j = 0; j < mulitArr[i].length; j++) { //j starts at 0 and increments of 1 until winning combination has been met
        if (!$("#board").find("div").eq(mulitArr[i][j]).find("span").hasClass(circleOrEx)) { //if not the board will find
          playerWon = false;
        }
      }

      if (playerWon) { //the condition if a player wins

        for (var j = 0; j < mulitArr[i].length; j++) {
          $("#board").find("div").eq(mulitArr[i][j]).find("." + circleOrEx).addClass("green"); //the winning array/combination will turn green if won
        }
        $("#board").find("div").eq(chosenSquare).find("." + circleOrEx).addClass("green");
        alert("Winner is " + circleOrEx.toUpperCase() + "!"); //alert box will pop up and state the winner is "x" or "o"
        isGameInProgress = false; //once the game is won, that game will end, the loop will stop
        return false; //this exits the loop
      }
    }


  }
})
