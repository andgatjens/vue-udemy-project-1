new Vue({
  el: '#app',
  data: {
    game: {
      start: false,
      text: {
        attack: 'hits',
        heal: 'heal himself'
      },
      moves: 0
    },
    player: {
      heal: '100',
      name: 'Player'
    },
    monster: {
      heal: '100',
      name: 'Monster'
    },
    logs: []
  },
  methods: {
    start: function () {
      this.player.heal = 100;
      this.monster.heal = 100;

      this.logs = [];

      this.game.start = true;
    },
    execute: function (action) {
      if(action === 'giveup') {
        this.game.start = false;
      } else {
        // Random Function
        function random (min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        // Increase Movers
        this.game.moves++;

        // Default Amount Values
        let amountPlayer = random(5, 10),
            amountMonster = random(5, 10);

        // Monster Hit
        this.player.heal -= amountMonster;

        // Special Attack - Increase Random
        if (action == 'special') {
          amountPlayer = random(10, 15);
        }

        // Player Hit
        if (action == 'attack' || action == 'special') {
          this.monster.heal -= amountPlayer;
        }

        // Monster Heal
        if (action == 'heal') {
          this.player.heal += amountPlayer;
        }

        this.logs.unshift({
          moves: this.game.moves,
          action: action,
          amountPlayer,
          amountMonster
        });

        if (this.player.heal <= 0 || this.monster.heal <= 0) {
          this.game.start = false;
        }
      }
    }
  },
  computed: {
    healPlayer: function() {
      return this.player.heal < 0 ? 0 : this.player.heal;
    },
    healMonster: function() {
      return this.monster.heal < 0 ? 0 : this.monster.heal;
    }
  }
});
