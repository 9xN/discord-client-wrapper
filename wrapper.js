module.exports = function(token) {
    /*
       CLASS VARIABLES.
    */
    var self = this;
    self.apiToken = token;
    self.apiBase = 'https://discord.com/api/v9/';
    self.cdnBase = 'https://cdn.discordapp.com/';
    self.request = require('request');
    self.fs = require('fs')

    /*
       REUSABLE FUNCTIONS.
    */
    self.httpRequest = function(method, url, headers, post, callback) {
        self.request({
            'method': method,
            'url': url,
            'headers': headers,
            'body': post,
        }, function(error, /*response,*/ data) {
            if (!error) {
                callback(data);
            }
        });
    };

    self.apiRequest = function(method, path, post, callback) {
        self.httpRequest(method, self.apiBase + path, {
            'x-requested-with': 'XMLHttpRequest',
            'authorization': self.apiToken,
            'content-type': post ? 'application/json' : 'application/x-www-form-urlencoded'
        }, post, callback);
    };
    self.cdnRequest = function(path, filename, callback) {

            self.request.head(self.cdnBase + path, function(err, res, body){
    
              self.request(self.cdnBase + path).pipe(self.fs.createWriteStream(filename)).on('close', callback);
            });
          };

    /*
       MAIN FUNCTIONS.
    */
    self.joinServer = function(inviteCode, callback) {
        self.apiRequest('POST', 'invites/' + inviteCode, null, callback);
    };

    self.leaveServer = function(serverId, callback) {
        self.apiRequest('DELETE', 'users/@me/guilds/' + serverId, null, callback);
    };

    self.getServers = function(callback) {
        self.apiRequest('GET', 'users/@me/guilds', null, callback);
    };

    self.getServerInfo = function(channelId, callback) {
        self.apiRequest('GET', 'guilds/' + channelId, + '/channels' + null, callback);
    };

    self.sendMessage = function(channelId, message, callback) {
        self.apiRequest('POST', 'channels/' + channelId + '/messages', JSON.stringify({
            'content': message,
            'nonce': Date.now(),
            'tts': false
        }), callback);
    };

    self.deleteMessage = function(channelId, messageId, callback) {
        self.apiRequest('DELETE', 'channels/' + channelId + '/messages/' + messageId, null, callback);
    };

    self.getMessages = function(channelId, amount, callback) {
        self.apiRequest('GET', 'channels/' + channelId + '/messages?limit=' + amount, null, callback);
    };

    self.addReaction = function(channelId, messageId, reaction, callback) {
        self.apiRequest('PUT', 'channels/' + channelId + '/messages/' + messageId + '/reactions/' + reaction + '/@me', null, callback);
    };

    self.removeReaction = function(channelId, messageId, reaction, callback) {
        self.apiRequest('DELETE', 'channels/' + channelId + '/messages/' + messageId + '/reactions/' + reaction + '/@me', null, callback);
    };

    self.isTyping = function(channelId, callback) {
        self.apiRequest('POST', 'channels/' + channelId + '/typing', null, callback);
    };

    self.changeNickname = function(serverId, nickname, callback) {
        self.apiRequest('PATCH', 'guilds/' + serverId + '/members/@me/nick', JSON.stringify({
            'nick': nickname
        }), callback);
    };

    self.updateStatus = function(status, callback) {
        self.apiRequest('PATCH', 'users/@me/settings', JSON.stringify({
            'status': status
        }), callback);
    };

    self.updateUserSettings = function(username, email, password, newPassword, avatarBase64, callback) {
        self.apiRequest('PATCH', 'users/@me', JSON.stringify({
            'username': username,
            'email': email,
            'password': password,
            'new_password': newPassword,
            'avatar': avatarBase64,
            'discriminator': null
        }), callback);
    };

    self.createServer = function(name, region, icon, callback) {
        self.apiRequest('POST', 'guilds', JSON.stringify({
            'name': name,
            'region': region,
            'icon': icon
        }), callback);
    };

    self.deleteServer = function(serverId, callback) {
        self.apiRequest('POST', 'guilds/' + serverId + '/delete', JSON.stringify({}), callback);
    };

    self.createChannel = function(serverId, name, parentId, type) {
        self.apiRequest('POST', 'guilds/' + serverId + '/channels', JSON.stringify({
            'name': name,
            'parent_id': parentId,
            'type': type,
            'permission_overwrites': []
        }), callback);
    };

    self.deleteChannel = function(channelId, callback) {
        self.apiRequest('DELETE', 'channels/' + channelId, null, callback);
    };

    self.createRole = function(serverId, callback) {
        self.apiRequest('POST', 'guilds/' + serverId + '/roles', null, callback);
    };

    self.deleteRole = function(serverId, roleId, callback) {
        self.apiRequest('DELETE', 'guilds/' + serverId + '/roles/' + roleId, null, callback);
    };

    self.joinHypesquad = function(houseNumber, callback) {
        self.apiRequest('POST', 'hypesquad/online', JSON.stringify({
            'house_id': houseNumber
        }), callback);
    };

    self.createInvite = function(channelId, callback) {
        self.apiRequest('POST', 'channels/' + channelId + '/invites', JSON.stringify({
            'max_age': 0,
            'max_uses': 0,
            'temporary': false
        }), callback);
    };

    self.getUserRelationships = function(callback) {
        self.apiRequest('GET', 'users/@me/relationships', null, callback);
    };

    self.getUserInfo = function(callback) {
        self.apiRequest('GET', 'users/@me', null, callback);
    };

    self.getIcon = function(userID, avatarEN, outputName, callback) {
        self.cdnRequest('avatars/' + userID + '/' + avatarEN + '.png', outputName, callback);
    };

};
