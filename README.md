### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive


# THE GRID 

## Overview 

The first Project of my GA London course was to create a grid-based game using HTML, CSS and JavasScript. Students were given a list of games to choose from and a week to complete the game, I chose Snake but decided to keep things fresh I would tweak the game slightly by giving it a Tron theme. 

you could find my game [here](https://bradb345.github.io/project-1/)

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
- JavaScript (ES6)
- Git and GitHub
- Logic Pro X


## Approach

### Board Rendering

I set the width and the empty array for the grid. then set a for loop to create each grid tile and append it to my div, style the height and width of each tile, give it an Id the push it to the array.

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

for this I used a for loop to determin the boarders of the grid and give them a class of limit. I used this limit to determin when to kill the snake.

```js 
for (let i = 0; i < tiles.length; i++) {
  if (i < width || i % width === 0 || i > (width ** 2) - width - 1 || i % width === width - 1) {
    tiles[i].classList.add('limit')
  }
}
```

### Portal Rendering

I set the portal 1 top left corner to 631 and used that coordinate to hard code the other coordinates of the portal box and put them in an array. Then used a forEach on that array to give each item in the array a class of 'portal1'. then I repeated this for 'portal2'

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
type stuff
