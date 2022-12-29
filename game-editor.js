import data from './assets/data/capitals.js';

const canvas = document.getElementById('map');
const context = canvas.getContext('2d');

const header = document.querySelector('.header');
const output = document.createElement('p');

let count = 0;

header.appendChild(output);

const image = new Image();
image.src = './assets/images/world-1200x671.png';
canvas.width = image.width;
canvas.height = image.height;

image.addEventListener('load', () => {
	context.drawImage(image, 0, 0, image.width, image.height);
});

const addCoords = ({ country, capital, x, y }) => {
	if (x || y) {
		return addCoords(data[++count]);
	}
	output.innerHTML = `Mark the coordinates for ${country} : ${capital}`;

	canvas.addEventListener('click', async (e) => {
		const current = {
			country,
			capital,
			x: e.offsetX,
			y: e.offsetY,
		};

		console.log(current);

		return addCoords(data[++count]);
	});
};

addCoords(data[count]);
