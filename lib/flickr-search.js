(function() {

	var defaultConfig = {
		api_uri: 'http://api.flickr.com/services/rest/',
		api_key: null
	};

	window.Flickr = function(userConfig) {

		this.config = defaultConfig;
		for (var i in userConfig) {
			if (!userConfig.hasOwnProperty(i)) continue;
			this.config[i] = userConfig[i];
		}

	};

	window.Flickr._jsonCallback = [];

	window.Flickr.prototype.request = function(params, callback) {
		var
			id = Math.round(Math.random() * 1e9),
			s  = document.createElement('script'),
			r  = document.getElementsByTagName('script')[0],
			args = [],
			i
		;

		params.format = 'json';
		params.api_key = this.config.api_key;
		params.jsoncallback = 'Flickr._jsonCallback[' + id + ']';

		for (i in params) {
			if (!params.hasOwnProperty(i)) continue;
			args.push(i + '=' + params[i]);
		}

		window.Flickr._jsonCallback[id] = this._handleResponse.bind(this, callback, s);

		s.src = this.config.api_uri + '?' + args.join('&');
		r.parentNode.insertBefore(s, r);
	};

	window.Flickr.prototype._handleResponse = function(callback, script, res) {
		script.parentNode.removeChild(script); // Cleaning
		if (res.stat === 'fail') return callback(res, null);
		callback(null, res);
	};

	window.Flickr.prototype.search = function(params, callback) {
		params.method = 'flickr.photos.search';
		this.request(params, callback);
	};

})();