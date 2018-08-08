import Emitter from './Domain/Emitter';
import Picker from './Domain/Picker';
import Paint from './Domain/Paint';
import Grid from './Domain/Grid';
import PresentationGrid from './Presentation/Grid';
import Util from './Util';
import PresentationColorPicker from './Presentation/Picker';

Util.ready(() => {
  document.getElementById('init').addEventListener('click', () => {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const config = {
      cellSize: 30,
      gridSize: {
        width,
        height
      },
      colorPicker : {
        colors: [
          '#f59c02',
          '#111010',
          '#800000',
          '#FF0000',
          '#FFFF00',
          '#808000',
          '#00FF00',
          '#008000',
          '#00FFFF',
          '#008080',
          '#0000FF',
          '#800080',
        ],
        defaultColor : '#0000FF'

      }
    };

    const emitter = new Emitter();
    const picker = new Picker(emitter, config.colorPicker.defaultColor, config.colorPicker.colors);
    const grid = new Grid(config.gridSize.height, config.gridSize.width, emitter);
    const paint = new Paint(grid, emitter, picker);

    const cellSize = config.cellSize;
    const rootElement = document.getElementById('root');
    Util.removeChildren(rootElement);
    rootElement.setAttribute(
      'style',
      `width: ${cellSize * grid.width}px !important; height: ${cellSize *
      grid.height}px; border: solid 1px #000000`,
    );

    const pickerRootElement = document.getElementById('color-picker');
    Util.removeChildren(pickerRootElement);
    const presentationPickerWidth = cellSize * ((picker.availableColors.length / 2) + 2);
    const presentationPickerHeight = cellSize * 2;
    pickerRootElement.setAttribute(
      'style',
      `width: ${presentationPickerWidth}px !important; height: ${presentationPickerHeight}px; border: solid 1px #000000`,
    );

    const presentationGrid = new PresentationGrid(grid, cellSize, rootElement);
    presentationGrid.draw().attachListener((position) => {
      paint.paint(position.x, position.y);
    });

    const presentationColorPicker = new PresentationColorPicker(picker, cellSize, pickerRootElement);
    presentationColorPicker.drawCurrentColor()
      .draw()
      .attachListener((color) => {
        picker.changeColor(color);
      });

    emitter.addListener('grid.cell.change', presentationGrid);
    emitter.addListener('picker.change', presentationColorPicker);
  });

});
