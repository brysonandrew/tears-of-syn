// import { useStrict } from 'mobx';
// import { STORE_HOME, STORE_ROUTER } from './constants/stores';
// import { HomeStore, RouterStore } from './stores';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { HomeModel } from '../data/models/HomeModel';
// import {IStore} from './stores/IStore';
//
// /*
//  Enables MobX strict mode globally.
//  In strict mode, it is not allowed to
//  change any state outside of an action
//  */
// useStrict(true);
// // default fixtures for TodoStore
// const defaultHome = [
//   new HomeModel('Use Mobx'),
//   new HomeModel('Use React', true),
// ];
// // prepare MobX stores
// const history = createBrowserHistory();
// export const homeStore = new HomeStore(defaultHome);
// export const routerStore = new RouterStore(history);
//
// export const stores: IStore = {
//     homeStore: homeStore,
//     routerStore: routerStore
// };
//
// export const rootStores: IStore = {
//   [STORE_HOME]: homeStore,
//   [STORE_ROUTER]: routerStore
// };
// Store interface
// export interface IAppStore {
//     page: PageStore
// }
//
// // Initialize the store
// const store: IAppStore = {
//     page: new PageStore()
// };
