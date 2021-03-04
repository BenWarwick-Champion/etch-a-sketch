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
    })
}

function updateColor() {
    switch (mode) {
        case 'black':
            this.style.backgroundColor = '#000';
            break;
        case 'greyscale':
            modeGreyscale(this);
            break;
        case 'erase':
            this.style.backgroundColor = '#fff';
            break;
        default:
            console.log("ERROR: Mode-selection");
    }
}

function modeGreyscale(square) {
    let currColour = square.style.backgroundColor;
    console.log(currColour);
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


// On page load
createGrid(40);

let mode = 'black';
const squares = document.querySelectorAll('.square');
const buttons = document.querySelectorAll('button');

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
