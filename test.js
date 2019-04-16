var x = 200;
var y = 200;
void setup ()
{
  size(1280,720);
  background(100, 100, 100);
}


void draw ()
{
  background(100, 100, 100);
  fill(0);
  ellipse(x,y,200,200);
  x += 1;
  if (x > 1280)
  {
    x = 0;
  }
}

