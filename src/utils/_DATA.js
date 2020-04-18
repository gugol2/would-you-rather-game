const imagesPath = process.env.PUBLIC_URL + '/images/';

let users = {
	catwoman: {
		id: 'catwoman',
		name: 'Cat-Woman',
		avatarURL: `${imagesPath}catwoman.jpg`,
		answers: {
			'8xf0y6ziyjabvozdd253nd': 'optionOne',
			'6ni6ok3ym7mf1p33lnez': 'optionTwo',
			'am8ehyc8byjqgar0jgpub9': 'optionTwo',
			'loxhs1bqm25b708cmbf3g': 'optionTwo'
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
	},
	batman: {
		id: 'batman',
		name: 'Bat-Man',
		avatarURL: `${imagesPath}batman.jpg`,
		answers: {
			'vthrdm985a262al8qx3do': 'optionOne',
			'xj352vofupe1dqz9emx13r': 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	superman: {
		id: 'superman',
		name: 'Superman',
		avatarURL: `${imagesPath}superman.jpg`,
		answers: {
			'xj352vofupe1dqz9emx13r': 'optionOne',
			'vthrdm985a262al8qx3do': 'optionTwo',
			'6ni6ok3ym7mf1p33lnez': 'optionTwo'
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
	}
};

let questions = {
	'8xf0y6ziyjabvozdd253nd': {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'catwoman',
		timestamp: 1467166872634,
		optionOne: {
			votes: ['catwoman'],
			text: 'have horrible short term memory',
		},
		optionTwo: {
			votes: [],
			text: 'have horrible long term memory'
		}
	},
	'6ni6ok3ym7mf1p33lnez': {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'superman',
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: 'become a superhero',
		},
		optionTwo: {
			votes: ['superman', 'catwoman'],
			text: 'become a supervillain'
		}
	},
	'am8ehyc8byjqgar0jgpub9': {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'catwoman',
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: 'be telekinetic',
		},
		optionTwo: {
			votes: ['catwoman'],
			text: 'be telepathic'
		}
	},
	'loxhs1bqm25b708cmbf3g': {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'batman',
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: 'be a front-end developer',
		},
		optionTwo: {
			votes: ['catwoman'],
			text: 'be a back-end developer'
		}
	},
	'vthrdm985a262al8qx3do': {
		id: 'vthrdm985a262al8qx3do',
		author: 'batman',
		timestamp: 1489579767190,
		optionOne: {
			votes: ['batman'],
			text: 'find $50 yourself',
		},
		optionTwo: {
			votes: ['superman'],
			text: 'have your best friend find $500'
		}
	},
	'xj352vofupe1dqz9emx13r': {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'superman',
		timestamp: 1493579767190,
		optionOne: {
			votes: ['superman'],
			text: 'write JavaScript',
		},
		optionTwo: {
			votes: ['batman'],
			text: 'write Swift'
		}
	},
};

function generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function _getUsers () {
	return new Promise((res, rej) => {
		setTimeout(() => res({...users}), 1000);
	});
}

export function _getQuestions () {
	return new Promise((res, rej) => {
		setTimeout(() => res({...questions}), 1000);
	});
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		}
	};
}

export function _saveQuestion (question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question);

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion
			};
      
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id])
				}
			};

			res(formattedQuestion);
		}, 1000);
	});
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[qid]: answer
					}
				}
			};

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([authedUser])
					}
				}
			};

			res();
		}, 500);
	});
}
