function onCheckSize() {
  var check1 = document.menu.size_fifteen.checked;
  var check2 = document.menu.size_nineteen.checked;

  if (check1) {
    N = 15;
    adjust_grid = 2;
    adjust_px = 1 + 33 * adjust_grid;
  }
  if (check2) {
    N = 19;
    adjust_grid = 0;
    adjust_px = 0;
  }

  updateGrid();
}

function gameStart() {
  isGameAvailable = true;
}
