const projectFiles = document.getElementsByClassName('projectResource');
const tags = document.getElementsByClassName('tag');

let displayedImagesUrl = [];
let selectedTags = []; // list that contains the selected tags

const highlightOn = (e) => {
	let imageTags = e.target.getAttribute('data-alt');
	imageTags = imageTags.split(' ');
	for (let i = 0; i < imageTags.length; i++) {
		document.getElementById(imageTags[i]).parentNode.classList.add('highlight');
	}
}

const highlightOff = (e) => {
	let imageTags = e.target.getAttribute('data-alt');
	imageTags = imageTags.split(' ');
	for (let i = 0; i < imageTags.length; i++) {
		document.getElementById(imageTags[i]).parentNode.classList.remove('highlight');
	}
}

const containsTags = (arr, arr2) => {
  return arr.every(i => arr2.includes(i));
}

const getOccurrence = (arr, value) => {
  let count = 0;
  arr.forEach((v) => (v === value && count++));
  return count;
}

const isHidden = (element) => {
  let style = window.getComputedStyle(element);
  return (style.display === 'none');
}

const filterProjectResources = () => {
	for (let i = 0; i < projectFiles.length; i++) {
		let searchTag = projectFiles[i].getAttribute('data-alt');
		if (containsTags(selectedTags, searchTag)) {
			projectFiles[i].style.display = 'inline';
		} else {
			projectFiles[i].style.display = 'none';
		}
	}
}

const getAllTagsFromDisplayedImages = () => {
	let displayedTagsTemp = '';

	for (let i = 0; i < projectFiles.length; i++) {
		if (!isHidden(projectFiles[i])) {
			if (i == projectFiles.length - 1) {
				displayedTagsTemp += projectFiles[i].getAttribute('data-alt');
			} else {
				displayedTagsTemp += projectFiles[i].getAttribute('data-alt') + " ";
			}
		}
	}

	let dt = displayedTagsTemp.split(' ');
	
	return dt;
}

const updateTagNumbers = (displayedTags) => {
	for (let i = 0; i < tags.length; i++) {
		let number = getOccurrence(displayedTags, tags[i].id);
		let nextSibling = tags[i].nextElementSibling;
		nextSibling.innerHTML = number;
	}
}

const disableNonPossibleCombinations = (displayedTags) => {
	for (let i = 0; i < tags.length; i++) {
		if (!displayedTags.includes(tags[i].id)) {
			tags[i].classList.add('disabled');
			tags[i].parentNode.classList.add('disabled');
		} else {
			tags[i].classList.remove('disabled');
			tags[i].parentNode.classList.remove('disabled');
		}
	}
}

const uniqueArray = (a) => {
	let seen = {};
	let out = [];
	let len = a.length;
	let j = 0;
	for(let i = 0; i < len; i++) {
		let item = a[i];
		if(seen[item] !== 1) {
			seen[item] = 1;
			out[j++] = item;
		}
	}
	return out;
}

const projectResourcesDisplayed = () => {
	let imgDisplayed = 0;
	for (let i = 0; i < projectFiles.length; i++) {
		if (!isHidden(projectFiles[i])) {
			imgDisplayed = imgDisplayed + 1;
		}
	}
	return imgDisplayed;
}

const calculateTextSize = (element) => { // to make it readable small screens
	let width = window.innerWidth;
	if (width < 640) {
		return element.clientWidth * 0.032 + 'px';
	} else {
		return element.clientWidth * 0.017 + 'px';
	}
}

const smallestPossiblePath = (displayedTags) => {
	let shortDisplayedTags = uniqueArray(displayedTags);
	let smallest = null;

	for (let i = 0; i < shortDisplayedTags.length; i++) {
		if (shortDisplayedTags[i] != '') {
			let n = document.getElementById(shortDisplayedTags[i]).nextElementSibling;
			if (smallest == null || smallest > n.innerHTML) {
				smallest = n.innerHTML;
			}
		}		
	}

	return smallest;
}

const slideshowAction = (e) => {
	if (e.target === e.currentTarget) {
		document.querySelector('#slideshow').innerHTML = '';
		document.querySelector('#slideshow').style.display = 'none';
		document.querySelector('#cursor-close').style.display = 'none';
		document.body.style.cursor = 'unset';
	} else {
		let count = displayedImagesUrl.indexOf(e.target.src);
		count = count + 1;
		if (count >= displayedImagesUrl.length) {
			count = 0
			e.target.src = displayedImagesUrl[count];
		} else {
			e.target.src = displayedImagesUrl[count];
		}
	}
}

const nextImage = (url) => {
	alert(url);
	// console.log(displayedImagesUrl.indexOf());
}

