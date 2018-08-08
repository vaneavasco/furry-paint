class Picker {
  constructor(emitter, defaultColor = '#FF0000', availableColors = ['#FF0000', '#000000']) {
    this.color = defaultColor;
    this.emitter = emitter;
    this.availableColors = availableColors;
  }

  changeColor(color) {
    if (this.availableColors.indexOf(color) !== -1) {
      this.color = color;
      this.emitter.emit('picker.change', color);
    }
  }

  handle(color) {
    this.changeColor(color);
  }
}

export default Picker;
