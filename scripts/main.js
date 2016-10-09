var cursorX = -1, cursorY = -1;
var clicked = 0;

function main() {
  var id = 2;
  placeStoneHover(cursorX, cursorY, id);

  if (clicked) {
    placeStone(Math.floor(cursorX / 33), Math.floor(cursorY / 33), id);
    console.log("put at " + Math.floor(cursorX / 33) + " " + Math.floor(cursorY / 33));
    clicked = 0;
  }
}

//update boards when cursor moves
document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("wrapper");
  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;
  main();
}

document.onclick = function (e) {
  clicked = 1;
  main();
}
