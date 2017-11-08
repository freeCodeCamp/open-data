# google-analytics

Collected datasets from Google Analytics.

# observations

* Datasets will show only data that we estimate are not sensitive or critical to put in risk people or organizations related to fCC.

# projects & datasets

### challenges-performance-estimates

A dataset with some calculations of the overall performance of students at the fCC challenges based on data collected from Google Analytics, with a final table organised according to the curriculum existing by the time of the collection.

This product was eventually used to re-order some challenges in the Beta Curriculum (2017). See https://github.com/freeCodeCamp/CurriculumExpansion/issues/89.

Some no related variables to the analysis were deleted from the file.

* dataset: time per page for challenges, targeted fCC curriculum, and calculations `content-pages-challenges-performance-estimates.xlsx` (xls-like format) collected before Jan 2017; curated by @evaristoc
	* Raw - content-pages: raw data collected from Google Analytics about average time-per-page for each challenge
	* Raw - GA Time Page Report Mod: parsing of the time variable (in minutes)
	* Raw - Curriculum Page: copy/paste of the fCC curriculum
	* Raw - GA Events Mod: estimate of success based on a custom variable that checks the number of (successful) trials per challenge; called later EVENT RATIO
	* Table - Challenge Solving Time: table showing an ad-hoc metric based on average time-per-page / event ratio 


### countries-fCC

A curated file with ordinal variables based on several data that combined several reports:
* total sessions 2015-2016 (Google Analytics)
* internet connectivity and population sizes ([WEF](https://www.weforum.org/reports/the-global-information-technology-report-2015), Wikipedia data)
* city groups (aka campersites) estimated from formerly collected data by the fCC Team, now deprecated
* English proficiency, based on http://www.ef.nl/epi/

The original data exists with raw values for all the points.

The raw data was used in the following projects:
* http://bl.ocks.org/evaristoc/1d19701fb9dfe5ecbbbc
* https://medium.freecodecamp.org/english-size-connectivity-and-campsites-factors-driving-the-use-of-free-code-camp-worldwide-3c9d4e2b8c17

* dataset `analysisofcountriesFCC.csv`
	* 'country'
	* 'number of sessions' : based on total per country, values are not given - only an ordinal ranking; 1 = lowest
	* 'internet population' : based on total per country, values are not given - only an ordinal ranking in descending order; 1 = highest
	* 'ses/intpop' : number of sessions / internet population values, then ordinal ranking; 1 = lowest
	* 'ses/48% of tot population' : number of sessions by the 48% of total population, ordinal ranking; 1 = lowest
	* 'connectivity index' : based on data from WEF NRI reports, ordinal ranking; 1 = lowest
	* 'ordered by number of citygroups' : based on total per country, values are not given - only an ordinal ranking; 1 = lowest
	* 'ISO3136' : ISO of country name
	* 'engprof' : English Proficiency according to EF reports
