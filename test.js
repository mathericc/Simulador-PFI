var ball = new Object(0,200,50,50); 
void setup ()
{
  size(1280,720);
  background(100, 100, 100);
}


void draw ()
{
  background(100, 100, 100);
  fill(0);
  ellipse(ball.x, ball.y, ball.w, ball.h);
  ball.x += 1;
  if (ball.x > 1280)
  {
    ball.x = 0;
  }
}

