class Flowchart
{
	#elements = {};
	#initialX = 5;
	#initialY = 5;
	#context;
	#config;
	
	constructor(positions, config, canvasID)
	{
		this.#config = config;
		
		// allow top and bottom branching
		let initialY = this.#initialY + config.lineHeight/2;
		
		for (var i=0; i<positions.length; i++) {
			 let y = initialY + i*(config.rectangleHeight+config.lineHeight);
			 for (var j=0; j<positions[i].length; j++) {
			 	if (positions[i][j]!="") {
				 	let x = this.#initialX + j*(config.rectangleWidth+config.lineWidth);
				 	this.#elements[positions[i][j]] = {"x":x, "y":y};
			 	}
			 }
		}
		
		let canvasWidth = this.#initialX*2+(positions[0].length*(config.rectangleWidth+config.lineWidth))-config.lineWidth;
		let canvasHeight = initialY*2+(positions.length*(config.rectangleHeight+config.lineHeight))-config.lineHeight;
		this.#context = new FlowchartCanvas(canvasID, canvasWidth, canvasHeight, config);
	}
	
	#lineHorizontalVerticalHorizontal(from, to, color, offsetFrom, offsetTo, offsetX, isLeftArrow, isLeftDirection)
	{
		let offset1 = (isLeftArrow?this.#config.rectangleWidth:0);
		let diff = this.#elements[from].y + (offsetFrom*this.#config.rectangleHeight)  - this.#elements[to].y - (offsetTo*this.#config.rectangleHeight);
		let intermediateX = 0;
		if (isLeftDirection) {
			intermediateX = this.#elements[from].x-(offsetX*this.#config.lineWidth);
			console.log(intermediateX);
			this.#context.drawHorizontalLine(this.#elements[from].x, this.#elements[from].y+this.#config.rectangleHeight*offsetFrom, -(offsetX*this.#config.lineWidth), color);
		} else {
			intermediateX = this.#elements[from].x+this.#config.rectangleWidth+(offsetX*this.#config.lineWidth);
			this.#context.drawHorizontalLine(this.#elements[from].x+this.#config.rectangleWidth, this.#elements[from].y+this.#config.rectangleHeight*offsetFrom, (offsetX*this.#config.lineWidth), color);
		}
		this.#context.drawVerticalLine(intermediateX, this.#elements[to].y+this.#config.rectangleHeight*offsetTo, diff, color);
		this.#context.drawHorizontalLine(intermediateX, this.#elements[to].y+this.#config.rectangleHeight*offsetTo, this.#elements[to].x+offset1-intermediateX, color);
		if (isLeftArrow) {
			this.#context.drawLeftArrow(this.#elements[to].x+offset1, this.#elements[to].y+this.#config.rectangleHeight*offsetTo, color);
		} else {		
			this.#context.drawRightArrow(this.#elements[to].x, this.#elements[to].y+this.#config.rectangleHeight*offsetTo, color);
		}	
	}
	
	#lineVerticalHorizontalVertical(from, to, color, offsetFrom, offsetTo, offsetY, isTopArrow, isTopDirection)
	{
		let sourceX = this.#elements[from].x+offsetFrom*this.#config.rectangleWidth;
		let sourceY = this.#elements[from].y+(isTopDirection?0:this.#config.rectangleHeight);
		let destinationX = this.#elements[to].x+offsetTo*this.#config.rectangleWidth;
		let destinationY = this.#elements[to].y+(!isTopArrow?0:this.#config.rectangleHeight);
		this.#context.drawVerticalLine(sourceX, sourceY, -offsetY, color);
		this.#context.drawHorizontalLine(sourceX, sourceY-offsetY, destinationX-sourceX, color);
		this.#context.drawVerticalLine(destinationX, destinationY, (sourceY-offsetY)-destinationY, color);
		if (isTopArrow) {
			this.#context.drawTopArrow(destinationX, destinationY, color);
		} else {
			this.#context.drawBottomArrow(destinationX, destinationY, color);
		}
	}
	
	#lineHorizontalVertical(from, to, color, offsetFrom, offsetTo, isTopArrow, isLeftDirection)
	{
		let offset1 = (isTopArrow?this.#config.rectangleHeight:0);
		let offset2 = (isLeftDirection?0:this.#config.rectangleWidth);
		let ydiff = this.#elements[from].y + (offsetFrom*this.#config.rectangleHeight)  - this.#elements[to].y - offset1;
		let xdiff = this.#elements[to].x - this.#elements[from].x + offsetTo*this.#config.rectangleWidth - offset2;
		this.#context.drawHorizontalLine(this.#elements[from].x + offset2, this.#elements[from].y+this.#config.rectangleHeight*offsetFrom, xdiff, color);
		this.#context.drawVerticalLine(this.#elements[to].x + offsetTo*this.#config.rectangleWidth, this.#elements[to].y+offset1, ydiff, color);			
		if (isTopArrow) {
			this.#context.drawTopArrow(this.#elements[to].x+offsetTo*this.#config.rectangleWidth, this.#elements[to].y+offset1, color);		
		} else {					
			this.#context.drawBottomArrow(this.#elements[to].x+offsetTo*this.#config.rectangleWidth, this.#elements[to].y, color);		
		}	
	}
	
	#lineVerticalHorizontal(from, to, color, offsetFrom, offsetTo, isLeftArrow, isTopDirection)
	{
		let ydiff = this.#elements[to].y-this.#elements[from].y + offsetTo*this.#config.rectangleHeight-(isTopDirection?0:this.#config.rectangleHeight);
		let xdiff = this.#elements[to].x - this.#elements[from].x - offsetFrom*this.#config.rectangleWidth + (isLeftArrow?this.#config.rectangleWidth:0);
		var offset1 = (isLeftArrow?this.#config.rectangleWidth:0);
		let offset2 = this.#elements[from].x+(offsetFrom*this.#config.rectangleWidth);
		this.#context.drawVerticalLine(offset2, this.#elements[from].y+(isTopDirection?0:this.#config.rectangleHeight), ydiff, color);			
		this.#context.drawHorizontalLine(offset2, this.#elements[from].y+ydiff+(isTopDirection?0:this.#config.rectangleHeight), xdiff, color);
		if (isLeftArrow) {
			this.#context.drawLeftArrow(this.#elements[to].x + (isLeftArrow?this.#config.rectangleWidth:0), this.#elements[to].y+this.#config.rectangleHeight*offsetTo, color);
		} else {		
			this.#context.drawRightArrow(this.#elements[to].x+offset1, this.#elements[to].y+this.#config.rectangleHeight*offsetTo, color);
		}			
	}
	
	rectangle(title, color)
	{
		this.#context.drawRectangle(this.#elements[title].x, this.#elements[title].y, color);		
		this.#context.drawText(title, this.#elements[title].x+(this.#config.rectangleWidth/2), this.#elements[title].y+(this.#config.rectangleHeight/2), this.#config.rectangleWidth);
	}
	
	text(title, color, offset=0.5)
	{
		this.#context.drawText(title, this.#elements[title].x+(this.#config.rectangleWidth/2), this.#elements[title].y+(this.#config.rectangleHeight*offset), this.#config.rectangleWidth, color);
	}
	
	lineRightLeft(from, to, color, offset=0.5)
	{
		let diff = this.#elements[to].x - this.#elements[from].x - this.#config.rectangleWidth;
		this.#context.drawHorizontalLine(this.#elements[from].x+this.#config.rectangleWidth, this.#elements[from].y+this.#config.rectangleHeight*offset, diff, color);
		this.#context.drawRightArrow(this.#elements[to].x, this.#elements[to].y+this.#config.rectangleHeight*offset, color);
	}
	
	lineLeftRight(from, to, color, offset=0.5)
	{
		let diff = this.#elements[from].x - this.#elements[to].x - this.#config.rectangleWidth;
		this.#context.drawHorizontalLine(this.#elements[to].x+this.#config.rectangleWidth, this.#elements[to].y+this.#config.rectangleHeight*offset, diff, color);
		this.#context.drawLeftArrow(this.#elements[to].x+this.#config.rectangleWidth, this.#elements[to].y+this.#config.rectangleHeight*offset, color);
	}
	
	lineTopBottom(from, to, color, offset=0.5)
	{
		let diff = this.#elements[from].y - this.#elements[to].y - this.#config.rectangleHeight;
		this.#context.drawVerticalLine(this.#elements[from].x+this.#config.rectangleWidth*offset, this.#elements[from].y, -diff, color);
		this.#context.drawTopArrow(this.#elements[to].x+this.#config.rectangleWidth*offset, this.#elements[to].y+this.#config.rectangleHeight, color);
	}
	
	lineBottomTop(from, to, color, offset=0.5)
	{
		let diff = this.#elements[to].y - this.#elements[from].y - this.#config.rectangleHeight;
		this.#context.drawVerticalLine(this.#elements[to].x+this.#config.rectangleWidth*offset, this.#elements[to].y, -diff, color);
		this.#context.drawBottomArrow(this.#elements[to].x+this.#config.rectangleWidth*offset, this.#elements[to].y, color);
	}
	
	lineLeftLineLeft(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5)
	{
		this.#lineHorizontalVerticalHorizontal(from, to, color, offsetFrom, offsetTo, offsetX, false, true);
	}
	
	lineLeftLineRight(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5)
	{
		this.#lineHorizontalVerticalHorizontal(from, to, color, offsetFrom, offsetTo, offsetX, true, true);		
	}
	
	lineLeftLineTop(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineHorizontalVertical(from, to, color, offsetFrom, offsetTo, false, true);
	}
	
	lineLeftLineBottom(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineHorizontalVertical(from, to, color, offsetFrom, offsetTo, true, true);		
	}
	
	lineRightLineLeft(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5)
	{
		this.#lineHorizontalVerticalHorizontal(from, to, color, offsetTo, offsetFrom, offsetX, false, false);
	}
	
	lineRightLineRight(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5)
	{
		this.#lineHorizontalVerticalHorizontal(from, to, color, offsetFrom, offsetTo, offsetX, true, false);		
	}
	
	lineRightLineTop(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineHorizontalVertical(from, to, color, offsetFrom, offsetTo, false, false);
	}
	
	lineRightLineBottom(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineHorizontalVertical(from, to, color, offsetFrom, offsetTo, true, false);		
	}
	
	lineTopLineLeft(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineVerticalHorizontal(from, to, color, offsetFrom, offsetTo, false, true)
	}
	
	lineTopLineRight(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineVerticalHorizontal(from, to, color, offsetFrom, offsetTo, true, true)	
	}
	
	lineTopLineTop(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5)
	{
		let finalOffset = (this.#elements[to].y>=this.#elements[from].y?this.#config.lineHeight*offsetY:(this.#elements[from].y-this.#elements[to].y+this.#config.lineHeight*offsetY));
		this.#lineVerticalHorizontalVertical(from, to, color, offsetFrom, offsetTo, finalOffset, false, true)	
	}
	
	lineTopLineBottom(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5)
	{
		let finalOffset = (this.#elements[to].y<=this.#elements[from].y?this.#config.lineHeight*offsetY:(this.#elements[from].y-this.#elements[to].y+this.#config.rectangleHeight+this.#config.lineHeight*offsetY));
		this.#lineVerticalHorizontalVertical(from, to, color, offsetFrom, offsetTo, finalOffset, true, true)	
	}
	
	lineBottomLineLeft(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineVerticalHorizontal(from, to, color, offsetFrom, offsetTo, false, false)
	}
	
	lineBottomLineRight(from, to, color, offsetFrom=0.5, offsetTo=0.5)
	{
		this.#lineVerticalHorizontal(from, to, color, offsetFrom, offsetTo, true, false)	
	}
	
	lineBottomLineTop(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5)
	{
		let finalOffset = -(this.#elements[to].y>=this.#elements[from].y?this.#config.lineHeight*offsetY:(this.#elements[from].y-this.#elements[to].y+this.#config.lineHeight*offsetY));
		this.#lineVerticalHorizontalVertical(from, to, color, offsetFrom, offsetTo, finalOffset, false, false)	
	}
	
	lineBottomLineBottom(from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5)
	{
		let finalOffset = -(this.#elements[to].y>=this.#elements[from].y?this.#config.lineHeight*offsetY + (this.#elements[to].y-this.#elements[from].y):this.#config.lineHeight*offsetY);
		this.#lineVerticalHorizontalVertical(from, to, color, offsetFrom, offsetTo, finalOffset, true, false)	
	}
	
	getDriver()
	{
		return this.#context.getDriver();
	}
}