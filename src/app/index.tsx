const appConfig = require('../../config/main.js');

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { MobxAsyncConnect, asyncConnect, store as mobxAsyncConnect } from 'mobx-async-connect';

const style = require('./style.css');

class App extends React.Component<any, any> {

    // renderDevTool() {
    //     if (process.env.NODE_ENV !== 'production') {
    //         const DevTools = require('mobx-react-devtools').default;
    //         return (<DevTools />);
    //     }
    // };

    public render() {
        return (
            <section className={style.AppContainer}>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {this.props.children}
                {/*{this.renderDevTool()}*/}
            </section>
        );
    }
}

export { App }

export { Html } from 'html';
export { Home } from './main';
