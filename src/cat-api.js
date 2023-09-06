import axios from 'axios';

const catInfo = document.querySelector('.cat-info');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const createCatInfo = (imageUrl, description, temperament) => {
	const image = document.createElement('img');
	const descriptionTitle = document.createElement('div');
	const temperamentTitle = document.createElement('div');
	image.src = imageUrl; // Set the image source to the provided URL
	image.width = '640';
	image.height = '480';
	image.classList.add('image');
	descriptionTitle.classList.add('text');
	temperamentTitle.classList.add('text');
	descriptionTitle.style.width = '640px';
	catInfo.innerHTML = ''; // Clear any previous content
	descriptionTitle.textContent = description;
	temperamentTitle.textContent = temperament;
	catInfo.appendChild(image);
	catInfo.appendChild(descriptionTitle);
	catInfo.appendChild(temperamentTitle);
};

const fetchCatByBreed = (breedId) => {
	console.log(breedId);
	error.style.display = 'none';
	axios
		.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)

		.then((result) => {
			// console.log(result.data[0].breeds[0]);
			const descriptionInfo = result.data[0].breeds[0].description;
			const temperamentInfo = result.data[0].breeds[0].temperament;
			// console.log(descriptionInfo, temperamentInfo);
			createCatInfo(result.data[0].url, descriptionInfo, temperamentInfo);
			loader.style.display = 'block';
		})

		.catch((err) => {
			console.log(err);
			error.style.display = 'block';
		})
		.finally(() => (loader.style.display = 'none'));
};

export default fetchCatByBreed;
