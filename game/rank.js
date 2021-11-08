class Rank {
  constructor() {
    this.SCORES = new Map();
    this.ALLTIME = [];
  }

  setScore(id, score) {
    this.SCORES.set(id, score);
  }

  deleteScore(id) {
    this.SCORES.delete(id);
  }

  getRankings() {
    return [...this.RANKS];
  }

  getAlltime() {
    let temp = [];
    this.ALLTIME.forEach((e) => temp.push([e.username, e.get()]));
    return temp;
  }

  getRank(id) {
    return this.SCORES.get(id).get();
  }

  update() {
    this.RANKS = [];
    let temp = [];
    this.SCORES.forEach((s) => {
      temp.push(s.get());
    });
    temp = [...new Set(temp)];
    temp = temp.sort((a, b) => b - a);

    this.SCORES.forEach((s, k) => {
      const index = temp.indexOf(s.get());
      s.rank = index + 1;
      this.RANKS.push([s.username, s.rank, s.get()]);
      if (this.ALLTIME.length === 0) {
        this.ALLTIME.push(s);
      } else {
        let temp = [...this.ALLTIME];
        this.ALLTIME.forEach((e, i) => {
          if (s.get() >= e.get() && temp.indexOf(s) === -1) {
            temp.splice(i, 0, s);
          }
        });
        if (temp.length < 10 && temp.indexOf(s) === -1) {
          temp.push(s);
        }
        this.ALLTIME = temp;
        this.ALLTIME.sort((a, b) => b.get() - a.get());
      }
      while (this.ALLTIME.length > 10) this.ALLTIME.pop();
    });
  }
}

module.exports = Rank;
