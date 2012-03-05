var world_x = 0;
var world_y = 0;
var mouse_offset_x = 0;
var mouse_offset_y = 0;

function panLeft()
{
	world_x = world_x-1;
}

function panRight()
{
	world_x = world_x+1;
}

function panUp()
{
	world_y = world_y-1;
}

function panDown()
{
	world_y = world_y+1;
}

function beginDragMap(x, y)
{
	mouse_offset_x = world_x - x;
	mouse_offset_y = world_y - y;
}

function dragMap(x, y)
{
	world_x = x + mouse_offset_x;
	world_y = y + mouse_offset_y;
}
