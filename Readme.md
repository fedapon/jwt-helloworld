# jwt-express-authentication

This is a simple implementation of the authentication process with jwt and express. There are three endpoints:

- **/api/singin** - To add a new user to the system (no persistence layer).
- **/api/login**- To login to the system, validate password and get token to use resources.
- **/** - The protected resource for testing. You have to send the 'Authorization' key with the bearer token (the one you got from singin or login) in the head of the request.

 They can be tested using  ***Postman***. The collection is in root folder.

### Requirements

Node.js v14+

### Installation

First of all, you have to clone the project using:
```
$ git clone https://github.com/fedapon/jwt-helloworld.git
```

Next, we must install dependencies:

```
$ npm install
```

Now, to compile the typescript code into javascript and start running the app, you can execute the next script:

```
$ npm run start
```

or, if we want to use nodemon to restart the app in every change, you can use:

```
$ npm run dev
```

Finally the server will be running on http://localhost:3000/ (unless you change the used port in the .env file).



### Reference libraries used in the challenge:

expressjs - https://expressjs.com/en/5x/api.html

jsonwebtoken - https://github.com/auth0/node-jsonwebtoken
