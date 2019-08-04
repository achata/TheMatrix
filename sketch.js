var streams = [];
var symbolSize = 12;
var maxSymbols = 30;
var masChevereXd = 100; //funciona de 255 a 0 - el 0 es horrible :v //opacidad
var maxSpeed = 10; //default 10


function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
    );
  background(0);
  var x =0;
  var y =random(-1000,0);
  for(var i=0; i<=width/symbolSize; i++){
    var stream = new Stream();
    stream.generateSymbols(x,y);
    streams.push(stream);
    x += symbolSize;

  }

}
var c=0;
var e=0;
function draw() {
  background(0,masChevereXd);
  textSize(symbolSize);
  streams.forEach(function(stream){
    stream.render();
  });
  if(frameCount>=120){
    textSize(60+(c++));
    textAlign(CENTER, CENTER);
    text("ACHATA", width/2, height/2-(e++));
  }
}

function Symbol(x,y,speed,first){
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(0,20));
  this.first = first;

  this.setToRandomSymbol = function(){
    if(frameCount % this.switchInterval == 0){
      this.value = String.fromCharCode(
        0x30A0 + round(random(0,90))
      );
    }
  }

  this.rain = function(){
    if(this.y >= height){
      this.y = 0;
    }else{
      this.y += this.speed;
    }
  }
}

function Stream(){
  this.symbols = [];
  this.totalSymbols = round(random(5,maxSymbols));
  this.speed = random(5,maxSpeed+5);

  this.generateSymbols = function(x,y){
    var first = round(random(0,4)) == 1; //hay un  20% de que el primero sea brillante--ese uno al final  representa true
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x,y,this.speed,first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }
  this.render = function(){
    this.symbols.forEach(function(symbol){
        if(symbol.first){
          fill(159,246,167);
        }else{
          fill(49,184,70);
        }
        text(symbol.value,symbol.x,symbol.y);
        symbol.rain();
        symbol.setToRandomSymbol();
    });
  }
}