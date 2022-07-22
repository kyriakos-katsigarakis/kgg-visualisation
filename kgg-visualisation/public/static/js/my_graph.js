// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
function ForceGraph({
  nodes, // an iterable of node objects (typically [{id}, …])
  links // an iterable of link objects (typically [{source, target}, …])
}, 
{	nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
  	nodeGroup, // given d in nodes, returns an (ordinal) value for color
 	nodeGroups, // an array of ordinal values representing the node groups
  	nodeTitle, // given d in nodes, a title string
  	nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
  	nodeStroke = "#fff", // node stroke color
 	nodeStrokeWidth = 1.5, // node stroke width, in pixels
  	nodeStrokeOpacity = 1, // node stroke opacity
  	nodeRadius = 5, // node radius, in pixels
  	nodeStrength,
  	linkSource = ({source}) => source, // given d in links, returns a node identifier string
  	linkTarget = ({target}) => target, // given d in links, returns a node identifier string
  	linkStroke = "#999", // link stroke color
  	linkStrokeOpacity = 0.6, // link stroke opacity
  	linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
  	linkStrokeLinecap = "round", // link stroke linecap
  	linkStrength,
  	colors = d3.schemeTableau10, // an array of color strings, for the node groups
  	width = 640, // outer width, in pixels
  	height = 400, // outer height, in pixels
  	invalidation // when this promise resolves, stop the simulation
}  = {}) 
{	// Compute values.
	const N = d3.map(nodes, nodeId).map(intern);
  	const LS = d3.map(links, linkSource).map(intern);
  	const LT = d3.map(links, linkTarget).map(intern);
  	if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
  	const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
  	const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
  	const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
  	const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);
	
	// Replace the input nodes and links with mutable objects for the simulation.
 	nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
  	links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));	
	
	
}