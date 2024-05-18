const gameScreen = document.getElementById('game-screen')
const scoreBoard = document.getElementById('score-board')
const highScoreBoard = document.getElementById('high-score-board')
const startInfo = document.getElementById('game-start-info')
const refreshIcon = document.getElementById('refresh-icon')
const chooseCharacteScreen = document.getElementById('choose-character-screen')
const characterOption = document.querySelectorAll('.character-option')

const SCREEN_CONFIG = {
  width: gameScreen.getBoundingClientRect().width,
  height:  gameScreen.getBoundingClientRect().height
}

console.log(SCREEN_CONFIG.height);

let score = 0
let gameOver = false
let gameStared = false
let isCharacterSelected = false
let allowPlayBGM = true

let musics = {
  jump: new Audio('/assets/musics/jump.wav'),
  hit: new Audio('/assets/musics/hit.mp3'),
  bgm: new Audio('/assets/musics/bgm.mp3')
}

let block = new Block()
block.draw()

let player = new Player()
player.draw()

function main(){
  if (!gameOver && gameStared && isCharacterSelected) {
    player.update()
    block.update()
    score++
    scoreBoard.textContent = `${Math.floor(score / 10)}`
  } 
  
  if (gameOver) {
    startInfo.style.opacity = 1
    refreshIcon.style.opacity = 1
    startInfo.textContent = 'Game Over'
  }
    
  requestAnimationFrame(main)
}

main()

refreshIcon.addEventListener('click', ()=>{
  
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
  
  
})


characterOption.forEach((option)=>{
  option.addEventListener('click', ()=>{
    
    if (option.getAttribute('id') == 'opt1') {
      player.sprite.src = player.skin[0][0]
      localStorage.setItem('opt', '1')
    } else {
      player.sprite.src = player.skin[0][1]
      localStorage.setItem('opt', '2')
    }
    
    setTimeout(()=>{
      
      chooseCharacteScreen.style.opacity = 0
      chooseCharacteScreen.style.pointerEvents = 'none'
      startInfo.style.opacity = 1
      gameScreen.style.opacity = 1
    
      isCharacterSelected = true
    }, 300)
  })
})

document.addEventListener('click', ()=>{
  if (!gameOver && isCharacterSelected) {
    player.jump()
  }
})

document.addEventListener('click', ()=>{
  if (isCharacterSelected) {
    startInfo.style.opacity = 0
    scoreBoard.style.opacity = 1
    gameStared = true
  }
})

document.addEventListener('keydown', e=> {
  
  switch (e.code) {
    
    case "Space":
      if (!gameOver && isCharacterSelected) {
        startInfo.style.opacity = 0
        scoreBoard.style.opacity = 1
        gameStared = true
        
        player.jump()
      }
      break
    case "ArrowUp":
      if (!gameOver && isCharacterSelected) {
        startInfo.style.opacity = 0
        scoreBoard.style.opacity = 1
        gameStared = true
        
        player.jump()
      }
      break
    default:
      if (isCharacterSelected) {
        startInfo.style.opacity = 0
        scoreBoard.style.opacity = 1
        gameStared = true
      }
      break
  }
  
})


