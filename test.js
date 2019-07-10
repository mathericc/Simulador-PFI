var ball = new Unphysical(0,200,50,50);
var ball2 = new Physical(0,250,50,50);
void setup ()
{
  size(1280,720);
  background(100, 100, 100);
}

 ball2.acceleration = new PVector(1,0);


void draw ()
{
  background(100, 100, 100);
  fill(0);


  ball2.update();
  
  ellipse(ball2.position.x, ball2.position.y, ball2.w, ball2.h);
  if (ball2.position.x > 1280)
  {
    ball2.position.x = 0;
  }
}
