import * as React from 'react';
import { colors } from "../../../../../../data/themeOptions";
import { NavigationArrowRight } from "./Arrows/NavigationArrowRight";
import { IParams } from "../../../../../../data/models";
import { NavigationArrowLeft } from "./Arrows/NavigationArrowLeft";

interface IProps {
    onArrowNavigation: (nextParams: IParams) => void
    savedParams: IParams
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

export class BottomNavigationMenu extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.handleArrowClick = this.handleArrowClick.bind(this);
    }

    private handleArrowClick(nextPath) {
        const { onArrowNavigation } = this.props;
        onArrowNavigation(nextPath);
    }

    public render(): JSX.Element {
        const { savedParams, isTablet } = this.props;
        const thickness = 4;
        const headRadius = 20;
        const bodyLength = 60;

        const styles = {
            bottomNavigationMenu: {
                width: "100%",
                height: isTablet ? 40 : 0,
                background: isTablet ? colors.wht : "transparent",
            }
        } as any;
        return (
            <div style={ styles.bottomNavigationMenu }>
                <NavigationArrowLeft
                    thickness={thickness}
                    headRadius={headRadius}
                    bodyLength={bodyLength}
                    savedParams={savedParams}
                    onClick={this.handleArrowClick}
                />
                <NavigationArrowRight
                    thickness={thickness}
                    headRadius={headRadius}
                    bodyLength={bodyLength}
                    savedParams={savedParams}
                    onClick={this.handleArrowClick}
                />
            </div>
        );
    }
}
