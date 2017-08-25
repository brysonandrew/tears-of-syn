import * as React from 'react';
import { Logo } from './Logo/Logo';
import { colors } from '../../data/themeOptions';

interface IProps {}

interface IState {}

export class ScreenSaver extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            screenSaver: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: colors.wht,
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
            <div style={styles.screenSaver}>
                <div style={styles.screenSaver__inner}>
                    <Logo/>
                </div>
            </div>
        );
    }
}
