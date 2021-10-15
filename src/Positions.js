class Positions
{
	#positions = [];
	
	addRow(elements)
	{
		if (this.#positions.length > 0 && this.#positions[this.#positions.length-1].length != elements.length) {
			throw "Each row must have same columns number";
		}
		this.#positions.push(elements);
	}
	
	getAll()
	{
		if (this.#positions.length == 0) {
			throw "Flowchart: at least one row is mandatory";
		}
		return this.#positions;
	}
}