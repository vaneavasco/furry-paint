class Paint {
  constructor(grid, emitter, picker) {
    this.grid = grid;
    this.emitter = emitter;
    this.picker = picker;
  }

  paint(x, y) {
    this.grid.paint(x, y, this.picker.color);
  }

  changeColor(color) {
    this.picker.changeColor(color);
  }
}

export default Paint;
