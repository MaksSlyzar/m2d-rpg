const fs = require("fs");

class SIO {
  constructor (dirname, io, log) {
    this.dirname = dirname;
    this.log = log?log:true;
    this.events = {};
    this.io = io;

    this.loadEvents();
    this.listenEvents();
  };

  loadEvents () {
    const files = fs.readdirSync(this.dirname);
    const events = {};

    if (this.log)
      console.log("\x1b[42m%s\x1b[0m", "Founded events");

    for (let filename of files) {
      const event = require(`${this.dirname}/${filename}`);

      events[event.name] = event;
      
      if (this.log) {
        console.log(event.name);
      }
    }
    console.log();

    this.events = events;
  }

  listenEvents () {
    this.io.on("connection", socket => {
      if (this.events["connection"])
        this.events["connection"].execute(socket, null, this.io);

      for (let eventName in this.events) {
        const event = this.events[eventName];
        socket.on(event.name, (data) => event.execute(socket, data, this.io));
      }
    });
  }
}

module.exports = SIO;