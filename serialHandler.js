class SerialHandler {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  async init() {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      this.reader = port.readable.getReader();

      console.log(await port.getSignals());
    } catch (err) {
      console.error("There was an error opening the serial port:", err);
    }
  }

  async read() {
    const readerData = await this.reader.read();
    console.log(readerData);
    return this.decoder.decode(readerData.value);
  }
}

export default new SerialHandler();
