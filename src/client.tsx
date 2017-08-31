import * as e6p from 'es6-promise';
(e6p as any).polyfill(); // isomorphic-fetch requires an es6 compatible polyfill
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, browserHistory } from 'react-router';
import 'isomorphic-fetch';
import routes from './app/routes';
import HomeStore from './mobx/stores/HomeStore';

declare var window: {
    __INITIAL_STATE__: any,
    location: {
        pathname: string
    }
};

const homeStore = new HomeStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={homeStore} key="provider">
      <Router history={browserHistory}>
          {routes}
      </Router>
  </Provider>,
  document.getElementById('app'),
);
