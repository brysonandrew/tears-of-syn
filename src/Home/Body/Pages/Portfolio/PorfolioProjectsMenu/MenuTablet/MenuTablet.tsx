import * as React from 'react';
import { MenuButtonFromStore } from "./MenuButton/MenuButton";
import { MenuSelectorsFromStore } from "../MenuSelectors/MenuSelectors";
import { colors } from "../../../../../../data/themeOptions";
import { portfolioProjectList } from "../../../../../../data/content";

interface IProps {
    isMobile?: boolean
    isLaptop?: boolean
    isMenuOpen?: boolean
}

interface IState {}

export class MenuTablet extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMenuOpen } = this.props;
        const contentLength = portfolioProjectList.length;

        const styles = {
            menuTablet: {
                width: "100%",
                textAlign: "right",
                overflow: "hidden"
            },
            menuTablet__selectors: {
                position: "relative",
                background: colors.hi,
                width: 200,
                height: contentLength * 56,
                transform: `translateX(${isMenuOpen ? 0 : 100}%)`,
                transition: "transform 200ms",
            },
            menuTablet__selectorsInner: {
                position: "absolute",
                top: 0,
                width: 200,
                height: contentLength * 56,
                background: colors.wht,
                transform: `translateX(${isMenuOpen ? 0 : 100}%)`,
                transition: "transform 200ms",
                transitionDelay: "200ms"
            },
            menuTablet__selectorsInnerText: {
                position: "absolute",
                top: 0,
                left: -20,
                width: 200,
                height: contentLength * 56,
                transform: `translateX(${isMenuOpen ? 0 : 100}%)`,
                transition: "transform 200ms",
                transitionDelay: "400ms"
            }
        } as any;
        return (
            <div style={ styles.menuTablet }>
                <MenuButtonFromStore/>
                <div style={ styles.menuTablet__selectors }>
                    <div style={ styles.menuTablet__selectorsInner }>
                        <div style={ styles.menuTablet__selectorsInnerText }>
                            {isMenuOpen
                            && <MenuSelectorsFromStore/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