const zoomInImage = (event) => {
	// console.log(url);
	currentImageUrl = event.target.src;
	// console.log(currentImageUrl);
	displayedImagesUrl = []
	for (let i = 0; i < projectFiles.length; i++) {
		if (!isHidden(projectFiles[i])) {
			if (!projectFiles[i].classList.contains('text') && !projectFiles[i].classList.contains('video')) {
				displayedImagesUrl.push(projectFiles[i].src);
			}
		}
	}
	const img = document.createElement("img");
	img.setAttribute("src", event.target.src);
	img.classList.add('image-slideshow')
	// img.addEventListener('click', nextImage(displayedImagesUrl), false);
	document.getElementById('slideshow').appendChild(img);
	// document.getElementById('slideshow').addEventListener('click', nextImage(event.target.src), false);
	document.querySelector('#slideshow').style.display = 'flex';
	document.body.style.cursor = 'none';
	
	document.querySelector('#slideshow img').addEventListener('mouseover', () => {
		document.querySelector('#cursor-right').style.display = 'block';
		document.querySelector('#cursor-close').style.display = 'none';
	}, false);

	document.querySelector('#slideshow').addEventListener('mousemove', () => {
		let e = window.event;
    let posX = e.clientX;
    let posY = e.clientY;
		document.querySelector('#cursor-right').style.left = `${posX}px`;
		document.querySelector('#cursor-right').style.top = `${posY}px`;
		document.querySelector('#cursor-close').style.left = `${posX}px`;
		document.querySelector('#cursor-close').style.top = `${posY}px`;
	}, false);

	document.querySelector('#slideshow img').addEventListener('mouseout', () => {
		document.querySelector('#cursor-close').style.display = 'block';
		document.querySelector('#cursor-right').style.display = 'none';
	}, false);
}

const projectResourceScaling = (resourcesDisplayed, smallest) => {
	
	if (selectedTags.length > 0) { 
		let galleryWidth = document.getElementById('gallery').clientWidth;

		imageWidthSize = (smallest / resourcesDisplayed) * galleryWidth;
		imageWidthSize = (imageWidthSize < 56) ? 56 : imageWidthSize;

		for (let i = 0; i < projectFiles.length; i++) {
			if (projectFiles[i].classList.contains('text')) { // text resources

				if (imageWidthSize < 57) { // keep the size if it is too small
					projectFiles[i].style.width = '39px';
					projectFiles[i].style.height = '56px';
				} else {
					projectFiles[i].style.width = imageWidthSize + 'px';
					projectFiles[i].style.height = (projectFiles[i].clientWidth) * 1.41 + 'px';
				}

				projectFiles[i].style.fontSize = calculateTextSize(projectFiles[i]);

			} else { // image resources
				projectFiles[i].style.maxWidth = imageWidthSize + 'px';
				projectFiles[i].style.maxHeight = imageWidthSize + 'px';

				// autoplay video
				if (projectFiles[i].classList.contains('video')) {
					if (resourcesDisplayed < 6) {
						if (!isHidden(projectFiles[i])) {
							projectFiles[i].play();
						}
					} else {
						projectFiles[i].pause();
					}
				}
			}
		}	
	} else {
		for (let i = 0; i < projectFiles.length; i++) {
			if (projectFiles[i].classList.contains('text')) {
				projectFiles[i].style.width = '39px';
				projectFiles[i].style.height = '56px';
				
				// responsive text size
				projectFiles[i].style.fontSize = calculateTextSize(projectFiles[i]);

			} else {
				projectFiles[i].style.maxWidth = '56px';
				projectFiles[i].style.maxHeight = '56px';

				// autoplay video
				if (projectFiles[i].classList.contains('video')) {
					if (resourcesDisplayed < 6) {
						projectFiles[i].play();
					} else {
						projectFiles[i].pause();
					}
				}
			}
		}
	}
}

const displayImages = (identifier) => {
	if (selectedTags.includes(identifier)) { // if the tag is on the list we remove it
		selectedTags.splice(selectedTags.indexOf(identifier), 1);
		document.getElementById(identifier).parentNode.style.backgroundColor = 'transparent';
	} else { // if it is not we add it
		selectedTags.push(identifier);
		document.getElementById(identifier).parentNode.style.backgroundColor = '#ff8';
	}

	filterProjectResources();

	let displayedTags = getAllTagsFromDisplayedImages();

	disableNonPossibleCombinations(displayedTags);
	updateTagNumbers(displayedTags);

	let resourcesDisplayed = projectResourcesDisplayed();
	let smallest = smallestPossiblePath(displayedTags);

	projectResourceScaling(resourcesDisplayed, smallest);

	if (selectedTags.length > 0) {
		document.querySelector('#clearTags').style.display = 'inline';
	} else {
		document.querySelector('#clearTags').style.display = 'none';
	}
}

const clearTags = () => {
	while(selectedTags.length > 0) {
		for (x = 0; x < selectedTags.length; x++) {
			displayImages(selectedTags[0]);
		}
	}
}

// added listeners on the load
document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#intro').addEventListener('click', () => {
		// if i use event.target and i click on the image, the image becomes the target
		document.querySelector('#intro').style.display = 'none';
	})

	for (let i = 0; i < projectFiles.length; i++) {
  	projectFiles[i].addEventListener('mouseover', highlightOn, false);
  	projectFiles[i].addEventListener('mouseout', highlightOff, false);
  }
})