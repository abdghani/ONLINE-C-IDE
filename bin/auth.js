var local = {
	"port":process.env.OPENSHIFT_NODEJS_PORT || 3000,
	"ip":process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	"mongooseUrl":process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/cide',
	"facebook":{
		'id':'604563053034421',
		'secret':'ee874f05d79fff8123f3d9f1cb0fd8e5',
		'callback': 'http://localhost:3000/login/facebook/return'
	},
	"google":{
		'id':'380568024732-gr2q8kpjaq6e3oo7672quvkvrl91pnhe.apps.googleusercontent.com',
		'secret':'nUnn3C98gBDSPZEc6M4VUQQk',
		'callback':'http://localhost:3000/login/google/callback'
	}

}

var global = {
	"port":process.env.OPENSHIFT_NODEJS_PORT || 3000,
	"ip":process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	"mongooseUrl":process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/cide',
	"facebook":{
		'id':'1055527944494417',
		'secret':'d682b980d11136bd375b6a58e7e5d00b',
		'callback': 'http://cide-makepost.rhcloud.com/login/facebook/return'
	},
	"google":{
		'id':'380568024732-gr2q8kpjaq6e3oo7672quvkvrl91pnhe.apps.googleusercontent.com',
		'secret':'nUnn3C98gBDSPZEc6M4VUQQk',
		'callback':'http://cide-makepost.rhcloud.com/login/google/callback'
	}

}

module.exports = local;