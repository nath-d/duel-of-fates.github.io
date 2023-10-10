class Sprite {
    constructor({ position, imageSrc, scale = 1 }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        )
    }


    update() {
        this.draw()


    }
}

class Player {
    constructor({ position, velocity, color = 'blue', offset }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
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

    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //draws a player on the screen with arguments from player object



        //attack box
        if (this.isAttacking) {
            c.fillStyle = 'white'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }


    }

    update() {
        this.draw()

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
        if (player.position.x >= canvas.width - player.width) {
            player.position.x = canvas.width - player.width
        }
        if (enemy.position.x >= canvas.width - enemy.width) {
            enemy.position.x = canvas.width - enemy.width
        }
        if (player.position.x <= 0) {
            player.position.x = 0
        }
        if (enemy.position.x <= 0) {
            enemy.position.x = 0
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}