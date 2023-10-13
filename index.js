const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) //takes arguments (x position, y position, width, height) 

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundImageMain.png',
    scale: 1.12
})

// const shop = new Sprite({
//     position: {
//         x: 765,
//         y: 380
//     },
//     imageSrc: './img/move.png',
//     scale: 5,
//     framesMax: 18
// })


const player = new Player({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    scale: 3.2,

    offset: {
        x: 190,
        y: 223
    },
    imageSrc: './img/Players/warrior/Idle.png',
    framesMax: 10,
    sprites: {
        idle: {
            imageSrc: './img/warrior/Idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './img/warrior/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/warrior/Jump.png',
            framesMax: 3
        },
        fall: {
            imageSrc: './img/warrior/Fall.png',
            framesMax: 3
        },
        attack1: {
            imageSrc: './img/warrior/Attack2.png',
            framesMax: 7
        },
        takeHit: {
            imageSrc: './img/warrior/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/warrior/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 0
        },
        width: 100,
        height: 50
    }
})
const enemy = new Player({
    position: {
        x: 824,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    scale: 2.5,
    imageSrc: './img/Players/wizard/Idle.png',
    framesMax: 8,
    offset: {
        x: 200,
        y: 320
    },
    sprites: {
        idle: {
            imageSrc: './img/wizard/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/wizard/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/wizard/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/wizard/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/wizard/Attack1.png',
            framesMax: 8
        },
        takeHit: {
            imageSrc: './img/wizard/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/wizard/Death2.png',
            framesMax: 7

        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
    }
})


// const enemy = new Player({
//     position: {
//         x: 924,
//         y: 0
//     },
//     velocity: {
//         x: 0,
//         y: 0
//     },
//     offset: {
//         x: -50,
//         y: 0
//     },
//     color: 'red'
// })


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


function winnerDeterminer({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health > 0 && enemy.health > 0) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
    } else if (enemy.health > player.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 wins'
    }
}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        winnerDeterminer({ player, enemy, timerId })
    }

}

decreaseTimer()


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    // shop.update()

    player.update()
    enemy.update()


    //Stops moving player for every frame
    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
        // player.attackBox.offset.x = -50
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        // player.attackBox.offset.x = player.width - 50
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')

    }

    //enemy movement
    if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
        // enemy.attackBox.offset.x = -50
    } else if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = 5
        // enemy.attackBox.offset.x = enemy.width - 50
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')

    }

    //attack collision 
    if (collision({
        rect1: player,
        rect2: enemy
    }) &&
        player.isAttacking && player.frameCurrent === 4) {

        enemy.takeHit()
        player.isAttacking = false
        // enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        console.log("player attack")
    }
    if (collision({
        rect1: enemy,
        rect2: player
    }) &&
        enemy.isAttacking && enemy.frameCurrent === 4) {


        player.takeHit()
        enemy.isAttacking = false
        // player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log("enemy attack")
    }

    //player miss
    if (player.isAttacking && player.frameCurrent === 4) {
        player.isAttacking = false
    }
    if (enemy.isAttacking && enemy.frameCurrent === 4) {
        enemy.isAttacking = false
    }



    // game end
    if (enemy.health <= 0 || player.health <= 0) {
        winnerDeterminer({ player, enemy, timerId })
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
        case 's':
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
            enemy.attack()
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
