import * as React from 'react';
import { Link } from 'react-router';
import { ILabProject } from '../../../../../../../../data/models';
import { colors } from '../../../../../../../../data/themeOptions';

interface IProps {
    index: number
    item: ILabProject
    onClick: (index: number) => void
}

interface IState {
    isHovered: boolean
}

export class IntroItem extends React.Component<IProps, IState> {

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
            isHovered: false,
        });
    }

    handleClick() {
        this.props.onClick(this.props.index);
    }

    render(): JSX.Element {
        const { item } = this.props;
        const { isHovered } = this.state;

        const styles = {
            introItem: {
                position: "relative",
                width: "100%"
            },
            introItem__name: {
                display: "inline-block",
                padding: "0 10px",
                color: isHovered ? colors.blk : colors.std
            },
            introItem__technologies: {
                display: "inline-block",
                fontSize: 18,
                padding: "0 10px",
                opacity: 0.5
            },
            introItem__underline: {
                position: "absolute",
                left: 0,
                bottom: 0,
                height: 4,
                width: 320,
                background: colors.blk,
                transform: `translateX(${isHovered ? 0 : -50}%) scaleX(${isHovered ? 1 : 0})`,
                transition: "transform 200ms"
            }
        } as any;

        return (
            <Link
                to={`/lab/${item.path}`}
                onClick={this.handleClick}
                style={styles.introItem}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                <div>
                    <h1 style={styles.introItem__name}>
                        {item.name}
                    </h1>
                    <span style={styles.introItem__technologies}>
                    {item.technologies.map((technology, i) =>
                        <span key={`technology-${i}`}>
                            {technology}
                        </span>)}
                    </span>
                </div>
                <div style={styles.introItem__underline} />
            </Link>
        );
    }
}
