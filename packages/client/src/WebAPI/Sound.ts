class Sound {
  public readonly name: string;
  private readonly _buffer: AudioBuffer;
  private _ctx: AudioContext;

  constructor(ctx: AudioContext, name: string, buffer: AudioBuffer) {
    this._ctx = ctx;
    this.name = name;
    this._buffer = buffer;
  }

  public play() {
    const source: AudioBufferSourceNode = this._ctx.createBufferSource();
    source.buffer = this._buffer;
    source.connect(this._ctx.destination);
    source.start();
  }
}

export default Sound;
