### sankey-fCCdump

This project was a two way exploration.

On one side was looking to provide visual insights to the following questions:
> Can our campers be broken down into cohort groups based on challenge completion behavior?
> Is there a challenge completion tempo that typifies high-achieving campers? One that typifies slow-and-steady campers?

(Both by @QuincyLarson)

On the other, tried the Sankey technique to provide those clues.

For that, the dataset was converted into an aggregate of data marking the progress of a cohort of students as "steps" and identified those steps based on the name of the challenges they were taking. In that way, it was expected to get some information about the "typical" steps and see if there were countable typical trajectories.

The graph shows that the followed cohort of students were indeed starting within a typical trajectory, that trended to break up and diversify a bit more after the students have gone through about 7 different challenges, divide in almost 2 similar trajectories after 11 challenges, and then becomes again a single typical trajectory with many other small chosen trajectories alongside. It also showed steps at which the diversification was deeper than others. The graph also gives some insights about the decline in the number of students (indicated by the width of the bands) along the curriculum progression. 


# observations

* Python for the data preparation; D3.js was chosen for the analysis.
* This folder has been added as a summary of the original work which was kept online, https://bl.ocks.org/evaristoc/2d6c4f8c06c64768f119.
* This is the single documented project so far made around the dump2015 dataset; if any other project, there is no known reports.

# projects & dataset:

* dataset used for Sankey diagram: `scr/datatreatment/sankeyrevisedmod.json`
* dataset of nodes for the Sankey diagram: `scr/datatreatment/nodesmod.json`
* dataset of links for the Sankey diagram: `scr/datatreatment/linksmod.json`
