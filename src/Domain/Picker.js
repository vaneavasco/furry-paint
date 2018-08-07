class Picker {
  constructor(defaultColor = '#000000', availableColors = ['#FF0000', '#000000']) {
    this.color = defaultColor;
    this.availableColors = availableColors;
  }

  changeColor(color) {
    if (this.availableColors.indexOf(color) !== -1) {
      this.color = color;
    }
  }

  handle(color) {
    this.changeColor(color);
  }
}

export default Picker;
