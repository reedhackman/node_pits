const position = require("./db/queries/position");
const endpoints = require("./tjp/endpoints");
const process = require("./tjp/process");

class Worker {
  constructor(page, index) {
    this.page = page;
    this.index = index;
  }

  async work() {
    try {
      // await this.checkIncompleteGames();
      let games = await this.checkGames();
      while (games.length === 50) {
        const newGames = games.slice(index);
        await process.newGames(newGames);
        this.page++;
        this.index = 0;
        games = await this.checkGames();
        newGames = [...newGames, ...games];
      }
      this.index = games.length;
      await position.update(page, index);
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
    const worker = new Worker(page, index);
    worker.work();
  }
};
