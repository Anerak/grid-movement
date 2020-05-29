const divs = document.querySelectorAll('#holder div');

class Player {
    constructor() {
        this.x = 1;
        this.y = 1;
        this.tag = this.representItself(this.x, this.y);
    }

    representItself(x, y) {
        let tag = document.createElement('div');
        tag.setAttribute('x', x);
        tag.setAttribute('y', y);
        tag.setAttribute('id', 'pj');
        return tag;
    }
}

function movePjHandler (e) {
    let direction = e.key;
    switch (direction) {
        case 'ArrowUp':
            pj.y = pj.y - 1 >= 0 ? pj.y - 1 : 0;
            break;
        case 'ArrowDown':
            pj.y = pj.y + 1 <= 2 ? pj.y + 1 : 2;
            break;
        case 'ArrowLeft':
            pj.x = pj.x - 1 >= 0 ? pj.x - 1 : 0;
            break;
        case 'ArrowRight':
            pj.x = pj.x + 1 <= 2 ? pj.x + 1 : 2;
            break;
    }
    moveDivHandler();
}

function moveDivHandler() {
    divs.forEach((div) => {
        if (div.getAttribute('x') == pj.x) {
            if (div.getAttribute('y') == pj.y) {
                div.appendChild(pj.tag);
            }
        }
    });
}

window.addEventListener('keydown', movePjHandler);
var pj = new Player;
moveDivHandler();