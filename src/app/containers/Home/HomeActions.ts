import {IParams} from "../../../data/models";
// r o u t i n g
export namespace UPDATE__LOCATION {
    export let type = "UPDATE__LOCATION";
}
export interface UPDATE__LOCATION {
    location: Location
}
export namespace UPDATE__PARAMS {
    export let type = "SAVE__PARAMS";
}
export interface UPDATE__PARAMS {
    savedParams: IParams
}
// s c r o l l i n g
export namespace UPDATE__SCROLL_TYPE {
    export const type = "UPDATE__SCROLL_TYPE";
}
export interface UPDATE__SCROLL_TYPE {
    isAnimating: boolean
}
export namespace UPDATE__WHEEL_EVENT {
    export const type = "UPDATE__WHEEL_EVENT";
}
export interface UPDATE__WHEEL_EVENT {
    isWheel: boolean
}
// v i e w s
export namespace OPEN__MENU {
    export const type = "OPEN__MENU";
}
export interface OPEN__MENU {
    isMenuOpen: boolean
}
export namespace EXTEND__PREVIEW {
    export const type = "EXTEND__PREVIEW";
}
export interface EXTEND__PREVIEW {
    isPreviewExtended: boolean
}
export namespace UPDATE__VIEWPORT_DIMENSIONS {
    export let type = "UPDATE__VIEWPORT_DIME";
}
export interface UPDATE__VIEWPORT_DIMENSIONS {
    width: number
    height: number
}
