![FreeCodeCamp](https://camo.githubusercontent.com/60c67cf9ac2db30d478d21755289c423e1f985c6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f66726565636f646563616d702f776964652d736f6369616c2d62616e6e65722e706e67)
This open-api project is a [FreeCodeCamp](http://www.freecodecamp.com) spin-off. Join FreeCodeCamp to learn to code and help nonprofits.

# open-api Project

## About

Free Code Camp's open API initiative is an implementation of the FreeCodeCamp's open-data policy. The open API exposes user performance and some more details on Free Code Camp users. Third parties are encouraged to develop tools to present FCC user data in a creative way. 


## Getting Started

The FCC open API exposes FCC user statistics for third party applications. The API allows access to:
* User summary list
* Single user details

Note: The API is currently in Alpha test, being hosted on [Heroku](https://fccapi.herokuapp.com)
The data is an offline extract taken from the real FCC user database. Because of limited resources, only the 50,000 most active users are extracted. Once the API is stable, it will be integrated in the Freecodecamp domain.

### Getting an API key
All requests must have a API-key in the request. In this stage there is no online resource to generate an API-key. If you want an API key for your app, please ask for it on the [FreeCodeCamp/DataScience Gitter](https://gitter.im/FreeCodeCamp/DataScience). The API-key is specified in the query string as `key=<value>`.

### User summary list
This endpoint returns a list of summary user data. Optionally you can set filters on some items and sort the results. For pagination the API supports limit and skip options. To reduce the amount of data, the challenges details are only returned if you ask for it.

The general endpoint is `<host>/v1/users/<options>`.
##### Options 
| **Key**                              | **Value**         | 
| -------|-------------|
| key | Your API key |
| skip  |Number of records to skip |
| limit | Number of returned records (max = 100)|
| details | Show the challenge details if details=true |
| sort |Sort the results on some of the items. You can define multiple items to sort on, separated by comma's. Use a minus sign to indicate a decending sort.  |
| <itemname>={< or >}value  | Set a filter on some of the items. Use the itemname as a quey string parameter. Use the < prefix to select rows with value less than and use > to select values greater. |
---
**<itemname>** is one of: 'username', 'algorithmsRecent', 'algorithmsTotal', 'challengesRecent', 'challengesTotal', 'helpsRecent', 'helpsTotal', 'hikesRecent', 'hikesTotal', 'otherRecent', 'otherTotal', 'pointsRecent', 'pointsTotal', 'projectsRecent', 'projectsTotal'

##### Examples
| URL | Returns |
|---|---|
| https://fccapi.herokuapp.com/v1/users/key=?? | List the first 100 users |
| https://fccapi.herokuapp.com/v1/users/key=??&limit=3&skip=4 | List 3 users, starting with user 5 |
| https://fccapi.herokuapp.com/v1/users/key=??&sort=-username | List the first 100 users and sort descending on username |
| https://fccapi.herokuapp.com/v1/users/key=??&algorithmsRecent=>10&projectsTotal=15&limit=10 | List the first 10 users that have recently completed more than 10 algorithms and have exactly completed 15 projects in total |

### Single user data
This endpoint returns the data for a single user. You need to know the username to use it, because that is the only key. The returned data can be extended by asking for details. 

The general endpoint is `<host>/v1/user/:username?<options>`.
##### Options 
| **Key**                              | **Value**         | 
| -------|-------------|
| key | Your API key |
| details | Show the challenge details if details=true |

##### Examples
| URL | Returns |
|---|---|
| https://fccapi.herokuapp.com/v1/user/mrx/key=??&details=true | List the details for user mrx |


