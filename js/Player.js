// objeto de classe utilizado para criar informações dos jogadores

class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.life = 185;
    this.score = 0;
  }
  
  // adicionando informações dos players no BD
  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    // ref = USADO COMO REFERENCIA A CHAVE DO BD ---- set = USADO PARA ENVIAR INFORMAÇÕES PARA O BD
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score
    });
  }

  //atualizando informações de posição dos carros com informações do BD
  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index);
    // ON = usado para manter a comunicação entre o projeto e o banco de dados
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  //verificando quantidade de jogadores logados na plataforma 
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  //atualizando informação de quantidade de jogadores
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  // atualizando informações dos jogadores em tempo real no BD
  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life
    });
  }

// acesso as informações de todos os jogadores
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
  
// acesso a informação de jogadores que chegaram ao final
  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

//atualizando ranking de jogadores 
  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank
    });
  }
}
