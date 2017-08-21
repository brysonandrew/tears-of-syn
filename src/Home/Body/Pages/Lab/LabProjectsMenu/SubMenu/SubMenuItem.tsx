import * as React from 'react';
import { IParams, ILabProject } from "../../../../../../data/models";
import { colors } from '../../../../../../data/themeOptions';

interface IProps {
    index: number
    savedParams: IParams
    content: ILabProject
    onClick: (index: number) => void
}

interface IState {
    isHovered: boolean
}

export class SubMenuItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter() {
        this.setState({isHovered: true});
    }

    handleMouseLeave() {
        this.setState({isHovered: false});
    }

    handleClick(e) {
        this.props.onClick(this.props.index);
        e.stopPropagation();
    }

    render(): JSX.Element {
        const { content, savedParams } = this.props;
        const { isHovered } = this.state;

        const isSelected = savedParams.activeViewPath === content.path;

        const styles = {
            subMenuItem: {
                display: "block",
                position: "relative",
                width: 220,
                height: 40,
                opacity: (isHovered || isSelected) ? 0.8 : 1,
                borderRight: "1px solid #fff",
                cursor: "pointer"
            },
            subMenuItem__text: {
                position: "absolute",
                left: "50%",
                top: "50%",
                color: colors.std,
                transform: "translate(-50%, -50%)"
            }
        } as any;

        return (
        <div style={styles.subMenuItem}
             onClick={this.handleClick}
             onMouseEnter={() => this.handleMouseEnter()}
             onMouseLeave={() => this.handleMouseLeave()}>
            <div style={styles.subMenuItem__text}>
                {content.name}
            </div>
        </div>
        );
    }
}
