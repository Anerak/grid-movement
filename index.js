const divs = document.querySelectorAll('#holder div');
const limits = {x: 9, y: 9}

class Player {
    constructor() {
        this.x = 1;
        this.y = 1;
        this.tag = this.representItself(this.x, this.y);
    }

    representItself(x, y) {
        let tag = document.createElement('div');
        tag.setAttribute('id', 'pj');
        return tag;
    }
}

function movePjHandler (e) {
    let direction = e.key;
    switch (direction) {
        case 'ArrowUp':
            if (checkBlock(pj.x, pj.y - 1)) {
                pj.y = pj.y - 1 >= 0 ? pj.y - 1 : 0;
            }
            break;
        case 'ArrowDown':
            if (checkBlock(pj.x, pj.y + 1)) {
                pj.y = pj.y + 1 <= limits.y ? pj.y + 1 : limits.y;
            }
            break;
        case 'ArrowLeft':
            if (checkBlock(pj.x - 1, pj.y)) {
                pj.x = pj.x - 1 >= 0 ? pj.x - 1 : 0;
            }
            break;
        case 'ArrowRight':
            if (checkBlock(pj.x + 1, pj.y)) {
                pj.x = pj.x + 1 <= limits.x ? pj.x + 1 : limits.x;
            }
            break;
    }
    moveDivHandler();
}

function moveDivHandler() {
    divs.forEach((div) => {
        if (!div.classList.contains('block')) {
            if ((div.getAttribute('x') == pj.x) && (div.getAttribute('y') == pj.y)) {
                    div.appendChild(pj.tag);
                }
            }
    });
}

function checkBlock(x, y) {
    let proceed = true;
    divs.forEach((div) => {
        if (div.getAttribute('x') == x && div.getAttribute('y') == y) {
            if (div.classList.contains('block')) {
                proceed = false;
            }
        }
    });
    return proceed;
}

function blockDiv(e) {
    let target = e.target;
    if (target.classList.contains('block')) {
        target.classList.toggle('block');
    } else {
        target.classList.toggle('block');
        if (target.hasChildNodes()) {
            pj.x = (target.getAttribute('x') - 1) < 0 ? pj.x + 1 : pj.x - 1;
        moveDivHandler();
        }
    }
}

window.addEventListener('keydown', movePjHandler);
divs.forEach((i) => i.addEventListener('click', blockDiv));
var pj = new Player;
moveDivHandler();