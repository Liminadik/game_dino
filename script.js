const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const ground = document.getElementById("ground");
const hitbox_dino = document.getElementById("hitbox_dino");
const hitbox_cactus = document.getElementById("hitbox_cactus");
const menu = document.getElementById("menu");
const button_start = document.getElementById("button_start");
const metres = document.getElementById("metres");
button_start.style.width = "100%";
cactus.classList.add("cactusMuv");
let game_onoff = false;


button_start.addEventListener('click', function(event) {
    game_onoff = true;
})


ground.addEventListener('click', function(event) {
    jump();
});
function jump () {
    if (dino.classList != "jump") {
        dino.classList.add("jump")

        setTimeout(function () {
            dino.classList.remove("jump")
        }, 700)
    }
}

function checkCollision(object1, object2) {
  return !(
    object1.x > object2.x + object2.width ||
    object1.x + object1.width < object2.x ||
    object1.y > object2.y + object2.height ||
    object1.y + object1.height < object2.y
  );
}
let metres_reset = false
function timer () {
    if (game_onoff == true) {
        if (document.getElementById("metres").innerText == "" || metres_reset == false) {
            document.getElementById("metres").innerText = "0m"
            metres_reset = true;
        }
        let metres_int = parseInt(document.getElementById("metres").innerText);
        metres_text = metres_int + 1

        document.getElementById("metres").textContent = metres_text + "m";
    }
}
const intervalTimer = setInterval(timer, 100);

let game = setInterval(function() {
    let player = { 
        x: hitbox_dino.offsetParent.offsetLeft + hitbox_dino.offsetLeft, 
        y: hitbox_dino.offsetParent.offsetTop + hitbox_dino.offsetTop, 
        width: hitbox_dino.offsetWidth,
        height: hitbox_dino.offsetHeight
    };
    let enemy = { 
        x: hitbox_cactus.offsetParent.offsetLeft + hitbox_cactus.offsetLeft, 
        y: hitbox_cactus.offsetParent.offsetTop + hitbox_cactus.offsetTop, 
        width: hitbox_cactus.offsetWidth,
        height: hitbox_cactus.offsetHeight
    };
    if (checkCollision(player, enemy)) {
        game_onoff = false;
        console.log("Game Over.");
    } else {
        console.log("Нет столкновения.");
    }
    if (game_onoff == true) {
        menu.classList.remove("menu_down");
        menu.classList.add('menu_up')
        menu.style.top = "-146vh"
        setTimeout(function ()  {
            cactus.classList.add('cactusMuv');
        }, 1500)
        if (button_start.classList == 'button_start_right' || button_start.classList == '') {
            setTimeout(function () {
                button_start.classList.remove('button_start_right');
                button_start.classList.add('button_start_left');
            }, 100)
        }
        if (metres.classList == 'metres_right' || metres.classList == '') {
            setTimeout(function () {
                metres.classList.remove('metres_right');
                metres.classList.add('metres_left');
            }, 100)
        }
    } else if (game_onoff == false) {
        metres_reset = false;
        if (menu.classList != '') {
            menu.classList.remove('menu_up')
            cactus.classList.remove('cactusMuv')
            menu.classList.add('menu_down')
            menu.style.top = "-53vh"
            if (button_start.classList == 'button_start_left') {
                setTimeout(function () {
                    button_start.classList.remove('button_start_left');
                    button_start.classList.add('button_start_right');
                }, 0)
            }
            if (metres.classList == 'metres_left') {
                setTimeout(function () {
                    metres.classList.remove('metres_left');
                    metres.classList.add('metres_right');
                }, 0)
            }
            console.log(game_onoff);
        }

    }
});
