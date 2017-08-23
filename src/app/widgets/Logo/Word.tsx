import * as React from 'react';
import { Letter } from "./Letter";

interface IProps {
    word: string
    isAnimating: boolean
    isHovered: boolean
}

export class Word extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const style = {
            display: "inline-block"
        };
        const word = this.props.word.split('');
        return (
            <div style={style}>
                {word.map((letter, i) =>
                    <Letter
                        key={i}
                        index={i}
                        letter={letter}
                        isAnimating={this.props.isAnimating}
                        isLogoHovered={this.props.isHovered}
                    />)}
            </div>
        );
    }
}
