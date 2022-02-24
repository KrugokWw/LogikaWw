

//TODO update index.html on outside of folder for ease of running

// http://localhost:8001/logikaSketch/index.html





let mainBranch;

let experimentalBranch;
let expressionCache = new Expression('');

let buttonList = {};



function setup() {
  createCanvas(700, 700);
  

  mainBranch = new Branch(new Statement(new Expression('0', 'A'), 'ua'));
  mainBranch.addStatement(new Statement(new Expression('+', new Expression('0', 'B'), new Expression('0', 'A')), 'u+', 1));   ///think about this and how it should work vs how it works

  let badCode = new Branch(new Statement(new Expression('*', new Expression('-', new Expression('0', 'C')), new Expression('0', 'E')), 'ua'));
  badCode.addStatement(new Statement(new Expression('+', new Expression('0', 'D'), new Expression('0', 'A')), 'u+', 1));
  badCode.addStatement(new Statement(new Expression('0', 'E'), 'i*', 3));
  badCode.addStatement(new Statement(new Expression('*', new Expression('0', 'A'), new Expression('+', new Expression('0', 'D'), new Expression('0', 'A'))), 'u*', 1, 4));
  
  let worstCode = new Branch(new Statement(new Expression('0', 'C'), 'ua'));
  worstCode.addStatement(new Statement(new Expression('-', new Expression('0', 'C')), 'i*', 3));
  worstCode.addStatement(new Statement(new Expression('x'), 'ux', 7, 8));


  badCode.addBranch(worstCode);

  badCode.addStatement(new Statement(new Expression('-', new Expression('0', 'C')), 'u-', 7, 9));

  mainBranch.addBranch(badCode);

  let worseCode = new Branch(new Statement(new Expression('-', new Expression('-', new Expression('0', 'F')),), 'ua'));
  worseCode.addStatement(new Statement(new Expression('0', 'F'), 'i-', 11));

  mainBranch.addBranch(worseCode);

  //mainBranch.addStatement(new Statement(new Expression('+', 'B', 'A'), '++', 1));




  //experimentalBranch = new Branch(new Statement(new Expression('0', 'A'), 'ua'));
  experimentalBranch = new Branch();

  buttonList = createButtons();


  experimentalBranch.activeDepth = 0;
  experimentalBranch.activeHeight = -1;
  experimentalBranch.replaceMode = false;

  
}

function draw() {
  background(200, 200, 255);


  for(let buttonKey of Object.keys(buttonList)){
    buttonList[buttonKey].draw();
  }

  if(frameCount % 40 == 0){
    //verifyTree(mainBranch, {}, 1);
    console.log('------------');
    verifyTree(experimentalBranch, {}, 1);
    //console.log('__');
    //console.log(expressionCache);
    //console.log(experimentalBranch);
  }


  push();
  translate(0, 40);
  scale(40);
  //mainBranch.displaySelf(true);
  experimentalBranch.displaySelf(true, true);
  pop();


  text(expressionCache.stringOfSelf(), width-170, 620);


  text("LogicChecker V001.021; experimental build", 0, 700);

}