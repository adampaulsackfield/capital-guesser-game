import data from './assets/data/capitals.js';
import { Answer } from './Answer.js';

export class Game {
	constructor() {
		this.canvas = null;
		this.context = null;
		this.questionElement = document.getElementById('question');
		this.next = document.getElementById('next');

		this.image = new Image();
		this.flags = {
			green: new Image(),
			red: new Image(),
		};

		this.score = 0;

		this.questions;
		this.currentQuestionIndex = 0;
		this.currentQuestion;
	}

	createWorld() {
		this.canvas = document.getElementById('map');
		this.context = this.canvas.getContext('2d');
		this.image.src = './assets/images/world-1200x671.png';
		this.canvas.width = this.image.width;
		this.canvas.height = this.image.height;

		// Draw World
		this.image.onload = () => {
			this.context.drawImage(
				this.image,
				0,
				0,
				this.image.width,
				this.image.height
			);
		};
	}

	loadFlags() {
		// User Guess Flag
		this.flags.green.width = '15px';
		this.flags.green.height = '15px';
		this.flags.green.src = './assets/images/green-flag-small.png';

		// Actual Location Flag
		this.flags.red.width = '15px';
		this.flags.red.height = '15px';
		this.flags.red.src = './assets/images/red-flag-small.png';
	}

	start() {
		this.shuffleQuestions();
		this.setQuestion();

		this.canvas.addEventListener('click', (e) => {
			this.handleAnswer(e.offsetX, e.offsetY);
		});
	}

	shuffleQuestions() {
		this.questions = data
			.map((country) => ({ country, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ country }) => country);
	}

	setQuestion() {
		// Sets the current question and updates the DOM
		this.currentQuestion = this.questions[this.currentQuestionIndex++];

		this.questionElement.textContent = `Where is the Capital City: ${this.currentQuestion.capital}`;
	}

	async handleAnswer(x, y) {
		console.log(x, y);

		const { x: capitalX, y: capitalY } = this.currentQuestion;
		const { green, red } = this.flags;

		// Adds the flag at user click
		this.addFlag(x, y, green);

		// Adds the flag for the capital city
		this.addFlag(capitalX, capitalY, red);

		const answer = new Answer(x, y, capitalX, capitalY);

		let score = answer.calculateScore();
		this.score += score;

		await answer.updateDOM(score, this.score, this.currentQuestion);

		if (this.currentQuestionIndex < this.questions.length) {
			this.next.addEventListener('click', () => {
				answer.hideModal();
				this.redrawMap();
				this.setQuestion();
			});
		} else {
			this.next.textContent = 'Finish';
			this.next.addEventListener('click', () => {
				answer.hideModal();
				this.end();
			});
		}
	}

	redrawMap() {
		this.context.clearRect(0, 0, this.image.width, this.image.height);
		this.context.drawImage(
			this.image,
			0,
			0,
			this.image.width,
			this.image.height
		);
	}

	addFlag(x, y, flag) {
		// Adds a flag at the specified coordinates
		this.context.drawImage(flag, x - 2, y - 15);
	}

	end() {
		alert('Gamed Ended');
	}
}

const game = new Game();
game.createWorld();
game.loadFlags();
game.start();
