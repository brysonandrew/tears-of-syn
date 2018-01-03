const appConfig = require('../config/main.js');

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'mobx-react';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { MobxAsyncConnect, loadOnServer, store as mobxAsyncConnect } from 'mobx-async-connect';
import routes from './app/routes';

import { Html } from './app';
import {default as Store} from './data/Store';
const manifest = require('../build/manifest.json');

const express = require('express');
const path = require('path');
const compression = require('compression');
const Chalk = require('chalk');
const favicon = require('serve-favicon');

const app = express();

app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/images', express.static('./assets/images'));

app.get('*', (req, res) => {
    const location = req.url;
    const history = createMemoryHistory(req.originalUrl);
    const appStore = new Store();

    match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
    if (error) {
        res.status(500).send(error.message);
    } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
        const markup = ReactDOMServer.renderToString(
            <Provider store={appStore} key="provider">
                <RouterContext {...renderProps} />
            </Provider>,
        );
        res.status(200).send(renderHTML(markup, appStore));
        } else {
            res.status(404).send('Not Found?');
        }
    });
});

app.listen(appConfig.port, (err) => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.white.bgGreen(
      `\n\nListening at http://${appConfig.host}:${appConfig.port}\n`,
    ));
  }
});

function renderHTML(markup: string, store: any) {
    const html = ReactDOMServer.renderToString(
    <Html markup={markup} manifest={manifest} store={store} />,
    );

    return `<!doctype html> ${html}`;
}
