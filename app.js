/* Functions */
function createGrid(size) {
    const container = document.querySelector('.container');

    for (let i=0; i<size; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        container.appendChild(rowDiv);
    }
    const rows = document.querySelectorAll('.row');
    rows.forEach( (row) => {
        for (let i=0; i<size; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            row.appendChild(square);
        }
    });

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseover', updateColor);
        square.addEventListener('touchmove', updateColor);
    })
}

function updateColor() {
    if (drawing) {
        switch (mode) {
            case 'black':
                this.style.backgroundColor = '#000';
                break;
            case 'greyscale':
                modeGreyscale(this);
                break;
            case 'colour':
                this.style.backgroundColor = colour;
                break;
            case 'erase':
                this.style.backgroundColor = '#fff';
                break;
            default:
                console.log("ERROR: Mode-selection");
        }
    } else {
        return;
    }
}

function modeGreyscale(square) {
    let currColour = square.style.backgroundColor;
    if (currColour) {
        square.style.backgroundColor = `${incGreyscale(currColour)}`
    } else {
        square.style.backgroundColor = '#ddd';
    };
}

function incGreyscale(rgb) {
    let [r, g, b] = rgb.slice(4, -1).split(', ');
    if (r-32 < 0) {
        return 'rgb(0, 0, 0)'
    }
    return `rgb(${r-32}, ${g-32}, ${b-32})`;
}

function startDrawing(event) {
    event.preventDefault(); // Prevent selection/drag behaviour
    drawing = true;
}

function endDrawing() {
    drawing = false;
}


// On page load
createGrid(55);

let mode = 'black';
let colour = 'red';
let drawing = false;
const squares = document.querySelectorAll('.square');
const buttons = document.querySelectorAll('button');
const picker = document.querySelector('#colour');
const slider = document.querySelector('.slider');
const container = document.querySelector('.container');

// Event Listeners
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id !== 'reset') {
            mode = button.id;
        } else {
            let squares = document.querySelectorAll('.square');
            squares.forEach(square => square.style.backgroundColor = '#fff');
        };
    });
});

picker.addEventListener('input', (e) => {
    mode = 'colour';
    colour = e.target.value;
});

slider.addEventListener('input', () => {
    let container = document.querySelector('.container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(slider.value);
});

container.addEventListener('mousedown', startDrawing, false);
container.addEventListener('touchstart', startDrawing, false);

// Capture this event anywhere in case you drag out of bounds
document.addEventListener('mouseup', endDrawing, false);
document.addEventListener('touchend', endDrawing, false);
