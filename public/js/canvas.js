var testworld = new world(16, 48);

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
	//context.fillStyle = "#0c500c"; //make the bg green

	context.fillRect(0, 0, canvas.width, canvas.height);
	testworld.draw(world_x, world_y);
}

