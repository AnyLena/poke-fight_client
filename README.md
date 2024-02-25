# Pokemon Battle App

This is a full-stack Pokemon game built with React, Node.js, and MongoDB. It allows users to sign up, engage in battles, and collect Pokemons. The app also displays a high scores table featuring the top 10 users with the most Pokemons caught.

## Live Version

You can visit the live version of the app at [pokefighters.netlify.app](http://pokefighters.netlify.app). Sign up, add a Pokemon to your team, and catch 'em all!

## Features

- **Login**: Users can sign up and log in to access their personal account.
- **Dashboard**: Displays achievements and a pie chart based on the number of Pokemons seen, battled, and caught.
- **My Pokemons**: Pokemons defeated in battle will be added to the user's list, and the user will be able to add them to their fighting team.
- **Battle Stats**: All battles are recorded.
- **Pokedex**: A Pokedex where users can view details about different Pokemons. It supports multiple languages and includes an image gallery.
- **Fight**: A turn-based fighting game that supports regular attacks, special attacks, and probability-based critical hits and misses.
- **Ranking**: A leaderboard showing the top 10 Pokemon catchers.

## Tech Stack

- **Frontend**: The client-side is built using React, Material-UI components, and custom vanilla CSS.
- **Backend**: The server-side is built with Node.js and Express.js, and connects to a MongoDB database. [Link to server repo](https://github.com/AnyLena/poke-fight_server).

## Setup and Installation

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Start the server with `npm run dev`.
4. Visit `http://localhost:5173` in your browser.