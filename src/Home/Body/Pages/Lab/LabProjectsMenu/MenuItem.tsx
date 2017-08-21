import * as React from 'react';
import { IParams, ILabProject } from "../../../../../data/models";
import { SubMenu } from "./SubMenu/SubMenu";
import { colors } from '../../../../../data/themeOptions';

interface IProps {
    index: number
    savedParams: IParams
    isMenuOpen: boolean
    content: ILabProject
    onClick: (index: number) => void
    onSubProjectMenuClick: (index: number) => void
}

interface IState {
    isHovered: boolean
}

export class MenuItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.index);
    }

    handleMouseEnter() {
        this.setState({isHovered: true});
    }

    handleMouseLeave() {
        this.setState({isHovered: false});
    }

    render(): JSX.Element {
        const { content, isMenuOpen, savedParams, onSubProjectMenuClick } = this.props;
        const { isHovered } = this.state;

        const isSelected = savedParams.activeProjectPath === content.path;

        const styles = {
            menuItem: {
                display: "block",
                position: "relative",
                width: 220,
                height: 40,
                opacity: isHovered ? 0.8 : 1,
                borderRight: `1px solid ${colors.wht}`,
                cursor: "pointer"
            },
            menuItem__text: {
                position: "absolute",
                left: "50%",
                top: "50%",
                color: colors.std,
                transform: "translate(-50%, -50%)"
            },
            menuItem__subMenu: {
                position: "absolute",
                left: "100%",
                top: 0
            }

        } as any;
        return (
            <div style={styles.menuItem}
                onClick={this.handleClick}
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}>
               <div style={styles.menuItem__text}>
                   {content.name}
               </div>
                {!!content.subComponents
                    && isSelected
                    &&  <div style={styles.menuItem__subMenu}>
                            <SubMenu
                                savedParams={savedParams}
                                isMenuOpen={isMenuOpen}
                                list={content.subComponents}
                                onSubProjectMenuClick={onSubProjectMenuClick}
                            />
                        </div>}
            </div>
        );
    }
}
