class Emitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const listenersForEvent = this.listeners.get(event);
    listenersForEvent.push(listener);
    this.listeners.set(event, listenersForEvent);
  }

  emit(event, ...params) {
    this.listeners.get(event)
      .forEach((listener) => {
        listener.handle(...params);
      });
  }
}

//module.exports = Emitter;
export default Emitter;
