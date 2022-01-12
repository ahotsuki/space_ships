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
    return this.RANKS ? [...this.RANKS] : null;
  }

  getAlltime() {
    let temp = [];
    this.ALLTIME.forEach((e) => temp.push([e.username, e.value]));
    return temp;
  }

  getRank(id) {
    return this.SCORES.get(id).value;
  }

  update() {
    this.RANKS = [];
    let temp = [];
    this.SCORES.forEach((s) => temp.push(s.value));
    temp = [...new Set(temp)];
    temp = temp.sort((a, b) => b - a);

    this.SCORES.forEach((s, k) => {
      const index = temp.indexOf(s.value);
      s.rank = index + 1;
      this.RANKS.push([s.username, s.rank, s.value]);
      if (this.ALLTIME.length === 0) {
        this.ALLTIME.push(s);
      } else {
        let temp = [...this.ALLTIME];
        this.ALLTIME.forEach((e, i) => {
          if (s.value >= e.value && temp.indexOf(s) === -1) {
            temp.splice(i, 0, s);
          }
        });
        if (temp.length < 10 && temp.indexOf(s) === -1) {
          temp.push(s);
        }
        this.ALLTIME = temp;
        this.ALLTIME.sort((a, b) => b.value - a.value);
      }
      while (this.ALLTIME.length > 10) this.ALLTIME.pop();
    });
  }
}

module.exports = Rank;
