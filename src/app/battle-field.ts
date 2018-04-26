import { Player } from './player';

export class BattleField {
  player: Player;
  tiles: Object[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
