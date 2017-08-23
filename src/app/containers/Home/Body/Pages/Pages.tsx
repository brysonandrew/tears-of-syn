import * as React from 'react';
import { pages } from '../../../../../data/content/pages/pages';
import { IParams } from '../../../../../data/models';

interface IProps {
    savedParams: IParams
}

interface IState {}

export class Pages extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { savedParams } = this.props;
        const activePagePath = savedParams.activePagePath;
        const component = pages[activePagePath ? activePagePath : "portfolio"].component;

        return (
            <div>
                {component}
            </div>
        );
    }
}
