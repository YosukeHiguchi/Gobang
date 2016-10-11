function zetaGo() {
  var N = 19;
  var PRIORITY_FOUR = 50;
  var PRIORITY_FIVE = 100;

  var gridP;
  var xy = Array(2);

  setGridP();

  var countEmpty = 0;
  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (grid[i][j] == 0)
        countEmpty++;
    }
  }
  if (countEmpty == N * N) {
    xy = [Math.floor(N / 2), Math.floor(N / 2)];
    return xy;
  }

  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (grid[i][j] == 0)
        gridP[i][j] += getPriority(i, j, 1);
    }
  }
  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (grid[i][j] == 0)
        gridP[i][j] += getPriority(i, j, 2);
    }
  }
  disp();

  var maxP = 0;
  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (gridP[i][j] > maxP){
        maxP = gridP[i][j];
        xy[0] = j;
        xy[1] = i;
      }
    }
  }

  return xy;


/*---------------------------function---------------------------*/
  //returns priority value at (i, j)
  function getPriority(i, j, id) {
    var max = 0;
    var cnt, cntSide1, cntSide2, isSide1Cont, isSide2Cont;

    //vertical
    cntSide1 = cntSide2 = 0;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (i - v >= 0 && grid[i - v][j] == id && isSide1Cont) cntSide1++;
      else isSide1Cont = 0;
      if (i + v < N && grid[i + v][j] == id && isSide2Cont) cntSide2++;
      else isSide2Cont = 0;
    }
    cnt = cntSide1 + cntSide2 + 1;
    if (cntSide1 == 3 || cntSide2 == 3) cnt = PRIORITY_FOUR;
    if (cnt > max) max = cnt;

    //horizontal
    cntSide1 = cntSide2 = 0;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (j - v >= 0 && grid[i][j - v] == id && isSide1Cont) cntSide1++;
      else isSide1Cont = 0;
      if (j + v < N && grid[i][j + v] == id && isSide2Cont) cntSide2++;
      else isSide2Cont = 0;
    }
    cnt = cntSide1 + cntSide2 + 1;
    if (cntSide1 == 3 || cntSide2 == 3) cnt = PRIORITY_FOUR;
    if (cnt > max) max = cnt;

    //down left diagonal
    cntSide1 = cntSide2 = 0;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (i - v >= 0 && j - v >=0 && grid[i - v][j - v] == id && isSide1Cont) cntSide1++;
      else isSide1Cont = 0;
      if (i + v < N && j + v < N && grid[i + v][j + v] == id && isSide2Cont) cntSide2++;
      else isSide2Cont = 0;
    }
    cnt = cntSide1 + cntSide2 + 1;
    if (cntSide1 == 3 || cntSide2 == 3) cnt = PRIORITY_FOUR;
    if (cnt > max) max = cnt;

    //up right diagonal
    cntSide1 = cntSide2 = 0;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (i - v >= 0 && j + v < N && grid[i - v][j + v] == id && isSide1Cont) cntSide1++;
      else isSide1Cont = 0;
      if (i + v < N && j - v >= 0 && grid[i + v][j - v] == id && isSide2Cont) cntSide2++;
      else isSide2Cont = 0;
    }
    cnt = cntSide1 + cntSide2 + 1;
    if (cntSide1 == 3 || cntSide2 == 3) cnt = PRIORITY_FOUR;
    if (cnt > max) max = cnt;

    if (max >= 5 && max != 50) max = PRIORITY_FIVE;

    return max;

  }

  //-1 for stone placed grids
  function setGridP(){
    gridP = new Array(N);
    for (var i = 0; i < N; i++) {
      gridP[i] = new Array(N);
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 1 || grid[i][j] == 2) gridP[i][j] = -1;// = 0;
        else gridP[i][j] = 0;
      }
    }
  }

  function disp() {
    for (var i = 0; i < N; i++) {
      console.log(i);
      console.log(gridP[i]);
    }
  }

}
