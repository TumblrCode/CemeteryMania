
function world(length, width)
{
	this.length = length;
	this.width = width;

	this.zoom_scale = 1;

	this.camera_x = 0;
	this.camera_y = 0;

	
	this.draw = function(canvas)
	{
		this.drawTiles(canvas);
		this.drawEntities(canvas);
	}

	this.drawTiles = function(canvas)
	{
		//Figure out where the canvas midpoint is
		var canvas_midpoint_x = canvas.width/2;
		var canvas_midpoint_y = canvas.height/2;

		var world_midpoint_x = (length*tile_width*this.zoom_scale)/2.0;
		var world_midpoint_y = (width*tile_height*this.zoom_scale)/2.0;

		var composite_offset_x = canvas_midpoint_x - world_midpoint_x + this.camera_x;
		var composite_offset_y = canvas_midpoint_y - world_midpoint_y + this.camera_y;
		//var composite_offset_y = 0;

		var context = canvas.getContext("2d");
	
		for (var m_x = 0; m_x < length; m_x = m_x + 1)
		{
			for (var m_y = 0; m_y < width; m_y = m_y + 1)
			{			
				var render_x = ((tile_width/2)*m_x) + ((tile_width/2)*m_y);
				var render_y = ((tile_height/2)*m_x) - ((tile_height/2)*m_y);

				var tile_image = resources[this.map[m_x][m_y]];

				context.drawImage(tile_image, composite_offset_x+(render_x*this.zoom_scale), composite_offset_y+(render_y*this.zoom_scale), (tile_width*this.zoom_scale), (tile_height*this.zoom_scale));

				//Print debug coordinate label over tiles
				if (Debug)
				{
					//context.fillStyle = "#ffffff";
					//context.fillText("("+m_x+","+m_y+")", ((x + render_x + tile_width/2) - 10)*this.zoom_scale, (y + render_y + tile_height/2)*this.zoom_scale);
				}
			}
		}	
	}

	this.drawEntities = function(canvas)
	{	
			var entity_image = resources["TOMBSTONE"];
	
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

