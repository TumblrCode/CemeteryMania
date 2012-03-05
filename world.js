var canvas = document.getElementById("gamecanvas");
var context = canvas.getContext("2d");

var tile_width = 128;
var tile_height = 64;

var blah = TileEnum.GRASS;

function world(width, height)
{
	function draw_world(x, y)
	{
		//render tiles
		for (var m_x = 0; m_x < width; m_x = m_x + 1)
		{
			for (var m_y = 0; m_y < height; m_y = m_y + 1)
			{
				var render_x = ((tile_width/2)*m_x) + ((tile_width/2)*m_y);
				var render_y = ((tile_height/2)*m_x) - ((tile_height/2)*m_y);

				var tile_image = get_tile_image(this.map[m_x][m_y]);
				context.drawImage(tile_image, x+render_x, y+render_y);
			}
		}


		//render tiles
		for (var m_xw = 0; m_xw < width; m_xw = m_xw + 1)
		{
			for (var m_yw = height-1; m_yw >= 0; m_yw = m_yw - 1)
			{
				var render_x_t = ((tile_width/2)*m_xw) + ((tile_width/2)*m_yw);
				var render_y_t = ((tile_height/2)*m_xw) - ((tile_height/2)*m_yw);

				//the entity tiles are 2x the height of the terrain tiles, so we need to act accordingly
				render_y_t = render_y_t - (tile_height);

				var entity_image = get_entity_image(this.entity_map[m_xw][m_yw]);
				context.drawImage(entity_image, x+render_x_t, y+render_y_t);
			}
		}


	}

	this.draw = draw_world;

	this.width = width;
	this.height = height;


	// Populate map
	this.map = new Array(width);
	this.entity_map = new Array(width);

	for (var index = 0; index < width; index++)
	{
		this.map[index] = new Array(height);
		this.entity_map[index] = new Array(height);

		// set to grass
		for(var subindex = 0; subindex < height; subindex++)
		{
			this.map[index][subindex] = TileEnum.GRASS;
			this.entity_map[index][subindex] = EntityEnum.TOMBSTONE;
		}
	}

	this.map[1][1] = TileEnum.WATER;
	this.entity_map[1][1] = EntityEnum.NONE;
}

