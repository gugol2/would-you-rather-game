# Would You Rather...? Game

This project is a **web app** that allows a logged user play the famous game
**Would You Rather...?**.

Users need to be logged into the app in order to be able to see the application
content and the game woks like so:

- An user is able to log in and log out. But only when being logged an user can
  actually play the game.
- An user is presented a question in the form: **Would You Rather? [Option A] or
  [Option B]**
- The logged user can choose either option A or option B, but only once, after a
  question is played it can't be played again.
- The logged user can add new questions.
- The logged user can see a board with the scoring of all the players.

So this app allows logged users answer questions, see already answered
questions, create new questions and see the users on a ranking leaderboard.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Details](#details)

## Installation

Clone this repository on your local machine:

```sh
cd into it
npm install
npm start
```

Go to http://localhost:3000/ and see the app in action.

## Usage

Log in with one of the available users on the dropdown of the initial screen and
enjoy the game!

## Details

Please refer to the [details section](DETAILS.md) for all available commands and
instructions. These capabilities come mainly from create-react-app boilerplate.

Aside of that this repo:

- Has pre-commit task that enforces some quality in the code before allowing
  commiting
- Has a pre-push task that enforces some validation in the code before allowing
  pushing
- Uses lint for type checking
- Uses prettier for formating
- Uses jest to run the tests
- Has a test coverage task

## Demo

You can check this project live
[here](https://5ede2ca657a852d62a1b559b--vigorous-lamarr-382562.netlify.app/)
