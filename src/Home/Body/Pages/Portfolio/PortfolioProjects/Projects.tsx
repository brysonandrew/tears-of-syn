import * as React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { portfolioProjectList } from "../../../../../data/content";
import { IParams, IDictionary } from "../../../../../data/models";
import { toggleScrollAnimation, toggleWheel } from '../../../../HomeActionCreators';
import { MotionScroll } from "../../../../../Widgets/MotionScroll/MotionScroll";
import { ProjectFromStore } from "./Project/Project";
import { IStore } from '../../../../../redux/IStore';

interface IProperties {
    height?: number
    width?: number
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    isAnimating?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationEnd?: () => void
    onWheel?: () => void
    onWheelStop?: () => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    docScroll?: number
    isMounted?: boolean
}

export class Projects extends React.Component<IProps, IState> {

    timeoutId;
    timeoutStopDelay = 50;
    isWheelRecorded = false;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            docScroll: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.handleWheel);
    }

    handleScroll() {
        if (!this.props.isAnimating) {
            this.changeProjectPathOnScroll();
        }
        this.setState({docScroll: document.scrollingElement.scrollTop});
    }

    handleWheel() {
        if (!this.isWheelRecorded) {
            this.props.onWheel();
            this.isWheelRecorded = true;
        }
        // detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
                this.props.onWheelStop();
                this.isWheelRecorded = false;
            },
        this.timeoutStopDelay);
        if (this.props.isAnimating) {
            this.setState({docScroll: document.body.scrollTop});
        }
    }

    changeProjectPathOnScroll() {
        const { savedParams } = this.props;

        const approachingProjectBuffer = 200;
        const projectsScrolledPastOffsets = this.projectOffsetList().filter(offset => (offset - approachingProjectBuffer) < window.scrollY);

        const currentIndex = projectsScrolledPastOffsets.length > 0
                                ?   projectsScrolledPastOffsets.length - 1
                                :   -1;

        if (currentIndex > -1 && portfolioProjectList[currentIndex].path !== savedParams.activeProjectPath) {
            const nextPath = `/portfolio/${portfolioProjectList[currentIndex].path}`;
            browserHistory.push(nextPath);
        }
    }

    static calcWidthMarginFactor(isMobile, isTablet, isLaptop) {
        return  isMobile
                    ?   0
                    :   isTablet
                            ?   0.0675
                            :   isLaptop
                                    ?   0.125
                                    :   0.25;
    }

    projectOffsetList(): number[] {
        return portfolioProjectList.map((project, i) => i * this.props.width);
    };

    projectOffsets(): IDictionary<number> {
        return this.projectOffsetList().reduce((acc, curr, i) => {
            acc[portfolioProjectList[i].path] = curr;
            return acc;
        }, {});
    }

    render(): JSX.Element {
        const { docScroll } = this.state;
        const { onAnimationEnd, savedParams, isAnimating, width, height, isMobile, isTablet, isLaptop } = this.props;

        const pageProjectPath = !!savedParams.activeProjectPath
                                    ?   savedParams.activeProjectPath
                                    :   portfolioProjectList[0].path;

        const scrollHeight = width * (portfolioProjectList.length - 1);
        const widthMarginFactor = Projects.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
        const widthMargin = widthMarginFactor * width;
        const adjustedWidth = width - widthMargin * 2;
        const adjustedScroll = docScroll - (widthMarginFactor * docScroll * 2);

        const styles = {
            projects: {
                position: "relative",
                height: height + scrollHeight
            },
            projects__inner: {
                position: "fixed",
                left: widthMargin,
                top: 0,
                width: portfolioProjectList.length * adjustedWidth
            },
            projects__project: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: adjustedWidth,
                height: height,
                transform: `translate3d(${-adjustedScroll}px, 0px, 0px)`
            }
        } as any;

        return (
            <div style={ styles.projects }>
                <div style={ styles.projects__inner }>
                    {!!this.projectOffsets() && <MotionScroll
                                                    docScroll={docScroll}
                                                    isAnimating={isAnimating}
                                                    scrollTarget={this.projectOffsets()[pageProjectPath]}
                                                    onRest={onAnimationEnd}
                                                />}
                    {portfolioProjectList.map((project, i) =>
                        <div key={i}
                             style={ styles.projects__project }>
                            <ProjectFromStore
                                index={i}
                                project={project}
                                previewWidth={adjustedWidth}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isAnimating: state.homeStore.isAnimating,
        savedParams: state.homeStore.savedParams,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationEnd: () => {
            dispatch(toggleScrollAnimation(false));
        },
        onWheel: () => {
            dispatch(toggleWheel(true));
            dispatch(toggleScrollAnimation(false));
        },
        onWheelStop: () => {
            dispatch(toggleWheel(false));
        }
    };
}

export let ProjectsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Projects);
