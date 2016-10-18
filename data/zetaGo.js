function zetaGo(myID) {
  var N = 15;
  var BAD_CHOICE = 100;

  var opID = (myID == 1)? 2: 1;
  var GP; //grid-priority
  var xy = Array(2); //result
  var maxP = 0; //max priority

  //check if AI can win
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (checkmate(grid, i, j, myID)) {
        xy[0] = j;  xy[1] = i;
        return xy;
      }
    }
  }
  var opCheckmate = false;
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (checkmate(grid, i, j, opID)) opCheckmate = true;
    }
  }
  for (var i = 0; i < N && !opCheckmate; i++) {
    for (var j = 0; j < N; j++) {
      if (isCheckmate(grid, i, j, myID) > 0) {
        xy[0] = j;  xy[1] = i;
        return xy;
      }
    }
  }

  setGP();

  //defence
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (GP[i][j] >= 2) { //if the grid-priority of opponent at (i, j) is more than 2
        //5 is a weight of the result of checkFuture
        var num = tryPlacingStone(grid, i, j, myID, 1);
        GP[i][j] += (100 - num * 6);
      }
    }
  }
  disp(GP);

  //offence
  var toOffense = true;
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (isCheck(grid, i, j, opID) > 0) toOffense = false;
    }
  }
  for (var i = 0; i < N && toOffense; i++) {
    for (var j = 0; j < N; j++) {
      if (isCheckmate(grid, i, j, myID) > 0) {
        xy[0] = j;  xy[1] = i;
        return xy;
      }
      if (isCheck(grid, i, j, myID) > 0) {
        xy[0] = j;  xy[1] = i;
        return xy;
      }
    }
  }

  for (var i = 0; i < N; i++){
    for (var j = 0; j < N; j++) {
      if (GP[i][j] > maxP){
        maxP = GP[i][j];
        xy[0] = j;  xy[1] = i;
      }
    }
  }

  return xy;

