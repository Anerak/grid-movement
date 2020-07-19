let divs = [];
let limits = {x: 9, y: 9} // Modify this when you resize the grid.

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

function initGrid(x, y) {
  limits = {x: x - 1, y: y - 1};
  if (divs.length > 0) {
    divs.forEach((i) => i.removeEventListener('click', blockDiv));
    divs = [];
  }
  let holder = document.getElementById('holder');
  holder.innerHTML = null;
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
    holder.appendChild(row);
  }
  divs = document.querySelectorAll('.row .square')
  divs.forEach((i) => i.addEventListener('click', blockDiv));
}

// Check direction of the player based on key pressed.
function movePjHandler (e) {
  console.log(`X: ${pj.x} Y: ${pj.y}`);
    let direction = e.key;
    switch (direction) {
        case 'ArrowUp':
            if (checkBlock(pj.x, pj.y - 1)) {
              pj.y -= 1;
              if (pj.y < 0) pj.y += 1;
                //pj.y = pj.y - 1 >= 0 ? pj.y - 1 : 0;
            }
            break;
        case 'ArrowDown':
            if (checkBlock(pj.x, pj.y + 1)) {
              pj.y += 1;
              if (pj.y > limits.y) pj.y -= 1;
                //pj.y = pj.y + 1 <= limits.y ? pj.y + 1 : limits.y;
            }
            break;
        case 'ArrowLeft':
            if (checkBlock(pj.x - 1, pj.y)) {
                pj.x =
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

window.addEventListener('keydown', movePjHandler);
var pj = new Player;
initGrid(3, 3);
moveDivHandler();
