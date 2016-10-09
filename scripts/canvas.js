var ctx;

var W = 627, H = 627;

/* coordinate
* (16, 16)      (610, 16)
*        594[19] * 594[19] (offset 33)
* (16, 610)     (610, 610)
*/

function init() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");

    main();
  }
}

function placeStone(x_grid, y_grid, id) {
  
  drawStone(x_grid, y_grid, id);
}

function placeStoneHover(x_px, y_px, id) {
  ctx.clearRect(0, 0, W, H);
  drawStone(Math.floor(x_px / 33), Math.floor(y_px / 33), id);
}

function drawStone(x_grid, y_grid, id) {
  //coordinate in pixel
  var x_px = 16 + 33 * x_grid;
  var y_px = 16 + 33 * y_grid;

  //1: black 2:white
  if (id == 1) {
    var grad = ctx.createRadialGradient(x_px - 6, y_px - 6, 0, x_px, y_px, 18);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(1, "#000000");
  }
  else if (id == 2) {
    var grad = ctx.createRadialGradient(x_px - 6, y_px - 6, 0, x_px, y_px, 80);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(1, "#000000");
  }

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x_px, y_px, 16, 0, 2 * Math.PI, false);
  ctx.fill();
}
