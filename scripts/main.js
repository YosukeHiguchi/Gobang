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

//main
document.onclick = function (e) {
  /*AI vs human (human always first for now)*/
  var x_grid = Math.floor(cursorX / 33);
  var y_grid = Math.floor(cursorY / 33);

  var xy_AI = Array(2);

  if (x_grid >= 0 && y_grid >= 0 && x_grid <= 18 && y_grid <= 18 && grid[y_grid][x_grid] == 0) {

    placeStone(x_grid, y_grid);
    isGameOver(x_grid, y_grid);
    (id == 1)? id = 2: id = 1;

    /*---AI----*/
    xy_AI = betaGo();
    /*---------*/
    placeStone(xy_AI[0], xy_AI[1]);
    isGameOver(xy_AI[0], xy_AI[1]);
    (id == 1)? id = 2: id = 1;
    
  }

  /*human vs human*/
  //var x_grid = Math.floor(cursorX / 33);
  //var y_grid = Math.floor(cursorY / 33);
  // if (x_grid >= 0 && y_grid >= 0 && x_grid <= 18 && y_grid <= 18 && grid[y_grid][x_grid] == 0) {
  //   placeStone(x_grid, y_grid);
  //   isGameOver(x_grid, y_grid);
  //   (id == 1)? id = 2: id = 1;
  // }

  /*AI vs AI 調整中*/
  // betaGo();
  // isGameOver();
  // (id == 1)? id = 2: id = 1;
  // zetaGo();
  // isGameOver();
  // (id == 1)? id = 2: id = 1;
}
