// CASH REGISTER

// Define dictionary parsing functions

// Multiply two dicts by values
function multDict(dict1, dict2) {
	let finalDict = {}
	for (let key in dict1) {
		finalDict[key] = dict1[key] * dict2[key]
	}
	return finalDict
}

// Divide two dicts by values
function quotDict(dict1, dict2) {
	let finalDict = {}
	for (let key in dict1) {
		finalDict[key] = dict1[key]/dict2[key]
	}
	return finalDict
}

// Subtract two dicts by values
function diffDict(dict1, dict2) {
	let finalDict = {}
	for (let key in dict1) {
		finalDict[key] = dict1[key] - dict2[key]
	}
	return finalDict
}

// Scale a dict by a variable
function scaleDict(dict1, scale) {
	let finalDict = {}
	for (let key in dict1) {
		finalDict[key] = dict1[key] * scale
	}
	return finalDict
}

// Convert list to dict
function listToDict(list) {
	let finalDict = {}
	for (let index in list) {
		finalDict[list[index][0]] = list[index][1]
	}
	return finalDict
}

// Convert dict to list
function dictToList(dict) {
	let finalList = []
	for (let key in dict) {
		finalList.push([key, dict[key]])
	}
	return finalList
}

// Crunch a dict into the sum of its values
function sumUpDict(dict) {
	let sum = 0
	for (let key in dict) {
		sum += dict[key]
	}
	return sum
}

// Reduce a dictionary into keys that only have values above zero
function reduceDict(dict) {
	let finalDict = {}
	for (let key in dict) {
		if (dict[key] != 0) {
			finalDict[key] = dict[key]
		} 
	}
	return finalDict
}

// Sorts a dictionary according to another
function dictCopySorter(dict1, dict2){
	let finalDict = {}
	for (let key in dict2) {
		finalDict[key] = dict1[key]
	}
	return finalDict
}

// Sorts a list in descending order
function listSorter(list) {
	return list.sort((a,b) => b[1] - a[1])
}

function checkCashRegister(price, cash, cid) {
	// Define currency values
	let scaler = 100
	let currValues = {"ONE HUNDRED": 100, "TWENTY": 20,
                   	"TEN": 10, "FIVE": 5, "ONE":1,
                    "QUARTER": 0.25, "DIME": 0.1, 
                    "NICKEL": 0.05, "PENNY": 0.01}
    currValues = scaleDict(currValues, scaler)

	// Convert cash in drawer to a scaled dict
	// Params cidDictV = cid dict in values
	// 		  cidDictQ = cid dict in quantity
	let cidDictV = scaleDict(listToDict(cid), scaler)
	let cidDictQ = quotDict(cidDictV, currValues)

	// Evaluate change
	let change = (cash - price)*100
	let changeDue = change

	// CREATE CHANGE DICTIONARY
	// Params changeDictV = change dict values
	//		  changeDictQ = change dict quantity
	let changeDictQ = {"ONE HUNDRED": 0, "TWENTY": 0,
                   	"TEN": 0, "FIVE": 0, "ONE": 0,
                    "QUARTER": 0, "DIME": 0, 
                    "NICKEL": 0, "PENNY": 0}

    // Go through each currency types
    for (let key in changeDictQ) {
    	// if the change due is more than or same as this currency's value
    	while (changeDue >= currValues[key]) {
    		// then if drawer contains atleast one of this currency
    		if (cidDictQ[key] >= 1) {
    			// Add one of this currency to the change dictionary
    			changeDictQ[key] += 1
    			// Change due is now less by this currency's value
    			changeDue -= currValues[key]
    			// Quantity of cash in drawer is now less by one of this currency 
    			cidDictQ[key] -= 1
    		}
    		// if the drawer doesn't have this currency move on to the next currency
    		else {break}
    	}
    }

    let changeDictV = multDict(changeDictQ, currValues)

    // EVALUATE RETURN CONDITIONS
    // Default return
    let retValue = {status: "", change: []}

    // Unscale values
    cidDictV = scaleDict(cidDictV, 0.01)
    changeDictV = scaleDict(changeDictV, 0.01)

    // if there's still change due then status is insufficient balance
    if (changeDue > 0) {
    	retValue.status = "INSUFFICIENT_FUNDS"
    	retValue.change = []
    }


    else if (changeDue == 0) {
    		// if there's no change due and sum of cash in drawer is 0
    		if (sumUpDict(cidDictQ) == 0) {
    			retValue.status = "CLOSED"

          // Params: arrangedChange is just a way to reduce confusion due
          //         nested functions
          let arrangedChange = dictCopySorter(changeDictV, cidDictQ)
    			retValue.change = listSorter(dictToList(arrangedChange))
    		}

    		// if there's no change due and sum of cash in drawer is more than 0
    		else if (sumUpDict(cidDictQ) > 0) {
    			retValue.status = "OPEN"

          let arrangedChange = reduceDict(dictCopySorter(changeDictV, cidDictQ))
    			retValue.change = listSorter(dictToList(arrangedChange))
    		}

    		else {return "something went wrong"}
    }

    else {return "something went wrong"}

    console.log(retValue)
    return retValue
}


checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])


