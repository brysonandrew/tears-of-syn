import * as React from 'react';
import { browserHistory } from 'react-router';
import { IDictionary } from "../../../../../data/models/models";
import { MotionScroll } from "../../../../widgets/MotionScroll/MotionScroll";
import { Page } from "./Page/Page";
import { pageList } from '../../../../../data/content/pages/pages';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../mobx/stores/HomeStore';

interface IProps {
    store?: HomeStore<string>
}

interface IState {
    docScroll?: number
    isMounted?: boolean
}

@inject('store')
@observer
export class PagesInner extends React.Component<IProps, IState> {

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
        if (!this.props.store.isAnimating) {
            this.changeProjectPathOnScroll();
        }
        this.setState({docScroll: document.scrollingElement.scrollTop});
    }

    handleWheel() {
        if (!this.isWheelRecorded) {
            this.props.store.onWheel();
            this.isWheelRecorded = true;
        }
        // detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
                this.props.store.onWheelStop();
                this.isWheelRecorded = false;
            },
        this.timeoutStopDelay);
        if (this.props.store.isAnimating) {
            this.setState({docScroll: document.body.scrollTop});
        }
    }

    changeProjectPathOnScroll() {
        const { savedParams } = this.props.store;

        const approachingProjectBuffer = 200;
        const PagesInnerScrolledPastOffsets = this.projectOffsetList().filter(offset => (offset - approachingProjectBuffer) < window.scrollY);

        const currentIndex = PagesInnerScrolledPastOffsets.length > 0
                                ?   PagesInnerScrolledPastOffsets.length - 1
                                :   -1;

        if (currentIndex > -1 && pageList[currentIndex].path !== savedParams.get("activePagePath")) {
            const nextPath = `/${pageList[currentIndex].path}`;
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
        return pageList.map((project, i) => i * this.props.store.width);
    };

    projectOffsets(): IDictionary<number> {
        return this.projectOffsetList().reduce((acc, curr, i) => {
            acc[pageList[i].path] = curr;
            return acc;
        }, {});
    }

    render(): JSX.Element {
        const { docScroll } = this.state;
        const { onAnimationEnd, savedParams, isAnimating, width, height, isMobile, isTablet, isLaptop } = this.props.store;

        const activePagePath = !!savedParams.get("activePagePath")
                                    ?   savedParams.get("activePagePath")
                                    :   pageList[0].path;

        const scrollHeight = width * (pageList.length - 1);
        const widthMarginFactor = PagesInner.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
        const widthMargin = widthMarginFactor * width;
        const adjustedWidth = width - widthMargin * 2;
        const adjustedScroll = docScroll - (widthMarginFactor * docScroll * 2);

        const styles = {
            pagesInner: {
                position: "relative",
                height: height + scrollHeight
            },
            pagesInner__inner: {
                position: "fixed",
                left: widthMargin,
                top: 0,
                width: pageList.length * adjustedWidth
            },
            pagesInner__page: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: adjustedWidth,
                height: height,
                transform: `translate3d(${-adjustedScroll}px, 0px, 0px)`
            }
        } as any;

        return (
            <div style={ styles.pagesInner }>
                <div style={ styles.pagesInner__inner }>
                    {!!this.projectOffsets() && <MotionScroll
                                                    docScroll={docScroll}
                                                    isAnimating={isAnimating}
                                                    scrollTarget={this.projectOffsets()[activePagePath]}
                                                    onRest={onAnimationEnd}
                                                />}
                    {pageList.map((page, i) =>
                        <div key={`page-${i}`}
                             style={ styles.pagesInner__page }>
                            <Page
                                index={i}
                                page={page}
                                previewWidth={adjustedWidth}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}
