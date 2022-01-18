const healthBtn = document.getElementById("health");
const weaponBtn = document.getElementById("weapon");
const movmntBtn = document.getElementById("movement");
const hcost = document.getElementById("health-cost");
const wcost = document.getElementById("weapon-cost");
const mcost = document.getElementById("movement-cost");

class Shop {
  static game;
  static socket;
  static GOD = false;

  static shop() {
    document.addEventListener("keypress", (e) => {
      if ([49, 97].includes(e.keyCode)) this.upgradeHealth();
      if ([50, 98].includes(e.keyCode)) this.upgradeWeapon();
      if ([51, 99].includes(e.keyCode)) this.upgradeMovement();
      if ([52, 100].includes(e.keyCode)) this.heal();
    });

    healthBtn.onclick = () => this.upgradeHealth();
    weaponBtn.onclick = () => this.upgradeWeapon();
    movmntBtn.onclick = () => this.upgradeMovement();
  }

  static heal() {
    if (
      (this.game.my_ship.score > 0 || this.GOD) &&
      this.game.my_ship.hp < this.game.my_ship.maxhp
    )
      fetch("/heal", {
        method: "POST",
        body: JSON.stringify({
          id: this.socket.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {});
  }

  static upgradeHealth() {
    if (
      (this.game.my_ship.healthLvl < 6 &&
        this.game.my_ship.score.value >= 2 ** this.game.my_ship.healthLvl) ||
      this.GOD
    )
      fetch("/health", {
        method: "POST",
        body: JSON.stringify({
          id: this.socket.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          hcost.innerText = json.value < 6 ? `(${json.cost}p)` : "(max)";
        });
  }

  static upgradeWeapon() {
    if (
      (this.game.my_ship.weaponLvl < 6 &&
        this.game.my_ship.score.value >= 2 ** this.game.my_ship.weaponLvl) ||
      this.GOD
    )
      fetch("/weapon", {
        method: "POST",
        body: JSON.stringify({
          id: this.socket.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          wcost.innerText = json.value < 6 ? `(${json.cost}p)` : "(max)";
        });
  }

  static upgradeMovement() {
    if (
      (this.game.my_ship.movementLvl < 6 &&
        this.game.my_ship.score.value >= 2 ** this.game.my_ship.movementLvl) ||
      this.GOD
    )
      fetch("/movement", {
        method: "POST",
        body: JSON.stringify({
          id: this.socket.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          mcost.innerText = json.value < 6 ? `(${json.cost}p)` : "(max)";
        });
  }
}

module.exports = Shop;
