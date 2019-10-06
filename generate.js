//a function to check if all integers from 1 to n appear in a column of a 2d array where n is the number of rows of the 2d array
function singleColCheck(arr,column) {
	
	var numRows = arr.length;
	var numCols = arr[0].length;

	// first we have a loop to check for all integers from 1 to the length of the column
	for (var i = 1; i <= numRows; i++) {

		// this variable is going to count the number of times the integer i is in the column; if it is ever greater than 1 then we will return false, if it equal to zero after checking all rows then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numRows; j++) {
			if (arr[j][column] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the column at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// a function to check that all integers appear in a square of a 2d array - (x1,y1) is the (row,colum) entry of the top-left element, and (x2,y2) is the bottom-right element of the square
// e.g. singleBlockCheck(arr,0,0,1,1) would check if the 2-by-2 block in the top-left contains all integers from 1 to 4
function singleBlockCheck(arr,x1,y1,x2,y2) {
	// this generates an array square of all the elements inside a particular square of a 2d array
	var square = [];
	for (var i = y1; i <= y2; i++) {
		for (var j = x1; j <= x2; j++) {
			square.push(arr[i][j]);
		}
	}

	// this then checks whether each integer from 1 to the length of the array square is inside the particular square
	var sqSize = square.length;
	for (var i = 1; i <= sqSize; i++) {
		var count = 0;
		for (var j = 0; j < sqSize; j++) {
			if (square[j] == i){
				count++;
			}
			if (count > 1){
				return false;
			}
		}
		if (count == 0){
			return false;
		}
	}

	return true;
}

// a function to randomly select n (row,column) entries of a 2d array with size columns and size rows, where size is assumed to be an integer and n is also assumed to be an integer
function entriesToDel(size,n) {
	if (n <= size ** 2) {

		// this creates an array of all the rows and column indices

		var array = [];
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				array[j+(size * i)] = [i,j];
			}
		}

		// this creates a new array, called array2 to store randomly chose elements of the array that will be removed, and then removes those elements from array

		var num = size ** 2;

		var array2 = [];
		for (var i = 0; i < n; i++) {
			var x = Math.round( (num - i - 1) * Math.random() );
			array2[i] = array[x];
			array.splice(x,1);
		}
		return array2;
	}
	return "Number of elements exceeds size of array!";
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING



//generates a 2D array from an array
function genArray(row) {

	var arr = [];

	for(var i = 0; i < 4; i++)
	{
		// slice is used for cutting up or copying arrays (if no arguments are put in)
		arr.push(row.slice());
	}

	return arr;
}

//checks if a column is correct (that they do not have the same numbers)
function colCheck(arr) {

	// this function should return a Boolean

	for(var i = 0; i < 4; i++)
	{
		if(!singleColCheck(arr, i))
		{
			//returns false if any same numbers in the 2d array share a column
			return false;
		}
	}

	//returns true if each column has different non-repeating numbers
	return true; 
}

//checks if a square is correct (that they do not have the same numbers)
function squCheck(arr) {
	
	var square = [[0, 0, 1, 1], [0, 2, 1, 3], [2, 0, 3, 1], [2, 2, 3, 3]];

	// this function should return a Boolean
	for(var i = 0; i < square.length; i++)
	{
		if(!singleBlockCheck(arr, square[i][0], square[i][1], square[i][2], square[i][3]))
		{
			// console.log(!singleBlockCheck(arr, square[i][0], square[i][1], square[i][2], square[i][3]))
			return false;
		}
	}

	return true;
}

//permutates one instance of the 2D array
function cyclicPerm(arr,row,n) {
	
	// this function should return an array

	for(var i = 0; i < n; i++)
	{
		var end = arr[row][3];
		//this cycles backwards, so you start to permutate at 2D array number 4 
		for(var j = 3; j > 0; j--){
			arr[row][j] = arr[row][j - 1];
		}
		arr[row][0] = end;
	}
	
	return arr;
}

//permutates the whole 2D array by using cyclicPerm
function perm(arr,a,b,c) {

	// this function should return an array

	cyclicPerm(arr, 1, a);
	cyclicPerm(arr, 2, b);
	cyclicPerm(arr, 3, c);

	return arr;
}

// permutates the whole 2D array (apart from the 1st itteration)
function permArray(arr) {
	
	// this function should return an array or a string saying "There is no solution!"

	var arrnew = [];


	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			for(var k = 0; k < 4; k++)
			{

				arrnew = (perm(arr, i, j, k));

				if(colCheck(arrnew) && squCheck(arrnew) == true)
				{
					return arrnew;
				}

				arrnew = [];
			}
		}
	}

	return 'There is no solution!';
}

