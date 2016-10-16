var id = 1; //1: black 2:white
var cursorX = -1, cursorY = -1;
var isGameAvailable = true;

//update boards when cursor moves
document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("wrapper");
  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  if (cursorX > 0 && cursorY > 0 && cursorX <= W && cursorY <= H)
    placeStoneHover(cursorX, cursorY);
}

//main
document.onclick = gameMain;

function gameMain() {
  if (!isGameAvailable) return;
  /*AI vs human (human always first for now)*/
  var x_grid = Math.floor(cursorX / 33);
  var y_grid = Math.floor(cursorY / 33);

  var xy_AI = Array(2);

  if (x_grid >= 0 && y_grid >= 0 && x_grid <= 18 && y_grid <= 18 && grid[y_grid][x_grid] == 0) {

    placeStone(x_grid, y_grid);
    if (isGameOver(x_grid, y_grid)) return;
    (id == 1)? id = 2: id = 1;

    /*---AI----*/
    xy_AI = zetaGo();
    /*---------*/
    placeStone(xy_AI[0], xy_AI[1]);
    if (isGameOver(xy_AI[0], xy_AI[1])) return;
    (id == 1)? id = 2: id = 1;

  }

  /*human vs human*/
  // var x_grid = Math.floor(cursorX / 33);
  // var y_grid = Math.floor(cursorY / 33);
  //
  // if (x_grid >= 0 && y_grid >= 0 && x_grid <= 18 && y_grid <= 18 && grid[y_grid][x_grid] == 0) {
  //   placeStone(x_grid, y_grid);
  //   if (isGameOver(x_grid, y_grid)) return;
  //   (id == 1)? id = 2: id = 1;
  // }

  /*AI vs AI 調整中*/
  // var xy_AI = Array(2);
  // xy_AI = zetaGoA();
  //
  // placeStone(xy_AI[0], xy_AI[1]);
  // if (isGameOver(xy_AI[0], xy_AI[1])) return;
  // (id == 1)? id = 2: id = 1;
  //
  //
  // xy_AI = zetaGo();
  //
  // placeStone(xy_AI[0], xy_AI[1]);
  // if (isGameOver(xy_AI[0], xy_AI[1])){
  //   isGameAvailable = false;
  //   return;
  // }
  // (id == 1)? id = 2: id = 1;
}
