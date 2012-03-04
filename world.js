var canvas = document.getElementById("gamecanvas");
var context = canvas.getContext("2d");

var grass_tile = new Image();
grass_tile.src = "assets/grass_128x64.png"

var tombstone_tile = new Image();
tombstone_tile.src = "assets/squaretombstone_128x128.png"

var tile_width = 128;
var tile_height = 64;

function world(width, height)
{
	function draw_world(x, y)
	{
		for (var m_x = 0; m_x < width; m_x = m_x + 1)
		{
			for (var m_y = 0; m_y < height; m_y = m_y + 1)
			{
				var render_x = ((tile_width/2)*m_x) + ((tile_width/2)*m_y);
				var render_y = ((tile_height/2)*m_x) - ((tile_height/2)*m_y);

				context.drawImage(grass_tile, x+render_x, y+render_y);
			}
		}

		var render_x_t = ((tile_width/2)*2) + ((tile_width/2)*3);
		var render_y_t = ((tile_height/2)*2) - ((tile_height/2)*3);

		context.drawImage(tombstone_tile, x+render_x_t, y+render_y_t);
	}

	this.draw = draw_world;

	this.width = width;
	this.height = height;
}

