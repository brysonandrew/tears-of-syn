import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {computed} from 'mobx';
import { MotionScroll } from "../widgets/MotionScroll/MotionScroll";
import { Page } from "./Page";
import {PAGE_LIST} from '../../data/pages';
import Store from '../../data/Store';

interface IProps {
    store?: Store
}

interface IState {
    isMounted?: boolean
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, IState> {

    @computed public get activePagePath(): string {
        const { savedParams } = this.props.store;

        return !!savedParams.get("activePagePath")
            ?   savedParams.get("activePagePath")
            :   PAGE_LIST[0].path;
    }

    @computed public get styles(): any {
        const { height, width, isMobile, isTablet, isLaptop, docScroll, widthMargin, adjustedWidth } = this.props.store;

        const scrollHeight = width * (PAGE_LIST.length - 1);
        const widthMarginFactor = Pages.calcWidthMarginFactor(isMobile, isTablet, isLaptop);
        const adjustedScroll = docScroll - (widthMarginFactor * docScroll * 2);

        return {
            p: {
                id: "pages inner",
                position: "relative",
                height: height + scrollHeight
            },
            inner: {
                position: "fixed",
                left: widthMargin,
                top: 0,
                width: PAGE_LIST.length * adjustedWidth
            },
            page: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: adjustedWidth,
                height: height,
                transform: `translate3d(${-adjustedScroll}px, 0px, 0px)`
            }
        };
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
        window.addEventListener("scroll", this.props.store.onScroll);
        window.addEventListener("wheel", this.props.store.onWheel);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.props.store.onScroll);
        window.removeEventListener("wheel", this.props.store.onWheel);
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

    render(): JSX.Element {
        const { onAnimationEnd, isAnimating, docScroll, adjustedWidth } = this.props.store;

        return (
            <div style={ this.styles.p }>
                <div style={ this.styles.inner }>
                    {!!this.props.store.projectOffsets
                        ?   <MotionScroll
                                docScroll={docScroll}
                                isAnimating={isAnimating}
                                scrollTarget={this.props.store.projectOffsets[this.activePagePath]}
                                onRest={onAnimationEnd}
                            />
                        :   null}
                    {PAGE_LIST.map((page, i) =>
                        <div key={`page-${i}`}
                             style={ this.styles.page }>
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
