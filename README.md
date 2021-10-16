# HTML5 Canvas Flowchart Creator

The purpose of this small API is to help developers generate a HTML5 graph where VERTEXES (nodes) are represented as rectangles/texts and EDGES (connections) are represented as unidirectional arrows.

To use it, simply download *flowchart.min.js* file and include it into your project then use following ES6 classes:

- [FlowchartConfigurer](#FlowchartConfigurer): to configure VERTEX / EDGE standard sizes or font used as VERTEX title
- [FlowchartPositions](#FlowchartPositions): to setup VERTEX topology as a table-like structure where each VERTEX is identified by title 
- [Flowchart](#Flowchart): to draw the graph itself by creating VERTEXES (as rectangles and/or texts) and EDGES on already determined topology

## Example

Example usage:

```js
let configurer = new FlowchartConfigurer();
configurer.setRectangleSizes(150, 50);
configurer.setArrowSizes(5, 10);
configurer.setLineSizes(50, 25);
configurer.setFontInfo("14px sans-serif", "black");

let positions = new FlowchartPositions();
positions.addRow(["","","Project Static File", "STDERR MVC API", "Project Configuration", "Data Sources"]);
positions.addRow(["User Agent","Web Server","Project Bootstrap", "Throwable", "", ""]);
positions.addRow(["","","test text", "STDOUT MVC API", "Project Code", "Other APIs"]);

let drawer = new Flowchart(positions.getAll(), configurer.getAll(), "myCanvas");
drawer.rectangle("User Agent","#f5f5f5");
drawer.lineRightLeft("User Agent", "Web Server", "black");
drawer.rectangle("Web Server","#d5e8d4");
drawer.lineRightLineLeft("Web Server", "Project Static File", "black");
drawer.rectangle("Project Static File","#dae8fc");
drawer.lineTopLineTop("Project Static File", "User Agent", "black");
drawer.lineRightLineLeft("Web Server", "Project Bootstrap", "black");
drawer.rectangle("Project Bootstrap","#dae8fc");
```

To see a complete example, run *test.html* included in API!

## Limitations

To make things simple and aesthetic:

- all VERTEXES are rectangles of same size that only hold a title or simple text boxes
- topology must be two-dimensional and known beforehand
- VERTEXES are arranged in a table-like (matrix) structure
- all EDGES to same row & next/previous column VERTEXES have constant length
- all EDGES to same column & next/previous row VERTEXES have constant length
- all EDGES can only be horizontal and/or vertical

Because topology must be known beforehand, it is required by developers to *plan* the design beforehand using a tool like [DrawIO](https://app.diagrams.net/).

## Reference Guide

### FlowchartConfigurer

Class configures VERTEX and EDGE sizes as well as font info for VERTEX titles via following public methods:

| Method | Arguments | Returns | Description |
| --- | --- | --- | --- |
| setRectangleSizes | int width, int height | void | Sets default size of all rectangle VERTEXes |
| setArrowSizes | int width, int height | void | Sets default size of all EDGE arrow points |
| setLineSizes | int width, int height | void | Sets horizontal (width) or vertical (height) size of all EDGE lines |
| setFontInfo | string family, string color | void | Sets font family and font color info for VERTEX titles |
| getAll | - | json | Gets all values set by methods above |

### FlowchartPositions

Class sets up VERTEX positions in table-like topology (where each VERTEX is identified by its title) via following public methods:

| Method | Arguments | Returns | Description |
| --- | --- | --- | --- |
| addRow | string\[\] elements | void | Adds a line in table where each entry must be a string (VERTEX title or empty string) |
| getAll | - | json | Gets all values set by method above |

All rows added must have same columns number! If opposite happens, an exception is thrown.

### Flowchart

Class draws graph based on configuration and positions already set via following public methods

| Method | Arguments | Description |
| --- | --- | --- |
| constructor | positions, config, canvasID | Sets up graph by json-ed [positions](#FlowchartPositions), [configuration](#FlowchartConfigurer) and id of canvas element to write into |
| rectangle | title, color | Draws a VERTEX as a rectangle by its title |
| text | title, color | Draws a VERTEX as a simple text by its title |
| lineRightLeft | from, to, color, offset=0.5 | Draws line EDGE connecting right side of *from* VERTEX to left side of *to* VERTEX on same row |
| lineLeftRight | from, to, color, offset=0.5 | Draws line EDGE connecting left side of *from* VERTEX to right side of *to* VERTEX on same row |
| lineTopBottom | from, to, color, offset=0.5 | Draws line EDGE connecting top side of *from* VERTEX to bottom side of *to* VERTEX on same column |
| lineBottomTop | from, to, color, offset=0.5 | Draws line EDGE connecting bottom side of *from* VERTEX to top side of *to* VERTEX on same column |
| lineLeftLineLeft | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5 | Draws three line EDGE connecting left side of *from* VERTEX to left side of *to* VERTEX |
| lineLeftLineRight | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5 | Draws three line EDGE connecting left side of *from* VERTEX to right side of *to* VERTEX |
| lineLeftLineTop | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting left side of *from* VERTEX to top side of *to* VERTEX |
| lineLeftLineBottom | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting left side of *from* VERTEX to bottom side of *to* VERTEX |
| lineRightLineLeft | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5 | Draws three line EDGE connecting right side of *from* VERTEX to left side of *to* VERTEX |
| lineRightLineRight | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetX=0.5 | Draws three line EDGE connecting right side of *from* VERTEX to right side of *to* VERTEX |
| lineRightLineTop | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting right side of *from* VERTEX to top side of *to* VERTEX |
| lineRightLineBottom | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting right side of *from* VERTEX to bottom side of *to* VERTEX |
| lineTopLineLeft | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting top side of *from* VERTEX to left side of *to* VERTEX |
| lineTopLineRight | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting top side of *from* VERTEX to right side of *to* VERTEX |
| lineTopLineTop | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5 | Draws three line EDGE connecting top side of *from* VERTEX to top side of *to* VERTEX |
| lineTopLineBottom | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5 | Draws three line EDGE connecting top side of *from* VERTEX to bottom side of *to* VERTEX |
| lineBottomLineLeft | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting bottom side of *from* VERTEX to left side of *to* VERTEX |
| lineBottomLineRight | from, to, color, offsetFrom=0.5, offsetTo=0.5 | Draws two line EDGE connecting bottom side of *from* VERTEX to right side of *to* VERTEX |
| lineBottomLineTop | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5 | Draws three line EDGE connecting bottom side of *from* VERTEX to top side of *to* VERTEX |
| lineBottomLineBottom | from, to, color, offsetFrom=0.5, offsetTo=0.5, offsetY=0.5 | Draws three line EDGE connecting bottom side of *from* VERTEX to bottom side of *to* VERTEX |

Arguments glossary:

| Name | Type | Description |
| --- | --- | --- |
| positions | json | Vertex topology as output of [FlowchartPositions](#FlowchartPositions) *getAll* method |
| config | json | Configuration as output of [FlowchartConfigurer](#FlowchartConfigurer) *getAll* method |
| canvasID | string | Value of ID attribute of &lt;canvas&gt; HTML element to write into |
| title | string | VERTEX title: if rectangle will be placed in body middle, otherwise in middle of pseudo-rectangle |
| color | string | VERTEX HTML color: if rectangle equates to background color, otherwise text color |
| from | string | Title of VERTEX to depart from |
| to | string | Title of VERTEX to arrive to |
| offset | percentage | Offset on implicit axis horizontal/vertical EDGE must follow (0.5 = line is in the middle between the two VERTEX sides) |
| offsetFrom | percentage | Offset polygonal EDGE will depart from (0.5 = departs from middle of source VERTEX side) |
| offsetTo | percentage | Offset polygonal EDGE will arrive to (0.5 = departs from middle of destination VERTEX side) |
| offsetX | percentage | Defines when polygonal EDGE goes up/down based on distance between the two VERTEX sides (0.5 = branches at the middle of distance)  |
| offsetY | percentage | Defines when polygonal EDGE goes left/right based on distance between the two VERTEX sides (0.5 = branches on the middle of distance) |
