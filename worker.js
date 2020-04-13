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
    console.log(Date.now());
    try {
      // const games = await tjpGames.getTjp();
      // for (var i = 0; i < games.length; i++) {
      //   const game = games[i];
      //   await process.parseGame(game);
      //   console.log(i);
      // }
      // await this.checkIncompleteGames();
      let games = await this.checkGames();
      while (games.length === 50) {
        const newGames = games.slice(this.index);
        newGames.forEach(game => tjpGames.tjp(game));
        this.page++;
        this.index = 0;
        games = await this.checkGames();
      }
      this.index = games.length;
      await position.update(this.page, this.index);
      setTimeout(() => this.work(), 300000); // 5 min
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
