var Lista = ["door", "candle", "cell phone", "circle", "birthday cake", "apple", "sock", "rain", "hexagon", "square", "stitches"]
var randomNumber = Math.floor((Math.random()*Lista.length)+ 1)
esboço = Lista[randomNumber];
document.getElementById('desenho').innerHTML = 'Esboço a ser desenhado: '+ esboço;

timerCounter = 0;
timerCheck = "";
drawnSketch = "";
answerHolder = "";
score = 0;

function updateCanvas() {
   background("white");
   randomNumber = Math.floor((Math.random()*Lista.length)+ 1)
   esboço = Lista[randomNumber];
   document.getElementById('desenho').innerHTML = 'Esboço a ser desenhado: '+ esboço;
}

function preload()
{
   classifier = ml5.imageClassifier('DoodleNet');
}

function setup()
{
  canvas = createCanvas(400, 400);
  canvas.center();
  background("#ededeb");
  canvas.mouseReleased(classifyCanvas);0
}

function draw()
{
  strokeWeight(13)
  stroke(0)
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
 }

 checkSketch()
 if(drawnSketch == esboço)
 {
   answerHolder = "set"
   score++;
   document.getElementById('pontuação').innerHTML = 'Pontuação ' + score;
 }
}

function classifyCanvas()
{
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{
  if(error){
    console.error(error);
  }
  else{
    console.log(results);
    drawnSketch = results[0].label;
    document.getElementById('nome').innerHTML = 'Seu esboço: ' + drawnSketch.replace("_", " ");
    document.getElementById('precisão').innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';
  }
}

function checkSketch()
{
  timerCounter++;
  document.getElementById('tempo').innerHTML = 'Tempo: ' + timerCounter;
  console.log(timerCounter)
  if(timerCounter > 650)
   {
    timerCounter = 0
    timerCheck = "completed"
   }
   if(timerCheck == "completed" || answerHolder == "set")
   {
     timerCheck = "";
     answerHolder = "";
     updateCanvas();
   } 
}