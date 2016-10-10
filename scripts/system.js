function isGameOver(x, y) {

  console.log(isEq(y, x, y-2, x));

  if ((isEq(y, x, y-1, x) && isEq(y, x, y-2, x) && isEq(y, x, y+1, x) && isEq(y, x, y+2, x)) ||
      (isEq(y, x, y, x-1) && isEq(y, x, y, x-2) && isEq(y, x, y, x+1) && isEq(y, x, y, x+2)) ||
      (isEq(y, x, y-1, x-1) && isEq(y, x, y-2, x-2) && isEq(y, x, y+1, x+1) && isEq(y, x, y+2, x+2)) ||
      (isEq(y, x, y-1, x+1) && isEq(y, x, y-2, x+2) && isEq(y, x, y+1, x-1) && isEq(y, x, y+2, x-2))) {
        (grid[y][x] == 1)? alert("black won"): alert("white won");
        return true;
  }
  return false;

  function isEq(y, x, a, b) {
    if (a < 0 || b < 0 || a > 18 || b > 18) return false;
    return (grid[y][x] == grid[a][b]) && grid[y][x] != 0;
  }

}
