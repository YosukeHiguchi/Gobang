function zetaGo() {
  var N = 19;

  var gridP;

  main();
  function main() {
    setGridP();

    disp();
  }

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



// function betaGo() {
//   for (var i = 0; i < N; i++) {
//     for (var j = 0; j < N; j++) {
//       if (grid[i][j] == 0) {
//         placeStone(j, i);
//         return;
//       }
//     }
//   }
// }
