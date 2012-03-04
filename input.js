$("#gamecanvas").keydown(onKeyDown);
$("#gamecanvas").keyup(onKeyUp);


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


function onKeyUp(event)
{

}
