class CanvasContext
{
	#config;

	constructor(canvasID, canvasWidth, canvasHeight, config)
	{
		this.#config = config;
		var c = document.getElementById(canvasID);
		c.width  = canvasWidth;
		c.height = canvasHeight; 
		this.ctx = c.getContext("2d");
		this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}
	
	#drawLine(movex, movey, x, y)
	{
		this.ctx.beginPath();
		this.ctx.moveTo(movex, movey);
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
	
	drawRectangle(x, y, color)
	{
		this.ctx.lineWidth = 1;
		this.ctx.rect(x, y, this.#config.rectangleWidth, this.#config.rectangleHeight);
		this.ctx.fillStyle = color;
		this.ctx.strokeRect(x, y, this.#config.rectangleWidth, this.#config.rectangleHeight);
		this.ctx.fillRect(x, y, this.#config.rectangleWidth, this.#config.rectangleHeight);
	}
	
	drawText(text, x, y, width, color)
	{
		this.ctx.font = this.#config.fontFamily;     
		this.ctx.textAlign="center"; 
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = color?color:this.#config.fontColor;
		this.ctx.fillText(text, x, y, width);
	}
	
	drawHorizontalLine(x, y, xMove, color)
	{
		this.ctx.strokeStyle = color;
		this.#drawLine(x, y, x+xMove, y);
		this.ctx.strokeStyle = "black";
	}
	
	drawVerticalLine(x, y, yMove, color)
	{
		this.ctx.strokeStyle = color;
		this.#drawLine(x, y, x, y+yMove);
		this.ctx.strokeStyle = "black";
	}
	
	drawRightArrow(x, y, color)
	{
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x-this.#config.arrowHeight, y-this.#config.arrowWidth);
		this.ctx.lineTo(x-this.#config.arrowHeight, y+this.#config.arrowWidth);
		this.ctx.fill();
		this.ctx.fillStyle = "black";
	}
	
	drawLeftArrow(x, y, color)
	{
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x+this.#config.arrowHeight, y-this.#config.arrowWidth);
		this.ctx.lineTo(x+this.#config.arrowHeight, y+this.#config.arrowWidth);
		this.ctx.fill();
		this.ctx.fillStyle = "black";
	}
	
	drawTopArrow(x, y, color)
	{
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x-this.#config.arrowWidth, y+this.#config.arrowHeight);
		this.ctx.lineTo(x+this.#config.arrowWidth, y+this.#config.arrowHeight);
		this.ctx.fill();
		this.ctx.fillStyle = "black";
	}
	
	drawBottomArrow(x, y, color)
	{
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x+this.#config.arrowWidth, y-this.#config.arrowHeight);
		this.ctx.lineTo(x-this.#config.arrowWidth, y-this.#config.arrowHeight);
		this.ctx.fill();
		this.ctx.fillStyle = "black";
	}
}