# Pathfinding Visualiser React

## 🌐 Project

This is an on going side project to visualise a cellular automaton that is played on a 2D square grid. Each square (or "cell") on the grid can be either alive or dead, and they evolve according to the following rules:

- Any live cell with fewer than two live neighbours dies (referred to as underpopulation).
- Any live cell with more than three live neighbours dies (referred to as overpopulation).
- Any live cell with two or three live neighbours lives, unchanged, to the next generation.
- Any dead cell with exactly three live neighbours comes to life.

More information can be found on the official website: https://conwaylife.com/

## 🔧 Installation and Setup

Clone the repository

```
git clone https://github.com/Gunnar50/conway-game-of-life-react-typescript
```

Navigate to the project directory

```
cd conway-game-of-life-react-typescript
```

Install dependecies

```
npm install
```

Start the development server

```
npm run dev
```

Open localhost on port 5173 on a browser window

```
http://localhost:5173/
```

## 🛠️ Technology Stack

- React
- TypeScript
- Node

## ⭐️ Show your support

Give a start if you liked and this project helped you!

## 📝 License

This project is open source and available under the MIT License.
