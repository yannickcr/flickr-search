(function() {

	var flickr = new Flickr({
		api_key: '46dedd06fca73ef6da2dafd9c5e1bc3c'
	});

	document.querySelector('.search-form').addEventListener('submit', function(e) {
		e.preventDefault();
		emptyResults();
		flickr.search({
			text: document.getElementById('search-form-q').value
		}, fillResults);
	}, true);

	document.querySelector('.list').addEventListener('load', function(e) {
		var card = e.target.parentNode.parentNode;
		card.classList.remove('flipped');
	}, true);

	var emptyResults = function() {
		document.querySelector('.list').innerHTML = '';
	};

	var fillResults = function(err, data) {
		if (err) throw new Error(err.message);

		var tpl = document.createElement('ul');
		tpl.innerHTML =
			'<li class="card flipped">' +
			'	<a class="front">' +
			'		<img class="photo" width="150" height="150" />' +
			'	</a>' +
			'	<div class="back"></div>' +
			'</li>'
		;
		tpl = tpl.firstChild;

		var items = document.createDocumentFragment();

		data.photos.photo.forEach(function(photo) {
			var item = tpl.cloneNode(true);
			item.querySelector('.front').setAttribute('href', 'http://www.flickr.com/photos/' + photo.owner + '/' + photo.id);
			item.querySelector('.photo').setAttribute('src', photo.url_q);
			item.querySelector('.photo').setAttribute('alt', photo.title);
			item.querySelector('.photo').setAttribute('title', photo.title);

			items.appendChild(item);
		});

		document.querySelector('.list').appendChild(items);

	};

})();

function plop() {
	console.log(this);
}