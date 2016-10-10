function isGameOver(x, y) {
  var cnt, isSide1Cont, isSide2Cont;

  //horizontal
  cnt = isSide1Cont = isSide2Cont = 1;
  for (var i = 1; i <= 4; i++) {
    if (isEq(y, x, y + i, x) && isSide1Cont) cnt++;
    else isSide1Cont = 0;
    if (isEq(y, x, y - i, x) && isSide2Cont) cnt++;
    else isSide2Cont = 0;

    if (cnt == 5){
      dispWinner(grid[y][x]);
      return true;
    }
  }

  //vertical
  cnt = isSide1Cont = isSide2Cont = 1;
  for (var i = 1; i <= 4; i++) {
    if (isEq(y, x, y , x + i) && isSide1Cont) cnt++;
    else isSide1Cont = 0;
    if (isEq(y, x, y , x - i) && isSide2Cont) cnt++;
    else isSide2Cont = 0;

    if (cnt == 5){
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
      dispWinner(grid[y][x]);
      return true;
    }
  }

  return false;

  /*-------------------------function----------------------------*/
  function dispWinner(winner) {
    (winner == 1)? alert("black won"): alert("white won");
  }

  function isEq(y, x, b, a) {
    if (a < 0 || b < 0 || a > 18 || b > 18) return false;
    return (grid[y][x] == grid[b][a]) && grid[y][x] != 0;
  }

}
