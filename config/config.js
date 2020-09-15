const config = {
	port      : process.env.PORT || 3000,
	db        : process.env.MONGOLAB_URI || 'mongodb://localhost/api',
	test_port : 3001,
	test_db   : 'mongodb://localhost/api_test'
};

module.exports = config;
