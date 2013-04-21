(function() {

	// Create the card template (convert a string in DOM Node and store it in tpl)
	var tpl = document.createElement('ul');
	tpl.innerHTML =
		'<li class="card flipped">' +
		'	<a class="front">' +
		'		<img class="photo" width="150" height="150" />' +
		'	</a>' +
		//'	<div class="back"></div>' +
		'</li>'
	;
	tpl = tpl.firstChild;

	// Inialize the Flickr API
	var flickr = new Flickr({
		api_key: '46dedd06fca73ef6da2dafd9c5e1bc3c'
	});

	/*
	 * Define functions
	 */

	// Empty the results list
	var emptyResults = function() {
		Array.prototype.slice.call(document.querySelectorAll('.card')).forEach(function(card) {
			card.classList.add('flipped');
		});
	};

	// Fill the results list
	var fillResults = function(err, data) {
		if (err) throw new Error(err.message);

		// Remove the loader
		document.querySelector('.loader').classList.remove('active');

		var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));

		var items = document.createDocumentFragment();

		data.photos.photo.forEach(function(photo, i) {
			var item, newItem = false;
			// Get an existing item
			if (cards[i]) {
				item = cards[i];
			// create a new one using the template
			} else {
				item = tpl.cloneNode(true);
				newItem = true;
			}

			// Update the item / Fill the template
			item.querySelector('.front').setAttribute('href', 'http://www.flickr.com/photos/' + photo.owner + '/' + photo.id);
			item.querySelector('.photo').setAttribute('src', (photo.url_q || photo.url_t) + '?ts=' + (+new Date()));
			item.querySelector('.photo').setAttribute('alt', photo.title);
			item.querySelector('.photo').setAttribute('title', photo.title);

			if (newItem) items.appendChild(item);
		});

		// Append the new cards to the list
		document.querySelector('.list').appendChild(items);

		// Remove the un-needed cards from the list
		if (cards.length - data.photos.photo.length <= 0) return;
		Array.prototype.slice.call(document.querySelectorAll('.card:nth-child(1n+' + data.photos.photo.length + ')')).forEach(function(card) {
			card.parentNode.removeChild(card);
		});
	};

	// Take a random image from the list and display it in background
	var displayCover = function(err, data) {
		if (err) throw new Error(err.message);

		var i = Math.floor(Math.random() * 100);

		var img = document.createElement('img');
		img.onload = function() {
			document.querySelector('.cover').style.backgroundImage = 'url(' + (data.photos.photo[i].url_o || data.photos.photo[i].url_l) + ')';
			document.querySelector('.cover').classList.add('ready');
		};
		img.src = data.photos.photo[i].url_l;
	};

	/*
	 * Bind events
	 */

	// Form submission
	document.querySelector('.search-form').addEventListener('submit', function(e) {
		e.preventDefault();

		emptyResults();

		document.querySelector('.loader').classList.add('active');

		flickr.search({
			text: document.getElementById('search-form-q').value
		}, fillResults);

	}, true);

	// Image load
	document.querySelector('.list').addEventListener('load', function(e) {
		var card = e.target.parentNode.parentNode;
		card.classList.remove('flipped');
	}, true);

	// Load the cover image
	flickr.interesting({}, displayCover);

})();