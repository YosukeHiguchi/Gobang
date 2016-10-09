function getWinner() {
  for (var i = 0; i < 19; i++) {
    for (var j = 0; j < 19; j++) {
      if ((isEq(i, j, i-1, j) && isEq(i, j, i-2, j) && isEq(i, j, i+1, j) && isEq(i, j, i+2, j)) ||
          (isEq(i, j, i, j-1) && isEq(i, j, i, j-2) && isEq(i, j, i, j+1) && isEq(i, j, i, j+2)) ||
          (isEq(i, j, i-1, j-1) && isEq(i, j, i-2, j-2) && isEq(i, j, i+1, j+1) && isEq(i, j, i+2, j+2)) ||
          (isEq(i, j, i-1, j+1) && isEq(i, j, i-2, j+2) && isEq(i, j, i+1, j-1) && isEq(i, j, i+2, j-2))) {
            return grid[i][j];
      }
    }
  }
  return 0;

  function isEq(i, j, a, b) {
    if (a < 0 || b < 0 || a > 18 || b > 18) return false;
    return (grid[i][j] == grid[a][b]) && grid[i][j] != 0;
  }

}
