## Introduction:
Ivett Betlej

May 17, 2024

Lab 4

## Executive Summary:
This lab implements a RESTful API and allows the user to create and interact with a Todo list using HTTP requests. 
The data is stored in MongoDB using Atlas, a document database hosted in the cloud. 
Unit tests are also included to diagnose issues and test functionality. 

## Design Overview:
The following UML diagram shows the basic architecture of the web API. 
The swim lanes in the UML show what components interact with each other, and how the different objects communicate between the front- and backend.

#### UML of how the API works

<img width="693" alt="Screenshot 2024-05-16 at 5 34 52 PM" src="https://github.com/BYU-ITC-210/lab-4b-IvettB/assets/77896065/7922dfe5-6701-47f5-a896-7fe5551423d9">

As indicated in the UML diagram above, the user starts by requesting to login by going to the ```/api/v1/auth/google``` endpoint. This triggers the application to display the Google Login page, where the user is prompted to input their email and password. Then, Google’s API validates the provided credentials. If the user is authorized, the application displays the user’s tasks in a list. If the user is not authorized, the application displays an “Unauthorized” message. 


#### User Endpoint

<img width="1102" alt="Screenshot 2024-05-16 at 3 46 36 PM" src="https://github.com/BYU-ITC-210/lab-4b-IvettB/assets/77896065/027740fe-6135-4ca5-8803-18a5cf36037e">

The user endpoint retrieves information about the current user, including the email, username, and user ID. This page can be reached by requesting the ```/api/v1/user``` endpoint. This information is only displayed if the user is first authenticated and logged in by Google. If the user is not authenticated, an “Unauthorized” error message appears on the screen instead of the user’s information, as mentioned before. The user endpoint helps the user identify which account they’re logged into.


#### Tasks Endpoint

<img width="1185" alt="Screenshot 2024-05-16 at 3 49 26 PM" src="https://github.com/BYU-ITC-210/lab-4b-IvettB/assets/77896065/bd94b611-bdb2-4817-9973-7060a2d983b0">

The tasks endpoint (```/api/v1/tasks```) retrieves the list of all tasks in the database associated with the current, logged-in user. Notice that the user ID is the same for each task. Additionally, “Text” is displayed which is the user’s description of the task, and “Date”, which is the date input the user provided when requesting to add the given task to the list. There is also a boolean “Done” value associated with each task. This marks whether the task has or has not been completed. The task ID is another important information that allows the user to interact with a certain task. For example, if the user wishes to change a task from not done to done, they would need this task ID to request that change in the database.


#### Google Login

<img width="1433" alt="Screenshot 2024-05-16 at 3 55 37 PM" src="https://github.com/BYU-ITC-210/lab-4b-IvettB/assets/77896065/7992236a-3e68-42d5-ae71-1827b3f8264b">

The API uses Google Authentication to login the user. When the user requests the ```/api/v1/auth/google``` endpoint, they are redirected to a Google login page to enter their email and password and become an authenticated user. 


#### File Descriptions
* routes/auth.js - Authenticates and logs the user in and out.
* routes/tasks.js - Handles the HTTP requests.
* routes/user.js - Returns the current user object after being authenticated.
* models/Task.js - Creates a Mongoose Model/Schema for the Task.
* models/User.js - Creates a Mongoose Model/Schema for the User.
* index.js - Serves as the entry point for the API server.
* mongoose.js - Creates the connection to MongoDB Atlas.
* passport.js - Initializes the passport.
* api.js - Creates a new API instance.
* api.test.js - Implements unit tests to test the API’s functionality.

## Questions:
* List three advantages to using a web API.
    * Web APIs are a great resource to developers. Rather than starting each new program from square one, developers can skip certain tasks by using previously implemented components, improving efficiency.
    * Web APIs improve automation, making previously manual tasks into seamless and simple processes.
    * Web APIs can be accessed by various applications such as mobile apps, desktop apps, and web applications. This means that with one API, users can seamlessly interact across various platforms. 
* What are the differences between these four HTTP methods: GET, POST, PUT, and DELETE? Which ones are idempotent?
    * GET: It is used to retrieve or read data from a specific server. This method does not allow access to updating the data in any way, it is simply used to get the information.
    * POST: It is used to update a resource on the server using the information stored in the body of the HTTP request. This means that the update will happen based on some parameter that the user requests to change.
    * PUT: It is used to send new information to the server and create a new resource. The new information is stored in the body of the HTTP request.
    * DELETE: It is used to delete data from the server.
    
   GET, PUT, and DELETE are idempotent methods, while POST is not idempotent.
 
## Lessons Learned:
#### Network Access and Security
MongoDB Atlas security limits network access to only approved IP addresses. This means that at each new location, the developer needs to login to MongoDB Atlas and add their current IP address to the approved IP addresses for the server to run. If the current IP address is not authenticated, the server doesn’t start up. To solve this issue, the user has to navigate to MongoDB Atlas, Network Access, and click on Add IP Address on the right-hand side, then add their current IP Address to the approved IP Addresses list. Then, restart the server.

#### Postman Session Cookies
To receive response data with Postman, a session cookie needs to be acquired from the instance, and captured in Postman. Without the current session’s cookie, Postman will not be able to communicate with the server and the client. To acquire the session cookie, go to the URL where the session is hosted (for example: http://localhost:1337/api/v1/tasks). Right-click, inspect, click on Application (may be hidden behind the double arrows), click on the cookie icon, then select a session. Then, in Postman, click on Cookies on the right-hand side, then click add cookie, and change the cookie name and value acquired from the URL's session cookie. Then hit save, and now Postman is connected to the current session.

#### Updating a Task
When updating a task, it is important to send back the task object with the updated task, and not the result of the update query. One might think that the following code will update the task and send back a true Done value:

```
var updatedTask = await Task.updateOne({_id: req.params.id}, {Done: req.body.Done})
```

However, this code is incomplete. updateOne takes in what we would like to change as its first parameter, and what we would like to change it to as its second parameter. However, req.body.Done doesn’t return a true or false value, it just returns the result of a query, which means that instead of the expected true value, we get an undefined error when testing the Update handler. The following is the correct solution to update a task:

```
var updatedTask = await Task.updateOne({_id: req.params.id}, {Done: req.body.Done})
                task.Done = req.body.Done
```

This sets the task object’s Done value equal to the request body Done’s value, and this object can now be sent as a response.

## Skills Acquired / Conclusions:
- Use Postman: Make requests, interpret responses, and efficiently use for debugging
- Install packages using npm
- Use Google’s Developer Console to set up Google Authentication 
- Setup a NoSQL Database in the Cloud (MongoDB Atlas)
- Connect to Cloud DB using Mongoose
- Setup endpoints using Node.js
- Write Unit Tests using Node.js
- Host the server on the web using a custom public domain

## References:
https://medium.com/@mandeepkaur1/what-is-an-api-and-why-are-they-important-to-developers-98ad18d45b93

https://www.reloadly.com/blog/api-benefits-for-business/

https://medium.com/@cogziesys/web-api-why-to-choose-and-benefits-34139e84fd50

https://blog.dreamfactory.com/what-is-idempotency/

https://sematext.com/glossary/http-requests/
