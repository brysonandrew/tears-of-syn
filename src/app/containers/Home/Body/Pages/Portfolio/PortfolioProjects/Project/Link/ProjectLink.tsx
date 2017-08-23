import * as React from 'react';
import { IPortfolioProject } from "../../../../../../../../../data/models";
import { UnderlineToArrow } from "../../Heading/MenuLeft/UnderlineToArrow";
import {colors} from "../../../../../../../../../data/themeOptions";

interface IProps {
    project: IPortfolioProject
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

interface IState {
    isHovered: boolean
}

export class ProjectLink extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    render(): JSX.Element {
        const { project, isTablet } = this.props;
        const { isHovered } = this.state;

        const styles = {
            projectLink: {
                position: "relative",
                display: "block",
                padding: 10,
                width: "calc(100% - 20px)",
                cursor: "pointer",
                transition: "margin 200ms, padding 200ms"
            },
            projectLink__inner: {
                display: "table-cell",
                verticalAlign: "middle",
                height: 50,
            },
            projectLink__icon: {
                display: "inline-block",
                height: 20,
                width: "auto"
            },
            projectLink__label: {
                display: "inline-block",
                height: 55,
                padding: "0px 10px",
                width: "auto",
                color: colors.std
            },
            projectLink__underline: {
                position: "absolute",
                left: 6,
                top: -6
            }
        } as any;
        return (
            <a  href={project.link}
                target={"_blank"}
                style={styles.projectLink}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseEnter={() => this.handleMouseEnter()}>
                <div style={styles.projectLink__inner}>
                    <span style={styles.projectLink__label}>
                        {"See project"}
                    </span>
                </div>
                <div style={styles.projectLink__underline}>
                    <UnderlineToArrow
                        isHovered={isHovered}
                    />
                </div>
            </a>
        );
    }
}
