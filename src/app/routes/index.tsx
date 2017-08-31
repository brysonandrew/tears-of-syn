import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { pageList } from '../../data/content/pages/pages';
import { App } from '../containers/App/index';
import { Home } from '../containers/Home/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>

    {/*pages*/}
    {pageList.map((page, i) =>
      <Route
        key={`pages-${i}`}
        path={page.path}
        component={Home} />)}

  </Route>
);
