class TicTacToe {
  constructor(selector) {
    this.parrentElement = document.querySelector(selector);
    this.playerList = ["x", "o"];
    this.GameBoards = Array(9).fill("");
    this.currentPlayer = 0;

    this.init();
  }

  init() {
    this.buildGameUI();
  }

  getPlayerLabel() {
    return this.playerList[this.currentPlayer];
  }

  buildCardPlayer(playerName, playerNumber) {
    return ` <div class="box-player">
    <p class="player-label ${playerName}">${playerName}</p>
    <p class="player-name">Player ${playerNumber}</p>
    <p class="turn">Giliran Mu!</p>
  </div>`;
  }
  buildGameUI() {
    // gameInfo
    const gameInfoEl = document.createElement("div");
    gameInfoEl.className = "game-info";

    let playerCards = "";
    this.playerList.forEach((player, i) => {
      playerCards += this.buildCardPlayer(player, i + 1);
    });

    gameInfoEl.innerHTML = playerCards;

    // button reset
    const gameControl = document.createElement("div");
    gameControl.className;

    const btnReset = document.createElement("button");
    btnReset.className = "btn btn-reset";
    btnReset.innerText = "Reset Game";
    btnReset.addEventListener("click", () => this.gameReset());

    gameControl.appendChild(btnReset);
    gameInfoEl.appendChild(gameControl);

    // gamePlay
    const gamePlayEl = document.createElement("div");
    gamePlayEl.className = "game-play";

    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.className = "btn-tic-tac-tow";
      btn.addEventListener("click", (e) => this.onCellClick(e, i));
      gamePlayEl.appendChild(btn);
    }

    // append to parrent element
    this.parrentElement.append(gameInfoEl, gamePlayEl);

    this.gamePlayEl = gamePlayEl;
  }

  onCellClick(event, index) {
    console.log("on btn cell click");
    const btn = event.target;
    btn.innerText = this.getPlayerLabel();
    btn.classList.add(btn.innerText);
    btn.disabled = true;
    this.GameBoards[index] = btn.innerText;

    this.checkWinner();
    this.switchPlayer();
  }

  switchPlayer(currentPlayer = undefined) {
    if (currentPlayer != undefined) {
      this.currentPlayer = currentPlayer;
    } else {
      this.currentPlayer = this.currentPlayer == 1 ? 0 : 1;
    }

    const BoxPlayers = document.querySelectorAll(".box-player");

    BoxPlayers.forEach((box, i) => {
      if (this.currentPlayer == i) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  }

  gameReset() {
    this.GameBoards = Array(9).fill("");
    this.switchPlayer(0);

    for (const btn of this.gamePlayEl.children) {
      btn.innerHTML = "";
      btn.classList.remove(...this.playerList);
      btn.disabled = false;
    }
  }

  checkWinner() {
    const winConditions = [
      [0, 1, 2], //horisontal
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6], //vertikal
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8], //diagonal left to bottom right
      [2, 4, 6], //diagonal right to bottom left
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      console.log(a, b, c);
      if (
        this.getPlayerLabel() == this.GameBoards[a] &&
        this.getPlayerLabel() == this.GameBoards[b] &&
        this.getPlayerLabel() == this.GameBoards[c]
      ) {
        Swal.fire({
          title: "Good Jobs",
          text: `Selamat Player ${
            this.currentPlayer + 1
          } Kamu memenangkan game ini`,
          showDenyButton: true,
          confirmButtonText: "Mantap !",
          denyButtonText: `Ulangi`,
          icon: "success",
        }).then((result) => {
          //disabled other button
          for (const btn of this.gamePlayEl.children) {
            btn.disabled = true;
          }

          if (result.isDenied) {
            this.gameReset();
            Swal.fire("Permainan sudah di reset, Ayo main lagi", "", "info");
          }
        });
      }
    }
  }
}
