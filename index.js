let divs = [];
let limits;

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.tag = this.representItself(this.x, this.y);
    }

    representItself(x, y) {
        let tag = document.createElement('div');
        tag.setAttribute('id', 'pj');
        return tag;
    }

    resetPos() {
      this.x = 0;
      this.y = 0;
    }
}

function initGrid(x, y) {
  limits = {x: x - 1, y: y - 1};
  pj.resetPos();
  if (divs.length > 0) {
    divs.forEach((i) => i.removeEventListener('click', blockDiv));
    divs = [];
  }
  let grid = document.getElementById('grid');
  grid.innerHTML = null;
  for (let i = 0; i < y; i++) {
    let row = document.createElement('DIV');
    row.classList.add('row');
    for (let f = 0; f < x; f++) {
      let div = document.createElement('DIV');
      div.setAttribute('x',f);
      div.setAttribute('y', i);
      div.classList.add('square');
      row.appendChild(div);
    }
    grid.appendChild(row);
  }
  divs = document.querySelectorAll('.row .square')
  divs.forEach((i) => i.addEventListener('click', blockDiv));
  moveDivHandler();
}

// Check direction of the player based on key pressed.
function movePjHandler (e) {
    let direction = e.key;
    switch (direction) {
        case 'ArrowUp':
            if (checkBlock(pj.x, pj.y - 1)) {
              pj.y -= 1;
              if (pj.y < 0) pj.y += 1;
            }
            break;
        case 'ArrowDown':
            if (checkBlock(pj.x, pj.y + 1)) {
              pj.y += 1;
              if (pj.y > limits.y) pj.y -= 1;
            }
            break;
        case 'ArrowLeft':
            if (checkBlock(pj.x - 1, pj.y)) {
                pj.x -= 1;
                if (pj.x < 0) pj.x += 1;
            }
            break;
        case 'ArrowRight':
            if (checkBlock(pj.x + 1, pj.y)) {
              pj.x += 1;
              if (pj.x > limits.x) pj.x -= 1;
            }
            break;
    }
    moveDivHandler();
}

// Move the player div to another div if it's not blocked.
function moveDivHandler() {
    divs.forEach((div) => {
        if (!div.classList.contains('block')) {
            if ((div.getAttribute('x') == pj.x) && (div.getAttribute('y') == pj.y)) {
                    div.appendChild(pj.tag);
                }
            }
    });
}

// Check if the new position is blocked.
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

// Toggle block in the clicked div.
// If the player is there, it'll be moved to the next div.
// Improve this.
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

function resizeGrid () {
  let sizes = document.getElementsByName('size');
  if ((sizes[0].value != "") || (sizes[1].value != "")) {
    initGrid(sizes[0].value, sizes[1].value);
  }
}

window.addEventListener('keydown', movePjHandler);
document.getElementById('sizeBtn').addEventListener('click', resizeGrid);
var pj = new Player;
initGrid(3, 3);
moveDivHandler();
