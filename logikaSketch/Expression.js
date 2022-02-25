class Expression{

	static expressionMap = {
		'a': 'p.', //assumptions
		'+': 'v',
		'*': 'ʌ',
		'-': '-',
		'>': '->',
		'x': 'Ʇ'
	}
	static argumentAmount = {
		'0': 1,
		'+': 2,
		'*': 2,
		'-': 1,
		'>': 2,
		'x': 0,
		'': -1	// when operator is undefined, expression shouldn't be 'full'
	}


	type = 'Expression';

	constructor(operator, ...argumentList){
		this.operator = operator;
		this.argumentList = argumentList;
	}


	equals(expression){

		if(this.operator != expression.operator){
			return false;
		}

		if(this.operator != '0'){
			for(let i = 0; i < this.argumentList.length; i++){
				if(!this.argumentList[i].equals(expression.argumentList[i])){
					return false;
				}
			}
		} else {
			if(this.argumentList[0] != expression.argumentList[0]){
				return false;
			}
		}


		return true;
	}

	//needs fixing
	stringOfSelf(){

		let argumentStrings = [];

		for(let i = 0; i < Expression.argumentAmount[this.operator]; i++){
			if(this.argumentList[i] == undefined){
				argumentStrings[i] = '_';
			}
			else if(this.operator == '0'){
				argumentStrings[i] = this.argumentList[i];
			}
			else{
				argumentStrings[i] = this.argumentList[i].stringOfSelf();
			}
		}



		switch(this.operator){
			case '':
				return `undefined`;
			case '0':
				return `${argumentStrings[0]}`; // no .stringOfSelf() cuz argument is a string
				break;

			case '-':
				return `(${Expression.expressionMap[this.operator]} ${argumentStrings[0]})`;
				break;

			case '+':
			case '*':
			case '>':
				return `(${argumentStrings[0]} ${Expression.expressionMap[this.operator]} ${argumentStrings[1]})`;
				break;

			case 'x':
				return `${Expression.expressionMap[this.operator]}`;
				break;


			default:
				return 'string of operator not yet defined';
		}
	}


	hasArgument(expression){

		//just plain bad code

		for(let argument of this.argumentList){
			if(argument.equals(expression)){
				return true;
			}
			//console.log(2);
		}

		return false;

	}



	//ALL below is part of an attempt to get partial and steppable input working
	
	copy(){
		return new Expression(this.operator, ...this.argumentList);
	}

	clear(){
		this.operator = '';
		this.argumentList = [];
	}

	set(expression){
		this.operator = expression.operator;
		this.argumentList = expression.argumentList;
	}

	get full(){

		if(this.argumentList.length == Expression.argumentAmount[this.operator]){
			if(this.operator == '0'){
				return true;
			}

			for(let argument of this.argumentList){
				if(!argument.full){
					return false;
				}
			}
			return true;
		}
		return false;
		

	}

	//returns true if argument has been found a place in the expression
	insertArgument(argument){
		if(this.full){
			return false;
		}

		for(let i = 0; i < Expression.argumentAmount[this.operator]; i++){

			if(i >= this.argumentList.length){
				this.argumentList.push(argument);
				return true;
			}

			if(this.argumentList[i].insertArgument(argument)){
				return true;
			}
		}
		return false;
	}

	applyPredicate(predicate){

		if(this.operator == "0"){
			this.argumentList.push(predicate);
		}


		for(let i = Expression.argumentAmount[this.operator]-1; i >= 0 ; i--){

			if(i >= this.argumentList.length){
				continue;
			}

			if(this.argumentList[i].applyPredicate(predicate)){
				return true;
			}
		}
		return false;
	}

}