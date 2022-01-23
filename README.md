# Cash Register

# Overview
The cash register function is meant to simulate the way an hypothetical cash register machine would function, 
the following are details on the goal of the project:
1.	The machine has a certain amount of money in the drawer
2.	The drawer contains various currrency types e.g. dollar, penny, dime etc.
3.	The value of each currency relative to a dollar is given
4.	A customer makes a purchase, pays in cash and expects a change
5.	The machine is required to automatically calculate the exact amount of currencies
	it should pick from the available cash in the drawer to complete the change
6.	Certain outputs should be returned by the cash register depending on the relationship between
	the customer's change and cash in the drawer

# Built with
- Javascript

# Parameters
The cash register function takes in three arguments:
1. Price (int): cost of the customer's purchase (in dollars)
2. Cash (int): The exact amount paid by the customer (in dollars)
3. Cash in drawer (list): The value of each currency in the drawer in form
			  of a list of lists e.g. [["PENNY", 1.01], ["NICKEL", 2.05],...]

# Return conditions
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, 
or if you cannot return the exact change. Say cash in drawer is a single 100 dollar bill and 
change is 25 dollars.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if 
it is equal to the change due. 

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, 
sorted in highest to lowest order, as the value of the change key.
