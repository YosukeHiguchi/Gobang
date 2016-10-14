function isGameOver(x, y) {
  var cnt, isSide1Cont, isSide2Cont;

  //vertical
  cnt = isSide1Cont = isSide2Cont = 1;
  for (var i = 1; i <= 4; i++) {
    if (isEq(y, x, y + i, x) && isSide1Cont) cnt++;
    else isSide1Cont = 0;
    if (isEq(y, x, y - i, x) && isSide2Cont) cnt++;
    else isSide2Cont = 0;

    if (cnt == 5){
      isSide1Cont = isSide2Cont = 1;
      drawStone(x, y, grid[y][x], 0, 1);
      for (var j = 1; j <= 4; j++) {
        if (isEq(y, x, y + j, x) && isSide1Cont) drawStone(x, y + j, grid[y][x], 0, 1);
        else isSide1Cont = 0;
        if (isEq(y, x, y - j, x) && isSide2Cont) drawStone(x, y - j, grid[y][x], 0, 1);
        else isSide2Cont = 0;
      }

      dispWinner(grid[y][x]);
      return true;
    }
  }

  //horizontal
  cnt = isSide1Cont = isSide2Cont = 1;
  for (var i = 1; i <= 4; i++) {
    if (isEq(y, x, y , x + i) && isSide1Cont) cnt++;
    else isSide1Cont = 0;
    if (isEq(y, x, y , x - i) && isSide2Cont) cnt++;
    else isSide2Cont = 0;

    if (cnt == 5){
      isSide1Cont = isSide2Cont = 1;
      drawStone(x, y, grid[y][x], 0, 1);
      for (var j = 1; j <= 4; j++) {
        if (isEq(y, x, y, x + j) && isSide1Cont) drawStone(x + j, y, grid[y][x], 0, 1);
        else isSide1Cont = 0;
        if (isEq(y, x, y, x - j) && isSide2Cont) drawStone(x - j, y, grid[y][x], 0, 1);
        else isSide2Cont = 0;
      }

      dispWinner(grid[y][x]);
      return true;
    }
  }

  //down left diagonal
  cnt = isSide1Cont = isSide2Cont = 1;
  for (var i = 1; i <= 4; i++) {
    if (isEq(y, x, y + i, x + i) && isSide1Cont) cnt++;
    else isSide1Cont = 0;
    if (isEq(y, x, y - i, x - i) && isSide2Cont) cnt++;
    else isSide2Cont = 0;

    if (cnt == 5){
      isSide1Cont = isSide2Cont = 1;
      drawStone(x, y, grid[y][x], 0, 1);
      for (var j = 1; j <= 4; j++) {
        if (isEq(y, x, y + j, x + j) && isSide1Cont) drawStone(x + j, y + j, grid[y][x], 0, 1);
        else isSide1Cont = 0;
        if (isEq(y, x, y - j, x - j) && isSide2Cont) drawStone(x - j, y - j, grid[y][x], 0, 1);
        else isSide2Cont = 0;
      }

      dispWinner(grid[y][x]);
      return true;
    }
  }

  //up right diagonal
  cnt = isSide1Cont = isSide2Cont = 1;
  for (var i = 1; i <= 4; i++) {
    if (isEq(y, x, y + i, x - i) && isSide1Cont) cnt++;
    else isSide1Cont = 0;
    if (isEq(y, x, y - i, x + i) && isSide2Cont) cnt++;
    else isSide2Cont = 0;

    if (cnt == 5){
      isSide1Cont = isSide2Cont = 1;
      drawStone(x, y, grid[y][x], 0, 1);
      for (var j = 1; j <= 4; j++) {
        if (isEq(y, x, y + j, x - j) && isSide1Cont) drawStone(x - j, y + j, grid[y][x], 0, 1);
        else isSide1Cont = 0;
        if (isEq(y, x, y - j, x + j) && isSide2Cont) drawStone(x + j, y - j, grid[y][x], 0, 1);
        else isSide2Cont = 0;
      }

      dispWinner(grid[y][x]);
      return true;
    }
  }

  return false;

  /*-------------------------function----------------------------*/
  function dispWinner(winner) {
    var result = document.getElementById("result");
    (winner == 1)? result.innerHTML = "black won": result.innerHTML = "white won";
  }

  function isEq(y, x, b, a) {
    if (a < 0 || b < 0 || a > 18 || b > 18) return false;
    return (grid[y][x] == grid[b][a]) && grid[y][x] != 0;
  }

}
