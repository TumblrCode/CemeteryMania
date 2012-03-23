var canvas = document.getElementById("gamecanvas");
var context = canvas.getContext("2d");
var maskcanvas = document.getElementById("collisionmask");
var maskcontext = maskcanvas.getContext("2d");

var tile_width = 128;
var tile_height = 64;

var Debug = true;

var blah = "GRASS";

function world(width, height)
{
	this.draw = function(x, y)
	{
		var tileLabel = 0;
		//render tiles
		for (var m_x = 0; m_x < width; m_x = m_x + 1)
		{
			for (var m_y = 0; m_y < height; m_y = m_y + 1)
			{
				var render_x = tile_width * m_x + (m_y % 2 != 0 ? (tile_width / 2) : 0);
				var render_y = (tile_height / 2) * m_y;

				var tile_image = resources[this.map[m_x][m_y]];
				context.drawImage(tile_image, x+render_x, y+render_y);

				if ( m_x === highlighted_tile_x && m_y === highlighted_tile_y )
				{
					context.drawImage(resources["TILEHIGHLIGHT"], x + render_x, y + render_y );
				}

				if (Debug)
				{
					context.fillStyle = "#ffffff";
					context.fillText(tileLabel++, x + render_x + tile_width / 2, y + render_y + tile_height / 2);
				}			
			}
		}


		//render entities
		for (var m_xw = 0; m_xw < width; m_xw = m_xw + 1)
		{
			for (var m_yw = height-1; m_yw >= 0; m_yw = m_yw - 1)
			{
				var render_x_t = ((tile_width/2)*m_xw) + ((tile_width/2)*m_yw);
				var render_y_t = ((tile_height/2)*m_xw) - ((tile_height/2)*m_yw);

				//the entity tiles are 2x the height of the terrain tiles, so we need to act accordingly
				render_y_t = render_y_t - (tile_height);

				var entity_image = resources[this.entity_map[m_xw][m_yw]];
				//context.drawImage(entity_image, x+render_x_t, y+render_y_t);
			}
		}
		
		this.drawHUD(x, y);
		this.drawCollisionMask(x, y);
	}
	this.width = width;
	this.height = height;
	
	this.drawHUD = function(x, y)
	{
		if (Debug)
		{
			context.fillStyle = "#ffffff";
			context.fillText("World: (" + mouse_world_x + ", " + mouse_world_y + ")", 2, 10);
			context.fillText("Canvas: (" + mouse_canvas_x + ", " + mouse_canvas_y + ")", 2, 20);
		}
	}

	this.drawCollisionMask = function(x, y)
	{	
		// Draws the tile collision mask on the secondary canvas
		maskcontext.fillStyle = "#000000";
		maskcontext.fillRect(0, 0, canvas.width, canvas.height);
		maskcontext.drawImage(resources["TILEMASK"], 0, 0);
	}

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
			this.map[index][subindex] = "GRASS";
			this.entity_map[index][subindex] = "TOMBSTONE";
		}
	}
}

