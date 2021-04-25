### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive


# THE GRID 

## Overview 

The first Project of my GA London course was to create a grid-based game using HTML, CSS and JavasScript. Students were given a list of games to choose from and a week to complete the game, I chose Snake but decided to keep things fresh I would tweak the game slightly by giving it a Tron theme, but kept the snake syntax in my code.  

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

- for this I used a for loop to determin the boarders of the grid and give them a class of limit. I used this limit to determin when to kill the snake.

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
})

portal2.forEach((i) => {
  tiles[i].classList.add('portal2')
})

```

### Snake Movment

- upon the users keydown a setInterval is killed and another started right away, the logic below determins what should happen depending on which key is pressed. It then removes the class 'snake1' from that item and then removes the last item of the 'snake1' array and adds a new item to the beginning of the array and gives it two classes, 'snake1' and 'snake1head' and removes the class 'snake1head' from the second element, that way the first item in the array is always the styled as the head. I repeated this for the second snake, adjusting for the W,A,S,D keydown inputs.

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

  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {

    prevKey1.unshift(key)
    if (prevKey1.length > 2) {
      prevKey1.pop()
    }

    if (prevKey1[1] === 'ArrowDown' && prevKey1[0] === 'ArrowUp' || prevKey1[0] === prevKey1[1] ||
      prevKey1[1] === 'ArrowUp' && prevKey1[0] === 'ArrowDown' ||
      prevKey1[1] === 'ArrowLeft' && prevKey1[0] === 'ArrowRight' ||
      prevKey1[1] === 'ArrowRight' && prevKey1[0] === 'ArrowLeft') {
      return
    }
```





