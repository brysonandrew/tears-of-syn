import { observable, action } from 'mobx';
import { IParams } from './models';
import { buildMap } from './helpers/buildMap';

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

    constructor(initialState?: { Store: Store }) {
        // this.items = initialState && initialState.Store && initialState.Store.items ? initialState.Store.items : [];
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
