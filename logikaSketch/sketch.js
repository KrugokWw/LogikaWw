

//TODO update index.html on outside of folder for ease of running

// http://localhost:8001/logikaSketch/index.html




let mainBranch;
let expressionCache = new Expression('');

let buttonList = {};



function setup() {
  createCanvas(700, 700);
  

  mainBranch = new Branch();

  buttonList = createButtons();


  mainBranch.activeDepth = 0;
  mainBranch.activeHeight = -1;
  mainBranch.replaceMode = false;

}

function draw() {
  background(200, 200, 255);


  for(let buttonKey of Object.keys(buttonList)){
    buttonList[buttonKey].draw();
  }

  if(frameCount % 40 == 0){
    //verifyTree(mainBranch, {}, 1);
    console.log('------------');
    verifyTree(mainBranch, {}, 1);
    //console.log('__');
    //console.log(expressionCache);
    //console.log(mainBranch);
  }


  

  push();
  translate(0, 40);
  scale(40);
  //mainBranch.displaySelf(true);
  mainBranch.displaySelf(true, true);
  pop();


  text(expressionCache.stringOfSelf(), width-170, 620);


  text("LogicChecker V002.016; experimental build", 0, 700);

}