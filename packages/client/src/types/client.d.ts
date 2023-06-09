import { StoreState } from './store';

export {};

declare const __SERVER_PORT__: number;

declare global {
  interface Window {
    __REDUX_INITIAL_STATE__?: StoreState;
  }
}
