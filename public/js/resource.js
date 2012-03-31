resources =
{
	TILEHIGHLIGHT : "highlight_128x64.png",
	GRASS : "grass_128x64.png",
	WATER : "water_128x64.png",
	TOMBSTONE : "squaretombstone_128x128.png",
	TILEMASK : "tilemask_128x64.png",
	NONE : null
}

for (name in resources) {
	var img = new Image();
	if (resources[name] == null) {
		img.src = null;
	} else {
		img.src = "../assets/" + resources[name];
	}
	resources[name] = img;
}
