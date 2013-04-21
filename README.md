# flickr-search

A simple search module using the flickr API

Simply include the flick-search module in your webpage:

```html
<script src="flickr-search.js"></script>
```

Then create a Flickr instance:

```javascript
var flickr = new Flickr({
  api_key: 'your-api-key'
});
```

## Methods

### Flickr.search

Search Flickr for matching photos.

#### Syntax:

	flickr.search(parameters, callback);

#### Arguments:

1. parameters - (object) An object with the list of parameters to send to the API;
2. callback - (function) The function to execute when we got the result. Will get 2 parameters: err (object) and data (object);

#### Example:

```javascript
flickr.search({
	text: 'flower'
}, function(err, data) {
	if (err) return console.error(err);
	console.log(data);
});
```

For more informations on parameters see the [Flickr API Documentation](http://www.flickr.com/services/api/flickr.photos.search.html).

### Flickr.interesting

Search Flickr for interesting photos.

#### Syntax:

	flickr.interesting(parameters, callback);

#### Arguments:

1. parameters - (object) An object with the list of parameters to send to the API.
2. callback - (function) The function to execute when we got the result. Will get 2 parameters: err (object) and data (object).

For more informations on parameters see the [Flickr API Documentation](http://www.flickr.com/services/api/flickr.interestingness.getList.html).

#### Example:

```javascript
flickr.interesting({}, function(err, data) {
	if (err) return console.error(err);
	console.log(data);
});
```

### Flickr.request

Make a raw request to the Flickr API

#### Syntax:

	flickr.request(parameters, callback);

#### Arguments:

1. parameters - (object) An object with the list of parameters to send to the API.
2. callback - (function) The function to execute when we got the result. Will get 2 parameters: err (object) and data (object).

You MUST set the parameters.method property, for a full list of the available methods see the [Flickr API Documentation](http://www.flickr.com/services/api/).

#### Example:

```javascript
flickr.request({
	method: 'flickr.panda.getPhotos',
	panda_name: 'wang wang'
}, function(err, data) {
	if (err) return console.error(err);
	console.log(data);
});
```