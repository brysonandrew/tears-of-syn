import * as React from 'react';
import {browserHistory} from 'react-router';
import { IDictionary } from "../../../data/models";
import { MotionScroll } from "../../widgets/MotionScroll/MotionScroll";
import { Page } from "./Page";
import {PAGE_LIST} from '../../../data/pages';
import { inject, observer } from 'mobx-react';
import Store from '../../../data/Store';
import {computed, observable} from 'mobx';

interface IProps {
    store?: Store
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

    @computed public get projectOffsetList(): number[] {
        return PAGE_LIST.map((project, i) => i * this.props.store.width);
    }

    @computed public get projectOffsets(): IDictionary<number> {
        return this.projectOffsetList.reduce((acc, curr, i) => {
            acc[PAGE_LIST[i].path] = curr;
            return acc;
        }, {});
    }

    @computed public get activePagePath(): string {
        const { savedParams } = this.props.store;

        return !!savedParams.get("activePagePath")
            ?   savedParams.get("activePagePath")
            :   PAGE_LIST[0].path;
    }

    @computed public get widthMarginFactor(): any {
        const { isMobile, isTablet, isLaptop } = this.props.store;

        return PagesInner.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
    }

    @computed public get widthMargin(): any {
        const { width } = this.props.store;

        return this.widthMarginFactor * width
    }

    @computed public get adjustedWidth(): any {
        const { width } = this.props.store;

        return width - this.widthMargin * 2
    }

    @computed public get styles(): any {
        const { height, width, isMobile, isTablet, isLaptop } = this.props.store;
        const { docScroll } = this.state;

        const scrollHeight = width * (PAGE_LIST.length - 1);
        const widthMarginFactor = PagesInner.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
        const adjustedScroll = docScroll - (widthMarginFactor * docScroll * 2);

        return {
            p: {
                id: "pages inner",
                position: "relative",
                height: height + scrollHeight
            },
            inner: {
                position: "fixed",
                left: this.widthMargin,
                top: 0,
                width: PAGE_LIST.length * this.adjustedWidth
            },
            page: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: this.adjustedWidth,
                height: height,
                transform: `translate3d(${-adjustedScroll}px, 0px, 0px)`
            }
        };
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            docScroll: 0
        };
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

    handleScroll = () => {
        if (!this.props.store.isAnimating) {
            this.changeProjectPathOnScroll();
        }
        this.setState({docScroll: document.scrollingElement.scrollTop});
    };

    handleWheel = () => {
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
    };

    changeProjectPathOnScroll = () => {
        const { savedParams } = this.props.store;

        const approachingProjectBuffer = 200;
        const PagesInnerScrolledPastOffsets = this.projectOffsetList.filter(offset => (offset - approachingProjectBuffer) < window.scrollY);

        const currentIndex = PagesInnerScrolledPastOffsets.length > 0
                                ?   PagesInnerScrolledPastOffsets.length - 1
                                :   -1;

        if (currentIndex > -1 && PAGE_LIST[currentIndex].path !== savedParams.get("activePagePath")) {
            const nextPath = `/${PAGE_LIST[currentIndex].path}`;

            browserHistory.push(nextPath);
        }
    };

    static calcWidthMarginFactor(isMobile, isTablet, isLaptop) {
        return  isMobile
                    ?   0
                    :   isTablet
                            ?   0.0675
                            :   isLaptop
                                    ?   0.125
                                    :   0.25;
    }

    render(): JSX.Element {
        const { docScroll } = this.state;
        const { onAnimationEnd, isAnimating } = this.props.store;

        return (
            <div style={ this.styles.p }>
                <div style={ this.styles.inner }>
                    {!!this.projectOffsets
                        ?   <MotionScroll
                                docScroll={docScroll}
                                isAnimating={isAnimating}
                                scrollTarget={this.projectOffsets[this.activePagePath]}
                                onRest={onAnimationEnd}
                            />
                        :   null}
                    {PAGE_LIST.map((page, i) =>
                        <div key={`page-${i}`}
                             style={ this.styles.page }>
                            <Page
                                index={i}
                                page={page}
                                previewWidth={this.adjustedWidth}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}
