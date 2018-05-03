#Quick look of the Chatroom ☺
* Heroku URL: https://stark-brook-76535.herokuapp.com/ <br>
* Chatroom ☺
    * Web App
    * HTTP Server(connected to MongoDB)
    * WebSocket Server
``` npm install ``` to install server-side modules
```cd client && npm install``` to install client-side modules

``` npm start ``` to start React dev server.
Administrator login in as `admin` for username and password

###Login : Simple but Safe
- `register` and `login` with one simple click
- support `cookie` of the browser using `React-cookie`, easy to import users information next time 
- input restrictions are applied both front-end and back-end, say no to dirty data
- `passport.js` applied, the passwords encrypted all the way
- using session to identify the users, track our users better

###Chatroom : Delicate Experience
- concise and delicate room UI, learn to use with only a glance
- `system notification` for user joined / left , catch the every update of the room
- display `online member/number` for every minute
- join in the chat too late? of course `history messages` is supported

###Multi-rooms : Chat at Will
- input room name to join a room with your friends
- input room name does not exsist? Don't worry, we just created one and put you in after your input

###Resistance Data
- all room data, user data, and messages stored with `MongoDB`

###Future expetation
- third-party login, like Facebook Login
- roll random dices in the chatroom
- allow user to change icon



