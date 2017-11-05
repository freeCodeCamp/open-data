# challenges-performance-estimates

An dataset with some calculations of the overall performance of students at the fCC challenges based on data collected from Google Analytics, with a final table based on the prevalent curriculum existing by the time of the collection.

# observations

* This product was eventually used to re-order some challenges in the Beta Curriculum (2017). See https://github.com/freeCodeCamp/CurriculumExpansion/issues/89.
* Some no related variables to the analysis were deleted from the file.

# projects & datasets

* dataset: time per page for challenges, targeted fCC curriculum, and calculations `content-pages-challenges-performance-estimates.xlsx` (xls-like format) collected before Jan 2017; curated by @evaristoc
	* Raw - content-pages: raw data collected from Google Analytics about average time-per-page for each challenge
	* Raw - GA Time Page Report Mod: parsing of the time variable (in minutes)
	* Raw - Curriculum Page: copy/paste of the fCC curriculum
	* Raw - GA Events Mod: estimate of success based on a custom variable that checks the number of (successful) trials per challenge; called later EVENT RATIO
	* Table - Challenge Solving Time: table showing an ad-hoc metric based on average time-per-page / event ratio 






