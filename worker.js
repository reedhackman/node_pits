const position = require("./db/queries/position");
const endpoints = require("./tjp/endpoints");
const process = require("./tjp/process");
const tjpGames = require("./db/queries/games");

class Worker {
  constructor(page, index) {
    this.page = page;
    this.index = index;
  }

  async work() {
    try {
      let length = await this.task();
      if (length === 50) {
        setTimeout(() => {
          this.work();
        }, 1000); // 1 second
      } else {
        setTimeout(() => {
          this.work();
        }, 1000 * 60 * 5); // 5 minutes
      }
    } catch (err) {
      throw err;
    }
  }

  async task() {
    console.log("Checking games - " + new Date(Date.now()).toLocaleString());
    try {
      let games = await this.checkGames();
      const newGames = games.slice(this.index);
      await process.processGames(newGames);
      if (games.length === 50) {
        this.page++;
        this.index = 0;
      } else {
        this.index = games.length;
      }
      await position.update(this.page, this.index);
      return games.length;
    } catch (err) {
      throw err;
    }
  }

  async checkGames() {
    try {
      const games = await endpoints.getGames(this.page);
      return games;
    } catch (err) {
      throw err;
    }
  }

  async checkIncompleteGames() {
    //
  }
}

module.exports = {
  start: async () => {
    const [page, index] = await position.get();
    console.log(`starting app. page: ${page}; index: ${index}`);
    const worker = new Worker(page, index);
    worker.work();
  }
};
