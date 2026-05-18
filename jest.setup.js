const { TextDecoder, TextEncoder } = require('util');

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

// Polyfill ReadableStream and related Web APIs for cheerio/undici
if (typeof global.ReadableStream === 'undefined') {
  const { ReadableStream } = require('web-streams-polyfill/ponyfill');
  global.ReadableStream = ReadableStream;
}

// Polyfill MessagePort for undici
if (typeof global.MessagePort === 'undefined') {
  global.MessagePort = class MessagePort {};
}

// Polyfill MessageChannel for undici
if (typeof global.MessageChannel === 'undefined') {
  global.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = new global.MessagePort();
      this.port2 = new global.MessagePort();
    }
  };
}