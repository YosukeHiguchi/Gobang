var id = 1; //1: black 2:white
var cursorX = -1, cursorY = -1;

//update boards when cursor moves
document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("wrapper");
  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  placeStoneHover(cursorX, cursorY);
}

document.onclick = function (e) {
  var x_grid = Math.floor(cursorX / 33);
  var y_grid = Math.floor(cursorY / 33);

  if (grid[y_grid][x_grid] == 0) {
    placeStone(x_grid, y_grid);
    if (id == 1) id = 2;
    else if (id == 2) id = 1;
  }

/*---AI----*/
  zetaGo();
/*---------*/

  console.log(isGameOver());

}
