var client = new(require('./wrapper.js'))('TOKEN');

//Join Server

client.joinServer('invite code', function(data) {
    console.log(data);
});

//Leave Server

client.leaveServer('server id', function(data) {
    console.log(data);
});


//Get Servers

client.getServers(function(data) {
    console.log(data);
});


//Send Message

client.sendMessage('channel id', 'message', function(data) {
    console.log(data);
});


//Delete Message

client.deleteMessage('channel id', 'message id', function(data) {
    console.log(data);
});


//Get Messages

client.getMessages('channel id', 50, function(data) {
    console.log(data);
});


//Add Reaction

client.addReaction('channel id', 'message id', 'emoji', function(data) {
    console.log(data);
});


//Remove Reaction

client.removeReaction('channel id', 'message id', 'emoji', function(data) {
    console.log(data);
});


//Is Typing

client.isTyping('channel id', function(data) {
    console.log(data);
});


//Change Nickname

client.changeNickname('server id', 'new nickname', function(data) {
    console.log(data);
});


//Update Status

client.updateStatus('status', function(data) {
    console.log(data);
});


//Update User Settings

client.updateUserSettings('username', 'email', 'password', 'new password', 'data:image/jpeg;base64,Hq..', function(data) {
    console.log(data);
});


//Create Server

client.createServer('server name', 'location', 'data:image/jpeg;base64,H8q..', function(data) {
    console.log(data);
});


//Delete Server

client.deleteServer('server id', function(data) {
    console.log(data);
});


//Create Channel

client.createChannel('server id', 'channel name', 'channel parent id', 'channel type', function(data) {
    console.log(data);
});


//Delete Channel

client.deleteChannel('channel id', function(data) {
    console.log(data);
});


//Create Role

client.createRole('server id', function(data) {
    console.log(data);
});


//Delete Role

client.deleteRole('server id', 'role id', function(data) {
    console.log(data);
});


//Join Hypesquad

client.joinHypesquad(hypesquad number, function(data) {
    console.log(data);
});


//Create Invite

client.createInvite('channel id', function(data) {
    console.log(data);
});


//Get Friends List

client.getUserrelationships(function(data) {
    console.log(data);
});


//Get Info From Token

client.getUserInfofromToken(function(data) {
    console.log(data);
});

//Get Icon
client.getIcon('user id', 'avatar hash', 'name of image to save.png', function(data) {
    console.log(data)
    
});