//deletes random parts of the 2D array, so there are spaces you have to solve for
// the n parameter says how many psaces to deleter from the arr parameter array
function delEntries(arr,n) {
	
	// this function should return an array

	//the entrieToDel function creates coordinates to delete, so if it is in the for loop, sometimes the coordinates will overlap
	//the coordintes are like e.g. [1, 2], the 1st number being the array in the 2d array, and the 2nd number being the number in that array
	var coord = entriesToDel(4, n);

	for(var i = 0; i < n; i++)
	{
		arr[coord[i][0]][coord[i][1]] = " ";		
	}

	return arr;
}

//generates the pseuduku puzzle with empty strings in random places
function genPseudoku(row,n){

	// this function should return an array
	
	//the commented code is condensed into 1 line. It may however be easier to understand so it is left commented out alongside the one line command.
	// arr = genArray(row);
	// arr = permArray(arr);
	// arr = delEntries(arr, n)

	arr = delEntries(permArray(genArray(row)) ,n);

	return arr;
}


//lets you visualise the pseuduku puzzle in the ocnsole
function visPseudoku(arr) {

	// this function should return a string

	var viz;
	//for the top side
	viz += "\n ---------------------";
	//so the 1st itteration does not start a little off to the right (removes a space)
	viz += "\n";
	
	// forms the amound of rows there will be 
	for(var j = 0; j < arr.length; j++)
	{
		//forms the amount of columns there will be
		for(var i = 0; i < arr.length; i++)
		{
			//for all the columns
			viz += " | ";
			viz = viz + arr[j][i] + " ";
		}

		//for the last column, after the last number in each row
		viz += " | ";
		//not in the double for loop so each row is only split by one --- line instead of 4
		viz += "\n ---------------------";
		viz += "\n";
	}

	return viz;
}



// PUT YOUR NON-FUNCTION WORKING BELOW HERE, e.g. function calls, printing to the console, creation of variables
///////////////////////////////////////////////////////////////////////////////////////////////////////


var row = [1, 2, 3, 4];

// r2 and r3 are used for debugging and checking if the functions work or return true when needed
var r3 = [[ 1, 2, 3, 5 ], [ 3, 4, 3, 2 ], [ 2, 1, 4, 3], [ 4, 3, 2, 1 ]]
var r2 = [[ 1, 2, ' ', 4 ], [ 4, 1, 2, 3 ], [ ' ', 4, ' ', 2], [ 2, 3, 4, 1 ]]
var arr = genArray(row);


// console.log(genArray(row));

// console.log(colCheck(genArray(row)));

// console.log(colCheck(r2));

// console.log(squCheck(genArray(row)));

// console.log(squCheck(r2));

// console.log(cyclicPerm(genArray(row),2,2));
// console.log(cyclicPerm(genArray(row),1,3));

// console.log(perm(genArray(row),3,1,0));

// console.log(permArray(genArray(row)));

// console.log(permArray(genArray(row)));

// console.log(delEntries(genArray(row),5));

// console.log(genPseudoku(row,3));

// console.log(visPseudoku(genPseudoku(row,5)));


// For the solve.js folder so you can import these fucnitons
module.exports = {
	genArray : genArray,
	colCheck : colCheck,
	squCheck : squCheck,
	genPseudoku : genPseudoku,
	visPseudoku : visPseudoku,
	row: row,
	r2 : r2
};






