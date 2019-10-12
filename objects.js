// Esta é a classe de objetos que os quais são exibidos mas a física não se aplica
// Eles somente tem um vetor posição e atributos de comprimento e altura
var Unphysical = function(x,y,w,h)
{
  this.position = new PVector(x,y);
  this.w = w;
  this.h = h;
}

// Esta é classe de objetos aos quais a física se aplicará. Ela herda de Unphysical. Porém também contém vetores de velocidade e aceleração
var Physical = function(x=200, y=200, w=10, h=10, mass=1, density=1)
{
  Unphysical.call(this,x,y,w,h);
  this.velocity = new PVector(0,0);
  this.acceleration = new PVector(0,0);
  this.mass = mass;
  this.density = density;
  this.apllied_force = new PVector(0,0);
  this.cStaticFriction = 0.5;
  this.cDinamicFriction = 0.3;
  this.weight = new PVector(0,0.1);
  this.normal = PVector.mult(this.weight, -1);
  this.friction = new PVector (0,0);
}

Physical.prototype.define_friction = function() //define atrito
{
    if (this.apllied_force.mag() != 0)
    {

        console.log('Foi');
        this.friction.x = 1;
        if (this.velocity.mag() != 0)
        {
            this.friction.setMag(PVector.mult(PVector.mag(this.normal), this.cDinamicFriction));
        }
        else
        {
            if(this.apllied_force.mag() > PVector.mag(PVector.mult(this.normal, this.cStaticFriction)) )
            {
                this.friction.setMag(PVector.mult(PVector.mag(this.normal), this.cDinamicFriction));
            }
            else
            {
                this.friction.setMag(PVector.mult(this.apllied_force, -1));
            }
        }
        if (this.apllied_force.mag() > 0)
        {
            this.friction.mult(-1);
        }


    }
    else {
        console.log('Deu não');
        this.friction.setMag(0);
    }
}

Physical.prototype.update = function()
{
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.define_friction();
}


Physical.prototype.addForce = function(force)
{
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
}

// Esse é o slider
var Slider = function(min, max, variavel,x=200, y=200, w=10, h=10)
{
  this.min = min;
  this.max = max;
  this.variavel = variavel;
  Unphysical.call(this,x,y,w,h);
  //valores iniciais do slider
  this.value = this.max/2;
  this.real_value = 0;

}
