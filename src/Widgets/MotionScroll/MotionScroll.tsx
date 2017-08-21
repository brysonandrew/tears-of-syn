import * as React from 'react';
import { ScrollSink } from "./ScrollSink";
import { Motion, spring } from 'react-motion';

interface IProps {
    scrollTarget: number
    docScroll: number
    isAnimating: boolean
    onRest: () => void
}

export class MotionScroll extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isAnimating, docScroll, scrollTarget, onRest } = this.props;

        return  <Motion defaultStyle={{
                            scrollTop: docScroll}}
                            style={{
                                scrollTop: spring(isAnimating ? scrollTarget : docScroll) }}
                                onRest={onRest}
                    >
                    {(currentStyles) =>
                        this.props.isAnimating
                            &&   <ScrollSink
                                    scrollTop={currentStyles.scrollTop}
                                 />}
                </Motion>;
    }
}
