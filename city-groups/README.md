# city-groups

Efforts by some freeCodeCamp students focused on representing data about city groups (formerly campsites) as a collective project started at the Gitter's Data Science Room.

# observations

* This sub-folder includes visualizations (2D and 3D), scrapers to mine platforms such as Facebook, GoogleMaps or relevant urls, and some analytics.
* Technologies include D3.js, THREE.js, node.js.
* In some cases data became deprecated or not existent; an example is the freeCodeCamp project known as the Wiki, which was target of one of the scrapers when residing in Github, but changed substantially after moving to the freeCodeCamp forum.

# projects & datasets

### THREE_JS_GLOBE

A 3D representation of fCC City Groups

Dataset: user_locations.json (json file with a list of coordenates and a proportion of users calculated based on undeclared source, data points by position)


### FccCityScraper

A nodejs scraper designed to extract information about City Groups from a now unexisting fCC Wiki at Github


### FccCityScraper2

A nodejs scraper designed to extract information about City Groups from Facebook, getting the Facebook links from the Forum and then using GoogleMaps API to locate the City Group

The scraper:
- Made a scrap on Forum, `forum.freecodecamp.com/t/freecodecamp-city-based-local-groups` to get the list of City Groups
- Queried Facebook Graph for some data about City Groups
- Using the Forum data, determined city and country and reversely tried to get coordinates
