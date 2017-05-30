class WatchOutGame {
  constructor() {
    this.createEnemiesArray(10);
    this.drawEnemies();
    this.drawPlayer();
    setTimeout(()=>{ this.play(); }, 1000);
    this.highScore = 0;
    setTimeout(()=>{ this.scoreTicker(); }, 1000);
  }
  
  // collide() {
    
        
  //   var asteroids = d3.selectAll('circle');
    
  //   const checkCollision = function(player, collidedCallback) {
  //     asteroids.each(function(enemy) {
  //      // debugger;
  //       let radiusSum = parseFloat(player.attr('width') / 2) + enemy.attr('r');
  //       let xDiff = parseFloat(playr.attr('height') / 2) - enemy.attr('cx');
  //       let yDiff = parseFloat(player.attr('width') / 2) - enemy.attr('cy');

  //       let separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  //       console.log('seperation ', seperation, 'radiusSum ', radiusSum);
  //       return function(player, enemy) { return separation < radiusSum; };
  //     });
  //   };
    
  //   var player = d3.selectAll('rect');
  //   var asteroids = d3.selectAll('circle');
    
  //   if (checkCollision(this.player)) {
  //     console.log('checkCollision is true');
  //   };

    
    
    
    
  //   console.log("It is colliding");
  //   return true;
  // }
  
  createEnemiesArray(number) {
    this.enemiesArray = [];     
    for (let i = 0; i <= number; i++) {
      this.enemiesArray.push(new Asteroid());
    }  
  }
  
  
  scoreTicker() {
    var currentScore = 0;
    setInterval(function() {
      d3.select('.current').text('Current score ' + currentScore);
      if (currentScore > watchOutGame.highScore) {
        watchOutGame.highScore = currentScore;
      }
      d3.select('.highscore').text('High score ' + watchOutGame.highScore);
      currentScore++;
    }, 100);
  }
  
  play() {  
    
    d3.selectAll('circle')
      .transition()
        .duration(950)
        .attr('cx', function(d) { return d.getXCoord(); } )
        .attr('cy', function(d) { return d.getYCoord(); } )
        // .call(()=> { this.collide(); } );
    setTimeout(()=>{ this.play(); }, 1500);
    
  }
  
  drawPlayer() {
    var drag = d3.behavior.drag()
      .on('drag', function(d, i) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).attr('transform', function(d, i) {
          return 'translate(' + [ d.x, d.y ] + ')';
        } );
      } );
    
    this.players = [new Player()];
    d3.select('.svg').selectAll('rect')
      .data(this.players).enter()
      .append('rect')
        .attr('x', function(d) { return d.x; } )
        .attr('y', function(d) { return d.y; } )
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', 'orange')
        .call(drag);
  }

  drawEnemies() {
    // var boardHeight = d3.select('.board').node().getBoundingClientRect().top;
    // var boardWidth = d3.select('.board').node().getBoundingClientRect().width;
    var scoreBoardHeight = d3.select('.scoreboard').node().getBoundingClientRect().height;
    var body = d3.select('body')
      .selectAll('.board')   
      .append('svg')
        .attr('width', window.innerWidth - 20)
        .attr('height', window.innerHeight - scoreBoardHeight - 20)
        .attr('class', 'svg')
        .attr('stroke', 'black')
        .attr('style', 'outline: solid black;');
    body.selectAll('circle')
      .data(this.enemiesArray).enter()
      .append('circle')
        .attr('cx', function(d) { return d.getXCoord(); } )
        .attr('cy', function(d) { return d.getYCoord(); } )
        .attr('r', 25)
        .attr('fill', 'purple');
  }
}

class Asteroid {
  constructor() {
    this.className = 'asteroid';
  }
  getXCoord() {
    let svgWidth = d3.select('.svg').node().getBoundingClientRect().width;
    let coordinate = Math.floor(Math.random() * ((svgWidth - 30) - 30)) + 30;
    return coordinate;
  }
  
  getYCoord() {
    let svgHeight = d3.select('.svg').node().getBoundingClientRect().height;
    let coordinate = Math.floor(Math.random() * ((svgHeight - 30) - 30)) + 30;
    return coordinate;
  }
}

class Player {
  constructor() {
    this.className = 'player';
    this.x = 0
    this.y = 0
    // this.x = d3.select('.svg').node().getBoundingClientRect().width / 2;
    // this.y = d3.select('.svg').node().getBoundingClientRect().height / 2;
  } 
}

let watchOutGame = new WatchOutGame();