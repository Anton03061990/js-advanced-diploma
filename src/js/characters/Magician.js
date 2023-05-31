import Character from '../Character';

export default class Magician extends Character {
  constructor(level, type) {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
    this.distance = 1;
    this.attackRange = 4;
    this.type = 'magician';
    this.class = 'Волшебник';
  }
}