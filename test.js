var ball = new Unphysical(0,200,50,50);
var ball2 = new Physical(0,250,50,50);
void setup ()
{
  size(1280,720);
  background(100, 100, 100);
}

 ball2.acceleration = new PVector(1,0);

 var wind = new PVector(0.01, 0);
 var gravity = new PVector(0, 0.1);

void draw ()
{
  background(100, 100, 100);
  fill(0);

  ball2.addForce(gravity);

  ball2.update();

  ellipse(ball2.position.x, ball2.position.y, ball2.w, ball2.h);
  if (ball2.position.x > 1280)
  {
    ball2.velocity.x *= -1;
  }
   if (ball2.position.y > 720)
  {
    ball2.velocity.y *= -1;
  }
}
