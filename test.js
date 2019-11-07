//Variaveis do plano inclinado
var plane = {
    a: new PVector(0,575),
    b: new PVector(400 ,300),
    c: new PVector(800, 575),
};

//Inicio do Timer do tempo
var start = Date.now();
//definição de forças

var gravity = new PVector(0, 0);

//criando obejto bola para testes
var ball2 = new Physical(0,550,50,50);

//Métodos de desenho do Physical

Physical.prototype.drawvector = function (vectors)
{
    for (var i = 0; i < vectors.length; i++ ){
        if (vectors[i].mag() != 0){
            var c = 1.2;
            strokeWeight(2);
            stroke(40, 100, 100);
            line(this.position.x, this.position.y, this.position.x + vectors[i].x *c, this.position.y + vectors[i].y*c);
            pushMatrix();
            translate(this.position.x + vectors[i].x *c, this.position.y + vectors[i].y*c);
            a = atan2(this.position.x-(this.position.x + vectors[i].x*c), (this.position.y + vectors[i].y*c)-this.position.y);
            rotate(a);
            line(0, 0, -8, -8);
            line(0, 0, 8, -8);
            popMatrix();
        }
    }



}

//Métodos do slider de desenho do slider --------------------------------------------------------------

//desenhar slider
Slider.prototype.draw = function()
{
    rectMode(CENTER);
    fill(255,255,255);
    rect(this.position.x,this.position.y,this.w,this.h);
    fill(0,0,255);
    ellipse(this.position.x+this.real_value,this.position.y,25,25);
    fill(255,255,255);
    textSize(15);
    text(this.name, this.position.x - this.w * 0.5, this.position.y - this.h*5, 200, 200);
    text(this.value.toFixed(1) + this.unity, this.position.x - this.w * 0.5, this.position.y + this.h*4, 200, 200);

    if (this.cases){
        for (var i = 0; i < this.cases.length; i++){
            if (this.value >= this.cases[i][1] && this.value <= this.cases[i][2]){
                fill(255,255,255);
                text(this.cases[i][0],this.position.x- this.w * 0.5, this.position.y + this.h*7, 200, 200 );
            }
        }
    }
}



Slider.prototype.update = function()
{
    eval((this.variavel) + "=" + (this.value)); // modifica o valor a qual o slide se refere

    //verifica se mouse está em cima da bolinha
    if  (
        mouseX < (this.position.x+this.real_value)+25 && mouseX > (this.position.x+this.real_value)-25 &&
        mouseY < this.position.y+25 && mouseY > this.position.y-25
        )
    {
        this.mouseOver = true;
    }
    else
    {
        this.mouseOver = false;
    }

    //movimenta se mouse está em cima
    if (mousePressed == true && this.mouseOver == true)
    {
        if (mouseX <= this.position.x + this.w/2 && mouseX >= this.position.x - this.w/2)
        {
            this.real_value = mouseX-this.position.x;
            this.value = map(mouseX-this.position.x, -this.w/2, this.w/2, this.min, this.max); //Regra de três do slider
        }
    }

}


//criando sliders -----------------
var slider = new Slider("Força Aplicada", ' N', 0,100,"ball2.apllied_force.x",1180,80,100,5); //modifica força aplicada
var sliderm = new Slider("Massa", ' Kg', 1,100,"ball2.mass",1180,160,100,5); // Digamos que está em Kg

var sliderg = new Slider("Gravidade", ' m/s²', 0, 24.8, "gravity.y",1180,240,100,5); // modifica a gravidade variando da gravidade de mércurio até jupíter
sliderg.defineCases([ ['Espaço', 0, 0], ['Terra', 9.8, 10], ["Marte ou Mércurio", 3.7, 4], ["Urano e Vênus", 8.8, 9], ["Saturno", 10.4, 10.1], ["Netuno", 11, 11.2], ["Júpiter", 24.5, 24.8] ]);

var sliderc = new Slider('Coeficiente de Atrito', '', 0, 1, "ball2.cStaticFriction", 1180, 320, 100, 5);
sliderc.defineCases( [  ['Borracha sobre concreto', 1, 1], ['Aço sobre aço (seco)', 0.8, 0.8], ['Aço sobre aco(lubrificado)', 0.1, 0.1], ['Madeira sobre madeira', 0.5, 0.5], ['Madeira sobre neve', 0.12, 0.12] ]  );

// var sliderp = new Slider('Angulo do plano', '', 0, 720, "plane.b.x", 200, 320, 100, 5);
// Relacionado ao canvas e ao desenho ------------------------------------------

//Configurações iniciais do canvas
void setup ()
{
    size(1280,720);//tamanho da "tela"
    background(064,224,208);//cor de fundo (ceu)
}

void draw ()
{

    background(064,224,208); //Para que a animação funcione.
    noStroke(); //para os desenhos terem ua linha preta ao redor.
    fill(150,150,150);//cor do quadrado
    rectMode(CORNER);
    rect(1100,0,200,400);//quadrado de fundo dos slides

    fill(200, 200, 100);
    triangle(plane.a.x, plane.a.y , plane.b.x, plane.b.y , plane.c.x, plane.c.y);
    // text( degrees(PVector.angleBetween(plane.c, plane.b)) ,200, 200, 200, 200);

    //Timer do tempo
    time = (Date.now() - start)/1000;
    textSize(25);
    fill(255,255,255);
    text('t = ' + time + ' s', 10, 50, 1000, 1000);

    // Outras informações que aparecem para o usuário
    text('s = ' + ball2.percorrido.toFixed(2) + ' m ', 210, 50, 1000, 1000);
    text('v = ' + ball2.velocity.mag().toFixed(2) + ' m/s', 410, 50, 1000, 1000);
    text('a = ' + ball2.acceleration.mag().toFixed(2) + ' m/s² ', 610 , 50, 1000, 1000);

    //Desenhando e dando uptade nos slides( é necessário uma função para fazer isso de forma otimizada)
    slider.update();
    slider.draw();
    sliderm.update();
    sliderm.draw();
    sliderc.update();
    sliderc.draw();
    // sliderp.update();
    // sliderp.draw();



    // Dando update nos obejetos físicos
    ball2.update();



    //Aplicando a gravidade
    gravity = new PVector(0, 0.1);
    sliderg.update();
    sliderg.draw();
    gravity.y *= ball2.mass;//peso
    ball2.weight = gravity;//registra o peso no objeto
    ball2.addForce(gravity);
    ball2.normal =PVector.mult(gravity, -1);//normal
    ball2.addForce(PVector.mult(gravity, -1));//registra normal no objeto


    // Calcula a força resultante da força aplicada + o atrito e aplica está força no objeto bola
    var force = PVector.add(ball2.apllied_force, ball2.friction);
    ball2.addForce(force);


    // Questões relacionadas ao desenho do quadrado (Isto deve ser mudado par um método do Physical)
    fill(0,255,100);
    rectMode(CORNER);
    rect(0,575,1280,720);
    fill(240,128,128);
    rectMode(CENTER);
    rect(ball2.position.x, ball2.position.y, ball2.w, ball2.h);

    ball2.drawvector([ball2.velocity, ball2.weight, ball2.friction, ball2.normal]);


    // Para que o objeto ball2 quando sair da tela volte do outro lado. (Talvez possa ser mudado)
    if (ball2.position.x > 1280)
    {
        ball2.position.x = 0;
        ball2.distance += 1280;
    }

}
