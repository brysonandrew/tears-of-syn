import {observable, action, computed} from 'mobx';
import {IDictionary, IParams} from './models';
import { buildMap } from './helpers/buildMap';
import {PAGE_LIST} from './pages';
import {browserHistory} from 'react-router';
import {Pages} from '../app/main/Pages';

export default class Store {

    // @observable items: Array<Item> = [];
    @observable isAnimating: boolean;
    @observable isWheel: boolean;
    @observable isMobile: boolean;
    @observable isTablet: boolean;
    @observable isLaptop: boolean;
    @observable width: number;
    @observable height: number;
    @observable savedParams: Map<string, string>;
    @observable docScroll: number;
    timeoutStopDelay;
    isWheelRecorded;
    timeoutId;

    constructor(initialState?: { Store: Store }) {
        // this.items = initialState && initialState.Store && initialState.Store.items ? initialState.Store.items : [];
        this.isAnimating = false;
        this.isWheel = false;
        this.width = 0;
        this.height = 0;
        this.docScroll = 0;
        this.savedParams = buildMap({
            activePagePath: ""
        });
    }

    @computed public get widthMarginFactor(): any {
        return Pages.calcWidthMarginFactor(this.isMobile, this.isTablet, this.isLaptop);
    }

    @computed public get widthMargin(): any {
        return this.widthMarginFactor * this.width
    }

    @computed public get adjustedWidth(): any {
        return this.width - this.widthMargin * 2
    }

    @computed public get projectOffsetList(): number[] {
        return PAGE_LIST.map((project, i) => i * this.width);
    }

    @computed public get projectOffsets(): IDictionary<number> {
        return this.projectOffsetList.reduce((acc, curr, i) => {
            acc[PAGE_LIST[i].path] = curr;
            return acc;
        }, {});
    }

    changeProjectPathOnScroll = () => {
        const approachingProjectBuffer = 200;
        const PagesInnerScrolledPastOffsets = this.projectOffsetList.filter(offset => (offset - approachingProjectBuffer) < window.scrollY);

        const currentIndex = PagesInnerScrolledPastOffsets.length > 0
            ?   PagesInnerScrolledPastOffsets.length - 1
            :   -1;

        if (currentIndex > -1 && PAGE_LIST[currentIndex].path !== this.savedParams.get("activePagePath")) {
            const nextPath = `/${PAGE_LIST[currentIndex].path}`;

            browserHistory.push(nextPath);
        }
    };

    @action
    public onScroll = () => {
        if (!this.isAnimating) {
            this.changeProjectPathOnScroll();
        }
        this.docScroll = document.scrollingElement.scrollTop;
    };

    @action
    public onWheel = () => {
        if (!this.isWheelRecorded) {
            this.isWheel = true;
            this.isWheelRecorded = true;
        }
        // detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
                this.isWheel = false;
                this.isWheelRecorded = false;
            },
            this.timeoutStopDelay);
        if (this.isAnimating) {
            this.docScroll = document.scrollingElement.scrollTop;
        }
    };

    @action
    public onAnimationStart = () => {
        this.isAnimating = true;
    };

    @action
    public onAnimationEnd = () => {
        this.isAnimating = false;
    };

    @action
    public onResizeViewport = (width: number, height: number) => {
        this.width = width;
        this.height = height;
    };

    @action
    public onLocationListen = (nextParams: IParams) => {
        this.savedParams = buildMap(nextParams);
    };

    @action
    public onLoad = (nextParams: IParams) => {
        this.savedParams = buildMap(nextParams);
    };
}
