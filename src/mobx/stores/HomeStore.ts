import { observable, action } from 'mobx';
import { IParams } from '../../data/models/models';
import { buildMap } from '../../data/helpers/buildMap';

export default class HomeStore<Item> {

    // @observable items: Array<Item> = [];
    @observable isAnimating: boolean;
    @observable isWheel: boolean;
    @observable isMobile: boolean;
    @observable isTablet: boolean;
    @observable isLaptop: boolean;
    @observable width: number;
    @observable height: number;
    @observable savedParams: Map<string, string>;

    constructor(initialState?: { homeStore: HomeStore<Item> }) {
        // this.items = initialState && initialState.homeStore && initialState.homeStore.items ? initialState.homeStore.items : [];
        this.isAnimating = false;
        this.isWheel = false;
        this.width = 0;
        this.height = 0;
        this.savedParams = buildMap({
            activePagePath: ""
        });
    }

    @action
    public onWheel = () => {
        this.isWheel = true;
    };

    @action
    public onWheelStop = () => {
        this.isWheel = false;
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
        console.log(nextParams);
        this.savedParams = buildMap(nextParams);
    };
}
