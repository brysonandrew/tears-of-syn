import * as React from 'react';
import { Word } from './Word';

interface IState {
    isHovered?: boolean
}

export class Logo extends React.Component<any, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    render(): JSX.Element {
        const { isHovered } = this.state;

        const styles = {
            logo: {
                position: "relative",
                width: "100%",
                height: "100%",
                cursor: "pointer"
            }
        } as any;
        const words = ["c", "b"];
        return (
            <div style={styles.logo}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
            >
                {words.map((word, i ) =>
                    <Word
                        key={i}
                        word={word}
                        isHovered={false}
                        isAnimating={isHovered}
                    />)}
            </div>
        );
    }
}
