class Player {
  constructor() {
    
    this.width = 64
    this.height = 64
    this.gravity = 1
    this.jumpSpeed = 25
    this.moveSpeed = 5
    this.skin = [['/assets/images/character.png', '/assets/images/character2.png'], ['/assets/images/character_dead.png', '/assets/images/character_dead2.png']]
    
    this.position = {
      x: window.innerWidth >= 900 ? 128 : 64,
      y: SCREEN_CONFIG.height - this.height
    }
    
    this.sides = {
      bottom: this.position.y + this.height,
      left: this.position.x,
      right: this.position.x + this.width,
      top: this.position.y
    }
    
    this.velocity = {
      x: 0,
      y: 0
    }
    
  }
  
  draw(){
    this.sprite = document.createElement('img')
    
    this.sprite.src = this.skin[0][0]
    
    this.sprite.style.width = `${this.width}px`
    this.sprite.style.height = `${this.height}px`
    this.sprite.style.top = `${this.position.y}px`
    this.sprite.style.left = `${this.position.x}px`
    this.sprite.style.position = 'absolute'
    this.sprite.style.borderRadius = '2px'
    
    gameScreen.append(this.sprite)
  }
  
  update(){
    
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.sides.bottom = this.position.y + this.height
    
    if (this.sides.bottom + this.velocity.y < SCREEN_CONFIG.height){ 
      this.velocity.y += this.gravity
      this.velocity.y += this.gravity
      this.sides.bottom = this.position.y + this.height
      
      
    } else this.velocity.y = 0
    
    
    if ((this.position.x + this.width >= block.position.x && this.position.x <= block.position.x + block.width) && (this.position.y + this.height >= block.position.y && this.position.y <= block.position.y + block.height)){
      
      musics.hit.currentTime = 0.10
      musics.hit.play()
      musics.jump.pause()
      musics.bgm.pause()
      musics.bgm.currentTime = 0
      
      if (localStorage.getItem('opt') == 1) {
        this.sprite.src = this.skin[1][0]
      } else {
        this.sprite.src = this.skin[1][1]
      }
      
      block.velocity.x = 0
      gameOver = true
      
    }
    
    this.sprite.style.top = `${this.position.y}px`
    this.sprite.style.left = `${this.position.x}px`
  
  }
  
  jump(){
    if (player.velocity.y === 0)
      player.velocity.y = -30
      musics.jump.play()
    
  }
  
  
}