import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../redux/IStore';

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class Empty extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {

        } as any;
        return (
            <div/>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
    };
}

export let EmptyStore = connect(
    mapStateToProps, mapDispatchToProps
)(Empty);
