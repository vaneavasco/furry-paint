class Grid {
  constructor(height, width, emitter, backgroundColor = '#FFFFFF') {
    this.height = height;
    this.width = width;
    this.backgroundColor = backgroundColor;
    this.emitter = emitter;

    this.init();
  }

  paint(x, y, color) {
    const realColor = this.state[x][y] !== color ? color : this.backgroundColor;
    this.state[x][y] = realColor;
    this.emitter.emit('grid.cell.change', x, y, realColor);
  }

  init() {
    this.state = Array.from(Array(this.height), () => {
      return Array.from(Array(this.width), () => this.backgroundColor);
    });
  }
}

export default Grid;
