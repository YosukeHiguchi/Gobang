var id = 2; //1: black 2:white
var N = 15;
var cursorX = -1, cursorY = -1;
var isGameAvailable = true;

//update boards when cursor moves
document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("wrapper");
  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  if (cursorX - adjust_px > 0 && cursorY - adjust_px > 0 && cursorX <= W -adjust_px && cursorY <= H - adjust_px)
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

  if (x_grid >= adjust_grid && y_grid >= adjust_grid &&
      x_grid < N + adjust_grid && y_grid < N + adjust_grid && grid[y_grid - adjust_grid][x_grid - adjust_grid] == 0) {

    placeStone(x_grid - adjust_grid, y_grid - adjust_grid);
    if (isGameOver(x_grid, y_grid)) return;
    (id == 1)? id = 2: id = 1;

    /*---AI----*/
    xy_AI = zetaGo(id);
    /*---------*/

    placeStone(xy_AI[0], xy_AI[1]);
    if (isGameOver(xy_AI[0], xy_AI[1])) return;
    (id == 1)? id = 2: id = 1;
  }

  /*human vs human*/
  // var x_grid = Math.floor(cursorX / 33);
  // var y_grid = Math.floor(cursorY / 33);
  //
  // if (x_grid >= adjust_grid && y_grid >= adjust_grid &&
  //     x_grid < N + adjust_grid && y_grid < N + adjust_grid && grid[y_grid - adjust_grid][x_grid - adjust_grid] == 0) {
  //   placeStone(x_grid - adjust_grid, y_grid - adjust_grid);
  //   if (isGameOver(x_grid - adjust_grid, y_grid - adjust_grid)) return;
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
  // xy_AI = zetaGo(id);
  //
  // placeStone(xy_AI[0], xy_AI[1]);
  // if (isGameOver(xy_AI[0], xy_AI[1])){
  //   isGameAvailable = false;
  //   return;
  // }
  // (id == 1)? id = 2: id = 1;
}
