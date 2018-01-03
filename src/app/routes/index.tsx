import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { pageList } from '../../data/pages';
import { App } from '../index';
import { Home } from '../main/index';

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
