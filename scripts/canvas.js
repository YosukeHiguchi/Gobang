var ctx;

var W = 627, H = 627;

//for N = 15
var adjust_px, adjust_grid;

/* coordinate
* (16, 16)      (610, 16)

*    594[19] * 594[19] (offset 33)

* (16, 610)     (610, 610)
*/

function init() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext)
    ctx = canvas.getContext("2d");

    //for N = 15
    if (N == 15) {
      adjust_grid = 2;
      adjust_px = 1 + 33 * adjust_grid;
    }
    if (N == 19) {
      adjust_grid = 0;
      adjust_px = 0;
    }

    updateGrid();

}

function placeStone(x_grid, y_grid) {
  grid[y_grid][x_grid] = id;
  updateGrid();
}

//only for physical input
function placeStoneHover(x_px, y_px) {
  if (!isGameAvailable) return;

  var x_grid = Math.floor(x_px / 33);
  var y_grid = Math.floor(y_px / 33);

  if (grid[y_grid - adjust_grid][x_grid - adjust_grid] == 0) {
    updateGrid();
    drawStone(x_grid, y_grid, id, 1, 0);
  }
}

//draw stone on current canvas
function drawStone(x_grid, y_grid, id, isHover, isGameFinished) {
  if (id == 0) return;

  //coordinate in pixel
  var x_px = 16 + 33 * x_grid;
  var y_px = 16 + 33 * y_grid;

  //1: black 2:white
  var grid;
  if (id == 1)
    grad = ctx.createRadialGradient(x_px - 6, y_px - 6, 0, x_px, y_px, 18);
  else if (id == 2)
    grad = ctx.createRadialGradient(x_px - 6, y_px - 6, 0, x_px, y_px, 80);
  grad.addColorStop(0, "#FFFFFF");
  grad.addColorStop(1, "#000000");

  //showing winner stones
  if (isGameFinished) {
    grad.addColorStop(0, "#FF6347");
  }

  //transparent
  if (isHover) {
    if (id == 1) {
      grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    }
    if (id == 2) {
      grad.addColorStop(0, "rgba(255, 255, 255, 0.7)");
    }
  }

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x_px, y_px, 16, 0, 2 * Math.PI, false);
  ctx.fill();
}
