### dump2015

The first iteration of this project was described for the first time on [freeCodeCamp's Medium publication](https://medium.freecodecamp.org/free-code-camp-christmas-special-giving-the-gift-of-data-6ecbf0313d62). 

This dataset is available as a BitTorrent document and can be downloaded from [Academic Torrents](http://academictorrents.com/details/030b10dad0846b5aecc3905692890fb02404adbf). The downloaded file name is `output.json`.

# observations

* First iteration of the project accessible through BitTorrent, requires to get a BitTorrent client.
* Big dataset, requires around 4Gb of memory for the dataset only.

Dataset:

* json file with list of lists, each nested list representing a user and having as elements objects of his/her activity
* activity was recorded as objects of 3 datapoints:
```
[
  {
    “name”: “Waypoint: Say Hello to HTML Elements”,
    “completedDate”: 1445854025698,
    “solution”: “<h1>Hello World</h1>\n”
  }
]
```

* data about 100,000 students between 2014 and 2015; only data of those who opted-in to make public their profiles
* see the page of the dataset at Academic Torrent for more details 

# projects & datasets

### sankey-FCCdump

A visual exploration of part of the dataset using a Sankey Diagram; d3.js and Python.
