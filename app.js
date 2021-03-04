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
    } );
}

function initSquares() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mouseover', () => {
            modeGreyscale(square);
        });
    });
}

function modeBlack(square) {
    square.style.cssText = "background-color: #000";
}

function modeErase(square) {
    square.style.cssText = "background-color: #fff";
}

function modeGreyscale(square) {
    let currColour = square.style.backgroundColor;
    if (currColour) {
        square.style.cssText = `background-color: ${incGreyscale(currColour)};`;
    } else {
        square.style.cssText = "background-color: #ddd;";
    };
}

function incGreyscale(rgb) {
    let [r, g, b] = rgb.slice(4, -1).split(', ');
    if (r-32 < 0) {
        return 'rgb(0, 0, 0)'
    }
    return `rgb(${r-32}, ${g-32}, ${b-32})`;
}

createGrid(40);
initSquares();
console.log((parseInt('d', 16) - 2).toString(16));
