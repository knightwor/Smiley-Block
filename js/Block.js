class Block {
  constructor() {
    this.width = 64
    this.height = 64
    this.skin = [['#0090ff', 'red', 'pink'], ['#8D02FF', 'orange', '#FFC502']]
    this.dn = 1
    this.gravity = 0
    this.moveSpeed = window.innerWidth >= 900 ? -1 : -0.1
    
    this.arrY = [1, 2.1]
    this.posY = Math.floor(Math.random() * 2)
    
    this.position = {
      x: SCREEN_CONFIG.width + this.width * 2 ,
      y: SCREEN_CONFIG.height - this.height * this.dn
      
    }
    
    this.velocity = {
      x: 0,
      y: 0
    }
    
  }
  
  draw(){
    this.sprite = document.createElement('div')
    
    this.sprite.style.width = `${this.width}px`
    this.sprite.style.height = `${this.height}px`
    this.sprite.style.top = `${this.position.y}px`
    this.sprite.style.left = `${this.position.x}px`
    this.sprite.style.background = this.skin[0][0]
    this.sprite.style.position = 'absolute'
    this.sprite.style.borderRadius = '2px'
    
    gameScreen.append(this.sprite)
  }
  
  update(){
    this.position.x += this.velocity.x
    this.velocity.x += this.moveSpeed
    
    this.numA = Math.floor(Math.random() * 2 )
    this.numB = Math.floor(Math.random() * 3)
    
    if (this.position.x + this.velocity.x < (0 - this.height * 2)) {
      
      this.position.x = SCREEN_CONFIG.width + (this.height * 2)
      
      this.position.y = SCREEN_CONFIG.height - this.height * this.arrY[this.numA]
      this.sprite.style.background = this.skin[this.numA][this.numB]
      
      if (this.numA === 1) {
        this.sprite.style.clipPath = 'polygon(0% 50%, 100% 0%, 100% 100%)'
      } else {
        this.sprite.style.clipPath = 'none'
      }
      
    } 
    
    if (this.velocity.x < -10) {
      this.velocity.x = -10
    }
    
    this.sprite.style.top = `${this.position.y}px`
    this.sprite.style.left = `${this.position.x}px`
    
    
  }
  
}