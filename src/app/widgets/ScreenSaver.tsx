import * as React from 'react';
import { Logo } from './Logo';
import { colors } from '../../data/themeOptions';

interface IProps {
    isFirstRender: boolean
}

interface IState {
    isMounted: boolean
}

export class ScreenSaver extends React.Component<IProps, IState> {

    mountTimeout;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.mountTimeout = setTimeout(() => this.setState({ isMounted: true }), 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.mountTimeout);
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { isFirstRender } = this.props;

        const styles = {
            p: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: colors.wht,
                opacity: isMounted || isFirstRender ? 1 : 0,
                filter: isMounted || isFirstRender ? "none" : "blur(10px)",
                transition: "opacity 2600ms, filter 2600ms",
                zIndex: 20
            },
            inner: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        } as any;
        return (
            <div style={styles.p}>
                <div style={styles.inner}>
                    <Logo/>
                </div>
            </div>
        );
    }
}
