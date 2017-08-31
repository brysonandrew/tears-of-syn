import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

interface IProps {}

interface IState {}

@observer
export class Empty extends React.Component<IProps, IState> {

    @computed public get styles(): any {
        return {};
    }
    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div/>
        );
    }
}
