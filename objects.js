var Unphysical = function(x,y,w,h)
{
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

var Physical = function(x, y, w, h)
{
  Unphysical.call(this,x,y,w,h);
  this.positon = new PVector(0,0);
  this.velocity = new PVector(0,0);
  this.acceleration = new PVector(0,0);

}
