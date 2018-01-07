import * as React from 'react';
import {IInlineStyles} from '../../data/models';
import {createArray, createArrayOf} from '../utils/array';
import {randomNumber} from '../utils/number';
const NUMBER_OF_CIRCLES = 10;

interface IProps {
    wrapperWidth: number
    wrapperHeight: number
    size: number
    docScroll: number
}

const STYLE: IInlineStyles = {
    p: {
        position: "fixed"
    },
    circle: {
        position: "absolute",
        borderRadius: "50%",
        background: "#FAFAFA"
    }
};

function circleScaleSize(docScroll, size, randomNumber): number {
    return Math.abs(Math.cos(docScroll / size * Math.PI * 0.5)) * 0.9 + 1 / NUMBER_OF_CIRCLES
}

function circleX(docScroll, size, index): number {
    return Math.cos(docScroll / size * Math.PI + index) * size * 0.5
}

function circleY(docScroll, size, index): number {
    return Math.sin(docScroll / size * Math.PI + index) * size * 0.5
}

function circleTransform(docScroll, size, index, randomNumber): string {
    const x = circleX(docScroll, size, index);
    const y = circleY(docScroll, size, index);
    const circleTranslate = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    const circleScale = `scale(${circleScaleSize(docScroll, size, randomNumber)})`;
    return `${circleTranslate} ${circleScale}`
}

export function CircleBackground(props: IProps) {
    const { wrapperWidth, wrapperHeight, size, docScroll } = props;
    const backgroundSize = Math.max(wrapperHeight, size);
    return (
        <div
            style={{...STYLE.p,
                top: wrapperHeight * 0.5,
                left: wrapperWidth * 0.5
            }}
        >
            {createArrayOf(randomNumber(0.0000001, 0.00002), NUMBER_OF_CIRCLES).map((randomNumber, i) =>
                <div
                    key={`circle-${i}`}
                    style={{...STYLE.circle,
                        top: 0,
                        left: 0,
                        width: backgroundSize,
                        height: backgroundSize,
                        transform: circleTransform(docScroll, size, i, randomNumber)
                    }}
                />)}
        </div>
    );
};
