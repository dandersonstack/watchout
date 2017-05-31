class WatchOutGame {
  constructor() {
    this.createEnemiesArray(15);
    this.drawEnemies();
    this.drawPlayer();
    setTimeout(()=>{ this.play(); }, 1000);
    this.checkCollisions();
    this.collision = 0;
    this.highScore = 0;
    this.currentScore = 0;
    setTimeout(()=>{ this.scoreTicker(); }, 1000);
  }
  
  collide() {
    var asteroids = d3.selectAll('circle');
    var player = d3.selectAll('rect');
    let collision = false;
    asteroids.each(function(enemy) {
      let radiusSum = parseFloat(player[0][0].attributes.width.value / 2) + parseInt(this.attributes.r.value);
      let xDiff = parseFloat(watchOutGame.players[0].x) - parseInt(this.attributes.cx.value);
      let yDiff = parseFloat(watchOutGame.players[0].y) - parseInt(this.attributes.cy.value);
      let separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      if (separation < radiusSum) {
        collision = true;
      }
    });
    if (collision) {
      if (watchOutGame.currentScore > 5) {
        this.collision++;
        d3.select('.collisions').text('Collisions: ' + watchOutGame.collision);
      }
      watchOutGame.currentScore = 0;
    }
    return true;
  }
  
  createEnemiesArray(number) {
    this.enemiesArray = [];     
    for (let i = 0; i <= number; i++) {
      this.enemiesArray.push(new Asteroid());
    }  
  }
  
  
  scoreTicker() {
    setInterval(function() {
      d3.select('.current').text('Current score ' + watchOutGame.currentScore);
      if (watchOutGame.currentScore > watchOutGame.highScore) {
        watchOutGame.highScore = watchOutGame.currentScore;
      }
      d3.select('.highscore').text('High score ' + watchOutGame.highScore);
      watchOutGame.currentScore++;
    }, 100);
  }
  
  checkCollisions() {
    setInterval(function() { watchOutGame.collide(); }, 20);
  }
  
  play() {
    watchOutGame.collide();
    d3.selectAll('circle')
      .transition()
        .duration(950)
        .attr('cx', function(d) { return d.getXCoord(); } )
        .attr('cy', function(d) { return d.getYCoord(); } );
    watchOutGame.collide();
    setTimeout(()=>{ this.play(); }, 1500);  
  }
  
  drawPlayer() {
    var drag = d3.behavior.drag()
      .on('drag', function(d) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        watchOutGame.players[0].x = d.x;
        watchOutGame.players[0].y = d.y;
        d3.select(this).attr('transform', function(d) {
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
    this.x = 0;
    this.y = 0;
  } 
}

let watchOutGame = new WatchOutGame();