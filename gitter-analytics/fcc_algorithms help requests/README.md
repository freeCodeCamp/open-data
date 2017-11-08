# fcc_algorithms help requests

Series of projects estimating and analysing the number of help requests in the Gitter main room.

# observations

* Several

# projects & datasets

### Total help per algo

A visualization using horizontal bars with interactive button to sort the bars according to number of requests or challenge's position in the curriculum. D3.js + Python (data collection and preparation, **Python code not included yet in the subfolder**).

* dataset : `data.json` list of objects
	* example of an object:
	```
	{'count': 336,                  //number of times help was count
	  'funcname': 'reversestring',	//the name of the function as presented in the exercise
	  'order': 1,			//order in the curriculum
	  'title': 'Reverse a String',	//the name of the exericse
	  'type': 'basic'},		//kind of algorithm (basic, intermediate, advance)
	```	
