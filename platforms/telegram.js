'use strict';

var Bot = require('node-telegram-bot'),
    config = require('../config/config.js');

var telegramPlatform = function (mokumanonybot) {
    var self = this;

    self.typing = function (state) {
        self.botInstance.sendChatAction(
            {
                chat_id: state.message.chat.id,
                action: 'typing'
            },
            function (nodifiedPromise) {
            }
        );
    };

    self.message = function (text, state) {
        self.botInstance.sendMessage(
            {
                chat_id: state.message.chat.id,
                text: text
            },
            function (nodifiedPromise) {
            }
        );
    };

    self.failMessage = function (text, state) {
        self.botInstance.sendMessage(
            {
                chat_id: state.message.chat.id,
                text: text
            },
            function (nodifiedPromise) {
            }
        );
    };

    self.debug = function (obj, state) {
        console.log(obj);
        // console.log(obj.message.document.file_id);
        // console.log(obj.message.document.file_name);
    };

    self.error = function (err, state) {
        console.error(err);
    };

    self.botInstance = new Bot({ token: config.telegram.token });

    self.botInstance.on('message', function (message) {
        if(message.text){
            var parameters = message.text.split(' ');
        }
        var state = {
            message: message,
            parameters : parameters
        };

        //Commented out so I don't see any user data
        //self.debug(state);
        mokumanonybot.onMessage(self, state.parameters, state);
    });

    self.botInstance.start();
};

module.exports = telegramPlatform;
