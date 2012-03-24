var world_x = -1 * tile_width;
var world_y = -1 * tile_height;

// Used to lock map-to-mouse offset when dragging
var mouse_offset_x = 0;
var mouse_offset_y = 0;

// Used to keep track of the position of the mouse relative to the world position
var mouse_world_x = 0;
var mouse_world_y = 0;

// The position of the mouse relative to the canvas origin
var mouse_canvas_x = 0;
var mouse_canvas_y = 0;

// The position of the mouse relative to the tile it's in
// note that this isn't referring to the isometric tiles, but to the
// "normal" grid that's used to determine the highlighted tile
var mouse_y_in_tile = 0;
var mouse_x_in_tile = 0;

// The current tile under the mouse; this IS referring
// to the tiles on the isometric grid
var highlighted_tile_x = 0;
var highlighted_tile_y = 0;

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

function setMouseWorldPosition(x, y)
{
	mouse_world_x = x - world_x;
	mouse_world_y = y - world_y;
	mouse_canvas_x = x;
	mouse_canvas_y = y;
}

function dragMap(x, y)
{
	world_x = x + mouse_offset_x;
	world_y = y + mouse_offset_y;
}

function endDragMap(x, y)
{
	ShowGrid = true;
}

function HighlightedTile(x, y)
{
	// Get the nearest tile aligned to a squashed cartesian grid
	highlighted_tile_x = ( mouse_world_x - (mouse_world_x % tile_width ) ) / tile_width;
	highlighted_tile_y = ( ( mouse_world_y - (mouse_world_y % tile_height ) ) / tile_height );

	// Get the position of the mouse on that tile
	mouse_x_in_tile = mouse_world_x - (highlighted_tile_x * tile_width);
	mouse_y_in_tile = mouse_world_y - (highlighted_tile_y * tile_height);
	
	// Use that position to get the color under the mouse on the tile mask (RGBA format)
	colors = maskcontext.getImageData(mouse_x_in_tile, mouse_y_in_tile, 1, 1).data;

	// Then do a metric assload of color part checking with that to determine the actual tile

	// Top Left: Red
	// Top Right: Green
	// Bottom Left: Blue
	// Bottom Right: Yellow
	// Center: Black

	if (colors[0] === 0 && colors[1] === 0 && colors[2] === 0)
	{
		// Center
		highlighted_tile_y *= 2;
	}
	else if ( colors[0] === 255 && colors[1] !== 255 )
	{
		// Top left
		highlighted_tile_y *= 2;
		highlighted_tile_y -= 1;

		highlighted_tile_x -= 1;
	}
	else if ( colors[0] !== 255 && colors[2] !== 255 && colors[1] === 255 )
	{
		// Top Right
		highlighted_tile_y *= 2;
		highlighted_tile_y -= 1;
	}
	else if ( colors[0] !== 255 && colors[1] !== 255 && colors[2] === 255 )
	{
		// Bottom Left
		highlighted_tile_y *= 2;
		highlighted_tile_y += 1;

		highlighted_tile_x -= 1;

	}
	else if ( colors[0] === 255 && colors[1] === 255 && colors[2] !== 255 )
	{
		// Bottom Right
		highlighted_tile_y *= 2;
		highlighted_tile_y += 1;
	}
}
