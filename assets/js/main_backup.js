let tags = [];
let availableTags = '';
let availableTagsArray = [];

function init() {
	console.log('Ready');
}

document.addEventListener('DOMContentLoaded', init, false);

function isHidden(element) {
  let style = window.getComputedStyle(element);
  return (style.display === 'none')
}

function removeFromTagsList(identifier) {
	let index = tags.indexOf(identifier);
	tags.splice(index, 1);
}

function addToTagsList(identifier) {
	tags.push(identifier);
}

function displayImages(identifier) {
	let images = document.getElementsByClassName('image');
	let tagElement = document.getElementById(identifier);
	let imgTag = 'img-' + identifier;
	let tagsMenu = document.getElementsByClassName('tag');
	let availableTagsList = '';

	// DEACTIVATE
	if (tags.includes(identifier)) {
		// remove tag from the list
		removeFromTagsList(identifier);
		// tag color
		tagElement.style.color = '#000';

	// ACTIVATE
	} else {
		// add tag to the list
		addToTagsList(identifier);
		// tag color
		tagElement.style.color = '#0f0';

		// filter
		for (let i = 0; i < images.length; i++) {
			for (let a = 0; a < tags.length; a++) {
				// console.log(images[i]);
				let tag = 'img-' + tags[a];
				if (!images[i].classList.contains(tag)) {
					images[i].style.display = 'none';
				} else {
					// getting tags from the filtered images (displayed images)
					availableTagsList += images[i].className;
				}
			}
		}

		// list of tags from displayed images to array
		availableTagsArray = availableTagsList.split('img-').join(' ').split(' ');
		// delete repeated elements in array
		availableTagsArray = availableTagsArray.filter(function (el) {
	  	return el != "";
		});

		console.log(availableTagsArray);

		// disabling non possible tags
		for (let i = 0; i < tagsMenu.length; i++) {
			if (!availableTagsArray.includes(tagsMenu[i].id)) {
				tagsMenu[i].classList.add('disabled');
			}
		}
	}
}