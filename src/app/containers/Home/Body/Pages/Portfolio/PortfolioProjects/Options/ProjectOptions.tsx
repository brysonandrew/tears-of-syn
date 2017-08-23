import * as React from 'react';
import { browserHistory } from 'react-router';
import { portfolioProjects } from '../../../../../../../../data/content/pages/projects/portfolio';
import { MenuButton } from '../../../../../../../widgets/MenuButton';
import { colors } from '../../../../../../../../data/themeOptions';
import { ProjectLink } from '../Project/Link/ProjectLink';

interface IProps {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    activeProjectPath: string
    onBackClick: () => void
}

interface IState {}

export class ProjectOptions extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick() {
        const { activeProjectPath, onBackClick } = this.props;
        const path = `/portfolio/${activeProjectPath}`;
        browserHistory.push(path);
        onBackClick();
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, activeProjectPath } = this.props;

        const styles = {
            projectOptions: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 4,
                textAlign: isTablet ? "center" : "right",
                cursor: "pointer"
            },
            projectOptions__inner: {
                display: "inline-block",
                height: 55,
                background: isTablet ? colors.wht : "rgba(0,0,0, 0.22)",
                width: 240
            },
            projectOptions__back: {
                position: "relative",
                top:  -14,
                display: "inline-block",
                height: "100%",
                width: 80
            },
            projectOptions__backText: {
                position: "relative",
                top:  -10,
            },
            projectOptions__link: {
                display: "inline-block",
                height: "100%",
                width: 160
            }
        } as any;

        return (
            <div style={ styles.projectOptions }>
                <div style={ styles.projectOptions__inner }>
                    <div style={ styles.projectOptions__link } >
                        <ProjectLink
                            project={portfolioProjects[activeProjectPath]}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            isLaptop={isLaptop}
                        />
                    </div>
                    <div style={ styles.projectOptions__back }
                         onClick={this.handleBackClick}>
                        <span>
                            <span style={ styles.projectOptions__backText }>
                                Back
                            </span>
                        </span>
                        <MenuButton
                            crossColor={colors.std}
                            isACross={true}
                            onClick={null}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
