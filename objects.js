var Unphysical = function(x,y,w,h)
{
  this.position = new PVector(x,y);
  this.w = w;
  this.h = h;
}

var Physical = function(x, y, w, h)
{
  Unphysical.call(this,x,y,w,h);
  this.velocity = new PVector(0,0);
  this.acceleration = new PVector(0,0);

}

Physical.prototype.update = function()
{
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
}


Physical.prototype.addForce = function()
{
    this.acceleration.add(1, 1);
}
