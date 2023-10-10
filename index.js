const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) //takes arguments (x position, y position, width, height) 

const gravity = 0.7

class Sprite {
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
        // if (this.isAttacking) {
        c.fillStyle = 'white'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // }


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

const player = new Sprite({
    position: {
        x: 100,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})


const enemy = new Sprite({
    position: {
        x: 874,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'red'
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    j: {
        pressed: false
    },
    l: {
        pressed: false
    }
}

function collision({ rect1, rect2 }) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    )
}



function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    enemy.update()

    //Stops moving player for every frame
    player.velocity.x = 0
    enemy.velocity.x = 0


    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.attackBox.offset.x = -50

    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.attackBox.offset.x = player.width - 50
    }

    //enemy movement
    if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -5
        enemy.attackBox.offset.x = -50
    } else if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = 5
        enemy.attackBox.offset.x = enemy.width - 50
    }

    //attack collision 
    if (collision({
        rect1: player,
        rect2: enemy
    }) &&
        player.isAttacking) {

        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        console.log("player attack")
    }
    if (collision({
        rect1: enemy,
        rect2: player
    }) &&
        enemy.isAttacking) {

        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log("enemy attack")
    }


}

animate() //loop

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

    }
    switch (event.key) {
        case 'l':
            keys.l.pressed = true
            enemy.lastKey = 'l'
            break
        case 'j':
            keys.j.pressed = true
            enemy.lastKey = 'j'
            break
        case 'i':
            enemy.velocity.y = -20
            break
        case 'k':
            enemy.isAttacking = true
            break

    }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    switch (event.key) {
        case 'j':
            keys.j.pressed = false
            break
        case 'l':
            keys.l.pressed = false
            break
    }
})