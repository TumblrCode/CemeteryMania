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

function beginDragMap(x, y)
{
	mouse_offset_x = instance.world.camera_x - x;
	mouse_offset_y = instance.world.camera_y - y;
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
	instance.world.camera_x = x + mouse_offset_x;
	instance.world.camera_y = y + mouse_offset_y;
}

function endDragMap(x, y)
{
	ShowGrid = true;
}

function HighlightedTile(x, y)
{

}
