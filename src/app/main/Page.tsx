import * as React from 'react';
import { browserHistory } from 'react-router';
import { IParams, IPage } from "../../data/models";
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import Store from '../../data/Store';

interface IProps {
    index: number
    page: IPage
    store?: Store
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
            p: {
                id: "page",
                position: "absolute",
                top: "50%",
                width: "100%",
                transform: "translateY(-50%)",
                fontSize: 18,
                cursor: "pointer"
            },
            heading: {
                // color: "#e53935"
            },
            paragraph: {
                id: "page paragraph",
                margin: "24px 0"
            },
            line: {
                id: "page line",
                margin: "2px 0",
                lineHeight: 1.2
            },
            underLine: {
                display: "block",
                border: "none",
                height: 1,
                background: "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(transparent))"
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
            <div
                style={ this.styles.p }
                onClick={this.handleClick}
            >
                <div style={ this.styles.heading }>
                    <h2>{page.name}</h2>
                </div>
                <div style={ this.styles.paragraph }>
                    {page.paragraphs.map((paragraph, paragraphIndex) =>
                        <div
                            key={`paragraph-${paragraphIndex}`}
                            style={ this.styles.paragraph }
                        >
                            {paragraph.map((line, lineIndex) =>
                                <p
                                    key={`line-${lineIndex}`}
                                    style={ this.styles.line }
                                >
                                    {line}
                                    <span style={ this.styles.underLine }/>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
