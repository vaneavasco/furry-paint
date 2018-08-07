import Emitter from './Domain/Emitter';
import Picker from './Domain/Picker';
import Paint from './Domain/Paint';
import Grid from './Domain/Grid';
import PresentationGrid from './Presentation/Grid';
import Util from './Util';

const config = {
  cellSize: 30,
  gridSize: {
    width: 30,
    height: 30
  }
};

Util.ready(() => {
  const emitter = new Emitter();
  const picker = new Picker();
  const grid = new Grid(config.gridSize.height, config.gridSize.width, emitter);
  const paint = new Paint(grid, emitter, picker);

  const cellSize = config.cellSize;
  const rootElement = document.getElementById('root');
  rootElement.setAttribute(
    'style',
    `width: ${cellSize * grid.width}px !important; height: ${cellSize *
    grid.height}px; border: solid 1px #000000`,
  );

  const pgrid = new PresentationGrid(grid, cellSize, rootElement);
  pgrid.draw().attachListener((position) => {
    paint.paint(position.x, position.y);
  });

  emitter.addListener('grid.cell.change', pgrid);
});
