import Character from '../Character';

export default class Vampire extends Character {
  constructor(level, health) {
    super();
    this.level = level;
    this.attack = 40;
    this.defence = 10;
    this.health = health;
    this.type = 'vampire';
    this.moveDistance = 2;
    this.attackDistance = 2;
  }
}