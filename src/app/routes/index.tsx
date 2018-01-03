import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { PAGE_LIST } from '../../data/pages';
import { App } from '../index';
import { Home } from '../main/index';
import { PLAYGROUND } from '../../data/playground';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>

        {/*pages*/}
        {PAGE_LIST.map((page, i) =>
            <Route
                key={`pages-${i}`}
                path={page.path}
                component={Home}
            />
        )}
        {/*playground*/}
        {PLAYGROUND.map((page, i) =>
            <Route
                key={`playground-${i}`}
                path={`/playground/${page.path}`}
                component={page.component as any}
            />
        )}
    </Route>
);
