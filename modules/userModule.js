'use strict';

var config = require("../config/config.js"),
request = require('request'),

request = request.defaults({
    jar: true
});


var userModule = {
    commands: [
        'um'
    ],

    onCommand: function (command, query, platform, state) {
        var userModuleCallback = function (err, response, body) {
            if (err) {
                platform.error(err, state);
                return;
            }
			if (response.statusCode == 200) {
                console.log(response);
			    platform.message("Succesfully posted to userModule", state);
			} else {
			    platform.failMessage("Posting to userModule failed",state);
			}
        };
        userModuleCallback.state = state;
        platform.typing(state);

        request(
            {
                method: 'POST',
                url: '',
                headers: {
                	"X-API-Token" : config.userModule.token
                },
                json: {
                },
            },
            userModuleCallback
        );

    }
};


module.exports = userModule;