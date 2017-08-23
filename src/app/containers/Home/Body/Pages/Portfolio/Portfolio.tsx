import * as React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { ProjectsFromStore } from './PortfolioProjects/Projects';
import { BottomNavigationMenu } from './PorfolioProjectsMenu/BottomNavigationMenu/BottomNavigationMenu';
import { IParams } from '../../../../../../data/models';
import { toggleScrollAnimation } from '../../../HomeActionCreators';
import { HeadingFromStore } from './PortfolioProjects/Heading/Heading';
import { IStore } from '../../../../../../redux/IStore';

interface IProperties {
    savedParams?: IParams
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    isPreviewExtended?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onArrowNavigate?: (nextParams: IParams) => void
    onAnimationStart?: () => void
}

interface IProps extends IProperties, ICallbacks {
}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Portfolio extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
        this.handleArrowNavigation = this.handleArrowNavigation.bind(this);
    }

    componentDidMount() {
        const { savedParams, onAnimationStart } = this.props;

        if (savedParams.activeProjectPath) {
            onAnimationStart();
        }

        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 0);
    }

    componentWillReceiveProps(nextProps) {
        const isProjectPathChanged = nextProps.savedParams.activeProjectPath !== this.props.savedParams.activeProjectPath;
        const isProjectPathChangedAndEmpty = !nextProps.savedParams.activeProjectPath && isProjectPathChanged;
        const isPagePathChangedAndEmpty = !nextProps.savedParams.activePagePath && isProjectPathChanged;

        if (isProjectPathChanged
            || isProjectPathChangedAndEmpty
            || isPagePathChangedAndEmpty) {
            nextProps.onAnimationStart();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    handleArrowNavigation(nextPath) {
        browserHistory.push(nextPath);
    }

    render(): JSX.Element {
        const {
            savedParams,
            isMobile,
            isTablet,
            isLaptop,
            isPreviewExtended
        } = this.props;

        const styles = {
            portfolio__projects: {
                position: "relative",
                zIndex: 2
            },
            portfolio__heading: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                opacity:  isPreviewExtended ? 0.4 : 1,
                filter: `grayscale(${isPreviewExtended ? 100 : 0}%) blur(${isPreviewExtended ? 2 : 0}px)`,
                zIndex: isPreviewExtended ? 0 : 4,
                transition: "filter 400ms, opacity 400ms"
            },
            portfolio__bottomNav: {
                position: "fixed",
                bottom: isTablet ? 0 : 80,
                width: "100%",
                zIndex: 2
            }
        } as any;
        return (
            <div>
                <div style={ styles.portfolio__heading}>
                    <HeadingFromStore/>
                </div>
                <div style={ styles.portfolio__projects}>
                    <ProjectsFromStore/>
                </div>
                <div style={ styles.portfolio__bottomNav }>
                    <BottomNavigationMenu
                        onArrowNavigation={this.handleArrowNavigation}
                        savedParams={savedParams}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isPreviewExtended: state.homeStore.isPreviewExtended,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch): ICallbacks {
    return {
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        }
    };
}

export const PortfolioFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Portfolio);
