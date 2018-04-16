const io = require('./index').io;
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING  } = require('../Events')

module.exports = function(socket) {
    console.log("Socket Id:" + socket.id);

    //Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:createUser({name:nickname})})
		}
	})

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user

		sendMessageToChatFromUser = sendMessageToChat(user.name)
		sendTypingFromUser = sendTypingToChat(user.name)

		io.emit(USER_CONNECTED, connectedUsers)
		console.log(connectedUsers);

    })
    
    //User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
	})


	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

	socket.on('message', (obj)=>{
		console.log("Socket.on message :" + obj.message);
	})

	/*
	* Returns a function that will take a chat id and message
	* and then emit a broadcast to the chat id.
	* @param sender {string} username of sender
	* @return function(chatId, message)
	*/
	function sendMessageToChat(sender){
		return (chatId, message)=>{
			io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
		}
	}
}