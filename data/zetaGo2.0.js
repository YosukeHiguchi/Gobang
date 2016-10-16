function zetaGoC() {
  var N = 19;
  var GOOD_CHOICE = 100;
  var BAD_CHOICE = -10;

  //grid priority
  var GP1, GP2;
  var xy = Array(2);

  setGP();

  var num;
  //human: 1 AI: 2
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (GP1[i][j] >= 2) { //if the grid-priority of opponent at (i, j) is more than 2
        /*---no damage when 0 for now----*/
        num = checkFuture(grid, i, j, 2, 1); //try placing stone at (i, j)
        GP1[i][j] += (100 - num * 5);
      }
    }
  }
  disp(GP1);

  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      isCheck(grid, i, j, 1);
    }
  }

  //disp(GP1);

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
  //level: 0 for current grid
  function checkFuture(target, i, j, id, level) {
    var idOp = (id == 1)? 2: 1;

    var thisGrid = new Array(N); //the grid of this level
    //set grid
    for (var u = 0; u < N; u++) {
      thisGrid[u] = new Array(N);
      for (var v = 0; v < N; v++){
        thisGrid[u][v] = target[u][v];
      }
    }

    thisGrid[i][j] = id;

    //checkCount: the number of places that can become checkmate
    var checkCount = 0, checkmateCount = 0;
    for (var u = 0; u < N; u++) {
      for (var v = 0; v < N; v++) {
        if (isCheck(thisGrid, u, v, idOp) > 1) { return BAD_CHOICE; }
        if (isCheck(thisGrid, u, v, idOp) == 1) { checkCount++; }//console.log(i + " " + j + " " + u + " " + v); }
      }
    }

    return checkCount;

    var thisGP1 = new Array(N), thisGP2 = new Array(N); //the gp of this level
    //set GP
    for (var u = 0; u < N; u++) {
      thisGP1[u] = new Array(N);
      thisGP2[u] = new Array(N);
      for (var v = 0; v < N; v++){
        if (thisGrid[u][v] == 0) {
          thisGP1[u][v] = getPriority(thisGrid, u, v, 1);
          thisGP2[u][v] = getPriority(thisGrid, u, v, 2);
        }
        else {
          thisGP1[u][v] = 0;
          thisGP2[u][v] = 0;
        }
      }
    }

  }

  //returns priority Dir at (i, j) on grid(target)
  function getPriority(target, i, j, id) {
    var max = 0;
    //sideCont: if same stones are continued in one line, 1
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

  //returns the number of 王手 that can be obtained when stone(id) is place at (i, j)
  //available when target(i, j) is empty
  //[0, 1, 1, 1, 0, 0] [0, 0, 1, 1, 1, 0]
  function isCheck(target, i, j, id) {
    if (target[i][j] != 0) return -1;

    var idOp = (id == 1)? 2: 1;
    var cmCnt = 0; //the number of precheckmates

    //pattern of checkmates
    var cm1 = [0, 0, id, id, id, 0];
    var cm2 = [0, id, 0, id, id, 0];
    var cm3 = [0, id, id, id, id, idOp];

    //horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    //sidegrid: one of the value in one direction
    //sideCnt: the number of similarity
    var side1grid, side2grid, side1Cnt, side2Cnt;
    for (var d = 0; d < 4; d++){
      //cm1
      side1grid = side2grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = - 1; v <= 4; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1grid == cm1[v + 1]) side1Cnt++;
        if (side2grid == cm1[v + 1]) side2Cnt++;
      }
      if (side1Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //cm2
      side1grid = side2grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = -2; v <= 3; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1grid == cm2[v + 2]) side1Cnt++;
        if (side2grid == cm2[v + 2]) side2Cnt++;
      }
      if (side1Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //cm3
      side1grid = side2grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = 0; v <= 4; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1grid == cm3[v]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2grid == cm3[v]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { cmCnt++; console.log("check at: " + i + " " + j); }
      if (side2Cnt == 5) { cmCnt++; console.log("check at: " + i + " " + j); }

      //add here for more

    }

    return cmCnt;

  }

  //returns the number of 詰み that can be obtained when stone(id) is place at (i, j)
  //available when target(i, j) is empty
  //[0, 1, 1, 1, 1, 0]
  function isCheckmate(target, i, j, id) {
    if (target[i][j] != 0) return -1;

    var cmCnt = 0; //the number of checkmates

    //pattern of checkmates
    var cm1 = [0, id, id, id, id, 0];

    //horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    //sidegrid: one of the value in one direction
    //sideCnt: the number of similarity
    var side1grid, side2grid, side1Cnt, side2Cnt;
    for (var d = 0; d < 4; d++){
      //cm
      side1grid = side2grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = 0; v <= 5; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1grid == cm1[v]) side1Cnt++;
        if (side2grid == cm1[v]) side2Cnt++;
      }
      if (side1Cnt == 6) { cmCnt++; }//console.log("checkmate at: " + i + " " + j); }
      if (side2Cnt == 6) { cmCnt++; }//console.log("checkmate at: " + i + " " + j); }

      //add here for more
    }

    return cmCnt;

  }

  //-1 for stone placed grids
  function setGP(){
    GP1 = new Array(N);
    GP2 = new Array(N);
    for (var i = 0; i < N; i++) {
      GP1[i] = new Array(N);
      GP2[i] = new Array(N);
      for (var j = 0; j < N; j++){
        GP1[i][j] = 0;
        GP2[i][j] = 0;
      }
    }

    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 0) {
          GP1[i][j] = getPriority(grid, i, j, 1);
          GP2[i][j] = getPriority(grid, i, j, 2);
        }
      }
    }
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 1) {
          if (i - 1 >= 0 && grid[i - 1][j] == 0) GP1[i - 1][j]++;
          if (i + 1 < N && grid[i + 1][j] == 0) GP1[i + 1][j]++;
          if (j - 1 >= 0 && grid[i][j - 1] == 0) GP1[i][j - 1]++;
          if (j + 1 < N && grid[i][j + 1] == 0) GP1[i][j + 1]++;
          if (i - 1 >=0 && j - 1 >= 0 && grid[i - 1][j - 1] == 0) GP1[i - 1][j - 1]++;
          if (i + 1 < N && j - 1 >= 0 && grid[i + 1][j - 1] == 0) GP1[i + 1][j - 1]++;
          if (i + 1 < N && j + 1 < N && grid[i + 1][j + 1] == 0) GP1[i + 1][j + 1]++;
          if (i - 1 >=0 && j + 1 < N && grid[i - 1][j + 1] == 0) GP1[i - 1][j + 1]++;
        }
        else if (grid[i][j] == 2) {
          if (i - 1 >= 0) GP2[i - 1][j]++;
          if (i + 1 < N) GP2[i + 1][j]++;
          if (j - 1 >= 0) GP2[i][j - 1]++;
          if (j + 1 < N) GP2[i][j + 1]++;
          if (i - 1 >=0 && j - 1 >= 0) GP2[i - 1][j - 1]++;
          if (i + 1 < N && j - 1 >= 0) GP2[i + 1][j - 1]++;
          if (i + 1 < N && j + 1 < N) GP2[i + 1][j + 1]++;
          if (i - 1 >=0 && j + 1 < N) GP2[i - 1][j + 1]++;
        }
      }
    }
  }

  function disp(thisGrid) {
    // for (var i = 0; i < N; i++) {
    //   console.log(i + "\t" + thisGrid[i]);
    // }
    for (var i = 0; i < N; i++) {
        console.log(thisGrid[i][0] + "\t" + thisGrid[i][1] + "\t" + thisGrid[i][2] + "\t" + thisGrid[i][3] + "\t" + thisGrid[i][4] + "\t" +
                    thisGrid[i][5] + "\t" + thisGrid[i][6] + "\t" + thisGrid[i][7] + "\t" + thisGrid[i][8] + "\t" + thisGrid[i][9] + "\t" +
                    thisGrid[i][10] + "\t" + thisGrid[i][11] + "\t" + thisGrid[i][12] + "\t" + thisGrid[i][13] + "\t" + thisGrid[i][14] + "\t" +
                    thisGrid[i][15] + "\t" + thisGrid[i][16] + "\t" + thisGrid[i][17] + "\t" + thisGrid[i][18] );
    }
    console.log("\n\n");
  }

}
