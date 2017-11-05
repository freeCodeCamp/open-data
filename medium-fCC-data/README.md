# medium-fCC-data

Collected datasets about fCC in Medium.

# observations

* Recent project.

# projects & datasets

* dataset: stats of titles of articles in freeCodeCamp Medium, `fccmediumTitles - Cleaned_Data.tsv` (tab-separated file) curated by @evaristoc
  * data collected before 12-Oct-2016
  * "Quartier" : quartier of the year
  * "date"  : as "MM yyyy"
  * "Title" : unparsed title of the article
  * "Recommends"  : number of Recommends as defined by Medium Team by the date the data was collected
  * "Read ratio"  : percentage of people who view the article and then read it, "*difference between your reads and views*"

* dataset: stats of titles of articles in freeCodeCamp Medium + title class, `medium_titles - rawdata.tsv` (tab-separated file) curated by @evaristoc  * data about titles between Jan-2016 and Jan-2017
  * "order" : acquisition order (by date)
  * "inv-ord"  : inverted order
  * "selection"  : for analytical purposes, 0 or 1
  * "CollTitle" : title of the article, unparsed
  * "CorrectedTitle" : parsed CollTitle
  * "OrigRecommends"  : unparsed number of Recommends as defined by Medium Team by the date the data was collected
  * "classification" :
	* TECH : technical
	* MOT : motivational
	* SEC : security
	* JOB : job-related
	* CS  : computer science
	* WD  : web development
	* DES : design
	* PM  : project management
	* DS  : data science
	* FCC : institutional (about fCC)
	* AD  : advertising
	* CB  : Code Briefings
	* OTHER : other
  * "Recommends"  : parsed number of Recommends as defined by Medium Team by the date the data was collected
  * "Class_WD" : articles with the WD class; 0=False,1=True
  * "Class_WD&CS" : articles with either the WD class or the CS class; 0=False,1=True
