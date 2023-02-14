# Chess 2
A portfolio project built for playing chess online vs anyone in the world, or for playing against a [Chess Engine](https://github.com/nmrugg/stockfish.js). The name comes from a common joke in the online chess world where players will often criticize chess as if it were a modern game with updates.
##
<image src= "assets/Frame2.svg" width=250></image>
##
- *"When is chess 2 coming out"* 

## Features
#### Live Online Chess 
- Play online against anyone in the world with <100ms move delay.
- Matchmaking for finding other players looking to play
- Your session and games are saved when leaving and returning to the site
#### Play Against a Chess engine
- Play against [Stockfish 11](https://github.com/nmrugg/stockfish.js), one of the best Chess engines in the world
#### Coming soon
- Play chess variants such as Chess960 and Chess 2, a variant created by me for this project.

## Technical Details
### Front-End
- Built using [React](https://reactjs.org/) and [Next.js](nextjs.org)
- Styled using [Tailwind](https://tailwindcss.com/)
- Chess Engine is [Stockfish.js](https://github.com/nmrugg/stockfish.js) which is a WASM implementation of the [Stockfish](https://github.com/official-stockfish/Stockfish) engine.
- State is managed by [Redux-Toolkit](https://redux-toolkit.js.org/) and [react-redux](https://react-redux.js.org/)
- Websocket connecting uses [Socket.io](socket.io)
- Sound managed with [use-sound](https://github.com/joshwcomeau/use-sound)
### Server-Side
- Server is built using [Expressjs](https://expressjs.com/) and Node.js
- Database is [MongoDB](https://www.mongodb.com/) which is used for game state persistence and session management
- [Socket.io](socket.io) is used to create and manage Websocket connections
- [Redis](https://redis.com/) is used as an adapter for the websocket connections.
- [Mongoose](https://mongoosejs.com/) used as an ORM

## Notes
This project was built to serve as a portfolio project showing off my fullstack capabilities. I am currently looking for a job in web development so I wanted this project to be as close as I can get to a real production level application. As of writing this, I am still finishing up development of this project.
### For any inquiries please email **joshrudesill@gmail.com**
