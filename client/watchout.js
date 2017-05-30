class WatchOutGame {
  constructor() {
    this.createEnemiesArray(10);
    this.drawEnemies();
    setTimeout(()=>{this.play()}, 1000);
    //initialize the score & high score stuff
    //draw the enemies
    //draw the starter person

  }
  
  // drawBoard() {
  //   //var scoreBoardHeight = d3.select('.scoreboard').node().getBoundingClientRect().height;
  //   var board = d3.selectAll('.board')
  //     //.style('height', window.innerHeight)
  //     //.style('border-style', 'solid')
  //     //.style("stroke", "black")
  //     .attr('style', 'outline: thin solid black');
  // }
  
  createEnemiesArray(number) {
    this.enemiesArray = [];     
    for (let i = 0; i <= number; i++) {
      this.enemiesArray.push(new Asteroid());
    }  
  }
  
  play() {
    d3.selectAll('circle')
      .transition()
        .duration(950)
        .attr('cx', function(d) { return d.getXCoord(); } )
        .attr('cy', function(d) { return d.getYCoord(); } )
    setTimeout(()=>{this.play()}, 1500);
    
  }
  
  

  drawEnemies() {
    var boardHeight = d3.select('.board').node().getBoundingClientRect().top;
    
    var boardWidth = d3.select('.board').node().getBoundingClientRect().width;
    var scoreBoardHeight = d3.select('.scoreboard').node().getBoundingClientRect().height;
    var body = d3.select('body')
      .selectAll('.board')
      
      .append('svg')
        .attr('width', window.innerWidth)
        .attr('height', window.innerHeight - scoreBoardHeight - 20)
        .attr('class', 'svg');
    
    body.selectAll('circle')
      .data(this.enemiesArray).enter()
      .append('circle')
        .attr('cx', function(d) { return d.getXCoord(); } )
        .attr('cy', function(d) { return d.getYCoord(); } )
        .attr('r', 25)

        .attr('fill', 'purple');
      
      
    
  }
  
  resetEnemyPositions() {
  }
  
}

class Asteroid {
  constructor() {
    this.className = 'asteroid';
  }
  // generateNewCoords() {
  //   this.xCoord = WatchOutGame.prototype.randomXCoordinateGenerator();
  //   this.yCoord = WatchOutGame.prototype.randomYCoordinateGenerator();
  // }
  
  //create a getXCoord method
  getXCoord() {
    let svgWidth = d3.select('.svg').node().getBoundingClientRect().width;
    let coordinate = Math.floor(Math.random() * ((svgWidth - 30) - 30)) + 30;
    //Math.floor(Math.random() * ((svgWidth - 50) - 30)) + 30;
    return coordinate;
  }
  
  getYCoord() {
    let svgHeight = d3.select('.svg').node().getBoundingClientRect().height;
    let coordinate = Math.floor(Math.random() * ((svgHeight - 30) - 30)) + 30;
    return coordinate;
  }
  
  //create a getYCoord method

}

let watchOutGame = new WatchOutGame();