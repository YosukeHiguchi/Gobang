function zetaGo() {
  var N = 19;

  var gridP;

  setGridP();

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
//  disp();

  var maxP = 0;
  var xy = Array(2);
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
    var cnt, isSide1Cont, isSide2Cont;

    //vertical
    cnt = 1;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (i - v >= 0 && grid[i - v][j] == id && isSide1Cont) cnt++;
      else isSide1Cont = 0;
      if (i + v < N && grid[i + v][j] == id && isSide2Cont) cnt++;
      else isSide2Cont = 0;
    }
    if (cnt > max) max = cnt;

    //horizontal
    cnt = 1;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (j - v >= 0 && grid[i][j - v] == id && isSide1Cont) cnt++;
      else isSide1Cont = 0;
      if (j + v < N && grid[i][j + v] == id && isSide2Cont) cnt++;
      else isSide2Cont = 0;
    }
    if (cnt > max) max = cnt;

    //down left diagonal
    cnt = 1;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (i - v >= 0 && j - v >=0 && grid[i - v][j - v] == id && isSide1Cont) cnt++;
      else isSide1Cont = 0;
      if (i + v < N && j + v < N && grid[i + v][j + v] == id && isSide2Cont) cnt++;
      else isSide2Cont = 0;
    }
    if (cnt > max) max = cnt;

    //up right diagonal
    cnt = 1;
    isSide1Cont = isSide2Cont = 1;
    for (var v = 1; v <= 4; v++) {
      if (i - v >= 0 && j + v < N && grid[i - v][j + v] == id && isSide1Cont) cnt++;
      else isSide1Cont = 0;
      if (i + v < N && j - v >= 0 && grid[i + v][j - v] == id && isSide2Cont) cnt++;
      else isSide2Cont = 0;
    }
    if (cnt > max) max = cnt;

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
    disp();
  }

  function disp() {
    for (var i = 0; i < N; i++) {
      console.log(i);
      console.log(gridP[i]);
    }
  }

}
