function hud()
{
	// The current and only dialog, because more than one popup at once is an
	// open invitation for the user to kick me in the dick
	// and for me to invite that kick with spread legs because I would deserve it
	this.dialog = null;

	// Public properties for modifying the style of the dialog
	this.dialogProperties = {
		width: 300,
		height: 150,
		background: "#ffffff",
		borderColor: "#000000",
		titleColor: "#069",
		borderWidth: 4,
		borderRadius: 10
	};

	this.clearDialog = function()
	{
		this.dialog = null;
	}

	this.newDialog = function(titleText, bodyText)
	{
		this.dialog = { 
			title : titleText,
			body: bodyText,
			buttons: new Array(),
			addButton : function(text, callback)
			{
				// ahaha, pushing, buttons, button pushing
				this.buttons.push({
					text: text,
					callback: callback
				});	
			}
		};
	}


	this.draw = function()
	{
		if (this.dialog !== null)
		{
			x = canvas_width / 2 - this.dialogProperties.width / 2;
			y = canvas_height / 2 - this.dialogProperties.height / 2;

			this.roundFilledRect(context, x, y, this.dialogProperties.width, this.dialogProperties.height, this.dialogProperties.borderRadius, false, this.dialogProperties.background,  this.dialogProperties.borderColor, this.dialogProperties.borderWidth);

			this.roundFilledRect(context, x + this.dialogProperties.borderWidth / 2, y + this.dialogProperties.borderWidth / 2, this.dialogProperties.width - this.dialogProperties.borderWidth, 30, this.dialogProperties.borderRadius / 2, true, this.dialogProperties.titleColor);

			context.font = "16pt Calibri";
			context.textBaseline = "top";
			context.fillStyle = this.dialogProperties.background;
			context.fillText(this.dialog.title, x + this.dialogProperties.borderWidth + 3, y + this.dialogProperties.borderWidth + 3);

			// Revert these properties to default to prevent corrupting other text in this
			// bastard of a state machine
			context.font = "10px sans-serif";
			context.textBaseline = "alphabetic";			
		}	

		if (Debug)
		{
			context.fillStyle = "#ffffff";
			context.fillText("World: (" + mouse_world_x + ", " + mouse_world_y + ")", 2, 10);
			context.fillText("Canvas: (" + mouse_canvas_x + ", " + mouse_canvas_y + ")", 2, 20);
		}
	}

	// General round rectangle method, since the canvas API lacks one for STUPID REASONS
	this.roundFilledRect = function(c, x, y, width, height, radius, topOnly, backgroundColor, strokeColor, strokeWidth)
	{

		if (typeof backgroundColor === "undefined")
			backgroundColor = "#FFFFFF";

		if (typeof radius === "undefined")
			radius = 4;
		
		c.fillStyle = backgroundColor;
		c.beginPath();
 		c.moveTo(x + radius, y);
		c.lineTo(x + width - radius, y);
		c.quadraticCurveTo(x + width, y, x + width, y + radius);
		

		if (!topOnly)
		{
			// only rounds the top two corners
			c.lineTo(x + width, y + height - radius);
			c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			c.lineTo(x + radius, y + height);
			c.quadraticCurveTo(x, y + height, x, y + height - radius);
			c.lineTo(x, y + radius);
		}
		else
		{
			c.lineTo(x + width, y + height);
			c.lineTo(x, y + height);
			c.lineTo(x, y + radius);
		}

		c.quadraticCurveTo(x, y, x + radius, y);
		c.closePath();

		c.fill();

		if (typeof strokeColor !== "undefined")
		{
			if (typeof strokeWidth !== "undefined")
				c.lineWidth = strokeWidth;

			c.strokeStyle = strokeColor;
			c.stroke();
		}
	}
}

