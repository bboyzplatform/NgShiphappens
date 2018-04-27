import { Action } from '@ngrx/store';

export interface State {
  state: string;
}


const initialState: State = {
  state: 'default'
};

export function simpleReducer(
  state: string = 'Hello World', action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case 'SPANISH':
      return state = 'Hola Mundo';

    case 'FRENCH':
      return state = 'Bonjour le monde';

    default: {
      return state;
    }
  }
}
