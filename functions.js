//classify the video using model
function classifyVideo() {
  classifier.classify(video, getResults)
}

//process some things!
function getResults(error, results) {
  if (error) {
    console.error(error)
    return;
  }

  player = results[0].label;
  classifyVideo();
}

class Start {
  constructor() {
    this.x = 10
    this.y = 65
    this.w = 100
    this.h = 50
    this.c = color(80, 194, 95)
    this.clicked = false
    this.timer = 3
    this.playerScore = 0
    this.compScore = 0
  }

  display() {
    strokeWeight(0)
    fill(this.c)
    rect(this.x, this.y, this.w, this.h)
    strokeWeight(1)
    textSize(20)
    fill(0)
    text("Start!", this.x + 47, this.y + 25)

    if (!this.clicked) {
      this.c = color(80, 194, 95)
    } else {
      this.c = color(194, 96, 93)
    }

    text(`Player Score\n${this.playerScore}`,this.x+50, this.y+100)
    text(`Comp Score\n${this.compScore}`,this.x+50, this.y+175)
  }

  clickCheck(otherBut) {
    if (!this.click && collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h) && !otherBut.clicked) {
      this.clicked = true
    }
  }

  runTimer(player) {
    if (this.clicked) {
      this.displayTimer()
      if (frameCount % 60 == 0 && this.timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        this.timer--;
      }
      if (this.timer == 0) {
        let comp = this.getCompMove()
        let results = this.findWinner(player,comp)
        let resultTimer =3

        alert(`You ${results} - the computer picked ${comp}.`)

        if (results=="win"){
          this.playerScore++
        }
        if (results=="lose"){
         this.compScore++
        }

        this.clicked = false
        this.timer = 3

      }
    }
  }

  displayTimer(){
  textAlign(CENTER, CENTER);
  fill(255)
  textSize(100);
  text(this.timer, width/2, height/2);
  }

  findWinner(playerMove, computerMove){

   if(playerMove == "Rock" && computerMove == "Scissor"){
    return "win"
   }
   else if(playerMove == "Paper" && computerMove == "Rock"){
    return "win"
   }
   else if(playerMove == "Scissor" && computerMove == "Paper"){
    return "win"
   }
   else if(playerMove == computerMove){
    return "draw"
   }
   else{
    return "lose"
   }
  }

  getCompMove(){
   let computerChoice = ["Rock","Paper","Scissor"]
   let computerMove = computerChoice[int(random(0,3))]
   return computerMove
  }
}

class PlayMenu {
  constructor() {
    this.x = 10
    this.y = 10
    this.w = 100
    this.h = 50
    this.c = 255
    this.clicked = false
  }

  display() {
    strokeWeight(0)
    fill(this.c)
    rect(this.x, this.y, this.w, this.h)
    strokeWeight(1)
    textSize(20)
    fill(0)
    text("How To\nPlay", this.x + 47, this.y + 25)
    if (!this.clicked) {
      this.w = 100
      this.h = 50
    } else if (this.clicked) {
      this.w = 200
      this.h = 400

      textSize(24)
      text("X", 170, 35)

      textSize(12)
      text("Click start. \n Before the countdown ends,\n diplay one of the following\ndirectly to the camera:", this.x + 100, 120)

      image(rockEx, 60, 180, 100, 67)
      image(paperEx, 60, 180 + 67, 100, 67)
      image(scisEx, 60, 180 + 67 + 67, 100, 67)
    }
  }

  clickCheck() {
    if (collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h) && !this.clicked) {
      this.clicked = true;
      console.log("Clicked.", this.clicked)
    } else if (collidePointRect(mouseX, mouseY, 160, 10, 50, 50) && this.clicked) {
      this.clicked = false;
    }
  }


}
