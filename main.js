const gameScreen = document.getElementById('game-screen')
const touchPad = document.getElementById('touch-screen')
const scoreBoard = document.getElementById('score-board')
const startInfo = document.getElementById('game-start-info')
const refreshIcon = document.getElementById('refresh-icon')
const chooseCharacteScreen = document.getElementById('choose-character-screen')
const characterOption = document.querySelectorAll('.character-option')

const SCREEN_CONFIG = {
  width: gameScreen.getBoundingClientRect().width,
  height: gameScreen.getBoundingClientRect().height
}

console.log(SCREEN_CONFIG.height);

let score = 0
let highScore = getHighScore()
let gameOver = false
let gameStared = false
let isCharacterSelected = false
let allowPlayBGM = true
let gameSpeed = 2

let musics = {
  jump: new Audio('/assets/sfx/jump.mp3'),
  hit: new Audio('/assets/sfx/hit2.mp3'),
  bgm: new Audio('/assets/music/bgm.mp3')
}

let block = new Block()
block.draw()

let player = new Player()
player.draw()

function main() {
  if (!gameOver && gameStared && isCharacterSelected) {
    player.update()
    block.update(gameSpeed)
    score++
    scoreBoard.textContent = `HI: ${highScore} | SCORE: ${Math.floor(score / 10)}`

    if (Math.floor(score / 10) > highScore) {
      highScore = Math.floor(score / 10)
      localStorage.setItem('high-score', highScore)
    }

  }

  if (gameOver) {
    startInfo.style.opacity = 1
    refreshIcon.style.opacity = 1
    startInfo.textContent = 'Game Over'
  }

  requestAnimationFrame(main)
}

main()

function setHighScore() {
  let hScore = localStorage.getItem('high-score')
  if (hScore === null || score > highScore) localStorage.setItem('high-score', Math.floor(score / 10))

}

function getHighScore() {
  let hScore = localStorage.getItem('high-score')
  return hScore ? parseInt(hScore) : 0
}

function restartGame() {

  gameStared = true
  gameOver = false
  score = 0
  block.position.x = SCREEN_CONFIG.width + block.width * 2
  refreshIcon.style.opacity = 0
  startInfo.style.opacity = 0

  block.position.y = SCREEN_CONFIG.height - block.height * block.arrY[block.numA]
  block.sprite.style.background = block.skin[block.numA][block.numB]

  if (block.numA === 1) {
    block.sprite.style.clipPath = 'polygon(0% 50%, 100% 0%, 100% 100%)'
  } else {
    block.sprite.style.clipPath = 'none'
  }

  if (localStorage.getItem('opt') == 1) {
    player.sprite.src = player.skin[0][0]
  } else {
    player.sprite.src = player.skin[0][1]
  }

}

function startGame() {
  if (!gameOver && isCharacterSelected) {
    startInfo.style.opacity = 0
    scoreBoard.style.opacity = 1
    gameStared = true

  }
}

characterOption.forEach((option) => {
  option.addEventListener('click', () => {

    if (option.getAttribute('id') == 'opt1') {
      player.sprite.src = player.skin[0][0]
      localStorage.setItem('opt', '1')
    } else {
      player.sprite.src = player.skin[0][1]
      localStorage.setItem('opt', '2')
    }

    setTimeout(() => {

      chooseCharacteScreen.style.opacity = 0
      chooseCharacteScreen.style.pointerEvents = 'none'
      startInfo.style.opacity = 1
      gameScreen.style.opacity = 1
      touchPad.style.opacity = 1

      isCharacterSelected = true
    }, 300)
  })
})

touchPad.addEventListener('click', () => {
  if (!gameOver && isCharacterSelected) {
    player.jump()
  }
})

document.addEventListener('click', () => {
  if (isCharacterSelected) {
    startInfo.style.opacity = 0
    scoreBoard.style.opacity = 1
    gameStared = true
  }
})


refreshIcon.addEventListener('click', restartGame)
document.addEventListener('keydown', e => {
  switch (e.code) {

    case "Space":
      startGame()
      if (!gameOver) player.jump()
      break
    case "ArrowUp":
      if (!gameOver) player.jump()
      break
    case "KeyR":
      if (gameOver && isCharacterSelected) restartGame()
      break
    default:
      startGame()
      break
  }

})


