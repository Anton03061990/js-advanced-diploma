import themes from './themes';
import GameState from './GameState';
import Team from './Team';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';

import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Magician from './characters/Magician';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();

    this.userTeam = new Team();
    this.aiTeam = new Team();
    this.userHeroes = [Bowman, Swordsman, Magician];
    this.aiHeroes = [Daemon, Undead, Vampire];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes[this.gameState.level]);

    this.userTeam.addHeroes(generateTeam(this.userHeroes, 1, 2));
    this.aiTeam.addHeroes(generateTeam(this.aiHeroes, 1, 2));

    this.positionTeam(this.userTeam, this.positionUser());
    this.positionTeam(this.aiTeam, this.positionAi());

    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    this.gamePlay.redrawPositions(this.gameState.allCell);
    
  }
  

 
  

  onCellClick(index) {
    // TODO: react to click
    if (this.getId(index) && this.isUser(index)) {
      this.gamePlay.cells.forEach((element) => element.classList.remove('selected-green'));
      this.gamePlay.cells.forEach((element) => element.classList.remove('selected-yellow'));
      this.gamePlay.selectCell(index);
      this.gameState.selected = index;
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.getId(index)) {
      const hero = this.getId(index).character;
      const message = `\u{1F538}${hero.class}\u{1F396}${hero.level}\u{2694}${hero.attack}\u{1F6E1}${hero.defence}\u{2764}${hero.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  isUser(id) {
    if (this.getId(id)) {
      const character = this.getId(id).character;
      return this.userHeroes.some((element) => character instanceof element);
    }
    return false;
  }

  getId(id) {
    return this.gameState.allCell.find((element) => element.position === id);
  }

  getRandom(positions) {
    this.positions = positions;
    return this.positions[Math.floor(Math.random() * this.positions.length)];
  }

  positionUser() {
    const size = this.gamePlay.boardSize;
    this.userPosition = [];
    for (
      let i = 0, j = 1;
      this.userPosition.length < size * 2;
      i += size, j += size
    ) {
      this.userPosition.push(i, j);
    }
    return this.userPosition;
  }

  positionAi() {
    const size = this.gamePlay.boardSize;
    const aiPosition = [];
    for (
      let i = size - 2, j = size - 1;
      aiPosition.length < size * 2;
      i += size, j += size
    ) {
      aiPosition.push(i, j);
    }
    return aiPosition;
  }

  positionTeam(team, positions) {
    const copyPositions = [...positions];
    for (const item of team) {
      const random = this.getRandom(copyPositions);
      this.gameState.allCell.push(new PositionedCharacter(item, random));
      copyPositions.splice(copyPositions.indexOf(random), 1);
    }
  }
}
