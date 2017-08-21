import * as React from 'react';
import { MenuSelectorsFromStore } from "../MenuSelectors/MenuSelectors";

interface IProps {
    isMobile?: boolean
    isLaptop?: boolean
}

export class MenuFull extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        const styles = {
            menuFull: {
                position: "absolute",
                right: 100
            }
        } as any;
        return (
            <div style={ styles.menuFull }>
                <MenuSelectorsFromStore/>
            </div>
        );
    }
}
