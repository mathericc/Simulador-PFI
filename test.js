
//criando obejto bola para testes
var ball2 = new Physical(200,250,50,50);

//Métodos do slider de desenho do slider --------------------------------------------------------------

//desenhar slider
Slider.prototype.draw = function()
{
    rectMode(CENTER);
    fill(255,255,255);
    rect(this.position.x,this.position.y,this.w,this.h);
    fill(0,0,255);
    ellipse(this.position.x+this.real_value,this.position.y,25,25);
}

//vericar se mouse está no slide e mudar valores conforme a posição do slide (Talvez possa ser melhorado)
var over = false; //mouse em cima

Slider.prototype.update = function()
{
    eval((this.variavel) + "=" + (this.value)); // modifica o valor a qual o slide se refere

    //verifica se mouse está em cima da bolinha
    if  (
        (mouseX < this.position.x+this.real_value)+25 && mouseX > (this.position.x+this.real_value)-25 &&
        (mouseX < this.position.y)+25 && mouseX > (this.position.y)-25
        )
    {
        over = true;
    }
    else
    {
        over = false;
    }

    //movimenta se mouse está em cima
    if (mousePressed == true && over == true)
    {
        if (mouseX <= this.position.x + this.w/2 && mouseX >= this.position.x - this.w/2)
        {
            this.real_value = mouseX-this.position.x;
            this.value = map(mouseX-this.position.x, -this.w/2, this.w/2, this.min, this.max); //Regra de três do slider
        }
    }

}


//criando sliders
var slider = new Slider(0,1,"ball2.apllied_force.x",400,200,100,5); //modifica força aplicada
var sliderm = new Slider(1,1000,"ball2.mass",600,200,100,5); // modifica massa


// Relacionado ao canvas e ao desenho ------------------------------------------

//Confgurações iniciais do canvas
void setup ()
{
    size(1280,720);
    background(100, 100, 100);
}

void draw ()
{

    background(100, 100, 100); //Para que a animação funcione.
    stroke(0,0,0); //para os desenhos terem ua linha preta ao redor.


    //Desenhando e dando uptade nos slides( é necessário uma função para fazer isso de forma otimizada)
    slider.update();
    slider.draw();
    sliderm.update();
    sliderm.draw();

    // Dando update nos obejetos físicos
    ball2.update();

    // Calcula a força resultante da força aplicada + o atrito e aplica está força no objeto bola
    var force = PVector.add(ball2.apllied_force, ball2.friction);
    ball2.addForce(force);


    // Questões relacionadas ao desenho do quadrado (Isto deve ser mudado par um método do Physical)
    fill(0,255,0);
    rectMode(CORNER);
    rect(0,275,1280,720);
    fill(255,255,255);
    rectMode(CENTER);
    rect(ball2.position.x, ball2.position.y, ball2.w, ball2.h);


    // Para que o objeto ball2 quando sair da tela volte do outro lado. (Talvez possa ser mudado)
    if (ball2.position.x > 1280)
    {
        ball2.position.x = 0;
    }
    if (ball2.position.x < 0)
    {
        ball2.position.x = 1280;
    }

}
