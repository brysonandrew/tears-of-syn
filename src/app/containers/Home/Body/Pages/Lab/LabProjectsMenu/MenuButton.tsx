import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { colors } from "../../../../../../../data/themeOptions";

interface IProps {
    isACross: boolean
    onClick?: () => void
}

interface IState {
    isHovered: boolean
}

export class MenuButton extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    render(): JSX.Element {
        const { isHovered } = this.state;
        const { isACross, onClick } = this.props;

        const styles = {
            menuButton: {
                position: "relative",
                width: 40,
                height: 40,
                cursor: "pointer"
            },
            menuButton__line: {
                position: "absolute",
                width: "100%",
                height: 6,
                borderRadius: 2,
                background: isACross ? colors.wht : colors.std
            },
            menuButton__lines: [
                {
                    top: isACross ? 20 : 6,
                    left: isACross
                                ?   12
                                :   25,
                    width: 75,
                    scale: 1,
                    rotate: isACross ? 45 : 0
                },
                {
                    top: 17,
                    left: -5,
                    width: 75,
                    scale: isACross ? 0 : 1,
                    rotate: 0
                },
                {
                    top: isACross ? 20 : 27,
                    left: isACross
                        ?   12
                        :   25,
                    width: 75,
                    scale: 1,
                    rotate: isACross ? -45 : 0,
                }
            ]
        } as any;
        return (
            <div style={ styles.menuButton }
                 onClick={onClick}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {styles.menuButton__lines.map((style, i) =>
                    <div key={i}
                         style={ Object.assign({}, styles.menuButton__line, {
                            top: style.top,
                            left: `${style.left}%`,
                            width: `${style.width}%`,
                            transform: `scaleX(${style.scale}) rotate(${style.rotate}deg)`
                    }) }/> )}
            </div>
        );
    }
}
