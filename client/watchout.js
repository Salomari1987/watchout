// start slingin' some d3 here.
var svgContainer = d3.select("body")
					.append("svg")
					.attr("width", 500)
					.attr("height", 500)
					.attr('align', 'center')
					.style('border', '10px solid')
					.style('background-color','orange');


var minX = 10;
var maxX= 490;
var minY = 10;
var maxY= 490;

var player = svgContainer.append('circle')
						.attr('cx', 200)
						.attr('cy', 200)
						.attr('r', 10)
						.attr('fill', 'white')
						.attr('id', 'player')
						.call(d3.behavior.drag()  
             					.on('dragstart', function() { player.style('fill', 'red'); })
             					.on('drag', function() {
             					 player.attr('cx', d3.event.x).attr('cy', d3.event.y); 
             					if (eval(player.attr('cx'))> maxX) {
									player.attr('cx', maxX)
								}
								if (eval(player.attr('cx'))< minX) {
									player.attr('cx', minX)
								}
								if (eval(player.attr('cy'))> maxY) {
									player.attr('cy', maxY)
								}
								if (eval(player.attr('cy'))< minY) {
									player.attr('cy', minY)
								}})

             					.on('dragend', function() { player.style('fill', 'white');}))


var makeEnemy = function(id){
	return {
		id:id,
		x:Math.random()*500,
		y:Math.random()*500
	}
};

var enemies = [];

for (var i=0; i<20; i++){
	enemies.push(makeEnemy(i));
}


var enemy = svgContainer.selectAll('svg').data(enemies, function(d){return d.id});
enemy.enter().append('circle').attr('cx', function(d){return d.x}).attr('cy', function(d){return d.y}).attr('r', 10)

function callback(){
	enemy.transition()
	.duration(1500)
	.attr('cx', function(){return Math.random()*500})
	.attr('cy', function(){return Math.random()*500});
}

function incScore() {

var inc=eval(d3.selectAll('.current').selectAll('span').text())	+ 1;
d3.selectAll('.current').selectAll('span').text(inc.toString())
}
setInterval(callback, 1000);
setInterval(incScore, 1000);