import {
    // r o u t i n g
    UPDATE__LOCATION,
    UPDATE__PARAMS,
    // s c r o l l i n g
    UPDATE__SCROLL_TYPE,
    UPDATE__WHEEL_EVENT,
    // v i e w s
    OPEN__MENU,
    EXTEND__PREVIEW,
    UPDATE__VIEWPORT_DIMENSIONS
} from './HomeActions';
import { createReducer } from "../../../redux/utils/reducers";
import { IParams } from "../../../data/models";
import { breakPointTests } from "../../../data/helpers/breakPoints";
import { AsyncGet } from "../../../redux/utils/async_get";

export interface IHomeState {
    content: AsyncGet<any>
    savedLocation: Location
    savedParams: IParams
    width: number
    height: number
    isAnimating: boolean
    isWheel: boolean
    isMenuOpen: boolean
    isPreviewExtended: boolean
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
}

const initialState: IHomeState = {
    content: AsyncGet.init(null),
    savedLocation: {} as Location,
    savedParams: {
        activePagePath: "",
        activeProjectPath: "",
        activeViewPath: ""
    },
    isAnimating: false,
    isWheel: false,
    isMenuOpen: false,
    isPreviewExtended: false,
    width: 1024,
    height: 720,
    isMobile: false,
    isTablet: false,
    isLaptop: false
};

export const homeReducer = createReducer<IHomeState>(initialState, [
// r o u t i n g
    {
        action: UPDATE__LOCATION,
        handler: (state: IHomeState, action: UPDATE__LOCATION) => {
            return {...state, savedLocation: action.location};
        }
    },
    {
        action: UPDATE__PARAMS,
        handler: (state: IHomeState, action: UPDATE__PARAMS) => {
            return {...state, savedParams: action.savedParams};
        }
    },
// s c r o l l i n g
    {
        action: UPDATE__SCROLL_TYPE,
        handler: (state: IHomeState, action: UPDATE__SCROLL_TYPE) =>  {
            return {...state, isAnimating: action.isAnimating};
        }
    },
    {
        action: UPDATE__WHEEL_EVENT,
        handler: (state: IHomeState, action: UPDATE__WHEEL_EVENT) =>  {
            return {...state, isWheel: action.isWheel};
        }
    },
// v i e w s
    {
        action: OPEN__MENU,
        handler: (state: IHomeState, action: OPEN__MENU) =>  {
            return {...state, isMenuOpen: action.isMenuOpen};
        }
    },
    {
        action: EXTEND__PREVIEW,
        handler: (state: IHomeState, action: EXTEND__PREVIEW) =>  {
            return {...state, isPreviewExtended: action.isPreviewExtended};
        }
    },
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: (state: IHomeState, action: UPDATE__VIEWPORT_DIMENSIONS) =>  {
            return {
                ...state,
                    isMobile: breakPointTests.isMobile(action.width),
                    isTablet: breakPointTests.isTablet(action.width),
                    isLaptop: breakPointTests.isLaptop(action.width),
                    width: action.width,
                    height: action.height
            };
        }
    }
]);
