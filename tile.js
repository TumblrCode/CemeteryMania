var grass_tile = new Image();
grass_tile.src = "assets/grass_128x64.png"

var water_tile = new Image();
water_tile.src = "assets/water_128x64.png"

TileEnum = 
{
	GRASS : "Grass",
	WATER : "Water"
}

function get_tile_image(tile)
{
	if (tile === TileEnum.GRASS)
	{
		return grass_tile;
	}
	else if (tile === TileEnum.WATER)
	{
		return water_tile;
	}

}
