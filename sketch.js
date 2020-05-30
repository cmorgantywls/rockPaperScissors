let video;
let classifier;
let player = "TBD"
let modelURL = 'https://teachablemachine.withgoogle.com/models/Kd65VJR_I/'
let rockEx, paperEx, scisEx;
let howto, start

function preload() {
  rockEx = loadImage("rock.jpg")
  paperEx = loadImage("paper.jpg")
  scisEx = loadImage("scissor.jpg")

  classifier = ml5.imageClassifier(`${modelURL}model.json`)
  howto = new PlayMenu()
  start = new Start()
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();

  classifyVideo();

}

function draw() {
  background(220);

  image(video, 120, 0)
  start.display()
  howto.display()

  start.runTimer(player)

  textSize(32)
  textAlign(CENTER, CENTER)
  fill(0)
  text(`You are picking: ${player}`, width / 2, height - 16)
}

function mousePressed() {
  howto.clickCheck()
  start.clickCheck(howto)
}
