

const elements = {
  grid: document.querySelector('.grid'),
  scoreText: document.querySelector('.score-text'),
  results: document.querySelector('.results'),
  score: document.querySelector('.score'),
  reset: document.querySelector('#reset'),
  music: document.querySelector('#music'),
  sfx: document.querySelector('#sfx'),
  audio1: document.querySelector('#a1'),
  audio2: document.querySelector('#a2'),
  musicStatus: document.querySelector('#music-status'),
  sfxStatus: document.querySelector('#sfx-status'),
  onePlayer: document.querySelector('#one'),
  twoPlayer: document.querySelector('#two'),
  oneDot: document.querySelector('#ops'),
  twoDot: document.querySelector('#tps'),
}

//!\\\\\\\\\\\\\\\\\\\\\\\\\\\ grid

const width = 55
const tiles = []


for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  // div.innerHTML = i
  tiles.push(div)


}

//! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\      limits

for (let i = 0; i < tiles.length; i++) {
  if (i < width || i % width === 0 || i > (width ** 2) - width - 1 || i % width === width - 1) {
    tiles[i].classList.add('limit')
  }
}

//!\\\\\\\\\\\\\\\\\\\\\\\\\        game variables + initial state

let snake1 = [156, 1398, 1398]
let snake2 = [2867, 1406, 1406]
let prevKey1 = []
let prevKey2 = []
let goal1Index = 1398
let goal2Index = 1406
let score = 0
let intervalId = 0
let intervalId2 = 0
let gameSpeed = 100
let gameSpeed2 = 100
let musicIsPlaying = true
let sfxIsOn = true
let isOnePlayer = true
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    elements.audio1.src = './Sounds/Grid_Music.mp3'
    elements.audio1.play()
  }, 1000)
})




elements.audio1.loop = true


// !\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ portal rendering
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

// !\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ snake and goal inital state

snake1.forEach((i) => {
  tiles[i].classList.add('snake1')
  tiles[snake1[0]].classList.add('snake1Head')
})


tiles[goal1Index].classList.add('goal1')



// !\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  kill and reset

elements.reset.addEventListener('click', () => {

  if (isOnePlayer === true) {
    clearInterval(intervalId)
    intervalId = 0

    gameSpeed = 100
    score = 0
    intervalId = 0
    elements.results.innerHTML = ''
    elements.scoreText.innerHTML = 'score: '
    elements.score.innerHTML = '0'


    tiles[goal1Index].classList.remove('goal1')
    goal1Index = 1398
    tiles[goal1Index].classList.add('goal1')

    tiles[goal2Index].classList.remove('goal2')
    goal2Index = 0


    for (let i = 0; i < tiles.length; i++) {
      tiles[i].classList.remove('snake1', 'snake1Head', 'snake2', 'snake2Head')
    }

    snake1 = [156, 1398, 1398]

    prevKey1 = []
    prevKey2 = []

    snake1.forEach((i) => {
      tiles[i].classList.add('snake1')
      tiles[snake1[0]].classList.add('snake1Head')



    })

  } else {

    clearInterval(intervalId)
    intervalId = 0

    clearInterval(intervalId2)
    intervalId2 = 0


    gameSpeed = 100
    gameSpeed2 = 100
    score = 0
    intervalId = 0
    elements.results.innerHTML = ''
    elements.scoreText.innerHTML = ''
    elements.score.innerHTML = ''

    tiles[goal1Index].classList.remove('goal1')
    goal1Index = 1398
    tiles[goal1Index].classList.add('goal1')

    tiles[goal2Index].classList.remove('goal2')
    goal2Index = 1406
    tiles[goal2Index].classList.add('goal2')

    for (let i = 0; i < tiles.length; i++) {
      tiles[i].classList.remove('snake1', 'snake1Head', 'snake2', 'snake2Head')
    }

    snake1 = [156, 1398, 1398]
    snake2 = [2867, 1406, 1406]
    prevKey1 = []
    prevKey2 = []

    snake1.forEach((i) => {
      tiles[i].classList.add('snake1')
      tiles[snake1[0]].classList.add('snake1Head')
    })

    snake2.forEach((i) => {
      tiles[i].classList.add('snake2')
      tiles[snake2[0]].classList.add('snake2Head')
    })
  }
})

