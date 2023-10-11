class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 7
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


    update() {
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }


    }
}

class Player extends Sprite {
    constructor({ position, velocity, color = 'blue', offset = { x: 0, y: 0 }, imageSrc, scale = 1, framesMax = 1 }) {
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
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 7

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
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {     //stops player from going beyond canvas height
            this.velocity.y = 0
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
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}