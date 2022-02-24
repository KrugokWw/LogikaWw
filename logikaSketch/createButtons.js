function createButtons(){

	let list = [];

  let pos = 0;
  let inputHandler = generateInputHandler(experimentalBranch, expressionCache);
  let creatingButton;
  for(let label of Object.keys(Expression.expressionMap)){
    if(label == 'a'){continue;}
    creatingButton = new Clickable();
    creatingButton.label = label;
    creatingButton.text = Expression.expressionMap[label];
    creatingButton.resize(30, 30);
    creatingButton.locate(width - creatingButton.width - 5, 5+pos*(creatingButton.height + 5));
    list[label] = creatingButton;
    pos ++;
  }
  for(let i = "A".charCodeAt(0); i < "A".charCodeAt(0)+5; i++){
    creatingButton = new Clickable();
    creatingButton.label = "0" + String.fromCharCode(i);
    creatingButton.text = String.fromCharCode(i);
    creatingButton.resize(30, 30);
    creatingButton.locate(width - creatingButton.width - 5, 5+pos*(creatingButton.height + 5));
    list[creatingButton.label] = creatingButton;
    pos ++;

  }
  pos = 0;
  for(let method of Object.keys(Statement.sourceAmount)){
    creatingButton = new Clickable();
    creatingButton.label = method;
    creatingButton.text = `${method[0]}. ${Expression.expressionMap[method[1]]}`;
    creatingButton.resize(30, 30);
    creatingButton.locate(width - 2*creatingButton.width - 10, 5+pos*(creatingButton.height + 5));
    list[creatingButton.label] = creatingButton;
    pos ++;
  }

  pos = 0;
  for(let number = 1; number <= 17; number ++){
    creatingButton = new Clickable();
    creatingButton.label = number;
    creatingButton.text = number;
    creatingButton.resize(30, 30);
    creatingButton.locate(width - 3*creatingButton.width - 15, 5+pos*(creatingButton.height + 5));
    list[creatingButton.label] = creatingButton;
    pos ++;
  }

  pos = 0
  creatingButton = new Clickable();
  creatingButton.label = 'd0'; //direction 0 (up)
  creatingButton.text = '[^]';
  creatingButton.resize(30, 30);
  creatingButton.locate(width - 4*creatingButton.width - 20, 5+pos*(creatingButton.height + 5));
  list[creatingButton.label] = creatingButton;
  pos ++;
  creatingButton = new Clickable();
  creatingButton.label = 'd2'; //direction 2 (down)
  creatingButton.text = '[v]';
  creatingButton.resize(30, 30);
  creatingButton.locate(width - 4*creatingButton.width - 20, 5+pos*(creatingButton.height + 5));
  list[creatingButton.label] = creatingButton;
  pos ++;
  creatingButton = new Clickable();
  creatingButton.label = 'd1';
  creatingButton.text = '[<]';
  creatingButton.resize(30, 30);
  creatingButton.locate(width - 4*creatingButton.width - 20, 5+pos*(creatingButton.height + 5));
  list[creatingButton.label] = creatingButton;
  pos ++;
  creatingButton = new Clickable();
  creatingButton.label = 'd3';
  creatingButton.text = '[>]';
  creatingButton.resize(30, 30);
  creatingButton.locate(width - 4*creatingButton.width - 20, 5+pos*(creatingButton.height + 5));
  list[creatingButton.label] = creatingButton;
  pos ++;
  creatingButton = new Clickable();
  creatingButton.label = 'mode'; //switch input mode (replace / insert)
  creatingButton.text = 'mode';
  creatingButton.resize(30, 30);
  creatingButton.locate(width - 4*creatingButton.width - 20, 5+pos*(creatingButton.height + 5));
  list[creatingButton.label] = creatingButton;
  pos ++;
  

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