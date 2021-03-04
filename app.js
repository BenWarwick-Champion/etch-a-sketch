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

createGrid(10);
