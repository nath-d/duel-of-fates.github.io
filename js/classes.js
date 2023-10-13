class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
    }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}

class Player extends Sprite {
    constructor({ position,
        velocity,
        color = 'blue',
        offset = { x: 0, y: 0 },
        imageSrc,
        scale = 1,
        framesMax = 1,
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({
            imageSrc,
            scale,
            framesMax,
            offset

        })

        this.image = new Image()
        this.image.src = imageSrc
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 200
        this.lastKey
        this.health = 100
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.color = color
        this.isAttacking
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites)

    }

    // draw() {
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height) //draws a player on the screen with arguments from player object
    //     // c.drawImage(
    //     //     this.image,
    //     //     this.position.x,
    //     //     this.position.y,
    //     // )



    //     //attack box
    //     if (this.isAttacking) {
    //         c.fillStyle = 'white'
    //         c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    //     }


    // }

    update() {
        this.draw()
        if (this.dead != true) this.animateFrames()
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)



        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {     //stops player from going beyond canvas height
            this.velocity.y = 0
            this.position.y = 426.30
        } else {
            this.velocity.y += gravity
        }

        // map boundaries
        if (player.position.x + (player.offset.x / 2) >= canvas.width) {
            player.position.x = canvas.width - ((player.offset.x / 2) + 10)

        }
        if (enemy.position.x + (enemy.offset.x) >= canvas.width) {
            enemy.position.x = canvas.width - (enemy.offset.x + 10)
        }
        if (player.position.x <= 0) {
            player.position.x = 0
        }
        if (enemy.position.x + (enemy.offset.x / 2) <= 0) {
            enemy.position.x = 0 - ((enemy.offset.x / 2 - 10))
        }


    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        // setTimeout(() => {
        //     this.isAttacking = false
        // }, 100)
    }
    takeHit() {
        this.health -= 10
        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }



    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.frameCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true

            }
            return
        }
        if (this.image === this.sprites.attack1.image &&
            this.frameCurrent < this.sprites.attack1.framesMax - 1) {
            return
        }
        if (this.image === this.sprites.takeHit.image &&
            this.frameCurrent < this.sprites.takeHit.framesMax - 1) { return }


        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.frameCurrent = 0
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.frameCurrent = 0
                }
                break;

        }

    }
}