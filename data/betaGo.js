function betaGo() {
  var N = 19;
  var xy = Array(2);
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (grid[i][j] == 0) {
        xy[0] = j;
        xy[1] = i;
        return xy;
      }
    }
  }
}
