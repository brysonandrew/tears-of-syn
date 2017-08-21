import { IParams } from "../models";

export const isPage = (params: IParams) => {
    return {
        home: params.activeProjectPath === "home" || params.activeProjectPath == null
    };
};

export const isView = (params) => {
    return {
        welcome: params.activeViewPath === "welcome" || params.activeViewPath == null
    };
};
