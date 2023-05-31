import Character from '../Character';
import Bowman from '../characters/Bowman';
import Daemon from '../characters/Daemon';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';

test('При попытке создать новый объект класса Character выбрасывается ошибка', () => {
  expect(() => new Character(1)).toThrowError(new Error('Такого персонажа создать нельзя'));
});

test.each([
  [new Bowman(1)],
  [new Daemon(1)],
  [new Magician(1)],
  [new Swordsman(1)],
  [new Undead(1)],
  [new Vampire(1)],
])(
  ('Не должно быть выброса ошибки'), (char) => {
    expect(() => char).not.toThrow();
  },
);