$("#gamecanvas").keydown(onKeyDown);
$("#gamecanvas").keyup(onKeyUp);
$("#gamecanvas").mousedown(onMouseDown);
$("#gamecanvas").mousemove(onMouseMove);
$("#gamecanvas").mouseup(onMouseUp);

var MouseDown = false;


function onKeyDown(event)
{
	if (event.keyCode === 39)
	{
		panRight();
	}
	else if (event.keyCode === 37)
	{
		panLeft();
	}
	else if (event.keyCode === 38)
	{
		panUp();
	}
	else if (event.keyCode === 40)
	{
		panDown();
	}
}

function onMouseDown(event)
{
	MouseDown = true;
	beginDragMap(event.clientX, event.clientY);
}

function onMouseMove(event)
{
	setMouseWorldPosition(event.clientX, event.clientY);
	if (MouseDown)
	{
		dragMap(event.clientX, event.clientY);
	}
	HighlightedTile(event.clientX, event.clientY);
}

function onMouseUp(event)
{
	MouseDown = false;
	endDragMap(event.clientX, event.clientY);
}

function onKeyUp(event)
{
	
}
