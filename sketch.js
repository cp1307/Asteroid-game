var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var gameover = false;

function setup(){
  createCanvas(windowWidth , windowHeight);
  ship = new Ship();
  for(var i=0; i<10; i++){
    asteroids.push(new Asteroid());

  }

}

function draw(){
  background(0);
  fill(255);
  textSize(40);
  if(!gameover) {
    text( "Score: " + score , 10 , 40);
  }
  if(gameover){
    text("Score: " + score , 400 , 300);
    text("GAME OVER! Refresh to start new game" , 400,height/2);
    textSize(40);
    rect(0,0,canvas.width,canvas.height, black);
    score=0;

  }

  for(var i=0 ; i<asteroids.length;i++){
    if(ship.hits(asteroids[i])){
      console.log("Game over!!");
      gameover=true;
      break;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for(var i=lasers.length - 1; i>=0;i--){
    lasers[i].render();
    lasers[i].update();
    if(lasers[i].offscreen()){
      lasers.splice(i,1);
    } else {
    for(var j=asteroids.length-1; j>=0;j--){
      if(lasers[i].hits(asteroids[j])){
        if(asteroids[j].r > 10){
          score+=10;
          var newAsteroids =  asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
      }
        asteroids.splice(j,1);
        lasers.splice(i,1);
        break;
      }
    }
  }
  }
  // console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

}

function keyPressed(){
  if(key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if(keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  } else if(keyCode == UP_ARROW){
    ship.boosting(true);
  }
}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}
