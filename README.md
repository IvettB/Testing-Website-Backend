## Create a Task
- Description: Based on given text and date, a new task is created.
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
- Description: After authentication, the current user is retrieved. 
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

## Update a Task
- Description: Given a task ID, the task gets updated to Done or Not Done in the list of tasks.
- Path: ```/api/v1/tasks/:id```
- Method: ```PUT```
  #### Request Body JSON Example
  ```
  {
  "Text": "Updated this task",
  "Date": "06/03/2024",
  "Done": "true"
  }
  ```
  #### Response
  ```
  {
  "_id": "updated_task_id",
  "UserId": "user_id",
  "Text": "Updated this task",
  "Date": "06/03/2024",
  "Done": true
  }
  ```

  ## Delete a Task
- Description: Given a task ID, the task gets deleted from the list of tasks.
- Path: ```/api/v1/tasks/:id```
- Method: ```DELETE```
  #### Response
  ```
  {
  "Task with id: task_id has been deleted."
  }
  ```

  ## Additional Notes
  #### How to start your server:
- Open a new terminal window and navigate to ```src``` in your project. Once in the ```src``` folder, type ```npm start``` in your            terminal and hit enter. You should see the following if your server is successfully running:
   <img width="361" alt="Screenshot 2024-05-15 at 10 46 18 AM" src="https://github.com/BYU-ITC-210/lab-4b-IvettB/assets/77896065/aba42bc0-0712-4bc5-957d-4858ff2cf7f9">
   
- Debug: If your server doesn't start up, your current IP address is not added! Navigate to your Cluster on MongoDB Atlas and add your       current IP address.
