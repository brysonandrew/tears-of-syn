import * as React from 'react';
import * as Immutable from 'immutable';
import { colors } from "../../../../../../../../../data/themeOptions";
import { portfolioProjectList } from "../../../../../../../../../data/content/pages/projects/portfolio";
import { IParams } from "../../../../../../../../../data/models";

interface IProps {
    thickness: number
    headRadius: number
    bodyLength: number
    savedParams: IParams
    onClick: (nextPath: string) => void
}

interface IState {
    isHovered: boolean
}

export class NavigationArrowRight extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleClick(nextPath) {
        this.props.onClick(nextPath);
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    private handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    private findActiveIndex() {
        const { savedParams } = this.props;
        const activeProjectPath = savedParams.activeProjectPath;
        const activeIndex = Immutable.List(portfolioProjectList)
                                     .findIndex(item => item.path === activeProjectPath);

        return (activeIndex > -1) ? activeIndex : 0;
    }

    public render(): JSX.Element {
        const { thickness, headRadius, bodyLength } = this.props;
        const { isHovered } = this.state;

        const activeIndex = this.findActiveIndex();

        const isMax = (activeIndex === portfolioProjectList.length - 1);

        const background = isMax ? colors.gry : colors.hi;
        const cursor = isMax ? "default" : "pointer";

        const nextPath = isMax
                            ?   `/portfolio/${portfolioProjectList[activeIndex].path}`
                            :   `/portfolio/${portfolioProjectList[activeIndex + 1].path}` ;

        const styles = {
            navigationArrowRight: {
                position: "absolute",
                height: headRadius * 2,
                right: 0,
                top: 0,
                width: `calc(${bodyLength}px + ${isHovered ? 1 : 0}vw)`,
                cursor: cursor,
                transform: `translate3d(${isHovered ? -1 : -2}vw, 0px, 0px)`,
                transition: "width 200ms, transform 200ms"
            },
            navigationArrowRight__body: {
                position: "absolute",
                right: 0,
                top: "50%",
                height: thickness,
                borderRadius: 2,
                background: background,
                width: bodyLength,
                transform: "translateY(-50%)"
            },
            navigationArrowRight__headTop: {
                position: "absolute",
                top: 0,
                right: 0,
                height: thickness,
                borderRadius: 2,
                background: background,
                width: headRadius,
                transform: "rotate(-45deg) translateY(200%)"
            },
            navigationArrowRight__headBottom: {
                position: "absolute",
                top: 0,
                right: 0,
                height: thickness,
                borderRadius: 2,
                background: background,
                width: headRadius,
                transform: "rotate(45deg) translateY(-200%)"
            },
        } as any;
        return (
            <div style= {styles.navigationArrowRight}
                  onClick={isMax ? e => e.preventDefault() : () => this.handleClick(nextPath)}
                  onMouseEnter={isMax ? null : () => this.handleMouseEnter()}
                  onMouseLeave={isMax ? null : () => this.handleMouseLeave()}>
            <div style= {styles.navigationArrowRight__body}>
                    <div style={ styles.navigationArrowRight__headTop }/>
                    <div style={ styles.navigationArrowRight__headBottom }/>
                </div>
            </div>
        );
    }
}
