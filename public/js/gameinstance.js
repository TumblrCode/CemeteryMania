function gameinstance()
{
	this.hud = new hud();
	this.world = new world(4,4);
	
	this.draw = function()
	{
		context.fillStyle = "#000000";
		//context.fillStyle = "#0c500c"; //make the bg green

		context.fillRect(0, 0, canvas.width, canvas.height);
		this.world.draw(canvas);
		this.hud.draw();
	}
}