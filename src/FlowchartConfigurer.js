class FlowchartConfigurer
{
	#data = {};
	
	setRectangleSizes(width, height)
	{
		this.#data["rectangleWidth"] = width;
		this.#data["rectangleHeight"] = height;
	}
	
	setArrowSizes(width, height)
	{
		this.#data["arrowWidth"] = width;
		this.#data["arrowHeight"] = height;		
	}
	
	setLineSizes(width, height)
	{
		this.#data["lineWidth"] = width;
		this.#data["lineHeight"] = height;		
	}
	
	setFontInfo(family, color)
	{
		this.#data["fontFamily"] = family;
		this.#data["fontColor"] = color;		
	}
	
	getAll()
	{
		if (!this.#data.hasOwnProperty("rectangleWidth") || !this.#data.hasOwnProperty("arrowWidth") || !this.#data.hasOwnProperty("lineWidth") || !this.#data.hasOwnProperty("fontFamily")) {
			throw "Flowchart: using all setters is mandatory";
		}
		return this.#data;
	}
}
