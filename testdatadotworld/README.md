# DATA EXAMPLE WITH DATADOTWORLD

This project is about something related to fCC. The datasets are large and have been saved in [datadotworld](https://data.world/).

## Instructions

### How to access the datasets?

To access the datasets you will have to register in [datadotworld](https://data.world/). By registering you can either download the datasets into your computer manually or accessing it through code. Access through code is based on datadotworld API and SDK's. Currently there are only SDK's for Python and R.

Please take in account that every project is different and that the datasets are presented in different formats, so before proceeding consider to **read about the dataset structure somewhere in this repository**!

### How to access the datasets using the API and SDK's?

* After registration, visit your "Settings" page, "Advanced", to get your token. Please DON'T SHARE that with anyone!
* The API works per account: only one token will give you access to others' datasets
* We provide steps for the Python SDK:
  * You must have Python installed. The tests have been done with Python v3.x on a Linux-based machine.
  * Install the `datadotworld` package. Usually done with pip: `pip install datadotworld`
  * Then run the following line in your terminal: `dw configure`. Have your token by hand: it will ask for it.
    * This configuration will create a hidden folder in your home directory with a Python file only containing information about the token.
  * Alternatively, tokens can be provided via the DW_AUTH_TOKEN environment variable.
  * After configuration, you are ready to use the `datadotworld` package in Python.
  
### How to access the datasets with Python's `datadotworld` package?

There are different ways to access the datasets. Available instructions on Internet are mostly for datasets in csv format. Just check the [datadotworld package documentation](https://pypi.python.org/pypi/datadotworld) to find more.

Below you will find instructions when the dataset is not in csv format, but for example `zipfile` or `pickle`.

```
import datadotworld

#dataset = datadotworld.load_dataset('https://data.world/ectest123/survey-2016') #notice the name in the url: 
# I changed the name of the project to "Amphibians" but it was not updated in the url !!

dataset = datadotworld.load_dataset('https://data.world/ectest123/testdatasets') #the API seems to read one file per project and several for datasets; there is no distinction between both in the url, the owner must know

dataset.describe() # to get a description of the "dataset", which is actually the project
# output was:
#{'title': 'TestDatasets', 'resources': [{'path': 'data/bouwprojecten.csv', 'name': 'bouwprojecten', 'format': #'csv'}, {'format': 'pkl', 'path': 'original/allamphibians.pkl', 'name': 'original/allamphibians.pkl', 'mediatype': #'application/octet-stream', 'bytes': 269171}, {'format': 'csv', 'path': 'original/bouwprojecten.csv', 'name': #'original/bouwprojecten.csv', 'mediatype': 'text/csv', 'bytes': 143452}, {'format': 'zip', 'path': #'original/bouwprojecten.zip', 'name': 'original/bouwprojecten.zip', 'mediatype': 'application/zip', 'bytes': #18608}], 'name': 'ectest123_testdatasets', 'homepage': 'https://data.world/ectest123/testdatasets'}

for f in [dataset.dataframes, dataset.tables, dataset.raw_data]: #listing only raw_data because all pickled files are binary
      print(f)

#output was:
#{'bouwprojecten': LazyLoadedValue(<pandas.DataFrame>)}
#{'bouwprojecten': LazyLoadedValue(<list of rows>)}
#{'original/bouwprojecten.zip': LazyLoadedValue(<bytes>), 'bouwprojecten': LazyLoadedValue(<bytes>), #'original/allamphibians.pkl': LazyLoadedValue(<bytes>), 'original/bouwprojecten.csv': #LazyLoadedValue(<bytes>)}

### working on the pickle file

unpickled = pickle.loads(dataset.raw_data['original/allamphibians.pkl']) #use the `loads` method, not the `load` method
# unpickled is my file!

### working on the zipfile
# check the following references:
# --- https://stackoverflow.com/questions/9887174/how-to-convert-bytearray-into-a-zip-file
# --- https://docs.python.org/3/library/io.html
# --- http://code.activestate.com/recipes/52265-read-data-from-zip-files/

import zipfile
import io

f = io.BytesIO(dataset.raw_data['original/bouwprojecten.zip'])
uzf = zipfile.ZipFile(f, "r")
uzf.namelist() 
# output => ['bouwprojecten.csv']

```

### I want to know more about how to work datasets with the Python's `datadotworld` package?

* There is a course for free in DataCamp (https://campus.datacamp.com/courses/intro-to-dataworld-in-python/) to show how to use the datadotworld API for Python in combination with pandas library
* Example of working the working with python AND github with datadotworld ---> https://www.dataquest.io/blog/datadotworld-python-tutorial/

## More information about `datadotworld`

* It has some presence in Medium with its own publication (https://meta.data.world/) as well as in some Data Science related articles
* It uses Spark and some big data capabilities; the platform offers some features to explore and manipulate datasets, including a Workspace
* The API is "queriable" in SparSQL; see also Other capabilities, using SparSQL and the UI https://data.world/jonloyens/an-intro-to-dataworld-dataset
