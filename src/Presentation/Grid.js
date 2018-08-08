class Grid {
  constructor(grid, cellSize, rootElement) {
    this.grid = grid;
    this.cellSize = cellSize;
    this.rootElement = rootElement;
    this.cells = new Map();
    this.isMouseDown = false;
  }

  draw() {
    for (let i = 0; i < this.grid.height; i++) {
      for (let j = 0; j < this.grid.width; j++) {
        const cell = this.createCell(i, j);
        this.rootElement.append(cell);
        this.cells.set(
          JSON.stringify({
            x: i,
            y: j,
          }),
          cell
        );
      }
    }

    return this;
  }

  createCell(i, j) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    return cell;
  }

  attachListener(cb) {
    this.cells.forEach((cell, position) => {
      cell.addEventListener('mousedown', () => {
        this.isMouseDown = true;
        cb(JSON.parse(position));
      });
      cell.addEventListener('mousemove', () => {
        this.isDrag = this.isMouseDown;
      });
      cell.addEventListener('mouseover', () => {
        if (this.isDrag) {
          cb(JSON.parse(position));
        }
      });
      cell.addEventListener('mouseup', () => {
        this.isDrag = false;
        this.isMouseDown = false;
      });
    });
  }

  handle(x, y, color) {
    const cell = this.cells.get(JSON.stringify({
      x,
      y,
    }));
    cell.style.backgroundColor = color;
  }
}

export default Grid;
