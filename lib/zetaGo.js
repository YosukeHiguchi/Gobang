function zetaGo() {
  for (var i = 0; i < 19; i++) {
    for (var j = 0; j < 19; j++) {
      if (grid[i][j] == 0) {
        placeStone(j, i);
        return;
      }
    }
  }
}

// function betaGo() {
//   for (var i = 18; i >= 0; i--) {
//     for (var j = 18; j >= 0; j--) {
//       if (grid[i][j] == 0) {
//         placeStone(j, i);
//         return;
//       }
//     }
//   }
// }
