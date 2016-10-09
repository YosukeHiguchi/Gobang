var id = 1; //1: black 2:white
var cursorX = -1, cursorY = -1;

//update boards when cursor moves
document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("wrapper");
  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  if (cursorX > 0 && cursorY > 0 && cursorX <= W && cursorY <= H)
    placeStoneHover(cursorX, cursorY);
}

document.onclick = function (e) {
  var x_grid = Math.floor(cursorX / 33);
  var y_grid = Math.floor(cursorY / 33);

  //for AI vs human
  if (x_grid >= 0 && y_grid >= 0 && x_grid <= 18 && y_grid <= 18 && grid[y_grid][x_grid] == 0) {
    placeStone(x_grid, y_grid);
    (id == 1)? id = 2: id = 1;

    /*---AI----*/
    zetaGo();
    /*---------*/

    (id == 1)? id = 2: id = 1;
  }

  //for human vs human
  // if (x_grid >= 0 && y_grid >= 0 && x_grid <= 18 && y_grid <= 18 && grid[y_grid][x_grid] == 0) {
  //   placeStone(x_grid, y_grid);
  //   (id == 1)? id = 2: id = 1;
  // }

  var winner = getWinner();
  if (winner == 1) {
    alert("black won");
  }
  else if (winner == 2) {
    alert("white won");
  }
}
