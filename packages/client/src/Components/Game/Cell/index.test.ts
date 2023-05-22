import Cell from '.';

describe('[SNAPSHOTS] Cell class', () => {
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, cell: Cell;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  });

  it('should have proper public attributes', () => {
    cell = new Cell({ x: 0, y: 0 }, 20, 2);
    expect(cell.value).toBe(2);
    expect(cell.position).toStrictEqual({ x: 0, y: 0 });
  });

  it('should draw a cell with specified parameters', () => {
    cell = new Cell({ x: 0, y: 0 }, 20, 2);
    cell.render(ctx);

    // @ts-ignore - __getEvents comes from jest-canvas-mock package
    const events = ctx.__getEvents();
    expect(events).toMatchSnapshot();
  });

  it('should draw a cell with another specified value', () => {
    cell = new Cell({ x: 0, y: 0 }, 20, 4);
    cell.render(ctx);

    // @ts-ignore - __getEvents comes from jest-canvas-mock package
    const events = ctx.__getEvents();
    expect(events).toMatchSnapshot();
  });
});

describe('[MOCKS] Cell class', () => {
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
    mockFillRect.mockReset();
    mockFillText.mockReset();
  });

  it('should draw cell with specified parameters', async () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const cell = new Cell({ x: 0, y: 0 }, 20, 4);
    cell.render(ctx);

    expect(mockFillRect.mock.calls[0]).toEqual([0, 0, 20, 20]);
    expect(mockFillText.mock.calls[0]).toEqual(['4', 10, 10]);
    expect(ctx.font).toBe('20px Arial');
    expect(ctx.textBaseline).toBe('middle');
    expect(ctx.fillStyle).toBe('black');
    expect(ctx.textAlign).toBe('center');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
