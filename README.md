### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

  
  

# THE GRID

  

## Overview

  

The first Project of my GA London course was to create a grid-based game using HTML, CSS and JavasScript. Students were given a list of games to choose from and a week to complete the game, I chose Snake but decided to keep things fresh I would tweak the game slightly by giving it a Tron theme, but kept the snake syntax in my code.

  

You could find my game [here](https://bradb345.github.io/project-1/)

  

## Objectives

  

* The snake should be able to eat food to grow bigger

* The game should end when the snake hits the wall or itself

* Snake speeds up as it eats more

  

## Suggested enhancements

  

* Responsive design

* Multi-player mode

* High score table

  
  

## Technologies

  

- HTML

- CSS

- JavaScript (ECMAScript 2020)

- Git and GitHub

- Logic Pro X

  
  

## Approach

  

### Board Rendering

  

- I set the width and the empty array for the grid. then set a for loop to create each grid tile and append it to my div, style the height and width of each tile, give it an Id the push it to the array.

  

```js
const width = 55
const tiles = []


for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  div.id = i
  tiles.push(div)
}

```

  

### Determining the limits

  

- For this I used a for loop to determine the boarders of the grid and give them a class of limit. I used this limit to determine when to kill the snake.

  

```js

for (let i = 0; i < tiles.length; i++) {
  if (i < width || i % width === 0 || i > (width ** 2) - width - 1 || i % width === width - 1) {
    tiles[i].classList.add('limit')
  }
}

```

  

### Portal Rendering

  

- I set the portal 1 top left corner to 631 and used that coordinate to hard code the other coordinates of the portal box and put them in an array. Then used a forEach on that array to give each item in the array a class of 'portal1'. then I repeated this for 'portal2'

  

```js

const p1tlc = 631
const p2tlc = 2281
const portal1 = [p1tlc, p1tlc + 1, p1tlc + 2, p1tlc + width, p1tlc + width + 2, p1tlc + width * 2, p1tlc + width * 2 + 1, p1tlc + width * 2 + 2]
const portal2 = [p2tlc, p2tlc + 1, p2tlc + 2, p2tlc + width, p2tlc + width + 2, p2tlc + width * 2, p2tlc + width * 2 + 1, p2tlc + width * 2 + 2]

const portal1Center = portal1[3] + 1
const portal2Center = portal2[3] + 1


portal1.forEach((i) => {
  tiles[i].classList.add('portal1')
  tiles[i].classList.remove('snake1')
  tiles[i].classList.remove('snake2')
})

portal2.forEach((i) => {
  tiles[i].classList.add('portal2')
  tiles[i].classList.remove('snake1')
  tiles[i].classList.remove('snake2')
})

```

  

### Snake Movment

  

- Upon the users keydown a setInterval is killed and another started right away, the logic below determines what should happen depending on which key is pressed. It then removes the class 'snake1' from that item and then removes the last item of the 'snake1' array and adds a new item to the beginning of the array and gives it two classes, 'snake1' and 'snake1head' and removes the class 'snake1head' from the second element, that way the first item in the array is always the styled as the head. I repeated this for the second snake, adjusting for the W,A,S,D keydown inputs.

  

```js

if (key === 'ArrowDown' && !(snake1 > (width ** 2) - width - 1)) {

        tiles[snake1[snake1.length - 1]].classList.remove('snake1')
        snake1.pop()
        snake1.unshift(snake1[0] + width)
        tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        tiles[snake1[1]].classList.remove('snake1Head')


      } else if (key === 'ArrowLeft' && !(snake1 % width === 0)) {

        tiles[snake1[snake1.length - 1]].classList.remove('snake1')
        snake1.pop()
        snake1.unshift(snake1[0] - 1)
        tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        tiles[snake1[1]].classList.remove('snake1Head')

      } else if (key === 'ArrowRight' && !(snake1 % width === width - 1)) {

        tiles[(snake1[snake1.length - 1])].classList.remove('snake1')
        snake1.pop()
        snake1.unshift(snake1[0] + 1)
        tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        tiles[snake1[1]].classList.remove('snake1Head')

      } else if (key === 'ArrowUp' && !(snake1 < width)) {

        tiles[snake1[snake1.length - 1]].classList.remove('snake1')
        snake1.pop()
        snake1.unshift(snake1[0] - width)
        tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        tiles[snake1[1]].classList.remove('snake1Head')
      }

```

  

### Key Prevention

  

- I created an array that can only contain two items. it constantly removes the last key down and adds the new key down to the beginning. Doing this keeps track of the previous key down so that I could add logic to return if current key down is opposite to the previous key down or equal to it. this way it prevents the user from moving the snake backwards through itself. This was also repeated for the second player.

  

- I also added an event.preventDefault() to the end of each setInterval to stop the space bar and enter key from pausing the game.

  

```js

document.addEventListener('keydown', (event) => {

  const key = event.key

  if (key === 'w' || key === 's' || key === 'a' || key === 'd') {

    if (isOnePlayer === true) {
      return
    }

    prevKey2.unshift(key)
    if (prevKey2.length > 2) {
      prevKey2.pop()
    }

    if (prevKey2[1] === 's' && prevKey2[0] === 'w' || prevKey2[0] === prevKey2[1] ||
      prevKey2[1] === 'w' && prevKey2[0] === 's' ||
      prevKey2[1] === 'a' && prevKey2[0] === 'd' ||
      prevKey2[1] === 'd' && prevKey2[0] === 'a') {
      return
    }

```

  

### End the Game

  

- I set the game mode, "isOnePlayer" to a boolean. If isOnePlayer is true then the player ends the game by either running into the walls or by running into himself.

  

- If the game mode, "isOnePlayer" is set to false then the ways the game can end get more complicated. It can result in a tie if both players heads occupy the same space. If one players head occupies the other players body, the wall, or himself, then the other player wins. If a player eats the other players food the other player wins.

  

```js

if (isOnePlayer === true) {

        if (tiles[snake1[0]].classList.contains('limit')) {
          elements.results.innerHTML = 'GAME OVER'
          stopGame()
          return
        }


        for (let i = 1; i < snake1.length; i++) {
          if (snake1[0] === snake1[i]) {
            elements.results.innerHTML = 'GAME OVER'
            stopGame()
            return
          }

        }
      } else {

        if (snake1[0] === snake2[0]) {
          elements.results.innerHTML = 'IT\'S A TIE???'
          stopGame()
          return
        }

        if (tiles[snake1[0]].classList.contains('limit')) {
          elements.results.innerHTML = 'PLAYER TWO WINS'
          stopGame()
          return
        }

        if (tiles[snake2[0]].classList.contains('limit')) {
          elements.results.innerHTML = 'PLAYER ONE WINS'
          stopGame()
          return
        }

        if (tiles[snake1[0]].classList.contains('snake2')) {
          elements.results.innerHTML = 'PLAYER TWO WINS'
          stopGame()
          return
        }

        if (tiles[snake2[0]].classList.contains('snake1')) {
          elements.results.innerHTML = 'PLAYER ONE WINS'
          stopGame()
          return
        }


        if (tiles[snake1[0]] === tiles[goal2Index]) {
          elements.results.innerHTML = 'PLAYER TWO WINS'
          stopGame()
          return
        }

        if (tiles[snake2[0]] === tiles[goal1Index]) {
          elements.results.innerHTML = 'PLAYER ONE WINS'
          stopGame()
          return
        }

        for (let i = 1; i < snake1.length; i++) {
          if (snake1[0] === snake1[i]) {
            elements.results.innerHTML = 'PLAYER TWO WINS'
            stopGame()
            return
          }

        }

        for (let i = 1; i < snake2.length; i++) {
          if (snake2[0] === snake2[i]) {
            elements.results.innerHTML = 'PLAYER ONE WINS'
            stopGame()
            return
          }
        }
      }

```

  

### Food and Scoring

  

- If isOnePlayer is true then the single player will receive 100 points for every piece of food they eat and goes by 4. if isOnePlayer is false then the scoring functionality is taken away and its just a win and lose game.

  

- If the players head occupies the same space as the food then it is taken away and the addGoal function is run.

  

```js

function addGoal1() {

  if (tiles[snake1[0]] === tiles[goal1Index]) {

    if (sfxIsOn === true) {
      elements.audio2.src = './Sounds/chime.mp3'
      elements.audio2.play()
    }

    if (isOnePlayer === true) {
      score += 100
      elements.score.innerHTML = score
    }

    if (gameSpeed > 60) {
      gameSpeed -= 10
      console.log(gameSpeed)
    }

    setTimeout(() => {
      snake1.push(goal1Index, goal1Index, goal1Index, goal1Index)
    }, gameSpeed * snake1.length)

    tiles[goal1Index].classList.remove('goal1')
    goal1Index = Math.floor(Math.random() * tiles.length)
    tiles[goal1Index].classList.add('goal1')
  }
  if (tiles[goal1Index].classList.contains('limit') || tiles[goal1Index].classList.contains('snake1') || tiles[goal1Index].classList.contains('snake2') || tiles[goal2Index].classList.contains('portal1') || tiles[goal2Index].classList.contains('portal2') || tiles[goal1Index].classList.contains('goal2')) {
    tiles[goal1Index].classList.remove('goal1')
    goal1Index = Math.floor(Math.random() * tiles.length)
    tiles[goal1Index].classList.add('goal1')
  }

}

```

### Wins and Challenges 

#### - Challenges

- Implementing multiplayer functionality was a challenge, particularly when it comes to the logic involved with determining the winner of a game. There were a lot of moving parts but in the end it all came together.
- Implementing the portal functionality was also a challenge.  Initially I thought I would be able to have the player spawn inside the portal but found it would trap the player inside. I realized I would have to code the side the player should exit based on the side of the opposite portal the player entered.

#### - Wins

- When I started this project I set out to reach the MVP and have a basic game. I was not fully confident in my coding abilities, but the more I coded the more things started to click. By the end of the project I was able to reach MVP and surpass it by Implementing 2  additional stretch goals.    


### Key Learning

- Array Methods
- Functions
- I also learned that Chrome does not allow music to play on a site without the user first interacting with the site.

### Future Improvments 
- Creating a Backend API for the game to be multiplayer online rather than only on a single machine.
- The game has a bug where the player randomly dies. I couldn’t figure out the bug before the project was due, so fixing that bug would be an improvement.
- Implementing the A* algorithm to the computer player so that it tries to defeat the user. 