//!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\   keydown  player 1


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

    clearInterval(intervalId)

    intervalId = setInterval(() => {

      portalClear()

      //! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\       end game

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

      // !\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ portals 1

      if (tiles[snake1[0]].classList.contains('portal1')) {
        if (key === 'ArrowDown') {
          snake1[0] = portal2Center + width * 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
        if (key === 'ArrowLeft') {
          snake1[0] = portal2Center - 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
        if (key === 'ArrowRight') {
          snake1[0] = portal2Center + 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
        if (key === 'ArrowUp') {
          snake1[0] = portal2Center - width * 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
      }

      if (tiles[snake1[0]].classList.contains('portal2')) {
        if (key === 'ArrowDown') {
          snake1[0] = portal1Center + width * 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
        if (key === 'ArrowLeft') {
          snake1[0] = portal1Center - 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
        if (key === 'ArrowRight') {
          snake1[0] = portal1Center + 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
        if (key === 'ArrowUp') {
          snake1[0] = portal1Center - width * 2
          tiles[snake1[0]].classList.add('snake1', 'snake1Head')
        }
      }



      //! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\      game play + movement

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

      addGoal1()


    }, gameSpeed)
  } else {
    event.preventDefault()
    return
  }
})


//!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\   keydown  player 2


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

    clearInterval(intervalId2)

    intervalId2 = setInterval(() => {

      portalClear()

      //! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\       end game

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

      // !\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ portals 2

      if (tiles[snake2[0]].classList.contains('portal1')) {
        if (key === 's') {
          snake2[0] = portal2Center + width * 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
        if (key === 'a') {
          snake2[0] = portal2Center - 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
        if (key === 'd') {
          snake2[0] = portal2Center + 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
        if (key === 'w') {
          snake2[0] = portal2Center - width * 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
      }

      if (tiles[snake2[0]].classList.contains('portal2')) {
        if (key === 's') {
          snake2[0] = portal1Center + width * 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
        if (key === 'a') {
          snake2[0] = portal1Center - 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
        if (key === 'd') {
          snake2[0] = portal1Center + 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
        if (key === 'w') {
          snake2[0] = portal1Center - width * 2
          tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        }
      }




      //! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\      game play + movement

      if (key === 's' && !(snake2 > (width ** 2) - width - 1)) {

        tiles[snake2[snake2.length - 1]].classList.remove('snake2')
        snake2.pop()
        snake2.unshift(snake2[0] + width)
        tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        tiles[snake2[1]].classList.remove('snake2Head')


      } else if (key === 'a' && !(snake2 % width === 0)) {
        tiles[snake2[snake2.length - 1]].classList.remove('snake2')
        snake2.pop()
        snake2.unshift(snake2[0] - 1)
        tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        tiles[snake2[1]].classList.remove('snake2Head')

      } else if (key === 'd' && !(snake2 % width === width - 1)) {
        tiles[(snake2[snake2.length - 1])].classList.remove('snake2')
        snake2.pop()
        snake2.unshift(snake2[0] + 1)
        tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        tiles[snake2[1]].classList.remove('snake2Head')

      } else if (key === 'w' && !(snake2 < width)) {
        tiles[snake2[snake2.length - 1]].classList.remove('snake2')
        snake2.pop()
        snake2.unshift(snake2[0] - width)
        tiles[snake2[0]].classList.add('snake2', 'snake2Head')
        tiles[snake2[1]].classList.remove('snake2Head')
      }

      addGoal2()

    }, gameSpeed2)
  } else {
    return
  }
})


//!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\functions and stuff 

function stopGame() {

  clearInterval(intervalId)
  clearInterval(intervalId2)
  intervalId = 0
  intervalId2 = 0
}

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

    if (gameSpeed > 30) {
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

function addGoal2() {

  if (tiles[snake2[0]] === tiles[goal2Index]) {

    if (sfxIsOn === true) {
      elements.audio2.src = './Sounds/chime.mp3'
      elements.audio2.play()
    }

    if (gameSpeed2 > 30) {
      gameSpeed2 -= 10
      console.log(gameSpeed2)
    }

    setTimeout(() => {
      snake2.push(goal2Index, goal2Index, goal2Index, goal2Index)
    }, gameSpeed2 * snake2.length)

    tiles[goal2Index].classList.remove('goal2')
    goal2Index = Math.floor(Math.random() * tiles.length)
    tiles[goal2Index].classList.add('goal2')
  }
  if (tiles[goal2Index].classList.contains('limit') || tiles[goal2Index].classList.contains('snake1') || tiles[goal2Index].classList.contains('snake2') || tiles[goal2Index].classList.contains('portal1') || tiles[goal2Index].classList.contains('portal2') || tiles[goal2Index].classList.contains('goal')) {
    tiles[goal2Index].classList.remove('goal2')
    goal2Index = Math.floor(Math.random() * tiles.length)
    tiles[goal2Index].classList.add('goal2')
  }

}

function portalClear() {

  portal1.forEach((item) => {
    tiles[item].classList.remove('snake1')
    tiles[item].classList.remove('snake1Head')
    tiles[item].classList.remove('snake2')
    tiles[item].classList.remove('snake2Head')
  })

  portal2.forEach((item) => {
    tiles[item].classList.remove('snake1')
    tiles[item].classList.remove('snake1Head')
    tiles[item].classList.remove('snake2')
    tiles[item].classList.remove('snake2Head')
  })
}





elements.music.addEventListener('click', () => {

  if (musicIsPlaying === true) {
    elements.audio1.pause()
    elements.musicStatus.innerHTML = 'OFF'
    musicIsPlaying = false
  } else if (musicIsPlaying === false) {
    elements.audio1.src = './Sounds/Grid_Music.mp3'
    elements.audio1.play()
    elements.musicStatus.innerHTML = 'ON'
    musicIsPlaying = true
  }

})

elements.sfx.addEventListener('click', () => {

  if (sfxIsOn === true) {
    sfxIsOn = false
    elements.sfxStatus.innerHTML = 'OFF'

  } else if (sfxIsOn === false) {
    sfxIsOn = true
    elements.sfxStatus.innerHTML = 'ON'
  }

})


elements.onePlayer.addEventListener('click', () => {

  elements.oneDot.innerHTML = '•'
  elements.twoDot.innerHTML = ''
  isOnePlayer = true

})

elements.twoPlayer.addEventListener('click', () => {

  elements.oneDot.innerHTML = ''
  elements.twoDot.innerHTML = '•'
  isOnePlayer = false

})

// !\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ a.i. experament


