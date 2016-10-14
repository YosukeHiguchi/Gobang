function zetaGo() {
  var N = 19;

  var GP1, GP2;
  var xy = Array(2);

  setGP();

  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (grid[i][j] == 0)
        GP1[i][j] += getPriority(grid, i, j, 1);
    }
  }

  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (grid[i][j] == 0)
        isCheckmate(grid, i, j, 1);
    }
  }
  disp();

  var maxP = 0;
  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (GP1[i][j] > maxP){
        maxP = GP1[i][j];
        xy[0] = j;
        xy[1] = i;
      }
    }
  }

  return xy;


/*---------------------------function----------------------------*/
  //returns priority Dir at (i, j) on grid(target)
  function getPriority(target, i, j, id) {
    var max = 0;
    var cnt, side1Cont, side2Cont;

    //horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    for (var d = 0; d < 4; d++){
      cnt = side1Cont = side2Cont = 1;

      for (var v = 1; v <= 4; v++) {
        var side1grid = -1, side2grid = -1;

        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1grid == id && side1Cont) cnt++;
        else if (side1grid != 0) side1Cont = 0;
        if (side2grid == id && side2Cont) cnt++;
        else if (side2grid != 0) side2Cont = 0;
      }
      if (cnt > max) max = cnt;
    }

    return max;
  }

  //returns true when the grid(target) is 詰んだ when id at (i, j)
  //available when target(i, j) is empty
  //[0, 1, 1, 1, 0, 0] [0, 0, 1, 1, 1, 0]
  function isCheckmate(target, i, j, id) {
    if (target[i][j] != 0) return false;

    var cmCnt = 0;
    var cm1 = [0, 0, id, id, id, 0];
    var cmX = [], cmY = [];

    //horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    var side1grid, side2grid, side1Cnt, side2Cnt;
    for (var d = 0; d < 4; d++){
      //cm1
      side1grid = side2grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = 1; v <= 5; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1grid == cm1[v]) side1Cnt++;
        if (side2grid == cm1[v]) side2Cnt++;
      }
      if (side1Cnt == 5) { cmX.push(j - xDir[d]); cmY.push(i - yDir[d]); console.log((i - yDir[d])+ " " + (j - xDir[d])); }
      if (side2Cnt == 5) { cmX.push(j + xDir[d]); cmY.push(i + yDir[d]); console.log((i + yDir[d])+ " " + (j + xDir[d])); }

    }

    return false;

  }

  //-1 for stone placed grids
  function setGP(){
    GP1 = new Array(N);
    for (var i = 0; i < N; i++) {
      GP1[i] = new Array(N);
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 1 || grid[i][j] == 2) GP1[i][j] = 0;
        else GP1[i][j] = 0;
      }
    }

    GP2 = new Array(N);
    for (var i = 0; i < N; i++) {
      GP2[i] = new Array(N);
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 1 || grid[i][j] == 2) GP2[i][j] = 0;
        else GP2[i][j] = 0;
      }
    }
  }

  function disp() {
    for (var i = 0; i < N; i++) {
      console.log(i + "  " + GP1[i]);
    }
    console.log("\n\n");
  }

}
