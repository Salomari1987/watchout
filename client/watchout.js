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
             					if (parseFloat(player.attr('cx'))> maxX) {
									player.attr('cx', maxX)
								}
								if (parseFloat(player.attr('cx'))< minX) {
									player.attr('cx', minX)
								}
								if (parseFloat(player.attr('cy'))> maxY) {
									player.attr('cy', maxY)
								}
								if (parseFloat(player.attr('cy'))< minY) {
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
var detect_coll = function(){
	var collide = false;
	for (var i=0; i<enemy[0].length; i++){
			var xPos = parseFloat(d3.select(enemy[0][i]).attr('cx'));
			var yPos = parseFloat(d3.select(enemy[0][i]).attr('cy'));
			var distance_x = Math.abs(xPos-parseFloat(player.attr('cx')));
			var distance_y = Math.abs(yPos-parseFloat(player.attr('cy')));
			var dist = Math.sqrt(Math.pow(distance_x, 2)+Math.pow(distance_y, 2));
			if (dist < 10){
				collide = true
			};
	};
	if (collide){
		var coll = parseFloat(d3.selectAll('.collisions').selectAll('span').text())+1;
		var highScore = parseFloat(d3.selectAll('.highscore').selectAll('span').text());
		var current = parseFloat(d3.selectAll('.current').selectAll('span').text());

		if (current > highScore){
			d3.selectAll('.highscore').selectAll('span').text(current.toString());
		}
		d3.selectAll('.collisions').selectAll('span').text(coll.toString());
		d3.selectAll('.current').selectAll('span').text('0');
	};
}
 
function move_Enemy(){
	enemy
	.transition()
	.duration(1500)
	.attr('cx', function(){return Math.random()*500})
	.attr('cy', function(){return Math.random()*500})
};

function incScore() {
	var inc=parseFloat(d3.selectAll('.current').selectAll('span').text())	+ 1;
	d3.selectAll('.current').selectAll('span').text(inc.toString())
};

d3.timer(detect_coll)
setInterval(move_Enemy, 1000);
d3.timer(incScore);