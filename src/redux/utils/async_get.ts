export type GetStatus = string;

export class AsyncGetStatus {
    static NONE:GetStatus = 'NONE';
    static FETCHING:GetStatus = 'FETCHING';
    static FETCHED:GetStatus = 'FETCHED';
    static ERROR:GetStatus = 'ERROR';
}

export interface AsyncGet<T> {
    status:GetStatus       // Get Status
    value?:T               // Data that were fetched
    error?:Object          // Error string returned from server or json object with validation errors
}

interface AsyncGetCallbacks<T> {
    none?:() => JSX.Element | JSX.Element[]
    fetching?:() => JSX.Element | JSX.Element[]
    fetched?:(value:T) => JSX.Element | JSX.Element[]
    error?:(error:Object)=> JSX.Element | JSX.Element[]
}

export module AsyncGet {

    export function init(value) {
        return {
            status: AsyncGetStatus.NONE,
            value: value
        }
    }

    /**
     * Helper method for rendering async get values
     * @param asyncGetValue     The async value to render
     * @param callbacks         Callbacks that render the view depending on the async value's status
     */
    export function render<T>(asyncGetValue:AsyncGet<T>, callbacks:AsyncGetCallbacks<T>): JSX.Element | JSX.Element[] {
        if (asyncGetValue.value && callbacks.fetched) {
            // If it has a value, we always render (no loading shown)
            return callbacks.fetched(asyncGetValue.value);
        } else if (asyncGetValue.status == AsyncGetStatus.FETCHING && callbacks.fetching) {
            return callbacks.fetching();
        } else if (asyncGetValue.status == AsyncGetStatus.ERROR && callbacks.error) {
            return callbacks.error(asyncGetValue.error);
        } else {
            return callbacks.none ? callbacks.none() : null;
        }
    }

    /**
     * Returns a new AsyncGet based on the given one but with status set to FETCHING
     */
    export function fetching<T>(asyncGetValue: AsyncGet<T>) : AsyncGet<T> {
        return {
            ...asyncGetValue,
            status: AsyncGetStatus.FETCHING
        }
    }

    /**
     * Returns a new AsyncGet with status FETCHED and with given value (without error)
     * @param asyncGetValue Existing async get
     * @param value         The value to be set
     */
    export function fetched<T>(asyncGetValue: AsyncGet<T>, value: T) : AsyncGet<T> {
        // Note: error field is intentionally missing because we want to remove it
        return {
            status: AsyncGetStatus.FETCHED,
            value
        }
    }

    /**
     * Returns a new AsyncGet with status ERROR (keeps the existing value)
     * @param asyncGetValue     Existing AsyncGet
     * @param error             Error to set
     */
    export function error<T>(asyncGetValue: AsyncGet<T>, error: Object) : AsyncGet<T> {
        return {
            ...asyncGetValue,
            status: AsyncGetStatus.ERROR,
            error
        }
    }

}
