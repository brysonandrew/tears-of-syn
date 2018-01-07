import * as React from 'react';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import createHistory from 'history/createBrowserHistory';
import { Pages } from './Pages';
import { ScreenSaver } from '../widgets/ScreenSaver';
import { toParams } from "../../data/helpers/toParams";
import Store from '../../data/Store';
import {Background} from './background';
import {renderDefinedTrue} from '../utils/react';

interface IState {
    isMounted: boolean
}

interface IProps {
    store?: Store
}

@inject('store')
@observer
export class Home extends React.Component<IProps, IState> {

    activeTimeout;
    mountTimeout;
    home;
    isIdle = true;
    isFirstRender = true;

    @computed public get styles(): any {
        return {
            p: {
                position: "relative",
                overflow: "hidden"
            },
            heading: {
                position: "fixed",
                top: 2,
                left: 8,
                zIndex: 2
            },
            logo: {
                height: 80,
                width: "auto",
                margin: "4px 0"
            },
            pages: {
                position: "relative",
                opacity: this.state.isMounted ? 1 : 0,
                filter: this.state.isMounted ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms",
                zIndex: 2
            }
        };
    }

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad } = this.props.store;
        this.isFirstRender = false;
        // reset window pos
        window.scroll(0, 0);

        const history = createHistory();
// initial save params
        onLoad(toParams(history.location.pathname));
// listen to future params
        browserHistory.listen( location =>  {

            onLocationListen(
                toParams(location.pathname)
            );

        });

        this.mountTimeout = setTimeout(() => this.setState({ isMounted: true }), 0);

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        this.home.addEventListener("mousemove"
            , this.resetIdle);
        this.home.addEventListener("click"
            , this.resetIdle);
        this.home.addEventListener("scroll"
            , this.resetIdle);
        this.home.addEventListener("wheel"
            , this.resetIdle);
    }

    resetIdle = () => {
        if (this.isIdle) {
            this.setState({
                isMounted: true
            });
        }
        this.isIdle = false;
        clearTimeout(this.activeTimeout);
        this.activeTimeout = setTimeout(() => {
            this.isIdle = true;
            this.setState({
                isMounted: false
            });
        }, 300000); // 300000ms = 5 minutes
    };

    componentWillUnmount() {
        const { onResizeViewport } = this.props.store;

        if (!!this.activeTimeout) {
            clearTimeout(this.activeTimeout);
            this.activeTimeout = false;
        }

        window.removeEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.removeEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        this.home.removeEventListener("mousemove"
            , this.resetIdle);
        this.home.removeEventListener("click"
            , this.resetIdle);
        this.home.removeEventListener("scroll"
            , this.resetIdle);
        this.home.removeEventListener("wheel"
            , this.resetIdle);

    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { width, height, adjustedWidth, docScroll } = this.props.store;

        return (
            <div
                style={ this.styles.p }
                ref={el => el ? (this.home = el) : null}
            >
                <div style={ this.styles.heading }>
                    <h1>Atelier of Kos</h1>
                    <img style={ this.styles.logo } src="/images/logo-white.svg"/>
                </div>
                {renderDefinedTrue(this.home, () =>
                    <Background
                        width={width}
                        height={height}
                        textBoundary={adjustedWidth}
                        parentEl={this.home}
                        docScroll={docScroll}
                    />)}
                <div style={ this.styles.pages }>
                    <Pages/>
                </div>
                {!isMounted
                    &&  <div>
                            <ScreenSaver
                                isFirstRender={this.isFirstRender}
                            />
                        </div>}
            </div>
        );
    }
}
