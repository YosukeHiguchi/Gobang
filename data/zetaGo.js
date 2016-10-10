function zetaGo() {
  var N = 19;

  var gridP;

  setGridP();
  disp();

  var xy = [0, 0];
  return xy;

  //-1 for stone placed grids
  function setGridP(){
    gridP = new Array(N);
    for (var i = 0; i < N; i++) {
      gridP[i] = new Array(N);
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 1 || grid[i][j] == 2) gridP[i][j] = -1;
        else gridP[i][j] = 0;
      }
    }
  }

  function getPriority() {
  }

  function disp() {
    for (var i = 0; i < N; i++) {
      console.log(i);
      console.log(gridP[i]);
    }
  }

}
