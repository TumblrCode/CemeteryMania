$("#gamecanvas").keydown(onKeyDown);
$("#gamecanvas").keyup(onKeyUp);
$("#gamecanvas").mousedown(onMouseDown);
$("#gamecanvas").mousemove(onMouseMove);
$("#gamecanvas").mouseup(onMouseUp);

var MouseDown = false;


function onKeyDown(event)
{
	if (event.keyCode == 39)
	{
		panRight();
	}
	else if (event.keyCode == 37)
	{
		panLeft();
	}
	else if (event.keyCode == 38)
	{
		panUp();
	}
	else if (event.keyCode == 40)
	{
		panDown();
	}
}

function onMouseDown(event)
{
	MouseDown = true;
	MouseToWorldOffset(event.clientX, event.clientY);
}

function onMouseMove(event)
{
	if (MouseDown)
	{
		mouseMove(event.clientX, event.clientY);
	}
}

function onMouseUp(event)
{
	MouseDown = false;
}

function onKeyUp(event)
{
	
}
