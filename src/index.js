import Emitter from './Domain/Emitter';
import Picker from './Domain/Picker';
import Paint from './Domain/Paint';
import Grid from './Domain/Grid';
import PresentationGrid from './Presentation/Grid';
import Util from './Util';
import PresentationColorPicker from './Presentation/Picker';


function buildPickerRootElement(cellSize, picker) {
  const pickerRootElement = document.getElementById('color-picker');
  Util.removeChildren(pickerRootElement);
  const presentationPickerWidth = cellSize * ((picker.availableColors.length / 2) + 2);
  const presentationPickerHeight = cellSize * 2;
  pickerRootElement.style.width = `${presentationPickerWidth}px`;
  pickerRootElement.style.height = `${presentationPickerHeight}px`;
  pickerRootElement.style.display = 'block';

  return pickerRootElement;
}

function buildGridRootElement(cellSize, grid) {
  const rootElement = document.getElementById('grid');
  Util.removeChildren(rootElement);

  rootElement.style.width = `${cellSize * grid.width}px`;
  rootElement.style.height = `${cellSize * grid.height}px`;
  rootElement.style.display = 'block';
  return rootElement;
}

function getConfig() {
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);
  const config = {
    cellSize: 30,
    gridSize: {
      width,
      height,
    },
    colorPicker: {
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
      defaultColor: '#0000FF',

    },
  };

  return config;
}

Util.ready(() => {
  document.getElementById('init')
    .addEventListener('click', () => {
      const config = getConfig();
      const emitter = new Emitter();
      const picker = new Picker(emitter, config.colorPicker.defaultColor, config.colorPicker.colors);
      const grid = new Grid(config.gridSize.height, config.gridSize.width, emitter);
      const paint = new Paint(grid, emitter, picker);

      const { cellSize } = config;
      const gridRootElement = buildGridRootElement(cellSize, grid);
      const pickerRootElement = buildPickerRootElement(cellSize, picker);

      const presentationGrid = new PresentationGrid(grid, cellSize, gridRootElement);
      presentationGrid.draw()
        .attachListener((position) => {
          paint.paint(position.x, position.y);
        });

      const presentationColorPicker = new PresentationColorPicker(
        picker,
        cellSize,
        pickerRootElement
      );

      presentationColorPicker.drawCurrentColor()
        .draw()
        .attachListener((color) => {
          paint.changeColor(color);
        });

      emitter.addListener('grid.cell.change', presentationGrid);
      emitter.addListener('picker.change', presentationColorPicker);
    });
});
