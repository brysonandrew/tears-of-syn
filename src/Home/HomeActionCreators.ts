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
} from "./HomeActions";
import { createAction } from "../redux/utils/actions";

// r o u t i n g
export function saveLocation(nextLocation) {
    return dispatch => {
        dispatch(createAction<UPDATE__LOCATION>(UPDATE__LOCATION.type, {
            location: nextLocation,
        }));
    };
}
export function saveParams(nextParams) {
    return dispatch => {
        dispatch(createAction<UPDATE__PARAMS>(UPDATE__PARAMS.type, {
            savedParams: nextParams
        }));
    };
}
// s c r o l l i n g
export function toggleScrollAnimation(isAnimating) {
    return dispatch => {
        dispatch(createAction<UPDATE__SCROLL_TYPE>(UPDATE__SCROLL_TYPE.type, {
            isAnimating: isAnimating,
        }));
    };
}
export function toggleWheel(isWheel) {
    return dispatch => {
        dispatch(createAction<UPDATE__WHEEL_EVENT>(UPDATE__WHEEL_EVENT.type, {
            isWheel: isWheel,
        }));
    };
}
// v i e w s
export function toggleMenu(isMenuOpen) {
    return dispatch => {
        dispatch(createAction<OPEN__MENU>(OPEN__MENU.type, {
            isMenuOpen: isMenuOpen,
        }));
    };
}
export function togglePreview(isPreviewExtended) {
    return dispatch => {
        dispatch(createAction<EXTEND__PREVIEW>(EXTEND__PREVIEW.type, {
            isPreviewExtended: isPreviewExtended,
        }));
    };
}
export function changeViewportDimensions(width, height) {
    return dispatch => {
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width,
            height: height,
        }));
    };
}
