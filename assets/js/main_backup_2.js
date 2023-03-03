// fabric and fabrication causing issues

let projectResources = document.getElementsByClassName('projectResource');
let tags = document.getElementsByClassName('tag');
let numbers = document.getElementsByClassName('quantity');
let selectedTags = [];
let searchTag = ''; // get tags from alt
let displayedTagsTemp = ''; // tags from current displayed images
let displayedTags;

function isHidden(element) {
  let style = window.getComputedStyle(element);
  return (style.display === 'none');
}

function containsTags(arr, arr2){
  return arr.every(i => arr2.includes(i));
}

function getOccurrence(array, value) {
  var count = 0;
  array.forEach((v) => (v === value && count++));
  return count;
}

function uniqArray(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
    var item = a[i];
    if(seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

function calculateTextSize(element) {
	let width = window.innerWidth;
	if (width < 640) {
		return element.clientWidth * 0.032 + 'px';
	} else {
		return element.clientWidth * 0.017 + 'px';
	}
}

function displayImages (identifier) {
	// clean
	let smallest = null;
	let imagesDisplayed = null;
	let imageWidthSize = null;
	displayedTagsTemp = '';
	displayedTags = [];

	// add or remove from the list
	if (selectedTags.includes(identifier)) {
		// remove
		selectedTags.splice(selectedTags.indexOf(identifier), 1);
		document.getElementById(identifier).parentNode.style.backgroundColor = '#fff';

		for (let i = 0; i < projectResources.length; i++) {
			searchTag = projectResources[i].getAttribute('data-alt');
			// if selectedTags is empty means there are no selected tags so show all images
			if (typeof selectedTags != "undefined" && selectedTags != null && selectedTags.length != null && selectedTags.length > 0) {
				// refresh the displayed images in reference to the selectedTags list

				// the problem is that when that the images displayed contain at least one tag instead of all of them which breaks the path
				if (containsTags(selectedTags, searchTag)) {
					projectResources[i].style.display = 'inline';
				} else {
					projectResources[i].style.display = 'none';
				}
			} else {
				projectResources[i].style.display = 'inline';
			}
		}
	} else {
		// add
		selectedTags.push(identifier);
		document.getElementById(identifier).parentNode.style.backgroundColor = '#ff8';

		for (let i = 0; i < projectResources.length; i++) {
			searchTag = projectResources[i].getAttribute('data-alt');

			if (!searchTag.includes(identifier)) {
				projectResources[i].style.display = 'none';
			}
		}
	}

	// get all the tags from displayed images
	for (let i = 0; i < projectResources.length; i++) {
		if (!isHidden(projectResources[i])) {
			if (i == projectResources.length - 1) {
				displayedTagsTemp += projectResources[i].getAttribute('data-alt');
			} else {
				displayedTagsTemp += projectResources[i].getAttribute('data-alt') + " ";
			}
		}
	}
	displayedTags = displayedTagsTemp.split(' ');

	// disable non possible tag combinations
	for (let i = 0; i < tags.length; i++) {
		if (!displayedTags.includes(tags[i].id)) {
			tags[i].classList.add('disabled');
			tags[i].parentNode.classList.add('disabled');
		} else {
			tags[i].classList.remove('disabled');
			tags[i].parentNode.classList.remove('disabled');
		}
	}

	// update tag numbers
	for (let i = 0; i < tags.length; i++) {
		let number = getOccurrence(displayedTags, tags[i].id);
		let nextSibling = tags[i].nextElementSibling;
		nextSibling.innerHTML = number;
	}

	// update image size
	// get all the numbers from the available tags, get the smallest and compare with the amount of images displayed
	// (smallest / n images) * 100
	if (selectedTags.length != 0 && selectedTags != null) {
		let shortDisplayedTags = uniqArray(displayedTags);

		for (let i = 0; i < shortDisplayedTags.length; i++) {
			if (shortDisplayedTags[i] != '') {
				let n = document.getElementById(shortDisplayedTags[i]).nextElementSibling;
				if (smallest == null || smallest > n.innerHTML) {
					smallest = n.innerHTML;
				}
			}		
		}

		for (let i = 0; i < projectResources.length; i++) {
			if (!isHidden(projectResources[i])) {
				imagesDisplayed = imagesDisplayed + 1;
			}
		}

		let galleryWidth = document.getElementById('gallery').clientWidth;

		imageWidthSize = (smallest / imagesDisplayed) * galleryWidth;
		if (imageWidthSize < 56) {
			imageWidthSize = 56;
		}

		for (let i = 0; i < projectResources.length; i++) {
			if (projectResources[i].classList.contains('text')) {

				if (imagesDisplayed < 3) {
					projectResources[i].style.width = imageWidthSize + 'px';
					projectResources[i].style.height = (projectResources[i].clientWidth) * 1.41 + 'px';
				} else {
					projectResources[i].style.height = imageWidthSize + 'px';
					projectResources[i].style.width = (projectResources[i].clientHeight) * 0.71 + 'px';
				}

				// responsive text size
				projectResources[i].style.fontSize = calculateTextSize(projectResources[i]);

			} else {
				projectResources[i].style.maxWidth = imageWidthSize + 'px';
				projectResources[i].style.maxHeight = imageWidthSize + 'px';
			}
		}

	} else { // if there is no tags selected then...
		for (let i = 0; i < projectResources.length; i++) {
			if (projectResources[i].classList.contains('text')) {
				projectResources[i].style.width = '39px';
				projectResources[i].style.height = '56px';
				// projectResources[i].style.height = (projectResources[i].clientWidth) * 1.41 + 'px';
				
				// responsive text size
				projectResources[i].style.fontSize = calculateTextSize(projectResources[i]);

			} else {
				projectResources[i].style.maxWidth = '56px';
				projectResources[i].style.maxHeight = '56px';
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', (event) => {

  // let gallery = document.getElementById('gallery');
  // let count = gallery.childElementCount;
  // let galleryInterval;
  // let temp = 0;

  // if (count > 0) {
  //   galleryInterval = setInterval(galleryImages, 120);
  // }

  // function galleryImages () {
  //   if (temp >= count) {
  //     clearInterval(galleryInterval);
  //   } else {
  //     gallery.children[temp].style.display = 'inline';
  //   }
  //   temp++
  // }

  let intro = document.getElementById('intro');
  intro.addEventListener('click', function() {
	intro.style.display = 'none';
  }, false)

	let title = document.getElementById('title');
	let clear = document.getElementById('clear');
	title.addEventListener('mouseover', function() {
		clear.style.display = 'inline';
	})

	title.addEventListener('mouseout', function() {
		clear.style.display = 'none';
	})

  function highlightOn(e) {
  	let imageTags = e.target.getAttribute('data-alt');
  	imageTags = imageTags.split(' ');
  	for (let i = 0; i < imageTags.length; i++) {
  		document.getElementById(imageTags[i]).parentNode.classList.add('highlight');
  	}
  }

  function highlightOff(e) {
  	let imageTags = e.target.getAttribute('data-alt');
  	imageTags = imageTags.split(' ');
  	for (let i = 0; i < imageTags.length; i++) {
  		document.getElementById(imageTags[i]).parentNode.classList.remove('highlight');
  	}
  }

  for (let i = 0; i < projectResources.length; i++) {
  	projectResources[i].addEventListener('mouseover', highlightOn, false);
  	projectResources[i].addEventListener('mouseout', highlightOff, false);
  }

})