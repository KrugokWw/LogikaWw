function generateInputHandler(mainBranch, expressionCache){
	return function(){
		if(this.label[0] in Expression.argumentAmount){

			if(expressionCache.operator == ''){
				if(this.label[0] != '0'){
					expressionCache.set(new Expression(this.label[0]));
				} else{
					expressionCache.set(new Expression(this.label[0], this.label[1]));
				}
				
			} else {
				if(this.label[0] != '0'){
					expressionCache.insertArgument(new Expression(this.label));
				} else{
					expressionCache.insertArgument(new Expression('0', this.label[1]));
				}
			}
			
			//mainBranch.insertAtIndex(new Statement(expressionCache.copy(), 'ua'), mainBranch.activeHeight, mainBranch.activeDepth, true); //highly experimental and may caouse bugs

			//dump cache into branch
			if(expressionCache.full){
				console.log(expressionCache.copy().stringOfSelf(), 'finished input of expression, dumped into branch');
				mainBranch.insertAtIndex(new Statement(expressionCache.copy(), 'ua'), mainBranch.activeHeight, mainBranch.activeDepth, mainBranch.replaceMode);
				console.log(mainBranch.assumedVarsAt(mainBranch.activeHeight)); //remove, debugging only
				mainBranch.activeHeight += int(!mainBranch.replaceMode);
				expressionCache.clear();
			}
		} else if("ui".includes(this.label[0])){
			mainBranch.getFromIndex(mainBranch.activeHeight).method = this.label;

			if(this.label[1] != "a"){return;}		//return and not continue cuz inside of that weirt forEach loop
			mainBranch.branchOutFromIndex(mainBranch.activeHeight);
			mainBranch.activeDepth += 1;
		
		} else if(this.label == 'mode'){		//switch input mode
			mainBranch.replaceMode = !mainBranch.replaceMode;
	       	this.color = color(255*int(!mainBranch.replaceMode), 255*int(!mainBranch.replaceMode), 255*int(mainBranch.replaceMode));
      		
		}
		else if(this.label[0] == 'd'){		//d-pad
			switch(this.label[1]){
				case '0': 		//up
				if(mainBranch.activeHeight == 0){
					break;
				}
				mainBranch.activeHeight -= 1;
				break; 
				case '1':		//enter
				if(mainBranch.activeDepth == 0){
					break;
				}
				mainBranch.activeDepth -= 1;
				break;
				case '2':  		//down
				if(mainBranch.activeHeight >= mainBranch.getHeight()){
					break;
				}
				mainBranch.activeHeight += 1;
				break;
				case '3':		//'anti' enter
				mainBranch.activeDepth += 1;
				break;
				default:
				console.log('not good, add code for that direction');
				break;
			}
		}
		else if(this.label[0] == "v"){			//variable
			if(expressionCache.empty){
				if(mainBranch.getFromIndex(mainBranch.activeHeight).expression.empty){
					mainBranch.insertAtIndex(new Branch(this.label[1]), mainBranch.activeHeight-1, false);	//really should refactor this
					mainBranch.activeDepth += 1;
				}
				else{
					mainBranch.getFromIndex(mainBranch.activeHeight).expression.applyVariable(this.label[1]);
				}	
			}
			else {
				expressionCache.applyVariable(this.label[1]);
			}	
		}
		else if(typeof(this.label) == "number"){
			mainBranch.getFromIndex(mainBranch.activeHeight).addSource(this.label);
		}
		else if(this.label == "export"){
			console.log(JSON.stringify(mainBranch));
		}
	};
}