import * as React from 'react';
import { colors } from "../../../../../../../../data/themeOptions";
import { IPortfolioProject, IParams } from "../../../../../../../../data/models";
import { Link } from "react-router";

interface IProps {
    isMenuOpen: boolean // false is displays only content
    selectorIndex: number
    isTablet: boolean
    isWheel: boolean
    content: IPortfolioProject
    savedParams: IParams
    onClick: (nextPath: string) => void
}

interface IState {
    isHovered?: boolean
}

export class MenuSelector extends React.Component<IProps, IState> {

    private boxNumber = 5;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
        this.handleSelectorMouseEnter = this.handleSelectorMouseEnter.bind(this);
        this.handleSelectorMouseLeave = this.handleSelectorMouseLeave.bind(this);
    }

    private handleSelectorClick(nextPath) {
        this.props.onClick(nextPath);
    }

    private handleSelectorMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    private handleSelectorMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    public render(): JSX.Element {
        const { isWheel, content, savedParams } = this.props;
        const isActive = savedParams.activeProjectPath === content.path;
        const nextPath = `/portfolio/${content.path}`;

        const styles = {
            menuSelector: {
                display: "block",
                position: "relative",
                width: 200,
                padding: "14px 0 6px",
                background: "transparent",
                height: 28,
                cursor: isWheel ? "default" : "pointer"
            },
            menuSelector__background: {
                position: "absolute",
                bottom: 0,
                background: colors.hi,
                height: 2,
                width: `${100 * 0.5 / this.boxNumber}%`,
                transform: `scale(${isActive ? 1 : 0})`,
                transition: "all 500ms"
            },
            menuSelector__text: {
                position: "absolute",
                width: "100%",
                opacity:  isWheel ? 0.66 : 1,
                height: 28,
                fontSize: 14,
                textAlign: "right",
                transition: "opacity 200ms",
                color: colors.blk,
                zIndex: 2
            }
        } as any;

        return (
            <Link style={ styles.menuSelector }
                  to={nextPath}
                  onClick={isWheel ? e => e.preventDefault() : () => this.handleSelectorClick(nextPath)}
                  onMouseEnter={this.handleSelectorMouseEnter}
                  onMouseLeave={this.handleSelectorMouseLeave}>
                {new Array(this.boxNumber).fill("-").map((_, i) =>
                    <div key={i} style={Object.assign({},
                            styles.menuSelector__background,
                            {
                                right: `${i * this.boxNumber * 0.5}%`,
                                transitionDelay: `${i * this.boxNumber}ms`
                            }
                    ) }/>)}
                <div style={ styles.menuSelector__text }>
                    {content.name.toUpperCase()}
                </div>
            </Link>
        );
    }
}
