import * as React from 'react';
import { Helmet } from 'react-helmet';
import * as serialize from 'serialize-javascript';
import Store from '../../data/Store';

interface IHtmlProps {
  manifest?: any
  markup?: string
  store?: Store
}

class Html extends React.Component<IHtmlProps, {}> {
    private resolve(files) {
        return files.map((src) => {
        if (!this.props.manifest[src]) {
            return;
        }
        return '/public/' + this.props.manifest[src];
        }).filter((file) => file !== undefined);
    }

    public render() {
        const head = Helmet.rewind();
        const { markup, store } = this.props;

        const styles = this.resolve(['vendor.css', 'app.css']);
        const renderStyles = styles.map((src, i) =>
            <link key={i} rel="stylesheet" type="text/css" href={src} />,
        );

        const scripts = this.resolve(['vendor.js', 'app.js']);
        const renderScripts = scripts.map((src, i) =>
            <script src={src} key={i} />,
        );

        // tslint:disable-next-line:max-line-length
        const initialState = (
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store, { isJSON: true })};` }}
            charSet="UTF-8" />
        );

        return (
            <html>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}

                    {renderStyles}
                    <meta name="author" content="Andrew Bryson" />
                    <meta property="og:image" content="http://codebro.io/images/logo.png"/>
                    <meta property="og:image:secure_url" content="http://codebro.io/images/logo.png"/>
                    <link href="https://fonts.googleapis.com/css?family=Palanquin+Dark|Abel" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </head>
                <body>
                    <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
                        {initialState}
                        {renderScripts}
                </body>
            </html>
        );
    }
}

export { Html }
