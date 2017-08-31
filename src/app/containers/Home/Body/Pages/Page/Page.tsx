import * as React from 'react';
import { browserHistory } from 'react-router';
import { IParams, IPage } from "../../../../../../data/models/models";
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import HomeStore from '../../../../../../mobx/stores/HomeStore';

interface IProps {
    index: number
    page: IPage
    store?: HomeStore<string>
    previewWidth?: number
    offsetTop?: number
}

interface IState {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isImagesLoading?: boolean
}

@inject('store')
@observer
export class Page extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;

    @computed public get styles(): any {
        return {
            page: {
                position: "relative",
                height: this.props.store.height,
                width: "100%",
                zIndex: 0
            },
            page__inner: {
                position: "absolute",
                top: "50%",
                tranform: "translate(-50%)",
                fontSize: 80
            }
        };
    }

    @computed public get isActive(): any {
        const { page, index } = this.props;
        const { savedParams } = this.props.store;
        return page.path === savedParams.get("activePagePath")
            || (!savedParams.get("activePagePath") && index === 0);
    }

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            isImagesLoading: false,
            posY: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        cancelAnimationFrame(this.animationFrameId);
    }

    handleClick = () => {
        const { page } = this.props;
        const { onAnimationStart } = this.props.store;

        const path = `/${page.path}`;
        browserHistory.push(path);
        onAnimationStart();
    };

    render(): JSX.Element {
        const { page } = this.props;

        return (
            <div style={ this.styles.page }
                onClick={this.handleClick}>
                <div style={ this.styles.page__inner }>
                    {page.name}
                </div>
            </div>
        );
    }
}
