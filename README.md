## Create a Task
- Description: Create a task
- Path: ```/api/v1/tasks```
- Method: ```POST```
#### Request Body JSON Example
```
{
"Text": "Walk the dog",
"Date": "06/03/2024"
}
```
#### Response
```
{
"_id": "new_task_id",
"UserId": "user_id",
"Text": "Walk the dog",
"Date": "06/03/2024",
"Done": false
}
```

## Get Current User
- Description: Retrieves the current user after authenticating 
- Path: ```/api/v1/user```
- Method: ```GET```
#### Response ```200 OK```
```
{
"id": 123,
"username": "ivett",
"email": "ivett@example.com",
}
```
#### Response ```500 Internal Server Error```
```
{
"error": "Sorry, there was a problem."
}
```
