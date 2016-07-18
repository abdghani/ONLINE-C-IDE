
var global = {
	"port":process.env.OPENSHIFT_NODEJS_PORT || 3000,
	"ip":process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	"mongooseUrl":process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/cide',
	"facebook":{
		'id':'##############',
		'secret':'#####################################',
		'callback': 'http://cide-makepost.rhcloud.com/login/facebook/return'
	},
	"google":{
		'id':'######################################################',
		'secret':'#############################',
		'callback':'http://cide-makepost.rhcloud.com/login/google/callback'
	}

}

module.exports = global;
