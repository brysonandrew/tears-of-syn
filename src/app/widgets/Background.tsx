import * as React from 'react';
import {IInlineStyles} from '../../data/models';
import {createArray, createArrayOf} from '../utils/array';
import {randomNumber} from '../utils/number';
const NUMBER_OF_CIRCLES = 10;

interface IProps {
    width: number
    height: number
    adjustedWidth: number
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

function circleScaleSize(docScroll, adjustedWidth, randomNumber): number {
    return Math.abs(Math.cos(docScroll / adjustedWidth * Math.PI * 0.5)) * 0.9 + 1 / NUMBER_OF_CIRCLES
}

function circleX(docScroll, adjustedWidth, index): number {
    return Math.cos(docScroll / adjustedWidth * Math.PI + index) * adjustedWidth * 0.5
}

function circleY(docScroll, adjustedWidth, index): number {
    return Math.sin(docScroll / adjustedWidth * Math.PI + index) * adjustedWidth * 0.5
}

function circleTransform(docScroll, adjustedWidth, index, randomNumber): string {
    const x = circleX(docScroll, adjustedWidth, index);
    const y = circleY(docScroll, adjustedWidth, index);
    const circleTranslate = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    const circleScale = `scale(${circleScaleSize(docScroll, adjustedWidth, randomNumber)})`;
    return `${circleTranslate} ${circleScale}`
}

export function Background(props: IProps) {
    const { width, height, adjustedWidth, docScroll } = props;
    const backgroundSize = Math.max(height, adjustedWidth);
    return (
        <div
            style={{...STYLE.p,
                top: height * 0.5,
                left: width * 0.5
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
                        transform: circleTransform(docScroll, adjustedWidth, i, randomNumber)
                    }}
                />)}
        </div>
    );
};
