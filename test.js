 var gravity = new PVector(0, 0.1);
Physical.prototype.drawVectors = function()
{

    stroke(0,255,0);
    strokeWeight(2);
    line(this.position.x, this.position.y, this.position.x + this.velocity.x * 10, this.position.y + this.velocity.y *10);
    fill(0,255,0);
    textSize(30);
    text('v', this.position.x + this.velocity.x * 10 -3 , this.position.y + this.velocity.y *10 -3 );

    stroke(0,0,255);

    line(this.position.x, this.position.y, this.position.x + this.velocity.x * 10, this.position.y);
    fill(0,0,255);

    text('vx', this.position.x + this.velocity.x * 10 -3 , this.position.y -3 );

    stroke(0,0,255);

    line(this.position.x, this.position.y, this.position.x, this.position.y + this.velocity.y *10);
    fill(0,0,255);
    textSize(30);
    text('vy', this.position.x, this.position.y + this.velocity.y *10 -3 );

    stroke(255,0,0);

    line(this.position.x, this.position.y, this.position.x + gravity.x * 500, this.position.y + gravity.y *500);
    fill(255,0,0);

    text('P',  this.position.x + gravity.x * 500 +3 , this.position.y + gravity.y *500 -3);
 
    line(this.position.x, this.position.y, this.position.x + gravity.x * 500, this.position.y - gravity.y *500);
    fill(255,0,0);

    text('N',  this.position.x + gravity.x * 500 +3 , this.position.y - gravity.y *500 -3);
}

var ball = new Unphysical(0,200,50,50);
var ball2 = new Physical(200,250,50,50);
void setup ()
{
  size(1280,720);
  background(100, 100, 100);
}



// var wind = new PVector(0.01, 0);
 var wind = new PVector(0.1, 0);
void draw ()
{
  background(100, 100, 100);
  stroke(0,0,0);

 
  ball2.addForce(wind);

  ball2.update();
 fill(0,255,0);
 rectMode(CORNER);
 rect(0,275,1280,720);
 fill(255,255,255);
  rectMode(CENTER);  
  rect(ball2.position.x, ball2.position.y, ball2.w, ball2.h);
  ball2.drawVectors();
  if (ball2.position.x > 1280)
  {
    ball2.velocity.x *= -1;
  }
   if (ball2.position.y > 720)
  {
    ball2.velocity.y *= -1;
  }
}
