# CS498RK MP3 Server Side Code

##Overview

Stuff all about the project heres how to do a link [Firebase](https://www.firebase.com)

## Design

The API is based at http://jwaterman-todo.herokuapp.com/api
Here are the specific endpoints and the actions that are supported through the API

Endpoints | Actions
------|------------
users | GET, POST, OPTIONS
users/id | GET, PUT, DELETE
tasks | GET, POST, OPTIONS
tasks/id | GET, PUT, DELETE

In addition, the api supports the following JSON encoded query string paramaters for the GET requests

Paramater | Description
------|------------
where | Filter results based on the JSON query
sort | specify the order in which to sort the specified field (1:ascending, -1:descending)
select | specify the set of fields to include or exclude in each document (1:include, 0:exclude)
skip | specify the number of results to skip in the result set; useful for pagination
limit | specify the number of results to return (default should be 100 for tasks and unlimited for users)
count | if set to true, return the count of documents that match the query (instead of the documents themselves)

Here are some examples queries and what they would return

Query Endpoint | Description
------|------------
users?where={"_id": "55099652e5993a350458b7b7"} | Returns a list with a single user with the specified ID
tasks?where={"completed": true} | Returns a list of completed tasks
tasks?where={"_id": {"$in": ["235263523","3872138723"]}} | Returns a set of tasks
users?sort={"name": 1} | Returns a list of users sorted by name
users?select={"_id": 0} | Returns a list of users without the _id field
users?skip=60&limit=20 | Returns user number 61 to 80

An example of a sucessful GET:task return. The "message" component supplies a quick status for error handling. The "data" component contains the JSON response object.

```json
{
    "message": "OK",
    "data": {
                "_id":"55d42f0d232c5d9c1bc23d2f",
                "name": "Take out the laundry",
                "description": "Mom said the laundry needed to be done. ugh!",
                "deadline": "2015-08-19T07:23:57.947Z",
                "completed": false,
                "assignedUser": "55d42ecc232c5d9c1bc23d2c",
                "assignedUserName":"Jacob Waterman",
                "deadline":"2015-08-27T05:00:00.000Z"
            }
}
```
