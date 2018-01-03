import * as React from 'react';
import {WidgetDemoWrapper} from './WidgetDemoWrapper';
import {IInlineStyles} from '../../data/models';
import {renderIfTrue} from '../utils/react';

const FONT_SIZE = 400;

const STYLES: IInlineStyles = {
    p: {},
    textFill: {
        fill: "#FFFFFF",
        fontSize: FONT_SIZE
    },
    textShadow: {
        fill: "#000000",
        fillOpacity: .5,
        fontSize: FONT_SIZE,
        transform: "translate(0, 10px)"
    },
    textTransparent: {
        fill: "transparent",
        stroke: "#000000",
        strokeWidth: 8,
        fontSize: FONT_SIZE,
        strokeOpacity: .4
    }
};

interface IState {
    isMounted: boolean
}

export class Logo extends React.Component<{}, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        })
    }

    render(): JSX.Element {
        return this.state.isMounted
            ? (
                <svg
                    style={STYLES.p}
                    width="100%"
                    height="100%"
                    viewBox="0 0 1024 620"
                    className="demo demo--aurora"
                >
                    <filter id="blur">
                        <feGaussianBlur stdDeviation="10 1">
                            <animate
                                attributeName="stdDeviation"
                                values="0;0;0;0 15;25 1;10 2;5;0;10 1;0 7;0"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </feGaussianBlur>
                    </filter>

                    <symbol id="text">
                        <text
                            x="50%"
                            y="50%"
                            dy=".3em"
                            textAnchor="middle"
                            filter="url(#blur)">
                            T o S
                        </text>
                    </symbol>

                    <mask id="mask">
                        <use style={STYLES.textFill} xlinkHref="#text" className="text--fill"/>
                    </mask>

                    <radialGradient id="gr-aurora-1" className="gr-aurora-1"
                                    gradientUnits="objectBoundingBox"
                                    cx="50%" cy="50%" r="50%">
                        <stop offset="0" className="aurora-stop-color-1"/>
                        <stop offset="90%" className="aurora-stop-color-2"/>
                    </radialGradient>

                    <radialGradient id="gr-aurora-2" className="gr-aurora-2"
                                    gradientUnits="objectBoundingBox"
                                    cx="50%" cy="50%" r="50%">
                        <stop offset="0" className="aurora-stop-color-1"/>
                        <stop offset="90%" className="aurora-stop-color-2"/>
                    </radialGradient>

                    <radialGradient id="gr-aurora-3" className="gr-aurora-3"
                                    gradientUnits="objectBoundingBox"
                                    cx="50%" cy="50%" r="50%">
                        <stop offset="0" className="aurora-stop-color-1"/>
                        <stop offset="90%" className="aurora-stop-color-2"/>
                    </radialGradient>

                    <radialGradient id="gr-aurora-4" className="gr-aurora-4"
                                    gradientUnits="objectBoundingBox"
                                    cx="50%" cy="50%" r="50%">
                        <stop offset="0" className="aurora-stop-color-1"/>
                        <stop offset="90%" className="aurora-stop-color-2"/>
                    </radialGradient>

                    <radialGradient id="gr-aurora-5" className="gr-aurora-5"
                                    gradientUnits="objectBoundingBox"
                                    cx="50%" cy="50%" r="50%">
                        <stop offset="0" className="aurora-stop-color-1"/>
                        <stop offset="90%" className="aurora-stop-color-2"/>
                    </radialGradient>

                    <use
                        style={STYLES.textShadow}
                        xlinkHref="#text"
                        className="text--shadow"
                    />

                    <g mask="url(#mask)">

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-1)"
                              x="-100" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-2)"
                              x="-100" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-3)"
                              x="-200" y="100"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-4)"
                              x="80" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-5)"
                              x="300" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-4)"
                              x="500" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-3)"
                              x="600" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-2)"
                              x="720" y="50"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-1)"
                              x="550" y="100"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-2)"
                              x="400" y="100"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-3)"
                              x="300" y="100"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-4)"
                              x="250" y="100"/>

                        <rect width="500" height="500"
                              fill="url(#gr-aurora-5)"
                              x="100" y="100"/>
                    </g>
                    <use
                        style={STYLES.textTransparent}
                        xlinkHref="#text"
                        className="text--transp"
                    />
                </svg>
            )
            : null;
    }
};

export const LogoWithWrapper = () => <WidgetDemoWrapper><Logo/></WidgetDemoWrapper>;
