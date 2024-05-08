# Lab 4B  - Node.js RESTful API

## Overview

You've created your Todo app in two different frameworks so far:

1. Vanilla HTML, CSS, and JavaScript
2. PHP

Now, you'll be creating what's called a "__RESTful API__" to handle all of your requests for you. __REST__ stands for **RE**presentational **S**tate **T**ransfer. It is an architectural style for web systems. __API__ stands for **A**pplication **P**rogramming **I**nterface, and ours (since it's RESTful) communicates with any front-end through the use of HTTP requests.

A simpler explanation is that it's a todo app, but the only way to interact with it is to make HTTP requests, instead of clicking things on an interface of some kind.

Our basic CRUD operations have their own HTTP verbs:

| CRUD Operation | HTTP Verb |
| -------------- | --------- |
| Create         | POST      |
| Read           | GET       |
| Update         | PUT       |
| Delete         | DELETE    |

These can and probably should all be utilized, but you'll find that most people will just use `GET` and `POST` for most things in the real world. [You can see some of the most used verbs here](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).

The beauty of setting up an API is that there is no front-end. That means that you can create a front-end on any device or any framework, and they can all communicate with the same database! After this lab, you'll be able to create an app on your phone, or a website, or an app on a Samsung Smart Refrigerator if you want!

### Functionality

- Running API that handles RESTful HTTP calls to modify a database
- Store data in a NoSQL Database hosted in the cloud (MongoDB using Atlas)

### Concepts

- REST services
- HTTP Verbs
- Express and Express Middleware
- NPM (Node Package Manager)
- Cloud Services: Hosting, Databases, etc.
- NoSQL Databases (MongoDB)
- OAuth

### Resources

- [Build A RESTful Api With Node.js And Express.Js Part One](https://medium.com/@purposenigeria/build-a-restful-api-with-node-js-and-express-js-d7e59c7a3dfb)
- [Building A REST API With MongoDB, Mongoose, And Node.js](https://www.thepolyglotdeveloper.com/2019/02/building-rest-api-mongodb-mongoose-nodejs/)
- [Express Documentation: Router](https://expressjs.com/en/5x/api.html#router)

### Assignments

Lab Writeup Instructions are in the "Content" tab in [Learning Suite](http://learningsuite.byu.edu).

## Instructions

We'll be using Visual Studio Code for this lab because of its simplicity and the availability of tools for Node.js applications.

### Step 1: Postman

You should have already installed Postman from Lab-4A. If not, download it [here](https://www.getpostman.com/products).

Postman has a UI that allows you to specify what the body of the HTTP request will be, which will be necessary for us. You can create a new request using the "+" button at the top of the screen. On the left, you'll see a dropdown that allows you to change the request type, and next to it a text box to put the URL. You'll want to create requests for each endpoint of your API (similar to what you did in Lab 4A). Make sure to fill out the Headers and Body sections when needed.

> Note: When filling out the Body data, make sure to change the type to `raw` and use the dropdown on the right to select `JSON`.

![Postman](postman.png)

### Step 2: Set up Google Authentication

Before moving on, we need to set up our Google Authentication API. To work with outside services, you usually need to register with them so that they know who's using their servers. In return, you'll get a key (a string of numbers and letters) which will allow your application to receive information from their servers. We'll get the key and set up our authentication.

1. Log in to Google's [Developer Console](https://console.developers.google.com). Create a new project, and call it something appropriate (like `ITC 210 Google Auth`). It will generate a project ID for you.

2. Go to the [Credentials](https://console.developers.google.com/apis/credentials) page for your project. This page can also be found by clicking on `APIs & Services` in the side menu, then `Credentials`.

    - Make sure you have selected the project you created in the last step (`ITC 210 Google Auth`)
    - Click `Create credentials` then `OAuth client ID`
        - If it forces you to set up your consent screen at this point, select `External` as the User type, enter your email where it asks for it, and leave the rest of the settings alone. Click `Save and Continue` until the Consent Screen setup is finished. Then click `Back to Dashboard`, click on `Credentials` again, and click `Create Credentials` then `OAuth client ID`.
    - Select `Web application` as the application type
    - Specify a name for your client
        - e.g. `ITC 210 Todo App`
    - Under the `Authorized redirect URIs` heading, add your callback URL to the list of authorized callback URLs at the bottom. It will have the form of `https://<API_ORIGIN>/api/v1/auth/google/callback` (don't include the `< >` brackets)
        > Note: You can add more redirect URIs later on in your project settings.
    - Click `Create`
        > Note: This created a unique client ID that we will use later to integrate Google Sign-in into our Visual Studio web application

We'll come back to this page later when we need to use our credentials in our code.

### Step 3: Setting up Node.js

You should already have Node.js installed on your computer from Lab 4A. If not, go back to the instructions for that lab and set it up. Make sure you install the LTS (Long-term support) version of Node. You can check that it's already installed by typing `node --version` into a command prompt. If it's installed, it will return the version; otherwise it will say it doesn't recognize the command.

#### Use the Template

Clone the Lab-4B repo onto your computer and open it in VSCode.

> Note: Before moving on, double check that you have a `.gitignore` file in the lab folder. Make sure there's a line in it that says `node_modules`. This file will tell Git that you don't want to commit anything in the `node_modules` folder, which gets [very](https://i.redd.it/j1ulcud873b31.png), [very](https://img.devrant.com/devrant/rant/r_1546733_HyZ3h.jpg), [very](https://img.devrant.com/devrant/rant/r_1030841_w7Mq9.jpg), [very large](https://i.redd.it/tfugj4n3l6ez.png).

#### Add Dependencies

We've provided a project `package.json` for you, which contains much of the setup and scripts that you'll need for this project.

1. Open a shell/command prompt to your project directory and run the following command:

    ```sh
    npm i
    ```

    > Note: This command installs all the packages and dependencies that are listed in the `package.json` file so that your project is up to date. `i` is shorthand for `install`. You can also run `npm install` if you like wasting your precious time typing instead of coding. ;)

2. Install the dependencies in the table below using the command:
   ```sh
    npm i <name of dependency from table>
    ```

    > **Dependencies** are other JavaScript files, or **Libraries**, that we can use for our API. As you'll learn, there are lots of different ways of saying the same thing in programming.

| Dependency | Usage |
| ---------- | ----- |
| [`mongoose`](https://www.npmjs.com/package/mongoose) | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. |
| [`passport`](https://www.npmjs.com/package/passport) | Passport is Express-compatible authentication middleware for Node.js. |
| [`passport-google-oauth`](https://www.npmjs.com/package/passport-google-oauth) | Passport strategies for authenticating with Google using OAuth 1.0a and OAuth 2.0. |
| [`connect-mongodb-session`](https://www.npmjs.com/package/connect-mongodb-session) | This module exports a single function that takes an instance of connect (or Express) and returns a MongoDBStore class that can be used to store sessions in MongoDB. |
| [`cors`](https://www.npmjs.com/package/cors) | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| [`express-session`](https://www.npmjs.com/package/express-session) | Create a session middleware. |

> Note: The rest of the dependencies, like `express`, were installed when you ran `npm i` since they were defined inside of the `package.json` file.

#### Environment Variables

When developing an application, sometimes you need to change variables depending on the environment you're developing in. Perhaps when you're developing, you're developing on your laptop, and you are serving the API through port `3001`, but when it goes to production, you want to serve it through port `8080` (the default port). For this project, we will use port `1337` for development and production. 

There should already be a file named `.env.example` in your repo. Rename it or make a copy of it called `.env` in the same directory as `app` (outside the `app` folder, but inside the `src` folder).

> Note: You should not be pushing `.env` files to GitHub. They often contain sensitive information like passwords which you don't want to make public. Check the `.gitignore` to make sure that `.env` is in there before you push anything to GitHub.

> Hint: If you run `npm start` without all your `.env` variables defined you will run into errors. The temporary values of the `.env.example` will stop any errors for now so we can test that our setup is working. 

> Now when you run your server by executing the command `npm start`, it will run it on `http://localhost:1337`!

We'll need to set up our cloud database first before we can set up the other environment values.

### Step 4: Setup a NoSQL Database in the Cloud
To get our website ready to develop, we need to connect it to a database. We'll use MongoDB so that we have practice using a NoSQL database. Fortunately, they have a free cloud-hosted service called [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) that we can use to set it all up.

In Atlas, we will set up a new database, create a new collection, add some data, and finally create a user that has access to it to be able to read and write data to the database.

1. Create an account, and it will take you to a page called `Deploy a cloud database`
2. Select "Shared"

    - Make sure you choose a server in the "Shared" tab unless you want to pay for this database
    - For example, choose `Google Cloud Platform`, and select the `Iowa (us-central1)` server

3. Name your cluster if you want, then click the `Create Cluster` button on the bottom of the screen

4. Once you are logged in, you'll see that Atlas will be setting up your database for you. It may take several minutes.

5. Once the setup has been completed, click on the `Database` tab on the left menu, then `Browse Collections`, then `Create Database`

    - Call the database `Todo`, and call the collection `Tasks`
      - __The casing is super important. It's called Pascal Case, and you should use it.__
    - __Don't__ check the box marked `Capped Collection`

6. Select `Database Access` from the `Security` sub-section in the left side menu

    - Click the `Add New Database User` button
    - Enter a username and a password
      - Username can be something like `todo-user`
      - Make the password something easy for testing
    - __Remember the username and password for later__
    - Make sure the "Database User Privileges" has "Read and write to any database" selected
    - Click `Add User`

7. Select `Network Access` from the `Security` sub-section in the left side menu

    - Click the `Add IP Address` button
    - Click `ADD CURRENT IP ADDRESS` and add a comment to say which network your computer is on currently (If you're in the lab, you can say "IT Lab" or something like that)
    - Click `Confirm`
    > Note: You'll have to do this every time you move your computer to a new network unless you allow access from anywhere, which is NOT a good idea.

### Step 5: Connect to Cloud DB
Now we need to get our Atlas Database hooked up. We will use Mongoose, an **Object Data Manager** (ODM), which makes communicating with our database much easier, and makes sure we use the proper data structures.

#### Connection

1. Go to your [Atlas Dashboard](https://cloud.mongodb.com) in the browser

    - Click the `Database` link on the left-side menu
    - Click `Connect > Drivers`
    - Choose `Node.js` for the `Driver`
    - Choose the latest version for the `Version`
    - Ignore the part about installing the driver and click `Copy` next to the connection string (make sure the toggle for `View full code sample` is disabled).

2. In Visual Studio Code, open the `.env` file in the `app` folder and add the following variable:

    ```shell
    ATLAS_CONNECTION_STRING="<the connection string to your Atlas mongodb database>"
    ```

    > Note: Don't forget to replace `<username>` and `<password>` with the info for the Database User you created.

    - After `.mongodb.net/`, add in your database name. Since our database name is `Todo`, it should look something like this: 
    ```shell 
    ATLAS_CONNECTION_STRING="mongodb+srv://todo-user:1234@clusterxxx.mongodb.net/Todo?retryWrites=true&w=majority"`
    ```

3. Open the empty `mongoose.js` file and do the following:
    - Import the `mongoose` package
    - Use mongoose's `connect` method to create a connection to the database
        - Check the docs by Googling "mongoose js"; the Getting Started page should have what you need
        - HINT: Use `process.env` to access the environment variables you created (that's how you get the Atlas connection string). (e.g. `process.env.ATLAS_CONNECTION_STRING`)
        - __DO NOT LEAVE THE ACTUAL CONNECTION STRING AS PLAIN TEXT IN THIS FILE. IF A TA CAN FIND YOUR CONNECTION STRINGS IN GITHUB BY SEARCHING THROUGH THE REVISION HISTORY, YOU'LL LOSE POINTS. IT'S IN THE `.env` FILE FOR A REASON.__
    - If you set up everything correctly, you can test the connection by making sure you `require()` the mongoose file in `app/index.js` and then running `npm start`. You should see your MongoDB connection message in the console that you set up in your callback function. 

#### Models

To make sure our data stays consistent, Mongoose allows us to create what is called a **Model**. Here, we will create a **JavaScript Class**, through the use of the built-in `Schema` class and `model()` function that came with Mongoose.

1. Open the `Task.js` file in the `app/models` folder

2. [Use the Mongoose documentation](https://mongoosejs.com/docs/guide.html#definition) to create a schema/model for your Tasks:
    > Note: In the documentation it uses `import mongoose from 'mongoose';` you will replace that line with `const mongoose = require('mongoose');` instead.
 
    - Be sure to export your new model using `module.exports` so you can use it in other files
    - Make sure you tell the schema constructor which collection your tasks should be stored in!
    - Give your Task model the following properties:

        | Property | Type      |
        | -------- | --------- |
        | `UserId` | `String`  |
        | `Text`   | `String`  |
        | `Done`   | `Boolean` |
        | `Date`   | `String`  |

3. Follow the same process in the `models/User.js` file to give your `User` class the following properties:

    | Property  | Type      |
    | --------- | --------- |
    | `Id`      | `String`  |
    | `Email`   | `String`  |
    | `UserName`| `String`  |

    > Note: Your user objects will be stored in the `Users` collection.

### Step 6: Authentication

When you open an API to the world wide web, you have to secure it unless you want potentially malicious actors flooding it with requests. We'll be doing that via the `googleapis` package. This library makes it easy to implement 3rd party authentication. We'll be using it to make sure only authorized users can POST/PUT/DELETE using our API.

#### Setup

Useful References:
- [Passport.js docs: Configure](http://www.passportjs.org/concepts/authentication/oauth/)
   - Make sure you're looking at the section titled "oAuth 2.0" and not "oAuth 1.0"
- [Passport.js docs: Google](http://www.passportjs.org/concepts/authentication/google/)

Open the `.env` file, and add the following variables. Fill in any values surrounded by `< >` appropriately (for example, `API_ORIGIN` should be `http://localhost:1337` for your development environment).

```shell
GOOGLE_CLIENT_ID="<client ID from https://console.developers.google.com/apis/credentials>"
GOOGLE_CLIENT_SECRET="<client secret from https://console.developers.google.com/apis/credentials>"
GOOGLE_CALLBACK_PATH="/api/v1/auth/google/callback"

API_ORIGIN="<the domain of your node API (during testing it will be http://localhost:1337)>"
```

#### Coding

1. Open the file `app/passport.js` and do the following:

    - Read through the code that is already in this file and try to figure out what it does as best you can. 
        - Using the Useful References above as a template, finish  `passport.use(new GoogleStrategy(...))`
            - Pull your `GOOGLE_CLIENT_SECRET` from your `.env` instead of a hard-coded string. DO NOT PUT YOUR GOOGLE SECRET IN PLAIN TEXT!!!
            - Instead of hard-coding the callback url, you already defined it in your `.env` file, and can access it like this:
            ```js
            callbackURL: `${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}`,
            ```
            - Use the `getOrCreateUser` method we provided in `util/index.js` to get the user. Import it with the following code: `const { getOrCreateUser } = require('./util')`.
                - Make sure to provide the appropriate argument(s)
     - `require()` this passport file in `app/index.js` like this:
     ```js
     const store = require(`./passport`)(session)
     ```
     > Note: This is different from the `passport` module being imported at the top of `index.js`.

     > Note: Remember this for when we set up the cookie in the next step. To help understand what is being passed to `app/index.js` look at what is exported at the bottom of `passport.js`.
     
2. In `app/index.js`, set up your session and cookie using [the express session middleware](https://www.npmjs.com/package/express-session) documentation, specifically the section that explains using secure cookies in production, but allowing for testing in development. Add your `const sess = {/.../}`, `if` statement, and `app.use(session(sess))` code in `app/index.js` just below where you `.use()` the `cookieParser()`.
    Here is an example from the documentation:
    ```js
    const sess = {
        secret: 'keyboard cat',
        cookie: {}
    }
 
    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sess.cookie.secure = true // serve secure cookies
    }
 
    app.use(session(sess))  // use the session with the attributes defined above
    ```
    > In this example, the `sess` variable contains all of the attributes of the session (`secret` and `cookie`). You can add additional attributes to the session here like `name`, `resave`, and `saveUninitialized`. 

    > The `if` statement uses an environment variable to check if the application is running in a `production` environment. You will set up this environment variable if you deploy your code on a live server. If the application is running in a `production` environment, it will use secure cookies. This is necessary because using secure cookies requires an HTTPS connection, so they will not work when you are testing locally in your `development` environment. 

    Modify the above example in the following ways:
    - For the secret, use `process.env` to access the environment variables that you created
    - Name your session `it210_session` so you can find easily it using the inspector and because it matches your unit tests
        - Hint: you will need to add a `name` property to the `sess` object
    - For the cookie, just set the `maxAge` to whatever you want (I set it for a week, which is 604,800,000‬ milliseconds!)
    - set `resave: false` and `saveUninitialized: true`
    - Add the word `store` to the end of the session initialization:
     ```js
     const sess = {
       /.../,
       store
     }
     ```

3. Add some code to prevent the cookies from being blocked. In the next lab, you will create a frontend to use your API backend. Since the front end will have a different URL than the API, some browsers might block the cookie. To fix this issue, you can set the cookie's `sameSite` attribute to `'none'`, which will allow the cookie to be sent to a different URL than the one it came from. To do this:
     - Set the `sameSite` attribute of the cookie to `'none'` inside the `if (app.get('env') === 'production')` statement, right after the `secure` attribute of the cookie is set to `true`. 
    > NOTE: Some browsers may still block these cookies in incognito mode or if you have configured your browser to block Cross-Site Cookies.

4. Create a new file in the `app/routes` folder called `auth.js`. In this file you will define all endpoints that deal with google authentication. You should use `tasks.js` and the [Passport.js docs: Google](http://www.passportjs.org/concepts/authentication/google/) as your references to make this file.

- Inside the `auth.js` file, there are three routes you need to have:
   - `router.get('/google')`
      - This route will redirect the user to google for authentication.
      - Instead of a route handler, just use `passport.authenticate('google', ....)`
      - Make sure to include the correct `scope` for the google strategy:
        ```js
        { scope: [`https://www.googleapis.com/auth/userinfo.email`] }
        ```
   - `router.get('/google/callback')`
      - This route will define what happens when google redirects back to your application.

      - You should have already set up what the callback route will be on your developers console (`http://<API_ORIGIN>/api/v1/auth/google/callback`).
      - If the session is saved correctly, redirect to a `CLIENT_ORIGIN` you will need to set up in your `.env`.
      - In the future you will set your `CLIENT_ORIGIN` to a Vue front end application, but for the moment, set your `CLIENT_ORIGIN` to `"<Your API ORIGIN>/api/v1/tasks"` so you can see the user's tasks after logging in if everything is working.
    ```js
    router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
        // This tries to save the session, and if it fails it makes sure the passport session is deleted via req.logout()
        req.session.save(err => {
            if (err) {
                req.logout()
                res.sendStatus(500)
            }
            else res.redirect(process.env.CLIENT_ORIGIN)
        })
    })
    ```

   - `router.get(/logout)`
    ```js
    //Logout route
   router.get(`/logout`, async (req, res) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.session.destroy()
            res.redirect(process.env.CLIENT_ORIGIN)
        });
    })
    ```       
    - Make sure to add an appropriate `app.use()` statement in `app/index.js` that uses your `auth.js` router.

5. In `app/index.js`, make sure your `app` `.use()`s `passport.initialize()` and `passport.session()` BEFORE it `.use()`s any routes.

6. Test your API by calling your login route in a browser at `<API_ORIGIN>/api/v1/auth/google`

    - If everything is set up correctly, you should be redirected to the Google Login page.
    - When it returns, you should see the tasks that belong to the logged-in user from the redirect in the `/google/callback` route.
    - Once that's done, you'll have a session cookie, and can test the path for getting the current user's object.
    - If you hit the `/api/v1/auth/logout` endpoint, the `/api/v1/user` endpoint should say "Unauthorized"


### Step 7: Create The Routes

Now that everything is set up, we'll start by setting up our __endpoints__.

__Endpoint__ is a fancy way of saying "this URL will handle HTTP requests for this kind of data". You'll see endpoints referred to as the second half of a URL, for instance, we can create an endpoint to handle all of the CRUD operations for our list of **tasks**: `/api/v1/tasks`. Everything before that text will be the actual address of our server. So, if you have a server at an IP address `155.122.2.33` on port `1337`, you could make a GET request to the endpoint by typing this into the browser:

```
http://155.122.2.33:1337/api/v1/tasks
```

> Note: It's good practice to version your API (i.e. the `v1` in `/api/v1/endpoint`) so that if you ever change the endpoints, it doesn't break any front-end applications that are using your API (i.e. instead of changing `/api/v1/endpoint`, you should create a new one: `/api/v2/endpoint`).

If we want the server to respond to HTTP requests, we need to tell it how to handle them. But first, we need our API to listen for requests.

For our endpoints, express provides functions for each of the CRUD operations. We need two for the **Read** operation, as we'll need to be able to get a single task or all tasks:

| Operation | Express Function |
| --------- | ---------------- |
| Create    | `.post()`        |
| Read      | `.get()`         |
| Update    | `.put()`         |
| Delete    | `.delete()`      |

1. In the file `app/routes/tasks.js`, import your `Task` model

2. Add 4 new routes:

    > Hint: Check what information you used in Lab 4A for the HTTP request to see the data and headers you need to use.
    - `.post('/')`
        - Create a new `Task` object using the `request.body` and `request.user` objects to populate it with data
        - Make an asynchronous request using Mongoose to `.save()` the new `task`, and save the results in a variable
        - Use the `res` variable to `.send()` the result back to the requester with a `201` status (Created)
        - Surround the process in a `try catch` statement, and catch any errors
        - If there are errors, log them to the console with `console.error()` and use the `res` object to send a `500` error (Server Error)
    - `.get('/')`
        - Use the `Task` class to `.find()` all of the tasks for the authenticated user
        - Use the `res` object to `.send()` the tasks back to the client
    - `.put('/:id')`
        - Use the `Task` class to update the task
        - Use the `res` object to `.send()` the task back to the client
    - `.delete('/:id')`
        - Use the `Task` class to delete the task
        - Use the `res` object to `.send()` a message back to the client

    > Explanation of `async/await`: Using `async` and `await` is a newer JavaScript feature which allows for cleaner code. Essentially, adding `async` before a function definition will tell JavaScript that it may have to stop executing code for a while if it finds an `await` statement. Here, you'll put `await` in front of any request to the database. JavaScript will stop executing on that line, and won't run the next line until the `await` line is finished.

    > Explanation of response codes: [There are plenty of generally accepted response codes available](https://www.restapitutorial.com/httpstatuscodes.html) to use in your app. The most important thing is that they make sense to anyone who wants to use your API. (my favorite is `420`)

3. In `app/index.js`, just above the export, have your `app` `.use()` the router.
    - Make sure to include a version to your API in the path:
        - `/api/v1/tasks`
    - Also, make sure to use the `authenticate` method we provide to you in `util`
        - This is imported with the following code:
            - `const { authenticate } = require('./util')`
        - You can easily just add it as a parameter to the `.use()` method AFTER the path parameter, but BEFORE the router parameter

4. In Postman, create new requests to test all of your endpoints.
    - Make sure each request uses the proper HTTP Verb
    - Fill in the URL with the appropriate endpoint attached (`http://localhost:1337/api/v1/tasks`)
    - For requests that need a body:
        - Select the `Body` tab
        - Select the `raw` radio button
        - Select `JSON (application/json)` from the dropdown to the right of the radio buttons
        - Type in some appropriate JSON for the selected endpoint
    - Test your endpoints and make sure you see the changes in your database on Atlas
   >Hint: you may want to temporarily remove the `authenticate` parameter in your `/api/v1/tasks` `app.use` statement for testing purposes. Just don't forget to put it back after you are done testing. 

### Step 8: Testing

Use your Lab 4A unit tests to test and fine tune your code. You will have to do some error checking in each of your endpoints and return different status codes to get all of your unit tests to pass. You will have to login to your application using the routes you created. Copy the URL and cookie using the inspector and edit your `api.test.js` file to run the tests on your API until they all pass. When all tests have passed, you know you have a working API!

### Step 9: Hosting

Once your code is pushed to your GitHub repo, you'll need to do the following to prepare your production environment:
  
1. MongoDB
    - You should already have a static (elastic) IP address for your server. Add it to the `Network Access` on MongoDB Atlas.

2. Google Developer Console
    - You should already have a domain. Add your public domain to the authorized Redirect URIs in the Google Developer Console `https://<your_domain.itc210.net>:1337/api/v1/auth/google/callback`

3. Update Server Firewall rules
    - In the AWS console, go to your `Instance summary` and select the `Security` tab

    - Under the heading `Security Groups` click on the link then click on `Edit inbound rules`

    - Verify that a rule for HTTPS exists with its `source` set to `Anywhere-IPv4`

    - Add another rule where the type is `Custom TCP`, the `Port range` is `1337` and the `source` is `Anywhere-IPv4`

    - Select `Save rules`

4. Server Set Up
    - Install Node.js
        - We need to install node.js from a Linux binary file. DO NOT install it through the `apt` package manager. Ubuntu's repositories contain a very old version of node which will not work with your code.
        - Run the following commands on your live server:
            ```bash
            cd ~
            curl -o node.tar.xz https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz
            tar xf node.tar.xz
            sudo mv node-v20.11.1-linux-x64 /opt/
            nano ~/.profile
            ```
        - Then, edit the `~/.profile` file with your favorite editor (e.g. `nano ~/.profile`) and add the following lines to the bottom of the file:
            ```bash
            # Node.js
            export NODEJS_HOME=/opt/node-v20.11.1-linux-x64/bin
            export PATH=$NODEJS_HOME:$PATH
            ```
        - We want your server to work with your custom domain. However, the SSL certificate is owned by root, so we need to change it to be owned by the `ubuntu` user so node can use it:
            ```sh
            sudo chown ubuntu -R /etc/letsencrypt
            ```
        - Save the file and exit, then run the `. ~/.profile` command
            > Note: As of the time of writing, the current LTS version of node.js is 20.11.1. This will change in the future, so adjust the previous commands according to what version you downloaded.

    - Clone your repo onto the server into your home directory.
    
    - Inside your repo, run `npm i` to install dependencies. Make sure to install all the dependencies mentioned in the "Add Dependencies" section at the top of these instructions.

    - Create a `.env` file in the `src` folder of your project using `nano` or `vim` or `vi` or `emacs` if you think you're really something.

    - Add all of the variables from your development `.env` file to your production `.env`, editing `API_ORIGIN` and `CLIENT_ORIGIN` to use the base-url of `https://<your_domain.itc210.net>:1337`. Edit `DOMAIN` to be `<your_domain.itc210.net>`. Also, uncomment `NODE_ENV=production` in your `.env` file so that your server will run in the `production` environment.

    - Try to start your Node.js application by running `npm start` 

    - Test your API by calling your login (`api/v1/auth/google`) route in a browser, this time using your public domain. Make sure you are using `https` and not `http` to access your API.

    - If everything is set up correctly, you should be redirected to the Google Login page.
    - When it returns, you should be able to get the cookie from your browser and run your unit tests on the live server as well.

And just like that, you have created a beautiful RESTful API!!

### Step 10: Documentation

Part of a good API is good documentation. You've used plenty of documentation so far, and you know that sometimes the documentation isn't very good (*COUGH COUGH PHP COUGH COUGH*). Your documentation will, therefore, be incredible.

Using proper markdown syntax (what this lab writeup was written with), edit your `README.md` to have an entry for every endpoint. Each entry should include:

1. Description (purpose) of the endpoint
2. Path Parameters (if applicable) and corresponding descriptions, in a markdown table
3. Request Body JSON Example (if applicable) in a markdown multiline code block, with syntax highlighting
4. Response Body JSON Example in a markdown multiline code block, with syntax highlighting

Use appropriate headers where applicable

> Hint: Click the `RAW` button at the top of this document to see what I typed with my bare hands that made this document look so incredibly spectacular!

# Node.js RESTful API Pass-off

## Pass-off Requirements

- [ ] 5 Points - First commit is on or before Friday

- [ ] 8 Points - Application is deployed to a live cloud server

- [ ] 4 Points - Source code is pushed to GitHub

- [ ] 9 Points - Secrets are protected:
  - `.env` file is not found on GitHub
  - There are no hard-coded secrets in `passport.js`
  - There are no insecure hard-coded strings that can be found in any commit in your GitHub repo (passwords, connection strings, etc)

- [ ] 14 Points - Site is secure:
  - User is unable to access `/api/v1/user` in browser unless logged-in
  - User is able to access `/api/v1/user` and `/api/v1/tasks` in browser after logging in
  - User can log in with Google via `api/v1/auth/google` endpoint
  - After logging in, there is a cookie called `it210_session`

- [ ] 15 points - API passes all unit tests from Lab 4A.

- [ ] 6 Points - `README.md` provides useful notes on how to use the API
 
- [ ] 4 Points - Code is neat and tidy with appropriate comments when useful


> For extra credit to apply, all pass-off requirements need to be met

# Extra Credit

> Note: TAs cannot help you with extra credit!

- [ ] 5 Points - Routers use named functions instead of anonymous functions, and the named functions have [JSDoc comments](https://jsdoc.app/about-getting-started.html) describing what they are

# Writeup Questions

- List three advantages to using a web API.
- What are the differences between these four HTTP methods: GET, POST, PUT, and DELETE? Which ones are idempotent?
