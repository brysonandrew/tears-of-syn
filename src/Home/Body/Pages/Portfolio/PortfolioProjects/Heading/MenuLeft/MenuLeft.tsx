import * as React from 'react';
import { headingMenuLeft } from "../../../../../../../data/content";
import { MenuLeftItem } from "./MenuLeftItem";

interface IProps {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

export class MenuLeft extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;

        const styles = {
            menuLeft: {
                position: "absolute",
                textAlign: "left",
                top: 0,
                left: 0,
            }
        } as any;
        return (
            <div style={ styles.menuLeft }>
                {headingMenuLeft.map((item, i) =>
                    <MenuLeftItem
                        key={i}
                        item={item}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />)}
            </div>
        );
    }
}
