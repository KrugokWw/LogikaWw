function createButtons(){

	let list = [];

  let posY = 0;
  let posX = 1;
  let defaultButtonWidth = 30;
  const inputHandler = generateInputHandler(mainBranch);
  //let creatingButton;

  const buttonFromParams = function(label, text, size, x, y){
    let creatingButton = new Clickable();
    creatingButton.label = label;
    creatingButton.text = text;
    creatingButton.resize(size, size);
    creatingButton.locate(x, y);
    return creatingButton;
  }

  const coordsFromPos = function(x, y){
    return [width - posX*defaultButtonWidth - 5*posX, 5+posY*(defaultButtonWidth + 5)];
  }





  for(let label of Object.keys(Expression.expressionMap)){
    if('ao'.includes(label)){continue;}
    list[label] = buttonFromParams(label, Expression.expressionMap[label], defaultButtonWidth, ...coordsFromPos(posX, posY));
    posY ++;
  }
  for(let i = "A".charCodeAt(0); i < "A".charCodeAt(0)+5; i++){
    let label = "0" + String.fromCharCode(i);
    list[label] = buttonFromParams(label, String.fromCharCode(i), defaultButtonWidth, ...coordsFromPos(posX, posY));
    posY ++;

  }
  //variables
  for(let i = "a".charCodeAt(0); i < "a".charCodeAt(0)+5; i++){
    let label = "v" + String.fromCharCode(i);
    list[label] = buttonFromParams(label, String.fromCharCode(i), defaultButtonWidth, ...coordsFromPos(posX, posY));
    posY ++;

  }
  for(let i = "x".charCodeAt(0); i < "x".charCodeAt(0)+3; i++){
    let label = "v" + String.fromCharCode(i);
    list[label] = buttonFromParams(label, String.fromCharCode(i), defaultButtonWidth, ...coordsFromPos(posX, posY));
    posY ++;

  }
  posY = 0;
  posX++;
  for(let method of Object.keys(Statement.sourceAmount)){
    let label = method;
    list[label] = buttonFromParams(label, `${method[0]}. ${Expression.expressionMap[method[1]]}`, defaultButtonWidth, ...coordsFromPos(posX, posY));
    posY ++;
  }

  posY = 0;
  posX ++;
  for(let number = 1; number <= 17; number ++){
    let label = number;
    list[label] = buttonFromParams(label, number, defaultButtonWidth, ...coordsFromPos(posX, posY));
    posY ++;
  }

  posY = 0
  posX++;
  list['d0'] = buttonFromParams('d0', '[^]', defaultButtonWidth, ...coordsFromPos(posX, posY));
  posY ++;
  list['d1'] = buttonFromParams('d1', '[<]', defaultButtonWidth, ...coordsFromPos(posX, posY));
  posY ++;
  list['d2'] = buttonFromParams('d2', '[v]', defaultButtonWidth, ...coordsFromPos(posX, posY));
  posY ++;
  list['d3'] = buttonFromParams('d2', '[>]', defaultButtonWidth, ...coordsFromPos(posX, posY));
  posY ++;
  list['mode'] = buttonFromParams('mode', 'mode', defaultButtonWidth, ...coordsFromPos(posX, posY));
  posY ++;

  posY = 0;
  posX ++;

  

  for(let i of Object.keys(list)){
    if(list[i].label == 'mode'){
      list[i].color = "#FFFF00";
      list[i].onPress = inputHandler;
      list[i].onHover = function(){
        rect(mouseX, mouseY, 120, 200);
        text(`yellow (default) - insert mode - will insert the next expression below the pointer

          blue - replace mode - will replace the expresson of the current line`, mouseX + 10, mouseY + 10, 100, 300);
      }
      continue;
    }


    list[i].onHover = function(){
      this.color = "#999999";
    };

    list[i].onPress = inputHandler;

    list[i].onOutside = function(){
      this.color = "#FFFFFF";
    };

  }


  return list;

}