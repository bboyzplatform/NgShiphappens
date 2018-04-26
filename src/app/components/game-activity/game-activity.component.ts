import { Component, ViewContainerRef, OnInit } from '@angular/core';
// import needed classes and services
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Pusher } from '../../../../node_modules/pusher-js';

import { BattlefieldService } from '../../battlefield.service';
import { BattleField } from '../../battle-field';

declare const Pusher: any;
// set game constants
const NUM_PLAYERS = 2;
const BOARD_SIZE = 6;

@Component({
  selector: 'app-game-activity',
  templateUrl: './game-activity.component.html',
  styleUrls: ['./game-activity.component.css']
})
export class GameActivityComponent implements OnInit {
  canPlay = true;
  player = 0;
  players = 0;
  gameId: string;
  gameUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

  constructor(
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private boardService: BattlefieldService,
  ) {
    /* this.toastr.setRootViewContainerRef(_vcr);
    this.createBoards();

    this.initPusher();
    this.listenForChanges(); */

  }// initialise Pusher and bind to presence channel
  initPusher() {
    // findOrCreate unique channel ID
    let id = this.getQueryParam('id');
    if (!id) {
      id = this.getUniqueId();
      location.search = location.search ? '&id=' + id : 'id=' + id;
    }
    this.gameId = id;

    // init pusher
    const pusher = new Pusher('PUSHER_APP_KEY', {
      authEndpoint: '/pusher/auth',
      cluster: 'eu'
    });

    // bind to relevant Pusher presence channel
    this.pusherChannel = pusher.subscribe(this.gameId);
    this.pusherChannel.bind('pusher:member_added', member => { this.players++ })
    this.pusherChannel.bind('pusher:subscription_succeeded', members => {
      this.players = members.count;
      this.setPlayer(this.players);
      this.toastr.success("Success", 'Connected!');
    })
    this.pusherChannel.bind('pusher:member_removed', member => { this.players-- });

    return this;
  }

  // Listen for `client-fire` events.
  // Update the board object and other properties when 
  // event triggered
  listenForChanges(): AppComponent {
    this.pusherChannel.bind('client-fire', (obj) => {
      this.canPlay = !this.canPlay;
      this.boards[obj.boardId] = obj.board;
      this.boards[obj.player].player.score = obj.score;
    });
    return this;
  }

  // initialise player and set turn
  setPlayer(players: number = 0): AppComponent {
    this.player = players - 1;
    if (players == 1) {
      this.canPlay = true;
    } else if (players == 2) {
      this.canPlay = false;
    }
    return this;
  }
  fireTorpedo(e: any) {
    const id = e.target.id,
      boardId = id.substring(1, 2),
      row = id.substring(2, 3), col = id.substring(3, 4),
      tile = this.boards[boardId].tiles[row][col];
    if (!this.checkValidHit(boardId, tile)) {
      return;
    }

    if (tile.value == 1) {
      this.toastr.success('You got this.', 'HURRAAA! YOU SANK A SHIP!');
      this.boards[boardId].tiles[row][col].status = 'win';
      this.boards[this.player].player.score++;
    } else {
      this.toastr.info('Keep trying.', 'OOPS! YOU MISSED THIS TIME');
      this.boards[boardId].tiles[row][col].status = 'fail';
    }
    this.canPlay = false;
    this.boards[boardId].tiles[row][col].used = true;
    this.boards[boardId].tiles[row][col].value = 'X';
    return this;
  }

  checkValidHit(boardId: number, tile: any): boolean {
    if (boardId === this.player) {
      this.toastr.error('Don\'t commit suicide.', 'You can\'t hit your own board.');
      return false;
    }
    if (this.winner) {
      this.toastr.error('Game is over');
      return false;
    }
    if (!this.canPlay) {
      this.toastr.error('A bit too eager.', 'It\'s not your turn to play.');
      return false;
    }
    if (tile.value === 'X') {
      this.toastr.error('Don\'t waste your torpedos.', 'You already shot here.');
      return false;
    }
    return true;
  }

  createBoards() {
    for (let i = 0; i < NUM_PLAYERS; i++) {
      this.boardService.createBoard(BOARD_SIZE);
    }
    return this;
  }
  // winner property to determine if a user has won the game.
  // once a user gets a score higher than the size of the game
  // board, he has won.
  get winner(): BattleField {
    return this.boards.find(board => board.player.score >= BOARD_SIZE);
  }

  // get all boards and assign to boards property
  get boards(): BattleField[] {
    return this.boardService.getBoards();
  }


  ngOnInit() {
    this.toastr.setRootViewContainerRef(_vcr);
    this.createBoards();

    this.initPusher();
    this.listenForChanges();
  }

}

