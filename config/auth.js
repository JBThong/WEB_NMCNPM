// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID'        : '1093847504053808',
        'clientSecret'    : '027846a1a1cb7a5bc509df469cdbb470',
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        // 'profileFields'   : ['id', 'emails', 'name','profileUrl','photos'] 
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}
};