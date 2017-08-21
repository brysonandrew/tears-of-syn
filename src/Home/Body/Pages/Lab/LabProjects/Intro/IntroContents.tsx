import * as React from 'react';
import { labProjectList } from '../../../../../../data/content';
import { Link } from 'react-router-dom';
import { colors } from '../../../../../../data/themeOptions';
import { fontSize } from '../../../../../../data/helpers/breakPoints';

interface IProps {
    isMobile: boolean
    isTablet: boolean
    isLaptop: boolean
    onProjectClick?: (index: number) => void
}

interface IState {}

export class IntroContents extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleClick(i) {
        this.props.onProjectClick(i);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;
        const styles = {
            introContents: {
                display: "inline-block",
                width: 400,
                textAlign: "left",
            },
            introContents__item: {
                display: "block",
                fontSize: fontSize.XXL(isMobile, isTablet, isLaptop),
                width: "100%",
                color: colors.std
            }
        };
        return (
            <div style={styles.introContents}>
                {labProjectList.map((item, i) =>
                    <Link key={i}
                          to={`/lab/${item.path}`}
                          onClick={() => this.handleClick(i)}
                          style={styles.introContents__item}>
                        {item.name}
                    </Link>)}
            </div>
        );
    }
}
