var id = 1; //1: black 2:white
var cursorX = -1, cursorY = -1;

//update boards when cursor moves
document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("wrapper");
  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  placeStoneHover(cursorX, cursorY, id);
}

document.onclick = function (e) {
  placeStone(Math.floor(cursorX / 33), Math.floor(cursorY / 33), id);

  if (id == 1) id = 2;
  else if (id == 2) id = 1;
}
