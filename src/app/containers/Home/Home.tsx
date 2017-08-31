import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Pages } from './Body/Pages/Pages';
import { browserHistory } from 'react-router';
import { ScreenSaver } from '../../widgets/ScreenSaver';
import { toParams } from "../../../data/helpers/toParams";
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../mobx/stores/HomeStore';

interface IProps {}

interface IState {
    isMounted: boolean
}

interface IProps {
    store?: HomeStore<string>
}

@inject('store')
@observer
export class Home extends React.Component<IProps, IState> {

    activeTimeout;
    mountTimeout;
    home;
    isIdle = true;
    isFirstRender = true;

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad } = this.props.store;
        console.log("mounted");
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

        console.log(this.props.store.savedParams.get("activePagePath"));
        const styles = {
            home: {
                position: "relative",
                background: "#eeeeee",
                overflow: "hidden"
            },
            home__pages: {
                opacity: isMounted ? 1 : 0,
                filter: isMounted ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms"
            }
        } as any;

        return (
            <div style={ styles.home }
                 ref={el => el ? (this.home = el) : null}>
                <div style={ styles.home__pages }>
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
