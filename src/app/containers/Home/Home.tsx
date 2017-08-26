import * as React from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { IParams } from "../../../data/models";
import { IStore } from '../../../redux/IStore';
import { Pages } from './Body/Pages/Pages';
import { browserHistory } from 'react-router';
import { ScreenSaver } from '../../widgets/ScreenSaver';
import { toParams } from "../../../data/helpers/toParams";
import { changeViewportDimensions, saveParams, toggleScrollAnimation } from './HomeActionCreators';

interface IProperties {
    savedParams?: IParams
    savedLocation?: Location
    isPreviewExtended?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onLocationListen?: (nextParams: IParams) => void
    onLoad?: (nextParams: IParams) => void
    onResizeViewport?: (width: number, height: number) => void
    onArrowNavigate?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Home extends React.Component<IProps, IState> {

    activeTimeout;
    mountTimeout;
    home;
    isIdle = true;

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
        this.resetIdle = this.resetIdle.bind(this);
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad } = this.props;
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

    resetIdle() {
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
        }, 2000); // 300000ms = 5 minutes
    }

    componentWillUnmount() {
        const { onResizeViewport } = this.props;

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
        const { savedParams } = this.props;
        const { isMounted } = this.state;

        const styles = {
            home: {
                position: "relative",
                background: "#eeeeee",
                overflow: "hidden"
            }
        } as any;

        return (
            <div style={ styles.home }
                 ref={el => el ? (this.home = el) : null}>
                <Pages
                    savedParams={savedParams}
                />
                {!isMounted
                    &&  <div>
                            <ScreenSaver/>
                        </div>}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isPreviewExtended: state.homeStore.isPreviewExtended,
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch): ICallbacks {
    return {
        onLoad: (nextParams) => {
            dispatch(saveParams(nextParams));
        },
        onLocationListen: (nextParams) => {
            dispatch(saveParams(nextParams));
        },
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        },
        onArrowNavigate: (nextParams) => {
            dispatch(saveParams(nextParams));
            dispatch(toggleScrollAnimation(true));
        }
    };
}

export const HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
