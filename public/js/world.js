
function world(length, width)
{
	this.length = length;
	this.width = width;

	this.zoom_scale = 0.5;
	
	this.draw = function(x, y)
	{
		this.drawTiles(x, y);
		this.drawEntities(x, y);
		this.drawHUD(x, y);
	}
	
	this.drawHUD = function(x, y)
	{
		if (Debug)
		{
			context.fillStyle = "#ffffff";
			context.fillText("World: (" + mouse_world_x + ", " + mouse_world_y + ")", 2, 10);
			context.fillText("Canvas: (" + mouse_canvas_x + ", " + mouse_canvas_y + ")", 2, 20);
		}
	}

	this.drawTiles = function(x, y)
	{
		for (var m_x = 0; m_x < length; m_x = m_x + 1)
		{
			for (var m_y = 0; m_y < width; m_y = m_y + 1)
			{
				var render_x = ((tile_width/2)*m_x) + ((tile_width/2)*m_y);
				var render_y = ((tile_height/2)*m_x) - ((tile_height/2)*m_y);

				var tile_image = resources[this.map[m_x][m_y]];

				context.drawImage(tile_image, (x+render_x)*this.zoom_scale, (y+render_y)*this.zoom_scale, (tile_width*this.zoom_scale), (tile_height*this.zoom_scale));

				//if ( m_x === highlighted_tile_x && m_y === highlighted_tile_y )
				//{
				//	context.drawImage(resources["TILEHIGHLIGHT"], x + render_x, y + render_y, 20, 20);
				//}

				//Print debug coordinate label over tiles
				if (Debug)
				{
					context.fillStyle = "#ffffff";
					context.fillText("("+m_x+","+m_y+")", ((x + render_x + tile_width/2) - 10)*this.zoom_scale, (y + render_y + tile_height/2)*this.zoom_scale);
				}
			}
		}	
	}

	this.drawEntities = function(x, y)
	{	
			var entity_image = resources["TOMBSTONE"];
	
			context.drawImage(entity_image, x+60, y+60, (entity_image.width*this.zoom_scale), (entity_image.height*this.zoom_scale));
	}

	// Populate map
	this.map = new Array(length);
	for (var index = 0; index < length; index++)
	{
		this.map[index] = new Array(width);

		// set to grass
		for(var subindex = 0; subindex < width; subindex++)
		{
			this.map[index][subindex] = "GRASS";
		}
	}
}

