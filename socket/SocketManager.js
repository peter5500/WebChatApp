const io = require('./socket_server').io;
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING  } = require('./Events')

module.exports = function(socket) {
    console.log("Socket Id:" + socket.id);

    // //Verify Username
	// socket.on(VERIFY_USER, (nickname, callback)=>{
	// 	if(isUser(connectedUsers, nickname)){
	// 		callback({ isUser:true, user:null })
	// 	}else{
	// 		callback({ isUser:false, user:createUser({name:nickname})})
	// 	}
	// })

	// //User Connects with username
	// socket.on(USER_CONNECTED, (user)=>{
	// 	connectedUsers = addUser(connectedUsers, user)
	// 	socket.user = user

	// 	sendMessageToChatFromUser = sendMessageToChat(user.name)
	// 	sendTypingFromUser = sendTypingToChat(user.name)

	// 	io.emit(USER_CONNECTED, connectedUsers)
	// 	console.log(connectedUsers);

    // })
    
    // //User disconnects
	// socket.on('disconnect', ()=>{
	// 	if("user" in socket){
	// 		connectedUsers = removeUser(connectedUsers, socket.user.name)

	// 		io.emit(USER_DISCONNECTED, connectedUsers)
	// 		console.log("Disconnect", connectedUsers);
	// 	}
	// })


	// //User logsout
	// socket.on(LOGOUT, ()=>{
	// 	connectedUsers = removeUser(connectedUsers, socket.user.name)
	// 	io.emit(USER_DISCONNECTED, connectedUsers)
	// 	console.log("Disconnect", connectedUsers);

	// })

	// //Get Community Chat
	// socket.on(COMMUNITY_CHAT, (callback)=>{
	// 	callback(communityChat)
	// })

	// socket.on(MESSAGE_SENT, ({chatId, message})=>{
	// 	sendMessageToChatFromUser(chatId, message)
	// })

	// socket.on(TYPING, ({chatId, isTyping})=>{
	// 	sendTypingFromUser(chatId, isTyping)
	// })

	socket.on('messageToServer', (obj, roomName)=>{
		io.to(roomName).emit('messageToClient', obj);
		console.log(`Server get! Room:${roomName} username: ${obj.username} message obj.message: ${obj.context}`);
	})
 
	socket.on('joinToServer', (obj, roomName)=>{
		io.to(roomName).emit('joinToClient', obj);
		const {username} = obj
		socket.leave("dashboard")
		socket.join(roomName)
		console.log(`Server join! Room:${roomName}, username: ${username}`);
	})

	socket.on('leaveToServer', (obj, roomName)=>{
		socket.leave(roomName)
		socket.join("dashboard")
		io.to(roomName).emit('leaveToClient', obj);
		const {username} = obj
		console.log(`Server left! username: ${username}`);
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