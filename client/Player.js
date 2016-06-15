var Player = function(){
	var player = svgContainer.selectAll('circle');

	player.append('svg:circle')
	.attr('cx', 200)
	.attr('cy', 200)
	.attr('r', 15)
	.attr('fill', 'white');
}