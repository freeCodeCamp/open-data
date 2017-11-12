# database-dumps

This project was described for the first time on [freeCodeCamp's Medium publication](https://medium.freecodecamp.org/free-code-camp-christmas-special-giving-the-gift-of-data-6ecbf0313d62). 

# observations

* Big dataset coming from the freeCodeCamp database.

# projects & datasets

## dump2015

The first iteration of this project. 

* dataset: `output.json`, json file with list of lists, each nested list representing a user and having as elements objects of his/her activity. Activity was recorded as objects of 3 datapoints. Example:
```
[
  {
    “name”: “Waypoint: Say Hello to HTML Elements”,
    “completedDate”: 1445854025698,
    “solution”: “<h1>Hello World</h1>\n”
  }
]
```
	* First iteration of the project accessible through BitTorrent, requires to get a BitTorrent client. Currently available at [Academic Torrents](http://academictorrents.com/details/030b10dad0846b5aecc3905692890fb02404adbf). The downloaded file name is `output.json`.
	* Big dataset, requires around 4Gb of memory for the dataset only.

* dataset: `outputsample.json`, json file, each nested list representing a user and having as elements objects of his/her activity; names of each object is the index of the record as found in the big dump. Example:
```
{1: [
  {
    “name”: “Waypoint: Say Hello to HTML Elements”,
    “completedDate”: 1445854025698,
    “solution”: “<h1>Hello World</h1>\n”
  },
  {...}
],
30:[...],
...
}

```

	* a random sample of the previous dataset with a 1% of the data only for records with at least 3 datapoints; empty records or with less of 3 datapoints were excluded.
	* extraction code (python):

```
import os, sys
import json
import random


directory = "/bigdumpdata"

datred = defaultdict(int)
counter = -1
sample = {}
with open(directory+"/output.json", "r") as f_in:
    while 1:
        record = f_in.readline()
        counter += 1
        if not record:
            break
        if len(record) > 3:
            try:
                if random.uniform(0,1) <= .01:
                    recordjson = json.loads(record[:-2])
                    rec = sorted([(rec["completedDate"],rec["name"]) for rec in recordjson if "name" in list(rec.keys()) and "completedDate" in list(rec.keys())])
                    if rec == []:
                        continue
                    recordjson = json.loads(record[:-2])
                    sample[counter] = recordjson

            except ValueError:
                if record == '':
                    continue

with open(directory+'/outputsample.json','w') as f_out:
    json.dump(sample, f_out)
```

### sankey-FCCdump

A visual exploration of part of the dataset using a Sankey Diagram; d3.js and Python.
