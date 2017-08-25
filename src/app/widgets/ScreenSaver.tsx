import * as React from 'react';
import { Logo } from './Logo/Logo';
import { colors } from '../../data/themeOptions';

interface IProps {}

interface IState {
    isActive: boolean
    isMounted: boolean
}

export class ScreenSaver extends React.Component<IProps, IState> {

    activeTimeout;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isActive: true,
            isMounted: true
        };
        this.resetIdle = this.resetIdle.bind(this);
    }

    componentDidMount() {
        window.addEventListener("mousemove"
            , this.resetIdle);
        window.addEventListener("click"
            , this.resetIdle);
        window.addEventListener("scroll"
            , this.resetIdle);

        this.activeTimeout = setTimeout(() => this.setState({ isActive: true }), 0);

        this.resetIdle();
    }

    componentWillUnmount() {

        if (!!this.activeTimeout) {
            clearTimeout(this.activeTimeout);
            this.activeTimeout = false;
        }

        window.removeEventListener("mousemove"
            , this.resetIdle);
        window.removeEventListener("click"
            , this.resetIdle);
        window.removeEventListener("scroll"
            , this.resetIdle);
    }

    resetIdle() {
        this.setState({
            isActive: false,
            isMounted: false
        });
        clearTimeout(this.activeTimeout);
        this.activeTimeout = setTimeout(() =>
            this.setState({
                isMounted: true,
                isActive: true
            }), 30000); // 5 minutes
    }

    render(): JSX.Element {
        const { isActive, isMounted } = this.state;
        const styles = {
            screenSaver: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: colors.wht,
                opacity: isActive ? 1 : 0,
                filter: isActive ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms",
                zIndex: 20
            },
            screenSaver__inner: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(10)",
            }
        } as any;
        return (
            (isMounted && <div style={styles.screenSaver}>
                <div style={styles.screenSaver__inner}>
                    <Logo/>
                </div>
            </div>)
        );
    }
}
