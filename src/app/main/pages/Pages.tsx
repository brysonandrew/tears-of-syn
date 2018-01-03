import * as React from 'react';
import { PagesInner } from './PagesInner';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../mobx/stores/HomeStore';
import { computed } from 'mobx';
import { colors } from '../../../data/themeOptions';

interface IProps {
    store?: HomeStore<string>
}

interface IState {
    isMounted: boolean
}

@inject('store')
@observer
export class Pages extends React.Component<IProps, IState> {

    timerId;

    @computed public get styles(): any {
        const { isMounted } = this.state;
        return {
            pages: {
                position: "relative",
                zIndex: 2,
                opacity: isMounted ? 1 : 0,
                filter: isMounted ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms"
            }
        };
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        const { savedParams, onAnimationStart } = this.props.store;

        if (!!savedParams.get("activePagePath")) {
            onAnimationStart();
        }

        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 800);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render(): JSX.Element {

        return (
            <div style={ this.styles.pages}>
                <PagesInner/>
            </div>
        );
    }
}
