var empty_entity = new Image();

var tombstone_entity = new Image();
tombstone_entity.src = "assets/squaretombstone_128x128.png"


EntityEnum = 
{
	NONE : "None",
	TOMBSTONE : "Tombstone"
}

function get_entity_image(entity)
{
	if (entity === EntityEnum.TOMBSTONE)
	{
		return tombstone_entity;
	}
	else
	{
		return empty_entity;
	}
}

