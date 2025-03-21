class Branch{
	type = "Branch";
		

	constructor(...assumptions){

		this.assumptions = assumptions;


		this.content = [];
		this.needsRecalculation = true;
	}

	recalculate(){
		this.height = 0;
		this.height += this.assumptions.length;

		for(let statement of this.content){
			if(statement.type == 'Statement'){
				this.height += 1;
			}
			else{
				this.height += statement.getHeight();
			}
		}


		this.needsRecalculation = false;

	}

	/*
	get hasVar(){
		return !(this.assumedVar == ' ');
	}
	*/

	/*
	get hasAssumedVar(){
		return typeof this.assumptions[0] == "string";
	}
	*/

	getHeight(){
		/*
		//incorrect, will return wrong values if child branch got edited

		if(this.needsRecalculation){
			this.recalculate();
		}
		*/

		this.recalculate();

		return this.height;
	}


	addStatement(statement){
		this.needsRecalculation = true;
		this.content.push(statement);
	}

	addBranch(branch){
		this.needsRecalculation = true;
		this.content.push(branch);
	}

	getFromIndex(index){
		if(index < 0){
			console.log("you did something wrong. Don't.");
			return new Statement(new Expression(), ' ');
		}

		if(index < this.assumptions.length){
			return this.assumptions[index];
		}

		let count = this.assumptions.length;

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					if(count == index){
						return element;
					}
					count += 1;
					break;

				case 'Branch':
					if(count + element.getHeight() > index){
						return element.getFromIndex(index - count);
					}
					count += element.getHeight();
					break;
			}
		}

		return new Statement(new Expression(), ' ');
	}

	/*
	getBranchFromIndex(index, depth){
		if(index < 0){
			console.log("You did something wrong. Don't.");
			return new Branch(new Statement(new Expression(' '), ' '));
		}

		if(index < this.assumptions.length){
			console.log("You did something wrong. Don't.");
			return new Branch(new Statement(new Expression(' '), ' '));
		}

		let count = this.assumptions.length;

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					if(count == index){
						console.log("You did something wrong. Don't.");
						return new Branch(new Statement(new Expression(' '), ' '));
					}
					count += 1;
					break;

				case 'Branch':

					if(count == index){
						return element;
					}

					if(count + element.getHeight() > index){
						return element.getFromIndex(index - count);
					}
					count += element.getHeight();
					break;
			}
		}

		return false;
	}
	*/

	insertAtIndex(elementToInsert, index, depth = 0, replace = false){

		if(index <= 0){
			if(this.assumptions.length == 0 || replace){
				this.assumptions[0] = elementToInsert;
				return;
			}
			this.content.splice(index - this.assumptions.length, 0, elementToInsert);
			//this.assumptions.push(elementToInsert);
			return;
		}



		let count = this.assumptions.length;
		let i = 0;

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					if(count == index){
						if(replace){
							this.content[i] = elementToInsert;
						} else {
							this.content.splice(index - this.assumptions.length + 1, 0, elementToInsert);
						}
						return true;
					}
					count += 1;
					break;

				case 'Branch':
					if(count + element.getHeight() >= index + 1){
						if(count + element.getHeight() == index + 1 && depth == 0){
							if(!replace){
								this.content.splice(i+1, 0, elementToInsert);
								return true;
							}
						}
						if(element.insertAtIndex(elementToInsert, index - count, depth-1, replace) == true){
							return true;
						}
					}
					count += element.getHeight();
					break;
			}
			i++;
		}

		
		if(depth == 0){
			console.log(elementToInsert);
			this.content.push(elementToInsert);
		}
		return true;
		
	}

	getDepthOfIndex(index){

		if(index < this.assumptions.length){
			return 0;
		}

		let count = this.assumptions.length;

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					if(count == index){
						return 0;
					}
					count += 1;
					break;

				case 'Branch':
					if(count + element.getHeight() > index){
						return 1 + element.getDepthOfIndex(index - count);
					}
					count += element.getHeight();
					break;
			}
		}

		return false;
	
	}

	assumedVarsAt(index){

		let assumedVars = this.assumptions[0].expression.usedVars;
		/*
		if(this.hasAssumedVar){
			assumedVars.push(this.assumptions[0]);
		}
		*/
		if(index < this.assumptions.length){
			console.log('weird assumedVarsAt requast for index of assumption')
			return assumedVars;
			
		}

		let count = this.assumptions.length;

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					count += 1;
					break;

				case 'Branch':
					if(count + element.getHeight() > index){
						assumedVars.push(...element.assumedVarsAt(index - count));
						return assumedVars;
					}
					count += element.getHeight();
					break;
			}
		}

		return assumedVars;
	}

	branchOutFromIndex(index){

		if(index < this.assumptions.length){
			return false;
		}

		let count = this.assumptions.length;

		let i = 0; //ugly but needed here as I am reasingning objects in a list :(

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					if(count == index){
						this.content[i] = new Branch(element);
						return;
						break;
					}
					count += 1;
					break;

				case 'Branch':
					if(count + element.getHeight() > index){
						element.branchOutFromIndex(index - count);
						return true;
						break;
					}
					count += element.getHeight();
					break;
			}
			i ++;
		}

		return false;

	}

	cut(index){

		if(index < this.assumptions.length){
			console.log('this part of the code should never be reached, fix it');
			return false;
		}

		let count = this.assumptions.length;

		for(let element of this.content){
			switch(element.type){
				case 'Statement':
					if(count == index){
						this.content.splice(this.content.indexOf(element), 1);
						return true;
					}
					count += 1;
					break;

				case 'Branch':
					if(count == index){
						this.content.splice(this.content.indexOf(element), 1);
						return true;
					}
					if(count + element.getHeight() > index){
						element.cut(index - count);
						return true;
						break;
					}
					count += element.getHeight();
					break;
			}
		}





		return false;
	}



	//if calling with active pointer, make sure that this.actveHeight and this.replaceMode are defined
	displaySelf(numbered = false, topLevelFeatures = false){
		

		textSize(0.8);
		strokeWeight(0.1);

		textAlign(RIGHT, TOP);

		if(topLevelFeatures){
			push();	//to match the pop at the end for citing sources

			text('>', 0.5, this.activeHeight);
			text('v', 1.4 + this.activeDepth*0.2, -1);
		
		}


		if(numbered){
			push();
			for(let i = 1; i <= this.getHeight(); i++){
				text(i, 1, 0);
				translate(0, 1);
			}
			pop();
			translate(1.2, 0);
		}

		push();

		line(0, 0, 0, this.getHeight() - .15); //long vertical line

		fill(0, 150, 0); //assumptionns always green
		if(this.assumptions.length != 0){
			translate(0.2, 0);
			textAlign(LEFT, TOP);
			text(`${this.assumptions[0].expression.stringOfSelf()}`, 0, 0);
			translate(0, 1);
			line(-.2, -0.15, .8, -0.15);
		}

		translate(-0.2, 0);
		//line(this.hasAssumedVar ? 1 : 0, -1, 0, this.getHeight() - .15 - 1);
		translate(0.2, 0);

		for(const element of this.content){


			if(element.type == 'Statement'){
				if(element.valid){
					fill(0, 150, 0); //valid ones green
				} else {
					fill(150, 0, 0); //invalid ones red
				}
				textAlign(LEFT, TOP);
				text(`${element.expression.stringOfSelf()}`, 0, 0);
				translate(0, 1);
			} else if(element.type == 'Branch'){
				element.displaySelf();
			}
		}

		pop();

		translate(0, this.getHeight());

		//cite sources
		if(!topLevelFeatures){return;}

		pop();


		fill(0, 0, 0);
		for(let i = 0; i < this.getHeight(); i++){
			let element = this.getFromIndex(i);
			textAlign(RIGHT, TOP);
			text(`${element.stringOfMetadata()}`, 13, 0);
			translate(0, 1);
		}





	}


}



/*
clipboard


			textAlign(RIGHT, TOP);
			text(`${this.assumptions[0].stringOfMetadata()}`, 12, 0);


				textAlign(RIGHT, TOP);
				text(`${element.stringOfMetadata()}`, 12, 0);



*/