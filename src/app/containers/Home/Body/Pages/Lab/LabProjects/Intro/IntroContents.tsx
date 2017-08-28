import * as React from 'react';
import { labProjectList } from '../../../../../../../../data/content/pages/projects/lab';
import { colors } from '../../../../../../../../data/themeOptions';
import { fontSize } from '../../../../../../../../data/helpers/breakPoints';
import { IntroItem } from './IntroItem';
import { ILabProject } from '../../../../../../../../data/models';

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

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, onProjectClick } = this.props;
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
                {labProjectList.map((item: ILabProject, i) =>
                    item.path !== "intro"
                    &&
                    <IntroItem
                        key={i}
                        index={i}
                        item={item}
                        onClick={onProjectClick}
                    />)}
            </div>
        );
    }
}
