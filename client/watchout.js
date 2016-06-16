// start slingin' some d3 here.

var width = 600;
var height = 600;
var numEnemies = 50;
var svgContainer = d3.select("body")
					.append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr('align', 'center')
					.style('border', '10px solid')
					.style('background-color','white');

var minX = 10;
var maxX= width-30;
var minY = 10;
var maxY= height-30;


// var dragStart = function(){
// 	player.style('fill', 'red'); 
// };

var drag = function() {
	player.attr('x', d3.event.x).attr('y', d3.event.y); 
		if (parseFloat(player.attr('x'))> maxX) {
			player.attr('x', maxX);
		};
		if (parseFloat(player.attr('x'))< minX) {
			player.attr('x', minX);
		};
		if (parseFloat(player.attr('y'))> maxY) {
			player.attr('y', maxY);
		};
		if (parseFloat(player.attr('y'))< minY) {
			player.attr('y', minY);
		};
};

// var dragEnd = function() { 
// 	player.style('fill', 'orange');
// };

var movePlayer = d3.behavior.drag()  
		// .on('dragstart', dragStart)
		.on('drag', drag)
		// .on('dragend', dragEnd)


var player = svgContainer.append('image')
						.attr('x', width/2)
						.attr('y', height/2)
						.attr('xlink:href','Running.gif')
						.attr('height', 50)
						.attr('width', 50)
						.attr('id', 'player')
						.call(movePlayer)
						
//Make Enemy
var makeEnemy = function(id){
	return {
		id:id,
		x:Math.random()*width,
		y:Math.random()*height
	}
};

var enemies = [];

for (var i=0; i<numEnemies; i++){
	enemies.push(makeEnemy(i));
}

var enemy = svgContainer.selectAll('svg').data(enemies, function(d){return d.id});

enemy.enter().append('image').attr('xlink:href','skull.gif').attr('x', function(d){return d.x}).attr('y', function(d){return d.y}).attr('width', 30).attr('height', 30)
var detect_coll = function(){
	var collide = false;
	for (var i=0; i<enemy[0].length; i++){
			var xPos = parseFloat(d3.select(enemy[0][i]).attr('x'));
			var yPos = parseFloat(d3.select(enemy[0][i]).attr('y'));
			var distance_x = Math.abs(xPos-parseFloat(player.attr('x')));
			var distance_y = Math.abs(yPos-parseFloat(player.attr('y')));
			var dist = Math.sqrt(Math.pow(distance_x, 2)+Math.pow(distance_y, 2));
			if (dist < 30){
				collide = true
			};
		};
	if (collide){
		new Audio('Screaming-SoundBible.com-1597978996.mp3').play();
		d3.select('svg').style('background-color','red');
		setTimeout(function(){d3.select('svg').style('background-color','white')}, 100);

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
	.attr('x', function(){return Math.random()*width})
	.attr('y', function(){return Math.random()*height})
};

function incScore() {
	var inc=parseFloat(d3.selectAll('.current').selectAll('span').text())	+ 1;
	d3.selectAll('.current').selectAll('span').text(inc.toString())
};

d3.timer(detect_coll)
setInterval(move_Enemy, 1000);
d3.timer(incScore);