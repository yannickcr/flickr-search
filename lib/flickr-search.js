(function() {

	// Default configuration
	var defaultConfig = {
		api_uri: 'http://api.flickr.com/services/rest/',
		api_key: null
	};

	// Constructor
	window.Flickr = function(userConfig) {
		this.config = defaultConfig;
		for (var i in userConfig) {
			if (!userConfig.hasOwnProperty(i)) continue;
			this.config[i] = userConfig[i];
		}
	};

	// Temporary array for callbacks
	window.Flickr._jsonCallback = [];

	// Generic request method
	window.Flickr.prototype.request = function(params, callback) {
		var
			id   = Math.round(Math.random() * 1e9), // Generate a random ID for the request
			s    = document.createElement('script'),
			r    = document.getElementsByTagName('script')[0],
			args = [],
			i
		;

		// Append additional parameters to the request
		params.format = 'json';
		params.api_key = this.config.api_key;
		params.jsoncallback = 'Flickr._jsonCallback[' + id + ']';

		// "Serialize" parameters
		for (i in params) {
			if (!params.hasOwnProperty(i)) continue;
			args.push(i + '=' + params[i]);
		}

		// Store the callback in the temporary array
		window.Flickr._jsonCallback[id] = this._handleResponse.bind(this, id, callback, s);

		// Construct the request then append the script element in the page
		s.src = this.config.api_uri + '?' + args.join('&');
		r.parentNode.insertBefore(s, r);
	};

	// Generic response handler
	window.Flickr.prototype._handleResponse = function(id, callback, script, res) {
		// Cleaning
		delete window.Flickr._jsonCallback[id];
		script.parentNode.removeChild(script);

		// Handle errors
		if (res.stat === 'fail') return callback(res, null);

		// Return the request results to the callback
		callback(null, res);
	};

	// Photo search helper
	window.Flickr.prototype.search = function(params, callback) {
		params.method   = 'flickr.photos.search';
		params.extras   = params.extras || 'url_t,url_q';
		params.per_page = params.per_page || 50;
		this.request(params, callback);
	};

	// Interesting photos helper
	window.Flickr.prototype.interesting = function(params, callback) {
		params.method   = 'flickr.interestingness.getList';
		params.extras   = params.extras || 'url_l';
		params.per_page = params.per_page || 50;
		this.request(params, callback);
	};

	/*
	 * Helper boilerplate
	 *
	 *	window.Flickr.prototype.whatyouwant = function(params, callback) {
	 *		// Append additional parameters to the request
	 *		params.method = 'flickr.method'; // Mandatory, you MUST set a method
	 *		// Launch the request
	 *		this.request(params, callback);
	 *	};
	 */

})();