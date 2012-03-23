var canvas = document.getElementById("gamecanvas");
var context = canvas.getContext("2d");

var testworld = new world(3, 6);

context.fillStyle="#000000";

$(document).ready(function(){

init();

});

function init()
{
	setInterval(draw, 10);
}

function draw()
{
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	testworld.draw(world_x, world_y);
}

