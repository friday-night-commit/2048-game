import Engine, { Direction } from '.';
import { Utils } from '../Utils';
import { Position } from '../Cell';
import randomEnum from '../../../Utils/randomEnum';

const createEngine = (ctx: CanvasRenderingContext2D, size = 2): Engine =>
  new Engine(
    ctx,
    100,
    size,
    () => {},
    () => {},
    false,
    false,
    false,
    () => {}
  );

describe('Engine class', () => {
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, engine: Engine;

  const isPosition = (position: Position | undefined): position is Position =>
    position !== undefined;
  const fillNewlyCreatedMatrix = (engine: Engine): Position[] => {
    return [...Array(engine.size * engine.size - 1)]
      .map(() => engine.generateCell())
      .filter(isPosition);
  };

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  });

  // cannot test by snapshots because matrix generated with random initial state every time
  // it('should draw cell matrix', () => {
  //   engine = createEngine(ctx);
  //   engine.render();

  //   // @ts-ignore - __getEvents comes from jest-canvas-mock package
  //   const events = ctx.__getEvents();
  //   expect(events).toMatchSnapshot();
  // });

  it('should have cell matrix of specified size', () => {
    const generateMatrix = Utils.generateMatrix.bind(Utils);
    const spy = jest
      .spyOn(Utils, 'generateMatrix')
      .mockImplementation(jest.fn(size => generateMatrix(size)));
    engine = createEngine(ctx, 6);

    expect(engine.size).toBe(6);
    expect(Utils.generateMatrix).toBeCalledTimes(2);
    expect(Utils.generateMatrix).toBeCalledWith(6);

    spy.mockClear();
  });

  it('should throw error for invalid matrix size', () => {
    expect(() => {
      engine = createEngine(ctx, 0);
    }).toThrow('Invalid size for cell matrix');
  });

  it('should have proper initial configuration', () => {
    engine = createEngine(ctx);

    expect(engine.isGameOver).toBeFalsy();
    expect(engine.score).toBe(0);
  });

  it('should add keydown listener on init', () => {
    const spy = jest
      .spyOn(document, 'addEventListener')
      .mockImplementation(jest.fn);
    engine = createEngine(ctx);

    expect(document.addEventListener).toBeCalledTimes(1);
    expect(document.addEventListener).toBeCalledWith(
      'keydown',
      expect.any(Function)
    );

    spy.mockClear();
  });

  it('should remove keydown listener on destroy', () => {
    const spy = jest
      .spyOn(document, 'removeEventListener')
      .mockImplementation(jest.fn);
    engine = createEngine(ctx);
    engine.destroy();

    expect(document.removeEventListener).toBeCalledTimes(1);
    expect(document.removeEventListener).toBeCalledWith(
      'keydown',
      expect.any(Function)
    );

    spy.mockClear();
  });

  it('should generate new cell position properly', () => {
    engine = createEngine(ctx);
    fillNewlyCreatedMatrix(engine);

    // cell matrix is already full
    const lastResult = engine.generateCell();
    expect(lastResult).toBeUndefined();
  });

  it('should remove cell properly', () => {
    engine = createEngine(ctx);
    const positions = fillNewlyCreatedMatrix(engine);
    expect(engine.emptyCellExists).toBeFalsy();

    engine.removeCellFromMatrix(engine.copyCell(positions[0], 2));
    expect(engine.emptyCellExists).toBeTruthy();
  });

  it('should check collisions properly', () => {
    engine = createEngine(ctx);
    const positions = fillNewlyCreatedMatrix(engine);
    const cell1 = engine.copyCell(positions[0], 2);
    const cell2 = engine.copyCell(positions[1], 2);
    const cell3 = engine.copyCell(positions[2], 4);

    expect(engine.checkCollision(cell1, cell2)).toBeTruthy();
    expect(engine.checkCollision(cell1, cell3)).toBeFalsy();
  });

  it('should return cell neighbors properly', () => {
    engine = createEngine(ctx);
    const positions = fillNewlyCreatedMatrix(engine);
    const cell = engine.copyCell(positions[0], 2);
    expect(engine.getCellNeighbors(cell)).toHaveLength(2);
  });

  it('should end game properly', () => {
    engine = createEngine(ctx);
    expect(engine.isGameOver).toBeFalsy();
    expect(engine.emptyCellExists).toBeTruthy();

    while (!engine.isGameOver) {
      engine.moveCells(randomEnum(Direction));
    }

    expect(engine.emptyCellExists).toBeFalsy();
    expect(engine.score).toBeGreaterThan(0);
  });
});

describe('[Canvas context] Engine class', () => {
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;

  const mockClearRect = jest.fn();
  const mockBeginPath = jest.fn();
  const mockMoveTo = jest.fn();
  const mockLineTo = jest.fn();
  const mockStroke = jest.fn();
  const mockFillRect = jest.fn();
  const mockFillText = jest.fn();

  beforeAll(() => {
    const createElement = document.createElement.bind(document);
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, _options?: ElementCreationOptions) => {
          if (tagName === 'canvas') {
            return {
              ...createElement(tagName),
              getContext: jest.fn(() => {
                return {
                  clearRect: mockClearRect,
                  beginPath: mockBeginPath,
                  moveTo: mockMoveTo,
                  lineTo: mockLineTo,
                  stroke: mockStroke,
                  fillRect: mockFillRect,
                  fillText: mockFillText,
                };
              }),
            };
          }
          return createElement(tagName);
        }
      );
  });

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    mockClearRect.mockReset();
    mockBeginPath.mockReset();
    mockLineTo.mockReset();
    mockMoveTo.mockReset();
    mockStroke.mockReset();
    mockFillRect.mockReset();
    mockFillText.mockReset();
  });

  it('should call proper context methods on render', () => {
    createEngine(ctx, 4);

    expect(mockClearRect).toBeCalledTimes(1);
    expect(mockClearRect.mock.calls[0]).toEqual([0, 0, 100, 100]);

    expect(mockMoveTo).toBeCalledTimes(20);
    expect(mockLineTo).toBeCalledTimes(20);
    expect(mockStroke).toBeCalledTimes(4);

    expect(ctx.fillStyle).toBe('white');
    expect(ctx.font).toBe('20px Arial');
    expect(ctx.strokeStyle).toBe('rgb(143, 122, 102)');
    expect(ctx.lineWidth).toBe(3);
  });

  it('should render proper count of cells', () => {
    createEngine(ctx);

    expect(mockFillRect).toBeCalledTimes(1);
    expect(mockFillText).toBeCalledTimes(1);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
