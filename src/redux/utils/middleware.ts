import {IAction} from "./actions";
import * as Immutable from 'immutable';
import {Middleware} from "redux";
import {MiddlewareAPI} from "redux";

interface IMiddlewareHandler<S> {
    /** Action the middleware handles */
    action: IAction
    /** Gets called before the state changes */
    beforeHandler?: (storeAPI: MiddlewareAPI<S>, action: any) => void
    /** Gets called after the state changes */
    afterHandler?: (storeAPI: MiddlewareAPI<S>, action: any) => void
}

/**
 * Helper method for creating a middleware that handles the given set of actions
 *
 * @param handlers      A set of middleware handlers (action, beforeHandler and afterHandler)
 * @returns The generated middleware function
 */
export function createMiddleware<S>(handlers: IMiddlewareHandler<S>[]): any {
    return (storeAPI: MiddlewareAPI<S>) => next => (action: any = {type: "NONE"}) => {

        const actionHandler = Immutable.List(handlers).find(x => x.action.type === action.type);

        if (actionHandler && actionHandler.beforeHandler) {
            actionHandler.beforeHandler(storeAPI, action);
        }

        const result = next(action);

        if (actionHandler && actionHandler.afterHandler) {
            actionHandler.afterHandler(storeAPI, action);
        }

        return result;
    };
}
