import * as React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { IGrabParams, IParams, IPortfolioProject } from "../../../../../../../../data/models";
import { ProjectHeading } from "./Heading/ProjectHeading";
import { togglePreview, toggleScrollAnimation } from "../../../../../HomeActionCreators";
import { colors } from "../../../../../../../../data/themeOptions";
import { Loader } from "../../../../../../../widgets/Loader";
import { ImageLoader } from "../../../../../../../widgets/ImageLoader";
import { ProjectLink } from "./Link/ProjectLink";
import { IStore } from '../../../../../../../../redux/IStore';

interface IProperties {
    isMenuOpen?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    height?: number
    isPreviewExtended?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationStart?: () => void
    onExtendPreview?: () => void
    onCondensePreview?: () => void
}

interface IProps extends IProperties, ICallbacks {
    index: number
    project: IPortfolioProject
    previewWidth?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isImagesLoading?: boolean
    grabParams?: IGrabParams
}

export class Project extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;
    innerRef;
    scrollHeight = 1; // make one so it doesnt return NAN on division
    elasticBuffer = 140;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            isImagesLoading: false,
            grabParams: {
                isActive: false,
                origY: 0
            },
            posY: 0,
        };
        this.handleHeadingClick = this.handleHeadingClick.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { savedParams, isPreviewExtended } = this.props;
        const isParamsChanged = (savedParams.activeProjectPath !== nextProps.savedParams.activeProjectPath);

        const isPreviewExtendedChanged = (!nextProps.isPreviewExtended
            && isPreviewExtended !== nextProps.isPreviewExtended);
        if (isParamsChanged || isPreviewExtendedChanged)  {
            this.handleReset(nextProps.isPreviewExtended);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        cancelAnimationFrame(this.animationFrameId);
    }

    handleClick() {
        const { project, onAnimationStart } = this.props;
        const path = `/portfolio/${project.path}`;
        browserHistory.push(path);
        onAnimationStart();
    }

    handleReset(isPreviewExtended) {

        this.setState({ // reset
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            posY: 0
        });
        if (isPreviewExtended) {
            this.timeoutId = setTimeout(() => this.props.onCondensePreview(), 500);
        }
    }

    handleHeadingClick() {
        const { project, onAnimationStart, onExtendPreview } = this.props;
        const { isProjectExtended } = this.state;
        if (isProjectExtended) {
            this.timeoutId = setTimeout(() => this.props.onCondensePreview(), 500);
        } else {
            this.setState({
                isProjectExtended: true,
                isImagesLoading: true
            });
            onAnimationStart();
            onExtendPreview();
        }
        browserHistory.push(`/portfolio/${project.path}`);
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false,
            grabParams: {
                isActive: false,
                origY: 0
            }
        });
    }

    handleMouseDown(e) {
        this.setState({
            grabParams: {
                isActive: true,
                origY: e.clientY
            }
        });
        e.preventDefault();
    }

    handleMouseUp() {
        this.setState({
            grabParams: {
                isActive: false,
                origY: 0
            }
        });
    }

    handleMouseMove(e) {
        const { posY, grabParams } = this.state;

        const diffY = e.clientY - grabParams.origY;

        const easing = 0.15;

        this.scrollHeight = this.innerRef.clientHeight;

        const isMin = posY > 0;
        const isMax = posY < -this.scrollHeight;
        const isUp = (diffY < 0.5);
        const isDown = (diffY > -0.5);

        const nextPosY = isDown
                            ?   isMin
                                    ?   posY + (this.elasticBuffer - posY) * easing
                                    :   posY + diffY
                            :   isUp
                                    ?   isMax
                                        ?   posY - ((this.scrollHeight + this.elasticBuffer) + posY) * easing
                                        :   posY + diffY
                                    :   this.handleRelease();

        this.setState({
            posY: nextPosY,
            grabParams: {
                isActive: true,
                origY: e.clientY
            }
        });

        // detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.handleRelease(), 140);

        e.stopPropagation();
        e.preventDefault();
    }

    handleWheel(e) {
        const { posY } = this.state;

        const delta = e.deltaY;
        const easing = 0.15;

        // const imageNumber = this.props.project.imagePaths.length;
        this.scrollHeight = this.innerRef.clientHeight;

        const isMin = posY > 0;
        const isMax = posY < -this.scrollHeight;
        const isUp = (delta > 0.5);
        const isDown = (delta < -0.5);

        const nextPosY = isDown
                        ?   isMin
                            ?   posY + (this.elasticBuffer - posY) * easing
                            :   posY + 28
                        :   isUp
                            ?   isMax
                                ?   posY - ((this.scrollHeight + this.elasticBuffer) + posY) * easing
                                :   posY - 28
                            :   this.handleRelease();

        this.setState({
            posY: nextPosY
        });

        // detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.handleRelease(), 140);

        e.stopPropagation();
        e.preventDefault();
    }

    handleHeadingMouseEnter() {
        this.setState({
            isHeadingHovered: true
        });
    }

    handleHeadingMouseLeave() {
        this.setState({
            isHeadingHovered: false
        });
    }

    handleRelease() {
        const { posY } = this.state;
        const spring = 0.4;
        const friction = 0.2;
        const isMin = posY > 0;
        const isMax = posY < -this.scrollHeight;

        this.animationFrameId = requestAnimationFrame(this.handleRelease);

        if (isMin) {
            if (posY < 50) {
                cancelAnimationFrame(this.animationFrameId);
            }

            let recoil = (posY - this.elasticBuffer) * spring;

            recoil *= friction;

            const nextPosY = posY + recoil;

            this.setState({
                posY: nextPosY
            });

            return nextPosY;
        } else if (isMax) {

            if (posY > -this.scrollHeight) {
                cancelAnimationFrame(this.animationFrameId);
            }

            let recoil = ((this.scrollHeight + this.elasticBuffer) + posY) * spring;

            recoil *= friction;

            const nextPosY = posY + recoil;

            this.setState({
                posY: nextPosY
            });

            return nextPosY;
        } else {
            cancelAnimationFrame(this.animationFrameId);

            this.setState({
                posY: posY
            });

            return posY;
        }
    }

    handleLoad() {
        this.setState({
            isImagesLoading: false
        });
    }

    handleFail() {
        this.setState({
            isImagesLoading: false
        });
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, index, savedParams, height, previewWidth } = this.props;
        const { isHovered, isHeadingHovered, isProjectExtended, posY, isImagesLoading, grabParams } = this.state;
        const isActive = project.path === savedParams.activeProjectPath
                            || (!savedParams.activeProjectPath && index === 0);

        const heightByScroll = ((height + this.elasticBuffer) / this.scrollHeight * (-posY - this.elasticBuffer));

        const topOffset = isMobile ? 200 : isTablet ? 150 : 100;

        const cursor = isProjectExtended
                            ?   "crosshair"
                            :   "pointer";

        const styles = {
            project: {
                position: "relative",
                height: height,
                width: "100%",
                zIndex: 0
            },
            project__barFill: {
                position: "absolute",
                top: 0,
                left: -2,
                width: 4,
                height: height,
                background: colors.std,
                transform: `scale(${(isActive && isProjectExtended) ? 1 : 0})`,
                transition: "transform 200ms"
            },
            project__bar: {
                position: "absolute",
                top: 0,
                left: 1,
                width: 2,
                height: (heightByScroll > 0) ? heightByScroll : 0,
                background: colors.wht
            },
            project__inner: {
                position: "relative",
                display: "inline-block",
                top: `${isProjectExtended ? 0 : 50}%`,
                paddingTop: isProjectExtended ? 0 : topOffset,
                transform: `translate3d(0px, ${posY}px, 0px) translate(0px, ${isProjectExtended ? 0 : -50}%)`,
                transition: "padding 800ms"
            },
            project__image: {
                position: "relative",
                width: "calc(100% - 20px)",
                padding: "0px 10px",
                height: "auto",
                WebkitFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                MozFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                filter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms, filter 800ms",
                cursor: cursor,
            },
            project__heading: {
                padding: "40px 0px 80px",
                width: "100%",
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms",
            }
        } as any;

        return (
            <div style={ styles.project }
                 onWheel={isProjectExtended
                     ?   isImagesLoading
                         ?   e => e.preventDefault()
                         :   e => this.handleWheel(e)
                     :   null}
                 onClick={isActive
                     ?   isProjectExtended
                         ?   null
                         :   this.handleHeadingClick
                     :   this.handleClick}
                 onMouseDown={isActive
                 && isProjectExtended
                 && !isImagesLoading
                     ?   this.handleMouseDown
                     :   null}
                 onMouseUp={isActive && isProjectExtended
                     ?   this.handleMouseUp
                     :   null}
                 onMouseMove={(isActive && grabParams.isActive) ? this.handleMouseMove : null}>
                <div style={ styles.project__inner }
                     ref={el => this.innerRef = el}
                     onMouseEnter={isActive ? null : this.handleMouseEnter}
                     onMouseLeave={this.handleMouseLeave}>
                    {project.imagePaths.map((path, i) =>
                        ((isProjectExtended && !isImagesLoading)
                            || i === 0)
                        &&
                        <img key={i}
                             style={ styles.project__image }
                             src={path}/>
                    )}
                    {isProjectExtended
                    && isImagesLoading
                    &&
                    <div>
                        <ImageLoader
                            imagePaths={project.imagePaths}
                            onLoad={() => this.handleLoad()}
                            onFail={() => this.handleFail()}
                        />
                        <Loader/>
                    </div>}
                    {!isProjectExtended
                        &&  <div style={ styles.project__heading}
                                 onMouseEnter={isActive ? () => this.handleHeadingMouseEnter() : null}
                                 onMouseLeave={isActive ? () => this.handleHeadingMouseLeave() : null}>
                                <ProjectHeading
                                    project={project}
                                    previewWidth={previewWidth}
                                    isMobile={isMobile}
                                    isTablet={isTablet}
                                    isLaptop={isLaptop}
                                    isActive={isActive}
                                    isHovered={isHeadingHovered}
                                    onClick={this.handleHeadingClick}
                                />
                            </div>}
                </div>
                <div style={ styles.project__barFill}>
                    <div style={ styles.project__bar} />
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        isMenuOpen: state.homeStore.isMenuOpen,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams,
        isPreviewExtended: state.homeStore.isPreviewExtended
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        },
        onExtendPreview: () => {
            dispatch(togglePreview(true));
        },
        onCondensePreview: () => {
            dispatch(togglePreview(false));
        }
    };
}

export const ProjectFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Project);
