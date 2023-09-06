import './sass/main.scss';
import axios from 'axios';
import api from './cat-api';
axios.defaults.headers.common['x-api-key'] =
	'live_jHnstnXpFz3wTAHzN2GH7pKLs1oujLW7TUbQi0y4bRW8RnjCbRKeBMN90w0RWrLy';

import {
	alert,
	info,
	success,
	error,
	defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = {
	select: document.querySelector('.breed-select'),
};

let currentPage = 1;

function createOption(cats) {
	for (const cat of cats) {
		const option = document.createElement('option');
		option.text = cat.name;
		option.value = cat.id;

		refs.select.add(option);
	}
}

const selectChoice = () => {
	refs.select.addEventListener('change', () => api(refs.select.value));
};

const getCatBreeds = () => {
	axios
		.get(`https://api.thecatapi.com/v1/breeds`)

		.then((result) => {
			createOption(result.data);
		})

		.catch((err) => console.log(err));
};
getCatBreeds();

selectChoice();
