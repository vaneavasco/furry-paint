class Picker {
  constructor(picker, cellSize, rootElement) {
    this.picker = picker;
    this.cellSize = cellSize;
    this.rootElement = rootElement;
    this.colorCels = new Map();
  }

  draw() {
    const colors = this.picker.availableColors;
    colors.forEach((color) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.backgroundColor = color;
      this.colorCels.set(color, cell);
      this.rootElement.append(cell);
    });

    return this;
  }

  drawCurrentColor() {
    const cell = document.createElement('div');
    cell.classList.add('current');
    cell.style.backgroundColor = this.picker.color;
    this.rootElement.append(cell);
    this.currentColorCell = cell;

    return this;
  }

  attachListener(cb) {
    this.colorCels.forEach((cell, color) => {
      cell.addEventListener('click', () => {
        cb(color);
      });
    });
  }

  handle(color) {
    this.currentColorCell.style.backgroundColor = color;
  }
}

export default Picker;
