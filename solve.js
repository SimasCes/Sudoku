var generate = require("./generate.js");

var genArray = generate.genArray;
var colCheck = generate.colCheck;
var squCheck = generate.squCheck;
var genPseudoku = generate.genPseudoku;
var visPseudoku = generate.visPseudoku;
var row = generate.row;
var r2 = generate.r2;

//a function to check if all integers from 1 to n appear in a single row of a 2d array where n is the number of columns of the 2d array
function singleRowCheck(arr,row) {
	
	var numCols = arr[row].length;

	// first we have a loop to check for all integers from 1 to the length of the row
	for (var i = 1; i <= numCols; i++) {

		// this variable is going to count the number of times the integer i is in the row; if it is ever greater than 1 then we will return false, if it equal to zero after checking all columns then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numCols; j++) {
			if (arr[row][j] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the row at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// this takes two numbers n and len and returns an array of length len which is the representation of number n in base 4 with as many zeroes at the beginning as necessary
// be careful that len is as big as it needs to be to print n in full
function conversion(n,len) {
	var con = [];
	while (Math.floor(n/4) != 0) {
		con.push(n % 4);
		n = Math.floor(n/4);
	}
	con.push(n % 4);

	// the array con is in the wrong order, so we will create a new array which gives us what we want in the right order
	var out = [];
	for (var i = con.length - 1; i >= 0; i--) {
		out.push(con[i]);
		con.pop();
	}

	// this will add extra zeroes at the beginning of the array so that conversion is at length len
	while (out.length < len) {
		out.splice(0,0,0);
	}

	return out;
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING

//Checks the rows of the pseuduko (that they do not have the same numbers)
function rowCheck(array) {
	
	// this function should return a Boolean

	for(var i = 0; i < 4; i++)
	{
		if(!singleRowCheck(array, i))
		{
			//returns false if any same numbers in the 2d array share a row
			return false;
		}
	}

	//returns true if each row has different non-repeating numbers
	return true;
}

// Creates coordinates for the places that have " " 
function blankEntries(array) {

	// this function should return an array

	var blank = [];

	for(var i = 0; i < array.length; i++)
	{
		for(var j = 0; j < array.length; j++)
		{
			if(array[i][j] == " ")
			{
				blank.push([i, j]);
			}
		}
	}

	return blank;
}

// creates a candidate array of numbers that can be used for solution and numbers can be 1 - 4
function makeCandidate(n,len) {

	// this function should return an array of integers between 1 and 4 of length len

	var candidate = conversion(n, len).slice();

	for(var i = 0; i < len; i++)
	{
		candidate[i] += 1;
	}

	return candidate;
}

// checks if the numbers work as the solution
function checkCandidate(array,candidate) {

	// this function should return a Boolean saying whether a candidate assignment of numbers satisfies the Pseudoku conditions

	var array2 = blankEntries(array);

	for(var i = 0; i < array2.length; i++)
	{
		array[array2[i][0]][array2[i][1]] = candidate[i];
	}

	if(squCheck(array) && colCheck(array) && rowCheck(array))
	{
		return true;
	}
	else
	{
		//this is to reset the array, so you can check multiple number combinations
		for(var j = 0; j < array2.length; j++)
		{
			array[array2[j][0]][array2[j][1]] = " ";
		}
	}

	return false;
}


//used to solve the pseuduko puzzle that has blank spaces
function solvePseudoku(array) {

	// this returns an array which is the completed Pseudoku puzzle

	var arrayBlank = blankEntries(array);

	var entryBlank = 4 ** arrayBlank.length;


	for(var i = 0; i < entryBlank; i++)
	{
		var candidate = makeCandidate(i, arrayBlank.length);

		var candidateCheck = checkCandidate(array, candidate);

		if(candidateCheck)
		{
			return array;
		}
	}

	return "No solution!";

}










// WRITE YOUR TESTING CODE BELOW HERE

// console.log(conversion(16, 4));

// //has to be true
// console.log(rowCheck(genArray(row)));
// //has to be false 
// console.log(rowCheck(r2));

// console.log(blankEntries(r2));


// console.log(makeCandidate(5, 5), 'candidate');
// console.log(makeCandidate(12, 4));

// console.log('----------------------------')

// console.log(conversion(5, 5), 'conversion');
// console.log(conversion(12, 4));

// console.log(checkCandidate(genPseudoku(row), 3));

// console.log(solvePseudoku(genPseudoku(row, 3)));

// console.log(solvePseudoku(genPseudoku([4,3,2,1], 5)))


var arr1 = genPseudoku([2,3,4,1],8); console.log(visPseudoku(arr1));
var arr2 = genPseudoku([4,2,3,1],10); console.log(visPseudoku(arr2)); console.log(visPseudoku(solvePseudoku(arr1))); console.log(visPseudoku(solvePseudoku(arr2)));