/*---------------------------function----------------------------*/
  //returns high number when placing at (i, j) is bad
  function tryPlacingStone(target, i, j, id, level) {
    var opID = (id == 1)? 2: 1;

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
        if (isCheck(thisGrid, u, v, opID) > 1) { return BAD_CHOICE; } //gameover
        if (isCheck(thisGrid, u, v, opID) == 1) { checkCount++; }
      }
    }

    ////
    if (checkCount == 0 && target == 1) {
      //place opID
      for (var u = 0; u < N; u++) {
        for (var v = 0; v < N; v++) {
          /*=======================================*/
          if (thisGrid[u][v] == 0) {
            thisGrid[u][v] = opID;

            var thisGP = new Array(N);
            for (var i = 0; i < N; i++) {
              thisGP[i] = new Array(N);
              for (var j = 0; j < N; j++){
                thisGP[i][j] = 0; //initialize with 0
              }
            }

            //base priority
            for (var i = 0; i < N; i++) {
              for (var j = 0; j < N; j++){
                if (grid[i][j] == 0) {
                  thisGP[i][j] = getPriority(grid, i, j, opID) + continuousLength(grid, i, j, opID);
                }
              }
            }
            //increment priority around the stone
            for (var i = 0; i < N; i++) {
              for (var j = 0; j < N; j++){
                if (grid[i][j] == opID) {
                  if (i - 1 >= 0 && grid[i - 1][j] == 0) thisGP[i - 1][j]++;
                  if (i + 1 < N && grid[i + 1][j] == 0) thisGP[i + 1][j]++;
                  if (j - 1 >= 0 && grid[i][j - 1] == 0) thisGP[i][j - 1]++;
                  if (j + 1 < N && grid[i][j + 1] == 0) thisGP[i][j + 1]++;
                  if (i - 1 >=0 && j - 1 >= 0 && grid[i - 1][j - 1] == 0) thisGP[i - 1][j - 1]++;
                  if (i + 1 < N && j - 1 >= 0 && grid[i + 1][j - 1] == 0) thisGP[i + 1][j - 1]++;
                  if (i + 1 < N && j + 1 < N && grid[i + 1][j + 1] == 0) thisGP[i + 1][j + 1]++;
                  if (i - 1 >=0 && j + 1 < N && grid[i - 1][j + 1] == 0) thisGP[i - 1][j + 1]++;
                }
              }
            }



          }
          /*=======================================*/
        }
      }
    }
    ////

    return checkCount;

    // var thisGP1 = new Array(N), thisGP2 = new Array(N); //the gp of this level
    // //set GP
    // for (var u = 0; u < N; u++) {
    //   thisGP1[u] = new Array(N);
    //   thisGP2[u] = new Array(N);
    //   for (var v = 0; v < N; v++){
    //     if (thisGrid[u][v] == 0) {
    //       thisGP1[u][v] = getPriority(thisGrid, u, v, 1);
    //       thisGP2[u][v] = getPriority(thisGrid, u, v, 2);
    //     }
    //     else {
    //       thisGP1[u][v] = 0;
    //       thisGP2[u][v] = 0;
    //     }
    //   }
    // }
  }

  //set up GP
  function setGP(){
    GP = new Array(N);
    for (var i = 0; i < N; i++) {
      GP[i] = new Array(N);
      for (var j = 0; j < N; j++){
        GP[i][j] = 0; //initialize with 0
      }
    }

    //base priority
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++){
        if (grid[i][j] == 0) {
          GP[i][j] = getPriority(grid, i, j, opID) + continuousLength(grid, i, j, opID);
        }
      }
    }
    //increment priority around the stone
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++){
        if (grid[i][j] == opID) {
          if (i - 1 >= 0 && grid[i - 1][j] == 0) GP[i - 1][j]++;
          if (i + 1 < N && grid[i + 1][j] == 0) GP[i + 1][j]++;
          if (j - 1 >= 0 && grid[i][j - 1] == 0) GP[i][j - 1]++;
          if (j + 1 < N && grid[i][j + 1] == 0) GP[i][j + 1]++;
          if (i - 1 >=0 && j - 1 >= 0 && grid[i - 1][j - 1] == 0) GP[i - 1][j - 1]++;
          if (i + 1 < N && j - 1 >= 0 && grid[i + 1][j - 1] == 0) GP[i + 1][j - 1]++;
          if (i + 1 < N && j + 1 < N && grid[i + 1][j + 1] == 0) GP[i + 1][j + 1]++;
          if (i - 1 >=0 && j + 1 < N && grid[i - 1][j + 1] == 0) GP[i - 1][j + 1]++;
        }
      }
    }
  }

  //returns base priority of each grid
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

        if (side1grid == id && side1Cont == 1) cnt++;
        else if (side1grid != 0) side1Cont = 0;
        if (side2grid == id && side2Cont == 1) cnt++;
        else if (side2grid != 0) side2Cont = 0;
      }

      if (cnt > max) max = cnt;
    }

    return max;
  }

  //returns the number of stones more than 1 in one continuous line of stones
  function continuousLength(target, i, j, id) {
    var cnt = 0;
    var cntSide1, cntSide2, isSide1Cont, isSide2Cont;

    //horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    for (var d = 0; d < 4; d++){
      cntSide1 = cntSide2 = 0;
      isSide1Cont = isSide2Cont = true;

      for (var v = 1; v <= 4; v++) {
        var isSide1grid = -1, isSide2grid = -1;

        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          isSide1grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          isSide2grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (isSide1grid == id && isSide1Cont) cntSide1++;
        else isSide1Cont = false;
        if (isSide2grid == id && isSide2Cont) cntSide2++;
        else isSide2Cont = false;

      }
      cnt += cntSide1 + cntSide2 + 1;
    }

    return (cnt > 5)? cnt: 0; //magic number for more than 1 stone
}

  //returns true when AI wins
  function checkmate(target, i, j, id) {
    if (target[i][j] != 0) return false; //returns when (i, j) is not empty
    var opID = (id == 1)? 2: 1;

    var cm1 = [0, id, id, id, id];
    var cm2 = [id, 0, id, id, id];
    var cm3 = [id, id, 0, id, id];

    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    var side1Grid, side2Grid, side1Cnt, side2Cnt;
    for (var d = 0; d < 4; d++){
      //cm1
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = 0; v <= 4; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1Grid == cm1[v]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2Grid == cm1[v]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { return true; }
      if (side2Cnt == 5) { return true; }

      //cm2
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = -1; v <= 3; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1Grid == cm2[v + 1]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2Grid == cm2[v + 1]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { return true; }
      if (side2Cnt == 5) { return true; }

      //cm3
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = -2; v <= 2; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1Grid == cm3[v + 2]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2Grid == cm3[v + 2]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { return true; }
      if (side2Cnt == 5) { return true; }
    }

    return false;
  }

  //returns the number of precheckmates that can be obtained by placing stone(id) at (i, j)
  function isCheck(target, i, j, id) {
    if (target[i][j] != 0) return -1; //returns when (i, j) is not empty

    var opID = (id == 1)? 2: 1;
    var cmCnt = 0; //the number of precheckmates

    //pattern of precheckmates
    var cm1 = [0, 0, id, id, id, 0];
    var cm2 = [0, id, 0, id, id, 0];
    var cm3 = [0, id, id, id, id];
    var cm4 = [id, 0, id, id, id];
    var cm5 = [id, id, 0, id, id];

    //direction for horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    //sidegrid: one of the value in one side
    //sideCnt: the number of similarity
    var side1Grid, side2Grid, side1Cnt, side2Cnt;
    for (var d = 0; d < 4; d++){
      //cm1
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = - 1; v <= 4; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1Grid == cm1[v + 1]) side1Cnt++;
        if (side2Grid == cm1[v + 1]) side2Cnt++;
      }
      if (side1Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //cm2
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = -2; v <= 3; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1Grid == cm2[v + 2]) side1Cnt++;
        if (side2Grid == cm2[v + 2]) side2Cnt++;
      }
      if (side1Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 6) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //cm3
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = 0; v <= 4; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1Grid == cm3[v]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2Grid == cm3[v]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 5) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //cm4
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = -1; v <= 3; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1Grid == cm3[v + 1]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2Grid == cm3[v + 1]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 5) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //cm5
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = -2; v <= 2; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0) {
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
          if (side1Grid == cm3[v + 2]) side1Cnt++;
        }
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N) {
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];
          if (side2Grid == cm3[v + 2]) side2Cnt++;
        }
      }
      if (side1Cnt == 5) { cmCnt++; }//console.log("check at: " + i + " " + j); }
      if (side2Cnt == 5) { cmCnt++; }//console.log("check at: " + i + " " + j); }

      //add here for more

    }

    return cmCnt;

  }

  //returns the number of checkmates that can be obtained by placing stone(id) at (i, j)
  function isCheckmate(target, i, j, id) {
    if (target[i][j] != 0) return -1; //returns when (i, j) is not empty

    var cmCnt = 0; //the number of checkmates

    //pattern of checkmate
    var cm1 = [0, id, id, id, id, 0];

    //direction for horizontal, vertical, down left, up right
    var xDir = [1, 0, 1, 1];
    var yDir = [0, 1, 1, -1];

    //sideGrid: one of the value in one side
    //sideCnt: the number of similarity
    var side1Grid, side2Grid, side1Cnt, side2Cnt;
    for (var d = 0; d < 4; d++){
      //cm
      side1Grid = side2Grid = -1;
      side1Cnt = side2Cnt = 0;
      for (var v = 0; v <= 5; v++) {
        if (i - yDir[d] * v >= 0 && i - yDir[d] * v < N && j - xDir[d] * v >= 0)
          side1Grid = target[i - yDir[d] * v][j - xDir[d] * v];
        if (i + yDir[d] * v < N && i + yDir[d] * v >= 0 && j + xDir[d] * v < N)
          side2Grid = target[i + yDir[d] * v][j + xDir[d] * v];

        if (side1Grid == cm1[v]) side1Cnt++;
        if (side2Grid == cm1[v]) side2Cnt++;
      }
      if (side1Cnt == 6) { cmCnt++; }//console.log("checkmate at: " + i + " " + j); }
      if (side2Cnt == 6) { cmCnt++; }//console.log("checkmate at: " + i + " " + j); }

      //add here for more cm
    }

    return cmCnt;

  }


  function disp(thisGrid) {
    // for (var i = 0; i < N; i++) {
    //   console.log(i + "\t" + thisGrid[i]);
    // }
    for (var i = 0; i < N; i++) {
      var str = "";
      for (var j = 0; j < N; j++) {
        str += thisGrid[i][j] + "\t";
      }
        console.log(str);
    }
    console.log("\n\n");
  }

}
