export class Answer {
	constructor(guessX, guessY, capitalX, capitalY) {
		this.guessX = guessX;
		this.guessY = guessY;
		this.capitalX = capitalX;
		this.capitalY = capitalY;

		this.questionElement = document.getElementById('question');
		this.modal = document.getElementById('modal');
		this.answerElement = document.getElementById('answer');
		this.qScore = document.getElementById('qScore');
		this.tScore = document.getElementById('tScore');
		this.distance = document.getElementById('distance');
		this.time = document.getElementById('time');
	}

	calculateDistance() {
		// Using Pythagoras Theorem to calculate distance from capital city. a^2 + b^2 = c^2
		return Math.floor(
			Math.sqrt(
				Math.pow(this.capitalX - this.guessX, 2) +
					Math.pow(this.capitalY - this.guessY, 2)
			)
		);
	}

	calculateScore() {
		const distance = this.calculateDistance();

		// Exponential Drop-off - Used to drop off the score the further away the guess is
		return Math.floor(distance < 10 ? 500 : 500 * Math.pow(2, -distance / 10));
	}

	async updateDOM(score, totalScore, currentQuestion) {
		this.qScore.textContent = `${score}`;
		this.tScore.textContent = `${totalScore}`;
		this.time.textContent = `1.77`;

		await new Promise((resolve) => setTimeout(resolve, 2000));

		this.showModal();

		this.answerElement.textContent = `from ${currentQuestion.capital}, ${currentQuestion.country}`;
		this.distance.textContent = `${this.calculateDistance()}m`;

		return true;
	}

	showModal() {
		this.modal.classList.add('show');
	}

	hideModal() {
		this.modal.classList.remove('show');
	}
}
