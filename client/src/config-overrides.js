const { alias } = require('react-app-rewire-alias');

module.exports = function override(config, env) {
	alias({
		'@components': 'src/components',
		'@customization': 'src/customization',
		'@RTK': 'src/RTK',
		'@utilities': 'src/utilities',
	 })(config);
	 
	return config;
}