import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { colors } from '../../../../../../../../data/themeOptions';

interface IProps {}

interface IState {
    isOpen: boolean
}

export class BasicBaby extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {isOpen: false};

    }

    handleMouseDown = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    handleTouchStart = (e) => {
        e.preventDefault();
        this.handleMouseDown();
    };

    render(): JSX.Element {
        const styles = {
            basicBaby: {
                position: "relative",
                height: "100vh"
            },
            basicBaby__button: {
                position: "relative",
                zIndex: 10,
                cursor: "pointer"
            },
            basicBaby__outer: {
                position: "absolute",
                width: "100vw",
                top: "50%",
                left: "50%",
                borderRadius: 4,
                backgroundColor: colors.wht,
                margin: "5px 3px 10px",
                height: 50,
                transform: "translate(-50%, -50%)"
            },
            basicBaby__inner: {
                position: "absolute",
                width: 50,
                height: 50,
                borderRadius: 4,
                backgroundColor: colors.std
            }
        } as any;
        return (
            <div style={styles.basicBaby}>
                <button
                    style={styles.basicBaby__button}
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={this.handleTouchStart}>
                    Toggle
                </button>
                <Motion style={{x: spring(this.state.isOpen ? 100 : 0)}}>
                    {({x}) =>
                        // children is a callback which should accept the current value of
                        // `style`
                        <div style={styles.basicBaby__outer}>
                            <div style={{
                                ...styles.basicBaby__inner,
                                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                transform: `translate3d(${x}vw, 0, 0) translateX(-${x}%)`}} />
                        </div>
                    }
                </Motion>
            </div>
        );
    }
}
